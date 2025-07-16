import express from 'express';
import { createUser } from '../controllers/userController.mjs';
// import { authentication, authorization } from "../auth/authentication.mjs";

const router = express.Router();

// API's here
// router.get('/',authentication, /*API function here*/);
// router.post('/register', createUser);
// router.put("/update/:userid", authentication, authorization, /* API function here */);

export default router;