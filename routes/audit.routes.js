const express = require("express");
const router = express.Router();
const auditLogController = require('../controllers/audit_log/audit_log.controller');
router.get('/get-audit-logs/:id',auditLogController.getAuditLogs);
router.post('/save-audit-log',auditLogController.saveAuditLog);
module.exports = router;