const express = require('express')
const teamController = require('../controllers/teamController')
const router = express.Router()
const cors = express.cors();
const { authMiddleware } = require('../middlewares/auth.middleware');

router.use(cors())
router.use(authMiddleware);

// create
router.post('/createTeam', teamController.createTeam);

//Read all team mate
router.get('/:teamId', teamController.getAll);

// Read detail about team
router.get('/:teamId', teamController.getDetail);

// 



