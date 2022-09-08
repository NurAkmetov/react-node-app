import {Column, Table} from "@wwwouter/typed-knex";
import {BaseModel} from "./baseModel";

@Table("vehicleTypes")
export class VehicleType extends BaseModel {
    @Column()
    public price: number;

    static getProperties() {
        return ['id', 'name', 'price'];
    }
}
