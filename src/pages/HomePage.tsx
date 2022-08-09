import moment from "moment";
import { v4 as uuid } from "uuid";
import { Fragment, useEffect, useRef, useState } from "react";

import { useGetAllBoardsQuery, useAddBoardMutation } from "store/api";
import { BoardItem, BoardList } from "shared/ui/Board";
import type { IBoard } from "entities";
import Modal from "shared/ui/Modal";
import { Button } from "shared/ui/Button";

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

  return (
    <div className="px-2">
      <h2 className="my-2 text-2xl">Все доски</h2>
      <BoardList boards={boards} />
      <Button onClick={(e) => setVisible(true)} title={"Add Board"} />
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
};

export default HomePage;
