// src/App.js
import React, { useState , useEffect } from "react";

import Table from "./Component/Table";
import TaskForm from "./Component/TaskForm";
import './App.css';

function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      assignedTo: "User 1",
      status: "Completed",
      dueDate: "2023-10-12",
      priority: "low",
      comments: "This Task Was Good",
    },
    {
      id: 2,
      assignedTo: "User 2",
      status: "In Progress",
      dueDate: "2024-12-04",
      priority: "High",
      comments: "This Task Was Good",
    },
    {
      id: 3,
      assignedTo: "User 3",
      status: "Started",
      dueDate: "2024-08-18",
      priority: "low",
      comments: "This Task Was Good",
    },
    {
      id: 4,
      assignedTo: "User 4",
      status: "In Progress",
      dueDate: "2023-09-12",
      priority: "Normal",
      comments: "This Task Was Good",
    },
    
  ]);

  const [editingTask, setEditingTask] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;

  // Pagination logic
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (direction) => {
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (direction === "next" && currentPage < Math.ceil(tasks.length / tasksPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const addTask = (task) => {
    setTasks([...tasks, { id: Date.now(), ...task }]);
  };

  const updateTask = (updatedTask) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    if (!searchQuery) {
      setCurrentPage(1);
    }
  }, [searchQuery]);

  return (
    <div className="App">
      <header className="header">
        <button
          onClick={() => {
            setShowForm(true);
            setEditingTask(null);
          }}
          className="new-task-btn"
        >
          + New Task
        </button>
        <button onClick={() => window.location.reload()} className="refresh-btn">
          Refresh
        </button>
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={handleSearch}
          className="search-bar"
        />
      </header>

      {showForm && <TaskForm addTask={addTask} updateTask={updateTask} editingTask={editingTask} setShowForm={setShowForm} />}

      <Table
        tasks={currentTasks.filter((task) =>
          task.assignedTo.toLowerCase().includes(searchQuery.toLowerCase())
        )}
        handleEdit={handleEdit}
        deleteTask={deleteTask}
      />

      {/* Pagination */}
      <div className="pagination">
        <button onClick={() => paginate("prev")} disabled={currentPage === 1}>
          Prev
        </button>
        <button onClick={() => paginate("next")} disabled={currentPage === Math.ceil(tasks.length / tasksPerPage)}>
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
