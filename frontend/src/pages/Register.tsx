import { useState } from 'react';
import api from '../api/axios';
import './Login.css';
import type { AxiosError } from 'axios';

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  company: string;
}

export default function Register() {
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    company: '',
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
       const res = await api.post('/register', formData);
       console.log(res.data);
    if (res.data.login_url) {
const url = new URL(res.data.login_url);
console.log(url.origin); // http://marche.localhost:5173
console.log(url.pathname); 
window.location.href = url.toString(); // redirige vers http://marche.localhost:5173/adduser

    }
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
          <h1 className="login-title">Créer une entreprise</h1>
          <p className="login-description">
            Inscrivez-vous pour créer votre compagnie et un compte admin
          </p>
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
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M434.9 133h266v298c-154.2 29-270.3 156.7-270.3 309.9 0 77.3 29.6 148.1 78.7 203H403v-779c0-17.6 14.3-31.9 31.9-31.9zM338.1 932.1H203V396.2c0-14.3 11.6-26 26-26h109.1v561.9zM825 314v112.5c-16.5-2.8-43.3-4.2-60.5-4.2-11.7 0-23.3 0.7-34.7 2V314H825z"
                    fill="#CCCCCC"
                  ></path>
                  <path
                    d="M734.5 506.8c-124.3 0-225 100.7-225 225s100.7 225 225 225 225-100.7 225-225-100.8-225-225-225zM558.1 655.6c4.9-4.2 104.2-58 121-67.8 15.1-8.8 50-9.5 81.1 0s55.6 16.8 70.9 17.5c15.4 0.8 54.1 6.2 67.9 15.3 13.8 9.1 16.6 62.1-0.5 80 0 0-53 43.7-80.7 43.7s-42.5-8.2-42.5-8.2l-84.2-32.7s-9.2-5.4-9.2-10.6c0-0.5 0.3-1.5 0.7-2.1 0 0 4.6-9.8 11.5-8.8 7.7 1.1 57.1 9 57.1 9s2.5 0.4 5.5 0c7.2-0.9 11.7-8.5 8.7-15.1-0.8-1.7-2-3.3-4.1-4.1-6.1-2.5-32.2-13.1-44.2-17.5-12-4.3-14.8-5.6-22.1-3.7-2.6 0.7-5.4 1.4-8 2.9l-102 43.3s-25.8 11.8-32.7-6.3c-6.8-18.1 0.9-30.6 5.8-34.8z m343.8 156c-4.9 4.2-104.2 58-121 67.8-15.1 8.8-50 9.5-81.1 0s-55.6-16.8-70.9-17.5c-15.4-0.8-54.1-6.2-67.9-15.3-13.8-9.1-16.6-62.1 0.5-80 0 0 53-43.7 80.7-43.7s42.5 8.2 42.5 8.2l84.2 32.7s9.2 5.4 9.2 10.6c0 0.5-0.3 1.5-0.7 2.1 0 0-4.6 9.8-11.5 8.8-7.7-1.1-57.1-9-57.1-9s-2.5-0.4-5.5 0c-7.2 0.9-11.7 8.5-8.7 15.1 0.8 1.7 2 3.3 4.1 4.1 6.1 2.5 32.2 13.1 44.2 17.5 12 4.3 14.8 5.6 22.1 3.7 2.6-0.7 5.4-1.4 8-2.9l102-43.3s25.8-11.8 32.7 6.3c6.8 18.1-0.9 30.6-5.8 34.8z"
                    fill="#666666"
                  ></path>
                  <path
                    d="M498.2 924.4H359.5V97.7c0-8.5 6.7-15.3 15-15.3h301.3c8.3 0 15 6.9 15 15.3v316.1c0 11 9 20 20 20s20-9 20-20v-84.7H869c8.3 0 15 6.5 15 14.4v120.1c0 11 9 20 20 20s20-9 20-20v-120c0-30-24.7-54.4-55-54.4H730.7V97.7c0-30.5-24.7-55.3-55-55.3H374.5c-30.3 0-55 24.8-55 55.3v191.4H181.3c-30.3 0-55 24.4-55 54.4v580.8H89.8c-7.7 0-13.9 8.8-13.9 19.6v0.9c0 10.8 6.2 19.6 13.9 19.6h408.4c7.7 0 13.9-8.8 13.9-19.6v-0.8c0-10.8-6.3-19.6-13.9-19.6zM166.3 343.6c0-8 6.7-14.4 15-14.4h137.6v594.5H166.3V343.6z"
                    fill="#666666"
                  ></path>
                  <path
                    d="M416.8 415.9h52.5v52.5h-52.5zM416.8 539.9h52.5v52.5h-52.5zM416.8 174h52.5v52.5h-52.5zM416.8 295h52.5v52.5h-52.5zM576.6 174h52.5v52.5h-52.5zM576.6 295h52.5v52.5h-52.5zM629.1 416v31.2c-14.2 6.1-28 13.2-41.1 21.3h-11.4V416h52.5zM215.4 413.1h52.5v52.5h-52.5zM215.4 529.1h52.5v52.5h-52.5zM215.3 645.1h52.5v52.5h-52.5z"
                    fill="#666666"
                  ></path>
                </g>
              </svg>
              <input
                id="company"
                type="text"
                placeholder="Nom de votre compagnie"
                value={formData.company}
                onChange={(e) => handleChange('company', e.target.value)}
                className="form-input"
              />
            </div>
            {errors.company && <div className="error-message">{errors.company}</div>}
          </div>

          <button type="submit" disabled={loading} className="custom-button">
            {loading ? (
              <div className="loading-container">
                <div className="spinner"></div>
                Inscription...
              </div>
            ) : (
              "S'inscrire"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
