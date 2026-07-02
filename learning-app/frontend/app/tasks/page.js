"use client";

import { useEffect, useState } from "react";
import TaskForm from "../../components/TaskForm";
import TaskList from "../../components/TaskList";
import { createTask, fetchTasks, markTaskComplete } from "../../lib/api";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [statusText, setStatusText] = useState("Loading tasks...");

  // This page is a client component because it uses browser state and calls the API after the page loads.
  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    try {
      const nextTasks = await fetchTasks();
      setTasks(nextTasks);
      setStatusText("Tasks loaded from the Python backend.");
    } catch (error) {
      setStatusText(`Could not load tasks: ${error.message}`);
    }
  }

  async function handleAddTask(formValues) {
    try {
      const createdTask = await createTask(formValues);
      setTasks((currentTasks) => [createdTask, ...currentTasks]);
      setStatusText("New task added to PostgreSQL.");
    } catch (error) {
      setStatusText(`Could not add task: ${error.message}`);
    }
  }

  async function handleCompleteTask(taskId) {
    try {
      const updatedTask = await markTaskComplete(taskId);
      setTasks((currentTasks) =>
        currentTasks.map((task) => (task.id === taskId ? updatedTask : task))
      );
      setStatusText("Task marked as completed.");
    } catch (error) {
      setStatusText(`Could not update task: ${error.message}`);
    }
  }

  return (
    <main className="page-shell">
      <section className="page-header">
        <p className="eyebrow">Frontend route: /tasks</p>
        <h1>Interview preparation tasks</h1>
        <p>
          This page shows the simplest loop in the app: read data, render it,
          submit a form, then refresh the UI from API responses.
        </p>
      </section>

      <p className="status-banner">{statusText}</p>

      <div className="two-column-layout">
        <TaskForm onSubmit={handleAddTask} />
        <TaskList tasks={tasks} onComplete={handleCompleteTask} />
      </div>
    </main>
  );
}

