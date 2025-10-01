import mongoose from 'mongoose'


const BudgetSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: [true, 'User ID is required'], 
        index: true 
      },
    title: {
        type: String,
        required: true,
        unique: true,
    },
    
},
{
    timestamps: true,
})

const BudgetList = mongoose.model("BudgetList", BudgetSchema);
export default BudgetList;