import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class createAnswerDto{
    @IsString()
    @IsNotEmpty()
    userId:string

    @IsString()
    @IsNotEmpty()
    questionId:string

    @IsString()
    @IsNotEmpty()
    answerText:string

    @IsString()
    aiFeedback?:string

    @IsNumber()
    aiRating?:number
    
}