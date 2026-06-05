import { Application } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import reportRoutes from './report.routes';

export const registerRoutes = (app: Application): void => {
  app.use('/api/auth',    authRoutes);
  app.use('/api/users',  userRoutes);
  app.use('/api/reports', reportRoutes);
};

