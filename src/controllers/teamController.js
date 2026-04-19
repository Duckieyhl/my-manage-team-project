//  async createProject(req, res) {
//     try {
//         // nhớ chỉnh url sao cho có team_id phía trc
//         const { title, description, deadline, team_id, assign_id } = req.body;

//         // Lấy userId của người tạo từ Middleware Auth
//         const createdBy = req.user.id;

//         // Gom lại để gửi xuống Service xử lý
//         const newProjectData = {
//             title,
//             description,
//             startDate,
//             endDate,
//             team_id,
//             projectLeader_id,
//             createdBy
//         };

//         const project = await projectService.createNewProject(newProjectData);

//         res.status(201).json({
//             message: "Tạo project thành công!",
//             data: project
//         });
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// }
