import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import api from "../api/axios";
import { Link } from "react-router-dom";
import "./Login.css";


const validationSchema = Yup.object({
  company: Yup.string().required("Nom de la compagnie requis"),
  email: Yup.string()
    .email("Email invalide")
    .required("Email requis"),
  password: Yup.string().required("Mot de passe requis"),
});

export default function Login() {
  const getCompanyFromSubdomain = (): string => {
    const host = window.location.hostname;
    const parts = host.split(".");

    if (parts.length === 1) {
      return "";
    }

    return parts[0];
  };

  const companyFromUrl = getCompanyFromSubdomain();

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
        </div>

        <Formik
          initialValues={{
            company: companyFromUrl || "",
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, setErrors, setStatus }) => {
            setStatus(null);
            try {
              const res = await api.post("/login", values);
              localStorage.setItem("token", res.data.token);
              localStorage.setItem("name", res.data.name);
              localStorage.setItem("tenant", res.data.tenant_id);
              window.location.href = res.data.redirect_to;
            } catch (err) {
              const error = err;
              if (error.response) {
                if (error.response.status === 401) {
                  setStatus(
                    "Identifiants invalides. Veuillez vérifier votre email et mot de passe."
                  );
                } else if (error.response.data?.errors) {
                  setErrors(error.response.data.errors);
                } else if (error.response.data?.message) {
                  setStatus(error.response.data.message);
                } else {
                  setStatus(
                    "Une erreur est survenue lors de la connexion. Veuillez réessayer plus tard."
                  );
                }
              } else {
                setStatus(
                  "Impossible de se connecter au serveur. Veuillez vérifier votre connexion."
                );
              }
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            status,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit} className="login-form" noValidate>
              {/* Company */}
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
                    <path
                      d="M434.9 133h266v298c-154.2 29-270.3 156.7-270.3 309.9 0 77.3 29.6 148.1 78.7 203H403v-779c0-17.6 14.3-31.9 31.9-31.9zM338.1 932.1H203V396.2c0-14.3 11.6-26 26-26h109.1v561.9zM825 314v112.5c-16.5-2.8-43.3-4.2-60.5-4.2-11.7 0-23.3 0.7-34.7 2V314H825z"
                      fill="#CCCCCC"
                    />
                  </svg>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    placeholder="Nom de votre compagnie"
                    className="form-input"
                    value={values.company}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={!!companyFromUrl}
                  />
                </div>
                {touched.company && errors.company && (
                  <div className="error-message">{errors.company}</div>
                )}
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
                    name="email"
                    type="email"
                    placeholder="votre@email.com"
                    className="form-input"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                {touched.email && errors.email && (
                  <div className="error-message">{errors.email}</div>
                )}
              </div>

              {/* Password */}
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
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    className="form-input"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                {touched.password && errors.password && (
                  <div className="error-message">{errors.password}</div>
                )}
              </div>

              {/* General error message */}
              {status && (
                <div
                  className="error-message"
                  style={{ marginTop: "1rem", textAlign: "center" }}
                >
                  {status}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="custom-button"
              >
                {isSubmitting ? (
                  <div className="loading-container">
                    <div className="spinner"></div>
                    Connexion...
                  </div>
                ) : (
                  "Se connecter"
                )}
              </button>

              <p style={{ textAlign: "center", fontSize: "14px" }}>
                Pas encore de compte ?{" "}
                <Link to="/register" className="register-link">
                  Inscrivez-vous ici
                </Link>
              </p>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}
