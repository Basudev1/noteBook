const mongoose = require('mongoose');
const NotesSchema = new Schema({
   title: {
       type: String,
       required: true
   },
   description: {
       type: String,
       unique: true
   },
   tag: {
       type: String,
       default: 'General'
   },
   date: {
       type: String,
       default: Date.now
   },
  });
  module.exports = mongoose.model('Notes', NotesSchema);