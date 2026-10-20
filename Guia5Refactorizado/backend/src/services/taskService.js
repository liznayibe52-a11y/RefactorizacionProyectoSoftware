const VALID_STATUSES = ["pendiente", "en progreso", "finalizada"];

class TaskValidationError extends Error {}
class TaskNotFoundError extends Error {}

class TaskService {
  constructor(repository) {
    this.repository = repository;
  }

  listTasks() {
    return this.repository.findAll();
  }

  createTask({ title, description = "" }) {
    if (typeof title !== "string" || title.trim().length < 3) {
      throw new TaskValidationError("El título debe tener al menos 3 caracteres.");
    }
    return this.repository.create({ title: title.trim(), description: String(description).trim(), status: "pendiente" });
  }

  changeStatus(id, status) {
    if (!VALID_STATUSES.includes(status)) {
      throw new TaskValidationError(`Estado inválido. Use: ${VALID_STATUSES.join(", ")}.`);
    }
    const updated = this.repository.updateStatus(id, status);
    if (!updated) {
      throw new TaskNotFoundError("No existe una tarea con ese identificador.");
    }
    return updated;
  }
}

module.exports = { TaskService, TaskValidationError, TaskNotFoundError };
