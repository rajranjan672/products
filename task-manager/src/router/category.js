const Category = require('../models/category')
const express = require('express')
const router = new express.Router()

router.post('/category',  async (req, res) => {
    const category =  new Category({
        ...req.body,
        owner: req.product._id
    })

    try{
        await category.save()
        res.send(category)
    } catch (e) {
        res.send(e)
    }
})

router.get('/category', async(req, res) => {
    try {
        const category = await category.findOne({owner: req.user.id})
        res.send(category)
    } catch (e) {
        res.send(e)
    }
})

module.exports = router
