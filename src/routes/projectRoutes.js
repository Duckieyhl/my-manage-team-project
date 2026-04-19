const express = require("express");
const cors = require("cors");
const projectController = require("../controllers/projectController");

const router = express.Router();

router.use(cors());

// create task
router.post("/createTask", projectController.createTask);

// Read all project member
router.get("/:projectId", projectController.readAllProjectMember);

// Read all project task (đổi route cho khác)
router.get("/:projectId/tasks", projectController.readAllProjectTask);

// update project
router.patch("/:projectId", projectController.updateProject);

// delete project
router.delete("/:projectId", projectController.deleteProject);

// add member
router.post("/:projectId/member", projectController.addMember);

// delete member
router.delete("/:projectId/member", projectController.deleteMem);

// assign task
router.patch("/:projectId/assign", projectController.assignTask);

module.exports = router;
