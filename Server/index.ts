import * as express from "express";
import * as bodyParser from "body-parser";
import User = require("./models/User");

var cors = require('cors');
var app = express();
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/GE-DB",{useMongoClient: true});

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


// *************** Authenticate ************************
app.post('/api/authenticate', function (req, res) {

    // console.log(req.body);

    let username = req.body.username;
    let password = req.body.password;

    var query = { username: username};

    User.findOne(query, function(err, User) {

        if (err) {
            res.json({info: 'error during find User', error: err});
        };
        if (User) {
            if (password === User.password) {
                res.json({info: 'User is approved', data: User});
            }
            else {
                res.status(500).send('invalid credentials')
            }
        } else {
            res.json({info: 'User not found with name:'+ req.params.name});
        }
    });
});

// *************** Users ************************
/* Create */
app.post('/api/users', function (req, res) {

    //console.log(req.body);

    var newUser = new User(req.body);

    newUser.save((err)=>{
        if (err){
            res.json({info: 'error during saving user', error: err});
        }
        res.json({info: 'User saved successfully', data: newUser});
    });
});

/* Read all */
app.get('/api/users', function (req, res) {

    //console.log(req);

    User.find((err, Users) => {
        if (err) {
            //console.log("error");
            res.json({info: 'error during find users', error: err});
        };

        res.json({info: 'Users found successfully', data: Users});
    });
});

/* Find one */
app.get('/api/users/:id', function (req, res) {

    //console.log(req.params.id);

    var query = { _id: req.params.id};

    User.findOne(query, function(err, User) {

        if (err) {
            res.json({info: 'error during find User', error: err});
        };
        if (User) {
            res.json({info: 'User found successfully', data: User});
        } else {
            res.json({info: 'User not found with id:'+ req.params._id});
        }
    });
});

/* Delete */
app.delete('/api/users', function (req, res) {

    var userToDelete = new User(req.body);

    var query = {_id: userToDelete._id};

    User.remove(query, function (err) {

        if (err) {
            console.log("in delete - user wasn't removed!!!");
            res.json({info: 'error during deleting user', error: err});
        }
        else
        {
            res.json({info: 'User deleted successfully', data: userToDelete});
        }
    });

});

/* Update */
app.put('/api/users/:id', function (req, res) {

    var updatedObject = new User(req.body);

    var query = { _id: updatedObject._id};

    User.update(query, updatedObject, function(err: any, affectedRows: number, raw:any)
    {
        if (err) {
            res.json({info: 'error during updating user', error: err});
        }
        else
        {
            res.json({info: 'User updated successfully', data: updatedObject});
        }
    });
});


var server = app.listen(4020, function () {
    console.log('Server listening on port 4020');
});