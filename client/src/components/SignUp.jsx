import { useState } from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsername = (e) => {
        setUsername(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = () => {
        const data = { username: username, password: password };

        fetch('http://localhost:9000/api/sign-up', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
        .then((res) => {
            if (res.status !== 200) {
                throw new Error(res.statusText);
            }
            return res.json();
        });
    }

    return (
        <>
            <div className='menu-bar'>
                <h1>Latest Products Blog</h1>
                <Link to='/'>
                    <button type='button' className='menu'>Home</button>
                </Link>
            </div>
            <div className="sign-up-page">
                <h2>Sign up form</h2>
                <form method='GET' action='/' className="forms">
                    <label>
                        Username:
                        <input type="text"
                            name="username" 
                            minLength={1} 
                            maxLength={20}
                            required={true}
                            onChange={handleUsername}
                        />
                    </label>
                    <label>
                        Password:
                        <input type="password"
                            name="password"
                            minLength={4}
                            required={true}
                            onChange={handlePassword}
                        />
                    </label>
                    <button type="submit" onClick={handleSubmit}>Submit</button>
                </form>
            </div>
        </>
    );
};

export default SignUp;