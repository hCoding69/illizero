"use client"

import type React from "react"
import { useState } from "react"
import NoteForm from "./NoteForm"
import NoteList from "./NoteList"
import "./Dashboard.css"

interface Note {
  id: string
  title: string
  content: string
  createdAt: string
}

interface DashboardProps {
  user: { email: string; tenant: string }
  onLogout: () => void
}

// Données mockées
const mockNotes: Note[] = [
  {
    id: "1",
    title: "Réunion équipe",
    content: "Points à aborder lors de la prochaine réunion d'équipe : budget, planning, nouvelles fonctionnalités...",
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    title: "Idées projet",
    content:
      "Nouvelles fonctionnalités à développer pour l'application : système de notifications, mode sombre, export PDF...",
    createdAt: "2024-01-14T15:30:00Z",
  },
  {
    id: "3",
    title: "Liste courses",
    content: "Ne pas oublier : pain, lait, œufs, fromage, légumes pour la semaine...",
    createdAt: "2024-01-13T09:15:00Z",
  },
]

const Dashboard = () => {
  const [notes, setNotes] = useState<Note[]>(mockNotes)
  const [showForm, setShowForm] = useState(false)
  const [editingNote, setEditingNote] = useState<Note | null>(null)

  const handleSaveNote = (noteData: { title: string; content: string }) => {
    if (editingNote) {
      setNotes(notes.map((note) => (note.id === editingNote.id ? { ...note, ...noteData } : note)))
    } else {
      const newNote: Note = {
        id: Date.now().toString(),
        ...noteData,
        createdAt: new Date().toISOString(),
      }
      setNotes([newNote, ...notes])
    }

    setShowForm(false)
    setEditingNote(null)
  }

  const handleEditNote = (note: Note) => {
    setEditingNote(note)
    setShowForm(true)
  }

  const handleDeleteNote = (noteId: string) => {
    setNotes(notes.filter((note) => note.id !== noteId))
  }

  const handleCancelForm = () => {
    setShowForm(false)
    setEditingNote(null)
  }

  return (
    <div className="dashboard">
      {/* Header */}
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
              <p className="app-subtitle">user.tenant</p>
            </div>
          </div>

          <div className="header-right">
            <div className="user-info">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span>user.email</span>
            </div>
            <button  className="logout-button">
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

      {/* Main Content */}
      <main className="dashboard-main">
        {showForm ? (
          <div className="form-card">
            <div className="form-header">
              <h2 className="form-title">{editingNote ? "Modifier la note" : "Nouvelle note"}</h2>
              <p className="form-description">
                {editingNote ? "Modifiez votre note existante" : "Créez une nouvelle note"}
              </p>
            </div>
            <NoteForm initialData={editingNote} onSave={handleSaveNote} onCancel={handleCancelForm} />
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
  )
}

export default Dashboard