const {Agency} = require('../db/models/agency');
const db = require("../db/config/db");
import {Request, Response, NextFunction} from "express";

const postAgency = async (req: Request, res: Response, next: NextFunction) => {
    const props = req.body;

    await db.query(Agency).insertItem(props)
        .then(() => {
            res.json({
                ok: true,
                message: 'Agency created',
                agency: props
            })
        })
        .catch(next);
}

const getAgencies = async (req: Request, res: Response, next: NextFunction) => {
    await db.query(Agency).select('id', 'name', 'region').getMany()
        .then((agencies: typeof Agency[]) => res.json({
            ok: true,
            message: 'Agencies found',
            agencies
        }))
        .catch(next)
}

const getAgency = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id

    await db.query(Agency).findByPrimaryKey(userId).select('id', 'name', 'region')
        .then((agency: typeof Agency) => res.json({
            ok: true,
            message: 'Agency found',
            agency
        }))
        .catch(next)
}

const putAgency = (req: Request, res: Response, next: NextFunction) => {
    const agencyId = req.params.id;
    const props = req.body.agency;

    Agency.update(agencyId, props)
        .then((agency: typeof Agency) => res.json({
            ok: true,
            message: 'Agency updated',
            agency
        }))
        .catch(next)
}

const deleteAgency = async (req: Request, res: Response, next: NextFunction) => {
    const agencyId = req.params.id

    await db.query(Agency).where('id', agencyId).del()
        .then(() => res.json({
            ok: true,
            message: `Agency '${agencyId}' deleted`
        }))
        .catch(next)
}

module.exports = {
    postAgency,
    getAgencies,
    getAgency,
    putAgency,
    deleteAgency
}