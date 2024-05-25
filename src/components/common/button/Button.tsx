import * as React from "react";

import "./Button.scss";

interface ButtonProps {
  text: string
  onClick: () => void
  type?: "button" | "submit" | "reset"
  variant?: "primary" | "secondary" | "transparent"
  disabled?: boolean
}

export default function Button({text, onClick, type = "button", variant = "transparent", disabled}: ButtonProps) {
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={disabled ? `${variant} disabled` : variant}>{text}</button>
  );
}
