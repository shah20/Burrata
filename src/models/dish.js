const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
    dishName: { type: String, required: true, trim: true, unique: true },
    maxPreparationTime: { type: Number, required: true },
    isVegetarian: { type: Boolean, default: true },
    ingredients: Array,
    quantity: Array,
    recipe: Array,
    pros: { type: Array, default: [] },
    cons: { type: Array, default: [] },
    addOn: { type: Array, default: [] },
    createdAt: Number,
    lastModifiedAt: Number
});

const Dish = mongoose.model('Dish', dishSchema);

module.exports = Dish;