import React from "react";
import "./Card.css";

const Card = ({ title, description, image, source, publishedAt,url }) => {
  return (
    <>
      <div className="news-card">
        {image && <img src={image} alt={title} />}

        <h1>{title}</h1>
        <p>{description}</p>

        <div className="news-details">
          <p>{publishedAt}</p>
          <a href={url}>
            {source} <span> ➔ </span>{" "}
          </a>
        </div>
      </div>
    </>
  );
};

export default Card;
