import React, {useContext} from "react";
import noteContext from "../context/notes/noteContext";
const Noteitem = (props) => {
  const { note, updateNote } = props;
  const context = useContext(noteContext)
  const {deleteNote} = context
  return (
    <div className="col-md-4">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <div className="d-flex justify-content-end">
            <i className="far fa-trash-alt mx-2" onClick={() => {deleteNote(note._id)}}></i>
            <i className="far fa-edit mx-2" onClick={() =>{updateNote(note)}}></i>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
