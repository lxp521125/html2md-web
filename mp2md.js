// // For Node
var { Sitdown } = require('sitdown')
var { applyJuejinRule } = require('@sitdown/juejin')
var { applyWechatRule } = require('@sitdown/wechat');
var { applyZhihuRule } = require('@sitdown/zhihu');
var fs = require('fs');


var wechatsitdown = new Sitdown({
    keepFilter: ['style'],
    codeBlockStyle: 'fenced',
    bulletListMarker: '-',
    hr: '---',
});
wechatsitdown.use(applyWechatRule);

var a = JSON.parse(process.argv.splice(2));

if (a.cont && a.cont != "") {
    var markdown = wechatsitdown.HTMLToMD(a.cont)
    console.log("准备写入文件");
    fs.writeFile("./doc/" + a.title + ".md", markdown, function (err) {
        if (err) {
            return console.error(err);
        }
        console.log(a.title, "数据写入成功！");
    });
}
if (a.url && a.title != "" && a.url != "") {
    fs.appendFile("./doc/readme.md", "[" + a.title + "](" + a.url + ")\n\n ", function (err) {
        if (err) {
            return console.error(err);
        }
        console.log(req.body.title, "浏览记录写入");
    });
}
