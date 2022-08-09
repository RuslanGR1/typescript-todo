import React, { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
};

const ButtonTransparent: FC<Props> = ({ children, onClick }) => (
  <div className="" onClick={onClick}>
    {children}
  </div>
);

export default ButtonTransparent;
