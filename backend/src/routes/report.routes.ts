import { Router } from 'express';
import * as reportController from '../controllers/report.controller';

const router = Router();

// GET /api/reports — Fetch all reports (Admin Dashboard list)
router.get('/', reportController.getAllReports);

// PUT /api/reports/:id/status — Update status and remarks of a report
router.put('/:id/status', reportController.updateReportStatus);

export default router;
