import React from "react";
import "./Photos.css";

export const Photos = props => {
  const images = ["", "", "", "", "", "", "", "", "", "", "", ""];
  return (
      <div className="photos-container">
        <h3>Photos</h3>
        <div className="photos-wrapper">
            {images.map(image => (
                <div className="photo-wrapper">
                    {(image !== "") ? 
                     (`<img src=${image} alt="something"/>`) : 
                     (<i className="fas fa-plus" />)}
                </div>
            ))}
        </div>
      </div>

  )
};
