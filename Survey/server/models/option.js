const mongoose = require('mongoose');

const OptionSchema = new mongoose.Schema({
    option: {
        type: String,
        required: [true, 'Option should be at least 3 characters'],
        minlength: [3, 'Option should be at least 3 characters']
    },
    vote: {
        type: Number,
        default: 0
    },
    poll: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Poll'
    }
}, { timestamps: true });

mongoose.model('Option', OptionSchema);