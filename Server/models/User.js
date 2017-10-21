"use strict";
var mongoose = require("mongoose");
;
var userSchema = new mongoose.Schema({
    username: String,
    firstName: String,
    lastName: String,
    password: String,
    email: String,
    profile_photo: String
});
var User = mongoose.model("User", userSchema);
module.exports = User;
//# sourceMappingURL=User.js.map