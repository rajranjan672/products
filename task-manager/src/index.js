const express = require('express')
require('./db/mongoose')
const User = require('./models/users')

const app = express()
const port =process.env.PORT || 3000

app.use(express.json())

app.post('/users', (req, res) => {
    const user = new User(req.body)

    user.save().then(() => {
        res.send(user)
    })
})

app.get('/users', (req, res) => {
    User.find({}).then((users) => {
        res.send(users)
    })
})

app.get('/users/:id', (req,res) =>{
    const _id =req.params.id

    User.findById(_id).then((user) => {
        res.send(user)
    })
})

app.patch('/users/:id', async (req,res) => {
    const updates = Object.keys(req, res)
    const allowedUpdates =['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators: true})

    res.send(user)
})



app.listen(port, () => {
    console.log('Server is up' + port)
})

