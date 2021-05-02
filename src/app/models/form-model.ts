import { IElectiveModel } from './elective-model';
import { IUserModel } from './user-model';

export interface IFormModel {
    id?: string;
    start: Date | string;
    end: Date | string;
    shouldSelect: number;
    selectAllAtForm: boolean;
    electives: IElectiveModel[];
    state?: boolean;
    active: boolean;
    explicit: {
        user: IUserModel;
        electives: IElectiveModel[];
    }[];
}
