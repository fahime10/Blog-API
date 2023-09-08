import { Link } from "react-router-dom";

const PostsPage = (props) => {
    const { user } = props;

    console.log(user);

    if (user) {
        return(
            <div className="posts-page">
                <h2>Hello, {user.username} </h2>
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