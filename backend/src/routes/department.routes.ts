import { Router } from 'express';
import {
  getAllDepartments,
  getDepartmentById,
} from '../controllers/department.controller';

const router = Router();

// GET /api/departments         → all departments (list)
router.get('/', getAllDepartments);

// GET /api/departments/:id     → single department full profile
router.get('/:id', getDepartmentById);

export default router;
