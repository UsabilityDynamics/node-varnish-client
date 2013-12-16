// instrument by jscoverage, do not modifly this file
(function () {
  var BASE;
  if (typeof global === 'object') {
    BASE = global;
  } else if (typeof window === 'object') {
    BASE = window;
  } else {
    throw new Error('[jscoverage] unknow ENV!');
  }
  if (!BASE._$jscoverage) {
    BASE._$jscoverage = {};
    BASE._$jscoverage_cond = {};
    BASE._$jscoverage_done = function (file, line, express) {
      if (arguments.length === 2) {
        BASE._$jscoverage[file][line] ++;
      } else {
        BASE._$jscoverage_cond[file][line] ++;
        return express;
      }
    };
    BASE._$jscoverage_init = function (base, file, lines) {
      var tmp = [];
      for (var i = 0; i < lines.length; i ++) {
        tmp[lines[i]] = 0;
      }
      base[file] = tmp;
    };
  }
})();
_$jscoverage_init(_$jscoverage, "lib/common/varnish_queue.js",[1,2,6,7,8,9,10,11,12,14,17,21,22,25,26,27,30,31,32,33,37,38,39,40,41,42,43,47,51,52,55,55,56,57,57,58,59,60,62,63,65,70,71,72,73,74,75,77,78,82,83,84,88,90]);
_$jscoverage_init(_$jscoverage_cond, "lib/common/varnish_queue.js",[42,55,57,59,62,72,77]);
_$jscoverage["lib/common/varnish_queue.js"].source = ["var EventEmitter = require('events').EventEmitter;","var VarnishClient = require('./varnish_client');","","function VarnishQueue(host, port) {","","    var self = this;","    var MAX_QUEUE = 2000;","    var queue = [];","    var ready = false;","    var reconnectTimer = null;","    var reconnectTries = 0;","    var MAX_RECONNECT_TRIES = 120; // 2 minutes","","    var client = new VarnishClient(host, port);","","    function log() {","        console.log.apply(console, arguments);","    }","","    // attach a dummy callback to error event to avoid nodejs throws an exception and closes the process","    self.on('error', function(e) {","        log(\"error\", e);","    });","","    client.on('connect', function() {","        clearInterval(reconnectTimer);","        reconnectTries = 0;","    });","","    client.on('ready', function() {","        ready = true;","        log('sending pending');","        _send_pending();","    });","","    function reconnect() {","        ready = false;","        clearInterval(reconnectTimer);","        reconnectTimer = setInterval(function() {","            client.connect();","            ++reconnectTries;","            if(reconnectTries >= MAX_RECONNECT_TRIES) {","                self.emit('error', {","                    code: 'ABORT_RECONNECT',","                    message: 'max reconnect tries, abouting'","                });","                clearInterval(reconnectTimer);","            }","        }, 1000);","    }","    client.on('close', reconnect);","    client.on('error', reconnect);","","    function _send_pending(empty_callback) {","        if(!ready) return;","        var c = queue.pop();","        if(!c) return;","        client.run_cmd(c, function() {","            if(queue.length > 0) {","                process.nextTick(_send_pending);","            } else {","                if(empty_callback) {","                    empty_callback();","                }","                self.emit('empty');","            }","        });","    }","","    this.run_cmd = function(cmd) {","        queue.push(cmd);","        if(queue.length > MAX_QUEUE) {","            console.log(\"varnish command queue too long, removing commands\");","            self.emit('error', {code: 'TOO_LONG', message: \"varnish command queue too long, removing commands\"});","            queue.pop();","        }","        if(ready) {","            _send_pending();","        }","    }","","    this.end = function() {","        _send_pending(function() {","            client.close();","        });","    }","}","VarnishQueue.prototype = new EventEmitter();","","module.exports = VarnishQueue;",""];
_$jscoverage_done("lib/common/varnish_queue.js", 1);
var EventEmitter = require("events").EventEmitter;

_$jscoverage_done("lib/common/varnish_queue.js", 2);
var VarnishClient = require("./varnish_client");

