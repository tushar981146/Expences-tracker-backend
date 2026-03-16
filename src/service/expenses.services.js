import BudgetList from "../models/BudgetList.modules.js";
import Expense from "../models/expences.modules.js";
import {expensesRepo} from '../repo/expenses.repo.js'






export const expensesService = {
    

    newExpense: async(data ={}) => {
        try {
            const expense = await Expense.create(data);
            return expense;
        } catch (error) {
            console.error("Error creating expense service:", error);
            throw error;
        }
    },

    findExpensesById: async (id) => {
        try {
            const expense = await expensesRepo.findExpensesData(id);
            return expense;
        } catch (error) {
            console.error("Error finding expense service:", error);
            throw error;
        }
    },

    BudgetList: async(data ={}) => {
        try {
            const budgetList = await BudgetList.create(data);
            return budgetList;
        } catch (error) {
            console.error("Error creating budget list service:", error);
            throw error;
        }
    },

    findBudgetList: async(userId) => {
        try {
            const budgetList = await BudgetList.find({ userId });
            return budgetList;
        } catch (error) {
            console.error("Error finding budget list service:", error);
            throw error;
        }
    },


    findByIdAndDelete: async (id) => {
        try {
            const deletedBudgetList = await BudgetList.findByIdAndDelete(id);
            return deletedBudgetList;
        } catch (error) {
            console.error("Error deleting budget list service:", error);
            throw error;
        }
    },

    findByIdAndUpdate: async (id, data) => {
        try {
            const updatedBudgetList = await BudgetList.findByIdAndUpdate(id, data, { new: true });
            return updatedBudgetList;   
        } catch (error) {
            console.error("Error updating budget list service:", error);
            throw error;
        }
    }

}