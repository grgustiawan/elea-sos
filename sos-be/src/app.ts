import express from 'express'
import router from './routes/UserRoutes'
import cookieParser from "cookie-parser"
import cors from 'cors'
import compression from 'compression'
import { rateLimit } from 'express-rate-limit'
import path from 'path'
import UserRouter from './routes/UserRoutes'
import MenuRoutes from './routes/MenuRoutes'
import CategoryRoutes from './routes/CategoryRoutes'
import SpecialOfferRoutes from './routes/SpecialOfferRoutes'
import PromotionRoutes from './routes/PromotionRoutes'
import FavoriteRoutes from './routes/FavoriteRoutes'
import CartRoutes from './routes/CartRoutes'
import CartitemRoutes from './routes/CartItemRoutes'
import OrderRoutes from './routes/OrderRoutes'
import TransactionRoutes from './routes/TransactionRoutes'
import PaymentMethodRoutes from './routes/PaymentMethodRoutes'
import ImageRoutes from './routes/ImageRoutes'
import RestaurantBranchRoutes from './routes/RestaruantRoutes'

const app = express()
app.use(cors({
    credentials: true,
    origin: '*'
}));
const limiter = rateLimit({
	windowMs: 1 * 1000,
	max: 100,
	standardHeaders: true,
	legacyHeaders: false,
});
app.use(limiter);
app.use(express.json())
app.use(router)
app.use(compression({ 
    level: 6,
    threshold: 100*1000,
}))
app.use(cookieParser())

app.use("/api", UserRouter)
app.use('/api', MenuRoutes);
app.use('/api', CategoryRoutes);
app.use('/api', SpecialOfferRoutes);
app.use('/api', PromotionRoutes);
app.use('/api', FavoriteRoutes);
app.use('/api', CartRoutes);
app.use('/api', CartitemRoutes);
app.use('/api', OrderRoutes);
app.use('/api', TransactionRoutes);
app.use('/api', PaymentMethodRoutes);
app.use('/api', ImageRoutes);
app.use('/api', RestaurantBranchRoutes);

app.locals.appRoot = path.resolve(__dirname, '..');

export default app;