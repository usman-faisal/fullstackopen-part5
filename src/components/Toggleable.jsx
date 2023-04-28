import React, { useState, forwardRef, useImperativeHandle } from "react";
const Toggleable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);
  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  const hideWhenVisible = { display: visible ? "none" : "block" };
  const showWhenVisible = { display: visible ? "block" : "none" };
  return (
    <div>
      <button style={hideWhenVisible} onClick={toggleVisibility}>
        {props.buttonLabel}
      </button>
      <div style={showWhenVisible}>
        {props.children}
        <button style={showWhenVisible} onClick={toggleVisibility}>
          Cancel
        </button>
      </div>
    </div>
  );
});

Toggleable.displayName = "Toggleable";

export default Toggleable;
