var express = require('express');
var products = express.Router();
var category = express.Router();
var fs = require('fs');
var app = express();

var path = 'logger.txt';

app.use(function(request, response, next){
    var decodedUrl = decodeURIComponent(request.url);

    var data = `URL : ${decodedUrl}; Time: ${new Date().toLocaleString()};\n`;

    fs.appendFile(path, data, function(err){
        console.log('data wrote');
    });

    next();
});

function findSpecs(data, searchName) {
    let lowerCaseData = data.toLowerCase();
    let blocks = lowerCaseData.split('=');
    let result = '';

    blocks.forEach(block => {
        if (block.includes(searchName.toLowerCase())) { result += block; }
    });

    return result.length != 0 ? result : -1;
}

products.route('/')
    .get(function(req, res) {
        fs.readFile('products.txt', 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading file:', err);
                return;
            }

            let lowerCaseData = data.toLowerCase();
            let blocks = lowerCaseData.split('=');
            let result = '';

            blocks.forEach(block => { result += `<p>${block}</p>`; });

            res.send(result);
        });
    });
products.route('/:name')
    .get(function(req, res) {
        fs.readFile('products.txt', 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading file:', err);
                return;
            }

            result = findSpecs(data, req.params.name).toString();

            console.log(result);
            res.send(result);
        });
    });
app.use("/products", products);


category.route('/')
    .get(function(req, res) {
        fs.readFile('category.txt', 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading file:', err);
                return;
            }

            let lowerCaseData = data.toLowerCase();
            let blocks = lowerCaseData.split('=');
            let result = '';

            blocks.forEach(block => { result += `<p>${block}</p>`; });

            res.send(result);
        });
    });
category.route('/:name')
    .get(function(req, res) {
        fs.readFile('category.txt', 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading file:', err);
                return;
            }

            result = findSpecs(data, req.params.name).toString();

            console.log(result);
            res.send(result);
        });
    });
app.use("/category", category);


app.get("/", function(req, res) {
    res.send("Главная страница");
});

app.listen(8080);