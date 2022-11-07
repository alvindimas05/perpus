const express = require("express"),
bodyparser = require("body-parser"),
cors = require("cors"),
app = express();

app.use(bodyparser.urlencoded({extended:false}));
app.use(cors());

app.listen(80, () => console.log("Listening on 80"));

module.exports = app;