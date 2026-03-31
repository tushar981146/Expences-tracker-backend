import { expensesService } from "../service/expenses.services.js";
import asyncErrorHandler from '../utils/asyncErrorHandler.js'


export const getExpenses = asyncErrorHandler(async (req, res) => {


    const expenses = await expensesService.findExpensesById(req.params.id);


    res.status(200).json(expenses);
})

export const addExpense = asyncErrorHandler(async (req, res) => {



    const { amount, category, description, date, type } = req.body;
    const userId = req.params.id;

    const data = await expensesService.newExpense({ amount, category, description, date, type, userId });
    res.status(201).json(data);


})


export const addTitleList = asyncErrorHandler(async (req, res) => {
    const { title } = req.body;
    const userId = req.user._id;

    const newTitle = await expensesService.BudgetList(
        title,
        userId
    );
    res.status(201).json(newTitle);


})


export const fetchTitleList = asyncErrorHandler(async (req, res) => {

    const userId = req.user._id;
   
    const titles = await expensesService.findBudgetList(userId);

    res.status(200).json(titles);

})


export const deleteTitleList = asyncErrorHandler(async (req, res) => {

    const { id } = req.params;
    await expensesService.findByIdAndDelete(id);
    res.status(204).send();

})


export const updateTitleList = asyncErrorHandler(async (req, res) => {

    const { id } = req.params;
    const { title } = req.body;
    
    const updatedTitle = await expensesService.findByIdAndUpdate(id, { title }, { new: true });
    
    res.status(200).json(updatedTitle);

})