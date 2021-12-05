const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
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


module.exports = router;