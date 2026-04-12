const Task = require('../models/Task');

class TaskRepository {
    async create(taskData) {
        return await Task.create(taskData);
    }

    async findbyID(taskID) {
        return await task.findById(taskID)
    }

    async delete(taskId) {
        return await task.delete(taskId)
    }
    async findAndUpdate(taskId, data) {
        return await
    }
}

module.exports = new TaskRepository();