import { RequestHandler} from "express";
import Todo from "../model/dbModel";



class TodoBluePrint {

    constructor( public activity: string, public name: string){
    }
    public deleteTodo(){
        console.log(`This method carry out deletion`);
        
    }
}

export const createTodo: RequestHandler = async (req, res, next) => {
   try {
    const {name, activity} = req.body
    let todoDB: TodoBluePrint = new TodoBluePrint(activity, name)
    console.log(todoDB);
    
    todoDB = await Todo.create(todoDB)
    res.status(200).json({
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
        const {id}= req.params;

        let todoDB = await Todo.findById(id)
        if (todoDB) {
            return res.status(200).json({
                status: `Success ...............`,
                todoDB
            })  
        }
        return res.status(201).json({
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

export const getTodo: RequestHandler = async(req, res, next) => {
    try {
        let todoDB = await Todo.find();
        if (todoDB.length > 0) {
            return res.status(200).json({
                status: `Succss ..........`,
                todoDB
            })
        }else {
            return res.status(201).json({
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

// export const deleteTodo: RequestHandler = async(req, res, next) {
//     try {
        
//     } catch () {
        
//     }
// }

// export const getTodo: RequestHandler = (req, res, next) => {
//     res.send(`Welcome to my Page ..................`)
// }

