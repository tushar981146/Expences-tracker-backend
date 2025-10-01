import express from 'express'
import { signup, login, logout, updateProfile, checkAuth, generalupdate, passwordUpdate } from '../controllers/auth.controllers.js';
import { protectRoute } from "../middleware/middleware.js"

const router = express.Router();


router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.put('/update-profile', protectRoute ,updateProfile)
router.put('/general-update', protectRoute ,generalupdate)
router.put('/password-update', protectRoute ,passwordUpdate)
router.get('/check', protectRoute, checkAuth)

export default router;