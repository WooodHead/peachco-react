import React from "react";
//import urlExists from "url-exists";
import "./AdditionalPhotos.css";

let picnum = "";

export const AdditionalPhotos = props => {
    console.log(props.secPic);

    //check the number of pics
    //if numPics are 0 or more likely null then do some other checks
    if(props.numPics === 0 || props.numPics === null){
        //if secPic exists but also secPic has some writing in it.. set picnum to 1
        if(props.secPic && props.secPic !== ""){
            picnum = 1;
            //else if secPic exists and the secPic is blank picnum is to remain 0
        } else if (props.secPic && props.secPic === ""){
            picnum = 0;
        }
    //else if numPics is not equal to 0 and not null pretty much then set the numPics to the value in props
    } else {
        picnum = props.numPics;
    }

    let imageArr = [];
    for (let i = 0; i < picnum; i++){
        imageArr.push(`<div className="photo-wrapper"><img src="http://www.thepeachco.com/ebay/images/${props.secPic}/${i+1}.jpg" key=${i+1} alt="additional"/></div>`);
    }
    console.log(imageArr);

  return (
      <div className="section-wrapper">
        <h3>Additional Photos</h3>
        <div className="photos-wrapper">
            {imageArr}
        </div>
      </div>

  );
};
