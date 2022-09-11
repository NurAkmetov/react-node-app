import {BaseModel} from "./baseModel";

export class Agency extends BaseModel {
    public region: string;

    static getProperties() {
        return ['id', 'name', 'region'];
    }
}
