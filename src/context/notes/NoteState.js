import React, {useState} from 'react';
import noteContext from './noteContext';
const NoteState = (props) =>{
    const inititalNotes =  [
            {
              "_id": "61ac7901e89519e1670c01db",
              "user": "61a885470a5f30ad46ddc453",
              "title": "My title",
              "description": "A Nice Description here",
              "tag": "Personal",
              "date": "1638693121446",
              "__v": 0
            },
            {
                "_id": "61ac7901e89519e1670c01db",
                "user": "61a885470a5f30ad46ddc453",
                "title": "My title 1",
                "description": "A Nice Description here",
                "tag": "Personal",
                "date": "1638693121446",
                "__v": 0
              }
              ,
            {
                "_id": "61ac7901e89519e1670c01db",
                "user": "61a885470a5f30ad46ddc453",
                "title": "My title 2",
                "description": "A Nice Description here",
                "tag": "Personal",
                "date": "1638693121446",
                "__v": 0
              }
              ,
            {
                "_id": "61ac7901e89519e1670c01db",
                "user": "61a885470a5f30ad46ddc453",
                "title": "My title 4",
                "description": "A Nice Description here",
                "tag": "Personal",
                "date": "1638693121446",
                "__v": 0
              }
              ,
            {
                "_id": "61ac7901e89519e1670c01db",
                "user": "61a885470a5f30ad46ddc453",
                "title": "My title 5",
                "description": "A Nice Description here",
                "tag": "Personal",
                "date": "1638693121446",
                "__v": 0
              }
          ]
    const [notes, setnotes] = useState(inititalNotes);
        return (
<noteContext.Provider value={{notes, setnotes}}>
    {props.children}
</noteContext.Provider>
    )

}

export default NoteState;
