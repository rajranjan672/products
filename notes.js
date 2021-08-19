const fs = require('fs')
const chalk = require('chalk')

const getnotes = function() {
    return "Your notes..."
}

const addnote = function (title, body) {
    const notes = loadnotes()
    const duplicatenote = notes.filter(function (note) {
        return note.title === title
    })

    if (duplicatenote.length === 0) {
        notes.push({
            title: title,
            body:body
        })
    
        savenote(notes)
        console.log('New note addes')
    } else {
        console.log('Title taken')
    }
}

const removenote = function (title) {
    const notes = loadnotes()
    notestokeep = notes.filter(function (note){
        return note.title !== title
    })
    
    savenote(notestokeep)
}

const listnote = () => {
    const notes =loadnotes
    console.log(chalk.inverse('notes'))
    
    notes.forEach((note) => {
         console.log(note.title)
    })
}
 
    
const savenote = function (notes) {
    const dataJSON =JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}


const loadnotes = () => {
    try{
        const defaultload =fs.readFileSync('notes.json')
        const datajson = defaultload.toString()
        return JSON.parse(datajson)

    } catch (e) {
        return []
    }
    
}



module.exports ={
    getnotes:getnotes,
    addnote: addnote,
    removenote: removenote,
    listnote:listnote
}