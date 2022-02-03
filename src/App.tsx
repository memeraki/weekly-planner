import React, { FC, ChangeEvent, useState } from 'react';
import './App.css';
import TodoTask from './Components/TodoTask';
import { ITask } from './Interfaces';

const App: FC = () => {

  const [task, setTask] = useState<string>("");
  const [details, setDetails] = useState<string>("");
  const [duration, setDuration] = useState<number>(1);
  const [priority, setPriority] = useState<0 | 1 | -1>(0);
  const [todoList, setTodoList] = useState<ITask[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if(event.target.name === "task")
      setTask(event.target.value);
    if(event.target.name === "details")
      setDetails(event.target.value);
    if(event.target.name === "duration") {
      let value = Number(event.target.value);
      if(value < 1) value = 1;
      if(value > 8) value = 8;
      setDuration(value);
    }
  };

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    switch (event.target.value) {
      case 'high':
        setPriority(1);
        break;
      case 'low':
        setPriority(-1);
        break;
      default:
        setPriority(0);
    }
  };

  // id: number;
  // name: string;
  // details: string;
  // completed: boolean;
  // duration: number;
  // priority: 0 | 1 | -1;
  // assigned: boolean

  const addTask = (): void => {
    if(task !== "") {
      setTodoList([...todoList, { id: Date.now(), name: task, details, completed: false, duration, priority, assigned: false }]);
      setTask('')
      setDetails('');
      setDuration(1);
      setPriority(0);
    }
  };

  const deletTask = (taskToDelete: number): void => {
    setTodoList(todoList.filter((task) => {
      return task.id !== taskToDelete;
    }))
  };

  const changeTaskCompleted = (taskToChange: number): void => {
    for (const task of todoList) {
      if (task.id === taskToChange) {
        task.completed = !task.completed;
        break;
      };
    };
  };

  const changeTaskAssigned = (taskToChange: number): void => {
    for (const task of todoList) {
      if (task.id === taskToChange) {
        task.assigned = !task.assigned;
        break;
      };
    };
  };

  const changeTaskPriority = (taskToChange: number, newTaskPriority: 0 | 1 | -1): void => {
    for (const task of todoList) {
      if(task.id === taskToChange) {
        task.priority = newTaskPriority;
        break;
      }
    }
  };

  const changeTaskDuration = (taskToChange: number, newTaskDuration: number): void => {
    for (const task of todoList) {
      if(task.id === taskToChange) {
        task.duration = newTaskDuration;
        break;
      }
    }
  };

  const changeTaskName = (taskToChange: number, newTaskName: string): void => {
    for (const task of todoList) {
      if(task.id === taskToChange) {
        task.name = newTaskName;
        break;
      }
    }
  };

  const changeTaskDetails = (taskToChange: number, newTaskDetails: string): void => {
    for (const task of todoList) {
      if(task.id === taskToChange) {
        task.details = newTaskDetails;
        break;
      }
    }
  };

  return (
    <div className='App'>
      <form className='header'>
        <input 
          type='text'
          placeholder='Task to do...'
          name='task'
          value={task}
          onChange={handleChange}
          required />
        <input
          type="text"
          placeholder='details...'
          name='details'
          value={details}
          onChange={handleChange}/>
        <input
          type="number"
          placeholder='duration in hours...'
          name='duration'
          value={duration}
          min="1"
          max="8"
          onChange={handleChange}/>
        <select name='priority' onChange={handleSelect} value={priority === 0 ? "normal" : priority === 1 ? "high" : "low"}>
          <option value='low'>
            low
          </option>
          <option value='normal' selected>
            normal
          </option>
          <option value='high'>
            high
          </option>
        </select>
        <button onClick={addTask}>Add task</button>
      </form>                 
      <div className="todoList">
        {todoList.map((task: ITask, key: number) => {
          return <TodoTask 
                    key={key} 
                    task={task} 
                    deleteTask={deletTask} 
                    changeTaskCompleted={changeTaskCompleted}
                    changeTaskAssigned={changeTaskAssigned}
                    changeTaskName={changeTaskName}
                    changeTaskDetails={changeTaskDetails}
                    changeTaskDuration={changeTaskDuration}
                    changeTaskPriority={changeTaskPriority}
                    />
        })}
      </div>
    </div>
  );
}

export default App;
