var webpage = require('webpage');
var system = require('system');
var page = webpage.create();
var spawn = require("child_process").spawn

page.onConsoleMessage = function (msg) {
    spawn("node", ["mp2md.js", msg])
};
var address = system.args[1];
console.log(address);
page.customHeaders = {
    "user-agent": "Mozilla / 5.0(Macintosh; Intel Mac OS X 10_15_7) AppleWebKit / 537.36(KHTML, like Gecko) Chrome / 90.0.4430.72 Safari / 537.36",
    "accept": "text / html, application/ xhtml + xml, application / xml; q = 0.9, image / avif, image / webp, image / apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9"
};
page.open(address, function (status) {
    if (status === 'fail') {
        console.log('open page fail!');
        return;
    } else {
        page.injectJs("getCont.js");
        setTimeout(phantom.exit, 30000);
    }
});
