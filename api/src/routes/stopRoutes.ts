import {BaseController} from '../controllers/baseController';
const {Stop} = require("../db/models/stop")

const router = require('express').Router();

const baseController = new BaseController(Stop, Stop.getProperties());

router.route('/stop')
    .post(baseController.postItem)
    .get(baseController.getItems)

router.route('/stop/:id')
    .get(baseController.getItem)
    .put(baseController.putItem)
    .delete(baseController.deleteItem)

module.exports = router;
