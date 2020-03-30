//server/server.js

let express = require('express');
let cors = require('cors');
let bodyParser = require('body-parser');

const path = require('path');
const PORT = 8000; //server port

const connectDB = require('./db')
const seedDB = require('./seed')

const router = require('./routes')
const accountRouter = require('./Account/Account.route')
const documentRouter = require('./Document/Document.route')

seedDB(); // Populate database with test data

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(cors());
// app.use('/', router);
app.use('/accounts', accountRouter);
app.use('/documents', documentRouter);

app.set('view engine', 'html');
app.set('views', path.join(__dirname, '../public'));
app.engine('html', require('ejs').renderFile);

// app.get('/hey', (req, res) => res.send('ho!'))

app.listen(PORT, function () {
	console.log('running at localhost: ' + PORT);
});

module.exports = app;