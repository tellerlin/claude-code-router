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
        for (let i = this._readOffset; i < this.length; i++) {
          if (this._buff[i] === 0) {
            nullPos = i;
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
        for (let i = this._readOffset; i < this.length; i++) {
          if (this._buff[i] === 0) {
            nullPos = i;
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
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
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
      function am1(i, x, w, j, c, n) {
        while (--n >= 0) {
          var v = x * this[i++] + w[j] + c;
          c = Math.floor(v / 67108864);
          w[j++] = v & 67108863;
        }
        return c;
      }
      function am2(i, x, w, j, c, n) {
        var xl = x & 32767, xh = x >> 15;
        while (--n >= 0) {
          var l = this[i] & 32767;
          var h = this[i++] >> 15;
          var m = xh * l + h * xl;
          l = xl * l + ((m & 32767) << 15) + w[j] + (c & 1073741823);
          c = (l >>> 30) + (m >>> 15) + xh * h + (c >>> 30);
          w[j++] = l & 1073741823;
        }
        return c;
      }
      function am3(i, x, w, j, c, n) {
        var xl = x & 16383, xh = x >> 14;
        while (--n >= 0) {
          var l = this[i] & 16383;
          var h = this[i++] >> 14;
          var m = xh * l + h * xl;
          l = xl * l + ((m & 16383) << 14) + w[j] + c;
          c = (l >> 28) + (m >> 14) + xh * h;
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
      function intAt(s, i) {
        var c = BI_RC[s.charCodeAt(i)];
        return c == null ? -1 : c;
      }
      function bnpCopyTo(r) {
        for (var i = this.t - 1; i >= 0; --i) r[i] = this[i];
        r.t = this.t;
        r.s = this.s;
      }
      function bnpFromInt(x) {
        this.t = 1;
        this.s = x < 0 ? -1 : 0;
        if (x > 0) this[0] = x;
        else if (x < -1) this[0] = x + this.DV;
        else this.t = 0;
      }
      function nbv(i) {
        var r = nbi();
        r.fromInt(i);
        return r;
      }
      function bnpFromString(s, b) {
        var k;
        if (b == 16) k = 4;
        else if (b == 8) k = 3;
        else if (b == 256) k = 8;
        else if (b == 2) k = 1;
        else if (b == 32) k = 5;
        else if (b == 4) k = 2;
        else {
          this.fromRadix(s, b);
          return;
        }
        this.t = 0;
        this.s = 0;
        var i = s.length, mi = false, sh = 0;
        while (--i >= 0) {
          var x = k == 8 ? s[i] & 255 : intAt(s, i);
          if (x < 0) {
            if (s.charAt(i) == "-") mi = true;
            continue;
          }
          mi = false;
          if (sh == 0)
            this[this.t++] = x;
          else if (sh + k > this.DB) {
            this[this.t - 1] |= (x & (1 << this.DB - sh) - 1) << sh;
            this[this.t++] = x >> this.DB - sh;
          } else
            this[this.t - 1] |= x << sh;
          sh += k;
          if (sh >= this.DB) sh -= this.DB;
        }
        if (k == 8 && (s[0] & 128) != 0) {
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
        var km = (1 << k) - 1, d, m = false, r = "", i = this.t;
        var p = this.DB - i * this.DB % k;
        if (i-- > 0) {
          if (p < this.DB && (d = this[i] >> p) > 0) {
            m = true;
            r = int2char(d);
          }
          while (i >= 0) {
            if (p < k) {
              d = (this[i] & (1 << p) - 1) << k - p;
              d |= this[--i] >> (p += this.DB - k);
            } else {
              d = this[i] >> (p -= k) & km;
              if (p <= 0) {
                p += this.DB;
                --i;
              }
            }
            if (d > 0) m = true;
            if (m) r += int2char(d);
          }
        }
        return m ? r : "0";
      }
      function bnNegate() {
        var r = nbi();
        BigInteger.ZERO.subTo(this, r);
        return r;
      }
      function bnAbs() {
        return this.s < 0 ? this.negate() : this;
      }
      function bnCompareTo(a) {
        var r = this.s - a.s;
        if (r != 0) return r;
        var i = this.t;
        r = i - a.t;
        if (r != 0) return this.s < 0 ? -r : r;
        while (--i >= 0) if ((r = this[i] - a[i]) != 0) return r;
        return 0;
      }
      function nbits(x) {
        var r = 1, t2;
        if ((t2 = x >>> 16) != 0) {
          x = t2;
          r += 16;
        }
        if ((t2 = x >> 8) != 0) {
          x = t2;
          r += 8;
        }
        if ((t2 = x >> 4) != 0) {
          x = t2;
          r += 4;
        }
        if ((t2 = x >> 2) != 0) {
          x = t2;
          r += 2;
        }
        if ((t2 = x >> 1) != 0) {
          x = t2;
          r += 1;
        }
        return r;
      }
      function bnBitLength() {
        if (this.t <= 0) return 0;
        return this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ this.s & this.DM);
      }
      function bnpDLShiftTo(n, r) {
        var i;
        for (i = this.t - 1; i >= 0; --i) r[i + n] = this[i];
        for (i = n - 1; i >= 0; --i) r[i] = 0;
        r.t = this.t + n;
        r.s = this.s;
      }
      function bnpDRShiftTo(n, r) {
        for (var i = n; i < this.t; ++i) r[i - n] = this[i];
        r.t = Math.max(this.t - n, 0);
        r.s = this.s;
      }
      function bnpLShiftTo(n, r) {
        var bs = n % this.DB;
        var cbs = this.DB - bs;
        var bm = (1 << cbs) - 1;
        var ds = Math.floor(n / this.DB), c = this.s << bs & this.DM, i;
        for (i = this.t - 1; i >= 0; --i) {
          r[i + ds + 1] = this[i] >> cbs | c;
          c = (this[i] & bm) << bs;
        }
        for (i = ds - 1; i >= 0; --i) r[i] = 0;
        r[ds] = c;
        r.t = this.t + ds + 1;
        r.s = this.s;
        r.clamp();
      }
      function bnpRShiftTo(n, r) {
        r.s = this.s;
        var ds = Math.floor(n / this.DB);
        if (ds >= this.t) {
          r.t = 0;
          return;
        }
        var bs = n % this.DB;
        var cbs = this.DB - bs;
        var bm = (1 << bs) - 1;
        r[0] = this[ds] >> bs;
        for (var i = ds + 1; i < this.t; ++i) {
          r[i - ds - 1] |= (this[i] & bm) << cbs;
          r[i - ds] = this[i] >> bs;
        }
        if (bs > 0) r[this.t - ds - 1] |= (this.s & bm) << cbs;
        r.t = this.t - ds;
        r.clamp();
      }
      function bnpSubTo(a, r) {
        var i = 0, c = 0, m = Math.min(a.t, this.t);
        while (i < m) {
          c += this[i] - a[i];
          r[i++] = c & this.DM;
          c >>= this.DB;
        }
        if (a.t < this.t) {
          c -= a.s;
          while (i < this.t) {
            c += this[i];
            r[i++] = c & this.DM;
            c >>= this.DB;
          }
          c += this.s;
        } else {
          c += this.s;
          while (i < a.t) {
            c -= a[i];
            r[i++] = c & this.DM;
            c >>= this.DB;
          }
          c -= a.s;
        }
        r.s = c < 0 ? -1 : 0;
        if (c < -1) r[i++] = this.DV + c;
        else if (c > 0) r[i++] = c;
        r.t = i;
        r.clamp();
      }
      function bnpMultiplyTo(a, r) {
        var x = this.abs(), y = a.abs();
        var i = x.t;
        r.t = i + y.t;
        while (--i >= 0) r[i] = 0;
        for (i = 0; i < y.t; ++i) r[i + x.t] = x.am(0, y[i], r, i, 0, x.t);
        r.s = 0;
        r.clamp();
        if (this.s != a.s) BigInteger.ZERO.subTo(r, r);
      }
      function bnpSquareTo(r) {
        var x = this.abs();
        var i = r.t = 2 * x.t;
        while (--i >= 0) r[i] = 0;
        for (i = 0; i < x.t - 1; ++i) {
          var c = x.am(i, x[i], r, 2 * i, 0, 1);
          if ((r[i + x.t] += x.am(i + 1, 2 * x[i], r, 2 * i + 1, c, x.t - i - 1)) >= x.DV) {
            r[i + x.t] -= x.DV;
            r[i + x.t + 1] = 1;
          }
        }
        if (r.t > 0) r[r.t - 1] += x.am(i, x[i], r, 2 * i, 0, 1);
        r.s = 0;
        r.clamp();
      }
      function bnpDivRemTo(m, q, r) {
        var pm = m.abs();
        if (pm.t <= 0) return;
        var pt = this.abs();
        if (pt.t < pm.t) {
          if (q != null) q.fromInt(0);
          if (r != null) this.copyTo(r);
          return;
        }
        if (r == null) r = nbi();
        var y = nbi(), ts = this.s, ms = m.s;
        var nsh = this.DB - nbits(pm[pm.t - 1]);
        if (nsh > 0) {
          pm.lShiftTo(nsh, y);
          pt.lShiftTo(nsh, r);
        } else {
          pm.copyTo(y);
          pt.copyTo(r);
        }
        var ys = y.t;
        var y0 = y[ys - 1];
        if (y0 == 0) return;
        var yt = y0 * (1 << this.F1) + (ys > 1 ? y[ys - 2] >> this.F2 : 0);
        var d1 = this.FV / yt, d2 = (1 << this.F1) / yt, e = 1 << this.F2;
        var i = r.t, j = i - ys, t2 = q == null ? nbi() : q;
        y.dlShiftTo(j, t2);
        if (r.compareTo(t2) >= 0) {
          r[r.t++] = 1;
          r.subTo(t2, r);
        }
        BigInteger.ONE.dlShiftTo(ys, t2);
        t2.subTo(y, y);
        while (y.t < ys) y[y.t++] = 0;
        while (--j >= 0) {
          var qd = r[--i] == y0 ? this.DM : Math.floor(r[i] * d1 + (r[i - 1] + e) * d2);
          if ((r[i] += y.am(0, qd, r, j, 0, ys)) < qd) {
            y.dlShiftTo(j, t2);
            r.subTo(t2, r);
            while (r[i] < --qd) r.subTo(t2, r);
          }
        }
        if (q != null) {
          r.drShiftTo(ys, q);
          if (ts != ms) BigInteger.ZERO.subTo(q, q);
        }
        r.t = ys;
        r.clamp();
        if (nsh > 0) r.rShiftTo(nsh, r);
        if (ts < 0) BigInteger.ZERO.subTo(r, r);
      }
      function bnMod(a) {
        var r = nbi();
        this.abs().divRemTo(a, null, r);
        if (this.s < 0 && r.compareTo(BigInteger.ZERO) > 0) a.subTo(r, r);
        return r;
      }
      function Classic(m) {
        this.m = m;
      }
      function cConvert(x) {
        if (x.s < 0 || x.compareTo(this.m) >= 0) return x.mod(this.m);
        else return x;
      }
      function cRevert(x) {
        return x;
      }
      function cReduce(x) {
        x.divRemTo(this.m, null, x);
      }
      function cMulTo(x, y, r) {
        x.multiplyTo(y, r);
        this.reduce(r);
      }
      function cSqrTo(x, r) {
        x.squareTo(r);
        this.reduce(r);
      }
      Classic.prototype.convert = cConvert;
      Classic.prototype.revert = cRevert;
      Classic.prototype.reduce = cReduce;
      Classic.prototype.mulTo = cMulTo;
      Classic.prototype.sqrTo = cSqrTo;
      function bnpInvDigit() {
        if (this.t < 1) return 0;
        var x = this[0];
        if ((x & 1) == 0) return 0;
        var y = x & 3;
        y = y * (2 - (x & 15) * y) & 15;
        y = y * (2 - (x & 255) * y) & 255;
        y = y * (2 - ((x & 65535) * y & 65535)) & 65535;
        y = y * (2 - x * y % this.DV) % this.DV;
        return y > 0 ? this.DV - y : -y;
      }
      function Montgomery(m) {
        this.m = m;
        this.mp = m.invDigit();
        this.mpl = this.mp & 32767;
        this.mph = this.mp >> 15;
        this.um = (1 << m.DB - 15) - 1;
        this.mt2 = 2 * m.t;
      }
      function montConvert(x) {
        var r = nbi();
        x.abs().dlShiftTo(this.m.t, r);
        r.divRemTo(this.m, null, r);
        if (x.s < 0 && r.compareTo(BigInteger.ZERO) > 0) this.m.subTo(r, r);
        return r;
      }
      function montRevert(x) {
        var r = nbi();
        x.copyTo(r);
        this.reduce(r);
        return r;
      }
      function montReduce(x) {
        while (x.t <= this.mt2)
          x[x.t++] = 0;
        for (var i = 0; i < this.m.t; ++i) {
          var j = x[i] & 32767;
          var u0 = j * this.mpl + ((j * this.mph + (x[i] >> 15) * this.mpl & this.um) << 15) & x.DM;
          j = i + this.m.t;
          x[j] += this.m.am(0, u0, x, i, 0, this.m.t);
          while (x[j] >= x.DV) {
            x[j] -= x.DV;
            x[++j]++;
          }
        }
        x.clamp();
        x.drShiftTo(this.m.t, x);
        if (x.compareTo(this.m) >= 0) x.subTo(this.m, x);
      }
      function montSqrTo(x, r) {
        x.squareTo(r);
        this.reduce(r);
      }
      function montMulTo(x, y, r) {
        x.multiplyTo(y, r);
        this.reduce(r);
      }
      Montgomery.prototype.convert = montConvert;
      Montgomery.prototype.revert = montRevert;
      Montgomery.prototype.reduce = montReduce;
      Montgomery.prototype.mulTo = montMulTo;
      Montgomery.prototype.sqrTo = montSqrTo;
      function bnpIsEven() {
        return (this.t > 0 ? this[0] & 1 : this.s) == 0;
      }
      function bnpExp(e, z2) {
        if (e > 4294967295 || e < 1) return BigInteger.ONE;
        var r = nbi(), r2 = nbi(), g = z2.convert(this), i = nbits(e) - 1;
        g.copyTo(r);
        while (--i >= 0) {
          z2.sqrTo(r, r2);
          if ((e & 1 << i) > 0) z2.mulTo(r2, g, r);
          else {
            var t2 = r;
            r = r2;
            r2 = t2;
          }
        }
        return z2.revert(r);
      }
      function bnModPowInt(e, m) {
        var z2;
        if (e < 256 || m.isEven()) z2 = new Classic(m);
        else z2 = new Montgomery(m);
        return this.exp(e, z2);
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
        var r = nbi();
        this.copyTo(r);
        return r;
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
      function bnpChunkSize(r) {
        return Math.floor(Math.LN2 * this.DB / Math.log(r));
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
        var d = nbv(a), y = nbi(), z2 = nbi(), r = "";
        this.divRemTo(d, y, z2);
        while (y.signum() > 0) {
          r = (a + z2.intValue()).toString(b).substr(1) + r;
          y.divRemTo(d, y, z2);
        }
        return z2.intValue().toString(b) + r;
      }
      function bnpFromRadix(s, b) {
        this.fromInt(0);
        if (b == null) b = 10;
        var cs = this.chunkSize(b);
        var d = Math.pow(b, cs), mi = false, j = 0, w = 0;
        for (var i = 0; i < s.length; ++i) {
          var x = intAt(s, i);
          if (x < 0) {
            if (s.charAt(i) == "-" && this.signum() == 0) mi = true;
            continue;
          }
          w = b * w + x;
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
          var x = new Array(), t2 = a & 7;
          x.length = (a >> 3) + 1;
          b.nextBytes(x);
          if (t2 > 0) x[0] &= (1 << t2) - 1;
          else x[0] = 0;
          this.fromString(x, 256);
        }
      }
      function bnToByteArray() {
        var i = this.t, r = new Array();
        r[0] = this.s;
        var p = this.DB - i * this.DB % 8, d, k = 0;
        if (i-- > 0) {
          if (p < this.DB && (d = this[i] >> p) != (this.s & this.DM) >> p)
            r[k++] = d | this.s << this.DB - p;
          while (i >= 0) {
            if (p < 8) {
              d = (this[i] & (1 << p) - 1) << 8 - p;
              d |= this[--i] >> (p += this.DB - 8);
            } else {
              d = this[i] >> (p -= 8) & 255;
              if (p <= 0) {
                p += this.DB;
                --i;
              }
            }
            if ((d & 128) != 0) d |= -256;
            if (k == 0 && (this.s & 128) != (d & 128)) ++k;
            if (k > 0 || d != this.s) r[k++] = d;
          }
        }
        return r;
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
      function bnpBitwiseTo(a, op, r) {
        var i, f, m = Math.min(a.t, this.t);
        for (i = 0; i < m; ++i) r[i] = op(this[i], a[i]);
        if (a.t < this.t) {
          f = a.s & this.DM;
          for (i = m; i < this.t; ++i) r[i] = op(this[i], f);
          r.t = this.t;
        } else {
          f = this.s & this.DM;
          for (i = m; i < a.t; ++i) r[i] = op(f, a[i]);
          r.t = a.t;
        }
        r.s = op(this.s, a.s);
        r.clamp();
      }
      function op_and(x, y) {
        return x & y;
      }
      function bnAnd(a) {
        var r = nbi();
        this.bitwiseTo(a, op_and, r);
        return r;
      }
      function op_or(x, y) {
        return x | y;
      }
      function bnOr(a) {
        var r = nbi();
        this.bitwiseTo(a, op_or, r);
        return r;
      }
      function op_xor(x, y) {
        return x ^ y;
      }
      function bnXor(a) {
        var r = nbi();
        this.bitwiseTo(a, op_xor, r);
        return r;
      }
      function op_andnot(x, y) {
        return x & ~y;
      }
      function bnAndNot(a) {
        var r = nbi();
        this.bitwiseTo(a, op_andnot, r);
        return r;
      }
      function bnNot() {
        var r = nbi();
        for (var i = 0; i < this.t; ++i) r[i] = this.DM & ~this[i];
        r.t = this.t;
        r.s = ~this.s;
        return r;
      }
      function bnShiftLeft(n) {
        var r = nbi();
        if (n < 0) this.rShiftTo(-n, r);
        else this.lShiftTo(n, r);
        return r;
      }
      function bnShiftRight(n) {
        var r = nbi();
        if (n < 0) this.lShiftTo(-n, r);
        else this.rShiftTo(n, r);
        return r;
      }
      function lbit(x) {
        if (x == 0) return -1;
        var r = 0;
        if ((x & 65535) == 0) {
          x >>= 16;
          r += 16;
        }
        if ((x & 255) == 0) {
          x >>= 8;
          r += 8;
        }
        if ((x & 15) == 0) {
          x >>= 4;
          r += 4;
        }
        if ((x & 3) == 0) {
          x >>= 2;
          r += 2;
        }
        if ((x & 1) == 0) ++r;
        return r;
      }
      function bnGetLowestSetBit() {
        for (var i = 0; i < this.t; ++i)
          if (this[i] != 0) return i * this.DB + lbit(this[i]);
        if (this.s < 0) return this.t * this.DB;
        return -1;
      }
      function cbit(x) {
        var r = 0;
        while (x != 0) {
          x &= x - 1;
          ++r;
        }
        return r;
      }
      function bnBitCount() {
        var r = 0, x = this.s & this.DM;
        for (var i = 0; i < this.t; ++i) r += cbit(this[i] ^ x);
        return r;
      }
      function bnTestBit(n) {
        var j = Math.floor(n / this.DB);
        if (j >= this.t) return this.s != 0;
        return (this[j] & 1 << n % this.DB) != 0;
      }
      function bnpChangeBit(n, op) {
        var r = BigInteger.ONE.shiftLeft(n);
        this.bitwiseTo(r, op, r);
        return r;
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
      function bnpAddTo(a, r) {
        var i = 0, c = 0, m = Math.min(a.t, this.t);
        while (i < m) {
          c += this[i] + a[i];
          r[i++] = c & this.DM;
          c >>= this.DB;
        }
        if (a.t < this.t) {
          c += a.s;
          while (i < this.t) {
            c += this[i];
            r[i++] = c & this.DM;
            c >>= this.DB;
          }
          c += this.s;
        } else {
          c += this.s;
          while (i < a.t) {
            c += a[i];
            r[i++] = c & this.DM;
            c >>= this.DB;
          }
          c += a.s;
        }
        r.s = c < 0 ? -1 : 0;
        if (c > 0) r[i++] = c;
        else if (c < -1) r[i++] = this.DV + c;
        r.t = i;
        r.clamp();
      }
      function bnAdd(a) {
        var r = nbi();
        this.addTo(a, r);
        return r;
      }
      function bnSubtract(a) {
        var r = nbi();
        this.subTo(a, r);
        return r;
      }
      function bnMultiply(a) {
        var r = nbi();
        this.multiplyTo(a, r);
        return r;
      }
      function bnSquare() {
        var r = nbi();
        this.squareTo(r);
        return r;
      }
      function bnDivide(a) {
        var r = nbi();
        this.divRemTo(a, r, null);
        return r;
      }
      function bnRemainder(a) {
        var r = nbi();
        this.divRemTo(a, null, r);
        return r;
      }
      function bnDivideAndRemainder(a) {
        var q = nbi(), r = nbi();
        this.divRemTo(a, q, r);
        return new Array(q, r);
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
      function nNop(x) {
        return x;
      }
      function nMulTo(x, y, r) {
        x.multiplyTo(y, r);
      }
      function nSqrTo(x, r) {
        x.squareTo(r);
      }
      NullExp.prototype.convert = nNop;
      NullExp.prototype.revert = nNop;
      NullExp.prototype.mulTo = nMulTo;
      NullExp.prototype.sqrTo = nSqrTo;
      function bnPow(e) {
        return this.exp(e, new NullExp());
      }
      function bnpMultiplyLowerTo(a, n, r) {
        var i = Math.min(this.t + a.t, n);
        r.s = 0;
        r.t = i;
        while (i > 0) r[--i] = 0;
        var j;
        for (j = r.t - this.t; i < j; ++i) r[i + this.t] = this.am(0, a[i], r, i, 0, this.t);
        for (j = Math.min(a.t, n); i < j; ++i) this.am(0, a[i], r, i, 0, n - i);
        r.clamp();
      }
      function bnpMultiplyUpperTo(a, n, r) {
        --n;
        var i = r.t = this.t + a.t - n;
        r.s = 0;
        while (--i >= 0) r[i] = 0;
        for (i = Math.max(n - this.t, 0); i < a.t; ++i)
          r[this.t + i - n] = this.am(n - i, a[i], r, 0, 0, this.t + i - n);
        r.clamp();
        r.drShiftTo(1, r);
      }
      function Barrett(m) {
        this.r2 = nbi();
        this.q3 = nbi();
        BigInteger.ONE.dlShiftTo(2 * m.t, this.r2);
        this.mu = this.r2.divide(m);
        this.m = m;
      }
      function barrettConvert(x) {
        if (x.s < 0 || x.t > 2 * this.m.t) return x.mod(this.m);
        else if (x.compareTo(this.m) < 0) return x;
        else {
          var r = nbi();
          x.copyTo(r);
          this.reduce(r);
          return r;
        }
      }
      function barrettRevert(x) {
        return x;
      }
      function barrettReduce(x) {
        x.drShiftTo(this.m.t - 1, this.r2);
        if (x.t > this.m.t + 1) {
          x.t = this.m.t + 1;
          x.clamp();
        }
        this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3);
        this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2);
        while (x.compareTo(this.r2) < 0) x.dAddOffset(1, this.m.t + 1);
        x.subTo(this.r2, x);
        while (x.compareTo(this.m) >= 0) x.subTo(this.m, x);
      }
      function barrettSqrTo(x, r) {
        x.squareTo(r);
        this.reduce(r);
      }
      function barrettMulTo(x, y, r) {
        x.multiplyTo(y, r);
        this.reduce(r);
      }
      Barrett.prototype.convert = barrettConvert;
      Barrett.prototype.revert = barrettRevert;
      Barrett.prototype.reduce = barrettReduce;
      Barrett.prototype.mulTo = barrettMulTo;
      Barrett.prototype.sqrTo = barrettSqrTo;
      function bnModPow(e, m) {
        var i = e.bitLength(), k, r = nbv(1), z2;
        if (i <= 0) return r;
        else if (i < 18) k = 1;
        else if (i < 48) k = 3;
        else if (i < 144) k = 4;
        else if (i < 768) k = 5;
        else k = 6;
        if (i < 8)
          z2 = new Classic(m);
        else if (m.isEven())
          z2 = new Barrett(m);
        else
          z2 = new Montgomery(m);
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
        var j = e.t - 1, w, is1 = true, r2 = nbi(), t2;
        i = nbits(e[j]) - 1;
        while (j >= 0) {
          if (i >= k1) w = e[j] >> i - k1 & km;
          else {
            w = (e[j] & (1 << i + 1) - 1) << k1 - i;
            if (j > 0) w |= e[j - 1] >> this.DB + i - k1;
          }
          n = k;
          while ((w & 1) == 0) {
            w >>= 1;
            --n;
          }
          if ((i -= n) < 0) {
            i += this.DB;
            --j;
          }
          if (is1) {
            g[w].copyTo(r);
            is1 = false;
          } else {
            while (n > 1) {
              z2.sqrTo(r, r2);
              z2.sqrTo(r2, r);
              n -= 2;
            }
            if (n > 0) z2.sqrTo(r, r2);
            else {
              t2 = r;
              r = r2;
              r2 = t2;
            }
            z2.mulTo(r2, g[w], r);
          }
          while (j >= 0 && (e[j] & 1 << i) == 0) {
            z2.sqrTo(r, r2);
            t2 = r;
            r = r2;
            r2 = t2;
            if (--i < 0) {
              i = this.DB - 1;
              --j;
            }
          }
        }
        return z2.revert(r);
      }
      function bnGCD(a) {
        var x = this.s < 0 ? this.negate() : this.clone();
        var y = a.s < 0 ? a.negate() : a.clone();
        if (x.compareTo(y) < 0) {
          var t2 = x;
          x = y;
          y = t2;
        }
        var i = x.getLowestSetBit(), g = y.getLowestSetBit();
        if (g < 0) return x;
        if (i < g) g = i;
        if (g > 0) {
          x.rShiftTo(g, x);
          y.rShiftTo(g, y);
        }
        while (x.signum() > 0) {
          if ((i = x.getLowestSetBit()) > 0) x.rShiftTo(i, x);
          if ((i = y.getLowestSetBit()) > 0) y.rShiftTo(i, y);
          if (x.compareTo(y) >= 0) {
            x.subTo(y, x);
            x.rShiftTo(1, x);
          } else {
            y.subTo(x, y);
            y.rShiftTo(1, y);
          }
        }
        if (g > 0) y.lShiftTo(g, y);
        return y;
      }
      function bnpModInt(n) {
        if (n <= 0) return 0;
        var d = this.DV % n, r = this.s < 0 ? n - 1 : 0;
        if (this.t > 0)
          if (d == 0) r = this[0] % n;
          else for (var i = this.t - 1; i >= 0; --i) r = (d * r + this[i]) % n;
        return r;
      }
      function bnModInverse(m) {
        var ac = m.isEven();
        if (this.isEven() && ac || m.signum() == 0) return BigInteger.ZERO;
        var u = m.clone(), v = this.clone();
        var a = nbv(1), b = nbv(0), c = nbv(0), d = nbv(1);
        while (u.signum() != 0) {
          while (u.isEven()) {
            u.rShiftTo(1, u);
            if (ac) {
              if (!a.isEven() || !b.isEven()) {
                a.addTo(this, a);
                b.subTo(m, b);
              }
              a.rShiftTo(1, a);
            } else if (!b.isEven()) b.subTo(m, b);
            b.rShiftTo(1, b);
          }
          while (v.isEven()) {
            v.rShiftTo(1, v);
            if (ac) {
              if (!c.isEven() || !d.isEven()) {
                c.addTo(this, c);
                d.subTo(m, d);
              }
              c.rShiftTo(1, c);
            } else if (!d.isEven()) d.subTo(m, d);
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
        if (d.compareTo(m) >= 0) return d.subtract(m);
        if (d.signum() < 0) d.addTo(m, d);
        else return d;
        if (d.signum() < 0) return d.add(m);
        else return d;
      }
      var lowprimes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997];
      var lplim = (1 << 26) / lowprimes[lowprimes.length - 1];
      function bnIsProbablePrime(t2) {
        var i, x = this.abs();
        if (x.t == 1 && x[0] <= lowprimes[lowprimes.length - 1]) {
          for (i = 0; i < lowprimes.length; ++i)
            if (x[0] == lowprimes[i]) return true;
          return false;
        }
        if (x.isEven()) return false;
        i = 1;
        while (i < lowprimes.length) {
          var m = lowprimes[i], j = i + 1;
          while (j < lowprimes.length && m < lplim) m *= lowprimes[j++];
          m = x.modInt(m);
          while (i < j) if (m % lowprimes[i++] == 0) return false;
        }
        return x.millerRabin(t2);
      }
      function bnpMillerRabin(t2) {
        var n1 = this.subtract(BigInteger.ONE);
        var k = n1.getLowestSetBit();
        if (k <= 0) return false;
        var r = n1.shiftRight(k);
        t2 = t2 + 1 >> 1;
        if (t2 > lowprimes.length) t2 = lowprimes.length;
        var a = nbi();
        for (var i = 0; i < t2; ++i) {
          a.fromInt(lowprimes[Math.floor(Math.random() * lowprimes.length)]);
          var y = a.modPow(r, this);
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
      function rng_seed_int(x) {
        rng_pool[rng_pptr++] ^= x & 255;
        rng_pool[rng_pptr++] ^= x >> 8 & 255;
        rng_pool[rng_pptr++] ^= x >> 16 & 255;
        rng_pool[rng_pptr++] ^= x >> 24 & 255;
        if (rng_pptr >= rng_psize) rng_pptr -= rng_psize;
      }
      function rng_seed_time() {
        rng_seed_int((/* @__PURE__ */ new Date()).getTime());
      }
      if (rng_pool == null) {
        rng_pool = new Array();
        rng_pptr = 0;
        var t;
        if (typeof window !== "undefined" && window.crypto) {
          if (window.crypto.getRandomValues) {
            var ua = new Uint8Array(32);
            window.crypto.getRandomValues(ua);
            for (t = 0; t < 32; ++t)
              rng_pool[rng_pptr++] = ua[t];
          } else if (navigator.appName == "Netscape" && navigator.appVersion < "5") {
            var z = window.crypto.random(32);
            for (t = 0; t < z.length; ++t)
              rng_pool[rng_pptr++] = z.charCodeAt(t) & 255;
          }
        }
        while (rng_pptr < rng_psize) {
          t = Math.floor(65536 * Math.random());
          rng_pool[rng_pptr++] = t >>> 8;
          rng_pool[rng_pptr++] = t & 255;
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
        var i;
        for (i = 0; i < ba.length; ++i) ba[i] = rng_get_byte();
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
        var i, j, t2;
        for (i = 0; i < 256; ++i)
          this.S[i] = i;
        j = 0;
        for (i = 0; i < 256; ++i) {
          j = j + this.S[i] + key[i % key.length] & 255;
          t2 = this.S[i];
          this.S[i] = this.S[j];
          this.S[j] = t2;
        }
        this.i = 0;
        this.j = 0;
      }
      function ARC4next() {
        var t2;
        this.i = this.i + 1 & 255;
        this.j = this.j + this.S[this.i] & 255;
        t2 = this.S[this.i];
        this.S[this.i] = this.S[this.j];
        this.S[this.j] = t2;
        return this.S[t2 + this.S[this.i] & 255];
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
        var cursor = 1, tree_length = parse_tree.length, arg, output = "", i, k, ph, pad, pad_character, pad_length, is_positive, sign;
        for (i = 0; i < tree_length; i++) {
          if (typeof parse_tree[i] === "string") {
            output += parse_tree[i];
          } else if (typeof parse_tree[i] === "object") {
            ph = parse_tree[i];
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
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
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
        } catch (e) {
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
        let i;
        for (i = 0; i < 8; i += 2) {
          const h = padded.slice(i, i + 2);
          groups.push(parseInt(h, 16));
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
        let i;
        for (i = 0; i < constants.GROUPS; i += 2) {
          const hex = (0, sprintf_js_1.sprintf)("%02x%02x", parseInt(this.parsedAddress[i], 10), parseInt(this.parsedAddress[i + 1], 10));
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
    function spanAllZeroes(s) {
      return s.replace(/(0+)/g, '<span class="zero">$1</span>');
    }
    exports2.spanAllZeroes = spanAllZeroes;
    function spanAll(s, offset = 0) {
      const letters = s.split("");
      return letters.map(
        (n, i) => (0, sprintf_js_1.sprintf)('<span class="digit value-%s position-%d">%s</span>', n, i + offset, spanAllZeroes(n))
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
      return groups.map((g, i) => {
        if (/group-v4/.test(g)) {
          return g;
        }
        return (0, sprintf_js_1.sprintf)('<span class="hover-group group-%d">%s</span>', i + offset, spanLeadingZeroesSimple(g));
      });
    }
    exports2.simpleGroup = simpleGroup;
  }
});

// node_modules/ip-address/dist/v6/regular-expressions.js
var require_regular_expressions = __commonJS({
  "node_modules/ip-address/dist/v6/regular-expressions.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
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
      groups.forEach((group, i) => {
        const groupInteger = parseInt(group, 16);
        if (groupInteger === 0) {
          zeroIndexes.push(i);
        }
      });
      const possibilities = zeroIndexes.map((zeroIndex) => groups.map((group, i) => {
        if (i === zeroIndex) {
          const elision = i === 0 || i === v6.GROUPS - 1 ? ":" : "";
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
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
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
      const r = /(\d+)(\d{3})/;
      while (r.test(number)) {
        number = number.replace(r, "$1,$2");
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
      let i;
      for (i = 0; i < address.length; i++) {
        if (i < slice[0]) {
          s1.push(address[i]);
        } else if (i > slice[1]) {
          s2.push(address[i]);
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
        } catch (e) {
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
        let i;
        for (i = 0; i < constants6.GROUPS; i++) {
          groups.push(hex.slice(i * 4, (i + 1) * 4));
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
        for (let i = semicolonAmount; i > 0; i--) {
          const insertIndex = i * 4;
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
        let i;
        let groups = [];
        let zeroCounter = 0;
        const zeroes = [];
        for (i = 0; i < this.parsedAddress.length; i++) {
          const value = parseInt(this.parsedAddress[i], 16);
          if (value === 0) {
            zeroCounter++;
          }
          if (value !== 0 && zeroCounter > 0) {
            if (zeroCounter > 1) {
              zeroes.push([i - zeroCounter, i - 1]);
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
        for (i = 0; i < groups.length; i++) {
          if (groups[i] !== "compact") {
            groups[i] = parseInt(groups[i], 16).toString(16);
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
          for (let i = 0; i < this.address4.groups; i++) {
            if (/^0[0-9]+/.test(this.address4.parsedAddress[i])) {
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
          for (let i = 0; i < remaining; i++) {
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
        for (let i = bytes.length - 1; i >= 0; i--) {
          result = result.add(multiplier.multiply(new jsbn_1.BigInteger(bytes[i].toString(10), 10)));
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
        for (let i = this.elisionBegin; i < this.elisionBegin + this.elidedGroups; i++) {
          classes.push((0, sprintf_js_1.sprintf)("group-%d", i));
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
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
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
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
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
            for (let i = 0; i < options.proxies.length; i++) {
              const nextProxy = options.proxies[i];
              const nextDestination = i === options.proxies.length - 1 ? options.destination : {
                host: options.proxies[i + 1].host || options.proxies[i + 1].ipaddress,
                port: options.proxies[i + 1].port
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
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports2 && exports2.__exportStar || function(m, exports3) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p)) __createBinding(exports3, m, p);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    __exportStar(require_socksclient(), exports2);
  }
});

// node_modules/agent-base/dist/helpers.js
var require_helpers3 = __commonJS({
  "node_modules/agent-base/dist/helpers.js"(exports2) {
    "use strict";
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
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
    var http = __importStar(require("http"));
    var https = __importStar(require("https"));
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
      const req2 = (href.startsWith("https:") ? https : http).request(url, opts);
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
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
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
    var __exportStar = exports2 && exports2.__exportStar || function(m, exports3) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p)) __createBinding(exports3, m, p);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Agent = void 0;
    var net = __importStar(require("net"));
    var http = __importStar(require("http"));
    var https_1 = require("https");
    __exportStar(require_helpers3(), exports2);
    var INTERNAL = Symbol("AgentBaseInternalState");
    var Agent = class extends http.Agent {
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
          if (socket instanceof http.Agent) {
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
    var s = 1e3;
    var m = s * 60;
    var h = m * 60;
    var d = h * 24;
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
          return n * h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return n * m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return n * s;
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
      if (msAbs >= h) {
        return Math.round(ms / h) + "h";
      }
      if (msAbs >= m) {
        return Math.round(ms / m) + "m";
      }
      if (msAbs >= s) {
        return Math.round(ms / s) + "s";
      }
      return ms + "ms";
    }
    function fmtLong(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return plural(ms, msAbs, d, "day");
      }
      if (msAbs >= h) {
        return plural(ms, msAbs, h, "hour");
      }
      if (msAbs >= m) {
        return plural(ms, msAbs, m, "minute");
      }
      if (msAbs >= s) {
        return plural(ms, msAbs, s, "second");
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
        for (let i = 0; i < namespace.length; i++) {
          hash = (hash << 5) - hash + namespace.charCodeAt(i);
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
          const self = debug;
          const curr = Number(/* @__PURE__ */ new Date());
          const ms = curr - (prevTime || curr);
          self.diff = ms;
          self.prev = prevTime;
          self.curr = curr;
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
              match = formatter.call(self, val);
              args.splice(index, 1);
              index--;
            }
            return match;
          });
          createDebug.formatArgs.call(self, args);
          const logFn = self.log || createDebug.log;
          logFn.apply(self, args);
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
      let m;
      return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator !== "undefined" && navigator.userAgent && (m = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(m[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
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
      let r;
      try {
        r = exports2.storage.getItem("debug") || exports2.storage.getItem("DEBUG");
      } catch (error) {
      }
      if (!r && typeof process !== "undefined" && "env" in process) {
        r = process.env.DEBUG;
      }
      return r;
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
      for (let i = 0; i < keys.length; i++) {
        debug.inspectOpts[keys[i]] = exports2.inspectOpts[keys[i]];
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
    var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
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
              } catch (e) {
                return true;
              }
            }
          } catch (e) {
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
        } catch (e) {
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
          for (var i = 0; i < object.length; ++i) {
            theKeys.push(String(i));
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
      } catch (e) {
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
      } catch (e) {
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
      } catch (e) {
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
      for (var i = 0; i < props.length; i += 1) {
        defineProperty(object, props[i], map[props[i]], predicates[props[i]]);
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
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
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
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        if (i % 2) {
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
      const log = (a, b, c, d, e, f, g, h, i, k) => {
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
            e,
            f,
            g,
            h,
            i,
            k
          });
          const values = Object.keys(args).map((key) => {
            return args[key];
          });
          const hasOnlyOneParameterValued = 1 === values.reduce((accumulator, value) => {
            return accumulator += typeof value === "undefined" ? 0 : 1;
          }, 0);
          message = hasOnlyOneParameterValued ? (0, _sprintfJs.sprintf)("%s", a) : (0, _sprintfJs.sprintf)(a, b, c, d, e, f, g, h, i, k);
        } else {
          if (typeof b !== "string") {
            throw new TypeError("Message must be a string.");
          }
          context = JSON.parse((0, _jsonStringifySafe.default)(_objectSpread(_objectSpread(_objectSpread({}, getFirstParentDomainContext()), parentContext || {}), a)));
          message = (0, _sprintfJs.sprintf)(b, c, d, e, f, g, h, i, k);
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
        log[logLevel] = (a, b, c, d, e, f, g, h, i, k) => {
          return log.child({
            logLevel: _constants.logLevels[logLevel]
          })(a, b, c, d, e, f, g, h, i, k);
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
      const log = (a, b, c, d, e, f, g, h, i, k) => {
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
        log[logLevel] = (a, b, c, d, e, f, g, h, i, k) => {
          return log.child({
            logLevel: _constants.logLevels[logLevel]
          })(a, b, c, d, e, f, g, h, i, k);
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
      for (var i = 0; i < 3; i++) {
        var na = Number(pa[i]);
        var nb = Number(pb[i]);
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
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        if (i % 2) {
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
    var t = exports2.t = {};
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
      t[name] = index;
      src[index] = value;
      safeSrc[index] = safe;
      re[index] = new RegExp(value, isGlobal ? "g" : void 0);
      safeRe[index] = new RegExp(safe, isGlobal ? "g" : void 0);
    };
    createToken("NUMERICIDENTIFIER", "0|[1-9]\\d*");
    createToken("NUMERICIDENTIFIERLOOSE", "\\d+");
    createToken("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${LETTERDASHNUMBER}*`);
    createToken("MAINVERSION", `(${src[t.NUMERICIDENTIFIER]})\\.(${src[t.NUMERICIDENTIFIER]})\\.(${src[t.NUMERICIDENTIFIER]})`);
    createToken("MAINVERSIONLOOSE", `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.(${src[t.NUMERICIDENTIFIERLOOSE]})\\.(${src[t.NUMERICIDENTIFIERLOOSE]})`);
    createToken("PRERELEASEIDENTIFIER", `(?:${src[t.NONNUMERICIDENTIFIER]}|${src[t.NUMERICIDENTIFIER]})`);
    createToken("PRERELEASEIDENTIFIERLOOSE", `(?:${src[t.NONNUMERICIDENTIFIER]}|${src[t.NUMERICIDENTIFIERLOOSE]})`);
    createToken("PRERELEASE", `(?:-(${src[t.PRERELEASEIDENTIFIER]}(?:\\.${src[t.PRERELEASEIDENTIFIER]})*))`);
    createToken("PRERELEASELOOSE", `(?:-?(${src[t.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${src[t.PRERELEASEIDENTIFIERLOOSE]})*))`);
    createToken("BUILDIDENTIFIER", `${LETTERDASHNUMBER}+`);
    createToken("BUILD", `(?:\\+(${src[t.BUILDIDENTIFIER]}(?:\\.${src[t.BUILDIDENTIFIER]})*))`);
    createToken("FULLPLAIN", `v?${src[t.MAINVERSION]}${src[t.PRERELEASE]}?${src[t.BUILD]}?`);
    createToken("FULL", `^${src[t.FULLPLAIN]}$`);
    createToken("LOOSEPLAIN", `[v=\\s]*${src[t.MAINVERSIONLOOSE]}${src[t.PRERELEASELOOSE]}?${src[t.BUILD]}?`);
    createToken("LOOSE", `^${src[t.LOOSEPLAIN]}$`);
    createToken("GTLT", "((?:<|>)?=?)");
    createToken("XRANGEIDENTIFIERLOOSE", `${src[t.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
    createToken("XRANGEIDENTIFIER", `${src[t.NUMERICIDENTIFIER]}|x|X|\\*`);
    createToken("XRANGEPLAIN", `[v=\\s]*(${src[t.XRANGEIDENTIFIER]})(?:\\.(${src[t.XRANGEIDENTIFIER]})(?:\\.(${src[t.XRANGEIDENTIFIER]})(?:${src[t.PRERELEASE]})?${src[t.BUILD]}?)?)?`);
    createToken("XRANGEPLAINLOOSE", `[v=\\s]*(${src[t.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})(?:${src[t.PRERELEASELOOSE]})?${src[t.BUILD]}?)?)?`);
    createToken("XRANGE", `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAIN]}$`);
    createToken("XRANGELOOSE", `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAINLOOSE]}$`);
    createToken("COERCEPLAIN", `${"(^|[^\\d])(\\d{1,"}${MAX_SAFE_COMPONENT_LENGTH}})(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?`);
    createToken("COERCE", `${src[t.COERCEPLAIN]}(?:$|[^\\d])`);
    createToken("COERCEFULL", src[t.COERCEPLAIN] + `(?:${src[t.PRERELEASE]})?(?:${src[t.BUILD]})?(?:$|[^\\d])`);
    createToken("COERCERTL", src[t.COERCE], true);
    createToken("COERCERTLFULL", src[t.COERCEFULL], true);
    createToken("LONETILDE", "(?:~>?)");
    createToken("TILDETRIM", `(\\s*)${src[t.LONETILDE]}\\s+`, true);
    exports2.tildeTrimReplace = "$1~";
    createToken("TILDE", `^${src[t.LONETILDE]}${src[t.XRANGEPLAIN]}$`);
    createToken("TILDELOOSE", `^${src[t.LONETILDE]}${src[t.XRANGEPLAINLOOSE]}$`);
    createToken("LONECARET", "(?:\\^)");
    createToken("CARETTRIM", `(\\s*)${src[t.LONECARET]}\\s+`, true);
    exports2.caretTrimReplace = "$1^";
    createToken("CARET", `^${src[t.LONECARET]}${src[t.XRANGEPLAIN]}$`);
    createToken("CARETLOOSE", `^${src[t.LONECARET]}${src[t.XRANGEPLAINLOOSE]}$`);
    createToken("COMPARATORLOOSE", `^${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]})$|^$`);
    createToken("COMPARATOR", `^${src[t.GTLT]}\\s*(${src[t.FULLPLAIN]})$|^$`);
    createToken("COMPARATORTRIM", `(\\s*)${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]}|${src[t.XRANGEPLAIN]})`, true);
    exports2.comparatorTrimReplace = "$1$2$3";
    createToken("HYPHENRANGE", `^\\s*(${src[t.XRANGEPLAIN]})\\s+-\\s+(${src[t.XRANGEPLAIN]})\\s*$`);
    createToken("HYPHENRANGELOOSE", `^\\s*(${src[t.XRANGEPLAINLOOSE]})\\s+-\\s+(${src[t.XRANGEPLAINLOOSE]})\\s*$`);
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
    var { safeRe: re, t } = require_re();
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
        const m = version.trim().match(options.loose ? re[t.LOOSE] : re[t.FULL]);
        if (!m) {
          throw new TypeError(`Invalid Version: ${version}`);
        }
        this.raw = version;
        this.major = +m[1];
        this.minor = +m[2];
        this.patch = +m[3];
        if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
          throw new TypeError("Invalid major version");
        }
        if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
          throw new TypeError("Invalid minor version");
        }
        if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
          throw new TypeError("Invalid patch version");
        }
        if (!m[4]) {
          this.prerelease = [];
        } else {
          this.prerelease = m[4].split(".").map((id) => {
            if (/^[0-9]+$/.test(id)) {
              const num = +id;
              if (num >= 0 && num < MAX_SAFE_INTEGER) {
                return num;
              }
            }
            return id;
          });
        }
        this.build = m[5] ? m[5].split(".") : [];
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
        let i = 0;
        do {
          const a = this.prerelease[i];
          const b = other.prerelease[i];
          debug("prerelease compare", i, a, b);
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
        } while (++i);
      }
      compareBuild(other) {
        if (!(other instanceof _SemVer)) {
          other = new _SemVer(other, this.options);
        }
        let i = 0;
        do {
          const a = this.build[i];
          const b = other.build[i];
          debug("build compare", i, a, b);
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
        } while (++i);
      }
      // preminor will bump the version up to the next minor release, and immediately
      // down to pre-release. premajor and prepatch work the same way.
      inc(release, identifier, identifierBase) {
        if (release.startsWith("pre")) {
          if (!identifier && identifierBase === false) {
            throw new Error("invalid increment argument: identifier is empty");
          }
          if (identifier) {
            const match = `-${identifier}`.match(this.options.loose ? re[t.PRERELEASELOOSE] : re[t.PRERELEASE]);
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
              let i = this.prerelease.length;
              while (--i >= 0) {
                if (typeof this.prerelease[i] === "number") {
                  this.prerelease[i]++;
                  i = -2;
                }
              }
              if (i === -1) {
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
      const s = parse(version.trim().replace(/^[=v]+/, ""), options);
      return s ? s.version : null;
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
    var { safeRe: re, t } = require_re();
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
        match = version.match(options.includePrerelease ? re[t.COERCEFULL] : re[t.COERCE]);
      } else {
        const coerceRtlRegex = options.includePrerelease ? re[t.COERCERTLFULL] : re[t.COERCERTL];
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
        this.set = this.raw.split("||").map((r) => this.parseRange(r.trim())).filter((c) => c.length);
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
          for (let i = 0; i < this.set.length; i++) {
            if (i > 0) {
              this.formatted += "||";
            }
            const comps = this.set[i];
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
        const hr = loose ? re[t.HYPHENRANGELOOSE] : re[t.HYPHENRANGE];
        range = range.replace(hr, hyphenReplace(this.options.includePrerelease));
        debug("hyphen replace", range);
        range = range.replace(re[t.COMPARATORTRIM], comparatorTrimReplace);
        debug("comparator trim", range);
        range = range.replace(re[t.TILDETRIM], tildeTrimReplace);
        debug("tilde trim", range);
        range = range.replace(re[t.CARETTRIM], caretTrimReplace);
        debug("caret trim", range);
        let rangeList = range.split(" ").map((comp) => parseComparator(comp, this.options)).join(" ").split(/\s+/).map((comp) => replaceGTE0(comp, this.options));
        if (loose) {
          rangeList = rangeList.filter((comp) => {
            debug("loose invalid filter", comp, this.options);
            return !!comp.match(re[t.COMPARATORLOOSE]);
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
        for (let i = 0; i < this.set.length; i++) {
          if (testSet(this.set[i], version, this.options)) {
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
      t,
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
      const r = options.loose ? re[t.TILDELOOSE] : re[t.TILDE];
      return comp.replace(r, (_, M, m, p, pr) => {
        debug("tilde", comp, _, M, m, p, pr);
        let ret;
        if (isX(M)) {
          ret = "";
        } else if (isX(m)) {
          ret = `>=${M}.0.0 <${+M + 1}.0.0-0`;
        } else if (isX(p)) {
          ret = `>=${M}.${m}.0 <${M}.${+m + 1}.0-0`;
        } else if (pr) {
          debug("replaceTilde pr", pr);
          ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
        } else {
          ret = `>=${M}.${m}.${p} <${M}.${+m + 1}.0-0`;
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
      const r = options.loose ? re[t.CARETLOOSE] : re[t.CARET];
      const z = options.includePrerelease ? "-0" : "";
      return comp.replace(r, (_, M, m, p, pr) => {
        debug("caret", comp, _, M, m, p, pr);
        let ret;
        if (isX(M)) {
          ret = "";
        } else if (isX(m)) {
          ret = `>=${M}.0.0${z} <${+M + 1}.0.0-0`;
        } else if (isX(p)) {
          if (M === "0") {
            ret = `>=${M}.${m}.0${z} <${M}.${+m + 1}.0-0`;
          } else {
            ret = `>=${M}.${m}.0${z} <${+M + 1}.0.0-0`;
          }
        } else if (pr) {
          debug("replaceCaret pr", pr);
          if (M === "0") {
            if (m === "0") {
              ret = `>=${M}.${m}.${p}-${pr} <${M}.${m}.${+p + 1}-0`;
            } else {
              ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
            }
          } else {
            ret = `>=${M}.${m}.${p}-${pr} <${+M + 1}.0.0-0`;
          }
        } else {
          debug("no pr");
          if (M === "0") {
            if (m === "0") {
              ret = `>=${M}.${m}.${p}${z} <${M}.${m}.${+p + 1}-0`;
            } else {
              ret = `>=${M}.${m}.${p}${z} <${M}.${+m + 1}.0-0`;
            }
          } else {
            ret = `>=${M}.${m}.${p} <${+M + 1}.0.0-0`;
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
      const r = options.loose ? re[t.XRANGELOOSE] : re[t.XRANGE];
      return comp.replace(r, (ret, gtlt, M, m, p, pr) => {
        debug("xRange", comp, ret, gtlt, M, m, p, pr);
        const xM = isX(M);
        const xm = xM || isX(m);
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
            m = 0;
          }
          p = 0;
          if (gtlt === ">") {
            gtlt = ">=";
            if (xm) {
              M = +M + 1;
              m = 0;
              p = 0;
            } else {
              m = +m + 1;
              p = 0;
            }
          } else if (gtlt === "<=") {
            gtlt = "<";
            if (xm) {
              M = +M + 1;
            } else {
              m = +m + 1;
            }
          }
          if (gtlt === "<") {
            pr = "-0";
          }
          ret = `${gtlt + M}.${m}.${p}${pr}`;
        } else if (xm) {
          ret = `>=${M}.0.0${pr} <${+M + 1}.0.0-0`;
        } else if (xp) {
          ret = `>=${M}.${m}.0${pr} <${M}.${+m + 1}.0-0`;
        }
        debug("xRange return", ret);
        return ret;
      });
    };
    var replaceStars = (comp, options) => {
      debug("replaceStars", comp, options);
      return comp.trim().replace(re[t.STAR], "");
    };
    var replaceGTE0 = (comp, options) => {
      debug("replaceGTE0", comp, options);
      return comp.trim().replace(re[options.includePrerelease ? t.GTE0PRE : t.GTE0], "");
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
      for (let i = 0; i < set.length; i++) {
        if (!set[i].test(version)) {
          return false;
        }
      }
      if (version.prerelease.length && !options.includePrerelease) {
        for (let i = 0; i < set.length; i++) {
          debug(set[i].semver);
          if (set[i].semver === Comparator.ANY) {
            continue;
          }
          if (set[i].semver.prerelease.length > 0) {
            const allowed = set[i].semver;
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
        const r = this.options.loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR];
        const m = comp.match(r);
        if (!m) {
          throw new TypeError(`Invalid comparator: ${comp}`);
        }
        this.operator = m[1] !== void 0 ? m[1] : "";
        if (this.operator === "=") {
          this.operator = "";
        }
        if (!m[2]) {
          this.semver = ANY;
        } else {
          this.semver = new SemVer(m[2], this.options.loose);
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
    var { safeRe: re, t } = require_re();
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
      for (let i = 0; i < range.set.length; ++i) {
        const comparators = range.set[i];
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
      for (let i = 0; i < range.set.length; ++i) {
        const comparators = range.set[i];
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
      let higher, lower;
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
            lower = lowerLT(lt, c, options);
            if (lower === c && lower !== lt) {
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
    function _possibleConstructorReturn(self, call) {
      if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return call && (typeof call === "object" || typeof call === "function") ? call : self;
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
  if (!import_fs.default.existsSync(CONFIG_PATH)) {
    console.error(`Config file not found: ${CONFIG_PATH}`);
    import_process.default.exit(1);
  }
  return JSON.parse(import_fs.default.readFileSync(CONFIG_PATH, "utf-8"));
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
  const start = Date.now();
  try {
    const res = await fetch(url, { method, headers, body, agent });
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
    console.error(`  Error: ${err.stack || err}`);
    return { ok: false, error: err };
  }
}
async function main() {
  const config = loadConfig();
  const providers = config.Providers || config.providers || [];
  if (providers.length === 0) {
    console.error("No Providers found in config.json");
    import_process.default.exit(1);
  }
  let agent = void 0;
  if (import_process.default.env.PROXY_URL) {
    if (import_process.default.env.PROXY_URL.startsWith("socks")) {
      const { SocksProxyAgent } = require_dist2();
      agent = new SocksProxyAgent(import_process.default.env.PROXY_URL);
      console.log(`[INFO] socks-proxy-agent enabled, proxy: ${import_process.default.env.PROXY_URL}`);
    } else {
      import_process.default.env.GLOBAL_AGENT_HTTP_PROXY = import_process.default.env.PROXY_URL;
      require_bootstrap2();
      console.log(`[INFO] global-agent enabled, proxy: ${import_process.default.env.PROXY_URL}`);
    }
  }
  for (const provider of providers) {
    const apiKeys = getApiKeys(provider);
    if (!apiKeys.length) {
      console.warn(`Provider ${provider.name} has no API keys, skipped.`);
      continue;
    }
    for (const model of provider.models) {
      for (const apiKey of apiKeys) {
        await testProviderModelKey(provider, model, apiKey, agent);
      }
    }
  }
}
main().catch((e) => {
  console.error("Fatal error:", e);
  import_process.default.exit(1);
});
