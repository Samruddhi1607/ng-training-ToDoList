
import React, { useState } from "react";
import './Table.css'

function Table({ tasks, handleEdit, deleteTask }) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const confirmDelete = (task) => {
    setTaskToDelete(task);
    setShowDeleteDialog(true);
  };

  const handleDelete = (confirm) => {
    if (confirm) {
      deleteTask(taskToDelete.id);
    }
    setShowDeleteDialog(false);
    setTaskToDelete(null);
  };

  return (
    <div className="task-table">
      <table className="tables">
        <caption>
          
              <div className="right">
                <h3>Tasks</h3>
                <h4>All Tasks</h4>
              </div>
          
          </caption>
        <thead >
          <tr>
            <th>Assigned To</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Comments</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length === 0 ? (
            <tr>
              <td colSpan="6">No tasks available</td>
            </tr>
          ) : (
            tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.assignedTo}</td>
                <td>{task.status}</td>
                <td>{task.dueDate}</td>
                <td>{task.priority}</td>
                <td>{task.comments}</td>
                <td>
                  <button className="btn" onClick={() => handleEdit(task)}>Edit</button>
                  <button className="btn" onClick={() => confirmDelete(task)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && (
        <div className="delete-dialog">
          <p>Do you want to delete the task "{taskToDelete.assignedTo}"?</p>
          <button className="btn1" onClick={() => handleDelete(true)}>Yes</button>
          <button className="btn1" onClick={() => handleDelete(false)}>No</button>
        </div>
      )}
    </div>
  );
}

export default Table;
