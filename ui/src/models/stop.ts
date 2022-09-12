import {Route} from "./route";
import {BaseModel} from "./baseModel";

export class Stop extends BaseModel{
    public latitude: number;
    public longitude: number;
    public route?: Route;
    public routeId: number;
}
