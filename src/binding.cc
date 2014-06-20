#include "binding.h"

void InitAll(Handle<Object> exports) {
  exports->Set(NanNew<String>("wait"),
    NanNew<FunctionTemplate>(Wait)->GetFunction());
  exports->Set(NanNew<String>("demo"),
    NanNew<FunctionTemplate>(Demo)->GetFunction());
}

NODE_MODULE(binding, InitAll)
