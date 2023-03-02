const express = require('express')
const morgan = require('morgan') // importing a 3rd Party middleware I installed
const mongoose = require('mongoose')
// const Blog = require('./models/blog')
const { result } = require('lodash')
const blogRoutes = require('../Express/routes/blogRoutes')

const app = express()

// gotten from the mongodb atlas server when i clicked on connect your application
// connect to mongoDB
// The connection string used to connect to our Database
// const dbURI = `mongodb+srv://netninja:ninja122@node-tuts.swatxcq.mongodb.net/?retryWrites=true&w=majority`
const dbURI = `mongodb+srv://netninja:ninja122@customD.swatxcq.mongodb.net/?retryWrites=true&w=majority`

// connecting to the database using mongoose
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then ((response) => (
        console.log('connected to database'),
        app.listen(3000)
    ))
    .catch((err) => console.log(err))

console.log('run ning')

// registering views
app.set('view engine', 'ejs')
app.set('views','myViews') // defining folder name for where views are stored (default folder name is 'veiw', so i must explicitly define mine.)


// creating middleware to log out some details for every request
app.use((req,res,next) => {
    console.log('\nNew Request made: ')
    console.log('Host: ', req.hostname)
    console.log('Path: ', req.path)
    console.log('Method: ', req.method)
    next()
})

// using a 3rd Party Middleware.
app.use(morgan('dev'))
app.use(morgan('dev'))

// middleware and static files
app.use(express.static('public'))

// A MIDDLEWARE - This is to make all the url encoded data gotten from the form to be usable.
// it passes it into an object.
app.use(express.urlencoded()) // middleware for accepting form data

/*
app.get('/add-blog', (req, res) => {
    console.log('add blog save')
    // creating a new instance of the model using the Scheema.
    const blog = new Blog({
        title: 'New collectino what test',
        snippet: 'This is an erro check for waht cant not be',
        body: 'My Body is a blog of the temple.'
    })

    // to save to the database
    blog.save() // an assynchronous process.
        .then ((data) => { 
            res.send(data)
            console.log('saved data')
        })
        .catch((err) => {
            console.log(err)
        })
})
*/

/* To get all Blogs in the database
app.get('/get-blog', (req,res) => {
    Blog.find()
        .then((result) => {
          res.send(result)  
        })    
        .catch((err) => {
            console.log(err)
        })
})
*/

/* To Get a Single BlogPost
app.get('/single-blog', (req, res) => {
    Blog.findById('63c704daafe3ced474c4aec9')
        .then((result) => {
            console.log(result)
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
})
*/

// listening for get request and sending back views
app.get('/', (req,res) => {
    // const blogs = [
    //     {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //     {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //     {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    // ];
    // res.render('index', {name: 'brwonne', title: 'Home', blogs: blogs})
    res.redirect('/blogs')
})

// Blog Routes

// moved code to blogRoutes file.

// app.use(blogRoutes)

// I'm scoping the blog routes here
app.use('/blogs', blogRoutes) // this routes will only run when the url begins with /blogs

app.get('/about', (req,res) => {
    res.render('about', {title: 'about'})
})

// for 404 Page.
app.use((req, res) => {
    res.status(404).render('404', {title: '404'})
    // res.statusCode = 404
})

// app.listen(3000)