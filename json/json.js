const fs = require('fs')


// const book = {
//     title: "My book",
//     author: 'Raj'
// }

// const bookstore = JSON.stringify(book)

// // fs.writeFileSync('book-json', bookstore)
// const dataread= fs.readFileSync('book-json')
// const datastring = dataread.toString()
// // console.log(datastring)

// data = JSON.parse(datastring)
// console.log(data.title)

const detailBuffer = fs.readFileSync('book-json')
const stJSON = detailBuffer.toString()
const user = JSON.parse(stJSON)

user.name = 'John'
user.age = 50

const newJSON =JSON.stringify(user)
fs.writeFileSync('book-json', newJSON)