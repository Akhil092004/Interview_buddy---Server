/* eslint-disable @typescript-eslint/no-unused-vars */

import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import * as mongoose from 'mongoose';
import { SigninDto, SignupDto } from './dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { AnswerService } from 'src/answer/answer.service';
import { Question } from 'src/question/interface/question.interface';
import { QuestionService } from './../question/question.service';
import { AiSessionService } from 'src/ai-session/ai-session.service';
@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private userModel:mongoose.Model<User>,

        private jwtService:JwtService,

        private readonly answerService: AnswerService,

        private readonly questionService: QuestionService,

        private readonly aiSessionService: AiSessionService,
    ){}

    async signup(dto:SignupDto):Promise<User>{
        try {
            const {username,email,password} = dto;

    
            const existingUser = await this.userModel.findOne({
                email
            })
            
            if(existingUser){

                throw new BadRequestException("User already exists");
            }
            
            const hashedPassword = await bcrypt.hash(password,10);
            console.log("user created");
    
            const user = new this.userModel({
                username,
                email,
                password:hashedPassword,
                lastLogin:new Date()
            })

            await user.save();
    
            return user
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async signin(dto:SigninDto):Promise<{accessToken:string}>{
        try {
            

            const {email,password} = dto;

            const user = await this.userModel.findOne({
                email
            })

            if(!user){
                throw new BadRequestException("Invalid username");
            }
            const isPasswordValid = await bcrypt.compare(password,user.password);

            if(!isPasswordValid){
                throw new BadRequestException("Invalid password");
            }

            user.lastLogin = new Date();
            await user.save();

            const JwtPayload = {sub:user._id,username:user.username,role:user.role};

            return {
                accessToken : await this.jwtService.signAsync(JwtPayload)
            }

        } catch (error) {
            throw new BadRequestException(error);
        }
    }


    //get user profile by fetching user id from request in user.guard.ts
    async getProfile(id:string) : Promise<any> {

        try {
            const userId = new mongoose.Types.ObjectId(id);

            if(!userId){
                throw new BadRequestException("Invalid user id");
            }
            const user = await this.userModel.findById(userId);


            if(!user){
                throw new BadRequestException("User not found");
            }

            const {password,lastLogin,...userData} = user.toObject();

            // console.log(password);

            const questions = await this.getMarkedQuestions(id);
            const sessionDetails = await this.aiSessionService.getSessionsByUserId(id);

            const ratings = await this.getRatingOnAnswer(id);

            return {userData,questions,sessionDetails,ratings};

        } catch {
            throw new BadRequestException("cannot get the user profile");
        }
    }


    async getMarkedQuestions(userId:string) : Promise<any[]> {
        try {
            if (!userId) throw new BadRequestException("User ID is required");

            const userObjectId = new mongoose.Types.ObjectId(userId);

            const user = await this.userModel.findById(userObjectId);
            if (!user) {
                throw new BadRequestException("User not found");
            }


            const markedQuestionsIds = user.markedQuestions;

            const markedQuestions : Question[] = await Promise.all(
                markedQuestionsIds.map(async (questionId): Promise<Question> => {
                    const question = await this.questionService.getQuestionById(questionId.toString());
                    return question as Question;
                })
            );


            const markedQuestionsWithAnswers = await Promise.all(
                markedQuestions.map(async (question): Promise<any> => {
                    const answer = await this.answerService.getAnswerByQuestionIdAndUserId({
                        userId: user._id.toString(),
                        questionId: question._id.toString()
                    });
                    return { question, answer };
                })
            );

            return markedQuestionsWithAnswers;


        } catch {
            throw new BadRequestException("cannot get marked questions");
        }
    }

    async getRatingOnAnswer(userId:string): Promise<number[]>{
        try {
            const userObjectId = new mongoose.Types.ObjectId(userId);

            const answers = await this.answerService.getAnswerByUserId(userObjectId.toString());

            const ratings = answers.map((answer) => answer.aiRating);

            return ratings;
        } catch {
            throw new BadRequestException("cannot get rating on answers");
        }
    }

    async markQuestion(questionId:string,id:string) : Promise<User> {
        try {
            const quesId = new mongoose.Types.ObjectId(questionId);

            if(!quesId) throw new BadRequestException("Question Id not provided");

            const userId = new mongoose.Types.ObjectId(id);

            const user = await this.userModel.findById(userId);

            if(!user) throw new NotFoundException("User not found")

            user.markedQuestions.push(quesId);

            await user.save();

            return user

        } catch  {
            throw new InternalServerErrorException("cannot mark the question");
        }
    }

    async updateCredits(id:string,value:number) : Promise<User> {
        try {
            const userId = new mongoose.Types.ObjectId(id);

            const user = await this.userModel.findById(userId);

            if(!user) throw new NotFoundException("User not found")

            const currCred = user.credits;

            if(value < 0 && (-value > currCred)) throw new BadRequestException("Insufficients credits")

            user.credits += value;

            return await user.save();

        } catch {
            throw new InternalServerErrorException("cannot update credits");
        }
    }

    



}