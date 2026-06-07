import { Request, Response, NextFunction } from 'express';
import GovernmentDepartment from '../models/GovernmentDepartment';
import { sendSuccess, sendError } from '../utils/response';

// ── Get All Departments ───────────────────────────────────────────────────────
// GET /api/departments
// Returns a lightweight list of all verified departments
export const getAllDepartments = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const departments = await GovernmentDepartment.find({ isVerified: true })
      .select('name nameBangla hierarchy jurisdiction headOfficer establishedYear personnelCount efficiencyScore contact.phone contact.email isVerified')
      .sort({ name: 1 });

    sendSuccess(res, 200, 'Departments fetched successfully.', { departments });
  } catch (err) {
    next(err);
  }
};

// ── Get Single Department Profile ─────────────────────────────────────────────
// GET /api/departments/:id
// Returns the full profile including projects, financials, updates, datasets
export const getDepartmentById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const department = await GovernmentDepartment.findById(id);

    if (!department) {
      sendError(res, 404, 'Department not found.');
      return;
    }

    sendSuccess(res, 200, 'Department fetched successfully.', { department });
  } catch (err) {
    next(err);
  }
};
