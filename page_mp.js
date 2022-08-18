var webpage = require('webpage');
var system = require('system');
var page = webpage.create();
var webPage2 = require('webpage');
var page2 = webPage2.create();

page.onConsoleMessage = function (msg) {
    var up = JSON.parse(msg);
    console.log(up);
    if (up.data) {
        var settings = {
            operation: "POST",
            encoding: "utf8",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            data: up.data
          };
          page2.open(up.url, settings, function(status) {
            console.log('Status: ' + status);
        });
    }
};
var address = system.args[1];
console.log(address);
page.open(address, function (status) {
    if (status === 'fail') {
        console.log('open page fail!');
        return;
    } else {
        page.injectJs("getCont.js");
        setTimeout(phantom.exit, 20000);
    }
});