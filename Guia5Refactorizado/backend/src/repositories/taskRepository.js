const { Task } = require("../models/task");

class TaskRepository {
  constructor(initialTasks = []) {
    this.tasks = initialTasks.map(task => new Task(task));
    this.nextId = Math.max(0, ...this.tasks.map(task => task.id)) + 1;
  }

  findAll() {
    return [...this.tasks];
  }

  create(data) {
    const task = new Task({ ...data, id: this.nextId++ });
    this.tasks.push(task);
    return task;
  }

  findById(id) {
    return this.tasks.find(task => task.id === Number(id));
  }

  updateStatus(id, status) {
    const task = this.findById(id);
    if (!task) return null;
    task.status = status;
    return task;
  }
}

module.exports = { TaskRepository };
