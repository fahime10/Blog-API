import { Link, useNavigate } from "react-router-dom";

const CreateComment = () => {
    const navigate = useNavigate();

    function getUser() {
        const user = localStorage.getItem("user");
        return user;
    }

    if (getUser() !== `${undefined}` && getUser() !== `${null}`) {
        return (
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
                <div className="create-comment-page">
                    <form className="forms">
                        
                    </form>
                </div>
            </>
        );
    }
}