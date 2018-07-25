import React from "react";
import "./AdditionalPhotos.css";


export const AdditionalPhotos = props => {

  let imageArr = [];
  for (let i = 0; i < props.numPics; i++) {
    imageArr.push(
      `${props.imageLocation}${props.secPic}/${i + 1}.jpg`
    );
  }

  return (
    <div className="section-wrapper">
      <h3>Additional Photos</h3>
      <div className="photos-wrapper">
        {imageArr.map((image, i) => {
          return (
            <div 
              className="photo-wrapper style_prevu_kit" 
              key={i}
              onClick={() => this[`fileInput${i}`].click()}
            >
              <img src={image} alt="additional" height="100" />
              <input 
                style={{display: "none"}}
                type="file"
                onChange={props.fileSelectedHandlerUpdate(i)}
                id="update"
                ref={fileInputUpdate => this[`fileInput${i}`] = fileInputUpdate}
              />
            </div>
          )
        })}
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
