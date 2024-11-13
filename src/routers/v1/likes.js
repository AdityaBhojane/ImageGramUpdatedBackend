import express from 'express';
import { isAuthenticated } from '../../middlewares/authMiddleware.js';
import { postLikes } from '../../controllers/likeController.js';

const router = express.Router();

router.post('/', isAuthenticated,  postLikes);

export default router;