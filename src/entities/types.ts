import type { Moment } from 'moment'

export interface ITask {
  userId?: number | null;
  id: string;
  title: string;
  completed: boolean;
  description: string;
  column: string;
  columnId: string;
  boardId: string;
  created: Moment;
  updated: Moment;
  orderNumber: number;
}

export interface IColumn {
  id: string;
  title: string;
  description: string;
  boardId: string;
}

export interface IBoard {
  title: string;
  id: string;
  created: Moment;
  updated: Moment;
}
