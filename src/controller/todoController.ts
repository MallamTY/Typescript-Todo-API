import { RequestHandler} from "express";
import Todo from "../model/dbModel";



class TodoBluePrint {

    constructor( public activity?: string, public name?: string, public id?: string){

    }
    delete(id: string){
        Todo.findByIdAndDelete(id)
    }
}

export const createTodo: RequestHandler = async (req, res, next) => {
   try {
    const {name, activity} = req.body
    let todoDB: TodoBluePrint = new TodoBluePrint(name, activity)
    console.log(todoDB);
    
    todoDB = await Todo.create({...todoDB})
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

// export const deleteTodo: RequestHandler = async(req, res, next) {
//     try {
        
//     } catch () {
        
//     }
// }

// export const getTodo: RequestHandler = (req, res, next) => {
//     res.send(`Welcome to my Page ..................`)
// }

