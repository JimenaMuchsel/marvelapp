import React from "react";
import "../css/character.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Character = props => {
  return (
    <div>
      <div className="charthumb-container">
        <img src={props.thumbnail} className="character-thumbnail" />
      </div>
      <p>{props.name}</p>
    </div>
  );
};

export default Character;
