import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ViewPost = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState("");

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
                console.log(res);
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

    if (loading) {
        return(
            <>
                <p>Loading</p>
            </>
        );

    } else if (getUser() !== `${undefined}` && getUser() !== `${null}`) {
        return(
            <>
                {/* <div className="menu-bar">
                    <h1>Latest Products Blog</h1>
                    <Link to="/">
                        <button type="button" className="menu" onClick={logout}>Logout</button>
                    </Link>
                    <Link to="/posts">
                        <button type="button" className="menu">Back to posts</button>
                    </Link>
                </div>
                <div className="posts-page">
                    <h1>{data.post.title}</h1>
                    <div className="post">
                        <h2>Title: {data.post.title}</h2>
                        <h3>Posted by {data.user.username}</h3>
                        <p>{data.post.text}</p>
                    </div>
                </div>
                <div className="comments">
                    {data.map((comment) => (
                        <div key={comment._id} className="comment">
                            <p>Comment: {comment.text}</p>
                        </div>
                    ))}
                </div> */}
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
}

export default ViewPost;