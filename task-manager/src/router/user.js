const express = require('express')
require('../db/mongoose')
const User = require('../models/users')
const auth = require('../middleware/auth')
const router = express.Router()


router.post('/users', (req, res) => {
    const user = new User(req.body)
    user.save().then(() => {
        res.send(user)
    })
})

router.get('/users/me', auth, async(req, res) => {
    res.send(req.user)
    
})

router.get('/users/:id', (req,res) =>{
    const _id =req.params.id

    User.findById(_id).then((user) => {
        res.send(user)
    })
})

router.patch('/users/:id', async (req,res) => {
    const updates = Object.keys(req, res)
    const allowedUpdates =['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators: true})

    res.send(user)
})

router.post('/users/login', async(req, res) => {
   
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.getSignedjwt()
    res.send(token)
})

router.post('/users/logout', auth, async(req, res) =>{
        req.user = req.user.filter((token) => {
            return token.token !== req.token
        }) 
        await req.user.save()

        res.send()
})

router.delete('/users/:id', async(req, res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user)  {
            return res.status(404).send()
        }
        res.send(user)
    }catch(e) {
        res.status(500).send()
    }
})

module.exports =router