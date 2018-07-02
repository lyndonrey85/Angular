var mongoose = require('mongoose');
var session = require('express-session');
var User = mongoose.model('User');

module.exports = {
	register: function(req, res){
		req.session.errors = [];
		if(req.body.password != req.body.password_conf){
			req.session.errors.push("Password and confirmation must match.")
		}

		var user = new User({first_name: req.body.first_name, 
			last_name: req.body.last_name,
			email: req.body.email,
			password: req.body.password
		});

		user.save(function(err){
			if(err){
				for(let k in err.errors){
					if(err.errors.hasOwnProperty(k)){
						req.session.errors.push(err.errors[k]);
						console.log(err.errors[k]);
					}
				}
			}
			else{
				req.session.user = user;
			}
		})
	},

	

	login: (req, res) => {
		//1. query db by email
		User.findOne({email: req.body.email}).populate('bikes').exec((err, user) =>{
			if(user == null){
				res.json({errors: "Please enter valid login credentials."});
			}
			else{
				if(user.password == req.body.password){
					//if match, log in user (i.e. set user as session.user)
					req.session.user = user;
					res.json({errors: "None", user: user});
					console.log(req.session.user.first_name, "logged in.")
				}
				else{
					res.json({errors: "Password incorrect."});
				}
			}
		})
	},

	getUser: (req, res) =>{
		console.log("req.params", req.params);
		User.findById(req.params.id).populate('bikes').exec((err, user) =>{
			if(err){
				console.log(err);
			}
			else{
				console.log("what is getUser returning:", user);
				res.json({user: user});
			}
		})
	},

	getLoggedUser: (req, res) =>{
		User.findById(req.session.user._id).populate('bikes').exec((err, user) =>{
			if(err){
				console.log(err);
			}
			else{
				console.log("what is getLoggedUser returning:", user);
				res.json({user: user});
			}
		})
	}
}