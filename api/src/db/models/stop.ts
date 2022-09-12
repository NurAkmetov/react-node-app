import {Column, Table} from "@wwwouter/typed-knex";
import {Route} from "./route";

@Table("stops")
export class Stop {
    @Column()
    public latitude: number;
    @Column()
    public longitude: number;
    @Column({name: 'routeId'})
    public route: Route;

    static getProperties() {
        return ['id', 'name', 'latitude', 'longitude', 'routeId', 'createdAt', 'updatedAt'];
    }
}
