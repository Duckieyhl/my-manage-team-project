const projectResporitory = require('..resporitory/projectResporitory')
const taskService = require('taskService')
const task = require('../models/task')
const projectMemberRepository = require('../repositories/projectMember.repository');


class projectService {
    // task.service.js
    // Đừng quên require Repository của ProjectMember vào nhé
    async createNewTask(data) {
        const { title, project_id, assign_id, startDate, endDate } = data;

        // 1. Kiểm tra thiếu thông tin cơ bản
        if (!title || !project_id || !assign_id) {
            throw new Error("Thiếu thông tin bắt buộc để tạo Task.");
        }

        // 2. CHECK QUAN TRỌNG: Kiểm tra Assignee có trong Project không
        // Bạn tìm một bản ghi trong bảng trung gian khớp cả 2 ID này
        const isMember = await projectMemberRepository.findOne({
            project_id: project_id,
            user_id: assign_id
        });

        if (!isMember) {
            throw new Error("Người thực hiện không thuộc dự án này. Vui lòng kiểm tra lại!");
        }

        // 3. Check logic ngày tháng
        const now = new Date();
        if (new Date(startDate) < now.setMinutes(now.getMinutes() - 10)) {
            throw new Error("Ngày bắt đầu không được ở quá khứ.");
        }

        if (new Date(endDate) <= new Date(startDate)) {
            throw new Error("Ngày kết thúc phải sau ngày bắt đầu.");
        }

        // 4. Mọi thứ OK thì gọi Repository tạo Task
        return await taskRepository.create(data);
    }
    // async deleteProject(projectId)

    async readAllProjectMember(projectId) {
        // Tìm tất cả user trong project và chưa bị xóa
        // neen check laij sau
        return await projectMember.find(projectId)


        // return await projectMember.find({ project_id: projectId })
        //     .populate('user_id', 'name email avatar')
        //     .lean();
    }

    async readAllProjectTask(projectId, userId) {
        // Bước 1: Lấy thông tin project lên (Phải có await)
        const project = await projectResporitory.findbyId(projectId);

        // Bước 2: Kiểm tra xem có tìm thấy project không rồi mới lấy ID Leader
        if (!project) {
            throw new Error("Không tìm thấy dự án này!");
        }

        const projectLeader_id = project.projectLeader_id;
        if (userId.toString() === projectLeader_id.toString()) {
            // TRƯỜNG HỢP 1: Nếu là Leader -> Trả về TOÀN BỘ task trong project này
            return await taskRepository.findByProjectId(projectId);
        }
        else {
            // TRƯỜNG HỢP 2: Nếu là Member bình thường 
            //nên trả về task mà bạn đó được giao 
            return await taskRepository.findTasksForMember(projectId, userId);
        }
    }

    async updateProject(projectId, userId, updateData) {
        const project = await projectResporitory.findbyId(projectId);
        if (!project) {
            throw new Error("Không tìm thấy dự án này!");
        }
        const projectLeader_id = project.projectLeader_id;
        if (userId.toString() === projectLeader_id.toString()) {
            return await projectResporitory.update(projectId, updateData);
        }
        else {
            throw new Error("Bạn không phải Leader của dự án này, không có quyền chỉnh sửa!");
        }
    }
}

module.exports = new projectService();