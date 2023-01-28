import User from '../model/userModel';
import bcrypt from 'bcrypt';
import validator from 'validator';
import { RequestHandler } from 'express';



type returnTodo = object | null;
export const registerUser: RequestHandler = async(req, res, next) => {
   try {
    let reqbody: {
        firstname: string;
        lastname: string;
        username: string;
        email: string;
        password: string;
        confirmpassword: string;
    }
    reqbody = req.body

    if (!(reqbody.firstname && reqbody.lastname && req.body.username && reqbody.email && reqbody.password && reqbody.confirmpassword)) {
        return res.status(406).json({
            status: `Failed !!!!!`,
            message: `All fields must be fieled`
        })
    }
    if (!validator.isEmail(reqbody.email)) {
        return res.status(406).json({
            status: `Failed !!!!!`,
            message: `Invalid email address supplied`
        })
    }
    if (!validator.isStrongPassword(reqbody.password) && !validator.isStrongPassword(reqbody.confirmpassword)) {
        return res.status(406).json({
            status: `Failed !!!!!`,
            message: `Password not strong enough !!!!!`
        })
    }
    if (reqbody.password !== reqbody.confirmpassword) {
        return res.status(406).json({
            status: `Failed !!!!!`,
            message: `Password not match !!!!`
        })
    }

    let dbUser: returnTodo = await User.findOne({$or: [{email: reqbody.email}, {username: reqbody.username}]});
    const salt: string = await bcrypt.genSalt(10);
    const hashedPassword: string = await bcrypt.hash(reqbody.password, salt)
    const hashedConfirmedPassword: string = await bcrypt.hash(reqbody.confirmpassword, salt);

    if (dbUser) {
        return res.status(404).json({
            status: `Failed !!!!!`,
            message: `User with ${reqbody.email} or ${reqbody.username} already exist in our database !!!!`
        })
    }

    dbUser = await User.create({...req.body})
    return res.status(201).json({
        status: `Success !!!!!`,
        message: `Account successfully created !!!!`,
        user: dbUser
    })
    
   } catch (error) {
    res.status(500).json({
        status: `Failed !!!!!!!!!!!!`,
        message: `Unable to create an accounting due to server error !!!!!!!!!`
    })
   }
}
