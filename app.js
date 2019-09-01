require('dotenv').config();

const bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      express = require('express'),
      port = 3000,
      app = express(),
      uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-fkjkr.mongodb.net/blog-app?retryWrites=true&w=majority`;



// App config
mongoose.connect(uri, { useNewUrlParser: true });
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

// Mongoose/Model config
const blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: { 
        type: Date,
        default: Date.now
    }
});

const Blog = mongoose.model('Blog', blogSchema);


// Restful routes
app.get('/', (req, res) => {
    res.redirect('blogs');
});

app.get('/blogs', (req, res) => {
    Blog.find({}, (err, blogs) => {
        if (err) {
            console.log(err);
        } else {
            res.render('index', {blogs: blogs});
        }
    });
});

app.listen(port, () => {
    console.log(`App started on port: ${port}`);
});
