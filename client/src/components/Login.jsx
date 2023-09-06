import '../styles/Login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const LogIn = () => {

    return (
        <div className='container'>  
            <div className='logo_container'>
                <img className="logo_leaf" src={require('../assets/logo_only_image.png')} alt='logo'/>
            </div>
            <div className='form_container'>
                <form className='login_form'>
                    <div className='id'>
                        <label htmlFor="id">ID</label>
                        <input id="id"></input>
                    </div>
                    <div className='password'>
                        <label htmlFor="password">Password</label>
                        <input id="password" />
                    </div>
                    <div className='submit_button'>
                        <input className='submit' type="submit" value="로그인" />
                    </div>
                </form>
            </div>
            <div className='links'>
                    <a>비밀번호 찾기 </a>
                    <div className='center'> | </div>
                    <a>회원가입</a>
                </div>
        </div>
    )
}

export default LogIn;