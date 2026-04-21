const projectResporitory = require('../resporitory/projectResporitory')
const taskService = require('./taskService')
const task = require('../models/task')
// const projectMemberRepository = require('../repositories/projectMemberRepository');


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

    async deleteProject(projectId) {
        const project = await projectResporitory.findbyId(projectId);
        if (!project) {
            throw new Error("Không tìm thấy dự án này!");
        }
        const leader = project.createBy;
        if (userId.toString() !== leader.toString()) {
            throw new Error("Bạn không có quyền chỉnh sửa dự án này!");
        }
        return await project.delete(projectId);
    }

    async readAllProjectMember(projectId) {
        // Tìm tất cả user trong project và chưa bị xóa
        // neen check laij sau
        return await projectMember.find(projectId);


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
        if (userId.toString() !== projectLeader_id.toString()) {
            throw new Error("Bạn không có quyền chỉnh sửa dự án này!");
        }

        // Nếu đã chạy xuống đến đây thì chắc chắn là Leader rồi
        return await projectResporitory.update(projectId, updateData);
    }

    async addMember(projectId, userId, memberId) {
        const project = await projectResporitory.findbyId(projectId); // tra ve object
        if (!project) {
            throw new Error("Không tìm thấy dự án này!");
        }
        const projectLeader_id = project.projectLeader_id;
        const leaderTeam = project.createBy;
        const canAdd = userId.toString() === leaderTeam.toString() ||
            userId.toString() === projectLeader_id.toString();

        if (!canAdd) {
            throw new Error("Bạn không có quyền thêm thành viên vào dự án này!");
        }

        // CHECK QUAN TRỌNG: Người này đã có trong dự án chưa?
        const isAlreadyMember = await projectMemberRepository.checkMemberInProject(projectId, memberId);
        if (isAlreadyMember) {
            throw new Error("Người này đã là thành viên của dự án rồi!");
        }

        //  Nếu mọi thứ OK, gọi Repository để tạo bản ghi mới
        // nên truyền role mặc định là 'Member'
        const newMember = await projectMemberRepository.create({
            project_id: projectId,
            user_id: memberId,
            role: 'Member'
        });

        return newMember;
    }

    async deleteMemMember(projectId, memToDelete, userId) {
        const project = await projectResporitory.findbyId(projectId); // tra ve object
        if (!project) {
            throw new Error("Không tìm thấy dự án này!");
        }
        const projectLeader_id = project.projectLeader_id;
        const canDelete = userId.toString() === projectLeader_id.toString();
        if (!canDelete) {
            throw new Error("Bạn không có quyền xóa thành viên!");
        }
        const isAlreadyMember = await projectMemberRepository.checkMemberInProject(projectId, memToDelete);
        if (!isAlreadyMember) {
            throw new Error("Người này ko phải là thành viên của dự án!");
        }
        const res = await projectMemberRepository.delete(memToDelete);
        if (!res) {
            throw new Error("Xóa không thành công, có thể dữ liệu đã bị thay đổi.");
        }

        // Trả về kết quả để Controller sử dụng
        return res;
    }

    async assignTask(projectId, taskId, memToAssign, userId) {
        const project = await projectResporitory.findbyId(projectId); // tra ve object
        if (!project) {
            throw new Error("Không tìm thấy dự án này!");
        }

        const projectLeader_id = project.projectLeader_id;
        const canAssign = userId.toString() === projectLeader_id.toString();
        if (!canAssign) {
            throw new Error("Bạn không có quyền phân nhiệm vụ!");
        }
        const isMember = await projectMemberRepository.checkMemberInProject(projectId, memToAssign);
        if (!isMember) {
            throw new Error("Người này không thuộc thành viên dự án, không thể giao việc!");
        }
        const updatedTask = await taskRepository.update(taskId, { assign_id: memToAssign });

        if (!updatedTask) {
            throw new Error("Không tìm thấy Task để cập nhật!");
        }
        return updatedTask;
    }
}

module.exports = new projectService();
