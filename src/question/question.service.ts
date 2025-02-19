import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Question } from './schemas/question.schema';
import mongoose, { Types } from 'mongoose';
import { QuestionDto } from './dto';

@Injectable()
export class QuestionService {
    constructor(
        @InjectModel(Question.name)
        private questionModel:mongoose.Model<Question>
    ){}


    async createQuestion(dto:QuestionDto):Promise<Question>{
        try {
            const {questionText,topic,difficulty = "Medium",createdBy,hints =[]} = dto;

            const question = new this.questionModel({
                questionText,
                topic,
                difficulty,
                createdBy : new Types.ObjectId(createdBy),
                hints
            })

            return await question.save();

        } catch (error) {
            throw new Error(error instanceof Error ? error.message : String(error));
        }
    }
}
