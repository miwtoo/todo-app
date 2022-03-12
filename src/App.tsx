import React, { useState } from "react";

interface ITODOList {
  text: string;
  mask: boolean;
}

function App() {
  const [value, setValue] = useState<string>("");
  const [taskList, setTaskList] = useState<ITODOList[]>([]);

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
      <form onSubmit={onClickAddTask}>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      {taskList.length > 0 && (
        <ul>
          {taskList.map((t, i) => {
            return <>
              <li key={i}>
                <span>{t.text}</span>
                <button onClick={() => onDoneTask(i)}>/</button>
                <button onClick={() => onDeleteTask(i)}>x</button>
              </li>
            </>
          })}
        </ul>
      )}
    </div>
  );
}

export default App;
