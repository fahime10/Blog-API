const SignUp = () => {
    return (
        <div className="sign-up-page">
            <h2>Sign up form</h2>
            <form className="forms">
                <label>
                    Username:
                    <input type="text"
                        name="username" 
                        minLength={1} 
                        maxLength={20}
                        required={true}
                    />
                </label>
                <label>
                    Password:
                    <input type="password"
                        name="password"
                        minLength={4}
                        required={true}
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default SignUp;