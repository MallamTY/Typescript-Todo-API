import express from 'express';
import {createTodo, deleteTodo, getSingleTodo, getAllTodo, updateTodo} from '../controller/todoController'
import userAuth from '../middleware/authentication';


const router = express.Router();

router.route('/create-todo').post(userAuth,createTodo)

router.route('/:id').get(userAuth,getSingleTodo).put(userAuth,updateTodo);

router.route('/').get(userAuth,getAllTodo);

router.route('/:id').delete(userAuth,deleteTodo);


export default router;