const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userShcema =new mongoose.Schema( {
    name: {
        type: String,
        required: true
    },

    email : {
        type: String,
        required: true,
        unique: true,
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
    },
    tokens:[{
        token:{
            type: String,
            required: true
        }
    }]
})


userShcema.methods.getSignedjwt = async function() {
    const user = this
    const token =jwt.sign({_id: user._id.toString()}, 'thisis')
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userShcema.statics.findByCredentials = async(email, password) => {
    const user =await User.findOne({email})
    if(!user) {
        throw new Error('Unable to login')
    }
    const Match = await bcrypt.compare(password, user.password)
    if(!Match) {
        throw new Error('Unable to ligin')
    }
    return user
}

userShcema.pre('save', async function (next) {
    const user = this
    
    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})
const User = mongoose.model('User', userShcema)

module.exports= User
