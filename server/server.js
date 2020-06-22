const express       = require('express');
const bodyParser    = require('body-parser');
const cors          = require('cors');
const app           = express(); 


app.use(cors());
app.use(bodyParser.json());

app.use("/register",require('./routes/createuser'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server listen on port ${PORT}`);
});