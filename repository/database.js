const _ = require('lodash')

const database = {};

function save(collection, key, document) {
    database[collection] = _.defaultTo(database[collection], {})
    database[collection][key] = document
}

function get(collection, key) {
    return _.defaultTo(database[collection], {})[key]
}

module.exports = {
    database,
    save,
    get,
}