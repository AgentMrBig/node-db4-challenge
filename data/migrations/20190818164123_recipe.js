
exports.up = function (knex) {
    return knex.schema.createTable('recipe', (tbl) => {
        tbl.increments();
        tbl.string('name');
        tbl.string('description');
        tbl.string('ingredients');
        tbl.timestamps(true, true);
    })
        .createTable('ingredients', (tbl) => {
            tbl.increments();
            tbl.string('name');

        })
        .createTable('recipe_ingredients', (tbl) => {
            tbl.integer('recipe_id')
                .references('recipe.id')
            toolbar.integer('ingredient_id')
                .references('ingredients.id')
                .tbl.primary(['recipe_id', 'ingredient_id'])
        })
};

exports.down = function (knex) {
    return knex.schema.dropTable('recipe')
    return knex.schema.dropTable('ingredients')
    return knex.schema.dropTable('recipe_ingredients')
};
