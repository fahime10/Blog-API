import { useState } from 'react';

const LoginPage = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = props;

    const handleUsername = (e) => {
        setUsername(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { username: username, password: password };

        fetch('http://localhost:9000/api/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
        .then(async (res) => {
            if (res.status !== 200) {
                throw new Error(res.statusText);
            }
            console.log(res.json());
            await props.setUser(res.json());
        });
    }

    return (
        <div className="login-page">
            <h2>Login form</h2>
            <form method='' action='/posts' onSubmit={handleSubmit} className="forms">
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
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default LoginPage;