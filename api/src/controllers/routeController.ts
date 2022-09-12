import {BaseController} from "./baseController";
import {RouteCategory} from "../db/models/routeCategory";
import {VehicleType} from "../db/models/vehicleType";
import {Agency} from "../db/models/agency";
const db = require("../db/config/db");
import {Request, Response, NextFunction} from "express";

export class RouteController<TModel, SProperties> extends BaseController<TModel, SProperties> {
    private readonly model: TModel;
    private readonly properties: SProperties[];

    public constructor(model: TModel, properties: SProperties[]) {
        super(model, properties);
        this.model = model;
        this.properties = properties;
    }

    public getItems = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const page = isNaN(parseInt(req.query.page as string)) ? 1 : parseInt(req.query.page as string);
        const pageSize = isNaN(parseInt(req.query.pageSize as string)) ? 5 : parseInt(req.query.pageSize as string);
        const offset = (page - 1) * pageSize;

        await db.query(this.model)
            .innerJoin("routeCategory", RouteCategory, "id", "=", "routeCategoryId")
            .innerJoin("vehicleType", VehicleType, "id", "=", "vehicleTypeId")
            .innerJoin("agency", Agency, "id", "=", "agencyId")
            .select(...this.properties, 'vehicleType.name', 'routeCategory.name', 'agency.name')
            .limit(pageSize)
            .offset(offset)
            .getMany()
            .then((items: typeof this.model[]) => res.json({
                currentPage: page,
                pageSize: pageSize,
                results: items
            }))
            .catch(next)
    }

    public searchItems = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const query = req.query.q;
        const page = isNaN(parseInt(req.query.page as string)) ? 1 : parseInt(req.query.page as string);
        const pageSize = isNaN(parseInt(req.query.pageSize as string)) ? 5 : parseInt(req.query.pageSize as string);
        const offset = (page - 1) * pageSize;

        await db.query(this.model)
            .innerJoin("routeCategory", RouteCategory, "id", "=", "routeCategoryId")
            .innerJoin("vehicleType", VehicleType, "id", "=", "vehicleTypeId")
            .innerJoin("agency", Agency, "id", "=", "agencyId")
            .where('name', 'like', `%${query}%`)
            .select(...this.properties, 'vehicleType.name', 'routeCategory.name', 'agency.name')
            .limit(pageSize)
            .offset(offset)
            .getMany()
            .then((items: typeof this.model[]) => res.json({
                currentPage: page,
                pageSize: pageSize,
                results: items
            }))
            .catch(next)
    }

    public getItem = async (req: Request, res: Response): Promise<void> => {
        const itemId = req.params.id;

        const item = await db.query(this.model)
            .innerJoin("routeCategory", RouteCategory, "id", "=", "routeCategoryId")
            .innerJoin("vehicleType", VehicleType, "id", "=", "vehicleTypeId")
            .innerJoin("agency", Agency, "id", "=", "agencyId")
            .select(...this.properties, 'vehicleType.name', 'routeCategory.name', 'agency.name')
            .where('id', itemId).getFirstOrUndefined();
        if (item) {
            res.send(item);
        } else {
            res.sendStatus(404);
        }
    }
}
