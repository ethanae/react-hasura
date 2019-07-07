import fastify = require('fastify');
import DotaService from './dota-service';

const PORT = parseInt(process.env.PORT || '3000');
const fasty = fastify({ logger: true });

fasty.post('/init', async (req, reply) => {
  try {
    // const teamResult = await new DotaService().setTeams();
    const playersResult = await new DotaService().setPlayers();
    // const teams = await new DotaService().getTeamIDs();
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
  fasty.log.info(`server listening on ${fasty.server.address()}`);
})();