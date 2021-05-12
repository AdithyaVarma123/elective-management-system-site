import { IQuizModel } from './quiz-model';
import { IUserModel } from './user-model';

export interface IQuizResponseModel {
    id: string;
    user: IUserModel;
    quiz: IQuizModel;
    answers: number[];
    start: string;
    end?: string;
    score: number;
    published: boolean;
    attended: boolean;
}
