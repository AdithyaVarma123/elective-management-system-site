import { Component, OnInit } from '@angular/core';
import { ClassesService } from '../services/classes/classes.service';
import { IClassModel } from '../models/class-model';
import { ActivatedRoute } from '@angular/router';
import { IDownloadModel } from '../models/download-model';
import { AuthService } from '../services/auth/auth.service';
import { ToastService } from '../services/util/toast.service';
import { IUserModel } from '../models/user-model';
import constants from '../constants';
import { ConfirmationService } from 'primeng/api';
import { QuizService } from '../services/quiz/quiz.service';
import { IQuizModel, IQuizRequestModel } from '../models/quiz-model';
import { IQuizResponseModel } from '../models/quiz-response-model';

@Component({
    selector: 'app-page-class',
    templateUrl: './page-class.component.html',
    styleUrls: ['./page-class.component.scss'],
    providers: [ConfirmationService]
})
export class PageClassComponent implements OnInit {
    class: IClassModel = {
        id: '',
        batches: [],
        elective: {
            id: '',
            attributes: [],
            batches: undefined,
            courseCode: '',
            description: '',
            name: '',
            strength: 0,
            teachers: undefined,
            version: 0
        },
        students: [],
        teacher: { id: '', name: '', password: '', role: undefined, rollNo: '', username: '' },
        files: []
    };

    items: {
        file: IDownloadModel;
        createdAt: string;
    }[] = [];

    isStudent = true;
    isTeacher = false;

    trackAccessDialog = false;
    tracked: {
        user: IUserModel;
        time: string;
    }[] = [];

    createQuizDialog = false;
    name = '';
    end;
    start;
    time = 0;
    maxTime;
    password = '';

    panelName = 'New quizzes';
    newQuizItems: IQuizModel[] = [];
    oldQuizItems: IQuizModel[] = [];

    editQuizDialog = false;
    currentQuiz: IQuizModel = { classItem: undefined, end: '', id: '', name: '', questions: [], start: '', time: 0 };

    quizDialog = false;
    quizDialogLoading = false;
    nextQuizItem: IQuizRequestModel = {
        endAt: '',
        nextRequest: '',
        question: {
            points: 0,
            negativePoints: 0,
            name: '',
            options: [],
            answer: 0
        }
    };
    hasPassword = false;
    quizPassword = '';
    numQuestions = 0;
    currentQuestion = 0;
    currentAnswer: number;
    nextButtonLabel = 'Next';

    viewScoresDialog = false;
    scores: IQuizResponseModel[] = [];
    loading = false;
    totalRecords = 0;
    page = 0;

    quizProgressBar = 100;
    timeRemaining: number;
    timeRemainingReadable = '';
    originalTime: number;
    progressInterval;
    useProgressBar = false;

    constructor(
        private classService: ClassesService,
        private activatedRoute: ActivatedRoute,
        private authService: AuthService,
        private toastService: ToastService,
        private confirmationService: ConfirmationService,
        private quizService: QuizService
    ) {
        this.isStudent = this.authService.getScope() === 'student';
        this.isTeacher = this.authService.getScope() === 'teacher';
        if (this.isTeacher) {
            this.panelName = 'Quizzes';
        }
    }

    ngOnInit() {
        this.activatedRoute.paramMap.subscribe((paramMap) => {
            const id = paramMap.get('id');
            this.classService.getClasses(0).then((res) => {
                this.class = res.docs[res.docs.findIndex((e) => e.id === id)];
                this.items = [
                    ...this.class.files.map((e) => ({ ...e, createdAt: new Date(e.createdAt).toLocaleString() }))
                ];
            });
            this.quizService.getNewQuizzes(id).then((res) => (this.newQuizItems = res));
            if (this.isStudent) {
                this.quizService.getOldQuizzes(id).then((res) => (this.oldQuizItems = res));
            }
        });
    }

    downloadFile(item: IDownloadModel) {
        this.classService
            .getResource(item.fileId, item.name)
            .then(() => this.toastService.green('Downloaded successfully!'))
            .catch((err) => this.toastService.red(`An error occurred: ${err?.error?.message}`));
    }

    viewTracked(item: IDownloadModel) {
        this.classService.getTracked(item.fileId).then((res) => {
            this.tracked = [...res.trackAccess.map((e) => ({ ...e, time: new Date(e.time).toLocaleString() }))];
            this.trackAccessDialog = true;
        });
    }

    async uploadResource(evt: any) {
        let accept: boolean;
        await new Promise<void>((resolve) => {
            this.confirmationService.confirm({
                message: 'Do you want to track the downloads for this resource?',
                accept: () => {
                    accept = true;
                    resolve();
                },
                reject: () => {
                    accept = false;
                    resolve();
                }
            });
        });
        this.classService
            .addResource(evt[0], this.class.id, accept)
            .then(() => {
                this.toastService.green('Item added');
                this.ngOnInit();
            })
            .catch(() => this.toastService.red(constants.unknownError));
    }

