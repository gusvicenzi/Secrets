const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();
const urlmongo = "mongodb://localhost:27017/userDB";
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

mongoose.connect(urlmongo);

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

new User = new mongoose.model("User", userSchema);

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.render("home");
});

app.get("/login", function (req, res) {
  res.render("login");
});

app.route("/register")
.get(function (req, res) {
  res.render("register");
})
.post(function(req, res){
    const newUser = new User({
        email: req.body.username,
        password: req.body.password
    });
    newUser.save(function(err){
        if (err){
            console.log(err);
        }else{
            res.render("secrets");
        }
    });
});

app.listen(port, function () {
  console.log("Successfully started server.");
});
