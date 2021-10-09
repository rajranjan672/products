const express = require('express')
require('../db/mongoose')
const Product = require('../models/product')
const auth = require('../middleware/auth')
const router = express.Router()


router.post('/product', (req, res) => {
    const product = new Product(req.body)
    user.save().then(() => {
        res.send(product)
    })
})

router.get('/product',  async(req, res) => {
    res.send(req.product)
    
})

router.get('/product/:id', (req,res) =>{
    const _id =req.params.id

    Product.findById(_id).then((product) => {
        res.send(product)
    })
})

router.patch('/product/:id', async (req,res) => {
    const updates = Object.keys(req, res)
    const allowedUpdates =['ProductName', 'price', 'quantity', 'InsTOCK']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators: true})

    res.send(product)
})




router.delete('/product/:id', async(req, res) => {
    try{
        const product = await Product.findByIdAndDelete(req.params.id)
        if(!product)  {
            return res.status(404).send()
        }
        res.send(product)
    }catch(e) {
        res.status(500).send()
    }
})

module.exports =router