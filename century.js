#!/usr/bin/env node

'use strict';

var argv    = require('minimist')(process.argv.slice(2))
var spawn   = require('child_process').spawn
var binding = require('./build/Release/binding.node')

var interactive = argv.interactive
var verbose     = argv.verbose  || argv.v
var ival        = argv.interval || argv.i || 3000;

var args = argv._
var exec = args.shift()

if(!exec)
{
  if(interactive)
  {
    console.log('Usage: init [ARGS...] EXEC')

    process.exit(1)
  }

  console.log('No EXEC command found, starting REPL session')

  require('repl').start('century> ').on('exit', function()
  {
    console.log('Got "exit" event from repl!');
    process.exit(2);
  });

  return
}


function log(){
  if (verbose) console.log.apply(console, arguments)
}


// setup wait interval

setInterval(function(){
  log('calling wait')

  var status = binding.wait()

  log('status', status)
}, ival)

log('wait interval: %sms', ival)


// start first runner

var opts = {
  // the child should be attached to the same terminal
  // as the init process, in case the user wants an
  // immediately interactive experience
  stdio: 'inherit'
}

var proc = spawn(exec, args, opts)

proc.on('exit', function(code, signal)
{
  log('first runner exited')

  // do not exit 0 when first runner is terminated via signal
  if(signal) code = 3

  log('signal', signal ? signal : code)

  // shutdown in interactive mode
  if(interactive) process.exit(code)
})
