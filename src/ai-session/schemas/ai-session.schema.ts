import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, ObjectId } from 'mongoose';


export class QaPair {
    @Prop({ type: String, required: true })
    questionText: string;

    @Prop({ type: String, required: true })
    answerText: string;

    @Prop({ type: Number, required: true })
    rating: number;

    @Prop({ type: String, required: true })
    feedback: string;

    @Prop({ type: Number, required: true })
    timeTaken: number; 
}

@Schema({ timestamps: true })
export class AiSession {
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    createdBy: ObjectId;
    
    @Prop({ type: [QaPair], required: true })
    qaPairs: QaPair[];

    @Prop({ type: String, required: true })
    feedback: string;

    @Prop({ type: Number, required: true })
    rating: number;

}

export const AiSessionSchema = SchemaFactory.createForClass(AiSession);
