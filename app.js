const dotenv = require("dotenv").config();
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
