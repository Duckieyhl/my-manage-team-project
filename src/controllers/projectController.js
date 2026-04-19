const projectService = require('../services/projectService');

class projectController {
    //Create
    async createTask(req, res) {
        try {
            const { projectId } = req.params.projectId;
            const { title, description, startDate, endDate, assign_id } = req.body;

            // Lấy userId của người tạo từ Middleware Auth 
            const createdBy = req.user.id;

            // Gom lại để gửi xuống Service xử lý
            const newTaskData = {
                title,
                description,
                startDate,
                endDate,
                project_id,
                assign_id,
                createdBy
            };

            // Service sẽ kiểm tra:
            // 1. ProjectId có tồn tại không?
            // 2. Người tạo (creatorId) có quyền tạo task trong project này không?
            // 3. Người được giao (assigneeId) có thuộc project này không?
            const task = await ProjectService.createNewTask(newTaskData);

            res.status(201).json({
                message: "Tạo công việc thành công!",
                data: task
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async deleteProject(req, res) {
        try {
            const projectId = req.params;
            const userId = req.user.id;
            // service sẽ kiểm tra điều kiện xem có đủ điều kiện để xóa ko 
            await projectService.deleteProject(projectId, userId)
            res.status(200).json({ message: "Xóa project thành công!" });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async readAllProjectMember(req, res) {
        try {
            const projectId = req.params;
            const members = await projectService.readProjectMember(projectId)
            res.status(200).json(members);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async readAllProjectTask(req, res) {
        try {
            const { projectId } = req.params;
            const userId = req.user.id;

            // Gọi Service xử lý việc phân loại: Leader thấy hết, Member thấy task của mình
            const tasks = await projectService.getProjectTasks(projectId, userId);

            // QUAN TRỌNG: Phải có res.json để trả dữ liệu về FE
            res.status(200).json(tasks);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async updateProject(req, res) {
        try {
            const projectId = req.params.projectId;
            const userId = req.user.id;
            const { title, description, projectLeader, startDate, endDate } = req.body;
            const data = { name, description, projectLeader, startDate, endDate }
            const updatedProject = await projectService.updateProject(projectId, userId, updateData);
            res.status(200).json({
                message: "Cập nhật thành công",
                data: updatedProject
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async addMember(req, res) {
        try {
            const { projectId } = req.params;
            const adminId = req.user.id;    // Người thực hiện (Leader?)
            const { memberId } = req.body;  // Người được thêm

            // Chỉ gọi duy nhất 1 dòng này, để Service lo hết logic check quyền
            const result = await projectService.addMember(projectId, adminId, memberId);

            res.status(200).json({ message: "Thành công", data: result });
        } catch (error) {
            // Nếu Service quăng lỗi (như "Bạn ko có quyền"), nó sẽ rơi vào đây
            res.status(403).json({ message: error.message });
        }
    }

    async deleteMem(req, res) {
        try {
            const projectId = req.params.projectId;
            const userId = req.user.id;
            const memToDelete = req.body.id;
            //service sẽ check xem có đủ điều kiện để xóa ko
            await projectService.deleteMemMember(projectId, memToDelete, userId);
            res.status(200).json({ message: "Đã xóa thành viên khỏi dự án!" });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async assignTask(req, res) {
        try {
            const projectId = req.params.projectId;
            const userId = req.user.id;
            const memToAssign = req.body.id;
            await projectService.assignTask(projectId, memToAssign);
            res.status(200).json({
                message: "Giao việc thành công!",
                data: task
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new projectController();
