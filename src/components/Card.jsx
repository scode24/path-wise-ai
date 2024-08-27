import React from "react";

const Card = (props) => {
  const { header, body, isFullHeight } = props.config;
  return (
    <div
      className="flex flex-col rounded-md border shadow-sm m-3 mx-2"
      style={{ height: isFullHeight ? "90%" : "fit-content" }}
    >
      <div className="p-3 border-b">{header}</div>
      <div className="p-3 overflow-y-auto">{body}</div>
    </div>
  );
};

export default Card;
