import mongoose,{Schema} from "mongoose";


export interface AuthDocument extends mongoose.Document {
    username: string;
    email: string;
    password: string;
    role:{type:string,default:"user"};
    lastLogin:Date;
    createdAt:Date;
    updatedAt:Date;
}

export const AuthSchema: Schema<AuthDocument> = new Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:[true,"Email already exists"]
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"user"
    },
    lastLogin:{
        type:Date
    }


},{timestamps:true});

export const AuthModel = mongoose.model<AuthDocument>("Auth",AuthSchema);