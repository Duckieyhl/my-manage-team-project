const TaskService = require('../services/task.service');

class TaskController {
    async createTask(req, res) {
        try {

            // Ví dụ logic: Kiểm tra deadline có hợp lệ không 
            if (new Date(req.body.deadline) < new Date()) {
                throw new Error("Deadline không được ở trong quá khứ!");
            }

            // các logic khác mà mình chưa nghĩ ra ở hiện tại sẽ ở đây

            const task = await TaskService.createNewTask(req.body);
            res.status(201).json(task);
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

    async updateTask(req, res) {
        try {
            const { taskId } = req.params;
            const updateData = req.body; // Lấy dữ liệu mới từ người dùng (tên, status,...)

            // Những trường bạn CHO PHÉP người dùng sửa
            const allowedUpdates = ['title', 'description', 'status', 'deadline', 'priority', 'assignedTo'];

            // Tự động lọc req.body: Cái nào nằm trong allowedUpdates thì mới lấy
            const updates = {};
            Object.keys(req.body).forEach(key => {
                if (allowedUpdates.includes(key)) {
                    updates[key] = req.body[key];
                }
            });

            // 2. Nếu Service trả về null (không tìm thấy task để sửa)
            if (!updatedTask) {
                return res.status(404).json({ message: "Dữ liệu ko đổi" });
            }

            // 3. Trả về kết quả thành công và dữ liệu mới
            res.status(200).json({
                message: "Cập nhật công việc thành công!",
                data: updatedTask
            });

        } catch (error) {
            // Lỗi 400 cho các trường hợp dữ liệu gửi lên không hợp lệ
            res.status(400).json({ message: error.message });
        }
    }
}
}

module.exports = new TaskController();