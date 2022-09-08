const router = require('express').Router();

const {
    postAgency,
    getAgencies,
    getAgency,
    putAgency,
    deleteAgency
} = require('../controllers/agencyController')

router.route('/agencies')
    .post(postAgency)
    .get(getAgencies)

router.route('/agencies/:id')
    .get(getAgency)
    .put(() => putAgency)
    .delete(deleteAgency)

module.exports = router