import { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { setUser } from '../store/slices/userSlice';
import { useRegisterMutation } from '../store/apis/userApi';

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [register, { isLoading }] = useRegisterMutation();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    });

    const { name, email, password, password2 } = formData;

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (password !== password2) {
            toast.error('Fjalekalimet nuk perputhen');
            return;
        }

        const { password2: _password2, ...registerData } = formData;
        const response = await register(registerData);
        if (response.error) {
            toast.error(response.error.data?.message || response.error.error || 'Regjistrimi deshtoi');
            return;
        }

        dispatch(setUser(response.data));
        localStorage.setItem('user', JSON.stringify(response.data));
        navigate('/');
        toast.success('Regjistrimi u krye me sukses!');
    };

    return (
        <>
            <section className='heading auth-heading'>
                <h1><FaUser /> Regjistrohu</h1>
                <p>Krijo llogarine e adminit per te menaxhuar katalogun</p>
            </section>

            <section className='form auth-card'>
                <form onSubmit={onSubmit}>
                    <div className='form-group'>
                        <label htmlFor='name'>Emri</label>
                        <input required type='text' id='name' name='name' value={name} placeholder='Emri juaj' onChange={onChange} />
                    </div>

                    <div className='form-group'>
                        <label htmlFor='email'>Email</label>
                        <input required type='email' id='email' name='email' value={email} placeholder='email@example.com' onChange={onChange} />
                    </div>

                    <div className='form-group'>
                        <label htmlFor='password'>Fjalekalimi</label>
                        <input required type='password' id='password' name='password' value={password} placeholder='Fjalekalimi' onChange={onChange} />
                    </div>

                    <div className='form-group'>
                        <label htmlFor='password2'>Konfirmo fjalekalimin</label>
                        <input required type='password' id='password2' name='password2' value={password2} placeholder='Konfirmo fjalekalimin' onChange={onChange} />
                    </div>

                    <button type='submit' className='btn btn-block' disabled={isLoading}>
                        {isLoading ? 'Ju lutem prisni...' : 'Regjistrohu'}
                    </button>
                </form>
            </section>
        </>
    );
};

export default Register;
