'use strict';

//imports
var express = require('express');
// var bodyParser = require('body-parser');
// var request = require('request');
// var Alexa = require('alexa-sdk'); // For AWS
var Alexa = require('alexa-app');

var port = process.env.PORT || 3000;
//Assign port

var app = express();
//Create express object

var alexaApp = new Alexa.app("Nuance-Bot");

alexaApp.express({
    expressApp: app,

    // verifies requests come from amazon alexa. Must be enabled for production.
    // You can disable this if you're running a dev environment and want to POST
    // things to test behavior. enabled by default.
    checkCert: false,

    // sets up a GET route when set to true. This is handy for testing in
    // development, but not recommended for production. disabled by default
    debug: true
});

alexaApp.launch(function (request, response) {
    console.log(JSON.stringify(request));
    response.say("HELLO THERE. I AM AN HDFC ASSISTANT. YOU CAN ASK ME DETAILS ABOUT AN HDFC EMPLOYEE, YOUR PENDING SERVICE REQUESTS OR MAKING A NEW SERVICE REQUEST.!");
    response.reprompt("You there?");
});

//   alexaApp.dictionary = { "names": ["matt", "joe", "bob", "bill", "mary", "jane", "dawn"] };

alexaApp.intent("employeedetailsIntent",
    function (request, response) {
        // console.log(JSON.stringify(request));
        console.log(JSON.stringify(request.slots));
        response.say("LET ME SEE. THE MANAGER FOR HDFC MUMBAI OFFICE IS MANOHAR. PLEASE NOTE DOWN HIS CONTACT NUMBER. 9 7 4 8 9 7 8 8 1 2.!");
    }
);

alexaApp.intent("welcomeIntent",
    function (request, response) {
        console.log(JSON.stringify(request));
        response.say("HELLO THERE. I AM AN HDFC ASSISTANT. YOU CAN ASK ME DETAILS ABOUT AN HDFC EMPLOYEE, YOUR PENDING SERVICE REQUESTS OR MAKING A NEW SERVICE REQUEST.!");
    }
);

alexaApp.intent("newservicerequestIntent",
function(request, response) {
    console.log(JSON.stringify(request));
    console.log(JSON.stringify(request.slots));
  response.say("OKAY! REGARDING WHAT ITACHI?");
}
);

// app.post("/Nuance", function (req, res) {
//     var body = req.body;
//     var alexa = Alexa.handler(req, res);
//     alexa.registerHandlers(newSessionHandlers); //handlers contain alexa-sdk function based intent logic
//     alexa.execute();
//     // res.send('Uchiha');
//     console.log(JSON.stringify(req.body));
// });
//Configuring Entry Point

// var newSessionHandlers = {
//     'LaunchRequest': function() {        
//                 this.attributes['speechOutput']="Hello there! This is the launch request message. Place the default greeting message here. THis will play everytime you invoke the Alexa Skill."
//                 this.attributes['repromptSpeech']="Are you there? This is the secondary waiting message prompt if you don't say anything or I don't here anything."
//                 this.emit(':ask', this.attributes['speechOutput'],this.attributes['repromptSpeech']);
//             }
// };
//Session Handling Point

console.log("Server Running at Port : " + port);
app.listen(port);
// Listening to port
