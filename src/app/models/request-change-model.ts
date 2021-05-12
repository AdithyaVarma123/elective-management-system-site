import { IElectiveModel } from './elective-model';
import { IUserModel } from './user-model';

export class IRequestChangeModel {
    id: string;
    from: IElectiveModel;
    to: IElectiveModel;
    user: IUserModel;
    requestDate: string;
}
