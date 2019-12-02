$(document).ready(function() {

    fillInOrdersTable('');
    
    $("#search-orders").autocomplete({
        minLength: 0,
        source: function(req, res) {
            fillInOrdersTable(req.term);
        }
    });
});

function fillInOrdersTable(searchString) {
    $.get('/api/orders', {search: searchString}, (data) => {

        const ordersTable = $('#orders');

        ordersTable.find("tr.data").each(function() {$(this).remove()});
        
        data.forEach(function (item) {
            ordersTable.append('<tr class="data"><td>' 
                + clean(item.name) + '</td><td>' 
                + clean(item.address) + '</td><td>'
                + clean(item.phone) + '</td><td>' 
                + clean(item.totalPrice) + '</td><td>' 
                + orderSummary(item) + '</td></tr>'
            );
        });
    });
}


function clean(val) {
    return val? val: '';
}

function orderSummary(order) {
    const size = order.size? order.size.name: '';
    const crust = order.crust? order.crust.name: '';
    const toppings = order.toppings? order.toppings.map(e => e.name): [];

    let orderInfo = `${size} pizza with ${crust} crust`;
    if(toppings.length > 0) {
        orderInfo += ' and ';
        for(let i = 0; i < toppings.length; i++) {
            orderInfo += toppings[i];
            if(i !== toppings.length - 1) {
                orderInfo += ', '
            } else {
                orderInfo += ' toppings';
            }
        }
    }
    return orderInfo;
}
