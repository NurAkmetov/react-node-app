import {Agency} from "./agency";
import {RouteCategory} from "./routeCategory";
import {VehicleType} from "./vehicleType";
import {BaseModel} from "./baseModel";

export class Route extends BaseModel {
    public direction: number;
    public distance: number;
    public agency: Agency;
    public routeCategory: RouteCategory;
    public vehicleType: VehicleType;

    static getProperties() {
        return ['id', 'name', 'direction', 'distance', 'agencyId', 'routeCategoryId', 'vehicleTypeId'];
    }
}
