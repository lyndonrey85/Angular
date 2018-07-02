var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new mongoose.Schema({
	//will need to add some validation crap...
	Name: {type: String, required: true},

	Qty: {type: Number, required: true},

	price: {type: Number, required: true}

}, {timestamps:true})


mongoose.model('Product', ProductSchema);