    deleteResource(item: IDownloadModel) {
        this.confirmationService.confirm({
            message: `Are you sure you want to delete ${item.name} ?`,
            accept: () => {
                this.classService
                    .deleteResource(item.fileId)
                    .then(() => {
                        this.ngOnInit();
                        this.toastService.green('Deleted successfully!');
                    })
                    .catch((err) => this.toastService.red(`An unknown error occurred: ${err?.error?.message}`));
            }
        });
    }

    createQuiz() {
        this.name = '';
        this.start = new Date(new Date().getTime() + 60000 * 5);
        this.end = new Date(new Date().getTime() + 60000 * 10);
        this.setMaxTime();
        this.time = 0;
        this.password = '';
        this.createQuizDialog = true;
    }

    setMaxTime() {
        this.maxTime = Math.floor((new Date(this.end).getTime() - new Date(this.start).getTime()) / 60000);
    }

    async uploadQuiz(evt: any) {
        if (this.name.length === 0) {
            this.toastService.red('Enter a name for the quiz!');
            return;
        }
        if (new Date().getTime() + 60000 >= this.start.getTime()) {
            this.toastService.red('The quiz start time is too soon!');
            return;
        }
        if (this.end.getTime() <= this.start.getTime() || this.end.getTime() + 60000 <= this.start.getTime()) {
            this.toastService.red('Quiz end time too early!');
            return;
        }
        this.confirmationService.confirm({
            message: 'Are you sure you want to create this quiz?',
            accept: () => {
                this.quizService
                    .createQuiz(
                        evt[0],
                        this.class.id,
                        this.name,
                        this.start,
                        this.end,
                        this.time,
                        this.password.length > 0 ? this.password : undefined
                    )
                    .then(() => {
                        this.toastService.green('Quiz created successfully!');
                        this.createQuizDialog = false;
                        this.ngOnInit();
                    })
                    .catch((err) => this.toastService.red(`An unknown error occurred: ${err?.error?.message}`));
            }
        });
    }

    editQuiz(item: IQuizModel) {
        this.name = item.name;
        this.start = new Date(item.start);
        this.end = new Date(item.end);
        this.time = item.time;
        this.setMaxTime();
        this.currentQuiz = { ...item };
        this.editQuizDialog = true;
    }

    submitEditQuiz() {
        if (this.name.length === 0) {
            this.toastService.red('Enter a name for the quiz!');
            return;
        }
        this.editQuizDialog = false;
        this.quizService
            .editQuiz(
                this.currentQuiz.id,
                this.password,
                new Date(this.start).toISOString(),
                new Date(this.end).toISOString(),
                this.name,
                this.time
            )
            .then(() => {
                this.toastService.green('Edited successfully!');
                this.ngOnInit();
            })
            .catch((err) => this.toastService.red(`An unknown error occurred: ${err?.error?.message}`));
    }

    deleteQuiz(item: IQuizModel) {
        this.confirmationService.confirm({
            message: `Are you sure you want to delete this quiz: ${item.name} ?`,
            accept: () => {
                this.quizService
                    .deleteQuiz(item.id)
                    .then(() => {
                        this.toastService.green('Deleted successfully!');
                        this.ngOnInit();
                    })
                    .catch((err) => this.toastService.red(`An unknown error occurred: ${err?.error?.message}`));
            }
        });
    }

    startQuiz(item: IQuizModel) {
        this.currentQuiz = { ...item };
        this.confirmationService.confirm({
            message: `Are you sure you want to start the quiz: ${item.name} ?`,
            accept: () => {
                this.quizDialog = true;
                if (this.currentQuiz?.password && this.currentQuiz.password.length > 0) {
                    this.hasPassword = true;
                    return;
                } else {
                    this.quizPassword = undefined;
                }
                this.sendQuizStart();
            }
        });
    }

    sendQuizStart() {
        if (this.currentQuiz?.password && this.currentQuiz.password.length > 0) {
            if (this.quizPassword.length === 0) {
                this.toastService.red('Enter a password!');
                return;
            }
        }
        this.quizDialogLoading = true;
        this.quizService
            .startQuiz(this.currentQuiz.id, this.quizPassword)
            .then((res) => {
                this.nextQuizItem = res;
                this.currentQuestion = 1;
                // @ts-ignore
                this.numQuestions = this.currentQuiz.questions;
                this.quizDialogLoading = false;
                this.hasPassword = false;
                if (this.nextQuizItem.question.answer) {
                    this.currentAnswer = this.nextQuizItem.question.answer;
                } else {
                    this.currentAnswer = -1;
                }
                if (this.currentQuiz.time === 0) {
                    this.useProgressBar = false;
                } else {
                    this.useProgressBar = true;
                    this.quizProgressBar = 100;
                    this.timeRemaining = new Date(this.nextQuizItem.endAt).getTime() - new Date().getTime();
                    this.originalTime = Math.max(this.timeRemaining, this.currentQuiz.time * 60000);
                    this.startProgressBarTimer();
                }
            })
            .catch((err) => {
                this.quizDialogLoading = false;
                this.toastService.red(`${err?.error?.message}`);
            });
    }

