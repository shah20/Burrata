const mongoose = require('mongoose');

const Dish = mongoose.model('Dish', {
    dishName: { type: String, required: true, trim: true },
    maxPreparationTime: { type: Number, required: true },
    isVegetarian: { type: Boolean, default: true },
    ingredients: Array,
    quantity: Array,
    recipe: Array,
    pros: { type: Array, default: [] },
    cons: { type: Array, default: [] },
    addOn: { type: Array, default: [] }
});

module.exports = Dish;