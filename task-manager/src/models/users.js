const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userShcema =new mongoose.Schema( {
    name: {
        type: String,
        required: true
    },

    email : {
        type: String,
        required: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
        
    },
    age: {
        type: Number,
        validate(value) {
            if(value < 0) {
                throw new error('invalid age')
            }
        }
    },
    
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true
    }
})

userShcema.pre('save', async function (next) {
    const user = this
    
    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})
const User = mongoose.model('User', userShcema)

module.exports= User
