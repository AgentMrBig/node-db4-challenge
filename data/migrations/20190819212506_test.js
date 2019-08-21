
exports.up = function (knex) {
    return knex.schema
        .createTable('recipes', tbl => {
            tbl.increments();
            tbl.string('name')
                .notNullable();
            tbl.string('directions');
        })
        .createTable('ingredients', tbl => {
            tbl.increments();
            tbl.string('name')
                .notNullable();
        })
        .createTable('recipe_ingredients', tbl => {
            tbl.string('recipe_id')

                .notNullable()
                .references('id')
                .inTable('recipes')
            tbl.string('ingredient_id')

                .notNullable()
                .references('id')
                .inTable('ingredients')
            tbl.primary(['recipe_id', 'ingredient_id'])
        })
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('recipes')
        .dropTableIfExists('ingredients')
        .dropTableIfExists('recipe_ingredients')
};
