var express = require('express');
var app = module.exports = express.createServer();
var hub = require('./hub')

// Configuration
app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(process.env.HUB_REPOS_CACHE));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.get('/:user/:project/:version/component.json', function(req, res) {
  hub.get(req.params.user, req.params.project, req.params.version, function(err, componentJson)  {
    if (err) {
      return res.send("Not Found", 404)
    }
    return res.json(componentJson);
  })
});

module.exports=app;