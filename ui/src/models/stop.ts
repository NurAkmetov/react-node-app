import {Route} from "./route";

export class Stop {
    public latitude: number;
    public longitude: number;
    public route: Route;

    static getProperties() {
        return ['id', 'name', 'latitude', 'longitude', 'routeId'];
    }
}
