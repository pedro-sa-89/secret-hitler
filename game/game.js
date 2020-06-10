const roles = require('./role-count.json')
const boards = require('./boards.json')

async function start(group) {
    const game = setup(group.players)
}

async function setup(players) {
    const playerCount = players.length()

    const fascists = roles[playerCount].fascists;

    players
        .map(player => ({ ...player, role: _.random() }))
        .sort((p1, p2) => p1.role - p2.role)
        .map((player, index) => ({
            ...player,
            party: index < fascists ? "fascist" : "liberal",
            role: index === 0 ? "hitler" : index < fascists ? "fascist" : "liberal",
        }))
        .map(player => ({ ...player, position: _.random(0, playerCount) }))
        .sort((p1, p2) => p1.position - p2.position)

    const presidents = [ players[0] ]

    const laws = 'fffffflllllllll'
        .split('')
        .map(card => ({ card, weight: _.random() }))
        .sort((c1, c2) => c1.weight - c2.weight)
        .map(card => card.card)
    
    const peace = 3

    const board = boards[playerCount]

    return { players, presidents, laws, board, peace }
}

module.exports = {
    start
}