import React, { ReactNode } from "react";
import "./style/Button.scss";

interface ButtonProps {
  children: ReactNode;
  logout: () => void;
}

export const Button: React.FC<ButtonProps> = ({ children, logout }) => (
  <div className="btn-holder">
    <button onClick={logout} className="btn btn-3 hover-border-5">
      <span>{children}</span>
    </button>
  </div>
);
