/* eslint-disable react/prop-types */
import React from "react";

// eslint-disable-next-line react/prop-types
const Show = ({ children }) => {
  let when = null;
  let otherwise = null;

  React.Children.forEach(children, (child) => {
    if (child.props.isTrue) {
      when = child;
    } else if (!when) {
      otherwise = child;
    }
  });

  return when || otherwise || null;
};

// eslint-disable-next-line react/display-name
Show.When = ({ isTrue, children }) => (isTrue ? children : null);
Show.Else = ({ children }) => children;

export default Show;
