const http = require('http');

//Create server
const server = http.createServer((req, res) => {
    console.log('request made');
});

//Listen to http requests
server.listen(3000, 'localhost', () => {
    console.log('listening to request on port 3000')
})