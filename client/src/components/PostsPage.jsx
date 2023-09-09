import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const PostsPage = ({ user }) => {
    const [posts, setPosts] = useState([]);

    async function getUser() {
        const response = await Promise.resolve(user.then((res) => res.username))
        .then((res) => { return (res) });

        return response;
    }

    if (user !== null && user !== undefined) {
        return(
            <div className="posts-page">
                <h2>Hello,</h2>
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