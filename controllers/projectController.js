const Project = require('../models/projectModel');

// Middleware to check if the user is an Admin
const ensureAdmin = (req, res, next) => {
    const userRole = req.user.role; // Assume user role is attached to req.user

    if (userRole !== 'Admin') {
        return res.status(403).json({ message: 'Access denied: Admins only' });
    }

    next();
};

// API to create a new project (POST /project)
const createProject = async (req, res) => {
    try {
        const { name, description, assignedTo, createdBy } = req.body;

        // Ensure the request is made by an Admin
        if (req.user.role !== 'Admin') {
            return res.status(403).json({ message: 'Access denied: Admins only' });
        }

        const newProject = await Project.create({
            name,
            description,
            assignedTo,
            createdBy: req.user.id, // Assuming the project creator is the logged-in Admin
        });

        res.status(201).json({ message: 'Project created successfully', newProject });
    } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// API to get all projects (GET /project)
const getProjects = async (req, res) => {
    try {
        const projects = await Project.findAll();
        res.json(projects);
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// API to get a project by ID (GET /project/:id)
const getProjectById = async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.json(project);
    } catch (error) {
        console.error('Error fetching project:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// API to update project details (PUT /project/:id)
const updateProject = async (req, res) => {
    try {
        const { name, description, assignedTo } = req.body;

        // Ensure the request is made by an Admin
        if (req.user.role !== 'Admin') {
            return res.status(403).json({ message: 'Access denied: Admins only' });
        }

        const [updated] = await Project.update({
            name,
            description,
            assignedTo
        }, {
            where: { id: req.params.id }
        });

        if (updated) {
            const updatedProject = await Project.findByPk(req.params.id);
            res.json(updatedProject);
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        console.error('Error updating project:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// API to soft delete a project (DELETE /project/:id)
const deleteProject = async (req, res) => {
    try {
        // Ensure the request is made by an Admin
        if (req.user.role !== 'Admin') {
            return res.status(403).json({ message: 'Access denied: Admins only' });
        }

        const project = await Project.findByPk(req.params.id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        await project.destroy();
        res.status(204).send(); // Send no content on success
    } catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// API to permanently delete a project (DELETE /project/permanent/:id) (OPTIONAL)
const permanentDeleteProject = async (req, res) => {
    try {
        // Ensure the request is made by an Admin
        if (req.user.role !== 'Admin') {
            return res.status(403).json({ message: 'Access denied: Admins only' });
        }

        const deleted = await Project.destroy({
            where: { id: req.params.id },
            force: true 
        });

        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        console.error('Error permanently deleting project:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// API to restore a soft-deleted project (PATCH /project/restore/:id)
const restoreProject = async (req, res) => {
    try {
        // Ensure the request is made by an Admin
        if (req.user.role !== 'Admin') {
            return res.status(403).json({ message: 'Access denied: Admins only' });
        }

        const restored = await Project.restore({
            where: { id: req.params.id }
        });

        if (restored) {
            const restoredProject = await Project.findByPk(req.params.id);
            res.json(restoredProject);
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        console.error('Error restoring project:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject,
    permanentDeleteProject, 
    restoreProject,
    ensureAdmin
};
