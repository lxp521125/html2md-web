var webpage = require('webpage');
var system = require('system');
var page = webpage.create();
page.onConsoleMessage = function (msg) {
    console.log(msg);
};
var address = system.args[1];
console.log(address);
page.open(address, function (status) {
    if (status === 'fail') {
        console.log('open page fail!');
        return;
    } else {
        page.includeJs("https://code.jquery.com/jquery-3.6.0.min.js", function () {
            page.injectJs("getCont.js");
        });
        setTimeout(phantom.exit, 10000);
    }
});