import express from 'express'
import { signup, login, logout, updateProfile, generalupdate, passwordUpdate, refreshToken } from '../controllers/auth.controllers.js';
import { protectRoute, signupValidator } from "../middleware/auth.middleware.js"

const router = express.Router();


router.post('/signup', signupValidator, signup);
router.post('/login', login);
router.post('/logout', logout);
router.put('/update-profile', protectRoute ,updateProfile)
router.put('/general-update', protectRoute ,generalupdate)
router.put('/password-update', protectRoute ,passwordUpdate)
router.get('/refresh', refreshToken)

export default router;