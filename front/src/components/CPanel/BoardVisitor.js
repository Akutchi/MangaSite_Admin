import React from "react";

import axios from "axios";

import { getURL, admin } from "../utils/URL";

const baseURL = getURL();

class BoardVisitor {

    changeNameInBDD(id, identifier, type) {

        const PATH = type == "manga" ? admin.CHANGE_MANGA : admin.CHANGE_CHAPTERS;

        const element = document.getElementById(identifier);

        if (element.defaultValue != element.value && element.value != undefined) {

            axios.post(baseURL+PATH,  {
                                                    id: id,
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

    replaceTextByInput(identifier, type_input) {

        let elem = document.getElementById(identifier);
        elem.outerHTML = "<input type='text' class='form__field' placeholder='Content' id='"+identifier+"' value='"+elem.innerHTML+"' />";
        elem.style.width = type_input;

    }

    changeValue(identifier) {

        const elem = document.getElementById(identifier)
        if (elem.style.color == "green") {
            elem.style.color = "darkred";
            elem.classList.add("price--line-diagonal");
        } else {
            elem.style.color = "green";
            elem.classList.remove("price--line-diagonal");
        }
    }

    isVisibleButton(type, id, index) {

        return (
            <button id={"visible-"+type+"-"+id+"-"+index} value="visible" style={{color: "green"}} onClick={() => this.changeValue("visible-"+type+"-"+id+"-"+index)}>visible</button>
        );

    }

    mangaAddOn(type, content, id, index) {

        return (
            <>
            <input id={"manga-"+type+"-"+id+"-"+index} className="form__field" defaultValue={content.MANNA} onBlur={() => {this.changeNameInBDD(content.MANID, id, "manga")}}/>

            {this.isVisibleButton(type, id, index)}
            </>
        );
    }
      
    rolesAddOn(type, content, id, index) {
      
        return (
          <div className="flexDisplay">
            <input id={"roles-"+type+"-"+id+"-"+index} className="form__field" defaultValue={content.name} />
            <input id={"roles-"+type+"-"+id+"-"+index+"-1"} className="form__field" defaultValue={content.role} />
          </div>
        );
    }

    chaptersAddOn(type, content, id, index) {

        return (
            <div className="flexDisplay">

                <input id={"tag_chap-"+type+"-"+id+"-"+index} className="form__field" title={content.name} defaultValue={content.name} />

                {content.hash == null ? <></> : <input  id={"tag_chap-"+type+"-"+id+"-"+index+"-1"} 
                                                        className="hash form__field"
                                                        defaultValue={content.hash} />
                }

                {content.hash == null ? <></> : this.isVisibleButton(type, id, index)}
          </div>
        );

    }

    getAdditionalElements(content, type, id, index) {

        if (type == "manga") {return this.mangaAddOn(type, content, id, index)}
        else if (type == "roles") {return this.rolesAddOn(type, content, id, index)}
        else if (["tags", "chapters"].includes(type)) {return this.chaptersAddOn(type, content, id, index)}
    }

}

export default BoardVisitor;