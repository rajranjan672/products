const Task = require('../models/task')
const express = require('express')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/task', auth, async (req, res) => {
    const task =  new Task({
        ...req.body,
        owner: req.user._id
    })

    try{
        await task.save()
        res.send(task)
    } catch (e) {
        res.send(e)
    }
})

router.get('/tasks', async(req, res) => {
    try {
        const tasks = await Task.findOne({owner: req.user.id})
        res.send(tasks)
    } catch (e) {
        res.send(e)
    }
})

module.exports = router
