"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod2) => function __require() {
  return mod2 || (0, cb[__getOwnPropNames(cb)[0]])((mod2 = { exports: {} }).exports, mod2), mod2.exports;
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
var __toESM = (mod2, isNodeMode, target) => (target = mod2 != null ? __create(__getProtoOf(mod2)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod2 || !mod2.__esModule ? __defProp(target, "default", { value: mod2, enumerable: true }) : target,
  mod2
));
var __toCommonJS = (mod2) => __copyProps(__defProp({}, "__esModule", { value: true }), mod2);

// node_modules/@protobufjs/aspromise/index.js
var require_aspromise = __commonJS({
  "node_modules/@protobufjs/aspromise/index.js"(exports2, module2) {
    "use strict";
    module2.exports = asPromise;
    function asPromise(fn, ctx) {
      var params = new Array(arguments.length - 1), offset = 0, index = 2, pending = true;
      while (index < arguments.length)
        params[offset++] = arguments[index++];
      return new Promise(function executor(resolve2, reject) {
        params[offset] = function callback(err) {
          if (pending) {
            pending = false;
            if (err)
              reject(err);
            else {
              var params2 = new Array(arguments.length - 1), offset2 = 0;
              while (offset2 < params2.length)
                params2[offset2++] = arguments[offset2];
              resolve2.apply(null, params2);
            }
          }
        };
        try {
          fn.apply(ctx || null, params);
        } catch (err) {
          if (pending) {
            pending = false;
            reject(err);
          }
        }
      });
    }
  }
});

// node_modules/@protobufjs/base64/index.js
var require_base64 = __commonJS({
  "node_modules/@protobufjs/base64/index.js"(exports2) {
    "use strict";
    var base64 = exports2;
    base64.length = function length2(string) {
      var p = string.length;
      if (!p)
        return 0;
      var n = 0;
      while (--p % 4 > 1 && string.charAt(p) === "=")
        ++n;
      return Math.ceil(string.length * 3) / 4 - n;
    };
    var b64 = new Array(64);
    var s64 = new Array(123);
    for (i = 0; i < 64; )
      s64[b64[i] = i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i - 59 | 43] = i++;
    var i;
    base64.encode = function encode(buffer2, start, end) {
      var parts = null, chunk = [];
      var i2 = 0, j = 0, t;
      while (start < end) {
        var b = buffer2[start++];
        switch (j) {
          case 0:
            chunk[i2++] = b64[b >> 2];
            t = (b & 3) << 4;
            j = 1;
            break;
          case 1:
            chunk[i2++] = b64[t | b >> 4];
            t = (b & 15) << 2;
            j = 2;
            break;
          case 2:
            chunk[i2++] = b64[t | b >> 6];
            chunk[i2++] = b64[b & 63];
            j = 0;
            break;
        }
        if (i2 > 8191) {
          (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
          i2 = 0;
        }
      }
      if (j) {
        chunk[i2++] = b64[t];
        chunk[i2++] = 61;
        if (j === 1)
          chunk[i2++] = 61;
      }
      if (parts) {
        if (i2)
          parts.push(String.fromCharCode.apply(String, chunk.slice(0, i2)));
        return parts.join("");
      }
      return String.fromCharCode.apply(String, chunk.slice(0, i2));
    };
    var invalidEncoding = "invalid encoding";
    base64.decode = function decode(string, buffer2, offset) {
      var start = offset;
      var j = 0, t;
      for (var i2 = 0; i2 < string.length; ) {
        var c = string.charCodeAt(i2++);
        if (c === 61 && j > 1)
          break;
        if ((c = s64[c]) === void 0)
          throw Error(invalidEncoding);
        switch (j) {
          case 0:
            t = c;
            j = 1;
            break;
          case 1:
            buffer2[offset++] = t << 2 | (c & 48) >> 4;
            t = c;
            j = 2;
            break;
          case 2:
            buffer2[offset++] = (t & 15) << 4 | (c & 60) >> 2;
            t = c;
            j = 3;
            break;
          case 3:
            buffer2[offset++] = (t & 3) << 6 | c;
            j = 0;
            break;
        }
      }
      if (j === 1)
        throw Error(invalidEncoding);
      return offset - start;
    };
    base64.test = function test(string) {
      return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(string);
    };
  }
});

// node_modules/@protobufjs/eventemitter/index.js
var require_eventemitter = __commonJS({
  "node_modules/@protobufjs/eventemitter/index.js"(exports2, module2) {
    "use strict";
    module2.exports = EventEmitter;
    function EventEmitter() {
      this._listeners = {};
    }
    EventEmitter.prototype.on = function on(evt, fn, ctx) {
      (this._listeners[evt] || (this._listeners[evt] = [])).push({
        fn,
        ctx: ctx || this
      });
      return this;
    };
    EventEmitter.prototype.off = function off(evt, fn) {
      if (evt === void 0)
        this._listeners = {};
      else {
        if (fn === void 0)
          this._listeners[evt] = [];
        else {
          var listeners = this._listeners[evt];
          for (var i = 0; i < listeners.length; )
            if (listeners[i].fn === fn)
              listeners.splice(i, 1);
            else
              ++i;
        }
      }
      return this;
    };
    EventEmitter.prototype.emit = function emit(evt) {
      var listeners = this._listeners[evt];
      if (listeners) {
        var args = [], i = 1;
        for (; i < arguments.length; )
          args.push(arguments[i++]);
        for (i = 0; i < listeners.length; )
          listeners[i].fn.apply(listeners[i++].ctx, args);
      }
      return this;
    };
  }
});

// node_modules/@protobufjs/float/index.js
var require_float = __commonJS({
  "node_modules/@protobufjs/float/index.js"(exports2, module2) {
    "use strict";
    module2.exports = factory(factory);
    function factory(exports3) {
      if (typeof Float32Array !== "undefined")
        (function() {
          var f32 = new Float32Array([-0]), f8b = new Uint8Array(f32.buffer), le = f8b[3] === 128;
          function writeFloat_f32_cpy(val, buf, pos) {
            f32[0] = val;
            buf[pos] = f8b[0];
            buf[pos + 1] = f8b[1];
            buf[pos + 2] = f8b[2];
            buf[pos + 3] = f8b[3];
          }
          function writeFloat_f32_rev(val, buf, pos) {
            f32[0] = val;
            buf[pos] = f8b[3];
            buf[pos + 1] = f8b[2];
            buf[pos + 2] = f8b[1];
            buf[pos + 3] = f8b[0];
          }
          exports3.writeFloatLE = le ? writeFloat_f32_cpy : writeFloat_f32_rev;
          exports3.writeFloatBE = le ? writeFloat_f32_rev : writeFloat_f32_cpy;
          function readFloat_f32_cpy(buf, pos) {
            f8b[0] = buf[pos];
            f8b[1] = buf[pos + 1];
            f8b[2] = buf[pos + 2];
            f8b[3] = buf[pos + 3];
            return f32[0];
          }
          function readFloat_f32_rev(buf, pos) {
            f8b[3] = buf[pos];
            f8b[2] = buf[pos + 1];
            f8b[1] = buf[pos + 2];
            f8b[0] = buf[pos + 3];
            return f32[0];
          }
          exports3.readFloatLE = le ? readFloat_f32_cpy : readFloat_f32_rev;
          exports3.readFloatBE = le ? readFloat_f32_rev : readFloat_f32_cpy;
        })();
      else
        (function() {
          function writeFloat_ieee754(writeUint, val, buf, pos) {
            var sign = val < 0 ? 1 : 0;
            if (sign)
              val = -val;
            if (val === 0)
              writeUint(1 / val > 0 ? (
                /* positive */
                0
              ) : (
                /* negative 0 */
                2147483648
              ), buf, pos);
            else if (isNaN(val))
              writeUint(2143289344, buf, pos);
            else if (val > 34028234663852886e22)
              writeUint((sign << 31 | 2139095040) >>> 0, buf, pos);
            else if (val < 11754943508222875e-54)
              writeUint((sign << 31 | Math.round(val / 1401298464324817e-60)) >>> 0, buf, pos);
            else {
              var exponent = Math.floor(Math.log(val) / Math.LN2), mantissa = Math.round(val * Math.pow(2, -exponent) * 8388608) & 8388607;
              writeUint((sign << 31 | exponent + 127 << 23 | mantissa) >>> 0, buf, pos);
            }
          }
          exports3.writeFloatLE = writeFloat_ieee754.bind(null, writeUintLE);
          exports3.writeFloatBE = writeFloat_ieee754.bind(null, writeUintBE);
          function readFloat_ieee754(readUint, buf, pos) {
            var uint = readUint(buf, pos), sign = (uint >> 31) * 2 + 1, exponent = uint >>> 23 & 255, mantissa = uint & 8388607;
            return exponent === 255 ? mantissa ? NaN : sign * Infinity : exponent === 0 ? sign * 1401298464324817e-60 * mantissa : sign * Math.pow(2, exponent - 150) * (mantissa + 8388608);
          }
          exports3.readFloatLE = readFloat_ieee754.bind(null, readUintLE);
          exports3.readFloatBE = readFloat_ieee754.bind(null, readUintBE);
        })();
      if (typeof Float64Array !== "undefined")
        (function() {
          var f64 = new Float64Array([-0]), f8b = new Uint8Array(f64.buffer), le = f8b[7] === 128;
          function writeDouble_f64_cpy(val, buf, pos) {
            f64[0] = val;
            buf[pos] = f8b[0];
            buf[pos + 1] = f8b[1];
            buf[pos + 2] = f8b[2];
            buf[pos + 3] = f8b[3];
            buf[pos + 4] = f8b[4];
            buf[pos + 5] = f8b[5];
            buf[pos + 6] = f8b[6];
            buf[pos + 7] = f8b[7];
          }
          function writeDouble_f64_rev(val, buf, pos) {
            f64[0] = val;
            buf[pos] = f8b[7];
            buf[pos + 1] = f8b[6];
            buf[pos + 2] = f8b[5];
            buf[pos + 3] = f8b[4];
            buf[pos + 4] = f8b[3];
            buf[pos + 5] = f8b[2];
            buf[pos + 6] = f8b[1];
            buf[pos + 7] = f8b[0];
          }
          exports3.writeDoubleLE = le ? writeDouble_f64_cpy : writeDouble_f64_rev;
          exports3.writeDoubleBE = le ? writeDouble_f64_rev : writeDouble_f64_cpy;
          function readDouble_f64_cpy(buf, pos) {
            f8b[0] = buf[pos];
            f8b[1] = buf[pos + 1];
            f8b[2] = buf[pos + 2];
            f8b[3] = buf[pos + 3];
            f8b[4] = buf[pos + 4];
            f8b[5] = buf[pos + 5];
            f8b[6] = buf[pos + 6];
            f8b[7] = buf[pos + 7];
            return f64[0];
          }
          function readDouble_f64_rev(buf, pos) {
            f8b[7] = buf[pos];
            f8b[6] = buf[pos + 1];
            f8b[5] = buf[pos + 2];
            f8b[4] = buf[pos + 3];
            f8b[3] = buf[pos + 4];
            f8b[2] = buf[pos + 5];
            f8b[1] = buf[pos + 6];
            f8b[0] = buf[pos + 7];
            return f64[0];
          }
          exports3.readDoubleLE = le ? readDouble_f64_cpy : readDouble_f64_rev;
          exports3.readDoubleBE = le ? readDouble_f64_rev : readDouble_f64_cpy;
        })();
      else
        (function() {
          function writeDouble_ieee754(writeUint, off0, off1, val, buf, pos) {
            var sign = val < 0 ? 1 : 0;
            if (sign)
              val = -val;
            if (val === 0) {
              writeUint(0, buf, pos + off0);
              writeUint(1 / val > 0 ? (
                /* positive */
                0
              ) : (
                /* negative 0 */
                2147483648
              ), buf, pos + off1);
            } else if (isNaN(val)) {
              writeUint(0, buf, pos + off0);
              writeUint(2146959360, buf, pos + off1);
            } else if (val > 17976931348623157e292) {
              writeUint(0, buf, pos + off0);
              writeUint((sign << 31 | 2146435072) >>> 0, buf, pos + off1);
            } else {
              var mantissa;
              if (val < 22250738585072014e-324) {
                mantissa = val / 5e-324;
                writeUint(mantissa >>> 0, buf, pos + off0);
                writeUint((sign << 31 | mantissa / 4294967296) >>> 0, buf, pos + off1);
              } else {
                var exponent = Math.floor(Math.log(val) / Math.LN2);
                if (exponent === 1024)
                  exponent = 1023;
                mantissa = val * Math.pow(2, -exponent);
                writeUint(mantissa * 4503599627370496 >>> 0, buf, pos + off0);
                writeUint((sign << 31 | exponent + 1023 << 20 | mantissa * 1048576 & 1048575) >>> 0, buf, pos + off1);
              }
            }
          }
          exports3.writeDoubleLE = writeDouble_ieee754.bind(null, writeUintLE, 0, 4);
          exports3.writeDoubleBE = writeDouble_ieee754.bind(null, writeUintBE, 4, 0);
          function readDouble_ieee754(readUint, off0, off1, buf, pos) {
            var lo = readUint(buf, pos + off0), hi = readUint(buf, pos + off1);
            var sign = (hi >> 31) * 2 + 1, exponent = hi >>> 20 & 2047, mantissa = 4294967296 * (hi & 1048575) + lo;
            return exponent === 2047 ? mantissa ? NaN : sign * Infinity : exponent === 0 ? sign * 5e-324 * mantissa : sign * Math.pow(2, exponent - 1075) * (mantissa + 4503599627370496);
          }
          exports3.readDoubleLE = readDouble_ieee754.bind(null, readUintLE, 0, 4);
          exports3.readDoubleBE = readDouble_ieee754.bind(null, readUintBE, 4, 0);
        })();
      return exports3;
    }
    function writeUintLE(val, buf, pos) {
      buf[pos] = val & 255;
      buf[pos + 1] = val >>> 8 & 255;
      buf[pos + 2] = val >>> 16 & 255;
      buf[pos + 3] = val >>> 24;
    }
    function writeUintBE(val, buf, pos) {
      buf[pos] = val >>> 24;
      buf[pos + 1] = val >>> 16 & 255;
      buf[pos + 2] = val >>> 8 & 255;
      buf[pos + 3] = val & 255;
    }
    function readUintLE(buf, pos) {
      return (buf[pos] | buf[pos + 1] << 8 | buf[pos + 2] << 16 | buf[pos + 3] << 24) >>> 0;
    }
    function readUintBE(buf, pos) {
      return (buf[pos] << 24 | buf[pos + 1] << 16 | buf[pos + 2] << 8 | buf[pos + 3]) >>> 0;
    }
  }
});

// node_modules/@protobufjs/inquire/index.js
var require_inquire = __commonJS({
  "node_modules/@protobufjs/inquire/index.js"(exports, module) {
    "use strict";
    module.exports = inquire;
    function inquire(moduleName) {
      try {
        var mod = eval("quire".replace(/^/, "re"))(moduleName);
        if (mod && (mod.length || Object.keys(mod).length))
          return mod;
      } catch (e) {
      }
      return null;
    }
  }
});

// node_modules/@protobufjs/utf8/index.js
var require_utf8 = __commonJS({
  "node_modules/@protobufjs/utf8/index.js"(exports2) {
    "use strict";
    var utf83 = exports2;
    utf83.length = function utf8_length(string) {
      var len = 0, c = 0;
      for (var i = 0; i < string.length; ++i) {
        c = string.charCodeAt(i);
        if (c < 128)
          len += 1;
        else if (c < 2048)
          len += 2;
        else if ((c & 64512) === 55296 && (string.charCodeAt(i + 1) & 64512) === 56320) {
          ++i;
          len += 4;
        } else
          len += 3;
      }
      return len;
    };
    utf83.read = function utf8_read(buffer2, start, end) {
      var len = end - start;
      if (len < 1)
        return "";
      var parts = null, chunk = [], i = 0, t;
      while (start < end) {
        t = buffer2[start++];
        if (t < 128)
          chunk[i++] = t;
        else if (t > 191 && t < 224)
          chunk[i++] = (t & 31) << 6 | buffer2[start++] & 63;
        else if (t > 239 && t < 365) {
          t = ((t & 7) << 18 | (buffer2[start++] & 63) << 12 | (buffer2[start++] & 63) << 6 | buffer2[start++] & 63) - 65536;
          chunk[i++] = 55296 + (t >> 10);
          chunk[i++] = 56320 + (t & 1023);
        } else
          chunk[i++] = (t & 15) << 12 | (buffer2[start++] & 63) << 6 | buffer2[start++] & 63;
        if (i > 8191) {
          (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
          i = 0;
        }
      }
      if (parts) {
        if (i)
          parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)));
        return parts.join("");
      }
      return String.fromCharCode.apply(String, chunk.slice(0, i));
    };
    utf83.write = function utf8_write(string, buffer2, offset) {
      var start = offset, c1, c2;
      for (var i = 0; i < string.length; ++i) {
        c1 = string.charCodeAt(i);
        if (c1 < 128) {
          buffer2[offset++] = c1;
        } else if (c1 < 2048) {
          buffer2[offset++] = c1 >> 6 | 192;
          buffer2[offset++] = c1 & 63 | 128;
        } else if ((c1 & 64512) === 55296 && ((c2 = string.charCodeAt(i + 1)) & 64512) === 56320) {
          c1 = 65536 + ((c1 & 1023) << 10) + (c2 & 1023);
          ++i;
          buffer2[offset++] = c1 >> 18 | 240;
          buffer2[offset++] = c1 >> 12 & 63 | 128;
          buffer2[offset++] = c1 >> 6 & 63 | 128;
          buffer2[offset++] = c1 & 63 | 128;
        } else {
          buffer2[offset++] = c1 >> 12 | 224;
          buffer2[offset++] = c1 >> 6 & 63 | 128;
          buffer2[offset++] = c1 & 63 | 128;
        }
      }
      return offset - start;
    };
  }
});

// node_modules/@protobufjs/pool/index.js
var require_pool = __commonJS({
  "node_modules/@protobufjs/pool/index.js"(exports2, module2) {
    "use strict";
    module2.exports = pool;
    function pool(alloc, slice, size) {
      var SIZE = size || 8192;
      var MAX = SIZE >>> 1;
      var slab = null;
      var offset = SIZE;
      return function pool_alloc(size2) {
        if (size2 < 1 || size2 > MAX)
          return alloc(size2);
        if (offset + size2 > SIZE) {
          slab = alloc(SIZE);
          offset = 0;
        }
        var buf = slice.call(slab, offset, offset += size2);
        if (offset & 7)
          offset = (offset | 7) + 1;
        return buf;
      };
    }
  }
});

// node_modules/protobufjs/src/util/longbits.js
var require_longbits = __commonJS({
  "node_modules/protobufjs/src/util/longbits.js"(exports2, module2) {
    "use strict";
    module2.exports = LongBits;
    var util = require_minimal();
    function LongBits(lo, hi) {
      this.lo = lo >>> 0;
      this.hi = hi >>> 0;
    }
    var zero = LongBits.zero = new LongBits(0, 0);
    zero.toNumber = function() {
      return 0;
    };
    zero.zzEncode = zero.zzDecode = function() {
      return this;
    };
    zero.length = function() {
      return 1;
    };
    var zeroHash = LongBits.zeroHash = "\0\0\0\0\0\0\0\0";
    LongBits.fromNumber = function fromNumber2(value) {
      if (value === 0)
        return zero;
      var sign = value < 0;
      if (sign)
        value = -value;
      var lo = value >>> 0, hi = (value - lo) / 4294967296 >>> 0;
      if (sign) {
        hi = ~hi >>> 0;
        lo = ~lo >>> 0;
        if (++lo > 4294967295) {
          lo = 0;
          if (++hi > 4294967295)
            hi = 0;
        }
      }
      return new LongBits(lo, hi);
    };
    LongBits.from = function from(value) {
      if (typeof value === "number")
        return LongBits.fromNumber(value);
      if (util.isString(value)) {
        if (util.Long)
          value = util.Long.fromString(value);
        else
          return LongBits.fromNumber(parseInt(value, 10));
      }
      return value.low || value.high ? new LongBits(value.low >>> 0, value.high >>> 0) : zero;
    };
    LongBits.prototype.toNumber = function toNumber2(unsigned) {
      if (!unsigned && this.hi >>> 31) {
        var lo = ~this.lo + 1 >>> 0, hi = ~this.hi >>> 0;
        if (!lo)
          hi = hi + 1 >>> 0;
        return -(lo + hi * 4294967296);
      }
      return this.lo + this.hi * 4294967296;
    };
    LongBits.prototype.toLong = function toLong(unsigned) {
      return util.Long ? new util.Long(this.lo | 0, this.hi | 0, Boolean(unsigned)) : { low: this.lo | 0, high: this.hi | 0, unsigned: Boolean(unsigned) };
    };
    var charCodeAt = String.prototype.charCodeAt;
    LongBits.fromHash = function fromHash(hash) {
      if (hash === zeroHash)
        return zero;
      return new LongBits(
        (charCodeAt.call(hash, 0) | charCodeAt.call(hash, 1) << 8 | charCodeAt.call(hash, 2) << 16 | charCodeAt.call(hash, 3) << 24) >>> 0,
        (charCodeAt.call(hash, 4) | charCodeAt.call(hash, 5) << 8 | charCodeAt.call(hash, 6) << 16 | charCodeAt.call(hash, 7) << 24) >>> 0
      );
    };
    LongBits.prototype.toHash = function toHash() {
      return String.fromCharCode(
        this.lo & 255,
        this.lo >>> 8 & 255,
        this.lo >>> 16 & 255,
        this.lo >>> 24,
        this.hi & 255,
        this.hi >>> 8 & 255,
        this.hi >>> 16 & 255,
        this.hi >>> 24
      );
    };
    LongBits.prototype.zzEncode = function zzEncode() {
      var mask = this.hi >> 31;
      this.hi = ((this.hi << 1 | this.lo >>> 31) ^ mask) >>> 0;
      this.lo = (this.lo << 1 ^ mask) >>> 0;
      return this;
    };
    LongBits.prototype.zzDecode = function zzDecode() {
      var mask = -(this.lo & 1);
      this.lo = ((this.lo >>> 1 | this.hi << 31) ^ mask) >>> 0;
      this.hi = (this.hi >>> 1 ^ mask) >>> 0;
      return this;
    };
    LongBits.prototype.length = function length2() {
      var part0 = this.lo, part1 = (this.lo >>> 28 | this.hi << 4) >>> 0, part2 = this.hi >>> 24;
      return part2 === 0 ? part1 === 0 ? part0 < 16384 ? part0 < 128 ? 1 : 2 : part0 < 2097152 ? 3 : 4 : part1 < 16384 ? part1 < 128 ? 5 : 6 : part1 < 2097152 ? 7 : 8 : part2 < 128 ? 9 : 10;
    };
  }
});

// node_modules/protobufjs/src/util/minimal.js
var require_minimal = __commonJS({
  "node_modules/protobufjs/src/util/minimal.js"(exports2) {
    "use strict";
    var util = exports2;
    util.asPromise = require_aspromise();
    util.base64 = require_base64();
    util.EventEmitter = require_eventemitter();
    util.float = require_float();
    util.inquire = require_inquire();
    util.utf8 = require_utf8();
    util.pool = require_pool();
    util.LongBits = require_longbits();
    util.isNode = Boolean(typeof global !== "undefined" && global && global.process && global.process.versions && global.process.versions.node);
    util.global = util.isNode && global || false || typeof self !== "undefined" && self || exports2;
    util.emptyArray = Object.freeze ? Object.freeze([]) : (
      /* istanbul ignore next */
      []
    );
    util.emptyObject = Object.freeze ? Object.freeze({}) : (
      /* istanbul ignore next */
      {}
    );
    util.isInteger = Number.isInteger || /* istanbul ignore next */
    function isInteger(value) {
      return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
    };
    util.isString = function isString(value) {
      return typeof value === "string" || value instanceof String;
    };
    util.isObject = function isObject3(value) {
      return value && typeof value === "object";
    };
    util.isset = /**
     * Checks if a property on a message is considered to be present.
     * @param {Object} obj Plain object or message instance
     * @param {string} prop Property name
     * @returns {boolean} `true` if considered to be present, otherwise `false`
     */
    util.isSet = function isSet3(obj, prop) {
      var value = obj[prop];
      if (value != null && obj.hasOwnProperty(prop))
        return typeof value !== "object" || (Array.isArray(value) ? value.length : Object.keys(value).length) > 0;
      return false;
    };
    util.Buffer = function() {
      try {
        var Buffer2 = util.inquire("buffer").Buffer;
        return Buffer2.prototype.utf8Write ? Buffer2 : (
          /* istanbul ignore next */
          null
        );
      } catch (e) {
        return null;
      }
    }();
    util._Buffer_from = null;
    util._Buffer_allocUnsafe = null;
    util.newBuffer = function newBuffer(sizeOrArray) {
      return typeof sizeOrArray === "number" ? util.Buffer ? util._Buffer_allocUnsafe(sizeOrArray) : new util.Array(sizeOrArray) : util.Buffer ? util._Buffer_from(sizeOrArray) : typeof Uint8Array === "undefined" ? sizeOrArray : new Uint8Array(sizeOrArray);
    };
    util.Array = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
    util.Long = /* istanbul ignore next */
    util.global.dcodeIO && /* istanbul ignore next */
    util.global.dcodeIO.Long || /* istanbul ignore next */
    util.global.Long || util.inquire("long");
    util.key2Re = /^true|false|0|1$/;
    util.key32Re = /^-?(?:0|[1-9][0-9]*)$/;
    util.key64Re = /^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;
    util.longToHash = function longToHash(value) {
      return value ? util.LongBits.from(value).toHash() : util.LongBits.zeroHash;
    };
    util.longFromHash = function longFromHash(hash, unsigned) {
      var bits = util.LongBits.fromHash(hash);
      if (util.Long)
        return util.Long.fromBits(bits.lo, bits.hi, unsigned);
      return bits.toNumber(Boolean(unsigned));
    };
    function merge(dst, src, ifNotSet) {
      for (var keys = Object.keys(src), i = 0; i < keys.length; ++i)
        if (dst[keys[i]] === void 0 || !ifNotSet)
          dst[keys[i]] = src[keys[i]];
      return dst;
    }
    util.merge = merge;
    util.lcFirst = function lcFirst(str) {
      return str.charAt(0).toLowerCase() + str.substring(1);
    };
    function newError(name) {
      function CustomError(message, properties) {
        if (!(this instanceof CustomError))
          return new CustomError(message, properties);
        Object.defineProperty(this, "message", { get: function() {
          return message;
        } });
        if (Error.captureStackTrace)
          Error.captureStackTrace(this, CustomError);
        else
          Object.defineProperty(this, "stack", { value: new Error().stack || "" });
        if (properties)
          merge(this, properties);
      }
      CustomError.prototype = Object.create(Error.prototype, {
        constructor: {
          value: CustomError,
          writable: true,
          enumerable: false,
          configurable: true
        },
        name: {
          get: function get() {
            return name;
          },
          set: void 0,
          enumerable: false,
          // configurable: false would accurately preserve the behavior of
          // the original, but I'm guessing that was not intentional.
          // For an actual error subclass, this property would
          // be configurable.
          configurable: true
        },
        toString: {
          value: function value() {
            return this.name + ": " + this.message;
          },
          writable: true,
          enumerable: false,
          configurable: true
        }
      });
      return CustomError;
    }
    util.newError = newError;
    util.ProtocolError = newError("ProtocolError");
    util.oneOfGetter = function getOneOf(fieldNames) {
      var fieldMap = {};
      for (var i = 0; i < fieldNames.length; ++i)
        fieldMap[fieldNames[i]] = 1;
      return function() {
        for (var keys = Object.keys(this), i2 = keys.length - 1; i2 > -1; --i2)
          if (fieldMap[keys[i2]] === 1 && this[keys[i2]] !== void 0 && this[keys[i2]] !== null)
            return keys[i2];
      };
    };
    util.oneOfSetter = function setOneOf(fieldNames) {
      return function(name) {
        for (var i = 0; i < fieldNames.length; ++i)
          if (fieldNames[i] !== name)
            delete this[fieldNames[i]];
      };
    };
    util.toJSONOptions = {
      longs: String,
      enums: String,
      bytes: String,
      json: true
    };
    util._configure = function() {
      var Buffer2 = util.Buffer;
      if (!Buffer2) {
        util._Buffer_from = util._Buffer_allocUnsafe = null;
        return;
      }
      util._Buffer_from = Buffer2.from !== Uint8Array.from && Buffer2.from || /* istanbul ignore next */
      function Buffer_from(value, encoding) {
        return new Buffer2(value, encoding);
      };
      util._Buffer_allocUnsafe = Buffer2.allocUnsafe || /* istanbul ignore next */
      function Buffer_allocUnsafe(size) {
        return new Buffer2(size);
      };
    };
  }
});

// node_modules/protobufjs/src/writer.js
var require_writer = __commonJS({
  "node_modules/protobufjs/src/writer.js"(exports2, module2) {
    "use strict";
    module2.exports = Writer;
    var util = require_minimal();
    var BufferWriter;
    var LongBits = util.LongBits;
    var base64 = util.base64;
    var utf83 = util.utf8;
    function Op(fn, len, val) {
      this.fn = fn;
      this.len = len;
      this.next = void 0;
      this.val = val;
    }
    function noop() {
    }
    function State(writer) {
      this.head = writer.head;
      this.tail = writer.tail;
      this.len = writer.len;
      this.next = writer.states;
    }
    function Writer() {
      this.len = 0;
      this.head = new Op(noop, 0, 0);
      this.tail = this.head;
      this.states = null;
    }
    var create = function create2() {
      return util.Buffer ? function create_buffer_setup() {
        return (Writer.create = function create_buffer() {
          return new BufferWriter();
        })();
      } : function create_array() {
        return new Writer();
      };
    };
    Writer.create = create();
    Writer.alloc = function alloc(size) {
      return new util.Array(size);
    };
    if (util.Array !== Array)
      Writer.alloc = util.pool(Writer.alloc, util.Array.prototype.subarray);
    Writer.prototype._push = function push(fn, len, val) {
      this.tail = this.tail.next = new Op(fn, len, val);
      this.len += len;
      return this;
    };
    function writeByte(val, buf, pos) {
      buf[pos] = val & 255;
    }
    function writeVarint32(val, buf, pos) {
      while (val > 127) {
        buf[pos++] = val & 127 | 128;
        val >>>= 7;
      }
      buf[pos] = val;
    }
    function VarintOp(len, val) {
      this.len = len;
      this.next = void 0;
      this.val = val;
    }
    VarintOp.prototype = Object.create(Op.prototype);
    VarintOp.prototype.fn = writeVarint32;
    Writer.prototype.uint32 = function write_uint32(value) {
      this.len += (this.tail = this.tail.next = new VarintOp(
        (value = value >>> 0) < 128 ? 1 : value < 16384 ? 2 : value < 2097152 ? 3 : value < 268435456 ? 4 : 5,
        value
      )).len;
      return this;
    };
    Writer.prototype.int32 = function write_int32(value) {
      return value < 0 ? this._push(writeVarint64, 10, LongBits.fromNumber(value)) : this.uint32(value);
    };
    Writer.prototype.sint32 = function write_sint32(value) {
      return this.uint32((value << 1 ^ value >> 31) >>> 0);
    };
    function writeVarint64(val, buf, pos) {
      while (val.hi) {
        buf[pos++] = val.lo & 127 | 128;
        val.lo = (val.lo >>> 7 | val.hi << 25) >>> 0;
        val.hi >>>= 7;
      }
      while (val.lo > 127) {
        buf[pos++] = val.lo & 127 | 128;
        val.lo = val.lo >>> 7;
      }
      buf[pos++] = val.lo;
    }
    Writer.prototype.uint64 = function write_uint64(value) {
      var bits = LongBits.from(value);
      return this._push(writeVarint64, bits.length(), bits);
    };
    Writer.prototype.int64 = Writer.prototype.uint64;
    Writer.prototype.sint64 = function write_sint64(value) {
      var bits = LongBits.from(value).zzEncode();
      return this._push(writeVarint64, bits.length(), bits);
    };
    Writer.prototype.bool = function write_bool(value) {
      return this._push(writeByte, 1, value ? 1 : 0);
    };
    function writeFixed32(val, buf, pos) {
      buf[pos] = val & 255;
      buf[pos + 1] = val >>> 8 & 255;
      buf[pos + 2] = val >>> 16 & 255;
      buf[pos + 3] = val >>> 24;
    }
    Writer.prototype.fixed32 = function write_fixed32(value) {
      return this._push(writeFixed32, 4, value >>> 0);
    };
    Writer.prototype.sfixed32 = Writer.prototype.fixed32;
    Writer.prototype.fixed64 = function write_fixed64(value) {
      var bits = LongBits.from(value);
      return this._push(writeFixed32, 4, bits.lo)._push(writeFixed32, 4, bits.hi);
    };
    Writer.prototype.sfixed64 = Writer.prototype.fixed64;
    Writer.prototype.float = function write_float(value) {
      return this._push(util.float.writeFloatLE, 4, value);
    };
    Writer.prototype.double = function write_double(value) {
      return this._push(util.float.writeDoubleLE, 8, value);
    };
    var writeBytes = util.Array.prototype.set ? function writeBytes_set(val, buf, pos) {
      buf.set(val, pos);
    } : function writeBytes_for(val, buf, pos) {
      for (var i = 0; i < val.length; ++i)
        buf[pos + i] = val[i];
    };
    Writer.prototype.bytes = function write_bytes(value) {
      var len = value.length >>> 0;
      if (!len)
        return this._push(writeByte, 1, 0);
      if (util.isString(value)) {
        var buf = Writer.alloc(len = base64.length(value));
        base64.decode(value, buf, 0);
        value = buf;
      }
      return this.uint32(len)._push(writeBytes, len, value);
    };
    Writer.prototype.string = function write_string(value) {
      var len = utf83.length(value);
      return len ? this.uint32(len)._push(utf83.write, len, value) : this._push(writeByte, 1, 0);
    };
    Writer.prototype.fork = function fork() {
      this.states = new State(this);
      this.head = this.tail = new Op(noop, 0, 0);
      this.len = 0;
      return this;
    };
    Writer.prototype.reset = function reset() {
      if (this.states) {
        this.head = this.states.head;
        this.tail = this.states.tail;
        this.len = this.states.len;
        this.states = this.states.next;
      } else {
        this.head = this.tail = new Op(noop, 0, 0);
        this.len = 0;
      }
      return this;
    };
    Writer.prototype.ldelim = function ldelim() {
      var head = this.head, tail = this.tail, len = this.len;
      this.reset().uint32(len);
      if (len) {
        this.tail.next = head.next;
        this.tail = tail;
        this.len += len;
      }
      return this;
    };
    Writer.prototype.finish = function finish() {
      var head = this.head.next, buf = this.constructor.alloc(this.len), pos = 0;
      while (head) {
        head.fn(head.val, buf, pos);
        pos += head.len;
        head = head.next;
      }
      return buf;
    };
    Writer._configure = function(BufferWriter_) {
      BufferWriter = BufferWriter_;
      Writer.create = create();
      BufferWriter._configure();
    };
  }
});

// node_modules/protobufjs/src/writer_buffer.js
var require_writer_buffer = __commonJS({
  "node_modules/protobufjs/src/writer_buffer.js"(exports2, module2) {
    "use strict";
    module2.exports = BufferWriter;
    var Writer = require_writer();
    (BufferWriter.prototype = Object.create(Writer.prototype)).constructor = BufferWriter;
    var util = require_minimal();
    function BufferWriter() {
      Writer.call(this);
    }
    BufferWriter._configure = function() {
      BufferWriter.alloc = util._Buffer_allocUnsafe;
      BufferWriter.writeBytesBuffer = util.Buffer && util.Buffer.prototype instanceof Uint8Array && util.Buffer.prototype.set.name === "set" ? function writeBytesBuffer_set(val, buf, pos) {
        buf.set(val, pos);
      } : function writeBytesBuffer_copy(val, buf, pos) {
        if (val.copy)
          val.copy(buf, pos, 0, val.length);
        else
          for (var i = 0; i < val.length; )
            buf[pos++] = val[i++];
      };
    };
    BufferWriter.prototype.bytes = function write_bytes_buffer(value) {
      if (util.isString(value))
        value = util._Buffer_from(value, "base64");
      var len = value.length >>> 0;
      this.uint32(len);
      if (len)
        this._push(BufferWriter.writeBytesBuffer, len, value);
      return this;
    };
    function writeStringBuffer(val, buf, pos) {
      if (val.length < 40)
        util.utf8.write(val, buf, pos);
      else if (buf.utf8Write)
        buf.utf8Write(val, pos);
      else
        buf.write(val, pos);
    }
    BufferWriter.prototype.string = function write_string_buffer(value) {
      var len = util.Buffer.byteLength(value);
      this.uint32(len);
      if (len)
        this._push(writeStringBuffer, len, value);
      return this;
    };
    BufferWriter._configure();
  }
});

// node_modules/protobufjs/src/reader.js
var require_reader = __commonJS({
  "node_modules/protobufjs/src/reader.js"(exports2, module2) {
    "use strict";
    module2.exports = Reader;
    var util = require_minimal();
    var BufferReader;
    var LongBits = util.LongBits;
    var utf83 = util.utf8;
    function indexOutOfRange(reader, writeLength) {
      return RangeError("index out of range: " + reader.pos + " + " + (writeLength || 1) + " > " + reader.len);
    }
    function Reader(buffer2) {
      this.buf = buffer2;
      this.pos = 0;
      this.len = buffer2.length;
    }
    var create_array = typeof Uint8Array !== "undefined" ? function create_typed_array(buffer2) {
      if (buffer2 instanceof Uint8Array || Array.isArray(buffer2))
        return new Reader(buffer2);
      throw Error("illegal buffer");
    } : function create_array2(buffer2) {
      if (Array.isArray(buffer2))
        return new Reader(buffer2);
      throw Error("illegal buffer");
    };
    var create = function create2() {
      return util.Buffer ? function create_buffer_setup(buffer2) {
        return (Reader.create = function create_buffer(buffer3) {
          return util.Buffer.isBuffer(buffer3) ? new BufferReader(buffer3) : create_array(buffer3);
        })(buffer2);
      } : create_array;
    };
    Reader.create = create();
    Reader.prototype._slice = util.Array.prototype.subarray || /* istanbul ignore next */
    util.Array.prototype.slice;
    Reader.prototype.uint32 = function read_uint32_setup() {
      var value = 4294967295;
      return function read_uint32() {
        value = (this.buf[this.pos] & 127) >>> 0;
        if (this.buf[this.pos++] < 128)
          return value;
        value = (value | (this.buf[this.pos] & 127) << 7) >>> 0;
        if (this.buf[this.pos++] < 128)
          return value;
        value = (value | (this.buf[this.pos] & 127) << 14) >>> 0;
        if (this.buf[this.pos++] < 128)
          return value;
        value = (value | (this.buf[this.pos] & 127) << 21) >>> 0;
        if (this.buf[this.pos++] < 128)
          return value;
        value = (value | (this.buf[this.pos] & 15) << 28) >>> 0;
        if (this.buf[this.pos++] < 128)
          return value;
        if ((this.pos += 5) > this.len) {
          this.pos = this.len;
          throw indexOutOfRange(this, 10);
        }
        return value;
      };
    }();
    Reader.prototype.int32 = function read_int32() {
      return this.uint32() | 0;
    };
    Reader.prototype.sint32 = function read_sint32() {
      var value = this.uint32();
      return value >>> 1 ^ -(value & 1) | 0;
    };
    function readLongVarint() {
      var bits = new LongBits(0, 0);
      var i = 0;
      if (this.len - this.pos > 4) {
        for (; i < 4; ++i) {
          bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
          if (this.buf[this.pos++] < 128)
            return bits;
        }
        bits.lo = (bits.lo | (this.buf[this.pos] & 127) << 28) >>> 0;
        bits.hi = (bits.hi | (this.buf[this.pos] & 127) >> 4) >>> 0;
        if (this.buf[this.pos++] < 128)
          return bits;
        i = 0;
      } else {
        for (; i < 3; ++i) {
          if (this.pos >= this.len)
            throw indexOutOfRange(this);
          bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
          if (this.buf[this.pos++] < 128)
            return bits;
        }
        bits.lo = (bits.lo | (this.buf[this.pos++] & 127) << i * 7) >>> 0;
        return bits;
      }
      if (this.len - this.pos > 4) {
        for (; i < 5; ++i) {
          bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
          if (this.buf[this.pos++] < 128)
            return bits;
        }
      } else {
        for (; i < 5; ++i) {
          if (this.pos >= this.len)
            throw indexOutOfRange(this);
          bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
          if (this.buf[this.pos++] < 128)
            return bits;
        }
      }
      throw Error("invalid varint encoding");
    }
    Reader.prototype.bool = function read_bool() {
      return this.uint32() !== 0;
    };
    function readFixed32_end(buf, end) {
      return (buf[end - 4] | buf[end - 3] << 8 | buf[end - 2] << 16 | buf[end - 1] << 24) >>> 0;
    }
    Reader.prototype.fixed32 = function read_fixed32() {
      if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);
      return readFixed32_end(this.buf, this.pos += 4);
    };
    Reader.prototype.sfixed32 = function read_sfixed32() {
      if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);
      return readFixed32_end(this.buf, this.pos += 4) | 0;
    };
    function readFixed64() {
      if (this.pos + 8 > this.len)
        throw indexOutOfRange(this, 8);
      return new LongBits(readFixed32_end(this.buf, this.pos += 4), readFixed32_end(this.buf, this.pos += 4));
    }
    Reader.prototype.float = function read_float() {
      if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);
      var value = util.float.readFloatLE(this.buf, this.pos);
      this.pos += 4;
      return value;
    };
    Reader.prototype.double = function read_double() {
      if (this.pos + 8 > this.len)
        throw indexOutOfRange(this, 4);
      var value = util.float.readDoubleLE(this.buf, this.pos);
      this.pos += 8;
      return value;
    };
    Reader.prototype.bytes = function read_bytes() {
      var length2 = this.uint32(), start = this.pos, end = this.pos + length2;
      if (end > this.len)
        throw indexOutOfRange(this, length2);
      this.pos += length2;
      if (Array.isArray(this.buf))
        return this.buf.slice(start, end);
      if (start === end) {
        var nativeBuffer = util.Buffer;
        return nativeBuffer ? nativeBuffer.alloc(0) : new this.buf.constructor(0);
      }
      return this._slice.call(this.buf, start, end);
    };
    Reader.prototype.string = function read_string() {
      var bytes = this.bytes();
      return utf83.read(bytes, 0, bytes.length);
    };
    Reader.prototype.skip = function skip(length2) {
      if (typeof length2 === "number") {
        if (this.pos + length2 > this.len)
          throw indexOutOfRange(this, length2);
        this.pos += length2;
      } else {
        do {
          if (this.pos >= this.len)
            throw indexOutOfRange(this);
        } while (this.buf[this.pos++] & 128);
      }
      return this;
    };
    Reader.prototype.skipType = function(wireType) {
      switch (wireType) {
        case 0:
          this.skip();
          break;
        case 1:
          this.skip(8);
          break;
        case 2:
          this.skip(this.uint32());
          break;
        case 3:
          while ((wireType = this.uint32() & 7) !== 4) {
            this.skipType(wireType);
          }
          break;
        case 5:
          this.skip(4);
          break;
        default:
          throw Error("invalid wire type " + wireType + " at offset " + this.pos);
      }
      return this;
    };
    Reader._configure = function(BufferReader_) {
      BufferReader = BufferReader_;
      Reader.create = create();
      BufferReader._configure();
      var fn = util.Long ? "toLong" : (
        /* istanbul ignore next */
        "toNumber"
      );
      util.merge(Reader.prototype, {
        int64: function read_int64() {
          return readLongVarint.call(this)[fn](false);
        },
        uint64: function read_uint64() {
          return readLongVarint.call(this)[fn](true);
        },
        sint64: function read_sint64() {
          return readLongVarint.call(this).zzDecode()[fn](false);
        },
        fixed64: function read_fixed64() {
          return readFixed64.call(this)[fn](true);
        },
        sfixed64: function read_sfixed64() {
          return readFixed64.call(this)[fn](false);
        }
      });
    };
  }
});

// node_modules/protobufjs/src/reader_buffer.js
var require_reader_buffer = __commonJS({
  "node_modules/protobufjs/src/reader_buffer.js"(exports2, module2) {
    "use strict";
    module2.exports = BufferReader;
    var Reader = require_reader();
    (BufferReader.prototype = Object.create(Reader.prototype)).constructor = BufferReader;
    var util = require_minimal();
    function BufferReader(buffer2) {
      Reader.call(this, buffer2);
    }
    BufferReader._configure = function() {
      if (util.Buffer)
        BufferReader.prototype._slice = util.Buffer.prototype.slice;
    };
    BufferReader.prototype.string = function read_string_buffer() {
      var len = this.uint32();
      return this.buf.utf8Slice ? this.buf.utf8Slice(this.pos, this.pos = Math.min(this.pos + len, this.len)) : this.buf.toString("utf-8", this.pos, this.pos = Math.min(this.pos + len, this.len));
    };
    BufferReader._configure();
  }
});

// node_modules/protobufjs/src/rpc/service.js
var require_service = __commonJS({
  "node_modules/protobufjs/src/rpc/service.js"(exports2, module2) {
    "use strict";
    module2.exports = Service;
    var util = require_minimal();
    (Service.prototype = Object.create(util.EventEmitter.prototype)).constructor = Service;
    function Service(rpcImpl, requestDelimited, responseDelimited) {
      if (typeof rpcImpl !== "function")
        throw TypeError("rpcImpl must be a function");
      util.EventEmitter.call(this);
      this.rpcImpl = rpcImpl;
      this.requestDelimited = Boolean(requestDelimited);
      this.responseDelimited = Boolean(responseDelimited);
    }
    Service.prototype.rpcCall = function rpcCall(method, requestCtor, responseCtor, request, callback) {
      if (!request)
        throw TypeError("request must be specified");
      var self2 = this;
      if (!callback)
        return util.asPromise(rpcCall, self2, method, requestCtor, responseCtor, request);
      if (!self2.rpcImpl) {
        setTimeout(function() {
          callback(Error("already ended"));
        }, 0);
        return void 0;
      }
      try {
        return self2.rpcImpl(
          method,
          requestCtor[self2.requestDelimited ? "encodeDelimited" : "encode"](request).finish(),
          function rpcCallback(err, response) {
            if (err) {
              self2.emit("error", err, method);
              return callback(err);
            }
            if (response === null) {
              self2.end(
                /* endedByRPC */
                true
              );
              return void 0;
            }
            if (!(response instanceof responseCtor)) {
              try {
                response = responseCtor[self2.responseDelimited ? "decodeDelimited" : "decode"](response);
              } catch (err2) {
                self2.emit("error", err2, method);
                return callback(err2);
              }
            }
            self2.emit("data", response, method);
            return callback(null, response);
          }
        );
      } catch (err) {
        self2.emit("error", err, method);
        setTimeout(function() {
          callback(err);
        }, 0);
        return void 0;
      }
    };
    Service.prototype.end = function end(endedByRPC) {
      if (this.rpcImpl) {
        if (!endedByRPC)
          this.rpcImpl(null, null, null);
        this.rpcImpl = null;
        this.emit("end").off();
      }
      return this;
    };
  }
});

// node_modules/protobufjs/src/rpc.js
var require_rpc = __commonJS({
  "node_modules/protobufjs/src/rpc.js"(exports2) {
    "use strict";
    var rpc = exports2;
    rpc.Service = require_service();
  }
});

// node_modules/protobufjs/src/roots.js
var require_roots = __commonJS({
  "node_modules/protobufjs/src/roots.js"(exports2, module2) {
    "use strict";
    module2.exports = {};
  }
});

// node_modules/protobufjs/src/index-minimal.js
var require_index_minimal = __commonJS({
  "node_modules/protobufjs/src/index-minimal.js"(exports2) {
    "use strict";
    var protobuf = exports2;
    protobuf.build = "minimal";
    protobuf.Writer = require_writer();
    protobuf.BufferWriter = require_writer_buffer();
    protobuf.Reader = require_reader();
    protobuf.BufferReader = require_reader_buffer();
    protobuf.util = require_minimal();
    protobuf.rpc = require_rpc();
    protobuf.roots = require_roots();
    protobuf.configure = configure;
    function configure() {
      protobuf.util._configure();
      protobuf.Writer._configure(protobuf.BufferWriter);
      protobuf.Reader._configure(protobuf.BufferReader);
    }
    configure();
  }
});

// node_modules/protobufjs/minimal.js
var require_minimal2 = __commonJS({
  "node_modules/protobufjs/minimal.js"(exports2, module2) {
    "use strict";
    module2.exports = require_index_minimal();
  }
});

// src/index.ts.entry-point.ts
var index_ts_entry_point_exports = {};
__export(index_ts_entry_point_exports, {
  main: () => main,
  onStart: () => onStart,
  onUpdate: () => onUpdate,
  rendererTransport: () => rendererTransport
});
module.exports = __toCommonJS(index_ts_entry_point_exports);

// node_modules/@dcl/ecs/dist/components/generated/pb/decentraland/sdk/components/animator.gen.js
var import_minimal = __toESM(require_minimal2());
function createBasePBAnimator() {
  return { states: [] };
}
var PBAnimator;
(function(PBAnimator2) {
  function encode(message, writer = import_minimal.default.Writer.create()) {
    for (const v of message.states) {
      PBAnimationState.encode(v, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  }
  PBAnimator2.encode = encode;
  function decode(input, length2) {
    const reader = input instanceof import_minimal.default.Reader ? input : import_minimal.default.Reader.create(input);
    let end = length2 === void 0 ? reader.len : reader.pos + length2;
    const message = createBasePBAnimator();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }
          message.states.push(PBAnimationState.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  }
  PBAnimator2.decode = decode;
})(PBAnimator || (PBAnimator = {}));
function createBasePBAnimationState() {
  return { clip: "", playing: void 0, weight: void 0, speed: void 0, loop: void 0, shouldReset: void 0 };
}
var PBAnimationState;
(function(PBAnimationState2) {
  function encode(message, writer = import_minimal.default.Writer.create()) {
    if (message.clip !== "") {
      writer.uint32(18).string(message.clip);
    }
    if (message.playing !== void 0) {
      writer.uint32(24).bool(message.playing);
    }
    if (message.weight !== void 0) {
      writer.uint32(37).float(message.weight);
    }
    if (message.speed !== void 0) {
      writer.uint32(45).float(message.speed);
    }
    if (message.loop !== void 0) {
      writer.uint32(48).bool(message.loop);
    }
    if (message.shouldReset !== void 0) {
      writer.uint32(56).bool(message.shouldReset);
    }
    return writer;
  }
  PBAnimationState2.encode = encode;
  function decode(input, length2) {
    const reader = input instanceof import_minimal.default.Reader ? input : import_minimal.default.Reader.create(input);
    let end = length2 === void 0 ? reader.len : reader.pos + length2;
    const message = createBasePBAnimationState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          if (tag !== 18) {
            break;
          }
          message.clip = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }
          message.playing = reader.bool();
          continue;
        case 4:
          if (tag !== 37) {
            break;
          }
          message.weight = reader.float();
          continue;
        case 5:
          if (tag !== 45) {
            break;
          }
          message.speed = reader.float();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }
          message.loop = reader.bool();
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }
          message.shouldReset = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  }
  PBAnimationState2.decode = decode;
})(PBAnimationState || (PBAnimationState = {}));

// node_modules/@dcl/ecs/dist/components/generated/Animator.gen.js
var AnimatorSchema = {
  COMPONENT_ID: 1042,
  serialize(value, builder) {
    const writer = PBAnimator.encode(value);
    const buffer2 = new Uint8Array(writer.finish(), 0, writer.len);
    builder.writeBuffer(buffer2, false);
  },
  deserialize(reader) {
    return PBAnimator.decode(reader.buffer(), reader.remainingBytes());
  },
  create() {
    return PBAnimator.decode(new Uint8Array());
  },
  jsonSchema: {
    type: "object",
    properties: {},
    serializationType: "protocol-buffer",
    protocolBuffer: "PBAnimator"
  }
};

// node_modules/@dcl/ecs/dist/components/generated/pb/decentraland/sdk/components/audio_event.gen.js
var import_minimal2 = __toESM(require_minimal2());
function createBasePBAudioEvent() {
  return { state: 0, timestamp: 0 };
}
var PBAudioEvent;
(function(PBAudioEvent2) {
  function encode(message, writer = import_minimal2.default.Writer.create()) {
    if (message.state !== 0) {
      writer.uint32(8).int32(message.state);
    }
    if (message.timestamp !== 0) {
      writer.uint32(16).uint32(message.timestamp);
    }
    return writer;
  }
  PBAudioEvent2.encode = encode;
  function decode(input, length2) {
    const reader = input instanceof import_minimal2.default.Reader ? input : import_minimal2.default.Reader.create(input);
    let end = length2 === void 0 ? reader.len : reader.pos + length2;
    const message = createBasePBAudioEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }
          message.state = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }
          message.timestamp = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  }
  PBAudioEvent2.decode = decode;
})(PBAudioEvent || (PBAudioEvent = {}));

// node_modules/@dcl/ecs/dist/components/generated/AudioEvent.gen.js
var AudioEventSchema = {
  COMPONENT_ID: 1105,
  serialize(value, builder) {
    const writer = PBAudioEvent.encode(value);
    const buffer2 = new Uint8Array(writer.finish(), 0, writer.len);
    builder.writeBuffer(buffer2, false);
  },
  deserialize(reader) {
    return PBAudioEvent.decode(reader.buffer(), reader.remainingBytes());
  },
  create() {
    return PBAudioEvent.decode(new Uint8Array());
  },
  jsonSchema: {
    type: "object",
    properties: {},
    serializationType: "protocol-buffer",
    protocolBuffer: "PBAudioEvent"
  }
};

// node_modules/@dcl/ecs/dist/components/generated/pb/decentraland/sdk/components/audio_source.gen.js
var import_minimal3 = __toESM(require_minimal2());
function createBasePBAudioSource() {
  return {
    playing: void 0,
    volume: void 0,
    loop: void 0,
    pitch: void 0,
    audioClipUrl: "",
    currentTime: void 0,
    global: void 0
  };
}
var PBAudioSource;
(function(PBAudioSource2) {
  function encode(message, writer = import_minimal3.default.Writer.create()) {
    if (message.playing !== void 0) {
      writer.uint32(8).bool(message.playing);
    }
    if (message.volume !== void 0) {
      writer.uint32(21).float(message.volume);
    }
    if (message.loop !== void 0) {
      writer.uint32(24).bool(message.loop);
    }
    if (message.pitch !== void 0) {
      writer.uint32(37).float(message.pitch);
    }
    if (message.audioClipUrl !== "") {
      writer.uint32(42).string(message.audioClipUrl);
    }
    if (message.currentTime !== void 0) {
      writer.uint32(53).float(message.currentTime);
    }
    if (message.global !== void 0) {
      writer.uint32(56).bool(message.global);
    }
    return writer;
  }
  PBAudioSource2.encode = encode;
  function decode(input, length2) {
    const reader = input instanceof import_minimal3.default.Reader ? input : import_minimal3.default.Reader.create(input);
    let end = length2 === void 0 ? reader.len : reader.pos + length2;
    const message = createBasePBAudioSource();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }
          message.playing = reader.bool();
          continue;
        case 2:
          if (tag !== 21) {
            break;
          }
          message.volume = reader.float();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }
          message.loop = reader.bool();
          continue;
        case 4:
          if (tag !== 37) {
            break;
          }
          message.pitch = reader.float();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }
          message.audioClipUrl = reader.string();
          continue;
        case 6:
          if (tag !== 53) {
            break;
          }
          message.currentTime = reader.float();
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }
          message.global = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  }
  PBAudioSource2.decode = decode;
})(PBAudioSource || (PBAudioSource = {}));

// node_modules/@dcl/ecs/dist/components/generated/AudioSource.gen.js
var AudioSourceSchema = {
  COMPONENT_ID: 1020,
  serialize(value, builder) {
    const writer = PBAudioSource.encode(value);
    const buffer2 = new Uint8Array(writer.finish(), 0, writer.len);
    builder.writeBuffer(buffer2, false);
  },
  deserialize(reader) {
    return PBAudioSource.decode(reader.buffer(), reader.remainingBytes());
  },
  create() {
    return PBAudioSource.decode(new Uint8Array());
  },
  jsonSchema: {
    type: "object",
    properties: {},
    serializationType: "protocol-buffer",
    protocolBuffer: "PBAudioSource"
  }
};

// node_modules/@dcl/ecs/dist/components/generated/pb/decentraland/sdk/components/audio_stream.gen.js
var import_minimal4 = __toESM(require_minimal2());
function createBasePBAudioStream() {
  return { playing: void 0, volume: void 0, url: "" };
}
var PBAudioStream;
(function(PBAudioStream2) {
  function encode(message, writer = import_minimal4.default.Writer.create()) {
    if (message.playing !== void 0) {
      writer.uint32(8).bool(message.playing);
    }
    if (message.volume !== void 0) {
      writer.uint32(21).float(message.volume);
    }
    if (message.url !== "") {
      writer.uint32(26).string(message.url);
    }
    return writer;
  }
  PBAudioStream2.encode = encode;
  function decode(input, length2) {
    const reader = input instanceof import_minimal4.default.Reader ? input : import_minimal4.default.Reader.create(input);
    let end = length2 === void 0 ? reader.len : reader.pos + length2;
    const message = createBasePBAudioStream();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }
          message.playing = reader.bool();
          continue;
        case 2:
          if (tag !== 21) {
            break;
          }
          message.volume = reader.float();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }
          message.url = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  }
  PBAudioStream2.decode = decode;
})(PBAudioStream || (PBAudioStream = {}));

// node_modules/@dcl/ecs/dist/components/generated/AudioStream.gen.js
var AudioStreamSchema = {
  COMPONENT_ID: 1021,
  serialize(value, builder) {
    const writer = PBAudioStream.encode(value);
    const buffer2 = new Uint8Array(writer.finish(), 0, writer.len);
    builder.writeBuffer(buffer2, false);
  },
  deserialize(reader) {
    return PBAudioStream.decode(reader.buffer(), reader.remainingBytes());
  },
  create() {
    return PBAudioStream.decode(new Uint8Array());
  },
  jsonSchema: {
    type: "object",
    properties: {},
    serializationType: "protocol-buffer",
    protocolBuffer: "PBAudioStream"
  }
};

// node_modules/@dcl/ecs/dist/components/generated/pb/decentraland/sdk/components/avatar_attach.gen.js
var import_minimal5 = __toESM(require_minimal2());
var AvatarAnchorPointType;
(function(AvatarAnchorPointType2) {
  AvatarAnchorPointType2[AvatarAnchorPointType2["AAPT_POSITION"] = 0] = "AAPT_POSITION";
  AvatarAnchorPointType2[AvatarAnchorPointType2["AAPT_NAME_TAG"] = 1] = "AAPT_NAME_TAG";
  AvatarAnchorPointType2[AvatarAnchorPointType2["AAPT_HEAD"] = 4] = "AAPT_HEAD";
  AvatarAnchorPointType2[AvatarAnchorPointType2["AAPT_NECK"] = 5] = "AAPT_NECK";
  AvatarAnchorPointType2[AvatarAnchorPointType2["AAPT_SPINE"] = 6] = "AAPT_SPINE";
  AvatarAnchorPointType2[AvatarAnchorPointType2["AAPT_SPINE1"] = 7] = "AAPT_SPINE1";
  AvatarAnchorPointType2[AvatarAnchorPointType2["AAPT_SPINE2"] = 8] = "AAPT_SPINE2";
  AvatarAnchorPointType2[AvatarAnchorPointType2["AAPT_HIP"] = 9] = "AAPT_HIP";
  AvatarAnchorPointType2[AvatarAnchorPointType2["AAPT_LEFT_SHOULDER"] = 10] = "AAPT_LEFT_SHOULDER";
  AvatarAnchorPointType2[AvatarAnchorPointType2["AAPT_LEFT_ARM"] = 11] = "AAPT_LEFT_ARM";
  AvatarAnchorPointType2[AvatarAnchorPointType2["AAPT_LEFT_FOREARM"] = 12] = "AAPT_LEFT_FOREARM";
  AvatarAnchorPointType2[AvatarAnchorPointType2["AAPT_LEFT_HAND"] = 2] = "AAPT_LEFT_HAND";
  AvatarAnchorPointType2[AvatarAnchorPointType2["AAPT_LEFT_HAND_INDEX"] = 13] = "AAPT_LEFT_HAND_INDEX";
  AvatarAnchorPointType2[AvatarAnchorPointType2["AAPT_RIGHT_SHOULDER"] = 14] = "AAPT_RIGHT_SHOULDER";
  AvatarAnchorPointType2[AvatarAnchorPointType2["AAPT_RIGHT_ARM"] = 15] = "AAPT_RIGHT_ARM";
  AvatarAnchorPointType2[AvatarAnchorPointType2["AAPT_RIGHT_FOREARM"] = 16] = "AAPT_RIGHT_FOREARM";
  AvatarAnchorPointType2[AvatarAnchorPointType2["AAPT_RIGHT_HAND"] = 3] = "AAPT_RIGHT_HAND";
  AvatarAnchorPointType2[AvatarAnchorPointType2["AAPT_RIGHT_HAND_INDEX"] = 17] = "AAPT_RIGHT_HAND_INDEX";
  AvatarAnchorPointType2[AvatarAnchorPointType2["AAPT_LEFT_UP_LEG"] = 18] = "AAPT_LEFT_UP_LEG";
  AvatarAnchorPointType2[AvatarAnchorPointType2["AAPT_LEFT_LEG"] = 19] = "AAPT_LEFT_LEG";
  AvatarAnchorPointType2[AvatarAnchorPointType2["AAPT_LEFT_FOOT"] = 20] = "AAPT_LEFT_FOOT";
  AvatarAnchorPointType2[AvatarAnchorPointType2["AAPT_LEFT_TOE_BASE"] = 21] = "AAPT_LEFT_TOE_BASE";
  AvatarAnchorPointType2[AvatarAnchorPointType2["AAPT_RIGHT_UP_LEG"] = 22] = "AAPT_RIGHT_UP_LEG";
  AvatarAnchorPointType2[AvatarAnchorPointType2["AAPT_RIGHT_LEG"] = 23] = "AAPT_RIGHT_LEG";
  AvatarAnchorPointType2[AvatarAnchorPointType2["AAPT_RIGHT_FOOT"] = 24] = "AAPT_RIGHT_FOOT";
  AvatarAnchorPointType2[AvatarAnchorPointType2["AAPT_RIGHT_TOE_BASE"] = 25] = "AAPT_RIGHT_TOE_BASE";
})(AvatarAnchorPointType || (AvatarAnchorPointType = {}));
function createBasePBAvatarAttach() {
  return { avatarId: void 0, anchorPointId: 0 };
}
var PBAvatarAttach;
(function(PBAvatarAttach2) {
  function encode(message, writer = import_minimal5.default.Writer.create()) {
    if (message.avatarId !== void 0) {
      writer.uint32(10).string(message.avatarId);
    }
    if (message.anchorPointId !== 0) {
      writer.uint32(16).int32(message.anchorPointId);
    }
    return writer;
  }
  PBAvatarAttach2.encode = encode;
  function decode(input, length2) {
    const reader = input instanceof import_minimal5.default.Reader ? input : import_minimal5.default.Reader.create(input);
    let end = length2 === void 0 ? reader.len : reader.pos + length2;
    const message = createBasePBAvatarAttach();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }
          message.avatarId = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }
          message.anchorPointId = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  }
  PBAvatarAttach2.decode = decode;
})(PBAvatarAttach || (PBAvatarAttach = {}));

// node_modules/@dcl/ecs/dist/components/generated/AvatarAttach.gen.js
var AvatarAttachSchema = {
  COMPONENT_ID: 1073,
  serialize(value, builder) {
    const writer = PBAvatarAttach.encode(value);
    const buffer2 = new Uint8Array(writer.finish(), 0, writer.len);
    builder.writeBuffer(buffer2, false);
  },
  deserialize(reader) {
    return PBAvatarAttach.decode(reader.buffer(), reader.remainingBytes());
  },
  create() {
    return PBAvatarAttach.decode(new Uint8Array());
  },
  jsonSchema: {
    type: "object",
    properties: {},
    serializationType: "protocol-buffer",
    protocolBuffer: "PBAvatarAttach"
  }
};

// node_modules/@dcl/ecs/dist/components/generated/pb/decentraland/sdk/components/avatar_base.gen.js
var import_minimal7 = __toESM(require_minimal2());

// node_modules/@dcl/ecs/dist/components/generated/pb/decentraland/common/colors.gen.js
var import_minimal6 = __toESM(require_minimal2());
function createBaseColor3() {
  return { r: 0, g: 0, b: 0 };
}
var Color3;
(function(Color33) {
  function encode(message, writer = import_minimal6.default.Writer.create()) {
    if (message.r !== 0) {
      writer.uint32(13).float(message.r);
    }
    if (message.g !== 0) {
      writer.uint32(21).float(message.g);
    }
    if (message.b !== 0) {
      writer.uint32(29).float(message.b);
    }
    return writer;
  }
  Color33.encode = encode;
  function decode(input, length2) {
    const reader = input instanceof import_minimal6.default.Reader ? input : import_minimal6.default.Reader.create(input);
    let end = length2 === void 0 ? reader.len : reader.pos + length2;
    const message = createBaseColor3();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 13) {
            break;
          }
          message.r = reader.float();
          continue;
        case 2:
          if (tag !== 21) {
            break;
          }
          message.g = reader.float();
          continue;
        case 3:
          if (tag !== 29) {
            break;
          }
          message.b = reader.float();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  }
  Color33.decode = decode;
})(Color3 || (Color3 = {}));
function createBaseColor4() {
  return { r: 0, g: 0, b: 0, a: 0 };
}
var Color4;
(function(Color43) {
  function encode(message, writer = import_minimal6.default.Writer.create()) {
    if (message.r !== 0) {
      writer.uint32(13).float(message.r);
    }
    if (message.g !== 0) {
      writer.uint32(21).float(message.g);
    }
    if (message.b !== 0) {
      writer.uint32(29).float(message.b);
    }
    if (message.a !== 0) {
      writer.uint32(37).float(message.a);
    }
    return writer;
  }
  Color43.encode = encode;
  function decode(input, length2) {
    const reader = input instanceof import_minimal6.default.Reader ? input : import_minimal6.default.Reader.create(input);
    let end = length2 === void 0 ? reader.len : reader.pos + length2;
    const message = createBaseColor4();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 13) {
            break;
          }
          message.r = reader.float();
          continue;
        case 2:
          if (tag !== 21) {
            break;
          }
          message.g = reader.float();
          continue;
        case 3:
          if (tag !== 29) {
            break;
          }
          message.b = reader.float();
          continue;
        case 4:
          if (tag !== 37) {
            break;
          }
          message.a = reader.float();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  }
  Color43.decode = decode;
})(Color4 || (Color4 = {}));

// node_modules/@dcl/ecs/dist/components/generated/pb/decentraland/sdk/components/avatar_base.gen.js
function createBasePBAvatarBase() {
  return { skinColor: void 0, eyesColor: void 0, hairColor: void 0, bodyShapeUrn: "", name: "" };
}
var PBAvatarBase;
(function(PBAvatarBase2) {
  function encode(message, writer = import_minimal7.default.Writer.create()) {
    if (message.skinColor !== void 0) {
      Color3.encode(message.skinColor, writer.uint32(10).fork()).ldelim();
    }
    if (message.eyesColor !== void 0) {
      Color3.encode(message.eyesColor, writer.uint32(18).fork()).ldelim();
    }
    if (message.hairColor !== void 0) {
      Color3.encode(message.hairColor, writer.uint32(26).fork()).ldelim();
    }
    if (message.bodyShapeUrn !== "") {
      writer.uint32(34).string(message.bodyShapeUrn);
    }
    if (message.name !== "") {
      writer.uint32(42).string(message.name);
    }
    return writer;
  }
  PBAvatarBase2.encode = encode;
  function decode(input, length2) {
    const reader = input instanceof import_minimal7.default.Reader ? input : import_minimal7.default.Reader.create(input);
    let end = length2 === void 0 ? reader.len : reader.pos + length2;
    const message = createBasePBAvatarBase();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }
          message.skinColor = Color3.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }
          message.eyesColor = Color3.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }
          message.hairColor = Color3.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }
          message.bodyShapeUrn = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }
          message.name = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  }
  PBAvatarBase2.decode = decode;
})(PBAvatarBase || (PBAvatarBase = {}));

// node_modules/@dcl/ecs/dist/components/generated/AvatarBase.gen.js
var AvatarBaseSchema = {
  COMPONENT_ID: 1087,
  serialize(value, builder) {
    const writer = PBAvatarBase.encode(value);
    const buffer2 = new Uint8Array(writer.finish(), 0, writer.len);
    builder.writeBuffer(buffer2, false);
  },
  deserialize(reader) {
    return PBAvatarBase.decode(reader.buffer(), reader.remainingBytes());
  },
  create() {
    return PBAvatarBase.decode(new Uint8Array());
  },
  jsonSchema: {
    type: "object",
    properties: {},
    serializationType: "protocol-buffer",
    protocolBuffer: "PBAvatarBase"
  }
};

// node_modules/@dcl/ecs/dist/components/generated/pb/decentraland/sdk/components/avatar_emote_command.gen.js
var import_minimal8 = __toESM(require_minimal2());
function createBasePBAvatarEmoteCommand() {
  return { emoteUrn: "", loop: false, timestamp: 0 };
}
var PBAvatarEmoteCommand;
(function(PBAvatarEmoteCommand2) {
  function encode(message, writer = import_minimal8.default.Writer.create()) {
    if (message.emoteUrn !== "") {
      writer.uint32(10).string(message.emoteUrn);
    }
    if (message.loop === true) {
      writer.uint32(16).bool(message.loop);
    }
    if (message.timestamp !== 0) {
      writer.uint32(24).uint32(message.timestamp);
    }
    return writer;
  }
  PBAvatarEmoteCommand2.encode = encode;
  function decode(input, length2) {
    const reader = input instanceof import_minimal8.default.Reader ? input : import_minimal8.default.Reader.create(input);
    let end = length2 === void 0 ? reader.len : reader.pos + length2;
    const message = createBasePBAvatarEmoteCommand();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }
          message.emoteUrn = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }
          message.loop = reader.bool();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }
          message.timestamp = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  }
  PBAvatarEmoteCommand2.decode = decode;
})(PBAvatarEmoteCommand || (PBAvatarEmoteCommand = {}));

// node_modules/@dcl/ecs/dist/components/generated/AvatarEmoteCommand.gen.js
var AvatarEmoteCommandSchema = {
  COMPONENT_ID: 1088,
  serialize(value, builder) {
    const writer = PBAvatarEmoteCommand.encode(value);
    const buffer2 = new Uint8Array(writer.finish(), 0, writer.len);
    builder.writeBuffer(buffer2, false);
  },
  deserialize(reader) {
    return PBAvatarEmoteCommand.decode(reader.buffer(), reader.remainingBytes());
  },
  create() {
    return PBAvatarEmoteCommand.decode(new Uint8Array());
  },
  jsonSchema: {
    type: "object",
    properties: {},
    serializationType: "protocol-buffer",
    protocolBuffer: "PBAvatarEmoteCommand"
  }
};

// node_modules/@dcl/ecs/dist/components/generated/pb/decentraland/sdk/components/avatar_equipped_data.gen.js
var import_minimal9 = __toESM(require_minimal2());
function createBasePBAvatarEquippedData() {
  return { wearableUrns: [], emoteUrns: [] };
}
var PBAvatarEquippedData;
(function(PBAvatarEquippedData2) {
  function encode(message, writer = import_minimal9.default.Writer.create()) {
    for (const v of message.wearableUrns) {
      writer.uint32(10).string(v);
    }
    for (const v of message.emoteUrns) {
      writer.uint32(18).string(v);
    }
    return writer;
  }
  PBAvatarEquippedData2.encode = encode;
  function decode(input, length2) {
    const reader = input instanceof import_minimal9.default.Reader ? input : import_minimal9.default.Reader.create(input);
    let end = length2 === void 0 ? reader.len : reader.pos + length2;
    const message = createBasePBAvatarEquippedData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }
          message.wearableUrns.push(reader.string());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }
          message.emoteUrns.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  }
  PBAvatarEquippedData2.decode = decode;
})(PBAvatarEquippedData || (PBAvatarEquippedData = {}));

// node_modules/@dcl/ecs/dist/components/generated/AvatarEquippedData.gen.js
var AvatarEquippedDataSchema = {
  COMPONENT_ID: 1091,
  serialize(value, builder) {
    const writer = PBAvatarEquippedData.encode(value);
    const buffer2 = new Uint8Array(writer.finish(), 0, writer.len);
    builder.writeBuffer(buffer2, false);
  },
  deserialize(reader) {
    return PBAvatarEquippedData.decode(reader.buffer(), reader.remainingBytes());
  },
  create() {
    return PBAvatarEquippedData.decode(new Uint8Array());
  },
  jsonSchema: {
    type: "object",
    properties: {},
    serializationType: "protocol-buffer",
    protocolBuffer: "PBAvatarEquippedData"
  }
};

// node_modules/@dcl/ecs/dist/components/generated/pb/decentraland/sdk/components/avatar_modifier_area.gen.js
var import_minimal11 = __toESM(require_minimal2());

// node_modules/@dcl/ecs/dist/components/generated/pb/decentraland/common/vectors.gen.js
var import_minimal10 = __toESM(require_minimal2());
function createBasePosition() {
  return { x: 0, y: 0, z: 0 };
}
var Position;
(function(Position2) {
  function encode(message, writer = import_minimal10.default.Writer.create()) {
    if (message.x !== 0) {
      writer.uint32(13).float(message.x);
    }
    if (message.y !== 0) {
      writer.uint32(21).float(message.y);
    }
    if (message.z !== 0) {
      writer.uint32(29).float(message.z);
    }
    return writer;
  }
  Position2.encode = encode;
  function decode(input, length2) {
    const reader = input instanceof import_minimal10.default.Reader ? input : import_minimal10.default.Reader.create(input);
    let end = length2 === void 0 ? reader.len : reader.pos + length2;
    const message = createBasePosition();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 13) {
            break;
          }
          message.x = reader.float();
          continue;
        case 2:
          if (tag !== 21) {
            break;
          }
          message.y = reader.float();
          continue;
        case 3:
          if (tag !== 29) {
            break;
          }
          message.z = reader.float();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  }
  Position2.decode = decode;
})(Position || (Position = {}));
function createBaseVector3() {
  return { x: 0, y: 0, z: 0 };
}
var Vector3;
(function(Vector33) {
  function encode(message, writer = import_minimal10.default.Writer.create()) {
    if (message.x !== 0) {
      writer.uint32(13).float(message.x);
    }
    if (message.y !== 0) {
      writer.uint32(21).float(message.y);
    }
    if (message.z !== 0) {
      writer.uint32(29).float(message.z);
    }
    return writer;
  }
  Vector33.encode = encode;
  function decode(input, length2) {
    const reader = input instanceof import_minimal10.default.Reader ? input : import_minimal10.default.Reader.create(input);
    let end = length2 === void 0 ? reader.len : reader.pos + length2;
    const message = createBaseVector3();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 13) {
            break;
          }
          message.x = reader.float();
          continue;
        case 2:
          if (tag !== 21) {
            break;
          }
          message.y = reader.float();
          continue;
        case 3:
          if (tag !== 29) {
            break;
          }
          message.z = reader.float();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  }
  Vector33.decode = decode;
})(Vector3 || (Vector3 = {}));
function createBaseVector2() {
  return { x: 0, y: 0 };
}
var Vector2;
(function(Vector23) {
  function encode(message, writer = import_minimal10.default.Writer.create()) {
    if (message.x !== 0) {
      writer.uint32(13).float(message.x);
    }
    if (message.y !== 0) {
      writer.uint32(21).float(message.y);
    }
    return writer;
  }
  Vector23.encode = encode;
  function decode(input, length2) {
    const reader = input instanceof import_minimal10.default.Reader ? input : import_minimal10.default.Reader.create(input);
    let end = length2 === void 0 ? reader.len : reader.pos + length2;
    const message = createBaseVector2();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 13) {
            break;
          }
          message.x = reader.float();
          continue;
        case 2:
          if (tag !== 21) {
            break;
          }
          message.y = reader.float();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  }
  Vector23.decode = decode;
})(Vector2 || (Vector2 = {}));
function createBaseQuaternion() {
  return { x: 0, y: 0, z: 0, w: 0 };
}
var Quaternion;
(function(Quaternion3) {
  function encode(message, writer = import_minimal10.default.Writer.create()) {
    if (message.x !== 0) {
      writer.uint32(13).float(message.x);
    }
    if (message.y !== 0) {
      writer.uint32(21).float(message.y);
    }
    if (message.z !== 0) {
      writer.uint32(29).float(message.z);
    }
    if (message.w !== 0) {
      writer.uint32(37).float(message.w);
    }
    return writer;
  }
  Quaternion3.encode = encode;
  function decode(input, length2) {
    const reader = input instanceof import_minimal10.default.Reader ? input : import_minimal10.default.Reader.create(input);
    let end = length2 === void 0 ? reader.len : reader.pos + length2;
    const message = createBaseQuaternion();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 13) {
            break;
          }
          message.x = reader.float();
          continue;
        case 2:
          if (tag !== 21) {
            break;
          }
          message.y = reader.float();
          continue;
        case 3:
          if (tag !== 29) {
            break;
          }
          message.z = reader.float();
          continue;
        case 4:
          if (tag !== 37) {
            break;
          }
          message.w = reader.float();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  }
  Quaternion3.decode = decode;
})(Quaternion || (Quaternion = {}));

// node_modules/@dcl/ecs/dist/components/generated/pb/decentraland/sdk/components/avatar_modifier_area.gen.js
var AvatarModifierType;
(function(AvatarModifierType2) {
  AvatarModifierType2[AvatarModifierType2["AMT_HIDE_AVATARS"] = 0] = "AMT_HIDE_AVATARS";
  AvatarModifierType2[AvatarModifierType2["AMT_DISABLE_PASSPORTS"] = 1] = "AMT_DISABLE_PASSPORTS";
})(AvatarModifierType || (AvatarModifierType = {}));
function createBasePBAvatarModifierArea() {
  return { area: void 0, excludeIds: [], modifiers: [] };
}
var PBAvatarModifierArea;
(function(PBAvatarModifierArea2) {
  function encode(message, writer = import_minimal11.default.Writer.create()) {
    if (message.area !== void 0) {
      Vector3.encode(message.area, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.excludeIds) {
      writer.uint32(18).string(v);
    }
    writer.uint32(26).fork();
    for (const v of message.modifiers) {
      writer.int32(v);
    }
    writer.ldelim();
    return writer;
  }
  PBAvatarModifierArea2.encode = encode;
  function decode(input, length2) {
    const reader = input instanceof import_minimal11.default.Reader ? input : import_minimal11.default.Reader.create(input);
    let end = length2 === void 0 ? reader.len : reader.pos + length2;
    const message = createBasePBAvatarModifierArea();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }
          message.area = Vector3.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }
          message.excludeIds.push(reader.string());
          continue;
        case 3:
          if (tag === 24) {
            message.modifiers.push(reader.int32());
            continue;
          }
          if (tag === 26) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.modifiers.push(reader.int32());
            }
            continue;
          }
          break;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  }
  PBAvatarModifierArea2.decode = decode;
})(PBAvatarModifierArea || (PBAvatarModifierArea = {}));

// node_modules/@dcl/ecs/dist/components/generated/AvatarModifierArea.gen.js
var AvatarModifierAreaSchema = {
  COMPONENT_ID: 1070,
  serialize(value, builder) {
    const writer = PBAvatarModifierArea.encode(value);
    const buffer2 = new Uint8Array(writer.finish(), 0, writer.len);
    builder.writeBuffer(buffer2, false);
  },
  deserialize(reader) {
    return PBAvatarModifierArea.decode(reader.buffer(), reader.remainingBytes());
  },
  create() {
    return PBAvatarModifierArea.decode(new Uint8Array());
  },
  jsonSchema: {
    type: "object",
    properties: {},
    serializationType: "protocol-buffer",
    protocolBuffer: "PBAvatarModifierArea"
  }
};

// node_modules/long/index.js
var wasm = null;
try {
  wasm = new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([
    0,
    97,
    115,
    109,
    1,
    0,
    0,
    0,
    1,
    13,
    2,
    96,
    0,
    1,
    127,
    96,
    4,
    127,
    127,
    127,
    127,
    1,
    127,
    3,
    7,
    6,
    0,
    1,
    1,
    1,
    1,
    1,
    6,
    6,
    1,
    127,
    1,
    65,
    0,
    11,
    7,
    50,
    6,
    3,
    109,
    117,
    108,
    0,
    1,
    5,
    100,
    105,
    118,
    95,
    115,
    0,
    2,
    5,
    100,
    105,
    118,
    95,
    117,
    0,
    3,
    5,
    114,
    101,
    109,
    95,
    115,
    0,
    4,
    5,
    114,
    101,
    109,
    95,
    117,
    0,
    5,
    8,
    103,
    101,
    116,
    95,
    104,
    105,
    103,
    104,
    0,
    0,
    10,
    191,
    1,
    6,
    4,
    0,
    35,
    0,
    11,
    36,
    1,
    1,
    126,
    32,
    0,
    173,
    32,
    1,
    173,
    66,
    32,
    134,
    132,
    32,
    2,
    173,
    32,
    3,
    173,
    66,
    32,
    134,
    132,
    126,
    34,
    4,
    66,
    32,
    135,
    167,
    36,
    0,
    32,
    4,
    167,
    11,
    36,
    1,
    1,
    126,
    32,
    0,
    173,
    32,
    1,
    173,
    66,
    32,
    134,
    132,
    32,
    2,
    173,
    32,
    3,
    173,
    66,
    32,
    134,
    132,
    127,
    34,
    4,
    66,
    32,
    135,
    167,
    36,
    0,
    32,
    4,
    167,
    11,
    36,
    1,
    1,
    126,
    32,
    0,
    173,
    32,
    1,
    173,
    66,
    32,
    134,
    132,
    32,
    2,
    173,
    32,
    3,
    173,
    66,
    32,
    134,
    132,
    128,
    34,
    4,
    66,
    32,
    135,
    167,
    36,
    0,
    32,
    4,
    167,
    11,
    36,
    1,
    1,
    126,
    32,
    0,
    173,
    32,
    1,
    173,
    66,
    32,
    134,
    132,
    32,
    2,
    173,
    32,
    3,
    173,
    66,
    32,
    134,
    132,
    129,
    34,
    4,
    66,
    32,
    135,
    167,
    36,
    0,
    32,
    4,
    167,
    11,
    36,
    1,
    1,
    126,
    32,
    0,
    173,
    32,
    1,
    173,
    66,
    32,
    134,
    132,
    32,
    2,
    173,
    32,
    3,
    173,
    66,
    32,
    134,
    132,
    130,
    34,
    4,
    66,
    32,
    135,
    167,
    36,
    0,
    32,
    4,
    167,
    11
  ])), {}).exports;
} catch (e) {
}
function Long(low, high, unsigned) {
  this.low = low | 0;
  this.high = high | 0;
  this.unsigned = !!unsigned;
}
Long.prototype.__isLong__;
Object.defineProperty(Long.prototype, "__isLong__", { value: true });
function isLong(obj) {
  return (obj && obj["__isLong__"]) === true;
}
function ctz32(value) {
  var c = Math.clz32(value & -value);
  return value ? 31 - c : c;
}
Long.isLong = isLong;
var INT_CACHE = {};
var UINT_CACHE = {};
function fromInt(value, unsigned) {
  var obj, cachedObj, cache;
  if (unsigned) {
    value >>>= 0;
    if (cache = 0 <= value && value < 256) {
      cachedObj = UINT_CACHE[value];
      if (cachedObj)
        return cachedObj;
    }
    obj = fromBits(value, 0, true);
    if (cache)
      UINT_CACHE[value] = obj;
    return obj;
  } else {
    value |= 0;
    if (cache = -128 <= value && value < 128) {
      cachedObj = INT_CACHE[value];
      if (cachedObj)
        return cachedObj;
    }
    obj = fromBits(value, value < 0 ? -1 : 0, false);
    if (cache)
      INT_CACHE[value] = obj;
    return obj;
  }
}
Long.fromInt = fromInt;
function fromNumber(value, unsigned) {
  if (isNaN(value))
    return unsigned ? UZERO : ZERO;
  if (unsigned) {
    if (value < 0)
      return UZERO;
    if (value >= TWO_PWR_64_DBL)
      return MAX_UNSIGNED_VALUE;
  } else {
    if (value <= -TWO_PWR_63_DBL)
      return MIN_VALUE;
    if (value + 1 >= TWO_PWR_63_DBL)
      return MAX_VALUE;
  }
  if (value < 0)
    return fromNumber(-value, unsigned).neg();
  return fromBits(value % TWO_PWR_32_DBL | 0, value / TWO_PWR_32_DBL | 0, unsigned);
}
Long.fromNumber = fromNumber;
function fromBits(lowBits, highBits, unsigned) {
  return new Long(lowBits, highBits, unsigned);
}
Long.fromBits = fromBits;
var pow_dbl = Math.pow;
function fromString(str, unsigned, radix) {
  if (str.length === 0)
    throw Error("empty string");
  if (typeof unsigned === "number") {
    radix = unsigned;
    unsigned = false;
  } else {
    unsigned = !!unsigned;
  }
  if (str === "NaN" || str === "Infinity" || str === "+Infinity" || str === "-Infinity")
    return unsigned ? UZERO : ZERO;
  radix = radix || 10;
  if (radix < 2 || 36 < radix)
    throw RangeError("radix");
  var p;
  if ((p = str.indexOf("-")) > 0)
    throw Error("interior hyphen");
  else if (p === 0) {
    return fromString(str.substring(1), unsigned, radix).neg();
  }
  var radixToPower = fromNumber(pow_dbl(radix, 8));
  var result = ZERO;
  for (var i = 0; i < str.length; i += 8) {
    var size = Math.min(8, str.length - i), value = parseInt(str.substring(i, i + size), radix);
    if (size < 8) {
      var power = fromNumber(pow_dbl(radix, size));
      result = result.mul(power).add(fromNumber(value));
    } else {
      result = result.mul(radixToPower);
      result = result.add(fromNumber(value));
    }
  }
  result.unsigned = unsigned;
  return result;
}
Long.fromString = fromString;
function fromValue(val, unsigned) {
  if (typeof val === "number")
    return fromNumber(val, unsigned);
  if (typeof val === "string")
    return fromString(val, unsigned);
  return fromBits(val.low, val.high, typeof unsigned === "boolean" ? unsigned : val.unsigned);
}
Long.fromValue = fromValue;
var TWO_PWR_16_DBL = 1 << 16;
var TWO_PWR_24_DBL = 1 << 24;
var TWO_PWR_32_DBL = TWO_PWR_16_DBL * TWO_PWR_16_DBL;
var TWO_PWR_64_DBL = TWO_PWR_32_DBL * TWO_PWR_32_DBL;
var TWO_PWR_63_DBL = TWO_PWR_64_DBL / 2;
var TWO_PWR_24 = fromInt(TWO_PWR_24_DBL);
var ZERO = fromInt(0);
Long.ZERO = ZERO;
var UZERO = fromInt(0, true);
Long.UZERO = UZERO;
var ONE = fromInt(1);
Long.ONE = ONE;
var UONE = fromInt(1, true);
Long.UONE = UONE;
var NEG_ONE = fromInt(-1);
Long.NEG_ONE = NEG_ONE;
var MAX_VALUE = fromBits(4294967295 | 0, 2147483647 | 0, false);
Long.MAX_VALUE = MAX_VALUE;
var MAX_UNSIGNED_VALUE = fromBits(4294967295 | 0, 4294967295 | 0, true);
Long.MAX_UNSIGNED_VALUE = MAX_UNSIGNED_VALUE;
var MIN_VALUE = fromBits(0, 2147483648 | 0, false);
Long.MIN_VALUE = MIN_VALUE;
var LongPrototype = Long.prototype;
LongPrototype.toInt = function toInt() {
  return this.unsigned ? this.low >>> 0 : this.low;
};
LongPrototype.toNumber = function toNumber() {
  if (this.unsigned)
    return (this.high >>> 0) * TWO_PWR_32_DBL + (this.low >>> 0);
  return this.high * TWO_PWR_32_DBL + (this.low >>> 0);
};
LongPrototype.toString = function toString(radix) {
  radix = radix || 10;
  if (radix < 2 || 36 < radix)
    throw RangeError("radix");
  if (this.isZero())
    return "0";
  if (this.isNegative()) {
    if (this.eq(MIN_VALUE)) {
      var radixLong = fromNumber(radix), div = this.div(radixLong), rem1 = div.mul(radixLong).sub(this);
      return div.toString(radix) + rem1.toInt().toString(radix);
    } else
      return "-" + this.neg().toString(radix);
  }
  var radixToPower = fromNumber(pow_dbl(radix, 6), this.unsigned), rem = this;
  var result = "";
  while (true) {
    var remDiv = rem.div(radixToPower), intval = rem.sub(remDiv.mul(radixToPower)).toInt() >>> 0, digits = intval.toString(radix);
    rem = remDiv;
    if (rem.isZero())
      return digits + result;
    else {
      while (digits.length < 6)
        digits = "0" + digits;
      result = "" + digits + result;
    }
  }
};
LongPrototype.getHighBits = function getHighBits() {
  return this.high;
};
LongPrototype.getHighBitsUnsigned = function getHighBitsUnsigned() {
  return this.high >>> 0;
};
LongPrototype.getLowBits = function getLowBits() {
  return this.low;
};
LongPrototype.getLowBitsUnsigned = function getLowBitsUnsigned() {
  return this.low >>> 0;
};
LongPrototype.getNumBitsAbs = function getNumBitsAbs() {
  if (this.isNegative())
    return this.eq(MIN_VALUE) ? 64 : this.neg().getNumBitsAbs();
  var val = this.high != 0 ? this.high : this.low;
  for (var bit = 31; bit > 0; bit--)
    if ((val & 1 << bit) != 0)
      break;
  return this.high != 0 ? bit + 33 : bit + 1;
};
LongPrototype.isZero = function isZero() {
  return this.high === 0 && this.low === 0;
};
LongPrototype.eqz = LongPrototype.isZero;
LongPrototype.isNegative = function isNegative() {
  return !this.unsigned && this.high < 0;
};
LongPrototype.isPositive = function isPositive() {
  return this.unsigned || this.high >= 0;
};
LongPrototype.isOdd = function isOdd() {
  return (this.low & 1) === 1;
};
LongPrototype.isEven = function isEven() {
  return (this.low & 1) === 0;
};
LongPrototype.equals = function equals(other) {
  if (!isLong(other))
    other = fromValue(other);
  if (this.unsigned !== other.unsigned && this.high >>> 31 === 1 && other.high >>> 31 === 1)
    return false;
  return this.high === other.high && this.low === other.low;
};
LongPrototype.eq = LongPrototype.equals;
LongPrototype.notEquals = function notEquals(other) {
  return !this.eq(
    /* validates */
    other
  );
};
LongPrototype.neq = LongPrototype.notEquals;
LongPrototype.ne = LongPrototype.notEquals;
LongPrototype.lessThan = function lessThan(other) {
  return this.comp(
    /* validates */
    other
  ) < 0;
};
LongPrototype.lt = LongPrototype.lessThan;
LongPrototype.lessThanOrEqual = function lessThanOrEqual(other) {
  return this.comp(
    /* validates */
    other
  ) <= 0;
};
LongPrototype.lte = LongPrototype.lessThanOrEqual;
LongPrototype.le = LongPrototype.lessThanOrEqual;
LongPrototype.greaterThan = function greaterThan(other) {
  return this.comp(
    /* validates */
    other
  ) > 0;
};
LongPrototype.gt = LongPrototype.greaterThan;
LongPrototype.greaterThanOrEqual = function greaterThanOrEqual(other) {
  return this.comp(
    /* validates */
    other
  ) >= 0;
};
LongPrototype.gte = LongPrototype.greaterThanOrEqual;
LongPrototype.ge = LongPrototype.greaterThanOrEqual;
LongPrototype.compare = function compare(other) {
  if (!isLong(other))
    other = fromValue(other);
  if (this.eq(other))
    return 0;
  var thisNeg = this.isNegative(), otherNeg = other.isNegative();
  if (thisNeg && !otherNeg)
    return -1;
  if (!thisNeg && otherNeg)
    return 1;
  if (!this.unsigned)
    return this.sub(other).isNegative() ? -1 : 1;
  return other.high >>> 0 > this.high >>> 0 || other.high === this.high && other.low >>> 0 > this.low >>> 0 ? -1 : 1;
};
LongPrototype.comp = LongPrototype.compare;
LongPrototype.negate = function negate() {
  if (!this.unsigned && this.eq(MIN_VALUE))
    return MIN_VALUE;
  return this.not().add(ONE);
};
LongPrototype.neg = LongPrototype.negate;
LongPrototype.add = function add(addend) {
  if (!isLong(addend))
    addend = fromValue(addend);
  var a48 = this.high >>> 16;
  var a32 = this.high & 65535;
  var a16 = this.low >>> 16;
  var a00 = this.low & 65535;
  var b48 = addend.high >>> 16;
  var b32 = addend.high & 65535;
  var b16 = addend.low >>> 16;
  var b00 = addend.low & 65535;
  var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
  c00 += a00 + b00;
  c16 += c00 >>> 16;
  c00 &= 65535;
  c16 += a16 + b16;
  c32 += c16 >>> 16;
  c16 &= 65535;
  c32 += a32 + b32;
  c48 += c32 >>> 16;
  c32 &= 65535;
  c48 += a48 + b48;
  c48 &= 65535;
  return fromBits(c16 << 16 | c00, c48 << 16 | c32, this.unsigned);
};
LongPrototype.subtract = function subtract(subtrahend) {
  if (!isLong(subtrahend))
    subtrahend = fromValue(subtrahend);
  return this.add(subtrahend.neg());
};
LongPrototype.sub = LongPrototype.subtract;
LongPrototype.multiply = function multiply(multiplier) {
  if (this.isZero())
    return this;
  if (!isLong(multiplier))
    multiplier = fromValue(multiplier);
  if (wasm) {
    var low = wasm["mul"](
      this.low,
      this.high,
      multiplier.low,
      multiplier.high
    );
    return fromBits(low, wasm["get_high"](), this.unsigned);
  }
  if (multiplier.isZero())
    return this.unsigned ? UZERO : ZERO;
  if (this.eq(MIN_VALUE))
    return multiplier.isOdd() ? MIN_VALUE : ZERO;
  if (multiplier.eq(MIN_VALUE))
    return this.isOdd() ? MIN_VALUE : ZERO;
  if (this.isNegative()) {
    if (multiplier.isNegative())
      return this.neg().mul(multiplier.neg());
    else
      return this.neg().mul(multiplier).neg();
  } else if (multiplier.isNegative())
    return this.mul(multiplier.neg()).neg();
  if (this.lt(TWO_PWR_24) && multiplier.lt(TWO_PWR_24))
    return fromNumber(this.toNumber() * multiplier.toNumber(), this.unsigned);
  var a48 = this.high >>> 16;
  var a32 = this.high & 65535;
  var a16 = this.low >>> 16;
  var a00 = this.low & 65535;
  var b48 = multiplier.high >>> 16;
  var b32 = multiplier.high & 65535;
  var b16 = multiplier.low >>> 16;
  var b00 = multiplier.low & 65535;
  var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
  c00 += a00 * b00;
  c16 += c00 >>> 16;
  c00 &= 65535;
  c16 += a16 * b00;
  c32 += c16 >>> 16;
  c16 &= 65535;
  c16 += a00 * b16;
  c32 += c16 >>> 16;
  c16 &= 65535;
  c32 += a32 * b00;
  c48 += c32 >>> 16;
  c32 &= 65535;
  c32 += a16 * b16;
  c48 += c32 >>> 16;
  c32 &= 65535;
  c32 += a00 * b32;
  c48 += c32 >>> 16;
  c32 &= 65535;
  c48 += a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48;
  c48 &= 65535;
  return fromBits(c16 << 16 | c00, c48 << 16 | c32, this.unsigned);
};
LongPrototype.mul = LongPrototype.multiply;
LongPrototype.divide = function divide(divisor) {
  if (!isLong(divisor))
    divisor = fromValue(divisor);
  if (divisor.isZero())
    throw Error("division by zero");
  if (wasm) {
    if (!this.unsigned && this.high === -2147483648 && divisor.low === -1 && divisor.high === -1) {
      return this;
    }
    var low = (this.unsigned ? wasm["div_u"] : wasm["div_s"])(
      this.low,
      this.high,
      divisor.low,
      divisor.high
    );
    return fromBits(low, wasm["get_high"](), this.unsigned);
  }
  if (this.isZero())
    return this.unsigned ? UZERO : ZERO;
  var approx, rem, res;
  if (!this.unsigned) {
    if (this.eq(MIN_VALUE)) {
      if (divisor.eq(ONE) || divisor.eq(NEG_ONE))
        return MIN_VALUE;
      else if (divisor.eq(MIN_VALUE))
        return ONE;
      else {
        var halfThis = this.shr(1);
        approx = halfThis.div(divisor).shl(1);
        if (approx.eq(ZERO)) {
          return divisor.isNegative() ? ONE : NEG_ONE;
        } else {
          rem = this.sub(divisor.mul(approx));
          res = approx.add(rem.div(divisor));
          return res;
        }
      }
    } else if (divisor.eq(MIN_VALUE))
      return this.unsigned ? UZERO : ZERO;
    if (this.isNegative()) {
      if (divisor.isNegative())
        return this.neg().div(divisor.neg());
      return this.neg().div(divisor).neg();
    } else if (divisor.isNegative())
      return this.div(divisor.neg()).neg();
    res = ZERO;
  } else {
    if (!divisor.unsigned)
      divisor = divisor.toUnsigned();
    if (divisor.gt(this))
      return UZERO;
    if (divisor.gt(this.shru(1)))
      return UONE;
    res = UZERO;
  }
  rem = this;
  while (rem.gte(divisor)) {
    approx = Math.max(1, Math.floor(rem.toNumber() / divisor.toNumber()));
    var log2 = Math.ceil(Math.log(approx) / Math.LN2), delta = log2 <= 48 ? 1 : pow_dbl(2, log2 - 48), approxRes = fromNumber(approx), approxRem = approxRes.mul(divisor);
    while (approxRem.isNegative() || approxRem.gt(rem)) {
      approx -= delta;
      approxRes = fromNumber(approx, this.unsigned);
      approxRem = approxRes.mul(divisor);
    }
    if (approxRes.isZero())
      approxRes = ONE;
    res = res.add(approxRes);
    rem = rem.sub(approxRem);
  }
  return res;
};
LongPrototype.div = LongPrototype.divide;
LongPrototype.modulo = function modulo(divisor) {
  if (!isLong(divisor))
    divisor = fromValue(divisor);
  if (wasm) {
    var low = (this.unsigned ? wasm["rem_u"] : wasm["rem_s"])(
      this.low,
      this.high,
      divisor.low,
      divisor.high
    );
    return fromBits(low, wasm["get_high"](), this.unsigned);
  }
  return this.sub(this.div(divisor).mul(divisor));
};
LongPrototype.mod = LongPrototype.modulo;
LongPrototype.rem = LongPrototype.modulo;
LongPrototype.not = function not() {
  return fromBits(~this.low, ~this.high, this.unsigned);
};
LongPrototype.countLeadingZeros = function countLeadingZeros() {
  return this.high ? Math.clz32(this.high) : Math.clz32(this.low) + 32;
};
LongPrototype.clz = LongPrototype.countLeadingZeros;
LongPrototype.countTrailingZeros = function countTrailingZeros() {
  return this.low ? ctz32(this.low) : ctz32(this.high) + 32;
};
LongPrototype.ctz = LongPrototype.countTrailingZeros;
LongPrototype.and = function and(other) {
  if (!isLong(other))
    other = fromValue(other);
  return fromBits(this.low & other.low, this.high & other.high, this.unsigned);
};
LongPrototype.or = function or(other) {
  if (!isLong(other))
    other = fromValue(other);
  return fromBits(this.low | other.low, this.high | other.high, this.unsigned);
};
LongPrototype.xor = function xor(other) {
  if (!isLong(other))
    other = fromValue(other);
  return fromBits(this.low ^ other.low, this.high ^ other.high, this.unsigned);
};
LongPrototype.shiftLeft = function shiftLeft(numBits) {
  if (isLong(numBits))
    numBits = numBits.toInt();
  if ((numBits &= 63) === 0)
    return this;
  else if (numBits < 32)
    return fromBits(this.low << numBits, this.high << numBits | this.low >>> 32 - numBits, this.unsigned);
  else
    return fromBits(0, this.low << numBits - 32, this.unsigned);
};
LongPrototype.shl = LongPrototype.shiftLeft;
LongPrototype.shiftRight = function shiftRight(numBits) {
  if (isLong(numBits))
    numBits = numBits.toInt();
  if ((numBits &= 63) === 0)
    return this;
  else if (numBits < 32)
    return fromBits(this.low >>> numBits | this.high << 32 - numBits, this.high >> numBits, this.unsigned);
  else
    return fromBits(this.high >> numBits - 32, this.high >= 0 ? 0 : -1, this.unsigned);
};
LongPrototype.shr = LongPrototype.shiftRight;
LongPrototype.shiftRightUnsigned = function shiftRightUnsigned(numBits) {
  if (isLong(numBits))
    numBits = numBits.toInt();
  if ((numBits &= 63) === 0)
    return this;
  if (numBits < 32)
    return fromBits(this.low >>> numBits | this.high << 32 - numBits, this.high >>> numBits, this.unsigned);
  if (numBits === 32)
    return fromBits(this.high, 0, this.unsigned);
  return fromBits(this.high >>> numBits - 32, 0, this.unsigned);
};
LongPrototype.shru = LongPrototype.shiftRightUnsigned;
LongPrototype.shr_u = LongPrototype.shiftRightUnsigned;
LongPrototype.rotateLeft = function rotateLeft(numBits) {
  var b;
  if (isLong(numBits))
    numBits = numBits.toInt();
  if ((numBits &= 63) === 0)
    return this;
  if (numBits === 32)
    return fromBits(this.high, this.low, this.unsigned);
  if (numBits < 32) {
    b = 32 - numBits;
    return fromBits(this.low << numBits | this.high >>> b, this.high << numBits | this.low >>> b, this.unsigned);
  }
  numBits -= 32;
  b = 32 - numBits;
  return fromBits(this.high << numBits | this.low >>> b, this.low << numBits | this.high >>> b, this.unsigned);
};
LongPrototype.rotl = LongPrototype.rotateLeft;
LongPrototype.rotateRight = function rotateRight(numBits) {
  var b;
  if (isLong(numBits))
    numBits = numBits.toInt();
  if ((numBits &= 63) === 0)
    return this;
  if (numBits === 32)
    return fromBits(this.high, this.low, this.unsigned);
  if (numBits < 32) {
    b = 32 - numBits;
    return fromBits(this.high << b | this.low >>> numBits, this.low << b | this.high >>> numBits, this.unsigned);
  }
  numBits -= 32;
  b = 32 - numBits;
  return fromBits(this.low << b | this.high >>> numBits, this.high << b | this.low >>> numBits, this.unsigned);
};
LongPrototype.rotr = LongPrototype.rotateRight;
LongPrototype.toSigned = function toSigned() {
  if (!this.unsigned)
    return this;
  return fromBits(this.low, this.high, false);
};
LongPrototype.toUnsigned = function toUnsigned() {
  if (this.unsigned)
    return this;
  return fromBits(this.low, this.high, true);
};
LongPrototype.toBytes = function toBytes(le) {
  return le ? this.toBytesLE() : this.toBytesBE();
};
LongPrototype.toBytesLE = function toBytesLE() {
  var hi = this.high, lo = this.low;
  return [
    lo & 255,
    lo >>> 8 & 255,
    lo >>> 16 & 255,
    lo >>> 24,
    hi & 255,
    hi >>> 8 & 255,
    hi >>> 16 & 255,
    hi >>> 24
  ];
};
LongPrototype.toBytesBE = function toBytesBE() {
  var hi = this.high, lo = this.low;
  return [
    hi >>> 24,
    hi >>> 16 & 255,
    hi >>> 8 & 255,
    hi & 255,
    lo >>> 24,
    lo >>> 16 & 255,
    lo >>> 8 & 255,
    lo & 255
  ];
};
Long.fromBytes = function fromBytes(bytes, unsigned, le) {
  return le ? Long.fromBytesLE(bytes, unsigned) : Long.fromBytesBE(bytes, unsigned);
};
Long.fromBytesLE = function fromBytesLE(bytes, unsigned) {
  return new Long(
    bytes[0] | bytes[1] << 8 | bytes[2] << 16 | bytes[3] << 24,
    bytes[4] | bytes[5] << 8 | bytes[6] << 16 | bytes[7] << 24,
    unsigned
  );
};
Long.fromBytesBE = function fromBytesBE(bytes, unsigned) {
  return new Long(
    bytes[4] << 24 | bytes[5] << 16 | bytes[6] << 8 | bytes[7],
    bytes[0] << 24 | bytes[1] << 16 | bytes[2] << 8 | bytes[3],
    unsigned
  );
};
var long_default = Long;

// node_modules/@dcl/ecs/dist/components/generated/pb/decentraland/sdk/components/avatar_shape.gen.js
var import_minimal12 = __toESM(require_minimal2());
function createBasePBAvatarShape() {
  return {
    id: "",
    name: void 0,
    bodyShape: void 0,
    skinColor: void 0,
    hairColor: void 0,
    eyeColor: void 0,
    expressionTriggerId: void 0,
    expressionTriggerTimestamp: void 0,
    talking: void 0,
    wearables: [],
    emotes: []
  };
}
var PBAvatarShape;
(function(PBAvatarShape2) {
  function encode(message, writer = import_minimal12.default.Writer.create()) {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.name !== void 0) {
      writer.uint32(18).string(message.name);
    }
    if (message.bodyShape !== void 0) {
      writer.uint32(26).string(message.bodyShape);
    }
    if (message.skinColor !== void 0) {
      Color3.encode(message.skinColor, writer.uint32(34).fork()).ldelim();
    }
    if (message.hairColor !== void 0) {
      Color3.encode(message.hairColor, writer.uint32(42).fork()).ldelim();
    }
    if (message.eyeColor !== void 0) {
      Color3.encode(message.eyeColor, writer.uint32(50).fork()).ldelim();
    }
    if (message.expressionTriggerId !== void 0) {
      writer.uint32(58).string(message.expressionTriggerId);
    }
    if (message.expressionTriggerTimestamp !== void 0) {
      writer.uint32(64).int64(message.expressionTriggerTimestamp);
    }
    if (message.talking !== void 0) {
      writer.uint32(72).bool(message.talking);
    }
    for (const v of message.wearables) {
      writer.uint32(82).string(v);
    }
    for (const v of message.emotes) {
      writer.uint32(90).string(v);
    }
    return writer;
  }
  PBAvatarShape2.encode = encode;
  function decode(input, length2) {
    const reader = input instanceof import_minimal12.default.Reader ? input : import_minimal12.default.Reader.create(input);
    let end = length2 === void 0 ? reader.len : reader.pos + length2;
    const message = createBasePBAvatarShape();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }
          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }
          message.name = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }
          message.bodyShape = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }
          message.skinColor = Color3.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }
          message.hairColor = Color3.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }
          message.eyeColor = Color3.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }
          message.expressionTriggerId = reader.string();
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }
          message.expressionTriggerTimestamp = longToNumber(reader.int64());
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }
          message.talking = reader.bool();
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }
          message.wearables.push(reader.string());
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }
          message.emotes.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  }
  PBAvatarShape2.decode = decode;
})(PBAvatarShape || (PBAvatarShape = {}));
var tsProtoGlobalThis = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (false) {
    return void 0;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();
function longToNumber(long) {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new tsProtoGlobalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}
if (import_minimal12.default.util.Long !== long_default) {
  import_minimal12.default.util.Long = long_default;
  import_minimal12.default.configure();
}

// node_modules/@dcl/ecs/dist/components/generated/AvatarShape.gen.js
var AvatarShapeSchema = {
  COMPONENT_ID: 1080,
  serialize(value, builder) {
    const writer = PBAvatarShape.encode(value);
    const buffer2 = new Uint8Array(writer.finish(), 0, writer.len);
    builder.writeBuffer(buffer2, false);
  },
  deserialize(reader) {
    return PBAvatarShape.decode(reader.buffer(), reader.remainingBytes());
  },
  create() {
    return PBAvatarShape.decode(new Uint8Array());
  },
  jsonSchema: {
    type: "object",
    properties: {},
    serializationType: "protocol-buffer",
    protocolBuffer: "PBAvatarShape"
  }
};

// node_modules/@dcl/ecs/dist/components/generated/pb/decentraland/sdk/components/billboard.gen.js
var import_minimal13 = __toESM(require_minimal2());
var BillboardMode;
(function(BillboardMode2) {
  BillboardMode2[BillboardMode2["BM_NONE"] = 0] = "BM_NONE";
  BillboardMode2[BillboardMode2["BM_X"] = 1] = "BM_X";
  BillboardMode2[BillboardMode2["BM_Y"] = 2] = "BM_Y";
  BillboardMode2[BillboardMode2["BM_Z"] = 4] = "BM_Z";
  BillboardMode2[BillboardMode2["BM_ALL"] = 7] = "BM_ALL";
})(BillboardMode || (BillboardMode = {}));
function createBasePBBillboard() {
  return { billboardMode: void 0 };
}
var PBBillboard;
(function(PBBillboard2) {
  function encode(message, writer = import_minimal13.default.Writer.create()) {
    if (message.billboardMode !== void 0) {
      writer.uint32(8).int32(message.billboardMode);
    }
    return writer;
  }
  PBBillboard2.encode = encode;
  function decode(input, length2) {
    const reader = input instanceof import_minimal13.default.Reader ? input : import_minimal13.default.Reader.create(input);
    let end = length2 === void 0 ? reader.len : reader.pos + length2;
    const message = createBasePBBillboard();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }
          message.billboardMode = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  }
  PBBillboard2.decode = decode;
})(PBBillboard || (PBBillboard = {}));

// node_modules/@dcl/ecs/dist/components/generated/Billboard.gen.js
var BillboardSchema = {
  COMPONENT_ID: 1090,
  serialize(value, builder) {
    const writer = PBBillboard.encode(value);
    const buffer2 = new Uint8Array(writer.finish(), 0, writer.len);
    builder.writeBuffer(buffer2, false);
  },
  deserialize(reader) {
    return PBBillboard.decode(reader.buffer(), reader.remainingBytes());
  },
  create() {
    return PBBillboard.decode(new Uint8Array());
  },
  jsonSchema: {
    type: "object",
    properties: {},
    serializationType: "protocol-buffer",
    protocolBuffer: "PBBillboard"
  }
};

// node_modules/@dcl/ecs/dist/components/generated/pb/decentraland/sdk/components/camera_mode.gen.js
var import_minimal14 = __toESM(require_minimal2());
function createBasePBCameraMode() {
  return { mode: 0 };
}
var PBCameraMode;
(function(PBCameraMode2) {
  function encode(message, writer = import_minimal14.default.Writer.create()) {
    if (message.mode !== 0) {
      writer.uint32(8).int32(message.mode);
    }
    return writer;
  }
  PBCameraMode2.encode = encode;
  function decode(input, length2) {
    const reader = input instanceof import_minimal14.default.Reader ? input : import_minimal14.default.Reader.create(input);
    let end = length2 === void 0 ? reader.len : reader.pos + length2;
    const message = createBasePBCameraMode();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }
          message.mode = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  }
  PBCameraMode2.decode = decode;
})(PBCameraMode || (PBCameraMode = {}));

// node_modules/@dcl/ecs/dist/components/generated/CameraMode.gen.js
var CameraModeSchema = {
  COMPONENT_ID: 1072,
  serialize(value, builder) {
    const writer = PBCameraMode.encode(value);
    const buffer2 = new Uint8Array(writer.finish(), 0, writer.len);
    builder.writeBuffer(buffer2, false);
  },
  deserialize(reader) {
    return PBCameraMode.decode(reader.buffer(), reader.remainingBytes());
  },
  create() {
    return PBCameraMode.decode(new Uint8Array());
  },
  jsonSchema: {
    type: "object",
    properties: {},
    serializationType: "protocol-buffer",
    protocolBuffer: "PBCameraMode"
  }
};

// node_modules/@dcl/ecs/dist/components/generated/pb/decentraland/sdk/components/camera_mode_area.gen.js
var import_minimal15 = __toESM(require_minimal2());
function createBasePBCameraModeArea() {
  return { area: void 0, mode: 0 };
}
var PBCameraModeArea;
(function(PBCameraModeArea2) {
  function encode(message, writer = import_minimal15.default.Writer.create()) {
    if (message.area !== void 0) {
      Vector3.encode(message.area, writer.uint32(10).fork()).ldelim();
    }
    if (message.mode !== 0) {
      writer.uint32(16).int32(message.mode);
    }
    return writer;
  }
  PBCameraModeArea2.encode = encode;
  function decode(input, length2) {
    const reader = input instanceof import_minimal15.default.Reader ? input : import_minimal15.default.Reader.create(input);
    let end = length2 === void 0 ? reader.len : reader.pos + length2;
    const message = createBasePBCameraModeArea();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }
          message.area = Vector3.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }
          message.mode = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  }
  PBCameraModeArea2.decode = decode;
})(PBCameraModeArea || (PBCameraModeArea = {}));

// node_modules/@dcl/ecs/dist/components/generated/CameraModeArea.gen.js
var CameraModeAreaSchema = {
  COMPONENT_ID: 1071,
  serialize(value, builder) {
    const writer = PBCameraModeArea.encode(value);
    const buffer2 = new Uint8Array(writer.finish(), 0, writer.len);
    builder.writeBuffer(buffer2, false);
  },
  deserialize(reader) {
    return PBCameraModeArea.decode(reader.buffer(), reader.remainingBytes());
  },
  create() {
    return PBCameraModeArea.decode(new Uint8Array());
  },
  jsonSchema: {
    type: "object",
    properties: {},
    serializationType: "protocol-buffer",
    protocolBuffer: "PBCameraModeArea"
  }
};

// node_modules/@dcl/ecs/dist/components/generated/pb/decentraland/sdk/components/engine_info.gen.js
var import_minimal16 = __toESM(require_minimal2());
function createBasePBEngineInfo() {
  return { frameNumber: 0, totalRuntime: 0, tickNumber: 0 };
}
var PBEngineInfo;
(function(PBEngineInfo2) {
  function encode(message, writer = import_minimal16.default.Writer.create()) {
    if (message.frameNumber !== 0) {
      writer.uint32(8).uint32(message.frameNumber);
    }
    if (message.totalRuntime !== 0) {
      writer.uint32(21).float(message.totalRuntime);
    }
    if (message.tickNumber !== 0) {
      writer.uint32(24).uint32(message.tickNumber);
    }
    return writer;
  }
  PBEngineInfo2.encode = encode;
  function decode(input, length2) {
    const reader = input instanceof import_minimal16.default.Reader ? input : import_minimal16.default.Reader.create(input);
    let end = length2 === void 0 ? reader.len : reader.pos + length2;
    const message = createBasePBEngineInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }
          message.frameNumber = reader.uint32();
          continue;
        case 2:
          if (tag !== 21) {
            break;
          }
          message.totalRuntime = reader.float();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }
          message.tickNumber = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  }
  PBEngineInfo2.decode = decode;
})(PBEngineInfo || (PBEngineInfo = {}));

// node_modules/@dcl/ecs/dist/components/generated/EngineInfo.gen.js
var EngineInfoSchema = {
  COMPONENT_ID: 1048,
  serialize(value, builder) {
    const writer = PBEngineInfo.encode(value);
    const buffer2 = new Uint8Array(writer.finish(), 0, writer.len);
    builder.writeBuffer(buffer2, false);
  },
  deserialize(reader) {
    return PBEngineInfo.decode(reader.buffer(), reader.remainingBytes());
  },
  create() {
    return PBEngineInfo.decode(new Uint8Array());
  },
  jsonSchema: {
    type: "object",
    properties: {},
    serializationType: "protocol-buffer",
    protocolBuffer: "PBEngineInfo"
  }
};

// node_modules/@dcl/ecs/dist/components/generated/pb/decentraland/sdk/components/gltf_container.gen.js
var import_minimal17 = __toESM(require_minimal2());
function createBasePBGltfContainer() {
  return { src: "", visibleMeshesCollisionMask: void 0, invisibleMeshesCollisionMask: void 0 };
}
var PBGltfContainer;
(function(PBGltfContainer2) {
  function encode(message, writer = import_minimal17.default.Writer.create()) {
    if (message.src !== "") {
      writer.uint32(10).string(message.src);
    }
    if (message.visibleMeshesCollisionMask !== void 0) {
      writer.uint32(32).uint32(message.visibleMeshesCollisionMask);
    }
    if (message.invisibleMeshesCollisionMask !== void 0) {
      writer.uint32(40).uint32(message.invisibleMeshesCollisionMask);
    }
    return writer;
  }
  PBGltfContainer2.encode = encode;
  function decode(input, length2) {
    const reader = input instanceof import_minimal17.default.Reader ? input : import_minimal17.default.Reader.create(input);
    let end = length2 === void 0 ? reader.len : reader.pos + length2;
    const message = createBasePBGltfContainer();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }
          message.src = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }
          message.visibleMeshesCollisionMask = reader.uint32();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }
          message.invisibleMeshesCollisionMask = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  }
  PBGltfContainer2.decode = decode;
})(PBGltfContainer || (PBGltfContainer = {}));

// node_modules/@dcl/ecs/dist/components/generated/GltfContainer.gen.js
var GltfContainerSchema = {
  COMPONENT_ID: 1041,
  serialize(value, builder) {
    const writer = PBGltfContainer.encode(value);
    const buffer2 = new Uint8Array(writer.finish(), 0, writer.len);
    builder.writeBuffer(buffer2, false);
  },
  deserialize(reader) {
    return PBGltfContainer.decode(reader.buffer(), reader.remainingBytes());
  },
  create() {
    return PBGltfContainer.decode(new Uint8Array());
  },
  jsonSchema: {
    type: "object",
    properties: {},
    serializationType: "protocol-buffer",
    protocolBuffer: "PBGltfContainer"
  }
};

// node_modules/@dcl/ecs/dist/components/generated/pb/decentraland/sdk/components/gltf_container_loading_state.gen.js
var import_minimal18 = __toESM(require_minimal2());
function createBasePBGltfContainerLoadingState() {
  return { currentState: 0 };
}
var PBGltfContainerLoadingState;
(function(PBGltfContainerLoadingState2) {
  function encode(message, writer = import_minimal18.default.Writer.create()) {
    if (message.currentState !== 0) {
      writer.uint32(8).int32(message.currentState);
    }
    return writer;
  }
  PBGltfContainerLoadingState2.encode = encode;
  function decode(input, length2) {
    const reader = input instanceof import_minimal18.default.Reader ? input : import_minimal18.default.Reader.create(input);
    let end = length2 === void 0 ? reader.len : reader.pos + length2;
    const message = createBasePBGltfContainerLoadingState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }
          message.currentState = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  }
  PBGltfContainerLoadingState2.decode = decode;
})(PBGltfContainerLoadingState || (PBGltfContainerLoadingState = {}));

// node_modules/@dcl/ecs/dist/components/generated/GltfContainerLoadingState.gen.js
var GltfContainerLoadingStateSchema = {
  COMPONENT_ID: 1049,
  serialize(value, builder) {
    const writer = PBGltfContainerLoadingState.encode(value);
    const buffer2 = new Uint8Array(writer.finish(), 0, writer.len);
    builder.writeBuffer(buffer2, false);
  },
  deserialize(reader) {
    return PBGltfContainerLoadingState.decode(reader.buffer(), reader.remainingBytes());
  },
  create() {
    return PBGltfContainerLoadingState.decode(new Uint8Array());
  },
  jsonSchema: {
    type: "object",
    properties: {},
    serializationType: "protocol-buffer",
    protocolBuffer: "PBGltfContainerLoadingState"
  }
};

// node_modules/@dcl/ecs/dist/components/generated/pb/decentraland/sdk/components/input_modifier.gen.js
var import_minimal19 = __toESM(require_minimal2());
function createBasePBInputModifier() {
  return { mode: void 0 };
}
var PBInputModifier;
(function(PBInputModifier2) {
  function encode(message, writer = import_minimal19.default.Writer.create()) {
    switch (message.mode?.$case) {
      case "standard":
        PBInputModifier_StandardInput.encode(message.mode.standard, writer.uint32(10).fork()).ldelim();
        break;
    }
    return writer;
  }
  PBInputModifier2.encode = encode;
  function decode(input, length2) {
    const reader = input instanceof import_minimal19.default.Reader ? input : import_minimal19.default.Reader.create(input);
    let end = length2 === void 0 ? reader.len : reader.pos + length2;
    const message = createBasePBInputModifier();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }
          message.mode = { $case: "standard", standard: PBInputModifier_StandardInput.decode(reader, reader.uint32()) };
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  }
  PBInputModifier2.decode = decode;
})(PBInputModifier || (PBInputModifier = {}));
function createBasePBInputModifier_StandardInput() {
  return {
    disableAll: void 0,
    disableWalk: void 0,
    disableJog: void 0,
    disableRun: void 0,
    disableJump: void 0,
    disableEmote: void 0
  };
}
var PBInputModifier_StandardInput;
(function(PBInputModifier_StandardInput2) {
  function encode(message, writer = import_minimal19.default.Writer.create()) {
    if (message.disableAll !== void 0) {
      writer.uint32(8).bool(message.disableAll);
    }
    if (message.disableWalk !== void 0) {
      writer.uint32(16).bool(message.disableWalk);
    }
    if (message.disableJog !== void 0) {
      writer.uint32(24).bool(message.disableJog);
    }
    if (message.disableRun !== void 0) {
      writer.uint32(32).bool(message.disableRun);
    }
    if (message.disableJump !== void 0) {
      writer.uint32(40).bool(message.disableJump);
    }
    if (message.disableEmote !== void 0) {
      writer.uint32(48).bool(message.disableEmote);
    }
    return writer;
  }
  PBInputModifier_StandardInput2.encode = encode;
  function decode(input, length2) {
    const reader = input instanceof import_minimal19.default.Reader ? input : import_minimal19.default.Reader.create(input);
    let end = length2 === void 0 ? reader.len : reader.pos + length2;
    const message = createBasePBInputModifier_StandardInput();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }
          message.disableAll = reader.bool();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }
          message.disableWalk = reader.bool();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }
          message.disableJog = reader.bool();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }
          message.disableRun = reader.bool();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }
          message.disableJump = reader.bool();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }
          message.disableEmote = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  }
  PBInputModifier_StandardInput2.decode = decode;
})(PBInputModifier_StandardInput || (PBInputModifier_StandardInput = {}));

// node_modules/@dcl/ecs/dist/components/generated/InputModifier.gen.js
var InputModifierSchema = {
  COMPONENT_ID: 1078,
  serialize(value, builder) {
    const writer = PBInputModifier.encode(value);
    const buffer2 = new Uint8Array(writer.finish(), 0, writer.len);
    builder.writeBuffer(buffer2, false);
  },
  deserialize(reader) {
    return PBInputModifier.decode(reader.buffer(), reader.remainingBytes());
  },
  create() {
    return PBInputModifier.decode(new Uint8Array());
  },
  jsonSchema: {
    type: "object",
    properties: {},
    serializationType: "protocol-buffer",
    protocolBuffer: "PBInputModifier"
  }
};

// node_modules/@dcl/ecs/dist/components/generated/pb/decentraland/sdk/components/main_camera.gen.js
var import_minimal20 = __toESM(require_minimal2());
function createBasePBMainCamera() {
  return { virtualCameraEntity: void 0 };
}
var PBMainCamera;
(function(PBMainCamera2) {
  function encode(message, writer = import_minimal20.default.Writer.create()) {
    if (message.virtualCameraEntity !== void 0) {
      writer.uint32(8).uint32(message.virtualCameraEntity);
    }
    return writer;
  }
  PBMainCamera2.encode = encode;
  function decode(input, length2) {
    const reader = input instanceof import_minimal20.default.Reader ? input : import_minimal20.default.Reader.create(input);
    let end = length2 === void 0 ? reader.len : reader.pos + length2;
    const message = createBasePBMainCamera();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }
          message.virtualCameraEntity = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  }
  PBMainCamera2.decode = decode;
})(PBMainCamera || (PBMainCamera = {}));

// node_modules/@dcl/ecs/dist/components/generated/MainCamera.gen.js
var MainCameraSchema = {
  COMPONENT_ID: 1075,
  serialize(value, builder) {
    const writer = PBMainCamera.encode(value);
    const buffer2 = new Uint8Array(writer.finish(), 0, writer.len);
    builder.writeBuffer(buffer2, false);
  },
  deserialize(reader) {
    return PBMainCamera.decode(reader.buffer(), reader.remainingBytes());
  },
  create() {
    return PBMainCamera.decode(new Uint8Array());
  },
  jsonSchema: {
    type: "object",
    properties: {},
    serializationType: "protocol-buffer",
    protocolBuffer: "PBMainCamera"
  }
};

// node_modules/@dcl/ecs/dist/components/generated/pb/decentraland/sdk/components/material.gen.js
var import_minimal22 = __toESM(require_minimal2());

// node_modules/@dcl/ecs/dist/components/generated/pb/decentraland/common/texture.gen.js
var import_minimal21 = __toESM(require_minimal2());
var TextureWrapMode;
(function(TextureWrapMode2) {
  TextureWrapMode2[TextureWrapMode2["TWM_REPEAT"] = 0] = "TWM_REPEAT";
  TextureWrapMode2[TextureWrapMode2["TWM_CLAMP"] = 1] = "TWM_CLAMP";
  TextureWrapMode2[TextureWrapMode2["TWM_MIRROR"] = 2] = "TWM_MIRROR";
})(TextureWrapMode || (TextureWrapMode = {}));
var TextureFilterMode;
(function(TextureFilterMode2) {
  TextureFilterMode2[TextureFilterMode2["TFM_POINT"] = 0] = "TFM_POINT";
  TextureFilterMode2[TextureFilterMode2["TFM_BILINEAR"] = 1] = "TFM_BILINEAR";
  TextureFilterMode2[TextureFilterMode2["TFM_TRILINEAR"] = 2] = "TFM_TRILINEAR";
})(TextureFilterMode || (TextureFilterMode = {}));
function createBaseTexture() {
  return { src: "", wrapMode: void 0, filterMode: void 0, offset: void 0, tiling: void 0 };
}
var Texture;
(function(Texture2) {
  function encode(message, writer = import_minimal21.default.Writer.create()) {
    if (message.src !== "") {
      writer.uint32(10).string(message.src);
    }
    if (message.wrapMode !== void 0) {
      writer.uint32(16).int32(message.wrapMode);
    }
    if (message.filterMode !== void 0) {
      writer.uint32(24).int32(message.filterMode);
    }
    if (message.offset !== void 0) {
      Vector2.encode(message.offset, writer.uint32(34).fork()).ldelim();
    }
    if (message.tiling !== void 0) {
      Vector2.encode(message.tiling, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  }
  Texture2.encode = encode;
  function decode(input, length2) {
    const reader = input instanceof import_minimal21.default.Reader ? input : import_minimal21.default.Reader.create(input);
    let end = length2 === void 0 ? reader.len : reader.pos + length2;
    const message = createBaseTexture();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }
          message.src = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }
          message.wrapMode = reader.int32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }
          message.filterMode = reader.int32();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }
          message.offset = Vector2.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }
          message.tiling = Vector2.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  }
  Texture2.decode = decode;
})(Texture || (Texture = {}));
function createBaseAvatarTexture() {
  return { userId: "", wrapMode: void 0, filterMode: void 0 };
}
var AvatarTexture;
(function(AvatarTexture2) {
  function encode(message, writer = import_minimal21.default.Writer.create()) {
    if (message.userId !== "") {
      writer.uint32(10).string(message.userId);
    }
    if (message.wrapMode !== void 0) {
      writer.uint32(16).int32(message.wrapMode);
    }
    if (message.filterMode !== void 0) {
      writer.uint32(24).int32(message.filterMode);
    }
    return writer;
  }
  AvatarTexture2.encode = encode;
  function decode(input, length2) {
    const reader = input instanceof import_minimal21.default.Reader ? input : import_minimal21.default.Reader.create(input);
    let end = length2 === void 0 ? reader.len : reader.pos + length2;
    const message = createBaseAvatarTexture();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }
          message.userId = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }
          message.wrapMode = reader.int32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }
          message.filterMode = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  }
  AvatarTexture2.decode = decode;
})(AvatarTexture || (AvatarTexture = {}));
function createBaseVideoTexture() {
  return { videoPlayerEntity: 0, wrapMode: void 0, filterMode: void 0 };
}
var VideoTexture;
(function(VideoTexture2) {
  function encode(message, writer = import_minimal21.default.Writer.create()) {
    if (message.videoPlayerEntity !== 0) {
      writer.uint32(8).uint32(message.videoPlayerEntity);
    }
    if (message.wrapMode !== void 0) {
      writer.uint32(16).int32(message.wrapMode);
    }
    if (message.filterMode !== void 0) {
      writer.uint32(24).int32(message.filterMode);
    }
    return writer;
  }
  VideoTexture2.encode = encode;
  function decode(input, length2) {
    const reader = input instanceof import_minimal21.default.Reader ? input : import_minimal21.default.Reader.create(input);
    let end = length2 === void 0 ? reader.len : reader.pos + length2;
    const message = createBaseVideoTexture();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }
          message.videoPlayerEntity = reader.uint32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }
          message.wrapMode = reader.int32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }
          message.filterMode = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  }
  VideoTexture2.decode = decode;
})(VideoTexture || (VideoTexture = {}));
function createBaseTextureUnion() {
  return { tex: void 0 };
}
var TextureUnion;
(function(TextureUnion2) {
  function encode(message, writer = import_minimal21.default.Writer.create()) {
    switch (message.tex?.$case) {
      case "texture":
        Texture.encode(message.tex.texture, writer.uint32(10).fork()).ldelim();
        break;
      case "avatarTexture":
        AvatarTexture.encode(message.tex.avatarTexture, writer.uint32(18).fork()).ldelim();
        break;
      case "videoTexture":
        VideoTexture.encode(message.tex.videoTexture, writer.uint32(26).fork()).ldelim();
        break;
    }
    return writer;
  }
  TextureUnion2.encode = encode;
  function decode(input, length2) {
    const reader = input instanceof import_minimal21.default.Reader ? input : import_minimal21.default.Reader.create(input);
    let end = length2 === void 0 ? reader.len : reader.pos + length2;
    const message = createBaseTextureUnion();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }
          message.tex = { $case: "texture", texture: Texture.decode(reader, reader.uint32()) };
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }
          message.tex = { $case: "avatarTexture", avatarTexture: AvatarTexture.decode(reader, reader.uint32()) };
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }
          message.tex = { $case: "videoTexture", videoTexture: VideoTexture.decode(reader, reader.uint32()) };
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  }
  TextureUnion2.decode = decode;
})(TextureUnion || (TextureUnion = {}));

// node_modules/@dcl/ecs/dist/components/generated/pb/decentraland/sdk/components/material.gen.js
var MaterialTransparencyMode;
(function(MaterialTransparencyMode2) {
  MaterialTransparencyMode2[MaterialTransparencyMode2["MTM_OPAQUE"] = 0] = "MTM_OPAQUE";
  MaterialTransparencyMode2[MaterialTransparencyMode2["MTM_ALPHA_TEST"] = 1] = "MTM_ALPHA_TEST";
  MaterialTransparencyMode2[MaterialTransparencyMode2["MTM_ALPHA_BLEND"] = 2] = "MTM_ALPHA_BLEND";
  MaterialTransparencyMode2[MaterialTransparencyMode2["MTM_ALPHA_TEST_AND_ALPHA_BLEND"] = 3] = "MTM_ALPHA_TEST_AND_ALPHA_BLEND";
  MaterialTransparencyMode2[MaterialTransparencyMode2["MTM_AUTO"] = 4] = "MTM_AUTO";
})(MaterialTransparencyMode || (MaterialTransparencyMode = {}));
function createBasePBMaterial() {
  return { material: void 0 };
}
var PBMaterial;
(function(PBMaterial2) {
  function encode(message, writer = import_minimal22.default.Writer.create()) {
    switch (message.material?.$case) {
      case "unlit":
        PBMaterial_UnlitMaterial.encode(message.material.unlit, writer.uint32(10).fork()).ldelim();
        break;
      case "pbr":
        PBMaterial_PbrMaterial.encode(message.material.pbr, writer.uint32(18).fork()).ldelim();
        break;
    }
    return writer;
  }
  PBMaterial2.encode = encode;
  function decode(input, length2) {
    const reader = input instanceof import_minimal22.default.Reader ? input : import_minimal22.default.Reader.create(input);
    let end = length2 === void 0 ? reader.len : reader.pos + length2;
    const message = createBasePBMaterial();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }
          message.material = { $case: "unlit", unlit: PBMaterial_UnlitMaterial.decode(reader, reader.uint32()) };
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }
          message.material = { $case: "pbr", pbr: PBMaterial_PbrMaterial.decode(reader, reader.uint32()) };
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  }
  PBMaterial2.decode = decode;
})(PBMaterial || (PBMaterial = {}));
function createBasePBMaterial_UnlitMaterial() {
  return {
    texture: void 0,
    alphaTest: void 0,
    castShadows: void 0,
    diffuseColor: void 0,
    alphaTexture: void 0
  };
}
var PBMaterial_UnlitMaterial;
(function(PBMaterial_UnlitMaterial2) {
  function encode(message, writer = import_minimal22.default.Writer.create()) {
    if (message.texture !== void 0) {
      TextureUnion.encode(message.texture, writer.uint32(10).fork()).ldelim();
    }
    if (message.alphaTest !== void 0) {
      writer.uint32(21).float(message.alphaTest);
    }
    if (message.castShadows !== void 0) {
      writer.uint32(24).bool(message.castShadows);
    }
    if (message.diffuseColor !== void 0) {
      Color4.encode(message.diffuseColor, writer.uint32(34).fork()).ldelim();
    }
    if (message.alphaTexture !== void 0) {
      TextureUnion.encode(message.alphaTexture, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  }
  PBMaterial_UnlitMaterial2.encode = encode;
  function decode(input, length2) {
    const reader = input instanceof import_minimal22.default.Reader ? input : import_minimal22.default.Reader.create(input);
    let end = length2 === void 0 ? reader.len : reader.pos + length2;
    const message = createBasePBMaterial_UnlitMaterial();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }
          message.texture = TextureUnion.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 21) {
            break;
          }
          message.alphaTest = reader.float();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }
          message.castShadows = reader.bool();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }
          message.diffuseColor = Color4.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }
          message.alphaTexture = TextureUnion.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  }
  PBMaterial_UnlitMaterial2.decode = decode;
})(PBMaterial_UnlitMaterial || (PBMaterial_UnlitMaterial = {}));
function createBasePBMaterial_PbrMaterial() {
  return {
    texture: void 0,
    alphaTest: void 0,
    castShadows: void 0,
    alphaTexture: void 0,
    emissiveTexture: void 0,
    bumpTexture: void 0,
    albedoColor: void 0,
    emissiveColor: void 0,
    reflectivityColor: void 0,
    transparencyMode: void 0,
    metallic: void 0,
    roughness: void 0,
    specularIntensity: void 0,
    emissiveIntensity: void 0,
    directIntensity: void 0
  };
}
var PBMaterial_PbrMaterial;
(function(PBMaterial_PbrMaterial2) {
  function encode(message, writer = import_minimal22.default.Writer.create()) {
    if (message.texture !== void 0) {
      TextureUnion.encode(message.texture, writer.uint32(10).fork()).ldelim();
    }
    if (message.alphaTest !== void 0) {
      writer.uint32(21).float(message.alphaTest);
    }
    if (message.castShadows !== void 0) {
      writer.uint32(24).bool(message.castShadows);
    }
    if (message.alphaTexture !== void 0) {
      TextureUnion.encode(message.alphaTexture, writer.uint32(34).fork()).ldelim();
    }
    if (message.emissiveTexture !== void 0) {
      TextureUnion.encode(message.emissiveTexture, writer.uint32(42).fork()).ldelim();
    }
    if (message.bumpTexture !== void 0) {
      TextureUnion.encode(message.bumpTexture, writer.uint32(50).fork()).ldelim();
    }
    if (message.albedoColor !== void 0) {
      Color4.encode(message.albedoColor, writer.uint32(58).fork()).ldelim();
    }
    if (message.emissiveColor !== void 0) {
      Color3.encode(message.emissiveColor, writer.uint32(66).fork()).ldelim();
    }
    if (message.reflectivityColor !== void 0) {
      Color3.encode(message.reflectivityColor, writer.uint32(74).fork()).ldelim();
    }
    if (message.transparencyMode !== void 0) {
      writer.uint32(80).int32(message.transparencyMode);
    }
    if (message.metallic !== void 0) {
      writer.uint32(93).float(message.metallic);
    }
    if (message.roughness !== void 0) {
      writer.uint32(101).float(message.roughness);
    }
    if (message.specularIntensity !== void 0) {
      writer.uint32(117).float(message.specularIntensity);
    }
    if (message.emissiveIntensity !== void 0) {
      writer.uint32(125).float(message.emissiveIntensity);
    }
    if (message.directIntensity !== void 0) {
      writer.uint32(133).float(message.directIntensity);
    }
    return writer;
  }
  PBMaterial_PbrMaterial2.encode = encode;
  function decode(input, length2) {
    const reader = input instanceof import_minimal22.default.Reader ? input : import_minimal22.default.Reader.create(input);
    let end = length2 === void 0 ? reader.len : reader.pos + length2;
    const message = createBasePBMaterial_PbrMaterial();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }
          message.texture = TextureUnion.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 21) {
            break;
          }
          message.alphaTest = reader.float();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }
          message.castShadows = reader.bool();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }
          message.alphaTexture = TextureUnion.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }
          message.emissiveTexture = TextureUnion.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }
          message.bumpTexture = TextureUnion.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }
          message.albedoColor = Color4.decode(reader, reader.uint32());
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }
          message.emissiveColor = Color3.decode(reader, reader.uint32());
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }
          message.reflectivityColor = Color3.decode(reader, reader.uint32());
          continue;
        case 10:
          if (tag !== 80) {
            break;
          }
          message.transparencyMode = reader.int32();
          continue;
        case 11:
          if (tag !== 93) {
            break;
          }
          message.metallic = reader.float();
          continue;
        case 12:
          if (tag !== 101) {
            break;
          }
          message.roughness = reader.float();
          continue;
        case 14:
          if (tag !== 117) {
            break;
          }
          message.specularIntensity = reader.float();
          continue;
        case 15:
          if (tag !== 125) {
            break;
          }
          message.emissiveIntensity = reader.float();
          continue;
        case 16:
          if (tag !== 133) {
            break;
          }
          message.directIntensity = reader.float();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  }
  PBMaterial_PbrMaterial2.decode = decode;
})(PBMaterial_PbrMaterial || (PBMaterial_PbrMaterial = {}));

// node_modules/@dcl/ecs/dist/components/generated/Material.gen.js
var MaterialSchema = {
  COMPONENT_ID: 1017,
  serialize(value, builder) {
    const writer = PBMaterial.encode(value);
    const buffer2 = new Uint8Array(writer.finish(), 0, writer.len);
    builder.writeBuffer(buffer2, false);
  },
  deserialize(reader) {
    return PBMaterial.decode(reader.buffer(), reader.remainingBytes());
  },
  create() {
    return PBMaterial.decode(new Uint8Array());
  },
  jsonSchema: {
    type: "object",
    properties: {},
    serializationType: "protocol-buffer",
    protocolBuffer: "PBMaterial"
  }
};

// node_modules/@dcl/ecs/dist/components/generated/pb/decentraland/sdk/components/mesh_collider.gen.js
var import_minimal23 = __toESM(require_minimal2());
var ColliderLayer;
(function(ColliderLayer2) {
  ColliderLayer2[ColliderLayer2["CL_NONE"] = 0] = "CL_NONE";
  ColliderLayer2[ColliderLayer2["CL_POINTER"] = 1] = "CL_POINTER";
  ColliderLayer2[ColliderLayer2["CL_PHYSICS"] = 2] = "CL_PHYSICS";
  ColliderLayer2[ColliderLayer2["CL_RESERVED1"] = 4] = "CL_RESERVED1";
  ColliderLayer2[ColliderLayer2["CL_RESERVED2"] = 8] = "CL_RESERVED2";
  ColliderLayer2[ColliderLayer2["CL_RESERVED3"] = 16] = "CL_RESERVED3";
  ColliderLayer2[ColliderLayer2["CL_RESERVED4"] = 32] = "CL_RESERVED4";
  ColliderLayer2[ColliderLayer2["CL_RESERVED5"] = 64] = "CL_RESERVED5";
  ColliderLayer2[ColliderLayer2["CL_RESERVED6"] = 128] = "CL_RESERVED6";
  ColliderLayer2[ColliderLayer2["CL_CUSTOM1"] = 256] = "CL_CUSTOM1";
  ColliderLayer2[ColliderLayer2["CL_CUSTOM2"] = 512] = "CL_CUSTOM2";
  ColliderLayer2[ColliderLayer2["CL_CUSTOM3"] = 1024] = "CL_CUSTOM3";
  ColliderLayer2[ColliderLayer2["CL_CUSTOM4"] = 2048] = "CL_CUSTOM4";
  ColliderLayer2[ColliderLayer2["CL_CUSTOM5"] = 4096] = "CL_CUSTOM5";
  ColliderLayer2[ColliderLayer2["CL_CUSTOM6"] = 8192] = "CL_CUSTOM6";
  ColliderLayer2[ColliderLayer2["CL_CUSTOM7"] = 16384] = "CL_CUSTOM7";
  ColliderLayer2[ColliderLayer2["CL_CUSTOM8"] = 32768] = "CL_CUSTOM8";
})(ColliderLayer || (ColliderLayer = {}));
function createBasePBMeshCollider() {
  return { collisionMask: void 0, mesh: void 0 };
}
var PBMeshCollider;
(function(PBMeshCollider2) {
  function encode(message, writer = import_minimal23.default.Writer.create()) {
    if (message.collisionMask !== void 0) {
      writer.uint32(8).uint32(message.collisionMask);
    }
    switch (message.mesh?.$case) {
      case "box":
        PBMeshCollider_BoxMesh.encode(message.mesh.box, writer.uint32(18).fork()).ldelim();
        break;
      case "sphere":
        PBMeshCollider_SphereMesh.encode(message.mesh.sphere, writer.uint32(26).fork()).ldelim();
        break;
      case "cylinder":
        PBMeshCollider_CylinderMesh.encode(message.mesh.cylinder, writer.uint32(34).fork()).ldelim();
        break;
      case "plane":
        PBMeshCollider_PlaneMesh.encode(message.mesh.plane, writer.uint32(42).fork()).ldelim();
        break;
    }
    return writer;
  }
  PBMeshCollider2.encode = encode;
  function decode(input, length2) {
    const reader = input instanceof import_minimal23.default.Reader ? input : import_minimal23.default.Reader.create(input);
    let end = length2 === void 0 ? reader.len : reader.pos + length2;
    const message = createBasePBMeshCollider();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }
          message.collisionMask = reader.uint32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }
          message.mesh = { $case: "box", box: PBMeshCollider_BoxMesh.decode(reader, reader.uint32()) };
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }
          message.mesh = { $case: "sphere", sphere: PBMeshCollider_SphereMesh.decode(reader, reader.uint32()) };
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }
          message.mesh = { $case: "cylinder", cylinder: PBMeshCollider_CylinderMesh.decode(reader, reader.uint32()) };
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }
          message.mesh = { $case: "plane", plane: PBMeshCollider_PlaneMesh.decode(reader, reader.uint32()) };
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  }
  PBMeshCollider2.decode = decode;
})(PBMeshCollider || (PBMeshCollider = {}));
function createBasePBMeshCollider_BoxMesh() {
  return {};
}
var PBMeshCollider_BoxMesh;
(function(PBMeshCollider_BoxMesh2) {
  function encode(_, writer = import_minimal23.default.Writer.create()) {
    return writer;
  }
  PBMeshCollider_BoxMesh2.encode = encode;
  function decode(input, length2) {
    const reader = input instanceof import_minimal23.default.Reader ? input : import_minimal23.default.Reader.create(input);
    let end = length2 === void 0 ? reader.len : reader.pos + length2;
    const message = createBasePBMeshCollider_BoxMesh();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  }
  PBMeshCollider_BoxMesh2.decode = decode;
})(PBMeshCollider_BoxMesh || (PBMeshCollider_BoxMesh = {}));
function createBasePBMeshCollider_CylinderMesh() {
  return { radiusTop: void 0, radiusBottom: void 0 };
}
var PBMeshCollider_CylinderMesh;
(function(PBMeshCollider_CylinderMesh2) {
  function encode(message, writer = import_minimal23.default.Writer.create()) {
    if (message.radiusTop !== void 0) {
      writer.uint32(13).float(message.radiusTop);
    }
    if (message.radiusBottom !== void 0) {
      writer.uint32(21).float(message.radiusBottom);
    }
    return writer;
  }
  PBMeshCollider_CylinderMesh2.encode = encode;
  function decode(input, length2) {
    const reader = input instanceof import_minimal23.default.Reader ? input : import_minimal23.default.Reader.create(input);
    let end = length2 === void 0 ? reader.len : reader.pos + length2;
    const message = createBasePBMeshCollider_CylinderMesh();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 13) {
            break;
          }
          message.radiusTop = reader.float();
          continue;
        case 2:
          if (tag !== 21) {
            break;
          }
          message.radiusBottom = reader.float();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  }
  PBMeshCollider_CylinderMesh2.decode = decode;
})(PBMeshCollider_CylinderMesh || (PBMeshCollider_CylinderMesh = {}));
function createBasePBMeshCollider_PlaneMesh() {
  return {};
}
var PBMeshCollider_PlaneMesh;
(function(PBMeshCollider_PlaneMesh2) {
  function encode(_, writer = import_minimal23.default.Writer.create()) {
    return writer;
  }
  PBMeshCollider_PlaneMesh2.encode = encode;
  function decode(input, length2) {
    const reader = input instanceof import_minimal23.default.Reader ? input : import_minimal23.default.Reader.create(input);
    let end = length2 === void 0 ? reader.len : reader.pos + length2;
    const message = createBasePBMeshCollider_PlaneMesh();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  }
  PBMeshCollider_PlaneMesh2.decode = decode;
})(PBMeshCollider_PlaneMesh || (PBMeshCollider_PlaneMesh = {}));
function createBasePBMeshCollider_SphereMesh() {
  return {};
}
var PBMeshCollider_SphereMesh;
(function(PBMeshCollider_SphereMesh2) {
  function encode(_, writer = import_minimal23.default.Writer.create()) {
    return writer;
  }
  PBMeshCollider_SphereMesh2.encode = encode;
  function decode(input, length2) {
    const reader = input instanceof import_minimal23.default.Reader ? input : import_minimal23.default.Reader.create(input);
    let end = length2 === void 0 ? reader.len : reader.pos + length2;
    const message = createBasePBMeshCollider_SphereMesh();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  }
  PBMeshCollider_SphereMesh2.decode = decode;
})(PBMeshCollider_SphereMesh || (PBMeshCollider_SphereMesh = {}));

// node_modules/@dcl/ecs/dist/components/generated/MeshCollider.gen.js
var MeshColliderSchema = {
  COMPONENT_ID: 1019,
  serialize(value, builder) {
    const writer = PBMeshCollider.encode(value);
    const buffer2 = new Uint8Array(writer.finish(), 0, writer.len);
    builder.writeBuffer(buffer2, false);
  },
  deserialize(reader) {
    return PBMeshCollider.decode(reader.buffer(), reader.remainingBytes());
  },
  create() {
    return PBMeshCollider.decode(new Uint8Array());
  },
  jsonSchema: {
    type: "object",
    properties: {},
    serializationType: "protocol-buffer",
    protocolBuffer: "PBMeshCollider"
  }
};

// node_modules/@dcl/ecs/dist/components/generated/pb/decentraland/sdk/components/mesh_renderer.gen.js
var import_minimal24 = __toESM(require_minimal2());
function createBasePBMeshRenderer() {
  return { mesh: void 0 };
}
var PBMeshRenderer;
(function(PBMeshRenderer2) {
  function encode(message, writer = import_minimal24.default.Writer.create()) {
    switch (message.mesh?.$case) {
      case "box":
        PBMeshRenderer_BoxMesh.encode(message.mesh.box, writer.uint32(10).fork()).ldelim();
        break;
      case "sphere":
        PBMeshRenderer_SphereMesh.encode(message.mesh.sphere, writer.uint32(18).fork()).ldelim();
        break;
      case "cylinder":
        PBMeshRenderer_CylinderMesh.encode(message.mesh.cylinder, writer.uint32(26).fork()).ldelim();
        break;
      case "plane":
        PBMeshRenderer_PlaneMesh.encode(message.mesh.plane, writer.uint32(34).fork()).ldelim();
        break;
    }
    return writer;
  }
  PBMeshRenderer2.encode = encode;
  function decode(input, length2) {
    const reader = input instanceof import_minimal24.default.Reader ? input : import_minimal24.default.Reader.create(input);
    let end = length2 === void 0 ? reader.len : reader.pos + length2;
    const message = createBasePBMeshRenderer();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }
          message.mesh = { $case: "box", box: PBMeshRenderer_BoxMesh.decode(reader, reader.uint32()) };
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }
          message.mesh = { $case: "sphere", sphere: PBMeshRenderer_SphereMesh.decode(reader, reader.uint32()) };
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }
          message.mesh = { $case: "cylinder", cylinder: PBMeshRenderer_CylinderMesh.decode(reader, reader.uint32()) };
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }
          message.mesh = { $case: "plane", plane: PBMeshRenderer_PlaneMesh.decode(reader, reader.uint32()) };
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  }
  PBMeshRenderer2.decode = decode;
})(PBMeshRenderer || (PBMeshRenderer = {}));
function createBasePBMeshRenderer_BoxMesh() {
  return { uvs: [] };
}
var PBMeshRenderer_BoxMesh;
(function(PBMeshRenderer_BoxMesh2) {
  function encode(message, writer = import_minimal24.default.Writer.create()) {
    writer.uint32(10).fork();
    for (const v of message.uvs) {
      writer.float(v);
    }
    writer.ldelim();
    return writer;
  }
  PBMeshRenderer_BoxMesh2.encode = encode;
  function decode(input, length2) {
    const reader = input instanceof import_minimal24.default.Reader ? input : import_minimal24.default.Reader.create(input);
    let end = length2 === void 0 ? reader.len : reader.pos + length2;
    const message = createBasePBMeshRenderer_BoxMesh();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag === 13) {
            message.uvs.push(reader.float());
            continue;
          }
          if (tag === 10) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.uvs.push(reader.float());
            }
            continue;
          }
          break;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  }
  PBMeshRenderer_BoxMesh2.decode = decode;
})(PBMeshRenderer_BoxMesh || (PBMeshRenderer_BoxMesh = {}));
function createBasePBMeshRenderer_CylinderMesh() {
  return { radiusTop: void 0, radiusBottom: void 0 };
}
var PBMeshRenderer_CylinderMesh;
(function(PBMeshRenderer_CylinderMesh2) {
  function encode(message, writer = import_minimal24.default.Writer.create()) {
    if (message.radiusTop !== void 0) {
      writer.uint32(13).float(message.radiusTop);
    }
    if (message.radiusBottom !== void 0) {
      writer.uint32(21).float(message.radiusBottom);
    }
    return writer;
  }
  PBMeshRenderer_CylinderMesh2.encode = encode;
  function decode(input, length2) {
    const reader = input instanceof import_minimal24.default.Reader ? input : import_minimal24.default.Reader.create(input);
    let end = length2 === void 0 ? reader.len : reader.pos + length2;
    const message = createBasePBMeshRenderer_CylinderMesh();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 13) {
            break;
          }
          message.radiusTop = reader.float();
          continue;
        case 2:
          if (tag !== 21) {
            break;
          }
          message.radiusBottom = reader.float();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  }
  PBMeshRenderer_CylinderMesh2.decode = decode;
})(PBMeshRenderer_CylinderMesh || (PBMeshRenderer_CylinderMesh = {}));
function createBasePBMeshRenderer_PlaneMesh() {
  return { uvs: [] };
}
var PBMeshRenderer_PlaneMesh;
(function(PBMeshRenderer_PlaneMesh2) {
  function encode(message, writer = import_minimal24.default.Writer.create()) {
    writer.uint32(10).fork();
    for (const v of message.uvs) {
      writer.float(v);
    }
    writer.ldelim();
    return writer;
  }
  PBMeshRenderer_PlaneMesh2.encode = encode;
  function decode(input, length2) {
    const reader = input instanceof import_minimal24.default.Reader ? input : import_minimal24.default.Reader.create(input);
    let end = length2 === void 0 ? reader.len : reader.pos + length2;
    const message = createBasePBMeshRenderer_PlaneMesh();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag === 13) {
            message.uvs.push(reader.float());
            continue;
          }
          if (tag === 10) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.uvs.push(reader.float());
            }
            continue;
          }
          break;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  }
  PBMeshRenderer_PlaneMesh2.decode = decode;
})(PBMeshRenderer_PlaneMesh || (PBMeshRenderer_PlaneMesh = {}));
function createBasePBMeshRenderer_SphereMesh() {
  return {};
}
var PBMeshRenderer_SphereMesh;
(function(PBMeshRenderer_SphereMesh2) {
  function encode(_, writer = import_minimal24.default.Writer.create()) {
    return writer;
  }
  PBMeshRenderer_SphereMesh2.encode = encode;
  function decode(input, length2) {
    const reader = input instanceof import_minimal24.default.Reader ? input : import_minimal24.default.Reader.create(input);
    let end = length2 === void 0 ? reader.len : reader.pos + length2;
    const message = createBasePBMeshRenderer_SphereMesh();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  }
  PBMeshRenderer_SphereMesh2.decode = decode;
})(PBMeshRenderer_SphereMesh || (PBMeshRenderer_SphereMesh = {}));

// node_modules/@dcl/ecs/dist/components/generated/MeshRenderer.gen.js
var MeshRendererSchema = {
  COMPONENT_ID: 1018,
  serialize(value, builder) {
    const writer = PBMeshRenderer.encode(value);
    const buffer2 = new Uint8Array(writer.finish(), 0, writer.len);
    builder.writeBuffer(buffer2, false);
  },
  deserialize(reader) {
    return PBMeshRenderer.decode(reader.buffer(), reader.remainingBytes());
  },
  create() {
    return PBMeshRenderer.decode(new Uint8Array());
  },
  jsonSchema: {
    type: "object",
    properties: {},
    serializationType: "protocol-buffer",
    protocolBuffer: "PBMeshRenderer"
  }
};

// node_modules/@dcl/ecs/dist/components/generated/pb/decentraland/sdk/components/nft_shape.gen.js
var import_minimal25 = __toESM(require_minimal2());
var NftFrameType;
(function(NftFrameType2) {
  NftFrameType2[NftFrameType2["NFT_CLASSIC"] = 0] = "NFT_CLASSIC";
  NftFrameType2[NftFrameType2["NFT_BAROQUE_ORNAMENT"] = 1] = "NFT_BAROQUE_ORNAMENT";
  NftFrameType2[NftFrameType2["NFT_DIAMOND_ORNAMENT"] = 2] = "NFT_DIAMOND_ORNAMENT";
  NftFrameType2[NftFrameType2["NFT_MINIMAL_WIDE"] = 3] = "NFT_MINIMAL_WIDE";
  NftFrameType2[NftFrameType2["NFT_MINIMAL_GREY"] = 4] = "NFT_MINIMAL_GREY";
  NftFrameType2[NftFrameType2["NFT_BLOCKY"] = 5] = "NFT_BLOCKY";
  NftFrameType2[NftFrameType2["NFT_GOLD_EDGES"] = 6] = "NFT_GOLD_EDGES";
  NftFrameType2[NftFrameType2["NFT_GOLD_CARVED"] = 7] = "NFT_GOLD_CARVED";
  NftFrameType2[NftFrameType2["NFT_GOLD_WIDE"] = 8] = "NFT_GOLD_WIDE";
  NftFrameType2[NftFrameType2["NFT_GOLD_ROUNDED"] = 9] = "NFT_GOLD_ROUNDED";
  NftFrameType2[NftFrameType2["NFT_METAL_MEDIUM"] = 10] = "NFT_METAL_MEDIUM";
  NftFrameType2[NftFrameType2["NFT_METAL_WIDE"] = 11] = "NFT_METAL_WIDE";
  NftFrameType2[NftFrameType2["NFT_METAL_SLIM"] = 12] = "NFT_METAL_SLIM";
  NftFrameType2[NftFrameType2["NFT_METAL_ROUNDED"] = 13] = "NFT_METAL_ROUNDED";
  NftFrameType2[NftFrameType2["NFT_PINS"] = 14] = "NFT_PINS";
  NftFrameType2[NftFrameType2["NFT_MINIMAL_BLACK"] = 15] = "NFT_MINIMAL_BLACK";
  NftFrameType2[NftFrameType2["NFT_MINIMAL_WHITE"] = 16] = "NFT_MINIMAL_WHITE";
  NftFrameType2[NftFrameType2["NFT_TAPE"] = 17] = "NFT_TAPE";
  NftFrameType2[NftFrameType2["NFT_WOOD_SLIM"] = 18] = "NFT_WOOD_SLIM";
  NftFrameType2[NftFrameType2["NFT_WOOD_WIDE"] = 19] = "NFT_WOOD_WIDE";
  NftFrameType2[NftFrameType2["NFT_WOOD_TWIGS"] = 20] = "NFT_WOOD_TWIGS";
  NftFrameType2[NftFrameType2["NFT_CANVAS"] = 21] = "NFT_CANVAS";
  NftFrameType2[NftFrameType2["NFT_NONE"] = 22] = "NFT_NONE";
})(NftFrameType || (NftFrameType = {}));
function createBasePBNftShape() {
  return { urn: "", style: void 0, color: void 0 };
}
var PBNftShape;
(function(PBNftShape2) {
  function encode(message, writer = import_minimal25.default.Writer.create()) {
    if (message.urn !== "") {
      writer.uint32(10).string(message.urn);
    }
    if (message.style !== void 0) {
      writer.uint32(16).int32(message.style);
    }
    if (message.color !== void 0) {
      Color3.encode(message.color, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  }
  PBNftShape2.encode = encode;
  function decode(input, length2) {
    const reader = input instanceof import_minimal25.default.Reader ? input : import_minimal25.default.Reader.create(input);
    let end = length2 === void 0 ? reader.len : reader.pos + length2;
    const message = createBasePBNftShape();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }
          message.urn = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }
          message.style = reader.int32();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }
          message.color = Color3.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  }
  PBNftShape2.decode = decode;
})(PBNftShape || (PBNftShape = {}));

// node_modules/@dcl/ecs/dist/components/generated/NftShape.gen.js
var NftShapeSchema = {
  COMPONENT_ID: 1040,
  serialize(value, builder) {
    const writer = PBNftShape.encode(value);
    const buffer2 = new Uint8Array(writer.finish(), 0, writer.len);
    builder.writeBuffer(buffer2, false);
  },
  deserialize(reader) {
    return PBNftShape.decode(reader.buffer(), reader.remainingBytes());
  },
  create() {
    return PBNftShape.decode(new Uint8Array());
  },
  jsonSchema: {
    type: "object",
    properties: {},
    serializationType: "protocol-buffer",
    protocolBuffer: "PBNftShape"
  }
};

// node_modules/@dcl/ecs/dist/components/generated/pb/decentraland/sdk/components/player_identity_data.gen.js
var import_minimal26 = __toESM(require_minimal2());
function createBasePBPlayerIdentityData() {
  return { address: "", isGuest: false };
}
var PBPlayerIdentityData;
(function(PBPlayerIdentityData2) {
  function encode(message, writer = import_minimal26.default.Writer.create()) {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.isGuest === true) {
      writer.uint32(24).bool(message.isGuest);
    }
    return writer;
  }
  PBPlayerIdentityData2.encode = encode;
  function decode(input, length2) {
    const reader = input instanceof import_minimal26.default.Reader ? input : import_minimal26.default.Reader.create(input);
    let end = length2 === void 0 ? reader.len : reader.pos + length2;
    const message = createBasePBPlayerIdentityData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }
          message.address = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }
          message.isGuest = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  }
  PBPlayerIdentityData2.decode = decode;
})(PBPlayerIdentityData || (PBPlayerIdentityData = {}));

// node_modules/@dcl/ecs/dist/components/generated/PlayerIdentityData.gen.js
var PlayerIdentityDataSchema = {
  COMPONENT_ID: 1089,
  serialize(value, builder) {
    const writer = PBPlayerIdentityData.encode(value);
    const buffer2 = new Uint8Array(writer.finish(), 0, writer.len);
    builder.writeBuffer(buffer2, false);
  },
  deserialize(reader) {
    return PBPlayerIdentityData.decode(reader.buffer(), reader.remainingBytes());
  },
  create() {
    return PBPlayerIdentityData.decode(new Uint8Array());
  },
  jsonSchema: {
    type: "object",
    properties: {},
    serializationType: "protocol-buffer",
    protocolBuffer: "PBPlayerIdentityData"
  }
};

// node_modules/@dcl/ecs/dist/components/generated/pb/decentraland/sdk/components/pointer_events.gen.js
var import_minimal27 = __toESM(require_minimal2());
function createBasePBPointerEvents() {
  return { pointerEvents: [] };
}
var PBPointerEvents;
(function(PBPointerEvents2) {
  function encode(message, writer = import_minimal27.default.Writer.create()) {
    for (const v of message.pointerEvents) {
      PBPointerEvents_Entry.encode(v, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  }
  PBPointerEvents2.encode = encode;
  function decode(input, length2) {
    const reader = input instanceof import_minimal27.default.Reader ? input : import_minimal27.default.Reader.create(input);
    let end = length2 === void 0 ? reader.len : reader.pos + length2;
    const message = createBasePBPointerEvents();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }
          message.pointerEvents.push(PBPointerEvents_Entry.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  }
  PBPointerEvents2.decode = decode;
})(PBPointerEvents || (PBPointerEvents = {}));
function createBasePBPointerEvents_Info() {
  return {
    button: void 0,
    hoverText: void 0,
    maxDistance: void 0,
    showFeedback: void 0,
    showHighlight: void 0
  };
}
var PBPointerEvents_Info;
(function(PBPointerEvents_Info2) {
  function encode(message, writer = import_minimal27.default.Writer.create()) {
    if (message.button !== void 0) {
      writer.uint32(8).int32(message.button);
    }
    if (message.hoverText !== void 0) {
      writer.uint32(18).string(message.hoverText);
    }
    if (message.maxDistance !== void 0) {
      writer.uint32(29).float(message.maxDistance);
    }
    if (message.showFeedback !== void 0) {
      writer.uint32(32).bool(message.showFeedback);
    }
    if (message.showHighlight !== void 0) {
      writer.uint32(40).bool(message.showHighlight);
    }
    return writer;
  }
  PBPointerEvents_Info2.encode = encode;
  function decode(input, length2) {
    const reader = input instanceof import_minimal27.default.Reader ? input : import_minimal27.default.Reader.create(input);
    let end = length2 === void 0 ? reader.len : reader.pos + length2;
    const message = createBasePBPointerEvents_Info();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }
          message.button = reader.int32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }
          message.hoverText = reader.string();
          continue;
        case 3:
          if (tag !== 29) {
            break;
          }
          message.maxDistance = reader.float();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }
          message.showFeedback = reader.bool();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }
          message.showHighlight = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  }
  PBPointerEvents_Info2.decode = decode;
})(PBPointerEvents_Info || (PBPointerEvents_Info = {}));
function createBasePBPointerEvents_Entry() {
  return { eventType: 0, eventInfo: void 0 };
}
var PBPointerEvents_Entry;
(function(PBPointerEvents_Entry2) {
  function encode(message, writer = import_minimal27.default.Writer.create()) {
    if (message.eventType !== 0) {
      writer.uint32(8).int32(message.eventType);
    }
    if (message.eventInfo !== void 0) {
      PBPointerEvents_Info.encode(message.eventInfo, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  }
  PBPointerEvents_Entry2.encode = encode;
  function decode(input, length2) {
    const reader = input instanceof import_minimal27.default.Reader ? input : import_minimal27.default.Reader.create(input);
    let end = length2 === void 0 ? reader.len : reader.pos + length2;
    const message = createBasePBPointerEvents_Entry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }
          message.eventType = reader.int32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }
          message.eventInfo = PBPointerEvents_Info.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  }
  PBPointerEvents_Entry2.decode = decode;
})(PBPointerEvents_Entry || (PBPointerEvents_Entry = {}));

// node_modules/@dcl/ecs/dist/components/generated/PointerEvents.gen.js
var PointerEventsSchema = {
  COMPONENT_ID: 1062,
  serialize(value, builder) {
    const writer = PBPointerEvents.encode(value);
    const buffer2 = new Uint8Array(writer.finish(), 0, writer.len);
    builder.writeBuffer(buffer2, false);
  },
  deserialize(reader) {
    return PBPointerEvents.decode(reader.buffer(), reader.remainingBytes());
  },
  create() {
    return PBPointerEvents.decode(new Uint8Array());
  },
  jsonSchema: {
    type: "object",
    properties: {},
    serializationType: "protocol-buffer",
    protocolBuffer: "PBPointerEvents"
  }
};

// node_modules/@dcl/ecs/dist/components/generated/pb/decentraland/sdk/components/pointer_events_result.gen.js
var import_minimal29 = __toESM(require_minimal2());

// node_modules/@dcl/ecs/dist/components/generated/pb/decentraland/sdk/components/common/raycast_hit.gen.js
var import_minimal28 = __toESM(require_minimal2());
function createBaseRaycastHit() {
  return {
    position: void 0,
    globalOrigin: void 0,
    direction: void 0,
    normalHit: void 0,
    length: 0,
    meshName: void 0,
    entityId: void 0
  };
}
var RaycastHit;
(function(RaycastHit2) {
  function encode(message, writer = import_minimal28.default.Writer.create()) {
    if (message.position !== void 0) {
      Vector3.encode(message.position, writer.uint32(10).fork()).ldelim();
    }
    if (message.globalOrigin !== void 0) {
      Vector3.encode(message.globalOrigin, writer.uint32(18).fork()).ldelim();
    }
    if (message.direction !== void 0) {
      Vector3.encode(message.direction, writer.uint32(26).fork()).ldelim();
    }
    if (message.normalHit !== void 0) {
      Vector3.encode(message.normalHit, writer.uint32(34).fork()).ldelim();
    }
    if (message.length !== 0) {
      writer.uint32(45).float(message.length);
    }
    if (message.meshName !== void 0) {
      writer.uint32(50).string(message.meshName);
    }
    if (message.entityId !== void 0) {
      writer.uint32(56).uint32(message.entityId);
    }
    return writer;
  }
  RaycastHit2.encode = encode;
  function decode(input, length2) {
    const reader = input instanceof import_minimal28.default.Reader ? input : import_minimal28.default.Reader.create(input);
    let end = length2 === void 0 ? reader.len : reader.pos + length2;
    const message = createBaseRaycastHit();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }
          message.position = Vector3.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }
          message.globalOrigin = Vector3.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }
          message.direction = Vector3.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }
          message.normalHit = Vector3.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 45) {
            break;
          }
          message.length = reader.float();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }
          message.meshName = reader.string();
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }
          message.entityId = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  }
  RaycastHit2.decode = decode;
})(RaycastHit || (RaycastHit = {}));

// node_modules/@dcl/ecs/dist/components/generated/pb/decentraland/sdk/components/pointer_events_result.gen.js
function createBasePBPointerEventsResult() {
  return { button: 0, hit: void 0, state: 0, timestamp: 0, analog: void 0, tickNumber: 0 };
}
var PBPointerEventsResult;
(function(PBPointerEventsResult2) {
  function encode(message, writer = import_minimal29.default.Writer.create()) {
    if (message.button !== 0) {
      writer.uint32(8).int32(message.button);
    }
    if (message.hit !== void 0) {
      RaycastHit.encode(message.hit, writer.uint32(18).fork()).ldelim();
    }
    if (message.state !== 0) {
      writer.uint32(32).int32(message.state);
    }
    if (message.timestamp !== 0) {
      writer.uint32(40).uint32(message.timestamp);
    }
    if (message.analog !== void 0) {
      writer.uint32(53).float(message.analog);
    }
    if (message.tickNumber !== 0) {
      writer.uint32(56).uint32(message.tickNumber);
    }
    return writer;
  }
  PBPointerEventsResult2.encode = encode;
  function decode(input, length2) {
    const reader = input instanceof import_minimal29.default.Reader ? input : import_minimal29.default.Reader.create(input);
    let end = length2 === void 0 ? reader.len : reader.pos + length2;
    const message = createBasePBPointerEventsResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }
          message.button = reader.int32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }
          message.hit = RaycastHit.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }
          message.state = reader.int32();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }
          message.timestamp = reader.uint32();
          continue;
        case 6:
          if (tag !== 53) {
            break;
          }
          message.analog = reader.float();
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }
          message.tickNumber = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  }
  PBPointerEventsResult2.decode = decode;
})(PBPointerEventsResult || (PBPointerEventsResult = {}));

// node_modules/@dcl/ecs/dist/components/generated/PointerEventsResult.gen.js
var PointerEventsResultSchema = {
  COMPONENT_ID: 1063,
  serialize(value, builder) {
    const writer = PBPointerEventsResult.encode(value);
    const buffer2 = new Uint8Array(writer.finish(), 0, writer.len);
    builder.writeBuffer(buffer2, false);
  },
  deserialize(reader) {
    return PBPointerEventsResult.decode(reader.buffer(), reader.remainingBytes());
  },
  create() {
    return PBPointerEventsResult.decode(new Uint8Array());
  },
  jsonSchema: {
    type: "object",
    properties: {},
    serializationType: "protocol-buffer",
    protocolBuffer: "PBPointerEventsResult"
  }
};

// node_modules/@dcl/ecs/dist/components/generated/pb/decentraland/sdk/components/pointer_lock.gen.js
var import_minimal30 = __toESM(require_minimal2());
function createBasePBPointerLock() {
  return { isPointerLocked: false };
}
var PBPointerLock;
(function(PBPointerLock2) {
  function encode(message, writer = import_minimal30.default.Writer.create()) {
    if (message.isPointerLocked === true) {
      writer.uint32(8).bool(message.isPointerLocked);
    }
    return writer;
  }
  PBPointerLock2.encode = encode;
  function decode(input, length2) {
    const reader = input instanceof import_minimal30.default.Reader ? input : import_minimal30.default.Reader.create(input);
    let end = length2 === void 0 ? reader.len : reader.pos + length2;
    const message = createBasePBPointerLock();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }
          message.isPointerLocked = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  }
  PBPointerLock2.decode = decode;
})(PBPointerLock || (PBPointerLock = {}));

// node_modules/@dcl/ecs/dist/components/generated/PointerLock.gen.js
var PointerLockSchema = {
  COMPONENT_ID: 1074,
  serialize(value, builder) {
    const writer = PBPointerLock.encode(value);
    const buffer2 = new Uint8Array(writer.finish(), 0, writer.len);
    builder.writeBuffer(buffer2, false);
  },
  deserialize(reader) {
    return PBPointerLock.decode(reader.buffer(), reader.remainingBytes());
  },
  create() {
    return PBPointerLock.decode(new Uint8Array());
  },
  jsonSchema: {
    type: "object",
    properties: {},
    serializationType: "protocol-buffer",
    protocolBuffer: "PBPointerLock"
  }
};

// node_modules/@dcl/ecs/dist/components/generated/pb/decentraland/sdk/components/raycast.gen.js
var import_minimal31 = __toESM(require_minimal2());
var RaycastQueryType;
(function(RaycastQueryType2) {
  RaycastQueryType2[RaycastQueryType2["RQT_HIT_FIRST"] = 0] = "RQT_HIT_FIRST";
  RaycastQueryType2[RaycastQueryType2["RQT_QUERY_ALL"] = 1] = "RQT_QUERY_ALL";
  RaycastQueryType2[RaycastQueryType2["RQT_NONE"] = 2] = "RQT_NONE";
})(RaycastQueryType || (RaycastQueryType = {}));
function createBasePBRaycast() {
  return {
    timestamp: void 0,
    originOffset: void 0,
    direction: void 0,
    maxDistance: 0,
    queryType: 0,
    continuous: void 0,
    collisionMask: void 0
  };
}
var PBRaycast;
(function(PBRaycast2) {
  function encode(message, writer = import_minimal31.default.Writer.create()) {
    if (message.timestamp !== void 0) {
      writer.uint32(8).uint32(message.timestamp);
    }
    if (message.originOffset !== void 0) {
      Vector3.encode(message.originOffset, writer.uint32(18).fork()).ldelim();
    }
    switch (message.direction?.$case) {
      case "localDirection":
        Vector3.encode(message.direction.localDirection, writer.uint32(50).fork()).ldelim();
        break;
      case "globalDirection":
        Vector3.encode(message.direction.globalDirection, writer.uint32(26).fork()).ldelim();
        break;
      case "globalTarget":
        Vector3.encode(message.direction.globalTarget, writer.uint32(58).fork()).ldelim();
        break;
      case "targetEntity":
        writer.uint32(80).uint32(message.direction.targetEntity);
        break;
    }
    if (message.maxDistance !== 0) {
      writer.uint32(37).float(message.maxDistance);
    }
    if (message.queryType !== 0) {
      writer.uint32(40).int32(message.queryType);
    }
    if (message.continuous !== void 0) {
      writer.uint32(64).bool(message.continuous);
    }
    if (message.collisionMask !== void 0) {
      writer.uint32(72).uint32(message.collisionMask);
    }
    return writer;
  }
  PBRaycast2.encode = encode;
  function decode(input, length2) {
    const reader = input instanceof import_minimal31.default.Reader ? input : import_minimal31.default.Reader.create(input);
    let end = length2 === void 0 ? reader.len : reader.pos + length2;
    const message = createBasePBRaycast();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }
          message.timestamp = reader.uint32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }
          message.originOffset = Vector3.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }
          message.direction = { $case: "localDirection", localDirection: Vector3.decode(reader, reader.uint32()) };
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }
          message.direction = { $case: "globalDirection", globalDirection: Vector3.decode(reader, reader.uint32()) };
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }
          message.direction = { $case: "globalTarget", globalTarget: Vector3.decode(reader, reader.uint32()) };
          continue;
        case 10:
          if (tag !== 80) {
            break;
          }
          message.direction = { $case: "targetEntity", targetEntity: reader.uint32() };
          continue;
        case 4:
          if (tag !== 37) {
            break;
          }
          message.maxDistance = reader.float();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }
          message.queryType = reader.int32();
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }
          message.continuous = reader.bool();
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }
          message.collisionMask = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  }
  PBRaycast2.decode = decode;
})(PBRaycast || (PBRaycast = {}));

// node_modules/@dcl/ecs/dist/components/generated/Raycast.gen.js
var RaycastSchema = {
  COMPONENT_ID: 1067,
  serialize(value, builder) {
    const writer = PBRaycast.encode(value);
    const buffer2 = new Uint8Array(writer.finish(), 0, writer.len);
    builder.writeBuffer(buffer2, false);
  },
  deserialize(reader) {
    return PBRaycast.decode(reader.buffer(), reader.remainingBytes());
  },
  create() {
    return PBRaycast.decode(new Uint8Array());
  },
  jsonSchema: {
    type: "object",
    properties: {},
    serializationType: "protocol-buffer",
    protocolBuffer: "PBRaycast"
  }
};

// node_modules/@dcl/ecs/dist/components/generated/pb/decentraland/sdk/components/raycast_result.gen.js
var import_minimal32 = __toESM(require_minimal2());
function createBasePBRaycastResult() {
  return { timestamp: void 0, globalOrigin: void 0, direction: void 0, hits: [], tickNumber: 0 };
}
var PBRaycastResult;
(function(PBRaycastResult2) {
  function encode(message, writer = import_minimal32.default.Writer.create()) {
    if (message.timestamp !== void 0) {
      writer.uint32(8).uint32(message.timestamp);
    }
    if (message.globalOrigin !== void 0) {
      Vector3.encode(message.globalOrigin, writer.uint32(18).fork()).ldelim();
    }
    if (message.direction !== void 0) {
      Vector3.encode(message.direction, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.hits) {
      RaycastHit.encode(v, writer.uint32(34).fork()).ldelim();
    }
    if (message.tickNumber !== 0) {
      writer.uint32(40).uint32(message.tickNumber);
    }
    return writer;
  }
  PBRaycastResult2.encode = encode;
  function decode(input, length2) {
    const reader = input instanceof import_minimal32.default.Reader ? input : import_minimal32.default.Reader.create(input);
    let end = length2 === void 0 ? reader.len : reader.pos + length2;
    const message = createBasePBRaycastResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }
          message.timestamp = reader.uint32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }
          message.globalOrigin = Vector3.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }
          message.direction = Vector3.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }
          message.hits.push(RaycastHit.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }
          message.tickNumber = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  }
  PBRaycastResult2.decode = decode;
})(PBRaycastResult || (PBRaycastResult = {}));

// node_modules/@dcl/ecs/dist/components/generated/RaycastResult.gen.js
var RaycastResultSchema = {
  COMPONENT_ID: 1068,
  serialize(value, builder) {
    const writer = PBRaycastResult.encode(value);
    const buffer2 = new Uint8Array(writer.finish(), 0, writer.len);
    builder.writeBuffer(buffer2, false);
  },
  deserialize(reader) {
    return PBRaycastResult.decode(reader.buffer(), reader.remainingBytes());
  },
  create() {
    return PBRaycastResult.decode(new Uint8Array());
  },
  jsonSchema: {
    type: "object",
    properties: {},
    serializationType: "protocol-buffer",
    protocolBuffer: "PBRaycastResult"
  }
};

// node_modules/@dcl/ecs/dist/components/generated/pb/decentraland/sdk/components/realm_info.gen.js
var import_minimal33 = __toESM(require_minimal2());
function createBasePBRealmInfo() {
  return {
    baseUrl: "",
    realmName: "",
    networkId: 0,
    commsAdapter: "",
    isPreview: false,
    room: void 0,
    isConnectedSceneRoom: void 0
  };
}
var PBRealmInfo;
(function(PBRealmInfo2) {
  function encode(message, writer = import_minimal33.default.Writer.create()) {
    if (message.baseUrl !== "") {
      writer.uint32(10).string(message.baseUrl);
    }
    if (message.realmName !== "") {
      writer.uint32(18).string(message.realmName);
    }
    if (message.networkId !== 0) {
      writer.uint32(24).int32(message.networkId);
    }
    if (message.commsAdapter !== "") {
      writer.uint32(34).string(message.commsAdapter);
    }
    if (message.isPreview === true) {
      writer.uint32(40).bool(message.isPreview);
    }
    if (message.room !== void 0) {
      writer.uint32(50).string(message.room);
    }
    if (message.isConnectedSceneRoom !== void 0) {
      writer.uint32(56).bool(message.isConnectedSceneRoom);
    }
    return writer;
  }
  PBRealmInfo2.encode = encode;
  function decode(input, length2) {
    const reader = input instanceof import_minimal33.default.Reader ? input : import_minimal33.default.Reader.create(input);
    let end = length2 === void 0 ? reader.len : reader.pos + length2;
    const message = createBasePBRealmInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }
          message.baseUrl = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }
          message.realmName = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }
          message.networkId = reader.int32();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }
          message.commsAdapter = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }
          message.isPreview = reader.bool();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }
          message.room = reader.string();
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }
          message.isConnectedSceneRoom = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  }
  PBRealmInfo2.decode = decode;
})(PBRealmInfo || (PBRealmInfo = {}));

// node_modules/@dcl/ecs/dist/components/generated/RealmInfo.gen.js
var RealmInfoSchema = {
  COMPONENT_ID: 1106,
  serialize(value, builder) {
    const writer = PBRealmInfo.encode(value);
    const buffer2 = new Uint8Array(writer.finish(), 0, writer.len);
    builder.writeBuffer(buffer2, false);
  },
  deserialize(reader) {
    return PBRealmInfo.decode(reader.buffer(), reader.remainingBytes());
  },
  create() {
    return PBRealmInfo.decode(new Uint8Array());
  },
  jsonSchema: {
    type: "object",
    properties: {},
    serializationType: "protocol-buffer",
    protocolBuffer: "PBRealmInfo"
  }
};

// node_modules/@dcl/ecs/dist/components/generated/pb/decentraland/sdk/components/text_shape.gen.js
var import_minimal34 = __toESM(require_minimal2());
function createBasePBTextShape() {
  return {
    text: "",
    font: void 0,
    fontSize: void 0,
    fontAutoSize: void 0,
    textAlign: void 0,
    width: void 0,
    height: void 0,
    paddingTop: void 0,
    paddingRight: void 0,
    paddingBottom: void 0,
    paddingLeft: void 0,
    lineSpacing: void 0,
    lineCount: void 0,
    textWrapping: void 0,
    shadowBlur: void 0,
    shadowOffsetX: void 0,
    shadowOffsetY: void 0,
    outlineWidth: void 0,
    shadowColor: void 0,
    outlineColor: void 0,
    textColor: void 0
  };
}
var PBTextShape;
(function(PBTextShape2) {
  function encode(message, writer = import_minimal34.default.Writer.create()) {
    if (message.text !== "") {
      writer.uint32(10).string(message.text);
    }
    if (message.font !== void 0) {
      writer.uint32(16).int32(message.font);
    }
    if (message.fontSize !== void 0) {
      writer.uint32(29).float(message.fontSize);
    }
    if (message.fontAutoSize !== void 0) {
      writer.uint32(32).bool(message.fontAutoSize);
    }
    if (message.textAlign !== void 0) {
      writer.uint32(40).int32(message.textAlign);
    }
    if (message.width !== void 0) {
      writer.uint32(53).float(message.width);
    }
    if (message.height !== void 0) {
      writer.uint32(61).float(message.height);
    }
    if (message.paddingTop !== void 0) {
      writer.uint32(69).float(message.paddingTop);
    }
    if (message.paddingRight !== void 0) {
      writer.uint32(77).float(message.paddingRight);
    }
    if (message.paddingBottom !== void 0) {
      writer.uint32(85).float(message.paddingBottom);
    }
    if (message.paddingLeft !== void 0) {
      writer.uint32(93).float(message.paddingLeft);
    }
    if (message.lineSpacing !== void 0) {
      writer.uint32(101).float(message.lineSpacing);
    }
    if (message.lineCount !== void 0) {
      writer.uint32(104).int32(message.lineCount);
    }
    if (message.textWrapping !== void 0) {
      writer.uint32(112).bool(message.textWrapping);
    }
    if (message.shadowBlur !== void 0) {
      writer.uint32(125).float(message.shadowBlur);
    }
    if (message.shadowOffsetX !== void 0) {
      writer.uint32(133).float(message.shadowOffsetX);
    }
    if (message.shadowOffsetY !== void 0) {
      writer.uint32(141).float(message.shadowOffsetY);
    }
    if (message.outlineWidth !== void 0) {
      writer.uint32(149).float(message.outlineWidth);
    }
    if (message.shadowColor !== void 0) {
      Color3.encode(message.shadowColor, writer.uint32(154).fork()).ldelim();
    }
    if (message.outlineColor !== void 0) {
      Color3.encode(message.outlineColor, writer.uint32(162).fork()).ldelim();
    }
    if (message.textColor !== void 0) {
      Color4.encode(message.textColor, writer.uint32(170).fork()).ldelim();
    }
    return writer;
  }
  PBTextShape2.encode = encode;
  function decode(input, length2) {
    const reader = input instanceof import_minimal34.default.Reader ? input : import_minimal34.default.Reader.create(input);
    let end = length2 === void 0 ? reader.len : reader.pos + length2;
    const message = createBasePBTextShape();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }
          message.text = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }
          message.font = reader.int32();
          continue;
        case 3:
          if (tag !== 29) {
            break;
          }
          message.fontSize = reader.float();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }
          message.fontAutoSize = reader.bool();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }
          message.textAlign = reader.int32();
          continue;
        case 6:
          if (tag !== 53) {
            break;
          }
          message.width = reader.float();
          continue;
        case 7:
          if (tag !== 61) {
            break;
          }
          message.height = reader.float();
          continue;
        case 8:
          if (tag !== 69) {
            break;
          }
          message.paddingTop = reader.float();
          continue;
        case 9:
          if (tag !== 77) {
            break;
          }
          message.paddingRight = reader.float();
          continue;
        case 10:
          if (tag !== 85) {
            break;
          }
          message.paddingBottom = reader.float();
          continue;
        case 11:
          if (tag !== 93) {
            break;
          }
          message.paddingLeft = reader.float();
          continue;
        case 12:
          if (tag !== 101) {
            break;
          }
          message.lineSpacing = reader.float();
          continue;
        case 13:
          if (tag !== 104) {
            break;
          }
          message.lineCount = reader.int32();
          continue;
        case 14:
          if (tag !== 112) {
            break;
          }
          message.textWrapping = reader.bool();
          continue;
        case 15:
          if (tag !== 125) {
            break;
          }
          message.shadowBlur = reader.float();
          continue;
        case 16:
          if (tag !== 133) {
            break;
          }
          message.shadowOffsetX = reader.float();
          continue;
        case 17:
          if (tag !== 141) {
            break;
          }
          message.shadowOffsetY = reader.float();
          continue;
        case 18:
          if (tag !== 149) {
            break;
          }
          message.outlineWidth = reader.float();
          continue;
        case 19:
          if (tag !== 154) {
            break;
          }
          message.shadowColor = Color3.decode(reader, reader.uint32());
          continue;
        case 20:
          if (tag !== 162) {
            break;
          }
          message.outlineColor = Color3.decode(reader, reader.uint32());
          continue;
        case 21:
          if (tag !== 170) {
            break;
          }
          message.textColor = Color4.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  }
  PBTextShape2.decode = decode;
})(PBTextShape || (PBTextShape = {}));

// node_modules/@dcl/ecs/dist/components/generated/TextShape.gen.js
var TextShapeSchema = {
  COMPONENT_ID: 1030,
  serialize(value, builder) {
    const writer = PBTextShape.encode(value);
    const buffer2 = new Uint8Array(writer.finish(), 0, writer.len);
    builder.writeBuffer(buffer2, false);
  },
  deserialize(reader) {
    return PBTextShape.decode(reader.buffer(), reader.remainingBytes());
  },
  create() {
    return PBTextShape.decode(new Uint8Array());
  },
  jsonSchema: {
    type: "object",
    properties: {},
    serializationType: "protocol-buffer",
    protocolBuffer: "PBTextShape"
  }
};

// node_modules/@dcl/ecs/dist/components/generated/pb/decentraland/sdk/components/tween.gen.js
var import_minimal35 = __toESM(require_minimal2());
var EasingFunction;
(function(EasingFunction2) {
  EasingFunction2[EasingFunction2["EF_LINEAR"] = 0] = "EF_LINEAR";
  EasingFunction2[EasingFunction2["EF_EASEINQUAD"] = 1] = "EF_EASEINQUAD";
  EasingFunction2[EasingFunction2["EF_EASEOUTQUAD"] = 2] = "EF_EASEOUTQUAD";
  EasingFunction2[EasingFunction2["EF_EASEQUAD"] = 3] = "EF_EASEQUAD";
  EasingFunction2[EasingFunction2["EF_EASEINSINE"] = 4] = "EF_EASEINSINE";
  EasingFunction2[EasingFunction2["EF_EASEOUTSINE"] = 5] = "EF_EASEOUTSINE";
  EasingFunction2[EasingFunction2["EF_EASESINE"] = 6] = "EF_EASESINE";
  EasingFunction2[EasingFunction2["EF_EASEINEXPO"] = 7] = "EF_EASEINEXPO";
  EasingFunction2[EasingFunction2["EF_EASEOUTEXPO"] = 8] = "EF_EASEOUTEXPO";
  EasingFunction2[EasingFunction2["EF_EASEEXPO"] = 9] = "EF_EASEEXPO";
  EasingFunction2[EasingFunction2["EF_EASEINELASTIC"] = 10] = "EF_EASEINELASTIC";
  EasingFunction2[EasingFunction2["EF_EASEOUTELASTIC"] = 11] = "EF_EASEOUTELASTIC";
  EasingFunction2[EasingFunction2["EF_EASEELASTIC"] = 12] = "EF_EASEELASTIC";
  EasingFunction2[EasingFunction2["EF_EASEINBOUNCE"] = 13] = "EF_EASEINBOUNCE";
  EasingFunction2[EasingFunction2["EF_EASEOUTBOUNCE"] = 14] = "EF_EASEOUTBOUNCE";
  EasingFunction2[EasingFunction2["EF_EASEBOUNCE"] = 15] = "EF_EASEBOUNCE";
  EasingFunction2[EasingFunction2["EF_EASEINCUBIC"] = 16] = "EF_EASEINCUBIC";
  EasingFunction2[EasingFunction2["EF_EASEOUTCUBIC"] = 17] = "EF_EASEOUTCUBIC";
  EasingFunction2[EasingFunction2["EF_EASECUBIC"] = 18] = "EF_EASECUBIC";
  EasingFunction2[EasingFunction2["EF_EASEINQUART"] = 19] = "EF_EASEINQUART";
  EasingFunction2[EasingFunction2["EF_EASEOUTQUART"] = 20] = "EF_EASEOUTQUART";
  EasingFunction2[EasingFunction2["EF_EASEQUART"] = 21] = "EF_EASEQUART";
  EasingFunction2[EasingFunction2["EF_EASEINQUINT"] = 22] = "EF_EASEINQUINT";
  EasingFunction2[EasingFunction2["EF_EASEOUTQUINT"] = 23] = "EF_EASEOUTQUINT";
  EasingFunction2[EasingFunction2["EF_EASEQUINT"] = 24] = "EF_EASEQUINT";
  EasingFunction2[EasingFunction2["EF_EASEINCIRC"] = 25] = "EF_EASEINCIRC";
  EasingFunction2[EasingFunction2["EF_EASEOUTCIRC"] = 26] = "EF_EASEOUTCIRC";
  EasingFunction2[EasingFunction2["EF_EASECIRC"] = 27] = "EF_EASECIRC";
  EasingFunction2[EasingFunction2["EF_EASEINBACK"] = 28] = "EF_EASEINBACK";
  EasingFunction2[EasingFunction2["EF_EASEOUTBACK"] = 29] = "EF_EASEOUTBACK";
  EasingFunction2[EasingFunction2["EF_EASEBACK"] = 30] = "EF_EASEBACK";
})(EasingFunction || (EasingFunction = {}));
function createBasePBTween() {
  return { duration: 0, easingFunction: 0, mode: void 0, playing: void 0, currentTime: void 0 };
}
var PBTween;
(function(PBTween2) {
  function encode(message, writer = import_minimal35.default.Writer.create()) {
    if (message.duration !== 0) {
      writer.uint32(13).float(message.duration);
    }
    if (message.easingFunction !== 0) {
      writer.uint32(16).int32(message.easingFunction);
    }
    switch (message.mode?.$case) {
      case "move":
        Move.encode(message.mode.move, writer.uint32(26).fork()).ldelim();
        break;
      case "rotate":
        Rotate.encode(message.mode.rotate, writer.uint32(34).fork()).ldelim();
        break;
      case "scale":
        Scale.encode(message.mode.scale, writer.uint32(42).fork()).ldelim();
        break;
    }
    if (message.playing !== void 0) {
      writer.uint32(48).bool(message.playing);
    }
    if (message.currentTime !== void 0) {
      writer.uint32(61).float(message.currentTime);
    }
    return writer;
  }
  PBTween2.encode = encode;
  function decode(input, length2) {
    const reader = input instanceof import_minimal35.default.Reader ? input : import_minimal35.default.Reader.create(input);
    let end = length2 === void 0 ? reader.len : reader.pos + length2;
    const message = createBasePBTween();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 13) {
            break;
          }
          message.duration = reader.float();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }
          message.easingFunction = reader.int32();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }
          message.mode = { $case: "move", move: Move.decode(reader, reader.uint32()) };
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }
          message.mode = { $case: "rotate", rotate: Rotate.decode(reader, reader.uint32()) };
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }
          message.mode = { $case: "scale", scale: Scale.decode(reader, reader.uint32()) };
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }
          message.playing = reader.bool();
          continue;
        case 7:
          if (tag !== 61) {
            break;
          }
          message.currentTime = reader.float();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  }
  PBTween2.decode = decode;
})(PBTween || (PBTween = {}));
function createBaseMove() {
  return { start: void 0, end: void 0, faceDirection: void 0 };
}
var Move;
(function(Move2) {
  function encode(message, writer = import_minimal35.default.Writer.create()) {
    if (message.start !== void 0) {
      Vector3.encode(message.start, writer.uint32(10).fork()).ldelim();
    }
    if (message.end !== void 0) {
      Vector3.encode(message.end, writer.uint32(18).fork()).ldelim();
    }
    if (message.faceDirection !== void 0) {
      writer.uint32(24).bool(message.faceDirection);
    }
    return writer;
  }
  Move2.encode = encode;
  function decode(input, length2) {
    const reader = input instanceof import_minimal35.default.Reader ? input : import_minimal35.default.Reader.create(input);
    let end = length2 === void 0 ? reader.len : reader.pos + length2;
    const message = createBaseMove();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }
          message.start = Vector3.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }
          message.end = Vector3.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }
          message.faceDirection = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  }
  Move2.decode = decode;
})(Move || (Move = {}));
function createBaseRotate() {
  return { start: void 0, end: void 0 };
}
var Rotate;
(function(Rotate2) {
  function encode(message, writer = import_minimal35.default.Writer.create()) {
    if (message.start !== void 0) {
      Quaternion.encode(message.start, writer.uint32(10).fork()).ldelim();
    }
    if (message.end !== void 0) {
      Quaternion.encode(message.end, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  }
  Rotate2.encode = encode;
  function decode(input, length2) {
    const reader = input instanceof import_minimal35.default.Reader ? input : import_minimal35.default.Reader.create(input);
    let end = length2 === void 0 ? reader.len : reader.pos + length2;
    const message = createBaseRotate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }
          message.start = Quaternion.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }
          message.end = Quaternion.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  }
  Rotate2.decode = decode;
})(Rotate || (Rotate = {}));
function createBaseScale() {
  return { start: void 0, end: void 0 };
}
var Scale;
(function(Scale2) {
  function encode(message, writer = import_minimal35.default.Writer.create()) {
    if (message.start !== void 0) {
      Vector3.encode(message.start, writer.uint32(10).fork()).ldelim();
    }
    if (message.end !== void 0) {
      Vector3.encode(message.end, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  }
  Scale2.encode = encode;
  function decode(input, length2) {
    const reader = input instanceof import_minimal35.default.Reader ? input : import_minimal35.default.Reader.create(input);
    let end = length2 === void 0 ? reader.len : reader.pos + length2;
    const message = createBaseScale();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }
          message.start = Vector3.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }
          message.end = Vector3.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  }
  Scale2.decode = decode;
})(Scale || (Scale = {}));

// node_modules/@dcl/ecs/dist/components/generated/Tween.gen.js
var TweenSchema = {
  COMPONENT_ID: 1102,
  serialize(value, builder) {
    const writer = PBTween.encode(value);
    const buffer2 = new Uint8Array(writer.finish(), 0, writer.len);
    builder.writeBuffer(buffer2, false);
  },
  deserialize(reader) {
    return PBTween.decode(reader.buffer(), reader.remainingBytes());
  },
  create() {
    return PBTween.decode(new Uint8Array());
  },
  jsonSchema: {
    type: "object",
    properties: {},
    serializationType: "protocol-buffer",
    protocolBuffer: "PBTween"
  }
};

// node_modules/@dcl/ecs/dist/components/generated/pb/decentraland/sdk/components/tween_sequence.gen.js
var import_minimal36 = __toESM(require_minimal2());
var TweenLoop;
(function(TweenLoop2) {
  TweenLoop2[TweenLoop2["TL_RESTART"] = 0] = "TL_RESTART";
  TweenLoop2[TweenLoop2["TL_YOYO"] = 1] = "TL_YOYO";
})(TweenLoop || (TweenLoop = {}));
function createBasePBTweenSequence() {
  return { sequence: [], loop: void 0 };
}
var PBTweenSequence;
(function(PBTweenSequence2) {
  function encode(message, writer = import_minimal36.default.Writer.create()) {
    for (const v of message.sequence) {
      PBTween.encode(v, writer.uint32(10).fork()).ldelim();
    }
    if (message.loop !== void 0) {
      writer.uint32(16).int32(message.loop);
    }
    return writer;
  }
  PBTweenSequence2.encode = encode;
  function decode(input, length2) {
    const reader = input instanceof import_minimal36.default.Reader ? input : import_minimal36.default.Reader.create(input);
    let end = length2 === void 0 ? reader.len : reader.pos + length2;
    const message = createBasePBTweenSequence();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }
          message.sequence.push(PBTween.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }
          message.loop = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  }
  PBTweenSequence2.decode = decode;
})(PBTweenSequence || (PBTweenSequence = {}));

// node_modules/@dcl/ecs/dist/components/generated/TweenSequence.gen.js
var TweenSequenceSchema = {
  COMPONENT_ID: 1104,
  serialize(value, builder) {
    const writer = PBTweenSequence.encode(value);
    const buffer2 = new Uint8Array(writer.finish(), 0, writer.len);
    builder.writeBuffer(buffer2, false);
  },
  deserialize(reader) {
    return PBTweenSequence.decode(reader.buffer(), reader.remainingBytes());
  },
  create() {
    return PBTweenSequence.decode(new Uint8Array());
  },
  jsonSchema: {
    type: "object",
    properties: {},
    serializationType: "protocol-buffer",
    protocolBuffer: "PBTweenSequence"
  }
};

// node_modules/@dcl/ecs/dist/components/generated/pb/decentraland/sdk/components/tween_state.gen.js
var import_minimal37 = __toESM(require_minimal2());
var TweenStateStatus;
(function(TweenStateStatus2) {
  TweenStateStatus2[TweenStateStatus2["TS_ACTIVE"] = 0] = "TS_ACTIVE";
  TweenStateStatus2[TweenStateStatus2["TS_COMPLETED"] = 1] = "TS_COMPLETED";
  TweenStateStatus2[TweenStateStatus2["TS_PAUSED"] = 2] = "TS_PAUSED";
})(TweenStateStatus || (TweenStateStatus = {}));
function createBasePBTweenState() {
  return { state: 0, currentTime: 0 };
}
var PBTweenState;
(function(PBTweenState2) {
  function encode(message, writer = import_minimal37.default.Writer.create()) {
    if (message.state !== 0) {
      writer.uint32(8).int32(message.state);
    }
    if (message.currentTime !== 0) {
      writer.uint32(21).float(message.currentTime);
    }
    return writer;
  }
  PBTweenState2.encode = encode;
  function decode(input, length2) {
    const reader = input instanceof import_minimal37.default.Reader ? input : import_minimal37.default.Reader.create(input);
    let end = length2 === void 0 ? reader.len : reader.pos + length2;
    const message = createBasePBTweenState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }
          message.state = reader.int32();
          continue;
        case 2:
          if (tag !== 21) {
            break;
          }
          message.currentTime = reader.float();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  }
  PBTweenState2.decode = decode;
})(PBTweenState || (PBTweenState = {}));

// node_modules/@dcl/ecs/dist/components/generated/TweenState.gen.js
var TweenStateSchema = {
  COMPONENT_ID: 1103,
  serialize(value, builder) {
    const writer = PBTweenState.encode(value);
    const buffer2 = new Uint8Array(writer.finish(), 0, writer.len);
    builder.writeBuffer(buffer2, false);
  },
  deserialize(reader) {
    return PBTweenState.decode(reader.buffer(), reader.remainingBytes());
  },
  create() {
    return PBTweenState.decode(new Uint8Array());
  },
  jsonSchema: {
    type: "object",
    properties: {},
    serializationType: "protocol-buffer",
    protocolBuffer: "PBTweenState"
  }
};

// node_modules/@dcl/ecs/dist/components/generated/pb/decentraland/sdk/components/ui_background.gen.js
var import_minimal39 = __toESM(require_minimal2());

// node_modules/@dcl/ecs/dist/components/generated/pb/decentraland/common/border_rect.gen.js
var import_minimal38 = __toESM(require_minimal2());
function createBaseBorderRect() {
  return { top: 0, left: 0, right: 0, bottom: 0 };
}
var BorderRect;
(function(BorderRect2) {
  function encode(message, writer = import_minimal38.default.Writer.create()) {
    if (message.top !== 0) {
      writer.uint32(13).float(message.top);
    }
    if (message.left !== 0) {
      writer.uint32(21).float(message.left);
    }
    if (message.right !== 0) {
      writer.uint32(29).float(message.right);
    }
    if (message.bottom !== 0) {
      writer.uint32(37).float(message.bottom);
    }
    return writer;
  }
  BorderRect2.encode = encode;
  function decode(input, length2) {
    const reader = input instanceof import_minimal38.default.Reader ? input : import_minimal38.default.Reader.create(input);
    let end = length2 === void 0 ? reader.len : reader.pos + length2;
    const message = createBaseBorderRect();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 13) {
            break;
          }
          message.top = reader.float();
          continue;
        case 2:
          if (tag !== 21) {
            break;
          }
          message.left = reader.float();
          continue;
        case 3:
          if (tag !== 29) {
            break;
          }
          message.right = reader.float();
          continue;
        case 4:
          if (tag !== 37) {
            break;
          }
          message.bottom = reader.float();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  }
  BorderRect2.decode = decode;
})(BorderRect || (BorderRect = {}));
function createBaseRect() {
  return { x: 0, y: 0, width: 0, height: 0 };
}
var Rect;
(function(Rect2) {
  function encode(message, writer = import_minimal38.default.Writer.create()) {
    if (message.x !== 0) {
      writer.uint32(13).float(message.x);
    }
    if (message.y !== 0) {
      writer.uint32(21).float(message.y);
    }
    if (message.width !== 0) {
      writer.uint32(29).float(message.width);
    }
    if (message.height !== 0) {
      writer.uint32(37).float(message.height);
    }
    return writer;
  }
  Rect2.encode = encode;
  function decode(input, length2) {
    const reader = input instanceof import_minimal38.default.Reader ? input : import_minimal38.default.Reader.create(input);
    let end = length2 === void 0 ? reader.len : reader.pos + length2;
    const message = createBaseRect();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 13) {
            break;
          }
          message.x = reader.float();
          continue;
        case 2:
          if (tag !== 21) {
            break;
          }
          message.y = reader.float();
          continue;
        case 3:
          if (tag !== 29) {
            break;
          }
          message.width = reader.float();
          continue;
        case 4:
          if (tag !== 37) {
            break;
          }
          message.height = reader.float();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  }
  Rect2.decode = decode;
})(Rect || (Rect = {}));

// node_modules/@dcl/ecs/dist/components/generated/pb/decentraland/sdk/components/ui_background.gen.js
var BackgroundTextureMode;
(function(BackgroundTextureMode2) {
  BackgroundTextureMode2[BackgroundTextureMode2["NINE_SLICES"] = 0] = "NINE_SLICES";
  BackgroundTextureMode2[BackgroundTextureMode2["CENTER"] = 1] = "CENTER";
  BackgroundTextureMode2[BackgroundTextureMode2["STRETCH"] = 2] = "STRETCH";
})(BackgroundTextureMode || (BackgroundTextureMode = {}));
function createBasePBUiBackground() {
  return { color: void 0, texture: void 0, textureMode: 0, textureSlices: void 0, uvs: [] };
}
var PBUiBackground;
(function(PBUiBackground2) {
  function encode(message, writer = import_minimal39.default.Writer.create()) {
    if (message.color !== void 0) {
      Color4.encode(message.color, writer.uint32(10).fork()).ldelim();
    }
    if (message.texture !== void 0) {
      TextureUnion.encode(message.texture, writer.uint32(18).fork()).ldelim();
    }
    if (message.textureMode !== 0) {
      writer.uint32(24).int32(message.textureMode);
    }
    if (message.textureSlices !== void 0) {
      BorderRect.encode(message.textureSlices, writer.uint32(34).fork()).ldelim();
    }
    writer.uint32(42).fork();
    for (const v of message.uvs) {
      writer.float(v);
    }
    writer.ldelim();
    return writer;
  }
  PBUiBackground2.encode = encode;
  function decode(input, length2) {
    const reader = input instanceof import_minimal39.default.Reader ? input : import_minimal39.default.Reader.create(input);
    let end = length2 === void 0 ? reader.len : reader.pos + length2;
    const message = createBasePBUiBackground();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }
          message.color = Color4.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }
          message.texture = TextureUnion.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }
          message.textureMode = reader.int32();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }
          message.textureSlices = BorderRect.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag === 45) {
            message.uvs.push(reader.float());
            continue;
          }
          if (tag === 42) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.uvs.push(reader.float());
            }
            continue;
          }
          break;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  }
  PBUiBackground2.decode = decode;
})(PBUiBackground || (PBUiBackground = {}));

// node_modules/@dcl/ecs/dist/components/generated/UiBackground.gen.js
var UiBackgroundSchema = {
  COMPONENT_ID: 1053,
  serialize(value, builder) {
    const writer = PBUiBackground.encode(value);
    const buffer2 = new Uint8Array(writer.finish(), 0, writer.len);
    builder.writeBuffer(buffer2, false);
  },
  deserialize(reader) {
    return PBUiBackground.decode(reader.buffer(), reader.remainingBytes());
  },
  create() {
    return PBUiBackground.decode(new Uint8Array());
  },
  jsonSchema: {
    type: "object",
    properties: {},
    serializationType: "protocol-buffer",
    protocolBuffer: "PBUiBackground"
  }
};

// node_modules/@dcl/ecs/dist/components/generated/pb/decentraland/sdk/components/ui_canvas_information.gen.js
var import_minimal40 = __toESM(require_minimal2());
function createBasePBUiCanvasInformation() {
  return { devicePixelRatio: 0, width: 0, height: 0, interactableArea: void 0 };
}
var PBUiCanvasInformation;
(function(PBUiCanvasInformation2) {
  function encode(message, writer = import_minimal40.default.Writer.create()) {
    if (message.devicePixelRatio !== 0) {
      writer.uint32(13).float(message.devicePixelRatio);
    }
    if (message.width !== 0) {
      writer.uint32(16).int32(message.width);
    }
    if (message.height !== 0) {
      writer.uint32(24).int32(message.height);
    }
    if (message.interactableArea !== void 0) {
      BorderRect.encode(message.interactableArea, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  }
  PBUiCanvasInformation2.encode = encode;
  function decode(input, length2) {
    const reader = input instanceof import_minimal40.default.Reader ? input : import_minimal40.default.Reader.create(input);
    let end = length2 === void 0 ? reader.len : reader.pos + length2;
    const message = createBasePBUiCanvasInformation();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 13) {
            break;
          }
          message.devicePixelRatio = reader.float();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }
          message.width = reader.int32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }
          message.height = reader.int32();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }
          message.interactableArea = BorderRect.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  }
  PBUiCanvasInformation2.decode = decode;
})(PBUiCanvasInformation || (PBUiCanvasInformation = {}));

// node_modules/@dcl/ecs/dist/components/generated/UiCanvasInformation.gen.js
var UiCanvasInformationSchema = {
  COMPONENT_ID: 1054,
  serialize(value, builder) {
    const writer = PBUiCanvasInformation.encode(value);
    const buffer2 = new Uint8Array(writer.finish(), 0, writer.len);
    builder.writeBuffer(buffer2, false);
  },
  deserialize(reader) {
    return PBUiCanvasInformation.decode(reader.buffer(), reader.remainingBytes());
  },
  create() {
    return PBUiCanvasInformation.decode(new Uint8Array());
  },
  jsonSchema: {
    type: "object",
    properties: {},
    serializationType: "protocol-buffer",
    protocolBuffer: "PBUiCanvasInformation"
  }
};

// node_modules/@dcl/ecs/dist/components/generated/pb/decentraland/sdk/components/ui_dropdown.gen.js
var import_minimal41 = __toESM(require_minimal2());
function createBasePBUiDropdown() {
  return {
    acceptEmpty: false,
    emptyLabel: void 0,
    options: [],
    selectedIndex: void 0,
    disabled: false,
    color: void 0,
    textAlign: void 0,
    font: void 0,
    fontSize: void 0
  };
}
var PBUiDropdown;
(function(PBUiDropdown2) {
  function encode(message, writer = import_minimal41.default.Writer.create()) {
    if (message.acceptEmpty === true) {
      writer.uint32(8).bool(message.acceptEmpty);
    }
    if (message.emptyLabel !== void 0) {
      writer.uint32(18).string(message.emptyLabel);
    }
    for (const v of message.options) {
      writer.uint32(26).string(v);
    }
    if (message.selectedIndex !== void 0) {
      writer.uint32(32).int32(message.selectedIndex);
    }
    if (message.disabled === true) {
      writer.uint32(40).bool(message.disabled);
    }
    if (message.color !== void 0) {
      Color4.encode(message.color, writer.uint32(50).fork()).ldelim();
    }
    if (message.textAlign !== void 0) {
      writer.uint32(80).int32(message.textAlign);
    }
    if (message.font !== void 0) {
      writer.uint32(88).int32(message.font);
    }
    if (message.fontSize !== void 0) {
      writer.uint32(96).int32(message.fontSize);
    }
    return writer;
  }
  PBUiDropdown2.encode = encode;
  function decode(input, length2) {
    const reader = input instanceof import_minimal41.default.Reader ? input : import_minimal41.default.Reader.create(input);
    let end = length2 === void 0 ? reader.len : reader.pos + length2;
    const message = createBasePBUiDropdown();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }
          message.acceptEmpty = reader.bool();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }
          message.emptyLabel = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }
          message.options.push(reader.string());
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }
          message.selectedIndex = reader.int32();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }
          message.disabled = reader.bool();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }
          message.color = Color4.decode(reader, reader.uint32());
          continue;
        case 10:
          if (tag !== 80) {
            break;
          }
          message.textAlign = reader.int32();
          continue;
        case 11:
          if (tag !== 88) {
            break;
          }
          message.font = reader.int32();
          continue;
        case 12:
          if (tag !== 96) {
            break;
          }
          message.fontSize = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  }
  PBUiDropdown2.decode = decode;
})(PBUiDropdown || (PBUiDropdown = {}));

// node_modules/@dcl/ecs/dist/components/generated/UiDropdown.gen.js
var UiDropdownSchema = {
  COMPONENT_ID: 1094,
  serialize(value, builder) {
    const writer = PBUiDropdown.encode(value);
    const buffer2 = new Uint8Array(writer.finish(), 0, writer.len);
    builder.writeBuffer(buffer2, false);
  },
  deserialize(reader) {
    return PBUiDropdown.decode(reader.buffer(), reader.remainingBytes());
  },
  create() {
    return PBUiDropdown.decode(new Uint8Array());
  },
  jsonSchema: {
    type: "object",
    properties: {},
    serializationType: "protocol-buffer",
    protocolBuffer: "PBUiDropdown"
  }
};

// node_modules/@dcl/ecs/dist/components/generated/pb/decentraland/sdk/components/ui_dropdown_result.gen.js
var import_minimal42 = __toESM(require_minimal2());
function createBasePBUiDropdownResult() {
  return { value: 0 };
}
var PBUiDropdownResult;
(function(PBUiDropdownResult2) {
  function encode(message, writer = import_minimal42.default.Writer.create()) {
    if (message.value !== 0) {
      writer.uint32(8).int32(message.value);
    }
    return writer;
  }
  PBUiDropdownResult2.encode = encode;
  function decode(input, length2) {
    const reader = input instanceof import_minimal42.default.Reader ? input : import_minimal42.default.Reader.create(input);
    let end = length2 === void 0 ? reader.len : reader.pos + length2;
    const message = createBasePBUiDropdownResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }
          message.value = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  }
  PBUiDropdownResult2.decode = decode;
})(PBUiDropdownResult || (PBUiDropdownResult = {}));

// node_modules/@dcl/ecs/dist/components/generated/UiDropdownResult.gen.js
var UiDropdownResultSchema = {
  COMPONENT_ID: 1096,
  serialize(value, builder) {
    const writer = PBUiDropdownResult.encode(value);
    const buffer2 = new Uint8Array(writer.finish(), 0, writer.len);
    builder.writeBuffer(buffer2, false);
  },
  deserialize(reader) {
    return PBUiDropdownResult.decode(reader.buffer(), reader.remainingBytes());
  },
  create() {
    return PBUiDropdownResult.decode(new Uint8Array());
  },
  jsonSchema: {
    type: "object",
    properties: {},
    serializationType: "protocol-buffer",
    protocolBuffer: "PBUiDropdownResult"
  }
};

// node_modules/@dcl/ecs/dist/components/generated/pb/decentraland/sdk/components/ui_input.gen.js
var import_minimal43 = __toESM(require_minimal2());
function createBasePBUiInput() {
  return {
    placeholder: "",
    color: void 0,
    placeholderColor: void 0,
    disabled: false,
    textAlign: void 0,
    font: void 0,
    fontSize: void 0,
    value: void 0
  };
}
var PBUiInput;
(function(PBUiInput2) {
  function encode(message, writer = import_minimal43.default.Writer.create()) {
    if (message.placeholder !== "") {
      writer.uint32(10).string(message.placeholder);
    }
    if (message.color !== void 0) {
      Color4.encode(message.color, writer.uint32(18).fork()).ldelim();
    }
    if (message.placeholderColor !== void 0) {
      Color4.encode(message.placeholderColor, writer.uint32(26).fork()).ldelim();
    }
    if (message.disabled === true) {
      writer.uint32(32).bool(message.disabled);
    }
    if (message.textAlign !== void 0) {
      writer.uint32(80).int32(message.textAlign);
    }
    if (message.font !== void 0) {
      writer.uint32(88).int32(message.font);
    }
    if (message.fontSize !== void 0) {
      writer.uint32(96).int32(message.fontSize);
    }
    if (message.value !== void 0) {
      writer.uint32(106).string(message.value);
    }
    return writer;
  }
  PBUiInput2.encode = encode;
  function decode(input, length2) {
    const reader = input instanceof import_minimal43.default.Reader ? input : import_minimal43.default.Reader.create(input);
    let end = length2 === void 0 ? reader.len : reader.pos + length2;
    const message = createBasePBUiInput();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }
          message.placeholder = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }
          message.color = Color4.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }
          message.placeholderColor = Color4.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }
          message.disabled = reader.bool();
          continue;
        case 10:
          if (tag !== 80) {
            break;
          }
          message.textAlign = reader.int32();
          continue;
        case 11:
          if (tag !== 88) {
            break;
          }
          message.font = reader.int32();
          continue;
        case 12:
          if (tag !== 96) {
            break;
          }
          message.fontSize = reader.int32();
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }
          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  }
  PBUiInput2.decode = decode;
})(PBUiInput || (PBUiInput = {}));

// node_modules/@dcl/ecs/dist/components/generated/UiInput.gen.js
var UiInputSchema = {
  COMPONENT_ID: 1093,
  serialize(value, builder) {
    const writer = PBUiInput.encode(value);
    const buffer2 = new Uint8Array(writer.finish(), 0, writer.len);
    builder.writeBuffer(buffer2, false);
  },
  deserialize(reader) {
    return PBUiInput.decode(reader.buffer(), reader.remainingBytes());
  },
  create() {
    return PBUiInput.decode(new Uint8Array());
  },
  jsonSchema: {
    type: "object",
    properties: {},
    serializationType: "protocol-buffer",
    protocolBuffer: "PBUiInput"
  }
};

// node_modules/@dcl/ecs/dist/components/generated/pb/decentraland/sdk/components/ui_input_result.gen.js
var import_minimal44 = __toESM(require_minimal2());
function createBasePBUiInputResult() {
  return { value: "", isSubmit: void 0 };
}
var PBUiInputResult;
(function(PBUiInputResult2) {
  function encode(message, writer = import_minimal44.default.Writer.create()) {
    if (message.value !== "") {
      writer.uint32(10).string(message.value);
    }
    if (message.isSubmit !== void 0) {
      writer.uint32(16).bool(message.isSubmit);
    }
    return writer;
  }
  PBUiInputResult2.encode = encode;
  function decode(input, length2) {
    const reader = input instanceof import_minimal44.default.Reader ? input : import_minimal44.default.Reader.create(input);
    let end = length2 === void 0 ? reader.len : reader.pos + length2;
    const message = createBasePBUiInputResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }
          message.value = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }
          message.isSubmit = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  }
  PBUiInputResult2.decode = decode;
})(PBUiInputResult || (PBUiInputResult = {}));

// node_modules/@dcl/ecs/dist/components/generated/UiInputResult.gen.js
var UiInputResultSchema = {
  COMPONENT_ID: 1095,
  serialize(value, builder) {
    const writer = PBUiInputResult.encode(value);
    const buffer2 = new Uint8Array(writer.finish(), 0, writer.len);
    builder.writeBuffer(buffer2, false);
  },
  deserialize(reader) {
    return PBUiInputResult.decode(reader.buffer(), reader.remainingBytes());
  },
  create() {
    return PBUiInputResult.decode(new Uint8Array());
  },
  jsonSchema: {
    type: "object",
    properties: {},
    serializationType: "protocol-buffer",
    protocolBuffer: "PBUiInputResult"
  }
};

// node_modules/@dcl/ecs/dist/components/generated/pb/decentraland/sdk/components/ui_text.gen.js
var import_minimal45 = __toESM(require_minimal2());
var TextWrap;
(function(TextWrap2) {
  TextWrap2[TextWrap2["TW_WRAP"] = 0] = "TW_WRAP";
  TextWrap2[TextWrap2["TW_NO_WRAP"] = 1] = "TW_NO_WRAP";
})(TextWrap || (TextWrap = {}));
function createBasePBUiText() {
  return {
    value: "",
    color: void 0,
    textAlign: void 0,
    font: void 0,
    fontSize: void 0,
    textWrap: void 0
  };
}
var PBUiText;
(function(PBUiText2) {
  function encode(message, writer = import_minimal45.default.Writer.create()) {
    if (message.value !== "") {
      writer.uint32(10).string(message.value);
    }
    if (message.color !== void 0) {
      Color4.encode(message.color, writer.uint32(18).fork()).ldelim();
    }
    if (message.textAlign !== void 0) {
      writer.uint32(24).int32(message.textAlign);
    }
    if (message.font !== void 0) {
      writer.uint32(32).int32(message.font);
    }
    if (message.fontSize !== void 0) {
      writer.uint32(40).int32(message.fontSize);
    }
    if (message.textWrap !== void 0) {
      writer.uint32(48).int32(message.textWrap);
    }
    return writer;
  }
  PBUiText2.encode = encode;
  function decode(input, length2) {
    const reader = input instanceof import_minimal45.default.Reader ? input : import_minimal45.default.Reader.create(input);
    let end = length2 === void 0 ? reader.len : reader.pos + length2;
    const message = createBasePBUiText();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }
          message.value = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }
          message.color = Color4.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }
          message.textAlign = reader.int32();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }
          message.font = reader.int32();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }
          message.fontSize = reader.int32();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }
          message.textWrap = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  }
  PBUiText2.decode = decode;
})(PBUiText || (PBUiText = {}));

// node_modules/@dcl/ecs/dist/components/generated/UiText.gen.js
var UiTextSchema = {
  COMPONENT_ID: 1052,
  serialize(value, builder) {
    const writer = PBUiText.encode(value);
    const buffer2 = new Uint8Array(writer.finish(), 0, writer.len);
    builder.writeBuffer(buffer2, false);
  },
  deserialize(reader) {
    return PBUiText.decode(reader.buffer(), reader.remainingBytes());
  },
  create() {
    return PBUiText.decode(new Uint8Array());
  },
  jsonSchema: {
    type: "object",
    properties: {},
    serializationType: "protocol-buffer",
    protocolBuffer: "PBUiText"
  }
};

// node_modules/@dcl/ecs/dist/components/generated/pb/decentraland/sdk/components/ui_transform.gen.js
var import_minimal46 = __toESM(require_minimal2());
var YGPositionType;
(function(YGPositionType2) {
  YGPositionType2[YGPositionType2["YGPT_RELATIVE"] = 0] = "YGPT_RELATIVE";
  YGPositionType2[YGPositionType2["YGPT_ABSOLUTE"] = 1] = "YGPT_ABSOLUTE";
})(YGPositionType || (YGPositionType = {}));
var YGAlign;
(function(YGAlign2) {
  YGAlign2[YGAlign2["YGA_AUTO"] = 0] = "YGA_AUTO";
  YGAlign2[YGAlign2["YGA_FLEX_START"] = 1] = "YGA_FLEX_START";
  YGAlign2[YGAlign2["YGA_CENTER"] = 2] = "YGA_CENTER";
  YGAlign2[YGAlign2["YGA_FLEX_END"] = 3] = "YGA_FLEX_END";
  YGAlign2[YGAlign2["YGA_STRETCH"] = 4] = "YGA_STRETCH";
  YGAlign2[YGAlign2["YGA_BASELINE"] = 5] = "YGA_BASELINE";
  YGAlign2[YGAlign2["YGA_SPACE_BETWEEN"] = 6] = "YGA_SPACE_BETWEEN";
  YGAlign2[YGAlign2["YGA_SPACE_AROUND"] = 7] = "YGA_SPACE_AROUND";
})(YGAlign || (YGAlign = {}));
var YGUnit;
(function(YGUnit2) {
  YGUnit2[YGUnit2["YGU_UNDEFINED"] = 0] = "YGU_UNDEFINED";
  YGUnit2[YGUnit2["YGU_POINT"] = 1] = "YGU_POINT";
  YGUnit2[YGUnit2["YGU_PERCENT"] = 2] = "YGU_PERCENT";
  YGUnit2[YGUnit2["YGU_AUTO"] = 3] = "YGU_AUTO";
})(YGUnit || (YGUnit = {}));
var YGFlexDirection;
(function(YGFlexDirection2) {
  YGFlexDirection2[YGFlexDirection2["YGFD_ROW"] = 0] = "YGFD_ROW";
  YGFlexDirection2[YGFlexDirection2["YGFD_COLUMN"] = 1] = "YGFD_COLUMN";
  YGFlexDirection2[YGFlexDirection2["YGFD_COLUMN_REVERSE"] = 2] = "YGFD_COLUMN_REVERSE";
  YGFlexDirection2[YGFlexDirection2["YGFD_ROW_REVERSE"] = 3] = "YGFD_ROW_REVERSE";
})(YGFlexDirection || (YGFlexDirection = {}));
var YGWrap;
(function(YGWrap2) {
  YGWrap2[YGWrap2["YGW_NO_WRAP"] = 0] = "YGW_NO_WRAP";
  YGWrap2[YGWrap2["YGW_WRAP"] = 1] = "YGW_WRAP";
  YGWrap2[YGWrap2["YGW_WRAP_REVERSE"] = 2] = "YGW_WRAP_REVERSE";
})(YGWrap || (YGWrap = {}));
var YGJustify;
(function(YGJustify2) {
  YGJustify2[YGJustify2["YGJ_FLEX_START"] = 0] = "YGJ_FLEX_START";
  YGJustify2[YGJustify2["YGJ_CENTER"] = 1] = "YGJ_CENTER";
  YGJustify2[YGJustify2["YGJ_FLEX_END"] = 2] = "YGJ_FLEX_END";
  YGJustify2[YGJustify2["YGJ_SPACE_BETWEEN"] = 3] = "YGJ_SPACE_BETWEEN";
  YGJustify2[YGJustify2["YGJ_SPACE_AROUND"] = 4] = "YGJ_SPACE_AROUND";
  YGJustify2[YGJustify2["YGJ_SPACE_EVENLY"] = 5] = "YGJ_SPACE_EVENLY";
})(YGJustify || (YGJustify = {}));
var YGOverflow;
(function(YGOverflow2) {
  YGOverflow2[YGOverflow2["YGO_VISIBLE"] = 0] = "YGO_VISIBLE";
  YGOverflow2[YGOverflow2["YGO_HIDDEN"] = 1] = "YGO_HIDDEN";
  YGOverflow2[YGOverflow2["YGO_SCROLL"] = 2] = "YGO_SCROLL";
})(YGOverflow || (YGOverflow = {}));
var YGDisplay;
(function(YGDisplay2) {
  YGDisplay2[YGDisplay2["YGD_FLEX"] = 0] = "YGD_FLEX";
  YGDisplay2[YGDisplay2["YGD_NONE"] = 1] = "YGD_NONE";
})(YGDisplay || (YGDisplay = {}));
var YGEdge;
(function(YGEdge2) {
  YGEdge2[YGEdge2["YGE_LEFT"] = 0] = "YGE_LEFT";
  YGEdge2[YGEdge2["YGE_TOP"] = 1] = "YGE_TOP";
  YGEdge2[YGEdge2["YGE_RIGHT"] = 2] = "YGE_RIGHT";
  YGEdge2[YGEdge2["YGE_BOTTOM"] = 3] = "YGE_BOTTOM";
  YGEdge2[YGEdge2["YGE_START"] = 4] = "YGE_START";
  YGEdge2[YGEdge2["YGE_END"] = 5] = "YGE_END";
  YGEdge2[YGEdge2["YGE_HORIZONTAL"] = 6] = "YGE_HORIZONTAL";
  YGEdge2[YGEdge2["YGE_VERTICAL"] = 7] = "YGE_VERTICAL";
  YGEdge2[YGEdge2["YGE_ALL"] = 8] = "YGE_ALL";
})(YGEdge || (YGEdge = {}));
var PointerFilterMode;
(function(PointerFilterMode2) {
  PointerFilterMode2[PointerFilterMode2["PFM_NONE"] = 0] = "PFM_NONE";
  PointerFilterMode2[PointerFilterMode2["PFM_BLOCK"] = 1] = "PFM_BLOCK";
})(PointerFilterMode || (PointerFilterMode = {}));
function createBasePBUiTransform() {
  return {
    parent: 0,
    rightOf: 0,
    alignContent: void 0,
    alignItems: void 0,
    flexWrap: void 0,
    flexShrink: void 0,
    positionType: 0,
    alignSelf: 0,
    flexDirection: 0,
    justifyContent: 0,
    overflow: 0,
    display: 0,
    flexBasisUnit: 0,
    flexBasis: 0,
    flexGrow: 0,
    widthUnit: 0,
    width: 0,
    heightUnit: 0,
    height: 0,
    minWidthUnit: 0,
    minWidth: 0,
    minHeightUnit: 0,
    minHeight: 0,
    maxWidthUnit: 0,
    maxWidth: 0,
    maxHeightUnit: 0,
    maxHeight: 0,
    positionLeftUnit: 0,
    positionLeft: 0,
    positionTopUnit: 0,
    positionTop: 0,
    positionRightUnit: 0,
    positionRight: 0,
    positionBottomUnit: 0,
    positionBottom: 0,
    marginLeftUnit: 0,
    marginLeft: 0,
    marginTopUnit: 0,
    marginTop: 0,
    marginRightUnit: 0,
    marginRight: 0,
    marginBottomUnit: 0,
    marginBottom: 0,
    paddingLeftUnit: 0,
    paddingLeft: 0,
    paddingTopUnit: 0,
    paddingTop: 0,
    paddingRightUnit: 0,
    paddingRight: 0,
    paddingBottomUnit: 0,
    paddingBottom: 0,
    pointerFilter: void 0
  };
}
var PBUiTransform;
(function(PBUiTransform2) {
  function encode(message, writer = import_minimal46.default.Writer.create()) {
    if (message.parent !== 0) {
      writer.uint32(8).int32(message.parent);
    }
    if (message.rightOf !== 0) {
      writer.uint32(16).int32(message.rightOf);
    }
    if (message.alignContent !== void 0) {
      writer.uint32(24).int32(message.alignContent);
    }
    if (message.alignItems !== void 0) {
      writer.uint32(32).int32(message.alignItems);
    }
    if (message.flexWrap !== void 0) {
      writer.uint32(40).int32(message.flexWrap);
    }
    if (message.flexShrink !== void 0) {
      writer.uint32(53).float(message.flexShrink);
    }
    if (message.positionType !== 0) {
      writer.uint32(56).int32(message.positionType);
    }
    if (message.alignSelf !== 0) {
      writer.uint32(64).int32(message.alignSelf);
    }
    if (message.flexDirection !== 0) {
      writer.uint32(72).int32(message.flexDirection);
    }
    if (message.justifyContent !== 0) {
      writer.uint32(80).int32(message.justifyContent);
    }
    if (message.overflow !== 0) {
      writer.uint32(88).int32(message.overflow);
    }
    if (message.display !== 0) {
      writer.uint32(96).int32(message.display);
    }
    if (message.flexBasisUnit !== 0) {
      writer.uint32(104).int32(message.flexBasisUnit);
    }
    if (message.flexBasis !== 0) {
      writer.uint32(117).float(message.flexBasis);
    }
    if (message.flexGrow !== 0) {
      writer.uint32(125).float(message.flexGrow);
    }
    if (message.widthUnit !== 0) {
      writer.uint32(128).int32(message.widthUnit);
    }
    if (message.width !== 0) {
      writer.uint32(141).float(message.width);
    }
    if (message.heightUnit !== 0) {
      writer.uint32(144).int32(message.heightUnit);
    }
    if (message.height !== 0) {
      writer.uint32(157).float(message.height);
    }
    if (message.minWidthUnit !== 0) {
      writer.uint32(160).int32(message.minWidthUnit);
    }
    if (message.minWidth !== 0) {
      writer.uint32(173).float(message.minWidth);
    }
    if (message.minHeightUnit !== 0) {
      writer.uint32(176).int32(message.minHeightUnit);
    }
    if (message.minHeight !== 0) {
      writer.uint32(189).float(message.minHeight);
    }
    if (message.maxWidthUnit !== 0) {
      writer.uint32(192).int32(message.maxWidthUnit);
    }
    if (message.maxWidth !== 0) {
      writer.uint32(205).float(message.maxWidth);
    }
    if (message.maxHeightUnit !== 0) {
      writer.uint32(208).int32(message.maxHeightUnit);
    }
    if (message.maxHeight !== 0) {
      writer.uint32(221).float(message.maxHeight);
    }
    if (message.positionLeftUnit !== 0) {
      writer.uint32(224).int32(message.positionLeftUnit);
    }
    if (message.positionLeft !== 0) {
      writer.uint32(237).float(message.positionLeft);
    }
    if (message.positionTopUnit !== 0) {
      writer.uint32(240).int32(message.positionTopUnit);
    }
    if (message.positionTop !== 0) {
      writer.uint32(253).float(message.positionTop);
    }
    if (message.positionRightUnit !== 0) {
      writer.uint32(256).int32(message.positionRightUnit);
    }
    if (message.positionRight !== 0) {
      writer.uint32(269).float(message.positionRight);
    }
    if (message.positionBottomUnit !== 0) {
      writer.uint32(272).int32(message.positionBottomUnit);
    }
    if (message.positionBottom !== 0) {
      writer.uint32(285).float(message.positionBottom);
    }
    if (message.marginLeftUnit !== 0) {
      writer.uint32(288).int32(message.marginLeftUnit);
    }
    if (message.marginLeft !== 0) {
      writer.uint32(301).float(message.marginLeft);
    }
    if (message.marginTopUnit !== 0) {
      writer.uint32(304).int32(message.marginTopUnit);
    }
    if (message.marginTop !== 0) {
      writer.uint32(317).float(message.marginTop);
    }
    if (message.marginRightUnit !== 0) {
      writer.uint32(320).int32(message.marginRightUnit);
    }
    if (message.marginRight !== 0) {
      writer.uint32(333).float(message.marginRight);
    }
    if (message.marginBottomUnit !== 0) {
      writer.uint32(336).int32(message.marginBottomUnit);
    }
    if (message.marginBottom !== 0) {
      writer.uint32(349).float(message.marginBottom);
    }
    if (message.paddingLeftUnit !== 0) {
      writer.uint32(352).int32(message.paddingLeftUnit);
    }
    if (message.paddingLeft !== 0) {
      writer.uint32(365).float(message.paddingLeft);
    }
    if (message.paddingTopUnit !== 0) {
      writer.uint32(368).int32(message.paddingTopUnit);
    }
    if (message.paddingTop !== 0) {
      writer.uint32(381).float(message.paddingTop);
    }
    if (message.paddingRightUnit !== 0) {
      writer.uint32(384).int32(message.paddingRightUnit);
    }
    if (message.paddingRight !== 0) {
      writer.uint32(397).float(message.paddingRight);
    }
    if (message.paddingBottomUnit !== 0) {
      writer.uint32(400).int32(message.paddingBottomUnit);
    }
    if (message.paddingBottom !== 0) {
      writer.uint32(413).float(message.paddingBottom);
    }
    if (message.pointerFilter !== void 0) {
      writer.uint32(416).int32(message.pointerFilter);
    }
    return writer;
  }
  PBUiTransform2.encode = encode;
  function decode(input, length2) {
    const reader = input instanceof import_minimal46.default.Reader ? input : import_minimal46.default.Reader.create(input);
    let end = length2 === void 0 ? reader.len : reader.pos + length2;
    const message = createBasePBUiTransform();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }
          message.parent = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }
          message.rightOf = reader.int32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }
          message.alignContent = reader.int32();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }
          message.alignItems = reader.int32();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }
          message.flexWrap = reader.int32();
          continue;
        case 6:
          if (tag !== 53) {
            break;
          }
          message.flexShrink = reader.float();
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }
          message.positionType = reader.int32();
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }
          message.alignSelf = reader.int32();
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }
          message.flexDirection = reader.int32();
          continue;
        case 10:
          if (tag !== 80) {
            break;
          }
          message.justifyContent = reader.int32();
          continue;
        case 11:
          if (tag !== 88) {
            break;
          }
          message.overflow = reader.int32();
          continue;
        case 12:
          if (tag !== 96) {
            break;
          }
          message.display = reader.int32();
          continue;
        case 13:
          if (tag !== 104) {
            break;
          }
          message.flexBasisUnit = reader.int32();
          continue;
        case 14:
          if (tag !== 117) {
            break;
          }
          message.flexBasis = reader.float();
          continue;
        case 15:
          if (tag !== 125) {
            break;
          }
          message.flexGrow = reader.float();
          continue;
        case 16:
          if (tag !== 128) {
            break;
          }
          message.widthUnit = reader.int32();
          continue;
        case 17:
          if (tag !== 141) {
            break;
          }
          message.width = reader.float();
          continue;
        case 18:
          if (tag !== 144) {
            break;
          }
          message.heightUnit = reader.int32();
          continue;
        case 19:
          if (tag !== 157) {
            break;
          }
          message.height = reader.float();
          continue;
        case 20:
          if (tag !== 160) {
            break;
          }
          message.minWidthUnit = reader.int32();
          continue;
        case 21:
          if (tag !== 173) {
            break;
          }
          message.minWidth = reader.float();
          continue;
        case 22:
          if (tag !== 176) {
            break;
          }
          message.minHeightUnit = reader.int32();
          continue;
        case 23:
          if (tag !== 189) {
            break;
          }
          message.minHeight = reader.float();
          continue;
        case 24:
          if (tag !== 192) {
            break;
          }
          message.maxWidthUnit = reader.int32();
          continue;
        case 25:
          if (tag !== 205) {
            break;
          }
          message.maxWidth = reader.float();
          continue;
        case 26:
          if (tag !== 208) {
            break;
          }
          message.maxHeightUnit = reader.int32();
          continue;
        case 27:
          if (tag !== 221) {
            break;
          }
          message.maxHeight = reader.float();
          continue;
        case 28:
          if (tag !== 224) {
            break;
          }
          message.positionLeftUnit = reader.int32();
          continue;
        case 29:
          if (tag !== 237) {
            break;
          }
          message.positionLeft = reader.float();
          continue;
        case 30:
          if (tag !== 240) {
            break;
          }
          message.positionTopUnit = reader.int32();
          continue;
        case 31:
          if (tag !== 253) {
            break;
          }
          message.positionTop = reader.float();
          continue;
        case 32:
          if (tag !== 256) {
            break;
          }
          message.positionRightUnit = reader.int32();
          continue;
        case 33:
          if (tag !== 269) {
            break;
          }
          message.positionRight = reader.float();
          continue;
        case 34:
          if (tag !== 272) {
            break;
          }
          message.positionBottomUnit = reader.int32();
          continue;
        case 35:
          if (tag !== 285) {
            break;
          }
          message.positionBottom = reader.float();
          continue;
        case 36:
          if (tag !== 288) {
            break;
          }
          message.marginLeftUnit = reader.int32();
          continue;
        case 37:
          if (tag !== 301) {
            break;
          }
          message.marginLeft = reader.float();
          continue;
        case 38:
          if (tag !== 304) {
            break;
          }
          message.marginTopUnit = reader.int32();
          continue;
        case 39:
          if (tag !== 317) {
            break;
          }
          message.marginTop = reader.float();
          continue;
        case 40:
          if (tag !== 320) {
            break;
          }
          message.marginRightUnit = reader.int32();
          continue;
        case 41:
          if (tag !== 333) {
            break;
          }
          message.marginRight = reader.float();
          continue;
        case 42:
          if (tag !== 336) {
            break;
          }
          message.marginBottomUnit = reader.int32();
          continue;
        case 43:
          if (tag !== 349) {
            break;
          }
          message.marginBottom = reader.float();
          continue;
        case 44:
          if (tag !== 352) {
            break;
          }
          message.paddingLeftUnit = reader.int32();
          continue;
        case 45:
          if (tag !== 365) {
            break;
          }
          message.paddingLeft = reader.float();
          continue;
        case 46:
          if (tag !== 368) {
            break;
          }
          message.paddingTopUnit = reader.int32();
          continue;
        case 47:
          if (tag !== 381) {
            break;
          }
          message.paddingTop = reader.float();
          continue;
        case 48:
          if (tag !== 384) {
            break;
          }
          message.paddingRightUnit = reader.int32();
          continue;
        case 49:
          if (tag !== 397) {
            break;
          }
          message.paddingRight = reader.float();
          continue;
        case 50:
          if (tag !== 400) {
            break;
          }
          message.paddingBottomUnit = reader.int32();
          continue;
        case 51:
          if (tag !== 413) {
            break;
          }
          message.paddingBottom = reader.float();
          continue;
        case 52:
          if (tag !== 416) {
            break;
          }
          message.pointerFilter = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  }
  PBUiTransform2.decode = decode;
})(PBUiTransform || (PBUiTransform = {}));

// node_modules/@dcl/ecs/dist/components/generated/UiTransform.gen.js
var UiTransformSchema = {
  COMPONENT_ID: 1050,
  serialize(value, builder) {
    const writer = PBUiTransform.encode(value);
    const buffer2 = new Uint8Array(writer.finish(), 0, writer.len);
    builder.writeBuffer(buffer2, false);
  },
  deserialize(reader) {
    return PBUiTransform.decode(reader.buffer(), reader.remainingBytes());
  },
  create() {
    return PBUiTransform.decode(new Uint8Array());
  },
  jsonSchema: {
    type: "object",
    properties: {},
    serializationType: "protocol-buffer",
    protocolBuffer: "PBUiTransform"
  }
};

// node_modules/@dcl/ecs/dist/components/generated/pb/decentraland/sdk/components/video_event.gen.js
var import_minimal47 = __toESM(require_minimal2());
var VideoState;
(function(VideoState2) {
  VideoState2[VideoState2["VS_NONE"] = 0] = "VS_NONE";
  VideoState2[VideoState2["VS_ERROR"] = 1] = "VS_ERROR";
  VideoState2[VideoState2["VS_LOADING"] = 2] = "VS_LOADING";
  VideoState2[VideoState2["VS_READY"] = 3] = "VS_READY";
  VideoState2[VideoState2["VS_PLAYING"] = 4] = "VS_PLAYING";
  VideoState2[VideoState2["VS_BUFFERING"] = 5] = "VS_BUFFERING";
  VideoState2[VideoState2["VS_SEEKING"] = 6] = "VS_SEEKING";
  VideoState2[VideoState2["VS_PAUSED"] = 7] = "VS_PAUSED";
})(VideoState || (VideoState = {}));
function createBasePBVideoEvent() {
  return { timestamp: 0, tickNumber: 0, currentOffset: 0, videoLength: 0, state: 0 };
}
var PBVideoEvent;
(function(PBVideoEvent2) {
  function encode(message, writer = import_minimal47.default.Writer.create()) {
    if (message.timestamp !== 0) {
      writer.uint32(8).uint32(message.timestamp);
    }
    if (message.tickNumber !== 0) {
      writer.uint32(16).uint32(message.tickNumber);
    }
    if (message.currentOffset !== 0) {
      writer.uint32(29).float(message.currentOffset);
    }
    if (message.videoLength !== 0) {
      writer.uint32(37).float(message.videoLength);
    }
    if (message.state !== 0) {
      writer.uint32(40).int32(message.state);
    }
    return writer;
  }
  PBVideoEvent2.encode = encode;
  function decode(input, length2) {
    const reader = input instanceof import_minimal47.default.Reader ? input : import_minimal47.default.Reader.create(input);
    let end = length2 === void 0 ? reader.len : reader.pos + length2;
    const message = createBasePBVideoEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }
          message.timestamp = reader.uint32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }
          message.tickNumber = reader.uint32();
          continue;
        case 3:
          if (tag !== 29) {
            break;
          }
          message.currentOffset = reader.float();
          continue;
        case 4:
          if (tag !== 37) {
            break;
          }
          message.videoLength = reader.float();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }
          message.state = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  }
  PBVideoEvent2.decode = decode;
})(PBVideoEvent || (PBVideoEvent = {}));

// node_modules/@dcl/ecs/dist/components/generated/VideoEvent.gen.js
var VideoEventSchema = {
  COMPONENT_ID: 1044,
  serialize(value, builder) {
    const writer = PBVideoEvent.encode(value);
    const buffer2 = new Uint8Array(writer.finish(), 0, writer.len);
    builder.writeBuffer(buffer2, false);
  },
  deserialize(reader) {
    return PBVideoEvent.decode(reader.buffer(), reader.remainingBytes());
  },
  create() {
    return PBVideoEvent.decode(new Uint8Array());
  },
  jsonSchema: {
    type: "object",
    properties: {},
    serializationType: "protocol-buffer",
    protocolBuffer: "PBVideoEvent"
  }
};

// node_modules/@dcl/ecs/dist/components/generated/pb/decentraland/sdk/components/video_player.gen.js
var import_minimal48 = __toESM(require_minimal2());
function createBasePBVideoPlayer() {
  return {
    src: "",
    playing: void 0,
    position: void 0,
    volume: void 0,
    playbackRate: void 0,
    loop: void 0
  };
}
var PBVideoPlayer;
(function(PBVideoPlayer2) {
  function encode(message, writer = import_minimal48.default.Writer.create()) {
    if (message.src !== "") {
      writer.uint32(10).string(message.src);
    }
    if (message.playing !== void 0) {
      writer.uint32(16).bool(message.playing);
    }
    if (message.position !== void 0) {
      writer.uint32(29).float(message.position);
    }
    if (message.volume !== void 0) {
      writer.uint32(37).float(message.volume);
    }
    if (message.playbackRate !== void 0) {
      writer.uint32(45).float(message.playbackRate);
    }
    if (message.loop !== void 0) {
      writer.uint32(48).bool(message.loop);
    }
    return writer;
  }
  PBVideoPlayer2.encode = encode;
  function decode(input, length2) {
    const reader = input instanceof import_minimal48.default.Reader ? input : import_minimal48.default.Reader.create(input);
    let end = length2 === void 0 ? reader.len : reader.pos + length2;
    const message = createBasePBVideoPlayer();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }
          message.src = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }
          message.playing = reader.bool();
          continue;
        case 3:
          if (tag !== 29) {
            break;
          }
          message.position = reader.float();
          continue;
        case 4:
          if (tag !== 37) {
            break;
          }
          message.volume = reader.float();
          continue;
        case 5:
          if (tag !== 45) {
            break;
          }
          message.playbackRate = reader.float();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }
          message.loop = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  }
  PBVideoPlayer2.decode = decode;
})(PBVideoPlayer || (PBVideoPlayer = {}));

// node_modules/@dcl/ecs/dist/components/generated/VideoPlayer.gen.js
var VideoPlayerSchema = {
  COMPONENT_ID: 1043,
  serialize(value, builder) {
    const writer = PBVideoPlayer.encode(value);
    const buffer2 = new Uint8Array(writer.finish(), 0, writer.len);
    builder.writeBuffer(buffer2, false);
  },
  deserialize(reader) {
    return PBVideoPlayer.decode(reader.buffer(), reader.remainingBytes());
  },
  create() {
    return PBVideoPlayer.decode(new Uint8Array());
  },
  jsonSchema: {
    type: "object",
    properties: {},
    serializationType: "protocol-buffer",
    protocolBuffer: "PBVideoPlayer"
  }
};

// node_modules/@dcl/ecs/dist/components/generated/pb/decentraland/sdk/components/virtual_camera.gen.js
var import_minimal50 = __toESM(require_minimal2());

// node_modules/@dcl/ecs/dist/components/generated/pb/decentraland/sdk/components/common/camera_transition.gen.js
var import_minimal49 = __toESM(require_minimal2());
function createBaseCameraTransition() {
  return { transitionMode: void 0 };
}
var CameraTransition;
(function(CameraTransition2) {
  function encode(message, writer = import_minimal49.default.Writer.create()) {
    switch (message.transitionMode?.$case) {
      case "time":
        writer.uint32(13).float(message.transitionMode.time);
        break;
      case "speed":
        writer.uint32(21).float(message.transitionMode.speed);
        break;
    }
    return writer;
  }
  CameraTransition2.encode = encode;
  function decode(input, length2) {
    const reader = input instanceof import_minimal49.default.Reader ? input : import_minimal49.default.Reader.create(input);
    let end = length2 === void 0 ? reader.len : reader.pos + length2;
    const message = createBaseCameraTransition();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 13) {
            break;
          }
          message.transitionMode = { $case: "time", time: reader.float() };
          continue;
        case 2:
          if (tag !== 21) {
            break;
          }
          message.transitionMode = { $case: "speed", speed: reader.float() };
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  }
  CameraTransition2.decode = decode;
})(CameraTransition || (CameraTransition = {}));

// node_modules/@dcl/ecs/dist/components/generated/pb/decentraland/sdk/components/virtual_camera.gen.js
function createBasePBVirtualCamera() {
  return { defaultTransition: void 0, lookAtEntity: void 0 };
}
var PBVirtualCamera;
(function(PBVirtualCamera2) {
  function encode(message, writer = import_minimal50.default.Writer.create()) {
    if (message.defaultTransition !== void 0) {
      CameraTransition.encode(message.defaultTransition, writer.uint32(10).fork()).ldelim();
    }
    if (message.lookAtEntity !== void 0) {
      writer.uint32(16).uint32(message.lookAtEntity);
    }
    return writer;
  }
  PBVirtualCamera2.encode = encode;
  function decode(input, length2) {
    const reader = input instanceof import_minimal50.default.Reader ? input : import_minimal50.default.Reader.create(input);
    let end = length2 === void 0 ? reader.len : reader.pos + length2;
    const message = createBasePBVirtualCamera();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }
          message.defaultTransition = CameraTransition.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }
          message.lookAtEntity = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  }
  PBVirtualCamera2.decode = decode;
})(PBVirtualCamera || (PBVirtualCamera = {}));

// node_modules/@dcl/ecs/dist/components/generated/VirtualCamera.gen.js
var VirtualCameraSchema = {
  COMPONENT_ID: 1076,
  serialize(value, builder) {
    const writer = PBVirtualCamera.encode(value);
    const buffer2 = new Uint8Array(writer.finish(), 0, writer.len);
    builder.writeBuffer(buffer2, false);
  },
  deserialize(reader) {
    return PBVirtualCamera.decode(reader.buffer(), reader.remainingBytes());
  },
  create() {
    return PBVirtualCamera.decode(new Uint8Array());
  },
  jsonSchema: {
    type: "object",
    properties: {},
    serializationType: "protocol-buffer",
    protocolBuffer: "PBVirtualCamera"
  }
};

// node_modules/@dcl/ecs/dist/components/generated/pb/decentraland/sdk/components/visibility_component.gen.js
var import_minimal51 = __toESM(require_minimal2());
function createBasePBVisibilityComponent() {
  return { visible: void 0 };
}
var PBVisibilityComponent;
(function(PBVisibilityComponent2) {
  function encode(message, writer = import_minimal51.default.Writer.create()) {
    if (message.visible !== void 0) {
      writer.uint32(8).bool(message.visible);
    }
    return writer;
  }
  PBVisibilityComponent2.encode = encode;
  function decode(input, length2) {
    const reader = input instanceof import_minimal51.default.Reader ? input : import_minimal51.default.Reader.create(input);
    let end = length2 === void 0 ? reader.len : reader.pos + length2;
    const message = createBasePBVisibilityComponent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }
          message.visible = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  }
  PBVisibilityComponent2.decode = decode;
})(PBVisibilityComponent || (PBVisibilityComponent = {}));

// node_modules/@dcl/ecs/dist/components/generated/VisibilityComponent.gen.js
var VisibilityComponentSchema = {
  COMPONENT_ID: 1081,
  serialize(value, builder) {
    const writer = PBVisibilityComponent.encode(value);
    const buffer2 = new Uint8Array(writer.finish(), 0, writer.len);
    builder.writeBuffer(buffer2, false);
  },
  deserialize(reader) {
    return PBVisibilityComponent.decode(reader.buffer(), reader.remainingBytes());
  },
  create() {
    return PBVisibilityComponent.decode(new Uint8Array());
  },
  jsonSchema: {
    type: "object",
    properties: {},
    serializationType: "protocol-buffer",
    protocolBuffer: "PBVisibilityComponent"
  }
};

// node_modules/@dcl/ecs/dist/components/generated/index.gen.js
var Animator = (engine2) => /* @__PURE__ */ engine2.defineComponentFromSchema("core::Animator", AnimatorSchema);
var AudioEvent = (engine2) => /* @__PURE__ */ engine2.defineValueSetComponentFromSchema("core::AudioEvent", AudioEventSchema, {
  timestampFunction: (t) => t.timestamp,
  maxElements: 100
});
var AudioSource = (engine2) => /* @__PURE__ */ engine2.defineComponentFromSchema("core::AudioSource", AudioSourceSchema);
var AudioStream = (engine2) => /* @__PURE__ */ engine2.defineComponentFromSchema("core::AudioStream", AudioStreamSchema);
var AvatarAttach = (engine2) => /* @__PURE__ */ engine2.defineComponentFromSchema("core::AvatarAttach", AvatarAttachSchema);
var AvatarBase = (engine2) => /* @__PURE__ */ engine2.defineComponentFromSchema("core::AvatarBase", AvatarBaseSchema);
var AvatarEmoteCommand = (engine2) => /* @__PURE__ */ engine2.defineValueSetComponentFromSchema("core::AvatarEmoteCommand", AvatarEmoteCommandSchema, {
  timestampFunction: (t) => t.timestamp,
  maxElements: 100
});
var AvatarEquippedData = (engine2) => /* @__PURE__ */ engine2.defineComponentFromSchema("core::AvatarEquippedData", AvatarEquippedDataSchema);
var AvatarModifierArea = (engine2) => /* @__PURE__ */ engine2.defineComponentFromSchema("core::AvatarModifierArea", AvatarModifierAreaSchema);
var AvatarShape = (engine2) => /* @__PURE__ */ engine2.defineComponentFromSchema("core::AvatarShape", AvatarShapeSchema);
var Billboard = (engine2) => /* @__PURE__ */ engine2.defineComponentFromSchema("core::Billboard", BillboardSchema);
var CameraMode = (engine2) => /* @__PURE__ */ engine2.defineComponentFromSchema("core::CameraMode", CameraModeSchema);
var CameraModeArea = (engine2) => /* @__PURE__ */ engine2.defineComponentFromSchema("core::CameraModeArea", CameraModeAreaSchema);
var EngineInfo = (engine2) => /* @__PURE__ */ engine2.defineComponentFromSchema("core::EngineInfo", EngineInfoSchema);
var GltfContainer = (engine2) => /* @__PURE__ */ engine2.defineComponentFromSchema("core::GltfContainer", GltfContainerSchema);
var GltfContainerLoadingState = (engine2) => /* @__PURE__ */ engine2.defineComponentFromSchema("core::GltfContainerLoadingState", GltfContainerLoadingStateSchema);
var InputModifier = (engine2) => /* @__PURE__ */ engine2.defineComponentFromSchema("core::InputModifier", InputModifierSchema);
var MainCamera = (engine2) => /* @__PURE__ */ engine2.defineComponentFromSchema("core::MainCamera", MainCameraSchema);
var Material = (engine2) => /* @__PURE__ */ engine2.defineComponentFromSchema("core::Material", MaterialSchema);
var MeshCollider = (engine2) => /* @__PURE__ */ engine2.defineComponentFromSchema("core::MeshCollider", MeshColliderSchema);
var MeshRenderer = (engine2) => /* @__PURE__ */ engine2.defineComponentFromSchema("core::MeshRenderer", MeshRendererSchema);
var NftShape = (engine2) => /* @__PURE__ */ engine2.defineComponentFromSchema("core::NftShape", NftShapeSchema);
var PlayerIdentityData = (engine2) => /* @__PURE__ */ engine2.defineComponentFromSchema("core::PlayerIdentityData", PlayerIdentityDataSchema);
var PointerEvents = (engine2) => /* @__PURE__ */ engine2.defineComponentFromSchema("core::PointerEvents", PointerEventsSchema);
var PointerEventsResult = (engine2) => /* @__PURE__ */ engine2.defineValueSetComponentFromSchema("core::PointerEventsResult", PointerEventsResultSchema, {
  timestampFunction: (t) => t.timestamp,
  maxElements: 100
});
var PointerLock = (engine2) => /* @__PURE__ */ engine2.defineComponentFromSchema("core::PointerLock", PointerLockSchema);
var Raycast = (engine2) => /* @__PURE__ */ engine2.defineComponentFromSchema("core::Raycast", RaycastSchema);
var RaycastResult = (engine2) => /* @__PURE__ */ engine2.defineComponentFromSchema("core::RaycastResult", RaycastResultSchema);
var RealmInfo = (engine2) => /* @__PURE__ */ engine2.defineComponentFromSchema("core::RealmInfo", RealmInfoSchema);
var TextShape = (engine2) => /* @__PURE__ */ engine2.defineComponentFromSchema("core::TextShape", TextShapeSchema);
var Tween = (engine2) => /* @__PURE__ */ engine2.defineComponentFromSchema("core::Tween", TweenSchema);
var TweenSequence = (engine2) => /* @__PURE__ */ engine2.defineComponentFromSchema("core::TweenSequence", TweenSequenceSchema);
var TweenState = (engine2) => /* @__PURE__ */ engine2.defineComponentFromSchema("core::TweenState", TweenStateSchema);
var UiBackground = (engine2) => /* @__PURE__ */ engine2.defineComponentFromSchema("core::UiBackground", UiBackgroundSchema);
var UiCanvasInformation = (engine2) => /* @__PURE__ */ engine2.defineComponentFromSchema("core::UiCanvasInformation", UiCanvasInformationSchema);
var UiDropdown = (engine2) => /* @__PURE__ */ engine2.defineComponentFromSchema("core::UiDropdown", UiDropdownSchema);
var UiDropdownResult = (engine2) => /* @__PURE__ */ engine2.defineComponentFromSchema("core::UiDropdownResult", UiDropdownResultSchema);
var UiInput = (engine2) => /* @__PURE__ */ engine2.defineComponentFromSchema("core::UiInput", UiInputSchema);
var UiInputResult = (engine2) => /* @__PURE__ */ engine2.defineComponentFromSchema("core::UiInputResult", UiInputResultSchema);
var UiText = (engine2) => /* @__PURE__ */ engine2.defineComponentFromSchema("core::UiText", UiTextSchema);
var UiTransform = (engine2) => /* @__PURE__ */ engine2.defineComponentFromSchema("core::UiTransform", UiTransformSchema);
var VideoEvent = (engine2) => /* @__PURE__ */ engine2.defineValueSetComponentFromSchema("core::VideoEvent", VideoEventSchema, {
  timestampFunction: (t) => t.timestamp,
  maxElements: 100
});
var VideoPlayer = (engine2) => /* @__PURE__ */ engine2.defineComponentFromSchema("core::VideoPlayer", VideoPlayerSchema);
var VirtualCamera = (engine2) => /* @__PURE__ */ engine2.defineComponentFromSchema("core::VirtualCamera", VirtualCameraSchema);
var VisibilityComponent = (engine2) => /* @__PURE__ */ engine2.defineComponentFromSchema("core::VisibilityComponent", VisibilityComponentSchema);
var componentDefinitionByName = {
  "core::Animator": Animator,
  "core::AudioEvent": AudioEvent,
  "core::AudioSource": AudioSource,
  "core::AudioStream": AudioStream,
  "core::AvatarAttach": AvatarAttach,
  "core::AvatarBase": AvatarBase,
  "core::AvatarEmoteCommand": AvatarEmoteCommand,
  "core::AvatarEquippedData": AvatarEquippedData,
  "core::AvatarModifierArea": AvatarModifierArea,
  "core::AvatarShape": AvatarShape,
  "core::Billboard": Billboard,
  "core::CameraMode": CameraMode,
  "core::CameraModeArea": CameraModeArea,
  "core::EngineInfo": EngineInfo,
  "core::GltfContainer": GltfContainer,
  "core::GltfContainerLoadingState": GltfContainerLoadingState,
  "core::InputModifier": InputModifier,
  "core::MainCamera": MainCamera,
  "core::Material": Material,
  "core::MeshCollider": MeshCollider,
  "core::MeshRenderer": MeshRenderer,
  "core::NftShape": NftShape,
  "core::PlayerIdentityData": PlayerIdentityData,
  "core::PointerEvents": PointerEvents,
  "core::PointerEventsResult": PointerEventsResult,
  "core::PointerLock": PointerLock,
  "core::Raycast": Raycast,
  "core::RaycastResult": RaycastResult,
  "core::RealmInfo": RealmInfo,
  "core::TextShape": TextShape,
  "core::Tween": Tween,
  "core::TweenSequence": TweenSequence,
  "core::TweenState": TweenState,
  "core::UiBackground": UiBackground,
  "core::UiCanvasInformation": UiCanvasInformation,
  "core::UiDropdown": UiDropdown,
  "core::UiDropdownResult": UiDropdownResult,
  "core::UiInput": UiInput,
  "core::UiInputResult": UiInputResult,
  "core::UiText": UiText,
  "core::UiTransform": UiTransform,
  "core::VideoEvent": VideoEvent,
  "core::VideoPlayer": VideoPlayer,
  "core::VirtualCamera": VirtualCamera,
  "core::VisibilityComponent": VisibilityComponent
};

// node_modules/@dcl/ecs/dist/components/extended/Animator.js
function defineAnimatorComponent(engine2) {
  const theComponent = Animator(engine2);
  function getClipAndAnimator(entity, clipName) {
    const anim = theComponent.getMutableOrNull(entity);
    if (!anim)
      return [null, null];
    const state = anim.states.find((item) => item.clip === clipName);
    if (!state)
      return [anim, null];
    return [anim, state];
  }
  return {
    ...theComponent,
    getClipOrNull(entity, clipName) {
      const [_, state] = getClipAndAnimator(entity, clipName);
      return state;
    },
    getClip(entity, clipName) {
      const [animator, state] = getClipAndAnimator(entity, clipName);
      if (!animator) {
        throw new Error(`There is no Animator found in the entity ${entity}`);
      }
      if (!state) {
        throw new Error(`The Animator component of ${entity} has no the state ${clipName}`);
      }
      return state;
    },
    playSingleAnimation(entity, clipName, shouldReset = true) {
      const [animator, state] = getClipAndAnimator(entity, clipName);
      if (!animator || !state)
        return false;
      for (const state2 of animator.states) {
        state2.playing = false;
        state2.shouldReset = true;
      }
      state.playing = true;
      state.shouldReset = shouldReset;
      return true;
    },
    stopAllAnimations(entity, resetCursor = true) {
      const animator = theComponent.getMutableOrNull(entity);
      if (!animator)
        return false;
      for (const state of animator.states) {
        state.playing = false;
        state.shouldReset = resetCursor;
      }
      return true;
    }
  };
}

// node_modules/@dcl/ecs/dist/components/extended/AudioSource.js
function defineAudioSourceComponent(engine2) {
  const theComponent = AudioSource(engine2);
  return {
    ...theComponent,
    playSound(entity, src, resetCursor = true) {
      const audioSource = theComponent.getMutableOrNull(entity);
      if (!audioSource)
        return false;
      audioSource.audioClipUrl = src;
      audioSource.playing = true;
      audioSource.currentTime = resetCursor ? 0 : audioSource.currentTime;
      return true;
    },
    stopSound(entity, resetCursor = true) {
      const audioSource = theComponent.getMutableOrNull(entity);
      if (!audioSource)
        return false;
      audioSource.playing = false;
      audioSource.currentTime = resetCursor ? 0 : audioSource.currentTime;
      return true;
    }
  };
}

// node_modules/@dcl/ecs/dist/components/extended/Material.js
var TextureHelper = {
  Common(texture) {
    return {
      tex: {
        $case: "texture",
        texture
      }
    };
  },
  Avatar(avatarTexture) {
    return {
      tex: {
        $case: "avatarTexture",
        avatarTexture
      }
    };
  },
  Video(videoTexture) {
    return {
      tex: {
        $case: "videoTexture",
        videoTexture
      }
    };
  }
};
function defineMaterialComponent(engine2) {
  const theComponent = Material(engine2);
  return {
    ...theComponent,
    Texture: TextureHelper,
    setBasicMaterial(entity, material) {
      theComponent.createOrReplace(entity, {
        material: {
          $case: "unlit",
          unlit: material
        }
      });
    },
    setPbrMaterial(entity, material) {
      theComponent.createOrReplace(entity, {
        material: {
          $case: "pbr",
          pbr: material
        }
      });
    }
  };
}

// node_modules/@dcl/ecs/dist/components/extended/MeshCollider.js
function defineMeshColliderComponent(engine2) {
  const theComponent = MeshCollider(engine2);
  function getCollisionMask(layers) {
    if (Array.isArray(layers)) {
      return layers.map((item) => item).reduce((prev, item) => prev | item, 0);
    } else if (layers) {
      return layers;
    }
  }
  return {
    ...theComponent,
    setBox(entity, colliderLayers) {
      theComponent.createOrReplace(entity, {
        mesh: { $case: "box", box: {} },
        collisionMask: getCollisionMask(colliderLayers)
      });
    },
    setPlane(entity, colliderLayers) {
      theComponent.createOrReplace(entity, {
        mesh: { $case: "plane", plane: {} },
        collisionMask: getCollisionMask(colliderLayers)
      });
    },
    setCylinder(entity, radiusBottom, radiusTop, colliderLayers) {
      theComponent.createOrReplace(entity, {
        mesh: { $case: "cylinder", cylinder: { radiusBottom, radiusTop } },
        collisionMask: getCollisionMask(colliderLayers)
      });
    },
    setSphere(entity, colliderLayers) {
      theComponent.createOrReplace(entity, {
        mesh: { $case: "sphere", sphere: {} },
        collisionMask: getCollisionMask(colliderLayers)
      });
    }
  };
}

// node_modules/@dcl/ecs/dist/components/extended/MeshRenderer.js
function defineMeshRendererComponent(engine2) {
  const theComponent = MeshRenderer(engine2);
  return {
    ...theComponent,
    setBox(entity, uvs) {
      theComponent.createOrReplace(entity, {
        mesh: { $case: "box", box: { uvs: uvs || [] } }
      });
    },
    setPlane(entity, uvs) {
      theComponent.createOrReplace(entity, {
        mesh: { $case: "plane", plane: { uvs: uvs || [] } }
      });
    },
    setCylinder(entity, radiusBottom, radiusTop) {
      theComponent.createOrReplace(entity, {
        mesh: { $case: "cylinder", cylinder: { radiusBottom, radiusTop } }
      });
    },
    setSphere(entity) {
      theComponent.createOrReplace(entity, {
        mesh: { $case: "sphere", sphere: {} }
      });
    }
  };
}

// node_modules/@dcl/ecs/dist/components/extended/Tween.js
var TweenHelper = {
  Move(move) {
    return {
      $case: "move",
      move
    };
  },
  Rotate(rotate) {
    return {
      $case: "rotate",
      rotate
    };
  },
  Scale(scale) {
    return {
      $case: "scale",
      scale
    };
  }
};
function defineTweenComponent(engine2) {
  const theComponent = Tween(engine2);
  return {
    ...theComponent,
    Mode: TweenHelper
  };
}

// node_modules/@dcl/ecs/dist/schemas/Array.js
var IArray = (type) => {
  return {
    serialize(value, builder) {
      builder.writeUint32(value.length);
      for (const item of value) {
        type.serialize(item, builder);
      }
    },
    deserialize(reader) {
      const newArray = [];
      const length2 = reader.readUint32();
      for (let index = 0; index < length2; index++) {
        newArray.push(type.deserialize(reader));
      }
      return newArray;
    },
    create() {
      return [];
    },
    jsonSchema: {
      type: "array",
      items: type.jsonSchema,
      serializationType: "array"
    }
  };
};

// node_modules/@dcl/ecs/dist/schemas/basic/Boolean.js
var Bool = {
  serialize(value, builder) {
    builder.writeInt8(value ? 1 : 0);
  },
  deserialize(reader) {
    return reader.readInt8() === 1;
  },
  create() {
    return false;
  },
  jsonSchema: {
    type: "boolean",
    serializationType: "boolean"
  }
};

// node_modules/@dcl/ecs/dist/schemas/basic/Integer.js
var Int64 = {
  serialize(value, builder) {
    builder.writeInt64(BigInt(value));
  },
  deserialize(reader) {
    return Number(reader.readInt64());
  },
  create() {
    return 0;
  },
  jsonSchema: {
    type: "integer",
    serializationType: "int64"
  }
};
var Int32 = {
  serialize(value, builder) {
    builder.writeInt32(value);
  },
  deserialize(reader) {
    return reader.readInt32();
  },
  create() {
    return 0;
  },
  jsonSchema: {
    type: "integer",
    serializationType: "int32"
  }
};
var Int16 = {
  serialize(value, builder) {
    builder.writeInt16(value);
  },
  deserialize(reader) {
    return reader.readInt16();
  },
  create() {
    return 0;
  },
  jsonSchema: {
    type: "integer",
    serializationType: "int16"
  }
};
var Int8 = {
  serialize(value, builder) {
    builder.writeInt8(value);
  },
  deserialize(reader) {
    return reader.readInt8();
  },
  create() {
    return 0;
  },
  jsonSchema: {
    type: "integer",
    serializationType: "int8"
  }
};

// node_modules/@dcl/ecs/dist/schemas/basic/String.js
var FlatString = {
  serialize(value, builder) {
    builder.writeUtf8String(value);
  },
  deserialize(reader) {
    return reader.readUtf8String();
  },
  create() {
    return "";
  },
  jsonSchema: {
    type: "string",
    serializationType: "utf8-string"
  }
};
var EcsString = FlatString;

// node_modules/@dcl/ecs/dist/schemas/basic/Enum.js
function validateMemberValuesAreNumbersAndInRangeInt32(enumValue) {
  const MIN_VALUE2 = -(2 ** 31), MAX_VALUE2 = 2 ** 31 - 1;
  let valueCount = 0, totalCount = 0;
  for (const key in enumValue) {
    if (typeof enumValue[key] === "number") {
      if (enumValue[key] > MAX_VALUE2 || enumValue[key] < MIN_VALUE2) {
        throw new Error(`Enum member values must be numbers within the range of ${MIN_VALUE2} to ${MAX_VALUE2}.`);
      }
      valueCount++;
    }
    totalCount++;
  }
  if (totalCount !== valueCount * 2) {
    throw new Error("All enum member values must be of numeric type.");
  }
}
function validateMemberValuesAreStrings(enumValue) {
  for (const key in enumValue) {
    if (typeof enumValue[key] !== "string") {
      throw new Error("All enum member values must be of string type.");
    }
  }
}
var IntEnumReflectionType = "enum-int";
var IntEnum = (enumObject, defaultValue) => {
  validateMemberValuesAreNumbersAndInRangeInt32(enumObject);
  return {
    serialize(value, builder) {
      Int32.serialize(value, builder);
    },
    deserialize(reader) {
      return Int32.deserialize(reader);
    },
    create() {
      return defaultValue;
    },
    jsonSchema: {
      // JSON-schema
      type: "integer",
      enum: Object.values(enumObject).filter((item) => Number.isInteger(item)),
      default: defaultValue,
      // @dcl/ecs Schema Spec
      serializationType: IntEnumReflectionType,
      enumObject
    }
  };
};
var StringEnumReflectionType = "enum-string";
var StringEnum = (enumObject, defaultValue) => {
  validateMemberValuesAreStrings(enumObject);
  return {
    serialize(value, builder) {
      FlatString.serialize(value, builder);
    },
    deserialize(reader) {
      return FlatString.deserialize(reader);
    },
    create() {
      return defaultValue;
    },
    jsonSchema: {
      // JSON-schema
      type: "string",
      enum: Object.values(enumObject),
      default: defaultValue,
      // @dcl/ecs Schema Spec
      serializationType: StringEnumReflectionType,
      enumObject
    }
  };
};

// node_modules/@dcl/ecs/dist/schemas/basic/Float.js
var Float32 = {
  serialize(value, builder) {
    builder.writeFloat32(value);
  },
  deserialize(reader) {
    return reader.readFloat32();
  },
  create() {
    return 0;
  },
  jsonSchema: {
    type: "number",
    serializationType: "float32"
  }
};
var Float64 = {
  serialize(value, builder) {
    builder.writeFloat64(value);
  },
  deserialize(reader) {
    return reader.readFloat64();
  },
  create() {
    return 0;
  },
  jsonSchema: {
    type: "number",
    serializationType: "float64"
  }
};

// node_modules/@dcl/ecs/dist/schemas/custom/Color3.js
var Color3Schema = {
  serialize(value, builder) {
    builder.writeFloat32(value.r);
    builder.writeFloat32(value.g);
    builder.writeFloat32(value.b);
  },
  deserialize(reader) {
    return {
      r: reader.readFloat32(),
      g: reader.readFloat32(),
      b: reader.readFloat32()
    };
  },
  create() {
    return { r: 0, g: 0, b: 0 };
  },
  jsonSchema: {
    type: "object",
    properties: {
      r: { type: "number" },
      g: { type: "number" },
      b: { type: "number" }
    },
    serializationType: "color3"
  }
};

// node_modules/@dcl/ecs/dist/schemas/custom/Color4.js
var Color4Schema = {
  serialize(value, builder) {
    builder.writeFloat32(value.r);
    builder.writeFloat32(value.g);
    builder.writeFloat32(value.b);
    builder.writeFloat32(value.a);
  },
  deserialize(reader) {
    return {
      r: reader.readFloat32(),
      g: reader.readFloat32(),
      b: reader.readFloat32(),
      a: reader.readFloat32()
    };
  },
  create() {
    return { r: 0, g: 0, b: 0, a: 0 };
  },
  jsonSchema: {
    type: "object",
    properties: {
      r: { type: "number" },
      g: { type: "number" },
      b: { type: "number" },
      a: { type: "number" }
    },
    serializationType: "color4"
  }
};

// node_modules/@dcl/ecs/dist/schemas/custom/Entity.js
var EntitySchema = {
  serialize(value, builder) {
    builder.writeInt32(value);
  },
  deserialize(reader) {
    return reader.readInt32();
  },
  create() {
    return 0;
  },
  jsonSchema: {
    type: "integer",
    serializationType: "entity"
  }
};

// node_modules/@dcl/ecs/dist/schemas/custom/Quaternion.js
var QuaternionSchema = {
  serialize(value, builder) {
    builder.writeFloat32(value.x);
    builder.writeFloat32(value.y);
    builder.writeFloat32(value.z);
    builder.writeFloat32(value.w);
  },
  deserialize(reader) {
    return {
      x: reader.readFloat32(),
      y: reader.readFloat32(),
      z: reader.readFloat32(),
      w: reader.readFloat32()
    };
  },
  create() {
    return { x: 0, y: 0, z: 0, w: 0 };
  },
  jsonSchema: {
    type: "object",
    properties: {
      x: { type: "number" },
      y: { type: "number" },
      z: { type: "number" },
      w: { type: "number" }
    },
    serializationType: "quaternion"
  }
};

// node_modules/@dcl/ecs/dist/schemas/custom/Vector3.js
var Vector3Schema = {
  serialize(value, builder) {
    builder.writeFloat32(value.x);
    builder.writeFloat32(value.y);
    builder.writeFloat32(value.z);
  },
  deserialize(reader) {
    return {
      x: reader.readFloat32(),
      y: reader.readFloat32(),
      z: reader.readFloat32()
    };
  },
  create() {
    return { x: 0, y: 0, z: 0 };
  },
  jsonSchema: {
    type: "object",
    properties: {
      x: { type: "number" },
      y: { type: "number" },
      z: { type: "number" },
      w: { type: "number" }
    },
    serializationType: "vector3"
  }
};

// node_modules/@dcl/ecs/dist/schemas/Map.js
var IMap = (spec, defaultValue) => {
  const specReflection = Object.keys(spec).reduce((specReflection2, currentKey) => {
    specReflection2[currentKey] = spec[currentKey].jsonSchema;
    return specReflection2;
  }, {});
  return {
    serialize(value, builder) {
      for (const key in spec) {
        spec[key].serialize(value[key], builder);
      }
    },
    deserialize(reader) {
      const newValue = {};
      for (const key in spec) {
        ;
        newValue[key] = spec[key].deserialize(reader);
      }
      return newValue;
    },
    create() {
      const newValue = {};
      for (const key in spec) {
        ;
        newValue[key] = spec[key].create();
      }
      return { ...newValue, ...defaultValue };
    },
    extend: (base) => {
      const newValue = {};
      for (const key in spec) {
        ;
        newValue[key] = spec[key].create();
      }
      return { ...newValue, ...defaultValue, ...base };
    },
    jsonSchema: {
      type: "object",
      properties: specReflection,
      serializationType: "map"
    }
  };
};

// node_modules/@dcl/ecs/dist/schemas/Optional.js
var IOptional = (spec) => {
  return {
    serialize(value, builder) {
      if (value) {
        builder.writeInt8(1);
        spec.serialize(value, builder);
      } else {
        builder.writeInt8(0);
      }
    },
    deserialize(reader) {
      const exists = reader.readInt8();
      if (exists) {
        return spec.deserialize(reader);
      }
    },
    create() {
      return void 0;
    },
    jsonSchema: {
      type: spec.jsonSchema.type,
      serializationType: "optional",
      optionalJsonSchema: spec.jsonSchema
    }
  };
};

// node_modules/@dcl/ecs/dist/schemas/OneOf.js
var IOneOf = (specs) => {
  const specKeys = Object.keys(specs);
  const keyToIndex = specKeys.reduce((dict, key, index) => {
    dict[key] = index;
    return dict;
  }, {});
  const specReflection = specKeys.reduce((specReflection2, currentKey) => {
    specReflection2[currentKey] = specs[currentKey].jsonSchema;
    return specReflection2;
  }, {});
  return {
    serialize({ $case, value }, builder) {
      const _value = keyToIndex[$case.toString()] + 1;
      builder.writeUint8(_value);
      specs[$case].serialize(value, builder);
    },
    deserialize(reader) {
      const $case = specKeys[reader.readInt8() - 1];
      const value = specs[$case].deserialize(reader);
      return { $case, value };
    },
    create() {
      return {};
    },
    jsonSchema: {
      type: "object",
      properties: specReflection,
      serializationType: "one-of"
    }
  };
};

// node_modules/@dcl/ecs/dist/schemas/buildSchema/utils.js
var isSchemaType = (value, types) => types.includes(value.serializationType);
var isOneOfJsonSchema = (type) => isSchemaType(type, ["one-of"]);
var getUnknownSchema = () => ({
  type: { type: "object", serializationType: "unknown" },
  value: void 0
});
var isCompoundType = (type) => isSchemaType(type, ["array", "map"]);
var getTypeAndValue = (properties, value, key) => {
  const type = properties[key];
  const valueKey = value[key];
  if (isOneOfJsonSchema(type)) {
    const typedMapValue = valueKey;
    if (!typedMapValue.$case)
      return getUnknownSchema();
    const propType = type.properties[typedMapValue.$case];
    if (isCompoundType(propType))
      value[key] = { [typedMapValue.$case]: typedMapValue.value };
    return { type: propType, value: typedMapValue.value };
  }
  return { type, value: valueKey };
};

// node_modules/@dcl/ecs/dist/schemas/buildSchema/index.js
var primitiveSchemas = {
  [Bool.jsonSchema.serializationType]: Bool,
  [EcsString.jsonSchema.serializationType]: EcsString,
  [Float32.jsonSchema.serializationType]: Float32,
  [Float64.jsonSchema.serializationType]: Float64,
  [Int8.jsonSchema.serializationType]: Int8,
  [Int16.jsonSchema.serializationType]: Int16,
  [Int32.jsonSchema.serializationType]: Int32,
  [Int64.jsonSchema.serializationType]: Int64,
  [Vector3Schema.jsonSchema.serializationType]: Vector3Schema,
  [QuaternionSchema.jsonSchema.serializationType]: QuaternionSchema,
  [Color3Schema.jsonSchema.serializationType]: Color3Schema,
  [Color4Schema.jsonSchema.serializationType]: Color4Schema,
  [EntitySchema.jsonSchema.serializationType]: EntitySchema
};
function jsonSchemaToSchema(jsonSchema) {
  if (primitiveSchemas[jsonSchema.serializationType]) {
    return primitiveSchemas[jsonSchema.serializationType];
  }
  if (jsonSchema.serializationType === "map") {
    const mapJsonSchema = jsonSchema;
    const spec = {};
    for (const key in mapJsonSchema.properties) {
      spec[key] = jsonSchemaToSchema(mapJsonSchema.properties[key]);
    }
    return IMap(spec);
  }
  if (jsonSchema.serializationType === "optional") {
    const withItemsJsonSchema = jsonSchema;
    return IOptional(jsonSchemaToSchema(withItemsJsonSchema.optionalJsonSchema));
  }
  if (jsonSchema.serializationType === "array") {
    const withItemsJsonSchema = jsonSchema;
    return IArray(jsonSchemaToSchema(withItemsJsonSchema.items));
  }
  if (jsonSchema.serializationType === "enum-int") {
    const enumJsonSchema = jsonSchema;
    return IntEnum(enumJsonSchema.enumObject, enumJsonSchema.default);
  }
  if (jsonSchema.serializationType === "enum-string") {
    const enumJsonSchema = jsonSchema;
    return StringEnum(enumJsonSchema.enumObject, enumJsonSchema.default);
  }
  if (jsonSchema.serializationType === "one-of") {
    const oneOfJsonSchema = jsonSchema;
    const spec = {};
    for (const key in oneOfJsonSchema.properties) {
      spec[key] = jsonSchemaToSchema(oneOfJsonSchema.properties[key]);
    }
    return IOneOf(spec);
  }
  throw new Error(`${jsonSchema.serializationType} is not supported as reverse schema generation.`);
}
function mutateValues(jsonSchema, value, mutateFn) {
  if (jsonSchema.serializationType === "map") {
    const { properties } = jsonSchema;
    const typedValue = value;
    for (const key in properties) {
      const { type, value: mapValue } = getTypeAndValue(properties, typedValue, key);
      if (type.serializationType === "unknown")
        continue;
      if (isCompoundType(type)) {
        mutateValues(type, mapValue, mutateFn);
      } else {
        const newValue = mutateFn(mapValue, type);
        if (newValue.changed) {
          typedValue[key] = newValue.value;
        }
      }
    }
  } else if (jsonSchema.serializationType === "array") {
    const { items } = jsonSchema;
    const arrayValue = value;
    for (let i = 0, n = arrayValue.length; i < n; i++) {
      const { type, value: value2 } = getTypeAndValue({ items }, { items: arrayValue[i] }, "items");
      if (isCompoundType(type)) {
        mutateValues(type, value2, mutateFn);
      } else {
        const newValue = mutateFn(value2, type);
        if (newValue.changed) {
          arrayValue[i] = newValue.value;
        }
      }
    }
  }
}

// node_modules/@dcl/ecs/dist/schemas/index.js
var Schemas;
(function(Schemas2) {
  Schemas2.Boolean = Bool;
  Schemas2.String = EcsString;
  Schemas2.Float = Float32;
  Schemas2.Double = Float64;
  Schemas2.Byte = Int8;
  Schemas2.Short = Int16;
  Schemas2.Int = Int32;
  Schemas2.Int64 = Int64;
  Schemas2.Number = Float32;
  Schemas2.Vector3 = Vector3Schema;
  Schemas2.Quaternion = QuaternionSchema;
  Schemas2.Color3 = Color3Schema;
  Schemas2.Color4 = Color4Schema;
  Schemas2.Entity = EntitySchema;
  Schemas2.EnumNumber = IntEnum;
  Schemas2.EnumString = StringEnum;
  Schemas2.Array = IArray;
  Schemas2.Map = IMap;
  Schemas2.Optional = IOptional;
  Schemas2.OneOf = IOneOf;
  Schemas2.fromJson = jsonSchemaToSchema;
  Schemas2.mutateNestedValues = mutateValues;
})(Schemas || (Schemas = {}));

// node_modules/@dcl/ecs/dist/components/manual/Name.js
function defineNameComponent(engine2) {
  const Name3 = engine2.defineComponent("core-schema::Name", {
    value: Schemas.String
  });
  return Name3;
}
var Name_default = defineNameComponent;

// node_modules/@dcl/ecs/dist/components/manual/SyncComponents.js
function defineSyncComponents(engine2) {
  const SyncComponents3 = engine2.defineComponent("core-schema::Sync-Components", {
    componentIds: Schemas.Array(Schemas.Int64)
  });
  return SyncComponents3;
}
var SyncComponents_default = defineSyncComponents;

// node_modules/@dcl/ecs/dist/components/manual/NetworkEntity.js
function defineNetworkEntityComponent(engine2) {
  const EntityNetwork = engine2.defineComponent("core-schema::Network-Entity", {
    networkId: Schemas.Int64,
    entityId: Schemas.Entity
  });
  return EntityNetwork;
}
var NetworkEntity_default = defineNetworkEntityComponent;

// node_modules/@dcl/ecs/dist/components/manual/NetworkParent.js
function defineNetworkParentComponent(engine2) {
  const EntityNetwork = engine2.defineComponent("core-schema::Network-Parent", {
    networkId: Schemas.Int64,
    entityId: Schemas.Entity
  });
  return EntityNetwork;
}
var NetworkParent_default = defineNetworkParentComponent;

// node_modules/@dcl/ecs/dist/components/manual/Transform.js
var TRANSFORM_LENGTH = 44;
var TransformSchema = {
  serialize(value, builder) {
    const ptr = builder.incrementWriteOffset(TRANSFORM_LENGTH);
    builder.setFloat32(ptr, value.position.x);
    builder.setFloat32(ptr + 4, value.position.y);
    builder.setFloat32(ptr + 8, value.position.z);
    builder.setFloat32(ptr + 12, value.rotation.x);
    builder.setFloat32(ptr + 16, value.rotation.y);
    builder.setFloat32(ptr + 20, value.rotation.z);
    builder.setFloat32(ptr + 24, value.rotation.w);
    builder.setFloat32(ptr + 28, value.scale.x);
    builder.setFloat32(ptr + 32, value.scale.y);
    builder.setFloat32(ptr + 36, value.scale.z);
    builder.setUint32(ptr + 40, value.parent || 0);
  },
  deserialize(reader) {
    const ptr = reader.incrementReadOffset(TRANSFORM_LENGTH);
    return {
      position: {
        x: reader.getFloat32(ptr),
        y: reader.getFloat32(ptr + 4),
        z: reader.getFloat32(ptr + 8)
      },
      rotation: {
        x: reader.getFloat32(ptr + 12),
        y: reader.getFloat32(ptr + 16),
        z: reader.getFloat32(ptr + 20),
        w: reader.getFloat32(ptr + 24)
      },
      scale: {
        x: reader.getFloat32(ptr + 28),
        y: reader.getFloat32(ptr + 32),
        z: reader.getFloat32(ptr + 36)
      },
      parent: reader.getUint32(ptr + 40)
    };
  },
  create() {
    return {
      position: { x: 0, y: 0, z: 0 },
      scale: { x: 1, y: 1, z: 1 },
      rotation: { x: 0, y: 0, z: 0, w: 1 },
      parent: 0
    };
  },
  extend(value) {
    return {
      position: { x: 0, y: 0, z: 0 },
      scale: { x: 1, y: 1, z: 1 },
      rotation: { x: 0, y: 0, z: 0, w: 1 },
      parent: 0,
      ...value
    };
  },
  jsonSchema: {
    type: "object",
    properties: {
      position: {
        type: "object",
        properties: {
          x: { type: "number" },
          y: { type: "number" },
          z: { type: "number" }
        }
      },
      scale: {
        type: "object",
        properties: {
          x: { type: "number" },
          y: { type: "number" },
          z: { type: "number" }
        }
      },
      rotation: {
        type: "object",
        properties: {
          x: { type: "number" },
          y: { type: "number" },
          z: { type: "number" },
          w: { type: "number" }
        }
      },
      parent: { type: "integer" }
    },
    serializationType: "transform"
  }
};
function defineTransformComponent(engine2) {
  const transformDef = engine2.defineComponentFromSchema("core::Transform", TransformSchema);
  return {
    ...transformDef,
    create(entity, val) {
      return transformDef.create(entity, TransformSchema.extend(val));
    },
    createOrReplace(entity, val) {
      return transformDef.createOrReplace(entity, TransformSchema.extend(val));
    }
  };
}

// node_modules/@dcl/ecs/dist/components/extended/AudioStream.js
function defineAudioStreamComponent(engine2) {
  const theComponent = AudioStream(engine2);
  const AudioEvent3 = AudioEvent(engine2);
  return {
    ...theComponent,
    getAudioState(entity) {
      const AudioStream4 = theComponent.getMutableOrNull(entity);
      if (!AudioStream4 || !AudioEvent3.has(entity))
        return void 0;
      const lastEvent = Array.from(AudioEvent3.get(entity)).pop();
      return lastEvent;
    }
  };
}

// node_modules/@dcl/ecs/dist/components/generated/pb/decentraland/sdk/components/common/media_state.gen.js
var MediaState;
(function(MediaState2) {
  MediaState2[MediaState2["MS_NONE"] = 0] = "MS_NONE";
  MediaState2[MediaState2["MS_ERROR"] = 1] = "MS_ERROR";
  MediaState2[MediaState2["MS_LOADING"] = 2] = "MS_LOADING";
  MediaState2[MediaState2["MS_READY"] = 3] = "MS_READY";
  MediaState2[MediaState2["MS_PLAYING"] = 4] = "MS_PLAYING";
  MediaState2[MediaState2["MS_BUFFERING"] = 5] = "MS_BUFFERING";
  MediaState2[MediaState2["MS_SEEKING"] = 6] = "MS_SEEKING";
  MediaState2[MediaState2["MS_PAUSED"] = 7] = "MS_PAUSED";
})(MediaState || (MediaState = {}));

// node_modules/@dcl/ecs/dist/components/index.js
var Transform = (engine2) => defineTransformComponent(engine2);
var Material2 = (engine2) => defineMaterialComponent(engine2);
var Animator2 = (engine2) => defineAnimatorComponent(engine2);
var AudioSource2 = (engine2) => defineAudioSourceComponent(engine2);
var AudioStream2 = (engine2) => defineAudioStreamComponent(engine2);
var MeshRenderer2 = (engine2) => defineMeshRendererComponent(engine2);
var MeshCollider2 = (engine2) => defineMeshColliderComponent(engine2);
var Tween2 = (engine2) => defineTweenComponent(engine2);
var Name = (engine2) => Name_default(engine2);
var SyncComponents = (engine2) => SyncComponents_default(engine2);
var NetworkEntity = (engine2) => NetworkEntity_default(engine2);
var NetworkParent = (engine2) => NetworkParent_default(engine2);

// node_modules/@dcl/ecs/dist/components/generated/component-names.gen.js
var coreComponentMappings = {
  "core::Transform": 1,
  "core::Animator": 1042,
  "core::AudioEvent": 1105,
  "core::AudioSource": 1020,
  "core::AudioStream": 1021,
  "core::AvatarAttach": 1073,
  "core::AvatarBase": 1087,
  "core::AvatarEmoteCommand": 1088,
  "core::AvatarEquippedData": 1091,
  "core::AvatarModifierArea": 1070,
  "core::AvatarShape": 1080,
  "core::Billboard": 1090,
  "core::CameraMode": 1072,
  "core::CameraModeArea": 1071,
  "core::EngineInfo": 1048,
  "core::GltfContainer": 1041,
  "core::GltfContainerLoadingState": 1049,
  "core::InputModifier": 1078,
  "core::MainCamera": 1075,
  "core::MapPin": 1097,
  "core::Material": 1017,
  "core::MeshCollider": 1019,
  "core::MeshRenderer": 1018,
  "core::NftShape": 1040,
  "core::PlayerIdentityData": 1089,
  "core::PointerEvents": 1062,
  "core::PointerEventsResult": 1063,
  "core::PointerLock": 1074,
  "core::Raycast": 1067,
  "core::RaycastResult": 1068,
  "core::RealmInfo": 1106,
  "core::TextShape": 1030,
  "core::Tween": 1102,
  "core::TweenSequence": 1104,
  "core::TweenState": 1103,
  "core::UiBackground": 1053,
  "core::UiCanvasInformation": 1054,
  "core::UiDropdown": 1094,
  "core::UiDropdownResult": 1096,
  "core::UiInput": 1093,
  "core::UiInputResult": 1095,
  "core::UiText": 1052,
  "core::UiTransform": 1050,
  "core::VideoEvent": 1044,
  "core::VideoPlayer": 1043,
  "core::VirtualCamera": 1076,
  "core::VisibilityComponent": 1081
};

// node_modules/@dcl/ecs/dist/components/component-number.js
var utf8 = __toESM(require_utf8());

// node_modules/@dcl/ecs/dist/runtime/crc.js
var CRC_TABLE = new Int32Array([
  0,
  1996959894,
  3993919788,
  2567524794,
  124634137,
  1886057615,
  3915621685,
  2657392035,
  249268274,
  2044508324,
  3772115230,
  2547177864,
  162941995,
  2125561021,
  3887607047,
  2428444049,
  498536548,
  1789927666,
  4089016648,
  2227061214,
  450548861,
  1843258603,
  4107580753,
  2211677639,
  325883990,
  1684777152,
  4251122042,
  2321926636,
  335633487,
  1661365465,
  4195302755,
  2366115317,
  997073096,
  1281953886,
  3579855332,
  2724688242,
  1006888145,
  1258607687,
  3524101629,
  2768942443,
  901097722,
  1119000684,
  3686517206,
  2898065728,
  853044451,
  1172266101,
  3705015759,
  2882616665,
  651767980,
  1373503546,
  3369554304,
  3218104598,
  565507253,
  1454621731,
  3485111705,
  3099436303,
  671266974,
  1594198024,
  3322730930,
  2970347812,
  795835527,
  1483230225,
  3244367275,
  3060149565,
  1994146192,
  31158534,
  2563907772,
  4023717930,
  1907459465,
  112637215,
  2680153253,
  3904427059,
  2013776290,
  251722036,
  2517215374,
  3775830040,
  2137656763,
  141376813,
  2439277719,
  3865271297,
  1802195444,
  476864866,
  2238001368,
  4066508878,
  1812370925,
  453092731,
  2181625025,
  4111451223,
  1706088902,
  314042704,
  2344532202,
  4240017532,
  1658658271,
  366619977,
  2362670323,
  4224994405,
  1303535960,
  984961486,
  2747007092,
  3569037538,
  1256170817,
  1037604311,
  2765210733,
  3554079995,
  1131014506,
  879679996,
  2909243462,
  3663771856,
  1141124467,
  855842277,
  2852801631,
  3708648649,
  1342533948,
  654459306,
  3188396048,
  3373015174,
  1466479909,
  544179635,
  3110523913,
  3462522015,
  1591671054,
  702138776,
  2966460450,
  3352799412,
  1504918807,
  783551873,
  3082640443,
  3233442989,
  3988292384,
  2596254646,
  62317068,
  1957810842,
  3939845945,
  2647816111,
  81470997,
  1943803523,
  3814918930,
  2489596804,
  225274430,
  2053790376,
  3826175755,
  2466906013,
  167816743,
  2097651377,
  4027552580,
  2265490386,
  503444072,
  1762050814,
  4150417245,
  2154129355,
  426522225,
  1852507879,
  4275313526,
  2312317920,
  282753626,
  1742555852,
  4189708143,
  2394877945,
  397917763,
  1622183637,
  3604390888,
  2714866558,
  953729732,
  1340076626,
  3518719985,
  2797360999,
  1068828381,
  1219638859,
  3624741850,
  2936675148,
  906185462,
  1090812512,
  3747672003,
  2825379669,
  829329135,
  1181335161,
  3412177804,
  3160834842,
  628085408,
  1382605366,
  3423369109,
  3138078467,
  570562233,
  1426400815,
  3317316542,
  2998733608,
  733239954,
  1555261956,
  3268935591,
  3050360625,
  752459403,
  1541320221,
  2607071920,
  3965973030,
  1969922972,
  40735498,
  2617837225,
  3943577151,
  1913087877,
  83908371,
  2512341634,
  3803740692,
  2075208622,
  213261112,
  2463272603,
  3855990285,
  2094854071,
  198958881,
  2262029012,
  4057260610,
  1759359992,
  534414190,
  2176718541,
  4139329115,
  1873836001,
  414664567,
  2282248934,
  4279200368,
  1711684554,
  285281116,
  2405801727,
  4167216745,
  1634467795,
  376229701,
  2685067896,
  3608007406,
  1308918612,
  956543938,
  2808555105,
  3495958263,
  1231636301,
  1047427035,
  2932959818,
  3654703836,
  1088359270,
  936918e3,
  2847714899,
  3736837829,
  1202900863,
  817233897,
  3183342108,
  3401237130,
  1404277552,
  615818150,
  3134207493,
  3453421203,
  1423857449,
  601450431,
  3009837614,
  3294710456,
  1567103746,
  711928724,
  3020668471,
  3272380065,
  1510334235,
  755167117
]);
function _crc32(buf, previous) {
  let crc = ~~previous ^ -1;
  for (let n = 0; n < buf.length; n++) {
    crc = CRC_TABLE[(crc ^ buf[n]) & 255] ^ crc >>> 8;
  }
  return crc ^ -1;
}
function unsignedCRC32(data, prev = 0) {
  return _crc32(data, prev) >>> 0;
}

// node_modules/@dcl/ecs/dist/components/component-number.js
var MAX_STATIC_COMPONENT = 1 << 11;
function componentNumberFromName(componentName) {
  if (coreComponentMappings[componentName])
    return coreComponentMappings[componentName];
  const bytes = new Uint8Array(128);
  utf8.write(componentName, bytes, 0);
  return (unsignedCRC32(bytes) + MAX_STATIC_COMPONENT & 4294967295) >>> 0;
}

// node_modules/@dcl/ecs/dist/runtime/invariant.js
var __DEV__ = true;
function checkNotThenable(t, error) {
  if (__DEV__) {
    if (t && typeof t === "object" && typeof t.then === "function") {
      throw new Error(error);
    }
  }
  return t;
}

// node_modules/@dcl/ecs/dist/systems/crdt/gset.js
function createVersionGSet() {
  const lastVersion = /* @__PURE__ */ new Map();
  return {
    /**
     *
     * @param number
     * @param version
     * @returns
     */
    addTo(number, version) {
      if (version < 0) {
        return false;
      }
      const currentValue = lastVersion.get(number);
      if (currentValue !== void 0 && currentValue >= version) {
        return true;
      }
      lastVersion.set(number, version);
      return true;
    },
    /**
     * @returns the set with [number, version] of each value
     */
    has(n, v) {
      const currentValue = lastVersion.get(n);
      if (currentValue !== void 0 && currentValue >= v) {
        return true;
      }
      return false;
    },
    /**
     * Warning: this function returns the reference to the internal map,
     *  if you need to mutate some value, make a copy.
     * For optimization purpose the copy isn't made here.
     *
     * @returns the map of number to version
     */
    getMap() {
      return lastVersion;
    }
  };
}

// node_modules/@dcl/ecs/dist/engine/entity.js
var MAX_U16 = 65535;
var MASK_UPPER_16_ON_32 = 4294901760;
var AMOUNT_VERSION_AVAILABLE = MAX_U16 + 1;
var MAX_ENTITY_NUMBER = MAX_U16;
var RESERVED_STATIC_ENTITIES = 512;
var EntityUtils;
(function(EntityUtils2) {
  function fromEntityId(entityId) {
    return [(entityId & MAX_U16) >>> 0, ((entityId & MASK_UPPER_16_ON_32) >> 16 & MAX_U16) >>> 0];
  }
  EntityUtils2.fromEntityId = fromEntityId;
  function toEntityId(entityNumber, entityVersion) {
    return (entityNumber & MAX_U16 | (entityVersion & MAX_U16) << 16) >>> 0;
  }
  EntityUtils2.toEntityId = toEntityId;
})(EntityUtils || (EntityUtils = {}));
var EntityState;
(function(EntityState2) {
  EntityState2[EntityState2["Unknown"] = 0] = "Unknown";
  EntityState2[EntityState2["UsedEntity"] = 1] = "UsedEntity";
  EntityState2[EntityState2["Removed"] = 2] = "Removed";
  EntityState2[EntityState2["Reserved"] = 3] = "Reserved";
})(EntityState || (EntityState = {}));
function createEntityContainer(opts) {
  const reservedStaticEntities = opts?.reservedStaticEntities ?? RESERVED_STATIC_ENTITIES;
  let entityCounter = reservedStaticEntities;
  const usedEntities = /* @__PURE__ */ new Set();
  let toRemoveEntities = [];
  const removedEntities = createVersionGSet();
  function generateNewEntity() {
    if (entityCounter > MAX_ENTITY_NUMBER - 1) {
      throw new Error(`It fails trying to generate an entity out of range ${MAX_ENTITY_NUMBER}.`);
    }
    const entityNumber = entityCounter++;
    const entityVersion = removedEntities.getMap().has(entityNumber) ? removedEntities.getMap().get(entityNumber) + 1 : 0;
    const entity = EntityUtils.toEntityId(entityNumber, entityVersion);
    if (usedEntities.has(entity)) {
      return generateNewEntity();
    }
    usedEntities.add(entity);
    return entity;
  }
  function generateEntity() {
    const usedSize = usedEntities.size;
    if (usedSize + reservedStaticEntities >= entityCounter) {
      return generateNewEntity();
    }
    for (const [number, version] of removedEntities.getMap()) {
      if (version < MAX_U16) {
        const entity = EntityUtils.toEntityId(number, version + 1);
        if (!usedEntities.has(entity) && !toRemoveEntities.includes(entity)) {
          usedEntities.add(entity);
          return entity;
        }
      }
    }
    return generateNewEntity();
  }
  function removeEntity(entity) {
    if (entity < reservedStaticEntities)
      return false;
    if (usedEntities.has(entity)) {
      usedEntities.delete(entity);
      toRemoveEntities.push(entity);
    } else {
      updateRemovedEntity(entity);
    }
    return true;
  }
  function releaseRemovedEntities() {
    const arr = toRemoveEntities;
    if (arr.length) {
      toRemoveEntities = [];
      for (const entity of arr) {
        const [n, v] = EntityUtils.fromEntityId(entity);
        removedEntities.addTo(n, v);
      }
    }
    return arr;
  }
  function updateRemovedEntity(entity) {
    const [n, v] = EntityUtils.fromEntityId(entity);
    removedEntities.addTo(n, v);
    for (let i = 0; i <= v; i++) {
      usedEntities.delete(EntityUtils.toEntityId(n, i));
    }
    return true;
  }
  function updateUsedEntity(entity) {
    const [n, v] = EntityUtils.fromEntityId(entity);
    if (removedEntities.has(n, v))
      return false;
    if (v > 0) {
      for (let i = 0; i <= v - 1; i++) {
        usedEntities.delete(EntityUtils.toEntityId(n, i));
      }
      removedEntities.addTo(n, v - 1);
    }
    usedEntities.add(entity);
    return true;
  }
  function getEntityState(entity) {
    const [n, v] = EntityUtils.fromEntityId(entity);
    if (n < reservedStaticEntities) {
      return EntityState.Reserved;
    }
    if (usedEntities.has(entity)) {
      return EntityState.UsedEntity;
    }
    const removedVersion = removedEntities.getMap().get(n);
    if (removedVersion !== void 0 && removedVersion >= v) {
      return EntityState.Removed;
    }
    return EntityState.Unknown;
  }
  return {
    generateEntity,
    removeEntity,
    getExistingEntities() {
      return new Set(usedEntities);
    },
    getEntityState,
    releaseRemovedEntities,
    updateRemovedEntity,
    updateUsedEntity
  };
}

// node_modules/@dcl/ecs/dist/serialization/ByteBuffer/index.js
var utf82 = __toESM(require_utf8());
var __classPrivateFieldGet = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ReadWriteByteBuffer_instances;
var _ReadWriteByteBuffer_woAdd;
var _ReadWriteByteBuffer_roAdd;
function getNextSize(currentSize, intendedSize) {
  const minNewSize = Math.max(currentSize, intendedSize) + 1024;
  return Math.ceil(minNewSize / 1024) * 1024;
}
var defaultInitialCapacity = 10240;
var ReadWriteByteBuffer = class {
  /**
   * @param buffer - The initial buffer, provide a buffer if you need to set "initial capacity"
   * @param readingOffset - Set the cursor where begins to read. Default 0
   * @param writingOffset - Set the cursor to not start writing from the begin of it. Defaults to the buffer size
   */
  constructor(buffer2, readingOffset, writingOffset) {
    _ReadWriteByteBuffer_instances.add(this);
    this._buffer = buffer2 || new Uint8Array(defaultInitialCapacity);
    this.view = new DataView(this._buffer.buffer, this._buffer.byteOffset);
    this.woffset = writingOffset ?? (buffer2 ? this._buffer.length : null) ?? 0;
    this.roffset = readingOffset ?? 0;
  }
  buffer() {
    return this._buffer;
  }
  bufferLength() {
    return this._buffer.length;
  }
  resetBuffer() {
    this.roffset = 0;
    this.woffset = 0;
  }
  currentReadOffset() {
    return this.roffset;
  }
  currentWriteOffset() {
    return this.woffset;
  }
  incrementReadOffset(amount) {
    return __classPrivateFieldGet(this, _ReadWriteByteBuffer_instances, "m", _ReadWriteByteBuffer_roAdd).call(this, amount);
  }
  remainingBytes() {
    return this.woffset - this.roffset;
  }
  readFloat32() {
    return this.view.getFloat32(__classPrivateFieldGet(this, _ReadWriteByteBuffer_instances, "m", _ReadWriteByteBuffer_roAdd).call(this, 4), true);
  }
  readFloat64() {
    return this.view.getFloat64(__classPrivateFieldGet(this, _ReadWriteByteBuffer_instances, "m", _ReadWriteByteBuffer_roAdd).call(this, 8), true);
  }
  readInt8() {
    return this.view.getInt8(__classPrivateFieldGet(this, _ReadWriteByteBuffer_instances, "m", _ReadWriteByteBuffer_roAdd).call(this, 1));
  }
  readInt16() {
    return this.view.getInt16(__classPrivateFieldGet(this, _ReadWriteByteBuffer_instances, "m", _ReadWriteByteBuffer_roAdd).call(this, 2), true);
  }
  readInt32() {
    return this.view.getInt32(__classPrivateFieldGet(this, _ReadWriteByteBuffer_instances, "m", _ReadWriteByteBuffer_roAdd).call(this, 4), true);
  }
  readInt64() {
    return this.view.getBigInt64(__classPrivateFieldGet(this, _ReadWriteByteBuffer_instances, "m", _ReadWriteByteBuffer_roAdd).call(this, 8), true);
  }
  readUint8() {
    return this.view.getUint8(__classPrivateFieldGet(this, _ReadWriteByteBuffer_instances, "m", _ReadWriteByteBuffer_roAdd).call(this, 1));
  }
  readUint16() {
    return this.view.getUint16(__classPrivateFieldGet(this, _ReadWriteByteBuffer_instances, "m", _ReadWriteByteBuffer_roAdd).call(this, 2), true);
  }
  readUint32() {
    return this.view.getUint32(__classPrivateFieldGet(this, _ReadWriteByteBuffer_instances, "m", _ReadWriteByteBuffer_roAdd).call(this, 4), true);
  }
  readUint64() {
    return this.view.getBigUint64(__classPrivateFieldGet(this, _ReadWriteByteBuffer_instances, "m", _ReadWriteByteBuffer_roAdd).call(this, 8), true);
  }
  readBuffer() {
    const length2 = this.view.getUint32(__classPrivateFieldGet(this, _ReadWriteByteBuffer_instances, "m", _ReadWriteByteBuffer_roAdd).call(this, 4), true);
    return this._buffer.subarray(__classPrivateFieldGet(this, _ReadWriteByteBuffer_instances, "m", _ReadWriteByteBuffer_roAdd).call(this, length2), __classPrivateFieldGet(this, _ReadWriteByteBuffer_instances, "m", _ReadWriteByteBuffer_roAdd).call(this, 0));
  }
  readUtf8String() {
    const length2 = this.view.getUint32(__classPrivateFieldGet(this, _ReadWriteByteBuffer_instances, "m", _ReadWriteByteBuffer_roAdd).call(this, 4), true);
    return utf82.read(this._buffer, __classPrivateFieldGet(this, _ReadWriteByteBuffer_instances, "m", _ReadWriteByteBuffer_roAdd).call(this, length2), __classPrivateFieldGet(this, _ReadWriteByteBuffer_instances, "m", _ReadWriteByteBuffer_roAdd).call(this, 0));
  }
  incrementWriteOffset(amount) {
    return __classPrivateFieldGet(this, _ReadWriteByteBuffer_instances, "m", _ReadWriteByteBuffer_woAdd).call(this, amount);
  }
  toBinary() {
    return this._buffer.subarray(0, this.woffset);
  }
  toCopiedBinary() {
    return new Uint8Array(this.toBinary());
  }
  writeBuffer(value, writeLength = true) {
    if (writeLength) {
      this.writeUint32(value.byteLength);
    }
    const o = __classPrivateFieldGet(this, _ReadWriteByteBuffer_instances, "m", _ReadWriteByteBuffer_woAdd).call(this, value.byteLength);
    this._buffer.set(value, o);
  }
  writeUtf8String(value, writeLength = true) {
    const byteLength = utf82.length(value);
    if (writeLength) {
      this.writeUint32(byteLength);
    }
    const o = __classPrivateFieldGet(this, _ReadWriteByteBuffer_instances, "m", _ReadWriteByteBuffer_woAdd).call(this, byteLength);
    utf82.write(value, this._buffer, o);
  }
  writeFloat32(value) {
    const o = __classPrivateFieldGet(this, _ReadWriteByteBuffer_instances, "m", _ReadWriteByteBuffer_woAdd).call(this, 4);
    this.view.setFloat32(o, value, true);
  }
  writeFloat64(value) {
    const o = __classPrivateFieldGet(this, _ReadWriteByteBuffer_instances, "m", _ReadWriteByteBuffer_woAdd).call(this, 8);
    this.view.setFloat64(o, value, true);
  }
  writeInt8(value) {
    const o = __classPrivateFieldGet(this, _ReadWriteByteBuffer_instances, "m", _ReadWriteByteBuffer_woAdd).call(this, 1);
    this.view.setInt8(o, value);
  }
  writeInt16(value) {
    const o = __classPrivateFieldGet(this, _ReadWriteByteBuffer_instances, "m", _ReadWriteByteBuffer_woAdd).call(this, 2);
    this.view.setInt16(o, value, true);
  }
  writeInt32(value) {
    const o = __classPrivateFieldGet(this, _ReadWriteByteBuffer_instances, "m", _ReadWriteByteBuffer_woAdd).call(this, 4);
    this.view.setInt32(o, value, true);
  }
  writeInt64(value) {
    const o = __classPrivateFieldGet(this, _ReadWriteByteBuffer_instances, "m", _ReadWriteByteBuffer_woAdd).call(this, 8);
    this.view.setBigInt64(o, value, true);
  }
  writeUint8(value) {
    const o = __classPrivateFieldGet(this, _ReadWriteByteBuffer_instances, "m", _ReadWriteByteBuffer_woAdd).call(this, 1);
    this.view.setUint8(o, value);
  }
  writeUint16(value) {
    const o = __classPrivateFieldGet(this, _ReadWriteByteBuffer_instances, "m", _ReadWriteByteBuffer_woAdd).call(this, 2);
    this.view.setUint16(o, value, true);
  }
  writeUint32(value) {
    const o = __classPrivateFieldGet(this, _ReadWriteByteBuffer_instances, "m", _ReadWriteByteBuffer_woAdd).call(this, 4);
    this.view.setUint32(o, value, true);
  }
  writeUint64(value) {
    const o = __classPrivateFieldGet(this, _ReadWriteByteBuffer_instances, "m", _ReadWriteByteBuffer_woAdd).call(this, 8);
    this.view.setBigUint64(o, value, true);
  }
  // DataView Proxy
  getFloat32(offset) {
    return this.view.getFloat32(offset, true);
  }
  getFloat64(offset) {
    return this.view.getFloat64(offset, true);
  }
  getInt8(offset) {
    return this.view.getInt8(offset);
  }
  getInt16(offset) {
    return this.view.getInt16(offset, true);
  }
  getInt32(offset) {
    return this.view.getInt32(offset, true);
  }
  getInt64(offset) {
    return this.view.getBigInt64(offset, true);
  }
  getUint8(offset) {
    return this.view.getUint8(offset);
  }
  getUint16(offset) {
    return this.view.getUint16(offset, true);
  }
  getUint32(offset) {
    return this.view.getUint32(offset, true);
  }
  getUint64(offset) {
    return this.view.getBigUint64(offset, true);
  }
  setFloat32(offset, value) {
    this.view.setFloat32(offset, value, true);
  }
  setFloat64(offset, value) {
    this.view.setFloat64(offset, value, true);
  }
  setInt8(offset, value) {
    this.view.setInt8(offset, value);
  }
  setInt16(offset, value) {
    this.view.setInt16(offset, value, true);
  }
  setInt32(offset, value) {
    this.view.setInt32(offset, value, true);
  }
  setInt64(offset, value) {
    this.view.setBigInt64(offset, value, true);
  }
  setUint8(offset, value) {
    this.view.setUint8(offset, value);
  }
  setUint16(offset, value) {
    this.view.setUint16(offset, value, true);
  }
  setUint32(offset, value) {
    this.view.setUint32(offset, value, true);
  }
  setUint64(offset, value) {
    this.view.setBigUint64(offset, value, true);
  }
};
_ReadWriteByteBuffer_instances = /* @__PURE__ */ new WeakSet(), _ReadWriteByteBuffer_woAdd = function _ReadWriteByteBuffer_woAdd2(amount) {
  if (this.woffset + amount > this._buffer.byteLength) {
    const newsize = getNextSize(this._buffer.byteLength, this.woffset + amount);
    const newBuffer = new Uint8Array(newsize);
    newBuffer.set(this._buffer);
    const oldOffset = this._buffer.byteOffset;
    this._buffer = newBuffer;
    this.view = new DataView(this._buffer.buffer, oldOffset);
  }
  this.woffset += amount;
  return this.woffset - amount;
}, _ReadWriteByteBuffer_roAdd = function _ReadWriteByteBuffer_roAdd2(amount) {
  if (this.roffset + amount > this.woffset) {
    throw new Error("Outside of the bounds of writen data.");
  }
  this.roffset += amount;
  return this.roffset - amount;
};

// node_modules/@dcl/ecs/dist/serialization/crdt/types.js
var CrdtMessageType;
(function(CrdtMessageType2) {
  CrdtMessageType2[CrdtMessageType2["RESERVED"] = 0] = "RESERVED";
  CrdtMessageType2[CrdtMessageType2["PUT_COMPONENT"] = 1] = "PUT_COMPONENT";
  CrdtMessageType2[CrdtMessageType2["DELETE_COMPONENT"] = 2] = "DELETE_COMPONENT";
  CrdtMessageType2[CrdtMessageType2["DELETE_ENTITY"] = 3] = "DELETE_ENTITY";
  CrdtMessageType2[CrdtMessageType2["APPEND_VALUE"] = 4] = "APPEND_VALUE";
  CrdtMessageType2[CrdtMessageType2["PUT_COMPONENT_NETWORK"] = 5] = "PUT_COMPONENT_NETWORK";
  CrdtMessageType2[CrdtMessageType2["DELETE_COMPONENT_NETWORK"] = 6] = "DELETE_COMPONENT_NETWORK";
  CrdtMessageType2[CrdtMessageType2["DELETE_ENTITY_NETWORK"] = 7] = "DELETE_ENTITY_NETWORK";
  CrdtMessageType2[CrdtMessageType2["MAX_MESSAGE_TYPE"] = 8] = "MAX_MESSAGE_TYPE";
})(CrdtMessageType || (CrdtMessageType = {}));
var CRDT_MESSAGE_HEADER_LENGTH = 8;
var ProcessMessageResultType;
(function(ProcessMessageResultType2) {
  ProcessMessageResultType2[ProcessMessageResultType2["StateUpdatedTimestamp"] = 1] = "StateUpdatedTimestamp";
  ProcessMessageResultType2[ProcessMessageResultType2["StateOutdatedTimestamp"] = 2] = "StateOutdatedTimestamp";
  ProcessMessageResultType2[ProcessMessageResultType2["NoChanges"] = 3] = "NoChanges";
  ProcessMessageResultType2[ProcessMessageResultType2["StateOutdatedData"] = 4] = "StateOutdatedData";
  ProcessMessageResultType2[ProcessMessageResultType2["StateUpdatedData"] = 5] = "StateUpdatedData";
  ProcessMessageResultType2[ProcessMessageResultType2["EntityWasDeleted"] = 6] = "EntityWasDeleted";
  ProcessMessageResultType2[ProcessMessageResultType2["EntityDeleted"] = 7] = "EntityDeleted";
})(ProcessMessageResultType || (ProcessMessageResultType = {}));

// node_modules/@dcl/ecs/dist/serialization/crdt/crdtMessageProtocol.js
var CrdtMessageProtocol;
(function(CrdtMessageProtocol2) {
  function validate(buf) {
    const rem = buf.remainingBytes();
    if (rem < CRDT_MESSAGE_HEADER_LENGTH) {
      return false;
    }
    const messageLength = buf.getUint32(buf.currentReadOffset());
    if (rem < messageLength) {
      return false;
    }
    return true;
  }
  CrdtMessageProtocol2.validate = validate;
  function readHeader(buf) {
    if (!validate(buf)) {
      return null;
    }
    return {
      length: buf.readUint32(),
      type: buf.readUint32()
    };
  }
  CrdtMessageProtocol2.readHeader = readHeader;
  function getHeader(buf) {
    if (!validate(buf)) {
      return null;
    }
    const currentOffset = buf.currentReadOffset();
    return {
      length: buf.getUint32(currentOffset),
      type: buf.getUint32(currentOffset + 4)
    };
  }
  CrdtMessageProtocol2.getHeader = getHeader;
  function consumeMessage(buf) {
    const header = getHeader(buf);
    if (!header) {
      return false;
    }
    buf.incrementReadOffset(header.length);
    return true;
  }
  CrdtMessageProtocol2.consumeMessage = consumeMessage;
})(CrdtMessageProtocol || (CrdtMessageProtocol = {}));

// node_modules/@dcl/ecs/dist/serialization/crdt/deleteComponent.js
var DeleteComponent;
(function(DeleteComponent2) {
  DeleteComponent2.MESSAGE_HEADER_LENGTH = 12;
  function write3(entity, componentId, timestamp, buf) {
    const messageLength = CRDT_MESSAGE_HEADER_LENGTH + DeleteComponent2.MESSAGE_HEADER_LENGTH;
    const startMessageOffset = buf.incrementWriteOffset(messageLength);
    buf.setUint32(startMessageOffset, messageLength);
    buf.setUint32(startMessageOffset + 4, CrdtMessageType.DELETE_COMPONENT);
    buf.setUint32(startMessageOffset + 8, entity);
    buf.setUint32(startMessageOffset + 12, componentId);
    buf.setUint32(startMessageOffset + 16, timestamp);
  }
  DeleteComponent2.write = write3;
  function read2(buf) {
    const header = CrdtMessageProtocol.readHeader(buf);
    if (!header) {
      return null;
    }
    if (header.type !== CrdtMessageType.DELETE_COMPONENT) {
      throw new Error("DeleteComponentOperation tried to read another message type.");
    }
    const msg = {
      ...header,
      entityId: buf.readUint32(),
      componentId: buf.readUint32(),
      timestamp: buf.readUint32()
    };
    return msg;
  }
  DeleteComponent2.read = read2;
})(DeleteComponent || (DeleteComponent = {}));

// node_modules/@dcl/ecs/dist/serialization/crdt/appendValue.js
var AppendValueOperation;
(function(AppendValueOperation2) {
  AppendValueOperation2.MESSAGE_HEADER_LENGTH = 16;
  function write3(entity, timestamp, componentId, data, buf) {
    const startMessageOffset = buf.incrementWriteOffset(CRDT_MESSAGE_HEADER_LENGTH + AppendValueOperation2.MESSAGE_HEADER_LENGTH);
    buf.writeBuffer(data, false);
    const messageLength = buf.currentWriteOffset() - startMessageOffset;
    buf.setUint32(startMessageOffset, messageLength);
    buf.setUint32(startMessageOffset + 4, CrdtMessageType.APPEND_VALUE);
    buf.setUint32(startMessageOffset + 8, entity);
    buf.setUint32(startMessageOffset + 12, componentId);
    buf.setUint32(startMessageOffset + 16, timestamp);
    const newLocal = messageLength - AppendValueOperation2.MESSAGE_HEADER_LENGTH - CRDT_MESSAGE_HEADER_LENGTH;
    buf.setUint32(startMessageOffset + 20, newLocal);
  }
  AppendValueOperation2.write = write3;
  function read2(buf) {
    const header = CrdtMessageProtocol.readHeader(buf);
    if (!header) {
      return null;
    }
    if (header.type !== CrdtMessageType.APPEND_VALUE) {
      throw new Error("AppendValueOperation tried to read another message type.");
    }
    return {
      ...header,
      entityId: buf.readUint32(),
      componentId: buf.readUint32(),
      timestamp: buf.readUint32(),
      data: buf.readBuffer()
    };
  }
  AppendValueOperation2.read = read2;
})(AppendValueOperation || (AppendValueOperation = {}));

// node_modules/@dcl/ecs/dist/serialization/crdt/deleteEntity.js
var DeleteEntity;
(function(DeleteEntity2) {
  DeleteEntity2.MESSAGE_HEADER_LENGTH = 4;
  function write3(entity, buf) {
    buf.writeUint32(CRDT_MESSAGE_HEADER_LENGTH + 4);
    buf.writeUint32(CrdtMessageType.DELETE_ENTITY);
    buf.writeUint32(entity);
  }
  DeleteEntity2.write = write3;
  function read2(buf) {
    const header = CrdtMessageProtocol.readHeader(buf);
    if (!header) {
      return null;
    }
    if (header.type !== CrdtMessageType.DELETE_ENTITY) {
      throw new Error("DeleteEntity tried to read another message type.");
    }
    return {
      ...header,
      entityId: buf.readUint32()
    };
  }
  DeleteEntity2.read = read2;
})(DeleteEntity || (DeleteEntity = {}));

// node_modules/@dcl/ecs/dist/serialization/crdt/putComponent.js
var PutComponentOperation;
(function(PutComponentOperation2) {
  PutComponentOperation2.MESSAGE_HEADER_LENGTH = 16;
  function write3(entity, timestamp, componentId, data, buf) {
    const startMessageOffset = buf.incrementWriteOffset(CRDT_MESSAGE_HEADER_LENGTH + PutComponentOperation2.MESSAGE_HEADER_LENGTH);
    buf.writeBuffer(data, false);
    const messageLength = buf.currentWriteOffset() - startMessageOffset;
    buf.setUint32(startMessageOffset, messageLength);
    buf.setUint32(startMessageOffset + 4, CrdtMessageType.PUT_COMPONENT);
    buf.setUint32(startMessageOffset + 8, entity);
    buf.setUint32(startMessageOffset + 12, componentId);
    buf.setUint32(startMessageOffset + 16, timestamp);
    const newLocal = messageLength - PutComponentOperation2.MESSAGE_HEADER_LENGTH - CRDT_MESSAGE_HEADER_LENGTH;
    buf.setUint32(startMessageOffset + 20, newLocal);
  }
  PutComponentOperation2.write = write3;
  function read2(buf) {
    const header = CrdtMessageProtocol.readHeader(buf);
    if (!header) {
      return null;
    }
    if (header.type !== CrdtMessageType.PUT_COMPONENT) {
      throw new Error("PutComponentOperation tried to read another message type.");
    }
    return {
      ...header,
      entityId: buf.readUint32(),
      componentId: buf.readUint32(),
      timestamp: buf.readUint32(),
      data: buf.readBuffer()
    };
  }
  PutComponentOperation2.read = read2;
})(PutComponentOperation || (PutComponentOperation = {}));

// node_modules/@dcl/ecs/dist/serialization/crdt/network/putComponentNetwork.js
var PutNetworkComponentOperation;
(function(PutNetworkComponentOperation2) {
  PutNetworkComponentOperation2.MESSAGE_HEADER_LENGTH = 20;
  function write3(entity, timestamp, componentId, networkId, data, buf) {
    const startMessageOffset = buf.incrementWriteOffset(CRDT_MESSAGE_HEADER_LENGTH + PutNetworkComponentOperation2.MESSAGE_HEADER_LENGTH);
    buf.writeBuffer(data, false);
    const messageLength = buf.currentWriteOffset() - startMessageOffset;
    buf.setUint32(startMessageOffset, messageLength);
    buf.setUint32(startMessageOffset + 4, CrdtMessageType.PUT_COMPONENT_NETWORK);
    buf.setUint32(startMessageOffset + 8, entity);
    buf.setUint32(startMessageOffset + 12, componentId);
    buf.setUint32(startMessageOffset + 16, timestamp);
    buf.setUint32(startMessageOffset + 20, networkId);
    const dataLength = messageLength - PutNetworkComponentOperation2.MESSAGE_HEADER_LENGTH - CRDT_MESSAGE_HEADER_LENGTH;
    buf.setUint32(startMessageOffset + 24, dataLength);
  }
  PutNetworkComponentOperation2.write = write3;
  function read2(buf) {
    const header = CrdtMessageProtocol.readHeader(buf);
    if (!header) {
      return null;
    }
    if (header.type !== CrdtMessageType.PUT_COMPONENT_NETWORK) {
      throw new Error("PutComponentNetworkOperation tried to read another message type.");
    }
    return {
      ...header,
      entityId: buf.readUint32(),
      componentId: buf.readUint32(),
      timestamp: buf.readUint32(),
      networkId: buf.readUint32(),
      data: buf.readBuffer()
    };
  }
  PutNetworkComponentOperation2.read = read2;
})(PutNetworkComponentOperation || (PutNetworkComponentOperation = {}));

// node_modules/@dcl/ecs/dist/serialization/crdt/network/deleteComponentNetwork.js
var DeleteComponentNetwork;
(function(DeleteComponentNetwork2) {
  DeleteComponentNetwork2.MESSAGE_HEADER_LENGTH = 16;
  function write3(entity, componentId, timestamp, networkId, buf) {
    const messageLength = CRDT_MESSAGE_HEADER_LENGTH + DeleteComponentNetwork2.MESSAGE_HEADER_LENGTH;
    const startMessageOffset = buf.incrementWriteOffset(messageLength);
    buf.setUint32(startMessageOffset, messageLength);
    buf.setUint32(startMessageOffset + 4, CrdtMessageType.DELETE_COMPONENT_NETWORK);
    buf.setUint32(startMessageOffset + 8, entity);
    buf.setUint32(startMessageOffset + 12, componentId);
    buf.setUint32(startMessageOffset + 16, timestamp);
    buf.setUint32(startMessageOffset + 20, networkId);
  }
  DeleteComponentNetwork2.write = write3;
  function read2(buf) {
    const header = CrdtMessageProtocol.readHeader(buf);
    if (!header) {
      return null;
    }
    if (header.type !== CrdtMessageType.DELETE_COMPONENT_NETWORK) {
      throw new Error("DeleteComponentOperation tried to read another message type.");
    }
    return {
      ...header,
      entityId: buf.readUint32(),
      componentId: buf.readUint32(),
      timestamp: buf.readUint32(),
      networkId: buf.readUint32()
    };
  }
  DeleteComponentNetwork2.read = read2;
})(DeleteComponentNetwork || (DeleteComponentNetwork = {}));

// node_modules/@dcl/ecs/dist/serialization/crdt/network/deleteEntityNetwork.js
var DeleteEntityNetwork;
(function(DeleteEntityNetwork2) {
  DeleteEntityNetwork2.MESSAGE_HEADER_LENGTH = 8;
  function write3(entity, networkId, buf) {
    buf.writeUint32(CRDT_MESSAGE_HEADER_LENGTH + 4);
    buf.writeUint32(CrdtMessageType.DELETE_ENTITY_NETWORK);
    buf.writeUint32(entity);
    buf.writeUint32(networkId);
  }
  DeleteEntityNetwork2.write = write3;
  function read2(buf) {
    const header = CrdtMessageProtocol.readHeader(buf);
    if (!header) {
      return null;
    }
    if (header.type !== CrdtMessageType.DELETE_ENTITY_NETWORK) {
      throw new Error("DeleteEntityNetwork tried to read another message type.");
    }
    return {
      ...header,
      entityId: buf.readUint32(),
      networkId: buf.readUint32()
    };
  }
  DeleteEntityNetwork2.read = read2;
})(DeleteEntityNetwork || (DeleteEntityNetwork = {}));

// node_modules/@dcl/ecs/dist/serialization/crdt/network/utils.js
function isNetworkMessage(message) {
  return [
    CrdtMessageType.DELETE_COMPONENT_NETWORK,
    CrdtMessageType.DELETE_ENTITY_NETWORK,
    CrdtMessageType.PUT_COMPONENT_NETWORK
  ].includes(message.type);
}
function networkMessageToLocal(message, localEntityId, buffer2, destinationBuffer) {
  const offset = buffer2.currentWriteOffset();
  if (message.type === CrdtMessageType.PUT_COMPONENT_NETWORK) {
    PutComponentOperation.write(localEntityId, message.timestamp, message.componentId, message.data, buffer2);
  } else if (message.type === CrdtMessageType.DELETE_COMPONENT_NETWORK) {
    DeleteComponent.write(localEntityId, message.componentId, message.timestamp, buffer2);
  } else if (message.type === CrdtMessageType.DELETE_ENTITY_NETWORK) {
    DeleteEntity.write(localEntityId, buffer2);
  }
  destinationBuffer.writeBuffer(buffer2.buffer().subarray(offset, buffer2.currentWriteOffset()), false);
}
function localMessageToNetwork(message, network, buffer2, destinationBuffer) {
  const offset = buffer2.currentWriteOffset();
  if (message.type === CrdtMessageType.PUT_COMPONENT) {
    PutNetworkComponentOperation.write(network.entityId, message.timestamp, message.componentId, network.networkId, message.data, buffer2);
  } else if (message.type === CrdtMessageType.DELETE_COMPONENT) {
    DeleteComponentNetwork.write(network.entityId, message.componentId, message.timestamp, network.networkId, buffer2);
  } else if (message.type === CrdtMessageType.DELETE_ENTITY) {
    DeleteEntityNetwork.write(network.entityId, network.networkId, buffer2);
  }
  destinationBuffer.writeBuffer(buffer2.buffer().subarray(offset, buffer2.currentWriteOffset()), false);
}
var buffer = new ReadWriteByteBuffer();
function fixTransformParent(message, transformValue, parent) {
  buffer.resetBuffer();
  let transform = transformValue;
  if (!transform && "data" in message) {
    transform = TransformSchema.deserialize(new ReadWriteByteBuffer(message.data));
  }
  if (!transform)
    throw new Error("Invalid parent transform");
  const newTransform = { ...transform, parent };
  TransformSchema.serialize(newTransform, buffer);
  return buffer.toBinary();
}

// node_modules/@dcl/ecs/dist/systems/crdt/index.js
function crdtSceneSystem(engine2, onProcessEntityComponentChange) {
  const transports = [];
  const NetworkEntity4 = NetworkEntity(engine2);
  const NetworkParent3 = NetworkParent(engine2);
  const Transform3 = Transform(engine2);
  const receivedMessages = [];
  const broadcastMessages = [];
  function parseChunkMessage(transportId) {
    return function parseChunkMessage2(chunkMessage) {
      const buffer2 = new ReadWriteByteBuffer(chunkMessage);
      let header;
      while (header = CrdtMessageProtocol.getHeader(buffer2)) {
        const offset = buffer2.currentReadOffset();
        let message = void 0;
        if (header.type === CrdtMessageType.DELETE_COMPONENT) {
          message = DeleteComponent.read(buffer2);
        } else if (header.type === CrdtMessageType.DELETE_COMPONENT_NETWORK) {
          message = DeleteComponentNetwork.read(buffer2);
        } else if (header.type === CrdtMessageType.PUT_COMPONENT) {
          message = PutComponentOperation.read(buffer2);
        } else if (header.type === CrdtMessageType.PUT_COMPONENT_NETWORK) {
          message = PutNetworkComponentOperation.read(buffer2);
        } else if (header.type === CrdtMessageType.DELETE_ENTITY) {
          message = DeleteEntity.read(buffer2);
        } else if (header.type === CrdtMessageType.DELETE_ENTITY_NETWORK) {
          message = DeleteEntityNetwork.read(buffer2);
        } else if (header.type === CrdtMessageType.APPEND_VALUE) {
          message = AppendValueOperation.read(buffer2);
        } else {
          buffer2.incrementReadOffset(header.length);
        }
        if (message) {
          receivedMessages.push({
            ...message,
            transportId,
            messageBuffer: buffer2.buffer().subarray(offset, buffer2.currentReadOffset())
          });
        }
      }
    };
  }
  function getMessages(value) {
    const messagesToProcess = value.splice(0, value.length);
    return messagesToProcess;
  }
  function findNetworkId(msg) {
    const hasNetworkId = "networkId" in msg;
    if (hasNetworkId) {
      for (const [entityId, network] of engine2.getEntitiesWith(NetworkEntity4)) {
        if (network.networkId === msg.networkId && network.entityId === msg.entityId) {
          return { entityId, network };
        }
      }
    }
    return { entityId: msg.entityId };
  }
  async function receiveMessages() {
    const messagesToProcess = getMessages(receivedMessages);
    const entitiesShouldBeCleaned = [];
    for (const msg of messagesToProcess) {
      let { entityId, network } = findNetworkId(msg);
      if (isNetworkMessage(msg) && !network) {
        entityId = engine2.addEntity();
        network = { entityId: msg.entityId, networkId: msg.networkId };
        NetworkEntity4.createOrReplace(entityId, network);
      }
      if (msg.type === CrdtMessageType.DELETE_ENTITY || msg.type === CrdtMessageType.DELETE_ENTITY_NETWORK) {
        entitiesShouldBeCleaned.push(entityId);
        broadcastMessages.push(msg);
      } else {
        const entityState = engine2.entityContainer.getEntityState(entityId);
        if (entityState === EntityState.Removed)
          continue;
        if (entityState === EntityState.Unknown) {
          engine2.entityContainer.updateUsedEntity(entityId);
        }
        const component = engine2.getComponentOrNull(msg.componentId);
        if (component) {
          if (msg.type === CrdtMessageType.PUT_COMPONENT && component.componentId === Transform3.componentId && NetworkEntity4.has(entityId) && NetworkParent3.has(entityId)) {
            msg.data = fixTransformParent(msg);
          }
          const [conflictMessage, value] = component.updateFromCrdt({ ...msg, entityId });
          if (!conflictMessage) {
            broadcastMessages.push(msg);
            onProcessEntityComponentChange && onProcessEntityComponentChange(entityId, msg.type, component, value);
          }
        } else {
          broadcastMessages.push(msg);
        }
      }
    }
    for (const entity of entitiesShouldBeCleaned) {
      for (const definition of engine2.componentsIter()) {
        definition.entityDeleted(entity, true);
      }
      engine2.entityContainer.updateRemovedEntity(entity);
      onProcessEntityComponentChange && onProcessEntityComponentChange(entity, CrdtMessageType.DELETE_ENTITY);
    }
  }
  async function sendMessages(entitiesDeletedThisTick) {
    const crdtMessages = getMessages(broadcastMessages);
    const buffer2 = new ReadWriteByteBuffer();
    for (const component of engine2.componentsIter()) {
      for (const message of component.getCrdtUpdates()) {
        const offset = buffer2.currentWriteOffset();
        if (transports.some((t) => t.filter(message))) {
          if (message.type === CrdtMessageType.PUT_COMPONENT) {
            PutComponentOperation.write(message.entityId, message.timestamp, message.componentId, message.data, buffer2);
          } else if (message.type === CrdtMessageType.DELETE_COMPONENT) {
            DeleteComponent.write(message.entityId, component.componentId, message.timestamp, buffer2);
          } else if (message.type === CrdtMessageType.APPEND_VALUE) {
            AppendValueOperation.write(message.entityId, message.timestamp, message.componentId, message.data, buffer2);
          }
          crdtMessages.push({
            ...message,
            messageBuffer: buffer2.buffer().subarray(offset, buffer2.currentWriteOffset())
          });
          if (onProcessEntityComponentChange) {
            const rawValue = message.type === CrdtMessageType.PUT_COMPONENT || message.type === CrdtMessageType.APPEND_VALUE ? component.get(message.entityId) : void 0;
            onProcessEntityComponentChange(message.entityId, message.type, component, rawValue);
          }
        }
      }
    }
    for (const entityId of entitiesDeletedThisTick) {
      const offset = buffer2.currentWriteOffset();
      DeleteEntity.write(entityId, buffer2);
      crdtMessages.push({
        type: CrdtMessageType.DELETE_ENTITY,
        entityId,
        messageBuffer: buffer2.buffer().subarray(offset, buffer2.currentWriteOffset())
      });
      onProcessEntityComponentChange && onProcessEntityComponentChange(entityId, CrdtMessageType.DELETE_ENTITY);
    }
    const transportBuffer = new ReadWriteByteBuffer();
    for (const index in transports) {
      const transportIndex = Number(index);
      const transport = transports[transportIndex];
      const isRendererTransport = transport.type === "renderer";
      const isNetworkTransport = transport.type === "network";
      transportBuffer.resetBuffer();
      const buffer3 = new ReadWriteByteBuffer();
      for (const message2 of crdtMessages) {
        if (message2.transportId === transportIndex)
          continue;
        if (!transport.filter(message2))
          continue;
        const { entityId } = findNetworkId(message2);
        const transformNeedsFix = "componentId" in message2 && message2.componentId === Transform3.componentId && Transform3.has(entityId) && NetworkParent3.has(entityId) && NetworkEntity4.has(entityId);
        if (isRendererTransport && message2.type === CrdtMessageType.PUT_COMPONENT && transformNeedsFix) {
          const parent = findNetworkId(NetworkParent3.get(entityId));
          const transformData = fixTransformParent(message2, Transform3.get(entityId), parent.entityId);
          const offset = buffer3.currentWriteOffset();
          PutComponentOperation.write(entityId, message2.timestamp, message2.componentId, transformData, buffer3);
          transportBuffer.writeBuffer(buffer3.buffer().subarray(offset, buffer3.currentWriteOffset()), false);
          continue;
        }
        if (isRendererTransport && isNetworkMessage(message2)) {
          let transformData = "data" in message2 ? message2.data : new Uint8Array();
          if (transformNeedsFix) {
            const parent = findNetworkId(NetworkParent3.get(entityId));
            transformData = fixTransformParent(message2, Transform3.get(entityId), parent.entityId);
          }
          networkMessageToLocal({ ...message2, data: transformData }, entityId, buffer3, transportBuffer);
          continue;
        }
        if (isNetworkTransport && !isNetworkMessage(message2)) {
          const networkData = NetworkEntity4.getOrNull(message2.entityId);
          if (networkData) {
            localMessageToNetwork(message2, networkData, buffer3, transportBuffer);
            continue;
          }
        }
        transportBuffer.writeBuffer(message2.messageBuffer, false);
      }
      const message = transportBuffer.currentWriteOffset() ? transportBuffer.toBinary() : new Uint8Array([]);
      await transport.send(message);
    }
  }
  function addTransport(transport) {
    const id = transports.push(transport) - 1;
    transport.onmessage = parseChunkMessage(id);
  }
  return {
    sendMessages,
    receiveMessages,
    addTransport
  };
}

// node_modules/@dcl/ecs/dist/systems/crdt/utils.js
var CrdtUtils;
(function(CrdtUtils2) {
  let SynchronizedEntityType;
  (function(SynchronizedEntityType2) {
    SynchronizedEntityType2[SynchronizedEntityType2["NETWORKED"] = 0] = "NETWORKED";
    SynchronizedEntityType2[SynchronizedEntityType2["RENDERER"] = 1] = "RENDERER";
  })(SynchronizedEntityType = CrdtUtils2.SynchronizedEntityType || (CrdtUtils2.SynchronizedEntityType = {}));
})(CrdtUtils || (CrdtUtils = {}));
function dataCompare(a, b) {
  if (a === b)
    return 0;
  if (a === null && b !== null)
    return -1;
  if (a !== null && b === null)
    return 1;
  if (a instanceof Uint8Array && b instanceof Uint8Array) {
    const lengthDifference = a.byteLength - b.byteLength;
    if (lengthDifference !== 0) {
      return lengthDifference > 0 ? 1 : -1;
    }
    let res;
    for (let i = 0, n = a.byteLength; i < n; i++) {
      res = a[i] - b[i];
      if (res !== 0) {
        return res > 0 ? 1 : -1;
      }
    }
    return 0;
  }
  if (typeof a === "string") {
    const lengthDifference = a.length - b.length;
    if (lengthDifference !== 0) {
      return lengthDifference > 0 ? 1 : -1;
    }
    return a.localeCompare(b);
  }
  return a > b ? 1 : -1;
}

// node_modules/@dcl/ecs/dist/engine/readonly.js
function deepReadonly(val) {
  return Object.freeze({ ...val });
}

// node_modules/@dcl/ecs/dist/engine/lww-element-set-component-definition.js
function incrementTimestamp(entity, timestamps) {
  const newTimestamp = (timestamps.get(entity) || 0) + 1;
  timestamps.set(entity, newTimestamp);
  return newTimestamp;
}
function createDumpLwwFunctionFromCrdt(componentId, timestamps, schema, data) {
  return function dumpCrdtState(buffer2, filterEntity) {
    for (const [entity, timestamp] of timestamps) {
      if (filterEntity) {
        if (!filterEntity(entity))
          continue;
      }
      if (data.has(entity)) {
        const it = data.get(entity);
        const buf = new ReadWriteByteBuffer();
        schema.serialize(it, buf);
        PutComponentOperation.write(entity, timestamp, componentId, buf.toBinary(), buffer2);
      } else {
        DeleteComponent.write(entity, componentId, timestamp, buffer2);
      }
    }
  };
}
function createUpdateLwwFromCrdt(componentId, timestamps, schema, data) {
  function crdtRuleForCurrentState(message) {
    const { entityId, timestamp } = message;
    const currentTimestamp = timestamps.get(entityId);
    if (currentTimestamp === void 0 || currentTimestamp < timestamp) {
      return ProcessMessageResultType.StateUpdatedTimestamp;
    }
    if (currentTimestamp > timestamp) {
      return ProcessMessageResultType.StateOutdatedTimestamp;
    }
    if (message.type === CrdtMessageType.DELETE_COMPONENT && !data.has(entityId)) {
      return ProcessMessageResultType.NoChanges;
    }
    let currentDataGreater = 0;
    if (data.has(entityId)) {
      const writeBuffer = new ReadWriteByteBuffer();
      schema.serialize(data.get(entityId), writeBuffer);
      currentDataGreater = dataCompare(writeBuffer.toBinary(), message.data || null);
    } else {
      currentDataGreater = dataCompare(null, message.data);
    }
    if (currentDataGreater === 0) {
      return ProcessMessageResultType.NoChanges;
    } else if (currentDataGreater > 0) {
      return ProcessMessageResultType.StateOutdatedData;
    } else {
      return ProcessMessageResultType.StateUpdatedData;
    }
  }
  return (msg) => {
    if (msg.type !== CrdtMessageType.PUT_COMPONENT && msg.type !== CrdtMessageType.PUT_COMPONENT_NETWORK && msg.type !== CrdtMessageType.DELETE_COMPONENT && msg.type !== CrdtMessageType.DELETE_COMPONENT_NETWORK)
      return [null, data.get(msg.entityId)];
    const action = crdtRuleForCurrentState(msg);
    const entity = msg.entityId;
    switch (action) {
      case ProcessMessageResultType.StateUpdatedData:
      case ProcessMessageResultType.StateUpdatedTimestamp: {
        timestamps.set(entity, msg.timestamp);
        if (msg.type === CrdtMessageType.PUT_COMPONENT || msg.type === CrdtMessageType.PUT_COMPONENT_NETWORK) {
          const buf = new ReadWriteByteBuffer(msg.data);
          data.set(entity, schema.deserialize(buf));
        } else {
          data.delete(entity);
        }
        return [null, data.get(entity)];
      }
      case ProcessMessageResultType.StateOutdatedTimestamp:
      case ProcessMessageResultType.StateOutdatedData: {
        if (data.has(entity)) {
          const writeBuffer = new ReadWriteByteBuffer();
          schema.serialize(data.get(entity), writeBuffer);
          return [
            {
              type: CrdtMessageType.PUT_COMPONENT,
              componentId,
              data: writeBuffer.toBinary(),
              entityId: entity,
              timestamp: timestamps.get(entity)
            },
            data.get(entity)
          ];
        } else {
          return [
            {
              type: CrdtMessageType.DELETE_COMPONENT,
              componentId,
              entityId: entity,
              timestamp: timestamps.get(entity)
            },
            void 0
          ];
        }
      }
    }
    return [null, data.get(entity)];
  };
}
function createGetCrdtMessagesForLww(componentId, timestamps, dirtyIterator, schema, data) {
  return function* () {
    for (const entity of dirtyIterator) {
      const newTimestamp = incrementTimestamp(entity, timestamps);
      if (data.has(entity)) {
        const writeBuffer = new ReadWriteByteBuffer();
        schema.serialize(data.get(entity), writeBuffer);
        const msg = {
          type: CrdtMessageType.PUT_COMPONENT,
          componentId,
          entityId: entity,
          data: writeBuffer.toBinary(),
          timestamp: newTimestamp
        };
        yield msg;
      } else {
        const msg = {
          type: CrdtMessageType.DELETE_COMPONENT,
          componentId,
          entityId: entity,
          timestamp: newTimestamp
        };
        yield msg;
      }
    }
    dirtyIterator.clear();
  };
}
function createComponentDefinitionFromSchema(componentName, componentId, schema) {
  const data = /* @__PURE__ */ new Map();
  const dirtyIterator = /* @__PURE__ */ new Set();
  const timestamps = /* @__PURE__ */ new Map();
  const onChangeCallbacks = /* @__PURE__ */ new Map();
  return {
    get componentId() {
      return componentId;
    },
    get componentName() {
      return componentName;
    },
    get componentType() {
      return 0;
    },
    schema,
    has(entity) {
      return data.has(entity);
    },
    deleteFrom(entity, markAsDirty = true) {
      const component = data.get(entity);
      if (data.delete(entity) && markAsDirty) {
        dirtyIterator.add(entity);
      }
      return component || null;
    },
    entityDeleted(entity, markAsDirty) {
      if (data.delete(entity) && markAsDirty) {
        dirtyIterator.add(entity);
      }
    },
    getOrNull(entity) {
      const component = data.get(entity);
      return component ? deepReadonly(component) : null;
    },
    get(entity) {
      const component = data.get(entity);
      if (!component) {
        throw new Error(`[getFrom] Component ${componentName} for entity #${entity} not found`);
      }
      return deepReadonly(component);
    },
    create(entity, value) {
      const component = data.get(entity);
      if (component) {
        throw new Error(`[create] Component ${componentName} for ${entity} already exists`);
      }
      const usedValue = value === void 0 ? schema.create() : schema.extend ? schema.extend(value) : value;
      data.set(entity, usedValue);
      dirtyIterator.add(entity);
      return usedValue;
    },
    createOrReplace(entity, value) {
      const usedValue = value === void 0 ? schema.create() : schema.extend ? schema.extend(value) : value;
      data.set(entity, usedValue);
      dirtyIterator.add(entity);
      return usedValue;
    },
    getMutableOrNull(entity) {
      const component = data.get(entity);
      if (!component) {
        return null;
      }
      dirtyIterator.add(entity);
      return component;
    },
    getOrCreateMutable(entity, value) {
      const component = data.get(entity);
      if (!component) {
        return this.create(entity, value);
      } else {
        dirtyIterator.add(entity);
        return component;
      }
    },
    getMutable(entity) {
      const component = this.getMutableOrNull(entity);
      if (component === null) {
        throw new Error(`[mutable] Component ${componentName} for ${entity} not found`);
      }
      return component;
    },
    *iterator() {
      for (const [entity, component] of data) {
        yield [entity, component];
      }
    },
    *dirtyIterator() {
      for (const entity of dirtyIterator) {
        yield entity;
      }
    },
    getCrdtUpdates: createGetCrdtMessagesForLww(componentId, timestamps, dirtyIterator, schema, data),
    updateFromCrdt: createUpdateLwwFromCrdt(componentId, timestamps, schema, data),
    dumpCrdtStateToBuffer: createDumpLwwFunctionFromCrdt(componentId, timestamps, schema, data),
    onChange(entity, cb) {
      const cbs = onChangeCallbacks.get(entity) ?? [];
      cbs.push(cb);
      onChangeCallbacks.set(entity, cbs);
    },
    __onChangeCallbacks(entity, value) {
      const cbs = onChangeCallbacks.get(entity);
      if (!cbs)
        return;
      for (const cb of cbs) {
        cb(value);
      }
    }
  };
}

// node_modules/@dcl/ecs/dist/engine/systems.js
var SYSTEMS_REGULAR_PRIORITY = 1e5;
function SystemContainer() {
  const systems = [];
  function sort() {
    systems.sort((a, b) => b.priority - a.priority);
  }
  function add2(fn, priority2, name) {
    const systemName = name ?? fn.name;
    if (systems.find((item) => item.fn === fn)) {
      throw new Error(`System ${JSON.stringify(systemName)} already added to the engine`);
    }
    systems.push({
      fn,
      priority: priority2,
      name: systemName
    });
    sort();
  }
  function remove(selector) {
    let index = -1;
    if (typeof selector === "string") {
      index = systems.findIndex((item) => item.name === selector);
    } else {
      index = systems.findIndex((item) => item.fn === selector);
    }
    if (index === -1) {
      return false;
    }
    systems.splice(index, 1);
    sort();
    return true;
  }
  return {
    add: add2,
    remove,
    getSystems() {
      return systems;
    }
  };
}

// node_modules/@dcl/ecs/dist/engine/grow-only-value-set-component-definition.js
var emptyReadonlySet = freezeSet(/* @__PURE__ */ new Set());
function frozenError() {
  throw new Error("The set is frozen");
}
function freezeSet(set) {
  ;
  set.add = frozenError;
  set.clear = frozenError;
  return set;
}
function sortByTimestamp(a, b) {
  return a.timestamp > b.timestamp ? 1 : -1;
}
function createValueSetComponentDefinitionFromSchema(componentName, componentId, schema, options) {
  const data = /* @__PURE__ */ new Map();
  const dirtyIterator = /* @__PURE__ */ new Set();
  const queuedCommands = [];
  const onChangeCallbacks = /* @__PURE__ */ new Map();
  function shouldSort(row) {
    const len = row.raw.length;
    if (len > 1 && row.raw[len - 1].timestamp <= row.raw[len - 2].timestamp) {
      return true;
    }
    return false;
  }
  function gotUpdated(entity) {
    const row = data.get(entity);
    if (row) {
      if (shouldSort(row)) {
        row.raw.sort(sortByTimestamp);
      }
      while (row.raw.length > options.maxElements) {
        row.raw.shift();
      }
      const frozenSet = freezeSet(new Set(row?.raw.map(($) => $.value)));
      row.frozenSet = frozenSet;
      return frozenSet;
    } else {
      return emptyReadonlySet;
    }
  }
  function append(entity, value) {
    let row = data.get(entity);
    if (!row) {
      row = { raw: [], frozenSet: emptyReadonlySet };
      data.set(entity, row);
    }
    const usedValue = schema.extend ? schema.extend(value) : value;
    const timestamp = options.timestampFunction(usedValue);
    if (__DEV__) {
      Object.freeze(usedValue);
    }
    row.raw.push({ value: usedValue, timestamp });
    return { set: gotUpdated(entity), value: usedValue };
  }
  const ret = {
    get componentId() {
      return componentId;
    },
    get componentName() {
      return componentName;
    },
    get componentType() {
      return 1;
    },
    schema,
    has(entity) {
      return data.has(entity);
    },
    entityDeleted(entity) {
      data.delete(entity);
    },
    get(entity) {
      const values = data.get(entity);
      if (values) {
        return values.frozenSet;
      } else {
        return emptyReadonlySet;
      }
    },
    addValue(entity, rawValue) {
      const { set, value } = append(entity, rawValue);
      dirtyIterator.add(entity);
      const buf = new ReadWriteByteBuffer();
      schema.serialize(value, buf);
      queuedCommands.push({
        componentId,
        data: buf.toBinary(),
        entityId: entity,
        timestamp: 0,
        type: CrdtMessageType.APPEND_VALUE
      });
      return set;
    },
    *iterator() {
      for (const [entity, component] of data) {
        yield [entity, component.frozenSet];
      }
    },
    *dirtyIterator() {
      for (const entity of dirtyIterator) {
        yield entity;
      }
    },
    getCrdtUpdates() {
      dirtyIterator.clear();
      return queuedCommands.splice(0, queuedCommands.length);
    },
    updateFromCrdt(_body) {
      if (_body.type === CrdtMessageType.APPEND_VALUE) {
        const buf = new ReadWriteByteBuffer(_body.data);
        const { value } = append(_body.entityId, schema.deserialize(buf));
        return [null, value];
      }
      return [null, void 0];
    },
    dumpCrdtStateToBuffer: function(buffer2, filterEntity) {
      for (const [entity, { raw }] of data) {
        if (filterEntity && !filterEntity(entity))
          continue;
        for (const it of raw) {
          const buf = new ReadWriteByteBuffer();
          schema.serialize(it.value, buf);
          AppendValueOperation.write(entity, 0, componentId, buf.toBinary(), buffer2);
        }
      }
    },
    onChange(entity, cb) {
      const cbs = onChangeCallbacks.get(entity) ?? [];
      cbs.push(cb);
      onChangeCallbacks.set(entity, cbs);
    },
    __onChangeCallbacks(entity, value) {
      const cbs = onChangeCallbacks.get(entity);
      if (!cbs)
        return;
      for (const cb of cbs) {
        cb(value);
      }
    }
  };
  return ret;
}

// node_modules/@dcl/ecs/dist/runtime/helpers/tree.js
function* genEntityTree(entity, entities) {
  if (!entities.has(entity))
    return;
  entities.delete(entity);
  for (const [_entity, value] of entities) {
    if (value.parent === entity) {
      yield* genEntityTree(_entity, entities);
    }
  }
  yield entity;
}
function getComponentEntityTree(engine2, entity, component) {
  const entities = new Map(engine2.getEntitiesWith(component));
  return genEntityTree(entity, entities);
}
function removeNetworkEntityChildrens(engine2, parent) {
  const NetworkParent3 = NetworkParent(engine2);
  const NetworkEntity4 = NetworkEntity(engine2);
  engine2.removeEntity(parent);
  const network = NetworkEntity4.getOrNull(parent);
  if (network) {
    for (const [entity, parent2] of engine2.getEntitiesWith(NetworkParent3)) {
      if (parent2.entityId === network.entityId && parent2.networkId === network.networkId) {
        removeNetworkEntityChildrens(engine2, entity);
      }
    }
  }
  return;
}
function removeEntityWithChildren(engine2, entity) {
  const Transform3 = Transform(engine2);
  const NetworkEntity4 = NetworkEntity(engine2);
  if (NetworkEntity4.has(entity)) {
    return removeNetworkEntityChildrens(engine2, entity);
  }
  for (const ent of getComponentEntityTree(engine2, entity, Transform3)) {
    engine2.removeEntity(ent);
  }
}

// node_modules/@dcl/ecs/dist/engine/input.js
var InputCommands = [
  0,
  1,
  2,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13
  /* InputAction.IA_ACTION_6 */
];
var InputStateUpdateSystemPriority = 1 << 20;
function createInputSystem(engine2) {
  const PointerEventsResult3 = PointerEventsResult(engine2);
  const globalState = {
    previousFrameMaxTimestamp: 0,
    currentFrameMaxTimestamp: 0,
    buttonState: /* @__PURE__ */ new Map(),
    thisFrameCommands: []
  };
  function findLastAction(pointerEventType, inputAction, entity) {
    const ascendingTimestampIterator = PointerEventsResult3.get(entity);
    for (const command of Array.from(ascendingTimestampIterator).reverse()) {
      if (command.button === inputAction && command.state === pointerEventType) {
        return command;
      }
    }
  }
  function* findCommandsByActionDescending(inputAction, entity) {
    const ascendingTimestampIterator = PointerEventsResult3.get(entity);
    for (const command of Array.from(ascendingTimestampIterator).reverse()) {
      if (command.button === inputAction) {
        yield command;
      }
    }
  }
  function buttonStateUpdateSystem() {
    let maxTimestamp = globalState.currentFrameMaxTimestamp;
    globalState.previousFrameMaxTimestamp = maxTimestamp;
    if (globalState.thisFrameCommands.length) {
      globalState.thisFrameCommands = [];
    }
    for (const [, commands] of engine2.getEntitiesWith(PointerEventsResult3)) {
      const arrayCommands = Array.from(commands);
      for (let i = arrayCommands.length - 1; i >= 0; i--) {
        const command = arrayCommands[i];
        if (command.timestamp > maxTimestamp) {
          maxTimestamp = command.timestamp;
        }
        if (command.timestamp > globalState.previousFrameMaxTimestamp) {
          globalState.thisFrameCommands.push(command);
        }
        if (command.state === 0 || command.state === 1) {
          const prevCommand = globalState.buttonState.get(command.button);
          if (!prevCommand || command.timestamp > prevCommand.timestamp) {
            globalState.buttonState.set(command.button, command);
          } else {
            break;
          }
        }
      }
    }
    globalState.currentFrameMaxTimestamp = maxTimestamp;
  }
  engine2.addSystem(buttonStateUpdateSystem, InputStateUpdateSystemPriority, "@dcl/ecs#inputSystem");
  function timestampIsCurrentFrame(timestamp) {
    if (timestamp > globalState.previousFrameMaxTimestamp && timestamp <= globalState.currentFrameMaxTimestamp) {
      return true;
    } else {
      return false;
    }
  }
  function getClick(inputAction, entity) {
    if (inputAction !== 3) {
      return findClick(inputAction, entity);
    }
    for (const input of InputCommands) {
      const cmd = findClick(input, entity);
      if (cmd)
        return cmd;
    }
    return null;
  }
  function findClick(inputAction, entity) {
    let down = null;
    let up = null;
    for (const it of findCommandsByActionDescending(inputAction, entity)) {
      if (!up) {
        if (it.state === 0) {
          up = it;
          continue;
        }
      } else if (!down) {
        if (it.state === 1) {
          down = it;
          break;
        }
      }
    }
    if (!up || !down)
      return null;
    if (down.timestamp < up.timestamp && timestampIsCurrentFrame(up.timestamp)) {
      return { up, down };
    }
    return null;
  }
  function getInputCommandFromEntity(inputAction, pointerEventType, entity) {
    if (inputAction !== 3) {
      return findInputCommand(inputAction, pointerEventType, entity);
    }
    for (const input of InputCommands) {
      const cmd = findInputCommand(input, pointerEventType, entity);
      if (cmd)
        return cmd;
    }
    return null;
  }
  function getInputCommand(inputAction, pointerEventType, entity) {
    if (entity) {
      return getInputCommandFromEntity(inputAction, pointerEventType, entity);
    } else {
      for (const command of globalState.thisFrameCommands) {
        if ((command.button === inputAction || inputAction === 3) && command.state === pointerEventType) {
          return command;
        }
      }
      return null;
    }
  }
  function findInputCommand(inputAction, pointerEventType, entity) {
    const command = findLastAction(pointerEventType, inputAction, entity);
    if (!command)
      return null;
    if (timestampIsCurrentFrame(command.timestamp)) {
      return command;
    } else {
      return null;
    }
  }
  function isClicked(inputAction, entity) {
    return getClick(inputAction, entity) !== null;
  }
  function isTriggered(inputAction, pointerEventType, entity) {
    if (entity) {
      const command = findLastAction(pointerEventType, inputAction, entity);
      return command && timestampIsCurrentFrame(command.timestamp) || false;
    } else {
      for (const command of globalState.thisFrameCommands) {
        if ((command.button === inputAction || inputAction === 3) && command.state === pointerEventType) {
          return true;
        }
      }
      return false;
    }
  }
  function isPressed(inputAction) {
    return globalState.buttonState.get(inputAction)?.state === 1;
  }
  return {
    isPressed,
    getClick,
    getInputCommand,
    isClicked,
    isTriggered
  };
}

// node_modules/@dcl/ecs/dist/engine/component.js
var ComponentType;
(function(ComponentType2) {
  ComponentType2[ComponentType2["LastWriteWinElementSet"] = 0] = "LastWriteWinElementSet";
  ComponentType2[ComponentType2["GrowOnlyValueSet"] = 1] = "GrowOnlyValueSet";
})(ComponentType || (ComponentType = {}));

// node_modules/@dcl/ecs/dist/engine/index.js
function preEngine(options) {
  const entityContainer = options?.entityContainer ?? createEntityContainer();
  const componentsDefinition = /* @__PURE__ */ new Map();
  const systems = SystemContainer();
  let sealed = false;
  function addSystem(fn, priority2 = SYSTEMS_REGULAR_PRIORITY, name) {
    systems.add(fn, priority2, name);
  }
  function removeSystem(selector) {
    return systems.remove(selector);
  }
  function addEntity() {
    const entity = entityContainer.generateEntity();
    return entity;
  }
  function removeEntity(entity) {
    for (const [, component] of componentsDefinition) {
      if (component.componentName === "core-schema::Network-Entity")
        continue;
      component.entityDeleted(entity, true);
    }
    return entityContainer.removeEntity(entity);
  }
  function removeEntityWithChildren2(entity) {
    return removeEntityWithChildren({ removeEntity, defineComponentFromSchema, getEntitiesWith, defineComponent }, entity);
  }
  function registerComponentDefinition(componentName, component) {
    if (sealed)
      throw new Error("Engine is already sealed. No components can be added at this stage");
    const componentId = componentNumberFromName(componentName);
    const prev = componentsDefinition.get(componentId);
    if (prev) {
      throw new Error(`Component number ${componentId} was already registered.`);
    }
    if (component.componentName !== componentName) {
      throw new Error(`Component name doesn't match componentDefinition.componentName ${componentName} != ${component.componentName}`);
    }
    if (component.componentId !== componentId) {
      throw new Error(`Component number doesn't match componentDefinition.componentId ${componentId} != ${component.componentId}`);
    }
    componentsDefinition.set(componentId, component);
    return component;
  }
  function defineComponentFromSchema(componentName, schema) {
    const componentId = componentNumberFromName(componentName);
    const prev = componentsDefinition.get(componentId);
    if (prev) {
      return prev;
    }
    if (sealed)
      throw new Error("Engine is already sealed. No components can be added at this stage");
    const newComponent = createComponentDefinitionFromSchema(componentName, componentId, schema);
    componentsDefinition.set(componentId, newComponent);
    return newComponent;
  }
  function defineValueSetComponentFromSchema(componentName, schema, options2) {
    const componentId = componentNumberFromName(componentName);
    const prev = componentsDefinition.get(componentId);
    if (prev) {
      return prev;
    }
    if (sealed)
      throw new Error("Engine is already sealed. No components can be added at this stage");
    const newComponent = createValueSetComponentDefinitionFromSchema(componentName, componentId, schema, options2);
    componentsDefinition.set(componentId, newComponent);
    return newComponent;
  }
  function defineComponent(componentName, mapSpec, constructorDefault) {
    const componentId = componentNumberFromName(componentName);
    const prev = componentsDefinition.get(componentId);
    if (prev) {
      return prev;
    }
    if (sealed)
      throw new Error("Engine is already sealed. No components can be added at this stage");
    const schemaSpec = Schemas.Map(mapSpec, constructorDefault);
    const def = createComponentDefinitionFromSchema(componentName, componentId, schemaSpec);
    const newComponent = {
      ...def,
      create(entity, val) {
        return def.create(entity, val);
      },
      createOrReplace(entity, val) {
        return def.createOrReplace(entity, val);
      }
    };
    componentsDefinition.set(componentId, newComponent);
    return newComponent;
  }
  function getComponent2(componentIdOrName) {
    const componentId = typeof componentIdOrName === "number" ? componentIdOrName : componentNumberFromName(componentIdOrName);
    const component = componentsDefinition.get(componentId);
    if (!component) {
      throw new Error(`Component ${componentIdOrName} not found. You need to declare the components at the beginnig of the engine declaration`);
    }
    return component;
  }
  function getComponentOrNull(componentIdOrName) {
    const componentId = typeof componentIdOrName === "number" ? componentIdOrName : componentNumberFromName(componentIdOrName);
    return componentsDefinition.get(componentId) ?? /* istanbul ignore next */
    null;
  }
  function* getEntitiesWith(...components) {
    for (const [entity, ...groupComp] of getComponentDefGroup(...components)) {
      yield [entity, ...groupComp.map((c) => c.get(entity))];
    }
  }
  function getEntityOrNullByName(value) {
    const NameComponent = Name({ defineComponent });
    for (const [entity, name] of getEntitiesWith(NameComponent)) {
      if (name.value === value)
        return entity;
    }
    return null;
  }
  function* getComponentDefGroup(...args) {
    const [firstComponentDef, ...componentDefinitions] = args;
    for (const [entity] of firstComponentDef.iterator()) {
      let matches = true;
      for (const componentDef of componentDefinitions) {
        if (!componentDef.has(entity)) {
          matches = false;
          break;
        }
      }
      if (matches) {
        yield [entity, ...args];
      }
    }
  }
  function getSystems() {
    return systems.getSystems();
  }
  function componentsIter() {
    return componentsDefinition.values();
  }
  function removeComponentDefinition(componentIdOrName) {
    if (sealed)
      throw new Error("Engine is already sealed. No components can be removed at this stage");
    const componentId = typeof componentIdOrName === "number" ? componentIdOrName : componentNumberFromName(componentIdOrName);
    componentsDefinition.delete(componentId);
  }
  Transform({ defineComponentFromSchema });
  function seal() {
    if (!sealed) {
      sealed = true;
    }
  }
  return {
    addEntity,
    removeEntity,
    removeEntityWithChildren: removeEntityWithChildren2,
    addSystem,
    getSystems,
    removeSystem,
    defineComponent,
    defineComponentFromSchema,
    defineValueSetComponentFromSchema,
    getEntitiesWith,
    getComponent: getComponent2,
    getComponentOrNull,
    getEntityOrNullByName,
    removeComponentDefinition,
    registerComponentDefinition,
    entityContainer,
    componentsIter,
    seal
  };
}
function Engine(options) {
  const partialEngine = preEngine(options);
  const onChangeFunction = (entity, operation, component, componentValue) => {
    if (operation === CrdtMessageType.DELETE_ENTITY) {
      for (const component2 of partialEngine.componentsIter()) {
        component2?.__onChangeCallbacks(entity, void 0);
      }
    } else {
      component?.__onChangeCallbacks(entity, componentValue);
    }
    return options?.onChangeFunction(entity, operation, component, componentValue);
  };
  const crdtSystem = crdtSceneSystem(partialEngine, onChangeFunction);
  async function update(dt) {
    await crdtSystem.receiveMessages();
    for (const system of partialEngine.getSystems()) {
      const ret = system.fn(dt);
      checkNotThenable(ret, `A system (${system.name || "anonymous"}) returned a thenable. Systems cannot be async functions. Documentation: https://dcl.gg/sdk/sync-systems`);
    }
    const deletedEntites = partialEngine.entityContainer.releaseRemovedEntities();
    await crdtSystem.sendMessages(deletedEntites);
  }
  return {
    _id: Date.now(),
    addEntity: partialEngine.addEntity,
    removeEntity: partialEngine.removeEntity,
    removeEntityWithChildren: partialEngine.removeEntityWithChildren,
    addSystem: partialEngine.addSystem,
    removeSystem: partialEngine.removeSystem,
    defineComponent: partialEngine.defineComponent,
    defineComponentFromSchema: partialEngine.defineComponentFromSchema,
    defineValueSetComponentFromSchema: partialEngine.defineValueSetComponentFromSchema,
    registerComponentDefinition: partialEngine.registerComponentDefinition,
    getEntitiesWith: partialEngine.getEntitiesWith,
    getComponent: partialEngine.getComponent,
    getComponentOrNull: partialEngine.getComponentOrNull,
    removeComponentDefinition: partialEngine.removeComponentDefinition,
    componentsIter: partialEngine.componentsIter,
    seal: partialEngine.seal,
    getEntityOrNullByName: partialEngine.getEntityOrNullByName,
    update,
    RootEntity: 0,
    PlayerEntity: 1,
    CameraEntity: 2,
    getEntityState: partialEngine.entityContainer.getEntityState,
    addTransport: crdtSystem.addTransport,
    entityContainer: partialEngine.entityContainer
  };
}

// node_modules/@dcl/ecs/dist/systems/events.js
var getDefaultOpts = (opts = {}) => ({
  button: 3,
  ...opts
});
function createPointerEventsSystem(engine2, inputSystem2) {
  const PointerEvents2 = PointerEvents(engine2);
  let EventType;
  (function(EventType2) {
    EventType2[EventType2["Click"] = 0] = "Click";
    EventType2[EventType2["Down"] = 1] = "Down";
    EventType2[EventType2["Up"] = 2] = "Up";
  })(EventType || (EventType = {}));
  const eventsMap = /* @__PURE__ */ new Map();
  function getEvent(entity) {
    return eventsMap.get(entity) || eventsMap.set(entity, /* @__PURE__ */ new Map()).get(entity);
  }
  function setPointerEvent(entity, type, opts) {
    const pointerEvent = PointerEvents2.getMutableOrNull(entity) || PointerEvents2.create(entity);
    pointerEvent.pointerEvents.push({
      eventType: type,
      eventInfo: {
        button: opts.button,
        showFeedback: opts.showFeedback,
        showHighlight: opts.showHighlight,
        hoverText: opts.hoverText,
        maxDistance: opts.maxDistance
      }
    });
  }
  function removePointerEvent(entity, type, button) {
    const pointerEvent = PointerEvents2.getMutableOrNull(entity);
    if (!pointerEvent)
      return;
    pointerEvent.pointerEvents = pointerEvent.pointerEvents.filter((pointer) => !(pointer.eventInfo?.button === button && pointer.eventType === type));
  }
  function getPointerEvent(eventType) {
    if (eventType === EventType.Up) {
      return 0;
    }
    return 1;
  }
  function removeEvent(entity, type) {
    const event = getEvent(entity);
    const pointerEvent = event.get(type);
    if (pointerEvent?.opts.hoverText) {
      removePointerEvent(entity, getPointerEvent(type), pointerEvent.opts.button);
    }
    event.delete(type);
  }
  engine2.addSystem(function EventSystem() {
    for (const [entity, event] of eventsMap) {
      if (engine2.getEntityState(entity) === EntityState.Removed) {
        eventsMap.delete(entity);
        continue;
      }
      for (const [eventType, { cb, opts }] of event) {
        if (eventType === EventType.Click) {
          const command = inputSystem2.getClick(opts.button, entity);
          if (command)
            checkNotThenable(cb(command.up), "Click event returned a thenable. Only synchronous functions are allowed");
        }
        if (eventType === EventType.Down || eventType === EventType.Up) {
          const command = inputSystem2.getInputCommand(opts.button, getPointerEvent(eventType), entity);
          if (command) {
            checkNotThenable(cb(command), "Event handler returned a thenable. Only synchronous functions are allowed");
          }
        }
      }
    }
  });
  const onPointerDown = (...args) => {
    const [data, cb, maybeOpts] = args;
    if (typeof data === "number") {
      return onPointerDown({ entity: data, opts: maybeOpts ?? {} }, cb);
    }
    const { entity, opts } = data;
    const options = getDefaultOpts(opts);
    removeEvent(entity, EventType.Down);
    getEvent(entity).set(EventType.Down, { cb, opts: options });
    setPointerEvent(entity, 1, options);
  };
  const onPointerUp = (...args) => {
    const [data, cb, maybeOpts] = args;
    if (typeof data === "number") {
      return onPointerUp({ entity: data, opts: maybeOpts ?? {} }, cb);
    }
    const { entity, opts } = data;
    const options = getDefaultOpts(opts);
    removeEvent(entity, EventType.Up);
    getEvent(entity).set(EventType.Up, { cb, opts: options });
    setPointerEvent(entity, 0, options);
  };
  return {
    removeOnClick(entity) {
      removeEvent(entity, EventType.Click);
    },
    removeOnPointerDown(entity) {
      removeEvent(entity, EventType.Down);
    },
    removeOnPointerUp(entity) {
      removeEvent(entity, EventType.Up);
    },
    onClick(value, cb) {
      const { entity } = value;
      const options = getDefaultOpts(value.opts);
      removeEvent(entity, EventType.Click);
      getEvent(entity).set(EventType.Click, { cb, opts: options });
      setPointerEvent(entity, 1, options);
    },
    onPointerDown,
    onPointerUp
  };
}

// node_modules/@dcl/ecs/dist/systems/tween.js
var cacheTween = /* @__PURE__ */ new Map();
function createTweenSystem(engine2) {
  if (cacheTween.has(engine2._id)) {
    return cacheTween.get(engine2._id);
  }
  const Tween4 = Tween2(engine2);
  const TweenState3 = TweenState(engine2);
  const TweenSequence3 = TweenSequence(engine2);
  const cache = /* @__PURE__ */ new Map();
  function isCompleted(entity) {
    const tweenState = TweenState3.getOrNull(entity);
    const tween = Tween4.getOrNull(entity);
    const tweenCache = cache.get(entity);
    if (!tweenState || !tween)
      return false;
    if (
      // Renderer notified that the tween is completed
      (tweenChanged(entity) || tweenState.state === 1) && // Avoid sending isCompleted multiple times
      !tweenCache?.completed && // Amount of frames needed to consider a tween completed
      (tweenCache?.frames ?? 0) > 2
    ) {
      return true;
    }
    return false;
  }
  function tweenChanged(entity) {
    const currentTween = Tween4.getOrNull(entity);
    const prevTween = cache.get(entity)?.tween;
    if (currentTween && !prevTween || !currentTween && prevTween) {
      return true;
    }
    const currentBuff = new ReadWriteByteBuffer();
    Tween4.schema.serialize(currentTween, currentBuff);
    const equal = dataCompare(currentBuff.toBinary(), prevTween);
    return equal;
  }
  const restartTweens = [];
  engine2.addSystem(() => {
    for (const restart of restartTweens) {
      restart();
    }
    restartTweens.length = 0;
    for (const [entity, tween] of engine2.getEntitiesWith(Tween4)) {
      if (tweenChanged(entity)) {
        const buffer2 = new ReadWriteByteBuffer();
        Tween4.schema.serialize(tween, buffer2);
        cache.set(entity, {
          tween: buffer2.toBinary(),
          frames: 0,
          completed: false,
          changed: true
        });
        continue;
      }
      const tweenCache = cache.get(entity);
      tweenCache.frames += 1;
      tweenCache.changed = false;
      if (isCompleted(entity)) {
        tweenCache.frames = 0;
        tweenCache.completed = true;
        const tweenSequence = TweenSequence3.getOrNull(entity);
        if (!tweenSequence)
          continue;
        const { sequence } = tweenSequence;
        if (sequence && sequence.length) {
          const [nextTweenSequence, ...otherTweens] = sequence;
          Tween4.createOrReplace(entity, nextTweenSequence);
          const mutableTweenHelper = TweenSequence3.getMutable(entity);
          mutableTweenHelper.sequence = otherTweens;
          if (tweenSequence.loop === 0) {
            mutableTweenHelper.sequence.push(tween);
          }
        } else if (tweenSequence.loop === 1) {
          Tween4.createOrReplace(entity, backwardsTween(tween));
        } else if (tweenSequence.loop === 0) {
          Tween4.deleteFrom(entity);
          cache.delete(entity);
          restartTweens.push(() => {
            Tween4.createOrReplace(entity, tween);
          });
        }
      }
    }
  }, Number.NEGATIVE_INFINITY);
  function backwardsTween(tween) {
    if (tween.mode?.$case === "move" && tween.mode.move) {
      return { ...tween, mode: { ...tween.mode, move: { start: tween.mode.move.end, end: tween.mode.move.start } } };
    }
    if (tween.mode?.$case === "rotate" && tween.mode.rotate) {
      return {
        ...tween,
        mode: { ...tween.mode, rotate: { start: tween.mode.rotate.end, end: tween.mode.rotate.start } }
      };
    }
    if (tween.mode?.$case === "scale" && tween.mode.scale) {
      return { ...tween, mode: { ...tween.mode, scale: { start: tween.mode.scale.end, end: tween.mode.scale.start } } };
    }
    throw new Error("Invalid tween");
  }
  const tweenSystem2 = {
    // This event is fired only once per tween
    tweenCompleted: isCompleted
  };
  cacheTween.set(engine2._id, tweenSystem2);
  return tweenSystem2;
}

// node_modules/@dcl/ecs/dist/systems/pointer-event-collider-checker.js
function pointerEventColliderChecker(engine2) {
  const PointerEvents2 = PointerEvents(engine2);
  const MeshCollider4 = MeshCollider2(engine2);
  const GltfContainer3 = GltfContainer(engine2);
  const UiTransform3 = UiTransform(engine2);
  const alreadyShownlog = /* @__PURE__ */ new Set();
  let timer = 0;
  function systemChecker(dt) {
    timer += dt;
    if (timer <= 10) {
      return;
    }
    timer = 0;
    for (const [entity] of engine2.getEntitiesWith(PointerEvents2)) {
      if (alreadyShownlog.has(entity))
        continue;
      if (GltfContainer3.has(entity))
        continue;
      if (UiTransform3.has(entity))
        continue;
      const mesh = MeshCollider4.getOrNull(entity);
      if (mesh) {
        if (mesh.collisionMask === void 0 || mesh.collisionMask & 1) {
          continue;
        }
      }
      alreadyShownlog.add(entity);
      console.log(`\u26A0\uFE0F Missing MeshCollider component on entity ${entity}. Add a MeshCollider to the entity so it can be clickeable by the player.
See https://docs.decentraland.org/creator/development-guide/sdk7/colliders/#pointer-blocking`);
    }
  }
  engine2.removeSystem(systemChecker);
  engine2.addSystem(systemChecker);
}

// node_modules/@dcl/ecs/dist/runtime/initialization/index.js
var engine = /* @__PURE__ */ Engine();
var inputSystem = /* @__PURE__ */ createInputSystem(engine);
var pointerEventsSystem = /* @__PURE__ */ createPointerEventsSystem(engine, inputSystem);
var tweenSystem = createTweenSystem(engine);
pointerEventColliderChecker(engine);

// node_modules/@dcl/ecs/dist/components/generated/global.gen.js
var AudioEvent2 = /* @__PURE__ */ AudioEvent(engine);
var AvatarBase2 = /* @__PURE__ */ AvatarBase(engine);
var AvatarEmoteCommand2 = /* @__PURE__ */ AvatarEmoteCommand(engine);
var AvatarEquippedData2 = /* @__PURE__ */ AvatarEquippedData(engine);
var EngineInfo2 = /* @__PURE__ */ EngineInfo(engine);
var GltfContainer2 = /* @__PURE__ */ GltfContainer(engine);
var GltfContainerLoadingState2 = /* @__PURE__ */ GltfContainerLoadingState(engine);
var PlayerIdentityData2 = /* @__PURE__ */ PlayerIdentityData(engine);
var PointerEventsResult2 = /* @__PURE__ */ PointerEventsResult(engine);
var RaycastResult2 = /* @__PURE__ */ RaycastResult(engine);
var RealmInfo2 = /* @__PURE__ */ RealmInfo(engine);
var TweenSequence2 = /* @__PURE__ */ TweenSequence(engine);
var TweenState2 = /* @__PURE__ */ TweenState(engine);
var UiDropdown2 = /* @__PURE__ */ UiDropdown(engine);
var UiDropdownResult2 = /* @__PURE__ */ UiDropdownResult(engine);
var UiInput2 = /* @__PURE__ */ UiInput(engine);
var UiInputResult2 = /* @__PURE__ */ UiInputResult(engine);
var UiText2 = /* @__PURE__ */ UiText(engine);
var UiTransform2 = /* @__PURE__ */ UiTransform(engine);
var VideoEvent2 = /* @__PURE__ */ VideoEvent(engine);
var VideoPlayer2 = /* @__PURE__ */ VideoPlayer(engine);

// node_modules/@dcl/ecs/dist/components/generated/pb/decentraland/sdk/components/common/camera_type.gen.js
var CameraType;
(function(CameraType2) {
  CameraType2[CameraType2["CT_FIRST_PERSON"] = 0] = "CT_FIRST_PERSON";
  CameraType2[CameraType2["CT_THIRD_PERSON"] = 1] = "CT_THIRD_PERSON";
  CameraType2[CameraType2["CT_CINEMATIC"] = 2] = "CT_CINEMATIC";
})(CameraType || (CameraType = {}));

// node_modules/@dcl/ecs/dist/components/generated/pb/decentraland/sdk/components/common/input_action.gen.js
var InputAction;
(function(InputAction2) {
  InputAction2[InputAction2["IA_POINTER"] = 0] = "IA_POINTER";
  InputAction2[InputAction2["IA_PRIMARY"] = 1] = "IA_PRIMARY";
  InputAction2[InputAction2["IA_SECONDARY"] = 2] = "IA_SECONDARY";
  InputAction2[InputAction2["IA_ANY"] = 3] = "IA_ANY";
  InputAction2[InputAction2["IA_FORWARD"] = 4] = "IA_FORWARD";
  InputAction2[InputAction2["IA_BACKWARD"] = 5] = "IA_BACKWARD";
  InputAction2[InputAction2["IA_RIGHT"] = 6] = "IA_RIGHT";
  InputAction2[InputAction2["IA_LEFT"] = 7] = "IA_LEFT";
  InputAction2[InputAction2["IA_JUMP"] = 8] = "IA_JUMP";
  InputAction2[InputAction2["IA_WALK"] = 9] = "IA_WALK";
  InputAction2[InputAction2["IA_ACTION_3"] = 10] = "IA_ACTION_3";
  InputAction2[InputAction2["IA_ACTION_4"] = 11] = "IA_ACTION_4";
  InputAction2[InputAction2["IA_ACTION_5"] = 12] = "IA_ACTION_5";
  InputAction2[InputAction2["IA_ACTION_6"] = 13] = "IA_ACTION_6";
})(InputAction || (InputAction = {}));
var PointerEventType;
(function(PointerEventType2) {
  PointerEventType2[PointerEventType2["PET_UP"] = 0] = "PET_UP";
  PointerEventType2[PointerEventType2["PET_DOWN"] = 1] = "PET_DOWN";
  PointerEventType2[PointerEventType2["PET_HOVER_ENTER"] = 2] = "PET_HOVER_ENTER";
  PointerEventType2[PointerEventType2["PET_HOVER_LEAVE"] = 3] = "PET_HOVER_LEAVE";
})(PointerEventType || (PointerEventType = {}));

// node_modules/@dcl/ecs/dist/components/generated/pb/decentraland/sdk/components/common/loading_state.gen.js
var LoadingState;
(function(LoadingState2) {
  LoadingState2[LoadingState2["UNKNOWN"] = 0] = "UNKNOWN";
  LoadingState2[LoadingState2["LOADING"] = 1] = "LOADING";
  LoadingState2[LoadingState2["NOT_FOUND"] = 2] = "NOT_FOUND";
  LoadingState2[LoadingState2["FINISHED_WITH_ERROR"] = 3] = "FINISHED_WITH_ERROR";
  LoadingState2[LoadingState2["FINISHED"] = 4] = "FINISHED";
})(LoadingState || (LoadingState = {}));

// node_modules/@dcl/ecs/dist/components/generated/pb/decentraland/sdk/components/common/texts.gen.js
var TextAlignMode;
(function(TextAlignMode2) {
  TextAlignMode2[TextAlignMode2["TAM_TOP_LEFT"] = 0] = "TAM_TOP_LEFT";
  TextAlignMode2[TextAlignMode2["TAM_TOP_CENTER"] = 1] = "TAM_TOP_CENTER";
  TextAlignMode2[TextAlignMode2["TAM_TOP_RIGHT"] = 2] = "TAM_TOP_RIGHT";
  TextAlignMode2[TextAlignMode2["TAM_MIDDLE_LEFT"] = 3] = "TAM_MIDDLE_LEFT";
  TextAlignMode2[TextAlignMode2["TAM_MIDDLE_CENTER"] = 4] = "TAM_MIDDLE_CENTER";
  TextAlignMode2[TextAlignMode2["TAM_MIDDLE_RIGHT"] = 5] = "TAM_MIDDLE_RIGHT";
  TextAlignMode2[TextAlignMode2["TAM_BOTTOM_LEFT"] = 6] = "TAM_BOTTOM_LEFT";
  TextAlignMode2[TextAlignMode2["TAM_BOTTOM_CENTER"] = 7] = "TAM_BOTTOM_CENTER";
  TextAlignMode2[TextAlignMode2["TAM_BOTTOM_RIGHT"] = 8] = "TAM_BOTTOM_RIGHT";
})(TextAlignMode || (TextAlignMode = {}));
var Font;
(function(Font3) {
  Font3[Font3["F_SANS_SERIF"] = 0] = "F_SANS_SERIF";
  Font3[Font3["F_SERIF"] = 1] = "F_SERIF";
  Font3[Font3["F_MONOSPACE"] = 2] = "F_MONOSPACE";
})(Font || (Font = {}));

// node_modules/@dcl/ecs/dist/composite/components.js
function getCompositeRootComponent(engine2) {
  const component = engine2.getComponentOrNull("composite::root");
  if (component) {
    return component;
  }
  return engine2.defineComponent("composite::root", {
    src: Schemas.String,
    entities: Schemas.Array(Schemas.Map({
      src: Schemas.Entity,
      dest: Schemas.Entity
    }))
  });
}

// node_modules/@dcl/ecs/dist/composite/path.js
var currentWorkingDir = "/";
function normalizeStringPosix(path, allowAboveRoot = false) {
  let res = "";
  let lastSegmentLength = 0;
  let lastSlash = -1;
  let dots = 0;
  let code;
  for (let i = 0; i <= path.length; ++i) {
    if (i < path.length)
      code = path.charCodeAt(i);
    else if (code === 47)
      break;
    else
      code = 47;
    if (code === 47) {
      if (lastSlash === i - 1 || dots === 1) {
      } else if (lastSlash !== i - 1 && dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 || res.charCodeAt(res.length - 2) !== 46) {
          if (res.length > 2) {
            const lastSlashIndex = res.lastIndexOf("/");
            if (lastSlashIndex !== res.length - 1) {
              if (lastSlashIndex === -1) {
                res = "";
                lastSegmentLength = 0;
              } else {
                res = res.slice(0, lastSlashIndex);
                lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
              }
              lastSlash = i;
              dots = 0;
              continue;
            }
          } else if (res.length === 2 || res.length === 1) {
            res = "";
            lastSegmentLength = 0;
            lastSlash = i;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          if (res.length > 0)
            res += "/..";
          else
            res = "..";
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0)
          res += "/" + path.slice(lastSlash + 1, i);
        else
          res = path.slice(lastSlash + 1, i);
        lastSegmentLength = i - lastSlash - 1;
      }
      lastSlash = i;
      dots = 0;
    } else if (code === 46 && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}
function resolve(...args) {
  let resolvedPath = "";
  let resolvedAbsolute = false;
  let cwd;
  for (let i = args.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    let path;
    if (i >= 0)
      path = args[i];
    else {
      if (cwd === void 0)
        cwd = currentWorkingDir;
      path = cwd;
    }
    if (path.length === 0) {
      continue;
    }
    resolvedPath = path + "/" + resolvedPath;
    resolvedAbsolute = path.charCodeAt(0) === 47;
  }
  resolvedPath = normalizeStringPosix(resolvedPath, !resolvedAbsolute);
  if (resolvedAbsolute) {
    if (resolvedPath.length > 0)
      return "/" + resolvedPath;
    else
      return "/";
  } else if (resolvedPath.length > 0) {
    return resolvedPath;
  } else {
    return ".";
  }
}
function dirname(path) {
  if (path.length === 0)
    return ".";
  let code = path.charCodeAt(0);
  const hasRoot = code === 47;
  let end = -1;
  let matchedSlash = true;
  for (let i = path.length - 1; i >= 1; --i) {
    code = path.charCodeAt(i);
    if (code === 47) {
      if (!matchedSlash) {
        end = i;
        break;
      }
    } else {
      matchedSlash = false;
    }
  }
  if (end === -1)
    return hasRoot ? "/" : ".";
  if (hasRoot && end === 1)
    return "//";
  return path.slice(0, end);
}
function resolveComposite(path, cwd) {
  const absolutePath = path.startsWith(".") ? resolve(cwd, path) : resolve(path);
  return absolutePath.substring(1);
}

// node_modules/@dcl/ecs/dist/composite/instance.js
var EntityMappingMode;
(function(EntityMappingMode2) {
  EntityMappingMode2[EntityMappingMode2["EMM_NONE"] = 0] = "EMM_NONE";
  EntityMappingMode2[EntityMappingMode2["EMM_NEXT_AVAILABLE"] = 1] = "EMM_NEXT_AVAILABLE";
  EntityMappingMode2[EntityMappingMode2["EMM_DIRECT_MAPPING"] = 2] = "EMM_DIRECT_MAPPING";
})(EntityMappingMode || (EntityMappingMode = {}));
function getComponentValue(componentDefinition, component) {
  if (component.data?.$case === "json") {
    return component.data.json;
  } else {
    return componentDefinition.schema.deserialize(new ReadWriteByteBuffer(component.data?.binary));
  }
}
function getComponentDefinition(engine2, component) {
  const existingComponentDefinition = engine2.getComponentOrNull(component.name);
  if (!existingComponentDefinition) {
    if (component.name.startsWith("core::")) {
      if (component.name in componentDefinitionByName) {
        return componentDefinitionByName[component.name](engine2);
      } else {
        throw new Error(`The core component ${component.name} was not found.`);
      }
    } else if (component.jsonSchema) {
      return engine2.defineComponentFromSchema(component.name, Schemas.fromJson(component.jsonSchema));
    } else {
      throw new Error(`${component.name} is not defined and there is no schema to define it.`);
    }
  } else {
    return existingComponentDefinition;
  }
}
function getEntityMapping(engine2, compositeEntity, mappedEntities, { entityMapping }) {
  const existingEntity = mappedEntities.get(compositeEntity);
  if (existingEntity) {
    return existingEntity;
  }
  if (entityMapping?.type === EntityMappingMode.EMM_DIRECT_MAPPING) {
    const entity = entityMapping.getCompositeEntity(compositeEntity);
    mappedEntities.set(compositeEntity, entity);
    return entity;
  }
  const newEntity = entityMapping?.type === EntityMappingMode.EMM_NEXT_AVAILABLE ? entityMapping.getNextAvailableEntity() : engine2.addEntity();
  if (newEntity === null) {
    throw new Error("There is no more entities to allocate");
  }
  mappedEntities.set(compositeEntity, newEntity);
  return newEntity;
}
function instanceComposite(engine2, compositeResource, compositeProvider2, options) {
  const { rootEntity, alreadyRequestedSrc: optionalAlreadyRequestedSrc, entityMapping } = options;
  const alreadyRequestedSrc = optionalAlreadyRequestedSrc || /* @__PURE__ */ new Set();
  const compositeDirectoryPath = dirname(resolve(compositeResource.src));
  const TransformComponentNumber = componentNumberFromName("core::Transform");
  const CompositeRootComponent = getCompositeRootComponent(engine2);
  const mappedEntities = /* @__PURE__ */ new Map();
  const getCompositeEntity = (compositeEntity) => getEntityMapping(engine2, compositeEntity, mappedEntities, options);
  const compositeRootEntity = rootEntity ?? getCompositeEntity(0);
  if (rootEntity) {
    mappedEntities.set(0, rootEntity);
  }
  const childrenComposite = compositeResource.composite.components.find((item) => item.name === CompositeRootComponent.componentName);
  if (childrenComposite) {
    for (const [childCompositeEntity, compositeRawData] of childrenComposite.data) {
      const childComposite = getComponentValue(CompositeRootComponent, compositeRawData);
      const childCompositePath = resolveComposite(childComposite.src, compositeDirectoryPath);
      const childCompositeResource = compositeProvider2.getCompositeOrNull(childCompositePath);
      const targetEntity = getCompositeEntity(childCompositeEntity);
      if (childCompositeResource) {
        if (alreadyRequestedSrc.has(childCompositeResource.src) || childCompositeResource.src === compositeResource.src) {
          throw new Error(`Composite ${compositeResource.src} has a recursive instanciation while try to instance ${childCompositeResource.src}. Previous instances: ${alreadyRequestedSrc.toString()}`);
        }
        instanceComposite(engine2, childCompositeResource, compositeProvider2, {
          rootEntity: targetEntity,
          alreadyRequestedSrc: new Set(alreadyRequestedSrc).add(childCompositeResource.src),
          entityMapping: entityMapping?.type === EntityMappingMode.EMM_NEXT_AVAILABLE ? entityMapping : void 0
        });
      }
    }
  }
  for (const component of compositeResource.composite.components) {
    if (component.name === CompositeRootComponent.componentName)
      continue;
    const componentDefinition = getComponentDefinition(engine2, component);
    for (const [entity, compositeComponentValue] of component.data) {
      const componentValueDeserialized = getComponentValue(componentDefinition, compositeComponentValue);
      const targetEntity = getCompositeEntity(entity);
      const componentValue = componentDefinition.create(targetEntity, componentValueDeserialized);
      if (componentDefinition.componentId === TransformComponentNumber) {
        const transform = componentValue;
        if (transform.parent) {
          transform.parent = getCompositeEntity(transform.parent);
        } else {
          transform.parent = getCompositeEntity(0);
        }
      } else {
        Schemas.mutateNestedValues(componentDefinition.schema.jsonSchema, componentValue, (value, valueType) => {
          if (valueType.serializationType === "entity") {
            return { changed: true, value: getCompositeEntity(value) };
          } else {
            return { changed: false };
          }
        });
      }
    }
  }
  const composite = CompositeRootComponent.getMutableOrNull(compositeRootEntity) || CompositeRootComponent.create(compositeRootEntity);
  for (const [entitySource, targetEntity] of mappedEntities) {
    composite.entities.push({
      src: entitySource,
      dest: targetEntity
    });
  }
  composite.src = compositeResource.src;
  return compositeRootEntity;
}

// node_modules/@dcl/ecs/dist/composite/proto/gen/composite.gen.js
var import_minimal53 = __toESM(require_minimal2());

// node_modules/@dcl/ecs/dist/composite/proto/gen/google/protobuf/struct.gen.js
var import_minimal52 = __toESM(require_minimal2());
var NullValue;
(function(NullValue2) {
  NullValue2[NullValue2["NULL_VALUE"] = 0] = "NULL_VALUE";
})(NullValue || (NullValue = {}));
function nullValueFromJSON(object) {
  switch (object) {
    case 0:
    case "NULL_VALUE":
      return 0;
    default:
      throw new tsProtoGlobalThis2.Error("Unrecognized enum value " + object + " for enum NullValue");
  }
}
function nullValueToJSON(object) {
  switch (object) {
    case 0:
      return "NULL_VALUE";
    default:
      throw new tsProtoGlobalThis2.Error("Unrecognized enum value " + object + " for enum NullValue");
  }
}
function createBaseStruct() {
  return { fields: /* @__PURE__ */ new Map() };
}
var Struct;
(function(Struct2) {
  function encode(message, writer = import_minimal52.default.Writer.create()) {
    message.fields.forEach((value, key) => {
      if (value !== void 0) {
        Struct_FieldsEntry.encode({ key, value }, writer.uint32(10).fork()).ldelim();
      }
    });
    return writer;
  }
  Struct2.encode = encode;
  function decode(input, length2) {
    const reader = input instanceof import_minimal52.default.Reader ? input : import_minimal52.default.Reader.create(input);
    let end = length2 === void 0 ? reader.len : reader.pos + length2;
    const message = createBaseStruct();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }
          const entry1 = Struct_FieldsEntry.decode(reader, reader.uint32());
          if (entry1.value !== void 0) {
            message.fields.set(entry1.key, entry1.value);
          }
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  }
  Struct2.decode = decode;
  function fromJSON(object) {
    return {
      fields: isObject(object.fields) ? Object.entries(object.fields).reduce((acc, [key, value]) => {
        acc.set(key, value);
        return acc;
      }, /* @__PURE__ */ new Map()) : /* @__PURE__ */ new Map()
    };
  }
  Struct2.fromJSON = fromJSON;
  function toJSON(message) {
    const obj = {};
    obj.fields = {};
    if (message.fields) {
      message.fields.forEach((v, k) => {
        obj.fields[k] = v;
      });
    }
    return obj;
  }
  Struct2.toJSON = toJSON;
  function wrap(object) {
    const struct = createBaseStruct();
    if (object !== void 0) {
      Object.keys(object).forEach((key) => {
        struct.fields.set(key, object[key]);
      });
    }
    return struct;
  }
  Struct2.wrap = wrap;
  function unwrap(message) {
    const object = {};
    [...message.fields.keys()].forEach((key) => {
      object[key] = message.fields.get(key);
    });
    return object;
  }
  Struct2.unwrap = unwrap;
})(Struct || (Struct = {}));
function createBaseStruct_FieldsEntry() {
  return { key: "", value: void 0 };
}
var Struct_FieldsEntry;
(function(Struct_FieldsEntry2) {
  function encode(message, writer = import_minimal52.default.Writer.create()) {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== void 0) {
      Value.encode(Value.wrap(message.value), writer.uint32(18).fork()).ldelim();
    }
    return writer;
  }
  Struct_FieldsEntry2.encode = encode;
  function decode(input, length2) {
    const reader = input instanceof import_minimal52.default.Reader ? input : import_minimal52.default.Reader.create(input);
    let end = length2 === void 0 ? reader.len : reader.pos + length2;
    const message = createBaseStruct_FieldsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }
          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }
          message.value = Value.unwrap(Value.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  }
  Struct_FieldsEntry2.decode = decode;
  function fromJSON(object) {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object?.value) ? object.value : void 0 };
  }
  Struct_FieldsEntry2.fromJSON = fromJSON;
  function toJSON(message) {
    const obj = {};
    message.key !== void 0 && (obj.key = message.key);
    message.value !== void 0 && (obj.value = message.value);
    return obj;
  }
  Struct_FieldsEntry2.toJSON = toJSON;
})(Struct_FieldsEntry || (Struct_FieldsEntry = {}));
function createBaseValue() {
  return { kind: void 0 };
}
var Value;
(function(Value2) {
  function encode(message, writer = import_minimal52.default.Writer.create()) {
    switch (message.kind?.$case) {
      case "nullValue":
        writer.uint32(8).int32(message.kind.nullValue);
        break;
      case "numberValue":
        writer.uint32(17).double(message.kind.numberValue);
        break;
      case "stringValue":
        writer.uint32(26).string(message.kind.stringValue);
        break;
      case "boolValue":
        writer.uint32(32).bool(message.kind.boolValue);
        break;
      case "structValue":
        Struct.encode(Struct.wrap(message.kind.structValue), writer.uint32(42).fork()).ldelim();
        break;
      case "listValue":
        ListValue.encode(ListValue.wrap(message.kind.listValue), writer.uint32(50).fork()).ldelim();
        break;
    }
    return writer;
  }
  Value2.encode = encode;
  function decode(input, length2) {
    const reader = input instanceof import_minimal52.default.Reader ? input : import_minimal52.default.Reader.create(input);
    let end = length2 === void 0 ? reader.len : reader.pos + length2;
    const message = createBaseValue();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }
          message.kind = { $case: "nullValue", nullValue: reader.int32() };
          continue;
        case 2:
          if (tag !== 17) {
            break;
          }
          message.kind = { $case: "numberValue", numberValue: reader.double() };
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }
          message.kind = { $case: "stringValue", stringValue: reader.string() };
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }
          message.kind = { $case: "boolValue", boolValue: reader.bool() };
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }
          message.kind = { $case: "structValue", structValue: Struct.unwrap(Struct.decode(reader, reader.uint32())) };
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }
          message.kind = { $case: "listValue", listValue: ListValue.unwrap(ListValue.decode(reader, reader.uint32())) };
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  }
  Value2.decode = decode;
  function fromJSON(object) {
    return {
      kind: isSet(object.nullValue) ? { $case: "nullValue", nullValue: nullValueFromJSON(object.nullValue) } : isSet(object.numberValue) ? { $case: "numberValue", numberValue: Number(object.numberValue) } : isSet(object.stringValue) ? { $case: "stringValue", stringValue: String(object.stringValue) } : isSet(object.boolValue) ? { $case: "boolValue", boolValue: Boolean(object.boolValue) } : isSet(object.structValue) ? { $case: "structValue", structValue: object.structValue } : isSet(object.listValue) ? { $case: "listValue", listValue: [...object.listValue] } : void 0
    };
  }
  Value2.fromJSON = fromJSON;
  function toJSON(message) {
    const obj = {};
    message.kind?.$case === "nullValue" && (obj.nullValue = message.kind?.nullValue !== void 0 ? nullValueToJSON(message.kind?.nullValue) : void 0);
    message.kind?.$case === "numberValue" && (obj.numberValue = message.kind?.numberValue);
    message.kind?.$case === "stringValue" && (obj.stringValue = message.kind?.stringValue);
    message.kind?.$case === "boolValue" && (obj.boolValue = message.kind?.boolValue);
    message.kind?.$case === "structValue" && (obj.structValue = message.kind?.structValue);
    message.kind?.$case === "listValue" && (obj.listValue = message.kind?.listValue);
    return obj;
  }
  Value2.toJSON = toJSON;
  function wrap(value) {
    const result = createBaseValue();
    if (value === null) {
      result.kind = {
        $case: "nullValue",
        nullValue: 0
        /* NullValue.NULL_VALUE */
      };
    } else if (typeof value === "boolean") {
      result.kind = { $case: "boolValue", boolValue: value };
    } else if (typeof value === "number") {
      result.kind = { $case: "numberValue", numberValue: value };
    } else if (typeof value === "string") {
      result.kind = { $case: "stringValue", stringValue: value };
    } else if (Array.isArray(value)) {
      result.kind = { $case: "listValue", listValue: value };
    } else if (typeof value === "object") {
      result.kind = { $case: "structValue", structValue: value };
    } else if (typeof value !== "undefined") {
      throw new Error("Unsupported any value type: " + typeof value);
    }
    return result;
  }
  Value2.wrap = wrap;
  function unwrap(message) {
    if (message.kind?.$case === "nullValue") {
      return null;
    } else if (message.kind?.$case === "numberValue") {
      return message.kind?.numberValue;
    } else if (message.kind?.$case === "stringValue") {
      return message.kind?.stringValue;
    } else if (message.kind?.$case === "boolValue") {
      return message.kind?.boolValue;
    } else if (message.kind?.$case === "structValue") {
      return message.kind?.structValue;
    } else if (message.kind?.$case === "listValue") {
      return message.kind?.listValue;
    } else {
      return void 0;
    }
  }
  Value2.unwrap = unwrap;
})(Value || (Value = {}));
function createBaseListValue() {
  return { values: [] };
}
var ListValue;
(function(ListValue2) {
  function encode(message, writer = import_minimal52.default.Writer.create()) {
    for (const v of message.values) {
      Value.encode(Value.wrap(v), writer.uint32(10).fork()).ldelim();
    }
    return writer;
  }
  ListValue2.encode = encode;
  function decode(input, length2) {
    const reader = input instanceof import_minimal52.default.Reader ? input : import_minimal52.default.Reader.create(input);
    let end = length2 === void 0 ? reader.len : reader.pos + length2;
    const message = createBaseListValue();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }
          message.values.push(Value.unwrap(Value.decode(reader, reader.uint32())));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  }
  ListValue2.decode = decode;
  function fromJSON(object) {
    return { values: Array.isArray(object?.values) ? [...object.values] : [] };
  }
  ListValue2.fromJSON = fromJSON;
  function toJSON(message) {
    const obj = {};
    if (message.values) {
      obj.values = message.values.map((e) => e);
    } else {
      obj.values = [];
    }
    return obj;
  }
  ListValue2.toJSON = toJSON;
  function wrap(array) {
    const result = createBaseListValue();
    result.values = array ?? [];
    return result;
  }
  ListValue2.wrap = wrap;
  function unwrap(message) {
    if (message?.hasOwnProperty("values") && Array.isArray(message.values)) {
      return message.values;
    } else {
      return message;
    }
  }
  ListValue2.unwrap = unwrap;
})(ListValue || (ListValue = {}));
var tsProtoGlobalThis2 = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (false) {
    return void 0;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();
function isObject(value) {
  return typeof value === "object" && value !== null;
}
function isSet(value) {
  return value !== null && value !== void 0;
}

// node_modules/@dcl/ecs/dist/composite/proto/gen/composite.gen.js
function createBaseComponentData() {
  return { data: void 0 };
}
var ComponentData;
(function(ComponentData2) {
  function encode(message, writer = import_minimal53.default.Writer.create()) {
    switch (message.data?.$case) {
      case "json":
        Value.encode(Value.wrap(message.data.json), writer.uint32(10).fork()).ldelim();
        break;
      case "binary":
        writer.uint32(18).bytes(message.data.binary);
        break;
    }
    return writer;
  }
  ComponentData2.encode = encode;
  function decode(input, length2) {
    const reader = input instanceof import_minimal53.default.Reader ? input : import_minimal53.default.Reader.create(input);
    let end = length2 === void 0 ? reader.len : reader.pos + length2;
    const message = createBaseComponentData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }
          message.data = { $case: "json", json: Value.unwrap(Value.decode(reader, reader.uint32())) };
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }
          message.data = { $case: "binary", binary: reader.bytes() };
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  }
  ComponentData2.decode = decode;
  function fromJSON(object) {
    return {
      data: isSet2(object.json) ? { $case: "json", json: object.json } : isSet2(object.binary) ? { $case: "binary", binary: bytesFromBase64(object.binary) } : void 0
    };
  }
  ComponentData2.fromJSON = fromJSON;
  function toJSON(message) {
    const obj = {};
    message.data?.$case === "json" && (obj.json = message.data?.json);
    message.data?.$case === "binary" && (obj.binary = message.data?.binary !== void 0 ? base64FromBytes(message.data?.binary) : void 0);
    return obj;
  }
  ComponentData2.toJSON = toJSON;
})(ComponentData || (ComponentData = {}));
function createBaseCompositeComponent() {
  return { name: "", jsonSchema: void 0, data: /* @__PURE__ */ new Map() };
}
var CompositeComponent;
(function(CompositeComponent2) {
  function encode(message, writer = import_minimal53.default.Writer.create()) {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.jsonSchema !== void 0) {
      Value.encode(Value.wrap(message.jsonSchema), writer.uint32(18).fork()).ldelim();
    }
    message.data.forEach((value, key) => {
      CompositeComponent_DataEntry.encode({ key, value }, writer.uint32(26).fork()).ldelim();
    });
    return writer;
  }
  CompositeComponent2.encode = encode;
  function decode(input, length2) {
    const reader = input instanceof import_minimal53.default.Reader ? input : import_minimal53.default.Reader.create(input);
    let end = length2 === void 0 ? reader.len : reader.pos + length2;
    const message = createBaseCompositeComponent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }
          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }
          message.jsonSchema = Value.unwrap(Value.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }
          const entry3 = CompositeComponent_DataEntry.decode(reader, reader.uint32());
          if (entry3.value !== void 0) {
            message.data.set(entry3.key, entry3.value);
          }
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  }
  CompositeComponent2.decode = decode;
  function fromJSON(object) {
    return {
      name: isSet2(object.name) ? String(object.name) : "",
      jsonSchema: isSet2(object?.jsonSchema) ? object.jsonSchema : void 0,
      data: isObject2(object.data) ? Object.entries(object.data).reduce((acc, [key, value]) => {
        acc.set(Number(key), ComponentData.fromJSON(value));
        return acc;
      }, /* @__PURE__ */ new Map()) : /* @__PURE__ */ new Map()
    };
  }
  CompositeComponent2.fromJSON = fromJSON;
  function toJSON(message) {
    const obj = {};
    message.name !== void 0 && (obj.name = message.name);
    message.jsonSchema !== void 0 && (obj.jsonSchema = message.jsonSchema);
    obj.data = {};
    if (message.data) {
      message.data.forEach((v, k) => {
        obj.data[k] = ComponentData.toJSON(v);
      });
    }
    return obj;
  }
  CompositeComponent2.toJSON = toJSON;
})(CompositeComponent || (CompositeComponent = {}));
function createBaseCompositeComponent_DataEntry() {
  return { key: 0, value: void 0 };
}
var CompositeComponent_DataEntry;
(function(CompositeComponent_DataEntry2) {
  function encode(message, writer = import_minimal53.default.Writer.create()) {
    if (message.key !== 0) {
      writer.uint32(8).int32(message.key);
    }
    if (message.value !== void 0) {
      ComponentData.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  }
  CompositeComponent_DataEntry2.encode = encode;
  function decode(input, length2) {
    const reader = input instanceof import_minimal53.default.Reader ? input : import_minimal53.default.Reader.create(input);
    let end = length2 === void 0 ? reader.len : reader.pos + length2;
    const message = createBaseCompositeComponent_DataEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }
          message.key = reader.int32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }
          message.value = ComponentData.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  }
  CompositeComponent_DataEntry2.decode = decode;
  function fromJSON(object) {
    return {
      key: isSet2(object.key) ? Number(object.key) : 0,
      value: isSet2(object.value) ? ComponentData.fromJSON(object.value) : void 0
    };
  }
  CompositeComponent_DataEntry2.fromJSON = fromJSON;
  function toJSON(message) {
    const obj = {};
    message.key !== void 0 && (obj.key = Math.round(message.key));
    message.value !== void 0 && (obj.value = message.value ? ComponentData.toJSON(message.value) : void 0);
    return obj;
  }
  CompositeComponent_DataEntry2.toJSON = toJSON;
})(CompositeComponent_DataEntry || (CompositeComponent_DataEntry = {}));
function createBaseCompositeDefinition() {
  return { version: 0, components: [] };
}
var CompositeDefinition;
(function(CompositeDefinition2) {
  function encode(message, writer = import_minimal53.default.Writer.create()) {
    if (message.version !== 0) {
      writer.uint32(8).int32(message.version);
    }
    for (const v of message.components) {
      CompositeComponent.encode(v, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  }
  CompositeDefinition2.encode = encode;
  function decode(input, length2) {
    const reader = input instanceof import_minimal53.default.Reader ? input : import_minimal53.default.Reader.create(input);
    let end = length2 === void 0 ? reader.len : reader.pos + length2;
    const message = createBaseCompositeDefinition();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }
          message.version = reader.int32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }
          message.components.push(CompositeComponent.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  }
  CompositeDefinition2.decode = decode;
  function fromJSON(object) {
    return {
      version: isSet2(object.version) ? Number(object.version) : 0,
      components: Array.isArray(object?.components) ? object.components.map((e) => CompositeComponent.fromJSON(e)) : []
    };
  }
  CompositeDefinition2.fromJSON = fromJSON;
  function toJSON(message) {
    const obj = {};
    message.version !== void 0 && (obj.version = Math.round(message.version));
    if (message.components) {
      obj.components = message.components.map((e) => e ? CompositeComponent.toJSON(e) : void 0);
    } else {
      obj.components = [];
    }
    return obj;
  }
  CompositeDefinition2.toJSON = toJSON;
})(CompositeDefinition || (CompositeDefinition = {}));
var tsProtoGlobalThis3 = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (false) {
    return void 0;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();
function bytesFromBase64(b64) {
  if (tsProtoGlobalThis3.Buffer) {
    return Uint8Array.from(tsProtoGlobalThis3.Buffer.from(b64, "base64"));
  } else {
    const bin = tsProtoGlobalThis3.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}
function base64FromBytes(arr) {
  if (tsProtoGlobalThis3.Buffer) {
    return tsProtoGlobalThis3.Buffer.from(arr).toString("base64");
  } else {
    const bin = [];
    arr.forEach((byte) => {
      bin.push(String.fromCharCode(byte));
    });
    return tsProtoGlobalThis3.btoa(bin.join(""));
  }
}
function isObject2(value) {
  return typeof value === "object" && value !== null;
}
function isSet2(value) {
  return value !== null && value !== void 0;
}

// node_modules/@dcl/ecs/dist/composite/index.js
var Composite;
(function(Composite2) {
  function fromJson(object) {
    return CompositeDefinition.fromJSON(object);
  }
  Composite2.fromJson = fromJson;
  function fromBinary(buffer2) {
    return CompositeDefinition.decode(buffer2);
  }
  Composite2.fromBinary = fromBinary;
  function toJson(composite) {
    return CompositeDefinition.toJSON(composite);
  }
  Composite2.toJson = toJson;
  function toBinary(composite) {
    return CompositeDefinition.encode(composite).finish();
  }
  Composite2.toBinary = toBinary;
  function instance(engine2, compositeData, compositeProvider2, options = {}) {
    instanceComposite(engine2, compositeData, compositeProvider2, options);
  }
  Composite2.instance = instance;
  function resolveAndNormalizePath(src, cwd = "/") {
    return resolveComposite(src, cwd);
  }
  Composite2.resolveAndNormalizePath = resolveAndNormalizePath;
})(Composite || (Composite = {}));

// node_modules/@dcl/ecs/dist/index.js
var Transform2 = /* @__PURE__ */ Transform(engine);
var AudioSource3 = /* @__PURE__ */ AudioSource2(engine);
var AudioStream3 = /* @__PURE__ */ AudioStream2(engine);
var Material3 = /* @__PURE__ */ Material2(engine);
var MeshRenderer3 = /* @__PURE__ */ MeshRenderer2(engine);
var MeshCollider3 = /* @__PURE__ */ MeshCollider2(engine);
var Name2 = Name(engine);
var Tween3 = /* @__PURE__ */ Tween2(engine);
var SyncComponents2 = /* @__PURE__ */ SyncComponents(engine);
var NetworkEntity2 = /* @__PURE__ */ NetworkEntity(engine);
var NetworkParent2 = /* @__PURE__ */ NetworkParent(engine);

// src/index.ts
function main() {
  const myModel = engine.addEntity();
  Transform2.create(myModel, {
    position: { x: 0, y: 0, z: 32 },
    scale: { x: 1, y: 1, z: 1 }
    // rotation: { x: 0, y: 0, z: 0, w: 1 }  
  });
  GltfContainer2.create(myModel, {
    src: "assets/scene/LAUNDROMAT.glb",
    invisibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS,
    visibleMeshesCollisionMask: ColliderLayer.CL_PHYSICS
  });
}

// node_modules/@dcl/sdk/network/index.js
var import_CommunicationsController = require("~system/CommunicationsController");

// node_modules/@dcl/sdk/network/state.js
var NOT_SYNC_COMPONENTS = [
  VideoEvent2,
  VideoPlayer2,
  TweenState2,
  AudioEvent2,
  AudioSource3,
  EngineInfo2,
  GltfContainerLoadingState2,
  PointerEventsResult2,
  RaycastResult2,
  RealmInfo2,
  UiDropdown2,
  UiDropdownResult2,
  UiInput2,
  UiInputResult2,
  UiTransform2,
  UiText2
];
var NOT_SYNC_COMPONENTS_IDS = NOT_SYNC_COMPONENTS.map(($) => $.componentId);
function engineToCrdt(engine2) {
  const crdtBuffer = new ReadWriteByteBuffer();
  const networkBuffer = new ReadWriteByteBuffer();
  const NetworkEntity4 = engine2.getComponent(NetworkEntity2.componentId);
  for (const itComponentDefinition of engine2.componentsIter()) {
    if (NOT_SYNC_COMPONENTS_IDS.includes(itComponentDefinition.componentId)) {
      continue;
    }
    itComponentDefinition.dumpCrdtStateToBuffer(crdtBuffer, (entity) => {
      const isNetworkEntity = NetworkEntity4.has(entity);
      return isNetworkEntity;
    });
  }
  let header;
  while (header = CrdtMessageProtocol.getHeader(crdtBuffer)) {
    if (header.type === CrdtMessageType.PUT_COMPONENT) {
      const message = PutComponentOperation.read(crdtBuffer);
      const networkEntity = NetworkEntity4.getOrNull(message.entityId);
      if (networkEntity) {
        PutNetworkComponentOperation.write(networkEntity.entityId, message.timestamp, message.componentId, networkEntity.networkId, message.data, networkBuffer);
      } else {
        PutComponentOperation.write(message.entityId, message.timestamp, message.componentId, message.data, networkBuffer);
      }
    } else {
      crdtBuffer.incrementReadOffset(header.length);
    }
  }
  return networkBuffer.toBinary();
}

// node_modules/@dcl/sdk/network/filter.js
function syncFilter(engine2) {
  const NetworkEntity4 = engine2.getComponent(NetworkEntity2.componentId);
  const SyncComponents3 = engine2.getComponent(SyncComponents2.componentId);
  return function(message) {
    const componentId = message.componentId;
    if (NOT_SYNC_COMPONENTS_IDS.includes(componentId)) {
      return false;
    }
    const [entityId] = EntityUtils.fromEntityId(message.entityId);
    if (entityId < RESERVED_STATIC_ENTITIES) {
      return false;
    }
    const network = NetworkEntity4.getOrNull(message.entityId);
    if (message.type === CrdtMessageType.DELETE_ENTITY_NETWORK || network && message.type === CrdtMessageType.DELETE_ENTITY) {
      return true;
    }
    const sync = SyncComponents3.getOrNull(message.entityId);
    if (!sync)
      return false;
    if (message.timestamp <= 1) {
      return true;
    }
    if (componentId === NetworkEntity4.componentId) {
      return false;
    }
    if (componentId === NetworkParent2.componentId || componentId === SyncComponents3.componentId) {
      return true;
    }
    if (componentId && sync.componentIds.includes(componentId)) {
      return true;
    }
    return false;
  };
}

// node_modules/@dcl/sdk/network/binary-message-bus.js
var CommsMessage;
(function(CommsMessage2) {
  CommsMessage2[CommsMessage2["CRDT"] = 1] = "CRDT";
  CommsMessage2[CommsMessage2["REQ_CRDT_STATE"] = 2] = "REQ_CRDT_STATE";
  CommsMessage2[CommsMessage2["RES_CRDT_STATE"] = 3] = "RES_CRDT_STATE";
})(CommsMessage || (CommsMessage = {}));
function BinaryMessageBus(send) {
  const mapping = /* @__PURE__ */ new Map();
  return {
    on: (message, callback) => {
      mapping.set(message, callback);
    },
    emit: (message, value) => {
      send(craftCommsMessage(message, value));
    },
    __processMessages: (messages) => {
      for (const message of messages) {
        const commsMsg = decodeCommsMessage(message);
        if (!commsMsg)
          continue;
        const { sender, messageType, data } = commsMsg;
        const fn = mapping.get(messageType);
        if (fn)
          fn(data, sender);
      }
    }
  };
}
function craftCommsMessage(messageType, payload) {
  const msg = new Uint8Array(payload.byteLength + 1);
  msg.set([messageType]);
  msg.set(payload, 1);
  return msg;
}
function decodeCommsMessage(data) {
  try {
    let offset = 0;
    const r = new Uint8Array(data);
    const view = new DataView(r.buffer);
    const senderLength = view.getUint8(offset);
    offset += 1;
    const sender = decodeString(data.subarray(1, senderLength + 1));
    offset += senderLength;
    const messageType = view.getUint8(offset);
    offset += 1;
    const message = r.subarray(offset);
    return {
      sender,
      messageType,
      data: message
    };
  } catch (e) {
    console.error("Invalid Comms message", e);
  }
}
function decodeString(data) {
  const buffer2 = new ReadWriteByteBuffer();
  buffer2.writeBuffer(data, true);
  return buffer2.readUtf8String();
}
function encodeString(s) {
  const buffer2 = new ReadWriteByteBuffer();
  buffer2.writeUtf8String(s);
  return buffer2.readBuffer();
}

// node_modules/@dcl/sdk/network/utils.js
function fetchProfile(myProfile2, getUserData2) {
  void getUserData2({}).then(({ data }) => {
    if (data?.userId) {
      const userId = data.userId;
      const networkId = componentNumberFromName(data.userId);
      myProfile2.networkId = networkId;
      myProfile2.userId = userId;
    } else {
      throw new Error(`Couldn't fetch profile data`);
    }
  });
}

// node_modules/@dcl/sdk/network/entities.js
function entityUtils(engine2, profile) {
  const NetworkEntity4 = engine2.getComponent(NetworkEntity2.componentId);
  const NetworkParent3 = engine2.getComponent(NetworkParent2.componentId);
  const Transform3 = engine2.getComponent(Transform2.componentId);
  const SyncComponents3 = engine2.getComponent(SyncComponents2.componentId);
  function syncEntity2(entityId, componentIds, entityEnumId) {
    let componentsIdsMutable = [...componentIds];
    if (!profile?.networkId) {
      throw new Error("Profile not initialized. Call syncEntity inside the main() function.");
    }
    const networkValue = { entityId, networkId: profile.networkId };
    if (entityEnumId !== void 0) {
      networkValue.networkId = 0;
      networkValue.entityId = entityEnumId;
      for (const [_, network] of engine2.getEntitiesWith(NetworkEntity4)) {
        if (network.networkId === networkValue.networkId && network.entityId === networkValue.entityId) {
          throw new Error("syncEntity failed because the id provided is already in use");
        }
      }
    }
    for (const component of NOT_SYNC_COMPONENTS) {
      if (componentsIdsMutable.includes(component.componentId)) {
        console.log(`\u26A0\uFE0F ${component.componentName} can't be sync through the network!`);
        componentsIdsMutable = componentsIdsMutable.filter(($) => $ !== component.componentId);
      }
    }
    NetworkEntity4.createOrReplace(entityId, networkValue);
    SyncComponents3.createOrReplace(entityId, { componentIds: componentsIdsMutable });
  }
  function* getChildren2(parent) {
    const network = NetworkEntity4.getOrNull(parent);
    if (network) {
      for (const [entity, parent2] of engine2.getEntitiesWith(NetworkParent3)) {
        if (parent2.entityId === network.entityId && parent2.networkId === network.networkId) {
          yield entity;
        }
      }
    }
  }
  function getFirstChild2(entity) {
    return Array.from(getChildren2(entity))[0];
  }
  function getParent2(child) {
    const parent = NetworkParent3.getOrNull(child);
    if (!parent)
      return void 0;
    for (const [entity, network] of engine2.getEntitiesWith(NetworkEntity4)) {
      if (parent.networkId === network.networkId && parent.entityId === network.entityId) {
        return entity;
      }
    }
    return void 0;
  }
  function parentEntity2(entity, parent) {
    const network = NetworkEntity4.getOrNull(parent);
    if (!network) {
      throw new Error("Entity is not sync. Call syncEntity on the parent.");
    }
    NetworkParent3.createOrReplace(entity, network);
    if (!Transform3.getOrNull(entity)) {
      Transform3.create(entity);
    } else {
      Transform3.getMutable(entity);
    }
  }
  function removeParent2(entity) {
    const network = NetworkEntity4.getOrNull(entity);
    if (!network) {
      throw new Error("Entity is not sync");
    }
    NetworkParent3.deleteFrom(entity);
  }
  return {
    syncEntity: syncEntity2,
    getChildren: getChildren2,
    getParent: getParent2,
    parentEntity: parentEntity2,
    removeParent: removeParent2,
    getFirstChild: getFirstChild2
  };
}

// node_modules/@dcl/sdk/players/index.js
function definePlayerHelper(engine2) {
  const Transform3 = Transform(engine2);
  const PlayerIdentityData3 = PlayerIdentityData(engine2);
  const AvatarEquippedData3 = AvatarEquippedData(engine2);
  const AvatarBase3 = AvatarBase(engine2);
  const playerEntities = /* @__PURE__ */ new Map();
  const onEnterSceneCb = [];
  const onLeaveSceneCb = [];
  engine2.addSystem(() => {
    const players2 = Array.from(engine2.getEntitiesWith(PlayerIdentityData3, AvatarBase3));
    if (players2.length === playerEntities.size)
      return;
    for (const [entity, identity] of players2) {
      if (!playerEntities.has(entity)) {
        playerEntities.set(entity, identity.address);
        if (onEnterSceneCb.length) {
          onEnterSceneCb.forEach((cb) => cb(getPlayer({ userId: identity.address })));
        }
        AvatarBase3.onChange(entity, (value) => {
          if (!value && onLeaveSceneCb.length && playerEntities.get(entity)) {
            onLeaveSceneCb.forEach((cb) => cb(playerEntities.get(entity)));
            playerEntities.delete(entity);
          }
        });
      }
    }
  });
  return {
    onEnterScene(cb) {
      onEnterSceneCb.push(cb);
    },
    onLeaveScene(cb) {
      onLeaveSceneCb.push(cb);
    },
    /**
     * Returns the info of the player if it's in the scene.
     */
    getPlayer(user) {
      function getEntity() {
        if (!user?.userId)
          return engine2.PlayerEntity;
        for (const [entity, data] of engine2.getEntitiesWith(PlayerIdentityData3)) {
          if (data.address === user.userId) {
            return entity;
          }
        }
        return void 0;
      }
      const userEntity = getEntity();
      if (!userEntity)
        return null;
      const playerData = PlayerIdentityData3.getOrNull(userEntity);
      const avatarData = AvatarBase3.getOrNull(userEntity);
      const wearablesData = AvatarEquippedData3.getOrNull(userEntity);
      if (!playerData && !avatarData && !wearablesData)
        return null;
      return {
        entity: userEntity,
        name: avatarData?.name ?? "",
        isGuest: !!playerData?.isGuest,
        userId: playerData?.address ?? "",
        avatar: avatarData ?? void 0,
        wearables: wearablesData?.wearableUrns ?? [],
        emotes: wearablesData?.emoteUrns ?? [],
        position: Transform3.getOrNull(userEntity)?.position
      };
    }
  };
}
var players = definePlayerHelper(engine);
var { getPlayer, onEnterScene, onLeaveScene } = players;
var players_default = players;

// node_modules/@dcl/ecs/dist/serialization/crdt/message.js
function readMessage(buf) {
  const header = CrdtMessageProtocol.getHeader(buf);
  if (!header)
    return null;
  if (header.type === CrdtMessageType.PUT_COMPONENT) {
    return PutComponentOperation.read(buf);
  } else if (header.type === CrdtMessageType.PUT_COMPONENT_NETWORK) {
    return PutNetworkComponentOperation.read(buf);
  } else if (header.type === CrdtMessageType.DELETE_COMPONENT) {
    return DeleteComponent.read(buf);
  } else if (header.type === CrdtMessageType.DELETE_COMPONENT_NETWORK) {
    return DeleteComponentNetwork.read(buf);
  } else if (header.type === CrdtMessageType.APPEND_VALUE) {
    return AppendValueOperation.read(buf);
  } else if (header.type === CrdtMessageType.DELETE_ENTITY) {
    return DeleteEntity.read(buf);
  } else if (header.type === CrdtMessageType.DELETE_ENTITY_NETWORK) {
    return DeleteEntityNetwork.read(buf);
  }
  return null;
}

// node_modules/@dcl/sdk/internal/transports/logger.js
function* serializeCrdtMessages(prefix, data, engine2) {
  const buffer2 = new ReadWriteByteBuffer(data);
  let message;
  while (message = readMessage(buffer2)) {
    const ent = message.entityId;
    const preface = `${prefix}: ${CrdtMessageType[message.type]} e=${ent}`;
    if (message.type === CrdtMessageType.DELETE_ENTITY || message.type === CrdtMessageType.DELETE_ENTITY_NETWORK) {
      yield `${preface}`;
    }
    if (message.type === CrdtMessageType.PUT_COMPONENT || message.type === CrdtMessageType.PUT_COMPONENT_NETWORK || message.type === CrdtMessageType.DELETE_COMPONENT_NETWORK || message.type === CrdtMessageType.DELETE_COMPONENT || message.type === CrdtMessageType.APPEND_VALUE) {
      const { componentId, timestamp } = message;
      const data2 = "data" in message ? message.data : void 0;
      try {
        const c = engine2.getComponent(componentId);
        yield `${preface} c=${c.componentName} t=${timestamp} data=${JSON.stringify(data2 && c.schema.deserialize(new ReadWriteByteBuffer(data2)) || null)}`;
      } catch {
        yield `${preface} c=${componentId} t=${timestamp} data=?`;
      }
    } else if (message.type === CrdtMessageType.DELETE_ENTITY || message.type === CrdtMessageType.DELETE_ENTITY_NETWORK) {
      yield preface;
    } else {
      yield `${preface} Unknown CrdtMessageType`;
    }
  }
}

// node_modules/@dcl/sdk/network/message-bus-sync.js
function addSyncTransport(engine2, sendBinary2, getUserData2) {
  const DEBUG_NETWORK_MESSAGES = () => globalThis.DEBUG_NETWORK_MESSAGES ?? true;
  const myProfile2 = {};
  fetchProfile(myProfile2, getUserData2);
  const entityDefinitions = entityUtils(engine2, myProfile2);
  const pendingMessageBusMessagesToSend = [];
  const binaryMessageBus = BinaryMessageBus((message) => pendingMessageBusMessagesToSend.push(message));
  function getMessagesToSend() {
    const messages = [...pendingMessageBusMessagesToSend];
    pendingMessageBusMessagesToSend.length = 0;
    return messages;
  }
  const players2 = definePlayerHelper(engine2);
  let stateIsSyncronized = false;
  let transportInitialzed = false;
  const transport = {
    filter: syncFilter(engine2),
    send: async (message) => {
      if (message.byteLength && transportInitialzed) {
        DEBUG_NETWORK_MESSAGES() && console.log(...Array.from(serializeCrdtMessages("[NetworkMessage sent]:", message, engine2)));
        binaryMessageBus.emit(CommsMessage.CRDT, message);
      }
      const messages = getMessagesToSend();
      const response = await sendBinary2({ data: messages });
      binaryMessageBus.__processMessages(response.data);
      transportInitialzed = true;
    },
    type: "network"
  };
  engine2.addTransport(transport);
  binaryMessageBus.on(CommsMessage.RES_CRDT_STATE, (value) => {
    const { sender, data } = decodeCRDTState(value);
    if (sender !== myProfile2.userId)
      return;
    DEBUG_NETWORK_MESSAGES() && console.log("[Processing CRDT State]", data.byteLength);
    transport.onmessage(data);
    stateIsSyncronized = true;
  });
  binaryMessageBus.on(CommsMessage.REQ_CRDT_STATE, async (message, userId) => {
    console.log(`Sending CRDT State to: ${userId}`);
    transport.onmessage(message);
    binaryMessageBus.emit(CommsMessage.RES_CRDT_STATE, encodeCRDTState(userId, engineToCrdt(engine2)));
  });
  binaryMessageBus.on(CommsMessage.CRDT, (value) => {
    DEBUG_NETWORK_MESSAGES() && console.log(Array.from(serializeCrdtMessages("[NetworkMessage received]:", value, engine2)));
    transport.onmessage(value);
  });
  async function requestState(retryCount = 1) {
    let players3 = Array.from(engine2.getEntitiesWith(PlayerIdentityData2));
    DEBUG_NETWORK_MESSAGES() && console.log(`Requesting state. Players connected: ${players3.length - 1}`);
    if (!RealmInfo2.getOrNull(engine2.RootEntity)?.isConnectedSceneRoom) {
      DEBUG_NETWORK_MESSAGES() && console.log(`Aborting Requesting state?. Disconnected`);
      return;
    }
    binaryMessageBus.emit(CommsMessage.REQ_CRDT_STATE, engineToCrdt(engine2));
    await sleep(5e3);
    players3 = Array.from(engine2.getEntitiesWith(PlayerIdentityData2));
    if (!stateIsSyncronized) {
      if (players3.length > 1 && retryCount <= 2) {
        DEBUG_NETWORK_MESSAGES() && console.log(`Requesting state again ${retryCount} (no response). Players connected: ${players3.length - 1}`);
        void requestState(retryCount + 1);
      } else {
        DEBUG_NETWORK_MESSAGES() && console.log("No active players. State syncronized");
        stateIsSyncronized = true;
      }
    }
  }
  players2.onEnterScene((player) => {
    DEBUG_NETWORK_MESSAGES() && console.log("[onEnterScene]", player.userId);
  });
  RealmInfo2.onChange(engine2.RootEntity, (value) => {
    if (!value?.isConnectedSceneRoom) {
      DEBUG_NETWORK_MESSAGES() && console.log("Disconnected from comms");
      stateIsSyncronized = false;
    }
    if (value?.isConnectedSceneRoom) {
      DEBUG_NETWORK_MESSAGES() && console.log("Connected to comms");
    }
    if (value?.isConnectedSceneRoom && !stateIsSyncronized) {
      void requestState();
    }
  });
  players2.onLeaveScene((userId) => {
    DEBUG_NETWORK_MESSAGES() && console.log("[onLeaveScene]", userId);
  });
  function isStateSyncronized2() {
    return stateIsSyncronized;
  }
  function sleep(ms) {
    return new Promise((resolve2) => {
      let timer = 0;
      function sleepSystem(dt) {
        timer += dt;
        if (timer * 1e3 >= ms) {
          engine2.removeSystem(sleepSystem);
          resolve2();
        }
      }
      engine2.addSystem(sleepSystem);
    });
  }
  return {
    ...entityDefinitions,
    myProfile: myProfile2,
    isStateSyncronized: isStateSyncronized2
  };
}
function decodeCRDTState(data) {
  let offset = 0;
  const r = new Uint8Array(data);
  const view = new DataView(r.buffer);
  const senderLength = view.getUint8(offset);
  offset += 1;
  const sender = decodeString(data.subarray(1, senderLength + 1));
  offset += senderLength;
  const state = r.subarray(offset);
  return { sender, data: state };
}
function encodeCRDTState(address, data) {
  const addressBuffer = encodeString(address);
  const addressOffset = 1;
  const messageLength = addressOffset + addressBuffer.byteLength + data.byteLength;
  const serializedMessage = new Uint8Array(messageLength);
  serializedMessage.set(new Uint8Array([addressBuffer.byteLength]), 0);
  serializedMessage.set(addressBuffer, 1);
  serializedMessage.set(data, addressBuffer.byteLength + 1);
  return serializedMessage;
}

// node_modules/@dcl/sdk/network/index.js
var import_UserIdentity = require("~system/UserIdentity");
var { getChildren, syncEntity, parentEntity, getParent, myProfile, removeParent, getFirstChild, isStateSyncronized } = addSyncTransport(engine, import_CommunicationsController.sendBinary, import_UserIdentity.getUserData);

// node_modules/@dcl/asset-packs/dist/action-types.js
function addActionType(engine2, type, schema) {
  const ActionTypes = getComponent(ComponentName.ACTION_TYPES, engine2);
  const actionTypes = ActionTypes.getOrCreateMutable(engine2.RootEntity);
  const actionType = {
    type,
    jsonSchema: JSON.stringify(schema?.jsonSchema || Schemas.Map({}).jsonSchema)
  };
  actionTypes.value = [
    ...actionTypes.value.filter(($) => $.type !== actionType.type),
    actionType
  ];
}
function getPayload(action) {
  return JSON.parse(action.jsonPayload);
}

// node_modules/@dcl/asset-packs/dist/enums.js
var ComponentName;
(function(ComponentName2) {
  ComponentName2["ACTION_TYPES"] = "asset-packs::ActionTypes";
  ComponentName2["ACTIONS"] = "asset-packs::Actions";
  ComponentName2["COUNTER"] = "asset-packs::Counter";
  ComponentName2["TRIGGERS"] = "asset-packs::Triggers";
  ComponentName2["STATES"] = "asset-packs::States";
  ComponentName2["COUNTER_BAR"] = "asset-packs::CounterBar";
})(ComponentName || (ComponentName = {}));
var TweenType;
(function(TweenType2) {
  TweenType2["MOVE_ITEM"] = "move_item";
  TweenType2["ROTATE_ITEM"] = "rotate_item";
  TweenType2["SCALE_ITEM"] = "scale_item";
})(TweenType || (TweenType = {}));
var InterpolationType;
(function(InterpolationType3) {
  InterpolationType3["LINEAR"] = "linear";
  InterpolationType3["EASEINQUAD"] = "easeinquad";
  InterpolationType3["EASEOUTQUAD"] = "easeoutquad";
  InterpolationType3["EASEQUAD"] = "easequad";
  InterpolationType3["EASEINSINE"] = "easeinsine";
  InterpolationType3["EASEOUTSINE"] = "easeoutsine";
  InterpolationType3["EASESINE"] = "easeinoutsine";
  InterpolationType3["EASEINEXPO"] = "easeinexpo";
  InterpolationType3["EASEOUTEXPO"] = "easeoutexpo";
  InterpolationType3["EASEEXPO"] = "easeinoutexpo";
  InterpolationType3["EASEINELASTIC"] = "easeinelastic";
  InterpolationType3["EASEOUTELASTIC"] = "easeoutelastic";
  InterpolationType3["EASEELASTIC"] = "easeinoutelastic";
  InterpolationType3["EASEINBOUNCE"] = "easeinbounce";
  InterpolationType3["EASEOUTEBOUNCE"] = "easeoutbounce";
  InterpolationType3["EASEBOUNCE"] = "easeinoutbounce";
})(InterpolationType || (InterpolationType = {}));
var ActionType;
(function(ActionType2) {
  ActionType2["PLAY_ANIMATION"] = "play_animation";
  ActionType2["STOP_ANIMATION"] = "stop_animation";
  ActionType2["SET_STATE"] = "set_state";
  ActionType2["START_TWEEN"] = "start_tween";
  ActionType2["SET_COUNTER"] = "set_counter";
  ActionType2["INCREMENT_COUNTER"] = "increment_counter";
  ActionType2["DECREASE_COUNTER"] = "decrease_counter";
  ActionType2["PLAY_SOUND"] = "play_sound";
  ActionType2["STOP_SOUND"] = "stop_sound";
  ActionType2["SET_VISIBILITY"] = "set_visibility";
  ActionType2["ATTACH_TO_PLAYER"] = "attach_to_player";
  ActionType2["DETACH_FROM_PLAYER"] = "detach_from_player";
  ActionType2["PLAY_VIDEO_STREAM"] = "play_video_stream";
  ActionType2["STOP_VIDEO_STREAM"] = "stop_video_stream";
  ActionType2["PLAY_AUDIO_STREAM"] = "play_audio_stream";
  ActionType2["STOP_AUDIO_STREAM"] = "stop_audio_stream";
  ActionType2["TELEPORT_PLAYER"] = "teleport_player";
  ActionType2["MOVE_PLAYER"] = "move_player";
  ActionType2["PLAY_DEFAULT_EMOTE"] = "play_default_emote";
  ActionType2["PLAY_CUSTOM_EMOTE"] = "play_custom_emote";
  ActionType2["OPEN_LINK"] = "open_link";
  ActionType2["SHOW_TEXT"] = "show_text";
  ActionType2["HIDE_TEXT"] = "hide_text";
  ActionType2["START_DELAY"] = "start_delay";
  ActionType2["STOP_DELAY"] = "stop_delay";
  ActionType2["START_LOOP"] = "start_loop";
  ActionType2["STOP_LOOP"] = "stop_loop";
  ActionType2["CLONE_ENTITY"] = "clone_entity";
  ActionType2["REMOVE_ENTITY"] = "remove_entity";
  ActionType2["SHOW_IMAGE"] = "show_image";
  ActionType2["HIDE_IMAGE"] = "hide_image";
  ActionType2["DAMAGE"] = "damage";
  ActionType2["MOVE_PLAYER_HERE"] = "move_player_here";
  ActionType2["PLACE_ON_PLAYER"] = "place_on_player";
  ActionType2["ROTATE_AS_PLAYER"] = "rotate_as_player";
  ActionType2["PLACE_ON_CAMERA"] = "place_on_camera";
  ActionType2["ROTATE_AS_CAMERA"] = "rotate_as_camera";
  ActionType2["SET_POSITION"] = "set_position";
  ActionType2["SET_ROTATION"] = "set_rotation";
  ActionType2["SET_SCALE"] = "set_scale";
  ActionType2["FOLLOW_PLAYER"] = "follow_player";
  ActionType2["STOP_FOLLOWING_PLAYER"] = "stop_following_player";
  ActionType2["RANDOM"] = "random";
  ActionType2["BATCH"] = "batch";
  ActionType2["HEAL_PLAYER"] = "heal_player";
})(ActionType || (ActionType = {}));
var TriggerType;
(function(TriggerType2) {
  TriggerType2["ON_CLICK"] = "on_click";
  TriggerType2["ON_INPUT_ACTION"] = "on_input_action";
  TriggerType2["ON_STATE_CHANGE"] = "on_state_change";
  TriggerType2["ON_SPAWN"] = "on_spawn";
  TriggerType2["ON_TWEEN_END"] = "on_tween_end";
  TriggerType2["ON_COUNTER_CHANGE"] = "on_counter_change";
  TriggerType2["ON_PLAYER_ENTERS_AREA"] = "on_player_enters_area";
  TriggerType2["ON_PLAYER_LEAVES_AREA"] = "on_player_leaves_area";
  TriggerType2["ON_DELAY"] = "on_delay";
  TriggerType2["ON_LOOP"] = "on_loop";
  TriggerType2["ON_CLONE"] = "on_clone";
  TriggerType2["ON_CLICK_IMAGE"] = "on_click_image";
  TriggerType2["ON_DAMAGE"] = "on_damage";
  TriggerType2["ON_GLOBAL_CLICK"] = "on_global_click";
  TriggerType2["ON_GLOBAL_PRIMARY"] = "on_global_primary";
  TriggerType2["ON_GLOBAL_SECONDARY"] = "on_global_secondary";
  TriggerType2["ON_TICK"] = "on_tick";
  TriggerType2["ON_HEAL_PLAYER"] = "on_heal_player";
  TriggerType2["ON_PLAYER_SPAWN"] = "on_player_spawn";
})(TriggerType || (TriggerType = {}));
var TriggerConditionType;
(function(TriggerConditionType2) {
  TriggerConditionType2["WHEN_STATE_IS"] = "when_state_is";
  TriggerConditionType2["WHEN_STATE_IS_NOT"] = "when_state_is_not";
  TriggerConditionType2["WHEN_COUNTER_EQUALS"] = "when_counter_equals";
  TriggerConditionType2["WHEN_COUNTER_IS_GREATER_THAN"] = "when_counter_is_greater_than";
  TriggerConditionType2["WHEN_COUNTER_IS_LESS_THAN"] = "when_counter_is_less_than";
  TriggerConditionType2["WHEN_DISTANCE_TO_PLAYER_LESS_THAN"] = "when_distance_to_player_less_than";
  TriggerConditionType2["WHEN_DISTANCE_TO_PLAYER_GREATER_THAN"] = "when_distance_to_player_greater_than";
  TriggerConditionType2["WHEN_PREVIOUS_STATE_IS"] = "when_previous_state_is";
  TriggerConditionType2["WHEN_PREVIOUS_STATE_IS_NOT"] = "when_previous_state_is_not";
})(TriggerConditionType || (TriggerConditionType = {}));
var TriggerConditionOperation;
(function(TriggerConditionOperation2) {
  TriggerConditionOperation2["AND"] = "and";
  TriggerConditionOperation2["OR"] = "or";
})(TriggerConditionOperation || (TriggerConditionOperation = {}));
var AlignMode;
(function(AlignMode2) {
  AlignMode2[AlignMode2["TAM_TOP_LEFT"] = 0] = "TAM_TOP_LEFT";
  AlignMode2[AlignMode2["TAM_TOP_CENTER"] = 1] = "TAM_TOP_CENTER";
  AlignMode2[AlignMode2["TAM_TOP_RIGHT"] = 2] = "TAM_TOP_RIGHT";
  AlignMode2[AlignMode2["TAM_MIDDLE_LEFT"] = 3] = "TAM_MIDDLE_LEFT";
  AlignMode2[AlignMode2["TAM_MIDDLE_CENTER"] = 4] = "TAM_MIDDLE_CENTER";
  AlignMode2[AlignMode2["TAM_MIDDLE_RIGHT"] = 5] = "TAM_MIDDLE_RIGHT";
  AlignMode2[AlignMode2["TAM_BOTTOM_LEFT"] = 6] = "TAM_BOTTOM_LEFT";
  AlignMode2[AlignMode2["TAM_BOTTOM_CENTER"] = 7] = "TAM_BOTTOM_CENTER";
  AlignMode2[AlignMode2["TAM_BOTTOM_RIGHT"] = 8] = "TAM_BOTTOM_RIGHT";
})(AlignMode || (AlignMode = {}));
var Font2;
(function(Font3) {
  Font3[Font3["F_SANS_SERIF"] = 0] = "F_SANS_SERIF";
  Font3[Font3["F_SERIF"] = 1] = "F_SERIF";
  Font3[Font3["F_MONOSPACE"] = 2] = "F_MONOSPACE";
})(Font2 || (Font2 = {}));
var Colliders;
(function(Colliders2) {
  Colliders2[Colliders2["CL_NONE"] = 0] = "CL_NONE";
  Colliders2[Colliders2["CL_POINTER"] = 1] = "CL_POINTER";
  Colliders2[Colliders2["CL_PHYSICS"] = 2] = "CL_PHYSICS";
  Colliders2[Colliders2["CL_RESERVED1"] = 4] = "CL_RESERVED1";
  Colliders2[Colliders2["CL_RESERVED2"] = 8] = "CL_RESERVED2";
  Colliders2[Colliders2["CL_RESERVED3"] = 16] = "CL_RESERVED3";
  Colliders2[Colliders2["CL_RESERVED4"] = 32] = "CL_RESERVED4";
  Colliders2[Colliders2["CL_RESERVED5"] = 64] = "CL_RESERVED5";
  Colliders2[Colliders2["CL_RESERVED6"] = 128] = "CL_RESERVED6";
  Colliders2[Colliders2["CL_CUSTOM1"] = 256] = "CL_CUSTOM1";
  Colliders2[Colliders2["CL_CUSTOM2"] = 512] = "CL_CUSTOM2";
  Colliders2[Colliders2["CL_CUSTOM3"] = 1024] = "CL_CUSTOM3";
  Colliders2[Colliders2["CL_CUSTOM4"] = 2048] = "CL_CUSTOM4";
  Colliders2[Colliders2["CL_CUSTOM5"] = 4096] = "CL_CUSTOM5";
  Colliders2[Colliders2["CL_CUSTOM6"] = 8192] = "CL_CUSTOM6";
  Colliders2[Colliders2["CL_CUSTOM7"] = 16384] = "CL_CUSTOM7";
  Colliders2[Colliders2["CL_CUSTOM8"] = 32768] = "CL_CUSTOM8";
})(Colliders || (Colliders = {}));
var ProximityLayer;
(function(ProximityLayer2) {
  ProximityLayer2["ALL"] = "all";
  ProximityLayer2["PLAYER"] = "player";
  ProximityLayer2["NON_PLAYER"] = "non_player";
})(ProximityLayer || (ProximityLayer = {}));

// node_modules/@dcl/asset-packs/dist/components.js
function getExplorerComponents(engine2) {
  return {
    Animator: Animator2(engine2),
    Transform: Transform(engine2),
    AudioSource: AudioSource2(engine2),
    AvatarAttach: AvatarAttach(engine2),
    VisibilityComponent: VisibilityComponent(engine2),
    GltfContainer: GltfContainer(engine2),
    UiTransform: UiTransform(engine2),
    UiText: UiText(engine2),
    UiBackground: UiBackground(engine2),
    VideoPlayer: VideoPlayer(engine2),
    Material: Material2(engine2),
    MeshRenderer: MeshRenderer2(engine2),
    Billboard: Billboard(engine2),
    Name: Name(engine2),
    Tween: Tween2(engine2),
    TweenSequence: TweenSequence(engine2),
    PointerEvents: PointerEvents(engine2),
    NetworkEntity: NetworkEntity(engine2),
    SyncComponents: SyncComponents(engine2)
  };
}

// node_modules/mitt/dist/mitt.mjs
function mitt_default(n) {
  return { all: n = n || /* @__PURE__ */ new Map(), on: function(t, e) {
    var i = n.get(t);
    i ? i.push(e) : n.set(t, [e]);
  }, off: function(t, e) {
    var i = n.get(t);
    i && (e ? i.splice(i.indexOf(e) >>> 0, 1) : n.set(t, []));
  }, emit: function(t, e) {
    var i = n.get(t);
    i && i.slice().map(function(n2) {
      n2(e);
    }), (i = n.get("*")) && i.slice().map(function(n2) {
      n2(t, e);
    });
  } };
}

// node_modules/@dcl/asset-packs/dist/events.js
var triggers = /* @__PURE__ */ new Map();
var actions = /* @__PURE__ */ new Map();
function getTriggerEvents(entity) {
  if (!triggers.has(entity)) {
    triggers.set(entity, mitt_default());
  }
  return triggers.get(entity);
}
function getActionEvents(entity) {
  if (!actions.has(entity)) {
    actions.set(entity, mitt_default());
  }
  return actions.get(entity);
}

// node_modules/@dcl/asset-packs/dist/id.js
var COMPONENTS_WITH_ID = [
  ComponentName.ACTIONS,
  ComponentName.STATES,
  ComponentName.COUNTER
];
function getCounterComponent(engine2) {
  return engine2.getComponent(ComponentName.COUNTER);
}
function getNextId(engine2) {
  const Counter = getCounterComponent(engine2);
  const counter = Counter.getOrCreateMutable(engine2.RootEntity);
  return ++counter.value;
}
function requiresId(component) {
  return COMPONENTS_WITH_ID.includes(component.componentName);
}

// node_modules/@dcl/asset-packs/dist/states.js
function isValidState(states, value) {
  return !!value && states.value.includes(value);
}
function getCurrentValue(states) {
  if (isValidState(states, states.currentValue)) {
    return states.currentValue;
  }
  return getDefaultValue(states);
}
function getDefaultValue(states) {
  if (isValidState(states, states.defaultValue)) {
    return states.defaultValue;
  }
  if (states.value.length > 0) {
    return states.value[0];
  }
}
function getPreviousValue(states) {
  if (isValidState(states, states.previousValue)) {
    return states.previousValue;
  }
  return null;
}

// node_modules/@dcl/asset-packs/dist/lww.js
function isLastWriteWinComponent(component) {
  return !!component.createOrReplace;
}

// node_modules/@dcl/asset-packs/dist/clone.js
function clone(entity, engine2, Transform3, Triggers, sdkHelpers) {
  const ids = /* @__PURE__ */ new Map();
  const entities = /* @__PURE__ */ new Map();
  const tree = getComponentEntityTree(engine2, entity, Transform3);
  const { NetworkEntity: NetworkEntity4, SyncComponents: SyncComponents3 } = getExplorerComponents(engine2);
  for (const original of tree) {
    const cloned2 = engine2.addEntity();
    for (const component of engine2.componentsIter()) {
      if (component.has(original)) {
        let newValue = JSON.parse(JSON.stringify(component.get(original)));
        if (requiresId(component)) {
          const oldId = newValue.id;
          const newId = getNextId(engine2);
          ids.set(oldId, newId);
          newValue = {
            ...newValue,
            id: newId
          };
        }
        if (isLastWriteWinComponent(component)) {
          component.createOrReplace(cloned2, newValue);
        }
      }
    }
    entities.set(original, cloned2);
  }
  const clones = Array.from(entities.values()).reverse();
  for (const cloned2 of clones) {
    if (Triggers.has(cloned2)) {
      const triggers3 = Triggers.getMutable(cloned2);
      for (const trigger of triggers3.value) {
        for (const action of trigger.actions) {
          if (action.id) {
            const newId = ids.get(action.id);
            if (newId) {
              action.id = newId;
            }
          }
        }
        if (trigger.conditions) {
          for (const condition of trigger.conditions) {
            if (condition.id) {
              const newId = ids.get(condition.id);
              if (newId) {
                condition.id = newId;
              }
            }
          }
        }
      }
    }
    if (NetworkEntity4.has(cloned2)) {
      const syncComponent = SyncComponents3.getOrNull(cloned2);
      if (syncComponent && sdkHelpers?.syncEntity) {
        sdkHelpers?.syncEntity(cloned2, syncComponent.componentIds);
      }
    }
    const transform = Transform3.getMutableOrNull(cloned2);
    if (transform && transform.parent) {
      const newParent = entities.get(transform.parent);
      if (newParent) {
        transform.parent = newParent;
      }
    }
  }
  const cloned = clones[0];
  return { ids, entities, cloned };
}

// node_modules/@dcl/asset-packs/dist/definitions.js
var ActionSchemas = {
  [ActionType.PLAY_ANIMATION]: Schemas.Map({
    animation: Schemas.String,
    loop: Schemas.Optional(Schemas.Boolean)
  }),
  [ActionType.STOP_ANIMATION]: Schemas.Map({}),
  [ActionType.SET_STATE]: Schemas.Map({ state: Schemas.String }),
  [ActionType.START_TWEEN]: Schemas.Map({
    type: Schemas.EnumString(TweenType, TweenType.MOVE_ITEM),
    end: Schemas.Vector3,
    interpolationType: Schemas.EnumString(InterpolationType, InterpolationType.LINEAR),
    duration: Schemas.Float,
    relative: Schemas.Boolean
  }),
  [ActionType.SET_COUNTER]: Schemas.Map({ counter: Schemas.Int }),
  [ActionType.INCREMENT_COUNTER]: Schemas.Map({
    amount: Schemas.Optional(Schemas.Int)
  }),
  [ActionType.DECREASE_COUNTER]: Schemas.Map({
    amount: Schemas.Optional(Schemas.Int)
  }),
  [ActionType.PLAY_SOUND]: Schemas.Map({
    src: Schemas.String,
    loop: Schemas.Optional(Schemas.Boolean),
    volume: Schemas.Optional(Schemas.Float)
  }),
  [ActionType.STOP_SOUND]: Schemas.Map({}),
  [ActionType.SET_VISIBILITY]: Schemas.Map({
    visible: Schemas.Boolean,
    physicsCollider: Schemas.Optional(Schemas.Boolean),
    collider: Schemas.Optional(Schemas.EnumNumber(Colliders, Colliders.CL_POINTER))
  }),
  [ActionType.ATTACH_TO_PLAYER]: Schemas.Map({
    anchorPointId: Schemas.Int
  }),
  [ActionType.DETACH_FROM_PLAYER]: Schemas.Map({}),
  [ActionType.PLAY_VIDEO_STREAM]: Schemas.Map({
    src: Schemas.Optional(Schemas.String),
    loop: Schemas.Optional(Schemas.Boolean),
    volume: Schemas.Optional(Schemas.Float),
    dclCast: Schemas.Optional(Schemas.Boolean)
  }),
  [ActionType.STOP_VIDEO_STREAM]: Schemas.Map({}),
  [ActionType.PLAY_AUDIO_STREAM]: Schemas.Map({
    url: Schemas.String,
    volume: Schemas.Optional(Schemas.Float)
  }),
  [ActionType.STOP_AUDIO_STREAM]: Schemas.Map({}),
  [ActionType.TELEPORT_PLAYER]: Schemas.Map({
    x: Schemas.Int,
    y: Schemas.Int
  }),
  [ActionType.MOVE_PLAYER]: Schemas.Map({
    position: Schemas.Vector3,
    cameraTarget: Schemas.Optional(Schemas.Vector3)
  }),
  [ActionType.PLAY_DEFAULT_EMOTE]: Schemas.Map({
    emote: Schemas.String
  }),
  [ActionType.PLAY_CUSTOM_EMOTE]: Schemas.Map({
    src: Schemas.String,
    loop: Schemas.Optional(Schemas.Boolean)
  }),
  [ActionType.OPEN_LINK]: Schemas.Map({
    url: Schemas.String
  }),
  [ActionType.SHOW_TEXT]: Schemas.Map({
    text: Schemas.String,
    hideAfterSeconds: Schemas.Float,
    font: Schemas.EnumNumber(Font2, Font2.F_SANS_SERIF),
    fontSize: Schemas.Optional(Schemas.Float),
    textAlign: Schemas.EnumNumber(AlignMode, AlignMode.TAM_MIDDLE_CENTER)
  }),
  [ActionType.HIDE_TEXT]: Schemas.Map({}),
  [ActionType.START_DELAY]: Schemas.Map({
    actions: Schemas.Array(Schemas.String),
    timeout: Schemas.Float
  }),
  [ActionType.STOP_DELAY]: Schemas.Map({
    action: Schemas.String
  }),
  [ActionType.START_LOOP]: Schemas.Map({
    actions: Schemas.Array(Schemas.String),
    interval: Schemas.Float
  }),
  [ActionType.STOP_LOOP]: Schemas.Map({
    action: Schemas.String
  }),
  [ActionType.CLONE_ENTITY]: Schemas.Map({
    position: Schemas.Vector3
  }),
  [ActionType.REMOVE_ENTITY]: Schemas.Map({}),
  [ActionType.SHOW_IMAGE]: Schemas.Map({
    src: Schemas.String,
    align: Schemas.EnumNumber(AlignMode, AlignMode.TAM_MIDDLE_CENTER),
    height: Schemas.Float,
    width: Schemas.Float,
    hideAfterSeconds: Schemas.Optional(Schemas.Float),
    text: Schemas.Optional(Schemas.String),
    fontSize: Schemas.Optional(Schemas.Float)
  }),
  [ActionType.HIDE_IMAGE]: Schemas.Map({
    imageEntity: Schemas.Optional(Schemas.Int)
  }),
  [ActionType.DAMAGE]: Schemas.Map({
    radius: Schemas.Float,
    layer: Schemas.Optional(Schemas.EnumString(ProximityLayer, ProximityLayer.ALL)),
    hits: Schemas.Optional(Schemas.Int)
  }),
  [ActionType.MOVE_PLAYER_HERE]: Schemas.Map({}),
  [ActionType.PLACE_ON_PLAYER]: Schemas.Map({}),
  [ActionType.ROTATE_AS_PLAYER]: Schemas.Map({}),
  [ActionType.PLACE_ON_CAMERA]: Schemas.Map({}),
  [ActionType.ROTATE_AS_CAMERA]: Schemas.Map({}),
  [ActionType.SET_POSITION]: Schemas.Map({
    x: Schemas.Float,
    y: Schemas.Float,
    z: Schemas.Float,
    relative: Schemas.Optional(Schemas.Boolean)
  }),
  [ActionType.SET_ROTATION]: Schemas.Map({
    x: Schemas.Float,
    y: Schemas.Float,
    z: Schemas.Float,
    relative: Schemas.Optional(Schemas.Boolean)
  }),
  [ActionType.SET_SCALE]: Schemas.Map({
    x: Schemas.Float,
    y: Schemas.Float,
    z: Schemas.Float,
    relative: Schemas.Optional(Schemas.Boolean)
  }),
  [ActionType.FOLLOW_PLAYER]: Schemas.Map({
    speed: Schemas.Float,
    x: Schemas.Boolean,
    y: Schemas.Boolean,
    z: Schemas.Boolean,
    minDistance: Schemas.Float
  }),
  [ActionType.STOP_FOLLOWING_PLAYER]: Schemas.Map({}),
  [ActionType.RANDOM]: Schemas.Map({
    actions: Schemas.Array(Schemas.String)
  }),
  [ActionType.BATCH]: Schemas.Map({
    actions: Schemas.Array(Schemas.String)
  }),
  [ActionType.HEAL_PLAYER]: Schemas.Map({
    multiplier: Schemas.Int
  })
};
function getComponent(componentName, engine2) {
  try {
    return engine2.getComponent(componentName);
  } catch (error) {
    console.error(`Error using getComponent with componentName="${componentName}"`);
    throw error;
  }
}
function getComponents(engine2) {
  return {
    Actions: getComponent(ComponentName.ACTIONS, engine2),
    States: getComponent(ComponentName.STATES, engine2),
    Counter: getComponent(ComponentName.COUNTER, engine2),
    Triggers: getComponent(ComponentName.TRIGGERS, engine2),
    CounterBar: getComponent(ComponentName.COUNTER_BAR, engine2)
  };
}
function createComponents(engine2) {
  const ActionTypes = engine2.defineComponent(ComponentName.ACTION_TYPES, {
    value: Schemas.Array(Schemas.Map({
      type: Schemas.String,
      jsonSchema: Schemas.String
    }))
  });
  const Actions = engine2.defineComponent(ComponentName.ACTIONS, {
    id: Schemas.Int,
    value: Schemas.Array(Schemas.Map({
      name: Schemas.String,
      type: Schemas.String,
      jsonPayload: Schemas.String,
      allowedInBasicView: Schemas.Optional(Schemas.Boolean),
      basicViewId: Schemas.Optional(Schemas.String)
    }))
  });
  const Counter = engine2.defineComponent(ComponentName.COUNTER, {
    id: Schemas.Number,
    value: Schemas.Int
  });
  const Triggers = engine2.defineComponent(ComponentName.TRIGGERS, {
    value: Schemas.Array(Schemas.Map({
      type: Schemas.EnumString(TriggerType, TriggerType.ON_INPUT_ACTION),
      conditions: Schemas.Optional(Schemas.Array(Schemas.Map({
        id: Schemas.Optional(Schemas.Int),
        type: Schemas.EnumString(TriggerConditionType, TriggerConditionType.WHEN_STATE_IS),
        value: Schemas.String
      }))),
      operation: Schemas.Optional(Schemas.EnumString(TriggerConditionOperation, TriggerConditionOperation.AND)),
      actions: Schemas.Array(Schemas.Map({
        id: Schemas.Optional(Schemas.Int),
        name: Schemas.Optional(Schemas.String)
      })),
      basicViewId: Schemas.Optional(Schemas.String)
    }))
  });
  const States = engine2.defineComponent(ComponentName.STATES, {
    id: Schemas.Number,
    value: Schemas.Array(Schemas.String),
    defaultValue: Schemas.Optional(Schemas.String),
    currentValue: Schemas.Optional(Schemas.String),
    previousValue: Schemas.Optional(Schemas.String)
  });
  const CounterBar = engine2.defineComponent(ComponentName.COUNTER_BAR, {
    primaryColor: Schemas.Optional(Schemas.String),
    secondaryColor: Schemas.Optional(Schemas.String),
    maxValue: Schemas.Optional(Schemas.Float)
  });
  return {
    ActionTypes,
    Actions,
    Counter,
    Triggers,
    States,
    CounterBar
  };
}
function initComponents(engine2) {
  const actionTypes = Object.values(ActionType);
  for (const type of actionTypes) {
    const actionType = type;
    addActionType(engine2, actionType, ActionSchemas[actionType]);
  }
  const Counter = engine2.getComponent(ComponentName.COUNTER);
  const counter = Counter.getOrCreateMutable(engine2.RootEntity);
  counter.value = counter.value || 0;
  const { VideoPlayer: VideoPlayer3, Material: Material4 } = getExplorerComponents(engine2);
  initVideoPlayerComponents(engine2, { VideoPlayer: VideoPlayer3, Material: Material4 });
}
function getVideoTexture({ material }) {
  if (material?.$case === "pbr" && material.pbr.texture?.tex?.$case === "videoTexture") {
    return material.pbr.texture.tex.videoTexture;
  }
  return void 0;
}
function initVideoPlayerComponentMaterial(entity, { Material: Material4 }, material) {
  if (!material || !material.material || material.material.$case !== "pbr") {
    return null;
  }
  Material4.setPbrMaterial(entity, {
    ...material.material.pbr,
    texture: Material4.Texture.Video({
      videoPlayerEntity: entity
    })
  });
}
function initVideoPlayerComponents(engine2, components) {
  function replaceVideoTexture() {
    const { Material: Material4, VideoPlayer: VideoPlayer3 } = components;
    engine2.removeSystem(replaceVideoTexture);
    for (const [entity, material] of engine2.getEntitiesWith(Material4, VideoPlayer3)) {
      const videoTexture = getVideoTexture(material);
      if (videoTexture?.videoPlayerEntity === engine2.RootEntity) {
        initVideoPlayerComponentMaterial(entity, components, material);
      }
    }
  }
  engine2.addSystem(replaceVideoTexture);
}
function getConditionTypesByComponentName(componentName) {
  switch (componentName) {
    case ComponentName.STATES: {
      return [
        TriggerConditionType.WHEN_STATE_IS,
        TriggerConditionType.WHEN_STATE_IS_NOT,
        TriggerConditionType.WHEN_PREVIOUS_STATE_IS,
        TriggerConditionType.WHEN_PREVIOUS_STATE_IS_NOT
      ];
    }
    case ComponentName.COUNTER: {
      return [
        TriggerConditionType.WHEN_COUNTER_EQUALS,
        TriggerConditionType.WHEN_COUNTER_IS_GREATER_THAN,
        TriggerConditionType.WHEN_COUNTER_IS_LESS_THAN
      ];
    }
    case ComponentName.ACTIONS: {
      return [
        TriggerConditionType.WHEN_DISTANCE_TO_PLAYER_LESS_THAN,
        TriggerConditionType.WHEN_DISTANCE_TO_PLAYER_GREATER_THAN
      ];
    }
    default: {
      return [];
    }
  }
}

// node_modules/@dcl/ecs-math/dist/types.js
var ToGammaSpace = 1 / 2.2;
var ToLinearSpace = 2.2;
var Epsilon = 1e-6;
var DEG2RAD = Math.PI / 180;
var RAD2DEG = 360 / (Math.PI * 2);

// node_modules/@dcl/ecs-math/dist/Scalar.js
var Scalar;
(function(Scalar2) {
  Scalar2.TwoPi = Math.PI * 2;
  function withinEpsilon(a, b, epsilon = 1401298e-51) {
    const num = a - b;
    return -epsilon <= num && num <= epsilon;
  }
  Scalar2.withinEpsilon = withinEpsilon;
  function toHex(i) {
    const str = i.toString(16);
    if (i <= 15) {
      return ("0" + str).toUpperCase();
    }
    return str.toUpperCase();
  }
  Scalar2.toHex = toHex;
  function sign(value) {
    const _value = +value;
    if (_value === 0 || isNaN(_value)) {
      return _value;
    }
    return _value > 0 ? 1 : -1;
  }
  Scalar2.sign = sign;
  function clamp(value, min = 0, max = 1) {
    return Math.min(max, Math.max(min, value));
  }
  Scalar2.clamp = clamp;
  function log2(value) {
    return Math.log(value) * Math.LOG2E;
  }
  Scalar2.log2 = log2;
  function repeat(value, length2) {
    return value - Math.floor(value / length2) * length2;
  }
  Scalar2.repeat = repeat;
  function normalize(value, min, max) {
    return (value - min) / (max - min);
  }
  Scalar2.normalize = normalize;
  function denormalize(normalized, min, max) {
    return normalized * (max - min) + min;
  }
  Scalar2.denormalize = denormalize;
  function deltaAngle(current, target) {
    let num = repeat(target - current, 360);
    if (num > 180) {
      num -= 360;
    }
    return num;
  }
  Scalar2.deltaAngle = deltaAngle;
  function pingPong(tx, length2) {
    const t = repeat(tx, length2 * 2);
    return length2 - Math.abs(t - length2);
  }
  Scalar2.pingPong = pingPong;
  function smoothStep(from, to, tx) {
    let t = clamp(tx);
    t = -2 * t * t * t + 3 * t * t;
    return to * t + from * (1 - t);
  }
  Scalar2.smoothStep = smoothStep;
  function moveTowards(current, target, maxDelta) {
    let result = 0;
    if (Math.abs(target - current) <= maxDelta) {
      result = target;
    } else {
      result = current + sign(target - current) * maxDelta;
    }
    return result;
  }
  Scalar2.moveTowards = moveTowards;
  function moveTowardsAngle(current, target, maxDelta) {
    const num = deltaAngle(current, target);
    let result = 0;
    if (-maxDelta < num && num < maxDelta) {
      result = target;
    } else {
      result = moveTowards(current, current + num, maxDelta);
    }
    return result;
  }
  Scalar2.moveTowardsAngle = moveTowardsAngle;
  function lerp(start, end, amount) {
    return start + (end - start) * amount;
  }
  Scalar2.lerp = lerp;
  function lerpAngle(start, end, amount) {
    let num = repeat(end - start, 360);
    if (num > 180) {
      num -= 360;
    }
    return start + num * clamp(amount);
  }
  Scalar2.lerpAngle = lerpAngle;
  function inverseLerp(a, b, value) {
    let result = 0;
    if (a !== b) {
      result = clamp((value - a) / (b - a));
    } else {
      result = 0;
    }
    return result;
  }
  Scalar2.inverseLerp = inverseLerp;
  function hermite(value1, tangent1, value2, tangent2, amount) {
    const squared = amount * amount;
    const cubed = amount * squared;
    const part1 = 2 * cubed - 3 * squared + 1;
    const part2 = -2 * cubed + 3 * squared;
    const part3 = cubed - 2 * squared + amount;
    const part4 = cubed - squared;
    return value1 * part1 + value2 * part2 + tangent1 * part3 + tangent2 * part4;
  }
  Scalar2.hermite = hermite;
  function randomRange(min, max) {
    if (min === max) {
      return min;
    }
    return Math.random() * (max - min) + min;
  }
  Scalar2.randomRange = randomRange;
  function rangeToPercent(num, min, max) {
    return (num - min) / (max - min);
  }
  Scalar2.rangeToPercent = rangeToPercent;
  function percentToRange(percent, min, max) {
    return (max - min) * percent + min;
  }
  Scalar2.percentToRange = percentToRange;
  function normalizeRadians(angle) {
    return angle - Scalar2.TwoPi * Math.floor((angle + Math.PI) / Scalar2.TwoPi);
  }
  Scalar2.normalizeRadians = normalizeRadians;
})(Scalar || (Scalar = {}));

// node_modules/@dcl/ecs-math/dist/Vector3.js
var Vector32;
(function(Vector33) {
  function isNonUniform(vector) {
    const absX = Math.abs(vector.x);
    const absY = Math.abs(vector.y);
    if (absX !== absY) {
      return true;
    }
    const absZ = Math.abs(vector.z);
    if (absX !== absZ) {
      return true;
    }
    return false;
  }
  Vector33.isNonUniform = isNonUniform;
  function create(x = 0, y = 0, z = 0) {
    return { x, y, z };
  }
  Vector33.create = create;
  function add2(vector1, vector2) {
    return {
      x: vector1.x + vector2.x,
      y: vector1.y + vector2.y,
      z: vector1.z + vector2.z
    };
  }
  Vector33.add = add2;
  function addToRef(vectorA, vectorB, result) {
    result.x = vectorA.x + vectorB.x;
    result.y = vectorA.y + vectorB.y;
    result.z = vectorA.z + vectorB.z;
  }
  Vector33.addToRef = addToRef;
  function subtract2(vector1, vector2) {
    return {
      x: vector1.x - vector2.x,
      y: vector1.y - vector2.y,
      z: vector1.z - vector2.z
    };
  }
  Vector33.subtract = subtract2;
  function subtractToRef(vectorA, vectorB, result) {
    result.x = vectorA.x - vectorB.x;
    result.y = vectorA.y - vectorB.y;
    result.z = vectorA.z - vectorB.z;
  }
  Vector33.subtractToRef = subtractToRef;
  function subtractFromFloatsToRef(vector1, x, y, z, result) {
    result.x = vector1.x - x;
    result.y = vector1.y - y;
    result.z = vector1.z - z;
  }
  Vector33.subtractFromFloatsToRef = subtractFromFloatsToRef;
  function negate2(value) {
    return { x: -value.x, y: -value.y, z: -value.z };
  }
  Vector33.negate = negate2;
  function copyFrom(source, dest) {
    dest.x = source.x;
    dest.y = source.y;
    dest.z = source.z;
  }
  Vector33.copyFrom = copyFrom;
  function copyFromFloats(x, y, z, dest) {
    dest.x = x;
    dest.y = y;
    dest.z = z;
  }
  Vector33.copyFromFloats = copyFromFloats;
  function clone2(source) {
    return create(source.x, source.y, source.z);
  }
  Vector33.clone = clone2;
  function getClipFactor(vector0, vector1, axis, size) {
    const d0 = dot(vector0, axis) - size;
    const d1 = dot(vector1, axis) - size;
    const s = d0 / (d0 - d1);
    return s;
  }
  Vector33.getClipFactor = getClipFactor;
  function getAngleBetweenVectors(vector0, vector1, normal) {
    const v0 = normalize(vector0);
    const v1 = normalize(vector1);
    const v0v1dot = dot(v0, v1);
    const n = create();
    crossToRef(v0, v1, n);
    if (dot(n, normal) > 0) {
      return Math.acos(v0v1dot);
    }
    return -Math.acos(v0v1dot);
  }
  Vector33.getAngleBetweenVectors = getAngleBetweenVectors;
  function fromArray(array, offset = 0) {
    return create(array[offset], array[offset + 1], array[offset + 2]);
  }
  Vector33.fromArray = fromArray;
  function fromFloatArray(array, offset) {
    return fromArray(array, offset);
  }
  Vector33.fromFloatArray = fromFloatArray;
  function fromArrayToRef(array, offset, result) {
    result.x = array[offset];
    result.y = array[offset + 1];
    result.z = array[offset + 2];
  }
  Vector33.fromArrayToRef = fromArrayToRef;
  function fromFloatArrayToRef(array, offset, result) {
    return fromArrayToRef(array, offset, result);
  }
  Vector33.fromFloatArrayToRef = fromFloatArrayToRef;
  function length2(vector) {
    return Math.sqrt(vector.x * vector.x + vector.y * vector.y + vector.z * vector.z);
  }
  Vector33.length = length2;
  function lengthSquared(vector) {
    return vector.x * vector.x + vector.y * vector.y + vector.z * vector.z;
  }
  Vector33.lengthSquared = lengthSquared;
  function scaleToRef(vector, scale2, result) {
    result.x = vector.x * scale2;
    result.y = vector.y * scale2;
    result.z = vector.z * scale2;
  }
  Vector33.scaleToRef = scaleToRef;
  function scale(vector, scale2) {
    return create(vector.x * scale2, vector.y * scale2, vector.z * scale2);
  }
  Vector33.scale = scale;
  function normalizeFromLength(vector, len) {
    const result = create(0, 0, 0);
    normalizeFromLengthToRef(vector, len, result);
    return result;
  }
  Vector33.normalizeFromLength = normalizeFromLength;
  function normalizeFromLengthToRef(vector, len, result) {
    if (len === 0 || len === 1) {
      copyFrom(vector, result);
      return;
    }
    scaleToRef(vector, 1 / len, result);
  }
  Vector33.normalizeFromLengthToRef = normalizeFromLengthToRef;
  function normalize(vector) {
    return normalizeFromLength(vector, length2(vector));
  }
  Vector33.normalize = normalize;
  function normalizeToRef(vector, result) {
    normalizeFromLengthToRef(vector, length2(vector), result);
  }
  Vector33.normalizeToRef = normalizeToRef;
  function dot(left, right) {
    return left.x * right.x + left.y * right.y + left.z * right.z;
  }
  Vector33.dot = dot;
  function applyMatrix4(vector, matrix) {
    const result = clone2(vector);
    applyMatrix4ToRef(vector, matrix, result);
    return result;
  }
  Vector33.applyMatrix4 = applyMatrix4;
  function applyMatrix4ToRef(vector, matrix, result) {
    const { x, y, z } = vector;
    const m = matrix._m;
    const w = 1 / (m[3] * x + m[7] * y + m[11] * z + m[15]);
    result.x = (m[0] * x + m[4] * y + m[8] * z + m[12]) * w;
    result.y = (m[1] * x + m[5] * y + m[9] * z + m[13]) * w;
    result.z = (m[2] * x + m[6] * y + m[10] * z + m[14]) * w;
  }
  Vector33.applyMatrix4ToRef = applyMatrix4ToRef;
  function rotate(vector, q) {
    const result = create();
    rotateToRef(vector, q, result);
    return result;
  }
  Vector33.rotate = rotate;
  function rotateToRef(vector, q, result) {
    const { x, y, z } = vector;
    const { x: qx, y: qy, z: qz, w: qw } = q;
    const ix = qw * x + qy * z - qz * y;
    const iy = qw * y + qz * x - qx * z;
    const iz = qw * z + qx * y - qy * x;
    const iw = -qx * x - qy * y - qz * z;
    result.x = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    result.y = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    result.z = iz * qw + iw * -qz + ix * -qy - iy * -qx;
  }
  Vector33.rotateToRef = rotateToRef;
  function lerp(start, end, amount) {
    const result = create(0, 0, 0);
    lerpToRef(start, end, amount, result);
    return result;
  }
  Vector33.lerp = lerp;
  function lerpToRef(start, end, amount, result) {
    result.x = start.x + (end.x - start.x) * amount;
    result.y = start.y + (end.y - start.y) * amount;
    result.z = start.z + (end.z - start.z) * amount;
  }
  Vector33.lerpToRef = lerpToRef;
  function cross(left, right) {
    const result = Zero();
    crossToRef(left, right, result);
    return result;
  }
  Vector33.cross = cross;
  function crossToRef(left, right, result) {
    result.x = left.y * right.z - left.z * right.y;
    result.y = left.z * right.x - left.x * right.z;
    result.z = left.x * right.y - left.y * right.x;
  }
  Vector33.crossToRef = crossToRef;
  function transformCoordinates(vector, transformation) {
    const result = Zero();
    transformCoordinatesToRef(vector, transformation, result);
    return result;
  }
  Vector33.transformCoordinates = transformCoordinates;
  function transformCoordinatesToRef(vector, transformation, result) {
    return transformCoordinatesFromFloatsToRef(vector.x, vector.y, vector.z, transformation, result);
  }
  Vector33.transformCoordinatesToRef = transformCoordinatesToRef;
  function transformCoordinatesFromFloatsToRef(x, y, z, transformation, result) {
    const m = transformation._m;
    const rx = x * m[0] + y * m[4] + z * m[8] + m[12];
    const ry = x * m[1] + y * m[5] + z * m[9] + m[13];
    const rz = x * m[2] + y * m[6] + z * m[10] + m[14];
    const rw = 1 / (x * m[3] + y * m[7] + z * m[11] + m[15]);
    result.x = rx * rw;
    result.y = ry * rw;
    result.z = rz * rw;
  }
  Vector33.transformCoordinatesFromFloatsToRef = transformCoordinatesFromFloatsToRef;
  function transformNormal(vector, transformation) {
    const result = Zero();
    transformNormalToRef(vector, transformation, result);
    return result;
  }
  Vector33.transformNormal = transformNormal;
  function transformNormalToRef(vector, transformation, result) {
    transformNormalFromFloatsToRef(vector.x, vector.y, vector.z, transformation, result);
  }
  Vector33.transformNormalToRef = transformNormalToRef;
  function transformNormalFromFloatsToRef(x, y, z, transformation, result) {
    const m = transformation._m;
    result.x = x * m[0] + y * m[4] + z * m[8];
    result.y = x * m[1] + y * m[5] + z * m[9];
    result.z = x * m[2] + y * m[6] + z * m[10];
  }
  Vector33.transformNormalFromFloatsToRef = transformNormalFromFloatsToRef;
  function catmullRom(value1, value2, value3, value4, amount) {
    const squared = amount * amount;
    const cubed = amount * squared;
    const x = 0.5 * (2 * value2.x + (-value1.x + value3.x) * amount + (2 * value1.x - 5 * value2.x + 4 * value3.x - value4.x) * squared + (-value1.x + 3 * value2.x - 3 * value3.x + value4.x) * cubed);
    const y = 0.5 * (2 * value2.y + (-value1.y + value3.y) * amount + (2 * value1.y - 5 * value2.y + 4 * value3.y - value4.y) * squared + (-value1.y + 3 * value2.y - 3 * value3.y + value4.y) * cubed);
    const z = 0.5 * (2 * value2.z + (-value1.z + value3.z) * amount + (2 * value1.z - 5 * value2.z + 4 * value3.z - value4.z) * squared + (-value1.z + 3 * value2.z - 3 * value3.z + value4.z) * cubed);
    return create(x, y, z);
  }
  Vector33.catmullRom = catmullRom;
  function clamp(value, min, max) {
    const v = create();
    clampToRef(value, min, max, v);
    return v;
  }
  Vector33.clamp = clamp;
  function clampToRef(value, min, max, result) {
    let x = value.x;
    x = x > max.x ? max.x : x;
    x = x < min.x ? min.x : x;
    let y = value.y;
    y = y > max.y ? max.y : y;
    y = y < min.y ? min.y : y;
    let z = value.z;
    z = z > max.z ? max.z : z;
    z = z < min.z ? min.z : z;
    copyFromFloats(x, y, z, result);
  }
  Vector33.clampToRef = clampToRef;
  function hermite(value1, tangent1, value2, tangent2, amount) {
    const squared = amount * amount;
    const cubed = amount * squared;
    const part1 = 2 * cubed - 3 * squared + 1;
    const part2 = -2 * cubed + 3 * squared;
    const part3 = cubed - 2 * squared + amount;
    const part4 = cubed - squared;
    const x = value1.x * part1 + value2.x * part2 + tangent1.x * part3 + tangent2.x * part4;
    const y = value1.y * part1 + value2.y * part2 + tangent1.y * part3 + tangent2.y * part4;
    const z = value1.z * part1 + value2.z * part2 + tangent1.z * part3 + tangent2.z * part4;
    return create(x, y, z);
  }
  Vector33.hermite = hermite;
  function minimize(left, right) {
    const min = create();
    minimizeInPlaceFromFloatsToRef(right, left.x, left.y, left.z, min);
    return min;
  }
  Vector33.minimize = minimize;
  function maximize(left, right) {
    const max = create();
    maximizeInPlaceFromFloatsToRef(left, right.x, right.y, right.z, max);
    return max;
  }
  Vector33.maximize = maximize;
  function distance(value1, value2) {
    return Math.sqrt(distanceSquared(value1, value2));
  }
  Vector33.distance = distance;
  function distanceSquared(value1, value2) {
    const x = value1.x - value2.x;
    const y = value1.y - value2.y;
    const z = value1.z - value2.z;
    return x * x + y * y + z * z;
  }
  Vector33.distanceSquared = distanceSquared;
  function center(value1, value2) {
    const center2 = add2(value1, value2);
    scaleToRef(center2, 0.5, center2);
    return center2;
  }
  Vector33.center = center;
  function rotationFromAxis(axis1, axis2, axis3) {
    const rotation = Zero();
    rotationFromAxisToRef(axis1, axis2, axis3, rotation);
    return rotation;
  }
  Vector33.rotationFromAxis = rotationFromAxis;
  function rotationFromAxisToRef(axis1, axis2, axis3, result) {
    const quat = Quaternion2.create();
    Quaternion2.fromAxisToRotationQuaternionToRef(axis1, axis2, axis3, quat);
    copyFrom(Quaternion2.toEulerAngles(quat), result);
  }
  Vector33.rotationFromAxisToRef = rotationFromAxisToRef;
  function toString2(vector) {
    return `(${vector.x}, ${vector.y}, ${vector.z})`;
  }
  Vector33.toString = toString2;
  function getHashCode(vector) {
    let hash = vector.x || 0;
    hash = hash * 397 ^ (vector.y || 0);
    hash = hash * 397 ^ (vector.z || 0);
    return hash;
  }
  Vector33.getHashCode = getHashCode;
  function equals2(vector1, vector2) {
    return vector1.x === vector2.x && vector1.y === vector2.y && vector1.z === vector2.z;
  }
  Vector33.equals = equals2;
  function equalsWithEpsilon(vector1, vector2, epsilon = Epsilon) {
    return Scalar.withinEpsilon(vector1.x, vector2.x, epsilon) && Scalar.withinEpsilon(vector1.y, vector2.y, epsilon) && Scalar.withinEpsilon(vector1.z, vector2.z, epsilon);
  }
  Vector33.equalsWithEpsilon = equalsWithEpsilon;
  function equalsToFloats(vector, x, y, z) {
    return vector.x === x && vector.y === y && vector.z === z;
  }
  Vector33.equalsToFloats = equalsToFloats;
  function multiply2(vector1, vector2) {
    const result = create();
    multiplyToRef(vector1, vector2, result);
    return result;
  }
  Vector33.multiply = multiply2;
  function multiplyToRef(vector1, vector2, result) {
    result.x = vector1.x * vector2.x;
    result.y = vector1.y * vector2.y;
    result.z = vector1.z * vector2.z;
  }
  Vector33.multiplyToRef = multiplyToRef;
  function multiplyByFloatsToRef(vector1, x, y, z, result) {
    result.x = vector1.x * x;
    result.y = vector1.y * y;
    result.z = vector1.z * z;
  }
  Vector33.multiplyByFloatsToRef = multiplyByFloatsToRef;
  function multiplyByFloats(vector1, x, y, z) {
    const result = create();
    multiplyByFloatsToRef(vector1, x, y, z, result);
    return result;
  }
  Vector33.multiplyByFloats = multiplyByFloats;
  function divide2(vector1, vector2) {
    return {
      x: vector1.x / vector2.x,
      y: vector1.y / vector2.y,
      z: vector1.z / vector2.z
    };
  }
  Vector33.divide = divide2;
  function divideToRef(vector1, vector2, result) {
    result.x = vector1.x / vector2.x;
    result.y = vector1.y / vector2.y;
    result.z = vector1.z / vector2.z;
  }
  Vector33.divideToRef = divideToRef;
  function maximizeInPlaceFromFloatsToRef(vector1, x, y, z, result) {
    if (x > vector1.x) {
      result.x = x;
    } else {
      result.x = vector1.x;
    }
    if (y > vector1.y) {
      result.y = y;
    } else {
      result.y = vector1.y;
    }
    if (z > vector1.z) {
      result.z = z;
    } else {
      result.z = vector1.z;
    }
  }
  Vector33.maximizeInPlaceFromFloatsToRef = maximizeInPlaceFromFloatsToRef;
  function minimizeInPlaceFromFloatsToRef(vector1, x, y, z, result) {
    if (x < vector1.x) {
      result.x = x;
    } else {
      result.x = vector1.x;
    }
    if (y < vector1.y) {
      result.y = y;
    } else {
      result.y = vector1.y;
    }
    if (z < vector1.z) {
      result.z = z;
    } else {
      result.z = vector1.z;
    }
  }
  Vector33.minimizeInPlaceFromFloatsToRef = minimizeInPlaceFromFloatsToRef;
  function floor(vector1) {
    return create(Math.floor(vector1.x), Math.floor(vector1.y), Math.floor(vector1.z));
  }
  Vector33.floor = floor;
  function fract(vector1) {
    return create(vector1.x - Math.floor(vector1.x), vector1.y - Math.floor(vector1.y), vector1.z - Math.floor(vector1.z));
  }
  Vector33.fract = fract;
  function Zero() {
    return create(0, 0, 0);
  }
  Vector33.Zero = Zero;
  function One() {
    return create(1, 1, 1);
  }
  Vector33.One = One;
  function Up() {
    return create(0, 1, 0);
  }
  Vector33.Up = Up;
  function Down() {
    return create(0, -1, 0);
  }
  Vector33.Down = Down;
  function Forward() {
    return create(0, 0, 1);
  }
  Vector33.Forward = Forward;
  function Backward() {
    return create(0, 0, -1);
  }
  Vector33.Backward = Backward;
  function Right() {
    return create(1, 0, 0);
  }
  Vector33.Right = Right;
  function Left() {
    return create(-1, 0, 0);
  }
  Vector33.Left = Left;
  function Random() {
    return create(Math.random(), Math.random(), Math.random());
  }
  Vector33.Random = Random;
})(Vector32 || (Vector32 = {}));

// node_modules/@dcl/ecs-math/dist/Plane.js
var Plane;
(function(Plane2) {
  function create(a, b, c, d) {
    return {
      normal: Vector32.create(a, b, c),
      d
    };
  }
  Plane2.create = create;
  function fromArray(array) {
    return create(array[0], array[1], array[2], array[3]);
  }
  Plane2.fromArray = fromArray;
  function fromPoints(_point1, _point2, _point3) {
    const result = create(0, 0, 0, 0);
    return result;
  }
  Plane2.fromPoints = fromPoints;
  function romPositionAndNormal(origin, normal) {
    const result = create(0, 0, 0, 0);
    result.normal = Vector32.normalize(normal);
    result.d = -(normal.x * origin.x + normal.y * origin.y + normal.z * origin.z);
    return result;
  }
  Plane2.romPositionAndNormal = romPositionAndNormal;
  function signedDistanceToPlaneFromPositionAndNormal(origin, normal, point) {
    const d = -(normal.x * origin.x + normal.y * origin.y + normal.z * origin.z);
    return Vector32.dot(point, normal) + d;
  }
  Plane2.signedDistanceToPlaneFromPositionAndNormal = signedDistanceToPlaneFromPositionAndNormal;
  function asArray(plane) {
    return [plane.normal.x, plane.normal.y, plane.normal.z, plane.d];
  }
  Plane2.asArray = asArray;
  function clone2(plane) {
    return create(plane.normal.x, plane.normal.y, plane.normal.z, plane.d);
  }
  Plane2.clone = clone2;
  function getHashCode(_plane) {
    return 0;
  }
  Plane2.getHashCode = getHashCode;
  function normalize(plane) {
    const result = create(0, 0, 0, 0);
    const norm = Math.sqrt(plane.normal.x * plane.normal.x + plane.normal.y * plane.normal.y + plane.normal.z * plane.normal.z);
    let magnitude = 0;
    if (norm !== 0) {
      magnitude = 1 / norm;
    }
    result.normal.x = plane.normal.x * magnitude;
    result.normal.y = plane.normal.y * magnitude;
    result.normal.z = plane.normal.z * magnitude;
    result.d *= magnitude;
    return plane;
  }
  Plane2.normalize = normalize;
  function transform(plane, transformation) {
    const transposedMatrix = Matrix.create();
    Matrix.transposeToRef(transformation, transposedMatrix);
    const m = transposedMatrix._m;
    const x = plane.normal.x;
    const y = plane.normal.y;
    const z = plane.normal.z;
    const d = plane.d;
    const normalX = x * m[0] + y * m[1] + z * m[2] + d * m[3];
    const normalY = x * m[4] + y * m[5] + z * m[6] + d * m[7];
    const normalZ = x * m[8] + y * m[9] + z * m[10] + d * m[11];
    const finalD = x * m[12] + y * m[13] + z * m[14] + d * m[15];
    return create(normalX, normalY, normalZ, finalD);
  }
  Plane2.transform = transform;
  function dotCoordinate(plane, point) {
    return plane.normal.x * point.x + plane.normal.y * point.y + plane.normal.z * point.z + plane.d;
  }
  Plane2.dotCoordinate = dotCoordinate;
  function copyFromPoints(point1, point2, point3) {
    const x1 = point2.x - point1.x;
    const y1 = point2.y - point1.y;
    const z1 = point2.z - point1.z;
    const x2 = point3.x - point1.x;
    const y2 = point3.y - point1.y;
    const z2 = point3.z - point1.z;
    const yz = y1 * z2 - z1 * y2;
    const xz = z1 * x2 - x1 * z2;
    const xy = x1 * y2 - y1 * x2;
    const pyth = Math.sqrt(yz * yz + xz * xz + xy * xy);
    let invPyth;
    if (pyth !== 0) {
      invPyth = 1 / pyth;
    } else {
      invPyth = 0;
    }
    const normal = Vector32.create(yz * invPyth, xz * invPyth, xy * invPyth);
    return {
      normal,
      d: -(normal.x * point1.x + normal.y * point1.y + normal.z * point1.z)
    };
  }
  Plane2.copyFromPoints = copyFromPoints;
  function isFrontFacingTo(plane, direction, epsilon) {
    const dot = Vector32.dot(plane.normal, direction);
    return dot <= epsilon;
  }
  Plane2.isFrontFacingTo = isFrontFacingTo;
  function signedDistanceTo(plane, point) {
    return Vector32.dot(point, plane.normal) + plane.d;
  }
  Plane2.signedDistanceTo = signedDistanceTo;
})(Plane || (Plane = {}));

// node_modules/@dcl/ecs-math/dist/Matrix.js
var Matrix;
(function(Matrix2) {
  function m(self2) {
    return self2._m;
  }
  Matrix2.m = m;
  let _updateFlagSeed = 0;
  const _identityReadonly = {};
  function IdentityReadonly() {
    return _identityReadonly;
  }
  Matrix2.IdentityReadonly = IdentityReadonly;
  function create() {
    const newMatrix = {
      updateFlag: 0,
      isIdentity: false,
      isIdentity3x2: true,
      _isIdentityDirty: true,
      _isIdentity3x2Dirty: true,
      _m: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    };
    _updateIdentityStatus(newMatrix, false);
    return newMatrix;
  }
  Matrix2.create = create;
  function fromArray(array, offset = 0) {
    const result = create();
    fromArrayToRef(array, offset, result);
    return result;
  }
  Matrix2.fromArray = fromArray;
  function fromArrayToRef(array, offset, result) {
    for (let index = 0; index < 16; index++) {
      result._m[index] = array[index + offset];
    }
    _markAsUpdated(result);
  }
  Matrix2.fromArrayToRef = fromArrayToRef;
  function fromFloatArrayToRefScaled(array, offset, scale2, result) {
    for (let index = 0; index < 16; index++) {
      result._m[index] = array[index + offset] * scale2;
    }
    _markAsUpdated(result);
  }
  Matrix2.fromFloatArrayToRefScaled = fromFloatArrayToRefScaled;
  function fromValuesToRef(initialM11, initialM12, initialM13, initialM14, initialM21, initialM22, initialM23, initialM24, initialM31, initialM32, initialM33, initialM34, initialM41, initialM42, initialM43, initialM44, result) {
    const m2 = result._m;
    m2[0] = initialM11;
    m2[1] = initialM12;
    m2[2] = initialM13;
    m2[3] = initialM14;
    m2[4] = initialM21;
    m2[5] = initialM22;
    m2[6] = initialM23;
    m2[7] = initialM24;
    m2[8] = initialM31;
    m2[9] = initialM32;
    m2[10] = initialM33;
    m2[11] = initialM34;
    m2[12] = initialM41;
    m2[13] = initialM42;
    m2[14] = initialM43;
    m2[15] = initialM44;
    _markAsUpdated(result);
  }
  Matrix2.fromValuesToRef = fromValuesToRef;
  function fromValues(initialM11, initialM12, initialM13, initialM14, initialM21, initialM22, initialM23, initialM24, initialM31, initialM32, initialM33, initialM34, initialM41, initialM42, initialM43, initialM44) {
    const result = create();
    const m2 = result._m;
    m2[0] = initialM11;
    m2[1] = initialM12;
    m2[2] = initialM13;
    m2[3] = initialM14;
    m2[4] = initialM21;
    m2[5] = initialM22;
    m2[6] = initialM23;
    m2[7] = initialM24;
    m2[8] = initialM31;
    m2[9] = initialM32;
    m2[10] = initialM33;
    m2[11] = initialM34;
    m2[12] = initialM41;
    m2[13] = initialM42;
    m2[14] = initialM43;
    m2[15] = initialM44;
    _markAsUpdated(result);
    return result;
  }
  Matrix2.fromValues = fromValues;
  function compose(scale2, rotation, translation2) {
    const result = create();
    composeToRef(scale2, rotation, translation2, result);
    return result;
  }
  Matrix2.compose = compose;
  function composeToRef(scale2, rotation, translation2, result) {
    const tmpMatrix = [create(), create(), create()];
    scalingToRef(scale2.x, scale2.y, scale2.z, tmpMatrix[1]);
    fromQuaternionToRef(rotation, tmpMatrix[0]);
    multiplyToRef(tmpMatrix[1], tmpMatrix[0], result);
    setTranslation(result, translation2);
  }
  Matrix2.composeToRef = composeToRef;
  function Identity() {
    const identity = fromValues(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    _updateIdentityStatus(identity, true);
    return identity;
  }
  Matrix2.Identity = Identity;
  function IdentityToRef(result) {
    fromValuesToRef(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, result);
    _updateIdentityStatus(result, true);
  }
  Matrix2.IdentityToRef = IdentityToRef;
  function Zero() {
    const zero = fromValues(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    _updateIdentityStatus(zero, false);
    return zero;
  }
  Matrix2.Zero = Zero;
  function RotationX(angle) {
    const result = create();
    rotationXToRef(angle, result);
    return result;
  }
  Matrix2.RotationX = RotationX;
  function rotationXToRef(angle, result) {
    const s = Math.sin(angle);
    const c = Math.cos(angle);
    fromValuesToRef(1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1, result);
    _updateIdentityStatus(result, c === 1 && s === 0);
  }
  Matrix2.rotationXToRef = rotationXToRef;
  function rotationY(angle) {
    const result = create();
    rotationYToRef(angle, result);
    return result;
  }
  Matrix2.rotationY = rotationY;
  function rotationYToRef(angle, result) {
    const s = Math.sin(angle);
    const c = Math.cos(angle);
    fromValuesToRef(c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1, result);
    _updateIdentityStatus(result, c === 1 && s === 0);
  }
  Matrix2.rotationYToRef = rotationYToRef;
  function rotationZ(angle) {
    const result = create();
    rotationZToRef(angle, result);
    return result;
  }
  Matrix2.rotationZ = rotationZ;
  function rotationZToRef(angle, result) {
    const s = Math.sin(angle);
    const c = Math.cos(angle);
    fromValuesToRef(c, s, 0, 0, -s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, result);
    _updateIdentityStatus(result, c === 1 && s === 0);
  }
  Matrix2.rotationZToRef = rotationZToRef;
  function rotationAxis(axis, angle) {
    const result = create();
    rotationAxisToRef(axis, angle, result);
    return result;
  }
  Matrix2.rotationAxis = rotationAxis;
  function rotationAxisToRef(_axis, angle, result) {
    const s = Math.sin(-angle);
    const c = Math.cos(-angle);
    const c1 = 1 - c;
    const axis = Vector32.normalize(_axis);
    const m2 = result._m;
    m2[0] = axis.x * axis.x * c1 + c;
    m2[1] = axis.x * axis.y * c1 - axis.z * s;
    m2[2] = axis.x * axis.z * c1 + axis.y * s;
    m2[3] = 0;
    m2[4] = axis.y * axis.x * c1 + axis.z * s;
    m2[5] = axis.y * axis.y * c1 + c;
    m2[6] = axis.y * axis.z * c1 - axis.x * s;
    m2[7] = 0;
    m2[8] = axis.z * axis.x * c1 - axis.y * s;
    m2[9] = axis.z * axis.y * c1 + axis.x * s;
    m2[10] = axis.z * axis.z * c1 + c;
    m2[11] = 0;
    m2[12] = 0;
    m2[13] = 0;
    m2[14] = 0;
    m2[15] = 1;
    _markAsUpdated(result);
  }
  Matrix2.rotationAxisToRef = rotationAxisToRef;
  function rotationYawPitchRoll(yaw, pitch, roll) {
    const result = create();
    rotationYawPitchRollToRef(yaw, pitch, roll, result);
    return result;
  }
  Matrix2.rotationYawPitchRoll = rotationYawPitchRoll;
  function rotationYawPitchRollToRef(yaw, pitch, roll, result) {
    const quaternionResult = Quaternion2.Zero();
    Quaternion2.fromRotationYawPitchRollToRef(yaw, pitch, roll, quaternionResult);
    fromQuaternionToRef(quaternionResult, result);
  }
  Matrix2.rotationYawPitchRollToRef = rotationYawPitchRollToRef;
  function scaling(x, y, z) {
    const result = create();
    scalingToRef(x, y, z, result);
    return result;
  }
  Matrix2.scaling = scaling;
  function scalingToRef(x, y, z, result) {
    fromValuesToRef(x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1, result);
    _updateIdentityStatus(result, x === 1 && y === 1 && z === 1);
  }
  Matrix2.scalingToRef = scalingToRef;
  function translation(x, y, z) {
    const result = create();
    translationToRef(x, y, z, result);
    return result;
  }
  Matrix2.translation = translation;
  function translationToRef(x, y, z, result) {
    fromValuesToRef(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, z, 1, result);
    _updateIdentityStatus(result, x === 0 && y === 0 && z === 0);
  }
  Matrix2.translationToRef = translationToRef;
  function lerp(startValue, endValue, gradient) {
    const result = create();
    lerpToRef(startValue, endValue, gradient, result);
    return result;
  }
  Matrix2.lerp = lerp;
  function lerpToRef(startValue, endValue, gradient, result) {
    for (let index = 0; index < 16; index++) {
      result._m[index] = startValue._m[index] * (1 - gradient) + endValue._m[index] * gradient;
    }
    _markAsUpdated(result);
  }
  Matrix2.lerpToRef = lerpToRef;
  function decomposeLerp(startValue, endValue, gradient) {
    const result = create();
    decomposeLerpToRef(startValue, endValue, gradient, result);
    return result;
  }
  Matrix2.decomposeLerp = decomposeLerp;
  function decomposeLerpToRef(startValue, endValue, gradient, result) {
    const startScale = Vector32.Zero();
    const startRotation = Quaternion2.Zero();
    const startTranslation = Vector32.Zero();
    decompose(startValue, startScale, startRotation, startTranslation);
    const endScale = Vector32.Zero();
    const endRotation = Quaternion2.Zero();
    const endTranslation = Vector32.Zero();
    decompose(endValue, endScale, endRotation, endTranslation);
    const resultScale = Vector32.Zero();
    Vector32.lerpToRef(startScale, endScale, gradient, resultScale);
    const resultRotation = Quaternion2.Zero();
    Quaternion2.slerpToRef(startRotation, endRotation, gradient, resultRotation);
    const resultTranslation = Vector32.Zero();
    Vector32.lerpToRef(startTranslation, endTranslation, gradient, resultTranslation);
    composeToRef(resultScale, resultRotation, resultTranslation, result);
  }
  Matrix2.decomposeLerpToRef = decomposeLerpToRef;
  function LookAtLH(eye, target, up) {
    const result = create();
    lookAtLHToRef(eye, target, up, result);
    return result;
  }
  Matrix2.LookAtLH = LookAtLH;
  function lookAtLHToRef(eye, target, up, result) {
    const xAxis = Vector32.Zero();
    const yAxis = Vector32.Zero();
    const zAxis = Vector32.Zero();
    Vector32.subtractToRef(target, eye, zAxis);
    Vector32.normalizeToRef(zAxis, zAxis);
    Vector32.crossToRef(up, zAxis, xAxis);
    const xSquareLength = Vector32.lengthSquared(xAxis);
    if (xSquareLength === 0) {
      xAxis.x = 1;
    } else {
      Vector32.normalizeFromLengthToRef(xAxis, Math.sqrt(xSquareLength), xAxis);
    }
    Vector32.crossToRef(zAxis, xAxis, yAxis);
    Vector32.normalizeToRef(yAxis, yAxis);
    const ex = -Vector32.dot(xAxis, eye);
    const ey = -Vector32.dot(yAxis, eye);
    const ez = -Vector32.dot(zAxis, eye);
    fromValuesToRef(xAxis.x, yAxis.x, zAxis.x, 0, xAxis.y, yAxis.y, zAxis.y, 0, xAxis.z, yAxis.z, zAxis.z, 0, ex, ey, ez, 1, result);
  }
  Matrix2.lookAtLHToRef = lookAtLHToRef;
  function lookAtRH(eye, target, up) {
    const result = create();
    lookAtRHToRef(eye, target, up, result);
    return result;
  }
  Matrix2.lookAtRH = lookAtRH;
  function lookAtRHToRef(eye, target, up, result) {
    const xAxis = Vector32.Zero();
    const yAxis = Vector32.Zero();
    const zAxis = Vector32.Zero();
    Vector32.subtractToRef(eye, target, zAxis);
    Vector32.normalizeToRef(zAxis, zAxis);
    Vector32.crossToRef(up, zAxis, xAxis);
    const xSquareLength = Vector32.lengthSquared(xAxis);
    if (xSquareLength === 0) {
      xAxis.x = 1;
    } else {
      Vector32.normalizeFromLengthToRef(xAxis, Math.sqrt(xSquareLength), xAxis);
    }
    Vector32.crossToRef(zAxis, xAxis, yAxis);
    Vector32.normalizeToRef(yAxis, yAxis);
    const ex = -Vector32.dot(xAxis, eye);
    const ey = -Vector32.dot(yAxis, eye);
    const ez = -Vector32.dot(zAxis, eye);
    fromValuesToRef(xAxis.x, yAxis.x, zAxis.x, 0, xAxis.y, yAxis.y, zAxis.y, 0, xAxis.z, yAxis.z, zAxis.z, 0, ex, ey, ez, 1, result);
  }
  Matrix2.lookAtRHToRef = lookAtRHToRef;
  function orthoLH(width, height, znear, zfar) {
    const matrix = create();
    orthoLHToRef(width, height, znear, zfar, matrix);
    return matrix;
  }
  Matrix2.orthoLH = orthoLH;
  function orthoLHToRef(width, height, znear, zfar, result) {
    const n = znear;
    const f = zfar;
    const a = 2 / width;
    const b = 2 / height;
    const c = 2 / (f - n);
    const d = -(f + n) / (f - n);
    fromValuesToRef(a, 0, 0, 0, 0, b, 0, 0, 0, 0, c, 0, 0, 0, d, 1, result);
    _updateIdentityStatus(result, a === 1 && b === 1 && c === 1 && d === 0);
  }
  Matrix2.orthoLHToRef = orthoLHToRef;
  function OrthoOffCenterLH(left, right, bottom, top, znear, zfar) {
    const matrix = create();
    orthoOffCenterLHToRef(left, right, bottom, top, znear, zfar, matrix);
    return matrix;
  }
  Matrix2.OrthoOffCenterLH = OrthoOffCenterLH;
  function orthoOffCenterLHToRef(left, right, bottom, top, znear, zfar, result) {
    const n = znear;
    const f = zfar;
    const a = 2 / (right - left);
    const b = 2 / (top - bottom);
    const c = 2 / (f - n);
    const d = -(f + n) / (f - n);
    const i0 = (left + right) / (left - right);
    const i1 = (top + bottom) / (bottom - top);
    fromValuesToRef(a, 0, 0, 0, 0, b, 0, 0, 0, 0, c, 0, i0, i1, d, 1, result);
    _markAsUpdated(result);
  }
  Matrix2.orthoOffCenterLHToRef = orthoOffCenterLHToRef;
  function orthoOffCenterRH(left, right, bottom, top, znear, zfar) {
    const matrix = create();
    orthoOffCenterRHToRef(left, right, bottom, top, znear, zfar, matrix);
    return matrix;
  }
  Matrix2.orthoOffCenterRH = orthoOffCenterRH;
  function orthoOffCenterRHToRef(left, right, bottom, top, znear, zfar, result) {
    orthoOffCenterLHToRef(left, right, bottom, top, znear, zfar, result);
    result._m[10] *= -1;
  }
  Matrix2.orthoOffCenterRHToRef = orthoOffCenterRHToRef;
  function perspectiveLH(width, height, znear, zfar) {
    const matrix = create();
    const n = znear;
    const f = zfar;
    const a = 2 * n / width;
    const b = 2 * n / height;
    const c = (f + n) / (f - n);
    const d = -2 * f * n / (f - n);
    fromValuesToRef(a, 0, 0, 0, 0, b, 0, 0, 0, 0, c, 1, 0, 0, d, 0, matrix);
    _updateIdentityStatus(matrix, false);
    return matrix;
  }
  Matrix2.perspectiveLH = perspectiveLH;
  function perspectiveFovLH(fov, aspect, znear, zfar) {
    const matrix = create();
    perspectiveFovLHToRef(fov, aspect, znear, zfar, matrix);
    return matrix;
  }
  Matrix2.perspectiveFovLH = perspectiveFovLH;
  function perspectiveFovLHToRef(fov, aspect, znear, zfar, result, isVerticalFovFixed = true) {
    const n = znear;
    const f = zfar;
    const t = 1 / Math.tan(fov * 0.5);
    const a = isVerticalFovFixed ? t / aspect : t;
    const b = isVerticalFovFixed ? t : t * aspect;
    const c = (f + n) / (f - n);
    const d = -2 * f * n / (f - n);
    fromValuesToRef(a, 0, 0, 0, 0, b, 0, 0, 0, 0, c, 1, 0, 0, d, 0, result);
    _updateIdentityStatus(result, false);
  }
  Matrix2.perspectiveFovLHToRef = perspectiveFovLHToRef;
  function PerspectiveFovRH(fov, aspect, znear, zfar) {
    const matrix = create();
    perspectiveFovRHToRef(fov, aspect, znear, zfar, matrix);
    return matrix;
  }
  Matrix2.PerspectiveFovRH = PerspectiveFovRH;
  function perspectiveFovRHToRef(fov, aspect, znear, zfar, result, isVerticalFovFixed = true) {
    const n = znear;
    const f = zfar;
    const t = 1 / Math.tan(fov * 0.5);
    const a = isVerticalFovFixed ? t / aspect : t;
    const b = isVerticalFovFixed ? t : t * aspect;
    const c = -(f + n) / (f - n);
    const d = -2 * f * n / (f - n);
    fromValuesToRef(a, 0, 0, 0, 0, b, 0, 0, 0, 0, c, -1, 0, 0, d, 0, result);
    _updateIdentityStatus(result, false);
  }
  Matrix2.perspectiveFovRHToRef = perspectiveFovRHToRef;
  function perspectiveFovWebVRToRef(fov, znear, zfar, result, rightHanded = false) {
    const rightHandedFactor = rightHanded ? -1 : 1;
    const upTan = Math.tan(fov.upDegrees * Math.PI / 180);
    const downTan = Math.tan(fov.downDegrees * Math.PI / 180);
    const leftTan = Math.tan(fov.leftDegrees * Math.PI / 180);
    const rightTan = Math.tan(fov.rightDegrees * Math.PI / 180);
    const xScale = 2 / (leftTan + rightTan);
    const yScale = 2 / (upTan + downTan);
    const m2 = result._m;
    m2[0] = xScale;
    m2[1] = m2[2] = m2[3] = m2[4] = 0;
    m2[5] = yScale;
    m2[6] = m2[7] = 0;
    m2[8] = (leftTan - rightTan) * xScale * 0.5;
    m2[9] = -((upTan - downTan) * yScale * 0.5);
    m2[10] = -zfar / (znear - zfar);
    m2[11] = 1 * rightHandedFactor;
    m2[12] = m2[13] = m2[15] = 0;
    m2[14] = -(2 * zfar * znear) / (zfar - znear);
    _markAsUpdated(result);
  }
  Matrix2.perspectiveFovWebVRToRef = perspectiveFovWebVRToRef;
  function GetAsMatrix2x2(matrix) {
    return [matrix._m[0], matrix._m[1], matrix._m[4], matrix._m[5]];
  }
  Matrix2.GetAsMatrix2x2 = GetAsMatrix2x2;
  function GetAsMatrix3x3(matrix) {
    return [
      matrix._m[0],
      matrix._m[1],
      matrix._m[2],
      matrix._m[4],
      matrix._m[5],
      matrix._m[6],
      matrix._m[8],
      matrix._m[9],
      matrix._m[10]
    ];
  }
  Matrix2.GetAsMatrix3x3 = GetAsMatrix3x3;
  function transpose(matrix) {
    const result = create();
    transposeToRef(matrix, result);
    return result;
  }
  Matrix2.transpose = transpose;
  function transposeToRef(matrix, result) {
    const rm = result._m;
    const mm = matrix._m;
    rm[0] = mm[0];
    rm[1] = mm[4];
    rm[2] = mm[8];
    rm[3] = mm[12];
    rm[4] = mm[1];
    rm[5] = mm[5];
    rm[6] = mm[9];
    rm[7] = mm[13];
    rm[8] = mm[2];
    rm[9] = mm[6];
    rm[10] = mm[10];
    rm[11] = mm[14];
    rm[12] = mm[3];
    rm[13] = mm[7];
    rm[14] = mm[11];
    rm[15] = mm[15];
    _updateIdentityStatus(result, matrix.isIdentity, matrix._isIdentityDirty);
  }
  Matrix2.transposeToRef = transposeToRef;
  function reflection(plane) {
    const matrix = create();
    reflectionToRef(plane, matrix);
    return matrix;
  }
  Matrix2.reflection = reflection;
  function reflectionToRef(_plane, result) {
    const plane = Plane.normalize(_plane);
    const x = plane.normal.x;
    const y = plane.normal.y;
    const z = plane.normal.z;
    const temp = -2 * x;
    const temp2 = -2 * y;
    const temp3 = -2 * z;
    fromValuesToRef(temp * x + 1, temp2 * x, temp3 * x, 0, temp * y, temp2 * y + 1, temp3 * y, 0, temp * z, temp2 * z, temp3 * z + 1, 0, temp * plane.d, temp2 * plane.d, temp3 * plane.d, 1, result);
  }
  Matrix2.reflectionToRef = reflectionToRef;
  function fromXYZAxesToRef(xaxis, yaxis, zaxis, result) {
    fromValuesToRef(xaxis.x, xaxis.y, xaxis.z, 0, yaxis.x, yaxis.y, yaxis.z, 0, zaxis.x, zaxis.y, zaxis.z, 0, 0, 0, 0, 1, result);
  }
  Matrix2.fromXYZAxesToRef = fromXYZAxesToRef;
  function fromQuaternionToRef(quat, result) {
    const xx = quat.x * quat.x;
    const yy = quat.y * quat.y;
    const zz = quat.z * quat.z;
    const xy = quat.x * quat.y;
    const zw = quat.z * quat.w;
    const zx = quat.z * quat.x;
    const yw = quat.y * quat.w;
    const yz = quat.y * quat.z;
    const xw = quat.x * quat.w;
    result._m[0] = 1 - 2 * (yy + zz);
    result._m[1] = 2 * (xy + zw);
    result._m[2] = 2 * (zx - yw);
    result._m[3] = 0;
    result._m[4] = 2 * (xy - zw);
    result._m[5] = 1 - 2 * (zz + xx);
    result._m[6] = 2 * (yz + xw);
    result._m[7] = 0;
    result._m[8] = 2 * (zx + yw);
    result._m[9] = 2 * (yz - xw);
    result._m[10] = 1 - 2 * (yy + xx);
    result._m[11] = 0;
    result._m[12] = 0;
    result._m[13] = 0;
    result._m[14] = 0;
    result._m[15] = 1;
    _markAsUpdated(result);
  }
  Matrix2.fromQuaternionToRef = fromQuaternionToRef;
  function _markAsUpdated(self2) {
    self2.updateFlag = _updateFlagSeed++;
    self2.isIdentity = false;
    self2.isIdentity3x2 = false;
    self2._isIdentityDirty = true;
    self2._isIdentity3x2Dirty = true;
  }
  function isIdentityUpdate(self2) {
    if (self2._isIdentityDirty) {
      self2._isIdentityDirty = false;
      const m2 = self2._m;
      self2.isIdentity = m2[0] === 1 && m2[1] === 0 && m2[2] === 0 && m2[3] === 0 && m2[4] === 0 && m2[5] === 1 && m2[6] === 0 && m2[7] === 0 && m2[8] === 0 && m2[9] === 0 && m2[10] === 1 && m2[11] === 0 && m2[12] === 0 && m2[13] === 0 && m2[14] === 0 && m2[15] === 1;
    }
    return self2.isIdentity;
  }
  Matrix2.isIdentityUpdate = isIdentityUpdate;
  function isIdentityAs3x2Update(self2) {
    if (self2._isIdentity3x2Dirty) {
      self2._isIdentity3x2Dirty = false;
      if (self2._m[0] !== 1 || self2._m[5] !== 1 || self2._m[15] !== 1) {
        self2.isIdentity3x2 = false;
      } else if (self2._m[1] !== 0 || self2._m[2] !== 0 || self2._m[3] !== 0 || self2._m[4] !== 0 || self2._m[6] !== 0 || self2._m[7] !== 0 || self2._m[8] !== 0 || self2._m[9] !== 0 || self2._m[10] !== 0 || self2._m[11] !== 0 || self2._m[12] !== 0 || self2._m[13] !== 0 || self2._m[14] !== 0) {
        self2.isIdentity3x2 = false;
      } else {
        self2.isIdentity3x2 = true;
      }
    }
    return self2.isIdentity3x2;
  }
  Matrix2.isIdentityAs3x2Update = isIdentityAs3x2Update;
  function determinant(self2) {
    if (self2.isIdentity === true) {
      return 1;
    }
    const m2 = self2._m;
    const m00 = m2[0], m01 = m2[1], m02 = m2[2], m03 = m2[3];
    const m10 = m2[4], m11 = m2[5], m12 = m2[6], m13 = m2[7];
    const m20 = m2[8], m21 = m2[9], m22 = m2[10], m23 = m2[11];
    const m30 = m2[12], m31 = m2[13], m32 = m2[14], m33 = m2[15];
    const det_22_33 = m22 * m33 - m32 * m23;
    const det_21_33 = m21 * m33 - m31 * m23;
    const det_21_32 = m21 * m32 - m31 * m22;
    const det_20_33 = m20 * m33 - m30 * m23;
    const det_20_32 = m20 * m32 - m22 * m30;
    const det_20_31 = m20 * m31 - m30 * m21;
    const cofact_00 = +(m11 * det_22_33 - m12 * det_21_33 + m13 * det_21_32);
    const cofact_01 = -(m10 * det_22_33 - m12 * det_20_33 + m13 * det_20_32);
    const cofact_02 = +(m10 * det_21_33 - m11 * det_20_33 + m13 * det_20_31);
    const cofact_03 = -(m10 * det_21_32 - m11 * det_20_32 + m12 * det_20_31);
    return m00 * cofact_00 + m01 * cofact_01 + m02 * cofact_02 + m03 * cofact_03;
  }
  Matrix2.determinant = determinant;
  function toArray(self2) {
    return self2._m;
  }
  Matrix2.toArray = toArray;
  function asArray(self2) {
    return self2._m;
  }
  Matrix2.asArray = asArray;
  function reset(self2) {
    fromValuesToRef(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, self2);
    _updateIdentityStatus(self2, false);
  }
  Matrix2.reset = reset;
  function add2(self2, other) {
    const result = create();
    addToRef(self2, other, result);
    return result;
  }
  Matrix2.add = add2;
  function addToRef(self2, other, result) {
    for (let index = 0; index < 16; index++) {
      result._m[index] = self2._m[index] + other._m[index];
    }
    _markAsUpdated(result);
  }
  Matrix2.addToRef = addToRef;
  function addToSelf(self2, other) {
    for (let index = 0; index < 16; index++) {
      self2._m[index] += other._m[index];
    }
    _markAsUpdated(self2);
  }
  Matrix2.addToSelf = addToSelf;
  function invert(source) {
    const result = create();
    invertToRef(source, result);
    return result;
  }
  Matrix2.invert = invert;
  function invertToRef(source, result) {
    if (source.isIdentity === true) {
      copy(source, result);
      return;
    }
    const m2 = source._m;
    const m00 = m2[0], m01 = m2[1], m02 = m2[2], m03 = m2[3];
    const m10 = m2[4], m11 = m2[5], m12 = m2[6], m13 = m2[7];
    const m20 = m2[8], m21 = m2[9], m22 = m2[10], m23 = m2[11];
    const m30 = m2[12], m31 = m2[13], m32 = m2[14], m33 = m2[15];
    const det_22_33 = m22 * m33 - m32 * m23;
    const det_21_33 = m21 * m33 - m31 * m23;
    const det_21_32 = m21 * m32 - m31 * m22;
    const det_20_33 = m20 * m33 - m30 * m23;
    const det_20_32 = m20 * m32 - m22 * m30;
    const det_20_31 = m20 * m31 - m30 * m21;
    const cofact_00 = +(m11 * det_22_33 - m12 * det_21_33 + m13 * det_21_32);
    const cofact_01 = -(m10 * det_22_33 - m12 * det_20_33 + m13 * det_20_32);
    const cofact_02 = +(m10 * det_21_33 - m11 * det_20_33 + m13 * det_20_31);
    const cofact_03 = -(m10 * det_21_32 - m11 * det_20_32 + m12 * det_20_31);
    const det = m00 * cofact_00 + m01 * cofact_01 + m02 * cofact_02 + m03 * cofact_03;
    if (det === 0) {
      copy(source, result);
      return;
    }
    const detInv = 1 / det;
    const det_12_33 = m12 * m33 - m32 * m13;
    const det_11_33 = m11 * m33 - m31 * m13;
    const det_11_32 = m11 * m32 - m31 * m12;
    const det_10_33 = m10 * m33 - m30 * m13;
    const det_10_32 = m10 * m32 - m30 * m12;
    const det_10_31 = m10 * m31 - m30 * m11;
    const det_12_23 = m12 * m23 - m22 * m13;
    const det_11_23 = m11 * m23 - m21 * m13;
    const det_11_22 = m11 * m22 - m21 * m12;
    const det_10_23 = m10 * m23 - m20 * m13;
    const det_10_22 = m10 * m22 - m20 * m12;
    const det_10_21 = m10 * m21 - m20 * m11;
    const cofact_10 = -(m01 * det_22_33 - m02 * det_21_33 + m03 * det_21_32);
    const cofact_11 = +(m00 * det_22_33 - m02 * det_20_33 + m03 * det_20_32);
    const cofact_12 = -(m00 * det_21_33 - m01 * det_20_33 + m03 * det_20_31);
    const cofact_13 = +(m00 * det_21_32 - m01 * det_20_32 + m02 * det_20_31);
    const cofact_20 = +(m01 * det_12_33 - m02 * det_11_33 + m03 * det_11_32);
    const cofact_21 = -(m00 * det_12_33 - m02 * det_10_33 + m03 * det_10_32);
    const cofact_22 = +(m00 * det_11_33 - m01 * det_10_33 + m03 * det_10_31);
    const cofact_23 = -(m00 * det_11_32 - m01 * det_10_32 + m02 * det_10_31);
    const cofact_30 = -(m01 * det_12_23 - m02 * det_11_23 + m03 * det_11_22);
    const cofact_31 = +(m00 * det_12_23 - m02 * det_10_23 + m03 * det_10_22);
    const cofact_32 = -(m00 * det_11_23 - m01 * det_10_23 + m03 * det_10_21);
    const cofact_33 = +(m00 * det_11_22 - m01 * det_10_22 + m02 * det_10_21);
    fromValuesToRef(cofact_00 * detInv, cofact_10 * detInv, cofact_20 * detInv, cofact_30 * detInv, cofact_01 * detInv, cofact_11 * detInv, cofact_21 * detInv, cofact_31 * detInv, cofact_02 * detInv, cofact_12 * detInv, cofact_22 * detInv, cofact_32 * detInv, cofact_03 * detInv, cofact_13 * detInv, cofact_23 * detInv, cofact_33 * detInv, result);
  }
  Matrix2.invertToRef = invertToRef;
  function addAtIndex(self2, index, value) {
    self2._m[index] += value;
    _markAsUpdated(self2);
  }
  Matrix2.addAtIndex = addAtIndex;
  function multiplyAtIndex(self2, index, value) {
    self2._m[index] *= value;
    _markAsUpdated(self2);
    return self2;
  }
  Matrix2.multiplyAtIndex = multiplyAtIndex;
  function setTranslationFromFloats(self2, x, y, z) {
    self2._m[12] = x;
    self2._m[13] = y;
    self2._m[14] = z;
    _markAsUpdated(self2);
  }
  Matrix2.setTranslationFromFloats = setTranslationFromFloats;
  function setTranslation(self2, vector3) {
    setTranslationFromFloats(self2, vector3.x, vector3.y, vector3.z);
  }
  Matrix2.setTranslation = setTranslation;
  function getTranslation(self2) {
    return Vector32.create(self2._m[12], self2._m[13], self2._m[14]);
  }
  Matrix2.getTranslation = getTranslation;
  function getTranslationToRef(self2, result) {
    result.x = self2._m[12];
    result.y = self2._m[13];
    result.z = self2._m[14];
  }
  Matrix2.getTranslationToRef = getTranslationToRef;
  function removeRotationAndScaling(self2) {
    const m2 = self2._m;
    fromValuesToRef(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, m2[12], m2[13], m2[14], m2[15], self2);
    _updateIdentityStatus(self2, m2[12] === 0 && m2[13] === 0 && m2[14] === 0 && m2[15] === 1);
    return self2;
  }
  Matrix2.removeRotationAndScaling = removeRotationAndScaling;
  function multiply2(self2, other) {
    const result = create();
    multiplyToRef(self2, other, result);
    return result;
  }
  Matrix2.multiply = multiply2;
  function copy(from, dest) {
    copyToArray(from, dest._m);
    _updateIdentityStatus(dest, from.isIdentity, from._isIdentityDirty, from.isIdentity3x2, from._isIdentity3x2Dirty);
  }
  Matrix2.copy = copy;
  function copyToArray(self2, arrayDest, offsetDest = 0) {
    for (let index = 0; index < 16; index++) {
      arrayDest[offsetDest + index] = self2._m[index];
    }
  }
  Matrix2.copyToArray = copyToArray;
  function multiplyToRef(self2, other, result) {
    if (self2.isIdentity) {
      copy(other, result);
      return;
    }
    if (other.isIdentity) {
      copy(self2, result);
      return;
    }
    multiplyToArray(self2, other, result._m, 0);
    _markAsUpdated(result);
  }
  Matrix2.multiplyToRef = multiplyToRef;
  function multiplyToArray(self2, other, result, offset) {
    const m2 = self2._m;
    const otherM = other._m;
    const tm0 = m2[0], tm1 = m2[1], tm2 = m2[2], tm3 = m2[3];
    const tm4 = m2[4], tm5 = m2[5], tm6 = m2[6], tm7 = m2[7];
    const tm8 = m2[8], tm9 = m2[9], tm10 = m2[10], tm11 = m2[11];
    const tm12 = m2[12], tm13 = m2[13], tm14 = m2[14], tm15 = m2[15];
    const om0 = otherM[0], om1 = otherM[1], om2 = otherM[2], om3 = otherM[3];
    const om4 = otherM[4], om5 = otherM[5], om6 = otherM[6], om7 = otherM[7];
    const om8 = otherM[8], om9 = otherM[9], om10 = otherM[10], om11 = otherM[11];
    const om12 = otherM[12], om13 = otherM[13], om14 = otherM[14], om15 = otherM[15];
    result[offset] = tm0 * om0 + tm1 * om4 + tm2 * om8 + tm3 * om12;
    result[offset + 1] = tm0 * om1 + tm1 * om5 + tm2 * om9 + tm3 * om13;
    result[offset + 2] = tm0 * om2 + tm1 * om6 + tm2 * om10 + tm3 * om14;
    result[offset + 3] = tm0 * om3 + tm1 * om7 + tm2 * om11 + tm3 * om15;
    result[offset + 4] = tm4 * om0 + tm5 * om4 + tm6 * om8 + tm7 * om12;
    result[offset + 5] = tm4 * om1 + tm5 * om5 + tm6 * om9 + tm7 * om13;
    result[offset + 6] = tm4 * om2 + tm5 * om6 + tm6 * om10 + tm7 * om14;
    result[offset + 7] = tm4 * om3 + tm5 * om7 + tm6 * om11 + tm7 * om15;
    result[offset + 8] = tm8 * om0 + tm9 * om4 + tm10 * om8 + tm11 * om12;
    result[offset + 9] = tm8 * om1 + tm9 * om5 + tm10 * om9 + tm11 * om13;
    result[offset + 10] = tm8 * om2 + tm9 * om6 + tm10 * om10 + tm11 * om14;
    result[offset + 11] = tm8 * om3 + tm9 * om7 + tm10 * om11 + tm11 * om15;
    result[offset + 12] = tm12 * om0 + tm13 * om4 + tm14 * om8 + tm15 * om12;
    result[offset + 13] = tm12 * om1 + tm13 * om5 + tm14 * om9 + tm15 * om13;
    result[offset + 14] = tm12 * om2 + tm13 * om6 + tm14 * om10 + tm15 * om14;
    result[offset + 15] = tm12 * om3 + tm13 * om7 + tm14 * om11 + tm15 * om15;
  }
  Matrix2.multiplyToArray = multiplyToArray;
  function equals2(self2, value) {
    const other = value;
    if (!other) {
      return false;
    }
    if (self2.isIdentity || other.isIdentity) {
      if (!self2._isIdentityDirty && !other._isIdentityDirty) {
        return self2.isIdentity && other.isIdentity;
      }
    }
    const m2 = self2._m;
    const om = other._m;
    return m2[0] === om[0] && m2[1] === om[1] && m2[2] === om[2] && m2[3] === om[3] && m2[4] === om[4] && m2[5] === om[5] && m2[6] === om[6] && m2[7] === om[7] && m2[8] === om[8] && m2[9] === om[9] && m2[10] === om[10] && m2[11] === om[11] && m2[12] === om[12] && m2[13] === om[13] && m2[14] === om[14] && m2[15] === om[15];
  }
  Matrix2.equals = equals2;
  function clone2(self2) {
    const result = create();
    copy(self2, result);
    return result;
  }
  Matrix2.clone = clone2;
  function getHashCode(self2) {
    let hash = self2._m[0] || 0;
    for (let i = 1; i < 16; i++) {
      hash = hash * 397 ^ (self2._m[i] || 0);
    }
    return hash;
  }
  Matrix2.getHashCode = getHashCode;
  function decompose(self2, scale2, rotation, translation2) {
    if (self2.isIdentity) {
      if (translation2) {
        translation2.x = 0;
        translation2.y = 0;
        translation2.z = 0;
      }
      if (scale2) {
        scale2.x = 1;
        scale2.y = 1;
        scale2.z = 1;
      }
      if (rotation) {
        rotation.w = 1;
        rotation.x = 0;
        rotation.y = 0;
        rotation.z = 0;
      }
      return true;
    }
    const m2 = self2._m;
    if (translation2) {
      translation2.x = m2[12];
      translation2.y = m2[13];
      translation2.z = m2[14];
    }
    const usedScale = scale2 || Vector32.Zero();
    usedScale.x = Math.sqrt(m2[0] * m2[0] + m2[1] * m2[1] + m2[2] * m2[2]);
    usedScale.y = Math.sqrt(m2[4] * m2[4] + m2[5] * m2[5] + m2[6] * m2[6]);
    usedScale.z = Math.sqrt(m2[8] * m2[8] + m2[9] * m2[9] + m2[10] * m2[10]);
    if (determinant(self2) <= 0) {
      usedScale.y *= -1;
    }
    if (usedScale.x === 0 || usedScale.y === 0 || usedScale.z === 0) {
      if (rotation) {
        rotation.w = 1;
        rotation.x = 0;
        rotation.y = 0;
        rotation.z = 0;
      }
      return false;
    }
    if (rotation) {
      const sx = 1 / usedScale.x, sy = 1 / usedScale.y, sz = 1 / usedScale.z;
      const tmpMatrix = create();
      fromValuesToRef(m2[0] * sx, m2[1] * sx, m2[2] * sx, 0, m2[4] * sy, m2[5] * sy, m2[6] * sy, 0, m2[8] * sz, m2[9] * sz, m2[10] * sz, 0, 0, 0, 0, 1, tmpMatrix);
      Quaternion2.fromRotationMatrixToRef(tmpMatrix, rotation);
    }
    return true;
  }
  Matrix2.decompose = decompose;
  function setRowFromFloats(self2, index, x, y, z, w) {
    if (index < 0 || index > 3) {
      return;
    }
    const i = index * 4;
    self2._m[i + 0] = x;
    self2._m[i + 1] = y;
    self2._m[i + 2] = z;
    self2._m[i + 3] = w;
    _markAsUpdated(self2);
  }
  Matrix2.setRowFromFloats = setRowFromFloats;
  function scale(self2, scale2) {
    const result = create();
    scaleToRef(self2, scale2, result);
    return result;
  }
  Matrix2.scale = scale;
  function scaleToRef(self2, scale2, result) {
    for (let index = 0; index < 16; index++) {
      result._m[index] = self2._m[index] * scale2;
    }
    _markAsUpdated(result);
  }
  Matrix2.scaleToRef = scaleToRef;
  function scaleAndAddToRef(self2, scale2, result) {
    for (let index = 0; index < 16; index++) {
      result._m[index] += self2._m[index] * scale2;
    }
    _markAsUpdated(result);
  }
  Matrix2.scaleAndAddToRef = scaleAndAddToRef;
  function normalMatrixToRef(self2, ref) {
    const tmp = create();
    invertToRef(self2, tmp);
    transposeToRef(tmp, ref);
    const m2 = ref._m;
    fromValuesToRef(m2[0], m2[1], m2[2], 0, m2[4], m2[5], m2[6], 0, m2[8], m2[9], m2[10], 0, 0, 0, 0, 1, ref);
  }
  Matrix2.normalMatrixToRef = normalMatrixToRef;
  function getRotationMatrix(self2) {
    const result = create();
    getRotationMatrixToRef(self2, result);
    return result;
  }
  Matrix2.getRotationMatrix = getRotationMatrix;
  function getRotationMatrixToRef(self2, result) {
    const scale2 = Vector32.Zero();
    if (!decompose(self2, scale2)) {
      result = Identity();
      return;
    }
    const m2 = self2._m;
    const sx = 1 / scale2.x, sy = 1 / scale2.y, sz = 1 / scale2.z;
    fromValuesToRef(m2[0] * sx, m2[1] * sx, m2[2] * sx, 0, m2[4] * sy, m2[5] * sy, m2[6] * sy, 0, m2[8] * sz, m2[9] * sz, m2[10] * sz, 0, 0, 0, 0, 1, result);
  }
  Matrix2.getRotationMatrixToRef = getRotationMatrixToRef;
  function toggleModelMatrixHandInPlace(self2) {
    self2._m[2] *= -1;
    self2._m[6] *= -1;
    self2._m[8] *= -1;
    self2._m[9] *= -1;
    self2._m[14] *= -1;
    _markAsUpdated(self2);
  }
  Matrix2.toggleModelMatrixHandInPlace = toggleModelMatrixHandInPlace;
  function toggleProjectionMatrixHandInPlace(self2) {
    self2._m[8] *= -1;
    self2._m[9] *= -1;
    self2._m[10] *= -1;
    self2._m[11] *= -1;
    _markAsUpdated(self2);
  }
  Matrix2.toggleProjectionMatrixHandInPlace = toggleProjectionMatrixHandInPlace;
  function _updateIdentityStatus(self2, isIdentity, isIdentityDirty = false, isIdentity3x2 = false, isIdentity3x2Dirty = true) {
    self2.updateFlag = _updateFlagSeed++;
    self2.isIdentity = isIdentity;
    self2.isIdentity3x2 = isIdentity || isIdentity3x2;
    self2._isIdentityDirty = self2.isIdentity ? false : isIdentityDirty;
    self2._isIdentity3x2Dirty = self2.isIdentity3x2 ? false : isIdentity3x2Dirty;
  }
})(Matrix || (Matrix = {}));

// node_modules/@dcl/ecs-math/dist/Quaternion.js
var Quaternion2;
(function(Quaternion3) {
  function create(x = 0, y = 0, z = 0, w = 1) {
    return { x, y, z, w };
  }
  Quaternion3.create = create;
  function add2(q1, q2) {
    return { x: q1.x + q2.x, y: q1.y + q2.y, z: q1.z + q2.z, w: q1.w + q2.w };
  }
  Quaternion3.add = add2;
  function fromRotationYawPitchRoll(yaw, pitch, roll) {
    const halfPitch = pitch * 0.5;
    const halfYaw = yaw * 0.5;
    const halfRoll = roll * 0.5;
    const c1 = Math.cos(halfPitch);
    const c2 = Math.cos(halfYaw);
    const c3 = Math.cos(halfRoll);
    const s1 = Math.sin(halfPitch);
    const s2 = Math.sin(halfYaw);
    const s3 = Math.sin(halfRoll);
    return create(c2 * s1 * c3 + s2 * c1 * s3, s2 * c1 * c3 - c2 * s1 * s3, c2 * c1 * s3 - s2 * s1 * c3, c2 * c1 * c3 + s2 * s1 * s3);
  }
  Quaternion3.fromRotationYawPitchRoll = fromRotationYawPitchRoll;
  function fromEulerDegrees(x, y, z) {
    return fromRotationYawPitchRoll(y * DEG2RAD, x * DEG2RAD, z * DEG2RAD);
  }
  Quaternion3.fromEulerDegrees = fromEulerDegrees;
  function length2(q) {
    return Math.sqrt(lengthSquared(q));
  }
  Quaternion3.length = length2;
  function lengthSquared(q) {
    return q.x * q.x + q.y * q.y + q.z * q.z + q.w * q.w;
  }
  Quaternion3.lengthSquared = lengthSquared;
  function dot(left, right) {
    return left.x * right.x + left.y * right.y + left.z * right.z + left.w * right.w;
  }
  Quaternion3.dot = dot;
  function angle(quat1, quat2) {
    const dotVal = dot(quat1, quat2);
    return Math.acos(Math.min(Math.abs(dotVal), 1)) * 2 * RAD2DEG;
  }
  Quaternion3.angle = angle;
  function rotateTowards(from, to, maxDegreesDelta) {
    const num = angle(from, to);
    if (num === 0) {
      return to;
    }
    const t = Math.min(1, maxDegreesDelta / num);
    return slerp(from, to, t);
  }
  Quaternion3.rotateTowards = rotateTowards;
  function lookRotation(forward, up = { x: 0, y: 1, z: 0 }) {
    const forwardNew = Vector32.normalize(forward);
    const right = Vector32.normalize(Vector32.cross(up, forwardNew));
    const upNew = Vector32.cross(forwardNew, right);
    const m00 = right.x;
    const m01 = right.y;
    const m02 = right.z;
    const m10 = upNew.x;
    const m11 = upNew.y;
    const m12 = upNew.z;
    const m20 = forwardNew.x;
    const m21 = forwardNew.y;
    const m22 = forwardNew.z;
    const num8 = m00 + m11 + m22;
    const quaternion = create();
    if (num8 > 0) {
      let num = Math.sqrt(num8 + 1);
      quaternion.w = num * 0.5;
      num = 0.5 / num;
      quaternion.x = (m12 - m21) * num;
      quaternion.y = (m20 - m02) * num;
      quaternion.z = (m01 - m10) * num;
      return quaternion;
    }
    if (m00 >= m11 && m00 >= m22) {
      const num7 = Math.sqrt(1 + m00 - m11 - m22);
      const num4 = 0.5 / num7;
      quaternion.x = 0.5 * num7;
      quaternion.y = (m01 + m10) * num4;
      quaternion.z = (m02 + m20) * num4;
      quaternion.w = (m12 - m21) * num4;
      return quaternion;
    }
    if (m11 > m22) {
      const num6 = Math.sqrt(1 + m11 - m00 - m22);
      const num3 = 0.5 / num6;
      quaternion.x = (m10 + m01) * num3;
      quaternion.y = 0.5 * num6;
      quaternion.z = (m21 + m12) * num3;
      quaternion.w = (m20 - m02) * num3;
      return quaternion;
    }
    const num5 = Math.sqrt(1 + m22 - m00 - m11);
    const num2 = 0.5 / num5;
    quaternion.x = (m20 + m02) * num2;
    quaternion.y = (m21 + m12) * num2;
    quaternion.z = 0.5 * num5;
    quaternion.w = (m01 - m10) * num2;
    return quaternion;
  }
  Quaternion3.lookRotation = lookRotation;
  function normalize(q) {
    const qLength = 1 / length2(q);
    return create(q.x * qLength, q.y * qLength, q.z * qLength, q.w * qLength);
  }
  Quaternion3.normalize = normalize;
  function fromToRotation(from, to, up = Vector32.Up()) {
    const v0 = Vector32.normalize(from);
    const v1 = Vector32.normalize(to);
    const a = Vector32.cross(v0, v1);
    const w = Math.sqrt(Vector32.lengthSquared(v0) * Vector32.lengthSquared(v1)) + Vector32.dot(v0, v1);
    if (Vector32.lengthSquared(a) < 1e-4) {
      return Math.abs(w) < 1e-4 ? normalize(create(up.x, up.y, up.z, 0)) : Identity();
    } else {
      return normalize(create(a.x, a.y, a.z, w));
    }
  }
  Quaternion3.fromToRotation = fromToRotation;
  function Identity() {
    return create(0, 0, 0, 1);
  }
  Quaternion3.Identity = Identity;
  function toEulerAngles(q) {
    const out = Vector32.create();
    const unit = q.x * q.x + q.y * q.y + q.z * q.z + q.w * q.w;
    const test = q.x * q.w - q.y * q.z;
    if (test > 0.4995 * unit) {
      out.x = Math.PI / 2;
      out.y = 2 * Math.atan2(q.y, q.x);
      out.z = 0;
    } else if (test < -0.4995 * unit) {
      out.x = -Math.PI / 2;
      out.y = -2 * Math.atan2(q.y, q.x);
      out.z = 0;
    } else {
      out.x = Math.asin(2 * (q.w * q.x - q.y * q.z));
      out.y = Math.atan2(2 * q.w * q.y + 2 * q.z * q.x, 1 - 2 * (q.x * q.x + q.y * q.y));
      out.z = Math.atan2(2 * q.w * q.z + 2 * q.x * q.y, 1 - 2 * (q.z * q.z + q.x * q.x));
    }
    out.x *= RAD2DEG;
    out.y *= RAD2DEG;
    out.z *= RAD2DEG;
    out.x = Scalar.repeat(out.x, 360);
    out.y = Scalar.repeat(out.y, 360);
    out.z = Scalar.repeat(out.z, 360);
    return out;
  }
  Quaternion3.toEulerAngles = toEulerAngles;
  function fromRotationYawPitchRollToRef(yaw, pitch, roll, result) {
    const halfPitch = pitch * 0.5;
    const halfYaw = yaw * 0.5;
    const halfRoll = roll * 0.5;
    const c1 = Math.cos(halfPitch);
    const c2 = Math.cos(halfYaw);
    const c3 = Math.cos(halfRoll);
    const s1 = Math.sin(halfPitch);
    const s2 = Math.sin(halfYaw);
    const s3 = Math.sin(halfRoll);
    result.x = c2 * s1 * c3 + s2 * c1 * s3;
    result.y = s2 * c1 * c3 - c2 * s1 * s3;
    result.z = c2 * c1 * s3 - s2 * s1 * c3;
    result.w = c2 * c1 * c3 + s2 * s1 * s3;
  }
  Quaternion3.fromRotationYawPitchRollToRef = fromRotationYawPitchRollToRef;
  function fromRotationMatrixToRef(matrix, result) {
    const data = matrix._m;
    const m11 = data[0], m12 = data[4], m13 = data[8];
    const m21 = data[1], m22 = data[5], m23 = data[9];
    const m31 = data[2], m32 = data[6], m33 = data[10];
    const trace = m11 + m22 + m33;
    let s;
    if (trace > 0) {
      s = 0.5 / Math.sqrt(trace + 1);
      result.w = 0.25 / s;
      result.x = (m32 - m23) * s;
      result.y = (m13 - m31) * s;
      result.z = (m21 - m12) * s;
    } else if (m11 > m22 && m11 > m33) {
      s = 2 * Math.sqrt(1 + m11 - m22 - m33);
      result.w = (m32 - m23) / s;
      result.x = 0.25 * s;
      result.y = (m12 + m21) / s;
      result.z = (m13 + m31) / s;
    } else if (m22 > m33) {
      s = 2 * Math.sqrt(1 + m22 - m11 - m33);
      result.w = (m13 - m31) / s;
      result.x = (m12 + m21) / s;
      result.y = 0.25 * s;
      result.z = (m23 + m32) / s;
    } else {
      s = 2 * Math.sqrt(1 + m33 - m11 - m22);
      result.w = (m21 - m12) / s;
      result.x = (m13 + m31) / s;
      result.y = (m23 + m32) / s;
      result.z = 0.25 * s;
    }
  }
  Quaternion3.fromRotationMatrixToRef = fromRotationMatrixToRef;
  function slerp(left, right, amount) {
    const result = Quaternion3.Identity();
    Quaternion3.slerpToRef(left, right, amount, result);
    return result;
  }
  Quaternion3.slerp = slerp;
  function slerpToRef(left, right, amount, result) {
    let num2;
    let num3;
    let num4 = left.x * right.x + left.y * right.y + left.z * right.z + left.w * right.w;
    let flag = false;
    if (num4 < 0) {
      flag = true;
      num4 = -num4;
    }
    if (num4 > 0.999999) {
      num3 = 1 - amount;
      num2 = flag ? -amount : amount;
    } else {
      const num5 = Math.acos(num4);
      const num6 = 1 / Math.sin(num5);
      num3 = Math.sin((1 - amount) * num5) * num6;
      num2 = flag ? -Math.sin(amount * num5) * num6 : Math.sin(amount * num5) * num6;
    }
    result.x = num3 * left.x + num2 * right.x;
    result.y = num3 * left.y + num2 * right.y;
    result.z = num3 * left.z + num2 * right.z;
    result.w = num3 * left.w + num2 * right.w;
  }
  Quaternion3.slerpToRef = slerpToRef;
  function multiply2(self2, q1) {
    const result = create(0, 0, 0, 1);
    multiplyToRef(self2, q1, result);
    return result;
  }
  Quaternion3.multiply = multiply2;
  function multiplyToRef(self2, q1, result) {
    result.x = self2.x * q1.w + self2.y * q1.z - self2.z * q1.y + self2.w * q1.x;
    result.y = -self2.x * q1.z + self2.y * q1.w + self2.z * q1.x + self2.w * q1.y;
    result.z = self2.x * q1.y - self2.y * q1.x + self2.z * q1.w + self2.w * q1.z;
    result.w = -self2.x * q1.x - self2.y * q1.y - self2.z * q1.z + self2.w * q1.w;
  }
  Quaternion3.multiplyToRef = multiplyToRef;
  function fromAngleAxis(degrees, axis) {
    if (Vector32.lengthSquared(axis) === 0) {
      return Quaternion3.Identity();
    }
    const result = Identity();
    let radians = degrees * DEG2RAD;
    radians *= 0.5;
    const a2 = Vector32.normalize(axis);
    Vector32.scaleToRef(a2, Math.sin(radians), a2);
    result.x = a2.x;
    result.y = a2.y;
    result.z = a2.z;
    result.w = Math.cos(radians);
    return normalize(result);
  }
  Quaternion3.fromAngleAxis = fromAngleAxis;
  function fromAxisToRotationQuaternion(axis1, axis2, axis3) {
    const quat = Quaternion3.create(0, 0, 0, 0);
    fromAxisToRotationQuaternionToRef(axis1, axis2, axis3, quat);
    return quat;
  }
  Quaternion3.fromAxisToRotationQuaternion = fromAxisToRotationQuaternion;
  function fromAxisToRotationQuaternionToRef(axis1, axis2, axis3, ref) {
    const rotMat = Matrix.create();
    Matrix.fromXYZAxesToRef(Vector32.normalize(axis1), Vector32.normalize(axis2), Vector32.normalize(axis3), rotMat);
    Quaternion3.fromRotationMatrixToRef(rotMat, ref);
  }
  Quaternion3.fromAxisToRotationQuaternionToRef = fromAxisToRotationQuaternionToRef;
  function Zero() {
    return create(0, 0, 0, 0);
  }
  Quaternion3.Zero = Zero;
  function fromLookAt(position, target, worldUp = Vector32.Up()) {
    const result = Quaternion3.Identity();
    fromLookAtToRef(position, target, worldUp, result);
    return result;
  }
  Quaternion3.fromLookAt = fromLookAt;
  function fromLookAtToRef(position, target, worldUp = Vector32.Up(), result) {
    const m = Matrix.Identity();
    Matrix.lookAtLHToRef(position, target, worldUp, m);
    Matrix.invertToRef(m, m);
    Quaternion3.fromRotationMatrixToRef(m, result);
  }
  Quaternion3.fromLookAtToRef = fromLookAtToRef;
})(Quaternion2 || (Quaternion2 = {}));

// node_modules/@dcl/ecs-math/dist/Vector2.js
var Vector22;
(function(Vector23) {
  function create(x = 0, y = 0) {
    return { x, y };
  }
  Vector23.create = create;
  function Zero() {
    return create(0, 0);
  }
  Vector23.Zero = Zero;
  function One() {
    return create(1, 1);
  }
  Vector23.One = One;
})(Vector22 || (Vector22 = {}));

// node_modules/@dcl/ecs-math/dist/Color4.js
var Color42;
(function(Color43) {
  function create(r = 0, g = 0, b = 0, a = 1) {
    return { r, g, b, a };
  }
  Color43.create = create;
  function fromHexString(hex) {
    if (hex.substring(0, 1) !== "#" || hex.length !== 7 && hex.length !== 9) {
      return create(0, 0, 0, 1);
    }
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    const aStr = hex.substring(7, 9);
    const a = aStr ? parseInt(aStr, 16) : 255;
    return Color43.fromInts(r, g, b, a);
  }
  Color43.fromHexString = fromHexString;
  function lerp(left, right, amount) {
    const result = create(0, 0, 0, 0);
    Color43.lerpToRef(left, right, amount, result);
    return result;
  }
  Color43.lerp = lerp;
  function lerpToRef(left, right, amount, result) {
    result.r = left.r + (right.r - left.r) * amount;
    result.g = left.g + (right.g - left.g) * amount;
    result.b = left.b + (right.b - left.b) * amount;
    result.a = left.a + (right.a - left.a) * amount;
  }
  Color43.lerpToRef = lerpToRef;
  function Red() {
    return create(1, 0, 0, 1);
  }
  Color43.Red = Red;
  function Green() {
    return create(0, 1, 0, 1);
  }
  Color43.Green = Green;
  function Blue() {
    return create(0, 0, 1, 1);
  }
  Color43.Blue = Blue;
  function Black() {
    return create(0, 0, 0, 1);
  }
  Color43.Black = Black;
  function White() {
    return create(1, 1, 1, 1);
  }
  Color43.White = White;
  function Purple() {
    return create(0.5, 0, 0.5, 1);
  }
  Color43.Purple = Purple;
  function Magenta() {
    return create(1, 0, 1, 1);
  }
  Color43.Magenta = Magenta;
  function Yellow() {
    return create(1, 1, 0, 1);
  }
  Color43.Yellow = Yellow;
  function Gray() {
    return create(0.5, 0.5, 0.5, 1);
  }
  Color43.Gray = Gray;
  function Teal() {
    return create(0, 1, 1, 1);
  }
  Color43.Teal = Teal;
  function Clear() {
    return create(0, 0, 0, 0);
  }
  Color43.Clear = Clear;
  function fromColor3(color3, alpha = 1) {
    return create(color3.r, color3.g, color3.b, alpha);
  }
  Color43.fromColor3 = fromColor3;
  function fromArray(array, offset = 0) {
    return create(array[offset], array[offset + 1], array[offset + 2], array[offset + 3]);
  }
  Color43.fromArray = fromArray;
  function fromInts(r, g, b, a) {
    return create(r / 255, g / 255, b / 255, a / 255);
  }
  Color43.fromInts = fromInts;
  function checkColors4(colors, count) {
    if (colors.length === count * 3) {
      const colors4 = [];
      for (let index = 0; index < colors.length; index += 3) {
        const newIndex = index / 3 * 4;
        colors4[newIndex] = colors[index];
        colors4[newIndex + 1] = colors[index + 1];
        colors4[newIndex + 2] = colors[index + 2];
        colors4[newIndex + 3] = 1;
      }
      return colors4;
    }
    return colors;
  }
  Color43.checkColors4 = checkColors4;
  function addToRef(a, b, ref) {
    ref.r = a.r + b.r;
    ref.g = a.g + b.g;
    ref.b = a.b + b.b;
    ref.a = a.a + b.a;
  }
  Color43.addToRef = addToRef;
  function toArray(value, array, index = 0) {
    array[index] = value.r;
    array[index + 1] = value.g;
    array[index + 2] = value.b;
    array[index + 3] = value.a;
  }
  Color43.toArray = toArray;
  function add2(value, right) {
    const ret = Clear();
    addToRef(value, right, ret);
    return ret;
  }
  Color43.add = add2;
  function subtract2(value, right) {
    const ret = Clear();
    subtractToRef(value, right, ret);
    return ret;
  }
  Color43.subtract = subtract2;
  function subtractToRef(a, b, result) {
    result.r = a.r - b.r;
    result.g = a.g - b.g;
    result.b = a.b - b.b;
    result.a = a.a - b.a;
  }
  Color43.subtractToRef = subtractToRef;
  function scale(value, scale2) {
    return create(value.r * scale2, value.g * scale2, value.b * scale2, value.a * scale2);
  }
  Color43.scale = scale;
  function scaleToRef(value, scale2, result) {
    result.r = value.r * scale2;
    result.g = value.g * scale2;
    result.b = value.b * scale2;
    result.a = value.a * scale2;
  }
  Color43.scaleToRef = scaleToRef;
  function scaleAndAddToRef(value, scale2, result) {
    result.r += value.r * scale2;
    result.g += value.g * scale2;
    result.b += value.b * scale2;
    result.a += value.a * scale2;
  }
  Color43.scaleAndAddToRef = scaleAndAddToRef;
  function clampToRef(value, min = 0, max = 1, result) {
    result.r = Scalar.clamp(value.r, min, max);
    result.g = Scalar.clamp(value.g, min, max);
    result.b = Scalar.clamp(value.b, min, max);
    result.a = Scalar.clamp(value.a, min, max);
  }
  Color43.clampToRef = clampToRef;
  function multiply2(value, color) {
    return create(value.r * color.r, value.g * color.g, value.b * color.b, value.a * color.a);
  }
  Color43.multiply = multiply2;
  function multiplyToRef(value, color, result) {
    result.r = value.r * color.r;
    result.g = value.g * color.g;
    result.b = value.b * color.b;
    result.a = value.a * color.a;
  }
  Color43.multiplyToRef = multiplyToRef;
  function toString2(value) {
    return "{R: " + value.r + " G:" + value.g + " B:" + value.b + " A:" + value.a + "}";
  }
  Color43.toString = toString2;
  function getHashCode(value) {
    let hash = value.r || 0;
    hash = hash * 397 ^ (value.g || 0);
    hash = hash * 397 ^ (value.b || 0);
    hash = hash * 397 ^ (value.a || 0);
    return hash;
  }
  Color43.getHashCode = getHashCode;
  function clone2(value) {
    return create(value.r, value.g, value.b, value.a);
  }
  Color43.clone = clone2;
  function copyFrom(source, dest) {
    dest.r = source.r;
    dest.g = source.g;
    dest.b = source.b;
    dest.a = source.a;
  }
  Color43.copyFrom = copyFrom;
  function copyFromFloats(r, g, b, a, dest) {
    dest.r = r;
    dest.g = g;
    dest.b = b;
    dest.a = a;
  }
  Color43.copyFromFloats = copyFromFloats;
  function set(r, g, b, a, dest) {
    dest.r = r;
    dest.g = g;
    dest.b = b;
    dest.a = a;
  }
  Color43.set = set;
  function toHexString(value) {
    const intR = value.r * 255 | 0;
    const intG = value.g * 255 | 0;
    const intB = value.b * 255 | 0;
    const intA = value.a * 255 | 0;
    return "#" + Scalar.toHex(intR) + Scalar.toHex(intG) + Scalar.toHex(intB) + Scalar.toHex(intA);
  }
  Color43.toHexString = toHexString;
  function toLinearSpace(value) {
    const convertedColor = create();
    toLinearSpaceToRef(value, convertedColor);
    return convertedColor;
  }
  Color43.toLinearSpace = toLinearSpace;
  function toLinearSpaceToRef(value, ref) {
    ref.r = Math.pow(value.r, ToLinearSpace);
    ref.g = Math.pow(value.g, ToLinearSpace);
    ref.b = Math.pow(value.b, ToLinearSpace);
    ref.a = value.a;
  }
  Color43.toLinearSpaceToRef = toLinearSpaceToRef;
  function toGammaSpace(value) {
    const convertedColor = create();
    toGammaSpaceToRef(value, convertedColor);
    return convertedColor;
  }
  Color43.toGammaSpace = toGammaSpace;
  function toGammaSpaceToRef(value, convertedColor) {
    convertedColor.r = Math.pow(value.r, ToGammaSpace);
    convertedColor.g = Math.pow(value.g, ToGammaSpace);
    convertedColor.b = Math.pow(value.b, ToGammaSpace);
    convertedColor.a = value.a;
  }
  Color43.toGammaSpaceToRef = toGammaSpaceToRef;
})(Color42 || (Color42 = {}));

// node_modules/@dcl/ecs-math/dist/Color3.js
var Color32;
(function(Color33) {
  function create(r = 0, g = 0, b = 0) {
    return { r, g, b };
  }
  Color33.create = create;
  function fromHexString(hex) {
    if (hex.substring(0, 1) !== "#" || hex.length !== 7) {
      return create(0, 0, 0);
    }
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    return fromInts(r, g, b);
  }
  Color33.fromHexString = fromHexString;
  function fromArray(array, offset = 0) {
    return create(array[offset], array[offset + 1], array[offset + 2]);
  }
  Color33.fromArray = fromArray;
  function fromInts(r, g, b) {
    return create(r / 255, g / 255, b / 255);
  }
  Color33.fromInts = fromInts;
  function lerp(start, end, amount) {
    const result = create(0, 0, 0);
    Color33.lerpToRef(start, end, amount, result);
    return result;
  }
  Color33.lerp = lerp;
  function lerpToRef(left, right, amount, result) {
    result.r = left.r + (right.r - left.r) * amount;
    result.g = left.g + (right.g - left.g) * amount;
    result.b = left.b + (right.b - left.b) * amount;
  }
  Color33.lerpToRef = lerpToRef;
  function Red() {
    return create(1, 0, 0);
  }
  Color33.Red = Red;
  function Green() {
    return create(0, 1, 0);
  }
  Color33.Green = Green;
  function Blue() {
    return create(0, 0, 1);
  }
  Color33.Blue = Blue;
  function Black() {
    return create(0, 0, 0);
  }
  Color33.Black = Black;
  function White() {
    return create(1, 1, 1);
  }
  Color33.White = White;
  function Purple() {
    return create(0.5, 0, 0.5);
  }
  Color33.Purple = Purple;
  function Magenta() {
    return create(1, 0, 1);
  }
  Color33.Magenta = Magenta;
  function Yellow() {
    return create(1, 1, 0);
  }
  Color33.Yellow = Yellow;
  function Gray() {
    return create(0.5, 0.5, 0.5);
  }
  Color33.Gray = Gray;
  function Teal() {
    return create(0, 1, 1);
  }
  Color33.Teal = Teal;
  function Random() {
    return create(Math.random(), Math.random(), Math.random());
  }
  Color33.Random = Random;
  function toString2(value) {
    return "{R: " + value.r + " G:" + value.g + " B:" + value.b + "}";
  }
  Color33.toString = toString2;
  function getHashCode(value) {
    let hash = value.r || 0;
    hash = hash * 397 ^ (value.g || 0);
    hash = hash * 397 ^ (value.b || 0);
    return hash;
  }
  Color33.getHashCode = getHashCode;
  function toArray(value, array, index = 0) {
    array[index] = value.r;
    array[index + 1] = value.g;
    array[index + 2] = value.b;
  }
  Color33.toArray = toArray;
  function toColor4(value, alpha = 1) {
    return Color42.create(value.r, value.g, value.b, alpha);
  }
  Color33.toColor4 = toColor4;
  function asArray(value) {
    const result = new Array();
    toArray(value, result, 0);
    return result;
  }
  Color33.asArray = asArray;
  function toLuminance(value) {
    return value.r * 0.3 + value.g * 0.59 + value.b * 0.11;
  }
  Color33.toLuminance = toLuminance;
  function multiply2(value, otherColor) {
    return create(value.r * otherColor.r, value.g * otherColor.g, value.b * otherColor.b);
  }
  Color33.multiply = multiply2;
  function multiplyToRef(value, otherColor, result) {
    result.r = value.r * otherColor.r;
    result.g = value.g * otherColor.g;
    result.b = value.b * otherColor.b;
  }
  Color33.multiplyToRef = multiplyToRef;
  function equals2(value, otherColor) {
    return otherColor && value.r === otherColor.r && value.g === otherColor.g && value.b === otherColor.b;
  }
  Color33.equals = equals2;
  function equalsFloats(value, r, g, b) {
    return value.r === r && value.g === g && value.b === b;
  }
  Color33.equalsFloats = equalsFloats;
  function scale(value, scale2) {
    return create(value.r * scale2, value.g * scale2, value.b * scale2);
  }
  Color33.scale = scale;
  function scaleToRef(value, scale2, result) {
    result.r = value.r * scale2;
    result.g = value.g * scale2;
    result.b = value.b * scale2;
  }
  Color33.scaleToRef = scaleToRef;
  function scaleAndAddToRef(value, scale2, result) {
    result.r += value.r * scale2;
    result.g += value.g * scale2;
    result.b += value.b * scale2;
  }
  Color33.scaleAndAddToRef = scaleAndAddToRef;
  function clampToRef(value, min = 0, max = 1, result) {
    result.r = Scalar.clamp(value.r, min, max);
    result.g = Scalar.clamp(value.g, min, max);
    result.b = Scalar.clamp(value.b, min, max);
  }
  Color33.clampToRef = clampToRef;
  function clamp(value, min = 0, max = 1) {
    const result = Color33.Black();
    clampToRef(value, min, max, result);
    return result;
  }
  Color33.clamp = clamp;
  function add2(value, otherColor) {
    return create(value.r + otherColor.r, value.g + otherColor.g, value.b + otherColor.b);
  }
  Color33.add = add2;
  function addToRef(value, otherColor, result) {
    result.r = value.r + otherColor.r;
    result.g = value.g + otherColor.g;
    result.b = value.b + otherColor.b;
  }
  Color33.addToRef = addToRef;
  function subtract2(value, otherColor) {
    return create(value.r - otherColor.r, value.g - otherColor.g, value.b - otherColor.b);
  }
  Color33.subtract = subtract2;
  function subtractToRef(value, otherColor, result) {
    result.r = value.r - otherColor.r;
    result.g = value.g - otherColor.g;
    result.b = value.b - otherColor.b;
  }
  Color33.subtractToRef = subtractToRef;
  function clone2(value) {
    return create(value.r, value.g, value.b);
  }
  Color33.clone = clone2;
  function copyFrom(source, dest) {
    dest.r = source.r;
    dest.g = source.g;
    dest.b = source.b;
  }
  Color33.copyFrom = copyFrom;
  function set(dest, r, g, b) {
    dest.r = r;
    dest.g = g;
    dest.b = b;
  }
  Color33.set = set;
  function toHexString(value) {
    const intR = value.r * 255 | 0;
    const intG = value.g * 255 | 0;
    const intB = value.b * 255 | 0;
    return "#" + Scalar.toHex(intR) + Scalar.toHex(intG) + Scalar.toHex(intB);
  }
  Color33.toHexString = toHexString;
  function toLinearSpace(value) {
    const convertedColor = create();
    toLinearSpaceToRef(value, convertedColor);
    return convertedColor;
  }
  Color33.toLinearSpace = toLinearSpace;
  function toLinearSpaceToRef(value, convertedColor) {
    convertedColor.r = Math.pow(value.r, ToLinearSpace);
    convertedColor.g = Math.pow(value.g, ToLinearSpace);
    convertedColor.b = Math.pow(value.b, ToLinearSpace);
  }
  Color33.toLinearSpaceToRef = toLinearSpaceToRef;
  function toGammaSpace(value) {
    const convertedColor = create();
    toGammaSpaceToRef(value, convertedColor);
    return convertedColor;
  }
  Color33.toGammaSpace = toGammaSpace;
  function toGammaSpaceToRef(value, convertedColor) {
    convertedColor.r = Math.pow(value.r, ToGammaSpace);
    convertedColor.g = Math.pow(value.g, ToGammaSpace);
    convertedColor.b = Math.pow(value.b, ToGammaSpace);
  }
  Color33.toGammaSpaceToRef = toGammaSpaceToRef;
})(Color32 || (Color32 = {}));

// node_modules/@dcl/asset-packs/dist/actions.js
var import_UserActionModule = require("~system/UserActionModule");
var import_RestrictedActions = require("~system/RestrictedActions");
var import_CommsApi = require("~system/CommsApi");

// node_modules/@dcl/asset-packs/dist/timer.js
var tickSet = /* @__PURE__ */ new Set();
var queueDelay = /* @__PURE__ */ new Map();
var queueInterval = /* @__PURE__ */ new Map();
function createTimerSystem() {
  return function timerSystem(dt) {
    intervalSystem(dt);
    delaySystem(dt);
    tickSystem(dt);
  };
  function intervalSystem(dt) {
    for (const [entity, actions3] of queueInterval.entries()) {
      const triggerEvents = getTriggerEvents(entity);
      for (const action of actions3) {
        if (action.timeout === action.interval) {
          action.callback();
        }
        action.timeout -= dt;
        if (action.timeout <= 0) {
          action.timeout = action.interval;
          triggerEvents.emit(TriggerType.ON_LOOP);
        }
      }
    }
  }
  function delaySystem(dt) {
    for (const [entity, actions3] of queueDelay.entries()) {
      const triggerEvents = getTriggerEvents(entity);
      const completedActions = [];
      let idx = 0;
      for (const action of actions3) {
        action.timeout -= dt;
        if (action.timeout <= 0) {
          action.callback();
          triggerEvents.emit(TriggerType.ON_DELAY);
          completedActions.push(idx);
        }
        idx++;
      }
      for (const action of completedActions) {
        actions3.splice(action, 1);
      }
    }
  }
  function tickSystem(_dt) {
    for (const entity of tickSet) {
      const triggerEvents = getTriggerEvents(entity);
      triggerEvents.emit(TriggerType.ON_TICK);
    }
  }
}
function startTimeout(entity, action, timeout, callback) {
  const actionCallbacks = queueDelay.get(entity) ?? [];
  actionCallbacks.push({ timeout, action, callback });
  queueDelay.set(entity, actionCallbacks);
}
function stopTimeout(entity, action) {
  const delays = queueDelay.get(entity) ?? [];
  queueDelay.set(entity, delays.filter(($) => $.action !== action));
}
function stopAllTimeouts(entity) {
  queueDelay.delete(entity);
}
function startInterval(entity, action, interval, callback) {
  const actionCallbacks = queueInterval.get(entity) ?? [];
  actionCallbacks.push({ timeout: interval, action, callback, interval });
  queueInterval.set(entity, actionCallbacks);
}
function stopInterval(entity, action) {
  const intervals = queueInterval.get(entity) ?? [];
  queueInterval.set(entity, intervals.filter(($) => $.action !== action));
}
function stopAllIntervals(entity) {
  queueInterval.delete(entity);
}

// node_modules/@dcl/asset-packs/dist/ui.js
function getAlignMode(align, isColumn) {
  switch (align) {
    case AlignMode.TAM_TOP_LEFT: {
      return {
        alignItems: 1,
        justifyContent: 0
      };
    }
    case AlignMode.TAM_TOP_CENTER: {
      return isColumn ? {
        alignItems: 2,
        justifyContent: 0
      } : {
        alignItems: 1,
        justifyContent: 1
      };
    }
    case AlignMode.TAM_TOP_RIGHT: {
      return isColumn ? {
        alignItems: 3,
        justifyContent: 0
      } : {
        alignItems: 1,
        justifyContent: 2
      };
    }
    case AlignMode.TAM_MIDDLE_LEFT: {
      return isColumn ? {
        alignItems: 1,
        justifyContent: 1
      } : {
        alignItems: 2,
        justifyContent: 0
      };
    }
    case AlignMode.TAM_MIDDLE_CENTER: {
      return {
        alignItems: 2,
        justifyContent: 1
      };
    }
    case AlignMode.TAM_MIDDLE_RIGHT: {
      return isColumn ? {
        alignItems: 3,
        justifyContent: 1
      } : {
        alignItems: 2,
        justifyContent: 2
      };
    }
    case AlignMode.TAM_BOTTOM_LEFT: {
      return isColumn ? {
        alignItems: 1,
        justifyContent: 2
      } : {
        alignItems: 2,
        justifyContent: 1
      };
    }
    case AlignMode.TAM_BOTTOM_CENTER: {
      return isColumn ? {
        alignItems: 2,
        justifyContent: 2
      } : {
        alignItems: 3,
        justifyContent: 1
      };
    }
    case AlignMode.TAM_BOTTOM_RIGHT: {
      return {
        alignItems: 3,
        justifyContent: 2
      };
    }
  }
}
function mapAlignToScreenAlign(align, flexDirection = 0) {
  const isColumn = flexDirection === 1;
  switch (align) {
    case AlignMode.TAM_TOP_LEFT:
      return getAlignMode(align, isColumn);
    case AlignMode.TAM_TOP_CENTER:
      return getAlignMode(align, isColumn);
    case AlignMode.TAM_TOP_RIGHT:
      return getAlignMode(align, isColumn);
    case AlignMode.TAM_MIDDLE_LEFT:
      return getAlignMode(align, isColumn);
    case AlignMode.TAM_MIDDLE_CENTER:
      return getAlignMode(align, isColumn);
    case AlignMode.TAM_MIDDLE_RIGHT:
      return getAlignMode(align, isColumn);
    case AlignMode.TAM_BOTTOM_LEFT:
      return getAlignMode(align, isColumn);
    case AlignMode.TAM_BOTTOM_CENTER:
      return getAlignMode(align, isColumn);
    case AlignMode.TAM_BOTTOM_RIGHT:
      return getAlignMode(align, isColumn);
    default:
      throw new Error(`Unsupported AlignMode: ${align}`);
  }
}
function getUITransform(component, entiy, height = 100, width = 100, unit = 2) {
  let uiTransformComponent = component.getMutableOrNull(entiy);
  if (!uiTransformComponent) {
    uiTransformComponent = component.create(entiy);
    uiTransformComponent.heightUnit = unit;
    uiTransformComponent.widthUnit = unit;
    uiTransformComponent.height = height;
    uiTransformComponent.width = width;
    uiTransformComponent.maxHeightUnit = unit;
    uiTransformComponent.maxWidthUnit = unit;
    uiTransformComponent.maxHeight = height;
    uiTransformComponent.maxWidth = width;
  }
  if (entiy === 0) {
    uiTransformComponent.positionType = 1;
  }
  return uiTransformComponent;
}
function getUIBackground(component, entity, src, textureMode = 0, wrapMode = 1) {
  return component.createOrReplace(entity, {
    textureMode,
    texture: {
      tex: {
        $case: "texture",
        texture: {
          src,
          wrapMode
        }
      }
    },
    uvs: []
  });
}
function breakLines(text, linelength) {
  const lineBreak = "\n";
  let counter = 0;
  let line = "";
  let returnText = "";
  let bMatchFound = false;
  const lineLen = linelength ? linelength : 50;
  if (!text)
    return "";
  if (text.length < lineLen + 1) {
    return text;
  }
  while (counter < text.length) {
    line = text.substring(counter, counter + lineLen);
    bMatchFound = false;
    if (line.length == lineLen) {
      for (let i = line.length; i > -1; i--) {
        if (line.substring(i, i + 1) == " ") {
          counter += line.substring(0, i).length;
          line = line.substring(0, i) + lineBreak;
          returnText += line;
          bMatchFound = true;
          break;
        }
      }
      if (!bMatchFound) {
        counter += line.length;
        line = line + lineBreak;
        returnText += line;
      }
    } else {
      returnText += line;
      break;
    }
  }
  return returnText;
}
function getUIText(component, entity, text, fontSize = 10, containerWidth, align = AlignMode.TAM_MIDDLE_CENTER, color = { r: 0, g: 0, b: 0, a: 1 }) {
  const lineLength = Math.floor(containerWidth / (fontSize / 1.7));
  return component.createOrReplace(entity, {
    value: breakLines(text, lineLength),
    fontSize,
    font: Font2.F_MONOSPACE,
    textAlign: align,
    color
  });
}

// node_modules/@dcl-sdk/utils/dist/math.js
function getWorldPosition(entity) {
  let transform = Transform2.getOrNull(entity);
  if (!transform)
    return Vector32.Zero();
  let parent = transform.parent;
  if (!parent) {
    return transform.position;
  } else {
    let parentRotation = Transform2.get(parent).rotation;
    return Vector32.add(getWorldPosition(parent), Vector32.rotate(transform.position, getWorldRotation(parent)));
  }
}
function getWorldRotation(entity) {
  let transform = Transform2.getOrNull(entity);
  if (!transform)
    return Quaternion2.Identity();
  let parent = transform.parent;
  if (!parent) {
    return transform.rotation;
  } else {
    return Quaternion2.multiply(transform.rotation, getWorldRotation(parent));
  }
}
var InterpolationType2;
(function(InterpolationType3) {
  InterpolationType3["LINEAR"] = "linear";
  InterpolationType3["EASEINQUAD"] = "easeinquad";
  InterpolationType3["EASEOUTQUAD"] = "easeoutquad";
  InterpolationType3["EASEQUAD"] = "easequad";
  InterpolationType3["EASEINSINE"] = "easeinsine";
  InterpolationType3["EASEOUTSINE"] = "easeoutsine";
  InterpolationType3["EASESINE"] = "easeinoutsine";
  InterpolationType3["EASEINEXPO"] = "easeinexpo";
  InterpolationType3["EASEOUTEXPO"] = "easeoutexpo";
  InterpolationType3["EASEEXPO"] = "easeinoutexpo";
  InterpolationType3["EASEINELASTIC"] = "easeinelastic";
  InterpolationType3["EASEOUTELASTIC"] = "easeoutelastic";
  InterpolationType3["EASEELASTIC"] = "easeinoutelastic";
  InterpolationType3["EASEINBOUNCE"] = "easeinbounce";
  InterpolationType3["EASEOUTEBOUNCE"] = "easeoutbounce";
  InterpolationType3["EASEBOUNCE"] = "easeinoutbounce";
})(InterpolationType2 || (InterpolationType2 = {}));
function createCatmullRomSpline(points, nbPoints, closed) {
  const catmullRom = new Array();
  const step = 1 / nbPoints;
  let amount = 0;
  if (closed) {
    const pointsCount = points.length;
    for (let i = 0; i < pointsCount; i++) {
      amount = 0;
      for (let c = 0; c < nbPoints; c++) {
        catmullRom.push(Vector32.catmullRom(points[i % pointsCount], points[(i + 1) % pointsCount], points[(i + 2) % pointsCount], points[(i + 3) % pointsCount], amount));
        amount += step;
      }
    }
    catmullRom.push(catmullRom[0]);
  } else {
    const totalPoints = new Array();
    totalPoints.push(Vector32.clone(points[0]));
    Array.prototype.push.apply(totalPoints, points);
    totalPoints.push(Vector32.clone(points[points.length - 1]));
    let i = 0;
    for (; i < totalPoints.length - 3; i++) {
      amount = 0;
      for (let c = 0; c < nbPoints; c++) {
        catmullRom.push(Vector32.catmullRom(totalPoints[i], totalPoints[i + 1], totalPoints[i + 2], totalPoints[i + 3], amount));
        amount += step;
      }
    }
    i--;
    catmullRom.push(Vector32.catmullRom(totalPoints[i], totalPoints[i + 1], totalPoints[i + 2], totalPoints[i + 3], amount));
  }
  return catmullRom;
}
function areAABBIntersecting(aMin, aMax, bMin, bMax) {
  return aMin.x <= bMax.x && aMax.x >= bMin.x && aMin.y <= bMax.y && aMax.y >= bMin.y && aMin.z <= bMax.z && aMax.z >= bMin.z;
}
function areSpheresIntersecting(aPos, aRadius, bPos, bRadius) {
  const sqDist = Vector32.distanceSquared(aPos, bPos);
  const radiusSum = aRadius + bRadius;
  return sqDist < radiusSum * radiusSum;
}
function areAABBSphereIntersecting(boxMin, boxMax, spherePos, sphereRadius) {
  let dmin = 0;
  if (spherePos.x < boxMin.x)
    dmin += (boxMin.x - spherePos.x) * (boxMin.x - spherePos.x);
  if (spherePos.x > boxMax.x)
    dmin += (spherePos.x - boxMax.x) * (spherePos.x - boxMax.x);
  if (spherePos.y < boxMin.y)
    dmin += (boxMin.y - spherePos.y) * (boxMin.y - spherePos.y);
  if (spherePos.y > boxMax.y)
    dmin += (spherePos.y - boxMax.y) * (spherePos.y - boxMax.y);
  if (spherePos.z < boxMin.z)
    dmin += (boxMin.z - spherePos.z) * (boxMin.z - spherePos.z);
  if (spherePos.z > boxMax.z)
    dmin += (spherePos.z - boxMax.z) * (spherePos.z - boxMax.z);
  return dmin < sphereRadius * sphereRadius;
}

// node_modules/@dcl-sdk/utils/dist/priority.js
var REGULAR_PRIORITY = 1e5;
var priority;
(function(priority2) {
  priority2.TimerSystemPriority = REGULAR_PRIORITY + 256;
  priority2.TweenSystemPriority = REGULAR_PRIORITY + 192;
  priority2.PerpetualMotionSystemPriority = REGULAR_PRIORITY + 192;
  priority2.PathSystemPriority = REGULAR_PRIORITY + 192;
  priority2.TriggerSystemPriority = REGULAR_PRIORITY + 128;
  priority2.ActionSystemPriority = REGULAR_PRIORITY + 64;
})(priority || (priority = {}));

// node_modules/@dcl-sdk/utils/dist/timer.js
function createTimers(targetEngine) {
  const timers2 = /* @__PURE__ */ new Map();
  let timerIdCounter = 0;
  function system(dt) {
    let deadTimers = [];
    let callbacks = [];
    for (let [timerId, timerData] of timers2) {
      timerData.accumulatedTime += 1e3 * dt;
      if (timerData.accumulatedTime < timerData.interval)
        continue;
      callbacks.push(timerData.callback);
      if (timerData.recurrent) {
        timerData.accumulatedTime -= Math.floor(timerData.accumulatedTime / timerData.interval) * timerData.interval;
      } else {
        deadTimers.push(timerId);
      }
    }
    for (let timerId of deadTimers)
      timers2.delete(timerId);
    for (let callback of callbacks)
      callback();
  }
  targetEngine.addSystem(system, priority.TimerSystemPriority);
  return {
    setTimeout(callback, milliseconds) {
      let timerId = timerIdCounter++;
      timers2.set(timerId, { callback, interval: milliseconds, recurrent: false, accumulatedTime: 0 });
      return timerId;
    },
    clearTimeout(timer) {
      timers2.delete(timer);
    },
    setInterval(callback, milliseconds) {
      let timerId = timerIdCounter++;
      timers2.set(timerId, { callback, interval: milliseconds, recurrent: true, accumulatedTime: 0 });
      return timerId;
    },
    clearInterval(timer) {
      timers2.delete(timer);
    }
  };
}
var timers = createTimers(engine);

// node_modules/@dcl-sdk/utils/dist/toggle.js
var ToggleState;
(function(ToggleState2) {
  ToggleState2[ToggleState2["Off"] = 0] = "Off";
  ToggleState2[ToggleState2["On"] = 1] = "On";
})(ToggleState || (ToggleState = {}));
function createToggles(targetEngine, timers2) {
  const Toggle = targetEngine.defineComponent("dcl.utils.Toggle", {
    state: Schemas.EnumNumber(ToggleState, ToggleState.Off)
  });
  let toggles2 = /* @__PURE__ */ new Map();
  timers2.setInterval(function() {
    for (const entity of toggles2.keys()) {
      if (targetEngine.getEntityState(entity) == EntityState.Removed || !Toggle.has(entity)) {
        toggles2.delete(entity);
      }
    }
  }, 5e3);
  return {
    addToggle(entity, state, callback) {
      toggles2.set(entity, callback);
      Toggle.createOrReplace(entity, { state });
    },
    removeToggle(entity) {
      toggles2.delete(entity);
      Toggle.deleteFrom(entity);
    },
    setCallback(entity, callback) {
      toggles2.set(entity, callback);
    },
    set(entity, state) {
      const oldState = Toggle.get(entity).state;
      if (oldState != state) {
        Toggle.getMutable(entity).state = state;
        const callback = toggles2.get(entity);
        if (callback)
          callback(state);
      }
    },
    flip(entity) {
      this.set(entity, 1 - Toggle.get(entity).state);
    },
    isOn(entity) {
      return Toggle.get(entity).state == ToggleState.On;
    }
  };
}
var toggles = createToggles(engine, timers);

// node_modules/@dcl-sdk/utils/dist/helpers.js
function getEntityParent(child) {
  const transform = Transform2.getOrNull(child);
  if (transform) {
    return transform.parent;
  } else {
    return engine.RootEntity;
  }
}
function getPlayerPosition() {
  return Transform2.getOrNull(engine.PlayerEntity)?.position || Vector32.create();
}
function getEasingFunctionFromInterpolation(type) {
  switch (type) {
    case InterpolationType2.LINEAR:
      return 0;
    case InterpolationType2.EASEINQUAD:
      return 1;
    case InterpolationType2.EASEOUTQUAD:
      return 2;
    case InterpolationType2.EASEQUAD:
      return 3;
    case InterpolationType2.EASEINSINE:
      return 4;
    case InterpolationType2.EASEOUTSINE:
      return 5;
    case InterpolationType2.EASESINE:
      return 6;
    case InterpolationType2.EASEINEXPO:
      return 7;
    case InterpolationType2.EASEOUTEXPO:
      return 8;
    case InterpolationType2.EASEEXPO:
      return 9;
    case InterpolationType2.EASEINELASTIC:
      return 10;
    case InterpolationType2.EASEOUTELASTIC:
      return 11;
    case InterpolationType2.EASEELASTIC:
      return 12;
    case InterpolationType2.EASEINBOUNCE:
      return 13;
    case InterpolationType2.EASEOUTEBOUNCE:
      return 14;
    case InterpolationType2.EASEBOUNCE:
      return 15;
    default:
      return 0;
  }
}

// node_modules/@dcl-sdk/utils/dist/tween.js
function createTweens(targetEngine) {
  const tweenMap = /* @__PURE__ */ new Map();
  function makeSystem(dt) {
    const deadTweens = [];
    for (const [entity, tweenData] of tweenMap.entries()) {
      if (targetEngine.getEntityState(entity) == EntityState.Removed || !Tween3.has(entity)) {
        tweenMap.delete(entity);
        continue;
      }
      const tween = Tween3.get(entity);
      tweenData.normalizedTime += dt * 1e3;
      if (tweenData.normalizedTime >= tween.duration) {
        deadTweens.push(entity);
      }
    }
    for (const entity of deadTweens) {
      const callback = tweenMap.get(entity)?.callback;
      Tween3.deleteFrom(entity);
      tweenMap.delete(entity);
      if (callback)
        callback();
    }
  }
  function makeStop(entity) {
    Tween3.deleteFrom(entity);
    tweenMap.delete(entity);
  }
  function makeStart(mode) {
    return function(entity, start, end, duration, interpolationType = InterpolationType2.LINEAR, onFinish) {
      const currentTime = duration === 0 ? 1 : 0;
      tweenMap.set(entity, { normalizedTime: currentTime, callback: onFinish });
      Tween3.createOrReplace(entity, {
        duration: duration * 1e3,
        easingFunction: getEasingFunctionFromInterpolation(interpolationType),
        currentTime,
        mode: Tween3.Mode[mode]({ start, end })
      });
    };
  }
  function makeGetOnFinishCallback(entity) {
    if (!tweenMap.has(entity)) {
      throw new Error(`Entity ${entity} is not registered with tweens system`);
    }
    return tweenMap.get(entity);
  }
  targetEngine.addSystem(makeSystem, priority.TweenSystemPriority);
  return {
    startTranslation: makeStart("Move"),
    stopTranslation: makeStop,
    startRotation: makeStart("Rotate"),
    stopRotation: makeStop,
    startScaling: makeStart("Scale"),
    stopScaling: makeStop,
    getTranslationOnFinishCallback: makeGetOnFinishCallback,
    getRotationOnFinishCallback: makeGetOnFinishCallback,
    getScalingOnFinishCallback: makeGetOnFinishCallback
  };
}
var tweens = createTweens(engine);

// node_modules/@dcl-sdk/utils/dist/perpetualMotion.js
var AXIS;
(function(AXIS2) {
  AXIS2["X"] = "x";
  AXIS2["Y"] = "y";
  AXIS2["Z"] = "z";
})(AXIS || (AXIS = {}));
function createPerpetualMotions(targetEngine) {
  const PerpetualRotation = targetEngine.defineComponent("dcl.utils.PerpetualRotation", {
    velocity: Schemas.Quaternion
  });
  function system(dt) {
    for (const [entity, rotation] of targetEngine.getEntitiesWith(PerpetualRotation, Transform2)) {
      const rotationDelta = Quaternion2.slerp(Quaternion2.Identity(), rotation.velocity, dt);
      const transform = Transform2.getMutable(entity);
      transform.rotation = Quaternion2.normalize(Quaternion2.multiply(transform.rotation, rotationDelta));
    }
  }
  targetEngine.addSystem(system, priority.PerpetualMotionSystemPriority);
  return {
    startRotation(entity, velocity) {
      PerpetualRotation.createOrReplace(entity, { velocity });
    },
    stopRotation(entity) {
      if (Tween3.has(entity)) {
        Tween3.deleteFrom(entity);
      }
      if (TweenSequence2.has(entity)) {
        TweenSequence2.deleteFrom(entity);
      }
      if (PerpetualRotation.has(entity)) {
        PerpetualRotation.deleteFrom(entity);
      }
    },
    smoothRotation(entity, duration, axis) {
      let firstEnd = Quaternion2.fromEulerDegrees(0, 180, 0);
      let secondEnd = Quaternion2.fromEulerDegrees(0, 360, 0);
      switch (axis) {
        case AXIS.X:
          firstEnd = Quaternion2.fromEulerDegrees(180, 0, 0);
          secondEnd = Quaternion2.fromEulerDegrees(360, 0, 0);
          break;
        case AXIS.Y:
          firstEnd = Quaternion2.fromEulerDegrees(0, 180, 0);
          secondEnd = Quaternion2.fromEulerDegrees(0, 360, 0);
          break;
        case AXIS.Z:
          firstEnd = Quaternion2.fromEulerDegrees(0, 0, 180);
          secondEnd = Quaternion2.fromEulerDegrees(0, 0, 360);
          break;
      }
      Tween3.createOrReplace(entity, {
        mode: Tween3.Mode.Rotate({
          start: Quaternion2.fromEulerDegrees(0, 0, 0),
          end: firstEnd
        }),
        duration: duration / 2,
        easingFunction: 0
      });
      TweenSequence2.create(entity, {
        loop: 0,
        sequence: [
          {
            mode: Tween3.Mode.Rotate({
              start: firstEnd,
              end: secondEnd
            }),
            duration: duration / 2,
            easingFunction: 0
          }
        ]
      });
    }
  };
}
var perpetualMotions = createPerpetualMotions(engine);

// node_modules/@dcl-sdk/utils/dist/path.js
function createPaths(targetEngine) {
  const FollowPath = targetEngine.defineComponent("dcl.utils.FollowPath", {
    points: Schemas.Array(Schemas.Vector3),
    faceDirection: Schemas.Boolean,
    speed: Schemas.Number,
    normalizedTime: Schemas.Number,
    currentIndex: Schemas.Number,
    segmentTimes: Schemas.Array(Schemas.Number),
    curveSegmentCount: Schemas.Number
  });
  const finishCbs = /* @__PURE__ */ new Map();
  const pointReachedCbs = /* @__PURE__ */ new Map();
  function unregisterEntity(entity) {
    finishCbs.delete(entity);
    pointReachedCbs.delete(entity);
    FollowPath.deleteFrom(entity);
  }
  function system(dt) {
    const deadPaths = [];
    const pointReachedPaths = [];
    for (const entity of finishCbs.keys()) {
      if (targetEngine.getEntityState(entity) == EntityState.Removed || !FollowPath.has(entity)) {
        unregisterEntity(entity);
        continue;
      }
      const transform = Transform2.getMutable(entity);
      const path = FollowPath.getMutable(entity);
      path.normalizedTime = Scalar.clamp(path.normalizedTime + dt * path.speed, 0, 1);
      if (path.normalizedTime >= 1)
        deadPaths.push(entity);
      while (path.normalizedTime >= path.segmentTimes[path.currentIndex] && path.currentIndex < path.points.length - 1) {
        if (path.faceDirection) {
          const direction = Vector32.subtract(path.points[path.currentIndex + 1], path.points[path.currentIndex]);
          transform.rotation = Quaternion2.lookRotation(direction);
        }
        if (path.currentIndex > 0 && path.currentIndex % path.curveSegmentCount == 0) {
          const pointIndex = path.currentIndex / path.curveSegmentCount;
          const pointCoords = path.points[path.currentIndex];
          const nextPointCoords = path.points[path.currentIndex + path.curveSegmentCount];
          pointReachedPaths.push({ entity, index: pointIndex, coords: pointCoords, nextCoords: nextPointCoords });
        }
        path.currentIndex += 1;
      }
      const timeDiff = path.segmentTimes[path.currentIndex] - path.segmentTimes[path.currentIndex - 1];
      const coef = (path.segmentTimes[path.currentIndex] - path.normalizedTime) / timeDiff;
      transform.position = Vector32.lerp(path.points[path.currentIndex], path.points[path.currentIndex - 1], coef);
    }
    for (const pointReached of pointReachedPaths) {
      const callback = pointReachedCbs.get(pointReached.entity);
      if (callback) {
        callback(pointReached.index, pointReached.coords, pointReached.nextCoords);
      }
    }
    for (const entity of deadPaths) {
      const callback = finishCbs.get(entity);
      unregisterEntity(entity);
      if (callback)
        callback();
    }
  }
  targetEngine.addSystem(system, priority.PathSystemPriority);
  function startPath(entity, points, duration, faceDirection, curveSegmentCount, onFinishCallback, onPointReachedCallback) {
    if (points.length < 2)
      throw new Error("At least 2 points are required to form a path.");
    if (duration == 0)
      throw new Error("Path duration must not be zero");
    if (curveSegmentCount) {
      const loop = Vector32.equals(points[0], points[points.length - 1]);
      if (loop) {
        points.pop();
        points.unshift(points.pop());
      }
      points = createCatmullRomSpline(points, curveSegmentCount, loop);
    } else {
      curveSegmentCount = 1;
    }
    finishCbs.set(entity, onFinishCallback);
    pointReachedCbs.set(entity, onPointReachedCallback);
    let totalLength = 0;
    const segmentLengths = [];
    for (let i = 0; i < points.length - 1; i++) {
      let sqDist = Vector32.distance(points[i], points[i + 1]);
      totalLength += sqDist;
      segmentLengths.push(sqDist);
    }
    const segmentTimes = [0];
    for (let i = 0; i < segmentLengths.length; i++) {
      segmentTimes.push(segmentLengths[i] / totalLength + segmentTimes[i]);
    }
    FollowPath.createOrReplace(entity, {
      points,
      segmentTimes,
      curveSegmentCount,
      speed: 1 / duration,
      normalizedTime: 0,
      currentIndex: 0,
      faceDirection
    });
  }
  return {
    startStraightPath(entity, points, duration, faceDirection, onFinishCallback, onPointReachedCallback) {
      return startPath(entity, points, duration, faceDirection, 0, onFinishCallback, onPointReachedCallback);
    },
    startSmoothPath(entity, points, duration, segmentCount, faceDirection, onFinishCallback, onPointReachedCallback) {
      if (segmentCount < 2 || !Number.isInteger(segmentCount))
        throw new Error(`segmentCount must be an integer that is greater than 2, got: ${segmentCount}`);
      return startPath(entity, points, duration, faceDirection, segmentCount, onFinishCallback, onPointReachedCallback);
    },
    stopPath(entity) {
      unregisterEntity(entity);
    },
    getOnFinishCallback(entity) {
      if (!finishCbs.has(entity))
        throw new Error(`Entity ${entity} is not registered in triggers system`);
      return finishCbs.get(entity);
    }
  };
}
var paths = createPaths(engine);

// node_modules/@dcl-sdk/utils/dist/trigger.js
var LAYER_1 = 1;
var ALL_LAYERS = 255;
var NO_LAYERS = 0;
var PLAYER_LAYER_ID = LAYER_1;
function createTriggers(targetEngine) {
  const Trigger = engine.defineComponent("dcl.utils.Trigger", {
    active: Schemas.Boolean,
    layerMask: Schemas.Int,
    triggeredByMask: Schemas.Int,
    areas: Schemas.Array(Schemas.OneOf({
      box: Schemas.Map({
        position: Schemas.Vector3,
        scale: Schemas.Vector3
      }),
      sphere: Schemas.Map({
        position: Schemas.Vector3,
        radius: Schemas.Number
      })
    })),
    debugColor: Schemas.Color3
  });
  const triggerEnterCbs = /* @__PURE__ */ new Map();
  const triggerExitCbs = /* @__PURE__ */ new Map();
  let debugDraw = false;
  const activeCollisions = /* @__PURE__ */ new Map();
  const debugEntities = /* @__PURE__ */ new Map();
  function updateDebugDraw(enabled) {
    if (!enabled)
      return;
    for (const [entity, trigger] of targetEngine.getEntitiesWith(Trigger, Transform2)) {
      let shapes = debugEntities.get(entity);
      const areaCount = trigger.areas.length;
      while (shapes.length > areaCount) {
        targetEngine.removeEntity(shapes.pop());
      }
      while (shapes.length < areaCount) {
        shapes.push(targetEngine.addEntity());
      }
      const worldPosition = getWorldPosition(entity);
      const worldRotation = getWorldRotation(entity);
      for (let i = 0; i < areaCount; ++i) {
        const shapeSpec = trigger.areas[i];
        const shape = shapes[i];
        let scale;
        if (shapeSpec.$case == "box") {
          scale = shapeSpec.value.scale;
          MeshRenderer3.setBox(shape);
        } else {
          const radius = shapeSpec.value.radius;
          scale = { x: radius, y: radius, z: radius };
          MeshRenderer3.setSphere(shape);
        }
        Transform2.createOrReplace(shape, {
          position: Vector32.add(worldPosition, Vector32.rotate(shapeSpec.value.position, worldRotation)),
          scale
        });
        const color = trigger.active ? trigger.debugColor : Color32.Black();
        Material3.setPbrMaterial(shape, { albedoColor: Color42.fromInts(255 * color.r, 255 * color.g, 255 * color.b, 75) });
      }
    }
  }
  function areTriggersIntersecting(shapeWorldPos0, t0, shapeWorldPos1, t1) {
    for (let i = 0; i < t0.areas.length; ++i) {
      const t0World = shapeWorldPos0[i];
      const t0Area = t0.areas[i];
      if (t0Area.$case == "box") {
        const t0Box = t0Area.value;
        const t0Min = Vector32.subtract(t0World, Vector32.scale(t0Box.scale, 0.5));
        const t0Max = Vector32.add(t0Min, t0Box.scale);
        for (let j = 0; j < t1.areas.length; ++j) {
          const t1World = shapeWorldPos1[j];
          const t1Area = t1.areas[j];
          if (t1Area.$case == "box") {
            const t1Box = t1Area.value;
            const t1Min = Vector32.subtract(t1World, Vector32.scale(t1Box.scale, 0.5));
            const t1Max = Vector32.add(t1Min, t1Box.scale);
            if (areAABBIntersecting(t0Min, t0Max, t1Min, t1Max))
              return true;
          } else {
            if (areAABBSphereIntersecting(t0Min, t0Max, t1World, t1Area.value.radius))
              return true;
          }
        }
      } else {
        const t0Radius = t0Area.value.radius;
        for (let j = 0; j < t1.areas.length; ++j) {
          const t1World = shapeWorldPos1[j];
          const t1Area = t1.areas[j];
          if (t1Area.$case == "box") {
            const t1Box = t1Area.value;
            const t1Min = Vector32.subtract(t1World, Vector32.scale(t1Box.scale, 0.5));
            const t1Max = Vector32.add(t1Min, t1Box.scale);
            if (areAABBSphereIntersecting(t1Min, t1Max, t0World, t0Radius))
              return true;
          } else {
            if (areSpheresIntersecting(t0World, t0Radius, t1World, t1Area.value.radius))
              return true;
          }
        }
      }
    }
    return false;
  }
  function computeCollisions(entity, shapeWorldPos) {
    let collisions = EMPTY_IMMUTABLE_SET;
    const trigger = Trigger.get(entity);
    if (!trigger.active)
      return collisions;
    if (trigger.triggeredByMask == PLAYER_LAYER_ID) {
      const playerEntity = targetEngine.PlayerEntity;
      const playerTrigger = Trigger.get(targetEngine.PlayerEntity);
      if (playerEntity == entity)
        return collisions;
      if (!playerTrigger.active)
        return collisions;
      if (!(trigger.triggeredByMask & playerTrigger.layerMask))
        return collisions;
      const intersecting = areTriggersIntersecting(shapeWorldPos.get(entity), trigger, shapeWorldPos.get(playerEntity), playerTrigger);
      if (intersecting) {
        if (collisions === EMPTY_IMMUTABLE_SET)
          collisions = /* @__PURE__ */ new Set();
        collisions.add(playerEntity);
      }
    } else {
      for (const [otherEntity, otherTrigger] of targetEngine.getEntitiesWith(Trigger, Transform2)) {
        if (otherEntity == entity)
          continue;
        if (!otherTrigger.active)
          continue;
        if (!(trigger.triggeredByMask & otherTrigger.layerMask))
          continue;
        const intersecting = areTriggersIntersecting(shapeWorldPos.get(entity), trigger, shapeWorldPos.get(otherEntity), otherTrigger);
        if (intersecting) {
          if (collisions === EMPTY_IMMUTABLE_SET)
            collisions = /* @__PURE__ */ new Set();
          collisions.add(otherEntity);
        }
      }
    }
    return collisions;
  }
  function updateCollisions() {
    const collisionsStarted = [];
    const collisionsEnded = [];
    const shapeWorldPositions = /* @__PURE__ */ new Map();
    for (const entity of activeCollisions.keys()) {
      if (targetEngine.getEntityState(entity) == EntityState.Removed || !Trigger.has(entity)) {
        for (const debugEntity of debugEntities.get(entity))
          targetEngine.removeEntity(debugEntity);
        for (const collisions of activeCollisions.values()) {
          if (collisions.has(entity))
            collisions.delete(entity);
        }
        debugEntities.delete(entity);
        activeCollisions.delete(entity);
        triggerEnterCbs.delete(entity);
        triggerExitCbs.delete(entity);
        continue;
      }
      const positions = [];
      const entityWorldPosition = getWorldPosition(entity);
      const entityWorldRotation = getWorldRotation(entity);
      const trigger = Trigger.get(entity);
      for (const shape of trigger.areas) {
        positions.push(Vector32.add(entityWorldPosition, Vector32.rotate(shape.value.position, entityWorldRotation)));
      }
      shapeWorldPositions.set(entity, positions);
    }
    for (const entity of activeCollisions.keys()) {
      const newCollisions = computeCollisions(entity, shapeWorldPositions);
      const oldCollisions = activeCollisions.get(entity);
      for (const oldCollision of oldCollisions) {
        if (!newCollisions.has(oldCollision))
          collisionsEnded.push([entity, oldCollision]);
      }
      for (const newCollision of newCollisions) {
        if (!oldCollisions.has(newCollision))
          collisionsStarted.push([entity, newCollision]);
      }
      activeCollisions.set(entity, newCollisions);
    }
    for (const [entity, collision] of collisionsStarted) {
      const callback = triggerEnterCbs.get(entity);
      if (callback)
        callback(collision);
    }
    for (const [entity, collision] of collisionsEnded) {
      const callback = triggerExitCbs.get(entity);
      if (callback)
        callback(collision);
    }
  }
  function system(dt) {
    updateCollisions();
    updateDebugDraw(debugDraw);
  }
  targetEngine.addSystem(system, priority.TriggerSystemPriority);
  function triggerAreasFromSpec(areas) {
    if (!areas)
      areas = [{ type: "box" }];
    const triggerAreas = [];
    for (const area of areas) {
      if (area.type == "box") {
        triggerAreas.push({
          $case: "box",
          value: {
            position: area.position ? area.position : Vector32.Zero(),
            scale: area.scale ? area.scale : Vector32.One()
          }
        });
      } else {
        triggerAreas.push({
          $case: "sphere",
          value: {
            position: area.position ? area.position : Vector32.Zero(),
            radius: area.radius ? area.radius : 1
          }
        });
      }
    }
    return triggerAreas;
  }
  const triggersInterface = {
    addTrigger(entity, layerMask = NO_LAYERS, triggeredByMask = NO_LAYERS, areas, onEnterCallback, onExitCallback, debugColor) {
      if (layerMask < 0 || layerMask > ALL_LAYERS || !Number.isInteger(layerMask))
        throw new Error(`Bad layerMask: ${layerMask}. Expected a non-negative integer no greater than ${ALL_LAYERS}`);
      if (triggeredByMask < 0 || triggeredByMask > ALL_LAYERS || !Number.isInteger(triggeredByMask))
        throw new Error(`Bad triggeredByMask: ${triggeredByMask}. Expected a non-negative integer no greater than ${ALL_LAYERS}`);
      debugEntities.set(entity, []);
      activeCollisions.set(entity, /* @__PURE__ */ new Set());
      triggerEnterCbs.set(entity, onEnterCallback);
      triggerExitCbs.set(entity, onExitCallback);
      Trigger.createOrReplace(entity, {
        active: true,
        layerMask,
        triggeredByMask,
        areas: triggerAreasFromSpec(areas),
        debugColor: debugColor ? debugColor : Color32.Red()
      });
    },
    removeTrigger(entity) {
      const collisions = activeCollisions.get(entity);
      const callback = triggerExitCbs.get(entity);
      for (const debugEntity of debugEntities.get(entity))
        targetEngine.removeEntity(debugEntity);
      debugEntities.delete(entity);
      activeCollisions.delete(entity);
      triggerEnterCbs.delete(entity);
      triggerExitCbs.delete(entity);
      Trigger.deleteFrom(entity);
      const collidingEntities = [];
      for (const [otherEntity, otherEntityCollisions] of activeCollisions) {
        if (otherEntityCollisions.has(entity)) {
          otherEntityCollisions.delete(entity);
          collidingEntities.push(otherEntity);
        }
      }
      if (callback) {
        for (const collision of collisions)
          callback(collision);
      }
      for (const otherEntity of collidingEntities) {
        const callback2 = triggerExitCbs.get(otherEntity);
        if (callback2)
          callback2(entity);
      }
    },
    oneTimeTrigger(entity, layerMask = NO_LAYERS, triggeredByMask = NO_LAYERS, areas, onEnterCallback, debugColor) {
      this.addTrigger(entity, layerMask, triggeredByMask, areas, function(e) {
        triggers2.removeTrigger(entity);
        if (onEnterCallback)
          onEnterCallback(e);
      }, void 0, debugColor);
    },
    enableTrigger(entity, enabled) {
      Trigger.getMutable(entity).active = enabled;
    },
    isTriggerEnabled(entity) {
      return Trigger.get(entity).active;
    },
    getLayerMask(entity) {
      return Trigger.get(entity).layerMask;
    },
    setLayerMask(entity, mask) {
      if (mask < 0 || mask > ALL_LAYERS || !Number.isInteger(mask))
        throw new Error(`Bad layerMask: ${mask}. Expected a non-negative integer no greater than ${ALL_LAYERS}`);
      Trigger.getMutable(entity).layerMask = mask;
    },
    getTriggeredByMask(entity) {
      return Trigger.get(entity).triggeredByMask;
    },
    setTriggeredByMask(entity, mask) {
      if (mask < 0 || mask > ALL_LAYERS || !Number.isInteger(mask))
        throw new Error(`Bad layerMask: ${mask}. Expected a non-negative integer no greater than ${ALL_LAYERS}`);
      Trigger.getMutable(entity).triggeredByMask = mask;
    },
    getAreas(entity) {
      return Trigger.get(entity).areas;
    },
    setAreas(entity, areas) {
      Trigger.getMutable(entity).areas = triggerAreasFromSpec(areas);
    },
    setOnEnterCallback(entity, callback) {
      triggerEnterCbs.set(entity, callback);
    },
    setOnExitCallback(entity, callback) {
      triggerExitCbs.set(entity, callback);
    },
    enableDebugDraw(enabled) {
      debugDraw = enabled;
      if (!enabled) {
        for (const shapes of debugEntities.values()) {
          for (const shape of shapes)
            targetEngine.removeEntity(shape);
          shapes.length = 0;
        }
      }
    },
    isDebugDrawEnabled() {
      return debugDraw;
    }
  };
  triggersInterface.addTrigger(targetEngine.PlayerEntity, PLAYER_LAYER_ID, NO_LAYERS, [{
    type: "box",
    scale: { x: 0.65, y: 1.92, z: 0.65 },
    position: { x: 0, y: 1.92 / 2, z: 0 }
  }], void 0, void 0, Color32.Green());
  return triggersInterface;
}
var triggers2 = createTriggers(engine);
var EMPTY_IMMUTABLE_SET = /* @__PURE__ */ new Set();
EMPTY_IMMUTABLE_SET.add = (entity) => {
  debugger;
  throw new Error("EMPTY_SET is read only");
};
EMPTY_IMMUTABLE_SET.delete = (entity) => {
  throw new Error("EMPTY_SET is read only");
};
EMPTY_IMMUTABLE_SET.has = (entity) => {
  return false;
};

// node_modules/@dcl-sdk/utils/dist/action.js
var actions2;
(function(actions3) {
  class SequenceRunner {
    constructor(targetEngine, sequenceBuilt, onFinishCallback) {
      this.beginSequenceNode = null;
      this.currentSequenceNode = null;
      this.running = false;
      this.started = false;
      this.engine = targetEngine;
      this.systemFn = (dt) => {
        this.update(dt);
      };
      this.engine.addSystem(this.systemFn, priority.ActionSystemPriority);
      if (sequenceBuilt) {
        this.startSequence(sequenceBuilt);
      }
      if (onFinishCallback)
        this.setOnFinishCallback(onFinishCallback);
    }
    startSequence(sequenceBuilt) {
      this.beginSequenceNode = sequenceBuilt.beginSequenceNode;
      this.currentSequenceNode = this.beginSequenceNode;
      this.running = true;
      this.started = false;
    }
    destroy() {
      this.engine.removeSystem(this.systemFn);
    }
    setOnFinishCallback(onFinishCallback) {
      this.onFinishCallback = onFinishCallback;
    }
    isRunning() {
      return this.running;
    }
    stop() {
      this.running = false;
    }
    resume() {
      if (this.beginSequenceNode != null)
        this.running = true;
    }
    reset() {
      this.currentSequenceNode = this.beginSequenceNode;
      this.running = true;
      this.started = false;
    }
    getRunningAction() {
      let currentNode = this.currentSequenceNode;
      if (this.currentSequenceNode instanceof SubSequenceNode) {
        do {
          currentNode = currentNode.currentInnerSequence;
        } while (currentNode instanceof SubSequenceNode);
      }
      return currentNode.action;
    }
    update(dt) {
      if (!this.running)
        return;
      if (!this.started) {
        this.currentSequenceNode.onStart();
        this.started = true;
        return;
      }
      if (!this.currentSequenceNode.hasFinish()) {
        this.currentSequenceNode.update(dt);
        return;
      }
      this.currentSequenceNode.onFinish();
      this.currentSequenceNode = this.currentSequenceNode.next;
      if (this.currentSequenceNode) {
        this.currentSequenceNode.onStart();
      } else {
        this.running = false;
        if (this.onFinishCallback)
          this.onFinishCallback();
      }
    }
  }
  actions3.SequenceRunner = SequenceRunner;
  class SequenceBuilder {
    constructor() {
      this.currentSequenceNode = null;
      this.beginSequenceNode = null;
      this.whileNodeStack = [];
    }
    then(action) {
      if (this.currentSequenceNode == null) {
        this.currentSequenceNode = new SequenceNode();
        this.currentSequenceNode.action = action;
        this.beginSequenceNode = this.currentSequenceNode;
      } else {
        let next = new SequenceNode();
        next.action = action;
        this.currentSequenceNode = this.currentSequenceNode.then(next);
      }
      return this;
    }
    if(condition) {
      let ifSeq = new IfSequenceNode(condition);
      if (this.currentSequenceNode == null) {
        this.currentSequenceNode = ifSeq;
        this.beginSequenceNode = ifSeq;
      } else {
        this.currentSequenceNode = this.currentSequenceNode.then(ifSeq);
      }
      return this;
    }
    else() {
      let seq = this.currentSequenceNode.getSequence();
      if (seq instanceof IfSequenceNode) {
        seq.closed = true;
        let elseSeq = new ElseSequenceNode(seq);
        this.currentSequenceNode = this.currentSequenceNode.then(elseSeq);
      } else {
        throw new Error("IF statement is needed to be called before ELSE statement.");
      }
      return this;
    }
    endIf() {
      let seq = this.currentSequenceNode.getSequence();
      if (seq instanceof IfSequenceNode || seq instanceof ElseSequenceNode) {
        seq.closed = true;
      } else {
        throw new Error("IF statement is needed to be called before ENDIF statement.");
      }
      return this;
    }
    while(condition) {
      let whileSeq = new WhileSequenceNode(condition);
      if (this.currentSequenceNode == null) {
        this.currentSequenceNode = whileSeq;
        this.beginSequenceNode = whileSeq;
      } else {
        this.currentSequenceNode = this.currentSequenceNode.then(whileSeq);
      }
      this.whileNodeStack.push(whileSeq);
      return this;
    }
    endWhile() {
      let seq = this.currentSequenceNode.getSequence();
      if (seq instanceof WhileSequenceNode) {
        seq.closed = true;
        if (this.whileNodeStack.length > 0) {
          this.whileNodeStack.splice(this.whileNodeStack.length - 1, 1);
        }
      } else {
        throw new Error("WHILE statement is needed to be called before ENDWHILE statement.");
      }
      return this;
    }
    breakWhile() {
      if (this.whileNodeStack.length > 0) {
        this.currentSequenceNode = this.currentSequenceNode.then(new BreakWhileSequenceNode(this.whileNodeStack[this.whileNodeStack.length - 1]));
      } else {
        throw new Error("WHILE statement is needed to be called before BREAKWHILE statement.");
      }
      return this;
    }
  }
  actions3.SequenceBuilder = SequenceBuilder;
  class SequenceNode {
    constructor() {
      this.action = null;
      this.next = null;
    }
    then(next) {
      this.next = next;
      return next;
    }
    onStart() {
      if (this.action)
        this.action.onStart();
    }
    update(dt) {
      if (this.action)
        this.action.update(dt);
    }
    onFinish() {
      if (this.action)
        this.action.onFinish();
    }
    hasFinish() {
      if (this.action)
        return this.action.hasFinished;
      else
        return true;
    }
    getSequence() {
      return this;
    }
  }
  actions3.SequenceNode = SequenceNode;
  class SubSequenceNode extends SequenceNode {
    constructor() {
      super(...arguments);
      this.currentInnerSequence = null;
      this.startingInnerSequence = null;
      this.closed = false;
    }
    then(next) {
      if (this.currentInnerSequence == null) {
        this.currentInnerSequence = next;
        this.startingInnerSequence = next;
      } else {
        if (this.closed) {
          this.next = next;
          return next;
        } else {
          this.currentInnerSequence = this.currentInnerSequence.then(next);
        }
      }
      return this;
    }
    onStart() {
      this.currentInnerSequence = this.startingInnerSequence;
      if (this.currentInnerSequence)
        this.currentInnerSequence.onStart();
    }
    update(dt) {
      if (this.currentInnerSequence) {
        if (!this.currentInnerSequence.hasFinish()) {
          this.currentInnerSequence.update(dt);
        } else {
          this.currentInnerSequence.onFinish();
          this.currentInnerSequence = this.currentInnerSequence.next;
          if (this.currentInnerSequence)
            this.currentInnerSequence.onStart();
        }
      }
    }
    onFinish() {
      if (this.currentInnerSequence)
        this.currentInnerSequence.onFinish();
    }
    hasFinish() {
      return this.currentInnerSequence == null;
    }
    getSequence() {
      if (this.currentInnerSequence) {
        let innerSeq = this.currentInnerSequence.getSequence();
        if (innerSeq instanceof SubSequenceNode) {
          if (!innerSeq.closed) {
            return innerSeq;
          }
        }
      }
      return this;
    }
  }
  class IfSequenceNode extends SubSequenceNode {
    constructor(condition) {
      super();
      this.result = false;
      this.condition = condition;
    }
    onStart() {
      this.result = this.condition();
      if (this.result)
        super.onStart();
      else
        this.currentInnerSequence = null;
    }
  }
  class ElseSequenceNode extends SubSequenceNode {
    constructor(ifSequence) {
      super();
      this.ifSequence = null;
      this.ifSequence = ifSequence;
    }
    onStart() {
      if (this.ifSequence && !this.ifSequence.result)
        super.onStart();
      else
        this.currentInnerSequence = null;
    }
  }
  class WhileSequenceNode extends SubSequenceNode {
    constructor(condition) {
      super();
      this.breakWhile = false;
      this.condition = condition;
    }
    onStart() {
      this.breakWhile = false;
      if (this.condition())
        super.onStart();
      else
        this.currentInnerSequence = null;
    }
    update(dt) {
      if (this.currentInnerSequence) {
        if (!this.currentInnerSequence.hasFinish()) {
          this.currentInnerSequence.update(dt);
        } else {
          this.currentInnerSequence.onFinish();
          this.currentInnerSequence = this.currentInnerSequence.next;
          if (this.currentInnerSequence == null)
            this.currentInnerSequence = this.startingInnerSequence;
          if (this.currentInnerSequence)
            this.currentInnerSequence.onStart();
        }
      }
    }
    hasFinish() {
      return this.breakWhile || !this.condition();
    }
  }
  class BreakWhileSequenceNode extends SequenceNode {
    constructor(whileNode) {
      super();
      this.whileNode = whileNode;
    }
    onStart() {
      this.whileNode.breakWhile = true;
    }
  }
})(actions2 || (actions2 = {}));

// node_modules/@dcl/asset-packs/dist/input-actions.js
var globalInputActions = mitt_default();
function createInputActionSystem(inputSystem2) {
  return function inputActionSystem() {
    if (inputSystem2.isTriggered(0, 1)) {
      globalInputActions.emit(0, null);
    }
    if (inputSystem2.isTriggered(1, 1)) {
      globalInputActions.emit(1, null);
    }
    if (inputSystem2.isTriggered(2, 1)) {
      globalInputActions.emit(2, null);
    }
  };
}

// node_modules/@dcl/asset-packs/dist/triggers.js
var initedEntities = /* @__PURE__ */ new Set();
var actionQueue = [];
var damageTargets = /* @__PURE__ */ new Set();
var healTargets = /* @__PURE__ */ new Set();
var internalInitTriggers = null;
function initTriggers(entity) {
  if (internalInitTriggers) {
    return internalInitTriggers(entity);
  }
  throw new Error(`Cannot call initTriggers while triggersSystem has not been created`);
}
function createTriggersSystem(engine2, components, pointerEventsSystem2, tweenSystem2) {
  const { Transform: Transform3, Tween: TweenComponent, PointerEvents: PointerEvents2 } = components;
  const { Actions, States, Counter, Triggers } = getComponents(engine2);
  internalInitTriggers = initEntityTriggers;
  return function triggersSystem(_dt) {
    while (actionQueue.length > 0) {
      const { entity, action } = actionQueue.shift();
      const actionEvents = getActionEvents(entity);
      actionEvents.emit(action.name, getPayload(action));
    }
    const entitiesWithTriggers = engine2.getEntitiesWith(Triggers);
    for (const [entity] of entitiesWithTriggers) {
      initEntityTriggers(entity);
      handleOnTweenEnd(entity);
    }
  };
  function initEntityTriggers(entity) {
    if (!Triggers.has(entity) || initedEntities.has(entity)) {
      return;
    }
    const triggers3 = Triggers.get(entity);
    const types = triggers3.value.reduce((types2, trigger) => types2.add(trigger.type), /* @__PURE__ */ new Set());
    for (const type of types) {
      switch (type) {
        case TriggerType.ON_CLICK: {
          initOnClickTrigger(entity);
          break;
        }
        case TriggerType.ON_INPUT_ACTION: {
          initOnInputActionTrigger(entity);
          break;
        }
        case TriggerType.ON_PLAYER_ENTERS_AREA:
        case TriggerType.ON_PLAYER_LEAVES_AREA: {
          initOnPlayerTriggerArea(entity);
          break;
        }
        case TriggerType.ON_DAMAGE: {
          initOnDamage(entity);
          break;
        }
        case TriggerType.ON_HEAL_PLAYER: {
          initOnHealPlayer(entity);
        }
        case TriggerType.ON_GLOBAL_CLICK: {
          initOnGlobalCick(entity);
          break;
        }
        case TriggerType.ON_GLOBAL_PRIMARY: {
          initOnGlobalPrimary(entity);
          break;
        }
        case TriggerType.ON_GLOBAL_SECONDARY: {
          initOnGlobalSecondary(entity);
          break;
        }
        case TriggerType.ON_TICK: {
          initOnTick(entity);
          break;
        }
      }
    }
    const triggerEvents = getTriggerEvents(entity);
    for (const trigger of triggers3.value) {
      triggerEvents.on(trigger.type, () => {
        if (checkConditions(trigger)) {
          for (const triggerAction of trigger.actions) {
            if (isValidAction(triggerAction)) {
              const entity2 = getEntityByAction(triggerAction);
              if (entity2) {
                const actions3 = Actions.getOrNull(entity2);
                if (actions3) {
                  const action = actions3.value.find(($) => $.name === triggerAction.name);
                  if (action) {
                    actionQueue.push({ entity: entity2, action });
                  }
                }
              }
            }
          }
        }
      });
    }
    triggerEvents.emit(TriggerType.ON_SPAWN);
    initedEntities.add(entity);
  }
  function isValidAction(action) {
    const { id, name } = action;
    return !!id && !!name;
  }
  function checkConditions(trigger) {
    if (trigger.conditions && trigger.conditions.length > 0) {
      const conditions = trigger.conditions.map(checkCondition);
      const isTrue = (result) => !!result;
      const operation = trigger.operation || TriggerConditionOperation.AND;
      switch (operation) {
        case TriggerConditionOperation.AND: {
          return conditions.every(isTrue);
        }
        case TriggerConditionOperation.OR: {
          return conditions.some(isTrue);
        }
      }
    }
    return true;
  }
  function checkCondition(condition) {
    const entity = getEntityByCondition(condition);
    if (entity) {
      try {
        switch (condition.type) {
          case TriggerConditionType.WHEN_STATE_IS: {
            const states = States.getOrNull(entity);
            if (states !== null) {
              const currentValue = getCurrentValue(states);
              return currentValue === condition.value;
            }
            break;
          }
          case TriggerConditionType.WHEN_STATE_IS_NOT: {
            const states = States.getOrNull(entity);
            if (states !== null) {
              const currentValue = getCurrentValue(states);
              return currentValue !== condition.value;
            }
            break;
          }
          case TriggerConditionType.WHEN_PREVIOUS_STATE_IS: {
            const states = States.getOrNull(entity);
            if (states !== null) {
              const previousValue = getPreviousValue(states);
              return previousValue === condition.value;
            }
            break;
          }
          case TriggerConditionType.WHEN_PREVIOUS_STATE_IS_NOT: {
            const states = States.getOrNull(entity);
            if (states !== null) {
              const previousValue = getPreviousValue(states);
              return previousValue !== condition.value;
            }
            break;
          }
          case TriggerConditionType.WHEN_COUNTER_EQUALS: {
            const counter = Counter.getOrNull(entity);
            if (counter !== null) {
              const numeric = Number(condition.value);
              if (!isNaN(numeric)) {
                return counter.value === numeric;
              }
            }
            break;
          }
          case TriggerConditionType.WHEN_COUNTER_IS_GREATER_THAN: {
            const counter = Counter.getOrNull(entity);
            if (counter !== null) {
              const numeric = Number(condition.value);
              if (!isNaN(numeric)) {
                return counter.value > numeric;
              }
            }
            break;
          }
          case TriggerConditionType.WHEN_COUNTER_IS_LESS_THAN: {
            const counter = Counter.getOrNull(entity);
            if (counter !== null) {
              const numeric = Number(condition.value);
              if (!isNaN(numeric)) {
                return counter.value < numeric;
              }
            }
            break;
          }
          case TriggerConditionType.WHEN_DISTANCE_TO_PLAYER_LESS_THAN: {
            const position = getWorldPosition(entity);
            const numeric = Number(condition.value);
            if (!isNaN(numeric)) {
              return Vector32.distance(position, getPlayerPosition()) < numeric;
            }
            break;
          }
          case TriggerConditionType.WHEN_DISTANCE_TO_PLAYER_GREATER_THAN: {
            const position = getWorldPosition(entity);
            const numeric = Number(condition.value);
            if (!isNaN(numeric)) {
              return Vector32.distance(position, getPlayerPosition()) > numeric;
            }
            break;
          }
        }
      } catch (error) {
        console.error("Error in condition", condition);
      }
    }
    return false;
  }
  function getEntityById(componentName, id) {
    const Component = engine2.getComponent(componentName);
    const entities = Array.from(engine2.getEntitiesWith(Component));
    const result = entities.find(([_entity, value]) => value.id === id);
    return Array.isArray(result) && result.length > 0 ? result[0] : null;
  }
  function getEntityByAction(action) {
    if (action.id) {
      const entity = getEntityById(ComponentName.ACTIONS, action.id);
      if (entity) {
        return entity;
      }
    }
    return null;
  }
  function getEntityByCondition(condition) {
    const componentName = Object.values(ComponentName).map((componentName2) => ({
      componentName: componentName2,
      conditionTypes: getConditionTypesByComponentName(componentName2)
    })).reduce((result, { componentName: componentName2, conditionTypes }) => conditionTypes.includes(condition.type) ? componentName2 : result, null);
    if (componentName && condition.id) {
      const entity = getEntityById(componentName, condition.id);
      if (entity) {
        return entity;
      }
    }
    return null;
  }
  function initOnClickTrigger(entity) {
    const pointerEvent = PointerEvents2.getMutableOrNull(entity);
    const opts = { button: 0, hoverText: "Click" };
    if (pointerEvent) {
      pointerEvent.pointerEvents = pointerEvent.pointerEvents.filter(($) => !($.eventInfo?.button === opts.button && $.eventInfo.hoverText === opts.hoverText));
    }
    pointerEventsSystem2.onPointerDown({
      entity,
      opts
    }, () => {
      const triggerEvents = getTriggerEvents(entity);
      triggerEvents.emit(TriggerType.ON_CLICK);
    });
  }
  function initOnInputActionTrigger(entity) {
    const pointerEvent = PointerEvents2.getMutableOrNull(entity);
    const opts = {
      button: 1,
      hoverText: "Press"
    };
    if (pointerEvent) {
      pointerEvent.pointerEvents = pointerEvent.pointerEvents.filter(($) => !($.eventInfo?.button === opts.button && $.eventInfo.hoverText === opts.hoverText));
    }
    pointerEventsSystem2.onPointerDown({
      entity,
      opts
    }, () => {
      const triggerEvents = getTriggerEvents(entity);
      triggerEvents.emit(TriggerType.ON_INPUT_ACTION);
    });
  }
  function initOnPlayerTriggerArea(entity) {
    const transform = Transform3.getOrNull(entity);
    triggers2.addTrigger(entity, NO_LAYERS, LAYER_1, [
      {
        type: "box",
        scale: transform ? transform.scale : { x: 1, y: 1, z: 1 }
      }
    ], () => {
      const triggerEvents = getTriggerEvents(entity);
      triggerEvents.emit(TriggerType.ON_PLAYER_ENTERS_AREA);
    }, () => {
      const triggerEvents = getTriggerEvents(entity);
      triggerEvents.emit(TriggerType.ON_PLAYER_LEAVES_AREA);
    });
  }
  function initOnDamage(entity) {
    damageTargets.add(entity);
  }
  function initOnHealPlayer(entity) {
    healTargets.add(entity);
  }
  function initOnGlobalCick(entity) {
    globalInputActions.on(0, () => {
      const triggerEvents = getTriggerEvents(entity);
      triggerEvents.emit(TriggerType.ON_GLOBAL_CLICK);
    });
  }
  function initOnGlobalPrimary(entity) {
    globalInputActions.on(1, () => {
      const triggerEvents = getTriggerEvents(entity);
      triggerEvents.emit(TriggerType.ON_GLOBAL_PRIMARY);
    });
  }
  function initOnGlobalSecondary(entity) {
    globalInputActions.on(2, () => {
      const triggerEvents = getTriggerEvents(entity);
      triggerEvents.emit(TriggerType.ON_GLOBAL_SECONDARY);
    });
  }
  function initOnTick(entity) {
    tickSet.add(entity);
  }
  function handleOnTweenEnd(entity) {
    if (TweenComponent.getOrNull(entity) && TweenState2.getOrNull(entity)?.state === 1 && tweenSystem2.tweenCompleted(entity)) {
      const triggerEvents = getTriggerEvents(entity);
      triggerEvents.emit(TriggerType.ON_TWEEN_END);
    }
  }
}

// node_modules/@dcl/asset-packs/dist/transform.js
var followMap = /* @__PURE__ */ new Map();
function createTransformSystem(components) {
  const { Transform: Transform3 } = components;
  return function transformSystem() {
    for (const [entity, { target, speed, minDistance, axes }] of followMap) {
      const entityTransform = Transform3.getMutableOrNull(entity);
      const targetTransform = Transform3.getOrNull(target);
      if (!entityTransform || !targetTransform)
        continue;
      const direction = Vector32.subtract(targetTransform.position, entityTransform.position);
      const distance = Vector32.length(direction);
      if (distance < minDistance)
        continue;
      const normalized = Vector32.normalize(direction);
      const move = Vector32.scale(normalized, speed / 10);
      if (Vector32.length(move) > distance)
        continue;
      if (!axes.x)
        move.x = 0;
      if (!axes.y)
        move.y = 0;
      if (!axes.z)
        move.z = 0;
      Vector32.addToRef(move, entityTransform.position, entityTransform.position);
      const lookAt = Vector32.clone(targetTransform.position);
      if (!axes.x)
        lookAt.x = entityTransform.position.x;
      if (!axes.y)
        lookAt.y = entityTransform.position.y;
      if (!axes.z)
        lookAt.z = entityTransform.position.z;
      const lookAtRotation = Quaternion2.fromLookAt(entityTransform.position, lookAt);
      entityTransform.rotation = lookAtRotation;
    }
  };
}

// node_modules/@dcl/asset-packs/dist/tweens.js
function getEasingFunctionFromInterpolation2(type) {
  switch (type) {
    case InterpolationType.LINEAR:
      return 0;
    case InterpolationType.EASEINQUAD:
      return 1;
    case InterpolationType.EASEOUTQUAD:
      return 2;
    case InterpolationType.EASEQUAD:
      return 3;
    case InterpolationType.EASEINSINE:
      return 4;
    case InterpolationType.EASEOUTSINE:
      return 5;
    case InterpolationType.EASESINE:
      return 6;
    case InterpolationType.EASEINEXPO:
      return 7;
    case InterpolationType.EASEOUTEXPO:
      return 8;
    case InterpolationType.EASEEXPO:
      return 9;
    case InterpolationType.EASEINELASTIC:
      return 10;
    case InterpolationType.EASEOUTELASTIC:
      return 11;
    case InterpolationType.EASEELASTIC:
      return 12;
    case InterpolationType.EASEINBOUNCE:
      return 13;
    case InterpolationType.EASEOUTEBOUNCE:
      return 14;
    case InterpolationType.EASEBOUNCE:
      return 15;
    default:
      return 0;
  }
}

// node_modules/@dcl/asset-packs/dist/actions.js
var initedEntities2 = /* @__PURE__ */ new Set();
var uiStacks = /* @__PURE__ */ new Map();
var lastUiEntityClicked = /* @__PURE__ */ new Map();
var internalInitActions = null;
function createActionsSystem(engine2, sdkHelpers) {
  const { Animator: Animator3, Transform: Transform3, AudioSource: AudioSource4, AvatarAttach: AvatarAttach2, VisibilityComponent: VisibilityComponent2, GltfContainer: GltfContainer3, UiTransform: UiTransform3, UiText: UiText3, UiBackground: UiBackground2, Name: Name3, Tween: TweenComponent, TweenSequence: TweenSequence3 } = getExplorerComponents(engine2);
  const { Actions, States, Counter, Triggers } = getComponents(engine2);
  internalInitActions = initActions;
  return function actionsSystem(_dt) {
    const entitiesWithActions = engine2.getEntitiesWith(Actions);
    for (const [entity] of entitiesWithActions) {
      initActions(entity);
    }
  };
  function initActions(entity) {
    if (!Actions.has(entity) || initedEntities2.has(entity)) {
      return;
    }
    const actions3 = Actions.get(entity);
    const types = actions3.value.reduce((types2, action) => types2.add(action.type), /* @__PURE__ */ new Set());
    for (const type of types) {
      switch (type) {
        case ActionType.PLAY_ANIMATION: {
          initPlayAnimation(entity);
          break;
        }
        default:
          break;
      }
    }
    const actionEvents = getActionEvents(entity);
    for (const action of actions3.value) {
      actionEvents.on(action.name, () => {
        switch (action.type) {
          case ActionType.PLAY_ANIMATION: {
            handlePlayAnimation(entity, getPayload(action));
            break;
          }
          case ActionType.STOP_ANIMATION: {
            handleStopAnimation(entity, getPayload(action));
            break;
          }
          case ActionType.SET_STATE: {
            handleSetState(entity, getPayload(action));
            break;
          }
          case ActionType.START_TWEEN: {
            handleStartTween(entity, getPayload(action));
            break;
          }
          case ActionType.SET_COUNTER: {
            handleSetCounter(entity, getPayload(action));
            break;
          }
          case ActionType.INCREMENT_COUNTER: {
            handleIncrementCounter(entity, getPayload(action));
            break;
          }
          case ActionType.DECREASE_COUNTER: {
            handleDecreaseCounter(entity, getPayload(action));
            break;
          }
          case ActionType.PLAY_SOUND: {
            handlePlaySound(entity, getPayload(action));
            break;
          }
          case ActionType.STOP_SOUND: {
            handleStopSound(entity, getPayload(action));
            break;
          }
          case ActionType.SET_VISIBILITY: {
            handleSetVisibility(entity, getPayload(action));
            break;
          }
          case ActionType.ATTACH_TO_PLAYER: {
            handleAttachToPlayer(entity, getPayload(action));
            break;
          }
          case ActionType.DETACH_FROM_PLAYER: {
            handleDetachFromPlayer(entity, getPayload(action));
            break;
          }
          case ActionType.PLAY_VIDEO_STREAM: {
            handlePlayVideo(entity, getPayload(action));
            break;
          }
          case ActionType.STOP_VIDEO_STREAM: {
            handleStopVideo(entity, getPayload(action));
            break;
          }
          case ActionType.PLAY_AUDIO_STREAM: {
            handlePlayAudioStream(entity, getPayload(action));
            break;
          }
          case ActionType.STOP_AUDIO_STREAM: {
            handleStopAudioStream(entity, getPayload(action));
            break;
          }
          case ActionType.TELEPORT_PLAYER: {
            handleTeleportPlayer(entity, getPayload(action));
            break;
          }
          case ActionType.MOVE_PLAYER: {
            handleMovePlayer(entity, getPayload(action));
            break;
          }
          case ActionType.PLAY_DEFAULT_EMOTE: {
            handlePlayDefaultEmote(entity, getPayload(action));
            break;
          }
          case ActionType.PLAY_CUSTOM_EMOTE: {
            handlePlayCustomEmote(entity, getPayload(action));
            break;
          }
          case ActionType.OPEN_LINK: {
            handleOpenLink(entity, getPayload(action));
            break;
          }
          case ActionType.SHOW_TEXT: {
            handleShowText(entity, getPayload(action));
            break;
          }
          case ActionType.HIDE_TEXT: {
            handleHideText(entity, getPayload(action));
            break;
          }
          case ActionType.START_DELAY: {
            handleStartDelay(entity, getPayload(action));
            break;
          }
          case ActionType.STOP_DELAY: {
            handleStopDelay(entity, getPayload(action));
            break;
          }
          case ActionType.START_LOOP: {
            handleStartLoop(entity, getPayload(action));
            break;
          }
          case ActionType.STOP_LOOP: {
            handleStopLoop(entity, getPayload(action));
            break;
          }
          case ActionType.CLONE_ENTITY: {
            handleCloneEntity(entity, getPayload(action));
            break;
          }
          case ActionType.REMOVE_ENTITY: {
            handleRemoveEntity(entity, getPayload(action));
            break;
          }
          case ActionType.SHOW_IMAGE: {
            handleShowImage(entity, getPayload(action));
            break;
          }
          case ActionType.HIDE_IMAGE: {
            handleHideImage(entity, getPayload(action));
            break;
          }
          case ActionType.DAMAGE: {
            handleDamage(entity, getPayload(action));
            break;
          }
          case ActionType.MOVE_PLAYER_HERE: {
            handleMovePlayerHere(entity, getPayload(action));
            break;
          }
          case ActionType.FOLLOW_PLAYER: {
            handleFollowPlayer(entity, getPayload(action));
            break;
          }
          case ActionType.STOP_FOLLOWING_PLAYER: {
            handleStopFollowingPlayer(entity, getPayload(action));
            break;
          }
          case ActionType.PLACE_ON_PLAYER: {
            handlePlaceOnPlayer(entity, getPayload(action));
            break;
          }
          case ActionType.ROTATE_AS_PLAYER: {
            handleRotateAsPlayer(entity, getPayload(action));
            break;
          }
          case ActionType.PLACE_ON_CAMERA: {
            handlePlaceOnCamera(entity, getPayload(action));
            break;
          }
          case ActionType.ROTATE_AS_CAMERA: {
            handleRotateAsCamera(entity, getPayload(action));
            break;
          }
          case ActionType.SET_POSITION: {
            handleSetPosition(entity, getPayload(action));
            break;
          }
          case ActionType.SET_ROTATION: {
            handleSetRotation(entity, getPayload(action));
            break;
          }
          case ActionType.SET_SCALE: {
            handleSetScale(entity, getPayload(action));
            break;
          }
          case ActionType.RANDOM: {
            handleRandom(entity, getPayload(action));
            break;
          }
          case ActionType.BATCH: {
            handleBatch(entity, getPayload(action));
            break;
          }
          case ActionType.HEAL_PLAYER: {
            handleHealPlayer(entity, getPayload(action));
            break;
          }
          default:
            break;
        }
      });
    }
    initedEntities2.add(entity);
  }
  function initPlayAnimation(entity) {
    if (!Animator3.has(entity)) {
      Animator3.create(entity, {
        states: []
      });
      Animator3.stopAllAnimations(entity);
    }
  }
  function handlePlayAnimation(entity, payload) {
    const { animation, loop } = payload;
    const animator = Animator3.getMutable(entity);
    if (!animator.states.some(($) => $.clip === animation)) {
      animator.states = [
        ...animator.states,
        {
          clip: animation
        }
      ];
    }
    Animator3.stopAllAnimations(entity);
    const clip = Animator3.getClip(entity, animation);
    clip.playing = true;
    clip.loop = loop ?? false;
  }
  function handleStopAnimation(entity, _payload) {
    if (Animator3.has(entity)) {
      Animator3.stopAllAnimations(entity);
    }
  }
  function handleSetState(entity, payload) {
    const states = States.getMutableOrNull(entity);
    if (states) {
      const defaultValue = getDefaultValue(states);
      let nextState = payload.state;
      nextState = isValidState(states, nextState) ? nextState : defaultValue;
      const previousValue = states.currentValue ?? defaultValue ?? void 0;
      states.previousValue = previousValue;
      states.currentValue = nextState;
      const triggerEvents = getTriggerEvents(entity);
      triggerEvents.emit(TriggerType.ON_STATE_CHANGE);
    }
  }
  function handleStartTween(entity, payload) {
    if (payload) {
      const initialTween = TweenComponent.getMutableOrNull(entity);
      let tween;
      switch (payload.type) {
        case TweenType.MOVE_ITEM: {
          tween = handleMoveItem(entity, payload);
          break;
        }
        case TweenType.ROTATE_ITEM: {
          tween = handleRotateItem(entity, payload);
          break;
        }
        case TweenType.SCALE_ITEM: {
          tween = handleScaleItem(entity, payload);
          break;
        }
        default: {
          throw new Error(`Unknown tween type: ${payload.type}`);
        }
      }
      revertTween(entity, initialTween, tween);
    }
  }
  function revertTween(entity, initialTween, tween) {
    const tweenSequence = TweenSequence3.getMutableOrNull(entity);
    let _revertTween = {
      ...tween
    };
    if (!initialTween || !tweenSequence || !tweenSequence.loop)
      return;
    switch (initialTween.mode?.$case) {
      case "move": {
        _revertTween = {
          ..._revertTween,
          mode: Tween3.Mode.Move({
            start: tween.mode.move.end,
            end: initialTween.mode.move.start
          })
        };
        break;
      }
      case "rotate": {
        _revertTween = {
          ..._revertTween,
          mode: Tween3.Mode.Rotate({
            start: tween.mode.rotate.end,
            end: initialTween.mode.rotate.start
          })
        };
        break;
      }
      case "scale": {
        _revertTween = {
          ..._revertTween,
          mode: Tween3.Mode.Scale({
            start: tween.mode.scale.end,
            end: initialTween.mode.scale.start
          })
        };
        break;
      }
      default: {
        throw new Error(`Unknown tween mode: ${initialTween.mode}`);
      }
    }
    initialTween.playing = true;
    tweenSequence.sequence = [_revertTween, initialTween];
  }
  function handleMoveItem(entity, tween) {
    const transform = Transform3.get(entity);
    const { duration, interpolationType, relative } = tween;
    const end = Vector32.create(tween.end.x, tween.end.y, tween.end.z);
    const endPosition = relative ? Vector32.add(transform.position, end) : end;
    return TweenComponent.createOrReplace(entity, {
      mode: Tween3.Mode.Move({
        start: transform.position,
        end: endPosition
      }),
      duration: duration * 1e3,
      easingFunction: getEasingFunctionFromInterpolation2(interpolationType)
    });
  }
  function handleRotateItem(entity, tween) {
    const transform = Transform3.get(entity);
    const { duration, interpolationType, relative } = tween;
    const end = Quaternion2.fromEulerDegrees(tween.end.x, tween.end.y, tween.end.z);
    const endRotation = relative ? Quaternion2.multiply(transform.rotation, end) : end;
    return TweenComponent.createOrReplace(entity, {
      mode: Tween3.Mode.Rotate({
        start: transform.rotation,
        end: endRotation
      }),
      duration: duration * 1e3,
      easingFunction: getEasingFunctionFromInterpolation2(interpolationType)
    });
  }
  function handleScaleItem(entity, tween) {
    const transform = Transform3.get(entity);
    const { duration, interpolationType, relative } = tween;
    const end = Vector32.create(tween.end.x, tween.end.y, tween.end.z);
    const endScale = relative ? Vector32.add(transform.scale, end) : end;
    return TweenComponent.createOrReplace(entity, {
      mode: Tween3.Mode.Scale({
        start: transform.scale,
        end: endScale
      }),
      duration: duration * 1e3,
      easingFunction: getEasingFunctionFromInterpolation2(interpolationType)
    });
  }
  function handleSetCounter(entity, payload) {
    const counter = Counter.getMutableOrNull(entity);
    if (counter) {
      counter.value = payload.counter;
      const triggerEvents = getTriggerEvents(entity);
      triggerEvents.emit(TriggerType.ON_COUNTER_CHANGE);
    }
  }
  function handleIncrementCounter(entity, payload) {
    const counter = Counter.getMutableOrNull(entity);
    const amount = payload.amount ?? 1;
    if (counter) {
      counter.value += amount;
      const triggerEvents = getTriggerEvents(entity);
      triggerEvents.emit(TriggerType.ON_COUNTER_CHANGE);
    }
  }
  function handleDecreaseCounter(entity, payload) {
    const counter = Counter.getMutableOrNull(entity);
    const amount = payload.amount ?? 1;
    if (counter) {
      counter.value -= amount;
      const triggerEvents = getTriggerEvents(entity);
      triggerEvents.emit(TriggerType.ON_COUNTER_CHANGE);
    }
  }
  function handlePlaySound(entity, payload) {
    const { src, loop, volume } = payload;
    if (AudioSource4.has(entity)) {
      AudioSource4.playSound(entity, src);
      const audioSource = AudioSource4.getMutable(entity);
      audioSource.loop = loop;
      audioSource.volume = volume ?? 1;
    } else {
      AudioSource4.create(entity, {
        audioClipUrl: src,
        loop,
        playing: true,
        volume: volume ?? 1
      });
    }
  }
  function handleStopSound(entity, _payload) {
    const audioSource = AudioSource4.getMutableOrNull(entity);
    if (audioSource) {
      audioSource.playing = false;
    }
  }
  function handleSetVisibility(entity, payload) {
    const { visible, collider } = payload;
    VisibilityComponent2.createOrReplace(entity, { visible });
    const gltf = GltfContainer3.getMutableOrNull(entity);
    const meshCollider = MeshCollider3.getMutableOrNull(entity);
    if (collider !== void 0) {
      if (gltf) {
        gltf.invisibleMeshesCollisionMask = collider;
      } else if (meshCollider) {
        meshCollider.collisionMask = collider;
      }
    }
  }
  function handleAttachToPlayer(entity, payload) {
    const { anchorPointId } = payload;
    AvatarAttach2.createOrReplace(entity, { anchorPointId });
  }
  function handleDetachFromPlayer(entity, _payload) {
    if (AvatarAttach2.has(entity)) {
      AvatarAttach2.deleteFrom(entity);
    }
  }
  function handleTeleportPlayer(_entity, payload) {
    const { x, y } = payload;
    (0, import_UserActionModule.requestTeleport)({
      destination: `${x},${y}`
    });
  }
  function handleMovePlayer(_entity, payload) {
    const options = {
      newRelativePosition: payload.position,
      cameraTarget: payload.cameraTarget
    };
    void (0, import_RestrictedActions.movePlayerTo)(options);
  }
  function handlePlayDefaultEmote(_entity, payload) {
    const { emote } = payload;
    void (0, import_RestrictedActions.triggerEmote)({ predefinedEmote: emote });
  }
  function handlePlayCustomEmote(_entity, payload) {
    const { src, loop } = payload;
    void (0, import_RestrictedActions.triggerSceneEmote)({ src, loop });
  }
  function handleOpenLink(_entity, payload) {
    const { url } = payload;
    void (0, import_RestrictedActions.openExternalUrl)({ url });
  }
  async function getVideoSrc({ src, dclCast }) {
    if (dclCast) {
      const { streams } = await (0, import_CommsApi.getActiveVideoStreams)({});
      return streams.length > 0 ? streams[0].trackSid : "";
    }
    return src ?? "";
  }
  function handlePlayVideo(entity, payload) {
    const videoSource = VideoPlayer2.getMutableOrNull(entity);
    if (videoSource && videoSource.src) {
      videoSource.playing = true;
    } else {
      getVideoSrc(payload).then((src) => {
        if (!src)
          return;
        VideoPlayer2.createOrReplace(entity, {
          src,
          volume: payload.volume ?? 1,
          loop: payload.loop ?? false,
          playing: true
        });
        initVideoPlayerComponentMaterial(entity, { Material: Material3 }, Material3.getOrNull(entity));
      });
    }
  }
  function handleStopVideo(entity, _payload) {
    const videoSource = VideoPlayer2.getMutableOrNull(entity);
    if (videoSource) {
      videoSource.playing = false;
    }
  }
  function handlePlayAudioStream(entity, payload) {
    const { url, volume } = payload;
    AudioStream3.createOrReplace(entity, {
      url,
      playing: true,
      volume: volume ?? 1
    });
  }
  function handleStopAudioStream(entity, _payload) {
    const audioSource = AudioStream3.getMutableOrNull(entity);
    if (audioSource) {
      audioSource.playing = false;
    }
  }
  function handleShowText(entity, payload) {
    const { text, hideAfterSeconds, font, fontSize, textAlign } = payload;
    const uiTransformComponent = getUITransform(UiTransform3, entity);
    if (uiTransformComponent) {
      UiText3.createOrReplace(entity, {
        value: text,
        font,
        fontSize,
        textAlign
      });
      startTimeout(entity, ActionType.HIDE_TEXT, hideAfterSeconds, () => handleHideText(entity, {}));
    }
  }
  function handleHideText(entity, _payload) {
    const uiTextComponent = UiText3.getOrNull(entity);
    if (uiTextComponent) {
      UiText3.deleteFrom(entity);
    }
  }
  function findActionByName(entity, name) {
    const actions3 = Actions.getOrNull(entity);
    return actions3?.value.find(($) => $.name === name);
  }
  function handleStartDelay(entity, payload) {
    const { actions: actions3, timeout } = payload;
    for (const actionName of actions3) {
      const action = findActionByName(entity, actionName);
      if (action) {
        startTimeout(entity, actionName, timeout, () => {
          const actionEvents = getActionEvents(entity);
          actionEvents.emit(action.name, getPayload(action));
        });
      }
    }
  }
  function handleStopDelay(entity, payload) {
    const { action } = payload;
    stopTimeout(entity, action);
  }
  function handleStartLoop(entity, payload) {
    const { actions: actions3, interval } = payload;
    for (const actionName of actions3) {
      const action = findActionByName(entity, actionName);
      if (action) {
        startInterval(entity, actionName, interval, () => {
          const actionEvents = getActionEvents(entity);
          actionEvents.emit(action.name, getPayload(action));
        });
      }
    }
  }
  function handleStopLoop(entity, payload) {
    const { action } = payload;
    stopInterval(entity, action);
  }
  function handleCloneEntity(entity, payload) {
    const { position } = payload;
    const { cloned, entities } = clone(entity, engine2, Transform3, Triggers, sdkHelpers);
    for (const cloned2 of entities.values()) {
      initActions(cloned2);
      initTriggers(cloned2);
      const triggerEvents = getTriggerEvents(cloned2);
      triggerEvents.emit(TriggerType.ON_CLONE);
    }
    const transform = Transform3.getOrCreateMutable(cloned);
    transform.position = position;
  }
  function handleRemoveEntity(entity, _payload) {
    stopAllTimeouts(entity);
    stopAllIntervals(entity);
    const tree = getComponentEntityTree(engine2, entity, Transform3);
    for (const entityToRemove of tree) {
      engine2.removeEntity(entityToRemove);
    }
  }
  function getUiStack(align) {
    const key = `${align.alignItems},${align.justifyContent}`;
    if (!uiStacks.has(key)) {
      uiStacks.set(key, engine2.addEntity());
    }
    return uiStacks.get(key);
  }
  function handleShowImage(entity, payload) {
    const { src, text, hideAfterSeconds, fontSize, align, height, width } = payload;
    getUITransform(UiTransform3, engine2.RootEntity);
    const screenAlign = mapAlignToScreenAlign(align);
    const uiStack = getUiStack(screenAlign);
    const uiStackTransformComponent = getUITransform(UiTransform3, uiStack);
    uiStackTransformComponent.alignItems = screenAlign.alignItems;
    uiStackTransformComponent.justifyContent = screenAlign.justifyContent;
    uiStackTransformComponent.positionType = 1;
    const imageEntity = engine2.addEntity();
    const imageTransformComponent = getUITransform(UiTransform3, imageEntity, width, height, 1);
    imageTransformComponent.parent = uiStack;
    imageTransformComponent.pointerFilter = 1;
    getUIBackground(UiBackground2, imageEntity, src);
    if (text) {
      getUIText(UiText3, imageEntity, text, fontSize, width);
    }
    pointerEventsSystem.onPointerDown({
      entity: imageEntity,
      opts: {
        button: 0,
        hoverText: "Click"
      }
    }, () => {
      lastUiEntityClicked.set(entity, imageEntity);
      const triggerEvents = getTriggerEvents(entity);
      triggerEvents.emit(TriggerType.ON_CLICK_IMAGE);
    });
    if (hideAfterSeconds) {
      startTimeout(entity, ActionType.HIDE_IMAGE, hideAfterSeconds, () => handleHideImage(entity, { imageEntity }));
    }
  }
  function handleHideImage(entity, payload) {
    const { imageEntity } = payload;
    if (imageEntity) {
      engine2.removeEntity(imageEntity);
    } else {
      const clickedImage = lastUiEntityClicked.get(entity);
      if (clickedImage) {
        engine2.removeEntity(clickedImage);
        lastUiEntityClicked.delete(entity);
      }
    }
  }
  function handleDamage(entity, payload) {
    const { radius, layer, hits } = payload;
    const entityPosition = AvatarAttach2.has(entity) ? getPlayerPosition() : getWorldPosition(entity);
    const getRoot = (entity2) => {
      const parent = getEntityParent(entity2);
      return !parent ? entity2 : getRoot(parent);
    };
    for (const target of damageTargets) {
      const targetPosition = getWorldPosition(target);
      const distance = Vector32.distance(entityPosition, targetPosition);
      const entityTree = Array.from(getComponentEntityTree(engine2, entity, Transform3));
      const isPartOfEntityTree = entityTree.some(($) => $ === target);
      if (isPartOfEntityTree) {
        continue;
      }
      if (layer) {
        if (layer === ProximityLayer.PLAYER) {
          const root = getRoot(target);
          if (root !== engine2.PlayerEntity && root !== engine2.CameraEntity) {
            continue;
          }
        } else if (layer === ProximityLayer.NON_PLAYER) {
          const root = getRoot(target);
          if (root === engine2.PlayerEntity || root === engine2.CameraEntity) {
            continue;
          }
        }
      }
      if (distance <= radius) {
        const total = hits === void 0 ? 1 : Math.max(hits, 1);
        for (let i = 0; i < total; i++) {
          const triggerEvents = getTriggerEvents(target);
          triggerEvents.emit(TriggerType.ON_DAMAGE);
        }
      }
    }
  }
  function handleMovePlayerHere(entity, _payload) {
    const here = getWorldPosition(entity);
    void (0, import_RestrictedActions.movePlayerTo)({ newRelativePosition: here });
    const triggerEvents = getTriggerEvents(entity);
    triggerEvents.emit(TriggerType.ON_PLAYER_SPAWN);
  }
  function handlePlaceOnPlayer(entity, _payload) {
    const transform = Transform3.getMutableOrNull(entity);
    const player = Transform3.getOrNull(engine2.PlayerEntity);
    if (transform && player) {
      transform.position = player.position;
    }
  }
  function handleRotateAsPlayer(entity, _payload) {
    const transform = Transform3.getMutableOrNull(entity);
    const player = Transform3.getOrNull(engine2.PlayerEntity);
    if (transform && player) {
      transform.rotation = player.rotation;
    }
  }
  function handlePlaceOnCamera(entity, _payload) {
    const transform = Transform3.getMutableOrNull(entity);
    const camera = Transform3.getOrNull(engine2.CameraEntity);
    if (transform && camera) {
      transform.position = camera.position;
    }
  }
  function handleRotateAsCamera(entity, _payload) {
    const transform = Transform3.getMutableOrNull(entity);
    const camera = Transform3.getOrNull(engine2.CameraEntity);
    if (transform && camera) {
      transform.rotation = camera.rotation;
    }
  }
  function handleSetPosition(entity, payload) {
    const transform = Transform3.getMutableOrNull(entity);
    if (transform) {
      if (payload.relative) {
        transform.position = Vector32.add(transform.position, Vector32.create(payload.x, payload.y, payload.z));
      } else {
        transform.position = Vector32.create(payload.x, payload.y, payload.z);
      }
    }
  }
  function handleSetRotation(entity, payload) {
    const transform = Transform3.getMutableOrNull(entity);
    if (transform) {
      if (payload.relative) {
        transform.rotation = Quaternion2.multiply(transform.rotation, Quaternion2.fromEulerDegrees(payload.x, payload.y, payload.z));
      } else {
        transform.rotation = Quaternion2.fromEulerDegrees(payload.x, payload.y, payload.z);
      }
    }
  }
  function handleSetScale(entity, payload) {
    const transform = Transform3.getMutableOrNull(entity);
    if (transform) {
      if (payload.relative) {
        transform.scale = Vector32.add(transform.scale, Vector32.create(payload.x, payload.y, payload.z));
      } else {
        transform.scale = Vector32.create(payload.x, payload.y, payload.z);
      }
    }
  }
  function handleFollowPlayer(entity, payload) {
    const { speed, x, y, z, minDistance } = payload;
    followMap.set(entity, {
      target: engine2.PlayerEntity,
      speed,
      minDistance,
      axes: { x, y, z }
    });
  }
  function handleStopFollowingPlayer(entity, _payload) {
    followMap.delete(entity);
  }
  function handleRandom(entity, payload) {
    const { actions: actions3 } = payload;
    const actionEvents = getActionEvents(entity);
    const actionName = actions3[Math.floor(Math.random() * actions3.length)];
    const action = findActionByName(entity, actionName);
    if (action) {
      actionEvents.emit(action.name, getPayload(action));
    }
  }
  function handleBatch(entity, payload) {
    const { actions: actions3 } = payload;
    const actionEvents = getActionEvents(entity);
    for (const actionName of actions3) {
      const action = findActionByName(entity, actionName);
      if (action) {
        actionEvents.emit(action.name, getPayload(action));
      }
    }
  }
  function handleHealPlayer(entity, payload) {
    const { multiplier } = payload;
    const getRoot = (entity2) => {
      const parent = getEntityParent(entity2);
      return !parent ? entity2 : getRoot(parent);
    };
    for (const target of healTargets) {
      const root = getRoot(target);
      if (root === engine2.PlayerEntity) {
        const triggerEvents = getTriggerEvents(target);
        const total = Math.max(multiplier ?? 1, 1);
        for (let i = 0; i < total; i++) {
          triggerEvents.emit(TriggerType.ON_HEAL_PLAYER);
        }
      }
    }
  }
}

// node_modules/@dcl/asset-packs/dist/counter-bar.js
var bars = /* @__PURE__ */ new Map();
var backgrounds = /* @__PURE__ */ new Map();
var SCALE = 1;
function createCounterBarSystem(engine2, components) {
  const { Material: Material4, MeshRenderer: MeshRenderer4, Transform: Transform3, Billboard: Billboard3 } = components;
  const { Counter, CounterBar } = getComponents(engine2);
  return function counterBarSystem() {
    for (const [entity, { value }, { primaryColor, secondaryColor, maxValue }] of engine2.getEntitiesWith(Counter, CounterBar)) {
      if (!bars.has(entity)) {
        const primary = primaryColor ? Color42.fromHexString(primaryColor) : Color42.Green();
        const seconday = secondaryColor ? Color42.fromHexString(secondaryColor) : Color42.Red();
        const container = engine2.addEntity();
        Transform3.create(container, { parent: entity });
        Billboard3.create(container);
        const bar2 = engine2.addEntity();
        bars.set(entity, bar2);
        Material4.setBasicMaterial(bar2, {
          diffuseColor: primary
        });
        MeshRenderer4.setCylinder(bar2);
        Transform3.create(bar2, {
          position: { x: 0, y: 0, z: 0 },
          scale: { x: 0.1 * SCALE, y: 1 * SCALE, z: 0.1 * SCALE },
          rotation: Quaternion2.fromEulerDegrees(0, 0, 90),
          parent: container
        });
        const background2 = engine2.addEntity();
        backgrounds.set(entity, background2);
        Material4.setBasicMaterial(background2, {
          diffuseColor: seconday
        });
        MeshRenderer4.setCylinder(background2);
        Transform3.create(background2, {
          position: { x: 0, y: 0, z: 0 },
          scale: { x: 0.09 * SCALE, y: 1 * SCALE, z: 0.09 * SCALE },
          rotation: Quaternion2.fromEulerDegrees(0, 0, 90),
          parent: container
        });
        const entityTransform = Transform3.getMutableOrNull(entity);
        if (entityTransform) {
          if (entityTransform.parent === engine2.PlayerEntity) {
            entityTransform.position = { x: 0, y: 2.1, z: 0 };
            entityTransform.scale = { x: 0.5, y: 0.5, z: 0.5 };
          } else if (entityTransform.parent === engine2.CameraEntity) {
            entityTransform.position = { x: 0, y: 0.5, z: 1 };
            entityTransform.scale = { x: 0.5, y: 0.5, z: 0.5 };
          }
        }
      }
      const max = maxValue || 10;
      const counter = Counter.getMutable(entity);
      if (counter.value > max) {
        counter.value = max;
      }
      if (counter.value < 0) {
        counter.value = 0;
      }
      const currentValue = Math.max(Math.min(counter.value / max, 1), 0) / (1 / SCALE);
      const bar = bars.get(entity);
      const background = backgrounds.get(entity);
      const barTransform = Transform3.getMutable(bar);
      barTransform.position.x = (currentValue - SCALE) / 2;
      barTransform.scale.y = currentValue;
      const backgroundTransform = Transform3.getMutable(background);
      backgroundTransform.position.x = SCALE / 2 + barTransform.position.x;
      backgroundTransform.scale.y = SCALE - currentValue;
    }
  };
}

// node_modules/@dcl/asset-packs/dist/scene-entrypoint.js
var initialized = false;
function initAssetPacks(_engine, sdkHelpers) {
  if (initialized)
    return;
  initialized = true;
  const engine2 = _engine;
  try {
    const components = getExplorerComponents(engine2);
    createComponents(engine2);
    const inputSystem2 = createInputSystem(engine2);
    const pointerEventsSystem2 = createPointerEventsSystem(engine2, inputSystem2);
    const tweenSystem2 = createTweenSystem(engine2);
    initComponents(engine2);
    engine2.addSystem(createActionsSystem(engine2, sdkHelpers));
    engine2.addSystem(createTriggersSystem(engine2, components, pointerEventsSystem2, tweenSystem2));
    engine2.addSystem(createTimerSystem());
    engine2.addSystem(createInputActionSystem(inputSystem2));
    engine2.addSystem(createCounterBarSystem(engine2, components));
    engine2.addSystem(createTransformSystem(components));
  } catch (error) {
    console.error(`Error initializing Asset Packs: ${error.message}`);
  }
}

// node_modules/@dcl/sdk/index.js
var import_EngineApi2 = require("~system/EngineApi");

// node_modules/@dcl/sdk/internal/transports/rendererTransport.js
function createRendererTransport(engineApi) {
  async function sendToRenderer(message) {
    const response = await engineApi.crdtSendToRenderer({
      data: new Uint8Array(message)
    });
    if (response && response.data && response.data.length) {
      if (rendererTransport2.onmessage) {
        for (const byteArray of response.data) {
          rendererTransport2.onmessage(byteArray);
        }
      }
    }
  }
  const rendererTransport2 = {
    async send(message) {
      try {
        await sendToRenderer(message);
      } catch (error) {
        console.error(error);
        debugger;
      }
    },
    filter(message) {
      if (
        // filter out messages for non-core components
        message.componentId > MAX_STATIC_COMPONENT
      ) {
        return false;
      }
      return !!message;
    },
    type: "renderer"
  };
  return rendererTransport2;
}

// node_modules/@dcl/sdk/internal/Observable.js
var ObserverEventState = class {
  /**
   * Create a new EventState
   * @param mask - defines the mask associated with this state
   * @param skipNextObservers - defines a flag which will instruct the observable to skip following observers when set to true
   * @param target - defines the original target of the state
   * @param currentTarget - defines the current target of the state
   */
  constructor(mask, skipNextObservers = false, target, currentTarget) {
    this.initalize(mask, skipNextObservers, target, currentTarget);
  }
  /**
   * Initialize the current event state
   * @param mask - defines the mask associated with this state
   * @param skipNextObservers - defines a flag which will instruct the observable to skip following observers when set to true
   * @param target - defines the original target of the state
   * @param currentTarget - defines the current target of the state
   * @returns the current event state
   */
  initalize(mask, skipNextObservers = false, target, currentTarget) {
    this.mask = mask;
    this.skipNextObservers = skipNextObservers;
    this.target = target;
    this.currentTarget = currentTarget;
    return this;
  }
};
var Observer = class {
  /**
   * Creates a new observer
   * @param callback - defines the callback to call when the observer is notified
   * @param mask - defines the mask of the observer (used to filter notifications)
   * @param scope - defines the current scope used to restore the JS context
   */
  constructor(callback, mask, scope = null) {
    this.callback = callback;
    this.mask = mask;
    this.scope = scope;
    this.unregisterOnNextCall = false;
    this._willBeUnregistered = false;
  }
};
var Observable = class _Observable {
  /**
   * Creates a new observable
   * @param onObserverAdded - defines a callback to call when a new observer is added
   */
  constructor(onObserverAdded) {
    this._observers = new Array();
    this._onObserverAdded = null;
    this._eventState = new ObserverEventState(0);
    if (onObserverAdded) {
      this._onObserverAdded = onObserverAdded;
    }
  }
  /**
   * Create a new Observer with the specified callback
   * @param callback - the callback that will be executed for that Observer
   * @param mask - the mask used to filter observers
   * @param insertFirst - if true the callback will be inserted at the first position, hence executed before the others ones. If false (default behavior) the callback will be inserted at the last position, executed after all the others already present.
   * @param scope - optional scope for the callback to be called from
   * @param unregisterOnFirstCall - defines if the observer as to be unregistered after the next notification
   * @returns the new observer created for the callback
   */
  add(callback, mask = -1, insertFirst = false, scope = null, unregisterOnFirstCall = false) {
    if (!callback) {
      return null;
    }
    const observer = new Observer(callback, mask, scope);
    observer.unregisterOnNextCall = unregisterOnFirstCall;
    if (insertFirst) {
      this._observers.unshift(observer);
    } else {
      this._observers.push(observer);
    }
    if (this._onObserverAdded) {
      this._onObserverAdded(observer);
    }
    return observer;
  }
  /**
   * Create a new Observer with the specified callback and unregisters after the next notification
   * @param callback - the callback that will be executed for that Observer
   * @returns the new observer created for the callback
   */
  addOnce(callback) {
    return this.add(callback, void 0, void 0, void 0, true);
  }
  /**
   * Remove an Observer from the Observable object
   * @param observer - the instance of the Observer to remove
   * @returns false if it doesn't belong to this Observable
   */
  remove(observer) {
    if (!observer) {
      return false;
    }
    const index = this._observers.indexOf(observer);
    if (index !== -1) {
      this._deferUnregister(observer);
      return true;
    }
    return false;
  }
  /**
   * Remove a callback from the Observable object
   * @param callback - the callback to remove
   * @param scope - optional scope. If used only the callbacks with this scope will be removed
   * @returns false if it doesn't belong to this Observable
   */
  removeCallback(callback, scope) {
    for (let index = 0; index < this._observers.length; index++) {
      if (this._observers[index].callback === callback && (!scope || scope === this._observers[index].scope)) {
        this._deferUnregister(this._observers[index]);
        return true;
      }
    }
    return false;
  }
  /**
   * Notify all Observers by calling their respective callback with the given data
   * Will return true if all observers were executed, false if an observer set skipNextObservers to true, then prevent the subsequent ones to execute
   * @param eventData - defines the data to send to all observers
   * @param mask - defines the mask of the current notification (observers with incompatible mask (ie mask & observer.mask === 0) will not be notified)
   * @param target - defines the original target of the state
   * @param currentTarget - defines the current target of the state
   * @returns false if the complete observer chain was not processed (because one observer set the skipNextObservers to true)
   */
  notifyObservers(eventData, mask = -1, target, currentTarget) {
    if (!this._observers.length) {
      return true;
    }
    const state = this._eventState;
    state.mask = mask;
    state.target = target;
    state.currentTarget = currentTarget;
    state.skipNextObservers = false;
    state.lastReturnValue = eventData;
    for (const obs of this._observers) {
      if (obs._willBeUnregistered) {
        continue;
      }
      if (obs.mask & mask) {
        if (obs.scope) {
          state.lastReturnValue = obs.callback.apply(obs.scope, [eventData, state]);
        } else {
          state.lastReturnValue = obs.callback(eventData, state);
        }
        if (obs.unregisterOnNextCall) {
          this._deferUnregister(obs);
        }
      }
      if (state.skipNextObservers) {
        return false;
      }
    }
    return true;
  }
  /**
   * Calling this will execute each callback, expecting it to be a promise or return a value.
   * If at any point in the chain one function fails, the promise will fail and the execution will not continue.
   * This is useful when a chain of events (sometimes async events) is needed to initialize a certain object
   * and it is crucial that all callbacks will be executed.
   * The order of the callbacks is kept, callbacks are not executed parallel.
   *
   * @param eventData - The data to be sent to each callback
   * @param mask - is used to filter observers defaults to -1
   * @param target - defines the callback target (see EventState)
   * @param currentTarget - defines he current object in the bubbling phase
   * @returns will return a Promise than resolves when all callbacks executed successfully.
   */
  notifyObserversWithPromise(eventData, mask = -1, target, currentTarget) {
    let p = Promise.resolve(eventData);
    if (!this._observers.length) {
      return p;
    }
    const state = this._eventState;
    state.mask = mask;
    state.target = target;
    state.currentTarget = currentTarget;
    state.skipNextObservers = false;
    this._observers.forEach((obs) => {
      if (state.skipNextObservers) {
        return;
      }
      if (obs._willBeUnregistered) {
        return;
      }
      if (obs.mask & mask) {
        if (obs.scope) {
          p = p.then((lastReturnedValue) => {
            state.lastReturnValue = lastReturnedValue;
            return obs.callback.apply(obs.scope, [eventData, state]);
          });
        } else {
          p = p.then((lastReturnedValue) => {
            state.lastReturnValue = lastReturnedValue;
            return obs.callback(eventData, state);
          });
        }
        if (obs.unregisterOnNextCall) {
          this._deferUnregister(obs);
        }
      }
    });
    return p.then(() => {
      return eventData;
    });
  }
  /**
   * Notify a specific observer
   * @param observer - defines the observer to notify
   * @param eventData - defines the data to be sent to each callback
   * @param mask - is used to filter observers defaults to -1
   */
  notifyObserver(observer, eventData, mask = -1) {
    const state = this._eventState;
    state.mask = mask;
    state.skipNextObservers = false;
    observer.callback(eventData, state);
  }
  /**
   * Gets a boolean indicating if the observable has at least one observer
   * @returns true is the Observable has at least one Observer registered
   */
  hasObservers() {
    return this._observers.length > 0;
  }
  /**
   * Clear the list of observers
   */
  clear() {
    this._observers = new Array();
    this._onObserverAdded = null;
  }
  /**
   * Clone the current observable
   * @returns a new observable
   */
  clone() {
    const result = new _Observable();
    result._observers = this._observers.slice(0);
    return result;
  }
  /**
   * Does this observable handles observer registered with a given mask
   * @param mask - defines the mask to be tested
   * @returns whether or not one observer registered with the given mask is handeled
   */
  hasSpecificMask(mask = -1) {
    for (const obs of this._observers) {
      if (obs.mask & mask || obs.mask === mask) {
        return true;
      }
    }
    return false;
  }
  _deferUnregister(observer) {
    observer.unregisterOnNextCall = false;
    observer._willBeUnregistered = true;
    Promise.resolve().then.bind(Promise.resolve())(async () => this._remove(observer)).catch(console.error);
  }
  // This should only be called when not iterating over _observers to avoid callback skipping.
  // Removes an observer from the _observer Array.
  _remove(observer) {
    if (!observer) {
      return false;
    }
    const index = this._observers.indexOf(observer);
    if (index !== -1) {
      this._observers.splice(index, 1);
      return true;
    }
    return false;
  }
};

// node_modules/@dcl/sdk/observables.js
var import_EngineApi = require("~system/EngineApi");
function createSubscriber(eventName) {
  return () => {
    if (eventName === "comms") {
      (0, import_EngineApi.subscribe)({ eventId: eventName }).catch(console.error);
    } else {
      SDK7ComponentsObservable?.subscribe(eventName);
    }
  };
}
var onEnterSceneObservable = new Observable(createSubscriber("onEnterScene"));
var onLeaveSceneObservable = new Observable(createSubscriber("onLeaveScene"));
var onSceneReadyObservable = new Observable(createSubscriber("sceneStart"));
var onPlayerExpressionObservable = new Observable(createSubscriber("playerExpression"));
var onVideoEvent = new Observable(createSubscriber("videoEvent"));
var onProfileChanged = new Observable(createSubscriber("profileChanged"));
var onPlayerConnectedObservable = new Observable(createSubscriber("playerConnected"));
var onPlayerDisconnectedObservable = new Observable(createSubscriber("playerDisconnected"));
var onRealmChangedObservable = new Observable(createSubscriber("onRealmChanged"));
var onPlayerClickedObservable = new Observable(createSubscriber("playerClicked"));
var onCommsMessage = new Observable(createSubscriber("comms"));
async function pollEvents(sendBatch2) {
  const { events } = await sendBatch2({ actions: [] });
  for (const e of events) {
    if (e.generic) {
      const data = JSON.parse(e.generic.eventData);
      switch (e.generic.eventId) {
        case "comms": {
          onCommsMessage.notifyObservers(data);
          break;
        }
      }
    }
  }
}
var SDK7ComponentsObservable = processObservables();
function processObservables() {
  const subscriptions = /* @__PURE__ */ new Set();
  function subscribe2(eventName) {
    if (subscriptions.has(eventName))
      return;
    switch (eventName) {
      case "playerClicked": {
        subscribePlayerClick();
      }
      case "onEnterScene":
      case "playerConnected": {
        subscribeEnterScene();
      }
      case "onLeaveScene":
      case "playerDisconnected": {
        subscribeLeaveScene();
      }
      case "onRealmChanged": {
        subscribeRealmChange();
      }
      case "playerExpression": {
        subscribePlayerExpression();
      }
      case "profileChanged": {
        subscribeProfileChange();
      }
    }
    subscriptions.add(eventName);
  }
  function subscribeEnterScene() {
    players_default.onEnterScene((player) => {
      if (subscriptions.has("onEnterScene")) {
        onEnterSceneObservable.notifyObservers({ userId: player.userId });
      }
      if (subscriptions.has("playerConnected")) {
        onPlayerConnectedObservable.notifyObservers({ userId: player.userId });
      }
    });
  }
  function subscribeLeaveScene() {
    players_default.onLeaveScene((userId) => {
      if (subscriptions.has("onLeaveScene")) {
        onLeaveSceneObservable.notifyObservers({ userId });
      }
      if (subscriptions.has("playerDisconnected")) {
        onPlayerDisconnectedObservable.notifyObservers({ userId });
      }
    });
  }
  function subscribeRealmChange() {
    RealmInfo2.onChange(engine.RootEntity, (value) => {
      if (value) {
        onRealmChangedObservable.notifyObservers({
          domain: value.baseUrl,
          displayName: value.realmName,
          room: value.room ?? "",
          serverName: value.realmName
        });
      }
    });
  }
  function subscribePlayerClick() {
    const playerEntities = /* @__PURE__ */ new Set();
    engine.addSystem(() => {
      for (const [entity] of engine.getEntitiesWith(PlayerIdentityData2)) {
        if (playerEntities.has(entity))
          return;
        playerEntities.add(entity);
        PointerEventsResult2.onChange(entity, (data) => {
          if (data?.hit) {
            onPlayerClickedObservable.notifyObservers({
              userId: PlayerIdentityData2.getOrNull(entity)?.address ?? "",
              ray: {
                direction: data.hit.direction,
                distance: data.hit.length,
                origin: data.hit.globalOrigin
              }
            });
          }
        });
      }
    });
  }
  function subscribePlayerExpression() {
    AvatarEmoteCommand2.onChange(engine.PlayerEntity, (value) => {
      onPlayerExpressionObservable.notifyObservers({ expressionId: value?.emoteUrn ?? "" });
    });
  }
  function subscribeProfileChange() {
    AvatarBase2.onChange(engine.PlayerEntity, () => {
      if (!profileAddress)
        return;
      onProfileChanged.notifyObservers({ ethAddress: profileAddress, version: 0 });
    });
    AvatarEquippedData2.onChange(engine.PlayerEntity, () => {
      if (!profileAddress)
        return;
      onProfileChanged.notifyObservers({ ethAddress: profileAddress, version: 0 });
    });
  }
  let sceneReady = false;
  let profileAddress;
  function observableSystem() {
    if (sceneReady && profileAddress) {
      return engine.removeSystem(observableSystem);
    }
    if (!sceneReady) {
      sceneReady = true;
      onSceneReadyObservable.notifyObservers({});
    }
    if (profileAddress)
      return;
    profileAddress = PlayerIdentityData2.getOrNull(engine.PlayerEntity)?.address;
  }
  engine.addSystem(observableSystem);
  return { subscribe: subscribe2 };
}

// sdk-composite:all-composites
var compositeFromLoader = { "assets/scene/main.composite": { "version": 1, "components": [{ "name": "composite::root", "jsonSchema": { "type": "object", "properties": { "src": { "type": "string", "serializationType": "utf8-string" }, "entities": { "type": "array", "items": { "type": "object", "properties": { "src": { "type": "integer", "serializationType": "entity" }, "dest": { "type": "integer", "serializationType": "entity" } }, "serializationType": "map" }, "serializationType": "array" } }, "serializationType": "map" }, "data": {} }, { "name": "inspector::Selection", "jsonSchema": { "type": "object", "properties": { "gizmo": { "type": "integer", "serializationType": "int32" } }, "serializationType": "map" }, "data": { "0": { "json": { "gizmo": 3 } } } }, { "name": "inspector::SceneMetadata", "jsonSchema": { "type": "object", "properties": { "name": { "type": "string", "serializationType": "optional", "optionalJsonSchema": { "type": "string", "serializationType": "utf8-string" } }, "description": { "type": "string", "serializationType": "optional", "optionalJsonSchema": { "type": "string", "serializationType": "utf8-string" } }, "thumbnail": { "type": "string", "serializationType": "optional", "optionalJsonSchema": { "type": "string", "serializationType": "utf8-string" } }, "ageRating": { "type": "string", "serializationType": "optional", "optionalJsonSchema": { "type": "string", "enum": ["T", "A"], "default": "T", "serializationType": "enum-string", "enumObject": { "Teen": "T", "Adult": "A" } } }, "categories": { "type": "array", "serializationType": "optional", "optionalJsonSchema": { "type": "array", "items": { "type": "string", "enum": ["art", "game", "casino", "social", "music", "fashion", "crypto", "education", "shop", "business", "sports"], "default": "game", "serializationType": "enum-string", "enumObject": { "ART": "art", "GAME": "game", "CASINO": "casino", "SOCIAL": "social", "MUSIC": "music", "FASHION": "fashion", "CRYPTO": "crypto", "EDUCATION": "education", "SHOP": "shop", "BUSINESS": "business", "SPORTS": "sports" } }, "serializationType": "array" } }, "author": { "type": "string", "serializationType": "optional", "optionalJsonSchema": { "type": "string", "serializationType": "utf8-string" } }, "email": { "type": "string", "serializationType": "optional", "optionalJsonSchema": { "type": "string", "serializationType": "utf8-string" } }, "tags": { "type": "array", "serializationType": "optional", "optionalJsonSchema": { "type": "array", "items": { "type": "string", "serializationType": "utf8-string" }, "serializationType": "array" } }, "layout": { "type": "object", "properties": { "base": { "type": "object", "properties": { "x": { "type": "integer", "serializationType": "int32" }, "y": { "type": "integer", "serializationType": "int32" } }, "serializationType": "map" }, "parcels": { "type": "array", "items": { "type": "object", "properties": { "x": { "type": "integer", "serializationType": "int32" }, "y": { "type": "integer", "serializationType": "int32" } }, "serializationType": "map" }, "serializationType": "array" } }, "serializationType": "map" }, "silenceVoiceChat": { "type": "boolean", "serializationType": "optional", "optionalJsonSchema": { "type": "boolean", "serializationType": "boolean" } }, "disablePortableExperiences": { "type": "boolean", "serializationType": "optional", "optionalJsonSchema": { "type": "boolean", "serializationType": "boolean" } }, "spawnPoints": { "type": "array", "serializationType": "optional", "optionalJsonSchema": { "type": "array", "items": { "type": "object", "properties": { "name": { "type": "string", "serializationType": "utf8-string" }, "default": { "type": "boolean", "serializationType": "optional", "optionalJsonSchema": { "type": "boolean", "serializationType": "boolean" } }, "position": { "type": "object", "properties": { "x": { "type": "object", "properties": { "single": { "type": "integer", "serializationType": "int32" }, "range": { "type": "array", "items": { "type": "integer", "serializationType": "int32" }, "serializationType": "array" } }, "serializationType": "one-of" }, "y": { "type": "object", "properties": { "single": { "type": "integer", "serializationType": "int32" }, "range": { "type": "array", "items": { "type": "integer", "serializationType": "int32" }, "serializationType": "array" } }, "serializationType": "one-of" }, "z": { "type": "object", "properties": { "single": { "type": "integer", "serializationType": "int32" }, "range": { "type": "array", "items": { "type": "integer", "serializationType": "int32" }, "serializationType": "array" } }, "serializationType": "one-of" } }, "serializationType": "map" }, "cameraTarget": { "type": "object", "serializationType": "optional", "optionalJsonSchema": { "type": "object", "properties": { "x": { "type": "integer", "serializationType": "int32" }, "y": { "type": "integer", "serializationType": "int32" }, "z": { "type": "integer", "serializationType": "int32" } }, "serializationType": "map" } } }, "serializationType": "map" }, "serializationType": "array" } } }, "serializationType": "map" }, "data": { "0": { "json": { "name": "New Scene 3", "description": "Empty Scene Template", "categories": [], "author": "SDK", "tags": [], "layout": { "base": { "x": 0, "y": 0 }, "parcels": [{ "x": 0, "y": 0 }] }, "spawnPoints": [{ "name": "spawn1", "default": true, "position": { "x": { "$case": "range", "value": [0, 3] }, "y": { "$case": "range", "value": [0, 0] }, "z": { "$case": "range", "value": [0, 3] } }, "cameraTarget": { "x": 8, "y": 1, "z": 8 } }] } } } }, { "name": "inspector::Nodes", "jsonSchema": { "type": "object", "properties": { "value": { "type": "array", "items": { "type": "object", "properties": { "entity": { "type": "integer", "serializationType": "entity" }, "open": { "type": "boolean", "serializationType": "optional", "optionalJsonSchema": { "type": "boolean", "serializationType": "boolean" } }, "children": { "type": "array", "items": { "type": "integer", "serializationType": "entity" }, "serializationType": "array" } }, "serializationType": "map" }, "serializationType": "array" } }, "serializationType": "map" }, "data": { "0": { "json": { "value": [{ "entity": 512, "children": [], "open": true }, { "entity": 513, "children": [] }, { "entity": 514, "children": [] }] } } } }, { "name": "asset-packs::ActionTypes", "jsonSchema": { "type": "object", "properties": { "value": { "type": "array", "items": { "type": "object", "properties": { "type": { "type": "string", "serializationType": "utf8-string" }, "jsonSchema": { "type": "string", "serializationType": "utf8-string" } }, "serializationType": "map" }, "serializationType": "array" } }, "serializationType": "map" }, "data": { "0": { "json": { "value": [{ "type": "play_animation", "jsonSchema": '{"type":"object","properties":{"animation":{"type":"string","serializationType":"utf8-string"},"loop":{"type":"boolean","serializationType":"optional","optionalJsonSchema":{"type":"boolean","serializationType":"boolean"}}},"serializationType":"map"}' }, { "type": "stop_animation", "jsonSchema": '{"type":"object","properties":{},"serializationType":"map"}' }, { "type": "set_state", "jsonSchema": '{"type":"object","properties":{"state":{"type":"string","serializationType":"utf8-string"}},"serializationType":"map"}' }, { "type": "start_tween", "jsonSchema": '{"type":"object","properties":{"type":{"type":"string","enum":["move_item","rotate_item","scale_item"],"default":"move_item","serializationType":"enum-string","enumObject":{"MOVE_ITEM":"move_item","ROTATE_ITEM":"rotate_item","SCALE_ITEM":"scale_item"}},"end":{"type":"object","properties":{"x":{"type":"number"},"y":{"type":"number"},"z":{"type":"number"},"w":{"type":"number"}},"serializationType":"vector3"},"interpolationType":{"type":"string","enum":["linear","easeinquad","easeoutquad","easequad","easeinsine","easeoutsine","easeinoutsine","easeinexpo","easeoutexpo","easeinoutexpo","easeinelastic","easeoutelastic","easeinoutelastic","easeinbounce","easeoutbounce","easeinoutbounce"],"default":"linear","serializationType":"enum-string","enumObject":{"LINEAR":"linear","EASEINQUAD":"easeinquad","EASEOUTQUAD":"easeoutquad","EASEQUAD":"easequad","EASEINSINE":"easeinsine","EASEOUTSINE":"easeoutsine","EASESINE":"easeinoutsine","EASEINEXPO":"easeinexpo","EASEOUTEXPO":"easeoutexpo","EASEEXPO":"easeinoutexpo","EASEINELASTIC":"easeinelastic","EASEOUTELASTIC":"easeoutelastic","EASEELASTIC":"easeinoutelastic","EASEINBOUNCE":"easeinbounce","EASEOUTEBOUNCE":"easeoutbounce","EASEBOUNCE":"easeinoutbounce"}},"duration":{"type":"number","serializationType":"float32"},"relative":{"type":"boolean","serializationType":"boolean"}},"serializationType":"map"}' }, { "type": "set_counter", "jsonSchema": '{"type":"object","properties":{"counter":{"type":"integer","serializationType":"int32"}},"serializationType":"map"}' }, { "type": "increment_counter", "jsonSchema": '{"type":"object","properties":{"amount":{"type":"integer","serializationType":"optional","optionalJsonSchema":{"type":"integer","serializationType":"int32"}}},"serializationType":"map"}' }, { "type": "decrease_counter", "jsonSchema": '{"type":"object","properties":{"amount":{"type":"integer","serializationType":"optional","optionalJsonSchema":{"type":"integer","serializationType":"int32"}}},"serializationType":"map"}' }, { "type": "play_sound", "jsonSchema": '{"type":"object","properties":{"src":{"type":"string","serializationType":"utf8-string"},"loop":{"type":"boolean","serializationType":"optional","optionalJsonSchema":{"type":"boolean","serializationType":"boolean"}},"volume":{"type":"number","serializationType":"optional","optionalJsonSchema":{"type":"number","serializationType":"float32"}}},"serializationType":"map"}' }, { "type": "stop_sound", "jsonSchema": '{"type":"object","properties":{},"serializationType":"map"}' }, { "type": "set_visibility", "jsonSchema": '{"type":"object","properties":{"visible":{"type":"boolean","serializationType":"boolean"},"physicsCollider":{"type":"boolean","serializationType":"optional","optionalJsonSchema":{"type":"boolean","serializationType":"boolean"}},"collider":{"type":"integer","serializationType":"optional","optionalJsonSchema":{"type":"integer","enum":[0,1,2,4,8,16,32,64,128,256,512,1024,2048,4096,8192,16384,32768],"default":1,"serializationType":"enum-int","enumObject":{"0":"CL_NONE","1":"CL_POINTER","2":"CL_PHYSICS","4":"CL_RESERVED1","8":"CL_RESERVED2","16":"CL_RESERVED3","32":"CL_RESERVED4","64":"CL_RESERVED5","128":"CL_RESERVED6","256":"CL_CUSTOM1","512":"CL_CUSTOM2","1024":"CL_CUSTOM3","2048":"CL_CUSTOM4","4096":"CL_CUSTOM5","8192":"CL_CUSTOM6","16384":"CL_CUSTOM7","32768":"CL_CUSTOM8","CL_NONE":0,"CL_POINTER":1,"CL_PHYSICS":2,"CL_RESERVED1":4,"CL_RESERVED2":8,"CL_RESERVED3":16,"CL_RESERVED4":32,"CL_RESERVED5":64,"CL_RESERVED6":128,"CL_CUSTOM1":256,"CL_CUSTOM2":512,"CL_CUSTOM3":1024,"CL_CUSTOM4":2048,"CL_CUSTOM5":4096,"CL_CUSTOM6":8192,"CL_CUSTOM7":16384,"CL_CUSTOM8":32768}}}},"serializationType":"map"}' }, { "type": "attach_to_player", "jsonSchema": '{"type":"object","properties":{"anchorPointId":{"type":"integer","serializationType":"int32"}},"serializationType":"map"}' }, { "type": "detach_from_player", "jsonSchema": '{"type":"object","properties":{},"serializationType":"map"}' }, { "type": "play_video_stream", "jsonSchema": '{"type":"object","properties":{"src":{"type":"string","serializationType":"optional","optionalJsonSchema":{"type":"string","serializationType":"utf8-string"}},"loop":{"type":"boolean","serializationType":"optional","optionalJsonSchema":{"type":"boolean","serializationType":"boolean"}},"volume":{"type":"number","serializationType":"optional","optionalJsonSchema":{"type":"number","serializationType":"float32"}},"dclCast":{"type":"boolean","serializationType":"optional","optionalJsonSchema":{"type":"boolean","serializationType":"boolean"}}},"serializationType":"map"}' }, { "type": "stop_video_stream", "jsonSchema": '{"type":"object","properties":{},"serializationType":"map"}' }, { "type": "play_audio_stream", "jsonSchema": '{"type":"object","properties":{"url":{"type":"string","serializationType":"utf8-string"},"volume":{"type":"number","serializationType":"optional","optionalJsonSchema":{"type":"number","serializationType":"float32"}}},"serializationType":"map"}' }, { "type": "stop_audio_stream", "jsonSchema": '{"type":"object","properties":{},"serializationType":"map"}' }, { "type": "teleport_player", "jsonSchema": '{"type":"object","properties":{"x":{"type":"integer","serializationType":"int32"},"y":{"type":"integer","serializationType":"int32"}},"serializationType":"map"}' }, { "type": "move_player", "jsonSchema": '{"type":"object","properties":{"position":{"type":"object","properties":{"x":{"type":"number"},"y":{"type":"number"},"z":{"type":"number"},"w":{"type":"number"}},"serializationType":"vector3"},"cameraTarget":{"type":"object","serializationType":"optional","optionalJsonSchema":{"type":"object","properties":{"x":{"type":"number"},"y":{"type":"number"},"z":{"type":"number"},"w":{"type":"number"}},"serializationType":"vector3"}}},"serializationType":"map"}' }, { "type": "play_default_emote", "jsonSchema": '{"type":"object","properties":{"emote":{"type":"string","serializationType":"utf8-string"}},"serializationType":"map"}' }, { "type": "play_custom_emote", "jsonSchema": '{"type":"object","properties":{"src":{"type":"string","serializationType":"utf8-string"},"loop":{"type":"boolean","serializationType":"optional","optionalJsonSchema":{"type":"boolean","serializationType":"boolean"}}},"serializationType":"map"}' }, { "type": "open_link", "jsonSchema": '{"type":"object","properties":{"url":{"type":"string","serializationType":"utf8-string"}},"serializationType":"map"}' }, { "type": "show_text", "jsonSchema": '{"type":"object","properties":{"text":{"type":"string","serializationType":"utf8-string"},"hideAfterSeconds":{"type":"number","serializationType":"float32"},"font":{"type":"integer","enum":[0,1,2],"default":0,"serializationType":"enum-int","enumObject":{"0":"F_SANS_SERIF","1":"F_SERIF","2":"F_MONOSPACE","F_SANS_SERIF":0,"F_SERIF":1,"F_MONOSPACE":2}},"fontSize":{"type":"number","serializationType":"optional","optionalJsonSchema":{"type":"number","serializationType":"float32"}},"textAlign":{"type":"integer","enum":[0,1,2,3,4,5,6,7,8],"default":4,"serializationType":"enum-int","enumObject":{"0":"TAM_TOP_LEFT","1":"TAM_TOP_CENTER","2":"TAM_TOP_RIGHT","3":"TAM_MIDDLE_LEFT","4":"TAM_MIDDLE_CENTER","5":"TAM_MIDDLE_RIGHT","6":"TAM_BOTTOM_LEFT","7":"TAM_BOTTOM_CENTER","8":"TAM_BOTTOM_RIGHT","TAM_TOP_LEFT":0,"TAM_TOP_CENTER":1,"TAM_TOP_RIGHT":2,"TAM_MIDDLE_LEFT":3,"TAM_MIDDLE_CENTER":4,"TAM_MIDDLE_RIGHT":5,"TAM_BOTTOM_LEFT":6,"TAM_BOTTOM_CENTER":7,"TAM_BOTTOM_RIGHT":8}}},"serializationType":"map"}' }, { "type": "hide_text", "jsonSchema": '{"type":"object","properties":{},"serializationType":"map"}' }, { "type": "start_delay", "jsonSchema": '{"type":"object","properties":{"actions":{"type":"array","items":{"type":"string","serializationType":"utf8-string"},"serializationType":"array"},"timeout":{"type":"number","serializationType":"float32"}},"serializationType":"map"}' }, { "type": "stop_delay", "jsonSchema": '{"type":"object","properties":{"action":{"type":"string","serializationType":"utf8-string"}},"serializationType":"map"}' }, { "type": "start_loop", "jsonSchema": '{"type":"object","properties":{"actions":{"type":"array","items":{"type":"string","serializationType":"utf8-string"},"serializationType":"array"},"interval":{"type":"number","serializationType":"float32"}},"serializationType":"map"}' }, { "type": "stop_loop", "jsonSchema": '{"type":"object","properties":{"action":{"type":"string","serializationType":"utf8-string"}},"serializationType":"map"}' }, { "type": "clone_entity", "jsonSchema": '{"type":"object","properties":{"position":{"type":"object","properties":{"x":{"type":"number"},"y":{"type":"number"},"z":{"type":"number"},"w":{"type":"number"}},"serializationType":"vector3"}},"serializationType":"map"}' }, { "type": "remove_entity", "jsonSchema": '{"type":"object","properties":{},"serializationType":"map"}' }, { "type": "show_image", "jsonSchema": '{"type":"object","properties":{"src":{"type":"string","serializationType":"utf8-string"},"align":{"type":"integer","enum":[0,1,2,3,4,5,6,7,8],"default":4,"serializationType":"enum-int","enumObject":{"0":"TAM_TOP_LEFT","1":"TAM_TOP_CENTER","2":"TAM_TOP_RIGHT","3":"TAM_MIDDLE_LEFT","4":"TAM_MIDDLE_CENTER","5":"TAM_MIDDLE_RIGHT","6":"TAM_BOTTOM_LEFT","7":"TAM_BOTTOM_CENTER","8":"TAM_BOTTOM_RIGHT","TAM_TOP_LEFT":0,"TAM_TOP_CENTER":1,"TAM_TOP_RIGHT":2,"TAM_MIDDLE_LEFT":3,"TAM_MIDDLE_CENTER":4,"TAM_MIDDLE_RIGHT":5,"TAM_BOTTOM_LEFT":6,"TAM_BOTTOM_CENTER":7,"TAM_BOTTOM_RIGHT":8}},"height":{"type":"number","serializationType":"float32"},"width":{"type":"number","serializationType":"float32"},"hideAfterSeconds":{"type":"number","serializationType":"optional","optionalJsonSchema":{"type":"number","serializationType":"float32"}},"text":{"type":"string","serializationType":"optional","optionalJsonSchema":{"type":"string","serializationType":"utf8-string"}},"fontSize":{"type":"number","serializationType":"optional","optionalJsonSchema":{"type":"number","serializationType":"float32"}}},"serializationType":"map"}' }, { "type": "hide_image", "jsonSchema": '{"type":"object","properties":{"imageEntity":{"type":"integer","serializationType":"optional","optionalJsonSchema":{"type":"integer","serializationType":"int32"}}},"serializationType":"map"}' }, { "type": "damage", "jsonSchema": '{"type":"object","properties":{"radius":{"type":"number","serializationType":"float32"},"layer":{"type":"string","serializationType":"optional","optionalJsonSchema":{"type":"string","enum":["all","player","non_player"],"default":"all","serializationType":"enum-string","enumObject":{"ALL":"all","PLAYER":"player","NON_PLAYER":"non_player"}}},"hits":{"type":"integer","serializationType":"optional","optionalJsonSchema":{"type":"integer","serializationType":"int32"}}},"serializationType":"map"}' }, { "type": "move_player_here", "jsonSchema": '{"type":"object","properties":{},"serializationType":"map"}' }, { "type": "place_on_player", "jsonSchema": '{"type":"object","properties":{},"serializationType":"map"}' }, { "type": "rotate_as_player", "jsonSchema": '{"type":"object","properties":{},"serializationType":"map"}' }, { "type": "place_on_camera", "jsonSchema": '{"type":"object","properties":{},"serializationType":"map"}' }, { "type": "rotate_as_camera", "jsonSchema": '{"type":"object","properties":{},"serializationType":"map"}' }, { "type": "set_position", "jsonSchema": '{"type":"object","properties":{"x":{"type":"number","serializationType":"float32"},"y":{"type":"number","serializationType":"float32"},"z":{"type":"number","serializationType":"float32"},"relative":{"type":"boolean","serializationType":"optional","optionalJsonSchema":{"type":"boolean","serializationType":"boolean"}}},"serializationType":"map"}' }, { "type": "set_rotation", "jsonSchema": '{"type":"object","properties":{"x":{"type":"number","serializationType":"float32"},"y":{"type":"number","serializationType":"float32"},"z":{"type":"number","serializationType":"float32"},"relative":{"type":"boolean","serializationType":"optional","optionalJsonSchema":{"type":"boolean","serializationType":"boolean"}}},"serializationType":"map"}' }, { "type": "set_scale", "jsonSchema": '{"type":"object","properties":{"x":{"type":"number","serializationType":"float32"},"y":{"type":"number","serializationType":"float32"},"z":{"type":"number","serializationType":"float32"},"relative":{"type":"boolean","serializationType":"optional","optionalJsonSchema":{"type":"boolean","serializationType":"boolean"}}},"serializationType":"map"}' }, { "type": "follow_player", "jsonSchema": '{"type":"object","properties":{"speed":{"type":"number","serializationType":"float32"},"x":{"type":"boolean","serializationType":"boolean"},"y":{"type":"boolean","serializationType":"boolean"},"z":{"type":"boolean","serializationType":"boolean"},"minDistance":{"type":"number","serializationType":"float32"}},"serializationType":"map"}' }, { "type": "stop_following_player", "jsonSchema": '{"type":"object","properties":{},"serializationType":"map"}' }, { "type": "random", "jsonSchema": '{"type":"object","properties":{"actions":{"type":"array","items":{"type":"string","serializationType":"utf8-string"},"serializationType":"array"}},"serializationType":"map"}' }, { "type": "batch", "jsonSchema": '{"type":"object","properties":{"actions":{"type":"array","items":{"type":"string","serializationType":"utf8-string"},"serializationType":"array"}},"serializationType":"map"}' }, { "type": "heal_player", "jsonSchema": '{"type":"object","properties":{"multiplier":{"type":"integer","serializationType":"int32"}},"serializationType":"map"}' }] } } } }, { "name": "asset-packs::Counter", "jsonSchema": { "type": "object", "properties": { "id": { "type": "number", "serializationType": "float32" }, "value": { "type": "integer", "serializationType": "int32" } }, "serializationType": "map" }, "data": { "0": { "json": { "id": 0, "value": 0 } } } }] } };

// node_modules/@dcl/sdk/composite-provider.js
var composites = [];
var compositeProvider = {
  getCompositeOrNull(src, _currentPath) {
    const fromLoader = compositeFromLoader[src];
    if (fromLoader) {
      try {
        if (fromLoader instanceof Uint8Array) {
          const composite = Composite.fromBinary(fromLoader);
          composites.push({ src, composite });
        } else if (typeof fromLoader === "string") {
          const composite = Composite.fromJson(JSON.parse(fromLoader));
          composites.push({ src, composite });
        } else if (typeof fromLoader === "object") {
          const composite = Composite.fromJson(fromLoader);
          composites.push({ src, composite });
        }
      } catch (err) {
        console.error(err);
      }
      delete compositeFromLoader[src];
    }
    return composites.find((item) => item.src === src) || null;
  }
};

// node_modules/@dcl/sdk/index.js
var rendererTransport = createRendererTransport({ crdtSendToRenderer: import_EngineApi2.crdtSendToRenderer });
engine.addTransport(rendererTransport);
async function onUpdate(deltaTime) {
  engine.seal();
  await engine.update(deltaTime);
  await pollEvents(import_EngineApi2.sendBatch);
}
async function onStart() {
  const response = await (0, import_EngineApi2.crdtGetState)({ data: new Uint8Array() });
  if (!response.hasEntities) {
    const mainComposite = compositeProvider.getCompositeOrNull("main.composite");
    if (mainComposite) {
      try {
        Composite.instance(engine, mainComposite, compositeProvider);
      } catch (err) {
        console.log(`Warning: main.composite couldn't be instanced.`);
        console.error(err);
      }
    }
  }
  if (!!rendererTransport.onmessage) {
    if (response && response.data && response.data.length) {
      for (const byteArray of response.data) {
        rendererTransport.onmessage(byteArray);
      }
    }
  }
}

// src/index.ts.entry-point.ts
initAssetPacks(engine, { syncEntity });
if (main !== void 0) {
  let _INTERNAL_startup_system = function() {
    try {
      const maybePromise = main();
      if (maybePromise && typeof maybePromise === "object" && typeof maybePromise.then === "function") {
        maybePromise.catch(console.error);
      }
    } catch (e) {
      console.error(e);
    } finally {
      engine.removeSystem(_INTERNAL_startup_system);
    }
  };
  engine.addSystem(_INTERNAL_startup_system, Infinity);
}
/*! Bundled license information:

long/index.js:
  (**
   * @license
   * Copyright 2009 The Closure Library Authors
   * Copyright 2020 Daniel Wirtz / The long.js Authors.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *
   * SPDX-License-Identifier: Apache-2.0
   *)
*/