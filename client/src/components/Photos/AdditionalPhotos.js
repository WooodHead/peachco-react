import React from "react";
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
            onClick={() => this.fileInputUpdate.click()}
          >
            <img src={image} alt="additional" height="100" />
            <input 
              style={{display: "none"}}
              type="file"
              onChange={(e) => props.fileSelectedHandlerUpdate(e, i)}
              id="update"
              ref={fileInputUpdate => this.fileInputUpdate = fileInputUpdate}
            />
          </div>
        ))}
        {props.numPics < 10 ? (
          <div 
            className="add-wrapper"
            onClick={() => this.fileInputAdd.click()}
          >
            <i className="fas fa-plus" />
            <input 
              style={{display: "none"}} 
              type="file" 
              onChange={(e) => props.fileSelectedHandler(e)} 
              id="add"
              ref={fileInputAdd => this.fileInputAdd = fileInputAdd}
            />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
