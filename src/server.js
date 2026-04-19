const express = require('express');
const app = express();
const port = 3000;

// Middleware để server hiểu được dữ liệu JSON gửi lên
app.use(express.json());

// Nhập các Route đã viết ở trên vào
// const authRoutes = require('./routes/authRoutes');
// const teamRoutes = require('./routes/teamRoutes');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');

// Định nghĩa tiền tố (Prefix) cho từng nhóm API
// app.use('/api/auth', authRoutes);

// app.use(authMiddleware); // 2. ĐẶT CHỐT TẠI ĐÂY

// app.use('/api/teams', teamRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);


app.listen(port, () => {
    console.log(`🚀 Server đang chạy tại http://localhost:${port}`);
});
