(function(root, console) {
  // Flow constructor that handles everything
  function Flow(json) {
    this.rules = this.parseRules(json.rules);
  }

  // This parses all rules to eval the function body
  Flow.prototype.parseRules = function(rules) {
    return rules.map(function(rule) {
      rule.body = eval('(' + rule.body + ')');
      return rule;
    });
  };

  // simple wrapper to run the application
  Flow.prototype.init = function(id, object) {
    this.object = object;
    this.run(id);
  };

  // this will recursively be called until the application
  // condition is matched
  Flow.prototype.run = function(id) {
    var currentRule = this.findId(id),
      nextRule,
      result;

    // Checks if the ID index exists
    if(!currentRule.length) this.error('ID ' + id + ' was not found');

    // check if the current rule was already executed
    // to prevent circular calls and infinite loops
    if(currentRule[0].executed) this.error('Rule "' + currentRule[0].title + '" has already been executed');

    currentRule[0].executed = true;

    result = (currentRule[0].body(this.object)) ? 'trueId' : 'falseId'
    nextRule = currentRule[0][result];

    this.log(result, currentRule[0].title);

    // finishes the flow or restarts it.
    return (nextRule === null) ? console.log('END') : this.run(nextRule);
  }

  // simple log helper
  Flow.prototype.log = function(result, msg) {
    console[(result === 'trueId') ? 'log' : 'error'](msg, (result === 'trueId') ? 'passed' : 'failed');
  };

  // simple error helper
  Flow.prototype.error = function(msg) {
    throw new Error(msg);
  }

  // returns the object matched with the passed ID
  Flow.prototype.findId = function(id) {
    return this.rules.filter(function(rule) {
      return rule.id === id;
    });
  };

  root.Flow = Flow;
} (window, console))
