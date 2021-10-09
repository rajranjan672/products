const mongoose = require('mongoose')

const ProductShcema =new mongoose.Schema( {
    ProductId: {
        type: Number,
        required: true
    },

    ProductName:{
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        validate(value) {
            if(value < 0) {
                throw new error('invalid age')
            }
        }
    },
    
    price:{
        type: Number,
        required: true
    },

    InStock:{
        type: Boolean,
        required: true
    },
    
})

ProductShcema.virtual('Category', {
    ref:'Category',
    localField:"_id",
    foreignField: 'owner'
})


const Product = mongoose.model('Product', ProductShcema)

module.exports= Product
