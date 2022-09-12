import {BaseController} from '../controllers/baseController';
const {VehicleType} = require("../db/models/vehicleType")

const router = require('express').Router();

const baseController = new BaseController(VehicleType, VehicleType.getProperties());

router.route('/vehicleType')
    .post(baseController.postItem)
    .get(baseController.getItems)

router.route('/vehicleType/search')
    .get(baseController.searchItems)

router.route('/vehicleType/:id')
    .get(baseController.getItem)
    .put(baseController.putItem)
    .delete(baseController.deleteItem)

module.exports = router;
