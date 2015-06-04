/*
idefine namespace module

Copyright (c) 2015 Michael Rosata mike@onethingsimple.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

// Going to use path to handle path resolution
var path = require('path')

module.exports = function ideclare () {
  var context = this
  Array.prototype.forEach.call(arguments, function (arg) {
    var prop;
    if (arg.constructor === Array) {
      // Arrays map modules to same name variable
      try {
        arg.forEach(function (item) {
          if (typeof item === 'string') {
            var items = item.split('=')
            if (items.length == 1) {
              var itemName = item.replace(/-([a-zA-Z])?/, function (m) {
                return m[1] == null ? '' : m[1].toUpperCase()
              })
              context[itemName] = require(item)
            } else if (items.length > 1) {
              var app = items.shift().toString()
              var mod = items.shift().toString()
              var modName = mod.replace(/-([a-zA-Z])?/, function (m) {
                return m[1] == null ? '' : m[1].toUpperCase()
              })
              context[modName] = require(mod)
              context[app] = context[modName].apply(context, items)
            }
          }
        }) /// end forEach
      } catch (err) { console.error('Hey Buddy, you mess up your requires!! %s', err.message) }
      
    } else if (typeof arg === 'object')  {
      for (prop in arg) {
        var propName;
        if (arg[prop].toString().indexOf('/') !== -1 || arg[prop].toString().indexOf('.js') !== -1)
          context[prop] = require(path.normalize('../../' + arg[prop]))
        else
          context[prop] = require(arg[prop])
      }
    } else {
      if (typeof arg === 'string')
        context[arg] = require(arg)
    }
  })
}
