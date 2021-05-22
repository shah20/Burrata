const express = require('express');
const routes = express();
const auth = require('../middleware/auth')
const ResponseObject = require('../models/responseObject').ResponseObject;

const logger = require('../utils/logger').getLogger('RECIPES');
const loggerPath = 'routes.recipes';

require('./../db/mongoose');
const Dish = require('./../models/dish');

routes.post('/addDish', async (req, res) => {
    logger.info(loggerPath + `.addDish dish to add ${ JSON.stringify(req.body) }`);

    try {
        const dish = new Dish(req.body);
        // dish.createdBy = req.user.mobileNo;
        dish.createdAt = new Date().getTime();
        dish.lastModifiedAt = new Date().getTime();
        await dish.save();
        logger.info(loggerPath + `.addDish dish added ${ JSON.stringify(dish) }`);
        const response = new ResponseObject(true, dish);
        res.status(201).send(response);
    } catch (error) {
        logger.error(loggerPath + `.addDish error while adding dish ${ error }`);
        let response;
        if (error.message.includes('duplicate')) {
            response = new ResponseObject(false, 'Duplicate dish name');
        } else {
            response = new ResponseObject(false, error.message);
        }
        res.status(500).send(response);
    }
});

routes.post('/getDishes', async (req, res) => {
    logger.info(loggerPath + `.getDishes filters ${ JSON.stringify(req.body) }`);
    const dish = {};

    req.body.dishName ? dish['dishName'] = new RegExp(req.body.dishName, 'i') : null;
    req.body.isVegetarian ? dish['isVegetarian'] = req.body.isVegetarian : null;
    req.body.maxPreparationTime ? dish['maxPreparationTime'] = { $lte: req.body.maxPreparationTime } : null;
    req.body.createdBy ? dish['createdBy'] = req.body.createdBy : null;

    if (req.body.ingredients) {
        const criterias = [];
        req.body.ingredients.forEach(element => {
            criterias.push(new RegExp(element, 'i'));
        });
        dish['ingredients'] = { $in: criterias };
    }

    if (req.body.pros) {
        const criterias = [];
        req.body.pros.forEach(element => {
            criterias.push(new RegExp(element, 'i'));
        });
        dish['pros'] = { $in: criterias };
    }

    if (req.body.cons) {
        const criterias = [];
        req.body.cons.forEach(element => {
            criterias.push(new RegExp(element, 'i'));
        });
        dish['cons'] = { $in: criterias };
    }

    if (req.body.addOns) {
        const criterias = [];
        req.body.addOns.forEach(element => {
            criterias.push(new RegExp(element, 'i'));
        });
        dish['addOns'] = { $in: criterias };
    }

    logger.info(loggerPath + `.getDishes generated query ${ JSON.stringify(dish) }`);

    try {
        const result = await Dish.find(dish);
        logger.info(loggerPath + `.getDishes found dishes ${ JSON.stringify(result) }`);
        const response = new ResponseObject(true, result);
        res.status(200).send(response);
    } catch (error) {
        logger.error(loggerPath + `.getDishes error while searching dishes ${ error }`);
        const response = new ResponseObject(false, error.message);
        res.status(500).send(response);
    }
});

routes.delete('/removeDish/:dishName', async (req, res) => {
    logger.info(loggerPath + `.removeDish dish to delete ${ req.params.dishName }`);
    try {
        const result = await Dish.findOneAndDelete({ dishName: req.params.dishName });
        logger.info(loggerPath + `.removeDish deleted dish ${ JSON.stringify(result) }`);
        const response = new ResponseObject(true, result);
        res.status(200).send(response);
    } catch (error) {
        logger.error(loggerPath + `.removeDish error while deleting dish ${ error }`);
        const response = new ResponseObject(false, error.message);
        res.status(500).send(response);
    }
});

routes.put('/updateDish', async (req, res) => {
    logger.info(loggerPath + `.updateDish dish to update ${ req.body.dishName }`);
    try {
        if (req.body.dishName) {
            const data = JSON.parse(JSON.stringify(req.body));
            delete data.dishName;
            const dish = await Dish.findOneAndUpdate({ dishName: new RegExp(req.body.dishName, 'i') }, { ...data, lastModifiedAt: new Date().getTime() }, { new: true });

            if (!dish) {
                throw new Error('Dish not found');
            }

            logger.info(loggerPath + `.updateDish updated dish ${ JSON.stringify(dish) }`);
            const response = new ResponseObject(true, dish);
            res.status(200).send(response);
        } else {
            throw new Error('Please provide dish name');
        }
    } catch (error) {
        logger.error(loggerPath + `.updateDish error while updating dish ${ error }`);
        const response = new ResponseObject(false, error.message);
        res.status(500).send(response);
    }
});

module.exports = routes;