const mongoose = require('mongoose');

const userInfo = new mongoose.Schema({
    name: { type: String, required: true }, // S viết hoa
    email: { type: String, required: true, unique: true }, // S viết hoa
    password: { type: String, required: true } // S viết hoa
}, {
    timestamps: true // đã tích hợp sẵn createAt và updateAt nên xóa trong db
});

module.exports = mongoose.model('User', userInfo);