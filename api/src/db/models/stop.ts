import {Column, Table} from "@wwwouter/typed-knex";
import {Route} from "./route";
import {BaseModel} from "./baseModel";

@Table("stops")
export class Stop extends BaseModel {
    @Column()
    public latitude: number;
    @Column()
    public longitude: number;
    @Column({name: 'routeId'})
    public route: Route;
    @Column()
    public routeId: number;

    static getProperties() {
        return ['id', 'name', 'latitude', 'longitude', 'routeId', 'createdAt', 'updatedAt'];
    }
}
