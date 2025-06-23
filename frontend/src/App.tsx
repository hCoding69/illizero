import {  useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
  const [token, setToken] = useState<string | null>(null);
const navigate = useNavigate();
useEffect(() => {
  const storedToken = localStorage.getItem('token');

  // Si null, vide ou "undefined"/"null", on redirige
  if (!storedToken || storedToken === 'undefined' || storedToken === 'null') {
    navigate('/login');
    return;
  }

  setToken(storedToken);
}, []);


  return (
    <div className="p-4">
      {token ? (
        <h1>Connecté avec token : {token}</h1>
      ) : (
        <h1>Non connecté</h1>
      )}
    </div>
  );
}

export default App;
