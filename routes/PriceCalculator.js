class PriceCalculator {

    calculatePrice(order){
        function sum(total, num) {
            return total + num;
        }

        const toppingPrice = order.toppings
            .map(e => e.price)
            .reduce(sum, 0); //sum all array elements into one
        
        const price = ((order.size.price + toppingPrice) * order.quantity);
        order.price = price.toFixed(2);
        const taxPST = order.price * 7 / 100;
        order.taxPST = taxPST.toFixed(2);
        const taxGST = order.price * 5 / 100;
        order.taxGST = taxGST.toFixed(2);
        const totalPrice = price + taxPST + taxGST;
        order.totalPrice = totalPrice.toFixed(2);

        return order;
    }
}

module.exports = PriceCalculator;