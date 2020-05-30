const welcome = require('./welcome');

async function routes(fastify, options) {
    fastify.get('/', () => welcome.welcome())

    fastify.get(
        '/player/new/:name',
        (request) => welcome.createNewPlayer(request.params.name)
    )

    fastify.get(
        '/group/new/:name',
        (request) => welcome.createGroup(request.params.name)
    )

    fastify.get(
        '/player/:playerId/join/group/:groupId',
        (request) => welcome.joinGroup(
            request.params.playerId,
            request.params.groupId
        )
    )

    fastify.get(
        '/player/:playerId/leave/group/:groupId',
        (request) => welcome.leaveGroup(
            request.params.playerId,
            request.params.groupId
        )
    )

    fastify.get(
        '/group/start/:id',
        (request) => welcome.startGame(request.params.id)
    )

    fastify.get(
        '/dump',
        () => welcome.dumpDatabase()
    )

}

module.exports = routes