import {Column} from "@wwwouter/typed-knex";

export class BaseModel {
    @Column({primary: true})
    public id: number;
    @Column()
    public name: string;
    @Column({name: 'created_at'})
    public createdAt: string;
    @Column({name: 'updated_at'})
    public updatedAt: string;
}
