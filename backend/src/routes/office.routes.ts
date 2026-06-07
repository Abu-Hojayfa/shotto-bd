import { Router } from 'express';

import {
  getOffices,
  addReview,
} from '../controllers/office.controller';

const router = Router();

router.get('/', getOffices);

router.post('/review', addReview);

export default router;