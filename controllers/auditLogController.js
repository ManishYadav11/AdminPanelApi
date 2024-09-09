const AuditLog = require('../models/auditLogModel');

// Middleware to check if the user is an Admin
const ensureAdmin = (req, res, next) => {
    const userRole = req.user.role; // Assume user role is attached to req.user

    if (userRole !== 'Admin') {
        return res.status(403).json({ message: 'Access denied' });
    }

    next();
};

// Controller to get all audit logs
const getAuditLogs = async (req, res) => {
    try {
        const logs = await AuditLog.findAll();

        if (logs.length === 0) {
            return res.status(404).json({ message: 'No audit logs found' });
        }

        res.json(logs);
    } catch (error) {
        console.error('Error fetching audit logs:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { getAuditLogs, ensureAdmin };
