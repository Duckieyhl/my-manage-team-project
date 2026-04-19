const task = require('../models/task');

class taskRepository {
    async create(taskData) {
        return await task.create(taskData);
    }

    async findbyID(taskID) {
        return await task.findById(taskID)
    }

    async Delete(taskId) {
        return await task.delete(taskId)
    }
    async findByUserId(userId) { // nên kiểm tra lại cái này 
        // Tìm tất cả Task có assign_id là userId và chưa bị xóa
        return await task.find({
            assign_id: userId,
        })
            .populate('project_id', 'projectName', 'title', 'description') // Lấy kèm tên dự án để hiển thị lên UI cho đẹp cái này quy định những cái cần lấy
            .sort({ createdAt: -1 }); // Task mới nhất hiện lên đầu
    }

    async findDetailbyId(taskId) {
        return await task.find(taskId).populate('project_id', 'projectName', 'reporter_id', 'status', 'priority', 'description')
    }

    async update(taskId, updates) {
        try {
            // findByIdAndUpdate: Tìm theo ID và cập nhật luôn
            // { new: true }: Trả về dữ liệu SAU KHI SỬA (nếu không có cái này nó trả về bản cũ)
            // { runValidators: true }: Đảm bảo dữ liệu mới vẫn phải đúng quy định của Schema
            return await task.findByIdAndUpdate(
                taskId,
                updates,
                { new: true, runValidators: true }
            );
        } catch (error) {
            throw new Error("Lỗi khi cập nhật dữ liệu tại Repository: " + error.message);
        }
    }
    // async findByProjectId(projectId) {

    // }

    // async findTasksForMember(projectId, userId) {

    // }
}

module.exports = new taskRepository();