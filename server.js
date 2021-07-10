const fastify = require('fastify')({
    logger: true
});
const PORT = process.env.port || 3000;
fastify.register(require('./routes/default-route'));

const start = async () => {
    try {
        await fastify.listen(PORT);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
}

start();