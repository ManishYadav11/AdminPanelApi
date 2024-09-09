const express = require('express');
const router = express.Router();
const auditLogController = require('../controllers/auditLogController');

// Audit log routes
router.get('/audit-logs', auditLogController.ensureAdmin, auditLogController.getAuditLogs);

module.exports = router;
