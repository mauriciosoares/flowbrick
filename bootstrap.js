(function(Flow) {
  'use strict';

  var request = new XMLHttpRequest();
  request.open('GET', '/flow.json', true);
  request.onload = function() {
    var data = JSON.parse(request.responseText),
      flow = new Flow(data);

    flow.init(1, {
      color: 'red'
    });
  };
  request.send();
} (window.Flow));
