const Polls = require('../controllers/products');
const path = require('path');

module.exports = function(app) {

    app.post('/products', Products.create);
    app.get('/products', Products.index);
    app.get('/products:id', Products.show);
    app.delete('/products/:id', Products.destroy);

    app.all('*', (req, res, next) => {
        res.sendFile(path.resolve('./client/dist/index.html'));
    })
}