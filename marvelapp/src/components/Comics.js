import React from "react";
import "../css/comic.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Comics = props => {
  return (
    <div>
      <img type="button" src={props.thumbnail} className="comic-thumbnail" />
    </div>
  );
};

export default Comics;
