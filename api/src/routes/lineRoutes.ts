import {BaseApiService} from '../controllers/baseController';
const {Route} = require("../db/models/route")

const router = require('express').Router();

const baseController = new BaseApiService(Route, Route.getProperties());

router.route('/lines')
    .post(baseController.postItem)
    .get(baseController.getItems)

router.route('/lines/:id')
    .get(baseController.getItem)
    .put(baseController.putItem)
    .delete(baseController.deleteItem)

module.exports = router;
