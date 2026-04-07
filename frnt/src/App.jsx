import { useState, useEffect } from 'react'
import axios from "axios"

function App() {

  const [notes, setNotes] = useState([])
  const [editingNoteId, setEditingNoteId] = useState(null)
  const [editTitle, setEditTitle] = useState("")
  const [editDescription, setEditDescription] = useState("")

  // CREATE
  function handleSubmit(e) {
    e.preventDefault()

    const { title, description } = e.target.elements

    axios.post("http://localhost:4000/notes", {
      title: title.value,
      description: description.value
    })
    .then(res => {
      console.log(res.data)
      fetchNotes()
      e.target.reset()
    })
  }

  // READ
  function fetchNotes() {
    axios.get('http://localhost:4000/notes')
      .then(res => {
        setNotes(res.data.notes)
      })
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  // DELETE
  function handleDeleteNote(noteId) {
    axios.delete("http://localhost:4000/notes/" + noteId)
      .then(res => {
        console.log(res.data)
        fetchNotes()
      })
  }

  // UPDATE
  function handleUpdateNote(noteId) {
    axios.patch(`http://localhost:4000/notes/${noteId}`, {
      title: editTitle,
      description: editDescription
    })
    .then(res => {
      console.log(res.data)
      setEditingNoteId(null)
      fetchNotes()
    })
  }

  return (
    <>
      {/* CREATE FORM */}
      <form className='note-create-form' onSubmit={handleSubmit}>
        <input name='title' type="text" placeholder='Enter title' required />
        <input name='description' type="text" placeholder='Enter description' required />
        <button>Create note</button>
      </form>

      {/* NOTES LIST */}
      <div className="notes">
        {
          notes.map(note => {
            const isEditing = editingNoteId === note._id

            return (
              <div className="note" key={note._id}>
                {isEditing ? (
                  <>
                    <input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                    />
                    <input
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                    />
                    <button onClick={() => handleUpdateNote(note._id)}>
                      Save
                    </button>
                    <button onClick={() => setEditingNoteId(null)}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <h1>{note.title}</h1>
                    <p>{note.description}</p>

                    <button onClick={() => {
                      setEditingNoteId(note._id)
                      setEditTitle(note.title)
                      setEditDescription(note.description)
                    }}>
                      Edit
                    </button>

                    <button onClick={() => handleDeleteNote(note._id)}>
                      Delete
                    </button>
                  </>
                )}
              </div>
            )
          })
        }
      </div>
    </>
  )
}

export default App