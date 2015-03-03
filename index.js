/*
 * idefine namespace module
 *
 * Pass in arrays with strings of modules you would like to use,
 * they are automatically mapped to a variable with the modules name
 *
 * Strings passed in also become variables with same name as the
 * module that they represent
 *
 * Objects are unique in that you must specifically call require,
 * this allows you to map modules to variables with different names
 * or to map function returns to global variables, or any value to
 * any variable
 *
 */

module.exports = function ideclare () {
  var context = this;
  Array.prototype.forEach.call(arguments, function (arg) {
    var prop;
    if (arg.constructor === Array) {
      // Arrays map modules to same name variable
      try {
        arg.forEach(function (item) {
          if (typeof item === 'string') {
            var items = item.split('=')
            if (items.length == 1) {
              if (item.indexOf('.') === 0)
                context[item] = require('../' + item)
              else
                context[item] = require(item)
            } else {
              var mod = items.splice(0,1)[0].toString()
              context[mod] = require(mod)
              for (var i=0;i<items.length;i++)
                context[items[i]] = context[mod]();
            }
          }
        });
      } catch (err) { console.error('Hey Buddy, you mess up your requires!', err) }
    } else if (typeof arg === 'object')  {
      for (prop in arg) {
        context[prop] = arg[prop]
      }
    } else if (typeof arg === 'string') {
      if (arg.indexOf('.') === 0 )
        context[arg] = require('../'+arg)
      else
        context[arg] = require(arg)
    }
  })
}