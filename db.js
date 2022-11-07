const mongoose = require("mongoose"),

username = "alvindimas05",
password = "adp050107",
domain = "perpus.73lrcry.mongodb.net",
database = "perpus",

db = mongoose.createConnection(`mongodb+srv://${username}:${password}@${domain}/${database}`),

userSchema = new mongoose.Schema({
    username:String,
    password:String,
    book_id:Number,
    date_rent:String,
    date_return:String
}),

bookSchema = new mongoose.Schema({
    book_id:Number,
    title:String,
    author:String,
    category:Number,
    publications:String,
    status:Boolean,
    date_return:String
}),

ratingSchema = new mongoose.Schema({
    book_id:Number,
    data:Array
}),

User = db.model("users", userSchema),
Book = db.model("books", bookSchema),
Rating = db.model("ratings", ratingSchema);

module.exports = {
    User:User,
    Book:Book,
    Rating:Rating
}