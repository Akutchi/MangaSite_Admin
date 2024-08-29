import React from 'react';

import { useState, useEffect }       from 'react';
import axios                         from 'axios';

import { getURL, manga }             from "../utils/URL";
import Board                         from "./Board";

import cross from   "../../SVG/cross-24.svg";
import              "../../CSS/boardEditor.css";

const baseURL = getURL();

const MANGA = "manga";
const STAFF = "roles";

function constructField(name, value) {

    return (
        <div class="form__group" style={{width: "70%", marginBottom: "3%"}}>
            <label class="form__label">{name}</label>
            <input class="form__field_2" defaultValue={value}/>
        </div>
    );
}

function constructRole(currentRole) {

    return (
        <div style={{marginBottom: "3%"}}>
            <label>Roles :</label>
            <select>
                <option value="root">Admin</option>
            </select>
        </div>
    );
}

function formatInformation(info, chapters_raw) {

    let tags = [];
    let chapters = [];

    Object.entries(info.tags).forEach(element => {
        tags.push({name: element[1]});
    });

    chapters_raw.forEach(element => {
        chapters.push({name: element.CHANA, hash: element.CHAUR});
    });

    return [tags.slice(0, tags.length-1), chapters.slice(0, chapters.length-1)];
}

function BoardEditor(props) {

    const setEditorState = props.addEditor;

    const [informations, setInformations] = useState(null);
    const [chaptersData, setChaptersData] = useState(null);

    const getMangaInformations = async() => {

        await axios.get(baseURL+manga.MANGA_INFO_ID+props.mId)
        .then(response => {return response.data})
        .then(response => {setInformations(response)})
        .catch(error => {return null});
    }

    const getChapterInformations = async() => {

        await axios.get(baseURL+"chapters/hash-daee7686db5c0f8f0317?id="+props.mId)
        .then(response => {return response.data})
        .then(response => {setChaptersData(response)})
        .catch(error => {return null});
    }

    useEffect(() => {
        getMangaInformations();
        getChapterInformations();
    }, []);

    if (!informations) {return null};
    if (!chaptersData) {return null};

    const formattedInformations = formatInformation(informations, chaptersData);
    const tags = formattedInformations[0];
    const chapters = formattedInformations[1];

  return (

        <div id={"boardEditor"+props.id}>


            <img src={cross} onClick={() => setEditorState(false)}/>

            {constructField("Name", informations.manga_info.name)}

            {props.type == STAFF ? constructRole("defaultRole") : <></>}

            <div class="teams">
                <label>Teams | </label>
                <select>
                    <option value="bs">T1</option>
                </select>
            </div>

            {props.type == MANGA ? <textarea>{informations.manga_info.summary}</textarea> : <></>}
            {props.type == MANGA ? <Board content={tags} container_div="28" dim={["100", "148"]} type="tags" id="1" marginBottom="3"/> : <></>}
            {props.type == MANGA ? <Board content={chapters} container_div="66" dim={["120", "200"]} type="chapters" id="2" marginBottom="3"/> : <></>}

            <button className="applyBtn">Apply</button>

        <style jsx="true">{`

            #boardEditor${props.id} {
                display: flex;
                flex-direction: column;
                align-items: center;
                background-color: #256d85;
            }

            #boardEditor${props.id} > img {
                width: 5%;
                height: 5%;
                margin-left: 90%;
                margin-top: 2%;
            }

            `}</style>
        </div>

  );
}

  export default BoardEditor;
