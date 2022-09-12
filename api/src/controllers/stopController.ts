import {BaseController} from "./baseController";
import {Route} from "../db/models/route";
const db = require("../db/config/db");
import {Request, Response, NextFunction} from "express";

export class StopController<TModel, SProperties> extends BaseController<TModel, SProperties> {
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
            .innerJoin("route", Route, "id", "=", "routeId")
            .select(...this.properties, 'route.name')
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
            .innerJoin("route", Route, "id", "=", "routeId")
            .where('name', 'like', `%${query}%`)
            .select(...this.properties, 'route.name')
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
            .innerJoin("route", Route, "id", "=", "routeId")
            .select(...this.properties, 'route.name')
            .where('id', itemId).getFirstOrUndefined();
        if (item) {
            res.send(item);
        } else {
            res.sendStatus(404);
        }
    }
}
