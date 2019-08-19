const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = require('../data/dbConfig');

module.exports = {
    getRecipes,
    getShoppingList,
    getInstruction,
    add,
};

function getRecipes() {
    return db('recipes');
}

function getShoppingList() {

}

function getInstruction() {

}

function add({ scheme_name }) {
    return db('schemes').insert({ scheme_name })
}
