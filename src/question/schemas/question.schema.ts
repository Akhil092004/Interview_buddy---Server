import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";



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

    @Prop({type:[String]})
    hints: string[];

}

export const QuestionSchema = SchemaFactory.createForClass(Question);