import { Router } from 'express';
import * as reportController from '../controllers/report.controller';
import { protect } from '../middleware/auth';

const router = Router();

// POST /api/reports — Submit a new report (public/anonymous, optionally authenticated)
router.post('/', reportController.createReport);

// GET /api/reports/stats — Public statistics for dashboard
router.get('/stats', reportController.getReportStats);

// GET /api/reports/my-reports — Retrieve reports submitted by the logged-in user
router.get('/my-reports', protect, reportController.getMyReports);

// GET /api/reports — Fetch all reports (Admin Dashboard list)
router.get('/', reportController.getAllReports);

// PUT /api/reports/:id/status — Update status and remarks of a report
router.put('/:id/status', reportController.updateReportStatus);

export default router;
