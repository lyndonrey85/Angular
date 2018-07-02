const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    movie: {
        name: String,
        required: [true, 'Title should be at least 3 characters'],
        minlength: [3, 'Title should be at least 3 characters']
    },
}, { timestamps: true });

mongoose.model('Movie', MovieSchema);