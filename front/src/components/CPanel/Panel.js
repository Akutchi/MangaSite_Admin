  import React from "react";

import {useState, useEffect}  from 'react';
import axios                  from 'axios';

import Board                    from './Board';
import BoardEditor              from './BoardEditor';
import { getURL, sort, login }  from '../utils/URL';
import { useNavigate }          from "react-router-dom";
import ExploreBoard             from "./ExploreBoard";

const baseURL = getURL();


function openEditor(setEditor, editorType, mangaId) {

  document.getElementById("boards").style.filter = "brightness(50%)"
  document.getElementById("ExploreBoardDiv").style.filter = "brightness(50%)"
  return <BoardEditor addEditor={setEditor} type={editorType} mId={mangaId}/>;
}

function closeEditor() {

  let board_dom = document.getElementById("boards");
  if (board_dom != null) board_dom.style.filter = "brightness(100%)";

  let explore_dom = document.getElementById("ExploreBoardDiv");
  if (explore_dom != null) explore_dom.style.filter = "brightness(100%)";

  return <></>;
}

function Panel() {

  const [titles, setTitles] = useState(null);
  const [error, setError]   = useState(null);

  const [isEditorOpen, setEditor]   = useState(false);
  const [editorType, setEditorType] = useState(null);
  const [mangaId, setMangaId]       = useState(0);

  const navigate = useNavigate();

  const getMangaSorted = async() => {

    await axios.get(baseURL+sort.ALPHABET_SORT)
    .then(response => {return response.data})
    .then(response => {setTitles(response)})
    .catch(error => {setError(error)});
  }

  const logout = async() => {

    await axios.get(baseURL+login.LOGOUT).then((res) => {
      if (res.data.status) {
        navigate("/");
      }
    })

  }

  useEffect(() => {
    getMangaSorted()
  }, []);

  if (error) return `Error: ${error}`;
  if (!titles) {return null};

  const roles = [
    {name:"R1", role:"admin"},
    {name:"R2", role:"viewer"},
    {name:"R3", role:"editor"}
  ];

  return (

    <div style={{width:"100%", height:"100%"}}>

      <nav><button onClick={() => {logout()}}>Log out</button></nav>

      <div id="boardEditor-container">
        {isEditorOpen ? openEditor(setEditor, editorType, mangaId) : closeEditor()}
      </div>

      <ExploreBoard />

      <div id="boards">
        <div id="inline-boards">
          <Board content={titles} dim={["200"]} type="manga" id="1" Editor={{"editorSetter":setEditor, "editorType":setEditorType, "mangaSetter": setMangaId}}/>
          <div className='vl'></div>
          <Board content={roles} dim={["60"]} type="roles" id="2" Editor={{"editorSetter":setEditor, "editorType":setEditorType}}/>
        </div>

        <style jsx="true">{`
        body {
          background-color: #06283d;
        }

        nav {
          margin-bottom: 2%;
        }

        #boards {
          display: flex;
          filter: brightness(100%);
          width: 100%;
          height:100%:
        }

        #inline-boards {
          display: flex;
          width:inherit;
        }

        .vl {
          border-left: 6px solid #47b5ff;
          height: inherit;
        }

        #boardEditor-container {
          position: absolute;
          z-index: 1;
          width: 40%;
          top: 10%;
          left: 32%;
        }
        `}</style>

      </div>
    </div>


  );
}

export default Panel;
