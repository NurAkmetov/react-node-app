import {Column, Table} from "@wwwouter/typed-knex";

@Table("routeCategories")
export class RouteCategory {
    @Column({primary: true})
    public id: number;
    @Column()
    public name: string;
    @Column({name: 'created_at'})
    public createdAt: string;
    @Column({name: 'updated_at'})
    public updatedAt: string;
}
