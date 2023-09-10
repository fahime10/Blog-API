import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const PostsPage = ({ user, username, password, setUsername, setPassword, setUser }) => {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:9000/api/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username, password: password }),
        })
        .then((res) => res.json())
        .then((res) => { 
            setUser(res.username);
            localStorage.setItem('user', res.username); 
        })
        .catch((err) => {
            console.log(err);
            setUser(null);
            setUsername('');
            setPassword('');
        })
        .finally(setLoading(false));

    }, [username, password, setUsername, setPassword, setUser]);

    if (loading) {
        return(
            <>
                <p>Loading</p>
            </>
        );

    } else if (user !== null && user !== undefined) {
        return(
            <div className="posts-page">
                <h2>Hello, { username }</h2>
                <h1>Posts</h1>
            </div>
        );

    } else {
        return(
            <div className="posts-page">
                <p>Sorry, you are not authorised</p>
                <Link to="/">
                    <button type="button">Home page</button>
                </Link>
            </div>
        );
    }
};

export default PostsPage;