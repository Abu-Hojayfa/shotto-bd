import { Request, Response, NextFunction } from 'express';
import Grievance from '../models/Grievance';
import { sendSuccess, sendError } from '../utils/response';

// ── Submit Grievance ──────────────────────────────────────────────────────────
// POST /api/grievances
// Citizen submits a new grievance against a department
export const submitGrievance = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { departmentId, description, submittedBy } = req.body;

    if (!departmentId || !description || !description.trim()) {
      sendError(res, 422, 'Department ID and description are required.');
      return;
    }

    const grievance = new Grievance({
      departmentId,
      description: description.trim(),
      submittedBy: submittedBy || undefined,
    });

    await grievance.save();

    sendSuccess(res, 201, 'Grievance submitted successfully.', {
      trackingId: grievance.trackingId,
      status: grievance.status,
      createdAt: grievance.createdAt,
    });
  } catch (err) {
    next(err);
  }
};

// ── Track Grievance ───────────────────────────────────────────────────────────
// GET /api/grievances/track/:trackingId
// Citizen checks status using their tracking ID (e.g. GRV-2026-AB12CD)
export const trackGrievance = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { trackingId } = req.params;

    const grievance = await Grievance.findOne({ trackingId })
      .select('trackingId description status responseNote resolvedAt createdAt updatedAt')
      .populate('departmentId', 'name nameBangla');

    if (!grievance) {
      sendError(res, 404, `No grievance found with tracking ID: ${trackingId}`);
      return;
    }

    sendSuccess(res, 200, 'Grievance found.', { grievance });
  } catch (err) {
    next(err);
  }
};

// ── Get Grievances by Department ──────────────────────────────────────────────
// GET /api/grievances/department/:departmentId
// Admin: fetch all grievances for a specific department
export const getGrievancesByDepartment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { departmentId } = req.params;
    const { status } = req.query;

    const query: Record<string, unknown> = { departmentId };
    if (status && status !== 'all') {
      query.status = status;
    }

    const grievances = await Grievance.find(query)
      .sort({ createdAt: -1 });

    sendSuccess(res, 200, 'Grievances fetched.', {
      total: grievances.length,
      grievances,
    });
  } catch (err) {
    next(err);
  }
};
