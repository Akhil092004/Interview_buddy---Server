import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Answer } from './schemas/answer.schema';
import mongoose, { Types } from 'mongoose';
import { createAnswerDto } from './dto';
import { AiService } from './../ai/ai.service';
import { QuestionService } from 'src/question/question.service';
import { Question } from 'src/question/interface/question.interface';


@Injectable()
export class AnswerService {
    constructor(
        @InjectModel(Answer.name)
        private answerModel:mongoose.Model<Answer>,

        private AiService : AiService,

        private questionService : QuestionService
    ){}


    async addAnswer(dto : createAnswerDto):Promise<Answer>{
        try {
            const answerData: Answer = {
                userId: new Types.ObjectId(dto.userId),
                questionId: new Types.ObjectId(dto.questionId),
                answerText: dto.answerText,
                aiFeedback: dto.aiFeedback ?? "",
                aiRating: dto.aiRating ?? 0,       
            };
    
    
            return await this.answerModel.create(answerData);

        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException("error while adding the message");
        }
    }

    async getAnswer(id:string) :Promise<Answer> {
        try {
            if(!id) throw new BadRequestException("answer Id not provided");

            const answerId = new Types.ObjectId(id);

            const ans = await this.answerModel.findById(answerId);

            if(!ans){
                throw new NotFoundException("Cannot find the answer with given question id");
            }

            return ans;

        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException(`Cannot fetch the answer with id : ${id}`);
        }
    }


    async deleteAnswer(id:string) :Promise<Answer> {
        try {
            if(!id) throw new BadRequestException("answer Id not provided");

            const answerId = new Types.ObjectId(id);

            const ans = await this.answerModel.findByIdAndDelete(answerId);

            if(!ans){
                throw new NotFoundException("Cannot find the answer with given question id");
            }

            return ans;

        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException(`Cannot fetch the answer with id : ${id}`);
        }
    }

    async getAnswerByQuestionIdAndUserId({ userId, questionId }: { userId: string; questionId: string }): Promise<Answer | null> {
        try {
            if(!userId || !questionId) throw new BadRequestException("userId or questionId not provided");

            const userObjectId = new Types.ObjectId(userId);
            const questionObjectId = new Types.ObjectId(questionId);

            const answer = await this.answerModel.findOne({ userId: userObjectId, questionId: questionObjectId });

            return answer || null
            
        } catch {
            throw new InternalServerErrorException("error while fetching the answer with given question and user id");
        }
    }

    async getAnswerByUserId(userId:string) :Promise<Answer[]> {
        try {
            if(!userId) throw new BadRequestException("userId not provided");

            const userObjectId = new Types.ObjectId(userId);

            const answers = await this.answerModel.find({userId:userObjectId});

            return answers;
            
        } catch {
            throw new InternalServerErrorException("error while fetching the answer with given user id");
        }
    }

    async getAiFeedback(id:string) : Promise<any>{
        try {
            const objId = new Types.ObjectId(id);
            const answer = await this.answerModel.findById(objId);


            if(!answer) throw new NotFoundException("Cannot find the answer with given question id");


            const question = await this.questionService.getQuestionById(answer.questionId.toString()) as Question;

            if(!question) throw new NotFoundException("Cannot find the question with given answer id");

            const newFeedback = await this.AiService.evaluateAnswer({
                question: question.questionText,
                answer: answer.answerText,
            });

            return newFeedback;



        } catch {
            throw new InternalServerErrorException("error while fetching Ai feedback")
        }
    }


}
