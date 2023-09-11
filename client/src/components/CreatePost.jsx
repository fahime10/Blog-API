import { useState } from "react";
import { Link } from "react-router-dom";

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');

    const id = localStorage.getItem("id");
    const user = localStorage.getItem("user");

    function logout() {
        localStorage.removeItem("id");
        localStorage.removeItem("user");
    }

    function handleTitle(e) {
        setTitle(e.target.value);
    }

    function handleText(e) {
        setText(e.target.value);
    }

    function handleSubmit() {
        fetch("http://localhost:9000/api/posts/create", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user: id, title: title, text: text })
        })
        .then((res) => {
            if (res.status !== 200) {
                throw new Error(res.statusText);
            }
            return res.json();
        });
    }

    if (user !== `${undefined}` && user !== `${null}`) {
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
                <div className="post-form">
                    <h2>Create a new post</h2>
                    <form className="forms">
                        <label>Title: 
                            <input type="text"
                                name="title"
                                required={true}
                                maxLength={50}
                                onChange={handleTitle}
                            />
                        </label>
                        <label>Text:
                            <textarea name="text"
                                maxLength={1000}
                                required={true}
                                rows={10}
                                cols={30}
                                onChange={handleText}
                            />
                        </label>
                        <Link to="/posts">
                            <button type="button" onClick={handleSubmit}>Submit</button>
                        </Link>
                    </form>
                </div>
            </>
        );
    } else {
        <div className='post-form'>
                <p>Sorry, you are not authorised</p>
                <Link to='/posts'>
                    <button type='button'>Back to posts</button>
                </Link>
        </div>
    }
};

export default CreatePost;