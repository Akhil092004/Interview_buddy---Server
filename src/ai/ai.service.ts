import { Injectable } from '@nestjs/common';
import { openai } from './provider/openAI.provider';
import { evaluateAnswer,getQuestionsDto } from './dto';
import { answerFeedback } from './interfaces';


@Injectable()
export class AiService {
    // there are basically 2 services that out AI will provide

    // first is to generate a set of questions for a given set of filter.

    //second will be generate a feedback on the answers of that

    async evaluateAnswer(dto: evaluateAnswer): Promise<answerFeedback> {
        const prompt = `
                You are an AI evaluator. Analyze the answer to the question below.
                
                Question: ${dto.question}
                Answer: ${dto.answer}
                
                Respond in JSON format:
                {
                    "feedback": "your feedback here in short",
                    "rating": number (1 to 10)
                }
                `;
                
        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
        });
    
        const content = completion.choices[0]?.message?.content || '{}';
        const result = JSON.parse(content) as { feedback: string; rating: number };
    
        return {
            feedback: result.feedback,
            rating: result.rating,
        };
    }

    // {
    //     "feedback": "Your answer demonstrates a good understanding of the core concepts, but it lacks depth in explaining the edge cases and performance trade-offs. You could improve by elaborating on time complexity.",
    //     "rating": 7.5
    // }


    
    async generateQuestions(dto: getQuestionsDto): Promise<string[]> {
        const { topic, role, difficulty } = dto;
    
        const prompt = `
                You are an interviewer preparing questions for the role of ${role}.
                Generate 5 distinct and thoughtful questions on the topic "${topic}" at a ${difficulty} level.
                Return only the questions in this format:
                
                1. ...
                2. ...
                3. ...
                4. ...
                5. ...
                `;
    
        const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        });
    
        const content = response.choices[0]?.message?.content || '';
    
        const questions = content
        .split('\n')
        .filter(line => /^\d+\./.test(line)) // Match "1. ..."
        .map(line => line.replace(/^\d+\.\s*/, '')) // Remove "1. "
        .filter(q => q.length > 0);
    
        return questions;
    }
    // [
    //     "Explain the difference between a B-tree and a Binary Search Tree.",
    //     "How would you implement an LRU cache?",
    //     "What is a trie? Give a use case.",
    //     "How would you detect a cycle in a linked list?",
    //     "What are the pros and cons of using a heap vs a hash table?"
    // ]





}
