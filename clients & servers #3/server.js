// File to Manually Create Server (Note: it dose'nt have to be called 'server.js')

const http = require('http')
const fs = require('fs')
const _ = require('lodash')

// creating the server 
const server = http.createServer((req, res) => {
/*    console.log('request made')
    console.log(req.url, req.method) */

    // lodash
    const num = _.random(0,30)
    console.log(num)
    
    const greet = _.once(() => {
        console.log('Hello World')
    })

    greet()
    greet()

    // set Header content Type
    res.setHeader('Content-Type', 'text/html') //

    let path = './views'
    
    // Checking what url was requested to decide routing of pages
    if(req.url == '/') {
        // path = `${path}/index.html`
        path += '/index.html'
        res.statusCode = 201
    }
    // redirecting back to the home page
    else if (req.url == '/home') {
        res.statusCode = 301
        res.setHeader('Location', '/')
        res.end()
    }
    else if (req.url == '/about') {
        path = `${path}/about.html`
        res.statusCode = 201
    } 
    else {
        path = `${path}/404.html`
        res.statusCode = 404
    }

    // sending an HTML File
    fs.readFile(path, (err, data) => {
        if(err){
            console.log(err)
            res.end() // to 
        } else {
            res.write(data)
            // res.statusCode = 200
            res.end()

            // Note; res.write(data) or res.end(data) will both work the same way.
        }
    })

    // res.write('<h1>Hello World</h1>')
})


server.listen(3000, 'localhost', () => {
    console.log('listening for request on PORT 3000')
})
