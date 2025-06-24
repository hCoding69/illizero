import { useEffect, useState } from "react";
import NoteForm from "./NoteForm";
import NoteList from "./NoteList";
import "./Dashboard.css";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

interface Note {
  id: string;
  title: string;
  content: string;
  created_at: string;
}

const Dashboard = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
const navigate = useNavigate()
useEffect(() => {
  api.get("/notes")
    .then((res) => {
      console.log("Réponse API :", res.data);
      setNotes(res.data.notes || []); 
    })
    .catch((err) => console.error("Erreur lors du chargement des notes :", err))
    .finally(() => setLoading(false));
}, []);

const handleLogout = () => {
  localStorage.removeItem("token"); 
  navigate("/login"); 
};

const handleSaveNote = async (noteData: { title: string; content: string }) => {
  try {
    if (editingNote) {
      const res = await api.put(`/notes/${editingNote.id}`, noteData);
      const updatedNote = res.data.note || res.data;
      setNotes(prevNotes =>
        prevNotes.map(note =>
          note.id === editingNote.id ? updatedNote : note
        )
      );
    } else {

      const res = await api.post("/notes", noteData);
      const newNote = res.data.note || res.data;
      setNotes(prevNotes => [newNote, ...prevNotes]);
    }

    setEditingNote(null);
    setShowForm(false);
  } catch (err) {
    console.error("Erreur lors de l'enregistrement :", err);
  }
};



const handleDeleteNote = async (id: string) => {
  try {
    await api.delete(`/notes/${id}`);
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
  } catch (err) {
    console.error("Erreur lors de la suppression :", err);
  }
};

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setEditingNote(null);
    setShowForm(false);
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <div className="app-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14,2 14,8 20,8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10,9 9,9 8,9" />
              </svg>
            </div>
            <div>
              <h1 className="app-title">Notes App</h1>
              <p className="app-subtitle">{localStorage.getItem("tenant")}</p>
            </div>
          </div>

          <div className="header-right">
            <div className="user-info">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span>{localStorage.getItem("name")}</span>
            </div>

               <button className="logout-button" onClick={() => navigate('/adduser')}>
        + Ajouter utilisateur
      </button>
                        <button className="logout-button" onClick={handleLogout}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16,17 21,12 16,7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        {showForm ? (
          <div className="form-card">
            <div className="form-header">
              <h2 className="form-title">{editingNote ? "Modifier la note" : "Nouvelle note"}</h2>
              <p className="form-description">
                {editingNote ? "Modifiez votre note existante" : "Créez une nouvelle note"}
              </p>
            </div>
            <NoteForm
              initialData={editingNote}
              onSave={handleSaveNote}
              onCancel={handleCancelForm}
            />
          </div>
        ) : (
          <div className="new-note-section">
            <button className="custom-button" onClick={() => setShowForm(true)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Nouvelle note
            </button>
          </div>
        )}

        <NoteList notes={notes} onEdit={handleEditNote} onDelete={handleDeleteNote} />
      </main>
    </div>
  );
};

export default Dashboard;
