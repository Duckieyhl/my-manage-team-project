const mongoose = require('mongoose');

const TeamInfo = new mongoose.Schema({
    name: String,
    owner_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    invite_code: { type: String, unique: true }
}, {});

module.exports = mongoose.model('Notification', notificationSchema);