import { Link } from 'react-router-dom';

const HomePage = (props) => {
    return (
        <>
            <div className='menu-bar'>
                <h1>Latest Products Blog</h1>
                <Link to='/'>
                    <button type='button' className='menu'>Home</button>
                </Link>
                <Link to='/sign-up'>
                    <button type='button' className='menu'>Sign up</button>
                </Link>
                <Link to='/login'>
                    <button type='button' className='menu'>Login</button>
                </Link>
            </div>
            <div className='home-page'>
                <h2>Welcome to my blog</h2>
                <p>Here, we discuss any kind of latest products, whether it is about technology or fashion</p>
                <p>Please login or sign up if you are a new user</p>
                <p>{props.status}</p>
            </div>
        </>
    );
};

export default HomePage;