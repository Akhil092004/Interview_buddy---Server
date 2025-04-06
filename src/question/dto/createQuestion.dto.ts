import {IsNotEmpty, IsString } from "class-validator";

export class createQuestionDto {
    @IsString()
    @IsNotEmpty()
    questionText: string;

    @IsNotEmpty()
    @IsString()
    topic: string;

    @IsString()
    @IsNotEmpty()
    difficulty: "Hard" | "Medium" | "Easy";

    @IsString({ each: true })
    tags?: string[];

    @IsString({ each: true })
    hints?: string[];
}