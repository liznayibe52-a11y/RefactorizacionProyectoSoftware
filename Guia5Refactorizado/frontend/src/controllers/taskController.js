(function (global) {
  const form = document.querySelector("#task-form");
  const titleInput = document.querySelector("#title");
  const descriptionInput = document.querySelector("#description");
  const taskList = document.querySelector("#task-list");

  async function loadTasks() {
    try {
      const tasks = await global.taskApi.listTasks();
      global.taskView.renderTasks(tasks);
      global.taskView.showApiConnected();
    } catch (error) {
      global.taskView.showApiUnavailable(error.message);
    }
  }

  function initializeTaskController() {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      global.taskView.clearMessage();
      try {
        await global.taskApi.createTask({
          title: titleInput.value,
          description: descriptionInput.value
        });
        form.reset();
        global.taskView.showMessage("Tarea creada correctamente.", true);
        await loadTasks();
      } catch (error) {
        global.taskView.showMessage(error.message);
      }
    });

    document.querySelector("#refresh").addEventListener("click", loadTasks);

    taskList.addEventListener("click", async (event) => {
      const button = event.target.closest("[data-save-id]");
      if (!button) return;
      const id = button.dataset.saveId;
      const select = taskList.querySelector(`[data-task-id="${id}"]`);
      try {
        await global.taskApi.updateTaskStatus(id, select.value);
        await loadTasks();
      } catch (error) {
        global.taskView.showMessage(error.message);
      }
    });

    loadTasks();
  }

  global.initializeTaskController = initializeTaskController;
})(window);
