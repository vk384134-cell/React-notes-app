import NoteCard from "./NoteCard.jsx";

function NoteList({ notes, hasAnyNotes, onUpdateNote, onDeleteNote }) {
  // Case 1: the user has not created any notes yet
  if (!hasAnyNotes) {
    return (
      <div className="alert alert-info" role="status">
        You have no notes yet. Add your first note using the form.
      </div>
    );
  }

  // Case 2: notes exist, but none match the search
  if (notes.length === 0) {
    return (
      <div className="alert alert-warning" role="status">
        No notes match your search. Try a different title.
      </div>
    );
  }

  // Case 3: show the notes in a responsive grid
  // 1 column on phones, 2 columns from the "md" breakpoint up
  return (
    <div className="row g-3">
      {notes.map((note) => (
        <div className="col-12 col-md-6" key={note.id}>
          <NoteCard
            note={note}
            onUpdateNote={onUpdateNote}
            onDeleteNote={onDeleteNote}
          />
        </div>
      ))}
    </div>
  );
}

export default NoteList;
