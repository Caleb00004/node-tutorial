const fs = require('fs')

// console.log(fs)

// reading files (fs.readFile())
/* fs.readFile('./docs/textfile.txt', (err, data) => {
    if (err) {
        console.log(err)
    }
    console.log(data.toString())
})
*/

console.log('comes first')

// writing files(fs.writeFile())
/*
fs.writeFile('./docs/textfile.txt', 'picasso art', () => {
    console.log('file written')
})
*/

// directories (fs.mkdir())
// fs.mkdir('./assests', (err) => {
//     if(err) {
//         console.log(err)
//     }
//     else {
//         console.log('folder created')
//     }
// })

if(fs.existsSync('./docs/assests')) {
    fs.rmdir('./docs/assests', (err) => {
        if(err){
            console.log(err)
        } else {
            console.log('file removed')
        }
    })
}


// deleting files (fs.unlink())
if (fs.existsSync('./docs/textfile2.txt')) {
    fs.unlink('./docs/textfile2.txt', (err) => {
        if(err) {
            return console.log(err)
        }
        return console.log('file deleted')
    })
}

