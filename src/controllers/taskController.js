const taskService = require('../service/taskService');

class taskController {
    //Delete
    async deleteTask(req, res) {
        try {
            const { taskId } = req.params;
            const userId = req.user.id; // Lấy từ middleware auth

            await taskService.deleteTask(taskId, userId); // cấn có task để xóa đúng nvu còn userId để check quyền hạn

            res.status(200).json({ message: "Xóa công việc thành công!" });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    //Read (detail)
    async getDetailTask(req, res) {
        try {
            const taskID = req.params.taskID;
            const task = await taskService.getDetaliTask(taskID);
            if (!task) {
                return res.status(404).json({ message: "Task đã bị xóa hoặc không tồn tại" });
            }
            res.status(200).json(task)
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    //Read (All)
    async getAllTasksGlobal(req, res) {
        try {
            // Bạn có thể lấy userId từ token để lọc task của riêng người đó
            const userId = req.user.id;

            // Gọi Service
            const tasks = await taskService.getAllTasksForUser(userId);

            res.status(200).json(tasks);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    //Update
    async updateTask(req, res) {
        try {
            const { taskID } = req.params; // Lấy từ URL (giống Get Detail)
            const updateData = req.body;   // Lấy từ Body (giống Create Task)
            const userId = req.user.id;    // Lấy từ Token để check quyền


            // Những trường bạn CHO PHÉP người dùng sửa
            const allowedUpdates = ['title', 'description', 'status', 'deadline', 'priority', 'assignedTo'];

            // Tự động lọc req.body: Cái nào nằm trong allowedUpdates thì mới lấy
            const updates = {};
            Object.keys(req.body).forEach(key => {
                if (allowedUpdates.includes(key)) {
                    updates[key] = req.body[key];
                }
            });

            // Kiểm tra nếu sau khi lọc mà không có trường nào hợp lệ để sửa
            if (Object.keys(updates).length === 0) {
                return res.status(400).json({ message: "Không có dữ liệu hợp lệ để cập nhật!" });
            }

            const updatedTask = await taskService.updateTask(taskID, userId, updateData);
            // 2. Trả về kết quả thành công và dữ liệu mới
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

module.exports = new taskController();
