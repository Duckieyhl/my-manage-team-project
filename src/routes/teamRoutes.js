const express = require('express')
const teamController = require('../controllers/teamController')
const router = express.Router()
const cors = require("cors");


router.use(cors())
// router.use(authMiddleware);

router.post('/join', teamController.joinTeam);
//1
router.get('/all-my-team', teamController.getAllTeam);

// create 1
router.post('/createTeam', teamController.createTeam);

// create a project for a team 1
router.post('/:teamId/projects', teamController.createProject);

//Read all teammate 1 
router.get('/:teamId/members', teamController.getAllTeammate);

// Read detail about team 1 
router.get('/:teamId', teamController.getDetail);

// read all project 1 
router.get('/:teamId/all-project', teamController.getAllProject);

// update team 1 
router.patch('/:teamId', teamController.updateTeam);

// delete team
router.delete('/:teamId', teamController.deleteTeam);

// add member
router.post('/:teamId/members', teamController.addMember);

// delete member
router.delete('/:teamId/members/:memberId', teamController.deleteMember);

module.exports = router;

