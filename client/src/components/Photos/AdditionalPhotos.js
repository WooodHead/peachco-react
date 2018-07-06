import React from "react";
//import urlExists from "url-exists";
import "./AdditionalPhotos.css";

export const AdditionalPhotos = props => {

const images = [props.secPic,'','','','','','','','',''];

const addImage = () => {
    console.log("blah")
}

  return (
      <div className="section-wrapper">
        <h3>Additional Photos</h3>
        <div className="photos-wrapper">
            {images.map((image, i) => (
                <div 
                    className="photo-wrapper"
                    key={i}
                    onClick={() => addImage()}
                >
                    {image !== "" && props.secPic ?
                     <img className="additional-image" src={`http://www.thepeachco.com/ebay/images/${image}/${i+1}.jpg`} alt="extra"/> : 
                     <i className="fas fa-plus"/>
                    }
                </div>
            ))}
        </div>
      </div>

  )
};
