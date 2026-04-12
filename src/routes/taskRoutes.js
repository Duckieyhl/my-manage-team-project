const express = require('express')
const authController = require('../controllers/taskController')
const router = express.Router()

router.post('createTask', createTask);

router.post('deleteTask', deleteTask);

module.exports = router;

