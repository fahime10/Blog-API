import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const ViewPost = () => {
    const [loading, setLoading] = useState(true);
    const [post, setPost] = useState();
    const [comments, setComments] = useState();
    const [comment, setComment] = useState("");

    const navigate = useNavigate();
    
    const user = localStorage.getItem("id");

    useEffect(() => {
        if (getUser() !== `${undefined}` && getUser() !== `${null}`) {
            fetch("http://localhost:9000/api/posts/comments", {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ post: localStorage.getItem("post") })
            })
            .then((res) => res.json())
            .then((res) => {
                setPost(res.post);
                setComments(res.comments);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(setLoading(false));
        }

        return () => {
            setLoading(false);
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function getUser() {
        const user = localStorage.getItem("user");
        return user;
    }

    function logout() {
        localStorage.removeItem("id");
        localStorage.removeItem("user");
    }

    function checkUser() {
        return user === post.user._id;
    }

    function handleText(e) {
        setComment(e.target.value);
    }

    function handleDelete() {
        fetch("http://localhost:9000/api/posts/delete", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ post: post._id })
        })
        .catch((err) => { 
            console.log(err);
        })
        .finally(navigate("/posts"));
    }

    function handleSubmit() {
        if (comment.length > 0) {
            setLoading(true);
            fetch("http://localhost:9000/api/posts/comments/create", {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user: user, post: post, text: comment })
            })
            .catch((err) => { 
                console.log(err);
            })
            .finally(setComments());

            fetch("http://localhost:9000/api/posts/comments", {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ post: localStorage.getItem("post") })
            })
            .then((res) => res.json())
            .then((res) => {
                setComments(res.comments);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                if (comments.length > 0) { 
                    setLoading(false);
                }
            });
        }
    }

    if (loading) {
        return(
            <>
                <p>Loading</p>
            </>
        );

    } else if (getUser() !== `${undefined}` && getUser() !== `${null}` && post !== undefined) {
        if (comments.length > 0) {
            if (checkUser()) {
                return(
                    <>
                        <div className="menu-bar">
                            <h1>Latest Products Blog</h1>
                            <Link to="/">
                                <button type="button" className="menu" onClick={logout}>Logout</button>
                            </Link>
                            <Link to="/posts">
                                <button type="button" className="menu">Back to posts</button>
                            </Link>
                        </div>
                        <div className="single-post">
                            <h1>Title: {post.title}</h1>
                            <h3>Posted by {post.user.username}</h3>
                            <p>{post.text}</p>
                            <button type="button" onClick={handleDelete}>Delete post</button>
                        </div>
                        <div className="comments-section">
                            <div className="comment-form">
                                <div className="forms">
                                    <label>
                                        New comment:
                                    </label>
                                    <textarea name="new-comment"
                                        cols={30}
                                        rows={10}
                                        maxLength={1000}
                                        onChange={handleText}
                                    />
                                    <button type="button" onClick={handleSubmit}>Submit</button>
                                </div>
                            </div>
                            <h2>Comments</h2>
                            {comments.map((comment) => (
                                <div key={comment._id} className="comment">
                                    <p>{comment.text}</p>
                                    <p>by {comment.user.username}</p>
                                    <p>Date: {comment.timestamp.substr(0, 10)}</p>
                                </div>
                            ))}
                        </div>
                    </>
                );
            } else {
                return(
                    <>
                        <div className="menu-bar">
                            <h1>Latest Products Blog</h1>
                            <Link to="/">
                                <button type="button" className="menu" onClick={logout}>Logout</button>
                            </Link>
                            <Link to="/posts">
                                <button type="button" className="menu">Back to posts</button>
                            </Link>
                        </div>
                        <div className="single-post">
                            <h1>Title: {post.title}</h1>
                            <h3>Posted by {post.user.username}</h3>
                            <p>{post.text}</p>
                        </div>
                        <div className="comments-section">
                            <div className="comment-form">
                                <div className="forms">
                                    <label>
                                        New comment:
                                    </label>
                                    <textarea name="new-comment"
                                        cols={30}
                                        rows={10}
                                        maxLength={1000}
                                        onChange={handleText}
                                    />
                                    <button type="button" onClick={handleSubmit}>Submit</button>
                                </div>
                            </div>
                            <h2>Comments</h2>
                            {comments.map((comment) => (
                                <div key={comment._id} className="comment">
                                    <p>{comment.text}</p>
                                    <p>by {comment.user.username}</p>
                                    <p>Date: {comment.timestamp.substr(0, 10)}</p>
                                </div>
                            ))}
                        </div>
                    </>
                );
            }
        } else {
            if (checkUser()) {
                return(
                    <>
                        <div className="menu-bar">
                            <h1>Latest Products Blog</h1>
                            <Link to="/">
                                <button type="button" className="menu" onClick={logout}>Logout</button>
                            </Link>
                            <Link to="/posts">
                                <button type="button" className="menu">Back to posts</button>
                            </Link>
                        </div>
                        <div className="single-post">
                            <h1>Title: {post.title}</h1>
                            <h3>Posted by {post.user.username}</h3>
                            <p>{post.text}</p>
                            <button type="button" onClick={handleDelete}>Delete post</button>
                        </div>
                        <div className="comments-section">
                            <div className="comment-form">
                                <div className="forms">
                                    <label>
                                        New comment:
                                    </label>
                                    <textarea name="new-comment"
                                        cols={30}
                                        rows={10}
                                        maxLength={1000}
                                        onChange={handleText}
                                    />
                                    <button type="button" onClick={handleSubmit}>Submit</button>
                                </div>
                            </div>
                            <h2>Comments</h2>
                        </div>
                    </>
                );
            } else {
                return(
                    <>
                        <div className="menu-bar">
                            <h1>Latest Products Blog</h1>
                            <Link to="/">
                                <button type="button" className="menu" onClick={logout}>Logout</button>
                            </Link>
                            <Link to="/posts">
                                <button type="button" className="menu">Back to posts</button>
                            </Link>
                        </div>
                        <div className="single-post">
                            <h1>Title: {post.title}</h1>
                            <h3>Posted by {post.user.username}</h3>
                            <p>{post.text}</p>
                        </div>
                        <div className="comments-section">
                            <div className="comment-form">
                                <div className="forms">
                                    <label>
                                        New comment:
                                    </label>
                                    <textarea name="new-comment"
                                        cols={30}
                                        rows={10}
                                        maxLength={1000}
                                        onChange={handleText}
                                    />
                                    <button type="button" onClick={handleSubmit}>Submit</button>
                                </div>
                            </div>
                            <h2>Comments</h2>
                        </div>
                    </>
                );
            }
        }

    } else {
        return(
            <div className="comments-page">
                <p>Sorry, you are not authorised</p>
                <Link to="/">
                    <button type="button">Home page</button>
                </Link>
            </div>
        );
    }
}

export default ViewPost;