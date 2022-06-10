import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from './axios';

const Register = () => {

    const navigate = useNavigate();

    const [usermailId, setUsermailId] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student');
    const [username, setUsername] = useState('')


    const clearFeilds = () => {
        setUsermailId('');
        setPassword('');
        setRole('student');
        setUsername('')


    }



    const signup = async (e) => {
        e.preventDefault();

        console.log(usermailId, password, role)

        await axios.post('/register/signup', {
            username: username,
            email: usermailId,
            password: password,
            role: role
        }).then((response) => {
            alert(response.data);
            navigate('/');
        });

        clearFeilds();


    }

    return (
        <div className='signup'>
            <div className="signupContainer">
                <form>

                    <label name={'username'} value={'usernamel'} >Username</label><br />

                    <input name={'username'}
                        type={'text'}
                        placeholder={'Enter your username'}
                        value={username}
                        onChange={(e) => { setUsername(e.target.value) }} /><br /><br />

                    <label name={'email'} value={'Email'} >Email</label><br />

                    <input name={'email'}
                        type={'email'}
                        placeholder={'Enter your register email'}
                        value={usermailId}
                        onChange={(e) => { setUsermailId(e.target.value) }} /><br /><br />


                    <label name={'password'} value={'Email'} >Password</label><br />

                    <input name={'password'}
                        type={'password'}
                        placeholder={'Enter your password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} /><br /><br />

                    <select onChange={(e) => setRole(e.target.value)}>
                        <option value="student" active>student</option>
                        <option value="teacher">teacher</option>
                    </select><br /><br />

                    <input type={'submit'} value={'SignUp'} className={'signinBtn'} onClick={signup} /><br /><br />

                </form><br /><br />


            </div>


        </div>
    )
}

export default Register
