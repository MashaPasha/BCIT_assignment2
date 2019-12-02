$(document).ready(function() {
    $("#submitForm").submit(function (event) {
        event.preventDefault();

        const order = JSON.stringify({
            size: { id: $('input[name="size"]:checked').val() },
            crust: { id: $('input[name="crust"]:checked').val() },
            toppings: getToppings('input[name="toppings"]:checked'),
            quantity: $('#quantity').val(),
            name: $('#name').val(),
            address: $('#address').val(),
            phone: $('#phone').val()
        });

        $.ajax({
            url: '/api/orders',
            type: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            data: order,
            success: function (data, status) {
                $('#statusMsg').removeClass('alert alert-success');
                $('#statusMsg').addClass('alert alert-success');
                $('#statusMsg').html('Order has been added. Total price: ' + data.totalPrice)
            },
            error: function (data, status, error) {
                $('#statusMsg').removeClass('alert alert-success');
                $('#statusMsg').addClass('alert alert-danger');
                $('#statusMsg').html('Error adding the order');
                console.log('Request failed : ' + status, error);
            }
        });
    });
})

function getToppings(selector) {
    const toppings = [];

    //find all checked toppings and add them into toppings array
    $(selector).each(function() {
        toppings.push({ id: $(this).val() });
    });

    return toppings;
}