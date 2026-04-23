const task = require('../models/task');

class taskRepository {
    async create(taskData) {
        return await task.create(taskData);
    }

    async findbyID(taskID) {
        return await task.findById(taskID);
    }

    async Delete(taskId) {
        return await task.delete(taskId)
    }
    async findByUserId(userId) { // nên kiểm tra lại cái này 
        // Tìm tất cả Task có assign_id là userId và chưa bị xóa
        return await task.find({
            assign_id: userId,
        })
            .select()
            .populate('project_id', 'title description projectLeader_id')
            .sort({ createdAt: -1 }); // Task mới nhất hiện lên đầu
    }
    //  title: { type: String, required: true },
    //     description: { type: String },
    //     team_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
    //     projectLeader_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    //     createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    //     startDate: { type: Date },
    //     endDate: { type: Date },

    // async findDetailbyId(taskId) {
    //     return await task.find(taskId);
    // }

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
    async findByProjectId(projectId) {
        return await task.find({ project_id: projectId });
    }

    async findTasksForMember(projectId, userId) {
        return await task.find({ project_id: projectId, reporter_id: userId }).lean();
    }
}

module.exports = new taskRepository();
