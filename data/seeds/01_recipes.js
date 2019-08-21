
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('recipes').del()
    .then(function () {
      // Inserts seed entries
      return knex('recipes').insert([
        { name: 'test recipe name', description: 'test description', ingredients: 'test ingredients' },
        { name: 'test recipe name', description: 'test description', ingredients: 'test ingredients' },
        { name: 'test recipe name', description: 'test description', ingredients: 'test ingredients' }
      ]);
    });
};
