#include "binding.h"

NAN_METHOD(Wait) {
  NanScope();

  int status;

  // non-blocking

  // do not wait for a dead child because this is run on the main event loop
  // this method is intended for init, who inherits children that it did not spawn
  pid_t ok = waitpid(-1, &status, WNOHANG);

  if (ok == 0) {

    // no child exited
    NanReturnNull();
  }
  else if (ok == -1) {

    // no children
    NanReturnUndefined();
  }
  else {
    // we caught a child exiting

    // the exit status is an integer containing bits of useful information

    Handle<Object> o = NanNew<Object>();

    o->Set(NanNew<String>("_")        , NanNew<Number>(status));
    o->Set(NanNew<String>("exited")   , NanNew<Number>(WIFEXITED(status)));
    o->Set(NanNew<String>("status")   , NanNew<Number>(WEXITSTATUS(status)));
    o->Set(NanNew<String>("signal")   , NanNew<Number>(WIFSIGNALED(status)));
    o->Set(NanNew<String>("termsig")  , NanNew<Number>(WTERMSIG(status)));
    o->Set(NanNew<String>("coredump") , NanNew<Number>(WCOREDUMP(status)));
    o->Set(NanNew<String>("ifstopped"), NanNew<Number>(WIFSTOPPED(status)));
    o->Set(NanNew<String>("stopsig")  , NanNew<Number>(WSTOPSIG(status)));
    o->Set(NanNew<String>("continued"), NanNew<Number>(WIFCONTINUED(status)));

    NanReturnValue(o);
  }
}
