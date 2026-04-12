const express = require('express')
const taskController = require('../controllers/taskController')
const router = express.Router()

router.post('createTask', taskController.createTask);

router.get('taskID', taskController.getDetailTask);

router.get('myTask', taskController.getAllTasksGlobal);

router.delete('taskID', taskController.deleteTask);

router.update('')

module.exports = router;

