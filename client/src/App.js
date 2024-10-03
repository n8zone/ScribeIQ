import React, {useEffect, useRef, useState} from 'react';

function App() {
  const [message, setMessage] = useState('');
  const [notes, setNotes] = useState([{title: '', content: '', id: 0}]);
  const [workingNote, setWorkingNote] = useState({title: '', content: '', id: 0});
  const [workingNoteContent, setWorkingNoteContent] = useState('');
  const workingNoteRef = useRef(workingNote);

  useEffect(() => {
    fetch('http://localhost:4000/notes')
        .then(response => response.json())
        .then(data => {
            let notes = data.notes;
            let processedNotes = notes.map((note, index) => {
                return {
                    title: note.title,
                    content: note.content,
                    id: index
                }
            })
            setNotes(processedNotes);
            setWorkingNote(processedNotes[0]);
            setWorkingNoteContent(processedNotes[0].content)

        });
        const autoSave = setInterval(() => saveNotes(), 15000);
        return () => clearInterval(autoSave);
  }, []);

  useEffect(() => {
      workingNoteRef.current = workingNote;
  }, [workingNote]);

    const saveNotes = () => {
        fetch('http://localhost:4000/notes/0', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(workingNoteRef.current)
        })
    }

    function handleNoteUpdate(e) {
        let noteContent = e.target.value//.replace('\r?\n/g', '<br />');

        // Create a new array by mapping through notes and updating the relevant note by id
        let notesClone = notes.map(note => {
            if (note.id === workingNote.id) {
                // Return a new note object with updated content
                return {
                    ...note,
                    content: noteContent
                };
            }
            return note; // Return unchanged notes
        });

        // Update the working note content
        setWorkingNoteContent(noteContent);
        setWorkingNote({
            ...workingNote,
            content: noteContent
        });

        // Set the updated notes array to the state
        setNotes(notesClone);

        console.log(workingNote)
        console.log(notesClone);
        console.log(notes);
    }

    function switchWorkingNote(note) {
        setWorkingNote(note)
        console.log(note)
        setWorkingNoteContent(note.content)
        console.log(note.content);
    }

  return (
      <div className="App">
          {notes.map((note, index) =>
              (
              <div key={index}>
                <h1 onClick={() => switchWorkingNote(note)}>{note.title}</h1>
              </div>
          ))}
          <textarea value={workingNoteContent} onChange={handleNoteUpdate}></textarea>
          <button onClick={() => saveNotes()}>Save</button>
      </div>
  );
}

export default App;