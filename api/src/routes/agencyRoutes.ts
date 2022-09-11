import {BaseController} from '../controllers/baseController';
const {Agency} = require("../db/models/agency")

const router = require('express').Router();

const baseController = new BaseController(Agency, Agency.getProperties());

router.route('/agency')
    .post(baseController.postItem)
    .get(baseController.getItems)

router.route('/agency/:id')
    .get(baseController.getItem)
    .put(baseController.putItem)
    .delete(baseController.deleteItem)

module.exports = router;
