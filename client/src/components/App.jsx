import '../main.css';
import reactLogo from '../assets/react.svg';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './HomePage';
import SignUp from './SignUp';
import ErrorPage from './ErrorPage';
import LoginPage from './LoginPage';
import PostsPage from './PostsPage';

function App() {
  const [apiResponse, setApiResponse] = useState('');
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    fetch('http://localhost:9000/api')
      .then(res => res.text())
      .then(res => setApiResponse(res))
      .catch(err => console.log(err));
  }, []);

  return (
    <>
    <BrowserRouter>
      <div className='menu-bar'>
        <h1>Latest Products Blog</h1>
        <Link to='/'>
          <button type='button' className='menu'>Home</button>
        </Link>
        <Link to='/sign-up'>
          <button type='button' className='menu'>Sign up</button>
        </Link>
        <Link to='/login'>
          <button type='button' className='menu'>Login</button>
        </Link>
      </div>
      <Routes>
        <Route path='/' element={<HomePage status={apiResponse} />} errorElement={<ErrorPage />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/login' element={
          <LoginPage setUser={setUser} setUsername={setUsername} setPassword={setPassword} />} 
        />
        <Route path='/posts' element={
          <PostsPage user={user} username={username} password={password} setUsername={setUsername} 
            setPassword={setPassword} setUser={setUser} 
          />} 
        />
      </Routes>
    </BrowserRouter>
    <footer>Developed by Fahim Ahmed <img src={reactLogo} /></footer>
    </>
  )
}

export default App
