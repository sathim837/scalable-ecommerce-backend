import mongoose, {Schema} from "mongoose";


export interface IUser {
    name: string;
    email: string;
    password: string;
    role: "user" | "admin";
    isBlocked: boolean;
}

const userSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: true, 
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
            lowecase: true,
            select: false,
            trim: true,
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        isBlocked: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

export const User = mongoose.model<IUser>("User", userSchema);