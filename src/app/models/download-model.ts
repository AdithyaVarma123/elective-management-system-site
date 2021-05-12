import { IUserModel } from './user-model';
import { IClassModel } from './class-model';

export interface IDownloadModel {
    id: string;
    path: string;
    shouldTrack: boolean;
    fileId: string;
    deleteOnAccess: boolean;
    limitedBy: 'user' | 'class' | 'none';
    limitedTo: IUserModel[];
    limitedToClass: IClassModel;
    name: string;
    trackAccess: {
        user: IUserModel;
        time: string;
    }[];
}
