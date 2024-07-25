const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3001;

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/Contact_us', { useNewUrlParser: true, useUnifiedTopology: true })
    .catch(err => console.error(err));

// Define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    concern: String
});
const Contact_us = mongoose.model('Contact_us', contactSchema);

// Middleware
app.use("/static", express.static(path.join(__dirname, 'static')));
app.use(bodyParser.urlencoded({ extended: true }));

// Set up view engine
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req, res) => {
    res.render('index.html');
});

app.post("/contact", (req, res) => {
    const myData = new Contact_us(req.body);
    myData.save()
        .then(() => res.render('index.html'))
        .catch(() => res.status(400).send('Item was not saved to the database'));
});

// Start server
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});
