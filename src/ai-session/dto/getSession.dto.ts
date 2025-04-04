import { IsNotEmpty, IsString } from "class-validator";


export class getSessionDto {
    @IsNotEmpty()
    @IsString()
    userId: string;
}