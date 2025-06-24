import {  useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
  const [token, setToken] = useState<string | null>(null);
const navigate = useNavigate();
useEffect(() => {
  const storedToken = localStorage.getItem('token');
  if (!storedToken || storedToken === 'undefined' || storedToken === 'null') {
    navigate('/login');
    return;
  }

  setToken(storedToken);
}, []);


  return (
    <div className="p-4">
      {token ? (
        <h1>Connecté</h1>
      ) : (
        <h1>Non connecté</h1>
      )}
    </div>
  );
}

export default App;
