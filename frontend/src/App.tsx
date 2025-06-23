import { useEffect, useState } from 'react';

function App() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
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
