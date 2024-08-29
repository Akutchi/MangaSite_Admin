import React from 'react';

import {useState}           from 'react';
import { BrowserRouter,
         Link, Route,
         Routes}            from 'react-router-dom';
import axios                from 'axios';

import { getURL, login }        from "../utils/URL";
import LoginPage                from './LoginPage';
import Panel                    from '../CPanel/Panel';
import Protected                from './Protected';
import {JSEncrypt}              from 'jsencrypt';

const baseURL = getURL();

function App() {

    const [isLoggedIn, setisLoggedIn] = useState(false);
    const [hide, setHide]             = useState(false);
    const [post, setPost]             = useState(false);

    const BDDCall = async() => {

        const login_user = document.getElementById("login").value;
        const pwd = document.getElementById("pswd").value;
        const raw_message = login_user+":"+pwd;

        const updated_message = await axios.get(baseURL+login.TIME).then((response) => {

            const salt = Math.floor(652541*Math.random());
            return raw_message+":"+response.data.timestamp+":"+salt.toString();
        });

        const PublicKey = localStorage['PublicKey'];

        let encrypt = new JSEncrypt();
        encrypt.setPublicKey(PublicKey);
        const crypted_message = encrypt.encrypt(updated_message);
        const escaped_message = crypted_message.replaceAll("+", "$2B");

        axios.get(baseURL+login.VERIFY_USER+"?hash="+escaped_message).then((response) => {
            setPost(response.data);
            localStorage['AuthToken'] = response.data.token;
        });

        if (!post) {return null};

        if (post.auth) {
            setisLoggedIn(true);
            setHide(true);
        }
    }

    return (
        <>
            <BrowserRouter>
                <div id="login-div" style={{display: "none"}}>
                <LoginPage setters={{setLog: setisLoggedIn, setHide: setHide}}/>
                <Link id="login-button" to="/admin-login" onClick={() => {BDDCall()}} replace>Login</Link>
                </div>

                <Routes>
                    <Route path="/"/>
                    <Route path="/admin-login" element={ <Panel />} />
                </Routes>
            </BrowserRouter>

            <style jsx="true">{`

                #login-div {

                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    background-color: #256d85;
                    margin-top: 5%;
                    margin-left: 35%;
                    margin-right: 30%;
                }
            `}

            </style>
        </>
    );

}

export default App;
