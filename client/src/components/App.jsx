import "../main.css";
import reactLogo from "../assets/react.svg";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import SignUp from "./SignUp";
import ErrorPage from "./ErrorPage";
import LoginPage from "./LoginPage";
import PostsPage from "./PostsPage";
import CreatePost from "./CreatePost";
import ViewPost from "./ViewPost";

function App() {
  const [apiResponse, setApiResponse] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    fetch("http://localhost:9000/api")
      .then(res => res.text())
      .then(res => setApiResponse(res))
      .catch(err => console.log(err));
  }, []);

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage status={apiResponse} />} errorElement={<ErrorPage />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={
          <LoginPage setUsername={setUsername} setPassword={setPassword} />} 
        />
        <Route path="/posts" element={
          <PostsPage  username={username} password={password} 
            setUsername={setUsername} setPassword={setPassword}
          />} 
        />
        <Route path="/posts/create" element={<CreatePost />} />
        <Route path="/posts/comments" element={<ViewPost />} />
      </Routes>
    </BrowserRouter>
    <footer>Developed by Fahim Ahmed <img src={reactLogo} /></footer>
    </>
  )
}

export default App
