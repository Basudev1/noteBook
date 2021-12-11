import React, {useState} from 'react';
import noteContext from './noteContext';
const NoteState = (props) =>{
    const inititalNotes =  [
            {
              "_id": "61ac7901e89519e1670c01do",
              "user": "61a885470a5f30ad46ddc453",
              "title": "My title",
              "description": "A Nice Description here",
              "tag": "Personal",
              "date": "1638693121446",
              "__v": 0
            },
            {
                "_id": "61ac7901e89519e1670c01dp",
                "user": "61a885470a5f30ad46ddc453",
                "title": "My title 1",
                "description": "A Nice Description here",
                "tag": "Personal",
                "date": "1638693121446",
                "__v": 0
              }
              ,
            {
                "_id": "61ac7901e89519e1670c01dm",
                "user": "61a885470a5f30ad46ddc453",
                "title": "My title 2",
                "description": "A Nice Description here",
                "tag": "Personal",
                "date": "1638693121446",
                "__v": 0
              }
              ,
            {
                "_id": "61ac7901e89519e1670c01dl",
                "user": "61a885470a5f30ad46ddc453",
                "title": "My title 4",
                "description": "A Nice Description here",
                "tag": "Personal",
                "date": "1638693121446",
                "__v": 0
              }
              ,
            {
                "_id": "61ac7901e89519e1670c01dk",
                "user": "61a885470a5f30ad46ddc453",
                "title": "My title 5",
                "description": "A Nice Description here",
                "tag": "Personal",
                "date": "1638693121446",
                "__v": 0
              }
          ]
    const [notes, setnotes] = useState(inititalNotes);
    //Add Note
    const addNote = (title, description, tag) =>{
      let note = {
        "_id": "61ac7901e89519e1670c01dk",
        "user": "61a885470a5f30ad46ddc453",
        "title": title,
        "description": description,
        "tag": tag,
        "date": "1638693121446",
        "__v": 0
      }
      setnotes(notes.concat(note))
    }

    //Edit Note
    const editNote = (id,title,description,tag) =>{

    }
    //Delete Notes
    const deleteNote = (id) =>{
      console.log("Deleting a note" + id);
      const newNotes = notes.filter(note =>{ return note._id !== id});
      setnotes(newNotes);

    }

        return (
<noteContext.Provider value={{notes, setnotes, addNote, editNote, deleteNote}}>
    {props.children}
</noteContext.Provider>
    )

}

export default NoteState;
