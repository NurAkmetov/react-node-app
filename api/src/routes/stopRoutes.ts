import {StopController} from "../controllers/stopController";
const {Stop} = require("../db/models/stop")

const router = require('express').Router();

const stopController = new StopController(Stop, Stop.getProperties());

router.route('/stop')
    .post(stopController.postItem)
    .get(stopController.getItems)

router.route('/stop/search')
    .get(stopController.searchItems)

router.route('/stop/:id')
    .get(stopController.getItem)
    .put(stopController.putItem)
    .delete(stopController.deleteItem)

module.exports = router;
