import express from 'express';
import {createTodo, getSingleTodo, getTodo} from '../controller/todoController'


const router = express.Router();

router.post('/create-todo', createTodo)

router.route('/:id').get(getSingleTodo);

router.route('/').get(getTodo);

router.patch('/');

router.delete('/');


export default router;