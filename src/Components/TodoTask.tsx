import { ChangeEvent, useState, KeyboardEvent } from "react";
import { ITask } from "../Interfaces";

interface Props {
  task: ITask;
  deleteTask(taskToDelete: number): void;
  changeTaskCompleted(taskToChange: number): void;
  changeTaskAssigned(taskToChange: number): void;
  changeTaskName(taskToChange: number, newTaskName: string): void;
  changeTaskDetails(taskToChange: number, newTaskDetails: string): void;
  changeTaskDuration(taskToChange: number, newTaskDuration: number): void;
  changeTaskPriority(taskToChange: number, newTaskPriority: 0 | 1 | -1): void;
}

// id: number;
// name: string;
// details: string;
// completed: boolean;
// duration: number;
// priority: 0 | 1 | -1;
// assigned: boolean

const TodoTask = ({ task, deleteTask, changeTaskCompleted, changeTaskAssigned, changeTaskName, changeTaskDetails, changeTaskDuration, changeTaskPriority }: Props) => {

  const [toggleName, setToggleName] = useState<boolean>(true);
  const [toggleDetails, setToggleDetails] = useState<boolean>(true);

  const [name, setName] = useState<string>(task.name);
  const [details, setDetails] = useState<string>(task.details);

  return (
    <div className="task">
      <div className="content">
        <span onDoubleClick={() => {
            setToggleName(false)
          }} >{toggleName ? task.name : 
        <input
          type="text"
          value={name}
          onChange={(event: ChangeEvent<HTMLInputElement>): void => {
            setName(event.target.value);
          }}
          onKeyDown={(event: KeyboardEvent<HTMLInputElement>): void => {
            if (event.key === 'Enter') {
              setToggleName(true);
              changeTaskName(task.id, name);
              event.preventDefault();
              event.stopPropagation();
            }
          }}
        />} </span>
        <span onDoubleClick={() => {
            setToggleDetails(false)
          }} >{toggleDetails ? task.details : 
        <input
          type="text"
          value={details}
          onChange={(event: ChangeEvent<HTMLInputElement>): void => {
            setDetails(event.target.value);
          }}
          onKeyDown={(event: KeyboardEvent<HTMLInputElement>): void => {
            if (event.key === 'Enter') {
              setToggleDetails(true);
              changeTaskDetails(task.id, details);
              event.preventDefault();
              event.stopPropagation();
            }
          }}
        />} </span>
        <span>duration: {task.duration}</span>
        <span>priority: {task.priority}</span>
        <span>assigned: {task.assigned ? "yes" : "no"}</span>
        <input 
          type="checkbox"
          defaultChecked={task.completed}
          onClick={() => {
            changeTaskCompleted(task.id);
          }}
        />
      </div>
      <button
        onClick={() => {
          deleteTask(task.id);
        }}
      >
        X
      </button>
    </div>
  );
};

export default TodoTask;
