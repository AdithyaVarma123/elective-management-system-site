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

export interface Batch {
    id: string;
    year: number;
    numYears: number;
    degree: string;
    course: string;
    batchString: string;
}

export interface User {
    name: string;
    username: string;
    role: scopes;
    rollNo: string;
    batch: Batch;
    electives: Elective[];
    id: string;
}

export interface Elective {
    id: string;
    name: string;
    description: string;
    courseCode: string;
    version: number;
    strength: number;
    attributes: { value: string, key: string }[];
    batches: Batch[];
    teachers: User[];
}
