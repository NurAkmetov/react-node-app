import {BaseController} from '../controllers/baseController';
const {RouteCategory} = require("../db/models/routeCategory")

const router = require('express').Router();

const baseController = new BaseController(RouteCategory, RouteCategory.getProperties());

router.route('/lineCategories')
    .post(baseController.postItem)
    .get(baseController.getItems)

router.route('/lineCategories/:id')
    .get(baseController.getItem)
    .put(baseController.putItem)
    .delete(baseController.deleteItem)

module.exports = router;
