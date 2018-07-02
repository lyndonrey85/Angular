var mongoose = require('mongoose');
var session = require('express-session');
var Bike = mongoose.model('Bike');
var User = mongoose.model('User');

module.exports = {
    create: (req, res) =>{
        req.session.errors = [];
        var bike = new Bike({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            location: req.body.location,
            imgUrl: req.body.imgUrl,
            user: req.session.user._id
        });
        User.findById(req.session.user._id, function(err, thisUser){
            if(err){console.log("Error attempting to retrieve user in bikes.create:", err);}
            else{
                thisUser.bikes.push(bike);
                thisUser.save((err) => {console.log("Error attempting to save user after bike creation:",err)});
                bike.save((err) =>{
                    if(err){console.log("Error attempting to save bike after creation:", err)}
                    else{console.log("Bike saved.")}
                })
            }
        });

    },

    showAll: function(req, res){
        Bike.find({}).populate('user').exec((err, bikes)=>{
            if(err){
                console.log(err);
                res.json({errors: err})
            }
            else{
                res.json({errors: "None", bikes: bikes});
            }
        })
    },

    showOne: (req, res)=>{
        Bike.findById(req.params.id, (err, bike)=>{
            if(err){
                console.log("error when querying db for one bike:", err);
            }
            else{
                //console.log("Found one bike:", bike.title);
                res.json({bike: bike});
            }
        })
    },

    updateBike: (req, res)=> {
        console.log("In the bikes controller, with this req.body:", req.body._id)
        var bike = Bike.findByIdAndUpdate({_id: req.body._id}, {$set: {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            location: req.body.location,
            imgUrl: req.body.imgUrl,
            user: req.body.user
        }},
        (err)=>
        {if(err){console.log("Error on bike update:", err)}
        else{
            var thisUser = User.findById(req.body.user).populate('bikes');
            thisUser.save();
            console.log("Bike updated.")};
        })
    },

    deleteBike: (req, res) => {
        var bike = Bike.findByIdAndRemove({_id: req.params.id}, err=>{
            if(err){console.log("Error on bike delete:", err)}
            else{
                thisUser = User.findById(req.session._id).populate('bikes').exec(
                    err=>{console.log("Error when attempting to update user after bike delete:",err)}, thisUser=>{
                        thisUser.save();
                        console.log("User updated.")});
                console.log("Bike deleted.")};
        })
    }
}