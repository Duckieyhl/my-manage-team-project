const TaskResporitory = require('..resporitory/taskResporitory')

class taskService {
    async createNewTask(data) {
        return await taskRepository.create(data);
    }

    async deleteTask(taskId, userId) {
        // 1. Kiểm tra task có tồn tại không
        const task = await taskRepository.findById(taskId);
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


    async getAllTask(userId) {
        // 1. Logic kiểm tra (nếu cần): ví dụ check userId có tồn tại trong hệ thống không
        if (!userId) {
            throw new Error("UserId không được để trống");
        }

        // 2. Gọi Repository để lấy dữ liệu
        const tasks = await taskRepository.findByUserId(userId);

        // 3. Xử lý dữ liệu trước khi trả về (nếu cần)
        // Ví dụ: đếm xem có bao nhiêu task, hoặc phân loại task theo trạng thái
        return tasks;
    }

    async getDetailTask(taskId, userId) {
        // 1. Lấy task từ Repo
        const task = await taskRepository.findByIDDetail(taskId);
        if (!task) throw new Error("Không tìm thấy công việc!");

        // 2. Kiểm tra xem userId này có phải là thành viên của Project đó không
        // Chúng ta tìm trong bảng trung gian xem có bản ghi nào chứa cặp (Project, User) này không
        const membership = await ProjectMember.findOne({
            project_id: task.project_id, // Lấy ID project từ task
            user_id: userId              // ID của người đang đăng nhập
        });

        // 3. Nếu không tìm thấy bản ghi nào -> Người này là "người lạ" đối với dự án
        if (!membership) {
            throw new Error("Bạn không thuộc dự án này nên không có quyền xem chi tiết!");
        }

        return task;

    }

    async updateTask(taskId, userId, updateData) {
        // 1. Tìm task gốc
        const task = await taskRepository.findByID(taskId);
        if (!task) throw new Error("Không tìm thấy công việc");

        // 2. Check quyền: Chỉ người tạo (createdBy) hoặc người được giao (assign_id) mới được sửa
        // Hoặc nếu bạn dùng bảng ProjectMember thì check xem có phải Leader không
        const canUpdate =
            task.createdBy.toString() === userId ||
            task.assign_id.toString() === userId;

        if (!canUpdate) {
            throw new Error("Bạn không có quyền chỉnh sửa công việc này!");
        }

        // 3. Gọi Repo để lưu vào DB
        return await taskRepository.update(taskId, updateData);
    }

}

module.exports = new taskService();