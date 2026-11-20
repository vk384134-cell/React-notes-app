import { useState } from "react";

function NoteForm({ onAddNote }) {
  // Controlled inputs: React state is the single source of truth.
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  // onSubmit handler
  const handleSubmit = (event) => {
    event.preventDefault(); // stop the browser from reloading the page

    // Validation: empty (or spaces-only) values are not allowed
    if (title.trim() === "" || description.trim() === "") {
      setError("Please enter both a title and a description.");
      return;
    }

    onAddNote(title.trim(), description.trim()); // tell the parent
    setTitle(""); // clear the form
    setDescription("");
    setError("");
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="h5 card-title mb-3">Add a note</h2>

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              id="title"
              type="text"
              className="form-control"
              placeholder="e.g. Grocery list"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              id="description"
              rows="4"
              className="form-control"
              placeholder="Write your note here"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Conditional rendering: only show when there is an error */}
          {error && (
            <div className="alert alert-danger py-2" role="alert">
              {error}
            </div>
          )}

          <button type="submit" className="btn btn-primary w-100">
            Save Note
          </button>
        </form>
      </div>
    </div>
  );
}

export default NoteForm;
