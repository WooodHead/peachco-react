import React from "react";
//import urlExists from "url-exists";
import "./AdditionalPhotos.css";


export const AdditionalPhotos = props => {

  let imageArr = [];
  for (let i = 0; i < props.numPics; i++) {
    imageArr.push(
      `http://www.thepeachco.com/ebay/images/${props.secPic}/${i + 1}.jpg`
    );
  }

  return (
    <div className="section-wrapper">
      <h3>Additional Photos</h3>
      <div className="photos-wrapper">
        {imageArr.map((image, i) => (
          <div 
            className="photo-wrapper" 
            key={i}
            onClick={props.update}
          >
            <img src={image} alt="additional" width="100" />
          </div>
        ))}
        {props.numPics < 10 ? (
          <div 
            className="photo-wrapper"
            onClick={props.add}
          >
                <i className="fas fa-plus" />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
