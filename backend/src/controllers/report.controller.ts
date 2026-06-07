import { Request, Response, NextFunction } from 'express';
import Report from '../models/Report';
import User from '../models/User';
import { verifyAccessToken } from '../utils/jwt';
import { sendSuccess, sendError } from '../utils/response';
import { AuthenticatedRequest } from '../types';

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

// ── Create Report ─────────────────────────────────────────────────────────────
// POST /api/reports
// Submits a new report (supports both anonymous and logged-in users)
export const createReport = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id, title, category, location, description, date, priority, evidence } = req.body;

    if (!category || !location || !description) {
      sendError(res, 422, 'Category, location, and description are required.');
      return;
    }

    let reporterId = null;
    let reporterName = 'Anonymous';

    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      try {
        const decoded = verifyAccessToken(token);
        const user = await User.findById(decoded.userId).select('_id fullName');
        if (user) {
          reporterId = user._id;
          reporterName = user.fullName;
        }
      } catch (err) {
        // Fall back to anonymous on invalid token
      }
    }

    const reportId = id || `STB-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    const newReport = new Report({
      id: reportId,
      title: title || `${category.replace('-', ' ')} Report at ${location}`,
      category,
      location,
      description,
      date: date || new Date().toISOString().split('T')[0],
      status: 'Pending',
      reporter: reporterName,
      reporterId,
      priority: priority || 'Medium',
      evidence: evidence || [],
    });

    await newReport.save();

    if (reporterId) {
      await User.findByIdAndUpdate(reporterId, { $inc: { reportsSubmitted: 1 } });
    }

    sendSuccess(res, 201, 'Report created successfully.', { report: newReport });
  } catch (err) {
    next(err);
  }
};

// ── Get My Reports ────────────────────────────────────────────────────────────
// GET /api/reports/my-reports
// Fetches reports submitted by the logged-in user
export const getMyReports = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = (req as AuthenticatedRequest).user.userId;
    const reports = await Report.find({ reporterId: userId }).sort({ createdAt: -1 });
    sendSuccess(res, 200, 'User reports retrieved successfully.', { reports });
  } catch (err) {
    next(err);
  }
};

// ── Get Report Stats ──────────────────────────────────────────────────────────
// GET /api/reports/stats
// Public endpoint for dashboard statistics
export const getReportStats = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { district } = req.query;
    const query: Record<string, unknown> = {};

    if (district && district !== 'all') {
      query.location = { $regex: new RegExp(district as string, 'i') };
    }

    const totalReports = await Report.countDocuments(query);
    const resolvedReports = await Report.countDocuments({ ...query, status: 'Resolved' });
    const underReviewReports = await Report.countDocuments({
      ...query,
      status: { $in: ['Pending', 'In Progress'] }
    });

    const resolutionRate = totalReports > 0 ? (resolvedReports / totalReports) * 100 : 0;

    sendSuccess(res, 200, 'Stats fetched successfully.', {
      totalReports,
      resolvedReports,
      underReviewReports,
      resolutionRate: Number(resolutionRate.toFixed(1))
    });
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
