import {Column, Table} from "@wwwouter/typed-knex";

@Table("agencies")
export class Agency {
    @Column({primary: true})
    public id: number;
    @Column()
    public name: string;
    @Column()
    public region: string;
    @Column({name: 'created_at'})
    public createdAt: string;
    @Column({name: 'updated_at'})
    public updatedAt: string;
}
