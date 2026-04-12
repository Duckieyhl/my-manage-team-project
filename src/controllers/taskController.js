const TaskService = require('../services/task.service');

class TaskController {
    async createTask(req, res) {
        try {
            const task = await TaskService.createNewTask(req.body);
            res.status(201).json(task);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getDetailTask(req, res) {
        try {
            const taskID = req.params.taskID;
            const task = await taskService.getTask(taskID);
            if (!task) {
                return res.status(404).json({ message: "Task đã bị xóa hoặc không tồn tại" });
            }
            res.status(200).json(task)
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getAllTasksGlobal(req, res) {
        try {
            // Bạn có thể lấy userId từ token để lọc task của riêng người đó
            const userId = req.user.id;

            // Gọi Service
            const tasks = await TaskService.getAllTasksForUser(userId);

            res.status(200).json(tasks);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async deleteTask(req, res) {
        try {
            const { taskId } = req.params;
            const userId = req.user.id; // Lấy từ middleware auth

            await TaskService.deleteTask(taskId, userId);

            res.status(200).json({ message: "Xóa công việc thành công!" });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new TaskController();