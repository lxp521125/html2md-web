// For Node
var { Sitdown } = require('sitdown')
var { applyJuejinRule } = require('@sitdown/juejin')
var { applyWechatRule } = require('@sitdown/wechat');
var { applyZhihuRule } = require('@sitdown/zhihu');
// const queryString = require("queryString")
var express = require('express');
var https = require('https');
var fs = require('fs');

var zhihusitdown = new Sitdown({
    keepFilter: ['style'],
    codeBlockStyle: 'fenced',
    bulletListMarker: '-',
    hr: '---',
});
var wechatsitdown = new Sitdown({
    keepFilter: ['style'],
    codeBlockStyle: 'fenced',
    bulletListMarker: '-',
    hr: '---',
});
var juejinsitdown = new Sitdown({
    keepFilter: ['style'],
    codeBlockStyle: 'fenced',
    bulletListMarker: '-',
    hr: '---',
});
var sitdown = new Sitdown({
    keepFilter: ['style'],
    codeBlockStyle: 'fenced',
    bulletListMarker: '-',
    hr: '---',
});
juejinsitdown.use(applyJuejinRule);
wechatsitdown.use(applyWechatRule);

zhihusitdown.use(applyZhihuRule);
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));//在原有的基础上加上下面代码即可
app.use(bodyParser.text({ limit: '50mb' }))
app.all("*", function (req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", "*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "content-type");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.send(200);  //让options尝试请求快速结束
    else
        next();
});
app.post('/', (req, res) => {
    var markdown = sitdown.HTMLToMD(req.body.cont)
    console.log("准备写入文件");
    fs.writeFile("./doc/" + req.body.title + ".md", markdown, function (err) {
        if (err) {
            return console.error(err);
        }
        console.log(req.body.title, "数据写入成功！");
    });
    res.send("ok")
})
app.post('/juejin', (req, res) => {
    var markdown = juejinsitdown.HTMLToMD(req.body.cont)
    console.log("准备写入文件");
    fs.writeFile("./doc/" + req.body.title + ".md", markdown, function (err) {
        if (err) {
            return console.error(err);
        }
        console.log(req.body.title, "数据写入成功！");
    });
    res.send("ok")
})
app.post('/wechat', (req, res) => {
    var markdown = wechatsitdown.HTMLToMD(req.body.cont)
    console.log("准备写入文件");
    fs.writeFile("./doc/" + req.body.title + ".md", markdown, function (err) {
        if (err) {
            return console.error(err);
        }
        console.log(req.body.title, "数据写入成功！");

    });
    res.send("ok")
})
app.post('/zhihu', (req, res) => {
    var markdown = zhihusitdown.HTMLToMD(req.body.cont)
    console.log("准备写入文件");
    fs.writeFile("./doc/" + req.body.title + ".md", markdown, function (err) {
        if (err) {
            return console.error(err);
        }
        console.log(req.body.title, "数据写入成功！");
    });
    res.send("ok")
})

app.post('/index', (req, res) => {
    fs.appendFile("./doc/readme.md", "[" + req.body.title + "](" + req.body.url + ")\n\n ", function (err) {
        if (err) {
            return console.error(err);
        }
        console.log(req.body.title, "浏览记录写入");
    });
    res.send("ok")
})
//同步读取密钥和签名证书
var options = {
    key: fs.readFileSync('./doc.aitboy.cn/doc.aitboy.cn.key'),
    cert: fs.readFileSync('./doc.aitboy.cn/doc.aitboy.cn_public.crt')
}

var httpsServer = https.createServer(options, app);
// var httpServer = http.createServer(app);

httpsServer.listen(443);
