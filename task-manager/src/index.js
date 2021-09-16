const express = require('express')
require('./db/mongoose')

const user_router = require('./router/user')
const task_router = require('./router/task')

const app = express()
const port =process.env.PORT || 3000

app.use(express.json())
app.use(user_router)
app.use(task_router)
// app.use(task_router)

// app.use((req, res, next) => {
//     if(req.method==='GET') {
//         res.send('Get req disabled')
//     } else {
//         next()
//     }
// })

const multer = require('multer')
const upload = multer({
    dest: 'images',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(doc|docx)$/)) {
            return cb(new Error ('unsuported file type'))
        } 

        cb(undefined, true)
    }
})


app.post('/upload', upload.single('upload'), (req, res) =>  {
    res.send()
})


app.listen(port, () => {
    console.log('Server is up' + port)
})

