import { Request, Response, NextFunction } from 'express';
import Office from '../models/Office';
import Review from '../models/Review';
import { sendSuccess, sendError } from '../utils/response';

export const getOffices = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const offices = await Office.find();

    sendSuccess(res, 200, 'Offices fetched successfully', {
      offices,
    });
  } catch (err) {
    next(err);
  }
};

export const addReview = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { officeId, rating, comment } = req.body;

    const office = await Office.findById(officeId);

    if (!office) {
      sendError(res, 404, 'Office not found');
      return;
    }

    await Review.create({
      officeId,
      rating,
      comment,
    });

    const reviews = await Review.find({ officeId });

    const averageRating =
      reviews.reduce((sum, item) => sum + item.rating, 0) /
      reviews.length;

    office.averageRating = averageRating;
    office.totalReviews = reviews.length;

    await office.save();

    sendSuccess(res, 201, 'Review submitted successfully');
  } catch (err) {
    next(err);
  }
};