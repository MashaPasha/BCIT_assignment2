const express = require('express');
const router = express.Router();
const Order = require('../models/orders');
const PriceCalculator = require('./PriceCalculator');
const calc = new PriceCalculator();
const pizzaDescription = require('../data/pizzaDescription');

router.get('/', function (req, res, next) {
    Order.find({}, function (err, orders) {
        if(err) {
            next(err);
            return;
        }

        res.json(orders);
    }).limit(100);
});

// router.post('/', function (req, res, next) {
//     console.log(req.body);
//     if(req.body.phoneNumber  && req.body.address) {
//         Orders.find({$and:[{address: req.body.address},{phoneNumber:req.body.phoneNumber}]}, function (err, orders) {
//             console.log(orders);
//             res.json(orders);
//         }).limit(100);
//     }
//     // Added an ability for incomplete search. But probably it is a bit overcomplicated
//     else if(req.body.phoneNumber  && !req.body.address) {
//         Orders.find({$or:[{phoneNumber:req.body.phoneNumber}, {"phoneNumber":{$regex: req.body.phoneNumber , $options: 'i'}}]}, function (err, orders) {
//             console.log(orders);
//             res.json(orders);
//         }).limit(100);
//     }
//     // Added an ability for incomplete search. But probably it is a bit overcomplicated
//     else if(!req.body.phoneNumber  && req.body.address) {
//         Orders.find({$or:[{address:req.body.address}, {"address":{$regex: req.body.address , $options: 'i'}}]}, function (err, orders) {
//             console.log(orders);
//             res.json(orders);
//         }).limit(100);
//     }
//     else{
//         res.status(500).json({ status: "Failed to search the order." });
//         return;
//     }
// });

router.post('/', function (req, res, next) {

    const calculatedOrder = calc.calculatePrice({
        crust: pizzaDescription.crust.find(e => e.id === req.body.crust.id),
        size: pizzaDescription.size.find(e => e.id === req.body.size.id),
        toppings: req.body.topping.map(e => pizzaDescription.toppings.find(t => t.id === e.id)),
        quantity: req.body.quantity,
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone
    });

    const order = new Order(calculatedOrder);


    order.save((err, savedOrder) => {
        if (err) {
            next(err)
            return;
        }

        res.json(savedOrder);
    });
});

module.exports = router;