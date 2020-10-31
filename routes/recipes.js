const express = require('express');
const routes = express();
const MongoClient = require('mongodb').MongoClient;
const constants = require('../utils/constants').constants;
const ResponseObject = require('../models/responseObject').ResponseObject;

routes.post('/addDish', function (req, res) {
    console.log('in /addDish');
    MongoClient.connect(constants.dbUrl, function (err, db) {
        if (err) throw err;
        var dbo = db.db('burrata');
        const dish = req.body;
        console.log('data to insert', req.body)
        dbo.collection("dishes").insertOne(dish, function (err, result) {
            if (err) {
                const response = new ResponseObject(false, 'failure');
                res.send(response)
                console.log('error at /adddish', err);
                return;
            };
            console.log("1 document inserted");
            const response = new ResponseObject(true, 'success');
            res.send(response);
            db.close();
        });
    });
});

routes.post('/getDishes', function (req, res) {
    console.log('in /getDishes');
    MongoClient.connect(constants.dbUrl, function (err, db) {
        var dbo = db.db('burrata');
        if (err) throw err;
        const query = {};
        console.log('body', req.body)

        req.body.dishName ? query['dishName'] = new RegExp(req.body.dishName, 'i') : null;
        req.body.isVegetarian ? query['isVegetarian'] = req.body.isVegetarian : null;
        req.body.maxPreparationTime ? query['maxPreparationTime'] = { $lte: req.body.maxPreparationTime } : null;

        if (req.body.ingredients) {
            const criterias = [];
            req.body.ingredients.forEach(element => {
                criterias.push(new RegExp(element, 'i'));
            });
            query['ingredients'] = { $in: criterias };
        }

        if (req.body.pros) {
            const criterias = [];
            req.body.pros.forEach(element => {
                criterias.push(new RegExp(element, 'i'));
            });
            query['pros'] = { $in: criterias };
        }

        if (req.body.cons) {
            const criterias = [];
            req.body.cons.forEach(element => {
                criterias.push(new RegExp(element, 'i'));
            });
            query['cons'] = { $in: criterias };
        }

        if (req.body.addOns) {
            const criterias = [];
            req.body.addOns.forEach(element => {
                criterias.push(new RegExp(element, 'i'));
            });
            query['addOns'] = { $in: criterias };
        }

        console.log('query', query)
        dbo.collection('dishes').find(query).toArray(function (err, result) {
            if (err) throw err;
            const response = new ResponseObject(true, result);
            res.send(response);
            db.close();
        });
        db.close();
    });
});

module.exports = {
    recipes: routes
}