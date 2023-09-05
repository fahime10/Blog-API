import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [apiResponse, setApiResponse] = useState('');

  useEffect(() => {
    fetch('http://localhost:9000/api')
      .then(res => res.text())
      .then(res => setApiResponse(res))
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <p>{apiResponse}</p>
    </>
  )
}

export default App
