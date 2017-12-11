'use strict';

//imports
var express = require('express');
// var bodyParser = require('body-parser');
// var request = require('request');
// var Alexa = require('alexa-sdk'); // For AWS
var Alexa = require('alexa-app');
var objRequest = require('./models/requestdetails');
var objData = new objRequest.RequestData();

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
    let card = {
        "card": {
            "type": "Standard",
            "title": "This is the Greeting message from HDFC Assistant",
            "text": "Your ride is on the way to 123 Main Street!\nEstimated cost for this ride: $25",
            "image": {
              "smallImageUrl": "https://carfu.com/resources/card-images/race-car-small.png",
              "largeImageUrl": "https://carfu.com/resources/card-images/race-car-large.png"
            }
          }
      }
    console.log(JSON.stringify(request));
    // response.say("HELLO THERE. I AM AN HDFC ASSISTANT. YOU CAN ASK ME DETAILS ABOUT AN HDFC EMPLOYEE, YOUR PENDING SERVICE REQUESTS OR MAKING A NEW SERVICE REQUEST.!")
    //     .reprompt("You there?");

        response.card(card);
    });

//   alexaApp.dictionary = { "names": ["matt", "joe", "bob", "bill", "mary", "jane", "dawn"] };

alexaApp.intent("employeedetailsIntent",
    function (request, response) {
        // console.log(JSON.stringify(request));
        console.log(JSON.stringify(request.slots.City.value));
        let city = request.slots.City.value;
        let contact = request.slots.Contact.value;
        response.say("LET ME SEE. THE MANAGER FOR HDFC "+ city +" OFFICE IS MANOHAR. PLEASE NOTE DOWN HIS "+ contact +" NUMBER. 9 7 4 8 9 7 8 8 1 2.!")
            .reprompt("You there?");
    }
);

alexaApp.intent("welcomeIntent",
    function (request, response) {
        let card = {
            "card": {
                "type": "Standard",
                "title": "This is the Greeting message from HDFC Assistant",
                "text": "Your ride is on the way to 123 Main Street!\nEstimated cost for this ride: $25",
                "image": {
                  "smallImageUrl": "https://carfu.com/resources/card-images/race-car-small.png",
                  "largeImageUrl": "https://carfu.com/resources/card-images/race-car-large.png"
                }
              }
          }
        console.log(JSON.stringify(request));
        // response.say("HELLO THERE. I AM AN HDFC ASSISTANT. YOU CAN ASK ME DETAILS ABOUT AN HDFC EMPLOYEE, YOUR PENDING SERVICE REQUESTS OR MAKING A NEW SERVICE REQUEST.!")
        //     .reprompt("You there?");
        response.card(card);
    }
);

alexaApp.intent("newservicerequestIntent",
    function (request, response) {
        console.log(JSON.stringify(request));
        response.say("OKAY! REGARDING WHAT?")
            .reprompt("You there?");
    }
);

alexaApp.intent("requesttypeIntent",
    function (request, response) {
        console.log(objData);
        console.log(JSON.stringify(request));
        // console.log(JSON.stringify(request.slots));
        if (request.slots.DesktopRequest == undefined) {
            response.say("PLEASE TELL REGARDING WHAT YOU WANT TO MAKE A SERVICE REQUEST?")
                .reprompt("You there?");
        }
        else {
            objData.RequestType = request.slots.DesktopRequest.value;
            response.say("PLEASE TELL ME YOUR EMPLOYEE ID")
                .reprompt("You there?");
        }
    }
);

alexaApp.intent("employeeIdIntent",
    function (request, response) {
        console.log(objData);
        console.log(JSON.stringify(request.slots));
        if (request.slots.EmployeeId == undefined) {
            response.say("PLEASE TELL ME YOUR EMPLOYEE ID")
                .reprompt("You there?");
        }
        else if (objData.RequestType == null || objData.RequestType == '') {
            response.say("PLEASE TELL REGARDING WHAT YOU WANT TO MAKE A SERVICE REQUEST?")
            .reprompt("You there?");
        }
        else {
            objData.EmployeeId = request.slots.EmployeeId.value;
            response.say("YOUR SERVICE REQUEST HAS BEEN RAISED FOR THE "+ objData.RequestType +" FOR THE NEW JOINEES UNDER EMPLOYEE ID "+ objData.EmployeeId)
                .reprompt("You there?");
        }
    }
);

alexaApp.intent("pendingrequestIntent",
function (request, response) {
    console.log(JSON.stringify(request));
    console.log(JSON.stringify(request.slots));
    response.say("YOU HAD RAISED THREE SERVICE REQUESTS YESTERDAY. THE ONE FOR A NEW DESKTOP ALLOCATION HAS BEEN APPROVED.")
        .reprompt("You there?");
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
