import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {  Types } from "mongoose";


@Schema({timestamps:true})
export class Question{
    @Prop({required:true})
    questionText:string;

    @Prop({required:true})
    topic:string;

    @Prop({default:"medium"})
    difficulty:string;


    @Prop({type:Types.ObjectId,ref:"User",required:true})
    createdBy: Types.ObjectId;

    @Prop({type:[String]})
    hints: string[];

}

export const QuestionSchema = SchemaFactory.createForClass(Question);