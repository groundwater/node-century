'use strict';

var binding = require('./build/Release/binding.node')

setInterval(function I_WAIT(){
  var status = binding.wait()
  if (status) console.log('status', status)
  else process.stdout.write('.')
}, 1000)

// run a child that exits
binding.demo();
