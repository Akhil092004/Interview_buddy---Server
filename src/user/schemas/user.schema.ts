import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import { Types, ObjectId } from 'mongoose';


@Schema({timestamps:true})
export class User{

    @Prop({required:true})
    username:string;

    @Prop({required:true,unique:[true,"Email already exists"]})
    email:string;

    @Prop({required:true})
    password:string;

    @Prop({type:String,default:"user"})
    role:string;

    @Prop({type:Number,default:40})
    credits:number;

    @Prop({type:[Types.ObjectId],ref:"Question",default:[]})
    markedQuestions:ObjectId[];

    @Prop({type:[Types.ObjectId],ref:"Session",default:[]})
    pastSessions:ObjectId[];

    @Prop({ type: Date })
    lastLogin:Date;
}

export const UserSchema = SchemaFactory.createForClass(User);