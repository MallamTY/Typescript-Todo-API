import express from 'express';
import {createTodo, deleteTodo, getSingleTodo, getTodo, updateTodo} from '../controller/todoController'


const router = express.Router();

router.post('/create-todo', createTodo)

router.route('/:id').get(getSingleTodo).put(updateTodo);

router.route('/').get(getTodo);

router.route('/:id').delete(deleteTodo);


export default router;