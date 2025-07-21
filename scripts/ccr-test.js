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

// node_modules/roarr/dist/constants.js
var require_constants = __commonJS({
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
    var _constants = require_constants();
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
    var _constants = require_constants();
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
var require_constants2 = __commonJS({
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
    } = require_constants2();
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
    var { MAX_LENGTH, MAX_SAFE_INTEGER } = require_constants2();
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
    var { FLAG_INCLUDE_PRERELEASE, FLAG_LOOSE } = require_constants2();
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
    var constants = require_constants2();
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
var require_dist = __commonJS({
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
    require_dist().bootstrap();
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
  console.log(`[DEBUG] Proxy method: ${import_process.default.env.GLOBAL_AGENT_HTTP_PROXY ? "global-agent" : "direct"}`);
  console.log(`[DEBUG] Proxy URL: ${import_process.default.env.GLOBAL_AGENT_HTTP_PROXY || "NONE"}`);
  const start = Date.now();
  try {
    const fetchOptions = { method, headers };
    if (body) fetchOptions.body = body;
    console.log(`[DEBUG] Final fetch options: ${JSON.stringify(fetchOptions, null, 2)}`);
    console.log(`[DEBUG] Making fetch request with global-agent proxy support...`);
    const res = await fetch(url, fetchOptions);
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
      console.error(`[ERROR] socks5 proxy not supported in test script!`);
      console.error(`[ERROR] Please use HTTP proxy instead of: ${import_process.default.env.PROXY_URL}`);
      console.error(`[ERROR] Example: http://proxy.example.com:8080`);
      console.error(`[ERROR] Or remove PROXY_URL to test without proxy`);
      import_process.default.exit(1);
    } else {
      console.log(`[DEBUG] Using HTTP proxy with global-agent...`);
      try {
        import_process.default.env.GLOBAL_AGENT_HTTP_PROXY = import_process.default.env.PROXY_URL;
        import_process.default.env.GLOBAL_AGENT_HTTPS_PROXY = import_process.default.env.PROXY_URL;
        require_bootstrap2();
        console.log(`[INFO] global-agent enabled, proxy: ${import_process.default.env.PROXY_URL}`);
        console.log(`[DEBUG] HTTP proxy setup completed`);
      } catch (globalAgentError) {
        console.error(`[ERROR] Failed to setup global-agent: ${globalAgentError.message}`);
        import_process.default.exit(1);
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
main().catch((e) => {
  console.error("Fatal error:", e);
  import_process.default.exit(1);
});
