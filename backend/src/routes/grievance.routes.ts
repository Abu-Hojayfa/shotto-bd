import { Router } from 'express';
import {
  submitGrievance,
  trackGrievance,
  getGrievancesByDepartment,
} from '../controllers/grievance.controller';

const router = Router();

// POST /api/grievances                              → submit new grievance
router.post('/', submitGrievance);

// GET  /api/grievances/track/:trackingId            → track by tracking ID
router.get('/track/:trackingId', trackGrievance);

// GET  /api/grievances/department/:departmentId     → all grievances for a dept
router.get('/department/:departmentId', getGrievancesByDepartment);

export default router;
