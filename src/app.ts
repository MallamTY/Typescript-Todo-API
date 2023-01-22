import express, {Request, Response, NextFunction} from 'express';
import todoRoutes from './routes/todoRoutes'

const app = express();

app.use('/todo/v1', todoRoutes)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({
        message: err.message
    })
})

app.listen(5000)
