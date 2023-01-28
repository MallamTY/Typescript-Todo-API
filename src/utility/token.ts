import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../assessories/configuration";


export const tokenGenerator = (user_id: string, email?:string, username?:string) => {
    let token: string = '';
    if (!email) {
        return token = jwt.sign({user_id, username}, JWT_SECRET, {expiresIn: '2h'})
    }
    else if(!username) {
        return token = jwt.sign({user_id, email}, JWT_SECRET, {expiresIn: '2h'})
    }
    else if (!email && !username) {
        return token = jwt.sign({user_id}, JWT_SECRET, {expiresIn: '2h'})
    }
}


export const verifyToken = (token: string, JWT_SECRET: string) => {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    return decodedToken;
}