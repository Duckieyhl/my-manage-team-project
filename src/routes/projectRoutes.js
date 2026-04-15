const express = require('express');
const projectController = require('../controllers/projectController');
const router = express.Router();
const cors = express.cors();

router.use(cors())

//create
router.post('/create-project', projectController.createProject);

// read detail
router.get('/:projectId', project)   