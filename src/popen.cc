#include "binding.h"

#include <stdio.h>

// this is just for demo purposes
NAN_METHOD(Demo) {
  NanScope();

  popen("sleep 30", "r");

  NanReturnUndefined();
}
