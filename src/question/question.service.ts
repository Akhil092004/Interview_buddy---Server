import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Question } from './schemas/question.schema';
import mongoose from 'mongoose';
import { createQuestionDto } from './dto';

@Injectable()
export class QuestionService {
  constructor(
    @InjectModel(Question.name)
    private questionModel: mongoose.Model<Question>,
  ) {}

  async createQuestion(dto: createQuestionDto): Promise<Question> {
    try {
      const {
        questionText,
        topic,
        difficulty = 'Medium',
        tags = [],
        hints = [],
      } = dto;

      const question = new this.questionModel({
        questionText,
        topic,
        difficulty,
        tags,
        hints,
      });

      return await question.save();
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : String(error));
    }
  }

  async getQuestions({
    topic,
    difficulty,
  }: {
    topic?: string;
    difficulty?: string;
  }) {
    try {
      const filter: { topic?: string; difficulty?: string } = {};
      
      if(topic) filter.topic = topic;
      if (difficulty) filter.difficulty = difficulty;

      return await this.questionModel.find(filter);
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async getQuestionById(id: string): Promise<Question> {
    try {
      const ques = await this.questionModel.findById(id);

      if (!ques)
        throw new NotFoundException('No questions found with given id');

      return ques;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async deleteQuestion(id: string): Promise<{ message: string }> {
    try {
      const deletedQues = await this.questionModel.findByIdAndDelete(id);

      if (!deletedQues)
        throw new NotFoundException(`Question with id = "${id}" not found`);

      
      return { message: 'Question deleted Successfully' };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
