import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from './axios';

import './App.css';

const Login = () => {

    const navigate = useNavigate();

    const [usermailId, setUsermailId] = useState();
    const [password, setPassword] = useState();

    const clearFeilds = () => {
        setUsermailId('');
        setPassword('');

    }




    const login = async (e) => {

        e.preventDefault();

        window.localStorage.setItem('loginDetails', JSON.stringify({
            email: usermailId,
            password: password
        }));
        const loggedDeatils = JSON.parse(window.localStorage.getItem('loginDetails'))


        await axios.post('/register/login', {
            email: loggedDeatils.email,
            password: loggedDeatils.password,
        }).then((response) => {
            window.localStorage.setItem('logged_User', JSON.stringify(response.data))
        });

        clearFeilds();
        navigate('/');



    }






    return (
        <div className='login'>

            <div className="loginContainer">
                <form>

                    <label name={'email'} value={'Email'} >Email</label><br />

                    <input name={'email'}
                        type={'email'}
                        placeholder={'Enter your register email'}
                        onChange={(e) => { setUsermailId(e.target.value) }} /><br /><br />


                    <label name={'password'} value={'Email'} >Password</label><br />

                    <input name={'password'}
                        type={'password'}
                        placeholder={'Enter your password'}
                        onChange={(e) => setPassword(e.target.value)} /><br /><br />

                    <input type={'submit'} value={'Login'} className={'loginBtn'} onClick={login} /><br /><br />

                </form><br /><br />

                <Link to="/signup" > <input className={'signupBtn'} type={'button'} value={'signup'} /></Link>
            </div>

            <div>
                <h3>Plaese use email-'kadhir@gmail.com', password-'123456' for login </h3>
            </div>

        </div>
    )
}

export default Login
