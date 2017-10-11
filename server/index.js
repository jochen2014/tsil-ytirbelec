const express = require('express');
const richList = require('./data/celebrityRichList');

const app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, Authorization, X-Requested-With, Content-Type, Accept")
    next()
});
app.use(express.static('./dist'));
var router = express.Router()
router.get('/richList', function (req, res) {
    res.json(richList);
})
app.use('/',router)

const port = process.env.PORT || 3001;
app.listen(port);
console.log('sever is listening on http://localhost:' + port);
