const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    note: {
        type: String,
        required: [true, 'Note must be at least 3 characters'],
        minlength: [3, 'Note must be at least 3 characters']
    }
}, { timestamps: true })

mongoose.model('Note', NoteSchema);