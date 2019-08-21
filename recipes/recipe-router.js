const express = require('express');

const Recipes = require('./recipe-model.js');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const recipes = await Recipes.getRecipes();
        res.json(recipes);
    } catch (err) {
        res.status(500).json({ message: 'Failed to get recipes', err });
    }
});

router.get('/:id/instructions', async (req, res) => {
    const { id } = req.params
    try {
        const instructions = await Recipes.getInstruction(id);
        res.json(instructions);
    } catch (err) {
        res.status(500).json({ message: 'Failed to get recipes', err });
    }
});

router.get('/:id/shopping_list', async (req, res) => {
    const { id } = req.params
    try {
        const shoppingList = await Recipes.getShoppingList(id);
        res.json(shoppingList);
    } catch (err) {
        res.status(500).json({ message: 'Failed to get shopping list', err });
    }
});



router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const recipe = await Recipes.findById(id);

        if (recipe) {
            res.json(recipe);
        } else {
            res.status(404).json({ message: 'Could not find recipe with given id.' })
        }
    } catch (err) {
        res.status(500).json({ message: 'Failed to get recipes' });
    }
});

router.post('/', async (req, res) => {
    const recipeData = req.body;
    console.log(req.body);
    try {
        const recipe = await Recipes.add(recipeData);
        res.status(201).json(recipe);
    } catch (err) {
        res.status(500).json({ message: 'Failed to create new recipe', err });
    }
});

router.post('/add_ingredients', async (req, res) => {
    const recipeData = req.body;
    const { recipe_id, ingredient_id } = req.body;
    console.log(req.body, recipe_id, ingredient_id);
    try {
        const recipeIngredient = await Recipes.addIngredients(recipeData);
        res.status(201).json(recipeIngredient);
    } catch (err) {
        res.status(500).json({ message: 'Failed to add ingredient', err });
    }

    // try {
    //     const recipeIngredient = await Recipes.addIngredients(recipe_id, ingredient_id);
    //     res.status(201).json(recipeIngredient);
    // } catch (err) {
    //     res.status(500).json({ message: 'Failed to add ingredient', err });
    // }
});

router.get('/:id/recipe_ingredients', async (req, res) => {
    const { recipeId } = req.params
    try {
        const recipeIngredient = await Recipes.getIngredients(recipeId);
        res.status(201).json(recipeIngredient);
    } catch (err) {
        res.status(500).json({ message: `Failed to get ingredients for id: ${recipeId}`, err });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    try {
        const recipe = await Recipes.findById(id);

        if (recipe) {
            const updatedRecipe = await Recipes.update(changes, id);
            res.json(updatedRecipe);
        } else {
            res.status(404).json({ message: 'Could not find recipe with given id' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Failed to update recipe', err });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await Recipes.remove(id);

        if (deleted) {
            res.json({ removed: deleted });
        } else {
            res.status(404).json({ message: 'Could not find recipe with given id' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete recipe' });
    }
});

module.exports = router;