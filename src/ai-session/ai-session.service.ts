import { Injectable } from '@nestjs/common';
import { AiSession } from './schemas/ai-session.schema';
import mongoose, { Types } from 'mongoose';
import { createSessionDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AiSessionService {
    constructor(
        @InjectModel('AiSession')
        private readonly aiSessionModel: mongoose.Model<AiSession>,
    ){}

    async addAiSession(dto : createSessionDto){
        try {
            const sessionData: AiSession = {
                createdBy: new Types.ObjectId(dto.createdBy),
                qaPairs: dto.qaPairs,
                feedback: dto.feedback,
                rating: dto.rating,
            };
    
            return await this.aiSessionModel.create(sessionData);
        } catch (error) {
            console.log(error);
            throw new Error("Error while adding the AI session");
        }
    }

    async getAiSessionById(id: string): Promise<AiSession> {
        try {
            if (!id) throw new Error("AI session ID not provided");

            const sessionId = new Types.ObjectId(id);

            const session = await this.aiSessionModel.findById(sessionId);

            if (!session) {
                throw new Error("Cannot find the AI session with the given ID");
            }

            return session;
        } catch (error) {
            console.log(error);
            throw new Error("Error while fetching the AI session");
        }
    }

    async getSessionsByUserId(userId: string): Promise<AiSession[]> {
        try {
            if (!userId) throw new Error("User ID not provided");

            const userObjectId = new Types.ObjectId(userId);

            const sessions = await this.aiSessionModel.find({ createdBy: userObjectId });

            if (!sessions || sessions.length === 0) {
                throw new Error("No AI sessions found for the given user ID");
            }

            return sessions;
        } catch (error) {
            console.log(error);
            throw new Error("Error while fetching AI sessions for the user");
        }
    }

    
}
