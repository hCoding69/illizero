import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

interface Note {
  id: string;
  title: string;
  content: string;
  created_at: string;
}

interface NoteListProps {
  notes: Note[];
  onEdit: (note: Note) => void;
  onDelete: (noteId: string) => void;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) return "Aujourd'hui";
  if (diffDays === 2) return "Hier";
  if (diffDays <= 7) return `Il y a ${diffDays - 1} jours`;

  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const NoteList: React.FC<NoteListProps> = ({ notes, onEdit, onDelete }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken || storedToken === 'undefined' || storedToken === 'null') {
      navigate('/login');
    }
  }, [navigate]);

if (!notes || notes.length === 0) {    return (
      <div className="empty-state">
        <div className="empty-icon">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14,2 14,8 20,8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
        </div>
        <h3 className="empty-title">Aucune note trouvée</h3>
        <p className="empty-description">Commencez par créer votre première note !</p>
      </div>
    );
  } else {
  return (
    <div className="notes-grid">
      {notes.map((note) => (
        <div key={note.id} className="note-card">
          <div className="note-header">
            <h3 className="note-title">{note.title}</h3>
            <div className="note-date">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              {formatDate(note.created_at)}
            </div>
          </div>

          <div className="note-content">
            <p className="note-text">{note.content}</p>
          </div>

          <div className="note-actions">
            <button onClick={() => onEdit(note)} className="edit-button">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              Modifier
            </button>

            <button onClick={() => onDelete(note.id)} className="delete-button">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <polyline points="3,6 5,6 21,6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
  }


};

export default NoteList;