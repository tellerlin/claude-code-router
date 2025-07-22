#!/usr/bin/env ts-node
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/undici/lib/core/symbols.js
var require_symbols = __commonJS({
  "node_modules/undici/lib/core/symbols.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      kClose: Symbol("close"),
      kDestroy: Symbol("destroy"),
      kDispatch: Symbol("dispatch"),
      kUrl: Symbol("url"),
      kWriting: Symbol("writing"),
      kResuming: Symbol("resuming"),
      kQueue: Symbol("queue"),
      kConnect: Symbol("connect"),
      kConnecting: Symbol("connecting"),
      kKeepAliveDefaultTimeout: Symbol("default keep alive timeout"),
      kKeepAliveMaxTimeout: Symbol("max keep alive timeout"),
      kKeepAliveTimeoutThreshold: Symbol("keep alive timeout threshold"),
      kKeepAliveTimeoutValue: Symbol("keep alive timeout"),
      kKeepAlive: Symbol("keep alive"),
      kHeadersTimeout: Symbol("headers timeout"),
      kBodyTimeout: Symbol("body timeout"),
      kServerName: Symbol("server name"),
      kLocalAddress: Symbol("local address"),
      kHost: Symbol("host"),
      kNoRef: Symbol("no ref"),
      kBodyUsed: Symbol("used"),
      kBody: Symbol("abstracted request body"),
      kRunning: Symbol("running"),
      kBlocking: Symbol("blocking"),
      kPending: Symbol("pending"),
      kSize: Symbol("size"),
      kBusy: Symbol("busy"),
      kQueued: Symbol("queued"),
      kFree: Symbol("free"),
      kConnected: Symbol("connected"),
      kClosed: Symbol("closed"),
      kNeedDrain: Symbol("need drain"),
      kReset: Symbol("reset"),
      kDestroyed: Symbol.for("nodejs.stream.destroyed"),
      kResume: Symbol("resume"),
      kOnError: Symbol("on error"),
      kMaxHeadersSize: Symbol("max headers size"),
      kRunningIdx: Symbol("running index"),
      kPendingIdx: Symbol("pending index"),
      kError: Symbol("error"),
      kClients: Symbol("clients"),
      kClient: Symbol("client"),
      kParser: Symbol("parser"),
      kOnDestroyed: Symbol("destroy callbacks"),
      kPipelining: Symbol("pipelining"),
      kSocket: Symbol("socket"),
      kHostHeader: Symbol("host header"),
      kConnector: Symbol("connector"),
      kStrictContentLength: Symbol("strict content length"),
      kMaxRedirections: Symbol("maxRedirections"),
      kMaxRequests: Symbol("maxRequestsPerClient"),
      kProxy: Symbol("proxy agent options"),
      kCounter: Symbol("socket request counter"),
      kMaxResponseSize: Symbol("max response size"),
      kHTTP2Session: Symbol("http2Session"),
      kHTTP2SessionState: Symbol("http2Session state"),
      kRetryHandlerDefaultRetry: Symbol("retry agent default retry"),
      kConstruct: Symbol("constructable"),
      kListeners: Symbol("listeners"),
      kHTTPContext: Symbol("http context"),
      kMaxConcurrentStreams: Symbol("max concurrent streams"),
      kNoProxyAgent: Symbol("no proxy agent"),
      kHttpProxyAgent: Symbol("http proxy agent"),
      kHttpsProxyAgent: Symbol("https proxy agent")
    };
  }
});

// node_modules/undici/lib/util/timers.js
var require_timers = __commonJS({
  "node_modules/undici/lib/util/timers.js"(exports2, module2) {
    "use strict";
    var fastNow = 0;
    var RESOLUTION_MS = 1e3;
    var TICK_MS = (RESOLUTION_MS >> 1) - 1;
    var fastNowTimeout;
    var kFastTimer = Symbol("kFastTimer");
    var fastTimers = [];
    var NOT_IN_LIST = -2;
    var TO_BE_CLEARED = -1;
    var PENDING = 0;
    var ACTIVE = 1;
    function onTick() {
      fastNow += TICK_MS;
      let idx = 0;
      let len = fastTimers.length;
      while (idx < len) {
        const timer = fastTimers[idx];
        if (timer._state === PENDING) {
          timer._idleStart = fastNow - TICK_MS;
          timer._state = ACTIVE;
        } else if (timer._state === ACTIVE && fastNow >= timer._idleStart + timer._idleTimeout) {
          timer._state = TO_BE_CLEARED;
          timer._idleStart = -1;
          timer._onTimeout(timer._timerArg);
        }
        if (timer._state === TO_BE_CLEARED) {
          timer._state = NOT_IN_LIST;
          if (--len !== 0) {
            fastTimers[idx] = fastTimers[len];
          }
        } else {
          ++idx;
        }
      }
      fastTimers.length = len;
      if (fastTimers.length !== 0) {
        refreshTimeout();
      }
    }
    function refreshTimeout() {
      if (fastNowTimeout?.refresh) {
        fastNowTimeout.refresh();
      } else {
        clearTimeout(fastNowTimeout);
        fastNowTimeout = setTimeout(onTick, TICK_MS);
        fastNowTimeout?.unref();
      }
    }
    var FastTimer = class {
      [kFastTimer] = true;
      /**
       * The state of the timer, which can be one of the following:
       * - NOT_IN_LIST (-2)
       * - TO_BE_CLEARED (-1)
       * - PENDING (0)
       * - ACTIVE (1)
       *
       * @type {-2|-1|0|1}
       * @private
       */
      _state = NOT_IN_LIST;
      /**
       * The number of milliseconds to wait before calling the callback.
       *
       * @type {number}
       * @private
       */
      _idleTimeout = -1;
      /**
       * The time in milliseconds when the timer was started. This value is used to
       * calculate when the timer should expire.
       *
       * @type {number}
       * @default -1
       * @private
       */
      _idleStart = -1;
      /**
       * The function to be executed when the timer expires.
       * @type {Function}
       * @private
       */
      _onTimeout;
      /**
       * The argument to be passed to the callback when the timer expires.
       *
       * @type {*}
       * @private
       */
      _timerArg;
      /**
       * @constructor
       * @param {Function} callback A function to be executed after the timer
       * expires.
       * @param {number} delay The time, in milliseconds that the timer should wait
       * before the specified function or code is executed.
       * @param {*} arg
       */
      constructor(callback, delay, arg) {
        this._onTimeout = callback;
        this._idleTimeout = delay;
        this._timerArg = arg;
        this.refresh();
      }
      /**
       * Sets the timer's start time to the current time, and reschedules the timer
       * to call its callback at the previously specified duration adjusted to the
       * current time.
       * Using this on a timer that has already called its callback will reactivate
       * the timer.
       *
       * @returns {void}
       */
      refresh() {
        if (this._state === NOT_IN_LIST) {
          fastTimers.push(this);
        }
        if (!fastNowTimeout || fastTimers.length === 1) {
          refreshTimeout();
        }
        this._state = PENDING;
      }
      /**
       * The `clear` method cancels the timer, preventing it from executing.
       *
       * @returns {void}
       * @private
       */
      clear() {
        this._state = TO_BE_CLEARED;
        this._idleStart = -1;
      }
    };
    module2.exports = {
      /**
       * The setTimeout() method sets a timer which executes a function once the
       * timer expires.
       * @param {Function} callback A function to be executed after the timer
       * expires.
       * @param {number} delay The time, in milliseconds that the timer should
       * wait before the specified function or code is executed.
       * @param {*} [arg] An optional argument to be passed to the callback function
       * when the timer expires.
       * @returns {NodeJS.Timeout|FastTimer}
       */
      setTimeout(callback, delay, arg) {
        return delay <= RESOLUTION_MS ? setTimeout(callback, delay, arg) : new FastTimer(callback, delay, arg);
      },
      /**
       * The clearTimeout method cancels an instantiated Timer previously created
       * by calling setTimeout.
       *
       * @param {NodeJS.Timeout|FastTimer} timeout
       */
      clearTimeout(timeout) {
        if (timeout[kFastTimer]) {
          timeout.clear();
        } else {
          clearTimeout(timeout);
        }
      },
      /**
       * The setFastTimeout() method sets a fastTimer which executes a function once
       * the timer expires.
       * @param {Function} callback A function to be executed after the timer
       * expires.
       * @param {number} delay The time, in milliseconds that the timer should
       * wait before the specified function or code is executed.
       * @param {*} [arg] An optional argument to be passed to the callback function
       * when the timer expires.
       * @returns {FastTimer}
       */
      setFastTimeout(callback, delay, arg) {
        return new FastTimer(callback, delay, arg);
      },
      /**
       * The clearTimeout method cancels an instantiated FastTimer previously
       * created by calling setFastTimeout.
       *
       * @param {FastTimer} timeout
       */
      clearFastTimeout(timeout) {
        timeout.clear();
      },
      /**
       * The now method returns the value of the internal fast timer clock.
       *
       * @returns {number}
       */
      now() {
        return fastNow;
      },
      /**
       * Trigger the onTick function to process the fastTimers array.
       * Exported for testing purposes only.
       * Marking as deprecated to discourage any use outside of testing.
       * @deprecated
       * @param {number} [delay=0] The delay in milliseconds to add to the now value.
       */
      tick(delay = 0) {
        fastNow += delay - RESOLUTION_MS + 1;
        onTick();
        onTick();
      },
      /**
       * Reset FastTimers.
       * Exported for testing purposes only.
       * Marking as deprecated to discourage any use outside of testing.
       * @deprecated
       */
      reset() {
        fastNow = 0;
        fastTimers.length = 0;
        clearTimeout(fastNowTimeout);
        fastNowTimeout = null;
      },
      /**
       * Exporting for testing purposes only.
       * Marking as deprecated to discourage any use outside of testing.
       * @deprecated
       */
      kFastTimer
    };
  }
});

// node_modules/undici/lib/core/errors.js
var require_errors = __commonJS({
  "node_modules/undici/lib/core/errors.js"(exports2, module2) {
    "use strict";
    var UndiciError = class extends Error {
      constructor(message, options) {
        super(message, options);
        this.name = "UndiciError";
        this.code = "UND_ERR";
      }
    };
    var ConnectTimeoutError = class extends UndiciError {
      constructor(message) {
        super(message);
        this.name = "ConnectTimeoutError";
        this.message = message || "Connect Timeout Error";
        this.code = "UND_ERR_CONNECT_TIMEOUT";
      }
    };
    var HeadersTimeoutError = class extends UndiciError {
      constructor(message) {
        super(message);
        this.name = "HeadersTimeoutError";
        this.message = message || "Headers Timeout Error";
        this.code = "UND_ERR_HEADERS_TIMEOUT";
      }
    };
    var HeadersOverflowError = class extends UndiciError {
      constructor(message) {
        super(message);
        this.name = "HeadersOverflowError";
        this.message = message || "Headers Overflow Error";
        this.code = "UND_ERR_HEADERS_OVERFLOW";
      }
    };
    var BodyTimeoutError = class extends UndiciError {
      constructor(message) {
        super(message);
        this.name = "BodyTimeoutError";
        this.message = message || "Body Timeout Error";
        this.code = "UND_ERR_BODY_TIMEOUT";
      }
    };
    var ResponseStatusCodeError = class extends UndiciError {
      constructor(message, statusCode, headers, body) {
        super(message);
        this.name = "ResponseStatusCodeError";
        this.message = message || "Response Status Code Error";
        this.code = "UND_ERR_RESPONSE_STATUS_CODE";
        this.body = body;
        this.status = statusCode;
        this.statusCode = statusCode;
        this.headers = headers;
      }
    };
    var InvalidArgumentError = class extends UndiciError {
      constructor(message) {
        super(message);
        this.name = "InvalidArgumentError";
        this.message = message || "Invalid Argument Error";
        this.code = "UND_ERR_INVALID_ARG";
      }
    };
    var InvalidReturnValueError = class extends UndiciError {
      constructor(message) {
        super(message);
        this.name = "InvalidReturnValueError";
        this.message = message || "Invalid Return Value Error";
        this.code = "UND_ERR_INVALID_RETURN_VALUE";
      }
    };
    var AbortError = class extends UndiciError {
      constructor(message) {
        super(message);
        this.name = "AbortError";
        this.message = message || "The operation was aborted";
      }
    };
    var RequestAbortedError = class extends AbortError {
      constructor(message) {
        super(message);
        this.name = "AbortError";
        this.message = message || "Request aborted";
        this.code = "UND_ERR_ABORTED";
      }
    };
    var InformationalError = class extends UndiciError {
      constructor(message) {
        super(message);
        this.name = "InformationalError";
        this.message = message || "Request information";
        this.code = "UND_ERR_INFO";
      }
    };
    var RequestContentLengthMismatchError = class extends UndiciError {
      constructor(message) {
        super(message);
        this.name = "RequestContentLengthMismatchError";
        this.message = message || "Request body length does not match content-length header";
        this.code = "UND_ERR_REQ_CONTENT_LENGTH_MISMATCH";
      }
    };
    var ResponseContentLengthMismatchError = class extends UndiciError {
      constructor(message) {
        super(message);
        this.name = "ResponseContentLengthMismatchError";
        this.message = message || "Response body length does not match content-length header";
        this.code = "UND_ERR_RES_CONTENT_LENGTH_MISMATCH";
      }
    };
    var ClientDestroyedError = class extends UndiciError {
      constructor(message) {
        super(message);
        this.name = "ClientDestroyedError";
        this.message = message || "The client is destroyed";
        this.code = "UND_ERR_DESTROYED";
      }
    };
    var ClientClosedError = class extends UndiciError {
      constructor(message) {
        super(message);
        this.name = "ClientClosedError";
        this.message = message || "The client is closed";
        this.code = "UND_ERR_CLOSED";
      }
    };
    var SocketError = class extends UndiciError {
      constructor(message, socket) {
        super(message);
        this.name = "SocketError";
        this.message = message || "Socket error";
        this.code = "UND_ERR_SOCKET";
        this.socket = socket;
      }
    };
    var NotSupportedError = class extends UndiciError {
      constructor(message) {
        super(message);
        this.name = "NotSupportedError";
        this.message = message || "Not supported error";
        this.code = "UND_ERR_NOT_SUPPORTED";
      }
    };
    var BalancedPoolMissingUpstreamError = class extends UndiciError {
      constructor(message) {
        super(message);
        this.name = "MissingUpstreamError";
        this.message = message || "No upstream has been added to the BalancedPool";
        this.code = "UND_ERR_BPL_MISSING_UPSTREAM";
      }
    };
    var HTTPParserError = class extends Error {
      constructor(message, code, data) {
        super(message);
        this.name = "HTTPParserError";
        this.code = code ? `HPE_${code}` : void 0;
        this.data = data ? data.toString() : void 0;
      }
    };
    var ResponseExceededMaxSizeError = class extends UndiciError {
      constructor(message) {
        super(message);
        this.name = "ResponseExceededMaxSizeError";
        this.message = message || "Response content exceeded max size";
        this.code = "UND_ERR_RES_EXCEEDED_MAX_SIZE";
      }
    };
    var RequestRetryError = class extends UndiciError {
      constructor(message, code, { headers, data }) {
        super(message);
        this.name = "RequestRetryError";
        this.message = message || "Request retry error";
        this.code = "UND_ERR_REQ_RETRY";
        this.statusCode = code;
        this.data = data;
        this.headers = headers;
      }
    };
    var ResponseError = class extends UndiciError {
      constructor(message, code, { headers, body }) {
        super(message);
        this.name = "ResponseError";
        this.message = message || "Response error";
        this.code = "UND_ERR_RESPONSE";
        this.statusCode = code;
        this.body = body;
        this.headers = headers;
      }
    };
    var SecureProxyConnectionError = class extends UndiciError {
      constructor(cause, message, options = {}) {
        super(message, { cause, ...options });
        this.name = "SecureProxyConnectionError";
        this.message = message || "Secure Proxy Connection failed";
        this.code = "UND_ERR_PRX_TLS";
        this.cause = cause;
      }
    };
    module2.exports = {
      AbortError,
      HTTPParserError,
      UndiciError,
      HeadersTimeoutError,
      HeadersOverflowError,
      BodyTimeoutError,
      RequestContentLengthMismatchError,
      ConnectTimeoutError,
      ResponseStatusCodeError,
      InvalidArgumentError,
      InvalidReturnValueError,
      RequestAbortedError,
      ClientDestroyedError,
      ClientClosedError,
      InformationalError,
      SocketError,
      NotSupportedError,
      ResponseContentLengthMismatchError,
      BalancedPoolMissingUpstreamError,
      ResponseExceededMaxSizeError,
      RequestRetryError,
      ResponseError,
      SecureProxyConnectionError
    };
  }
});

// node_modules/undici/lib/core/constants.js
var require_constants = __commonJS({
  "node_modules/undici/lib/core/constants.js"(exports2, module2) {
    "use strict";
    var wellknownHeaderNames = (
      /** @type {const} */
      [
        "Accept",
        "Accept-Encoding",
        "Accept-Language",
        "Accept-Ranges",
        "Access-Control-Allow-Credentials",
        "Access-Control-Allow-Headers",
        "Access-Control-Allow-Methods",
        "Access-Control-Allow-Origin",
        "Access-Control-Expose-Headers",
        "Access-Control-Max-Age",
        "Access-Control-Request-Headers",
        "Access-Control-Request-Method",
        "Age",
        "Allow",
        "Alt-Svc",
        "Alt-Used",
        "Authorization",
        "Cache-Control",
        "Clear-Site-Data",
        "Connection",
        "Content-Disposition",
        "Content-Encoding",
        "Content-Language",
        "Content-Length",
        "Content-Location",
        "Content-Range",
        "Content-Security-Policy",
        "Content-Security-Policy-Report-Only",
        "Content-Type",
        "Cookie",
        "Cross-Origin-Embedder-Policy",
        "Cross-Origin-Opener-Policy",
        "Cross-Origin-Resource-Policy",
        "Date",
        "Device-Memory",
        "Downlink",
        "ECT",
        "ETag",
        "Expect",
        "Expect-CT",
        "Expires",
        "Forwarded",
        "From",
        "Host",
        "If-Match",
        "If-Modified-Since",
        "If-None-Match",
        "If-Range",
        "If-Unmodified-Since",
        "Keep-Alive",
        "Last-Modified",
        "Link",
        "Location",
        "Max-Forwards",
        "Origin",
        "Permissions-Policy",
        "Pragma",
        "Proxy-Authenticate",
        "Proxy-Authorization",
        "RTT",
        "Range",
        "Referer",
        "Referrer-Policy",
        "Refresh",
        "Retry-After",
        "Sec-WebSocket-Accept",
        "Sec-WebSocket-Extensions",
        "Sec-WebSocket-Key",
        "Sec-WebSocket-Protocol",
        "Sec-WebSocket-Version",
        "Server",
        "Server-Timing",
        "Service-Worker-Allowed",
        "Service-Worker-Navigation-Preload",
        "Set-Cookie",
        "SourceMap",
        "Strict-Transport-Security",
        "Supports-Loading-Mode",
        "TE",
        "Timing-Allow-Origin",
        "Trailer",
        "Transfer-Encoding",
        "Upgrade",
        "Upgrade-Insecure-Requests",
        "User-Agent",
        "Vary",
        "Via",
        "WWW-Authenticate",
        "X-Content-Type-Options",
        "X-DNS-Prefetch-Control",
        "X-Frame-Options",
        "X-Permitted-Cross-Domain-Policies",
        "X-Powered-By",
        "X-Requested-With",
        "X-XSS-Protection"
      ]
    );
    var headerNameLowerCasedRecord = {};
    Object.setPrototypeOf(headerNameLowerCasedRecord, null);
    var wellknownHeaderNameBuffers = {};
    Object.setPrototypeOf(wellknownHeaderNameBuffers, null);
    function getHeaderNameAsBuffer(header) {
      let buffer = wellknownHeaderNameBuffers[header];
      if (buffer === void 0) {
        buffer = Buffer.from(header);
      }
      return buffer;
    }
    for (let i = 0; i < wellknownHeaderNames.length; ++i) {
      const key = wellknownHeaderNames[i];
      const lowerCasedKey = key.toLowerCase();
      headerNameLowerCasedRecord[key] = headerNameLowerCasedRecord[lowerCasedKey] = lowerCasedKey;
    }
    module2.exports = {
      wellknownHeaderNames,
      headerNameLowerCasedRecord,
      getHeaderNameAsBuffer
    };
  }
});

// node_modules/undici/lib/core/tree.js
var require_tree = __commonJS({
  "node_modules/undici/lib/core/tree.js"(exports2, module2) {
    "use strict";
    var {
      wellknownHeaderNames,
      headerNameLowerCasedRecord
    } = require_constants();
    var TstNode = class _TstNode {
      /** @type {any} */
      value = null;
      /** @type {null | TstNode} */
      left = null;
      /** @type {null | TstNode} */
      middle = null;
      /** @type {null | TstNode} */
      right = null;
      /** @type {number} */
      code;
      /**
       * @param {string} key
       * @param {any} value
       * @param {number} index
       */
      constructor(key, value, index) {
        if (index === void 0 || index >= key.length) {
          throw new TypeError("Unreachable");
        }
        const code = this.code = key.charCodeAt(index);
        if (code > 127) {
          throw new TypeError("key must be ascii string");
        }
        if (key.length !== ++index) {
          this.middle = new _TstNode(key, value, index);
        } else {
          this.value = value;
        }
      }
      /**
       * @param {string} key
       * @param {any} value
       * @returns {void}
       */
      add(key, value) {
        const length = key.length;
        if (length === 0) {
          throw new TypeError("Unreachable");
        }
        let index = 0;
        let node = this;
        while (true) {
          const code = key.charCodeAt(index);
          if (code > 127) {
            throw new TypeError("key must be ascii string");
          }
          if (node.code === code) {
            if (length === ++index) {
              node.value = value;
              break;
            } else if (node.middle !== null) {
              node = node.middle;
            } else {
              node.middle = new _TstNode(key, value, index);
              break;
            }
          } else if (node.code < code) {
            if (node.left !== null) {
              node = node.left;
            } else {
              node.left = new _TstNode(key, value, index);
              break;
            }
          } else if (node.right !== null) {
            node = node.right;
          } else {
            node.right = new _TstNode(key, value, index);
            break;
          }
        }
      }
      /**
       * @param {Uint8Array} key
       * @return {TstNode | null}
       */
      search(key) {
        const keylength = key.length;
        let index = 0;
        let node = this;
        while (node !== null && index < keylength) {
          let code = key[index];
          if (code <= 90 && code >= 65) {
            code |= 32;
          }
          while (node !== null) {
            if (code === node.code) {
              if (keylength === ++index) {
                return node;
              }
              node = node.middle;
              break;
            }
            node = node.code < code ? node.left : node.right;
          }
        }
        return null;
      }
    };
    var TernarySearchTree = class {
      /** @type {TstNode | null} */
      node = null;
      /**
       * @param {string} key
       * @param {any} value
       * @returns {void}
       * */
      insert(key, value) {
        if (this.node === null) {
          this.node = new TstNode(key, value, 0);
        } else {
          this.node.add(key, value);
        }
      }
      /**
       * @param {Uint8Array} key
       * @returns {any}
       */
      lookup(key) {
        return this.node?.search(key)?.value ?? null;
      }
    };
    var tree = new TernarySearchTree();
    for (let i = 0; i < wellknownHeaderNames.length; ++i) {
      const key = headerNameLowerCasedRecord[wellknownHeaderNames[i]];
      tree.insert(key, key);
    }
    module2.exports = {
      TernarySearchTree,
      tree
    };
  }
});

// node_modules/undici/lib/core/util.js
var require_util = __commonJS({
  "node_modules/undici/lib/core/util.js"(exports2, module2) {
    "use strict";
    var assert = require("node:assert");
    var { kDestroyed, kBodyUsed, kListeners, kBody } = require_symbols();
    var { IncomingMessage } = require("node:http");
    var stream = require("node:stream");
    var net = require("node:net");
    var { Blob: Blob2 } = require("node:buffer");
    var { stringify } = require("node:querystring");
    var { EventEmitter: EE } = require("node:events");
    var timers = require_timers();
    var { InvalidArgumentError, ConnectTimeoutError } = require_errors();
    var { headerNameLowerCasedRecord } = require_constants();
    var { tree } = require_tree();
    var [nodeMajor, nodeMinor] = process.versions.node.split(".", 2).map((v) => Number(v));
    var BodyAsyncIterable = class {
      constructor(body) {
        this[kBody] = body;
        this[kBodyUsed] = false;
      }
      async *[Symbol.asyncIterator]() {
        assert(!this[kBodyUsed], "disturbed");
        this[kBodyUsed] = true;
        yield* this[kBody];
      }
    };
    function noop() {
    }
    function wrapRequestBody(body) {
      if (isStream(body)) {
        if (bodyLength(body) === 0) {
          body.on("data", function() {
            assert(false);
          });
        }
        if (typeof body.readableDidRead !== "boolean") {
          body[kBodyUsed] = false;
          EE.prototype.on.call(body, "data", function() {
            this[kBodyUsed] = true;
          });
        }
        return body;
      } else if (body && typeof body.pipeTo === "function") {
        return new BodyAsyncIterable(body);
      } else if (body && typeof body !== "string" && !ArrayBuffer.isView(body) && isIterable(body)) {
        return new BodyAsyncIterable(body);
      } else {
        return body;
      }
    }
    function isStream(obj) {
      return obj && typeof obj === "object" && typeof obj.pipe === "function" && typeof obj.on === "function";
    }
    function isBlobLike(object) {
      if (object === null) {
        return false;
      } else if (object instanceof Blob2) {
        return true;
      } else if (typeof object !== "object") {
        return false;
      } else {
        const sTag = object[Symbol.toStringTag];
        return (sTag === "Blob" || sTag === "File") && ("stream" in object && typeof object.stream === "function" || "arrayBuffer" in object && typeof object.arrayBuffer === "function");
      }
    }
    function serializePathWithQuery(url, queryParams) {
      if (url.includes("?") || url.includes("#")) {
        throw new Error('Query params cannot be passed when url already contains "?" or "#".');
      }
      const stringified = stringify(queryParams);
      if (stringified) {
        url += "?" + stringified;
      }
      return url;
    }
    function isValidPort(port) {
      const value = parseInt(port, 10);
      return value === Number(port) && value >= 0 && value <= 65535;
    }
    function isHttpOrHttpsPrefixed(value) {
      return value != null && value[0] === "h" && value[1] === "t" && value[2] === "t" && value[3] === "p" && (value[4] === ":" || value[4] === "s" && value[5] === ":");
    }
    function parseURL(url) {
      if (typeof url === "string") {
        url = new URL(url);
        if (!isHttpOrHttpsPrefixed(url.origin || url.protocol)) {
          throw new InvalidArgumentError("Invalid URL protocol: the URL must start with `http:` or `https:`.");
        }
        return url;
      }
      if (!url || typeof url !== "object") {
        throw new InvalidArgumentError("Invalid URL: The URL argument must be a non-null object.");
      }
      if (!(url instanceof URL)) {
        if (url.port != null && url.port !== "" && isValidPort(url.port) === false) {
          throw new InvalidArgumentError("Invalid URL: port must be a valid integer or a string representation of an integer.");
        }
        if (url.path != null && typeof url.path !== "string") {
          throw new InvalidArgumentError("Invalid URL path: the path must be a string or null/undefined.");
        }
        if (url.pathname != null && typeof url.pathname !== "string") {
          throw new InvalidArgumentError("Invalid URL pathname: the pathname must be a string or null/undefined.");
        }
        if (url.hostname != null && typeof url.hostname !== "string") {
          throw new InvalidArgumentError("Invalid URL hostname: the hostname must be a string or null/undefined.");
        }
        if (url.origin != null && typeof url.origin !== "string") {
          throw new InvalidArgumentError("Invalid URL origin: the origin must be a string or null/undefined.");
        }
        if (!isHttpOrHttpsPrefixed(url.origin || url.protocol)) {
          throw new InvalidArgumentError("Invalid URL protocol: the URL must start with `http:` or `https:`.");
        }
        const port = url.port != null ? url.port : url.protocol === "https:" ? 443 : 80;
        let origin = url.origin != null ? url.origin : `${url.protocol || ""}//${url.hostname || ""}:${port}`;
        let path = url.path != null ? url.path : `${url.pathname || ""}${url.search || ""}`;
        if (origin[origin.length - 1] === "/") {
          origin = origin.slice(0, origin.length - 1);
        }
        if (path && path[0] !== "/") {
          path = `/${path}`;
        }
        return new URL(`${origin}${path}`);
      }
      if (!isHttpOrHttpsPrefixed(url.origin || url.protocol)) {
        throw new InvalidArgumentError("Invalid URL protocol: the URL must start with `http:` or `https:`.");
      }
      return url;
    }
    function parseOrigin(url) {
      url = parseURL(url);
      if (url.pathname !== "/" || url.search || url.hash) {
        throw new InvalidArgumentError("invalid url");
      }
      return url;
    }
    function getHostname(host) {
      if (host[0] === "[") {
        const idx2 = host.indexOf("]");
        assert(idx2 !== -1);
        return host.substring(1, idx2);
      }
      const idx = host.indexOf(":");
      if (idx === -1) return host;
      return host.substring(0, idx);
    }
    function getServerName(host) {
      if (!host) {
        return null;
      }
      assert(typeof host === "string");
      const servername = getHostname(host);
      if (net.isIP(servername)) {
        return "";
      }
      return servername;
    }
    function deepClone(obj) {
      return JSON.parse(JSON.stringify(obj));
    }
    function isAsyncIterable(obj) {
      return !!(obj != null && typeof obj[Symbol.asyncIterator] === "function");
    }
    function isIterable(obj) {
      return !!(obj != null && (typeof obj[Symbol.iterator] === "function" || typeof obj[Symbol.asyncIterator] === "function"));
    }
    function bodyLength(body) {
      if (body == null) {
        return 0;
      } else if (isStream(body)) {
        const state = body._readableState;
        return state && state.objectMode === false && state.ended === true && Number.isFinite(state.length) ? state.length : null;
      } else if (isBlobLike(body)) {
        return body.size != null ? body.size : null;
      } else if (isBuffer(body)) {
        return body.byteLength;
      }
      return null;
    }
    function isDestroyed(body) {
      return body && !!(body.destroyed || body[kDestroyed] || stream.isDestroyed?.(body));
    }
    function destroy(stream2, err) {
      if (stream2 == null || !isStream(stream2) || isDestroyed(stream2)) {
        return;
      }
      if (typeof stream2.destroy === "function") {
        if (Object.getPrototypeOf(stream2).constructor === IncomingMessage) {
          stream2.socket = null;
        }
        stream2.destroy(err);
      } else if (err) {
        queueMicrotask(() => {
          stream2.emit("error", err);
        });
      }
      if (stream2.destroyed !== true) {
        stream2[kDestroyed] = true;
      }
    }
    var KEEPALIVE_TIMEOUT_EXPR = /timeout=(\d+)/;
    function parseKeepAliveTimeout(val) {
      const m = val.match(KEEPALIVE_TIMEOUT_EXPR);
      return m ? parseInt(m[1], 10) * 1e3 : null;
    }
    function headerNameToString(value) {
      return typeof value === "string" ? headerNameLowerCasedRecord[value] ?? value.toLowerCase() : tree.lookup(value) ?? value.toString("latin1").toLowerCase();
    }
    function bufferToLowerCasedHeaderName(value) {
      return tree.lookup(value) ?? value.toString("latin1").toLowerCase();
    }
    function parseHeaders(headers, obj) {
      if (obj === void 0) obj = {};
      for (let i = 0; i < headers.length; i += 2) {
        const key = headerNameToString(headers[i]);
        let val = obj[key];
        if (val) {
          if (typeof val === "string") {
            val = [val];
            obj[key] = val;
          }
          val.push(headers[i + 1].toString("utf8"));
        } else {
          const headersValue = headers[i + 1];
          if (typeof headersValue === "string") {
            obj[key] = headersValue;
          } else {
            obj[key] = Array.isArray(headersValue) ? headersValue.map((x) => x.toString("utf8")) : headersValue.toString("utf8");
          }
        }
      }
      if ("content-length" in obj && "content-disposition" in obj) {
        obj["content-disposition"] = Buffer.from(obj["content-disposition"]).toString("latin1");
      }
      return obj;
    }
    function parseRawHeaders(headers) {
      const headersLength = headers.length;
      const ret = new Array(headersLength);
      let hasContentLength = false;
      let contentDispositionIdx = -1;
      let key;
      let val;
      let kLen = 0;
      for (let n = 0; n < headersLength; n += 2) {
        key = headers[n];
        val = headers[n + 1];
        typeof key !== "string" && (key = key.toString());
        typeof val !== "string" && (val = val.toString("utf8"));
        kLen = key.length;
        if (kLen === 14 && key[7] === "-" && (key === "content-length" || key.toLowerCase() === "content-length")) {
          hasContentLength = true;
        } else if (kLen === 19 && key[7] === "-" && (key === "content-disposition" || key.toLowerCase() === "content-disposition")) {
          contentDispositionIdx = n + 1;
        }
        ret[n] = key;
        ret[n + 1] = val;
      }
      if (hasContentLength && contentDispositionIdx !== -1) {
        ret[contentDispositionIdx] = Buffer.from(ret[contentDispositionIdx]).toString("latin1");
      }
      return ret;
    }
    function encodeRawHeaders(headers) {
      if (!Array.isArray(headers)) {
        throw new TypeError("expected headers to be an array");
      }
      return headers.map((x) => Buffer.from(x));
    }
    function isBuffer(buffer) {
      return buffer instanceof Uint8Array || Buffer.isBuffer(buffer);
    }
    function assertRequestHandler(handler, method, upgrade) {
      if (!handler || typeof handler !== "object") {
        throw new InvalidArgumentError("handler must be an object");
      }
      if (typeof handler.onRequestStart === "function") {
        return;
      }
      if (typeof handler.onConnect !== "function") {
        throw new InvalidArgumentError("invalid onConnect method");
      }
      if (typeof handler.onError !== "function") {
        throw new InvalidArgumentError("invalid onError method");
      }
      if (typeof handler.onBodySent !== "function" && handler.onBodySent !== void 0) {
        throw new InvalidArgumentError("invalid onBodySent method");
      }
      if (upgrade || method === "CONNECT") {
        if (typeof handler.onUpgrade !== "function") {
          throw new InvalidArgumentError("invalid onUpgrade method");
        }
      } else {
        if (typeof handler.onHeaders !== "function") {
          throw new InvalidArgumentError("invalid onHeaders method");
        }
        if (typeof handler.onData !== "function") {
          throw new InvalidArgumentError("invalid onData method");
        }
        if (typeof handler.onComplete !== "function") {
          throw new InvalidArgumentError("invalid onComplete method");
        }
      }
    }
    function isDisturbed(body) {
      return !!(body && (stream.isDisturbed(body) || body[kBodyUsed]));
    }
    function getSocketInfo(socket) {
      return {
        localAddress: socket.localAddress,
        localPort: socket.localPort,
        remoteAddress: socket.remoteAddress,
        remotePort: socket.remotePort,
        remoteFamily: socket.remoteFamily,
        timeout: socket.timeout,
        bytesWritten: socket.bytesWritten,
        bytesRead: socket.bytesRead
      };
    }
    function ReadableStreamFrom(iterable) {
      let iterator;
      return new ReadableStream(
        {
          async start() {
            iterator = iterable[Symbol.asyncIterator]();
          },
          pull(controller) {
            async function pull() {
              const { done, value } = await iterator.next();
              if (done) {
                queueMicrotask(() => {
                  controller.close();
                  controller.byobRequest?.respond(0);
                });
              } else {
                const buf = Buffer.isBuffer(value) ? value : Buffer.from(value);
                if (buf.byteLength) {
                  controller.enqueue(new Uint8Array(buf));
                } else {
                  return await pull();
                }
              }
            }
            return pull();
          },
          async cancel() {
            await iterator.return();
          },
          type: "bytes"
        }
      );
    }
    function isFormDataLike(object) {
      return object && typeof object === "object" && typeof object.append === "function" && typeof object.delete === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.has === "function" && typeof object.set === "function" && object[Symbol.toStringTag] === "FormData";
    }
    function addAbortListener(signal, listener) {
      if ("addEventListener" in signal) {
        signal.addEventListener("abort", listener, { once: true });
        return () => signal.removeEventListener("abort", listener);
      }
      signal.once("abort", listener);
      return () => signal.removeListener("abort", listener);
    }
    function isTokenCharCode(c) {
      switch (c) {
        case 34:
        case 40:
        case 41:
        case 44:
        case 47:
        case 58:
        case 59:
        case 60:
        case 61:
        case 62:
        case 63:
        case 64:
        case 91:
        case 92:
        case 93:
        case 123:
        case 125:
          return false;
        default:
          return c >= 33 && c <= 126;
      }
    }
    function isValidHTTPToken(characters) {
      if (characters.length === 0) {
        return false;
      }
      for (let i = 0; i < characters.length; ++i) {
        if (!isTokenCharCode(characters.charCodeAt(i))) {
          return false;
        }
      }
      return true;
    }
    var headerCharRegex = /[^\t\x20-\x7e\x80-\xff]/;
    function isValidHeaderValue(characters) {
      return !headerCharRegex.test(characters);
    }
    var rangeHeaderRegex = /^bytes (\d+)-(\d+)\/(\d+)?$/;
    function parseRangeHeader(range) {
      if (range == null || range === "") return { start: 0, end: null, size: null };
      const m = range ? range.match(rangeHeaderRegex) : null;
      return m ? {
        start: parseInt(m[1]),
        end: m[2] ? parseInt(m[2]) : null,
        size: m[3] ? parseInt(m[3]) : null
      } : null;
    }
    function addListener(obj, name, listener) {
      const listeners = obj[kListeners] ??= [];
      listeners.push([name, listener]);
      obj.on(name, listener);
      return obj;
    }
    function removeAllListeners(obj) {
      if (obj[kListeners] != null) {
        for (const [name, listener] of obj[kListeners]) {
          obj.removeListener(name, listener);
        }
        obj[kListeners] = null;
      }
      return obj;
    }
    function errorRequest(client, request, err) {
      try {
        request.onError(err);
        assert(request.aborted);
      } catch (err2) {
        client.emit("error", err2);
      }
    }
    var setupConnectTimeout = process.platform === "win32" ? (socketWeakRef, opts) => {
      if (!opts.timeout) {
        return noop;
      }
      let s1 = null;
      let s2 = null;
      const fastTimer = timers.setFastTimeout(() => {
        s1 = setImmediate(() => {
          s2 = setImmediate(() => onConnectTimeout(socketWeakRef.deref(), opts));
        });
      }, opts.timeout);
      return () => {
        timers.clearFastTimeout(fastTimer);
        clearImmediate(s1);
        clearImmediate(s2);
      };
    } : (socketWeakRef, opts) => {
      if (!opts.timeout) {
        return noop;
      }
      let s1 = null;
      const fastTimer = timers.setFastTimeout(() => {
        s1 = setImmediate(() => {
          onConnectTimeout(socketWeakRef.deref(), opts);
        });
      }, opts.timeout);
      return () => {
        timers.clearFastTimeout(fastTimer);
        clearImmediate(s1);
      };
    };
    function onConnectTimeout(socket, opts) {
      if (socket == null) {
        return;
      }
      let message = "Connect Timeout Error";
      if (Array.isArray(socket.autoSelectFamilyAttemptedAddresses)) {
        message += ` (attempted addresses: ${socket.autoSelectFamilyAttemptedAddresses.join(", ")},`;
      } else {
        message += ` (attempted address: ${opts.hostname}:${opts.port},`;
      }
      message += ` timeout: ${opts.timeout}ms)`;
      destroy(socket, new ConnectTimeoutError(message));
    }
    var kEnumerableProperty = /* @__PURE__ */ Object.create(null);
    kEnumerableProperty.enumerable = true;
    var normalizedMethodRecordsBase = {
      delete: "DELETE",
      DELETE: "DELETE",
      get: "GET",
      GET: "GET",
      head: "HEAD",
      HEAD: "HEAD",
      options: "OPTIONS",
      OPTIONS: "OPTIONS",
      post: "POST",
      POST: "POST",
      put: "PUT",
      PUT: "PUT"
    };
    var normalizedMethodRecords = {
      ...normalizedMethodRecordsBase,
      patch: "patch",
      PATCH: "PATCH"
    };
    Object.setPrototypeOf(normalizedMethodRecordsBase, null);
    Object.setPrototypeOf(normalizedMethodRecords, null);
    module2.exports = {
      kEnumerableProperty,
      isDisturbed,
      isBlobLike,
      parseOrigin,
      parseURL,
      getServerName,
      isStream,
      isIterable,
      isAsyncIterable,
      isDestroyed,
      headerNameToString,
      bufferToLowerCasedHeaderName,
      addListener,
      removeAllListeners,
      errorRequest,
      parseRawHeaders,
      encodeRawHeaders,
      parseHeaders,
      parseKeepAliveTimeout,
      destroy,
      bodyLength,
      deepClone,
      ReadableStreamFrom,
      isBuffer,
      assertRequestHandler,
      getSocketInfo,
      isFormDataLike,
      serializePathWithQuery,
      addAbortListener,
      isValidHTTPToken,
      isValidHeaderValue,
      isTokenCharCode,
      parseRangeHeader,
      normalizedMethodRecordsBase,
      normalizedMethodRecords,
      isValidPort,
      isHttpOrHttpsPrefixed,
      nodeMajor,
      nodeMinor,
      safeHTTPMethods: Object.freeze(["GET", "HEAD", "OPTIONS", "TRACE"]),
      wrapRequestBody,
      setupConnectTimeout
    };
  }
});

// node_modules/undici/lib/util/stats.js
var require_stats = __commonJS({
  "node_modules/undici/lib/util/stats.js"(exports2, module2) {
    "use strict";
    var {
      kConnected,
      kPending,
      kRunning,
      kSize,
      kFree,
      kQueued
    } = require_symbols();
    var ClientStats = class {
      constructor(client) {
        this.connected = client[kConnected];
        this.pending = client[kPending];
        this.running = client[kRunning];
        this.size = client[kSize];
      }
    };
    var PoolStats = class {
      constructor(pool) {
        this.connected = pool[kConnected];
        this.free = pool[kFree];
        this.pending = pool[kPending];
        this.queued = pool[kQueued];
        this.running = pool[kRunning];
        this.size = pool[kSize];
      }
    };
    module2.exports = { ClientStats, PoolStats };
  }
});

// node_modules/undici/lib/core/diagnostics.js
var require_diagnostics = __commonJS({
  "node_modules/undici/lib/core/diagnostics.js"(exports2, module2) {
    "use strict";
    var diagnosticsChannel = require("node:diagnostics_channel");
    var util = require("node:util");
    var undiciDebugLog = util.debuglog("undici");
    var fetchDebuglog = util.debuglog("fetch");
    var websocketDebuglog = util.debuglog("websocket");
    var channels = {
      // Client
      beforeConnect: diagnosticsChannel.channel("undici:client:beforeConnect"),
      connected: diagnosticsChannel.channel("undici:client:connected"),
      connectError: diagnosticsChannel.channel("undici:client:connectError"),
      sendHeaders: diagnosticsChannel.channel("undici:client:sendHeaders"),
      // Request
      create: diagnosticsChannel.channel("undici:request:create"),
      bodySent: diagnosticsChannel.channel("undici:request:bodySent"),
      bodyChunkSent: diagnosticsChannel.channel("undici:request:bodyChunkSent"),
      bodyChunkReceived: diagnosticsChannel.channel("undici:request:bodyChunkReceived"),
      headers: diagnosticsChannel.channel("undici:request:headers"),
      trailers: diagnosticsChannel.channel("undici:request:trailers"),
      error: diagnosticsChannel.channel("undici:request:error"),
      // WebSocket
      open: diagnosticsChannel.channel("undici:websocket:open"),
      close: diagnosticsChannel.channel("undici:websocket:close"),
      socketError: diagnosticsChannel.channel("undici:websocket:socket_error"),
      ping: diagnosticsChannel.channel("undici:websocket:ping"),
      pong: diagnosticsChannel.channel("undici:websocket:pong")
    };
    var isTrackingClientEvents = false;
    function trackClientEvents(debugLog = undiciDebugLog) {
      if (isTrackingClientEvents) {
        return;
      }
      isTrackingClientEvents = true;
      diagnosticsChannel.subscribe(
        "undici:client:beforeConnect",
        (evt) => {
          const {
            connectParams: { version, protocol, port, host }
          } = evt;
          debugLog(
            "connecting to %s%s using %s%s",
            host,
            port ? `:${port}` : "",
            protocol,
            version
          );
        }
      );
      diagnosticsChannel.subscribe(
        "undici:client:connected",
        (evt) => {
          const {
            connectParams: { version, protocol, port, host }
          } = evt;
          debugLog(
            "connected to %s%s using %s%s",
            host,
            port ? `:${port}` : "",
            protocol,
            version
          );
        }
      );
      diagnosticsChannel.subscribe(
        "undici:client:connectError",
        (evt) => {
          const {
            connectParams: { version, protocol, port, host },
            error
          } = evt;
          debugLog(
            "connection to %s%s using %s%s errored - %s",
            host,
            port ? `:${port}` : "",
            protocol,
            version,
            error.message
          );
        }
      );
      diagnosticsChannel.subscribe(
        "undici:client:sendHeaders",
        (evt) => {
          const {
            request: { method, path, origin }
          } = evt;
          debugLog("sending request to %s %s%s", method, origin, path);
        }
      );
    }
    var isTrackingRequestEvents = false;
    function trackRequestEvents(debugLog = undiciDebugLog) {
      if (isTrackingRequestEvents) {
        return;
      }
      isTrackingRequestEvents = true;
      diagnosticsChannel.subscribe(
        "undici:request:headers",
        (evt) => {
          const {
            request: { method, path, origin },
            response: { statusCode }
          } = evt;
          debugLog(
            "received response to %s %s%s - HTTP %d",
            method,
            origin,
            path,
            statusCode
          );
        }
      );
      diagnosticsChannel.subscribe(
        "undici:request:trailers",
        (evt) => {
          const {
            request: { method, path, origin }
          } = evt;
          debugLog("trailers received from %s %s%s", method, origin, path);
        }
      );
      diagnosticsChannel.subscribe(
        "undici:request:error",
        (evt) => {
          const {
            request: { method, path, origin },
            error
          } = evt;
          debugLog(
            "request to %s %s%s errored - %s",
            method,
            origin,
            path,
            error.message
          );
        }
      );
    }
    var isTrackingWebSocketEvents = false;
    function trackWebSocketEvents(debugLog = websocketDebuglog) {
      if (isTrackingWebSocketEvents) {
        return;
      }
      isTrackingWebSocketEvents = true;
      diagnosticsChannel.subscribe(
        "undici:websocket:open",
        (evt) => {
          const {
            address: { address, port }
          } = evt;
          debugLog("connection opened %s%s", address, port ? `:${port}` : "");
        }
      );
      diagnosticsChannel.subscribe(
        "undici:websocket:close",
        (evt) => {
          const { websocket, code, reason } = evt;
          debugLog(
            "closed connection to %s - %s %s",
            websocket.url,
            code,
            reason
          );
        }
      );
      diagnosticsChannel.subscribe(
        "undici:websocket:socket_error",
        (err) => {
          debugLog("connection errored - %s", err.message);
        }
      );
      diagnosticsChannel.subscribe(
        "undici:websocket:ping",
        (evt) => {
          debugLog("ping received");
        }
      );
      diagnosticsChannel.subscribe(
        "undici:websocket:pong",
        (evt) => {
          debugLog("pong received");
        }
      );
    }
    if (undiciDebugLog.enabled || fetchDebuglog.enabled) {
      trackClientEvents(fetchDebuglog.enabled ? fetchDebuglog : undiciDebugLog);
      trackRequestEvents(fetchDebuglog.enabled ? fetchDebuglog : undiciDebugLog);
    }
    if (websocketDebuglog.enabled) {
      trackClientEvents(undiciDebugLog.enabled ? undiciDebugLog : websocketDebuglog);
      trackWebSocketEvents(websocketDebuglog);
    }
    module2.exports = {
      channels
    };
  }
});

// node_modules/undici/lib/core/request.js
var require_request = __commonJS({
  "node_modules/undici/lib/core/request.js"(exports2, module2) {
    "use strict";
    var {
      InvalidArgumentError,
      NotSupportedError
    } = require_errors();
    var assert = require("node:assert");
    var {
      isValidHTTPToken,
      isValidHeaderValue,
      isStream,
      destroy,
      isBuffer,
      isFormDataLike,
      isIterable,
      isBlobLike,
      serializePathWithQuery,
      assertRequestHandler,
      getServerName,
      normalizedMethodRecords
    } = require_util();
    var { channels } = require_diagnostics();
    var { headerNameLowerCasedRecord } = require_constants();
    var invalidPathRegex = /[^\u0021-\u00ff]/;
    var kHandler = Symbol("handler");
    var Request = class {
      constructor(origin, {
        path,
        method,
        body,
        headers,
        query,
        idempotent,
        blocking,
        upgrade,
        headersTimeout,
        bodyTimeout,
        reset,
        expectContinue,
        servername,
        throwOnError
      }, handler) {
        if (typeof path !== "string") {
          throw new InvalidArgumentError("path must be a string");
        } else if (path[0] !== "/" && !(path.startsWith("http://") || path.startsWith("https://")) && method !== "CONNECT") {
          throw new InvalidArgumentError("path must be an absolute URL or start with a slash");
        } else if (invalidPathRegex.test(path)) {
          throw new InvalidArgumentError("invalid request path");
        }
        if (typeof method !== "string") {
          throw new InvalidArgumentError("method must be a string");
        } else if (normalizedMethodRecords[method] === void 0 && !isValidHTTPToken(method)) {
          throw new InvalidArgumentError("invalid request method");
        }
        if (upgrade && typeof upgrade !== "string") {
          throw new InvalidArgumentError("upgrade must be a string");
        }
        if (headersTimeout != null && (!Number.isFinite(headersTimeout) || headersTimeout < 0)) {
          throw new InvalidArgumentError("invalid headersTimeout");
        }
        if (bodyTimeout != null && (!Number.isFinite(bodyTimeout) || bodyTimeout < 0)) {
          throw new InvalidArgumentError("invalid bodyTimeout");
        }
        if (reset != null && typeof reset !== "boolean") {
          throw new InvalidArgumentError("invalid reset");
        }
        if (expectContinue != null && typeof expectContinue !== "boolean") {
          throw new InvalidArgumentError("invalid expectContinue");
        }
        if (throwOnError != null) {
          throw new InvalidArgumentError("invalid throwOnError");
        }
        this.headersTimeout = headersTimeout;
        this.bodyTimeout = bodyTimeout;
        this.method = method;
        this.abort = null;
        if (body == null) {
          this.body = null;
        } else if (isStream(body)) {
          this.body = body;
          const rState = this.body._readableState;
          if (!rState || !rState.autoDestroy) {
            this.endHandler = function autoDestroy() {
              destroy(this);
            };
            this.body.on("end", this.endHandler);
          }
          this.errorHandler = (err) => {
            if (this.abort) {
              this.abort(err);
            } else {
              this.error = err;
            }
          };
          this.body.on("error", this.errorHandler);
        } else if (isBuffer(body)) {
          this.body = body.byteLength ? body : null;
        } else if (ArrayBuffer.isView(body)) {
          this.body = body.buffer.byteLength ? Buffer.from(body.buffer, body.byteOffset, body.byteLength) : null;
        } else if (body instanceof ArrayBuffer) {
          this.body = body.byteLength ? Buffer.from(body) : null;
        } else if (typeof body === "string") {
          this.body = body.length ? Buffer.from(body) : null;
        } else if (isFormDataLike(body) || isIterable(body) || isBlobLike(body)) {
          this.body = body;
        } else {
          throw new InvalidArgumentError("body must be a string, a Buffer, a Readable stream, an iterable, or an async iterable");
        }
        this.completed = false;
        this.aborted = false;
        this.upgrade = upgrade || null;
        this.path = query ? serializePathWithQuery(path, query) : path;
        this.origin = origin;
        this.idempotent = idempotent == null ? method === "HEAD" || method === "GET" : idempotent;
        this.blocking = blocking ?? this.method !== "HEAD";
        this.reset = reset == null ? null : reset;
        this.host = null;
        this.contentLength = null;
        this.contentType = null;
        this.headers = [];
        this.expectContinue = expectContinue != null ? expectContinue : false;
        if (Array.isArray(headers)) {
          if (headers.length % 2 !== 0) {
            throw new InvalidArgumentError("headers array must be even");
          }
          for (let i = 0; i < headers.length; i += 2) {
            processHeader(this, headers[i], headers[i + 1]);
          }
        } else if (headers && typeof headers === "object") {
          if (headers[Symbol.iterator]) {
            for (const header of headers) {
              if (!Array.isArray(header) || header.length !== 2) {
                throw new InvalidArgumentError("headers must be in key-value pair format");
              }
              processHeader(this, header[0], header[1]);
            }
          } else {
            const keys = Object.keys(headers);
            for (let i = 0; i < keys.length; ++i) {
              processHeader(this, keys[i], headers[keys[i]]);
            }
          }
        } else if (headers != null) {
          throw new InvalidArgumentError("headers must be an object or an array");
        }
        assertRequestHandler(handler, method, upgrade);
        this.servername = servername || getServerName(this.host) || null;
        this[kHandler] = handler;
        if (channels.create.hasSubscribers) {
          channels.create.publish({ request: this });
        }
      }
      onBodySent(chunk) {
        if (channels.bodyChunkSent.hasSubscribers) {
          channels.bodyChunkSent.publish({ request: this, chunk });
        }
        if (this[kHandler].onBodySent) {
          try {
            return this[kHandler].onBodySent(chunk);
          } catch (err) {
            this.abort(err);
          }
        }
      }
      onRequestSent() {
        if (channels.bodySent.hasSubscribers) {
          channels.bodySent.publish({ request: this });
        }
        if (this[kHandler].onRequestSent) {
          try {
            return this[kHandler].onRequestSent();
          } catch (err) {
            this.abort(err);
          }
        }
      }
      onConnect(abort) {
        assert(!this.aborted);
        assert(!this.completed);
        if (this.error) {
          abort(this.error);
        } else {
          this.abort = abort;
          return this[kHandler].onConnect(abort);
        }
      }
      onResponseStarted() {
        return this[kHandler].onResponseStarted?.();
      }
      onHeaders(statusCode, headers, resume, statusText) {
        assert(!this.aborted);
        assert(!this.completed);
        if (channels.headers.hasSubscribers) {
          channels.headers.publish({ request: this, response: { statusCode, headers, statusText } });
        }
        try {
          return this[kHandler].onHeaders(statusCode, headers, resume, statusText);
        } catch (err) {
          this.abort(err);
        }
      }
      onData(chunk) {
        assert(!this.aborted);
        assert(!this.completed);
        if (channels.bodyChunkReceived.hasSubscribers) {
          channels.bodyChunkReceived.publish({ request: this, chunk });
        }
        try {
          return this[kHandler].onData(chunk);
        } catch (err) {
          this.abort(err);
          return false;
        }
      }
      onUpgrade(statusCode, headers, socket) {
        assert(!this.aborted);
        assert(!this.completed);
        return this[kHandler].onUpgrade(statusCode, headers, socket);
      }
      onComplete(trailers) {
        this.onFinally();
        assert(!this.aborted);
        assert(!this.completed);
        this.completed = true;
        if (channels.trailers.hasSubscribers) {
          channels.trailers.publish({ request: this, trailers });
        }
        try {
          return this[kHandler].onComplete(trailers);
        } catch (err) {
          this.onError(err);
        }
      }
      onError(error) {
        this.onFinally();
        if (channels.error.hasSubscribers) {
          channels.error.publish({ request: this, error });
        }
        if (this.aborted) {
          return;
        }
        this.aborted = true;
        return this[kHandler].onError(error);
      }
      onFinally() {
        if (this.errorHandler) {
          this.body.off("error", this.errorHandler);
          this.errorHandler = null;
        }
        if (this.endHandler) {
          this.body.off("end", this.endHandler);
          this.endHandler = null;
        }
      }
      addHeader(key, value) {
        processHeader(this, key, value);
        return this;
      }
    };
    function processHeader(request, key, val) {
      if (val && (typeof val === "object" && !Array.isArray(val))) {
        throw new InvalidArgumentError(`invalid ${key} header`);
      } else if (val === void 0) {
        return;
      }
      let headerName = headerNameLowerCasedRecord[key];
      if (headerName === void 0) {
        headerName = key.toLowerCase();
        if (headerNameLowerCasedRecord[headerName] === void 0 && !isValidHTTPToken(headerName)) {
          throw new InvalidArgumentError("invalid header key");
        }
      }
      if (Array.isArray(val)) {
        const arr = [];
        for (let i = 0; i < val.length; i++) {
          if (typeof val[i] === "string") {
            if (!isValidHeaderValue(val[i])) {
              throw new InvalidArgumentError(`invalid ${key} header`);
            }
            arr.push(val[i]);
          } else if (val[i] === null) {
            arr.push("");
          } else if (typeof val[i] === "object") {
            throw new InvalidArgumentError(`invalid ${key} header`);
          } else {
            arr.push(`${val[i]}`);
          }
        }
        val = arr;
      } else if (typeof val === "string") {
        if (!isValidHeaderValue(val)) {
          throw new InvalidArgumentError(`invalid ${key} header`);
        }
      } else if (val === null) {
        val = "";
      } else {
        val = `${val}`;
      }
      if (request.host === null && headerName === "host") {
        if (typeof val !== "string") {
          throw new InvalidArgumentError("invalid host header");
        }
        request.host = val;
      } else if (request.contentLength === null && headerName === "content-length") {
        request.contentLength = parseInt(val, 10);
        if (!Number.isFinite(request.contentLength)) {
          throw new InvalidArgumentError("invalid content-length header");
        }
      } else if (request.contentType === null && headerName === "content-type") {
        request.contentType = val;
        request.headers.push(key, val);
      } else if (headerName === "transfer-encoding" || headerName === "keep-alive" || headerName === "upgrade") {
        throw new InvalidArgumentError(`invalid ${headerName} header`);
      } else if (headerName === "connection") {
        const value = typeof val === "string" ? val.toLowerCase() : null;
        if (value !== "close" && value !== "keep-alive") {
          throw new InvalidArgumentError("invalid connection header");
        }
        if (value === "close") {
          request.reset = true;
        }
      } else if (headerName === "expect") {
        throw new NotSupportedError("expect header not supported");
      } else {
        request.headers.push(key, val);
      }
    }
    module2.exports = Request;
  }
});

// node_modules/undici/lib/handler/wrap-handler.js
var require_wrap_handler = __commonJS({
  "node_modules/undici/lib/handler/wrap-handler.js"(exports2, module2) {
    "use strict";
    var { InvalidArgumentError } = require_errors();
    module2.exports = class WrapHandler {
      #handler;
      constructor(handler) {
        this.#handler = handler;
      }
      static wrap(handler) {
        return handler.onRequestStart ? handler : new WrapHandler(handler);
      }
      // Unwrap Interface
      onConnect(abort, context) {
        return this.#handler.onConnect?.(abort, context);
      }
      onHeaders(statusCode, rawHeaders, resume, statusMessage) {
        return this.#handler.onHeaders?.(statusCode, rawHeaders, resume, statusMessage);
      }
      onUpgrade(statusCode, rawHeaders, socket) {
        return this.#handler.onUpgrade?.(statusCode, rawHeaders, socket);
      }
      onData(data) {
        return this.#handler.onData?.(data);
      }
      onComplete(trailers) {
        return this.#handler.onComplete?.(trailers);
      }
      onError(err) {
        if (!this.#handler.onError) {
          throw err;
        }
        return this.#handler.onError?.(err);
      }
      // Wrap Interface
      onRequestStart(controller, context) {
        this.#handler.onConnect?.((reason) => controller.abort(reason), context);
      }
      onRequestUpgrade(controller, statusCode, headers, socket) {
        const rawHeaders = [];
        for (const [key, val] of Object.entries(headers)) {
          rawHeaders.push(Buffer.from(key), Array.isArray(val) ? val.map((v) => Buffer.from(v)) : Buffer.from(val));
        }
        this.#handler.onUpgrade?.(statusCode, rawHeaders, socket);
      }
      onResponseStart(controller, statusCode, headers, statusMessage) {
        const rawHeaders = [];
        for (const [key, val] of Object.entries(headers)) {
          rawHeaders.push(Buffer.from(key), Array.isArray(val) ? val.map((v) => Buffer.from(v)) : Buffer.from(val));
        }
        if (this.#handler.onHeaders?.(statusCode, rawHeaders, () => controller.resume(), statusMessage) === false) {
          controller.pause();
        }
      }
      onResponseData(controller, data) {
        if (this.#handler.onData?.(data) === false) {
          controller.pause();
        }
      }
      onResponseEnd(controller, trailers) {
        const rawTrailers = [];
        for (const [key, val] of Object.entries(trailers)) {
          rawTrailers.push(Buffer.from(key), Array.isArray(val) ? val.map((v) => Buffer.from(v)) : Buffer.from(val));
        }
        this.#handler.onComplete?.(rawTrailers);
      }
      onResponseError(controller, err) {
        if (!this.#handler.onError) {
          throw new InvalidArgumentError("invalid onError method");
        }
        this.#handler.onError?.(err);
      }
    };
  }
});

// node_modules/undici/lib/dispatcher/dispatcher.js
var require_dispatcher = __commonJS({
  "node_modules/undici/lib/dispatcher/dispatcher.js"(exports2, module2) {
    "use strict";
    var EventEmitter = require("node:events");
    var WrapHandler = require_wrap_handler();
    var wrapInterceptor = (dispatch) => (opts, handler) => dispatch(opts, WrapHandler.wrap(handler));
    var Dispatcher = class extends EventEmitter {
      dispatch() {
        throw new Error("not implemented");
      }
      close() {
        throw new Error("not implemented");
      }
      destroy() {
        throw new Error("not implemented");
      }
      compose(...args) {
        const interceptors = Array.isArray(args[0]) ? args[0] : args;
        let dispatch = this.dispatch.bind(this);
        for (const interceptor of interceptors) {
          if (interceptor == null) {
            continue;
          }
          if (typeof interceptor !== "function") {
            throw new TypeError(`invalid interceptor, expected function received ${typeof interceptor}`);
          }
          dispatch = interceptor(dispatch);
          dispatch = wrapInterceptor(dispatch);
          if (dispatch == null || typeof dispatch !== "function" || dispatch.length !== 2) {
            throw new TypeError("invalid interceptor");
          }
        }
        return new Proxy(this, {
          get: (target, key) => key === "dispatch" ? dispatch : target[key]
        });
      }
    };
    module2.exports = Dispatcher;
  }
});

// node_modules/undici/lib/handler/unwrap-handler.js
var require_unwrap_handler = __commonJS({
  "node_modules/undici/lib/handler/unwrap-handler.js"(exports2, module2) {
    "use strict";
    var { parseHeaders } = require_util();
    var { InvalidArgumentError } = require_errors();
    var kResume = Symbol("resume");
    var UnwrapController = class {
      #paused = false;
      #reason = null;
      #aborted = false;
      #abort;
      [kResume] = null;
      constructor(abort) {
        this.#abort = abort;
      }
      pause() {
        this.#paused = true;
      }
      resume() {
        if (this.#paused) {
          this.#paused = false;
          this[kResume]?.();
        }
      }
      abort(reason) {
        if (!this.#aborted) {
          this.#aborted = true;
          this.#reason = reason;
          this.#abort(reason);
        }
      }
      get aborted() {
        return this.#aborted;
      }
      get reason() {
        return this.#reason;
      }
      get paused() {
        return this.#paused;
      }
    };
    module2.exports = class UnwrapHandler {
      #handler;
      #controller;
      constructor(handler) {
        this.#handler = handler;
      }
      static unwrap(handler) {
        return !handler.onRequestStart ? handler : new UnwrapHandler(handler);
      }
      onConnect(abort, context) {
        this.#controller = new UnwrapController(abort);
        this.#handler.onRequestStart?.(this.#controller, context);
      }
      onUpgrade(statusCode, rawHeaders, socket) {
        this.#handler.onRequestUpgrade?.(this.#controller, statusCode, parseHeaders(rawHeaders), socket);
      }
      onHeaders(statusCode, rawHeaders, resume, statusMessage) {
        this.#controller[kResume] = resume;
        this.#handler.onResponseStart?.(this.#controller, statusCode, parseHeaders(rawHeaders), statusMessage);
        return !this.#controller.paused;
      }
      onData(data) {
        this.#handler.onResponseData?.(this.#controller, data);
        return !this.#controller.paused;
      }
      onComplete(rawTrailers) {
        this.#handler.onResponseEnd?.(this.#controller, parseHeaders(rawTrailers));
      }
      onError(err) {
        if (!this.#handler.onResponseError) {
          throw new InvalidArgumentError("invalid onError method");
        }
        this.#handler.onResponseError?.(this.#controller, err);
      }
    };
  }
});

// node_modules/undici/lib/dispatcher/dispatcher-base.js
var require_dispatcher_base = __commonJS({
  "node_modules/undici/lib/dispatcher/dispatcher-base.js"(exports2, module2) {
    "use strict";
    var Dispatcher = require_dispatcher();
    var UnwrapHandler = require_unwrap_handler();
    var {
      ClientDestroyedError,
      ClientClosedError,
      InvalidArgumentError
    } = require_errors();
    var { kDestroy, kClose, kClosed, kDestroyed, kDispatch } = require_symbols();
    var kOnDestroyed = Symbol("onDestroyed");
    var kOnClosed = Symbol("onClosed");
    var DispatcherBase = class extends Dispatcher {
      constructor() {
        super();
        this[kDestroyed] = false;
        this[kOnDestroyed] = null;
        this[kClosed] = false;
        this[kOnClosed] = [];
      }
      get destroyed() {
        return this[kDestroyed];
      }
      get closed() {
        return this[kClosed];
      }
      close(callback) {
        if (callback === void 0) {
          return new Promise((resolve, reject) => {
            this.close((err, data) => {
              return err ? reject(err) : resolve(data);
            });
          });
        }
        if (typeof callback !== "function") {
          throw new InvalidArgumentError("invalid callback");
        }
        if (this[kDestroyed]) {
          queueMicrotask(() => callback(new ClientDestroyedError(), null));
          return;
        }
        if (this[kClosed]) {
          if (this[kOnClosed]) {
            this[kOnClosed].push(callback);
          } else {
            queueMicrotask(() => callback(null, null));
          }
          return;
        }
        this[kClosed] = true;
        this[kOnClosed].push(callback);
        const onClosed = () => {
          const callbacks = this[kOnClosed];
          this[kOnClosed] = null;
          for (let i = 0; i < callbacks.length; i++) {
            callbacks[i](null, null);
          }
        };
        this[kClose]().then(() => this.destroy()).then(() => {
          queueMicrotask(onClosed);
        });
      }
      destroy(err, callback) {
        if (typeof err === "function") {
          callback = err;
          err = null;
        }
        if (callback === void 0) {
          return new Promise((resolve, reject) => {
            this.destroy(err, (err2, data) => {
              return err2 ? (
                /* istanbul ignore next: should never error */
                reject(err2)
              ) : resolve(data);
            });
          });
        }
        if (typeof callback !== "function") {
          throw new InvalidArgumentError("invalid callback");
        }
        if (this[kDestroyed]) {
          if (this[kOnDestroyed]) {
            this[kOnDestroyed].push(callback);
          } else {
            queueMicrotask(() => callback(null, null));
          }
          return;
        }
        if (!err) {
          err = new ClientDestroyedError();
        }
        this[kDestroyed] = true;
        this[kOnDestroyed] = this[kOnDestroyed] || [];
        this[kOnDestroyed].push(callback);
        const onDestroyed = () => {
          const callbacks = this[kOnDestroyed];
          this[kOnDestroyed] = null;
          for (let i = 0; i < callbacks.length; i++) {
            callbacks[i](null, null);
          }
        };
        this[kDestroy](err).then(() => {
          queueMicrotask(onDestroyed);
        });
      }
      dispatch(opts, handler) {
        if (!handler || typeof handler !== "object") {
          throw new InvalidArgumentError("handler must be an object");
        }
        handler = UnwrapHandler.unwrap(handler);
        try {
          if (!opts || typeof opts !== "object") {
            throw new InvalidArgumentError("opts must be an object.");
          }
          if (this[kDestroyed] || this[kOnDestroyed]) {
            throw new ClientDestroyedError();
          }
          if (this[kClosed]) {
            throw new ClientClosedError();
          }
          return this[kDispatch](opts, handler);
        } catch (err) {
          if (typeof handler.onError !== "function") {
            throw err;
          }
          handler.onError(err);
          return false;
        }
      }
    };
    module2.exports = DispatcherBase;
  }
});

// node_modules/undici/lib/core/connect.js
var require_connect = __commonJS({
  "node_modules/undici/lib/core/connect.js"(exports2, module2) {
    "use strict";
    var net = require("node:net");
    var assert = require("node:assert");
    var util = require_util();
    var { InvalidArgumentError } = require_errors();
    var tls;
    var SessionCache = class WeakSessionCache {
      constructor(maxCachedSessions) {
        this._maxCachedSessions = maxCachedSessions;
        this._sessionCache = /* @__PURE__ */ new Map();
        this._sessionRegistry = new FinalizationRegistry((key) => {
          if (this._sessionCache.size < this._maxCachedSessions) {
            return;
          }
          const ref = this._sessionCache.get(key);
          if (ref !== void 0 && ref.deref() === void 0) {
            this._sessionCache.delete(key);
          }
        });
      }
      get(sessionKey) {
        const ref = this._sessionCache.get(sessionKey);
        return ref ? ref.deref() : null;
      }
      set(sessionKey, session) {
        if (this._maxCachedSessions === 0) {
          return;
        }
        this._sessionCache.set(sessionKey, new WeakRef(session));
        this._sessionRegistry.register(session, sessionKey);
      }
    };
    function buildConnector({ allowH2, maxCachedSessions, socketPath, timeout, session: customSession, ...opts }) {
      if (maxCachedSessions != null && (!Number.isInteger(maxCachedSessions) || maxCachedSessions < 0)) {
        throw new InvalidArgumentError("maxCachedSessions must be a positive integer or zero");
      }
      const options = { path: socketPath, ...opts };
      const sessionCache = new SessionCache(maxCachedSessions == null ? 100 : maxCachedSessions);
      timeout = timeout == null ? 1e4 : timeout;
      allowH2 = allowH2 != null ? allowH2 : false;
      return function connect({ hostname, host, protocol, port, servername, localAddress, httpSocket }, callback) {
        let socket;
        if (protocol === "https:") {
          if (!tls) {
            tls = require("node:tls");
          }
          servername = servername || options.servername || util.getServerName(host) || null;
          const sessionKey = servername || hostname;
          assert(sessionKey);
          const session = customSession || sessionCache.get(sessionKey) || null;
          port = port || 443;
          socket = tls.connect({
            highWaterMark: 16384,
            // TLS in node can't have bigger HWM anyway...
            ...options,
            servername,
            session,
            localAddress,
            ALPNProtocols: allowH2 ? ["http/1.1", "h2"] : ["http/1.1"],
            socket: httpSocket,
            // upgrade socket connection
            port,
            host: hostname
          });
          socket.on("session", function(session2) {
            sessionCache.set(sessionKey, session2);
          });
        } else {
          assert(!httpSocket, "httpSocket can only be sent on TLS update");
          port = port || 80;
          socket = net.connect({
            highWaterMark: 64 * 1024,
            // Same as nodejs fs streams.
            ...options,
            localAddress,
            port,
            host: hostname
          });
        }
        if (options.keepAlive == null || options.keepAlive) {
          const keepAliveInitialDelay = options.keepAliveInitialDelay === void 0 ? 6e4 : options.keepAliveInitialDelay;
          socket.setKeepAlive(true, keepAliveInitialDelay);
        }
        const clearConnectTimeout = util.setupConnectTimeout(new WeakRef(socket), { timeout, hostname, port });
        socket.setNoDelay(true).once(protocol === "https:" ? "secureConnect" : "connect", function() {
          queueMicrotask(clearConnectTimeout);
          if (callback) {
            const cb = callback;
            callback = null;
            cb(null, this);
          }
        }).on("error", function(err) {
          queueMicrotask(clearConnectTimeout);
          if (callback) {
            const cb = callback;
            callback = null;
            cb(err);
          }
        });
        return socket;
      };
    }
    module2.exports = buildConnector;
  }
});

// node_modules/undici/lib/llhttp/utils.js
var require_utils = __commonJS({
  "node_modules/undici/lib/llhttp/utils.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.enumToMap = void 0;
    function enumToMap(obj, filter = [], exceptions = []) {
      var _a, _b;
      const emptyFilter = ((_a = filter === null || filter === void 0 ? void 0 : filter.length) !== null && _a !== void 0 ? _a : 0) === 0;
      const emptyExceptions = ((_b = exceptions === null || exceptions === void 0 ? void 0 : exceptions.length) !== null && _b !== void 0 ? _b : 0) === 0;
      return Object.fromEntries(Object.entries(obj).filter(([, value]) => {
        return typeof value === "number" && (emptyFilter || filter.includes(value)) && (emptyExceptions || !exceptions.includes(value));
      }));
    }
    exports2.enumToMap = enumToMap;
  }
});

// node_modules/undici/lib/llhttp/constants.js
var require_constants2 = __commonJS({
  "node_modules/undici/lib/llhttp/constants.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SPECIAL_HEADERS = exports2.MINOR = exports2.MAJOR = exports2.HTAB_SP_VCHAR_OBS_TEXT = exports2.QUOTED_STRING = exports2.CONNECTION_TOKEN_CHARS = exports2.HEADER_CHARS = exports2.TOKEN = exports2.HEX = exports2.URL_CHAR = exports2.USERINFO_CHARS = exports2.MARK = exports2.ALPHANUM = exports2.NUM = exports2.HEX_MAP = exports2.NUM_MAP = exports2.ALPHA = exports2.STATUSES_HTTP = exports2.H_METHOD_MAP = exports2.METHOD_MAP = exports2.METHODS_RTSP = exports2.METHODS_ICE = exports2.METHODS_HTTP = exports2.HEADER_STATE = exports2.FINISH = exports2.STATUSES = exports2.METHODS = exports2.LENIENT_FLAGS = exports2.FLAGS = exports2.TYPE = exports2.ERROR = void 0;
    var utils_1 = require_utils();
    exports2.ERROR = {
      OK: 0,
      INTERNAL: 1,
      STRICT: 2,
      CR_EXPECTED: 25,
      LF_EXPECTED: 3,
      UNEXPECTED_CONTENT_LENGTH: 4,
      UNEXPECTED_SPACE: 30,
      CLOSED_CONNECTION: 5,
      INVALID_METHOD: 6,
      INVALID_URL: 7,
      INVALID_CONSTANT: 8,
      INVALID_VERSION: 9,
      INVALID_HEADER_TOKEN: 10,
      INVALID_CONTENT_LENGTH: 11,
      INVALID_CHUNK_SIZE: 12,
      INVALID_STATUS: 13,
      INVALID_EOF_STATE: 14,
      INVALID_TRANSFER_ENCODING: 15,
      CB_MESSAGE_BEGIN: 16,
      CB_HEADERS_COMPLETE: 17,
      CB_MESSAGE_COMPLETE: 18,
      CB_CHUNK_HEADER: 19,
      CB_CHUNK_COMPLETE: 20,
      PAUSED: 21,
      PAUSED_UPGRADE: 22,
      PAUSED_H2_UPGRADE: 23,
      USER: 24,
      CB_URL_COMPLETE: 26,
      CB_STATUS_COMPLETE: 27,
      CB_METHOD_COMPLETE: 32,
      CB_VERSION_COMPLETE: 33,
      CB_HEADER_FIELD_COMPLETE: 28,
      CB_HEADER_VALUE_COMPLETE: 29,
      CB_CHUNK_EXTENSION_NAME_COMPLETE: 34,
      CB_CHUNK_EXTENSION_VALUE_COMPLETE: 35,
      CB_RESET: 31
    };
    exports2.TYPE = {
      BOTH: 0,
      // default
      REQUEST: 1,
      RESPONSE: 2
    };
    exports2.FLAGS = {
      CONNECTION_KEEP_ALIVE: 1 << 0,
      CONNECTION_CLOSE: 1 << 1,
      CONNECTION_UPGRADE: 1 << 2,
      CHUNKED: 1 << 3,
      UPGRADE: 1 << 4,
      CONTENT_LENGTH: 1 << 5,
      SKIPBODY: 1 << 6,
      TRAILING: 1 << 7,
      // 1 << 8 is unused
      TRANSFER_ENCODING: 1 << 9
    };
    exports2.LENIENT_FLAGS = {
      HEADERS: 1 << 0,
      CHUNKED_LENGTH: 1 << 1,
      KEEP_ALIVE: 1 << 2,
      TRANSFER_ENCODING: 1 << 3,
      VERSION: 1 << 4,
      DATA_AFTER_CLOSE: 1 << 5,
      OPTIONAL_LF_AFTER_CR: 1 << 6,
      OPTIONAL_CRLF_AFTER_CHUNK: 1 << 7,
      OPTIONAL_CR_BEFORE_LF: 1 << 8,
      SPACES_AFTER_CHUNK_SIZE: 1 << 9
    };
    exports2.METHODS = {
      "DELETE": 0,
      "GET": 1,
      "HEAD": 2,
      "POST": 3,
      "PUT": 4,
      /* pathological */
      "CONNECT": 5,
      "OPTIONS": 6,
      "TRACE": 7,
      /* WebDAV */
      "COPY": 8,
      "LOCK": 9,
      "MKCOL": 10,
      "MOVE": 11,
      "PROPFIND": 12,
      "PROPPATCH": 13,
      "SEARCH": 14,
      "UNLOCK": 15,
      "BIND": 16,
      "REBIND": 17,
      "UNBIND": 18,
      "ACL": 19,
      /* subversion */
      "REPORT": 20,
      "MKACTIVITY": 21,
      "CHECKOUT": 22,
      "MERGE": 23,
      /* upnp */
      "M-SEARCH": 24,
      "NOTIFY": 25,
      "SUBSCRIBE": 26,
      "UNSUBSCRIBE": 27,
      /* RFC-5789 */
      "PATCH": 28,
      "PURGE": 29,
      /* CalDAV */
      "MKCALENDAR": 30,
      /* RFC-2068, section 19.6.1.2 */
      "LINK": 31,
      "UNLINK": 32,
      /* icecast */
      "SOURCE": 33,
      /* RFC-7540, section 11.6 */
      "PRI": 34,
      /* RFC-2326 RTSP */
      "DESCRIBE": 35,
      "ANNOUNCE": 36,
      "SETUP": 37,
      "PLAY": 38,
      "PAUSE": 39,
      "TEARDOWN": 40,
      "GET_PARAMETER": 41,
      "SET_PARAMETER": 42,
      "REDIRECT": 43,
      "RECORD": 44,
      /* RAOP */
      "FLUSH": 45,
      /* DRAFT https://www.ietf.org/archive/id/draft-ietf-httpbis-safe-method-w-body-02.html */
      "QUERY": 46
    };
    exports2.STATUSES = {
      CONTINUE: 100,
      SWITCHING_PROTOCOLS: 101,
      PROCESSING: 102,
      EARLY_HINTS: 103,
      RESPONSE_IS_STALE: 110,
      // Unofficial
      REVALIDATION_FAILED: 111,
      // Unofficial
      DISCONNECTED_OPERATION: 112,
      // Unofficial
      HEURISTIC_EXPIRATION: 113,
      // Unofficial
      MISCELLANEOUS_WARNING: 199,
      // Unofficial
      OK: 200,
      CREATED: 201,
      ACCEPTED: 202,
      NON_AUTHORITATIVE_INFORMATION: 203,
      NO_CONTENT: 204,
      RESET_CONTENT: 205,
      PARTIAL_CONTENT: 206,
      MULTI_STATUS: 207,
      ALREADY_REPORTED: 208,
      TRANSFORMATION_APPLIED: 214,
      // Unofficial
      IM_USED: 226,
      MISCELLANEOUS_PERSISTENT_WARNING: 299,
      // Unofficial
      MULTIPLE_CHOICES: 300,
      MOVED_PERMANENTLY: 301,
      FOUND: 302,
      SEE_OTHER: 303,
      NOT_MODIFIED: 304,
      USE_PROXY: 305,
      SWITCH_PROXY: 306,
      // No longer used
      TEMPORARY_REDIRECT: 307,
      PERMANENT_REDIRECT: 308,
      BAD_REQUEST: 400,
      UNAUTHORIZED: 401,
      PAYMENT_REQUIRED: 402,
      FORBIDDEN: 403,
      NOT_FOUND: 404,
      METHOD_NOT_ALLOWED: 405,
      NOT_ACCEPTABLE: 406,
      PROXY_AUTHENTICATION_REQUIRED: 407,
      REQUEST_TIMEOUT: 408,
      CONFLICT: 409,
      GONE: 410,
      LENGTH_REQUIRED: 411,
      PRECONDITION_FAILED: 412,
      PAYLOAD_TOO_LARGE: 413,
      URI_TOO_LONG: 414,
      UNSUPPORTED_MEDIA_TYPE: 415,
      RANGE_NOT_SATISFIABLE: 416,
      EXPECTATION_FAILED: 417,
      IM_A_TEAPOT: 418,
      PAGE_EXPIRED: 419,
      // Unofficial
      ENHANCE_YOUR_CALM: 420,
      // Unofficial
      MISDIRECTED_REQUEST: 421,
      UNPROCESSABLE_ENTITY: 422,
      LOCKED: 423,
      FAILED_DEPENDENCY: 424,
      TOO_EARLY: 425,
      UPGRADE_REQUIRED: 426,
      PRECONDITION_REQUIRED: 428,
      TOO_MANY_REQUESTS: 429,
      REQUEST_HEADER_FIELDS_TOO_LARGE_UNOFFICIAL: 430,
      // Unofficial
      REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
      LOGIN_TIMEOUT: 440,
      // Unofficial
      NO_RESPONSE: 444,
      // Unofficial
      RETRY_WITH: 449,
      // Unofficial
      BLOCKED_BY_PARENTAL_CONTROL: 450,
      // Unofficial
      UNAVAILABLE_FOR_LEGAL_REASONS: 451,
      CLIENT_CLOSED_LOAD_BALANCED_REQUEST: 460,
      // Unofficial
      INVALID_X_FORWARDED_FOR: 463,
      // Unofficial
      REQUEST_HEADER_TOO_LARGE: 494,
      // Unofficial
      SSL_CERTIFICATE_ERROR: 495,
      // Unofficial
      SSL_CERTIFICATE_REQUIRED: 496,
      // Unofficial
      HTTP_REQUEST_SENT_TO_HTTPS_PORT: 497,
      // Unofficial
      INVALID_TOKEN: 498,
      // Unofficial
      CLIENT_CLOSED_REQUEST: 499,
      // Unofficial
      INTERNAL_SERVER_ERROR: 500,
      NOT_IMPLEMENTED: 501,
      BAD_GATEWAY: 502,
      SERVICE_UNAVAILABLE: 503,
      GATEWAY_TIMEOUT: 504,
      HTTP_VERSION_NOT_SUPPORTED: 505,
      VARIANT_ALSO_NEGOTIATES: 506,
      INSUFFICIENT_STORAGE: 507,
      LOOP_DETECTED: 508,
      BANDWIDTH_LIMIT_EXCEEDED: 509,
      NOT_EXTENDED: 510,
      NETWORK_AUTHENTICATION_REQUIRED: 511,
      WEB_SERVER_UNKNOWN_ERROR: 520,
      // Unofficial
      WEB_SERVER_IS_DOWN: 521,
      // Unofficial
      CONNECTION_TIMEOUT: 522,
      // Unofficial
      ORIGIN_IS_UNREACHABLE: 523,
      // Unofficial
      TIMEOUT_OCCURED: 524,
      // Unofficial
      SSL_HANDSHAKE_FAILED: 525,
      // Unofficial
      INVALID_SSL_CERTIFICATE: 526,
      // Unofficial
      RAILGUN_ERROR: 527,
      // Unofficial
      SITE_IS_OVERLOADED: 529,
      // Unofficial
      SITE_IS_FROZEN: 530,
      // Unofficial
      IDENTITY_PROVIDER_AUTHENTICATION_ERROR: 561,
      // Unofficial
      NETWORK_READ_TIMEOUT: 598,
      // Unofficial
      NETWORK_CONNECT_TIMEOUT: 599
      // Unofficial
    };
    exports2.FINISH = {
      SAFE: 0,
      SAFE_WITH_CB: 1,
      UNSAFE: 2
    };
    exports2.HEADER_STATE = {
      GENERAL: 0,
      CONNECTION: 1,
      CONTENT_LENGTH: 2,
      TRANSFER_ENCODING: 3,
      UPGRADE: 4,
      CONNECTION_KEEP_ALIVE: 5,
      CONNECTION_CLOSE: 6,
      CONNECTION_UPGRADE: 7,
      TRANSFER_ENCODING_CHUNKED: 8
    };
    exports2.METHODS_HTTP = [
      exports2.METHODS.DELETE,
      exports2.METHODS.GET,
      exports2.METHODS.HEAD,
      exports2.METHODS.POST,
      exports2.METHODS.PUT,
      exports2.METHODS.CONNECT,
      exports2.METHODS.OPTIONS,
      exports2.METHODS.TRACE,
      exports2.METHODS.COPY,
      exports2.METHODS.LOCK,
      exports2.METHODS.MKCOL,
      exports2.METHODS.MOVE,
      exports2.METHODS.PROPFIND,
      exports2.METHODS.PROPPATCH,
      exports2.METHODS.SEARCH,
      exports2.METHODS.UNLOCK,
      exports2.METHODS.BIND,
      exports2.METHODS.REBIND,
      exports2.METHODS.UNBIND,
      exports2.METHODS.ACL,
      exports2.METHODS.REPORT,
      exports2.METHODS.MKACTIVITY,
      exports2.METHODS.CHECKOUT,
      exports2.METHODS.MERGE,
      exports2.METHODS["M-SEARCH"],
      exports2.METHODS.NOTIFY,
      exports2.METHODS.SUBSCRIBE,
      exports2.METHODS.UNSUBSCRIBE,
      exports2.METHODS.PATCH,
      exports2.METHODS.PURGE,
      exports2.METHODS.MKCALENDAR,
      exports2.METHODS.LINK,
      exports2.METHODS.UNLINK,
      exports2.METHODS.PRI,
      // TODO(indutny): should we allow it with HTTP?
      exports2.METHODS.SOURCE,
      exports2.METHODS.QUERY
    ];
    exports2.METHODS_ICE = [
      exports2.METHODS.SOURCE
    ];
    exports2.METHODS_RTSP = [
      exports2.METHODS.OPTIONS,
      exports2.METHODS.DESCRIBE,
      exports2.METHODS.ANNOUNCE,
      exports2.METHODS.SETUP,
      exports2.METHODS.PLAY,
      exports2.METHODS.PAUSE,
      exports2.METHODS.TEARDOWN,
      exports2.METHODS.GET_PARAMETER,
      exports2.METHODS.SET_PARAMETER,
      exports2.METHODS.REDIRECT,
      exports2.METHODS.RECORD,
      exports2.METHODS.FLUSH,
      // For AirPlay
      exports2.METHODS.GET,
      exports2.METHODS.POST
    ];
    exports2.METHOD_MAP = (0, utils_1.enumToMap)(exports2.METHODS);
    exports2.H_METHOD_MAP = Object.fromEntries(Object.entries(exports2.METHODS).filter(([k]) => k.startsWith("H")));
    exports2.STATUSES_HTTP = [
      exports2.STATUSES.CONTINUE,
      exports2.STATUSES.SWITCHING_PROTOCOLS,
      exports2.STATUSES.PROCESSING,
      exports2.STATUSES.EARLY_HINTS,
      exports2.STATUSES.RESPONSE_IS_STALE,
      exports2.STATUSES.REVALIDATION_FAILED,
      exports2.STATUSES.DISCONNECTED_OPERATION,
      exports2.STATUSES.HEURISTIC_EXPIRATION,
      exports2.STATUSES.MISCELLANEOUS_WARNING,
      exports2.STATUSES.OK,
      exports2.STATUSES.CREATED,
      exports2.STATUSES.ACCEPTED,
      exports2.STATUSES.NON_AUTHORITATIVE_INFORMATION,
      exports2.STATUSES.NO_CONTENT,
      exports2.STATUSES.RESET_CONTENT,
      exports2.STATUSES.PARTIAL_CONTENT,
      exports2.STATUSES.MULTI_STATUS,
      exports2.STATUSES.ALREADY_REPORTED,
      exports2.STATUSES.TRANSFORMATION_APPLIED,
      exports2.STATUSES.IM_USED,
      exports2.STATUSES.MISCELLANEOUS_PERSISTENT_WARNING,
      exports2.STATUSES.MULTIPLE_CHOICES,
      exports2.STATUSES.MOVED_PERMANENTLY,
      exports2.STATUSES.FOUND,
      exports2.STATUSES.SEE_OTHER,
      exports2.STATUSES.NOT_MODIFIED,
      exports2.STATUSES.USE_PROXY,
      exports2.STATUSES.SWITCH_PROXY,
      exports2.STATUSES.TEMPORARY_REDIRECT,
      exports2.STATUSES.PERMANENT_REDIRECT,
      exports2.STATUSES.BAD_REQUEST,
      exports2.STATUSES.UNAUTHORIZED,
      exports2.STATUSES.PAYMENT_REQUIRED,
      exports2.STATUSES.FORBIDDEN,
      exports2.STATUSES.NOT_FOUND,
      exports2.STATUSES.METHOD_NOT_ALLOWED,
      exports2.STATUSES.NOT_ACCEPTABLE,
      exports2.STATUSES.PROXY_AUTHENTICATION_REQUIRED,
      exports2.STATUSES.REQUEST_TIMEOUT,
      exports2.STATUSES.CONFLICT,
      exports2.STATUSES.GONE,
      exports2.STATUSES.LENGTH_REQUIRED,
      exports2.STATUSES.PRECONDITION_FAILED,
      exports2.STATUSES.PAYLOAD_TOO_LARGE,
      exports2.STATUSES.URI_TOO_LONG,
      exports2.STATUSES.UNSUPPORTED_MEDIA_TYPE,
      exports2.STATUSES.RANGE_NOT_SATISFIABLE,
      exports2.STATUSES.EXPECTATION_FAILED,
      exports2.STATUSES.IM_A_TEAPOT,
      exports2.STATUSES.PAGE_EXPIRED,
      exports2.STATUSES.ENHANCE_YOUR_CALM,
      exports2.STATUSES.MISDIRECTED_REQUEST,
      exports2.STATUSES.UNPROCESSABLE_ENTITY,
      exports2.STATUSES.LOCKED,
      exports2.STATUSES.FAILED_DEPENDENCY,
      exports2.STATUSES.TOO_EARLY,
      exports2.STATUSES.UPGRADE_REQUIRED,
      exports2.STATUSES.PRECONDITION_REQUIRED,
      exports2.STATUSES.TOO_MANY_REQUESTS,
      exports2.STATUSES.REQUEST_HEADER_FIELDS_TOO_LARGE_UNOFFICIAL,
      exports2.STATUSES.REQUEST_HEADER_FIELDS_TOO_LARGE,
      exports2.STATUSES.LOGIN_TIMEOUT,
      exports2.STATUSES.NO_RESPONSE,
      exports2.STATUSES.RETRY_WITH,
      exports2.STATUSES.BLOCKED_BY_PARENTAL_CONTROL,
      exports2.STATUSES.UNAVAILABLE_FOR_LEGAL_REASONS,
      exports2.STATUSES.CLIENT_CLOSED_LOAD_BALANCED_REQUEST,
      exports2.STATUSES.INVALID_X_FORWARDED_FOR,
      exports2.STATUSES.REQUEST_HEADER_TOO_LARGE,
      exports2.STATUSES.SSL_CERTIFICATE_ERROR,
      exports2.STATUSES.SSL_CERTIFICATE_REQUIRED,
      exports2.STATUSES.HTTP_REQUEST_SENT_TO_HTTPS_PORT,
      exports2.STATUSES.INVALID_TOKEN,
      exports2.STATUSES.CLIENT_CLOSED_REQUEST,
      exports2.STATUSES.INTERNAL_SERVER_ERROR,
      exports2.STATUSES.NOT_IMPLEMENTED,
      exports2.STATUSES.BAD_GATEWAY,
      exports2.STATUSES.SERVICE_UNAVAILABLE,
      exports2.STATUSES.GATEWAY_TIMEOUT,
      exports2.STATUSES.HTTP_VERSION_NOT_SUPPORTED,
      exports2.STATUSES.VARIANT_ALSO_NEGOTIATES,
      exports2.STATUSES.INSUFFICIENT_STORAGE,
      exports2.STATUSES.LOOP_DETECTED,
      exports2.STATUSES.BANDWIDTH_LIMIT_EXCEEDED,
      exports2.STATUSES.NOT_EXTENDED,
      exports2.STATUSES.NETWORK_AUTHENTICATION_REQUIRED,
      exports2.STATUSES.WEB_SERVER_UNKNOWN_ERROR,
      exports2.STATUSES.WEB_SERVER_IS_DOWN,
      exports2.STATUSES.CONNECTION_TIMEOUT,
      exports2.STATUSES.ORIGIN_IS_UNREACHABLE,
      exports2.STATUSES.TIMEOUT_OCCURED,
      exports2.STATUSES.SSL_HANDSHAKE_FAILED,
      exports2.STATUSES.INVALID_SSL_CERTIFICATE,
      exports2.STATUSES.RAILGUN_ERROR,
      exports2.STATUSES.SITE_IS_OVERLOADED,
      exports2.STATUSES.SITE_IS_FROZEN,
      exports2.STATUSES.IDENTITY_PROVIDER_AUTHENTICATION_ERROR,
      exports2.STATUSES.NETWORK_READ_TIMEOUT,
      exports2.STATUSES.NETWORK_CONNECT_TIMEOUT
    ];
    exports2.ALPHA = [];
    for (let i = "A".charCodeAt(0); i <= "Z".charCodeAt(0); i++) {
      exports2.ALPHA.push(String.fromCharCode(i));
      exports2.ALPHA.push(String.fromCharCode(i + 32));
    }
    exports2.NUM_MAP = {
      0: 0,
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6,
      7: 7,
      8: 8,
      9: 9
    };
    exports2.HEX_MAP = {
      0: 0,
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6,
      7: 7,
      8: 8,
      9: 9,
      A: 10,
      B: 11,
      C: 12,
      D: 13,
      E: 14,
      F: 15,
      a: 10,
      b: 11,
      c: 12,
      d: 13,
      e: 14,
      f: 15
    };
    exports2.NUM = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9"
    ];
    exports2.ALPHANUM = exports2.ALPHA.concat(exports2.NUM);
    exports2.MARK = ["-", "_", ".", "!", "~", "*", "'", "(", ")"];
    exports2.USERINFO_CHARS = exports2.ALPHANUM.concat(exports2.MARK).concat(["%", ";", ":", "&", "=", "+", "$", ","]);
    exports2.URL_CHAR = [
      "!",
      '"',
      "$",
      "%",
      "&",
      "'",
      "(",
      ")",
      "*",
      "+",
      ",",
      "-",
      ".",
      "/",
      ":",
      ";",
      "<",
      "=",
      ">",
      "@",
      "[",
      "\\",
      "]",
      "^",
      "_",
      "`",
      "{",
      "|",
      "}",
      "~"
    ].concat(exports2.ALPHANUM);
    exports2.HEX = exports2.NUM.concat(["a", "b", "c", "d", "e", "f", "A", "B", "C", "D", "E", "F"]);
    exports2.TOKEN = [
      "!",
      "#",
      "$",
      "%",
      "&",
      "'",
      "*",
      "+",
      "-",
      ".",
      "^",
      "_",
      "`",
      "|",
      "~"
    ].concat(exports2.ALPHANUM);
    exports2.HEADER_CHARS = ["	"];
    for (let i = 32; i <= 255; i++) {
      if (i !== 127) {
        exports2.HEADER_CHARS.push(i);
      }
    }
    exports2.CONNECTION_TOKEN_CHARS = exports2.HEADER_CHARS.filter((c) => c !== 44);
    exports2.QUOTED_STRING = ["	", " "];
    for (let i = 33; i <= 255; i++) {
      if (i !== 34 && i !== 92) {
        exports2.QUOTED_STRING.push(i);
      }
    }
    exports2.HTAB_SP_VCHAR_OBS_TEXT = ["	", " "];
    for (let i = 33; i <= 126; i++) {
      exports2.HTAB_SP_VCHAR_OBS_TEXT.push(i);
    }
    for (let i = 128; i <= 255; i++) {
      exports2.HTAB_SP_VCHAR_OBS_TEXT.push(i);
    }
    exports2.MAJOR = exports2.NUM_MAP;
    exports2.MINOR = exports2.MAJOR;
    exports2.SPECIAL_HEADERS = {
      "connection": exports2.HEADER_STATE.CONNECTION,
      "content-length": exports2.HEADER_STATE.CONTENT_LENGTH,
      "proxy-connection": exports2.HEADER_STATE.CONNECTION,
      "transfer-encoding": exports2.HEADER_STATE.TRANSFER_ENCODING,
      "upgrade": exports2.HEADER_STATE.UPGRADE
    };
  }
});

// node_modules/undici/lib/llhttp/llhttp-wasm.js
var require_llhttp_wasm = __commonJS({
  "node_modules/undici/lib/llhttp/llhttp-wasm.js"(exports2, module2) {
    "use strict";
    var { Buffer: Buffer2 } = require("node:buffer");
    var wasmBase64 = "AGFzbQEAAAABJwdgAX8Bf2ADf39/AX9gAn9/AGABfwBgBH9/f38Bf2AAAGADf39/AALLAQgDZW52GHdhc21fb25faGVhZGVyc19jb21wbGV0ZQAEA2VudhV3YXNtX29uX21lc3NhZ2VfYmVnaW4AAANlbnYLd2FzbV9vbl91cmwAAQNlbnYOd2FzbV9vbl9zdGF0dXMAAQNlbnYUd2FzbV9vbl9oZWFkZXJfZmllbGQAAQNlbnYUd2FzbV9vbl9oZWFkZXJfdmFsdWUAAQNlbnYMd2FzbV9vbl9ib2R5AAEDZW52GHdhc21fb25fbWVzc2FnZV9jb21wbGV0ZQAAAzQzBQYAAAMAAAAAAAADAQMAAwMDAAACAAAAAAICAgICAgICAgIBAQEBAQEBAQEDAAADAAAABAUBcAESEgUDAQACBggBfwFBgNgECwfFBygGbWVtb3J5AgALX2luaXRpYWxpemUACBlfX2luZGlyZWN0X2Z1bmN0aW9uX3RhYmxlAQALbGxodHRwX2luaXQACRhsbGh0dHBfc2hvdWxkX2tlZXBfYWxpdmUANgxsbGh0dHBfYWxsb2MACwZtYWxsb2MAOAtsbGh0dHBfZnJlZQAMBGZyZWUADA9sbGh0dHBfZ2V0X3R5cGUADRVsbGh0dHBfZ2V0X2h0dHBfbWFqb3IADhVsbGh0dHBfZ2V0X2h0dHBfbWlub3IADxFsbGh0dHBfZ2V0X21ldGhvZAAQFmxsaHR0cF9nZXRfc3RhdHVzX2NvZGUAERJsbGh0dHBfZ2V0X3VwZ3JhZGUAEgxsbGh0dHBfcmVzZXQAEw5sbGh0dHBfZXhlY3V0ZQAUFGxsaHR0cF9zZXR0aW5nc19pbml0ABUNbGxodHRwX2ZpbmlzaAAWDGxsaHR0cF9wYXVzZQAXDWxsaHR0cF9yZXN1bWUAGBtsbGh0dHBfcmVzdW1lX2FmdGVyX3VwZ3JhZGUAGRBsbGh0dHBfZ2V0X2Vycm5vABoXbGxodHRwX2dldF9lcnJvcl9yZWFzb24AGxdsbGh0dHBfc2V0X2Vycm9yX3JlYXNvbgAcFGxsaHR0cF9nZXRfZXJyb3JfcG9zAB0RbGxodHRwX2Vycm5vX25hbWUAHhJsbGh0dHBfbWV0aG9kX25hbWUAHxJsbGh0dHBfc3RhdHVzX25hbWUAIBpsbGh0dHBf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a0E+aiECCyABIAI2AhwgAUIANwIQIAJBAnRBsNYAaiEAAkBBhNQAKAIAIgNBASACdCIHcUUEQCAAIAE2AgBBhNQAIAMgB3I2AgAgASAANgIYIAEgATYCCCABIAE2AgwMAQsgBEEZIAJBAXZrQQAgAkEfRxt0IQIgACgCACEAAkADQCAAIgMoAgRBeHEgBEYNASACQR12IQAgAkEBdCECIAMgAEEEcWpBEGoiBygCACIADQALIAcgATYCACABIAM2AhggASABNgIMIAEgATYCCAwBCyADKAIIIgAgATYCDCADIAE2AgggAUEANgIYIAEgAzYCDCABIAA2AggLQaDUAEGg1AAoAgBBAWsiAEF/IAAbNgIACwsHACAALQAoCwcAIAAtACoLBwAgAC0AKwsHACAALQApCwcAIAAvATQLBwAgAC0AMAtAAQR/IAAoAhghASAALwEuIQIgAC0AKCEDIAAoAjghBCAAEDcgACAENgI4IAAgAzoAKCAAIAI7AS4gACABNgIYC8X4AQIHfwN+IAEgAmohBAJAIAAiAygCDCIADQAgAygCBARAIAMgATYCBAsjAEEQayIJJAACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAn8CQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAC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AkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAIAMCfwJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACfwJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAn8CQAJAAkACQAJAAkACQAJ/AkACQAJAAn8CQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAIAMCfwJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACfwJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQCACDtQBAAECAwQFBgcICQoLDA0ODxARFBUWFxgZGhscHR4fICEjJCUnKCmIA4cDhQOEA/wC9QLuAusC6ALmAuMC4ALfAt0C2wLWAtUC1ALTAtICygLJAsgCxwLGAsUCxALDAr0CvAK6ArkCuAK3ArYCtQK0ArICsQKsAqoCqAKnAqYCpQKkAqMCogKhAqACnwKbApoCmQKYApcCkAKIAoQCgwKCAvkB9gH1AfQB8wHyAfEB8AHvAe0B6wHoAeMB4QHgAd8B3gHdAdwB2wHaAdkB2AHX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QEBAQEBAQEBAQEBAAEALQQAhAiADQQA2AhwgA0G3CzYCECADQQI2AgwgAyABQQFqNgIUDIEDCyADQS9qIQIDQCABIARGBEBBISECDIIDCwJAAkACQCABLQAAIgBBCWsOGAIAKioBKioqKioqKioqKioqKioqKioqAigLIAFBAWohASADQS9qLQAAQQFxRQ0LDBkLIAFBAWohAQwYCyABQQFqIQEgAi0AAEECcQ0AC0EAIQIgA0EANgIcIAMgATYCFCADQc4UNgIQIANBDDYCDAyAAwsgAUEBaiEBC0EAIQACQCADKAI4IgJFDQAgAigCVCICRQ0AIAMgAhEAACEACyAADQEM0QILIANCADcDIAw8CyAAQRVGBEAgA0EkNgIcIAMgATYCFCADQYYaNgIQIANBFTYCDEEAIQIM/QILQQAhAiADQQA2AhwgAyABNgIUIANB4g02AhAgA0EUNgIMDPwCCyADKAIEIQBBACECIANBADYCBCADIAAgASAMp2oiARAxIgBFDSsgA0EHNgIcIAMgATYCFCADIAA2AgwM+wILIAMtAC5BwABxRQ0BC0EAIQACQCADKAI4IgJFDQAgAigCUCICRQ0AIAMgAhEAACEACyAARQ0rIABBFUYEQCADQQo2AhwgAyABNgIUIANB8Rg2AhAgA0EVNgIMQQAhAgz6AgtBACECIANBADYCHCADIAE2AhQgA0GLDDYCECADQRM2AgwM+QILQQAhAiADQQA2AhwgAyABNgIUIANBsRQ2AhAgA0ECNgIMDPgCC0EAIQIgA0EANgIcIAMgATYCFCADQYwUNgIQIANBGTYCDAz3AgtBACECIANBADYCHCADIAE2AhQgA0HRHDYCECADQRk2AgwM9gILIABBFUYNPUEAIQIgA0EANgIcIAMgATYCFCADQaIPNgIQIANBIjYCDAz1AgsgAygCBCEAQQAhAiADQQA2AgQgAyAAIAEQMiIARQ0oIANBDTYCHCADIAE2AhQgAyAANgIMDPQCCyAAQRVGDTpBACECIANBADYCHCADIAE2AhQgA0GiDzYCECADQSI2AgwM8wILIAMoAgQhAEEAIQIgA0EANgIEIAMgACABEDIiAEUEQCABQQFqIQEMKAsgA0EONgIcIAMgADYCDCADIAFBAWo2AhQM8gILIABBFUYNN0EAIQIgA0EANgIcIAMgATYCFCADQaIPNgIQIANBIjYCDAzxAgsgAygCBCEAQQAhAiADQQA2AgQgAyAAIAEQMiIARQRAIAFBAWohAQwnCyADQQ82AhwgAyAANgIMIAMgAUEBajYCFAzwAgtBACECIANBADYCHCADIAE2AhQgA0HoFjYCECADQRk2AgwM7wILIABBFUYNM0EAIQIgA0EANgIcIAMgATYCFCADQc4MNgIQIANBIzYCDAzuAgsgAygCBCEAQQAhAiADQQA2AgQgAyAAIAEQMyIARQ0lIANBETYCHCADIAE2AhQgAyAANgIMDO0CCyAAQRVGDTBBACECIANBADYCHCADIAE2AhQgA0HODDYCECADQSM2AgwM7AILIAMoAgQhAEEAIQIgA0EANgIEIAMgACABEDMiAEUEQCABQQFqIQEMJQsgA0ESNgIcIAMgADYCDCADIAFBAWo2AhQM6wILIANBL2otAABBAXFFDQELQRUhAgzPAgtBACECIANBADYCHCADIAE2AhQgA0HoFjYCECADQRk2AgwM6AILIABBO0cNACABQQFqIQEMDAtBACECIANBADYCHCADIAE2AhQgA0GYFzYCECADQQI2AgwM5gILIABBFUYNKEEAIQIgA0EANgIcIAMgATYCFCADQc4MNgIQIANBIzYCDAzlAgsgA0EUNgIcIAMgATYCFCADIAA2AgwM5AILIAMoAgQhAEEAIQIgA0EANgIEIAMgACABEDMiAEUEQCABQQFqIQEM3AILIANBFTYCHCADIAA2AgwgAyABQQFqNgIUDOMCCyADKAIEIQBBACECIANBADYCBCADIAAgARAzIgBFBEAgAUEBaiEBDNoCCyADQRc2AhwgAyAANgIMIAMgAUEBajYCFAziAgsgAEEVRg0jQQAhAiADQQA2AhwgAyABNgIUIANBzgw2AhAgA0EjNgIMDOECCyADKAIEIQBBACECIANBADYCBCADIAAgARAzIgBFBEAgAUEBaiEBDB0LIANBGTYCHCADIAA2AgwgAyABQQFqNgIUDOACCyADKAIEIQBBACECIANBADYCBCADIAAgARAzIgBFBEAgAUEBaiEBDNYCCyADQRo2AhwgAyAANgIMIAMgAUEBajYCFAzfAgsgAEEVRg0fQQAhAiADQQA2AhwgAyABNgIUIANBog82AhAgA0EiNgIMDN4CCyADKAIEIQBBACEC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DLMCCyABIARGBEBB6QEhAgyzAgsgAS0AAEHIAEYNASADQQE6ACgLQbYBIQIMlwILQcoBIQIMlgILIAEgBEcEQCADQQw2AgggAyABNgIEQckBIQIMlgILQegBIQIMrwILIAEgBEYEQEHnASECDK8CCyABLQAAQcgARw0EIAFBAWohAUHIASECDJQCCyABIARGBEBB5gEhAgyuAgsCQAJAIAEtAABBxQBrDhAABQUFBQUFBQUFBQUFBQUBBQsgAUEBaiEBQcYBIQIMlAILIAFBAWohAUHHASECDJMCC0HlASECIAEgBEYNrAIgAygCACIAIAQgAWtqIQUgASAAa0ECaiEGAkADQCABLQAAIABB99MAai0AAEcNAyAAQQJGDQEgAEEBaiEAIAQgAUEBaiIBRw0ACyADIAU2AgAMrQILIAMoAgQhACADQgA3AwAgAyAAIAZBAWoiARAtIgBFBEBB1AEhAgyTAgsgA0HkATYCHCADIAE2AhQgAyAANgIMQQAhAgysAgtB4wEhAiABIARGDasCIAMoAgAiACAEIAFraiEFIAEgAGtBAWohBgJAA0AgAS0AACAAQfXTAGotAABHDQIgAEEBRg0BIABBAWohACAEIAFBAWoiAUcNAAsgAyAFNgIADKwCCyADQYEEOwEoIAMoAgQhACADQgA3AwAgAyAAIAZBAWoiARAtIgANAwwCCyADQQA2AgALQQAhAiADQQA2AhwgAyABNgIUIANB0B42AhAgA0EINgIMDKkCC0HFASECDI4CCyADQeIBNgIcIAMgATYCFCADIAA2AgxBACECDKcCC0EAIQACQCADKAI4IgJFDQAgAigCOCICRQ0AIAMgAhEAACEACyAARQ1lIABBFUcEQCADQQA2AhwgAyABNgIUIANB1A42AhAgA0EgNgIMQQAhAgynAgsgA0GFATYCHCADIAE2AhQgA0HXGjYCECADQRU2AgxBACECDKYCC0HhASECIAQgASIARg2lAiAEIAFrIAMoAgAiAWohBSAAIAFrQQRqIQYCQANAIAAtAAAgAUHw0wBqLQAARw0BIAFBBEYNAyABQQFqIQEgBCAAQQFqIgBHDQALIAMgBTYCAAymAgsgA0EANgIcIAMgADYCFCADQYQ3NgIQIANBCDYCDCADQQA2AgBBACECDKUCCyABIARHBEAgA0ENNgIIIAMgATYCBEHCASECDIsCC0HgASECDKQCCyADQQA2AgAgBkEBaiEBC0HDASECDIgCCyABIARGBEBB3wEhAgyiAgsgAS0AAEEwayIAQf8BcUEKSQRAIAMgADoAKiABQQFqIQFBwQEhAgyIAgsgAygCBCEAIANBADYCBCADIAAgARAuIgBFDYgCIANB3gE2AhwgAyABNgIUIAMgADYCDEEAIQIMoQILIAEgBEYEQEHdASECDKECCwJAIAEtAABBLkYEQCABQQFqIQEMAQsgAygCBCEAIANBADYCBCADIAAgARAuIgBFDYkCIANB3AE2AhwgAyABNgIUIAMgADYCDEEAIQIMoQILQcABIQIMhgILIAEgBEYEQEHbASECDKACC0EAIQBBASEFQQEhB0EAIQICQAJAAkACQAJAAn8CQAJAAkACQAJAAkACQCABLQAAQTBrDgoKCQABAgMEBQYICwtBAgwGC0EDDAULQQQMBAtBBQwDC0EGDAILQQcMAQtBCAshAkEAIQVBACEHDAILQQkhAkEBIQBBACEFQQAhBwwBC0EAIQVBASECCyADIAI6ACsgAUEBaiEBAkACQCADLQAuQRBxDQACQAJAAkAgAy0AKg4DAQACBAsgB0UNAwwCCyAADQEMAgsgBUUNAQsgAygCBCEAIANBADYCBCADIAAgARAuIgBFDQIgA0HYATYCHCADIAE2AhQgAyAANgIMQQAhAgyiAgsgAygCBCEAIANBADYCBCADIAAgARAuIgBFDYsCIANB2QE2AhwgAyABNgIUIAMgADYCDEEAIQIMoQILIAMoAgQhACADQQA2AgQgAyAAIAEQLiIARQ2JAiADQdoBNgIcIAMgATYCFCADIAA2AgwMoAILQb8BIQIMhQILQQAhAAJAIAMoAjgiAkUNACACKAI8IgJFDQAgAyACEQAAIQALAkAgAARAIABBFUYNASADQQA2AhwgAyABNgIUIANBnA02AhAgA0EhNgIMQQAhAgygAgtBvgEhAgyFAgsgA0HXATYCHCADIAE2AhQgA0HWGTYCECADQRU2AgxBACECDJ4CCyABIARGBEBB1wEhAgyeAgsCQCABLQAAQSBGBEAgA0EAOwE0IAFBAWohAQwBCyADQQA2AhwgAyABNgIUIANB6xA2AhAgA0EJNgIMQQAhAgyeAgtBvQEhAgyDAgsgASAERgRAQdYBIQIM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LgsgAUEBaiEBQZcBIQIM2AELIAFBAWohAUEiDCsLIAEgBEYEQEGvASECDPEBCyABLQAAQdAARw0rIAFBAWohAUGWASECDNYBCyABIARGBEBBrgEhAgzwAQsCQAJAIAEtAABBxgBrDgsALCwsLCwsLCwsASwLIAFBAWohAUGUASECDNYBCyABQQFqIQFBlQEhAgzVAQtBrQEhAiABIARGDe4BIAMoAgAiACAEIAFraiEFIAEgAGtBA2ohBgJAA0AgAS0AACAAQazTAGotAABHDSggAEEDRg0BIABBAWohACAEIAFBAWoiAUcNAAsgAyAFNgIADO8BCyADQQA2AgAgBkEBaiEBQQ0MKAtBrAEhAiABIARGDe0BIAMoAgAiACAEIAFraiEFIAEgAGtBAmohBgJAA0AgAS0AACAAQeHTAGotAABHDScgAEECRg0BIABBAWohACAEIAFBAWoiAUcNAAsgAyAFNgIADO4BCyADQQA2AgAgBkEBaiEBQQwMJwtBqwEhAiABIARGDewBIAMoAgAiACAEIAFraiEFIAEgAGtBAWohBgJAA0AgAS0AACAAQarTAGotAABHDSYgAEEBRg0BIABBAWohACAEIAFBAWoiAUcNAAsgAyAFNgIADO0BCyADQQA2AgAgBkEBaiEBQQMMJgtBqgEhAiABIARGDesBIAMoAgAiACAEIAFraiEFIAEgAGtBAWohBgJAA0AgAS0AACAAQajTAGotAABHDSUgAEEBRg0BIABBAWohACAEIAFBAWoiAUcNAAsgAyAFNgIADOwBCyADQQA2AgAgBkEBaiEBQSYMJQsgASAERgRAQakBIQIM6wELAkACQCABLQAAQdQAaw4CAAEnCyABQQFqIQFBjwEhAgzRAQsgAUEBaiEBQZABIQIM0AELQagBIQIgASAERg3pASADKAIAIgAgBCABa2ohBSABIABrQQFqIQYCQANAIAEtAAAgAEGm0wBqLQAARw0jIABBAUYNASAAQQFqIQAgBCABQQFqIgFHDQALIAMgBTYCAAzqAQsgA0EANgIAIAZBAWohAUEnDCMLQacBIQIgASAERg3oASADKAIAIgAgBCABa2ohBSABIABrQQFqIQYCQANAIAEtAAAgAEGk0wBqLQAARw0iIABBAUYNASAAQQFqIQAgBCABQQFqIgFHDQALIAMgBTYCAAzpAQsgA0EANgIAIAZBAWohAUEcDCILQaYBIQIgASAERg3nASADKAIAIgAgBCABa2ohBSABIABrQQVqIQYCQANAIAEtAAAgAEGe0wBqLQAARw0hIABBBUYNASAAQQFqIQAgBCABQQFqIgFHDQALIAMgBTYCAAzoAQsgA0EANgIAIAZBAWohAUEGDCELQaUBIQIgASAERg3mASADKAIAIgAgBCABa2ohBSABIABrQQRqIQYCQANAIAEtAAAgAEGZ0wBqLQAARw0gIABBBEYNASAAQQFqIQAgBCABQQFqIgFHDQALIAMgBTYCAAznAQsgA0EANgIAIAZBAWohAUEZDCALIAEgBEYEQEGkASECDOYBCwJAAkACQAJAIAEtAABBLWsOIwAkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJAEkJCQkJAIkJCQDJAsgAUEBaiEBQYQBIQIMzgELIAFBAWohAUGFASECDM0BCyABQQFqIQFBigEhAgzMAQsgAUEBaiEBQYsBIQIMywELQaMBIQIgASAERg3kASADKAIAIgAgBCABa2ohBSABIABrQQFqIQYCQANAIAEtAAAgAEGX0wBqLQAARw0eIABBAUYNASAAQQFqIQAgBCABQQFqIgFHDQALIAMgBTYCAAzlAQsgA0EANgIAIAZBAWohAUELDB4LIAEgBEYEQEGiASECDOQBCwJAAkAgAS0AAEHBAGsOAwAgASALIAFBAWohAUGGASECDMoBCyABQQFqIQFBiQEhAgzJAQsgASAERgRAQaEBIQIM4wELAkACQCABLQAAQcEAaw4PAB8fHx8fHx8fHx8fHx8BHwsgAUEBaiEBQYcBIQIMyQELIAFBAWohAUGIASECDMgBCyABIARGBEBBoAEhAgziAQsgAS0AAEHMAEcNHCABQQFqIQFBCgwbC0GfASECIAEgBEYN4AEgAygCACIAIAQgAWtqIQUgASAAa0EFaiEGAkADQCABLQAAIABBkdMAai0AAEcNGiAAQQVGDQEgAEEBaiEAIAQgAUEBaiIBRw0ACyADIAU2AgAM4QELIANBADYCACAGQQFqIQFBHgwaC0GeASECIAEgBEYN3wEgAygCACIAIAQgAWtqIQUgASAAa0EGaiEGAkADQCABLQAAIABBitMAai0AAEcNGSAAQQZGDQEgAEEBaiEAIAQgAUEBaiIBRw0ACyADIAU2AgAM4AELIANBADYCACAGQQFqIQFBFQwZC0GdASECIAEgBEYN3gEgAygCACIAIAQgAWtqIQUgASAAa0ECaiEGAkADQCABLQAAIABBh9MAai0AAEcNGCAAQQJGDQEgAEEBaiEAIAQgAUEBaiIBRw0ACyADIAU2AgAM3wELIANBADYCACAGQQFqIQFBFwwYC0GcASECIAEgBEYN3QEgAygCACIAIAQgAWtqIQUgASAAa0EFaiEGAkADQCABLQAAIABBgdMAai0AAEcNFyAAQQVGDQEgAEEBaiEAIAQgAUEBaiIBRw0ACyADIAU2AgAM3gELIANBADYCACAGQQFqIQFBGAwXCyABIARGBEBBmwEhAgzdAQsCQAJAIAEtAABByQBrDgcAGRkZGRkBGQsgAUEBaiEBQYEBIQIMwwELIAFBAWohAUGCASECDMIBC0GaASECIAEgBEYN2wEgAygCACIAIAQgAWtqIQUgASAAa0EBaiEGAkADQCABLQAAIABB5tMAai0AAEcNFSAAQQFGDQEgAEEBaiEAIAQgAUEBaiIBRw0ACyADIAU2AgAM3AELIANBADYCACAGQQFqIQFBCQwVC0GZASECIAEgBEYN2gEgAygCACIAIAQgAWtqIQUgASAAa0EBaiEGAkADQCABLQAAIABB5NMAai0AAEcNFCAAQQFGDQEgAEEBaiEAIAQgAUEBaiIBRw0ACyADIAU2AgAM2wELIANBADYCACAGQQFqIQFBHwwUC0GYASECIAEgBEYN2QEgAygCACIAIAQgAWtqIQUgASAAa0ECaiEGAkADQCABLQAAIABB/tIAai0AAEcNEyAAQQJGDQEgAEEBaiEAIAQgAUEBaiIBRw0ACyADIAU2AgAM2gELIANBADYCACAGQQFqIQFBAgwTC0GXASECIAEgBEYN2AEgAygCACIAIAQgAWtqIQUgASAAa0EBaiEGA0AgAS0AACAAQfzSAGotAABHDREgAEEBRg0CIABBAWohACAEIAFBAWoiAUcNAAsgAyAFNgIADNgBCyABIARGBEBBlgEhAgzYAQtBASABLQAAQd8ARw0RGiABQQFqIQFB/QAhAgy9AQsgA0EANgIAIAZBAWohAUH+ACECDLwBC0GVASECIAEgBEYN1QEgAygCACIAIAQgAWtqIQUgASAAa0EIaiEGAkADQCABLQAAIABBxNMAai0AAEcNDyAAQQhGDQEgAEEBaiEAIAQgAUEBaiIBRw0ACyADIAU2AgAM1gELIANBADYCACAGQQFqIQFBKQwPC0GUASECIAEgBEYN1AEgAygCACIAIAQgAWtqIQUgASAAa0EDaiEGAkADQCABLQAAIABB+NIAai0AAEcNDiAAQQNGDQEgAEEBaiEAIAQgAUEBaiIBRw0ACyADIAU2AgAM1QELIANBADYCACAGQQFqIQFBLQwOCyABIARGBEBBkwEhAgzUAQsgAS0AAEHFAEcNDiABQQFqIQFB+gAhAgy5AQsgASAERgRAQZIBIQIM0wELAkACQCABLQAAQcwAaw4IAA8PDw8PDwEPCyABQQFqIQFB+AAhAgy5AQsgAUEBaiEBQfkAIQIMuAELQZEBIQIgASAERg3RASADKAIAIgAgBCABa2ohBSABIABrQQRqIQYCQANAIAEtAAAgAEHz0gBqLQAARw0LIABBBEYNASAAQQFqIQAgBCABQQFqIgFHDQALIAMgBTYCAAzSAQsgA0EANgIAIAZBAWohAUEjDAsLQZABIQIgASAERg3QASADKAIAIgAgBCABa2ohBSABIABrQQJqIQYCQANAIAEtAAAgAEHw0gBqLQAARw0KIABBAkYNASAAQQFqIQAgBCABQQFqIgFHDQALIAMgBTYCAAzRAQsgA0EANgIAIAZBAWohAUEADAoLIAEgBEYEQEGPASECDNABCwJAAkAgAS0AAEHIAGsOCAAMDAwMDAwBDAsgAUEBaiEBQfMAIQIMtgELIAFBAWohAUH2ACECDLUBCyABIARGBEBBjgEhAgzPAQsCQAJAIAEtAABBzgBrDgMACwELCyABQQFqIQFB9AAhAgy1AQsgAUEBaiEBQfUAIQIMtAELIAEgBEYEQEGNASECDM4BCyABLQAAQdkARw0IIAFBAWohAUEIDAcLQYwBIQIgASAERg3MASADKAIAIgAgBCABa2ohBSABIABrQQNqIQYCQANAIAEtAAAgAEHs0gBqLQAARw0GIABBA0YNASAAQQFqIQAgBCABQQFqIgFHDQALIAMgBTYCAAzNAQsgA0EANgIAIAZBAWohAUEFDAYLQYsBIQIgASAERg3LASADKAIAIgAgBCABa2ohBSABIABrQQVqIQYCQANAIAEtAAAgAEHm0gBqLQAARw0FIABBBUYNASAAQQFqIQAgBCABQQFqIgFHDQALIAMgBTYCAAzMAQsgA0EANgIAIAZBAWohAUEWDAULQYoBIQIgASAERg3KASADKAIAIgAgBCABa2ohBSABIABrQQJqIQYCQANAIAEtAAAgAEHh0wBqLQAARw0EIABBAkYNASAAQQFqIQAgBCABQQFqIgFHDQALIAMgBTYCAAzLAQsgA0EANgIAIAZBAWohAUEQDAQLIAEgBEYEQEGJASECDMoBCwJAAkAgAS0AAEHDAGsODAAGBgYGBgYGBgYGAQYLIAFBAWohAUHvACECDLABCyABQQFqIQFB8AAhAgyvAQtBiAEhAiABIARGDcgBIAMoAgAiACAEIAFraiEFIAEgAGtBBWohBgJAA0AgAS0AACAAQeDSAGotAABHDQIgAEEFRg0BIABBAWohACAEIAFBAWoiAUcNAAsgAyAFNgIADMkBCyADQQA2AgAgBkEBaiEBQSQMAgsgA0EANgIADAILIAEgBEYEQEGHASECDMcBCyABLQAAQcwARw0BIAFBAWohAUETCzoAKSADKAIEIQAgA0EANgIEIAMgACABEC0iAA0CDAELQQAhAiADQQA2AhwgAyABNgIUIANB6R42AhAgA0EGNgIMDMQBC0HuACECDKkBCyADQYYBNgIcIAMgATYCFCADIAA2AgxBACECDMIBC0EAIQACQCADKAI4IgJFDQAgAigCOCICRQ0AIAMgAhEAACEACyAARQ0AIABBFUYNASADQQA2AhwgAyABNgIUIANB1A42AhAgA0EgNgIMQQAhAgzBAQtB7QAhAgymAQsgA0GFATYCHCADIAE2AhQgA0HXGjYCECADQRU2AgxBACECDL8BCyABIARGBEBBhQEhAgy/AQsCQCABLQAAQSBGBEAgAUEBaiEBDAELIANBADYCHCADIAE2AhQgA0GGHjYCECADQQY2AgxBACECDL8BC0ECIQIMpAELA0AgAS0AAEEgRw0CIAQgAUEBaiIBRw0AC0GEASECDL0BCyABIARGBEBBgwEhAgy9AQsCQCABLQAAQQlrDgRAAABAAAtB6wAhAgyiAQsgAy0AKUEFRgRAQewAIQIMogELQeoAIQIMoQELIAEgBEYEQEGCASECDLsBCyADQQ82AgggAyABNgIEDAoLIAEgBEYEQEGBASECDLoBCwJAIAEtAABBCWsOBD0AAD0AC0HpACECDJ8BCyABIARHBEAgA0EPNgIIIAMgATYCBEHnACECDJ8BC0GAASECDLgBCwJAIAEgBEcEQANAIAEtAABB4M4Aai0AACIAQQNHBEACQCAAQQFrDgI/AAQLQeYAIQIMoQELIAQgAUEBaiIBRw0AC0H+ACECDLkBC0H+ACECDLgBCyADQQA2AhwgAyABNgIUIANBxh82AhAgA0EHNgIMQQAhAgy3AQsgASAERgRAQf8AIQIMtwELAkACQAJAIAEtAABB4NAAai0AAEEBaw4DPAIAAQtB6AAhAgyeAQsgA0EANgIcIAMgATYCFCADQYYSNgIQIANBBzYCDEEAIQIMtwELQeAAIQIMnAELIAEgBEcEQCABQQFqIQFB5QAhAgycAQtB/QAhAgy1AQsgBCABIgBGBEBB/AAhAgy1AQsgAC0AACIBQS9GBEAgAEEBaiEBQeQAIQIMmwELIAFBCWsiAkEXSw0BIAAhAUEBIAJ0QZuAgARxDTcMAQsgBCABIgBGBEBB+wAhAgy0AQsgAC0AAEEvRw0AIABBAWohAQwDC0EAIQIgA0EANgIcIAMgADYCFCADQcYfNgIQIANBBzYCDAyyAQsCQAJAAkACQAJAA0AgAS0AAEHgzABqLQAAIgBBBUcEQAJAAkAgAEEBaw4IPQUGBwgABAEIC0HhACECDJ8BCyABQQFqIQFB4wAhAgyeAQsgBCABQQFqIgFHDQALQfoAIQIMtgELIAFBAWoMFAsgAygCBCEAIANBADYCBCADIAAgARArIgBFDR4gA0HbADYCHCADIAE2AhQgAyAANgIMQQAhAgy0AQsgAygCBCEAIANBADYCBCADIAAgARArIgBFDR4gA0HdADYCHCADIAE2AhQgAyAANgIMQQAhAgyzAQsgAygCBCEAIANBADYCBCADIAAgARArIgBFDR4gA0HwADYCHCADIAE2AhQgAyAANgIMQQAhAgyyAQsgA0EANgIcIAMgATYCFCADQcsPNgIQIANBBzYCDEEAIQIMsQELIAEgBEYEQEH5ACECDLEBCwJAIAEtAABB4MwAai0AAEEBaw4INAQFBgAIAgMHCyABQQFqIQELQQMhAgyVAQsgAUEBagwNC0EAIQIgA0EANgIcIANBoxI2AhAgA0EHNgIMIAMgAUEBajYCFAytAQsgAygCBCEAIANBADYCBCADIAAgARArIgBFDRYgA0HbADYCHCADIAE2AhQgAyAANgIMQQAhAgysAQsgAygCBCEAIANBADYCBCADIAAgARArIgBFDRYgA0HdADYCHCADIAE2AhQgAyAANgIMQQAhAgyrAQsgAygCBCEAIANBADYCBCADIAAgARArIgBFDRYgA0HwADYCHCADIAE2AhQgAyAANgIMQQAhAgyqAQsgA0EANgIcIAMgATYCFCADQcsPNgIQIANBBzYCDEEAIQIMqQELQeIAIQIMjgELIAEgBEYEQEH4ACECDKgBCyABQQFqDAILIAEgBEYEQEH3ACECDKcBCyABQQFqDAELIAEgBEYNASABQQFqCyEBQQQhAgyKAQtB9gAhAgyjAQsDQCABLQAAQeDKAGotAAAiAEECRwRAIABBAUcEQEHfACECDIsBCwwnCyAEIAFBAWoiAUcNAAtB9QAhAgyiAQsgASAERgRAQfQAIQIMogELAkAgAS0AAEEJaw43JQMGJQQGBgYGBgYGBgYGBgYGBgYGBgYFBgYCBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGAAYLIAFBAWoLIQFBBSECDIYBCyABQQFqDAYLIAMoAgQhACADQQA2AgQgAyAAIAEQKyIARQ0IIANB2wA2AhwgAyABNgIUIAMgADYCDEEAIQIMngELIAMoAgQhACADQQA2AgQgAyAAIAEQKyIARQ0IIANB3QA2AhwgAyABNgIUIAMgADYCDEEAIQIMnQELIAMoAgQhACADQQA2AgQgAyAAIAEQKyIARQ0IIANB8AA2AhwgAyABNgIUIAMgADYCDEEAIQIMnAELIANBADYCHCADIAE2AhQgA0G8EzYCECADQQc2AgxBACECDJsBCwJAAkACQAJAA0AgAS0AAEHgyABqLQAAIgBBBUcEQAJAIABBAWsOBiQDBAUGAAYLQd4AIQIMhgELIAQgAUEBaiIBRw0AC0HzACECDJ4BCyADKAIEIQAgA0EANgIEIAMgACABECsiAEUNByADQdsANgIcIAMgATYCFCADIAA2AgxBACECDJ0BCyADKAIEIQAgA0EANgIEIAMgACABECsiAEUNByADQd0ANgIcIAMgATYCFCADIAA2AgxBACECDJwBCyADKAIEIQAgA0EANgIEIAMgACABECsiAEUNByADQfAANgIcIAMgATYCFCADIAA2AgxBACECDJsBCyADQQA2AhwgAyABNgIUIANB3Ag2AhAgA0EHNgIMQQAhAgyaAQsgASAERg0BIAFBAWoLIQFBBiECDH4LQfIAIQIMlwELAkACQAJAAkADQCABLQAAQeDGAGotAAAiAEEFRwRAIABBAWsOBB8CAwQFCyAEIAFBAWoiAUcNAAtB8QAhAgyaAQsgAygCBCEAIANBADYCBCADIAAgARArIgBFDQMgA0HbADYCHCADIAE2AhQgAyAANgIMQQAhAgyZAQsgAygCBCEAIANBADYCBCADIAAgARArIgBFDQMgA0HdADYCHCADIAE2AhQgAyAANgIMQQAhAgyYAQsgAygCBCEAIANBADYCBCADIAAgARArIgBFDQMgA0HwADYCHCADIAE2AhQgAyAANgIMQQAhAgyXAQsgA0EANgIcIAMgATYCFCADQbQKNgIQIANBBzYCDEEAIQIMlgELQc4AIQIMewtB0AAhAgx6C0HdACECDHkLIAEgBEYEQEHwACECDJMBCwJAIAEtAABBCWsOBBYAABYACyABQQFqIQFB3AAhAgx4CyABIARGBEBB7wAhAgySAQsCQCABLQAAQQlrDgQVAAAVAAtBACEAAkAgAygCOCICRQ0AIAIoAjAiAkUNACADIAIRAAAhAAsgAEUEQEHTASECDHgLIABBFUcEQCADQQA2AhwgAyABNgIUIANBwQ02AhAgA0EaNgIMQQAhAgySAQsgA0HuADYCHCADIAE2AhQgA0HwGTYCECADQRU2AgxBACECDJEBC0HtACECIAEgBEYNkAEgAygCACIAIAQgAWtqIQUgASAAa0EDaiEGAkADQCABLQAAIABB18YAai0AAEcNBCAAQQNGDQEgAEEBaiEAIAQgAUEBaiIBRw0ACyADIAU2AgAMkQELIANBADYCACAGQQFqIQEgAy0AKSIAQSNrQQtJDQQCQCAAQQZLDQBBASAAdEHKAHFFDQAMBQtBACECIANBADYCHCADIAE2AhQgA0HlCTYCECADQQg2AgwMkAELQewAIQIgASAERg2PASADKAIAIgAgBCABa2ohBSABIABrQQJqIQYCQANAIAEtAAAgAEHUxgBqLQAARw0DIABBAkYNASAAQQFqIQAgBCABQQFqIgFHDQALIAMgBTYCAAyQAQsgA0EANgIAIAZBAWohASADLQApQSFGDQMgA0EANgIcIAMgATYCFCADQYkKNgIQIANBCDYCDEEAIQIMjwELQesAIQIgASAERg2OASADKAIAIgAgBCABa2ohBSABIABrQQNqIQYCQANAIAEtAAAgAEHQxgBqLQAARw0CIABBA0YNASAAQQFqIQAgBCABQQFqIgFHDQALIAMgBTYCAAyPAQsgA0EANgIAIAZBAWohASADLQApIgBBI0kNAiAAQS5GDQIgA0EANgIcIAMgATYCFCADQcEJNgIQIANBCDYCDEEAIQIMjgELIANBADYCAAtBACECIANBADYCHCADIAE2AhQgA0GENzYCECADQQg2AgwMjAELQdgAIQIMcQsgASAERwRAIANBDTYCCCADIAE2AgRB1wAhAgxxC0HqACECDIoBCyABIARGBEBB6QAhAgyKAQsgAS0AAEEwayIAQf8BcUEKSQRAIAMgADoAKiABQQFqIQFB1gAhAgxwCyADKAIEIQAgA0EANgIEIAMgACABEC4iAEUNdCADQegANgIcIAMgATYCFCADIAA2AgxBACECDIkBCyABIARGBEBB5wAhAgyJAQsCQCABLQAAQS5GBEAgAUEBaiEBDAELIAMoAgQhACADQQA2AgQgAyAAIAEQLiIARQ11IANB5gA2AhwgAyABNgIUIAMgADYCDEEAIQIMiQELQdUAIQIMbgsgASAERgRAQeUAIQIMiAELQQAhAEEBIQVBASEHQQAhAgJAAkACQAJAAkACfwJAAkACQAJAAkACQAJAIAEtAABBMGsOCgoJAAECAwQFBggLC0ECDAYLQQMMBQtBBAwEC0EFDAMLQQYMAgtBBwwBC0EICyECQQAhBUEAIQcMAgtBCSECQQEhAEEAIQVBACEHDAELQQAhBUEBIQILIAMgAjoAKyABQQFqIQECQAJAIAMtAC5BEHENAAJAAkACQCADLQAqDgMBAAIECyAHRQ0DDAILIAANAQwCCyAFRQ0BCyADKAIEIQAgA0EANgIEIAMgACABEC4iAEUNAiADQeIANgIcIAMgATYCFCADIAA2AgxBACECDIoBCyADKAIEIQAgA0EANgIEIAMgACABEC4iAEUNdyADQeMANgIcIAMgATYCFCADIAA2AgxBACECDIkBCyADKAIEIQAgA0EANgIEIAMgACABEC4iAEUNdSADQeQANgIcIAMgATYCFCADIAA2AgwMiAELQdMAIQIMbQsgAy0AKUEiRg2AAUHSACECDGwLQQAhAAJAIAMoAjgiAkUNACACKAI8IgJFDQAgAyACEQAAIQALIABFBEBB1AAhAgxsCyAAQRVHBEAgA0EANgIcIAMgATYCFCADQZwNNgIQIANBITYCDEEAIQIMhgELIANB4QA2AhwgAyABNgIUIANB1hk2AhAgA0EVNgIMQQAhAgyFAQsgASAERgRAQeAAIQIMhQELAkACQAJAAkACQCABLQAAQQprDgQBBAQABAsgAUEBaiEBDAELIAFBAWohASADQS9qLQAAQQFxRQ0BC0HRACECDGwLIANBADYCHCADIAE2AhQgA0GIETYCECADQQk2AgxBACECDIUBCyADQQA2AhwgAyABNgIUIANBiBE2AhAgA0EJNgIMQQAhAgyEAQsgASAERgRAQd8AIQIMhAELIAEtAABBCkYEQCABQQFqIQEMCQsgAy0ALkHAAHENCCADQQA2AhwgAyABNgIUIANBiBE2AhAgA0ECNgIMQQAhAgyDAQsgASAERgRAQd0AIQIMgwELIAEtAAAiAkENRgRAIAFBAWohAUHPACECDGkLIAEhACACQQlrDgQFAQEFAQsgBCABIgBGBEBB3AAhAgyCAQsgAC0AAEEKRw0AIABBAWoMAgtBACECIANBADYCHCADIAA2AhQgA0G1LDYCECADQQc2AgwMgAELIAEgBEYEQEHbACECDIABCwJAIAEtAABBCWsOBAMAAAMACyABQQFqCyEBQc0AIQIMZAsgASAERgRAQdoAIQIMfgsgAS0AAEEJaw4EAAEBAAELQQAhAiADQQA2AhwgA0HsETYCECADQQc2AgwgAyABQQFqNgIUDHwLIANBgBI7ASpBACEAAkAgAygCOCICRQ0AIAIoAjAiAkUNACADIAIRAAAhAAsgAEUNACAAQRVHDQEgA0HZADYCHCADIAE2AhQgA0HwGTYCECADQRU2AgxBACECDHsLQcwAIQIMYAsgA0EANgIcIAMgATYCFCADQcENNgIQIANBGjYCDEEAIQIMeQsgASAERgRAQdkAIQIMeQsgAS0AAEEgRw06IAFBAWohASADLQAuQQFxDTogA0EANgIcIAMgATYCFCADQa0bNgIQIANBHjYCDEEAIQIMeAsgASAERgRAQdgAIQIMeAsCQAJAAkACQAJAIAEtAAAiAEEKaw4EAgMDAAELIAFBAWohAUErIQIMYQsgAEE6Rw0BIANBADYCHCADIAE2AhQgA0G5ETYCECADQQo2AgxBACECDHoLIAFBAWohASADQS9qLQAAQQFxRQ1tIAMtADJBgAFxRQRAIANBMmohAiADEDRBACEAAkAgAygCOCIGRQ0AIAYoAiQiBkUNACADIAYRAAAhAAsCQAJAIAAOFkpJSAEBAQEBAQEBAQEBAQEBAQEBAQABCyADQSk2AhwgAyABNgIUIANBshg2AhAgA0EVNgIMQQAhAgx7CyADQQA2AhwgAyABNgIUIANB3Qs2AhAgA0ERNgIMQQAhAgx6C0EAIQACQCADKAI4IgJFDQAgAigCVCICRQ0AIAMgAhEAACEACyAARQ1VIABBFUcNASADQQU2AhwgAyABNgIUIANBhho2AhAgA0EVNgIMQQAhAgx5C0HKACECDF4LQQAhAiADQQA2AhwgAyABNgIUIANB4g02AhAgA0EUNgIMDHcLIAMgAy8BMkGAAXI7ATIMOAsgASAERwRAIANBEDYCCCADIAE2AgRByQAhAgxcC0HXACECDHULIAEgBEYEQEHWACECDHULAkACQAJAAkAgAS0AACIAQSByIAAgAEHBAGtB/wFxQRpJG0H/AXFB4wBrDhMAPT09PT09PT09PT09AT09PQIDPQsgAUEBaiEBQcUAIQIMXQsgAUEBaiEBQcYAIQIMXAsgAUEBaiEBQccAIQIMWwsgAUEBaiEBQcgAIQIMWgtB1QAhAiAEIAEiAEYNcyAEIAFrIAMoAgAiAWohBiAAIAFrQQVqIQcDQCABQcDGAGotAAAgAC0AACIFQSByIAUgBUHBAGtB/wFxQRpJG0H/AXFHDQhBBCABQQVGDQoaIAFBAWohASAEIABBAWoiAEcNAAsgAyAGNgIADHMLQdQAIQIgBCABIgBGDXIgBCABayADKAIAIgFqIQYgACABa0EPaiEHA0AgAUGwxgBqLQAAIAAtAAAiBUEgciAFIAVBwQBrQf8BcUEaSRtB/wFxRw0HQQMgAUEPRg0JGiABQQFqIQEgBCAAQQFqIgBHDQALIAMgBjYCAAxyC0HTACECIAQgASIARg1xIAQgAWsgAygCACIBaiEGIAAgAWtBDmohBwNAIAFBksYAai0AACAALQAAIgVBIHIgBSAFQcEAa0H/AXFBGkkbQf8BcUcNBiABQQ5GDQcgAUEBaiEBIAQgAEEBaiIARw0ACyADIAY2AgAMcQtB0gAhAiAEIAEiAEYNcCAEIAFrIAMoAgAiAWohBSAAIAFrQQFqIQYDQCABQZDGAGotAAAgAC0AACIHQSByIAcgB0HBAGtB/wFxQRpJG0H/AXFHDQUgAUEBRg0CIAFBAWohASAEIABBAWoiAEcNAAsgAyAFNgIADHALIAEgBEYEQEHRACECDHALAkACQCABLQAAIgBBIHIgACAAQcEAa0H/AXFBGkkbQf8BcUHuAGsOBwA2NjY2NgE2CyABQQFqIQFBwgAhAgxWCyABQQFqIQFBwwAhAgxVCyADQQA2AgAgBkEBaiEBQcQAIQIMVAtB0AAhAiAEIAEiAEYNbSAEIAFrIAMoAgAiAWohBiAAIAFrQQlqIQcDQCABQYbGAGotAAAgAC0AACIFQSByIAUgBUHBAGtB/wFxQRpJG0H/AXFHDQJBAiABQQlGDQQaIAFBAWohASAEIABBAWoiAEcNAAsgAyAGNgIADG0LQc8AIQIgBCABIgBGDWwgBCABayADKAIAIgFqIQYgACABa0EFaiEHA0AgAUGAxgBqLQAAIAAtAAAiBUEgciAFIAVBwQBrQf8BcUEaSRtB/wFxRw0BIAFBBUYNAiABQQFqIQEgBCAAQQFqIgBHDQALIAMgBjYCAAxsCyAAIQEgA0EANgIADDALQQELOgAsIANBADYCACAHQQFqIQELQSwhAgxOCwJAA0AgAS0AAEGAxABqLQAAQQFHDQEgBCABQQFqIgFHDQALQc0AIQIMaAtBwQAhAgxNCyABIARGBEBBzAAhAgxnCyABLQAAQTpGBEAgAygCBCEAIANBADYCBCADIAAgARAvIgBFDTAgA0HLADYCHCADIAA2AgwgAyABQQFqNgIUQQAhAgxnCyADQQA2AhwgAyABNgIUIANBuRE2AhAgA0EKNgIMQQAhAgxmCwJAAkAgAy0ALEECaw4CAAEkCyADQTNqLQAAQQJxRQ0jIAMtAC5BAnENIyADQQA2AhwgAyABNgIUIANB1RM2AhAgA0ELNgIMQQAhAgxmCyADLQAyQSBxRQ0iIAMtAC5BAnENIiADQQA2AhwgAyABNgIUIANB7BI2AhAgA0EPNgIMQQAhAgxlC0EAIQACQCADKAI4IgJFDQAgAigCQCICRQ0AIAMgAhEAACEACyAARQRAQcAAIQIMSwsgAEEVRwRAIANBADYCHCADIAE2AhQgA0H4DjYCECADQRw2AgxBACECDGULIANBygA2AhwgAyABNgIUIANB8Bo2AhAgA0EVNgIMQQAhAgxkCyABIARHBEADQCABLQAAQfA/ai0AAEEBRw0XIAQgAUEBaiIBRw0AC0HEACECDGQLQcQAIQIMYwsgASAERwRAA0ACQCABLQAAIgBBIHIgACAAQcEAa0H/AXFBGkkbQf8BcSIAQQlGDQAgAEEgRg0AAkACQAJAAkAgAEHjAGsOEwADAwMDAwMDAQMDAwMDAwMDAwIDCyABQQFqIQFBNSECDE4LIAFBAWohAUE2IQIMTQsgAUEBaiEBQTchAgxMCwwVCyAEIAFBAWoiAUcNAAtBPCECDGMLQTwhAgxiCyABIARGBEBByAAhAgxiCyADQRE2AgggAyABNgIEAkACQAJAAkACQCADLQAsQQFrDgQUAAECCQsgAy0AMkEgcQ0DQdEBIQIMSwsCQCADLwEyIgBBCHFFDQAgAy0AKEEBRw0AIAMtAC5BCHFFDQILIAMgAEH3+wNxQYAEcjsBMgwLCyADIAMvATJBEHI7ATIMBAsgA0EANgIEIAMgASABEDAiAARAIANBwQA2AhwgAyAANgIMIAMgAUEBajYCFEEAIQIMYwsgAUEBaiEBDFILIANBADYCHCADIAE2AhQgA0GjEzYCECADQQQ2AgxBACECDGELQccAIQIgASAERg1gIAMoAgAiACAEIAFraiEFIAEgAGtBBmohBgJAA0AgAEHwwwBqLQAAIAEtAABBIHJHDQEgAEEGRg1GIABBAWohACAEIAFBAWoiAUcNAAsgAyAFNgIADGELIANBADYCAAwFCwJAIAEgBEcEQANAIAEtAABB8MEAai0AACIAQQFHBEAgAEECRw0DIAFBAWohAQwFCyAEIAFBAWoiAUcNAAtBxQAhAgxhC0HFACECDGALCyADQQA6ACwMAQtBCyECDEMLQT4hAgxCCwJAAkADQCABLQAAIgBBIEcEQAJAIABBCmsOBAMFBQMACyAAQSxGDQMMBAsgBCABQQFqIgFHDQALQcYAIQIMXQsgA0EIOgAsDA4LIAMtAChBAUcNAiADLQAuQQhxDQIgAygCBCEAIANBADYCBCADIAAgARAwIgAEQCADQcIANgIcIAMgADYCDCADIAFBAWo2AhRBACECDFwLIAFBAWohAQxKC0E6IQIMQAsCQANAIAEtAAAiAEEgRyAAQQlHcQ0BIAQgAUEBaiIBRw0AC0HDACECDFoLC0E7IQIMPgsCQAJAIAEgBEcEQANAIAEtAAAiAEEgRwRAIABBCmsOBAMEBAMECyAEIAFBAWoiAUcNAAtBPyECDFoLQT8hAgxZCyADIAMvATJBIHI7ATIMCgsgAygCBCEAIANBADYCBCADIAAgARAwIgBFDUggA0E+NgIcIAMgATYCFCADIAA2AgxBACECDFcLAkAgASAERwRAA0AgAS0AAEHwwQBqLQAAIgBBAUcEQCAAQQJGDQMMDAsgBCABQQFqIgFHDQALQTchAgxYC0E3IQIMVwsgAUEBaiEBDAQLQTshAiAEIAEiAEYNVSAEIAFrIAMoAgAiAWohBiAAIAFrQQVqIQcCQANAIAFBwMYAai0AACAALQAAIgVBIHIgBSAFQcEAa0H/AXFBGkkbQf8BcUcNASABQQVGBEBBByEBDDsLIAFBAWohASAEIABBAWoiAEcNAAsgAyAGNgIADFYLIANBADYCACAAIQEMBQtBOiECIAQgASIARg1UIAQgAWsgAygCACIBaiEGIAAgAWtBCGohBwJAA0AgAUHkP2otAAAgAC0AACIFQSByIAUgBUHBAGtB/wFxQRpJG0H/AXFHDQEgAUEIRgRAQQUhAQw6CyABQQFqIQEgBCAAQQFqIgBHDQALIAMgBjYCAAxVCyADQQA2AgAgACEBDAQLQTkhAiAEIAEiAEYNUyAEIAFrIAMoAgAiAWohBiAAIAFrQQNqIQcCQANAIAFB4D9qLQAAIAAtAAAiBUEgciAFIAVBwQBrQf8BcUEaSRtB/wFxRw0BIAFBA0YEQEEGIQEMOQsgAUEBaiEBIAQgAEEBaiIARw0ACyADIAY2AgAMVAsgA0EANgIAIAAhAQwDCwJAA0AgAS0AACIAQSBHBEAgAEEKaw4EBwQEBwILIAQgAUEBaiIBRw0AC0E4IQIMUwsgAEEsRw0BIAFBAWohAEEBIQECQAJAAkACQAJAIAMtACxBBWsOBAMBAgQACyAAIQEMBAtBAiEBDAELQQQhAQsgA0EBOgAsIAMgAy8BMiABcjsBMiAAIQEMAQsgAyADLwEyQQhyOwEyIAAhAQtBPSECDDcLIANBADoALAtBOCECDDULIAEgBEYEQEE2IQIMTwsCQAJAAkACQAJAIAEtAABBCmsOBAACAgECCyADKAIEIQAgA0EANgIEIAMgACABEDAiAEUNAiADQTM2AhwgAyABNgIUIAMgADYCDEEAIQIMUgsgAygCBCEAIANBADYCBCADIAAgARAwIgBFBEAgAUEBaiEBDAYLIANBMjYCHCADIAA2AgwgAyABQQFqNgIUQQAhAgxRCyADLQAuQQFxBEBB0AEhAgw3CyADKAIEIQAgA0EANgIEIAMgACABEDAiAA0BDEMLQTMhAgw1CyADQTU2AhwgAyABNgIUIAMgADYCDEEAIQIMTgtBNCECDDMLIANBL2otAABBAXENACADQQA2AhwgAyABNgIUIANB8RU2AhAgA0EZNgIMQQAhAgxMC0EyIQIMMQsgASAERgRAQTIhAgxLCwJAIAEtAABBCkYEQCABQQFqIQEMAQsgA0EANgIcIAMgATYCFCADQZgWNgIQIANBAzYCDEEAIQIMSwtBMSECDDALIAEgBEYEQEExIQIMSgsgAS0AACIAQQlHIABBIEdxDQEgAy0ALEEIRw0AIANBADoALAtBPCECDC4LQQEhAgJAAkACQAJAIAMtACxBBWsOBAMBAgAKCyADIAMvATJBCHI7ATIMCQtBAiECDAELQQQhAgsgA0EBOgAsIAMgAy8BMiACcjsBMgwGCyABIARGBEBBMCECDEcLIAEtAABBCkYEQCABQQFqIQEMAQsgAy0ALkEBcQ0AIANBADYCHCADIAE2AhQgA0HHJzYCECADQQI2AgxBACECDEYLQS8hAgwrCyABQQFqIQFBMCECDCoLIAEgBEYEQEEvIQIMRAsgAS0AACIAQQlHIABBIEdxRQRAIAFBAWohASADLQAuQQFxDQEgA0EANgIcIAMgATYCFCADQekPNgIQIANBCjYCDEEAIQIMRAtBASECAkACQAJAAkACQAJAIAMtACxBAmsOBwUEBAMBAgAECyADIAMvATJBCHI7ATIMAwtBAiECDAELQQQhAgsgA0EBOgAsIAMgAy8BMiACcjsBMgtBLiECDCoLIANBADYCHCADIAE2AhQgA0GzEjYCECADQQs2AgxBACECDEMLQdIBIQIMKAsgASAERgRAQS4hAgxCCyADQQA2AgQgA0ERNgIIIAMgASABEDAiAA0BC0EtIQIMJgsgA0EtNgIcIAMgATYCFCADIAA2AgxBACECDD8LQQAhAAJAIAMoAjgiAkUNACACKAJEIgJFDQAgAyACEQAAIQALIABFDQAgAEEVRw0BIANB2AA2AhwgAyABNgIUIANBnho2AhAgA0EVNgIMQQAhAgw+C0HLACECDCMLIANBADYCHCADIAE2AhQgA0GFDjYCECADQR02AgxBACECDDwLIAEgBEYEQEHOACECDDwLIAEtAAAiAEEgRg0CIABBOkYNAQsgA0EAOgAsQQkhAgwgCyADKAIEIQAgA0EANgIEIAMgACABEC8iAA0BDAILIAMtAC5BAXEEQEHPASECDB8LIAMoAgQhACADQQA2AgQgAyAAIAEQLyIARQ0CIANBKjYCHCADIAA2AgwgAyABQQFqNgIUQQAhAgw4CyADQcsANgIcIAMgADYCDCADIAFBAWo2AhRBACECDDcLIAFBAWohAUE/IQIMHAsgAUEBaiEBDCkLIAEgBEYEQEErIQIMNQsCQCABLQAAQQpGBEAgAUEBaiEBDAELIAMtAC5BwABxRQ0GCyADLQAyQYABcQRAQQAhAAJAIAMoAjgiAkUNACACKAJUIgJFDQAgAyACEQAAIQALIABFDREgAEEVRgRAIANBBTYCHCADIAE2AhQgA0GGGjYCECADQRU2AgxBACECDDYLIANBADYCHCADIAE2AhQgA0HiDTYCECADQRQ2AgxBACECDDULIANBMmohAiADEDRBACEAAkAgAygCOCIGRQ0AIAYoAiQiBkUNACADIAYRAAAhAAsgAA4WAgEABAQEBAQEBAQEBAQEBAQEBAQEAwQLIANBAToAMAsgAiACLwEAQcAAcjsBAAtBKiECDBcLIANBKTYCHCADIAE2AhQgA0GyGDYCECADQRU2AgxBACECDDALIANBADYCHCADIAE2AhQgA0HdCzYCECADQRE2AgxBACECDC8LIANBADYCHCADIAE2AhQgA0GdCzYCECADQQI2AgxBACECDC4LQQEhByADLwEyIgVBCHFFBEAgAykDIEIAUiEHCwJAIAMtADAEQEEBIQAgAy0AKUEFRg0BIAVBwABxRSAHcUUNAQsCQCADLQAoIgJBAkYEQEEBIQAgAy8BNCIGQeUARg0CQQAhACAFQcAAcQ0CIAZB5ABGDQIgBkHmAGtBAkkNAiAGQcwBRg0CIAZBsAJGDQIMAQtBACEAIAVBwABxDQELQQIhACAFQQhxDQAgBUGABHEEQAJAIAJBAUcNACADLQAuQQpxDQBBBSEADAILQQQhAAwBCyAFQSBxRQRAIAMQNUEAR0ECdCEADAELQQBBAyADKQMgUBshAAsCQCAAQQFrDgUAAQYHAgMLQQAhAgJAIAMoAjgiAEUNACAAKAIsIgBFDQAgAyAAEQAAIQILIAJFDSYgAkEVRgRAIANBAzYCHCADIAE2AhQgA0G9GjYCECADQRU2AgxBACECDC4LQQAhAiADQQA2AhwgAyABNgIUIANBrw42AhAgA0ESNgIMDC0LQc4BIQIMEgtBACECIANBADYCHCADIAE2AhQgA0HkHzYCECADQQ82AgwMKwtBACEAAkAgAygCOCICRQ0AIAIoAiwiAkUNACADIAIRAAAhAAsgAA0BC0EOIQIMDwsgAEEVRgRAIANBAjYCHCADIAE2AhQgA0G9GjYCECADQRU2AgxBACECDCkLQQAhAiADQQA2AhwgAyABNgIUIANBrw42AhAgA0ESNgIMDCgLQSkhAgwNCyADQQE6ADEMJAsgASAERwRAIANBCTYCCCADIAE2AgRBKCECDAwLQSYhAgwlCyADIAMpAyAiDCAEIAFrrSIKfSILQgAgCyAMWBs3AyAgCiAMVARAQSUhAgwlCyADKAIEIQBBACECIANBADYCBCADIAAgASAMp2oiARAxIgBFDQAgA0EFNgIcIAMgATYCFCADIAA2AgwMJAtBDyECDAkLIAEgBEYEQEEjIQIMIwtCACEKAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAIAEtAABBMGsONxcWAAECAwQFBgcUFBQUFBQUCAkKCwwNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQODxAREhMUC0ICIQoMFgtCAyEKDBULQgQhCgwUC0IFIQoMEwtCBiEKDBILQgchCgwRC0IIIQoMEAtCCSEKDA8LQgohCgwOC0ILIQoMDQtCDCEKDAwLQg0hCgwLC0IOIQoMCgtCDyEKDAkLQgohCgwIC0ILIQoMBwtCDCEKDAYLQg0hCgwFC0IOIQoMBAtCDyEKDAMLQQAhAiADQQA2AhwgAyABNgIUIANBzhQ2AhAgA0EMNgIMDCILIAEgBEYEQEEiIQIMIgtCACEKAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQCABLQAAQTBrDjcVFAABAgMEBQYHFhYWFhYWFggJCgsMDRYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWDg8QERITFgtCAiEKDBQLQgMhCgwTC0IEIQoMEgtCBSEKDBELQgYhCgwQC0IHIQoMDwtCCCEKDA4LQgkhCgwNC0IKIQoMDAtCCyEKDAsLQgwhCgwKC0INIQoMCQtCDiEKDAgLQg8hCgwHC0IKIQoMBgtCCyEKDAULQgwhCgwEC0INIQoMAwtCDiEKDAILQg8hCgwBC0IBIQoLIAFBAWohASADKQMgIgtC//////////8PWARAIAMgC0IEhiAKhDcDIAwCC0EAIQIgA0EANgIcIAMgATYCFCADQa0JNgIQIANBDDYCDAwfC0ElIQIMBAtBJiECDAMLIAMgAToALCADQQA2AgAgB0EBaiEBQQwhAgwCCyADQQA2AgAgBkEBaiEBQQohAgwBCyABQQFqIQFBCCECDAALAAtBACECIANBADYCHCADIAE2AhQgA0HVEDYCECADQQk2AgwMGAtBACECIANBADYCHCADIAE2AhQgA0HXCjYCECADQQk2AgwMFwtBACECIANBADYCHCADIAE2AhQgA0G/EDYCECADQQk2AgwMFgtBACECIANBADYCHCADIAE2AhQgA0GkETYCECADQQk2AgwMFQtBACECIANBADYCHCADIAE2AhQgA0HVEDYCECADQQk2AgwMFAtBACECIANBADYCHCADIAE2AhQgA0HXCjYCECADQQk2AgwMEwtBACECIANBADYCHCADIAE2AhQgA0G/EDYCECADQQk2AgwMEgtBACECIANBADYCHCADIAE2AhQgA0GkETYCECADQQk2AgwMEQtBACECIANBADYCHCADIAE2AhQgA0G/FjYCECADQQ82AgwMEAtBACECIANBADYCHCADIAE2AhQgA0G/FjYCECADQQ82AgwMDwtBACECIANBADYCHCADIAE2AhQgA0HIEjYCECADQQs2AgwMDgtBACECIANBADYCHCADIAE2AhQgA0GVCTYCECADQQs2AgwMDQtBACECIANBADYCHCADIAE2AhQgA0HpDzYCECADQQo2AgwMDAtBACECIANBADYCHCADIAE2AhQgA0GDEDYCECADQQo2AgwMCwtBACECIANBADYCHCADIAE2AhQgA0GmHDYCECADQQI2AgwMCgtBACECIANBADYCHCADIAE2AhQgA0HFFTYCECADQQI2AgwMCQtBACECIANBADYCHCADIAE2AhQgA0H/FzYCECADQQI2AgwMCAtBACECIANBADYCHCADIAE2AhQgA0HKFzYCECADQQI2AgwMBwsgA0ECNgIcIAMgATYCFCADQZQdNgIQIANBFjYCDEEAIQIMBgtB3gAhAiABIARGDQUgCUEIaiEHIAMoAgAhBQJAAkAgASAERwRAIAVBxsYAaiEIIAQgBWogAWshBiAFQX9zQQpqIgUgAWohAANAIAEtAAAgCC0AAEcEQEECIQgMAwsgBUUEQEEAIQggACEBDAMLIAVBAWshBSAIQQFqIQggBCABQQFqIgFHDQALIAYhBSAEIQELIAdBATYCACADIAU2AgAMAQsgA0EANgIAIAcgCDYCAAsgByABNgIEIAkoAgwhACAJKAIIDgMBBQIACwALIANBADYCHCADQa0dNgIQIANBFzYCDCADIABBAWo2AhRBACECDAMLIANBADYCHCADIAA2AhQgA0HCHTYCECADQQk2AgxBACECDAILIAEgBEYEQEEoIQIMAgsgA0EJNgIIIAMgATYCBEEnIQIMAQsgASAERgRAQQEhAgwBCwNAAkACQAJAIAEtAABBCmsOBAABAQABCyABQQFqIQEMAQsgAUEBaiEBIAMtAC5BIHENAEEAIQIgA0EANgIcIAMgATYCFCADQYwgNgIQIANBBTYCDAwCC0EBIQIgASAERw0ACwsgCUEQaiQAIAJFBEAgAygCDCEADAELIAMgAjYCHEEAIQAgAygCBCIBRQ0AIAMgASAEIAMoAggRAQAiAUUNACADIAQ2AhQgAyABNgIMIAEhAAsgAAu+AgECfyAAQQA6AAAgAEHcAGoiAUEBa0EAOgAAIABBADoAAiAAQQA6AAEgAUEDa0EAOgAAIAFBAmtBADoAACAAQQA6AAMgAUEEa0EAOgAAQQAgAGtBA3EiASAAaiIAQQA2AgBB3AAgAWtBfHEiAiAAaiIBQQRrQQA2AgACQCACQQlJDQAgAEEANgIIIABBADYCBCABQQhrQQA2AgAgAUEMa0EANgIAIAJBGUkNACAAQQA2AhggAEEANgIUIABBADYC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YXR1cwBJbnZhbGlkIHJlc3BvbnNlIHN0YXR1cwBFeHBlY3RlZCBMRiBhZnRlciBoZWFkZXJzAEludmFsaWQgY2hhcmFjdGVyIGluIGNodW5rIGV4dGVuc2lvbnMAVXNlciBjYWxsYmFjayBlcnJvcgBgb25fcmVzZXRgIGNhbGxiYWNrIGVycm9yAGBvbl9jaHVua19oZWFkZXJgIGNhbGxiYWNrIGVycm9yAGBvbl9tZXNzYWdlX2JlZ2luYCBjYWxsYmFjayBlcnJvcgBgb25fY2h1bmtfZXh0ZW5zaW9uX3ZhbHVlYCBjYWxsYmFjayBlcnJvcgBgb25fc3RhdHVzX2NvbXBsZXRlYCBjYWxsYmFjayBlcnJvcgBgb25fdmVyc2lvbl9jb21wbGV0ZWAgY2FsbGJhY2sgZXJyb3IAYG9uX3VybF9jb21wbGV0ZWAgY2FsbGJhY2sgZXJyb3IAYG9uX2NodW5rX2NvbXBsZXRlYCBjYWxsYmFjayBlcnJvcgBgb25faGVhZGVyX3ZhbHVlX2NvbXBsZXRlYCBjYWxsYmFjayBlcnJvcgBgb25fbWVzc2FnZV9jb21wbGV0ZWAgY2FsbGJhY2sgZXJyb3IAYG9uX21ldGhvZF9jb21wbGV0ZWAgY2FsbGJhY2sgZXJyb3IAYG9uX2hlYWRlcl9maWVsZF9jb21wbGV0ZWAgY2FsbGJhY2sgZXJyb3IAYG9uX2NodW5rX2V4dGVuc2lvbl9uYW1lYCBjYWxsYmFjayBlcnJvcgBVbmV4cGVjdGVkIGNoYXIgaW4gdXJsIHNlcnZlcgBJbnZhbGlkIGhlYWRlciB2YWx1ZSBjaGFyAEludmFsaWQgaGVhZGVyIGZpZWxkIGNoYXIAU3BhbiBjYWxsYmFjayBlcnJvciBpbiBvbl92ZXJzaW9uAEludmFsaWQgbWlub3IgdmVyc2lvbgBJbnZhbGlkIG1ham9yIHZlcnNpb24ARXhwZWN0ZWQgc3BhY2UgYWZ0ZXIgdmVyc2lvbgBFeHBlY3RlZCBDUkxGIGFmdGVyIHZlcnNpb24ASW52YWxpZCBIVFRQIHZlcnNpb24ASW52YWxpZCBoZWFkZXIgdG9rZW4AU3BhbiBjYWxsYmFjayBlcnJvciBpbiBvbl91cmwASW52YWxpZCBjaGFyYWN0ZXJzIGluIHVybABVbmV4cGVjdGVkIHN0YXJ0IGNoYXIgaW4gdXJsAERvdWJsZSBAIGluIHVybABFbXB0eSBDb250ZW50LUxlbmd0aABJbnZhbGlkIGNoYXJhY3RlciBpbiBDb250ZW50LUxlbmd0aABUcmFuc2Zlci1FbmNvZGluZyBjYW4ndCBiZSBwcmVzZW50IHdpdGggQ29udGVudC1MZW5ndGgARHVwbGljYXRlIENvbnRlbnQtTGVuZ3RoAEludmFsaWQgY2hhciBpbiB1cmwgcGF0aABDb250ZW50LUxlbmd0aCBjYW4ndCBiZSBwcmVzZW50IHdpdGggVHJhbnNmZXItRW5jb2RpbmcATWlzc2luZyBleHBlY3RlZCBDUiBhZnRlciBjaHVuayBzaXplAEV4cGVjdGVkIExGIGFmdGVyIGNodW5rIHNpemUASW52YWxpZCBjaGFyYWN0ZXIgaW4gY2h1bmsgc2l6ZQBTcGFuIGNhbGxiYWNrIGVycm9yIGluIG9uX2hlYWRlcl92YWx1ZQBTcGFuIGNhbGxiYWNrIGVycm9yIGluIG9uX2NodW5rX2V4dGVuc2lvbl92YWx1ZQBJbnZhbGlkIGNoYXJhY3RlciBpbiBjaHVuayBleHRlbnNpb25zIHZhbHVlAE1pc3NpbmcgZXhwZWN0ZWQgQ1IgYWZ0ZXIgaGVhZGVyIHZhbHVlAE1pc3NpbmcgZXhwZWN0ZWQgTEYgYWZ0ZXIgaGVhZGVyIHZhbHVlAEludmFsaWQgYFRyYW5zZmVyLUVuY29kaW5nYCBoZWFkZXIgdmFsdWUATWlzc2luZyBleHBlY3RlZCBDUiBhZnRlciBjaHVuayBleHRlbnNpb24gdmFsdWUASW52YWxpZCBjaGFyYWN0ZXIgaW4gY2h1bmsgZXh0ZW5zaW9ucyBxdW90ZSB2YWx1ZQBJbnZhbGlkIHF1b3RlZC1wYWlyIGluIGNodW5rIGV4dGVuc2lvbnMgcXVvdGVkIHZhbHVlAEludmFsaWQgY2hhcmFjdGVyIGluIGNodW5rIGV4dGVuc2lvbnMgcXVvdGVkIHZhbHVlAFBhdXNlZCBieSBvbl9oZWFkZXJzX2NvbXBsZXRlAEludmFsaWQgRU9GIHN0YXRlAG9uX3Jlc2V0IHBhdXNlAG9uX2NodW5rX2hlYWRlciBwYXVzZQBvbl9tZXNzYWdlX2JlZ2luIHBhdXNlAG9uX2NodW5rX2V4dGVuc2lvbl92YWx1ZSBwYXVzZQBvbl9zdGF0dXNfY29tcGxldGUgcGF1c2UAb25fdmVyc2lvbl9jb21wbGV0ZSBwYXVzZQBvbl91cmxfY29tcGxldGUgcGF1c2UAb25fY2h1bmtfY29tcGxldGUgcGF1c2UAb25faGVhZGVyX3ZhbHVlX2NvbXBsZXRlIHBhdXNlAG9uX21lc3NhZ2VfY29tcGxldGUgcGF1c2UAb25fbWV0aG9kX2NvbXBsZXRlIHBhdXNlAG9uX2hlYWRlcl9maWVsZF9jb21wbGV0ZSBwYXVzZQBvbl9jaHVua19leHRlbnNpb25fbmFtZSBwYXVzZQBVbmV4cGVjdGVkIHNwYWNlIGFmdGVyIHN0YXJ0IGxpbmUATWlzc2luZyBleHBlY3RlZCBDUiBhZnRlciByZXNwb25zZSBsaW5lAFNwYW4gY2FsbGJhY2sgZXJyb3IgaW4gb25fY2h1bmtfZXh0ZW5zaW9uX25hbWUASW52YWxpZCBjaGFyYWN0ZXIgaW4gY2h1bmsgZXh0ZW5zaW9ucyBuYW1lAE1pc3NpbmcgZXhwZWN0ZWQgQ1IgYWZ0ZXIgY2h1bmsgZXh0ZW5zaW9uIG5hbWUASW52YWxpZCBzdGF0dXMgY29kZQBQYXVzZSBvbiBDT05ORUNUL1VwZ3JhZGUAUGF1c2Ugb24gUFJJL1VwZ3JhZGUARXhwZWN0ZWQgSFRUUC8yIENvbm5lY3Rpb24gUHJlZmFjZQBTcGFuIGNhbGxiYWNrIGVycm9yIGluIG9uX21ldGhvZABFeHBlY3RlZCBzcGFjZSBhZnRlciBtZXRob2QAU3BhbiBjYWxsYmFjayBlcnJvciBpbiBvbl9oZWFkZXJfZmllbGQAUGF1c2VkAEludmFsaWQgd29yZCBlbmNvdW50ZXJlZABJbnZhbGlkIG1ldGhvZCBlbmNvdW50ZXJlZABNaXNzaW5nIGV4cGVjdGVkIENSIGFmdGVyIGNodW5rIGRhdGEARXhwZWN0ZWQgTEYgYWZ0ZXIgY2h1bmsgZGF0YQBVbmV4cGVjdGVkIGNoYXIgaW4gdXJsIHNjaGVtYQBSZXF1ZXN0IGhhcyBpbnZhbGlkIGBUcmFuc2Zlci1FbmNvZGluZ2AARGF0YSBhZnRlciBgQ29ubmVjdGlvbjogY2xvc2VgAFNXSVRDSF9QUk9YWQBVU0VfUFJPWFkATUtBQ1RJVklUWQBVTlBST0NFU1NBQkxFX0VOVElUWQBRVUVSWQBDT1BZAE1PVkVEX1BFUk1BTkVOVExZAFRPT19FQVJMWQBOT1RJRlkARkFJTEVEX0RFUEVOREVOQ1kAQkFEX0dBVEVXQVkAUExBWQBQVVQAQ0hFQ0tPVVQAR0FURVdBWV9USU1FT1VUAFJFUVVFU1RfVElNRU9VVABORVRXT1JLX0NPTk5FQ1RfVElNRU9VVABDT05ORUNUSU9OX1RJTUVPVVQATE9HSU5fVElNRU9VVABORVRXT1JLX1JFQURfVElNRU9VVABQT1NUAE1JU0RJUkVDVEVEX1JFUVVFU1QAQ0xJRU5UX0NMT1NFRF9SRVFVRVNUAENMSUVOVF9DTE9TRURfTE9BRF9CQUxBTkNFRF9SRVFVRVNUAEJBRF9SRVFVRVNUAEhUVFBfUkVRVUVTVF9TRU5UX1RPX0hUVFBTX1BPUlQAUkVQT1JUAElNX0FfVEVBUE9UAFJFU0VUX0NPTlRFTlQATk9fQ09OVEVOVABQQVJUSUFMX0NPTlRFTlQASFBFX0lOVkFMSURfQ09OU1RBTlQASFBFX0NCX1JFU0VUAEdFVABIUEVfU1RSSUNUAENPTkZMSUNUAFRFTVBPUkFSWV9SRURJUkVDVABQRVJNQU5FTlRfUkVESVJFQ1QAQ09OTkVDVABNVUxUSV9TVEFUVVMASFBFX0lOVkFMSURfU1RBVFVTAFRPT19NQU5ZX1JFUVVFU1RTAEVBUkxZX0hJTlRTAFVOQVZBSUxBQkxFX0ZPUl9MRUdBTF9SRUFTT05TAE9QVElPTlMAU1dJVENISU5HX1BST1RPQ09MUwBWQVJJQU5UX0FMU09fTkVHT1RJQVRFUwBNVUxUSVBMRV9DSE9JQ0VTAElOVEVSTkFMX1NFUlZFUl9FUlJPUgBXRUJfU0VSVkVSX1VOS05PV05fRVJST1IAUkFJTEdVTl9FUlJPUgBJREVOVElUWV9QUk9WSURFUl9BVVRIRU5USUNBVElPTl9FUlJPUgBTU0xfQ0VSVElGSUNBVEVfRVJST1IASU5WQUxJRF9YX0ZPUldBUkRFRF9GT1IAU0VUX1BBUkFNRVRFUgBHRVRfUEFSQU1FVEVSAEhQRV9VU0VSAFNFRV9PVEhFUgBIUEVfQ0JfQ0hVTktfSEVBREVSAEV4cGVjdGVkIExGIGFmdGVyIENSAE1LQ0FMRU5EQVIAU0VUVVAAV0VCX1NFUlZFUl9JU19ET1dOAFRFQVJET1dOAEhQRV9DTE9TRURfQ09OTkVDVElPTgBIRVVSSVNUSUNfRVhQSVJBVElPTgBESVNDT05ORUNURURfT1BFUkFUSU9OAE5PTl9BVVRIT1JJVEFUSVZFX0lORk9STUFUSU9OAEhQRV9JTlZBTElEX1ZFUlNJT04ASFBFX0NCX01FU1NBR0VfQkVHSU4AU0lURV9JU19GUk9aRU4ASFBFX0lOVkFMSURfSEVBREVSX1RPS0VOAElOVkFMSURfVE9LRU4ARk9SQklEREVOAEVOSEFOQ0VfWU9VUl9DQUxNAEhQRV9JTlZBTElEX1VSTABCTE9DS0VEX0JZX1BBUkVOVEFMX0NPTlRST0wATUtDT0wAQUNMAEhQRV9JTlRFUk5BTABSRVFVRVNUX0hFQURFUl9GSUVMRFNfVE9PX0xBUkdFX1VOT0ZGSUNJQUwASFBFX09LAFVOTElOSwBVTkxPQ0sAUFJJAFJFVFJZX1dJVEgASFBFX0lOVkFMSURfQ09OVEVOVF9MRU5HVEgASFBFX1VORVhQRUNURURfQ09OVEVOVF9MRU5HVEgARkxVU0gAUFJPUFBBVENIAE0tU0VBUkNIAFVSSV9UT09fTE9ORwBQUk9DRVNTSU5HAE1JU0NFTExBTkVPVVNfUEVSU0lTVEVOVF9XQVJOSU5HAE1JU0NFTExBTkVPVVNfV0FSTklORwBIUEVfSU5WQUxJRF9UUkFOU0ZFUl9FTkNPRElORwBFeHBlY3RlZCBDUkxGAEhQRV9JTlZBTElEX0NIVU5LX1NJWkUATU9WRQBDT05USU5VRQBIUEVfQ0JfU1RBVFVTX0NPTVBMRVRFAEhQRV9DQl9IRUFERVJTX0NPTVBMRVRFAEhQRV9DQl9WRVJTSU9OX0NPTVBMRVRFAEhQRV9DQl9VUkxfQ09NUExFVEUASFBFX0NCX0NIVU5LX0NPTVBMRVRFAEhQRV9DQl9IRUFERVJfVkFMVUVfQ09NUExFVEUASFBFX0NCX0NIVU5LX0VYVEVOU0lPTl9WQUxVRV9DT01QTEVURQBIUEVfQ0JfQ0hVTktfRVhURU5TSU9OX05BTUVfQ09NUExFVEUASFBFX0NCX01FU1NBR0VfQ09NUExFVEUASFBFX0NCX01FVEhPRF9DT01QTEVURQBIUEVfQ0JfSEVBREVSX0ZJRUxEX0NPTVBMRVRFAERFTEVURQBIUEVfSU5WQUxJRF9FT0ZfU1RBVEUASU5WQUxJRF9TU0xfQ0VSVElGSUNBVEUAUEFVU0UATk9fUkVTUE9OU0UAVU5TVVBQT1JURURfTUVESUFfVFlQRQBHT05FAE5PVF9BQ0NFUFRBQkxFAFNFUlZJQ0VfVU5BVkFJTEFCTEUAUkFOR0VfTk9UX1NBVElTRklBQkxFAE9SSUdJTl9JU19VTlJFQUNIQUJMRQBSRVNQT05TRV9JU19TVEFMRQBQVVJHRQBNRVJHRQBSRVFVRVNUX0hFQURFUl9GSUVMRFNfVE9PX0xBUkdFAFJFUVVFU1RfSEVBREVSX1RPT19MQVJHRQBQQVlMT0FEX1RPT19MQVJHRQBJTlNVRkZJQ0lFTlRfU1RPUkFHRQBIUEVfUEFVU0VEX1VQR1JBREUASFBFX1BBVVNFRF9IMl9VUEdSQURFAFNPVVJDRQBBTk5PVU5DRQBUUkFDRQBIUEVfVU5FWFBFQ1RFRF9TUEFDRQBERVNDUklCRQBVTlNVQlNDUklCRQBSRUNPUkQASFBFX0lOVkFMSURfTUVUSE9EAE5PVF9GT1VORABQUk9QRklORABVTkJJTkQAUkVCSU5EAFVOQVVUSE9SSVpFRABNRVRIT0RfTk9UX0FMTE9XRUQASFRUUF9WRVJTSU9OX05PVF9TVVBQT1JURUQAQUxSRUFEWV9SRVBPUlRFRABBQ0NFUFRFRABOT1RfSU1QTEVNRU5URUQATE9PUF9ERVRFQ1RFRABIUEVfQ1JfRVhQRUNURUQASFBFX0xGX0VYUEVDVEVEAENSRUFURUQASU1fVVNFRABIUEVfUEFVU0VEAFRJTUVPVVRfT0NDVVJFRABQQVlNRU5UX1JFUVVJUkVEAFBSRUNPTkRJVElPTl9SRVFVSVJFRABQUk9YWV9BVVRIRU5USUNBVElPTl9SRVFVSVJFRABORVRXT1JLX0FVVEhFTlRJQ0FUSU9OX1JFUVVJUkVEAExFTkdUSF9SRVFVSVJFRABTU0xfQ0VSVElGSUNBVEVfUkVRVUlSRUQAVVBHUkFERV9SRVFVSVJFRABQQUdFX0VYUElSRUQAUFJFQ09ORElUSU9OX0ZBSUxFRABFWFBFQ1RBVElPTl9GQUlMRUQAUkVWQUxJREFUSU9OX0ZBSUxFRABTU0xfSEFORFNIQUtFX0ZBSUxFRABMT0NLRUQAVFJBTlNGT1JNQVRJT05fQVBQTElFRABOT1RfTU9ESUZJRUQATk9UX0VYVEVOREVEAEJBTkRXSURUSF9MSU1JVF9FWENFRURFRABTSVRFX0lTX09WRVJMT0FERUQASEVBRABFeHBlY3RlZCBIVFRQLwAAUhUAABoVAAAPEgAA5BkAAJEVAAAJFAAALRkAAOQUAADpEQAAaRQAAKEUAAB2FQAAQxYAAF4SAACUFwAAFxYAAH0UAAB/FgAAQRcAALMTAADDFgAABBoAAL0YAADQGAAAoBMAANQZAACvFgAAaBYAAHAXAADZFgAA/BgAAP4RAABZFwAAlxYAABwXAAD2FgAAjRcAAAsSAAB/GwAALhEAALMQAABJEgAArRIAAPYYAABoEAAAYhUAABAVAABaFgAAShkAALUVAADBFQAAYBUAAFwZAABaGQAAUxkAABYVAACtEQAAQhAAALcQAABXGAAAvxUAAIkQAAAcGQAAGhkAALkVAABRGAAA3BMAAFsVAABZFQAA5hgAAGcVAAARGQAA7RgAAOcTAACuEAAAwhcAAAAUAACSEwAAhBMAAEASAAAmGQAArxUAAGIQAEHpOQsBAQBBgDoL4AEBAQIBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQBB6jsLBAEAAAIAQYE8C14DBAMDAwMDAAADAwADAwADAwMDAwMDAwMDAAUAAAAAAAMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAAAAAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMAAwADAEHqPQsEAQAAAgBBgT4LXgMAAwMDAwMAAAMDAAMDAAMDAwMDAwMDAwMABAAFAAAAAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMAAAADAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwADAAMAQeA/Cw1sb3NlZWVwLWFsaXZlAEH5PwsBAQBBkMAAC+ABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAQfnBAAsBAQBBkMIAC+cBAQEBAQEBAQEBAQEBAgEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQFjaHVua2VkAEGhxAALXgEAAQEBAQEAAAEBAAEBAAEBAQEBAQEBAQEAAAAAAAAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAAEAQYDGAAshZWN0aW9uZW50LWxlbmd0aG9ucm94eS1jb25uZWN0aW9uAEGwxgALK3JhbnNmZXItZW5jb2RpbmdwZ3JhZGUNCg0KU00NCg0KVFRQL0NFL1RTUC8AQenGAAsFAQIAAQMAQYDHAAtfBAUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUAQenIAAsFAQIAAQMAQYDJAAtfBAUFBgUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUAQenKAAsEAQAAAQBBgcsAC14CAgACAgICAgICAgICAgICAgICAgICAgICAgICAgIAAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAEHpzAALBQECAAEDAEGAzQALXwQFAAAFBQUFBQUFBQUFBQYFBQUFBQUFBQUFBQUABQAHCAUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQAFAAUABQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUAAAAFAEHpzgALBQEBAAEBAEGAzwALAQEAQZrPAAtBAgAAAAAAAAMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAAAAAAAAAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMAQenQAAsFAQEAAQEAQYDRAAsBAQBBitEACwYCAAAAAAIAQaHRAAs6AwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMAAAAAAAADAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwBB4NIAC5oBTk9VTkNFRUNLT1VUTkVDVEVURUNSSUJFTFVTSEVURUFEU0VBUkNIUkdFQ1RJVklUWUxFTkRBUlZFT1RJRllQVElPTlNDSFNFQVlTVEFUQ0hHRVVFUllPUkRJUkVDVE9SVFJDSFBBUkFNRVRFUlVSQ0VCU0NSSUJFQVJET1dOQUNFSU5ETktDS1VCU0NSSUJFSFRUUC9BRFRQLw==";
    var wasmBuffer;
    Object.defineProperty(module2, "exports", {
      get: () => {
        return wasmBuffer ? wasmBuffer : wasmBuffer = Buffer2.from(wasmBase64, "base64");
      }
    });
  }
});

// node_modules/undici/lib/llhttp/llhttp_simd-wasm.js
var require_llhttp_simd_wasm = __commonJS({
  "node_modules/undici/lib/llhttp/llhttp_simd-wasm.js"(exports2, module2) {
    "use strict";
    var { Buffer: Buffer2 } = require("node:buffer");
    var wasmBase64 = "AGFzbQEAAAABJwdgAX8Bf2ADf39/AX9gAn9/AGABfwBgBH9/f38Bf2AAAGADf39/AALLAQgDZW52GHdhc21fb25faGVhZGVyc19jb21wbGV0ZQAEA2VudhV3YXNtX29uX21lc3NhZ2VfYmVnaW4AAANlbnYLd2FzbV9vbl91cmwAAQNlbnYOd2FzbV9vbl9zdGF0dXMAAQNlbnYUd2FzbV9vbl9oZWFkZXJfZmllbGQAAQNlbnYUd2FzbV9vbl9oZWFkZXJfdmFsdWUAAQNlbnYMd2FzbV9vbl9ib2R5AAEDZW52GHdhc21fb25fbWVzc2FnZV9jb21wbGV0ZQAAAzQzBQYAAAMAAAAAAAADAQMAAwMDAAACAAAAAAICAgICAgICAgIBAQEBAQEBAQEDAAADAAAABAUBcAESEgUDAQACBggBfwFBgNgECwfFBygGbWVtb3J5AgALX2luaXRpYWxpemUACBlfX2luZGlyZWN0X2Z1bmN0aW9uX3RhYmxlAQALbGxodHRwX2luaXQACRhsbGh0dHBfc2hvdWxkX2tlZXBfYWxpdmUANgxsbGh0dHBfYWxsb2MACwZtYWxsb2MAOAtsbGh0dHBfZnJlZQAMBGZyZWUADA9sbGh0dHBfZ2V0X3R5cGUADRVsbGh0dHBfZ2V0X2h0dHBfbWFqb3IADhVsbGh0dHBfZ2V0X2h0dHBfbWlub3IADxFsbGh0dHBfZ2V0X21ldGhvZAAQFmxsaHR0cF9nZXRfc3RhdHVzX2NvZGUAERJsbGh0dHBfZ2V0X3VwZ3JhZGUAEgxsbGh0dHBfcmVzZXQAEw5sbGh0dHBfZXhlY3V0ZQAUFGxsaHR0cF9zZXR0aW5nc19pbml0ABUNbGxodHRwX2ZpbmlzaAAWDGxsaHR0cF9wYXVzZQAXDWxsaHR0cF9yZXN1bWUAGBtsbGh0dHBfcmVzdW1lX2FmdGVyX3VwZ3JhZGUAGRBsbGh0dHBfZ2V0X2Vycm5vABoXbGxodHRwX2dldF9lcnJvcl9yZWFzb24AGxdsbGh0dHBfc2V0X2Vycm9yX3JlYXNvbgAcFGxsaHR0cF9nZXRfZXJyb3JfcG9zAB0RbGxodHRwX2Vycm5vX25hbWUAHhJsbGh0dHBfbWV0aG9kX25hbWUAHxJsbGh0dHBfc3RhdHVzX25hbWUAIBpsbGh0dHBf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a0E+aiECCyABIAI2AhwgAUIANwIQIAJBAnRBsNYAaiEAAkBBhNQAKAIAIgNBASACdCIHcUUEQCAAIAE2AgBBhNQAIAMgB3I2AgAgASAANgIYIAEgATYCCCABIAE2AgwMAQsgBEEZIAJBAXZrQQAgAkEfRxt0IQIgACgCACEAAkADQCAAIgMoAgRBeHEgBEYNASACQR12IQAgAkEBdCECIAMgAEEEcWpBEGoiBygCACIADQALIAcgATYCACABIAM2AhggASABNgIMIAEgATYCCAwBCyADKAIIIgAgATYCDCADIAE2AgggAUEANgIYIAEgAzYCDCABIAA2AggLQaDUAEGg1AAoAgBBAWsiAEF/IAAbNgIACwsHACAALQAoCwcAIAAtACoLBwAgAC0AKwsHACAALQApCwcAIAAvATQLBwAgAC0AMAtAAQR/IAAoAhghASAALwEuIQIgAC0AKCEDIAAoAjghBCAAEDcgACAENgI4IAAgAzoAKCAAIAI7AS4gACABNgIYC8X4AQIHfwN+IAEgAmohBAJAIAAiAygCDCIADQAgAygCBARAIAMgATYCBAsjAEEQayIJJAACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAn8CQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAC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AkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAIAMCfwJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACfwJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAn8CQAJAAkACQAJAAkACQAJ/AkACQAJAAn8CQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAIAMCfwJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACfwJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQCACDtQBAAECAwQFBgcICQoLDA0ODxARFBUWFxgZGhscHR4fICEjJCUnKCmIA4cDhQOEA/wC9QLuAusC6ALmAuMC4ALfAt0C2wLWAtUC1ALTAtICygLJAsgCxwLGAsUCxALDAr0CvAK6ArkCuAK3ArYCtQK0ArICsQKsAqoCqAKnAqYCpQKkAqMCogKhAqACnwKbApoCmQKYApcCkAKIAoQCgwKCAvkB9gH1AfQB8wHyAfEB8AHvAe0B6wHoAeMB4QHgAd8B3gHdAdwB2wHaAdkB2AHX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QEBAQEBAQEBAQEBAAEALQQAhAiADQQA2AhwgA0G3CzYCECADQQI2AgwgAyABQQFqNgIUDIEDCyADQS9qIQIDQCABIARGBEBBISECDIIDCwJAAkACQCABLQAAIgBBCWsOGAIAKioBKioqKioqKioqKioqKioqKioqAigLIAFBAWohASADQS9qLQAAQQFxRQ0LDBkLIAFBAWohAQwYCyABQQFqIQEgAi0AAEECcQ0AC0EAIQIgA0EANgIcIAMgATYCFCADQc4UNgIQIANBDDYCDAyAAwsgAUEBaiEBC0EAIQACQCADKAI4IgJFDQAgAigCVCICRQ0AIAMgAhEAACEACyAADQEM0QILIANCADcDIAw8CyAAQRVGBEAgA0EkNgIcIAMgATYCFCADQYYaNgIQIANBFTYCDEEAIQIM/QILQQAhAiADQQA2AhwgAyABNgIUIANB4g02AhAgA0EUNgIMDPwCCyADKAIEIQBBACECIANBADYCBCADIAAgASAMp2oiARAxIgBFDSsgA0EHNgIcIAMgATYCFCADIAA2AgwM+wILIAMtAC5BwABxRQ0BC0EAIQACQCADKAI4IgJFDQAgAigCUCICRQ0AIAMgAhEAACEACyAARQ0rIABBFUYEQCADQQo2AhwgAyABNgIUIANB8Rg2AhAgA0EVNgIMQQAhAgz6AgtBACECIANBADYCHCADIAE2AhQgA0GLDDYCECADQRM2AgwM+QILQQAhAiADQQA2AhwgAyABNgIUIANBsRQ2AhAgA0ECNgIMDPgCC0EAIQIgA0EANgIcIAMgATYCFCADQYwUNgIQIANBGTYCDAz3AgtBACECIANBADYCHCADIAE2AhQgA0HRHDYCECADQRk2AgwM9gILIABBFUYNPUEAIQIgA0EANgIcIAMgATYCFCADQaIPNgIQIANBIjYCDAz1AgsgAygCBCEAQQAhAiADQQA2AgQgAyAAIAEQMiIARQ0oIANBDTYCHCADIAE2AhQgAyAANgIMDPQCCyAAQRVGDTpBACECIANBADYCHCADIAE2AhQgA0GiDzYCECADQSI2AgwM8wILIAMoAgQhAEEAIQIgA0EANgIEIAMgACABEDIiAEUEQCABQQFqIQEMKAsgA0EONgIcIAMgADYCDCADIAFBAWo2AhQM8gILIABBFUYNN0EAIQIgA0EANgIcIAMgATYCFCADQaIPNgIQIANBIjYCDAzxAgsgAygCBCEAQQAhAiADQQA2AgQgAyAAIAEQMiIARQRAIAFBAWohAQwnCyADQQ82AhwgAyAANgIMIAMgAUEBajYCFAzwAgtBACECIANBADYCHCADIAE2AhQgA0HoFjYCECADQRk2AgwM7wILIABBFUYNM0EAIQIgA0EANgIcIAMgATYCFCADQc4MNgIQIANBIzYCDAzuAgsgAygCBCEAQQAhAiADQQA2AgQgAyAAIAEQMyIARQ0lIANBETYCHCADIAE2AhQgAyAANgIMDO0CCyAAQRVGDTBBACECIANBADYCHCADIAE2AhQgA0HODDYCECADQSM2AgwM7AILIAMoAgQhAEEAIQIgA0EANgIEIAMgACABEDMiAEUEQCABQQFqIQEMJQsgA0ESNgIcIAMgADYCDCADIAFBAWo2AhQM6wILIANBL2otAABBAXFFDQELQRUhAgzPAgtBACECIANBADYCHCADIAE2AhQgA0HoFjYCECADQRk2AgwM6AILIABBO0cNACABQQFqIQEMDAtBACECIANBADYCHCADIAE2AhQgA0GYFzYCECADQQI2AgwM5gILIABBFUYNKEEAIQIgA0EANgIcIAMgATYCFCADQc4MNgIQIANBIzYCDAzlAgsgA0EUNgIcIAMgATYCFCADIAA2AgwM5AILIAMoAgQhAEEAIQIgA0EANgIEIAMgACABEDMiAEUEQCABQQFqIQEM3AILIANBFTYCHCADIAA2AgwgAyABQQFqNgIUDOMCCyADKAIEIQBBACECIANBADYCBCADIAAgARAzIgBFBEAgAUEBaiEBDNoCCyADQRc2AhwgAyAANgIMIAMgAUEBajYCFAziAgsgAEEVRg0jQQAhAiADQQA2AhwgAyABNgIUIANBzgw2AhAgA0EjNgIMDOECCyADKAIEIQBBACECIANBADYCBCADIAAgARAzIgBFBEAgAUEBaiEBDB0LIANBGTYCHCADIAA2AgwgAyABQQFqNgIUDOACCyADKAIEIQBBACECIANBADYCBCADIAAgARAzIgBFBEAgAUEBaiEBDNYCCyADQRo2AhwgAyAANgIMIAMgAUEBajYCFAzfAgsgAEEVRg0fQQAhAiADQQA2AhwgAyABNgIUIANBog82AhAgA0EiNgIMDN4CCyADKAIEIQBBACEC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DLMCCyABIARGBEBB6QEhAgyzAgsgAS0AAEHIAEYNASADQQE6ACgLQbYBIQIMlwILQcoBIQIMlgILIAEgBEcEQCADQQw2AgggAyABNgIEQckBIQIMlgILQegBIQIMrwILIAEgBEYEQEHnASECDK8CCyABLQAAQcgARw0EIAFBAWohAUHIASECDJQCCyABIARGBEBB5gEhAgyuAgsCQAJAIAEtAABBxQBrDhAABQUFBQUFBQUFBQUFBQUBBQsgAUEBaiEBQcYBIQIMlAILIAFBAWohAUHHASECDJMCC0HlASECIAEgBEYNrAIgAygCACIAIAQgAWtqIQUgASAAa0ECaiEGAkADQCABLQAAIABB99MAai0AAEcNAyAAQQJGDQEgAEEBaiEAIAQgAUEBaiIBRw0ACyADIAU2AgAMrQILIAMoAgQhACADQgA3AwAgAyAAIAZBAWoiARAtIgBFBEBB1AEhAgyTAgsgA0HkATYCHCADIAE2AhQgAyAANgIMQQAhAgysAgtB4wEhAiABIARGDasCIAMoAgAiACAEIAFraiEFIAEgAGtBAWohBgJAA0AgAS0AACAAQfXTAGotAABHDQIgAEEBRg0BIABBAWohACAEIAFBAWoiAUcNAAsgAyAFNgIADKwCCyADQYEEOwEoIAMoAgQhACADQgA3AwAgAyAAIAZBAWoiARAtIgANAwwCCyADQQA2AgALQQAhAiADQQA2AhwgAyABNgIUIANB0B42AhAgA0EINgIMDKkCC0HFASECDI4CCyADQeIBNgIcIAMgATYCFCADIAA2AgxBACECDKcCC0EAIQACQCADKAI4IgJFDQAgAigCOCICRQ0AIAMgAhEAACEACyAARQ1lIABBFUcEQCADQQA2AhwgAyABNgIUIANB1A42AhAgA0EgNgIMQQAhAgynAgsgA0GFATYCHCADIAE2AhQgA0HXGjYCECADQRU2AgxBACECDKYCC0HhASECIAQgASIARg2lAiAEIAFrIAMoAgAiAWohBSAAIAFrQQRqIQYCQANAIAAtAAAgAUHw0wBqLQAARw0BIAFBBEYNAyABQQFqIQEgBCAAQQFqIgBHDQALIAMgBTYCAAymAgsgA0EANgIcIAMgADYCFCADQYQ3NgIQIANBCDYCDCADQQA2AgBBACECDKUCCyABIARHBEAgA0ENNgIIIAMgATYCBEHCASECDIsCC0HgASECDKQCCyADQQA2AgAgBkEBaiEBC0HDASECDIgCCyABIARGBEBB3wEhAgyiAgsgAS0AAEEwayIAQf8BcUEKSQRAIAMgADoAKiABQQFqIQFBwQEhAgyIAgsgAygCBCEAIANBADYCBCADIAAgARAuIgBFDYgCIANB3gE2AhwgAyABNgIUIAMgADYCDEEAIQIMoQILIAEgBEYEQEHdASECDKECCwJAIAEtAABBLkYEQCABQQFqIQEMAQsgAygCBCEAIANBADYCBCADIAAgARAuIgBFDYkCIANB3AE2AhwgAyABNgIUIAMgADYCDEEAIQIMoQILQcABIQIMhgILIAEgBEYEQEHbASECDKACC0EAIQBBASEFQQEhB0EAIQICQAJAAkACQAJAAn8CQAJAAkACQAJAAkACQCABLQAAQTBrDgoKCQABAgMEBQYICwtBAgwGC0EDDAULQQQMBAtBBQwDC0EGDAILQQcMAQtBCAshAkEAIQVBACEHDAILQQkhAkEBIQBBACEFQQAhBwwBC0EAIQVBASECCyADIAI6ACsgAUEBaiEBAkACQCADLQAuQRBxDQACQAJAAkAgAy0AKg4DAQACBAsgB0UNAwwCCyAADQEMAgsgBUUNAQsgAygCBCEAIANBADYCBCADIAAgARAuIgBFDQIgA0HYATYCHCADIAE2AhQgAyAANgIMQQAhAgyiAgsgAygCBCEAIANBADYCBCADIAAgARAuIgBFDYsCIANB2QE2AhwgAyABNgIUIAMgADYCDEEAIQIMoQILIAMoAgQhACADQQA2AgQgAyAAIAEQLiIARQ2JAiADQdoBNgIcIAMgATYCFCADIAA2AgwMoAILQb8BIQIMhQILQQAhAAJAIAMoAjgiAkUNACACKAI8IgJFDQAgAyACEQAAIQALAkAgAARAIABBFUYNASADQQA2AhwgAyABNgIUIANBnA02AhAgA0EhNgIMQQAhAgygAgtBvgEhAgyFAgsgA0HXATYCHCADIAE2AhQgA0HWGTYCECADQRU2AgxBACECDJ4CCyABIARGBEBB1wEhAgyeAgsCQCABLQAAQSBGBEAgA0EAOwE0IAFBAWohAQwBCyADQQA2AhwgAyABNgIUIANB6xA2AhAgA0EJNgIMQQAhAgyeAgtBvQEhAgyDAgsgASAERgRAQdYBIQIM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LgsgAUEBaiEBQZcBIQIM2AELIAFBAWohAUEiDCsLIAEgBEYEQEGvASECDPEBCyABLQAAQdAARw0rIAFBAWohAUGWASECDNYBCyABIARGBEBBrgEhAgzwAQsCQAJAIAEtAABBxgBrDgsALCwsLCwsLCwsASwLIAFBAWohAUGUASECDNYBCyABQQFqIQFBlQEhAgzVAQtBrQEhAiABIARGDe4BIAMoAgAiACAEIAFraiEFIAEgAGtBA2ohBgJAA0AgAS0AACAAQazTAGotAABHDSggAEEDRg0BIABBAWohACAEIAFBAWoiAUcNAAsgAyAFNgIADO8BCyADQQA2AgAgBkEBaiEBQQ0MKAtBrAEhAiABIARGDe0BIAMoAgAiACAEIAFraiEFIAEgAGtBAmohBgJAA0AgAS0AACAAQeHTAGotAABHDScgAEECRg0BIABBAWohACAEIAFBAWoiAUcNAAsgAyAFNgIADO4BCyADQQA2AgAgBkEBaiEBQQwMJwtBqwEhAiABIARGDewBIAMoAgAiACAEIAFraiEFIAEgAGtBAWohBgJAA0AgAS0AACAAQarTAGotAABHDSYgAEEBRg0BIABBAWohACAEIAFBAWoiAUcNAAsgAyAFNgIADO0BCyADQQA2AgAgBkEBaiEBQQMMJgtBqgEhAiABIARGDesBIAMoAgAiACAEIAFraiEFIAEgAGtBAWohBgJAA0AgAS0AACAAQajTAGotAABHDSUgAEEBRg0BIABBAWohACAEIAFBAWoiAUcNAAsgAyAFNgIADOwBCyADQQA2AgAgBkEBaiEBQSYMJQsgASAERgRAQakBIQIM6wELAkACQCABLQAAQdQAaw4CAAEnCyABQQFqIQFBjwEhAgzRAQsgAUEBaiEBQZABIQIM0AELQagBIQIgASAERg3pASADKAIAIgAgBCABa2ohBSABIABrQQFqIQYCQANAIAEtAAAgAEGm0wBqLQAARw0jIABBAUYNASAAQQFqIQAgBCABQQFqIgFHDQALIAMgBTYCAAzqAQsgA0EANgIAIAZBAWohAUEnDCMLQacBIQIgASAERg3oASADKAIAIgAgBCABa2ohBSABIABrQQFqIQYCQANAIAEtAAAgAEGk0wBqLQAARw0iIABBAUYNASAAQQFqIQAgBCABQQFqIgFHDQALIAMgBTYCAAzpAQsgA0EANgIAIAZBAWohAUEcDCILQaYBIQIgASAERg3nASADKAIAIgAgBCABa2ohBSABIABrQQVqIQYCQANAIAEtAAAgAEGe0wBqLQAARw0hIABBBUYNASAAQQFqIQAgBCABQQFqIgFHDQALIAMgBTYCAAzoAQsgA0EANgIAIAZBAWohAUEGDCELQaUBIQIgASAERg3mASADKAIAIgAgBCABa2ohBSABIABrQQRqIQYCQANAIAEtAAAgAEGZ0wBqLQAARw0gIABBBEYNASAAQQFqIQAgBCABQQFqIgFHDQALIAMgBTYCAAznAQsgA0EANgIAIAZBAWohAUEZDCALIAEgBEYEQEGkASECDOYBCwJAAkACQAJAIAEtAABBLWsOIwAkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJAEkJCQkJAIkJCQDJAsgAUEBaiEBQYQBIQIMzgELIAFBAWohAUGFASECDM0BCyABQQFqIQFBigEhAgzMAQsgAUEBaiEBQYsBIQIMywELQaMBIQIgASAERg3kASADKAIAIgAgBCABa2ohBSABIABrQQFqIQYCQANAIAEtAAAgAEGX0wBqLQAARw0eIABBAUYNASAAQQFqIQAgBCABQQFqIgFHDQALIAMgBTYCAAzlAQsgA0EANgIAIAZBAWohAUELDB4LIAEgBEYEQEGiASECDOQBCwJAAkAgAS0AAEHBAGsOAwAgASALIAFBAWohAUGGASECDMoBCyABQQFqIQFBiQEhAgzJAQsgASAERgRAQaEBIQIM4wELAkACQCABLQAAQcEAaw4PAB8fHx8fHx8fHx8fHx8BHwsgAUEBaiEBQYcBIQIMyQELIAFBAWohAUGIASECDMgBCyABIARGBEBBoAEhAgziAQsgAS0AAEHMAEcNHCABQQFqIQFBCgwbC0GfASECIAEgBEYN4AEgAygCACIAIAQgAWtqIQUgASAAa0EFaiEGAkADQCABLQAAIABBkdMAai0AAEcNGiAAQQVGDQEgAEEBaiEAIAQgAUEBaiIBRw0ACyADIAU2AgAM4QELIANBADYCACAGQQFqIQFBHgwaC0GeASECIAEgBEYN3wEgAygCACIAIAQgAWtqIQUgASAAa0EGaiEGAkADQCABLQAAIABBitMAai0AAEcNGSAAQQZGDQEgAEEBaiEAIAQgAUEBaiIBRw0ACyADIAU2AgAM4AELIANBADYCACAGQQFqIQFBFQwZC0GdASECIAEgBEYN3gEgAygCACIAIAQgAWtqIQUgASAAa0ECaiEGAkADQCABLQAAIABBh9MAai0AAEcNGCAAQQJGDQEgAEEBaiEAIAQgAUEBaiIBRw0ACyADIAU2AgAM3wELIANBADYCACAGQQFqIQFBFwwYC0GcASECIAEgBEYN3QEgAygCACIAIAQgAWtqIQUgASAAa0EFaiEGAkADQCABLQAAIABBgdMAai0AAEcNFyAAQQVGDQEgAEEBaiEAIAQgAUEBaiIBRw0ACyADIAU2AgAM3gELIANBADYCACAGQQFqIQFBGAwXCyABIARGBEBBmwEhAgzdAQsCQAJAIAEtAABByQBrDgcAGRkZGRkBGQsgAUEBaiEBQYEBIQIMwwELIAFBAWohAUGCASECDMIBC0GaASECIAEgBEYN2wEgAygCACIAIAQgAWtqIQUgASAAa0EBaiEGAkADQCABLQAAIABB5tMAai0AAEcNFSAAQQFGDQEgAEEBaiEAIAQgAUEBaiIBRw0ACyADIAU2AgAM3AELIANBADYCACAGQQFqIQFBCQwVC0GZASECIAEgBEYN2gEgAygCACIAIAQgAWtqIQUgASAAa0EBaiEGAkADQCABLQAAIABB5NMAai0AAEcNFCAAQQFGDQEgAEEBaiEAIAQgAUEBaiIBRw0ACyADIAU2AgAM2wELIANBADYCACAGQQFqIQFBHwwUC0GYASECIAEgBEYN2QEgAygCACIAIAQgAWtqIQUgASAAa0ECaiEGAkADQCABLQAAIABB/tIAai0AAEcNEyAAQQJGDQEgAEEBaiEAIAQgAUEBaiIBRw0ACyADIAU2AgAM2gELIANBADYCACAGQQFqIQFBAgwTC0GXASECIAEgBEYN2AEgAygCACIAIAQgAWtqIQUgASAAa0EBaiEGA0AgAS0AACAAQfzSAGotAABHDREgAEEBRg0CIABBAWohACAEIAFBAWoiAUcNAAsgAyAFNgIADNgBCyABIARGBEBBlgEhAgzYAQtBASABLQAAQd8ARw0RGiABQQFqIQFB/QAhAgy9AQsgA0EANgIAIAZBAWohAUH+ACECDLwBC0GVASECIAEgBEYN1QEgAygCACIAIAQgAWtqIQUgASAAa0EIaiEGAkADQCABLQAAIABBxNMAai0AAEcNDyAAQQhGDQEgAEEBaiEAIAQgAUEBaiIBRw0ACyADIAU2AgAM1gELIANBADYCACAGQQFqIQFBKQwPC0GUASECIAEgBEYN1AEgAygCACIAIAQgAWtqIQUgASAAa0EDaiEGAkADQCABLQAAIABB+NIAai0AAEcNDiAAQQNGDQEgAEEBaiEAIAQgAUEBaiIBRw0ACyADIAU2AgAM1QELIANBADYCACAGQQFqIQFBLQwOCyABIARGBEBBkwEhAgzUAQsgAS0AAEHFAEcNDiABQQFqIQFB+gAhAgy5AQsgASAERgRAQZIBIQIM0wELAkACQCABLQAAQcwAaw4IAA8PDw8PDwEPCyABQQFqIQFB+AAhAgy5AQsgAUEBaiEBQfkAIQIMuAELQZEBIQIgASAERg3RASADKAIAIgAgBCABa2ohBSABIABrQQRqIQYCQANAIAEtAAAgAEHz0gBqLQAARw0LIABBBEYNASAAQQFqIQAgBCABQQFqIgFHDQALIAMgBTYCAAzSAQsgA0EANgIAIAZBAWohAUEjDAsLQZABIQIgASAERg3QASADKAIAIgAgBCABa2ohBSABIABrQQJqIQYCQANAIAEtAAAgAEHw0gBqLQAARw0KIABBAkYNASAAQQFqIQAgBCABQQFqIgFHDQALIAMgBTYCAAzRAQsgA0EANgIAIAZBAWohAUEADAoLIAEgBEYEQEGPASECDNABCwJAAkAgAS0AAEHIAGsOCAAMDAwMDAwBDAsgAUEBaiEBQfMAIQIMtgELIAFBAWohAUH2ACECDLUBCyABIARGBEBBjgEhAgzPAQsCQAJAIAEtAABBzgBrDgMACwELCyABQQFqIQFB9AAhAgy1AQsgAUEBaiEBQfUAIQIMtAELIAEgBEYEQEGNASECDM4BCyABLQAAQdkARw0IIAFBAWohAUEIDAcLQYwBIQIgASAERg3MASADKAIAIgAgBCABa2ohBSABIABrQQNqIQYCQANAIAEtAAAgAEHs0gBqLQAARw0GIABBA0YNASAAQQFqIQAgBCABQQFqIgFHDQALIAMgBTYCAAzNAQsgA0EANgIAIAZBAWohAUEFDAYLQYsBIQIgASAERg3LASADKAIAIgAgBCABa2ohBSABIABrQQVqIQYCQANAIAEtAAAgAEHm0gBqLQAARw0FIABBBUYNASAAQQFqIQAgBCABQQFqIgFHDQALIAMgBTYCAAzMAQsgA0EANgIAIAZBAWohAUEWDAULQYoBIQIgASAERg3KASADKAIAIgAgBCABa2ohBSABIABrQQJqIQYCQANAIAEtAAAgAEHh0wBqLQAARw0EIABBAkYNASAAQQFqIQAgBCABQQFqIgFHDQALIAMgBTYCAAzLAQsgA0EANgIAIAZBAWohAUEQDAQLIAEgBEYEQEGJASECDMoBCwJAAkAgAS0AAEHDAGsODAAGBgYGBgYGBgYGAQYLIAFBAWohAUHvACECDLABCyABQQFqIQFB8AAhAgyvAQtBiAEhAiABIARGDcgBIAMoAgAiACAEIAFraiEFIAEgAGtBBWohBgJAA0AgAS0AACAAQeDSAGotAABHDQIgAEEFRg0BIABBAWohACAEIAFBAWoiAUcNAAsgAyAFNgIADMkBCyADQQA2AgAgBkEBaiEBQSQMAgsgA0EANgIADAILIAEgBEYEQEGHASECDMcBCyABLQAAQcwARw0BIAFBAWohAUETCzoAKSADKAIEIQAgA0EANgIEIAMgACABEC0iAA0CDAELQQAhAiADQQA2AhwgAyABNgIUIANB6R42AhAgA0EGNgIMDMQBC0HuACECDKkBCyADQYYBNgIcIAMgATYCFCADIAA2AgxBACECDMIBC0EAIQACQCADKAI4IgJFDQAgAigCOCICRQ0AIAMgAhEAACEACyAARQ0AIABBFUYNASADQQA2AhwgAyABNgIUIANB1A42AhAgA0EgNgIMQQAhAgzBAQtB7QAhAgymAQsgA0GFATYCHCADIAE2AhQgA0HXGjYCECADQRU2AgxBACECDL8BCyABIARGBEBBhQEhAgy/AQsCQCABLQAAQSBGBEAgAUEBaiEBDAELIANBADYCHCADIAE2AhQgA0GGHjYCECADQQY2AgxBACECDL8BC0ECIQIMpAELA0AgAS0AAEEgRw0CIAQgAUEBaiIBRw0AC0GEASECDL0BCyABIARGBEBBgwEhAgy9AQsCQCABLQAAQQlrDgRAAABAAAtB6wAhAgyiAQsgAy0AKUEFRgRAQewAIQIMogELQeoAIQIMoQELIAEgBEYEQEGCASECDLsBCyADQQ82AgggAyABNgIEDAoLIAEgBEYEQEGBASECDLoBCwJAIAEtAABBCWsOBD0AAD0AC0HpACECDJ8BCyABIARHBEAgA0EPNgIIIAMgATYCBEHnACECDJ8BC0GAASECDLgBCwJAIAEgBEcEQANAIAEtAABB4M4Aai0AACIAQQNHBEACQCAAQQFrDgI/AAQLQeYAIQIMoQELIAQgAUEBaiIBRw0AC0H+ACECDLkBC0H+ACECDLgBCyADQQA2AhwgAyABNgIUIANBxh82AhAgA0EHNgIMQQAhAgy3AQsgASAERgRAQf8AIQIMtwELAkACQAJAIAEtAABB4NAAai0AAEEBaw4DPAIAAQtB6AAhAgyeAQsgA0EANgIcIAMgATYCFCADQYYSNgIQIANBBzYCDEEAIQIMtwELQeAAIQIMnAELIAEgBEcEQCABQQFqIQFB5QAhAgycAQtB/QAhAgy1AQsgBCABIgBGBEBB/AAhAgy1AQsgAC0AACIBQS9GBEAgAEEBaiEBQeQAIQIMmwELIAFBCWsiAkEXSw0BIAAhAUEBIAJ0QZuAgARxDTcMAQsgBCABIgBGBEBB+wAhAgy0AQsgAC0AAEEvRw0AIABBAWohAQwDC0EAIQIgA0EANgIcIAMgADYCFCADQcYfNgIQIANBBzYCDAyyAQsCQAJAAkACQAJAA0AgAS0AAEHgzABqLQAAIgBBBUcEQAJAAkAgAEEBaw4IPQUGBwgABAEIC0HhACECDJ8BCyABQQFqIQFB4wAhAgyeAQsgBCABQQFqIgFHDQALQfoAIQIMtgELIAFBAWoMFAsgAygCBCEAIANBADYCBCADIAAgARArIgBFDR4gA0HbADYCHCADIAE2AhQgAyAANgIMQQAhAgy0AQsgAygCBCEAIANBADYCBCADIAAgARArIgBFDR4gA0HdADYCHCADIAE2AhQgAyAANgIMQQAhAgyzAQsgAygCBCEAIANBADYCBCADIAAgARArIgBFDR4gA0HwADYCHCADIAE2AhQgAyAANgIMQQAhAgyyAQsgA0EANgIcIAMgATYCFCADQcsPNgIQIANBBzYCDEEAIQIMsQELIAEgBEYEQEH5ACECDLEBCwJAIAEtAABB4MwAai0AAEEBaw4INAQFBgAIAgMHCyABQQFqIQELQQMhAgyVAQsgAUEBagwNC0EAIQIgA0EANgIcIANBoxI2AhAgA0EHNgIMIAMgAUEBajYCFAytAQsgAygCBCEAIANBADYCBCADIAAgARArIgBFDRYgA0HbADYCHCADIAE2AhQgAyAANgIMQQAhAgysAQsgAygCBCEAIANBADYCBCADIAAgARArIgBFDRYgA0HdADYCHCADIAE2AhQgAyAANgIMQQAhAgyrAQsgAygCBCEAIANBADYCBCADIAAgARArIgBFDRYgA0HwADYCHCADIAE2AhQgAyAANgIMQQAhAgyqAQsgA0EANgIcIAMgATYCFCADQcsPNgIQIANBBzYCDEEAIQIMqQELQeIAIQIMjgELIAEgBEYEQEH4ACECDKgBCyABQQFqDAILIAEgBEYEQEH3ACECDKcBCyABQQFqDAELIAEgBEYNASABQQFqCyEBQQQhAgyKAQtB9gAhAgyjAQsDQCABLQAAQeDKAGotAAAiAEECRwRAIABBAUcEQEHfACECDIsBCwwnCyAEIAFBAWoiAUcNAAtB9QAhAgyiAQsgASAERgRAQfQAIQIMogELAkAgAS0AAEEJaw43JQMGJQQGBgYGBgYGBgYGBgYGBgYGBgYFBgYCBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGAAYLIAFBAWoLIQFBBSECDIYBCyABQQFqDAYLIAMoAgQhACADQQA2AgQgAyAAIAEQKyIARQ0IIANB2wA2AhwgAyABNgIUIAMgADYCDEEAIQIMngELIAMoAgQhACADQQA2AgQgAyAAIAEQKyIARQ0IIANB3QA2AhwgAyABNgIUIAMgADYCDEEAIQIMnQELIAMoAgQhACADQQA2AgQgAyAAIAEQKyIARQ0IIANB8AA2AhwgAyABNgIUIAMgADYCDEEAIQIMnAELIANBADYCHCADIAE2AhQgA0G8EzYCECADQQc2AgxBACECDJsBCwJAAkACQAJAA0AgAS0AAEHgyABqLQAAIgBBBUcEQAJAIABBAWsOBiQDBAUGAAYLQd4AIQIMhgELIAQgAUEBaiIBRw0AC0HzACECDJ4BCyADKAIEIQAgA0EANgIEIAMgACABECsiAEUNByADQdsANgIcIAMgATYCFCADIAA2AgxBACECDJ0BCyADKAIEIQAgA0EANgIEIAMgACABECsiAEUNByADQd0ANgIcIAMgATYCFCADIAA2AgxBACECDJwBCyADKAIEIQAgA0EANgIEIAMgACABECsiAEUNByADQfAANgIcIAMgATYCFCADIAA2AgxBACECDJsBCyADQQA2AhwgAyABNgIUIANB3Ag2AhAgA0EHNgIMQQAhAgyaAQsgASAERg0BIAFBAWoLIQFBBiECDH4LQfIAIQIMlwELAkACQAJAAkADQCABLQAAQeDGAGotAAAiAEEFRwRAIABBAWsOBB8CAwQFCyAEIAFBAWoiAUcNAAtB8QAhAgyaAQsgAygCBCEAIANBADYCBCADIAAgARArIgBFDQMgA0HbADYCHCADIAE2AhQgAyAANgIMQQAhAgyZAQsgAygCBCEAIANBADYCBCADIAAgARArIgBFDQMgA0HdADYCHCADIAE2AhQgAyAANgIMQQAhAgyYAQsgAygCBCEAIANBADYCBCADIAAgARArIgBFDQMgA0HwADYCHCADIAE2AhQgAyAANgIMQQAhAgyXAQsgA0EANgIcIAMgATYCFCADQbQKNgIQIANBBzYCDEEAIQIMlgELQc4AIQIMewtB0AAhAgx6C0HdACECDHkLIAEgBEYEQEHwACECDJMBCwJAIAEtAABBCWsOBBYAABYACyABQQFqIQFB3AAhAgx4CyABIARGBEBB7wAhAgySAQsCQCABLQAAQQlrDgQVAAAVAAtBACEAAkAgAygCOCICRQ0AIAIoAjAiAkUNACADIAIRAAAhAAsgAEUEQEHTASECDHgLIABBFUcEQCADQQA2AhwgAyABNgIUIANBwQ02AhAgA0EaNgIMQQAhAgySAQsgA0HuADYCHCADIAE2AhQgA0HwGTYCECADQRU2AgxBACECDJEBC0HtACECIAEgBEYNkAEgAygCACIAIAQgAWtqIQUgASAAa0EDaiEGAkADQCABLQAAIABB18YAai0AAEcNBCAAQQNGDQEgAEEBaiEAIAQgAUEBaiIBRw0ACyADIAU2AgAMkQELIANBADYCACAGQQFqIQEgAy0AKSIAQSNrQQtJDQQCQCAAQQZLDQBBASAAdEHKAHFFDQAMBQtBACECIANBADYCHCADIAE2AhQgA0HlCTYCECADQQg2AgwMkAELQewAIQIgASAERg2PASADKAIAIgAgBCABa2ohBSABIABrQQJqIQYCQANAIAEtAAAgAEHUxgBqLQAARw0DIABBAkYNASAAQQFqIQAgBCABQQFqIgFHDQALIAMgBTYCAAyQAQsgA0EANgIAIAZBAWohASADLQApQSFGDQMgA0EANgIcIAMgATYCFCADQYkKNgIQIANBCDYCDEEAIQIMjwELQesAIQIgASAERg2OASADKAIAIgAgBCABa2ohBSABIABrQQNqIQYCQANAIAEtAAAgAEHQxgBqLQAARw0CIABBA0YNASAAQQFqIQAgBCABQQFqIgFHDQALIAMgBTYCAAyPAQsgA0EANgIAIAZBAWohASADLQApIgBBI0kNAiAAQS5GDQIgA0EANgIcIAMgATYCFCADQcEJNgIQIANBCDYCDEEAIQIMjgELIANBADYCAAtBACECIANBADYCHCADIAE2AhQgA0GENzYCECADQQg2AgwMjAELQdgAIQIMcQsgASAERwRAIANBDTYCCCADIAE2AgRB1wAhAgxxC0HqACECDIoBCyABIARGBEBB6QAhAgyKAQsgAS0AAEEwayIAQf8BcUEKSQRAIAMgADoAKiABQQFqIQFB1gAhAgxwCyADKAIEIQAgA0EANgIEIAMgACABEC4iAEUNdCADQegANgIcIAMgATYCFCADIAA2AgxBACECDIkBCyABIARGBEBB5wAhAgyJAQsCQCABLQAAQS5GBEAgAUEBaiEBDAELIAMoAgQhACADQQA2AgQgAyAAIAEQLiIARQ11IANB5gA2AhwgAyABNgIUIAMgADYCDEEAIQIMiQELQdUAIQIMbgsgASAERgRAQeUAIQIMiAELQQAhAEEBIQVBASEHQQAhAgJAAkACQAJAAkACfwJAAkACQAJAAkACQAJAIAEtAABBMGsOCgoJAAECAwQFBggLC0ECDAYLQQMMBQtBBAwEC0EFDAMLQQYMAgtBBwwBC0EICyECQQAhBUEAIQcMAgtBCSECQQEhAEEAIQVBACEHDAELQQAhBUEBIQILIAMgAjoAKyABQQFqIQECQAJAIAMtAC5BEHENAAJAAkACQCADLQAqDgMBAAIECyAHRQ0DDAILIAANAQwCCyAFRQ0BCyADKAIEIQAgA0EANgIEIAMgACABEC4iAEUNAiADQeIANgIcIAMgATYCFCADIAA2AgxBACECDIoBCyADKAIEIQAgA0EANgIEIAMgACABEC4iAEUNdyADQeMANgIcIAMgATYCFCADIAA2AgxBACECDIkBCyADKAIEIQAgA0EANgIEIAMgACABEC4iAEUNdSADQeQANgIcIAMgATYCFCADIAA2AgwMiAELQdMAIQIMbQsgAy0AKUEiRg2AAUHSACECDGwLQQAhAAJAIAMoAjgiAkUNACACKAI8IgJFDQAgAyACEQAAIQALIABFBEBB1AAhAgxsCyAAQRVHBEAgA0EANgIcIAMgATYCFCADQZwNNgIQIANBITYCDEEAIQIMhgELIANB4QA2AhwgAyABNgIUIANB1hk2AhAgA0EVNgIMQQAhAgyFAQsgASAERgRAQeAAIQIMhQELAkACQAJAAkACQCABLQAAQQprDgQBBAQABAsgAUEBaiEBDAELIAFBAWohASADQS9qLQAAQQFxRQ0BC0HRACECDGwLIANBADYCHCADIAE2AhQgA0GIETYCECADQQk2AgxBACECDIUBCyADQQA2AhwgAyABNgIUIANBiBE2AhAgA0EJNgIMQQAhAgyEAQsgASAERgRAQd8AIQIMhAELIAEtAABBCkYEQCABQQFqIQEMCQsgAy0ALkHAAHENCCADQQA2AhwgAyABNgIUIANBiBE2AhAgA0ECNgIMQQAhAgyDAQsgASAERgRAQd0AIQIMgwELIAEtAAAiAkENRgRAIAFBAWohAUHPACECDGkLIAEhACACQQlrDgQFAQEFAQsgBCABIgBGBEBB3AAhAgyCAQsgAC0AAEEKRw0AIABBAWoMAgtBACECIANBADYCHCADIAA2AhQgA0G1LDYCECADQQc2AgwMgAELIAEgBEYEQEHbACECDIABCwJAIAEtAABBCWsOBAMAAAMACyABQQFqCyEBQc0AIQIMZAsgASAERgRAQdoAIQIMfgsgAS0AAEEJaw4EAAEBAAELQQAhAiADQQA2AhwgA0HsETYCECADQQc2AgwgAyABQQFqNgIUDHwLIANBgBI7ASpBACEAAkAgAygCOCICRQ0AIAIoAjAiAkUNACADIAIRAAAhAAsgAEUNACAAQRVHDQEgA0HZADYCHCADIAE2AhQgA0HwGTYCECADQRU2AgxBACECDHsLQcwAIQIMYAsgA0EANgIcIAMgATYCFCADQcENNgIQIANBGjYCDEEAIQIMeQsgASAERgRAQdkAIQIMeQsgAS0AAEEgRw06IAFBAWohASADLQAuQQFxDTogA0EANgIcIAMgATYCFCADQa0bNgIQIANBHjYCDEEAIQIMeAsgASAERgRAQdgAIQIMeAsCQAJAAkACQAJAIAEtAAAiAEEKaw4EAgMD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AkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQCABLQAAQTBrDjcVFAABAgMEBQYHFhYWFhYWFggJCgsMDRYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWDg8QERITFgtCAiEKDBQLQgMhCgwTC0IEIQoMEgtCBSEKDBELQgYhCgwQC0IHIQoMDwtCCCEKDA4LQgkhCgwNC0IKIQoMDAtCCyEKDAsLQgwhCgwKC0INIQoMCQtCDiEKDAgLQg8hCgwHC0IKIQoMBgtCCyEKDAULQgwhCgwEC0INIQoMAwtCDiEKDAILQg8hCgwBC0IBIQoLIAFBAWohASADKQMgIgtC//////////8PWARAIAMgC0IEhiAKhDcDIAwCC0EAIQIgA0EANgIcIAMgATYCFCADQa0JNgIQIANBDDYCDAwfC0ElIQIMBAtBJiECDAMLIAMgAToALCADQQA2AgAgB0EBaiEBQQwhAgwCCyADQQA2AgAgBkEBaiEBQQohAgwBCyABQQFqIQFBCCECDAALAAtBACECIANBADYCHCADIAE2AhQgA0HVEDYCECADQQk2AgwMGAtBACECIANBADYCHCADIAE2AhQgA0HXCjYCECADQQk2AgwMFwtBACECIANBADYCHCADIAE2AhQgA0G/EDYCECADQQk2AgwMFgtBACECIANBADYCHCADIAE2AhQgA0GkETYCECADQQk2AgwMFQtBACECIANBADYCHCADIAE2AhQgA0HVEDYCECADQQk2AgwMFAtBACECIANBADYCHCADIAE2AhQgA0HXCjYCECADQQk2AgwMEwtBACECIANBADYCHCADIAE2AhQgA0G/EDYCECADQQk2AgwMEgtBACECIANBADYCHCADIAE2AhQgA0GkETYCECADQQk2AgwMEQtBACECIANBADYCHCADIAE2AhQgA0G/FjYCECADQQ82AgwMEAtBACECIANBADYCHCADIAE2AhQgA0G/FjYCECADQQ82AgwMDwtBACECIANBADYCHCADIAE2AhQgA0HIEjYCECADQQs2AgwMDgtBACECIANBADYCHCADIAE2AhQgA0GVCTYCECADQQs2AgwMDQtBACECIANBADYCHCADIAE2AhQgA0HpDzYCECADQQo2AgwMDAtBACECIANBADYCHCADIAE2AhQgA0GDEDYCECADQQo2AgwMCwtBACECIANBADYCHCADIAE2AhQgA0GmHDYCECADQQI2AgwMCgtBACECIANBADYCHCADIAE2AhQgA0HFFTYCECADQQI2AgwMCQtBACECIANBADYCHCADIAE2AhQgA0H/FzYCECADQQI2AgwMCAtBACECIANBADYCHCADIAE2AhQgA0HKFzYCECADQQI2AgwMBwsgA0ECNgIcIAMgATYCFCADQZQdNgIQIANBFjYCDEEAIQIMBgtB3gAhAiABIARGDQUgCUEIaiEHIAMoAgAhBQJAAkAgASAERwRAIAVBxsYAaiEIIAQgBWogAWshBiAFQX9zQQpqIgUgAWohAANAIAEtAAAgCC0AAEcEQEECIQgMAwsgBUUEQEEAIQggACEBDAMLIAVBAWshBSAIQQFqIQggBCABQQFqIgFHDQALIAYhBSAEIQELIAdBATYCACADIAU2AgAMAQsgA0EANgIAIAcgCDYCAAsgByABNgIEIAkoAgwhACAJKAIIDgMBBQIACwALIANBADYCHCADQa0dNgIQIANBFzYCDCADIABBAWo2AhRBACECDAMLIANBADYCHCADIAA2AhQgA0HCHTYCECADQQk2AgxBACECDAILIAEgBEYEQEEoIQIMAgsgA0EJNgIIIAMgATYCBEEnIQIMAQsgASAERgRAQQEhAgwBCwNAAkACQAJAIAEtAABBCmsOBAABAQABCyABQQFqIQEMAQsgAUEBaiEBIAMtAC5BIHENAEEAIQIgA0EANgIcIAMgATYCFCADQYwgNgIQIANBBTYCDAwCC0EBIQIgASAERw0ACwsgCUEQaiQAIAJFBEAgAygCDCEADAELIAMgAjYCHEEAIQAgAygCBCIBRQ0AIAMgASAEIAMoAggRAQAiAUUNACADIAQ2AhQgAyABNgIMIAEhAAsgAAu+AgECfyAAQQA6AAAgAEHcAGoiAUEBa0EAOgAAIABBADoAAiAAQQA6AAEgAUEDa0EAOgAAIAFBAmtBADoAACAAQQA6AAMgAUEEa0EAOgAAQQAgAGtBA3EiASAAaiIAQQA2AgBB3AAgAWtBfHEiAiAAaiIBQQRrQQA2AgACQCACQQlJDQAgAEEANgIIIABBADYCBCABQQhrQQA2AgAgAUEMa0EANgIAIAJBGUkNACAAQQA2AhggAEEANgIUIABBADYC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U3BhbiBjYWxsYmFjayBlcnJvciBpbiBvbl9zdGF0dXMASW52YWxpZCByZXNwb25zZSBzdGF0dXMARXhwZWN0ZWQgTEYgYWZ0ZXIgaGVhZGVycwBJbnZhbGlkIGNoYXJhY3RlciBpbiBjaHVuayBleHRlbnNpb25zAFVzZXIgY2FsbGJhY2sgZXJyb3IAYG9uX3Jlc2V0YCBjYWxsYmFjayBlcnJvcgBgb25fY2h1bmtfaGVhZGVyYCBjYWxsYmFjayBlcnJvcgBgb25fbWVzc2FnZV9iZWdpbmAgY2FsbGJhY2sgZXJyb3IAYG9uX2NodW5rX2V4dGVuc2lvbl92YWx1ZWAgY2FsbGJhY2sgZXJyb3IAYG9uX3N0YXR1c19jb21wbGV0ZWAgY2FsbGJhY2sgZXJyb3IAYG9uX3ZlcnNpb25fY29tcGxldGVgIGNhbGxiYWNrIGVycm9yAGBvbl91cmxfY29tcGxldGVgIGNhbGxiYWNrIGVycm9yAGBvbl9jaHVua19jb21wbGV0ZWAgY2FsbGJhY2sgZXJyb3IAYG9uX2hlYWRlcl92YWx1ZV9jb21wbGV0ZWAgY2FsbGJhY2sgZXJyb3IAYG9uX21lc3NhZ2VfY29tcGxldGVgIGNhbGxiYWNrIGVycm9yAGBvbl9tZXRob2RfY29tcGxldGVgIGNhbGxiYWNrIGVycm9yAGBvbl9oZWFkZXJfZmllbGRfY29tcGxldGVgIGNhbGxiYWNrIGVycm9yAGBvbl9jaHVua19leHRlbnNpb25fbmFtZWAgY2FsbGJhY2sgZXJyb3IAVW5leHBlY3RlZCBjaGFyIGluIHVybCBzZXJ2ZXIASW52YWxpZCBoZWFkZXIgdmFsdWUgY2hhcgBJbnZhbGlkIGhlYWRlciBmaWVsZCBjaGFyAFNwYW4gY2FsbGJhY2sgZXJyb3IgaW4gb25fdmVyc2lvbgBJbnZhbGlkIG1pbm9yIHZlcnNpb24ASW52YWxpZCBtYWpvciB2ZXJzaW9uAEV4cGVjdGVkIHNwYWNlIGFmdGVyIHZlcnNpb24ARXhwZWN0ZWQgQ1JMRiBhZnRlciB2ZXJzaW9uAEludmFsaWQgSFRUUCB2ZXJzaW9uAEludmFsaWQgaGVhZGVyIHRva2VuAFNwYW4gY2FsbGJhY2sgZXJyb3IgaW4gb25fdXJsAEludmFsaWQgY2hhcmFjdGVycyBpbiB1cmwAVW5leHBlY3RlZCBzdGFydCBjaGFyIGluIHVybABEb3VibGUgQCBpbiB1cmwARW1wdHkgQ29udGVudC1MZW5ndGgASW52YWxpZCBjaGFyYWN0ZXIgaW4gQ29udGVudC1MZW5ndGgAVHJhbnNmZXItRW5jb2RpbmcgY2FuJ3QgYmUgcHJlc2VudCB3aXRoIENvbnRlbnQtTGVuZ3RoAER1cGxpY2F0ZSBDb250ZW50LUxlbmd0aABJbnZhbGlkIGNoYXIgaW4gdXJsIHBhdGgAQ29udGVudC1MZW5ndGggY2FuJ3QgYmUgcHJlc2VudCB3aXRoIFRyYW5zZmVyLUVuY29kaW5nAE1pc3NpbmcgZXhwZWN0ZWQgQ1IgYWZ0ZXIgY2h1bmsgc2l6ZQBFeHBlY3RlZCBMRiBhZnRlciBjaHVuayBzaXplAEludmFsaWQgY2hhcmFjdGVyIGluIGNodW5rIHNpemUAU3BhbiBjYWxsYmFjayBlcnJvciBpbiBvbl9oZWFkZXJfdmFsdWUAU3BhbiBjYWxsYmFjayBlcnJvciBpbiBvbl9jaHVua19leHRlbnNpb25fdmFsdWUASW52YWxpZCBjaGFyYWN0ZXIgaW4gY2h1bmsgZXh0ZW5zaW9ucyB2YWx1ZQBNaXNzaW5nIGV4cGVjdGVkIENSIGFmdGVyIGhlYWRlciB2YWx1ZQBNaXNzaW5nIGV4cGVjdGVkIExGIGFmdGVyIGhlYWRlciB2YWx1ZQBJbnZhbGlkIGBUcmFuc2Zlci1FbmNvZGluZ2AgaGVhZGVyIHZhbHVlAE1pc3NpbmcgZXhwZWN0ZWQgQ1IgYWZ0ZXIgY2h1bmsgZXh0ZW5zaW9uIHZhbHVlAEludmFsaWQgY2hhcmFjdGVyIGluIGNodW5rIGV4dGVuc2lvbnMgcXVvdGUgdmFsdWUASW52YWxpZCBxdW90ZWQtcGFpciBpbiBjaHVuayBleHRlbnNpb25zIHF1b3RlZCB2YWx1ZQBJbnZhbGlkIGNoYXJhY3RlciBpbiBjaHVuayBleHRlbnNpb25zIHF1b3RlZCB2YWx1ZQBQYXVzZWQgYnkgb25faGVhZGVyc19jb21wbGV0ZQBJbnZhbGlkIEVPRiBzdGF0ZQBvbl9yZXNldCBwYXVzZQBvbl9jaHVua19oZWFkZXIgcGF1c2UAb25fbWVzc2FnZV9iZWdpbiBwYXVzZQBvbl9jaHVua19leHRlbnNpb25fdmFsdWUgcGF1c2UAb25fc3RhdHVzX2NvbXBsZXRlIHBhdXNlAG9uX3ZlcnNpb25fY29tcGxldGUgcGF1c2UAb25fdXJsX2NvbXBsZXRlIHBhdXNlAG9uX2NodW5rX2NvbXBsZXRlIHBhdXNlAG9uX2hlYWRlcl92YWx1ZV9jb21wbGV0ZSBwYXVzZQBvbl9tZXNzYWdlX2NvbXBsZXRlIHBhdXNlAG9uX21ldGhvZF9jb21wbGV0ZSBwYXVzZQBvbl9oZWFkZXJfZmllbGRfY29tcGxldGUgcGF1c2UAb25fY2h1bmtfZXh0ZW5zaW9uX25hbWUgcGF1c2UAVW5leHBlY3RlZCBzcGFjZSBhZnRlciBzdGFydCBsaW5lAE1pc3NpbmcgZXhwZWN0ZWQgQ1IgYWZ0ZXIgcmVzcG9uc2UgbGluZQBTcGFuIGNhbGxiYWNrIGVycm9yIGluIG9uX2NodW5rX2V4dGVuc2lvbl9uYW1lAEludmFsaWQgY2hhcmFjdGVyIGluIGNodW5rIGV4dGVuc2lvbnMgbmFtZQBNaXNzaW5nIGV4cGVjdGVkIENSIGFmdGVyIGNodW5rIGV4dGVuc2lvbiBuYW1lAEludmFsaWQgc3RhdHVzIGNvZGUAUGF1c2Ugb24gQ09OTkVDVC9VcGdyYWRlAFBhdXNlIG9uIFBSSS9VcGdyYWRlAEV4cGVjdGVkIEhUVFAvMiBDb25uZWN0aW9uIFByZWZhY2UAU3BhbiBjYWxsYmFjayBlcnJvciBpbiBvbl9tZXRob2QARXhwZWN0ZWQgc3BhY2UgYWZ0ZXIgbWV0aG9kAFNwYW4gY2FsbGJhY2sgZXJyb3IgaW4gb25faGVhZGVyX2ZpZWxkAFBhdXNlZABJbnZhbGlkIHdvcmQgZW5jb3VudGVyZWQASW52YWxpZCBtZXRob2QgZW5jb3VudGVyZWQATWlzc2luZyBleHBlY3RlZCBDUiBhZnRlciBjaHVuayBkYXRhAEV4cGVjdGVkIExGIGFmdGVyIGNodW5rIGRhdGEAVW5leHBlY3RlZCBjaGFyIGluIHVybCBzY2hlbWEAUmVxdWVzdCBoYXMgaW52YWxpZCBgVHJhbnNmZXItRW5jb2RpbmdgAERhdGEgYWZ0ZXIgYENvbm5lY3Rpb246IGNsb3NlYABTV0lUQ0hfUFJPWFkAVVNFX1BST1hZAE1LQUNUSVZJVFkAVU5QUk9DRVNTQUJMRV9FTlRJVFkAUVVFUlkAQ09QWQBNT1ZFRF9QRVJNQU5FTlRMWQBUT09fRUFSTFkATk9USUZZAEZBSUxFRF9ERVBFTkRFTkNZAEJBRF9HQVRFV0FZAFBMQVkAUFVUAENIRUNLT1VUAEdBVEVXQVlfVElNRU9VVABSRVFVRVNUX1RJTUVPVVQATkVUV09SS19DT05ORUNUX1RJTUVPVVQAQ09OTkVDVElPTl9USU1FT1VUAExPR0lOX1RJTUVPVVQATkVUV09SS19SRUFEX1RJTUVPVVQAUE9TVABNSVNESVJFQ1RFRF9SRVFVRVNUAENMSUVOVF9DTE9TRURfUkVRVUVTVABDTElFTlRfQ0xPU0VEX0xPQURfQkFMQU5DRURfUkVRVUVTVABCQURfUkVRVUVTVABIVFRQX1JFUVVFU1RfU0VOVF9UT19IVFRQU19QT1JUAFJFUE9SVABJTV9BX1RFQVBPVABSRVNFVF9DT05URU5UAE5PX0NPTlRFTlQAUEFSVElBTF9DT05URU5UAEhQRV9JTlZBTElEX0NPTlNUQU5UAEhQRV9DQl9SRVNFVABHRVQASFBFX1NUUklDVABDT05GTElDVABURU1QT1JBUllfUkVESVJFQ1QAUEVSTUFORU5UX1JFRElSRUNUAENPTk5FQ1QATVVMVElfU1RBVFVTAEhQRV9JTlZBTElEX1NUQVRVUwBUT09fTUFOWV9SRVFVRVNUUwBFQVJMWV9ISU5UUwBVTkFWQUlMQUJMRV9GT1JfTEVHQUxfUkVBU09OUwBPUFRJT05TAFNXSVRDSElOR19QUk9UT0NPTFMAVkFSSUFOVF9BTFNPX05FR09USUFURVMATVVMVElQTEVfQ0hPSUNFUwBJTlRFUk5BTF9TRVJWRVJfRVJST1IAV0VCX1NFUlZFUl9VTktOT1dOX0VSUk9SAFJBSUxHVU5fRVJST1IASURFTlRJVFlfUFJPVklERVJfQVVUSEVOVElDQVRJT05fRVJST1IAU1NMX0NFUlRJRklDQVRFX0VSUk9SAElOVkFMSURfWF9GT1JXQVJERURfRk9SAFNFVF9QQVJBTUVURVIAR0VUX1BBUkFNRVRFUgBIUEVfVVNFUgBTRUVfT1RIRVIASFBFX0NCX0NIVU5LX0hFQURFUgBFeHBlY3RlZCBMRiBhZnRlciBDUgBNS0NBTEVOREFSAFNFVFVQAFdFQl9TRVJWRVJfSVNfRE9XTgBURUFSRE9XTgBIUEVfQ0xPU0VEX0NPTk5FQ1RJT04ASEVVUklTVElDX0VYUElSQVRJT04ARElTQ09OTkVDVEVEX09QRVJBVElPTgBOT05fQVVUSE9SSVRBVElWRV9JTkZPUk1BVElPTgBIUEVfSU5WQUxJRF9WRVJTSU9OAEhQRV9DQl9NRVNTQUdFX0JFR0lOAFNJVEVfSVNfRlJPWkVOAEhQRV9JTlZBTElEX0hFQURFUl9UT0tFTgBJTlZBTElEX1RPS0VOAEZPUkJJRERFTgBFTkhBTkNFX1lPVVJfQ0FMTQBIUEVfSU5WQUxJRF9VUkwAQkxPQ0tFRF9CWV9QQVJFTlRBTF9DT05UUk9MAE1LQ09MAEFDTABIUEVfSU5URVJOQUwAUkVRVUVTVF9IRUFERVJfRklFTERTX1RPT19MQVJHRV9VTk9GRklDSUFMAEhQRV9PSwBVTkxJTksAVU5MT0NLAFBSSQBSRVRSWV9XSVRIAEhQRV9JTlZBTElEX0NPTlRFTlRfTEVOR1RIAEhQRV9VTkVYUEVDVEVEX0NPTlRFTlRfTEVOR1RIAEZMVVNIAFBST1BQQVRDSABNLVNFQVJDSABVUklfVE9PX0xPTkcAUFJPQ0VTU0lORwBNSVNDRUxMQU5FT1VTX1BFUlNJU1RFTlRfV0FSTklORwBNSVNDRUxMQU5FT1VTX1dBUk5JTkcASFBFX0lOVkFMSURfVFJBTlNGRVJfRU5DT0RJTkcARXhwZWN0ZWQgQ1JMRgBIUEVfSU5WQUxJRF9DSFVOS19TSVpFAE1PVkUAQ09OVElOVUUASFBFX0NCX1NUQVRVU19DT01QTEVURQBIUEVfQ0JfSEVBREVSU19DT01QTEVURQBIUEVfQ0JfVkVSU0lPTl9DT01QTEVURQBIUEVfQ0JfVVJMX0NPTVBMRVRFAEhQRV9DQl9DSFVOS19DT01QTEVURQBIUEVfQ0JfSEVBREVSX1ZBTFVFX0NPTVBMRVRFAEhQRV9DQl9DSFVOS19FWFRFTlNJT05fVkFMVUVfQ09NUExFVEUASFBFX0NCX0NIVU5LX0VYVEVOU0lPTl9OQU1FX0NPTVBMRVRFAEhQRV9DQl9NRVNTQUdFX0NPTVBMRVRFAEhQRV9DQl9NRVRIT0RfQ09NUExFVEUASFBFX0NCX0hFQURFUl9GSUVMRF9DT01QTEVURQBERUxFVEUASFBFX0lOVkFMSURfRU9GX1NUQVRFAElOVkFMSURfU1NMX0NFUlRJRklDQVRFAFBBVVNFAE5PX1JFU1BPTlNFAFVOU1VQUE9SVEVEX01FRElBX1RZUEUAR09ORQBOT1RfQUNDRVBUQUJMRQBTRVJWSUNFX1VOQVZBSUxBQkxFAFJBTkdFX05PVF9TQVRJU0ZJQUJMRQBPUklHSU5fSVNfVU5SRUFDSEFCTEUAUkVTUE9OU0VfSVNfU1RBTEUAUFVSR0UATUVSR0UAUkVRVUVTVF9IRUFERVJfRklFTERTX1RPT19MQVJHRQBSRVFVRVNUX0hFQURFUl9UT09fTEFSR0UAUEFZTE9BRF9UT09fTEFSR0UASU5TVUZGSUNJRU5UX1NUT1JBR0UASFBFX1BBVVNFRF9VUEdSQURFAEhQRV9QQVVTRURfSDJfVVBHUkFERQBTT1VSQ0UAQU5OT1VOQ0UAVFJBQ0UASFBFX1VORVhQRUNURURfU1BBQ0UAREVTQ1JJQkUAVU5TVUJTQ1JJQkUAUkVDT1JEAEhQRV9JTlZBTElEX01FVEhPRABOT1RfRk9VTkQAUFJPUEZJTkQAVU5CSU5EAFJFQklORABVTkFVVEhPUklaRUQATUVUSE9EX05PVF9BTExPV0VEAEhUVFBfVkVSU0lPTl9OT1RfU1VQUE9SVEVEAEFMUkVBRFlfUkVQT1JURUQAQUNDRVBURUQATk9UX0lNUExFTUVOVEVEAExPT1BfREVURUNURUQASFBFX0NSX0VYUEVDVEVEAEhQRV9MRl9FWFBFQ1RFRABDUkVBVEVEAElNX1VTRUQASFBFX1BBVVNFRABUSU1FT1VUX09DQ1VSRUQAUEFZTUVOVF9SRVFVSVJFRABQUkVDT05ESVRJT05fUkVRVUlSRUQAUFJPWFlfQVVUSEVOVElDQVRJT05fUkVRVUlSRUQATkVUV09SS19BVVRIRU5USUNBVElPTl9SRVFVSVJFRABMRU5HVEhfUkVRVUlSRUQAU1NMX0NFUlRJRklDQVRFX1JFUVVJUkVEAFVQR1JBREVfUkVRVUlSRUQAUEFHRV9FWFBJUkVEAFBSRUNPTkRJVElPTl9GQUlMRUQARVhQRUNUQVRJT05fRkFJTEVEAFJFVkFMSURBVElPTl9GQUlMRUQAU1NMX0hBTkRTSEFLRV9GQUlMRUQATE9DS0VEAFRSQU5TRk9STUFUSU9OX0FQUExJRUQATk9UX01PRElGSUVEAE5PVF9FWFRFTkRFRABCQU5EV0lEVEhfTElNSVRfRVhDRUVERUQAU0lURV9JU19PVkVSTE9BREVEAEhFQUQARXhwZWN0ZWQgSFRUUC8AAFIVAAAaFQAADxIAAOQZAACRFQAACRQAAC0ZAADkFAAA6REAAGkUAAChFAAAdhUAAEMWAABeEgAAlBcAABcWAAB9FAAAfxYAAEEXAACzEwAAwxYAAAQaAAC9GAAA0BgAAKATAADUGQAArxYAAGgWAABwFwAA2RYAAPwYAAD+EQAAWRcAAJcWAAAcFwAA9hYAAI0XAAALEgAAfxsAAC4RAACzEAAASRIAAK0SAAD2GAAAaBAAAGIVAAAQFQAAWhYAAEoZAAC1FQAAwRUAAGAVAABcGQAAWhkAAFMZAAAWFQAArREAAEIQAAC3EAAAVxgAAL8VAACJEAAAHBkAABoZAAC5FQAAURgAANwTAABbFQAAWRUAAOYYAABnFQAAERkAAO0YAADnEwAArhAAAMIXAAAAFAAAkhMAAIQTAABAEgAAJhkAAK8VAABiEABB6TkLAQEAQYA6C+ABAQECAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAwEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAQeo7CwQBAAACAEGBPAteAwQDAwMDAwAAAwMAAwMAAwMDAwMDAwMDAwAFAAAAAAADAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwAAAAMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAAMAAwBB6j0LBAEAAAIAQYE+C14DAAMDAwMDAAADAwADAwADAwMDAwMDAwMDAAQABQAAAAMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAAAAAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMAAwADAEHgPwsNbG9zZWVlcC1hbGl2ZQBB+T8LAQEAQZDAAAvgAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAEH5wQALAQEAQZDCAAvnAQEBAQEBAQEBAQEBAQIBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBY2h1bmtlZABBocQAC14BAAEBAQEBAAABAQABAQABAQEBAQEBAQEBAAAAAAAAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAQABAEGAxgALIWVjdGlvbmVudC1sZW5ndGhvbnJveHktY29ubmVjdGlvbgBBsMYACytyYW5zZmVyLWVuY29kaW5ncGdyYWRlDQoNClNNDQoNClRUUC9DRS9UU1AvAEHpxgALBQECAAEDAEGAxwALXwQFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFAEHpyAALBQECAAEDAEGAyQALXwQFBQYFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFAEHpygALBAEAAAEAQYHLAAteAgIAAgICAgICAgICAgICAgICAgICAgICAgICAgICAAICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgBB6cwACwUBAgABAwBBgM0AC18EBQAABQUFBQUFBQUFBQUGBQUFBQUFBQUFBQUFAAUABwgFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUABQAFAAUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFAAAABQBB6c4ACwUBAQABAQBBgM8ACwEBAEGazwALQQIAAAAAAAADAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwAAAAAAAAMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAEHp0AALBQEBAAEBAEGA0QALAQEAQYrRAAsGAgAAAAACAEGh0QALOgMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAAAAAAAAAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMAQeDSAAuaAU5PVU5DRUVDS09VVE5FQ1RFVEVDUklCRUxVU0hFVEVBRFNFQVJDSFJHRUNUSVZJVFlMRU5EQVJWRU9USUZZUFRJT05TQ0hTRUFZU1RBVENIR0VVRVJZT1JESVJFQ1RPUlRSQ0hQQVJBTUVURVJVUkNFQlNDUklCRUFSRE9XTkFDRUlORE5LQ0tVQlNDUklCRUhUVFAvQURUUC8=";
    var wasmBuffer;
    Object.defineProperty(module2, "exports", {
      get: () => {
        return wasmBuffer ? wasmBuffer : wasmBuffer = Buffer2.from(wasmBase64, "base64");
      }
    });
  }
});

// node_modules/undici/lib/web/fetch/constants.js
var require_constants3 = __commonJS({
  "node_modules/undici/lib/web/fetch/constants.js"(exports2, module2) {
    "use strict";
    var corsSafeListedMethods = (
      /** @type {const} */
      ["GET", "HEAD", "POST"]
    );
    var corsSafeListedMethodsSet = new Set(corsSafeListedMethods);
    var nullBodyStatus = (
      /** @type {const} */
      [101, 204, 205, 304]
    );
    var redirectStatus = (
      /** @type {const} */
      [301, 302, 303, 307, 308]
    );
    var redirectStatusSet = new Set(redirectStatus);
    var badPorts = (
      /** @type {const} */
      [
        "1",
        "7",
        "9",
        "11",
        "13",
        "15",
        "17",
        "19",
        "20",
        "21",
        "22",
        "23",
        "25",
        "37",
        "42",
        "43",
        "53",
        "69",
        "77",
        "79",
        "87",
        "95",
        "101",
        "102",
        "103",
        "104",
        "109",
        "110",
        "111",
        "113",
        "115",
        "117",
        "119",
        "123",
        "135",
        "137",
        "139",
        "143",
        "161",
        "179",
        "389",
        "427",
        "465",
        "512",
        "513",
        "514",
        "515",
        "526",
        "530",
        "531",
        "532",
        "540",
        "548",
        "554",
        "556",
        "563",
        "587",
        "601",
        "636",
        "989",
        "990",
        "993",
        "995",
        "1719",
        "1720",
        "1723",
        "2049",
        "3659",
        "4045",
        "4190",
        "5060",
        "5061",
        "6000",
        "6566",
        "6665",
        "6666",
        "6667",
        "6668",
        "6669",
        "6679",
        "6697",
        "10080"
      ]
    );
    var badPortsSet = new Set(badPorts);
    var referrerPolicyTokens = (
      /** @type {const} */
      [
        "no-referrer",
        "no-referrer-when-downgrade",
        "same-origin",
        "origin",
        "strict-origin",
        "origin-when-cross-origin",
        "strict-origin-when-cross-origin",
        "unsafe-url"
      ]
    );
    var referrerPolicy = (
      /** @type {const} */
      [
        "",
        ...referrerPolicyTokens
      ]
    );
    var referrerPolicyTokensSet = new Set(referrerPolicyTokens);
    var requestRedirect = (
      /** @type {const} */
      ["follow", "manual", "error"]
    );
    var safeMethods = (
      /** @type {const} */
      ["GET", "HEAD", "OPTIONS", "TRACE"]
    );
    var safeMethodsSet = new Set(safeMethods);
    var requestMode = (
      /** @type {const} */
      ["navigate", "same-origin", "no-cors", "cors"]
    );
    var requestCredentials = (
      /** @type {const} */
      ["omit", "same-origin", "include"]
    );
    var requestCache = (
      /** @type {const} */
      [
        "default",
        "no-store",
        "reload",
        "no-cache",
        "force-cache",
        "only-if-cached"
      ]
    );
    var requestBodyHeader = (
      /** @type {const} */
      [
        "content-encoding",
        "content-language",
        "content-location",
        "content-type",
        // See https://github.com/nodejs/undici/issues/2021
        // 'Content-Length' is a forbidden header name, which is typically
        // removed in the Headers implementation. However, undici doesn't
        // filter out headers, so we add it here.
        "content-length"
      ]
    );
    var requestDuplex = (
      /** @type {const} */
      [
        "half"
      ]
    );
    var forbiddenMethods = (
      /** @type {const} */
      ["CONNECT", "TRACE", "TRACK"]
    );
    var forbiddenMethodsSet = new Set(forbiddenMethods);
    var subresource = (
      /** @type {const} */
      [
        "audio",
        "audioworklet",
        "font",
        "image",
        "manifest",
        "paintworklet",
        "script",
        "style",
        "track",
        "video",
        "xslt",
        ""
      ]
    );
    var subresourceSet = new Set(subresource);
    module2.exports = {
      subresource,
      forbiddenMethods,
      requestBodyHeader,
      referrerPolicy,
      requestRedirect,
      requestMode,
      requestCredentials,
      requestCache,
      redirectStatus,
      corsSafeListedMethods,
      nullBodyStatus,
      safeMethods,
      badPorts,
      requestDuplex,
      subresourceSet,
      badPortsSet,
      redirectStatusSet,
      corsSafeListedMethodsSet,
      safeMethodsSet,
      forbiddenMethodsSet,
      referrerPolicyTokens: referrerPolicyTokensSet
    };
  }
});

// node_modules/undici/lib/web/fetch/global.js
var require_global = __commonJS({
  "node_modules/undici/lib/web/fetch/global.js"(exports2, module2) {
    "use strict";
    var globalOrigin = Symbol.for("undici.globalOrigin.1");
    function getGlobalOrigin() {
      return globalThis[globalOrigin];
    }
    function setGlobalOrigin(newOrigin) {
      if (newOrigin === void 0) {
        Object.defineProperty(globalThis, globalOrigin, {
          value: void 0,
          writable: true,
          enumerable: false,
          configurable: false
        });
        return;
      }
      const parsedURL = new URL(newOrigin);
      if (parsedURL.protocol !== "http:" && parsedURL.protocol !== "https:") {
        throw new TypeError(`Only http & https urls are allowed, received ${parsedURL.protocol}`);
      }
      Object.defineProperty(globalThis, globalOrigin, {
        value: parsedURL,
        writable: true,
        enumerable: false,
        configurable: false
      });
    }
    module2.exports = {
      getGlobalOrigin,
      setGlobalOrigin
    };
  }
});

// node_modules/undici/lib/web/fetch/data-url.js
var require_data_url = __commonJS({
  "node_modules/undici/lib/web/fetch/data-url.js"(exports2, module2) {
    "use strict";
    var assert = require("node:assert");
    var encoder = new TextEncoder();
    var HTTP_TOKEN_CODEPOINTS = /^[!#$%&'*+\-.^_|~A-Za-z0-9]+$/;
    var HTTP_WHITESPACE_REGEX = /[\u000A\u000D\u0009\u0020]/;
    var ASCII_WHITESPACE_REPLACE_REGEX = /[\u0009\u000A\u000C\u000D\u0020]/g;
    var HTTP_QUOTED_STRING_TOKENS = /^[\u0009\u0020-\u007E\u0080-\u00FF]+$/;
    function dataURLProcessor(dataURL) {
      assert(dataURL.protocol === "data:");
      let input = URLSerializer(dataURL, true);
      input = input.slice(5);
      const position = { position: 0 };
      let mimeType = collectASequenceOfCodePointsFast(
        ",",
        input,
        position
      );
      const mimeTypeLength = mimeType.length;
      mimeType = removeASCIIWhitespace(mimeType, true, true);
      if (position.position >= input.length) {
        return "failure";
      }
      position.position++;
      const encodedBody = input.slice(mimeTypeLength + 1);
      let body = stringPercentDecode(encodedBody);
      if (/;(\u0020){0,}base64$/i.test(mimeType)) {
        const stringBody = isomorphicDecode(body);
        body = forgivingBase64(stringBody);
        if (body === "failure") {
          return "failure";
        }
        mimeType = mimeType.slice(0, -6);
        mimeType = mimeType.replace(/(\u0020)+$/, "");
        mimeType = mimeType.slice(0, -1);
      }
      if (mimeType.startsWith(";")) {
        mimeType = "text/plain" + mimeType;
      }
      let mimeTypeRecord = parseMIMEType(mimeType);
      if (mimeTypeRecord === "failure") {
        mimeTypeRecord = parseMIMEType("text/plain;charset=US-ASCII");
      }
      return { mimeType: mimeTypeRecord, body };
    }
    function URLSerializer(url, excludeFragment = false) {
      if (!excludeFragment) {
        return url.href;
      }
      const href = url.href;
      const hashLength = url.hash.length;
      const serialized = hashLength === 0 ? href : href.substring(0, href.length - hashLength);
      if (!hashLength && href.endsWith("#")) {
        return serialized.slice(0, -1);
      }
      return serialized;
    }
    function collectASequenceOfCodePoints(condition, input, position) {
      let result = "";
      while (position.position < input.length && condition(input[position.position])) {
        result += input[position.position];
        position.position++;
      }
      return result;
    }
    function collectASequenceOfCodePointsFast(char, input, position) {
      const idx = input.indexOf(char, position.position);
      const start = position.position;
      if (idx === -1) {
        position.position = input.length;
        return input.slice(start);
      }
      position.position = idx;
      return input.slice(start, position.position);
    }
    function stringPercentDecode(input) {
      const bytes = encoder.encode(input);
      return percentDecode(bytes);
    }
    function isHexCharByte(byte) {
      return byte >= 48 && byte <= 57 || byte >= 65 && byte <= 70 || byte >= 97 && byte <= 102;
    }
    function hexByteToNumber(byte) {
      return (
        // 0-9
        byte >= 48 && byte <= 57 ? byte - 48 : (byte & 223) - 55
      );
    }
    function percentDecode(input) {
      const length = input.length;
      const output = new Uint8Array(length);
      let j = 0;
      for (let i = 0; i < length; ++i) {
        const byte = input[i];
        if (byte !== 37) {
          output[j++] = byte;
        } else if (byte === 37 && !(isHexCharByte(input[i + 1]) && isHexCharByte(input[i + 2]))) {
          output[j++] = 37;
        } else {
          output[j++] = hexByteToNumber(input[i + 1]) << 4 | hexByteToNumber(input[i + 2]);
          i += 2;
        }
      }
      return length === j ? output : output.subarray(0, j);
    }
    function parseMIMEType(input) {
      input = removeHTTPWhitespace(input, true, true);
      const position = { position: 0 };
      const type = collectASequenceOfCodePointsFast(
        "/",
        input,
        position
      );
      if (type.length === 0 || !HTTP_TOKEN_CODEPOINTS.test(type)) {
        return "failure";
      }
      if (position.position >= input.length) {
        return "failure";
      }
      position.position++;
      let subtype = collectASequenceOfCodePointsFast(
        ";",
        input,
        position
      );
      subtype = removeHTTPWhitespace(subtype, false, true);
      if (subtype.length === 0 || !HTTP_TOKEN_CODEPOINTS.test(subtype)) {
        return "failure";
      }
      const typeLowercase = type.toLowerCase();
      const subtypeLowercase = subtype.toLowerCase();
      const mimeType = {
        type: typeLowercase,
        subtype: subtypeLowercase,
        /** @type {Map<string, string>} */
        parameters: /* @__PURE__ */ new Map(),
        // https://mimesniff.spec.whatwg.org/#mime-type-essence
        essence: `${typeLowercase}/${subtypeLowercase}`
      };
      while (position.position < input.length) {
        position.position++;
        collectASequenceOfCodePoints(
          // https://fetch.spec.whatwg.org/#http-whitespace
          (char) => HTTP_WHITESPACE_REGEX.test(char),
          input,
          position
        );
        let parameterName = collectASequenceOfCodePoints(
          (char) => char !== ";" && char !== "=",
          input,
          position
        );
        parameterName = parameterName.toLowerCase();
        if (position.position < input.length) {
          if (input[position.position] === ";") {
            continue;
          }
          position.position++;
        }
        if (position.position >= input.length) {
          break;
        }
        let parameterValue = null;
        if (input[position.position] === '"') {
          parameterValue = collectAnHTTPQuotedString(input, position, true);
          collectASequenceOfCodePointsFast(
            ";",
            input,
            position
          );
        } else {
          parameterValue = collectASequenceOfCodePointsFast(
            ";",
            input,
            position
          );
          parameterValue = removeHTTPWhitespace(parameterValue, false, true);
          if (parameterValue.length === 0) {
            continue;
          }
        }
        if (parameterName.length !== 0 && HTTP_TOKEN_CODEPOINTS.test(parameterName) && (parameterValue.length === 0 || HTTP_QUOTED_STRING_TOKENS.test(parameterValue)) && !mimeType.parameters.has(parameterName)) {
          mimeType.parameters.set(parameterName, parameterValue);
        }
      }
      return mimeType;
    }
    function forgivingBase64(data) {
      data = data.replace(ASCII_WHITESPACE_REPLACE_REGEX, "");
      let dataLength = data.length;
      if (dataLength % 4 === 0) {
        if (data.charCodeAt(dataLength - 1) === 61) {
          --dataLength;
          if (data.charCodeAt(dataLength - 1) === 61) {
            --dataLength;
          }
        }
      }
      if (dataLength % 4 === 1) {
        return "failure";
      }
      if (/[^+/0-9A-Za-z]/.test(data.length === dataLength ? data : data.substring(0, dataLength))) {
        return "failure";
      }
      const buffer = Buffer.from(data, "base64");
      return new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);
    }
    function collectAnHTTPQuotedString(input, position, extractValue = false) {
      const positionStart = position.position;
      let value = "";
      assert(input[position.position] === '"');
      position.position++;
      while (true) {
        value += collectASequenceOfCodePoints(
          (char) => char !== '"' && char !== "\\",
          input,
          position
        );
        if (position.position >= input.length) {
          break;
        }
        const quoteOrBackslash = input[position.position];
        position.position++;
        if (quoteOrBackslash === "\\") {
          if (position.position >= input.length) {
            value += "\\";
            break;
          }
          value += input[position.position];
          position.position++;
        } else {
          assert(quoteOrBackslash === '"');
          break;
        }
      }
      if (extractValue) {
        return value;
      }
      return input.slice(positionStart, position.position);
    }
    function serializeAMimeType(mimeType) {
      assert(mimeType !== "failure");
      const { parameters, essence } = mimeType;
      let serialization = essence;
      for (let [name, value] of parameters.entries()) {
        serialization += ";";
        serialization += name;
        serialization += "=";
        if (!HTTP_TOKEN_CODEPOINTS.test(value)) {
          value = value.replace(/(\\|")/g, "\\$1");
          value = '"' + value;
          value += '"';
        }
        serialization += value;
      }
      return serialization;
    }
    function isHTTPWhiteSpace(char) {
      return char === 13 || char === 10 || char === 9 || char === 32;
    }
    function removeHTTPWhitespace(str, leading = true, trailing = true) {
      return removeChars(str, leading, trailing, isHTTPWhiteSpace);
    }
    function isASCIIWhitespace(char) {
      return char === 13 || char === 10 || char === 9 || char === 12 || char === 32;
    }
    function removeASCIIWhitespace(str, leading = true, trailing = true) {
      return removeChars(str, leading, trailing, isASCIIWhitespace);
    }
    function removeChars(str, leading, trailing, predicate) {
      let lead = 0;
      let trail = str.length - 1;
      if (leading) {
        while (lead < str.length && predicate(str.charCodeAt(lead))) lead++;
      }
      if (trailing) {
        while (trail > 0 && predicate(str.charCodeAt(trail))) trail--;
      }
      return lead === 0 && trail === str.length - 1 ? str : str.slice(lead, trail + 1);
    }
    function isomorphicDecode(input) {
      const length = input.length;
      if ((2 << 15) - 1 > length) {
        return String.fromCharCode.apply(null, input);
      }
      let result = "";
      let i = 0;
      let addition = (2 << 15) - 1;
      while (i < length) {
        if (i + addition > length) {
          addition = length - i;
        }
        result += String.fromCharCode.apply(null, input.subarray(i, i += addition));
      }
      return result;
    }
    function minimizeSupportedMimeType(mimeType) {
      switch (mimeType.essence) {
        case "application/ecmascript":
        case "application/javascript":
        case "application/x-ecmascript":
        case "application/x-javascript":
        case "text/ecmascript":
        case "text/javascript":
        case "text/javascript1.0":
        case "text/javascript1.1":
        case "text/javascript1.2":
        case "text/javascript1.3":
        case "text/javascript1.4":
        case "text/javascript1.5":
        case "text/jscript":
        case "text/livescript":
        case "text/x-ecmascript":
        case "text/x-javascript":
          return "text/javascript";
        case "application/json":
        case "text/json":
          return "application/json";
        case "image/svg+xml":
          return "image/svg+xml";
        case "text/xml":
        case "application/xml":
          return "application/xml";
      }
      if (mimeType.subtype.endsWith("+json")) {
        return "application/json";
      }
      if (mimeType.subtype.endsWith("+xml")) {
        return "application/xml";
      }
      return "";
    }
    module2.exports = {
      dataURLProcessor,
      URLSerializer,
      collectASequenceOfCodePoints,
      collectASequenceOfCodePointsFast,
      stringPercentDecode,
      parseMIMEType,
      collectAnHTTPQuotedString,
      serializeAMimeType,
      removeChars,
      removeHTTPWhitespace,
      minimizeSupportedMimeType,
      HTTP_TOKEN_CODEPOINTS,
      isomorphicDecode
    };
  }
});

// node_modules/undici/lib/web/webidl/index.js
var require_webidl = __commonJS({
  "node_modules/undici/lib/web/webidl/index.js"(exports2, module2) {
    "use strict";
    var { types, inspect } = require("node:util");
    var { markAsUncloneable } = require("node:worker_threads");
    var UNDEFINED = 1;
    var BOOLEAN = 2;
    var STRING = 3;
    var SYMBOL = 4;
    var NUMBER = 5;
    var BIGINT = 6;
    var NULL = 7;
    var OBJECT = 8;
    var FunctionPrototypeSymbolHasInstance = Function.call.bind(Function.prototype[Symbol.hasInstance]);
    var webidl = {
      converters: {},
      util: {},
      errors: {},
      is: {}
    };
    webidl.errors.exception = function(message) {
      return new TypeError(`${message.header}: ${message.message}`);
    };
    webidl.errors.conversionFailed = function(opts) {
      const plural = opts.types.length === 1 ? "" : " one of";
      const message = `${opts.argument} could not be converted to${plural}: ${opts.types.join(", ")}.`;
      return webidl.errors.exception({
        header: opts.prefix,
        message
      });
    };
    webidl.errors.invalidArgument = function(context) {
      return webidl.errors.exception({
        header: context.prefix,
        message: `"${context.value}" is an invalid ${context.type}.`
      });
    };
    webidl.brandCheck = function(V, I) {
      if (!FunctionPrototypeSymbolHasInstance(I, V)) {
        const err = new TypeError("Illegal invocation");
        err.code = "ERR_INVALID_THIS";
        throw err;
      }
    };
    webidl.brandCheckMultiple = function(List) {
      const prototypes = List.map((c) => webidl.util.MakeTypeAssertion(c));
      return (V) => {
        if (prototypes.every((typeCheck) => !typeCheck(V))) {
          const err = new TypeError("Illegal invocation");
          err.code = "ERR_INVALID_THIS";
          throw err;
        }
      };
    };
    webidl.argumentLengthCheck = function({ length }, min, ctx) {
      if (length < min) {
        throw webidl.errors.exception({
          message: `${min} argument${min !== 1 ? "s" : ""} required, but${length ? " only" : ""} ${length} found.`,
          header: ctx
        });
      }
    };
    webidl.illegalConstructor = function() {
      throw webidl.errors.exception({
        header: "TypeError",
        message: "Illegal constructor"
      });
    };
    webidl.util.MakeTypeAssertion = function(I) {
      return (O) => FunctionPrototypeSymbolHasInstance(I, O);
    };
    webidl.util.Type = function(V) {
      switch (typeof V) {
        case "undefined":
          return UNDEFINED;
        case "boolean":
          return BOOLEAN;
        case "string":
          return STRING;
        case "symbol":
          return SYMBOL;
        case "number":
          return NUMBER;
        case "bigint":
          return BIGINT;
        case "function":
        case "object": {
          if (V === null) {
            return NULL;
          }
          return OBJECT;
        }
      }
    };
    webidl.util.Types = {
      UNDEFINED,
      BOOLEAN,
      STRING,
      SYMBOL,
      NUMBER,
      BIGINT,
      NULL,
      OBJECT
    };
    webidl.util.TypeValueToString = function(o) {
      switch (webidl.util.Type(o)) {
        case UNDEFINED:
          return "Undefined";
        case BOOLEAN:
          return "Boolean";
        case STRING:
          return "String";
        case SYMBOL:
          return "Symbol";
        case NUMBER:
          return "Number";
        case BIGINT:
          return "BigInt";
        case NULL:
          return "Null";
        case OBJECT:
          return "Object";
      }
    };
    webidl.util.markAsUncloneable = markAsUncloneable || (() => {
    });
    webidl.util.ConvertToInt = function(V, bitLength, signedness, opts) {
      let upperBound;
      let lowerBound;
      if (bitLength === 64) {
        upperBound = Math.pow(2, 53) - 1;
        if (signedness === "unsigned") {
          lowerBound = 0;
        } else {
          lowerBound = Math.pow(-2, 53) + 1;
        }
      } else if (signedness === "unsigned") {
        lowerBound = 0;
        upperBound = Math.pow(2, bitLength) - 1;
      } else {
        lowerBound = Math.pow(-2, bitLength) - 1;
        upperBound = Math.pow(2, bitLength - 1) - 1;
      }
      let x = Number(V);
      if (x === 0) {
        x = 0;
      }
      if (opts?.enforceRange === true) {
        if (Number.isNaN(x) || x === Number.POSITIVE_INFINITY || x === Number.NEGATIVE_INFINITY) {
          throw webidl.errors.exception({
            header: "Integer conversion",
            message: `Could not convert ${webidl.util.Stringify(V)} to an integer.`
          });
        }
        x = webidl.util.IntegerPart(x);
        if (x < lowerBound || x > upperBound) {
          throw webidl.errors.exception({
            header: "Integer conversion",
            message: `Value must be between ${lowerBound}-${upperBound}, got ${x}.`
          });
        }
        return x;
      }
      if (!Number.isNaN(x) && opts?.clamp === true) {
        x = Math.min(Math.max(x, lowerBound), upperBound);
        if (Math.floor(x) % 2 === 0) {
          x = Math.floor(x);
        } else {
          x = Math.ceil(x);
        }
        return x;
      }
      if (Number.isNaN(x) || x === 0 && Object.is(0, x) || x === Number.POSITIVE_INFINITY || x === Number.NEGATIVE_INFINITY) {
        return 0;
      }
      x = webidl.util.IntegerPart(x);
      x = x % Math.pow(2, bitLength);
      if (signedness === "signed" && x >= Math.pow(2, bitLength) - 1) {
        return x - Math.pow(2, bitLength);
      }
      return x;
    };
    webidl.util.IntegerPart = function(n) {
      const r = Math.floor(Math.abs(n));
      if (n < 0) {
        return -1 * r;
      }
      return r;
    };
    webidl.util.Stringify = function(V) {
      const type = webidl.util.Type(V);
      switch (type) {
        case SYMBOL:
          return `Symbol(${V.description})`;
        case OBJECT:
          return inspect(V);
        case STRING:
          return `"${V}"`;
        case BIGINT:
          return `${V}n`;
        default:
          return `${V}`;
      }
    };
    webidl.sequenceConverter = function(converter) {
      return (V, prefix, argument, Iterable) => {
        if (webidl.util.Type(V) !== OBJECT) {
          throw webidl.errors.exception({
            header: prefix,
            message: `${argument} (${webidl.util.Stringify(V)}) is not iterable.`
          });
        }
        const method = typeof Iterable === "function" ? Iterable() : V?.[Symbol.iterator]?.();
        const seq = [];
        let index = 0;
        if (method === void 0 || typeof method.next !== "function") {
          throw webidl.errors.exception({
            header: prefix,
            message: `${argument} is not iterable.`
          });
        }
        while (true) {
          const { done, value } = method.next();
          if (done) {
            break;
          }
          seq.push(converter(value, prefix, `${argument}[${index++}]`));
        }
        return seq;
      };
    };
    webidl.recordConverter = function(keyConverter, valueConverter) {
      return (O, prefix, argument) => {
        if (webidl.util.Type(O) !== OBJECT) {
          throw webidl.errors.exception({
            header: prefix,
            message: `${argument} ("${webidl.util.TypeValueToString(O)}") is not an Object.`
          });
        }
        const result = {};
        if (!types.isProxy(O)) {
          const keys2 = [...Object.getOwnPropertyNames(O), ...Object.getOwnPropertySymbols(O)];
          for (const key of keys2) {
            const keyName = webidl.util.Stringify(key);
            const typedKey = keyConverter(key, prefix, `Key ${keyName} in ${argument}`);
            const typedValue = valueConverter(O[key], prefix, `${argument}[${keyName}]`);
            result[typedKey] = typedValue;
          }
          return result;
        }
        const keys = Reflect.ownKeys(O);
        for (const key of keys) {
          const desc = Reflect.getOwnPropertyDescriptor(O, key);
          if (desc?.enumerable) {
            const typedKey = keyConverter(key, prefix, argument);
            const typedValue = valueConverter(O[key], prefix, argument);
            result[typedKey] = typedValue;
          }
        }
        return result;
      };
    };
    webidl.interfaceConverter = function(TypeCheck, name) {
      return (V, prefix, argument) => {
        if (!TypeCheck(V)) {
          throw webidl.errors.exception({
            header: prefix,
            message: `Expected ${argument} ("${webidl.util.Stringify(V)}") to be an instance of ${name}.`
          });
        }
        return V;
      };
    };
    webidl.dictionaryConverter = function(converters) {
      return (dictionary, prefix, argument) => {
        const dict = {};
        if (dictionary != null && webidl.util.Type(dictionary) !== OBJECT) {
          throw webidl.errors.exception({
            header: prefix,
            message: `Expected ${dictionary} to be one of: Null, Undefined, Object.`
          });
        }
        for (const options of converters) {
          const { key, defaultValue, required, converter } = options;
          if (required === true) {
            if (dictionary == null || !Object.hasOwn(dictionary, key)) {
              throw webidl.errors.exception({
                header: prefix,
                message: `Missing required key "${key}".`
              });
            }
          }
          let value = dictionary?.[key];
          const hasDefault = defaultValue !== void 0;
          if (hasDefault && value === void 0) {
            value = defaultValue();
          }
          if (required || hasDefault || value !== void 0) {
            value = converter(value, prefix, `${argument}.${key}`);
            if (options.allowedValues && !options.allowedValues.includes(value)) {
              throw webidl.errors.exception({
                header: prefix,
                message: `${value} is not an accepted type. Expected one of ${options.allowedValues.join(", ")}.`
              });
            }
            dict[key] = value;
          }
        }
        return dict;
      };
    };
    webidl.nullableConverter = function(converter) {
      return (V, prefix, argument) => {
        if (V === null) {
          return V;
        }
        return converter(V, prefix, argument);
      };
    };
    webidl.is.USVString = function(value) {
      return typeof value === "string" && value.isWellFormed();
    };
    webidl.is.ReadableStream = webidl.util.MakeTypeAssertion(ReadableStream);
    webidl.is.Blob = webidl.util.MakeTypeAssertion(Blob);
    webidl.is.URLSearchParams = webidl.util.MakeTypeAssertion(URLSearchParams);
    webidl.is.File = webidl.util.MakeTypeAssertion(globalThis.File ?? require("node:buffer").File);
    webidl.is.URL = webidl.util.MakeTypeAssertion(URL);
    webidl.is.AbortSignal = webidl.util.MakeTypeAssertion(AbortSignal);
    webidl.is.MessagePort = webidl.util.MakeTypeAssertion(MessagePort);
    webidl.converters.DOMString = function(V, prefix, argument, opts) {
      if (V === null && opts?.legacyNullToEmptyString) {
        return "";
      }
      if (typeof V === "symbol") {
        throw webidl.errors.exception({
          header: prefix,
          message: `${argument} is a symbol, which cannot be converted to a DOMString.`
        });
      }
      return String(V);
    };
    webidl.converters.ByteString = function(V, prefix, argument) {
      if (typeof V === "symbol") {
        throw webidl.errors.exception({
          header: prefix,
          message: `${argument} is a symbol, which cannot be converted to a ByteString.`
        });
      }
      const x = String(V);
      for (let index = 0; index < x.length; index++) {
        if (x.charCodeAt(index) > 255) {
          throw new TypeError(
            `Cannot convert argument to a ByteString because the character at index ${index} has a value of ${x.charCodeAt(index)} which is greater than 255.`
          );
        }
      }
      return x;
    };
    webidl.converters.USVString = function(value) {
      if (typeof value === "string") {
        return value.toWellFormed();
      }
      return `${value}`.toWellFormed();
    };
    webidl.converters.boolean = function(V) {
      const x = Boolean(V);
      return x;
    };
    webidl.converters.any = function(V) {
      return V;
    };
    webidl.converters["long long"] = function(V, prefix, argument) {
      const x = webidl.util.ConvertToInt(V, 64, "signed", void 0, prefix, argument);
      return x;
    };
    webidl.converters["unsigned long long"] = function(V, prefix, argument) {
      const x = webidl.util.ConvertToInt(V, 64, "unsigned", void 0, prefix, argument);
      return x;
    };
    webidl.converters["unsigned long"] = function(V, prefix, argument) {
      const x = webidl.util.ConvertToInt(V, 32, "unsigned", void 0, prefix, argument);
      return x;
    };
    webidl.converters["unsigned short"] = function(V, prefix, argument, opts) {
      const x = webidl.util.ConvertToInt(V, 16, "unsigned", opts, prefix, argument);
      return x;
    };
    webidl.converters.ArrayBuffer = function(V, prefix, argument, opts) {
      if (webidl.util.Type(V) !== OBJECT || !types.isAnyArrayBuffer(V)) {
        throw webidl.errors.conversionFailed({
          prefix,
          argument: `${argument} ("${webidl.util.Stringify(V)}")`,
          types: ["ArrayBuffer"]
        });
      }
      if (opts?.allowShared === false && types.isSharedArrayBuffer(V)) {
        throw webidl.errors.exception({
          header: "ArrayBuffer",
          message: "SharedArrayBuffer is not allowed."
        });
      }
      if (V.resizable || V.growable) {
        throw webidl.errors.exception({
          header: "ArrayBuffer",
          message: "Received a resizable ArrayBuffer."
        });
      }
      return V;
    };
    webidl.converters.TypedArray = function(V, T, prefix, name, opts) {
      if (webidl.util.Type(V) !== OBJECT || !types.isTypedArray(V) || V.constructor.name !== T.name) {
        throw webidl.errors.conversionFailed({
          prefix,
          argument: `${name} ("${webidl.util.Stringify(V)}")`,
          types: [T.name]
        });
      }
      if (opts?.allowShared === false && types.isSharedArrayBuffer(V.buffer)) {
        throw webidl.errors.exception({
          header: "ArrayBuffer",
          message: "SharedArrayBuffer is not allowed."
        });
      }
      if (V.buffer.resizable || V.buffer.growable) {
        throw webidl.errors.exception({
          header: "ArrayBuffer",
          message: "Received a resizable ArrayBuffer."
        });
      }
      return V;
    };
    webidl.converters.DataView = function(V, prefix, name, opts) {
      if (webidl.util.Type(V) !== OBJECT || !types.isDataView(V)) {
        throw webidl.errors.exception({
          header: prefix,
          message: `${name} is not a DataView.`
        });
      }
      if (opts?.allowShared === false && types.isSharedArrayBuffer(V.buffer)) {
        throw webidl.errors.exception({
          header: "ArrayBuffer",
          message: "SharedArrayBuffer is not allowed."
        });
      }
      if (V.buffer.resizable || V.buffer.growable) {
        throw webidl.errors.exception({
          header: "ArrayBuffer",
          message: "Received a resizable ArrayBuffer."
        });
      }
      return V;
    };
    webidl.converters["sequence<ByteString>"] = webidl.sequenceConverter(
      webidl.converters.ByteString
    );
    webidl.converters["sequence<sequence<ByteString>>"] = webidl.sequenceConverter(
      webidl.converters["sequence<ByteString>"]
    );
    webidl.converters["record<ByteString, ByteString>"] = webidl.recordConverter(
      webidl.converters.ByteString,
      webidl.converters.ByteString
    );
    webidl.converters.Blob = webidl.interfaceConverter(webidl.is.Blob, "Blob");
    webidl.converters.AbortSignal = webidl.interfaceConverter(
      webidl.is.AbortSignal,
      "AbortSignal"
    );
    module2.exports = {
      webidl
    };
  }
});

// node_modules/undici/lib/web/fetch/util.js
var require_util2 = __commonJS({
  "node_modules/undici/lib/web/fetch/util.js"(exports2, module2) {
    "use strict";
    var { Transform } = require("node:stream");
    var zlib = require("node:zlib");
    var { redirectStatusSet, referrerPolicyTokens, badPortsSet } = require_constants3();
    var { getGlobalOrigin } = require_global();
    var { collectASequenceOfCodePoints, collectAnHTTPQuotedString, removeChars, parseMIMEType } = require_data_url();
    var { performance: performance2 } = require("node:perf_hooks");
    var { ReadableStreamFrom, isValidHTTPToken, normalizedMethodRecordsBase } = require_util();
    var assert = require("node:assert");
    var { isUint8Array } = require("node:util/types");
    var { webidl } = require_webidl();
    var supportedHashes = [];
    var crypto;
    try {
      crypto = require("node:crypto");
      const possibleRelevantHashes = ["sha256", "sha384", "sha512"];
      supportedHashes = crypto.getHashes().filter((hash) => possibleRelevantHashes.includes(hash));
    } catch {
    }
    function responseURL(response) {
      const urlList = response.urlList;
      const length = urlList.length;
      return length === 0 ? null : urlList[length - 1].toString();
    }
    function responseLocationURL(response, requestFragment) {
      if (!redirectStatusSet.has(response.status)) {
        return null;
      }
      let location = response.headersList.get("location", true);
      if (location !== null && isValidHeaderValue(location)) {
        if (!isValidEncodedURL(location)) {
          location = normalizeBinaryStringToUtf8(location);
        }
        location = new URL(location, responseURL(response));
      }
      if (location && !location.hash) {
        location.hash = requestFragment;
      }
      return location;
    }
    function isValidEncodedURL(url) {
      for (let i = 0; i < url.length; ++i) {
        const code = url.charCodeAt(i);
        if (code > 126 || // Non-US-ASCII + DEL
        code < 32) {
          return false;
        }
      }
      return true;
    }
    function normalizeBinaryStringToUtf8(value) {
      return Buffer.from(value, "binary").toString("utf8");
    }
    function requestCurrentURL(request) {
      return request.urlList[request.urlList.length - 1];
    }
    function requestBadPort(request) {
      const url = requestCurrentURL(request);
      if (urlIsHttpHttpsScheme(url) && badPortsSet.has(url.port)) {
        return "blocked";
      }
      return "allowed";
    }
    function isErrorLike(object) {
      return object instanceof Error || (object?.constructor?.name === "Error" || object?.constructor?.name === "DOMException");
    }
    function isValidReasonPhrase(statusText) {
      for (let i = 0; i < statusText.length; ++i) {
        const c = statusText.charCodeAt(i);
        if (!(c === 9 || // HTAB
        c >= 32 && c <= 126 || // SP / VCHAR
        c >= 128 && c <= 255)) {
          return false;
        }
      }
      return true;
    }
    var isValidHeaderName = isValidHTTPToken;
    function isValidHeaderValue(potentialValue) {
      return (potentialValue[0] === "	" || potentialValue[0] === " " || potentialValue[potentialValue.length - 1] === "	" || potentialValue[potentialValue.length - 1] === " " || potentialValue.includes("\n") || potentialValue.includes("\r") || potentialValue.includes("\0")) === false;
    }
    function parseReferrerPolicy(actualResponse) {
      const policyHeader = (actualResponse.headersList.get("referrer-policy", true) ?? "").split(",");
      let policy = "";
      if (policyHeader.length) {
        for (let i = policyHeader.length; i !== 0; i--) {
          const token = policyHeader[i - 1].trim();
          if (referrerPolicyTokens.has(token)) {
            policy = token;
            break;
          }
        }
      }
      return policy;
    }
    function setRequestReferrerPolicyOnRedirect(request, actualResponse) {
      const policy = parseReferrerPolicy(actualResponse);
      if (policy !== "") {
        request.referrerPolicy = policy;
      }
    }
    function crossOriginResourcePolicyCheck() {
      return "allowed";
    }
    function corsCheck() {
      return "success";
    }
    function TAOCheck() {
      return "success";
    }
    function appendFetchMetadata(httpRequest) {
      let header = null;
      header = httpRequest.mode;
      httpRequest.headersList.set("sec-fetch-mode", header, true);
    }
    function appendRequestOriginHeader(request) {
      let serializedOrigin = request.origin;
      if (serializedOrigin === "client" || serializedOrigin === void 0) {
        return;
      }
      if (request.responseTainting === "cors" || request.mode === "websocket") {
        request.headersList.append("origin", serializedOrigin, true);
      } else if (request.method !== "GET" && request.method !== "HEAD") {
        switch (request.referrerPolicy) {
          case "no-referrer":
            serializedOrigin = null;
            break;
          case "no-referrer-when-downgrade":
          case "strict-origin":
          case "strict-origin-when-cross-origin":
            if (request.origin && urlHasHttpsScheme(request.origin) && !urlHasHttpsScheme(requestCurrentURL(request))) {
              serializedOrigin = null;
            }
            break;
          case "same-origin":
            if (!sameOrigin(request, requestCurrentURL(request))) {
              serializedOrigin = null;
            }
            break;
          default:
        }
        request.headersList.append("origin", serializedOrigin, true);
      }
    }
    function coarsenTime(timestamp, crossOriginIsolatedCapability) {
      return timestamp;
    }
    function clampAndCoarsenConnectionTimingInfo(connectionTimingInfo, defaultStartTime, crossOriginIsolatedCapability) {
      if (!connectionTimingInfo?.startTime || connectionTimingInfo.startTime < defaultStartTime) {
        return {
          domainLookupStartTime: defaultStartTime,
          domainLookupEndTime: defaultStartTime,
          connectionStartTime: defaultStartTime,
          connectionEndTime: defaultStartTime,
          secureConnectionStartTime: defaultStartTime,
          ALPNNegotiatedProtocol: connectionTimingInfo?.ALPNNegotiatedProtocol
        };
      }
      return {
        domainLookupStartTime: coarsenTime(connectionTimingInfo.domainLookupStartTime, crossOriginIsolatedCapability),
        domainLookupEndTime: coarsenTime(connectionTimingInfo.domainLookupEndTime, crossOriginIsolatedCapability),
        connectionStartTime: coarsenTime(connectionTimingInfo.connectionStartTime, crossOriginIsolatedCapability),
        connectionEndTime: coarsenTime(connectionTimingInfo.connectionEndTime, crossOriginIsolatedCapability),
        secureConnectionStartTime: coarsenTime(connectionTimingInfo.secureConnectionStartTime, crossOriginIsolatedCapability),
        ALPNNegotiatedProtocol: connectionTimingInfo.ALPNNegotiatedProtocol
      };
    }
    function coarsenedSharedCurrentTime(crossOriginIsolatedCapability) {
      return coarsenTime(performance2.now(), crossOriginIsolatedCapability);
    }
    function createOpaqueTimingInfo(timingInfo) {
      return {
        startTime: timingInfo.startTime ?? 0,
        redirectStartTime: 0,
        redirectEndTime: 0,
        postRedirectStartTime: timingInfo.startTime ?? 0,
        finalServiceWorkerStartTime: 0,
        finalNetworkResponseStartTime: 0,
        finalNetworkRequestStartTime: 0,
        endTime: 0,
        encodedBodySize: 0,
        decodedBodySize: 0,
        finalConnectionTimingInfo: null
      };
    }
    function makePolicyContainer() {
      return {
        referrerPolicy: "strict-origin-when-cross-origin"
      };
    }
    function clonePolicyContainer(policyContainer) {
      return {
        referrerPolicy: policyContainer.referrerPolicy
      };
    }
    function determineRequestsReferrer(request) {
      const policy = request.referrerPolicy;
      assert(policy);
      let referrerSource = null;
      if (request.referrer === "client") {
        const globalOrigin = getGlobalOrigin();
        if (!globalOrigin || globalOrigin.origin === "null") {
          return "no-referrer";
        }
        referrerSource = new URL(globalOrigin);
      } else if (webidl.is.URL(request.referrer)) {
        referrerSource = request.referrer;
      }
      let referrerURL = stripURLForReferrer(referrerSource);
      const referrerOrigin = stripURLForReferrer(referrerSource, true);
      if (referrerURL.toString().length > 4096) {
        referrerURL = referrerOrigin;
      }
      switch (policy) {
        case "no-referrer":
          return "no-referrer";
        case "origin":
          if (referrerOrigin != null) {
            return referrerOrigin;
          }
          return stripURLForReferrer(referrerSource, true);
        case "unsafe-url":
          return referrerURL;
        case "strict-origin": {
          const currentURL = requestCurrentURL(request);
          if (isURLPotentiallyTrustworthy(referrerURL) && !isURLPotentiallyTrustworthy(currentURL)) {
            return "no-referrer";
          }
          return referrerOrigin;
        }
        case "strict-origin-when-cross-origin": {
          const currentURL = requestCurrentURL(request);
          if (sameOrigin(referrerURL, currentURL)) {
            return referrerURL;
          }
          if (isURLPotentiallyTrustworthy(referrerURL) && !isURLPotentiallyTrustworthy(currentURL)) {
            return "no-referrer";
          }
          return referrerOrigin;
        }
        case "same-origin":
          if (sameOrigin(request, referrerURL)) {
            return referrerURL;
          }
          return "no-referrer";
        case "origin-when-cross-origin":
          if (sameOrigin(request, referrerURL)) {
            return referrerURL;
          }
          return referrerOrigin;
        case "no-referrer-when-downgrade": {
          const currentURL = requestCurrentURL(request);
          if (isURLPotentiallyTrustworthy(referrerURL) && !isURLPotentiallyTrustworthy(currentURL)) {
            return "no-referrer";
          }
          return referrerOrigin;
        }
      }
    }
    function stripURLForReferrer(url, originOnly = false) {
      assert(webidl.is.URL(url));
      url = new URL(url);
      if (urlIsLocal(url)) {
        return "no-referrer";
      }
      url.username = "";
      url.password = "";
      url.hash = "";
      if (originOnly === true) {
        url.pathname = "";
        url.search = "";
      }
      return url;
    }
    var potentialleTrustworthyIPv4RegExp = new RegExp("^(?:(?:127\\.)(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\\.){2}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[1-9]))$");
    var potentialleTrustworthyIPv6RegExp = new RegExp("^(?:(?:(?:0{1,4}):){7}(?:(?:0{0,3}1))|(?:(?:0{1,4}):){1,6}(?::(?:0{0,3}1))|(?:::(?:0{0,3}1))|)$");
    function isOriginIPPotentiallyTrustworthy(origin) {
      if (origin.includes(":")) {
        if (origin[0] === "[" && origin[origin.length - 1] === "]") {
          origin = origin.slice(1, -1);
        }
        return potentialleTrustworthyIPv6RegExp.test(origin);
      }
      return potentialleTrustworthyIPv4RegExp.test(origin);
    }
    function isOriginPotentiallyTrustworthy(origin) {
      if (origin == null || origin === "null") {
        return false;
      }
      origin = new URL(origin);
      if (origin.protocol === "https:" || origin.protocol === "wss:") {
        return true;
      }
      if (isOriginIPPotentiallyTrustworthy(origin.hostname)) {
        return true;
      }
      if (origin.hostname === "localhost" || origin.hostname === "localhost.") {
        return true;
      }
      if (origin.hostname.endsWith(".localhost") || origin.hostname.endsWith(".localhost.")) {
        return true;
      }
      if (origin.protocol === "file:") {
        return true;
      }
      return false;
    }
    function isURLPotentiallyTrustworthy(url) {
      if (!webidl.is.URL(url)) {
        return false;
      }
      if (url.href === "about:blank" || url.href === "about:srcdoc") {
        return true;
      }
      if (url.protocol === "data:") return true;
      if (url.protocol === "blob:") return true;
      return isOriginPotentiallyTrustworthy(url.origin);
    }
    function bytesMatch(bytes, metadataList) {
      if (crypto === void 0) {
        return true;
      }
      const parsedMetadata = parseMetadata(metadataList);
      if (parsedMetadata === "no metadata") {
        return true;
      }
      if (parsedMetadata.length === 0) {
        return true;
      }
      const strongest = getStrongestMetadata(parsedMetadata);
      const metadata = filterMetadataListByAlgorithm(parsedMetadata, strongest);
      for (const item of metadata) {
        const algorithm = item.algo;
        const expectedValue = item.hash;
        let actualValue = crypto.createHash(algorithm).update(bytes).digest("base64");
        if (actualValue[actualValue.length - 1] === "=") {
          if (actualValue[actualValue.length - 2] === "=") {
            actualValue = actualValue.slice(0, -2);
          } else {
            actualValue = actualValue.slice(0, -1);
          }
        }
        if (compareBase64Mixed(actualValue, expectedValue)) {
          return true;
        }
      }
      return false;
    }
    var parseHashWithOptions = /(?<algo>sha256|sha384|sha512)-((?<hash>[A-Za-z0-9+/]+|[A-Za-z0-9_-]+)={0,2}(?:\s|$)( +[!-~]*)?)?/i;
    function parseMetadata(metadata) {
      const result = [];
      let empty = true;
      for (const token of metadata.split(" ")) {
        empty = false;
        const parsedToken = parseHashWithOptions.exec(token);
        if (parsedToken === null || parsedToken.groups === void 0 || parsedToken.groups.algo === void 0) {
          continue;
        }
        const algorithm = parsedToken.groups.algo.toLowerCase();
        if (supportedHashes.includes(algorithm)) {
          result.push(parsedToken.groups);
        }
      }
      if (empty === true) {
        return "no metadata";
      }
      return result;
    }
    function getStrongestMetadata(metadataList) {
      let algorithm = metadataList[0].algo;
      if (algorithm[3] === "5") {
        return algorithm;
      }
      for (let i = 1; i < metadataList.length; ++i) {
        const metadata = metadataList[i];
        if (metadata.algo[3] === "5") {
          algorithm = "sha512";
          break;
        } else if (algorithm[3] === "3") {
          continue;
        } else if (metadata.algo[3] === "3") {
          algorithm = "sha384";
        }
      }
      return algorithm;
    }
    function filterMetadataListByAlgorithm(metadataList, algorithm) {
      if (metadataList.length === 1) {
        return metadataList;
      }
      let pos = 0;
      for (let i = 0; i < metadataList.length; ++i) {
        if (metadataList[i].algo === algorithm) {
          metadataList[pos++] = metadataList[i];
        }
      }
      metadataList.length = pos;
      return metadataList;
    }
    function compareBase64Mixed(actualValue, expectedValue) {
      if (actualValue.length !== expectedValue.length) {
        return false;
      }
      for (let i = 0; i < actualValue.length; ++i) {
        if (actualValue[i] !== expectedValue[i]) {
          if (actualValue[i] === "+" && expectedValue[i] === "-" || actualValue[i] === "/" && expectedValue[i] === "_") {
            continue;
          }
          return false;
        }
      }
      return true;
    }
    function tryUpgradeRequestToAPotentiallyTrustworthyURL(request) {
    }
    function sameOrigin(A, B) {
      if (A.origin === B.origin && A.origin === "null") {
        return true;
      }
      if (A.protocol === B.protocol && A.hostname === B.hostname && A.port === B.port) {
        return true;
      }
      return false;
    }
    function createDeferredPromise() {
      let res;
      let rej;
      const promise = new Promise((resolve, reject) => {
        res = resolve;
        rej = reject;
      });
      return { promise, resolve: res, reject: rej };
    }
    function isAborted(fetchParams) {
      return fetchParams.controller.state === "aborted";
    }
    function isCancelled(fetchParams) {
      return fetchParams.controller.state === "aborted" || fetchParams.controller.state === "terminated";
    }
    function normalizeMethod(method) {
      return normalizedMethodRecordsBase[method.toLowerCase()] ?? method;
    }
    function serializeJavascriptValueToJSONString(value) {
      const result = JSON.stringify(value);
      if (result === void 0) {
        throw new TypeError("Value is not JSON serializable");
      }
      assert(typeof result === "string");
      return result;
    }
    var esIteratorPrototype = Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]()));
    function createIterator(name, kInternalIterator, keyIndex = 0, valueIndex = 1) {
      class FastIterableIterator {
        /** @type {any} */
        #target;
        /** @type {'key' | 'value' | 'key+value'} */
        #kind;
        /** @type {number} */
        #index;
        /**
         * @see https://webidl.spec.whatwg.org/#dfn-default-iterator-object
         * @param {unknown} target
         * @param {'key' | 'value' | 'key+value'} kind
         */
        constructor(target, kind) {
          this.#target = target;
          this.#kind = kind;
          this.#index = 0;
        }
        next() {
          if (typeof this !== "object" || this === null || !(#target in this)) {
            throw new TypeError(
              `'next' called on an object that does not implement interface ${name} Iterator.`
            );
          }
          const index = this.#index;
          const values = kInternalIterator(this.#target);
          const len = values.length;
          if (index >= len) {
            return {
              value: void 0,
              done: true
            };
          }
          const { [keyIndex]: key, [valueIndex]: value } = values[index];
          this.#index = index + 1;
          let result;
          switch (this.#kind) {
            case "key":
              result = key;
              break;
            case "value":
              result = value;
              break;
            case "key+value":
              result = [key, value];
              break;
          }
          return {
            value: result,
            done: false
          };
        }
      }
      delete FastIterableIterator.prototype.constructor;
      Object.setPrototypeOf(FastIterableIterator.prototype, esIteratorPrototype);
      Object.defineProperties(FastIterableIterator.prototype, {
        [Symbol.toStringTag]: {
          writable: false,
          enumerable: false,
          configurable: true,
          value: `${name} Iterator`
        },
        next: { writable: true, enumerable: true, configurable: true }
      });
      return function(target, kind) {
        return new FastIterableIterator(target, kind);
      };
    }
    function iteratorMixin(name, object, kInternalIterator, keyIndex = 0, valueIndex = 1) {
      const makeIterator = createIterator(name, kInternalIterator, keyIndex, valueIndex);
      const properties = {
        keys: {
          writable: true,
          enumerable: true,
          configurable: true,
          value: function keys() {
            webidl.brandCheck(this, object);
            return makeIterator(this, "key");
          }
        },
        values: {
          writable: true,
          enumerable: true,
          configurable: true,
          value: function values() {
            webidl.brandCheck(this, object);
            return makeIterator(this, "value");
          }
        },
        entries: {
          writable: true,
          enumerable: true,
          configurable: true,
          value: function entries() {
            webidl.brandCheck(this, object);
            return makeIterator(this, "key+value");
          }
        },
        forEach: {
          writable: true,
          enumerable: true,
          configurable: true,
          value: function forEach(callbackfn, thisArg = globalThis) {
            webidl.brandCheck(this, object);
            webidl.argumentLengthCheck(arguments, 1, `${name}.forEach`);
            if (typeof callbackfn !== "function") {
              throw new TypeError(
                `Failed to execute 'forEach' on '${name}': parameter 1 is not of type 'Function'.`
              );
            }
            for (const { 0: key, 1: value } of makeIterator(this, "key+value")) {
              callbackfn.call(thisArg, value, key, this);
            }
          }
        }
      };
      return Object.defineProperties(object.prototype, {
        ...properties,
        [Symbol.iterator]: {
          writable: true,
          enumerable: false,
          configurable: true,
          value: properties.entries.value
        }
      });
    }
    function fullyReadBody(body, processBody, processBodyError) {
      const successSteps = processBody;
      const errorSteps = processBodyError;
      let reader;
      try {
        reader = body.stream.getReader();
      } catch (e) {
        errorSteps(e);
        return;
      }
      readAllBytes(reader, successSteps, errorSteps);
    }
    function readableStreamClose(controller) {
      try {
        controller.close();
        controller.byobRequest?.respond(0);
      } catch (err) {
        if (!err.message.includes("Controller is already closed") && !err.message.includes("ReadableStream is already closed")) {
          throw err;
        }
      }
    }
    var invalidIsomorphicEncodeValueRegex = /[^\x00-\xFF]/;
    function isomorphicEncode(input) {
      assert(!invalidIsomorphicEncodeValueRegex.test(input));
      return input;
    }
    async function readAllBytes(reader, successSteps, failureSteps) {
      const bytes = [];
      let byteLength = 0;
      try {
        do {
          const { done, value: chunk } = await reader.read();
          if (done) {
            successSteps(Buffer.concat(bytes, byteLength));
            return;
          }
          if (!isUint8Array(chunk)) {
            failureSteps(new TypeError("Received non-Uint8Array chunk"));
            return;
          }
          bytes.push(chunk);
          byteLength += chunk.length;
        } while (true);
      } catch (e) {
        failureSteps(e);
      }
    }
    function urlIsLocal(url) {
      assert("protocol" in url);
      const protocol = url.protocol;
      return protocol === "about:" || protocol === "blob:" || protocol === "data:";
    }
    function urlHasHttpsScheme(url) {
      return typeof url === "string" && url[5] === ":" && url[0] === "h" && url[1] === "t" && url[2] === "t" && url[3] === "p" && url[4] === "s" || url.protocol === "https:";
    }
    function urlIsHttpHttpsScheme(url) {
      assert("protocol" in url);
      const protocol = url.protocol;
      return protocol === "http:" || protocol === "https:";
    }
    function simpleRangeHeaderValue(value, allowWhitespace) {
      const data = value;
      if (!data.startsWith("bytes")) {
        return "failure";
      }
      const position = { position: 5 };
      if (allowWhitespace) {
        collectASequenceOfCodePoints(
          (char) => char === "	" || char === " ",
          data,
          position
        );
      }
      if (data.charCodeAt(position.position) !== 61) {
        return "failure";
      }
      position.position++;
      if (allowWhitespace) {
        collectASequenceOfCodePoints(
          (char) => char === "	" || char === " ",
          data,
          position
        );
      }
      const rangeStart = collectASequenceOfCodePoints(
        (char) => {
          const code = char.charCodeAt(0);
          return code >= 48 && code <= 57;
        },
        data,
        position
      );
      const rangeStartValue = rangeStart.length ? Number(rangeStart) : null;
      if (allowWhitespace) {
        collectASequenceOfCodePoints(
          (char) => char === "	" || char === " ",
          data,
          position
        );
      }
      if (data.charCodeAt(position.position) !== 45) {
        return "failure";
      }
      position.position++;
      if (allowWhitespace) {
        collectASequenceOfCodePoints(
          (char) => char === "	" || char === " ",
          data,
          position
        );
      }
      const rangeEnd = collectASequenceOfCodePoints(
        (char) => {
          const code = char.charCodeAt(0);
          return code >= 48 && code <= 57;
        },
        data,
        position
      );
      const rangeEndValue = rangeEnd.length ? Number(rangeEnd) : null;
      if (position.position < data.length) {
        return "failure";
      }
      if (rangeEndValue === null && rangeStartValue === null) {
        return "failure";
      }
      if (rangeStartValue > rangeEndValue) {
        return "failure";
      }
      return { rangeStartValue, rangeEndValue };
    }
    function buildContentRange(rangeStart, rangeEnd, fullLength) {
      let contentRange = "bytes ";
      contentRange += isomorphicEncode(`${rangeStart}`);
      contentRange += "-";
      contentRange += isomorphicEncode(`${rangeEnd}`);
      contentRange += "/";
      contentRange += isomorphicEncode(`${fullLength}`);
      return contentRange;
    }
    var InflateStream = class extends Transform {
      #zlibOptions;
      /** @param {zlib.ZlibOptions} [zlibOptions] */
      constructor(zlibOptions) {
        super();
        this.#zlibOptions = zlibOptions;
      }
      _transform(chunk, encoding, callback) {
        if (!this._inflateStream) {
          if (chunk.length === 0) {
            callback();
            return;
          }
          this._inflateStream = (chunk[0] & 15) === 8 ? zlib.createInflate(this.#zlibOptions) : zlib.createInflateRaw(this.#zlibOptions);
          this._inflateStream.on("data", this.push.bind(this));
          this._inflateStream.on("end", () => this.push(null));
          this._inflateStream.on("error", (err) => this.destroy(err));
        }
        this._inflateStream.write(chunk, encoding, callback);
      }
      _final(callback) {
        if (this._inflateStream) {
          this._inflateStream.end();
          this._inflateStream = null;
        }
        callback();
      }
    };
    function createInflate(zlibOptions) {
      return new InflateStream(zlibOptions);
    }
    function extractMimeType(headers) {
      let charset = null;
      let essence = null;
      let mimeType = null;
      const values = getDecodeSplit("content-type", headers);
      if (values === null) {
        return "failure";
      }
      for (const value of values) {
        const temporaryMimeType = parseMIMEType(value);
        if (temporaryMimeType === "failure" || temporaryMimeType.essence === "*/*") {
          continue;
        }
        mimeType = temporaryMimeType;
        if (mimeType.essence !== essence) {
          charset = null;
          if (mimeType.parameters.has("charset")) {
            charset = mimeType.parameters.get("charset");
          }
          essence = mimeType.essence;
        } else if (!mimeType.parameters.has("charset") && charset !== null) {
          mimeType.parameters.set("charset", charset);
        }
      }
      if (mimeType == null) {
        return "failure";
      }
      return mimeType;
    }
    function gettingDecodingSplitting(value) {
      const input = value;
      const position = { position: 0 };
      const values = [];
      let temporaryValue = "";
      while (position.position < input.length) {
        temporaryValue += collectASequenceOfCodePoints(
          (char) => char !== '"' && char !== ",",
          input,
          position
        );
        if (position.position < input.length) {
          if (input.charCodeAt(position.position) === 34) {
            temporaryValue += collectAnHTTPQuotedString(
              input,
              position
            );
            if (position.position < input.length) {
              continue;
            }
          } else {
            assert(input.charCodeAt(position.position) === 44);
            position.position++;
          }
        }
        temporaryValue = removeChars(temporaryValue, true, true, (char) => char === 9 || char === 32);
        values.push(temporaryValue);
        temporaryValue = "";
      }
      return values;
    }
    function getDecodeSplit(name, list) {
      const value = list.get(name, true);
      if (value === null) {
        return null;
      }
      return gettingDecodingSplitting(value);
    }
    var textDecoder = new TextDecoder();
    function utf8DecodeBytes(buffer) {
      if (buffer.length === 0) {
        return "";
      }
      if (buffer[0] === 239 && buffer[1] === 187 && buffer[2] === 191) {
        buffer = buffer.subarray(3);
      }
      const output = textDecoder.decode(buffer);
      return output;
    }
    var EnvironmentSettingsObjectBase = class {
      get baseUrl() {
        return getGlobalOrigin();
      }
      get origin() {
        return this.baseUrl?.origin;
      }
      policyContainer = makePolicyContainer();
    };
    var EnvironmentSettingsObject = class {
      settingsObject = new EnvironmentSettingsObjectBase();
    };
    var environmentSettingsObject = new EnvironmentSettingsObject();
    module2.exports = {
      isAborted,
      isCancelled,
      isValidEncodedURL,
      createDeferredPromise,
      ReadableStreamFrom,
      tryUpgradeRequestToAPotentiallyTrustworthyURL,
      clampAndCoarsenConnectionTimingInfo,
      coarsenedSharedCurrentTime,
      determineRequestsReferrer,
      makePolicyContainer,
      clonePolicyContainer,
      appendFetchMetadata,
      appendRequestOriginHeader,
      TAOCheck,
      corsCheck,
      crossOriginResourcePolicyCheck,
      createOpaqueTimingInfo,
      setRequestReferrerPolicyOnRedirect,
      isValidHTTPToken,
      requestBadPort,
      requestCurrentURL,
      responseURL,
      responseLocationURL,
      isURLPotentiallyTrustworthy,
      isValidReasonPhrase,
      sameOrigin,
      normalizeMethod,
      serializeJavascriptValueToJSONString,
      iteratorMixin,
      createIterator,
      isValidHeaderName,
      isValidHeaderValue,
      isErrorLike,
      fullyReadBody,
      bytesMatch,
      readableStreamClose,
      isomorphicEncode,
      urlIsLocal,
      urlHasHttpsScheme,
      urlIsHttpHttpsScheme,
      readAllBytes,
      simpleRangeHeaderValue,
      buildContentRange,
      parseMetadata,
      createInflate,
      extractMimeType,
      getDecodeSplit,
      utf8DecodeBytes,
      environmentSettingsObject,
      isOriginIPPotentiallyTrustworthy
    };
  }
});

// node_modules/undici/lib/web/fetch/formdata.js
var require_formdata = __commonJS({
  "node_modules/undici/lib/web/fetch/formdata.js"(exports2, module2) {
    "use strict";
    var { iteratorMixin } = require_util2();
    var { kEnumerableProperty } = require_util();
    var { webidl } = require_webidl();
    var { File: NativeFile } = require("node:buffer");
    var nodeUtil = require("node:util");
    var File = globalThis.File ?? NativeFile;
    var FormData = class _FormData {
      #state = [];
      constructor(form) {
        webidl.util.markAsUncloneable(this);
        if (form !== void 0) {
          throw webidl.errors.conversionFailed({
            prefix: "FormData constructor",
            argument: "Argument 1",
            types: ["undefined"]
          });
        }
      }
      append(name, value, filename = void 0) {
        webidl.brandCheck(this, _FormData);
        const prefix = "FormData.append";
        webidl.argumentLengthCheck(arguments, 2, prefix);
        name = webidl.converters.USVString(name);
        if (arguments.length === 3 || webidl.is.Blob(value)) {
          value = webidl.converters.Blob(value, prefix, "value");
          if (filename !== void 0) {
            filename = webidl.converters.USVString(filename);
          }
        } else {
          value = webidl.converters.USVString(value);
        }
        const entry = makeEntry(name, value, filename);
        this.#state.push(entry);
      }
      delete(name) {
        webidl.brandCheck(this, _FormData);
        const prefix = "FormData.delete";
        webidl.argumentLengthCheck(arguments, 1, prefix);
        name = webidl.converters.USVString(name);
        this.#state = this.#state.filter((entry) => entry.name !== name);
      }
      get(name) {
        webidl.brandCheck(this, _FormData);
        const prefix = "FormData.get";
        webidl.argumentLengthCheck(arguments, 1, prefix);
        name = webidl.converters.USVString(name);
        const idx = this.#state.findIndex((entry) => entry.name === name);
        if (idx === -1) {
          return null;
        }
        return this.#state[idx].value;
      }
      getAll(name) {
        webidl.brandCheck(this, _FormData);
        const prefix = "FormData.getAll";
        webidl.argumentLengthCheck(arguments, 1, prefix);
        name = webidl.converters.USVString(name);
        return this.#state.filter((entry) => entry.name === name).map((entry) => entry.value);
      }
      has(name) {
        webidl.brandCheck(this, _FormData);
        const prefix = "FormData.has";
        webidl.argumentLengthCheck(arguments, 1, prefix);
        name = webidl.converters.USVString(name);
        return this.#state.findIndex((entry) => entry.name === name) !== -1;
      }
      set(name, value, filename = void 0) {
        webidl.brandCheck(this, _FormData);
        const prefix = "FormData.set";
        webidl.argumentLengthCheck(arguments, 2, prefix);
        name = webidl.converters.USVString(name);
        if (arguments.length === 3 || webidl.is.Blob(value)) {
          value = webidl.converters.Blob(value, prefix, "value");
          if (filename !== void 0) {
            filename = webidl.converters.USVString(filename);
          }
        } else {
          value = webidl.converters.USVString(value);
        }
        const entry = makeEntry(name, value, filename);
        const idx = this.#state.findIndex((entry2) => entry2.name === name);
        if (idx !== -1) {
          this.#state = [
            ...this.#state.slice(0, idx),
            entry,
            ...this.#state.slice(idx + 1).filter((entry2) => entry2.name !== name)
          ];
        } else {
          this.#state.push(entry);
        }
      }
      [nodeUtil.inspect.custom](depth, options) {
        const state = this.#state.reduce((a, b) => {
          if (a[b.name]) {
            if (Array.isArray(a[b.name])) {
              a[b.name].push(b.value);
            } else {
              a[b.name] = [a[b.name], b.value];
            }
          } else {
            a[b.name] = b.value;
          }
          return a;
        }, { __proto__: null });
        options.depth ??= depth;
        options.colors ??= true;
        const output = nodeUtil.formatWithOptions(options, state);
        return `FormData ${output.slice(output.indexOf("]") + 2)}`;
      }
      /**
       * @param {FormData} formData
       */
      static getFormDataState(formData) {
        return formData.#state;
      }
      /**
       * @param {FormData} formData
       * @param {any[]} newState
       */
      static setFormDataState(formData, newState) {
        formData.#state = newState;
      }
    };
    var { getFormDataState, setFormDataState } = FormData;
    Reflect.deleteProperty(FormData, "getFormDataState");
    Reflect.deleteProperty(FormData, "setFormDataState");
    iteratorMixin("FormData", FormData, getFormDataState, "name", "value");
    Object.defineProperties(FormData.prototype, {
      append: kEnumerableProperty,
      delete: kEnumerableProperty,
      get: kEnumerableProperty,
      getAll: kEnumerableProperty,
      has: kEnumerableProperty,
      set: kEnumerableProperty,
      [Symbol.toStringTag]: {
        value: "FormData",
        configurable: true
      }
    });
    function makeEntry(name, value, filename) {
      if (typeof value === "string") {
      } else {
        if (!webidl.is.File(value)) {
          value = new File([value], "blob", { type: value.type });
        }
        if (filename !== void 0) {
          const options = {
            type: value.type,
            lastModified: value.lastModified
          };
          value = new File([value], filename, options);
        }
      }
      return { name, value };
    }
    webidl.is.FormData = webidl.util.MakeTypeAssertion(FormData);
    module2.exports = { FormData, makeEntry, setFormDataState };
  }
});

// node_modules/undici/lib/web/fetch/formdata-parser.js
var require_formdata_parser = __commonJS({
  "node_modules/undici/lib/web/fetch/formdata-parser.js"(exports2, module2) {
    "use strict";
    var { bufferToLowerCasedHeaderName } = require_util();
    var { utf8DecodeBytes } = require_util2();
    var { HTTP_TOKEN_CODEPOINTS, isomorphicDecode } = require_data_url();
    var { makeEntry } = require_formdata();
    var { webidl } = require_webidl();
    var assert = require("node:assert");
    var { File: NodeFile } = require("node:buffer");
    var File = globalThis.File ?? NodeFile;
    var formDataNameBuffer = Buffer.from('form-data; name="');
    var filenameBuffer = Buffer.from("filename");
    var dd = Buffer.from("--");
    var ddcrlf = Buffer.from("--\r\n");
    function isAsciiString(chars) {
      for (let i = 0; i < chars.length; ++i) {
        if ((chars.charCodeAt(i) & ~127) !== 0) {
          return false;
        }
      }
      return true;
    }
    function validateBoundary(boundary) {
      const length = boundary.length;
      if (length < 27 || length > 70) {
        return false;
      }
      for (let i = 0; i < length; ++i) {
        const cp = boundary.charCodeAt(i);
        if (!(cp >= 48 && cp <= 57 || cp >= 65 && cp <= 90 || cp >= 97 && cp <= 122 || cp === 39 || cp === 45 || cp === 95)) {
          return false;
        }
      }
      return true;
    }
    function multipartFormDataParser(input, mimeType) {
      assert(mimeType !== "failure" && mimeType.essence === "multipart/form-data");
      const boundaryString = mimeType.parameters.get("boundary");
      if (boundaryString === void 0) {
        throw parsingError("missing boundary in content-type header");
      }
      const boundary = Buffer.from(`--${boundaryString}`, "utf8");
      const entryList = [];
      const position = { position: 0 };
      while (input[position.position] === 13 && input[position.position + 1] === 10) {
        position.position += 2;
      }
      let trailing = input.length;
      while (input[trailing - 1] === 10 && input[trailing - 2] === 13) {
        trailing -= 2;
      }
      if (trailing !== input.length) {
        input = input.subarray(0, trailing);
      }
      while (true) {
        if (input.subarray(position.position, position.position + boundary.length).equals(boundary)) {
          position.position += boundary.length;
        } else {
          throw parsingError("expected a value starting with -- and the boundary");
        }
        if (position.position === input.length - 2 && bufferStartsWith(input, dd, position) || position.position === input.length - 4 && bufferStartsWith(input, ddcrlf, position)) {
          return entryList;
        }
        if (input[position.position] !== 13 || input[position.position + 1] !== 10) {
          throw parsingError("expected CRLF");
        }
        position.position += 2;
        const result = parseMultipartFormDataHeaders(input, position);
        let { name, filename, contentType, encoding } = result;
        position.position += 2;
        let body;
        {
          const boundaryIndex = input.indexOf(boundary.subarray(2), position.position);
          if (boundaryIndex === -1) {
            throw parsingError("expected boundary after body");
          }
          body = input.subarray(position.position, boundaryIndex - 4);
          position.position += body.length;
          if (encoding === "base64") {
            body = Buffer.from(body.toString(), "base64");
          }
        }
        if (input[position.position] !== 13 || input[position.position + 1] !== 10) {
          throw parsingError("expected CRLF");
        } else {
          position.position += 2;
        }
        let value;
        if (filename !== null) {
          contentType ??= "text/plain";
          if (!isAsciiString(contentType)) {
            contentType = "";
          }
          value = new File([body], filename, { type: contentType });
        } else {
          value = utf8DecodeBytes(Buffer.from(body));
        }
        assert(webidl.is.USVString(name));
        assert(typeof value === "string" && webidl.is.USVString(value) || webidl.is.File(value));
        entryList.push(makeEntry(name, value, filename));
      }
    }
    function parseMultipartFormDataHeaders(input, position) {
      let name = null;
      let filename = null;
      let contentType = null;
      let encoding = null;
      while (true) {
        if (input[position.position] === 13 && input[position.position + 1] === 10) {
          if (name === null) {
            throw parsingError("header name is null");
          }
          return { name, filename, contentType, encoding };
        }
        let headerName = collectASequenceOfBytes(
          (char) => char !== 10 && char !== 13 && char !== 58,
          input,
          position
        );
        headerName = removeChars(headerName, true, true, (char) => char === 9 || char === 32);
        if (!HTTP_TOKEN_CODEPOINTS.test(headerName.toString())) {
          throw parsingError("header name does not match the field-name token production");
        }
        if (input[position.position] !== 58) {
          throw parsingError("expected :");
        }
        position.position++;
        collectASequenceOfBytes(
          (char) => char === 32 || char === 9,
          input,
          position
        );
        switch (bufferToLowerCasedHeaderName(headerName)) {
          case "content-disposition": {
            name = filename = null;
            if (!bufferStartsWith(input, formDataNameBuffer, position)) {
              throw parsingError('expected form-data; name=" for content-disposition header');
            }
            position.position += 17;
            name = parseMultipartFormDataName(input, position);
            if (input[position.position] === 59 && input[position.position + 1] === 32) {
              const at = { position: position.position + 2 };
              if (bufferStartsWith(input, filenameBuffer, at)) {
                if (input[at.position + 8] === 42) {
                  at.position += 10;
                  collectASequenceOfBytes(
                    (char) => char === 32 || char === 9,
                    input,
                    at
                  );
                  const headerValue = collectASequenceOfBytes(
                    (char) => char !== 32 && char !== 13 && char !== 10,
                    // ' ' or CRLF
                    input,
                    at
                  );
                  if (headerValue[0] !== 117 && headerValue[0] !== 85 || // u or U
                  headerValue[1] !== 116 && headerValue[1] !== 84 || // t or T
                  headerValue[2] !== 102 && headerValue[2] !== 70 || // f or F
                  headerValue[3] !== 45 || // -
                  headerValue[4] !== 56) {
                    throw parsingError("unknown encoding, expected utf-8''");
                  }
                  filename = decodeURIComponent(new TextDecoder().decode(headerValue.subarray(7)));
                  position.position = at.position;
                } else {
                  position.position += 11;
                  collectASequenceOfBytes(
                    (char) => char === 32 || char === 9,
                    input,
                    position
                  );
                  position.position++;
                  filename = parseMultipartFormDataName(input, position);
                }
              }
            }
            break;
          }
          case "content-type": {
            let headerValue = collectASequenceOfBytes(
              (char) => char !== 10 && char !== 13,
              input,
              position
            );
            headerValue = removeChars(headerValue, false, true, (char) => char === 9 || char === 32);
            contentType = isomorphicDecode(headerValue);
            break;
          }
          case "content-transfer-encoding": {
            let headerValue = collectASequenceOfBytes(
              (char) => char !== 10 && char !== 13,
              input,
              position
            );
            headerValue = removeChars(headerValue, false, true, (char) => char === 9 || char === 32);
            encoding = isomorphicDecode(headerValue);
            break;
          }
          default: {
            collectASequenceOfBytes(
              (char) => char !== 10 && char !== 13,
              input,
              position
            );
          }
        }
        if (input[position.position] !== 13 && input[position.position + 1] !== 10) {
          throw parsingError("expected CRLF");
        } else {
          position.position += 2;
        }
      }
    }
    function parseMultipartFormDataName(input, position) {
      assert(input[position.position - 1] === 34);
      let name = collectASequenceOfBytes(
        (char) => char !== 10 && char !== 13 && char !== 34,
        input,
        position
      );
      if (input[position.position] !== 34) {
        throw parsingError('expected "');
      } else {
        position.position++;
      }
      name = new TextDecoder().decode(name).replace(/%0A/ig, "\n").replace(/%0D/ig, "\r").replace(/%22/g, '"');
      return name;
    }
    function collectASequenceOfBytes(condition, input, position) {
      let start = position.position;
      while (start < input.length && condition(input[start])) {
        ++start;
      }
      return input.subarray(position.position, position.position = start);
    }
    function removeChars(buf, leading, trailing, predicate) {
      let lead = 0;
      let trail = buf.length - 1;
      if (leading) {
        while (lead < buf.length && predicate(buf[lead])) lead++;
      }
      if (trailing) {
        while (trail > 0 && predicate(buf[trail])) trail--;
      }
      return lead === 0 && trail === buf.length - 1 ? buf : buf.subarray(lead, trail + 1);
    }
    function bufferStartsWith(buffer, start, position) {
      if (buffer.length < start.length) {
        return false;
      }
      for (let i = 0; i < start.length; i++) {
        if (start[i] !== buffer[position.position + i]) {
          return false;
        }
      }
      return true;
    }
    function parsingError(cause) {
      return new TypeError("Failed to parse body as FormData.", { cause: new TypeError(cause) });
    }
    module2.exports = {
      multipartFormDataParser,
      validateBoundary
    };
  }
});

// node_modules/undici/lib/web/fetch/body.js
var require_body = __commonJS({
  "node_modules/undici/lib/web/fetch/body.js"(exports2, module2) {
    "use strict";
    var util = require_util();
    var {
      ReadableStreamFrom,
      readableStreamClose,
      createDeferredPromise,
      fullyReadBody,
      extractMimeType,
      utf8DecodeBytes
    } = require_util2();
    var { FormData, setFormDataState } = require_formdata();
    var { webidl } = require_webidl();
    var { Blob: Blob2 } = require("node:buffer");
    var assert = require("node:assert");
    var { isErrored, isDisturbed } = require("node:stream");
    var { isArrayBuffer } = require("node:util/types");
    var { serializeAMimeType } = require_data_url();
    var { multipartFormDataParser } = require_formdata_parser();
    var random;
    try {
      const crypto = require("node:crypto");
      random = (max) => crypto.randomInt(0, max);
    } catch {
      random = (max) => Math.floor(Math.random() * max);
    }
    var textEncoder = new TextEncoder();
    function noop() {
    }
    var hasFinalizationRegistry = globalThis.FinalizationRegistry;
    var streamRegistry;
    if (hasFinalizationRegistry) {
      streamRegistry = new FinalizationRegistry((weakRef) => {
        const stream = weakRef.deref();
        if (stream && !stream.locked && !isDisturbed(stream) && !isErrored(stream)) {
          stream.cancel("Response object has been garbage collected").catch(noop);
        }
      });
    }
    function extractBody(object, keepalive = false) {
      let stream = null;
      if (webidl.is.ReadableStream(object)) {
        stream = object;
      } else if (webidl.is.Blob(object)) {
        stream = object.stream();
      } else {
        stream = new ReadableStream({
          async pull(controller) {
            const buffer = typeof source === "string" ? textEncoder.encode(source) : source;
            if (buffer.byteLength) {
              controller.enqueue(buffer);
            }
            queueMicrotask(() => readableStreamClose(controller));
          },
          start() {
          },
          type: "bytes"
        });
      }
      assert(webidl.is.ReadableStream(stream));
      let action = null;
      let source = null;
      let length = null;
      let type = null;
      if (typeof object === "string") {
        source = object;
        type = "text/plain;charset=UTF-8";
      } else if (webidl.is.URLSearchParams(object)) {
        source = object.toString();
        type = "application/x-www-form-urlencoded;charset=UTF-8";
      } else if (isArrayBuffer(object)) {
        source = new Uint8Array(object.slice());
      } else if (ArrayBuffer.isView(object)) {
        source = new Uint8Array(object.buffer.slice(object.byteOffset, object.byteOffset + object.byteLength));
      } else if (webidl.is.FormData(object)) {
        const boundary = `----formdata-undici-0${`${random(1e11)}`.padStart(11, "0")}`;
        const prefix = `--${boundary}\r
Content-Disposition: form-data`;
        const escape = (str) => str.replace(/\n/g, "%0A").replace(/\r/g, "%0D").replace(/"/g, "%22");
        const normalizeLinefeeds = (value) => value.replace(/\r?\n|\r/g, "\r\n");
        const blobParts = [];
        const rn = new Uint8Array([13, 10]);
        length = 0;
        let hasUnknownSizeValue = false;
        for (const [name, value] of object) {
          if (typeof value === "string") {
            const chunk2 = textEncoder.encode(prefix + `; name="${escape(normalizeLinefeeds(name))}"\r
\r
${normalizeLinefeeds(value)}\r
`);
            blobParts.push(chunk2);
            length += chunk2.byteLength;
          } else {
            const chunk2 = textEncoder.encode(`${prefix}; name="${escape(normalizeLinefeeds(name))}"` + (value.name ? `; filename="${escape(value.name)}"` : "") + `\r
Content-Type: ${value.type || "application/octet-stream"}\r
\r
`);
            blobParts.push(chunk2, value, rn);
            if (typeof value.size === "number") {
              length += chunk2.byteLength + value.size + rn.byteLength;
            } else {
              hasUnknownSizeValue = true;
            }
          }
        }
        const chunk = textEncoder.encode(`--${boundary}--\r
`);
        blobParts.push(chunk);
        length += chunk.byteLength;
        if (hasUnknownSizeValue) {
          length = null;
        }
        source = object;
        action = async function* () {
          for (const part of blobParts) {
            if (part.stream) {
              yield* part.stream();
            } else {
              yield part;
            }
          }
        };
        type = `multipart/form-data; boundary=${boundary}`;
      } else if (webidl.is.Blob(object)) {
        source = object;
        length = object.size;
        if (object.type) {
          type = object.type;
        }
      } else if (typeof object[Symbol.asyncIterator] === "function") {
        if (keepalive) {
          throw new TypeError("keepalive");
        }
        if (util.isDisturbed(object) || object.locked) {
          throw new TypeError(
            "Response body object should not be disturbed or locked"
          );
        }
        stream = webidl.is.ReadableStream(object) ? object : ReadableStreamFrom(object);
      }
      if (typeof source === "string" || util.isBuffer(source)) {
        length = Buffer.byteLength(source);
      }
      if (action != null) {
        let iterator;
        stream = new ReadableStream({
          async start() {
            iterator = action(object)[Symbol.asyncIterator]();
          },
          async pull(controller) {
            const { value, done } = await iterator.next();
            if (done) {
              queueMicrotask(() => {
                controller.close();
                controller.byobRequest?.respond(0);
              });
            } else {
              if (!isErrored(stream)) {
                const buffer = new Uint8Array(value);
                if (buffer.byteLength) {
                  controller.enqueue(buffer);
                }
              }
            }
            return controller.desiredSize > 0;
          },
          async cancel(reason) {
            await iterator.return();
          },
          type: "bytes"
        });
      }
      const body = { stream, source, length };
      return [body, type];
    }
    function safelyExtractBody(object, keepalive = false) {
      if (webidl.is.ReadableStream(object)) {
        assert(!util.isDisturbed(object), "The body has already been consumed.");
        assert(!object.locked, "The stream is locked.");
      }
      return extractBody(object, keepalive);
    }
    function cloneBody(instance, body) {
      const [out1, out2] = body.stream.tee();
      if (hasFinalizationRegistry) {
        streamRegistry.register(instance, new WeakRef(out1));
      }
      body.stream = out1;
      return {
        stream: out2,
        length: body.length,
        source: body.source
      };
    }
    function throwIfAborted(state) {
      if (state.aborted) {
        throw new DOMException("The operation was aborted.", "AbortError");
      }
    }
    function bodyMixinMethods(instance, getInternalState) {
      const methods = {
        blob() {
          return consumeBody(this, (bytes) => {
            let mimeType = bodyMimeType(getInternalState(this));
            if (mimeType === null) {
              mimeType = "";
            } else if (mimeType) {
              mimeType = serializeAMimeType(mimeType);
            }
            return new Blob2([bytes], { type: mimeType });
          }, instance, getInternalState);
        },
        arrayBuffer() {
          return consumeBody(this, (bytes) => {
            return new Uint8Array(bytes).buffer;
          }, instance, getInternalState);
        },
        text() {
          return consumeBody(this, utf8DecodeBytes, instance, getInternalState);
        },
        json() {
          return consumeBody(this, parseJSONFromBytes, instance, getInternalState);
        },
        formData() {
          return consumeBody(this, (value) => {
            const mimeType = bodyMimeType(getInternalState(this));
            if (mimeType !== null) {
              switch (mimeType.essence) {
                case "multipart/form-data": {
                  const parsed = multipartFormDataParser(value, mimeType);
                  const fd = new FormData();
                  setFormDataState(fd, parsed);
                  return fd;
                }
                case "application/x-www-form-urlencoded": {
                  const entries = new URLSearchParams(value.toString());
                  const fd = new FormData();
                  for (const [name, value2] of entries) {
                    fd.append(name, value2);
                  }
                  return fd;
                }
              }
            }
            throw new TypeError(
              'Content-Type was not one of "multipart/form-data" or "application/x-www-form-urlencoded".'
            );
          }, instance, getInternalState);
        },
        bytes() {
          return consumeBody(this, (bytes) => {
            return new Uint8Array(bytes);
          }, instance, getInternalState);
        }
      };
      return methods;
    }
    function mixinBody(prototype, getInternalState) {
      Object.assign(prototype.prototype, bodyMixinMethods(prototype, getInternalState));
    }
    async function consumeBody(object, convertBytesToJSValue, instance, getInternalState) {
      webidl.brandCheck(object, instance);
      const state = getInternalState(object);
      if (bodyUnusable(state)) {
        throw new TypeError("Body is unusable: Body has already been read");
      }
      throwIfAborted(state);
      const promise = createDeferredPromise();
      const errorSteps = (error) => promise.reject(error);
      const successSteps = (data) => {
        try {
          promise.resolve(convertBytesToJSValue(data));
        } catch (e) {
          errorSteps(e);
        }
      };
      if (state.body == null) {
        successSteps(Buffer.allocUnsafe(0));
        return promise.promise;
      }
      fullyReadBody(state.body, successSteps, errorSteps);
      return promise.promise;
    }
    function bodyUnusable(object) {
      const body = object.body;
      return body != null && (body.stream.locked || util.isDisturbed(body.stream));
    }
    function parseJSONFromBytes(bytes) {
      return JSON.parse(utf8DecodeBytes(bytes));
    }
    function bodyMimeType(requestOrResponse) {
      const headers = requestOrResponse.headersList;
      const mimeType = extractMimeType(headers);
      if (mimeType === "failure") {
        return null;
      }
      return mimeType;
    }
    module2.exports = {
      extractBody,
      safelyExtractBody,
      cloneBody,
      mixinBody,
      streamRegistry,
      hasFinalizationRegistry,
      bodyUnusable
    };
  }
});

// node_modules/undici/lib/dispatcher/client-h1.js
var require_client_h1 = __commonJS({
  "node_modules/undici/lib/dispatcher/client-h1.js"(exports2, module2) {
    "use strict";
    var assert = require("node:assert");
    var util = require_util();
    var { channels } = require_diagnostics();
    var timers = require_timers();
    var {
      RequestContentLengthMismatchError,
      ResponseContentLengthMismatchError,
      RequestAbortedError,
      HeadersTimeoutError,
      HeadersOverflowError,
      SocketError,
      InformationalError,
      BodyTimeoutError,
      HTTPParserError,
      ResponseExceededMaxSizeError
    } = require_errors();
    var {
      kUrl,
      kReset,
      kClient,
      kParser,
      kBlocking,
      kRunning,
      kPending,
      kSize,
      kWriting,
      kQueue,
      kNoRef,
      kKeepAliveDefaultTimeout,
      kHostHeader,
      kPendingIdx,
      kRunningIdx,
      kError,
      kPipelining,
      kSocket,
      kKeepAliveTimeoutValue,
      kMaxHeadersSize,
      kKeepAliveMaxTimeout,
      kKeepAliveTimeoutThreshold,
      kHeadersTimeout,
      kBodyTimeout,
      kStrictContentLength,
      kMaxRequests,
      kCounter,
      kMaxResponseSize,
      kOnError,
      kResume,
      kHTTPContext,
      kClosed
    } = require_symbols();
    var constants = require_constants2();
    var EMPTY_BUF = Buffer.alloc(0);
    var FastBuffer = Buffer[Symbol.species];
    var removeAllListeners = util.removeAllListeners;
    var extractBody;
    async function lazyllhttp() {
      const llhttpWasmData = process.env.JEST_WORKER_ID ? require_llhttp_wasm() : void 0;
      let mod;
      try {
        mod = await WebAssembly.compile(require_llhttp_simd_wasm());
      } catch (e) {
        mod = await WebAssembly.compile(llhttpWasmData || require_llhttp_wasm());
      }
      return await WebAssembly.instantiate(mod, {
        env: {
          /**
           * @param {number} p
           * @param {number} at
           * @param {number} len
           * @returns {number}
           */
          wasm_on_url: (p, at, len) => {
            return 0;
          },
          /**
           * @param {number} p
           * @param {number} at
           * @param {number} len
           * @returns {number}
           */
          wasm_on_status: (p, at, len) => {
            assert(currentParser.ptr === p);
            const start = at - currentBufferPtr + currentBufferRef.byteOffset;
            return currentParser.onStatus(new FastBuffer(currentBufferRef.buffer, start, len));
          },
          /**
           * @param {number} p
           * @returns {number}
           */
          wasm_on_message_begin: (p) => {
            assert(currentParser.ptr === p);
            return currentParser.onMessageBegin();
          },
          /**
           * @param {number} p
           * @param {number} at
           * @param {number} len
           * @returns {number}
           */
          wasm_on_header_field: (p, at, len) => {
            assert(currentParser.ptr === p);
            const start = at - currentBufferPtr + currentBufferRef.byteOffset;
            return currentParser.onHeaderField(new FastBuffer(currentBufferRef.buffer, start, len));
          },
          /**
           * @param {number} p
           * @param {number} at
           * @param {number} len
           * @returns {number}
           */
          wasm_on_header_value: (p, at, len) => {
            assert(currentParser.ptr === p);
            const start = at - currentBufferPtr + currentBufferRef.byteOffset;
            return currentParser.onHeaderValue(new FastBuffer(currentBufferRef.buffer, start, len));
          },
          /**
           * @param {number} p
           * @param {number} statusCode
           * @param {0|1} upgrade
           * @param {0|1} shouldKeepAlive
           * @returns {number}
           */
          wasm_on_headers_complete: (p, statusCode, upgrade, shouldKeepAlive) => {
            assert(currentParser.ptr === p);
            return currentParser.onHeadersComplete(statusCode, upgrade === 1, shouldKeepAlive === 1);
          },
          /**
           * @param {number} p
           * @param {number} at
           * @param {number} len
           * @returns {number}
           */
          wasm_on_body: (p, at, len) => {
            assert(currentParser.ptr === p);
            const start = at - currentBufferPtr + currentBufferRef.byteOffset;
            return currentParser.onBody(new FastBuffer(currentBufferRef.buffer, start, len));
          },
          /**
           * @param {number} p
           * @returns {number}
           */
          wasm_on_message_complete: (p) => {
            assert(currentParser.ptr === p);
            return currentParser.onMessageComplete();
          }
        }
      });
    }
    var llhttpInstance = null;
    var llhttpPromise = lazyllhttp();
    llhttpPromise.catch();
    var currentParser = null;
    var currentBufferRef = null;
    var currentBufferSize = 0;
    var currentBufferPtr = null;
    var USE_NATIVE_TIMER = 0;
    var USE_FAST_TIMER = 1;
    var TIMEOUT_HEADERS = 2 | USE_FAST_TIMER;
    var TIMEOUT_BODY = 4 | USE_FAST_TIMER;
    var TIMEOUT_KEEP_ALIVE = 8 | USE_NATIVE_TIMER;
    var Parser = class {
      /**
         * @param {import('./client.js')} client
         * @param {import('net').Socket} socket
         * @param {*} llhttp
         */
      constructor(client, socket, { exports: exports3 }) {
        this.llhttp = exports3;
        this.ptr = this.llhttp.llhttp_alloc(constants.TYPE.RESPONSE);
        this.client = client;
        this.socket = socket;
        this.timeout = null;
        this.timeoutValue = null;
        this.timeoutType = null;
        this.statusCode = 0;
        this.statusText = "";
        this.upgrade = false;
        this.headers = [];
        this.headersSize = 0;
        this.headersMaxSize = client[kMaxHeadersSize];
        this.shouldKeepAlive = false;
        this.paused = false;
        this.resume = this.resume.bind(this);
        this.bytesRead = 0;
        this.keepAlive = "";
        this.contentLength = "";
        this.connection = "";
        this.maxResponseSize = client[kMaxResponseSize];
      }
      setTimeout(delay, type) {
        if (delay !== this.timeoutValue || type & USE_FAST_TIMER ^ this.timeoutType & USE_FAST_TIMER) {
          if (this.timeout) {
            timers.clearTimeout(this.timeout);
            this.timeout = null;
          }
          if (delay) {
            if (type & USE_FAST_TIMER) {
              this.timeout = timers.setFastTimeout(onParserTimeout, delay, new WeakRef(this));
            } else {
              this.timeout = setTimeout(onParserTimeout, delay, new WeakRef(this));
              this.timeout?.unref();
            }
          }
          this.timeoutValue = delay;
        } else if (this.timeout) {
          if (this.timeout.refresh) {
            this.timeout.refresh();
          }
        }
        this.timeoutType = type;
      }
      resume() {
        if (this.socket.destroyed || !this.paused) {
          return;
        }
        assert(this.ptr != null);
        assert(currentParser === null);
        this.llhttp.llhttp_resume(this.ptr);
        assert(this.timeoutType === TIMEOUT_BODY);
        if (this.timeout) {
          if (this.timeout.refresh) {
            this.timeout.refresh();
          }
        }
        this.paused = false;
        this.execute(this.socket.read() || EMPTY_BUF);
        this.readMore();
      }
      readMore() {
        while (!this.paused && this.ptr) {
          const chunk = this.socket.read();
          if (chunk === null) {
            break;
          }
          this.execute(chunk);
        }
      }
      /**
       * @param {Buffer} chunk
       */
      execute(chunk) {
        assert(currentParser === null);
        assert(this.ptr != null);
        assert(!this.paused);
        const { socket, llhttp } = this;
        if (chunk.length > currentBufferSize) {
          if (currentBufferPtr) {
            llhttp.free(currentBufferPtr);
          }
          currentBufferSize = Math.ceil(chunk.length / 4096) * 4096;
          currentBufferPtr = llhttp.malloc(currentBufferSize);
        }
        new Uint8Array(llhttp.memory.buffer, currentBufferPtr, currentBufferSize).set(chunk);
        try {
          let ret;
          try {
            currentBufferRef = chunk;
            currentParser = this;
            ret = llhttp.llhttp_execute(this.ptr, currentBufferPtr, chunk.length);
          } catch (err) {
            throw err;
          } finally {
            currentParser = null;
            currentBufferRef = null;
          }
          if (ret !== constants.ERROR.OK) {
            const data = chunk.subarray(llhttp.llhttp_get_error_pos(this.ptr) - currentBufferPtr);
            if (ret === constants.ERROR.PAUSED_UPGRADE) {
              this.onUpgrade(data);
            } else if (ret === constants.ERROR.PAUSED) {
              this.paused = true;
              socket.unshift(data);
            } else {
              const ptr = llhttp.llhttp_get_error_reason(this.ptr);
              let message = "";
              if (ptr) {
                const len = new Uint8Array(llhttp.memory.buffer, ptr).indexOf(0);
                message = "Response does not match the HTTP/1.1 protocol (" + Buffer.from(llhttp.memory.buffer, ptr, len).toString() + ")";
              }
              throw new HTTPParserError(message, constants.ERROR[ret], data);
            }
          }
        } catch (err) {
          util.destroy(socket, err);
        }
      }
      destroy() {
        assert(currentParser === null);
        assert(this.ptr != null);
        this.llhttp.llhttp_free(this.ptr);
        this.ptr = null;
        this.timeout && timers.clearTimeout(this.timeout);
        this.timeout = null;
        this.timeoutValue = null;
        this.timeoutType = null;
        this.paused = false;
      }
      /**
       * @param {Buffer} buf
       * @returns {0}
       */
      onStatus(buf) {
        this.statusText = buf.toString();
        return 0;
      }
      /**
       * @returns {0|-1}
       */
      onMessageBegin() {
        const { socket, client } = this;
        if (socket.destroyed) {
          return -1;
        }
        const request = client[kQueue][client[kRunningIdx]];
        if (!request) {
          return -1;
        }
        request.onResponseStarted();
        return 0;
      }
      /**
       * @param {Buffer} buf
       * @returns {number}
       */
      onHeaderField(buf) {
        const len = this.headers.length;
        if ((len & 1) === 0) {
          this.headers.push(buf);
        } else {
          this.headers[len - 1] = Buffer.concat([this.headers[len - 1], buf]);
        }
        this.trackHeader(buf.length);
        return 0;
      }
      /**
       * @param {Buffer} buf
       * @returns {number}
       */
      onHeaderValue(buf) {
        let len = this.headers.length;
        if ((len & 1) === 1) {
          this.headers.push(buf);
          len += 1;
        } else {
          this.headers[len - 1] = Buffer.concat([this.headers[len - 1], buf]);
        }
        const key = this.headers[len - 2];
        if (key.length === 10) {
          const headerName = util.bufferToLowerCasedHeaderName(key);
          if (headerName === "keep-alive") {
            this.keepAlive += buf.toString();
          } else if (headerName === "connection") {
            this.connection += buf.toString();
          }
        } else if (key.length === 14 && util.bufferToLowerCasedHeaderName(key) === "content-length") {
          this.contentLength += buf.toString();
        }
        this.trackHeader(buf.length);
        return 0;
      }
      /**
       * @param {number} len
       */
      trackHeader(len) {
        this.headersSize += len;
        if (this.headersSize >= this.headersMaxSize) {
          util.destroy(this.socket, new HeadersOverflowError());
        }
      }
      /**
       * @param {Buffer} head
       */
      onUpgrade(head) {
        const { upgrade, client, socket, headers, statusCode } = this;
        assert(upgrade);
        assert(client[kSocket] === socket);
        assert(!socket.destroyed);
        assert(!this.paused);
        assert((headers.length & 1) === 0);
        const request = client[kQueue][client[kRunningIdx]];
        assert(request);
        assert(request.upgrade || request.method === "CONNECT");
        this.statusCode = 0;
        this.statusText = "";
        this.shouldKeepAlive = false;
        this.headers = [];
        this.headersSize = 0;
        socket.unshift(head);
        socket[kParser].destroy();
        socket[kParser] = null;
        socket[kClient] = null;
        socket[kError] = null;
        removeAllListeners(socket);
        client[kSocket] = null;
        client[kHTTPContext] = null;
        client[kQueue][client[kRunningIdx]++] = null;
        client.emit("disconnect", client[kUrl], [client], new InformationalError("upgrade"));
        try {
          request.onUpgrade(statusCode, headers, socket);
        } catch (err) {
          util.destroy(socket, err);
        }
        client[kResume]();
      }
      /**
       * @param {number} statusCode
       * @param {boolean} upgrade
       * @param {boolean} shouldKeepAlive
       * @returns {number}
       */
      onHeadersComplete(statusCode, upgrade, shouldKeepAlive) {
        const { client, socket, headers, statusText } = this;
        if (socket.destroyed) {
          return -1;
        }
        const request = client[kQueue][client[kRunningIdx]];
        if (!request) {
          return -1;
        }
        assert(!this.upgrade);
        assert(this.statusCode < 200);
        if (statusCode === 100) {
          util.destroy(socket, new SocketError("bad response", util.getSocketInfo(socket)));
          return -1;
        }
        if (upgrade && !request.upgrade) {
          util.destroy(socket, new SocketError("bad upgrade", util.getSocketInfo(socket)));
          return -1;
        }
        assert(this.timeoutType === TIMEOUT_HEADERS);
        this.statusCode = statusCode;
        this.shouldKeepAlive = shouldKeepAlive || // Override llhttp value which does not allow keepAlive for HEAD.
        request.method === "HEAD" && !socket[kReset] && this.connection.toLowerCase() === "keep-alive";
        if (this.statusCode >= 200) {
          const bodyTimeout = request.bodyTimeout != null ? request.bodyTimeout : client[kBodyTimeout];
          this.setTimeout(bodyTimeout, TIMEOUT_BODY);
        } else if (this.timeout) {
          if (this.timeout.refresh) {
            this.timeout.refresh();
          }
        }
        if (request.method === "CONNECT") {
          assert(client[kRunning] === 1);
          this.upgrade = true;
          return 2;
        }
        if (upgrade) {
          assert(client[kRunning] === 1);
          this.upgrade = true;
          return 2;
        }
        assert((this.headers.length & 1) === 0);
        this.headers = [];
        this.headersSize = 0;
        if (this.shouldKeepAlive && client[kPipelining]) {
          const keepAliveTimeout = this.keepAlive ? util.parseKeepAliveTimeout(this.keepAlive) : null;
          if (keepAliveTimeout != null) {
            const timeout = Math.min(
              keepAliveTimeout - client[kKeepAliveTimeoutThreshold],
              client[kKeepAliveMaxTimeout]
            );
            if (timeout <= 0) {
              socket[kReset] = true;
            } else {
              client[kKeepAliveTimeoutValue] = timeout;
            }
          } else {
            client[kKeepAliveTimeoutValue] = client[kKeepAliveDefaultTimeout];
          }
        } else {
          socket[kReset] = true;
        }
        const pause = request.onHeaders(statusCode, headers, this.resume, statusText) === false;
        if (request.aborted) {
          return -1;
        }
        if (request.method === "HEAD") {
          return 1;
        }
        if (statusCode < 200) {
          return 1;
        }
        if (socket[kBlocking]) {
          socket[kBlocking] = false;
          client[kResume]();
        }
        return pause ? constants.ERROR.PAUSED : 0;
      }
      /**
       * @param {Buffer} buf
       * @returns {number}
       */
      onBody(buf) {
        const { client, socket, statusCode, maxResponseSize } = this;
        if (socket.destroyed) {
          return -1;
        }
        const request = client[kQueue][client[kRunningIdx]];
        assert(request);
        assert(this.timeoutType === TIMEOUT_BODY);
        if (this.timeout) {
          if (this.timeout.refresh) {
            this.timeout.refresh();
          }
        }
        assert(statusCode >= 200);
        if (maxResponseSize > -1 && this.bytesRead + buf.length > maxResponseSize) {
          util.destroy(socket, new ResponseExceededMaxSizeError());
          return -1;
        }
        this.bytesRead += buf.length;
        if (request.onData(buf) === false) {
          return constants.ERROR.PAUSED;
        }
        return 0;
      }
      /**
       * @returns {number}
       */
      onMessageComplete() {
        const { client, socket, statusCode, upgrade, headers, contentLength, bytesRead, shouldKeepAlive } = this;
        if (socket.destroyed && (!statusCode || shouldKeepAlive)) {
          return -1;
        }
        if (upgrade) {
          return 0;
        }
        assert(statusCode >= 100);
        assert((this.headers.length & 1) === 0);
        const request = client[kQueue][client[kRunningIdx]];
        assert(request);
        this.statusCode = 0;
        this.statusText = "";
        this.bytesRead = 0;
        this.contentLength = "";
        this.keepAlive = "";
        this.connection = "";
        this.headers = [];
        this.headersSize = 0;
        if (statusCode < 200) {
          return 0;
        }
        if (request.method !== "HEAD" && contentLength && bytesRead !== parseInt(contentLength, 10)) {
          util.destroy(socket, new ResponseContentLengthMismatchError());
          return -1;
        }
        request.onComplete(headers);
        client[kQueue][client[kRunningIdx]++] = null;
        if (socket[kWriting]) {
          assert(client[kRunning] === 0);
          util.destroy(socket, new InformationalError("reset"));
          return constants.ERROR.PAUSED;
        } else if (!shouldKeepAlive) {
          util.destroy(socket, new InformationalError("reset"));
          return constants.ERROR.PAUSED;
        } else if (socket[kReset] && client[kRunning] === 0) {
          util.destroy(socket, new InformationalError("reset"));
          return constants.ERROR.PAUSED;
        } else if (client[kPipelining] == null || client[kPipelining] === 1) {
          setImmediate(() => client[kResume]());
        } else {
          client[kResume]();
        }
        return 0;
      }
    };
    function onParserTimeout(parser) {
      const { socket, timeoutType, client, paused } = parser.deref();
      if (timeoutType === TIMEOUT_HEADERS) {
        if (!socket[kWriting] || socket.writableNeedDrain || client[kRunning] > 1) {
          assert(!paused, "cannot be paused while waiting for headers");
          util.destroy(socket, new HeadersTimeoutError());
        }
      } else if (timeoutType === TIMEOUT_BODY) {
        if (!paused) {
          util.destroy(socket, new BodyTimeoutError());
        }
      } else if (timeoutType === TIMEOUT_KEEP_ALIVE) {
        assert(client[kRunning] === 0 && client[kKeepAliveTimeoutValue]);
        util.destroy(socket, new InformationalError("socket idle timeout"));
      }
    }
    async function connectH1(client, socket) {
      client[kSocket] = socket;
      if (!llhttpInstance) {
        const noop = () => {
        };
        socket.on("error", noop);
        llhttpInstance = await llhttpPromise;
        llhttpPromise = null;
        socket.off("error", noop);
      }
      if (socket.errored) {
        throw socket.errored;
      }
      if (socket.destroyed) {
        throw new SocketError("destroyed");
      }
      socket[kNoRef] = false;
      socket[kWriting] = false;
      socket[kReset] = false;
      socket[kBlocking] = false;
      socket[kParser] = new Parser(client, socket, llhttpInstance);
      util.addListener(socket, "error", onHttpSocketError);
      util.addListener(socket, "readable", onHttpSocketReadable);
      util.addListener(socket, "end", onHttpSocketEnd);
      util.addListener(socket, "close", onHttpSocketClose);
      socket[kClosed] = false;
      socket.on("close", onSocketClose);
      return {
        version: "h1",
        defaultPipelining: 1,
        write(request) {
          return writeH1(client, request);
        },
        resume() {
          resumeH1(client);
        },
        /**
         * @param {Error|undefined} err
         * @param {() => void} callback
         */
        destroy(err, callback) {
          if (socket[kClosed]) {
            queueMicrotask(callback);
          } else {
            socket.on("close", callback);
            socket.destroy(err);
          }
        },
        /**
         * @returns {boolean}
         */
        get destroyed() {
          return socket.destroyed;
        },
        /**
         * @param {import('../core/request.js')} request
         * @returns {boolean}
         */
        busy(request) {
          if (socket[kWriting] || socket[kReset] || socket[kBlocking]) {
            return true;
          }
          if (request) {
            if (client[kRunning] > 0 && !request.idempotent) {
              return true;
            }
            if (client[kRunning] > 0 && (request.upgrade || request.method === "CONNECT")) {
              return true;
            }
            if (client[kRunning] > 0 && util.bodyLength(request.body) !== 0 && (util.isStream(request.body) || util.isAsyncIterable(request.body) || util.isFormDataLike(request.body))) {
              return true;
            }
          }
          return false;
        }
      };
    }
    function onHttpSocketError(err) {
      assert(err.code !== "ERR_TLS_CERT_ALTNAME_INVALID");
      const parser = this[kParser];
      if (err.code === "ECONNRESET" && parser.statusCode && !parser.shouldKeepAlive) {
        parser.onMessageComplete();
        return;
      }
      this[kError] = err;
      this[kClient][kOnError](err);
    }
    function onHttpSocketReadable() {
      this[kParser]?.readMore();
    }
    function onHttpSocketEnd() {
      const parser = this[kParser];
      if (parser.statusCode && !parser.shouldKeepAlive) {
        parser.onMessageComplete();
        return;
      }
      util.destroy(this, new SocketError("other side closed", util.getSocketInfo(this)));
    }
    function onHttpSocketClose() {
      const parser = this[kParser];
      if (parser) {
        if (!this[kError] && parser.statusCode && !parser.shouldKeepAlive) {
          parser.onMessageComplete();
        }
        this[kParser].destroy();
        this[kParser] = null;
      }
      const err = this[kError] || new SocketError("closed", util.getSocketInfo(this));
      const client = this[kClient];
      client[kSocket] = null;
      client[kHTTPContext] = null;
      if (client.destroyed) {
        assert(client[kPending] === 0);
        const requests = client[kQueue].splice(client[kRunningIdx]);
        for (let i = 0; i < requests.length; i++) {
          const request = requests[i];
          util.errorRequest(client, request, err);
        }
      } else if (client[kRunning] > 0 && err.code !== "UND_ERR_INFO") {
        const request = client[kQueue][client[kRunningIdx]];
        client[kQueue][client[kRunningIdx]++] = null;
        util.errorRequest(client, request, err);
      }
      client[kPendingIdx] = client[kRunningIdx];
      assert(client[kRunning] === 0);
      client.emit("disconnect", client[kUrl], [client], err);
      client[kResume]();
    }
    function onSocketClose() {
      this[kClosed] = true;
    }
    function resumeH1(client) {
      const socket = client[kSocket];
      if (socket && !socket.destroyed) {
        if (client[kSize] === 0) {
          if (!socket[kNoRef] && socket.unref) {
            socket.unref();
            socket[kNoRef] = true;
          }
        } else if (socket[kNoRef] && socket.ref) {
          socket.ref();
          socket[kNoRef] = false;
        }
        if (client[kSize] === 0) {
          if (socket[kParser].timeoutType !== TIMEOUT_KEEP_ALIVE) {
            socket[kParser].setTimeout(client[kKeepAliveTimeoutValue], TIMEOUT_KEEP_ALIVE);
          }
        } else if (client[kRunning] > 0 && socket[kParser].statusCode < 200) {
          if (socket[kParser].timeoutType !== TIMEOUT_HEADERS) {
            const request = client[kQueue][client[kRunningIdx]];
            const headersTimeout = request.headersTimeout != null ? request.headersTimeout : client[kHeadersTimeout];
            socket[kParser].setTimeout(headersTimeout, TIMEOUT_HEADERS);
          }
        }
      }
    }
    function shouldSendContentLength(method) {
      return method !== "GET" && method !== "HEAD" && method !== "OPTIONS" && method !== "TRACE" && method !== "CONNECT";
    }
    function writeH1(client, request) {
      const { method, path, host, upgrade, blocking, reset } = request;
      let { body, headers, contentLength } = request;
      const expectsPayload = method === "PUT" || method === "POST" || method === "PATCH" || method === "QUERY" || method === "PROPFIND" || method === "PROPPATCH";
      if (util.isFormDataLike(body)) {
        if (!extractBody) {
          extractBody = require_body().extractBody;
        }
        const [bodyStream, contentType] = extractBody(body);
        if (request.contentType == null) {
          headers.push("content-type", contentType);
        }
        body = bodyStream.stream;
        contentLength = bodyStream.length;
      } else if (util.isBlobLike(body) && request.contentType == null && body.type) {
        headers.push("content-type", body.type);
      }
      if (body && typeof body.read === "function") {
        body.read(0);
      }
      const bodyLength = util.bodyLength(body);
      contentLength = bodyLength ?? contentLength;
      if (contentLength === null) {
        contentLength = request.contentLength;
      }
      if (contentLength === 0 && !expectsPayload) {
        contentLength = null;
      }
      if (shouldSendContentLength(method) && contentLength > 0 && request.contentLength !== null && request.contentLength !== contentLength) {
        if (client[kStrictContentLength]) {
          util.errorRequest(client, request, new RequestContentLengthMismatchError());
          return false;
        }
        process.emitWarning(new RequestContentLengthMismatchError());
      }
      const socket = client[kSocket];
      const abort = (err) => {
        if (request.aborted || request.completed) {
          return;
        }
        util.errorRequest(client, request, err || new RequestAbortedError());
        util.destroy(body);
        util.destroy(socket, new InformationalError("aborted"));
      };
      try {
        request.onConnect(abort);
      } catch (err) {
        util.errorRequest(client, request, err);
      }
      if (request.aborted) {
        return false;
      }
      if (method === "HEAD") {
        socket[kReset] = true;
      }
      if (upgrade || method === "CONNECT") {
        socket[kReset] = true;
      }
      if (reset != null) {
        socket[kReset] = reset;
      }
      if (client[kMaxRequests] && socket[kCounter]++ >= client[kMaxRequests]) {
        socket[kReset] = true;
      }
      if (blocking) {
        socket[kBlocking] = true;
      }
      let header = `${method} ${path} HTTP/1.1\r
`;
      if (typeof host === "string") {
        header += `host: ${host}\r
`;
      } else {
        header += client[kHostHeader];
      }
      if (upgrade) {
        header += `connection: upgrade\r
upgrade: ${upgrade}\r
`;
      } else if (client[kPipelining] && !socket[kReset]) {
        header += "connection: keep-alive\r\n";
      } else {
        header += "connection: close\r\n";
      }
      if (Array.isArray(headers)) {
        for (let n = 0; n < headers.length; n += 2) {
          const key = headers[n + 0];
          const val = headers[n + 1];
          if (Array.isArray(val)) {
            for (let i = 0; i < val.length; i++) {
              header += `${key}: ${val[i]}\r
`;
            }
          } else {
            header += `${key}: ${val}\r
`;
          }
        }
      }
      if (channels.sendHeaders.hasSubscribers) {
        channels.sendHeaders.publish({ request, headers: header, socket });
      }
      if (!body || bodyLength === 0) {
        writeBuffer(abort, null, client, request, socket, contentLength, header, expectsPayload);
      } else if (util.isBuffer(body)) {
        writeBuffer(abort, body, client, request, socket, contentLength, header, expectsPayload);
      } else if (util.isBlobLike(body)) {
        if (typeof body.stream === "function") {
          writeIterable(abort, body.stream(), client, request, socket, contentLength, header, expectsPayload);
        } else {
          writeBlob(abort, body, client, request, socket, contentLength, header, expectsPayload);
        }
      } else if (util.isStream(body)) {
        writeStream(abort, body, client, request, socket, contentLength, header, expectsPayload);
      } else if (util.isIterable(body)) {
        writeIterable(abort, body, client, request, socket, contentLength, header, expectsPayload);
      } else {
        assert(false);
      }
      return true;
    }
    function writeStream(abort, body, client, request, socket, contentLength, header, expectsPayload) {
      assert(contentLength !== 0 || client[kRunning] === 0, "stream body cannot be pipelined");
      let finished = false;
      const writer = new AsyncWriter({ abort, socket, request, contentLength, client, expectsPayload, header });
      const onData = function(chunk) {
        if (finished) {
          return;
        }
        try {
          if (!writer.write(chunk) && this.pause) {
            this.pause();
          }
        } catch (err) {
          util.destroy(this, err);
        }
      };
      const onDrain = function() {
        if (finished) {
          return;
        }
        if (body.resume) {
          body.resume();
        }
      };
      const onClose = function() {
        queueMicrotask(() => {
          body.removeListener("error", onFinished);
        });
        if (!finished) {
          const err = new RequestAbortedError();
          queueMicrotask(() => onFinished(err));
        }
      };
      const onFinished = function(err) {
        if (finished) {
          return;
        }
        finished = true;
        assert(socket.destroyed || socket[kWriting] && client[kRunning] <= 1);
        socket.off("drain", onDrain).off("error", onFinished);
        body.removeListener("data", onData).removeListener("end", onFinished).removeListener("close", onClose);
        if (!err) {
          try {
            writer.end();
          } catch (er) {
            err = er;
          }
        }
        writer.destroy(err);
        if (err && (err.code !== "UND_ERR_INFO" || err.message !== "reset")) {
          util.destroy(body, err);
        } else {
          util.destroy(body);
        }
      };
      body.on("data", onData).on("end", onFinished).on("error", onFinished).on("close", onClose);
      if (body.resume) {
        body.resume();
      }
      socket.on("drain", onDrain).on("error", onFinished);
      if (body.errorEmitted ?? body.errored) {
        setImmediate(() => onFinished(body.errored));
      } else if (body.endEmitted ?? body.readableEnded) {
        setImmediate(() => onFinished(null));
      }
      if (body.closeEmitted ?? body.closed) {
        setImmediate(onClose);
      }
    }
    function writeBuffer(abort, body, client, request, socket, contentLength, header, expectsPayload) {
      try {
        if (!body) {
          if (contentLength === 0) {
            socket.write(`${header}content-length: 0\r
\r
`, "latin1");
          } else {
            assert(contentLength === null, "no body must not have content length");
            socket.write(`${header}\r
`, "latin1");
          }
        } else if (util.isBuffer(body)) {
          assert(contentLength === body.byteLength, "buffer body must have content length");
          socket.cork();
          socket.write(`${header}content-length: ${contentLength}\r
\r
`, "latin1");
          socket.write(body);
          socket.uncork();
          request.onBodySent(body);
          if (!expectsPayload && request.reset !== false) {
            socket[kReset] = true;
          }
        }
        request.onRequestSent();
        client[kResume]();
      } catch (err) {
        abort(err);
      }
    }
    async function writeBlob(abort, body, client, request, socket, contentLength, header, expectsPayload) {
      assert(contentLength === body.size, "blob body must have content length");
      try {
        if (contentLength != null && contentLength !== body.size) {
          throw new RequestContentLengthMismatchError();
        }
        const buffer = Buffer.from(await body.arrayBuffer());
        socket.cork();
        socket.write(`${header}content-length: ${contentLength}\r
\r
`, "latin1");
        socket.write(buffer);
        socket.uncork();
        request.onBodySent(buffer);
        request.onRequestSent();
        if (!expectsPayload && request.reset !== false) {
          socket[kReset] = true;
        }
        client[kResume]();
      } catch (err) {
        abort(err);
      }
    }
    async function writeIterable(abort, body, client, request, socket, contentLength, header, expectsPayload) {
      assert(contentLength !== 0 || client[kRunning] === 0, "iterator body cannot be pipelined");
      let callback = null;
      function onDrain() {
        if (callback) {
          const cb = callback;
          callback = null;
          cb();
        }
      }
      const waitForDrain = () => new Promise((resolve, reject) => {
        assert(callback === null);
        if (socket[kError]) {
          reject(socket[kError]);
        } else {
          callback = resolve;
        }
      });
      socket.on("close", onDrain).on("drain", onDrain);
      const writer = new AsyncWriter({ abort, socket, request, contentLength, client, expectsPayload, header });
      try {
        for await (const chunk of body) {
          if (socket[kError]) {
            throw socket[kError];
          }
          if (!writer.write(chunk)) {
            await waitForDrain();
          }
        }
        writer.end();
      } catch (err) {
        writer.destroy(err);
      } finally {
        socket.off("close", onDrain).off("drain", onDrain);
      }
    }
    var AsyncWriter = class {
      /**
       *
       * @param {object} arg
       * @param {AbortCallback} arg.abort
       * @param {import('net').Socket} arg.socket
       * @param {import('../core/request.js')} arg.request
       * @param {number} arg.contentLength
       * @param {import('./client.js')} arg.client
       * @param {boolean} arg.expectsPayload
       * @param {string} arg.header
       */
      constructor({ abort, socket, request, contentLength, client, expectsPayload, header }) {
        this.socket = socket;
        this.request = request;
        this.contentLength = contentLength;
        this.client = client;
        this.bytesWritten = 0;
        this.expectsPayload = expectsPayload;
        this.header = header;
        this.abort = abort;
        socket[kWriting] = true;
      }
      /**
       * @param {Buffer} chunk
       * @returns
       */
      write(chunk) {
        const { socket, request, contentLength, client, bytesWritten, expectsPayload, header } = this;
        if (socket[kError]) {
          throw socket[kError];
        }
        if (socket.destroyed) {
          return false;
        }
        const len = Buffer.byteLength(chunk);
        if (!len) {
          return true;
        }
        if (contentLength !== null && bytesWritten + len > contentLength) {
          if (client[kStrictContentLength]) {
            throw new RequestContentLengthMismatchError();
          }
          process.emitWarning(new RequestContentLengthMismatchError());
        }
        socket.cork();
        if (bytesWritten === 0) {
          if (!expectsPayload && request.reset !== false) {
            socket[kReset] = true;
          }
          if (contentLength === null) {
            socket.write(`${header}transfer-encoding: chunked\r
`, "latin1");
          } else {
            socket.write(`${header}content-length: ${contentLength}\r
\r
`, "latin1");
          }
        }
        if (contentLength === null) {
          socket.write(`\r
${len.toString(16)}\r
`, "latin1");
        }
        this.bytesWritten += len;
        const ret = socket.write(chunk);
        socket.uncork();
        request.onBodySent(chunk);
        if (!ret) {
          if (socket[kParser].timeout && socket[kParser].timeoutType === TIMEOUT_HEADERS) {
            if (socket[kParser].timeout.refresh) {
              socket[kParser].timeout.refresh();
            }
          }
        }
        return ret;
      }
      /**
       * @returns {void}
       */
      end() {
        const { socket, contentLength, client, bytesWritten, expectsPayload, header, request } = this;
        request.onRequestSent();
        socket[kWriting] = false;
        if (socket[kError]) {
          throw socket[kError];
        }
        if (socket.destroyed) {
          return;
        }
        if (bytesWritten === 0) {
          if (expectsPayload) {
            socket.write(`${header}content-length: 0\r
\r
`, "latin1");
          } else {
            socket.write(`${header}\r
`, "latin1");
          }
        } else if (contentLength === null) {
          socket.write("\r\n0\r\n\r\n", "latin1");
        }
        if (contentLength !== null && bytesWritten !== contentLength) {
          if (client[kStrictContentLength]) {
            throw new RequestContentLengthMismatchError();
          } else {
            process.emitWarning(new RequestContentLengthMismatchError());
          }
        }
        if (socket[kParser].timeout && socket[kParser].timeoutType === TIMEOUT_HEADERS) {
          if (socket[kParser].timeout.refresh) {
            socket[kParser].timeout.refresh();
          }
        }
        client[kResume]();
      }
      /**
       * @param {Error} [err]
       * @returns {void}
       */
      destroy(err) {
        const { socket, client, abort } = this;
        socket[kWriting] = false;
        if (err) {
          assert(client[kRunning] <= 1, "pipeline should only contain this request");
          abort(err);
        }
      }
    };
    module2.exports = connectH1;
  }
});

// node_modules/undici/lib/dispatcher/client-h2.js
var require_client_h2 = __commonJS({
  "node_modules/undici/lib/dispatcher/client-h2.js"(exports2, module2) {
    "use strict";
    var assert = require("node:assert");
    var { pipeline } = require("node:stream");
    var util = require_util();
    var {
      RequestContentLengthMismatchError,
      RequestAbortedError,
      SocketError,
      InformationalError
    } = require_errors();
    var {
      kUrl,
      kReset,
      kClient,
      kRunning,
      kPending,
      kQueue,
      kPendingIdx,
      kRunningIdx,
      kError,
      kSocket,
      kStrictContentLength,
      kOnError,
      kMaxConcurrentStreams,
      kHTTP2Session,
      kResume,
      kSize,
      kHTTPContext,
      kClosed,
      kBodyTimeout
    } = require_symbols();
    var { channels } = require_diagnostics();
    var kOpenStreams = Symbol("open streams");
    var extractBody;
    var http2;
    try {
      http2 = require("node:http2");
    } catch {
      http2 = { constants: {} };
    }
    var {
      constants: {
        HTTP2_HEADER_AUTHORITY,
        HTTP2_HEADER_METHOD,
        HTTP2_HEADER_PATH,
        HTTP2_HEADER_SCHEME,
        HTTP2_HEADER_CONTENT_LENGTH,
        HTTP2_HEADER_EXPECT,
        HTTP2_HEADER_STATUS
      }
    } = http2;
    function parseH2Headers(headers) {
      const result = [];
      for (const [name, value] of Object.entries(headers)) {
        if (Array.isArray(value)) {
          for (const subvalue of value) {
            result.push(Buffer.from(name), Buffer.from(subvalue));
          }
        } else {
          result.push(Buffer.from(name), Buffer.from(value));
        }
      }
      return result;
    }
    async function connectH2(client, socket) {
      client[kSocket] = socket;
      const session = http2.connect(client[kUrl], {
        createConnection: () => socket,
        peerMaxConcurrentStreams: client[kMaxConcurrentStreams],
        settings: {
          // TODO(metcoder95): add support for PUSH
          enablePush: false
        }
      });
      session[kOpenStreams] = 0;
      session[kClient] = client;
      session[kSocket] = socket;
      session[kHTTP2Session] = null;
      util.addListener(session, "error", onHttp2SessionError);
      util.addListener(session, "frameError", onHttp2FrameError);
      util.addListener(session, "end", onHttp2SessionEnd);
      util.addListener(session, "goaway", onHttp2SessionGoAway);
      util.addListener(session, "close", onHttp2SessionClose);
      session.unref();
      client[kHTTP2Session] = session;
      socket[kHTTP2Session] = session;
      util.addListener(socket, "error", onHttp2SocketError);
      util.addListener(socket, "end", onHttp2SocketEnd);
      util.addListener(socket, "close", onHttp2SocketClose);
      socket[kClosed] = false;
      socket.on("close", onSocketClose);
      return {
        version: "h2",
        defaultPipelining: Infinity,
        write(request) {
          return writeH2(client, request);
        },
        resume() {
          resumeH2(client);
        },
        destroy(err, callback) {
          if (socket[kClosed]) {
            queueMicrotask(callback);
          } else {
            socket.destroy(err).on("close", callback);
          }
        },
        get destroyed() {
          return socket.destroyed;
        },
        busy() {
          return false;
        }
      };
    }
    function resumeH2(client) {
      const socket = client[kSocket];
      if (socket?.destroyed === false) {
        if (client[kSize] === 0 || client[kMaxConcurrentStreams] === 0) {
          socket.unref();
          client[kHTTP2Session].unref();
        } else {
          socket.ref();
          client[kHTTP2Session].ref();
        }
      }
    }
    function onHttp2SessionError(err) {
      assert(err.code !== "ERR_TLS_CERT_ALTNAME_INVALID");
      this[kSocket][kError] = err;
      this[kClient][kOnError](err);
    }
    function onHttp2FrameError(type, code, id) {
      if (id === 0) {
        const err = new InformationalError(`HTTP/2: "frameError" received - type ${type}, code ${code}`);
        this[kSocket][kError] = err;
        this[kClient][kOnError](err);
      }
    }
    function onHttp2SessionEnd() {
      const err = new SocketError("other side closed", util.getSocketInfo(this[kSocket]));
      this.destroy(err);
      util.destroy(this[kSocket], err);
    }
    function onHttp2SessionGoAway(errorCode) {
      const err = this[kError] || new SocketError(`HTTP/2: "GOAWAY" frame received with code ${errorCode}`, util.getSocketInfo(this[kSocket]));
      const client = this[kClient];
      client[kSocket] = null;
      client[kHTTPContext] = null;
      this.close();
      this[kHTTP2Session] = null;
      util.destroy(this[kSocket], err);
      if (client[kRunningIdx] < client[kQueue].length) {
        const request = client[kQueue][client[kRunningIdx]];
        client[kQueue][client[kRunningIdx]++] = null;
        util.errorRequest(client, request, err);
        client[kPendingIdx] = client[kRunningIdx];
      }
      assert(client[kRunning] === 0);
      client.emit("disconnect", client[kUrl], [client], err);
      client.emit("connectionError", client[kUrl], [client], err);
      client[kResume]();
    }
    function onHttp2SessionClose() {
      const { [kClient]: client } = this;
      const { [kSocket]: socket } = client;
      const err = this[kSocket][kError] || this[kError] || new SocketError("closed", util.getSocketInfo(socket));
      client[kSocket] = null;
      client[kHTTPContext] = null;
      if (client.destroyed) {
        assert(client[kPending] === 0);
        const requests = client[kQueue].splice(client[kRunningIdx]);
        for (let i = 0; i < requests.length; i++) {
          const request = requests[i];
          util.errorRequest(client, request, err);
        }
      }
    }
    function onHttp2SocketClose() {
      const err = this[kError] || new SocketError("closed", util.getSocketInfo(this));
      const client = this[kHTTP2Session][kClient];
      client[kSocket] = null;
      client[kHTTPContext] = null;
      if (this[kHTTP2Session] !== null) {
        this[kHTTP2Session].destroy(err);
      }
      client[kPendingIdx] = client[kRunningIdx];
      assert(client[kRunning] === 0);
      client.emit("disconnect", client[kUrl], [client], err);
      client[kResume]();
    }
    function onHttp2SocketError(err) {
      assert(err.code !== "ERR_TLS_CERT_ALTNAME_INVALID");
      this[kError] = err;
      this[kClient][kOnError](err);
    }
    function onHttp2SocketEnd() {
      util.destroy(this, new SocketError("other side closed", util.getSocketInfo(this)));
    }
    function onSocketClose() {
      this[kClosed] = true;
    }
    function shouldSendContentLength(method) {
      return method !== "GET" && method !== "HEAD" && method !== "OPTIONS" && method !== "TRACE" && method !== "CONNECT";
    }
    function writeH2(client, request) {
      const requestTimeout = request.bodyTimeout ?? client[kBodyTimeout];
      const session = client[kHTTP2Session];
      const { method, path, host, upgrade, expectContinue, signal, headers: reqHeaders } = request;
      let { body } = request;
      if (upgrade) {
        util.errorRequest(client, request, new Error("Upgrade not supported for H2"));
        return false;
      }
      const headers = {};
      for (let n = 0; n < reqHeaders.length; n += 2) {
        const key = reqHeaders[n + 0];
        const val = reqHeaders[n + 1];
        if (Array.isArray(val)) {
          for (let i = 0; i < val.length; i++) {
            if (headers[key]) {
              headers[key] += `, ${val[i]}`;
            } else {
              headers[key] = val[i];
            }
          }
        } else if (headers[key]) {
          headers[key] += `, ${val}`;
        } else {
          headers[key] = val;
        }
      }
      let stream = null;
      const { hostname, port } = client[kUrl];
      headers[HTTP2_HEADER_AUTHORITY] = host || `${hostname}${port ? `:${port}` : ""}`;
      headers[HTTP2_HEADER_METHOD] = method;
      const abort = (err) => {
        if (request.aborted || request.completed) {
          return;
        }
        err = err || new RequestAbortedError();
        util.errorRequest(client, request, err);
        if (stream != null) {
          stream.removeAllListeners("data");
          stream.close();
          client[kOnError](err);
          client[kResume]();
        }
        util.destroy(body, err);
      };
      try {
        request.onConnect(abort);
      } catch (err) {
        util.errorRequest(client, request, err);
      }
      if (request.aborted) {
        return false;
      }
      if (method === "CONNECT") {
        session.ref();
        stream = session.request(headers, { endStream: false, signal });
        if (!stream.pending) {
          request.onUpgrade(null, null, stream);
          ++session[kOpenStreams];
          client[kQueue][client[kRunningIdx]++] = null;
        } else {
          stream.once("ready", () => {
            request.onUpgrade(null, null, stream);
            ++session[kOpenStreams];
            client[kQueue][client[kRunningIdx]++] = null;
          });
        }
        stream.once("close", () => {
          session[kOpenStreams] -= 1;
          if (session[kOpenStreams] === 0) session.unref();
        });
        stream.setTimeout(requestTimeout);
        return true;
      }
      headers[HTTP2_HEADER_PATH] = path;
      headers[HTTP2_HEADER_SCHEME] = "https";
      const expectsPayload = method === "PUT" || method === "POST" || method === "PATCH";
      if (body && typeof body.read === "function") {
        body.read(0);
      }
      let contentLength = util.bodyLength(body);
      if (util.isFormDataLike(body)) {
        extractBody ??= require_body().extractBody;
        const [bodyStream, contentType] = extractBody(body);
        headers["content-type"] = contentType;
        body = bodyStream.stream;
        contentLength = bodyStream.length;
      }
      if (contentLength == null) {
        contentLength = request.contentLength;
      }
      if (contentLength === 0 || !expectsPayload) {
        contentLength = null;
      }
      if (shouldSendContentLength(method) && contentLength > 0 && request.contentLength != null && request.contentLength !== contentLength) {
        if (client[kStrictContentLength]) {
          util.errorRequest(client, request, new RequestContentLengthMismatchError());
          return false;
        }
        process.emitWarning(new RequestContentLengthMismatchError());
      }
      if (contentLength != null) {
        assert(body, "no body must not have content length");
        headers[HTTP2_HEADER_CONTENT_LENGTH] = `${contentLength}`;
      }
      session.ref();
      if (channels.sendHeaders.hasSubscribers) {
        let header = "";
        for (const key in headers) {
          header += `${key}: ${headers[key]}\r
`;
        }
        channels.sendHeaders.publish({ request, headers: header, socket: session[kSocket] });
      }
      const shouldEndStream = method === "GET" || method === "HEAD" || body === null;
      if (expectContinue) {
        headers[HTTP2_HEADER_EXPECT] = "100-continue";
        stream = session.request(headers, { endStream: shouldEndStream, signal });
        stream.once("continue", writeBodyH2);
      } else {
        stream = session.request(headers, {
          endStream: shouldEndStream,
          signal
        });
        writeBodyH2();
      }
      ++session[kOpenStreams];
      stream.setTimeout(requestTimeout);
      stream.once("response", (headers2) => {
        const { [HTTP2_HEADER_STATUS]: statusCode, ...realHeaders } = headers2;
        request.onResponseStarted();
        if (request.aborted) {
          stream.removeAllListeners("data");
          return;
        }
        if (request.onHeaders(Number(statusCode), parseH2Headers(realHeaders), stream.resume.bind(stream), "") === false) {
          stream.pause();
        }
      });
      stream.on("data", (chunk) => {
        if (request.onData(chunk) === false) {
          stream.pause();
        }
      });
      stream.once("end", (err) => {
        stream.removeAllListeners("data");
        if (stream.state?.state == null || stream.state.state < 6) {
          if (!request.aborted && !request.completed) {
            request.onComplete({});
          }
          client[kQueue][client[kRunningIdx]++] = null;
          client[kResume]();
        } else {
          --session[kOpenStreams];
          if (session[kOpenStreams] === 0) {
            session.unref();
          }
          abort(err ?? new InformationalError("HTTP/2: stream half-closed (remote)"));
          client[kQueue][client[kRunningIdx]++] = null;
          client[kPendingIdx] = client[kRunningIdx];
          client[kResume]();
        }
      });
      stream.once("close", () => {
        stream.removeAllListeners("data");
        session[kOpenStreams] -= 1;
        if (session[kOpenStreams] === 0) {
          session.unref();
        }
      });
      stream.once("error", function(err) {
        stream.removeAllListeners("data");
        abort(err);
      });
      stream.once("frameError", (type, code) => {
        stream.removeAllListeners("data");
        abort(new InformationalError(`HTTP/2: "frameError" received - type ${type}, code ${code}`));
      });
      stream.on("aborted", () => {
        stream.removeAllListeners("data");
      });
      stream.on("timeout", () => {
        const err = new InformationalError(`HTTP/2: "stream timeout after ${requestTimeout}"`);
        stream.removeAllListeners("data");
        session[kOpenStreams] -= 1;
        if (session[kOpenStreams] === 0) {
          session.unref();
        }
        abort(err);
      });
      stream.once("trailers", (trailers) => {
        if (request.aborted || request.completed) {
          return;
        }
        request.onComplete(trailers);
      });
      return true;
      function writeBodyH2() {
        if (!body || contentLength === 0) {
          writeBuffer(
            abort,
            stream,
            null,
            client,
            request,
            client[kSocket],
            contentLength,
            expectsPayload
          );
        } else if (util.isBuffer(body)) {
          writeBuffer(
            abort,
            stream,
            body,
            client,
            request,
            client[kSocket],
            contentLength,
            expectsPayload
          );
        } else if (util.isBlobLike(body)) {
          if (typeof body.stream === "function") {
            writeIterable(
              abort,
              stream,
              body.stream(),
              client,
              request,
              client[kSocket],
              contentLength,
              expectsPayload
            );
          } else {
            writeBlob(
              abort,
              stream,
              body,
              client,
              request,
              client[kSocket],
              contentLength,
              expectsPayload
            );
          }
        } else if (util.isStream(body)) {
          writeStream(
            abort,
            client[kSocket],
            expectsPayload,
            stream,
            body,
            client,
            request,
            contentLength
          );
        } else if (util.isIterable(body)) {
          writeIterable(
            abort,
            stream,
            body,
            client,
            request,
            client[kSocket],
            contentLength,
            expectsPayload
          );
        } else {
          assert(false);
        }
      }
    }
    function writeBuffer(abort, h2stream, body, client, request, socket, contentLength, expectsPayload) {
      try {
        if (body != null && util.isBuffer(body)) {
          assert(contentLength === body.byteLength, "buffer body must have content length");
          h2stream.cork();
          h2stream.write(body);
          h2stream.uncork();
          h2stream.end();
          request.onBodySent(body);
        }
        if (!expectsPayload) {
          socket[kReset] = true;
        }
        request.onRequestSent();
        client[kResume]();
      } catch (error) {
        abort(error);
      }
    }
    function writeStream(abort, socket, expectsPayload, h2stream, body, client, request, contentLength) {
      assert(contentLength !== 0 || client[kRunning] === 0, "stream body cannot be pipelined");
      const pipe = pipeline(
        body,
        h2stream,
        (err) => {
          if (err) {
            util.destroy(pipe, err);
            abort(err);
          } else {
            util.removeAllListeners(pipe);
            request.onRequestSent();
            if (!expectsPayload) {
              socket[kReset] = true;
            }
            client[kResume]();
          }
        }
      );
      util.addListener(pipe, "data", onPipeData);
      function onPipeData(chunk) {
        request.onBodySent(chunk);
      }
    }
    async function writeBlob(abort, h2stream, body, client, request, socket, contentLength, expectsPayload) {
      assert(contentLength === body.size, "blob body must have content length");
      try {
        if (contentLength != null && contentLength !== body.size) {
          throw new RequestContentLengthMismatchError();
        }
        const buffer = Buffer.from(await body.arrayBuffer());
        h2stream.cork();
        h2stream.write(buffer);
        h2stream.uncork();
        h2stream.end();
        request.onBodySent(buffer);
        request.onRequestSent();
        if (!expectsPayload) {
          socket[kReset] = true;
        }
        client[kResume]();
      } catch (err) {
        abort(err);
      }
    }
    async function writeIterable(abort, h2stream, body, client, request, socket, contentLength, expectsPayload) {
      assert(contentLength !== 0 || client[kRunning] === 0, "iterator body cannot be pipelined");
      let callback = null;
      function onDrain() {
        if (callback) {
          const cb = callback;
          callback = null;
          cb();
        }
      }
      const waitForDrain = () => new Promise((resolve, reject) => {
        assert(callback === null);
        if (socket[kError]) {
          reject(socket[kError]);
        } else {
          callback = resolve;
        }
      });
      h2stream.on("close", onDrain).on("drain", onDrain);
      try {
        for await (const chunk of body) {
          if (socket[kError]) {
            throw socket[kError];
          }
          const res = h2stream.write(chunk);
          request.onBodySent(chunk);
          if (!res) {
            await waitForDrain();
          }
        }
        h2stream.end();
        request.onRequestSent();
        if (!expectsPayload) {
          socket[kReset] = true;
        }
        client[kResume]();
      } catch (err) {
        abort(err);
      } finally {
        h2stream.off("close", onDrain).off("drain", onDrain);
      }
    }
    module2.exports = connectH2;
  }
});

// node_modules/undici/lib/dispatcher/client.js
var require_client = __commonJS({
  "node_modules/undici/lib/dispatcher/client.js"(exports2, module2) {
    "use strict";
    var assert = require("node:assert");
    var net = require("node:net");
    var http = require("node:http");
    var util = require_util();
    var { ClientStats } = require_stats();
    var { channels } = require_diagnostics();
    var Request = require_request();
    var DispatcherBase = require_dispatcher_base();
    var {
      InvalidArgumentError,
      InformationalError,
      ClientDestroyedError
    } = require_errors();
    var buildConnector = require_connect();
    var {
      kUrl,
      kServerName,
      kClient,
      kBusy,
      kConnect,
      kResuming,
      kRunning,
      kPending,
      kSize,
      kQueue,
      kConnected,
      kConnecting,
      kNeedDrain,
      kKeepAliveDefaultTimeout,
      kHostHeader,
      kPendingIdx,
      kRunningIdx,
      kError,
      kPipelining,
      kKeepAliveTimeoutValue,
      kMaxHeadersSize,
      kKeepAliveMaxTimeout,
      kKeepAliveTimeoutThreshold,
      kHeadersTimeout,
      kBodyTimeout,
      kStrictContentLength,
      kConnector,
      kMaxRequests,
      kCounter,
      kClose,
      kDestroy,
      kDispatch,
      kLocalAddress,
      kMaxResponseSize,
      kOnError,
      kHTTPContext,
      kMaxConcurrentStreams,
      kResume
    } = require_symbols();
    var connectH1 = require_client_h1();
    var connectH2 = require_client_h2();
    var kClosedResolve = Symbol("kClosedResolve");
    var getDefaultNodeMaxHeaderSize = http && http.maxHeaderSize && Number.isInteger(http.maxHeaderSize) && http.maxHeaderSize > 0 ? () => http.maxHeaderSize : () => {
      throw new InvalidArgumentError("http module not available or http.maxHeaderSize invalid");
    };
    var noop = () => {
    };
    function getPipelining(client) {
      return client[kPipelining] ?? client[kHTTPContext]?.defaultPipelining ?? 1;
    }
    var Client = class extends DispatcherBase {
      /**
       *
       * @param {string|URL} url
       * @param {import('../../types/client.js').Client.Options} options
       */
      constructor(url, {
        maxHeaderSize,
        headersTimeout,
        socketTimeout,
        requestTimeout,
        connectTimeout,
        bodyTimeout,
        idleTimeout,
        keepAlive,
        keepAliveTimeout,
        maxKeepAliveTimeout,
        keepAliveMaxTimeout,
        keepAliveTimeoutThreshold,
        socketPath,
        pipelining,
        tls,
        strictContentLength,
        maxCachedSessions,
        connect: connect2,
        maxRequestsPerClient,
        localAddress,
        maxResponseSize,
        autoSelectFamily,
        autoSelectFamilyAttemptTimeout,
        // h2
        maxConcurrentStreams,
        allowH2
      } = {}) {
        if (keepAlive !== void 0) {
          throw new InvalidArgumentError("unsupported keepAlive, use pipelining=0 instead");
        }
        if (socketTimeout !== void 0) {
          throw new InvalidArgumentError("unsupported socketTimeout, use headersTimeout & bodyTimeout instead");
        }
        if (requestTimeout !== void 0) {
          throw new InvalidArgumentError("unsupported requestTimeout, use headersTimeout & bodyTimeout instead");
        }
        if (idleTimeout !== void 0) {
          throw new InvalidArgumentError("unsupported idleTimeout, use keepAliveTimeout instead");
        }
        if (maxKeepAliveTimeout !== void 0) {
          throw new InvalidArgumentError("unsupported maxKeepAliveTimeout, use keepAliveMaxTimeout instead");
        }
        if (maxHeaderSize != null) {
          if (!Number.isInteger(maxHeaderSize) || maxHeaderSize < 1) {
            throw new InvalidArgumentError("invalid maxHeaderSize");
          }
        } else {
          maxHeaderSize = getDefaultNodeMaxHeaderSize();
        }
        if (socketPath != null && typeof socketPath !== "string") {
          throw new InvalidArgumentError("invalid socketPath");
        }
        if (connectTimeout != null && (!Number.isFinite(connectTimeout) || connectTimeout < 0)) {
          throw new InvalidArgumentError("invalid connectTimeout");
        }
        if (keepAliveTimeout != null && (!Number.isFinite(keepAliveTimeout) || keepAliveTimeout <= 0)) {
          throw new InvalidArgumentError("invalid keepAliveTimeout");
        }
        if (keepAliveMaxTimeout != null && (!Number.isFinite(keepAliveMaxTimeout) || keepAliveMaxTimeout <= 0)) {
          throw new InvalidArgumentError("invalid keepAliveMaxTimeout");
        }
        if (keepAliveTimeoutThreshold != null && !Number.isFinite(keepAliveTimeoutThreshold)) {
          throw new InvalidArgumentError("invalid keepAliveTimeoutThreshold");
        }
        if (headersTimeout != null && (!Number.isInteger(headersTimeout) || headersTimeout < 0)) {
          throw new InvalidArgumentError("headersTimeout must be a positive integer or zero");
        }
        if (bodyTimeout != null && (!Number.isInteger(bodyTimeout) || bodyTimeout < 0)) {
          throw new InvalidArgumentError("bodyTimeout must be a positive integer or zero");
        }
        if (connect2 != null && typeof connect2 !== "function" && typeof connect2 !== "object") {
          throw new InvalidArgumentError("connect must be a function or an object");
        }
        if (maxRequestsPerClient != null && (!Number.isInteger(maxRequestsPerClient) || maxRequestsPerClient < 0)) {
          throw new InvalidArgumentError("maxRequestsPerClient must be a positive number");
        }
        if (localAddress != null && (typeof localAddress !== "string" || net.isIP(localAddress) === 0)) {
          throw new InvalidArgumentError("localAddress must be valid string IP address");
        }
        if (maxResponseSize != null && (!Number.isInteger(maxResponseSize) || maxResponseSize < -1)) {
          throw new InvalidArgumentError("maxResponseSize must be a positive number");
        }
        if (autoSelectFamilyAttemptTimeout != null && (!Number.isInteger(autoSelectFamilyAttemptTimeout) || autoSelectFamilyAttemptTimeout < -1)) {
          throw new InvalidArgumentError("autoSelectFamilyAttemptTimeout must be a positive number");
        }
        if (allowH2 != null && typeof allowH2 !== "boolean") {
          throw new InvalidArgumentError("allowH2 must be a valid boolean value");
        }
        if (maxConcurrentStreams != null && (typeof maxConcurrentStreams !== "number" || maxConcurrentStreams < 1)) {
          throw new InvalidArgumentError("maxConcurrentStreams must be a positive integer, greater than 0");
        }
        super();
        if (typeof connect2 !== "function") {
          connect2 = buildConnector({
            ...tls,
            maxCachedSessions,
            allowH2,
            socketPath,
            timeout: connectTimeout,
            ...typeof autoSelectFamily === "boolean" ? { autoSelectFamily, autoSelectFamilyAttemptTimeout } : void 0,
            ...connect2
          });
        }
        this[kUrl] = util.parseOrigin(url);
        this[kConnector] = connect2;
        this[kPipelining] = pipelining != null ? pipelining : 1;
        this[kMaxHeadersSize] = maxHeaderSize;
        this[kKeepAliveDefaultTimeout] = keepAliveTimeout == null ? 4e3 : keepAliveTimeout;
        this[kKeepAliveMaxTimeout] = keepAliveMaxTimeout == null ? 6e5 : keepAliveMaxTimeout;
        this[kKeepAliveTimeoutThreshold] = keepAliveTimeoutThreshold == null ? 2e3 : keepAliveTimeoutThreshold;
        this[kKeepAliveTimeoutValue] = this[kKeepAliveDefaultTimeout];
        this[kServerName] = null;
        this[kLocalAddress] = localAddress != null ? localAddress : null;
        this[kResuming] = 0;
        this[kNeedDrain] = 0;
        this[kHostHeader] = `host: ${this[kUrl].hostname}${this[kUrl].port ? `:${this[kUrl].port}` : ""}\r
`;
        this[kBodyTimeout] = bodyTimeout != null ? bodyTimeout : 3e5;
        this[kHeadersTimeout] = headersTimeout != null ? headersTimeout : 3e5;
        this[kStrictContentLength] = strictContentLength == null ? true : strictContentLength;
        this[kMaxRequests] = maxRequestsPerClient;
        this[kClosedResolve] = null;
        this[kMaxResponseSize] = maxResponseSize > -1 ? maxResponseSize : -1;
        this[kMaxConcurrentStreams] = maxConcurrentStreams != null ? maxConcurrentStreams : 100;
        this[kHTTPContext] = null;
        this[kQueue] = [];
        this[kRunningIdx] = 0;
        this[kPendingIdx] = 0;
        this[kResume] = (sync) => resume(this, sync);
        this[kOnError] = (err) => onError(this, err);
      }
      get pipelining() {
        return this[kPipelining];
      }
      set pipelining(value) {
        this[kPipelining] = value;
        this[kResume](true);
      }
      get stats() {
        return new ClientStats(this);
      }
      get [kPending]() {
        return this[kQueue].length - this[kPendingIdx];
      }
      get [kRunning]() {
        return this[kPendingIdx] - this[kRunningIdx];
      }
      get [kSize]() {
        return this[kQueue].length - this[kRunningIdx];
      }
      get [kConnected]() {
        return !!this[kHTTPContext] && !this[kConnecting] && !this[kHTTPContext].destroyed;
      }
      get [kBusy]() {
        return Boolean(
          this[kHTTPContext]?.busy(null) || this[kSize] >= (getPipelining(this) || 1) || this[kPending] > 0
        );
      }
      /* istanbul ignore: only used for test */
      [kConnect](cb) {
        connect(this);
        this.once("connect", cb);
      }
      [kDispatch](opts, handler) {
        const origin = opts.origin || this[kUrl].origin;
        const request = new Request(origin, opts, handler);
        this[kQueue].push(request);
        if (this[kResuming]) {
        } else if (util.bodyLength(request.body) == null && util.isIterable(request.body)) {
          this[kResuming] = 1;
          queueMicrotask(() => resume(this));
        } else {
          this[kResume](true);
        }
        if (this[kResuming] && this[kNeedDrain] !== 2 && this[kBusy]) {
          this[kNeedDrain] = 2;
        }
        return this[kNeedDrain] < 2;
      }
      async [kClose]() {
        return new Promise((resolve) => {
          if (this[kSize]) {
            this[kClosedResolve] = resolve;
          } else {
            resolve(null);
          }
        });
      }
      async [kDestroy](err) {
        return new Promise((resolve) => {
          const requests = this[kQueue].splice(this[kPendingIdx]);
          for (let i = 0; i < requests.length; i++) {
            const request = requests[i];
            util.errorRequest(this, request, err);
          }
          const callback = () => {
            if (this[kClosedResolve]) {
              this[kClosedResolve]();
              this[kClosedResolve] = null;
            }
            resolve(null);
          };
          if (this[kHTTPContext]) {
            this[kHTTPContext].destroy(err, callback);
            this[kHTTPContext] = null;
          } else {
            queueMicrotask(callback);
          }
          this[kResume]();
        });
      }
    };
    function onError(client, err) {
      if (client[kRunning] === 0 && err.code !== "UND_ERR_INFO" && err.code !== "UND_ERR_SOCKET") {
        assert(client[kPendingIdx] === client[kRunningIdx]);
        const requests = client[kQueue].splice(client[kRunningIdx]);
        for (let i = 0; i < requests.length; i++) {
          const request = requests[i];
          util.errorRequest(client, request, err);
        }
        assert(client[kSize] === 0);
      }
    }
    async function connect(client) {
      assert(!client[kConnecting]);
      assert(!client[kHTTPContext]);
      let { host, hostname, protocol, port } = client[kUrl];
      if (hostname[0] === "[") {
        const idx = hostname.indexOf("]");
        assert(idx !== -1);
        const ip = hostname.substring(1, idx);
        assert(net.isIPv6(ip));
        hostname = ip;
      }
      client[kConnecting] = true;
      if (channels.beforeConnect.hasSubscribers) {
        channels.beforeConnect.publish({
          connectParams: {
            host,
            hostname,
            protocol,
            port,
            version: client[kHTTPContext]?.version,
            servername: client[kServerName],
            localAddress: client[kLocalAddress]
          },
          connector: client[kConnector]
        });
      }
      try {
        const socket = await new Promise((resolve, reject) => {
          client[kConnector]({
            host,
            hostname,
            protocol,
            port,
            servername: client[kServerName],
            localAddress: client[kLocalAddress]
          }, (err, socket2) => {
            if (err) {
              reject(err);
            } else {
              resolve(socket2);
            }
          });
        });
        if (client.destroyed) {
          util.destroy(socket.on("error", noop), new ClientDestroyedError());
          return;
        }
        assert(socket);
        try {
          client[kHTTPContext] = socket.alpnProtocol === "h2" ? await connectH2(client, socket) : await connectH1(client, socket);
        } catch (err) {
          socket.destroy().on("error", noop);
          throw err;
        }
        client[kConnecting] = false;
        socket[kCounter] = 0;
        socket[kMaxRequests] = client[kMaxRequests];
        socket[kClient] = client;
        socket[kError] = null;
        if (channels.connected.hasSubscribers) {
          channels.connected.publish({
            connectParams: {
              host,
              hostname,
              protocol,
              port,
              version: client[kHTTPContext]?.version,
              servername: client[kServerName],
              localAddress: client[kLocalAddress]
            },
            connector: client[kConnector],
            socket
          });
        }
        client.emit("connect", client[kUrl], [client]);
      } catch (err) {
        if (client.destroyed) {
          return;
        }
        client[kConnecting] = false;
        if (channels.connectError.hasSubscribers) {
          channels.connectError.publish({
            connectParams: {
              host,
              hostname,
              protocol,
              port,
              version: client[kHTTPContext]?.version,
              servername: client[kServerName],
              localAddress: client[kLocalAddress]
            },
            connector: client[kConnector],
            error: err
          });
        }
        if (err.code === "ERR_TLS_CERT_ALTNAME_INVALID") {
          assert(client[kRunning] === 0);
          while (client[kPending] > 0 && client[kQueue][client[kPendingIdx]].servername === client[kServerName]) {
            const request = client[kQueue][client[kPendingIdx]++];
            util.errorRequest(client, request, err);
          }
        } else {
          onError(client, err);
        }
        client.emit("connectionError", client[kUrl], [client], err);
      }
      client[kResume]();
    }
    function emitDrain(client) {
      client[kNeedDrain] = 0;
      client.emit("drain", client[kUrl], [client]);
    }
    function resume(client, sync) {
      if (client[kResuming] === 2) {
        return;
      }
      client[kResuming] = 2;
      _resume(client, sync);
      client[kResuming] = 0;
      if (client[kRunningIdx] > 256) {
        client[kQueue].splice(0, client[kRunningIdx]);
        client[kPendingIdx] -= client[kRunningIdx];
        client[kRunningIdx] = 0;
      }
    }
    function _resume(client, sync) {
      while (true) {
        if (client.destroyed) {
          assert(client[kPending] === 0);
          return;
        }
        if (client[kClosedResolve] && !client[kSize]) {
          client[kClosedResolve]();
          client[kClosedResolve] = null;
          return;
        }
        if (client[kHTTPContext]) {
          client[kHTTPContext].resume();
        }
        if (client[kBusy]) {
          client[kNeedDrain] = 2;
        } else if (client[kNeedDrain] === 2) {
          if (sync) {
            client[kNeedDrain] = 1;
            queueMicrotask(() => emitDrain(client));
          } else {
            emitDrain(client);
          }
          continue;
        }
        if (client[kPending] === 0) {
          return;
        }
        if (client[kRunning] >= (getPipelining(client) || 1)) {
          return;
        }
        const request = client[kQueue][client[kPendingIdx]];
        if (client[kUrl].protocol === "https:" && client[kServerName] !== request.servername) {
          if (client[kRunning] > 0) {
            return;
          }
          client[kServerName] = request.servername;
          client[kHTTPContext]?.destroy(new InformationalError("servername changed"), () => {
            client[kHTTPContext] = null;
            resume(client);
          });
        }
        if (client[kConnecting]) {
          return;
        }
        if (!client[kHTTPContext]) {
          connect(client);
          return;
        }
        if (client[kHTTPContext].destroyed) {
          return;
        }
        if (client[kHTTPContext].busy(request)) {
          return;
        }
        if (!request.aborted && client[kHTTPContext].write(request)) {
          client[kPendingIdx]++;
        } else {
          client[kQueue].splice(client[kPendingIdx], 1);
        }
      }
    }
    module2.exports = Client;
  }
});

// node_modules/undici/lib/dispatcher/fixed-queue.js
var require_fixed_queue = __commonJS({
  "node_modules/undici/lib/dispatcher/fixed-queue.js"(exports2, module2) {
    "use strict";
    var kSize = 2048;
    var kMask = kSize - 1;
    var FixedCircularBuffer = class {
      constructor() {
        this.bottom = 0;
        this.top = 0;
        this.list = new Array(kSize).fill(void 0);
        this.next = null;
      }
      /**
       * @returns {boolean}
       */
      isEmpty() {
        return this.top === this.bottom;
      }
      /**
       * @returns {boolean}
       */
      isFull() {
        return (this.top + 1 & kMask) === this.bottom;
      }
      /**
       * @param {T} data
       * @returns {void}
       */
      push(data) {
        this.list[this.top] = data;
        this.top = this.top + 1 & kMask;
      }
      /**
       * @returns {T|null}
       */
      shift() {
        const nextItem = this.list[this.bottom];
        if (nextItem === void 0) {
          return null;
        }
        this.list[this.bottom] = void 0;
        this.bottom = this.bottom + 1 & kMask;
        return nextItem;
      }
    };
    module2.exports = class FixedQueue {
      constructor() {
        this.head = this.tail = new FixedCircularBuffer();
      }
      /**
       * @returns {boolean}
       */
      isEmpty() {
        return this.head.isEmpty();
      }
      /**
       * @param {T} data
       */
      push(data) {
        if (this.head.isFull()) {
          this.head = this.head.next = new FixedCircularBuffer();
        }
        this.head.push(data);
      }
      /**
       * @returns {T|null}
       */
      shift() {
        const tail = this.tail;
        const next = tail.shift();
        if (tail.isEmpty() && tail.next !== null) {
          this.tail = tail.next;
          tail.next = null;
        }
        return next;
      }
    };
  }
});

// node_modules/undici/lib/dispatcher/pool-base.js
var require_pool_base = __commonJS({
  "node_modules/undici/lib/dispatcher/pool-base.js"(exports2, module2) {
    "use strict";
    var { PoolStats } = require_stats();
    var DispatcherBase = require_dispatcher_base();
    var FixedQueue = require_fixed_queue();
    var { kConnected, kSize, kRunning, kPending, kQueued, kBusy, kFree, kUrl, kClose, kDestroy, kDispatch } = require_symbols();
    var kClients = Symbol("clients");
    var kNeedDrain = Symbol("needDrain");
    var kQueue = Symbol("queue");
    var kClosedResolve = Symbol("closed resolve");
    var kOnDrain = Symbol("onDrain");
    var kOnConnect = Symbol("onConnect");
    var kOnDisconnect = Symbol("onDisconnect");
    var kOnConnectionError = Symbol("onConnectionError");
    var kGetDispatcher = Symbol("get dispatcher");
    var kAddClient = Symbol("add client");
    var kRemoveClient = Symbol("remove client");
    var PoolBase = class extends DispatcherBase {
      constructor() {
        super();
        this[kQueue] = new FixedQueue();
        this[kClients] = [];
        this[kQueued] = 0;
        const pool = this;
        this[kOnDrain] = function onDrain(origin, targets) {
          const queue = pool[kQueue];
          let needDrain = false;
          while (!needDrain) {
            const item = queue.shift();
            if (!item) {
              break;
            }
            pool[kQueued]--;
            needDrain = !this.dispatch(item.opts, item.handler);
          }
          this[kNeedDrain] = needDrain;
          if (!this[kNeedDrain] && pool[kNeedDrain]) {
            pool[kNeedDrain] = false;
            pool.emit("drain", origin, [pool, ...targets]);
          }
          if (pool[kClosedResolve] && queue.isEmpty()) {
            Promise.all(pool[kClients].map((c) => c.close())).then(pool[kClosedResolve]);
          }
        };
        this[kOnConnect] = (origin, targets) => {
          pool.emit("connect", origin, [pool, ...targets]);
        };
        this[kOnDisconnect] = (origin, targets, err) => {
          pool.emit("disconnect", origin, [pool, ...targets], err);
        };
        this[kOnConnectionError] = (origin, targets, err) => {
          pool.emit("connectionError", origin, [pool, ...targets], err);
        };
      }
      get [kBusy]() {
        return this[kNeedDrain];
      }
      get [kConnected]() {
        return this[kClients].filter((client) => client[kConnected]).length;
      }
      get [kFree]() {
        return this[kClients].filter((client) => client[kConnected] && !client[kNeedDrain]).length;
      }
      get [kPending]() {
        let ret = this[kQueued];
        for (const { [kPending]: pending } of this[kClients]) {
          ret += pending;
        }
        return ret;
      }
      get [kRunning]() {
        let ret = 0;
        for (const { [kRunning]: running } of this[kClients]) {
          ret += running;
        }
        return ret;
      }
      get [kSize]() {
        let ret = this[kQueued];
        for (const { [kSize]: size } of this[kClients]) {
          ret += size;
        }
        return ret;
      }
      get stats() {
        return new PoolStats(this);
      }
      async [kClose]() {
        if (this[kQueue].isEmpty()) {
          await Promise.all(this[kClients].map((c) => c.close()));
        } else {
          await new Promise((resolve) => {
            this[kClosedResolve] = resolve;
          });
        }
      }
      async [kDestroy](err) {
        while (true) {
          const item = this[kQueue].shift();
          if (!item) {
            break;
          }
          item.handler.onError(err);
        }
        await Promise.all(this[kClients].map((c) => c.destroy(err)));
      }
      [kDispatch](opts, handler) {
        const dispatcher = this[kGetDispatcher]();
        if (!dispatcher) {
          this[kNeedDrain] = true;
          this[kQueue].push({ opts, handler });
          this[kQueued]++;
        } else if (!dispatcher.dispatch(opts, handler)) {
          dispatcher[kNeedDrain] = true;
          this[kNeedDrain] = !this[kGetDispatcher]();
        }
        return !this[kNeedDrain];
      }
      [kAddClient](client) {
        client.on("drain", this[kOnDrain]).on("connect", this[kOnConnect]).on("disconnect", this[kOnDisconnect]).on("connectionError", this[kOnConnectionError]);
        this[kClients].push(client);
        if (this[kNeedDrain]) {
          queueMicrotask(() => {
            if (this[kNeedDrain]) {
              this[kOnDrain](client[kUrl], [this, client]);
            }
          });
        }
        return this;
      }
      [kRemoveClient](client) {
        client.close(() => {
          const idx = this[kClients].indexOf(client);
          if (idx !== -1) {
            this[kClients].splice(idx, 1);
          }
        });
        this[kNeedDrain] = this[kClients].some((dispatcher) => !dispatcher[kNeedDrain] && dispatcher.closed !== true && dispatcher.destroyed !== true);
      }
    };
    module2.exports = {
      PoolBase,
      kClients,
      kNeedDrain,
      kAddClient,
      kRemoveClient,
      kGetDispatcher
    };
  }
});

// node_modules/undici/lib/dispatcher/pool.js
var require_pool = __commonJS({
  "node_modules/undici/lib/dispatcher/pool.js"(exports2, module2) {
    "use strict";
    var {
      PoolBase,
      kClients,
      kNeedDrain,
      kAddClient,
      kGetDispatcher,
      kRemoveClient
    } = require_pool_base();
    var Client = require_client();
    var {
      InvalidArgumentError
    } = require_errors();
    var util = require_util();
    var { kUrl } = require_symbols();
    var buildConnector = require_connect();
    var kOptions = Symbol("options");
    var kConnections = Symbol("connections");
    var kFactory = Symbol("factory");
    function defaultFactory(origin, opts) {
      return new Client(origin, opts);
    }
    var Pool = class extends PoolBase {
      constructor(origin, {
        connections,
        factory = defaultFactory,
        connect,
        connectTimeout,
        tls,
        maxCachedSessions,
        socketPath,
        autoSelectFamily,
        autoSelectFamilyAttemptTimeout,
        allowH2,
        clientTtl,
        ...options
      } = {}) {
        if (connections != null && (!Number.isFinite(connections) || connections < 0)) {
          throw new InvalidArgumentError("invalid connections");
        }
        if (typeof factory !== "function") {
          throw new InvalidArgumentError("factory must be a function.");
        }
        if (connect != null && typeof connect !== "function" && typeof connect !== "object") {
          throw new InvalidArgumentError("connect must be a function or an object");
        }
        super();
        if (typeof connect !== "function") {
          connect = buildConnector({
            ...tls,
            maxCachedSessions,
            allowH2,
            socketPath,
            timeout: connectTimeout,
            ...typeof autoSelectFamily === "boolean" ? { autoSelectFamily, autoSelectFamilyAttemptTimeout } : void 0,
            ...connect
          });
        }
        this[kConnections] = connections || null;
        this[kUrl] = util.parseOrigin(origin);
        this[kOptions] = { ...util.deepClone(options), connect, allowH2, clientTtl };
        this[kOptions].interceptors = options.interceptors ? { ...options.interceptors } : void 0;
        this[kFactory] = factory;
        this.on("connect", (origin2, targets) => {
          if (clientTtl != null && clientTtl > 0) {
            for (const target of targets) {
              Object.assign(target, { ttl: Date.now() });
            }
          }
        });
        this.on("connectionError", (origin2, targets, error) => {
          for (const target of targets) {
            const idx = this[kClients].indexOf(target);
            if (idx !== -1) {
              this[kClients].splice(idx, 1);
            }
          }
        });
      }
      [kGetDispatcher]() {
        const clientTtlOption = this[kOptions].clientTtl;
        for (const client of this[kClients]) {
          if (clientTtlOption != null && clientTtlOption > 0 && client.ttl && Date.now() - client.ttl > clientTtlOption) {
            this[kRemoveClient](client);
          } else if (!client[kNeedDrain]) {
            return client;
          }
        }
        if (!this[kConnections] || this[kClients].length < this[kConnections]) {
          const dispatcher = this[kFactory](this[kUrl], this[kOptions]);
          this[kAddClient](dispatcher);
          return dispatcher;
        }
      }
    };
    module2.exports = Pool;
  }
});

// node_modules/undici/lib/dispatcher/balanced-pool.js
var require_balanced_pool = __commonJS({
  "node_modules/undici/lib/dispatcher/balanced-pool.js"(exports2, module2) {
    "use strict";
    var {
      BalancedPoolMissingUpstreamError,
      InvalidArgumentError
    } = require_errors();
    var {
      PoolBase,
      kClients,
      kNeedDrain,
      kAddClient,
      kRemoveClient,
      kGetDispatcher
    } = require_pool_base();
    var Pool = require_pool();
    var { kUrl } = require_symbols();
    var { parseOrigin } = require_util();
    var kFactory = Symbol("factory");
    var kOptions = Symbol("options");
    var kGreatestCommonDivisor = Symbol("kGreatestCommonDivisor");
    var kCurrentWeight = Symbol("kCurrentWeight");
    var kIndex = Symbol("kIndex");
    var kWeight = Symbol("kWeight");
    var kMaxWeightPerServer = Symbol("kMaxWeightPerServer");
    var kErrorPenalty = Symbol("kErrorPenalty");
    function getGreatestCommonDivisor(a, b) {
      if (a === 0) return b;
      while (b !== 0) {
        const t = b;
        b = a % b;
        a = t;
      }
      return a;
    }
    function defaultFactory(origin, opts) {
      return new Pool(origin, opts);
    }
    var BalancedPool = class extends PoolBase {
      constructor(upstreams = [], { factory = defaultFactory, ...opts } = {}) {
        if (typeof factory !== "function") {
          throw new InvalidArgumentError("factory must be a function.");
        }
        super();
        this[kOptions] = opts;
        this[kIndex] = -1;
        this[kCurrentWeight] = 0;
        this[kMaxWeightPerServer] = this[kOptions].maxWeightPerServer || 100;
        this[kErrorPenalty] = this[kOptions].errorPenalty || 15;
        if (!Array.isArray(upstreams)) {
          upstreams = [upstreams];
        }
        this[kFactory] = factory;
        for (const upstream of upstreams) {
          this.addUpstream(upstream);
        }
        this._updateBalancedPoolStats();
      }
      addUpstream(upstream) {
        const upstreamOrigin = parseOrigin(upstream).origin;
        if (this[kClients].find((pool2) => pool2[kUrl].origin === upstreamOrigin && pool2.closed !== true && pool2.destroyed !== true)) {
          return this;
        }
        const pool = this[kFactory](upstreamOrigin, Object.assign({}, this[kOptions]));
        this[kAddClient](pool);
        pool.on("connect", () => {
          pool[kWeight] = Math.min(this[kMaxWeightPerServer], pool[kWeight] + this[kErrorPenalty]);
        });
        pool.on("connectionError", () => {
          pool[kWeight] = Math.max(1, pool[kWeight] - this[kErrorPenalty]);
          this._updateBalancedPoolStats();
        });
        pool.on("disconnect", (...args) => {
          const err = args[2];
          if (err && err.code === "UND_ERR_SOCKET") {
            pool[kWeight] = Math.max(1, pool[kWeight] - this[kErrorPenalty]);
            this._updateBalancedPoolStats();
          }
        });
        for (const client of this[kClients]) {
          client[kWeight] = this[kMaxWeightPerServer];
        }
        this._updateBalancedPoolStats();
        return this;
      }
      _updateBalancedPoolStats() {
        let result = 0;
        for (let i = 0; i < this[kClients].length; i++) {
          result = getGreatestCommonDivisor(this[kClients][i][kWeight], result);
        }
        this[kGreatestCommonDivisor] = result;
      }
      removeUpstream(upstream) {
        const upstreamOrigin = parseOrigin(upstream).origin;
        const pool = this[kClients].find((pool2) => pool2[kUrl].origin === upstreamOrigin && pool2.closed !== true && pool2.destroyed !== true);
        if (pool) {
          this[kRemoveClient](pool);
        }
        return this;
      }
      get upstreams() {
        return this[kClients].filter((dispatcher) => dispatcher.closed !== true && dispatcher.destroyed !== true).map((p) => p[kUrl].origin);
      }
      [kGetDispatcher]() {
        if (this[kClients].length === 0) {
          throw new BalancedPoolMissingUpstreamError();
        }
        const dispatcher = this[kClients].find((dispatcher2) => !dispatcher2[kNeedDrain] && dispatcher2.closed !== true && dispatcher2.destroyed !== true);
        if (!dispatcher) {
          return;
        }
        const allClientsBusy = this[kClients].map((pool) => pool[kNeedDrain]).reduce((a, b) => a && b, true);
        if (allClientsBusy) {
          return;
        }
        let counter = 0;
        let maxWeightIndex = this[kClients].findIndex((pool) => !pool[kNeedDrain]);
        while (counter++ < this[kClients].length) {
          this[kIndex] = (this[kIndex] + 1) % this[kClients].length;
          const pool = this[kClients][this[kIndex]];
          if (pool[kWeight] > this[kClients][maxWeightIndex][kWeight] && !pool[kNeedDrain]) {
            maxWeightIndex = this[kIndex];
          }
          if (this[kIndex] === 0) {
            this[kCurrentWeight] = this[kCurrentWeight] - this[kGreatestCommonDivisor];
            if (this[kCurrentWeight] <= 0) {
              this[kCurrentWeight] = this[kMaxWeightPerServer];
            }
          }
          if (pool[kWeight] >= this[kCurrentWeight] && !pool[kNeedDrain]) {
            return pool;
          }
        }
        this[kCurrentWeight] = this[kClients][maxWeightIndex][kWeight];
        this[kIndex] = maxWeightIndex;
        return this[kClients][maxWeightIndex];
      }
    };
    module2.exports = BalancedPool;
  }
});

// node_modules/undici/lib/dispatcher/agent.js
var require_agent = __commonJS({
  "node_modules/undici/lib/dispatcher/agent.js"(exports2, module2) {
    "use strict";
    var { InvalidArgumentError } = require_errors();
    var { kClients, kRunning, kClose, kDestroy, kDispatch, kUrl } = require_symbols();
    var DispatcherBase = require_dispatcher_base();
    var Pool = require_pool();
    var Client = require_client();
    var util = require_util();
    var kOnConnect = Symbol("onConnect");
    var kOnDisconnect = Symbol("onDisconnect");
    var kOnConnectionError = Symbol("onConnectionError");
    var kOnDrain = Symbol("onDrain");
    var kFactory = Symbol("factory");
    var kOptions = Symbol("options");
    function defaultFactory(origin, opts) {
      return opts && opts.connections === 1 ? new Client(origin, opts) : new Pool(origin, opts);
    }
    var Agent = class extends DispatcherBase {
      constructor({ factory = defaultFactory, connect, ...options } = {}) {
        if (typeof factory !== "function") {
          throw new InvalidArgumentError("factory must be a function.");
        }
        if (connect != null && typeof connect !== "function" && typeof connect !== "object") {
          throw new InvalidArgumentError("connect must be a function or an object");
        }
        super();
        if (connect && typeof connect !== "function") {
          connect = { ...connect };
        }
        this[kOptions] = { ...util.deepClone(options), connect };
        this[kFactory] = factory;
        this[kClients] = /* @__PURE__ */ new Map();
        this[kOnDrain] = (origin, targets) => {
          this.emit("drain", origin, [this, ...targets]);
        };
        this[kOnConnect] = (origin, targets) => {
          const result = this[kClients].get(origin);
          if (result) {
            result.count += 1;
          }
          this.emit("connect", origin, [this, ...targets]);
        };
        this[kOnDisconnect] = (origin, targets, err) => {
          const result = this[kClients].get(origin);
          if (result) {
            result.count -= 1;
            if (result.count <= 0) {
              this[kClients].delete(origin);
              result.dispatcher.destroy();
            }
          }
          this.emit("disconnect", origin, [this, ...targets], err);
        };
        this[kOnConnectionError] = (origin, targets, err) => {
          this.emit("connectionError", origin, [this, ...targets], err);
        };
      }
      get [kRunning]() {
        let ret = 0;
        for (const { dispatcher } of this[kClients].values()) {
          ret += dispatcher[kRunning];
        }
        return ret;
      }
      [kDispatch](opts, handler) {
        let key;
        if (opts.origin && (typeof opts.origin === "string" || opts.origin instanceof URL)) {
          key = String(opts.origin);
        } else {
          throw new InvalidArgumentError("opts.origin must be a non-empty string or URL.");
        }
        const result = this[kClients].get(key);
        let dispatcher = result && result.dispatcher;
        if (!dispatcher) {
          dispatcher = this[kFactory](opts.origin, this[kOptions]).on("drain", this[kOnDrain]).on("connect", this[kOnConnect]).on("disconnect", this[kOnDisconnect]).on("connectionError", this[kOnConnectionError]);
          this[kClients].set(key, { count: 0, dispatcher });
        }
        return dispatcher.dispatch(opts, handler);
      }
      async [kClose]() {
        const closePromises = [];
        for (const { dispatcher } of this[kClients].values()) {
          closePromises.push(dispatcher.close());
        }
        this[kClients].clear();
        await Promise.all(closePromises);
      }
      async [kDestroy](err) {
        const destroyPromises = [];
        for (const { dispatcher } of this[kClients].values()) {
          destroyPromises.push(dispatcher.destroy(err));
        }
        this[kClients].clear();
        await Promise.all(destroyPromises);
      }
      get stats() {
        const allClientStats = {};
        for (const { dispatcher } of this[kClients].values()) {
          if (dispatcher.stats) {
            allClientStats[dispatcher[kUrl].origin] = dispatcher.stats;
          }
        }
        return allClientStats;
      }
    };
    module2.exports = Agent;
  }
});

// node_modules/undici/lib/dispatcher/proxy-agent.js
var require_proxy_agent = __commonJS({
  "node_modules/undici/lib/dispatcher/proxy-agent.js"(exports2, module2) {
    "use strict";
    var { kProxy, kClose, kDestroy, kDispatch, kConnector } = require_symbols();
    var { URL: URL2 } = require("node:url");
    var Agent = require_agent();
    var Pool = require_pool();
    var DispatcherBase = require_dispatcher_base();
    var { InvalidArgumentError, RequestAbortedError, SecureProxyConnectionError } = require_errors();
    var buildConnector = require_connect();
    var Client = require_client();
    var kAgent = Symbol("proxy agent");
    var kClient = Symbol("proxy client");
    var kProxyHeaders = Symbol("proxy headers");
    var kRequestTls = Symbol("request tls settings");
    var kProxyTls = Symbol("proxy tls settings");
    var kConnectEndpoint = Symbol("connect endpoint function");
    var kTunnelProxy = Symbol("tunnel proxy");
    function defaultProtocolPort(protocol) {
      return protocol === "https:" ? 443 : 80;
    }
    function defaultFactory(origin, opts) {
      return new Pool(origin, opts);
    }
    var noop = () => {
    };
    var ProxyClient = class extends DispatcherBase {
      #client = null;
      constructor(origin, opts) {
        if (typeof origin === "string") {
          origin = new URL2(origin);
        }
        if (origin.protocol !== "http:" && origin.protocol !== "https:") {
          throw new InvalidArgumentError("ProxyClient only supports http and https protocols");
        }
        super();
        this.#client = new Client(origin, opts);
      }
      async [kClose]() {
        await this.#client.close();
      }
      async [kDestroy]() {
        await this.#client.destroy();
      }
      async [kDispatch](opts, handler) {
        const { method, origin } = opts;
        if (method === "CONNECT") {
          this.#client[kConnector](
            {
              origin,
              port: opts.port || defaultProtocolPort(opts.protocol),
              path: opts.host,
              signal: opts.signal,
              headers: {
                ...this[kProxyHeaders],
                host: opts.host
              },
              servername: this[kProxyTls]?.servername || opts.servername
            },
            (err, socket) => {
              if (err) {
                handler.callback(err);
              } else {
                handler.callback(null, { socket, statusCode: 200 });
              }
            }
          );
          return;
        }
        if (typeof origin === "string") {
          opts.origin = new URL2(origin);
        }
        return this.#client.dispatch(opts, handler);
      }
    };
    var ProxyAgent = class extends DispatcherBase {
      constructor(opts) {
        if (!opts || typeof opts === "object" && !(opts instanceof URL2) && !opts.uri) {
          throw new InvalidArgumentError("Proxy uri is mandatory");
        }
        const { clientFactory = defaultFactory } = opts;
        if (typeof clientFactory !== "function") {
          throw new InvalidArgumentError("Proxy opts.clientFactory must be a function.");
        }
        const { proxyTunnel = true } = opts;
        super();
        const url = this.#getUrl(opts);
        const { href, origin, port, protocol, username, password, hostname: proxyHostname } = url;
        this[kProxy] = { uri: href, protocol };
        this[kRequestTls] = opts.requestTls;
        this[kProxyTls] = opts.proxyTls;
        this[kProxyHeaders] = opts.headers || {};
        if (opts.auth && opts.token) {
          throw new InvalidArgumentError("opts.auth cannot be used in combination with opts.token");
        } else if (opts.auth) {
          this[kProxyHeaders]["proxy-authorization"] = `Basic ${opts.auth}`;
        } else if (opts.token) {
          this[kProxyHeaders]["proxy-authorization"] = opts.token;
        } else if (username && password) {
          this[kProxyHeaders]["proxy-authorization"] = `Basic ${Buffer.from(`${decodeURIComponent(username)}:${decodeURIComponent(password)}`).toString("base64")}`;
        }
        const factory = !proxyTunnel && protocol === "http:" ? (origin2, options) => {
          if (origin2.protocol === "http:") {
            return new ProxyClient(origin2, options);
          }
          return new Client(origin2, options);
        } : void 0;
        const connect = buildConnector({ ...opts.proxyTls });
        this[kConnectEndpoint] = buildConnector({ ...opts.requestTls });
        this[kClient] = clientFactory(url, { connect, factory });
        this[kTunnelProxy] = proxyTunnel;
        this[kAgent] = new Agent({
          ...opts,
          connect: async (opts2, callback) => {
            let requestedPath = opts2.host;
            if (!opts2.port) {
              requestedPath += `:${defaultProtocolPort(opts2.protocol)}`;
            }
            try {
              const { socket, statusCode } = await this[kClient].connect({
                origin,
                port,
                path: requestedPath,
                signal: opts2.signal,
                headers: {
                  ...this[kProxyHeaders],
                  host: opts2.host,
                  ...opts2.connections == null || opts2.connections > 0 ? { "proxy-connection": "keep-alive" } : {}
                },
                servername: this[kProxyTls]?.servername || proxyHostname
              });
              if (statusCode !== 200) {
                socket.on("error", noop).destroy();
                callback(new RequestAbortedError(`Proxy response (${statusCode}) !== 200 when HTTP Tunneling`));
              }
              if (opts2.protocol !== "https:") {
                callback(null, socket);
                return;
              }
              let servername;
              if (this[kRequestTls]) {
                servername = this[kRequestTls].servername;
              } else {
                servername = opts2.servername;
              }
              this[kConnectEndpoint]({ ...opts2, servername, httpSocket: socket }, callback);
            } catch (err) {
              if (err.code === "ERR_TLS_CERT_ALTNAME_INVALID") {
                callback(new SecureProxyConnectionError(err));
              } else {
                callback(err);
              }
            }
          }
        });
      }
      dispatch(opts, handler) {
        const headers = buildHeaders(opts.headers);
        throwIfProxyAuthIsSent(headers);
        if (headers && !("host" in headers) && !("Host" in headers)) {
          const { host } = new URL2(opts.origin);
          headers.host = host;
        }
        if (!this.#shouldConnect(new URL2(opts.origin))) {
          opts.path = opts.origin + opts.path;
        }
        return this[kAgent].dispatch(
          {
            ...opts,
            headers
          },
          handler
        );
      }
      /**
       * @param {import('../types/proxy-agent').ProxyAgent.Options | string | URL} opts
       * @returns {URL}
       */
      #getUrl(opts) {
        if (typeof opts === "string") {
          return new URL2(opts);
        } else if (opts instanceof URL2) {
          return opts;
        } else {
          return new URL2(opts.uri);
        }
      }
      async [kClose]() {
        await this[kAgent].close();
        await this[kClient].close();
      }
      async [kDestroy]() {
        await this[kAgent].destroy();
        await this[kClient].destroy();
      }
      #shouldConnect(uri) {
        if (typeof uri === "string") {
          uri = new URL2(uri);
        }
        if (this[kTunnelProxy]) {
          return true;
        }
        if (uri.protocol !== "http:" || this[kProxy].protocol !== "http:") {
          return true;
        }
        return false;
      }
    };
    function buildHeaders(headers) {
      if (Array.isArray(headers)) {
        const headersPair = {};
        for (let i = 0; i < headers.length; i += 2) {
          headersPair[headers[i]] = headers[i + 1];
        }
        return headersPair;
      }
      return headers;
    }
    function throwIfProxyAuthIsSent(headers) {
      const existProxyAuth = headers && Object.keys(headers).find((key) => key.toLowerCase() === "proxy-authorization");
      if (existProxyAuth) {
        throw new InvalidArgumentError("Proxy-Authorization should be sent in ProxyAgent constructor");
      }
    }
    module2.exports = ProxyAgent;
  }
});

// node_modules/undici/lib/dispatcher/env-http-proxy-agent.js
var require_env_http_proxy_agent = __commonJS({
  "node_modules/undici/lib/dispatcher/env-http-proxy-agent.js"(exports2, module2) {
    "use strict";
    var DispatcherBase = require_dispatcher_base();
    var { kClose, kDestroy, kClosed, kDestroyed, kDispatch, kNoProxyAgent, kHttpProxyAgent, kHttpsProxyAgent } = require_symbols();
    var ProxyAgent = require_proxy_agent();
    var Agent = require_agent();
    var DEFAULT_PORTS = {
      "http:": 80,
      "https:": 443
    };
    var EnvHttpProxyAgent = class extends DispatcherBase {
      #noProxyValue = null;
      #noProxyEntries = null;
      #opts = null;
      constructor(opts = {}) {
        super();
        this.#opts = opts;
        const { httpProxy, httpsProxy, noProxy, ...agentOpts } = opts;
        this[kNoProxyAgent] = new Agent(agentOpts);
        const HTTP_PROXY = httpProxy ?? process.env.http_proxy ?? process.env.HTTP_PROXY;
        if (HTTP_PROXY) {
          this[kHttpProxyAgent] = new ProxyAgent({ ...agentOpts, uri: HTTP_PROXY });
        } else {
          this[kHttpProxyAgent] = this[kNoProxyAgent];
        }
        const HTTPS_PROXY = httpsProxy ?? process.env.https_proxy ?? process.env.HTTPS_PROXY;
        if (HTTPS_PROXY) {
          this[kHttpsProxyAgent] = new ProxyAgent({ ...agentOpts, uri: HTTPS_PROXY });
        } else {
          this[kHttpsProxyAgent] = this[kHttpProxyAgent];
        }
        this.#parseNoProxy();
      }
      [kDispatch](opts, handler) {
        const url = new URL(opts.origin);
        const agent = this.#getProxyAgentForUrl(url);
        return agent.dispatch(opts, handler);
      }
      async [kClose]() {
        await this[kNoProxyAgent].close();
        if (!this[kHttpProxyAgent][kClosed]) {
          await this[kHttpProxyAgent].close();
        }
        if (!this[kHttpsProxyAgent][kClosed]) {
          await this[kHttpsProxyAgent].close();
        }
      }
      async [kDestroy](err) {
        await this[kNoProxyAgent].destroy(err);
        if (!this[kHttpProxyAgent][kDestroyed]) {
          await this[kHttpProxyAgent].destroy(err);
        }
        if (!this[kHttpsProxyAgent][kDestroyed]) {
          await this[kHttpsProxyAgent].destroy(err);
        }
      }
      #getProxyAgentForUrl(url) {
        let { protocol, host: hostname, port } = url;
        hostname = hostname.replace(/:\d*$/, "").toLowerCase();
        port = Number.parseInt(port, 10) || DEFAULT_PORTS[protocol] || 0;
        if (!this.#shouldProxy(hostname, port)) {
          return this[kNoProxyAgent];
        }
        if (protocol === "https:") {
          return this[kHttpsProxyAgent];
        }
        return this[kHttpProxyAgent];
      }
      #shouldProxy(hostname, port) {
        if (this.#noProxyChanged) {
          this.#parseNoProxy();
        }
        if (this.#noProxyEntries.length === 0) {
          return true;
        }
        if (this.#noProxyValue === "*") {
          return false;
        }
        for (let i = 0; i < this.#noProxyEntries.length; i++) {
          const entry = this.#noProxyEntries[i];
          if (entry.port && entry.port !== port) {
            continue;
          }
          if (!/^[.*]/.test(entry.hostname)) {
            if (hostname === entry.hostname) {
              return false;
            }
          } else {
            if (hostname.endsWith(entry.hostname.replace(/^\*/, ""))) {
              return false;
            }
          }
        }
        return true;
      }
      #parseNoProxy() {
        const noProxyValue = this.#opts.noProxy ?? this.#noProxyEnv;
        const noProxySplit = noProxyValue.split(/[,\s]/);
        const noProxyEntries = [];
        for (let i = 0; i < noProxySplit.length; i++) {
          const entry = noProxySplit[i];
          if (!entry) {
            continue;
          }
          const parsed = entry.match(/^(.+):(\d+)$/);
          noProxyEntries.push({
            hostname: (parsed ? parsed[1] : entry).toLowerCase(),
            port: parsed ? Number.parseInt(parsed[2], 10) : 0
          });
        }
        this.#noProxyValue = noProxyValue;
        this.#noProxyEntries = noProxyEntries;
      }
      get #noProxyChanged() {
        if (this.#opts.noProxy !== void 0) {
          return false;
        }
        return this.#noProxyValue !== this.#noProxyEnv;
      }
      get #noProxyEnv() {
        return process.env.no_proxy ?? process.env.NO_PROXY ?? "";
      }
    };
    module2.exports = EnvHttpProxyAgent;
  }
});

// node_modules/undici/lib/handler/retry-handler.js
var require_retry_handler = __commonJS({
  "node_modules/undici/lib/handler/retry-handler.js"(exports2, module2) {
    "use strict";
    var assert = require("node:assert");
    var { kRetryHandlerDefaultRetry } = require_symbols();
    var { RequestRetryError } = require_errors();
    var WrapHandler = require_wrap_handler();
    var {
      isDisturbed,
      parseRangeHeader,
      wrapRequestBody
    } = require_util();
    function calculateRetryAfterHeader(retryAfter) {
      const retryTime = new Date(retryAfter).getTime();
      return isNaN(retryTime) ? 0 : retryTime - Date.now();
    }
    var RetryHandler = class _RetryHandler {
      constructor(opts, { dispatch, handler }) {
        const { retryOptions, ...dispatchOpts } = opts;
        const {
          // Retry scoped
          retry: retryFn,
          maxRetries,
          maxTimeout,
          minTimeout,
          timeoutFactor,
          // Response scoped
          methods,
          errorCodes,
          retryAfter,
          statusCodes,
          throwOnError
        } = retryOptions ?? {};
        this.error = null;
        this.dispatch = dispatch;
        this.handler = WrapHandler.wrap(handler);
        this.opts = { ...dispatchOpts, body: wrapRequestBody(opts.body) };
        this.retryOpts = {
          throwOnError: throwOnError ?? true,
          retry: retryFn ?? _RetryHandler[kRetryHandlerDefaultRetry],
          retryAfter: retryAfter ?? true,
          maxTimeout: maxTimeout ?? 30 * 1e3,
          // 30s,
          minTimeout: minTimeout ?? 500,
          // .5s
          timeoutFactor: timeoutFactor ?? 2,
          maxRetries: maxRetries ?? 5,
          // What errors we should retry
          methods: methods ?? ["GET", "HEAD", "OPTIONS", "PUT", "DELETE", "TRACE"],
          // Indicates which errors to retry
          statusCodes: statusCodes ?? [500, 502, 503, 504, 429],
          // List of errors to retry
          errorCodes: errorCodes ?? [
            "ECONNRESET",
            "ECONNREFUSED",
            "ENOTFOUND",
            "ENETDOWN",
            "ENETUNREACH",
            "EHOSTDOWN",
            "EHOSTUNREACH",
            "EPIPE",
            "UND_ERR_SOCKET"
          ]
        };
        this.retryCount = 0;
        this.retryCountCheckpoint = 0;
        this.headersSent = false;
        this.start = 0;
        this.end = null;
        this.etag = null;
      }
      onResponseStartWithRetry(controller, statusCode, headers, statusMessage, err) {
        if (this.retryOpts.throwOnError) {
          if (this.retryOpts.statusCodes.includes(statusCode) === false) {
            this.headersSent = true;
            this.handler.onResponseStart?.(controller, statusCode, headers, statusMessage);
          } else {
            this.error = err;
          }
          return;
        }
        if (isDisturbed(this.opts.body)) {
          this.headersSent = true;
          this.handler.onResponseStart?.(controller, statusCode, headers, statusMessage);
          return;
        }
        function shouldRetry(passedErr) {
          if (passedErr) {
            this.headersSent = true;
            this.headersSent = true;
            this.handler.onResponseStart?.(controller, statusCode, headers, statusMessage);
            controller.resume();
            return;
          }
          this.error = err;
          controller.resume();
        }
        controller.pause();
        this.retryOpts.retry(
          err,
          {
            state: { counter: this.retryCount },
            opts: { retryOptions: this.retryOpts, ...this.opts }
          },
          shouldRetry.bind(this)
        );
      }
      onRequestStart(controller, context) {
        if (!this.headersSent) {
          this.handler.onRequestStart?.(controller, context);
        }
      }
      onRequestUpgrade(controller, statusCode, headers, socket) {
        this.handler.onRequestUpgrade?.(controller, statusCode, headers, socket);
      }
      static [kRetryHandlerDefaultRetry](err, { state, opts }, cb) {
        const { statusCode, code, headers } = err;
        const { method, retryOptions } = opts;
        const {
          maxRetries,
          minTimeout,
          maxTimeout,
          timeoutFactor,
          statusCodes,
          errorCodes,
          methods
        } = retryOptions;
        const { counter } = state;
        if (code && code !== "UND_ERR_REQ_RETRY" && !errorCodes.includes(code)) {
          cb(err);
          return;
        }
        if (Array.isArray(methods) && !methods.includes(method)) {
          cb(err);
          return;
        }
        if (statusCode != null && Array.isArray(statusCodes) && !statusCodes.includes(statusCode)) {
          cb(err);
          return;
        }
        if (counter > maxRetries) {
          cb(err);
          return;
        }
        let retryAfterHeader = headers?.["retry-after"];
        if (retryAfterHeader) {
          retryAfterHeader = Number(retryAfterHeader);
          retryAfterHeader = Number.isNaN(retryAfterHeader) ? calculateRetryAfterHeader(headers["retry-after"]) : retryAfterHeader * 1e3;
        }
        const retryTimeout = retryAfterHeader > 0 ? Math.min(retryAfterHeader, maxTimeout) : Math.min(minTimeout * timeoutFactor ** (counter - 1), maxTimeout);
        setTimeout(() => cb(null), retryTimeout);
      }
      onResponseStart(controller, statusCode, headers, statusMessage) {
        this.error = null;
        this.retryCount += 1;
        if (statusCode >= 300) {
          const err = new RequestRetryError("Request failed", statusCode, {
            headers,
            data: {
              count: this.retryCount
            }
          });
          this.onResponseStartWithRetry(controller, statusCode, headers, statusMessage, err);
          return;
        }
        if (this.headersSent) {
          if (statusCode !== 206 && (this.start > 0 || statusCode !== 200)) {
            throw new RequestRetryError("server does not support the range header and the payload was partially consumed", statusCode, {
              headers,
              data: { count: this.retryCount }
            });
          }
          const contentRange = parseRangeHeader(headers["content-range"]);
          if (!contentRange) {
            throw new RequestRetryError("Content-Range mismatch", statusCode, {
              headers,
              data: { count: this.retryCount }
            });
          }
          if (this.etag != null && this.etag !== headers.etag) {
            throw new RequestRetryError("ETag mismatch", statusCode, {
              headers,
              data: { count: this.retryCount }
            });
          }
          const { start, size, end = size ? size - 1 : null } = contentRange;
          assert(this.start === start, "content-range mismatch");
          assert(this.end == null || this.end === end, "content-range mismatch");
          return;
        }
        if (this.end == null) {
          if (statusCode === 206) {
            const range = parseRangeHeader(headers["content-range"]);
            if (range == null) {
              this.headersSent = true;
              this.handler.onResponseStart?.(
                controller,
                statusCode,
                headers,
                statusMessage
              );
              return;
            }
            const { start, size, end = size ? size - 1 : null } = range;
            assert(
              start != null && Number.isFinite(start),
              "content-range mismatch"
            );
            assert(end != null && Number.isFinite(end), "invalid content-length");
            this.start = start;
            this.end = end;
          }
          if (this.end == null) {
            const contentLength = headers["content-length"];
            this.end = contentLength != null ? Number(contentLength) - 1 : null;
          }
          assert(Number.isFinite(this.start));
          assert(
            this.end == null || Number.isFinite(this.end),
            "invalid content-length"
          );
          this.resume = true;
          this.etag = headers.etag != null ? headers.etag : null;
          if (this.etag != null && this.etag[0] === "W" && this.etag[1] === "/") {
            this.etag = null;
          }
          this.headersSent = true;
          this.handler.onResponseStart?.(
            controller,
            statusCode,
            headers,
            statusMessage
          );
        } else {
          throw new RequestRetryError("Request failed", statusCode, {
            headers,
            data: { count: this.retryCount }
          });
        }
      }
      onResponseData(controller, chunk) {
        if (this.error) {
          return;
        }
        this.start += chunk.length;
        this.handler.onResponseData?.(controller, chunk);
      }
      onResponseEnd(controller, trailers) {
        if (this.error && this.retryOpts.throwOnError) {
          throw this.error;
        }
        if (!this.error) {
          this.retryCount = 0;
          return this.handler.onResponseEnd?.(controller, trailers);
        }
        this.retry(controller);
      }
      retry(controller) {
        if (this.start !== 0) {
          const headers = { range: `bytes=${this.start}-${this.end ?? ""}` };
          if (this.etag != null) {
            headers["if-match"] = this.etag;
          }
          this.opts = {
            ...this.opts,
            headers: {
              ...this.opts.headers,
              ...headers
            }
          };
        }
        try {
          this.retryCountCheckpoint = this.retryCount;
          this.dispatch(this.opts, this);
        } catch (err) {
          this.handler.onResponseError?.(controller, err);
        }
      }
      onResponseError(controller, err) {
        if (controller?.aborted || isDisturbed(this.opts.body)) {
          this.handler.onResponseError?.(controller, err);
          return;
        }
        function shouldRetry(returnedErr) {
          if (!returnedErr) {
            this.retry(controller);
            return;
          }
          this.handler?.onResponseError?.(controller, returnedErr);
        }
        if (this.retryCount - this.retryCountCheckpoint > 0) {
          this.retryCount = this.retryCountCheckpoint + (this.retryCount - this.retryCountCheckpoint);
        } else {
          this.retryCount += 1;
        }
        this.retryOpts.retry(
          err,
          {
            state: { counter: this.retryCount },
            opts: { retryOptions: this.retryOpts, ...this.opts }
          },
          shouldRetry.bind(this)
        );
      }
    };
    module2.exports = RetryHandler;
  }
});

// node_modules/undici/lib/dispatcher/retry-agent.js
var require_retry_agent = __commonJS({
  "node_modules/undici/lib/dispatcher/retry-agent.js"(exports2, module2) {
    "use strict";
    var Dispatcher = require_dispatcher();
    var RetryHandler = require_retry_handler();
    var RetryAgent = class extends Dispatcher {
      #agent = null;
      #options = null;
      constructor(agent, options = {}) {
        super(options);
        this.#agent = agent;
        this.#options = options;
      }
      dispatch(opts, handler) {
        const retry = new RetryHandler({
          ...opts,
          retryOptions: this.#options
        }, {
          dispatch: this.#agent.dispatch.bind(this.#agent),
          handler
        });
        return this.#agent.dispatch(opts, retry);
      }
      close() {
        return this.#agent.close();
      }
      destroy() {
        return this.#agent.destroy();
      }
    };
    module2.exports = RetryAgent;
  }
});

// node_modules/undici/lib/dispatcher/h2c-client.js
var require_h2c_client = __commonJS({
  "node_modules/undici/lib/dispatcher/h2c-client.js"(exports2, module2) {
    "use strict";
    var { connect } = require("node:net");
    var { kClose, kDestroy } = require_symbols();
    var { InvalidArgumentError } = require_errors();
    var util = require_util();
    var Client = require_client();
    var DispatcherBase = require_dispatcher_base();
    var H2CClient = class extends DispatcherBase {
      #client = null;
      constructor(origin, clientOpts) {
        super();
        if (typeof origin === "string") {
          origin = new URL(origin);
        }
        if (origin.protocol !== "http:") {
          throw new InvalidArgumentError(
            "h2c-client: Only h2c protocol is supported"
          );
        }
        const { connect: connect2, maxConcurrentStreams, pipelining, ...opts } = clientOpts ?? {};
        let defaultMaxConcurrentStreams = 100;
        let defaultPipelining = 100;
        if (maxConcurrentStreams != null && Number.isInteger(maxConcurrentStreams) && maxConcurrentStreams > 0) {
          defaultMaxConcurrentStreams = maxConcurrentStreams;
        }
        if (pipelining != null && Number.isInteger(pipelining) && pipelining > 0) {
          defaultPipelining = pipelining;
        }
        if (defaultPipelining > defaultMaxConcurrentStreams) {
          throw new InvalidArgumentError(
            "h2c-client: pipelining cannot be greater than maxConcurrentStreams"
          );
        }
        this.#client = new Client(origin, {
          ...opts,
          connect: this.#buildConnector(connect2),
          maxConcurrentStreams: defaultMaxConcurrentStreams,
          pipelining: defaultPipelining,
          allowH2: true
        });
      }
      #buildConnector(connectOpts) {
        return (opts, callback) => {
          const timeout = connectOpts?.connectOpts ?? 1e4;
          const { hostname, port, pathname } = opts;
          const socket = connect({
            ...opts,
            host: hostname,
            port,
            pathname
          });
          if (opts.keepAlive == null || opts.keepAlive) {
            const keepAliveInitialDelay = opts.keepAliveInitialDelay == null ? 6e4 : opts.keepAliveInitialDelay;
            socket.setKeepAlive(true, keepAliveInitialDelay);
          }
          socket.alpnProtocol = "h2";
          const clearConnectTimeout = util.setupConnectTimeout(
            new WeakRef(socket),
            { timeout, hostname, port }
          );
          socket.setNoDelay(true).once("connect", function() {
            queueMicrotask(clearConnectTimeout);
            if (callback) {
              const cb = callback;
              callback = null;
              cb(null, this);
            }
          }).on("error", function(err) {
            queueMicrotask(clearConnectTimeout);
            if (callback) {
              const cb = callback;
              callback = null;
              cb(err);
            }
          });
          return socket;
        };
      }
      dispatch(opts, handler) {
        return this.#client.dispatch(opts, handler);
      }
      async [kClose]() {
        await this.#client.close();
      }
      async [kDestroy]() {
        await this.#client.destroy();
      }
    };
    module2.exports = H2CClient;
  }
});

// node_modules/undici/lib/api/readable.js
var require_readable = __commonJS({
  "node_modules/undici/lib/api/readable.js"(exports2, module2) {
    "use strict";
    var assert = require("node:assert");
    var { Readable } = require("node:stream");
    var { RequestAbortedError, NotSupportedError, InvalidArgumentError, AbortError } = require_errors();
    var util = require_util();
    var { ReadableStreamFrom } = require_util();
    var kConsume = Symbol("kConsume");
    var kReading = Symbol("kReading");
    var kBody = Symbol("kBody");
    var kAbort = Symbol("kAbort");
    var kContentType = Symbol("kContentType");
    var kContentLength = Symbol("kContentLength");
    var kUsed = Symbol("kUsed");
    var kBytesRead = Symbol("kBytesRead");
    var noop = () => {
    };
    var BodyReadable = class extends Readable {
      /**
       * @param {object} opts
       * @param {(this: Readable, size: number) => void} opts.resume
       * @param {() => (void | null)} opts.abort
       * @param {string} [opts.contentType = '']
       * @param {number} [opts.contentLength]
       * @param {number} [opts.highWaterMark = 64 * 1024]
       */
      constructor({
        resume,
        abort,
        contentType = "",
        contentLength,
        highWaterMark = 64 * 1024
        // Same as nodejs fs streams.
      }) {
        super({
          autoDestroy: true,
          read: resume,
          highWaterMark
        });
        this._readableState.dataEmitted = false;
        this[kAbort] = abort;
        this[kConsume] = null;
        this[kBytesRead] = 0;
        this[kBody] = null;
        this[kUsed] = false;
        this[kContentType] = contentType;
        this[kContentLength] = Number.isFinite(contentLength) ? contentLength : null;
        this[kReading] = false;
      }
      /**
       * @param {Error|null} err
       * @param {(error:(Error|null)) => void} callback
       * @returns {void}
       */
      _destroy(err, callback) {
        if (!err && !this._readableState.endEmitted) {
          err = new RequestAbortedError();
        }
        if (err) {
          this[kAbort]();
        }
        if (!this[kUsed]) {
          setImmediate(() => {
            callback(err);
          });
        } else {
          callback(err);
        }
      }
      /**
       * @param {string} event
       * @param {(...args: any[]) => void} listener
       * @returns {this}
       */
      on(event, listener) {
        if (event === "data" || event === "readable") {
          this[kReading] = true;
          this[kUsed] = true;
        }
        return super.on(event, listener);
      }
      /**
       * @param {string} event
       * @param {(...args: any[]) => void} listener
       * @returns {this}
       */
      addListener(event, listener) {
        return this.on(event, listener);
      }
      /**
       * @param {string|symbol} event
       * @param {(...args: any[]) => void} listener
       * @returns {this}
       */
      off(event, listener) {
        const ret = super.off(event, listener);
        if (event === "data" || event === "readable") {
          this[kReading] = this.listenerCount("data") > 0 || this.listenerCount("readable") > 0;
        }
        return ret;
      }
      /**
       * @param {string|symbol} event
       * @param {(...args: any[]) => void} listener
       * @returns {this}
       */
      removeListener(event, listener) {
        return this.off(event, listener);
      }
      /**
       * @param {Buffer|null} chunk
       * @returns {boolean}
       */
      push(chunk) {
        this[kBytesRead] += chunk ? chunk.length : 0;
        if (this[kConsume] && chunk !== null) {
          consumePush(this[kConsume], chunk);
          return this[kReading] ? super.push(chunk) : true;
        }
        return super.push(chunk);
      }
      /**
       * Consumes and returns the body as a string.
       *
       * @see https://fetch.spec.whatwg.org/#dom-body-text
       * @returns {Promise<string>}
       */
      text() {
        return consume(this, "text");
      }
      /**
       * Consumes and returns the body as a JavaScript Object.
       *
       * @see https://fetch.spec.whatwg.org/#dom-body-json
       * @returns {Promise<unknown>}
       */
      json() {
        return consume(this, "json");
      }
      /**
       * Consumes and returns the body as a Blob
       *
       * @see https://fetch.spec.whatwg.org/#dom-body-blob
       * @returns {Promise<Blob>}
       */
      blob() {
        return consume(this, "blob");
      }
      /**
       * Consumes and returns the body as an Uint8Array.
       *
       * @see https://fetch.spec.whatwg.org/#dom-body-bytes
       * @returns {Promise<Uint8Array>}
       */
      bytes() {
        return consume(this, "bytes");
      }
      /**
       * Consumes and returns the body as an ArrayBuffer.
       *
       * @see https://fetch.spec.whatwg.org/#dom-body-arraybuffer
       * @returns {Promise<ArrayBuffer>}
       */
      arrayBuffer() {
        return consume(this, "arrayBuffer");
      }
      /**
       * Not implemented
       *
       * @see https://fetch.spec.whatwg.org/#dom-body-formdata
       * @throws {NotSupportedError}
       */
      async formData() {
        throw new NotSupportedError();
      }
      /**
       * Returns true if the body is not null and the body has been consumed.
       * Otherwise, returns false.
       *
       * @see https://fetch.spec.whatwg.org/#dom-body-bodyused
       * @readonly
       * @returns {boolean}
       */
      get bodyUsed() {
        return util.isDisturbed(this);
      }
      /**
       * @see https://fetch.spec.whatwg.org/#dom-body-body
       * @readonly
       * @returns {ReadableStream}
       */
      get body() {
        if (!this[kBody]) {
          this[kBody] = ReadableStreamFrom(this);
          if (this[kConsume]) {
            this[kBody].getReader();
            assert(this[kBody].locked);
          }
        }
        return this[kBody];
      }
      /**
       * Dumps the response body by reading `limit` number of bytes.
       * @param {object} opts
       * @param {number} [opts.limit = 131072] Number of bytes to read.
       * @param {AbortSignal} [opts.signal] An AbortSignal to cancel the dump.
       * @returns {Promise<null>}
       */
      async dump(opts) {
        const signal = opts?.signal;
        if (signal != null && (typeof signal !== "object" || !("aborted" in signal))) {
          throw new InvalidArgumentError("signal must be an AbortSignal");
        }
        const limit = opts?.limit && Number.isFinite(opts.limit) ? opts.limit : 128 * 1024;
        signal?.throwIfAborted();
        if (this._readableState.closeEmitted) {
          return null;
        }
        return await new Promise((resolve, reject) => {
          if (this[kContentLength] && this[kContentLength] > limit || this[kBytesRead] > limit) {
            this.destroy(new AbortError());
          }
          if (signal) {
            const onAbort = () => {
              this.destroy(signal.reason ?? new AbortError());
            };
            signal.addEventListener("abort", onAbort);
            this.on("close", function() {
              signal.removeEventListener("abort", onAbort);
              if (signal.aborted) {
                reject(signal.reason ?? new AbortError());
              } else {
                resolve(null);
              }
            });
          } else {
            this.on("close", resolve);
          }
          this.on("error", noop).on("data", () => {
            if (this[kBytesRead] > limit) {
              this.destroy();
            }
          }).resume();
        });
      }
      /**
       * @param {BufferEncoding} encoding
       * @returns {this}
       */
      setEncoding(encoding) {
        if (Buffer.isEncoding(encoding)) {
          this._readableState.encoding = encoding;
        }
        return this;
      }
    };
    function isLocked(bodyReadable) {
      return bodyReadable[kBody]?.locked === true || bodyReadable[kConsume] !== null;
    }
    function isUnusable(bodyReadable) {
      return util.isDisturbed(bodyReadable) || isLocked(bodyReadable);
    }
    function consume(stream, type) {
      assert(!stream[kConsume]);
      return new Promise((resolve, reject) => {
        if (isUnusable(stream)) {
          const rState = stream._readableState;
          if (rState.destroyed && rState.closeEmitted === false) {
            stream.on("error", (err) => {
              reject(err);
            }).on("close", () => {
              reject(new TypeError("unusable"));
            });
          } else {
            reject(rState.errored ?? new TypeError("unusable"));
          }
        } else {
          queueMicrotask(() => {
            stream[kConsume] = {
              type,
              stream,
              resolve,
              reject,
              length: 0,
              body: []
            };
            stream.on("error", function(err) {
              consumeFinish(this[kConsume], err);
            }).on("close", function() {
              if (this[kConsume].body !== null) {
                consumeFinish(this[kConsume], new RequestAbortedError());
              }
            });
            consumeStart(stream[kConsume]);
          });
        }
      });
    }
    function consumeStart(consume2) {
      if (consume2.body === null) {
        return;
      }
      const { _readableState: state } = consume2.stream;
      if (state.bufferIndex) {
        const start = state.bufferIndex;
        const end = state.buffer.length;
        for (let n = start; n < end; n++) {
          consumePush(consume2, state.buffer[n]);
        }
      } else {
        for (const chunk of state.buffer) {
          consumePush(consume2, chunk);
        }
      }
      if (state.endEmitted) {
        consumeEnd(this[kConsume], this._readableState.encoding);
      } else {
        consume2.stream.on("end", function() {
          consumeEnd(this[kConsume], this._readableState.encoding);
        });
      }
      consume2.stream.resume();
      while (consume2.stream.read() != null) {
      }
    }
    function chunksDecode(chunks, length, encoding) {
      if (chunks.length === 0 || length === 0) {
        return "";
      }
      const buffer = chunks.length === 1 ? chunks[0] : Buffer.concat(chunks, length);
      const bufferLength = buffer.length;
      const start = bufferLength > 2 && buffer[0] === 239 && buffer[1] === 187 && buffer[2] === 191 ? 3 : 0;
      if (!encoding || encoding === "utf8" || encoding === "utf-8") {
        return buffer.utf8Slice(start, bufferLength);
      } else {
        return buffer.subarray(start, bufferLength).toString(encoding);
      }
    }
    function chunksConcat(chunks, length) {
      if (chunks.length === 0 || length === 0) {
        return new Uint8Array(0);
      }
      if (chunks.length === 1) {
        return new Uint8Array(chunks[0]);
      }
      const buffer = new Uint8Array(Buffer.allocUnsafeSlow(length).buffer);
      let offset = 0;
      for (let i = 0; i < chunks.length; ++i) {
        const chunk = chunks[i];
        buffer.set(chunk, offset);
        offset += chunk.length;
      }
      return buffer;
    }
    function consumeEnd(consume2, encoding) {
      const { type, body, resolve, stream, length } = consume2;
      try {
        if (type === "text") {
          resolve(chunksDecode(body, length, encoding));
        } else if (type === "json") {
          resolve(JSON.parse(chunksDecode(body, length, encoding)));
        } else if (type === "arrayBuffer") {
          resolve(chunksConcat(body, length).buffer);
        } else if (type === "blob") {
          resolve(new Blob(body, { type: stream[kContentType] }));
        } else if (type === "bytes") {
          resolve(chunksConcat(body, length));
        }
        consumeFinish(consume2);
      } catch (err) {
        stream.destroy(err);
      }
    }
    function consumePush(consume2, chunk) {
      consume2.length += chunk.length;
      consume2.body.push(chunk);
    }
    function consumeFinish(consume2, err) {
      if (consume2.body === null) {
        return;
      }
      if (err) {
        consume2.reject(err);
      } else {
        consume2.resolve();
      }
      consume2.type = null;
      consume2.stream = null;
      consume2.resolve = null;
      consume2.reject = null;
      consume2.length = 0;
      consume2.body = null;
    }
    module2.exports = {
      Readable: BodyReadable,
      chunksDecode
    };
  }
});

// node_modules/undici/lib/api/api-request.js
var require_api_request = __commonJS({
  "node_modules/undici/lib/api/api-request.js"(exports2, module2) {
    "use strict";
    var assert = require("node:assert");
    var { AsyncResource } = require("node:async_hooks");
    var { Readable } = require_readable();
    var { InvalidArgumentError, RequestAbortedError } = require_errors();
    var util = require_util();
    function noop() {
    }
    var RequestHandler = class extends AsyncResource {
      constructor(opts, callback) {
        if (!opts || typeof opts !== "object") {
          throw new InvalidArgumentError("invalid opts");
        }
        const { signal, method, opaque, body, onInfo, responseHeaders, highWaterMark } = opts;
        try {
          if (typeof callback !== "function") {
            throw new InvalidArgumentError("invalid callback");
          }
          if (highWaterMark && (typeof highWaterMark !== "number" || highWaterMark < 0)) {
            throw new InvalidArgumentError("invalid highWaterMark");
          }
          if (signal && typeof signal.on !== "function" && typeof signal.addEventListener !== "function") {
            throw new InvalidArgumentError("signal must be an EventEmitter or EventTarget");
          }
          if (method === "CONNECT") {
            throw new InvalidArgumentError("invalid method");
          }
          if (onInfo && typeof onInfo !== "function") {
            throw new InvalidArgumentError("invalid onInfo callback");
          }
          super("UNDICI_REQUEST");
        } catch (err) {
          if (util.isStream(body)) {
            util.destroy(body.on("error", noop), err);
          }
          throw err;
        }
        this.method = method;
        this.responseHeaders = responseHeaders || null;
        this.opaque = opaque || null;
        this.callback = callback;
        this.res = null;
        this.abort = null;
        this.body = body;
        this.trailers = {};
        this.context = null;
        this.onInfo = onInfo || null;
        this.highWaterMark = highWaterMark;
        this.reason = null;
        this.removeAbortListener = null;
        if (signal?.aborted) {
          this.reason = signal.reason ?? new RequestAbortedError();
        } else if (signal) {
          this.removeAbortListener = util.addAbortListener(signal, () => {
            this.reason = signal.reason ?? new RequestAbortedError();
            if (this.res) {
              util.destroy(this.res.on("error", noop), this.reason);
            } else if (this.abort) {
              this.abort(this.reason);
            }
          });
        }
      }
      onConnect(abort, context) {
        if (this.reason) {
          abort(this.reason);
          return;
        }
        assert(this.callback);
        this.abort = abort;
        this.context = context;
      }
      onHeaders(statusCode, rawHeaders, resume, statusMessage) {
        const { callback, opaque, abort, context, responseHeaders, highWaterMark } = this;
        const headers = responseHeaders === "raw" ? util.parseRawHeaders(rawHeaders) : util.parseHeaders(rawHeaders);
        if (statusCode < 200) {
          if (this.onInfo) {
            this.onInfo({ statusCode, headers });
          }
          return;
        }
        const parsedHeaders = responseHeaders === "raw" ? util.parseHeaders(rawHeaders) : headers;
        const contentType = parsedHeaders["content-type"];
        const contentLength = parsedHeaders["content-length"];
        const res = new Readable({
          resume,
          abort,
          contentType,
          contentLength: this.method !== "HEAD" && contentLength ? Number(contentLength) : null,
          highWaterMark
        });
        if (this.removeAbortListener) {
          res.on("close", this.removeAbortListener);
          this.removeAbortListener = null;
        }
        this.callback = null;
        this.res = res;
        if (callback !== null) {
          this.runInAsyncScope(callback, null, null, {
            statusCode,
            headers,
            trailers: this.trailers,
            opaque,
            body: res,
            context
          });
        }
      }
      onData(chunk) {
        return this.res.push(chunk);
      }
      onComplete(trailers) {
        util.parseHeaders(trailers, this.trailers);
        this.res.push(null);
      }
      onError(err) {
        const { res, callback, body, opaque } = this;
        if (callback) {
          this.callback = null;
          queueMicrotask(() => {
            this.runInAsyncScope(callback, null, err, { opaque });
          });
        }
        if (res) {
          this.res = null;
          queueMicrotask(() => {
            util.destroy(res.on("error", noop), err);
          });
        }
        if (body) {
          this.body = null;
          if (util.isStream(body)) {
            body.on("error", noop);
            util.destroy(body, err);
          }
        }
        if (this.removeAbortListener) {
          this.removeAbortListener();
          this.removeAbortListener = null;
        }
      }
    };
    function request(opts, callback) {
      if (callback === void 0) {
        return new Promise((resolve, reject) => {
          request.call(this, opts, (err, data) => {
            return err ? reject(err) : resolve(data);
          });
        });
      }
      try {
        const handler = new RequestHandler(opts, callback);
        this.dispatch(opts, handler);
      } catch (err) {
        if (typeof callback !== "function") {
          throw err;
        }
        const opaque = opts?.opaque;
        queueMicrotask(() => callback(err, { opaque }));
      }
    }
    module2.exports = request;
    module2.exports.RequestHandler = RequestHandler;
  }
});

// node_modules/undici/lib/api/abort-signal.js
var require_abort_signal = __commonJS({
  "node_modules/undici/lib/api/abort-signal.js"(exports2, module2) {
    "use strict";
    var { addAbortListener } = require_util();
    var { RequestAbortedError } = require_errors();
    var kListener = Symbol("kListener");
    var kSignal = Symbol("kSignal");
    function abort(self) {
      if (self.abort) {
        self.abort(self[kSignal]?.reason);
      } else {
        self.reason = self[kSignal]?.reason ?? new RequestAbortedError();
      }
      removeSignal(self);
    }
    function addSignal(self, signal) {
      self.reason = null;
      self[kSignal] = null;
      self[kListener] = null;
      if (!signal) {
        return;
      }
      if (signal.aborted) {
        abort(self);
        return;
      }
      self[kSignal] = signal;
      self[kListener] = () => {
        abort(self);
      };
      addAbortListener(self[kSignal], self[kListener]);
    }
    function removeSignal(self) {
      if (!self[kSignal]) {
        return;
      }
      if ("removeEventListener" in self[kSignal]) {
        self[kSignal].removeEventListener("abort", self[kListener]);
      } else {
        self[kSignal].removeListener("abort", self[kListener]);
      }
      self[kSignal] = null;
      self[kListener] = null;
    }
    module2.exports = {
      addSignal,
      removeSignal
    };
  }
});

// node_modules/undici/lib/api/api-stream.js
var require_api_stream = __commonJS({
  "node_modules/undici/lib/api/api-stream.js"(exports2, module2) {
    "use strict";
    var assert = require("node:assert");
    var { finished } = require("node:stream");
    var { AsyncResource } = require("node:async_hooks");
    var { InvalidArgumentError, InvalidReturnValueError } = require_errors();
    var util = require_util();
    var { addSignal, removeSignal } = require_abort_signal();
    function noop() {
    }
    var StreamHandler = class extends AsyncResource {
      constructor(opts, factory, callback) {
        if (!opts || typeof opts !== "object") {
          throw new InvalidArgumentError("invalid opts");
        }
        const { signal, method, opaque, body, onInfo, responseHeaders } = opts;
        try {
          if (typeof callback !== "function") {
            throw new InvalidArgumentError("invalid callback");
          }
          if (typeof factory !== "function") {
            throw new InvalidArgumentError("invalid factory");
          }
          if (signal && typeof signal.on !== "function" && typeof signal.addEventListener !== "function") {
            throw new InvalidArgumentError("signal must be an EventEmitter or EventTarget");
          }
          if (method === "CONNECT") {
            throw new InvalidArgumentError("invalid method");
          }
          if (onInfo && typeof onInfo !== "function") {
            throw new InvalidArgumentError("invalid onInfo callback");
          }
          super("UNDICI_STREAM");
        } catch (err) {
          if (util.isStream(body)) {
            util.destroy(body.on("error", noop), err);
          }
          throw err;
        }
        this.responseHeaders = responseHeaders || null;
        this.opaque = opaque || null;
        this.factory = factory;
        this.callback = callback;
        this.res = null;
        this.abort = null;
        this.context = null;
        this.trailers = null;
        this.body = body;
        this.onInfo = onInfo || null;
        if (util.isStream(body)) {
          body.on("error", (err) => {
            this.onError(err);
          });
        }
        addSignal(this, signal);
      }
      onConnect(abort, context) {
        if (this.reason) {
          abort(this.reason);
          return;
        }
        assert(this.callback);
        this.abort = abort;
        this.context = context;
      }
      onHeaders(statusCode, rawHeaders, resume, statusMessage) {
        const { factory, opaque, context, responseHeaders } = this;
        const headers = responseHeaders === "raw" ? util.parseRawHeaders(rawHeaders) : util.parseHeaders(rawHeaders);
        if (statusCode < 200) {
          if (this.onInfo) {
            this.onInfo({ statusCode, headers });
          }
          return;
        }
        this.factory = null;
        if (factory === null) {
          return;
        }
        const res = this.runInAsyncScope(factory, null, {
          statusCode,
          headers,
          opaque,
          context
        });
        if (!res || typeof res.write !== "function" || typeof res.end !== "function" || typeof res.on !== "function") {
          throw new InvalidReturnValueError("expected Writable");
        }
        finished(res, { readable: false }, (err) => {
          const { callback, res: res2, opaque: opaque2, trailers, abort } = this;
          this.res = null;
          if (err || !res2?.readable) {
            util.destroy(res2, err);
          }
          this.callback = null;
          this.runInAsyncScope(callback, null, err || null, { opaque: opaque2, trailers });
          if (err) {
            abort();
          }
        });
        res.on("drain", resume);
        this.res = res;
        const needDrain = res.writableNeedDrain !== void 0 ? res.writableNeedDrain : res._writableState?.needDrain;
        return needDrain !== true;
      }
      onData(chunk) {
        const { res } = this;
        return res ? res.write(chunk) : true;
      }
      onComplete(trailers) {
        const { res } = this;
        removeSignal(this);
        if (!res) {
          return;
        }
        this.trailers = util.parseHeaders(trailers);
        res.end();
      }
      onError(err) {
        const { res, callback, opaque, body } = this;
        removeSignal(this);
        this.factory = null;
        if (res) {
          this.res = null;
          util.destroy(res, err);
        } else if (callback) {
          this.callback = null;
          queueMicrotask(() => {
            this.runInAsyncScope(callback, null, err, { opaque });
          });
        }
        if (body) {
          this.body = null;
          util.destroy(body, err);
        }
      }
    };
    function stream(opts, factory, callback) {
      if (callback === void 0) {
        return new Promise((resolve, reject) => {
          stream.call(this, opts, factory, (err, data) => {
            return err ? reject(err) : resolve(data);
          });
        });
      }
      try {
        const handler = new StreamHandler(opts, factory, callback);
        this.dispatch(opts, handler);
      } catch (err) {
        if (typeof callback !== "function") {
          throw err;
        }
        const opaque = opts?.opaque;
        queueMicrotask(() => callback(err, { opaque }));
      }
    }
    module2.exports = stream;
  }
});

// node_modules/undici/lib/api/api-pipeline.js
var require_api_pipeline = __commonJS({
  "node_modules/undici/lib/api/api-pipeline.js"(exports2, module2) {
    "use strict";
    var {
      Readable,
      Duplex,
      PassThrough
    } = require("node:stream");
    var assert = require("node:assert");
    var { AsyncResource } = require("node:async_hooks");
    var {
      InvalidArgumentError,
      InvalidReturnValueError,
      RequestAbortedError
    } = require_errors();
    var util = require_util();
    var { addSignal, removeSignal } = require_abort_signal();
    function noop() {
    }
    var kResume = Symbol("resume");
    var PipelineRequest = class extends Readable {
      constructor() {
        super({ autoDestroy: true });
        this[kResume] = null;
      }
      _read() {
        const { [kResume]: resume } = this;
        if (resume) {
          this[kResume] = null;
          resume();
        }
      }
      _destroy(err, callback) {
        this._read();
        callback(err);
      }
    };
    var PipelineResponse = class extends Readable {
      constructor(resume) {
        super({ autoDestroy: true });
        this[kResume] = resume;
      }
      _read() {
        this[kResume]();
      }
      _destroy(err, callback) {
        if (!err && !this._readableState.endEmitted) {
          err = new RequestAbortedError();
        }
        callback(err);
      }
    };
    var PipelineHandler = class extends AsyncResource {
      constructor(opts, handler) {
        if (!opts || typeof opts !== "object") {
          throw new InvalidArgumentError("invalid opts");
        }
        if (typeof handler !== "function") {
          throw new InvalidArgumentError("invalid handler");
        }
        const { signal, method, opaque, onInfo, responseHeaders } = opts;
        if (signal && typeof signal.on !== "function" && typeof signal.addEventListener !== "function") {
          throw new InvalidArgumentError("signal must be an EventEmitter or EventTarget");
        }
        if (method === "CONNECT") {
          throw new InvalidArgumentError("invalid method");
        }
        if (onInfo && typeof onInfo !== "function") {
          throw new InvalidArgumentError("invalid onInfo callback");
        }
        super("UNDICI_PIPELINE");
        this.opaque = opaque || null;
        this.responseHeaders = responseHeaders || null;
        this.handler = handler;
        this.abort = null;
        this.context = null;
        this.onInfo = onInfo || null;
        this.req = new PipelineRequest().on("error", noop);
        this.ret = new Duplex({
          readableObjectMode: opts.objectMode,
          autoDestroy: true,
          read: () => {
            const { body } = this;
            if (body?.resume) {
              body.resume();
            }
          },
          write: (chunk, encoding, callback) => {
            const { req } = this;
            if (req.push(chunk, encoding) || req._readableState.destroyed) {
              callback();
            } else {
              req[kResume] = callback;
            }
          },
          destroy: (err, callback) => {
            const { body, req, res, ret, abort } = this;
            if (!err && !ret._readableState.endEmitted) {
              err = new RequestAbortedError();
            }
            if (abort && err) {
              abort();
            }
            util.destroy(body, err);
            util.destroy(req, err);
            util.destroy(res, err);
            removeSignal(this);
            callback(err);
          }
        }).on("prefinish", () => {
          const { req } = this;
          req.push(null);
        });
        this.res = null;
        addSignal(this, signal);
      }
      onConnect(abort, context) {
        const { res } = this;
        if (this.reason) {
          abort(this.reason);
          return;
        }
        assert(!res, "pipeline cannot be retried");
        this.abort = abort;
        this.context = context;
      }
      onHeaders(statusCode, rawHeaders, resume) {
        const { opaque, handler, context } = this;
        if (statusCode < 200) {
          if (this.onInfo) {
            const headers = this.responseHeaders === "raw" ? util.parseRawHeaders(rawHeaders) : util.parseHeaders(rawHeaders);
            this.onInfo({ statusCode, headers });
          }
          return;
        }
        this.res = new PipelineResponse(resume);
        let body;
        try {
          this.handler = null;
          const headers = this.responseHeaders === "raw" ? util.parseRawHeaders(rawHeaders) : util.parseHeaders(rawHeaders);
          body = this.runInAsyncScope(handler, null, {
            statusCode,
            headers,
            opaque,
            body: this.res,
            context
          });
        } catch (err) {
          this.res.on("error", noop);
          throw err;
        }
        if (!body || typeof body.on !== "function") {
          throw new InvalidReturnValueError("expected Readable");
        }
        body.on("data", (chunk) => {
          const { ret, body: body2 } = this;
          if (!ret.push(chunk) && body2.pause) {
            body2.pause();
          }
        }).on("error", (err) => {
          const { ret } = this;
          util.destroy(ret, err);
        }).on("end", () => {
          const { ret } = this;
          ret.push(null);
        }).on("close", () => {
          const { ret } = this;
          if (!ret._readableState.ended) {
            util.destroy(ret, new RequestAbortedError());
          }
        });
        this.body = body;
      }
      onData(chunk) {
        const { res } = this;
        return res.push(chunk);
      }
      onComplete(trailers) {
        const { res } = this;
        res.push(null);
      }
      onError(err) {
        const { ret } = this;
        this.handler = null;
        util.destroy(ret, err);
      }
    };
    function pipeline(opts, handler) {
      try {
        const pipelineHandler = new PipelineHandler(opts, handler);
        this.dispatch({ ...opts, body: pipelineHandler.req }, pipelineHandler);
        return pipelineHandler.ret;
      } catch (err) {
        return new PassThrough().destroy(err);
      }
    }
    module2.exports = pipeline;
  }
});

// node_modules/undici/lib/api/api-upgrade.js
var require_api_upgrade = __commonJS({
  "node_modules/undici/lib/api/api-upgrade.js"(exports2, module2) {
    "use strict";
    var { InvalidArgumentError, SocketError } = require_errors();
    var { AsyncResource } = require("node:async_hooks");
    var assert = require("node:assert");
    var util = require_util();
    var { addSignal, removeSignal } = require_abort_signal();
    var UpgradeHandler = class extends AsyncResource {
      constructor(opts, callback) {
        if (!opts || typeof opts !== "object") {
          throw new InvalidArgumentError("invalid opts");
        }
        if (typeof callback !== "function") {
          throw new InvalidArgumentError("invalid callback");
        }
        const { signal, opaque, responseHeaders } = opts;
        if (signal && typeof signal.on !== "function" && typeof signal.addEventListener !== "function") {
          throw new InvalidArgumentError("signal must be an EventEmitter or EventTarget");
        }
        super("UNDICI_UPGRADE");
        this.responseHeaders = responseHeaders || null;
        this.opaque = opaque || null;
        this.callback = callback;
        this.abort = null;
        this.context = null;
        addSignal(this, signal);
      }
      onConnect(abort, context) {
        if (this.reason) {
          abort(this.reason);
          return;
        }
        assert(this.callback);
        this.abort = abort;
        this.context = null;
      }
      onHeaders() {
        throw new SocketError("bad upgrade", null);
      }
      onUpgrade(statusCode, rawHeaders, socket) {
        assert(statusCode === 101);
        const { callback, opaque, context } = this;
        removeSignal(this);
        this.callback = null;
        const headers = this.responseHeaders === "raw" ? util.parseRawHeaders(rawHeaders) : util.parseHeaders(rawHeaders);
        this.runInAsyncScope(callback, null, null, {
          headers,
          socket,
          opaque,
          context
        });
      }
      onError(err) {
        const { callback, opaque } = this;
        removeSignal(this);
        if (callback) {
          this.callback = null;
          queueMicrotask(() => {
            this.runInAsyncScope(callback, null, err, { opaque });
          });
        }
      }
    };
    function upgrade(opts, callback) {
      if (callback === void 0) {
        return new Promise((resolve, reject) => {
          upgrade.call(this, opts, (err, data) => {
            return err ? reject(err) : resolve(data);
          });
        });
      }
      try {
        const upgradeHandler = new UpgradeHandler(opts, callback);
        const upgradeOpts = {
          ...opts,
          method: opts.method || "GET",
          upgrade: opts.protocol || "Websocket"
        };
        this.dispatch(upgradeOpts, upgradeHandler);
      } catch (err) {
        if (typeof callback !== "function") {
          throw err;
        }
        const opaque = opts?.opaque;
        queueMicrotask(() => callback(err, { opaque }));
      }
    }
    module2.exports = upgrade;
  }
});

// node_modules/undici/lib/api/api-connect.js
var require_api_connect = __commonJS({
  "node_modules/undici/lib/api/api-connect.js"(exports2, module2) {
    "use strict";
    var assert = require("node:assert");
    var { AsyncResource } = require("node:async_hooks");
    var { InvalidArgumentError, SocketError } = require_errors();
    var util = require_util();
    var { addSignal, removeSignal } = require_abort_signal();
    var ConnectHandler = class extends AsyncResource {
      constructor(opts, callback) {
        if (!opts || typeof opts !== "object") {
          throw new InvalidArgumentError("invalid opts");
        }
        if (typeof callback !== "function") {
          throw new InvalidArgumentError("invalid callback");
        }
        const { signal, opaque, responseHeaders } = opts;
        if (signal && typeof signal.on !== "function" && typeof signal.addEventListener !== "function") {
          throw new InvalidArgumentError("signal must be an EventEmitter or EventTarget");
        }
        super("UNDICI_CONNECT");
        this.opaque = opaque || null;
        this.responseHeaders = responseHeaders || null;
        this.callback = callback;
        this.abort = null;
        addSignal(this, signal);
      }
      onConnect(abort, context) {
        if (this.reason) {
          abort(this.reason);
          return;
        }
        assert(this.callback);
        this.abort = abort;
        this.context = context;
      }
      onHeaders() {
        throw new SocketError("bad connect", null);
      }
      onUpgrade(statusCode, rawHeaders, socket) {
        const { callback, opaque, context } = this;
        removeSignal(this);
        this.callback = null;
        let headers = rawHeaders;
        if (headers != null) {
          headers = this.responseHeaders === "raw" ? util.parseRawHeaders(rawHeaders) : util.parseHeaders(rawHeaders);
        }
        this.runInAsyncScope(callback, null, null, {
          statusCode,
          headers,
          socket,
          opaque,
          context
        });
      }
      onError(err) {
        const { callback, opaque } = this;
        removeSignal(this);
        if (callback) {
          this.callback = null;
          queueMicrotask(() => {
            this.runInAsyncScope(callback, null, err, { opaque });
          });
        }
      }
    };
    function connect(opts, callback) {
      if (callback === void 0) {
        return new Promise((resolve, reject) => {
          connect.call(this, opts, (err, data) => {
            return err ? reject(err) : resolve(data);
          });
        });
      }
      try {
        const connectHandler = new ConnectHandler(opts, callback);
        const connectOptions = { ...opts, method: "CONNECT" };
        this.dispatch(connectOptions, connectHandler);
      } catch (err) {
        if (typeof callback !== "function") {
          throw err;
        }
        const opaque = opts?.opaque;
        queueMicrotask(() => callback(err, { opaque }));
      }
    }
    module2.exports = connect;
  }
});

// node_modules/undici/lib/api/index.js
var require_api = __commonJS({
  "node_modules/undici/lib/api/index.js"(exports2, module2) {
    "use strict";
    module2.exports.request = require_api_request();
    module2.exports.stream = require_api_stream();
    module2.exports.pipeline = require_api_pipeline();
    module2.exports.upgrade = require_api_upgrade();
    module2.exports.connect = require_api_connect();
  }
});

// node_modules/undici/lib/mock/mock-errors.js
var require_mock_errors = __commonJS({
  "node_modules/undici/lib/mock/mock-errors.js"(exports2, module2) {
    "use strict";
    var { UndiciError } = require_errors();
    var MockNotMatchedError = class extends UndiciError {
      constructor(message) {
        super(message);
        this.name = "MockNotMatchedError";
        this.message = message || "The request does not match any registered mock dispatches";
        this.code = "UND_MOCK_ERR_MOCK_NOT_MATCHED";
      }
    };
    module2.exports = {
      MockNotMatchedError
    };
  }
});

// node_modules/undici/lib/mock/mock-symbols.js
var require_mock_symbols = __commonJS({
  "node_modules/undici/lib/mock/mock-symbols.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      kAgent: Symbol("agent"),
      kOptions: Symbol("options"),
      kFactory: Symbol("factory"),
      kDispatches: Symbol("dispatches"),
      kDispatchKey: Symbol("dispatch key"),
      kDefaultHeaders: Symbol("default headers"),
      kDefaultTrailers: Symbol("default trailers"),
      kContentLength: Symbol("content length"),
      kMockAgent: Symbol("mock agent"),
      kMockAgentSet: Symbol("mock agent set"),
      kMockAgentGet: Symbol("mock agent get"),
      kMockDispatch: Symbol("mock dispatch"),
      kClose: Symbol("close"),
      kOriginalClose: Symbol("original agent close"),
      kOriginalDispatch: Symbol("original dispatch"),
      kOrigin: Symbol("origin"),
      kIsMockActive: Symbol("is mock active"),
      kNetConnect: Symbol("net connect"),
      kGetNetConnect: Symbol("get net connect"),
      kConnected: Symbol("connected"),
      kIgnoreTrailingSlash: Symbol("ignore trailing slash"),
      kMockAgentMockCallHistoryInstance: Symbol("mock agent mock call history name"),
      kMockAgentRegisterCallHistory: Symbol("mock agent register mock call history"),
      kMockAgentAddCallHistoryLog: Symbol("mock agent add call history log"),
      kMockAgentIsCallHistoryEnabled: Symbol("mock agent is call history enabled"),
      kMockAgentAcceptsNonStandardSearchParameters: Symbol("mock agent accepts non standard search parameters"),
      kMockCallHistoryAddLog: Symbol("mock call history add log")
    };
  }
});

// node_modules/undici/lib/mock/mock-utils.js
var require_mock_utils = __commonJS({
  "node_modules/undici/lib/mock/mock-utils.js"(exports2, module2) {
    "use strict";
    var { MockNotMatchedError } = require_mock_errors();
    var {
      kDispatches,
      kMockAgent,
      kOriginalDispatch,
      kOrigin,
      kGetNetConnect
    } = require_mock_symbols();
    var { serializePathWithQuery } = require_util();
    var { STATUS_CODES } = require("node:http");
    var {
      types: {
        isPromise
      }
    } = require("node:util");
    var { InvalidArgumentError } = require_errors();
    function matchValue(match, value) {
      if (typeof match === "string") {
        return match === value;
      }
      if (match instanceof RegExp) {
        return match.test(value);
      }
      if (typeof match === "function") {
        return match(value) === true;
      }
      return false;
    }
    function lowerCaseEntries(headers) {
      return Object.fromEntries(
        Object.entries(headers).map(([headerName, headerValue]) => {
          return [headerName.toLocaleLowerCase(), headerValue];
        })
      );
    }
    function getHeaderByName(headers, key) {
      if (Array.isArray(headers)) {
        for (let i = 0; i < headers.length; i += 2) {
          if (headers[i].toLocaleLowerCase() === key.toLocaleLowerCase()) {
            return headers[i + 1];
          }
        }
        return void 0;
      } else if (typeof headers.get === "function") {
        return headers.get(key);
      } else {
        return lowerCaseEntries(headers)[key.toLocaleLowerCase()];
      }
    }
    function buildHeadersFromArray(headers) {
      const clone = headers.slice();
      const entries = [];
      for (let index = 0; index < clone.length; index += 2) {
        entries.push([clone[index], clone[index + 1]]);
      }
      return Object.fromEntries(entries);
    }
    function matchHeaders(mockDispatch2, headers) {
      if (typeof mockDispatch2.headers === "function") {
        if (Array.isArray(headers)) {
          headers = buildHeadersFromArray(headers);
        }
        return mockDispatch2.headers(headers ? lowerCaseEntries(headers) : {});
      }
      if (typeof mockDispatch2.headers === "undefined") {
        return true;
      }
      if (typeof headers !== "object" || typeof mockDispatch2.headers !== "object") {
        return false;
      }
      for (const [matchHeaderName, matchHeaderValue] of Object.entries(mockDispatch2.headers)) {
        const headerValue = getHeaderByName(headers, matchHeaderName);
        if (!matchValue(matchHeaderValue, headerValue)) {
          return false;
        }
      }
      return true;
    }
    function normalizeSearchParams(query) {
      if (typeof query !== "string") {
        return query;
      }
      const originalQp = new URLSearchParams(query);
      const normalizedQp = new URLSearchParams();
      for (let [key, value] of originalQp.entries()) {
        key = key.replace("[]", "");
        const valueRepresentsString = /^(['"]).*\1$/.test(value);
        if (valueRepresentsString) {
          normalizedQp.append(key, value);
          continue;
        }
        if (value.includes(",")) {
          const values = value.split(",");
          for (const v of values) {
            normalizedQp.append(key, v);
          }
          continue;
        }
        normalizedQp.append(key, value);
      }
      return normalizedQp;
    }
    function safeUrl(path) {
      if (typeof path !== "string") {
        return path;
      }
      const pathSegments = path.split("?", 3);
      if (pathSegments.length !== 2) {
        return path;
      }
      const qp = new URLSearchParams(pathSegments.pop());
      qp.sort();
      return [...pathSegments, qp.toString()].join("?");
    }
    function matchKey(mockDispatch2, { path, method, body, headers }) {
      const pathMatch = matchValue(mockDispatch2.path, path);
      const methodMatch = matchValue(mockDispatch2.method, method);
      const bodyMatch = typeof mockDispatch2.body !== "undefined" ? matchValue(mockDispatch2.body, body) : true;
      const headersMatch = matchHeaders(mockDispatch2, headers);
      return pathMatch && methodMatch && bodyMatch && headersMatch;
    }
    function getResponseData(data) {
      if (Buffer.isBuffer(data)) {
        return data;
      } else if (data instanceof Uint8Array) {
        return data;
      } else if (data instanceof ArrayBuffer) {
        return data;
      } else if (typeof data === "object") {
        return JSON.stringify(data);
      } else if (data) {
        return data.toString();
      } else {
        return "";
      }
    }
    function getMockDispatch(mockDispatches, key) {
      const basePath = key.query ? serializePathWithQuery(key.path, key.query) : key.path;
      const resolvedPath = typeof basePath === "string" ? safeUrl(basePath) : basePath;
      const resolvedPathWithoutTrailingSlash = removeTrailingSlash(resolvedPath);
      let matchedMockDispatches = mockDispatches.filter(({ consumed }) => !consumed).filter(({ path, ignoreTrailingSlash }) => {
        return ignoreTrailingSlash ? matchValue(removeTrailingSlash(safeUrl(path)), resolvedPathWithoutTrailingSlash) : matchValue(safeUrl(path), resolvedPath);
      });
      if (matchedMockDispatches.length === 0) {
        throw new MockNotMatchedError(`Mock dispatch not matched for path '${resolvedPath}'`);
      }
      matchedMockDispatches = matchedMockDispatches.filter(({ method }) => matchValue(method, key.method));
      if (matchedMockDispatches.length === 0) {
        throw new MockNotMatchedError(`Mock dispatch not matched for method '${key.method}' on path '${resolvedPath}'`);
      }
      matchedMockDispatches = matchedMockDispatches.filter(({ body }) => typeof body !== "undefined" ? matchValue(body, key.body) : true);
      if (matchedMockDispatches.length === 0) {
        throw new MockNotMatchedError(`Mock dispatch not matched for body '${key.body}' on path '${resolvedPath}'`);
      }
      matchedMockDispatches = matchedMockDispatches.filter((mockDispatch2) => matchHeaders(mockDispatch2, key.headers));
      if (matchedMockDispatches.length === 0) {
        const headers = typeof key.headers === "object" ? JSON.stringify(key.headers) : key.headers;
        throw new MockNotMatchedError(`Mock dispatch not matched for headers '${headers}' on path '${resolvedPath}'`);
      }
      return matchedMockDispatches[0];
    }
    function addMockDispatch(mockDispatches, key, data, opts) {
      const baseData = { timesInvoked: 0, times: 1, persist: false, consumed: false, ...opts };
      const replyData = typeof data === "function" ? { callback: data } : { ...data };
      const newMockDispatch = { ...baseData, ...key, pending: true, data: { error: null, ...replyData } };
      mockDispatches.push(newMockDispatch);
      return newMockDispatch;
    }
    function deleteMockDispatch(mockDispatches, key) {
      const index = mockDispatches.findIndex((dispatch) => {
        if (!dispatch.consumed) {
          return false;
        }
        return matchKey(dispatch, key);
      });
      if (index !== -1) {
        mockDispatches.splice(index, 1);
      }
    }
    function removeTrailingSlash(path) {
      while (path.endsWith("/")) {
        path = path.slice(0, -1);
      }
      if (path.length === 0) {
        path = "/";
      }
      return path;
    }
    function buildKey(opts) {
      const { path, method, body, headers, query } = opts;
      return {
        path,
        method,
        body,
        headers,
        query
      };
    }
    function generateKeyValues(data) {
      const keys = Object.keys(data);
      const result = [];
      for (let i = 0; i < keys.length; ++i) {
        const key = keys[i];
        const value = data[key];
        const name = Buffer.from(`${key}`);
        if (Array.isArray(value)) {
          for (let j = 0; j < value.length; ++j) {
            result.push(name, Buffer.from(`${value[j]}`));
          }
        } else {
          result.push(name, Buffer.from(`${value}`));
        }
      }
      return result;
    }
    function getStatusText(statusCode) {
      return STATUS_CODES[statusCode] || "unknown";
    }
    async function getResponse(body) {
      const buffers = [];
      for await (const data of body) {
        buffers.push(data);
      }
      return Buffer.concat(buffers).toString("utf8");
    }
    function mockDispatch(opts, handler) {
      const key = buildKey(opts);
      const mockDispatch2 = getMockDispatch(this[kDispatches], key);
      mockDispatch2.timesInvoked++;
      if (mockDispatch2.data.callback) {
        mockDispatch2.data = { ...mockDispatch2.data, ...mockDispatch2.data.callback(opts) };
      }
      const { data: { statusCode, data, headers, trailers, error }, delay, persist } = mockDispatch2;
      const { timesInvoked, times } = mockDispatch2;
      mockDispatch2.consumed = !persist && timesInvoked >= times;
      mockDispatch2.pending = timesInvoked < times;
      if (error !== null) {
        deleteMockDispatch(this[kDispatches], key);
        handler.onError(error);
        return true;
      }
      if (typeof delay === "number" && delay > 0) {
        setTimeout(() => {
          handleReply(this[kDispatches]);
        }, delay);
      } else {
        handleReply(this[kDispatches]);
      }
      function handleReply(mockDispatches, _data = data) {
        const optsHeaders = Array.isArray(opts.headers) ? buildHeadersFromArray(opts.headers) : opts.headers;
        const body = typeof _data === "function" ? _data({ ...opts, headers: optsHeaders }) : _data;
        if (isPromise(body)) {
          body.then((newData) => handleReply(mockDispatches, newData));
          return;
        }
        const responseData = getResponseData(body);
        const responseHeaders = generateKeyValues(headers);
        const responseTrailers = generateKeyValues(trailers);
        handler.onConnect?.((err) => handler.onError(err), null);
        handler.onHeaders?.(statusCode, responseHeaders, resume, getStatusText(statusCode));
        handler.onData?.(Buffer.from(responseData));
        handler.onComplete?.(responseTrailers);
        deleteMockDispatch(mockDispatches, key);
      }
      function resume() {
      }
      return true;
    }
    function buildMockDispatch() {
      const agent = this[kMockAgent];
      const origin = this[kOrigin];
      const originalDispatch = this[kOriginalDispatch];
      return function dispatch(opts, handler) {
        if (agent.isMockActive) {
          try {
            mockDispatch.call(this, opts, handler);
          } catch (error) {
            if (error instanceof MockNotMatchedError) {
              const netConnect = agent[kGetNetConnect]();
              if (netConnect === false) {
                throw new MockNotMatchedError(`${error.message}: subsequent request to origin ${origin} was not allowed (net.connect disabled)`);
              }
              if (checkNetConnect(netConnect, origin)) {
                originalDispatch.call(this, opts, handler);
              } else {
                throw new MockNotMatchedError(`${error.message}: subsequent request to origin ${origin} was not allowed (net.connect is not enabled for this origin)`);
              }
            } else {
              throw error;
            }
          }
        } else {
          originalDispatch.call(this, opts, handler);
        }
      };
    }
    function checkNetConnect(netConnect, origin) {
      const url = new URL(origin);
      if (netConnect === true) {
        return true;
      } else if (Array.isArray(netConnect) && netConnect.some((matcher) => matchValue(matcher, url.host))) {
        return true;
      }
      return false;
    }
    function buildAndValidateMockOptions(opts) {
      if (opts) {
        const { agent, ...mockOptions } = opts;
        if ("enableCallHistory" in mockOptions && typeof mockOptions.enableCallHistory !== "boolean") {
          throw new InvalidArgumentError("options.enableCallHistory must to be a boolean");
        }
        if ("acceptNonStandardSearchParameters" in mockOptions && typeof mockOptions.acceptNonStandardSearchParameters !== "boolean") {
          throw new InvalidArgumentError("options.acceptNonStandardSearchParameters must to be a boolean");
        }
        return mockOptions;
      }
    }
    module2.exports = {
      getResponseData,
      getMockDispatch,
      addMockDispatch,
      deleteMockDispatch,
      buildKey,
      generateKeyValues,
      matchValue,
      getResponse,
      getStatusText,
      mockDispatch,
      buildMockDispatch,
      checkNetConnect,
      buildAndValidateMockOptions,
      getHeaderByName,
      buildHeadersFromArray,
      normalizeSearchParams
    };
  }
});

// node_modules/undici/lib/mock/mock-interceptor.js
var require_mock_interceptor = __commonJS({
  "node_modules/undici/lib/mock/mock-interceptor.js"(exports2, module2) {
    "use strict";
    var { getResponseData, buildKey, addMockDispatch } = require_mock_utils();
    var {
      kDispatches,
      kDispatchKey,
      kDefaultHeaders,
      kDefaultTrailers,
      kContentLength,
      kMockDispatch,
      kIgnoreTrailingSlash
    } = require_mock_symbols();
    var { InvalidArgumentError } = require_errors();
    var { serializePathWithQuery } = require_util();
    var MockScope = class {
      constructor(mockDispatch) {
        this[kMockDispatch] = mockDispatch;
      }
      /**
       * Delay a reply by a set amount in ms.
       */
      delay(waitInMs) {
        if (typeof waitInMs !== "number" || !Number.isInteger(waitInMs) || waitInMs <= 0) {
          throw new InvalidArgumentError("waitInMs must be a valid integer > 0");
        }
        this[kMockDispatch].delay = waitInMs;
        return this;
      }
      /**
       * For a defined reply, never mark as consumed.
       */
      persist() {
        this[kMockDispatch].persist = true;
        return this;
      }
      /**
       * Allow one to define a reply for a set amount of matching requests.
       */
      times(repeatTimes) {
        if (typeof repeatTimes !== "number" || !Number.isInteger(repeatTimes) || repeatTimes <= 0) {
          throw new InvalidArgumentError("repeatTimes must be a valid integer > 0");
        }
        this[kMockDispatch].times = repeatTimes;
        return this;
      }
    };
    var MockInterceptor = class {
      constructor(opts, mockDispatches) {
        if (typeof opts !== "object") {
          throw new InvalidArgumentError("opts must be an object");
        }
        if (typeof opts.path === "undefined") {
          throw new InvalidArgumentError("opts.path must be defined");
        }
        if (typeof opts.method === "undefined") {
          opts.method = "GET";
        }
        if (typeof opts.path === "string") {
          if (opts.query) {
            opts.path = serializePathWithQuery(opts.path, opts.query);
          } else {
            const parsedURL = new URL(opts.path, "data://");
            opts.path = parsedURL.pathname + parsedURL.search;
          }
        }
        if (typeof opts.method === "string") {
          opts.method = opts.method.toUpperCase();
        }
        this[kDispatchKey] = buildKey(opts);
        this[kDispatches] = mockDispatches;
        this[kIgnoreTrailingSlash] = opts.ignoreTrailingSlash ?? false;
        this[kDefaultHeaders] = {};
        this[kDefaultTrailers] = {};
        this[kContentLength] = false;
      }
      createMockScopeDispatchData({ statusCode, data, responseOptions }) {
        const responseData = getResponseData(data);
        const contentLength = this[kContentLength] ? { "content-length": responseData.length } : {};
        const headers = { ...this[kDefaultHeaders], ...contentLength, ...responseOptions.headers };
        const trailers = { ...this[kDefaultTrailers], ...responseOptions.trailers };
        return { statusCode, data, headers, trailers };
      }
      validateReplyParameters(replyParameters) {
        if (typeof replyParameters.statusCode === "undefined") {
          throw new InvalidArgumentError("statusCode must be defined");
        }
        if (typeof replyParameters.responseOptions !== "object" || replyParameters.responseOptions === null) {
          throw new InvalidArgumentError("responseOptions must be an object");
        }
      }
      /**
       * Mock an undici request with a defined reply.
       */
      reply(replyOptionsCallbackOrStatusCode) {
        if (typeof replyOptionsCallbackOrStatusCode === "function") {
          const wrappedDefaultsCallback = (opts) => {
            const resolvedData = replyOptionsCallbackOrStatusCode(opts);
            if (typeof resolvedData !== "object" || resolvedData === null) {
              throw new InvalidArgumentError("reply options callback must return an object");
            }
            const replyParameters2 = { data: "", responseOptions: {}, ...resolvedData };
            this.validateReplyParameters(replyParameters2);
            return {
              ...this.createMockScopeDispatchData(replyParameters2)
            };
          };
          const newMockDispatch2 = addMockDispatch(this[kDispatches], this[kDispatchKey], wrappedDefaultsCallback, { ignoreTrailingSlash: this[kIgnoreTrailingSlash] });
          return new MockScope(newMockDispatch2);
        }
        const replyParameters = {
          statusCode: replyOptionsCallbackOrStatusCode,
          data: arguments[1] === void 0 ? "" : arguments[1],
          responseOptions: arguments[2] === void 0 ? {} : arguments[2]
        };
        this.validateReplyParameters(replyParameters);
        const dispatchData = this.createMockScopeDispatchData(replyParameters);
        const newMockDispatch = addMockDispatch(this[kDispatches], this[kDispatchKey], dispatchData, { ignoreTrailingSlash: this[kIgnoreTrailingSlash] });
        return new MockScope(newMockDispatch);
      }
      /**
       * Mock an undici request with a defined error.
       */
      replyWithError(error) {
        if (typeof error === "undefined") {
          throw new InvalidArgumentError("error must be defined");
        }
        const newMockDispatch = addMockDispatch(this[kDispatches], this[kDispatchKey], { error }, { ignoreTrailingSlash: this[kIgnoreTrailingSlash] });
        return new MockScope(newMockDispatch);
      }
      /**
       * Set default reply headers on the interceptor for subsequent replies
       */
      defaultReplyHeaders(headers) {
        if (typeof headers === "undefined") {
          throw new InvalidArgumentError("headers must be defined");
        }
        this[kDefaultHeaders] = headers;
        return this;
      }
      /**
       * Set default reply trailers on the interceptor for subsequent replies
       */
      defaultReplyTrailers(trailers) {
        if (typeof trailers === "undefined") {
          throw new InvalidArgumentError("trailers must be defined");
        }
        this[kDefaultTrailers] = trailers;
        return this;
      }
      /**
       * Set reply content length header for replies on the interceptor
       */
      replyContentLength() {
        this[kContentLength] = true;
        return this;
      }
    };
    module2.exports.MockInterceptor = MockInterceptor;
    module2.exports.MockScope = MockScope;
  }
});

// node_modules/undici/lib/mock/mock-client.js
var require_mock_client = __commonJS({
  "node_modules/undici/lib/mock/mock-client.js"(exports2, module2) {
    "use strict";
    var { promisify } = require("node:util");
    var Client = require_client();
    var { buildMockDispatch } = require_mock_utils();
    var {
      kDispatches,
      kMockAgent,
      kClose,
      kOriginalClose,
      kOrigin,
      kOriginalDispatch,
      kConnected,
      kIgnoreTrailingSlash
    } = require_mock_symbols();
    var { MockInterceptor } = require_mock_interceptor();
    var Symbols = require_symbols();
    var { InvalidArgumentError } = require_errors();
    var MockClient = class extends Client {
      constructor(origin, opts) {
        if (!opts || !opts.agent || typeof opts.agent.dispatch !== "function") {
          throw new InvalidArgumentError("Argument opts.agent must implement Agent");
        }
        super(origin, opts);
        this[kMockAgent] = opts.agent;
        this[kOrigin] = origin;
        this[kIgnoreTrailingSlash] = opts.ignoreTrailingSlash ?? false;
        this[kDispatches] = [];
        this[kConnected] = 1;
        this[kOriginalDispatch] = this.dispatch;
        this[kOriginalClose] = this.close.bind(this);
        this.dispatch = buildMockDispatch.call(this);
        this.close = this[kClose];
      }
      get [Symbols.kConnected]() {
        return this[kConnected];
      }
      /**
       * Sets up the base interceptor for mocking replies from undici.
       */
      intercept(opts) {
        return new MockInterceptor(
          opts && { ignoreTrailingSlash: this[kIgnoreTrailingSlash], ...opts },
          this[kDispatches]
        );
      }
      cleanMocks() {
        this[kDispatches] = [];
      }
      async [kClose]() {
        await promisify(this[kOriginalClose])();
        this[kConnected] = 0;
        this[kMockAgent][Symbols.kClients].delete(this[kOrigin]);
      }
    };
    module2.exports = MockClient;
  }
});

// node_modules/undici/lib/mock/mock-call-history.js
var require_mock_call_history = __commonJS({
  "node_modules/undici/lib/mock/mock-call-history.js"(exports2, module2) {
    "use strict";
    var { kMockCallHistoryAddLog } = require_mock_symbols();
    var { InvalidArgumentError } = require_errors();
    function handleFilterCallsWithOptions(criteria, options, handler, store) {
      switch (options.operator) {
        case "OR":
          store.push(...handler(criteria));
          return store;
        case "AND":
          return handler.call({ logs: store }, criteria);
        default:
          throw new InvalidArgumentError("options.operator must to be a case insensitive string equal to 'OR' or 'AND'");
      }
    }
    function buildAndValidateFilterCallsOptions(options = {}) {
      const finalOptions = {};
      if ("operator" in options) {
        if (typeof options.operator !== "string" || options.operator.toUpperCase() !== "OR" && options.operator.toUpperCase() !== "AND") {
          throw new InvalidArgumentError("options.operator must to be a case insensitive string equal to 'OR' or 'AND'");
        }
        return {
          ...finalOptions,
          operator: options.operator.toUpperCase()
        };
      }
      return finalOptions;
    }
    function makeFilterCalls(parameterName) {
      return (parameterValue) => {
        if (typeof parameterValue === "string" || parameterValue == null) {
          return this.logs.filter((log) => {
            return log[parameterName] === parameterValue;
          });
        }
        if (parameterValue instanceof RegExp) {
          return this.logs.filter((log) => {
            return parameterValue.test(log[parameterName]);
          });
        }
        throw new InvalidArgumentError(`${parameterName} parameter should be one of string, regexp, undefined or null`);
      };
    }
    function computeUrlWithMaybeSearchParameters(requestInit) {
      try {
        const url = new URL(requestInit.path, requestInit.origin);
        if (url.search.length !== 0) {
          return url;
        }
        url.search = new URLSearchParams(requestInit.query).toString();
        return url;
      } catch (error) {
        throw new InvalidArgumentError("An error occurred when computing MockCallHistoryLog.url", { cause: error });
      }
    }
    var MockCallHistoryLog = class {
      constructor(requestInit = {}) {
        this.body = requestInit.body;
        this.headers = requestInit.headers;
        this.method = requestInit.method;
        const url = computeUrlWithMaybeSearchParameters(requestInit);
        this.fullUrl = url.toString();
        this.origin = url.origin;
        this.path = url.pathname;
        this.searchParams = Object.fromEntries(url.searchParams);
        this.protocol = url.protocol;
        this.host = url.host;
        this.port = url.port;
        this.hash = url.hash;
      }
      toMap() {
        return /* @__PURE__ */ new Map(
          [
            ["protocol", this.protocol],
            ["host", this.host],
            ["port", this.port],
            ["origin", this.origin],
            ["path", this.path],
            ["hash", this.hash],
            ["searchParams", this.searchParams],
            ["fullUrl", this.fullUrl],
            ["method", this.method],
            ["body", this.body],
            ["headers", this.headers]
          ]
        );
      }
      toString() {
        const options = { betweenKeyValueSeparator: "->", betweenPairSeparator: "|" };
        let result = "";
        this.toMap().forEach((value, key) => {
          if (typeof value === "string" || value === void 0 || value === null) {
            result = `${result}${key}${options.betweenKeyValueSeparator}${value}${options.betweenPairSeparator}`;
          }
          if (typeof value === "object" && value !== null || Array.isArray(value)) {
            result = `${result}${key}${options.betweenKeyValueSeparator}${JSON.stringify(value)}${options.betweenPairSeparator}`;
          }
        });
        return result.slice(0, -1);
      }
    };
    var MockCallHistory = class {
      logs = [];
      calls() {
        return this.logs;
      }
      firstCall() {
        return this.logs.at(0);
      }
      lastCall() {
        return this.logs.at(-1);
      }
      nthCall(number) {
        if (typeof number !== "number") {
          throw new InvalidArgumentError("nthCall must be called with a number");
        }
        if (!Number.isInteger(number)) {
          throw new InvalidArgumentError("nthCall must be called with an integer");
        }
        if (Math.sign(number) !== 1) {
          throw new InvalidArgumentError("nthCall must be called with a positive value. use firstCall or lastCall instead");
        }
        return this.logs.at(number - 1);
      }
      filterCalls(criteria, options) {
        if (this.logs.length === 0) {
          return this.logs;
        }
        if (typeof criteria === "function") {
          return this.logs.filter(criteria);
        }
        if (criteria instanceof RegExp) {
          return this.logs.filter((log) => {
            return criteria.test(log.toString());
          });
        }
        if (typeof criteria === "object" && criteria !== null) {
          if (Object.keys(criteria).length === 0) {
            return this.logs;
          }
          const finalOptions = { operator: "OR", ...buildAndValidateFilterCallsOptions(options) };
          let maybeDuplicatedLogsFiltered = [];
          if ("protocol" in criteria) {
            maybeDuplicatedLogsFiltered = handleFilterCallsWithOptions(criteria.protocol, finalOptions, this.filterCallsByProtocol, maybeDuplicatedLogsFiltered);
          }
          if ("host" in criteria) {
            maybeDuplicatedLogsFiltered = handleFilterCallsWithOptions(criteria.host, finalOptions, this.filterCallsByHost, maybeDuplicatedLogsFiltered);
          }
          if ("port" in criteria) {
            maybeDuplicatedLogsFiltered = handleFilterCallsWithOptions(criteria.port, finalOptions, this.filterCallsByPort, maybeDuplicatedLogsFiltered);
          }
          if ("origin" in criteria) {
            maybeDuplicatedLogsFiltered = handleFilterCallsWithOptions(criteria.origin, finalOptions, this.filterCallsByOrigin, maybeDuplicatedLogsFiltered);
          }
          if ("path" in criteria) {
            maybeDuplicatedLogsFiltered = handleFilterCallsWithOptions(criteria.path, finalOptions, this.filterCallsByPath, maybeDuplicatedLogsFiltered);
          }
          if ("hash" in criteria) {
            maybeDuplicatedLogsFiltered = handleFilterCallsWithOptions(criteria.hash, finalOptions, this.filterCallsByHash, maybeDuplicatedLogsFiltered);
          }
          if ("fullUrl" in criteria) {
            maybeDuplicatedLogsFiltered = handleFilterCallsWithOptions(criteria.fullUrl, finalOptions, this.filterCallsByFullUrl, maybeDuplicatedLogsFiltered);
          }
          if ("method" in criteria) {
            maybeDuplicatedLogsFiltered = handleFilterCallsWithOptions(criteria.method, finalOptions, this.filterCallsByMethod, maybeDuplicatedLogsFiltered);
          }
          const uniqLogsFiltered = [...new Set(maybeDuplicatedLogsFiltered)];
          return uniqLogsFiltered;
        }
        throw new InvalidArgumentError("criteria parameter should be one of function, regexp, or object");
      }
      filterCallsByProtocol = makeFilterCalls.call(this, "protocol");
      filterCallsByHost = makeFilterCalls.call(this, "host");
      filterCallsByPort = makeFilterCalls.call(this, "port");
      filterCallsByOrigin = makeFilterCalls.call(this, "origin");
      filterCallsByPath = makeFilterCalls.call(this, "path");
      filterCallsByHash = makeFilterCalls.call(this, "hash");
      filterCallsByFullUrl = makeFilterCalls.call(this, "fullUrl");
      filterCallsByMethod = makeFilterCalls.call(this, "method");
      clear() {
        this.logs = [];
      }
      [kMockCallHistoryAddLog](requestInit) {
        const log = new MockCallHistoryLog(requestInit);
        this.logs.push(log);
        return log;
      }
      *[Symbol.iterator]() {
        for (const log of this.calls()) {
          yield log;
        }
      }
    };
    module2.exports.MockCallHistory = MockCallHistory;
    module2.exports.MockCallHistoryLog = MockCallHistoryLog;
  }
});

// node_modules/undici/lib/mock/mock-pool.js
var require_mock_pool = __commonJS({
  "node_modules/undici/lib/mock/mock-pool.js"(exports2, module2) {
    "use strict";
    var { promisify } = require("node:util");
    var Pool = require_pool();
    var { buildMockDispatch } = require_mock_utils();
    var {
      kDispatches,
      kMockAgent,
      kClose,
      kOriginalClose,
      kOrigin,
      kOriginalDispatch,
      kConnected,
      kIgnoreTrailingSlash
    } = require_mock_symbols();
    var { MockInterceptor } = require_mock_interceptor();
    var Symbols = require_symbols();
    var { InvalidArgumentError } = require_errors();
    var MockPool = class extends Pool {
      constructor(origin, opts) {
        if (!opts || !opts.agent || typeof opts.agent.dispatch !== "function") {
          throw new InvalidArgumentError("Argument opts.agent must implement Agent");
        }
        super(origin, opts);
        this[kMockAgent] = opts.agent;
        this[kOrigin] = origin;
        this[kIgnoreTrailingSlash] = opts.ignoreTrailingSlash ?? false;
        this[kDispatches] = [];
        this[kConnected] = 1;
        this[kOriginalDispatch] = this.dispatch;
        this[kOriginalClose] = this.close.bind(this);
        this.dispatch = buildMockDispatch.call(this);
        this.close = this[kClose];
      }
      get [Symbols.kConnected]() {
        return this[kConnected];
      }
      /**
       * Sets up the base interceptor for mocking replies from undici.
       */
      intercept(opts) {
        return new MockInterceptor(
          opts && { ignoreTrailingSlash: this[kIgnoreTrailingSlash], ...opts },
          this[kDispatches]
        );
      }
      cleanMocks() {
        this[kDispatches] = [];
      }
      async [kClose]() {
        await promisify(this[kOriginalClose])();
        this[kConnected] = 0;
        this[kMockAgent][Symbols.kClients].delete(this[kOrigin]);
      }
    };
    module2.exports = MockPool;
  }
});

// node_modules/undici/lib/mock/pending-interceptors-formatter.js
var require_pending_interceptors_formatter = __commonJS({
  "node_modules/undici/lib/mock/pending-interceptors-formatter.js"(exports2, module2) {
    "use strict";
    var { Transform } = require("node:stream");
    var { Console } = require("node:console");
    var PERSISTENT = process.versions.icu ? "\u2705" : "Y ";
    var NOT_PERSISTENT = process.versions.icu ? "\u274C" : "N ";
    module2.exports = class PendingInterceptorsFormatter {
      constructor({ disableColors } = {}) {
        this.transform = new Transform({
          transform(chunk, _enc, cb) {
            cb(null, chunk);
          }
        });
        this.logger = new Console({
          stdout: this.transform,
          inspectOptions: {
            colors: !disableColors && !process.env.CI
          }
        });
      }
      format(pendingInterceptors) {
        const withPrettyHeaders = pendingInterceptors.map(
          ({ method, path, data: { statusCode }, persist, times, timesInvoked, origin }) => ({
            Method: method,
            Origin: origin,
            Path: path,
            "Status code": statusCode,
            Persistent: persist ? PERSISTENT : NOT_PERSISTENT,
            Invocations: timesInvoked,
            Remaining: persist ? Infinity : times - timesInvoked
          })
        );
        this.logger.table(withPrettyHeaders);
        return this.transform.read().toString();
      }
    };
  }
});

// node_modules/undici/lib/mock/mock-agent.js
var require_mock_agent = __commonJS({
  "node_modules/undici/lib/mock/mock-agent.js"(exports2, module2) {
    "use strict";
    var { kClients } = require_symbols();
    var Agent = require_agent();
    var {
      kAgent,
      kMockAgentSet,
      kMockAgentGet,
      kDispatches,
      kIsMockActive,
      kNetConnect,
      kGetNetConnect,
      kOptions,
      kFactory,
      kMockAgentRegisterCallHistory,
      kMockAgentIsCallHistoryEnabled,
      kMockAgentAddCallHistoryLog,
      kMockAgentMockCallHistoryInstance,
      kMockAgentAcceptsNonStandardSearchParameters,
      kMockCallHistoryAddLog
    } = require_mock_symbols();
    var MockClient = require_mock_client();
    var MockPool = require_mock_pool();
    var { matchValue, normalizeSearchParams, buildAndValidateMockOptions } = require_mock_utils();
    var { InvalidArgumentError, UndiciError } = require_errors();
    var Dispatcher = require_dispatcher();
    var PendingInterceptorsFormatter = require_pending_interceptors_formatter();
    var { MockCallHistory } = require_mock_call_history();
    var MockAgent = class extends Dispatcher {
      constructor(opts) {
        super(opts);
        const mockOptions = buildAndValidateMockOptions(opts);
        this[kNetConnect] = true;
        this[kIsMockActive] = true;
        this[kMockAgentIsCallHistoryEnabled] = mockOptions?.enableCallHistory ?? false;
        this[kMockAgentAcceptsNonStandardSearchParameters] = mockOptions?.acceptNonStandardSearchParameters ?? false;
        if (opts?.agent && typeof opts.agent.dispatch !== "function") {
          throw new InvalidArgumentError("Argument opts.agent must implement Agent");
        }
        const agent = opts?.agent ? opts.agent : new Agent(opts);
        this[kAgent] = agent;
        this[kClients] = agent[kClients];
        this[kOptions] = mockOptions;
        if (this[kMockAgentIsCallHistoryEnabled]) {
          this[kMockAgentRegisterCallHistory]();
        }
      }
      get(origin) {
        let dispatcher = this[kMockAgentGet](origin);
        if (!dispatcher) {
          dispatcher = this[kFactory](origin);
          this[kMockAgentSet](origin, dispatcher);
        }
        return dispatcher;
      }
      dispatch(opts, handler) {
        this.get(opts.origin);
        this[kMockAgentAddCallHistoryLog](opts);
        const acceptNonStandardSearchParameters = this[kMockAgentAcceptsNonStandardSearchParameters];
        const dispatchOpts = { ...opts };
        if (acceptNonStandardSearchParameters && dispatchOpts.path) {
          const [path, searchParams] = dispatchOpts.path.split("?");
          const normalizedSearchParams = normalizeSearchParams(searchParams, acceptNonStandardSearchParameters);
          dispatchOpts.path = `${path}?${normalizedSearchParams}`;
        }
        return this[kAgent].dispatch(dispatchOpts, handler);
      }
      async close() {
        this.clearCallHistory();
        await this[kAgent].close();
        this[kClients].clear();
      }
      deactivate() {
        this[kIsMockActive] = false;
      }
      activate() {
        this[kIsMockActive] = true;
      }
      enableNetConnect(matcher) {
        if (typeof matcher === "string" || typeof matcher === "function" || matcher instanceof RegExp) {
          if (Array.isArray(this[kNetConnect])) {
            this[kNetConnect].push(matcher);
          } else {
            this[kNetConnect] = [matcher];
          }
        } else if (typeof matcher === "undefined") {
          this[kNetConnect] = true;
        } else {
          throw new InvalidArgumentError("Unsupported matcher. Must be one of String|Function|RegExp.");
        }
      }
      disableNetConnect() {
        this[kNetConnect] = false;
      }
      enableCallHistory() {
        this[kMockAgentIsCallHistoryEnabled] = true;
        return this;
      }
      disableCallHistory() {
        this[kMockAgentIsCallHistoryEnabled] = false;
        return this;
      }
      getCallHistory() {
        return this[kMockAgentMockCallHistoryInstance];
      }
      clearCallHistory() {
        if (this[kMockAgentMockCallHistoryInstance] !== void 0) {
          this[kMockAgentMockCallHistoryInstance].clear();
        }
      }
      // This is required to bypass issues caused by using global symbols - see:
      // https://github.com/nodejs/undici/issues/1447
      get isMockActive() {
        return this[kIsMockActive];
      }
      [kMockAgentRegisterCallHistory]() {
        if (this[kMockAgentMockCallHistoryInstance] === void 0) {
          this[kMockAgentMockCallHistoryInstance] = new MockCallHistory();
        }
      }
      [kMockAgentAddCallHistoryLog](opts) {
        if (this[kMockAgentIsCallHistoryEnabled]) {
          this[kMockAgentRegisterCallHistory]();
          this[kMockAgentMockCallHistoryInstance][kMockCallHistoryAddLog](opts);
        }
      }
      [kMockAgentSet](origin, dispatcher) {
        this[kClients].set(origin, { count: 0, dispatcher });
      }
      [kFactory](origin) {
        const mockOptions = Object.assign({ agent: this }, this[kOptions]);
        return this[kOptions] && this[kOptions].connections === 1 ? new MockClient(origin, mockOptions) : new MockPool(origin, mockOptions);
      }
      [kMockAgentGet](origin) {
        const result = this[kClients].get(origin);
        if (result?.dispatcher) {
          return result.dispatcher;
        }
        if (typeof origin !== "string") {
          const dispatcher = this[kFactory]("http://localhost:9999");
          this[kMockAgentSet](origin, dispatcher);
          return dispatcher;
        }
        for (const [keyMatcher, result2] of Array.from(this[kClients])) {
          if (result2 && typeof keyMatcher !== "string" && matchValue(keyMatcher, origin)) {
            const dispatcher = this[kFactory](origin);
            this[kMockAgentSet](origin, dispatcher);
            dispatcher[kDispatches] = result2.dispatcher[kDispatches];
            return dispatcher;
          }
        }
      }
      [kGetNetConnect]() {
        return this[kNetConnect];
      }
      pendingInterceptors() {
        const mockAgentClients = this[kClients];
        return Array.from(mockAgentClients.entries()).flatMap(([origin, result]) => result.dispatcher[kDispatches].map((dispatch) => ({ ...dispatch, origin }))).filter(({ pending }) => pending);
      }
      assertNoPendingInterceptors({ pendingInterceptorsFormatter = new PendingInterceptorsFormatter() } = {}) {
        const pending = this.pendingInterceptors();
        if (pending.length === 0) {
          return;
        }
        throw new UndiciError(
          pending.length === 1 ? `1 interceptor is pending:

${pendingInterceptorsFormatter.format(pending)}`.trim() : `${pending.length} interceptors are pending:

${pendingInterceptorsFormatter.format(pending)}`.trim()
        );
      }
    };
    module2.exports = MockAgent;
  }
});

// node_modules/undici/lib/global.js
var require_global2 = __commonJS({
  "node_modules/undici/lib/global.js"(exports2, module2) {
    "use strict";
    var globalDispatcher = Symbol.for("undici.globalDispatcher.1");
    var { InvalidArgumentError } = require_errors();
    var Agent = require_agent();
    if (getGlobalDispatcher() === void 0) {
      setGlobalDispatcher(new Agent());
    }
    function setGlobalDispatcher(agent) {
      if (!agent || typeof agent.dispatch !== "function") {
        throw new InvalidArgumentError("Argument agent must implement Agent");
      }
      Object.defineProperty(globalThis, globalDispatcher, {
        value: agent,
        writable: true,
        enumerable: false,
        configurable: false
      });
    }
    function getGlobalDispatcher() {
      return globalThis[globalDispatcher];
    }
    module2.exports = {
      setGlobalDispatcher,
      getGlobalDispatcher
    };
  }
});

// node_modules/undici/lib/handler/decorator-handler.js
var require_decorator_handler = __commonJS({
  "node_modules/undici/lib/handler/decorator-handler.js"(exports2, module2) {
    "use strict";
    var assert = require("node:assert");
    var WrapHandler = require_wrap_handler();
    module2.exports = class DecoratorHandler {
      #handler;
      #onCompleteCalled = false;
      #onErrorCalled = false;
      #onResponseStartCalled = false;
      constructor(handler) {
        if (typeof handler !== "object" || handler === null) {
          throw new TypeError("handler must be an object");
        }
        this.#handler = WrapHandler.wrap(handler);
      }
      onRequestStart(...args) {
        this.#handler.onRequestStart?.(...args);
      }
      onRequestUpgrade(...args) {
        assert(!this.#onCompleteCalled);
        assert(!this.#onErrorCalled);
        return this.#handler.onRequestUpgrade?.(...args);
      }
      onResponseStart(...args) {
        assert(!this.#onCompleteCalled);
        assert(!this.#onErrorCalled);
        assert(!this.#onResponseStartCalled);
        this.#onResponseStartCalled = true;
        return this.#handler.onResponseStart?.(...args);
      }
      onResponseData(...args) {
        assert(!this.#onCompleteCalled);
        assert(!this.#onErrorCalled);
        return this.#handler.onResponseData?.(...args);
      }
      onResponseEnd(...args) {
        assert(!this.#onCompleteCalled);
        assert(!this.#onErrorCalled);
        this.#onCompleteCalled = true;
        return this.#handler.onResponseEnd?.(...args);
      }
      onResponseError(...args) {
        this.#onErrorCalled = true;
        return this.#handler.onResponseError?.(...args);
      }
      /**
       * @deprecated
       */
      onBodySent() {
      }
    };
  }
});

// node_modules/undici/lib/handler/redirect-handler.js
var require_redirect_handler = __commonJS({
  "node_modules/undici/lib/handler/redirect-handler.js"(exports2, module2) {
    "use strict";
    var util = require_util();
    var { kBodyUsed } = require_symbols();
    var assert = require("node:assert");
    var { InvalidArgumentError } = require_errors();
    var EE = require("node:events");
    var redirectableStatusCodes = [300, 301, 302, 303, 307, 308];
    var kBody = Symbol("body");
    var noop = () => {
    };
    var BodyAsyncIterable = class {
      constructor(body) {
        this[kBody] = body;
        this[kBodyUsed] = false;
      }
      async *[Symbol.asyncIterator]() {
        assert(!this[kBodyUsed], "disturbed");
        this[kBodyUsed] = true;
        yield* this[kBody];
      }
    };
    var RedirectHandler = class _RedirectHandler {
      static buildDispatch(dispatcher, maxRedirections) {
        if (maxRedirections != null && (!Number.isInteger(maxRedirections) || maxRedirections < 0)) {
          throw new InvalidArgumentError("maxRedirections must be a positive number");
        }
        const dispatch = dispatcher.dispatch.bind(dispatcher);
        return (opts, originalHandler) => dispatch(opts, new _RedirectHandler(dispatch, maxRedirections, opts, originalHandler));
      }
      constructor(dispatch, maxRedirections, opts, handler) {
        if (maxRedirections != null && (!Number.isInteger(maxRedirections) || maxRedirections < 0)) {
          throw new InvalidArgumentError("maxRedirections must be a positive number");
        }
        this.dispatch = dispatch;
        this.location = null;
        this.opts = { ...opts, maxRedirections: 0 };
        this.maxRedirections = maxRedirections;
        this.handler = handler;
        this.history = [];
        if (util.isStream(this.opts.body)) {
          if (util.bodyLength(this.opts.body) === 0) {
            this.opts.body.on("data", function() {
              assert(false);
            });
          }
          if (typeof this.opts.body.readableDidRead !== "boolean") {
            this.opts.body[kBodyUsed] = false;
            EE.prototype.on.call(this.opts.body, "data", function() {
              this[kBodyUsed] = true;
            });
          }
        } else if (this.opts.body && typeof this.opts.body.pipeTo === "function") {
          this.opts.body = new BodyAsyncIterable(this.opts.body);
        } else if (this.opts.body && typeof this.opts.body !== "string" && !ArrayBuffer.isView(this.opts.body) && util.isIterable(this.opts.body) && !util.isFormDataLike(this.opts.body)) {
          this.opts.body = new BodyAsyncIterable(this.opts.body);
        }
      }
      onRequestStart(controller, context) {
        this.handler.onRequestStart?.(controller, { ...context, history: this.history });
      }
      onRequestUpgrade(controller, statusCode, headers, socket) {
        this.handler.onRequestUpgrade?.(controller, statusCode, headers, socket);
      }
      onResponseStart(controller, statusCode, headers, statusMessage) {
        if (this.opts.throwOnMaxRedirect && this.history.length >= this.maxRedirections) {
          throw new Error("max redirects");
        }
        if ((statusCode === 301 || statusCode === 302) && this.opts.method === "POST") {
          this.opts.method = "GET";
          if (util.isStream(this.opts.body)) {
            util.destroy(this.opts.body.on("error", noop));
          }
          this.opts.body = null;
        }
        if (statusCode === 303 && this.opts.method !== "HEAD") {
          this.opts.method = "GET";
          if (util.isStream(this.opts.body)) {
            util.destroy(this.opts.body.on("error", noop));
          }
          this.opts.body = null;
        }
        this.location = this.history.length >= this.maxRedirections || util.isDisturbed(this.opts.body) || redirectableStatusCodes.indexOf(statusCode) === -1 ? null : headers.location;
        if (this.opts.origin) {
          this.history.push(new URL(this.opts.path, this.opts.origin));
        }
        if (!this.location) {
          this.handler.onResponseStart?.(controller, statusCode, headers, statusMessage);
          return;
        }
        const { origin, pathname, search } = util.parseURL(new URL(this.location, this.opts.origin && new URL(this.opts.path, this.opts.origin)));
        const path = search ? `${pathname}${search}` : pathname;
        this.opts.headers = cleanRequestHeaders(this.opts.headers, statusCode === 303, this.opts.origin !== origin);
        this.opts.path = path;
        this.opts.origin = origin;
        this.opts.maxRedirections = 0;
        this.opts.query = null;
      }
      onResponseData(controller, chunk) {
        if (this.location) {
        } else {
          this.handler.onResponseData?.(controller, chunk);
        }
      }
      onResponseEnd(controller, trailers) {
        if (this.location) {
          this.dispatch(this.opts, this);
        } else {
          this.handler.onResponseEnd(controller, trailers);
        }
      }
      onResponseError(controller, error) {
        this.handler.onResponseError?.(controller, error);
      }
    };
    function shouldRemoveHeader(header, removeContent, unknownOrigin) {
      if (header.length === 4) {
        return util.headerNameToString(header) === "host";
      }
      if (removeContent && util.headerNameToString(header).startsWith("content-")) {
        return true;
      }
      if (unknownOrigin && (header.length === 13 || header.length === 6 || header.length === 19)) {
        const name = util.headerNameToString(header);
        return name === "authorization" || name === "cookie" || name === "proxy-authorization";
      }
      return false;
    }
    function cleanRequestHeaders(headers, removeContent, unknownOrigin) {
      const ret = [];
      if (Array.isArray(headers)) {
        for (let i = 0; i < headers.length; i += 2) {
          if (!shouldRemoveHeader(headers[i], removeContent, unknownOrigin)) {
            ret.push(headers[i], headers[i + 1]);
          }
        }
      } else if (headers && typeof headers === "object") {
        const entries = typeof headers[Symbol.iterator] === "function" ? headers : Object.entries(headers);
        for (const [key, value] of entries) {
          if (!shouldRemoveHeader(key, removeContent, unknownOrigin)) {
            ret.push(key, value);
          }
        }
      } else {
        assert(headers == null, "headers must be an object or an array");
      }
      return ret;
    }
    module2.exports = RedirectHandler;
  }
});

// node_modules/undici/lib/interceptor/redirect.js
var require_redirect = __commonJS({
  "node_modules/undici/lib/interceptor/redirect.js"(exports2, module2) {
    "use strict";
    var RedirectHandler = require_redirect_handler();
    function createRedirectInterceptor({ maxRedirections: defaultMaxRedirections } = {}) {
      return (dispatch) => {
        return function Intercept(opts, handler) {
          const { maxRedirections = defaultMaxRedirections, ...rest } = opts;
          if (maxRedirections == null || maxRedirections === 0) {
            return dispatch(opts, handler);
          }
          const dispatchOpts = { ...rest, maxRedirections: 0 };
          const redirectHandler = new RedirectHandler(dispatch, maxRedirections, dispatchOpts, handler);
          return dispatch(dispatchOpts, redirectHandler);
        };
      };
    }
    module2.exports = createRedirectInterceptor;
  }
});

// node_modules/undici/lib/interceptor/response-error.js
var require_response_error = __commonJS({
  "node_modules/undici/lib/interceptor/response-error.js"(exports2, module2) {
    "use strict";
    var DecoratorHandler = require_decorator_handler();
    var { ResponseError } = require_errors();
    var ResponseErrorHandler = class extends DecoratorHandler {
      #statusCode;
      #contentType;
      #decoder;
      #headers;
      #body;
      constructor(_opts, { handler }) {
        super(handler);
      }
      #checkContentType(contentType) {
        return (this.#contentType ?? "").indexOf(contentType) === 0;
      }
      onRequestStart(controller, context) {
        this.#statusCode = 0;
        this.#contentType = null;
        this.#decoder = null;
        this.#headers = null;
        this.#body = "";
        return super.onRequestStart(controller, context);
      }
      onResponseStart(controller, statusCode, headers, statusMessage) {
        this.#statusCode = statusCode;
        this.#headers = headers;
        this.#contentType = headers["content-type"];
        if (this.#statusCode < 400) {
          return super.onResponseStart(controller, statusCode, headers, statusMessage);
        }
        if (this.#checkContentType("application/json") || this.#checkContentType("text/plain")) {
          this.#decoder = new TextDecoder("utf-8");
        }
      }
      onResponseData(controller, chunk) {
        if (this.#statusCode < 400) {
          return super.onResponseData(controller, chunk);
        }
        this.#body += this.#decoder?.decode(chunk, { stream: true }) ?? "";
      }
      onResponseEnd(controller, trailers) {
        if (this.#statusCode >= 400) {
          this.#body += this.#decoder?.decode(void 0, { stream: false }) ?? "";
          if (this.#checkContentType("application/json")) {
            try {
              this.#body = JSON.parse(this.#body);
            } catch {
            }
          }
          let err;
          const stackTraceLimit = Error.stackTraceLimit;
          Error.stackTraceLimit = 0;
          try {
            err = new ResponseError("Response Error", this.#statusCode, {
              body: this.#body,
              headers: this.#headers
            });
          } finally {
            Error.stackTraceLimit = stackTraceLimit;
          }
          super.onResponseError(controller, err);
        } else {
          super.onResponseEnd(controller, trailers);
        }
      }
      onResponseError(controller, err) {
        super.onResponseError(controller, err);
      }
    };
    module2.exports = () => {
      return (dispatch) => {
        return function Intercept(opts, handler) {
          return dispatch(opts, new ResponseErrorHandler(opts, { handler }));
        };
      };
    };
  }
});

// node_modules/undici/lib/interceptor/retry.js
var require_retry = __commonJS({
  "node_modules/undici/lib/interceptor/retry.js"(exports2, module2) {
    "use strict";
    var RetryHandler = require_retry_handler();
    module2.exports = (globalOpts) => {
      return (dispatch) => {
        return function retryInterceptor(opts, handler) {
          return dispatch(
            opts,
            new RetryHandler(
              { ...opts, retryOptions: { ...globalOpts, ...opts.retryOptions } },
              {
                handler,
                dispatch
              }
            )
          );
        };
      };
    };
  }
});

// node_modules/undici/lib/interceptor/dump.js
var require_dump = __commonJS({
  "node_modules/undici/lib/interceptor/dump.js"(exports2, module2) {
    "use strict";
    var { InvalidArgumentError, RequestAbortedError } = require_errors();
    var DecoratorHandler = require_decorator_handler();
    var DumpHandler = class extends DecoratorHandler {
      #maxSize = 1024 * 1024;
      #dumped = false;
      #size = 0;
      #controller = null;
      aborted = false;
      reason = false;
      constructor({ maxSize, signal }, handler) {
        if (maxSize != null && (!Number.isFinite(maxSize) || maxSize < 1)) {
          throw new InvalidArgumentError("maxSize must be a number greater than 0");
        }
        super(handler);
        this.#maxSize = maxSize ?? this.#maxSize;
      }
      #abort(reason) {
        this.aborted = true;
        this.reason = reason;
      }
      onRequestStart(controller, context) {
        controller.abort = this.#abort.bind(this);
        this.#controller = controller;
        return super.onRequestStart(controller, context);
      }
      onResponseStart(controller, statusCode, headers, statusMessage) {
        const contentLength = headers["content-length"];
        if (contentLength != null && contentLength > this.#maxSize) {
          throw new RequestAbortedError(
            `Response size (${contentLength}) larger than maxSize (${this.#maxSize})`
          );
        }
        if (this.aborted === true) {
          return true;
        }
        return super.onResponseStart(controller, statusCode, headers, statusMessage);
      }
      onResponseError(controller, err) {
        if (this.#dumped) {
          return;
        }
        err = this.#controller.reason ?? err;
        super.onResponseError(controller, err);
      }
      onResponseData(controller, chunk) {
        this.#size = this.#size + chunk.length;
        if (this.#size >= this.#maxSize) {
          this.#dumped = true;
          if (this.aborted === true) {
            super.onResponseError(controller, this.reason);
          } else {
            super.onResponseEnd(controller, {});
          }
        }
        return true;
      }
      onResponseEnd(controller, trailers) {
        if (this.#dumped) {
          return;
        }
        if (this.#controller.aborted === true) {
          super.onResponseError(controller, this.reason);
          return;
        }
        super.onResponseEnd(controller, trailers);
      }
    };
    function createDumpInterceptor({ maxSize: defaultMaxSize } = {
      maxSize: 1024 * 1024
    }) {
      return (dispatch) => {
        return function Intercept(opts, handler) {
          const { dumpMaxSize = defaultMaxSize } = opts;
          const dumpHandler = new DumpHandler({ maxSize: dumpMaxSize, signal: opts.signal }, handler);
          return dispatch(opts, dumpHandler);
        };
      };
    }
    module2.exports = createDumpInterceptor;
  }
});

// node_modules/undici/lib/interceptor/dns.js
var require_dns = __commonJS({
  "node_modules/undici/lib/interceptor/dns.js"(exports2, module2) {
    "use strict";
    var { isIP } = require("node:net");
    var { lookup } = require("node:dns");
    var DecoratorHandler = require_decorator_handler();
    var { InvalidArgumentError, InformationalError } = require_errors();
    var maxInt = Math.pow(2, 31) - 1;
    var DNSInstance = class {
      #maxTTL = 0;
      #maxItems = 0;
      #records = /* @__PURE__ */ new Map();
      dualStack = true;
      affinity = null;
      lookup = null;
      pick = null;
      constructor(opts) {
        this.#maxTTL = opts.maxTTL;
        this.#maxItems = opts.maxItems;
        this.dualStack = opts.dualStack;
        this.affinity = opts.affinity;
        this.lookup = opts.lookup ?? this.#defaultLookup;
        this.pick = opts.pick ?? this.#defaultPick;
      }
      get full() {
        return this.#records.size === this.#maxItems;
      }
      runLookup(origin, opts, cb) {
        const ips = this.#records.get(origin.hostname);
        if (ips == null && this.full) {
          cb(null, origin);
          return;
        }
        const newOpts = {
          affinity: this.affinity,
          dualStack: this.dualStack,
          lookup: this.lookup,
          pick: this.pick,
          ...opts.dns,
          maxTTL: this.#maxTTL,
          maxItems: this.#maxItems
        };
        if (ips == null) {
          this.lookup(origin, newOpts, (err, addresses) => {
            if (err || addresses == null || addresses.length === 0) {
              cb(err ?? new InformationalError("No DNS entries found"));
              return;
            }
            this.setRecords(origin, addresses);
            const records = this.#records.get(origin.hostname);
            const ip = this.pick(
              origin,
              records,
              newOpts.affinity
            );
            let port;
            if (typeof ip.port === "number") {
              port = `:${ip.port}`;
            } else if (origin.port !== "") {
              port = `:${origin.port}`;
            } else {
              port = "";
            }
            cb(
              null,
              new URL(`${origin.protocol}//${ip.family === 6 ? `[${ip.address}]` : ip.address}${port}`)
            );
          });
        } else {
          const ip = this.pick(
            origin,
            ips,
            newOpts.affinity
          );
          if (ip == null) {
            this.#records.delete(origin.hostname);
            this.runLookup(origin, opts, cb);
            return;
          }
          let port;
          if (typeof ip.port === "number") {
            port = `:${ip.port}`;
          } else if (origin.port !== "") {
            port = `:${origin.port}`;
          } else {
            port = "";
          }
          cb(
            null,
            new URL(`${origin.protocol}//${ip.family === 6 ? `[${ip.address}]` : ip.address}${port}`)
          );
        }
      }
      #defaultLookup(origin, opts, cb) {
        lookup(
          origin.hostname,
          {
            all: true,
            family: this.dualStack === false ? this.affinity : 0,
            order: "ipv4first"
          },
          (err, addresses) => {
            if (err) {
              return cb(err);
            }
            const results = /* @__PURE__ */ new Map();
            for (const addr of addresses) {
              results.set(`${addr.address}:${addr.family}`, addr);
            }
            cb(null, results.values());
          }
        );
      }
      #defaultPick(origin, hostnameRecords, affinity) {
        let ip = null;
        const { records, offset } = hostnameRecords;
        let family;
        if (this.dualStack) {
          if (affinity == null) {
            if (offset == null || offset === maxInt) {
              hostnameRecords.offset = 0;
              affinity = 4;
            } else {
              hostnameRecords.offset++;
              affinity = (hostnameRecords.offset & 1) === 1 ? 6 : 4;
            }
          }
          if (records[affinity] != null && records[affinity].ips.length > 0) {
            family = records[affinity];
          } else {
            family = records[affinity === 4 ? 6 : 4];
          }
        } else {
          family = records[affinity];
        }
        if (family == null || family.ips.length === 0) {
          return ip;
        }
        if (family.offset == null || family.offset === maxInt) {
          family.offset = 0;
        } else {
          family.offset++;
        }
        const position = family.offset % family.ips.length;
        ip = family.ips[position] ?? null;
        if (ip == null) {
          return ip;
        }
        if (Date.now() - ip.timestamp > ip.ttl) {
          family.ips.splice(position, 1);
          return this.pick(origin, hostnameRecords, affinity);
        }
        return ip;
      }
      pickFamily(origin, ipFamily) {
        const records = this.#records.get(origin.hostname)?.records;
        if (!records) {
          return null;
        }
        const family = records[ipFamily];
        if (!family) {
          return null;
        }
        if (family.offset == null || family.offset === maxInt) {
          family.offset = 0;
        } else {
          family.offset++;
        }
        const position = family.offset % family.ips.length;
        const ip = family.ips[position] ?? null;
        if (ip == null) {
          return ip;
        }
        if (Date.now() - ip.timestamp > ip.ttl) {
          family.ips.splice(position, 1);
        }
        return ip;
      }
      setRecords(origin, addresses) {
        const timestamp = Date.now();
        const records = { records: { 4: null, 6: null } };
        for (const record of addresses) {
          record.timestamp = timestamp;
          if (typeof record.ttl === "number") {
            record.ttl = Math.min(record.ttl, this.#maxTTL);
          } else {
            record.ttl = this.#maxTTL;
          }
          const familyRecords = records.records[record.family] ?? { ips: [] };
          familyRecords.ips.push(record);
          records.records[record.family] = familyRecords;
        }
        this.#records.set(origin.hostname, records);
      }
      deleteRecords(origin) {
        this.#records.delete(origin.hostname);
      }
      getHandler(meta, opts) {
        return new DNSDispatchHandler(this, meta, opts);
      }
    };
    var DNSDispatchHandler = class extends DecoratorHandler {
      #state = null;
      #opts = null;
      #dispatch = null;
      #origin = null;
      #controller = null;
      #newOrigin = null;
      #firstTry = true;
      constructor(state, { origin, handler, dispatch, newOrigin }, opts) {
        super(handler);
        this.#origin = origin;
        this.#newOrigin = newOrigin;
        this.#opts = { ...opts };
        this.#state = state;
        this.#dispatch = dispatch;
      }
      onResponseError(controller, err) {
        switch (err.code) {
          case "ETIMEDOUT":
          case "ECONNREFUSED": {
            if (this.#state.dualStack) {
              if (!this.#firstTry) {
                super.onResponseError(controller, err);
                return;
              }
              this.#firstTry = false;
              const otherFamily = this.#newOrigin.hostname[0] === "[" ? 4 : 6;
              const ip = this.#state.pickFamily(this.#origin, otherFamily);
              if (ip == null) {
                super.onResponseError(controller, err);
                return;
              }
              let port;
              if (typeof ip.port === "number") {
                port = `:${ip.port}`;
              } else if (this.#origin.port !== "") {
                port = `:${this.#origin.port}`;
              } else {
                port = "";
              }
              const dispatchOpts = {
                ...this.#opts,
                origin: `${this.#origin.protocol}//${ip.family === 6 ? `[${ip.address}]` : ip.address}${port}`
              };
              this.#dispatch(dispatchOpts, this);
              return;
            }
            super.onResponseError(controller, err);
            break;
          }
          case "ENOTFOUND":
            this.#state.deleteRecords(this.#origin);
            super.onResponseError(controller, err);
            break;
          default:
            super.onResponseError(controller, err);
            break;
        }
      }
    };
    module2.exports = (interceptorOpts) => {
      if (interceptorOpts?.maxTTL != null && (typeof interceptorOpts?.maxTTL !== "number" || interceptorOpts?.maxTTL < 0)) {
        throw new InvalidArgumentError("Invalid maxTTL. Must be a positive number");
      }
      if (interceptorOpts?.maxItems != null && (typeof interceptorOpts?.maxItems !== "number" || interceptorOpts?.maxItems < 1)) {
        throw new InvalidArgumentError(
          "Invalid maxItems. Must be a positive number and greater than zero"
        );
      }
      if (interceptorOpts?.affinity != null && interceptorOpts?.affinity !== 4 && interceptorOpts?.affinity !== 6) {
        throw new InvalidArgumentError("Invalid affinity. Must be either 4 or 6");
      }
      if (interceptorOpts?.dualStack != null && typeof interceptorOpts?.dualStack !== "boolean") {
        throw new InvalidArgumentError("Invalid dualStack. Must be a boolean");
      }
      if (interceptorOpts?.lookup != null && typeof interceptorOpts?.lookup !== "function") {
        throw new InvalidArgumentError("Invalid lookup. Must be a function");
      }
      if (interceptorOpts?.pick != null && typeof interceptorOpts?.pick !== "function") {
        throw new InvalidArgumentError("Invalid pick. Must be a function");
      }
      const dualStack = interceptorOpts?.dualStack ?? true;
      let affinity;
      if (dualStack) {
        affinity = interceptorOpts?.affinity ?? null;
      } else {
        affinity = interceptorOpts?.affinity ?? 4;
      }
      const opts = {
        maxTTL: interceptorOpts?.maxTTL ?? 1e4,
        // Expressed in ms
        lookup: interceptorOpts?.lookup ?? null,
        pick: interceptorOpts?.pick ?? null,
        dualStack,
        affinity,
        maxItems: interceptorOpts?.maxItems ?? Infinity
      };
      const instance = new DNSInstance(opts);
      return (dispatch) => {
        return function dnsInterceptor(origDispatchOpts, handler) {
          const origin = origDispatchOpts.origin.constructor === URL ? origDispatchOpts.origin : new URL(origDispatchOpts.origin);
          if (isIP(origin.hostname) !== 0) {
            return dispatch(origDispatchOpts, handler);
          }
          instance.runLookup(origin, origDispatchOpts, (err, newOrigin) => {
            if (err) {
              return handler.onResponseError(null, err);
            }
            const dispatchOpts = {
              ...origDispatchOpts,
              servername: origin.hostname,
              // For SNI on TLS
              origin: newOrigin.origin,
              headers: {
                host: origin.host,
                ...origDispatchOpts.headers
              }
            };
            dispatch(
              dispatchOpts,
              instance.getHandler(
                { origin, dispatch, handler, newOrigin },
                origDispatchOpts
              )
            );
          });
          return true;
        };
      };
    };
  }
});

// node_modules/undici/lib/util/cache.js
var require_cache = __commonJS({
  "node_modules/undici/lib/util/cache.js"(exports2, module2) {
    "use strict";
    var {
      safeHTTPMethods
    } = require_util();
    var { serializePathWithQuery } = require_util();
    function makeCacheKey(opts) {
      if (!opts.origin) {
        throw new Error("opts.origin is undefined");
      }
      let fullPath;
      try {
        fullPath = serializePathWithQuery(opts.path || "/", opts.query);
      } catch (error) {
        fullPath = opts.path || "/";
      }
      return {
        origin: opts.origin.toString(),
        method: opts.method,
        path: fullPath,
        headers: opts.headers
      };
    }
    function normaliseHeaders(opts) {
      let headers;
      if (opts.headers == null) {
        headers = {};
      } else if (typeof opts.headers[Symbol.iterator] === "function") {
        headers = {};
        for (const x of opts.headers) {
          if (!Array.isArray(x)) {
            throw new Error("opts.headers is not a valid header map");
          }
          const [key, val] = x;
          if (typeof key !== "string" || typeof val !== "string") {
            throw new Error("opts.headers is not a valid header map");
          }
          headers[key.toLowerCase()] = val;
        }
      } else if (typeof opts.headers === "object") {
        headers = {};
        for (const key of Object.keys(opts.headers)) {
          headers[key.toLowerCase()] = opts.headers[key];
        }
      } else {
        throw new Error("opts.headers is not an object");
      }
      return headers;
    }
    function assertCacheKey(key) {
      if (typeof key !== "object") {
        throw new TypeError(`expected key to be object, got ${typeof key}`);
      }
      for (const property of ["origin", "method", "path"]) {
        if (typeof key[property] !== "string") {
          throw new TypeError(`expected key.${property} to be string, got ${typeof key[property]}`);
        }
      }
      if (key.headers !== void 0 && typeof key.headers !== "object") {
        throw new TypeError(`expected headers to be object, got ${typeof key}`);
      }
    }
    function assertCacheValue(value) {
      if (typeof value !== "object") {
        throw new TypeError(`expected value to be object, got ${typeof value}`);
      }
      for (const property of ["statusCode", "cachedAt", "staleAt", "deleteAt"]) {
        if (typeof value[property] !== "number") {
          throw new TypeError(`expected value.${property} to be number, got ${typeof value[property]}`);
        }
      }
      if (typeof value.statusMessage !== "string") {
        throw new TypeError(`expected value.statusMessage to be string, got ${typeof value.statusMessage}`);
      }
      if (value.headers != null && typeof value.headers !== "object") {
        throw new TypeError(`expected value.rawHeaders to be object, got ${typeof value.headers}`);
      }
      if (value.vary !== void 0 && typeof value.vary !== "object") {
        throw new TypeError(`expected value.vary to be object, got ${typeof value.vary}`);
      }
      if (value.etag !== void 0 && typeof value.etag !== "string") {
        throw new TypeError(`expected value.etag to be string, got ${typeof value.etag}`);
      }
    }
    function parseCacheControlHeader(header) {
      const output = {};
      let directives;
      if (Array.isArray(header)) {
        directives = [];
        for (const directive of header) {
          directives.push(...directive.split(","));
        }
      } else {
        directives = header.split(",");
      }
      for (let i = 0; i < directives.length; i++) {
        const directive = directives[i].toLowerCase();
        const keyValueDelimiter = directive.indexOf("=");
        let key;
        let value;
        if (keyValueDelimiter !== -1) {
          key = directive.substring(0, keyValueDelimiter).trimStart();
          value = directive.substring(keyValueDelimiter + 1);
        } else {
          key = directive.trim();
        }
        switch (key) {
          case "min-fresh":
          case "max-stale":
          case "max-age":
          case "s-maxage":
          case "stale-while-revalidate":
          case "stale-if-error": {
            if (value === void 0 || value[0] === " ") {
              continue;
            }
            if (value.length >= 2 && value[0] === '"' && value[value.length - 1] === '"') {
              value = value.substring(1, value.length - 1);
            }
            const parsedValue = parseInt(value, 10);
            if (parsedValue !== parsedValue) {
              continue;
            }
            if (key === "max-age" && key in output && output[key] >= parsedValue) {
              continue;
            }
            output[key] = parsedValue;
            break;
          }
          case "private":
          case "no-cache": {
            if (value) {
              if (value[0] === '"') {
                const headers = [value.substring(1)];
                let foundEndingQuote = value[value.length - 1] === '"';
                if (!foundEndingQuote) {
                  for (let j = i + 1; j < directives.length; j++) {
                    const nextPart = directives[j];
                    const nextPartLength = nextPart.length;
                    headers.push(nextPart.trim());
                    if (nextPartLength !== 0 && nextPart[nextPartLength - 1] === '"') {
                      foundEndingQuote = true;
                      break;
                    }
                  }
                }
                if (foundEndingQuote) {
                  let lastHeader = headers[headers.length - 1];
                  if (lastHeader[lastHeader.length - 1] === '"') {
                    lastHeader = lastHeader.substring(0, lastHeader.length - 1);
                    headers[headers.length - 1] = lastHeader;
                  }
                  if (key in output) {
                    output[key] = output[key].concat(headers);
                  } else {
                    output[key] = headers;
                  }
                }
              } else {
                if (key in output) {
                  output[key] = output[key].concat(value);
                } else {
                  output[key] = [value];
                }
              }
              break;
            }
          }
          // eslint-disable-next-line no-fallthrough
          case "public":
          case "no-store":
          case "must-revalidate":
          case "proxy-revalidate":
          case "immutable":
          case "no-transform":
          case "must-understand":
          case "only-if-cached":
            if (value) {
              continue;
            }
            output[key] = true;
            break;
          default:
            continue;
        }
      }
      return output;
    }
    function parseVaryHeader(varyHeader, headers) {
      if (typeof varyHeader === "string" && varyHeader.includes("*")) {
        return headers;
      }
      const output = (
        /** @type {Record<string, string | string[] | null>} */
        {}
      );
      const varyingHeaders = typeof varyHeader === "string" ? varyHeader.split(",") : varyHeader;
      for (const header of varyingHeaders) {
        const trimmedHeader = header.trim().toLowerCase();
        output[trimmedHeader] = headers[trimmedHeader] ?? null;
      }
      return output;
    }
    function isEtagUsable(etag) {
      if (etag.length <= 2) {
        return false;
      }
      if (etag[0] === '"' && etag[etag.length - 1] === '"') {
        return !(etag[1] === '"' || etag.startsWith('"W/'));
      }
      if (etag.startsWith('W/"') && etag[etag.length - 1] === '"') {
        return etag.length !== 4;
      }
      return false;
    }
    function assertCacheStore(store, name = "CacheStore") {
      if (typeof store !== "object" || store === null) {
        throw new TypeError(`expected type of ${name} to be a CacheStore, got ${store === null ? "null" : typeof store}`);
      }
      for (const fn of ["get", "createWriteStream", "delete"]) {
        if (typeof store[fn] !== "function") {
          throw new TypeError(`${name} needs to have a \`${fn}()\` function`);
        }
      }
    }
    function assertCacheMethods(methods, name = "CacheMethods") {
      if (!Array.isArray(methods)) {
        throw new TypeError(`expected type of ${name} needs to be an array, got ${methods === null ? "null" : typeof methods}`);
      }
      if (methods.length === 0) {
        throw new TypeError(`${name} needs to have at least one method`);
      }
      for (const method of methods) {
        if (!safeHTTPMethods.includes(method)) {
          throw new TypeError(`element of ${name}-array needs to be one of following values: ${safeHTTPMethods.join(", ")}, got ${method}`);
        }
      }
    }
    module2.exports = {
      makeCacheKey,
      normaliseHeaders,
      assertCacheKey,
      assertCacheValue,
      parseCacheControlHeader,
      parseVaryHeader,
      isEtagUsable,
      assertCacheMethods,
      assertCacheStore
    };
  }
});

// node_modules/undici/lib/util/date.js
var require_date = __commonJS({
  "node_modules/undici/lib/util/date.js"(exports2, module2) {
    "use strict";
    var IMF_DAYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
    var IMF_SPACES = [4, 7, 11, 16, 25];
    var IMF_MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
    var IMF_COLONS = [19, 22];
    var ASCTIME_SPACES = [3, 7, 10, 19];
    var RFC850_DAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
    function parseHttpDate(date, now) {
      date = date.toLowerCase();
      switch (date[3]) {
        case ",":
          return parseImfDate(date);
        case " ":
          return parseAscTimeDate(date);
        default:
          return parseRfc850Date(date, now);
      }
    }
    function parseImfDate(date) {
      if (date.length !== 29) {
        return void 0;
      }
      if (!date.endsWith("gmt")) {
        return void 0;
      }
      for (const spaceInx of IMF_SPACES) {
        if (date[spaceInx] !== " ") {
          return void 0;
        }
      }
      for (const colonIdx of IMF_COLONS) {
        if (date[colonIdx] !== ":") {
          return void 0;
        }
      }
      const dayName = date.substring(0, 3);
      if (!IMF_DAYS.includes(dayName)) {
        return void 0;
      }
      const dayString = date.substring(5, 7);
      const day = Number.parseInt(dayString);
      if (isNaN(day) || day < 10 && dayString[0] !== "0") {
        return void 0;
      }
      const month = date.substring(8, 11);
      const monthIdx = IMF_MONTHS.indexOf(month);
      if (monthIdx === -1) {
        return void 0;
      }
      const year = Number.parseInt(date.substring(12, 16));
      if (isNaN(year)) {
        return void 0;
      }
      const hourString = date.substring(17, 19);
      const hour = Number.parseInt(hourString);
      if (isNaN(hour) || hour < 10 && hourString[0] !== "0") {
        return void 0;
      }
      const minuteString = date.substring(20, 22);
      const minute = Number.parseInt(minuteString);
      if (isNaN(minute) || minute < 10 && minuteString[0] !== "0") {
        return void 0;
      }
      const secondString = date.substring(23, 25);
      const second = Number.parseInt(secondString);
      if (isNaN(second) || second < 10 && secondString[0] !== "0") {
        return void 0;
      }
      return new Date(Date.UTC(year, monthIdx, day, hour, minute, second));
    }
    function parseAscTimeDate(date) {
      if (date.length !== 24) {
        return void 0;
      }
      for (const spaceIdx of ASCTIME_SPACES) {
        if (date[spaceIdx] !== " ") {
          return void 0;
        }
      }
      const dayName = date.substring(0, 3);
      if (!IMF_DAYS.includes(dayName)) {
        return void 0;
      }
      const month = date.substring(4, 7);
      const monthIdx = IMF_MONTHS.indexOf(month);
      if (monthIdx === -1) {
        return void 0;
      }
      const dayString = date.substring(8, 10);
      const day = Number.parseInt(dayString);
      if (isNaN(day) || day < 10 && dayString[0] !== " ") {
        return void 0;
      }
      const hourString = date.substring(11, 13);
      const hour = Number.parseInt(hourString);
      if (isNaN(hour) || hour < 10 && hourString[0] !== "0") {
        return void 0;
      }
      const minuteString = date.substring(14, 16);
      const minute = Number.parseInt(minuteString);
      if (isNaN(minute) || minute < 10 && minuteString[0] !== "0") {
        return void 0;
      }
      const secondString = date.substring(17, 19);
      const second = Number.parseInt(secondString);
      if (isNaN(second) || second < 10 && secondString[0] !== "0") {
        return void 0;
      }
      const year = Number.parseInt(date.substring(20, 24));
      if (isNaN(year)) {
        return void 0;
      }
      return new Date(Date.UTC(year, monthIdx, day, hour, minute, second));
    }
    function parseRfc850Date(date, now = /* @__PURE__ */ new Date()) {
      if (!date.endsWith("gmt")) {
        return void 0;
      }
      const commaIndex = date.indexOf(",");
      if (commaIndex === -1) {
        return void 0;
      }
      if (date.length - commaIndex - 1 !== 23) {
        return void 0;
      }
      const dayName = date.substring(0, commaIndex);
      if (!RFC850_DAYS.includes(dayName)) {
        return void 0;
      }
      if (date[commaIndex + 1] !== " " || date[commaIndex + 4] !== "-" || date[commaIndex + 8] !== "-" || date[commaIndex + 11] !== " " || date[commaIndex + 14] !== ":" || date[commaIndex + 17] !== ":" || date[commaIndex + 20] !== " ") {
        return void 0;
      }
      const dayString = date.substring(commaIndex + 2, commaIndex + 4);
      const day = Number.parseInt(dayString);
      if (isNaN(day) || day < 10 && dayString[0] !== "0") {
        return void 0;
      }
      const month = date.substring(commaIndex + 5, commaIndex + 8);
      const monthIdx = IMF_MONTHS.indexOf(month);
      if (monthIdx === -1) {
        return void 0;
      }
      let year = Number.parseInt(date.substring(commaIndex + 9, commaIndex + 11));
      if (isNaN(year)) {
        return void 0;
      }
      const currentYear = now.getUTCFullYear();
      const currentDecade = currentYear % 100;
      const currentCentury = Math.floor(currentYear / 100);
      if (year > currentDecade && year - currentDecade >= 50) {
        year += (currentCentury - 1) * 100;
      } else {
        year += currentCentury * 100;
      }
      const hourString = date.substring(commaIndex + 12, commaIndex + 14);
      const hour = Number.parseInt(hourString);
      if (isNaN(hour) || hour < 10 && hourString[0] !== "0") {
        return void 0;
      }
      const minuteString = date.substring(commaIndex + 15, commaIndex + 17);
      const minute = Number.parseInt(minuteString);
      if (isNaN(minute) || minute < 10 && minuteString[0] !== "0") {
        return void 0;
      }
      const secondString = date.substring(commaIndex + 18, commaIndex + 20);
      const second = Number.parseInt(secondString);
      if (isNaN(second) || second < 10 && secondString[0] !== "0") {
        return void 0;
      }
      return new Date(Date.UTC(year, monthIdx, day, hour, minute, second));
    }
    module2.exports = {
      parseHttpDate
    };
  }
});

// node_modules/undici/lib/handler/cache-handler.js
var require_cache_handler = __commonJS({
  "node_modules/undici/lib/handler/cache-handler.js"(exports2, module2) {
    "use strict";
    var util = require_util();
    var {
      parseCacheControlHeader,
      parseVaryHeader,
      isEtagUsable
    } = require_cache();
    var { parseHttpDate } = require_date();
    function noop() {
    }
    var HEURISTICALLY_CACHEABLE_STATUS_CODES = [
      200,
      203,
      204,
      206,
      300,
      301,
      308,
      404,
      405,
      410,
      414,
      501
    ];
    var MAX_RESPONSE_AGE = 2147483647e3;
    var CacheHandler = class {
      /**
       * @type {import('../../types/cache-interceptor.d.ts').default.CacheKey}
       */
      #cacheKey;
      /**
       * @type {import('../../types/cache-interceptor.d.ts').default.CacheHandlerOptions['type']}
       */
      #cacheType;
      /**
       * @type {number | undefined}
       */
      #cacheByDefault;
      /**
       * @type {import('../../types/cache-interceptor.d.ts').default.CacheStore}
       */
      #store;
      /**
       * @type {import('../../types/dispatcher.d.ts').default.DispatchHandler}
       */
      #handler;
      /**
       * @type {import('node:stream').Writable | undefined}
       */
      #writeStream;
      /**
       * @param {import('../../types/cache-interceptor.d.ts').default.CacheHandlerOptions} opts
       * @param {import('../../types/cache-interceptor.d.ts').default.CacheKey} cacheKey
       * @param {import('../../types/dispatcher.d.ts').default.DispatchHandler} handler
       */
      constructor({ store, type, cacheByDefault }, cacheKey, handler) {
        this.#store = store;
        this.#cacheType = type;
        this.#cacheByDefault = cacheByDefault;
        this.#cacheKey = cacheKey;
        this.#handler = handler;
      }
      onRequestStart(controller, context) {
        this.#writeStream?.destroy();
        this.#writeStream = void 0;
        this.#handler.onRequestStart?.(controller, context);
      }
      onRequestUpgrade(controller, statusCode, headers, socket) {
        this.#handler.onRequestUpgrade?.(controller, statusCode, headers, socket);
      }
      /**
       * @param {import('../../types/dispatcher.d.ts').default.DispatchController} controller
       * @param {number} statusCode
       * @param {import('../../types/header.d.ts').IncomingHttpHeaders} resHeaders
       * @param {string} statusMessage
       */
      onResponseStart(controller, statusCode, resHeaders, statusMessage) {
        const downstreamOnHeaders = () => this.#handler.onResponseStart?.(
          controller,
          statusCode,
          resHeaders,
          statusMessage
        );
        if (!util.safeHTTPMethods.includes(this.#cacheKey.method) && statusCode >= 200 && statusCode <= 399) {
          try {
            this.#store.delete(this.#cacheKey)?.catch?.(noop);
          } catch {
          }
          return downstreamOnHeaders();
        }
        const cacheControlHeader = resHeaders["cache-control"];
        const heuristicallyCacheable = resHeaders["last-modified"] && HEURISTICALLY_CACHEABLE_STATUS_CODES.includes(statusCode);
        if (!cacheControlHeader && !resHeaders["expires"] && !heuristicallyCacheable && !this.#cacheByDefault) {
          return downstreamOnHeaders();
        }
        const cacheControlDirectives = cacheControlHeader ? parseCacheControlHeader(cacheControlHeader) : {};
        if (!canCacheResponse(this.#cacheType, statusCode, resHeaders, cacheControlDirectives)) {
          return downstreamOnHeaders();
        }
        const now = Date.now();
        const resAge = resHeaders.age ? getAge(resHeaders.age) : void 0;
        if (resAge && resAge >= MAX_RESPONSE_AGE) {
          return downstreamOnHeaders();
        }
        const resDate = typeof resHeaders.date === "string" ? parseHttpDate(resHeaders.date) : void 0;
        const staleAt = determineStaleAt(this.#cacheType, now, resAge, resHeaders, resDate, cacheControlDirectives) ?? this.#cacheByDefault;
        if (staleAt === void 0 || resAge && resAge > staleAt) {
          return downstreamOnHeaders();
        }
        const baseTime = resDate ? resDate.getTime() : now;
        const absoluteStaleAt = staleAt + baseTime;
        if (now >= absoluteStaleAt) {
          return downstreamOnHeaders();
        }
        let varyDirectives;
        if (this.#cacheKey.headers && resHeaders.vary) {
          varyDirectives = parseVaryHeader(resHeaders.vary, this.#cacheKey.headers);
          if (!varyDirectives) {
            return downstreamOnHeaders();
          }
        }
        const deleteAt = determineDeleteAt(baseTime, cacheControlDirectives, absoluteStaleAt);
        const strippedHeaders = stripNecessaryHeaders(resHeaders, cacheControlDirectives);
        const value = {
          statusCode,
          statusMessage,
          headers: strippedHeaders,
          vary: varyDirectives,
          cacheControlDirectives,
          cachedAt: resAge ? now - resAge : now,
          staleAt: absoluteStaleAt,
          deleteAt
        };
        if (typeof resHeaders.etag === "string" && isEtagUsable(resHeaders.etag)) {
          value.etag = resHeaders.etag;
        }
        this.#writeStream = this.#store.createWriteStream(this.#cacheKey, value);
        if (!this.#writeStream) {
          return downstreamOnHeaders();
        }
        const handler = this;
        this.#writeStream.on("drain", () => controller.resume()).on("error", function() {
          handler.#writeStream = void 0;
          handler.#store.delete(handler.#cacheKey);
        }).on("close", function() {
          if (handler.#writeStream === this) {
            handler.#writeStream = void 0;
          }
          controller.resume();
        });
        return downstreamOnHeaders();
      }
      onResponseData(controller, chunk) {
        if (this.#writeStream?.write(chunk) === false) {
          controller.pause();
        }
        this.#handler.onResponseData?.(controller, chunk);
      }
      onResponseEnd(controller, trailers) {
        this.#writeStream?.end();
        this.#handler.onResponseEnd?.(controller, trailers);
      }
      onResponseError(controller, err) {
        this.#writeStream?.destroy(err);
        this.#writeStream = void 0;
        this.#handler.onResponseError?.(controller, err);
      }
    };
    function canCacheResponse(cacheType, statusCode, resHeaders, cacheControlDirectives) {
      if (statusCode !== 200 && statusCode !== 307) {
        return false;
      }
      if (cacheControlDirectives["no-store"]) {
        return false;
      }
      if (cacheType === "shared" && cacheControlDirectives.private === true) {
        return false;
      }
      if (resHeaders.vary?.includes("*")) {
        return false;
      }
      if (resHeaders.authorization) {
        if (!cacheControlDirectives.public || typeof resHeaders.authorization !== "string") {
          return false;
        }
        if (Array.isArray(cacheControlDirectives["no-cache"]) && cacheControlDirectives["no-cache"].includes("authorization")) {
          return false;
        }
        if (Array.isArray(cacheControlDirectives["private"]) && cacheControlDirectives["private"].includes("authorization")) {
          return false;
        }
      }
      return true;
    }
    function getAge(ageHeader) {
      const age = parseInt(Array.isArray(ageHeader) ? ageHeader[0] : ageHeader);
      return isNaN(age) ? void 0 : age * 1e3;
    }
    function determineStaleAt(cacheType, now, age, resHeaders, responseDate, cacheControlDirectives) {
      if (cacheType === "shared") {
        const sMaxAge = cacheControlDirectives["s-maxage"];
        if (sMaxAge !== void 0) {
          return sMaxAge > 0 ? sMaxAge * 1e3 : void 0;
        }
      }
      const maxAge = cacheControlDirectives["max-age"];
      if (maxAge !== void 0) {
        return maxAge > 0 ? maxAge * 1e3 : void 0;
      }
      if (typeof resHeaders.expires === "string") {
        const expiresDate = parseHttpDate(resHeaders.expires);
        if (expiresDate) {
          if (now >= expiresDate.getTime()) {
            return void 0;
          }
          if (responseDate) {
            if (responseDate >= expiresDate) {
              return void 0;
            }
            if (age !== void 0 && age > expiresDate - responseDate) {
              return void 0;
            }
          }
          return expiresDate.getTime() - now;
        }
      }
      if (typeof resHeaders["last-modified"] === "string") {
        const lastModified = new Date(resHeaders["last-modified"]);
        if (isValidDate(lastModified)) {
          if (lastModified.getTime() >= now) {
            return void 0;
          }
          const responseAge = now - lastModified.getTime();
          return responseAge * 0.1;
        }
      }
      if (cacheControlDirectives.immutable) {
        return 31536e3;
      }
      return void 0;
    }
    function determineDeleteAt(now, cacheControlDirectives, staleAt) {
      let staleWhileRevalidate = -Infinity;
      let staleIfError = -Infinity;
      let immutable = -Infinity;
      if (cacheControlDirectives["stale-while-revalidate"]) {
        staleWhileRevalidate = staleAt + cacheControlDirectives["stale-while-revalidate"] * 1e3;
      }
      if (cacheControlDirectives["stale-if-error"]) {
        staleIfError = staleAt + cacheControlDirectives["stale-if-error"] * 1e3;
      }
      if (staleWhileRevalidate === -Infinity && staleIfError === -Infinity) {
        immutable = now + 31536e6;
      }
      return Math.max(staleAt, staleWhileRevalidate, staleIfError, immutable);
    }
    function stripNecessaryHeaders(resHeaders, cacheControlDirectives) {
      const headersToRemove = [
        "connection",
        "proxy-authenticate",
        "proxy-authentication-info",
        "proxy-authorization",
        "proxy-connection",
        "te",
        "transfer-encoding",
        "upgrade",
        // We'll add age back when serving it
        "age"
      ];
      if (resHeaders["connection"]) {
        if (Array.isArray(resHeaders["connection"])) {
          headersToRemove.push(...resHeaders["connection"].map((header) => header.trim()));
        } else {
          headersToRemove.push(...resHeaders["connection"].split(",").map((header) => header.trim()));
        }
      }
      if (Array.isArray(cacheControlDirectives["no-cache"])) {
        headersToRemove.push(...cacheControlDirectives["no-cache"]);
      }
      if (Array.isArray(cacheControlDirectives["private"])) {
        headersToRemove.push(...cacheControlDirectives["private"]);
      }
      let strippedHeaders;
      for (const headerName of headersToRemove) {
        if (resHeaders[headerName]) {
          strippedHeaders ??= { ...resHeaders };
          delete strippedHeaders[headerName];
        }
      }
      return strippedHeaders ?? resHeaders;
    }
    function isValidDate(date) {
      return date instanceof Date && Number.isFinite(date.valueOf());
    }
    module2.exports = CacheHandler;
  }
});

// node_modules/undici/lib/cache/memory-cache-store.js
var require_memory_cache_store = __commonJS({
  "node_modules/undici/lib/cache/memory-cache-store.js"(exports2, module2) {
    "use strict";
    var { Writable } = require("node:stream");
    var { EventEmitter } = require("node:events");
    var { assertCacheKey, assertCacheValue } = require_cache();
    var MemoryCacheStore = class extends EventEmitter {
      #maxCount = 1024;
      #maxSize = 104857600;
      // 100MB
      #maxEntrySize = 5242880;
      // 5MB
      #size = 0;
      #count = 0;
      #entries = /* @__PURE__ */ new Map();
      #hasEmittedMaxSizeEvent = false;
      /**
       * @param {import('../../types/cache-interceptor.d.ts').default.MemoryCacheStoreOpts | undefined} [opts]
       */
      constructor(opts) {
        super();
        if (opts) {
          if (typeof opts !== "object") {
            throw new TypeError("MemoryCacheStore options must be an object");
          }
          if (opts.maxCount !== void 0) {
            if (typeof opts.maxCount !== "number" || !Number.isInteger(opts.maxCount) || opts.maxCount < 0) {
              throw new TypeError("MemoryCacheStore options.maxCount must be a non-negative integer");
            }
            this.#maxCount = opts.maxCount;
          }
          if (opts.maxSize !== void 0) {
            if (typeof opts.maxSize !== "number" || !Number.isInteger(opts.maxSize) || opts.maxSize < 0) {
              throw new TypeError("MemoryCacheStore options.maxSize must be a non-negative integer");
            }
            this.#maxSize = opts.maxSize;
          }
          if (opts.maxEntrySize !== void 0) {
            if (typeof opts.maxEntrySize !== "number" || !Number.isInteger(opts.maxEntrySize) || opts.maxEntrySize < 0) {
              throw new TypeError("MemoryCacheStore options.maxEntrySize must be a non-negative integer");
            }
            this.#maxEntrySize = opts.maxEntrySize;
          }
        }
      }
      /**
       * Get the current size of the cache in bytes
       * @returns {number} The current size of the cache in bytes
       */
      get size() {
        return this.#size;
      }
      /**
       * Check if the cache is full (either max size or max count reached)
       * @returns {boolean} True if the cache is full, false otherwise
       */
      isFull() {
        return this.#size >= this.#maxSize || this.#count >= this.#maxCount;
      }
      /**
       * @param {import('../../types/cache-interceptor.d.ts').default.CacheKey} req
       * @returns {import('../../types/cache-interceptor.d.ts').default.GetResult | undefined}
       */
      get(key) {
        assertCacheKey(key);
        const topLevelKey = `${key.origin}:${key.path}`;
        const now = Date.now();
        const entries = this.#entries.get(topLevelKey);
        const entry = entries ? findEntry(key, entries, now) : null;
        return entry == null ? void 0 : {
          statusMessage: entry.statusMessage,
          statusCode: entry.statusCode,
          headers: entry.headers,
          body: entry.body,
          vary: entry.vary ? entry.vary : void 0,
          etag: entry.etag,
          cacheControlDirectives: entry.cacheControlDirectives,
          cachedAt: entry.cachedAt,
          staleAt: entry.staleAt,
          deleteAt: entry.deleteAt
        };
      }
      /**
       * @param {import('../../types/cache-interceptor.d.ts').default.CacheKey} key
       * @param {import('../../types/cache-interceptor.d.ts').default.CacheValue} val
       * @returns {Writable | undefined}
       */
      createWriteStream(key, val) {
        assertCacheKey(key);
        assertCacheValue(val);
        const topLevelKey = `${key.origin}:${key.path}`;
        const store = this;
        const entry = { ...key, ...val, body: [], size: 0 };
        return new Writable({
          write(chunk, encoding, callback) {
            if (typeof chunk === "string") {
              chunk = Buffer.from(chunk, encoding);
            }
            entry.size += chunk.byteLength;
            if (entry.size >= store.#maxEntrySize) {
              this.destroy();
            } else {
              entry.body.push(chunk);
            }
            callback(null);
          },
          final(callback) {
            let entries = store.#entries.get(topLevelKey);
            if (!entries) {
              entries = [];
              store.#entries.set(topLevelKey, entries);
            }
            const previousEntry = findEntry(key, entries, Date.now());
            if (previousEntry) {
              const index = entries.indexOf(previousEntry);
              entries.splice(index, 1, entry);
              store.#size -= previousEntry.size;
            } else {
              entries.push(entry);
              store.#count += 1;
            }
            store.#size += entry.size;
            if (store.#size > store.#maxSize || store.#count > store.#maxCount) {
              if (!store.#hasEmittedMaxSizeEvent) {
                store.emit("maxSizeExceeded", {
                  size: store.#size,
                  maxSize: store.#maxSize,
                  count: store.#count,
                  maxCount: store.#maxCount
                });
                store.#hasEmittedMaxSizeEvent = true;
              }
              for (const [key2, entries2] of store.#entries) {
                for (const entry2 of entries2.splice(0, entries2.length / 2)) {
                  store.#size -= entry2.size;
                  store.#count -= 1;
                }
                if (entries2.length === 0) {
                  store.#entries.delete(key2);
                }
              }
              if (store.#size < store.#maxSize && store.#count < store.#maxCount) {
                store.#hasEmittedMaxSizeEvent = false;
              }
            }
            callback(null);
          }
        });
      }
      /**
       * @param {CacheKey} key
       */
      delete(key) {
        if (typeof key !== "object") {
          throw new TypeError(`expected key to be object, got ${typeof key}`);
        }
        const topLevelKey = `${key.origin}:${key.path}`;
        for (const entry of this.#entries.get(topLevelKey) ?? []) {
          this.#size -= entry.size;
          this.#count -= 1;
        }
        this.#entries.delete(topLevelKey);
      }
    };
    function findEntry(key, entries, now) {
      return entries.find((entry) => entry.deleteAt > now && entry.method === key.method && (entry.vary == null || Object.keys(entry.vary).every((headerName) => {
        if (entry.vary[headerName] === null) {
          return key.headers[headerName] === void 0;
        }
        return entry.vary[headerName] === key.headers[headerName];
      })));
    }
    module2.exports = MemoryCacheStore;
  }
});

// node_modules/undici/lib/handler/cache-revalidation-handler.js
var require_cache_revalidation_handler = __commonJS({
  "node_modules/undici/lib/handler/cache-revalidation-handler.js"(exports2, module2) {
    "use strict";
    var assert = require("node:assert");
    var CacheRevalidationHandler = class {
      #successful = false;
      /**
       * @type {((boolean, any) => void) | null}
       */
      #callback;
      /**
       * @type {(import('../../types/dispatcher.d.ts').default.DispatchHandler)}
       */
      #handler;
      #context;
      /**
       * @type {boolean}
       */
      #allowErrorStatusCodes;
      /**
       * @param {(boolean) => void} callback Function to call if the cached value is valid
       * @param {import('../../types/dispatcher.d.ts').default.DispatchHandlers} handler
       * @param {boolean} allowErrorStatusCodes
       */
      constructor(callback, handler, allowErrorStatusCodes) {
        if (typeof callback !== "function") {
          throw new TypeError("callback must be a function");
        }
        this.#callback = callback;
        this.#handler = handler;
        this.#allowErrorStatusCodes = allowErrorStatusCodes;
      }
      onRequestStart(_, context) {
        this.#successful = false;
        this.#context = context;
      }
      onRequestUpgrade(controller, statusCode, headers, socket) {
        this.#handler.onRequestUpgrade?.(controller, statusCode, headers, socket);
      }
      onResponseStart(controller, statusCode, headers, statusMessage) {
        assert(this.#callback != null);
        this.#successful = statusCode === 304 || this.#allowErrorStatusCodes && statusCode >= 500 && statusCode <= 504;
        this.#callback(this.#successful, this.#context);
        this.#callback = null;
        if (this.#successful) {
          return true;
        }
        this.#handler.onRequestStart?.(controller, this.#context);
        this.#handler.onResponseStart?.(
          controller,
          statusCode,
          headers,
          statusMessage
        );
      }
      onResponseData(controller, chunk) {
        if (this.#successful) {
          return;
        }
        return this.#handler.onResponseData?.(controller, chunk);
      }
      onResponseEnd(controller, trailers) {
        if (this.#successful) {
          return;
        }
        this.#handler.onResponseEnd?.(controller, trailers);
      }
      onResponseError(controller, err) {
        if (this.#successful) {
          return;
        }
        if (this.#callback) {
          this.#callback(false);
          this.#callback = null;
        }
        if (typeof this.#handler.onResponseError === "function") {
          this.#handler.onResponseError(controller, err);
        } else {
          throw err;
        }
      }
    };
    module2.exports = CacheRevalidationHandler;
  }
});

// node_modules/undici/lib/interceptor/cache.js
var require_cache2 = __commonJS({
  "node_modules/undici/lib/interceptor/cache.js"(exports2, module2) {
    "use strict";
    var assert = require("node:assert");
    var { Readable } = require("node:stream");
    var util = require_util();
    var CacheHandler = require_cache_handler();
    var MemoryCacheStore = require_memory_cache_store();
    var CacheRevalidationHandler = require_cache_revalidation_handler();
    var { assertCacheStore, assertCacheMethods, makeCacheKey, normaliseHeaders, parseCacheControlHeader } = require_cache();
    var { AbortError } = require_errors();
    function needsRevalidation(result, cacheControlDirectives) {
      if (cacheControlDirectives?.["no-cache"]) {
        return true;
      }
      if (result.cacheControlDirectives?.["no-cache"] && !Array.isArray(result.cacheControlDirectives["no-cache"])) {
        return true;
      }
      const now = Date.now();
      if (now > result.staleAt) {
        if (cacheControlDirectives?.["max-stale"]) {
          const gracePeriod = result.staleAt + cacheControlDirectives["max-stale"] * 1e3;
          return now > gracePeriod;
        }
        return true;
      }
      if (cacheControlDirectives?.["min-fresh"]) {
        const timeLeftTillStale = result.staleAt - now;
        const threshold = cacheControlDirectives["min-fresh"] * 1e3;
        return timeLeftTillStale <= threshold;
      }
      return false;
    }
    function handleUncachedResponse(dispatch, globalOpts, cacheKey, handler, opts, reqCacheControl) {
      if (reqCacheControl?.["only-if-cached"]) {
        let aborted = false;
        try {
          if (typeof handler.onConnect === "function") {
            handler.onConnect(() => {
              aborted = true;
            });
            if (aborted) {
              return;
            }
          }
          if (typeof handler.onHeaders === "function") {
            handler.onHeaders(504, [], () => {
            }, "Gateway Timeout");
            if (aborted) {
              return;
            }
          }
          if (typeof handler.onComplete === "function") {
            handler.onComplete([]);
          }
        } catch (err) {
          if (typeof handler.onError === "function") {
            handler.onError(err);
          }
        }
        return true;
      }
      return dispatch(opts, new CacheHandler(globalOpts, cacheKey, handler));
    }
    function sendCachedValue(handler, opts, result, age, context, isStale) {
      const stream = util.isStream(result.body) ? result.body : Readable.from(result.body ?? []);
      assert(!stream.destroyed, "stream should not be destroyed");
      assert(!stream.readableDidRead, "stream should not be readableDidRead");
      const controller = {
        resume() {
          stream.resume();
        },
        pause() {
          stream.pause();
        },
        get paused() {
          return stream.isPaused();
        },
        get aborted() {
          return stream.destroyed;
        },
        get reason() {
          return stream.errored;
        },
        abort(reason) {
          stream.destroy(reason ?? new AbortError());
        }
      };
      stream.on("error", function(err) {
        if (!this.readableEnded) {
          if (typeof handler.onResponseError === "function") {
            handler.onResponseError(controller, err);
          } else {
            throw err;
          }
        }
      }).on("close", function() {
        if (!this.errored) {
          handler.onResponseEnd?.(controller, {});
        }
      });
      handler.onRequestStart?.(controller, context);
      if (stream.destroyed) {
        return;
      }
      const headers = { ...result.headers, age: String(age) };
      if (isStale) {
        headers.warning = '110 - "response is stale"';
      }
      handler.onResponseStart?.(controller, result.statusCode, headers, result.statusMessage);
      if (opts.method === "HEAD") {
        stream.destroy();
      } else {
        stream.on("data", function(chunk) {
          handler.onResponseData?.(controller, chunk);
        });
      }
    }
    function handleResult(dispatch, globalOpts, cacheKey, handler, opts, reqCacheControl, result) {
      if (!result) {
        return handleUncachedResponse(dispatch, globalOpts, cacheKey, handler, opts, reqCacheControl);
      }
      const now = Date.now();
      if (now > result.deleteAt) {
        return dispatch(opts, new CacheHandler(globalOpts, cacheKey, handler));
      }
      const age = Math.round((now - result.cachedAt) / 1e3);
      if (reqCacheControl?.["max-age"] && age >= reqCacheControl["max-age"]) {
        return dispatch(opts, handler);
      }
      if (needsRevalidation(result, reqCacheControl)) {
        if (util.isStream(opts.body) && util.bodyLength(opts.body) !== 0) {
          return dispatch(opts, new CacheHandler(globalOpts, cacheKey, handler));
        }
        let withinStaleIfErrorThreshold = false;
        const staleIfErrorExpiry = result.cacheControlDirectives["stale-if-error"] ?? reqCacheControl?.["stale-if-error"];
        if (staleIfErrorExpiry) {
          withinStaleIfErrorThreshold = now < result.staleAt + staleIfErrorExpiry * 1e3;
        }
        let headers = {
          ...opts.headers,
          "if-modified-since": new Date(result.cachedAt).toUTCString()
        };
        if (result.etag) {
          headers["if-none-match"] = result.etag;
        }
        if (result.vary) {
          headers = {
            ...headers,
            ...result.vary
          };
        }
        return dispatch(
          {
            ...opts,
            headers
          },
          new CacheRevalidationHandler(
            (success, context) => {
              if (success) {
                sendCachedValue(handler, opts, result, age, context, true);
              } else if (util.isStream(result.body)) {
                result.body.on("error", () => {
                }).destroy();
              }
            },
            new CacheHandler(globalOpts, cacheKey, handler),
            withinStaleIfErrorThreshold
          )
        );
      }
      if (util.isStream(opts.body)) {
        opts.body.on("error", () => {
        }).destroy();
      }
      sendCachedValue(handler, opts, result, age, null, false);
    }
    module2.exports = (opts = {}) => {
      const {
        store = new MemoryCacheStore(),
        methods = ["GET"],
        cacheByDefault = void 0,
        type = "shared"
      } = opts;
      if (typeof opts !== "object" || opts === null) {
        throw new TypeError(`expected type of opts to be an Object, got ${opts === null ? "null" : typeof opts}`);
      }
      assertCacheStore(store, "opts.store");
      assertCacheMethods(methods, "opts.methods");
      if (typeof cacheByDefault !== "undefined" && typeof cacheByDefault !== "number") {
        throw new TypeError(`exepcted opts.cacheByDefault to be number or undefined, got ${typeof cacheByDefault}`);
      }
      if (typeof type !== "undefined" && type !== "shared" && type !== "private") {
        throw new TypeError(`exepcted opts.type to be shared, private, or undefined, got ${typeof type}`);
      }
      const globalOpts = {
        store,
        methods,
        cacheByDefault,
        type
      };
      const safeMethodsToNotCache = util.safeHTTPMethods.filter((method) => methods.includes(method) === false);
      return (dispatch) => {
        return (opts2, handler) => {
          if (!opts2.origin || safeMethodsToNotCache.includes(opts2.method)) {
            return dispatch(opts2, handler);
          }
          opts2 = {
            ...opts2,
            headers: normaliseHeaders(opts2)
          };
          const reqCacheControl = opts2.headers?.["cache-control"] ? parseCacheControlHeader(opts2.headers["cache-control"]) : void 0;
          if (reqCacheControl?.["no-store"]) {
            return dispatch(opts2, handler);
          }
          const cacheKey = makeCacheKey(opts2);
          const result = store.get(cacheKey);
          if (result && typeof result.then === "function") {
            result.then((result2) => {
              handleResult(
                dispatch,
                globalOpts,
                cacheKey,
                handler,
                opts2,
                reqCacheControl,
                result2
              );
            });
          } else {
            handleResult(
              dispatch,
              globalOpts,
              cacheKey,
              handler,
              opts2,
              reqCacheControl,
              result
            );
          }
          return true;
        };
      };
    };
  }
});

// node_modules/undici/lib/cache/sqlite-cache-store.js
var require_sqlite_cache_store = __commonJS({
  "node_modules/undici/lib/cache/sqlite-cache-store.js"(exports2, module2) {
    "use strict";
    var { Writable } = require("node:stream");
    var { assertCacheKey, assertCacheValue } = require_cache();
    var DatabaseSync;
    var VERSION = 3;
    var MAX_ENTRY_SIZE = 2 * 1e3 * 1e3 * 1e3;
    module2.exports = class SqliteCacheStore {
      #maxEntrySize = MAX_ENTRY_SIZE;
      #maxCount = Infinity;
      /**
       * @type {import('node:sqlite').DatabaseSync}
       */
      #db;
      /**
       * @type {import('node:sqlite').StatementSync}
       */
      #getValuesQuery;
      /**
       * @type {import('node:sqlite').StatementSync}
       */
      #updateValueQuery;
      /**
       * @type {import('node:sqlite').StatementSync}
       */
      #insertValueQuery;
      /**
       * @type {import('node:sqlite').StatementSync}
       */
      #deleteExpiredValuesQuery;
      /**
       * @type {import('node:sqlite').StatementSync}
       */
      #deleteByUrlQuery;
      /**
       * @type {import('node:sqlite').StatementSync}
       */
      #countEntriesQuery;
      /**
       * @type {import('node:sqlite').StatementSync | null}
       */
      #deleteOldValuesQuery;
      /**
       * @param {import('../../types/cache-interceptor.d.ts').default.SqliteCacheStoreOpts | undefined} opts
       */
      constructor(opts) {
        if (opts) {
          if (typeof opts !== "object") {
            throw new TypeError("SqliteCacheStore options must be an object");
          }
          if (opts.maxEntrySize !== void 0) {
            if (typeof opts.maxEntrySize !== "number" || !Number.isInteger(opts.maxEntrySize) || opts.maxEntrySize < 0) {
              throw new TypeError("SqliteCacheStore options.maxEntrySize must be a non-negative integer");
            }
            if (opts.maxEntrySize > MAX_ENTRY_SIZE) {
              throw new TypeError("SqliteCacheStore options.maxEntrySize must be less than 2gb");
            }
            this.#maxEntrySize = opts.maxEntrySize;
          }
          if (opts.maxCount !== void 0) {
            if (typeof opts.maxCount !== "number" || !Number.isInteger(opts.maxCount) || opts.maxCount < 0) {
              throw new TypeError("SqliteCacheStore options.maxCount must be a non-negative integer");
            }
            this.#maxCount = opts.maxCount;
          }
        }
        if (!DatabaseSync) {
          DatabaseSync = require("node:sqlite").DatabaseSync;
        }
        this.#db = new DatabaseSync(opts?.location ?? ":memory:");
        this.#db.exec(`
      PRAGMA journal_mode = WAL;
      PRAGMA synchronous = NORMAL;
      PRAGMA temp_store = memory;
      PRAGMA optimize;

      CREATE TABLE IF NOT EXISTS cacheInterceptorV${VERSION} (
        -- Data specific to us
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        url TEXT NOT NULL,
        method TEXT NOT NULL,

        -- Data returned to the interceptor
        body BUF NULL,
        deleteAt INTEGER NOT NULL,
        statusCode INTEGER NOT NULL,
        statusMessage TEXT NOT NULL,
        headers TEXT NULL,
        cacheControlDirectives TEXT NULL,
        etag TEXT NULL,
        vary TEXT NULL,
        cachedAt INTEGER NOT NULL,
        staleAt INTEGER NOT NULL
      );

      CREATE INDEX IF NOT EXISTS idx_cacheInterceptorV${VERSION}_getValuesQuery ON cacheInterceptorV${VERSION}(url, method, deleteAt);
      CREATE INDEX IF NOT EXISTS idx_cacheInterceptorV${VERSION}_deleteByUrlQuery ON cacheInterceptorV${VERSION}(deleteAt);
    `);
        this.#getValuesQuery = this.#db.prepare(`
      SELECT
        id,
        body,
        deleteAt,
        statusCode,
        statusMessage,
        headers,
        etag,
        cacheControlDirectives,
        vary,
        cachedAt,
        staleAt
      FROM cacheInterceptorV${VERSION}
      WHERE
        url = ?
        AND method = ?
      ORDER BY
        deleteAt ASC
    `);
        this.#updateValueQuery = this.#db.prepare(`
      UPDATE cacheInterceptorV${VERSION} SET
        body = ?,
        deleteAt = ?,
        statusCode = ?,
        statusMessage = ?,
        headers = ?,
        etag = ?,
        cacheControlDirectives = ?,
        cachedAt = ?,
        staleAt = ?
      WHERE
        id = ?
    `);
        this.#insertValueQuery = this.#db.prepare(`
      INSERT INTO cacheInterceptorV${VERSION} (
        url,
        method,
        body,
        deleteAt,
        statusCode,
        statusMessage,
        headers,
        etag,
        cacheControlDirectives,
        vary,
        cachedAt,
        staleAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
        this.#deleteByUrlQuery = this.#db.prepare(
          `DELETE FROM cacheInterceptorV${VERSION} WHERE url = ?`
        );
        this.#countEntriesQuery = this.#db.prepare(
          `SELECT COUNT(*) AS total FROM cacheInterceptorV${VERSION}`
        );
        this.#deleteExpiredValuesQuery = this.#db.prepare(
          `DELETE FROM cacheInterceptorV${VERSION} WHERE deleteAt <= ?`
        );
        this.#deleteOldValuesQuery = this.#maxCount === Infinity ? null : this.#db.prepare(`
        DELETE FROM cacheInterceptorV${VERSION}
        WHERE id IN (
          SELECT
            id
          FROM cacheInterceptorV${VERSION}
          ORDER BY cachedAt DESC
          LIMIT ?
        )
      `);
      }
      close() {
        this.#db.close();
      }
      /**
       * @param {import('../../types/cache-interceptor.d.ts').default.CacheKey} key
       * @returns {(import('../../types/cache-interceptor.d.ts').default.GetResult & { body?: Buffer }) | undefined}
       */
      get(key) {
        assertCacheKey(key);
        const value = this.#findValue(key);
        return value ? {
          body: value.body ? Buffer.from(value.body.buffer, value.body.byteOffset, value.body.byteLength) : void 0,
          statusCode: value.statusCode,
          statusMessage: value.statusMessage,
          headers: value.headers ? JSON.parse(value.headers) : void 0,
          etag: value.etag ? value.etag : void 0,
          vary: value.vary ? JSON.parse(value.vary) : void 0,
          cacheControlDirectives: value.cacheControlDirectives ? JSON.parse(value.cacheControlDirectives) : void 0,
          cachedAt: value.cachedAt,
          staleAt: value.staleAt,
          deleteAt: value.deleteAt
        } : void 0;
      }
      /**
       * @param {import('../../types/cache-interceptor.d.ts').default.CacheKey} key
       * @param {import('../../types/cache-interceptor.d.ts').default.CacheValue & { body: null | Buffer | Array<Buffer>}} value
       */
      set(key, value) {
        assertCacheKey(key);
        const url = this.#makeValueUrl(key);
        const body = Array.isArray(value.body) ? Buffer.concat(value.body) : value.body;
        const size = body?.byteLength;
        if (size && size > this.#maxEntrySize) {
          return;
        }
        const existingValue = this.#findValue(key, true);
        if (existingValue) {
          this.#updateValueQuery.run(
            body,
            value.deleteAt,
            value.statusCode,
            value.statusMessage,
            value.headers ? JSON.stringify(value.headers) : null,
            value.etag ? value.etag : null,
            value.cacheControlDirectives ? JSON.stringify(value.cacheControlDirectives) : null,
            value.cachedAt,
            value.staleAt,
            existingValue.id
          );
        } else {
          this.#prune();
          this.#insertValueQuery.run(
            url,
            key.method,
            body,
            value.deleteAt,
            value.statusCode,
            value.statusMessage,
            value.headers ? JSON.stringify(value.headers) : null,
            value.etag ? value.etag : null,
            value.cacheControlDirectives ? JSON.stringify(value.cacheControlDirectives) : null,
            value.vary ? JSON.stringify(value.vary) : null,
            value.cachedAt,
            value.staleAt
          );
        }
      }
      /**
       * @param {import('../../types/cache-interceptor.d.ts').default.CacheKey} key
       * @param {import('../../types/cache-interceptor.d.ts').default.CacheValue} value
       * @returns {Writable | undefined}
       */
      createWriteStream(key, value) {
        assertCacheKey(key);
        assertCacheValue(value);
        let size = 0;
        const body = [];
        const store = this;
        return new Writable({
          decodeStrings: true,
          write(chunk, encoding, callback) {
            size += chunk.byteLength;
            if (size < store.#maxEntrySize) {
              body.push(chunk);
            } else {
              this.destroy();
            }
            callback();
          },
          final(callback) {
            store.set(key, { ...value, body });
            callback();
          }
        });
      }
      /**
       * @param {import('../../types/cache-interceptor.d.ts').default.CacheKey} key
       */
      delete(key) {
        if (typeof key !== "object") {
          throw new TypeError(`expected key to be object, got ${typeof key}`);
        }
        this.#deleteByUrlQuery.run(this.#makeValueUrl(key));
      }
      #prune() {
        if (Number.isFinite(this.#maxCount) && this.size <= this.#maxCount) {
          return 0;
        }
        {
          const removed = this.#deleteExpiredValuesQuery.run(Date.now()).changes;
          if (removed) {
            return removed;
          }
        }
        {
          const removed = this.#deleteOldValuesQuery?.run(Math.max(Math.floor(this.#maxCount * 0.1), 1)).changes;
          if (removed) {
            return removed;
          }
        }
        return 0;
      }
      /**
       * Counts the number of rows in the cache
       * @returns {Number}
       */
      get size() {
        const { total } = this.#countEntriesQuery.get();
        return total;
      }
      /**
       * @param {import('../../types/cache-interceptor.d.ts').default.CacheKey} key
       * @returns {string}
       */
      #makeValueUrl(key) {
        return `${key.origin}/${key.path}`;
      }
      /**
       * @param {import('../../types/cache-interceptor.d.ts').default.CacheKey} key
       * @param {boolean} [canBeExpired=false]
       * @returns {SqliteStoreValue | undefined}
       */
      #findValue(key, canBeExpired = false) {
        const url = this.#makeValueUrl(key);
        const { headers, method } = key;
        const values = this.#getValuesQuery.all(url, method);
        if (values.length === 0) {
          return void 0;
        }
        const now = Date.now();
        for (const value of values) {
          if (now >= value.deleteAt && !canBeExpired) {
            return void 0;
          }
          let matches = true;
          if (value.vary) {
            const vary = JSON.parse(value.vary);
            for (const header in vary) {
              if (!headerValueEquals(headers[header], vary[header])) {
                matches = false;
                break;
              }
            }
          }
          if (matches) {
            return value;
          }
        }
        return void 0;
      }
    };
    function headerValueEquals(lhs, rhs) {
      if (lhs == null && rhs == null) {
        return true;
      }
      if (lhs == null && rhs != null || lhs != null && rhs == null) {
        return false;
      }
      if (Array.isArray(lhs) && Array.isArray(rhs)) {
        if (lhs.length !== rhs.length) {
          return false;
        }
        return lhs.every((x, i) => x === rhs[i]);
      }
      return lhs === rhs;
    }
  }
});

// node_modules/undici/lib/web/fetch/headers.js
var require_headers = __commonJS({
  "node_modules/undici/lib/web/fetch/headers.js"(exports2, module2) {
    "use strict";
    var { kConstruct } = require_symbols();
    var { kEnumerableProperty } = require_util();
    var {
      iteratorMixin,
      isValidHeaderName,
      isValidHeaderValue
    } = require_util2();
    var { webidl } = require_webidl();
    var assert = require("node:assert");
    var util = require("node:util");
    function isHTTPWhiteSpaceCharCode(code) {
      return code === 10 || code === 13 || code === 9 || code === 32;
    }
    function headerValueNormalize(potentialValue) {
      let i = 0;
      let j = potentialValue.length;
      while (j > i && isHTTPWhiteSpaceCharCode(potentialValue.charCodeAt(j - 1))) --j;
      while (j > i && isHTTPWhiteSpaceCharCode(potentialValue.charCodeAt(i))) ++i;
      return i === 0 && j === potentialValue.length ? potentialValue : potentialValue.substring(i, j);
    }
    function fill(headers, object) {
      if (Array.isArray(object)) {
        for (let i = 0; i < object.length; ++i) {
          const header = object[i];
          if (header.length !== 2) {
            throw webidl.errors.exception({
              header: "Headers constructor",
              message: `expected name/value pair to be length 2, found ${header.length}.`
            });
          }
          appendHeader(headers, header[0], header[1]);
        }
      } else if (typeof object === "object" && object !== null) {
        const keys = Object.keys(object);
        for (let i = 0; i < keys.length; ++i) {
          appendHeader(headers, keys[i], object[keys[i]]);
        }
      } else {
        throw webidl.errors.conversionFailed({
          prefix: "Headers constructor",
          argument: "Argument 1",
          types: ["sequence<sequence<ByteString>>", "record<ByteString, ByteString>"]
        });
      }
    }
    function appendHeader(headers, name, value) {
      value = headerValueNormalize(value);
      if (!isValidHeaderName(name)) {
        throw webidl.errors.invalidArgument({
          prefix: "Headers.append",
          value: name,
          type: "header name"
        });
      } else if (!isValidHeaderValue(value)) {
        throw webidl.errors.invalidArgument({
          prefix: "Headers.append",
          value,
          type: "header value"
        });
      }
      if (getHeadersGuard(headers) === "immutable") {
        throw new TypeError("immutable");
      }
      return getHeadersList(headers).append(name, value, false);
    }
    function headersListSortAndCombine(target) {
      const headersList = getHeadersList(target);
      if (!headersList) {
        return [];
      }
      if (headersList.sortedMap) {
        return headersList.sortedMap;
      }
      const headers = [];
      const names = headersList.toSortedArray();
      const cookies = headersList.cookies;
      if (cookies === null || cookies.length === 1) {
        return headersList.sortedMap = names;
      }
      for (let i = 0; i < names.length; ++i) {
        const { 0: name, 1: value } = names[i];
        if (name === "set-cookie") {
          for (let j = 0; j < cookies.length; ++j) {
            headers.push([name, cookies[j]]);
          }
        } else {
          headers.push([name, value]);
        }
      }
      return headersList.sortedMap = headers;
    }
    function compareHeaderName(a, b) {
      return a[0] < b[0] ? -1 : 1;
    }
    var HeadersList = class _HeadersList {
      /** @type {[string, string][]|null} */
      cookies = null;
      sortedMap;
      headersMap;
      constructor(init) {
        if (init instanceof _HeadersList) {
          this.headersMap = new Map(init.headersMap);
          this.sortedMap = init.sortedMap;
          this.cookies = init.cookies === null ? null : [...init.cookies];
        } else {
          this.headersMap = new Map(init);
          this.sortedMap = null;
        }
      }
      /**
       * @see https://fetch.spec.whatwg.org/#header-list-contains
       * @param {string} name
       * @param {boolean} isLowerCase
       */
      contains(name, isLowerCase) {
        return this.headersMap.has(isLowerCase ? name : name.toLowerCase());
      }
      clear() {
        this.headersMap.clear();
        this.sortedMap = null;
        this.cookies = null;
      }
      /**
       * @see https://fetch.spec.whatwg.org/#concept-header-list-append
       * @param {string} name
       * @param {string} value
       * @param {boolean} isLowerCase
       */
      append(name, value, isLowerCase) {
        this.sortedMap = null;
        const lowercaseName = isLowerCase ? name : name.toLowerCase();
        const exists = this.headersMap.get(lowercaseName);
        if (exists) {
          const delimiter = lowercaseName === "cookie" ? "; " : ", ";
          this.headersMap.set(lowercaseName, {
            name: exists.name,
            value: `${exists.value}${delimiter}${value}`
          });
        } else {
          this.headersMap.set(lowercaseName, { name, value });
        }
        if (lowercaseName === "set-cookie") {
          (this.cookies ??= []).push(value);
        }
      }
      /**
       * @see https://fetch.spec.whatwg.org/#concept-header-list-set
       * @param {string} name
       * @param {string} value
       * @param {boolean} isLowerCase
       */
      set(name, value, isLowerCase) {
        this.sortedMap = null;
        const lowercaseName = isLowerCase ? name : name.toLowerCase();
        if (lowercaseName === "set-cookie") {
          this.cookies = [value];
        }
        this.headersMap.set(lowercaseName, { name, value });
      }
      /**
       * @see https://fetch.spec.whatwg.org/#concept-header-list-delete
       * @param {string} name
       * @param {boolean} isLowerCase
       */
      delete(name, isLowerCase) {
        this.sortedMap = null;
        if (!isLowerCase) name = name.toLowerCase();
        if (name === "set-cookie") {
          this.cookies = null;
        }
        this.headersMap.delete(name);
      }
      /**
       * @see https://fetch.spec.whatwg.org/#concept-header-list-get
       * @param {string} name
       * @param {boolean} isLowerCase
       * @returns {string | null}
       */
      get(name, isLowerCase) {
        return this.headersMap.get(isLowerCase ? name : name.toLowerCase())?.value ?? null;
      }
      *[Symbol.iterator]() {
        for (const { 0: name, 1: { value } } of this.headersMap) {
          yield [name, value];
        }
      }
      get entries() {
        const headers = {};
        if (this.headersMap.size !== 0) {
          for (const { name, value } of this.headersMap.values()) {
            headers[name] = value;
          }
        }
        return headers;
      }
      rawValues() {
        return this.headersMap.values();
      }
      get entriesList() {
        const headers = [];
        if (this.headersMap.size !== 0) {
          for (const { 0: lowerName, 1: { name, value } } of this.headersMap) {
            if (lowerName === "set-cookie") {
              for (const cookie of this.cookies) {
                headers.push([name, cookie]);
              }
            } else {
              headers.push([name, value]);
            }
          }
        }
        return headers;
      }
      // https://fetch.spec.whatwg.org/#convert-header-names-to-a-sorted-lowercase-set
      toSortedArray() {
        const size = this.headersMap.size;
        const array = new Array(size);
        if (size <= 32) {
          if (size === 0) {
            return array;
          }
          const iterator = this.headersMap[Symbol.iterator]();
          const firstValue = iterator.next().value;
          array[0] = [firstValue[0], firstValue[1].value];
          assert(firstValue[1].value !== null);
          for (let i = 1, j = 0, right = 0, left = 0, pivot = 0, x, value; i < size; ++i) {
            value = iterator.next().value;
            x = array[i] = [value[0], value[1].value];
            assert(x[1] !== null);
            left = 0;
            right = i;
            while (left < right) {
              pivot = left + (right - left >> 1);
              if (array[pivot][0] <= x[0]) {
                left = pivot + 1;
              } else {
                right = pivot;
              }
            }
            if (i !== pivot) {
              j = i;
              while (j > left) {
                array[j] = array[--j];
              }
              array[left] = x;
            }
          }
          if (!iterator.next().done) {
            throw new TypeError("Unreachable");
          }
          return array;
        } else {
          let i = 0;
          for (const { 0: name, 1: { value } } of this.headersMap) {
            array[i++] = [name, value];
            assert(value !== null);
          }
          return array.sort(compareHeaderName);
        }
      }
    };
    var Headers = class _Headers {
      #guard;
      /**
       * @type {HeadersList}
       */
      #headersList;
      /**
       * @param {HeadersInit|Symbol} [init]
       * @returns
       */
      constructor(init = void 0) {
        webidl.util.markAsUncloneable(this);
        if (init === kConstruct) {
          return;
        }
        this.#headersList = new HeadersList();
        this.#guard = "none";
        if (init !== void 0) {
          init = webidl.converters.HeadersInit(init, "Headers constructor", "init");
          fill(this, init);
        }
      }
      // https://fetch.spec.whatwg.org/#dom-headers-append
      append(name, value) {
        webidl.brandCheck(this, _Headers);
        webidl.argumentLengthCheck(arguments, 2, "Headers.append");
        const prefix = "Headers.append";
        name = webidl.converters.ByteString(name, prefix, "name");
        value = webidl.converters.ByteString(value, prefix, "value");
        return appendHeader(this, name, value);
      }
      // https://fetch.spec.whatwg.org/#dom-headers-delete
      delete(name) {
        webidl.brandCheck(this, _Headers);
        webidl.argumentLengthCheck(arguments, 1, "Headers.delete");
        const prefix = "Headers.delete";
        name = webidl.converters.ByteString(name, prefix, "name");
        if (!isValidHeaderName(name)) {
          throw webidl.errors.invalidArgument({
            prefix: "Headers.delete",
            value: name,
            type: "header name"
          });
        }
        if (this.#guard === "immutable") {
          throw new TypeError("immutable");
        }
        if (!this.#headersList.contains(name, false)) {
          return;
        }
        this.#headersList.delete(name, false);
      }
      // https://fetch.spec.whatwg.org/#dom-headers-get
      get(name) {
        webidl.brandCheck(this, _Headers);
        webidl.argumentLengthCheck(arguments, 1, "Headers.get");
        const prefix = "Headers.get";
        name = webidl.converters.ByteString(name, prefix, "name");
        if (!isValidHeaderName(name)) {
          throw webidl.errors.invalidArgument({
            prefix,
            value: name,
            type: "header name"
          });
        }
        return this.#headersList.get(name, false);
      }
      // https://fetch.spec.whatwg.org/#dom-headers-has
      has(name) {
        webidl.brandCheck(this, _Headers);
        webidl.argumentLengthCheck(arguments, 1, "Headers.has");
        const prefix = "Headers.has";
        name = webidl.converters.ByteString(name, prefix, "name");
        if (!isValidHeaderName(name)) {
          throw webidl.errors.invalidArgument({
            prefix,
            value: name,
            type: "header name"
          });
        }
        return this.#headersList.contains(name, false);
      }
      // https://fetch.spec.whatwg.org/#dom-headers-set
      set(name, value) {
        webidl.brandCheck(this, _Headers);
        webidl.argumentLengthCheck(arguments, 2, "Headers.set");
        const prefix = "Headers.set";
        name = webidl.converters.ByteString(name, prefix, "name");
        value = webidl.converters.ByteString(value, prefix, "value");
        value = headerValueNormalize(value);
        if (!isValidHeaderName(name)) {
          throw webidl.errors.invalidArgument({
            prefix,
            value: name,
            type: "header name"
          });
        } else if (!isValidHeaderValue(value)) {
          throw webidl.errors.invalidArgument({
            prefix,
            value,
            type: "header value"
          });
        }
        if (this.#guard === "immutable") {
          throw new TypeError("immutable");
        }
        this.#headersList.set(name, value, false);
      }
      // https://fetch.spec.whatwg.org/#dom-headers-getsetcookie
      getSetCookie() {
        webidl.brandCheck(this, _Headers);
        const list = this.#headersList.cookies;
        if (list) {
          return [...list];
        }
        return [];
      }
      [util.inspect.custom](depth, options) {
        options.depth ??= depth;
        return `Headers ${util.formatWithOptions(options, this.#headersList.entries)}`;
      }
      static getHeadersGuard(o) {
        return o.#guard;
      }
      static setHeadersGuard(o, guard) {
        o.#guard = guard;
      }
      /**
       * @param {Headers} o
       */
      static getHeadersList(o) {
        return o.#headersList;
      }
      /**
       * @param {Headers} target
       * @param {HeadersList} list
       */
      static setHeadersList(target, list) {
        target.#headersList = list;
      }
    };
    var { getHeadersGuard, setHeadersGuard, getHeadersList, setHeadersList } = Headers;
    Reflect.deleteProperty(Headers, "getHeadersGuard");
    Reflect.deleteProperty(Headers, "setHeadersGuard");
    Reflect.deleteProperty(Headers, "getHeadersList");
    Reflect.deleteProperty(Headers, "setHeadersList");
    iteratorMixin("Headers", Headers, headersListSortAndCombine, 0, 1);
    Object.defineProperties(Headers.prototype, {
      append: kEnumerableProperty,
      delete: kEnumerableProperty,
      get: kEnumerableProperty,
      has: kEnumerableProperty,
      set: kEnumerableProperty,
      getSetCookie: kEnumerableProperty,
      [Symbol.toStringTag]: {
        value: "Headers",
        configurable: true
      },
      [util.inspect.custom]: {
        enumerable: false
      }
    });
    webidl.converters.HeadersInit = function(V, prefix, argument) {
      if (webidl.util.Type(V) === webidl.util.Types.OBJECT) {
        const iterator = Reflect.get(V, Symbol.iterator);
        if (!util.types.isProxy(V) && iterator === Headers.prototype.entries) {
          try {
            return getHeadersList(V).entriesList;
          } catch {
          }
        }
        if (typeof iterator === "function") {
          return webidl.converters["sequence<sequence<ByteString>>"](V, prefix, argument, iterator.bind(V));
        }
        return webidl.converters["record<ByteString, ByteString>"](V, prefix, argument);
      }
      throw webidl.errors.conversionFailed({
        prefix: "Headers constructor",
        argument: "Argument 1",
        types: ["sequence<sequence<ByteString>>", "record<ByteString, ByteString>"]
      });
    };
    module2.exports = {
      fill,
      // for test.
      compareHeaderName,
      Headers,
      HeadersList,
      getHeadersGuard,
      setHeadersGuard,
      setHeadersList,
      getHeadersList
    };
  }
});

// node_modules/undici/lib/web/fetch/response.js
var require_response = __commonJS({
  "node_modules/undici/lib/web/fetch/response.js"(exports2, module2) {
    "use strict";
    var { Headers, HeadersList, fill, getHeadersGuard, setHeadersGuard, setHeadersList } = require_headers();
    var { extractBody, cloneBody, mixinBody, hasFinalizationRegistry, streamRegistry, bodyUnusable } = require_body();
    var util = require_util();
    var nodeUtil = require("node:util");
    var { kEnumerableProperty } = util;
    var {
      isValidReasonPhrase,
      isCancelled,
      isAborted,
      serializeJavascriptValueToJSONString,
      isErrorLike,
      isomorphicEncode,
      environmentSettingsObject: relevantRealm
    } = require_util2();
    var {
      redirectStatusSet,
      nullBodyStatus
    } = require_constants3();
    var { webidl } = require_webidl();
    var { URLSerializer } = require_data_url();
    var { kConstruct } = require_symbols();
    var assert = require("node:assert");
    var { types } = require("node:util");
    var textEncoder = new TextEncoder("utf-8");
    var Response = class _Response {
      /** @type {Headers} */
      #headers;
      #state;
      // Creates network error Response.
      static error() {
        const responseObject = fromInnerResponse(makeNetworkError(), "immutable");
        return responseObject;
      }
      // https://fetch.spec.whatwg.org/#dom-response-json
      static json(data, init = void 0) {
        webidl.argumentLengthCheck(arguments, 1, "Response.json");
        if (init !== null) {
          init = webidl.converters.ResponseInit(init);
        }
        const bytes = textEncoder.encode(
          serializeJavascriptValueToJSONString(data)
        );
        const body = extractBody(bytes);
        const responseObject = fromInnerResponse(makeResponse({}), "response");
        initializeResponse(responseObject, init, { body: body[0], type: "application/json" });
        return responseObject;
      }
      // Creates a redirect Response that redirects to url with status status.
      static redirect(url, status = 302) {
        webidl.argumentLengthCheck(arguments, 1, "Response.redirect");
        url = webidl.converters.USVString(url);
        status = webidl.converters["unsigned short"](status);
        let parsedURL;
        try {
          parsedURL = new URL(url, relevantRealm.settingsObject.baseUrl);
        } catch (err) {
          throw new TypeError(`Failed to parse URL from ${url}`, { cause: err });
        }
        if (!redirectStatusSet.has(status)) {
          throw new RangeError(`Invalid status code ${status}`);
        }
        const responseObject = fromInnerResponse(makeResponse({}), "immutable");
        responseObject.#state.status = status;
        const value = isomorphicEncode(URLSerializer(parsedURL));
        responseObject.#state.headersList.append("location", value, true);
        return responseObject;
      }
      // https://fetch.spec.whatwg.org/#dom-response
      constructor(body = null, init = void 0) {
        webidl.util.markAsUncloneable(this);
        if (body === kConstruct) {
          return;
        }
        if (body !== null) {
          body = webidl.converters.BodyInit(body);
        }
        init = webidl.converters.ResponseInit(init);
        this.#state = makeResponse({});
        this.#headers = new Headers(kConstruct);
        setHeadersGuard(this.#headers, "response");
        setHeadersList(this.#headers, this.#state.headersList);
        let bodyWithType = null;
        if (body != null) {
          const [extractedBody, type] = extractBody(body);
          bodyWithType = { body: extractedBody, type };
        }
        initializeResponse(this, init, bodyWithType);
      }
      // Returns response’s type, e.g., "cors".
      get type() {
        webidl.brandCheck(this, _Response);
        return this.#state.type;
      }
      // Returns response’s URL, if it has one; otherwise the empty string.
      get url() {
        webidl.brandCheck(this, _Response);
        const urlList = this.#state.urlList;
        const url = urlList[urlList.length - 1] ?? null;
        if (url === null) {
          return "";
        }
        return URLSerializer(url, true);
      }
      // Returns whether response was obtained through a redirect.
      get redirected() {
        webidl.brandCheck(this, _Response);
        return this.#state.urlList.length > 1;
      }
      // Returns response’s status.
      get status() {
        webidl.brandCheck(this, _Response);
        return this.#state.status;
      }
      // Returns whether response’s status is an ok status.
      get ok() {
        webidl.brandCheck(this, _Response);
        return this.#state.status >= 200 && this.#state.status <= 299;
      }
      // Returns response’s status message.
      get statusText() {
        webidl.brandCheck(this, _Response);
        return this.#state.statusText;
      }
      // Returns response’s headers as Headers.
      get headers() {
        webidl.brandCheck(this, _Response);
        return this.#headers;
      }
      get body() {
        webidl.brandCheck(this, _Response);
        return this.#state.body ? this.#state.body.stream : null;
      }
      get bodyUsed() {
        webidl.brandCheck(this, _Response);
        return !!this.#state.body && util.isDisturbed(this.#state.body.stream);
      }
      // Returns a clone of response.
      clone() {
        webidl.brandCheck(this, _Response);
        if (bodyUnusable(this.#state)) {
          throw webidl.errors.exception({
            header: "Response.clone",
            message: "Body has already been consumed."
          });
        }
        const clonedResponse = cloneResponse(this.#state);
        return fromInnerResponse(clonedResponse, getHeadersGuard(this.#headers));
      }
      [nodeUtil.inspect.custom](depth, options) {
        if (options.depth === null) {
          options.depth = 2;
        }
        options.colors ??= true;
        const properties = {
          status: this.status,
          statusText: this.statusText,
          headers: this.headers,
          body: this.body,
          bodyUsed: this.bodyUsed,
          ok: this.ok,
          redirected: this.redirected,
          type: this.type,
          url: this.url
        };
        return `Response ${nodeUtil.formatWithOptions(options, properties)}`;
      }
      /**
       * @param {Response} response
       */
      static getResponseHeaders(response) {
        return response.#headers;
      }
      /**
       * @param {Response} response
       * @param {Headers} newHeaders
       */
      static setResponseHeaders(response, newHeaders) {
        response.#headers = newHeaders;
      }
      /**
       * @param {Response} response
       */
      static getResponseState(response) {
        return response.#state;
      }
      /**
       * @param {Response} response
       * @param {any} newState
       */
      static setResponseState(response, newState) {
        response.#state = newState;
      }
    };
    var { getResponseHeaders, setResponseHeaders, getResponseState, setResponseState } = Response;
    Reflect.deleteProperty(Response, "getResponseHeaders");
    Reflect.deleteProperty(Response, "setResponseHeaders");
    Reflect.deleteProperty(Response, "getResponseState");
    Reflect.deleteProperty(Response, "setResponseState");
    mixinBody(Response, getResponseState);
    Object.defineProperties(Response.prototype, {
      type: kEnumerableProperty,
      url: kEnumerableProperty,
      status: kEnumerableProperty,
      ok: kEnumerableProperty,
      redirected: kEnumerableProperty,
      statusText: kEnumerableProperty,
      headers: kEnumerableProperty,
      clone: kEnumerableProperty,
      body: kEnumerableProperty,
      bodyUsed: kEnumerableProperty,
      [Symbol.toStringTag]: {
        value: "Response",
        configurable: true
      }
    });
    Object.defineProperties(Response, {
      json: kEnumerableProperty,
      redirect: kEnumerableProperty,
      error: kEnumerableProperty
    });
    function cloneResponse(response) {
      if (response.internalResponse) {
        return filterResponse(
          cloneResponse(response.internalResponse),
          response.type
        );
      }
      const newResponse = makeResponse({ ...response, body: null });
      if (response.body != null) {
        newResponse.body = cloneBody(newResponse, response.body);
      }
      return newResponse;
    }
    function makeResponse(init) {
      return {
        aborted: false,
        rangeRequested: false,
        timingAllowPassed: false,
        requestIncludesCredentials: false,
        type: "default",
        status: 200,
        timingInfo: null,
        cacheState: "",
        statusText: "",
        ...init,
        headersList: init?.headersList ? new HeadersList(init?.headersList) : new HeadersList(),
        urlList: init?.urlList ? [...init.urlList] : []
      };
    }
    function makeNetworkError(reason) {
      const isError = isErrorLike(reason);
      return makeResponse({
        type: "error",
        status: 0,
        error: isError ? reason : new Error(reason ? String(reason) : reason),
        aborted: reason && reason.name === "AbortError"
      });
    }
    function isNetworkError(response) {
      return (
        // A network error is a response whose type is "error",
        response.type === "error" && // status is 0
        response.status === 0
      );
    }
    function makeFilteredResponse(response, state) {
      state = {
        internalResponse: response,
        ...state
      };
      return new Proxy(response, {
        get(target, p) {
          return p in state ? state[p] : target[p];
        },
        set(target, p, value) {
          assert(!(p in state));
          target[p] = value;
          return true;
        }
      });
    }
    function filterResponse(response, type) {
      if (type === "basic") {
        return makeFilteredResponse(response, {
          type: "basic",
          headersList: response.headersList
        });
      } else if (type === "cors") {
        return makeFilteredResponse(response, {
          type: "cors",
          headersList: response.headersList
        });
      } else if (type === "opaque") {
        return makeFilteredResponse(response, {
          type: "opaque",
          urlList: Object.freeze([]),
          status: 0,
          statusText: "",
          body: null
        });
      } else if (type === "opaqueredirect") {
        return makeFilteredResponse(response, {
          type: "opaqueredirect",
          status: 0,
          statusText: "",
          headersList: [],
          body: null
        });
      } else {
        assert(false);
      }
    }
    function makeAppropriateNetworkError(fetchParams, err = null) {
      assert(isCancelled(fetchParams));
      return isAborted(fetchParams) ? makeNetworkError(Object.assign(new DOMException("The operation was aborted.", "AbortError"), { cause: err })) : makeNetworkError(Object.assign(new DOMException("Request was cancelled."), { cause: err }));
    }
    function initializeResponse(response, init, body) {
      if (init.status !== null && (init.status < 200 || init.status > 599)) {
        throw new RangeError('init["status"] must be in the range of 200 to 599, inclusive.');
      }
      if ("statusText" in init && init.statusText != null) {
        if (!isValidReasonPhrase(String(init.statusText))) {
          throw new TypeError("Invalid statusText");
        }
      }
      if ("status" in init && init.status != null) {
        getResponseState(response).status = init.status;
      }
      if ("statusText" in init && init.statusText != null) {
        getResponseState(response).statusText = init.statusText;
      }
      if ("headers" in init && init.headers != null) {
        fill(getResponseHeaders(response), init.headers);
      }
      if (body) {
        if (nullBodyStatus.includes(response.status)) {
          throw webidl.errors.exception({
            header: "Response constructor",
            message: `Invalid response status code ${response.status}`
          });
        }
        getResponseState(response).body = body.body;
        if (body.type != null && !getResponseState(response).headersList.contains("content-type", true)) {
          getResponseState(response).headersList.append("content-type", body.type, true);
        }
      }
    }
    function fromInnerResponse(innerResponse, guard) {
      const response = new Response(kConstruct);
      setResponseState(response, innerResponse);
      const headers = new Headers(kConstruct);
      setResponseHeaders(response, headers);
      setHeadersList(headers, innerResponse.headersList);
      setHeadersGuard(headers, guard);
      if (hasFinalizationRegistry && innerResponse.body?.stream) {
        streamRegistry.register(response, new WeakRef(innerResponse.body.stream));
      }
      return response;
    }
    webidl.converters.XMLHttpRequestBodyInit = function(V, prefix, name) {
      if (typeof V === "string") {
        return webidl.converters.USVString(V, prefix, name);
      }
      if (webidl.is.Blob(V)) {
        return V;
      }
      if (ArrayBuffer.isView(V) || types.isArrayBuffer(V)) {
        return V;
      }
      if (webidl.is.FormData(V)) {
        return V;
      }
      if (webidl.is.URLSearchParams(V)) {
        return V;
      }
      return webidl.converters.DOMString(V, prefix, name);
    };
    webidl.converters.BodyInit = function(V, prefix, argument) {
      if (webidl.is.ReadableStream(V)) {
        return V;
      }
      if (V?.[Symbol.asyncIterator]) {
        return V;
      }
      return webidl.converters.XMLHttpRequestBodyInit(V, prefix, argument);
    };
    webidl.converters.ResponseInit = webidl.dictionaryConverter([
      {
        key: "status",
        converter: webidl.converters["unsigned short"],
        defaultValue: () => 200
      },
      {
        key: "statusText",
        converter: webidl.converters.ByteString,
        defaultValue: () => ""
      },
      {
        key: "headers",
        converter: webidl.converters.HeadersInit
      }
    ]);
    webidl.is.Response = webidl.util.MakeTypeAssertion(Response);
    module2.exports = {
      isNetworkError,
      makeNetworkError,
      makeResponse,
      makeAppropriateNetworkError,
      filterResponse,
      Response,
      cloneResponse,
      fromInnerResponse,
      getResponseState
    };
  }
});

// node_modules/undici/lib/web/fetch/dispatcher-weakref.js
var require_dispatcher_weakref = __commonJS({
  "node_modules/undici/lib/web/fetch/dispatcher-weakref.js"(exports2, module2) {
    "use strict";
    module2.exports = function() {
      return { WeakRef, FinalizationRegistry };
    };
  }
});

// node_modules/undici/lib/web/fetch/request.js
var require_request2 = __commonJS({
  "node_modules/undici/lib/web/fetch/request.js"(exports2, module2) {
    "use strict";
    var { extractBody, mixinBody, cloneBody, bodyUnusable } = require_body();
    var { Headers, fill: fillHeaders, HeadersList, setHeadersGuard, getHeadersGuard, setHeadersList, getHeadersList } = require_headers();
    var { FinalizationRegistry: FinalizationRegistry2 } = require_dispatcher_weakref()();
    var util = require_util();
    var nodeUtil = require("node:util");
    var {
      isValidHTTPToken,
      sameOrigin,
      environmentSettingsObject
    } = require_util2();
    var {
      forbiddenMethodsSet,
      corsSafeListedMethodsSet,
      referrerPolicy,
      requestRedirect,
      requestMode,
      requestCredentials,
      requestCache,
      requestDuplex
    } = require_constants3();
    var { kEnumerableProperty, normalizedMethodRecordsBase, normalizedMethodRecords } = util;
    var { webidl } = require_webidl();
    var { URLSerializer } = require_data_url();
    var { kConstruct } = require_symbols();
    var assert = require("node:assert");
    var { getMaxListeners, setMaxListeners, defaultMaxListeners } = require("node:events");
    var kAbortController = Symbol("abortController");
    var requestFinalizer = new FinalizationRegistry2(({ signal, abort }) => {
      signal.removeEventListener("abort", abort);
    });
    var dependentControllerMap = /* @__PURE__ */ new WeakMap();
    var abortSignalHasEventHandlerLeakWarning;
    try {
      abortSignalHasEventHandlerLeakWarning = getMaxListeners(new AbortController().signal) > 0;
    } catch {
      abortSignalHasEventHandlerLeakWarning = false;
    }
    function buildAbort(acRef) {
      return abort;
      function abort() {
        const ac = acRef.deref();
        if (ac !== void 0) {
          requestFinalizer.unregister(abort);
          this.removeEventListener("abort", abort);
          ac.abort(this.reason);
          const controllerList = dependentControllerMap.get(ac.signal);
          if (controllerList !== void 0) {
            if (controllerList.size !== 0) {
              for (const ref of controllerList) {
                const ctrl = ref.deref();
                if (ctrl !== void 0) {
                  ctrl.abort(this.reason);
                }
              }
              controllerList.clear();
            }
            dependentControllerMap.delete(ac.signal);
          }
        }
      }
    }
    var patchMethodWarning = false;
    var Request = class _Request {
      /** @type {AbortSignal} */
      #signal;
      /** @type {import('../../dispatcher/dispatcher')} */
      #dispatcher;
      /** @type {Headers} */
      #headers;
      #state;
      // https://fetch.spec.whatwg.org/#dom-request
      constructor(input, init = void 0) {
        webidl.util.markAsUncloneable(this);
        if (input === kConstruct) {
          return;
        }
        const prefix = "Request constructor";
        webidl.argumentLengthCheck(arguments, 1, prefix);
        input = webidl.converters.RequestInfo(input, prefix, "input");
        init = webidl.converters.RequestInit(init, prefix, "init");
        let request = null;
        let fallbackMode = null;
        const baseUrl = environmentSettingsObject.settingsObject.baseUrl;
        let signal = null;
        if (typeof input === "string") {
          this.#dispatcher = init.dispatcher;
          let parsedURL;
          try {
            parsedURL = new URL(input, baseUrl);
          } catch (err) {
            throw new TypeError("Failed to parse URL from " + input, { cause: err });
          }
          if (parsedURL.username || parsedURL.password) {
            throw new TypeError(
              "Request cannot be constructed from a URL that includes credentials: " + input
            );
          }
          request = makeRequest({ urlList: [parsedURL] });
          fallbackMode = "cors";
        } else {
          assert(webidl.is.Request(input));
          request = input.#state;
          signal = input.#signal;
          this.#dispatcher = init.dispatcher || input.#dispatcher;
        }
        const origin = environmentSettingsObject.settingsObject.origin;
        let window = "client";
        if (request.window?.constructor?.name === "EnvironmentSettingsObject" && sameOrigin(request.window, origin)) {
          window = request.window;
        }
        if (init.window != null) {
          throw new TypeError(`'window' option '${window}' must be null`);
        }
        if ("window" in init) {
          window = "no-window";
        }
        request = makeRequest({
          // URL request’s URL.
          // undici implementation note: this is set as the first item in request's urlList in makeRequest
          // method request’s method.
          method: request.method,
          // header list A copy of request’s header list.
          // undici implementation note: headersList is cloned in makeRequest
          headersList: request.headersList,
          // unsafe-request flag Set.
          unsafeRequest: request.unsafeRequest,
          // client This’s relevant settings object.
          client: environmentSettingsObject.settingsObject,
          // window window.
          window,
          // priority request’s priority.
          priority: request.priority,
          // origin request’s origin. The propagation of the origin is only significant for navigation requests
          // being handled by a service worker. In this scenario a request can have an origin that is different
          // from the current client.
          origin: request.origin,
          // referrer request’s referrer.
          referrer: request.referrer,
          // referrer policy request’s referrer policy.
          referrerPolicy: request.referrerPolicy,
          // mode request’s mode.
          mode: request.mode,
          // credentials mode request’s credentials mode.
          credentials: request.credentials,
          // cache mode request’s cache mode.
          cache: request.cache,
          // redirect mode request’s redirect mode.
          redirect: request.redirect,
          // integrity metadata request’s integrity metadata.
          integrity: request.integrity,
          // keepalive request’s keepalive.
          keepalive: request.keepalive,
          // reload-navigation flag request’s reload-navigation flag.
          reloadNavigation: request.reloadNavigation,
          // history-navigation flag request’s history-navigation flag.
          historyNavigation: request.historyNavigation,
          // URL list A clone of request’s URL list.
          urlList: [...request.urlList]
        });
        const initHasKey = Object.keys(init).length !== 0;
        if (initHasKey) {
          if (request.mode === "navigate") {
            request.mode = "same-origin";
          }
          request.reloadNavigation = false;
          request.historyNavigation = false;
          request.origin = "client";
          request.referrer = "client";
          request.referrerPolicy = "";
          request.url = request.urlList[request.urlList.length - 1];
          request.urlList = [request.url];
        }
        if (init.referrer !== void 0) {
          const referrer = init.referrer;
          if (referrer === "") {
            request.referrer = "no-referrer";
          } else {
            let parsedReferrer;
            try {
              parsedReferrer = new URL(referrer, baseUrl);
            } catch (err) {
              throw new TypeError(`Referrer "${referrer}" is not a valid URL.`, { cause: err });
            }
            if (parsedReferrer.protocol === "about:" && parsedReferrer.hostname === "client" || origin && !sameOrigin(parsedReferrer, environmentSettingsObject.settingsObject.baseUrl)) {
              request.referrer = "client";
            } else {
              request.referrer = parsedReferrer;
            }
          }
        }
        if (init.referrerPolicy !== void 0) {
          request.referrerPolicy = init.referrerPolicy;
        }
        let mode;
        if (init.mode !== void 0) {
          mode = init.mode;
        } else {
          mode = fallbackMode;
        }
        if (mode === "navigate") {
          throw webidl.errors.exception({
            header: "Request constructor",
            message: "invalid request mode navigate."
          });
        }
        if (mode != null) {
          request.mode = mode;
        }
        if (init.credentials !== void 0) {
          request.credentials = init.credentials;
        }
        if (init.cache !== void 0) {
          request.cache = init.cache;
        }
        if (request.cache === "only-if-cached" && request.mode !== "same-origin") {
          throw new TypeError(
            "'only-if-cached' can be set only with 'same-origin' mode"
          );
        }
        if (init.redirect !== void 0) {
          request.redirect = init.redirect;
        }
        if (init.integrity != null) {
          request.integrity = String(init.integrity);
        }
        if (init.keepalive !== void 0) {
          request.keepalive = Boolean(init.keepalive);
        }
        if (init.method !== void 0) {
          let method = init.method;
          const mayBeNormalized = normalizedMethodRecords[method];
          if (mayBeNormalized !== void 0) {
            request.method = mayBeNormalized;
          } else {
            if (!isValidHTTPToken(method)) {
              throw new TypeError(`'${method}' is not a valid HTTP method.`);
            }
            const upperCase = method.toUpperCase();
            if (forbiddenMethodsSet.has(upperCase)) {
              throw new TypeError(`'${method}' HTTP method is unsupported.`);
            }
            method = normalizedMethodRecordsBase[upperCase] ?? method;
            request.method = method;
          }
          if (!patchMethodWarning && request.method === "patch") {
            process.emitWarning("Using `patch` is highly likely to result in a `405 Method Not Allowed`. `PATCH` is much more likely to succeed.", {
              code: "UNDICI-FETCH-patch"
            });
            patchMethodWarning = true;
          }
        }
        if (init.signal !== void 0) {
          signal = init.signal;
        }
        this.#state = request;
        const ac = new AbortController();
        this.#signal = ac.signal;
        if (signal != null) {
          if (signal.aborted) {
            ac.abort(signal.reason);
          } else {
            this[kAbortController] = ac;
            const acRef = new WeakRef(ac);
            const abort = buildAbort(acRef);
            if (abortSignalHasEventHandlerLeakWarning && getMaxListeners(signal) === defaultMaxListeners) {
              setMaxListeners(1500, signal);
            }
            util.addAbortListener(signal, abort);
            requestFinalizer.register(ac, { signal, abort }, abort);
          }
        }
        this.#headers = new Headers(kConstruct);
        setHeadersList(this.#headers, request.headersList);
        setHeadersGuard(this.#headers, "request");
        if (mode === "no-cors") {
          if (!corsSafeListedMethodsSet.has(request.method)) {
            throw new TypeError(
              `'${request.method} is unsupported in no-cors mode.`
            );
          }
          setHeadersGuard(this.#headers, "request-no-cors");
        }
        if (initHasKey) {
          const headersList = getHeadersList(this.#headers);
          const headers = init.headers !== void 0 ? init.headers : new HeadersList(headersList);
          headersList.clear();
          if (headers instanceof HeadersList) {
            for (const { name, value } of headers.rawValues()) {
              headersList.append(name, value, false);
            }
            headersList.cookies = headers.cookies;
          } else {
            fillHeaders(this.#headers, headers);
          }
        }
        const inputBody = webidl.is.Request(input) ? input.#state.body : null;
        if ((init.body != null || inputBody != null) && (request.method === "GET" || request.method === "HEAD")) {
          throw new TypeError("Request with GET/HEAD method cannot have body.");
        }
        let initBody = null;
        if (init.body != null) {
          const [extractedBody, contentType] = extractBody(
            init.body,
            request.keepalive
          );
          initBody = extractedBody;
          if (contentType && !getHeadersList(this.#headers).contains("content-type", true)) {
            this.#headers.append("content-type", contentType, true);
          }
        }
        const inputOrInitBody = initBody ?? inputBody;
        if (inputOrInitBody != null && inputOrInitBody.source == null) {
          if (initBody != null && init.duplex == null) {
            throw new TypeError("RequestInit: duplex option is required when sending a body.");
          }
          if (request.mode !== "same-origin" && request.mode !== "cors") {
            throw new TypeError(
              'If request is made from ReadableStream, mode should be "same-origin" or "cors"'
            );
          }
          request.useCORSPreflightFlag = true;
        }
        let finalBody = inputOrInitBody;
        if (initBody == null && inputBody != null) {
          if (bodyUnusable(input.#state)) {
            throw new TypeError(
              "Cannot construct a Request with a Request object that has already been used."
            );
          }
          const identityTransform = new TransformStream();
          inputBody.stream.pipeThrough(identityTransform);
          finalBody = {
            source: inputBody.source,
            length: inputBody.length,
            stream: identityTransform.readable
          };
        }
        this.#state.body = finalBody;
      }
      // Returns request’s HTTP method, which is "GET" by default.
      get method() {
        webidl.brandCheck(this, _Request);
        return this.#state.method;
      }
      // Returns the URL of request as a string.
      get url() {
        webidl.brandCheck(this, _Request);
        return URLSerializer(this.#state.url);
      }
      // Returns a Headers object consisting of the headers associated with request.
      // Note that headers added in the network layer by the user agent will not
      // be accounted for in this object, e.g., the "Host" header.
      get headers() {
        webidl.brandCheck(this, _Request);
        return this.#headers;
      }
      // Returns the kind of resource requested by request, e.g., "document"
      // or "script".
      get destination() {
        webidl.brandCheck(this, _Request);
        return this.#state.destination;
      }
      // Returns the referrer of request. Its value can be a same-origin URL if
      // explicitly set in init, the empty string to indicate no referrer, and
      // "about:client" when defaulting to the global’s default. This is used
      // during fetching to determine the value of the `Referer` header of the
      // request being made.
      get referrer() {
        webidl.brandCheck(this, _Request);
        if (this.#state.referrer === "no-referrer") {
          return "";
        }
        if (this.#state.referrer === "client") {
          return "about:client";
        }
        return this.#state.referrer.toString();
      }
      // Returns the referrer policy associated with request.
      // This is used during fetching to compute the value of the request’s
      // referrer.
      get referrerPolicy() {
        webidl.brandCheck(this, _Request);
        return this.#state.referrerPolicy;
      }
      // Returns the mode associated with request, which is a string indicating
      // whether the request will use CORS, or will be restricted to same-origin
      // URLs.
      get mode() {
        webidl.brandCheck(this, _Request);
        return this.#state.mode;
      }
      // Returns the credentials mode associated with request,
      // which is a string indicating whether credentials will be sent with the
      // request always, never, or only when sent to a same-origin URL.
      get credentials() {
        webidl.brandCheck(this, _Request);
        return this.#state.credentials;
      }
      // Returns the cache mode associated with request,
      // which is a string indicating how the request will
      // interact with the browser’s cache when fetching.
      get cache() {
        webidl.brandCheck(this, _Request);
        return this.#state.cache;
      }
      // Returns the redirect mode associated with request,
      // which is a string indicating how redirects for the
      // request will be handled during fetching. A request
      // will follow redirects by default.
      get redirect() {
        webidl.brandCheck(this, _Request);
        return this.#state.redirect;
      }
      // Returns request’s subresource integrity metadata, which is a
      // cryptographic hash of the resource being fetched. Its value
      // consists of multiple hashes separated by whitespace. [SRI]
      get integrity() {
        webidl.brandCheck(this, _Request);
        return this.#state.integrity;
      }
      // Returns a boolean indicating whether or not request can outlive the
      // global in which it was created.
      get keepalive() {
        webidl.brandCheck(this, _Request);
        return this.#state.keepalive;
      }
      // Returns a boolean indicating whether or not request is for a reload
      // navigation.
      get isReloadNavigation() {
        webidl.brandCheck(this, _Request);
        return this.#state.reloadNavigation;
      }
      // Returns a boolean indicating whether or not request is for a history
      // navigation (a.k.a. back-forward navigation).
      get isHistoryNavigation() {
        webidl.brandCheck(this, _Request);
        return this.#state.historyNavigation;
      }
      // Returns the signal associated with request, which is an AbortSignal
      // object indicating whether or not request has been aborted, and its
      // abort event handler.
      get signal() {
        webidl.brandCheck(this, _Request);
        return this.#signal;
      }
      get body() {
        webidl.brandCheck(this, _Request);
        return this.#state.body ? this.#state.body.stream : null;
      }
      get bodyUsed() {
        webidl.brandCheck(this, _Request);
        return !!this.#state.body && util.isDisturbed(this.#state.body.stream);
      }
      get duplex() {
        webidl.brandCheck(this, _Request);
        return "half";
      }
      // Returns a clone of request.
      clone() {
        webidl.brandCheck(this, _Request);
        if (bodyUnusable(this.#state)) {
          throw new TypeError("unusable");
        }
        const clonedRequest = cloneRequest(this.#state);
        const ac = new AbortController();
        if (this.signal.aborted) {
          ac.abort(this.signal.reason);
        } else {
          let list = dependentControllerMap.get(this.signal);
          if (list === void 0) {
            list = /* @__PURE__ */ new Set();
            dependentControllerMap.set(this.signal, list);
          }
          const acRef = new WeakRef(ac);
          list.add(acRef);
          util.addAbortListener(
            ac.signal,
            buildAbort(acRef)
          );
        }
        return fromInnerRequest(clonedRequest, this.#dispatcher, ac.signal, getHeadersGuard(this.#headers));
      }
      [nodeUtil.inspect.custom](depth, options) {
        if (options.depth === null) {
          options.depth = 2;
        }
        options.colors ??= true;
        const properties = {
          method: this.method,
          url: this.url,
          headers: this.headers,
          destination: this.destination,
          referrer: this.referrer,
          referrerPolicy: this.referrerPolicy,
          mode: this.mode,
          credentials: this.credentials,
          cache: this.cache,
          redirect: this.redirect,
          integrity: this.integrity,
          keepalive: this.keepalive,
          isReloadNavigation: this.isReloadNavigation,
          isHistoryNavigation: this.isHistoryNavigation,
          signal: this.signal
        };
        return `Request ${nodeUtil.formatWithOptions(options, properties)}`;
      }
      /**
       * @param {Request} request
       * @param {AbortSignal} newSignal
       */
      static setRequestSignal(request, newSignal) {
        request.#signal = newSignal;
        return request;
      }
      /**
       * @param {Request} request
       */
      static getRequestDispatcher(request) {
        return request.#dispatcher;
      }
      /**
       * @param {Request} request
       * @param {import('../../dispatcher/dispatcher')} newDispatcher
       */
      static setRequestDispatcher(request, newDispatcher) {
        request.#dispatcher = newDispatcher;
      }
      /**
       * @param {Request} request
       * @param {Headers} newHeaders
       */
      static setRequestHeaders(request, newHeaders) {
        request.#headers = newHeaders;
      }
      /**
       * @param {Request} request
       */
      static getRequestState(request) {
        return request.#state;
      }
      /**
       * @param {Request} request
       * @param {any} newState
       */
      static setRequestState(request, newState) {
        request.#state = newState;
      }
    };
    var { setRequestSignal, getRequestDispatcher, setRequestDispatcher, setRequestHeaders, getRequestState, setRequestState } = Request;
    Reflect.deleteProperty(Request, "setRequestSignal");
    Reflect.deleteProperty(Request, "getRequestDispatcher");
    Reflect.deleteProperty(Request, "setRequestDispatcher");
    Reflect.deleteProperty(Request, "setRequestHeaders");
    Reflect.deleteProperty(Request, "getRequestState");
    Reflect.deleteProperty(Request, "setRequestState");
    mixinBody(Request, getRequestState);
    function makeRequest(init) {
      return {
        method: init.method ?? "GET",
        localURLsOnly: init.localURLsOnly ?? false,
        unsafeRequest: init.unsafeRequest ?? false,
        body: init.body ?? null,
        client: init.client ?? null,
        reservedClient: init.reservedClient ?? null,
        replacesClientId: init.replacesClientId ?? "",
        window: init.window ?? "client",
        keepalive: init.keepalive ?? false,
        serviceWorkers: init.serviceWorkers ?? "all",
        initiator: init.initiator ?? "",
        destination: init.destination ?? "",
        priority: init.priority ?? null,
        origin: init.origin ?? "client",
        policyContainer: init.policyContainer ?? "client",
        referrer: init.referrer ?? "client",
        referrerPolicy: init.referrerPolicy ?? "",
        mode: init.mode ?? "no-cors",
        useCORSPreflightFlag: init.useCORSPreflightFlag ?? false,
        credentials: init.credentials ?? "same-origin",
        useCredentials: init.useCredentials ?? false,
        cache: init.cache ?? "default",
        redirect: init.redirect ?? "follow",
        integrity: init.integrity ?? "",
        cryptoGraphicsNonceMetadata: init.cryptoGraphicsNonceMetadata ?? "",
        parserMetadata: init.parserMetadata ?? "",
        reloadNavigation: init.reloadNavigation ?? false,
        historyNavigation: init.historyNavigation ?? false,
        userActivation: init.userActivation ?? false,
        taintedOrigin: init.taintedOrigin ?? false,
        redirectCount: init.redirectCount ?? 0,
        responseTainting: init.responseTainting ?? "basic",
        preventNoCacheCacheControlHeaderModification: init.preventNoCacheCacheControlHeaderModification ?? false,
        done: init.done ?? false,
        timingAllowFailed: init.timingAllowFailed ?? false,
        urlList: init.urlList,
        url: init.urlList[0],
        headersList: init.headersList ? new HeadersList(init.headersList) : new HeadersList()
      };
    }
    function cloneRequest(request) {
      const newRequest = makeRequest({ ...request, body: null });
      if (request.body != null) {
        newRequest.body = cloneBody(newRequest, request.body);
      }
      return newRequest;
    }
    function fromInnerRequest(innerRequest, dispatcher, signal, guard) {
      const request = new Request(kConstruct);
      setRequestState(request, innerRequest);
      setRequestDispatcher(request, dispatcher);
      setRequestSignal(request, signal);
      const headers = new Headers(kConstruct);
      setRequestHeaders(request, headers);
      setHeadersList(headers, innerRequest.headersList);
      setHeadersGuard(headers, guard);
      return request;
    }
    Object.defineProperties(Request.prototype, {
      method: kEnumerableProperty,
      url: kEnumerableProperty,
      headers: kEnumerableProperty,
      redirect: kEnumerableProperty,
      clone: kEnumerableProperty,
      signal: kEnumerableProperty,
      duplex: kEnumerableProperty,
      destination: kEnumerableProperty,
      body: kEnumerableProperty,
      bodyUsed: kEnumerableProperty,
      isHistoryNavigation: kEnumerableProperty,
      isReloadNavigation: kEnumerableProperty,
      keepalive: kEnumerableProperty,
      integrity: kEnumerableProperty,
      cache: kEnumerableProperty,
      credentials: kEnumerableProperty,
      attribute: kEnumerableProperty,
      referrerPolicy: kEnumerableProperty,
      referrer: kEnumerableProperty,
      mode: kEnumerableProperty,
      [Symbol.toStringTag]: {
        value: "Request",
        configurable: true
      }
    });
    webidl.is.Request = webidl.util.MakeTypeAssertion(Request);
    webidl.converters.RequestInfo = function(V, prefix, argument) {
      if (typeof V === "string") {
        return webidl.converters.USVString(V);
      }
      if (webidl.is.Request(V)) {
        return V;
      }
      return webidl.converters.USVString(V);
    };
    webidl.converters.RequestInit = webidl.dictionaryConverter([
      {
        key: "method",
        converter: webidl.converters.ByteString
      },
      {
        key: "headers",
        converter: webidl.converters.HeadersInit
      },
      {
        key: "body",
        converter: webidl.nullableConverter(
          webidl.converters.BodyInit
        )
      },
      {
        key: "referrer",
        converter: webidl.converters.USVString
      },
      {
        key: "referrerPolicy",
        converter: webidl.converters.DOMString,
        // https://w3c.github.io/webappsec-referrer-policy/#referrer-policy
        allowedValues: referrerPolicy
      },
      {
        key: "mode",
        converter: webidl.converters.DOMString,
        // https://fetch.spec.whatwg.org/#concept-request-mode
        allowedValues: requestMode
      },
      {
        key: "credentials",
        converter: webidl.converters.DOMString,
        // https://fetch.spec.whatwg.org/#requestcredentials
        allowedValues: requestCredentials
      },
      {
        key: "cache",
        converter: webidl.converters.DOMString,
        // https://fetch.spec.whatwg.org/#requestcache
        allowedValues: requestCache
      },
      {
        key: "redirect",
        converter: webidl.converters.DOMString,
        // https://fetch.spec.whatwg.org/#requestredirect
        allowedValues: requestRedirect
      },
      {
        key: "integrity",
        converter: webidl.converters.DOMString
      },
      {
        key: "keepalive",
        converter: webidl.converters.boolean
      },
      {
        key: "signal",
        converter: webidl.nullableConverter(
          (signal) => webidl.converters.AbortSignal(
            signal,
            "RequestInit",
            "signal"
          )
        )
      },
      {
        key: "window",
        converter: webidl.converters.any
      },
      {
        key: "duplex",
        converter: webidl.converters.DOMString,
        allowedValues: requestDuplex
      },
      {
        key: "dispatcher",
        // undici specific option
        converter: webidl.converters.any
      }
    ]);
    module2.exports = {
      Request,
      makeRequest,
      fromInnerRequest,
      cloneRequest,
      getRequestDispatcher,
      getRequestState
    };
  }
});

// node_modules/undici/lib/web/fetch/index.js
var require_fetch = __commonJS({
  "node_modules/undici/lib/web/fetch/index.js"(exports2, module2) {
    "use strict";
    var {
      makeNetworkError,
      makeAppropriateNetworkError,
      filterResponse,
      makeResponse,
      fromInnerResponse,
      getResponseState
    } = require_response();
    var { HeadersList } = require_headers();
    var { Request, cloneRequest, getRequestDispatcher, getRequestState } = require_request2();
    var zlib = require("node:zlib");
    var {
      bytesMatch,
      makePolicyContainer,
      clonePolicyContainer,
      requestBadPort,
      TAOCheck,
      appendRequestOriginHeader,
      responseLocationURL,
      requestCurrentURL,
      setRequestReferrerPolicyOnRedirect,
      tryUpgradeRequestToAPotentiallyTrustworthyURL,
      createOpaqueTimingInfo,
      appendFetchMetadata,
      corsCheck,
      crossOriginResourcePolicyCheck,
      determineRequestsReferrer,
      coarsenedSharedCurrentTime,
      createDeferredPromise,
      sameOrigin,
      isCancelled,
      isAborted,
      isErrorLike,
      fullyReadBody,
      readableStreamClose,
      isomorphicEncode,
      urlIsLocal,
      urlIsHttpHttpsScheme,
      urlHasHttpsScheme,
      clampAndCoarsenConnectionTimingInfo,
      simpleRangeHeaderValue,
      buildContentRange,
      createInflate,
      extractMimeType
    } = require_util2();
    var assert = require("node:assert");
    var { safelyExtractBody, extractBody } = require_body();
    var {
      redirectStatusSet,
      nullBodyStatus,
      safeMethodsSet,
      requestBodyHeader,
      subresourceSet
    } = require_constants3();
    var EE = require("node:events");
    var { Readable, pipeline, finished, isErrored, isReadable } = require("node:stream");
    var { addAbortListener, bufferToLowerCasedHeaderName } = require_util();
    var { dataURLProcessor, serializeAMimeType, minimizeSupportedMimeType } = require_data_url();
    var { getGlobalDispatcher } = require_global2();
    var { webidl } = require_webidl();
    var { STATUS_CODES } = require("node:http");
    var GET_OR_HEAD = ["GET", "HEAD"];
    var defaultUserAgent = typeof __UNDICI_IS_NODE__ !== "undefined" || typeof esbuildDetection !== "undefined" ? "node" : "undici";
    var resolveObjectURL;
    var Fetch = class extends EE {
      constructor(dispatcher) {
        super();
        this.dispatcher = dispatcher;
        this.connection = null;
        this.dump = false;
        this.state = "ongoing";
      }
      terminate(reason) {
        if (this.state !== "ongoing") {
          return;
        }
        this.state = "terminated";
        this.connection?.destroy(reason);
        this.emit("terminated", reason);
      }
      // https://fetch.spec.whatwg.org/#fetch-controller-abort
      abort(error) {
        if (this.state !== "ongoing") {
          return;
        }
        this.state = "aborted";
        if (!error) {
          error = new DOMException("The operation was aborted.", "AbortError");
        }
        this.serializedAbortReason = error;
        this.connection?.destroy(error);
        this.emit("terminated", error);
      }
    };
    function handleFetchDone(response) {
      finalizeAndReportTiming(response, "fetch");
    }
    function fetch2(input, init = void 0) {
      webidl.argumentLengthCheck(arguments, 1, "globalThis.fetch");
      let p = createDeferredPromise();
      let requestObject;
      try {
        requestObject = new Request(input, init);
      } catch (e) {
        p.reject(e);
        return p.promise;
      }
      const request = getRequestState(requestObject);
      if (requestObject.signal.aborted) {
        abortFetch(p, request, null, requestObject.signal.reason);
        return p.promise;
      }
      const globalObject = request.client.globalObject;
      if (globalObject?.constructor?.name === "ServiceWorkerGlobalScope") {
        request.serviceWorkers = "none";
      }
      let responseObject = null;
      let locallyAborted = false;
      let controller = null;
      addAbortListener(
        requestObject.signal,
        () => {
          locallyAborted = true;
          assert(controller != null);
          controller.abort(requestObject.signal.reason);
          const realResponse = responseObject?.deref();
          abortFetch(p, request, realResponse, requestObject.signal.reason);
        }
      );
      const processResponse = (response) => {
        if (locallyAborted) {
          return;
        }
        if (response.aborted) {
          abortFetch(p, request, responseObject, controller.serializedAbortReason);
          return;
        }
        if (response.type === "error") {
          p.reject(new TypeError("fetch failed", { cause: response.error }));
          return;
        }
        responseObject = new WeakRef(fromInnerResponse(response, "immutable"));
        p.resolve(responseObject.deref());
        p = null;
      };
      controller = fetching({
        request,
        processResponseEndOfBody: handleFetchDone,
        processResponse,
        dispatcher: getRequestDispatcher(requestObject)
        // undici
      });
      return p.promise;
    }
    function finalizeAndReportTiming(response, initiatorType = "other") {
      if (response.type === "error" && response.aborted) {
        return;
      }
      if (!response.urlList?.length) {
        return;
      }
      const originalURL = response.urlList[0];
      let timingInfo = response.timingInfo;
      let cacheState = response.cacheState;
      if (!urlIsHttpHttpsScheme(originalURL)) {
        return;
      }
      if (timingInfo === null) {
        return;
      }
      if (!response.timingAllowPassed) {
        timingInfo = createOpaqueTimingInfo({
          startTime: timingInfo.startTime
        });
        cacheState = "";
      }
      timingInfo.endTime = coarsenedSharedCurrentTime();
      response.timingInfo = timingInfo;
      markResourceTiming(
        timingInfo,
        originalURL.href,
        initiatorType,
        globalThis,
        cacheState,
        "",
        // bodyType
        response.status
      );
    }
    var markResourceTiming = performance.markResourceTiming;
    function abortFetch(p, request, responseObject, error) {
      if (p) {
        p.reject(error);
      }
      if (request.body?.stream != null && isReadable(request.body.stream)) {
        request.body.stream.cancel(error).catch((err) => {
          if (err.code === "ERR_INVALID_STATE") {
            return;
          }
          throw err;
        });
      }
      if (responseObject == null) {
        return;
      }
      const response = getResponseState(responseObject);
      if (response.body?.stream != null && isReadable(response.body.stream)) {
        response.body.stream.cancel(error).catch((err) => {
          if (err.code === "ERR_INVALID_STATE") {
            return;
          }
          throw err;
        });
      }
    }
    function fetching({
      request,
      processRequestBodyChunkLength,
      processRequestEndOfBody,
      processResponse,
      processResponseEndOfBody,
      processResponseConsumeBody,
      useParallelQueue = false,
      dispatcher = getGlobalDispatcher()
      // undici
    }) {
      assert(dispatcher);
      let taskDestination = null;
      let crossOriginIsolatedCapability = false;
      if (request.client != null) {
        taskDestination = request.client.globalObject;
        crossOriginIsolatedCapability = request.client.crossOriginIsolatedCapability;
      }
      const currentTime = coarsenedSharedCurrentTime(crossOriginIsolatedCapability);
      const timingInfo = createOpaqueTimingInfo({
        startTime: currentTime
      });
      const fetchParams = {
        controller: new Fetch(dispatcher),
        request,
        timingInfo,
        processRequestBodyChunkLength,
        processRequestEndOfBody,
        processResponse,
        processResponseConsumeBody,
        processResponseEndOfBody,
        taskDestination,
        crossOriginIsolatedCapability
      };
      assert(!request.body || request.body.stream);
      if (request.window === "client") {
        request.window = request.client?.globalObject?.constructor?.name === "Window" ? request.client : "no-window";
      }
      if (request.origin === "client") {
        request.origin = request.client.origin;
      }
      if (request.policyContainer === "client") {
        if (request.client != null) {
          request.policyContainer = clonePolicyContainer(
            request.client.policyContainer
          );
        } else {
          request.policyContainer = makePolicyContainer();
        }
      }
      if (!request.headersList.contains("accept", true)) {
        const value = "*/*";
        request.headersList.append("accept", value, true);
      }
      if (!request.headersList.contains("accept-language", true)) {
        request.headersList.append("accept-language", "*", true);
      }
      if (request.priority === null) {
      }
      if (subresourceSet.has(request.destination)) {
      }
      mainFetch(fetchParams).catch((err) => {
        fetchParams.controller.terminate(err);
      });
      return fetchParams.controller;
    }
    async function mainFetch(fetchParams, recursive = false) {
      const request = fetchParams.request;
      let response = null;
      if (request.localURLsOnly && !urlIsLocal(requestCurrentURL(request))) {
        response = makeNetworkError("local URLs only");
      }
      tryUpgradeRequestToAPotentiallyTrustworthyURL(request);
      if (requestBadPort(request) === "blocked") {
        response = makeNetworkError("bad port");
      }
      if (request.referrerPolicy === "") {
        request.referrerPolicy = request.policyContainer.referrerPolicy;
      }
      if (request.referrer !== "no-referrer") {
        request.referrer = determineRequestsReferrer(request);
      }
      if (response === null) {
        const currentURL = requestCurrentURL(request);
        if (
          // - request’s current URL’s origin is same origin with request’s origin,
          //   and request’s response tainting is "basic"
          sameOrigin(currentURL, request.url) && request.responseTainting === "basic" || // request’s current URL’s scheme is "data"
          currentURL.protocol === "data:" || // - request’s mode is "navigate" or "websocket"
          (request.mode === "navigate" || request.mode === "websocket")
        ) {
          request.responseTainting = "basic";
          response = await schemeFetch(fetchParams);
        } else if (request.mode === "same-origin") {
          response = makeNetworkError('request mode cannot be "same-origin"');
        } else if (request.mode === "no-cors") {
          if (request.redirect !== "follow") {
            response = makeNetworkError(
              'redirect mode cannot be "follow" for "no-cors" request'
            );
          } else {
            request.responseTainting = "opaque";
            response = await schemeFetch(fetchParams);
          }
        } else if (!urlIsHttpHttpsScheme(requestCurrentURL(request))) {
          response = makeNetworkError("URL scheme must be a HTTP(S) scheme");
        } else {
          request.responseTainting = "cors";
          response = await httpFetch(fetchParams);
        }
      }
      if (recursive) {
        return response;
      }
      if (response.status !== 0 && !response.internalResponse) {
        if (request.responseTainting === "cors") {
        }
        if (request.responseTainting === "basic") {
          response = filterResponse(response, "basic");
        } else if (request.responseTainting === "cors") {
          response = filterResponse(response, "cors");
        } else if (request.responseTainting === "opaque") {
          response = filterResponse(response, "opaque");
        } else {
          assert(false);
        }
      }
      let internalResponse = response.status === 0 ? response : response.internalResponse;
      if (internalResponse.urlList.length === 0) {
        internalResponse.urlList.push(...request.urlList);
      }
      if (!request.timingAllowFailed) {
        response.timingAllowPassed = true;
      }
      if (response.type === "opaque" && internalResponse.status === 206 && internalResponse.rangeRequested && !request.headers.contains("range", true)) {
        response = internalResponse = makeNetworkError();
      }
      if (response.status !== 0 && (request.method === "HEAD" || request.method === "CONNECT" || nullBodyStatus.includes(internalResponse.status))) {
        internalResponse.body = null;
        fetchParams.controller.dump = true;
      }
      if (request.integrity) {
        const processBodyError = (reason) => fetchFinale(fetchParams, makeNetworkError(reason));
        if (request.responseTainting === "opaque" || response.body == null) {
          processBodyError(response.error);
          return;
        }
        const processBody = (bytes) => {
          if (!bytesMatch(bytes, request.integrity)) {
            processBodyError("integrity mismatch");
            return;
          }
          response.body = safelyExtractBody(bytes)[0];
          fetchFinale(fetchParams, response);
        };
        await fullyReadBody(response.body, processBody, processBodyError);
      } else {
        fetchFinale(fetchParams, response);
      }
    }
    function schemeFetch(fetchParams) {
      if (isCancelled(fetchParams) && fetchParams.request.redirectCount === 0) {
        return Promise.resolve(makeAppropriateNetworkError(fetchParams));
      }
      const { request } = fetchParams;
      const { protocol: scheme } = requestCurrentURL(request);
      switch (scheme) {
        case "about:": {
          return Promise.resolve(makeNetworkError("about scheme is not supported"));
        }
        case "blob:": {
          if (!resolveObjectURL) {
            resolveObjectURL = require("node:buffer").resolveObjectURL;
          }
          const blobURLEntry = requestCurrentURL(request);
          if (blobURLEntry.search.length !== 0) {
            return Promise.resolve(makeNetworkError("NetworkError when attempting to fetch resource."));
          }
          const blob = resolveObjectURL(blobURLEntry.toString());
          if (request.method !== "GET" || !webidl.is.Blob(blob)) {
            return Promise.resolve(makeNetworkError("invalid method"));
          }
          const response = makeResponse();
          const fullLength = blob.size;
          const serializedFullLength = isomorphicEncode(`${fullLength}`);
          const type = blob.type;
          if (!request.headersList.contains("range", true)) {
            const bodyWithType = extractBody(blob);
            response.statusText = "OK";
            response.body = bodyWithType[0];
            response.headersList.set("content-length", serializedFullLength, true);
            response.headersList.set("content-type", type, true);
          } else {
            response.rangeRequested = true;
            const rangeHeader = request.headersList.get("range", true);
            const rangeValue = simpleRangeHeaderValue(rangeHeader, true);
            if (rangeValue === "failure") {
              return Promise.resolve(makeNetworkError("failed to fetch the data URL"));
            }
            let { rangeStartValue: rangeStart, rangeEndValue: rangeEnd } = rangeValue;
            if (rangeStart === null) {
              rangeStart = fullLength - rangeEnd;
              rangeEnd = rangeStart + rangeEnd - 1;
            } else {
              if (rangeStart >= fullLength) {
                return Promise.resolve(makeNetworkError("Range start is greater than the blob's size."));
              }
              if (rangeEnd === null || rangeEnd >= fullLength) {
                rangeEnd = fullLength - 1;
              }
            }
            const slicedBlob = blob.slice(rangeStart, rangeEnd, type);
            const slicedBodyWithType = extractBody(slicedBlob);
            response.body = slicedBodyWithType[0];
            const serializedSlicedLength = isomorphicEncode(`${slicedBlob.size}`);
            const contentRange = buildContentRange(rangeStart, rangeEnd, fullLength);
            response.status = 206;
            response.statusText = "Partial Content";
            response.headersList.set("content-length", serializedSlicedLength, true);
            response.headersList.set("content-type", type, true);
            response.headersList.set("content-range", contentRange, true);
          }
          return Promise.resolve(response);
        }
        case "data:": {
          const currentURL = requestCurrentURL(request);
          const dataURLStruct = dataURLProcessor(currentURL);
          if (dataURLStruct === "failure") {
            return Promise.resolve(makeNetworkError("failed to fetch the data URL"));
          }
          const mimeType = serializeAMimeType(dataURLStruct.mimeType);
          return Promise.resolve(makeResponse({
            statusText: "OK",
            headersList: [
              ["content-type", { name: "Content-Type", value: mimeType }]
            ],
            body: safelyExtractBody(dataURLStruct.body)[0]
          }));
        }
        case "file:": {
          return Promise.resolve(makeNetworkError("not implemented... yet..."));
        }
        case "http:":
        case "https:": {
          return httpFetch(fetchParams).catch((err) => makeNetworkError(err));
        }
        default: {
          return Promise.resolve(makeNetworkError("unknown scheme"));
        }
      }
    }
    function finalizeResponse(fetchParams, response) {
      fetchParams.request.done = true;
      if (fetchParams.processResponseDone != null) {
        queueMicrotask(() => fetchParams.processResponseDone(response));
      }
    }
    function fetchFinale(fetchParams, response) {
      let timingInfo = fetchParams.timingInfo;
      const processResponseEndOfBody = () => {
        const unsafeEndTime = Date.now();
        if (fetchParams.request.destination === "document") {
          fetchParams.controller.fullTimingInfo = timingInfo;
        }
        fetchParams.controller.reportTimingSteps = () => {
          if (!urlIsHttpHttpsScheme(fetchParams.request.url)) {
            return;
          }
          timingInfo.endTime = unsafeEndTime;
          let cacheState = response.cacheState;
          const bodyInfo = response.bodyInfo;
          if (!response.timingAllowPassed) {
            timingInfo = createOpaqueTimingInfo(timingInfo);
            cacheState = "";
          }
          let responseStatus = 0;
          if (fetchParams.request.mode !== "navigator" || !response.hasCrossOriginRedirects) {
            responseStatus = response.status;
            const mimeType = extractMimeType(response.headersList);
            if (mimeType !== "failure") {
              bodyInfo.contentType = minimizeSupportedMimeType(mimeType);
            }
          }
          if (fetchParams.request.initiatorType != null) {
            markResourceTiming(timingInfo, fetchParams.request.url.href, fetchParams.request.initiatorType, globalThis, cacheState, bodyInfo, responseStatus);
          }
        };
        const processResponseEndOfBodyTask = () => {
          fetchParams.request.done = true;
          if (fetchParams.processResponseEndOfBody != null) {
            queueMicrotask(() => fetchParams.processResponseEndOfBody(response));
          }
          if (fetchParams.request.initiatorType != null) {
            fetchParams.controller.reportTimingSteps();
          }
        };
        queueMicrotask(() => processResponseEndOfBodyTask());
      };
      if (fetchParams.processResponse != null) {
        queueMicrotask(() => {
          fetchParams.processResponse(response);
          fetchParams.processResponse = null;
        });
      }
      const internalResponse = response.type === "error" ? response : response.internalResponse ?? response;
      if (internalResponse.body == null) {
        processResponseEndOfBody();
      } else {
        finished(internalResponse.body.stream, () => {
          processResponseEndOfBody();
        });
      }
    }
    async function httpFetch(fetchParams) {
      const request = fetchParams.request;
      let response = null;
      let actualResponse = null;
      const timingInfo = fetchParams.timingInfo;
      if (request.serviceWorkers === "all") {
      }
      if (response === null) {
        if (request.redirect === "follow") {
          request.serviceWorkers = "none";
        }
        actualResponse = response = await httpNetworkOrCacheFetch(fetchParams);
        if (request.responseTainting === "cors" && corsCheck(request, response) === "failure") {
          return makeNetworkError("cors failure");
        }
        if (TAOCheck(request, response) === "failure") {
          request.timingAllowFailed = true;
        }
      }
      if ((request.responseTainting === "opaque" || response.type === "opaque") && crossOriginResourcePolicyCheck(
        request.origin,
        request.client,
        request.destination,
        actualResponse
      ) === "blocked") {
        return makeNetworkError("blocked");
      }
      if (redirectStatusSet.has(actualResponse.status)) {
        if (request.redirect !== "manual") {
          fetchParams.controller.connection.destroy(void 0, false);
        }
        if (request.redirect === "error") {
          response = makeNetworkError("unexpected redirect");
        } else if (request.redirect === "manual") {
          response = actualResponse;
        } else if (request.redirect === "follow") {
          response = await httpRedirectFetch(fetchParams, response);
        } else {
          assert(false);
        }
      }
      response.timingInfo = timingInfo;
      return response;
    }
    function httpRedirectFetch(fetchParams, response) {
      const request = fetchParams.request;
      const actualResponse = response.internalResponse ? response.internalResponse : response;
      let locationURL;
      try {
        locationURL = responseLocationURL(
          actualResponse,
          requestCurrentURL(request).hash
        );
        if (locationURL == null) {
          return response;
        }
      } catch (err) {
        return Promise.resolve(makeNetworkError(err));
      }
      if (!urlIsHttpHttpsScheme(locationURL)) {
        return Promise.resolve(makeNetworkError("URL scheme must be a HTTP(S) scheme"));
      }
      if (request.redirectCount === 20) {
        return Promise.resolve(makeNetworkError("redirect count exceeded"));
      }
      request.redirectCount += 1;
      if (request.mode === "cors" && (locationURL.username || locationURL.password) && !sameOrigin(request, locationURL)) {
        return Promise.resolve(makeNetworkError('cross origin not allowed for request mode "cors"'));
      }
      if (request.responseTainting === "cors" && (locationURL.username || locationURL.password)) {
        return Promise.resolve(makeNetworkError(
          'URL cannot contain credentials for request mode "cors"'
        ));
      }
      if (actualResponse.status !== 303 && request.body != null && request.body.source == null) {
        return Promise.resolve(makeNetworkError());
      }
      if ([301, 302].includes(actualResponse.status) && request.method === "POST" || actualResponse.status === 303 && !GET_OR_HEAD.includes(request.method)) {
        request.method = "GET";
        request.body = null;
        for (const headerName of requestBodyHeader) {
          request.headersList.delete(headerName);
        }
      }
      if (!sameOrigin(requestCurrentURL(request), locationURL)) {
        request.headersList.delete("authorization", true);
        request.headersList.delete("proxy-authorization", true);
        request.headersList.delete("cookie", true);
        request.headersList.delete("host", true);
      }
      if (request.body != null) {
        assert(request.body.source != null);
        request.body = safelyExtractBody(request.body.source)[0];
      }
      const timingInfo = fetchParams.timingInfo;
      timingInfo.redirectEndTime = timingInfo.postRedirectStartTime = coarsenedSharedCurrentTime(fetchParams.crossOriginIsolatedCapability);
      if (timingInfo.redirectStartTime === 0) {
        timingInfo.redirectStartTime = timingInfo.startTime;
      }
      request.urlList.push(locationURL);
      setRequestReferrerPolicyOnRedirect(request, actualResponse);
      return mainFetch(fetchParams, true);
    }
    async function httpNetworkOrCacheFetch(fetchParams, isAuthenticationFetch = false, isNewConnectionFetch = false) {
      const request = fetchParams.request;
      let httpFetchParams = null;
      let httpRequest = null;
      let response = null;
      const httpCache = null;
      const revalidatingFlag = false;
      if (request.window === "no-window" && request.redirect === "error") {
        httpFetchParams = fetchParams;
        httpRequest = request;
      } else {
        httpRequest = cloneRequest(request);
        httpFetchParams = { ...fetchParams };
        httpFetchParams.request = httpRequest;
      }
      const includeCredentials = request.credentials === "include" || request.credentials === "same-origin" && request.responseTainting === "basic";
      const contentLength = httpRequest.body ? httpRequest.body.length : null;
      let contentLengthHeaderValue = null;
      if (httpRequest.body == null && ["POST", "PUT"].includes(httpRequest.method)) {
        contentLengthHeaderValue = "0";
      }
      if (contentLength != null) {
        contentLengthHeaderValue = isomorphicEncode(`${contentLength}`);
      }
      if (contentLengthHeaderValue != null) {
        httpRequest.headersList.append("content-length", contentLengthHeaderValue, true);
      }
      if (contentLength != null && httpRequest.keepalive) {
      }
      if (webidl.is.URL(httpRequest.referrer)) {
        httpRequest.headersList.append("referer", isomorphicEncode(httpRequest.referrer.href), true);
      }
      appendRequestOriginHeader(httpRequest);
      appendFetchMetadata(httpRequest);
      if (!httpRequest.headersList.contains("user-agent", true)) {
        httpRequest.headersList.append("user-agent", defaultUserAgent, true);
      }
      if (httpRequest.cache === "default" && (httpRequest.headersList.contains("if-modified-since", true) || httpRequest.headersList.contains("if-none-match", true) || httpRequest.headersList.contains("if-unmodified-since", true) || httpRequest.headersList.contains("if-match", true) || httpRequest.headersList.contains("if-range", true))) {
        httpRequest.cache = "no-store";
      }
      if (httpRequest.cache === "no-cache" && !httpRequest.preventNoCacheCacheControlHeaderModification && !httpRequest.headersList.contains("cache-control", true)) {
        httpRequest.headersList.append("cache-control", "max-age=0", true);
      }
      if (httpRequest.cache === "no-store" || httpRequest.cache === "reload") {
        if (!httpRequest.headersList.contains("pragma", true)) {
          httpRequest.headersList.append("pragma", "no-cache", true);
        }
        if (!httpRequest.headersList.contains("cache-control", true)) {
          httpRequest.headersList.append("cache-control", "no-cache", true);
        }
      }
      if (httpRequest.headersList.contains("range", true)) {
        httpRequest.headersList.append("accept-encoding", "identity", true);
      }
      if (!httpRequest.headersList.contains("accept-encoding", true)) {
        if (urlHasHttpsScheme(requestCurrentURL(httpRequest))) {
          httpRequest.headersList.append("accept-encoding", "br, gzip, deflate", true);
        } else {
          httpRequest.headersList.append("accept-encoding", "gzip, deflate", true);
        }
      }
      httpRequest.headersList.delete("host", true);
      if (includeCredentials) {
      }
      if (httpCache == null) {
        httpRequest.cache = "no-store";
      }
      if (httpRequest.cache !== "no-store" && httpRequest.cache !== "reload") {
      }
      if (response == null) {
        if (httpRequest.cache === "only-if-cached") {
          return makeNetworkError("only if cached");
        }
        const forwardResponse = await httpNetworkFetch(
          httpFetchParams,
          includeCredentials,
          isNewConnectionFetch
        );
        if (!safeMethodsSet.has(httpRequest.method) && forwardResponse.status >= 200 && forwardResponse.status <= 399) {
        }
        if (revalidatingFlag && forwardResponse.status === 304) {
        }
        if (response == null) {
          response = forwardResponse;
        }
      }
      response.urlList = [...httpRequest.urlList];
      if (httpRequest.headersList.contains("range", true)) {
        response.rangeRequested = true;
      }
      response.requestIncludesCredentials = includeCredentials;
      if (response.status === 407) {
        if (request.window === "no-window") {
          return makeNetworkError();
        }
        if (isCancelled(fetchParams)) {
          return makeAppropriateNetworkError(fetchParams);
        }
        return makeNetworkError("proxy authentication required");
      }
      if (
        // response’s status is 421
        response.status === 421 && // isNewConnectionFetch is false
        !isNewConnectionFetch && // request’s body is null, or request’s body is non-null and request’s body’s source is non-null
        (request.body == null || request.body.source != null)
      ) {
        if (isCancelled(fetchParams)) {
          return makeAppropriateNetworkError(fetchParams);
        }
        fetchParams.controller.connection.destroy();
        response = await httpNetworkOrCacheFetch(
          fetchParams,
          isAuthenticationFetch,
          true
        );
      }
      if (isAuthenticationFetch) {
      }
      return response;
    }
    async function httpNetworkFetch(fetchParams, includeCredentials = false, forceNewConnection = false) {
      assert(!fetchParams.controller.connection || fetchParams.controller.connection.destroyed);
      fetchParams.controller.connection = {
        abort: null,
        destroyed: false,
        destroy(err, abort = true) {
          if (!this.destroyed) {
            this.destroyed = true;
            if (abort) {
              this.abort?.(err ?? new DOMException("The operation was aborted.", "AbortError"));
            }
          }
        }
      };
      const request = fetchParams.request;
      let response = null;
      const timingInfo = fetchParams.timingInfo;
      const httpCache = null;
      if (httpCache == null) {
        request.cache = "no-store";
      }
      const newConnection = forceNewConnection ? "yes" : "no";
      if (request.mode === "websocket") {
      } else {
      }
      let requestBody = null;
      if (request.body == null && fetchParams.processRequestEndOfBody) {
        queueMicrotask(() => fetchParams.processRequestEndOfBody());
      } else if (request.body != null) {
        const processBodyChunk = async function* (bytes) {
          if (isCancelled(fetchParams)) {
            return;
          }
          yield bytes;
          fetchParams.processRequestBodyChunkLength?.(bytes.byteLength);
        };
        const processEndOfBody = () => {
          if (isCancelled(fetchParams)) {
            return;
          }
          if (fetchParams.processRequestEndOfBody) {
            fetchParams.processRequestEndOfBody();
          }
        };
        const processBodyError = (e) => {
          if (isCancelled(fetchParams)) {
            return;
          }
          if (e.name === "AbortError") {
            fetchParams.controller.abort();
          } else {
            fetchParams.controller.terminate(e);
          }
        };
        requestBody = async function* () {
          try {
            for await (const bytes of request.body.stream) {
              yield* processBodyChunk(bytes);
            }
            processEndOfBody();
          } catch (err) {
            processBodyError(err);
          }
        }();
      }
      try {
        const { body, status, statusText, headersList, socket } = await dispatch({ body: requestBody });
        if (socket) {
          response = makeResponse({ status, statusText, headersList, socket });
        } else {
          const iterator = body[Symbol.asyncIterator]();
          fetchParams.controller.next = () => iterator.next();
          response = makeResponse({ status, statusText, headersList });
        }
      } catch (err) {
        if (err.name === "AbortError") {
          fetchParams.controller.connection.destroy();
          return makeAppropriateNetworkError(fetchParams, err);
        }
        return makeNetworkError(err);
      }
      const pullAlgorithm = () => {
        return fetchParams.controller.resume();
      };
      const cancelAlgorithm = (reason) => {
        if (!isCancelled(fetchParams)) {
          fetchParams.controller.abort(reason);
        }
      };
      const stream = new ReadableStream(
        {
          async start(controller) {
            fetchParams.controller.controller = controller;
          },
          async pull(controller) {
            await pullAlgorithm(controller);
          },
          async cancel(reason) {
            await cancelAlgorithm(reason);
          },
          type: "bytes"
        }
      );
      response.body = { stream, source: null, length: null };
      if (!fetchParams.controller.resume) {
        fetchParams.controller.on("terminated", onAborted);
      }
      fetchParams.controller.resume = async () => {
        while (true) {
          let bytes;
          let isFailure;
          try {
            const { done, value } = await fetchParams.controller.next();
            if (isAborted(fetchParams)) {
              break;
            }
            bytes = done ? void 0 : value;
          } catch (err) {
            if (fetchParams.controller.ended && !timingInfo.encodedBodySize) {
              bytes = void 0;
            } else {
              bytes = err;
              isFailure = true;
            }
          }
          if (bytes === void 0) {
            readableStreamClose(fetchParams.controller.controller);
            finalizeResponse(fetchParams, response);
            return;
          }
          timingInfo.decodedBodySize += bytes?.byteLength ?? 0;
          if (isFailure) {
            fetchParams.controller.terminate(bytes);
            return;
          }
          const buffer = new Uint8Array(bytes);
          if (buffer.byteLength) {
            fetchParams.controller.controller.enqueue(buffer);
          }
          if (isErrored(stream)) {
            fetchParams.controller.terminate();
            return;
          }
          if (fetchParams.controller.controller.desiredSize <= 0) {
            return;
          }
        }
      };
      function onAborted(reason) {
        if (isAborted(fetchParams)) {
          response.aborted = true;
          if (isReadable(stream)) {
            fetchParams.controller.controller.error(
              fetchParams.controller.serializedAbortReason
            );
          }
        } else {
          if (isReadable(stream)) {
            fetchParams.controller.controller.error(new TypeError("terminated", {
              cause: isErrorLike(reason) ? reason : void 0
            }));
          }
        }
        fetchParams.controller.connection.destroy();
      }
      return response;
      function dispatch({ body }) {
        const url = requestCurrentURL(request);
        const agent = fetchParams.controller.dispatcher;
        return new Promise((resolve, reject) => agent.dispatch(
          {
            path: url.pathname + url.search,
            origin: url.origin,
            method: request.method,
            body: agent.isMockActive ? request.body && (request.body.source || request.body.stream) : body,
            headers: request.headersList.entries,
            maxRedirections: 0,
            upgrade: request.mode === "websocket" ? "websocket" : void 0
          },
          {
            body: null,
            abort: null,
            onConnect(abort) {
              const { connection } = fetchParams.controller;
              timingInfo.finalConnectionTimingInfo = clampAndCoarsenConnectionTimingInfo(void 0, timingInfo.postRedirectStartTime, fetchParams.crossOriginIsolatedCapability);
              if (connection.destroyed) {
                abort(new DOMException("The operation was aborted.", "AbortError"));
              } else {
                fetchParams.controller.on("terminated", abort);
                this.abort = connection.abort = abort;
              }
              timingInfo.finalNetworkRequestStartTime = coarsenedSharedCurrentTime(fetchParams.crossOriginIsolatedCapability);
            },
            onResponseStarted() {
              timingInfo.finalNetworkResponseStartTime = coarsenedSharedCurrentTime(fetchParams.crossOriginIsolatedCapability);
            },
            onHeaders(status, rawHeaders, resume, statusText) {
              if (status < 200) {
                return;
              }
              let codings = [];
              let location = "";
              const headersList = new HeadersList();
              for (let i = 0; i < rawHeaders.length; i += 2) {
                headersList.append(bufferToLowerCasedHeaderName(rawHeaders[i]), rawHeaders[i + 1].toString("latin1"), true);
              }
              const contentEncoding = headersList.get("content-encoding", true);
              if (contentEncoding) {
                codings = contentEncoding.toLowerCase().split(",").map((x) => x.trim());
              }
              location = headersList.get("location", true);
              this.body = new Readable({ read: resume });
              const decoders = [];
              const willFollow = location && request.redirect === "follow" && redirectStatusSet.has(status);
              if (codings.length !== 0 && request.method !== "HEAD" && request.method !== "CONNECT" && !nullBodyStatus.includes(status) && !willFollow) {
                for (let i = codings.length - 1; i >= 0; --i) {
                  const coding = codings[i];
                  if (coding === "x-gzip" || coding === "gzip") {
                    decoders.push(zlib.createGunzip({
                      // Be less strict when decoding compressed responses, since sometimes
                      // servers send slightly invalid responses that are still accepted
                      // by common browsers.
                      // Always using Z_SYNC_FLUSH is what cURL does.
                      flush: zlib.constants.Z_SYNC_FLUSH,
                      finishFlush: zlib.constants.Z_SYNC_FLUSH
                    }));
                  } else if (coding === "deflate") {
                    decoders.push(createInflate({
                      flush: zlib.constants.Z_SYNC_FLUSH,
                      finishFlush: zlib.constants.Z_SYNC_FLUSH
                    }));
                  } else if (coding === "br") {
                    decoders.push(zlib.createBrotliDecompress({
                      flush: zlib.constants.BROTLI_OPERATION_FLUSH,
                      finishFlush: zlib.constants.BROTLI_OPERATION_FLUSH
                    }));
                  } else if (coding === "zstd" && typeof zlib.createZstdDecompress === "function") {
                    decoders.push(zlib.createZstdDecompress({
                      flush: zlib.constants.ZSTD_e_continue,
                      finishFlush: zlib.constants.ZSTD_e_end
                    }));
                  } else {
                    decoders.length = 0;
                    break;
                  }
                }
              }
              const onError = this.onError.bind(this);
              resolve({
                status,
                statusText,
                headersList,
                body: decoders.length ? pipeline(this.body, ...decoders, (err) => {
                  if (err) {
                    this.onError(err);
                  }
                }).on("error", onError) : this.body.on("error", onError)
              });
              return true;
            },
            onData(chunk) {
              if (fetchParams.controller.dump) {
                return;
              }
              const bytes = chunk;
              timingInfo.encodedBodySize += bytes.byteLength;
              return this.body.push(bytes);
            },
            onComplete() {
              if (this.abort) {
                fetchParams.controller.off("terminated", this.abort);
              }
              fetchParams.controller.ended = true;
              this.body.push(null);
            },
            onError(error) {
              if (this.abort) {
                fetchParams.controller.off("terminated", this.abort);
              }
              this.body?.destroy(error);
              fetchParams.controller.terminate(error);
              reject(error);
            },
            onUpgrade(status, rawHeaders, socket) {
              if (status !== 101) {
                return;
              }
              const headersList = new HeadersList();
              for (let i = 0; i < rawHeaders.length; i += 2) {
                headersList.append(bufferToLowerCasedHeaderName(rawHeaders[i]), rawHeaders[i + 1].toString("latin1"), true);
              }
              resolve({
                status,
                statusText: STATUS_CODES[status],
                headersList,
                socket
              });
              return true;
            }
          }
        ));
      }
    }
    module2.exports = {
      fetch: fetch2,
      Fetch,
      fetching,
      finalizeAndReportTiming
    };
  }
});

// node_modules/undici/lib/web/cache/util.js
var require_util3 = __commonJS({
  "node_modules/undici/lib/web/cache/util.js"(exports2, module2) {
    "use strict";
    var assert = require("node:assert");
    var { URLSerializer } = require_data_url();
    var { isValidHeaderName } = require_util2();
    function urlEquals(A, B, excludeFragment = false) {
      const serializedA = URLSerializer(A, excludeFragment);
      const serializedB = URLSerializer(B, excludeFragment);
      return serializedA === serializedB;
    }
    function getFieldValues(header) {
      assert(header !== null);
      const values = [];
      for (let value of header.split(",")) {
        value = value.trim();
        if (isValidHeaderName(value)) {
          values.push(value);
        }
      }
      return values;
    }
    module2.exports = {
      urlEquals,
      getFieldValues
    };
  }
});

// node_modules/undici/lib/web/cache/cache.js
var require_cache3 = __commonJS({
  "node_modules/undici/lib/web/cache/cache.js"(exports2, module2) {
    "use strict";
    var { kConstruct } = require_symbols();
    var { urlEquals, getFieldValues } = require_util3();
    var { kEnumerableProperty, isDisturbed } = require_util();
    var { webidl } = require_webidl();
    var { cloneResponse, fromInnerResponse, getResponseState } = require_response();
    var { Request, fromInnerRequest, getRequestState } = require_request2();
    var { fetching } = require_fetch();
    var { urlIsHttpHttpsScheme, createDeferredPromise, readAllBytes } = require_util2();
    var assert = require("node:assert");
    var Cache = class _Cache {
      /**
       * @see https://w3c.github.io/ServiceWorker/#dfn-relevant-request-response-list
       * @type {requestResponseList}
       */
      #relevantRequestResponseList;
      constructor() {
        if (arguments[0] !== kConstruct) {
          webidl.illegalConstructor();
        }
        webidl.util.markAsUncloneable(this);
        this.#relevantRequestResponseList = arguments[1];
      }
      async match(request, options = {}) {
        webidl.brandCheck(this, _Cache);
        const prefix = "Cache.match";
        webidl.argumentLengthCheck(arguments, 1, prefix);
        request = webidl.converters.RequestInfo(request, prefix, "request");
        options = webidl.converters.CacheQueryOptions(options, prefix, "options");
        const p = this.#internalMatchAll(request, options, 1);
        if (p.length === 0) {
          return;
        }
        return p[0];
      }
      async matchAll(request = void 0, options = {}) {
        webidl.brandCheck(this, _Cache);
        const prefix = "Cache.matchAll";
        if (request !== void 0) request = webidl.converters.RequestInfo(request, prefix, "request");
        options = webidl.converters.CacheQueryOptions(options, prefix, "options");
        return this.#internalMatchAll(request, options);
      }
      async add(request) {
        webidl.brandCheck(this, _Cache);
        const prefix = "Cache.add";
        webidl.argumentLengthCheck(arguments, 1, prefix);
        request = webidl.converters.RequestInfo(request, prefix, "request");
        const requests = [request];
        const responseArrayPromise = this.addAll(requests);
        return await responseArrayPromise;
      }
      async addAll(requests) {
        webidl.brandCheck(this, _Cache);
        const prefix = "Cache.addAll";
        webidl.argumentLengthCheck(arguments, 1, prefix);
        const responsePromises = [];
        const requestList = [];
        for (let request of requests) {
          if (request === void 0) {
            throw webidl.errors.conversionFailed({
              prefix,
              argument: "Argument 1",
              types: ["undefined is not allowed"]
            });
          }
          request = webidl.converters.RequestInfo(request);
          if (typeof request === "string") {
            continue;
          }
          const r = getRequestState(request);
          if (!urlIsHttpHttpsScheme(r.url) || r.method !== "GET") {
            throw webidl.errors.exception({
              header: prefix,
              message: "Expected http/s scheme when method is not GET."
            });
          }
        }
        const fetchControllers = [];
        for (const request of requests) {
          const r = getRequestState(new Request(request));
          if (!urlIsHttpHttpsScheme(r.url)) {
            throw webidl.errors.exception({
              header: prefix,
              message: "Expected http/s scheme."
            });
          }
          r.initiator = "fetch";
          r.destination = "subresource";
          requestList.push(r);
          const responsePromise = createDeferredPromise();
          fetchControllers.push(fetching({
            request: r,
            processResponse(response) {
              if (response.type === "error" || response.status === 206 || response.status < 200 || response.status > 299) {
                responsePromise.reject(webidl.errors.exception({
                  header: "Cache.addAll",
                  message: "Received an invalid status code or the request failed."
                }));
              } else if (response.headersList.contains("vary")) {
                const fieldValues = getFieldValues(response.headersList.get("vary"));
                for (const fieldValue of fieldValues) {
                  if (fieldValue === "*") {
                    responsePromise.reject(webidl.errors.exception({
                      header: "Cache.addAll",
                      message: "invalid vary field value"
                    }));
                    for (const controller of fetchControllers) {
                      controller.abort();
                    }
                    return;
                  }
                }
              }
            },
            processResponseEndOfBody(response) {
              if (response.aborted) {
                responsePromise.reject(new DOMException("aborted", "AbortError"));
                return;
              }
              responsePromise.resolve(response);
            }
          }));
          responsePromises.push(responsePromise.promise);
        }
        const p = Promise.all(responsePromises);
        const responses = await p;
        const operations = [];
        let index = 0;
        for (const response of responses) {
          const operation = {
            type: "put",
            // 7.3.2
            request: requestList[index],
            // 7.3.3
            response
            // 7.3.4
          };
          operations.push(operation);
          index++;
        }
        const cacheJobPromise = createDeferredPromise();
        let errorData = null;
        try {
          this.#batchCacheOperations(operations);
        } catch (e) {
          errorData = e;
        }
        queueMicrotask(() => {
          if (errorData === null) {
            cacheJobPromise.resolve(void 0);
          } else {
            cacheJobPromise.reject(errorData);
          }
        });
        return cacheJobPromise.promise;
      }
      async put(request, response) {
        webidl.brandCheck(this, _Cache);
        const prefix = "Cache.put";
        webidl.argumentLengthCheck(arguments, 2, prefix);
        request = webidl.converters.RequestInfo(request, prefix, "request");
        response = webidl.converters.Response(response, prefix, "response");
        let innerRequest = null;
        if (webidl.is.Request(request)) {
          innerRequest = getRequestState(request);
        } else {
          innerRequest = getRequestState(new Request(request));
        }
        if (!urlIsHttpHttpsScheme(innerRequest.url) || innerRequest.method !== "GET") {
          throw webidl.errors.exception({
            header: prefix,
            message: "Expected an http/s scheme when method is not GET"
          });
        }
        const innerResponse = getResponseState(response);
        if (innerResponse.status === 206) {
          throw webidl.errors.exception({
            header: prefix,
            message: "Got 206 status"
          });
        }
        if (innerResponse.headersList.contains("vary")) {
          const fieldValues = getFieldValues(innerResponse.headersList.get("vary"));
          for (const fieldValue of fieldValues) {
            if (fieldValue === "*") {
              throw webidl.errors.exception({
                header: prefix,
                message: "Got * vary field value"
              });
            }
          }
        }
        if (innerResponse.body && (isDisturbed(innerResponse.body.stream) || innerResponse.body.stream.locked)) {
          throw webidl.errors.exception({
            header: prefix,
            message: "Response body is locked or disturbed"
          });
        }
        const clonedResponse = cloneResponse(innerResponse);
        const bodyReadPromise = createDeferredPromise();
        if (innerResponse.body != null) {
          const stream = innerResponse.body.stream;
          const reader = stream.getReader();
          readAllBytes(reader, bodyReadPromise.resolve, bodyReadPromise.reject);
        } else {
          bodyReadPromise.resolve(void 0);
        }
        const operations = [];
        const operation = {
          type: "put",
          // 14.
          request: innerRequest,
          // 15.
          response: clonedResponse
          // 16.
        };
        operations.push(operation);
        const bytes = await bodyReadPromise.promise;
        if (clonedResponse.body != null) {
          clonedResponse.body.source = bytes;
        }
        const cacheJobPromise = createDeferredPromise();
        let errorData = null;
        try {
          this.#batchCacheOperations(operations);
        } catch (e) {
          errorData = e;
        }
        queueMicrotask(() => {
          if (errorData === null) {
            cacheJobPromise.resolve();
          } else {
            cacheJobPromise.reject(errorData);
          }
        });
        return cacheJobPromise.promise;
      }
      async delete(request, options = {}) {
        webidl.brandCheck(this, _Cache);
        const prefix = "Cache.delete";
        webidl.argumentLengthCheck(arguments, 1, prefix);
        request = webidl.converters.RequestInfo(request, prefix, "request");
        options = webidl.converters.CacheQueryOptions(options, prefix, "options");
        let r = null;
        if (webidl.is.Request(request)) {
          r = getRequestState(request);
          if (r.method !== "GET" && !options.ignoreMethod) {
            return false;
          }
        } else {
          assert(typeof request === "string");
          r = getRequestState(new Request(request));
        }
        const operations = [];
        const operation = {
          type: "delete",
          request: r,
          options
        };
        operations.push(operation);
        const cacheJobPromise = createDeferredPromise();
        let errorData = null;
        let requestResponses;
        try {
          requestResponses = this.#batchCacheOperations(operations);
        } catch (e) {
          errorData = e;
        }
        queueMicrotask(() => {
          if (errorData === null) {
            cacheJobPromise.resolve(!!requestResponses?.length);
          } else {
            cacheJobPromise.reject(errorData);
          }
        });
        return cacheJobPromise.promise;
      }
      /**
       * @see https://w3c.github.io/ServiceWorker/#dom-cache-keys
       * @param {any} request
       * @param {import('../../types/cache').CacheQueryOptions} options
       * @returns {Promise<readonly Request[]>}
       */
      async keys(request = void 0, options = {}) {
        webidl.brandCheck(this, _Cache);
        const prefix = "Cache.keys";
        if (request !== void 0) request = webidl.converters.RequestInfo(request, prefix, "request");
        options = webidl.converters.CacheQueryOptions(options, prefix, "options");
        let r = null;
        if (request !== void 0) {
          if (webidl.is.Request(request)) {
            r = getRequestState(request);
            if (r.method !== "GET" && !options.ignoreMethod) {
              return [];
            }
          } else if (typeof request === "string") {
            r = getRequestState(new Request(request));
          }
        }
        const promise = createDeferredPromise();
        const requests = [];
        if (request === void 0) {
          for (const requestResponse of this.#relevantRequestResponseList) {
            requests.push(requestResponse[0]);
          }
        } else {
          const requestResponses = this.#queryCache(r, options);
          for (const requestResponse of requestResponses) {
            requests.push(requestResponse[0]);
          }
        }
        queueMicrotask(() => {
          const requestList = [];
          for (const request2 of requests) {
            const requestObject = fromInnerRequest(
              request2,
              void 0,
              new AbortController().signal,
              "immutable"
            );
            requestList.push(requestObject);
          }
          promise.resolve(Object.freeze(requestList));
        });
        return promise.promise;
      }
      /**
       * @see https://w3c.github.io/ServiceWorker/#batch-cache-operations-algorithm
       * @param {CacheBatchOperation[]} operations
       * @returns {requestResponseList}
       */
      #batchCacheOperations(operations) {
        const cache = this.#relevantRequestResponseList;
        const backupCache = [...cache];
        const addedItems = [];
        const resultList = [];
        try {
          for (const operation of operations) {
            if (operation.type !== "delete" && operation.type !== "put") {
              throw webidl.errors.exception({
                header: "Cache.#batchCacheOperations",
                message: 'operation type does not match "delete" or "put"'
              });
            }
            if (operation.type === "delete" && operation.response != null) {
              throw webidl.errors.exception({
                header: "Cache.#batchCacheOperations",
                message: "delete operation should not have an associated response"
              });
            }
            if (this.#queryCache(operation.request, operation.options, addedItems).length) {
              throw new DOMException("???", "InvalidStateError");
            }
            let requestResponses;
            if (operation.type === "delete") {
              requestResponses = this.#queryCache(operation.request, operation.options);
              if (requestResponses.length === 0) {
                return [];
              }
              for (const requestResponse of requestResponses) {
                const idx = cache.indexOf(requestResponse);
                assert(idx !== -1);
                cache.splice(idx, 1);
              }
            } else if (operation.type === "put") {
              if (operation.response == null) {
                throw webidl.errors.exception({
                  header: "Cache.#batchCacheOperations",
                  message: "put operation should have an associated response"
                });
              }
              const r = operation.request;
              if (!urlIsHttpHttpsScheme(r.url)) {
                throw webidl.errors.exception({
                  header: "Cache.#batchCacheOperations",
                  message: "expected http or https scheme"
                });
              }
              if (r.method !== "GET") {
                throw webidl.errors.exception({
                  header: "Cache.#batchCacheOperations",
                  message: "not get method"
                });
              }
              if (operation.options != null) {
                throw webidl.errors.exception({
                  header: "Cache.#batchCacheOperations",
                  message: "options must not be defined"
                });
              }
              requestResponses = this.#queryCache(operation.request);
              for (const requestResponse of requestResponses) {
                const idx = cache.indexOf(requestResponse);
                assert(idx !== -1);
                cache.splice(idx, 1);
              }
              cache.push([operation.request, operation.response]);
              addedItems.push([operation.request, operation.response]);
            }
            resultList.push([operation.request, operation.response]);
          }
          return resultList;
        } catch (e) {
          this.#relevantRequestResponseList.length = 0;
          this.#relevantRequestResponseList = backupCache;
          throw e;
        }
      }
      /**
       * @see https://w3c.github.io/ServiceWorker/#query-cache
       * @param {any} requestQuery
       * @param {import('../../types/cache').CacheQueryOptions} options
       * @param {requestResponseList} targetStorage
       * @returns {requestResponseList}
       */
      #queryCache(requestQuery, options, targetStorage) {
        const resultList = [];
        const storage = targetStorage ?? this.#relevantRequestResponseList;
        for (const requestResponse of storage) {
          const [cachedRequest, cachedResponse] = requestResponse;
          if (this.#requestMatchesCachedItem(requestQuery, cachedRequest, cachedResponse, options)) {
            resultList.push(requestResponse);
          }
        }
        return resultList;
      }
      /**
       * @see https://w3c.github.io/ServiceWorker/#request-matches-cached-item-algorithm
       * @param {any} requestQuery
       * @param {any} request
       * @param {any | null} response
       * @param {import('../../types/cache').CacheQueryOptions | undefined} options
       * @returns {boolean}
       */
      #requestMatchesCachedItem(requestQuery, request, response = null, options) {
        const queryURL = new URL(requestQuery.url);
        const cachedURL = new URL(request.url);
        if (options?.ignoreSearch) {
          cachedURL.search = "";
          queryURL.search = "";
        }
        if (!urlEquals(queryURL, cachedURL, true)) {
          return false;
        }
        if (response == null || options?.ignoreVary || !response.headersList.contains("vary")) {
          return true;
        }
        const fieldValues = getFieldValues(response.headersList.get("vary"));
        for (const fieldValue of fieldValues) {
          if (fieldValue === "*") {
            return false;
          }
          const requestValue = request.headersList.get(fieldValue);
          const queryValue = requestQuery.headersList.get(fieldValue);
          if (requestValue !== queryValue) {
            return false;
          }
        }
        return true;
      }
      #internalMatchAll(request, options, maxResponses = Infinity) {
        let r = null;
        if (request !== void 0) {
          if (webidl.is.Request(request)) {
            r = getRequestState(request);
            if (r.method !== "GET" && !options.ignoreMethod) {
              return [];
            }
          } else if (typeof request === "string") {
            r = getRequestState(new Request(request));
          }
        }
        const responses = [];
        if (request === void 0) {
          for (const requestResponse of this.#relevantRequestResponseList) {
            responses.push(requestResponse[1]);
          }
        } else {
          const requestResponses = this.#queryCache(r, options);
          for (const requestResponse of requestResponses) {
            responses.push(requestResponse[1]);
          }
        }
        const responseList = [];
        for (const response of responses) {
          const responseObject = fromInnerResponse(response, "immutable");
          responseList.push(responseObject.clone());
          if (responseList.length >= maxResponses) {
            break;
          }
        }
        return Object.freeze(responseList);
      }
    };
    Object.defineProperties(Cache.prototype, {
      [Symbol.toStringTag]: {
        value: "Cache",
        configurable: true
      },
      match: kEnumerableProperty,
      matchAll: kEnumerableProperty,
      add: kEnumerableProperty,
      addAll: kEnumerableProperty,
      put: kEnumerableProperty,
      delete: kEnumerableProperty,
      keys: kEnumerableProperty
    });
    var cacheQueryOptionConverters = [
      {
        key: "ignoreSearch",
        converter: webidl.converters.boolean,
        defaultValue: () => false
      },
      {
        key: "ignoreMethod",
        converter: webidl.converters.boolean,
        defaultValue: () => false
      },
      {
        key: "ignoreVary",
        converter: webidl.converters.boolean,
        defaultValue: () => false
      }
    ];
    webidl.converters.CacheQueryOptions = webidl.dictionaryConverter(cacheQueryOptionConverters);
    webidl.converters.MultiCacheQueryOptions = webidl.dictionaryConverter([
      ...cacheQueryOptionConverters,
      {
        key: "cacheName",
        converter: webidl.converters.DOMString
      }
    ]);
    webidl.converters.Response = webidl.interfaceConverter(
      webidl.is.Response,
      "Response"
    );
    webidl.converters["sequence<RequestInfo>"] = webidl.sequenceConverter(
      webidl.converters.RequestInfo
    );
    module2.exports = {
      Cache
    };
  }
});

// node_modules/undici/lib/web/cache/cachestorage.js
var require_cachestorage = __commonJS({
  "node_modules/undici/lib/web/cache/cachestorage.js"(exports2, module2) {
    "use strict";
    var { Cache } = require_cache3();
    var { webidl } = require_webidl();
    var { kEnumerableProperty } = require_util();
    var { kConstruct } = require_symbols();
    var CacheStorage = class _CacheStorage {
      /**
       * @see https://w3c.github.io/ServiceWorker/#dfn-relevant-name-to-cache-map
       * @type {Map<string, import('./cache').requestResponseList}
       */
      #caches = /* @__PURE__ */ new Map();
      constructor() {
        if (arguments[0] !== kConstruct) {
          webidl.illegalConstructor();
        }
        webidl.util.markAsUncloneable(this);
      }
      async match(request, options = {}) {
        webidl.brandCheck(this, _CacheStorage);
        webidl.argumentLengthCheck(arguments, 1, "CacheStorage.match");
        request = webidl.converters.RequestInfo(request);
        options = webidl.converters.MultiCacheQueryOptions(options);
        if (options.cacheName != null) {
          if (this.#caches.has(options.cacheName)) {
            const cacheList = this.#caches.get(options.cacheName);
            const cache = new Cache(kConstruct, cacheList);
            return await cache.match(request, options);
          }
        } else {
          for (const cacheList of this.#caches.values()) {
            const cache = new Cache(kConstruct, cacheList);
            const response = await cache.match(request, options);
            if (response !== void 0) {
              return response;
            }
          }
        }
      }
      /**
       * @see https://w3c.github.io/ServiceWorker/#cache-storage-has
       * @param {string} cacheName
       * @returns {Promise<boolean>}
       */
      async has(cacheName) {
        webidl.brandCheck(this, _CacheStorage);
        const prefix = "CacheStorage.has";
        webidl.argumentLengthCheck(arguments, 1, prefix);
        cacheName = webidl.converters.DOMString(cacheName, prefix, "cacheName");
        return this.#caches.has(cacheName);
      }
      /**
       * @see https://w3c.github.io/ServiceWorker/#dom-cachestorage-open
       * @param {string} cacheName
       * @returns {Promise<Cache>}
       */
      async open(cacheName) {
        webidl.brandCheck(this, _CacheStorage);
        const prefix = "CacheStorage.open";
        webidl.argumentLengthCheck(arguments, 1, prefix);
        cacheName = webidl.converters.DOMString(cacheName, prefix, "cacheName");
        if (this.#caches.has(cacheName)) {
          const cache2 = this.#caches.get(cacheName);
          return new Cache(kConstruct, cache2);
        }
        const cache = [];
        this.#caches.set(cacheName, cache);
        return new Cache(kConstruct, cache);
      }
      /**
       * @see https://w3c.github.io/ServiceWorker/#cache-storage-delete
       * @param {string} cacheName
       * @returns {Promise<boolean>}
       */
      async delete(cacheName) {
        webidl.brandCheck(this, _CacheStorage);
        const prefix = "CacheStorage.delete";
        webidl.argumentLengthCheck(arguments, 1, prefix);
        cacheName = webidl.converters.DOMString(cacheName, prefix, "cacheName");
        return this.#caches.delete(cacheName);
      }
      /**
       * @see https://w3c.github.io/ServiceWorker/#cache-storage-keys
       * @returns {Promise<string[]>}
       */
      async keys() {
        webidl.brandCheck(this, _CacheStorage);
        const keys = this.#caches.keys();
        return [...keys];
      }
    };
    Object.defineProperties(CacheStorage.prototype, {
      [Symbol.toStringTag]: {
        value: "CacheStorage",
        configurable: true
      },
      match: kEnumerableProperty,
      has: kEnumerableProperty,
      open: kEnumerableProperty,
      delete: kEnumerableProperty,
      keys: kEnumerableProperty
    });
    module2.exports = {
      CacheStorage
    };
  }
});

// node_modules/undici/lib/web/cookies/constants.js
var require_constants4 = __commonJS({
  "node_modules/undici/lib/web/cookies/constants.js"(exports2, module2) {
    "use strict";
    var maxAttributeValueSize = 1024;
    var maxNameValuePairSize = 4096;
    module2.exports = {
      maxAttributeValueSize,
      maxNameValuePairSize
    };
  }
});

// node_modules/undici/lib/web/cookies/util.js
var require_util4 = __commonJS({
  "node_modules/undici/lib/web/cookies/util.js"(exports2, module2) {
    "use strict";
    function isCTLExcludingHtab(value) {
      for (let i = 0; i < value.length; ++i) {
        const code = value.charCodeAt(i);
        if (code >= 0 && code <= 8 || code >= 10 && code <= 31 || code === 127) {
          return true;
        }
      }
      return false;
    }
    function validateCookieName(name) {
      for (let i = 0; i < name.length; ++i) {
        const code = name.charCodeAt(i);
        if (code < 33 || // exclude CTLs (0-31), SP and HT
        code > 126 || // exclude non-ascii and DEL
        code === 34 || // "
        code === 40 || // (
        code === 41 || // )
        code === 60 || // <
        code === 62 || // >
        code === 64 || // @
        code === 44 || // ,
        code === 59 || // ;
        code === 58 || // :
        code === 92 || // \
        code === 47 || // /
        code === 91 || // [
        code === 93 || // ]
        code === 63 || // ?
        code === 61 || // =
        code === 123 || // {
        code === 125) {
          throw new Error("Invalid cookie name");
        }
      }
    }
    function validateCookieValue(value) {
      let len = value.length;
      let i = 0;
      if (value[0] === '"') {
        if (len === 1 || value[len - 1] !== '"') {
          throw new Error("Invalid cookie value");
        }
        --len;
        ++i;
      }
      while (i < len) {
        const code = value.charCodeAt(i++);
        if (code < 33 || // exclude CTLs (0-31)
        code > 126 || // non-ascii and DEL (127)
        code === 34 || // "
        code === 44 || // ,
        code === 59 || // ;
        code === 92) {
          throw new Error("Invalid cookie value");
        }
      }
    }
    function validateCookiePath(path) {
      for (let i = 0; i < path.length; ++i) {
        const code = path.charCodeAt(i);
        if (code < 32 || // exclude CTLs (0-31)
        code === 127 || // DEL
        code === 59) {
          throw new Error("Invalid cookie path");
        }
      }
    }
    function validateCookieDomain(domain) {
      if (domain.startsWith("-") || domain.endsWith(".") || domain.endsWith("-")) {
        throw new Error("Invalid cookie domain");
      }
    }
    var IMFDays = [
      "Sun",
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat"
    ];
    var IMFMonths = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    var IMFPaddedNumbers = Array(61).fill(0).map((_, i) => i.toString().padStart(2, "0"));
    function toIMFDate(date) {
      if (typeof date === "number") {
        date = new Date(date);
      }
      return `${IMFDays[date.getUTCDay()]}, ${IMFPaddedNumbers[date.getUTCDate()]} ${IMFMonths[date.getUTCMonth()]} ${date.getUTCFullYear()} ${IMFPaddedNumbers[date.getUTCHours()]}:${IMFPaddedNumbers[date.getUTCMinutes()]}:${IMFPaddedNumbers[date.getUTCSeconds()]} GMT`;
    }
    function validateCookieMaxAge(maxAge) {
      if (maxAge < 0) {
        throw new Error("Invalid cookie max-age");
      }
    }
    function stringify(cookie) {
      if (cookie.name.length === 0) {
        return null;
      }
      validateCookieName(cookie.name);
      validateCookieValue(cookie.value);
      const out = [`${cookie.name}=${cookie.value}`];
      if (cookie.name.startsWith("__Secure-")) {
        cookie.secure = true;
      }
      if (cookie.name.startsWith("__Host-")) {
        cookie.secure = true;
        cookie.domain = null;
        cookie.path = "/";
      }
      if (cookie.secure) {
        out.push("Secure");
      }
      if (cookie.httpOnly) {
        out.push("HttpOnly");
      }
      if (typeof cookie.maxAge === "number") {
        validateCookieMaxAge(cookie.maxAge);
        out.push(`Max-Age=${cookie.maxAge}`);
      }
      if (cookie.domain) {
        validateCookieDomain(cookie.domain);
        out.push(`Domain=${cookie.domain}`);
      }
      if (cookie.path) {
        validateCookiePath(cookie.path);
        out.push(`Path=${cookie.path}`);
      }
      if (cookie.expires && cookie.expires.toString() !== "Invalid Date") {
        out.push(`Expires=${toIMFDate(cookie.expires)}`);
      }
      if (cookie.sameSite) {
        out.push(`SameSite=${cookie.sameSite}`);
      }
      for (const part of cookie.unparsed) {
        if (!part.includes("=")) {
          throw new Error("Invalid unparsed");
        }
        const [key, ...value] = part.split("=");
        out.push(`${key.trim()}=${value.join("=")}`);
      }
      return out.join("; ");
    }
    module2.exports = {
      isCTLExcludingHtab,
      validateCookieName,
      validateCookiePath,
      validateCookieValue,
      toIMFDate,
      stringify
    };
  }
});

// node_modules/undici/lib/web/cookies/parse.js
var require_parse = __commonJS({
  "node_modules/undici/lib/web/cookies/parse.js"(exports2, module2) {
    "use strict";
    var { maxNameValuePairSize, maxAttributeValueSize } = require_constants4();
    var { isCTLExcludingHtab } = require_util4();
    var { collectASequenceOfCodePointsFast } = require_data_url();
    var assert = require("node:assert");
    var { unescape } = require("node:querystring");
    function parseSetCookie(header) {
      if (isCTLExcludingHtab(header)) {
        return null;
      }
      let nameValuePair = "";
      let unparsedAttributes = "";
      let name = "";
      let value = "";
      if (header.includes(";")) {
        const position = { position: 0 };
        nameValuePair = collectASequenceOfCodePointsFast(";", header, position);
        unparsedAttributes = header.slice(position.position);
      } else {
        nameValuePair = header;
      }
      if (!nameValuePair.includes("=")) {
        value = nameValuePair;
      } else {
        const position = { position: 0 };
        name = collectASequenceOfCodePointsFast(
          "=",
          nameValuePair,
          position
        );
        value = nameValuePair.slice(position.position + 1);
      }
      name = name.trim();
      value = value.trim();
      if (name.length + value.length > maxNameValuePairSize) {
        return null;
      }
      return {
        name,
        value: unescape(value),
        ...parseUnparsedAttributes(unparsedAttributes)
      };
    }
    function parseUnparsedAttributes(unparsedAttributes, cookieAttributeList = {}) {
      if (unparsedAttributes.length === 0) {
        return cookieAttributeList;
      }
      assert(unparsedAttributes[0] === ";");
      unparsedAttributes = unparsedAttributes.slice(1);
      let cookieAv = "";
      if (unparsedAttributes.includes(";")) {
        cookieAv = collectASequenceOfCodePointsFast(
          ";",
          unparsedAttributes,
          { position: 0 }
        );
        unparsedAttributes = unparsedAttributes.slice(cookieAv.length);
      } else {
        cookieAv = unparsedAttributes;
        unparsedAttributes = "";
      }
      let attributeName = "";
      let attributeValue = "";
      if (cookieAv.includes("=")) {
        const position = { position: 0 };
        attributeName = collectASequenceOfCodePointsFast(
          "=",
          cookieAv,
          position
        );
        attributeValue = cookieAv.slice(position.position + 1);
      } else {
        attributeName = cookieAv;
      }
      attributeName = attributeName.trim();
      attributeValue = attributeValue.trim();
      if (attributeValue.length > maxAttributeValueSize) {
        return parseUnparsedAttributes(unparsedAttributes, cookieAttributeList);
      }
      const attributeNameLowercase = attributeName.toLowerCase();
      if (attributeNameLowercase === "expires") {
        const expiryTime = new Date(attributeValue);
        cookieAttributeList.expires = expiryTime;
      } else if (attributeNameLowercase === "max-age") {
        const charCode = attributeValue.charCodeAt(0);
        if ((charCode < 48 || charCode > 57) && attributeValue[0] !== "-") {
          return parseUnparsedAttributes(unparsedAttributes, cookieAttributeList);
        }
        if (!/^\d+$/.test(attributeValue)) {
          return parseUnparsedAttributes(unparsedAttributes, cookieAttributeList);
        }
        const deltaSeconds = Number(attributeValue);
        cookieAttributeList.maxAge = deltaSeconds;
      } else if (attributeNameLowercase === "domain") {
        let cookieDomain = attributeValue;
        if (cookieDomain[0] === ".") {
          cookieDomain = cookieDomain.slice(1);
        }
        cookieDomain = cookieDomain.toLowerCase();
        cookieAttributeList.domain = cookieDomain;
      } else if (attributeNameLowercase === "path") {
        let cookiePath = "";
        if (attributeValue.length === 0 || attributeValue[0] !== "/") {
          cookiePath = "/";
        } else {
          cookiePath = attributeValue;
        }
        cookieAttributeList.path = cookiePath;
      } else if (attributeNameLowercase === "secure") {
        cookieAttributeList.secure = true;
      } else if (attributeNameLowercase === "httponly") {
        cookieAttributeList.httpOnly = true;
      } else if (attributeNameLowercase === "samesite") {
        let enforcement = "Default";
        const attributeValueLowercase = attributeValue.toLowerCase();
        if (attributeValueLowercase.includes("none")) {
          enforcement = "None";
        }
        if (attributeValueLowercase.includes("strict")) {
          enforcement = "Strict";
        }
        if (attributeValueLowercase.includes("lax")) {
          enforcement = "Lax";
        }
        cookieAttributeList.sameSite = enforcement;
      } else {
        cookieAttributeList.unparsed ??= [];
        cookieAttributeList.unparsed.push(`${attributeName}=${attributeValue}`);
      }
      return parseUnparsedAttributes(unparsedAttributes, cookieAttributeList);
    }
    module2.exports = {
      parseSetCookie,
      parseUnparsedAttributes
    };
  }
});

// node_modules/undici/lib/web/cookies/index.js
var require_cookies = __commonJS({
  "node_modules/undici/lib/web/cookies/index.js"(exports2, module2) {
    "use strict";
    var { parseSetCookie } = require_parse();
    var { stringify } = require_util4();
    var { webidl } = require_webidl();
    var { Headers } = require_headers();
    var brandChecks = webidl.brandCheckMultiple([Headers, globalThis.Headers].filter(Boolean));
    function getCookies(headers) {
      webidl.argumentLengthCheck(arguments, 1, "getCookies");
      brandChecks(headers);
      const cookie = headers.get("cookie");
      const out = {};
      if (!cookie) {
        return out;
      }
      for (const piece of cookie.split(";")) {
        const [name, ...value] = piece.split("=");
        out[name.trim()] = value.join("=");
      }
      return out;
    }
    function deleteCookie(headers, name, attributes) {
      brandChecks(headers);
      const prefix = "deleteCookie";
      webidl.argumentLengthCheck(arguments, 2, prefix);
      name = webidl.converters.DOMString(name, prefix, "name");
      attributes = webidl.converters.DeleteCookieAttributes(attributes);
      setCookie(headers, {
        name,
        value: "",
        expires: /* @__PURE__ */ new Date(0),
        ...attributes
      });
    }
    function getSetCookies(headers) {
      webidl.argumentLengthCheck(arguments, 1, "getSetCookies");
      brandChecks(headers);
      const cookies = headers.getSetCookie();
      if (!cookies) {
        return [];
      }
      return cookies.map((pair) => parseSetCookie(pair));
    }
    function parseCookie(cookie) {
      cookie = webidl.converters.DOMString(cookie);
      return parseSetCookie(cookie);
    }
    function setCookie(headers, cookie) {
      webidl.argumentLengthCheck(arguments, 2, "setCookie");
      brandChecks(headers);
      cookie = webidl.converters.Cookie(cookie);
      const str = stringify(cookie);
      if (str) {
        headers.append("set-cookie", str, true);
      }
    }
    webidl.converters.DeleteCookieAttributes = webidl.dictionaryConverter([
      {
        converter: webidl.nullableConverter(webidl.converters.DOMString),
        key: "path",
        defaultValue: () => null
      },
      {
        converter: webidl.nullableConverter(webidl.converters.DOMString),
        key: "domain",
        defaultValue: () => null
      }
    ]);
    webidl.converters.Cookie = webidl.dictionaryConverter([
      {
        converter: webidl.converters.DOMString,
        key: "name"
      },
      {
        converter: webidl.converters.DOMString,
        key: "value"
      },
      {
        converter: webidl.nullableConverter((value) => {
          if (typeof value === "number") {
            return webidl.converters["unsigned long long"](value);
          }
          return new Date(value);
        }),
        key: "expires",
        defaultValue: () => null
      },
      {
        converter: webidl.nullableConverter(webidl.converters["long long"]),
        key: "maxAge",
        defaultValue: () => null
      },
      {
        converter: webidl.nullableConverter(webidl.converters.DOMString),
        key: "domain",
        defaultValue: () => null
      },
      {
        converter: webidl.nullableConverter(webidl.converters.DOMString),
        key: "path",
        defaultValue: () => null
      },
      {
        converter: webidl.nullableConverter(webidl.converters.boolean),
        key: "secure",
        defaultValue: () => null
      },
      {
        converter: webidl.nullableConverter(webidl.converters.boolean),
        key: "httpOnly",
        defaultValue: () => null
      },
      {
        converter: webidl.converters.USVString,
        key: "sameSite",
        allowedValues: ["Strict", "Lax", "None"]
      },
      {
        converter: webidl.sequenceConverter(webidl.converters.DOMString),
        key: "unparsed",
        defaultValue: () => new Array(0)
      }
    ]);
    module2.exports = {
      getCookies,
      deleteCookie,
      getSetCookies,
      setCookie,
      parseCookie
    };
  }
});

// node_modules/undici/lib/web/websocket/events.js
var require_events = __commonJS({
  "node_modules/undici/lib/web/websocket/events.js"(exports2, module2) {
    "use strict";
    var { webidl } = require_webidl();
    var { kEnumerableProperty } = require_util();
    var { kConstruct } = require_symbols();
    var MessageEvent = class _MessageEvent extends Event {
      #eventInit;
      constructor(type, eventInitDict = {}) {
        if (type === kConstruct) {
          super(arguments[1], arguments[2]);
          webidl.util.markAsUncloneable(this);
          return;
        }
        const prefix = "MessageEvent constructor";
        webidl.argumentLengthCheck(arguments, 1, prefix);
        type = webidl.converters.DOMString(type, prefix, "type");
        eventInitDict = webidl.converters.MessageEventInit(eventInitDict, prefix, "eventInitDict");
        super(type, eventInitDict);
        this.#eventInit = eventInitDict;
        webidl.util.markAsUncloneable(this);
      }
      get data() {
        webidl.brandCheck(this, _MessageEvent);
        return this.#eventInit.data;
      }
      get origin() {
        webidl.brandCheck(this, _MessageEvent);
        return this.#eventInit.origin;
      }
      get lastEventId() {
        webidl.brandCheck(this, _MessageEvent);
        return this.#eventInit.lastEventId;
      }
      get source() {
        webidl.brandCheck(this, _MessageEvent);
        return this.#eventInit.source;
      }
      get ports() {
        webidl.brandCheck(this, _MessageEvent);
        if (!Object.isFrozen(this.#eventInit.ports)) {
          Object.freeze(this.#eventInit.ports);
        }
        return this.#eventInit.ports;
      }
      initMessageEvent(type, bubbles = false, cancelable = false, data = null, origin = "", lastEventId = "", source = null, ports = []) {
        webidl.brandCheck(this, _MessageEvent);
        webidl.argumentLengthCheck(arguments, 1, "MessageEvent.initMessageEvent");
        return new _MessageEvent(type, {
          bubbles,
          cancelable,
          data,
          origin,
          lastEventId,
          source,
          ports
        });
      }
      static createFastMessageEvent(type, init) {
        const messageEvent = new _MessageEvent(kConstruct, type, init);
        messageEvent.#eventInit = init;
        messageEvent.#eventInit.data ??= null;
        messageEvent.#eventInit.origin ??= "";
        messageEvent.#eventInit.lastEventId ??= "";
        messageEvent.#eventInit.source ??= null;
        messageEvent.#eventInit.ports ??= [];
        return messageEvent;
      }
    };
    var { createFastMessageEvent } = MessageEvent;
    delete MessageEvent.createFastMessageEvent;
    var CloseEvent = class _CloseEvent extends Event {
      #eventInit;
      constructor(type, eventInitDict = {}) {
        const prefix = "CloseEvent constructor";
        webidl.argumentLengthCheck(arguments, 1, prefix);
        type = webidl.converters.DOMString(type, prefix, "type");
        eventInitDict = webidl.converters.CloseEventInit(eventInitDict);
        super(type, eventInitDict);
        this.#eventInit = eventInitDict;
        webidl.util.markAsUncloneable(this);
      }
      get wasClean() {
        webidl.brandCheck(this, _CloseEvent);
        return this.#eventInit.wasClean;
      }
      get code() {
        webidl.brandCheck(this, _CloseEvent);
        return this.#eventInit.code;
      }
      get reason() {
        webidl.brandCheck(this, _CloseEvent);
        return this.#eventInit.reason;
      }
    };
    var ErrorEvent = class _ErrorEvent extends Event {
      #eventInit;
      constructor(type, eventInitDict) {
        const prefix = "ErrorEvent constructor";
        webidl.argumentLengthCheck(arguments, 1, prefix);
        super(type, eventInitDict);
        webidl.util.markAsUncloneable(this);
        type = webidl.converters.DOMString(type, prefix, "type");
        eventInitDict = webidl.converters.ErrorEventInit(eventInitDict ?? {});
        this.#eventInit = eventInitDict;
      }
      get message() {
        webidl.brandCheck(this, _ErrorEvent);
        return this.#eventInit.message;
      }
      get filename() {
        webidl.brandCheck(this, _ErrorEvent);
        return this.#eventInit.filename;
      }
      get lineno() {
        webidl.brandCheck(this, _ErrorEvent);
        return this.#eventInit.lineno;
      }
      get colno() {
        webidl.brandCheck(this, _ErrorEvent);
        return this.#eventInit.colno;
      }
      get error() {
        webidl.brandCheck(this, _ErrorEvent);
        return this.#eventInit.error;
      }
    };
    Object.defineProperties(MessageEvent.prototype, {
      [Symbol.toStringTag]: {
        value: "MessageEvent",
        configurable: true
      },
      data: kEnumerableProperty,
      origin: kEnumerableProperty,
      lastEventId: kEnumerableProperty,
      source: kEnumerableProperty,
      ports: kEnumerableProperty,
      initMessageEvent: kEnumerableProperty
    });
    Object.defineProperties(CloseEvent.prototype, {
      [Symbol.toStringTag]: {
        value: "CloseEvent",
        configurable: true
      },
      reason: kEnumerableProperty,
      code: kEnumerableProperty,
      wasClean: kEnumerableProperty
    });
    Object.defineProperties(ErrorEvent.prototype, {
      [Symbol.toStringTag]: {
        value: "ErrorEvent",
        configurable: true
      },
      message: kEnumerableProperty,
      filename: kEnumerableProperty,
      lineno: kEnumerableProperty,
      colno: kEnumerableProperty,
      error: kEnumerableProperty
    });
    webidl.converters.MessagePort = webidl.interfaceConverter(
      webidl.is.MessagePort,
      "MessagePort"
    );
    webidl.converters["sequence<MessagePort>"] = webidl.sequenceConverter(
      webidl.converters.MessagePort
    );
    var eventInit = [
      {
        key: "bubbles",
        converter: webidl.converters.boolean,
        defaultValue: () => false
      },
      {
        key: "cancelable",
        converter: webidl.converters.boolean,
        defaultValue: () => false
      },
      {
        key: "composed",
        converter: webidl.converters.boolean,
        defaultValue: () => false
      }
    ];
    webidl.converters.MessageEventInit = webidl.dictionaryConverter([
      ...eventInit,
      {
        key: "data",
        converter: webidl.converters.any,
        defaultValue: () => null
      },
      {
        key: "origin",
        converter: webidl.converters.USVString,
        defaultValue: () => ""
      },
      {
        key: "lastEventId",
        converter: webidl.converters.DOMString,
        defaultValue: () => ""
      },
      {
        key: "source",
        // Node doesn't implement WindowProxy or ServiceWorker, so the only
        // valid value for source is a MessagePort.
        converter: webidl.nullableConverter(webidl.converters.MessagePort),
        defaultValue: () => null
      },
      {
        key: "ports",
        converter: webidl.converters["sequence<MessagePort>"],
        defaultValue: () => new Array(0)
      }
    ]);
    webidl.converters.CloseEventInit = webidl.dictionaryConverter([
      ...eventInit,
      {
        key: "wasClean",
        converter: webidl.converters.boolean,
        defaultValue: () => false
      },
      {
        key: "code",
        converter: webidl.converters["unsigned short"],
        defaultValue: () => 0
      },
      {
        key: "reason",
        converter: webidl.converters.USVString,
        defaultValue: () => ""
      }
    ]);
    webidl.converters.ErrorEventInit = webidl.dictionaryConverter([
      ...eventInit,
      {
        key: "message",
        converter: webidl.converters.DOMString,
        defaultValue: () => ""
      },
      {
        key: "filename",
        converter: webidl.converters.USVString,
        defaultValue: () => ""
      },
      {
        key: "lineno",
        converter: webidl.converters["unsigned long"],
        defaultValue: () => 0
      },
      {
        key: "colno",
        converter: webidl.converters["unsigned long"],
        defaultValue: () => 0
      },
      {
        key: "error",
        converter: webidl.converters.any
      }
    ]);
    module2.exports = {
      MessageEvent,
      CloseEvent,
      ErrorEvent,
      createFastMessageEvent
    };
  }
});

// node_modules/undici/lib/web/websocket/constants.js
var require_constants5 = __commonJS({
  "node_modules/undici/lib/web/websocket/constants.js"(exports2, module2) {
    "use strict";
    var uid = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";
    var staticPropertyDescriptors = {
      enumerable: true,
      writable: false,
      configurable: false
    };
    var states = {
      CONNECTING: 0,
      OPEN: 1,
      CLOSING: 2,
      CLOSED: 3
    };
    var sentCloseFrameState = {
      SENT: 1,
      RECEIVED: 2
    };
    var opcodes = {
      CONTINUATION: 0,
      TEXT: 1,
      BINARY: 2,
      CLOSE: 8,
      PING: 9,
      PONG: 10
    };
    var maxUnsigned16Bit = 65535;
    var parserStates = {
      INFO: 0,
      PAYLOADLENGTH_16: 2,
      PAYLOADLENGTH_64: 3,
      READ_DATA: 4
    };
    var emptyBuffer = Buffer.allocUnsafe(0);
    var sendHints = {
      text: 1,
      typedArray: 2,
      arrayBuffer: 3,
      blob: 4
    };
    module2.exports = {
      uid,
      sentCloseFrameState,
      staticPropertyDescriptors,
      states,
      opcodes,
      maxUnsigned16Bit,
      parserStates,
      emptyBuffer,
      sendHints
    };
  }
});

// node_modules/undici/lib/web/websocket/util.js
var require_util5 = __commonJS({
  "node_modules/undici/lib/web/websocket/util.js"(exports2, module2) {
    "use strict";
    var { states, opcodes } = require_constants5();
    var { isUtf8 } = require("node:buffer");
    var { collectASequenceOfCodePointsFast, removeHTTPWhitespace } = require_data_url();
    function isConnecting(readyState) {
      return readyState === states.CONNECTING;
    }
    function isEstablished(readyState) {
      return readyState === states.OPEN;
    }
    function isClosing(readyState) {
      return readyState === states.CLOSING;
    }
    function isClosed(readyState) {
      return readyState === states.CLOSED;
    }
    function fireEvent(e, target, eventFactory = (type, init) => new Event(type, init), eventInitDict = {}) {
      const event = eventFactory(e, eventInitDict);
      target.dispatchEvent(event);
    }
    function websocketMessageReceived(handler, type, data) {
      handler.onMessage(type, data);
    }
    function toArrayBuffer(buffer) {
      if (buffer.byteLength === buffer.buffer.byteLength) {
        return buffer.buffer;
      }
      return new Uint8Array(buffer).buffer;
    }
    function isValidSubprotocol(protocol) {
      if (protocol.length === 0) {
        return false;
      }
      for (let i = 0; i < protocol.length; ++i) {
        const code = protocol.charCodeAt(i);
        if (code < 33 || // CTL, contains SP (0x20) and HT (0x09)
        code > 126 || code === 34 || // "
        code === 40 || // (
        code === 41 || // )
        code === 44 || // ,
        code === 47 || // /
        code === 58 || // :
        code === 59 || // ;
        code === 60 || // <
        code === 61 || // =
        code === 62 || // >
        code === 63 || // ?
        code === 64 || // @
        code === 91 || // [
        code === 92 || // \
        code === 93 || // ]
        code === 123 || // {
        code === 125) {
          return false;
        }
      }
      return true;
    }
    function isValidStatusCode(code) {
      if (code >= 1e3 && code < 1015) {
        return code !== 1004 && // reserved
        code !== 1005 && // "MUST NOT be set as a status code"
        code !== 1006;
      }
      return code >= 3e3 && code <= 4999;
    }
    function isControlFrame(opcode) {
      return opcode === opcodes.CLOSE || opcode === opcodes.PING || opcode === opcodes.PONG;
    }
    function isContinuationFrame(opcode) {
      return opcode === opcodes.CONTINUATION;
    }
    function isTextBinaryFrame(opcode) {
      return opcode === opcodes.TEXT || opcode === opcodes.BINARY;
    }
    function isValidOpcode(opcode) {
      return isTextBinaryFrame(opcode) || isContinuationFrame(opcode) || isControlFrame(opcode);
    }
    function parseExtensions(extensions) {
      const position = { position: 0 };
      const extensionList = /* @__PURE__ */ new Map();
      while (position.position < extensions.length) {
        const pair = collectASequenceOfCodePointsFast(";", extensions, position);
        const [name, value = ""] = pair.split("=", 2);
        extensionList.set(
          removeHTTPWhitespace(name, true, false),
          removeHTTPWhitespace(value, false, true)
        );
        position.position++;
      }
      return extensionList;
    }
    function isValidClientWindowBits(value) {
      for (let i = 0; i < value.length; i++) {
        const byte = value.charCodeAt(i);
        if (byte < 48 || byte > 57) {
          return false;
        }
      }
      return true;
    }
    function getURLRecord(url, baseURL) {
      let urlRecord;
      try {
        urlRecord = new URL(url, baseURL);
      } catch (e) {
        throw new DOMException(e, "SyntaxError");
      }
      if (urlRecord.protocol === "http:") {
        urlRecord.protocol = "ws:";
      } else if (urlRecord.protocol === "https:") {
        urlRecord.protocol = "wss:";
      }
      if (urlRecord.protocol !== "ws:" && urlRecord.protocol !== "wss:") {
        throw new DOMException("expected a ws: or wss: url", "SyntaxError");
      }
      if (urlRecord.hash.length || urlRecord.href.endsWith("#")) {
        throw new DOMException("hash", "SyntaxError");
      }
      return urlRecord;
    }
    function validateCloseCodeAndReason(code, reason) {
      if (code !== null) {
        if (code !== 1e3 && (code < 3e3 || code > 4999)) {
          throw new DOMException("invalid code", "InvalidAccessError");
        }
      }
      if (reason !== null) {
        const reasonBytesLength = Buffer.byteLength(reason);
        if (reasonBytesLength > 123) {
          throw new DOMException(`Reason must be less than 123 bytes; received ${reasonBytesLength}`, "SyntaxError");
        }
      }
    }
    var utf8Decode = (() => {
      if (typeof process.versions.icu === "string") {
        const fatalDecoder = new TextDecoder("utf-8", { fatal: true });
        return fatalDecoder.decode.bind(fatalDecoder);
      }
      return function(buffer) {
        if (isUtf8(buffer)) {
          return buffer.toString("utf-8");
        }
        throw new TypeError("Invalid utf-8 received.");
      };
    })();
    module2.exports = {
      isConnecting,
      isEstablished,
      isClosing,
      isClosed,
      fireEvent,
      isValidSubprotocol,
      isValidStatusCode,
      websocketMessageReceived,
      utf8Decode,
      isControlFrame,
      isContinuationFrame,
      isTextBinaryFrame,
      isValidOpcode,
      parseExtensions,
      isValidClientWindowBits,
      toArrayBuffer,
      getURLRecord,
      validateCloseCodeAndReason
    };
  }
});

// node_modules/undici/lib/web/websocket/frame.js
var require_frame = __commonJS({
  "node_modules/undici/lib/web/websocket/frame.js"(exports2, module2) {
    "use strict";
    var { maxUnsigned16Bit, opcodes } = require_constants5();
    var BUFFER_SIZE = 8 * 1024;
    var crypto;
    var buffer = null;
    var bufIdx = BUFFER_SIZE;
    try {
      crypto = require("node:crypto");
    } catch {
      crypto = {
        // not full compatibility, but minimum.
        randomFillSync: function randomFillSync(buffer2, _offset, _size) {
          for (let i = 0; i < buffer2.length; ++i) {
            buffer2[i] = Math.random() * 255 | 0;
          }
          return buffer2;
        }
      };
    }
    function generateMask() {
      if (bufIdx === BUFFER_SIZE) {
        bufIdx = 0;
        crypto.randomFillSync(buffer ??= Buffer.allocUnsafeSlow(BUFFER_SIZE), 0, BUFFER_SIZE);
      }
      return [buffer[bufIdx++], buffer[bufIdx++], buffer[bufIdx++], buffer[bufIdx++]];
    }
    var WebsocketFrameSend = class {
      /**
       * @param {Buffer|undefined} data
       */
      constructor(data) {
        this.frameData = data;
      }
      createFrame(opcode) {
        const frameData = this.frameData;
        const maskKey = generateMask();
        const bodyLength = frameData?.byteLength ?? 0;
        let payloadLength = bodyLength;
        let offset = 6;
        if (bodyLength > maxUnsigned16Bit) {
          offset += 8;
          payloadLength = 127;
        } else if (bodyLength > 125) {
          offset += 2;
          payloadLength = 126;
        }
        const buffer2 = Buffer.allocUnsafe(bodyLength + offset);
        buffer2[0] = buffer2[1] = 0;
        buffer2[0] |= 128;
        buffer2[0] = (buffer2[0] & 240) + opcode;
        buffer2[offset - 4] = maskKey[0];
        buffer2[offset - 3] = maskKey[1];
        buffer2[offset - 2] = maskKey[2];
        buffer2[offset - 1] = maskKey[3];
        buffer2[1] = payloadLength;
        if (payloadLength === 126) {
          buffer2.writeUInt16BE(bodyLength, 2);
        } else if (payloadLength === 127) {
          buffer2[2] = buffer2[3] = 0;
          buffer2.writeUIntBE(bodyLength, 4, 6);
        }
        buffer2[1] |= 128;
        for (let i = 0; i < bodyLength; ++i) {
          buffer2[offset + i] = frameData[i] ^ maskKey[i & 3];
        }
        return buffer2;
      }
      /**
       * @param {Uint8Array} buffer
       */
      static createFastTextFrame(buffer2) {
        const maskKey = generateMask();
        const bodyLength = buffer2.length;
        for (let i = 0; i < bodyLength; ++i) {
          buffer2[i] ^= maskKey[i & 3];
        }
        let payloadLength = bodyLength;
        let offset = 6;
        if (bodyLength > maxUnsigned16Bit) {
          offset += 8;
          payloadLength = 127;
        } else if (bodyLength > 125) {
          offset += 2;
          payloadLength = 126;
        }
        const head = Buffer.allocUnsafeSlow(offset);
        head[0] = 128 | opcodes.TEXT;
        head[1] = payloadLength | 128;
        head[offset - 4] = maskKey[0];
        head[offset - 3] = maskKey[1];
        head[offset - 2] = maskKey[2];
        head[offset - 1] = maskKey[3];
        if (payloadLength === 126) {
          head.writeUInt16BE(bodyLength, 2);
        } else if (payloadLength === 127) {
          head[2] = head[3] = 0;
          head.writeUIntBE(bodyLength, 4, 6);
        }
        return [head, buffer2];
      }
    };
    module2.exports = {
      WebsocketFrameSend,
      generateMask
      // for benchmark
    };
  }
});

// node_modules/undici/lib/web/websocket/connection.js
var require_connection = __commonJS({
  "node_modules/undici/lib/web/websocket/connection.js"(exports2, module2) {
    "use strict";
    var { uid, states, sentCloseFrameState, emptyBuffer, opcodes } = require_constants5();
    var { parseExtensions, isClosed, isClosing, isEstablished, validateCloseCodeAndReason } = require_util5();
    var { channels } = require_diagnostics();
    var { makeRequest } = require_request2();
    var { fetching } = require_fetch();
    var { Headers, getHeadersList } = require_headers();
    var { getDecodeSplit } = require_util2();
    var { WebsocketFrameSend } = require_frame();
    var assert = require("node:assert");
    var crypto;
    try {
      crypto = require("node:crypto");
    } catch {
    }
    function establishWebSocketConnection(url, protocols, client, handler, options) {
      const requestURL = url;
      requestURL.protocol = url.protocol === "ws:" ? "http:" : "https:";
      const request = makeRequest({
        urlList: [requestURL],
        client,
        serviceWorkers: "none",
        referrer: "no-referrer",
        mode: "websocket",
        credentials: "include",
        cache: "no-store",
        redirect: "error"
      });
      if (options.headers) {
        const headersList = getHeadersList(new Headers(options.headers));
        request.headersList = headersList;
      }
      const keyValue = crypto.randomBytes(16).toString("base64");
      request.headersList.append("sec-websocket-key", keyValue, true);
      request.headersList.append("sec-websocket-version", "13", true);
      for (const protocol of protocols) {
        request.headersList.append("sec-websocket-protocol", protocol, true);
      }
      const permessageDeflate = "permessage-deflate; client_max_window_bits";
      request.headersList.append("sec-websocket-extensions", permessageDeflate, true);
      const controller = fetching({
        request,
        useParallelQueue: true,
        dispatcher: options.dispatcher,
        processResponse(response) {
          if (response.type === "error") {
            handler.readyState = states.CLOSED;
          }
          if (response.type === "error" || response.status !== 101) {
            failWebsocketConnection(handler, 1002, "Received network error or non-101 status code.", response.error);
            return;
          }
          if (protocols.length !== 0 && !response.headersList.get("Sec-WebSocket-Protocol")) {
            failWebsocketConnection(handler, 1002, "Server did not respond with sent protocols.");
            return;
          }
          if (response.headersList.get("Upgrade")?.toLowerCase() !== "websocket") {
            failWebsocketConnection(handler, 1002, 'Server did not set Upgrade header to "websocket".');
            return;
          }
          if (response.headersList.get("Connection")?.toLowerCase() !== "upgrade") {
            failWebsocketConnection(handler, 1002, 'Server did not set Connection header to "upgrade".');
            return;
          }
          const secWSAccept = response.headersList.get("Sec-WebSocket-Accept");
          const digest = crypto.createHash("sha1").update(keyValue + uid).digest("base64");
          if (secWSAccept !== digest) {
            failWebsocketConnection(handler, 1002, "Incorrect hash received in Sec-WebSocket-Accept header.");
            return;
          }
          const secExtension = response.headersList.get("Sec-WebSocket-Extensions");
          let extensions;
          if (secExtension !== null) {
            extensions = parseExtensions(secExtension);
            if (!extensions.has("permessage-deflate")) {
              failWebsocketConnection(handler, 1002, "Sec-WebSocket-Extensions header does not match.");
              return;
            }
          }
          const secProtocol = response.headersList.get("Sec-WebSocket-Protocol");
          if (secProtocol !== null) {
            const requestProtocols = getDecodeSplit("sec-websocket-protocol", request.headersList);
            if (!requestProtocols.includes(secProtocol)) {
              failWebsocketConnection(handler, 1002, "Protocol was not set in the opening handshake.");
              return;
            }
          }
          response.socket.on("data", handler.onSocketData);
          response.socket.on("close", handler.onSocketClose);
          response.socket.on("error", handler.onSocketError);
          if (channels.open.hasSubscribers) {
            channels.open.publish({
              address: response.socket.address(),
              protocol: secProtocol,
              extensions: secExtension
            });
          }
          handler.wasEverConnected = true;
          handler.onConnectionEstablished(response, extensions);
        }
      });
      return controller;
    }
    function closeWebSocketConnection(object, code, reason, validate = false) {
      code ??= null;
      reason ??= "";
      if (validate) validateCloseCodeAndReason(code, reason);
      if (isClosed(object.readyState) || isClosing(object.readyState)) {
      } else if (!isEstablished(object.readyState)) {
        failWebsocketConnection(object);
        object.readyState = states.CLOSING;
      } else if (!object.closeState.has(sentCloseFrameState.SENT) && !object.closeState.has(sentCloseFrameState.RECEIVED)) {
        const frame = new WebsocketFrameSend();
        if (reason.length !== 0 && code === null) {
          code = 1e3;
        }
        assert(code === null || Number.isInteger(code));
        if (code === null && reason.length === 0) {
          frame.frameData = emptyBuffer;
        } else if (code !== null && reason === null) {
          frame.frameData = Buffer.allocUnsafe(2);
          frame.frameData.writeUInt16BE(code, 0);
        } else if (code !== null && reason !== null) {
          frame.frameData = Buffer.allocUnsafe(2 + Buffer.byteLength(reason));
          frame.frameData.writeUInt16BE(code, 0);
          frame.frameData.write(reason, 2, "utf-8");
        } else {
          frame.frameData = emptyBuffer;
        }
        object.socket.write(frame.createFrame(opcodes.CLOSE));
        object.closeState.add(sentCloseFrameState.SENT);
        object.readyState = states.CLOSING;
      } else {
        object.readyState = states.CLOSING;
      }
    }
    function failWebsocketConnection(handler, code, reason, cause) {
      if (isEstablished(handler.readyState)) {
        closeWebSocketConnection(handler, code, reason, false);
      }
      handler.controller.abort();
      if (handler.socket?.destroyed === false) {
        handler.socket.destroy();
      }
      handler.onFail(code, reason, cause);
    }
    module2.exports = {
      establishWebSocketConnection,
      failWebsocketConnection,
      closeWebSocketConnection
    };
  }
});

// node_modules/undici/lib/web/websocket/permessage-deflate.js
var require_permessage_deflate = __commonJS({
  "node_modules/undici/lib/web/websocket/permessage-deflate.js"(exports2, module2) {
    "use strict";
    var { createInflateRaw, Z_DEFAULT_WINDOWBITS } = require("node:zlib");
    var { isValidClientWindowBits } = require_util5();
    var tail = Buffer.from([0, 0, 255, 255]);
    var kBuffer = Symbol("kBuffer");
    var kLength = Symbol("kLength");
    var PerMessageDeflate = class {
      /** @type {import('node:zlib').InflateRaw} */
      #inflate;
      #options = {};
      constructor(extensions) {
        this.#options.serverNoContextTakeover = extensions.has("server_no_context_takeover");
        this.#options.serverMaxWindowBits = extensions.get("server_max_window_bits");
      }
      decompress(chunk, fin, callback) {
        if (!this.#inflate) {
          let windowBits = Z_DEFAULT_WINDOWBITS;
          if (this.#options.serverMaxWindowBits) {
            if (!isValidClientWindowBits(this.#options.serverMaxWindowBits)) {
              callback(new Error("Invalid server_max_window_bits"));
              return;
            }
            windowBits = Number.parseInt(this.#options.serverMaxWindowBits);
          }
          this.#inflate = createInflateRaw({ windowBits });
          this.#inflate[kBuffer] = [];
          this.#inflate[kLength] = 0;
          this.#inflate.on("data", (data) => {
            this.#inflate[kBuffer].push(data);
            this.#inflate[kLength] += data.length;
          });
          this.#inflate.on("error", (err) => {
            this.#inflate = null;
            callback(err);
          });
        }
        this.#inflate.write(chunk);
        if (fin) {
          this.#inflate.write(tail);
        }
        this.#inflate.flush(() => {
          const full = Buffer.concat(this.#inflate[kBuffer], this.#inflate[kLength]);
          this.#inflate[kBuffer].length = 0;
          this.#inflate[kLength] = 0;
          callback(null, full);
        });
      }
    };
    module2.exports = { PerMessageDeflate };
  }
});

// node_modules/undici/lib/web/websocket/receiver.js
var require_receiver = __commonJS({
  "node_modules/undici/lib/web/websocket/receiver.js"(exports2, module2) {
    "use strict";
    var { Writable } = require("node:stream");
    var assert = require("node:assert");
    var { parserStates, opcodes, states, emptyBuffer, sentCloseFrameState } = require_constants5();
    var { channels } = require_diagnostics();
    var {
      isValidStatusCode,
      isValidOpcode,
      websocketMessageReceived,
      utf8Decode,
      isControlFrame,
      isTextBinaryFrame,
      isContinuationFrame
    } = require_util5();
    var { failWebsocketConnection } = require_connection();
    var { WebsocketFrameSend } = require_frame();
    var { PerMessageDeflate } = require_permessage_deflate();
    var ByteParser = class extends Writable {
      #buffers = [];
      #fragmentsBytes = 0;
      #byteOffset = 0;
      #loop = false;
      #state = parserStates.INFO;
      #info = {};
      #fragments = [];
      /** @type {Map<string, PerMessageDeflate>} */
      #extensions;
      /** @type {import('./websocket').Handler} */
      #handler;
      constructor(handler, extensions) {
        super();
        this.#handler = handler;
        this.#extensions = extensions == null ? /* @__PURE__ */ new Map() : extensions;
        if (this.#extensions.has("permessage-deflate")) {
          this.#extensions.set("permessage-deflate", new PerMessageDeflate(extensions));
        }
      }
      /**
       * @param {Buffer} chunk
       * @param {() => void} callback
       */
      _write(chunk, _, callback) {
        this.#buffers.push(chunk);
        this.#byteOffset += chunk.length;
        this.#loop = true;
        this.run(callback);
      }
      /**
       * Runs whenever a new chunk is received.
       * Callback is called whenever there are no more chunks buffering,
       * or not enough bytes are buffered to parse.
       */
      run(callback) {
        while (this.#loop) {
          if (this.#state === parserStates.INFO) {
            if (this.#byteOffset < 2) {
              return callback();
            }
            const buffer = this.consume(2);
            const fin = (buffer[0] & 128) !== 0;
            const opcode = buffer[0] & 15;
            const masked = (buffer[1] & 128) === 128;
            const fragmented = !fin && opcode !== opcodes.CONTINUATION;
            const payloadLength = buffer[1] & 127;
            const rsv1 = buffer[0] & 64;
            const rsv2 = buffer[0] & 32;
            const rsv3 = buffer[0] & 16;
            if (!isValidOpcode(opcode)) {
              failWebsocketConnection(this.#handler, 1002, "Invalid opcode received");
              return callback();
            }
            if (masked) {
              failWebsocketConnection(this.#handler, 1002, "Frame cannot be masked");
              return callback();
            }
            if (rsv1 !== 0 && !this.#extensions.has("permessage-deflate")) {
              failWebsocketConnection(this.#handler, 1002, "Expected RSV1 to be clear.");
              return;
            }
            if (rsv2 !== 0 || rsv3 !== 0) {
              failWebsocketConnection(this.#handler, 1002, "RSV1, RSV2, RSV3 must be clear");
              return;
            }
            if (fragmented && !isTextBinaryFrame(opcode)) {
              failWebsocketConnection(this.#handler, 1002, "Invalid frame type was fragmented.");
              return;
            }
            if (isTextBinaryFrame(opcode) && this.#fragments.length > 0) {
              failWebsocketConnection(this.#handler, 1002, "Expected continuation frame");
              return;
            }
            if (this.#info.fragmented && fragmented) {
              failWebsocketConnection(this.#handler, 1002, "Fragmented frame exceeded 125 bytes.");
              return;
            }
            if ((payloadLength > 125 || fragmented) && isControlFrame(opcode)) {
              failWebsocketConnection(this.#handler, 1002, "Control frame either too large or fragmented");
              return;
            }
            if (isContinuationFrame(opcode) && this.#fragments.length === 0 && !this.#info.compressed) {
              failWebsocketConnection(this.#handler, 1002, "Unexpected continuation frame");
              return;
            }
            if (payloadLength <= 125) {
              this.#info.payloadLength = payloadLength;
              this.#state = parserStates.READ_DATA;
            } else if (payloadLength === 126) {
              this.#state = parserStates.PAYLOADLENGTH_16;
            } else if (payloadLength === 127) {
              this.#state = parserStates.PAYLOADLENGTH_64;
            }
            if (isTextBinaryFrame(opcode)) {
              this.#info.binaryType = opcode;
              this.#info.compressed = rsv1 !== 0;
            }
            this.#info.opcode = opcode;
            this.#info.masked = masked;
            this.#info.fin = fin;
            this.#info.fragmented = fragmented;
          } else if (this.#state === parserStates.PAYLOADLENGTH_16) {
            if (this.#byteOffset < 2) {
              return callback();
            }
            const buffer = this.consume(2);
            this.#info.payloadLength = buffer.readUInt16BE(0);
            this.#state = parserStates.READ_DATA;
          } else if (this.#state === parserStates.PAYLOADLENGTH_64) {
            if (this.#byteOffset < 8) {
              return callback();
            }
            const buffer = this.consume(8);
            const upper = buffer.readUInt32BE(0);
            if (upper > 2 ** 31 - 1) {
              failWebsocketConnection(this.#handler, 1009, "Received payload length > 2^31 bytes.");
              return;
            }
            const lower = buffer.readUInt32BE(4);
            this.#info.payloadLength = (upper << 8) + lower;
            this.#state = parserStates.READ_DATA;
          } else if (this.#state === parserStates.READ_DATA) {
            if (this.#byteOffset < this.#info.payloadLength) {
              return callback();
            }
            const body = this.consume(this.#info.payloadLength);
            if (isControlFrame(this.#info.opcode)) {
              this.#loop = this.parseControlFrame(body);
              this.#state = parserStates.INFO;
            } else {
              if (!this.#info.compressed) {
                this.writeFragments(body);
                if (!this.#info.fragmented && this.#info.fin) {
                  websocketMessageReceived(this.#handler, this.#info.binaryType, this.consumeFragments());
                }
                this.#state = parserStates.INFO;
              } else {
                this.#extensions.get("permessage-deflate").decompress(body, this.#info.fin, (error, data) => {
                  if (error) {
                    failWebsocketConnection(this.#handler, 1007, error.message);
                    return;
                  }
                  this.writeFragments(data);
                  if (!this.#info.fin) {
                    this.#state = parserStates.INFO;
                    this.#loop = true;
                    this.run(callback);
                    return;
                  }
                  websocketMessageReceived(this.#handler, this.#info.binaryType, this.consumeFragments());
                  this.#loop = true;
                  this.#state = parserStates.INFO;
                  this.run(callback);
                });
                this.#loop = false;
                break;
              }
            }
          }
        }
      }
      /**
       * Take n bytes from the buffered Buffers
       * @param {number} n
       * @returns {Buffer}
       */
      consume(n) {
        if (n > this.#byteOffset) {
          throw new Error("Called consume() before buffers satiated.");
        } else if (n === 0) {
          return emptyBuffer;
        }
        this.#byteOffset -= n;
        const first = this.#buffers[0];
        if (first.length > n) {
          this.#buffers[0] = first.subarray(n, first.length);
          return first.subarray(0, n);
        } else if (first.length === n) {
          return this.#buffers.shift();
        } else {
          let offset = 0;
          const buffer = Buffer.allocUnsafeSlow(n);
          while (offset !== n) {
            const next = this.#buffers[0];
            const length = next.length;
            if (length + offset === n) {
              buffer.set(this.#buffers.shift(), offset);
              break;
            } else if (length + offset > n) {
              buffer.set(next.subarray(0, n - offset), offset);
              this.#buffers[0] = next.subarray(n - offset);
              break;
            } else {
              buffer.set(this.#buffers.shift(), offset);
              offset += length;
            }
          }
          return buffer;
        }
      }
      writeFragments(fragment) {
        this.#fragmentsBytes += fragment.length;
        this.#fragments.push(fragment);
      }
      consumeFragments() {
        const fragments = this.#fragments;
        if (fragments.length === 1) {
          this.#fragmentsBytes = 0;
          return fragments.shift();
        }
        let offset = 0;
        const output = Buffer.allocUnsafeSlow(this.#fragmentsBytes);
        for (let i = 0; i < fragments.length; ++i) {
          const buffer = fragments[i];
          output.set(buffer, offset);
          offset += buffer.length;
        }
        this.#fragments = [];
        this.#fragmentsBytes = 0;
        return output;
      }
      parseCloseBody(data) {
        assert(data.length !== 1);
        let code;
        if (data.length >= 2) {
          code = data.readUInt16BE(0);
        }
        if (code !== void 0 && !isValidStatusCode(code)) {
          return { code: 1002, reason: "Invalid status code", error: true };
        }
        let reason = data.subarray(2);
        if (reason[0] === 239 && reason[1] === 187 && reason[2] === 191) {
          reason = reason.subarray(3);
        }
        try {
          reason = utf8Decode(reason);
        } catch {
          return { code: 1007, reason: "Invalid UTF-8", error: true };
        }
        return { code, reason, error: false };
      }
      /**
       * Parses control frames.
       * @param {Buffer} body
       */
      parseControlFrame(body) {
        const { opcode, payloadLength } = this.#info;
        if (opcode === opcodes.CLOSE) {
          if (payloadLength === 1) {
            failWebsocketConnection(this.#handler, 1002, "Received close frame with a 1-byte body.");
            return false;
          }
          this.#info.closeInfo = this.parseCloseBody(body);
          if (this.#info.closeInfo.error) {
            const { code, reason } = this.#info.closeInfo;
            failWebsocketConnection(this.#handler, code, reason);
            return false;
          }
          if (!this.#handler.closeState.has(sentCloseFrameState.SENT) && !this.#handler.closeState.has(sentCloseFrameState.RECEIVED)) {
            let body2 = emptyBuffer;
            if (this.#info.closeInfo.code) {
              body2 = Buffer.allocUnsafe(2);
              body2.writeUInt16BE(this.#info.closeInfo.code, 0);
            }
            const closeFrame = new WebsocketFrameSend(body2);
            this.#handler.socket.write(closeFrame.createFrame(opcodes.CLOSE));
            this.#handler.closeState.add(sentCloseFrameState.SENT);
          }
          this.#handler.readyState = states.CLOSING;
          this.#handler.closeState.add(sentCloseFrameState.RECEIVED);
          return false;
        } else if (opcode === opcodes.PING) {
          if (!this.#handler.closeState.has(sentCloseFrameState.RECEIVED)) {
            const frame = new WebsocketFrameSend(body);
            this.#handler.socket.write(frame.createFrame(opcodes.PONG));
            if (channels.ping.hasSubscribers) {
              channels.ping.publish({
                payload: body
              });
            }
          }
        } else if (opcode === opcodes.PONG) {
          if (channels.pong.hasSubscribers) {
            channels.pong.publish({
              payload: body
            });
          }
        }
        return true;
      }
      get closingInfo() {
        return this.#info.closeInfo;
      }
    };
    module2.exports = {
      ByteParser
    };
  }
});

// node_modules/undici/lib/web/websocket/sender.js
var require_sender = __commonJS({
  "node_modules/undici/lib/web/websocket/sender.js"(exports2, module2) {
    "use strict";
    var { WebsocketFrameSend } = require_frame();
    var { opcodes, sendHints } = require_constants5();
    var FixedQueue = require_fixed_queue();
    var SendQueue = class {
      /**
       * @type {FixedQueue}
       */
      #queue = new FixedQueue();
      /**
       * @type {boolean}
       */
      #running = false;
      /** @type {import('node:net').Socket} */
      #socket;
      constructor(socket) {
        this.#socket = socket;
      }
      add(item, cb, hint) {
        if (hint !== sendHints.blob) {
          if (!this.#running) {
            if (hint === sendHints.text) {
              const { 0: head, 1: body } = WebsocketFrameSend.createFastTextFrame(item);
              this.#socket.cork();
              this.#socket.write(head);
              this.#socket.write(body, cb);
              this.#socket.uncork();
            } else {
              this.#socket.write(createFrame(item, hint), cb);
            }
          } else {
            const node2 = {
              promise: null,
              callback: cb,
              frame: createFrame(item, hint)
            };
            this.#queue.push(node2);
          }
          return;
        }
        const node = {
          promise: item.arrayBuffer().then((ab) => {
            node.promise = null;
            node.frame = createFrame(ab, hint);
          }),
          callback: cb,
          frame: null
        };
        this.#queue.push(node);
        if (!this.#running) {
          this.#run();
        }
      }
      async #run() {
        this.#running = true;
        const queue = this.#queue;
        while (!queue.isEmpty()) {
          const node = queue.shift();
          if (node.promise !== null) {
            await node.promise;
          }
          this.#socket.write(node.frame, node.callback);
          node.callback = node.frame = null;
        }
        this.#running = false;
      }
    };
    function createFrame(data, hint) {
      return new WebsocketFrameSend(toBuffer(data, hint)).createFrame(hint === sendHints.text ? opcodes.TEXT : opcodes.BINARY);
    }
    function toBuffer(data, hint) {
      switch (hint) {
        case sendHints.text:
        case sendHints.typedArray:
          return new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
        case sendHints.arrayBuffer:
        case sendHints.blob:
          return new Uint8Array(data);
      }
    }
    module2.exports = { SendQueue };
  }
});

// node_modules/undici/lib/web/websocket/websocket.js
var require_websocket = __commonJS({
  "node_modules/undici/lib/web/websocket/websocket.js"(exports2, module2) {
    "use strict";
    var { webidl } = require_webidl();
    var { URLSerializer } = require_data_url();
    var { environmentSettingsObject } = require_util2();
    var { staticPropertyDescriptors, states, sentCloseFrameState, sendHints, opcodes } = require_constants5();
    var {
      isConnecting,
      isEstablished,
      isClosing,
      isValidSubprotocol,
      fireEvent,
      utf8Decode,
      toArrayBuffer,
      getURLRecord
    } = require_util5();
    var { establishWebSocketConnection, closeWebSocketConnection, failWebsocketConnection } = require_connection();
    var { ByteParser } = require_receiver();
    var { kEnumerableProperty } = require_util();
    var { getGlobalDispatcher } = require_global2();
    var { types } = require("node:util");
    var { ErrorEvent, CloseEvent, createFastMessageEvent } = require_events();
    var { SendQueue } = require_sender();
    var { channels } = require_diagnostics();
    var WebSocket = class _WebSocket extends EventTarget {
      #events = {
        open: null,
        error: null,
        close: null,
        message: null
      };
      #bufferedAmount = 0;
      #protocol = "";
      #extensions = "";
      /** @type {SendQueue} */
      #sendQueue;
      /** @type {Handler} */
      #handler = {
        onConnectionEstablished: (response, extensions) => this.#onConnectionEstablished(response, extensions),
        onFail: (code, reason, cause) => this.#onFail(code, reason, cause),
        onMessage: (opcode, data) => this.#onMessage(opcode, data),
        onParserError: (err) => failWebsocketConnection(this.#handler, null, err.message),
        onParserDrain: () => this.#onParserDrain(),
        onSocketData: (chunk) => {
          if (!this.#parser.write(chunk)) {
            this.#handler.socket.pause();
          }
        },
        onSocketError: (err) => {
          this.#handler.readyState = states.CLOSING;
          if (channels.socketError.hasSubscribers) {
            channels.socketError.publish(err);
          }
          this.#handler.socket.destroy();
        },
        onSocketClose: () => this.#onSocketClose(),
        readyState: states.CONNECTING,
        socket: null,
        closeState: /* @__PURE__ */ new Set(),
        controller: null,
        wasEverConnected: false
      };
      #url;
      #binaryType;
      /** @type {import('./receiver').ByteParser} */
      #parser;
      /**
       * @param {string} url
       * @param {string|string[]} protocols
       */
      constructor(url, protocols = []) {
        super();
        webidl.util.markAsUncloneable(this);
        const prefix = "WebSocket constructor";
        webidl.argumentLengthCheck(arguments, 1, prefix);
        const options = webidl.converters["DOMString or sequence<DOMString> or WebSocketInit"](protocols, prefix, "options");
        url = webidl.converters.USVString(url);
        protocols = options.protocols;
        const baseURL = environmentSettingsObject.settingsObject.baseUrl;
        const urlRecord = getURLRecord(url, baseURL);
        if (typeof protocols === "string") {
          protocols = [protocols];
        }
        if (protocols.length !== new Set(protocols.map((p) => p.toLowerCase())).size) {
          throw new DOMException("Invalid Sec-WebSocket-Protocol value", "SyntaxError");
        }
        if (protocols.length > 0 && !protocols.every((p) => isValidSubprotocol(p))) {
          throw new DOMException("Invalid Sec-WebSocket-Protocol value", "SyntaxError");
        }
        this.#url = new URL(urlRecord.href);
        const client = environmentSettingsObject.settingsObject;
        this.#handler.controller = establishWebSocketConnection(
          urlRecord,
          protocols,
          client,
          this.#handler,
          options
        );
        this.#handler.readyState = _WebSocket.CONNECTING;
        this.#binaryType = "blob";
      }
      /**
       * @see https://websockets.spec.whatwg.org/#dom-websocket-close
       * @param {number|undefined} code
       * @param {string|undefined} reason
       */
      close(code = void 0, reason = void 0) {
        webidl.brandCheck(this, _WebSocket);
        const prefix = "WebSocket.close";
        if (code !== void 0) {
          code = webidl.converters["unsigned short"](code, prefix, "code", { clamp: true });
        }
        if (reason !== void 0) {
          reason = webidl.converters.USVString(reason);
        }
        code ??= null;
        reason ??= "";
        closeWebSocketConnection(this.#handler, code, reason, true);
      }
      /**
       * @see https://websockets.spec.whatwg.org/#dom-websocket-send
       * @param {NodeJS.TypedArray|ArrayBuffer|Blob|string} data
       */
      send(data) {
        webidl.brandCheck(this, _WebSocket);
        const prefix = "WebSocket.send";
        webidl.argumentLengthCheck(arguments, 1, prefix);
        data = webidl.converters.WebSocketSendData(data, prefix, "data");
        if (isConnecting(this.#handler.readyState)) {
          throw new DOMException("Sent before connected.", "InvalidStateError");
        }
        if (!isEstablished(this.#handler.readyState) || isClosing(this.#handler.readyState)) {
          return;
        }
        if (typeof data === "string") {
          const buffer = Buffer.from(data);
          this.#bufferedAmount += buffer.byteLength;
          this.#sendQueue.add(buffer, () => {
            this.#bufferedAmount -= buffer.byteLength;
          }, sendHints.text);
        } else if (types.isArrayBuffer(data)) {
          this.#bufferedAmount += data.byteLength;
          this.#sendQueue.add(data, () => {
            this.#bufferedAmount -= data.byteLength;
          }, sendHints.arrayBuffer);
        } else if (ArrayBuffer.isView(data)) {
          this.#bufferedAmount += data.byteLength;
          this.#sendQueue.add(data, () => {
            this.#bufferedAmount -= data.byteLength;
          }, sendHints.typedArray);
        } else if (webidl.is.Blob(data)) {
          this.#bufferedAmount += data.size;
          this.#sendQueue.add(data, () => {
            this.#bufferedAmount -= data.size;
          }, sendHints.blob);
        }
      }
      get readyState() {
        webidl.brandCheck(this, _WebSocket);
        return this.#handler.readyState;
      }
      get bufferedAmount() {
        webidl.brandCheck(this, _WebSocket);
        return this.#bufferedAmount;
      }
      get url() {
        webidl.brandCheck(this, _WebSocket);
        return URLSerializer(this.#url);
      }
      get extensions() {
        webidl.brandCheck(this, _WebSocket);
        return this.#extensions;
      }
      get protocol() {
        webidl.brandCheck(this, _WebSocket);
        return this.#protocol;
      }
      get onopen() {
        webidl.brandCheck(this, _WebSocket);
        return this.#events.open;
      }
      set onopen(fn) {
        webidl.brandCheck(this, _WebSocket);
        if (this.#events.open) {
          this.removeEventListener("open", this.#events.open);
        }
        if (typeof fn === "function") {
          this.#events.open = fn;
          this.addEventListener("open", fn);
        } else {
          this.#events.open = null;
        }
      }
      get onerror() {
        webidl.brandCheck(this, _WebSocket);
        return this.#events.error;
      }
      set onerror(fn) {
        webidl.brandCheck(this, _WebSocket);
        if (this.#events.error) {
          this.removeEventListener("error", this.#events.error);
        }
        if (typeof fn === "function") {
          this.#events.error = fn;
          this.addEventListener("error", fn);
        } else {
          this.#events.error = null;
        }
      }
      get onclose() {
        webidl.brandCheck(this, _WebSocket);
        return this.#events.close;
      }
      set onclose(fn) {
        webidl.brandCheck(this, _WebSocket);
        if (this.#events.close) {
          this.removeEventListener("close", this.#events.close);
        }
        if (typeof fn === "function") {
          this.#events.close = fn;
          this.addEventListener("close", fn);
        } else {
          this.#events.close = null;
        }
      }
      get onmessage() {
        webidl.brandCheck(this, _WebSocket);
        return this.#events.message;
      }
      set onmessage(fn) {
        webidl.brandCheck(this, _WebSocket);
        if (this.#events.message) {
          this.removeEventListener("message", this.#events.message);
        }
        if (typeof fn === "function") {
          this.#events.message = fn;
          this.addEventListener("message", fn);
        } else {
          this.#events.message = null;
        }
      }
      get binaryType() {
        webidl.brandCheck(this, _WebSocket);
        return this.#binaryType;
      }
      set binaryType(type) {
        webidl.brandCheck(this, _WebSocket);
        if (type !== "blob" && type !== "arraybuffer") {
          this.#binaryType = "blob";
        } else {
          this.#binaryType = type;
        }
      }
      /**
       * @see https://websockets.spec.whatwg.org/#feedback-from-the-protocol
       */
      #onConnectionEstablished(response, parsedExtensions) {
        this.#handler.socket = response.socket;
        const parser = new ByteParser(this.#handler, parsedExtensions);
        parser.on("drain", () => this.#handler.onParserDrain());
        parser.on("error", (err) => this.#handler.onParserError(err));
        this.#parser = parser;
        this.#sendQueue = new SendQueue(response.socket);
        this.#handler.readyState = states.OPEN;
        const extensions = response.headersList.get("sec-websocket-extensions");
        if (extensions !== null) {
          this.#extensions = extensions;
        }
        const protocol = response.headersList.get("sec-websocket-protocol");
        if (protocol !== null) {
          this.#protocol = protocol;
        }
        fireEvent("open", this);
      }
      #onFail(code, reason, cause) {
        if (reason) {
          fireEvent("error", this, (type, init) => new ErrorEvent(type, init), {
            error: new Error(reason, cause ? { cause } : void 0),
            message: reason
          });
        }
        if (!this.#handler.wasEverConnected) {
          this.#handler.readyState = states.CLOSED;
          fireEvent("close", this, (type, init) => new CloseEvent(type, init), {
            wasClean: false,
            code,
            reason
          });
        }
      }
      #onMessage(type, data) {
        if (this.#handler.readyState !== states.OPEN) {
          return;
        }
        let dataForEvent;
        if (type === opcodes.TEXT) {
          try {
            dataForEvent = utf8Decode(data);
          } catch {
            failWebsocketConnection(this.#handler, 1007, "Received invalid UTF-8 in text frame.");
            return;
          }
        } else if (type === opcodes.BINARY) {
          if (this.#binaryType === "blob") {
            dataForEvent = new Blob([data]);
          } else {
            dataForEvent = toArrayBuffer(data);
          }
        }
        fireEvent("message", this, createFastMessageEvent, {
          origin: this.#url.origin,
          data: dataForEvent
        });
      }
      #onParserDrain() {
        this.#handler.socket.resume();
      }
      /**
       * @see https://websockets.spec.whatwg.org/#feedback-from-the-protocol
       * @see https://datatracker.ietf.org/doc/html/rfc6455#section-7.1.4
       */
      #onSocketClose() {
        const wasClean = this.#handler.closeState.has(sentCloseFrameState.SENT) && this.#handler.closeState.has(sentCloseFrameState.RECEIVED);
        let code = 1005;
        let reason = "";
        const result = this.#parser.closingInfo;
        if (result && !result.error) {
          code = result.code ?? 1005;
          reason = result.reason;
        } else if (!this.#handler.closeState.has(sentCloseFrameState.RECEIVED)) {
          code = 1006;
        }
        this.#handler.readyState = states.CLOSED;
        fireEvent("close", this, (type, init) => new CloseEvent(type, init), {
          wasClean,
          code,
          reason
        });
        if (channels.close.hasSubscribers) {
          channels.close.publish({
            websocket: this,
            code,
            reason
          });
        }
      }
    };
    WebSocket.CONNECTING = WebSocket.prototype.CONNECTING = states.CONNECTING;
    WebSocket.OPEN = WebSocket.prototype.OPEN = states.OPEN;
    WebSocket.CLOSING = WebSocket.prototype.CLOSING = states.CLOSING;
    WebSocket.CLOSED = WebSocket.prototype.CLOSED = states.CLOSED;
    Object.defineProperties(WebSocket.prototype, {
      CONNECTING: staticPropertyDescriptors,
      OPEN: staticPropertyDescriptors,
      CLOSING: staticPropertyDescriptors,
      CLOSED: staticPropertyDescriptors,
      url: kEnumerableProperty,
      readyState: kEnumerableProperty,
      bufferedAmount: kEnumerableProperty,
      onopen: kEnumerableProperty,
      onerror: kEnumerableProperty,
      onclose: kEnumerableProperty,
      close: kEnumerableProperty,
      onmessage: kEnumerableProperty,
      binaryType: kEnumerableProperty,
      send: kEnumerableProperty,
      extensions: kEnumerableProperty,
      protocol: kEnumerableProperty,
      [Symbol.toStringTag]: {
        value: "WebSocket",
        writable: false,
        enumerable: false,
        configurable: true
      }
    });
    Object.defineProperties(WebSocket, {
      CONNECTING: staticPropertyDescriptors,
      OPEN: staticPropertyDescriptors,
      CLOSING: staticPropertyDescriptors,
      CLOSED: staticPropertyDescriptors
    });
    webidl.converters["sequence<DOMString>"] = webidl.sequenceConverter(
      webidl.converters.DOMString
    );
    webidl.converters["DOMString or sequence<DOMString>"] = function(V, prefix, argument) {
      if (webidl.util.Type(V) === webidl.util.Types.OBJECT && Symbol.iterator in V) {
        return webidl.converters["sequence<DOMString>"](V);
      }
      return webidl.converters.DOMString(V, prefix, argument);
    };
    webidl.converters.WebSocketInit = webidl.dictionaryConverter([
      {
        key: "protocols",
        converter: webidl.converters["DOMString or sequence<DOMString>"],
        defaultValue: () => new Array(0)
      },
      {
        key: "dispatcher",
        converter: webidl.converters.any,
        defaultValue: () => getGlobalDispatcher()
      },
      {
        key: "headers",
        converter: webidl.nullableConverter(webidl.converters.HeadersInit)
      }
    ]);
    webidl.converters["DOMString or sequence<DOMString> or WebSocketInit"] = function(V) {
      if (webidl.util.Type(V) === webidl.util.Types.OBJECT && !(Symbol.iterator in V)) {
        return webidl.converters.WebSocketInit(V);
      }
      return { protocols: webidl.converters["DOMString or sequence<DOMString>"](V) };
    };
    webidl.converters.WebSocketSendData = function(V) {
      if (webidl.util.Type(V) === webidl.util.Types.OBJECT) {
        if (webidl.is.Blob(V)) {
          return V;
        }
        if (ArrayBuffer.isView(V) || types.isArrayBuffer(V)) {
          return V;
        }
      }
      return webidl.converters.USVString(V);
    };
    module2.exports = {
      WebSocket
    };
  }
});

// node_modules/undici/lib/web/websocket/stream/websocketerror.js
var require_websocketerror = __commonJS({
  "node_modules/undici/lib/web/websocket/stream/websocketerror.js"(exports2, module2) {
    "use strict";
    var { webidl } = require_webidl();
    var { validateCloseCodeAndReason } = require_util5();
    var { kConstruct } = require_symbols();
    var { kEnumerableProperty } = require_util();
    var WebSocketError = class _WebSocketError extends DOMException {
      #closeCode;
      #reason;
      constructor(message = "", init = void 0) {
        message = webidl.converters.DOMString(message, "WebSocketError", "message");
        super(message, "WebSocketError");
        if (init === kConstruct) {
          return;
        } else if (init !== null) {
          init = webidl.converters.WebSocketCloseInfo(init);
        }
        let code = init.closeCode ?? null;
        const reason = init.reason ?? "";
        validateCloseCodeAndReason(code, reason);
        if (reason.length !== 0 && code === null) {
          code = 1e3;
        }
        this.#closeCode = code;
        this.#reason = reason;
      }
      get closeCode() {
        return this.#closeCode;
      }
      get reason() {
        return this.#reason;
      }
      /**
       * @param {string} message
       * @param {number|null} code
       * @param {string} reason
       */
      static createUnvalidatedWebSocketError(message, code, reason) {
        const error = new _WebSocketError(message, kConstruct);
        error.#closeCode = code;
        error.#reason = reason;
        return error;
      }
    };
    var { createUnvalidatedWebSocketError } = WebSocketError;
    delete WebSocketError.createUnvalidatedWebSocketError;
    Object.defineProperties(WebSocketError.prototype, {
      closeCode: kEnumerableProperty,
      reason: kEnumerableProperty,
      [Symbol.toStringTag]: {
        value: "WebSocketError",
        writable: false,
        enumerable: false,
        configurable: true
      }
    });
    webidl.is.WebSocketError = webidl.util.MakeTypeAssertion(WebSocketError);
    module2.exports = { WebSocketError, createUnvalidatedWebSocketError };
  }
});

// node_modules/undici/lib/web/websocket/stream/websocketstream.js
var require_websocketstream = __commonJS({
  "node_modules/undici/lib/web/websocket/stream/websocketstream.js"(exports2, module2) {
    "use strict";
    var { createDeferredPromise, environmentSettingsObject } = require_util2();
    var { states, opcodes, sentCloseFrameState } = require_constants5();
    var { webidl } = require_webidl();
    var { getURLRecord, isValidSubprotocol, isEstablished, utf8Decode } = require_util5();
    var { establishWebSocketConnection, failWebsocketConnection, closeWebSocketConnection } = require_connection();
    var { types } = require("node:util");
    var { channels } = require_diagnostics();
    var { WebsocketFrameSend } = require_frame();
    var { ByteParser } = require_receiver();
    var { WebSocketError, createUnvalidatedWebSocketError } = require_websocketerror();
    var { utf8DecodeBytes } = require_util2();
    var { kEnumerableProperty } = require_util();
    var emittedExperimentalWarning = false;
    var WebSocketStream = class {
      // Each WebSocketStream object has an associated url , which is a URL record .
      /** @type {URL} */
      #url;
      // Each WebSocketStream object has an associated opened promise , which is a promise.
      /** @type {ReturnType<typeof createDeferredPromise>} */
      #openedPromise;
      // Each WebSocketStream object has an associated closed promise , which is a promise.
      /** @type {ReturnType<typeof createDeferredPromise>} */
      #closedPromise;
      // Each WebSocketStream object has an associated readable stream , which is a ReadableStream .
      /** @type {ReadableStream} */
      #readableStream;
      /** @type {ReadableStreamDefaultController} */
      #readableStreamController;
      // Each WebSocketStream object has an associated writable stream , which is a WritableStream .
      /** @type {WritableStream} */
      #writableStream;
      // Each WebSocketStream object has an associated boolean handshake aborted , which is initially false.
      #handshakeAborted = false;
      /** @type {import('../websocket').Handler} */
      #handler = {
        // https://whatpr.org/websockets/48/7b748d3...d5570f3.html#feedback-to-websocket-stream-from-the-protocol
        onConnectionEstablished: (response, extensions) => this.#onConnectionEstablished(response, extensions),
        onFail: (_code, _reason) => {
        },
        onMessage: (opcode, data) => this.#onMessage(opcode, data),
        onParserError: (err) => failWebsocketConnection(this.#handler, null, err.message),
        onParserDrain: () => this.#handler.socket.resume(),
        onSocketData: (chunk) => {
          if (!this.#parser.write(chunk)) {
            this.#handler.socket.pause();
          }
        },
        onSocketError: (err) => {
          this.#handler.readyState = states.CLOSING;
          if (channels.socketError.hasSubscribers) {
            channels.socketError.publish(err);
          }
          this.#handler.socket.destroy();
        },
        onSocketClose: () => this.#onSocketClose(),
        readyState: states.CONNECTING,
        socket: null,
        closeState: /* @__PURE__ */ new Set(),
        controller: null,
        wasEverConnected: false
      };
      /** @type {import('../receiver').ByteParser} */
      #parser;
      constructor(url, options = void 0) {
        if (!emittedExperimentalWarning) {
          process.emitWarning("WebSocketStream is experimental! Expect it to change at any time.", {
            code: "UNDICI-WSS"
          });
          emittedExperimentalWarning = true;
        }
        webidl.argumentLengthCheck(arguments, 1, "WebSocket");
        url = webidl.converters.USVString(url);
        if (options !== null) {
          options = webidl.converters.WebSocketStreamOptions(options);
        }
        const baseURL = environmentSettingsObject.settingsObject.baseUrl;
        const urlRecord = getURLRecord(url, baseURL);
        const protocols = options.protocols;
        if (protocols.length !== new Set(protocols.map((p) => p.toLowerCase())).size) {
          throw new DOMException("Invalid Sec-WebSocket-Protocol value", "SyntaxError");
        }
        if (protocols.length > 0 && !protocols.every((p) => isValidSubprotocol(p))) {
          throw new DOMException("Invalid Sec-WebSocket-Protocol value", "SyntaxError");
        }
        this.#url = urlRecord.toString();
        this.#openedPromise = createDeferredPromise();
        this.#closedPromise = createDeferredPromise();
        if (options.signal != null) {
          const signal = options.signal;
          if (signal.aborted) {
            this.#openedPromise.reject(signal.reason);
            this.#closedPromise.reject(signal.reason);
            return;
          }
          signal.addEventListener("abort", () => {
            if (!isEstablished(this.#handler.readyState)) {
              failWebsocketConnection(this.#handler);
              this.#handler.readyState = states.CLOSING;
              this.#openedPromise.reject(signal.reason);
              this.#closedPromise.reject(signal.reason);
              this.#handshakeAborted = true;
            }
          }, { once: true });
        }
        const client = environmentSettingsObject.settingsObject;
        this.#handler.controller = establishWebSocketConnection(
          urlRecord,
          protocols,
          client,
          this.#handler,
          options
        );
      }
      // The url getter steps are to return this 's url , serialized .
      get url() {
        return this.#url.toString();
      }
      // The opened getter steps are to return this 's opened promise .
      get opened() {
        return this.#openedPromise.promise;
      }
      // The closed getter steps are to return this 's closed promise .
      get closed() {
        return this.#closedPromise.promise;
      }
      // The close( closeInfo ) method steps are:
      close(closeInfo = void 0) {
        if (closeInfo !== null) {
          closeInfo = webidl.converters.WebSocketCloseInfo(closeInfo);
        }
        const code = closeInfo.closeCode ?? null;
        const reason = closeInfo.reason;
        closeWebSocketConnection(this.#handler, code, reason, true);
      }
      #write(chunk) {
        const promise = createDeferredPromise();
        let data = null;
        let opcode = null;
        if (ArrayBuffer.isView(chunk) || types.isArrayBuffer(chunk)) {
          data = new Uint8Array(ArrayBuffer.isView(chunk) ? new Uint8Array(chunk.buffer, chunk.byteOffset, chunk.byteLength) : chunk);
          opcode = opcodes.BINARY;
        } else {
          let string;
          try {
            string = webidl.converters.DOMString(chunk);
          } catch (e) {
            promise.reject(e);
            return;
          }
          data = new TextEncoder().encode(string);
          opcode = opcodes.TEXT;
        }
        if (!this.#handler.closeState.has(sentCloseFrameState.SENT) && !this.#handler.closeState.has(sentCloseFrameState.RECEIVED)) {
          const frame = new WebsocketFrameSend(data);
          this.#handler.socket.write(frame.createFrame(opcode), () => {
            promise.resolve(void 0);
          });
        }
        return promise;
      }
      /** @type {import('../websocket').Handler['onConnectionEstablished']} */
      #onConnectionEstablished(response, parsedExtensions) {
        this.#handler.socket = response.socket;
        const parser = new ByteParser(this.#handler, parsedExtensions);
        parser.on("drain", () => this.#handler.onParserDrain());
        parser.on("error", (err) => this.#handler.onParserError(err));
        this.#parser = parser;
        this.#handler.readyState = states.OPEN;
        const extensions = parsedExtensions ?? "";
        const protocol = response.headersList.get("sec-websocket-protocol") ?? "";
        const readable = new ReadableStream({
          start: (controller) => {
            this.#readableStreamController = controller;
          },
          pull(controller) {
            let chunk;
            while (controller.desiredSize > 0 && (chunk = response.socket.read()) !== null) {
              controller.enqueue(chunk);
            }
          },
          cancel: (reason) => this.#cancel(reason)
        });
        const writable = new WritableStream({
          write: (chunk) => this.#write(chunk),
          close: () => closeWebSocketConnection(this.#handler, null, null),
          abort: (reason) => this.#closeUsingReason(reason)
        });
        this.#readableStream = readable;
        this.#writableStream = writable;
        this.#openedPromise.resolve({
          extensions,
          protocol,
          readable,
          writable
        });
      }
      /** @type {import('../websocket').Handler['onMessage']} */
      #onMessage(type, data) {
        if (this.#handler.readyState !== states.OPEN) {
          return;
        }
        let chunk;
        if (type === opcodes.TEXT) {
          try {
            chunk = utf8Decode(data);
          } catch {
            failWebsocketConnection(this.#handler, "Received invalid UTF-8 in text frame.");
            return;
          }
        } else if (type === opcodes.BINARY) {
          chunk = new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
        }
        this.#readableStreamController.enqueue(chunk);
      }
      /** @type {import('../websocket').Handler['onSocketClose']} */
      #onSocketClose() {
        const wasClean = this.#handler.closeState.has(sentCloseFrameState.SENT) && this.#handler.closeState.has(sentCloseFrameState.RECEIVED);
        this.#handler.readyState = states.CLOSED;
        if (this.#handshakeAborted) {
          return;
        }
        if (!this.#handler.wasEverConnected) {
          this.#openedPromise.reject(new WebSocketError("Socket never opened"));
        }
        const result = this.#parser.closingInfo;
        let code = result?.code ?? 1005;
        if (!this.#handler.closeState.has(sentCloseFrameState.SENT) && !this.#handler.closeState.has(sentCloseFrameState.RECEIVED)) {
          code = 1006;
        }
        const reason = result?.reason == null ? "" : utf8DecodeBytes(Buffer.from(result.reason));
        if (wasClean) {
          this.#readableStream.cancel().catch(() => {
          });
          if (!this.#writableStream.locked) {
            this.#writableStream.abort(new DOMException("A closed WebSocketStream cannot be written to", "InvalidStateError"));
          }
          this.#closedPromise.resolve({
            closeCode: code,
            reason
          });
        } else {
          const error = createUnvalidatedWebSocketError("unclean close", code, reason);
          this.#readableStreamController.error(error);
          this.#writableStream.abort(error);
          this.#closedPromise.reject(error);
        }
      }
      #closeUsingReason(reason) {
        let code = null;
        let reasonString = "";
        if (webidl.is.WebSocketError(reason)) {
          code = reason.closeCode;
          reasonString = reason.reason;
        }
        closeWebSocketConnection(this.#handler, code, reasonString);
      }
      //  To cancel a WebSocketStream stream given reason , close using reason giving stream and reason .
      #cancel(reason) {
        this.#closeUsingReason(reason);
      }
    };
    Object.defineProperties(WebSocketStream.prototype, {
      url: kEnumerableProperty,
      opened: kEnumerableProperty,
      closed: kEnumerableProperty,
      close: kEnumerableProperty,
      [Symbol.toStringTag]: {
        value: "WebSocketStream",
        writable: false,
        enumerable: false,
        configurable: true
      }
    });
    webidl.converters.WebSocketStreamOptions = webidl.dictionaryConverter([
      {
        key: "protocols",
        converter: webidl.sequenceConverter(webidl.converters.USVString),
        defaultValue: () => []
      },
      {
        key: "signal",
        converter: webidl.nullableConverter(webidl.converters.AbortSignal),
        defaultValue: () => null
      }
    ]);
    webidl.converters.WebSocketCloseInfo = webidl.dictionaryConverter([
      {
        key: "closeCode",
        converter: (V) => webidl.converters["unsigned short"](V, { enforceRange: true })
      },
      {
        key: "reason",
        converter: webidl.converters.USVString,
        defaultValue: () => ""
      }
    ]);
    module2.exports = { WebSocketStream };
  }
});

// node_modules/undici/lib/web/eventsource/util.js
var require_util6 = __commonJS({
  "node_modules/undici/lib/web/eventsource/util.js"(exports2, module2) {
    "use strict";
    function isValidLastEventId(value) {
      return value.indexOf("\0") === -1;
    }
    function isASCIINumber(value) {
      if (value.length === 0) return false;
      for (let i = 0; i < value.length; i++) {
        if (value.charCodeAt(i) < 48 || value.charCodeAt(i) > 57) return false;
      }
      return true;
    }
    function delay(ms) {
      return new Promise((resolve) => {
        setTimeout(resolve, ms);
      });
    }
    module2.exports = {
      isValidLastEventId,
      isASCIINumber,
      delay
    };
  }
});

// node_modules/undici/lib/web/eventsource/eventsource-stream.js
var require_eventsource_stream = __commonJS({
  "node_modules/undici/lib/web/eventsource/eventsource-stream.js"(exports2, module2) {
    "use strict";
    var { Transform } = require("node:stream");
    var { isASCIINumber, isValidLastEventId } = require_util6();
    var BOM = [239, 187, 191];
    var LF = 10;
    var CR = 13;
    var COLON = 58;
    var SPACE = 32;
    var EventSourceStream = class extends Transform {
      /**
       * @type {eventSourceSettings}
       */
      state;
      /**
       * Leading byte-order-mark check.
       * @type {boolean}
       */
      checkBOM = true;
      /**
       * @type {boolean}
       */
      crlfCheck = false;
      /**
       * @type {boolean}
       */
      eventEndCheck = false;
      /**
       * @type {Buffer|null}
       */
      buffer = null;
      pos = 0;
      event = {
        data: void 0,
        event: void 0,
        id: void 0,
        retry: void 0
      };
      /**
       * @param {object} options
       * @param {boolean} [options.readableObjectMode]
       * @param {eventSourceSettings} [options.eventSourceSettings]
       * @param {(chunk: any, encoding?: BufferEncoding | undefined) => boolean} [options.push]
       */
      constructor(options = {}) {
        options.readableObjectMode = true;
        super(options);
        this.state = options.eventSourceSettings || {};
        if (options.push) {
          this.push = options.push;
        }
      }
      /**
       * @param {Buffer} chunk
       * @param {string} _encoding
       * @param {Function} callback
       * @returns {void}
       */
      _transform(chunk, _encoding, callback) {
        if (chunk.length === 0) {
          callback();
          return;
        }
        if (this.buffer) {
          this.buffer = Buffer.concat([this.buffer, chunk]);
        } else {
          this.buffer = chunk;
        }
        if (this.checkBOM) {
          switch (this.buffer.length) {
            case 1:
              if (this.buffer[0] === BOM[0]) {
                callback();
                return;
              }
              this.checkBOM = false;
              callback();
              return;
            case 2:
              if (this.buffer[0] === BOM[0] && this.buffer[1] === BOM[1]) {
                callback();
                return;
              }
              this.checkBOM = false;
              break;
            case 3:
              if (this.buffer[0] === BOM[0] && this.buffer[1] === BOM[1] && this.buffer[2] === BOM[2]) {
                this.buffer = Buffer.alloc(0);
                this.checkBOM = false;
                callback();
                return;
              }
              this.checkBOM = false;
              break;
            default:
              if (this.buffer[0] === BOM[0] && this.buffer[1] === BOM[1] && this.buffer[2] === BOM[2]) {
                this.buffer = this.buffer.subarray(3);
              }
              this.checkBOM = false;
              break;
          }
        }
        while (this.pos < this.buffer.length) {
          if (this.eventEndCheck) {
            if (this.crlfCheck) {
              if (this.buffer[this.pos] === LF) {
                this.buffer = this.buffer.subarray(this.pos + 1);
                this.pos = 0;
                this.crlfCheck = false;
                continue;
              }
              this.crlfCheck = false;
            }
            if (this.buffer[this.pos] === LF || this.buffer[this.pos] === CR) {
              if (this.buffer[this.pos] === CR) {
                this.crlfCheck = true;
              }
              this.buffer = this.buffer.subarray(this.pos + 1);
              this.pos = 0;
              if (this.event.data !== void 0 || this.event.event || this.event.id || this.event.retry) {
                this.processEvent(this.event);
              }
              this.clearEvent();
              continue;
            }
            this.eventEndCheck = false;
            continue;
          }
          if (this.buffer[this.pos] === LF || this.buffer[this.pos] === CR) {
            if (this.buffer[this.pos] === CR) {
              this.crlfCheck = true;
            }
            this.parseLine(this.buffer.subarray(0, this.pos), this.event);
            this.buffer = this.buffer.subarray(this.pos + 1);
            this.pos = 0;
            this.eventEndCheck = true;
            continue;
          }
          this.pos++;
        }
        callback();
      }
      /**
       * @param {Buffer} line
       * @param {EventSourceStreamEvent} event
       */
      parseLine(line, event) {
        if (line.length === 0) {
          return;
        }
        const colonPosition = line.indexOf(COLON);
        if (colonPosition === 0) {
          return;
        }
        let field = "";
        let value = "";
        if (colonPosition !== -1) {
          field = line.subarray(0, colonPosition).toString("utf8");
          let valueStart = colonPosition + 1;
          if (line[valueStart] === SPACE) {
            ++valueStart;
          }
          value = line.subarray(valueStart).toString("utf8");
        } else {
          field = line.toString("utf8");
          value = "";
        }
        switch (field) {
          case "data":
            if (event[field] === void 0) {
              event[field] = value;
            } else {
              event[field] += `
${value}`;
            }
            break;
          case "retry":
            if (isASCIINumber(value)) {
              event[field] = value;
            }
            break;
          case "id":
            if (isValidLastEventId(value)) {
              event[field] = value;
            }
            break;
          case "event":
            if (value.length > 0) {
              event[field] = value;
            }
            break;
        }
      }
      /**
       * @param {EventSourceStreamEvent} event
       */
      processEvent(event) {
        if (event.retry && isASCIINumber(event.retry)) {
          this.state.reconnectionTime = parseInt(event.retry, 10);
        }
        if (event.id && isValidLastEventId(event.id)) {
          this.state.lastEventId = event.id;
        }
        if (event.data !== void 0) {
          this.push({
            type: event.event || "message",
            options: {
              data: event.data,
              lastEventId: this.state.lastEventId,
              origin: this.state.origin
            }
          });
        }
      }
      clearEvent() {
        this.event = {
          data: void 0,
          event: void 0,
          id: void 0,
          retry: void 0
        };
      }
    };
    module2.exports = {
      EventSourceStream
    };
  }
});

// node_modules/undici/lib/web/eventsource/eventsource.js
var require_eventsource = __commonJS({
  "node_modules/undici/lib/web/eventsource/eventsource.js"(exports2, module2) {
    "use strict";
    var { pipeline } = require("node:stream");
    var { fetching } = require_fetch();
    var { makeRequest } = require_request2();
    var { webidl } = require_webidl();
    var { EventSourceStream } = require_eventsource_stream();
    var { parseMIMEType } = require_data_url();
    var { createFastMessageEvent } = require_events();
    var { isNetworkError } = require_response();
    var { delay } = require_util6();
    var { kEnumerableProperty } = require_util();
    var { environmentSettingsObject } = require_util2();
    var experimentalWarned = false;
    var defaultReconnectionTime = 3e3;
    var CONNECTING = 0;
    var OPEN = 1;
    var CLOSED = 2;
    var ANONYMOUS = "anonymous";
    var USE_CREDENTIALS = "use-credentials";
    var EventSource = class _EventSource extends EventTarget {
      #events = {
        open: null,
        error: null,
        message: null
      };
      #url;
      #withCredentials = false;
      /**
       * @type {ReadyState}
       */
      #readyState = CONNECTING;
      #request = null;
      #controller = null;
      #dispatcher;
      /**
       * @type {import('./eventsource-stream').eventSourceSettings}
       */
      #state;
      /**
       * Creates a new EventSource object.
       * @param {string} url
       * @param {EventSourceInit} [eventSourceInitDict={}]
       * @see https://html.spec.whatwg.org/multipage/server-sent-events.html#the-eventsource-interface
       */
      constructor(url, eventSourceInitDict = {}) {
        super();
        webidl.util.markAsUncloneable(this);
        const prefix = "EventSource constructor";
        webidl.argumentLengthCheck(arguments, 1, prefix);
        if (!experimentalWarned) {
          experimentalWarned = true;
          process.emitWarning("EventSource is experimental, expect them to change at any time.", {
            code: "UNDICI-ES"
          });
        }
        url = webidl.converters.USVString(url);
        eventSourceInitDict = webidl.converters.EventSourceInitDict(eventSourceInitDict, prefix, "eventSourceInitDict");
        this.#dispatcher = eventSourceInitDict.dispatcher;
        this.#state = {
          lastEventId: "",
          reconnectionTime: defaultReconnectionTime
        };
        const settings = environmentSettingsObject;
        let urlRecord;
        try {
          urlRecord = new URL(url, settings.settingsObject.baseUrl);
          this.#state.origin = urlRecord.origin;
        } catch (e) {
          throw new DOMException(e, "SyntaxError");
        }
        this.#url = urlRecord.href;
        let corsAttributeState = ANONYMOUS;
        if (eventSourceInitDict.withCredentials === true) {
          corsAttributeState = USE_CREDENTIALS;
          this.#withCredentials = true;
        }
        const initRequest = {
          redirect: "follow",
          keepalive: true,
          // @see https://html.spec.whatwg.org/multipage/urls-and-fetching.html#cors-settings-attributes
          mode: "cors",
          credentials: corsAttributeState === "anonymous" ? "same-origin" : "omit",
          referrer: "no-referrer"
        };
        initRequest.client = environmentSettingsObject.settingsObject;
        initRequest.headersList = [["accept", { name: "accept", value: "text/event-stream" }]];
        initRequest.cache = "no-store";
        initRequest.initiator = "other";
        initRequest.urlList = [new URL(this.#url)];
        this.#request = makeRequest(initRequest);
        this.#connect();
      }
      /**
       * Returns the state of this EventSource object's connection. It can have the
       * values described below.
       * @returns {ReadyState}
       * @readonly
       */
      get readyState() {
        return this.#readyState;
      }
      /**
       * Returns the URL providing the event stream.
       * @readonly
       * @returns {string}
       */
      get url() {
        return this.#url;
      }
      /**
       * Returns a boolean indicating whether the EventSource object was
       * instantiated with CORS credentials set (true), or not (false, the default).
       */
      get withCredentials() {
        return this.#withCredentials;
      }
      #connect() {
        if (this.#readyState === CLOSED) return;
        this.#readyState = CONNECTING;
        const fetchParams = {
          request: this.#request,
          dispatcher: this.#dispatcher
        };
        const processEventSourceEndOfBody = (response) => {
          if (!isNetworkError(response)) {
            return this.#reconnect();
          }
        };
        fetchParams.processResponseEndOfBody = processEventSourceEndOfBody;
        fetchParams.processResponse = (response) => {
          if (isNetworkError(response)) {
            if (response.aborted) {
              this.close();
              this.dispatchEvent(new Event("error"));
              return;
            } else {
              this.#reconnect();
              return;
            }
          }
          const contentType = response.headersList.get("content-type", true);
          const mimeType = contentType !== null ? parseMIMEType(contentType) : "failure";
          const contentTypeValid = mimeType !== "failure" && mimeType.essence === "text/event-stream";
          if (response.status !== 200 || contentTypeValid === false) {
            this.close();
            this.dispatchEvent(new Event("error"));
            return;
          }
          this.#readyState = OPEN;
          this.dispatchEvent(new Event("open"));
          this.#state.origin = response.urlList[response.urlList.length - 1].origin;
          const eventSourceStream = new EventSourceStream({
            eventSourceSettings: this.#state,
            push: (event) => {
              this.dispatchEvent(createFastMessageEvent(
                event.type,
                event.options
              ));
            }
          });
          pipeline(
            response.body.stream,
            eventSourceStream,
            (error) => {
              if (error?.aborted === false) {
                this.close();
                this.dispatchEvent(new Event("error"));
              }
            }
          );
        };
        this.#controller = fetching(fetchParams);
      }
      /**
       * @see https://html.spec.whatwg.org/multipage/server-sent-events.html#sse-processing-model
       * @returns {Promise<void>}
       */
      async #reconnect() {
        if (this.#readyState === CLOSED) return;
        this.#readyState = CONNECTING;
        this.dispatchEvent(new Event("error"));
        await delay(this.#state.reconnectionTime);
        if (this.#readyState !== CONNECTING) return;
        if (this.#state.lastEventId.length) {
          this.#request.headersList.set("last-event-id", this.#state.lastEventId, true);
        }
        this.#connect();
      }
      /**
       * Closes the connection, if any, and sets the readyState attribute to
       * CLOSED.
       */
      close() {
        webidl.brandCheck(this, _EventSource);
        if (this.#readyState === CLOSED) return;
        this.#readyState = CLOSED;
        this.#controller.abort();
        this.#request = null;
      }
      get onopen() {
        return this.#events.open;
      }
      set onopen(fn) {
        if (this.#events.open) {
          this.removeEventListener("open", this.#events.open);
        }
        if (typeof fn === "function") {
          this.#events.open = fn;
          this.addEventListener("open", fn);
        } else {
          this.#events.open = null;
        }
      }
      get onmessage() {
        return this.#events.message;
      }
      set onmessage(fn) {
        if (this.#events.message) {
          this.removeEventListener("message", this.#events.message);
        }
        if (typeof fn === "function") {
          this.#events.message = fn;
          this.addEventListener("message", fn);
        } else {
          this.#events.message = null;
        }
      }
      get onerror() {
        return this.#events.error;
      }
      set onerror(fn) {
        if (this.#events.error) {
          this.removeEventListener("error", this.#events.error);
        }
        if (typeof fn === "function") {
          this.#events.error = fn;
          this.addEventListener("error", fn);
        } else {
          this.#events.error = null;
        }
      }
    };
    var constantsPropertyDescriptors = {
      CONNECTING: {
        __proto__: null,
        configurable: false,
        enumerable: true,
        value: CONNECTING,
        writable: false
      },
      OPEN: {
        __proto__: null,
        configurable: false,
        enumerable: true,
        value: OPEN,
        writable: false
      },
      CLOSED: {
        __proto__: null,
        configurable: false,
        enumerable: true,
        value: CLOSED,
        writable: false
      }
    };
    Object.defineProperties(EventSource, constantsPropertyDescriptors);
    Object.defineProperties(EventSource.prototype, constantsPropertyDescriptors);
    Object.defineProperties(EventSource.prototype, {
      close: kEnumerableProperty,
      onerror: kEnumerableProperty,
      onmessage: kEnumerableProperty,
      onopen: kEnumerableProperty,
      readyState: kEnumerableProperty,
      url: kEnumerableProperty,
      withCredentials: kEnumerableProperty
    });
    webidl.converters.EventSourceInitDict = webidl.dictionaryConverter([
      {
        key: "withCredentials",
        converter: webidl.converters.boolean,
        defaultValue: () => false
      },
      {
        key: "dispatcher",
        // undici only
        converter: webidl.converters.any
      }
    ]);
    module2.exports = {
      EventSource,
      defaultReconnectionTime
    };
  }
});

// node_modules/undici/index.js
var require_undici = __commonJS({
  "node_modules/undici/index.js"(exports2, module2) {
    "use strict";
    var Client = require_client();
    var Dispatcher = require_dispatcher();
    var Pool = require_pool();
    var BalancedPool = require_balanced_pool();
    var Agent = require_agent();
    var ProxyAgent = require_proxy_agent();
    var EnvHttpProxyAgent = require_env_http_proxy_agent();
    var RetryAgent = require_retry_agent();
    var H2CClient = require_h2c_client();
    var errors = require_errors();
    var util = require_util();
    var { InvalidArgumentError } = errors;
    var api = require_api();
    var buildConnector = require_connect();
    var MockClient = require_mock_client();
    var { MockCallHistory, MockCallHistoryLog } = require_mock_call_history();
    var MockAgent = require_mock_agent();
    var MockPool = require_mock_pool();
    var mockErrors = require_mock_errors();
    var RetryHandler = require_retry_handler();
    var { getGlobalDispatcher, setGlobalDispatcher } = require_global2();
    var DecoratorHandler = require_decorator_handler();
    var RedirectHandler = require_redirect_handler();
    Object.assign(Dispatcher.prototype, api);
    module2.exports.Dispatcher = Dispatcher;
    module2.exports.Client = Client;
    module2.exports.Pool = Pool;
    module2.exports.BalancedPool = BalancedPool;
    module2.exports.Agent = Agent;
    module2.exports.ProxyAgent = ProxyAgent;
    module2.exports.EnvHttpProxyAgent = EnvHttpProxyAgent;
    module2.exports.RetryAgent = RetryAgent;
    module2.exports.H2CClient = H2CClient;
    module2.exports.RetryHandler = RetryHandler;
    module2.exports.DecoratorHandler = DecoratorHandler;
    module2.exports.RedirectHandler = RedirectHandler;
    module2.exports.interceptors = {
      redirect: require_redirect(),
      responseError: require_response_error(),
      retry: require_retry(),
      dump: require_dump(),
      dns: require_dns(),
      cache: require_cache2()
    };
    module2.exports.cacheStores = {
      MemoryCacheStore: require_memory_cache_store()
    };
    var SqliteCacheStore = require_sqlite_cache_store();
    module2.exports.cacheStores.SqliteCacheStore = SqliteCacheStore;
    module2.exports.buildConnector = buildConnector;
    module2.exports.errors = errors;
    module2.exports.util = {
      parseHeaders: util.parseHeaders,
      headerNameToString: util.headerNameToString
    };
    function makeDispatcher(fn) {
      return (url, opts, handler) => {
        if (typeof opts === "function") {
          handler = opts;
          opts = null;
        }
        if (!url || typeof url !== "string" && typeof url !== "object" && !(url instanceof URL)) {
          throw new InvalidArgumentError("invalid url");
        }
        if (opts != null && typeof opts !== "object") {
          throw new InvalidArgumentError("invalid opts");
        }
        if (opts && opts.path != null) {
          if (typeof opts.path !== "string") {
            throw new InvalidArgumentError("invalid opts.path");
          }
          let path = opts.path;
          if (!opts.path.startsWith("/")) {
            path = `/${path}`;
          }
          url = new URL(util.parseOrigin(url).origin + path);
        } else {
          if (!opts) {
            opts = typeof url === "object" ? url : {};
          }
          url = util.parseURL(url);
        }
        const { agent, dispatcher = getGlobalDispatcher() } = opts;
        if (agent) {
          throw new InvalidArgumentError("unsupported opts.agent. Did you mean opts.client?");
        }
        return fn.call(dispatcher, {
          ...opts,
          origin: url.origin,
          path: url.search ? `${url.pathname}${url.search}` : url.pathname,
          method: opts.method || (opts.body ? "PUT" : "GET")
        }, handler);
      };
    }
    module2.exports.setGlobalDispatcher = setGlobalDispatcher;
    module2.exports.getGlobalDispatcher = getGlobalDispatcher;
    var fetchImpl = require_fetch().fetch;
    module2.exports.fetch = async function fetch2(init, options = void 0) {
      try {
        return await fetchImpl(init, options);
      } catch (err) {
        if (err && typeof err === "object") {
          Error.captureStackTrace(err);
        }
        throw err;
      }
    };
    module2.exports.Headers = require_headers().Headers;
    module2.exports.Response = require_response().Response;
    module2.exports.Request = require_request2().Request;
    module2.exports.FormData = require_formdata().FormData;
    var { setGlobalOrigin, getGlobalOrigin } = require_global();
    module2.exports.setGlobalOrigin = setGlobalOrigin;
    module2.exports.getGlobalOrigin = getGlobalOrigin;
    var { CacheStorage } = require_cachestorage();
    var { kConstruct } = require_symbols();
    module2.exports.caches = new CacheStorage(kConstruct);
    var { deleteCookie, getCookies, getSetCookies, setCookie, parseCookie } = require_cookies();
    module2.exports.deleteCookie = deleteCookie;
    module2.exports.getCookies = getCookies;
    module2.exports.getSetCookies = getSetCookies;
    module2.exports.setCookie = setCookie;
    module2.exports.parseCookie = parseCookie;
    var { parseMIMEType, serializeAMimeType } = require_data_url();
    module2.exports.parseMIMEType = parseMIMEType;
    module2.exports.serializeAMimeType = serializeAMimeType;
    var { CloseEvent, ErrorEvent, MessageEvent } = require_events();
    module2.exports.WebSocket = require_websocket().WebSocket;
    module2.exports.CloseEvent = CloseEvent;
    module2.exports.ErrorEvent = ErrorEvent;
    module2.exports.MessageEvent = MessageEvent;
    module2.exports.WebSocketStream = require_websocketstream().WebSocketStream;
    module2.exports.WebSocketError = require_websocketerror().WebSocketError;
    module2.exports.request = makeDispatcher(api.request);
    module2.exports.stream = makeDispatcher(api.stream);
    module2.exports.pipeline = makeDispatcher(api.pipeline);
    module2.exports.connect = makeDispatcher(api.connect);
    module2.exports.upgrade = makeDispatcher(api.upgrade);
    module2.exports.MockClient = MockClient;
    module2.exports.MockCallHistory = MockCallHistory;
    module2.exports.MockCallHistoryLog = MockCallHistoryLog;
    module2.exports.MockPool = MockPool;
    module2.exports.MockAgent = MockAgent;
    module2.exports.mockErrors = mockErrors;
    var { EventSource } = require_eventsource();
    module2.exports.EventSource = EventSource;
    function install() {
      globalThis.fetch = module2.exports.fetch;
      globalThis.Headers = module2.exports.Headers;
      globalThis.Response = module2.exports.Response;
      globalThis.Request = module2.exports.Request;
      globalThis.FormData = module2.exports.FormData;
      globalThis.WebSocket = module2.exports.WebSocket;
      globalThis.CloseEvent = module2.exports.CloseEvent;
      globalThis.ErrorEvent = module2.exports.ErrorEvent;
      globalThis.MessageEvent = module2.exports.MessageEvent;
      globalThis.EventSource = module2.exports.EventSource;
    }
    module2.exports.install = install;
  }
});

// scripts/ccr-test.ts
var import_fs = require("fs");
var import_path = require("path");
var import_os = require("os");
async function testProviderModelKey(provider, model, apiKey) {
  const result = {
    provider: provider.name,
    model,
    apiKey: `${apiKey.substring(0, 8)}...`,
    success: false
  };
  try {
    const url = `${provider.api_base_url}${model}:generateContent`;
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: "Hello" }]
          }
        ]
      })
    };
    const res = await fetch(url, fetchOptions);
    if (res.ok) {
      result.success = true;
    } else {
      const errorText = await res.text();
      result.error = `HTTP ${res.status}: ${errorText.slice(0, 100)}...`;
    }
  } catch (error) {
    result.error = error.message || "Unknown error";
  }
  return result;
}
async function main() {
  const configPath = (0, import_path.join)((0, import_os.homedir)(), ".claude-code-router", "config.json");
  if (!(0, import_fs.existsSync)(configPath)) {
    console.error("\u274C Config file not found:", configPath);
    process.exit(1);
  }
  let config;
  try {
    const configContent = (0, import_fs.readFileSync)(configPath, "utf-8");
    config = JSON.parse(configContent);
  } catch (error) {
    console.error("\u274C Failed to load config:", error);
    process.exit(1);
  }
  if (config && config.PROXY_URL && !process.env.PROXY_URL) {
    process.env.PROXY_URL = config.PROXY_URL;
  }
  if (process.env.PROXY_URL) {
    if (process.env.PROXY_URL.startsWith("socks")) {
      console.error("\u274C socks5 proxy not supported in test script!");
      console.error("   Please use HTTP proxy instead");
      process.exit(1);
    } else {
      let setGlobalDispatcher = null;
      let ProxyAgent = null;
      async function initializeProxySupport() {
        try {
          const undici = await Promise.resolve().then(() => __toESM(require_undici()));
          setGlobalDispatcher = undici.setGlobalDispatcher;
          ProxyAgent = undici.ProxyAgent;
          return true;
        } catch (error) {
          return false;
        }
      }
      const proxyInitialized = await initializeProxySupport();
      if (proxyInitialized && setGlobalDispatcher && ProxyAgent) {
        try {
          const proxyAgent = new ProxyAgent(process.env.PROXY_URL);
          setGlobalDispatcher(proxyAgent);
        } catch (proxyError) {
          console.error("\u274C Failed to setup proxy:", proxyError.message);
          process.exit(1);
        }
      }
    }
  }
  const providers = config && config.Providers ? config.Providers : [];
  if (providers.length === 0) {
    console.error("\u274C No providers configured");
    process.exit(1);
  }
  console.log("\u{1F9EA} Testing API keys...\n");
  const results = [];
  let totalTests = 0;
  for (const provider of providers) {
    for (const model of provider.models) {
      for (const apiKey of provider.api_keys) {
        totalTests++;
      }
    }
  }
  for (const provider of providers) {
    for (const model of provider.models) {
      for (const apiKey of provider.api_keys) {
        const result = await testProviderModelKey(provider, model, apiKey);
        results.push(result);
        if (!result.success) {
          console.log(`\u274C ${result.provider}/${result.model} (${result.apiKey}): ${result.error}`);
        }
      }
    }
  }
  const successCount = results.filter((r) => r.success).length;
  const failureCount = results.filter((r) => !r.success).length;
  console.log("\n\u{1F4CA} Test Results:");
  console.log(`   \u2705 Successful: ${successCount}/${totalTests}`);
  console.log(`   \u274C Failed: ${failureCount}/${totalTests}`);
  if (failureCount > 0) {
    console.log("\n\u{1F4A1} Tips:");
    console.log("   \u2022 Check your API keys are valid");
    console.log("   \u2022 Verify network connectivity");
    console.log("   \u2022 Ensure proxy settings are correct");
    process.exit(1);
  } else {
    console.log("\n\u{1F389} All tests passed! Your API keys are working correctly.");
  }
}
main().catch(console.error);
/*! Bundled license information:

undici/lib/web/fetch/body.js:
  (*! formdata-polyfill. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> *)

undici/lib/web/websocket/frame.js:
  (*! ws. MIT License. Einar Otto Stangvik <einaros@gmail.com> *)
*/
