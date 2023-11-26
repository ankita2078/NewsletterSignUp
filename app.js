// //jshint esversion:6

// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');
// const request = require("request");
// const https = require('https');

// app.get("/", function (req, res) {
//     res.sendFile(__dirname + "/signup.html");
// });

// app.use(express.static("public"));
// app.use(bodyParser.urlencoded({ extended: true }));

// app.post("/", function (req, res) {

//     const firstName = req.body.fname;
//     const lastName = req.body.lname;
//     const email = req.body.email;
//     console.log(firstName, lastName, email);
//     console.log("Post received.")

//     const data = {
//         members: [{
//             email_address: email,
//             status: "subscribed",
//             merge_fields: {
//                 FNAME: firstName,
//                 LNAME: lastName
//             }
//         }]
//     };

//     const jsonData = JSON.stringify(data);
//     const url = "https://us21.api.mailchimp.com/3.0/lists/8522ac49eb";

//     const options = {
//         method: "POST",
//         auth: "hina:bf228f7bd38e0973dce5e1f16a61bac7-us21"
//     }

//     // https.request(url, options, function (response)
//     const request = https.request(url, options, function (response) {

//         if (response.statusCode == 200) {
//             res.sendFile(__dirname + "/success.html");
//         } else {
//             res.sendFile(__dirname + "/failure.html");
//         }
//         response.on("data", function (data) {
//             console.log(JSON.parse(data));
//         })
//     })
//     request.write(jsonData);
//     request.end();

// })


// app.post("/failure", function (req, res) {
//     res.redirect("/");
// })




// app.listen(3000, function () {
//     console.log("Server is running on port 3000");
// })







// //API Key
// //bf228f7bd38e0973dce5e1f16a61bac7-us21


// // List ID
// // 8522ac49eb





const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
});

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/", (req, res) => {
    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;
    console.log(firstName, lastName, email);
    console.log("Post received.");

    const data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }]
    };

    const jsonData = JSON.stringify(data);
    const url = "https://us21.api.mailchimp.com/3.0/lists/8522ac49eb";
    const apiKey = "hina:bf228f7bd38e0973dce5e1f16a61bac7-us21";

    const base64ApiKey = Buffer.from(apiKey).toString('base64');

    axios.post(url, jsonData, {
        headers: {
            Authorization: `Basic ${base64ApiKey}`,
        }
    })
        .then(response => {
            if (response.status === 200) {
                res.sendFile(__dirname + "/success.html");
            } else {
                res.sendFile(__dirname + "/failure.html");
            }
            console.log(response.data);
        })
        .catch(error => {
            console.error(error);
            res.sendFile(__dirname + "/failure.html");
        });
});

app.post("/failure", (req, res) => {
    res.redirect("/");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
