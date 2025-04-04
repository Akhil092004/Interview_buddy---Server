import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {  Types } from "mongoose";


@Schema({timestamps:true})
export class Question{
    @Prop({required:true})
    questionText:string;

    @Prop({required:true})
    topic:string;

    @Prop({type: [String]})
    tags: string[];

    @Prop({type:String,enum:["easy","medium","hard"],default:"medium"})
    difficulty:string;

    @Prop({type:Types.ObjectId,ref:"Answer",required:true})
    answer:Types.ObjectId;

    @Prop({type:[String]})
    hints: string[];

}

export const QuestionSchema = SchemaFactory.createForClass(Question);