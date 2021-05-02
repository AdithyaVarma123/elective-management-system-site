import { IUserModel } from './user-model';
import { IElectiveModel } from './elective-model';

export type scopes = 'student' | 'admin' | 'teacher';

export interface AuthTokens {
    id_token: string;
    refresh_token: string;
    access_token: string;
}

export interface RefreshTokens {
    refresh_token: string;
    access_token: string;
}

export type electiveAttributes = { key: string; value: string }[];

export type rawListType = { user: IUserModel; electives: IElectiveModel[] }[];

export type vacancyType = { elective: IElectiveModel; vacancy: number }[];

export interface Failed {
    item: any;
    reason: string;
    error?: any;
}
