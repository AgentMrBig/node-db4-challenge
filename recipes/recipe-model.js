const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = require('../data/dbConfig');

module.exports = {
    getRecipes,
    getShoppingList,
    getInstruction,
    add,
    findById
};

// Get all recipes
function getRecipes() {
    return db('recipes');
}

// Get shopping list for recipe
function getShoppingList(id) {
    console.log('in getShoppingList')
    var directions = getInstruction(id)

    console.log(`directions: ${directions}`)
    var dirString = JSON.stringify(directions)
    console.log('testing dirString', dirString)

    // for splitting the directions string into multiple steps
    // each step seperated by coma
    //var multiDirections = dirString.split(",");
    var dirArray = dirString.split(" ");
    var measurementType;
    var measurementQuantity;
    var measurements;
    dirArray.forEach((element) => {
        if (!isNaN(parseInt(element))) {
            console.log('element is : ' + parseInt(element))
            measurementQuantity = element;
            measurements = [...measurementQuantity]
        }
        if (element == 'cup' || element == 'tbsp' || element == 'pinch') {
            measurementType = element;
            measurements = [...measurementType]
        }

    });
    return measurements
}

// Get instructions for recipe
function getInstruction(id) {
    return db('recipes').where({ id }).select('directions')

}

// Get recipe by id
function findById(id) {
    return db('recipes').where({ id })
}

// Add ingredient
function addIngredients(data) {
    return db('recipe_ingredients').insert(data)
}

// Get ingredient
function getIngredients(id) {
    return db('recipe_ingredients').where({ id }).first();
}

// Add new recipe
function add(recipeData) {
    return db('recipes').insert(recipeData)
}
