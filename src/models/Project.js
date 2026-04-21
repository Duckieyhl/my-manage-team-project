const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    team_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
    projectLeader_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    startDate: { type: Date },
    endDate: { type: Date },
    // tasks: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Task'
    // }]
}, { timestamps: true });

module.exports = mongoose.model('project', projectSchema);