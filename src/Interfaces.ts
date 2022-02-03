export interface ITask {
  id: number;
  name: string;
  details: string;
  completed: boolean;
  duration: number;
  priority: 0 | 1 | -1;
  assigned: boolean
}