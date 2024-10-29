import React, { useEffect, useState } from 'react';
import './App.css';

// Define state variables
function App() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [timer, setTimer] = useState(25 * 60);
  const [timerActive, setTimerActive] = useState(false);
  const [quote, setQuote] = useState('');

// Loading and saving data (AI assisted)
useEffect(() => {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
      try {
          const parsedTasks = JSON.parse(storedTasks);
          if (Array.isArray(parsedTasks)) {
              setTasks(parsedTasks);
          }
      } catch (error) {
          console.error("Error parsing stored tasks:", error);
      }
  }
}, []);

// Load tasks stored in the browser's local storage, so the list of assignments persists even after refreshing the page
useEffect(() => {
  if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}, [tasks]);

// Use fetch to grab a random motivational quote from ZenQuotes API
  useEffect(() => {
    // AI assisted to solve CORS issue: The API call is wrapped in allorigins to handle CORS issues
    fetch("https://api.allorigins.win/get?url=" + encodeURIComponent("https://zenquotes.io/api/random"))
      .then(response => response.json())
      .then(data => {
        const parsedData = JSON.parse(data.contents);
        setQuote(parsedData[0].q);
      })
      .catch(error => console.error("Error fetching quote:", error));
  }, []);  
  
  // Task notification timer (24hr reminder)
  // Sets up a timer that checks if any tasks are due in next 24 hrs
  // When user makes any changes (like when the tasks array changes), the function is triggered
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      tasks.forEach(task => {
        if (task.due) {
          const dueDate = new Date(task.due.date);
          const timeDiff = dueDate - now;
          // AI-assisted: push the code to run every hour
          if (timeDiff > 0 && timeDiff <= 24 * 60 * 60 * 1000) {
            new Notification(`Reminder: Your assignment "${task.content}" is due in less than 24 hours!`);
          }
        }
      });
    }, 60 * 60 * 1000);

    return () => clearInterval(timer);
  }, [tasks]);

  // Focus timer countdown
  // Checks if the timer is active and counts down every second
  // When the timer reaches zero, it will trigger an alert and stops the focus mode
  useEffect(() => {
    let timerInterval;
    if (timerActive && timer > 0) {
      timerInterval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0 && timerActive) {
      alert('Time is up! Great job focusing!');
      setTimerActive(false);
    }

    return () => clearInterval(timerInterval);
  }, [timer, timerActive]);  

  // Add a task
  const addTask = () => {
    if (!taskName || !dueDate) {
      alert('Please enter both task name and due date.');
      return;
    }
    const newTask = {
      id: Date.now(),
      content: taskName,
      due: { date: dueDate },
    };
    setTasks([...tasks, newTask]);
    setTaskName('');
    setDueDate('');
  };    

  // Edit an existing task's due date
  const editDueDate = (taskId) => {
    const newDueDate = prompt('Enter new due date and time (yyyy-mm-dd HH:MM AM/PM):');
    if (newDueDate) {
      setTasks(
        tasks.map((task) =>
          task.id === taskId
            ? { ...task, due: { date: newDueDate } }
            : task
        )
      );
    }
  };  

  // Delete a task
  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  // Focus mode timer
  const startFocusMode = () => {
    setIsFocusMode(true);
    setTimerActive(true);
  };  
  
  const stopFocusMode = () => {
    setIsFocusMode(false);
    setTimerActive(false);
    setTimer(25 * 60);
  };

  // Component render
  return (
    <div>
      <p className="quote">{quote && `${quote}`}</p>
      
      <input
        type="text"
        placeholder="Task Name"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <input
        type="datetime-local"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button onClick={addTask}>Create Task</button>
      
      <h2>Upcoming Assignments</h2>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task.content} - Due: {task.due ? new Date(task.due.date).toLocaleString() : 'No due date'}
            <button onClick={() => deleteTask(task.id)}>Delete</button>
            <button onClick={() => editDueDate(task.id)}>Edit Due Date</button>
          </li>
        ))}
      </ul>
      
  {isFocusMode ? (
  <div className="big-clock">
    <p>
      {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')}
    </p>
    <button onClick={stopFocusMode}>Stop Focus Mode</button>
  </div>
) : (
  <button onClick={startFocusMode}>Start Focus Mode (25 min)</button>
)}
    </div>
  );  
}

export default App;
