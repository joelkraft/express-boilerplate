var express = require("express");
// morgan middleware gives feedback in the console
var logger = require("morgan");
// bodyParser allows you to parse request bodies.
var bodyParser = require("body-parser");

// These are route files being imported
var routes = require("./routes/index");
var users = require("./routes/users");

var app = express();

// Tell the app to use morgan middleware
app.use(logger("dev"));
// Tell the app to set any JSON bodies on the 
// `response.body` obejct
app.use(bodyParser.json());

// Tell the app to check the main routes
app.use("/", routes);
// Tell the app to check the users routes
app.use("/users", users);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: {}
    });
});

module.exports = app;
