import mongoose from 'mongoose'


const expenseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: [true, 'User ID is required'], 
    index: true 
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
  },
  type: {
    type: String,
    required: [true, 'Type is required'],
    enum: ['Income', 'Expense'], 
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    
  },
  date: {
    type: String,
    required: [true, 'Date is required'],
 
  }
}, {
  timestamps: true 
});


const Expense = mongoose.model('Expense', expenseSchema);


export default Expense;