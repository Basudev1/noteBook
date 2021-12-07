const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const { findById, findByIdAndUpdate } = require('../models/Note');
const Note = require('../models/Note');
// Route 1: Get a user notes using: GET "/api/auth/fetchallnotes". login required
router.get('/fetchallnotes',fetchuser, async (req, res) => {
    
    try {
        const notes = await Note.find({user: req.user.id});
    res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
      }
})
// Route 2: Add new notes using: POST "/api/auth/addnote". login required
router.post('/addnote',fetchuser,[
    body('title', 'Title should be atleast 3 characters').isLength({ min: 3 }),
    body('description', 'Description should be atleast 5 characters').isLength({ min: 5 }),
  ], async (req, res) => {
      const {title, description, tag} = req.body;
     // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
        const note = new Note({
            title, description, tag, user: req.user.id});
        const savedNote = await note.save();
        res.send(savedNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
      }
    

})

// // Route 3: Update an existing note using: POST "/api/auth/updatenote". login required
// router.put('/updatenote:id',fetchuser, async (req, res) => {
//       const {title, description, tag} = req.body;
//       const newNote = {};
//       if(title){newNote.title = title};
//       if(description){newNote.description = description};
//       if(tag){newNote.tag = tag};

//       //find the id to be updated an update it
//       let note = await Note.findById(req.params.id); there was amistake here
//         if(!note){
//             return res.status(404).send("Note not found");
//         }
//         if(note.user.toString() !== req.user.id){
//             return res.status(401).send("Not Allowed");
//         }
//         note = await findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true});
//         res.json({note});
//   });
// ROUTE 3: Update an existing Note using: PUT "/api/notes/updatenote". Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const {title, description, tag} = req.body;
    try {
        
    
    // Create a newNote object
    const newNote  = {};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};

    // Find the note to be updated and update it
    let note = await Note.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found")}

    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
    res.json({note});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
}

    })

// ROUTE 4: Delete an existing Note using: Delete "/api/notes/deletenote". Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    const {title, description, tag} = req.body;
    try {
        
    
    // Find the note to be deleted and delete it
    let note = await Note.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found")}
//Check wether the user owns the note or not
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({"success": "Note has been deleted"});

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});
module.exports = router;