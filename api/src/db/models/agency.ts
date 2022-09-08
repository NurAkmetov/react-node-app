import {Column, Table} from "@wwwouter/typed-knex";
import {BaseModel} from "./baseModel";

@Table("agencies")
export class Agency extends BaseModel {
    @Column()
    public region: string;

    static getProperties() {
        return ['id', 'name', 'region'];
    }
}
