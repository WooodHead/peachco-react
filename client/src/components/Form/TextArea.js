import React from "react";

export const TextArea = props => (
  <div className="form-input-wrapper">
    <textarea className="form-input" rows="20" {...props} />
  </div>
);
