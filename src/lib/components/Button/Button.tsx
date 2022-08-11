import React, { PropsWithChildren } from "react";

interface Props {
  isActive: boolean;
  className: string;
  onClick: () => void;
}

const Button = ({
  onClick,
  className,
  isActive,
  children
}: PropsWithChildren<Props>) => {
  function handleMouseDown(event: React.MouseEvent) {
    event.preventDefault(); // Prevent editor losing focus
    onClick();
  }

  return (
    <button
      className={className}
      style={{
        backgroundColor: isActive ? "#efeeef" : "#fff",
        color: isActive ? "blue" : "black"
      }}
      onMouseDown={handleMouseDown}
    >
      {children}
    </button>
  );
};

export default Button;
