const express    = require("express");
const ejs        = require("ejs");
const path       = require("path");
const bodyParser = require('body-parser')


const app = express();

// app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());                         // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies

app.engine('.html', ejs.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

// 
// routes
// 

// home
app.all("/", function (req, res, next) {
	req.body.pageFileName = "home.html";
	next();
});


app.get("*", (req, res) => {
	res.render("index", {
		pageFileName: req.body.pageFileName
	});
});

app.post("*", (req, res) => {
	let page = req.body.pageFileName;

	res.sendFile(__dirname + "/views/" + page);
});

var port = process.env.PORT ? process.env.PORT : 8080;
app.listen(port, () => {

	console.log('listening on ' + port);

});
