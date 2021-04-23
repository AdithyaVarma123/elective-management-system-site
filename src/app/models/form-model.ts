import { IElectiveModel } from './elective-model';

export interface IFormModel {
    id?: string;
    start: Date;
    end: Date;
    shouldSelect: number;
    selectAllAtForm: boolean;
    electives: IElectiveModel[];
    active: boolean;
}
