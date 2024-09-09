const User = require('../models/userModel');
const bcrypt = require('bcrypt');

// Middleware to check if the user is an Admin
const ensureAdmin = (req, res, next) => {
    const userRole = req.user.roleId; 

    if (userRole !== 'Admin') {
        return res.status(403).json({ message: 'Access denied' });
    }

    next();
};

// API to create a new user
const createUser = async (req, res) => {
    try {
        const { username, email, password, roleId } = req.body;

        if (!username || !email || !password || !roleId) {
            return res.status(400).json({ message: 'Username, email, password, and roleId are required.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            roleId
        });

        res.status(201).json({
            message: 'User created successfully!',
            user: newUser
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// API to get all users
const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// API to get a user by ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// API to update user information
const updateUser = async (req, res) => {
    try {
        const { username, email, password, roleId } = req.body;

        const updates = {
            username,
            email,
            roleId
        };

        if (password) {
            updates.password = await bcrypt.hash(password, 10);
        }

        const [updated] = await User.update(updates, {
            where: { id: req.params.id }
        });

        if (updated) {
            const updatedUser = await User.findByPk(req.params.id);
            res.json(updatedUser);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// API to delete a user (soft delete)
const deleteUser = async (req, res) => {
    try {
        const [deleted] = await User.update({
            deletedAt: new Date() // Assuming you have a deletedAt field for soft delete
        }, {
            where: { id: req.params.id }
        });

        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// API to restore a soft-deleted user
const restoreUser = async (req, res) => {
    try {
        const [updated] = await User.update({
            deletedAt: null
        }, {
            where: { id: req.params.id }
        });

        if (updated) {
            const restoredUser = await User.findByPk(req.params.id);
            res.json(restoredUser);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error restoring user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports = {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    restoreUser,
    ensureAdmin
};