function VarnishQueue(host, port) {
    _$jscoverage_done("lib/common/varnish_queue.js", 6);
    var self = this;
    _$jscoverage_done("lib/common/varnish_queue.js", 7);
    var MAX_QUEUE = 2e3;
    _$jscoverage_done("lib/common/varnish_queue.js", 8);
    var queue = [];
    _$jscoverage_done("lib/common/varnish_queue.js", 9);
    var ready = false;
    _$jscoverage_done("lib/common/varnish_queue.js", 10);
    var reconnectTimer = null;
    _$jscoverage_done("lib/common/varnish_queue.js", 11);
    var reconnectTries = 0;
    _$jscoverage_done("lib/common/varnish_queue.js", 12);
    var MAX_RECONNECT_TRIES = 120;
    _$jscoverage_done("lib/common/varnish_queue.js", 14);
    var client = new VarnishClient(host, port);
    function log() {
        _$jscoverage_done("lib/common/varnish_queue.js", 17);
        console.log.apply(console, arguments);
    }
    _$jscoverage_done("lib/common/varnish_queue.js", 21);
    self.on("error", function(e) {
        _$jscoverage_done("lib/common/varnish_queue.js", 22);
        log("error", e);
    });
    _$jscoverage_done("lib/common/varnish_queue.js", 25);
    client.on("connect", function() {
        _$jscoverage_done("lib/common/varnish_queue.js", 26);
        clearInterval(reconnectTimer);
        _$jscoverage_done("lib/common/varnish_queue.js", 27);
        reconnectTries = 0;
    });
    _$jscoverage_done("lib/common/varnish_queue.js", 30);
    client.on("ready", function() {
        _$jscoverage_done("lib/common/varnish_queue.js", 31);
        ready = true;
        _$jscoverage_done("lib/common/varnish_queue.js", 32);
        log("sending pending");
        _$jscoverage_done("lib/common/varnish_queue.js", 33);
        _send_pending();
    });
    function reconnect() {
        _$jscoverage_done("lib/common/varnish_queue.js", 37);
        ready = false;
        _$jscoverage_done("lib/common/varnish_queue.js", 38);
        clearInterval(reconnectTimer);
        _$jscoverage_done("lib/common/varnish_queue.js", 39);
        reconnectTimer = setInterval(function() {
            _$jscoverage_done("lib/common/varnish_queue.js", 40);
            client.connect();
            _$jscoverage_done("lib/common/varnish_queue.js", 41);
            ++reconnectTries;
            _$jscoverage_done("lib/common/varnish_queue.js", 42);
            if (_$jscoverage_done("lib/common/varnish_queue.js", 42, reconnectTries >= MAX_RECONNECT_TRIES)) {
                _$jscoverage_done("lib/common/varnish_queue.js", 43);
                self.emit("error", {
                    code: "ABORT_RECONNECT",
                    message: "max reconnect tries, abouting"
                });
                _$jscoverage_done("lib/common/varnish_queue.js", 47);
                clearInterval(reconnectTimer);
            }
        }, 1e3);
    }
    _$jscoverage_done("lib/common/varnish_queue.js", 51);
    client.on("close", reconnect);
    _$jscoverage_done("lib/common/varnish_queue.js", 52);
    client.on("error", reconnect);
    function _send_pending(empty_callback) {
        _$jscoverage_done("lib/common/varnish_queue.js", 55);
        if (_$jscoverage_done("lib/common/varnish_queue.js", 55, !ready)) {
            _$jscoverage_done("lib/common/varnish_queue.js", 55);
            return;
        }
        _$jscoverage_done("lib/common/varnish_queue.js", 56);
        var c = queue.pop();
        _$jscoverage_done("lib/common/varnish_queue.js", 57);
        if (_$jscoverage_done("lib/common/varnish_queue.js", 57, !c)) {
            _$jscoverage_done("lib/common/varnish_queue.js", 57);
            return;
        }
        _$jscoverage_done("lib/common/varnish_queue.js", 58);
        client.run_cmd(c, function() {
            _$jscoverage_done("lib/common/varnish_queue.js", 59);
            if (_$jscoverage_done("lib/common/varnish_queue.js", 59, queue.length > 0)) {
                _$jscoverage_done("lib/common/varnish_queue.js", 60);
                process.nextTick(_send_pending);
            } else {
                _$jscoverage_done("lib/common/varnish_queue.js", 62);
                if (_$jscoverage_done("lib/common/varnish_queue.js", 62, empty_callback)) {
                    _$jscoverage_done("lib/common/varnish_queue.js", 63);
                    empty_callback();
                }
                _$jscoverage_done("lib/common/varnish_queue.js", 65);
                self.emit("empty");
            }
        });
    }
    _$jscoverage_done("lib/common/varnish_queue.js", 70);
    this.run_cmd = function(cmd) {
        _$jscoverage_done("lib/common/varnish_queue.js", 71);
        queue.push(cmd);
        _$jscoverage_done("lib/common/varnish_queue.js", 72);
        if (_$jscoverage_done("lib/common/varnish_queue.js", 72, queue.length > MAX_QUEUE)) {
            _$jscoverage_done("lib/common/varnish_queue.js", 73);
            console.log("varnish command queue too long, removing commands");
            _$jscoverage_done("lib/common/varnish_queue.js", 74);
            self.emit("error", {
                code: "TOO_LONG",
                message: "varnish command queue too long, removing commands"
            });
            _$jscoverage_done("lib/common/varnish_queue.js", 75);
            queue.pop();
        }
        _$jscoverage_done("lib/common/varnish_queue.js", 77);
        if (_$jscoverage_done("lib/common/varnish_queue.js", 77, ready)) {
            _$jscoverage_done("lib/common/varnish_queue.js", 78);
            _send_pending();
        }
    };
    _$jscoverage_done("lib/common/varnish_queue.js", 82);
    this.end = function() {
        _$jscoverage_done("lib/common/varnish_queue.js", 83);
        _send_pending(function() {
            _$jscoverage_done("lib/common/varnish_queue.js", 84);
            client.close();
        });
    };
}

_$jscoverage_done("lib/common/varnish_queue.js", 88);
VarnishQueue.prototype = new EventEmitter;

_$jscoverage_done("lib/common/varnish_queue.js", 90);
module.exports = VarnishQueue;