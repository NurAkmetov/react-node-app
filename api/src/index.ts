const express = require('express');

const app = express();
const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
}).on('error', (err: any) => {
    console.log('ERROR: ', err)
});