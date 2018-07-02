var mongoose = require('mongoose');
var session = require('express-session');
var User = mongoose.model('User');
var users = require('../controllers/users.js');
var bikes = require('../controllers/bikes.js');
const path = require('path');

module.exports = function (app) {

	
	app.get('/whosLoggedIn', (req, res) => {
		res.json({user: req.session.user});
	})

	app.get('/getLoggedUser', (req, res) =>{
		users.getLoggedUser(req, res);
	})

	app.post('/login', (req, res) => {
		users.login(req, res);
	})

	app.post('/register', (req, res) => {
		users.register(req, res);
	})

	app.get('/getUser/:id', (req, res) =>{
		users.getUser(req, res);
	})

	app.get('/logout', (req, res) =>{
		//console.log(req.session.user.first_name, "logged out.");
		req.session.user = undefined;
		res.json(true);
	})


	app.post('/createBike', (req, res) =>{
		bikes.create(req, res);
	})

	app.get('/showAllBikes', (req, res)=>{
		bikes.showAll(req, res);
	})

	app.get('/showOneBike/:id', (req, res)=>{
		bikes.showOne(req, res);
	})

	app.post('/updateBike', (req, res) =>{
		console.log("updateBike route in route.js, with this req.body:", req.body);
		bikes.updateBike(req, res);
	})

	app.delete('/deleteBike/:id', (req, res)=>{
		console.log("Delete function in routes, req.params.id:", req.params.id);
		bikes.deleteBike(req, res);
	})

	// EVERYTHING ELSE
    app.all("*", (req,res,next) => {
        res.sendFile(path.resolve("./client/dist/index.html"))
	})
}