const HomePage = (props) => {
    return (
        <div className='home-page'>
            <h2>Welcome to my blog</h2>
            <p>Here, we discuss any kind of latest products, whether it is about technology or fashion</p>
            <p>Please login or sign up if you are a new user</p>
            <p>{props.status}</p>
        </div>
    );
};

export default HomePage;