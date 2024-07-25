import React, { ReactNode } from "react";
import "./style/Button.scss";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  type: "submit" | "reset" | "button";
  logout?: () => void;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  logout,
  type,
  onClick,
  className,
}) => {
  let btnClass = "";
  if (className === "submit-button" || className === "register-link") {
    btnClass = `btn`;
  } else {
    btnClass = ``;
  }

  return (
    <div className={btnClass}>
      <button type={type} onClick={logout || onClick} className={className}>
        {children}
      </button>
    </div>
  );
};
