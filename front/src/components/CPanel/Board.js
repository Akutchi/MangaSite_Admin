import React from "react";

import BoardVisitor       from './BoardVisitor';
import { ReactToDomNode } from "../utils/conversion";

import edit_manga         from '../../SVG/edit.svg';
import delete_manga       from '../../SVG/delete.svg';

import '../../CSS/board.css';

function Delete(elementClass) {

  const row = document.getElementById(elementClass);
  const parent = row.parentElement;

  // workaround.
  /*
  when having only one board it deletes each role as it should
  but when adding one board, it delete this board
  the "row" is the parent
  */
  if (elementClass[0] === "2") {
    parent.removeChild(row);
    return;
  }

  let grand_parent = row.parentElement.parentElement;
  grand_parent.removeChild(parent);

}

function createRow(content, visitor, props, index) {

  return (

    <span id={content.MANID === undefined ? -1 : content.MANID}>
      <li className={props.type+"-row-"+props.id} id={props.id+""+index}>

        {visitor.getAdditionalElements(content, props.type, props.id, index)}

        <img className="editImage" src={edit_manga} alt="edit" onClick={() => {props.Editor.editorSetter(true);
                                                                              props.Editor.editorType(props.type)
                                                                              props.Editor.mangaSetter(content.MANID)}}/>

        <img src={delete_manga} alt="delete" onClick={() => {Delete(props.id+""+index)}}/>
      </li>
    </span>
  );
}

function addRowToList(listId, visitor, props) {

  let list = document.getElementById(listId);
  let currentLenght = list.children.length;

  let content = {}
  switch (props.type) {

    case "manga":
      content = {MANNA: "Your title here"};
      break;

    case "roles":
      content = {name: "Name", role: "role"};
      break;

    case "tag":
      content = {name: "tag"};
      break;

    case "chapters":
      content = {name: "chapter", hash: "hash"};
      break;

  }

  const newRow = ReactToDomNode(document, createRow(content, visitor, props, currentLenght+1));
  list.insertBefore(newRow, list.childNodes[1]);

}

function Board(props) {

  const visitor = new BoardVisitor();

  return (

    <>
      <ul id={"ul-"+props.type+"-"+props.id}>
        <li key={props.type+"-"+props.id} id="add-element" onClick={() => addRowToList("ul-"+props.type+"-"+props.id, visitor, props)}>Click to add <hr /></li>
        {(props.content).map(((element, index) => {return createRow(element, visitor, props, index)}))}

        <style jsx="true">{`

          ul {
            list-style-type: none;
          }

          #ul-${props.type}-${props.id} {
            background-color: #256d85;
            border-color: #256d85;
            width:${props.container_div == null ? "50" : props.container_div}%;
            height: ${props.dim[1] === undefined ? "inherit" : props.dim[1]+"px"};
            overflow: hidden;
            overflow-y: scroll;
            margin-bottom: ${props.marginBottom === undefined ? "0" : props.marginBottom}%;
          }

          #ul-tags-${props.id} {
            margin-left: -5%;
          }

          #ul-chapters-${props.id} {
            margin-left: -4%;
          }

          .${props.type}-row-${props.id} {
            display:flex;
            align-items: center;
            gap: 7%;
            height: ${props.dim[1] == undefined ? "inherit" : props.dim[2]+"px"};
          }

          input[id*='-${props.type}-${props.id}-'] {
            display: inline;
            color: #DFF6FF;
            width: ${props.dim[0]}px;
            overflow-x: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }

          input[id*='-chapters-${props.id}-'] {
            margin-left: 3%;
          }

          #add-element {
            margin-left: -5%;
          }

        `}</style>
      </ul>
    </>
  );
}

  export default Board;
