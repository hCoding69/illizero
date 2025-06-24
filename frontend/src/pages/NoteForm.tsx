"use client"

import React from "react"
import { Formik } from "formik"
import * as Yup from "yup"
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

const validationSchema = Yup.object({
  title: Yup.string().trim().required("Titre requis"),
  content: Yup.string().trim().required("Contenu requis"),
})

const NoteForm: React.FC<NoteFormProps> = ({ initialData, onSave, onCancel }) => {
  return (
    <Formik
      initialValues={{
        title: initialData?.title || "",
        content: initialData?.content || "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        onSave(values)
        setSubmitting(false)
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <form onSubmit={handleSubmit} className="note-form" noValidate>
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Titre
            </label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Titre de votre note..."
              className="mpmp"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.title && errors.title && (
              <div className="error-message">{errors.title}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="content" className="form-label">
              Contenu
            </label>
            <textarea
              id="content"
              name="content"
              placeholder="Écrivez votre note ici..."
              rows={6}
              className="mpmp"
              value={values.content}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.content && errors.content && (
              <div className="error-message">{errors.content}</div>
            )}
          </div>

          <div className="form-actions">
            <button type="submit" className="custom-button" disabled={isSubmitting}>
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
      )}
    </Formik>
  )
}

export default NoteForm
