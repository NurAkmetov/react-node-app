const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
}).on('error', (err: any) => {
    console.log('ERROR: ', err)
});
