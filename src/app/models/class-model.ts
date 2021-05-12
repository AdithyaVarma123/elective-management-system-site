import { IUserModel } from './user-model';
import { IElectiveModel } from './elective-model';
import { IBatchModel } from './batch-model';
import { IDownloadModel } from './download-model';

export interface IClassModel {
    id: string;
    batches: IBatchModel[];
    elective: IElectiveModel;
    students: IUserModel[];
    teacher: IUserModel;
    files: {
        file: IDownloadModel;
        createdAt: Date;
    }[];
}
