import express from 'express';
import {createTodo} from '../controller/todoController'


const router = express.Router();

router.post('/create-todo', createTodo)

router.get('/', (req, res, next) => {
    res.json(`Welcome to my Page ..................`)
}
);

router.patch('/');

router.delete('/');


export default router;