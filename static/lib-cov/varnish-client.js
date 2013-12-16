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
_$jscoverage_init(_$jscoverage, "lib/varnish-client.js",[11,12,15,16,17,18,19,20,21,22,25,66,66,67,68,69,70,71,72,73,74,75,76,79,83,85,87,88,89,90,91,92,93,94,95,96,98,99,100,101,102,103,109,110,111,114,115,116,117,118,123,124,125,127,134,135,136,138,139,141,142,150,151,152,153,157,165,230,253]);
_$jscoverage_init(_$jscoverage_cond, "lib/varnish-client.js",[11,66,66,70,90,95,99,124,135,138]);
_$jscoverage["lib/varnish-client.js"].source = ["/**"," * Varnish Client."," *"," * @param host"," * @param port"," * @param ready_callback"," */","function varnishClient( options ) {","","  // Force Instantiation.","  if( !( this instanceof varnishClient ) ) {","    return varnishClient.create( options || {});","  }","","  var settings = require( 'object-settings' );","  var emitter = require( 'object-emitter' );","  var net = require( 'net' );","  var ready = false;","  var cmd_callback = null;","  var client = null;","  var connected = false;","  var connecting = false;","","  // Extend Instance Properties.","  var self = Object.defineProperties( this, {","    options: {","      /**","       * Options Handling.","       *","       * Adds object-settings functionality to this.options and this, for convinience.","       *","       * @property options","       */","      value: new settings.mixin( this ).set( this.utility.defaults( options || {}, varnishClient.defaults ) ),","      enumerable: true,","      configurable: true,","      writable: true","    },","    emitter: {","      /**","       * Event Handling.","       *","       * Adds object-emitter functionality to this.options and this, for convinience.","       *","       * @property emitter","       */","      value: new emitter.mixin( this ),","      enumerable: true,","      configurable: true,","      writable: true","    },","    queue: {","      /**","       * Command Queue","       *","       * @property queue","       */","      value: [],","      enumerable: true,","      configurable: true,","      writable: true","    }","  });","","  function connect() {","    if( connecting || connected ) return;","    connecting = true;","    varnishClient.debug( \"connection\" );","    ready = false;","    if( !client ) {","      client = net.createConnection( self.options.get( 'port' ), self.options.get( 'host' ) );","      client.on( 'connect', function() {","        varnishClient.debug( \"connected\" );","        connected = true;","        self.emit( 'connect' );","        connecting = false;","      });","    } else {","      client.connect( self.options.get( 'port' ), self.options.get( 'host' ) );","    }","  }","","  self.connect = connect;","","  connect();","","  client.on( 'data', function( data ) {","    data = data.toString();","    var lines = data.split( '\\n', 2 );","    if( lines.length == 2 ) {","      var tk = lines[0].split( ' ' )","      var code = parseInt( tk[0], 10 );","      var body_length = parseInt( tk[1], 10 );","      var body = lines[1];","      if( !ready ) {","        ready = true;","        // ready_callback && ready_callback();","        self.emit( 'ready', null, self );","      } else if( cmd_callback ) {","        var c = cmd_callback","        cmd_callback = null;","        c( null, code, body );","        self.emit( 'response', code, body )","      }","    }","","  });","","  client.on( 'error', function( err ) {","    varnishClient.debug( \"[ERROR] some problem in varnish connection\", err );","    self.emit( 'error', err );","  });","","  client.on( 'close', function( e ) {","    varnishClient.debug( \"[INFO] closed varnish connection\" );","    self.close();","    connected = false;","    connecting = false;","  });","","  // sends the command to the server","  function _send( cmd, callback ) {","    cmd_callback = callback;","    if( connected ) {","      client.write( cmd + '\\n' );","    } else {","      connect();","    }","  }","","  // run command if there is no peding response","  // fist param of the callback are the error, null","  // if all went ok","  this.run_cmd = function( cmd, callback ) {","    if( !connected ) {","      connect();","    }","    if( !cmd_callback ) {","      _send( cmd, callback );","    } else {","      callback( 'response pending' );","      self.emit( 'error', {","        code: 'RESPONSE_PENDING',","        message: 'there is a response pending'","      });","    }","  }","","  // close the connection","  this.close = function() {","    client.end();","    ready = false;","    self.emit( 'close' );","  }","","  // @chainable","  return this;","","}","","/**"," * Instance Properties"," *"," */","Object.defineProperties( varnishClient.prototype, {","  cmd: {","    /**","     * Send Command","     *","     */","    value: function cmd() {","","    },","    enumerable: true,","    configurable: true,","    writable: true","  },","  connect: {","    /**","     * Send Command","     *","     */","    value: function connect() {","","    },","    enumerable: true,","    configurable: true,","    writable: true","  },","  close: {","    /**","     * Send Command","     *","     */","    value: function close() {","","    },","    enumerable: true,","    configurable: true,","    writable: true","  },","  send: {","    /**","     * Send Command","     *","     */","    value: function send() {","","    },","    enumerable: true,","    configurable: true,","    writable: true","  },","  utility: {","    /**","     * Middleware Application Instance.","     *","     * @property utility","     */","    value: require( './common/utility' ),","    enumerable: false,","    writable: false","  }","});","","/**"," * Constructor Properties"," *"," */","Object.defineProperties( module.exports = varnishClient, {","  debug: {","    /**","     * Debug Method.","     *","     * @method debug","     */","    value: require( 'debug' )( 'varnish:client' ),","    enumerable: false,","    writable: false","  },","  version: {","    /**","     * Module Version.","     *","     * @method version","     */","    value: require( '../package' ).version,","    enumerable: true,","    writable: false","  },","  create: {","    value: function create( options ) {","      return new varnishClient( options );","    },","    enumerable: true,","    configurable: true,","    writable: true","  },","  defaults: {","    /**","     * Default Options.","     *","     * @for varnishClient","     */","    value: {","      host: '127.0.0.1',","      port: 3000","    },","    enumerable: false,","    configurable: true,","    writable: true","  }","});"];
function varnishClient(options) {
    _$jscoverage_done("lib/varnish-client.js", 11);
    if (_$jscoverage_done("lib/varnish-client.js", 11, !(this instanceof varnishClient))) {
        _$jscoverage_done("lib/varnish-client.js", 12);
        return varnishClient.create(options || {});
    }
    _$jscoverage_done("lib/varnish-client.js", 15);
    var settings = require("object-settings");
    _$jscoverage_done("lib/varnish-client.js", 16);
    var emitter = require("object-emitter");
    _$jscoverage_done("lib/varnish-client.js", 17);
    var net = require("net");
    _$jscoverage_done("lib/varnish-client.js", 18);
    var ready = false;
    _$jscoverage_done("lib/varnish-client.js", 19);
    var cmd_callback = null;
    _$jscoverage_done("lib/varnish-client.js", 20);
    var client = null;
    _$jscoverage_done("lib/varnish-client.js", 21);
    var connected = false;
    _$jscoverage_done("lib/varnish-client.js", 22);
    var connecting = false;
    _$jscoverage_done("lib/varnish-client.js", 25);
    var self = Object.defineProperties(this, {
        options: {
            value: (new settings.mixin(this)).set(this.utility.defaults(options || {}, varnishClient.defaults)),
            enumerable: true,
            configurable: true,
            writable: true
        },
        emitter: {
            value: new emitter.mixin(this),
            enumerable: true,
            configurable: true,
            writable: true
        },
        queue: {
            value: [],
            enumerable: true,
            configurable: true,
            writable: true
        }
    });
    function connect() {
        _$jscoverage_done("lib/varnish-client.js", 66);
        if (_$jscoverage_done("lib/varnish-client.js", 66, connecting) || _$jscoverage_done("lib/varnish-client.js", 66, connected)) {
            _$jscoverage_done("lib/varnish-client.js", 66);
            return;
        }
        _$jscoverage_done("lib/varnish-client.js", 67);
        connecting = true;
        _$jscoverage_done("lib/varnish-client.js", 68);
        varnishClient.debug("connection");
        _$jscoverage_done("lib/varnish-client.js", 69);
        ready = false;
        _$jscoverage_done("lib/varnish-client.js", 70);
        if (_$jscoverage_done("lib/varnish-client.js", 70, !client)) {
            _$jscoverage_done("lib/varnish-client.js", 71);
            client = net.createConnection(self.options.get("port"), self.options.get("host"));
            _$jscoverage_done("lib/varnish-client.js", 72);
            client.on("connect", function() {
                _$jscoverage_done("lib/varnish-client.js", 73);
                varnishClient.debug("connected");
                _$jscoverage_done("lib/varnish-client.js", 74);
                connected = true;
                _$jscoverage_done("lib/varnish-client.js", 75);
                self.emit("connect");
                _$jscoverage_done("lib/varnish-client.js", 76);
                connecting = false;
            });
        } else {
            _$jscoverage_done("lib/varnish-client.js", 79);
            client.connect(self.options.get("port"), self.options.get("host"));
        }
    }
    _$jscoverage_done("lib/varnish-client.js", 83);
    self.connect = connect;
    _$jscoverage_done("lib/varnish-client.js", 85);
    connect();
    _$jscoverage_done("lib/varnish-client.js", 87);
    client.on("data", function(data) {
        _$jscoverage_done("lib/varnish-client.js", 88);
        data = data.toString();
        _$jscoverage_done("lib/varnish-client.js", 89);
        var lines = data.split("\n", 2);
        _$jscoverage_done("lib/varnish-client.js", 90);
        if (_$jscoverage_done("lib/varnish-client.js", 90, lines.length == 2)) {
            _$jscoverage_done("lib/varnish-client.js", 91);
            var tk = lines[0].split(" ");
            _$jscoverage_done("lib/varnish-client.js", 92);
            var code = parseInt(tk[0], 10);
            _$jscoverage_done("lib/varnish-client.js", 93);
            var body_length = parseInt(tk[1], 10);
            _$jscoverage_done("lib/varnish-client.js", 94);
            var body = lines[1];
            _$jscoverage_done("lib/varnish-client.js", 95);
            if (_$jscoverage_done("lib/varnish-client.js", 95, !ready)) {
                _$jscoverage_done("lib/varnish-client.js", 96);
                ready = true;
                _$jscoverage_done("lib/varnish-client.js", 98);
                self.emit("ready", null, self);
            } else {
                _$jscoverage_done("lib/varnish-client.js", 99);
                if (_$jscoverage_done("lib/varnish-client.js", 99, cmd_callback)) {
                    _$jscoverage_done("lib/varnish-client.js", 100);
                    var c = cmd_callback;
                    _$jscoverage_done("lib/varnish-client.js", 101);
                    cmd_callback = null;
                    _$jscoverage_done("lib/varnish-client.js", 102);
                    c(null, code, body);
                    _$jscoverage_done("lib/varnish-client.js", 103);
                    self.emit("response", code, body);
                }
            }
        }
    });
    _$jscoverage_done("lib/varnish-client.js", 109);
    client.on("error", function(err) {
        _$jscoverage_done("lib/varnish-client.js", 110);
        varnishClient.debug("[ERROR] some problem in varnish connection", err);
        _$jscoverage_done("lib/varnish-client.js", 111);
        self.emit("error", err);
    });
    _$jscoverage_done("lib/varnish-client.js", 114);
    client.on("close", function(e) {
        _$jscoverage_done("lib/varnish-client.js", 115);
        varnishClient.debug("[INFO] closed varnish connection");
        _$jscoverage_done("lib/varnish-client.js", 116);
        self.close();
        _$jscoverage_done("lib/varnish-client.js", 117);
        connected = false;
        _$jscoverage_done("lib/varnish-client.js", 118);
        connecting = false;
    });
    function _send(cmd, callback) {
        _$jscoverage_done("lib/varnish-client.js", 123);
        cmd_callback = callback;
        _$jscoverage_done("lib/varnish-client.js", 124);
        if (_$jscoverage_done("lib/varnish-client.js", 124, connected)) {
            _$jscoverage_done("lib/varnish-client.js", 125);
            client.write(cmd + "\n");
        } else {
            _$jscoverage_done("lib/varnish-client.js", 127);
            connect();
        }
    }
    _$jscoverage_done("lib/varnish-client.js", 134);
    this.run_cmd = function(cmd, callback) {
        _$jscoverage_done("lib/varnish-client.js", 135);
        if (_$jscoverage_done("lib/varnish-client.js", 135, !connected)) {
            _$jscoverage_done("lib/varnish-client.js", 136);
            connect();
        }
        _$jscoverage_done("lib/varnish-client.js", 138);
        if (_$jscoverage_done("lib/varnish-client.js", 138, !cmd_callback)) {
            _$jscoverage_done("lib/varnish-client.js", 139);
            _send(cmd, callback);
        } else {
            _$jscoverage_done("lib/varnish-client.js", 141);
            callback("response pending");
            _$jscoverage_done("lib/varnish-client.js", 142);
            self.emit("error", {
                code: "RESPONSE_PENDING",
                message: "there is a response pending"
            });
        }
    };
    _$jscoverage_done("lib/varnish-client.js", 150);
    this.close = function() {
        _$jscoverage_done("lib/varnish-client.js", 151);
        client.end();
        _$jscoverage_done("lib/varnish-client.js", 152);
        ready = false;
        _$jscoverage_done("lib/varnish-client.js", 153);
        self.emit("close");
    };
    _$jscoverage_done("lib/varnish-client.js", 157);
    return this;
}

