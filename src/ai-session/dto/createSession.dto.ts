import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class createSessionDto {
    @IsNotEmpty()
    @IsString()
    createdBy: string;

    @IsNotEmpty()
    @IsNotEmpty()
    qaPairs: QaPairDto[];

    @IsNotEmpty()
    @IsString()
    feedback: string;

    @IsNotEmpty()
    @IsNumber()
    rating: number;
}

export class QaPairDto {
    @IsNotEmpty()
    @IsString()
    questionText: string;

    @IsNotEmpty()
    @IsString()
    answerText: string;

    @IsNotEmpty()
    @IsNumber()
    rating: number;

    @IsNotEmpty()
    @IsString()
    feedback: string;

    @IsNotEmpty()
    @IsNumber()
    timeTaken: number;
}