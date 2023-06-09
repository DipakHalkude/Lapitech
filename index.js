const express = require("express");
const port = 3000;
const app = express();
const path=require("path");
const mongoose = require('mongoose');
const bodyparser=require("body-parser");

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Contact_us');
}

// define mongoose schema 

const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    concern:String
  });

  const Contact_us = mongoose.model('Contact_us',contactSchema);


// EXPRESS SPECIFIC STUFF
app.use("/static",express.static('static')); // for serving static files
app.use(express.urlencoded())



app.engine('html', require('ejs').renderFile);
app.set('view engine','html'); // set the template engine as html 
app.set('views',path.join(__dirname,'views')); // Set the view directory 



// ENDPOINTS
app.get('/', (req, res) => {
    res.render('index.html');
  });


  app.post("/contact",(req,res)=>{
    var mydata=new Contact_us(req.body);
    mydata.save().then(()=>{
      res.render('index.html');
    }).catch(()=>{
        res.status(400).send('Item was not saved to the database')
    });
}) 

// START SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
})

