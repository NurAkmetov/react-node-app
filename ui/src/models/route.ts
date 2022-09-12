import {Agency} from "./agency";
import {RouteCategory} from "./routeCategory";
import {VehicleType} from "./vehicleType";
import {BaseModel} from "./baseModel";

export class Route extends BaseModel {
    public direction: number;
    public distance: number;
    public agency?: Agency;
    public agencyId: number;
    public routeCategory?: RouteCategory;
    public routeCategoryId: number;
    public vehicleType?: VehicleType;
    public vehicleTypeId: number;
}
