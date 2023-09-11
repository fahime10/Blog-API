import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const PostsPage = ({ username, password, setUsername, setPassword }) => {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    let logged_user;

    useEffect(() => {
        if (getUser() === `${undefined}` || getUser() === `${null}`) {
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
                localStorage.setItem('id', res._id);
                localStorage.setItem('user', res.username);
            })
            .catch((err) => {
                console.log(err);
                setUsername('');
                setPassword('');
            })
            .finally(setLoading(false));
        }

        return () => {
            setLoading(false);
        }

    }, [username, password, setUsername, setPassword]);

    function getUser() {
        const user = localStorage.getItem('user');
        logged_user = user;
        return user;
    }

    if (loading) {
        return(
            <>
                <p>Loading</p>
            </>
        );

    } else if (getUser() !== `${undefined}` && getUser() !== `${null}`) {
        return(
            <div className="posts-page">
                <h2>Hello, { logged_user }</h2>
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