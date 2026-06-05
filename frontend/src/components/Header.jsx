import { FaBookOpen, FaSignInAlt, FaSignOutAlt, FaTachometerAlt, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../store/slices/userSlice';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate('/auth/login');
    };

    return (
        <header className='header'>
            <div className="logo">
                <Link to='/'><FaBookOpen /> Katalog Librash</Link>
            </div>

            <ul>
                {user ? (
                    <>
                        <li>
                            <Link to='/dashboard'>
                                <FaTachometerAlt /> Dashboard
                            </Link>
                        </li>
                        <li>
                            <button className='btn' onClick={handleLogout}>
                                <FaSignOutAlt /> Dil
                            </button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to='/auth/login'>
                                <FaSignInAlt /> Login
                            </Link>
                        </li>
                        <li>
                            <Link to='/auth/register'>
                                <FaUser /> Regjistrohu
                            </Link>
                        </li>
                    </>
                )}

            </ul>
        </header>
    );
};

export default Header;
