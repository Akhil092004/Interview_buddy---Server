import { Types } from "mongoose";

export interface Question extends Document {
    _id: Types.ObjectId | string;
    questionText: string;
    topic: string;
    tags: string[];
    difficulty: string;
    hints: string[];
}