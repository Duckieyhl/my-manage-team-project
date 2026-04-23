const teamService = require('../service/teamService');
const projectService = require('../service/projectService');
const taskService = require('../service/taskService');

class TeamController {

    // 1. Lấy tất cả các Team mà User tham gia
    async getAllTeam(req, res) {
        try {
            const userId = req.user.id;
            const teams = await teamService.getAllTeam(userId);

            // Phải có res.json thì Frontend mới nhận được đồ
            res.status(200).json({
                success: true,
                data: teams
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    //  Tạo Project cho một Team cụ thể
    async createProject(req, res) {
        try {
            // Lấy teamId từ URL (:teamId)
            const teamId = req.params.teamId;

            // Lấy các thông tin khác từ Body
            const { title, description, projectLeader_id, startDate, endDate } = req.body;

            const createdBy = req.user.id;


            const newProjectData = {
                title,
                description,
                startDate,
                endDate,
                team_id: teamId,
                projectLeader_id,
                createdBy
            };
            if (!title?.trim() || !description?.trim() || !projectLeader_id) {
                return res.status(400).json({
                    success: false,
                    message: "thiếu thông tin cần đê tạo"
                });
            }

            // 2. Check logic thời gian
            const now = new Date();
            const start = new Date(startDate);
            const end = new Date(endDate);

            if (start < new Date(now.getTime() - 10 * 60000)) {
                return res.status(400).json({
                    success: false,
                    message: "Ngày bắt đầu không được ở quá khứ."
                });
            }

            if (end <= start) {
                return res.status(400).json({
                    success: false,
                    message: "Ngày kết thúc phải sau ngày bắt đầu."
                });
            }

            const project = await projectService.createProject(newProjectData);

            res.status(201).json({
                success: true,
                message: "Tạo project thành công!",
                data: project
            });
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    // Tạo Team mới
    async createTeam(req, res) {
        try {
            const userId = req.user.id;
            const { name, description } = req.body;
            if (!name || !description) {
                return res.status(400).json({
                    success: false,
                    message: "Vui lòng nhập đầy đủ tên nhóm và mô tả!"
                });
            }

            const newTeam = await teamService.createTeam({ name, description, userId, isPublic: true });

            res.status(201).json({
                success: true,
                message: "Tạo nhóm thành công!",
                data: newTeam
            });
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    async getAllTeammate(req, res) {
        try {
            const teamId = req.params.teamId;
            const teammates = await teamService.getAllTeammate(teamId);
            res.status(200).json({
                success: true,
                data: teammates
            })
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getDetail(req, res) {
        try {
            const teamId = req.params.teamId;
            const team = await teamService.getDetail(teamId);
            res.status(200).json({
                success: true,
                data: team
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getAllProject(req, res) {
        try {
            const teamId = req.params.teamId;
            const projects = await teamService.getAllProject(teamId);
            res.status(200).json({
                success: true,
                data: projects
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateTeam(req, res) {
        try {
            const teamId = req.params.teamId;
            const userId = req.user.id;
            const updateData = req.body;
            const allowedUpdates = ['title', 'description', 'isPublic'];
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

            const updatedTeam = await teamService.updateTeam(teamId, userId, updateData);

            res.status(200).json({
                message: "Cập nhật công việc thành công!",
                data: updatedTask
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async deleteMember(req, res) {
        try {
            const teamId = req.params.teamId;
            const memToDelete = req.body.id;
            const userId = req.user.id;
            await teamService.deleteMember(teamId, userId, memToDelete);

            res.status(200).json({ success: true, message: "Đã mời thành viên rời khỏi nhóm!" });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async addMember(req, res) {
        try {
            const teamId = req.params.teamId;
            const userId = req.user.id;
            const memToAdd = req.body.id;
            await teamService.addMember(teamId, userId, memToAdd);

            res.status(200).json({ success: true, message: "Thêm thành viên thành công!" });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async deleteTeam(req, res) {
        try {
            const teamId = req.params.teamId;
            const userId = req.user.id;
            await teamService.deleteTeam(teamId, userId);

            res.status(200).json({ success: true, message: "Đã giải tán nhóm thành công!" });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new TeamController();