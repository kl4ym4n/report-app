import express from 'express';
import { authController } from '../controllers/authController';

const router = express.Router();

router.post('/google', authController.googleAuth);

export default router; 