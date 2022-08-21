import { useEffect, useRef, useState } from "react";

import ButtonTransparent from "shared/ui/ButtonTransparent";
import { useGetAllBoardsQuery, useAddBoardMutation } from "store/api";
import { BoardList } from "shared/ui/Board";
import Modal from "shared/ui/Modal";
import { Button } from "shared/ui/Button";
import Spinner from "shared/ui/Spinner";

const HomePage = () => {
  const { data: boards } = useGetAllBoardsQuery("");
  const [visible, setVisible] = useState<boolean>(false);
  const [boardTitle, setBoardTitle] = useState("");
  const [addNewBoard] = useAddBoardMutation();
  const [description, setDescription] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef && visible) {
      inputRef &&
        inputRef.current &&
        inputRef?.current.focus &&
        inputRef?.current.focus();
    }
  }, [visible]);

  const addBoard = () => {
    const _board: any = {
      title: boardTitle,
    };
    addNewBoard(_board);
    setBoardTitle("");
  };

  const content = !boards ? (
    <div className="flex m-5 space-x-4 items-center">
      <Spinner /> <p>Loading...</p>
    </div>
  ) : (
    <div className="px-2">
      <h2 className="my-2 text-2xl flex space-x-2">
        Все доски
        <ButtonTransparent
          onClick={(e) => setVisible(true)}
          className={"cursor-pointer mx-2"}
        >
          +
        </ButtonTransparent>
      </h2>
      <BoardList boards={boards} />

      <Modal visible={visible} setVisible={setVisible}>
        <div className="flex flex-col">
          <p className="text-2xl mb-4">Добавить новую доску</p>
          <input
            type="text"
            value={boardTitle}
            onChange={(e) => setBoardTitle(e.target.value)}
            className="outline-0 mb-2"
            placeholder="Название доски"
            ref={inputRef}
          />
          <textarea
            className="border-none p-2 min-h-[150px] min-w-[300px] outline-none bg-gray-100"
            value={description}
            name="description"
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="mt-5 flex">
            <Button title="Добавить доску" onClick={(e) => addBoard()} />
          </div>
        </div>
      </Modal>
    </div>
  );
  return content;
};

export default HomePage;
