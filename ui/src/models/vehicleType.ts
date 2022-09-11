import {BaseModel} from "./baseModel";

export class VehicleType extends BaseModel {
    public price: number;

    static getProperties() {
        return ['id', 'name', 'price'];
    }
}
