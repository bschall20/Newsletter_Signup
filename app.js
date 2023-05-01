<<<<<<< HEAD
require('dotenv').config();
const bodyParser = require("body-parser");
const request = require("request");
const express = require("express");
const https = require("https");

const mailchimp = require("@mailchimp/mailchimp_marketing");
mailchimp.setConfig({
    apiKey: process.env.API_KEY,
    //API KEY PREFIX (THE SERVER)
    server: "us21"
})

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const uEmail = req.body.userEmail;

    const data = {
        members: [
            {
                email_address: uEmail,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = process.env.URL;

    const options = {
        method: "POST",
        // auth: "brennan1:a310a40b75890188e9c3be5ec6877b32-us21"
        auth: process.env.AUTH
    };

    const request = https.request(url, options, function (response) {

        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html")
        }
        else {res.sendFile(__dirname + "/failure.html"); 
        }

        response.on("data", function (data) {
            console.log(JSON.parse(data));
        })

    });
    request.write(jsonData);
    request.end();
});

app.post("/failure", function(req,res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, function () {
    console.log("Server is running on port 3000.");
});



// //***********************MAILCHIMP***********************
// //API KEY:
// // a310a40b75890188e9c3be5ec6877b32-us21
// new API key (12/07/2022): 63748cb09e6723c97e61180237584115-us21

// //AUDIENCE ID?:
// // 9f39466074


=======
const bodyParser = require("body-parser");
const request = require("request");
const express = require("express");
const https = require("https");

const mailchimp = require("@mailchimp/mailchimp_marketing");
mailchimp.setConfig({
    //API KEY
    // apiKey: "a310a40b75890188e9c3be5ec6877b32-us21",
    apiKey: "63748cb09e6723c97e61180237584115-us21",
    //API KEY PREFIX (THE SERVER)
    server: "us21"
})

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const uEmail = req.body.userEmail;

    const data = {
        members: [
            {
                email_address: uEmail,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/lists/9f39466074";

    const options = {
        method: "POST",
        // auth: "brennan1:a310a40b75890188e9c3be5ec6877b32-us21"
        auth: "brennan1:63748cb09e6723c97e61180237584115-us21"
    };

    const request = https.request(url, options, function (response) {

        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html")
        }
        else {res.sendFile(__dirname + "/failure.html"); 
        }

        response.on("data", function (data) {
            console.log(JSON.parse(data));
        })

    });
    request.write(jsonData);
    request.end();
});

app.post("/failure", function(req,res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, function () {
    console.log("Server is running on port 3000.");
});



// //***********************MAILCHIMP***********************
// //API KEY:
// // a310a40b75890188e9c3be5ec6877b32-us21

// //AUDIENCE ID?:
// // 9f39466074


>>>>>>> dc2252979237a6cc0f86309c2c886834e435c94b
// //11:33