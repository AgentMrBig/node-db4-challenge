
exports.up = function (knex, Promise) {
    return knex.schema
        .createTable('recipes', tbl => {
            tbl.increments();
            tbl.string('recipeName');
            tbl.string('ingredients');
            tbl.timestamps(true, true);
        })
        .createTable('ingredients', tbl => {
            tbl.increments();
            tbl.string('ingredientName');
            tbl.decimal('quantity');
        })
};

exports.down = function (knex, Promise) {
    return knex.schema
        .dropTableIfExists('recipes');
        .dropTableIfExists('ingredients');
};
