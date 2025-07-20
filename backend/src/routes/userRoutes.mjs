import express from 'express';
import {
    deactivateUser,
    softDeleteUser
} from '../controllers/userController.mjs';
import { protect } from '../middleware/authMiddleware.mjs';

const router = express.Router();

router.put('/deactivate', protect, deactivateUser);
router.delete('/delete', protect, softDeleteUser);


export default router;