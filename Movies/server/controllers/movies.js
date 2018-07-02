const mongoose = require('mongoose');

const Movie = mongoose.model('Movie');

class MoviessController {
    index(req, res) {
        Movies.find({}).populate({ path: 'movie', model: 'Movie'}).exec((err, movies) => {
            if (err) {
                return res.json(err);
            }
            return res.json(movies);
        })
    }

    destroy(req, res) {
        Poll.findById(req.params.id, (err, polls) => {
            if (err) {
                return res.json(err);
            }
            if (!polls) {
                return res.json({ status:false, msg:'Poll not found.' });
            }
            else if (poll.user == req.session.user_id){
                poll.remove();
                return res.json({ status: true })
            } else {
                return res.json({ status: false, msg: 'Unauthorized user.'})
            }
        })
    }

    show(req, res) {
        Movie.findById(req.params.id).populate({ path: 'movie', model: 'Movie'}).exec((err, movies) => {
            if (err) {
                return res.json(err);
            }
            return res.json(movies);
        })
    }

    create(req, res) {
        Movies.create({ question: req.body.question }, (err, movie) => {
            if (err) {
                return res.json(err);
            }
           
                                return res.json(movies);
                            })
    }
}

module.exports  = new MoviessController();