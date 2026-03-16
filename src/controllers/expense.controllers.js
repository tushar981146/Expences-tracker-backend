
import { expensesService } from "../service/expenses.services.js";


export const getExpenses = async (req, res) => {
    try {

        if(!req.params.id){
            return res.status(400).json({ message: 'User ID is required' });
        }

        
        const expenses = await expensesService.findExpensesById(req.params.id);


        if (!expenses || expenses.length === 0) {
            return res.status(404).json({ message: 'Expenses not found' });
        }

            res.status(200).json(expenses);

        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    };
};

export const addExpense = async (req, res) => {

    try {

        const { amount, category, description, date, type } = req.body;
        const userId = req.params.id;

        if (!amount || !category || !description || !date || !type || !userId) {
            return res.status(400).json({ message: 'All fields are required' });
        };

        const data = await expensesService.newExpense({ amount, category, description, date, type, userId });
        res.status(201).json(data);

    } catch (error) {
        console.error('Error adding expense:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


export const addTitleList = async (req, res) => {
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({ message: 'Title is required' });
    }

    try {
        const userId = req.user._id;
        const newTitle = await expensesService.BudgetList({
            userId,
            title
        });
        res.status(201).json(newTitle);

    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


export const fetchTitleList = async (req, res) => {
    try {
        const userId = req.user._id;
        const titles = await expensesService.findBudgetList(userId);

        res.status(200).json(titles);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


export const deleteTitleList = async (req, res) => {
    try {
        const { id } = req.params;
        await expensesService.findByIdAndDelete(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    };
};


export const updateTitleList = async (req, res) => {
    try {
        const { id } = req.params;
        const { title } = req.body;
        if (!title) {
            return res.status(400).json({ message: 'Title is required' });
        };
        const updatedTitle = await expensesService.findByIdAndUpdate(id, { title }, { new: true });
        if (!updatedTitle) {
            return res.status(404).json({ message: 'Title not found' });
        };
        res.status(200).json(updatedTitle);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    };
};