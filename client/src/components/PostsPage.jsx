import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const PostsPage = ({ username, password, setUsername, setPassword }) => {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    let logged_user;

    useEffect(() => {
        if (getUser() === `${undefined}` || getUser() === `${null}` || getUser() === null) {
            fetch("http://localhost:9000/api/login", {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: username, password: password }),
            })
            .then((res) => res.json())
            .then((res) => { 
                localStorage.setItem("id", res._id);
                localStorage.setItem("user", res.username);
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [username, password, setUsername, setPassword]);

    useEffect(() => {
        if (getUser() !== `${undefined}` || getUser() !== `${null}`) {
            fetch("http://localhost:9000/api/posts", {
                method: 'POST',
            })
            .then((res) => res.json())
            .then((res) => { 
                setPosts(res);
            })
            .catch((err) => {
                console.log(err);
            });
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function getUser() {
        const user = localStorage.getItem("user");
        logged_user = user;
        return user;
    }

    function logout() {
        localStorage.removeItem("id");
        localStorage.removeItem("user");
    }

    function viewPost(e) {
        localStorage.setItem("post", e.target.id);
        if (localStorage.getItem("post") !== "") {
            navigate("/posts/comments");
        }
    }

    if (loading) {
        return(
            <>
                <p>Loading</p>
            </>
        );

    } else if (getUser() !== `${undefined}` && getUser() !== `${null}`) {
        return(
            <>
                <div className="menu-bar">
                    <h1>Latest Products Blog</h1>
                    <Link to="/">
                        <button type="button" className="menu" onClick={logout}>Logout</button>
                    </Link>
                    <Link to="/posts/create">
                        <button type="button" className="menu">Create a new post</button>
                    </Link>
                </div>
                <div className="posts-page">
                    <h2>Hello, { logged_user }</h2>
                    <h1>Posts</h1>
                    <div className="posts">
                        {posts.map((post) => (
                            <div key={post._id} id={post._id} className="post" onClick={viewPost}>
                                <p>Posted by {post.user.username}</p>
                                <p>Title: {post.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </>
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