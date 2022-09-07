import {Column, Table} from "@wwwouter/typed-knex";

@Table("vehicleTypes")
export class VehicleType {
    @Column({primary: true})
    public id: number;
    @Column()
    public name: string;
    @Column()
    public price: number;
    @Column({name: 'created_at'})
    public createdAt: string;
    @Column({name: 'updated_at'})
    public updatedAt: string;
}