const { TaskValidationError, TaskNotFoundError } = require("../services/taskService");

function createTaskController(service) {
  function handleError(error, res, next) {
    if (error instanceof TaskValidationError) {
      return res.status(400).json({ error: error.message });
    }
    if (error instanceof TaskNotFoundError) {
      return res.status(404).json({ error: error.message });
    }
    return next(error);
  }

  return {
    list(req, res, next) {
      try {
        res.json(service.listTasks());
      } catch (error) {
        handleError(error, res, next);
      }
    },
    create(req, res, next) {
      try {
        res.status(201).json(service.createTask(req.body || {}));
      } catch (error) {
        handleError(error, res, next);
      }
    },
    updateStatus(req, res, next) {
      try {
        res.json(service.changeStatus(req.params.id, req.body?.status));
      } catch (error) {
        handleError(error, res, next);
      }
    }
  };
}

module.exports = { createTaskController };
