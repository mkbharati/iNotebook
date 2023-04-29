const mongoose = require('mongoose');
const {Schema} = mongoose;
const NotesSchema = new Schema({
    user:{ // here user signify user id
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    title:{
        type: String, 
        required: true
    }, 
    description:{
        type: String,
        required: true
    },
    tag:{
        type: String
    }, 
    date:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('notes', NotesSchema)