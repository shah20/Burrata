class Dish {
    dishName;
    maxPreparationTime;
    isVegetarian;
    ingredients;
    quantity;
    recipe;
    pros;
    cons;
    addOn;
}

constructor(dishName, maxPreparationTime, isVegetarian, ingredients, quantity, recipe, pros, cons, addOn) {
    this.dishName = dishName;
    this.maxPreparationTime = maxPreparationTime;
    this.isVegetarian = isVegetarian;
    this.ingredients = ingredients;
    this.quantity = quantity;
    this.recipe = recipe;
    this.pros = pros;
    this.cons = cons;
    this.addOn = addOn;
}

module.exports = {
    Dish: Dish
}