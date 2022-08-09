import React, { FC, ReactNode } from "react";
import cn from "classnames";

interface ModalProps {
  setVisible: (visible: boolean) => void;
  children: ReactNode;
  visible: boolean;
}

const Modal: FC<ModalProps> = ({ setVisible, children, visible }) => {
  const onModalClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  };

  return (
    <div
      className={cn(
        "absolute top-0 right-0 flex justify-center items-center mx-auto w-screen h-screen bg-slate-100 overflow-hidden",
        { hidden: !visible }
      )}
      style={{ background: "rgba(0, 0, 0, 0.5)" }}
      onClick={() => setVisible(false)}
    >
      <div
        onClick={onModalClick}
        className="bg-white p-5 rounded shadow min-w-[600px] min-h-[500px]"
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
