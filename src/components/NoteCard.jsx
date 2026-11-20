import { useState } from "react";

function formatDate(isoString) {
  return new Date(isoString).toLocaleString([], {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function NoteCard({ note, onUpdateNote, onDeleteNote }) {
  // Each card remembers for itself whether it is being edited.
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(note.title);
  const [editDescription, setEditDescription] = useState(note.description);
  const [error, setError] = useState("");

  const startEditing = () => {
    setEditTitle(note.title); // start from the latest saved values
    setEditDescription(note.description);
    setError("");
    setIsEditing(true);
  };

  const handleSave = (event) => {
    event.preventDefault();
    if (editTitle.trim() === "" || editDescription.trim() === "") {
      setError("Title and description cannot be empty.");
      return;
    }
    onUpdateNote(note.id, editTitle.trim(), editDescription.trim());
    setIsEditing(false);
  };

  // ---------- Edit mode ----------
  if (isEditing) {
    return (
      <div className="card note-card shadow-sm h-100">
        <form className="card-body d-flex flex-column" onSubmit={handleSave} noValidate>
          <input
            type="text"
            className="form-control mb-2"
            aria-label="Edit title"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <textarea
            rows="4"
            className="form-control mb-2"
            aria-label="Edit description"
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
          />
          {error && <div className="text-danger small mb-2">{error}</div>}

          <div className="mt-auto d-flex gap-2">
            <button type="submit" className="btn btn-success btn-sm">
              Save changes
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  // ---------- View mode ----------
  return (
    <div className="card note-card shadow-sm h-100">
      <div className="card-body d-flex flex-column">
        <h3 className="h5 card-title text-break">{note.title}</h3>
        <p className="card-text note-description">{note.description}</p>

        <p className="text-muted small mt-auto mb-3">
          Created: {formatDate(note.createdAt)}
          {note.updatedAt && <> · Edited: {formatDate(note.updatedAt)}</>}
        </p>

        <div className="d-flex gap-2">
          <button className="btn btn-outline-primary btn-sm" onClick={startEditing}>
            Edit
          </button>
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={() => onDeleteNote(note.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default NoteCard;
