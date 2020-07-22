require('dotenv/config');
require('./config/config');
const express                   = require('express');
const cors                      = require('cors');
const session                   = require('express-session');  
const app                       = express(); 
const passport                  = require('passport');
const bodyParser                = require('body-parser');
const cookieParser              = require('cookie-parser');
const isAuth                    = require('./middleware/isAuth'); 
const isAdmin                   = require('./middleware/isAdmin');
const initializePassport        = require('./middleware/passportConfig');
const fileUpload                = require('express-fileupload');

initializePassport(passport);
const corsOptions = {
    origin: ['http://192.168.1.67:3000','http://localhost:3000'],
    credentials: true,
};

//middleware
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
}));
app.use(cors(corsOptions));
app.use(cookieParser(process.env.SECRET,{SameSite: 'None'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload());
app.use(passport.initialize());
app.use(passport.session());
app.use("/",require("./routes/routerIndex"));
app.use("/user", isAuth, require("./routes/routerUser"));
app.use("/post", isAuth,require("./routes/routerPost"));
app.use("/admin", isAuth, isAdmin, require("./routes/routerAdmin"));

// routes
app.get("/",function(req,res){
    console.log(req.cookie);
    res.status(200).send("Welcome to my server web :)");
});

//port 
const PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
    console.log(`Server listen on port ${PORT}`);
});