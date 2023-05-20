import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: [true, "Firstname is needed"]
        },
        lastname: {
            type: String,
            required: [true, "Lastname is needed"]
        },
        profilephoto: {
            type: String,
        },
        email: {
            type: String,
            required: [true, "Firstname is needed"]
        },
        password: {
            type: String,
            required: [true, "password is needed"]
        },
        
        isBlocked: {
            type: Boolean,
            default: false
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        role: {
            type: String,
            enum: ["Admin", "Client", "Guest"]
        },
        
    },
    {
        timestamps: true,
        toJSON: { virtuals: true }
    }
);


const User = mongoose.model("User", userSchema)

export default User;
