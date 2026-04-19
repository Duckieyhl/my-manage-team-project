const express = require('express')
const projectController = require('../controllers/projectController')
const router = express.Router()
const cors = require("cors");

router.use(cors())

// create
router.post('/createTask', projectController.createTask);

//Read all project member
router.get('/:projectId/members', projectController.readAllProjectMember);

//Read all project task
router.get('/:projectId/task', projectController.readAllProjectTask);

// update project
router.patch('/:projectId', projectController.updateProject);

// delete project
router.delete('/:projectId', projectController.deleteProject);

// add member
router.post('/:projectId/members', projectController.addMember);

// delete member
router.delete('/:projectId/members/:memberId', projectController.deleteMem);

// assign task
router.patch('/:projectId/tasks/assign', projectController.assignTask);

//thống kê stat nếu dc

module.exports = router; // Hoặc cách bạn đang export


