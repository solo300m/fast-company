import React from "react";
export const Qualitie = ({ color, name }) => {
  return <span className={"badge m-1 bg-" + color}>{name}</span>;
};


