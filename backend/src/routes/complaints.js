const express = require('express');
const { createComplaint, getComplaints, updateComplaintStatus } = require('../controllers/complaintController');
const { authenticate, authorize } = require('../middleware/auth');
const router = express.Router();

router.post('/', authenticate, createComplaint);
router.get('/', authenticate, getComplaints);
router.patch('/:id/status', authenticate, authorize(['AUTHORITY', 'ADMIN']), updateComplaintStatus);

module.exports = router;
