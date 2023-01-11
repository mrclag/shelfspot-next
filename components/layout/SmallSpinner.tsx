import React from "react";

const SmallSpinner = ({ style = "" }) => {
  return (
    <div className={`lds-ring ${style}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default SmallSpinner;
