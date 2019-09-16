require('dotenv').config();

const bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      express = require('express'),
      port = 3000,
      app = express(),
      uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-fkjkr.mongodb.net/blog-app?retryWrites=true&w=majority`,
      methodOverride = require('method-override');



// App config
mongoose.connect(uri, { useNewUrlParser: true });
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

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

// INDEX ROUTE
app.get('/blogs', (req, res) => {
    Blog.find({}, (err, blogs) => {
        if (err) {
            console.log(err);
        } else {
            res.render('index', {blogs: blogs});
        }
    });
});

// NEW ROUTE
app.get('/blogs/new', (req, res) => {
    res.render('new');
});
// CREATE ROUTE
app.post('/blogs', (req, res) => {
    Blog.create(req.body.blog, (err, newBlog) => {
        if (err) {
            res.render('new')
        } else {
            res.redirect('/blogs')
        }
    })
});

/// SHOW ROUTE
app.get('/blogs/:id', (req, res) => {
    Blog.findById(req.params.id, (err, foundBlog) => {
        if (err) {
            res.redirect('/blogs');
        } else {
            res.render('show', {blog: foundBlog});
        }
    });
});

// EDIT  ROUTE
app.get('/blogs/:id/edit', (req, res) => {
    Blog.findById(req.params.id, (err, foundBlog) => {
        if (err) {
            res.redirect('/blogs')
        } else {
            res.render('edit', {blog: foundBlog});
        }
    });
});

// UPDATE ROUTE
app.put('/blogs/:id', (req, res) => {
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedBlog) => {
        if (err) {
            res.redirect('/blogs');
        } else {
            res.redirect(`/blogs/${req.params.id}`);
        }
    });
});


// DELETE ROUTE!
app.delete('/blogs/:id', (req, res) => {
    Blog.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            res.redirect('/blogs');
        } else {
            res.redirect('/blogs');
        }
    })
});

app.listen(port, () => {
    console.log(`App started on port: ${port}`);
});
