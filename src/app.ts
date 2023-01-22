import express, {Request, Response, NextFunction} from 'express';
import todoRoutes from './routes/todoRoutes'
import { MONGO_URI, configType, PORT} from './assessories/configuration'
import connectDB from './dbConnect/dbConnect';
import morgan from 'morgan';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(morgan('common'));
app.use(express.json());
app.use('/todo', todoRoutes);



app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({
        message: err.message
    })
})

const startUp = async() => {
    try {
        const port: configType = PORT || 5000;
        await connectDB(MONGO_URI)
        app.listen(port,() => console.log(`\nTodo-API running on port ${port}......`))
        
     } catch (error: any) {
         console.log(`${error.message} was encountered while trying to connect to the database`);
         process.exit(1)
         
     }
     
}

startUp()