var express = require('express')
var cors = require('cors')
//извлекает всю часть тела входящего потока запросов и предоставляет его для req.body.
var bodyParser = require('body-parser')  
var app = express()
var mongoose = require('mongoose')
var port = process.env.PORT || 5500
// bodyParser.json() : анализирует текст как JSON и выставляет результирующий объект в req.body .
app.use(bodyParser.json())
//CORS нужен для того, чтобы разрешить КЛИЕНТУ (браузеру) принять некоторые виды ресурсов.Традиционно браузер может подключить картинки, iframe, скрипты и флеш с других доменов, но не может использовать ajax или web fonts, если на сервере этот домен не внесен в список Access-Control-Allow-Origin.
app.use(cors())
// bodyParser.urlencoded() : анализирует текст как кодированные URL-адреса (так как браузеры, как правило, отправляют данные формы из обычных форм, установленных в POST) и выдает результирующий объект (содержащий ключи и значения) в req.body
app.use(
	bodyParser.urlencoded({
		//string or array (when extended is false), or any type (when extended is true).
		extended: false,
	}),
)

const mongoURL = 'mongodb://localhost:27017/mernloginreg'

mongoose
	//useNewUrlParser: true - оно указывает инфраструктуре mongodb, что надо использовать новый парсел адреса сервера.
	.connect(mongoURL, { useNewUrlParser: true })
	.then(() => console.log('MongoDb connected'))
	.catch(err => console.log(err))

var Users = require('./routes/Users')

app.use('/users', Users)

app.listen(port, () => {
	console.log('Server is running on port: ' + port)
})
