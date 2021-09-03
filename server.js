const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.set('view engine', 'html');

app.engine('html', require('ejs').renderFile);

app.get('/',function(req,res) {
    res.end('Hello World!')
});

app.listen(PORT, ()=>{console.log(`Server listening on http://localhost:${PORT}`)});