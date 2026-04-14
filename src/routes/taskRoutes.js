const express = require('express')
const taskController = require('../controllers/taskController')
const router = express.Router()
const cors = express.cors();
const { authMiddleware } = require('../middlewares/auth.middleware');

router.use(cors())
router.use(authMiddleware);

router.post('/createTask', taskController.createTask);

router.get('/:taskID', taskController.getDetailTask);

router.get('/myTask', taskController.getAllTasksGlobal);

router.delete('/:taskID', taskController.deleteTask);

router.update('/:taskId', taskController.updateTask);

module.exports = router;

