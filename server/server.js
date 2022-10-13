var express = require('express')
var cors = require('cors')
//extracts the whole part of the body of the incoming request stream and provides it for req.body.
var bodyParser = require('body-parser')
var app = express()
var mongoose = require('mongoose')
var port = process.env.PORT || 5500
// bodyParser.json() : parses text as JSON and exposes the resulting object in req.body .
app.use(bodyParser.json())
//CORS is needed to allow the CUSTOMER (browser) to accept some types of resources.Traditionally, the browser can connect pictures, iframes, scripts and flash from other domains, but cannot use ajax or web fonts if this domain is not listed on the server Access-Control-Allow-Origin.
app.use(cors())
app.use(
	// bodyParser.urlencoded() : parses text as encoded URLs (since browsers tend to send form data from normal forms set to POST) and outputs the resulting object (containing keys and values) to req.body
	bodyParser.urlencoded({
		//string or array (when extended is false), or any type (when extended is true).
		extended: false,
	}),
)

const mongoURL = 'mongodb://localhost:27017/mernloginreg'

mongoose
	//useNewUrlParser: true - it tells mongodb infrastructure to use the new parsel address of the server.
	.connect(mongoURL, { useNewUrlParser: true })
	.then(() => console.log('MongoDb connected'))
	.catch(err => console.log(err))

var Users = require('./routes/Users')

app.use('/users', Users)

app.listen(port, () => {
	console.log('Server is running on port: ' + port)
})
