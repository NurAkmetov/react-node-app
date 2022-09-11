import {BaseModel} from "./baseModel";

export class RouteCategory extends BaseModel {
    static getProperties() {
        return ['id', 'name'];
    }
}
