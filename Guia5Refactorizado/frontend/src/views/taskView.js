(function (global) {
  const taskList = document.querySelector("#task-list");
  const message = document.querySelector("#message");
  const apiStatus = document.querySelector("#api-status");

  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[char]));

  function renderTasks(tasks) {
    if (!tasks.length) {
      taskList.innerHTML = "<p>No hay tareas todavía. Crea la primera.</p>";
      return;
    }
    taskList.innerHTML = tasks.map(task => `
      <article class="task">
        <div class="task-top">
          <div>
            <h3>${escapeHtml(task.title)}</h3>
            <p>${escapeHtml(task.description || "Sin descripción")}</p>
          </div>
          <strong>#${task.id}</strong>
        </div>
        <div class="task-actions">
          <label for="status-${task.id}">Estado</label>
          <select id="status-${task.id}" data-task-id="${task.id}">
            ${["pendiente", "en progreso", "finalizada"].map(status =>
              `<option ${task.status === status ? "selected" : ""}>${status}</option>`).join("")}
          </select>
          <button type="button" class="secondary" data-save-id="${task.id}">Guardar estado</button>
        </div>
      </article>
    `).join("");
  }

  function showApiUnavailable(messageText) {
    apiStatus.textContent = "API no disponible";
    apiStatus.style.background = "#fde8e8";
    apiStatus.style.color = "#9b2222";
    taskList.innerHTML = `<p>${escapeHtml(messageText)}. Verifica que el backend esté iniciado.</p>`;
  }

  global.taskView = {
    renderTasks,
    showApiConnected() {
      apiStatus.textContent = "API conectada";
    },
    showApiUnavailable,
    clearMessage() {
      message.textContent = "";
    },
    showMessage(messageText, success = false) {
      message.style.color = success ? "#17663a" : "#a12b2b";
      message.textContent = messageText;
    }
  };
})(window);
