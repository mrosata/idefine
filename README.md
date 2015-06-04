# **idefine**

Define modules cleanly in your node.js files. This is very lightweight, it's meant to setup modules and that's it. Take a look at the code snippets below to see how easily idefine can make your code look oh devine. The example senerio uses common generic app setup based on Express/Jade and dummy db hookup. I chose this example because it clearly showcases every use case for this module. So you can clearly read it and understand how the module works and what it can do for you. Both of the code samples below achieve the same exact thing in the exact same sequence.


Updates
- Added auto camelcase, you no longer need to explicitly map modules with hyphens to valid var names as idefine will automatically camelcase the namespace in those situations. For example `cookie-parser` imports to `cookieParser`. You can still choose to map custom names through objects though if you like `{ cp : 'cookie-parser' }`  

### With idefine:
```js
require('idefine')
(['app=express','path','cookie-parser','body-parser']
  ,{ favicon : 'serve-favicon', logger : 'morgan' }
  ,{
    routes : './routes/index',
    users  : './routes/users'
  }),['mongo','db=mongo=localhost:8080']
```

#### Without idefine:
```js
var express = require('express')
var app = express()

var path = require('path')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')

var favicon = require('serve-favicon')
var logger = require('morgan')

var routes = require('./routes/index')
var users = require('./routes/users')

var mongo = require('mongo')
var monk = require('monk')
var db = monk('localhost:8080')
```
---
I created this module coming from a client-side JavaScript 4 space tab background. I defined my vars at the top of each scope under a single 'var' declaration. When I started node and switched over to 2 space tabs I didn't like the way all the module require statements looked atop my code. So I made a cleaner solution for myself. This is my module, there are many modules like it but this one is mine, it is my best friend.

### Some Instruction

 Pass in any of the following:
   Arrays containing strings with modules you would like to import or strings with the names of modules to import and they will automatically map to a same name variable
 
#### **IE doing this**:
```js
idefine(['module1','module-two'], 'module3', 'module-four')
```
##### ***Would be the same as doing this***:
```js
var module1 = require('module1')
var moduleTwo = require('module-two')
var module3 = require('module3')
var moduleFour = require('module-four')
```
Pass in an object to explicitly map modules to your own custom namespaces

#### ***IE doing this***:
```js
idefine({
  'cool' : 'moves-dude'
  ,'rel' : './rel/from/root/index.js'
})
```
##### ***Would be the same as doing this***:
```js
var cool = require('moves-dude')
var rel = require('./rel/from/root/index.js')
```
Modules that you import and then use to create other objects or namespaces can be achieved in one step by using a string pattern of `'<name>=<module>=<arg1>=<arg2>`
#### ***IE passing in something like this***:
```js
idefine('app=framework=port=user')
```
##### ***Would be the same as doing this***:
```js
var framework = require('framework')
var app = framework('port','user')
```
 You can choose to use or not use any amount of arguments.

Keep in Mind:
  - Modules get defined in the order in which they are passed into idefine 
  - All modules may be passed as either strings, or an array or strings, or mapped by object
  - Passing `'app=express'` is the same as `express = require('express');app = express();`
  - Passing `'db=monk=localhost:8080'`,
    - is the same as `monk = require('monk');db = monk('localhost:8080');`
  - Relative paths should be resolvable from the folder where you ran `npm install idefine --save`.

##### **So let's put it all together** :
##### (*although this example isn't that effecient, it displays all uses*)

```js
require('idefine')
  (['module1','module-two'], 'module3', 'module-four'
  ,{
    'cool' : 'moves-dude'
    ,'rel' : './rel/from/root/index.js'
  }
  ,'app=framework=port=user')
```
#### Is the same thing as doing:

```js
var module1 = require('module1')
var moduleTwo = require('module-two')
var module3 = require('module3')
var moduleFour = require('module-four')

var cool = require('moves-dude')
var rel = require('./rel/from/root/index.js')

var framework = require('framework')
var app = framework('port','user')
```

#### Version
0.2.2

### Installation

Calling 3rd party npm modules like 'through2', 'mongodb', 'jade' and 'express':

```sh
$ npm install idefine
```
Calling relative path modules? For now, requiring local modules like './cat-sounds/index.js' or 'my/stuff' requires a local install for resolving relative paths, this will be changed in v1.0.0 but for now:
```sh
$ npm install idefine --save
```
I wrote this module for personal use, but feel free to use it as you please. There are only a few additions I may apply in the future, but I'm not in a hurry to do so atm.

> **Todo:**
> - Write Tests
> - Add comments
> - Resolve root dir to resolve relative path strings when running globally
> - When parsing `'&lt;name&gt;=&lt;module&gt;=&lt;args&gt; attempt to force any obvious typing, eg '12' = 12

License
----

GPL v2

**If you enjoy or if you have any comments, let me know!**
[mike@onethingsimple.com](http://onethingsimple.com)
