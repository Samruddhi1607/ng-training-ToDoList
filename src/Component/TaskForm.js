// src/TaskForm.js
import React, { useState, useEffect } from "react";

function TaskForm({ addTask, updateTask, editingTask, setShowForm }) {
  const [task, setTask] = useState({
    assignedTo: "",
    status: "pending",
    dueDate: "",
    priority: "normal",
    comments: ""
  });

  useEffect(() => {
    if (editingTask) {
      setTask(editingTask);
    }
  }, [editingTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingTask) {
      updateTask(task);
    } else {
      addTask(task);
    }
    setShowForm(false);
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h2>{editingTask ? "Edit Task" : "New Task"}</h2>
      <input
        type="text"
        name="assignedTo"
        placeholder="Assigned To"
        value={task.assignedTo}
        onChange={handleChange}
        required
      />
      <select name="status" value={task.status} onChange={handleChange}>
        <option value="pending">Pending</option>
        <option value="in progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <input
        type="date"
        name="dueDate"
        value={task.dueDate}
        onChange={handleChange}
      />
      <select name="priority" value={task.priority} onChange={handleChange}>
        <option value="low">Low</option>
        <option value="normal">Normal</option>
        <option value="high">High</option>
      </select>
      <textarea
        name="comments"
        placeholder="Comments"
        value={task.comments}
        onChange={handleChange}
      />
      <button type="submit">{editingTask ? "Update Task" : "Add Task"}</button>
      <button onClick={() => setShowForm(false)} type="button">
        Cancel
      </button>
    </form>
  );
}

export default TaskForm;
