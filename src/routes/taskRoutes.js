const express = require('express')
const taskController = require('../controllers/taskController')
const router = express.Router()
const cors = require("cors");
// const { authMiddleware } = require('../middlewares/auth.middleware');

router.use(cors())
// router.use(authMiddleware);

// --- 1. Những cái cụ thể, không chứa biến :id cho lên ĐẦU ---
// router.post('/createTask', taskController.createTask);
router.get('/myTask', taskController.getAllTasksGlobal); // Đưa lên đây!

// --- 2. Những cái có biến :taskID cho xuống DƯỚI ---
router.get('/:taskID', taskController.getDetailTask); // do là cái / task id
router.delete('/:taskID', taskController.deleteTask);
router.patch('/:taskID', taskController.updateTask); // Dùng patch hoặc put thay cho update


module.exports = router;

