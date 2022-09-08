import {Column, Table} from "@wwwouter/typed-knex";
import {Agency} from "./agency";
import {RouteCategory} from "./routeCategory";
import {VehicleType} from "./vehicleType";
import {BaseModel} from "./baseModel";

@Table("routes")
export class Route extends BaseModel {
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
}
