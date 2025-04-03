import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Answer } from './schemas/answer.schema';
import mongoose, { Types } from 'mongoose';
import { AnswerDto,getAnswerByIdDto } from './dto';


@Injectable()
export class AnswerService {
    constructor(
        @InjectModel(Answer.name)
        private answerModel:mongoose.Model<Answer>
    ){}


    async addAnswer(dto : AnswerDto):Promise<Answer>{
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

    async getAnswerById(dto : getAnswerByIdDto) :Promise<Answer>{
        try {
            const {questionId,userId} = dto;

            const questionObjectId = new Types.ObjectId(questionId);
            const userObjectId = new Types.ObjectId(userId);

            const ans = await this.answerModel.findOne({questionId:questionObjectId,userId:userObjectId});

            if(!ans){
                throw new NotFoundException("Cannot find the asnswer with given question and user id");
            }

            return ans;
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException("errror while fetching the answer");
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

}
