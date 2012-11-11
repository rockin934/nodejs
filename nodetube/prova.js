
/**
 * Module dependencies.
 */

var jsdom = require('jsdom')
, request = require('request')
, url = require('url');

        request({uri: 'http://www.google.it'}, function(err, response, body){
                var self = this;
      self.items = new Array();//I feel like I want to save my results in an array
      //Just a basic error check
                if(err && response.statusCode !== 200){console.log('Request error.');}
                //Send the body param as the HTML code we will parse in jsdom
      //also tell jsdom to attach jQuery in the scripts and loaded from jQuery.com
      jsdom.env({
                        html: body,
                        scripts: ['http://code.jquery.com/jquery-1.6.min.js']
                }, function(err, window){
         //Use jQuery just as in a regular HTML page
                        var $ = window.jQuery;
                        console.log($('title').text());
                        res.end($('title').text());
                });
        });
	

