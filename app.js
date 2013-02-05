var mkdirp = require('mkdirp');
var path = require('path');
var fs = require('fs');

function getUserHome() {
  return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}

if (typeof process.env.HUB_REPOS_CACHE === 'undefined')
  process.env.HUB_REPOS_CACHE = path.resolve('./repos');

if (typeof process.env.HUB_REPOS_JSON === 'undefined') {
  if (fs.existsSync(path.resolve('./hub.json'))) {
    process.env.HUB_REPOS_JSON = path.resolve("./hub.json");  
  } else {
    if (fs.existsSync(getUserHome() + '/.component-hub/hub.json')) {
      process.env.HUB_REPOS_JSON = getUserHome() + '/.component-hub/hub.json';    
    } else {
      console.log('Could not find hub.json file. Make sure you have either set the HUB_REPOS_JSON environment variable to its location, or have it at ~/.component-hub/hub.json, or in this working directory.')
      process.exit()
    }
  }
}

mkdirp(process.env.HUB_REPOS_CACHE, function(err) {
  if (err) return callback(err);
  var server = require('./lib/server');
  server.listen(process.env.HUB_PORT || 3333, function(){
    console.log("Express server listening on port %d in %s mode", server.address().port, server.settings.env);
  });
});
