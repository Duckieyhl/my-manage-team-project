class TaskService {
    async createNewTask(data) {
        // Ví dụ logic: Kiểm tra deadline có hợp lệ không
        if (new Date(data.deadline) < new Date()) {
            throw new Error("Deadline không được ở trong quá khứ!");
        }
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
        // Nếu Minh Vũ có phân quyền Leader, bạn có thể kiểm tra thêm quyền Leader ở đây
        const isOwner = task.createdBy.toString() === userId;
        const isAssignee = task.assignedTo.toString() === userId;

        if (!isOwner && !isAssignee) {
            throw new Error("Bạn không có quyền xóa công việc này!");
        }

        // 3. Thực hiện xóa (Nên dùng Soft Delete để an toàn dữ liệu)
        return await TaskRepository.softDelete(taskId);
    }
}

module.exports = new TaskService();