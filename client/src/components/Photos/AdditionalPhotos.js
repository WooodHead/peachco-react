import React from "react";
//import urlExists from "url-exists";
import "./AdditionalPhotos.css";

let picnum = "";

export const AdditionalPhotos = props => {
  if (props.numPics === 0 || props.numPics === null) {
    if (props.secPic && props.secPic !== "") {
      picnum = 1;
      props.changeNum(picnum);
    } else if (props.secPic && props.secPic === "") {
      picnum = 0;
      props.changeNum(picnum);
    }
  } else {
    picnum = props.numPics;
  }

  let imageArr = [];
  for (let i = 0; i < picnum; i++) {
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
        {picnum < 10 ? (
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
