"use client"

import type React from "react"
import { useState } from "react"
import "./NoteForm.css"

interface Note {
  id: string
  title: string
  content: string
  createdAt: string
}

interface NoteFormProps {
  initialData?: Note | null
  onSave: (data: { title: string; content: string }) => void
  onCancel: () => void
}

const NoteForm: React.FC<NoteFormProps> = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    content: initialData?.content || "",
  })
  const [errors, setErrors] = useState<any>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors: any = {}
    if (!formData.title.trim()) newErrors.title = "Titre requis"
    if (!formData.content.trim()) newErrors.content = "Contenu requis"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onSave(formData)
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev: any) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="note-form">
      <div className="form-group">
        <label htmlFor="title" className="form-label">
          Titre
        </label>
        <input
          id="title"
          type="text"
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
          placeholder="Titre de votre note..."
          className="mpmp"
        />
        {errors.title && <div className="error-message">{errors.title}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="content" className="form-label">
          Contenu
        </label>
        <textarea
          id="content"
          value={formData.content}
          onChange={(e) => handleChange("content", e.target.value)}
          placeholder="Écrivez votre note ici..."
          rows={6}
          className="mpmp"
        />
        {errors.content && <div className="error-message">{errors.content}</div>}
      </div>

      <div className="form-actions">
        <button type="submit" className="custom-button">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
            <polyline points="17,21 17,13 7,13 7,21" />
            <polyline points="7,3 7,8 15,8" />
          </svg>
          Sauvegarder
        </button>

        <button type="button" onClick={onCancel} className="cancel-button">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
          Annuler
        </button>
      </div>
    </form>
  )
}

export default NoteForm
