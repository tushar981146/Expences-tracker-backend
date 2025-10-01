import express from 'express'
import { connectDB } from './libs/db.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';


import authRouters from './routes/auth.routers.js';
import expensesRouters from './routes/expense.router.js';

dotenv.config();
const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser({ limit: '10mb', extended: true }));
app.use(cors({
  origin: process.env.link || "http://localhost:5173",
  credentials: true,
}))


app.use("/api/auth", authRouters);
app.use("/api/expenses", expensesRouters);




const PORT = 5001;

try {
  connectDB();
} catch (error) {
  console.error("database connection error", error);
}

app.listen(PORT, () => {
  console.log(`Server is running on port, http://localhost:${PORT}`);
  
});
