var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BikeSchema = new mongoose.Schema({
	//will need to add some validation crap...
	title: {type: String, required: true},

	imgUrl: {type: String, required: false},

	description: {type: String, required: true},

	price: {type: Number, required: true},

	location: {type: String, required: true},

	user: {type: Schema.Types.ObjectId, ref: "User"}

}, {timestamps:true})


mongoose.model('Bike', BikeSchema);