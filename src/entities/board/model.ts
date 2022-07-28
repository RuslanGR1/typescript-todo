import type { Moment } from 'moment'

export interface IBoard {
  title: string;
  id: string;
  created: Moment;
  updated: Moment;
}
