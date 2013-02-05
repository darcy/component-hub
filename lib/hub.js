var fs = require('fs');
var sys = require('sys')
var exec = require('child_process').exec;
// function puts(error, stdout, stderr) { sys.puts(stdout) }

var hub=(function() {
  var hub={};

  hub.get = function(user, project, version, callback) {
  
      var repos = require(process.env.HUB_REPOS_JSON);
      if (!repos[user+"/"+project]) {
        return callback(new Error("Repository not found for "+user+"/"+project+" in hub.json"))
      }

      var repoRemote = repos[user+"/"+project];
      var repoLocal = process.env.HUB_REPOS_CACHE+"/"+user+"/"+project+"/"+version;

      var cloneAndCheckout = function(callback) {
        console.log("Cloning "+version+" of "+repoRemote+" to "+repoLocal )
        exec("git clone "+repoRemote+" -b "+version+" "+repoLocal, function(err, stdout, stderr) {
          if (err) {
            return callback(new Error("Could not clone "+version+" of "+repoRemote));
          }
          callback(null);
        });
      };
      var update = function(callback) {
        console.log("Updating "+version+" of "+repoRemote)
        exec("cd "+repoLocal+" && git pull", function(err, stdout, stderr) {
          if (err) {
            return callback(new Error("Could not update "+version+" of "+repoRemote));
          }
          callback(null);
        });
      };

      var readComponentJson = function(err) {
        if(err) {
          return callback(err)
        } 
        fs.readFile(repoLocal+'/component.json', function(err, data) {
          if (err) {
            return callback(new Error("Could not read component.json file. Expected to be found at "+repoLocal))
          }
          return callback(null, JSON.parse(data));
        })
      };

      if (!fs.existsSync(repoLocal)) {
        cloneAndCheckout(readComponentJson);
      } else {
        update(readComponentJson)
      }


  }
  return hub;
})();

module.exports=hub;