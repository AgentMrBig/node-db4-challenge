const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

module.exports = {
    find,
    findById,
    add,
    update,
    remove,
};

function find() {
    return db('recipes');
}

function findById(id) {
    return db('recipes')
        .where({ id })
}

function add({ newRecipe }) {
    return db('recipes').insert({ newRecipe })
}

function update({ recipeName }, id) {
    return db('recipes')
        .where({ id })
        .update({ recipeName });
}

function remove(id) {
    return db('recipes')
        .where({ id })
        .del();
}