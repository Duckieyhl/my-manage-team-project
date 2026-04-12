const Task = require('../models/Task');

class TaskRepository {
    async create(taskData) {
        return await Task.create(taskData);
    }

    async findbyID(taskID) {
        return await task.find(taskID)
    }
}

module.exports = new TaskRepository();