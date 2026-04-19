const express = require('express')
const teamController = require('../controllers/teamController')
const router = express.Router()
const cors = express.cors();


router.use(cors())
router.use(authMiddleware);

// create
router.post('/createTeam', teamController.createTeam);

//Read all teammate
router.get('/:teamId', teamController.getAll);

// Read detail about team
router.get('/:teamId', teamController.getDetail);

// read all project
// router.get()

// update project
router.patch('/teamId')

// delete project

// add member

// delete member

//thống kê stat nếu dc



