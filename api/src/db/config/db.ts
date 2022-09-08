import {TypedKnex} from "@wwwouter/typed-knex";

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const db = require('knex')(configuration);

const typedKnex = new TypedKnex(db);

module.exports = typedKnex;