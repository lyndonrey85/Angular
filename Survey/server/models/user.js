const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name cannot be blank']
    }
}, { timestamps: true})

mongoose.model('User', UserSchema);