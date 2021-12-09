import React, {useState} from 'react';
import noteContext from './noteContext';
const NoteState = (props) =>{
    const s1 = {
        "name": "Basu",
        "class": "B8",
    }

const [state, setstate] = useState(s1)
const update = () =>{
    setTimeout(() => {
        setstate({
            "name": "Dev",
            "class": "B1",
        })
    }, 1000);
}

    return (
<noteContext.Provider value={{state,update}}>
    {props.children}
</noteContext.Provider>
    )

}

export default NoteState;
