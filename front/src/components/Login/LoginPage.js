import React from "react";
import axios from 'axios';

import { useNavigate } from "react-router-dom";

import { getURL, login }  from "../utils/URL";

const baseURL = getURL();
let redirect_request_sent = false;

function cacheKey() {

  if (localStorage['PublicKey'] == undefined) {
    axios.get(baseURL+login.GET_PUBLIC).then((res) => {localStorage['PublicKey'] = res.data.public});
  }
}

function LoginPage(props) {

  const navigate = useNavigate();

  const wasLoggedInPreviously = () => {

    if (!redirect_request_sent) {
      axios.get(baseURL+login.ASK_REDIRECT).then((res) => {

        if (res.data.redirect_response) {
          redirect_request_sent = true;
          props.setters.setLog(true);
          props.setters.setHide(true);
          navigate('/admin-login');
        }
      });
    }


  }

  cacheKey();
  wasLoggedInPreviously();

  return (

    <div className="login-div">

      <p>Administration panel</p>
      <input id="login" type="text" placeholder='Login' />
      <input id="pswd" type="password" placeholder='Password' />

      <style jsx="true">{`

      body {
        background-color: #06283d;
      }

      p {

        margin-top: 10%;
        text-align: center;
        font-family: Montressat;
        font-size: 2em;
        color: rgb(238, 141, 13);
      }

      input {

        display: block;
        margin-bottom: 5%;
        border-color: #47b5ff;
        border-radius: 0.5em;
        text-align: center;
        margin-bottom: 2%;
        margin-left: 24%;
      }

      #login_button {

        margin-top: 5%;
        margin-bottom: 5%;
      }

      `}</style>

    </div>

  );
}

export default LoginPage;
