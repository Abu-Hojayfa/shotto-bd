import {
  Request,
  Response,
  NextFunction,
} from "express";

import Emergency
  from "../models/Emergency";

import {
  sendSuccess,
} from "../utils/response";

import {
  getIO,
} from "../socket/socket";

export const createEmergency =
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {

    try {

      const emergency =
        await Emergency.create( {
          ...req.body,

          reporterName:
            req.body.reporterName ||
            "Anonymous Citizen",
        } );

      // realtime
      getIO().emit(
        "newEmergency",
        emergency
      );

      sendSuccess(
        res,
        201,
        "Emergency created",
        emergency
      );

    } catch ( err ) {

      next( err );
    }
  };

export const getEmergencies =
  async (
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {

    try {

      const emergencies =
        await Emergency.find()
          .sort( {
            createdAt: -1,
          } );

      sendSuccess(
        res,
        200,
        "Emergencies fetched",
        emergencies
      );

    } catch ( err ) {

      next( err );
    }
  };
