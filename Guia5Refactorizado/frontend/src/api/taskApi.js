(function (global) {
  const API_URL = "http://localhost:3000/api/tasks";

  async function request(url = API_URL, options = {}) {
    const response = await fetch(url, {
      ...options,
      headers: { "Content-Type": "application/json", ...(options.headers || {}) }
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "No se pudo completar la operación.");
    return data;
  }

  global.taskApi = {
    listTasks() {
      return request();
    },
    createTask(task) {
      return request(API_URL, {
        method: "POST",
        body: JSON.stringify(task)
      });
    },
    updateTaskStatus(id, status) {
      return request(`${API_URL}/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status })
      });
    }
  };
})(window);
