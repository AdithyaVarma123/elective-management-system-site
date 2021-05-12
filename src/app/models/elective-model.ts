import { IBatchModel } from './batch-model';
import { IUserModel } from './user-model';
import { electiveAttributes } from './general';

export interface IElectiveModel {
    id: string;
    name: string;
    description: string;
    courseCode: string;
    version: number;
    strength: number;
    attributes: electiveAttributes;
    batches: IBatchModel[] | string[];
    teachers: IUserModel[] | string[];
}
