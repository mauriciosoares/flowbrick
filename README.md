# Flowbrick

A simple flow defined by a JSON file and an entry object.

### API

The `Flow` constructor receives 1 parameter, which is the parsed JSON with all the rules.

The `Flow.init` method receives 2 parameters, the first one is the ID of the first rule to be executed, and the second is the object that's gonna be passing though the flow.

### How to use

The only requirement is to run a server within the folder of the project, if you use unix machines, you can run it with python:

```
$ git clone https://github.com/mauriciosoares/flowbrick.git

$ cd flowbrick

$ python -m SimpleHTTPServer
```

:)
