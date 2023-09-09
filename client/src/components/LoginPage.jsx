import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ setUser }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleUsername = (e) => {
        setUsername(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = () => {
        const data = { username: username, password: password };

        fetch('http://localhost:9000/api/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
        .then((res) => {
            setUser(res.json());
            navigate('/posts');
        });
    }

    return (
        <div className="login-page">
            <h2>Login form</h2>
            <form className="forms">
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
                <button type="button" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    );
};

export default LoginPage;