const express = require('express')
const fs = require('fs')

// creating an express app
const app = express()

// listening for request
app.listen(3000)

// listening for get request & sending back HTML
/*
app.get('/', (req, res) => {
    // res.write('hello boy')
    res.send('<h1>The home pgae</h1>')
})

app.get('/about', (req, res) => {
    // res.write('hello boy')
    res.send('<h1>TThe ABout Page..</h1>')
})

app.get('*', (req, res) => {
    // res.write('hello boy')
    res.send('<h1>OOps 404 page</h1>')
})

*/

const path = './Pages'
// listening for get request and sending back HTML Pages
app.get('/', (req, res) => {

    res.sendFile('./Pages/index.html', {root: __dirname})

    // The path is not relaitve to the Project folder. By default it is an absolute path i.e it relative form the root file computer ://USER
    // so we need to pass a second parameter that specifies what the root should be. i.e we want it to be root of the project folder
    // second parameter is an object {root: __dirname} '__dirname' wil get the directory we are currently in.
})

app.get('/contact', (req, res) => {
    res.sendFile(path + '/contact.html', {root: __dirname})
})

// redirect
app.get('/contact-us', (req, res) => {
    res.redirect('/contact')
})

// 404 - no routes matched
/*

app.get('*', (req, res) => {
    res.statusCode = 404
    res.sendFile(path + '/error.html', {root: __dirname})
})

*/

// or

// app.use() this is used to  cretae middleware and fire middleware functions in express.
// use function basicallyjust says use this function for any incoming request. i.e its not scoped to any Particuar url, it fires for every single request
// so if all the above path's dont match, this will run. NOTE: express looks for path from Top To Bottom.
// so the app.use MUST BE AT THE BOTTOM OF ALL YOUR ROUTES.

app.use((req, res) => {
    res.statusCode = 404
    res.sendFile(path + '/error.html', {root: __dirname})
})