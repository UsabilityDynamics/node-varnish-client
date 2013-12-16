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
_$jscoverage_init(_$jscoverage, "lib/common/varnish_client.js",[1,2,6,7,8,9,10,11,14,18,18,19,20,21,22,23,24,25,26,27,28,31,34,37,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,61,62,63,66,67,68,69,70,75,76,77,79,86,87,88,90,91,93,94,102,103,104,105,108,110]);
_$jscoverage_init(_$jscoverage_cond, "lib/common/varnish_client.js",[18,18,22,42,47,51,76,87,90]);
_$jscoverage["lib/common/varnish_client.js"].source = ["var net = require('net')","var EventEmitter = require('events').EventEmitter;","","function VarnishClient(host, port, ready_callback) {","","    var self = this;","    var ready = false;","    var cmd_callback = null;","    var client = null;","    var connected = false;","    var connecting = false;","","    function log() {","        console.log.apply(console, arguments);","    }","","    function connect() {","        if(connecting || connected ) return;","        connecting = true;","        log(\"VARNISH: connection\");","        ready = false;","        if(!client) {","            client = net.createConnection(port, host);","            client.on('connect', function () {","                log(\"VARNISH: connected\");","                connected = true;","                self.emit('connect');","                connecting = false;","            });","        } else {","            client.connect(port, host);","        }","    }","    self.connect = connect;","","","    connect();","","    client.on('data', function (data) {","        data = data.toString();","        var lines = data.split('\\n', 2);","        if(lines.length == 2) {","            var tk = lines[0].split(' ')","            var code = parseInt(tk[0], 10);","            var body_length = parseInt(tk[1], 10);","            var body = lines[1];","            if(!ready) {","                ready = true;","                ready_callback && ready_callback();","                self.emit('ready');","            } else if(cmd_callback) {","                var c = cmd_callback","                cmd_callback = null;","                c(null, code, body);","                self.emit('response', code, body)","            }","        }","","    });","","    client.on('error', function(err) {","        log(\"[ERROR] some problem in varnish connection\", err);","        self.emit('error', err);","    });","","    client.on('close', function(e) {","        log(\"[INFO] closed varnish connection\");","        self.close();","        connected = false;","        connecting = false;","    });","","    // sends the command to the server","    function _send(cmd, callback) {","      cmd_callback = callback;","      if(connected) {","        client.write(cmd + '\\n');","      } else {","        connect();","      }","    }","","    // run command if there is no peding response","    // fist param of the callback are the error, null","    // if all went ok","    this.run_cmd = function(cmd, callback) {","       if(!connected) {","           connect();","       }","       if(!cmd_callback) {","         _send(cmd, callback);","       } else {","         callback('response pending');","         self.emit('error', {","            code: 'RESPONSE_PENDING',","            message: 'there is a response pending'","         });","       }","    }","","    // close the connection","    this.close = function() {","       client.end();","       ready = false; ","       self.emit('close');","    }","}","VarnishClient.prototype = new EventEmitter();","","module.exports = VarnishClient;",""];
_$jscoverage_done("lib/common/varnish_client.js", 1);
var net = require("net");

_$jscoverage_done("lib/common/varnish_client.js", 2);
var EventEmitter = require("events").EventEmitter;

