import mongoose from 'mongoose';

const todoSchema: any = new mongoose.Schema ({
    name: {
        required: [true, `Todo owner can't be empty`],
        type: String,
        trim: true,
        minlength: [3, `Name can't be less than 3 characters`]
    },
    user_id: {
        type: mongoose.Types.ObjectId,
        required: [true, `user_id filed can't can't be empty`],
    },

    activity: {
        required: [true, `activity can't be empty`],
        type: String,
        trim: true,
        minlength: [3, `Activity can't be less than 3 characters`]
    },
    email: {
        type: String,
        trim: true,
        minlength: [3, `Activity can't be less than 3 characters`]
    },
    username: {
        type: String,
        trim: true,
        minlength: [3, `Activity can't be less than 3 characters`]
    }
},
{timestamps: true})

 const todo = mongoose.model('TodoDatabase', todoSchema)
 export default todo;