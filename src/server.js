const express = require('express');
const app = express();
const port = 3000;

// Middleware để server hiểu được dữ liệu JSON gửi lên
app.use(express.json());

// Nhập các Route đã viết ở trên vào
const authRoutes = require('./src/routes/authRoutes');
const teamRoutes = require('./src/routes/teamRoutes');
const taskRoutes = require('./src/routes/taskRoutes');

// Định nghĩa tiền tố (Prefix) cho từng nhóm API
app.use('/api/auth', authRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/tasks', taskRoutes);

app.listen(port, () => {
    console.log(`🚀 Server đang chạy tại http://localhost:${port}`);
});