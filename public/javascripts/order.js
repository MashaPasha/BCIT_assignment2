$("#orderSearch").autocomplete({
    source: (req, res) => {
        $.get('/api/orders', {search: req.term}, (data) => {
            res(data.map(e => `Order for ${e.name} at ${e.address}. Price \$${e.totalPrice}. Phone ${e.phone}`));
        });
    }
});