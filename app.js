const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
require('dotenv').config();

const port = 3000;
const app = express();
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-fkjkr.mongodb.net/blog_app?retryWrites=true&w=majority`;

mongoose.connect(uri, { useNewUrlParser: true });

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));





app.listen(port, () => {
    console.log(`App running on port: ${port}`);
});