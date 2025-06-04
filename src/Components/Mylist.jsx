// Import necessary dependencies from React
import React, { useState } from 'react';

// Import CSS styling
import "../styles/list.css";

const Mylist = () => {
  // useState hook to store the current task
  const [task, setTask] = useState("");

  // useState hook to store the selected task duration
  const [duration, setDuration] = useState("");

  // useState hook to store the list of all tasks entered by the user
  const [tasks, setTasks] = useState([]);

  // useState hook to keep track of which task is currently being edited
  const [editIndex, setEditIndex] = useState(null);

  // useState hook to filter tasks by duration
  const [filter, setFilter] = useState("All");

  // Function to add or update a task
  const handleAddTask = () => {
    // Show alert if task or duration is not provided
    if (!task || !duration) return alert("Please enter task and select duration");

    // Create a new task object with name and duration
    const newTask = { name: task, duration };

    if (editIndex !== null) {
      // If editing, update the existing task at the editIndex
      const updatedTasks = [...tasks]; // Create a copy of the tasks array
      updatedTasks[editIndex] = newTask; // Update the specific task
      setTasks(updatedTasks); // Update the state with the new array
      setEditIndex(null); // Clear the edit index
      alert("Task updated successfully!"); // Show success message
    } else {
      // If not editing, add the new task to the list
      setTasks([...tasks, newTask]);
      alert("Task added successfully!"); // Show success message
    }

    // Clear input fields after adding or updating
    setTask("");
    setDuration("");
  };

  // Function to populate task and duration fields for editing
  const handleEdit = (index) => {
    setTask(tasks[index].name); // Set task input value
    setDuration(tasks[index].duration); // Set dropdown value
    setEditIndex(index); // Track which task is being edited
  };

  // Function to delete a task with confirmation and success message
  const handleDelete = (index) => {
    const confirmed = window.confirm("Are you sure you want to delete this task?");
    if (confirmed) {
      const updated = tasks.filter((_, i) => i !== index); // Remove the task by index
      setTasks(updated); // Update the state with remaining tasks
      setEditIndex(null); // Clear edit state in case the deleted task was being edited
      alert("Task deleted successfully!"); // Show success message
    }
  };

  // Filter tasks based on selected duration; show all if "All" is selected
  const filteredTasks = filter === "All" ? tasks : tasks.filter(task => task.duration === filter);

  // Render the component's UI
  return (
    <div className='bod'>
      {/* Hero Section */}
      <div className='hero-section'>
        <h1>
          <font color="#F9FADO">Make a </font>
          <font color="#CECECE">better</font>
          <font color="blanchedalmond"> plan <br />for your life</font>
        </h1>

        <div className='all'>
          {/* Paragraph section under the hero title */}
          <div className="par">
            <font color="#CECECE">
              Whoever you are , Whatever you are looking for, we <br />
              have the perfect place for you
            </font>
          </div>

          {/* Dropdown for selecting duration */}
          <div className="duration">
            <select value={duration} onChange={(e) => setDuration(e.target.value)} required>
              <option value="" disabled hidden>Duration ▼</option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
              <option value="Yearly">Yearly</option>
            </select>
          </div>

          {/* Text input for entering the task name */}
          <div className="task">
            <input
              type="text"
              placeholder='Task'
              id='input-task'
              value={task}
              onChange={(e) => setTask(e.target.value)}
              required
            />
          </div>

          {/* Button for adding or updating the task */}
          <div className="butt">
            <button onClick={handleAddTask} id='but'>
              {editIndex !== null ? "Update" : "Add Task"}
            </button>
          </div>
        </div>
      </div>

      <br />

      {/* Filter Buttons for All, Daily, Weekly, Monthly, Yearly */}
      <div className="dur">
        {["All", "Daily", "Weekly", "Monthly", "Yearly"].map(type => (
          <div key={type} className="filter-btn" onClick={() => setFilter(type)}>
            <p>{type}</p>
          </div>
        ))}
      </div>

      {/* Table displaying the filtered tasks */}
      <div style={{ padding: "20px", color: "#cecece" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            {/* Show message if no tasks are present */}
            {filteredTasks.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: "center", padding: "10px" }}>
                  No tasks yet.
                </td>
              </tr>
            ) : (
              // Loop through filtered tasks and render each row
              filteredTasks.map((item, index) => (
                <tr key={index}>
                  <td colSpan="4">
                    <div className="task-row">
                      <span>{index + 1}. </span> {/* Task number */}
                      <span>{item.name}</span> {/* Task name */}
                      <span>{item.duration}</span> {/* Task duration */}

                      {/* Edit and Delete action icons */}
                      <span className="action-icons">
                        <span onClick={() => handleEdit(index)}>✏️</span>
                        <span onClick={() => handleDelete(index)}>
                          <font color="black"> 🗑️</font>
                        </span>
                      </span>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Export the component for use in other files
export default Mylist;
