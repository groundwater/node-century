#!/usr/bin/env node

'use strict';

var argv    = require('minimist')(process.argv.slice(2))
var spawn   = require('child_process').spawn
var binding = require('./build/Release/binding.node')

var BOOT    = process.env.BOOT || false
var ival    = argv.interval || argv.i || 3000;

if (argv._.length == 0) {
  console.log('Usage: init EXEC [ARGS...]')

  process.exit(1)
}

if (BOOT) {
  console.log('boot mode')
} else {
  console.log('interactive mode')
}

// setup wait interval

setInterval(function(){
  console.log('calling wait')
  var status = binding.wait()
  console.log('status', status)
}, ival)

console.log('wait interval: %sms', ival)

// start first runner

var args = argv._
var exec = args.shift()
var opts = {

  // the child should be attached to the same terminal
  // as the init process, in case the user wants an
  // immediately interactive experience

  stdio: 'inherit'
}

var proc = spawn(exec, args, opts)

proc.on('exit', function(code, signal){
  console.log('first runner exited')

  // exit code, or 1
  var exit = code
  if (signal) {
    exit = 2 // do not exit 0 when first runner is terminated via signal

    console.log('signal', signal)
  } else {
    console.log('code', code)
  }

  // shutdown in non-boot (interactive) mode
  if (!BOOT) {
    process.exit(exit)
  }

})
