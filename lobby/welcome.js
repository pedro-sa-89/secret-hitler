const db = require('../repository/database')
const _ = require('lodash');

const game = require('../game/game')

async function welcome() {
    return 'Welcome to Secret Hitler'
}

async function createNewPlayer(name) {
    const id = _.uniqueId('player')
    const player = { id, name }
    db.save('players', id, player)
    return player
}

async function createGroup(name) {
    const id = _.uniqueId('group')
    const group = { id, name, players: [] }

    db.save('groups', id, group)

    return group
}

async function joinGroup(playerId, groupId) {
    const player = db.get('players', playerId)    
    const group = _.defaultTo(
        db.get('groups', groupId),
        await createGroup(`${player.name}'s group`, player.id)
    )

    group.players.push(player.id)
    group.players = _.uniq(group.players)

    db.save('groups', group.id, group)

    return group
}

async function leaveGroup(playerId, groupId) {
    const player = db.get('players', playerId)
    const group = db.get('groups', groupId)
    
    group.players = group.players.filter(playerId => player.id !== playerId)

    db.save('groups', group.id, group)
}

async function startGame(groupId) {
    const group = db.get('groups', groupId)

    game.start(group);
}

async function dumpDatabase() {
    return db.database;
}

module.exports = {
    welcome,
    createNewPlayer,
    createGroup,
    joinGroup,
    leaveGroup,
    startGame,
    dumpDatabase,
}