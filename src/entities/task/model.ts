export interface ITask {
  userId: number | null;
  id: string;
  title: string;
  completed: boolean;
  description: string;
  columnId: string;
  boardId: number | null;
  created: number;
  updated: number;
}

export interface IColumn {
  id: string;
  title: string;
  description: string;
}

export interface IBoard {
  id: string;
  title: string;
  description: string;
}
