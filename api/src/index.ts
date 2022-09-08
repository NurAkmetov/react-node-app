import {isString} from "util";

const express = require('express');
const dotenv = require('dotenv');
const agenciesRoute = require('./routes/agencyRoutes');
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use('/api', agenciesRoute);

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
}).on('error', (err: any) => {
    console.log('ERROR: ', err)
});
