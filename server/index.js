const express = require('express');
const richList = require('./data/celebrityRichList');

const app = express();
app.use(express.static('./dist'));
app.get('/richList', (req, res) => {
    res.json(richList);
});

const port = process.env.PORT || 3001;
app.listen(port);
console.log('sever is listening on http://localhost:' + port + '/richList');
