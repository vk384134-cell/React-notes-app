// Presentational component: it only displays what it receives via props.
function Navbar({ totalNotes }) {
  return (
    <nav className="navbar navbar-dark bg-primary shadow-sm">
      <div className="container">
        <span className="navbar-brand mb-0 h1">📝 My Notes</span>
        <span className="badge text-bg-light fs-6">
          Total notes: {totalNotes}
        </span>
      </div>
    </nav>
  );
}

export default Navbar;