    getQuestion(dir: 'next' | 'prev') {
        if (dir === 'next' && this.currentQuestion === this.numQuestions) {
            this.confirmationService.confirm({
                message: 'Are you sure you want to submit the quiz?',
                accept: async () => {
                    this.submitQuiz();
                }
            });
        } else {
            this.quizDialogLoading = true;
            this.quizService
                .getQuestion(
                    this.nextQuizItem.nextRequest,
                    dir === 'next' ? this.currentQuestion + 1 : this.currentQuestion - 1,
                    dir,
                    this.currentAnswer
                )
                .then((res) => {
                    this.nextQuizItem = res;
                    this.currentQuestion = dir === 'next' ? this.currentQuestion + 1 : this.currentQuestion - 1;
                    if (this.currentQuestion === this.numQuestions) {
                        this.nextButtonLabel = 'Submit quiz';
                    } else {
                        this.nextButtonLabel = 'Next';
                    }
                    this.quizDialogLoading = false;
                    this.timeRemaining = this.timeRemaining =
                        new Date(this.nextQuizItem.endAt).getTime() - new Date().getTime();
                    if (this.nextQuizItem.question.answer) {
                        this.currentAnswer = this.nextQuizItem.question.answer;
                    } else {
                        this.currentAnswer = -1;
                    }
                })
                .catch((err) => {
                    if (err?.error?.name === 'invalid_request') {
                        this.toastService.red('Quiz time up');
                        this.quizDialog = false;
                        return;
                    } else if (err?.error?.name === 'removed') {
                        this.toastService.red('Quiz does not exist!');
                        this.quizDialog = false;
                        return;
                    }
                    this.quizDialogLoading = false;
                    this.toastService.red(`${err?.error?.message}`);
                });
        }
    }

    async submitQuiz() {
        this.quizDialogLoading = true;
        clearInterval(this.progressInterval);
        await this.quizService.getQuestion(
            this.nextQuizItem.nextRequest,
            this.currentQuestion + 1,
            'next',
            this.currentAnswer
        );
        this.quizService
            .submitQuiz(this.nextQuizItem.nextRequest)
            .then(() => {
                this.quizDialogLoading = false;
                this.quizDialog = false;
                this.toastService.green('Quiz submitted successfully!');
                this.ngOnInit();
            })
            .catch(() => {
                this.quizDialogLoading = false;
                this.quizDialog = false;
                this.toastService.red('An error occurred, but your data is safe!');
                this.ngOnInit();
            });
    }

    showScores(item: IQuizModel) {
        this.currentQuiz = { ...item };
        this.getScores({ first: 0 });
        this.viewScoresDialog = true;
    }

    getScores(event: any): void {
        this.loading = true;
        this.page = event.first === 0 ? 0 : event.first / 25;
        this.quizService.getScores(this.currentQuiz.id, this.page).then((data) => {
            this.scores = [...data.docs];
            this.totalRecords = data.count;
            this.loading = false;
        });
    }

    publishScores(item: IQuizModel) {
        this.quizService
            .publishScores(item.id)
            .then(() => this.toastService.green('Scores calculated and published!'))
            .catch((err) => this.toastService.red(`An unknown error occurred: ${err?.error?.message}`));
    }

    startProgressBarTimer() {
        try {
            clearInterval(this.progressInterval);
        } catch (err) {
            // eslint-disable-next-line no-empty
        }
        this.progressInterval = setInterval(() => {
            this.timeRemaining -= 1000;
            if (this.timeRemaining <= 0) {
                this.submitQuiz();
                this.toastService.yellow('The quiz time is up and has been auto submitted!');
            } else {
                this.quizProgressBar = Math.round((this.timeRemaining / this.originalTime) * 100);
                this.timeRemainingReadable = this.formatMilliseconds(this.timeRemaining, true);
            }
        }, 1000);
    }

    formatMilliseconds(milliseconds: number, padStart: boolean): string {
        function pad(num) {
            return `${num}`.padStart(2, '0');
        }
        const asSeconds = milliseconds / 1000;

        let hours = undefined;
        let minutes = Math.floor(asSeconds / 60);
        const seconds = Math.floor(asSeconds % 60);

        if (minutes > 59) {
            hours = Math.floor(minutes / 60);
            minutes %= 60;
        }

        return hours
            ? `${padStart ? pad(hours) : hours}:${pad(minutes)}:${pad(seconds)}`
            : `${padStart ? pad(minutes) : minutes}:${pad(seconds)}`;
    }
}
