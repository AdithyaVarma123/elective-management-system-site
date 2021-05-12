import { IClassModel } from './class-model';

export interface IQuizModel {
    id: string;
    classItem: IClassModel;
    name: string;
    start: string;
    end: string;
    time: number;
    password?: string;
    questions: IQuestionModel[];
}

export interface IQuestionModel {
    points: number;
    negativePoints: number;
    name: string;
    options: string[];
    answer: number;
}

export interface IQuizRequestModel {
    endAt: string;
    nextRequest: string;
    question: IQuestionModel;
}
