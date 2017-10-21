import * as mongoose from "mongoose";

interface IUser{
    username:string;
    firstName :string;
    lastName:string;
    password:string;
    email:string;
    profile_photo:string;
}

interface IUserModel extends IUser, mongoose.Document{};
var userSchema = new mongoose.Schema({
    username: String,
    firstName: String,
    lastName: String,
    password: String,
    email: String,
    profile_photo:String
 });

var User = mongoose.model<IUserModel>("User", userSchema);

export = User;