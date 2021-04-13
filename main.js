// For Node
var { Sitdown } = require('sitdown')
var { applyJuejinRule } = require('@sitdown/juejin')
const http = require("http")
const url = require("url")
// const queryString = require("queryString")

let sitdown = new Sitdown({
    keepFilter: ['style'],
    codeBlockStyle: 'fenced',
    bulletListMarker: '-',
    hr: '---',
});
sitdown.use(applyJuejinRule);

const express = require('express')
const app = express()
const port = 3000

const bodyParser = require('body-parser')
// app.use(bodyParser.raw());
// app.use(bodyParser.text());
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));//在原有的基础上加上下面代码即可

app.use(bodyParser.text({ limit: '50mb'}))
app.post('/', (req, res) => {
    var markdown = sitdown.HTMLToMD(req.body)
    res.send(markdown)
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
