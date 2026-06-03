import { FaSignInAlt } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { setUser } from '../store/slices/userSlice';
import { useLoginMutation } from '../store/apis/userApi';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [login, { isLoading }] = useLoginMutation();
    const user = useSelector((state) => state.user);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { email, password } = formData;

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const response = await login(formData);
        if (response.error) {
            toast.error(response.error.data?.message || response.error.error || 'Login deshtoi');
            return;
        }

        dispatch(setUser(response.data));
        localStorage.setItem('user', JSON.stringify(response.data));
        navigate('/');
        toast.success(`Mire se erdhe ${response.data.name}!`);
    };

    useEffect(() => {
        if (user) navigate('/');
    }, [user, navigate]);

    return (
        <>
            <section className='heading auth-heading'>
                <h1><FaSignInAlt /> Login</h1>
                <p>Hyr ne llogari per te pare katalogun e librave</p>
            </section>

            <section className='form auth-card'>
                <form onSubmit={onSubmit}>
                    <div className='form-group'>
                        <label htmlFor='email'>Email</label>
                        <input required type='email' id='email' name='email' value={email} placeholder='email@example.com' onChange={onChange} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>Fjalekalimi</label>
                        <input required type='password' id='password' name='password' value={password} placeholder='Fjalekalimi' onChange={onChange} />
                    </div>
                    <button type='submit' className='btn btn-block' disabled={isLoading}>
                        {isLoading ? 'Ju lutem prisni...' : 'Login'}
                    </button>
                </form>
            </section>
        </>
    );
};

export default Login;
