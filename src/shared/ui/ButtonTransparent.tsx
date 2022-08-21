import React, { FC } from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

const ButtonTransparent: FC<Props> = ({ children, onClick, ...props }) => (
  <div {...props} onClick={onClick}>
    {children}
  </div>
);

export default ButtonTransparent;
