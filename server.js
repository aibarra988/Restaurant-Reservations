var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

var reservations = [
    {
        name: "John Q.",
        phone: "555-1234",
        partySize: 5,
      },
];

var waitlist = [];

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/api/reservations", function(req, res){
    return res.json(reservations);
});

app.post("/api/reservations", function(req, res){

    if (reservations.length < 5) {
        reservations.push(req.body);
        return res.end("Added to Reservations!"); 
    } else {
        waitlist.push(req.body);
        return res.end("Reservations are full.  You've been added to the waitlist.")
    }
    return res.json(true);
});

app.get("/api/waitlist", function(req, res){
    return res.json(waitlist);
});



app.listen(PORT, function(){
    console.log("Listening on port " + PORT);
});