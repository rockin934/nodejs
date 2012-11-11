
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , jsdom = require('jsdom')
, request = require('request')
, url = require('url');
//, app = module.exports = express.createServer();

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
  });
  
  app.get('/nodetube', function(req, res){
   //Tell the request that we want to fetch youtube.com, send the results to a callback function
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
	});

