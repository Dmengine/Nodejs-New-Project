import express, { Request, Response} from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { Connect } from './MongoDB/ConnectDB';
import AuthRoute from './route/auth.route';
import ProductRoute from './route/product.route';

const app = express();
app.use(express.json({limit: '10mb'}))
app.use(express.urlencoded({limit: '10mb'}))
app.use(express.json())
app.use('/api', AuthRoute);
app.use('/api', ProductRoute)

const PORT = process.env.PORT || 3000;

app.get('/', (req:Request, res:Response) => {
    res.send("Welcome")
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

Connect()