const { deletemMember } = require('../controllers/teamController');
const projectResporitory = require('../resporitory/projectResporitory');
const teamResporitory = require('../resporitory/teamResporitory');

class teamService {
    async getAllTeam(userId) {
        return await teamResporitory.findByUserID(userId);
    }

    async createProject(data) {
        const { team_id, createdBy } = data;

        const team = await teamRepository.findById(team_id);
        if (!team) {
            throw new Error("Nhóm này ko tồn tại hoặc đã bị xóa");
        }

        if (team.leader_id.toString() !== createdBy) {
            throw new Error("Chỉ Trưởng nhóm mới có quyền tạo dự án mới!");
        }
        return await projectRepository.createProject(data);
    }

    async createTeam(data) {
        return await teamResporitory.create(data);
    }

    async getAllTeammate(teamId) {
        const team = await teamRepository.findById(teamId);
        if (!team) {
            throw new Error("Không tìm thấy dữ liệu nhóm hoặc nhóm này không tồn tại!");
        }
        const teammates = await teammatesResporitory.find(teamId);
        return teammates || [];
    }

    async getDetail(teamId) {
        const team = await teamRepository.findById(teamId);
        if (!team) {
            throw new Error("Không tìm thấy dữ liệu nhóm hoặc nhóm này không tồn tại!");
        }
        return team;
    }

    async getAllProject(teamId) {
        const team = await teamRepository.findById(teamId);
        if (!team) {
            throw new Error("Không tìm thấy dữ liệu nhóm hoặc nhóm này không tồn tại!");
        }
        const projects = await projectResporitory.findByTeamId(teamId);
        return projects || [];
    }

    async updateTeam(teamId, userId, updateData) {
        const team = await teamRepository.findById(teamId);
        if (!team) {
            throw new Error("Không tìm thấy dữ liệu nhóm hoặc nhóm này không tồn tại!");
        }
        if (team.leader_id.toString() !== userId.toString()) {
            throw new Error("Bạn ko có quyền thay đổi");
        }
        return await teamRepository.update(teamId, updateData);
    }

    async deleteMember(userId, memToDelete, teamId) {
        const team = await teamRepository.findById(teamId);

        if (!team) {
            throw new Error("Không tìm thấy dữ liệu nhóm hoặc nhóm này không tồn tại!");
        }

        if (team.leader_id.toString() !== userId.toString()) {
            throw new Error("Bạn ko có quyền xóa thành viên");
        }

        if (userId.toString() === memToDelete.toString()) {
            throw new Error("Bạn không thể tự xóa chính mình khỏi nhóm!");
        }

        const membership = await teammateRepository.findOne({
            team_id: teamId,
            user_id: memToDelete
        });

        if (!membership) {
            throw new Error("Thành viên này hiện không có trong nhóm");
        }


        return await teammateRepository.delete({
            team_id: teamId,
            user_id: memToDelete
        });
    }

    async addMember(teamId, userId, memToAdd) {
        const team = await teamRepository.findById(teamId);

        if (!team) {
            throw new Error("Không tìm thấy dữ liệu nhóm hoặc nhóm này không tồn tại!");
        }

        if (team.leader_id.toString() !== userId.toString()) {
            throw new Error("Bạn ko có quyền thêm thành viên");
        }

        if (userId.toString() === memToAdd.toString()) {
            throw new Error("Bạn không thể tự thêm chính mình khỏi nhóm!");
        }

        const membership = await teammateRepository.findOne({
            team_id: teamId,
            user_id: memToAdd
        });

        if (membership) {
            throw new Error("Thành viên này hiện đã có trong nhóm");
        }
        return await teammateRepository.add({
            team_id: teamId,
            userId: memToAdd,
            role: member
        }) // nhớ xóa cả bên projectmember
    }

    async deleteTeam(teamId, userId) {
        const team = await teamRepository.findById(teamId);

        if (!team) {
            throw new Error("Không tìm thấy dữ liệu nhóm hoặc nhóm này không tồn tại!");
        }

        if (team.leader_id.toString() !== userId.toString()) {
            throw new Error("Bạn ko có quyền xoá nhóm");
        }

        const projects = await projectRepository.findByTeamId(teamId);
        const projectIds = projects.map(p => p._id);


        await taskRepository.deleteMany({ project_id: { $in: projectIds } });

        await projectMemberRepository.deleteMany({ project_id: { $in: projectIds } });

        await teammateRepository.deleteMany({ team_id: teamId });

        await projectRepository.deleteMany({ team_id: teamId });

        const result = await teamRepository.deleteById(teamId);

        return result;
    }
}

module.exports = new teamService()