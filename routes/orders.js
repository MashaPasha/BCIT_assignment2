const express = require('express');
const router = express.Router();
const Order = require('../models/orders');
const PriceCalculator = require('./PriceCalculator');
const calc = new PriceCalculator();
const pizzaDescription = require('../data/pizzaDescription');
const { check, validationResult } = require('express-validator');

router.get('/', function (req, res, next) {
    let mongoQuery = {};
    if(req.query.search) {
        mongoQuery = {
            "$or": [
                { name: { '$regex': req.query.search, '$options': 'i' } },
                { address: { '$regex': req.query.search, '$options': 'i' } },
                { phone: { '$regex': req.query.search, '$options': 'i' } }
            ]
        }
    }

    Order.find(mongoQuery, function (err, orders) {
        if(err) {
            return next(err);
        }

        res.json(orders);
    }).limit(100);
});

router.post('/', [
        check("crust").exists().withMessage("crust is missing"),
        check("size").exists().withMessage("size is mising"),
        check("toppings").exists().withMessage("toppings is mising"),
        check("name").exists().withMessage("name is missing"),
        check("address").exists().withMessage("address is mising"),
        check("phone").exists().withMessage("phone is mising")
    ],
    function (req, res, next) {

        const validationErrors = validationResult(req);
        if(!validationErrors.isEmpty()) {
            return res.status(422).json({ errors: validationErrors.array() });
        }

        const calculatedOrder = calc.calculatePrice({
            crust: pizzaDescription.crust.find(e => e.id === req.body.crust.id),
            size: pizzaDescription.size.find(e => e.id === req.body.size.id),
            toppings: req.body.toppings.map(e => pizzaDescription.toppings.find(t => t.id === e.id)),
            quantity: req.body.quantity,
            name: req.body.name,
            address: req.body.address,
            phone: req.body.phone
        });

        const order = new Order(calculatedOrder);


        order.save((err, savedOrder) => {
            if (err) {
                return next(err)
            }

            res.json(savedOrder);
        });
});

module.exports = router;