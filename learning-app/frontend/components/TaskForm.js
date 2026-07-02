"use client";

import { useState } from "react";

const initialForm = {
  title: "",
  category: "Technical",
};

export default function TaskForm({ onSubmit }) {
  const [formValues, setFormValues] = useState(initialForm);

  async function handleSubmit(event) {
    event.preventDefault();
    await onSubmit(formValues);
    setFormValues(initialForm);
  }

  return (
    <section className="info-card">
      <h2>Add a task</h2>
      <p>
        This form sends a POST request to the Python backend. The backend then
        saves the new task in PostgreSQL.
      </p>

      <form className="simple-form" onSubmit={handleSubmit}>
        <label>
          Task title
          <input
            required
            type="text"
            value={formValues.title}
            onChange={(event) =>
              setFormValues((current) => ({
                ...current,
                title: event.target.value,
              }))
            }
            placeholder="Example: Practice SQL joins"
          />
        </label>

        <label>
          Category
          <select
            value={formValues.category}
            onChange={(event) =>
              setFormValues((current) => ({
                ...current,
                category: event.target.value,
              }))
            }
          >
            <option value="Technical">Technical</option>
            <option value="Behavioral">Behavioral</option>
            <option value="System Design">System Design</option>
          </select>
        </label>

        <button className="primary-button" type="submit">
          Add task
        </button>
      </form>
    </section>
  );
}

