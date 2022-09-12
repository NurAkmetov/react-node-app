import {RouteController} from "../controllers/routeController";
const {Route} = require("../db/models/route")

const router = require('express').Router();

const routeController = new RouteController(Route, Route.getProperties());

router.route('/route')
    .post(routeController.postItem)
    .get(routeController.getItems)

router.route('/route/search')
    .get(routeController.searchItems)

router.route('/route/:id')
    .get(routeController.getItem)
    .put(routeController.putItem)
    .delete(routeController.deleteItem)

module.exports = router;
