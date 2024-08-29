import React from "react";

import { useState, useEffect }  from 'react';
import { getURL, manga, admin } from "../utils/URL";
import axios                    from "axios";

const baseURL = getURL();

function changeTitleInBDD(identifier) {

    const element = document.getElementById(identifier);
    const element_id = element.id.split("-")[1];

    if (element.defaultValue != element.value && element.value != undefined) {

        axios.post(baseURL+admin.CHANGE_EXPLORE,  {
                                                id: element_id,
                                                title: element.value,
                                                token: localStorage['AuthToken']
                                            },
                                            {
                                                headers: {
                                                  'Content-Type': 'application/json'
                                                }
                                            })
             .then((res) => {
                if (!res.data.bdd_modified) {
                    element.style = "border: 3px solid #F00;"
                } else {
                    element.style = "border: 3px solid #3dc938;"
                }
             });
    }
}

function ExploreBoard () {


    const [titles, setTitles] = useState(null);
    const [error, setError] = useState(null);



    const getExplore = async() => {

        await axios.get(baseURL+manga.EXPLORE)
        .then(response => {return response.data})
        .then(response => {
            const sort_response = response.sort((a, b) => {return a.expid - b.expid;});
            setTitles(sort_response)})
        .catch(error => {setError(error)});
      }

    useEffect(() => {
        getExplore()
    }, []);

    if (!titles) {return null};

    return (
        <div class="explore-boards" id="ExploreBoardDiv">

            <p>Explore section</p>
            <div>
                {titles.map((title, index) => {

                    return <input key={title.name} id={"explore-"+index}
                                  className="inputExplore" defaultValue={title.name}
                                  onBlur={() => {changeTitleInBDD("explore-"+index)}}/>

                })}
            </div>

            <style jsx="true">{`

                #ExploreBoardDiv {
                    background-color: #256d85;
                    display: flex;
                    width: 50%;
                }

                p {
                    margin-top: 4%;
                    margin-left: 22%;
                }

            `}</style>
        </div>
    )

}

export default ExploreBoard;

