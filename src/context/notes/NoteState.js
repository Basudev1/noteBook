import React, { useState } from "react";
import noteContext from "./noteContext";
const NoteState = (props) => {
  const host = "http://localhost:5000";
  const inititalNotes = [];
  const [notes, setnotes] = useState(inititalNotes);
//Fetch all Notes
const getNotes = async () => {
  const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFhODg1NDcwYTVmMzBhZDQ2ZGRjNDUzIn0sImlhdCI6MTYzODU5NjI3OH0.x2UH5R9XBT5UE6VcnsIFdjjDxes3sAxvv_CuMwZkA3s",
      },
    });
    const json = await response.json();
    console.log(json);
    setnotes(json);
   
  };

  //Add Note
  const addNote = async (title, description, tag) => {
  const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFhODg1NDcwYTVmMzBhZDQ2ZGRjNDUzIn0sImlhdCI6MTYzODU5NjI3OH0.x2UH5R9XBT5UE6VcnsIFdjjDxes3sAxvv_CuMwZkA3s",
      },
      body: JSON.stringify({title, description, tag}),
    });
    const json = await response.json();
    console.log(json);
    let note = {
      _id: "61ac7901e89519e1670c01dk",
      user: "61a885470a5f30ad46ddc453",
      title: title,
      description: description,
      tag: tag,
      date: "1638693121446",
      __v: 0,
    };
    setnotes(notes.concat(note));
  };

  //Edit Note
  const editNote = async (id, title, description, tag) => {
    //logic to edit in server side
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFhODg1NDcwYTVmMzBhZDQ2ZGRjNDUzIn0sImlhdCI6MTYzODU5NjI3OH0.x2UH5R9XBT5UE6VcnsIFdjjDxes3sAxvv_CuMwZkA3s",
      },
      body: JSON.stringify({title, description, tag}),
    });
    const json = response.json();
    //logic to edit in client side
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };
  //Delete Notes
  const deleteNote = async (id) => {
    //logic to edit in server side
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFhODg1NDcwYTVmMzBhZDQ2ZGRjNDUzIn0sImlhdCI6MTYzODU5NjI3OH0.x2UH5R9XBT5UE6VcnsIFdjjDxes3sAxvv_CuMwZkA3s",
      }
      
    });
    const json = response.json();
    console.log("Deleting a note" + json);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setnotes(newNotes);
  };

  return (
    <noteContext.Provider
      value={{ notes, setnotes, addNote, editNote, deleteNote, getNotes }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
