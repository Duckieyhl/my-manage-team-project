const express = require('express')
const teamController = require('../controllers/projectController')
const router = express.Router()
const cors = express.cors();

router.use(cors())

// create
router.post('/createTask', projectController.createProject);

//Read all project member
router.get('/:projectId', projectController.getAll);

//Read all project task
router.get('/:projectId,projectController.getTask');

// update project
router.patch('/:projectId', projectController.updateProject);

// delete project
router.delete(':projectId,'projectController.deleteProject);

// add member
router.post(':projectId', projectController.addMem);

// delete member
router.delete(':projectId', projectController.deleteMem);

// assign task
router.patch(':projectId', projectController.assign);

//thống kê stat nếu dc



