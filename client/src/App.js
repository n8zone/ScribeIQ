import React, { useState, useEffect } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:4000/api')
        .then(response => response.json())
        .then(data => setMessage(data.message));
  }, []);

  return (
      <div className="App">
        <h1>{message}</h1>
      </div>
  );
}

export default App;