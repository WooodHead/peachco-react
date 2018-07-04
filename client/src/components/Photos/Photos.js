import React from "react";
import "./Photos.css";

export const Photos = props => {
  const images = ["", "", "", "", "", "", "", "", "", "", "", ""];
  return (
      <div className="photos-container">
        <h3>Photos</h3>
        <div className="photos-wrapper">
            {images.map((image, i) => (
                <div 
                    className="photo-wrapper"
                    key={i}
                >
                    {(image !== "") ? 
                     (`<img src=${image} alt="something"/>`) : 
                     (<i className="fas fa-plus" />)}
                </div>
            ))}
        </div>
      </div>

  )
};
