import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IQuizModel, IQuizRequestModel } from 'src/app/models/quiz-model';
import * as qs from 'query-string';
import constants from 'src/app/constants';
import { PaginationModel } from 'src/app/models/pagination-model';
import { IQuizResponseModel } from 'src/app/models/quiz-response-model';

@Injectable({
    providedIn: 'root'
})
export class QuizService {
    private quiz = constants.server + '/quizzes/';

    constructor(private http: HttpClient) {}

    getNewQuizzes(classId: string): Promise<IQuizModel[]> {
        return new Promise<IQuizModel[]>((resolve, reject) => {
            this.http.get(this.quiz + 'new?' + qs.stringify({ classId })).subscribe(
                (res: IQuizModel[]) =>
                    resolve(
                        res.map((e) => ({
                            ...e,
                            start: new Date(e.start).toLocaleString(),
                            end: e.end ? new Date(e.end).toLocaleString() : ''
                        }))
                    ),
                (err) => reject(err)
            );
        });
    }

    getOldQuizzes(classId: string): Promise<IQuizModel[]> {
        return new Promise<IQuizModel[]>((resolve, reject) => {
            this.http.get(this.quiz + 'old?' + qs.stringify({ classId })).subscribe(
                (res: IQuizModel[]) =>
                    resolve(
                        res.map((e) => ({
                            ...e,
                            start: new Date(e.start).toLocaleString(),
                            end: e.end ? new Date(e.end).toLocaleString() : ''
                        }))
                    ),
                (err) => reject(err)
            );
        });
    }

    editQuiz(
        quizId: string,
        password?: string,
        start?: string,
        end?: string,
        name?: string,
        time?: number
    ): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.http
                .put(this.quiz, {
                    quizId,
                    password,
                    start,
                    end,
                    name,
                    time
                })
                .subscribe(
                    () => resolve(),
                    (err) => reject(err)
                );
        });
    }

    deleteQuiz(quizId: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.http.delete(this.quiz + '?' + qs.stringify({ quizId })).subscribe(
                () => resolve(),
                (err) => reject(err)
            );
        });
    }

    createQuiz(
        file: File,
        classItem: string,
        name: string,
        start: Date,
        end: Date,
        time: number,
        password?: string
    ): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const data = new FormData();
            data.append('file', file, file.name);
            data.append('classItem', classItem);
            data.append('name', name);
            data.append('start', start.toISOString());
            data.append('end', end.toISOString());
            data.append('time', `${time}`);
            if (password) {
                data.append('password', password);
            }
            this.http.post(this.quiz + 'create-quiz', data).subscribe(
                () => resolve(),
                (err) => reject(err)
            );
        });
    }

    startQuiz(quizId: string, password?: string): Promise<IQuizRequestModel> {
        return new Promise<IQuizRequestModel>((resolve, reject) => {
            this.http.put(this.quiz + 'start-quiz', { quizId, password }).subscribe(
                (res: IQuizRequestModel) => resolve(res),
                (err) => reject(err)
            );
        });
    }

    getQuestion(nextToken: string, num: number, dir: 'next' | 'prev', ans: number): Promise<IQuizRequestModel> {
        return new Promise<IQuizRequestModel>((resolve, reject) => {
            this.http
                .get(this.quiz + 'question?' + qs.stringify({ num, dir, ans }), {
                    headers: {
                        quizRequest: `Bearer ${nextToken}`
                    }
                })
                .subscribe(
                    (res: IQuizRequestModel) => resolve(res),
                    (err) => reject(err)
                );
        });
    }

    submitQuiz(submitToken: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.http
                .get(this.quiz + 'submit-quiz', {
                    headers: {
                        quizRequest: `Bearer ${submitToken}`
                    }
                })
                .subscribe(
                    () => resolve(),
                    (err) => reject(err)
                );
        });
    }

    getScores(quizId: string, page: number): Promise<PaginationModel<IQuizResponseModel>> {
        return new Promise<PaginationModel<IQuizResponseModel>>((resolve, reject) => {
            this.http.get(this.quiz + 'results?' + qs.stringify({ quizId, page })).subscribe(
                (res: PaginationModel<IQuizResponseModel>) => {
                    res.docs = res.docs.map((e) => ({
                        ...e,
                        start: new Date(e.start).toLocaleString(),
                        end: e.end ? new Date(e.end).toLocaleString() : ''
                    }));
                    resolve(res);
                },
                (err) => reject(err)
            );
        });
    }

    publishScores(quizId: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.http.put(this.quiz + 'publish-score?' + qs.stringify({ quizId }), {}).subscribe(
                () => resolve(),
                (err) => reject(err)
            );
        });
    }
}
