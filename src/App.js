import "./App.css";
import { useState } from "react";
const visrtualTasks = [
  { id: 1, content: "do homework", isDone: false },
  { id: 2, content: "cooking the lunch", isDone: false },
  { id: 3, content: "reading a book", isDone: false },
];
export default function App() {
  const [tasks, setTasks] = useState(visrtualTasks);
  function handleAddTasks(task) {
    setTasks((tasks) => [...tasks, task]);
  }
  function handleDeleteTask(taskId) {
    setTasks((Tasks) => Tasks.filter((task) => task.id !== taskId));
  }
  function handleIsDone(taskId) {
    setTasks((tasks) =>
      tasks.map((task) =>
        task.id === taskId ? { ...task, isDone: !task.isDone } : task
      )
    );
  }
  return (
    <div className="App">
      <div className="title">
        <h1>My daily tasks</h1>
        <img src="images/note.png" alt="note" />
      </div>
      <InputArea onAddTask={handleAddTasks} />
      <TasksList
        tasks={tasks}
        onDeleteTask={handleDeleteTask}
        onToggleTask={handleIsDone}
      />
    </div>
  );
}

function InputArea({ onAddTask }) {
  const [taskinput, setTask] = useState("");
  function handleSubmit(e) {
    e.preventDefault();

    if (!taskinput) {
      alert("Please add a valid text");
    } else {
      const id = crypto.randomUUID();
      const task = {
        id,
        content: taskinput,
      };
      onAddTask(task);
      setTask("");
      return task;
    }
  }

  return (
    <form className="input-area" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add your task"
        value={taskinput}
        onChange={(e) => setTask(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function TasksList({ tasks, onDeleteTask, onToggleTask }) {
  return (
    <ul>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onDeleteTask={onDeleteTask}
          onToggleTask={onToggleTask}
        />
      ))}
    </ul>
  );
}
function Task({ task, onDeleteTask, onToggleTask }) {
  return (
    <li className={task.isDone ? "check" : ""} id={task.id}>
      <input type="checkbox" onClick={() => onToggleTask(task.id)} />
      <p>{task.content} </p>
      <span onClick={() => onDeleteTask(task.id)}>❌</span>
    </li>
  );
}
