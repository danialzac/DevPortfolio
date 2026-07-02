export default function TaskList({ tasks, onComplete }) {
  return (
    <section className="info-card">
      <h2>Task list</h2>
      <p>
        Each task below came from the backend API. Clicking complete sends a
        small update request for just one task.
      </p>

      <div className="task-list">
        {tasks.length === 0 ? <p>No tasks yet.</p> : null}

        {tasks.map((task) => (
          <article className="task-card" key={task.id}>
            <div>
              <h3>{task.title}</h3>
              <p>Category: {task.category}</p>
              <p>Status: {task.completed ? "Completed" : "Open"}</p>
            </div>

            <button
              className="secondary-button"
              disabled={task.completed}
              onClick={() => onComplete(task.id)}
            >
              {task.completed ? "Already done" : "Mark completed"}
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

