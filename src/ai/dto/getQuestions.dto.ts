import { IsIn, IsNotEmpty, IsString } from "class-validator"

export class getQuestionsDto{

    @IsString()
    @IsNotEmpty()
    topic:string

    @IsString()
    @IsNotEmpty()
    role:string

    @IsString()
    @IsNotEmpty()
    @IsIn(["Easy","Medium","Hard"])
    difficulty:string
}