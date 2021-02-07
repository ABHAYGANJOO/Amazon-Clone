import React from 'react';
import '../styles/LoginPage.css'
import { Link, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { auth } from '../firebase';

function LoginPage() {
    const history = useHistory(); //helps us to change link manually 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registerError, setRegisterError] = useState(null);
    const [loginError, setLoginError] = useState(null);
    const [flag, setFlag] = useState(0);

    const SignIn = (e) => {
        e.preventDefault()
        auth.signInWithEmailAndPassword(email, password)
            .then((auth) => {
                console.log("Logged in as:", auth)
                history.push('/')
            })
            .catch((error) => {
                console.error("Failed to login.", error);
                setLoginError(error.message);
                setFlag(1);
            })
    }

    const Register = (e) => {
        e.preventDefault();

        auth.createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                console.log("Registered the user:" + email);
                if (auth) {
                    history.push('/')
                }
            })
            .catch(error => {
                console.error("Failed to register the user", error.message);
                setRegisterError(error.message);
                setFlag(2);
            });
    }

    const ErrorContainer = () => {
        console.log("flag:" + flag)
        return (
            <div className="login__container error">
                <div className="login__error">
                    {flag === 1 ? loginError : registerError}
                </div>
            </div>)
    }
    return (
        <div className="login">
            <Link to="/">
                <img className="login__logo" src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" />
            </Link>

            <div className="login__container">
                <h1>Sign In</h1>
                <form>
                    <h5>Email</h5>
                    <input type="text" value={email} onChange={(e) => { setEmail(e.target.value) }} ></input>

                    <h5>Password</h5>
                    <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }}  ></input>

                    <button type="submit" className="login__signInButton" onClick={(e) => { SignIn(e) }}>Sign In</button>
                </form>

                <p>By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use & Sale. Please
                    see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.</p>
                <button className="login__registerButton" onClick={(e) => { Register(e) }}>Create your Amazon Account</button>
            </div>
            <br/>
            {(loginError || registerError) && ErrorContainer()}
        </div>
    )
}

export default LoginPage
