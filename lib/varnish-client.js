/**
 * Varnish Client.
 *
 * @param host
 * @param port
 * @param ready_callback
 */
function varnishClient( options ) {

  // Force Instantiation.
  if( !( this instanceof varnishClient ) ) {
    return varnishClient.create( options || {});
  }

  var settings = require( 'object-settings' );
  var emitter = require( 'object-emitter' );
  var net = require( 'net' );
  var ready = false;
  var cmd_callback = null;
  var client = null;
  var connected = false;
  var connecting = false;

  // Extend Instance Properties.
  var self = Object.defineProperties( this, {
    options: {
      /**
       * Options Handling.
       *
       * Adds object-settings functionality to this.options and this, for convinience.
       *
       * @property options
       */
      value: new settings.mixin( this ).set( this.utility.defaults( options || {}, varnishClient.defaults ) ),
      enumerable: true,
      configurable: true,
      writable: true
    },
    emitter: {
      /**
       * Event Handling.
       *
       * Adds object-emitter functionality to this.options and this, for convinience.
       *
       * @property emitter
       */
      value: new emitter.mixin( this ),
      enumerable: true,
      configurable: true,
      writable: true
    },
    queue: {
      /**
       * Command Queue
       *
       * @property queue
       */
      value: [],
      enumerable: true,
      configurable: true,
      writable: true
    }
  });

  function connect() {
    if( connecting || connected ) return;
    connecting = true;
    varnishClient.debug( "connection" );
    ready = false;
    if( !client ) {
      client = net.createConnection( self.options.get( 'port' ), self.options.get( 'host' ) );
      client.on( 'connect', function() {
        varnishClient.debug( "connected" );
        connected = true;
        self.emit( 'connect' );
        connecting = false;
      });
    } else {
      client.connect( self.options.get( 'port' ), self.options.get( 'host' ) );
    }
  }

  self.connect = connect;

  connect();

  client.on( 'data', function( data ) {
    data = data.toString();
    var lines = data.split( '\n', 2 );
    if( lines.length == 2 ) {
      var tk = lines[0].split( ' ' )
      var code = parseInt( tk[0], 10 );
      var body_length = parseInt( tk[1], 10 );
      var body = lines[1];
      if( !ready ) {
        ready = true;
        // ready_callback && ready_callback();
        self.emit( 'ready', null, self );
      } else if( cmd_callback ) {
        var c = cmd_callback
        cmd_callback = null;
        c( null, code, body );
        self.emit( 'response', code, body )
      }
    }

  });

  client.on( 'error', function( err ) {
    varnishClient.debug( "[ERROR] some problem in varnish connection", err );
    self.emit( 'error', err );
  });

  client.on( 'close', function( e ) {
    varnishClient.debug( "[INFO] closed varnish connection" );
    self.close();
    connected = false;
    connecting = false;
  });

  // sends the command to the server
  function _send( cmd, callback ) {
    cmd_callback = callback;
    if( connected ) {
      client.write( cmd + '\n' );
    } else {
      connect();
    }
  }

  // run command if there is no peding response
  // fist param of the callback are the error, null
  // if all went ok
  this.run_cmd = function( cmd, callback ) {
    if( !connected ) {
      connect();
    }
    if( !cmd_callback ) {
      _send( cmd, callback );
    } else {
      callback( 'response pending' );
      self.emit( 'error', {
        code: 'RESPONSE_PENDING',
        message: 'there is a response pending'
      });
    }
  }

  // close the connection
  this.close = function() {
    client.end();
    ready = false;
    self.emit( 'close' );
  }

  // @chainable
  return this;

}

/**
 * Instance Properties
 *
 */
Object.defineProperties( varnishClient.prototype, {
  cmd: {
    /**
     * Send Command
     *
     */
    value: function cmd() {

    },
    enumerable: true,
    configurable: true,
    writable: true
  },
  connect: {
    /**
     * Send Command
     *
     */
    value: function connect() {

    },
    enumerable: true,
    configurable: true,
    writable: true
  },
  close: {
    /**
     * Send Command
     *
     */
    value: function close() {

    },
    enumerable: true,
    configurable: true,
    writable: true
  },
  send: {
    /**
     * Send Command
     *
     */
    value: function send() {

    },
    enumerable: true,
    configurable: true,
    writable: true
  },
  utility: {
    /**
     * Middleware Application Instance.
     *
     * @property utility
     */
    value: require( './common/utility' ),
    enumerable: false,
    writable: false
  }
});

/**
 * Constructor Properties
 *
 */
Object.defineProperties( module.exports = varnishClient, {
  debug: {
    /**
     * Debug Method.
     *
     * @method debug
     */
    value: require( 'debug' )( 'varnish:client' ),
    enumerable: false,
    writable: false
  },
  version: {
    /**
     * Module Version.
     *
     * @method version
     */
    value: require( '../package' ).version,
    enumerable: true,
    writable: false
  },
  create: {
    value: function create( options ) {
      return new varnishClient( options );
    },
    enumerable: true,
    configurable: true,
    writable: true
  },
  defaults: {
    /**
     * Default Options.
     *
     * @for varnishClient
     */
    value: {
      host: '127.0.0.1',
      port: 3000
    },
    enumerable: false,
    configurable: true,
    writable: true
  }
});