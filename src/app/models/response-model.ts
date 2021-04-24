import { IElectiveModel } from "./elective-model";
import { IUserModel } from "./user-model";
import { IFormModel } from "./form-model";

export interface IResponseModel {
    id?: string;
    user: IUserModel;
    responses: IElectiveModel[];
    form: IFormModel;
    time: Date;
}
