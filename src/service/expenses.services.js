import BudgetList from "../models/BudgetList.modules.js";
import Expense from "../models/expences.modules.js";
import { expensesRepo } from '../repo/expenses.repo.js'
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import CustomError from "../utils/customError.js";






export const expensesService = {


    newExpense: async (data = {}) => {

        if (!data.amount || !data.category || !data.description || !data.date || !data.type || !data.userId) new CustomError('All fields are required', 400)

        const expense = await Expense.create(data);
        return expense;

    },

    findExpensesById: async (id) => {

        if(!id)  new CustomError('User ID is required', 400)

        const expense = await expensesRepo.findExpensesData(id);

        if (!expense || expense.length === 0) new CustomError('Expenses not found', 404);



        return expense;

    },

    BudgetList: async (title, id) => {
        

        if (!title || !id)  new CustomError('Titlea nd ID is required', 400);
     
        const budgetList = await BudgetList.create({title, userId: id});
        return budgetList;

    },

    findBudgetList: async (userId) => {
         if(!userId) throw  new CustomError('User ID is required', 400)
            

        const budgetList = await BudgetList.find({userId});

        if (!budgetList.length) throw new CustomError('No budget found', 404);


        return budgetList;

    },


    findByIdAndDelete: async (id) => {

         if(!id)  new CustomError('User ID is required', 400)

        const deletedBudgetList = await BudgetList.findByIdAndDelete(id);
        return deletedBudgetList;

    },

    findByIdAndUpdate: async (id, data) => {

         if(!id || data)  new CustomError('User ID and title is required', 400)

        const updatedBudgetList = await BudgetList.findByIdAndUpdate(id, data, { new: true });

        if (!updatedBudgetList) new CustomError('title not found', 404);

        return updatedBudgetList;
    }

}