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
