import BudgetList from "../models/BudgetList.modules.js"
import Expense from "../models/expences.modules.js"


export const getExpenses = async (req, res) => {
    try {

        const userId = req.params.id;
        await Expense.find({ userId }).then((expenses) => {

            res.status(200).json(expenses);

        }).catch((error) => {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        });
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

        

        const newExpense = new Expense({
            userId,
            amount,
            category,
            type,
            description,
            date
        });
        const data = await newExpense.save();

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
        const newTitle = new BudgetList({
            userId,
            title
        });
        await newTitle.save();
        res.status(201).json(newTitle);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


export const fetchTitleList = async (req, res) => {
    try {
        const userId = req.user._id;
        const titles = await BudgetList.find({ userId });

        res.status(200).json(titles);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


export const deleteTitleList = async (req, res) => {
    try {
        const { id } = req.params;
        await BudgetList.findByIdAndDelete(id);
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
        const updatedTitle = await BudgetList.findByIdAndUpdate(id, { title }, { new: true });
        if (!updatedTitle) {
            return res.status(404).json({ message: 'Title not found' });
        };
        res.status(200).json(updatedTitle);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    };
};