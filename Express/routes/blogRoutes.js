const express = require('express')
const Blog = require('../models/blog')
// const Blog = require('./models/blog')

const router = express.Router()

// To get and render all Blogs in the database
router.get('/', (req,res) => {
    // To get all Blogs in the database
    Blog.find().sort({createdAt: -1}) // getting all blogs data from database and sorting it by time created.
        .then((result) => {
        //   res.send(result)  
        res.render('index', {name: 'brownne', title: 'All Blogs', blogs: result})
        })    
        .catch((err) => {
            console.log(err)
        })
})

router.get('/create', (req, res) => {
    res.render('create', {title: 'create Blog'})
})

// Get a particular Blog by ID and navigate to the single blog page
router.get('/:id', (req,res) => {
    // console.log('parameter')
    // console.log(req.params)

    Blog.findById(req.params.id)
    .then((result) => {
        console.log(result)
        res.render('singlePost', {blog: result, title: 'single-blogPost'})
    })
    .catch((err) => {
        console.log(err)
    })


})

// add New Blog to database and redirect to home page
router.post('/', (req,res) => { 
    console.log(req.body) // i made use of express.urlencoded() middleware to make this possible
    const {title, snippet, body} = req.body

    const blog = new Blog ({
        title: title,
        snippet: snippet,
        body: body
    })

    blog.save()
        .then((data) => {
            res.redirect('/blogs')
        })
        .catch((err) => {
            console.log(err)
        })
    // res.send('seen')
})

// Get a particular Blog by ID and navigate to the single blog page
router.get('/:id', (req,res) => {
    // console.log('parameter')
    // console.log(req.params)

    Blog.findById(req.params.id)
    .then((result) => {
        console.log(result)
        res.render('singlePost', {blog: result, title: 'single-blogPost'})
    })
    .catch((err) => {
        console.log(err)
    })


})

// For Handling Delete Request
router.delete('/:id', (req,res) => {
    Blog.findByIdAndDelete(req.params.id)
        .then((result) => {
            console.log('delete complete')
            // res.redirect('/')
            res.json({redirect: '/blogs'})
        })
        .catch((err) => {
            console.log(err)
        })
})

// exporting the router
module.exports = router