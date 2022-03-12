import React, { useEffect, useState } from "react";
import TaskList from "./components/TaskList";

export interface ITODOList {
  text: string;
  mask: boolean;
}

function App() {
  const [value, setValue] = useState<string>("");
  const [taskList, setTaskList] = useState<ITODOList[]>([]);

  useEffect(() => {
    const localTaskList = localStorage.getItem('taskList')
    if (localTaskList) {
      setTaskList(JSON.parse(localTaskList))
    }

    const localValue = localStorage.getItem('value')
    if (localValue) {
      setValue(JSON.parse(localValue))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('taskList', JSON.stringify(taskList))
    localStorage.setItem('value', JSON.stringify(value))
  }, [taskList, value])

  const onClickAddTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTask: ITODOList = {
      text: value,
      mask: false,
    };

    setTaskList([...taskList, newTask]);
    setValue("");
  };

  const onDeleteTask = (index: number) => {
    const newTask = [...taskList];
    newTask.splice(index, 1);
    setTaskList(newTask);
  }

  const onDoneTask = (index: number) => {
    const newTask = [...taskList];
    newTask[index].mask = !newTask[index].mask
    setTaskList(newTask)
  }

  return (
    <div>
      <div className="shadow-xl m-5 p-5 rounded-lg backdrop-blur-sm bg-white/30">
        <div className="text-2xl text-center font-bold mb-3">Miwtoo Todo List</div>
        <form onSubmit={onClickAddTask} className="flex">
          <input
            className="w-full border border-gray-200 rounded p-2"
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button type="submit" className="border border-gray-800 rounded px-2 mx-2">Add</button>
        </form>
        <TaskList taskList={taskList} onDoneTask={onDoneTask} onDeleteTask={onDeleteTask}></TaskList>
     </div>
    </div>
  );
}

export default App;
