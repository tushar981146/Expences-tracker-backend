import express from 'express'


const router = express.Router();

import { getExpenses, addExpense, addTitleList, fetchTitleList, updateTitleList, deleteTitleList } from '../controllers/expense.controllers.js';
import { protectRoute } from "../middleware/middleware.js"




router.post('/title', protectRoute, addTitleList);
router.get('/title-fetch', protectRoute, fetchTitleList);
router.get('/get/:id', protectRoute, getExpenses);
router.post('/add/:id', protectRoute, addExpense);
router.put('/title-update/:id', protectRoute, updateTitleList);
router.delete('/title-delete/:id', protectRoute, deleteTitleList);


export default router;