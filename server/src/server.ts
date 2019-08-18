import fastify = require('fastify');
import DotaService from './dota-service';
import dotaApi from './dota-api';
import cliProgress = require('cli-progress');

const PORT = parseInt(process.env.PORT || '3000');
const fasty = fastify({ logger: true });
const fastifyWs = require('fastify-websocket');

let timeoutMultiplier = -1;

fasty.register(fastifyWs);

// @ts-ignore
fasty.get('/init', { websocket: true }, async (conn, req) => {
  let progress = 0;
  const total = 3;
  const dotaService = new DotaService();

  try {
    conn.socket.send(JSON.stringify({ progress: 0, total, message: 'Adding teams...' }));
    await dotaService.setTeams();
    conn.socket.send(JSON.stringify({ progress: ++progress, total, message: 'Adding players...' }));
    await dotaService.setPlayers();
    conn.socket.send(JSON.stringify({ progress: ++progress, total, message: 'Adding heroes...' }));
    await dotaService.setHeroes();
    conn.send(JSON.stringify({ progress: ++progress, total }));
    conn.end();
  } catch (err) {
    conn.end();
    fasty.log.error({ err });
  }
});

// @ts-ignore
fasty.get('/team/heroes', { websocket: true }, async (conn, req) => {
  const bar = new cliProgress.Bar({
    stopOnComplete: true,
    format: `team heroes [{bar}] {percentage}% | ETA: {eta}s | {value}/{total}`
  }, cliProgress.Presets.shades_classic);

  let progress = 0;
  const dotaService = new DotaService();
  const teamIDs = await dotaService.getTeamIDs();
  bar.start(teamIDs.dota2_team.length, 0);
  conn.socket.send(JSON.stringify({ progress, total: teamIDs.dota2_team.length, message: 'Adding each team\'s data...' }));

  chunkArr(teamIDs.dota2_team, 5).map(teams => {
    timeoutMultiplier++;
    const timeout = 6000 * timeoutMultiplier;
    setTimeout(async () => {
      const promises = teams.map(async t => {
        const response = await dotaApi.fetchTeamHeroes(t.team_id.toString());
        return dotaService.setTeamHeroes(t.team_id, response.data);
      });
      const results = await Promise.all(promises);
      bar.increment(results.length);
      progress += results.length;
      conn.socket.send(JSON.stringify({ progress, total: teamIDs.dota2_team.length, message: 'Adding each team\'s data...' }));
      progress === teamIDs.dota2_team.length && conn.end();
    }, timeout);
  });
});

// @ts-ignore
fasty.get('/player/matches', { websocket: true }, async (conn, req) => {
  const bar = new cliProgress.Bar({
    stopOnComplete: true,
    format: `player matches [{bar}] {percentage}% | ETA: {eta}s | {value}/{total}`
  }, cliProgress.Presets.shades_classic);

  let progress = 0;
  const dotaService = new DotaService();
  const playerAccountIDs = await dotaService.getPlayerAccountIDs();
  bar.start(playerAccountIDs.dota2_player.length, 0);
  conn.socket.send(JSON.stringify({ progress, total: playerAccountIDs.dota2_player.length, message: 'Adding each player\'s data...' }));

  chunkArr(playerAccountIDs.dota2_player, 5).map(players => {
    timeoutMultiplier++;
    const timeout = 7000 * timeoutMultiplier;
    setTimeout(async () => {
      const promises = players.map(async p => {
        return dotaService.setPlayerMatches(p.account_id);
      });
      const results = await Promise.all(promises);
      bar.increment(results.length);
      progress += results.length;
      conn.socket.send(JSON.stringify({ progress, total: playerAccountIDs.dota2_player.length, message: 'Adding each player\'s data...' }));
      progress === playerAccountIDs.dota2_player.length && conn.end();
    }, timeout);
  });
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
