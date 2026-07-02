const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}

export function fetchTasks() {
  return apiRequest("/tasks");
}

export function createTask(task) {
  return apiRequest("/tasks", {
    method: "POST",
    body: JSON.stringify(task),
  });
}

export function markTaskComplete(taskId) {
  return apiRequest(`/tasks/${taskId}/complete`, {
    method: "PATCH",
  });
}

export function fetchAnalytics() {
  return apiRequest("/analytics/summary");
}

