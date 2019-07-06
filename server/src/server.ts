import fastify = require('fastify');

const PORT = parseInt(process.env.PORT || '3000');
const fasty = fastify({ logger: true });

fasty.post('/init', async (req, reply) => {

});

fasty.get('/', async () => {
  return { message: 'There\'s nothing here' };
});

(async () => {
  await fasty.listen(PORT).catch(err => {
    fasty.log.error(err);
    process.exit(1);
  });
  fasty.log.info(`server listening on ${fasty.server.address()}`);
})();