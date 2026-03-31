import mongoose from 'mongoose';
import Expense from '../models/expences.modules.js';


export const expensesRepo = {
    findExpensesData: async (data) => {
         const expenses = await Expense.find({ userId: new mongoose.Types.ObjectId(data) });

         if (!expenses) throw new CustomError('No expenses found for the given user ID.', 404);
        return expenses;
    },
}


expensesRepo.findExpensesData('69b7b7475f4812615c050d76')

