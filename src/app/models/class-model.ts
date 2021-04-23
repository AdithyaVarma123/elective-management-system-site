import { IUserModel } from "./user-model";
import { IElectiveModel } from "./elective-model";
import { IBatchModel } from "./batch-model";

export interface IClassModel {
    id?: string;
    batch: IBatchModel;
    elective: IElectiveModel;
    students: IUserModel[];
    teacher: IUserModel;
}
