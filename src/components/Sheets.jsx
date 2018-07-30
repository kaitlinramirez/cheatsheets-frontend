/* globals showdown */
import React from 'react'
import { Link } from "react-router-dom";
const converter = new showdown.Converter()

const Sheets = props => {
    return (
      <li id="cheatsheets">
        <h3>{props.name}</h3>
        <p dangerouslySetInnerHTML={{__html:converter.makeHtml(props.snippet)}}></p>
        <small>{props.description}</small>
        <div>
          <button id={props.id} onClick={props.deleteCheatsheet} className="delete">Delete</button>
          <Link to="/Edit">
            <button id={props.id} type="button" onClick={() => props.getEditId(props.id)}>Edit</button>
          </Link>
        </div>
      </li>
    )
}

export default Sheets;
