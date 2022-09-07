import {Column, Table} from "@wwwouter/typed-knex";
import {Agency} from "./agency";
import {RouteCategory} from "./routeCategory";
import {VehicleType} from "./vehicleType";

@Table("routes")
export class Route {
    @Column({primary: true})
    public id: number;
    @Column()
    public name: string;
    @Column()
    public direction: number;
    @Column()
    public distance: number;
    @Column({name: 'agencyId'})
    public agency: Agency;
    @Column({name: 'routeCategoryId'})
    public routeCategory: RouteCategory;
    @Column({name: 'vehicleTypeId'})
    public vehicleType: VehicleType;
    @Column({name: 'created_at'})
    public createdAt: string;
    @Column({name: 'updated_at'})
    public updatedAt: string;
}