_$jscoverage_done("lib/varnish-client.js", 165);
Object.defineProperties(varnishClient.prototype, {
    cmd: {
        value: function cmd() {},
        enumerable: true,
        configurable: true,
        writable: true
    },
    connect: {
        value: function connect() {},
        enumerable: true,
        configurable: true,
        writable: true
    },
    close: {
        value: function close() {},
        enumerable: true,
        configurable: true,
        writable: true
    },
    send: {
        value: function send() {},
        enumerable: true,
        configurable: true,
        writable: true
    },
    utility: {
        value: require("./common/utility"),
        enumerable: false,
        writable: false
    }
});

_$jscoverage_done("lib/varnish-client.js", 230);
Object.defineProperties(module.exports = varnishClient, {
    debug: {
        value: require("debug")("varnish:client"),
        enumerable: false,
        writable: false
    },
    version: {
        value: require("../package").version,
        enumerable: true,
        writable: false
    },
    create: {
        value: function create(options) {
            _$jscoverage_done("lib/varnish-client.js", 253);
            return new varnishClient(options);
        },
        enumerable: true,
        configurable: true,
        writable: true
    },
    defaults: {
        value: {
            host: "127.0.0.1",
            port: 3e3
        },
        enumerable: false,
        configurable: true,
        writable: true
    }
});