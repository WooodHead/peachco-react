import React from "react";
import "./AdditionalPhotos.css";

export const AdditionalPhotos = props => {
  const images = ["", "", "", "", "", "", "", "", "", "", ""];

  return (
      <div className="section-wrapper">
        <h3>Additional Photos</h3>
        <div className="photos-wrapper">
            {images.map((image, i) => (
                <div 
                    className="photo-wrapper"
                    key={i}
                    onClick={() => console.log(i)}
                >
                    {(image !== "") ? 
                     (`<img src="http://www.thepeachco.com/ebay/images/${image}" alt="something"/>`) : 
                     (<i className="fas fa-plus" />)}
                </div>
            ))}
        </div>
      </div>

  )
};
