import {Column, Table} from "@wwwouter/typed-knex";
import {Route} from "./route";

@Table("stops")
export class Stop {
    @Column({name: 'routeId'})
    public route: Route;
}
