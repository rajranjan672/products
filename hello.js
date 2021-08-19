const notes= require('./notes.js')
const yargs = require('yargs')


yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder:{
        title: {
            describe: 'Title',
            demandOption: true,
            type: 'string'
        },
        
        body: {
            describe: 'body',
            demandOption:true,
            type: 'string'
        }
    },
    handler: function(argv) {
       notes.addnote(argv.title, argv.body)
    }
})

yargs.command({
    command:'remove',
    describe:'Remove a user',
    builder: {
        title: {
            describe:'Title',
            demandOption: true,
            type:'string'
        }
    },
    handler: function(argv) {
        notes.removenote(argv.title)
    }
})

yargs.command({
    command: 'list',
    describe:'listing',
    
   
    handler: function() {
        notes.listnote()
    }
})

console.log(yargs.argv)