const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { ensureAdmin } = projectController; 

// Project routes
router.post('/project', ensureAdmin, projectController.createProject);
router.get('/project', projectController.getProjects);
router.get('/project/:id', projectController.getProjectById);
router.put('/project/:id', ensureAdmin, projectController.updateProject);
router.delete('/project/:id', ensureAdmin, projectController.deleteProject);
router.delete('/project/permanent/:id', ensureAdmin, projectController.permanentDeleteProject);
router.patch('/project/restore/:id', ensureAdmin, projectController.restoreProject);
module.exports = router;
