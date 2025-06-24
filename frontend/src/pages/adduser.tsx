import { useState } from 'react';
import './Login.css';
import type { AxiosError } from 'axios';
import api from '../api/axios';

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export default function AddUser() {
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const [errors, setErrors] = useState<Partial<RegisterFormData>>({});
  const [loading, setLoading] = useState(false);
  const handleChange = (field: keyof RegisterFormData, value: string) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: undefined });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
       const res = await api.post('/adduser', formData);
        localStorage.setItem('token', res.data.token);
localStorage.setItem('name', res.data.name); 
      localStorage.setItem('tenant', res.data.tenant_id);window.location.href = res.data.redirect_to;
    } catch (err) {
        console.log(err);
      const error = err as AxiosError<{ errors?: Partial<RegisterFormData> }>;
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        alert('Erreur lors de l\'inscription');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-icon">
            <img
              src="https://illizeo.com/wp-content/uploads/2021/12/logo-illizeo-vectorise-infomaniak.png"
              alt="Logo Illizeo"
            />
          </div>
          <h1 className="login-title">Ajouter utilisateur à votre entreprise</h1>
          <p className="login-description">
            Remplissez le formulaire pour ajouter un utilisateur à votre entreprise
          </p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {/* Nom complet */}
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Nom complet
            </label>
            <div className="input-container">
              <svg
                viewBox="0 0 24 24"
                className="input-icon"
                width="16"
                height="16"
                fill="#666666"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zM12 14c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
              <input
                id="name"
                type="text"
                placeholder="Votre nom complet"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="form-input"
              />
            </div>
            {errors.name && <div className="error-message">{errors.name}</div>}
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <div className="input-container">
              <svg
                className="input-icon"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <input
                id="email"
                type="email"
                placeholder="votre@email.com"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="form-input"
              />
            </div>
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>

          {/* Mot de passe */}
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Mot de passe
            </label>
            <div className="input-container">
              <svg
                className="input-icon"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <circle cx="12" cy="16" r="1" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                className="form-input"
              />
            </div>
            {errors.password && (
              <div className="error-message">{errors.password}</div>
            )}
          </div>

          {/* Confirmation mot de passe */}
          <div className="form-group">
            <label htmlFor="password_confirmation" className="form-label">
              Confirmer le mot de passe
            </label>
            <div className="input-container">
              <svg
                className="input-icon"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <circle cx="12" cy="16" r="1" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <input
                id="password_confirmation"
                type="password"
                placeholder="••••••••"
                value={formData.password_confirmation}
                onChange={(e) => handleChange('password_confirmation', e.target.value)}
                className="form-input"
              />
            </div>
            {errors.password_confirmation && (
              <div className="error-message">{errors.password_confirmation}</div>
            )}
          </div>

          

          <button type="submit" disabled={loading} className="custom-button">
            {loading ? (
              <div className="loading-container">
                <div className="spinner"></div>
                Adding user ...
              </div>
            ) : (
              "Add User"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
