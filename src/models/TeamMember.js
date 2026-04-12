const mongoose = require('mongoose');

const projectMemberSchema = new mongoose.Schema({
    team_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    role: { type: String, enum: ['Member', 'Leader'], default: 'Member' }
}, { timestamps: true });

module.exports = mongoose.model('ProjectMember', projectMemberSchema);