const fastify = require('fastify')({ logger: true })

fastify.register(require('./lobby/routes'))

const start = async () => {
    try {
        await fastify.listen(3000)
        fastify.log.info(`server listening on ${fastify.server.address().port}`)
    } catch (error) {
        fastify.log.error(error)
        process.exit(1);
    }
}
start()