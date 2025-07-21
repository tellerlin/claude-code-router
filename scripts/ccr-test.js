#!/usr/bin/env ts-node
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/data-uri-to-buffer/dist/index.js
function dataUriToBuffer(uri) {
  if (!/^data:/i.test(uri)) {
    throw new TypeError('`uri` does not appear to be a Data URI (must begin with "data:")');
  }
  uri = uri.replace(/\r?\n/g, "");
  const firstComma = uri.indexOf(",");
  if (firstComma === -1 || firstComma <= 4) {
    throw new TypeError("malformed data: URI");
  }
  const meta = uri.substring(5, firstComma).split(";");
  let charset = "";
  let base64 = false;
  const type = meta[0] || "text/plain";
  let typeFull = type;
  for (let i2 = 1; i2 < meta.length; i2++) {
    if (meta[i2] === "base64") {
      base64 = true;
    } else if (meta[i2]) {
      typeFull += `;${meta[i2]}`;
      if (meta[i2].indexOf("charset=") === 0) {
        charset = meta[i2].substring(8);
      }
    }
  }
  if (!meta[0] && !charset.length) {
    typeFull += ";charset=US-ASCII";
    charset = "US-ASCII";
  }
  const encoding = base64 ? "base64" : "ascii";
  const data = unescape(uri.substring(firstComma + 1));
  const buffer = Buffer.from(data, encoding);
  buffer.type = type;
  buffer.typeFull = typeFull;
  buffer.charset = charset;
  return buffer;
}
var dist_default;
var init_dist = __esm({
  "node_modules/data-uri-to-buffer/dist/index.js"() {
    dist_default = dataUriToBuffer;
  }
});

// node_modules/web-streams-polyfill/dist/ponyfill.es2018.js
var require_ponyfill_es2018 = __commonJS({
  "node_modules/web-streams-polyfill/dist/ponyfill.es2018.js"(exports2, module2) {
    (function(global2, factory) {
      typeof exports2 === "object" && typeof module2 !== "undefined" ? factory(exports2) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, factory(global2.WebStreamsPolyfill = {}));
    })(exports2, function(exports3) {
      "use strict";
      function noop2() {
        return void 0;
      }
      function typeIsObject(x2) {
        return typeof x2 === "object" && x2 !== null || typeof x2 === "function";
      }
      const rethrowAssertionErrorRejection = noop2;
      function setFunctionName(fn, name) {
        try {
          Object.defineProperty(fn, "name", {
            value: name,
            configurable: true
          });
        } catch (_a2) {
        }
      }
      const originalPromise = Promise;
      const originalPromiseThen = Promise.prototype.then;
      const originalPromiseReject = Promise.reject.bind(originalPromise);
      function newPromise(executor) {
        return new originalPromise(executor);
      }
      function promiseResolvedWith(value) {
        return newPromise((resolve) => resolve(value));
      }
      function promiseRejectedWith(reason) {
        return originalPromiseReject(reason);
      }
      function PerformPromiseThen(promise, onFulfilled, onRejected) {
        return originalPromiseThen.call(promise, onFulfilled, onRejected);
      }
      function uponPromise(promise, onFulfilled, onRejected) {
        PerformPromiseThen(PerformPromiseThen(promise, onFulfilled, onRejected), void 0, rethrowAssertionErrorRejection);
      }
      function uponFulfillment(promise, onFulfilled) {
        uponPromise(promise, onFulfilled);
      }
      function uponRejection(promise, onRejected) {
        uponPromise(promise, void 0, onRejected);
      }
      function transformPromiseWith(promise, fulfillmentHandler, rejectionHandler) {
        return PerformPromiseThen(promise, fulfillmentHandler, rejectionHandler);
      }
      function setPromiseIsHandledToTrue(promise) {
        PerformPromiseThen(promise, void 0, rethrowAssertionErrorRejection);
      }
      let _queueMicrotask = (callback) => {
        if (typeof queueMicrotask === "function") {
          _queueMicrotask = queueMicrotask;
        } else {
          const resolvedPromise = promiseResolvedWith(void 0);
          _queueMicrotask = (cb) => PerformPromiseThen(resolvedPromise, cb);
        }
        return _queueMicrotask(callback);
      };
      function reflectCall(F2, V, args) {
        if (typeof F2 !== "function") {
          throw new TypeError("Argument is not a function");
        }
        return Function.prototype.apply.call(F2, V, args);
      }
      function promiseCall(F2, V, args) {
        try {
          return promiseResolvedWith(reflectCall(F2, V, args));
        } catch (value) {
          return promiseRejectedWith(value);
        }
      }
      const QUEUE_MAX_ARRAY_SIZE = 16384;
      class SimpleQueue {
        constructor() {
          this._cursor = 0;
          this._size = 0;
          this._front = {
            _elements: [],
            _next: void 0
          };
          this._back = this._front;
          this._cursor = 0;
          this._size = 0;
        }
        get length() {
          return this._size;
        }
        // For exception safety, this method is structured in order:
        // 1. Read state
        // 2. Calculate required state mutations
        // 3. Perform state mutations
        push(element) {
          const oldBack = this._back;
          let newBack = oldBack;
          if (oldBack._elements.length === QUEUE_MAX_ARRAY_SIZE - 1) {
            newBack = {
              _elements: [],
              _next: void 0
            };
          }
          oldBack._elements.push(element);
          if (newBack !== oldBack) {
            this._back = newBack;
            oldBack._next = newBack;
          }
          ++this._size;
        }
        // Like push(), shift() follows the read -> calculate -> mutate pattern for
        // exception safety.
        shift() {
          const oldFront = this._front;
          let newFront = oldFront;
          const oldCursor = this._cursor;
          let newCursor = oldCursor + 1;
          const elements = oldFront._elements;
          const element = elements[oldCursor];
          if (newCursor === QUEUE_MAX_ARRAY_SIZE) {
            newFront = oldFront._next;
            newCursor = 0;
          }
          --this._size;
          this._cursor = newCursor;
          if (oldFront !== newFront) {
            this._front = newFront;
          }
          elements[oldCursor] = void 0;
          return element;
        }
        // The tricky thing about forEach() is that it can be called
        // re-entrantly. The queue may be mutated inside the callback. It is easy to
        // see that push() within the callback has no negative effects since the end
        // of the queue is checked for on every iteration. If shift() is called
        // repeatedly within the callback then the next iteration may return an
        // element that has been removed. In this case the callback will be called
        // with undefined values until we either "catch up" with elements that still
        // exist or reach the back of the queue.
        forEach(callback) {
          let i2 = this._cursor;
          let node = this._front;
          let elements = node._elements;
          while (i2 !== elements.length || node._next !== void 0) {
            if (i2 === elements.length) {
              node = node._next;
              elements = node._elements;
              i2 = 0;
              if (elements.length === 0) {
                break;
              }
            }
            callback(elements[i2]);
            ++i2;
          }
        }
        // Return the element that would be returned if shift() was called now,
        // without modifying the queue.
        peek() {
          const front = this._front;
          const cursor = this._cursor;
          return front._elements[cursor];
        }
      }
      const AbortSteps = Symbol("[[AbortSteps]]");
      const ErrorSteps = Symbol("[[ErrorSteps]]");
      const CancelSteps = Symbol("[[CancelSteps]]");
      const PullSteps = Symbol("[[PullSteps]]");
      const ReleaseSteps = Symbol("[[ReleaseSteps]]");
      function ReadableStreamReaderGenericInitialize(reader, stream) {
        reader._ownerReadableStream = stream;
        stream._reader = reader;
        if (stream._state === "readable") {
          defaultReaderClosedPromiseInitialize(reader);
        } else if (stream._state === "closed") {
          defaultReaderClosedPromiseInitializeAsResolved(reader);
        } else {
          defaultReaderClosedPromiseInitializeAsRejected(reader, stream._storedError);
        }
      }
      function ReadableStreamReaderGenericCancel(reader, reason) {
        const stream = reader._ownerReadableStream;
        return ReadableStreamCancel(stream, reason);
      }
      function ReadableStreamReaderGenericRelease(reader) {
        const stream = reader._ownerReadableStream;
        if (stream._state === "readable") {
          defaultReaderClosedPromiseReject(reader, new TypeError(`Reader was released and can no longer be used to monitor the stream's closedness`));
        } else {
          defaultReaderClosedPromiseResetToRejected(reader, new TypeError(`Reader was released and can no longer be used to monitor the stream's closedness`));
        }
        stream._readableStreamController[ReleaseSteps]();
        stream._reader = void 0;
        reader._ownerReadableStream = void 0;
      }
      function readerLockException(name) {
        return new TypeError("Cannot " + name + " a stream using a released reader");
      }
      function defaultReaderClosedPromiseInitialize(reader) {
        reader._closedPromise = newPromise((resolve, reject) => {
          reader._closedPromise_resolve = resolve;
          reader._closedPromise_reject = reject;
        });
      }
      function defaultReaderClosedPromiseInitializeAsRejected(reader, reason) {
        defaultReaderClosedPromiseInitialize(reader);
        defaultReaderClosedPromiseReject(reader, reason);
      }
      function defaultReaderClosedPromiseInitializeAsResolved(reader) {
        defaultReaderClosedPromiseInitialize(reader);
        defaultReaderClosedPromiseResolve(reader);
      }
      function defaultReaderClosedPromiseReject(reader, reason) {
        if (reader._closedPromise_reject === void 0) {
          return;
        }
        setPromiseIsHandledToTrue(reader._closedPromise);
        reader._closedPromise_reject(reason);
        reader._closedPromise_resolve = void 0;
        reader._closedPromise_reject = void 0;
      }
      function defaultReaderClosedPromiseResetToRejected(reader, reason) {
        defaultReaderClosedPromiseInitializeAsRejected(reader, reason);
      }
      function defaultReaderClosedPromiseResolve(reader) {
        if (reader._closedPromise_resolve === void 0) {
          return;
        }
        reader._closedPromise_resolve(void 0);
        reader._closedPromise_resolve = void 0;
        reader._closedPromise_reject = void 0;
      }
      const NumberIsFinite = Number.isFinite || function(x2) {
        return typeof x2 === "number" && isFinite(x2);
      };
      const MathTrunc = Math.trunc || function(v) {
        return v < 0 ? Math.ceil(v) : Math.floor(v);
      };
      function isDictionary(x2) {
        return typeof x2 === "object" || typeof x2 === "function";
      }
      function assertDictionary(obj, context) {
        if (obj !== void 0 && !isDictionary(obj)) {
          throw new TypeError(`${context} is not an object.`);
        }
      }
      function assertFunction(x2, context) {
        if (typeof x2 !== "function") {
          throw new TypeError(`${context} is not a function.`);
        }
      }
      function isObject(x2) {
        return typeof x2 === "object" && x2 !== null || typeof x2 === "function";
      }
      function assertObject(x2, context) {
        if (!isObject(x2)) {
          throw new TypeError(`${context} is not an object.`);
        }
      }
      function assertRequiredArgument(x2, position, context) {
        if (x2 === void 0) {
          throw new TypeError(`Parameter ${position} is required in '${context}'.`);
        }
      }
      function assertRequiredField(x2, field, context) {
        if (x2 === void 0) {
          throw new TypeError(`${field} is required in '${context}'.`);
        }
      }
      function convertUnrestrictedDouble(value) {
        return Number(value);
      }
      function censorNegativeZero(x2) {
        return x2 === 0 ? 0 : x2;
      }
      function integerPart(x2) {
        return censorNegativeZero(MathTrunc(x2));
      }
      function convertUnsignedLongLongWithEnforceRange(value, context) {
        const lowerBound = 0;
        const upperBound = Number.MAX_SAFE_INTEGER;
        let x2 = Number(value);
        x2 = censorNegativeZero(x2);
        if (!NumberIsFinite(x2)) {
          throw new TypeError(`${context} is not a finite number`);
        }
        x2 = integerPart(x2);
        if (x2 < lowerBound || x2 > upperBound) {
          throw new TypeError(`${context} is outside the accepted range of ${lowerBound} to ${upperBound}, inclusive`);
        }
        if (!NumberIsFinite(x2) || x2 === 0) {
          return 0;
        }
        return x2;
      }
      function assertReadableStream(x2, context) {
        if (!IsReadableStream(x2)) {
          throw new TypeError(`${context} is not a ReadableStream.`);
        }
      }
      function AcquireReadableStreamDefaultReader(stream) {
        return new ReadableStreamDefaultReader(stream);
      }
      function ReadableStreamAddReadRequest(stream, readRequest) {
        stream._reader._readRequests.push(readRequest);
      }
      function ReadableStreamFulfillReadRequest(stream, chunk, done) {
        const reader = stream._reader;
        const readRequest = reader._readRequests.shift();
        if (done) {
          readRequest._closeSteps();
        } else {
          readRequest._chunkSteps(chunk);
        }
      }
      function ReadableStreamGetNumReadRequests(stream) {
        return stream._reader._readRequests.length;
      }
      function ReadableStreamHasDefaultReader(stream) {
        const reader = stream._reader;
        if (reader === void 0) {
          return false;
        }
        if (!IsReadableStreamDefaultReader(reader)) {
          return false;
        }
        return true;
      }
      class ReadableStreamDefaultReader {
        constructor(stream) {
          assertRequiredArgument(stream, 1, "ReadableStreamDefaultReader");
          assertReadableStream(stream, "First parameter");
          if (IsReadableStreamLocked(stream)) {
            throw new TypeError("This stream has already been locked for exclusive reading by another reader");
          }
          ReadableStreamReaderGenericInitialize(this, stream);
          this._readRequests = new SimpleQueue();
        }
        /**
         * Returns a promise that will be fulfilled when the stream becomes closed,
         * or rejected if the stream ever errors or the reader's lock is released before the stream finishes closing.
         */
        get closed() {
          if (!IsReadableStreamDefaultReader(this)) {
            return promiseRejectedWith(defaultReaderBrandCheckException("closed"));
          }
          return this._closedPromise;
        }
        /**
         * If the reader is active, behaves the same as {@link ReadableStream.cancel | stream.cancel(reason)}.
         */
        cancel(reason = void 0) {
          if (!IsReadableStreamDefaultReader(this)) {
            return promiseRejectedWith(defaultReaderBrandCheckException("cancel"));
          }
          if (this._ownerReadableStream === void 0) {
            return promiseRejectedWith(readerLockException("cancel"));
          }
          return ReadableStreamReaderGenericCancel(this, reason);
        }
        /**
         * Returns a promise that allows access to the next chunk from the stream's internal queue, if available.
         *
         * If reading a chunk causes the queue to become empty, more data will be pulled from the underlying source.
         */
        read() {
          if (!IsReadableStreamDefaultReader(this)) {
            return promiseRejectedWith(defaultReaderBrandCheckException("read"));
          }
          if (this._ownerReadableStream === void 0) {
            return promiseRejectedWith(readerLockException("read from"));
          }
          let resolvePromise;
          let rejectPromise;
          const promise = newPromise((resolve, reject) => {
            resolvePromise = resolve;
            rejectPromise = reject;
          });
          const readRequest = {
            _chunkSteps: (chunk) => resolvePromise({ value: chunk, done: false }),
            _closeSteps: () => resolvePromise({ value: void 0, done: true }),
            _errorSteps: (e2) => rejectPromise(e2)
          };
          ReadableStreamDefaultReaderRead(this, readRequest);
          return promise;
        }
        /**
         * Releases the reader's lock on the corresponding stream. After the lock is released, the reader is no longer active.
         * If the associated stream is errored when the lock is released, the reader will appear errored in the same way
         * from now on; otherwise, the reader will appear closed.
         *
         * A reader's lock cannot be released while it still has a pending read request, i.e., if a promise returned by
         * the reader's {@link ReadableStreamDefaultReader.read | read()} method has not yet been settled. Attempting to
         * do so will throw a `TypeError` and leave the reader locked to the stream.
         */
        releaseLock() {
          if (!IsReadableStreamDefaultReader(this)) {
            throw defaultReaderBrandCheckException("releaseLock");
          }
          if (this._ownerReadableStream === void 0) {
            return;
          }
          ReadableStreamDefaultReaderRelease(this);
        }
      }
      Object.defineProperties(ReadableStreamDefaultReader.prototype, {
        cancel: { enumerable: true },
        read: { enumerable: true },
        releaseLock: { enumerable: true },
        closed: { enumerable: true }
      });
      setFunctionName(ReadableStreamDefaultReader.prototype.cancel, "cancel");
      setFunctionName(ReadableStreamDefaultReader.prototype.read, "read");
      setFunctionName(ReadableStreamDefaultReader.prototype.releaseLock, "releaseLock");
      if (typeof Symbol.toStringTag === "symbol") {
        Object.defineProperty(ReadableStreamDefaultReader.prototype, Symbol.toStringTag, {
          value: "ReadableStreamDefaultReader",
          configurable: true
        });
      }
      function IsReadableStreamDefaultReader(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_readRequests")) {
          return false;
        }
        return x2 instanceof ReadableStreamDefaultReader;
      }
      function ReadableStreamDefaultReaderRead(reader, readRequest) {
        const stream = reader._ownerReadableStream;
        stream._disturbed = true;
        if (stream._state === "closed") {
          readRequest._closeSteps();
        } else if (stream._state === "errored") {
          readRequest._errorSteps(stream._storedError);
        } else {
          stream._readableStreamController[PullSteps](readRequest);
        }
      }
      function ReadableStreamDefaultReaderRelease(reader) {
        ReadableStreamReaderGenericRelease(reader);
        const e2 = new TypeError("Reader was released");
        ReadableStreamDefaultReaderErrorReadRequests(reader, e2);
      }
      function ReadableStreamDefaultReaderErrorReadRequests(reader, e2) {
        const readRequests = reader._readRequests;
        reader._readRequests = new SimpleQueue();
        readRequests.forEach((readRequest) => {
          readRequest._errorSteps(e2);
        });
      }
      function defaultReaderBrandCheckException(name) {
        return new TypeError(`ReadableStreamDefaultReader.prototype.${name} can only be used on a ReadableStreamDefaultReader`);
      }
      const AsyncIteratorPrototype = Object.getPrototypeOf(Object.getPrototypeOf(async function* () {
      }).prototype);
      class ReadableStreamAsyncIteratorImpl {
        constructor(reader, preventCancel) {
          this._ongoingPromise = void 0;
          this._isFinished = false;
          this._reader = reader;
          this._preventCancel = preventCancel;
        }
        next() {
          const nextSteps = () => this._nextSteps();
          this._ongoingPromise = this._ongoingPromise ? transformPromiseWith(this._ongoingPromise, nextSteps, nextSteps) : nextSteps();
          return this._ongoingPromise;
        }
        return(value) {
          const returnSteps = () => this._returnSteps(value);
          return this._ongoingPromise ? transformPromiseWith(this._ongoingPromise, returnSteps, returnSteps) : returnSteps();
        }
        _nextSteps() {
          if (this._isFinished) {
            return Promise.resolve({ value: void 0, done: true });
          }
          const reader = this._reader;
          let resolvePromise;
          let rejectPromise;
          const promise = newPromise((resolve, reject) => {
            resolvePromise = resolve;
            rejectPromise = reject;
          });
          const readRequest = {
            _chunkSteps: (chunk) => {
              this._ongoingPromise = void 0;
              _queueMicrotask(() => resolvePromise({ value: chunk, done: false }));
            },
            _closeSteps: () => {
              this._ongoingPromise = void 0;
              this._isFinished = true;
              ReadableStreamReaderGenericRelease(reader);
              resolvePromise({ value: void 0, done: true });
            },
            _errorSteps: (reason) => {
              this._ongoingPromise = void 0;
              this._isFinished = true;
              ReadableStreamReaderGenericRelease(reader);
              rejectPromise(reason);
            }
          };
          ReadableStreamDefaultReaderRead(reader, readRequest);
          return promise;
        }
        _returnSteps(value) {
          if (this._isFinished) {
            return Promise.resolve({ value, done: true });
          }
          this._isFinished = true;
          const reader = this._reader;
          if (!this._preventCancel) {
            const result = ReadableStreamReaderGenericCancel(reader, value);
            ReadableStreamReaderGenericRelease(reader);
            return transformPromiseWith(result, () => ({ value, done: true }));
          }
          ReadableStreamReaderGenericRelease(reader);
          return promiseResolvedWith({ value, done: true });
        }
      }
      const ReadableStreamAsyncIteratorPrototype = {
        next() {
          if (!IsReadableStreamAsyncIterator(this)) {
            return promiseRejectedWith(streamAsyncIteratorBrandCheckException("next"));
          }
          return this._asyncIteratorImpl.next();
        },
        return(value) {
          if (!IsReadableStreamAsyncIterator(this)) {
            return promiseRejectedWith(streamAsyncIteratorBrandCheckException("return"));
          }
          return this._asyncIteratorImpl.return(value);
        }
      };
      Object.setPrototypeOf(ReadableStreamAsyncIteratorPrototype, AsyncIteratorPrototype);
      function AcquireReadableStreamAsyncIterator(stream, preventCancel) {
        const reader = AcquireReadableStreamDefaultReader(stream);
        const impl = new ReadableStreamAsyncIteratorImpl(reader, preventCancel);
        const iterator = Object.create(ReadableStreamAsyncIteratorPrototype);
        iterator._asyncIteratorImpl = impl;
        return iterator;
      }
      function IsReadableStreamAsyncIterator(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_asyncIteratorImpl")) {
          return false;
        }
        try {
          return x2._asyncIteratorImpl instanceof ReadableStreamAsyncIteratorImpl;
        } catch (_a2) {
          return false;
        }
      }
      function streamAsyncIteratorBrandCheckException(name) {
        return new TypeError(`ReadableStreamAsyncIterator.${name} can only be used on a ReadableSteamAsyncIterator`);
      }
      const NumberIsNaN = Number.isNaN || function(x2) {
        return x2 !== x2;
      };
      var _a, _b, _c;
      function CreateArrayFromList(elements) {
        return elements.slice();
      }
      function CopyDataBlockBytes(dest, destOffset, src, srcOffset, n) {
        new Uint8Array(dest).set(new Uint8Array(src, srcOffset, n), destOffset);
      }
      let TransferArrayBuffer = (O) => {
        if (typeof O.transfer === "function") {
          TransferArrayBuffer = (buffer) => buffer.transfer();
        } else if (typeof structuredClone === "function") {
          TransferArrayBuffer = (buffer) => structuredClone(buffer, { transfer: [buffer] });
        } else {
          TransferArrayBuffer = (buffer) => buffer;
        }
        return TransferArrayBuffer(O);
      };
      let IsDetachedBuffer = (O) => {
        if (typeof O.detached === "boolean") {
          IsDetachedBuffer = (buffer) => buffer.detached;
        } else {
          IsDetachedBuffer = (buffer) => buffer.byteLength === 0;
        }
        return IsDetachedBuffer(O);
      };
      function ArrayBufferSlice(buffer, begin, end) {
        if (buffer.slice) {
          return buffer.slice(begin, end);
        }
        const length = end - begin;
        const slice = new ArrayBuffer(length);
        CopyDataBlockBytes(slice, 0, buffer, begin, length);
        return slice;
      }
      function GetMethod(receiver, prop) {
        const func = receiver[prop];
        if (func === void 0 || func === null) {
          return void 0;
        }
        if (typeof func !== "function") {
          throw new TypeError(`${String(prop)} is not a function`);
        }
        return func;
      }
      function CreateAsyncFromSyncIterator(syncIteratorRecord) {
        const syncIterable = {
          [Symbol.iterator]: () => syncIteratorRecord.iterator
        };
        const asyncIterator = async function* () {
          return yield* syncIterable;
        }();
        const nextMethod = asyncIterator.next;
        return { iterator: asyncIterator, nextMethod, done: false };
      }
      const SymbolAsyncIterator = (_c = (_a = Symbol.asyncIterator) !== null && _a !== void 0 ? _a : (_b = Symbol.for) === null || _b === void 0 ? void 0 : _b.call(Symbol, "Symbol.asyncIterator")) !== null && _c !== void 0 ? _c : "@@asyncIterator";
      function GetIterator(obj, hint = "sync", method) {
        if (method === void 0) {
          if (hint === "async") {
            method = GetMethod(obj, SymbolAsyncIterator);
            if (method === void 0) {
              const syncMethod = GetMethod(obj, Symbol.iterator);
              const syncIteratorRecord = GetIterator(obj, "sync", syncMethod);
              return CreateAsyncFromSyncIterator(syncIteratorRecord);
            }
          } else {
            method = GetMethod(obj, Symbol.iterator);
          }
        }
        if (method === void 0) {
          throw new TypeError("The object is not iterable");
        }
        const iterator = reflectCall(method, obj, []);
        if (!typeIsObject(iterator)) {
          throw new TypeError("The iterator method must return an object");
        }
        const nextMethod = iterator.next;
        return { iterator, nextMethod, done: false };
      }
      function IteratorNext(iteratorRecord) {
        const result = reflectCall(iteratorRecord.nextMethod, iteratorRecord.iterator, []);
        if (!typeIsObject(result)) {
          throw new TypeError("The iterator.next() method must return an object");
        }
        return result;
      }
      function IteratorComplete(iterResult) {
        return Boolean(iterResult.done);
      }
      function IteratorValue(iterResult) {
        return iterResult.value;
      }
      function IsNonNegativeNumber(v) {
        if (typeof v !== "number") {
          return false;
        }
        if (NumberIsNaN(v)) {
          return false;
        }
        if (v < 0) {
          return false;
        }
        return true;
      }
      function CloneAsUint8Array(O) {
        const buffer = ArrayBufferSlice(O.buffer, O.byteOffset, O.byteOffset + O.byteLength);
        return new Uint8Array(buffer);
      }
      function DequeueValue(container) {
        const pair = container._queue.shift();
        container._queueTotalSize -= pair.size;
        if (container._queueTotalSize < 0) {
          container._queueTotalSize = 0;
        }
        return pair.value;
      }
      function EnqueueValueWithSize(container, value, size) {
        if (!IsNonNegativeNumber(size) || size === Infinity) {
          throw new RangeError("Size must be a finite, non-NaN, non-negative number.");
        }
        container._queue.push({ value, size });
        container._queueTotalSize += size;
      }
      function PeekQueueValue(container) {
        const pair = container._queue.peek();
        return pair.value;
      }
      function ResetQueue(container) {
        container._queue = new SimpleQueue();
        container._queueTotalSize = 0;
      }
      function isDataViewConstructor(ctor) {
        return ctor === DataView;
      }
      function isDataView(view) {
        return isDataViewConstructor(view.constructor);
      }
      function arrayBufferViewElementSize(ctor) {
        if (isDataViewConstructor(ctor)) {
          return 1;
        }
        return ctor.BYTES_PER_ELEMENT;
      }
      class ReadableStreamBYOBRequest {
        constructor() {
          throw new TypeError("Illegal constructor");
        }
        /**
         * Returns the view for writing in to, or `null` if the BYOB request has already been responded to.
         */
        get view() {
          if (!IsReadableStreamBYOBRequest(this)) {
            throw byobRequestBrandCheckException("view");
          }
          return this._view;
        }
        respond(bytesWritten) {
          if (!IsReadableStreamBYOBRequest(this)) {
            throw byobRequestBrandCheckException("respond");
          }
          assertRequiredArgument(bytesWritten, 1, "respond");
          bytesWritten = convertUnsignedLongLongWithEnforceRange(bytesWritten, "First parameter");
          if (this._associatedReadableByteStreamController === void 0) {
            throw new TypeError("This BYOB request has been invalidated");
          }
          if (IsDetachedBuffer(this._view.buffer)) {
            throw new TypeError(`The BYOB request's buffer has been detached and so cannot be used as a response`);
          }
          ReadableByteStreamControllerRespond(this._associatedReadableByteStreamController, bytesWritten);
        }
        respondWithNewView(view) {
          if (!IsReadableStreamBYOBRequest(this)) {
            throw byobRequestBrandCheckException("respondWithNewView");
          }
          assertRequiredArgument(view, 1, "respondWithNewView");
          if (!ArrayBuffer.isView(view)) {
            throw new TypeError("You can only respond with array buffer views");
          }
          if (this._associatedReadableByteStreamController === void 0) {
            throw new TypeError("This BYOB request has been invalidated");
          }
          if (IsDetachedBuffer(view.buffer)) {
            throw new TypeError("The given view's buffer has been detached and so cannot be used as a response");
          }
          ReadableByteStreamControllerRespondWithNewView(this._associatedReadableByteStreamController, view);
        }
      }
      Object.defineProperties(ReadableStreamBYOBRequest.prototype, {
        respond: { enumerable: true },
        respondWithNewView: { enumerable: true },
        view: { enumerable: true }
      });
      setFunctionName(ReadableStreamBYOBRequest.prototype.respond, "respond");
      setFunctionName(ReadableStreamBYOBRequest.prototype.respondWithNewView, "respondWithNewView");
      if (typeof Symbol.toStringTag === "symbol") {
        Object.defineProperty(ReadableStreamBYOBRequest.prototype, Symbol.toStringTag, {
          value: "ReadableStreamBYOBRequest",
          configurable: true
        });
      }
      class ReadableByteStreamController {
        constructor() {
          throw new TypeError("Illegal constructor");
        }
        /**
         * Returns the current BYOB pull request, or `null` if there isn't one.
         */
        get byobRequest() {
          if (!IsReadableByteStreamController(this)) {
            throw byteStreamControllerBrandCheckException("byobRequest");
          }
          return ReadableByteStreamControllerGetBYOBRequest(this);
        }
        /**
         * Returns the desired size to fill the controlled stream's internal queue. It can be negative, if the queue is
         * over-full. An underlying byte source ought to use this information to determine when and how to apply backpressure.
         */
        get desiredSize() {
          if (!IsReadableByteStreamController(this)) {
            throw byteStreamControllerBrandCheckException("desiredSize");
          }
          return ReadableByteStreamControllerGetDesiredSize(this);
        }
        /**
         * Closes the controlled readable stream. Consumers will still be able to read any previously-enqueued chunks from
         * the stream, but once those are read, the stream will become closed.
         */
        close() {
          if (!IsReadableByteStreamController(this)) {
            throw byteStreamControllerBrandCheckException("close");
          }
          if (this._closeRequested) {
            throw new TypeError("The stream has already been closed; do not close it again!");
          }
          const state = this._controlledReadableByteStream._state;
          if (state !== "readable") {
            throw new TypeError(`The stream (in ${state} state) is not in the readable state and cannot be closed`);
          }
          ReadableByteStreamControllerClose(this);
        }
        enqueue(chunk) {
          if (!IsReadableByteStreamController(this)) {
            throw byteStreamControllerBrandCheckException("enqueue");
          }
          assertRequiredArgument(chunk, 1, "enqueue");
          if (!ArrayBuffer.isView(chunk)) {
            throw new TypeError("chunk must be an array buffer view");
          }
          if (chunk.byteLength === 0) {
            throw new TypeError("chunk must have non-zero byteLength");
          }
          if (chunk.buffer.byteLength === 0) {
            throw new TypeError(`chunk's buffer must have non-zero byteLength`);
          }
          if (this._closeRequested) {
            throw new TypeError("stream is closed or draining");
          }
          const state = this._controlledReadableByteStream._state;
          if (state !== "readable") {
            throw new TypeError(`The stream (in ${state} state) is not in the readable state and cannot be enqueued to`);
          }
          ReadableByteStreamControllerEnqueue(this, chunk);
        }
        /**
         * Errors the controlled readable stream, making all future interactions with it fail with the given error `e`.
         */
        error(e2 = void 0) {
          if (!IsReadableByteStreamController(this)) {
            throw byteStreamControllerBrandCheckException("error");
          }
          ReadableByteStreamControllerError(this, e2);
        }
        /** @internal */
        [CancelSteps](reason) {
          ReadableByteStreamControllerClearPendingPullIntos(this);
          ResetQueue(this);
          const result = this._cancelAlgorithm(reason);
          ReadableByteStreamControllerClearAlgorithms(this);
          return result;
        }
        /** @internal */
        [PullSteps](readRequest) {
          const stream = this._controlledReadableByteStream;
          if (this._queueTotalSize > 0) {
            ReadableByteStreamControllerFillReadRequestFromQueue(this, readRequest);
            return;
          }
          const autoAllocateChunkSize = this._autoAllocateChunkSize;
          if (autoAllocateChunkSize !== void 0) {
            let buffer;
            try {
              buffer = new ArrayBuffer(autoAllocateChunkSize);
            } catch (bufferE) {
              readRequest._errorSteps(bufferE);
              return;
            }
            const pullIntoDescriptor = {
              buffer,
              bufferByteLength: autoAllocateChunkSize,
              byteOffset: 0,
              byteLength: autoAllocateChunkSize,
              bytesFilled: 0,
              minimumFill: 1,
              elementSize: 1,
              viewConstructor: Uint8Array,
              readerType: "default"
            };
            this._pendingPullIntos.push(pullIntoDescriptor);
          }
          ReadableStreamAddReadRequest(stream, readRequest);
          ReadableByteStreamControllerCallPullIfNeeded(this);
        }
        /** @internal */
        [ReleaseSteps]() {
          if (this._pendingPullIntos.length > 0) {
            const firstPullInto = this._pendingPullIntos.peek();
            firstPullInto.readerType = "none";
            this._pendingPullIntos = new SimpleQueue();
            this._pendingPullIntos.push(firstPullInto);
          }
        }
      }
      Object.defineProperties(ReadableByteStreamController.prototype, {
        close: { enumerable: true },
        enqueue: { enumerable: true },
        error: { enumerable: true },
        byobRequest: { enumerable: true },
        desiredSize: { enumerable: true }
      });
      setFunctionName(ReadableByteStreamController.prototype.close, "close");
      setFunctionName(ReadableByteStreamController.prototype.enqueue, "enqueue");
      setFunctionName(ReadableByteStreamController.prototype.error, "error");
      if (typeof Symbol.toStringTag === "symbol") {
        Object.defineProperty(ReadableByteStreamController.prototype, Symbol.toStringTag, {
          value: "ReadableByteStreamController",
          configurable: true
        });
      }
      function IsReadableByteStreamController(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_controlledReadableByteStream")) {
          return false;
        }
        return x2 instanceof ReadableByteStreamController;
      }
      function IsReadableStreamBYOBRequest(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_associatedReadableByteStreamController")) {
          return false;
        }
        return x2 instanceof ReadableStreamBYOBRequest;
      }
      function ReadableByteStreamControllerCallPullIfNeeded(controller) {
        const shouldPull = ReadableByteStreamControllerShouldCallPull(controller);
        if (!shouldPull) {
          return;
        }
        if (controller._pulling) {
          controller._pullAgain = true;
          return;
        }
        controller._pulling = true;
        const pullPromise = controller._pullAlgorithm();
        uponPromise(pullPromise, () => {
          controller._pulling = false;
          if (controller._pullAgain) {
            controller._pullAgain = false;
            ReadableByteStreamControllerCallPullIfNeeded(controller);
          }
          return null;
        }, (e2) => {
          ReadableByteStreamControllerError(controller, e2);
          return null;
        });
      }
      function ReadableByteStreamControllerClearPendingPullIntos(controller) {
        ReadableByteStreamControllerInvalidateBYOBRequest(controller);
        controller._pendingPullIntos = new SimpleQueue();
      }
      function ReadableByteStreamControllerCommitPullIntoDescriptor(stream, pullIntoDescriptor) {
        let done = false;
        if (stream._state === "closed") {
          done = true;
        }
        const filledView = ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor);
        if (pullIntoDescriptor.readerType === "default") {
          ReadableStreamFulfillReadRequest(stream, filledView, done);
        } else {
          ReadableStreamFulfillReadIntoRequest(stream, filledView, done);
        }
      }
      function ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor) {
        const bytesFilled = pullIntoDescriptor.bytesFilled;
        const elementSize = pullIntoDescriptor.elementSize;
        return new pullIntoDescriptor.viewConstructor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, bytesFilled / elementSize);
      }
      function ReadableByteStreamControllerEnqueueChunkToQueue(controller, buffer, byteOffset, byteLength) {
        controller._queue.push({ buffer, byteOffset, byteLength });
        controller._queueTotalSize += byteLength;
      }
      function ReadableByteStreamControllerEnqueueClonedChunkToQueue(controller, buffer, byteOffset, byteLength) {
        let clonedChunk;
        try {
          clonedChunk = ArrayBufferSlice(buffer, byteOffset, byteOffset + byteLength);
        } catch (cloneE) {
          ReadableByteStreamControllerError(controller, cloneE);
          throw cloneE;
        }
        ReadableByteStreamControllerEnqueueChunkToQueue(controller, clonedChunk, 0, byteLength);
      }
      function ReadableByteStreamControllerEnqueueDetachedPullIntoToQueue(controller, firstDescriptor) {
        if (firstDescriptor.bytesFilled > 0) {
          ReadableByteStreamControllerEnqueueClonedChunkToQueue(controller, firstDescriptor.buffer, firstDescriptor.byteOffset, firstDescriptor.bytesFilled);
        }
        ReadableByteStreamControllerShiftPendingPullInto(controller);
      }
      function ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor) {
        const maxBytesToCopy = Math.min(controller._queueTotalSize, pullIntoDescriptor.byteLength - pullIntoDescriptor.bytesFilled);
        const maxBytesFilled = pullIntoDescriptor.bytesFilled + maxBytesToCopy;
        let totalBytesToCopyRemaining = maxBytesToCopy;
        let ready = false;
        const remainderBytes = maxBytesFilled % pullIntoDescriptor.elementSize;
        const maxAlignedBytes = maxBytesFilled - remainderBytes;
        if (maxAlignedBytes >= pullIntoDescriptor.minimumFill) {
          totalBytesToCopyRemaining = maxAlignedBytes - pullIntoDescriptor.bytesFilled;
          ready = true;
        }
        const queue = controller._queue;
        while (totalBytesToCopyRemaining > 0) {
          const headOfQueue = queue.peek();
          const bytesToCopy = Math.min(totalBytesToCopyRemaining, headOfQueue.byteLength);
          const destStart = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
          CopyDataBlockBytes(pullIntoDescriptor.buffer, destStart, headOfQueue.buffer, headOfQueue.byteOffset, bytesToCopy);
          if (headOfQueue.byteLength === bytesToCopy) {
            queue.shift();
          } else {
            headOfQueue.byteOffset += bytesToCopy;
            headOfQueue.byteLength -= bytesToCopy;
          }
          controller._queueTotalSize -= bytesToCopy;
          ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, bytesToCopy, pullIntoDescriptor);
          totalBytesToCopyRemaining -= bytesToCopy;
        }
        return ready;
      }
      function ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, size, pullIntoDescriptor) {
        pullIntoDescriptor.bytesFilled += size;
      }
      function ReadableByteStreamControllerHandleQueueDrain(controller) {
        if (controller._queueTotalSize === 0 && controller._closeRequested) {
          ReadableByteStreamControllerClearAlgorithms(controller);
          ReadableStreamClose(controller._controlledReadableByteStream);
        } else {
          ReadableByteStreamControllerCallPullIfNeeded(controller);
        }
      }
      function ReadableByteStreamControllerInvalidateBYOBRequest(controller) {
        if (controller._byobRequest === null) {
          return;
        }
        controller._byobRequest._associatedReadableByteStreamController = void 0;
        controller._byobRequest._view = null;
        controller._byobRequest = null;
      }
      function ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller) {
        while (controller._pendingPullIntos.length > 0) {
          if (controller._queueTotalSize === 0) {
            return;
          }
          const pullIntoDescriptor = controller._pendingPullIntos.peek();
          if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor)) {
            ReadableByteStreamControllerShiftPendingPullInto(controller);
            ReadableByteStreamControllerCommitPullIntoDescriptor(controller._controlledReadableByteStream, pullIntoDescriptor);
          }
        }
      }
      function ReadableByteStreamControllerProcessReadRequestsUsingQueue(controller) {
        const reader = controller._controlledReadableByteStream._reader;
        while (reader._readRequests.length > 0) {
          if (controller._queueTotalSize === 0) {
            return;
          }
          const readRequest = reader._readRequests.shift();
          ReadableByteStreamControllerFillReadRequestFromQueue(controller, readRequest);
        }
      }
      function ReadableByteStreamControllerPullInto(controller, view, min, readIntoRequest) {
        const stream = controller._controlledReadableByteStream;
        const ctor = view.constructor;
        const elementSize = arrayBufferViewElementSize(ctor);
        const { byteOffset, byteLength } = view;
        const minimumFill = min * elementSize;
        let buffer;
        try {
          buffer = TransferArrayBuffer(view.buffer);
        } catch (e2) {
          readIntoRequest._errorSteps(e2);
          return;
        }
        const pullIntoDescriptor = {
          buffer,
          bufferByteLength: buffer.byteLength,
          byteOffset,
          byteLength,
          bytesFilled: 0,
          minimumFill,
          elementSize,
          viewConstructor: ctor,
          readerType: "byob"
        };
        if (controller._pendingPullIntos.length > 0) {
          controller._pendingPullIntos.push(pullIntoDescriptor);
          ReadableStreamAddReadIntoRequest(stream, readIntoRequest);
          return;
        }
        if (stream._state === "closed") {
          const emptyView = new ctor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, 0);
          readIntoRequest._closeSteps(emptyView);
          return;
        }
        if (controller._queueTotalSize > 0) {
          if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor)) {
            const filledView = ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor);
            ReadableByteStreamControllerHandleQueueDrain(controller);
            readIntoRequest._chunkSteps(filledView);
            return;
          }
          if (controller._closeRequested) {
            const e2 = new TypeError("Insufficient bytes to fill elements in the given buffer");
            ReadableByteStreamControllerError(controller, e2);
            readIntoRequest._errorSteps(e2);
            return;
          }
        }
        controller._pendingPullIntos.push(pullIntoDescriptor);
        ReadableStreamAddReadIntoRequest(stream, readIntoRequest);
        ReadableByteStreamControllerCallPullIfNeeded(controller);
      }
      function ReadableByteStreamControllerRespondInClosedState(controller, firstDescriptor) {
        if (firstDescriptor.readerType === "none") {
          ReadableByteStreamControllerShiftPendingPullInto(controller);
        }
        const stream = controller._controlledReadableByteStream;
        if (ReadableStreamHasBYOBReader(stream)) {
          while (ReadableStreamGetNumReadIntoRequests(stream) > 0) {
            const pullIntoDescriptor = ReadableByteStreamControllerShiftPendingPullInto(controller);
            ReadableByteStreamControllerCommitPullIntoDescriptor(stream, pullIntoDescriptor);
          }
        }
      }
      function ReadableByteStreamControllerRespondInReadableState(controller, bytesWritten, pullIntoDescriptor) {
        ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, bytesWritten, pullIntoDescriptor);
        if (pullIntoDescriptor.readerType === "none") {
          ReadableByteStreamControllerEnqueueDetachedPullIntoToQueue(controller, pullIntoDescriptor);
          ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
          return;
        }
        if (pullIntoDescriptor.bytesFilled < pullIntoDescriptor.minimumFill) {
          return;
        }
        ReadableByteStreamControllerShiftPendingPullInto(controller);
        const remainderSize = pullIntoDescriptor.bytesFilled % pullIntoDescriptor.elementSize;
        if (remainderSize > 0) {
          const end = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
          ReadableByteStreamControllerEnqueueClonedChunkToQueue(controller, pullIntoDescriptor.buffer, end - remainderSize, remainderSize);
        }
        pullIntoDescriptor.bytesFilled -= remainderSize;
        ReadableByteStreamControllerCommitPullIntoDescriptor(controller._controlledReadableByteStream, pullIntoDescriptor);
        ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
      }
      function ReadableByteStreamControllerRespondInternal(controller, bytesWritten) {
        const firstDescriptor = controller._pendingPullIntos.peek();
        ReadableByteStreamControllerInvalidateBYOBRequest(controller);
        const state = controller._controlledReadableByteStream._state;
        if (state === "closed") {
          ReadableByteStreamControllerRespondInClosedState(controller, firstDescriptor);
        } else {
          ReadableByteStreamControllerRespondInReadableState(controller, bytesWritten, firstDescriptor);
        }
        ReadableByteStreamControllerCallPullIfNeeded(controller);
      }
      function ReadableByteStreamControllerShiftPendingPullInto(controller) {
        const descriptor = controller._pendingPullIntos.shift();
        return descriptor;
      }
      function ReadableByteStreamControllerShouldCallPull(controller) {
        const stream = controller._controlledReadableByteStream;
        if (stream._state !== "readable") {
          return false;
        }
        if (controller._closeRequested) {
          return false;
        }
        if (!controller._started) {
          return false;
        }
        if (ReadableStreamHasDefaultReader(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
          return true;
        }
        if (ReadableStreamHasBYOBReader(stream) && ReadableStreamGetNumReadIntoRequests(stream) > 0) {
          return true;
        }
        const desiredSize = ReadableByteStreamControllerGetDesiredSize(controller);
        if (desiredSize > 0) {
          return true;
        }
        return false;
      }
      function ReadableByteStreamControllerClearAlgorithms(controller) {
        controller._pullAlgorithm = void 0;
        controller._cancelAlgorithm = void 0;
      }
      function ReadableByteStreamControllerClose(controller) {
        const stream = controller._controlledReadableByteStream;
        if (controller._closeRequested || stream._state !== "readable") {
          return;
        }
        if (controller._queueTotalSize > 0) {
          controller._closeRequested = true;
          return;
        }
        if (controller._pendingPullIntos.length > 0) {
          const firstPendingPullInto = controller._pendingPullIntos.peek();
          if (firstPendingPullInto.bytesFilled % firstPendingPullInto.elementSize !== 0) {
            const e2 = new TypeError("Insufficient bytes to fill elements in the given buffer");
            ReadableByteStreamControllerError(controller, e2);
            throw e2;
          }
        }
        ReadableByteStreamControllerClearAlgorithms(controller);
        ReadableStreamClose(stream);
      }
      function ReadableByteStreamControllerEnqueue(controller, chunk) {
        const stream = controller._controlledReadableByteStream;
        if (controller._closeRequested || stream._state !== "readable") {
          return;
        }
        const { buffer, byteOffset, byteLength } = chunk;
        if (IsDetachedBuffer(buffer)) {
          throw new TypeError("chunk's buffer is detached and so cannot be enqueued");
        }
        const transferredBuffer = TransferArrayBuffer(buffer);
        if (controller._pendingPullIntos.length > 0) {
          const firstPendingPullInto = controller._pendingPullIntos.peek();
          if (IsDetachedBuffer(firstPendingPullInto.buffer)) {
            throw new TypeError("The BYOB request's buffer has been detached and so cannot be filled with an enqueued chunk");
          }
          ReadableByteStreamControllerInvalidateBYOBRequest(controller);
          firstPendingPullInto.buffer = TransferArrayBuffer(firstPendingPullInto.buffer);
          if (firstPendingPullInto.readerType === "none") {
            ReadableByteStreamControllerEnqueueDetachedPullIntoToQueue(controller, firstPendingPullInto);
          }
        }
        if (ReadableStreamHasDefaultReader(stream)) {
          ReadableByteStreamControllerProcessReadRequestsUsingQueue(controller);
          if (ReadableStreamGetNumReadRequests(stream) === 0) {
            ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
          } else {
            if (controller._pendingPullIntos.length > 0) {
              ReadableByteStreamControllerShiftPendingPullInto(controller);
            }
            const transferredView = new Uint8Array(transferredBuffer, byteOffset, byteLength);
            ReadableStreamFulfillReadRequest(stream, transferredView, false);
          }
        } else if (ReadableStreamHasBYOBReader(stream)) {
          ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
          ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
        } else {
          ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
        }
        ReadableByteStreamControllerCallPullIfNeeded(controller);
      }
      function ReadableByteStreamControllerError(controller, e2) {
        const stream = controller._controlledReadableByteStream;
        if (stream._state !== "readable") {
          return;
        }
        ReadableByteStreamControllerClearPendingPullIntos(controller);
        ResetQueue(controller);
        ReadableByteStreamControllerClearAlgorithms(controller);
        ReadableStreamError(stream, e2);
      }
      function ReadableByteStreamControllerFillReadRequestFromQueue(controller, readRequest) {
        const entry = controller._queue.shift();
        controller._queueTotalSize -= entry.byteLength;
        ReadableByteStreamControllerHandleQueueDrain(controller);
        const view = new Uint8Array(entry.buffer, entry.byteOffset, entry.byteLength);
        readRequest._chunkSteps(view);
      }
      function ReadableByteStreamControllerGetBYOBRequest(controller) {
        if (controller._byobRequest === null && controller._pendingPullIntos.length > 0) {
          const firstDescriptor = controller._pendingPullIntos.peek();
          const view = new Uint8Array(firstDescriptor.buffer, firstDescriptor.byteOffset + firstDescriptor.bytesFilled, firstDescriptor.byteLength - firstDescriptor.bytesFilled);
          const byobRequest = Object.create(ReadableStreamBYOBRequest.prototype);
          SetUpReadableStreamBYOBRequest(byobRequest, controller, view);
          controller._byobRequest = byobRequest;
        }
        return controller._byobRequest;
      }
      function ReadableByteStreamControllerGetDesiredSize(controller) {
        const state = controller._controlledReadableByteStream._state;
        if (state === "errored") {
          return null;
        }
        if (state === "closed") {
          return 0;
        }
        return controller._strategyHWM - controller._queueTotalSize;
      }
      function ReadableByteStreamControllerRespond(controller, bytesWritten) {
        const firstDescriptor = controller._pendingPullIntos.peek();
        const state = controller._controlledReadableByteStream._state;
        if (state === "closed") {
          if (bytesWritten !== 0) {
            throw new TypeError("bytesWritten must be 0 when calling respond() on a closed stream");
          }
        } else {
          if (bytesWritten === 0) {
            throw new TypeError("bytesWritten must be greater than 0 when calling respond() on a readable stream");
          }
          if (firstDescriptor.bytesFilled + bytesWritten > firstDescriptor.byteLength) {
            throw new RangeError("bytesWritten out of range");
          }
        }
        firstDescriptor.buffer = TransferArrayBuffer(firstDescriptor.buffer);
        ReadableByteStreamControllerRespondInternal(controller, bytesWritten);
      }
      function ReadableByteStreamControllerRespondWithNewView(controller, view) {
        const firstDescriptor = controller._pendingPullIntos.peek();
        const state = controller._controlledReadableByteStream._state;
        if (state === "closed") {
          if (view.byteLength !== 0) {
            throw new TypeError("The view's length must be 0 when calling respondWithNewView() on a closed stream");
          }
        } else {
          if (view.byteLength === 0) {
            throw new TypeError("The view's length must be greater than 0 when calling respondWithNewView() on a readable stream");
          }
        }
        if (firstDescriptor.byteOffset + firstDescriptor.bytesFilled !== view.byteOffset) {
          throw new RangeError("The region specified by view does not match byobRequest");
        }
        if (firstDescriptor.bufferByteLength !== view.buffer.byteLength) {
          throw new RangeError("The buffer of view has different capacity than byobRequest");
        }
        if (firstDescriptor.bytesFilled + view.byteLength > firstDescriptor.byteLength) {
          throw new RangeError("The region specified by view is larger than byobRequest");
        }
        const viewByteLength = view.byteLength;
        firstDescriptor.buffer = TransferArrayBuffer(view.buffer);
        ReadableByteStreamControllerRespondInternal(controller, viewByteLength);
      }
      function SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize) {
        controller._controlledReadableByteStream = stream;
        controller._pullAgain = false;
        controller._pulling = false;
        controller._byobRequest = null;
        controller._queue = controller._queueTotalSize = void 0;
        ResetQueue(controller);
        controller._closeRequested = false;
        controller._started = false;
        controller._strategyHWM = highWaterMark;
        controller._pullAlgorithm = pullAlgorithm;
        controller._cancelAlgorithm = cancelAlgorithm;
        controller._autoAllocateChunkSize = autoAllocateChunkSize;
        controller._pendingPullIntos = new SimpleQueue();
        stream._readableStreamController = controller;
        const startResult = startAlgorithm();
        uponPromise(promiseResolvedWith(startResult), () => {
          controller._started = true;
          ReadableByteStreamControllerCallPullIfNeeded(controller);
          return null;
        }, (r2) => {
          ReadableByteStreamControllerError(controller, r2);
          return null;
        });
      }
      function SetUpReadableByteStreamControllerFromUnderlyingSource(stream, underlyingByteSource, highWaterMark) {
        const controller = Object.create(ReadableByteStreamController.prototype);
        let startAlgorithm;
        let pullAlgorithm;
        let cancelAlgorithm;
        if (underlyingByteSource.start !== void 0) {
          startAlgorithm = () => underlyingByteSource.start(controller);
        } else {
          startAlgorithm = () => void 0;
        }
        if (underlyingByteSource.pull !== void 0) {
          pullAlgorithm = () => underlyingByteSource.pull(controller);
        } else {
          pullAlgorithm = () => promiseResolvedWith(void 0);
        }
        if (underlyingByteSource.cancel !== void 0) {
          cancelAlgorithm = (reason) => underlyingByteSource.cancel(reason);
        } else {
          cancelAlgorithm = () => promiseResolvedWith(void 0);
        }
        const autoAllocateChunkSize = underlyingByteSource.autoAllocateChunkSize;
        if (autoAllocateChunkSize === 0) {
          throw new TypeError("autoAllocateChunkSize must be greater than 0");
        }
        SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize);
      }
      function SetUpReadableStreamBYOBRequest(request, controller, view) {
        request._associatedReadableByteStreamController = controller;
        request._view = view;
      }
      function byobRequestBrandCheckException(name) {
        return new TypeError(`ReadableStreamBYOBRequest.prototype.${name} can only be used on a ReadableStreamBYOBRequest`);
      }
      function byteStreamControllerBrandCheckException(name) {
        return new TypeError(`ReadableByteStreamController.prototype.${name} can only be used on a ReadableByteStreamController`);
      }
      function convertReaderOptions(options, context) {
        assertDictionary(options, context);
        const mode = options === null || options === void 0 ? void 0 : options.mode;
        return {
          mode: mode === void 0 ? void 0 : convertReadableStreamReaderMode(mode, `${context} has member 'mode' that`)
        };
      }
      function convertReadableStreamReaderMode(mode, context) {
        mode = `${mode}`;
        if (mode !== "byob") {
          throw new TypeError(`${context} '${mode}' is not a valid enumeration value for ReadableStreamReaderMode`);
        }
        return mode;
      }
      function convertByobReadOptions(options, context) {
        var _a2;
        assertDictionary(options, context);
        const min = (_a2 = options === null || options === void 0 ? void 0 : options.min) !== null && _a2 !== void 0 ? _a2 : 1;
        return {
          min: convertUnsignedLongLongWithEnforceRange(min, `${context} has member 'min' that`)
        };
      }
      function AcquireReadableStreamBYOBReader(stream) {
        return new ReadableStreamBYOBReader(stream);
      }
      function ReadableStreamAddReadIntoRequest(stream, readIntoRequest) {
        stream._reader._readIntoRequests.push(readIntoRequest);
      }
      function ReadableStreamFulfillReadIntoRequest(stream, chunk, done) {
        const reader = stream._reader;
        const readIntoRequest = reader._readIntoRequests.shift();
        if (done) {
          readIntoRequest._closeSteps(chunk);
        } else {
          readIntoRequest._chunkSteps(chunk);
        }
      }
      function ReadableStreamGetNumReadIntoRequests(stream) {
        return stream._reader._readIntoRequests.length;
      }
      function ReadableStreamHasBYOBReader(stream) {
        const reader = stream._reader;
        if (reader === void 0) {
          return false;
        }
        if (!IsReadableStreamBYOBReader(reader)) {
          return false;
        }
        return true;
      }
      class ReadableStreamBYOBReader {
        constructor(stream) {
          assertRequiredArgument(stream, 1, "ReadableStreamBYOBReader");
          assertReadableStream(stream, "First parameter");
          if (IsReadableStreamLocked(stream)) {
            throw new TypeError("This stream has already been locked for exclusive reading by another reader");
          }
          if (!IsReadableByteStreamController(stream._readableStreamController)) {
            throw new TypeError("Cannot construct a ReadableStreamBYOBReader for a stream not constructed with a byte source");
          }
          ReadableStreamReaderGenericInitialize(this, stream);
          this._readIntoRequests = new SimpleQueue();
        }
        /**
         * Returns a promise that will be fulfilled when the stream becomes closed, or rejected if the stream ever errors or
         * the reader's lock is released before the stream finishes closing.
         */
        get closed() {
          if (!IsReadableStreamBYOBReader(this)) {
            return promiseRejectedWith(byobReaderBrandCheckException("closed"));
          }
          return this._closedPromise;
        }
        /**
         * If the reader is active, behaves the same as {@link ReadableStream.cancel | stream.cancel(reason)}.
         */
        cancel(reason = void 0) {
          if (!IsReadableStreamBYOBReader(this)) {
            return promiseRejectedWith(byobReaderBrandCheckException("cancel"));
          }
          if (this._ownerReadableStream === void 0) {
            return promiseRejectedWith(readerLockException("cancel"));
          }
          return ReadableStreamReaderGenericCancel(this, reason);
        }
        read(view, rawOptions = {}) {
          if (!IsReadableStreamBYOBReader(this)) {
            return promiseRejectedWith(byobReaderBrandCheckException("read"));
          }
          if (!ArrayBuffer.isView(view)) {
            return promiseRejectedWith(new TypeError("view must be an array buffer view"));
          }
          if (view.byteLength === 0) {
            return promiseRejectedWith(new TypeError("view must have non-zero byteLength"));
          }
          if (view.buffer.byteLength === 0) {
            return promiseRejectedWith(new TypeError(`view's buffer must have non-zero byteLength`));
          }
          if (IsDetachedBuffer(view.buffer)) {
            return promiseRejectedWith(new TypeError("view's buffer has been detached"));
          }
          let options;
          try {
            options = convertByobReadOptions(rawOptions, "options");
          } catch (e2) {
            return promiseRejectedWith(e2);
          }
          const min = options.min;
          if (min === 0) {
            return promiseRejectedWith(new TypeError("options.min must be greater than 0"));
          }
          if (!isDataView(view)) {
            if (min > view.length) {
              return promiseRejectedWith(new RangeError("options.min must be less than or equal to view's length"));
            }
          } else if (min > view.byteLength) {
            return promiseRejectedWith(new RangeError("options.min must be less than or equal to view's byteLength"));
          }
          if (this._ownerReadableStream === void 0) {
            return promiseRejectedWith(readerLockException("read from"));
          }
          let resolvePromise;
          let rejectPromise;
          const promise = newPromise((resolve, reject) => {
            resolvePromise = resolve;
            rejectPromise = reject;
          });
          const readIntoRequest = {
            _chunkSteps: (chunk) => resolvePromise({ value: chunk, done: false }),
            _closeSteps: (chunk) => resolvePromise({ value: chunk, done: true }),
            _errorSteps: (e2) => rejectPromise(e2)
          };
          ReadableStreamBYOBReaderRead(this, view, min, readIntoRequest);
          return promise;
        }
        /**
         * Releases the reader's lock on the corresponding stream. After the lock is released, the reader is no longer active.
         * If the associated stream is errored when the lock is released, the reader will appear errored in the same way
         * from now on; otherwise, the reader will appear closed.
         *
         * A reader's lock cannot be released while it still has a pending read request, i.e., if a promise returned by
         * the reader's {@link ReadableStreamBYOBReader.read | read()} method has not yet been settled. Attempting to
         * do so will throw a `TypeError` and leave the reader locked to the stream.
         */
        releaseLock() {
          if (!IsReadableStreamBYOBReader(this)) {
            throw byobReaderBrandCheckException("releaseLock");
          }
          if (this._ownerReadableStream === void 0) {
            return;
          }
          ReadableStreamBYOBReaderRelease(this);
        }
      }
      Object.defineProperties(ReadableStreamBYOBReader.prototype, {
        cancel: { enumerable: true },
        read: { enumerable: true },
        releaseLock: { enumerable: true },
        closed: { enumerable: true }
      });
      setFunctionName(ReadableStreamBYOBReader.prototype.cancel, "cancel");
      setFunctionName(ReadableStreamBYOBReader.prototype.read, "read");
      setFunctionName(ReadableStreamBYOBReader.prototype.releaseLock, "releaseLock");
      if (typeof Symbol.toStringTag === "symbol") {
        Object.defineProperty(ReadableStreamBYOBReader.prototype, Symbol.toStringTag, {
          value: "ReadableStreamBYOBReader",
          configurable: true
        });
      }
      function IsReadableStreamBYOBReader(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_readIntoRequests")) {
          return false;
        }
        return x2 instanceof ReadableStreamBYOBReader;
      }
      function ReadableStreamBYOBReaderRead(reader, view, min, readIntoRequest) {
        const stream = reader._ownerReadableStream;
        stream._disturbed = true;
        if (stream._state === "errored") {
          readIntoRequest._errorSteps(stream._storedError);
        } else {
          ReadableByteStreamControllerPullInto(stream._readableStreamController, view, min, readIntoRequest);
        }
      }
      function ReadableStreamBYOBReaderRelease(reader) {
        ReadableStreamReaderGenericRelease(reader);
        const e2 = new TypeError("Reader was released");
        ReadableStreamBYOBReaderErrorReadIntoRequests(reader, e2);
      }
      function ReadableStreamBYOBReaderErrorReadIntoRequests(reader, e2) {
        const readIntoRequests = reader._readIntoRequests;
        reader._readIntoRequests = new SimpleQueue();
        readIntoRequests.forEach((readIntoRequest) => {
          readIntoRequest._errorSteps(e2);
        });
      }
      function byobReaderBrandCheckException(name) {
        return new TypeError(`ReadableStreamBYOBReader.prototype.${name} can only be used on a ReadableStreamBYOBReader`);
      }
      function ExtractHighWaterMark(strategy, defaultHWM) {
        const { highWaterMark } = strategy;
        if (highWaterMark === void 0) {
          return defaultHWM;
        }
        if (NumberIsNaN(highWaterMark) || highWaterMark < 0) {
          throw new RangeError("Invalid highWaterMark");
        }
        return highWaterMark;
      }
      function ExtractSizeAlgorithm(strategy) {
        const { size } = strategy;
        if (!size) {
          return () => 1;
        }
        return size;
      }
      function convertQueuingStrategy(init, context) {
        assertDictionary(init, context);
        const highWaterMark = init === null || init === void 0 ? void 0 : init.highWaterMark;
        const size = init === null || init === void 0 ? void 0 : init.size;
        return {
          highWaterMark: highWaterMark === void 0 ? void 0 : convertUnrestrictedDouble(highWaterMark),
          size: size === void 0 ? void 0 : convertQueuingStrategySize(size, `${context} has member 'size' that`)
        };
      }
      function convertQueuingStrategySize(fn, context) {
        assertFunction(fn, context);
        return (chunk) => convertUnrestrictedDouble(fn(chunk));
      }
      function convertUnderlyingSink(original, context) {
        assertDictionary(original, context);
        const abort = original === null || original === void 0 ? void 0 : original.abort;
        const close = original === null || original === void 0 ? void 0 : original.close;
        const start = original === null || original === void 0 ? void 0 : original.start;
        const type = original === null || original === void 0 ? void 0 : original.type;
        const write = original === null || original === void 0 ? void 0 : original.write;
        return {
          abort: abort === void 0 ? void 0 : convertUnderlyingSinkAbortCallback(abort, original, `${context} has member 'abort' that`),
          close: close === void 0 ? void 0 : convertUnderlyingSinkCloseCallback(close, original, `${context} has member 'close' that`),
          start: start === void 0 ? void 0 : convertUnderlyingSinkStartCallback(start, original, `${context} has member 'start' that`),
          write: write === void 0 ? void 0 : convertUnderlyingSinkWriteCallback(write, original, `${context} has member 'write' that`),
          type
        };
      }
      function convertUnderlyingSinkAbortCallback(fn, original, context) {
        assertFunction(fn, context);
        return (reason) => promiseCall(fn, original, [reason]);
      }
      function convertUnderlyingSinkCloseCallback(fn, original, context) {
        assertFunction(fn, context);
        return () => promiseCall(fn, original, []);
      }
      function convertUnderlyingSinkStartCallback(fn, original, context) {
        assertFunction(fn, context);
        return (controller) => reflectCall(fn, original, [controller]);
      }
      function convertUnderlyingSinkWriteCallback(fn, original, context) {
        assertFunction(fn, context);
        return (chunk, controller) => promiseCall(fn, original, [chunk, controller]);
      }
      function assertWritableStream(x2, context) {
        if (!IsWritableStream(x2)) {
          throw new TypeError(`${context} is not a WritableStream.`);
        }
      }
      function isAbortSignal2(value) {
        if (typeof value !== "object" || value === null) {
          return false;
        }
        try {
          return typeof value.aborted === "boolean";
        } catch (_a2) {
          return false;
        }
      }
      const supportsAbortController = typeof AbortController === "function";
      function createAbortController() {
        if (supportsAbortController) {
          return new AbortController();
        }
        return void 0;
      }
      class WritableStream {
        constructor(rawUnderlyingSink = {}, rawStrategy = {}) {
          if (rawUnderlyingSink === void 0) {
            rawUnderlyingSink = null;
          } else {
            assertObject(rawUnderlyingSink, "First parameter");
          }
          const strategy = convertQueuingStrategy(rawStrategy, "Second parameter");
          const underlyingSink = convertUnderlyingSink(rawUnderlyingSink, "First parameter");
          InitializeWritableStream(this);
          const type = underlyingSink.type;
          if (type !== void 0) {
            throw new RangeError("Invalid type is specified");
          }
          const sizeAlgorithm = ExtractSizeAlgorithm(strategy);
          const highWaterMark = ExtractHighWaterMark(strategy, 1);
          SetUpWritableStreamDefaultControllerFromUnderlyingSink(this, underlyingSink, highWaterMark, sizeAlgorithm);
        }
        /**
         * Returns whether or not the writable stream is locked to a writer.
         */
        get locked() {
          if (!IsWritableStream(this)) {
            throw streamBrandCheckException$2("locked");
          }
          return IsWritableStreamLocked(this);
        }
        /**
         * Aborts the stream, signaling that the producer can no longer successfully write to the stream and it is to be
         * immediately moved to an errored state, with any queued-up writes discarded. This will also execute any abort
         * mechanism of the underlying sink.
         *
         * The returned promise will fulfill if the stream shuts down successfully, or reject if the underlying sink signaled
         * that there was an error doing so. Additionally, it will reject with a `TypeError` (without attempting to cancel
         * the stream) if the stream is currently locked.
         */
        abort(reason = void 0) {
          if (!IsWritableStream(this)) {
            return promiseRejectedWith(streamBrandCheckException$2("abort"));
          }
          if (IsWritableStreamLocked(this)) {
            return promiseRejectedWith(new TypeError("Cannot abort a stream that already has a writer"));
          }
          return WritableStreamAbort(this, reason);
        }
        /**
         * Closes the stream. The underlying sink will finish processing any previously-written chunks, before invoking its
         * close behavior. During this time any further attempts to write will fail (without erroring the stream).
         *
         * The method returns a promise that will fulfill if all remaining chunks are successfully written and the stream
         * successfully closes, or rejects if an error is encountered during this process. Additionally, it will reject with
         * a `TypeError` (without attempting to cancel the stream) if the stream is currently locked.
         */
        close() {
          if (!IsWritableStream(this)) {
            return promiseRejectedWith(streamBrandCheckException$2("close"));
          }
          if (IsWritableStreamLocked(this)) {
            return promiseRejectedWith(new TypeError("Cannot close a stream that already has a writer"));
          }
          if (WritableStreamCloseQueuedOrInFlight(this)) {
            return promiseRejectedWith(new TypeError("Cannot close an already-closing stream"));
          }
          return WritableStreamClose(this);
        }
        /**
         * Creates a {@link WritableStreamDefaultWriter | writer} and locks the stream to the new writer. While the stream
         * is locked, no other writer can be acquired until this one is released.
         *
         * This functionality is especially useful for creating abstractions that desire the ability to write to a stream
         * without interruption or interleaving. By getting a writer for the stream, you can ensure nobody else can write at
         * the same time, which would cause the resulting written data to be unpredictable and probably useless.
         */
        getWriter() {
          if (!IsWritableStream(this)) {
            throw streamBrandCheckException$2("getWriter");
          }
          return AcquireWritableStreamDefaultWriter(this);
        }
      }
      Object.defineProperties(WritableStream.prototype, {
        abort: { enumerable: true },
        close: { enumerable: true },
        getWriter: { enumerable: true },
        locked: { enumerable: true }
      });
      setFunctionName(WritableStream.prototype.abort, "abort");
      setFunctionName(WritableStream.prototype.close, "close");
      setFunctionName(WritableStream.prototype.getWriter, "getWriter");
      if (typeof Symbol.toStringTag === "symbol") {
        Object.defineProperty(WritableStream.prototype, Symbol.toStringTag, {
          value: "WritableStream",
          configurable: true
        });
      }
      function AcquireWritableStreamDefaultWriter(stream) {
        return new WritableStreamDefaultWriter(stream);
      }
      function CreateWritableStream(startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark = 1, sizeAlgorithm = () => 1) {
        const stream = Object.create(WritableStream.prototype);
        InitializeWritableStream(stream);
        const controller = Object.create(WritableStreamDefaultController.prototype);
        SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
        return stream;
      }
      function InitializeWritableStream(stream) {
        stream._state = "writable";
        stream._storedError = void 0;
        stream._writer = void 0;
        stream._writableStreamController = void 0;
        stream._writeRequests = new SimpleQueue();
        stream._inFlightWriteRequest = void 0;
        stream._closeRequest = void 0;
        stream._inFlightCloseRequest = void 0;
        stream._pendingAbortRequest = void 0;
        stream._backpressure = false;
      }
      function IsWritableStream(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_writableStreamController")) {
          return false;
        }
        return x2 instanceof WritableStream;
      }
      function IsWritableStreamLocked(stream) {
        if (stream._writer === void 0) {
          return false;
        }
        return true;
      }
      function WritableStreamAbort(stream, reason) {
        var _a2;
        if (stream._state === "closed" || stream._state === "errored") {
          return promiseResolvedWith(void 0);
        }
        stream._writableStreamController._abortReason = reason;
        (_a2 = stream._writableStreamController._abortController) === null || _a2 === void 0 ? void 0 : _a2.abort(reason);
        const state = stream._state;
        if (state === "closed" || state === "errored") {
          return promiseResolvedWith(void 0);
        }
        if (stream._pendingAbortRequest !== void 0) {
          return stream._pendingAbortRequest._promise;
        }
        let wasAlreadyErroring = false;
        if (state === "erroring") {
          wasAlreadyErroring = true;
          reason = void 0;
        }
        const promise = newPromise((resolve, reject) => {
          stream._pendingAbortRequest = {
            _promise: void 0,
            _resolve: resolve,
            _reject: reject,
            _reason: reason,
            _wasAlreadyErroring: wasAlreadyErroring
          };
        });
        stream._pendingAbortRequest._promise = promise;
        if (!wasAlreadyErroring) {
          WritableStreamStartErroring(stream, reason);
        }
        return promise;
      }
      function WritableStreamClose(stream) {
        const state = stream._state;
        if (state === "closed" || state === "errored") {
          return promiseRejectedWith(new TypeError(`The stream (in ${state} state) is not in the writable state and cannot be closed`));
        }
        const promise = newPromise((resolve, reject) => {
          const closeRequest = {
            _resolve: resolve,
            _reject: reject
          };
          stream._closeRequest = closeRequest;
        });
        const writer = stream._writer;
        if (writer !== void 0 && stream._backpressure && state === "writable") {
          defaultWriterReadyPromiseResolve(writer);
        }
        WritableStreamDefaultControllerClose(stream._writableStreamController);
        return promise;
      }
      function WritableStreamAddWriteRequest(stream) {
        const promise = newPromise((resolve, reject) => {
          const writeRequest = {
            _resolve: resolve,
            _reject: reject
          };
          stream._writeRequests.push(writeRequest);
        });
        return promise;
      }
      function WritableStreamDealWithRejection(stream, error) {
        const state = stream._state;
        if (state === "writable") {
          WritableStreamStartErroring(stream, error);
          return;
        }
        WritableStreamFinishErroring(stream);
      }
      function WritableStreamStartErroring(stream, reason) {
        const controller = stream._writableStreamController;
        stream._state = "erroring";
        stream._storedError = reason;
        const writer = stream._writer;
        if (writer !== void 0) {
          WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, reason);
        }
        if (!WritableStreamHasOperationMarkedInFlight(stream) && controller._started) {
          WritableStreamFinishErroring(stream);
        }
      }
      function WritableStreamFinishErroring(stream) {
        stream._state = "errored";
        stream._writableStreamController[ErrorSteps]();
        const storedError = stream._storedError;
        stream._writeRequests.forEach((writeRequest) => {
          writeRequest._reject(storedError);
        });
        stream._writeRequests = new SimpleQueue();
        if (stream._pendingAbortRequest === void 0) {
          WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
          return;
        }
        const abortRequest = stream._pendingAbortRequest;
        stream._pendingAbortRequest = void 0;
        if (abortRequest._wasAlreadyErroring) {
          abortRequest._reject(storedError);
          WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
          return;
        }
        const promise = stream._writableStreamController[AbortSteps](abortRequest._reason);
        uponPromise(promise, () => {
          abortRequest._resolve();
          WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
          return null;
        }, (reason) => {
          abortRequest._reject(reason);
          WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
          return null;
        });
      }
      function WritableStreamFinishInFlightWrite(stream) {
        stream._inFlightWriteRequest._resolve(void 0);
        stream._inFlightWriteRequest = void 0;
      }
      function WritableStreamFinishInFlightWriteWithError(stream, error) {
        stream._inFlightWriteRequest._reject(error);
        stream._inFlightWriteRequest = void 0;
        WritableStreamDealWithRejection(stream, error);
      }
      function WritableStreamFinishInFlightClose(stream) {
        stream._inFlightCloseRequest._resolve(void 0);
        stream._inFlightCloseRequest = void 0;
        const state = stream._state;
        if (state === "erroring") {
          stream._storedError = void 0;
          if (stream._pendingAbortRequest !== void 0) {
            stream._pendingAbortRequest._resolve();
            stream._pendingAbortRequest = void 0;
          }
        }
        stream._state = "closed";
        const writer = stream._writer;
        if (writer !== void 0) {
          defaultWriterClosedPromiseResolve(writer);
        }
      }
      function WritableStreamFinishInFlightCloseWithError(stream, error) {
        stream._inFlightCloseRequest._reject(error);
        stream._inFlightCloseRequest = void 0;
        if (stream._pendingAbortRequest !== void 0) {
          stream._pendingAbortRequest._reject(error);
          stream._pendingAbortRequest = void 0;
        }
        WritableStreamDealWithRejection(stream, error);
      }
      function WritableStreamCloseQueuedOrInFlight(stream) {
        if (stream._closeRequest === void 0 && stream._inFlightCloseRequest === void 0) {
          return false;
        }
        return true;
      }
      function WritableStreamHasOperationMarkedInFlight(stream) {
        if (stream._inFlightWriteRequest === void 0 && stream._inFlightCloseRequest === void 0) {
          return false;
        }
        return true;
      }
      function WritableStreamMarkCloseRequestInFlight(stream) {
        stream._inFlightCloseRequest = stream._closeRequest;
        stream._closeRequest = void 0;
      }
      function WritableStreamMarkFirstWriteRequestInFlight(stream) {
        stream._inFlightWriteRequest = stream._writeRequests.shift();
      }
      function WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream) {
        if (stream._closeRequest !== void 0) {
          stream._closeRequest._reject(stream._storedError);
          stream._closeRequest = void 0;
        }
        const writer = stream._writer;
        if (writer !== void 0) {
          defaultWriterClosedPromiseReject(writer, stream._storedError);
        }
      }
      function WritableStreamUpdateBackpressure(stream, backpressure) {
        const writer = stream._writer;
        if (writer !== void 0 && backpressure !== stream._backpressure) {
          if (backpressure) {
            defaultWriterReadyPromiseReset(writer);
          } else {
            defaultWriterReadyPromiseResolve(writer);
          }
        }
        stream._backpressure = backpressure;
      }
      class WritableStreamDefaultWriter {
        constructor(stream) {
          assertRequiredArgument(stream, 1, "WritableStreamDefaultWriter");
          assertWritableStream(stream, "First parameter");
          if (IsWritableStreamLocked(stream)) {
            throw new TypeError("This stream has already been locked for exclusive writing by another writer");
          }
          this._ownerWritableStream = stream;
          stream._writer = this;
          const state = stream._state;
          if (state === "writable") {
            if (!WritableStreamCloseQueuedOrInFlight(stream) && stream._backpressure) {
              defaultWriterReadyPromiseInitialize(this);
            } else {
              defaultWriterReadyPromiseInitializeAsResolved(this);
            }
            defaultWriterClosedPromiseInitialize(this);
          } else if (state === "erroring") {
            defaultWriterReadyPromiseInitializeAsRejected(this, stream._storedError);
            defaultWriterClosedPromiseInitialize(this);
          } else if (state === "closed") {
            defaultWriterReadyPromiseInitializeAsResolved(this);
            defaultWriterClosedPromiseInitializeAsResolved(this);
          } else {
            const storedError = stream._storedError;
            defaultWriterReadyPromiseInitializeAsRejected(this, storedError);
            defaultWriterClosedPromiseInitializeAsRejected(this, storedError);
          }
        }
        /**
         * Returns a promise that will be fulfilled when the stream becomes closed, or rejected if the stream ever errors or
         * the writer’s lock is released before the stream finishes closing.
         */
        get closed() {
          if (!IsWritableStreamDefaultWriter(this)) {
            return promiseRejectedWith(defaultWriterBrandCheckException("closed"));
          }
          return this._closedPromise;
        }
        /**
         * Returns the desired size to fill the stream’s internal queue. It can be negative, if the queue is over-full.
         * A producer can use this information to determine the right amount of data to write.
         *
         * It will be `null` if the stream cannot be successfully written to (due to either being errored, or having an abort
         * queued up). It will return zero if the stream is closed. And the getter will throw an exception if invoked when
         * the writer’s lock is released.
         */
        get desiredSize() {
          if (!IsWritableStreamDefaultWriter(this)) {
            throw defaultWriterBrandCheckException("desiredSize");
          }
          if (this._ownerWritableStream === void 0) {
            throw defaultWriterLockException("desiredSize");
          }
          return WritableStreamDefaultWriterGetDesiredSize(this);
        }
        /**
         * Returns a promise that will be fulfilled when the desired size to fill the stream’s internal queue transitions
         * from non-positive to positive, signaling that it is no longer applying backpressure. Once the desired size dips
         * back to zero or below, the getter will return a new promise that stays pending until the next transition.
         *
         * If the stream becomes errored or aborted, or the writer’s lock is released, the returned promise will become
         * rejected.
         */
        get ready() {
          if (!IsWritableStreamDefaultWriter(this)) {
            return promiseRejectedWith(defaultWriterBrandCheckException("ready"));
          }
          return this._readyPromise;
        }
        /**
         * If the reader is active, behaves the same as {@link WritableStream.abort | stream.abort(reason)}.
         */
        abort(reason = void 0) {
          if (!IsWritableStreamDefaultWriter(this)) {
            return promiseRejectedWith(defaultWriterBrandCheckException("abort"));
          }
          if (this._ownerWritableStream === void 0) {
            return promiseRejectedWith(defaultWriterLockException("abort"));
          }
          return WritableStreamDefaultWriterAbort(this, reason);
        }
        /**
         * If the reader is active, behaves the same as {@link WritableStream.close | stream.close()}.
         */
        close() {
          if (!IsWritableStreamDefaultWriter(this)) {
            return promiseRejectedWith(defaultWriterBrandCheckException("close"));
          }
          const stream = this._ownerWritableStream;
          if (stream === void 0) {
            return promiseRejectedWith(defaultWriterLockException("close"));
          }
          if (WritableStreamCloseQueuedOrInFlight(stream)) {
            return promiseRejectedWith(new TypeError("Cannot close an already-closing stream"));
          }
          return WritableStreamDefaultWriterClose(this);
        }
        /**
         * Releases the writer’s lock on the corresponding stream. After the lock is released, the writer is no longer active.
         * If the associated stream is errored when the lock is released, the writer will appear errored in the same way from
         * now on; otherwise, the writer will appear closed.
         *
         * Note that the lock can still be released even if some ongoing writes have not yet finished (i.e. even if the
         * promises returned from previous calls to {@link WritableStreamDefaultWriter.write | write()} have not yet settled).
         * It’s not necessary to hold the lock on the writer for the duration of the write; the lock instead simply prevents
         * other producers from writing in an interleaved manner.
         */
        releaseLock() {
          if (!IsWritableStreamDefaultWriter(this)) {
            throw defaultWriterBrandCheckException("releaseLock");
          }
          const stream = this._ownerWritableStream;
          if (stream === void 0) {
            return;
          }
          WritableStreamDefaultWriterRelease(this);
        }
        write(chunk = void 0) {
          if (!IsWritableStreamDefaultWriter(this)) {
            return promiseRejectedWith(defaultWriterBrandCheckException("write"));
          }
          if (this._ownerWritableStream === void 0) {
            return promiseRejectedWith(defaultWriterLockException("write to"));
          }
          return WritableStreamDefaultWriterWrite(this, chunk);
        }
      }
      Object.defineProperties(WritableStreamDefaultWriter.prototype, {
        abort: { enumerable: true },
        close: { enumerable: true },
        releaseLock: { enumerable: true },
        write: { enumerable: true },
        closed: { enumerable: true },
        desiredSize: { enumerable: true },
        ready: { enumerable: true }
      });
      setFunctionName(WritableStreamDefaultWriter.prototype.abort, "abort");
      setFunctionName(WritableStreamDefaultWriter.prototype.close, "close");
      setFunctionName(WritableStreamDefaultWriter.prototype.releaseLock, "releaseLock");
      setFunctionName(WritableStreamDefaultWriter.prototype.write, "write");
      if (typeof Symbol.toStringTag === "symbol") {
        Object.defineProperty(WritableStreamDefaultWriter.prototype, Symbol.toStringTag, {
          value: "WritableStreamDefaultWriter",
          configurable: true
        });
      }
      function IsWritableStreamDefaultWriter(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_ownerWritableStream")) {
          return false;
        }
        return x2 instanceof WritableStreamDefaultWriter;
      }
      function WritableStreamDefaultWriterAbort(writer, reason) {
        const stream = writer._ownerWritableStream;
        return WritableStreamAbort(stream, reason);
      }
      function WritableStreamDefaultWriterClose(writer) {
        const stream = writer._ownerWritableStream;
        return WritableStreamClose(stream);
      }
      function WritableStreamDefaultWriterCloseWithErrorPropagation(writer) {
        const stream = writer._ownerWritableStream;
        const state = stream._state;
        if (WritableStreamCloseQueuedOrInFlight(stream) || state === "closed") {
          return promiseResolvedWith(void 0);
        }
        if (state === "errored") {
          return promiseRejectedWith(stream._storedError);
        }
        return WritableStreamDefaultWriterClose(writer);
      }
      function WritableStreamDefaultWriterEnsureClosedPromiseRejected(writer, error) {
        if (writer._closedPromiseState === "pending") {
          defaultWriterClosedPromiseReject(writer, error);
        } else {
          defaultWriterClosedPromiseResetToRejected(writer, error);
        }
      }
      function WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, error) {
        if (writer._readyPromiseState === "pending") {
          defaultWriterReadyPromiseReject(writer, error);
        } else {
          defaultWriterReadyPromiseResetToRejected(writer, error);
        }
      }
      function WritableStreamDefaultWriterGetDesiredSize(writer) {
        const stream = writer._ownerWritableStream;
        const state = stream._state;
        if (state === "errored" || state === "erroring") {
          return null;
        }
        if (state === "closed") {
          return 0;
        }
        return WritableStreamDefaultControllerGetDesiredSize(stream._writableStreamController);
      }
      function WritableStreamDefaultWriterRelease(writer) {
        const stream = writer._ownerWritableStream;
        const releasedError = new TypeError(`Writer was released and can no longer be used to monitor the stream's closedness`);
        WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, releasedError);
        WritableStreamDefaultWriterEnsureClosedPromiseRejected(writer, releasedError);
        stream._writer = void 0;
        writer._ownerWritableStream = void 0;
      }
      function WritableStreamDefaultWriterWrite(writer, chunk) {
        const stream = writer._ownerWritableStream;
        const controller = stream._writableStreamController;
        const chunkSize = WritableStreamDefaultControllerGetChunkSize(controller, chunk);
        if (stream !== writer._ownerWritableStream) {
          return promiseRejectedWith(defaultWriterLockException("write to"));
        }
        const state = stream._state;
        if (state === "errored") {
          return promiseRejectedWith(stream._storedError);
        }
        if (WritableStreamCloseQueuedOrInFlight(stream) || state === "closed") {
          return promiseRejectedWith(new TypeError("The stream is closing or closed and cannot be written to"));
        }
        if (state === "erroring") {
          return promiseRejectedWith(stream._storedError);
        }
        const promise = WritableStreamAddWriteRequest(stream);
        WritableStreamDefaultControllerWrite(controller, chunk, chunkSize);
        return promise;
      }
      const closeSentinel = {};
      class WritableStreamDefaultController {
        constructor() {
          throw new TypeError("Illegal constructor");
        }
        /**
         * The reason which was passed to `WritableStream.abort(reason)` when the stream was aborted.
         *
         * @deprecated
         *  This property has been removed from the specification, see https://github.com/whatwg/streams/pull/1177.
         *  Use {@link WritableStreamDefaultController.signal}'s `reason` instead.
         */
        get abortReason() {
          if (!IsWritableStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException$2("abortReason");
          }
          return this._abortReason;
        }
        /**
         * An `AbortSignal` that can be used to abort the pending write or close operation when the stream is aborted.
         */
        get signal() {
          if (!IsWritableStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException$2("signal");
          }
          if (this._abortController === void 0) {
            throw new TypeError("WritableStreamDefaultController.prototype.signal is not supported");
          }
          return this._abortController.signal;
        }
        /**
         * Closes the controlled writable stream, making all future interactions with it fail with the given error `e`.
         *
         * This method is rarely used, since usually it suffices to return a rejected promise from one of the underlying
         * sink's methods. However, it can be useful for suddenly shutting down a stream in response to an event outside the
         * normal lifecycle of interactions with the underlying sink.
         */
        error(e2 = void 0) {
          if (!IsWritableStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException$2("error");
          }
          const state = this._controlledWritableStream._state;
          if (state !== "writable") {
            return;
          }
          WritableStreamDefaultControllerError(this, e2);
        }
        /** @internal */
        [AbortSteps](reason) {
          const result = this._abortAlgorithm(reason);
          WritableStreamDefaultControllerClearAlgorithms(this);
          return result;
        }
        /** @internal */
        [ErrorSteps]() {
          ResetQueue(this);
        }
      }
      Object.defineProperties(WritableStreamDefaultController.prototype, {
        abortReason: { enumerable: true },
        signal: { enumerable: true },
        error: { enumerable: true }
      });
      if (typeof Symbol.toStringTag === "symbol") {
        Object.defineProperty(WritableStreamDefaultController.prototype, Symbol.toStringTag, {
          value: "WritableStreamDefaultController",
          configurable: true
        });
      }
      function IsWritableStreamDefaultController(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_controlledWritableStream")) {
          return false;
        }
        return x2 instanceof WritableStreamDefaultController;
      }
      function SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm) {
        controller._controlledWritableStream = stream;
        stream._writableStreamController = controller;
        controller._queue = void 0;
        controller._queueTotalSize = void 0;
        ResetQueue(controller);
        controller._abortReason = void 0;
        controller._abortController = createAbortController();
        controller._started = false;
        controller._strategySizeAlgorithm = sizeAlgorithm;
        controller._strategyHWM = highWaterMark;
        controller._writeAlgorithm = writeAlgorithm;
        controller._closeAlgorithm = closeAlgorithm;
        controller._abortAlgorithm = abortAlgorithm;
        const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
        WritableStreamUpdateBackpressure(stream, backpressure);
        const startResult = startAlgorithm();
        const startPromise = promiseResolvedWith(startResult);
        uponPromise(startPromise, () => {
          controller._started = true;
          WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
          return null;
        }, (r2) => {
          controller._started = true;
          WritableStreamDealWithRejection(stream, r2);
          return null;
        });
      }
      function SetUpWritableStreamDefaultControllerFromUnderlyingSink(stream, underlyingSink, highWaterMark, sizeAlgorithm) {
        const controller = Object.create(WritableStreamDefaultController.prototype);
        let startAlgorithm;
        let writeAlgorithm;
        let closeAlgorithm;
        let abortAlgorithm;
        if (underlyingSink.start !== void 0) {
          startAlgorithm = () => underlyingSink.start(controller);
        } else {
          startAlgorithm = () => void 0;
        }
        if (underlyingSink.write !== void 0) {
          writeAlgorithm = (chunk) => underlyingSink.write(chunk, controller);
        } else {
          writeAlgorithm = () => promiseResolvedWith(void 0);
        }
        if (underlyingSink.close !== void 0) {
          closeAlgorithm = () => underlyingSink.close();
        } else {
          closeAlgorithm = () => promiseResolvedWith(void 0);
        }
        if (underlyingSink.abort !== void 0) {
          abortAlgorithm = (reason) => underlyingSink.abort(reason);
        } else {
          abortAlgorithm = () => promiseResolvedWith(void 0);
        }
        SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
      }
      function WritableStreamDefaultControllerClearAlgorithms(controller) {
        controller._writeAlgorithm = void 0;
        controller._closeAlgorithm = void 0;
        controller._abortAlgorithm = void 0;
        controller._strategySizeAlgorithm = void 0;
      }
      function WritableStreamDefaultControllerClose(controller) {
        EnqueueValueWithSize(controller, closeSentinel, 0);
        WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
      }
      function WritableStreamDefaultControllerGetChunkSize(controller, chunk) {
        try {
          return controller._strategySizeAlgorithm(chunk);
        } catch (chunkSizeE) {
          WritableStreamDefaultControllerErrorIfNeeded(controller, chunkSizeE);
          return 1;
        }
      }
      function WritableStreamDefaultControllerGetDesiredSize(controller) {
        return controller._strategyHWM - controller._queueTotalSize;
      }
      function WritableStreamDefaultControllerWrite(controller, chunk, chunkSize) {
        try {
          EnqueueValueWithSize(controller, chunk, chunkSize);
        } catch (enqueueE) {
          WritableStreamDefaultControllerErrorIfNeeded(controller, enqueueE);
          return;
        }
        const stream = controller._controlledWritableStream;
        if (!WritableStreamCloseQueuedOrInFlight(stream) && stream._state === "writable") {
          const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
          WritableStreamUpdateBackpressure(stream, backpressure);
        }
        WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
      }
      function WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller) {
        const stream = controller._controlledWritableStream;
        if (!controller._started) {
          return;
        }
        if (stream._inFlightWriteRequest !== void 0) {
          return;
        }
        const state = stream._state;
        if (state === "erroring") {
          WritableStreamFinishErroring(stream);
          return;
        }
        if (controller._queue.length === 0) {
          return;
        }
        const value = PeekQueueValue(controller);
        if (value === closeSentinel) {
          WritableStreamDefaultControllerProcessClose(controller);
        } else {
          WritableStreamDefaultControllerProcessWrite(controller, value);
        }
      }
      function WritableStreamDefaultControllerErrorIfNeeded(controller, error) {
        if (controller._controlledWritableStream._state === "writable") {
          WritableStreamDefaultControllerError(controller, error);
        }
      }
      function WritableStreamDefaultControllerProcessClose(controller) {
        const stream = controller._controlledWritableStream;
        WritableStreamMarkCloseRequestInFlight(stream);
        DequeueValue(controller);
        const sinkClosePromise = controller._closeAlgorithm();
        WritableStreamDefaultControllerClearAlgorithms(controller);
        uponPromise(sinkClosePromise, () => {
          WritableStreamFinishInFlightClose(stream);
          return null;
        }, (reason) => {
          WritableStreamFinishInFlightCloseWithError(stream, reason);
          return null;
        });
      }
      function WritableStreamDefaultControllerProcessWrite(controller, chunk) {
        const stream = controller._controlledWritableStream;
        WritableStreamMarkFirstWriteRequestInFlight(stream);
        const sinkWritePromise = controller._writeAlgorithm(chunk);
        uponPromise(sinkWritePromise, () => {
          WritableStreamFinishInFlightWrite(stream);
          const state = stream._state;
          DequeueValue(controller);
          if (!WritableStreamCloseQueuedOrInFlight(stream) && state === "writable") {
            const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
            WritableStreamUpdateBackpressure(stream, backpressure);
          }
          WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
          return null;
        }, (reason) => {
          if (stream._state === "writable") {
            WritableStreamDefaultControllerClearAlgorithms(controller);
          }
          WritableStreamFinishInFlightWriteWithError(stream, reason);
          return null;
        });
      }
      function WritableStreamDefaultControllerGetBackpressure(controller) {
        const desiredSize = WritableStreamDefaultControllerGetDesiredSize(controller);
        return desiredSize <= 0;
      }
      function WritableStreamDefaultControllerError(controller, error) {
        const stream = controller._controlledWritableStream;
        WritableStreamDefaultControllerClearAlgorithms(controller);
        WritableStreamStartErroring(stream, error);
      }
      function streamBrandCheckException$2(name) {
        return new TypeError(`WritableStream.prototype.${name} can only be used on a WritableStream`);
      }
      function defaultControllerBrandCheckException$2(name) {
        return new TypeError(`WritableStreamDefaultController.prototype.${name} can only be used on a WritableStreamDefaultController`);
      }
      function defaultWriterBrandCheckException(name) {
        return new TypeError(`WritableStreamDefaultWriter.prototype.${name} can only be used on a WritableStreamDefaultWriter`);
      }
      function defaultWriterLockException(name) {
        return new TypeError("Cannot " + name + " a stream using a released writer");
      }
      function defaultWriterClosedPromiseInitialize(writer) {
        writer._closedPromise = newPromise((resolve, reject) => {
          writer._closedPromise_resolve = resolve;
          writer._closedPromise_reject = reject;
          writer._closedPromiseState = "pending";
        });
      }
      function defaultWriterClosedPromiseInitializeAsRejected(writer, reason) {
        defaultWriterClosedPromiseInitialize(writer);
        defaultWriterClosedPromiseReject(writer, reason);
      }
      function defaultWriterClosedPromiseInitializeAsResolved(writer) {
        defaultWriterClosedPromiseInitialize(writer);
        defaultWriterClosedPromiseResolve(writer);
      }
      function defaultWriterClosedPromiseReject(writer, reason) {
        if (writer._closedPromise_reject === void 0) {
          return;
        }
        setPromiseIsHandledToTrue(writer._closedPromise);
        writer._closedPromise_reject(reason);
        writer._closedPromise_resolve = void 0;
        writer._closedPromise_reject = void 0;
        writer._closedPromiseState = "rejected";
      }
      function defaultWriterClosedPromiseResetToRejected(writer, reason) {
        defaultWriterClosedPromiseInitializeAsRejected(writer, reason);
      }
      function defaultWriterClosedPromiseResolve(writer) {
        if (writer._closedPromise_resolve === void 0) {
          return;
        }
        writer._closedPromise_resolve(void 0);
        writer._closedPromise_resolve = void 0;
        writer._closedPromise_reject = void 0;
        writer._closedPromiseState = "resolved";
      }
      function defaultWriterReadyPromiseInitialize(writer) {
        writer._readyPromise = newPromise((resolve, reject) => {
          writer._readyPromise_resolve = resolve;
          writer._readyPromise_reject = reject;
        });
        writer._readyPromiseState = "pending";
      }
      function defaultWriterReadyPromiseInitializeAsRejected(writer, reason) {
        defaultWriterReadyPromiseInitialize(writer);
        defaultWriterReadyPromiseReject(writer, reason);
      }
      function defaultWriterReadyPromiseInitializeAsResolved(writer) {
        defaultWriterReadyPromiseInitialize(writer);
        defaultWriterReadyPromiseResolve(writer);
      }
      function defaultWriterReadyPromiseReject(writer, reason) {
        if (writer._readyPromise_reject === void 0) {
          return;
        }
        setPromiseIsHandledToTrue(writer._readyPromise);
        writer._readyPromise_reject(reason);
        writer._readyPromise_resolve = void 0;
        writer._readyPromise_reject = void 0;
        writer._readyPromiseState = "rejected";
      }
      function defaultWriterReadyPromiseReset(writer) {
        defaultWriterReadyPromiseInitialize(writer);
      }
      function defaultWriterReadyPromiseResetToRejected(writer, reason) {
        defaultWriterReadyPromiseInitializeAsRejected(writer, reason);
      }
      function defaultWriterReadyPromiseResolve(writer) {
        if (writer._readyPromise_resolve === void 0) {
          return;
        }
        writer._readyPromise_resolve(void 0);
        writer._readyPromise_resolve = void 0;
        writer._readyPromise_reject = void 0;
        writer._readyPromiseState = "fulfilled";
      }
      function getGlobals() {
        if (typeof globalThis !== "undefined") {
          return globalThis;
        } else if (typeof self !== "undefined") {
          return self;
        } else if (typeof global !== "undefined") {
          return global;
        }
        return void 0;
      }
      const globals = getGlobals();
      function isDOMExceptionConstructor(ctor) {
        if (!(typeof ctor === "function" || typeof ctor === "object")) {
          return false;
        }
        if (ctor.name !== "DOMException") {
          return false;
        }
        try {
          new ctor();
          return true;
        } catch (_a2) {
          return false;
        }
      }
      function getFromGlobal() {
        const ctor = globals === null || globals === void 0 ? void 0 : globals.DOMException;
        return isDOMExceptionConstructor(ctor) ? ctor : void 0;
      }
      function createPolyfill() {
        const ctor = function DOMException3(message, name) {
          this.message = message || "";
          this.name = name || "Error";
          if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
          }
        };
        setFunctionName(ctor, "DOMException");
        ctor.prototype = Object.create(Error.prototype);
        Object.defineProperty(ctor.prototype, "constructor", { value: ctor, writable: true, configurable: true });
        return ctor;
      }
      const DOMException2 = getFromGlobal() || createPolyfill();
      function ReadableStreamPipeTo(source, dest, preventClose, preventAbort, preventCancel, signal) {
        const reader = AcquireReadableStreamDefaultReader(source);
        const writer = AcquireWritableStreamDefaultWriter(dest);
        source._disturbed = true;
        let shuttingDown = false;
        let currentWrite = promiseResolvedWith(void 0);
        return newPromise((resolve, reject) => {
          let abortAlgorithm;
          if (signal !== void 0) {
            abortAlgorithm = () => {
              const error = signal.reason !== void 0 ? signal.reason : new DOMException2("Aborted", "AbortError");
              const actions = [];
              if (!preventAbort) {
                actions.push(() => {
                  if (dest._state === "writable") {
                    return WritableStreamAbort(dest, error);
                  }
                  return promiseResolvedWith(void 0);
                });
              }
              if (!preventCancel) {
                actions.push(() => {
                  if (source._state === "readable") {
                    return ReadableStreamCancel(source, error);
                  }
                  return promiseResolvedWith(void 0);
                });
              }
              shutdownWithAction(() => Promise.all(actions.map((action) => action())), true, error);
            };
            if (signal.aborted) {
              abortAlgorithm();
              return;
            }
            signal.addEventListener("abort", abortAlgorithm);
          }
          function pipeLoop() {
            return newPromise((resolveLoop, rejectLoop) => {
              function next(done) {
                if (done) {
                  resolveLoop();
                } else {
                  PerformPromiseThen(pipeStep(), next, rejectLoop);
                }
              }
              next(false);
            });
          }
          function pipeStep() {
            if (shuttingDown) {
              return promiseResolvedWith(true);
            }
            return PerformPromiseThen(writer._readyPromise, () => {
              return newPromise((resolveRead, rejectRead) => {
                ReadableStreamDefaultReaderRead(reader, {
                  _chunkSteps: (chunk) => {
                    currentWrite = PerformPromiseThen(WritableStreamDefaultWriterWrite(writer, chunk), void 0, noop2);
                    resolveRead(false);
                  },
                  _closeSteps: () => resolveRead(true),
                  _errorSteps: rejectRead
                });
              });
            });
          }
          isOrBecomesErrored(source, reader._closedPromise, (storedError) => {
            if (!preventAbort) {
              shutdownWithAction(() => WritableStreamAbort(dest, storedError), true, storedError);
            } else {
              shutdown(true, storedError);
            }
            return null;
          });
          isOrBecomesErrored(dest, writer._closedPromise, (storedError) => {
            if (!preventCancel) {
              shutdownWithAction(() => ReadableStreamCancel(source, storedError), true, storedError);
            } else {
              shutdown(true, storedError);
            }
            return null;
          });
          isOrBecomesClosed(source, reader._closedPromise, () => {
            if (!preventClose) {
              shutdownWithAction(() => WritableStreamDefaultWriterCloseWithErrorPropagation(writer));
            } else {
              shutdown();
            }
            return null;
          });
          if (WritableStreamCloseQueuedOrInFlight(dest) || dest._state === "closed") {
            const destClosed = new TypeError("the destination writable stream closed before all data could be piped to it");
            if (!preventCancel) {
              shutdownWithAction(() => ReadableStreamCancel(source, destClosed), true, destClosed);
            } else {
              shutdown(true, destClosed);
            }
          }
          setPromiseIsHandledToTrue(pipeLoop());
          function waitForWritesToFinish() {
            const oldCurrentWrite = currentWrite;
            return PerformPromiseThen(currentWrite, () => oldCurrentWrite !== currentWrite ? waitForWritesToFinish() : void 0);
          }
          function isOrBecomesErrored(stream, promise, action) {
            if (stream._state === "errored") {
              action(stream._storedError);
            } else {
              uponRejection(promise, action);
            }
          }
          function isOrBecomesClosed(stream, promise, action) {
            if (stream._state === "closed") {
              action();
            } else {
              uponFulfillment(promise, action);
            }
          }
          function shutdownWithAction(action, originalIsError, originalError) {
            if (shuttingDown) {
              return;
            }
            shuttingDown = true;
            if (dest._state === "writable" && !WritableStreamCloseQueuedOrInFlight(dest)) {
              uponFulfillment(waitForWritesToFinish(), doTheRest);
            } else {
              doTheRest();
            }
            function doTheRest() {
              uponPromise(action(), () => finalize(originalIsError, originalError), (newError) => finalize(true, newError));
              return null;
            }
          }
          function shutdown(isError, error) {
            if (shuttingDown) {
              return;
            }
            shuttingDown = true;
            if (dest._state === "writable" && !WritableStreamCloseQueuedOrInFlight(dest)) {
              uponFulfillment(waitForWritesToFinish(), () => finalize(isError, error));
            } else {
              finalize(isError, error);
            }
          }
          function finalize(isError, error) {
            WritableStreamDefaultWriterRelease(writer);
            ReadableStreamReaderGenericRelease(reader);
            if (signal !== void 0) {
              signal.removeEventListener("abort", abortAlgorithm);
            }
            if (isError) {
              reject(error);
            } else {
              resolve(void 0);
            }
            return null;
          }
        });
      }
      class ReadableStreamDefaultController {
        constructor() {
          throw new TypeError("Illegal constructor");
        }
        /**
         * Returns the desired size to fill the controlled stream's internal queue. It can be negative, if the queue is
         * over-full. An underlying source ought to use this information to determine when and how to apply backpressure.
         */
        get desiredSize() {
          if (!IsReadableStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException$1("desiredSize");
          }
          return ReadableStreamDefaultControllerGetDesiredSize(this);
        }
        /**
         * Closes the controlled readable stream. Consumers will still be able to read any previously-enqueued chunks from
         * the stream, but once those are read, the stream will become closed.
         */
        close() {
          if (!IsReadableStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException$1("close");
          }
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(this)) {
            throw new TypeError("The stream is not in a state that permits close");
          }
          ReadableStreamDefaultControllerClose(this);
        }
        enqueue(chunk = void 0) {
          if (!IsReadableStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException$1("enqueue");
          }
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(this)) {
            throw new TypeError("The stream is not in a state that permits enqueue");
          }
          return ReadableStreamDefaultControllerEnqueue(this, chunk);
        }
        /**
         * Errors the controlled readable stream, making all future interactions with it fail with the given error `e`.
         */
        error(e2 = void 0) {
          if (!IsReadableStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException$1("error");
          }
          ReadableStreamDefaultControllerError(this, e2);
        }
        /** @internal */
        [CancelSteps](reason) {
          ResetQueue(this);
          const result = this._cancelAlgorithm(reason);
          ReadableStreamDefaultControllerClearAlgorithms(this);
          return result;
        }
        /** @internal */
        [PullSteps](readRequest) {
          const stream = this._controlledReadableStream;
          if (this._queue.length > 0) {
            const chunk = DequeueValue(this);
            if (this._closeRequested && this._queue.length === 0) {
              ReadableStreamDefaultControllerClearAlgorithms(this);
              ReadableStreamClose(stream);
            } else {
              ReadableStreamDefaultControllerCallPullIfNeeded(this);
            }
            readRequest._chunkSteps(chunk);
          } else {
            ReadableStreamAddReadRequest(stream, readRequest);
            ReadableStreamDefaultControllerCallPullIfNeeded(this);
          }
        }
        /** @internal */
        [ReleaseSteps]() {
        }
      }
      Object.defineProperties(ReadableStreamDefaultController.prototype, {
        close: { enumerable: true },
        enqueue: { enumerable: true },
        error: { enumerable: true },
        desiredSize: { enumerable: true }
      });
      setFunctionName(ReadableStreamDefaultController.prototype.close, "close");
      setFunctionName(ReadableStreamDefaultController.prototype.enqueue, "enqueue");
      setFunctionName(ReadableStreamDefaultController.prototype.error, "error");
      if (typeof Symbol.toStringTag === "symbol") {
        Object.defineProperty(ReadableStreamDefaultController.prototype, Symbol.toStringTag, {
          value: "ReadableStreamDefaultController",
          configurable: true
        });
      }
      function IsReadableStreamDefaultController(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_controlledReadableStream")) {
          return false;
        }
        return x2 instanceof ReadableStreamDefaultController;
      }
      function ReadableStreamDefaultControllerCallPullIfNeeded(controller) {
        const shouldPull = ReadableStreamDefaultControllerShouldCallPull(controller);
        if (!shouldPull) {
          return;
        }
        if (controller._pulling) {
          controller._pullAgain = true;
          return;
        }
        controller._pulling = true;
        const pullPromise = controller._pullAlgorithm();
        uponPromise(pullPromise, () => {
          controller._pulling = false;
          if (controller._pullAgain) {
            controller._pullAgain = false;
            ReadableStreamDefaultControllerCallPullIfNeeded(controller);
          }
          return null;
        }, (e2) => {
          ReadableStreamDefaultControllerError(controller, e2);
          return null;
        });
      }
      function ReadableStreamDefaultControllerShouldCallPull(controller) {
        const stream = controller._controlledReadableStream;
        if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
          return false;
        }
        if (!controller._started) {
          return false;
        }
        if (IsReadableStreamLocked(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
          return true;
        }
        const desiredSize = ReadableStreamDefaultControllerGetDesiredSize(controller);
        if (desiredSize > 0) {
          return true;
        }
        return false;
      }
      function ReadableStreamDefaultControllerClearAlgorithms(controller) {
        controller._pullAlgorithm = void 0;
        controller._cancelAlgorithm = void 0;
        controller._strategySizeAlgorithm = void 0;
      }
      function ReadableStreamDefaultControllerClose(controller) {
        if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
          return;
        }
        const stream = controller._controlledReadableStream;
        controller._closeRequested = true;
        if (controller._queue.length === 0) {
          ReadableStreamDefaultControllerClearAlgorithms(controller);
          ReadableStreamClose(stream);
        }
      }
      function ReadableStreamDefaultControllerEnqueue(controller, chunk) {
        if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
          return;
        }
        const stream = controller._controlledReadableStream;
        if (IsReadableStreamLocked(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
          ReadableStreamFulfillReadRequest(stream, chunk, false);
        } else {
          let chunkSize;
          try {
            chunkSize = controller._strategySizeAlgorithm(chunk);
          } catch (chunkSizeE) {
            ReadableStreamDefaultControllerError(controller, chunkSizeE);
            throw chunkSizeE;
          }
          try {
            EnqueueValueWithSize(controller, chunk, chunkSize);
          } catch (enqueueE) {
            ReadableStreamDefaultControllerError(controller, enqueueE);
            throw enqueueE;
          }
        }
        ReadableStreamDefaultControllerCallPullIfNeeded(controller);
      }
      function ReadableStreamDefaultControllerError(controller, e2) {
        const stream = controller._controlledReadableStream;
        if (stream._state !== "readable") {
          return;
        }
        ResetQueue(controller);
        ReadableStreamDefaultControllerClearAlgorithms(controller);
        ReadableStreamError(stream, e2);
      }
      function ReadableStreamDefaultControllerGetDesiredSize(controller) {
        const state = controller._controlledReadableStream._state;
        if (state === "errored") {
          return null;
        }
        if (state === "closed") {
          return 0;
        }
        return controller._strategyHWM - controller._queueTotalSize;
      }
      function ReadableStreamDefaultControllerHasBackpressure(controller) {
        if (ReadableStreamDefaultControllerShouldCallPull(controller)) {
          return false;
        }
        return true;
      }
      function ReadableStreamDefaultControllerCanCloseOrEnqueue(controller) {
        const state = controller._controlledReadableStream._state;
        if (!controller._closeRequested && state === "readable") {
          return true;
        }
        return false;
      }
      function SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm) {
        controller._controlledReadableStream = stream;
        controller._queue = void 0;
        controller._queueTotalSize = void 0;
        ResetQueue(controller);
        controller._started = false;
        controller._closeRequested = false;
        controller._pullAgain = false;
        controller._pulling = false;
        controller._strategySizeAlgorithm = sizeAlgorithm;
        controller._strategyHWM = highWaterMark;
        controller._pullAlgorithm = pullAlgorithm;
        controller._cancelAlgorithm = cancelAlgorithm;
        stream._readableStreamController = controller;
        const startResult = startAlgorithm();
        uponPromise(promiseResolvedWith(startResult), () => {
          controller._started = true;
          ReadableStreamDefaultControllerCallPullIfNeeded(controller);
          return null;
        }, (r2) => {
          ReadableStreamDefaultControllerError(controller, r2);
          return null;
        });
      }
      function SetUpReadableStreamDefaultControllerFromUnderlyingSource(stream, underlyingSource, highWaterMark, sizeAlgorithm) {
        const controller = Object.create(ReadableStreamDefaultController.prototype);
        let startAlgorithm;
        let pullAlgorithm;
        let cancelAlgorithm;
        if (underlyingSource.start !== void 0) {
          startAlgorithm = () => underlyingSource.start(controller);
        } else {
          startAlgorithm = () => void 0;
        }
        if (underlyingSource.pull !== void 0) {
          pullAlgorithm = () => underlyingSource.pull(controller);
        } else {
          pullAlgorithm = () => promiseResolvedWith(void 0);
        }
        if (underlyingSource.cancel !== void 0) {
          cancelAlgorithm = (reason) => underlyingSource.cancel(reason);
        } else {
          cancelAlgorithm = () => promiseResolvedWith(void 0);
        }
        SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm);
      }
      function defaultControllerBrandCheckException$1(name) {
        return new TypeError(`ReadableStreamDefaultController.prototype.${name} can only be used on a ReadableStreamDefaultController`);
      }
      function ReadableStreamTee(stream, cloneForBranch2) {
        if (IsReadableByteStreamController(stream._readableStreamController)) {
          return ReadableByteStreamTee(stream);
        }
        return ReadableStreamDefaultTee(stream);
      }
      function ReadableStreamDefaultTee(stream, cloneForBranch2) {
        const reader = AcquireReadableStreamDefaultReader(stream);
        let reading = false;
        let readAgain = false;
        let canceled1 = false;
        let canceled2 = false;
        let reason1;
        let reason2;
        let branch1;
        let branch2;
        let resolveCancelPromise;
        const cancelPromise = newPromise((resolve) => {
          resolveCancelPromise = resolve;
        });
        function pullAlgorithm() {
          if (reading) {
            readAgain = true;
            return promiseResolvedWith(void 0);
          }
          reading = true;
          const readRequest = {
            _chunkSteps: (chunk) => {
              _queueMicrotask(() => {
                readAgain = false;
                const chunk1 = chunk;
                const chunk2 = chunk;
                if (!canceled1) {
                  ReadableStreamDefaultControllerEnqueue(branch1._readableStreamController, chunk1);
                }
                if (!canceled2) {
                  ReadableStreamDefaultControllerEnqueue(branch2._readableStreamController, chunk2);
                }
                reading = false;
                if (readAgain) {
                  pullAlgorithm();
                }
              });
            },
            _closeSteps: () => {
              reading = false;
              if (!canceled1) {
                ReadableStreamDefaultControllerClose(branch1._readableStreamController);
              }
              if (!canceled2) {
                ReadableStreamDefaultControllerClose(branch2._readableStreamController);
              }
              if (!canceled1 || !canceled2) {
                resolveCancelPromise(void 0);
              }
            },
            _errorSteps: () => {
              reading = false;
            }
          };
          ReadableStreamDefaultReaderRead(reader, readRequest);
          return promiseResolvedWith(void 0);
        }
        function cancel1Algorithm(reason) {
          canceled1 = true;
          reason1 = reason;
          if (canceled2) {
            const compositeReason = CreateArrayFromList([reason1, reason2]);
            const cancelResult = ReadableStreamCancel(stream, compositeReason);
            resolveCancelPromise(cancelResult);
          }
          return cancelPromise;
        }
        function cancel2Algorithm(reason) {
          canceled2 = true;
          reason2 = reason;
          if (canceled1) {
            const compositeReason = CreateArrayFromList([reason1, reason2]);
            const cancelResult = ReadableStreamCancel(stream, compositeReason);
            resolveCancelPromise(cancelResult);
          }
          return cancelPromise;
        }
        function startAlgorithm() {
        }
        branch1 = CreateReadableStream(startAlgorithm, pullAlgorithm, cancel1Algorithm);
        branch2 = CreateReadableStream(startAlgorithm, pullAlgorithm, cancel2Algorithm);
        uponRejection(reader._closedPromise, (r2) => {
          ReadableStreamDefaultControllerError(branch1._readableStreamController, r2);
          ReadableStreamDefaultControllerError(branch2._readableStreamController, r2);
          if (!canceled1 || !canceled2) {
            resolveCancelPromise(void 0);
          }
          return null;
        });
        return [branch1, branch2];
      }
      function ReadableByteStreamTee(stream) {
        let reader = AcquireReadableStreamDefaultReader(stream);
        let reading = false;
        let readAgainForBranch1 = false;
        let readAgainForBranch2 = false;
        let canceled1 = false;
        let canceled2 = false;
        let reason1;
        let reason2;
        let branch1;
        let branch2;
        let resolveCancelPromise;
        const cancelPromise = newPromise((resolve) => {
          resolveCancelPromise = resolve;
        });
        function forwardReaderError(thisReader) {
          uponRejection(thisReader._closedPromise, (r2) => {
            if (thisReader !== reader) {
              return null;
            }
            ReadableByteStreamControllerError(branch1._readableStreamController, r2);
            ReadableByteStreamControllerError(branch2._readableStreamController, r2);
            if (!canceled1 || !canceled2) {
              resolveCancelPromise(void 0);
            }
            return null;
          });
        }
        function pullWithDefaultReader() {
          if (IsReadableStreamBYOBReader(reader)) {
            ReadableStreamReaderGenericRelease(reader);
            reader = AcquireReadableStreamDefaultReader(stream);
            forwardReaderError(reader);
          }
          const readRequest = {
            _chunkSteps: (chunk) => {
              _queueMicrotask(() => {
                readAgainForBranch1 = false;
                readAgainForBranch2 = false;
                const chunk1 = chunk;
                let chunk2 = chunk;
                if (!canceled1 && !canceled2) {
                  try {
                    chunk2 = CloneAsUint8Array(chunk);
                  } catch (cloneE) {
                    ReadableByteStreamControllerError(branch1._readableStreamController, cloneE);
                    ReadableByteStreamControllerError(branch2._readableStreamController, cloneE);
                    resolveCancelPromise(ReadableStreamCancel(stream, cloneE));
                    return;
                  }
                }
                if (!canceled1) {
                  ReadableByteStreamControllerEnqueue(branch1._readableStreamController, chunk1);
                }
                if (!canceled2) {
                  ReadableByteStreamControllerEnqueue(branch2._readableStreamController, chunk2);
                }
                reading = false;
                if (readAgainForBranch1) {
                  pull1Algorithm();
                } else if (readAgainForBranch2) {
                  pull2Algorithm();
                }
              });
            },
            _closeSteps: () => {
              reading = false;
              if (!canceled1) {
                ReadableByteStreamControllerClose(branch1._readableStreamController);
              }
              if (!canceled2) {
                ReadableByteStreamControllerClose(branch2._readableStreamController);
              }
              if (branch1._readableStreamController._pendingPullIntos.length > 0) {
                ReadableByteStreamControllerRespond(branch1._readableStreamController, 0);
              }
              if (branch2._readableStreamController._pendingPullIntos.length > 0) {
                ReadableByteStreamControllerRespond(branch2._readableStreamController, 0);
              }
              if (!canceled1 || !canceled2) {
                resolveCancelPromise(void 0);
              }
            },
            _errorSteps: () => {
              reading = false;
            }
          };
          ReadableStreamDefaultReaderRead(reader, readRequest);
        }
        function pullWithBYOBReader(view, forBranch2) {
          if (IsReadableStreamDefaultReader(reader)) {
            ReadableStreamReaderGenericRelease(reader);
            reader = AcquireReadableStreamBYOBReader(stream);
            forwardReaderError(reader);
          }
          const byobBranch = forBranch2 ? branch2 : branch1;
          const otherBranch = forBranch2 ? branch1 : branch2;
          const readIntoRequest = {
            _chunkSteps: (chunk) => {
              _queueMicrotask(() => {
                readAgainForBranch1 = false;
                readAgainForBranch2 = false;
                const byobCanceled = forBranch2 ? canceled2 : canceled1;
                const otherCanceled = forBranch2 ? canceled1 : canceled2;
                if (!otherCanceled) {
                  let clonedChunk;
                  try {
                    clonedChunk = CloneAsUint8Array(chunk);
                  } catch (cloneE) {
                    ReadableByteStreamControllerError(byobBranch._readableStreamController, cloneE);
                    ReadableByteStreamControllerError(otherBranch._readableStreamController, cloneE);
                    resolveCancelPromise(ReadableStreamCancel(stream, cloneE));
                    return;
                  }
                  if (!byobCanceled) {
                    ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                  }
                  ReadableByteStreamControllerEnqueue(otherBranch._readableStreamController, clonedChunk);
                } else if (!byobCanceled) {
                  ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                }
                reading = false;
                if (readAgainForBranch1) {
                  pull1Algorithm();
                } else if (readAgainForBranch2) {
                  pull2Algorithm();
                }
              });
            },
            _closeSteps: (chunk) => {
              reading = false;
              const byobCanceled = forBranch2 ? canceled2 : canceled1;
              const otherCanceled = forBranch2 ? canceled1 : canceled2;
              if (!byobCanceled) {
                ReadableByteStreamControllerClose(byobBranch._readableStreamController);
              }
              if (!otherCanceled) {
                ReadableByteStreamControllerClose(otherBranch._readableStreamController);
              }
              if (chunk !== void 0) {
                if (!byobCanceled) {
                  ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                }
                if (!otherCanceled && otherBranch._readableStreamController._pendingPullIntos.length > 0) {
                  ReadableByteStreamControllerRespond(otherBranch._readableStreamController, 0);
                }
              }
              if (!byobCanceled || !otherCanceled) {
                resolveCancelPromise(void 0);
              }
            },
            _errorSteps: () => {
              reading = false;
            }
          };
          ReadableStreamBYOBReaderRead(reader, view, 1, readIntoRequest);
        }
        function pull1Algorithm() {
          if (reading) {
            readAgainForBranch1 = true;
            return promiseResolvedWith(void 0);
          }
          reading = true;
          const byobRequest = ReadableByteStreamControllerGetBYOBRequest(branch1._readableStreamController);
          if (byobRequest === null) {
            pullWithDefaultReader();
          } else {
            pullWithBYOBReader(byobRequest._view, false);
          }
          return promiseResolvedWith(void 0);
        }
        function pull2Algorithm() {
          if (reading) {
            readAgainForBranch2 = true;
            return promiseResolvedWith(void 0);
          }
          reading = true;
          const byobRequest = ReadableByteStreamControllerGetBYOBRequest(branch2._readableStreamController);
          if (byobRequest === null) {
            pullWithDefaultReader();
          } else {
            pullWithBYOBReader(byobRequest._view, true);
          }
          return promiseResolvedWith(void 0);
        }
        function cancel1Algorithm(reason) {
          canceled1 = true;
          reason1 = reason;
          if (canceled2) {
            const compositeReason = CreateArrayFromList([reason1, reason2]);
            const cancelResult = ReadableStreamCancel(stream, compositeReason);
            resolveCancelPromise(cancelResult);
          }
          return cancelPromise;
        }
        function cancel2Algorithm(reason) {
          canceled2 = true;
          reason2 = reason;
          if (canceled1) {
            const compositeReason = CreateArrayFromList([reason1, reason2]);
            const cancelResult = ReadableStreamCancel(stream, compositeReason);
            resolveCancelPromise(cancelResult);
          }
          return cancelPromise;
        }
        function startAlgorithm() {
          return;
        }
        branch1 = CreateReadableByteStream(startAlgorithm, pull1Algorithm, cancel1Algorithm);
        branch2 = CreateReadableByteStream(startAlgorithm, pull2Algorithm, cancel2Algorithm);
        forwardReaderError(reader);
        return [branch1, branch2];
      }
      function isReadableStreamLike(stream) {
        return typeIsObject(stream) && typeof stream.getReader !== "undefined";
      }
      function ReadableStreamFrom(source) {
        if (isReadableStreamLike(source)) {
          return ReadableStreamFromDefaultReader(source.getReader());
        }
        return ReadableStreamFromIterable(source);
      }
      function ReadableStreamFromIterable(asyncIterable) {
        let stream;
        const iteratorRecord = GetIterator(asyncIterable, "async");
        const startAlgorithm = noop2;
        function pullAlgorithm() {
          let nextResult;
          try {
            nextResult = IteratorNext(iteratorRecord);
          } catch (e2) {
            return promiseRejectedWith(e2);
          }
          const nextPromise = promiseResolvedWith(nextResult);
          return transformPromiseWith(nextPromise, (iterResult) => {
            if (!typeIsObject(iterResult)) {
              throw new TypeError("The promise returned by the iterator.next() method must fulfill with an object");
            }
            const done = IteratorComplete(iterResult);
            if (done) {
              ReadableStreamDefaultControllerClose(stream._readableStreamController);
            } else {
              const value = IteratorValue(iterResult);
              ReadableStreamDefaultControllerEnqueue(stream._readableStreamController, value);
            }
          });
        }
        function cancelAlgorithm(reason) {
          const iterator = iteratorRecord.iterator;
          let returnMethod;
          try {
            returnMethod = GetMethod(iterator, "return");
          } catch (e2) {
            return promiseRejectedWith(e2);
          }
          if (returnMethod === void 0) {
            return promiseResolvedWith(void 0);
          }
          let returnResult;
          try {
            returnResult = reflectCall(returnMethod, iterator, [reason]);
          } catch (e2) {
            return promiseRejectedWith(e2);
          }
          const returnPromise = promiseResolvedWith(returnResult);
          return transformPromiseWith(returnPromise, (iterResult) => {
            if (!typeIsObject(iterResult)) {
              throw new TypeError("The promise returned by the iterator.return() method must fulfill with an object");
            }
            return void 0;
          });
        }
        stream = CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, 0);
        return stream;
      }
      function ReadableStreamFromDefaultReader(reader) {
        let stream;
        const startAlgorithm = noop2;
        function pullAlgorithm() {
          let readPromise;
          try {
            readPromise = reader.read();
          } catch (e2) {
            return promiseRejectedWith(e2);
          }
          return transformPromiseWith(readPromise, (readResult) => {
            if (!typeIsObject(readResult)) {
              throw new TypeError("The promise returned by the reader.read() method must fulfill with an object");
            }
            if (readResult.done) {
              ReadableStreamDefaultControllerClose(stream._readableStreamController);
            } else {
              const value = readResult.value;
              ReadableStreamDefaultControllerEnqueue(stream._readableStreamController, value);
            }
          });
        }
        function cancelAlgorithm(reason) {
          try {
            return promiseResolvedWith(reader.cancel(reason));
          } catch (e2) {
            return promiseRejectedWith(e2);
          }
        }
        stream = CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, 0);
        return stream;
      }
      function convertUnderlyingDefaultOrByteSource(source, context) {
        assertDictionary(source, context);
        const original = source;
        const autoAllocateChunkSize = original === null || original === void 0 ? void 0 : original.autoAllocateChunkSize;
        const cancel = original === null || original === void 0 ? void 0 : original.cancel;
        const pull = original === null || original === void 0 ? void 0 : original.pull;
        const start = original === null || original === void 0 ? void 0 : original.start;
        const type = original === null || original === void 0 ? void 0 : original.type;
        return {
          autoAllocateChunkSize: autoAllocateChunkSize === void 0 ? void 0 : convertUnsignedLongLongWithEnforceRange(autoAllocateChunkSize, `${context} has member 'autoAllocateChunkSize' that`),
          cancel: cancel === void 0 ? void 0 : convertUnderlyingSourceCancelCallback(cancel, original, `${context} has member 'cancel' that`),
          pull: pull === void 0 ? void 0 : convertUnderlyingSourcePullCallback(pull, original, `${context} has member 'pull' that`),
          start: start === void 0 ? void 0 : convertUnderlyingSourceStartCallback(start, original, `${context} has member 'start' that`),
          type: type === void 0 ? void 0 : convertReadableStreamType(type, `${context} has member 'type' that`)
        };
      }
      function convertUnderlyingSourceCancelCallback(fn, original, context) {
        assertFunction(fn, context);
        return (reason) => promiseCall(fn, original, [reason]);
      }
      function convertUnderlyingSourcePullCallback(fn, original, context) {
        assertFunction(fn, context);
        return (controller) => promiseCall(fn, original, [controller]);
      }
      function convertUnderlyingSourceStartCallback(fn, original, context) {
        assertFunction(fn, context);
        return (controller) => reflectCall(fn, original, [controller]);
      }
      function convertReadableStreamType(type, context) {
        type = `${type}`;
        if (type !== "bytes") {
          throw new TypeError(`${context} '${type}' is not a valid enumeration value for ReadableStreamType`);
        }
        return type;
      }
      function convertIteratorOptions(options, context) {
        assertDictionary(options, context);
        const preventCancel = options === null || options === void 0 ? void 0 : options.preventCancel;
        return { preventCancel: Boolean(preventCancel) };
      }
      function convertPipeOptions(options, context) {
        assertDictionary(options, context);
        const preventAbort = options === null || options === void 0 ? void 0 : options.preventAbort;
        const preventCancel = options === null || options === void 0 ? void 0 : options.preventCancel;
        const preventClose = options === null || options === void 0 ? void 0 : options.preventClose;
        const signal = options === null || options === void 0 ? void 0 : options.signal;
        if (signal !== void 0) {
          assertAbortSignal(signal, `${context} has member 'signal' that`);
        }
        return {
          preventAbort: Boolean(preventAbort),
          preventCancel: Boolean(preventCancel),
          preventClose: Boolean(preventClose),
          signal
        };
      }
      function assertAbortSignal(signal, context) {
        if (!isAbortSignal2(signal)) {
          throw new TypeError(`${context} is not an AbortSignal.`);
        }
      }
      function convertReadableWritablePair(pair, context) {
        assertDictionary(pair, context);
        const readable = pair === null || pair === void 0 ? void 0 : pair.readable;
        assertRequiredField(readable, "readable", "ReadableWritablePair");
        assertReadableStream(readable, `${context} has member 'readable' that`);
        const writable = pair === null || pair === void 0 ? void 0 : pair.writable;
        assertRequiredField(writable, "writable", "ReadableWritablePair");
        assertWritableStream(writable, `${context} has member 'writable' that`);
        return { readable, writable };
      }
      class ReadableStream2 {
        constructor(rawUnderlyingSource = {}, rawStrategy = {}) {
          if (rawUnderlyingSource === void 0) {
            rawUnderlyingSource = null;
          } else {
            assertObject(rawUnderlyingSource, "First parameter");
          }
          const strategy = convertQueuingStrategy(rawStrategy, "Second parameter");
          const underlyingSource = convertUnderlyingDefaultOrByteSource(rawUnderlyingSource, "First parameter");
          InitializeReadableStream(this);
          if (underlyingSource.type === "bytes") {
            if (strategy.size !== void 0) {
              throw new RangeError("The strategy for a byte stream cannot have a size function");
            }
            const highWaterMark = ExtractHighWaterMark(strategy, 0);
            SetUpReadableByteStreamControllerFromUnderlyingSource(this, underlyingSource, highWaterMark);
          } else {
            const sizeAlgorithm = ExtractSizeAlgorithm(strategy);
            const highWaterMark = ExtractHighWaterMark(strategy, 1);
            SetUpReadableStreamDefaultControllerFromUnderlyingSource(this, underlyingSource, highWaterMark, sizeAlgorithm);
          }
        }
        /**
         * Whether or not the readable stream is locked to a {@link ReadableStreamDefaultReader | reader}.
         */
        get locked() {
          if (!IsReadableStream(this)) {
            throw streamBrandCheckException$1("locked");
          }
          return IsReadableStreamLocked(this);
        }
        /**
         * Cancels the stream, signaling a loss of interest in the stream by a consumer.
         *
         * The supplied `reason` argument will be given to the underlying source's {@link UnderlyingSource.cancel | cancel()}
         * method, which might or might not use it.
         */
        cancel(reason = void 0) {
          if (!IsReadableStream(this)) {
            return promiseRejectedWith(streamBrandCheckException$1("cancel"));
          }
          if (IsReadableStreamLocked(this)) {
            return promiseRejectedWith(new TypeError("Cannot cancel a stream that already has a reader"));
          }
          return ReadableStreamCancel(this, reason);
        }
        getReader(rawOptions = void 0) {
          if (!IsReadableStream(this)) {
            throw streamBrandCheckException$1("getReader");
          }
          const options = convertReaderOptions(rawOptions, "First parameter");
          if (options.mode === void 0) {
            return AcquireReadableStreamDefaultReader(this);
          }
          return AcquireReadableStreamBYOBReader(this);
        }
        pipeThrough(rawTransform, rawOptions = {}) {
          if (!IsReadableStream(this)) {
            throw streamBrandCheckException$1("pipeThrough");
          }
          assertRequiredArgument(rawTransform, 1, "pipeThrough");
          const transform = convertReadableWritablePair(rawTransform, "First parameter");
          const options = convertPipeOptions(rawOptions, "Second parameter");
          if (IsReadableStreamLocked(this)) {
            throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked ReadableStream");
          }
          if (IsWritableStreamLocked(transform.writable)) {
            throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked WritableStream");
          }
          const promise = ReadableStreamPipeTo(this, transform.writable, options.preventClose, options.preventAbort, options.preventCancel, options.signal);
          setPromiseIsHandledToTrue(promise);
          return transform.readable;
        }
        pipeTo(destination, rawOptions = {}) {
          if (!IsReadableStream(this)) {
            return promiseRejectedWith(streamBrandCheckException$1("pipeTo"));
          }
          if (destination === void 0) {
            return promiseRejectedWith(`Parameter 1 is required in 'pipeTo'.`);
          }
          if (!IsWritableStream(destination)) {
            return promiseRejectedWith(new TypeError(`ReadableStream.prototype.pipeTo's first argument must be a WritableStream`));
          }
          let options;
          try {
            options = convertPipeOptions(rawOptions, "Second parameter");
          } catch (e2) {
            return promiseRejectedWith(e2);
          }
          if (IsReadableStreamLocked(this)) {
            return promiseRejectedWith(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked ReadableStream"));
          }
          if (IsWritableStreamLocked(destination)) {
            return promiseRejectedWith(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked WritableStream"));
          }
          return ReadableStreamPipeTo(this, destination, options.preventClose, options.preventAbort, options.preventCancel, options.signal);
        }
        /**
         * Tees this readable stream, returning a two-element array containing the two resulting branches as
         * new {@link ReadableStream} instances.
         *
         * Teeing a stream will lock it, preventing any other consumer from acquiring a reader.
         * To cancel the stream, cancel both of the resulting branches; a composite cancellation reason will then be
         * propagated to the stream's underlying source.
         *
         * Note that the chunks seen in each branch will be the same object. If the chunks are not immutable,
         * this could allow interference between the two branches.
         */
        tee() {
          if (!IsReadableStream(this)) {
            throw streamBrandCheckException$1("tee");
          }
          const branches = ReadableStreamTee(this);
          return CreateArrayFromList(branches);
        }
        values(rawOptions = void 0) {
          if (!IsReadableStream(this)) {
            throw streamBrandCheckException$1("values");
          }
          const options = convertIteratorOptions(rawOptions, "First parameter");
          return AcquireReadableStreamAsyncIterator(this, options.preventCancel);
        }
        [SymbolAsyncIterator](options) {
          return this.values(options);
        }
        /**
         * Creates a new ReadableStream wrapping the provided iterable or async iterable.
         *
         * This can be used to adapt various kinds of objects into a readable stream,
         * such as an array, an async generator, or a Node.js readable stream.
         */
        static from(asyncIterable) {
          return ReadableStreamFrom(asyncIterable);
        }
      }
      Object.defineProperties(ReadableStream2, {
        from: { enumerable: true }
      });
      Object.defineProperties(ReadableStream2.prototype, {
        cancel: { enumerable: true },
        getReader: { enumerable: true },
        pipeThrough: { enumerable: true },
        pipeTo: { enumerable: true },
        tee: { enumerable: true },
        values: { enumerable: true },
        locked: { enumerable: true }
      });
      setFunctionName(ReadableStream2.from, "from");
      setFunctionName(ReadableStream2.prototype.cancel, "cancel");
      setFunctionName(ReadableStream2.prototype.getReader, "getReader");
      setFunctionName(ReadableStream2.prototype.pipeThrough, "pipeThrough");
      setFunctionName(ReadableStream2.prototype.pipeTo, "pipeTo");
      setFunctionName(ReadableStream2.prototype.tee, "tee");
      setFunctionName(ReadableStream2.prototype.values, "values");
      if (typeof Symbol.toStringTag === "symbol") {
        Object.defineProperty(ReadableStream2.prototype, Symbol.toStringTag, {
          value: "ReadableStream",
          configurable: true
        });
      }
      Object.defineProperty(ReadableStream2.prototype, SymbolAsyncIterator, {
        value: ReadableStream2.prototype.values,
        writable: true,
        configurable: true
      });
      function CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark = 1, sizeAlgorithm = () => 1) {
        const stream = Object.create(ReadableStream2.prototype);
        InitializeReadableStream(stream);
        const controller = Object.create(ReadableStreamDefaultController.prototype);
        SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm);
        return stream;
      }
      function CreateReadableByteStream(startAlgorithm, pullAlgorithm, cancelAlgorithm) {
        const stream = Object.create(ReadableStream2.prototype);
        InitializeReadableStream(stream);
        const controller = Object.create(ReadableByteStreamController.prototype);
        SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, 0, void 0);
        return stream;
      }
      function InitializeReadableStream(stream) {
        stream._state = "readable";
        stream._reader = void 0;
        stream._storedError = void 0;
        stream._disturbed = false;
      }
      function IsReadableStream(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_readableStreamController")) {
          return false;
        }
        return x2 instanceof ReadableStream2;
      }
      function IsReadableStreamLocked(stream) {
        if (stream._reader === void 0) {
          return false;
        }
        return true;
      }
      function ReadableStreamCancel(stream, reason) {
        stream._disturbed = true;
        if (stream._state === "closed") {
          return promiseResolvedWith(void 0);
        }
        if (stream._state === "errored") {
          return promiseRejectedWith(stream._storedError);
        }
        ReadableStreamClose(stream);
        const reader = stream._reader;
        if (reader !== void 0 && IsReadableStreamBYOBReader(reader)) {
          const readIntoRequests = reader._readIntoRequests;
          reader._readIntoRequests = new SimpleQueue();
          readIntoRequests.forEach((readIntoRequest) => {
            readIntoRequest._closeSteps(void 0);
          });
        }
        const sourceCancelPromise = stream._readableStreamController[CancelSteps](reason);
        return transformPromiseWith(sourceCancelPromise, noop2);
      }
      function ReadableStreamClose(stream) {
        stream._state = "closed";
        const reader = stream._reader;
        if (reader === void 0) {
          return;
        }
        defaultReaderClosedPromiseResolve(reader);
        if (IsReadableStreamDefaultReader(reader)) {
          const readRequests = reader._readRequests;
          reader._readRequests = new SimpleQueue();
          readRequests.forEach((readRequest) => {
            readRequest._closeSteps();
          });
        }
      }
      function ReadableStreamError(stream, e2) {
        stream._state = "errored";
        stream._storedError = e2;
        const reader = stream._reader;
        if (reader === void 0) {
          return;
        }
        defaultReaderClosedPromiseReject(reader, e2);
        if (IsReadableStreamDefaultReader(reader)) {
          ReadableStreamDefaultReaderErrorReadRequests(reader, e2);
        } else {
          ReadableStreamBYOBReaderErrorReadIntoRequests(reader, e2);
        }
      }
      function streamBrandCheckException$1(name) {
        return new TypeError(`ReadableStream.prototype.${name} can only be used on a ReadableStream`);
      }
      function convertQueuingStrategyInit(init, context) {
        assertDictionary(init, context);
        const highWaterMark = init === null || init === void 0 ? void 0 : init.highWaterMark;
        assertRequiredField(highWaterMark, "highWaterMark", "QueuingStrategyInit");
        return {
          highWaterMark: convertUnrestrictedDouble(highWaterMark)
        };
      }
      const byteLengthSizeFunction = (chunk) => {
        return chunk.byteLength;
      };
      setFunctionName(byteLengthSizeFunction, "size");
      class ByteLengthQueuingStrategy {
        constructor(options) {
          assertRequiredArgument(options, 1, "ByteLengthQueuingStrategy");
          options = convertQueuingStrategyInit(options, "First parameter");
          this._byteLengthQueuingStrategyHighWaterMark = options.highWaterMark;
        }
        /**
         * Returns the high water mark provided to the constructor.
         */
        get highWaterMark() {
          if (!IsByteLengthQueuingStrategy(this)) {
            throw byteLengthBrandCheckException("highWaterMark");
          }
          return this._byteLengthQueuingStrategyHighWaterMark;
        }
        /**
         * Measures the size of `chunk` by returning the value of its `byteLength` property.
         */
        get size() {
          if (!IsByteLengthQueuingStrategy(this)) {
            throw byteLengthBrandCheckException("size");
          }
          return byteLengthSizeFunction;
        }
      }
      Object.defineProperties(ByteLengthQueuingStrategy.prototype, {
        highWaterMark: { enumerable: true },
        size: { enumerable: true }
      });
      if (typeof Symbol.toStringTag === "symbol") {
        Object.defineProperty(ByteLengthQueuingStrategy.prototype, Symbol.toStringTag, {
          value: "ByteLengthQueuingStrategy",
          configurable: true
        });
      }
      function byteLengthBrandCheckException(name) {
        return new TypeError(`ByteLengthQueuingStrategy.prototype.${name} can only be used on a ByteLengthQueuingStrategy`);
      }
      function IsByteLengthQueuingStrategy(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_byteLengthQueuingStrategyHighWaterMark")) {
          return false;
        }
        return x2 instanceof ByteLengthQueuingStrategy;
      }
      const countSizeFunction = () => {
        return 1;
      };
      setFunctionName(countSizeFunction, "size");
      class CountQueuingStrategy {
        constructor(options) {
          assertRequiredArgument(options, 1, "CountQueuingStrategy");
          options = convertQueuingStrategyInit(options, "First parameter");
          this._countQueuingStrategyHighWaterMark = options.highWaterMark;
        }
        /**
         * Returns the high water mark provided to the constructor.
         */
        get highWaterMark() {
          if (!IsCountQueuingStrategy(this)) {
            throw countBrandCheckException("highWaterMark");
          }
          return this._countQueuingStrategyHighWaterMark;
        }
        /**
         * Measures the size of `chunk` by always returning 1.
         * This ensures that the total queue size is a count of the number of chunks in the queue.
         */
        get size() {
          if (!IsCountQueuingStrategy(this)) {
            throw countBrandCheckException("size");
          }
          return countSizeFunction;
        }
      }
      Object.defineProperties(CountQueuingStrategy.prototype, {
        highWaterMark: { enumerable: true },
        size: { enumerable: true }
      });
      if (typeof Symbol.toStringTag === "symbol") {
        Object.defineProperty(CountQueuingStrategy.prototype, Symbol.toStringTag, {
          value: "CountQueuingStrategy",
          configurable: true
        });
      }
      function countBrandCheckException(name) {
        return new TypeError(`CountQueuingStrategy.prototype.${name} can only be used on a CountQueuingStrategy`);
      }
      function IsCountQueuingStrategy(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_countQueuingStrategyHighWaterMark")) {
          return false;
        }
        return x2 instanceof CountQueuingStrategy;
      }
      function convertTransformer(original, context) {
        assertDictionary(original, context);
        const cancel = original === null || original === void 0 ? void 0 : original.cancel;
        const flush = original === null || original === void 0 ? void 0 : original.flush;
        const readableType = original === null || original === void 0 ? void 0 : original.readableType;
        const start = original === null || original === void 0 ? void 0 : original.start;
        const transform = original === null || original === void 0 ? void 0 : original.transform;
        const writableType = original === null || original === void 0 ? void 0 : original.writableType;
        return {
          cancel: cancel === void 0 ? void 0 : convertTransformerCancelCallback(cancel, original, `${context} has member 'cancel' that`),
          flush: flush === void 0 ? void 0 : convertTransformerFlushCallback(flush, original, `${context} has member 'flush' that`),
          readableType,
          start: start === void 0 ? void 0 : convertTransformerStartCallback(start, original, `${context} has member 'start' that`),
          transform: transform === void 0 ? void 0 : convertTransformerTransformCallback(transform, original, `${context} has member 'transform' that`),
          writableType
        };
      }
      function convertTransformerFlushCallback(fn, original, context) {
        assertFunction(fn, context);
        return (controller) => promiseCall(fn, original, [controller]);
      }
      function convertTransformerStartCallback(fn, original, context) {
        assertFunction(fn, context);
        return (controller) => reflectCall(fn, original, [controller]);
      }
      function convertTransformerTransformCallback(fn, original, context) {
        assertFunction(fn, context);
        return (chunk, controller) => promiseCall(fn, original, [chunk, controller]);
      }
      function convertTransformerCancelCallback(fn, original, context) {
        assertFunction(fn, context);
        return (reason) => promiseCall(fn, original, [reason]);
      }
      class TransformStream {
        constructor(rawTransformer = {}, rawWritableStrategy = {}, rawReadableStrategy = {}) {
          if (rawTransformer === void 0) {
            rawTransformer = null;
          }
          const writableStrategy = convertQueuingStrategy(rawWritableStrategy, "Second parameter");
          const readableStrategy = convertQueuingStrategy(rawReadableStrategy, "Third parameter");
          const transformer = convertTransformer(rawTransformer, "First parameter");
          if (transformer.readableType !== void 0) {
            throw new RangeError("Invalid readableType specified");
          }
          if (transformer.writableType !== void 0) {
            throw new RangeError("Invalid writableType specified");
          }
          const readableHighWaterMark = ExtractHighWaterMark(readableStrategy, 0);
          const readableSizeAlgorithm = ExtractSizeAlgorithm(readableStrategy);
          const writableHighWaterMark = ExtractHighWaterMark(writableStrategy, 1);
          const writableSizeAlgorithm = ExtractSizeAlgorithm(writableStrategy);
          let startPromise_resolve;
          const startPromise = newPromise((resolve) => {
            startPromise_resolve = resolve;
          });
          InitializeTransformStream(this, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm);
          SetUpTransformStreamDefaultControllerFromTransformer(this, transformer);
          if (transformer.start !== void 0) {
            startPromise_resolve(transformer.start(this._transformStreamController));
          } else {
            startPromise_resolve(void 0);
          }
        }
        /**
         * The readable side of the transform stream.
         */
        get readable() {
          if (!IsTransformStream(this)) {
            throw streamBrandCheckException("readable");
          }
          return this._readable;
        }
        /**
         * The writable side of the transform stream.
         */
        get writable() {
          if (!IsTransformStream(this)) {
            throw streamBrandCheckException("writable");
          }
          return this._writable;
        }
      }
      Object.defineProperties(TransformStream.prototype, {
        readable: { enumerable: true },
        writable: { enumerable: true }
      });
      if (typeof Symbol.toStringTag === "symbol") {
        Object.defineProperty(TransformStream.prototype, Symbol.toStringTag, {
          value: "TransformStream",
          configurable: true
        });
      }
      function InitializeTransformStream(stream, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm) {
        function startAlgorithm() {
          return startPromise;
        }
        function writeAlgorithm(chunk) {
          return TransformStreamDefaultSinkWriteAlgorithm(stream, chunk);
        }
        function abortAlgorithm(reason) {
          return TransformStreamDefaultSinkAbortAlgorithm(stream, reason);
        }
        function closeAlgorithm() {
          return TransformStreamDefaultSinkCloseAlgorithm(stream);
        }
        stream._writable = CreateWritableStream(startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, writableHighWaterMark, writableSizeAlgorithm);
        function pullAlgorithm() {
          return TransformStreamDefaultSourcePullAlgorithm(stream);
        }
        function cancelAlgorithm(reason) {
          return TransformStreamDefaultSourceCancelAlgorithm(stream, reason);
        }
        stream._readable = CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, readableHighWaterMark, readableSizeAlgorithm);
        stream._backpressure = void 0;
        stream._backpressureChangePromise = void 0;
        stream._backpressureChangePromise_resolve = void 0;
        TransformStreamSetBackpressure(stream, true);
        stream._transformStreamController = void 0;
      }
      function IsTransformStream(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_transformStreamController")) {
          return false;
        }
        return x2 instanceof TransformStream;
      }
      function TransformStreamError(stream, e2) {
        ReadableStreamDefaultControllerError(stream._readable._readableStreamController, e2);
        TransformStreamErrorWritableAndUnblockWrite(stream, e2);
      }
      function TransformStreamErrorWritableAndUnblockWrite(stream, e2) {
        TransformStreamDefaultControllerClearAlgorithms(stream._transformStreamController);
        WritableStreamDefaultControllerErrorIfNeeded(stream._writable._writableStreamController, e2);
        TransformStreamUnblockWrite(stream);
      }
      function TransformStreamUnblockWrite(stream) {
        if (stream._backpressure) {
          TransformStreamSetBackpressure(stream, false);
        }
      }
      function TransformStreamSetBackpressure(stream, backpressure) {
        if (stream._backpressureChangePromise !== void 0) {
          stream._backpressureChangePromise_resolve();
        }
        stream._backpressureChangePromise = newPromise((resolve) => {
          stream._backpressureChangePromise_resolve = resolve;
        });
        stream._backpressure = backpressure;
      }
      class TransformStreamDefaultController {
        constructor() {
          throw new TypeError("Illegal constructor");
        }
        /**
         * Returns the desired size to fill the readable side’s internal queue. It can be negative, if the queue is over-full.
         */
        get desiredSize() {
          if (!IsTransformStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException("desiredSize");
          }
          const readableController = this._controlledTransformStream._readable._readableStreamController;
          return ReadableStreamDefaultControllerGetDesiredSize(readableController);
        }
        enqueue(chunk = void 0) {
          if (!IsTransformStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException("enqueue");
          }
          TransformStreamDefaultControllerEnqueue(this, chunk);
        }
        /**
         * Errors both the readable side and the writable side of the controlled transform stream, making all future
         * interactions with it fail with the given error `e`. Any chunks queued for transformation will be discarded.
         */
        error(reason = void 0) {
          if (!IsTransformStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException("error");
          }
          TransformStreamDefaultControllerError(this, reason);
        }
        /**
         * Closes the readable side and errors the writable side of the controlled transform stream. This is useful when the
         * transformer only needs to consume a portion of the chunks written to the writable side.
         */
        terminate() {
          if (!IsTransformStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException("terminate");
          }
          TransformStreamDefaultControllerTerminate(this);
        }
      }
      Object.defineProperties(TransformStreamDefaultController.prototype, {
        enqueue: { enumerable: true },
        error: { enumerable: true },
        terminate: { enumerable: true },
        desiredSize: { enumerable: true }
      });
      setFunctionName(TransformStreamDefaultController.prototype.enqueue, "enqueue");
      setFunctionName(TransformStreamDefaultController.prototype.error, "error");
      setFunctionName(TransformStreamDefaultController.prototype.terminate, "terminate");
      if (typeof Symbol.toStringTag === "symbol") {
        Object.defineProperty(TransformStreamDefaultController.prototype, Symbol.toStringTag, {
          value: "TransformStreamDefaultController",
          configurable: true
        });
      }
      function IsTransformStreamDefaultController(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_controlledTransformStream")) {
          return false;
        }
        return x2 instanceof TransformStreamDefaultController;
      }
      function SetUpTransformStreamDefaultController(stream, controller, transformAlgorithm, flushAlgorithm, cancelAlgorithm) {
        controller._controlledTransformStream = stream;
        stream._transformStreamController = controller;
        controller._transformAlgorithm = transformAlgorithm;
        controller._flushAlgorithm = flushAlgorithm;
        controller._cancelAlgorithm = cancelAlgorithm;
        controller._finishPromise = void 0;
        controller._finishPromise_resolve = void 0;
        controller._finishPromise_reject = void 0;
      }
      function SetUpTransformStreamDefaultControllerFromTransformer(stream, transformer) {
        const controller = Object.create(TransformStreamDefaultController.prototype);
        let transformAlgorithm;
        let flushAlgorithm;
        let cancelAlgorithm;
        if (transformer.transform !== void 0) {
          transformAlgorithm = (chunk) => transformer.transform(chunk, controller);
        } else {
          transformAlgorithm = (chunk) => {
            try {
              TransformStreamDefaultControllerEnqueue(controller, chunk);
              return promiseResolvedWith(void 0);
            } catch (transformResultE) {
              return promiseRejectedWith(transformResultE);
            }
          };
        }
        if (transformer.flush !== void 0) {
          flushAlgorithm = () => transformer.flush(controller);
        } else {
          flushAlgorithm = () => promiseResolvedWith(void 0);
        }
        if (transformer.cancel !== void 0) {
          cancelAlgorithm = (reason) => transformer.cancel(reason);
        } else {
          cancelAlgorithm = () => promiseResolvedWith(void 0);
        }
        SetUpTransformStreamDefaultController(stream, controller, transformAlgorithm, flushAlgorithm, cancelAlgorithm);
      }
      function TransformStreamDefaultControllerClearAlgorithms(controller) {
        controller._transformAlgorithm = void 0;
        controller._flushAlgorithm = void 0;
        controller._cancelAlgorithm = void 0;
      }
      function TransformStreamDefaultControllerEnqueue(controller, chunk) {
        const stream = controller._controlledTransformStream;
        const readableController = stream._readable._readableStreamController;
        if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(readableController)) {
          throw new TypeError("Readable side is not in a state that permits enqueue");
        }
        try {
          ReadableStreamDefaultControllerEnqueue(readableController, chunk);
        } catch (e2) {
          TransformStreamErrorWritableAndUnblockWrite(stream, e2);
          throw stream._readable._storedError;
        }
        const backpressure = ReadableStreamDefaultControllerHasBackpressure(readableController);
        if (backpressure !== stream._backpressure) {
          TransformStreamSetBackpressure(stream, true);
        }
      }
      function TransformStreamDefaultControllerError(controller, e2) {
        TransformStreamError(controller._controlledTransformStream, e2);
      }
      function TransformStreamDefaultControllerPerformTransform(controller, chunk) {
        const transformPromise = controller._transformAlgorithm(chunk);
        return transformPromiseWith(transformPromise, void 0, (r2) => {
          TransformStreamError(controller._controlledTransformStream, r2);
          throw r2;
        });
      }
      function TransformStreamDefaultControllerTerminate(controller) {
        const stream = controller._controlledTransformStream;
        const readableController = stream._readable._readableStreamController;
        ReadableStreamDefaultControllerClose(readableController);
        const error = new TypeError("TransformStream terminated");
        TransformStreamErrorWritableAndUnblockWrite(stream, error);
      }
      function TransformStreamDefaultSinkWriteAlgorithm(stream, chunk) {
        const controller = stream._transformStreamController;
        if (stream._backpressure) {
          const backpressureChangePromise = stream._backpressureChangePromise;
          return transformPromiseWith(backpressureChangePromise, () => {
            const writable = stream._writable;
            const state = writable._state;
            if (state === "erroring") {
              throw writable._storedError;
            }
            return TransformStreamDefaultControllerPerformTransform(controller, chunk);
          });
        }
        return TransformStreamDefaultControllerPerformTransform(controller, chunk);
      }
      function TransformStreamDefaultSinkAbortAlgorithm(stream, reason) {
        const controller = stream._transformStreamController;
        if (controller._finishPromise !== void 0) {
          return controller._finishPromise;
        }
        const readable = stream._readable;
        controller._finishPromise = newPromise((resolve, reject) => {
          controller._finishPromise_resolve = resolve;
          controller._finishPromise_reject = reject;
        });
        const cancelPromise = controller._cancelAlgorithm(reason);
        TransformStreamDefaultControllerClearAlgorithms(controller);
        uponPromise(cancelPromise, () => {
          if (readable._state === "errored") {
            defaultControllerFinishPromiseReject(controller, readable._storedError);
          } else {
            ReadableStreamDefaultControllerError(readable._readableStreamController, reason);
            defaultControllerFinishPromiseResolve(controller);
          }
          return null;
        }, (r2) => {
          ReadableStreamDefaultControllerError(readable._readableStreamController, r2);
          defaultControllerFinishPromiseReject(controller, r2);
          return null;
        });
        return controller._finishPromise;
      }
      function TransformStreamDefaultSinkCloseAlgorithm(stream) {
        const controller = stream._transformStreamController;
        if (controller._finishPromise !== void 0) {
          return controller._finishPromise;
        }
        const readable = stream._readable;
        controller._finishPromise = newPromise((resolve, reject) => {
          controller._finishPromise_resolve = resolve;
          controller._finishPromise_reject = reject;
        });
        const flushPromise = controller._flushAlgorithm();
        TransformStreamDefaultControllerClearAlgorithms(controller);
        uponPromise(flushPromise, () => {
          if (readable._state === "errored") {
            defaultControllerFinishPromiseReject(controller, readable._storedError);
          } else {
            ReadableStreamDefaultControllerClose(readable._readableStreamController);
            defaultControllerFinishPromiseResolve(controller);
          }
          return null;
        }, (r2) => {
          ReadableStreamDefaultControllerError(readable._readableStreamController, r2);
          defaultControllerFinishPromiseReject(controller, r2);
          return null;
        });
        return controller._finishPromise;
      }
      function TransformStreamDefaultSourcePullAlgorithm(stream) {
        TransformStreamSetBackpressure(stream, false);
        return stream._backpressureChangePromise;
      }
      function TransformStreamDefaultSourceCancelAlgorithm(stream, reason) {
        const controller = stream._transformStreamController;
        if (controller._finishPromise !== void 0) {
          return controller._finishPromise;
        }
        const writable = stream._writable;
        controller._finishPromise = newPromise((resolve, reject) => {
          controller._finishPromise_resolve = resolve;
          controller._finishPromise_reject = reject;
        });
        const cancelPromise = controller._cancelAlgorithm(reason);
        TransformStreamDefaultControllerClearAlgorithms(controller);
        uponPromise(cancelPromise, () => {
          if (writable._state === "errored") {
            defaultControllerFinishPromiseReject(controller, writable._storedError);
          } else {
            WritableStreamDefaultControllerErrorIfNeeded(writable._writableStreamController, reason);
            TransformStreamUnblockWrite(stream);
            defaultControllerFinishPromiseResolve(controller);
          }
          return null;
        }, (r2) => {
          WritableStreamDefaultControllerErrorIfNeeded(writable._writableStreamController, r2);
          TransformStreamUnblockWrite(stream);
          defaultControllerFinishPromiseReject(controller, r2);
          return null;
        });
        return controller._finishPromise;
      }
      function defaultControllerBrandCheckException(name) {
        return new TypeError(`TransformStreamDefaultController.prototype.${name} can only be used on a TransformStreamDefaultController`);
      }
      function defaultControllerFinishPromiseResolve(controller) {
        if (controller._finishPromise_resolve === void 0) {
          return;
        }
        controller._finishPromise_resolve();
        controller._finishPromise_resolve = void 0;
        controller._finishPromise_reject = void 0;
      }
      function defaultControllerFinishPromiseReject(controller, reason) {
        if (controller._finishPromise_reject === void 0) {
          return;
        }
        setPromiseIsHandledToTrue(controller._finishPromise);
        controller._finishPromise_reject(reason);
        controller._finishPromise_resolve = void 0;
        controller._finishPromise_reject = void 0;
      }
      function streamBrandCheckException(name) {
        return new TypeError(`TransformStream.prototype.${name} can only be used on a TransformStream`);
      }
      exports3.ByteLengthQueuingStrategy = ByteLengthQueuingStrategy;
      exports3.CountQueuingStrategy = CountQueuingStrategy;
      exports3.ReadableByteStreamController = ReadableByteStreamController;
      exports3.ReadableStream = ReadableStream2;
      exports3.ReadableStreamBYOBReader = ReadableStreamBYOBReader;
      exports3.ReadableStreamBYOBRequest = ReadableStreamBYOBRequest;
      exports3.ReadableStreamDefaultController = ReadableStreamDefaultController;
      exports3.ReadableStreamDefaultReader = ReadableStreamDefaultReader;
      exports3.TransformStream = TransformStream;
      exports3.TransformStreamDefaultController = TransformStreamDefaultController;
      exports3.WritableStream = WritableStream;
      exports3.WritableStreamDefaultController = WritableStreamDefaultController;
      exports3.WritableStreamDefaultWriter = WritableStreamDefaultWriter;
    });
  }
});

// node_modules/fetch-blob/streams.cjs
var require_streams = __commonJS({
  "node_modules/fetch-blob/streams.cjs"() {
    var POOL_SIZE2 = 65536;
    if (!globalThis.ReadableStream) {
      try {
        const process3 = require("node:process");
        const { emitWarning } = process3;
        try {
          process3.emitWarning = () => {
          };
          Object.assign(globalThis, require("node:stream/web"));
          process3.emitWarning = emitWarning;
        } catch (error) {
          process3.emitWarning = emitWarning;
          throw error;
        }
      } catch (error) {
        Object.assign(globalThis, require_ponyfill_es2018());
      }
    }
    try {
      const { Blob: Blob3 } = require("buffer");
      if (Blob3 && !Blob3.prototype.stream) {
        Blob3.prototype.stream = function name(params) {
          let position = 0;
          const blob = this;
          return new ReadableStream({
            type: "bytes",
            async pull(ctrl) {
              const chunk = blob.slice(position, Math.min(blob.size, position + POOL_SIZE2));
              const buffer = await chunk.arrayBuffer();
              position += buffer.byteLength;
              ctrl.enqueue(new Uint8Array(buffer));
              if (position === blob.size) {
                ctrl.close();
              }
            }
          });
        };
      }
    } catch (error) {
    }
  }
});

// node_modules/fetch-blob/index.js
async function* toIterator(parts, clone2 = true) {
  for (const part of parts) {
    if ("stream" in part) {
      yield* (
        /** @type {AsyncIterableIterator<Uint8Array>} */
        part.stream()
      );
    } else if (ArrayBuffer.isView(part)) {
      if (clone2) {
        let position = part.byteOffset;
        const end = part.byteOffset + part.byteLength;
        while (position !== end) {
          const size = Math.min(end - position, POOL_SIZE);
          const chunk = part.buffer.slice(position, position + size);
          position += chunk.byteLength;
          yield new Uint8Array(chunk);
        }
      } else {
        yield part;
      }
    } else {
      let position = 0, b = (
        /** @type {Blob} */
        part
      );
      while (position !== b.size) {
        const chunk = b.slice(position, Math.min(b.size, position + POOL_SIZE));
        const buffer = await chunk.arrayBuffer();
        position += buffer.byteLength;
        yield new Uint8Array(buffer);
      }
    }
  }
}
var import_streams, POOL_SIZE, _Blob, Blob2, fetch_blob_default;
var init_fetch_blob = __esm({
  "node_modules/fetch-blob/index.js"() {
    import_streams = __toESM(require_streams(), 1);
    POOL_SIZE = 65536;
    _Blob = class Blob {
      /** @type {Array.<(Blob|Uint8Array)>} */
      #parts = [];
      #type = "";
      #size = 0;
      #endings = "transparent";
      /**
       * The Blob() constructor returns a new Blob object. The content
       * of the blob consists of the concatenation of the values given
       * in the parameter array.
       *
       * @param {*} blobParts
       * @param {{ type?: string, endings?: string }} [options]
       */
      constructor(blobParts = [], options = {}) {
        if (typeof blobParts !== "object" || blobParts === null) {
          throw new TypeError("Failed to construct 'Blob': The provided value cannot be converted to a sequence.");
        }
        if (typeof blobParts[Symbol.iterator] !== "function") {
          throw new TypeError("Failed to construct 'Blob': The object must have a callable @@iterator property.");
        }
        if (typeof options !== "object" && typeof options !== "function") {
          throw new TypeError("Failed to construct 'Blob': parameter 2 cannot convert to dictionary.");
        }
        if (options === null) options = {};
        const encoder = new TextEncoder();
        for (const element of blobParts) {
          let part;
          if (ArrayBuffer.isView(element)) {
            part = new Uint8Array(element.buffer.slice(element.byteOffset, element.byteOffset + element.byteLength));
          } else if (element instanceof ArrayBuffer) {
            part = new Uint8Array(element.slice(0));
          } else if (element instanceof Blob) {
            part = element;
          } else {
            part = encoder.encode(`${element}`);
          }
          this.#size += ArrayBuffer.isView(part) ? part.byteLength : part.size;
          this.#parts.push(part);
        }
        this.#endings = `${options.endings === void 0 ? "transparent" : options.endings}`;
        const type = options.type === void 0 ? "" : String(options.type);
        this.#type = /^[\x20-\x7E]*$/.test(type) ? type : "";
      }
      /**
       * The Blob interface's size property returns the
       * size of the Blob in bytes.
       */
      get size() {
        return this.#size;
      }
      /**
       * The type property of a Blob object returns the MIME type of the file.
       */
      get type() {
        return this.#type;
      }
      /**
       * The text() method in the Blob interface returns a Promise
       * that resolves with a string containing the contents of
       * the blob, interpreted as UTF-8.
       *
       * @return {Promise<string>}
       */
      async text() {
        const decoder = new TextDecoder();
        let str = "";
        for await (const part of toIterator(this.#parts, false)) {
          str += decoder.decode(part, { stream: true });
        }
        str += decoder.decode();
        return str;
      }
      /**
       * The arrayBuffer() method in the Blob interface returns a
       * Promise that resolves with the contents of the blob as
       * binary data contained in an ArrayBuffer.
       *
       * @return {Promise<ArrayBuffer>}
       */
      async arrayBuffer() {
        const data = new Uint8Array(this.size);
        let offset = 0;
        for await (const chunk of toIterator(this.#parts, false)) {
          data.set(chunk, offset);
          offset += chunk.length;
        }
        return data.buffer;
      }
      stream() {
        const it = toIterator(this.#parts, true);
        return new globalThis.ReadableStream({
          // @ts-ignore
          type: "bytes",
          async pull(ctrl) {
            const chunk = await it.next();
            chunk.done ? ctrl.close() : ctrl.enqueue(chunk.value);
          },
          async cancel() {
            await it.return();
          }
        });
      }
      /**
       * The Blob interface's slice() method creates and returns a
       * new Blob object which contains data from a subset of the
       * blob on which it's called.
       *
       * @param {number} [start]
       * @param {number} [end]
       * @param {string} [type]
       */
      slice(start = 0, end = this.size, type = "") {
        const { size } = this;
        let relativeStart = start < 0 ? Math.max(size + start, 0) : Math.min(start, size);
        let relativeEnd = end < 0 ? Math.max(size + end, 0) : Math.min(end, size);
        const span = Math.max(relativeEnd - relativeStart, 0);
        const parts = this.#parts;
        const blobParts = [];
        let added = 0;
        for (const part of parts) {
          if (added >= span) {
            break;
          }
          const size2 = ArrayBuffer.isView(part) ? part.byteLength : part.size;
          if (relativeStart && size2 <= relativeStart) {
            relativeStart -= size2;
            relativeEnd -= size2;
          } else {
            let chunk;
            if (ArrayBuffer.isView(part)) {
              chunk = part.subarray(relativeStart, Math.min(size2, relativeEnd));
              added += chunk.byteLength;
            } else {
              chunk = part.slice(relativeStart, Math.min(size2, relativeEnd));
              added += chunk.size;
            }
            relativeEnd -= size2;
            blobParts.push(chunk);
            relativeStart = 0;
          }
        }
        const blob = new Blob([], { type: String(type).toLowerCase() });
        blob.#size = span;
        blob.#parts = blobParts;
        return blob;
      }
      get [Symbol.toStringTag]() {
        return "Blob";
      }
      static [Symbol.hasInstance](object) {
        return object && typeof object === "object" && typeof object.constructor === "function" && (typeof object.stream === "function" || typeof object.arrayBuffer === "function") && /^(Blob|File)$/.test(object[Symbol.toStringTag]);
      }
    };
    Object.defineProperties(_Blob.prototype, {
      size: { enumerable: true },
      type: { enumerable: true },
      slice: { enumerable: true }
    });
    Blob2 = _Blob;
    fetch_blob_default = Blob2;
  }
});

// node_modules/fetch-blob/file.js
var _File, File2, file_default;
var init_file = __esm({
  "node_modules/fetch-blob/file.js"() {
    init_fetch_blob();
    _File = class File extends fetch_blob_default {
      #lastModified = 0;
      #name = "";
      /**
       * @param {*[]} fileBits
       * @param {string} fileName
       * @param {{lastModified?: number, type?: string}} options
       */
      // @ts-ignore
      constructor(fileBits, fileName, options = {}) {
        if (arguments.length < 2) {
          throw new TypeError(`Failed to construct 'File': 2 arguments required, but only ${arguments.length} present.`);
        }
        super(fileBits, options);
        if (options === null) options = {};
        const lastModified = options.lastModified === void 0 ? Date.now() : Number(options.lastModified);
        if (!Number.isNaN(lastModified)) {
          this.#lastModified = lastModified;
        }
        this.#name = String(fileName);
      }
      get name() {
        return this.#name;
      }
      get lastModified() {
        return this.#lastModified;
      }
      get [Symbol.toStringTag]() {
        return "File";
      }
      static [Symbol.hasInstance](object) {
        return !!object && object instanceof fetch_blob_default && /^(File)$/.test(object[Symbol.toStringTag]);
      }
    };
    File2 = _File;
    file_default = File2;
  }
});

// node_modules/formdata-polyfill/esm.min.js
function formDataToBlob(F2, B = fetch_blob_default) {
  var b = `${r()}${r()}`.replace(/\./g, "").slice(-28).padStart(32, "-"), c = [], p = `--${b}\r
Content-Disposition: form-data; name="`;
  F2.forEach((v, n) => typeof v == "string" ? c.push(p + e(n) + `"\r
\r
${v.replace(/\r(?!\n)|(?<!\r)\n/g, "\r\n")}\r
`) : c.push(p + e(n) + `"; filename="${e(v.name, 1)}"\r
Content-Type: ${v.type || "application/octet-stream"}\r
\r
`, v, "\r\n"));
  c.push(`--${b}--`);
  return new B(c, { type: "multipart/form-data; boundary=" + b });
}
var t, i, h, r, m, f, e, x, FormData;
var init_esm_min = __esm({
  "node_modules/formdata-polyfill/esm.min.js"() {
    init_fetch_blob();
    init_file();
    ({ toStringTag: t, iterator: i, hasInstance: h } = Symbol);
    r = Math.random;
    m = "append,set,get,getAll,delete,keys,values,entries,forEach,constructor".split(",");
    f = (a, b, c) => (a += "", /^(Blob|File)$/.test(b && b[t]) ? [(c = c !== void 0 ? c + "" : b[t] == "File" ? b.name : "blob", a), b.name !== c || b[t] == "blob" ? new file_default([b], c, b) : b] : [a, b + ""]);
    e = (c, f3) => (f3 ? c : c.replace(/\r?\n|\r/g, "\r\n")).replace(/\n/g, "%0A").replace(/\r/g, "%0D").replace(/"/g, "%22");
    x = (n, a, e2) => {
      if (a.length < e2) {
        throw new TypeError(`Failed to execute '${n}' on 'FormData': ${e2} arguments required, but only ${a.length} present.`);
      }
    };
    FormData = class FormData2 {
      #d = [];
      constructor(...a) {
        if (a.length) throw new TypeError(`Failed to construct 'FormData': parameter 1 is not of type 'HTMLFormElement'.`);
      }
      get [t]() {
        return "FormData";
      }
      [i]() {
        return this.entries();
      }
      static [h](o) {
        return o && typeof o === "object" && o[t] === "FormData" && !m.some((m2) => typeof o[m2] != "function");
      }
      append(...a) {
        x("append", arguments, 2);
        this.#d.push(f(...a));
      }
      delete(a) {
        x("delete", arguments, 1);
        a += "";
        this.#d = this.#d.filter(([b]) => b !== a);
      }
      get(a) {
        x("get", arguments, 1);
        a += "";
        for (var b = this.#d, l = b.length, c = 0; c < l; c++) if (b[c][0] === a) return b[c][1];
        return null;
      }
      getAll(a, b) {
        x("getAll", arguments, 1);
        b = [];
        a += "";
        this.#d.forEach((c) => c[0] === a && b.push(c[1]));
        return b;
      }
      has(a) {
        x("has", arguments, 1);
        a += "";
        return this.#d.some((b) => b[0] === a);
      }
      forEach(a, b) {
        x("forEach", arguments, 1);
        for (var [c, d] of this) a.call(b, d, c, this);
      }
      set(...a) {
        x("set", arguments, 2);
        var b = [], c = true;
        a = f(...a);
        this.#d.forEach((d) => {
          d[0] === a[0] ? c && (c = !b.push(a)) : b.push(d);
        });
        c && b.push(a);
        this.#d = b;
      }
      *entries() {
        yield* this.#d;
      }
      *keys() {
        for (var [a] of this) yield a;
      }
      *values() {
        for (var [, a] of this) yield a;
      }
    };
  }
});

// node_modules/node-fetch/src/errors/base.js
var FetchBaseError;
var init_base = __esm({
  "node_modules/node-fetch/src/errors/base.js"() {
    FetchBaseError = class extends Error {
      constructor(message, type) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
        this.type = type;
      }
      get name() {
        return this.constructor.name;
      }
      get [Symbol.toStringTag]() {
        return this.constructor.name;
      }
    };
  }
});

// node_modules/node-fetch/src/errors/fetch-error.js
var FetchError;
var init_fetch_error = __esm({
  "node_modules/node-fetch/src/errors/fetch-error.js"() {
    init_base();
    FetchError = class extends FetchBaseError {
      /**
       * @param  {string} message -      Error message for human
       * @param  {string} [type] -        Error type for machine
       * @param  {SystemError} [systemError] - For Node.js system error
       */
      constructor(message, type, systemError) {
        super(message, type);
        if (systemError) {
          this.code = this.errno = systemError.code;
          this.erroredSysCall = systemError.syscall;
        }
      }
    };
  }
});

// node_modules/node-fetch/src/utils/is.js
var NAME, isURLSearchParameters, isBlob, isAbortSignal, isDomainOrSubdomain, isSameProtocol;
var init_is = __esm({
  "node_modules/node-fetch/src/utils/is.js"() {
    NAME = Symbol.toStringTag;
    isURLSearchParameters = (object) => {
      return typeof object === "object" && typeof object.append === "function" && typeof object.delete === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.has === "function" && typeof object.set === "function" && typeof object.sort === "function" && object[NAME] === "URLSearchParams";
    };
    isBlob = (object) => {
      return object && typeof object === "object" && typeof object.arrayBuffer === "function" && typeof object.type === "string" && typeof object.stream === "function" && typeof object.constructor === "function" && /^(Blob|File)$/.test(object[NAME]);
    };
    isAbortSignal = (object) => {
      return typeof object === "object" && (object[NAME] === "AbortSignal" || object[NAME] === "EventTarget");
    };
    isDomainOrSubdomain = (destination, original) => {
      const orig = new URL(original).hostname;
      const dest = new URL(destination).hostname;
      return orig === dest || orig.endsWith(`.${dest}`);
    };
    isSameProtocol = (destination, original) => {
      const orig = new URL(original).protocol;
      const dest = new URL(destination).protocol;
      return orig === dest;
    };
  }
});

// node_modules/node-domexception/index.js
var require_node_domexception = __commonJS({
  "node_modules/node-domexception/index.js"(exports2, module2) {
    if (!globalThis.DOMException) {
      try {
        const { MessageChannel } = require("worker_threads"), port = new MessageChannel().port1, ab = new ArrayBuffer();
        port.postMessage(ab, [ab, ab]);
      } catch (err) {
        err.constructor.name === "DOMException" && (globalThis.DOMException = err.constructor);
      }
    }
    module2.exports = globalThis.DOMException;
  }
});

// node_modules/fetch-blob/from.js
var import_node_fs, import_node_path, import_node_domexception, stat, blobFromSync, blobFrom, fileFrom, fileFromSync, fromBlob, fromFile, BlobDataItem;
var init_from = __esm({
  "node_modules/fetch-blob/from.js"() {
    import_node_fs = require("node:fs");
    import_node_path = require("node:path");
    import_node_domexception = __toESM(require_node_domexception(), 1);
    init_file();
    init_fetch_blob();
    ({ stat } = import_node_fs.promises);
    blobFromSync = (path2, type) => fromBlob((0, import_node_fs.statSync)(path2), path2, type);
    blobFrom = (path2, type) => stat(path2).then((stat2) => fromBlob(stat2, path2, type));
    fileFrom = (path2, type) => stat(path2).then((stat2) => fromFile(stat2, path2, type));
    fileFromSync = (path2, type) => fromFile((0, import_node_fs.statSync)(path2), path2, type);
    fromBlob = (stat2, path2, type = "") => new fetch_blob_default([new BlobDataItem({
      path: path2,
      size: stat2.size,
      lastModified: stat2.mtimeMs,
      start: 0
    })], { type });
    fromFile = (stat2, path2, type = "") => new file_default([new BlobDataItem({
      path: path2,
      size: stat2.size,
      lastModified: stat2.mtimeMs,
      start: 0
    })], (0, import_node_path.basename)(path2), { type, lastModified: stat2.mtimeMs });
    BlobDataItem = class _BlobDataItem {
      #path;
      #start;
      constructor(options) {
        this.#path = options.path;
        this.#start = options.start;
        this.size = options.size;
        this.lastModified = options.lastModified;
      }
      /**
       * Slicing arguments is first validated and formatted
       * to not be out of range by Blob.prototype.slice
       */
      slice(start, end) {
        return new _BlobDataItem({
          path: this.#path,
          lastModified: this.lastModified,
          size: end - start,
          start: this.#start + start
        });
      }
      async *stream() {
        const { mtimeMs } = await stat(this.#path);
        if (mtimeMs > this.lastModified) {
          throw new import_node_domexception.default("The requested file could not be read, typically due to permission problems that have occurred after a reference to a file was acquired.", "NotReadableError");
        }
        yield* (0, import_node_fs.createReadStream)(this.#path, {
          start: this.#start,
          end: this.#start + this.size - 1
        });
      }
      get [Symbol.toStringTag]() {
        return "Blob";
      }
    };
  }
});

// node_modules/node-fetch/src/utils/multipart-parser.js
var multipart_parser_exports = {};
__export(multipart_parser_exports, {
  toFormData: () => toFormData
});
function _fileName(headerValue) {
  const m2 = headerValue.match(/\bfilename=("(.*?)"|([^()<>@,;:\\"/[\]?={}\s\t]+))($|;\s)/i);
  if (!m2) {
    return;
  }
  const match = m2[2] || m2[3] || "";
  let filename = match.slice(match.lastIndexOf("\\") + 1);
  filename = filename.replace(/%22/g, '"');
  filename = filename.replace(/&#(\d{4});/g, (m3, code) => {
    return String.fromCharCode(code);
  });
  return filename;
}
async function toFormData(Body2, ct) {
  if (!/multipart/i.test(ct)) {
    throw new TypeError("Failed to fetch");
  }
  const m2 = ct.match(/boundary=(?:"([^"]+)"|([^;]+))/i);
  if (!m2) {
    throw new TypeError("no or bad content-type header, no multipart boundary");
  }
  const parser = new MultipartParser(m2[1] || m2[2]);
  let headerField;
  let headerValue;
  let entryValue;
  let entryName;
  let contentType;
  let filename;
  const entryChunks = [];
  const formData = new FormData();
  const onPartData = (ui8a) => {
    entryValue += decoder.decode(ui8a, { stream: true });
  };
  const appendToFile = (ui8a) => {
    entryChunks.push(ui8a);
  };
  const appendFileToFormData = () => {
    const file = new file_default(entryChunks, filename, { type: contentType });
    formData.append(entryName, file);
  };
  const appendEntryToFormData = () => {
    formData.append(entryName, entryValue);
  };
  const decoder = new TextDecoder("utf-8");
  decoder.decode();
  parser.onPartBegin = function() {
    parser.onPartData = onPartData;
    parser.onPartEnd = appendEntryToFormData;
    headerField = "";
    headerValue = "";
    entryValue = "";
    entryName = "";
    contentType = "";
    filename = null;
    entryChunks.length = 0;
  };
  parser.onHeaderField = function(ui8a) {
    headerField += decoder.decode(ui8a, { stream: true });
  };
  parser.onHeaderValue = function(ui8a) {
    headerValue += decoder.decode(ui8a, { stream: true });
  };
  parser.onHeaderEnd = function() {
    headerValue += decoder.decode();
    headerField = headerField.toLowerCase();
    if (headerField === "content-disposition") {
      const m3 = headerValue.match(/\bname=("([^"]*)"|([^()<>@,;:\\"/[\]?={}\s\t]+))/i);
      if (m3) {
        entryName = m3[2] || m3[3] || "";
      }
      filename = _fileName(headerValue);
      if (filename) {
        parser.onPartData = appendToFile;
        parser.onPartEnd = appendFileToFormData;
      }
    } else if (headerField === "content-type") {
      contentType = headerValue;
    }
    headerValue = "";
    headerField = "";
  };
  for await (const chunk of Body2) {
    parser.write(chunk);
  }
  parser.end();
  return formData;
}
var s, S, f2, F, LF, CR, SPACE, HYPHEN, COLON, A, Z, lower, noop, MultipartParser;
var init_multipart_parser = __esm({
  "node_modules/node-fetch/src/utils/multipart-parser.js"() {
    init_from();
    init_esm_min();
    s = 0;
    S = {
      START_BOUNDARY: s++,
      HEADER_FIELD_START: s++,
      HEADER_FIELD: s++,
      HEADER_VALUE_START: s++,
      HEADER_VALUE: s++,
      HEADER_VALUE_ALMOST_DONE: s++,
      HEADERS_ALMOST_DONE: s++,
      PART_DATA_START: s++,
      PART_DATA: s++,
      END: s++
    };
    f2 = 1;
    F = {
      PART_BOUNDARY: f2,
      LAST_BOUNDARY: f2 *= 2
    };
    LF = 10;
    CR = 13;
    SPACE = 32;
    HYPHEN = 45;
    COLON = 58;
    A = 97;
    Z = 122;
    lower = (c) => c | 32;
    noop = () => {
    };
    MultipartParser = class {
      /**
       * @param {string} boundary
       */
      constructor(boundary) {
        this.index = 0;
        this.flags = 0;
        this.onHeaderEnd = noop;
        this.onHeaderField = noop;
        this.onHeadersEnd = noop;
        this.onHeaderValue = noop;
        this.onPartBegin = noop;
        this.onPartData = noop;
        this.onPartEnd = noop;
        this.boundaryChars = {};
        boundary = "\r\n--" + boundary;
        const ui8a = new Uint8Array(boundary.length);
        for (let i2 = 0; i2 < boundary.length; i2++) {
          ui8a[i2] = boundary.charCodeAt(i2);
          this.boundaryChars[ui8a[i2]] = true;
        }
        this.boundary = ui8a;
        this.lookbehind = new Uint8Array(this.boundary.length + 8);
        this.state = S.START_BOUNDARY;
      }
      /**
       * @param {Uint8Array} data
       */
      write(data) {
        let i2 = 0;
        const length_ = data.length;
        let previousIndex = this.index;
        let { lookbehind, boundary, boundaryChars, index, state, flags } = this;
        const boundaryLength = this.boundary.length;
        const boundaryEnd = boundaryLength - 1;
        const bufferLength = data.length;
        let c;
        let cl;
        const mark = (name) => {
          this[name + "Mark"] = i2;
        };
        const clear = (name) => {
          delete this[name + "Mark"];
        };
        const callback = (callbackSymbol, start, end, ui8a) => {
          if (start === void 0 || start !== end) {
            this[callbackSymbol](ui8a && ui8a.subarray(start, end));
          }
        };
        const dataCallback = (name, clear2) => {
          const markSymbol = name + "Mark";
          if (!(markSymbol in this)) {
            return;
          }
          if (clear2) {
            callback(name, this[markSymbol], i2, data);
            delete this[markSymbol];
          } else {
            callback(name, this[markSymbol], data.length, data);
            this[markSymbol] = 0;
          }
        };
        for (i2 = 0; i2 < length_; i2++) {
          c = data[i2];
          switch (state) {
            case S.START_BOUNDARY:
              if (index === boundary.length - 2) {
                if (c === HYPHEN) {
                  flags |= F.LAST_BOUNDARY;
                } else if (c !== CR) {
                  return;
                }
                index++;
                break;
              } else if (index - 1 === boundary.length - 2) {
                if (flags & F.LAST_BOUNDARY && c === HYPHEN) {
                  state = S.END;
                  flags = 0;
                } else if (!(flags & F.LAST_BOUNDARY) && c === LF) {
                  index = 0;
                  callback("onPartBegin");
                  state = S.HEADER_FIELD_START;
                } else {
                  return;
                }
                break;
              }
              if (c !== boundary[index + 2]) {
                index = -2;
              }
              if (c === boundary[index + 2]) {
                index++;
              }
              break;
            case S.HEADER_FIELD_START:
              state = S.HEADER_FIELD;
              mark("onHeaderField");
              index = 0;
            // falls through
            case S.HEADER_FIELD:
              if (c === CR) {
                clear("onHeaderField");
                state = S.HEADERS_ALMOST_DONE;
                break;
              }
              index++;
              if (c === HYPHEN) {
                break;
              }
              if (c === COLON) {
                if (index === 1) {
                  return;
                }
                dataCallback("onHeaderField", true);
                state = S.HEADER_VALUE_START;
                break;
              }
              cl = lower(c);
              if (cl < A || cl > Z) {
                return;
              }
              break;
            case S.HEADER_VALUE_START:
              if (c === SPACE) {
                break;
              }
              mark("onHeaderValue");
              state = S.HEADER_VALUE;
            // falls through
            case S.HEADER_VALUE:
              if (c === CR) {
                dataCallback("onHeaderValue", true);
                callback("onHeaderEnd");
                state = S.HEADER_VALUE_ALMOST_DONE;
              }
              break;
            case S.HEADER_VALUE_ALMOST_DONE:
              if (c !== LF) {
                return;
              }
              state = S.HEADER_FIELD_START;
              break;
            case S.HEADERS_ALMOST_DONE:
              if (c !== LF) {
                return;
              }
              callback("onHeadersEnd");
              state = S.PART_DATA_START;
              break;
            case S.PART_DATA_START:
              state = S.PART_DATA;
              mark("onPartData");
            // falls through
            case S.PART_DATA:
              previousIndex = index;
              if (index === 0) {
                i2 += boundaryEnd;
                while (i2 < bufferLength && !(data[i2] in boundaryChars)) {
                  i2 += boundaryLength;
                }
                i2 -= boundaryEnd;
                c = data[i2];
              }
              if (index < boundary.length) {
                if (boundary[index] === c) {
                  if (index === 0) {
                    dataCallback("onPartData", true);
                  }
                  index++;
                } else {
                  index = 0;
                }
              } else if (index === boundary.length) {
                index++;
                if (c === CR) {
                  flags |= F.PART_BOUNDARY;
                } else if (c === HYPHEN) {
                  flags |= F.LAST_BOUNDARY;
                } else {
                  index = 0;
                }
              } else if (index - 1 === boundary.length) {
                if (flags & F.PART_BOUNDARY) {
                  index = 0;
                  if (c === LF) {
                    flags &= ~F.PART_BOUNDARY;
                    callback("onPartEnd");
                    callback("onPartBegin");
                    state = S.HEADER_FIELD_START;
                    break;
                  }
                } else if (flags & F.LAST_BOUNDARY) {
                  if (c === HYPHEN) {
                    callback("onPartEnd");
                    state = S.END;
                    flags = 0;
                  } else {
                    index = 0;
                  }
                } else {
                  index = 0;
                }
              }
              if (index > 0) {
                lookbehind[index - 1] = c;
              } else if (previousIndex > 0) {
                const _lookbehind = new Uint8Array(lookbehind.buffer, lookbehind.byteOffset, lookbehind.byteLength);
                callback("onPartData", 0, previousIndex, _lookbehind);
                previousIndex = 0;
                mark("onPartData");
                i2--;
              }
              break;
            case S.END:
              break;
            default:
              throw new Error(`Unexpected state entered: ${state}`);
          }
        }
        dataCallback("onHeaderField");
        dataCallback("onHeaderValue");
        dataCallback("onPartData");
        this.index = index;
        this.state = state;
        this.flags = flags;
      }
      end() {
        if (this.state === S.HEADER_FIELD_START && this.index === 0 || this.state === S.PART_DATA && this.index === this.boundary.length) {
          this.onPartEnd();
        } else if (this.state !== S.END) {
          throw new Error("MultipartParser.end(): stream ended unexpectedly");
        }
      }
    };
  }
});

// node_modules/node-fetch/src/body.js
async function consumeBody(data) {
  if (data[INTERNALS].disturbed) {
    throw new TypeError(`body used already for: ${data.url}`);
  }
  data[INTERNALS].disturbed = true;
  if (data[INTERNALS].error) {
    throw data[INTERNALS].error;
  }
  const { body } = data;
  if (body === null) {
    return import_node_buffer.Buffer.alloc(0);
  }
  if (!(body instanceof import_node_stream.default)) {
    return import_node_buffer.Buffer.alloc(0);
  }
  const accum = [];
  let accumBytes = 0;
  try {
    for await (const chunk of body) {
      if (data.size > 0 && accumBytes + chunk.length > data.size) {
        const error = new FetchError(`content size at ${data.url} over limit: ${data.size}`, "max-size");
        body.destroy(error);
        throw error;
      }
      accumBytes += chunk.length;
      accum.push(chunk);
    }
  } catch (error) {
    const error_ = error instanceof FetchBaseError ? error : new FetchError(`Invalid response body while trying to fetch ${data.url}: ${error.message}`, "system", error);
    throw error_;
  }
  if (body.readableEnded === true || body._readableState.ended === true) {
    try {
      if (accum.every((c) => typeof c === "string")) {
        return import_node_buffer.Buffer.from(accum.join(""));
      }
      return import_node_buffer.Buffer.concat(accum, accumBytes);
    } catch (error) {
      throw new FetchError(`Could not create Buffer from response body for ${data.url}: ${error.message}`, "system", error);
    }
  } else {
    throw new FetchError(`Premature close of server response while trying to fetch ${data.url}`);
  }
}
var import_node_stream, import_node_util, import_node_buffer, pipeline, INTERNALS, Body, clone, getNonSpecFormDataBoundary, extractContentType, getTotalBytes, writeToStream;
var init_body = __esm({
  "node_modules/node-fetch/src/body.js"() {
    import_node_stream = __toESM(require("node:stream"), 1);
    import_node_util = require("node:util");
    import_node_buffer = require("node:buffer");
    init_fetch_blob();
    init_esm_min();
    init_fetch_error();
    init_base();
    init_is();
    pipeline = (0, import_node_util.promisify)(import_node_stream.default.pipeline);
    INTERNALS = Symbol("Body internals");
    Body = class {
      constructor(body, {
        size = 0
      } = {}) {
        let boundary = null;
        if (body === null) {
          body = null;
        } else if (isURLSearchParameters(body)) {
          body = import_node_buffer.Buffer.from(body.toString());
        } else if (isBlob(body)) {
        } else if (import_node_buffer.Buffer.isBuffer(body)) {
        } else if (import_node_util.types.isAnyArrayBuffer(body)) {
          body = import_node_buffer.Buffer.from(body);
        } else if (ArrayBuffer.isView(body)) {
          body = import_node_buffer.Buffer.from(body.buffer, body.byteOffset, body.byteLength);
        } else if (body instanceof import_node_stream.default) {
        } else if (body instanceof FormData) {
          body = formDataToBlob(body);
          boundary = body.type.split("=")[1];
        } else {
          body = import_node_buffer.Buffer.from(String(body));
        }
        let stream = body;
        if (import_node_buffer.Buffer.isBuffer(body)) {
          stream = import_node_stream.default.Readable.from(body);
        } else if (isBlob(body)) {
          stream = import_node_stream.default.Readable.from(body.stream());
        }
        this[INTERNALS] = {
          body,
          stream,
          boundary,
          disturbed: false,
          error: null
        };
        this.size = size;
        if (body instanceof import_node_stream.default) {
          body.on("error", (error_) => {
            const error = error_ instanceof FetchBaseError ? error_ : new FetchError(`Invalid response body while trying to fetch ${this.url}: ${error_.message}`, "system", error_);
            this[INTERNALS].error = error;
          });
        }
      }
      get body() {
        return this[INTERNALS].stream;
      }
      get bodyUsed() {
        return this[INTERNALS].disturbed;
      }
      /**
       * Decode response as ArrayBuffer
       *
       * @return  Promise
       */
      async arrayBuffer() {
        const { buffer, byteOffset, byteLength } = await consumeBody(this);
        return buffer.slice(byteOffset, byteOffset + byteLength);
      }
      async formData() {
        const ct = this.headers.get("content-type");
        if (ct.startsWith("application/x-www-form-urlencoded")) {
          const formData = new FormData();
          const parameters = new URLSearchParams(await this.text());
          for (const [name, value] of parameters) {
            formData.append(name, value);
          }
          return formData;
        }
        const { toFormData: toFormData2 } = await Promise.resolve().then(() => (init_multipart_parser(), multipart_parser_exports));
        return toFormData2(this.body, ct);
      }
      /**
       * Return raw response as Blob
       *
       * @return Promise
       */
      async blob() {
        const ct = this.headers && this.headers.get("content-type") || this[INTERNALS].body && this[INTERNALS].body.type || "";
        const buf = await this.arrayBuffer();
        return new fetch_blob_default([buf], {
          type: ct
        });
      }
      /**
       * Decode response as json
       *
       * @return  Promise
       */
      async json() {
        const text = await this.text();
        return JSON.parse(text);
      }
      /**
       * Decode response as text
       *
       * @return  Promise
       */
      async text() {
        const buffer = await consumeBody(this);
        return new TextDecoder().decode(buffer);
      }
      /**
       * Decode response as buffer (non-spec api)
       *
       * @return  Promise
       */
      buffer() {
        return consumeBody(this);
      }
    };
    Body.prototype.buffer = (0, import_node_util.deprecate)(Body.prototype.buffer, "Please use 'response.arrayBuffer()' instead of 'response.buffer()'", "node-fetch#buffer");
    Object.defineProperties(Body.prototype, {
      body: { enumerable: true },
      bodyUsed: { enumerable: true },
      arrayBuffer: { enumerable: true },
      blob: { enumerable: true },
      json: { enumerable: true },
      text: { enumerable: true },
      data: { get: (0, import_node_util.deprecate)(
        () => {
        },
        "data doesn't exist, use json(), text(), arrayBuffer(), or body instead",
        "https://github.com/node-fetch/node-fetch/issues/1000 (response)"
      ) }
    });
    clone = (instance, highWaterMark) => {
      let p1;
      let p2;
      let { body } = instance[INTERNALS];
      if (instance.bodyUsed) {
        throw new Error("cannot clone body after it is used");
      }
      if (body instanceof import_node_stream.default && typeof body.getBoundary !== "function") {
        p1 = new import_node_stream.PassThrough({ highWaterMark });
        p2 = new import_node_stream.PassThrough({ highWaterMark });
        body.pipe(p1);
        body.pipe(p2);
        instance[INTERNALS].stream = p1;
        body = p2;
      }
      return body;
    };
    getNonSpecFormDataBoundary = (0, import_node_util.deprecate)(
      (body) => body.getBoundary(),
      "form-data doesn't follow the spec and requires special treatment. Use alternative package",
      "https://github.com/node-fetch/node-fetch/issues/1167"
    );
    extractContentType = (body, request) => {
      if (body === null) {
        return null;
      }
      if (typeof body === "string") {
        return "text/plain;charset=UTF-8";
      }
      if (isURLSearchParameters(body)) {
        return "application/x-www-form-urlencoded;charset=UTF-8";
      }
      if (isBlob(body)) {
        return body.type || null;
      }
      if (import_node_buffer.Buffer.isBuffer(body) || import_node_util.types.isAnyArrayBuffer(body) || ArrayBuffer.isView(body)) {
        return null;
      }
      if (body instanceof FormData) {
        return `multipart/form-data; boundary=${request[INTERNALS].boundary}`;
      }
      if (body && typeof body.getBoundary === "function") {
        return `multipart/form-data;boundary=${getNonSpecFormDataBoundary(body)}`;
      }
      if (body instanceof import_node_stream.default) {
        return null;
      }
      return "text/plain;charset=UTF-8";
    };
    getTotalBytes = (request) => {
      const { body } = request[INTERNALS];
      if (body === null) {
        return 0;
      }
      if (isBlob(body)) {
        return body.size;
      }
      if (import_node_buffer.Buffer.isBuffer(body)) {
        return body.length;
      }
      if (body && typeof body.getLengthSync === "function") {
        return body.hasKnownLength && body.hasKnownLength() ? body.getLengthSync() : null;
      }
      return null;
    };
    writeToStream = async (dest, { body }) => {
      if (body === null) {
        dest.end();
      } else {
        await pipeline(body, dest);
      }
    };
  }
});

// node_modules/node-fetch/src/headers.js
function fromRawHeaders(headers = []) {
  return new Headers(
    headers.reduce((result, value, index, array) => {
      if (index % 2 === 0) {
        result.push(array.slice(index, index + 2));
      }
      return result;
    }, []).filter(([name, value]) => {
      try {
        validateHeaderName(name);
        validateHeaderValue(name, String(value));
        return true;
      } catch {
        return false;
      }
    })
  );
}
var import_node_util2, import_node_http, validateHeaderName, validateHeaderValue, Headers;
var init_headers = __esm({
  "node_modules/node-fetch/src/headers.js"() {
    import_node_util2 = require("node:util");
    import_node_http = __toESM(require("node:http"), 1);
    validateHeaderName = typeof import_node_http.default.validateHeaderName === "function" ? import_node_http.default.validateHeaderName : (name) => {
      if (!/^[\^`\-\w!#$%&'*+.|~]+$/.test(name)) {
        const error = new TypeError(`Header name must be a valid HTTP token [${name}]`);
        Object.defineProperty(error, "code", { value: "ERR_INVALID_HTTP_TOKEN" });
        throw error;
      }
    };
    validateHeaderValue = typeof import_node_http.default.validateHeaderValue === "function" ? import_node_http.default.validateHeaderValue : (name, value) => {
      if (/[^\t\u0020-\u007E\u0080-\u00FF]/.test(value)) {
        const error = new TypeError(`Invalid character in header content ["${name}"]`);
        Object.defineProperty(error, "code", { value: "ERR_INVALID_CHAR" });
        throw error;
      }
    };
    Headers = class _Headers extends URLSearchParams {
      /**
       * Headers class
       *
       * @constructor
       * @param {HeadersInit} [init] - Response headers
       */
      constructor(init) {
        let result = [];
        if (init instanceof _Headers) {
          const raw = init.raw();
          for (const [name, values] of Object.entries(raw)) {
            result.push(...values.map((value) => [name, value]));
          }
        } else if (init == null) {
        } else if (typeof init === "object" && !import_node_util2.types.isBoxedPrimitive(init)) {
          const method = init[Symbol.iterator];
          if (method == null) {
            result.push(...Object.entries(init));
          } else {
            if (typeof method !== "function") {
              throw new TypeError("Header pairs must be iterable");
            }
            result = [...init].map((pair) => {
              if (typeof pair !== "object" || import_node_util2.types.isBoxedPrimitive(pair)) {
                throw new TypeError("Each header pair must be an iterable object");
              }
              return [...pair];
            }).map((pair) => {
              if (pair.length !== 2) {
                throw new TypeError("Each header pair must be a name/value tuple");
              }
              return [...pair];
            });
          }
        } else {
          throw new TypeError("Failed to construct 'Headers': The provided value is not of type '(sequence<sequence<ByteString>> or record<ByteString, ByteString>)");
        }
        result = result.length > 0 ? result.map(([name, value]) => {
          validateHeaderName(name);
          validateHeaderValue(name, String(value));
          return [String(name).toLowerCase(), String(value)];
        }) : void 0;
        super(result);
        return new Proxy(this, {
          get(target, p, receiver) {
            switch (p) {
              case "append":
              case "set":
                return (name, value) => {
                  validateHeaderName(name);
                  validateHeaderValue(name, String(value));
                  return URLSearchParams.prototype[p].call(
                    target,
                    String(name).toLowerCase(),
                    String(value)
                  );
                };
              case "delete":
              case "has":
              case "getAll":
                return (name) => {
                  validateHeaderName(name);
                  return URLSearchParams.prototype[p].call(
                    target,
                    String(name).toLowerCase()
                  );
                };
              case "keys":
                return () => {
                  target.sort();
                  return new Set(URLSearchParams.prototype.keys.call(target)).keys();
                };
              default:
                return Reflect.get(target, p, receiver);
            }
          }
        });
      }
      get [Symbol.toStringTag]() {
        return this.constructor.name;
      }
      toString() {
        return Object.prototype.toString.call(this);
      }
      get(name) {
        const values = this.getAll(name);
        if (values.length === 0) {
          return null;
        }
        let value = values.join(", ");
        if (/^content-encoding$/i.test(name)) {
          value = value.toLowerCase();
        }
        return value;
      }
      forEach(callback, thisArg = void 0) {
        for (const name of this.keys()) {
          Reflect.apply(callback, thisArg, [this.get(name), name, this]);
        }
      }
      *values() {
        for (const name of this.keys()) {
          yield this.get(name);
        }
      }
      /**
       * @type {() => IterableIterator<[string, string]>}
       */
      *entries() {
        for (const name of this.keys()) {
          yield [name, this.get(name)];
        }
      }
      [Symbol.iterator]() {
        return this.entries();
      }
      /**
       * Node-fetch non-spec method
       * returning all headers and their values as array
       * @returns {Record<string, string[]>}
       */
      raw() {
        return [...this.keys()].reduce((result, key) => {
          result[key] = this.getAll(key);
          return result;
        }, {});
      }
      /**
       * For better console.log(headers) and also to convert Headers into Node.js Request compatible format
       */
      [Symbol.for("nodejs.util.inspect.custom")]() {
        return [...this.keys()].reduce((result, key) => {
          const values = this.getAll(key);
          if (key === "host") {
            result[key] = values[0];
          } else {
            result[key] = values.length > 1 ? values : values[0];
          }
          return result;
        }, {});
      }
    };
    Object.defineProperties(
      Headers.prototype,
      ["get", "entries", "forEach", "values"].reduce((result, property) => {
        result[property] = { enumerable: true };
        return result;
      }, {})
    );
  }
});

// node_modules/node-fetch/src/utils/is-redirect.js
var redirectStatus, isRedirect;
var init_is_redirect = __esm({
  "node_modules/node-fetch/src/utils/is-redirect.js"() {
    redirectStatus = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
    isRedirect = (code) => {
      return redirectStatus.has(code);
    };
  }
});

// node_modules/node-fetch/src/response.js
var INTERNALS2, Response;
var init_response = __esm({
  "node_modules/node-fetch/src/response.js"() {
    init_headers();
    init_body();
    init_is_redirect();
    INTERNALS2 = Symbol("Response internals");
    Response = class _Response extends Body {
      constructor(body = null, options = {}) {
        super(body, options);
        const status = options.status != null ? options.status : 200;
        const headers = new Headers(options.headers);
        if (body !== null && !headers.has("Content-Type")) {
          const contentType = extractContentType(body, this);
          if (contentType) {
            headers.append("Content-Type", contentType);
          }
        }
        this[INTERNALS2] = {
          type: "default",
          url: options.url,
          status,
          statusText: options.statusText || "",
          headers,
          counter: options.counter,
          highWaterMark: options.highWaterMark
        };
      }
      get type() {
        return this[INTERNALS2].type;
      }
      get url() {
        return this[INTERNALS2].url || "";
      }
      get status() {
        return this[INTERNALS2].status;
      }
      /**
       * Convenience property representing if the request ended normally
       */
      get ok() {
        return this[INTERNALS2].status >= 200 && this[INTERNALS2].status < 300;
      }
      get redirected() {
        return this[INTERNALS2].counter > 0;
      }
      get statusText() {
        return this[INTERNALS2].statusText;
      }
      get headers() {
        return this[INTERNALS2].headers;
      }
      get highWaterMark() {
        return this[INTERNALS2].highWaterMark;
      }
      /**
       * Clone this response
       *
       * @return  Response
       */
      clone() {
        return new _Response(clone(this, this.highWaterMark), {
          type: this.type,
          url: this.url,
          status: this.status,
          statusText: this.statusText,
          headers: this.headers,
          ok: this.ok,
          redirected: this.redirected,
          size: this.size,
          highWaterMark: this.highWaterMark
        });
      }
      /**
       * @param {string} url    The URL that the new response is to originate from.
       * @param {number} status An optional status code for the response (e.g., 302.)
       * @returns {Response}    A Response object.
       */
      static redirect(url, status = 302) {
        if (!isRedirect(status)) {
          throw new RangeError('Failed to execute "redirect" on "response": Invalid status code');
        }
        return new _Response(null, {
          headers: {
            location: new URL(url).toString()
          },
          status
        });
      }
      static error() {
        const response = new _Response(null, { status: 0, statusText: "" });
        response[INTERNALS2].type = "error";
        return response;
      }
      static json(data = void 0, init = {}) {
        const body = JSON.stringify(data);
        if (body === void 0) {
          throw new TypeError("data is not JSON serializable");
        }
        const headers = new Headers(init && init.headers);
        if (!headers.has("content-type")) {
          headers.set("content-type", "application/json");
        }
        return new _Response(body, {
          ...init,
          headers
        });
      }
      get [Symbol.toStringTag]() {
        return "Response";
      }
    };
    Object.defineProperties(Response.prototype, {
      type: { enumerable: true },
      url: { enumerable: true },
      status: { enumerable: true },
      ok: { enumerable: true },
      redirected: { enumerable: true },
      statusText: { enumerable: true },
      headers: { enumerable: true },
      clone: { enumerable: true }
    });
  }
});

// node_modules/node-fetch/src/utils/get-search.js
var getSearch;
var init_get_search = __esm({
  "node_modules/node-fetch/src/utils/get-search.js"() {
    getSearch = (parsedURL) => {
      if (parsedURL.search) {
        return parsedURL.search;
      }
      const lastOffset = parsedURL.href.length - 1;
      const hash = parsedURL.hash || (parsedURL.href[lastOffset] === "#" ? "#" : "");
      return parsedURL.href[lastOffset - hash.length] === "?" ? "?" : "";
    };
  }
});

// node_modules/node-fetch/src/utils/referrer.js
function stripURLForUseAsAReferrer(url, originOnly = false) {
  if (url == null) {
    return "no-referrer";
  }
  url = new URL(url);
  if (/^(about|blob|data):$/.test(url.protocol)) {
    return "no-referrer";
  }
  url.username = "";
  url.password = "";
  url.hash = "";
  if (originOnly) {
    url.pathname = "";
    url.search = "";
  }
  return url;
}
function validateReferrerPolicy(referrerPolicy) {
  if (!ReferrerPolicy.has(referrerPolicy)) {
    throw new TypeError(`Invalid referrerPolicy: ${referrerPolicy}`);
  }
  return referrerPolicy;
}
function isOriginPotentiallyTrustworthy(url) {
  if (/^(http|ws)s:$/.test(url.protocol)) {
    return true;
  }
  const hostIp = url.host.replace(/(^\[)|(]$)/g, "");
  const hostIPVersion = (0, import_node_net.isIP)(hostIp);
  if (hostIPVersion === 4 && /^127\./.test(hostIp)) {
    return true;
  }
  if (hostIPVersion === 6 && /^(((0+:){7})|(::(0+:){0,6}))0*1$/.test(hostIp)) {
    return true;
  }
  if (url.host === "localhost" || url.host.endsWith(".localhost")) {
    return false;
  }
  if (url.protocol === "file:") {
    return true;
  }
  return false;
}
function isUrlPotentiallyTrustworthy(url) {
  if (/^about:(blank|srcdoc)$/.test(url)) {
    return true;
  }
  if (url.protocol === "data:") {
    return true;
  }
  if (/^(blob|filesystem):$/.test(url.protocol)) {
    return true;
  }
  return isOriginPotentiallyTrustworthy(url);
}
function determineRequestsReferrer(request, { referrerURLCallback, referrerOriginCallback } = {}) {
  if (request.referrer === "no-referrer" || request.referrerPolicy === "") {
    return null;
  }
  const policy = request.referrerPolicy;
  if (request.referrer === "about:client") {
    return "no-referrer";
  }
  const referrerSource = request.referrer;
  let referrerURL = stripURLForUseAsAReferrer(referrerSource);
  let referrerOrigin = stripURLForUseAsAReferrer(referrerSource, true);
  if (referrerURL.toString().length > 4096) {
    referrerURL = referrerOrigin;
  }
  if (referrerURLCallback) {
    referrerURL = referrerURLCallback(referrerURL);
  }
  if (referrerOriginCallback) {
    referrerOrigin = referrerOriginCallback(referrerOrigin);
  }
  const currentURL = new URL(request.url);
  switch (policy) {
    case "no-referrer":
      return "no-referrer";
    case "origin":
      return referrerOrigin;
    case "unsafe-url":
      return referrerURL;
    case "strict-origin":
      if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
        return "no-referrer";
      }
      return referrerOrigin.toString();
    case "strict-origin-when-cross-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
        return "no-referrer";
      }
      return referrerOrigin;
    case "same-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      return "no-referrer";
    case "origin-when-cross-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      return referrerOrigin;
    case "no-referrer-when-downgrade":
      if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
        return "no-referrer";
      }
      return referrerURL;
    default:
      throw new TypeError(`Invalid referrerPolicy: ${policy}`);
  }
}
function parseReferrerPolicyFromHeader(headers) {
  const policyTokens = (headers.get("referrer-policy") || "").split(/[,\s]+/);
  let policy = "";
  for (const token of policyTokens) {
    if (token && ReferrerPolicy.has(token)) {
      policy = token;
    }
  }
  return policy;
}
var import_node_net, ReferrerPolicy, DEFAULT_REFERRER_POLICY;
var init_referrer = __esm({
  "node_modules/node-fetch/src/utils/referrer.js"() {
    import_node_net = require("node:net");
    ReferrerPolicy = /* @__PURE__ */ new Set([
      "",
      "no-referrer",
      "no-referrer-when-downgrade",
      "same-origin",
      "origin",
      "strict-origin",
      "origin-when-cross-origin",
      "strict-origin-when-cross-origin",
      "unsafe-url"
    ]);
    DEFAULT_REFERRER_POLICY = "strict-origin-when-cross-origin";
  }
});

// node_modules/node-fetch/src/request.js
var import_node_url, import_node_util3, INTERNALS3, isRequest, doBadDataWarn, Request, getNodeRequestOptions;
var init_request = __esm({
  "node_modules/node-fetch/src/request.js"() {
    import_node_url = require("node:url");
    import_node_util3 = require("node:util");
    init_headers();
    init_body();
    init_is();
    init_get_search();
    init_referrer();
    INTERNALS3 = Symbol("Request internals");
    isRequest = (object) => {
      return typeof object === "object" && typeof object[INTERNALS3] === "object";
    };
    doBadDataWarn = (0, import_node_util3.deprecate)(
      () => {
      },
      ".data is not a valid RequestInit property, use .body instead",
      "https://github.com/node-fetch/node-fetch/issues/1000 (request)"
    );
    Request = class _Request extends Body {
      constructor(input, init = {}) {
        let parsedURL;
        if (isRequest(input)) {
          parsedURL = new URL(input.url);
        } else {
          parsedURL = new URL(input);
          input = {};
        }
        if (parsedURL.username !== "" || parsedURL.password !== "") {
          throw new TypeError(`${parsedURL} is an url with embedded credentials.`);
        }
        let method = init.method || input.method || "GET";
        if (/^(delete|get|head|options|post|put)$/i.test(method)) {
          method = method.toUpperCase();
        }
        if (!isRequest(init) && "data" in init) {
          doBadDataWarn();
        }
        if ((init.body != null || isRequest(input) && input.body !== null) && (method === "GET" || method === "HEAD")) {
          throw new TypeError("Request with GET/HEAD method cannot have body");
        }
        const inputBody = init.body ? init.body : isRequest(input) && input.body !== null ? clone(input) : null;
        super(inputBody, {
          size: init.size || input.size || 0
        });
        const headers = new Headers(init.headers || input.headers || {});
        if (inputBody !== null && !headers.has("Content-Type")) {
          const contentType = extractContentType(inputBody, this);
          if (contentType) {
            headers.set("Content-Type", contentType);
          }
        }
        let signal = isRequest(input) ? input.signal : null;
        if ("signal" in init) {
          signal = init.signal;
        }
        if (signal != null && !isAbortSignal(signal)) {
          throw new TypeError("Expected signal to be an instanceof AbortSignal or EventTarget");
        }
        let referrer = init.referrer == null ? input.referrer : init.referrer;
        if (referrer === "") {
          referrer = "no-referrer";
        } else if (referrer) {
          const parsedReferrer = new URL(referrer);
          referrer = /^about:(\/\/)?client$/.test(parsedReferrer) ? "client" : parsedReferrer;
        } else {
          referrer = void 0;
        }
        this[INTERNALS3] = {
          method,
          redirect: init.redirect || input.redirect || "follow",
          headers,
          parsedURL,
          signal,
          referrer
        };
        this.follow = init.follow === void 0 ? input.follow === void 0 ? 20 : input.follow : init.follow;
        this.compress = init.compress === void 0 ? input.compress === void 0 ? true : input.compress : init.compress;
        this.counter = init.counter || input.counter || 0;
        this.agent = init.agent || input.agent;
        this.highWaterMark = init.highWaterMark || input.highWaterMark || 16384;
        this.insecureHTTPParser = init.insecureHTTPParser || input.insecureHTTPParser || false;
        this.referrerPolicy = init.referrerPolicy || input.referrerPolicy || "";
      }
      /** @returns {string} */
      get method() {
        return this[INTERNALS3].method;
      }
      /** @returns {string} */
      get url() {
        return (0, import_node_url.format)(this[INTERNALS3].parsedURL);
      }
      /** @returns {Headers} */
      get headers() {
        return this[INTERNALS3].headers;
      }
      get redirect() {
        return this[INTERNALS3].redirect;
      }
      /** @returns {AbortSignal} */
      get signal() {
        return this[INTERNALS3].signal;
      }
      // https://fetch.spec.whatwg.org/#dom-request-referrer
      get referrer() {
        if (this[INTERNALS3].referrer === "no-referrer") {
          return "";
        }
        if (this[INTERNALS3].referrer === "client") {
          return "about:client";
        }
        if (this[INTERNALS3].referrer) {
          return this[INTERNALS3].referrer.toString();
        }
        return void 0;
      }
      get referrerPolicy() {
        return this[INTERNALS3].referrerPolicy;
      }
      set referrerPolicy(referrerPolicy) {
        this[INTERNALS3].referrerPolicy = validateReferrerPolicy(referrerPolicy);
      }
      /**
       * Clone this request
       *
       * @return  Request
       */
      clone() {
        return new _Request(this);
      }
      get [Symbol.toStringTag]() {
        return "Request";
      }
    };
    Object.defineProperties(Request.prototype, {
      method: { enumerable: true },
      url: { enumerable: true },
      headers: { enumerable: true },
      redirect: { enumerable: true },
      clone: { enumerable: true },
      signal: { enumerable: true },
      referrer: { enumerable: true },
      referrerPolicy: { enumerable: true }
    });
    getNodeRequestOptions = (request) => {
      const { parsedURL } = request[INTERNALS3];
      const headers = new Headers(request[INTERNALS3].headers);
      if (!headers.has("Accept")) {
        headers.set("Accept", "*/*");
      }
      let contentLengthValue = null;
      if (request.body === null && /^(post|put)$/i.test(request.method)) {
        contentLengthValue = "0";
      }
      if (request.body !== null) {
        const totalBytes = getTotalBytes(request);
        if (typeof totalBytes === "number" && !Number.isNaN(totalBytes)) {
          contentLengthValue = String(totalBytes);
        }
      }
      if (contentLengthValue) {
        headers.set("Content-Length", contentLengthValue);
      }
      if (request.referrerPolicy === "") {
        request.referrerPolicy = DEFAULT_REFERRER_POLICY;
      }
      if (request.referrer && request.referrer !== "no-referrer") {
        request[INTERNALS3].referrer = determineRequestsReferrer(request);
      } else {
        request[INTERNALS3].referrer = "no-referrer";
      }
      if (request[INTERNALS3].referrer instanceof URL) {
        headers.set("Referer", request.referrer);
      }
      if (!headers.has("User-Agent")) {
        headers.set("User-Agent", "node-fetch");
      }
      if (request.compress && !headers.has("Accept-Encoding")) {
        headers.set("Accept-Encoding", "gzip, deflate, br");
      }
      let { agent } = request;
      if (typeof agent === "function") {
        agent = agent(parsedURL);
      }
      const search = getSearch(parsedURL);
      const options = {
        // Overwrite search to retain trailing ? (issue #776)
        path: parsedURL.pathname + search,
        // The following options are not expressed in the URL
        method: request.method,
        headers: headers[Symbol.for("nodejs.util.inspect.custom")](),
        insecureHTTPParser: request.insecureHTTPParser,
        agent
      };
      return {
        /** @type {URL} */
        parsedURL,
        options
      };
    };
  }
});

// node_modules/node-fetch/src/errors/abort-error.js
var AbortError;
var init_abort_error = __esm({
  "node_modules/node-fetch/src/errors/abort-error.js"() {
    init_base();
    AbortError = class extends FetchBaseError {
      constructor(message, type = "aborted") {
        super(message, type);
      }
    };
  }
});

// node_modules/node-fetch/src/index.js
var src_exports = {};
__export(src_exports, {
  AbortError: () => AbortError,
  Blob: () => fetch_blob_default,
  FetchError: () => FetchError,
  File: () => file_default,
  FormData: () => FormData,
  Headers: () => Headers,
  Request: () => Request,
  Response: () => Response,
  blobFrom: () => blobFrom,
  blobFromSync: () => blobFromSync,
  default: () => fetch,
  fileFrom: () => fileFrom,
  fileFromSync: () => fileFromSync,
  isRedirect: () => isRedirect
});
async function fetch(url, options_) {
  return new Promise((resolve, reject) => {
    const request = new Request(url, options_);
    const { parsedURL, options } = getNodeRequestOptions(request);
    if (!supportedSchemas.has(parsedURL.protocol)) {
      throw new TypeError(`node-fetch cannot load ${url}. URL scheme "${parsedURL.protocol.replace(/:$/, "")}" is not supported.`);
    }
    if (parsedURL.protocol === "data:") {
      const data = dist_default(request.url);
      const response2 = new Response(data, { headers: { "Content-Type": data.typeFull } });
      resolve(response2);
      return;
    }
    const send = (parsedURL.protocol === "https:" ? import_node_https.default : import_node_http2.default).request;
    const { signal } = request;
    let response = null;
    const abort = () => {
      const error = new AbortError("The operation was aborted.");
      reject(error);
      if (request.body && request.body instanceof import_node_stream2.default.Readable) {
        request.body.destroy(error);
      }
      if (!response || !response.body) {
        return;
      }
      response.body.emit("error", error);
    };
    if (signal && signal.aborted) {
      abort();
      return;
    }
    const abortAndFinalize = () => {
      abort();
      finalize();
    };
    const request_ = send(parsedURL.toString(), options);
    if (signal) {
      signal.addEventListener("abort", abortAndFinalize);
    }
    const finalize = () => {
      request_.abort();
      if (signal) {
        signal.removeEventListener("abort", abortAndFinalize);
      }
    };
    request_.on("error", (error) => {
      reject(new FetchError(`request to ${request.url} failed, reason: ${error.message}`, "system", error));
      finalize();
    });
    fixResponseChunkedTransferBadEnding(request_, (error) => {
      if (response && response.body) {
        response.body.destroy(error);
      }
    });
    if (process.version < "v14") {
      request_.on("socket", (s2) => {
        let endedWithEventsCount;
        s2.prependListener("end", () => {
          endedWithEventsCount = s2._eventsCount;
        });
        s2.prependListener("close", (hadError) => {
          if (response && endedWithEventsCount < s2._eventsCount && !hadError) {
            const error = new Error("Premature close");
            error.code = "ERR_STREAM_PREMATURE_CLOSE";
            response.body.emit("error", error);
          }
        });
      });
    }
    request_.on("response", (response_) => {
      request_.setTimeout(0);
      const headers = fromRawHeaders(response_.rawHeaders);
      if (isRedirect(response_.statusCode)) {
        const location = headers.get("Location");
        let locationURL = null;
        try {
          locationURL = location === null ? null : new URL(location, request.url);
        } catch {
          if (request.redirect !== "manual") {
            reject(new FetchError(`uri requested responds with an invalid redirect URL: ${location}`, "invalid-redirect"));
            finalize();
            return;
          }
        }
        switch (request.redirect) {
          case "error":
            reject(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, "no-redirect"));
            finalize();
            return;
          case "manual":
            break;
          case "follow": {
            if (locationURL === null) {
              break;
            }
            if (request.counter >= request.follow) {
              reject(new FetchError(`maximum redirect reached at: ${request.url}`, "max-redirect"));
              finalize();
              return;
            }
            const requestOptions = {
              headers: new Headers(request.headers),
              follow: request.follow,
              counter: request.counter + 1,
              agent: request.agent,
              compress: request.compress,
              method: request.method,
              body: clone(request),
              signal: request.signal,
              size: request.size,
              referrer: request.referrer,
              referrerPolicy: request.referrerPolicy
            };
            if (!isDomainOrSubdomain(request.url, locationURL) || !isSameProtocol(request.url, locationURL)) {
              for (const name of ["authorization", "www-authenticate", "cookie", "cookie2"]) {
                requestOptions.headers.delete(name);
              }
            }
            if (response_.statusCode !== 303 && request.body && options_.body instanceof import_node_stream2.default.Readable) {
              reject(new FetchError("Cannot follow redirect with body being a readable stream", "unsupported-redirect"));
              finalize();
              return;
            }
            if (response_.statusCode === 303 || (response_.statusCode === 301 || response_.statusCode === 302) && request.method === "POST") {
              requestOptions.method = "GET";
              requestOptions.body = void 0;
              requestOptions.headers.delete("content-length");
            }
            const responseReferrerPolicy = parseReferrerPolicyFromHeader(headers);
            if (responseReferrerPolicy) {
              requestOptions.referrerPolicy = responseReferrerPolicy;
            }
            resolve(fetch(new Request(locationURL, requestOptions)));
            finalize();
            return;
          }
          default:
            return reject(new TypeError(`Redirect option '${request.redirect}' is not a valid value of RequestRedirect`));
        }
      }
      if (signal) {
        response_.once("end", () => {
          signal.removeEventListener("abort", abortAndFinalize);
        });
      }
      let body = (0, import_node_stream2.pipeline)(response_, new import_node_stream2.PassThrough(), (error) => {
        if (error) {
          reject(error);
        }
      });
      if (process.version < "v12.10") {
        response_.on("aborted", abortAndFinalize);
      }
      const responseOptions = {
        url: request.url,
        status: response_.statusCode,
        statusText: response_.statusMessage,
        headers,
        size: request.size,
        counter: request.counter,
        highWaterMark: request.highWaterMark
      };
      const codings = headers.get("Content-Encoding");
      if (!request.compress || request.method === "HEAD" || codings === null || response_.statusCode === 204 || response_.statusCode === 304) {
        response = new Response(body, responseOptions);
        resolve(response);
        return;
      }
      const zlibOptions = {
        flush: import_node_zlib.default.Z_SYNC_FLUSH,
        finishFlush: import_node_zlib.default.Z_SYNC_FLUSH
      };
      if (codings === "gzip" || codings === "x-gzip") {
        body = (0, import_node_stream2.pipeline)(body, import_node_zlib.default.createGunzip(zlibOptions), (error) => {
          if (error) {
            reject(error);
          }
        });
        response = new Response(body, responseOptions);
        resolve(response);
        return;
      }
      if (codings === "deflate" || codings === "x-deflate") {
        const raw = (0, import_node_stream2.pipeline)(response_, new import_node_stream2.PassThrough(), (error) => {
          if (error) {
            reject(error);
          }
        });
        raw.once("data", (chunk) => {
          if ((chunk[0] & 15) === 8) {
            body = (0, import_node_stream2.pipeline)(body, import_node_zlib.default.createInflate(), (error) => {
              if (error) {
                reject(error);
              }
            });
          } else {
            body = (0, import_node_stream2.pipeline)(body, import_node_zlib.default.createInflateRaw(), (error) => {
              if (error) {
                reject(error);
              }
            });
          }
          response = new Response(body, responseOptions);
          resolve(response);
        });
        raw.once("end", () => {
          if (!response) {
            response = new Response(body, responseOptions);
            resolve(response);
          }
        });
        return;
      }
      if (codings === "br") {
        body = (0, import_node_stream2.pipeline)(body, import_node_zlib.default.createBrotliDecompress(), (error) => {
          if (error) {
            reject(error);
          }
        });
        response = new Response(body, responseOptions);
        resolve(response);
        return;
      }
      response = new Response(body, responseOptions);
      resolve(response);
    });
    writeToStream(request_, request).catch(reject);
  });
}
function fixResponseChunkedTransferBadEnding(request, errorCallback) {
  const LAST_CHUNK = import_node_buffer2.Buffer.from("0\r\n\r\n");
  let isChunkedTransfer = false;
  let properLastChunkReceived = false;
  let previousChunk;
  request.on("response", (response) => {
    const { headers } = response;
    isChunkedTransfer = headers["transfer-encoding"] === "chunked" && !headers["content-length"];
  });
  request.on("socket", (socket) => {
    const onSocketClose = () => {
      if (isChunkedTransfer && !properLastChunkReceived) {
        const error = new Error("Premature close");
        error.code = "ERR_STREAM_PREMATURE_CLOSE";
        errorCallback(error);
      }
    };
    const onData = (buf) => {
      properLastChunkReceived = import_node_buffer2.Buffer.compare(buf.slice(-5), LAST_CHUNK) === 0;
      if (!properLastChunkReceived && previousChunk) {
        properLastChunkReceived = import_node_buffer2.Buffer.compare(previousChunk.slice(-3), LAST_CHUNK.slice(0, 3)) === 0 && import_node_buffer2.Buffer.compare(buf.slice(-2), LAST_CHUNK.slice(3)) === 0;
      }
      previousChunk = buf;
    };
    socket.prependListener("close", onSocketClose);
    socket.on("data", onData);
    request.on("close", () => {
      socket.removeListener("close", onSocketClose);
      socket.removeListener("data", onData);
    });
  });
}
var import_node_http2, import_node_https, import_node_zlib, import_node_stream2, import_node_buffer2, supportedSchemas;
var init_src = __esm({
  "node_modules/node-fetch/src/index.js"() {
    import_node_http2 = __toESM(require("node:http"), 1);
    import_node_https = __toESM(require("node:https"), 1);
    import_node_zlib = __toESM(require("node:zlib"), 1);
    import_node_stream2 = __toESM(require("node:stream"), 1);
    import_node_buffer2 = require("node:buffer");
    init_dist();
    init_body();
    init_response();
    init_headers();
    init_request();
    init_fetch_error();
    init_abort_error();
    init_is_redirect();
    init_esm_min();
    init_is();
    init_referrer();
    init_from();
    supportedSchemas = /* @__PURE__ */ new Set(["data:", "http:", "https:"]);
  }
});

// node_modules/smart-buffer/build/utils.js
var require_utils = __commonJS({
  "node_modules/smart-buffer/build/utils.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var buffer_1 = require("buffer");
    var ERRORS = {
      INVALID_ENCODING: "Invalid encoding provided. Please specify a valid encoding the internal Node.js Buffer supports.",
      INVALID_SMARTBUFFER_SIZE: "Invalid size provided. Size must be a valid integer greater than zero.",
      INVALID_SMARTBUFFER_BUFFER: "Invalid Buffer provided in SmartBufferOptions.",
      INVALID_SMARTBUFFER_OBJECT: "Invalid SmartBufferOptions object supplied to SmartBuffer constructor or factory methods.",
      INVALID_OFFSET: "An invalid offset value was provided.",
      INVALID_OFFSET_NON_NUMBER: "An invalid offset value was provided. A numeric value is required.",
      INVALID_LENGTH: "An invalid length value was provided.",
      INVALID_LENGTH_NON_NUMBER: "An invalid length value was provived. A numeric value is required.",
      INVALID_TARGET_OFFSET: "Target offset is beyond the bounds of the internal SmartBuffer data.",
      INVALID_TARGET_LENGTH: "Specified length value moves cursor beyong the bounds of the internal SmartBuffer data.",
      INVALID_READ_BEYOND_BOUNDS: "Attempted to read beyond the bounds of the managed data.",
      INVALID_WRITE_BEYOND_BOUNDS: "Attempted to write beyond the bounds of the managed data."
    };
    exports2.ERRORS = ERRORS;
    function checkEncoding(encoding) {
      if (!buffer_1.Buffer.isEncoding(encoding)) {
        throw new Error(ERRORS.INVALID_ENCODING);
      }
    }
    exports2.checkEncoding = checkEncoding;
    function isFiniteInteger(value) {
      return typeof value === "number" && isFinite(value) && isInteger(value);
    }
    exports2.isFiniteInteger = isFiniteInteger;
    function checkOffsetOrLengthValue(value, offset) {
      if (typeof value === "number") {
        if (!isFiniteInteger(value) || value < 0) {
          throw new Error(offset ? ERRORS.INVALID_OFFSET : ERRORS.INVALID_LENGTH);
        }
      } else {
        throw new Error(offset ? ERRORS.INVALID_OFFSET_NON_NUMBER : ERRORS.INVALID_LENGTH_NON_NUMBER);
      }
    }
    function checkLengthValue(length) {
      checkOffsetOrLengthValue(length, false);
    }
    exports2.checkLengthValue = checkLengthValue;
    function checkOffsetValue(offset) {
      checkOffsetOrLengthValue(offset, true);
    }
    exports2.checkOffsetValue = checkOffsetValue;
    function checkTargetOffset(offset, buff) {
      if (offset < 0 || offset > buff.length) {
        throw new Error(ERRORS.INVALID_TARGET_OFFSET);
      }
    }
    exports2.checkTargetOffset = checkTargetOffset;
    function isInteger(value) {
      return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
    }
    function bigIntAndBufferInt64Check(bufferMethod) {
      if (typeof BigInt === "undefined") {
        throw new Error("Platform does not support JS BigInt type.");
      }
      if (typeof buffer_1.Buffer.prototype[bufferMethod] === "undefined") {
        throw new Error(`Platform does not support Buffer.prototype.${bufferMethod}.`);
      }
    }
    exports2.bigIntAndBufferInt64Check = bigIntAndBufferInt64Check;
  }
});

// node_modules/smart-buffer/build/smartbuffer.js
var require_smartbuffer = __commonJS({
  "node_modules/smart-buffer/build/smartbuffer.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var utils_1 = require_utils();
    var DEFAULT_SMARTBUFFER_SIZE = 4096;
    var DEFAULT_SMARTBUFFER_ENCODING = "utf8";
    var SmartBuffer = class _SmartBuffer {
      /**
       * Creates a new SmartBuffer instance.
       *
       * @param options { SmartBufferOptions } The SmartBufferOptions to apply to this instance.
       */
      constructor(options) {
        this.length = 0;
        this._encoding = DEFAULT_SMARTBUFFER_ENCODING;
        this._writeOffset = 0;
        this._readOffset = 0;
        if (_SmartBuffer.isSmartBufferOptions(options)) {
          if (options.encoding) {
            utils_1.checkEncoding(options.encoding);
            this._encoding = options.encoding;
          }
          if (options.size) {
            if (utils_1.isFiniteInteger(options.size) && options.size > 0) {
              this._buff = Buffer.allocUnsafe(options.size);
            } else {
              throw new Error(utils_1.ERRORS.INVALID_SMARTBUFFER_SIZE);
            }
          } else if (options.buff) {
            if (Buffer.isBuffer(options.buff)) {
              this._buff = options.buff;
              this.length = options.buff.length;
            } else {
              throw new Error(utils_1.ERRORS.INVALID_SMARTBUFFER_BUFFER);
            }
          } else {
            this._buff = Buffer.allocUnsafe(DEFAULT_SMARTBUFFER_SIZE);
          }
        } else {
          if (typeof options !== "undefined") {
            throw new Error(utils_1.ERRORS.INVALID_SMARTBUFFER_OBJECT);
          }
          this._buff = Buffer.allocUnsafe(DEFAULT_SMARTBUFFER_SIZE);
        }
      }
      /**
       * Creates a new SmartBuffer instance with the provided internal Buffer size and optional encoding.
       *
       * @param size { Number } The size of the internal Buffer.
       * @param encoding { String } The BufferEncoding to use for strings.
       *
       * @return { SmartBuffer }
       */
      static fromSize(size, encoding) {
        return new this({
          size,
          encoding
        });
      }
      /**
       * Creates a new SmartBuffer instance with the provided Buffer and optional encoding.
       *
       * @param buffer { Buffer } The Buffer to use as the internal Buffer value.
       * @param encoding { String } The BufferEncoding to use for strings.
       *
       * @return { SmartBuffer }
       */
      static fromBuffer(buff, encoding) {
        return new this({
          buff,
          encoding
        });
      }
      /**
       * Creates a new SmartBuffer instance with the provided SmartBufferOptions options.
       *
       * @param options { SmartBufferOptions } The options to use when creating the SmartBuffer instance.
       */
      static fromOptions(options) {
        return new this(options);
      }
      /**
       * Type checking function that determines if an object is a SmartBufferOptions object.
       */
      static isSmartBufferOptions(options) {
        const castOptions = options;
        return castOptions && (castOptions.encoding !== void 0 || castOptions.size !== void 0 || castOptions.buff !== void 0);
      }
      // Signed integers
      /**
       * Reads an Int8 value from the current read position or an optionally provided offset.
       *
       * @param offset { Number } The offset to read data from (optional)
       * @return { Number }
       */
      readInt8(offset) {
        return this._readNumberValue(Buffer.prototype.readInt8, 1, offset);
      }
      /**
       * Reads an Int16BE value from the current read position or an optionally provided offset.
       *
       * @param offset { Number } The offset to read data from (optional)
       * @return { Number }
       */
      readInt16BE(offset) {
        return this._readNumberValue(Buffer.prototype.readInt16BE, 2, offset);
      }
      /**
       * Reads an Int16LE value from the current read position or an optionally provided offset.
       *
       * @param offset { Number } The offset to read data from (optional)
       * @return { Number }
       */
      readInt16LE(offset) {
        return this._readNumberValue(Buffer.prototype.readInt16LE, 2, offset);
      }
      /**
       * Reads an Int32BE value from the current read position or an optionally provided offset.
       *
       * @param offset { Number } The offset to read data from (optional)
       * @return { Number }
       */
      readInt32BE(offset) {
        return this._readNumberValue(Buffer.prototype.readInt32BE, 4, offset);
      }
      /**
       * Reads an Int32LE value from the current read position or an optionally provided offset.
       *
       * @param offset { Number } The offset to read data from (optional)
       * @return { Number }
       */
      readInt32LE(offset) {
        return this._readNumberValue(Buffer.prototype.readInt32LE, 4, offset);
      }
      /**
       * Reads a BigInt64BE value from the current read position or an optionally provided offset.
       *
       * @param offset { Number } The offset to read data from (optional)
       * @return { BigInt }
       */
      readBigInt64BE(offset) {
        utils_1.bigIntAndBufferInt64Check("readBigInt64BE");
        return this._readNumberValue(Buffer.prototype.readBigInt64BE, 8, offset);
      }
      /**
       * Reads a BigInt64LE value from the current read position or an optionally provided offset.
       *
       * @param offset { Number } The offset to read data from (optional)
       * @return { BigInt }
       */
      readBigInt64LE(offset) {
        utils_1.bigIntAndBufferInt64Check("readBigInt64LE");
        return this._readNumberValue(Buffer.prototype.readBigInt64LE, 8, offset);
      }
      /**
       * Writes an Int8 value to the current write position (or at optional offset).
       *
       * @param value { Number } The value to write.
       * @param offset { Number } The offset to write the value at.
       *
       * @return this
       */
      writeInt8(value, offset) {
        this._writeNumberValue(Buffer.prototype.writeInt8, 1, value, offset);
        return this;
      }
      /**
       * Inserts an Int8 value at the given offset value.
       *
       * @param value { Number } The value to insert.
       * @param offset { Number } The offset to insert the value at.
       *
       * @return this
       */
      insertInt8(value, offset) {
        return this._insertNumberValue(Buffer.prototype.writeInt8, 1, value, offset);
      }
      /**
       * Writes an Int16BE value to the current write position (or at optional offset).
       *
       * @param value { Number } The value to write.
       * @param offset { Number } The offset to write the value at.
       *
       * @return this
       */
      writeInt16BE(value, offset) {
        return this._writeNumberValue(Buffer.prototype.writeInt16BE, 2, value, offset);
      }
      /**
       * Inserts an Int16BE value at the given offset value.
       *
       * @param value { Number } The value to insert.
       * @param offset { Number } The offset to insert the value at.
       *
       * @return this
       */
      insertInt16BE(value, offset) {
        return this._insertNumberValue(Buffer.prototype.writeInt16BE, 2, value, offset);
      }
      /**
       * Writes an Int16LE value to the current write position (or at optional offset).
       *
       * @param value { Number } The value to write.
       * @param offset { Number } The offset to write the value at.
       *
       * @return this
       */
      writeInt16LE(value, offset) {
        return this._writeNumberValue(Buffer.prototype.writeInt16LE, 2, value, offset);
      }
      /**
       * Inserts an Int16LE value at the given offset value.
       *
       * @param value { Number } The value to insert.
       * @param offset { Number } The offset to insert the value at.
       *
       * @return this
       */
      insertInt16LE(value, offset) {
        return this._insertNumberValue(Buffer.prototype.writeInt16LE, 2, value, offset);
      }
      /**
       * Writes an Int32BE value to the current write position (or at optional offset).
       *
       * @param value { Number } The value to write.
       * @param offset { Number } The offset to write the value at.
       *
       * @return this
       */
      writeInt32BE(value, offset) {
        return this._writeNumberValue(Buffer.prototype.writeInt32BE, 4, value, offset);
      }
      /**
       * Inserts an Int32BE value at the given offset value.
       *
       * @param value { Number } The value to insert.
       * @param offset { Number } The offset to insert the value at.
       *
       * @return this
       */
      insertInt32BE(value, offset) {
        return this._insertNumberValue(Buffer.prototype.writeInt32BE, 4, value, offset);
      }
      /**
       * Writes an Int32LE value to the current write position (or at optional offset).
       *
       * @param value { Number } The value to write.
       * @param offset { Number } The offset to write the value at.
       *
       * @return this
       */
      writeInt32LE(value, offset) {
        return this._writeNumberValue(Buffer.prototype.writeInt32LE, 4, value, offset);
      }
      /**
       * Inserts an Int32LE value at the given offset value.
       *
       * @param value { Number } The value to insert.
       * @param offset { Number } The offset to insert the value at.
       *
       * @return this
       */
      insertInt32LE(value, offset) {
        return this._insertNumberValue(Buffer.prototype.writeInt32LE, 4, value, offset);
      }
      /**
       * Writes a BigInt64BE value to the current write position (or at optional offset).
       *
       * @param value { BigInt } The value to write.
       * @param offset { Number } The offset to write the value at.
       *
       * @return this
       */
      writeBigInt64BE(value, offset) {
        utils_1.bigIntAndBufferInt64Check("writeBigInt64BE");
        return this._writeNumberValue(Buffer.prototype.writeBigInt64BE, 8, value, offset);
      }
      /**
       * Inserts a BigInt64BE value at the given offset value.
       *
       * @param value { BigInt } The value to insert.
       * @param offset { Number } The offset to insert the value at.
       *
       * @return this
       */
      insertBigInt64BE(value, offset) {
        utils_1.bigIntAndBufferInt64Check("writeBigInt64BE");
        return this._insertNumberValue(Buffer.prototype.writeBigInt64BE, 8, value, offset);
      }
      /**
       * Writes a BigInt64LE value to the current write position (or at optional offset).
       *
       * @param value { BigInt } The value to write.
       * @param offset { Number } The offset to write the value at.
       *
       * @return this
       */
      writeBigInt64LE(value, offset) {
        utils_1.bigIntAndBufferInt64Check("writeBigInt64LE");
        return this._writeNumberValue(Buffer.prototype.writeBigInt64LE, 8, value, offset);
      }
      /**
       * Inserts a Int64LE value at the given offset value.
       *
       * @param value { BigInt } The value to insert.
       * @param offset { Number } The offset to insert the value at.
       *
       * @return this
       */
      insertBigInt64LE(value, offset) {
        utils_1.bigIntAndBufferInt64Check("writeBigInt64LE");
        return this._insertNumberValue(Buffer.prototype.writeBigInt64LE, 8, value, offset);
      }
      // Unsigned Integers
      /**
       * Reads an UInt8 value from the current read position or an optionally provided offset.
       *
       * @param offset { Number } The offset to read data from (optional)
       * @return { Number }
       */
      readUInt8(offset) {
        return this._readNumberValue(Buffer.prototype.readUInt8, 1, offset);
      }
      /**
       * Reads an UInt16BE value from the current read position or an optionally provided offset.
       *
       * @param offset { Number } The offset to read data from (optional)
       * @return { Number }
       */
      readUInt16BE(offset) {
        return this._readNumberValue(Buffer.prototype.readUInt16BE, 2, offset);
      }
      /**
       * Reads an UInt16LE value from the current read position or an optionally provided offset.
       *
       * @param offset { Number } The offset to read data from (optional)
       * @return { Number }
       */
      readUInt16LE(offset) {
        return this._readNumberValue(Buffer.prototype.readUInt16LE, 2, offset);
      }
      /**
       * Reads an UInt32BE value from the current read position or an optionally provided offset.
       *
       * @param offset { Number } The offset to read data from (optional)
       * @return { Number }
       */
      readUInt32BE(offset) {
        return this._readNumberValue(Buffer.prototype.readUInt32BE, 4, offset);
      }
      /**
       * Reads an UInt32LE value from the current read position or an optionally provided offset.
       *
       * @param offset { Number } The offset to read data from (optional)
       * @return { Number }
       */
      readUInt32LE(offset) {
        return this._readNumberValue(Buffer.prototype.readUInt32LE, 4, offset);
      }
      /**
       * Reads a BigUInt64BE value from the current read position or an optionally provided offset.
       *
       * @param offset { Number } The offset to read data from (optional)
       * @return { BigInt }
       */
      readBigUInt64BE(offset) {
        utils_1.bigIntAndBufferInt64Check("readBigUInt64BE");
        return this._readNumberValue(Buffer.prototype.readBigUInt64BE, 8, offset);
      }
      /**
       * Reads a BigUInt64LE value from the current read position or an optionally provided offset.
       *
       * @param offset { Number } The offset to read data from (optional)
       * @return { BigInt }
       */
      readBigUInt64LE(offset) {
        utils_1.bigIntAndBufferInt64Check("readBigUInt64LE");
        return this._readNumberValue(Buffer.prototype.readBigUInt64LE, 8, offset);
      }
      /**
       * Writes an UInt8 value to the current write position (or at optional offset).
       *
       * @param value { Number } The value to write.
       * @param offset { Number } The offset to write the value at.
       *
       * @return this
       */
      writeUInt8(value, offset) {
        return this._writeNumberValue(Buffer.prototype.writeUInt8, 1, value, offset);
      }
      /**
       * Inserts an UInt8 value at the given offset value.
       *
       * @param value { Number } The value to insert.
       * @param offset { Number } The offset to insert the value at.
       *
       * @return this
       */
      insertUInt8(value, offset) {
        return this._insertNumberValue(Buffer.prototype.writeUInt8, 1, value, offset);
      }
      /**
       * Writes an UInt16BE value to the current write position (or at optional offset).
       *
       * @param value { Number } The value to write.
       * @param offset { Number } The offset to write the value at.
       *
       * @return this
       */
      writeUInt16BE(value, offset) {
        return this._writeNumberValue(Buffer.prototype.writeUInt16BE, 2, value, offset);
      }
      /**
       * Inserts an UInt16BE value at the given offset value.
       *
       * @param value { Number } The value to insert.
       * @param offset { Number } The offset to insert the value at.
       *
       * @return this
       */
      insertUInt16BE(value, offset) {
        return this._insertNumberValue(Buffer.prototype.writeUInt16BE, 2, value, offset);
      }
      /**
       * Writes an UInt16LE value to the current write position (or at optional offset).
       *
       * @param value { Number } The value to write.
       * @param offset { Number } The offset to write the value at.
       *
       * @return this
       */
      writeUInt16LE(value, offset) {
        return this._writeNumberValue(Buffer.prototype.writeUInt16LE, 2, value, offset);
      }
      /**
       * Inserts an UInt16LE value at the given offset value.
       *
       * @param value { Number } The value to insert.
       * @param offset { Number } The offset to insert the value at.
       *
       * @return this
       */
      insertUInt16LE(value, offset) {
        return this._insertNumberValue(Buffer.prototype.writeUInt16LE, 2, value, offset);
      }
      /**
       * Writes an UInt32BE value to the current write position (or at optional offset).
       *
       * @param value { Number } The value to write.
       * @param offset { Number } The offset to write the value at.
       *
       * @return this
       */
      writeUInt32BE(value, offset) {
        return this._writeNumberValue(Buffer.prototype.writeUInt32BE, 4, value, offset);
      }
      /**
       * Inserts an UInt32BE value at the given offset value.
       *
       * @param value { Number } The value to insert.
       * @param offset { Number } The offset to insert the value at.
       *
       * @return this
       */
      insertUInt32BE(value, offset) {
        return this._insertNumberValue(Buffer.prototype.writeUInt32BE, 4, value, offset);
      }
      /**
       * Writes an UInt32LE value to the current write position (or at optional offset).
       *
       * @param value { Number } The value to write.
       * @param offset { Number } The offset to write the value at.
       *
       * @return this
       */
      writeUInt32LE(value, offset) {
        return this._writeNumberValue(Buffer.prototype.writeUInt32LE, 4, value, offset);
      }
      /**
       * Inserts an UInt32LE value at the given offset value.
       *
       * @param value { Number } The value to insert.
       * @param offset { Number } The offset to insert the value at.
       *
       * @return this
       */
      insertUInt32LE(value, offset) {
        return this._insertNumberValue(Buffer.prototype.writeUInt32LE, 4, value, offset);
      }
      /**
       * Writes a BigUInt64BE value to the current write position (or at optional offset).
       *
       * @param value { Number } The value to write.
       * @param offset { Number } The offset to write the value at.
       *
       * @return this
       */
      writeBigUInt64BE(value, offset) {
        utils_1.bigIntAndBufferInt64Check("writeBigUInt64BE");
        return this._writeNumberValue(Buffer.prototype.writeBigUInt64BE, 8, value, offset);
      }
      /**
       * Inserts a BigUInt64BE value at the given offset value.
       *
       * @param value { Number } The value to insert.
       * @param offset { Number } The offset to insert the value at.
       *
       * @return this
       */
      insertBigUInt64BE(value, offset) {
        utils_1.bigIntAndBufferInt64Check("writeBigUInt64BE");
        return this._insertNumberValue(Buffer.prototype.writeBigUInt64BE, 8, value, offset);
      }
      /**
       * Writes a BigUInt64LE value to the current write position (or at optional offset).
       *
       * @param value { Number } The value to write.
       * @param offset { Number } The offset to write the value at.
       *
       * @return this
       */
      writeBigUInt64LE(value, offset) {
        utils_1.bigIntAndBufferInt64Check("writeBigUInt64LE");
        return this._writeNumberValue(Buffer.prototype.writeBigUInt64LE, 8, value, offset);
      }
      /**
       * Inserts a BigUInt64LE value at the given offset value.
       *
       * @param value { Number } The value to insert.
       * @param offset { Number } The offset to insert the value at.
       *
       * @return this
       */
      insertBigUInt64LE(value, offset) {
        utils_1.bigIntAndBufferInt64Check("writeBigUInt64LE");
        return this._insertNumberValue(Buffer.prototype.writeBigUInt64LE, 8, value, offset);
      }
      // Floating Point
      /**
       * Reads an FloatBE value from the current read position or an optionally provided offset.
       *
       * @param offset { Number } The offset to read data from (optional)
       * @return { Number }
       */
      readFloatBE(offset) {
        return this._readNumberValue(Buffer.prototype.readFloatBE, 4, offset);
      }
      /**
       * Reads an FloatLE value from the current read position or an optionally provided offset.
       *
       * @param offset { Number } The offset to read data from (optional)
       * @return { Number }
       */
      readFloatLE(offset) {
        return this._readNumberValue(Buffer.prototype.readFloatLE, 4, offset);
      }
      /**
       * Writes a FloatBE value to the current write position (or at optional offset).
       *
       * @param value { Number } The value to write.
       * @param offset { Number } The offset to write the value at.
       *
       * @return this
       */
      writeFloatBE(value, offset) {
        return this._writeNumberValue(Buffer.prototype.writeFloatBE, 4, value, offset);
      }
      /**
       * Inserts a FloatBE value at the given offset value.
       *
       * @param value { Number } The value to insert.
       * @param offset { Number } The offset to insert the value at.
       *
       * @return this
       */
      insertFloatBE(value, offset) {
        return this._insertNumberValue(Buffer.prototype.writeFloatBE, 4, value, offset);
      }
      /**
       * Writes a FloatLE value to the current write position (or at optional offset).
       *
       * @param value { Number } The value to write.
       * @param offset { Number } The offset to write the value at.
       *
       * @return this
       */
      writeFloatLE(value, offset) {
        return this._writeNumberValue(Buffer.prototype.writeFloatLE, 4, value, offset);
      }
      /**
       * Inserts a FloatLE value at the given offset value.
       *
       * @param value { Number } The value to insert.
       * @param offset { Number } The offset to insert the value at.
       *
       * @return this
       */
      insertFloatLE(value, offset) {
        return this._insertNumberValue(Buffer.prototype.writeFloatLE, 4, value, offset);
      }
      // Double Floating Point
      /**
       * Reads an DoublEBE value from the current read position or an optionally provided offset.
       *
       * @param offset { Number } The offset to read data from (optional)
       * @return { Number }
       */
      readDoubleBE(offset) {
        return this._readNumberValue(Buffer.prototype.readDoubleBE, 8, offset);
      }
      /**
       * Reads an DoubleLE value from the current read position or an optionally provided offset.
       *
       * @param offset { Number } The offset to read data from (optional)
       * @return { Number }
       */
      readDoubleLE(offset) {
        return this._readNumberValue(Buffer.prototype.readDoubleLE, 8, offset);
      }
      /**
       * Writes a DoubleBE value to the current write position (or at optional offset).
       *
       * @param value { Number } The value to write.
       * @param offset { Number } The offset to write the value at.
       *
       * @return this
       */
      writeDoubleBE(value, offset) {
        return this._writeNumberValue(Buffer.prototype.writeDoubleBE, 8, value, offset);
      }
      /**
       * Inserts a DoubleBE value at the given offset value.
       *
       * @param value { Number } The value to insert.
       * @param offset { Number } The offset to insert the value at.
       *
       * @return this
       */
      insertDoubleBE(value, offset) {
        return this._insertNumberValue(Buffer.prototype.writeDoubleBE, 8, value, offset);
      }
      /**
       * Writes a DoubleLE value to the current write position (or at optional offset).
       *
       * @param value { Number } The value to write.
       * @param offset { Number } The offset to write the value at.
       *
       * @return this
       */
      writeDoubleLE(value, offset) {
        return this._writeNumberValue(Buffer.prototype.writeDoubleLE, 8, value, offset);
      }
      /**
       * Inserts a DoubleLE value at the given offset value.
       *
       * @param value { Number } The value to insert.
       * @param offset { Number } The offset to insert the value at.
       *
       * @return this
       */
      insertDoubleLE(value, offset) {
        return this._insertNumberValue(Buffer.prototype.writeDoubleLE, 8, value, offset);
      }
      // Strings
      /**
       * Reads a String from the current read position.
       *
       * @param arg1 { Number | String } The number of bytes to read as a String, or the BufferEncoding to use for
       *             the string (Defaults to instance level encoding).
       * @param encoding { String } The BufferEncoding to use for the string (Defaults to instance level encoding).
       *
       * @return { String }
       */
      readString(arg1, encoding) {
        let lengthVal;
        if (typeof arg1 === "number") {
          utils_1.checkLengthValue(arg1);
          lengthVal = Math.min(arg1, this.length - this._readOffset);
        } else {
          encoding = arg1;
          lengthVal = this.length - this._readOffset;
        }
        if (typeof encoding !== "undefined") {
          utils_1.checkEncoding(encoding);
        }
        const value = this._buff.slice(this._readOffset, this._readOffset + lengthVal).toString(encoding || this._encoding);
        this._readOffset += lengthVal;
        return value;
      }
      /**
       * Inserts a String
       *
       * @param value { String } The String value to insert.
       * @param offset { Number } The offset to insert the string at.
       * @param encoding { String } The BufferEncoding to use for writing strings (defaults to instance encoding).
       *
       * @return this
       */
      insertString(value, offset, encoding) {
        utils_1.checkOffsetValue(offset);
        return this._handleString(value, true, offset, encoding);
      }
      /**
       * Writes a String
       *
       * @param value { String } The String value to write.
       * @param arg2 { Number | String } The offset to write the string at, or the BufferEncoding to use.
       * @param encoding { String } The BufferEncoding to use for writing strings (defaults to instance encoding).
       *
       * @return this
       */
      writeString(value, arg2, encoding) {
        return this._handleString(value, false, arg2, encoding);
      }
      /**
       * Reads a null-terminated String from the current read position.
       *
       * @param encoding { String } The BufferEncoding to use for the string (Defaults to instance level encoding).
       *
       * @return { String }
       */
      readStringNT(encoding) {
        if (typeof encoding !== "undefined") {
          utils_1.checkEncoding(encoding);
        }
        let nullPos = this.length;
        for (let i2 = this._readOffset; i2 < this.length; i2++) {
          if (this._buff[i2] === 0) {
            nullPos = i2;
            break;
          }
        }
        const value = this._buff.slice(this._readOffset, nullPos);
        this._readOffset = nullPos + 1;
        return value.toString(encoding || this._encoding);
      }
      /**
       * Inserts a null-terminated String.
       *
       * @param value { String } The String value to write.
       * @param arg2 { Number | String } The offset to write the string to, or the BufferEncoding to use.
       * @param encoding { String } The BufferEncoding to use for writing strings (defaults to instance encoding).
       *
       * @return this
       */
      insertStringNT(value, offset, encoding) {
        utils_1.checkOffsetValue(offset);
        this.insertString(value, offset, encoding);
        this.insertUInt8(0, offset + value.length);
        return this;
      }
      /**
       * Writes a null-terminated String.
       *
       * @param value { String } The String value to write.
       * @param arg2 { Number | String } The offset to write the string to, or the BufferEncoding to use.
       * @param encoding { String } The BufferEncoding to use for writing strings (defaults to instance encoding).
       *
       * @return this
       */
      writeStringNT(value, arg2, encoding) {
        this.writeString(value, arg2, encoding);
        this.writeUInt8(0, typeof arg2 === "number" ? arg2 + value.length : this.writeOffset);
        return this;
      }
      // Buffers
      /**
       * Reads a Buffer from the internal read position.
       *
       * @param length { Number } The length of data to read as a Buffer.
       *
       * @return { Buffer }
       */
      readBuffer(length) {
        if (typeof length !== "undefined") {
          utils_1.checkLengthValue(length);
        }
        const lengthVal = typeof length === "number" ? length : this.length;
        const endPoint = Math.min(this.length, this._readOffset + lengthVal);
        const value = this._buff.slice(this._readOffset, endPoint);
        this._readOffset = endPoint;
        return value;
      }
      /**
       * Writes a Buffer to the current write position.
       *
       * @param value { Buffer } The Buffer to write.
       * @param offset { Number } The offset to write the Buffer to.
       *
       * @return this
       */
      insertBuffer(value, offset) {
        utils_1.checkOffsetValue(offset);
        return this._handleBuffer(value, true, offset);
      }
      /**
       * Writes a Buffer to the current write position.
       *
       * @param value { Buffer } The Buffer to write.
       * @param offset { Number } The offset to write the Buffer to.
       *
       * @return this
       */
      writeBuffer(value, offset) {
        return this._handleBuffer(value, false, offset);
      }
      /**
       * Reads a null-terminated Buffer from the current read poisiton.
       *
       * @return { Buffer }
       */
      readBufferNT() {
        let nullPos = this.length;
        for (let i2 = this._readOffset; i2 < this.length; i2++) {
          if (this._buff[i2] === 0) {
            nullPos = i2;
            break;
          }
        }
        const value = this._buff.slice(this._readOffset, nullPos);
        this._readOffset = nullPos + 1;
        return value;
      }
      /**
       * Inserts a null-terminated Buffer.
       *
       * @param value { Buffer } The Buffer to write.
       * @param offset { Number } The offset to write the Buffer to.
       *
       * @return this
       */
      insertBufferNT(value, offset) {
        utils_1.checkOffsetValue(offset);
        this.insertBuffer(value, offset);
        this.insertUInt8(0, offset + value.length);
        return this;
      }
      /**
       * Writes a null-terminated Buffer.
       *
       * @param value { Buffer } The Buffer to write.
       * @param offset { Number } The offset to write the Buffer to.
       *
       * @return this
       */
      writeBufferNT(value, offset) {
        if (typeof offset !== "undefined") {
          utils_1.checkOffsetValue(offset);
        }
        this.writeBuffer(value, offset);
        this.writeUInt8(0, typeof offset === "number" ? offset + value.length : this._writeOffset);
        return this;
      }
      /**
       * Clears the SmartBuffer instance to its original empty state.
       */
      clear() {
        this._writeOffset = 0;
        this._readOffset = 0;
        this.length = 0;
        return this;
      }
      /**
       * Gets the remaining data left to be read from the SmartBuffer instance.
       *
       * @return { Number }
       */
      remaining() {
        return this.length - this._readOffset;
      }
      /**
       * Gets the current read offset value of the SmartBuffer instance.
       *
       * @return { Number }
       */
      get readOffset() {
        return this._readOffset;
      }
      /**
       * Sets the read offset value of the SmartBuffer instance.
       *
       * @param offset { Number } - The offset value to set.
       */
      set readOffset(offset) {
        utils_1.checkOffsetValue(offset);
        utils_1.checkTargetOffset(offset, this);
        this._readOffset = offset;
      }
      /**
       * Gets the current write offset value of the SmartBuffer instance.
       *
       * @return { Number }
       */
      get writeOffset() {
        return this._writeOffset;
      }
      /**
       * Sets the write offset value of the SmartBuffer instance.
       *
       * @param offset { Number } - The offset value to set.
       */
      set writeOffset(offset) {
        utils_1.checkOffsetValue(offset);
        utils_1.checkTargetOffset(offset, this);
        this._writeOffset = offset;
      }
      /**
       * Gets the currently set string encoding of the SmartBuffer instance.
       *
       * @return { BufferEncoding } The string Buffer encoding currently set.
       */
      get encoding() {
        return this._encoding;
      }
      /**
       * Sets the string encoding of the SmartBuffer instance.
       *
       * @param encoding { BufferEncoding } The string Buffer encoding to set.
       */
      set encoding(encoding) {
        utils_1.checkEncoding(encoding);
        this._encoding = encoding;
      }
      /**
       * Gets the underlying internal Buffer. (This includes unmanaged data in the Buffer)
       *
       * @return { Buffer } The Buffer value.
       */
      get internalBuffer() {
        return this._buff;
      }
      /**
       * Gets the value of the internal managed Buffer (Includes managed data only)
       *
       * @param { Buffer }
       */
      toBuffer() {
        return this._buff.slice(0, this.length);
      }
      /**
       * Gets the String value of the internal managed Buffer
       *
       * @param encoding { String } The BufferEncoding to display the Buffer as (defaults to instance level encoding).
       */
      toString(encoding) {
        const encodingVal = typeof encoding === "string" ? encoding : this._encoding;
        utils_1.checkEncoding(encodingVal);
        return this._buff.toString(encodingVal, 0, this.length);
      }
      /**
       * Destroys the SmartBuffer instance.
       */
      destroy() {
        this.clear();
        return this;
      }
      /**
       * Handles inserting and writing strings.
       *
       * @param value { String } The String value to insert.
       * @param isInsert { Boolean } True if inserting a string, false if writing.
       * @param arg2 { Number | String } The offset to insert the string at, or the BufferEncoding to use.
       * @param encoding { String } The BufferEncoding to use for writing strings (defaults to instance encoding).
       */
      _handleString(value, isInsert, arg3, encoding) {
        let offsetVal = this._writeOffset;
        let encodingVal = this._encoding;
        if (typeof arg3 === "number") {
          offsetVal = arg3;
        } else if (typeof arg3 === "string") {
          utils_1.checkEncoding(arg3);
          encodingVal = arg3;
        }
        if (typeof encoding === "string") {
          utils_1.checkEncoding(encoding);
          encodingVal = encoding;
        }
        const byteLength = Buffer.byteLength(value, encodingVal);
        if (isInsert) {
          this.ensureInsertable(byteLength, offsetVal);
        } else {
          this._ensureWriteable(byteLength, offsetVal);
        }
        this._buff.write(value, offsetVal, byteLength, encodingVal);
        if (isInsert) {
          this._writeOffset += byteLength;
        } else {
          if (typeof arg3 === "number") {
            this._writeOffset = Math.max(this._writeOffset, offsetVal + byteLength);
          } else {
            this._writeOffset += byteLength;
          }
        }
        return this;
      }
      /**
       * Handles writing or insert of a Buffer.
       *
       * @param value { Buffer } The Buffer to write.
       * @param offset { Number } The offset to write the Buffer to.
       */
      _handleBuffer(value, isInsert, offset) {
        const offsetVal = typeof offset === "number" ? offset : this._writeOffset;
        if (isInsert) {
          this.ensureInsertable(value.length, offsetVal);
        } else {
          this._ensureWriteable(value.length, offsetVal);
        }
        value.copy(this._buff, offsetVal);
        if (isInsert) {
          this._writeOffset += value.length;
        } else {
          if (typeof offset === "number") {
            this._writeOffset = Math.max(this._writeOffset, offsetVal + value.length);
          } else {
            this._writeOffset += value.length;
          }
        }
        return this;
      }
      /**
       * Ensures that the internal Buffer is large enough to read data.
       *
       * @param length { Number } The length of the data that needs to be read.
       * @param offset { Number } The offset of the data that needs to be read.
       */
      ensureReadable(length, offset) {
        let offsetVal = this._readOffset;
        if (typeof offset !== "undefined") {
          utils_1.checkOffsetValue(offset);
          offsetVal = offset;
        }
        if (offsetVal < 0 || offsetVal + length > this.length) {
          throw new Error(utils_1.ERRORS.INVALID_READ_BEYOND_BOUNDS);
        }
      }
      /**
       * Ensures that the internal Buffer is large enough to insert data.
       *
       * @param dataLength { Number } The length of the data that needs to be written.
       * @param offset { Number } The offset of the data to be written.
       */
      ensureInsertable(dataLength, offset) {
        utils_1.checkOffsetValue(offset);
        this._ensureCapacity(this.length + dataLength);
        if (offset < this.length) {
          this._buff.copy(this._buff, offset + dataLength, offset, this._buff.length);
        }
        if (offset + dataLength > this.length) {
          this.length = offset + dataLength;
        } else {
          this.length += dataLength;
        }
      }
      /**
       * Ensures that the internal Buffer is large enough to write data.
       *
       * @param dataLength { Number } The length of the data that needs to be written.
       * @param offset { Number } The offset of the data to be written (defaults to writeOffset).
       */
      _ensureWriteable(dataLength, offset) {
        const offsetVal = typeof offset === "number" ? offset : this._writeOffset;
        this._ensureCapacity(offsetVal + dataLength);
        if (offsetVal + dataLength > this.length) {
          this.length = offsetVal + dataLength;
        }
      }
      /**
       * Ensures that the internal Buffer is large enough to write at least the given amount of data.
       *
       * @param minLength { Number } The minimum length of the data needs to be written.
       */
      _ensureCapacity(minLength) {
        const oldLength = this._buff.length;
        if (minLength > oldLength) {
          let data = this._buff;
          let newLength = oldLength * 3 / 2 + 1;
          if (newLength < minLength) {
            newLength = minLength;
          }
          this._buff = Buffer.allocUnsafe(newLength);
          data.copy(this._buff, 0, 0, oldLength);
        }
      }
      /**
       * Reads a numeric number value using the provided function.
       *
       * @typeparam T { number | bigint } The type of the value to be read
       *
       * @param func { Function(offset: number) => number } The function to read data on the internal Buffer with.
       * @param byteSize { Number } The number of bytes read.
       * @param offset { Number } The offset to read from (optional). When this is not provided, the managed readOffset is used instead.
       *
       * @returns { T } the number value
       */
      _readNumberValue(func, byteSize, offset) {
        this.ensureReadable(byteSize, offset);
        const value = func.call(this._buff, typeof offset === "number" ? offset : this._readOffset);
        if (typeof offset === "undefined") {
          this._readOffset += byteSize;
        }
        return value;
      }
      /**
       * Inserts a numeric number value based on the given offset and value.
       *
       * @typeparam T { number | bigint } The type of the value to be written
       *
       * @param func { Function(offset: T, offset?) => number} The function to write data on the internal Buffer with.
       * @param byteSize { Number } The number of bytes written.
       * @param value { T } The number value to write.
       * @param offset { Number } the offset to write the number at (REQUIRED).
       *
       * @returns SmartBuffer this buffer
       */
      _insertNumberValue(func, byteSize, value, offset) {
        utils_1.checkOffsetValue(offset);
        this.ensureInsertable(byteSize, offset);
        func.call(this._buff, value, offset);
        this._writeOffset += byteSize;
        return this;
      }
      /**
       * Writes a numeric number value based on the given offset and value.
       *
       * @typeparam T { number | bigint } The type of the value to be written
       *
       * @param func { Function(offset: T, offset?) => number} The function to write data on the internal Buffer with.
       * @param byteSize { Number } The number of bytes written.
       * @param value { T } The number value to write.
       * @param offset { Number } the offset to write the number at (REQUIRED).
       *
       * @returns SmartBuffer this buffer
       */
      _writeNumberValue(func, byteSize, value, offset) {
        if (typeof offset === "number") {
          if (offset < 0) {
            throw new Error(utils_1.ERRORS.INVALID_WRITE_BEYOND_BOUNDS);
          }
          utils_1.checkOffsetValue(offset);
        }
        const offsetVal = typeof offset === "number" ? offset : this._writeOffset;
        this._ensureWriteable(byteSize, offsetVal);
        func.call(this._buff, value, offsetVal);
        if (typeof offset === "number") {
          this._writeOffset = Math.max(this._writeOffset, offsetVal + byteSize);
        } else {
          this._writeOffset += byteSize;
        }
        return this;
      }
    };
    exports2.SmartBuffer = SmartBuffer;
  }
});

// node_modules/socks/build/common/constants.js
var require_constants = __commonJS({
  "node_modules/socks/build/common/constants.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SOCKS5_NO_ACCEPTABLE_AUTH = exports2.SOCKS5_CUSTOM_AUTH_END = exports2.SOCKS5_CUSTOM_AUTH_START = exports2.SOCKS_INCOMING_PACKET_SIZES = exports2.SocksClientState = exports2.Socks5Response = exports2.Socks5HostType = exports2.Socks5Auth = exports2.Socks4Response = exports2.SocksCommand = exports2.ERRORS = exports2.DEFAULT_TIMEOUT = void 0;
    var DEFAULT_TIMEOUT = 3e4;
    exports2.DEFAULT_TIMEOUT = DEFAULT_TIMEOUT;
    var ERRORS = {
      InvalidSocksCommand: "An invalid SOCKS command was provided. Valid options are connect, bind, and associate.",
      InvalidSocksCommandForOperation: "An invalid SOCKS command was provided. Only a subset of commands are supported for this operation.",
      InvalidSocksCommandChain: "An invalid SOCKS command was provided. Chaining currently only supports the connect command.",
      InvalidSocksClientOptionsDestination: "An invalid destination host was provided.",
      InvalidSocksClientOptionsExistingSocket: "An invalid existing socket was provided. This should be an instance of stream.Duplex.",
      InvalidSocksClientOptionsProxy: "Invalid SOCKS proxy details were provided.",
      InvalidSocksClientOptionsTimeout: "An invalid timeout value was provided. Please enter a value above 0 (in ms).",
      InvalidSocksClientOptionsProxiesLength: "At least two socks proxies must be provided for chaining.",
      InvalidSocksClientOptionsCustomAuthRange: "Custom auth must be a value between 0x80 and 0xFE.",
      InvalidSocksClientOptionsCustomAuthOptions: "When a custom_auth_method is provided, custom_auth_request_handler, custom_auth_response_size, and custom_auth_response_handler must also be provided and valid.",
      NegotiationError: "Negotiation error",
      SocketClosed: "Socket closed",
      ProxyConnectionTimedOut: "Proxy connection timed out",
      InternalError: "SocksClient internal error (this should not happen)",
      InvalidSocks4HandshakeResponse: "Received invalid Socks4 handshake response",
      Socks4ProxyRejectedConnection: "Socks4 Proxy rejected connection",
      InvalidSocks4IncomingConnectionResponse: "Socks4 invalid incoming connection response",
      Socks4ProxyRejectedIncomingBoundConnection: "Socks4 Proxy rejected incoming bound connection",
      InvalidSocks5InitialHandshakeResponse: "Received invalid Socks5 initial handshake response",
      InvalidSocks5IntiailHandshakeSocksVersion: "Received invalid Socks5 initial handshake (invalid socks version)",
      InvalidSocks5InitialHandshakeNoAcceptedAuthType: "Received invalid Socks5 initial handshake (no accepted authentication type)",
      InvalidSocks5InitialHandshakeUnknownAuthType: "Received invalid Socks5 initial handshake (unknown authentication type)",
      Socks5AuthenticationFailed: "Socks5 Authentication failed",
      InvalidSocks5FinalHandshake: "Received invalid Socks5 final handshake response",
      InvalidSocks5FinalHandshakeRejected: "Socks5 proxy rejected connection",
      InvalidSocks5IncomingConnectionResponse: "Received invalid Socks5 incoming connection response",
      Socks5ProxyRejectedIncomingBoundConnection: "Socks5 Proxy rejected incoming bound connection"
    };
    exports2.ERRORS = ERRORS;
    var SOCKS_INCOMING_PACKET_SIZES = {
      Socks5InitialHandshakeResponse: 2,
      Socks5UserPassAuthenticationResponse: 2,
      // Command response + incoming connection (bind)
      Socks5ResponseHeader: 5,
      // We need at least 5 to read the hostname length, then we wait for the address+port information.
      Socks5ResponseIPv4: 10,
      // 4 header + 4 ip + 2 port
      Socks5ResponseIPv6: 22,
      // 4 header + 16 ip + 2 port
      Socks5ResponseHostname: (hostNameLength) => hostNameLength + 7,
      // 4 header + 1 host length + host + 2 port
      // Command response + incoming connection (bind)
      Socks4Response: 8
      // 2 header + 2 port + 4 ip
    };
    exports2.SOCKS_INCOMING_PACKET_SIZES = SOCKS_INCOMING_PACKET_SIZES;
    var SocksCommand;
    (function(SocksCommand2) {
      SocksCommand2[SocksCommand2["connect"] = 1] = "connect";
      SocksCommand2[SocksCommand2["bind"] = 2] = "bind";
      SocksCommand2[SocksCommand2["associate"] = 3] = "associate";
    })(SocksCommand || (exports2.SocksCommand = SocksCommand = {}));
    var Socks4Response;
    (function(Socks4Response2) {
      Socks4Response2[Socks4Response2["Granted"] = 90] = "Granted";
      Socks4Response2[Socks4Response2["Failed"] = 91] = "Failed";
      Socks4Response2[Socks4Response2["Rejected"] = 92] = "Rejected";
      Socks4Response2[Socks4Response2["RejectedIdent"] = 93] = "RejectedIdent";
    })(Socks4Response || (exports2.Socks4Response = Socks4Response = {}));
    var Socks5Auth;
    (function(Socks5Auth2) {
      Socks5Auth2[Socks5Auth2["NoAuth"] = 0] = "NoAuth";
      Socks5Auth2[Socks5Auth2["GSSApi"] = 1] = "GSSApi";
      Socks5Auth2[Socks5Auth2["UserPass"] = 2] = "UserPass";
    })(Socks5Auth || (exports2.Socks5Auth = Socks5Auth = {}));
    var SOCKS5_CUSTOM_AUTH_START = 128;
    exports2.SOCKS5_CUSTOM_AUTH_START = SOCKS5_CUSTOM_AUTH_START;
    var SOCKS5_CUSTOM_AUTH_END = 254;
    exports2.SOCKS5_CUSTOM_AUTH_END = SOCKS5_CUSTOM_AUTH_END;
    var SOCKS5_NO_ACCEPTABLE_AUTH = 255;
    exports2.SOCKS5_NO_ACCEPTABLE_AUTH = SOCKS5_NO_ACCEPTABLE_AUTH;
    var Socks5Response;
    (function(Socks5Response2) {
      Socks5Response2[Socks5Response2["Granted"] = 0] = "Granted";
      Socks5Response2[Socks5Response2["Failure"] = 1] = "Failure";
      Socks5Response2[Socks5Response2["NotAllowed"] = 2] = "NotAllowed";
      Socks5Response2[Socks5Response2["NetworkUnreachable"] = 3] = "NetworkUnreachable";
      Socks5Response2[Socks5Response2["HostUnreachable"] = 4] = "HostUnreachable";
      Socks5Response2[Socks5Response2["ConnectionRefused"] = 5] = "ConnectionRefused";
      Socks5Response2[Socks5Response2["TTLExpired"] = 6] = "TTLExpired";
      Socks5Response2[Socks5Response2["CommandNotSupported"] = 7] = "CommandNotSupported";
      Socks5Response2[Socks5Response2["AddressNotSupported"] = 8] = "AddressNotSupported";
    })(Socks5Response || (exports2.Socks5Response = Socks5Response = {}));
    var Socks5HostType;
    (function(Socks5HostType2) {
      Socks5HostType2[Socks5HostType2["IPv4"] = 1] = "IPv4";
      Socks5HostType2[Socks5HostType2["Hostname"] = 3] = "Hostname";
      Socks5HostType2[Socks5HostType2["IPv6"] = 4] = "IPv6";
    })(Socks5HostType || (exports2.Socks5HostType = Socks5HostType = {}));
    var SocksClientState;
    (function(SocksClientState2) {
      SocksClientState2[SocksClientState2["Created"] = 0] = "Created";
      SocksClientState2[SocksClientState2["Connecting"] = 1] = "Connecting";
      SocksClientState2[SocksClientState2["Connected"] = 2] = "Connected";
      SocksClientState2[SocksClientState2["SentInitialHandshake"] = 3] = "SentInitialHandshake";
      SocksClientState2[SocksClientState2["ReceivedInitialHandshakeResponse"] = 4] = "ReceivedInitialHandshakeResponse";
      SocksClientState2[SocksClientState2["SentAuthentication"] = 5] = "SentAuthentication";
      SocksClientState2[SocksClientState2["ReceivedAuthenticationResponse"] = 6] = "ReceivedAuthenticationResponse";
      SocksClientState2[SocksClientState2["SentFinalHandshake"] = 7] = "SentFinalHandshake";
      SocksClientState2[SocksClientState2["ReceivedFinalResponse"] = 8] = "ReceivedFinalResponse";
      SocksClientState2[SocksClientState2["BoundWaitingForConnection"] = 9] = "BoundWaitingForConnection";
      SocksClientState2[SocksClientState2["Established"] = 10] = "Established";
      SocksClientState2[SocksClientState2["Disconnected"] = 11] = "Disconnected";
      SocksClientState2[SocksClientState2["Error"] = 99] = "Error";
    })(SocksClientState || (exports2.SocksClientState = SocksClientState = {}));
  }
});

// node_modules/socks/build/common/util.js
var require_util = __commonJS({
  "node_modules/socks/build/common/util.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.shuffleArray = exports2.SocksClientError = void 0;
    var SocksClientError = class extends Error {
      constructor(message, options) {
        super(message);
        this.options = options;
      }
    };
    exports2.SocksClientError = SocksClientError;
    function shuffleArray(array) {
      for (let i2 = array.length - 1; i2 > 0; i2--) {
        const j = Math.floor(Math.random() * (i2 + 1));
        [array[i2], array[j]] = [array[j], array[i2]];
      }
    }
    exports2.shuffleArray = shuffleArray;
  }
});

// node_modules/ip-address/dist/common.js
var require_common = __commonJS({
  "node_modules/ip-address/dist/common.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.isCorrect = exports2.isInSubnet = void 0;
    function isInSubnet(address) {
      if (this.subnetMask < address.subnetMask) {
        return false;
      }
      if (this.mask(address.subnetMask) === address.mask()) {
        return true;
      }
      return false;
    }
    exports2.isInSubnet = isInSubnet;
    function isCorrect(defaultBits) {
      return function() {
        if (this.addressMinusSuffix !== this.correctForm()) {
          return false;
        }
        if (this.subnetMask === defaultBits && !this.parsedSubnet) {
          return true;
        }
        return this.parsedSubnet === String(this.subnetMask);
      };
    }
    exports2.isCorrect = isCorrect;
  }
});

// node_modules/ip-address/dist/v4/constants.js
var require_constants2 = __commonJS({
  "node_modules/ip-address/dist/v4/constants.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.RE_SUBNET_STRING = exports2.RE_ADDRESS = exports2.GROUPS = exports2.BITS = void 0;
    exports2.BITS = 32;
    exports2.GROUPS = 4;
    exports2.RE_ADDRESS = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/g;
    exports2.RE_SUBNET_STRING = /\/\d{1,2}$/;
  }
});

// node_modules/ip-address/dist/address-error.js
var require_address_error = __commonJS({
  "node_modules/ip-address/dist/address-error.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.AddressError = void 0;
    var AddressError = class extends Error {
      constructor(message, parseMessage) {
        super(message);
        this.name = "AddressError";
        if (parseMessage !== null) {
          this.parseMessage = parseMessage;
        }
      }
    };
    exports2.AddressError = AddressError;
  }
});

// node_modules/jsbn/index.js
var require_jsbn = __commonJS({
  "node_modules/jsbn/index.js"(exports2, module2) {
    (function() {
      var dbits;
      var canary = 244837814094590;
      var j_lm = (canary & 16777215) == 15715070;
      function BigInteger(a, b, c) {
        if (a != null)
          if ("number" == typeof a) this.fromNumber(a, b, c);
          else if (b == null && "string" != typeof a) this.fromString(a, 256);
          else this.fromString(a, b);
      }
      function nbi() {
        return new BigInteger(null);
      }
      function am1(i2, x2, w, j, c, n) {
        while (--n >= 0) {
          var v = x2 * this[i2++] + w[j] + c;
          c = Math.floor(v / 67108864);
          w[j++] = v & 67108863;
        }
        return c;
      }
      function am2(i2, x2, w, j, c, n) {
        var xl = x2 & 32767, xh = x2 >> 15;
        while (--n >= 0) {
          var l = this[i2] & 32767;
          var h2 = this[i2++] >> 15;
          var m2 = xh * l + h2 * xl;
          l = xl * l + ((m2 & 32767) << 15) + w[j] + (c & 1073741823);
          c = (l >>> 30) + (m2 >>> 15) + xh * h2 + (c >>> 30);
          w[j++] = l & 1073741823;
        }
        return c;
      }
      function am3(i2, x2, w, j, c, n) {
        var xl = x2 & 16383, xh = x2 >> 14;
        while (--n >= 0) {
          var l = this[i2] & 16383;
          var h2 = this[i2++] >> 14;
          var m2 = xh * l + h2 * xl;
          l = xl * l + ((m2 & 16383) << 14) + w[j] + c;
          c = (l >> 28) + (m2 >> 14) + xh * h2;
          w[j++] = l & 268435455;
        }
        return c;
      }
      var inBrowser = typeof navigator !== "undefined";
      if (inBrowser && j_lm && navigator.appName == "Microsoft Internet Explorer") {
        BigInteger.prototype.am = am2;
        dbits = 30;
      } else if (inBrowser && j_lm && navigator.appName != "Netscape") {
        BigInteger.prototype.am = am1;
        dbits = 26;
      } else {
        BigInteger.prototype.am = am3;
        dbits = 28;
      }
      BigInteger.prototype.DB = dbits;
      BigInteger.prototype.DM = (1 << dbits) - 1;
      BigInteger.prototype.DV = 1 << dbits;
      var BI_FP = 52;
      BigInteger.prototype.FV = Math.pow(2, BI_FP);
      BigInteger.prototype.F1 = BI_FP - dbits;
      BigInteger.prototype.F2 = 2 * dbits - BI_FP;
      var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
      var BI_RC = new Array();
      var rr, vv;
      rr = "0".charCodeAt(0);
      for (vv = 0; vv <= 9; ++vv) BI_RC[rr++] = vv;
      rr = "a".charCodeAt(0);
      for (vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;
      rr = "A".charCodeAt(0);
      for (vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;
      function int2char(n) {
        return BI_RM.charAt(n);
      }
      function intAt(s2, i2) {
        var c = BI_RC[s2.charCodeAt(i2)];
        return c == null ? -1 : c;
      }
      function bnpCopyTo(r2) {
        for (var i2 = this.t - 1; i2 >= 0; --i2) r2[i2] = this[i2];
        r2.t = this.t;
        r2.s = this.s;
      }
      function bnpFromInt(x2) {
        this.t = 1;
        this.s = x2 < 0 ? -1 : 0;
        if (x2 > 0) this[0] = x2;
        else if (x2 < -1) this[0] = x2 + this.DV;
        else this.t = 0;
      }
      function nbv(i2) {
        var r2 = nbi();
        r2.fromInt(i2);
        return r2;
      }
      function bnpFromString(s2, b) {
        var k;
        if (b == 16) k = 4;
        else if (b == 8) k = 3;
        else if (b == 256) k = 8;
        else if (b == 2) k = 1;
        else if (b == 32) k = 5;
        else if (b == 4) k = 2;
        else {
          this.fromRadix(s2, b);
          return;
        }
        this.t = 0;
        this.s = 0;
        var i2 = s2.length, mi = false, sh = 0;
        while (--i2 >= 0) {
          var x2 = k == 8 ? s2[i2] & 255 : intAt(s2, i2);
          if (x2 < 0) {
            if (s2.charAt(i2) == "-") mi = true;
            continue;
          }
          mi = false;
          if (sh == 0)
            this[this.t++] = x2;
          else if (sh + k > this.DB) {
            this[this.t - 1] |= (x2 & (1 << this.DB - sh) - 1) << sh;
            this[this.t++] = x2 >> this.DB - sh;
          } else
            this[this.t - 1] |= x2 << sh;
          sh += k;
          if (sh >= this.DB) sh -= this.DB;
        }
        if (k == 8 && (s2[0] & 128) != 0) {
          this.s = -1;
          if (sh > 0) this[this.t - 1] |= (1 << this.DB - sh) - 1 << sh;
        }
        this.clamp();
        if (mi) BigInteger.ZERO.subTo(this, this);
      }
      function bnpClamp() {
        var c = this.s & this.DM;
        while (this.t > 0 && this[this.t - 1] == c) --this.t;
      }
      function bnToString(b) {
        if (this.s < 0) return "-" + this.negate().toString(b);
        var k;
        if (b == 16) k = 4;
        else if (b == 8) k = 3;
        else if (b == 2) k = 1;
        else if (b == 32) k = 5;
        else if (b == 4) k = 2;
        else return this.toRadix(b);
        var km = (1 << k) - 1, d, m2 = false, r2 = "", i2 = this.t;
        var p = this.DB - i2 * this.DB % k;
        if (i2-- > 0) {
          if (p < this.DB && (d = this[i2] >> p) > 0) {
            m2 = true;
            r2 = int2char(d);
          }
          while (i2 >= 0) {
            if (p < k) {
              d = (this[i2] & (1 << p) - 1) << k - p;
              d |= this[--i2] >> (p += this.DB - k);
            } else {
              d = this[i2] >> (p -= k) & km;
              if (p <= 0) {
                p += this.DB;
                --i2;
              }
            }
            if (d > 0) m2 = true;
            if (m2) r2 += int2char(d);
          }
        }
        return m2 ? r2 : "0";
      }
      function bnNegate() {
        var r2 = nbi();
        BigInteger.ZERO.subTo(this, r2);
        return r2;
      }
      function bnAbs() {
        return this.s < 0 ? this.negate() : this;
      }
      function bnCompareTo(a) {
        var r2 = this.s - a.s;
        if (r2 != 0) return r2;
        var i2 = this.t;
        r2 = i2 - a.t;
        if (r2 != 0) return this.s < 0 ? -r2 : r2;
        while (--i2 >= 0) if ((r2 = this[i2] - a[i2]) != 0) return r2;
        return 0;
      }
      function nbits(x2) {
        var r2 = 1, t3;
        if ((t3 = x2 >>> 16) != 0) {
          x2 = t3;
          r2 += 16;
        }
        if ((t3 = x2 >> 8) != 0) {
          x2 = t3;
          r2 += 8;
        }
        if ((t3 = x2 >> 4) != 0) {
          x2 = t3;
          r2 += 4;
        }
        if ((t3 = x2 >> 2) != 0) {
          x2 = t3;
          r2 += 2;
        }
        if ((t3 = x2 >> 1) != 0) {
          x2 = t3;
          r2 += 1;
        }
        return r2;
      }
      function bnBitLength() {
        if (this.t <= 0) return 0;
        return this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ this.s & this.DM);
      }
      function bnpDLShiftTo(n, r2) {
        var i2;
        for (i2 = this.t - 1; i2 >= 0; --i2) r2[i2 + n] = this[i2];
        for (i2 = n - 1; i2 >= 0; --i2) r2[i2] = 0;
        r2.t = this.t + n;
        r2.s = this.s;
      }
      function bnpDRShiftTo(n, r2) {
        for (var i2 = n; i2 < this.t; ++i2) r2[i2 - n] = this[i2];
        r2.t = Math.max(this.t - n, 0);
        r2.s = this.s;
      }
      function bnpLShiftTo(n, r2) {
        var bs = n % this.DB;
        var cbs = this.DB - bs;
        var bm = (1 << cbs) - 1;
        var ds = Math.floor(n / this.DB), c = this.s << bs & this.DM, i2;
        for (i2 = this.t - 1; i2 >= 0; --i2) {
          r2[i2 + ds + 1] = this[i2] >> cbs | c;
          c = (this[i2] & bm) << bs;
        }
        for (i2 = ds - 1; i2 >= 0; --i2) r2[i2] = 0;
        r2[ds] = c;
        r2.t = this.t + ds + 1;
        r2.s = this.s;
        r2.clamp();
      }
      function bnpRShiftTo(n, r2) {
        r2.s = this.s;
        var ds = Math.floor(n / this.DB);
        if (ds >= this.t) {
          r2.t = 0;
          return;
        }
        var bs = n % this.DB;
        var cbs = this.DB - bs;
        var bm = (1 << bs) - 1;
        r2[0] = this[ds] >> bs;
        for (var i2 = ds + 1; i2 < this.t; ++i2) {
          r2[i2 - ds - 1] |= (this[i2] & bm) << cbs;
          r2[i2 - ds] = this[i2] >> bs;
        }
        if (bs > 0) r2[this.t - ds - 1] |= (this.s & bm) << cbs;
        r2.t = this.t - ds;
        r2.clamp();
      }
      function bnpSubTo(a, r2) {
        var i2 = 0, c = 0, m2 = Math.min(a.t, this.t);
        while (i2 < m2) {
          c += this[i2] - a[i2];
          r2[i2++] = c & this.DM;
          c >>= this.DB;
        }
        if (a.t < this.t) {
          c -= a.s;
          while (i2 < this.t) {
            c += this[i2];
            r2[i2++] = c & this.DM;
            c >>= this.DB;
          }
          c += this.s;
        } else {
          c += this.s;
          while (i2 < a.t) {
            c -= a[i2];
            r2[i2++] = c & this.DM;
            c >>= this.DB;
          }
          c -= a.s;
        }
        r2.s = c < 0 ? -1 : 0;
        if (c < -1) r2[i2++] = this.DV + c;
        else if (c > 0) r2[i2++] = c;
        r2.t = i2;
        r2.clamp();
      }
      function bnpMultiplyTo(a, r2) {
        var x2 = this.abs(), y = a.abs();
        var i2 = x2.t;
        r2.t = i2 + y.t;
        while (--i2 >= 0) r2[i2] = 0;
        for (i2 = 0; i2 < y.t; ++i2) r2[i2 + x2.t] = x2.am(0, y[i2], r2, i2, 0, x2.t);
        r2.s = 0;
        r2.clamp();
        if (this.s != a.s) BigInteger.ZERO.subTo(r2, r2);
      }
      function bnpSquareTo(r2) {
        var x2 = this.abs();
        var i2 = r2.t = 2 * x2.t;
        while (--i2 >= 0) r2[i2] = 0;
        for (i2 = 0; i2 < x2.t - 1; ++i2) {
          var c = x2.am(i2, x2[i2], r2, 2 * i2, 0, 1);
          if ((r2[i2 + x2.t] += x2.am(i2 + 1, 2 * x2[i2], r2, 2 * i2 + 1, c, x2.t - i2 - 1)) >= x2.DV) {
            r2[i2 + x2.t] -= x2.DV;
            r2[i2 + x2.t + 1] = 1;
          }
        }
        if (r2.t > 0) r2[r2.t - 1] += x2.am(i2, x2[i2], r2, 2 * i2, 0, 1);
        r2.s = 0;
        r2.clamp();
      }
      function bnpDivRemTo(m2, q, r2) {
        var pm = m2.abs();
        if (pm.t <= 0) return;
        var pt = this.abs();
        if (pt.t < pm.t) {
          if (q != null) q.fromInt(0);
          if (r2 != null) this.copyTo(r2);
          return;
        }
        if (r2 == null) r2 = nbi();
        var y = nbi(), ts = this.s, ms = m2.s;
        var nsh = this.DB - nbits(pm[pm.t - 1]);
        if (nsh > 0) {
          pm.lShiftTo(nsh, y);
          pt.lShiftTo(nsh, r2);
        } else {
          pm.copyTo(y);
          pt.copyTo(r2);
        }
        var ys = y.t;
        var y0 = y[ys - 1];
        if (y0 == 0) return;
        var yt = y0 * (1 << this.F1) + (ys > 1 ? y[ys - 2] >> this.F2 : 0);
        var d1 = this.FV / yt, d2 = (1 << this.F1) / yt, e2 = 1 << this.F2;
        var i2 = r2.t, j = i2 - ys, t3 = q == null ? nbi() : q;
        y.dlShiftTo(j, t3);
        if (r2.compareTo(t3) >= 0) {
          r2[r2.t++] = 1;
          r2.subTo(t3, r2);
        }
        BigInteger.ONE.dlShiftTo(ys, t3);
        t3.subTo(y, y);
        while (y.t < ys) y[y.t++] = 0;
        while (--j >= 0) {
          var qd = r2[--i2] == y0 ? this.DM : Math.floor(r2[i2] * d1 + (r2[i2 - 1] + e2) * d2);
          if ((r2[i2] += y.am(0, qd, r2, j, 0, ys)) < qd) {
            y.dlShiftTo(j, t3);
            r2.subTo(t3, r2);
            while (r2[i2] < --qd) r2.subTo(t3, r2);
          }
        }
        if (q != null) {
          r2.drShiftTo(ys, q);
          if (ts != ms) BigInteger.ZERO.subTo(q, q);
        }
        r2.t = ys;
        r2.clamp();
        if (nsh > 0) r2.rShiftTo(nsh, r2);
        if (ts < 0) BigInteger.ZERO.subTo(r2, r2);
      }
      function bnMod(a) {
        var r2 = nbi();
        this.abs().divRemTo(a, null, r2);
        if (this.s < 0 && r2.compareTo(BigInteger.ZERO) > 0) a.subTo(r2, r2);
        return r2;
      }
      function Classic(m2) {
        this.m = m2;
      }
      function cConvert(x2) {
        if (x2.s < 0 || x2.compareTo(this.m) >= 0) return x2.mod(this.m);
        else return x2;
      }
      function cRevert(x2) {
        return x2;
      }
      function cReduce(x2) {
        x2.divRemTo(this.m, null, x2);
      }
      function cMulTo(x2, y, r2) {
        x2.multiplyTo(y, r2);
        this.reduce(r2);
      }
      function cSqrTo(x2, r2) {
        x2.squareTo(r2);
        this.reduce(r2);
      }
      Classic.prototype.convert = cConvert;
      Classic.prototype.revert = cRevert;
      Classic.prototype.reduce = cReduce;
      Classic.prototype.mulTo = cMulTo;
      Classic.prototype.sqrTo = cSqrTo;
      function bnpInvDigit() {
        if (this.t < 1) return 0;
        var x2 = this[0];
        if ((x2 & 1) == 0) return 0;
        var y = x2 & 3;
        y = y * (2 - (x2 & 15) * y) & 15;
        y = y * (2 - (x2 & 255) * y) & 255;
        y = y * (2 - ((x2 & 65535) * y & 65535)) & 65535;
        y = y * (2 - x2 * y % this.DV) % this.DV;
        return y > 0 ? this.DV - y : -y;
      }
      function Montgomery(m2) {
        this.m = m2;
        this.mp = m2.invDigit();
        this.mpl = this.mp & 32767;
        this.mph = this.mp >> 15;
        this.um = (1 << m2.DB - 15) - 1;
        this.mt2 = 2 * m2.t;
      }
      function montConvert(x2) {
        var r2 = nbi();
        x2.abs().dlShiftTo(this.m.t, r2);
        r2.divRemTo(this.m, null, r2);
        if (x2.s < 0 && r2.compareTo(BigInteger.ZERO) > 0) this.m.subTo(r2, r2);
        return r2;
      }
      function montRevert(x2) {
        var r2 = nbi();
        x2.copyTo(r2);
        this.reduce(r2);
        return r2;
      }
      function montReduce(x2) {
        while (x2.t <= this.mt2)
          x2[x2.t++] = 0;
        for (var i2 = 0; i2 < this.m.t; ++i2) {
          var j = x2[i2] & 32767;
          var u0 = j * this.mpl + ((j * this.mph + (x2[i2] >> 15) * this.mpl & this.um) << 15) & x2.DM;
          j = i2 + this.m.t;
          x2[j] += this.m.am(0, u0, x2, i2, 0, this.m.t);
          while (x2[j] >= x2.DV) {
            x2[j] -= x2.DV;
            x2[++j]++;
          }
        }
        x2.clamp();
        x2.drShiftTo(this.m.t, x2);
        if (x2.compareTo(this.m) >= 0) x2.subTo(this.m, x2);
      }
      function montSqrTo(x2, r2) {
        x2.squareTo(r2);
        this.reduce(r2);
      }
      function montMulTo(x2, y, r2) {
        x2.multiplyTo(y, r2);
        this.reduce(r2);
      }
      Montgomery.prototype.convert = montConvert;
      Montgomery.prototype.revert = montRevert;
      Montgomery.prototype.reduce = montReduce;
      Montgomery.prototype.mulTo = montMulTo;
      Montgomery.prototype.sqrTo = montSqrTo;
      function bnpIsEven() {
        return (this.t > 0 ? this[0] & 1 : this.s) == 0;
      }
      function bnpExp(e2, z2) {
        if (e2 > 4294967295 || e2 < 1) return BigInteger.ONE;
        var r2 = nbi(), r22 = nbi(), g = z2.convert(this), i2 = nbits(e2) - 1;
        g.copyTo(r2);
        while (--i2 >= 0) {
          z2.sqrTo(r2, r22);
          if ((e2 & 1 << i2) > 0) z2.mulTo(r22, g, r2);
          else {
            var t3 = r2;
            r2 = r22;
            r22 = t3;
          }
        }
        return z2.revert(r2);
      }
      function bnModPowInt(e2, m2) {
        var z2;
        if (e2 < 256 || m2.isEven()) z2 = new Classic(m2);
        else z2 = new Montgomery(m2);
        return this.exp(e2, z2);
      }
      BigInteger.prototype.copyTo = bnpCopyTo;
      BigInteger.prototype.fromInt = bnpFromInt;
      BigInteger.prototype.fromString = bnpFromString;
      BigInteger.prototype.clamp = bnpClamp;
      BigInteger.prototype.dlShiftTo = bnpDLShiftTo;
      BigInteger.prototype.drShiftTo = bnpDRShiftTo;
      BigInteger.prototype.lShiftTo = bnpLShiftTo;
      BigInteger.prototype.rShiftTo = bnpRShiftTo;
      BigInteger.prototype.subTo = bnpSubTo;
      BigInteger.prototype.multiplyTo = bnpMultiplyTo;
      BigInteger.prototype.squareTo = bnpSquareTo;
      BigInteger.prototype.divRemTo = bnpDivRemTo;
      BigInteger.prototype.invDigit = bnpInvDigit;
      BigInteger.prototype.isEven = bnpIsEven;
      BigInteger.prototype.exp = bnpExp;
      BigInteger.prototype.toString = bnToString;
      BigInteger.prototype.negate = bnNegate;
      BigInteger.prototype.abs = bnAbs;
      BigInteger.prototype.compareTo = bnCompareTo;
      BigInteger.prototype.bitLength = bnBitLength;
      BigInteger.prototype.mod = bnMod;
      BigInteger.prototype.modPowInt = bnModPowInt;
      BigInteger.ZERO = nbv(0);
      BigInteger.ONE = nbv(1);
      function bnClone() {
        var r2 = nbi();
        this.copyTo(r2);
        return r2;
      }
      function bnIntValue() {
        if (this.s < 0) {
          if (this.t == 1) return this[0] - this.DV;
          else if (this.t == 0) return -1;
        } else if (this.t == 1) return this[0];
        else if (this.t == 0) return 0;
        return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0];
      }
      function bnByteValue() {
        return this.t == 0 ? this.s : this[0] << 24 >> 24;
      }
      function bnShortValue() {
        return this.t == 0 ? this.s : this[0] << 16 >> 16;
      }
      function bnpChunkSize(r2) {
        return Math.floor(Math.LN2 * this.DB / Math.log(r2));
      }
      function bnSigNum() {
        if (this.s < 0) return -1;
        else if (this.t <= 0 || this.t == 1 && this[0] <= 0) return 0;
        else return 1;
      }
      function bnpToRadix(b) {
        if (b == null) b = 10;
        if (this.signum() == 0 || b < 2 || b > 36) return "0";
        var cs = this.chunkSize(b);
        var a = Math.pow(b, cs);
        var d = nbv(a), y = nbi(), z2 = nbi(), r2 = "";
        this.divRemTo(d, y, z2);
        while (y.signum() > 0) {
          r2 = (a + z2.intValue()).toString(b).substr(1) + r2;
          y.divRemTo(d, y, z2);
        }
        return z2.intValue().toString(b) + r2;
      }
      function bnpFromRadix(s2, b) {
        this.fromInt(0);
        if (b == null) b = 10;
        var cs = this.chunkSize(b);
        var d = Math.pow(b, cs), mi = false, j = 0, w = 0;
        for (var i2 = 0; i2 < s2.length; ++i2) {
          var x2 = intAt(s2, i2);
          if (x2 < 0) {
            if (s2.charAt(i2) == "-" && this.signum() == 0) mi = true;
            continue;
          }
          w = b * w + x2;
          if (++j >= cs) {
            this.dMultiply(d);
            this.dAddOffset(w, 0);
            j = 0;
            w = 0;
          }
        }
        if (j > 0) {
          this.dMultiply(Math.pow(b, j));
          this.dAddOffset(w, 0);
        }
        if (mi) BigInteger.ZERO.subTo(this, this);
      }
      function bnpFromNumber(a, b, c) {
        if ("number" == typeof b) {
          if (a < 2) this.fromInt(1);
          else {
            this.fromNumber(a, c);
            if (!this.testBit(a - 1))
              this.bitwiseTo(BigInteger.ONE.shiftLeft(a - 1), op_or, this);
            if (this.isEven()) this.dAddOffset(1, 0);
            while (!this.isProbablePrime(b)) {
              this.dAddOffset(2, 0);
              if (this.bitLength() > a) this.subTo(BigInteger.ONE.shiftLeft(a - 1), this);
            }
          }
        } else {
          var x2 = new Array(), t3 = a & 7;
          x2.length = (a >> 3) + 1;
          b.nextBytes(x2);
          if (t3 > 0) x2[0] &= (1 << t3) - 1;
          else x2[0] = 0;
          this.fromString(x2, 256);
        }
      }
      function bnToByteArray() {
        var i2 = this.t, r2 = new Array();
        r2[0] = this.s;
        var p = this.DB - i2 * this.DB % 8, d, k = 0;
        if (i2-- > 0) {
          if (p < this.DB && (d = this[i2] >> p) != (this.s & this.DM) >> p)
            r2[k++] = d | this.s << this.DB - p;
          while (i2 >= 0) {
            if (p < 8) {
              d = (this[i2] & (1 << p) - 1) << 8 - p;
              d |= this[--i2] >> (p += this.DB - 8);
            } else {
              d = this[i2] >> (p -= 8) & 255;
              if (p <= 0) {
                p += this.DB;
                --i2;
              }
            }
            if ((d & 128) != 0) d |= -256;
            if (k == 0 && (this.s & 128) != (d & 128)) ++k;
            if (k > 0 || d != this.s) r2[k++] = d;
          }
        }
        return r2;
      }
      function bnEquals(a) {
        return this.compareTo(a) == 0;
      }
      function bnMin(a) {
        return this.compareTo(a) < 0 ? this : a;
      }
      function bnMax(a) {
        return this.compareTo(a) > 0 ? this : a;
      }
      function bnpBitwiseTo(a, op, r2) {
        var i2, f3, m2 = Math.min(a.t, this.t);
        for (i2 = 0; i2 < m2; ++i2) r2[i2] = op(this[i2], a[i2]);
        if (a.t < this.t) {
          f3 = a.s & this.DM;
          for (i2 = m2; i2 < this.t; ++i2) r2[i2] = op(this[i2], f3);
          r2.t = this.t;
        } else {
          f3 = this.s & this.DM;
          for (i2 = m2; i2 < a.t; ++i2) r2[i2] = op(f3, a[i2]);
          r2.t = a.t;
        }
        r2.s = op(this.s, a.s);
        r2.clamp();
      }
      function op_and(x2, y) {
        return x2 & y;
      }
      function bnAnd(a) {
        var r2 = nbi();
        this.bitwiseTo(a, op_and, r2);
        return r2;
      }
      function op_or(x2, y) {
        return x2 | y;
      }
      function bnOr(a) {
        var r2 = nbi();
        this.bitwiseTo(a, op_or, r2);
        return r2;
      }
      function op_xor(x2, y) {
        return x2 ^ y;
      }
      function bnXor(a) {
        var r2 = nbi();
        this.bitwiseTo(a, op_xor, r2);
        return r2;
      }
      function op_andnot(x2, y) {
        return x2 & ~y;
      }
      function bnAndNot(a) {
        var r2 = nbi();
        this.bitwiseTo(a, op_andnot, r2);
        return r2;
      }
      function bnNot() {
        var r2 = nbi();
        for (var i2 = 0; i2 < this.t; ++i2) r2[i2] = this.DM & ~this[i2];
        r2.t = this.t;
        r2.s = ~this.s;
        return r2;
      }
      function bnShiftLeft(n) {
        var r2 = nbi();
        if (n < 0) this.rShiftTo(-n, r2);
        else this.lShiftTo(n, r2);
        return r2;
      }
      function bnShiftRight(n) {
        var r2 = nbi();
        if (n < 0) this.lShiftTo(-n, r2);
        else this.rShiftTo(n, r2);
        return r2;
      }
      function lbit(x2) {
        if (x2 == 0) return -1;
        var r2 = 0;
        if ((x2 & 65535) == 0) {
          x2 >>= 16;
          r2 += 16;
        }
        if ((x2 & 255) == 0) {
          x2 >>= 8;
          r2 += 8;
        }
        if ((x2 & 15) == 0) {
          x2 >>= 4;
          r2 += 4;
        }
        if ((x2 & 3) == 0) {
          x2 >>= 2;
          r2 += 2;
        }
        if ((x2 & 1) == 0) ++r2;
        return r2;
      }
      function bnGetLowestSetBit() {
        for (var i2 = 0; i2 < this.t; ++i2)
          if (this[i2] != 0) return i2 * this.DB + lbit(this[i2]);
        if (this.s < 0) return this.t * this.DB;
        return -1;
      }
      function cbit(x2) {
        var r2 = 0;
        while (x2 != 0) {
          x2 &= x2 - 1;
          ++r2;
        }
        return r2;
      }
      function bnBitCount() {
        var r2 = 0, x2 = this.s & this.DM;
        for (var i2 = 0; i2 < this.t; ++i2) r2 += cbit(this[i2] ^ x2);
        return r2;
      }
      function bnTestBit(n) {
        var j = Math.floor(n / this.DB);
        if (j >= this.t) return this.s != 0;
        return (this[j] & 1 << n % this.DB) != 0;
      }
      function bnpChangeBit(n, op) {
        var r2 = BigInteger.ONE.shiftLeft(n);
        this.bitwiseTo(r2, op, r2);
        return r2;
      }
      function bnSetBit(n) {
        return this.changeBit(n, op_or);
      }
      function bnClearBit(n) {
        return this.changeBit(n, op_andnot);
      }
      function bnFlipBit(n) {
        return this.changeBit(n, op_xor);
      }
      function bnpAddTo(a, r2) {
        var i2 = 0, c = 0, m2 = Math.min(a.t, this.t);
        while (i2 < m2) {
          c += this[i2] + a[i2];
          r2[i2++] = c & this.DM;
          c >>= this.DB;
        }
        if (a.t < this.t) {
          c += a.s;
          while (i2 < this.t) {
            c += this[i2];
            r2[i2++] = c & this.DM;
            c >>= this.DB;
          }
          c += this.s;
        } else {
          c += this.s;
          while (i2 < a.t) {
            c += a[i2];
            r2[i2++] = c & this.DM;
            c >>= this.DB;
          }
          c += a.s;
        }
        r2.s = c < 0 ? -1 : 0;
        if (c > 0) r2[i2++] = c;
        else if (c < -1) r2[i2++] = this.DV + c;
        r2.t = i2;
        r2.clamp();
      }
      function bnAdd(a) {
        var r2 = nbi();
        this.addTo(a, r2);
        return r2;
      }
      function bnSubtract(a) {
        var r2 = nbi();
        this.subTo(a, r2);
        return r2;
      }
      function bnMultiply(a) {
        var r2 = nbi();
        this.multiplyTo(a, r2);
        return r2;
      }
      function bnSquare() {
        var r2 = nbi();
        this.squareTo(r2);
        return r2;
      }
      function bnDivide(a) {
        var r2 = nbi();
        this.divRemTo(a, r2, null);
        return r2;
      }
      function bnRemainder(a) {
        var r2 = nbi();
        this.divRemTo(a, null, r2);
        return r2;
      }
      function bnDivideAndRemainder(a) {
        var q = nbi(), r2 = nbi();
        this.divRemTo(a, q, r2);
        return new Array(q, r2);
      }
      function bnpDMultiply(n) {
        this[this.t] = this.am(0, n - 1, this, 0, 0, this.t);
        ++this.t;
        this.clamp();
      }
      function bnpDAddOffset(n, w) {
        if (n == 0) return;
        while (this.t <= w) this[this.t++] = 0;
        this[w] += n;
        while (this[w] >= this.DV) {
          this[w] -= this.DV;
          if (++w >= this.t) this[this.t++] = 0;
          ++this[w];
        }
      }
      function NullExp() {
      }
      function nNop(x2) {
        return x2;
      }
      function nMulTo(x2, y, r2) {
        x2.multiplyTo(y, r2);
      }
      function nSqrTo(x2, r2) {
        x2.squareTo(r2);
      }
      NullExp.prototype.convert = nNop;
      NullExp.prototype.revert = nNop;
      NullExp.prototype.mulTo = nMulTo;
      NullExp.prototype.sqrTo = nSqrTo;
      function bnPow(e2) {
        return this.exp(e2, new NullExp());
      }
      function bnpMultiplyLowerTo(a, n, r2) {
        var i2 = Math.min(this.t + a.t, n);
        r2.s = 0;
        r2.t = i2;
        while (i2 > 0) r2[--i2] = 0;
        var j;
        for (j = r2.t - this.t; i2 < j; ++i2) r2[i2 + this.t] = this.am(0, a[i2], r2, i2, 0, this.t);
        for (j = Math.min(a.t, n); i2 < j; ++i2) this.am(0, a[i2], r2, i2, 0, n - i2);
        r2.clamp();
      }
      function bnpMultiplyUpperTo(a, n, r2) {
        --n;
        var i2 = r2.t = this.t + a.t - n;
        r2.s = 0;
        while (--i2 >= 0) r2[i2] = 0;
        for (i2 = Math.max(n - this.t, 0); i2 < a.t; ++i2)
          r2[this.t + i2 - n] = this.am(n - i2, a[i2], r2, 0, 0, this.t + i2 - n);
        r2.clamp();
        r2.drShiftTo(1, r2);
      }
      function Barrett(m2) {
        this.r2 = nbi();
        this.q3 = nbi();
        BigInteger.ONE.dlShiftTo(2 * m2.t, this.r2);
        this.mu = this.r2.divide(m2);
        this.m = m2;
      }
      function barrettConvert(x2) {
        if (x2.s < 0 || x2.t > 2 * this.m.t) return x2.mod(this.m);
        else if (x2.compareTo(this.m) < 0) return x2;
        else {
          var r2 = nbi();
          x2.copyTo(r2);
          this.reduce(r2);
          return r2;
        }
      }
      function barrettRevert(x2) {
        return x2;
      }
      function barrettReduce(x2) {
        x2.drShiftTo(this.m.t - 1, this.r2);
        if (x2.t > this.m.t + 1) {
          x2.t = this.m.t + 1;
          x2.clamp();
        }
        this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3);
        this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2);
        while (x2.compareTo(this.r2) < 0) x2.dAddOffset(1, this.m.t + 1);
        x2.subTo(this.r2, x2);
        while (x2.compareTo(this.m) >= 0) x2.subTo(this.m, x2);
      }
      function barrettSqrTo(x2, r2) {
        x2.squareTo(r2);
        this.reduce(r2);
      }
      function barrettMulTo(x2, y, r2) {
        x2.multiplyTo(y, r2);
        this.reduce(r2);
      }
      Barrett.prototype.convert = barrettConvert;
      Barrett.prototype.revert = barrettRevert;
      Barrett.prototype.reduce = barrettReduce;
      Barrett.prototype.mulTo = barrettMulTo;
      Barrett.prototype.sqrTo = barrettSqrTo;
      function bnModPow(e2, m2) {
        var i2 = e2.bitLength(), k, r2 = nbv(1), z2;
        if (i2 <= 0) return r2;
        else if (i2 < 18) k = 1;
        else if (i2 < 48) k = 3;
        else if (i2 < 144) k = 4;
        else if (i2 < 768) k = 5;
        else k = 6;
        if (i2 < 8)
          z2 = new Classic(m2);
        else if (m2.isEven())
          z2 = new Barrett(m2);
        else
          z2 = new Montgomery(m2);
        var g = new Array(), n = 3, k1 = k - 1, km = (1 << k) - 1;
        g[1] = z2.convert(this);
        if (k > 1) {
          var g2 = nbi();
          z2.sqrTo(g[1], g2);
          while (n <= km) {
            g[n] = nbi();
            z2.mulTo(g2, g[n - 2], g[n]);
            n += 2;
          }
        }
        var j = e2.t - 1, w, is1 = true, r22 = nbi(), t3;
        i2 = nbits(e2[j]) - 1;
        while (j >= 0) {
          if (i2 >= k1) w = e2[j] >> i2 - k1 & km;
          else {
            w = (e2[j] & (1 << i2 + 1) - 1) << k1 - i2;
            if (j > 0) w |= e2[j - 1] >> this.DB + i2 - k1;
          }
          n = k;
          while ((w & 1) == 0) {
            w >>= 1;
            --n;
          }
          if ((i2 -= n) < 0) {
            i2 += this.DB;
            --j;
          }
          if (is1) {
            g[w].copyTo(r2);
            is1 = false;
          } else {
            while (n > 1) {
              z2.sqrTo(r2, r22);
              z2.sqrTo(r22, r2);
              n -= 2;
            }
            if (n > 0) z2.sqrTo(r2, r22);
            else {
              t3 = r2;
              r2 = r22;
              r22 = t3;
            }
            z2.mulTo(r22, g[w], r2);
          }
          while (j >= 0 && (e2[j] & 1 << i2) == 0) {
            z2.sqrTo(r2, r22);
            t3 = r2;
            r2 = r22;
            r22 = t3;
            if (--i2 < 0) {
              i2 = this.DB - 1;
              --j;
            }
          }
        }
        return z2.revert(r2);
      }
      function bnGCD(a) {
        var x2 = this.s < 0 ? this.negate() : this.clone();
        var y = a.s < 0 ? a.negate() : a.clone();
        if (x2.compareTo(y) < 0) {
          var t3 = x2;
          x2 = y;
          y = t3;
        }
        var i2 = x2.getLowestSetBit(), g = y.getLowestSetBit();
        if (g < 0) return x2;
        if (i2 < g) g = i2;
        if (g > 0) {
          x2.rShiftTo(g, x2);
          y.rShiftTo(g, y);
        }
        while (x2.signum() > 0) {
          if ((i2 = x2.getLowestSetBit()) > 0) x2.rShiftTo(i2, x2);
          if ((i2 = y.getLowestSetBit()) > 0) y.rShiftTo(i2, y);
          if (x2.compareTo(y) >= 0) {
            x2.subTo(y, x2);
            x2.rShiftTo(1, x2);
          } else {
            y.subTo(x2, y);
            y.rShiftTo(1, y);
          }
        }
        if (g > 0) y.lShiftTo(g, y);
        return y;
      }
      function bnpModInt(n) {
        if (n <= 0) return 0;
        var d = this.DV % n, r2 = this.s < 0 ? n - 1 : 0;
        if (this.t > 0)
          if (d == 0) r2 = this[0] % n;
          else for (var i2 = this.t - 1; i2 >= 0; --i2) r2 = (d * r2 + this[i2]) % n;
        return r2;
      }
      function bnModInverse(m2) {
        var ac = m2.isEven();
        if (this.isEven() && ac || m2.signum() == 0) return BigInteger.ZERO;
        var u = m2.clone(), v = this.clone();
        var a = nbv(1), b = nbv(0), c = nbv(0), d = nbv(1);
        while (u.signum() != 0) {
          while (u.isEven()) {
            u.rShiftTo(1, u);
            if (ac) {
              if (!a.isEven() || !b.isEven()) {
                a.addTo(this, a);
                b.subTo(m2, b);
              }
              a.rShiftTo(1, a);
            } else if (!b.isEven()) b.subTo(m2, b);
            b.rShiftTo(1, b);
          }
          while (v.isEven()) {
            v.rShiftTo(1, v);
            if (ac) {
              if (!c.isEven() || !d.isEven()) {
                c.addTo(this, c);
                d.subTo(m2, d);
              }
              c.rShiftTo(1, c);
            } else if (!d.isEven()) d.subTo(m2, d);
            d.rShiftTo(1, d);
          }
          if (u.compareTo(v) >= 0) {
            u.subTo(v, u);
            if (ac) a.subTo(c, a);
            b.subTo(d, b);
          } else {
            v.subTo(u, v);
            if (ac) c.subTo(a, c);
            d.subTo(b, d);
          }
        }
        if (v.compareTo(BigInteger.ONE) != 0) return BigInteger.ZERO;
        if (d.compareTo(m2) >= 0) return d.subtract(m2);
        if (d.signum() < 0) d.addTo(m2, d);
        else return d;
        if (d.signum() < 0) return d.add(m2);
        else return d;
      }
      var lowprimes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997];
      var lplim = (1 << 26) / lowprimes[lowprimes.length - 1];
      function bnIsProbablePrime(t3) {
        var i2, x2 = this.abs();
        if (x2.t == 1 && x2[0] <= lowprimes[lowprimes.length - 1]) {
          for (i2 = 0; i2 < lowprimes.length; ++i2)
            if (x2[0] == lowprimes[i2]) return true;
          return false;
        }
        if (x2.isEven()) return false;
        i2 = 1;
        while (i2 < lowprimes.length) {
          var m2 = lowprimes[i2], j = i2 + 1;
          while (j < lowprimes.length && m2 < lplim) m2 *= lowprimes[j++];
          m2 = x2.modInt(m2);
          while (i2 < j) if (m2 % lowprimes[i2++] == 0) return false;
        }
        return x2.millerRabin(t3);
      }
      function bnpMillerRabin(t3) {
        var n1 = this.subtract(BigInteger.ONE);
        var k = n1.getLowestSetBit();
        if (k <= 0) return false;
        var r2 = n1.shiftRight(k);
        t3 = t3 + 1 >> 1;
        if (t3 > lowprimes.length) t3 = lowprimes.length;
        var a = nbi();
        for (var i2 = 0; i2 < t3; ++i2) {
          a.fromInt(lowprimes[Math.floor(Math.random() * lowprimes.length)]);
          var y = a.modPow(r2, this);
          if (y.compareTo(BigInteger.ONE) != 0 && y.compareTo(n1) != 0) {
            var j = 1;
            while (j++ < k && y.compareTo(n1) != 0) {
              y = y.modPowInt(2, this);
              if (y.compareTo(BigInteger.ONE) == 0) return false;
            }
            if (y.compareTo(n1) != 0) return false;
          }
        }
        return true;
      }
      BigInteger.prototype.chunkSize = bnpChunkSize;
      BigInteger.prototype.toRadix = bnpToRadix;
      BigInteger.prototype.fromRadix = bnpFromRadix;
      BigInteger.prototype.fromNumber = bnpFromNumber;
      BigInteger.prototype.bitwiseTo = bnpBitwiseTo;
      BigInteger.prototype.changeBit = bnpChangeBit;
      BigInteger.prototype.addTo = bnpAddTo;
      BigInteger.prototype.dMultiply = bnpDMultiply;
      BigInteger.prototype.dAddOffset = bnpDAddOffset;
      BigInteger.prototype.multiplyLowerTo = bnpMultiplyLowerTo;
      BigInteger.prototype.multiplyUpperTo = bnpMultiplyUpperTo;
      BigInteger.prototype.modInt = bnpModInt;
      BigInteger.prototype.millerRabin = bnpMillerRabin;
      BigInteger.prototype.clone = bnClone;
      BigInteger.prototype.intValue = bnIntValue;
      BigInteger.prototype.byteValue = bnByteValue;
      BigInteger.prototype.shortValue = bnShortValue;
      BigInteger.prototype.signum = bnSigNum;
      BigInteger.prototype.toByteArray = bnToByteArray;
      BigInteger.prototype.equals = bnEquals;
      BigInteger.prototype.min = bnMin;
      BigInteger.prototype.max = bnMax;
      BigInteger.prototype.and = bnAnd;
      BigInteger.prototype.or = bnOr;
      BigInteger.prototype.xor = bnXor;
      BigInteger.prototype.andNot = bnAndNot;
      BigInteger.prototype.not = bnNot;
      BigInteger.prototype.shiftLeft = bnShiftLeft;
      BigInteger.prototype.shiftRight = bnShiftRight;
      BigInteger.prototype.getLowestSetBit = bnGetLowestSetBit;
      BigInteger.prototype.bitCount = bnBitCount;
      BigInteger.prototype.testBit = bnTestBit;
      BigInteger.prototype.setBit = bnSetBit;
      BigInteger.prototype.clearBit = bnClearBit;
      BigInteger.prototype.flipBit = bnFlipBit;
      BigInteger.prototype.add = bnAdd;
      BigInteger.prototype.subtract = bnSubtract;
      BigInteger.prototype.multiply = bnMultiply;
      BigInteger.prototype.divide = bnDivide;
      BigInteger.prototype.remainder = bnRemainder;
      BigInteger.prototype.divideAndRemainder = bnDivideAndRemainder;
      BigInteger.prototype.modPow = bnModPow;
      BigInteger.prototype.modInverse = bnModInverse;
      BigInteger.prototype.pow = bnPow;
      BigInteger.prototype.gcd = bnGCD;
      BigInteger.prototype.isProbablePrime = bnIsProbablePrime;
      BigInteger.prototype.square = bnSquare;
      BigInteger.prototype.Barrett = Barrett;
      var rng_state;
      var rng_pool;
      var rng_pptr;
      function rng_seed_int(x2) {
        rng_pool[rng_pptr++] ^= x2 & 255;
        rng_pool[rng_pptr++] ^= x2 >> 8 & 255;
        rng_pool[rng_pptr++] ^= x2 >> 16 & 255;
        rng_pool[rng_pptr++] ^= x2 >> 24 & 255;
        if (rng_pptr >= rng_psize) rng_pptr -= rng_psize;
      }
      function rng_seed_time() {
        rng_seed_int((/* @__PURE__ */ new Date()).getTime());
      }
      if (rng_pool == null) {
        rng_pool = new Array();
        rng_pptr = 0;
        var t2;
        if (typeof window !== "undefined" && window.crypto) {
          if (window.crypto.getRandomValues) {
            var ua = new Uint8Array(32);
            window.crypto.getRandomValues(ua);
            for (t2 = 0; t2 < 32; ++t2)
              rng_pool[rng_pptr++] = ua[t2];
          } else if (navigator.appName == "Netscape" && navigator.appVersion < "5") {
            var z = window.crypto.random(32);
            for (t2 = 0; t2 < z.length; ++t2)
              rng_pool[rng_pptr++] = z.charCodeAt(t2) & 255;
          }
        }
        while (rng_pptr < rng_psize) {
          t2 = Math.floor(65536 * Math.random());
          rng_pool[rng_pptr++] = t2 >>> 8;
          rng_pool[rng_pptr++] = t2 & 255;
        }
        rng_pptr = 0;
        rng_seed_time();
      }
      function rng_get_byte() {
        if (rng_state == null) {
          rng_seed_time();
          rng_state = prng_newstate();
          rng_state.init(rng_pool);
          for (rng_pptr = 0; rng_pptr < rng_pool.length; ++rng_pptr)
            rng_pool[rng_pptr] = 0;
          rng_pptr = 0;
        }
        return rng_state.next();
      }
      function rng_get_bytes(ba) {
        var i2;
        for (i2 = 0; i2 < ba.length; ++i2) ba[i2] = rng_get_byte();
      }
      function SecureRandom() {
      }
      SecureRandom.prototype.nextBytes = rng_get_bytes;
      function Arcfour() {
        this.i = 0;
        this.j = 0;
        this.S = new Array();
      }
      function ARC4init(key) {
        var i2, j, t3;
        for (i2 = 0; i2 < 256; ++i2)
          this.S[i2] = i2;
        j = 0;
        for (i2 = 0; i2 < 256; ++i2) {
          j = j + this.S[i2] + key[i2 % key.length] & 255;
          t3 = this.S[i2];
          this.S[i2] = this.S[j];
          this.S[j] = t3;
        }
        this.i = 0;
        this.j = 0;
      }
      function ARC4next() {
        var t3;
        this.i = this.i + 1 & 255;
        this.j = this.j + this.S[this.i] & 255;
        t3 = this.S[this.i];
        this.S[this.i] = this.S[this.j];
        this.S[this.j] = t3;
        return this.S[t3 + this.S[this.i] & 255];
      }
      Arcfour.prototype.init = ARC4init;
      Arcfour.prototype.next = ARC4next;
      function prng_newstate() {
        return new Arcfour();
      }
      var rng_psize = 256;
      if (typeof exports2 !== "undefined") {
        exports2 = module2.exports = {
          default: BigInteger,
          BigInteger,
          SecureRandom
        };
      } else {
        this.jsbn = {
          BigInteger,
          SecureRandom
        };
      }
    }).call(exports2);
  }
});

// node_modules/sprintf-js/src/sprintf.js
var require_sprintf = __commonJS({
  "node_modules/sprintf-js/src/sprintf.js"(exports2) {
    !function() {
      "use strict";
      var re = {
        not_string: /[^s]/,
        not_bool: /[^t]/,
        not_type: /[^T]/,
        not_primitive: /[^v]/,
        number: /[diefg]/,
        numeric_arg: /[bcdiefguxX]/,
        json: /[j]/,
        not_json: /[^j]/,
        text: /^[^\x25]+/,
        modulo: /^\x25{2}/,
        placeholder: /^\x25(?:([1-9]\d*)\$|\(([^)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-gijostTuvxX])/,
        key: /^([a-z_][a-z_\d]*)/i,
        key_access: /^\.([a-z_][a-z_\d]*)/i,
        index_access: /^\[(\d+)\]/,
        sign: /^[+-]/
      };
      function sprintf(key) {
        return sprintf_format(sprintf_parse(key), arguments);
      }
      function vsprintf(fmt, argv) {
        return sprintf.apply(null, [fmt].concat(argv || []));
      }
      function sprintf_format(parse_tree, argv) {
        var cursor = 1, tree_length = parse_tree.length, arg, output = "", i2, k, ph, pad, pad_character, pad_length, is_positive, sign;
        for (i2 = 0; i2 < tree_length; i2++) {
          if (typeof parse_tree[i2] === "string") {
            output += parse_tree[i2];
          } else if (typeof parse_tree[i2] === "object") {
            ph = parse_tree[i2];
            if (ph.keys) {
              arg = argv[cursor];
              for (k = 0; k < ph.keys.length; k++) {
                if (arg == void 0) {
                  throw new Error(sprintf('[sprintf] Cannot access property "%s" of undefined value "%s"', ph.keys[k], ph.keys[k - 1]));
                }
                arg = arg[ph.keys[k]];
              }
            } else if (ph.param_no) {
              arg = argv[ph.param_no];
            } else {
              arg = argv[cursor++];
            }
            if (re.not_type.test(ph.type) && re.not_primitive.test(ph.type) && arg instanceof Function) {
              arg = arg();
            }
            if (re.numeric_arg.test(ph.type) && (typeof arg !== "number" && isNaN(arg))) {
              throw new TypeError(sprintf("[sprintf] expecting number but found %T", arg));
            }
            if (re.number.test(ph.type)) {
              is_positive = arg >= 0;
            }
            switch (ph.type) {
              case "b":
                arg = parseInt(arg, 10).toString(2);
                break;
              case "c":
                arg = String.fromCharCode(parseInt(arg, 10));
                break;
              case "d":
              case "i":
                arg = parseInt(arg, 10);
                break;
              case "j":
                arg = JSON.stringify(arg, null, ph.width ? parseInt(ph.width) : 0);
                break;
              case "e":
                arg = ph.precision ? parseFloat(arg).toExponential(ph.precision) : parseFloat(arg).toExponential();
                break;
              case "f":
                arg = ph.precision ? parseFloat(arg).toFixed(ph.precision) : parseFloat(arg);
                break;
              case "g":
                arg = ph.precision ? String(Number(arg.toPrecision(ph.precision))) : parseFloat(arg);
                break;
              case "o":
                arg = (parseInt(arg, 10) >>> 0).toString(8);
                break;
              case "s":
                arg = String(arg);
                arg = ph.precision ? arg.substring(0, ph.precision) : arg;
                break;
              case "t":
                arg = String(!!arg);
                arg = ph.precision ? arg.substring(0, ph.precision) : arg;
                break;
              case "T":
                arg = Object.prototype.toString.call(arg).slice(8, -1).toLowerCase();
                arg = ph.precision ? arg.substring(0, ph.precision) : arg;
                break;
              case "u":
                arg = parseInt(arg, 10) >>> 0;
                break;
              case "v":
                arg = arg.valueOf();
                arg = ph.precision ? arg.substring(0, ph.precision) : arg;
                break;
              case "x":
                arg = (parseInt(arg, 10) >>> 0).toString(16);
                break;
              case "X":
                arg = (parseInt(arg, 10) >>> 0).toString(16).toUpperCase();
                break;
            }
            if (re.json.test(ph.type)) {
              output += arg;
            } else {
              if (re.number.test(ph.type) && (!is_positive || ph.sign)) {
                sign = is_positive ? "+" : "-";
                arg = arg.toString().replace(re.sign, "");
              } else {
                sign = "";
              }
              pad_character = ph.pad_char ? ph.pad_char === "0" ? "0" : ph.pad_char.charAt(1) : " ";
              pad_length = ph.width - (sign + arg).length;
              pad = ph.width ? pad_length > 0 ? pad_character.repeat(pad_length) : "" : "";
              output += ph.align ? sign + arg + pad : pad_character === "0" ? sign + pad + arg : pad + sign + arg;
            }
          }
        }
        return output;
      }
      var sprintf_cache = /* @__PURE__ */ Object.create(null);
      function sprintf_parse(fmt) {
        if (sprintf_cache[fmt]) {
          return sprintf_cache[fmt];
        }
        var _fmt = fmt, match, parse_tree = [], arg_names = 0;
        while (_fmt) {
          if ((match = re.text.exec(_fmt)) !== null) {
            parse_tree.push(match[0]);
          } else if ((match = re.modulo.exec(_fmt)) !== null) {
            parse_tree.push("%");
          } else if ((match = re.placeholder.exec(_fmt)) !== null) {
            if (match[2]) {
              arg_names |= 1;
              var field_list = [], replacement_field = match[2], field_match = [];
              if ((field_match = re.key.exec(replacement_field)) !== null) {
                field_list.push(field_match[1]);
                while ((replacement_field = replacement_field.substring(field_match[0].length)) !== "") {
                  if ((field_match = re.key_access.exec(replacement_field)) !== null) {
                    field_list.push(field_match[1]);
                  } else if ((field_match = re.index_access.exec(replacement_field)) !== null) {
                    field_list.push(field_match[1]);
                  } else {
                    throw new SyntaxError("[sprintf] failed to parse named argument key");
                  }
                }
              } else {
                throw new SyntaxError("[sprintf] failed to parse named argument key");
              }
              match[2] = field_list;
            } else {
              arg_names |= 2;
            }
            if (arg_names === 3) {
              throw new Error("[sprintf] mixing positional and named placeholders is not (yet) supported");
            }
            parse_tree.push(
              {
                placeholder: match[0],
                param_no: match[1],
                keys: match[2],
                sign: match[3],
                pad_char: match[4],
                align: match[5],
                width: match[6],
                precision: match[7],
                type: match[8]
              }
            );
          } else {
            throw new SyntaxError("[sprintf] unexpected placeholder");
          }
          _fmt = _fmt.substring(match[0].length);
        }
        return sprintf_cache[fmt] = parse_tree;
      }
      if (typeof exports2 !== "undefined") {
        exports2["sprintf"] = sprintf;
        exports2["vsprintf"] = vsprintf;
      }
      if (typeof window !== "undefined") {
        window["sprintf"] = sprintf;
        window["vsprintf"] = vsprintf;
        if (typeof define === "function" && define["amd"]) {
          define(function() {
            return {
              "sprintf": sprintf,
              "vsprintf": vsprintf
            };
          });
        }
      }
    }();
  }
});

// node_modules/ip-address/dist/ipv4.js
var require_ipv4 = __commonJS({
  "node_modules/ip-address/dist/ipv4.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m2, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m2, k);
      if (!desc || ("get" in desc ? !m2.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m2[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m2, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m2[k];
    });
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Address4 = void 0;
    var common = __importStar(require_common());
    var constants = __importStar(require_constants2());
    var address_error_1 = require_address_error();
    var jsbn_1 = require_jsbn();
    var sprintf_js_1 = require_sprintf();
    var Address4 = class _Address4 {
      constructor(address) {
        this.groups = constants.GROUPS;
        this.parsedAddress = [];
        this.parsedSubnet = "";
        this.subnet = "/32";
        this.subnetMask = 32;
        this.v4 = true;
        this.isCorrect = common.isCorrect(constants.BITS);
        this.isInSubnet = common.isInSubnet;
        this.address = address;
        const subnet = constants.RE_SUBNET_STRING.exec(address);
        if (subnet) {
          this.parsedSubnet = subnet[0].replace("/", "");
          this.subnetMask = parseInt(this.parsedSubnet, 10);
          this.subnet = `/${this.subnetMask}`;
          if (this.subnetMask < 0 || this.subnetMask > constants.BITS) {
            throw new address_error_1.AddressError("Invalid subnet mask.");
          }
          address = address.replace(constants.RE_SUBNET_STRING, "");
        }
        this.addressMinusSuffix = address;
        this.parsedAddress = this.parse(address);
      }
      static isValid(address) {
        try {
          new _Address4(address);
          return true;
        } catch (e2) {
          return false;
        }
      }
      /*
       * Parses a v4 address
       */
      parse(address) {
        const groups = address.split(".");
        if (!address.match(constants.RE_ADDRESS)) {
          throw new address_error_1.AddressError("Invalid IPv4 address.");
        }
        return groups;
      }
      /**
       * Returns the correct form of an address
       * @memberof Address4
       * @instance
       * @returns {String}
       */
      correctForm() {
        return this.parsedAddress.map((part) => parseInt(part, 10)).join(".");
      }
      /**
       * Converts a hex string to an IPv4 address object
       * @memberof Address4
       * @static
       * @param {string} hex - a hex string to convert
       * @returns {Address4}
       */
      static fromHex(hex) {
        const padded = hex.replace(/:/g, "").padStart(8, "0");
        const groups = [];
        let i2;
        for (i2 = 0; i2 < 8; i2 += 2) {
          const h2 = padded.slice(i2, i2 + 2);
          groups.push(parseInt(h2, 16));
        }
        return new _Address4(groups.join("."));
      }
      /**
       * Converts an integer into a IPv4 address object
       * @memberof Address4
       * @static
       * @param {integer} integer - a number to convert
       * @returns {Address4}
       */
      static fromInteger(integer) {
        return _Address4.fromHex(integer.toString(16));
      }
      /**
       * Return an address from in-addr.arpa form
       * @memberof Address4
       * @static
       * @param {string} arpaFormAddress - an 'in-addr.arpa' form ipv4 address
       * @returns {Adress4}
       * @example
       * var address = Address4.fromArpa(42.2.0.192.in-addr.arpa.)
       * address.correctForm(); // '192.0.2.42'
       */
      static fromArpa(arpaFormAddress) {
        const leader = arpaFormAddress.replace(/(\.in-addr\.arpa)?\.$/, "");
        const address = leader.split(".").reverse().join(".");
        return new _Address4(address);
      }
      /**
       * Converts an IPv4 address object to a hex string
       * @memberof Address4
       * @instance
       * @returns {String}
       */
      toHex() {
        return this.parsedAddress.map((part) => (0, sprintf_js_1.sprintf)("%02x", parseInt(part, 10))).join(":");
      }
      /**
       * Converts an IPv4 address object to an array of bytes
       * @memberof Address4
       * @instance
       * @returns {Array}
       */
      toArray() {
        return this.parsedAddress.map((part) => parseInt(part, 10));
      }
      /**
       * Converts an IPv4 address object to an IPv6 address group
       * @memberof Address4
       * @instance
       * @returns {String}
       */
      toGroup6() {
        const output = [];
        let i2;
        for (i2 = 0; i2 < constants.GROUPS; i2 += 2) {
          const hex = (0, sprintf_js_1.sprintf)("%02x%02x", parseInt(this.parsedAddress[i2], 10), parseInt(this.parsedAddress[i2 + 1], 10));
          output.push((0, sprintf_js_1.sprintf)("%x", parseInt(hex, 16)));
        }
        return output.join(":");
      }
      /**
       * Returns the address as a BigInteger
       * @memberof Address4
       * @instance
       * @returns {BigInteger}
       */
      bigInteger() {
        return new jsbn_1.BigInteger(this.parsedAddress.map((n) => (0, sprintf_js_1.sprintf)("%02x", parseInt(n, 10))).join(""), 16);
      }
      /**
       * Helper function getting start address.
       * @memberof Address4
       * @instance
       * @returns {BigInteger}
       */
      _startAddress() {
        return new jsbn_1.BigInteger(this.mask() + "0".repeat(constants.BITS - this.subnetMask), 2);
      }
      /**
       * The first address in the range given by this address' subnet.
       * Often referred to as the Network Address.
       * @memberof Address4
       * @instance
       * @returns {Address4}
       */
      startAddress() {
        return _Address4.fromBigInteger(this._startAddress());
      }
      /**
       * The first host address in the range given by this address's subnet ie
       * the first address after the Network Address
       * @memberof Address4
       * @instance
       * @returns {Address4}
       */
      startAddressExclusive() {
        const adjust = new jsbn_1.BigInteger("1");
        return _Address4.fromBigInteger(this._startAddress().add(adjust));
      }
      /**
       * Helper function getting end address.
       * @memberof Address4
       * @instance
       * @returns {BigInteger}
       */
      _endAddress() {
        return new jsbn_1.BigInteger(this.mask() + "1".repeat(constants.BITS - this.subnetMask), 2);
      }
      /**
       * The last address in the range given by this address' subnet
       * Often referred to as the Broadcast
       * @memberof Address4
       * @instance
       * @returns {Address4}
       */
      endAddress() {
        return _Address4.fromBigInteger(this._endAddress());
      }
      /**
       * The last host address in the range given by this address's subnet ie
       * the last address prior to the Broadcast Address
       * @memberof Address4
       * @instance
       * @returns {Address4}
       */
      endAddressExclusive() {
        const adjust = new jsbn_1.BigInteger("1");
        return _Address4.fromBigInteger(this._endAddress().subtract(adjust));
      }
      /**
       * Converts a BigInteger to a v4 address object
       * @memberof Address4
       * @static
       * @param {BigInteger} bigInteger - a BigInteger to convert
       * @returns {Address4}
       */
      static fromBigInteger(bigInteger) {
        return _Address4.fromInteger(parseInt(bigInteger.toString(), 10));
      }
      /**
       * Returns the first n bits of the address, defaulting to the
       * subnet mask
       * @memberof Address4
       * @instance
       * @returns {String}
       */
      mask(mask) {
        if (mask === void 0) {
          mask = this.subnetMask;
        }
        return this.getBitsBase2(0, mask);
      }
      /**
       * Returns the bits in the given range as a base-2 string
       * @memberof Address4
       * @instance
       * @returns {string}
       */
      getBitsBase2(start, end) {
        return this.binaryZeroPad().slice(start, end);
      }
      /**
       * Return the reversed ip6.arpa form of the address
       * @memberof Address4
       * @param {Object} options
       * @param {boolean} options.omitSuffix - omit the "in-addr.arpa" suffix
       * @instance
       * @returns {String}
       */
      reverseForm(options) {
        if (!options) {
          options = {};
        }
        const reversed = this.correctForm().split(".").reverse().join(".");
        if (options.omitSuffix) {
          return reversed;
        }
        return (0, sprintf_js_1.sprintf)("%s.in-addr.arpa.", reversed);
      }
      /**
       * Returns true if the given address is a multicast address
       * @memberof Address4
       * @instance
       * @returns {boolean}
       */
      isMulticast() {
        return this.isInSubnet(new _Address4("224.0.0.0/4"));
      }
      /**
       * Returns a zero-padded base-2 string representation of the address
       * @memberof Address4
       * @instance
       * @returns {string}
       */
      binaryZeroPad() {
        return this.bigInteger().toString(2).padStart(constants.BITS, "0");
      }
      /**
       * Groups an IPv4 address for inclusion at the end of an IPv6 address
       * @returns {String}
       */
      groupForV6() {
        const segments = this.parsedAddress;
        return this.address.replace(constants.RE_ADDRESS, (0, sprintf_js_1.sprintf)('<span class="hover-group group-v4 group-6">%s</span>.<span class="hover-group group-v4 group-7">%s</span>', segments.slice(0, 2).join("."), segments.slice(2, 4).join(".")));
      }
    };
    exports2.Address4 = Address4;
  }
});

// node_modules/ip-address/dist/v6/constants.js
var require_constants3 = __commonJS({
  "node_modules/ip-address/dist/v6/constants.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.RE_URL_WITH_PORT = exports2.RE_URL = exports2.RE_ZONE_STRING = exports2.RE_SUBNET_STRING = exports2.RE_BAD_ADDRESS = exports2.RE_BAD_CHARACTERS = exports2.TYPES = exports2.SCOPES = exports2.GROUPS = exports2.BITS = void 0;
    exports2.BITS = 128;
    exports2.GROUPS = 8;
    exports2.SCOPES = {
      0: "Reserved",
      1: "Interface local",
      2: "Link local",
      4: "Admin local",
      5: "Site local",
      8: "Organization local",
      14: "Global",
      15: "Reserved"
    };
    exports2.TYPES = {
      "ff01::1/128": "Multicast (All nodes on this interface)",
      "ff01::2/128": "Multicast (All routers on this interface)",
      "ff02::1/128": "Multicast (All nodes on this link)",
      "ff02::2/128": "Multicast (All routers on this link)",
      "ff05::2/128": "Multicast (All routers in this site)",
      "ff02::5/128": "Multicast (OSPFv3 AllSPF routers)",
      "ff02::6/128": "Multicast (OSPFv3 AllDR routers)",
      "ff02::9/128": "Multicast (RIP routers)",
      "ff02::a/128": "Multicast (EIGRP routers)",
      "ff02::d/128": "Multicast (PIM routers)",
      "ff02::16/128": "Multicast (MLDv2 reports)",
      "ff01::fb/128": "Multicast (mDNSv6)",
      "ff02::fb/128": "Multicast (mDNSv6)",
      "ff05::fb/128": "Multicast (mDNSv6)",
      "ff02::1:2/128": "Multicast (All DHCP servers and relay agents on this link)",
      "ff05::1:2/128": "Multicast (All DHCP servers and relay agents in this site)",
      "ff02::1:3/128": "Multicast (All DHCP servers on this link)",
      "ff05::1:3/128": "Multicast (All DHCP servers in this site)",
      "::/128": "Unspecified",
      "::1/128": "Loopback",
      "ff00::/8": "Multicast",
      "fe80::/10": "Link-local unicast"
    };
    exports2.RE_BAD_CHARACTERS = /([^0-9a-f:/%])/gi;
    exports2.RE_BAD_ADDRESS = /([0-9a-f]{5,}|:{3,}|[^:]:$|^:[^:]|\/$)/gi;
    exports2.RE_SUBNET_STRING = /\/\d{1,3}(?=%|$)/;
    exports2.RE_ZONE_STRING = /%.*$/;
    exports2.RE_URL = new RegExp(/^\[{0,1}([0-9a-f:]+)\]{0,1}/);
    exports2.RE_URL_WITH_PORT = new RegExp(/\[([0-9a-f:]+)\]:([0-9]{1,5})/);
  }
});

// node_modules/ip-address/dist/v6/helpers.js
var require_helpers = __commonJS({
  "node_modules/ip-address/dist/v6/helpers.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.simpleGroup = exports2.spanLeadingZeroes = exports2.spanAll = exports2.spanAllZeroes = void 0;
    var sprintf_js_1 = require_sprintf();
    function spanAllZeroes(s2) {
      return s2.replace(/(0+)/g, '<span class="zero">$1</span>');
    }
    exports2.spanAllZeroes = spanAllZeroes;
    function spanAll(s2, offset = 0) {
      const letters = s2.split("");
      return letters.map(
        (n, i2) => (0, sprintf_js_1.sprintf)('<span class="digit value-%s position-%d">%s</span>', n, i2 + offset, spanAllZeroes(n))
        // XXX Use #base-2 .value-0 instead?
      ).join("");
    }
    exports2.spanAll = spanAll;
    function spanLeadingZeroesSimple(group) {
      return group.replace(/^(0+)/, '<span class="zero">$1</span>');
    }
    function spanLeadingZeroes(address) {
      const groups = address.split(":");
      return groups.map((g) => spanLeadingZeroesSimple(g)).join(":");
    }
    exports2.spanLeadingZeroes = spanLeadingZeroes;
    function simpleGroup(addressString, offset = 0) {
      const groups = addressString.split(":");
      return groups.map((g, i2) => {
        if (/group-v4/.test(g)) {
          return g;
        }
        return (0, sprintf_js_1.sprintf)('<span class="hover-group group-%d">%s</span>', i2 + offset, spanLeadingZeroesSimple(g));
      });
    }
    exports2.simpleGroup = simpleGroup;
  }
});

// node_modules/ip-address/dist/v6/regular-expressions.js
var require_regular_expressions = __commonJS({
  "node_modules/ip-address/dist/v6/regular-expressions.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m2, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m2, k);
      if (!desc || ("get" in desc ? !m2.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m2[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m2, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m2[k];
    });
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.possibleElisions = exports2.simpleRegularExpression = exports2.ADDRESS_BOUNDARY = exports2.padGroup = exports2.groupPossibilities = void 0;
    var v6 = __importStar(require_constants3());
    var sprintf_js_1 = require_sprintf();
    function groupPossibilities(possibilities) {
      return (0, sprintf_js_1.sprintf)("(%s)", possibilities.join("|"));
    }
    exports2.groupPossibilities = groupPossibilities;
    function padGroup(group) {
      if (group.length < 4) {
        return (0, sprintf_js_1.sprintf)("0{0,%d}%s", 4 - group.length, group);
      }
      return group;
    }
    exports2.padGroup = padGroup;
    exports2.ADDRESS_BOUNDARY = "[^A-Fa-f0-9:]";
    function simpleRegularExpression(groups) {
      const zeroIndexes = [];
      groups.forEach((group, i2) => {
        const groupInteger = parseInt(group, 16);
        if (groupInteger === 0) {
          zeroIndexes.push(i2);
        }
      });
      const possibilities = zeroIndexes.map((zeroIndex) => groups.map((group, i2) => {
        if (i2 === zeroIndex) {
          const elision = i2 === 0 || i2 === v6.GROUPS - 1 ? ":" : "";
          return groupPossibilities([padGroup(group), elision]);
        }
        return padGroup(group);
      }).join(":"));
      possibilities.push(groups.map(padGroup).join(":"));
      return groupPossibilities(possibilities);
    }
    exports2.simpleRegularExpression = simpleRegularExpression;
    function possibleElisions(elidedGroups, moreLeft, moreRight) {
      const left = moreLeft ? "" : ":";
      const right = moreRight ? "" : ":";
      const possibilities = [];
      if (!moreLeft && !moreRight) {
        possibilities.push("::");
      }
      if (moreLeft && moreRight) {
        possibilities.push("");
      }
      if (moreRight && !moreLeft || !moreRight && moreLeft) {
        possibilities.push(":");
      }
      possibilities.push((0, sprintf_js_1.sprintf)("%s(:0{1,4}){1,%d}", left, elidedGroups - 1));
      possibilities.push((0, sprintf_js_1.sprintf)("(0{1,4}:){1,%d}%s", elidedGroups - 1, right));
      possibilities.push((0, sprintf_js_1.sprintf)("(0{1,4}:){%d}0{1,4}", elidedGroups - 1));
      for (let groups = 1; groups < elidedGroups - 1; groups++) {
        for (let position = 1; position < elidedGroups - groups; position++) {
          possibilities.push((0, sprintf_js_1.sprintf)("(0{1,4}:){%d}:(0{1,4}:){%d}0{1,4}", position, elidedGroups - position - groups - 1));
        }
      }
      return groupPossibilities(possibilities);
    }
    exports2.possibleElisions = possibleElisions;
  }
});

// node_modules/ip-address/dist/ipv6.js
var require_ipv6 = __commonJS({
  "node_modules/ip-address/dist/ipv6.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m2, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m2, k);
      if (!desc || ("get" in desc ? !m2.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m2[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m2, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m2[k];
    });
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Address6 = void 0;
    var common = __importStar(require_common());
    var constants4 = __importStar(require_constants2());
    var constants6 = __importStar(require_constants3());
    var helpers = __importStar(require_helpers());
    var ipv4_1 = require_ipv4();
    var regular_expressions_1 = require_regular_expressions();
    var address_error_1 = require_address_error();
    var jsbn_1 = require_jsbn();
    var sprintf_js_1 = require_sprintf();
    function assert(condition) {
      if (!condition) {
        throw new Error("Assertion failed.");
      }
    }
    function addCommas(number) {
      const r2 = /(\d+)(\d{3})/;
      while (r2.test(number)) {
        number = number.replace(r2, "$1,$2");
      }
      return number;
    }
    function spanLeadingZeroes4(n) {
      n = n.replace(/^(0{1,})([1-9]+)$/, '<span class="parse-error">$1</span>$2');
      n = n.replace(/^(0{1,})(0)$/, '<span class="parse-error">$1</span>$2');
      return n;
    }
    function compact(address, slice) {
      const s1 = [];
      const s2 = [];
      let i2;
      for (i2 = 0; i2 < address.length; i2++) {
        if (i2 < slice[0]) {
          s1.push(address[i2]);
        } else if (i2 > slice[1]) {
          s2.push(address[i2]);
        }
      }
      return s1.concat(["compact"]).concat(s2);
    }
    function paddedHex(octet) {
      return (0, sprintf_js_1.sprintf)("%04x", parseInt(octet, 16));
    }
    function unsignByte(b) {
      return b & 255;
    }
    var Address6 = class _Address6 {
      constructor(address, optionalGroups) {
        this.addressMinusSuffix = "";
        this.parsedSubnet = "";
        this.subnet = "/128";
        this.subnetMask = 128;
        this.v4 = false;
        this.zone = "";
        this.isInSubnet = common.isInSubnet;
        this.isCorrect = common.isCorrect(constants6.BITS);
        if (optionalGroups === void 0) {
          this.groups = constants6.GROUPS;
        } else {
          this.groups = optionalGroups;
        }
        this.address = address;
        const subnet = constants6.RE_SUBNET_STRING.exec(address);
        if (subnet) {
          this.parsedSubnet = subnet[0].replace("/", "");
          this.subnetMask = parseInt(this.parsedSubnet, 10);
          this.subnet = `/${this.subnetMask}`;
          if (Number.isNaN(this.subnetMask) || this.subnetMask < 0 || this.subnetMask > constants6.BITS) {
            throw new address_error_1.AddressError("Invalid subnet mask.");
          }
          address = address.replace(constants6.RE_SUBNET_STRING, "");
        } else if (/\//.test(address)) {
          throw new address_error_1.AddressError("Invalid subnet mask.");
        }
        const zone = constants6.RE_ZONE_STRING.exec(address);
        if (zone) {
          this.zone = zone[0];
          address = address.replace(constants6.RE_ZONE_STRING, "");
        }
        this.addressMinusSuffix = address;
        this.parsedAddress = this.parse(this.addressMinusSuffix);
      }
      static isValid(address) {
        try {
          new _Address6(address);
          return true;
        } catch (e2) {
          return false;
        }
      }
      /**
       * Convert a BigInteger to a v6 address object
       * @memberof Address6
       * @static
       * @param {BigInteger} bigInteger - a BigInteger to convert
       * @returns {Address6}
       * @example
       * var bigInteger = new BigInteger('1000000000000');
       * var address = Address6.fromBigInteger(bigInteger);
       * address.correctForm(); // '::e8:d4a5:1000'
       */
      static fromBigInteger(bigInteger) {
        const hex = bigInteger.toString(16).padStart(32, "0");
        const groups = [];
        let i2;
        for (i2 = 0; i2 < constants6.GROUPS; i2++) {
          groups.push(hex.slice(i2 * 4, (i2 + 1) * 4));
        }
        return new _Address6(groups.join(":"));
      }
      /**
       * Convert a URL (with optional port number) to an address object
       * @memberof Address6
       * @static
       * @param {string} url - a URL with optional port number
       * @example
       * var addressAndPort = Address6.fromURL('http://[ffff::]:8080/foo/');
       * addressAndPort.address.correctForm(); // 'ffff::'
       * addressAndPort.port; // 8080
       */
      static fromURL(url) {
        let host;
        let port = null;
        let result;
        if (url.indexOf("[") !== -1 && url.indexOf("]:") !== -1) {
          result = constants6.RE_URL_WITH_PORT.exec(url);
          if (result === null) {
            return {
              error: "failed to parse address with port",
              address: null,
              port: null
            };
          }
          host = result[1];
          port = result[2];
        } else if (url.indexOf("/") !== -1) {
          url = url.replace(/^[a-z0-9]+:\/\//, "");
          result = constants6.RE_URL.exec(url);
          if (result === null) {
            return {
              error: "failed to parse address from URL",
              address: null,
              port: null
            };
          }
          host = result[1];
        } else {
          host = url;
        }
        if (port) {
          port = parseInt(port, 10);
          if (port < 0 || port > 65536) {
            port = null;
          }
        } else {
          port = null;
        }
        return {
          address: new _Address6(host),
          port
        };
      }
      /**
       * Create an IPv6-mapped address given an IPv4 address
       * @memberof Address6
       * @static
       * @param {string} address - An IPv4 address string
       * @returns {Address6}
       * @example
       * var address = Address6.fromAddress4('192.168.0.1');
       * address.correctForm(); // '::ffff:c0a8:1'
       * address.to4in6(); // '::ffff:192.168.0.1'
       */
      static fromAddress4(address) {
        const address4 = new ipv4_1.Address4(address);
        const mask6 = constants6.BITS - (constants4.BITS - address4.subnetMask);
        return new _Address6(`::ffff:${address4.correctForm()}/${mask6}`);
      }
      /**
       * Return an address from ip6.arpa form
       * @memberof Address6
       * @static
       * @param {string} arpaFormAddress - an 'ip6.arpa' form address
       * @returns {Adress6}
       * @example
       * var address = Address6.fromArpa(e.f.f.f.3.c.2.6.f.f.f.e.6.6.8.e.1.0.6.7.9.4.e.c.0.0.0.0.1.0.0.2.ip6.arpa.)
       * address.correctForm(); // '2001:0:ce49:7601:e866:efff:62c3:fffe'
       */
      static fromArpa(arpaFormAddress) {
        let address = arpaFormAddress.replace(/(\.ip6\.arpa)?\.$/, "");
        const semicolonAmount = 7;
        if (address.length !== 63) {
          throw new address_error_1.AddressError("Invalid 'ip6.arpa' form.");
        }
        const parts = address.split(".").reverse();
        for (let i2 = semicolonAmount; i2 > 0; i2--) {
          const insertIndex = i2 * 4;
          parts.splice(insertIndex, 0, ":");
        }
        address = parts.join("");
        return new _Address6(address);
      }
      /**
       * Return the Microsoft UNC transcription of the address
       * @memberof Address6
       * @instance
       * @returns {String} the Microsoft UNC transcription of the address
       */
      microsoftTranscription() {
        return (0, sprintf_js_1.sprintf)("%s.ipv6-literal.net", this.correctForm().replace(/:/g, "-"));
      }
      /**
       * Return the first n bits of the address, defaulting to the subnet mask
       * @memberof Address6
       * @instance
       * @param {number} [mask=subnet] - the number of bits to mask
       * @returns {String} the first n bits of the address as a string
       */
      mask(mask = this.subnetMask) {
        return this.getBitsBase2(0, mask);
      }
      /**
       * Return the number of possible subnets of a given size in the address
       * @memberof Address6
       * @instance
       * @param {number} [size=128] - the subnet size
       * @returns {String}
       */
      // TODO: probably useful to have a numeric version of this too
      possibleSubnets(subnetSize = 128) {
        const availableBits = constants6.BITS - this.subnetMask;
        const subnetBits = Math.abs(subnetSize - constants6.BITS);
        const subnetPowers = availableBits - subnetBits;
        if (subnetPowers < 0) {
          return "0";
        }
        return addCommas(new jsbn_1.BigInteger("2", 10).pow(subnetPowers).toString(10));
      }
      /**
       * Helper function getting start address.
       * @memberof Address6
       * @instance
       * @returns {BigInteger}
       */
      _startAddress() {
        return new jsbn_1.BigInteger(this.mask() + "0".repeat(constants6.BITS - this.subnetMask), 2);
      }
      /**
       * The first address in the range given by this address' subnet
       * Often referred to as the Network Address.
       * @memberof Address6
       * @instance
       * @returns {Address6}
       */
      startAddress() {
        return _Address6.fromBigInteger(this._startAddress());
      }
      /**
       * The first host address in the range given by this address's subnet ie
       * the first address after the Network Address
       * @memberof Address6
       * @instance
       * @returns {Address6}
       */
      startAddressExclusive() {
        const adjust = new jsbn_1.BigInteger("1");
        return _Address6.fromBigInteger(this._startAddress().add(adjust));
      }
      /**
       * Helper function getting end address.
       * @memberof Address6
       * @instance
       * @returns {BigInteger}
       */
      _endAddress() {
        return new jsbn_1.BigInteger(this.mask() + "1".repeat(constants6.BITS - this.subnetMask), 2);
      }
      /**
       * The last address in the range given by this address' subnet
       * Often referred to as the Broadcast
       * @memberof Address6
       * @instance
       * @returns {Address6}
       */
      endAddress() {
        return _Address6.fromBigInteger(this._endAddress());
      }
      /**
       * The last host address in the range given by this address's subnet ie
       * the last address prior to the Broadcast Address
       * @memberof Address6
       * @instance
       * @returns {Address6}
       */
      endAddressExclusive() {
        const adjust = new jsbn_1.BigInteger("1");
        return _Address6.fromBigInteger(this._endAddress().subtract(adjust));
      }
      /**
       * Return the scope of the address
       * @memberof Address6
       * @instance
       * @returns {String}
       */
      getScope() {
        let scope = constants6.SCOPES[this.getBits(12, 16).intValue()];
        if (this.getType() === "Global unicast" && scope !== "Link local") {
          scope = "Global";
        }
        return scope || "Unknown";
      }
      /**
       * Return the type of the address
       * @memberof Address6
       * @instance
       * @returns {String}
       */
      getType() {
        for (const subnet of Object.keys(constants6.TYPES)) {
          if (this.isInSubnet(new _Address6(subnet))) {
            return constants6.TYPES[subnet];
          }
        }
        return "Global unicast";
      }
      /**
       * Return the bits in the given range as a BigInteger
       * @memberof Address6
       * @instance
       * @returns {BigInteger}
       */
      getBits(start, end) {
        return new jsbn_1.BigInteger(this.getBitsBase2(start, end), 2);
      }
      /**
       * Return the bits in the given range as a base-2 string
       * @memberof Address6
       * @instance
       * @returns {String}
       */
      getBitsBase2(start, end) {
        return this.binaryZeroPad().slice(start, end);
      }
      /**
       * Return the bits in the given range as a base-16 string
       * @memberof Address6
       * @instance
       * @returns {String}
       */
      getBitsBase16(start, end) {
        const length = end - start;
        if (length % 4 !== 0) {
          throw new Error("Length of bits to retrieve must be divisible by four");
        }
        return this.getBits(start, end).toString(16).padStart(length / 4, "0");
      }
      /**
       * Return the bits that are set past the subnet mask length
       * @memberof Address6
       * @instance
       * @returns {String}
       */
      getBitsPastSubnet() {
        return this.getBitsBase2(this.subnetMask, constants6.BITS);
      }
      /**
       * Return the reversed ip6.arpa form of the address
       * @memberof Address6
       * @param {Object} options
       * @param {boolean} options.omitSuffix - omit the "ip6.arpa" suffix
       * @instance
       * @returns {String}
       */
      reverseForm(options) {
        if (!options) {
          options = {};
        }
        const characters = Math.floor(this.subnetMask / 4);
        const reversed = this.canonicalForm().replace(/:/g, "").split("").slice(0, characters).reverse().join(".");
        if (characters > 0) {
          if (options.omitSuffix) {
            return reversed;
          }
          return (0, sprintf_js_1.sprintf)("%s.ip6.arpa.", reversed);
        }
        if (options.omitSuffix) {
          return "";
        }
        return "ip6.arpa.";
      }
      /**
       * Return the correct form of the address
       * @memberof Address6
       * @instance
       * @returns {String}
       */
      correctForm() {
        let i2;
        let groups = [];
        let zeroCounter = 0;
        const zeroes = [];
        for (i2 = 0; i2 < this.parsedAddress.length; i2++) {
          const value = parseInt(this.parsedAddress[i2], 16);
          if (value === 0) {
            zeroCounter++;
          }
          if (value !== 0 && zeroCounter > 0) {
            if (zeroCounter > 1) {
              zeroes.push([i2 - zeroCounter, i2 - 1]);
            }
            zeroCounter = 0;
          }
        }
        if (zeroCounter > 1) {
          zeroes.push([this.parsedAddress.length - zeroCounter, this.parsedAddress.length - 1]);
        }
        const zeroLengths = zeroes.map((n) => n[1] - n[0] + 1);
        if (zeroes.length > 0) {
          const index = zeroLengths.indexOf(Math.max(...zeroLengths));
          groups = compact(this.parsedAddress, zeroes[index]);
        } else {
          groups = this.parsedAddress;
        }
        for (i2 = 0; i2 < groups.length; i2++) {
          if (groups[i2] !== "compact") {
            groups[i2] = parseInt(groups[i2], 16).toString(16);
          }
        }
        let correct = groups.join(":");
        correct = correct.replace(/^compact$/, "::");
        correct = correct.replace(/^compact|compact$/, ":");
        correct = correct.replace(/compact/, "");
        return correct;
      }
      /**
       * Return a zero-padded base-2 string representation of the address
       * @memberof Address6
       * @instance
       * @returns {String}
       * @example
       * var address = new Address6('2001:4860:4001:803::1011');
       * address.binaryZeroPad();
       * // '0010000000000001010010000110000001000000000000010000100000000011
       * //  0000000000000000000000000000000000000000000000000001000000010001'
       */
      binaryZeroPad() {
        return this.bigInteger().toString(2).padStart(constants6.BITS, "0");
      }
      // TODO: Improve the semantics of this helper function
      parse4in6(address) {
        const groups = address.split(":");
        const lastGroup = groups.slice(-1)[0];
        const address4 = lastGroup.match(constants4.RE_ADDRESS);
        if (address4) {
          this.parsedAddress4 = address4[0];
          this.address4 = new ipv4_1.Address4(this.parsedAddress4);
          for (let i2 = 0; i2 < this.address4.groups; i2++) {
            if (/^0[0-9]+/.test(this.address4.parsedAddress[i2])) {
              throw new address_error_1.AddressError("IPv4 addresses can't have leading zeroes.", address.replace(constants4.RE_ADDRESS, this.address4.parsedAddress.map(spanLeadingZeroes4).join(".")));
            }
          }
          this.v4 = true;
          groups[groups.length - 1] = this.address4.toGroup6();
          address = groups.join(":");
        }
        return address;
      }
      // TODO: Make private?
      parse(address) {
        address = this.parse4in6(address);
        const badCharacters = address.match(constants6.RE_BAD_CHARACTERS);
        if (badCharacters) {
          throw new address_error_1.AddressError((0, sprintf_js_1.sprintf)("Bad character%s detected in address: %s", badCharacters.length > 1 ? "s" : "", badCharacters.join("")), address.replace(constants6.RE_BAD_CHARACTERS, '<span class="parse-error">$1</span>'));
        }
        const badAddress = address.match(constants6.RE_BAD_ADDRESS);
        if (badAddress) {
          throw new address_error_1.AddressError((0, sprintf_js_1.sprintf)("Address failed regex: %s", badAddress.join("")), address.replace(constants6.RE_BAD_ADDRESS, '<span class="parse-error">$1</span>'));
        }
        let groups = [];
        const halves = address.split("::");
        if (halves.length === 2) {
          let first = halves[0].split(":");
          let last = halves[1].split(":");
          if (first.length === 1 && first[0] === "") {
            first = [];
          }
          if (last.length === 1 && last[0] === "") {
            last = [];
          }
          const remaining = this.groups - (first.length + last.length);
          if (!remaining) {
            throw new address_error_1.AddressError("Error parsing groups");
          }
          this.elidedGroups = remaining;
          this.elisionBegin = first.length;
          this.elisionEnd = first.length + this.elidedGroups;
          groups = groups.concat(first);
          for (let i2 = 0; i2 < remaining; i2++) {
            groups.push("0");
          }
          groups = groups.concat(last);
        } else if (halves.length === 1) {
          groups = address.split(":");
          this.elidedGroups = 0;
        } else {
          throw new address_error_1.AddressError("Too many :: groups found");
        }
        groups = groups.map((group) => (0, sprintf_js_1.sprintf)("%x", parseInt(group, 16)));
        if (groups.length !== this.groups) {
          throw new address_error_1.AddressError("Incorrect number of groups found");
        }
        return groups;
      }
      /**
       * Return the canonical form of the address
       * @memberof Address6
       * @instance
       * @returns {String}
       */
      canonicalForm() {
        return this.parsedAddress.map(paddedHex).join(":");
      }
      /**
       * Return the decimal form of the address
       * @memberof Address6
       * @instance
       * @returns {String}
       */
      decimal() {
        return this.parsedAddress.map((n) => (0, sprintf_js_1.sprintf)("%05d", parseInt(n, 16))).join(":");
      }
      /**
       * Return the address as a BigInteger
       * @memberof Address6
       * @instance
       * @returns {BigInteger}
       */
      bigInteger() {
        return new jsbn_1.BigInteger(this.parsedAddress.map(paddedHex).join(""), 16);
      }
      /**
       * Return the last two groups of this address as an IPv4 address string
       * @memberof Address6
       * @instance
       * @returns {Address4}
       * @example
       * var address = new Address6('2001:4860:4001::1825:bf11');
       * address.to4().correctForm(); // '24.37.191.17'
       */
      to4() {
        const binary = this.binaryZeroPad().split("");
        return ipv4_1.Address4.fromHex(new jsbn_1.BigInteger(binary.slice(96, 128).join(""), 2).toString(16));
      }
      /**
       * Return the v4-in-v6 form of the address
       * @memberof Address6
       * @instance
       * @returns {String}
       */
      to4in6() {
        const address4 = this.to4();
        const address6 = new _Address6(this.parsedAddress.slice(0, 6).join(":"), 6);
        const correct = address6.correctForm();
        let infix = "";
        if (!/:$/.test(correct)) {
          infix = ":";
        }
        return correct + infix + address4.address;
      }
      /**
       * Return an object containing the Teredo properties of the address
       * @memberof Address6
       * @instance
       * @returns {Object}
       */
      inspectTeredo() {
        const prefix = this.getBitsBase16(0, 32);
        const udpPort = this.getBits(80, 96).xor(new jsbn_1.BigInteger("ffff", 16)).toString();
        const server4 = ipv4_1.Address4.fromHex(this.getBitsBase16(32, 64));
        const client4 = ipv4_1.Address4.fromHex(this.getBits(96, 128).xor(new jsbn_1.BigInteger("ffffffff", 16)).toString(16));
        const flags = this.getBits(64, 80);
        const flagsBase2 = this.getBitsBase2(64, 80);
        const coneNat = flags.testBit(15);
        const reserved = flags.testBit(14);
        const groupIndividual = flags.testBit(8);
        const universalLocal = flags.testBit(9);
        const nonce = new jsbn_1.BigInteger(flagsBase2.slice(2, 6) + flagsBase2.slice(8, 16), 2).toString(10);
        return {
          prefix: (0, sprintf_js_1.sprintf)("%s:%s", prefix.slice(0, 4), prefix.slice(4, 8)),
          server4: server4.address,
          client4: client4.address,
          flags: flagsBase2,
          coneNat,
          microsoft: {
            reserved,
            universalLocal,
            groupIndividual,
            nonce
          },
          udpPort
        };
      }
      /**
       * Return an object containing the 6to4 properties of the address
       * @memberof Address6
       * @instance
       * @returns {Object}
       */
      inspect6to4() {
        const prefix = this.getBitsBase16(0, 16);
        const gateway = ipv4_1.Address4.fromHex(this.getBitsBase16(16, 48));
        return {
          prefix: (0, sprintf_js_1.sprintf)("%s", prefix.slice(0, 4)),
          gateway: gateway.address
        };
      }
      /**
       * Return a v6 6to4 address from a v6 v4inv6 address
       * @memberof Address6
       * @instance
       * @returns {Address6}
       */
      to6to4() {
        if (!this.is4()) {
          return null;
        }
        const addr6to4 = [
          "2002",
          this.getBitsBase16(96, 112),
          this.getBitsBase16(112, 128),
          "",
          "/16"
        ].join(":");
        return new _Address6(addr6to4);
      }
      /**
       * Return a byte array
       * @memberof Address6
       * @instance
       * @returns {Array}
       */
      toByteArray() {
        const byteArray = this.bigInteger().toByteArray();
        if (byteArray.length === 17 && byteArray[0] === 0) {
          return byteArray.slice(1);
        }
        return byteArray;
      }
      /**
       * Return an unsigned byte array
       * @memberof Address6
       * @instance
       * @returns {Array}
       */
      toUnsignedByteArray() {
        return this.toByteArray().map(unsignByte);
      }
      /**
       * Convert a byte array to an Address6 object
       * @memberof Address6
       * @static
       * @returns {Address6}
       */
      static fromByteArray(bytes) {
        return this.fromUnsignedByteArray(bytes.map(unsignByte));
      }
      /**
       * Convert an unsigned byte array to an Address6 object
       * @memberof Address6
       * @static
       * @returns {Address6}
       */
      static fromUnsignedByteArray(bytes) {
        const BYTE_MAX = new jsbn_1.BigInteger("256", 10);
        let result = new jsbn_1.BigInteger("0", 10);
        let multiplier = new jsbn_1.BigInteger("1", 10);
        for (let i2 = bytes.length - 1; i2 >= 0; i2--) {
          result = result.add(multiplier.multiply(new jsbn_1.BigInteger(bytes[i2].toString(10), 10)));
          multiplier = multiplier.multiply(BYTE_MAX);
        }
        return _Address6.fromBigInteger(result);
      }
      /**
       * Returns true if the address is in the canonical form, false otherwise
       * @memberof Address6
       * @instance
       * @returns {boolean}
       */
      isCanonical() {
        return this.addressMinusSuffix === this.canonicalForm();
      }
      /**
       * Returns true if the address is a link local address, false otherwise
       * @memberof Address6
       * @instance
       * @returns {boolean}
       */
      isLinkLocal() {
        if (this.getBitsBase2(0, 64) === "1111111010000000000000000000000000000000000000000000000000000000") {
          return true;
        }
        return false;
      }
      /**
       * Returns true if the address is a multicast address, false otherwise
       * @memberof Address6
       * @instance
       * @returns {boolean}
       */
      isMulticast() {
        return this.getType() === "Multicast";
      }
      /**
       * Returns true if the address is a v4-in-v6 address, false otherwise
       * @memberof Address6
       * @instance
       * @returns {boolean}
       */
      is4() {
        return this.v4;
      }
      /**
       * Returns true if the address is a Teredo address, false otherwise
       * @memberof Address6
       * @instance
       * @returns {boolean}
       */
      isTeredo() {
        return this.isInSubnet(new _Address6("2001::/32"));
      }
      /**
       * Returns true if the address is a 6to4 address, false otherwise
       * @memberof Address6
       * @instance
       * @returns {boolean}
       */
      is6to4() {
        return this.isInSubnet(new _Address6("2002::/16"));
      }
      /**
       * Returns true if the address is a loopback address, false otherwise
       * @memberof Address6
       * @instance
       * @returns {boolean}
       */
      isLoopback() {
        return this.getType() === "Loopback";
      }
      // #endregion
      // #region HTML
      /**
       * @returns {String} the address in link form with a default port of 80
       */
      href(optionalPort) {
        if (optionalPort === void 0) {
          optionalPort = "";
        } else {
          optionalPort = (0, sprintf_js_1.sprintf)(":%s", optionalPort);
        }
        return (0, sprintf_js_1.sprintf)("http://[%s]%s/", this.correctForm(), optionalPort);
      }
      /**
       * @returns {String} a link suitable for conveying the address via a URL hash
       */
      link(options) {
        if (!options) {
          options = {};
        }
        if (options.className === void 0) {
          options.className = "";
        }
        if (options.prefix === void 0) {
          options.prefix = "/#address=";
        }
        if (options.v4 === void 0) {
          options.v4 = false;
        }
        let formFunction = this.correctForm;
        if (options.v4) {
          formFunction = this.to4in6;
        }
        if (options.className) {
          return (0, sprintf_js_1.sprintf)('<a href="%1$s%2$s" class="%3$s">%2$s</a>', options.prefix, formFunction.call(this), options.className);
        }
        return (0, sprintf_js_1.sprintf)('<a href="%1$s%2$s">%2$s</a>', options.prefix, formFunction.call(this));
      }
      /**
       * Groups an address
       * @returns {String}
       */
      group() {
        if (this.elidedGroups === 0) {
          return helpers.simpleGroup(this.address).join(":");
        }
        assert(typeof this.elidedGroups === "number");
        assert(typeof this.elisionBegin === "number");
        const output = [];
        const [left, right] = this.address.split("::");
        if (left.length) {
          output.push(...helpers.simpleGroup(left));
        } else {
          output.push("");
        }
        const classes = ["hover-group"];
        for (let i2 = this.elisionBegin; i2 < this.elisionBegin + this.elidedGroups; i2++) {
          classes.push((0, sprintf_js_1.sprintf)("group-%d", i2));
        }
        output.push((0, sprintf_js_1.sprintf)('<span class="%s"></span>', classes.join(" ")));
        if (right.length) {
          output.push(...helpers.simpleGroup(right, this.elisionEnd));
        } else {
          output.push("");
        }
        if (this.is4()) {
          assert(this.address4 instanceof ipv4_1.Address4);
          output.pop();
          output.push(this.address4.groupForV6());
        }
        return output.join(":");
      }
      // #endregion
      // #region Regular expressions
      /**
       * Generate a regular expression string that can be used to find or validate
       * all variations of this address
       * @memberof Address6
       * @instance
       * @param {boolean} substringSearch
       * @returns {string}
       */
      regularExpressionString(substringSearch = false) {
        let output = [];
        const address6 = new _Address6(this.correctForm());
        if (address6.elidedGroups === 0) {
          output.push((0, regular_expressions_1.simpleRegularExpression)(address6.parsedAddress));
        } else if (address6.elidedGroups === constants6.GROUPS) {
          output.push((0, regular_expressions_1.possibleElisions)(constants6.GROUPS));
        } else {
          const halves = address6.address.split("::");
          if (halves[0].length) {
            output.push((0, regular_expressions_1.simpleRegularExpression)(halves[0].split(":")));
          }
          assert(typeof address6.elidedGroups === "number");
          output.push((0, regular_expressions_1.possibleElisions)(address6.elidedGroups, halves[0].length !== 0, halves[1].length !== 0));
          if (halves[1].length) {
            output.push((0, regular_expressions_1.simpleRegularExpression)(halves[1].split(":")));
          }
          output = [output.join(":")];
        }
        if (!substringSearch) {
          output = [
            "(?=^|",
            regular_expressions_1.ADDRESS_BOUNDARY,
            "|[^\\w\\:])(",
            ...output,
            ")(?=[^\\w\\:]|",
            regular_expressions_1.ADDRESS_BOUNDARY,
            "|$)"
          ];
        }
        return output.join("");
      }
      /**
       * Generate a regular expression that can be used to find or validate all
       * variations of this address.
       * @memberof Address6
       * @instance
       * @param {boolean} substringSearch
       * @returns {RegExp}
       */
      regularExpression(substringSearch = false) {
        return new RegExp(this.regularExpressionString(substringSearch), "i");
      }
    };
    exports2.Address6 = Address6;
  }
});

// node_modules/ip-address/dist/ip-address.js
var require_ip_address = __commonJS({
  "node_modules/ip-address/dist/ip-address.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m2, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m2, k);
      if (!desc || ("get" in desc ? !m2.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m2[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m2, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m2[k];
    });
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.v6 = exports2.AddressError = exports2.Address6 = exports2.Address4 = void 0;
    var ipv4_1 = require_ipv4();
    Object.defineProperty(exports2, "Address4", { enumerable: true, get: function() {
      return ipv4_1.Address4;
    } });
    var ipv6_1 = require_ipv6();
    Object.defineProperty(exports2, "Address6", { enumerable: true, get: function() {
      return ipv6_1.Address6;
    } });
    var address_error_1 = require_address_error();
    Object.defineProperty(exports2, "AddressError", { enumerable: true, get: function() {
      return address_error_1.AddressError;
    } });
    var helpers = __importStar(require_helpers());
    exports2.v6 = { helpers };
  }
});

// node_modules/socks/build/common/helpers.js
var require_helpers2 = __commonJS({
  "node_modules/socks/build/common/helpers.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ipToBuffer = exports2.int32ToIpv4 = exports2.ipv4ToInt32 = exports2.validateSocksClientChainOptions = exports2.validateSocksClientOptions = void 0;
    var util_1 = require_util();
    var constants_1 = require_constants();
    var stream = require("stream");
    var ip_address_1 = require_ip_address();
    var net = require("net");
    function validateSocksClientOptions(options, acceptedCommands = ["connect", "bind", "associate"]) {
      if (!constants_1.SocksCommand[options.command]) {
        throw new util_1.SocksClientError(constants_1.ERRORS.InvalidSocksCommand, options);
      }
      if (acceptedCommands.indexOf(options.command) === -1) {
        throw new util_1.SocksClientError(constants_1.ERRORS.InvalidSocksCommandForOperation, options);
      }
      if (!isValidSocksRemoteHost(options.destination)) {
        throw new util_1.SocksClientError(constants_1.ERRORS.InvalidSocksClientOptionsDestination, options);
      }
      if (!isValidSocksProxy(options.proxy)) {
        throw new util_1.SocksClientError(constants_1.ERRORS.InvalidSocksClientOptionsProxy, options);
      }
      validateCustomProxyAuth(options.proxy, options);
      if (options.timeout && !isValidTimeoutValue(options.timeout)) {
        throw new util_1.SocksClientError(constants_1.ERRORS.InvalidSocksClientOptionsTimeout, options);
      }
      if (options.existing_socket && !(options.existing_socket instanceof stream.Duplex)) {
        throw new util_1.SocksClientError(constants_1.ERRORS.InvalidSocksClientOptionsExistingSocket, options);
      }
    }
    exports2.validateSocksClientOptions = validateSocksClientOptions;
    function validateSocksClientChainOptions(options) {
      if (options.command !== "connect") {
        throw new util_1.SocksClientError(constants_1.ERRORS.InvalidSocksCommandChain, options);
      }
      if (!isValidSocksRemoteHost(options.destination)) {
        throw new util_1.SocksClientError(constants_1.ERRORS.InvalidSocksClientOptionsDestination, options);
      }
      if (!(options.proxies && Array.isArray(options.proxies) && options.proxies.length >= 2)) {
        throw new util_1.SocksClientError(constants_1.ERRORS.InvalidSocksClientOptionsProxiesLength, options);
      }
      options.proxies.forEach((proxy) => {
        if (!isValidSocksProxy(proxy)) {
          throw new util_1.SocksClientError(constants_1.ERRORS.InvalidSocksClientOptionsProxy, options);
        }
        validateCustomProxyAuth(proxy, options);
      });
      if (options.timeout && !isValidTimeoutValue(options.timeout)) {
        throw new util_1.SocksClientError(constants_1.ERRORS.InvalidSocksClientOptionsTimeout, options);
      }
    }
    exports2.validateSocksClientChainOptions = validateSocksClientChainOptions;
    function validateCustomProxyAuth(proxy, options) {
      if (proxy.custom_auth_method !== void 0) {
        if (proxy.custom_auth_method < constants_1.SOCKS5_CUSTOM_AUTH_START || proxy.custom_auth_method > constants_1.SOCKS5_CUSTOM_AUTH_END) {
          throw new util_1.SocksClientError(constants_1.ERRORS.InvalidSocksClientOptionsCustomAuthRange, options);
        }
        if (proxy.custom_auth_request_handler === void 0 || typeof proxy.custom_auth_request_handler !== "function") {
          throw new util_1.SocksClientError(constants_1.ERRORS.InvalidSocksClientOptionsCustomAuthOptions, options);
        }
        if (proxy.custom_auth_response_size === void 0) {
          throw new util_1.SocksClientError(constants_1.ERRORS.InvalidSocksClientOptionsCustomAuthOptions, options);
        }
        if (proxy.custom_auth_response_handler === void 0 || typeof proxy.custom_auth_response_handler !== "function") {
          throw new util_1.SocksClientError(constants_1.ERRORS.InvalidSocksClientOptionsCustomAuthOptions, options);
        }
      }
    }
    function isValidSocksRemoteHost(remoteHost) {
      return remoteHost && typeof remoteHost.host === "string" && Buffer.byteLength(remoteHost.host) < 256 && typeof remoteHost.port === "number" && remoteHost.port >= 0 && remoteHost.port <= 65535;
    }
    function isValidSocksProxy(proxy) {
      return proxy && (typeof proxy.host === "string" || typeof proxy.ipaddress === "string") && typeof proxy.port === "number" && proxy.port >= 0 && proxy.port <= 65535 && (proxy.type === 4 || proxy.type === 5);
    }
    function isValidTimeoutValue(value) {
      return typeof value === "number" && value > 0;
    }
    function ipv4ToInt32(ip) {
      const address = new ip_address_1.Address4(ip);
      return address.toArray().reduce((acc, part) => (acc << 8) + part, 0) >>> 0;
    }
    exports2.ipv4ToInt32 = ipv4ToInt32;
    function int32ToIpv4(int32) {
      const octet1 = int32 >>> 24 & 255;
      const octet2 = int32 >>> 16 & 255;
      const octet3 = int32 >>> 8 & 255;
      const octet4 = int32 & 255;
      return [octet1, octet2, octet3, octet4].join(".");
    }
    exports2.int32ToIpv4 = int32ToIpv4;
    function ipToBuffer(ip) {
      if (net.isIPv4(ip)) {
        const address = new ip_address_1.Address4(ip);
        return Buffer.from(address.toArray());
      } else if (net.isIPv6(ip)) {
        const address = new ip_address_1.Address6(ip);
        return Buffer.from(address.canonicalForm().split(":").map((segment) => segment.padStart(4, "0")).join(""), "hex");
      } else {
        throw new Error("Invalid IP address format");
      }
    }
    exports2.ipToBuffer = ipToBuffer;
  }
});

// node_modules/socks/build/common/receivebuffer.js
var require_receivebuffer = __commonJS({
  "node_modules/socks/build/common/receivebuffer.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ReceiveBuffer = void 0;
    var ReceiveBuffer = class {
      constructor(size = 4096) {
        this.buffer = Buffer.allocUnsafe(size);
        this.offset = 0;
        this.originalSize = size;
      }
      get length() {
        return this.offset;
      }
      append(data) {
        if (!Buffer.isBuffer(data)) {
          throw new Error("Attempted to append a non-buffer instance to ReceiveBuffer.");
        }
        if (this.offset + data.length >= this.buffer.length) {
          const tmp = this.buffer;
          this.buffer = Buffer.allocUnsafe(Math.max(this.buffer.length + this.originalSize, this.buffer.length + data.length));
          tmp.copy(this.buffer);
        }
        data.copy(this.buffer, this.offset);
        return this.offset += data.length;
      }
      peek(length) {
        if (length > this.offset) {
          throw new Error("Attempted to read beyond the bounds of the managed internal data.");
        }
        return this.buffer.slice(0, length);
      }
      get(length) {
        if (length > this.offset) {
          throw new Error("Attempted to read beyond the bounds of the managed internal data.");
        }
        const value = Buffer.allocUnsafe(length);
        this.buffer.slice(0, length).copy(value);
        this.buffer.copyWithin(0, length, length + this.offset - length);
        this.offset -= length;
        return value;
      }
    };
    exports2.ReceiveBuffer = ReceiveBuffer;
  }
});

// node_modules/socks/build/client/socksclient.js
var require_socksclient = __commonJS({
  "node_modules/socks/build/client/socksclient.js"(exports2) {
    "use strict";
    var __awaiter = exports2 && exports2.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e2) {
            reject(e2);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e2) {
            reject(e2);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SocksClientError = exports2.SocksClient = void 0;
    var events_1 = require("events");
    var net = require("net");
    var smart_buffer_1 = require_smartbuffer();
    var constants_1 = require_constants();
    var helpers_1 = require_helpers2();
    var receivebuffer_1 = require_receivebuffer();
    var util_1 = require_util();
    Object.defineProperty(exports2, "SocksClientError", { enumerable: true, get: function() {
      return util_1.SocksClientError;
    } });
    var ip_address_1 = require_ip_address();
    var SocksClient = class _SocksClient extends events_1.EventEmitter {
      constructor(options) {
        super();
        this.options = Object.assign({}, options);
        (0, helpers_1.validateSocksClientOptions)(options);
        this.setState(constants_1.SocksClientState.Created);
      }
      /**
       * Creates a new SOCKS connection.
       *
       * Note: Supports callbacks and promises. Only supports the connect command.
       * @param options { SocksClientOptions } Options.
       * @param callback { Function } An optional callback function.
       * @returns { Promise }
       */
      static createConnection(options, callback) {
        return new Promise((resolve, reject) => {
          try {
            (0, helpers_1.validateSocksClientOptions)(options, ["connect"]);
          } catch (err) {
            if (typeof callback === "function") {
              callback(err);
              return resolve(err);
            } else {
              return reject(err);
            }
          }
          const client = new _SocksClient(options);
          client.connect(options.existing_socket);
          client.once("established", (info) => {
            client.removeAllListeners();
            if (typeof callback === "function") {
              callback(null, info);
              resolve(info);
            } else {
              resolve(info);
            }
          });
          client.once("error", (err) => {
            client.removeAllListeners();
            if (typeof callback === "function") {
              callback(err);
              resolve(err);
            } else {
              reject(err);
            }
          });
        });
      }
      /**
       * Creates a new SOCKS connection chain to a destination host through 2 or more SOCKS proxies.
       *
       * Note: Supports callbacks and promises. Only supports the connect method.
       * Note: Implemented via createConnection() factory function.
       * @param options { SocksClientChainOptions } Options
       * @param callback { Function } An optional callback function.
       * @returns { Promise }
       */
      static createConnectionChain(options, callback) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
          try {
            (0, helpers_1.validateSocksClientChainOptions)(options);
          } catch (err) {
            if (typeof callback === "function") {
              callback(err);
              return resolve(err);
            } else {
              return reject(err);
            }
          }
          if (options.randomizeChain) {
            (0, util_1.shuffleArray)(options.proxies);
          }
          try {
            let sock;
            for (let i2 = 0; i2 < options.proxies.length; i2++) {
              const nextProxy = options.proxies[i2];
              const nextDestination = i2 === options.proxies.length - 1 ? options.destination : {
                host: options.proxies[i2 + 1].host || options.proxies[i2 + 1].ipaddress,
                port: options.proxies[i2 + 1].port
              };
              const result = yield _SocksClient.createConnection({
                command: "connect",
                proxy: nextProxy,
                destination: nextDestination,
                existing_socket: sock
              });
              sock = sock || result.socket;
            }
            if (typeof callback === "function") {
              callback(null, { socket: sock });
              resolve({ socket: sock });
            } else {
              resolve({ socket: sock });
            }
          } catch (err) {
            if (typeof callback === "function") {
              callback(err);
              resolve(err);
            } else {
              reject(err);
            }
          }
        }));
      }
      /**
       * Creates a SOCKS UDP Frame.
       * @param options
       */
      static createUDPFrame(options) {
        const buff = new smart_buffer_1.SmartBuffer();
        buff.writeUInt16BE(0);
        buff.writeUInt8(options.frameNumber || 0);
        if (net.isIPv4(options.remoteHost.host)) {
          buff.writeUInt8(constants_1.Socks5HostType.IPv4);
          buff.writeUInt32BE((0, helpers_1.ipv4ToInt32)(options.remoteHost.host));
        } else if (net.isIPv6(options.remoteHost.host)) {
          buff.writeUInt8(constants_1.Socks5HostType.IPv6);
          buff.writeBuffer((0, helpers_1.ipToBuffer)(options.remoteHost.host));
        } else {
          buff.writeUInt8(constants_1.Socks5HostType.Hostname);
          buff.writeUInt8(Buffer.byteLength(options.remoteHost.host));
          buff.writeString(options.remoteHost.host);
        }
        buff.writeUInt16BE(options.remoteHost.port);
        buff.writeBuffer(options.data);
        return buff.toBuffer();
      }
      /**
       * Parses a SOCKS UDP frame.
       * @param data
       */
      static parseUDPFrame(data) {
        const buff = smart_buffer_1.SmartBuffer.fromBuffer(data);
        buff.readOffset = 2;
        const frameNumber = buff.readUInt8();
        const hostType = buff.readUInt8();
        let remoteHost;
        if (hostType === constants_1.Socks5HostType.IPv4) {
          remoteHost = (0, helpers_1.int32ToIpv4)(buff.readUInt32BE());
        } else if (hostType === constants_1.Socks5HostType.IPv6) {
          remoteHost = ip_address_1.Address6.fromByteArray(Array.from(buff.readBuffer(16))).canonicalForm();
        } else {
          remoteHost = buff.readString(buff.readUInt8());
        }
        const remotePort = buff.readUInt16BE();
        return {
          frameNumber,
          remoteHost: {
            host: remoteHost,
            port: remotePort
          },
          data: buff.readBuffer()
        };
      }
      /**
       * Internal state setter. If the SocksClient is in an error state, it cannot be changed to a non error state.
       */
      setState(newState) {
        if (this.state !== constants_1.SocksClientState.Error) {
          this.state = newState;
        }
      }
      /**
       * Starts the connection establishment to the proxy and destination.
       * @param existingSocket Connected socket to use instead of creating a new one (internal use).
       */
      connect(existingSocket) {
        this.onDataReceived = (data) => this.onDataReceivedHandler(data);
        this.onClose = () => this.onCloseHandler();
        this.onError = (err) => this.onErrorHandler(err);
        this.onConnect = () => this.onConnectHandler();
        const timer = setTimeout(() => this.onEstablishedTimeout(), this.options.timeout || constants_1.DEFAULT_TIMEOUT);
        if (timer.unref && typeof timer.unref === "function") {
          timer.unref();
        }
        if (existingSocket) {
          this.socket = existingSocket;
        } else {
          this.socket = new net.Socket();
        }
        this.socket.once("close", this.onClose);
        this.socket.once("error", this.onError);
        this.socket.once("connect", this.onConnect);
        this.socket.on("data", this.onDataReceived);
        this.setState(constants_1.SocksClientState.Connecting);
        this.receiveBuffer = new receivebuffer_1.ReceiveBuffer();
        if (existingSocket) {
          this.socket.emit("connect");
        } else {
          this.socket.connect(this.getSocketOptions());
          if (this.options.set_tcp_nodelay !== void 0 && this.options.set_tcp_nodelay !== null) {
            this.socket.setNoDelay(!!this.options.set_tcp_nodelay);
          }
        }
        this.prependOnceListener("established", (info) => {
          setImmediate(() => {
            if (this.receiveBuffer.length > 0) {
              const excessData = this.receiveBuffer.get(this.receiveBuffer.length);
              info.socket.emit("data", excessData);
            }
            info.socket.resume();
          });
        });
      }
      // Socket options (defaults host/port to options.proxy.host/options.proxy.port)
      getSocketOptions() {
        return Object.assign(Object.assign({}, this.options.socket_options), { host: this.options.proxy.host || this.options.proxy.ipaddress, port: this.options.proxy.port });
      }
      /**
       * Handles internal Socks timeout callback.
       * Note: If the Socks client is not BoundWaitingForConnection or Established, the connection will be closed.
       */
      onEstablishedTimeout() {
        if (this.state !== constants_1.SocksClientState.Established && this.state !== constants_1.SocksClientState.BoundWaitingForConnection) {
          this.closeSocket(constants_1.ERRORS.ProxyConnectionTimedOut);
        }
      }
      /**
       * Handles Socket connect event.
       */
      onConnectHandler() {
        this.setState(constants_1.SocksClientState.Connected);
        if (this.options.proxy.type === 4) {
          this.sendSocks4InitialHandshake();
        } else {
          this.sendSocks5InitialHandshake();
        }
        this.setState(constants_1.SocksClientState.SentInitialHandshake);
      }
      /**
       * Handles Socket data event.
       * @param data
       */
      onDataReceivedHandler(data) {
        this.receiveBuffer.append(data);
        this.processData();
      }
      /**
       * Handles processing of the data we have received.
       */
      processData() {
        while (this.state !== constants_1.SocksClientState.Established && this.state !== constants_1.SocksClientState.Error && this.receiveBuffer.length >= this.nextRequiredPacketBufferSize) {
          if (this.state === constants_1.SocksClientState.SentInitialHandshake) {
            if (this.options.proxy.type === 4) {
              this.handleSocks4FinalHandshakeResponse();
            } else {
              this.handleInitialSocks5HandshakeResponse();
            }
          } else if (this.state === constants_1.SocksClientState.SentAuthentication) {
            this.handleInitialSocks5AuthenticationHandshakeResponse();
          } else if (this.state === constants_1.SocksClientState.SentFinalHandshake) {
            this.handleSocks5FinalHandshakeResponse();
          } else if (this.state === constants_1.SocksClientState.BoundWaitingForConnection) {
            if (this.options.proxy.type === 4) {
              this.handleSocks4IncomingConnectionResponse();
            } else {
              this.handleSocks5IncomingConnectionResponse();
            }
          } else {
            this.closeSocket(constants_1.ERRORS.InternalError);
            break;
          }
        }
      }
      /**
       * Handles Socket close event.
       * @param had_error
       */
      onCloseHandler() {
        this.closeSocket(constants_1.ERRORS.SocketClosed);
      }
      /**
       * Handles Socket error event.
       * @param err
       */
      onErrorHandler(err) {
        this.closeSocket(err.message);
      }
      /**
       * Removes internal event listeners on the underlying Socket.
       */
      removeInternalSocketHandlers() {
        this.socket.pause();
        this.socket.removeListener("data", this.onDataReceived);
        this.socket.removeListener("close", this.onClose);
        this.socket.removeListener("error", this.onError);
        this.socket.removeListener("connect", this.onConnect);
      }
      /**
       * Closes and destroys the underlying Socket. Emits an error event.
       * @param err { String } An error string to include in error event.
       */
      closeSocket(err) {
        if (this.state !== constants_1.SocksClientState.Error) {
          this.setState(constants_1.SocksClientState.Error);
          this.socket.destroy();
          this.removeInternalSocketHandlers();
          this.emit("error", new util_1.SocksClientError(err, this.options));
        }
      }
      /**
       * Sends initial Socks v4 handshake request.
       */
      sendSocks4InitialHandshake() {
        const userId = this.options.proxy.userId || "";
        const buff = new smart_buffer_1.SmartBuffer();
        buff.writeUInt8(4);
        buff.writeUInt8(constants_1.SocksCommand[this.options.command]);
        buff.writeUInt16BE(this.options.destination.port);
        if (net.isIPv4(this.options.destination.host)) {
          buff.writeBuffer((0, helpers_1.ipToBuffer)(this.options.destination.host));
          buff.writeStringNT(userId);
        } else {
          buff.writeUInt8(0);
          buff.writeUInt8(0);
          buff.writeUInt8(0);
          buff.writeUInt8(1);
          buff.writeStringNT(userId);
          buff.writeStringNT(this.options.destination.host);
        }
        this.nextRequiredPacketBufferSize = constants_1.SOCKS_INCOMING_PACKET_SIZES.Socks4Response;
        this.socket.write(buff.toBuffer());
      }
      /**
       * Handles Socks v4 handshake response.
       * @param data
       */
      handleSocks4FinalHandshakeResponse() {
        const data = this.receiveBuffer.get(8);
        if (data[1] !== constants_1.Socks4Response.Granted) {
          this.closeSocket(`${constants_1.ERRORS.Socks4ProxyRejectedConnection} - (${constants_1.Socks4Response[data[1]]})`);
        } else {
          if (constants_1.SocksCommand[this.options.command] === constants_1.SocksCommand.bind) {
            const buff = smart_buffer_1.SmartBuffer.fromBuffer(data);
            buff.readOffset = 2;
            const remoteHost = {
              port: buff.readUInt16BE(),
              host: (0, helpers_1.int32ToIpv4)(buff.readUInt32BE())
            };
            if (remoteHost.host === "0.0.0.0") {
              remoteHost.host = this.options.proxy.ipaddress;
            }
            this.setState(constants_1.SocksClientState.BoundWaitingForConnection);
            this.emit("bound", { remoteHost, socket: this.socket });
          } else {
            this.setState(constants_1.SocksClientState.Established);
            this.removeInternalSocketHandlers();
            this.emit("established", { socket: this.socket });
          }
        }
      }
      /**
       * Handles Socks v4 incoming connection request (BIND)
       * @param data
       */
      handleSocks4IncomingConnectionResponse() {
        const data = this.receiveBuffer.get(8);
        if (data[1] !== constants_1.Socks4Response.Granted) {
          this.closeSocket(`${constants_1.ERRORS.Socks4ProxyRejectedIncomingBoundConnection} - (${constants_1.Socks4Response[data[1]]})`);
        } else {
          const buff = smart_buffer_1.SmartBuffer.fromBuffer(data);
          buff.readOffset = 2;
          const remoteHost = {
            port: buff.readUInt16BE(),
            host: (0, helpers_1.int32ToIpv4)(buff.readUInt32BE())
          };
          this.setState(constants_1.SocksClientState.Established);
          this.removeInternalSocketHandlers();
          this.emit("established", { remoteHost, socket: this.socket });
        }
      }
      /**
       * Sends initial Socks v5 handshake request.
       */
      sendSocks5InitialHandshake() {
        const buff = new smart_buffer_1.SmartBuffer();
        const supportedAuthMethods = [constants_1.Socks5Auth.NoAuth];
        if (this.options.proxy.userId || this.options.proxy.password) {
          supportedAuthMethods.push(constants_1.Socks5Auth.UserPass);
        }
        if (this.options.proxy.custom_auth_method !== void 0) {
          supportedAuthMethods.push(this.options.proxy.custom_auth_method);
        }
        buff.writeUInt8(5);
        buff.writeUInt8(supportedAuthMethods.length);
        for (const authMethod of supportedAuthMethods) {
          buff.writeUInt8(authMethod);
        }
        this.nextRequiredPacketBufferSize = constants_1.SOCKS_INCOMING_PACKET_SIZES.Socks5InitialHandshakeResponse;
        this.socket.write(buff.toBuffer());
        this.setState(constants_1.SocksClientState.SentInitialHandshake);
      }
      /**
       * Handles initial Socks v5 handshake response.
       * @param data
       */
      handleInitialSocks5HandshakeResponse() {
        const data = this.receiveBuffer.get(2);
        if (data[0] !== 5) {
          this.closeSocket(constants_1.ERRORS.InvalidSocks5IntiailHandshakeSocksVersion);
        } else if (data[1] === constants_1.SOCKS5_NO_ACCEPTABLE_AUTH) {
          this.closeSocket(constants_1.ERRORS.InvalidSocks5InitialHandshakeNoAcceptedAuthType);
        } else {
          if (data[1] === constants_1.Socks5Auth.NoAuth) {
            this.socks5ChosenAuthType = constants_1.Socks5Auth.NoAuth;
            this.sendSocks5CommandRequest();
          } else if (data[1] === constants_1.Socks5Auth.UserPass) {
            this.socks5ChosenAuthType = constants_1.Socks5Auth.UserPass;
            this.sendSocks5UserPassAuthentication();
          } else if (data[1] === this.options.proxy.custom_auth_method) {
            this.socks5ChosenAuthType = this.options.proxy.custom_auth_method;
            this.sendSocks5CustomAuthentication();
          } else {
            this.closeSocket(constants_1.ERRORS.InvalidSocks5InitialHandshakeUnknownAuthType);
          }
        }
      }
      /**
       * Sends Socks v5 user & password auth handshake.
       *
       * Note: No auth and user/pass are currently supported.
       */
      sendSocks5UserPassAuthentication() {
        const userId = this.options.proxy.userId || "";
        const password = this.options.proxy.password || "";
        const buff = new smart_buffer_1.SmartBuffer();
        buff.writeUInt8(1);
        buff.writeUInt8(Buffer.byteLength(userId));
        buff.writeString(userId);
        buff.writeUInt8(Buffer.byteLength(password));
        buff.writeString(password);
        this.nextRequiredPacketBufferSize = constants_1.SOCKS_INCOMING_PACKET_SIZES.Socks5UserPassAuthenticationResponse;
        this.socket.write(buff.toBuffer());
        this.setState(constants_1.SocksClientState.SentAuthentication);
      }
      sendSocks5CustomAuthentication() {
        return __awaiter(this, void 0, void 0, function* () {
          this.nextRequiredPacketBufferSize = this.options.proxy.custom_auth_response_size;
          this.socket.write(yield this.options.proxy.custom_auth_request_handler());
          this.setState(constants_1.SocksClientState.SentAuthentication);
        });
      }
      handleSocks5CustomAuthHandshakeResponse(data) {
        return __awaiter(this, void 0, void 0, function* () {
          return yield this.options.proxy.custom_auth_response_handler(data);
        });
      }
      handleSocks5AuthenticationNoAuthHandshakeResponse(data) {
        return __awaiter(this, void 0, void 0, function* () {
          return data[1] === 0;
        });
      }
      handleSocks5AuthenticationUserPassHandshakeResponse(data) {
        return __awaiter(this, void 0, void 0, function* () {
          return data[1] === 0;
        });
      }
      /**
       * Handles Socks v5 auth handshake response.
       * @param data
       */
      handleInitialSocks5AuthenticationHandshakeResponse() {
        return __awaiter(this, void 0, void 0, function* () {
          this.setState(constants_1.SocksClientState.ReceivedAuthenticationResponse);
          let authResult = false;
          if (this.socks5ChosenAuthType === constants_1.Socks5Auth.NoAuth) {
            authResult = yield this.handleSocks5AuthenticationNoAuthHandshakeResponse(this.receiveBuffer.get(2));
          } else if (this.socks5ChosenAuthType === constants_1.Socks5Auth.UserPass) {
            authResult = yield this.handleSocks5AuthenticationUserPassHandshakeResponse(this.receiveBuffer.get(2));
          } else if (this.socks5ChosenAuthType === this.options.proxy.custom_auth_method) {
            authResult = yield this.handleSocks5CustomAuthHandshakeResponse(this.receiveBuffer.get(this.options.proxy.custom_auth_response_size));
          }
          if (!authResult) {
            this.closeSocket(constants_1.ERRORS.Socks5AuthenticationFailed);
          } else {
            this.sendSocks5CommandRequest();
          }
        });
      }
      /**
       * Sends Socks v5 final handshake request.
       */
      sendSocks5CommandRequest() {
        const buff = new smart_buffer_1.SmartBuffer();
        buff.writeUInt8(5);
        buff.writeUInt8(constants_1.SocksCommand[this.options.command]);
        buff.writeUInt8(0);
        if (net.isIPv4(this.options.destination.host)) {
          buff.writeUInt8(constants_1.Socks5HostType.IPv4);
          buff.writeBuffer((0, helpers_1.ipToBuffer)(this.options.destination.host));
        } else if (net.isIPv6(this.options.destination.host)) {
          buff.writeUInt8(constants_1.Socks5HostType.IPv6);
          buff.writeBuffer((0, helpers_1.ipToBuffer)(this.options.destination.host));
        } else {
          buff.writeUInt8(constants_1.Socks5HostType.Hostname);
          buff.writeUInt8(this.options.destination.host.length);
          buff.writeString(this.options.destination.host);
        }
        buff.writeUInt16BE(this.options.destination.port);
        this.nextRequiredPacketBufferSize = constants_1.SOCKS_INCOMING_PACKET_SIZES.Socks5ResponseHeader;
        this.socket.write(buff.toBuffer());
        this.setState(constants_1.SocksClientState.SentFinalHandshake);
      }
      /**
       * Handles Socks v5 final handshake response.
       * @param data
       */
      handleSocks5FinalHandshakeResponse() {
        const header = this.receiveBuffer.peek(5);
        if (header[0] !== 5 || header[1] !== constants_1.Socks5Response.Granted) {
          this.closeSocket(`${constants_1.ERRORS.InvalidSocks5FinalHandshakeRejected} - ${constants_1.Socks5Response[header[1]]}`);
        } else {
          const addressType = header[3];
          let remoteHost;
          let buff;
          if (addressType === constants_1.Socks5HostType.IPv4) {
            const dataNeeded = constants_1.SOCKS_INCOMING_PACKET_SIZES.Socks5ResponseIPv4;
            if (this.receiveBuffer.length < dataNeeded) {
              this.nextRequiredPacketBufferSize = dataNeeded;
              return;
            }
            buff = smart_buffer_1.SmartBuffer.fromBuffer(this.receiveBuffer.get(dataNeeded).slice(4));
            remoteHost = {
              host: (0, helpers_1.int32ToIpv4)(buff.readUInt32BE()),
              port: buff.readUInt16BE()
            };
            if (remoteHost.host === "0.0.0.0") {
              remoteHost.host = this.options.proxy.ipaddress;
            }
          } else if (addressType === constants_1.Socks5HostType.Hostname) {
            const hostLength = header[4];
            const dataNeeded = constants_1.SOCKS_INCOMING_PACKET_SIZES.Socks5ResponseHostname(hostLength);
            if (this.receiveBuffer.length < dataNeeded) {
              this.nextRequiredPacketBufferSize = dataNeeded;
              return;
            }
            buff = smart_buffer_1.SmartBuffer.fromBuffer(this.receiveBuffer.get(dataNeeded).slice(5));
            remoteHost = {
              host: buff.readString(hostLength),
              port: buff.readUInt16BE()
            };
          } else if (addressType === constants_1.Socks5HostType.IPv6) {
            const dataNeeded = constants_1.SOCKS_INCOMING_PACKET_SIZES.Socks5ResponseIPv6;
            if (this.receiveBuffer.length < dataNeeded) {
              this.nextRequiredPacketBufferSize = dataNeeded;
              return;
            }
            buff = smart_buffer_1.SmartBuffer.fromBuffer(this.receiveBuffer.get(dataNeeded).slice(4));
            remoteHost = {
              host: ip_address_1.Address6.fromByteArray(Array.from(buff.readBuffer(16))).canonicalForm(),
              port: buff.readUInt16BE()
            };
          }
          this.setState(constants_1.SocksClientState.ReceivedFinalResponse);
          if (constants_1.SocksCommand[this.options.command] === constants_1.SocksCommand.connect) {
            this.setState(constants_1.SocksClientState.Established);
            this.removeInternalSocketHandlers();
            this.emit("established", { remoteHost, socket: this.socket });
          } else if (constants_1.SocksCommand[this.options.command] === constants_1.SocksCommand.bind) {
            this.setState(constants_1.SocksClientState.BoundWaitingForConnection);
            this.nextRequiredPacketBufferSize = constants_1.SOCKS_INCOMING_PACKET_SIZES.Socks5ResponseHeader;
            this.emit("bound", { remoteHost, socket: this.socket });
          } else if (constants_1.SocksCommand[this.options.command] === constants_1.SocksCommand.associate) {
            this.setState(constants_1.SocksClientState.Established);
            this.removeInternalSocketHandlers();
            this.emit("established", {
              remoteHost,
              socket: this.socket
            });
          }
        }
      }
      /**
       * Handles Socks v5 incoming connection request (BIND).
       */
      handleSocks5IncomingConnectionResponse() {
        const header = this.receiveBuffer.peek(5);
        if (header[0] !== 5 || header[1] !== constants_1.Socks5Response.Granted) {
          this.closeSocket(`${constants_1.ERRORS.Socks5ProxyRejectedIncomingBoundConnection} - ${constants_1.Socks5Response[header[1]]}`);
        } else {
          const addressType = header[3];
          let remoteHost;
          let buff;
          if (addressType === constants_1.Socks5HostType.IPv4) {
            const dataNeeded = constants_1.SOCKS_INCOMING_PACKET_SIZES.Socks5ResponseIPv4;
            if (this.receiveBuffer.length < dataNeeded) {
              this.nextRequiredPacketBufferSize = dataNeeded;
              return;
            }
            buff = smart_buffer_1.SmartBuffer.fromBuffer(this.receiveBuffer.get(dataNeeded).slice(4));
            remoteHost = {
              host: (0, helpers_1.int32ToIpv4)(buff.readUInt32BE()),
              port: buff.readUInt16BE()
            };
            if (remoteHost.host === "0.0.0.0") {
              remoteHost.host = this.options.proxy.ipaddress;
            }
          } else if (addressType === constants_1.Socks5HostType.Hostname) {
            const hostLength = header[4];
            const dataNeeded = constants_1.SOCKS_INCOMING_PACKET_SIZES.Socks5ResponseHostname(hostLength);
            if (this.receiveBuffer.length < dataNeeded) {
              this.nextRequiredPacketBufferSize = dataNeeded;
              return;
            }
            buff = smart_buffer_1.SmartBuffer.fromBuffer(this.receiveBuffer.get(dataNeeded).slice(5));
            remoteHost = {
              host: buff.readString(hostLength),
              port: buff.readUInt16BE()
            };
          } else if (addressType === constants_1.Socks5HostType.IPv6) {
            const dataNeeded = constants_1.SOCKS_INCOMING_PACKET_SIZES.Socks5ResponseIPv6;
            if (this.receiveBuffer.length < dataNeeded) {
              this.nextRequiredPacketBufferSize = dataNeeded;
              return;
            }
            buff = smart_buffer_1.SmartBuffer.fromBuffer(this.receiveBuffer.get(dataNeeded).slice(4));
            remoteHost = {
              host: ip_address_1.Address6.fromByteArray(Array.from(buff.readBuffer(16))).canonicalForm(),
              port: buff.readUInt16BE()
            };
          }
          this.setState(constants_1.SocksClientState.Established);
          this.removeInternalSocketHandlers();
          this.emit("established", { remoteHost, socket: this.socket });
        }
      }
      get socksClientOptions() {
        return Object.assign({}, this.options);
      }
    };
    exports2.SocksClient = SocksClient;
  }
});

// node_modules/socks/build/index.js
var require_build = __commonJS({
  "node_modules/socks/build/index.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m2, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m2, k);
      if (!desc || ("get" in desc ? !m2.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m2[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m2, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m2[k];
    });
    var __exportStar = exports2 && exports2.__exportStar || function(m2, exports3) {
      for (var p in m2) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p)) __createBinding(exports3, m2, p);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    __exportStar(require_socksclient(), exports2);
  }
});

// node_modules/agent-base/dist/helpers.js
var require_helpers3 = __commonJS({
  "node_modules/agent-base/dist/helpers.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m2, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m2, k);
      if (!desc || ("get" in desc ? !m2.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m2[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m2, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m2[k];
    });
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.req = exports2.json = exports2.toBuffer = void 0;
    var http3 = __importStar(require("http"));
    var https2 = __importStar(require("https"));
    async function toBuffer(stream) {
      let length = 0;
      const chunks = [];
      for await (const chunk of stream) {
        length += chunk.length;
        chunks.push(chunk);
      }
      return Buffer.concat(chunks, length);
    }
    exports2.toBuffer = toBuffer;
    async function json(stream) {
      const buf = await toBuffer(stream);
      const str = buf.toString("utf8");
      try {
        return JSON.parse(str);
      } catch (_err) {
        const err = _err;
        err.message += ` (input: ${str})`;
        throw err;
      }
    }
    exports2.json = json;
    function req(url, opts = {}) {
      const href = typeof url === "string" ? url : url.href;
      const req2 = (href.startsWith("https:") ? https2 : http3).request(url, opts);
      const promise = new Promise((resolve, reject) => {
        req2.once("response", resolve).once("error", reject).end();
      });
      req2.then = promise.then.bind(promise);
      return req2;
    }
    exports2.req = req;
  }
});

// node_modules/agent-base/dist/index.js
var require_dist = __commonJS({
  "node_modules/agent-base/dist/index.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m2, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m2, k);
      if (!desc || ("get" in desc ? !m2.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m2[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m2, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m2[k];
    });
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __exportStar = exports2 && exports2.__exportStar || function(m2, exports3) {
      for (var p in m2) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p)) __createBinding(exports3, m2, p);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Agent = void 0;
    var net = __importStar(require("net"));
    var http3 = __importStar(require("http"));
    var https_1 = require("https");
    __exportStar(require_helpers3(), exports2);
    var INTERNAL = Symbol("AgentBaseInternalState");
    var Agent = class extends http3.Agent {
      constructor(opts) {
        super(opts);
        this[INTERNAL] = {};
      }
      /**
       * Determine whether this is an `http` or `https` request.
       */
      isSecureEndpoint(options) {
        if (options) {
          if (typeof options.secureEndpoint === "boolean") {
            return options.secureEndpoint;
          }
          if (typeof options.protocol === "string") {
            return options.protocol === "https:";
          }
        }
        const { stack } = new Error();
        if (typeof stack !== "string")
          return false;
        return stack.split("\n").some((l) => l.indexOf("(https.js:") !== -1 || l.indexOf("node:https:") !== -1);
      }
      // In order to support async signatures in `connect()` and Node's native
      // connection pooling in `http.Agent`, the array of sockets for each origin
      // has to be updated synchronously. This is so the length of the array is
      // accurate when `addRequest()` is next called. We achieve this by creating a
      // fake socket and adding it to `sockets[origin]` and incrementing
      // `totalSocketCount`.
      incrementSockets(name) {
        if (this.maxSockets === Infinity && this.maxTotalSockets === Infinity) {
          return null;
        }
        if (!this.sockets[name]) {
          this.sockets[name] = [];
        }
        const fakeSocket = new net.Socket({ writable: false });
        this.sockets[name].push(fakeSocket);
        this.totalSocketCount++;
        return fakeSocket;
      }
      decrementSockets(name, socket) {
        if (!this.sockets[name] || socket === null) {
          return;
        }
        const sockets = this.sockets[name];
        const index = sockets.indexOf(socket);
        if (index !== -1) {
          sockets.splice(index, 1);
          this.totalSocketCount--;
          if (sockets.length === 0) {
            delete this.sockets[name];
          }
        }
      }
      // In order to properly update the socket pool, we need to call `getName()` on
      // the core `https.Agent` if it is a secureEndpoint.
      getName(options) {
        const secureEndpoint = this.isSecureEndpoint(options);
        if (secureEndpoint) {
          return https_1.Agent.prototype.getName.call(this, options);
        }
        return super.getName(options);
      }
      createSocket(req, options, cb) {
        const connectOpts = {
          ...options,
          secureEndpoint: this.isSecureEndpoint(options)
        };
        const name = this.getName(connectOpts);
        const fakeSocket = this.incrementSockets(name);
        Promise.resolve().then(() => this.connect(req, connectOpts)).then((socket) => {
          this.decrementSockets(name, fakeSocket);
          if (socket instanceof http3.Agent) {
            try {
              return socket.addRequest(req, connectOpts);
            } catch (err) {
              return cb(err);
            }
          }
          this[INTERNAL].currentSocket = socket;
          super.createSocket(req, options, cb);
        }, (err) => {
          this.decrementSockets(name, fakeSocket);
          cb(err);
        });
      }
      createConnection() {
        const socket = this[INTERNAL].currentSocket;
        this[INTERNAL].currentSocket = void 0;
        if (!socket) {
          throw new Error("No socket was returned in the `connect()` function");
        }
        return socket;
      }
      get defaultPort() {
        return this[INTERNAL].defaultPort ?? (this.protocol === "https:" ? 443 : 80);
      }
      set defaultPort(v) {
        if (this[INTERNAL]) {
          this[INTERNAL].defaultPort = v;
        }
      }
      get protocol() {
        return this[INTERNAL].protocol ?? (this.isSecureEndpoint() ? "https:" : "http:");
      }
      set protocol(v) {
        if (this[INTERNAL]) {
          this[INTERNAL].protocol = v;
        }
      }
    };
    exports2.Agent = Agent;
  }
});

// node_modules/ms/index.js
var require_ms = __commonJS({
  "node_modules/ms/index.js"(exports2, module2) {
    var s2 = 1e3;
    var m2 = s2 * 60;
    var h2 = m2 * 60;
    var d = h2 * 24;
    var w = d * 7;
    var y = d * 365.25;
    module2.exports = function(val, options) {
      options = options || {};
      var type = typeof val;
      if (type === "string" && val.length > 0) {
        return parse(val);
      } else if (type === "number" && isFinite(val)) {
        return options.long ? fmtLong(val) : fmtShort(val);
      }
      throw new Error(
        "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
      );
    };
    function parse(str) {
      str = String(str);
      if (str.length > 100) {
        return;
      }
      var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        str
      );
      if (!match) {
        return;
      }
      var n = parseFloat(match[1]);
      var type = (match[2] || "ms").toLowerCase();
      switch (type) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return n * y;
        case "weeks":
        case "week":
        case "w":
          return n * w;
        case "days":
        case "day":
        case "d":
          return n * d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return n * h2;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return n * m2;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return n * s2;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return n;
        default:
          return void 0;
      }
    }
    function fmtShort(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return Math.round(ms / d) + "d";
      }
      if (msAbs >= h2) {
        return Math.round(ms / h2) + "h";
      }
      if (msAbs >= m2) {
        return Math.round(ms / m2) + "m";
      }
      if (msAbs >= s2) {
        return Math.round(ms / s2) + "s";
      }
      return ms + "ms";
    }
    function fmtLong(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return plural(ms, msAbs, d, "day");
      }
      if (msAbs >= h2) {
        return plural(ms, msAbs, h2, "hour");
      }
      if (msAbs >= m2) {
        return plural(ms, msAbs, m2, "minute");
      }
      if (msAbs >= s2) {
        return plural(ms, msAbs, s2, "second");
      }
      return ms + " ms";
    }
    function plural(ms, msAbs, n, name) {
      var isPlural = msAbs >= n * 1.5;
      return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
    }
  }
});

// node_modules/debug/src/common.js
var require_common2 = __commonJS({
  "node_modules/debug/src/common.js"(exports2, module2) {
    function setup(env) {
      createDebug.debug = createDebug;
      createDebug.default = createDebug;
      createDebug.coerce = coerce;
      createDebug.disable = disable;
      createDebug.enable = enable;
      createDebug.enabled = enabled;
      createDebug.humanize = require_ms();
      createDebug.destroy = destroy;
      Object.keys(env).forEach((key) => {
        createDebug[key] = env[key];
      });
      createDebug.names = [];
      createDebug.skips = [];
      createDebug.formatters = {};
      function selectColor(namespace) {
        let hash = 0;
        for (let i2 = 0; i2 < namespace.length; i2++) {
          hash = (hash << 5) - hash + namespace.charCodeAt(i2);
          hash |= 0;
        }
        return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
      }
      createDebug.selectColor = selectColor;
      function createDebug(namespace) {
        let prevTime;
        let enableOverride = null;
        let namespacesCache;
        let enabledCache;
        function debug(...args) {
          if (!debug.enabled) {
            return;
          }
          const self2 = debug;
          const curr = Number(/* @__PURE__ */ new Date());
          const ms = curr - (prevTime || curr);
          self2.diff = ms;
          self2.prev = prevTime;
          self2.curr = curr;
          prevTime = curr;
          args[0] = createDebug.coerce(args[0]);
          if (typeof args[0] !== "string") {
            args.unshift("%O");
          }
          let index = 0;
          args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
            if (match === "%%") {
              return "%";
            }
            index++;
            const formatter = createDebug.formatters[format];
            if (typeof formatter === "function") {
              const val = args[index];
              match = formatter.call(self2, val);
              args.splice(index, 1);
              index--;
            }
            return match;
          });
          createDebug.formatArgs.call(self2, args);
          const logFn = self2.log || createDebug.log;
          logFn.apply(self2, args);
        }
        debug.namespace = namespace;
        debug.useColors = createDebug.useColors();
        debug.color = createDebug.selectColor(namespace);
        debug.extend = extend;
        debug.destroy = createDebug.destroy;
        Object.defineProperty(debug, "enabled", {
          enumerable: true,
          configurable: false,
          get: () => {
            if (enableOverride !== null) {
              return enableOverride;
            }
            if (namespacesCache !== createDebug.namespaces) {
              namespacesCache = createDebug.namespaces;
              enabledCache = createDebug.enabled(namespace);
            }
            return enabledCache;
          },
          set: (v) => {
            enableOverride = v;
          }
        });
        if (typeof createDebug.init === "function") {
          createDebug.init(debug);
        }
        return debug;
      }
      function extend(namespace, delimiter) {
        const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
        newDebug.log = this.log;
        return newDebug;
      }
      function enable(namespaces) {
        createDebug.save(namespaces);
        createDebug.namespaces = namespaces;
        createDebug.names = [];
        createDebug.skips = [];
        const split = (typeof namespaces === "string" ? namespaces : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
        for (const ns of split) {
          if (ns[0] === "-") {
            createDebug.skips.push(ns.slice(1));
          } else {
            createDebug.names.push(ns);
          }
        }
      }
      function matchesTemplate(search, template) {
        let searchIndex = 0;
        let templateIndex = 0;
        let starIndex = -1;
        let matchIndex = 0;
        while (searchIndex < search.length) {
          if (templateIndex < template.length && (template[templateIndex] === search[searchIndex] || template[templateIndex] === "*")) {
            if (template[templateIndex] === "*") {
              starIndex = templateIndex;
              matchIndex = searchIndex;
              templateIndex++;
            } else {
              searchIndex++;
              templateIndex++;
            }
          } else if (starIndex !== -1) {
            templateIndex = starIndex + 1;
            matchIndex++;
            searchIndex = matchIndex;
          } else {
            return false;
          }
        }
        while (templateIndex < template.length && template[templateIndex] === "*") {
          templateIndex++;
        }
        return templateIndex === template.length;
      }
      function disable() {
        const namespaces = [
          ...createDebug.names,
          ...createDebug.skips.map((namespace) => "-" + namespace)
        ].join(",");
        createDebug.enable("");
        return namespaces;
      }
      function enabled(name) {
        for (const skip of createDebug.skips) {
          if (matchesTemplate(name, skip)) {
            return false;
          }
        }
        for (const ns of createDebug.names) {
          if (matchesTemplate(name, ns)) {
            return true;
          }
        }
        return false;
      }
      function coerce(val) {
        if (val instanceof Error) {
          return val.stack || val.message;
        }
        return val;
      }
      function destroy() {
        console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
      }
      createDebug.enable(createDebug.load());
      return createDebug;
    }
    module2.exports = setup;
  }
});

// node_modules/debug/src/browser.js
var require_browser = __commonJS({
  "node_modules/debug/src/browser.js"(exports2, module2) {
    exports2.formatArgs = formatArgs;
    exports2.save = save;
    exports2.load = load;
    exports2.useColors = useColors;
    exports2.storage = localstorage();
    exports2.destroy = /* @__PURE__ */ (() => {
      let warned = false;
      return () => {
        if (!warned) {
          warned = true;
          console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
        }
      };
    })();
    exports2.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function useColors() {
      if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
        return true;
      }
      if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
        return false;
      }
      let m2;
      return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator !== "undefined" && navigator.userAgent && (m2 = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(m2[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function formatArgs(args) {
      args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module2.exports.humanize(this.diff);
      if (!this.useColors) {
        return;
      }
      const c = "color: " + this.color;
      args.splice(1, 0, c, "color: inherit");
      let index = 0;
      let lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, (match) => {
        if (match === "%%") {
          return;
        }
        index++;
        if (match === "%c") {
          lastC = index;
        }
      });
      args.splice(lastC, 0, c);
    }
    exports2.log = console.debug || console.log || (() => {
    });
    function save(namespaces) {
      try {
        if (namespaces) {
          exports2.storage.setItem("debug", namespaces);
        } else {
          exports2.storage.removeItem("debug");
        }
      } catch (error) {
      }
    }
    function load() {
      let r2;
      try {
        r2 = exports2.storage.getItem("debug") || exports2.storage.getItem("DEBUG");
      } catch (error) {
      }
      if (!r2 && typeof process !== "undefined" && "env" in process) {
        r2 = process.env.DEBUG;
      }
      return r2;
    }
    function localstorage() {
      try {
        return localStorage;
      } catch (error) {
      }
    }
    module2.exports = require_common2()(exports2);
    var { formatters } = module2.exports;
    formatters.j = function(v) {
      try {
        return JSON.stringify(v);
      } catch (error) {
        return "[UnexpectedJSONParseError]: " + error.message;
      }
    };
  }
});

// node_modules/debug/src/node.js
var require_node = __commonJS({
  "node_modules/debug/src/node.js"(exports2, module2) {
    var tty = require("tty");
    var util = require("util");
    exports2.init = init;
    exports2.log = log;
    exports2.formatArgs = formatArgs;
    exports2.save = save;
    exports2.load = load;
    exports2.useColors = useColors;
    exports2.destroy = util.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    );
    exports2.colors = [6, 2, 3, 4, 5, 1];
    try {
      const supportsColor = require("supports-color");
      if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
        exports2.colors = [
          20,
          21,
          26,
          27,
          32,
          33,
          38,
          39,
          40,
          41,
          42,
          43,
          44,
          45,
          56,
          57,
          62,
          63,
          68,
          69,
          74,
          75,
          76,
          77,
          78,
          79,
          80,
          81,
          92,
          93,
          98,
          99,
          112,
          113,
          128,
          129,
          134,
          135,
          148,
          149,
          160,
          161,
          162,
          163,
          164,
          165,
          166,
          167,
          168,
          169,
          170,
          171,
          172,
          173,
          178,
          179,
          184,
          185,
          196,
          197,
          198,
          199,
          200,
          201,
          202,
          203,
          204,
          205,
          206,
          207,
          208,
          209,
          214,
          215,
          220,
          221
        ];
      }
    } catch (error) {
    }
    exports2.inspectOpts = Object.keys(process.env).filter((key) => {
      return /^debug_/i.test(key);
    }).reduce((obj, key) => {
      const prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, (_, k) => {
        return k.toUpperCase();
      });
      let val = process.env[key];
      if (/^(yes|on|true|enabled)$/i.test(val)) {
        val = true;
      } else if (/^(no|off|false|disabled)$/i.test(val)) {
        val = false;
      } else if (val === "null") {
        val = null;
      } else {
        val = Number(val);
      }
      obj[prop] = val;
      return obj;
    }, {});
    function useColors() {
      return "colors" in exports2.inspectOpts ? Boolean(exports2.inspectOpts.colors) : tty.isatty(process.stderr.fd);
    }
    function formatArgs(args) {
      const { namespace: name, useColors: useColors2 } = this;
      if (useColors2) {
        const c = this.color;
        const colorCode = "\x1B[3" + (c < 8 ? c : "8;5;" + c);
        const prefix = `  ${colorCode};1m${name} \x1B[0m`;
        args[0] = prefix + args[0].split("\n").join("\n" + prefix);
        args.push(colorCode + "m+" + module2.exports.humanize(this.diff) + "\x1B[0m");
      } else {
        args[0] = getDate() + name + " " + args[0];
      }
    }
    function getDate() {
      if (exports2.inspectOpts.hideDate) {
        return "";
      }
      return (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function log(...args) {
      return process.stderr.write(util.formatWithOptions(exports2.inspectOpts, ...args) + "\n");
    }
    function save(namespaces) {
      if (namespaces) {
        process.env.DEBUG = namespaces;
      } else {
        delete process.env.DEBUG;
      }
    }
    function load() {
      return process.env.DEBUG;
    }
    function init(debug) {
      debug.inspectOpts = {};
      const keys = Object.keys(exports2.inspectOpts);
      for (let i2 = 0; i2 < keys.length; i2++) {
        debug.inspectOpts[keys[i2]] = exports2.inspectOpts[keys[i2]];
      }
    }
    module2.exports = require_common2()(exports2);
    var { formatters } = module2.exports;
    formatters.o = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts).split("\n").map((str) => str.trim()).join(" ");
    };
    formatters.O = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts);
    };
  }
});

// node_modules/debug/src/index.js
var require_src = __commonJS({
  "node_modules/debug/src/index.js"(exports2, module2) {
    if (typeof process === "undefined" || process.type === "renderer" || process.browser === true || process.__nwjs) {
      module2.exports = require_browser();
    } else {
      module2.exports = require_node();
    }
  }
});

// node_modules/socks-proxy-agent/dist/index.js
var require_dist2 = __commonJS({
  "node_modules/socks-proxy-agent/dist/index.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m2, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m2, k);
      if (!desc || ("get" in desc ? !m2.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m2[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m2, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m2[k];
    });
    var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports2 && exports2.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SocksProxyAgent = void 0;
    var socks_1 = require_build();
    var agent_base_1 = require_dist();
    var debug_1 = __importDefault(require_src());
    var dns = __importStar(require("dns"));
    var net = __importStar(require("net"));
    var tls = __importStar(require("tls"));
    var url_1 = require("url");
    var debug = (0, debug_1.default)("socks-proxy-agent");
    var setServernameFromNonIpHost = (options) => {
      if (options.servername === void 0 && options.host && !net.isIP(options.host)) {
        return {
          ...options,
          servername: options.host
        };
      }
      return options;
    };
    function parseSocksURL(url) {
      let lookup = false;
      let type = 5;
      const host = url.hostname;
      const port = parseInt(url.port, 10) || 1080;
      switch (url.protocol.replace(":", "")) {
        case "socks4":
          lookup = true;
          type = 4;
          break;
        // pass through
        case "socks4a":
          type = 4;
          break;
        case "socks5":
          lookup = true;
          type = 5;
          break;
        // pass through
        case "socks":
          type = 5;
          break;
        case "socks5h":
          type = 5;
          break;
        default:
          throw new TypeError(`A "socks" protocol must be specified! Got: ${String(url.protocol)}`);
      }
      const proxy = {
        host,
        port,
        type
      };
      if (url.username) {
        Object.defineProperty(proxy, "userId", {
          value: decodeURIComponent(url.username),
          enumerable: false
        });
      }
      if (url.password != null) {
        Object.defineProperty(proxy, "password", {
          value: decodeURIComponent(url.password),
          enumerable: false
        });
      }
      return { lookup, proxy };
    }
    var SocksProxyAgent = class extends agent_base_1.Agent {
      constructor(uri, opts) {
        super(opts);
        const url = typeof uri === "string" ? new url_1.URL(uri) : uri;
        const { proxy, lookup } = parseSocksURL(url);
        this.shouldLookup = lookup;
        this.proxy = proxy;
        this.timeout = opts?.timeout ?? null;
        this.socketOptions = opts?.socketOptions ?? null;
      }
      /**
       * Initiates a SOCKS connection to the specified SOCKS proxy server,
       * which in turn connects to the specified remote host and port.
       */
      async connect(req, opts) {
        const { shouldLookup, proxy, timeout } = this;
        if (!opts.host) {
          throw new Error("No `host` defined!");
        }
        let { host } = opts;
        const { port, lookup: lookupFn = dns.lookup } = opts;
        if (shouldLookup) {
          host = await new Promise((resolve, reject) => {
            lookupFn(host, {}, (err, res) => {
              if (err) {
                reject(err);
              } else {
                resolve(res);
              }
            });
          });
        }
        const socksOpts = {
          proxy,
          destination: {
            host,
            port: typeof port === "number" ? port : parseInt(port, 10)
          },
          command: "connect",
          timeout: timeout ?? void 0,
          // @ts-expect-error the type supplied by socks for socket_options is wider
          // than necessary since socks will always override the host and port
          socket_options: this.socketOptions ?? void 0
        };
        const cleanup = (tlsSocket) => {
          req.destroy();
          socket.destroy();
          if (tlsSocket)
            tlsSocket.destroy();
        };
        debug("Creating socks proxy connection: %o", socksOpts);
        const { socket } = await socks_1.SocksClient.createConnection(socksOpts);
        debug("Successfully created socks proxy connection");
        if (timeout !== null) {
          socket.setTimeout(timeout);
          socket.on("timeout", () => cleanup());
        }
        if (opts.secureEndpoint) {
          debug("Upgrading socket connection to TLS");
          const tlsSocket = tls.connect({
            ...omit(setServernameFromNonIpHost(opts), "host", "path", "port"),
            socket
          });
          tlsSocket.once("error", (error) => {
            debug("Socket TLS error", error.message);
            cleanup(tlsSocket);
          });
          return tlsSocket;
        }
        return socket;
      }
    };
    SocksProxyAgent.protocols = [
      "socks",
      "socks4",
      "socks4a",
      "socks5",
      "socks5h"
    ];
    exports2.SocksProxyAgent = SocksProxyAgent;
    function omit(obj, ...keys) {
      const ret = {};
      let key;
      for (key in obj) {
        if (!keys.includes(key)) {
          ret[key] = obj[key];
        }
      }
      return ret;
    }
  }
});

// node_modules/boolean/build/lib/boolean.js
var require_boolean = __commonJS({
  "node_modules/boolean/build/lib/boolean.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.boolean = void 0;
    var boolean = function(value) {
      switch (Object.prototype.toString.call(value)) {
        case "[object String]":
          return ["true", "t", "yes", "y", "on", "1"].includes(value.trim().toLowerCase());
        case "[object Number]":
          return value.valueOf() === 1;
        case "[object Boolean]":
          return value.valueOf();
        default:
          return false;
      }
    };
    exports2.boolean = boolean;
  }
});

// node_modules/boolean/build/lib/isBooleanable.js
var require_isBooleanable = __commonJS({
  "node_modules/boolean/build/lib/isBooleanable.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.isBooleanable = void 0;
    var isBooleanable = function(value) {
      switch (Object.prototype.toString.call(value)) {
        case "[object String]":
          return [
            "true",
            "t",
            "yes",
            "y",
            "on",
            "1",
            "false",
            "f",
            "no",
            "n",
            "off",
            "0"
          ].includes(value.trim().toLowerCase());
        case "[object Number]":
          return [0, 1].includes(value.valueOf());
        case "[object Boolean]":
          return true;
        default:
          return false;
      }
    };
    exports2.isBooleanable = isBooleanable;
  }
});

// node_modules/boolean/build/lib/index.js
var require_lib = __commonJS({
  "node_modules/boolean/build/lib/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.isBooleanable = exports2.boolean = void 0;
    var boolean_1 = require_boolean();
    Object.defineProperty(exports2, "boolean", { enumerable: true, get: function() {
      return boolean_1.boolean;
    } });
    var isBooleanable_1 = require_isBooleanable();
    Object.defineProperty(exports2, "isBooleanable", { enumerable: true, get: function() {
      return isBooleanable_1.isBooleanable;
    } });
  }
});

// node_modules/detect-node/index.js
var require_detect_node = __commonJS({
  "node_modules/detect-node/index.js"(exports2, module2) {
    module2.exports = Object.prototype.toString.call(typeof process !== "undefined" ? process : 0) === "[object process]";
  }
});

// node_modules/object-keys/isArguments.js
var require_isArguments = __commonJS({
  "node_modules/object-keys/isArguments.js"(exports2, module2) {
    "use strict";
    var toStr = Object.prototype.toString;
    module2.exports = function isArguments(value) {
      var str = toStr.call(value);
      var isArgs = str === "[object Arguments]";
      if (!isArgs) {
        isArgs = str !== "[object Array]" && value !== null && typeof value === "object" && typeof value.length === "number" && value.length >= 0 && toStr.call(value.callee) === "[object Function]";
      }
      return isArgs;
    };
  }
});

// node_modules/object-keys/implementation.js
var require_implementation = __commonJS({
  "node_modules/object-keys/implementation.js"(exports2, module2) {
    "use strict";
    var keysShim;
    if (!Object.keys) {
      has = Object.prototype.hasOwnProperty;
      toStr = Object.prototype.toString;
      isArgs = require_isArguments();
      isEnumerable = Object.prototype.propertyIsEnumerable;
      hasDontEnumBug = !isEnumerable.call({ toString: null }, "toString");
      hasProtoEnumBug = isEnumerable.call(function() {
      }, "prototype");
      dontEnums = [
        "toString",
        "toLocaleString",
        "valueOf",
        "hasOwnProperty",
        "isPrototypeOf",
        "propertyIsEnumerable",
        "constructor"
      ];
      equalsConstructorPrototype = function(o) {
        var ctor = o.constructor;
        return ctor && ctor.prototype === o;
      };
      excludedKeys = {
        $applicationCache: true,
        $console: true,
        $external: true,
        $frame: true,
        $frameElement: true,
        $frames: true,
        $innerHeight: true,
        $innerWidth: true,
        $onmozfullscreenchange: true,
        $onmozfullscreenerror: true,
        $outerHeight: true,
        $outerWidth: true,
        $pageXOffset: true,
        $pageYOffset: true,
        $parent: true,
        $scrollLeft: true,
        $scrollTop: true,
        $scrollX: true,
        $scrollY: true,
        $self: true,
        $webkitIndexedDB: true,
        $webkitStorageInfo: true,
        $window: true
      };
      hasAutomationEqualityBug = function() {
        if (typeof window === "undefined") {
          return false;
        }
        for (var k in window) {
          try {
            if (!excludedKeys["$" + k] && has.call(window, k) && window[k] !== null && typeof window[k] === "object") {
              try {
                equalsConstructorPrototype(window[k]);
              } catch (e2) {
                return true;
              }
            }
          } catch (e2) {
            return true;
          }
        }
        return false;
      }();
      equalsConstructorPrototypeIfNotBuggy = function(o) {
        if (typeof window === "undefined" || !hasAutomationEqualityBug) {
          return equalsConstructorPrototype(o);
        }
        try {
          return equalsConstructorPrototype(o);
        } catch (e2) {
          return false;
        }
      };
      keysShim = function keys(object) {
        var isObject = object !== null && typeof object === "object";
        var isFunction = toStr.call(object) === "[object Function]";
        var isArguments = isArgs(object);
        var isString = isObject && toStr.call(object) === "[object String]";
        var theKeys = [];
        if (!isObject && !isFunction && !isArguments) {
          throw new TypeError("Object.keys called on a non-object");
        }
        var skipProto = hasProtoEnumBug && isFunction;
        if (isString && object.length > 0 && !has.call(object, 0)) {
          for (var i2 = 0; i2 < object.length; ++i2) {
            theKeys.push(String(i2));
          }
        }
        if (isArguments && object.length > 0) {
          for (var j = 0; j < object.length; ++j) {
            theKeys.push(String(j));
          }
        } else {
          for (var name in object) {
            if (!(skipProto && name === "prototype") && has.call(object, name)) {
              theKeys.push(String(name));
            }
          }
        }
        if (hasDontEnumBug) {
          var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);
          for (var k = 0; k < dontEnums.length; ++k) {
            if (!(skipConstructor && dontEnums[k] === "constructor") && has.call(object, dontEnums[k])) {
              theKeys.push(dontEnums[k]);
            }
          }
        }
        return theKeys;
      };
    }
    var has;
    var toStr;
    var isArgs;
    var isEnumerable;
    var hasDontEnumBug;
    var hasProtoEnumBug;
    var dontEnums;
    var equalsConstructorPrototype;
    var excludedKeys;
    var hasAutomationEqualityBug;
    var equalsConstructorPrototypeIfNotBuggy;
    module2.exports = keysShim;
  }
});

// node_modules/object-keys/index.js
var require_object_keys = __commonJS({
  "node_modules/object-keys/index.js"(exports2, module2) {
    "use strict";
    var slice = Array.prototype.slice;
    var isArgs = require_isArguments();
    var origKeys = Object.keys;
    var keysShim = origKeys ? function keys(o) {
      return origKeys(o);
    } : require_implementation();
    var originalKeys = Object.keys;
    keysShim.shim = function shimObjectKeys() {
      if (Object.keys) {
        var keysWorksWithArguments = function() {
          var args = Object.keys(arguments);
          return args && args.length === arguments.length;
        }(1, 2);
        if (!keysWorksWithArguments) {
          Object.keys = function keys(object) {
            if (isArgs(object)) {
              return originalKeys(slice.call(object));
            }
            return originalKeys(object);
          };
        }
      } else {
        Object.keys = keysShim;
      }
      return Object.keys || keysShim;
    };
    module2.exports = keysShim;
  }
});

// node_modules/es-define-property/index.js
var require_es_define_property = __commonJS({
  "node_modules/es-define-property/index.js"(exports2, module2) {
    "use strict";
    var $defineProperty = Object.defineProperty || false;
    if ($defineProperty) {
      try {
        $defineProperty({}, "a", { value: 1 });
      } catch (e2) {
        $defineProperty = false;
      }
    }
    module2.exports = $defineProperty;
  }
});

// node_modules/es-errors/syntax.js
var require_syntax = __commonJS({
  "node_modules/es-errors/syntax.js"(exports2, module2) {
    "use strict";
    module2.exports = SyntaxError;
  }
});

// node_modules/es-errors/type.js
var require_type = __commonJS({
  "node_modules/es-errors/type.js"(exports2, module2) {
    "use strict";
    module2.exports = TypeError;
  }
});

// node_modules/gopd/gOPD.js
var require_gOPD = __commonJS({
  "node_modules/gopd/gOPD.js"(exports2, module2) {
    "use strict";
    module2.exports = Object.getOwnPropertyDescriptor;
  }
});

// node_modules/gopd/index.js
var require_gopd = __commonJS({
  "node_modules/gopd/index.js"(exports2, module2) {
    "use strict";
    var $gOPD = require_gOPD();
    if ($gOPD) {
      try {
        $gOPD([], "length");
      } catch (e2) {
        $gOPD = null;
      }
    }
    module2.exports = $gOPD;
  }
});

// node_modules/define-data-property/index.js
var require_define_data_property = __commonJS({
  "node_modules/define-data-property/index.js"(exports2, module2) {
    "use strict";
    var $defineProperty = require_es_define_property();
    var $SyntaxError = require_syntax();
    var $TypeError = require_type();
    var gopd = require_gopd();
    module2.exports = function defineDataProperty(obj, property, value) {
      if (!obj || typeof obj !== "object" && typeof obj !== "function") {
        throw new $TypeError("`obj` must be an object or a function`");
      }
      if (typeof property !== "string" && typeof property !== "symbol") {
        throw new $TypeError("`property` must be a string or a symbol`");
      }
      if (arguments.length > 3 && typeof arguments[3] !== "boolean" && arguments[3] !== null) {
        throw new $TypeError("`nonEnumerable`, if provided, must be a boolean or null");
      }
      if (arguments.length > 4 && typeof arguments[4] !== "boolean" && arguments[4] !== null) {
        throw new $TypeError("`nonWritable`, if provided, must be a boolean or null");
      }
      if (arguments.length > 5 && typeof arguments[5] !== "boolean" && arguments[5] !== null) {
        throw new $TypeError("`nonConfigurable`, if provided, must be a boolean or null");
      }
      if (arguments.length > 6 && typeof arguments[6] !== "boolean") {
        throw new $TypeError("`loose`, if provided, must be a boolean");
      }
      var nonEnumerable = arguments.length > 3 ? arguments[3] : null;
      var nonWritable = arguments.length > 4 ? arguments[4] : null;
      var nonConfigurable = arguments.length > 5 ? arguments[5] : null;
      var loose = arguments.length > 6 ? arguments[6] : false;
      var desc = !!gopd && gopd(obj, property);
      if ($defineProperty) {
        $defineProperty(obj, property, {
          configurable: nonConfigurable === null && desc ? desc.configurable : !nonConfigurable,
          enumerable: nonEnumerable === null && desc ? desc.enumerable : !nonEnumerable,
          value,
          writable: nonWritable === null && desc ? desc.writable : !nonWritable
        });
      } else if (loose || !nonEnumerable && !nonWritable && !nonConfigurable) {
        obj[property] = value;
      } else {
        throw new $SyntaxError("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
      }
    };
  }
});

// node_modules/has-property-descriptors/index.js
var require_has_property_descriptors = __commonJS({
  "node_modules/has-property-descriptors/index.js"(exports2, module2) {
    "use strict";
    var $defineProperty = require_es_define_property();
    var hasPropertyDescriptors = function hasPropertyDescriptors2() {
      return !!$defineProperty;
    };
    hasPropertyDescriptors.hasArrayLengthDefineBug = function hasArrayLengthDefineBug() {
      if (!$defineProperty) {
        return null;
      }
      try {
        return $defineProperty([], "length", { value: 1 }).length !== 1;
      } catch (e2) {
        return true;
      }
    };
    module2.exports = hasPropertyDescriptors;
  }
});

// node_modules/define-properties/index.js
var require_define_properties = __commonJS({
  "node_modules/define-properties/index.js"(exports2, module2) {
    "use strict";
    var keys = require_object_keys();
    var hasSymbols = typeof Symbol === "function" && typeof Symbol("foo") === "symbol";
    var toStr = Object.prototype.toString;
    var concat = Array.prototype.concat;
    var defineDataProperty = require_define_data_property();
    var isFunction = function(fn) {
      return typeof fn === "function" && toStr.call(fn) === "[object Function]";
    };
    var supportsDescriptors = require_has_property_descriptors()();
    var defineProperty = function(object, name, value, predicate) {
      if (name in object) {
        if (predicate === true) {
          if (object[name] === value) {
            return;
          }
        } else if (!isFunction(predicate) || !predicate()) {
          return;
        }
      }
      if (supportsDescriptors) {
        defineDataProperty(object, name, value, true);
      } else {
        defineDataProperty(object, name, value);
      }
    };
    var defineProperties = function(object, map) {
      var predicates = arguments.length > 2 ? arguments[2] : {};
      var props = keys(map);
      if (hasSymbols) {
        props = concat.call(props, Object.getOwnPropertySymbols(map));
      }
      for (var i2 = 0; i2 < props.length; i2 += 1) {
        defineProperty(object, props[i2], map[props[i2]], predicates[props[i2]]);
      }
    };
    defineProperties.supportsDescriptors = !!supportsDescriptors;
    module2.exports = defineProperties;
  }
});

// node_modules/globalthis/implementation.js
var require_implementation2 = __commonJS({
  "node_modules/globalthis/implementation.js"(exports2, module2) {
    "use strict";
    module2.exports = global;
  }
});

// node_modules/globalthis/polyfill.js
var require_polyfill = __commonJS({
  "node_modules/globalthis/polyfill.js"(exports2, module2) {
    "use strict";
    var implementation = require_implementation2();
    module2.exports = function getPolyfill() {
      if (typeof global !== "object" || !global || global.Math !== Math || global.Array !== Array) {
        return implementation;
      }
      return global;
    };
  }
});

// node_modules/globalthis/shim.js
var require_shim = __commonJS({
  "node_modules/globalthis/shim.js"(exports2, module2) {
    "use strict";
    var define2 = require_define_properties();
    var gOPD = require_gopd();
    var getPolyfill = require_polyfill();
    module2.exports = function shimGlobal() {
      var polyfill = getPolyfill();
      if (define2.supportsDescriptors) {
        var descriptor = gOPD(polyfill, "globalThis");
        if (!descriptor || descriptor.configurable && (descriptor.enumerable || !descriptor.writable || globalThis !== polyfill)) {
          Object.defineProperty(polyfill, "globalThis", {
            configurable: true,
            enumerable: false,
            value: polyfill,
            writable: true
          });
        }
      } else if (typeof globalThis !== "object" || globalThis !== polyfill) {
        polyfill.globalThis = polyfill;
      }
      return polyfill;
    };
  }
});

// node_modules/globalthis/index.js
var require_globalthis = __commonJS({
  "node_modules/globalthis/index.js"(exports2, module2) {
    "use strict";
    var defineProperties = require_define_properties();
    var implementation = require_implementation2();
    var getPolyfill = require_polyfill();
    var shim = require_shim();
    var polyfill = getPolyfill();
    var getGlobal = function() {
      return polyfill;
    };
    defineProperties(getGlobal, {
      getPolyfill,
      implementation,
      shim
    });
    module2.exports = getGlobal;
  }
});

// node_modules/json-stringify-safe/stringify.js
var require_stringify = __commonJS({
  "node_modules/json-stringify-safe/stringify.js"(exports2, module2) {
    exports2 = module2.exports = stringify;
    exports2.getSerialize = serializer;
    function stringify(obj, replacer, spaces, cycleReplacer) {
      return JSON.stringify(obj, serializer(replacer, cycleReplacer), spaces);
    }
    function serializer(replacer, cycleReplacer) {
      var stack = [], keys = [];
      if (cycleReplacer == null) cycleReplacer = function(key, value) {
        if (stack[0] === value) return "[Circular ~]";
        return "[Circular ~." + keys.slice(0, stack.indexOf(value)).join(".") + "]";
      };
      return function(key, value) {
        if (stack.length > 0) {
          var thisPos = stack.indexOf(this);
          ~thisPos ? stack.splice(thisPos + 1) : stack.push(this);
          ~thisPos ? keys.splice(thisPos, Infinity, key) : keys.push(key);
          if (~stack.indexOf(value)) value = cycleReplacer.call(this, key, value);
        } else stack.push(value);
        return replacer == null ? value : replacer.call(this, key, value);
      };
    }
  }
});

// node_modules/roarr/dist/constants.js
var require_constants4 = __commonJS({
  "node_modules/roarr/dist/constants.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.logLevels = void 0;
    var logLevels = {
      debug: 20,
      error: 50,
      fatal: 60,
      info: 30,
      trace: 10,
      warn: 40
    };
    exports2.logLevels = logLevels;
  }
});

// node_modules/roarr/dist/factories/createLogger.js
var require_createLogger = __commonJS({
  "node_modules/roarr/dist/factories/createLogger.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = void 0;
    var _detectNode = _interopRequireDefault(require_detect_node());
    var _globalthis = _interopRequireDefault(require_globalthis());
    var _jsonStringifySafe = _interopRequireDefault(require_stringify());
    var _sprintfJs = require_sprintf();
    var _constants = require_constants4();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _extends() {
      _extends = Object.assign || function(target) {
        for (var i2 = 1; i2 < arguments.length; i2++) {
          var source = arguments[i2];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      return _extends.apply(this, arguments);
    }
    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) symbols = symbols.filter(function(sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
        keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpread(target) {
      for (var i2 = 1; i2 < arguments.length; i2++) {
        var source = arguments[i2] != null ? arguments[i2] : {};
        if (i2 % 2) {
          ownKeys(Object(source), true).forEach(function(key) {
            _defineProperty(target, key, source[key]);
          });
        } else if (Object.getOwnPropertyDescriptors) {
          Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        } else {
          ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
          });
        }
      }
      return target;
    }
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    var globalThis2 = (0, _globalthis.default)();
    var domain;
    if (_detectNode.default) {
      domain = require("domain");
    }
    var getParentDomainContext = () => {
      if (!domain) {
        return {};
      }
      const parentRoarrContexts = [];
      let currentDomain = process.domain;
      if (!currentDomain || !currentDomain.parentDomain) {
        return {};
      }
      while (currentDomain && currentDomain.parentDomain) {
        currentDomain = currentDomain.parentDomain;
        if (currentDomain.roarr && currentDomain.roarr.context) {
          parentRoarrContexts.push(currentDomain.roarr.context);
        }
      }
      let domainContext = {};
      for (const parentRoarrContext of parentRoarrContexts) {
        domainContext = _objectSpread(_objectSpread({}, domainContext), parentRoarrContext);
      }
      return domainContext;
    };
    var getFirstParentDomainContext = () => {
      if (!domain) {
        return {};
      }
      let currentDomain = process.domain;
      if (currentDomain && currentDomain.roarr && currentDomain.roarr.context) {
        return currentDomain.roarr.context;
      }
      if (!currentDomain || !currentDomain.parentDomain) {
        return {};
      }
      while (currentDomain && currentDomain.parentDomain) {
        currentDomain = currentDomain.parentDomain;
        if (currentDomain.roarr && currentDomain.roarr.context) {
          return currentDomain.roarr.context;
        }
      }
      return {};
    };
    var createLogger = (onMessage, parentContext) => {
      const log = (a, b, c, d, e2, f3, g, h2, i2, k) => {
        const time = Date.now();
        const sequence = globalThis2.ROARR.sequence++;
        let context;
        let message;
        if (typeof a === "string") {
          context = _objectSpread(_objectSpread({}, getFirstParentDomainContext()), parentContext || {});
          const args = _extends({}, {
            a,
            b,
            c,
            d,
            e: e2,
            f: f3,
            g,
            h: h2,
            i: i2,
            k
          });
          const values = Object.keys(args).map((key) => {
            return args[key];
          });
          const hasOnlyOneParameterValued = 1 === values.reduce((accumulator, value) => {
            return accumulator += typeof value === "undefined" ? 0 : 1;
          }, 0);
          message = hasOnlyOneParameterValued ? (0, _sprintfJs.sprintf)("%s", a) : (0, _sprintfJs.sprintf)(a, b, c, d, e2, f3, g, h2, i2, k);
        } else {
          if (typeof b !== "string") {
            throw new TypeError("Message must be a string.");
          }
          context = JSON.parse((0, _jsonStringifySafe.default)(_objectSpread(_objectSpread(_objectSpread({}, getFirstParentDomainContext()), parentContext || {}), a)));
          message = (0, _sprintfJs.sprintf)(b, c, d, e2, f3, g, h2, i2, k);
        }
        onMessage({
          context,
          message,
          sequence,
          time,
          version: "1.0.0"
        });
      };
      log.child = (context) => {
        if (typeof context === "function") {
          return createLogger((message) => {
            if (typeof context !== "function") {
              throw new TypeError("Unexpected state.");
            }
            onMessage(context(message));
          }, parentContext);
        }
        return createLogger(onMessage, _objectSpread(_objectSpread(_objectSpread({}, getFirstParentDomainContext()), parentContext), context));
      };
      log.getContext = () => {
        return _objectSpread(_objectSpread({}, getFirstParentDomainContext()), parentContext || {});
      };
      log.adopt = async (routine, context) => {
        if (!domain) {
          return routine();
        }
        const adoptedDomain = domain.create();
        return adoptedDomain.run(() => {
          adoptedDomain.roarr = {
            context: _objectSpread(_objectSpread({}, getParentDomainContext()), context)
          };
          return routine();
        });
      };
      for (const logLevel of Object.keys(_constants.logLevels)) {
        log[logLevel] = (a, b, c, d, e2, f3, g, h2, i2, k) => {
          return log.child({
            logLevel: _constants.logLevels[logLevel]
          })(a, b, c, d, e2, f3, g, h2, i2, k);
        };
      }
      return log;
    };
    var _default = createLogger;
    exports2.default = _default;
  }
});

// node_modules/roarr/dist/factories/createMockLogger.js
var require_createMockLogger = __commonJS({
  "node_modules/roarr/dist/factories/createMockLogger.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = void 0;
    var _constants = require_constants4();
    var createMockLogger = (onMessage, parentContext) => {
      const log = (a, b, c, d, e2, f3, g, h2, i2, k) => {
      };
      log.adopt = async (routine) => {
        return routine();
      };
      log.child = (context) => {
        return createMockLogger(onMessage, parentContext);
      };
      log.getContext = () => {
        return {};
      };
      for (const logLevel of Object.keys(_constants.logLevels)) {
        log[logLevel] = (a, b, c, d, e2, f3, g, h2, i2, k) => {
          return log.child({
            logLevel: _constants.logLevels[logLevel]
          })(a, b, c, d, e2, f3, g, h2, i2, k);
        };
      }
      return log;
    };
    var _default = createMockLogger;
    exports2.default = _default;
  }
});

// node_modules/semver-compare/index.js
var require_semver_compare = __commonJS({
  "node_modules/semver-compare/index.js"(exports2, module2) {
    module2.exports = function cmp(a, b) {
      var pa = a.split(".");
      var pb = b.split(".");
      for (var i2 = 0; i2 < 3; i2++) {
        var na = Number(pa[i2]);
        var nb = Number(pb[i2]);
        if (na > nb) return 1;
        if (nb > na) return -1;
        if (!isNaN(na) && isNaN(nb)) return 1;
        if (isNaN(na) && !isNaN(nb)) return -1;
      }
      return 0;
    };
  }
});

// node_modules/roarr/package.json
var require_package = __commonJS({
  "node_modules/roarr/package.json"(exports2, module2) {
    module2.exports = {
      author: {
        email: "gajus@gajus.com",
        name: "Gajus Kuizinas",
        url: "http://gajus.com"
      },
      ava: {
        babel: {
          compileAsTests: [
            "test/helpers/**/*"
          ]
        },
        files: [
          "test/roarr/**/*"
        ],
        require: [
          "@babel/register"
        ]
      },
      dependencies: {
        boolean: "^3.0.1",
        "detect-node": "^2.0.4",
        globalthis: "^1.0.1",
        "json-stringify-safe": "^5.0.1",
        "semver-compare": "^1.0.0",
        "sprintf-js": "^1.1.2"
      },
      description: "JSON logger for Node.js and browser.",
      devDependencies: {
        "@ava/babel": "^1.0.1",
        "@babel/cli": "^7.11.6",
        "@babel/core": "^7.11.6",
        "@babel/node": "^7.10.5",
        "@babel/plugin-transform-flow-strip-types": "^7.10.4",
        "@babel/preset-env": "^7.11.5",
        "@babel/register": "^7.11.5",
        ava: "^3.12.1",
        "babel-plugin-istanbul": "^6.0.0",
        "babel-plugin-transform-export-default-name": "^2.0.4",
        coveralls: "^3.1.0",
        "domain-parent": "^1.0.0",
        eslint: "^7.9.0",
        "eslint-config-canonical": "^24.1.1",
        "flow-bin": "^0.133.0",
        "flow-copy-source": "^2.0.9",
        gitdown: "^3.1.3",
        husky: "^4.3.0",
        nyc: "^15.1.0",
        "semantic-release": "^17.1.1"
      },
      engines: {
        node: ">=8.0"
      },
      husky: {
        hooks: {
          "pre-commit": "npm run lint && npm run test && npm run build",
          "pre-push": "gitdown ./.README/README.md --output-file ./README.md --check"
        }
      },
      keywords: [
        "log",
        "logger",
        "json"
      ],
      main: "./dist/log.js",
      name: "roarr",
      nyc: {
        include: [
          "src/**/*.js"
        ],
        instrument: false,
        reporter: [
          "text-lcov"
        ],
        require: [
          "@babel/register"
        ],
        sourceMap: false
      },
      license: "BSD-3-Clause",
      repository: {
        type: "git",
        url: "git@github.com:gajus/roarr.git"
      },
      scripts: {
        build: "rm -fr ./dist && NODE_ENV=production babel ./src --out-dir ./dist --copy-files --source-maps && flow-copy-source src dist",
        "create-readme": "gitdown ./.README/README.md --output-file ./README.md",
        dev: "NODE_ENV=production babel ./src --out-dir ./dist --copy-files --source-maps --watch",
        lint: "eslint ./src ./test && flow",
        test: "NODE_ENV=test ava --serial --verbose"
      },
      version: "2.15.4"
    };
  }
});

// node_modules/roarr/dist/factories/createNodeWriter.js
var require_createNodeWriter = __commonJS({
  "node_modules/roarr/dist/factories/createNodeWriter.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = void 0;
    var createBlockingWriter = (stream) => {
      return {
        write: (message) => {
          stream.write(message + "\n");
        }
      };
    };
    var createNodeWriter = () => {
      const targetStream = (process.env.ROARR_STREAM || "STDOUT").toUpperCase();
      const stream = targetStream.toUpperCase() === "STDOUT" ? process.stdout : process.stderr;
      return createBlockingWriter(stream);
    };
    var _default = createNodeWriter;
    exports2.default = _default;
  }
});

// node_modules/roarr/dist/factories/createRoarrInititialGlobalState.js
var require_createRoarrInititialGlobalState = __commonJS({
  "node_modules/roarr/dist/factories/createRoarrInititialGlobalState.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = void 0;
    var _detectNode = _interopRequireDefault(require_detect_node());
    var _semverCompare = _interopRequireDefault(require_semver_compare());
    var _package = require_package();
    var _createNodeWriter = _interopRequireDefault(require_createNodeWriter());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) symbols = symbols.filter(function(sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
        keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpread(target) {
      for (var i2 = 1; i2 < arguments.length; i2++) {
        var source = arguments[i2] != null ? arguments[i2] : {};
        if (i2 % 2) {
          ownKeys(Object(source), true).forEach(function(key) {
            _defineProperty(target, key, source[key]);
          });
        } else if (Object.getOwnPropertyDescriptors) {
          Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        } else {
          ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
          });
        }
      }
      return target;
    }
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    var createRoarrInititialGlobalState = (currentState) => {
      const versions = (currentState.versions || []).concat();
      versions.sort(_semverCompare.default);
      const currentIsLatestVersion = !versions.length || (0, _semverCompare.default)(_package.version, versions[versions.length - 1]) === 1;
      if (!versions.includes(_package.version)) {
        versions.push(_package.version);
      }
      versions.sort(_semverCompare.default);
      let newState = _objectSpread(_objectSpread({
        sequence: 0
      }, currentState), {}, {
        versions
      });
      if (_detectNode.default) {
        if (currentIsLatestVersion || !newState.write) {
          newState = _objectSpread(_objectSpread({}, newState), (0, _createNodeWriter.default)());
        }
      }
      return newState;
    };
    var _default = createRoarrInititialGlobalState;
    exports2.default = _default;
  }
});

// node_modules/roarr/dist/factories/index.js
var require_factories = __commonJS({
  "node_modules/roarr/dist/factories/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    Object.defineProperty(exports2, "createLogger", {
      enumerable: true,
      get: function() {
        return _createLogger.default;
      }
    });
    Object.defineProperty(exports2, "createMockLogger", {
      enumerable: true,
      get: function() {
        return _createMockLogger.default;
      }
    });
    Object.defineProperty(exports2, "createRoarrInititialGlobalState", {
      enumerable: true,
      get: function() {
        return _createRoarrInititialGlobalState.default;
      }
    });
    var _createLogger = _interopRequireDefault(require_createLogger());
    var _createMockLogger = _interopRequireDefault(require_createMockLogger());
    var _createRoarrInititialGlobalState = _interopRequireDefault(require_createRoarrInititialGlobalState());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
  }
});

// node_modules/roarr/dist/log.js
var require_log = __commonJS({
  "node_modules/roarr/dist/log.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = exports2.ROARR = void 0;
    var _boolean = require_lib();
    var _detectNode = _interopRequireDefault(require_detect_node());
    var _globalthis = _interopRequireDefault(require_globalthis());
    var _factories = require_factories();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var globalThis2 = (0, _globalthis.default)();
    var ROARR = globalThis2.ROARR = (0, _factories.createRoarrInititialGlobalState)(globalThis2.ROARR || {});
    exports2.ROARR = ROARR;
    var logFactory = _factories.createLogger;
    if (_detectNode.default) {
      const enabled = (0, _boolean.boolean)(process.env.ROARR_LOG || "");
      if (!enabled) {
        logFactory = _factories.createMockLogger;
      }
    }
    var _default = logFactory((message) => {
      if (ROARR.write) {
        const body = JSON.stringify(message);
        ROARR.write(body);
      }
    });
    exports2.default = _default;
  }
});

// node_modules/global-agent/dist/Logger.js
var require_Logger = __commonJS({
  "node_modules/global-agent/dist/Logger.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = void 0;
    var _roarr = _interopRequireDefault(require_log());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var Logger = _roarr.default.child({
      package: "global-agent"
    });
    var _default = Logger;
    exports2.default = _default;
  }
});

// node_modules/semver/internal/constants.js
var require_constants5 = __commonJS({
  "node_modules/semver/internal/constants.js"(exports2, module2) {
    "use strict";
    var SEMVER_SPEC_VERSION = "2.0.0";
    var MAX_LENGTH = 256;
    var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
    9007199254740991;
    var MAX_SAFE_COMPONENT_LENGTH = 16;
    var MAX_SAFE_BUILD_LENGTH = MAX_LENGTH - 6;
    var RELEASE_TYPES = [
      "major",
      "premajor",
      "minor",
      "preminor",
      "patch",
      "prepatch",
      "prerelease"
    ];
    module2.exports = {
      MAX_LENGTH,
      MAX_SAFE_COMPONENT_LENGTH,
      MAX_SAFE_BUILD_LENGTH,
      MAX_SAFE_INTEGER,
      RELEASE_TYPES,
      SEMVER_SPEC_VERSION,
      FLAG_INCLUDE_PRERELEASE: 1,
      FLAG_LOOSE: 2
    };
  }
});

// node_modules/semver/internal/debug.js
var require_debug = __commonJS({
  "node_modules/semver/internal/debug.js"(exports2, module2) {
    "use strict";
    var debug = typeof process === "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...args) => console.error("SEMVER", ...args) : () => {
    };
    module2.exports = debug;
  }
});

// node_modules/semver/internal/re.js
var require_re = __commonJS({
  "node_modules/semver/internal/re.js"(exports2, module2) {
    "use strict";
    var {
      MAX_SAFE_COMPONENT_LENGTH,
      MAX_SAFE_BUILD_LENGTH,
      MAX_LENGTH
    } = require_constants5();
    var debug = require_debug();
    exports2 = module2.exports = {};
    var re = exports2.re = [];
    var safeRe = exports2.safeRe = [];
    var src = exports2.src = [];
    var safeSrc = exports2.safeSrc = [];
    var t2 = exports2.t = {};
    var R = 0;
    var LETTERDASHNUMBER = "[a-zA-Z0-9-]";
    var safeRegexReplacements = [
      ["\\s", 1],
      ["\\d", MAX_LENGTH],
      [LETTERDASHNUMBER, MAX_SAFE_BUILD_LENGTH]
    ];
    var makeSafeRegex = (value) => {
      for (const [token, max] of safeRegexReplacements) {
        value = value.split(`${token}*`).join(`${token}{0,${max}}`).split(`${token}+`).join(`${token}{1,${max}}`);
      }
      return value;
    };
    var createToken = (name, value, isGlobal) => {
      const safe = makeSafeRegex(value);
      const index = R++;
      debug(name, index, value);
      t2[name] = index;
      src[index] = value;
      safeSrc[index] = safe;
      re[index] = new RegExp(value, isGlobal ? "g" : void 0);
      safeRe[index] = new RegExp(safe, isGlobal ? "g" : void 0);
    };
    createToken("NUMERICIDENTIFIER", "0|[1-9]\\d*");
    createToken("NUMERICIDENTIFIERLOOSE", "\\d+");
    createToken("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${LETTERDASHNUMBER}*`);
    createToken("MAINVERSION", `(${src[t2.NUMERICIDENTIFIER]})\\.(${src[t2.NUMERICIDENTIFIER]})\\.(${src[t2.NUMERICIDENTIFIER]})`);
    createToken("MAINVERSIONLOOSE", `(${src[t2.NUMERICIDENTIFIERLOOSE]})\\.(${src[t2.NUMERICIDENTIFIERLOOSE]})\\.(${src[t2.NUMERICIDENTIFIERLOOSE]})`);
    createToken("PRERELEASEIDENTIFIER", `(?:${src[t2.NONNUMERICIDENTIFIER]}|${src[t2.NUMERICIDENTIFIER]})`);
    createToken("PRERELEASEIDENTIFIERLOOSE", `(?:${src[t2.NONNUMERICIDENTIFIER]}|${src[t2.NUMERICIDENTIFIERLOOSE]})`);
    createToken("PRERELEASE", `(?:-(${src[t2.PRERELEASEIDENTIFIER]}(?:\\.${src[t2.PRERELEASEIDENTIFIER]})*))`);
    createToken("PRERELEASELOOSE", `(?:-?(${src[t2.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${src[t2.PRERELEASEIDENTIFIERLOOSE]})*))`);
    createToken("BUILDIDENTIFIER", `${LETTERDASHNUMBER}+`);
    createToken("BUILD", `(?:\\+(${src[t2.BUILDIDENTIFIER]}(?:\\.${src[t2.BUILDIDENTIFIER]})*))`);
    createToken("FULLPLAIN", `v?${src[t2.MAINVERSION]}${src[t2.PRERELEASE]}?${src[t2.BUILD]}?`);
    createToken("FULL", `^${src[t2.FULLPLAIN]}$`);
    createToken("LOOSEPLAIN", `[v=\\s]*${src[t2.MAINVERSIONLOOSE]}${src[t2.PRERELEASELOOSE]}?${src[t2.BUILD]}?`);
    createToken("LOOSE", `^${src[t2.LOOSEPLAIN]}$`);
    createToken("GTLT", "((?:<|>)?=?)");
    createToken("XRANGEIDENTIFIERLOOSE", `${src[t2.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
    createToken("XRANGEIDENTIFIER", `${src[t2.NUMERICIDENTIFIER]}|x|X|\\*`);
    createToken("XRANGEPLAIN", `[v=\\s]*(${src[t2.XRANGEIDENTIFIER]})(?:\\.(${src[t2.XRANGEIDENTIFIER]})(?:\\.(${src[t2.XRANGEIDENTIFIER]})(?:${src[t2.PRERELEASE]})?${src[t2.BUILD]}?)?)?`);
    createToken("XRANGEPLAINLOOSE", `[v=\\s]*(${src[t2.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t2.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t2.XRANGEIDENTIFIERLOOSE]})(?:${src[t2.PRERELEASELOOSE]})?${src[t2.BUILD]}?)?)?`);
    createToken("XRANGE", `^${src[t2.GTLT]}\\s*${src[t2.XRANGEPLAIN]}$`);
    createToken("XRANGELOOSE", `^${src[t2.GTLT]}\\s*${src[t2.XRANGEPLAINLOOSE]}$`);
    createToken("COERCEPLAIN", `${"(^|[^\\d])(\\d{1,"}${MAX_SAFE_COMPONENT_LENGTH}})(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?`);
    createToken("COERCE", `${src[t2.COERCEPLAIN]}(?:$|[^\\d])`);
    createToken("COERCEFULL", src[t2.COERCEPLAIN] + `(?:${src[t2.PRERELEASE]})?(?:${src[t2.BUILD]})?(?:$|[^\\d])`);
    createToken("COERCERTL", src[t2.COERCE], true);
    createToken("COERCERTLFULL", src[t2.COERCEFULL], true);
    createToken("LONETILDE", "(?:~>?)");
    createToken("TILDETRIM", `(\\s*)${src[t2.LONETILDE]}\\s+`, true);
    exports2.tildeTrimReplace = "$1~";
    createToken("TILDE", `^${src[t2.LONETILDE]}${src[t2.XRANGEPLAIN]}$`);
    createToken("TILDELOOSE", `^${src[t2.LONETILDE]}${src[t2.XRANGEPLAINLOOSE]}$`);
    createToken("LONECARET", "(?:\\^)");
    createToken("CARETTRIM", `(\\s*)${src[t2.LONECARET]}\\s+`, true);
    exports2.caretTrimReplace = "$1^";
    createToken("CARET", `^${src[t2.LONECARET]}${src[t2.XRANGEPLAIN]}$`);
    createToken("CARETLOOSE", `^${src[t2.LONECARET]}${src[t2.XRANGEPLAINLOOSE]}$`);
    createToken("COMPARATORLOOSE", `^${src[t2.GTLT]}\\s*(${src[t2.LOOSEPLAIN]})$|^$`);
    createToken("COMPARATOR", `^${src[t2.GTLT]}\\s*(${src[t2.FULLPLAIN]})$|^$`);
    createToken("COMPARATORTRIM", `(\\s*)${src[t2.GTLT]}\\s*(${src[t2.LOOSEPLAIN]}|${src[t2.XRANGEPLAIN]})`, true);
    exports2.comparatorTrimReplace = "$1$2$3";
    createToken("HYPHENRANGE", `^\\s*(${src[t2.XRANGEPLAIN]})\\s+-\\s+(${src[t2.XRANGEPLAIN]})\\s*$`);
    createToken("HYPHENRANGELOOSE", `^\\s*(${src[t2.XRANGEPLAINLOOSE]})\\s+-\\s+(${src[t2.XRANGEPLAINLOOSE]})\\s*$`);
    createToken("STAR", "(<|>)?=?\\s*\\*");
    createToken("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$");
    createToken("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
  }
});

// node_modules/semver/internal/parse-options.js
var require_parse_options = __commonJS({
  "node_modules/semver/internal/parse-options.js"(exports2, module2) {
    "use strict";
    var looseOption = Object.freeze({ loose: true });
    var emptyOpts = Object.freeze({});
    var parseOptions = (options) => {
      if (!options) {
        return emptyOpts;
      }
      if (typeof options !== "object") {
        return looseOption;
      }
      return options;
    };
    module2.exports = parseOptions;
  }
});

// node_modules/semver/internal/identifiers.js
var require_identifiers = __commonJS({
  "node_modules/semver/internal/identifiers.js"(exports2, module2) {
    "use strict";
    var numeric = /^[0-9]+$/;
    var compareIdentifiers = (a, b) => {
      const anum = numeric.test(a);
      const bnum = numeric.test(b);
      if (anum && bnum) {
        a = +a;
        b = +b;
      }
      return a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
    };
    var rcompareIdentifiers = (a, b) => compareIdentifiers(b, a);
    module2.exports = {
      compareIdentifiers,
      rcompareIdentifiers
    };
  }
});

// node_modules/semver/classes/semver.js
var require_semver = __commonJS({
  "node_modules/semver/classes/semver.js"(exports2, module2) {
    "use strict";
    var debug = require_debug();
    var { MAX_LENGTH, MAX_SAFE_INTEGER } = require_constants5();
    var { safeRe: re, t: t2 } = require_re();
    var parseOptions = require_parse_options();
    var { compareIdentifiers } = require_identifiers();
    var SemVer = class _SemVer {
      constructor(version, options) {
        options = parseOptions(options);
        if (version instanceof _SemVer) {
          if (version.loose === !!options.loose && version.includePrerelease === !!options.includePrerelease) {
            return version;
          } else {
            version = version.version;
          }
        } else if (typeof version !== "string") {
          throw new TypeError(`Invalid version. Must be a string. Got type "${typeof version}".`);
        }
        if (version.length > MAX_LENGTH) {
          throw new TypeError(
            `version is longer than ${MAX_LENGTH} characters`
          );
        }
        debug("SemVer", version, options);
        this.options = options;
        this.loose = !!options.loose;
        this.includePrerelease = !!options.includePrerelease;
        const m2 = version.trim().match(options.loose ? re[t2.LOOSE] : re[t2.FULL]);
        if (!m2) {
          throw new TypeError(`Invalid Version: ${version}`);
        }
        this.raw = version;
        this.major = +m2[1];
        this.minor = +m2[2];
        this.patch = +m2[3];
        if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
          throw new TypeError("Invalid major version");
        }
        if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
          throw new TypeError("Invalid minor version");
        }
        if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
          throw new TypeError("Invalid patch version");
        }
        if (!m2[4]) {
          this.prerelease = [];
        } else {
          this.prerelease = m2[4].split(".").map((id) => {
            if (/^[0-9]+$/.test(id)) {
              const num = +id;
              if (num >= 0 && num < MAX_SAFE_INTEGER) {
                return num;
              }
            }
            return id;
          });
        }
        this.build = m2[5] ? m2[5].split(".") : [];
        this.format();
      }
      format() {
        this.version = `${this.major}.${this.minor}.${this.patch}`;
        if (this.prerelease.length) {
          this.version += `-${this.prerelease.join(".")}`;
        }
        return this.version;
      }
      toString() {
        return this.version;
      }
      compare(other) {
        debug("SemVer.compare", this.version, this.options, other);
        if (!(other instanceof _SemVer)) {
          if (typeof other === "string" && other === this.version) {
            return 0;
          }
          other = new _SemVer(other, this.options);
        }
        if (other.version === this.version) {
          return 0;
        }
        return this.compareMain(other) || this.comparePre(other);
      }
      compareMain(other) {
        if (!(other instanceof _SemVer)) {
          other = new _SemVer(other, this.options);
        }
        return compareIdentifiers(this.major, other.major) || compareIdentifiers(this.minor, other.minor) || compareIdentifiers(this.patch, other.patch);
      }
      comparePre(other) {
        if (!(other instanceof _SemVer)) {
          other = new _SemVer(other, this.options);
        }
        if (this.prerelease.length && !other.prerelease.length) {
          return -1;
        } else if (!this.prerelease.length && other.prerelease.length) {
          return 1;
        } else if (!this.prerelease.length && !other.prerelease.length) {
          return 0;
        }
        let i2 = 0;
        do {
          const a = this.prerelease[i2];
          const b = other.prerelease[i2];
          debug("prerelease compare", i2, a, b);
          if (a === void 0 && b === void 0) {
            return 0;
          } else if (b === void 0) {
            return 1;
          } else if (a === void 0) {
            return -1;
          } else if (a === b) {
            continue;
          } else {
            return compareIdentifiers(a, b);
          }
        } while (++i2);
      }
      compareBuild(other) {
        if (!(other instanceof _SemVer)) {
          other = new _SemVer(other, this.options);
        }
        let i2 = 0;
        do {
          const a = this.build[i2];
          const b = other.build[i2];
          debug("build compare", i2, a, b);
          if (a === void 0 && b === void 0) {
            return 0;
          } else if (b === void 0) {
            return 1;
          } else if (a === void 0) {
            return -1;
          } else if (a === b) {
            continue;
          } else {
            return compareIdentifiers(a, b);
          }
        } while (++i2);
      }
      // preminor will bump the version up to the next minor release, and immediately
      // down to pre-release. premajor and prepatch work the same way.
      inc(release, identifier, identifierBase) {
        if (release.startsWith("pre")) {
          if (!identifier && identifierBase === false) {
            throw new Error("invalid increment argument: identifier is empty");
          }
          if (identifier) {
            const match = `-${identifier}`.match(this.options.loose ? re[t2.PRERELEASELOOSE] : re[t2.PRERELEASE]);
            if (!match || match[1] !== identifier) {
              throw new Error(`invalid identifier: ${identifier}`);
            }
          }
        }
        switch (release) {
          case "premajor":
            this.prerelease.length = 0;
            this.patch = 0;
            this.minor = 0;
            this.major++;
            this.inc("pre", identifier, identifierBase);
            break;
          case "preminor":
            this.prerelease.length = 0;
            this.patch = 0;
            this.minor++;
            this.inc("pre", identifier, identifierBase);
            break;
          case "prepatch":
            this.prerelease.length = 0;
            this.inc("patch", identifier, identifierBase);
            this.inc("pre", identifier, identifierBase);
            break;
          // If the input is a non-prerelease version, this acts the same as
          // prepatch.
          case "prerelease":
            if (this.prerelease.length === 0) {
              this.inc("patch", identifier, identifierBase);
            }
            this.inc("pre", identifier, identifierBase);
            break;
          case "release":
            if (this.prerelease.length === 0) {
              throw new Error(`version ${this.raw} is not a prerelease`);
            }
            this.prerelease.length = 0;
            break;
          case "major":
            if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) {
              this.major++;
            }
            this.minor = 0;
            this.patch = 0;
            this.prerelease = [];
            break;
          case "minor":
            if (this.patch !== 0 || this.prerelease.length === 0) {
              this.minor++;
            }
            this.patch = 0;
            this.prerelease = [];
            break;
          case "patch":
            if (this.prerelease.length === 0) {
              this.patch++;
            }
            this.prerelease = [];
            break;
          // This probably shouldn't be used publicly.
          // 1.0.0 'pre' would become 1.0.0-0 which is the wrong direction.
          case "pre": {
            const base = Number(identifierBase) ? 1 : 0;
            if (this.prerelease.length === 0) {
              this.prerelease = [base];
            } else {
              let i2 = this.prerelease.length;
              while (--i2 >= 0) {
                if (typeof this.prerelease[i2] === "number") {
                  this.prerelease[i2]++;
                  i2 = -2;
                }
              }
              if (i2 === -1) {
                if (identifier === this.prerelease.join(".") && identifierBase === false) {
                  throw new Error("invalid increment argument: identifier already exists");
                }
                this.prerelease.push(base);
              }
            }
            if (identifier) {
              let prerelease = [identifier, base];
              if (identifierBase === false) {
                prerelease = [identifier];
              }
              if (compareIdentifiers(this.prerelease[0], identifier) === 0) {
                if (isNaN(this.prerelease[1])) {
                  this.prerelease = prerelease;
                }
              } else {
                this.prerelease = prerelease;
              }
            }
            break;
          }
          default:
            throw new Error(`invalid increment argument: ${release}`);
        }
        this.raw = this.format();
        if (this.build.length) {
          this.raw += `+${this.build.join(".")}`;
        }
        return this;
      }
    };
    module2.exports = SemVer;
  }
});

// node_modules/semver/functions/parse.js
var require_parse = __commonJS({
  "node_modules/semver/functions/parse.js"(exports2, module2) {
    "use strict";
    var SemVer = require_semver();
    var parse = (version, options, throwErrors = false) => {
      if (version instanceof SemVer) {
        return version;
      }
      try {
        return new SemVer(version, options);
      } catch (er) {
        if (!throwErrors) {
          return null;
        }
        throw er;
      }
    };
    module2.exports = parse;
  }
});

// node_modules/semver/functions/valid.js
var require_valid = __commonJS({
  "node_modules/semver/functions/valid.js"(exports2, module2) {
    "use strict";
    var parse = require_parse();
    var valid = (version, options) => {
      const v = parse(version, options);
      return v ? v.version : null;
    };
    module2.exports = valid;
  }
});

// node_modules/semver/functions/clean.js
var require_clean = __commonJS({
  "node_modules/semver/functions/clean.js"(exports2, module2) {
    "use strict";
    var parse = require_parse();
    var clean = (version, options) => {
      const s2 = parse(version.trim().replace(/^[=v]+/, ""), options);
      return s2 ? s2.version : null;
    };
    module2.exports = clean;
  }
});

// node_modules/semver/functions/inc.js
var require_inc = __commonJS({
  "node_modules/semver/functions/inc.js"(exports2, module2) {
    "use strict";
    var SemVer = require_semver();
    var inc = (version, release, options, identifier, identifierBase) => {
      if (typeof options === "string") {
        identifierBase = identifier;
        identifier = options;
        options = void 0;
      }
      try {
        return new SemVer(
          version instanceof SemVer ? version.version : version,
          options
        ).inc(release, identifier, identifierBase).version;
      } catch (er) {
        return null;
      }
    };
    module2.exports = inc;
  }
});

// node_modules/semver/functions/diff.js
var require_diff = __commonJS({
  "node_modules/semver/functions/diff.js"(exports2, module2) {
    "use strict";
    var parse = require_parse();
    var diff = (version1, version2) => {
      const v1 = parse(version1, null, true);
      const v2 = parse(version2, null, true);
      const comparison = v1.compare(v2);
      if (comparison === 0) {
        return null;
      }
      const v1Higher = comparison > 0;
      const highVersion = v1Higher ? v1 : v2;
      const lowVersion = v1Higher ? v2 : v1;
      const highHasPre = !!highVersion.prerelease.length;
      const lowHasPre = !!lowVersion.prerelease.length;
      if (lowHasPre && !highHasPre) {
        if (!lowVersion.patch && !lowVersion.minor) {
          return "major";
        }
        if (lowVersion.compareMain(highVersion) === 0) {
          if (lowVersion.minor && !lowVersion.patch) {
            return "minor";
          }
          return "patch";
        }
      }
      const prefix = highHasPre ? "pre" : "";
      if (v1.major !== v2.major) {
        return prefix + "major";
      }
      if (v1.minor !== v2.minor) {
        return prefix + "minor";
      }
      if (v1.patch !== v2.patch) {
        return prefix + "patch";
      }
      return "prerelease";
    };
    module2.exports = diff;
  }
});

// node_modules/semver/functions/major.js
var require_major = __commonJS({
  "node_modules/semver/functions/major.js"(exports2, module2) {
    "use strict";
    var SemVer = require_semver();
    var major = (a, loose) => new SemVer(a, loose).major;
    module2.exports = major;
  }
});

// node_modules/semver/functions/minor.js
var require_minor = __commonJS({
  "node_modules/semver/functions/minor.js"(exports2, module2) {
    "use strict";
    var SemVer = require_semver();
    var minor = (a, loose) => new SemVer(a, loose).minor;
    module2.exports = minor;
  }
});

// node_modules/semver/functions/patch.js
var require_patch = __commonJS({
  "node_modules/semver/functions/patch.js"(exports2, module2) {
    "use strict";
    var SemVer = require_semver();
    var patch = (a, loose) => new SemVer(a, loose).patch;
    module2.exports = patch;
  }
});

// node_modules/semver/functions/prerelease.js
var require_prerelease = __commonJS({
  "node_modules/semver/functions/prerelease.js"(exports2, module2) {
    "use strict";
    var parse = require_parse();
    var prerelease = (version, options) => {
      const parsed = parse(version, options);
      return parsed && parsed.prerelease.length ? parsed.prerelease : null;
    };
    module2.exports = prerelease;
  }
});

// node_modules/semver/functions/compare.js
var require_compare = __commonJS({
  "node_modules/semver/functions/compare.js"(exports2, module2) {
    "use strict";
    var SemVer = require_semver();
    var compare = (a, b, loose) => new SemVer(a, loose).compare(new SemVer(b, loose));
    module2.exports = compare;
  }
});

// node_modules/semver/functions/rcompare.js
var require_rcompare = __commonJS({
  "node_modules/semver/functions/rcompare.js"(exports2, module2) {
    "use strict";
    var compare = require_compare();
    var rcompare = (a, b, loose) => compare(b, a, loose);
    module2.exports = rcompare;
  }
});

// node_modules/semver/functions/compare-loose.js
var require_compare_loose = __commonJS({
  "node_modules/semver/functions/compare-loose.js"(exports2, module2) {
    "use strict";
    var compare = require_compare();
    var compareLoose = (a, b) => compare(a, b, true);
    module2.exports = compareLoose;
  }
});

// node_modules/semver/functions/compare-build.js
var require_compare_build = __commonJS({
  "node_modules/semver/functions/compare-build.js"(exports2, module2) {
    "use strict";
    var SemVer = require_semver();
    var compareBuild = (a, b, loose) => {
      const versionA = new SemVer(a, loose);
      const versionB = new SemVer(b, loose);
      return versionA.compare(versionB) || versionA.compareBuild(versionB);
    };
    module2.exports = compareBuild;
  }
});

// node_modules/semver/functions/sort.js
var require_sort = __commonJS({
  "node_modules/semver/functions/sort.js"(exports2, module2) {
    "use strict";
    var compareBuild = require_compare_build();
    var sort = (list, loose) => list.sort((a, b) => compareBuild(a, b, loose));
    module2.exports = sort;
  }
});

// node_modules/semver/functions/rsort.js
var require_rsort = __commonJS({
  "node_modules/semver/functions/rsort.js"(exports2, module2) {
    "use strict";
    var compareBuild = require_compare_build();
    var rsort = (list, loose) => list.sort((a, b) => compareBuild(b, a, loose));
    module2.exports = rsort;
  }
});

// node_modules/semver/functions/gt.js
var require_gt = __commonJS({
  "node_modules/semver/functions/gt.js"(exports2, module2) {
    "use strict";
    var compare = require_compare();
    var gt = (a, b, loose) => compare(a, b, loose) > 0;
    module2.exports = gt;
  }
});

// node_modules/semver/functions/lt.js
var require_lt = __commonJS({
  "node_modules/semver/functions/lt.js"(exports2, module2) {
    "use strict";
    var compare = require_compare();
    var lt = (a, b, loose) => compare(a, b, loose) < 0;
    module2.exports = lt;
  }
});

// node_modules/semver/functions/eq.js
var require_eq = __commonJS({
  "node_modules/semver/functions/eq.js"(exports2, module2) {
    "use strict";
    var compare = require_compare();
    var eq = (a, b, loose) => compare(a, b, loose) === 0;
    module2.exports = eq;
  }
});

// node_modules/semver/functions/neq.js
var require_neq = __commonJS({
  "node_modules/semver/functions/neq.js"(exports2, module2) {
    "use strict";
    var compare = require_compare();
    var neq = (a, b, loose) => compare(a, b, loose) !== 0;
    module2.exports = neq;
  }
});

// node_modules/semver/functions/gte.js
var require_gte = __commonJS({
  "node_modules/semver/functions/gte.js"(exports2, module2) {
    "use strict";
    var compare = require_compare();
    var gte = (a, b, loose) => compare(a, b, loose) >= 0;
    module2.exports = gte;
  }
});

// node_modules/semver/functions/lte.js
var require_lte = __commonJS({
  "node_modules/semver/functions/lte.js"(exports2, module2) {
    "use strict";
    var compare = require_compare();
    var lte = (a, b, loose) => compare(a, b, loose) <= 0;
    module2.exports = lte;
  }
});

// node_modules/semver/functions/cmp.js
var require_cmp = __commonJS({
  "node_modules/semver/functions/cmp.js"(exports2, module2) {
    "use strict";
    var eq = require_eq();
    var neq = require_neq();
    var gt = require_gt();
    var gte = require_gte();
    var lt = require_lt();
    var lte = require_lte();
    var cmp = (a, op, b, loose) => {
      switch (op) {
        case "===":
          if (typeof a === "object") {
            a = a.version;
          }
          if (typeof b === "object") {
            b = b.version;
          }
          return a === b;
        case "!==":
          if (typeof a === "object") {
            a = a.version;
          }
          if (typeof b === "object") {
            b = b.version;
          }
          return a !== b;
        case "":
        case "=":
        case "==":
          return eq(a, b, loose);
        case "!=":
          return neq(a, b, loose);
        case ">":
          return gt(a, b, loose);
        case ">=":
          return gte(a, b, loose);
        case "<":
          return lt(a, b, loose);
        case "<=":
          return lte(a, b, loose);
        default:
          throw new TypeError(`Invalid operator: ${op}`);
      }
    };
    module2.exports = cmp;
  }
});

// node_modules/semver/functions/coerce.js
var require_coerce = __commonJS({
  "node_modules/semver/functions/coerce.js"(exports2, module2) {
    "use strict";
    var SemVer = require_semver();
    var parse = require_parse();
    var { safeRe: re, t: t2 } = require_re();
    var coerce = (version, options) => {
      if (version instanceof SemVer) {
        return version;
      }
      if (typeof version === "number") {
        version = String(version);
      }
      if (typeof version !== "string") {
        return null;
      }
      options = options || {};
      let match = null;
      if (!options.rtl) {
        match = version.match(options.includePrerelease ? re[t2.COERCEFULL] : re[t2.COERCE]);
      } else {
        const coerceRtlRegex = options.includePrerelease ? re[t2.COERCERTLFULL] : re[t2.COERCERTL];
        let next;
        while ((next = coerceRtlRegex.exec(version)) && (!match || match.index + match[0].length !== version.length)) {
          if (!match || next.index + next[0].length !== match.index + match[0].length) {
            match = next;
          }
          coerceRtlRegex.lastIndex = next.index + next[1].length + next[2].length;
        }
        coerceRtlRegex.lastIndex = -1;
      }
      if (match === null) {
        return null;
      }
      const major = match[2];
      const minor = match[3] || "0";
      const patch = match[4] || "0";
      const prerelease = options.includePrerelease && match[5] ? `-${match[5]}` : "";
      const build = options.includePrerelease && match[6] ? `+${match[6]}` : "";
      return parse(`${major}.${minor}.${patch}${prerelease}${build}`, options);
    };
    module2.exports = coerce;
  }
});

// node_modules/semver/internal/lrucache.js
var require_lrucache = __commonJS({
  "node_modules/semver/internal/lrucache.js"(exports2, module2) {
    "use strict";
    var LRUCache = class {
      constructor() {
        this.max = 1e3;
        this.map = /* @__PURE__ */ new Map();
      }
      get(key) {
        const value = this.map.get(key);
        if (value === void 0) {
          return void 0;
        } else {
          this.map.delete(key);
          this.map.set(key, value);
          return value;
        }
      }
      delete(key) {
        return this.map.delete(key);
      }
      set(key, value) {
        const deleted = this.delete(key);
        if (!deleted && value !== void 0) {
          if (this.map.size >= this.max) {
            const firstKey = this.map.keys().next().value;
            this.delete(firstKey);
          }
          this.map.set(key, value);
        }
        return this;
      }
    };
    module2.exports = LRUCache;
  }
});

// node_modules/semver/classes/range.js
var require_range = __commonJS({
  "node_modules/semver/classes/range.js"(exports2, module2) {
    "use strict";
    var SPACE_CHARACTERS = /\s+/g;
    var Range = class _Range {
      constructor(range, options) {
        options = parseOptions(options);
        if (range instanceof _Range) {
          if (range.loose === !!options.loose && range.includePrerelease === !!options.includePrerelease) {
            return range;
          } else {
            return new _Range(range.raw, options);
          }
        }
        if (range instanceof Comparator) {
          this.raw = range.value;
          this.set = [[range]];
          this.formatted = void 0;
          return this;
        }
        this.options = options;
        this.loose = !!options.loose;
        this.includePrerelease = !!options.includePrerelease;
        this.raw = range.trim().replace(SPACE_CHARACTERS, " ");
        this.set = this.raw.split("||").map((r2) => this.parseRange(r2.trim())).filter((c) => c.length);
        if (!this.set.length) {
          throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
        }
        if (this.set.length > 1) {
          const first = this.set[0];
          this.set = this.set.filter((c) => !isNullSet(c[0]));
          if (this.set.length === 0) {
            this.set = [first];
          } else if (this.set.length > 1) {
            for (const c of this.set) {
              if (c.length === 1 && isAny(c[0])) {
                this.set = [c];
                break;
              }
            }
          }
        }
        this.formatted = void 0;
      }
      get range() {
        if (this.formatted === void 0) {
          this.formatted = "";
          for (let i2 = 0; i2 < this.set.length; i2++) {
            if (i2 > 0) {
              this.formatted += "||";
            }
            const comps = this.set[i2];
            for (let k = 0; k < comps.length; k++) {
              if (k > 0) {
                this.formatted += " ";
              }
              this.formatted += comps[k].toString().trim();
            }
          }
        }
        return this.formatted;
      }
      format() {
        return this.range;
      }
      toString() {
        return this.range;
      }
      parseRange(range) {
        const memoOpts = (this.options.includePrerelease && FLAG_INCLUDE_PRERELEASE) | (this.options.loose && FLAG_LOOSE);
        const memoKey = memoOpts + ":" + range;
        const cached = cache.get(memoKey);
        if (cached) {
          return cached;
        }
        const loose = this.options.loose;
        const hr = loose ? re[t2.HYPHENRANGELOOSE] : re[t2.HYPHENRANGE];
        range = range.replace(hr, hyphenReplace(this.options.includePrerelease));
        debug("hyphen replace", range);
        range = range.replace(re[t2.COMPARATORTRIM], comparatorTrimReplace);
        debug("comparator trim", range);
        range = range.replace(re[t2.TILDETRIM], tildeTrimReplace);
        debug("tilde trim", range);
        range = range.replace(re[t2.CARETTRIM], caretTrimReplace);
        debug("caret trim", range);
        let rangeList = range.split(" ").map((comp) => parseComparator(comp, this.options)).join(" ").split(/\s+/).map((comp) => replaceGTE0(comp, this.options));
        if (loose) {
          rangeList = rangeList.filter((comp) => {
            debug("loose invalid filter", comp, this.options);
            return !!comp.match(re[t2.COMPARATORLOOSE]);
          });
        }
        debug("range list", rangeList);
        const rangeMap = /* @__PURE__ */ new Map();
        const comparators = rangeList.map((comp) => new Comparator(comp, this.options));
        for (const comp of comparators) {
          if (isNullSet(comp)) {
            return [comp];
          }
          rangeMap.set(comp.value, comp);
        }
        if (rangeMap.size > 1 && rangeMap.has("")) {
          rangeMap.delete("");
        }
        const result = [...rangeMap.values()];
        cache.set(memoKey, result);
        return result;
      }
      intersects(range, options) {
        if (!(range instanceof _Range)) {
          throw new TypeError("a Range is required");
        }
        return this.set.some((thisComparators) => {
          return isSatisfiable(thisComparators, options) && range.set.some((rangeComparators) => {
            return isSatisfiable(rangeComparators, options) && thisComparators.every((thisComparator) => {
              return rangeComparators.every((rangeComparator) => {
                return thisComparator.intersects(rangeComparator, options);
              });
            });
          });
        });
      }
      // if ANY of the sets match ALL of its comparators, then pass
      test(version) {
        if (!version) {
          return false;
        }
        if (typeof version === "string") {
          try {
            version = new SemVer(version, this.options);
          } catch (er) {
            return false;
          }
        }
        for (let i2 = 0; i2 < this.set.length; i2++) {
          if (testSet(this.set[i2], version, this.options)) {
            return true;
          }
        }
        return false;
      }
    };
    module2.exports = Range;
    var LRU = require_lrucache();
    var cache = new LRU();
    var parseOptions = require_parse_options();
    var Comparator = require_comparator();
    var debug = require_debug();
    var SemVer = require_semver();
    var {
      safeRe: re,
      t: t2,
      comparatorTrimReplace,
      tildeTrimReplace,
      caretTrimReplace
    } = require_re();
    var { FLAG_INCLUDE_PRERELEASE, FLAG_LOOSE } = require_constants5();
    var isNullSet = (c) => c.value === "<0.0.0-0";
    var isAny = (c) => c.value === "";
    var isSatisfiable = (comparators, options) => {
      let result = true;
      const remainingComparators = comparators.slice();
      let testComparator = remainingComparators.pop();
      while (result && remainingComparators.length) {
        result = remainingComparators.every((otherComparator) => {
          return testComparator.intersects(otherComparator, options);
        });
        testComparator = remainingComparators.pop();
      }
      return result;
    };
    var parseComparator = (comp, options) => {
      debug("comp", comp, options);
      comp = replaceCarets(comp, options);
      debug("caret", comp);
      comp = replaceTildes(comp, options);
      debug("tildes", comp);
      comp = replaceXRanges(comp, options);
      debug("xrange", comp);
      comp = replaceStars(comp, options);
      debug("stars", comp);
      return comp;
    };
    var isX = (id) => !id || id.toLowerCase() === "x" || id === "*";
    var replaceTildes = (comp, options) => {
      return comp.trim().split(/\s+/).map((c) => replaceTilde(c, options)).join(" ");
    };
    var replaceTilde = (comp, options) => {
      const r2 = options.loose ? re[t2.TILDELOOSE] : re[t2.TILDE];
      return comp.replace(r2, (_, M, m2, p, pr) => {
        debug("tilde", comp, _, M, m2, p, pr);
        let ret;
        if (isX(M)) {
          ret = "";
        } else if (isX(m2)) {
          ret = `>=${M}.0.0 <${+M + 1}.0.0-0`;
        } else if (isX(p)) {
          ret = `>=${M}.${m2}.0 <${M}.${+m2 + 1}.0-0`;
        } else if (pr) {
          debug("replaceTilde pr", pr);
          ret = `>=${M}.${m2}.${p}-${pr} <${M}.${+m2 + 1}.0-0`;
        } else {
          ret = `>=${M}.${m2}.${p} <${M}.${+m2 + 1}.0-0`;
        }
        debug("tilde return", ret);
        return ret;
      });
    };
    var replaceCarets = (comp, options) => {
      return comp.trim().split(/\s+/).map((c) => replaceCaret(c, options)).join(" ");
    };
    var replaceCaret = (comp, options) => {
      debug("caret", comp, options);
      const r2 = options.loose ? re[t2.CARETLOOSE] : re[t2.CARET];
      const z = options.includePrerelease ? "-0" : "";
      return comp.replace(r2, (_, M, m2, p, pr) => {
        debug("caret", comp, _, M, m2, p, pr);
        let ret;
        if (isX(M)) {
          ret = "";
        } else if (isX(m2)) {
          ret = `>=${M}.0.0${z} <${+M + 1}.0.0-0`;
        } else if (isX(p)) {
          if (M === "0") {
            ret = `>=${M}.${m2}.0${z} <${M}.${+m2 + 1}.0-0`;
          } else {
            ret = `>=${M}.${m2}.0${z} <${+M + 1}.0.0-0`;
          }
        } else if (pr) {
          debug("replaceCaret pr", pr);
          if (M === "0") {
            if (m2 === "0") {
              ret = `>=${M}.${m2}.${p}-${pr} <${M}.${m2}.${+p + 1}-0`;
            } else {
              ret = `>=${M}.${m2}.${p}-${pr} <${M}.${+m2 + 1}.0-0`;
            }
          } else {
            ret = `>=${M}.${m2}.${p}-${pr} <${+M + 1}.0.0-0`;
          }
        } else {
          debug("no pr");
          if (M === "0") {
            if (m2 === "0") {
              ret = `>=${M}.${m2}.${p}${z} <${M}.${m2}.${+p + 1}-0`;
            } else {
              ret = `>=${M}.${m2}.${p}${z} <${M}.${+m2 + 1}.0-0`;
            }
          } else {
            ret = `>=${M}.${m2}.${p} <${+M + 1}.0.0-0`;
          }
        }
        debug("caret return", ret);
        return ret;
      });
    };
    var replaceXRanges = (comp, options) => {
      debug("replaceXRanges", comp, options);
      return comp.split(/\s+/).map((c) => replaceXRange(c, options)).join(" ");
    };
    var replaceXRange = (comp, options) => {
      comp = comp.trim();
      const r2 = options.loose ? re[t2.XRANGELOOSE] : re[t2.XRANGE];
      return comp.replace(r2, (ret, gtlt, M, m2, p, pr) => {
        debug("xRange", comp, ret, gtlt, M, m2, p, pr);
        const xM = isX(M);
        const xm = xM || isX(m2);
        const xp = xm || isX(p);
        const anyX = xp;
        if (gtlt === "=" && anyX) {
          gtlt = "";
        }
        pr = options.includePrerelease ? "-0" : "";
        if (xM) {
          if (gtlt === ">" || gtlt === "<") {
            ret = "<0.0.0-0";
          } else {
            ret = "*";
          }
        } else if (gtlt && anyX) {
          if (xm) {
            m2 = 0;
          }
          p = 0;
          if (gtlt === ">") {
            gtlt = ">=";
            if (xm) {
              M = +M + 1;
              m2 = 0;
              p = 0;
            } else {
              m2 = +m2 + 1;
              p = 0;
            }
          } else if (gtlt === "<=") {
            gtlt = "<";
            if (xm) {
              M = +M + 1;
            } else {
              m2 = +m2 + 1;
            }
          }
          if (gtlt === "<") {
            pr = "-0";
          }
          ret = `${gtlt + M}.${m2}.${p}${pr}`;
        } else if (xm) {
          ret = `>=${M}.0.0${pr} <${+M + 1}.0.0-0`;
        } else if (xp) {
          ret = `>=${M}.${m2}.0${pr} <${M}.${+m2 + 1}.0-0`;
        }
        debug("xRange return", ret);
        return ret;
      });
    };
    var replaceStars = (comp, options) => {
      debug("replaceStars", comp, options);
      return comp.trim().replace(re[t2.STAR], "");
    };
    var replaceGTE0 = (comp, options) => {
      debug("replaceGTE0", comp, options);
      return comp.trim().replace(re[options.includePrerelease ? t2.GTE0PRE : t2.GTE0], "");
    };
    var hyphenReplace = (incPr) => ($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr) => {
      if (isX(fM)) {
        from = "";
      } else if (isX(fm)) {
        from = `>=${fM}.0.0${incPr ? "-0" : ""}`;
      } else if (isX(fp)) {
        from = `>=${fM}.${fm}.0${incPr ? "-0" : ""}`;
      } else if (fpr) {
        from = `>=${from}`;
      } else {
        from = `>=${from}${incPr ? "-0" : ""}`;
      }
      if (isX(tM)) {
        to = "";
      } else if (isX(tm)) {
        to = `<${+tM + 1}.0.0-0`;
      } else if (isX(tp)) {
        to = `<${tM}.${+tm + 1}.0-0`;
      } else if (tpr) {
        to = `<=${tM}.${tm}.${tp}-${tpr}`;
      } else if (incPr) {
        to = `<${tM}.${tm}.${+tp + 1}-0`;
      } else {
        to = `<=${to}`;
      }
      return `${from} ${to}`.trim();
    };
    var testSet = (set, version, options) => {
      for (let i2 = 0; i2 < set.length; i2++) {
        if (!set[i2].test(version)) {
          return false;
        }
      }
      if (version.prerelease.length && !options.includePrerelease) {
        for (let i2 = 0; i2 < set.length; i2++) {
          debug(set[i2].semver);
          if (set[i2].semver === Comparator.ANY) {
            continue;
          }
          if (set[i2].semver.prerelease.length > 0) {
            const allowed = set[i2].semver;
            if (allowed.major === version.major && allowed.minor === version.minor && allowed.patch === version.patch) {
              return true;
            }
          }
        }
        return false;
      }
      return true;
    };
  }
});

// node_modules/semver/classes/comparator.js
var require_comparator = __commonJS({
  "node_modules/semver/classes/comparator.js"(exports2, module2) {
    "use strict";
    var ANY = Symbol("SemVer ANY");
    var Comparator = class _Comparator {
      static get ANY() {
        return ANY;
      }
      constructor(comp, options) {
        options = parseOptions(options);
        if (comp instanceof _Comparator) {
          if (comp.loose === !!options.loose) {
            return comp;
          } else {
            comp = comp.value;
          }
        }
        comp = comp.trim().split(/\s+/).join(" ");
        debug("comparator", comp, options);
        this.options = options;
        this.loose = !!options.loose;
        this.parse(comp);
        if (this.semver === ANY) {
          this.value = "";
        } else {
          this.value = this.operator + this.semver.version;
        }
        debug("comp", this);
      }
      parse(comp) {
        const r2 = this.options.loose ? re[t2.COMPARATORLOOSE] : re[t2.COMPARATOR];
        const m2 = comp.match(r2);
        if (!m2) {
          throw new TypeError(`Invalid comparator: ${comp}`);
        }
        this.operator = m2[1] !== void 0 ? m2[1] : "";
        if (this.operator === "=") {
          this.operator = "";
        }
        if (!m2[2]) {
          this.semver = ANY;
        } else {
          this.semver = new SemVer(m2[2], this.options.loose);
        }
      }
      toString() {
        return this.value;
      }
      test(version) {
        debug("Comparator.test", version, this.options.loose);
        if (this.semver === ANY || version === ANY) {
          return true;
        }
        if (typeof version === "string") {
          try {
            version = new SemVer(version, this.options);
          } catch (er) {
            return false;
          }
        }
        return cmp(version, this.operator, this.semver, this.options);
      }
      intersects(comp, options) {
        if (!(comp instanceof _Comparator)) {
          throw new TypeError("a Comparator is required");
        }
        if (this.operator === "") {
          if (this.value === "") {
            return true;
          }
          return new Range(comp.value, options).test(this.value);
        } else if (comp.operator === "") {
          if (comp.value === "") {
            return true;
          }
          return new Range(this.value, options).test(comp.semver);
        }
        options = parseOptions(options);
        if (options.includePrerelease && (this.value === "<0.0.0-0" || comp.value === "<0.0.0-0")) {
          return false;
        }
        if (!options.includePrerelease && (this.value.startsWith("<0.0.0") || comp.value.startsWith("<0.0.0"))) {
          return false;
        }
        if (this.operator.startsWith(">") && comp.operator.startsWith(">")) {
          return true;
        }
        if (this.operator.startsWith("<") && comp.operator.startsWith("<")) {
          return true;
        }
        if (this.semver.version === comp.semver.version && this.operator.includes("=") && comp.operator.includes("=")) {
          return true;
        }
        if (cmp(this.semver, "<", comp.semver, options) && this.operator.startsWith(">") && comp.operator.startsWith("<")) {
          return true;
        }
        if (cmp(this.semver, ">", comp.semver, options) && this.operator.startsWith("<") && comp.operator.startsWith(">")) {
          return true;
        }
        return false;
      }
    };
    module2.exports = Comparator;
    var parseOptions = require_parse_options();
    var { safeRe: re, t: t2 } = require_re();
    var cmp = require_cmp();
    var debug = require_debug();
    var SemVer = require_semver();
    var Range = require_range();
  }
});

// node_modules/semver/functions/satisfies.js
var require_satisfies = __commonJS({
  "node_modules/semver/functions/satisfies.js"(exports2, module2) {
    "use strict";
    var Range = require_range();
    var satisfies = (version, range, options) => {
      try {
        range = new Range(range, options);
      } catch (er) {
        return false;
      }
      return range.test(version);
    };
    module2.exports = satisfies;
  }
});

// node_modules/semver/ranges/to-comparators.js
var require_to_comparators = __commonJS({
  "node_modules/semver/ranges/to-comparators.js"(exports2, module2) {
    "use strict";
    var Range = require_range();
    var toComparators = (range, options) => new Range(range, options).set.map((comp) => comp.map((c) => c.value).join(" ").trim().split(" "));
    module2.exports = toComparators;
  }
});

// node_modules/semver/ranges/max-satisfying.js
var require_max_satisfying = __commonJS({
  "node_modules/semver/ranges/max-satisfying.js"(exports2, module2) {
    "use strict";
    var SemVer = require_semver();
    var Range = require_range();
    var maxSatisfying = (versions, range, options) => {
      let max = null;
      let maxSV = null;
      let rangeObj = null;
      try {
        rangeObj = new Range(range, options);
      } catch (er) {
        return null;
      }
      versions.forEach((v) => {
        if (rangeObj.test(v)) {
          if (!max || maxSV.compare(v) === -1) {
            max = v;
            maxSV = new SemVer(max, options);
          }
        }
      });
      return max;
    };
    module2.exports = maxSatisfying;
  }
});

// node_modules/semver/ranges/min-satisfying.js
var require_min_satisfying = __commonJS({
  "node_modules/semver/ranges/min-satisfying.js"(exports2, module2) {
    "use strict";
    var SemVer = require_semver();
    var Range = require_range();
    var minSatisfying = (versions, range, options) => {
      let min = null;
      let minSV = null;
      let rangeObj = null;
      try {
        rangeObj = new Range(range, options);
      } catch (er) {
        return null;
      }
      versions.forEach((v) => {
        if (rangeObj.test(v)) {
          if (!min || minSV.compare(v) === 1) {
            min = v;
            minSV = new SemVer(min, options);
          }
        }
      });
      return min;
    };
    module2.exports = minSatisfying;
  }
});

// node_modules/semver/ranges/min-version.js
var require_min_version = __commonJS({
  "node_modules/semver/ranges/min-version.js"(exports2, module2) {
    "use strict";
    var SemVer = require_semver();
    var Range = require_range();
    var gt = require_gt();
    var minVersion = (range, loose) => {
      range = new Range(range, loose);
      let minver = new SemVer("0.0.0");
      if (range.test(minver)) {
        return minver;
      }
      minver = new SemVer("0.0.0-0");
      if (range.test(minver)) {
        return minver;
      }
      minver = null;
      for (let i2 = 0; i2 < range.set.length; ++i2) {
        const comparators = range.set[i2];
        let setMin = null;
        comparators.forEach((comparator) => {
          const compver = new SemVer(comparator.semver.version);
          switch (comparator.operator) {
            case ">":
              if (compver.prerelease.length === 0) {
                compver.patch++;
              } else {
                compver.prerelease.push(0);
              }
              compver.raw = compver.format();
            /* fallthrough */
            case "":
            case ">=":
              if (!setMin || gt(compver, setMin)) {
                setMin = compver;
              }
              break;
            case "<":
            case "<=":
              break;
            /* istanbul ignore next */
            default:
              throw new Error(`Unexpected operation: ${comparator.operator}`);
          }
        });
        if (setMin && (!minver || gt(minver, setMin))) {
          minver = setMin;
        }
      }
      if (minver && range.test(minver)) {
        return minver;
      }
      return null;
    };
    module2.exports = minVersion;
  }
});

// node_modules/semver/ranges/valid.js
var require_valid2 = __commonJS({
  "node_modules/semver/ranges/valid.js"(exports2, module2) {
    "use strict";
    var Range = require_range();
    var validRange = (range, options) => {
      try {
        return new Range(range, options).range || "*";
      } catch (er) {
        return null;
      }
    };
    module2.exports = validRange;
  }
});

// node_modules/semver/ranges/outside.js
var require_outside = __commonJS({
  "node_modules/semver/ranges/outside.js"(exports2, module2) {
    "use strict";
    var SemVer = require_semver();
    var Comparator = require_comparator();
    var { ANY } = Comparator;
    var Range = require_range();
    var satisfies = require_satisfies();
    var gt = require_gt();
    var lt = require_lt();
    var lte = require_lte();
    var gte = require_gte();
    var outside = (version, range, hilo, options) => {
      version = new SemVer(version, options);
      range = new Range(range, options);
      let gtfn, ltefn, ltfn, comp, ecomp;
      switch (hilo) {
        case ">":
          gtfn = gt;
          ltefn = lte;
          ltfn = lt;
          comp = ">";
          ecomp = ">=";
          break;
        case "<":
          gtfn = lt;
          ltefn = gte;
          ltfn = gt;
          comp = "<";
          ecomp = "<=";
          break;
        default:
          throw new TypeError('Must provide a hilo val of "<" or ">"');
      }
      if (satisfies(version, range, options)) {
        return false;
      }
      for (let i2 = 0; i2 < range.set.length; ++i2) {
        const comparators = range.set[i2];
        let high = null;
        let low = null;
        comparators.forEach((comparator) => {
          if (comparator.semver === ANY) {
            comparator = new Comparator(">=0.0.0");
          }
          high = high || comparator;
          low = low || comparator;
          if (gtfn(comparator.semver, high.semver, options)) {
            high = comparator;
          } else if (ltfn(comparator.semver, low.semver, options)) {
            low = comparator;
          }
        });
        if (high.operator === comp || high.operator === ecomp) {
          return false;
        }
        if ((!low.operator || low.operator === comp) && ltefn(version, low.semver)) {
          return false;
        } else if (low.operator === ecomp && ltfn(version, low.semver)) {
          return false;
        }
      }
      return true;
    };
    module2.exports = outside;
  }
});

// node_modules/semver/ranges/gtr.js
var require_gtr = __commonJS({
  "node_modules/semver/ranges/gtr.js"(exports2, module2) {
    "use strict";
    var outside = require_outside();
    var gtr = (version, range, options) => outside(version, range, ">", options);
    module2.exports = gtr;
  }
});

// node_modules/semver/ranges/ltr.js
var require_ltr = __commonJS({
  "node_modules/semver/ranges/ltr.js"(exports2, module2) {
    "use strict";
    var outside = require_outside();
    var ltr = (version, range, options) => outside(version, range, "<", options);
    module2.exports = ltr;
  }
});

// node_modules/semver/ranges/intersects.js
var require_intersects = __commonJS({
  "node_modules/semver/ranges/intersects.js"(exports2, module2) {
    "use strict";
    var Range = require_range();
    var intersects = (r1, r2, options) => {
      r1 = new Range(r1, options);
      r2 = new Range(r2, options);
      return r1.intersects(r2, options);
    };
    module2.exports = intersects;
  }
});

// node_modules/semver/ranges/simplify.js
var require_simplify = __commonJS({
  "node_modules/semver/ranges/simplify.js"(exports2, module2) {
    "use strict";
    var satisfies = require_satisfies();
    var compare = require_compare();
    module2.exports = (versions, range, options) => {
      const set = [];
      let first = null;
      let prev = null;
      const v = versions.sort((a, b) => compare(a, b, options));
      for (const version of v) {
        const included = satisfies(version, range, options);
        if (included) {
          prev = version;
          if (!first) {
            first = version;
          }
        } else {
          if (prev) {
            set.push([first, prev]);
          }
          prev = null;
          first = null;
        }
      }
      if (first) {
        set.push([first, null]);
      }
      const ranges = [];
      for (const [min, max] of set) {
        if (min === max) {
          ranges.push(min);
        } else if (!max && min === v[0]) {
          ranges.push("*");
        } else if (!max) {
          ranges.push(`>=${min}`);
        } else if (min === v[0]) {
          ranges.push(`<=${max}`);
        } else {
          ranges.push(`${min} - ${max}`);
        }
      }
      const simplified = ranges.join(" || ");
      const original = typeof range.raw === "string" ? range.raw : String(range);
      return simplified.length < original.length ? simplified : range;
    };
  }
});

// node_modules/semver/ranges/subset.js
var require_subset = __commonJS({
  "node_modules/semver/ranges/subset.js"(exports2, module2) {
    "use strict";
    var Range = require_range();
    var Comparator = require_comparator();
    var { ANY } = Comparator;
    var satisfies = require_satisfies();
    var compare = require_compare();
    var subset = (sub, dom, options = {}) => {
      if (sub === dom) {
        return true;
      }
      sub = new Range(sub, options);
      dom = new Range(dom, options);
      let sawNonNull = false;
      OUTER: for (const simpleSub of sub.set) {
        for (const simpleDom of dom.set) {
          const isSub = simpleSubset(simpleSub, simpleDom, options);
          sawNonNull = sawNonNull || isSub !== null;
          if (isSub) {
            continue OUTER;
          }
        }
        if (sawNonNull) {
          return false;
        }
      }
      return true;
    };
    var minimumVersionWithPreRelease = [new Comparator(">=0.0.0-0")];
    var minimumVersion = [new Comparator(">=0.0.0")];
    var simpleSubset = (sub, dom, options) => {
      if (sub === dom) {
        return true;
      }
      if (sub.length === 1 && sub[0].semver === ANY) {
        if (dom.length === 1 && dom[0].semver === ANY) {
          return true;
        } else if (options.includePrerelease) {
          sub = minimumVersionWithPreRelease;
        } else {
          sub = minimumVersion;
        }
      }
      if (dom.length === 1 && dom[0].semver === ANY) {
        if (options.includePrerelease) {
          return true;
        } else {
          dom = minimumVersion;
        }
      }
      const eqSet = /* @__PURE__ */ new Set();
      let gt, lt;
      for (const c of sub) {
        if (c.operator === ">" || c.operator === ">=") {
          gt = higherGT(gt, c, options);
        } else if (c.operator === "<" || c.operator === "<=") {
          lt = lowerLT(lt, c, options);
        } else {
          eqSet.add(c.semver);
        }
      }
      if (eqSet.size > 1) {
        return null;
      }
      let gtltComp;
      if (gt && lt) {
        gtltComp = compare(gt.semver, lt.semver, options);
        if (gtltComp > 0) {
          return null;
        } else if (gtltComp === 0 && (gt.operator !== ">=" || lt.operator !== "<=")) {
          return null;
        }
      }
      for (const eq of eqSet) {
        if (gt && !satisfies(eq, String(gt), options)) {
          return null;
        }
        if (lt && !satisfies(eq, String(lt), options)) {
          return null;
        }
        for (const c of dom) {
          if (!satisfies(eq, String(c), options)) {
            return false;
          }
        }
        return true;
      }
      let higher, lower2;
      let hasDomLT, hasDomGT;
      let needDomLTPre = lt && !options.includePrerelease && lt.semver.prerelease.length ? lt.semver : false;
      let needDomGTPre = gt && !options.includePrerelease && gt.semver.prerelease.length ? gt.semver : false;
      if (needDomLTPre && needDomLTPre.prerelease.length === 1 && lt.operator === "<" && needDomLTPre.prerelease[0] === 0) {
        needDomLTPre = false;
      }
      for (const c of dom) {
        hasDomGT = hasDomGT || c.operator === ">" || c.operator === ">=";
        hasDomLT = hasDomLT || c.operator === "<" || c.operator === "<=";
        if (gt) {
          if (needDomGTPre) {
            if (c.semver.prerelease && c.semver.prerelease.length && c.semver.major === needDomGTPre.major && c.semver.minor === needDomGTPre.minor && c.semver.patch === needDomGTPre.patch) {
              needDomGTPre = false;
            }
          }
          if (c.operator === ">" || c.operator === ">=") {
            higher = higherGT(gt, c, options);
            if (higher === c && higher !== gt) {
              return false;
            }
          } else if (gt.operator === ">=" && !satisfies(gt.semver, String(c), options)) {
            return false;
          }
        }
        if (lt) {
          if (needDomLTPre) {
            if (c.semver.prerelease && c.semver.prerelease.length && c.semver.major === needDomLTPre.major && c.semver.minor === needDomLTPre.minor && c.semver.patch === needDomLTPre.patch) {
              needDomLTPre = false;
            }
          }
          if (c.operator === "<" || c.operator === "<=") {
            lower2 = lowerLT(lt, c, options);
            if (lower2 === c && lower2 !== lt) {
              return false;
            }
          } else if (lt.operator === "<=" && !satisfies(lt.semver, String(c), options)) {
            return false;
          }
        }
        if (!c.operator && (lt || gt) && gtltComp !== 0) {
          return false;
        }
      }
      if (gt && hasDomLT && !lt && gtltComp !== 0) {
        return false;
      }
      if (lt && hasDomGT && !gt && gtltComp !== 0) {
        return false;
      }
      if (needDomGTPre || needDomLTPre) {
        return false;
      }
      return true;
    };
    var higherGT = (a, b, options) => {
      if (!a) {
        return b;
      }
      const comp = compare(a.semver, b.semver, options);
      return comp > 0 ? a : comp < 0 ? b : b.operator === ">" && a.operator === ">=" ? b : a;
    };
    var lowerLT = (a, b, options) => {
      if (!a) {
        return b;
      }
      const comp = compare(a.semver, b.semver, options);
      return comp < 0 ? a : comp > 0 ? b : b.operator === "<" && a.operator === "<=" ? b : a;
    };
    module2.exports = subset;
  }
});

// node_modules/semver/index.js
var require_semver2 = __commonJS({
  "node_modules/semver/index.js"(exports2, module2) {
    "use strict";
    var internalRe = require_re();
    var constants = require_constants5();
    var SemVer = require_semver();
    var identifiers = require_identifiers();
    var parse = require_parse();
    var valid = require_valid();
    var clean = require_clean();
    var inc = require_inc();
    var diff = require_diff();
    var major = require_major();
    var minor = require_minor();
    var patch = require_patch();
    var prerelease = require_prerelease();
    var compare = require_compare();
    var rcompare = require_rcompare();
    var compareLoose = require_compare_loose();
    var compareBuild = require_compare_build();
    var sort = require_sort();
    var rsort = require_rsort();
    var gt = require_gt();
    var lt = require_lt();
    var eq = require_eq();
    var neq = require_neq();
    var gte = require_gte();
    var lte = require_lte();
    var cmp = require_cmp();
    var coerce = require_coerce();
    var Comparator = require_comparator();
    var Range = require_range();
    var satisfies = require_satisfies();
    var toComparators = require_to_comparators();
    var maxSatisfying = require_max_satisfying();
    var minSatisfying = require_min_satisfying();
    var minVersion = require_min_version();
    var validRange = require_valid2();
    var outside = require_outside();
    var gtr = require_gtr();
    var ltr = require_ltr();
    var intersects = require_intersects();
    var simplifyRange = require_simplify();
    var subset = require_subset();
    module2.exports = {
      parse,
      valid,
      clean,
      inc,
      diff,
      major,
      minor,
      patch,
      prerelease,
      compare,
      rcompare,
      compareLoose,
      compareBuild,
      sort,
      rsort,
      gt,
      lt,
      eq,
      neq,
      gte,
      lte,
      cmp,
      coerce,
      Comparator,
      Range,
      satisfies,
      toComparators,
      maxSatisfying,
      minSatisfying,
      minVersion,
      validRange,
      outside,
      gtr,
      ltr,
      intersects,
      simplifyRange,
      subset,
      SemVer,
      re: internalRe.re,
      src: internalRe.src,
      tokens: internalRe.t,
      SEMVER_SPEC_VERSION: constants.SEMVER_SPEC_VERSION,
      RELEASE_TYPES: constants.RELEASE_TYPES,
      compareIdentifiers: identifiers.compareIdentifiers,
      rcompareIdentifiers: identifiers.rcompareIdentifiers
    };
  }
});

// node_modules/serialize-error/index.js
var require_serialize_error = __commonJS({
  "node_modules/serialize-error/index.js"(exports2, module2) {
    "use strict";
    var NonError = class _NonError extends Error {
      constructor(message) {
        super(_NonError._prepareSuperMessage(message));
        Object.defineProperty(this, "name", {
          value: "NonError",
          configurable: true,
          writable: true
        });
        if (Error.captureStackTrace) {
          Error.captureStackTrace(this, _NonError);
        }
      }
      static _prepareSuperMessage(message) {
        try {
          return JSON.stringify(message);
        } catch (_) {
          return String(message);
        }
      }
    };
    var commonProperties = [
      { property: "name", enumerable: false },
      { property: "message", enumerable: false },
      { property: "stack", enumerable: false },
      { property: "code", enumerable: true }
    ];
    var destroyCircular = ({ from, seen, to_, forceEnumerable }) => {
      const to = to_ || (Array.isArray(from) ? [] : {});
      seen.push(from);
      for (const [key, value] of Object.entries(from)) {
        if (typeof value === "function") {
          continue;
        }
        if (!value || typeof value !== "object") {
          to[key] = value;
          continue;
        }
        if (!seen.includes(from[key])) {
          to[key] = destroyCircular({ from: from[key], seen: seen.slice(), forceEnumerable });
          continue;
        }
        to[key] = "[Circular]";
      }
      for (const { property, enumerable } of commonProperties) {
        if (typeof from[property] === "string") {
          Object.defineProperty(to, property, {
            value: from[property],
            enumerable: forceEnumerable ? true : enumerable,
            configurable: true,
            writable: true
          });
        }
      }
      return to;
    };
    var serializeError = (value) => {
      if (typeof value === "object" && value !== null) {
        return destroyCircular({ from: value, seen: [], forceEnumerable: true });
      }
      if (typeof value === "function") {
        return `[Function: ${value.name || "anonymous"}]`;
      }
      return value;
    };
    var deserializeError = (value) => {
      if (value instanceof Error) {
        return value;
      }
      if (typeof value === "object" && value !== null && !Array.isArray(value)) {
        const newError = new Error();
        destroyCircular({ from: value, seen: [], to_: newError });
        return newError;
      }
      return new NonError(value);
    };
    module2.exports = {
      serializeError,
      deserializeError
    };
  }
});

// node_modules/global-agent/dist/classes/Agent.js
var require_Agent = __commonJS({
  "node_modules/global-agent/dist/classes/Agent.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = void 0;
    var _serializeError = require_serialize_error();
    var _boolean = require_lib();
    var _Logger = _interopRequireDefault(require_Logger());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var log = _Logger.default.child({
      namespace: "Agent"
    });
    var requestId = 0;
    var Agent = class {
      constructor(isProxyConfigured, mustUrlUseProxy, getUrlProxy, fallbackAgent, socketConnectionTimeout) {
        this.fallbackAgent = fallbackAgent;
        this.isProxyConfigured = isProxyConfigured;
        this.mustUrlUseProxy = mustUrlUseProxy;
        this.getUrlProxy = getUrlProxy;
        this.socketConnectionTimeout = socketConnectionTimeout;
      }
      addRequest(request, configuration) {
        let requestUrl;
        if (request.path.startsWith("http://") || request.path.startsWith("https://")) {
          requestUrl = request.path;
        } else {
          requestUrl = this.protocol + "//" + (configuration.hostname || configuration.host) + (configuration.port === 80 || configuration.port === 443 ? "" : ":" + configuration.port) + request.path;
        }
        if (!this.isProxyConfigured()) {
          log.trace({
            destination: requestUrl
          }, "not proxying request; GLOBAL_AGENT.HTTP_PROXY is not configured");
          this.fallbackAgent.addRequest(request, configuration);
          return;
        }
        if (!this.mustUrlUseProxy(requestUrl)) {
          log.trace({
            destination: requestUrl
          }, "not proxying request; url matches GLOBAL_AGENT.NO_PROXY");
          this.fallbackAgent.addRequest(request, configuration);
          return;
        }
        const currentRequestId = requestId++;
        const proxy = this.getUrlProxy(requestUrl);
        if (this.protocol === "http:") {
          request.path = requestUrl;
          if (proxy.authorization) {
            request.setHeader("proxy-authorization", "Basic " + Buffer.from(proxy.authorization).toString("base64"));
          }
        }
        log.trace({
          destination: requestUrl,
          proxy: "http://" + proxy.hostname + ":" + proxy.port,
          requestId: currentRequestId
        }, "proxying request");
        request.on("error", (error) => {
          log.error({
            error: (0, _serializeError.serializeError)(error)
          }, "request error");
        });
        request.once("response", (response) => {
          log.trace({
            headers: response.headers,
            requestId: currentRequestId,
            statusCode: response.statusCode
          }, "proxying response");
        });
        request.shouldKeepAlive = false;
        const connectionConfiguration = {
          host: configuration.hostname || configuration.host,
          port: configuration.port || 80,
          proxy,
          tls: {}
        };
        if (this.protocol === "https:") {
          connectionConfiguration.tls = {
            ca: configuration.ca,
            cert: configuration.cert,
            ciphers: configuration.ciphers,
            clientCertEngine: configuration.clientCertEngine,
            crl: configuration.crl,
            dhparam: configuration.dhparam,
            ecdhCurve: configuration.ecdhCurve,
            honorCipherOrder: configuration.honorCipherOrder,
            key: configuration.key,
            passphrase: configuration.passphrase,
            pfx: configuration.pfx,
            rejectUnauthorized: configuration.rejectUnauthorized,
            secureOptions: configuration.secureOptions,
            secureProtocol: configuration.secureProtocol,
            servername: configuration.servername || connectionConfiguration.host,
            sessionIdContext: configuration.sessionIdContext
          };
          if (typeof process.env.NODE_TLS_REJECT_UNAUTHORIZED === "string" && (0, _boolean.boolean)(process.env.NODE_TLS_REJECT_UNAUTHORIZED) === false) {
            connectionConfiguration.tls.rejectUnauthorized = false;
          }
        }
        this.createConnection(connectionConfiguration, (error, socket) => {
          log.trace({
            target: connectionConfiguration
          }, "connecting");
          if (socket) {
            socket.setTimeout(this.socketConnectionTimeout, () => {
              socket.destroy();
            });
            socket.once("connect", () => {
              log.trace({
                target: connectionConfiguration
              }, "connected");
              socket.setTimeout(0);
            });
            socket.once("secureConnect", () => {
              log.trace({
                target: connectionConfiguration
              }, "connected (secure)");
              socket.setTimeout(0);
            });
          }
          if (error) {
            request.emit("error", error);
          } else {
            log.debug("created socket");
            socket.on("error", (socketError) => {
              log.error({
                error: (0, _serializeError.serializeError)(socketError)
              }, "socket error");
            });
            request.onSocket(socket);
          }
        });
      }
    };
    var _default = Agent;
    exports2.default = _default;
  }
});

// node_modules/global-agent/dist/classes/HttpProxyAgent.js
var require_HttpProxyAgent = __commonJS({
  "node_modules/global-agent/dist/classes/HttpProxyAgent.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = void 0;
    var _net = _interopRequireDefault(require("net"));
    var _Agent = _interopRequireDefault(require_Agent());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var HttpProxyAgent = class extends _Agent.default {
      // @see https://github.com/sindresorhus/eslint-plugin-unicorn/issues/169#issuecomment-486980290
      // eslint-disable-next-line unicorn/prevent-abbreviations
      constructor(...args) {
        super(...args);
        this.protocol = "http:";
        this.defaultPort = 80;
      }
      createConnection(configuration, callback) {
        const socket = _net.default.connect(configuration.proxy.port, configuration.proxy.hostname);
        callback(null, socket);
      }
    };
    var _default = HttpProxyAgent;
    exports2.default = _default;
  }
});

// node_modules/global-agent/dist/classes/HttpsProxyAgent.js
var require_HttpsProxyAgent = __commonJS({
  "node_modules/global-agent/dist/classes/HttpsProxyAgent.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = void 0;
    var _net = _interopRequireDefault(require("net"));
    var _tls = _interopRequireDefault(require("tls"));
    var _Agent = _interopRequireDefault(require_Agent());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var HttpsProxyAgent = class extends _Agent.default {
      // eslint-disable-next-line unicorn/prevent-abbreviations
      constructor(...args) {
        super(...args);
        this.protocol = "https:";
        this.defaultPort = 443;
      }
      createConnection(configuration, callback) {
        const socket = _net.default.connect(configuration.proxy.port, configuration.proxy.hostname);
        socket.on("error", (error) => {
          callback(error);
        });
        socket.once("data", () => {
          const secureSocket = _tls.default.connect({
            ...configuration.tls,
            socket
          });
          callback(null, secureSocket);
        });
        let connectMessage = "";
        connectMessage += "CONNECT " + configuration.host + ":" + configuration.port + " HTTP/1.1\r\n";
        connectMessage += "Host: " + configuration.host + ":" + configuration.port + "\r\n";
        if (configuration.proxy.authorization) {
          connectMessage += "Proxy-Authorization: Basic " + Buffer.from(configuration.proxy.authorization).toString("base64") + "\r\n";
        }
        connectMessage += "\r\n";
        socket.write(connectMessage);
      }
    };
    var _default = HttpsProxyAgent;
    exports2.default = _default;
  }
});

// node_modules/global-agent/dist/classes/index.js
var require_classes = __commonJS({
  "node_modules/global-agent/dist/classes/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    Object.defineProperty(exports2, "Agent", {
      enumerable: true,
      get: function() {
        return _Agent.default;
      }
    });
    Object.defineProperty(exports2, "HttpProxyAgent", {
      enumerable: true,
      get: function() {
        return _HttpProxyAgent.default;
      }
    });
    Object.defineProperty(exports2, "HttpsProxyAgent", {
      enumerable: true,
      get: function() {
        return _HttpsProxyAgent.default;
      }
    });
    var _Agent = _interopRequireDefault(require_Agent());
    var _HttpProxyAgent = _interopRequireDefault(require_HttpProxyAgent());
    var _HttpsProxyAgent = _interopRequireDefault(require_HttpsProxyAgent());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
  }
});

// node_modules/es6-error/lib/index.js
var require_lib2 = __commonJS({
  "node_modules/es6-error/lib/index.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _possibleConstructorReturn(self2, call) {
      if (!self2) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return call && (typeof call === "object" || typeof call === "function") ? call : self2;
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
      if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }
    function _extendableBuiltin(cls) {
      function ExtendableBuiltin() {
        cls.apply(this, arguments);
      }
      ExtendableBuiltin.prototype = Object.create(cls.prototype, {
        constructor: {
          value: cls,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(ExtendableBuiltin, cls);
      } else {
        ExtendableBuiltin.__proto__ = cls;
      }
      return ExtendableBuiltin;
    }
    var ExtendableError = function(_extendableBuiltin2) {
      _inherits(ExtendableError2, _extendableBuiltin2);
      function ExtendableError2() {
        var message = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
        _classCallCheck(this, ExtendableError2);
        var _this = _possibleConstructorReturn(this, (ExtendableError2.__proto__ || Object.getPrototypeOf(ExtendableError2)).call(this, message));
        Object.defineProperty(_this, "message", {
          configurable: true,
          enumerable: false,
          value: message,
          writable: true
        });
        Object.defineProperty(_this, "name", {
          configurable: true,
          enumerable: false,
          value: _this.constructor.name,
          writable: true
        });
        if (Error.hasOwnProperty("captureStackTrace")) {
          Error.captureStackTrace(_this, _this.constructor);
          return _possibleConstructorReturn(_this);
        }
        Object.defineProperty(_this, "stack", {
          configurable: true,
          enumerable: false,
          value: new Error(message).stack,
          writable: true
        });
        return _this;
      }
      return ExtendableError2;
    }(_extendableBuiltin(Error));
    exports2.default = ExtendableError;
    module2.exports = exports2["default"];
  }
});

// node_modules/global-agent/dist/errors.js
var require_errors = __commonJS({
  "node_modules/global-agent/dist/errors.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.UnexpectedStateError = void 0;
    var _es6Error = _interopRequireDefault(require_lib2());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var UnexpectedStateError = class extends _es6Error.default {
      constructor(message, code = "UNEXPECTED_STATE_ERROR") {
        super(message);
        this.code = code;
      }
    };
    exports2.UnexpectedStateError = UnexpectedStateError;
  }
});

// node_modules/global-agent/dist/utilities/bindHttpMethod.js
var require_bindHttpMethod = __commonJS({
  "node_modules/global-agent/dist/utilities/bindHttpMethod.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = void 0;
    var _http = _interopRequireDefault(require("http"));
    var _https = _interopRequireDefault(require("https"));
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var bindHttpMethod = (originalMethod, agent, forceGlobalAgent) => {
      return (...args) => {
        let url;
        let options;
        let callback;
        if (typeof args[0] === "string" || args[0] instanceof URL) {
          url = args[0];
          if (typeof args[1] === "function") {
            options = {};
            callback = args[1];
          } else {
            options = {
              ...args[1]
            };
            callback = args[2];
          }
        } else {
          options = {
            ...args[0]
          };
          callback = args[1];
        }
        if (forceGlobalAgent) {
          options.agent = agent;
        } else {
          if (!options.agent) {
            options.agent = agent;
          }
          if (options.agent === _http.default.globalAgent || options.agent === _https.default.globalAgent) {
            options.agent = agent;
          }
        }
        if (url) {
          return originalMethod(url, options, callback);
        } else {
          return originalMethod(options, callback);
        }
      };
    };
    var _default = bindHttpMethod;
    exports2.default = _default;
  }
});

// node_modules/escape-string-regexp/index.js
var require_escape_string_regexp = __commonJS({
  "node_modules/escape-string-regexp/index.js"(exports2, module2) {
    "use strict";
    module2.exports = (string) => {
      if (typeof string !== "string") {
        throw new TypeError("Expected a string");
      }
      return string.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
    };
  }
});

// node_modules/matcher/index.js
var require_matcher = __commonJS({
  "node_modules/matcher/index.js"(exports2, module2) {
    "use strict";
    var escapeStringRegexp = require_escape_string_regexp();
    var regexpCache = /* @__PURE__ */ new Map();
    function makeRegexp(pattern, options) {
      options = {
        caseSensitive: false,
        ...options
      };
      const cacheKey = pattern + JSON.stringify(options);
      if (regexpCache.has(cacheKey)) {
        return regexpCache.get(cacheKey);
      }
      const negated = pattern[0] === "!";
      if (negated) {
        pattern = pattern.slice(1);
      }
      pattern = escapeStringRegexp(pattern).replace(/\\\*/g, "[\\s\\S]*");
      const regexp = new RegExp(`^${pattern}$`, options.caseSensitive ? "" : "i");
      regexp.negated = negated;
      regexpCache.set(cacheKey, regexp);
      return regexp;
    }
    module2.exports = (inputs, patterns, options) => {
      if (!(Array.isArray(inputs) && Array.isArray(patterns))) {
        throw new TypeError(`Expected two arrays, got ${typeof inputs} ${typeof patterns}`);
      }
      if (patterns.length === 0) {
        return inputs;
      }
      const isFirstPatternNegated = patterns[0][0] === "!";
      patterns = patterns.map((pattern) => makeRegexp(pattern, options));
      const result = [];
      for (const input of inputs) {
        let matches = isFirstPatternNegated;
        for (const pattern of patterns) {
          if (pattern.test(input)) {
            matches = !pattern.negated;
          }
        }
        if (matches) {
          result.push(input);
        }
      }
      return result;
    };
    module2.exports.isMatch = (input, pattern, options) => {
      const inputArray = Array.isArray(input) ? input : [input];
      const patternArray = Array.isArray(pattern) ? pattern : [pattern];
      return inputArray.some((input2) => {
        return patternArray.every((pattern2) => {
          const regexp = makeRegexp(pattern2, options);
          const matches = regexp.test(input2);
          return regexp.negated ? !matches : matches;
        });
      });
    };
  }
});

// node_modules/global-agent/dist/utilities/isUrlMatchingNoProxy.js
var require_isUrlMatchingNoProxy = __commonJS({
  "node_modules/global-agent/dist/utilities/isUrlMatchingNoProxy.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = void 0;
    var _url = require("url");
    var _matcher = _interopRequireDefault(require_matcher());
    var _errors = require_errors();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var isUrlMatchingNoProxy = (subjectUrl, noProxy) => {
      const subjectUrlTokens = (0, _url.parse)(subjectUrl);
      const rules = noProxy.split(/[\s,]+/);
      for (const rule of rules) {
        const ruleMatch = rule.replace(/^(?<leadingDot>\.)/, "*").match(/^(?<hostname>.+?)(?::(?<port>\d+))?$/);
        if (!ruleMatch || !ruleMatch.groups) {
          throw new _errors.UnexpectedStateError("Invalid NO_PROXY pattern.");
        }
        if (!ruleMatch.groups.hostname) {
          throw new _errors.UnexpectedStateError("NO_PROXY entry pattern must include hostname. Use * to match any hostname.");
        }
        const hostnameIsMatch = _matcher.default.isMatch(subjectUrlTokens.hostname, ruleMatch.groups.hostname);
        if (hostnameIsMatch && (!ruleMatch.groups || !ruleMatch.groups.port || subjectUrlTokens.port && subjectUrlTokens.port === ruleMatch.groups.port)) {
          return true;
        }
      }
      return false;
    };
    var _default = isUrlMatchingNoProxy;
    exports2.default = _default;
  }
});

// node_modules/global-agent/dist/utilities/parseProxyUrl.js
var require_parseProxyUrl = __commonJS({
  "node_modules/global-agent/dist/utilities/parseProxyUrl.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = void 0;
    var _url = require("url");
    var _errors = require_errors();
    var parseProxyUrl = (url) => {
      const urlTokens = (0, _url.parse)(url);
      if (urlTokens.query !== null) {
        throw new _errors.UnexpectedStateError("Unsupported `GLOBAL_AGENT.HTTP_PROXY` configuration value: URL must not have query.");
      }
      if (urlTokens.hash !== null) {
        throw new _errors.UnexpectedStateError("Unsupported `GLOBAL_AGENT.HTTP_PROXY` configuration value: URL must not have hash.");
      }
      if (urlTokens.protocol !== "http:") {
        throw new _errors.UnexpectedStateError('Unsupported `GLOBAL_AGENT.HTTP_PROXY` configuration value: URL protocol must be "http:".');
      }
      let port = 80;
      if (urlTokens.port) {
        port = Number.parseInt(urlTokens.port, 10);
      }
      return {
        authorization: urlTokens.auth || null,
        hostname: urlTokens.hostname,
        port
      };
    };
    var _default = parseProxyUrl;
    exports2.default = _default;
  }
});

// node_modules/global-agent/dist/utilities/index.js
var require_utilities = __commonJS({
  "node_modules/global-agent/dist/utilities/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    Object.defineProperty(exports2, "bindHttpMethod", {
      enumerable: true,
      get: function() {
        return _bindHttpMethod.default;
      }
    });
    Object.defineProperty(exports2, "isUrlMatchingNoProxy", {
      enumerable: true,
      get: function() {
        return _isUrlMatchingNoProxy.default;
      }
    });
    Object.defineProperty(exports2, "parseProxyUrl", {
      enumerable: true,
      get: function() {
        return _parseProxyUrl.default;
      }
    });
    var _bindHttpMethod = _interopRequireDefault(require_bindHttpMethod());
    var _isUrlMatchingNoProxy = _interopRequireDefault(require_isUrlMatchingNoProxy());
    var _parseProxyUrl = _interopRequireDefault(require_parseProxyUrl());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
  }
});

// node_modules/global-agent/dist/factories/createProxyController.js
var require_createProxyController = __commonJS({
  "node_modules/global-agent/dist/factories/createProxyController.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = void 0;
    var _Logger = _interopRequireDefault(require_Logger());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var log = _Logger.default.child({
      namespace: "createProxyController"
    });
    var KNOWN_PROPERTY_NAMES = ["HTTP_PROXY", "HTTPS_PROXY", "NO_PROXY"];
    var createProxyController = () => {
      return new Proxy({
        HTTP_PROXY: null,
        HTTPS_PROXY: null,
        NO_PROXY: null
      }, {
        set: (subject, name, value) => {
          if (!KNOWN_PROPERTY_NAMES.includes(name)) {
            throw new Error('Cannot set an unmapped property "' + name + '".');
          }
          subject[name] = value;
          log.info({
            change: {
              name,
              value
            },
            newConfiguration: subject
          }, "configuration changed");
          return true;
        }
      });
    };
    var _default = createProxyController;
    exports2.default = _default;
  }
});

// node_modules/global-agent/dist/factories/createGlobalProxyAgent.js
var require_createGlobalProxyAgent = __commonJS({
  "node_modules/global-agent/dist/factories/createGlobalProxyAgent.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = void 0;
    var _http = _interopRequireDefault(require("http"));
    var _https = _interopRequireDefault(require("https"));
    var _boolean = require_lib();
    var _semver = _interopRequireDefault(require_semver2());
    var _Logger = _interopRequireDefault(require_Logger());
    var _classes = require_classes();
    var _errors = require_errors();
    var _utilities = require_utilities();
    var _createProxyController = _interopRequireDefault(require_createProxyController());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var httpGet = _http.default.get;
    var httpRequest = _http.default.request;
    var httpsGet = _https.default.get;
    var httpsRequest = _https.default.request;
    var log = _Logger.default.child({
      namespace: "createGlobalProxyAgent"
    });
    var defaultConfigurationInput = {
      environmentVariableNamespace: void 0,
      forceGlobalAgent: void 0,
      socketConnectionTimeout: 6e4
    };
    var omitUndefined = (subject) => {
      const keys = Object.keys(subject);
      const result = {};
      for (const key of keys) {
        const value = subject[key];
        if (value !== void 0) {
          result[key] = value;
        }
      }
      return result;
    };
    var createConfiguration = (configurationInput) => {
      const environment = process.env;
      const defaultConfiguration = {
        environmentVariableNamespace: typeof environment.GLOBAL_AGENT_ENVIRONMENT_VARIABLE_NAMESPACE === "string" ? environment.GLOBAL_AGENT_ENVIRONMENT_VARIABLE_NAMESPACE : "GLOBAL_AGENT_",
        forceGlobalAgent: typeof environment.GLOBAL_AGENT_FORCE_GLOBAL_AGENT === "string" ? (0, _boolean.boolean)(environment.GLOBAL_AGENT_FORCE_GLOBAL_AGENT) : true,
        socketConnectionTimeout: typeof environment.GLOBAL_AGENT_SOCKET_CONNECTION_TIMEOUT === "string" ? Number.parseInt(environment.GLOBAL_AGENT_SOCKET_CONNECTION_TIMEOUT, 10) : defaultConfigurationInput.socketConnectionTimeout
      };
      return {
        ...defaultConfiguration,
        ...omitUndefined(configurationInput)
      };
    };
    var createGlobalProxyAgent = (configurationInput = defaultConfigurationInput) => {
      const configuration = createConfiguration(configurationInput);
      const proxyController = (0, _createProxyController.default)();
      proxyController.HTTP_PROXY = process.env[configuration.environmentVariableNamespace + "HTTP_PROXY"] || null;
      proxyController.HTTPS_PROXY = process.env[configuration.environmentVariableNamespace + "HTTPS_PROXY"] || null;
      proxyController.NO_PROXY = process.env[configuration.environmentVariableNamespace + "NO_PROXY"] || null;
      log.info({
        configuration,
        state: proxyController
      }, "global agent has been initialized");
      const mustUrlUseProxy = (getProxy) => {
        return (url) => {
          if (!getProxy()) {
            return false;
          }
          if (!proxyController.NO_PROXY) {
            return true;
          }
          return !(0, _utilities.isUrlMatchingNoProxy)(url, proxyController.NO_PROXY);
        };
      };
      const getUrlProxy = (getProxy) => {
        return () => {
          const proxy = getProxy();
          if (!proxy) {
            throw new _errors.UnexpectedStateError("HTTP(S) proxy must be configured.");
          }
          return (0, _utilities.parseProxyUrl)(proxy);
        };
      };
      const getHttpProxy = () => {
        return proxyController.HTTP_PROXY;
      };
      const BoundHttpProxyAgent = class extends _classes.HttpProxyAgent {
        constructor() {
          super(() => {
            return getHttpProxy();
          }, mustUrlUseProxy(getHttpProxy), getUrlProxy(getHttpProxy), _http.default.globalAgent, configuration.socketConnectionTimeout);
        }
      };
      const httpAgent = new BoundHttpProxyAgent();
      const getHttpsProxy = () => {
        return proxyController.HTTPS_PROXY || proxyController.HTTP_PROXY;
      };
      const BoundHttpsProxyAgent = class extends _classes.HttpsProxyAgent {
        constructor() {
          super(() => {
            return getHttpsProxy();
          }, mustUrlUseProxy(getHttpsProxy), getUrlProxy(getHttpsProxy), _https.default.globalAgent, configuration.socketConnectionTimeout);
        }
      };
      const httpsAgent = new BoundHttpsProxyAgent();
      if (_semver.default.gte(process.version, "v11.7.0")) {
        _http.default.globalAgent = httpAgent;
        _https.default.globalAgent = httpsAgent;
      }
      if (_semver.default.gte(process.version, "v10.0.0")) {
        _http.default.get = (0, _utilities.bindHttpMethod)(httpGet, httpAgent, configuration.forceGlobalAgent);
        _http.default.request = (0, _utilities.bindHttpMethod)(httpRequest, httpAgent, configuration.forceGlobalAgent);
        _https.default.get = (0, _utilities.bindHttpMethod)(httpsGet, httpsAgent, configuration.forceGlobalAgent);
        _https.default.request = (0, _utilities.bindHttpMethod)(httpsRequest, httpsAgent, configuration.forceGlobalAgent);
      } else {
        log.warn("attempt to initialize global-agent in unsupported Node.js version was ignored");
      }
      return proxyController;
    };
    var _default = createGlobalProxyAgent;
    exports2.default = _default;
  }
});

// node_modules/global-agent/dist/factories/index.js
var require_factories2 = __commonJS({
  "node_modules/global-agent/dist/factories/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    Object.defineProperty(exports2, "createGlobalProxyAgent", {
      enumerable: true,
      get: function() {
        return _createGlobalProxyAgent.default;
      }
    });
    Object.defineProperty(exports2, "createProxyController", {
      enumerable: true,
      get: function() {
        return _createProxyController.default;
      }
    });
    var _createGlobalProxyAgent = _interopRequireDefault(require_createGlobalProxyAgent());
    var _createProxyController = _interopRequireDefault(require_createProxyController());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
  }
});

// node_modules/global-agent/dist/routines/bootstrap.js
var require_bootstrap = __commonJS({
  "node_modules/global-agent/dist/routines/bootstrap.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    exports2.default = void 0;
    var _Logger = _interopRequireDefault(require_Logger());
    var _factories = require_factories2();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var log = _Logger.default.child({
      namespace: "bootstrap"
    });
    var bootstrap = (configurationInput) => {
      if (global.GLOBAL_AGENT) {
        log.warn("found global.GLOBAL_AGENT; second attempt to bootstrap global-agent was ignored");
        return false;
      }
      global.GLOBAL_AGENT = (0, _factories.createGlobalProxyAgent)(configurationInput);
      return true;
    };
    var _default = bootstrap;
    exports2.default = _default;
  }
});

// node_modules/global-agent/dist/routines/index.js
var require_routines = __commonJS({
  "node_modules/global-agent/dist/routines/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    Object.defineProperty(exports2, "bootstrap", {
      enumerable: true,
      get: function() {
        return _bootstrap.default;
      }
    });
    var _bootstrap = _interopRequireDefault(require_bootstrap());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
  }
});

// node_modules/global-agent/dist/index.js
var require_dist3 = __commonJS({
  "node_modules/global-agent/dist/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    Object.defineProperty(exports2, "bootstrap", {
      enumerable: true,
      get: function() {
        return _routines.bootstrap;
      }
    });
    Object.defineProperty(exports2, "createGlobalProxyAgent", {
      enumerable: true,
      get: function() {
        return _factories.createGlobalProxyAgent;
      }
    });
    var _routines = require_routines();
    var _factories = require_factories2();
  }
});

// node_modules/global-agent/bootstrap.js
var require_bootstrap2 = __commonJS({
  "node_modules/global-agent/bootstrap.js"() {
    require_dist3().bootstrap();
  }
});

// scripts/ccr-test.ts
var import_fs = __toESM(require("fs"));
var import_path = __toESM(require("path"));
var import_process = __toESM(require("process"));
var CONFIG_PATH = import_path.default.join(require("os").homedir(), ".claude-code-router", "config.json");
function loadConfig() {
  console.log(`[DEBUG] Loading config from: ${CONFIG_PATH}`);
  if (!import_fs.default.existsSync(CONFIG_PATH)) {
    console.error(`Config file not found: ${CONFIG_PATH}`);
    import_process.default.exit(1);
  }
  const configContent = import_fs.default.readFileSync(CONFIG_PATH, "utf-8");
  console.log(`[DEBUG] Config file size: ${configContent.length} bytes`);
  const config = JSON.parse(configContent);
  console.log(`[DEBUG] Config loaded successfully. PROXY_URL in config: ${config.PROXY_URL || "NOT_SET"}`);
  return config;
}
function getApiKeys(provider) {
  if (provider.api_keys) {
    return provider.api_keys.map((k) => typeof k === "string" ? k : k.key);
  }
  if (provider.api_key) {
    return [provider.api_key];
  }
  return [];
}
function getTestEndpoint(provider, model) {
  if (provider.api_base_url.includes("openai") || provider.api_base_url.includes("deepseek") || provider.api_base_url.includes("openrouter")) {
    return {
      url: provider.api_base_url.replace(/\/$/, "") + "/chat/completions",
      method: "POST",
      body: JSON.stringify({ model, messages: [{ role: "user", content: "ping" }] }),
      headers: { "Content-Type": "application/json" }
    };
  } else if (provider.api_base_url.includes("generativelanguage.googleapis.com")) {
    return {
      url: provider.api_base_url.replace(/\/$/, "") + `/${model}:generateContent`,
      method: "POST",
      body: JSON.stringify({ contents: [{ parts: [{ text: "ping" }] }] }),
      headers: { "Content-Type": "application/json" }
    };
  } else {
    return {
      url: provider.api_base_url.replace(/\/$/, "") + "/v1/models",
      method: "GET",
      headers: {}
    };
  }
}
async function testProviderModelKey(provider, model, apiKey, agent) {
  const { url, method, body, headers } = getTestEndpoint(provider, model);
  if (provider.api_base_url.includes("openai") || provider.api_base_url.includes("deepseek") || provider.api_base_url.includes("openrouter")) {
    headers["Authorization"] = `Bearer ${apiKey}`;
  } else if (provider.api_base_url.includes("generativelanguage.googleapis.com")) {
    headers["x-goog-api-key"] = apiKey;
  } else {
    headers["Authorization"] = `Bearer ${apiKey}`;
  }
  console.log(`[DEBUG] Testing ${provider.name}/${model} with key ${apiKey.slice(0, 8)}...`);
  console.log(`[DEBUG] Request URL: ${url}`);
  console.log(`[DEBUG] Request method: ${method}`);
  console.log(`[DEBUG] Request headers: ${JSON.stringify(headers)}`);
  console.log(`[DEBUG] Request body: ${body || "NO_BODY"}`);
  console.log(`[DEBUG] Agent configured: ${agent ? "YES" : "NO"}`);
  if (agent) {
    console.log(`[DEBUG] Agent type: ${agent.constructor.name}`);
    console.log(`[DEBUG] Agent proxy: ${agent.proxy || agent.uri || "UNKNOWN"}`);
  }
  const start = Date.now();
  try {
    const fetchOptions = { method, headers };
    if (body) fetchOptions.body = body;
    if (agent) fetchOptions.agent = agent;
    console.log(`[DEBUG] Final fetch options: ${JSON.stringify(fetchOptions, null, 2)}`);
    console.log(`[DEBUG] Making fetch request with node-fetch...`);
    let fetch2;
    try {
      fetch2 = (init_src(), __toCommonJS(src_exports));
      console.log(`[DEBUG] Using node-fetch (supports agent parameter)`);
    } catch (nodeFetchError) {
      console.error(`[ERROR] node-fetch not available, falling back to global fetch (may not support proxy)`);
      fetch2 = globalThis.fetch;
    }
    const res = await fetch2(url, fetchOptions);
    const text = await res.text();
    let json = null;
    try {
      json = JSON.parse(text);
    } catch {
    }
    if (res.ok) {
      console.log(`[SUCCESS] Provider: ${provider.name} | Model: ${model} | Key: ${apiKey.slice(0, 8)}... | ${res.status} ${res.statusText} (${Date.now() - start}ms)`);
    } else {
      console.error(`[FAIL] Provider: ${provider.name} | Model: ${model} | Key: ${apiKey.slice(0, 8)}... | ${res.status} ${res.statusText}`);
      console.error(`  URL: ${url}`);
      console.error(`  Request: ${body || ""}`);
      console.error(`  Response: ${text}`);
    }
    return { ok: res.ok, status: res.status, statusText: res.statusText, json, text };
  } catch (err) {
    console.error(`[ERROR] Provider: ${provider.name} | Model: ${model} | Key: ${apiKey.slice(0, 8)}...`);
    console.error(`  URL: ${url}`);
    console.error(`  Request: ${body || ""}`);
    console.error(`  Error name: ${err.name}`);
    console.error(`  Error message: ${err.message}`);
    console.error(`  Error code: ${err.code || "NO_CODE"}`);
    console.error(`  Error cause: ${err.cause || "NO_CAUSE"}`);
    console.error(`  Full error: ${err.stack || err}`);
    return { ok: false, error: err };
  }
}
async function main() {
  console.log(`[DEBUG] === Claude Code Router Test Script Debug Mode ===`);
  console.log(`[DEBUG] Node.js version: ${import_process.default.version}`);
  console.log(`[DEBUG] Platform: ${import_process.default.platform}`);
  console.log(`[DEBUG] Architecture: ${import_process.default.arch}`);
  const config = loadConfig();
  console.log(`[DEBUG] Environment variables before processing:`);
  console.log(`[DEBUG] process.env.PROXY_URL = ${import_process.default.env.PROXY_URL || "NOT_SET"}`);
  console.log(`[DEBUG] process.env.HTTPS_PROXY = ${import_process.default.env.HTTPS_PROXY || "NOT_SET"}`);
  console.log(`[DEBUG] process.env.HTTP_PROXY = ${import_process.default.env.HTTP_PROXY || "NOT_SET"}`);
  if (config.PROXY_URL && !import_process.default.env.PROXY_URL) {
    import_process.default.env.PROXY_URL = config.PROXY_URL;
    console.log(`[INFO] Set PROXY_URL from config: ${config.PROXY_URL}`);
  }
  console.log(`[DEBUG] Environment variables after processing:`);
  console.log(`[DEBUG] process.env.PROXY_URL = ${import_process.default.env.PROXY_URL || "NOT_SET"}`);
  const providers = config.Providers || config.providers || [];
  console.log(`[DEBUG] Found ${providers.length} providers`);
  if (providers.length === 0) {
    console.error("No Providers found in config.json");
    import_process.default.exit(1);
  }
  let agent = void 0;
  if (import_process.default.env.PROXY_URL) {
    console.log(`[DEBUG] Proxy URL detected: ${import_process.default.env.PROXY_URL}`);
    if (import_process.default.env.PROXY_URL.startsWith("socks")) {
      console.log(`[DEBUG] Creating SocksProxyAgent...`);
      try {
        const { SocksProxyAgent } = require_dist2();
        agent = new SocksProxyAgent(import_process.default.env.PROXY_URL);
        console.log(`[INFO] socks-proxy-agent enabled, proxy: ${import_process.default.env.PROXY_URL}`);
        console.log(`[DEBUG] SocksProxyAgent created successfully`);
        console.log(`[DEBUG] Agent proxy config: ${agent.proxy || agent.uri || "UNKNOWN"}`);
      } catch (socksError) {
        console.error(`[ERROR] Failed to create SocksProxyAgent: ${socksError.message}`);
        console.error(`[ERROR] Make sure socks-proxy-agent is installed: npm install socks-proxy-agent`);
      }
    } else {
      console.log(`[DEBUG] Using global-agent for HTTP proxy...`);
      try {
        import_process.default.env.GLOBAL_AGENT_HTTP_PROXY = import_process.default.env.PROXY_URL;
        require_bootstrap2();
        console.log(`[INFO] global-agent enabled, proxy: ${import_process.default.env.PROXY_URL}`);
      } catch (globalAgentError) {
        console.error(`[ERROR] Failed to setup global-agent: ${globalAgentError.message}`);
      }
    }
  } else {
    console.log(`[DEBUG] No proxy configured`);
  }
  for (const provider of providers) {
    console.log(`[DEBUG] Processing provider: ${provider.name}`);
    const apiKeys = getApiKeys(provider);
    console.log(`[DEBUG] Provider ${provider.name} has ${apiKeys.length} API keys`);
    if (!apiKeys.length) {
      console.warn(`Provider ${provider.name} has no API keys, skipped.`);
      continue;
    }
    for (const model of provider.models) {
      console.log(`[DEBUG] Testing model: ${model}`);
      for (const apiKey of apiKeys) {
        await testProviderModelKey(provider, model, apiKey, agent);
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    }
  }
}
main().catch((e2) => {
  console.error("Fatal error:", e2);
  import_process.default.exit(1);
});
/*! Bundled license information:

web-streams-polyfill/dist/ponyfill.es2018.js:
  (**
   * @license
   * web-streams-polyfill v3.3.3
   * Copyright 2024 Mattias Buelens, Diwank Singh Tomer and other contributors.
   * This code is released under the MIT license.
   * SPDX-License-Identifier: MIT
   *)

fetch-blob/index.js:
  (*! fetch-blob. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> *)

formdata-polyfill/esm.min.js:
  (*! formdata-polyfill. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> *)

node-domexception/index.js:
  (*! node-domexception. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> *)
*/
