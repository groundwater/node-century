#!/usr/bin/env node

'use strict';

var argv    = require('minimist')(process.argv.slice(2))
var spawn   = require('child_process').spawn
var binding = require('./build/Release/binding.node')

var interactive = argv.interactive || false
var ival        = argv.interval || argv.i || 3000;

if (argv._.length == 0) {
  console.log('Usage: init EXEC [ARGS...]')

  process.exit(1)
}


// setup wait interval

setInterval(function(){
  if (interactive) console.log('calling wait')

  var status = binding.wait()

  if (interactive) console.log('status', status)
}, ival)


if (interactive) console.log('wait interval: %sms', ival)


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
  if (interactive) console.log('first runner exited')

  // do not exit 0 when first runner is terminated via signal
  if (signal) code = 2

  if (interactive) console.log('signal', signal ? signal : code)

  // shutdown in interactive mode
  if (interactive) {
    process.exit(code)
  }
})
