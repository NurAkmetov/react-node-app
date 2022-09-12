import {BaseController} from '../controllers/baseController';
const {RouteCategory} = require("../db/models/routeCategory")

const router = require('express').Router();

const baseController = new BaseController(RouteCategory, RouteCategory.getProperties());

router.route('/routeCategory')
    .post(baseController.postItem)
    .get(baseController.getItems)

router.route('/routeCategory/search')
    .get(baseController.searchItems)

router.route('/routeCategory/:id')
    .get(baseController.getItem)
    .put(baseController.putItem)
    .delete(baseController.deleteItem)

module.exports = router;
