const mongoose = require('mongoose')


const TaskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        required: true,
    },
    owner:{
         type: mongoose.Schema.Types.ObjectId,
         required: true,
         ref: 'User'
     }
})

const Task = mongoose.model('Task', TaskSchema)

module.exports =Task