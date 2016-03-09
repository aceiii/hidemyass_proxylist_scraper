/*
 * Author: Borin Ouch
 * Copyright: (c) 2016 Borin Ouch
 * License: MIT
 */

var url = "http://proxylist.hidemyass.com/2";

var page = require("webpage").create();
page.settings.userAgent = "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:45.0) Gecko/20100101 Firefox/45.0";
page.open(url, function(status) {

    var ip_list = page.evaluate(function () {

        var ips = [];
        $("#listable tbody > tr > td:nth-child(2) > span").each(function (i, e) {
            var $node = $(e);

            var range = document.createRange();
            range.setStartBefore($node[0]);
            range.setEndAfter($node[0]);

            var selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
            ips.push(selection.toString().trim());
        });

        return ips;
    });

    console.log(ip_list.join("\n"));

    phantom.exit();
});

