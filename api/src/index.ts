const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const agenciesRoute = require('./routes/agencyRoutes');
const linesRoute = require('./routes/lineRoutes');
const stopsRoute = require('./routes/stopRoutes');
const lineCategoriesRoute = require('./routes/lineCategoryRoutes');
const vehicleTypesRoute = require('./routes/vehicleTypeRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());

const corsOptions = {
    origin: `http://localhost:3000`,
    optionsSuccessStatus: 200
}

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
}).on('error', (err: any) => {
    console.log('ERROR: ', err)
});

app.use('/api', cors(corsOptions), agenciesRoute);
app.use('/api', cors(corsOptions), linesRoute);
app.use('/api', cors(corsOptions), lineCategoriesRoute);
app.use('/api', cors(corsOptions), stopsRoute);
app.use('/api', cors(corsOptions), vehicleTypesRoute);