function VarnishClient(host, port, ready_callback) {
    _$jscoverage_done("lib/common/varnish_client.js", 6);
    var self = this;
    _$jscoverage_done("lib/common/varnish_client.js", 7);
    var ready = false;
    _$jscoverage_done("lib/common/varnish_client.js", 8);
    var cmd_callback = null;
    _$jscoverage_done("lib/common/varnish_client.js", 9);
    var client = null;
    _$jscoverage_done("lib/common/varnish_client.js", 10);
    var connected = false;
    _$jscoverage_done("lib/common/varnish_client.js", 11);
    var connecting = false;
    function log() {
        _$jscoverage_done("lib/common/varnish_client.js", 14);
        console.log.apply(console, arguments);
    }
    function connect() {
        _$jscoverage_done("lib/common/varnish_client.js", 18);
        if (_$jscoverage_done("lib/common/varnish_client.js", 18, connecting) || _$jscoverage_done("lib/common/varnish_client.js", 18, connected)) {
            _$jscoverage_done("lib/common/varnish_client.js", 18);
            return;
        }
        _$jscoverage_done("lib/common/varnish_client.js", 19);
        connecting = true;
        _$jscoverage_done("lib/common/varnish_client.js", 20);
        log("VARNISH: connection");
        _$jscoverage_done("lib/common/varnish_client.js", 21);
        ready = false;
        _$jscoverage_done("lib/common/varnish_client.js", 22);
        if (_$jscoverage_done("lib/common/varnish_client.js", 22, !client)) {
            _$jscoverage_done("lib/common/varnish_client.js", 23);
            client = net.createConnection(port, host);
            _$jscoverage_done("lib/common/varnish_client.js", 24);
            client.on("connect", function() {
                _$jscoverage_done("lib/common/varnish_client.js", 25);
                log("VARNISH: connected");
                _$jscoverage_done("lib/common/varnish_client.js", 26);
                connected = true;
                _$jscoverage_done("lib/common/varnish_client.js", 27);
                self.emit("connect");
                _$jscoverage_done("lib/common/varnish_client.js", 28);
                connecting = false;
            });
        } else {
            _$jscoverage_done("lib/common/varnish_client.js", 31);
            client.connect(port, host);
        }
    }
    _$jscoverage_done("lib/common/varnish_client.js", 34);
    self.connect = connect;
    _$jscoverage_done("lib/common/varnish_client.js", 37);
    connect();
    _$jscoverage_done("lib/common/varnish_client.js", 39);
    client.on("data", function(data) {
        _$jscoverage_done("lib/common/varnish_client.js", 40);
        data = data.toString();
        _$jscoverage_done("lib/common/varnish_client.js", 41);
        var lines = data.split("\n", 2);
        _$jscoverage_done("lib/common/varnish_client.js", 42);
        if (_$jscoverage_done("lib/common/varnish_client.js", 42, lines.length == 2)) {
            _$jscoverage_done("lib/common/varnish_client.js", 43);
            var tk = lines[0].split(" ");
            _$jscoverage_done("lib/common/varnish_client.js", 44);
            var code = parseInt(tk[0], 10);
            _$jscoverage_done("lib/common/varnish_client.js", 45);
            var body_length = parseInt(tk[1], 10);
            _$jscoverage_done("lib/common/varnish_client.js", 46);
            var body = lines[1];
            _$jscoverage_done("lib/common/varnish_client.js", 47);
            if (_$jscoverage_done("lib/common/varnish_client.js", 47, !ready)) {
                _$jscoverage_done("lib/common/varnish_client.js", 48);
                ready = true;
                _$jscoverage_done("lib/common/varnish_client.js", 49);
                ready_callback && ready_callback();
                _$jscoverage_done("lib/common/varnish_client.js", 50);
                self.emit("ready");
            } else {
                _$jscoverage_done("lib/common/varnish_client.js", 51);
                if (_$jscoverage_done("lib/common/varnish_client.js", 51, cmd_callback)) {
                    _$jscoverage_done("lib/common/varnish_client.js", 52);
                    var c = cmd_callback;
                    _$jscoverage_done("lib/common/varnish_client.js", 53);
                    cmd_callback = null;
                    _$jscoverage_done("lib/common/varnish_client.js", 54);
                    c(null, code, body);
                    _$jscoverage_done("lib/common/varnish_client.js", 55);
                    self.emit("response", code, body);
                }
            }
        }
    });
    _$jscoverage_done("lib/common/varnish_client.js", 61);
    client.on("error", function(err) {
        _$jscoverage_done("lib/common/varnish_client.js", 62);
        log("[ERROR] some problem in varnish connection", err);
        _$jscoverage_done("lib/common/varnish_client.js", 63);
        self.emit("error", err);
    });
    _$jscoverage_done("lib/common/varnish_client.js", 66);
    client.on("close", function(e) {
        _$jscoverage_done("lib/common/varnish_client.js", 67);
        log("[INFO] closed varnish connection");
        _$jscoverage_done("lib/common/varnish_client.js", 68);
        self.close();
        _$jscoverage_done("lib/common/varnish_client.js", 69);
        connected = false;
        _$jscoverage_done("lib/common/varnish_client.js", 70);
        connecting = false;
    });
    function _send(cmd, callback) {
        _$jscoverage_done("lib/common/varnish_client.js", 75);
        cmd_callback = callback;
        _$jscoverage_done("lib/common/varnish_client.js", 76);
        if (_$jscoverage_done("lib/common/varnish_client.js", 76, connected)) {
            _$jscoverage_done("lib/common/varnish_client.js", 77);
            client.write(cmd + "\n");
        } else {
            _$jscoverage_done("lib/common/varnish_client.js", 79);
            connect();
        }
    }
    _$jscoverage_done("lib/common/varnish_client.js", 86);
    this.run_cmd = function(cmd, callback) {
        _$jscoverage_done("lib/common/varnish_client.js", 87);
        if (_$jscoverage_done("lib/common/varnish_client.js", 87, !connected)) {
            _$jscoverage_done("lib/common/varnish_client.js", 88);
            connect();
        }
        _$jscoverage_done("lib/common/varnish_client.js", 90);
        if (_$jscoverage_done("lib/common/varnish_client.js", 90, !cmd_callback)) {
            _$jscoverage_done("lib/common/varnish_client.js", 91);
            _send(cmd, callback);
        } else {
            _$jscoverage_done("lib/common/varnish_client.js", 93);
            callback("response pending");
            _$jscoverage_done("lib/common/varnish_client.js", 94);
            self.emit("error", {
                code: "RESPONSE_PENDING",
                message: "there is a response pending"
            });
        }
    };
    _$jscoverage_done("lib/common/varnish_client.js", 102);
    this.close = function() {
        _$jscoverage_done("lib/common/varnish_client.js", 103);
        client.end();
        _$jscoverage_done("lib/common/varnish_client.js", 104);
        ready = false;
        _$jscoverage_done("lib/common/varnish_client.js", 105);
        self.emit("close");
    };
}

_$jscoverage_done("lib/common/varnish_client.js", 108);
VarnishClient.prototype = new EventEmitter;

_$jscoverage_done("lib/common/varnish_client.js", 110);
module.exports = VarnishClient;