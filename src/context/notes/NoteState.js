import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  //const host = "http//localhost:5000"
  const initialNote = []
  const [notes, setNotes] = useState(initialNote);
  const getNotes = async () => {
    const response = await fetch("/api/notes/getnotes/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });
    const json = await response.json()
    console.log(json);
    setNotes(json)
  }

  const addNote = async (title, description, tag) => {
    const response = await fetch("/api/notes/addnote/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })

    });
    let note = await response.json()
    setNotes(notes.concat(note))
  }
  const deleteNote =async (id) => {
    const response = await fetch(`/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },

    });
    const json = await response.json();
    console.log(json)
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`/api/notes/updatenote/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })

    });
    const json = await response.json();
    
    console.log(json)
    let newNotes = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNotes.length; index++) {
      let element = newNotes[index]
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes)
  }
  
  return (
    // eslint-disable-next-line
    <NoteContext.Provider value={{ notes, setNotes, addNote, editNote, deleteNote, getNotes, editNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;



