import {BaseController} from '../controllers/baseController';
const {Route} = require("../db/models/route")

const router = require('express').Router();

const baseController = new BaseController(Route, Route.getProperties());

router.route('/route')
    .post(baseController.postItem)
    .get(baseController.getItems)

router.route('/route/:id')
    .get(baseController.getItem)
    .put(baseController.putItem)
    .delete(baseController.deleteItem)

module.exports = router;
