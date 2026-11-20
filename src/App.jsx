import { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import NoteForm from "./components/NoteForm.jsx";
import SearchBar from "./components/SearchBar.jsx";
import NoteList from "./components/NoteList.jsx";

// App is the "parent" component. It owns ALL the state,
// and passes data + functions down to children through props.
function App() {
  // 1. The list of notes. Starts empty (no localStorage, no backend).
  const [notes, setNotes] = useState([]);

  // 2. The text typed in the search box.
  const [searchTerm, setSearchTerm] = useState("");

  // ---------- CREATE ----------
  const addNote = (title, description) => {
    const newNote = {
      id: Date.now().toString() + Math.random().toString(16).slice(2), // unique id
      title,
      description,
      createdAt: new Date().toISOString(),
      updatedAt: null,
    };
    // Spread operator: copy the old notes, put the new one first.
    setNotes([newNote, ...notes]);
  };

  // ---------- UPDATE ----------
  const updateNote = (id, title, description) => {
    setNotes(
      notes.map((note) =>
        note.id === id
          ? { ...note, title, description, updatedAt: new Date().toISOString() }
          : note
      )
    );
  };

  // ---------- DELETE ----------
  const deleteNote = (id) => {
    if (window.confirm("Delete this note? This cannot be undone.")) {
      setNotes(notes.filter((note) => note.id !== id));
    }
  };

  // ---------- SEARCH ----------
  // filter() builds a new array with only notes whose title matches.
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );

  return (
    <>
      <Navbar totalNotes={notes.length} />

      <main className="container py-4">
        <div className="row g-4">
          {/* Form: full width on phones, left column on large screens */}
          <div className="col-12 col-lg-4">
            <NoteForm onAddNote={addNote} />
          </div>

          {/* Search + list */}
          <div className="col-12 col-lg-8">
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              totalNotes={notes.length}
              matchCount={filteredNotes.length}
            />
            <NoteList
              notes={filteredNotes}
              hasAnyNotes={notes.length > 0}
              onUpdateNote={updateNote}
              onDeleteNote={deleteNote}
            />
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
