import { scopes } from './general';
import { IBatchModel } from './batch-model';
import { IClassModel } from './class-model';

export interface IUserModel {
    id: string;
    name: string;
    username: string;
    password: string;
    rollNo: string;
    role: scopes;
    batch?: IBatchModel;
    classes?: IClassModel[];
}
