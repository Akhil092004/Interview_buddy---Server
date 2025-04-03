import {Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({timestamps:true})
export class Answer{

    @Prop({type:Types.ObjectId,ref:"User",required:true})
    userId: Types.ObjectId;

    @Prop({type:Types.ObjectId,ref:"Question",required:true})
    questionId: Types.ObjectId;

    @Prop({type:String,required:true})
    answerText:string

    @Prop({type:Number,default:0})
    aiRating:number

    @Prop({type:String,default:""})
    aiFeedback:string
    
}


export const AnswerSchema = SchemaFactory.createForClass(Answer)