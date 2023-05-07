const express = require('express');

const app = express();

//Listen for request
app.listen(3000);

//Respond to request
app.get('/', (req, res) => {
    //Response automatically sets the header and status code
    res.send('<p>EXPRESS</p>')
})