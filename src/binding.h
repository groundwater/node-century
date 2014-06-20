#include <node.h>
#include <sys/wait.h>
#include <nan.h>

using v8::FunctionTemplate;
using v8::Handle;
using v8::Number;
using v8::Object;
using v8::String;

NAN_METHOD(Demo);
NAN_METHOD(Wait);
