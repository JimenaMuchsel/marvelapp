import React from "react";
import "../css/comicdescription.css";
import "bootstrap/dist/css/bootstrap.min.css";

const options = { year: "numeric", month: "long", day: "numeric" };

const ComicDescription = props => {
  return (
    <div className="description-box m-3">
      <h1>{props.title}</h1>
      <img className="mt-2" src={props.thumbnail} />
      <div className="description-text">
        <p> 
          <b>{props.dateonsale && "Date On Sale: "}</b>
          {props.dateonsale &&
            new Date(props.dateonsale).toLocaleDateString("en-Us", options)}
        </p>
        <p>
          <b>{props.focdate && "Final Order Cut Off Date: "}</b>
          {props.focdate &&
            new Date(props.focdate).toLocaleDateString("en-Us", options)}
        </p>
        <p>
          <b>{props.uldate && "Unlimited Date: "}</b>
          {props.uldate &&
            new Date(props.uldate).toLocaleDateString("en-Us", options)}
        </p>
        <p>
          <b>{props.dpdate && "Digital Purchase Date:"}</b>
          {props.dpdate &&
            new Date(props.dpdate).toLocaleDateString("en-Us", options)}
        </p>
        <p style={{ textTransform: "capitalize" }}> 
          <b>{props.creatorrole1 && props.creatorrole1 + ":"}</b>{" "}
          {props.creatorname1}
        </p>
        <p style={{ textTransform: "capitalize" }}>
          <b>{props.creatorrole2 && props.creatorrole2 + ":"}</b>{" "}
          {props.creatorname2}
        </p>
        <p style={{ textTransform: "capitalize" }}>
          <b>{props.creatorrole3 && props.creatorrole3 + ":"}</b>{" "}
          {props.creatorname3}
        </p>
        <p style={{ textTransform: "capitalize" }}>
          <b>{props.creatorrole4 && props.creatorrole4 + ":"}</b>{" "}
          {props.creatorname4}
        </p>
        <p>{props.description}</p>
      </div>
    </div>
  );
};

export default ComicDescription;
