# My Notes – React + Bootstrap 5

A beginner-friendly notes app: create, view, edit, delete and search notes.
Built with React (useState), JavaScript events and Bootstrap 5. No Redux, no Context API, no backend, no localStorage.

## Run the project

Requirements: Node.js 18 or newer.

```bash
cd notes-app
npm install
npm run dev
```

Open the URL shown in the terminal (usually http://localhost:5173).
Production build: `npm run build`.

## Project structure

```
src/
  main.jsx                 entry point, loads Bootstrap + App
  App.jsx                  owns all state and logic
  index.css                small style tweaks
  components/
    Navbar.jsx             "My Notes" bar + total count
    NoteForm.jsx           form to create a note (validation)
    SearchBar.jsx          search input
    NoteList.jsx           grid of cards / empty messages
    NoteCard.jsx           one note, with Edit and Delete
```

## How it works, step by step

### 1. State lives in App.jsx
```js
const [notes, setNotes] = useState([]);
const [searchTerm, setSearchTerm] = useState("");
```
`useState` returns the current value and a function to change it. Calling `setNotes` makes React re-render the screen with new data. App passes data and functions down to children as **props**.

### 2. Navbar.jsx
Receives `totalNotes` and shows it. It has no state: it only displays props.

### 3. NoteForm.jsx (onChange + onSubmit)
- `title`, `description`, `error` are state values.
- Each input has `value={title}` and `onChange={(e) => setTitle(e.target.value)}`. This is a **controlled input**: React always knows what is typed.
- `onSubmit={handleSubmit}` runs when Save Note is clicked or Enter is pressed. `event.preventDefault()` stops the page reload.
- Validation: `title.trim() === ""` catches empty or spaces-only input and sets an error message.
- `{error && <div>...</div>}` is **conditional rendering**: the alert appears only when `error` has text.
- On success it calls `onAddNote(...)` (a function from App) and clears the fields.

### 4. Adding a note (App.jsx)
```js
setNotes([newNote, ...notes]);
```
The **spread operator** copies the existing notes into a new array, so we never change state directly. Each note gets a unique `id` (timestamp + random string) and a `createdAt` date.

### 5. SearchBar.jsx + filter()
The input is controlled by `searchTerm`. On every keystroke `onChange` updates it. In App:
```js
const filteredNotes = notes.filter((note) =>
  note.title.toLowerCase().includes(searchTerm.trim().toLowerCase())
);
```
`filter()` returns only matching notes, so results update live.

### 6. NoteList.jsx + map()
Three conditional cases: no notes at all, no search matches, or show notes. For the grid it uses
```js
notes.map((note) => <div key={note.id}>...</div>)
```
`map()` turns each note into a card, and `key={note.id}` lets React track each one. The Bootstrap classes `col-12 col-md-6` give 1 column on phones and 2 on larger screens.

### 7. NoteCard.jsx (edit + delete with onClick)
- `isEditing` state switches the card between view mode and edit mode.
- **Edit** button: `onClick={startEditing}` sets `isEditing` to true and fills the inputs.
- **Save changes** calls `onUpdateNote(id, title, description)`. In App:
  ```js
  notes.map((n) => n.id === id ? { ...n, title, description } : n)
  ```
  Spread copies the old note and overrides only the changed fields.
- **Delete** button: `onClick={() => onDeleteNote(note.id)}`. App asks `window.confirm(...)` and, if confirmed, uses `notes.filter((n) => n.id !== id)` to remove it.

### 8. Responsive layout
Bootstrap grid: the form is `col-12 col-lg-4` and the list is `col-12 col-lg-8`, so on small screens they stack and on large screens they sit side by side.

## Ideas for next steps
Save notes with localStorage and `useEffect`, add colors or tags, sort by date.
