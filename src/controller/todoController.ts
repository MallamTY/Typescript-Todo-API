import { RequestHandler} from "express";
import mongoose from "mongoose";
import Todo from "../model/todoModel";
import user from "../model/userModel";



class TodoBluePrint {

    constructor( public user_id: string, public activity: string, public name: string, public email?: string, public username?: string,){
    }
    public deleteTodo(){
        console.log(`This method carry out deletion`);
        
    }
}

interface returnedArrayTodo {
    length: number
}

type returnTodo = object | null | object[];




export const createTodo: RequestHandler = async (req, res, next) => {

    try {
    const {user_id, email, username} = req.user;
    
    const {name, activity} = req.body
    let todoDB: TodoBluePrint = new TodoBluePrint(user_id, activity, name, email, username)
    
    todoDB = await Todo.create(todoDB)
    res.status(201).json({
        message: `Todo successfully created`,
        todoDB
    })
   } catch (error: any) {
    res.status(500).json({
        message: error.message
    })
   }
}

export const getSingleTodo: RequestHandler = async(req, res, next) => {
    try {
        const {user_id} = req.user;
        const {id}= req.params;
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                status: `Failed !!!!!!!!!`,
                message: `${id} is not a valid object id required !!!!!!`
            }) 
        }
        let todoDB: returnTodo = await Todo.findOne({$and: [{_id: id}, {user_id}]})
        console.log(id, user_id);
        
        if (todoDB) {
            return res.status(200).json({
                status: `Success ...............`,
                todoDB
            })  
        }
        return res.status(404).json({
            status: `Success ...............`,
            message: `Task with task id: ${id} is not found in the database !!!`
        })
        
    } catch (error: any) {
        res.status(500).json({
            status: `Failed ..........`,
            message: error.message
        })
       
    }
}

export const getAllTodo: RequestHandler = async(req, res, next) => {
    try {
        const {user_id} = req.user;
        let todoDB: returnedArrayTodo = await Todo.find({user_id: user_id});
        if (todoDB.length > 0) {
            return res.status(200).json({
                status: `Succss ..........`,
                noOfTasks: todoDB.length,
                todoDB
            })
        }else {
            return res.status(404).json({
                message: `No task found in your list`
            })
        }
        
        
    } catch (error: any) {
        res.status(500).json({
            status: `Failed !!!!!!!!!!!`,
            mesage: error.message
        })
    }
}

export const deleteTodo: RequestHandler = async(req, res, next) => {
    try {
        const {user_id} = req.user;
        const {id}= req.params;
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                status: `Failed !!!!!!!!!`,
                message: `${id} is not a valid object id required !!!!!!`
            }) 
        }

        let deletedTodo = await Todo.findOneAndDelete({$and: [{_id: id}, {user_id: user_id}]})
        if (deletedTodo) {
            return res.status(200).json({
                status: `Success .........`,
                message: `Task with id: ${id} has been removed from our database ......`
            })
        }
        return res.status(404).json({
            status: `Failed !!!!!!!!!`,
            message: `Task with id: ${id} not found in our database ......`
        })
    } 
    catch (error: any) {
        res.status(500).json({
            status: `Failed !!!!!!!!!!!`,
            mesage: error.message
        }) 
    }
}

export const updateTodo: RequestHandler = async(req, res, next) => {
    try {
        
        const {params: {id},
                body, 
                user: {user_id}
                             } = req;
        if(!id) {
            return res.status(201).json({
                status: `Failed !!!!!!!!!`,
                message: `Todo ID must be specified`
            }) 
        }
        else{
            if(!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({
                    status: `Failed !!!!!!!!!`,
                    message: `${id} is not a valid object id required !!!!!!`
                }) 
            }
            const updatedTodo: returnTodo = await Todo.findOneAndUpdate({$and: [{_id: id}, {user_id: user_id}]}, body, {new: true})
            if (updatedTodo) {
                
                return res.status(200).json({
                    status: `Success !!!!!!!!!`,
                    message: `Todo with id: ${id} has been updated successfully`,
                    updatedTodo
                    
                })
            }
            return res.status(404).json({
                status: `Failed !!!!!!!!!`,
                message: `Todo with id: ${id} is not found in our database`
            })
        }
    } catch (error: any) {
        res.status(500).json({
            status: `Failed !!!!!!!!!!!`,
            message: error.message
        })
    }
}

