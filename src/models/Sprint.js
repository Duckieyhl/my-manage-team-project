const mongoose = require('mongoose');

const sprintSchema = new mongoose.Schema({
    project_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    name: { type: String, required: true },
    start_date: { type: Date },
    end_date: { type: Date },
    status: { type: String, enum: ['Planned', 'Active', 'Completed'], default: 'Planned' }
}, { timestamps: true });

module.exports = mongoose.model('Sprint', sprintSchema);