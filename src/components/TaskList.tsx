import { ITODOList } from "../App";

interface TaskListProps {
    taskList: ITODOList[]
    onDoneTask: Function
    onDeleteTask: Function
}

export default function TaskList(props: TaskListProps) {
  return (
    <ul>
      {props.taskList.map((t, i) => {
        return (
          <>
            <li
              key={i}
              className="flex justify-between my-2 border border-slate-100 rounded p-2"
            >
              <span className={`text-2xl ${t.mask ? "line-through" : ""}`}>
                {t.text}
              </span>
              <div>
                <button
                  className="border border-green-300 text-green-500 rounded mx-1 px-2 py-1"
                  onClick={() => props.onDoneTask(i)}
                >
                  ✓
                </button>
                <button
                  className="border border-red-300 text-red-500 rounded mx-1 px-2 py-1"
                  onClick={() =>  props.onDeleteTask(i)}
                >
                  x
                </button>
              </div>
            </li>
          </>
        );
      })}
    </ul>
  );
}
