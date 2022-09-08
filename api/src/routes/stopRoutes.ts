import {BaseApiService} from '../controllers/baseController';
const {Stop} = require("../db/models/stop")

const router = require('express').Router();

const baseController = new BaseApiService(Stop, Stop.getProperties());

router.route('/stops')
    .post(baseController.postItem)
    .get(baseController.getItems)

router.route('/stops/:id')
    .get(baseController.getItem)
    .put(baseController.putItem)
    .delete(baseController.deleteItem)

module.exports = router;
