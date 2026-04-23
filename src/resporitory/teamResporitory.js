const team = require('../models/team')

class teamRepository {
    async findByUserId(userId) {
        return await teammateResporitory.find({
            user_id: userId
        })
    }

    async createTeam(data) {
        return await team.create(data);
    }

    async findById(teamId) {
        return await team.findById(teamId);
    }

    async find(teamId) {
        return await team.find(teamId);
    }
    async updateTeam(teamId, updateData) {
        const { name, description, isPublic } = updateData;
        return await team.findByIdAndUpdate(
            teamId,
            { name, description, isPublic }, // Dữ liệu mới
            { new: true, runValidators: true } // Trả về bản mới & kiểm tra ràng buộc Schema
        );
    }
}

module.exports = new teamRepository();