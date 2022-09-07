import {Column, Table} from "@wwwouter/typed-knex";
import {Route} from "./route";

@Table("stops")
export class Stop {
    @Column({primary: true})
    public id: number;
    @Column()
    public name: string;
    @Column({name: 'routeId'})
    public route: Route;
    @Column({name: 'created_at'})
    public createdAt: string;
    @Column({name: 'updated_at'})
    public updatedAt: string;
}