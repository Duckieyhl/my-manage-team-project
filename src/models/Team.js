const mongoose = require('mongoose');

const teamInfo = new mongoose.Schema({
    name: String,
    owner_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String },
    inviteCode: {
        type: String,
        unique: true,
        default: () => Math.random().toString(36).substring(2, 8).toUpperCase()
    }, // nên xem xét lại nếu đc
    isPublic: {
        type: Boolean,
        default: true
    }

}, { timestamp: true });

module.exports = mongoose.model('team', teamInfo);