# Century

> a minimal pid 1 process

```bash
$ init --interval=10000 -- asgard -- boot
```

This only does two things:

1. calls `wait` periodically to free orphaned zombie processes
2. boots another process

Century doesn't care if the next process exists.

- century is not a job runner
- century doesn't care how your system boots
- century doesn't care if your system boots at all

Century is there to reap processes.

## Related

- [asgard](https://github.com/groundwater/node-asgard.git)
- [node-os](https://node-os.com/)
