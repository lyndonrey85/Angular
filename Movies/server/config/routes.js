
const Movies = require('../controllers/movies');
const path = require('path');

module.exports = function(app) {

    app.post('/movies', Movies.create);
    app.get('/movies', Movies.index);
    app.get('/movies/:id', Movies.show);
    app.delete('/movies/:id', Movies.destroy);


    app.all('*', (req, res, next) => {
        res.sendFile(path.resolve('./client/dist/index.html'));
    })
}