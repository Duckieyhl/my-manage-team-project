const express = require('express')
const taskController = require('../controllers/taskController')
const projectController = require('../controllers//projectController')
const router = express.Router()
const cors = require("cors");
// const { authMiddleware } = require('../middlewares/auth.middleware');

router.use(cors())
// router.use(authMiddleware);

// --- 1. Những cái cụ thể, không chứa biến :id cho lên ĐẦU ---
router.post('/createTask', projectController.createTask); // tạo task

router.get('/myTask', taskController.getAllTasksGlobal); // lấy toán bộ task

// --- 2. Những cái có biến :taskID cho xuống DƯỚI ---
router.get('/:taskID', taskController.getDetailTask); // lấy nhiệm vụ cụ thể

router.delete('/:taskID', taskController.deleteTask); // xóa nhiệm vụ cụ thể

router.patch('/:taskID', taskController.updateTask); // Dùng patch hoặc put thay cho update


module.exports = router;

