import mongoose from 'mongoose';
import Expense from '../models/expences.modules.js';


export const expensesRepo = {
    findExpensesData: async (data) => {
         const expenses = await Expense.find({ userId: new mongoose.Types.ObjectId(data) });

        return expenses;
    },
}