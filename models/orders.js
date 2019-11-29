const mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
    date: {type: Date, default: Date.now},
    crust: {id: String, name: String, price: Number},
    size: {id: String, name: String, price: Number},
    toppings: [{_id: false, id: String, name: String, price: Number}],
    quantity: Number,
    name: String,
    address: String,
    phone: String,
    price: Number,
    price: Number,
    taxPST: Number,
    taxGST: Number,
    totalPrice: Number
});


module.exports = mongoose.model('Order', orderSchema);