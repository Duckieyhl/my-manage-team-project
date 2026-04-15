const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    project_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
    // sprint_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Sprint' },
    title: { type: String, required: true },
    description: String,
    status: { type: String, enum: ['Todo', 'Doing', 'Done'], default: 'Todo' },
    priority: String,
    assignee_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    reporter_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    due_date: Date
}, { timestamps: true }); // Tự tạo created_at và updated_at như trong hình

module.exports = mongoose.model('Task', taskSchema);