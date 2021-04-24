import { IElectiveModel } from './elective-model';

export interface IFormModel {
    id?: string;
    start: Date | string;
    end: Date | string;
    shouldSelect: number;
    selectAllAtForm: boolean;
    electives: IElectiveModel[];
    state ?: boolean;
}
