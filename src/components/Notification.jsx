import React from "react";

const Notification = ({ message }) => {
  if (!message.text) return null;
  return (
    <div className={message.type === "error" ? "error" : "success"}>
      <p>{message.text}</p>
    </div>
  );
};

export default Notification;
