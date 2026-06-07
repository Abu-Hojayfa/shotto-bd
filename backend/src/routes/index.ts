import { Application } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import officeRoutes from './office.routes';
import reportRoutes from './report.routes';
import departmentRoutes from './department.routes';
import grievanceRoutes from './grievance.routes';

export const registerRoutes = (app: Application): void => {
  app.use('/api/auth',        authRoutes);
  app.use('/api/users',       userRoutes);
  app.use('/api/offices',     officeRoutes);
  app.use('/api/reports',     reportRoutes);
  app.use('/api/departments', departmentRoutes);
  app.use('/api/grievances',  grievanceRoutes);
};