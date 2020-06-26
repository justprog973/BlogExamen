require('dotenv/config');
require('./config/database');
const express                   = require('express');
const cors                      = require('cors');
const session                   = require('express-session');  
const app                       = express(); 
const passport                  = require('passport');
const bodyParser                = require('body-parser');
const cookieParser              = require('cookie-parser');
const isAuth                    = require('./middleware/isAuth'); 
const initializePassport        = require('./middleware/passportConfig');

initializePassport(passport);

//middleware
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
}));
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(passport.initialize());
app.use(passport.session());
app.use("/",require("./routes/routerIndex"));
app.use("/user", isAuth, require("./routes/routerUser"));

// routes
app.get("/",function(req,res){
    res.status(200).send("Welcome to my server web :)");
});

//port 
const PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
    console.log(`Server listen on port ${PORT}`);
});