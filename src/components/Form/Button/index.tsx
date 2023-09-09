import React from "react";

type ButtonProps = {
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
};

const Button = ({
  onClick = () => {},
  className = "",
  disabled = false,
  children,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`bg-button text-text text-lg font-medium px-6 py-2 rounded-xl shadow disabled:bg-backgroundAccent disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
