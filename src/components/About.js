import React , {useContext} from 'react'
import noteContext from '../context/notes/noteContext'
export default function About() {
  const a = useContext(noteContext)
  return (
    <div>
      <h1>This is about {a.name} and {a.class}</h1>
    </div>
  )
}
