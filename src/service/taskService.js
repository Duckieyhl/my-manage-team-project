class TaskService {
    async createNewTask(data) {
        return await TaskRepository.create(data);
    }

    async deleteTask(taskId, userId) {
        // 1. Kiểm tra task có tồn tại không
        const task = await TaskRepository.findById(taskId);
        if (!task) {
            throw new Error("Công việc không tồn tại hoặc đã bị xóa trước đó!");
        }

        // 2. Kiểm tra quyền hạn (Logic nghiệp vụ)
        // Chỉ cho phép người tạo ra task (createdBy) hoặc người được giao task (assignedTo) xóa
        const isOwner = task.createdBy.toString() === userId;
        const isAssignee = task.reported_id.toString() === userId;

        if (!isOwner && !isAssignee) {
            throw new Error("Bạn không có quyền xóa công việc này!");
        }

        // 3. Thực hiện xóa (Nên dùng Soft Delete để an toàn dữ liệu)
        return await TaskRepository.Delete(taskId);
    }

    async getDetailTask(taskId) {
        // 1. Kiểm tra task có tồn tại không
        const task = await TaskRepository.findById(taskId);
        if (!task) {
            throw new Error("Công việc không tồn tại hoặc đã bị xóa trước đó!");
        }
        // 2. Kiểm tra quyền hạn (Logic nghiệp vụ)
        // chỉ cho người cùng 1 project cùng xem nhiệm vụ của nhau
        const isSameProject = task.
    }

}

module.exports = new TaskService();