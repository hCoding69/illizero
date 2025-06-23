import { useState } from 'react';
import api from '../api/axios';
import { Link, useNavigate } from 'react-router-dom';
import type { LoginCredentials } from '../types/auth';
import './Login.css';
import type { AxiosError } from 'axios';

export default function Login() {
  const navigate = useNavigate();

  // Fonction pour extraire le sous-domaine
const getCompanyFromSubdomain = (): string => {
  const host = window.location.hostname; // ex: neoinge.localhost
  const parts = host.split('.');
  
  if (parts.length === 1) {
    // juste "localhost" par exemple, pas de sous-domaine
    return '';
  }
  
  // cas normal : tenant1.localhost ou tenant1.example.com
  return parts[0];
};


  const [companyFromUrl] = useState(getCompanyFromSubdomain());
  const [formData, setFormData] = useState<LoginCredentials>({
    email: '',
    password: '',
    company: companyFromUrl || '', // si sous-domaine, on le met ici
  });

  const [errors, setErrors] = useState<Partial<LoginCredentials>>({});
const [generalError, setGeneralError] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  const handleChange = (field: keyof LoginCredentials, value: string) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: undefined });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/login', formData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', res.data.user); // stocke le nom de la compagnie
      navigate('/');
    }  catch (err) {
  console.error(err);
  const error = err as AxiosError<{ errors?: Partial<LoginCredentials>, message?: string }>;

  if (error.response) {
    if (error.response.status === 401) {
      // Cas identifiants incorrects
      setGeneralError('Identifiants invalides. Veuillez vérifier votre email et mot de passe.');
    } else if (error.response.data?.errors) {
      // Validation formulaire
      setErrors(error.response.data.errors);
    } else if (error.response.data?.message) {
      // Message générique renvoyé par l'API
      setGeneralError(error.response.data.message);
    } else {
      setGeneralError('Une erreur est survenue lors de la connexion. Veuillez réessayer plus tard.');
    }
  } else {
    setGeneralError('Impossible de se connecter au serveur. Veuillez vérifier votre connexion.');

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
              alt=""
            />
          </div>
          <h1 className="login-title">Connexion</h1>
          <p className="login-description">Accédez à votre espace de notes</p>
                    {generalError && (
  <div className="error-message" style={{ marginTop: '1rem', textAlign: 'center' }}>
    {generalError}
  </div>
)}
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          
          <div className="form-group">
            <label htmlFor="company" className="form-label">
              Nom de la compagnie
            </label>
            <div className="input-container">
              <svg
                viewBox="0 0 1024 1024"
                className="input-icon"
                width="16"
                height="16"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                fill="#000000"
              >
                {/* icône SVG */}
                <path d="M434.9 133h266v298c-154.2 29-270.3 156.7-270.3 309.9 0 77.3 29.6 148.1 78.7 203H403v-779c0-17.6 14.3-31.9 31.9-31.9zM338.1 932.1H203V396.2c0-14.3 11.6-26 26-26h109.1v561.9zM825 314v112.5c-16.5-2.8-43.3-4.2-60.5-4.2-11.7 0-23.3 0.7-34.7 2V314H825z" fill="#CCCCCC" />
                {/* ... autres paths */}
              </svg>
              <input
                id="company"
                type="text"
                placeholder="Nom de votre compagnie"
                value={formData.company}
                onChange={(e) => handleChange('company', e.target.value)}
                className="form-input"
                disabled={!!companyFromUrl} // disable si company vient du sous-domaine
              />
            </div>
            {errors.company && <div className="error-message">{errors.company}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <div className="input-container">
              <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
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

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Mot de passe
            </label>
            <div className="input-container">
              <svg className="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
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
            {errors.password && <div className="error-message">{errors.password}</div>}
          </div>

          <button type="submit" disabled={loading} className="custom-button">
            {loading ? (
              <div className="loading-container">
                <div className="spinner"></div>
                Connexion...
              </div>
            ) : (
              'Se connecter'
            )}
          </button>

          <p style={{  textAlign: 'center', fontSize: '14px' }}>
            Pas encore de compte ?{' '}
            <Link to="/register" className="register-link">
              Inscrivez-vous ici
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
