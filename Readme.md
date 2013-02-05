# component-hub

Component Hub is an addon for [component](https://github.com/component/component) to help with remote repositories, it can do two things:

 1) *Server:* A `node` server that dynamically clones git repositories based on github-style paths. It serves up components like [Contre](https://github.com/godmodelabs/contre) does except that it will dynamically pull down the git repositories for you and keep them updated.

 A request comes in for /:user/:project/:version/component.json and the hub server will find the repository and clone it if it hasn't already, or update it if it has a copy. Then it just serves the files up to the `Component` installer.

 The repositories are configured via a `hub.json` file that maps the component name to a git location. The git location can be anywhere.

 2) *NPM*: It is also an npm module and command, so that you can call `hub install` and it will fire up the server on demand and install the components, then shut the server down. It basically wraps `component install` with starting and stopping the server.

 When running as a command, it will store the downloaded git repos by default in `~/.component-hub/repos`. It will also look for a `hub.json` in the current working directory. Both of these can be set with environment variables to be wherever you want. Namely, `HUB_REPOS_CACHE` and `HUB_REPOS_JSON`.

## Requirements

 - component version >= 0.11.1 which has support for remotes
 - You must specify your `remotes` in your `component.json` [spec](https://github.com/component/component/wiki/Spec) to use the hub which by default runs at http://localhost:3333. 

## Server Usage

```
$ node app.js
```


## NPM Install

```
$ npm install -g component-hub
```


## NPM Usage

Once this is in place, you can run `hub install` from the directory where you would usually run `component install`. Any additional arguments are passed along to `component install`.


## hub.json

`hub.json` is looked for in these places 

 1. Using the HUB_REPOS_JSON environment variable.
 2. `~/.component-hub/hub.json` 
 3. The app directory of the hub server if running as a server.
 4. The directory of the project you are in if running as command.

Sample contents of the hub.json:

```
{
  "me/otherproject": "git@assembla.com:otherproject.git",
  "company/secretproject": "git@secretlocation.com:secretproject.git"
}
```




## License

(The MIT License)

Copyright (c) 2013 Darcy Brown <darcy@darcybrown.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.