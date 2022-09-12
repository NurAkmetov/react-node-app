import {Table} from "@wwwouter/typed-knex";
import {BaseModel} from "./baseModel";

@Table("routeCategories")
export class RouteCategory extends BaseModel {

    static getProperties() {
        return ['id', 'name', 'createdAt', 'updatedAt'];
    }
}
