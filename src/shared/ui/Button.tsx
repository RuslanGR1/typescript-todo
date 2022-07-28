import React, { FC } from "react"

interface ButtonProps {
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  title: string;
}

export const Button: FC<ButtonProps> = ({ onClick, title }) => (
  <button
    onClick={onClick}
    className="mt-2 cursor-pointer bg-gray-500 text-white py-2 px-3 rounded shadow hover:text-gray-500 hover:bg-white hover:border-gray-500 hover:shadow-lg trasition-all"
  >
    {title}
  </button>
)
