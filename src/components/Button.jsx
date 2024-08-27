import React from "react";

const Button = (props) => {
  const { icon, label, isTextBold, textColor, bgColor, isWidthFull } =
    props.config;

  return (
    <div
      className="flex flex-row rounded-lg justify-center p-2 px-3 cursor-pointer"
      style={{
        color: textColor ? textColor : "",
        backgroundColor: bgColor ? bgColor : "",
        width: isWidthFull ? "100%" : "fit-content",
      }}
      onClick={props.onClickFn}
    >
      <div className="flex flex-col justify-center mr-2">{icon}</div>
      <div
        className="flex flex-col justify-center"
        style={{
          fontWeight: isTextBold ? "bold" : "normal",
        }}
      >
        {label}
      </div>
    </div>
  );
};

export default Button;
