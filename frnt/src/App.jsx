import { useState } from 'react'
import axios from "axios"

function App() {
  const [notes, setNotes] = useState([
    {
      title:"test",
      description:"des"
    },
    {
      title:"test",
      description:"des"
    },
    {
      title:"test",
      description:"des"
    }
  ])

  axios.get('http://localhost:4000/notes')
      .then(res => {
        setNotes(res.data.notes)
      })

  return (
    <>
    <div className="notes">
      {
        notes.map(note=>{
          return <div className="note">
            <h4>{note.title}</h4>
            <p>{note.description}</p>
          </div>
        })
      }
      
    </div>
    </>
  )
}

export default App
