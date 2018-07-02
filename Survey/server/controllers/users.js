const mongoose = require('mongoose');
const User = mongoose.model('User');

class UsersController {
    create(req, res) {
        User.findOne({ name: req.body.name}, (err, user) => {
            if (err) {
                return res.json(err)
            }
             else if (!user) {
                User.create(req.body, (err, newUser) => {
                    if (err) {
                        return res.json(err);
                    }
                    req.session.user_id = newUser._id;
                    return res.json(newUser)
                })
            } else {
                req.session.user_id = user._id;
                return res.json(user)
            }
        })
    }

    logout(req, res) {
        delete req.session.user_id;
        return res.json({ status: true });
    }

    session(req, res) {
        if (!req.session.user_id) {
            return res.json ({ status: false});
        }
        User.findById (re.session.user_id, (err, user) => {
            if (err) {
                return res.json (err);
            }
            return res.json(user);
        })
    }
}

module.exports = new UsersController();