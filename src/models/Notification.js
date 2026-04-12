const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String }, // Ví dụ: 'ASSIGNED', 'COMMENT'
    message: { type: String, required: true },
    is_read: { type: Boolean, default: false },
    related_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' } // ID của Task hoặc Project liên quan
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);