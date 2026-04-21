const project = require('../models/project');
const task = require('../models/task');

class projectResporitory {
    // async projectResporitory.update(projectId, updateData){}
    async findbyId(projectId) {
        // Mongoose cần biết bạn muốn tìm cái ID nào
        // Thêm .lean() để trả về Object JS thuần, giúp code chạy nhanh hơn
        return await project.findById(projectId).lean();
    }

    async deleteProject(projectId) {
        // 1. Xóa tất cả các Task có project_id trùng với ID dự án
        await task.deleteMany({ project_id: projectId });

        // 2. Xóa chính cái Project đó
        const deletedProject = await project.findByIdAndDelete(projectId);

        // 3. Trả về kết quả project đã xóa (để Controller báo thành công)
        return deletedProject;
    }



    async update(projectId, updateData) {
        return await project.findByIdAndUpdate(
            projectId,
            updateData,
            {
                new: true,           // Lấy dữ liệu mới nhất
                runValidators: true, // Kiểm tra dữ liệu đầu vào
                context: 'query'
            }
        ).lean();
    }

}

module.exports = new projectResporitory();
