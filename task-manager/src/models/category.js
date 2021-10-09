const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
    CategoryId: {
        type: Number,
        required: true,
    },
    CategoryName: {
        type: Number,
        required: true,
    },
    owner:{
         type: mongoose.Schema.Types.ObjectId,
         required: true,
         ref: 'Product'
     }
})

const Category = mongoose.model('Category', CategorySchema)

module.exports =Category