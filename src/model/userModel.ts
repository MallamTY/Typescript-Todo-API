import mongoose from "mongoose";

const userSchema: mongoose.Schema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, `Firstname field can't be empty !!!!!!!!`],
        trim: true,
        minlength: [3, `Firstname field can't be less than 3 characters !!!!!!!!`],
        maxlength: [50, `Firstname field can't be more than 50 characters !!!!!!!!`]
    },
    lastname: {
        type: String,
        required: [true, `Lastname field can't be empty !!!!!!!!`],
        trim: true,
        minlength: [3, `Lastname field can't be less than 3 characters !!!!!!!!`],
        maxlength: [50, `Lastname field can't be more than 50 characters !!!!!!!!`]
    },
    username: {
        type: String,
        required: [true, `username field can't be empty !!!!!!!!`],
        trim: true,
        minlength: [3, `usernname field can't be less than 3 characters !!!!!!!!`],
        unique: true
    },
    email: {
        type: String,
        required: [true, `email field can't be empty !!!!!!!!`],
        trim: true,
        minlength: [3, `email field can't be less than 3 characters !!!!!!!!`],
        unique: true
    },
    password: {
        type: String,
        required: [true, `password field can't be empty !!!!!!!!`],
        minlength: [3, `password can't be less than 8 characters !!!!!!`],
    },
    confirmpassword: {
        type: String,
        required: [true, `password field can't be empty !!!!!!!!`],
        minlength: [3, `password can't be less than 8 characters !!!!!!`],
    }

},
{timestamps: true})


const user = mongoose.model('UserDatabase', userSchema)
export default user;