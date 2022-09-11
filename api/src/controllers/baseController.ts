const db = require("../db/config/db");
import {Request, Response, NextFunction} from "express";

export class BaseController<TModel, SProperties> {
    private readonly _model: TModel;
    private readonly _properties: SProperties[];

    public constructor(model: TModel, properties: SProperties[]) {
        this._model = model;
        this._properties = properties;
    }

    public postItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const props = req.body;

        await db.query(this._model).insertItem(props)
            .then(() => {
                res.json({
                    ok: true,
                    message: 'Item created',
                    item: props
                })
            })
            .catch(next);
    }

    public getItems = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const page = isNaN(parseInt(req.query.page as string)) ? 1 : parseInt(req.query.page as string);
        const pageSize = isNaN(parseInt(req.query.page_size as string)) ? 5 : parseInt(req.query.page_size as string);
        const offset = (page - 1) * pageSize;

        await db.query(this._model).select(...this._properties)
            .limit(pageSize)
            .offset(offset)
            .getMany()
            .then((items: typeof this._model[]) => res.json({
                ok: true,
                message: 'Items found',
                items
            }))
            .catch(next)
    }

    public getItem = async (req: Request, res: Response): Promise<void> => {
        const itemId = req.params.id;

        const item = await db.query(this._model).select(...this._properties).where('id', itemId).getFirstOrUndefined();
        if (item) {
            res.json({
                ok: true,
                message: 'Item found',
                item
            });
        } else {
            res.sendStatus(404);
        }
    }

    public putItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const itemId = req.params.id;
        const props = req.body;

        await db.query(this._model).where('id', itemId).updateItem(props)
            .then(() => res.json({
                ok: true,
                message: 'Item updated'
            }))
            .catch(next)
    }

    public deleteItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const itemId = req.params.id

        await db.query(this._model).where('id', itemId).del()
            .then(() => res.json({
                ok: true,
                message: `Item '${itemId}' deleted`
            }))
            .catch(next)
    }
}
