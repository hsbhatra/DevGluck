import express from 'express';
import { createUser } from '../controllers/userController.mjs';

const router = express.Router();

// API's here
router.post('/register', createUser);

export default router;