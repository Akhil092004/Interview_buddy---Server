export class QuestionDto {
    questionText: string;
    topic: string;
    difficulty?: "Hard" | "Medium" | "Easy";
    createdBy: string;
    hints?: string[];
}