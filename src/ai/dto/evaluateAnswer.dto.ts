import { IsNotEmpty, IsString } from "class-validator";

export class evaluateAnswer{

    @IsString()
    @IsNotEmpty()
    question:string

    @IsString()
    @IsNotEmpty()
    answer:string;
}