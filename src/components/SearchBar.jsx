function SearchBar({ searchTerm, onSearchChange, totalNotes, matchCount }) {
  return (
    <div className="mb-3">
      <div className="input-group">
        <span className="input-group-text">🔍</span>
        <input
          type="search"
          className="form-control"
          placeholder="Search notes by title"
          aria-label="Search notes by title"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchTerm && (
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => onSearchChange("")}
          >
            Clear
          </button>
        )}
      </div>

      <div className="form-text">
        {searchTerm
          ? `Showing ${matchCount} of ${totalNotes} notes`
          : `${totalNotes} ${totalNotes === 1 ? "note" : "notes"} in total`}
      </div>
    </div>
  );
}

export default SearchBar;
