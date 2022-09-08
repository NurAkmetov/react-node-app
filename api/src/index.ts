const express = require('express');
const dotenv = require('dotenv');
const agenciesRoute = require('./routes/agencyRoutes');
const linesRoute = require('./routes/lineRoutes');
const stopsRoute = require('./routes/stopRoutes');
const lineCategoriesRoute = require('./routes/lineCategoryRoutes');
const vehicleTypesRoute = require('./routes/vehicleTypeRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use('/api', agenciesRoute);
app.use('/api', linesRoute);
app.use('/api', lineCategoriesRoute);
app.use('/api', stopsRoute);
app.use('/api', vehicleTypesRoute);

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
}).on('error', (err: any) => {
    console.log('ERROR: ', err)
});
