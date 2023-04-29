const express = require('express')
const router = express.Router()
const fetchuser = require('../middleware/fetchuser')
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator');
router.get('/getnotes', fetchuser, async (req, res) => {

    try {
        // Here we are getting user id from fetchuser req.used.id not from body
        notes = await Notes.find({user: req.user.id}) // find only this user
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error')
    }

})

router.post('/addnote', fetchuser, [
    body('title', 'Enter minimum 5 character').isLength({ min: 5 }),
    body('description', 'Enter minimum 10 character').isLength({ min: 10 })
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
    }
    try {
        note = await Notes.create({
            title: req.body.title,
            description: req.body.description,
            tag: req.body.tag,
            user: req.user.id // save the user id which is efficient in retrieving 
        })
        res.json(note)

        // note = new Notes({   // Alternative way
        //   title: req.body.title,
        //   description: req.body.description,
        //   tag: req.body.tag,
        //   user: req.user.id
        // })
        //const savenotes = await note.save();
        //res.json(savenotes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error')
    }

})

router.put('/updatenote/:id', fetchuser, async (req, res) => {
    // const errors = validationResult(req)
    // if (!errors.isEmpty()) {
    //     res.status(400).json({ errors: errors.array() })
    const { title, description, tag } = req.body
    // }
    try {
        
        const newNote = {}
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }

        let note = await Notes.findById(req.params.id) // params used for parameter passed in function

        if (!note) { return res.status(404).send('Not found') }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send('Unauthorised access')
        }
        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, { new: true })
        res.json(note)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error")
    }
})

router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    // const errors = validationResult(req)
    // if (!errors.isEmpty()) {
    //     res.status(400).json({ errors: errors.array() })
    // }
    try {

        let note = await Notes.findById(req.params.id) // params used for parameter passed in function

        if (!note) { return res.status(404).send('Not found') }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send('Unauthorised access')
        }
        note = await Notes.findByIdAndDelete({_id:req.params.id}) // another example of passing variable correct way
        res.json(note)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error")
    }
})



module.exports = router

// , [
//     body('title', 'Enter minimum 5 character').isLength({ min: 5 }),
//     body('description', 'Enter minimum 10 character').isLength({ min: 10 })
// ]

//findOne and find takes two argument one models variable and one body variable
// findbyId take only one variable only id because since id is unique in mongodb so no need to pass to parameter