import fastify = require('fastify');
import DotaService from './dota-service';
import dotaApi from './dota-api';
import cliProgress = require('cli-progress');

const PORT = parseInt(process.env.PORT || '3000');
const fasty = fastify({ logger: true });

fasty.post('/init', async (req, reply) => {
  try {
    const bar = new cliProgress.Bar({ 
      stopOnComplete: true,
      format: `team hero progress [{bar}] {percentage}% | ETA: {eta}s | {value}/{total}`
    }, cliProgress.Presets.shades_classic);
    const ds = new DotaService();
    await ds.setTeams();
    await ds.setPlayers();
    await ds.setHeroes();
    let timeoutMultiplier = -1;
    const teamIDs = await ds.getTeamIDs();
    bar.start(teamIDs.dota2_team.length, 0);

    chunkArr(teamIDs.dota2_team, 5).map((teams, i) => {
      timeoutMultiplier++;
      const timeout = 6000 * timeoutMultiplier;
      setTimeout(async () => {
        const promises = teams.map(async t => {
          const response = await dotaApi.fetchTeamHeroes(t.team_id.toString());
          return ds.setTeamHeroes(t.team_id, response.data);
        });
        const results = await Promise.all(promises);
        bar.increment(results.length);
      }, timeout);
    });
    reply.status(200).send();
  } catch (err) {
    reply.send({ err });
    fasty.log.error(err);
  }
});

fasty.get('*', async (req, reply) => {
  reply.callNotFound();
});

(async () => {
  await fasty.listen(PORT).catch(err => {
    fasty.log.error(err);
    process.exit(1);
  });
  fasty.log.info(`server listening on ${fasty.server.address()!.toString()}`);
})();

function chunkArr<T>(arr: T[], size: number) {
  let chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}