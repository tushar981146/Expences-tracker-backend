import express from 'express'
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { rateLimit } from 'express-rate-limit';
import helmet from 'helmet';
import CustomError from './utils/customError.js';

import authRouters from './routes/auth.routers.js';
import expensesRouters from './routes/expense.router.js';
import config from './config/index.js';
import errorHandler from './controllers/error.controllers.js';

dotenv.config();



const app = express();

app.set("trust proxy", 1)

app.use(express.json({ limit: '10mb' }));
app.use(cookieParser({ limit: '10mb', extended: true }));


app.use(cors({
  origin: config.cors.origin,
  credentials: config.cors.credentials,
  methods: config.cors.methods,
}))




app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});



app.use(limiter);

app.use(`${config.api.prefix}${config.api.route.auth}`, authRouters);
app.use(`${config.api.prefix}${config.api.route.expenses}`, expensesRouters);







app.use((req, res, next) => {

  const err = new CustomError(`can't find this route ${req.originalUrl} on server`, 404);

  next(err)
})



app.use(errorHandler)




export default app;





