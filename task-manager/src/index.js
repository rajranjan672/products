const express = require('express')
require('./db/mongoose')

const product_router = require('./router/product')
const category_router = require('./router/category')

const app = express()
const port =process.env.PORT || 3000

app.use(express.json())
app.use(product_router)
app.use(category_router)
// app.use(task_router)

// app.use((req, res, next) => {
//     if(req.method==='GET') {
//         res.send('Get req disabled')
//     } else {
//         next()
//     }
// })


app.listen(port, () => {
    console.log('Server is up' + port)
})

const Category =require('./models/category')
const Product = require('./models/product')
const main = async() =>{
    // const task = await Task.findById('612b4be40ae97a2454d3c787')
    // await task.populate('owner').exePopulate()
    // console.log(task.owner)

    const product = await Product.findById('612b4be40ae97a2454d3c787')
    await product.populate('category').execPopulate() 
    console.log(product.category)
}

main()
