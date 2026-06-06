import { Request, Response, NextFunction } from 'express';
import Report from '../models/Report';
import { sendSuccess, sendError } from '../utils/response';

// ── Get All Reports ───────────────────────────────────────────────────────────
// GET /api/reports
// Fetches all reports from the admin_dashboard collection
export const getAllReports = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const reports = await Report.find({}).sort({ date: -1 });
    sendSuccess(res, 200, 'Reports fetched successfully.', { reports });
  } catch (err) {
    next(err);
  }
};

// ── Update Report Status ──────────────────────────────────────────────────────
// PUT /api/reports/:id/status
// Updates the status and admin remarks of a single report
export const updateReportStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { status, remarks } = req.body;

    // Validate status value
    const validStatuses = ['Pending', 'In Progress', 'Resolved'];
    if (status && !validStatuses.includes(status)) {
      sendError(res, 422, 'Invalid status value. Must be Pending, In Progress, or Resolved.');
      return;
    }

    // Build the update object
    const updates: Record<string, unknown> = {};
    if (status !== undefined) updates.status = status;
    if (remarks !== undefined) updates.remarks = remarks;

    // Find by the human-readable "id" field (e.g. SR-8921), not MongoDB _id
    const report = await Report.findOneAndUpdate(
      { id: id },
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!report) {
      sendError(res, 404, 'Report not found.');
      return;
    }

    sendSuccess(res, 200, 'Report updated successfully.', { report });
  } catch (err) {
    next(err);
  }
};
