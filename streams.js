const fs = require('fs')

// the blog.txt is relatively a big file.
// so i'm reading it via a stream.
const myReadStream = fs.createReadStream('./docs/blog1.txt', {encoding: 'utf-8'})
const myWriteStream = fs.createWriteStream('./docs/blog2.txt')


// placing an 'on' event listener on the stream data.
// this means the callback function will fire whenever a new chunk of data is gotten/recived from the file.
// instead of waiting for the whole file to finish processing, i can make use of the small chunks available first.
myReadStream.on('data', (chunk) => {
    console.log('___NEW CHUNK___')
    // console.log(chunk)

    myWriteStream.write('\nNEW CHUNK\n')
    myWriteStream.write(chunk)
})

// A pipe.
// works well when passing data from a readable stream to a writable stream



