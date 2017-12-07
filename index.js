'use strict';

//imports
var express = require('express');
var bodyParser = require('body-parser');
// var request = require('request');
var Alexa = require('alexa-sdk');

app = express();
//Create express object

var port = process.env.PORT || 3000;
//Assign port

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//Configuring express app behaviour

app.post("/Nuance", function (req, res) {
    var body = req.body;
    var alexa = Alexa.handler(req, res);
    alexa.registerHandlers(newSessionHandlers); //handlers contain alexa-sdk function based intent logic
    alexa.execute();
    res.send('Uchiha');
    console.log(JSON.stringify(req.body));
});
//Configuring Entry Point

var newSessionHandlers = {
    'LaunchRequest': function() {        
                this.attributes['speechOutput']="Hello there! This is the launch request message. Place the default greeting message here. THis will play everytime you invoke the Alexa Skill."
                this.attributes['repromptSpeech']="Are you there? This is the secondary waiting message prompt if you don't say anything or I don't here anything."
                this.emit(':ask', this.attributes['speechOutput'],this.attributes['repromptSpeech']);
            }
};
//Session Handling Point

console.log("Server Running at Port : " + port);
app.listen(port);
// Listening to port
