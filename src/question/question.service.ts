import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Question } from './schemas/question.schema';
import mongoose, { Types } from 'mongoose';
import { QuestionDto } from './dto';

@Injectable()
export class QuestionService {
  constructor(
    @InjectModel(Question.name)
    private questionModel: mongoose.Model<Question>,
  ) {}

  async createQuestion(dto: QuestionDto): Promise<Question> {
    try {
      const {
        questionText,
        topic,
        difficulty = 'Medium',
        createdBy,
        hints = [],
      } = dto;

      const question = new this.questionModel({
        questionText,
        topic,
        difficulty,
        createdBy: new Types.ObjectId(createdBy),
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
    topic: string;
    difficulty?: string;
  }) {
    try {
      const filter: { topic: string; difficulty?: string } = { topic };

      if (difficulty) filter.difficulty = difficulty;

      return await this.questionModel.find(filter);
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async getQuestionsByUser(id: string): Promise<Question[]> {
    try {
      const objectId = new Types.ObjectId(id);

      const questions = await this.questionModel.find({ createdBy: objectId });

      return questions;
    } catch (error) {
      throw new HttpException((error as Error).message, HttpStatus.BAD_REQUEST);
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

      //make sure to delete the corresponding answer also
      return { message: 'Question deleted Successfully' };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
