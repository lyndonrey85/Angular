const mongoose = require('mongoose');
const Note = mongoose.model('Note');

class NotesController {
    create(req, res) {
        Note.create(req.body, (err, note) => {
            if (err) {
                return res.json(err);
            }
            return res.json(note);
        })
    }
    index(req, res) {
        Note.find({}).sort(-'createdAt').exec((err, note) => {
            if (err) {
                res.json(err);
            }
            res.json(note);
            // return render.html(note);
        })
    }
}

module.exports = new NotesController();