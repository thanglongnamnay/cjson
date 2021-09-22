var __require = typeof require !== "undefined" ? require : (x) => {
  throw new Error('Dynamic require of "' + x + '" is not supported');
};
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// node_modules/fast-glob/out/utils/array.js
var require_array = __commonJS({
  "node_modules/fast-glob/out/utils/array.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.splitWhen = exports2.flatten = void 0;
    function flatten(items) {
      return items.reduce((collection, item) => [].concat(collection, item), []);
    }
    exports2.flatten = flatten;
    function splitWhen(items, predicate) {
      const result = [[]];
      let groupIndex = 0;
      for (const item of items) {
        if (predicate(item)) {
          groupIndex++;
          result[groupIndex] = [];
        } else {
          result[groupIndex].push(item);
        }
      }
      return result;
    }
    exports2.splitWhen = splitWhen;
  }
});

// node_modules/fast-glob/out/utils/errno.js
var require_errno = __commonJS({
  "node_modules/fast-glob/out/utils/errno.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.isEnoentCodeError = void 0;
    function isEnoentCodeError(error) {
      return error.code === "ENOENT";
    }
    exports2.isEnoentCodeError = isEnoentCodeError;
  }
});

// node_modules/fast-glob/out/utils/fs.js
var require_fs = __commonJS({
  "node_modules/fast-glob/out/utils/fs.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.createDirentFromStats = void 0;
    var DirentFromStats = class {
      constructor(name, stats) {
        this.name = name;
        this.isBlockDevice = stats.isBlockDevice.bind(stats);
        this.isCharacterDevice = stats.isCharacterDevice.bind(stats);
        this.isDirectory = stats.isDirectory.bind(stats);
        this.isFIFO = stats.isFIFO.bind(stats);
        this.isFile = stats.isFile.bind(stats);
        this.isSocket = stats.isSocket.bind(stats);
        this.isSymbolicLink = stats.isSymbolicLink.bind(stats);
      }
    };
    function createDirentFromStats(name, stats) {
      return new DirentFromStats(name, stats);
    }
    exports2.createDirentFromStats = createDirentFromStats;
  }
});

// node_modules/fast-glob/out/utils/path.js
var require_path = __commonJS({
  "node_modules/fast-glob/out/utils/path.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.removeLeadingDotSegment = exports2.escape = exports2.makeAbsolute = exports2.unixify = void 0;
    var path2 = require("path");
    var LEADING_DOT_SEGMENT_CHARACTERS_COUNT = 2;
    var UNESCAPED_GLOB_SYMBOLS_RE = /(\\?)([()*?[\]{|}]|^!|[!+@](?=\())/g;
    function unixify(filepath) {
      return filepath.replace(/\\/g, "/");
    }
    exports2.unixify = unixify;
    function makeAbsolute(cwd, filepath) {
      return path2.resolve(cwd, filepath);
    }
    exports2.makeAbsolute = makeAbsolute;
    function escape(pattern) {
      return pattern.replace(UNESCAPED_GLOB_SYMBOLS_RE, "\\$2");
    }
    exports2.escape = escape;
    function removeLeadingDotSegment(entry) {
      if (entry.charAt(0) === ".") {
        const secondCharactery = entry.charAt(1);
        if (secondCharactery === "/" || secondCharactery === "\\") {
          return entry.slice(LEADING_DOT_SEGMENT_CHARACTERS_COUNT);
        }
      }
      return entry;
    }
    exports2.removeLeadingDotSegment = removeLeadingDotSegment;
  }
});

// node_modules/is-extglob/index.js
var require_is_extglob = __commonJS({
  "node_modules/is-extglob/index.js"(exports2, module2) {
    module2.exports = function isExtglob(str) {
      if (typeof str !== "string" || str === "") {
        return false;
      }
      var match;
      while (match = /(\\).|([@?!+*]\(.*\))/g.exec(str)) {
        if (match[2])
          return true;
        str = str.slice(match.index + match[0].length);
      }
      return false;
    };
  }
});

// node_modules/is-glob/index.js
var require_is_glob = __commonJS({
  "node_modules/is-glob/index.js"(exports2, module2) {
    var isExtglob = require_is_extglob();
    var chars = { "{": "}", "(": ")", "[": "]" };
    var strictRegex = /\\(.)|(^!|\*|[\].+)]\?|\[[^\\\]]+\]|\{[^\\}]+\}|\(\?[:!=][^\\)]+\)|\([^|]+\|[^\\)]+\))/;
    var relaxedRegex = /\\(.)|(^!|[*?{}()[\]]|\(\?)/;
    module2.exports = function isGlob(str, options) {
      if (typeof str !== "string" || str === "") {
        return false;
      }
      if (isExtglob(str)) {
        return true;
      }
      var regex = strictRegex;
      var match;
      if (options && options.strict === false) {
        regex = relaxedRegex;
      }
      while (match = regex.exec(str)) {
        if (match[2])
          return true;
        var idx = match.index + match[0].length;
        var open = match[1];
        var close = open ? chars[open] : null;
        if (open && close) {
          var n = str.indexOf(close, idx);
          if (n !== -1) {
            idx = n + 1;
          }
        }
        str = str.slice(idx);
      }
      return false;
    };
  }
});

// node_modules/glob-parent/index.js
var require_glob_parent = __commonJS({
  "node_modules/glob-parent/index.js"(exports2, module2) {
    "use strict";
    var isGlob = require_is_glob();
    var pathPosixDirname = require("path").posix.dirname;
    var isWin32 = require("os").platform() === "win32";
    var slash = "/";
    var backslash = /\\/g;
    var enclosure = /[\{\[].*[\}\]]$/;
    var globby = /(^|[^\\])([\{\[]|\([^\)]+$)/;
    var escaped = /\\([\!\*\?\|\[\]\(\)\{\}])/g;
    module2.exports = function globParent(str, opts) {
      var options = Object.assign({ flipBackslashes: true }, opts);
      if (options.flipBackslashes && isWin32 && str.indexOf(slash) < 0) {
        str = str.replace(backslash, slash);
      }
      if (enclosure.test(str)) {
        str += slash;
      }
      str += "a";
      do {
        str = pathPosixDirname(str);
      } while (isGlob(str) || globby.test(str));
      return str.replace(escaped, "$1");
    };
  }
});

// node_modules/braces/lib/utils.js
var require_utils = __commonJS({
  "node_modules/braces/lib/utils.js"(exports2) {
    "use strict";
    exports2.isInteger = (num) => {
      if (typeof num === "number") {
        return Number.isInteger(num);
      }
      if (typeof num === "string" && num.trim() !== "") {
        return Number.isInteger(Number(num));
      }
      return false;
    };
    exports2.find = (node, type) => node.nodes.find((node2) => node2.type === type);
    exports2.exceedsLimit = (min, max, step = 1, limit) => {
      if (limit === false)
        return false;
      if (!exports2.isInteger(min) || !exports2.isInteger(max))
        return false;
      return (Number(max) - Number(min)) / Number(step) >= limit;
    };
    exports2.escapeNode = (block, n = 0, type) => {
      let node = block.nodes[n];
      if (!node)
        return;
      if (type && node.type === type || node.type === "open" || node.type === "close") {
        if (node.escaped !== true) {
          node.value = "\\" + node.value;
          node.escaped = true;
        }
      }
    };
    exports2.encloseBrace = (node) => {
      if (node.type !== "brace")
        return false;
      if (node.commas >> 0 + node.ranges >> 0 === 0) {
        node.invalid = true;
        return true;
      }
      return false;
    };
    exports2.isInvalidBrace = (block) => {
      if (block.type !== "brace")
        return false;
      if (block.invalid === true || block.dollar)
        return true;
      if (block.commas >> 0 + block.ranges >> 0 === 0) {
        block.invalid = true;
        return true;
      }
      if (block.open !== true || block.close !== true) {
        block.invalid = true;
        return true;
      }
      return false;
    };
    exports2.isOpenOrClose = (node) => {
      if (node.type === "open" || node.type === "close") {
        return true;
      }
      return node.open === true || node.close === true;
    };
    exports2.reduce = (nodes) => nodes.reduce((acc, node) => {
      if (node.type === "text")
        acc.push(node.value);
      if (node.type === "range")
        node.type = "text";
      return acc;
    }, []);
    exports2.flatten = (...args) => {
      const result = [];
      const flat = (arr) => {
        for (let i = 0; i < arr.length; i++) {
          let ele = arr[i];
          Array.isArray(ele) ? flat(ele, result) : ele !== void 0 && result.push(ele);
        }
        return result;
      };
      flat(args);
      return result;
    };
  }
});

// node_modules/braces/lib/stringify.js
var require_stringify = __commonJS({
  "node_modules/braces/lib/stringify.js"(exports2, module2) {
    "use strict";
    var utils = require_utils();
    module2.exports = (ast, options = {}) => {
      let stringify = (node, parent = {}) => {
        let invalidBlock = options.escapeInvalid && utils.isInvalidBrace(parent);
        let invalidNode = node.invalid === true && options.escapeInvalid === true;
        let output = "";
        if (node.value) {
          if ((invalidBlock || invalidNode) && utils.isOpenOrClose(node)) {
            return "\\" + node.value;
          }
          return node.value;
        }
        if (node.value) {
          return node.value;
        }
        if (node.nodes) {
          for (let child of node.nodes) {
            output += stringify(child);
          }
        }
        return output;
      };
      return stringify(ast);
    };
  }
});

// node_modules/is-number/index.js
var require_is_number = __commonJS({
  "node_modules/is-number/index.js"(exports2, module2) {
    "use strict";
    module2.exports = function(num) {
      if (typeof num === "number") {
        return num - num === 0;
      }
      if (typeof num === "string" && num.trim() !== "") {
        return Number.isFinite ? Number.isFinite(+num) : isFinite(+num);
      }
      return false;
    };
  }
});

// node_modules/to-regex-range/index.js
var require_to_regex_range = __commonJS({
  "node_modules/to-regex-range/index.js"(exports2, module2) {
    "use strict";
    var isNumber = require_is_number();
    var toRegexRange = (min, max, options) => {
      if (isNumber(min) === false) {
        throw new TypeError("toRegexRange: expected the first argument to be a number");
      }
      if (max === void 0 || min === max) {
        return String(min);
      }
      if (isNumber(max) === false) {
        throw new TypeError("toRegexRange: expected the second argument to be a number.");
      }
      let opts = { relaxZeros: true, ...options };
      if (typeof opts.strictZeros === "boolean") {
        opts.relaxZeros = opts.strictZeros === false;
      }
      let relax = String(opts.relaxZeros);
      let shorthand = String(opts.shorthand);
      let capture = String(opts.capture);
      let wrap = String(opts.wrap);
      let cacheKey = min + ":" + max + "=" + relax + shorthand + capture + wrap;
      if (toRegexRange.cache.hasOwnProperty(cacheKey)) {
        return toRegexRange.cache[cacheKey].result;
      }
      let a = Math.min(min, max);
      let b = Math.max(min, max);
      if (Math.abs(a - b) === 1) {
        let result = min + "|" + max;
        if (opts.capture) {
          return `(${result})`;
        }
        if (opts.wrap === false) {
          return result;
        }
        return `(?:${result})`;
      }
      let isPadded = hasPadding(min) || hasPadding(max);
      let state = { min, max, a, b };
      let positives = [];
      let negatives = [];
      if (isPadded) {
        state.isPadded = isPadded;
        state.maxLen = String(state.max).length;
      }
      if (a < 0) {
        let newMin = b < 0 ? Math.abs(b) : 1;
        negatives = splitToPatterns(newMin, Math.abs(a), state, opts);
        a = state.a = 0;
      }
      if (b >= 0) {
        positives = splitToPatterns(a, b, state, opts);
      }
      state.negatives = negatives;
      state.positives = positives;
      state.result = collatePatterns(negatives, positives, opts);
      if (opts.capture === true) {
        state.result = `(${state.result})`;
      } else if (opts.wrap !== false && positives.length + negatives.length > 1) {
        state.result = `(?:${state.result})`;
      }
      toRegexRange.cache[cacheKey] = state;
      return state.result;
    };
    function collatePatterns(neg, pos, options) {
      let onlyNegative = filterPatterns(neg, pos, "-", false, options) || [];
      let onlyPositive = filterPatterns(pos, neg, "", false, options) || [];
      let intersected = filterPatterns(neg, pos, "-?", true, options) || [];
      let subpatterns = onlyNegative.concat(intersected).concat(onlyPositive);
      return subpatterns.join("|");
    }
    function splitToRanges(min, max) {
      let nines = 1;
      let zeros = 1;
      let stop = countNines(min, nines);
      let stops = new Set([max]);
      while (min <= stop && stop <= max) {
        stops.add(stop);
        nines += 1;
        stop = countNines(min, nines);
      }
      stop = countZeros(max + 1, zeros) - 1;
      while (min < stop && stop <= max) {
        stops.add(stop);
        zeros += 1;
        stop = countZeros(max + 1, zeros) - 1;
      }
      stops = [...stops];
      stops.sort(compare);
      return stops;
    }
    function rangeToPattern(start, stop, options) {
      if (start === stop) {
        return { pattern: start, count: [], digits: 0 };
      }
      let zipped = zip(start, stop);
      let digits = zipped.length;
      let pattern = "";
      let count = 0;
      for (let i = 0; i < digits; i++) {
        let [startDigit, stopDigit] = zipped[i];
        if (startDigit === stopDigit) {
          pattern += startDigit;
        } else if (startDigit !== "0" || stopDigit !== "9") {
          pattern += toCharacterClass(startDigit, stopDigit, options);
        } else {
          count++;
        }
      }
      if (count) {
        pattern += options.shorthand === true ? "\\d" : "[0-9]";
      }
      return { pattern, count: [count], digits };
    }
    function splitToPatterns(min, max, tok, options) {
      let ranges = splitToRanges(min, max);
      let tokens = [];
      let start = min;
      let prev;
      for (let i = 0; i < ranges.length; i++) {
        let max2 = ranges[i];
        let obj = rangeToPattern(String(start), String(max2), options);
        let zeros = "";
        if (!tok.isPadded && prev && prev.pattern === obj.pattern) {
          if (prev.count.length > 1) {
            prev.count.pop();
          }
          prev.count.push(obj.count[0]);
          prev.string = prev.pattern + toQuantifier(prev.count);
          start = max2 + 1;
          continue;
        }
        if (tok.isPadded) {
          zeros = padZeros(max2, tok, options);
        }
        obj.string = zeros + obj.pattern + toQuantifier(obj.count);
        tokens.push(obj);
        start = max2 + 1;
        prev = obj;
      }
      return tokens;
    }
    function filterPatterns(arr, comparison, prefix, intersection, options) {
      let result = [];
      for (let ele of arr) {
        let { string } = ele;
        if (!intersection && !contains(comparison, "string", string)) {
          result.push(prefix + string);
        }
        if (intersection && contains(comparison, "string", string)) {
          result.push(prefix + string);
        }
      }
      return result;
    }
    function zip(a, b) {
      let arr = [];
      for (let i = 0; i < a.length; i++)
        arr.push([a[i], b[i]]);
      return arr;
    }
    function compare(a, b) {
      return a > b ? 1 : b > a ? -1 : 0;
    }
    function contains(arr, key, val) {
      return arr.some((ele) => ele[key] === val);
    }
    function countNines(min, len) {
      return Number(String(min).slice(0, -len) + "9".repeat(len));
    }
    function countZeros(integer, zeros) {
      return integer - integer % Math.pow(10, zeros);
    }
    function toQuantifier(digits) {
      let [start = 0, stop = ""] = digits;
      if (stop || start > 1) {
        return `{${start + (stop ? "," + stop : "")}}`;
      }
      return "";
    }
    function toCharacterClass(a, b, options) {
      return `[${a}${b - a === 1 ? "" : "-"}${b}]`;
    }
    function hasPadding(str) {
      return /^-?(0+)\d/.test(str);
    }
    function padZeros(value, tok, options) {
      if (!tok.isPadded) {
        return value;
      }
      let diff = Math.abs(tok.maxLen - String(value).length);
      let relax = options.relaxZeros !== false;
      switch (diff) {
        case 0:
          return "";
        case 1:
          return relax ? "0?" : "0";
        case 2:
          return relax ? "0{0,2}" : "00";
        default: {
          return relax ? `0{0,${diff}}` : `0{${diff}}`;
        }
      }
    }
    toRegexRange.cache = {};
    toRegexRange.clearCache = () => toRegexRange.cache = {};
    module2.exports = toRegexRange;
  }
});

// node_modules/fill-range/index.js
var require_fill_range = __commonJS({
  "node_modules/fill-range/index.js"(exports2, module2) {
    "use strict";
    var util = require("util");
    var toRegexRange = require_to_regex_range();
    var isObject = (val) => val !== null && typeof val === "object" && !Array.isArray(val);
    var transform = (toNumber) => {
      return (value) => toNumber === true ? Number(value) : String(value);
    };
    var isValidValue = (value) => {
      return typeof value === "number" || typeof value === "string" && value !== "";
    };
    var isNumber = (num) => Number.isInteger(+num);
    var zeros = (input) => {
      let value = `${input}`;
      let index = -1;
      if (value[0] === "-")
        value = value.slice(1);
      if (value === "0")
        return false;
      while (value[++index] === "0")
        ;
      return index > 0;
    };
    var stringify = (start, end, options) => {
      if (typeof start === "string" || typeof end === "string") {
        return true;
      }
      return options.stringify === true;
    };
    var pad = (input, maxLength, toNumber) => {
      if (maxLength > 0) {
        let dash = input[0] === "-" ? "-" : "";
        if (dash)
          input = input.slice(1);
        input = dash + input.padStart(dash ? maxLength - 1 : maxLength, "0");
      }
      if (toNumber === false) {
        return String(input);
      }
      return input;
    };
    var toMaxLen = (input, maxLength) => {
      let negative = input[0] === "-" ? "-" : "";
      if (negative) {
        input = input.slice(1);
        maxLength--;
      }
      while (input.length < maxLength)
        input = "0" + input;
      return negative ? "-" + input : input;
    };
    var toSequence = (parts, options) => {
      parts.negatives.sort((a, b) => a < b ? -1 : a > b ? 1 : 0);
      parts.positives.sort((a, b) => a < b ? -1 : a > b ? 1 : 0);
      let prefix = options.capture ? "" : "?:";
      let positives = "";
      let negatives = "";
      let result;
      if (parts.positives.length) {
        positives = parts.positives.join("|");
      }
      if (parts.negatives.length) {
        negatives = `-(${prefix}${parts.negatives.join("|")})`;
      }
      if (positives && negatives) {
        result = `${positives}|${negatives}`;
      } else {
        result = positives || negatives;
      }
      if (options.wrap) {
        return `(${prefix}${result})`;
      }
      return result;
    };
    var toRange = (a, b, isNumbers, options) => {
      if (isNumbers) {
        return toRegexRange(a, b, { wrap: false, ...options });
      }
      let start = String.fromCharCode(a);
      if (a === b)
        return start;
      let stop = String.fromCharCode(b);
      return `[${start}-${stop}]`;
    };
    var toRegex = (start, end, options) => {
      if (Array.isArray(start)) {
        let wrap = options.wrap === true;
        let prefix = options.capture ? "" : "?:";
        return wrap ? `(${prefix}${start.join("|")})` : start.join("|");
      }
      return toRegexRange(start, end, options);
    };
    var rangeError = (...args) => {
      return new RangeError("Invalid range arguments: " + util.inspect(...args));
    };
    var invalidRange = (start, end, options) => {
      if (options.strictRanges === true)
        throw rangeError([start, end]);
      return [];
    };
    var invalidStep = (step, options) => {
      if (options.strictRanges === true) {
        throw new TypeError(`Expected step "${step}" to be a number`);
      }
      return [];
    };
    var fillNumbers = (start, end, step = 1, options = {}) => {
      let a = Number(start);
      let b = Number(end);
      if (!Number.isInteger(a) || !Number.isInteger(b)) {
        if (options.strictRanges === true)
          throw rangeError([start, end]);
        return [];
      }
      if (a === 0)
        a = 0;
      if (b === 0)
        b = 0;
      let descending = a > b;
      let startString = String(start);
      let endString = String(end);
      let stepString = String(step);
      step = Math.max(Math.abs(step), 1);
      let padded = zeros(startString) || zeros(endString) || zeros(stepString);
      let maxLen = padded ? Math.max(startString.length, endString.length, stepString.length) : 0;
      let toNumber = padded === false && stringify(start, end, options) === false;
      let format = options.transform || transform(toNumber);
      if (options.toRegex && step === 1) {
        return toRange(toMaxLen(start, maxLen), toMaxLen(end, maxLen), true, options);
      }
      let parts = { negatives: [], positives: [] };
      let push = (num) => parts[num < 0 ? "negatives" : "positives"].push(Math.abs(num));
      let range = [];
      let index = 0;
      while (descending ? a >= b : a <= b) {
        if (options.toRegex === true && step > 1) {
          push(a);
        } else {
          range.push(pad(format(a, index), maxLen, toNumber));
        }
        a = descending ? a - step : a + step;
        index++;
      }
      if (options.toRegex === true) {
        return step > 1 ? toSequence(parts, options) : toRegex(range, null, { wrap: false, ...options });
      }
      return range;
    };
    var fillLetters = (start, end, step = 1, options = {}) => {
      if (!isNumber(start) && start.length > 1 || !isNumber(end) && end.length > 1) {
        return invalidRange(start, end, options);
      }
      let format = options.transform || ((val) => String.fromCharCode(val));
      let a = `${start}`.charCodeAt(0);
      let b = `${end}`.charCodeAt(0);
      let descending = a > b;
      let min = Math.min(a, b);
      let max = Math.max(a, b);
      if (options.toRegex && step === 1) {
        return toRange(min, max, false, options);
      }
      let range = [];
      let index = 0;
      while (descending ? a >= b : a <= b) {
        range.push(format(a, index));
        a = descending ? a - step : a + step;
        index++;
      }
      if (options.toRegex === true) {
        return toRegex(range, null, { wrap: false, options });
      }
      return range;
    };
    var fill = (start, end, step, options = {}) => {
      if (end == null && isValidValue(start)) {
        return [start];
      }
      if (!isValidValue(start) || !isValidValue(end)) {
        return invalidRange(start, end, options);
      }
      if (typeof step === "function") {
        return fill(start, end, 1, { transform: step });
      }
      if (isObject(step)) {
        return fill(start, end, 0, step);
      }
      let opts = { ...options };
      if (opts.capture === true)
        opts.wrap = true;
      step = step || opts.step || 1;
      if (!isNumber(step)) {
        if (step != null && !isObject(step))
          return invalidStep(step, opts);
        return fill(start, end, 1, step);
      }
      if (isNumber(start) && isNumber(end)) {
        return fillNumbers(start, end, step, opts);
      }
      return fillLetters(start, end, Math.max(Math.abs(step), 1), opts);
    };
    module2.exports = fill;
  }
});

// node_modules/braces/lib/compile.js
var require_compile = __commonJS({
  "node_modules/braces/lib/compile.js"(exports2, module2) {
    "use strict";
    var fill = require_fill_range();
    var utils = require_utils();
    var compile = (ast, options = {}) => {
      let walk = (node, parent = {}) => {
        let invalidBlock = utils.isInvalidBrace(parent);
        let invalidNode = node.invalid === true && options.escapeInvalid === true;
        let invalid = invalidBlock === true || invalidNode === true;
        let prefix = options.escapeInvalid === true ? "\\" : "";
        let output = "";
        if (node.isOpen === true) {
          return prefix + node.value;
        }
        if (node.isClose === true) {
          return prefix + node.value;
        }
        if (node.type === "open") {
          return invalid ? prefix + node.value : "(";
        }
        if (node.type === "close") {
          return invalid ? prefix + node.value : ")";
        }
        if (node.type === "comma") {
          return node.prev.type === "comma" ? "" : invalid ? node.value : "|";
        }
        if (node.value) {
          return node.value;
        }
        if (node.nodes && node.ranges > 0) {
          let args = utils.reduce(node.nodes);
          let range = fill(...args, { ...options, wrap: false, toRegex: true });
          if (range.length !== 0) {
            return args.length > 1 && range.length > 1 ? `(${range})` : range;
          }
        }
        if (node.nodes) {
          for (let child of node.nodes) {
            output += walk(child, node);
          }
        }
        return output;
      };
      return walk(ast);
    };
    module2.exports = compile;
  }
});

// node_modules/braces/lib/expand.js
var require_expand = __commonJS({
  "node_modules/braces/lib/expand.js"(exports2, module2) {
    "use strict";
    var fill = require_fill_range();
    var stringify = require_stringify();
    var utils = require_utils();
    var append = (queue = "", stash = "", enclose = false) => {
      let result = [];
      queue = [].concat(queue);
      stash = [].concat(stash);
      if (!stash.length)
        return queue;
      if (!queue.length) {
        return enclose ? utils.flatten(stash).map((ele) => `{${ele}}`) : stash;
      }
      for (let item of queue) {
        if (Array.isArray(item)) {
          for (let value of item) {
            result.push(append(value, stash, enclose));
          }
        } else {
          for (let ele of stash) {
            if (enclose === true && typeof ele === "string")
              ele = `{${ele}}`;
            result.push(Array.isArray(ele) ? append(item, ele, enclose) : item + ele);
          }
        }
      }
      return utils.flatten(result);
    };
    var expand = (ast, options = {}) => {
      let rangeLimit = options.rangeLimit === void 0 ? 1e3 : options.rangeLimit;
      let walk = (node, parent = {}) => {
        node.queue = [];
        let p = parent;
        let q = parent.queue;
        while (p.type !== "brace" && p.type !== "root" && p.parent) {
          p = p.parent;
          q = p.queue;
        }
        if (node.invalid || node.dollar) {
          q.push(append(q.pop(), stringify(node, options)));
          return;
        }
        if (node.type === "brace" && node.invalid !== true && node.nodes.length === 2) {
          q.push(append(q.pop(), ["{}"]));
          return;
        }
        if (node.nodes && node.ranges > 0) {
          let args = utils.reduce(node.nodes);
          if (utils.exceedsLimit(...args, options.step, rangeLimit)) {
            throw new RangeError("expanded array length exceeds range limit. Use options.rangeLimit to increase or disable the limit.");
          }
          let range = fill(...args, options);
          if (range.length === 0) {
            range = stringify(node, options);
          }
          q.push(append(q.pop(), range));
          node.nodes = [];
          return;
        }
        let enclose = utils.encloseBrace(node);
        let queue = node.queue;
        let block = node;
        while (block.type !== "brace" && block.type !== "root" && block.parent) {
          block = block.parent;
          queue = block.queue;
        }
        for (let i = 0; i < node.nodes.length; i++) {
          let child = node.nodes[i];
          if (child.type === "comma" && node.type === "brace") {
            if (i === 1)
              queue.push("");
            queue.push("");
            continue;
          }
          if (child.type === "close") {
            q.push(append(q.pop(), queue, enclose));
            continue;
          }
          if (child.value && child.type !== "open") {
            queue.push(append(queue.pop(), child.value));
            continue;
          }
          if (child.nodes) {
            walk(child, node);
          }
        }
        return queue;
      };
      return utils.flatten(walk(ast));
    };
    module2.exports = expand;
  }
});

// node_modules/braces/lib/constants.js
var require_constants = __commonJS({
  "node_modules/braces/lib/constants.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      MAX_LENGTH: 1024 * 64,
      CHAR_0: "0",
      CHAR_9: "9",
      CHAR_UPPERCASE_A: "A",
      CHAR_LOWERCASE_A: "a",
      CHAR_UPPERCASE_Z: "Z",
      CHAR_LOWERCASE_Z: "z",
      CHAR_LEFT_PARENTHESES: "(",
      CHAR_RIGHT_PARENTHESES: ")",
      CHAR_ASTERISK: "*",
      CHAR_AMPERSAND: "&",
      CHAR_AT: "@",
      CHAR_BACKSLASH: "\\",
      CHAR_BACKTICK: "`",
      CHAR_CARRIAGE_RETURN: "\r",
      CHAR_CIRCUMFLEX_ACCENT: "^",
      CHAR_COLON: ":",
      CHAR_COMMA: ",",
      CHAR_DOLLAR: "$",
      CHAR_DOT: ".",
      CHAR_DOUBLE_QUOTE: '"',
      CHAR_EQUAL: "=",
      CHAR_EXCLAMATION_MARK: "!",
      CHAR_FORM_FEED: "\f",
      CHAR_FORWARD_SLASH: "/",
      CHAR_HASH: "#",
      CHAR_HYPHEN_MINUS: "-",
      CHAR_LEFT_ANGLE_BRACKET: "<",
      CHAR_LEFT_CURLY_BRACE: "{",
      CHAR_LEFT_SQUARE_BRACKET: "[",
      CHAR_LINE_FEED: "\n",
      CHAR_NO_BREAK_SPACE: "\xA0",
      CHAR_PERCENT: "%",
      CHAR_PLUS: "+",
      CHAR_QUESTION_MARK: "?",
      CHAR_RIGHT_ANGLE_BRACKET: ">",
      CHAR_RIGHT_CURLY_BRACE: "}",
      CHAR_RIGHT_SQUARE_BRACKET: "]",
      CHAR_SEMICOLON: ";",
      CHAR_SINGLE_QUOTE: "'",
      CHAR_SPACE: " ",
      CHAR_TAB: "	",
      CHAR_UNDERSCORE: "_",
      CHAR_VERTICAL_LINE: "|",
      CHAR_ZERO_WIDTH_NOBREAK_SPACE: "\uFEFF"
    };
  }
});

// node_modules/braces/lib/parse.js
var require_parse = __commonJS({
  "node_modules/braces/lib/parse.js"(exports2, module2) {
    "use strict";
    var stringify = require_stringify();
    var {
      MAX_LENGTH,
      CHAR_BACKSLASH,
      CHAR_BACKTICK,
      CHAR_COMMA,
      CHAR_DOT,
      CHAR_LEFT_PARENTHESES,
      CHAR_RIGHT_PARENTHESES,
      CHAR_LEFT_CURLY_BRACE,
      CHAR_RIGHT_CURLY_BRACE,
      CHAR_LEFT_SQUARE_BRACKET,
      CHAR_RIGHT_SQUARE_BRACKET,
      CHAR_DOUBLE_QUOTE,
      CHAR_SINGLE_QUOTE,
      CHAR_NO_BREAK_SPACE,
      CHAR_ZERO_WIDTH_NOBREAK_SPACE
    } = require_constants();
    var parse = (input, options = {}) => {
      if (typeof input !== "string") {
        throw new TypeError("Expected a string");
      }
      let opts = options || {};
      let max = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
      if (input.length > max) {
        throw new SyntaxError(`Input length (${input.length}), exceeds max characters (${max})`);
      }
      let ast = { type: "root", input, nodes: [] };
      let stack = [ast];
      let block = ast;
      let prev = ast;
      let brackets = 0;
      let length = input.length;
      let index = 0;
      let depth = 0;
      let value;
      let memo = {};
      const advance = () => input[index++];
      const push = (node) => {
        if (node.type === "text" && prev.type === "dot") {
          prev.type = "text";
        }
        if (prev && prev.type === "text" && node.type === "text") {
          prev.value += node.value;
          return;
        }
        block.nodes.push(node);
        node.parent = block;
        node.prev = prev;
        prev = node;
        return node;
      };
      push({ type: "bos" });
      while (index < length) {
        block = stack[stack.length - 1];
        value = advance();
        if (value === CHAR_ZERO_WIDTH_NOBREAK_SPACE || value === CHAR_NO_BREAK_SPACE) {
          continue;
        }
        if (value === CHAR_BACKSLASH) {
          push({ type: "text", value: (options.keepEscaping ? value : "") + advance() });
          continue;
        }
        if (value === CHAR_RIGHT_SQUARE_BRACKET) {
          push({ type: "text", value: "\\" + value });
          continue;
        }
        if (value === CHAR_LEFT_SQUARE_BRACKET) {
          brackets++;
          let closed = true;
          let next;
          while (index < length && (next = advance())) {
            value += next;
            if (next === CHAR_LEFT_SQUARE_BRACKET) {
              brackets++;
              continue;
            }
            if (next === CHAR_BACKSLASH) {
              value += advance();
              continue;
            }
            if (next === CHAR_RIGHT_SQUARE_BRACKET) {
              brackets--;
              if (brackets === 0) {
                break;
              }
            }
          }
          push({ type: "text", value });
          continue;
        }
        if (value === CHAR_LEFT_PARENTHESES) {
          block = push({ type: "paren", nodes: [] });
          stack.push(block);
          push({ type: "text", value });
          continue;
        }
        if (value === CHAR_RIGHT_PARENTHESES) {
          if (block.type !== "paren") {
            push({ type: "text", value });
            continue;
          }
          block = stack.pop();
          push({ type: "text", value });
          block = stack[stack.length - 1];
          continue;
        }
        if (value === CHAR_DOUBLE_QUOTE || value === CHAR_SINGLE_QUOTE || value === CHAR_BACKTICK) {
          let open = value;
          let next;
          if (options.keepQuotes !== true) {
            value = "";
          }
          while (index < length && (next = advance())) {
            if (next === CHAR_BACKSLASH) {
              value += next + advance();
              continue;
            }
            if (next === open) {
              if (options.keepQuotes === true)
                value += next;
              break;
            }
            value += next;
          }
          push({ type: "text", value });
          continue;
        }
        if (value === CHAR_LEFT_CURLY_BRACE) {
          depth++;
          let dollar = prev.value && prev.value.slice(-1) === "$" || block.dollar === true;
          let brace = {
            type: "brace",
            open: true,
            close: false,
            dollar,
            depth,
            commas: 0,
            ranges: 0,
            nodes: []
          };
          block = push(brace);
          stack.push(block);
          push({ type: "open", value });
          continue;
        }
        if (value === CHAR_RIGHT_CURLY_BRACE) {
          if (block.type !== "brace") {
            push({ type: "text", value });
            continue;
          }
          let type = "close";
          block = stack.pop();
          block.close = true;
          push({ type, value });
          depth--;
          block = stack[stack.length - 1];
          continue;
        }
        if (value === CHAR_COMMA && depth > 0) {
          if (block.ranges > 0) {
            block.ranges = 0;
            let open = block.nodes.shift();
            block.nodes = [open, { type: "text", value: stringify(block) }];
          }
          push({ type: "comma", value });
          block.commas++;
          continue;
        }
        if (value === CHAR_DOT && depth > 0 && block.commas === 0) {
          let siblings = block.nodes;
          if (depth === 0 || siblings.length === 0) {
            push({ type: "text", value });
            continue;
          }
          if (prev.type === "dot") {
            block.range = [];
            prev.value += value;
            prev.type = "range";
            if (block.nodes.length !== 3 && block.nodes.length !== 5) {
              block.invalid = true;
              block.ranges = 0;
              prev.type = "text";
              continue;
            }
            block.ranges++;
            block.args = [];
            continue;
          }
          if (prev.type === "range") {
            siblings.pop();
            let before = siblings[siblings.length - 1];
            before.value += prev.value + value;
            prev = before;
            block.ranges--;
            continue;
          }
          push({ type: "dot", value });
          continue;
        }
        push({ type: "text", value });
      }
      do {
        block = stack.pop();
        if (block.type !== "root") {
          block.nodes.forEach((node) => {
            if (!node.nodes) {
              if (node.type === "open")
                node.isOpen = true;
              if (node.type === "close")
                node.isClose = true;
              if (!node.nodes)
                node.type = "text";
              node.invalid = true;
            }
          });
          let parent = stack[stack.length - 1];
          let index2 = parent.nodes.indexOf(block);
          parent.nodes.splice(index2, 1, ...block.nodes);
        }
      } while (stack.length > 0);
      push({ type: "eos" });
      return ast;
    };
    module2.exports = parse;
  }
});

// node_modules/braces/index.js
var require_braces = __commonJS({
  "node_modules/braces/index.js"(exports2, module2) {
    "use strict";
    var stringify = require_stringify();
    var compile = require_compile();
    var expand = require_expand();
    var parse = require_parse();
    var braces = (input, options = {}) => {
      let output = [];
      if (Array.isArray(input)) {
        for (let pattern of input) {
          let result = braces.create(pattern, options);
          if (Array.isArray(result)) {
            output.push(...result);
          } else {
            output.push(result);
          }
        }
      } else {
        output = [].concat(braces.create(input, options));
      }
      if (options && options.expand === true && options.nodupes === true) {
        output = [...new Set(output)];
      }
      return output;
    };
    braces.parse = (input, options = {}) => parse(input, options);
    braces.stringify = (input, options = {}) => {
      if (typeof input === "string") {
        return stringify(braces.parse(input, options), options);
      }
      return stringify(input, options);
    };
    braces.compile = (input, options = {}) => {
      if (typeof input === "string") {
        input = braces.parse(input, options);
      }
      return compile(input, options);
    };
    braces.expand = (input, options = {}) => {
      if (typeof input === "string") {
        input = braces.parse(input, options);
      }
      let result = expand(input, options);
      if (options.noempty === true) {
        result = result.filter(Boolean);
      }
      if (options.nodupes === true) {
        result = [...new Set(result)];
      }
      return result;
    };
    braces.create = (input, options = {}) => {
      if (input === "" || input.length < 3) {
        return [input];
      }
      return options.expand !== true ? braces.compile(input, options) : braces.expand(input, options);
    };
    module2.exports = braces;
  }
});

// node_modules/picomatch/lib/constants.js
var require_constants2 = __commonJS({
  "node_modules/picomatch/lib/constants.js"(exports2, module2) {
    "use strict";
    var path2 = require("path");
    var WIN_SLASH = "\\\\/";
    var WIN_NO_SLASH = `[^${WIN_SLASH}]`;
    var DOT_LITERAL = "\\.";
    var PLUS_LITERAL = "\\+";
    var QMARK_LITERAL = "\\?";
    var SLASH_LITERAL = "\\/";
    var ONE_CHAR = "(?=.)";
    var QMARK = "[^/]";
    var END_ANCHOR = `(?:${SLASH_LITERAL}|$)`;
    var START_ANCHOR = `(?:^|${SLASH_LITERAL})`;
    var DOTS_SLASH = `${DOT_LITERAL}{1,2}${END_ANCHOR}`;
    var NO_DOT = `(?!${DOT_LITERAL})`;
    var NO_DOTS = `(?!${START_ANCHOR}${DOTS_SLASH})`;
    var NO_DOT_SLASH = `(?!${DOT_LITERAL}{0,1}${END_ANCHOR})`;
    var NO_DOTS_SLASH = `(?!${DOTS_SLASH})`;
    var QMARK_NO_DOT = `[^.${SLASH_LITERAL}]`;
    var STAR = `${QMARK}*?`;
    var POSIX_CHARS = {
      DOT_LITERAL,
      PLUS_LITERAL,
      QMARK_LITERAL,
      SLASH_LITERAL,
      ONE_CHAR,
      QMARK,
      END_ANCHOR,
      DOTS_SLASH,
      NO_DOT,
      NO_DOTS,
      NO_DOT_SLASH,
      NO_DOTS_SLASH,
      QMARK_NO_DOT,
      STAR,
      START_ANCHOR
    };
    var WINDOWS_CHARS = {
      ...POSIX_CHARS,
      SLASH_LITERAL: `[${WIN_SLASH}]`,
      QMARK: WIN_NO_SLASH,
      STAR: `${WIN_NO_SLASH}*?`,
      DOTS_SLASH: `${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$)`,
      NO_DOT: `(?!${DOT_LITERAL})`,
      NO_DOTS: `(?!(?:^|[${WIN_SLASH}])${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
      NO_DOT_SLASH: `(?!${DOT_LITERAL}{0,1}(?:[${WIN_SLASH}]|$))`,
      NO_DOTS_SLASH: `(?!${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
      QMARK_NO_DOT: `[^.${WIN_SLASH}]`,
      START_ANCHOR: `(?:^|[${WIN_SLASH}])`,
      END_ANCHOR: `(?:[${WIN_SLASH}]|$)`
    };
    var POSIX_REGEX_SOURCE = {
      alnum: "a-zA-Z0-9",
      alpha: "a-zA-Z",
      ascii: "\\x00-\\x7F",
      blank: " \\t",
      cntrl: "\\x00-\\x1F\\x7F",
      digit: "0-9",
      graph: "\\x21-\\x7E",
      lower: "a-z",
      print: "\\x20-\\x7E ",
      punct: "\\-!\"#$%&'()\\*+,./:;<=>?@[\\]^_`{|}~",
      space: " \\t\\r\\n\\v\\f",
      upper: "A-Z",
      word: "A-Za-z0-9_",
      xdigit: "A-Fa-f0-9"
    };
    module2.exports = {
      MAX_LENGTH: 1024 * 64,
      POSIX_REGEX_SOURCE,
      REGEX_BACKSLASH: /\\(?![*+?^${}(|)[\]])/g,
      REGEX_NON_SPECIAL_CHARS: /^[^@![\].,$*+?^{}()|\\/]+/,
      REGEX_SPECIAL_CHARS: /[-*+?.^${}(|)[\]]/,
      REGEX_SPECIAL_CHARS_BACKREF: /(\\?)((\W)(\3*))/g,
      REGEX_SPECIAL_CHARS_GLOBAL: /([-*+?.^${}(|)[\]])/g,
      REGEX_REMOVE_BACKSLASH: /(?:\[.*?[^\\]\]|\\(?=.))/g,
      REPLACEMENTS: {
        "***": "*",
        "**/**": "**",
        "**/**/**": "**"
      },
      CHAR_0: 48,
      CHAR_9: 57,
      CHAR_UPPERCASE_A: 65,
      CHAR_LOWERCASE_A: 97,
      CHAR_UPPERCASE_Z: 90,
      CHAR_LOWERCASE_Z: 122,
      CHAR_LEFT_PARENTHESES: 40,
      CHAR_RIGHT_PARENTHESES: 41,
      CHAR_ASTERISK: 42,
      CHAR_AMPERSAND: 38,
      CHAR_AT: 64,
      CHAR_BACKWARD_SLASH: 92,
      CHAR_CARRIAGE_RETURN: 13,
      CHAR_CIRCUMFLEX_ACCENT: 94,
      CHAR_COLON: 58,
      CHAR_COMMA: 44,
      CHAR_DOT: 46,
      CHAR_DOUBLE_QUOTE: 34,
      CHAR_EQUAL: 61,
      CHAR_EXCLAMATION_MARK: 33,
      CHAR_FORM_FEED: 12,
      CHAR_FORWARD_SLASH: 47,
      CHAR_GRAVE_ACCENT: 96,
      CHAR_HASH: 35,
      CHAR_HYPHEN_MINUS: 45,
      CHAR_LEFT_ANGLE_BRACKET: 60,
      CHAR_LEFT_CURLY_BRACE: 123,
      CHAR_LEFT_SQUARE_BRACKET: 91,
      CHAR_LINE_FEED: 10,
      CHAR_NO_BREAK_SPACE: 160,
      CHAR_PERCENT: 37,
      CHAR_PLUS: 43,
      CHAR_QUESTION_MARK: 63,
      CHAR_RIGHT_ANGLE_BRACKET: 62,
      CHAR_RIGHT_CURLY_BRACE: 125,
      CHAR_RIGHT_SQUARE_BRACKET: 93,
      CHAR_SEMICOLON: 59,
      CHAR_SINGLE_QUOTE: 39,
      CHAR_SPACE: 32,
      CHAR_TAB: 9,
      CHAR_UNDERSCORE: 95,
      CHAR_VERTICAL_LINE: 124,
      CHAR_ZERO_WIDTH_NOBREAK_SPACE: 65279,
      SEP: path2.sep,
      extglobChars(chars) {
        return {
          "!": { type: "negate", open: "(?:(?!(?:", close: `))${chars.STAR})` },
          "?": { type: "qmark", open: "(?:", close: ")?" },
          "+": { type: "plus", open: "(?:", close: ")+" },
          "*": { type: "star", open: "(?:", close: ")*" },
          "@": { type: "at", open: "(?:", close: ")" }
        };
      },
      globChars(win32) {
        return win32 === true ? WINDOWS_CHARS : POSIX_CHARS;
      }
    };
  }
});

// node_modules/picomatch/lib/utils.js
var require_utils2 = __commonJS({
  "node_modules/picomatch/lib/utils.js"(exports2) {
    "use strict";
    var path2 = require("path");
    var win32 = process.platform === "win32";
    var {
      REGEX_BACKSLASH,
      REGEX_REMOVE_BACKSLASH,
      REGEX_SPECIAL_CHARS,
      REGEX_SPECIAL_CHARS_GLOBAL
    } = require_constants2();
    exports2.isObject = (val) => val !== null && typeof val === "object" && !Array.isArray(val);
    exports2.hasRegexChars = (str) => REGEX_SPECIAL_CHARS.test(str);
    exports2.isRegexChar = (str) => str.length === 1 && exports2.hasRegexChars(str);
    exports2.escapeRegex = (str) => str.replace(REGEX_SPECIAL_CHARS_GLOBAL, "\\$1");
    exports2.toPosixSlashes = (str) => str.replace(REGEX_BACKSLASH, "/");
    exports2.removeBackslashes = (str) => {
      return str.replace(REGEX_REMOVE_BACKSLASH, (match) => {
        return match === "\\" ? "" : match;
      });
    };
    exports2.supportsLookbehinds = () => {
      const segs = process.version.slice(1).split(".").map(Number);
      if (segs.length === 3 && segs[0] >= 9 || segs[0] === 8 && segs[1] >= 10) {
        return true;
      }
      return false;
    };
    exports2.isWindows = (options) => {
      if (options && typeof options.windows === "boolean") {
        return options.windows;
      }
      return win32 === true || path2.sep === "\\";
    };
    exports2.escapeLast = (input, char, lastIdx) => {
      const idx = input.lastIndexOf(char, lastIdx);
      if (idx === -1)
        return input;
      if (input[idx - 1] === "\\")
        return exports2.escapeLast(input, char, idx - 1);
      return `${input.slice(0, idx)}\\${input.slice(idx)}`;
    };
    exports2.removePrefix = (input, state = {}) => {
      let output = input;
      if (output.startsWith("./")) {
        output = output.slice(2);
        state.prefix = "./";
      }
      return output;
    };
    exports2.wrapOutput = (input, state = {}, options = {}) => {
      const prepend = options.contains ? "" : "^";
      const append = options.contains ? "" : "$";
      let output = `${prepend}(?:${input})${append}`;
      if (state.negated === true) {
        output = `(?:^(?!${output}).*$)`;
      }
      return output;
    };
  }
});

// node_modules/picomatch/lib/scan.js
var require_scan = __commonJS({
  "node_modules/picomatch/lib/scan.js"(exports2, module2) {
    "use strict";
    var utils = require_utils2();
    var {
      CHAR_ASTERISK,
      CHAR_AT,
      CHAR_BACKWARD_SLASH,
      CHAR_COMMA,
      CHAR_DOT,
      CHAR_EXCLAMATION_MARK,
      CHAR_FORWARD_SLASH,
      CHAR_LEFT_CURLY_BRACE,
      CHAR_LEFT_PARENTHESES,
      CHAR_LEFT_SQUARE_BRACKET,
      CHAR_PLUS,
      CHAR_QUESTION_MARK,
      CHAR_RIGHT_CURLY_BRACE,
      CHAR_RIGHT_PARENTHESES,
      CHAR_RIGHT_SQUARE_BRACKET
    } = require_constants2();
    var isPathSeparator = (code) => {
      return code === CHAR_FORWARD_SLASH || code === CHAR_BACKWARD_SLASH;
    };
    var depth = (token) => {
      if (token.isPrefix !== true) {
        token.depth = token.isGlobstar ? Infinity : 1;
      }
    };
    var scan = (input, options) => {
      const opts = options || {};
      const length = input.length - 1;
      const scanToEnd = opts.parts === true || opts.scanToEnd === true;
      const slashes = [];
      const tokens = [];
      const parts = [];
      let str = input;
      let index = -1;
      let start = 0;
      let lastIndex = 0;
      let isBrace = false;
      let isBracket = false;
      let isGlob = false;
      let isExtglob = false;
      let isGlobstar = false;
      let braceEscaped = false;
      let backslashes = false;
      let negated = false;
      let negatedExtglob = false;
      let finished = false;
      let braces = 0;
      let prev;
      let code;
      let token = { value: "", depth: 0, isGlob: false };
      const eos = () => index >= length;
      const peek = () => str.charCodeAt(index + 1);
      const advance = () => {
        prev = code;
        return str.charCodeAt(++index);
      };
      while (index < length) {
        code = advance();
        let next;
        if (code === CHAR_BACKWARD_SLASH) {
          backslashes = token.backslashes = true;
          code = advance();
          if (code === CHAR_LEFT_CURLY_BRACE) {
            braceEscaped = true;
          }
          continue;
        }
        if (braceEscaped === true || code === CHAR_LEFT_CURLY_BRACE) {
          braces++;
          while (eos() !== true && (code = advance())) {
            if (code === CHAR_BACKWARD_SLASH) {
              backslashes = token.backslashes = true;
              advance();
              continue;
            }
            if (code === CHAR_LEFT_CURLY_BRACE) {
              braces++;
              continue;
            }
            if (braceEscaped !== true && code === CHAR_DOT && (code = advance()) === CHAR_DOT) {
              isBrace = token.isBrace = true;
              isGlob = token.isGlob = true;
              finished = true;
              if (scanToEnd === true) {
                continue;
              }
              break;
            }
            if (braceEscaped !== true && code === CHAR_COMMA) {
              isBrace = token.isBrace = true;
              isGlob = token.isGlob = true;
              finished = true;
              if (scanToEnd === true) {
                continue;
              }
              break;
            }
            if (code === CHAR_RIGHT_CURLY_BRACE) {
              braces--;
              if (braces === 0) {
                braceEscaped = false;
                isBrace = token.isBrace = true;
                finished = true;
                break;
              }
            }
          }
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (code === CHAR_FORWARD_SLASH) {
          slashes.push(index);
          tokens.push(token);
          token = { value: "", depth: 0, isGlob: false };
          if (finished === true)
            continue;
          if (prev === CHAR_DOT && index === start + 1) {
            start += 2;
            continue;
          }
          lastIndex = index + 1;
          continue;
        }
        if (opts.noext !== true) {
          const isExtglobChar = code === CHAR_PLUS || code === CHAR_AT || code === CHAR_ASTERISK || code === CHAR_QUESTION_MARK || code === CHAR_EXCLAMATION_MARK;
          if (isExtglobChar === true && peek() === CHAR_LEFT_PARENTHESES) {
            isGlob = token.isGlob = true;
            isExtglob = token.isExtglob = true;
            finished = true;
            if (code === CHAR_EXCLAMATION_MARK && index === start) {
              negatedExtglob = true;
            }
            if (scanToEnd === true) {
              while (eos() !== true && (code = advance())) {
                if (code === CHAR_BACKWARD_SLASH) {
                  backslashes = token.backslashes = true;
                  code = advance();
                  continue;
                }
                if (code === CHAR_RIGHT_PARENTHESES) {
                  isGlob = token.isGlob = true;
                  finished = true;
                  break;
                }
              }
              continue;
            }
            break;
          }
        }
        if (code === CHAR_ASTERISK) {
          if (prev === CHAR_ASTERISK)
            isGlobstar = token.isGlobstar = true;
          isGlob = token.isGlob = true;
          finished = true;
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (code === CHAR_QUESTION_MARK) {
          isGlob = token.isGlob = true;
          finished = true;
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (code === CHAR_LEFT_SQUARE_BRACKET) {
          while (eos() !== true && (next = advance())) {
            if (next === CHAR_BACKWARD_SLASH) {
              backslashes = token.backslashes = true;
              advance();
              continue;
            }
            if (next === CHAR_RIGHT_SQUARE_BRACKET) {
              isBracket = token.isBracket = true;
              isGlob = token.isGlob = true;
              finished = true;
              break;
            }
          }
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (opts.nonegate !== true && code === CHAR_EXCLAMATION_MARK && index === start) {
          negated = token.negated = true;
          start++;
          continue;
        }
        if (opts.noparen !== true && code === CHAR_LEFT_PARENTHESES) {
          isGlob = token.isGlob = true;
          if (scanToEnd === true) {
            while (eos() !== true && (code = advance())) {
              if (code === CHAR_LEFT_PARENTHESES) {
                backslashes = token.backslashes = true;
                code = advance();
                continue;
              }
              if (code === CHAR_RIGHT_PARENTHESES) {
                finished = true;
                break;
              }
            }
            continue;
          }
          break;
        }
        if (isGlob === true) {
          finished = true;
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
      }
      if (opts.noext === true) {
        isExtglob = false;
        isGlob = false;
      }
      let base = str;
      let prefix = "";
      let glob2 = "";
      if (start > 0) {
        prefix = str.slice(0, start);
        str = str.slice(start);
        lastIndex -= start;
      }
      if (base && isGlob === true && lastIndex > 0) {
        base = str.slice(0, lastIndex);
        glob2 = str.slice(lastIndex);
      } else if (isGlob === true) {
        base = "";
        glob2 = str;
      } else {
        base = str;
      }
      if (base && base !== "" && base !== "/" && base !== str) {
        if (isPathSeparator(base.charCodeAt(base.length - 1))) {
          base = base.slice(0, -1);
        }
      }
      if (opts.unescape === true) {
        if (glob2)
          glob2 = utils.removeBackslashes(glob2);
        if (base && backslashes === true) {
          base = utils.removeBackslashes(base);
        }
      }
      const state = {
        prefix,
        input,
        start,
        base,
        glob: glob2,
        isBrace,
        isBracket,
        isGlob,
        isExtglob,
        isGlobstar,
        negated,
        negatedExtglob
      };
      if (opts.tokens === true) {
        state.maxDepth = 0;
        if (!isPathSeparator(code)) {
          tokens.push(token);
        }
        state.tokens = tokens;
      }
      if (opts.parts === true || opts.tokens === true) {
        let prevIndex;
        for (let idx = 0; idx < slashes.length; idx++) {
          const n = prevIndex ? prevIndex + 1 : start;
          const i = slashes[idx];
          const value = input.slice(n, i);
          if (opts.tokens) {
            if (idx === 0 && start !== 0) {
              tokens[idx].isPrefix = true;
              tokens[idx].value = prefix;
            } else {
              tokens[idx].value = value;
            }
            depth(tokens[idx]);
            state.maxDepth += tokens[idx].depth;
          }
          if (idx !== 0 || value !== "") {
            parts.push(value);
          }
          prevIndex = i;
        }
        if (prevIndex && prevIndex + 1 < input.length) {
          const value = input.slice(prevIndex + 1);
          parts.push(value);
          if (opts.tokens) {
            tokens[tokens.length - 1].value = value;
            depth(tokens[tokens.length - 1]);
            state.maxDepth += tokens[tokens.length - 1].depth;
          }
        }
        state.slashes = slashes;
        state.parts = parts;
      }
      return state;
    };
    module2.exports = scan;
  }
});

// node_modules/picomatch/lib/parse.js
var require_parse2 = __commonJS({
  "node_modules/picomatch/lib/parse.js"(exports2, module2) {
    "use strict";
    var constants = require_constants2();
    var utils = require_utils2();
    var {
      MAX_LENGTH,
      POSIX_REGEX_SOURCE,
      REGEX_NON_SPECIAL_CHARS,
      REGEX_SPECIAL_CHARS_BACKREF,
      REPLACEMENTS
    } = constants;
    var expandRange = (args, options) => {
      if (typeof options.expandRange === "function") {
        return options.expandRange(...args, options);
      }
      args.sort();
      const value = `[${args.join("-")}]`;
      try {
        new RegExp(value);
      } catch (ex) {
        return args.map((v) => utils.escapeRegex(v)).join("..");
      }
      return value;
    };
    var syntaxError = (type, char) => {
      return `Missing ${type}: "${char}" - use "\\\\${char}" to match literal characters`;
    };
    var parse = (input, options) => {
      if (typeof input !== "string") {
        throw new TypeError("Expected a string");
      }
      input = REPLACEMENTS[input] || input;
      const opts = { ...options };
      const max = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
      let len = input.length;
      if (len > max) {
        throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
      }
      const bos = { type: "bos", value: "", output: opts.prepend || "" };
      const tokens = [bos];
      const capture = opts.capture ? "" : "?:";
      const win32 = utils.isWindows(options);
      const PLATFORM_CHARS = constants.globChars(win32);
      const EXTGLOB_CHARS = constants.extglobChars(PLATFORM_CHARS);
      const {
        DOT_LITERAL,
        PLUS_LITERAL,
        SLASH_LITERAL,
        ONE_CHAR,
        DOTS_SLASH,
        NO_DOT,
        NO_DOT_SLASH,
        NO_DOTS_SLASH,
        QMARK,
        QMARK_NO_DOT,
        STAR,
        START_ANCHOR
      } = PLATFORM_CHARS;
      const globstar = (opts2) => {
        return `(${capture}(?:(?!${START_ANCHOR}${opts2.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`;
      };
      const nodot = opts.dot ? "" : NO_DOT;
      const qmarkNoDot = opts.dot ? QMARK : QMARK_NO_DOT;
      let star = opts.bash === true ? globstar(opts) : STAR;
      if (opts.capture) {
        star = `(${star})`;
      }
      if (typeof opts.noext === "boolean") {
        opts.noextglob = opts.noext;
      }
      const state = {
        input,
        index: -1,
        start: 0,
        dot: opts.dot === true,
        consumed: "",
        output: "",
        prefix: "",
        backtrack: false,
        negated: false,
        brackets: 0,
        braces: 0,
        parens: 0,
        quotes: 0,
        globstar: false,
        tokens
      };
      input = utils.removePrefix(input, state);
      len = input.length;
      const extglobs = [];
      const braces = [];
      const stack = [];
      let prev = bos;
      let value;
      const eos = () => state.index === len - 1;
      const peek = state.peek = (n = 1) => input[state.index + n];
      const advance = state.advance = () => input[++state.index] || "";
      const remaining = () => input.slice(state.index + 1);
      const consume = (value2 = "", num = 0) => {
        state.consumed += value2;
        state.index += num;
      };
      const append = (token) => {
        state.output += token.output != null ? token.output : token.value;
        consume(token.value);
      };
      const negate = () => {
        let count = 1;
        while (peek() === "!" && (peek(2) !== "(" || peek(3) === "?")) {
          advance();
          state.start++;
          count++;
        }
        if (count % 2 === 0) {
          return false;
        }
        state.negated = true;
        state.start++;
        return true;
      };
      const increment = (type) => {
        state[type]++;
        stack.push(type);
      };
      const decrement = (type) => {
        state[type]--;
        stack.pop();
      };
      const push = (tok) => {
        if (prev.type === "globstar") {
          const isBrace = state.braces > 0 && (tok.type === "comma" || tok.type === "brace");
          const isExtglob = tok.extglob === true || extglobs.length && (tok.type === "pipe" || tok.type === "paren");
          if (tok.type !== "slash" && tok.type !== "paren" && !isBrace && !isExtglob) {
            state.output = state.output.slice(0, -prev.output.length);
            prev.type = "star";
            prev.value = "*";
            prev.output = star;
            state.output += prev.output;
          }
        }
        if (extglobs.length && tok.type !== "paren") {
          extglobs[extglobs.length - 1].inner += tok.value;
        }
        if (tok.value || tok.output)
          append(tok);
        if (prev && prev.type === "text" && tok.type === "text") {
          prev.value += tok.value;
          prev.output = (prev.output || "") + tok.value;
          return;
        }
        tok.prev = prev;
        tokens.push(tok);
        prev = tok;
      };
      const extglobOpen = (type, value2) => {
        const token = { ...EXTGLOB_CHARS[value2], conditions: 1, inner: "" };
        token.prev = prev;
        token.parens = state.parens;
        token.output = state.output;
        const output = (opts.capture ? "(" : "") + token.open;
        increment("parens");
        push({ type, value: value2, output: state.output ? "" : ONE_CHAR });
        push({ type: "paren", extglob: true, value: advance(), output });
        extglobs.push(token);
      };
      const extglobClose = (token) => {
        let output = token.close + (opts.capture ? ")" : "");
        let rest;
        if (token.type === "negate") {
          let extglobStar = star;
          if (token.inner && token.inner.length > 1 && token.inner.includes("/")) {
            extglobStar = globstar(opts);
          }
          if (extglobStar !== star || eos() || /^\)+$/.test(remaining())) {
            output = token.close = `)$))${extglobStar}`;
          }
          if (token.inner.includes("*") && (rest = remaining()) && /^\.[^\\/.]+$/.test(rest)) {
            output = token.close = `)${rest})${extglobStar})`;
          }
          if (token.prev.type === "bos") {
            state.negatedExtglob = true;
          }
        }
        push({ type: "paren", extglob: true, value, output });
        decrement("parens");
      };
      if (opts.fastpaths !== false && !/(^[*!]|[/()[\]{}"])/.test(input)) {
        let backslashes = false;
        let output = input.replace(REGEX_SPECIAL_CHARS_BACKREF, (m, esc, chars, first, rest, index) => {
          if (first === "\\") {
            backslashes = true;
            return m;
          }
          if (first === "?") {
            if (esc) {
              return esc + first + (rest ? QMARK.repeat(rest.length) : "");
            }
            if (index === 0) {
              return qmarkNoDot + (rest ? QMARK.repeat(rest.length) : "");
            }
            return QMARK.repeat(chars.length);
          }
          if (first === ".") {
            return DOT_LITERAL.repeat(chars.length);
          }
          if (first === "*") {
            if (esc) {
              return esc + first + (rest ? star : "");
            }
            return star;
          }
          return esc ? m : `\\${m}`;
        });
        if (backslashes === true) {
          if (opts.unescape === true) {
            output = output.replace(/\\/g, "");
          } else {
            output = output.replace(/\\+/g, (m) => {
              return m.length % 2 === 0 ? "\\\\" : m ? "\\" : "";
            });
          }
        }
        if (output === input && opts.contains === true) {
          state.output = input;
          return state;
        }
        state.output = utils.wrapOutput(output, state, options);
        return state;
      }
      while (!eos()) {
        value = advance();
        if (value === "\0") {
          continue;
        }
        if (value === "\\") {
          const next = peek();
          if (next === "/" && opts.bash !== true) {
            continue;
          }
          if (next === "." || next === ";") {
            continue;
          }
          if (!next) {
            value += "\\";
            push({ type: "text", value });
            continue;
          }
          const match = /^\\+/.exec(remaining());
          let slashes = 0;
          if (match && match[0].length > 2) {
            slashes = match[0].length;
            state.index += slashes;
            if (slashes % 2 !== 0) {
              value += "\\";
            }
          }
          if (opts.unescape === true) {
            value = advance();
          } else {
            value += advance();
          }
          if (state.brackets === 0) {
            push({ type: "text", value });
            continue;
          }
        }
        if (state.brackets > 0 && (value !== "]" || prev.value === "[" || prev.value === "[^")) {
          if (opts.posix !== false && value === ":") {
            const inner = prev.value.slice(1);
            if (inner.includes("[")) {
              prev.posix = true;
              if (inner.includes(":")) {
                const idx = prev.value.lastIndexOf("[");
                const pre = prev.value.slice(0, idx);
                const rest2 = prev.value.slice(idx + 2);
                const posix = POSIX_REGEX_SOURCE[rest2];
                if (posix) {
                  prev.value = pre + posix;
                  state.backtrack = true;
                  advance();
                  if (!bos.output && tokens.indexOf(prev) === 1) {
                    bos.output = ONE_CHAR;
                  }
                  continue;
                }
              }
            }
          }
          if (value === "[" && peek() !== ":" || value === "-" && peek() === "]") {
            value = `\\${value}`;
          }
          if (value === "]" && (prev.value === "[" || prev.value === "[^")) {
            value = `\\${value}`;
          }
          if (opts.posix === true && value === "!" && prev.value === "[") {
            value = "^";
          }
          prev.value += value;
          append({ value });
          continue;
        }
        if (state.quotes === 1 && value !== '"') {
          value = utils.escapeRegex(value);
          prev.value += value;
          append({ value });
          continue;
        }
        if (value === '"') {
          state.quotes = state.quotes === 1 ? 0 : 1;
          if (opts.keepQuotes === true) {
            push({ type: "text", value });
          }
          continue;
        }
        if (value === "(") {
          increment("parens");
          push({ type: "paren", value });
          continue;
        }
        if (value === ")") {
          if (state.parens === 0 && opts.strictBrackets === true) {
            throw new SyntaxError(syntaxError("opening", "("));
          }
          const extglob = extglobs[extglobs.length - 1];
          if (extglob && state.parens === extglob.parens + 1) {
            extglobClose(extglobs.pop());
            continue;
          }
          push({ type: "paren", value, output: state.parens ? ")" : "\\)" });
          decrement("parens");
          continue;
        }
        if (value === "[") {
          if (opts.nobracket === true || !remaining().includes("]")) {
            if (opts.nobracket !== true && opts.strictBrackets === true) {
              throw new SyntaxError(syntaxError("closing", "]"));
            }
            value = `\\${value}`;
          } else {
            increment("brackets");
          }
          push({ type: "bracket", value });
          continue;
        }
        if (value === "]") {
          if (opts.nobracket === true || prev && prev.type === "bracket" && prev.value.length === 1) {
            push({ type: "text", value, output: `\\${value}` });
            continue;
          }
          if (state.brackets === 0) {
            if (opts.strictBrackets === true) {
              throw new SyntaxError(syntaxError("opening", "["));
            }
            push({ type: "text", value, output: `\\${value}` });
            continue;
          }
          decrement("brackets");
          const prevValue = prev.value.slice(1);
          if (prev.posix !== true && prevValue[0] === "^" && !prevValue.includes("/")) {
            value = `/${value}`;
          }
          prev.value += value;
          append({ value });
          if (opts.literalBrackets === false || utils.hasRegexChars(prevValue)) {
            continue;
          }
          const escaped = utils.escapeRegex(prev.value);
          state.output = state.output.slice(0, -prev.value.length);
          if (opts.literalBrackets === true) {
            state.output += escaped;
            prev.value = escaped;
            continue;
          }
          prev.value = `(${capture}${escaped}|${prev.value})`;
          state.output += prev.value;
          continue;
        }
        if (value === "{" && opts.nobrace !== true) {
          increment("braces");
          const open = {
            type: "brace",
            value,
            output: "(",
            outputIndex: state.output.length,
            tokensIndex: state.tokens.length
          };
          braces.push(open);
          push(open);
          continue;
        }
        if (value === "}") {
          const brace = braces[braces.length - 1];
          if (opts.nobrace === true || !brace) {
            push({ type: "text", value, output: value });
            continue;
          }
          let output = ")";
          if (brace.dots === true) {
            const arr = tokens.slice();
            const range = [];
            for (let i = arr.length - 1; i >= 0; i--) {
              tokens.pop();
              if (arr[i].type === "brace") {
                break;
              }
              if (arr[i].type !== "dots") {
                range.unshift(arr[i].value);
              }
            }
            output = expandRange(range, opts);
            state.backtrack = true;
          }
          if (brace.comma !== true && brace.dots !== true) {
            const out = state.output.slice(0, brace.outputIndex);
            const toks = state.tokens.slice(brace.tokensIndex);
            brace.value = brace.output = "\\{";
            value = output = "\\}";
            state.output = out;
            for (const t of toks) {
              state.output += t.output || t.value;
            }
          }
          push({ type: "brace", value, output });
          decrement("braces");
          braces.pop();
          continue;
        }
        if (value === "|") {
          if (extglobs.length > 0) {
            extglobs[extglobs.length - 1].conditions++;
          }
          push({ type: "text", value });
          continue;
        }
        if (value === ",") {
          let output = value;
          const brace = braces[braces.length - 1];
          if (brace && stack[stack.length - 1] === "braces") {
            brace.comma = true;
            output = "|";
          }
          push({ type: "comma", value, output });
          continue;
        }
        if (value === "/") {
          if (prev.type === "dot" && state.index === state.start + 1) {
            state.start = state.index + 1;
            state.consumed = "";
            state.output = "";
            tokens.pop();
            prev = bos;
            continue;
          }
          push({ type: "slash", value, output: SLASH_LITERAL });
          continue;
        }
        if (value === ".") {
          if (state.braces > 0 && prev.type === "dot") {
            if (prev.value === ".")
              prev.output = DOT_LITERAL;
            const brace = braces[braces.length - 1];
            prev.type = "dots";
            prev.output += value;
            prev.value += value;
            brace.dots = true;
            continue;
          }
          if (state.braces + state.parens === 0 && prev.type !== "bos" && prev.type !== "slash") {
            push({ type: "text", value, output: DOT_LITERAL });
            continue;
          }
          push({ type: "dot", value, output: DOT_LITERAL });
          continue;
        }
        if (value === "?") {
          const isGroup = prev && prev.value === "(";
          if (!isGroup && opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
            extglobOpen("qmark", value);
            continue;
          }
          if (prev && prev.type === "paren") {
            const next = peek();
            let output = value;
            if (next === "<" && !utils.supportsLookbehinds()) {
              throw new Error("Node.js v10 or higher is required for regex lookbehinds");
            }
            if (prev.value === "(" && !/[!=<:]/.test(next) || next === "<" && !/<([!=]|\w+>)/.test(remaining())) {
              output = `\\${value}`;
            }
            push({ type: "text", value, output });
            continue;
          }
          if (opts.dot !== true && (prev.type === "slash" || prev.type === "bos")) {
            push({ type: "qmark", value, output: QMARK_NO_DOT });
            continue;
          }
          push({ type: "qmark", value, output: QMARK });
          continue;
        }
        if (value === "!") {
          if (opts.noextglob !== true && peek() === "(") {
            if (peek(2) !== "?" || !/[!=<:]/.test(peek(3))) {
              extglobOpen("negate", value);
              continue;
            }
          }
          if (opts.nonegate !== true && state.index === 0) {
            negate();
            continue;
          }
        }
        if (value === "+") {
          if (opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
            extglobOpen("plus", value);
            continue;
          }
          if (prev && prev.value === "(" || opts.regex === false) {
            push({ type: "plus", value, output: PLUS_LITERAL });
            continue;
          }
          if (prev && (prev.type === "bracket" || prev.type === "paren" || prev.type === "brace") || state.parens > 0) {
            push({ type: "plus", value });
            continue;
          }
          push({ type: "plus", value: PLUS_LITERAL });
          continue;
        }
        if (value === "@") {
          if (opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
            push({ type: "at", extglob: true, value, output: "" });
            continue;
          }
          push({ type: "text", value });
          continue;
        }
        if (value !== "*") {
          if (value === "$" || value === "^") {
            value = `\\${value}`;
          }
          const match = REGEX_NON_SPECIAL_CHARS.exec(remaining());
          if (match) {
            value += match[0];
            state.index += match[0].length;
          }
          push({ type: "text", value });
          continue;
        }
        if (prev && (prev.type === "globstar" || prev.star === true)) {
          prev.type = "star";
          prev.star = true;
          prev.value += value;
          prev.output = star;
          state.backtrack = true;
          state.globstar = true;
          consume(value);
          continue;
        }
        let rest = remaining();
        if (opts.noextglob !== true && /^\([^?]/.test(rest)) {
          extglobOpen("star", value);
          continue;
        }
        if (prev.type === "star") {
          if (opts.noglobstar === true) {
            consume(value);
            continue;
          }
          const prior = prev.prev;
          const before = prior.prev;
          const isStart = prior.type === "slash" || prior.type === "bos";
          const afterStar = before && (before.type === "star" || before.type === "globstar");
          if (opts.bash === true && (!isStart || rest[0] && rest[0] !== "/")) {
            push({ type: "star", value, output: "" });
            continue;
          }
          const isBrace = state.braces > 0 && (prior.type === "comma" || prior.type === "brace");
          const isExtglob = extglobs.length && (prior.type === "pipe" || prior.type === "paren");
          if (!isStart && prior.type !== "paren" && !isBrace && !isExtglob) {
            push({ type: "star", value, output: "" });
            continue;
          }
          while (rest.slice(0, 3) === "/**") {
            const after = input[state.index + 4];
            if (after && after !== "/") {
              break;
            }
            rest = rest.slice(3);
            consume("/**", 3);
          }
          if (prior.type === "bos" && eos()) {
            prev.type = "globstar";
            prev.value += value;
            prev.output = globstar(opts);
            state.output = prev.output;
            state.globstar = true;
            consume(value);
            continue;
          }
          if (prior.type === "slash" && prior.prev.type !== "bos" && !afterStar && eos()) {
            state.output = state.output.slice(0, -(prior.output + prev.output).length);
            prior.output = `(?:${prior.output}`;
            prev.type = "globstar";
            prev.output = globstar(opts) + (opts.strictSlashes ? ")" : "|$)");
            prev.value += value;
            state.globstar = true;
            state.output += prior.output + prev.output;
            consume(value);
            continue;
          }
          if (prior.type === "slash" && prior.prev.type !== "bos" && rest[0] === "/") {
            const end = rest[1] !== void 0 ? "|$" : "";
            state.output = state.output.slice(0, -(prior.output + prev.output).length);
            prior.output = `(?:${prior.output}`;
            prev.type = "globstar";
            prev.output = `${globstar(opts)}${SLASH_LITERAL}|${SLASH_LITERAL}${end})`;
            prev.value += value;
            state.output += prior.output + prev.output;
            state.globstar = true;
            consume(value + advance());
            push({ type: "slash", value: "/", output: "" });
            continue;
          }
          if (prior.type === "bos" && rest[0] === "/") {
            prev.type = "globstar";
            prev.value += value;
            prev.output = `(?:^|${SLASH_LITERAL}|${globstar(opts)}${SLASH_LITERAL})`;
            state.output = prev.output;
            state.globstar = true;
            consume(value + advance());
            push({ type: "slash", value: "/", output: "" });
            continue;
          }
          state.output = state.output.slice(0, -prev.output.length);
          prev.type = "globstar";
          prev.output = globstar(opts);
          prev.value += value;
          state.output += prev.output;
          state.globstar = true;
          consume(value);
          continue;
        }
        const token = { type: "star", value, output: star };
        if (opts.bash === true) {
          token.output = ".*?";
          if (prev.type === "bos" || prev.type === "slash") {
            token.output = nodot + token.output;
          }
          push(token);
          continue;
        }
        if (prev && (prev.type === "bracket" || prev.type === "paren") && opts.regex === true) {
          token.output = value;
          push(token);
          continue;
        }
        if (state.index === state.start || prev.type === "slash" || prev.type === "dot") {
          if (prev.type === "dot") {
            state.output += NO_DOT_SLASH;
            prev.output += NO_DOT_SLASH;
          } else if (opts.dot === true) {
            state.output += NO_DOTS_SLASH;
            prev.output += NO_DOTS_SLASH;
          } else {
            state.output += nodot;
            prev.output += nodot;
          }
          if (peek() !== "*") {
            state.output += ONE_CHAR;
            prev.output += ONE_CHAR;
          }
        }
        push(token);
      }
      while (state.brackets > 0) {
        if (opts.strictBrackets === true)
          throw new SyntaxError(syntaxError("closing", "]"));
        state.output = utils.escapeLast(state.output, "[");
        decrement("brackets");
      }
      while (state.parens > 0) {
        if (opts.strictBrackets === true)
          throw new SyntaxError(syntaxError("closing", ")"));
        state.output = utils.escapeLast(state.output, "(");
        decrement("parens");
      }
      while (state.braces > 0) {
        if (opts.strictBrackets === true)
          throw new SyntaxError(syntaxError("closing", "}"));
        state.output = utils.escapeLast(state.output, "{");
        decrement("braces");
      }
      if (opts.strictSlashes !== true && (prev.type === "star" || prev.type === "bracket")) {
        push({ type: "maybe_slash", value: "", output: `${SLASH_LITERAL}?` });
      }
      if (state.backtrack === true) {
        state.output = "";
        for (const token of state.tokens) {
          state.output += token.output != null ? token.output : token.value;
          if (token.suffix) {
            state.output += token.suffix;
          }
        }
      }
      return state;
    };
    parse.fastpaths = (input, options) => {
      const opts = { ...options };
      const max = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
      const len = input.length;
      if (len > max) {
        throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
      }
      input = REPLACEMENTS[input] || input;
      const win32 = utils.isWindows(options);
      const {
        DOT_LITERAL,
        SLASH_LITERAL,
        ONE_CHAR,
        DOTS_SLASH,
        NO_DOT,
        NO_DOTS,
        NO_DOTS_SLASH,
        STAR,
        START_ANCHOR
      } = constants.globChars(win32);
      const nodot = opts.dot ? NO_DOTS : NO_DOT;
      const slashDot = opts.dot ? NO_DOTS_SLASH : NO_DOT;
      const capture = opts.capture ? "" : "?:";
      const state = { negated: false, prefix: "" };
      let star = opts.bash === true ? ".*?" : STAR;
      if (opts.capture) {
        star = `(${star})`;
      }
      const globstar = (opts2) => {
        if (opts2.noglobstar === true)
          return star;
        return `(${capture}(?:(?!${START_ANCHOR}${opts2.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`;
      };
      const create = (str) => {
        switch (str) {
          case "*":
            return `${nodot}${ONE_CHAR}${star}`;
          case ".*":
            return `${DOT_LITERAL}${ONE_CHAR}${star}`;
          case "*.*":
            return `${nodot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`;
          case "*/*":
            return `${nodot}${star}${SLASH_LITERAL}${ONE_CHAR}${slashDot}${star}`;
          case "**":
            return nodot + globstar(opts);
          case "**/*":
            return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${ONE_CHAR}${star}`;
          case "**/*.*":
            return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`;
          case "**/.*":
            return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${DOT_LITERAL}${ONE_CHAR}${star}`;
          default: {
            const match = /^(.*?)\.(\w+)$/.exec(str);
            if (!match)
              return;
            const source2 = create(match[1]);
            if (!source2)
              return;
            return source2 + DOT_LITERAL + match[2];
          }
        }
      };
      const output = utils.removePrefix(input, state);
      let source = create(output);
      if (source && opts.strictSlashes !== true) {
        source += `${SLASH_LITERAL}?`;
      }
      return source;
    };
    module2.exports = parse;
  }
});

// node_modules/picomatch/lib/picomatch.js
var require_picomatch = __commonJS({
  "node_modules/picomatch/lib/picomatch.js"(exports2, module2) {
    "use strict";
    var path2 = require("path");
    var scan = require_scan();
    var parse = require_parse2();
    var utils = require_utils2();
    var constants = require_constants2();
    var isObject = (val) => val && typeof val === "object" && !Array.isArray(val);
    var picomatch = (glob2, options, returnState = false) => {
      if (Array.isArray(glob2)) {
        const fns = glob2.map((input) => picomatch(input, options, returnState));
        const arrayMatcher = (str) => {
          for (const isMatch of fns) {
            const state2 = isMatch(str);
            if (state2)
              return state2;
          }
          return false;
        };
        return arrayMatcher;
      }
      const isState = isObject(glob2) && glob2.tokens && glob2.input;
      if (glob2 === "" || typeof glob2 !== "string" && !isState) {
        throw new TypeError("Expected pattern to be a non-empty string");
      }
      const opts = options || {};
      const posix = utils.isWindows(options);
      const regex = isState ? picomatch.compileRe(glob2, options) : picomatch.makeRe(glob2, options, false, true);
      const state = regex.state;
      delete regex.state;
      let isIgnored = () => false;
      if (opts.ignore) {
        const ignoreOpts = { ...options, ignore: null, onMatch: null, onResult: null };
        isIgnored = picomatch(opts.ignore, ignoreOpts, returnState);
      }
      const matcher = (input, returnObject = false) => {
        const { isMatch, match, output } = picomatch.test(input, regex, options, { glob: glob2, posix });
        const result = { glob: glob2, state, regex, posix, input, output, match, isMatch };
        if (typeof opts.onResult === "function") {
          opts.onResult(result);
        }
        if (isMatch === false) {
          result.isMatch = false;
          return returnObject ? result : false;
        }
        if (isIgnored(input)) {
          if (typeof opts.onIgnore === "function") {
            opts.onIgnore(result);
          }
          result.isMatch = false;
          return returnObject ? result : false;
        }
        if (typeof opts.onMatch === "function") {
          opts.onMatch(result);
        }
        return returnObject ? result : true;
      };
      if (returnState) {
        matcher.state = state;
      }
      return matcher;
    };
    picomatch.test = (input, regex, options, { glob: glob2, posix } = {}) => {
      if (typeof input !== "string") {
        throw new TypeError("Expected input to be a string");
      }
      if (input === "") {
        return { isMatch: false, output: "" };
      }
      const opts = options || {};
      const format = opts.format || (posix ? utils.toPosixSlashes : null);
      let match = input === glob2;
      let output = match && format ? format(input) : input;
      if (match === false) {
        output = format ? format(input) : input;
        match = output === glob2;
      }
      if (match === false || opts.capture === true) {
        if (opts.matchBase === true || opts.basename === true) {
          match = picomatch.matchBase(input, regex, options, posix);
        } else {
          match = regex.exec(output);
        }
      }
      return { isMatch: Boolean(match), match, output };
    };
    picomatch.matchBase = (input, glob2, options, posix = utils.isWindows(options)) => {
      const regex = glob2 instanceof RegExp ? glob2 : picomatch.makeRe(glob2, options);
      return regex.test(path2.basename(input));
    };
    picomatch.isMatch = (str, patterns, options) => picomatch(patterns, options)(str);
    picomatch.parse = (pattern, options) => {
      if (Array.isArray(pattern))
        return pattern.map((p) => picomatch.parse(p, options));
      return parse(pattern, { ...options, fastpaths: false });
    };
    picomatch.scan = (input, options) => scan(input, options);
    picomatch.compileRe = (state, options, returnOutput = false, returnState = false) => {
      if (returnOutput === true) {
        return state.output;
      }
      const opts = options || {};
      const prepend = opts.contains ? "" : "^";
      const append = opts.contains ? "" : "$";
      let source = `${prepend}(?:${state.output})${append}`;
      if (state && state.negated === true) {
        source = `^(?!${source}).*$`;
      }
      const regex = picomatch.toRegex(source, options);
      if (returnState === true) {
        regex.state = state;
      }
      return regex;
    };
    picomatch.makeRe = (input, options = {}, returnOutput = false, returnState = false) => {
      if (!input || typeof input !== "string") {
        throw new TypeError("Expected a non-empty string");
      }
      let parsed = { negated: false, fastpaths: true };
      if (options.fastpaths !== false && (input[0] === "." || input[0] === "*")) {
        parsed.output = parse.fastpaths(input, options);
      }
      if (!parsed.output) {
        parsed = parse(input, options);
      }
      return picomatch.compileRe(parsed, options, returnOutput, returnState);
    };
    picomatch.toRegex = (source, options) => {
      try {
        const opts = options || {};
        return new RegExp(source, opts.flags || (opts.nocase ? "i" : ""));
      } catch (err) {
        if (options && options.debug === true)
          throw err;
        return /$^/;
      }
    };
    picomatch.constants = constants;
    module2.exports = picomatch;
  }
});

// node_modules/picomatch/index.js
var require_picomatch2 = __commonJS({
  "node_modules/picomatch/index.js"(exports2, module2) {
    "use strict";
    module2.exports = require_picomatch();
  }
});

// node_modules/micromatch/index.js
var require_micromatch = __commonJS({
  "node_modules/micromatch/index.js"(exports2, module2) {
    "use strict";
    var util = require("util");
    var braces = require_braces();
    var picomatch = require_picomatch2();
    var utils = require_utils2();
    var isEmptyString = (val) => val === "" || val === "./";
    var micromatch = (list, patterns, options) => {
      patterns = [].concat(patterns);
      list = [].concat(list);
      let omit = new Set();
      let keep = new Set();
      let items = new Set();
      let negatives = 0;
      let onResult = (state) => {
        items.add(state.output);
        if (options && options.onResult) {
          options.onResult(state);
        }
      };
      for (let i = 0; i < patterns.length; i++) {
        let isMatch = picomatch(String(patterns[i]), { ...options, onResult }, true);
        let negated = isMatch.state.negated || isMatch.state.negatedExtglob;
        if (negated)
          negatives++;
        for (let item of list) {
          let matched = isMatch(item, true);
          let match = negated ? !matched.isMatch : matched.isMatch;
          if (!match)
            continue;
          if (negated) {
            omit.add(matched.output);
          } else {
            omit.delete(matched.output);
            keep.add(matched.output);
          }
        }
      }
      let result = negatives === patterns.length ? [...items] : [...keep];
      let matches = result.filter((item) => !omit.has(item));
      if (options && matches.length === 0) {
        if (options.failglob === true) {
          throw new Error(`No matches found for "${patterns.join(", ")}"`);
        }
        if (options.nonull === true || options.nullglob === true) {
          return options.unescape ? patterns.map((p) => p.replace(/\\/g, "")) : patterns;
        }
      }
      return matches;
    };
    micromatch.match = micromatch;
    micromatch.matcher = (pattern, options) => picomatch(pattern, options);
    micromatch.isMatch = (str, patterns, options) => picomatch(patterns, options)(str);
    micromatch.any = micromatch.isMatch;
    micromatch.not = (list, patterns, options = {}) => {
      patterns = [].concat(patterns).map(String);
      let result = new Set();
      let items = [];
      let onResult = (state) => {
        if (options.onResult)
          options.onResult(state);
        items.push(state.output);
      };
      let matches = micromatch(list, patterns, { ...options, onResult });
      for (let item of items) {
        if (!matches.includes(item)) {
          result.add(item);
        }
      }
      return [...result];
    };
    micromatch.contains = (str, pattern, options) => {
      if (typeof str !== "string") {
        throw new TypeError(`Expected a string: "${util.inspect(str)}"`);
      }
      if (Array.isArray(pattern)) {
        return pattern.some((p) => micromatch.contains(str, p, options));
      }
      if (typeof pattern === "string") {
        if (isEmptyString(str) || isEmptyString(pattern)) {
          return false;
        }
        if (str.includes(pattern) || str.startsWith("./") && str.slice(2).includes(pattern)) {
          return true;
        }
      }
      return micromatch.isMatch(str, pattern, { ...options, contains: true });
    };
    micromatch.matchKeys = (obj, patterns, options) => {
      if (!utils.isObject(obj)) {
        throw new TypeError("Expected the first argument to be an object");
      }
      let keys = micromatch(Object.keys(obj), patterns, options);
      let res = {};
      for (let key of keys)
        res[key] = obj[key];
      return res;
    };
    micromatch.some = (list, patterns, options) => {
      let items = [].concat(list);
      for (let pattern of [].concat(patterns)) {
        let isMatch = picomatch(String(pattern), options);
        if (items.some((item) => isMatch(item))) {
          return true;
        }
      }
      return false;
    };
    micromatch.every = (list, patterns, options) => {
      let items = [].concat(list);
      for (let pattern of [].concat(patterns)) {
        let isMatch = picomatch(String(pattern), options);
        if (!items.every((item) => isMatch(item))) {
          return false;
        }
      }
      return true;
    };
    micromatch.all = (str, patterns, options) => {
      if (typeof str !== "string") {
        throw new TypeError(`Expected a string: "${util.inspect(str)}"`);
      }
      return [].concat(patterns).every((p) => picomatch(p, options)(str));
    };
    micromatch.capture = (glob2, input, options) => {
      let posix = utils.isWindows(options);
      let regex = picomatch.makeRe(String(glob2), { ...options, capture: true });
      let match = regex.exec(posix ? utils.toPosixSlashes(input) : input);
      if (match) {
        return match.slice(1).map((v) => v === void 0 ? "" : v);
      }
    };
    micromatch.makeRe = (...args) => picomatch.makeRe(...args);
    micromatch.scan = (...args) => picomatch.scan(...args);
    micromatch.parse = (patterns, options) => {
      let res = [];
      for (let pattern of [].concat(patterns || [])) {
        for (let str of braces(String(pattern), options)) {
          res.push(picomatch.parse(str, options));
        }
      }
      return res;
    };
    micromatch.braces = (pattern, options) => {
      if (typeof pattern !== "string")
        throw new TypeError("Expected a string");
      if (options && options.nobrace === true || !/\{.*\}/.test(pattern)) {
        return [pattern];
      }
      return braces(pattern, options);
    };
    micromatch.braceExpand = (pattern, options) => {
      if (typeof pattern !== "string")
        throw new TypeError("Expected a string");
      return micromatch.braces(pattern, { ...options, expand: true });
    };
    module2.exports = micromatch;
  }
});

// node_modules/fast-glob/out/utils/pattern.js
var require_pattern = __commonJS({
  "node_modules/fast-glob/out/utils/pattern.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.matchAny = exports2.convertPatternsToRe = exports2.makeRe = exports2.getPatternParts = exports2.expandBraceExpansion = exports2.expandPatternsWithBraceExpansion = exports2.isAffectDepthOfReadingPattern = exports2.endsWithSlashGlobStar = exports2.hasGlobStar = exports2.getBaseDirectory = exports2.isPatternRelatedToParentDirectory = exports2.getPatternsOutsideCurrentDirectory = exports2.getPatternsInsideCurrentDirectory = exports2.getPositivePatterns = exports2.getNegativePatterns = exports2.isPositivePattern = exports2.isNegativePattern = exports2.convertToNegativePattern = exports2.convertToPositivePattern = exports2.isDynamicPattern = exports2.isStaticPattern = void 0;
    var path2 = require("path");
    var globParent = require_glob_parent();
    var micromatch = require_micromatch();
    var GLOBSTAR = "**";
    var ESCAPE_SYMBOL = "\\";
    var COMMON_GLOB_SYMBOLS_RE = /[*?]|^!/;
    var REGEX_CHARACTER_CLASS_SYMBOLS_RE = /\[.*]/;
    var REGEX_GROUP_SYMBOLS_RE = /(?:^|[^!*+?@])\(.*\|.*\)/;
    var GLOB_EXTENSION_SYMBOLS_RE = /[!*+?@]\(.*\)/;
    var BRACE_EXPANSIONS_SYMBOLS_RE = /{.*(?:,|\.\.).*}/;
    function isStaticPattern(pattern, options = {}) {
      return !isDynamicPattern(pattern, options);
    }
    exports2.isStaticPattern = isStaticPattern;
    function isDynamicPattern(pattern, options = {}) {
      if (pattern === "") {
        return false;
      }
      if (options.caseSensitiveMatch === false || pattern.includes(ESCAPE_SYMBOL)) {
        return true;
      }
      if (COMMON_GLOB_SYMBOLS_RE.test(pattern) || REGEX_CHARACTER_CLASS_SYMBOLS_RE.test(pattern) || REGEX_GROUP_SYMBOLS_RE.test(pattern)) {
        return true;
      }
      if (options.extglob !== false && GLOB_EXTENSION_SYMBOLS_RE.test(pattern)) {
        return true;
      }
      if (options.braceExpansion !== false && BRACE_EXPANSIONS_SYMBOLS_RE.test(pattern)) {
        return true;
      }
      return false;
    }
    exports2.isDynamicPattern = isDynamicPattern;
    function convertToPositivePattern(pattern) {
      return isNegativePattern(pattern) ? pattern.slice(1) : pattern;
    }
    exports2.convertToPositivePattern = convertToPositivePattern;
    function convertToNegativePattern(pattern) {
      return "!" + pattern;
    }
    exports2.convertToNegativePattern = convertToNegativePattern;
    function isNegativePattern(pattern) {
      return pattern.startsWith("!") && pattern[1] !== "(";
    }
    exports2.isNegativePattern = isNegativePattern;
    function isPositivePattern(pattern) {
      return !isNegativePattern(pattern);
    }
    exports2.isPositivePattern = isPositivePattern;
    function getNegativePatterns(patterns) {
      return patterns.filter(isNegativePattern);
    }
    exports2.getNegativePatterns = getNegativePatterns;
    function getPositivePatterns(patterns) {
      return patterns.filter(isPositivePattern);
    }
    exports2.getPositivePatterns = getPositivePatterns;
    function getPatternsInsideCurrentDirectory(patterns) {
      return patterns.filter((pattern) => !isPatternRelatedToParentDirectory(pattern));
    }
    exports2.getPatternsInsideCurrentDirectory = getPatternsInsideCurrentDirectory;
    function getPatternsOutsideCurrentDirectory(patterns) {
      return patterns.filter(isPatternRelatedToParentDirectory);
    }
    exports2.getPatternsOutsideCurrentDirectory = getPatternsOutsideCurrentDirectory;
    function isPatternRelatedToParentDirectory(pattern) {
      return pattern.startsWith("..") || pattern.startsWith("./..");
    }
    exports2.isPatternRelatedToParentDirectory = isPatternRelatedToParentDirectory;
    function getBaseDirectory(pattern) {
      return globParent(pattern, { flipBackslashes: false });
    }
    exports2.getBaseDirectory = getBaseDirectory;
    function hasGlobStar(pattern) {
      return pattern.includes(GLOBSTAR);
    }
    exports2.hasGlobStar = hasGlobStar;
    function endsWithSlashGlobStar(pattern) {
      return pattern.endsWith("/" + GLOBSTAR);
    }
    exports2.endsWithSlashGlobStar = endsWithSlashGlobStar;
    function isAffectDepthOfReadingPattern(pattern) {
      const basename = path2.basename(pattern);
      return endsWithSlashGlobStar(pattern) || isStaticPattern(basename);
    }
    exports2.isAffectDepthOfReadingPattern = isAffectDepthOfReadingPattern;
    function expandPatternsWithBraceExpansion(patterns) {
      return patterns.reduce((collection, pattern) => {
        return collection.concat(expandBraceExpansion(pattern));
      }, []);
    }
    exports2.expandPatternsWithBraceExpansion = expandPatternsWithBraceExpansion;
    function expandBraceExpansion(pattern) {
      return micromatch.braces(pattern, {
        expand: true,
        nodupes: true
      });
    }
    exports2.expandBraceExpansion = expandBraceExpansion;
    function getPatternParts(pattern, options) {
      let { parts } = micromatch.scan(pattern, Object.assign(Object.assign({}, options), { parts: true }));
      if (parts.length === 0) {
        parts = [pattern];
      }
      if (parts[0].startsWith("/")) {
        parts[0] = parts[0].slice(1);
        parts.unshift("");
      }
      return parts;
    }
    exports2.getPatternParts = getPatternParts;
    function makeRe(pattern, options) {
      return micromatch.makeRe(pattern, options);
    }
    exports2.makeRe = makeRe;
    function convertPatternsToRe(patterns, options) {
      return patterns.map((pattern) => makeRe(pattern, options));
    }
    exports2.convertPatternsToRe = convertPatternsToRe;
    function matchAny(entry, patternsRe) {
      return patternsRe.some((patternRe) => patternRe.test(entry));
    }
    exports2.matchAny = matchAny;
  }
});

// node_modules/merge2/index.js
var require_merge2 = __commonJS({
  "node_modules/merge2/index.js"(exports2, module2) {
    "use strict";
    var Stream = require("stream");
    var PassThrough = Stream.PassThrough;
    var slice = Array.prototype.slice;
    module2.exports = merge2;
    function merge2() {
      const streamsQueue = [];
      const args = slice.call(arguments);
      let merging = false;
      let options = args[args.length - 1];
      if (options && !Array.isArray(options) && options.pipe == null) {
        args.pop();
      } else {
        options = {};
      }
      const doEnd = options.end !== false;
      const doPipeError = options.pipeError === true;
      if (options.objectMode == null) {
        options.objectMode = true;
      }
      if (options.highWaterMark == null) {
        options.highWaterMark = 64 * 1024;
      }
      const mergedStream = PassThrough(options);
      function addStream() {
        for (let i = 0, len = arguments.length; i < len; i++) {
          streamsQueue.push(pauseStreams(arguments[i], options));
        }
        mergeStream();
        return this;
      }
      function mergeStream() {
        if (merging) {
          return;
        }
        merging = true;
        let streams = streamsQueue.shift();
        if (!streams) {
          process.nextTick(endStream);
          return;
        }
        if (!Array.isArray(streams)) {
          streams = [streams];
        }
        let pipesCount = streams.length + 1;
        function next() {
          if (--pipesCount > 0) {
            return;
          }
          merging = false;
          mergeStream();
        }
        function pipe(stream) {
          function onend() {
            stream.removeListener("merge2UnpipeEnd", onend);
            stream.removeListener("end", onend);
            if (doPipeError) {
              stream.removeListener("error", onerror);
            }
            next();
          }
          function onerror(err) {
            mergedStream.emit("error", err);
          }
          if (stream._readableState.endEmitted) {
            return next();
          }
          stream.on("merge2UnpipeEnd", onend);
          stream.on("end", onend);
          if (doPipeError) {
            stream.on("error", onerror);
          }
          stream.pipe(mergedStream, { end: false });
          stream.resume();
        }
        for (let i = 0; i < streams.length; i++) {
          pipe(streams[i]);
        }
        next();
      }
      function endStream() {
        merging = false;
        mergedStream.emit("queueDrain");
        if (doEnd) {
          mergedStream.end();
        }
      }
      mergedStream.setMaxListeners(0);
      mergedStream.add = addStream;
      mergedStream.on("unpipe", function(stream) {
        stream.emit("merge2UnpipeEnd");
      });
      if (args.length) {
        addStream.apply(null, args);
      }
      return mergedStream;
    }
    function pauseStreams(streams, options) {
      if (!Array.isArray(streams)) {
        if (!streams._readableState && streams.pipe) {
          streams = streams.pipe(PassThrough(options));
        }
        if (!streams._readableState || !streams.pause || !streams.pipe) {
          throw new Error("Only readable stream can be merged.");
        }
        streams.pause();
      } else {
        for (let i = 0, len = streams.length; i < len; i++) {
          streams[i] = pauseStreams(streams[i], options);
        }
      }
      return streams;
    }
  }
});

// node_modules/fast-glob/out/utils/stream.js
var require_stream = __commonJS({
  "node_modules/fast-glob/out/utils/stream.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.merge = void 0;
    var merge2 = require_merge2();
    function merge(streams) {
      const mergedStream = merge2(streams);
      streams.forEach((stream) => {
        stream.once("error", (error) => mergedStream.emit("error", error));
      });
      mergedStream.once("close", () => propagateCloseEventToSources(streams));
      mergedStream.once("end", () => propagateCloseEventToSources(streams));
      return mergedStream;
    }
    exports2.merge = merge;
    function propagateCloseEventToSources(streams) {
      streams.forEach((stream) => stream.emit("close"));
    }
  }
});

// node_modules/fast-glob/out/utils/string.js
var require_string = __commonJS({
  "node_modules/fast-glob/out/utils/string.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.isEmpty = exports2.isString = void 0;
    function isString(input) {
      return typeof input === "string";
    }
    exports2.isString = isString;
    function isEmpty(input) {
      return input === "";
    }
    exports2.isEmpty = isEmpty;
  }
});

// node_modules/fast-glob/out/utils/index.js
var require_utils3 = __commonJS({
  "node_modules/fast-glob/out/utils/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.string = exports2.stream = exports2.pattern = exports2.path = exports2.fs = exports2.errno = exports2.array = void 0;
    var array = require_array();
    exports2.array = array;
    var errno = require_errno();
    exports2.errno = errno;
    var fs2 = require_fs();
    exports2.fs = fs2;
    var path2 = require_path();
    exports2.path = path2;
    var pattern = require_pattern();
    exports2.pattern = pattern;
    var stream = require_stream();
    exports2.stream = stream;
    var string = require_string();
    exports2.string = string;
  }
});

// node_modules/fast-glob/out/managers/tasks.js
var require_tasks = __commonJS({
  "node_modules/fast-glob/out/managers/tasks.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.convertPatternGroupToTask = exports2.convertPatternGroupsToTasks = exports2.groupPatternsByBaseDirectory = exports2.getNegativePatternsAsPositive = exports2.getPositivePatterns = exports2.convertPatternsToTasks = exports2.generate = void 0;
    var utils = require_utils3();
    function generate(patterns, settings) {
      const positivePatterns = getPositivePatterns(patterns);
      const negativePatterns = getNegativePatternsAsPositive(patterns, settings.ignore);
      const staticPatterns = positivePatterns.filter((pattern) => utils.pattern.isStaticPattern(pattern, settings));
      const dynamicPatterns = positivePatterns.filter((pattern) => utils.pattern.isDynamicPattern(pattern, settings));
      const staticTasks = convertPatternsToTasks(staticPatterns, negativePatterns, false);
      const dynamicTasks = convertPatternsToTasks(dynamicPatterns, negativePatterns, true);
      return staticTasks.concat(dynamicTasks);
    }
    exports2.generate = generate;
    function convertPatternsToTasks(positive, negative, dynamic) {
      const tasks = [];
      const patternsOutsideCurrentDirectory = utils.pattern.getPatternsOutsideCurrentDirectory(positive);
      const patternsInsideCurrentDirectory = utils.pattern.getPatternsInsideCurrentDirectory(positive);
      const outsideCurrentDirectoryGroup = groupPatternsByBaseDirectory(patternsOutsideCurrentDirectory);
      const insideCurrentDirectoryGroup = groupPatternsByBaseDirectory(patternsInsideCurrentDirectory);
      tasks.push(...convertPatternGroupsToTasks(outsideCurrentDirectoryGroup, negative, dynamic));
      if ("." in insideCurrentDirectoryGroup) {
        tasks.push(convertPatternGroupToTask(".", patternsInsideCurrentDirectory, negative, dynamic));
      } else {
        tasks.push(...convertPatternGroupsToTasks(insideCurrentDirectoryGroup, negative, dynamic));
      }
      return tasks;
    }
    exports2.convertPatternsToTasks = convertPatternsToTasks;
    function getPositivePatterns(patterns) {
      return utils.pattern.getPositivePatterns(patterns);
    }
    exports2.getPositivePatterns = getPositivePatterns;
    function getNegativePatternsAsPositive(patterns, ignore) {
      const negative = utils.pattern.getNegativePatterns(patterns).concat(ignore);
      const positive = negative.map(utils.pattern.convertToPositivePattern);
      return positive;
    }
    exports2.getNegativePatternsAsPositive = getNegativePatternsAsPositive;
    function groupPatternsByBaseDirectory(patterns) {
      const group = {};
      return patterns.reduce((collection, pattern) => {
        const base = utils.pattern.getBaseDirectory(pattern);
        if (base in collection) {
          collection[base].push(pattern);
        } else {
          collection[base] = [pattern];
        }
        return collection;
      }, group);
    }
    exports2.groupPatternsByBaseDirectory = groupPatternsByBaseDirectory;
    function convertPatternGroupsToTasks(positive, negative, dynamic) {
      return Object.keys(positive).map((base) => {
        return convertPatternGroupToTask(base, positive[base], negative, dynamic);
      });
    }
    exports2.convertPatternGroupsToTasks = convertPatternGroupsToTasks;
    function convertPatternGroupToTask(base, positive, negative, dynamic) {
      return {
        dynamic,
        positive,
        negative,
        base,
        patterns: [].concat(positive, negative.map(utils.pattern.convertToNegativePattern))
      };
    }
    exports2.convertPatternGroupToTask = convertPatternGroupToTask;
  }
});

// node_modules/@nodelib/fs.stat/out/providers/async.js
var require_async = __commonJS({
  "node_modules/@nodelib/fs.stat/out/providers/async.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.read = void 0;
    function read(path2, settings, callback) {
      settings.fs.lstat(path2, (lstatError, lstat) => {
        if (lstatError !== null) {
          callFailureCallback(callback, lstatError);
          return;
        }
        if (!lstat.isSymbolicLink() || !settings.followSymbolicLink) {
          callSuccessCallback(callback, lstat);
          return;
        }
        settings.fs.stat(path2, (statError, stat) => {
          if (statError !== null) {
            if (settings.throwErrorOnBrokenSymbolicLink) {
              callFailureCallback(callback, statError);
              return;
            }
            callSuccessCallback(callback, lstat);
            return;
          }
          if (settings.markSymbolicLink) {
            stat.isSymbolicLink = () => true;
          }
          callSuccessCallback(callback, stat);
        });
      });
    }
    exports2.read = read;
    function callFailureCallback(callback, error) {
      callback(error);
    }
    function callSuccessCallback(callback, result) {
      callback(null, result);
    }
  }
});

// node_modules/@nodelib/fs.stat/out/providers/sync.js
var require_sync = __commonJS({
  "node_modules/@nodelib/fs.stat/out/providers/sync.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.read = void 0;
    function read(path2, settings) {
      const lstat = settings.fs.lstatSync(path2);
      if (!lstat.isSymbolicLink() || !settings.followSymbolicLink) {
        return lstat;
      }
      try {
        const stat = settings.fs.statSync(path2);
        if (settings.markSymbolicLink) {
          stat.isSymbolicLink = () => true;
        }
        return stat;
      } catch (error) {
        if (!settings.throwErrorOnBrokenSymbolicLink) {
          return lstat;
        }
        throw error;
      }
    }
    exports2.read = read;
  }
});

// node_modules/@nodelib/fs.stat/out/adapters/fs.js
var require_fs2 = __commonJS({
  "node_modules/@nodelib/fs.stat/out/adapters/fs.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.createFileSystemAdapter = exports2.FILE_SYSTEM_ADAPTER = void 0;
    var fs2 = require("fs");
    exports2.FILE_SYSTEM_ADAPTER = {
      lstat: fs2.lstat,
      stat: fs2.stat,
      lstatSync: fs2.lstatSync,
      statSync: fs2.statSync
    };
    function createFileSystemAdapter(fsMethods) {
      if (fsMethods === void 0) {
        return exports2.FILE_SYSTEM_ADAPTER;
      }
      return Object.assign(Object.assign({}, exports2.FILE_SYSTEM_ADAPTER), fsMethods);
    }
    exports2.createFileSystemAdapter = createFileSystemAdapter;
  }
});

// node_modules/@nodelib/fs.stat/out/settings.js
var require_settings = __commonJS({
  "node_modules/@nodelib/fs.stat/out/settings.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var fs2 = require_fs2();
    var Settings = class {
      constructor(_options = {}) {
        this._options = _options;
        this.followSymbolicLink = this._getValue(this._options.followSymbolicLink, true);
        this.fs = fs2.createFileSystemAdapter(this._options.fs);
        this.markSymbolicLink = this._getValue(this._options.markSymbolicLink, false);
        this.throwErrorOnBrokenSymbolicLink = this._getValue(this._options.throwErrorOnBrokenSymbolicLink, true);
      }
      _getValue(option, value) {
        return option !== null && option !== void 0 ? option : value;
      }
    };
    exports2.default = Settings;
  }
});

// node_modules/@nodelib/fs.stat/out/index.js
var require_out = __commonJS({
  "node_modules/@nodelib/fs.stat/out/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.statSync = exports2.stat = exports2.Settings = void 0;
    var async = require_async();
    var sync = require_sync();
    var settings_1 = require_settings();
    exports2.Settings = settings_1.default;
    function stat(path2, optionsOrSettingsOrCallback, callback) {
      if (typeof optionsOrSettingsOrCallback === "function") {
        async.read(path2, getSettings(), optionsOrSettingsOrCallback);
        return;
      }
      async.read(path2, getSettings(optionsOrSettingsOrCallback), callback);
    }
    exports2.stat = stat;
    function statSync(path2, optionsOrSettings) {
      const settings = getSettings(optionsOrSettings);
      return sync.read(path2, settings);
    }
    exports2.statSync = statSync;
    function getSettings(settingsOrOptions = {}) {
      if (settingsOrOptions instanceof settings_1.default) {
        return settingsOrOptions;
      }
      return new settings_1.default(settingsOrOptions);
    }
  }
});

// node_modules/queue-microtask/index.js
var require_queue_microtask = __commonJS({
  "node_modules/queue-microtask/index.js"(exports2, module2) {
    var promise;
    module2.exports = typeof queueMicrotask === "function" ? queueMicrotask.bind(typeof window !== "undefined" ? window : global) : (cb) => (promise || (promise = Promise.resolve())).then(cb).catch((err) => setTimeout(() => {
      throw err;
    }, 0));
  }
});

// node_modules/run-parallel/index.js
var require_run_parallel = __commonJS({
  "node_modules/run-parallel/index.js"(exports2, module2) {
    module2.exports = runParallel;
    var queueMicrotask2 = require_queue_microtask();
    function runParallel(tasks, cb) {
      let results, pending, keys;
      let isSync = true;
      if (Array.isArray(tasks)) {
        results = [];
        pending = tasks.length;
      } else {
        keys = Object.keys(tasks);
        results = {};
        pending = keys.length;
      }
      function done(err) {
        function end() {
          if (cb)
            cb(err, results);
          cb = null;
        }
        if (isSync)
          queueMicrotask2(end);
        else
          end();
      }
      function each(i, err, result) {
        results[i] = result;
        if (--pending === 0 || err) {
          done(err);
        }
      }
      if (!pending) {
        done(null);
      } else if (keys) {
        keys.forEach(function(key) {
          tasks[key](function(err, result) {
            each(key, err, result);
          });
        });
      } else {
        tasks.forEach(function(task, i) {
          task(function(err, result) {
            each(i, err, result);
          });
        });
      }
      isSync = false;
    }
  }
});

// node_modules/@nodelib/fs.scandir/out/constants.js
var require_constants3 = __commonJS({
  "node_modules/@nodelib/fs.scandir/out/constants.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.IS_SUPPORT_READDIR_WITH_FILE_TYPES = void 0;
    var NODE_PROCESS_VERSION_PARTS = process.versions.node.split(".");
    if (NODE_PROCESS_VERSION_PARTS[0] === void 0 || NODE_PROCESS_VERSION_PARTS[1] === void 0) {
      throw new Error(`Unexpected behavior. The 'process.versions.node' variable has invalid value: ${process.versions.node}`);
    }
    var MAJOR_VERSION = Number.parseInt(NODE_PROCESS_VERSION_PARTS[0], 10);
    var MINOR_VERSION = Number.parseInt(NODE_PROCESS_VERSION_PARTS[1], 10);
    var SUPPORTED_MAJOR_VERSION = 10;
    var SUPPORTED_MINOR_VERSION = 10;
    var IS_MATCHED_BY_MAJOR = MAJOR_VERSION > SUPPORTED_MAJOR_VERSION;
    var IS_MATCHED_BY_MAJOR_AND_MINOR = MAJOR_VERSION === SUPPORTED_MAJOR_VERSION && MINOR_VERSION >= SUPPORTED_MINOR_VERSION;
    exports2.IS_SUPPORT_READDIR_WITH_FILE_TYPES = IS_MATCHED_BY_MAJOR || IS_MATCHED_BY_MAJOR_AND_MINOR;
  }
});

// node_modules/@nodelib/fs.scandir/out/utils/fs.js
var require_fs3 = __commonJS({
  "node_modules/@nodelib/fs.scandir/out/utils/fs.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.createDirentFromStats = void 0;
    var DirentFromStats = class {
      constructor(name, stats) {
        this.name = name;
        this.isBlockDevice = stats.isBlockDevice.bind(stats);
        this.isCharacterDevice = stats.isCharacterDevice.bind(stats);
        this.isDirectory = stats.isDirectory.bind(stats);
        this.isFIFO = stats.isFIFO.bind(stats);
        this.isFile = stats.isFile.bind(stats);
        this.isSocket = stats.isSocket.bind(stats);
        this.isSymbolicLink = stats.isSymbolicLink.bind(stats);
      }
    };
    function createDirentFromStats(name, stats) {
      return new DirentFromStats(name, stats);
    }
    exports2.createDirentFromStats = createDirentFromStats;
  }
});

// node_modules/@nodelib/fs.scandir/out/utils/index.js
var require_utils4 = __commonJS({
  "node_modules/@nodelib/fs.scandir/out/utils/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.fs = void 0;
    var fs2 = require_fs3();
    exports2.fs = fs2;
  }
});

// node_modules/@nodelib/fs.scandir/out/providers/common.js
var require_common = __commonJS({
  "node_modules/@nodelib/fs.scandir/out/providers/common.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.joinPathSegments = void 0;
    function joinPathSegments(a, b, separator) {
      if (a.endsWith(separator)) {
        return a + b;
      }
      return a + separator + b;
    }
    exports2.joinPathSegments = joinPathSegments;
  }
});

// node_modules/@nodelib/fs.scandir/out/providers/async.js
var require_async2 = __commonJS({
  "node_modules/@nodelib/fs.scandir/out/providers/async.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.readdir = exports2.readdirWithFileTypes = exports2.read = void 0;
    var fsStat = require_out();
    var rpl = require_run_parallel();
    var constants_1 = require_constants3();
    var utils = require_utils4();
    var common = require_common();
    function read(directory, settings, callback) {
      if (!settings.stats && constants_1.IS_SUPPORT_READDIR_WITH_FILE_TYPES) {
        readdirWithFileTypes(directory, settings, callback);
        return;
      }
      readdir(directory, settings, callback);
    }
    exports2.read = read;
    function readdirWithFileTypes(directory, settings, callback) {
      settings.fs.readdir(directory, { withFileTypes: true }, (readdirError, dirents) => {
        if (readdirError !== null) {
          callFailureCallback(callback, readdirError);
          return;
        }
        const entries = dirents.map((dirent) => ({
          dirent,
          name: dirent.name,
          path: common.joinPathSegments(directory, dirent.name, settings.pathSegmentSeparator)
        }));
        if (!settings.followSymbolicLinks) {
          callSuccessCallback(callback, entries);
          return;
        }
        const tasks = entries.map((entry) => makeRplTaskEntry(entry, settings));
        rpl(tasks, (rplError, rplEntries) => {
          if (rplError !== null) {
            callFailureCallback(callback, rplError);
            return;
          }
          callSuccessCallback(callback, rplEntries);
        });
      });
    }
    exports2.readdirWithFileTypes = readdirWithFileTypes;
    function makeRplTaskEntry(entry, settings) {
      return (done) => {
        if (!entry.dirent.isSymbolicLink()) {
          done(null, entry);
          return;
        }
        settings.fs.stat(entry.path, (statError, stats) => {
          if (statError !== null) {
            if (settings.throwErrorOnBrokenSymbolicLink) {
              done(statError);
              return;
            }
            done(null, entry);
            return;
          }
          entry.dirent = utils.fs.createDirentFromStats(entry.name, stats);
          done(null, entry);
        });
      };
    }
    function readdir(directory, settings, callback) {
      settings.fs.readdir(directory, (readdirError, names) => {
        if (readdirError !== null) {
          callFailureCallback(callback, readdirError);
          return;
        }
        const tasks = names.map((name) => {
          const path2 = common.joinPathSegments(directory, name, settings.pathSegmentSeparator);
          return (done) => {
            fsStat.stat(path2, settings.fsStatSettings, (error, stats) => {
              if (error !== null) {
                done(error);
                return;
              }
              const entry = {
                name,
                path: path2,
                dirent: utils.fs.createDirentFromStats(name, stats)
              };
              if (settings.stats) {
                entry.stats = stats;
              }
              done(null, entry);
            });
          };
        });
        rpl(tasks, (rplError, entries) => {
          if (rplError !== null) {
            callFailureCallback(callback, rplError);
            return;
          }
          callSuccessCallback(callback, entries);
        });
      });
    }
    exports2.readdir = readdir;
    function callFailureCallback(callback, error) {
      callback(error);
    }
    function callSuccessCallback(callback, result) {
      callback(null, result);
    }
  }
});

// node_modules/@nodelib/fs.scandir/out/providers/sync.js
var require_sync2 = __commonJS({
  "node_modules/@nodelib/fs.scandir/out/providers/sync.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.readdir = exports2.readdirWithFileTypes = exports2.read = void 0;
    var fsStat = require_out();
    var constants_1 = require_constants3();
    var utils = require_utils4();
    var common = require_common();
    function read(directory, settings) {
      if (!settings.stats && constants_1.IS_SUPPORT_READDIR_WITH_FILE_TYPES) {
        return readdirWithFileTypes(directory, settings);
      }
      return readdir(directory, settings);
    }
    exports2.read = read;
    function readdirWithFileTypes(directory, settings) {
      const dirents = settings.fs.readdirSync(directory, { withFileTypes: true });
      return dirents.map((dirent) => {
        const entry = {
          dirent,
          name: dirent.name,
          path: common.joinPathSegments(directory, dirent.name, settings.pathSegmentSeparator)
        };
        if (entry.dirent.isSymbolicLink() && settings.followSymbolicLinks) {
          try {
            const stats = settings.fs.statSync(entry.path);
            entry.dirent = utils.fs.createDirentFromStats(entry.name, stats);
          } catch (error) {
            if (settings.throwErrorOnBrokenSymbolicLink) {
              throw error;
            }
          }
        }
        return entry;
      });
    }
    exports2.readdirWithFileTypes = readdirWithFileTypes;
    function readdir(directory, settings) {
      const names = settings.fs.readdirSync(directory);
      return names.map((name) => {
        const entryPath = common.joinPathSegments(directory, name, settings.pathSegmentSeparator);
        const stats = fsStat.statSync(entryPath, settings.fsStatSettings);
        const entry = {
          name,
          path: entryPath,
          dirent: utils.fs.createDirentFromStats(name, stats)
        };
        if (settings.stats) {
          entry.stats = stats;
        }
        return entry;
      });
    }
    exports2.readdir = readdir;
  }
});

// node_modules/@nodelib/fs.scandir/out/adapters/fs.js
var require_fs4 = __commonJS({
  "node_modules/@nodelib/fs.scandir/out/adapters/fs.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.createFileSystemAdapter = exports2.FILE_SYSTEM_ADAPTER = void 0;
    var fs2 = require("fs");
    exports2.FILE_SYSTEM_ADAPTER = {
      lstat: fs2.lstat,
      stat: fs2.stat,
      lstatSync: fs2.lstatSync,
      statSync: fs2.statSync,
      readdir: fs2.readdir,
      readdirSync: fs2.readdirSync
    };
    function createFileSystemAdapter(fsMethods) {
      if (fsMethods === void 0) {
        return exports2.FILE_SYSTEM_ADAPTER;
      }
      return Object.assign(Object.assign({}, exports2.FILE_SYSTEM_ADAPTER), fsMethods);
    }
    exports2.createFileSystemAdapter = createFileSystemAdapter;
  }
});

// node_modules/@nodelib/fs.scandir/out/settings.js
var require_settings2 = __commonJS({
  "node_modules/@nodelib/fs.scandir/out/settings.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var path2 = require("path");
    var fsStat = require_out();
    var fs2 = require_fs4();
    var Settings = class {
      constructor(_options = {}) {
        this._options = _options;
        this.followSymbolicLinks = this._getValue(this._options.followSymbolicLinks, false);
        this.fs = fs2.createFileSystemAdapter(this._options.fs);
        this.pathSegmentSeparator = this._getValue(this._options.pathSegmentSeparator, path2.sep);
        this.stats = this._getValue(this._options.stats, false);
        this.throwErrorOnBrokenSymbolicLink = this._getValue(this._options.throwErrorOnBrokenSymbolicLink, true);
        this.fsStatSettings = new fsStat.Settings({
          followSymbolicLink: this.followSymbolicLinks,
          fs: this.fs,
          throwErrorOnBrokenSymbolicLink: this.throwErrorOnBrokenSymbolicLink
        });
      }
      _getValue(option, value) {
        return option !== null && option !== void 0 ? option : value;
      }
    };
    exports2.default = Settings;
  }
});

// node_modules/@nodelib/fs.scandir/out/index.js
var require_out2 = __commonJS({
  "node_modules/@nodelib/fs.scandir/out/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Settings = exports2.scandirSync = exports2.scandir = void 0;
    var async = require_async2();
    var sync = require_sync2();
    var settings_1 = require_settings2();
    exports2.Settings = settings_1.default;
    function scandir(path2, optionsOrSettingsOrCallback, callback) {
      if (typeof optionsOrSettingsOrCallback === "function") {
        async.read(path2, getSettings(), optionsOrSettingsOrCallback);
        return;
      }
      async.read(path2, getSettings(optionsOrSettingsOrCallback), callback);
    }
    exports2.scandir = scandir;
    function scandirSync(path2, optionsOrSettings) {
      const settings = getSettings(optionsOrSettings);
      return sync.read(path2, settings);
    }
    exports2.scandirSync = scandirSync;
    function getSettings(settingsOrOptions = {}) {
      if (settingsOrOptions instanceof settings_1.default) {
        return settingsOrOptions;
      }
      return new settings_1.default(settingsOrOptions);
    }
  }
});

// node_modules/reusify/reusify.js
var require_reusify = __commonJS({
  "node_modules/reusify/reusify.js"(exports2, module2) {
    "use strict";
    function reusify(Constructor) {
      var head = new Constructor();
      var tail = head;
      function get() {
        var current = head;
        if (current.next) {
          head = current.next;
        } else {
          head = new Constructor();
          tail = head;
        }
        current.next = null;
        return current;
      }
      function release(obj) {
        tail.next = obj;
        tail = obj;
      }
      return {
        get,
        release
      };
    }
    module2.exports = reusify;
  }
});

// node_modules/fastq/queue.js
var require_queue = __commonJS({
  "node_modules/fastq/queue.js"(exports2, module2) {
    "use strict";
    var reusify = require_reusify();
    function fastqueue(context, worker, concurrency) {
      if (typeof context === "function") {
        concurrency = worker;
        worker = context;
        context = null;
      }
      if (concurrency < 1) {
        throw new Error("fastqueue concurrency must be greater than 1");
      }
      var cache = reusify(Task);
      var queueHead = null;
      var queueTail = null;
      var _running = 0;
      var errorHandler = null;
      var self = {
        push,
        drain: noop,
        saturated: noop,
        pause,
        paused: false,
        concurrency,
        running,
        resume,
        idle,
        length,
        getQueue,
        unshift,
        empty: noop,
        kill,
        killAndDrain,
        error
      };
      return self;
      function running() {
        return _running;
      }
      function pause() {
        self.paused = true;
      }
      function length() {
        var current = queueHead;
        var counter = 0;
        while (current) {
          current = current.next;
          counter++;
        }
        return counter;
      }
      function getQueue() {
        var current = queueHead;
        var tasks = [];
        while (current) {
          tasks.push(current.value);
          current = current.next;
        }
        return tasks;
      }
      function resume() {
        if (!self.paused)
          return;
        self.paused = false;
        for (var i = 0; i < self.concurrency; i++) {
          _running++;
          release();
        }
      }
      function idle() {
        return _running === 0 && self.length() === 0;
      }
      function push(value, done) {
        var current = cache.get();
        current.context = context;
        current.release = release;
        current.value = value;
        current.callback = done || noop;
        current.errorHandler = errorHandler;
        if (_running === self.concurrency || self.paused) {
          if (queueTail) {
            queueTail.next = current;
            queueTail = current;
          } else {
            queueHead = current;
            queueTail = current;
            self.saturated();
          }
        } else {
          _running++;
          worker.call(context, current.value, current.worked);
        }
      }
      function unshift(value, done) {
        var current = cache.get();
        current.context = context;
        current.release = release;
        current.value = value;
        current.callback = done || noop;
        if (_running === self.concurrency || self.paused) {
          if (queueHead) {
            current.next = queueHead;
            queueHead = current;
          } else {
            queueHead = current;
            queueTail = current;
            self.saturated();
          }
        } else {
          _running++;
          worker.call(context, current.value, current.worked);
        }
      }
      function release(holder) {
        if (holder) {
          cache.release(holder);
        }
        var next = queueHead;
        if (next) {
          if (!self.paused) {
            if (queueTail === queueHead) {
              queueTail = null;
            }
            queueHead = next.next;
            next.next = null;
            worker.call(context, next.value, next.worked);
            if (queueTail === null) {
              self.empty();
            }
          } else {
            _running--;
          }
        } else if (--_running === 0) {
          self.drain();
        }
      }
      function kill() {
        queueHead = null;
        queueTail = null;
        self.drain = noop;
      }
      function killAndDrain() {
        queueHead = null;
        queueTail = null;
        self.drain();
        self.drain = noop;
      }
      function error(handler) {
        errorHandler = handler;
      }
    }
    function noop() {
    }
    function Task() {
      this.value = null;
      this.callback = noop;
      this.next = null;
      this.release = noop;
      this.context = null;
      this.errorHandler = null;
      var self = this;
      this.worked = function worked(err, result) {
        var callback = self.callback;
        var errorHandler = self.errorHandler;
        var val = self.value;
        self.value = null;
        self.callback = noop;
        if (self.errorHandler) {
          errorHandler(err, val);
        }
        callback.call(self.context, err, result);
        self.release(self);
      };
    }
    function queueAsPromised(context, worker, concurrency) {
      if (typeof context === "function") {
        concurrency = worker;
        worker = context;
        context = null;
      }
      function asyncWrapper(arg, cb) {
        worker.call(this, arg).then(function(res) {
          cb(null, res);
        }, cb);
      }
      var queue = fastqueue(context, asyncWrapper, concurrency);
      var pushCb = queue.push;
      var unshiftCb = queue.unshift;
      queue.push = push;
      queue.unshift = unshift;
      queue.drained = drained;
      return queue;
      function push(value) {
        var p = new Promise(function(resolve, reject) {
          pushCb(value, function(err, result) {
            if (err) {
              reject(err);
              return;
            }
            resolve(result);
          });
        });
        p.catch(noop);
        return p;
      }
      function unshift(value) {
        var p = new Promise(function(resolve, reject) {
          unshiftCb(value, function(err, result) {
            if (err) {
              reject(err);
              return;
            }
            resolve(result);
          });
        });
        p.catch(noop);
        return p;
      }
      function drained() {
        var previousDrain = queue.drain;
        var p = new Promise(function(resolve) {
          queue.drain = function() {
            previousDrain();
            resolve();
          };
        });
        return p;
      }
    }
    module2.exports = fastqueue;
    module2.exports.promise = queueAsPromised;
  }
});

// node_modules/@nodelib/fs.walk/out/readers/common.js
var require_common2 = __commonJS({
  "node_modules/@nodelib/fs.walk/out/readers/common.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.joinPathSegments = exports2.replacePathSegmentSeparator = exports2.isAppliedFilter = exports2.isFatalError = void 0;
    function isFatalError(settings, error) {
      if (settings.errorFilter === null) {
        return true;
      }
      return !settings.errorFilter(error);
    }
    exports2.isFatalError = isFatalError;
    function isAppliedFilter(filter, value) {
      return filter === null || filter(value);
    }
    exports2.isAppliedFilter = isAppliedFilter;
    function replacePathSegmentSeparator(filepath, separator) {
      return filepath.split(/[/\\]/).join(separator);
    }
    exports2.replacePathSegmentSeparator = replacePathSegmentSeparator;
    function joinPathSegments(a, b, separator) {
      if (a === "") {
        return b;
      }
      if (a.endsWith(separator)) {
        return a + b;
      }
      return a + separator + b;
    }
    exports2.joinPathSegments = joinPathSegments;
  }
});

// node_modules/@nodelib/fs.walk/out/readers/reader.js
var require_reader = __commonJS({
  "node_modules/@nodelib/fs.walk/out/readers/reader.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var common = require_common2();
    var Reader = class {
      constructor(_root, _settings) {
        this._root = _root;
        this._settings = _settings;
        this._root = common.replacePathSegmentSeparator(_root, _settings.pathSegmentSeparator);
      }
    };
    exports2.default = Reader;
  }
});

// node_modules/@nodelib/fs.walk/out/readers/async.js
var require_async3 = __commonJS({
  "node_modules/@nodelib/fs.walk/out/readers/async.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var events_1 = require("events");
    var fsScandir = require_out2();
    var fastq = require_queue();
    var common = require_common2();
    var reader_1 = require_reader();
    var AsyncReader = class extends reader_1.default {
      constructor(_root, _settings) {
        super(_root, _settings);
        this._settings = _settings;
        this._scandir = fsScandir.scandir;
        this._emitter = new events_1.EventEmitter();
        this._queue = fastq(this._worker.bind(this), this._settings.concurrency);
        this._isFatalError = false;
        this._isDestroyed = false;
        this._queue.drain = () => {
          if (!this._isFatalError) {
            this._emitter.emit("end");
          }
        };
      }
      read() {
        this._isFatalError = false;
        this._isDestroyed = false;
        setImmediate(() => {
          this._pushToQueue(this._root, this._settings.basePath);
        });
        return this._emitter;
      }
      get isDestroyed() {
        return this._isDestroyed;
      }
      destroy() {
        if (this._isDestroyed) {
          throw new Error("The reader is already destroyed");
        }
        this._isDestroyed = true;
        this._queue.killAndDrain();
      }
      onEntry(callback) {
        this._emitter.on("entry", callback);
      }
      onError(callback) {
        this._emitter.once("error", callback);
      }
      onEnd(callback) {
        this._emitter.once("end", callback);
      }
      _pushToQueue(directory, base) {
        const queueItem = { directory, base };
        this._queue.push(queueItem, (error) => {
          if (error !== null) {
            this._handleError(error);
          }
        });
      }
      _worker(item, done) {
        this._scandir(item.directory, this._settings.fsScandirSettings, (error, entries) => {
          if (error !== null) {
            done(error, void 0);
            return;
          }
          for (const entry of entries) {
            this._handleEntry(entry, item.base);
          }
          done(null, void 0);
        });
      }
      _handleError(error) {
        if (this._isDestroyed || !common.isFatalError(this._settings, error)) {
          return;
        }
        this._isFatalError = true;
        this._isDestroyed = true;
        this._emitter.emit("error", error);
      }
      _handleEntry(entry, base) {
        if (this._isDestroyed || this._isFatalError) {
          return;
        }
        const fullpath = entry.path;
        if (base !== void 0) {
          entry.path = common.joinPathSegments(base, entry.name, this._settings.pathSegmentSeparator);
        }
        if (common.isAppliedFilter(this._settings.entryFilter, entry)) {
          this._emitEntry(entry);
        }
        if (entry.dirent.isDirectory() && common.isAppliedFilter(this._settings.deepFilter, entry)) {
          this._pushToQueue(fullpath, base === void 0 ? void 0 : entry.path);
        }
      }
      _emitEntry(entry) {
        this._emitter.emit("entry", entry);
      }
    };
    exports2.default = AsyncReader;
  }
});

// node_modules/@nodelib/fs.walk/out/providers/async.js
var require_async4 = __commonJS({
  "node_modules/@nodelib/fs.walk/out/providers/async.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var async_1 = require_async3();
    var AsyncProvider = class {
      constructor(_root, _settings) {
        this._root = _root;
        this._settings = _settings;
        this._reader = new async_1.default(this._root, this._settings);
        this._storage = [];
      }
      read(callback) {
        this._reader.onError((error) => {
          callFailureCallback(callback, error);
        });
        this._reader.onEntry((entry) => {
          this._storage.push(entry);
        });
        this._reader.onEnd(() => {
          callSuccessCallback(callback, this._storage);
        });
        this._reader.read();
      }
    };
    exports2.default = AsyncProvider;
    function callFailureCallback(callback, error) {
      callback(error);
    }
    function callSuccessCallback(callback, entries) {
      callback(null, entries);
    }
  }
});

// node_modules/@nodelib/fs.walk/out/providers/stream.js
var require_stream2 = __commonJS({
  "node_modules/@nodelib/fs.walk/out/providers/stream.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var stream_1 = require("stream");
    var async_1 = require_async3();
    var StreamProvider = class {
      constructor(_root, _settings) {
        this._root = _root;
        this._settings = _settings;
        this._reader = new async_1.default(this._root, this._settings);
        this._stream = new stream_1.Readable({
          objectMode: true,
          read: () => {
          },
          destroy: () => {
            if (!this._reader.isDestroyed) {
              this._reader.destroy();
            }
          }
        });
      }
      read() {
        this._reader.onError((error) => {
          this._stream.emit("error", error);
        });
        this._reader.onEntry((entry) => {
          this._stream.push(entry);
        });
        this._reader.onEnd(() => {
          this._stream.push(null);
        });
        this._reader.read();
        return this._stream;
      }
    };
    exports2.default = StreamProvider;
  }
});

// node_modules/@nodelib/fs.walk/out/readers/sync.js
var require_sync3 = __commonJS({
  "node_modules/@nodelib/fs.walk/out/readers/sync.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var fsScandir = require_out2();
    var common = require_common2();
    var reader_1 = require_reader();
    var SyncReader = class extends reader_1.default {
      constructor() {
        super(...arguments);
        this._scandir = fsScandir.scandirSync;
        this._storage = [];
        this._queue = new Set();
      }
      read() {
        this._pushToQueue(this._root, this._settings.basePath);
        this._handleQueue();
        return this._storage;
      }
      _pushToQueue(directory, base) {
        this._queue.add({ directory, base });
      }
      _handleQueue() {
        for (const item of this._queue.values()) {
          this._handleDirectory(item.directory, item.base);
        }
      }
      _handleDirectory(directory, base) {
        try {
          const entries = this._scandir(directory, this._settings.fsScandirSettings);
          for (const entry of entries) {
            this._handleEntry(entry, base);
          }
        } catch (error) {
          this._handleError(error);
        }
      }
      _handleError(error) {
        if (!common.isFatalError(this._settings, error)) {
          return;
        }
        throw error;
      }
      _handleEntry(entry, base) {
        const fullpath = entry.path;
        if (base !== void 0) {
          entry.path = common.joinPathSegments(base, entry.name, this._settings.pathSegmentSeparator);
        }
        if (common.isAppliedFilter(this._settings.entryFilter, entry)) {
          this._pushToStorage(entry);
        }
        if (entry.dirent.isDirectory() && common.isAppliedFilter(this._settings.deepFilter, entry)) {
          this._pushToQueue(fullpath, base === void 0 ? void 0 : entry.path);
        }
      }
      _pushToStorage(entry) {
        this._storage.push(entry);
      }
    };
    exports2.default = SyncReader;
  }
});

// node_modules/@nodelib/fs.walk/out/providers/sync.js
var require_sync4 = __commonJS({
  "node_modules/@nodelib/fs.walk/out/providers/sync.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var sync_1 = require_sync3();
    var SyncProvider = class {
      constructor(_root, _settings) {
        this._root = _root;
        this._settings = _settings;
        this._reader = new sync_1.default(this._root, this._settings);
      }
      read() {
        return this._reader.read();
      }
    };
    exports2.default = SyncProvider;
  }
});

// node_modules/@nodelib/fs.walk/out/settings.js
var require_settings3 = __commonJS({
  "node_modules/@nodelib/fs.walk/out/settings.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var path2 = require("path");
    var fsScandir = require_out2();
    var Settings = class {
      constructor(_options = {}) {
        this._options = _options;
        this.basePath = this._getValue(this._options.basePath, void 0);
        this.concurrency = this._getValue(this._options.concurrency, Number.POSITIVE_INFINITY);
        this.deepFilter = this._getValue(this._options.deepFilter, null);
        this.entryFilter = this._getValue(this._options.entryFilter, null);
        this.errorFilter = this._getValue(this._options.errorFilter, null);
        this.pathSegmentSeparator = this._getValue(this._options.pathSegmentSeparator, path2.sep);
        this.fsScandirSettings = new fsScandir.Settings({
          followSymbolicLinks: this._options.followSymbolicLinks,
          fs: this._options.fs,
          pathSegmentSeparator: this._options.pathSegmentSeparator,
          stats: this._options.stats,
          throwErrorOnBrokenSymbolicLink: this._options.throwErrorOnBrokenSymbolicLink
        });
      }
      _getValue(option, value) {
        return option !== null && option !== void 0 ? option : value;
      }
    };
    exports2.default = Settings;
  }
});

// node_modules/@nodelib/fs.walk/out/index.js
var require_out3 = __commonJS({
  "node_modules/@nodelib/fs.walk/out/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Settings = exports2.walkStream = exports2.walkSync = exports2.walk = void 0;
    var async_1 = require_async4();
    var stream_1 = require_stream2();
    var sync_1 = require_sync4();
    var settings_1 = require_settings3();
    exports2.Settings = settings_1.default;
    function walk(directory, optionsOrSettingsOrCallback, callback) {
      if (typeof optionsOrSettingsOrCallback === "function") {
        new async_1.default(directory, getSettings()).read(optionsOrSettingsOrCallback);
        return;
      }
      new async_1.default(directory, getSettings(optionsOrSettingsOrCallback)).read(callback);
    }
    exports2.walk = walk;
    function walkSync(directory, optionsOrSettings) {
      const settings = getSettings(optionsOrSettings);
      const provider = new sync_1.default(directory, settings);
      return provider.read();
    }
    exports2.walkSync = walkSync;
    function walkStream(directory, optionsOrSettings) {
      const settings = getSettings(optionsOrSettings);
      const provider = new stream_1.default(directory, settings);
      return provider.read();
    }
    exports2.walkStream = walkStream;
    function getSettings(settingsOrOptions = {}) {
      if (settingsOrOptions instanceof settings_1.default) {
        return settingsOrOptions;
      }
      return new settings_1.default(settingsOrOptions);
    }
  }
});

// node_modules/fast-glob/out/readers/reader.js
var require_reader2 = __commonJS({
  "node_modules/fast-glob/out/readers/reader.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var path2 = require("path");
    var fsStat = require_out();
    var utils = require_utils3();
    var Reader = class {
      constructor(_settings) {
        this._settings = _settings;
        this._fsStatSettings = new fsStat.Settings({
          followSymbolicLink: this._settings.followSymbolicLinks,
          fs: this._settings.fs,
          throwErrorOnBrokenSymbolicLink: this._settings.followSymbolicLinks
        });
      }
      _getFullEntryPath(filepath) {
        return path2.resolve(this._settings.cwd, filepath);
      }
      _makeEntry(stats, pattern) {
        const entry = {
          name: pattern,
          path: pattern,
          dirent: utils.fs.createDirentFromStats(pattern, stats)
        };
        if (this._settings.stats) {
          entry.stats = stats;
        }
        return entry;
      }
      _isFatalError(error) {
        return !utils.errno.isEnoentCodeError(error) && !this._settings.suppressErrors;
      }
    };
    exports2.default = Reader;
  }
});

// node_modules/fast-glob/out/readers/stream.js
var require_stream3 = __commonJS({
  "node_modules/fast-glob/out/readers/stream.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var stream_1 = require("stream");
    var fsStat = require_out();
    var fsWalk = require_out3();
    var reader_1 = require_reader2();
    var ReaderStream = class extends reader_1.default {
      constructor() {
        super(...arguments);
        this._walkStream = fsWalk.walkStream;
        this._stat = fsStat.stat;
      }
      dynamic(root, options) {
        return this._walkStream(root, options);
      }
      static(patterns, options) {
        const filepaths = patterns.map(this._getFullEntryPath, this);
        const stream = new stream_1.PassThrough({ objectMode: true });
        stream._write = (index, _enc, done) => {
          return this._getEntry(filepaths[index], patterns[index], options).then((entry) => {
            if (entry !== null && options.entryFilter(entry)) {
              stream.push(entry);
            }
            if (index === filepaths.length - 1) {
              stream.end();
            }
            done();
          }).catch(done);
        };
        for (let i = 0; i < filepaths.length; i++) {
          stream.write(i);
        }
        return stream;
      }
      _getEntry(filepath, pattern, options) {
        return this._getStat(filepath).then((stats) => this._makeEntry(stats, pattern)).catch((error) => {
          if (options.errorFilter(error)) {
            return null;
          }
          throw error;
        });
      }
      _getStat(filepath) {
        return new Promise((resolve, reject) => {
          this._stat(filepath, this._fsStatSettings, (error, stats) => {
            return error === null ? resolve(stats) : reject(error);
          });
        });
      }
    };
    exports2.default = ReaderStream;
  }
});

// node_modules/fast-glob/out/providers/matchers/matcher.js
var require_matcher = __commonJS({
  "node_modules/fast-glob/out/providers/matchers/matcher.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var utils = require_utils3();
    var Matcher = class {
      constructor(_patterns, _settings, _micromatchOptions) {
        this._patterns = _patterns;
        this._settings = _settings;
        this._micromatchOptions = _micromatchOptions;
        this._storage = [];
        this._fillStorage();
      }
      _fillStorage() {
        const patterns = utils.pattern.expandPatternsWithBraceExpansion(this._patterns);
        for (const pattern of patterns) {
          const segments = this._getPatternSegments(pattern);
          const sections = this._splitSegmentsIntoSections(segments);
          this._storage.push({
            complete: sections.length <= 1,
            pattern,
            segments,
            sections
          });
        }
      }
      _getPatternSegments(pattern) {
        const parts = utils.pattern.getPatternParts(pattern, this._micromatchOptions);
        return parts.map((part) => {
          const dynamic = utils.pattern.isDynamicPattern(part, this._settings);
          if (!dynamic) {
            return {
              dynamic: false,
              pattern: part
            };
          }
          return {
            dynamic: true,
            pattern: part,
            patternRe: utils.pattern.makeRe(part, this._micromatchOptions)
          };
        });
      }
      _splitSegmentsIntoSections(segments) {
        return utils.array.splitWhen(segments, (segment) => segment.dynamic && utils.pattern.hasGlobStar(segment.pattern));
      }
    };
    exports2.default = Matcher;
  }
});

// node_modules/fast-glob/out/providers/matchers/partial.js
var require_partial = __commonJS({
  "node_modules/fast-glob/out/providers/matchers/partial.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var matcher_1 = require_matcher();
    var PartialMatcher = class extends matcher_1.default {
      match(filepath) {
        const parts = filepath.split("/");
        const levels = parts.length;
        const patterns = this._storage.filter((info) => !info.complete || info.segments.length > levels);
        for (const pattern of patterns) {
          const section = pattern.sections[0];
          if (!pattern.complete && levels > section.length) {
            return true;
          }
          const match = parts.every((part, index) => {
            const segment = pattern.segments[index];
            if (segment.dynamic && segment.patternRe.test(part)) {
              return true;
            }
            if (!segment.dynamic && segment.pattern === part) {
              return true;
            }
            return false;
          });
          if (match) {
            return true;
          }
        }
        return false;
      }
    };
    exports2.default = PartialMatcher;
  }
});

// node_modules/fast-glob/out/providers/filters/deep.js
var require_deep = __commonJS({
  "node_modules/fast-glob/out/providers/filters/deep.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var utils = require_utils3();
    var partial_1 = require_partial();
    var DeepFilter = class {
      constructor(_settings, _micromatchOptions) {
        this._settings = _settings;
        this._micromatchOptions = _micromatchOptions;
      }
      getFilter(basePath, positive, negative) {
        const matcher = this._getMatcher(positive);
        const negativeRe = this._getNegativePatternsRe(negative);
        return (entry) => this._filter(basePath, entry, matcher, negativeRe);
      }
      _getMatcher(patterns) {
        return new partial_1.default(patterns, this._settings, this._micromatchOptions);
      }
      _getNegativePatternsRe(patterns) {
        const affectDepthOfReadingPatterns = patterns.filter(utils.pattern.isAffectDepthOfReadingPattern);
        return utils.pattern.convertPatternsToRe(affectDepthOfReadingPatterns, this._micromatchOptions);
      }
      _filter(basePath, entry, matcher, negativeRe) {
        if (this._isSkippedByDeep(basePath, entry.path)) {
          return false;
        }
        if (this._isSkippedSymbolicLink(entry)) {
          return false;
        }
        const filepath = utils.path.removeLeadingDotSegment(entry.path);
        if (this._isSkippedByPositivePatterns(filepath, matcher)) {
          return false;
        }
        return this._isSkippedByNegativePatterns(filepath, negativeRe);
      }
      _isSkippedByDeep(basePath, entryPath) {
        if (this._settings.deep === Infinity) {
          return false;
        }
        return this._getEntryLevel(basePath, entryPath) >= this._settings.deep;
      }
      _getEntryLevel(basePath, entryPath) {
        const entryPathDepth = entryPath.split("/").length;
        if (basePath === "") {
          return entryPathDepth;
        }
        const basePathDepth = basePath.split("/").length;
        return entryPathDepth - basePathDepth;
      }
      _isSkippedSymbolicLink(entry) {
        return !this._settings.followSymbolicLinks && entry.dirent.isSymbolicLink();
      }
      _isSkippedByPositivePatterns(entryPath, matcher) {
        return !this._settings.baseNameMatch && !matcher.match(entryPath);
      }
      _isSkippedByNegativePatterns(entryPath, patternsRe) {
        return !utils.pattern.matchAny(entryPath, patternsRe);
      }
    };
    exports2.default = DeepFilter;
  }
});

// node_modules/fast-glob/out/providers/filters/entry.js
var require_entry = __commonJS({
  "node_modules/fast-glob/out/providers/filters/entry.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var utils = require_utils3();
    var EntryFilter = class {
      constructor(_settings, _micromatchOptions) {
        this._settings = _settings;
        this._micromatchOptions = _micromatchOptions;
        this.index = new Map();
      }
      getFilter(positive, negative) {
        const positiveRe = utils.pattern.convertPatternsToRe(positive, this._micromatchOptions);
        const negativeRe = utils.pattern.convertPatternsToRe(negative, this._micromatchOptions);
        return (entry) => this._filter(entry, positiveRe, negativeRe);
      }
      _filter(entry, positiveRe, negativeRe) {
        if (this._settings.unique && this._isDuplicateEntry(entry)) {
          return false;
        }
        if (this._onlyFileFilter(entry) || this._onlyDirectoryFilter(entry)) {
          return false;
        }
        if (this._isSkippedByAbsoluteNegativePatterns(entry.path, negativeRe)) {
          return false;
        }
        const filepath = this._settings.baseNameMatch ? entry.name : entry.path;
        const isMatched = this._isMatchToPatterns(filepath, positiveRe) && !this._isMatchToPatterns(entry.path, negativeRe);
        if (this._settings.unique && isMatched) {
          this._createIndexRecord(entry);
        }
        return isMatched;
      }
      _isDuplicateEntry(entry) {
        return this.index.has(entry.path);
      }
      _createIndexRecord(entry) {
        this.index.set(entry.path, void 0);
      }
      _onlyFileFilter(entry) {
        return this._settings.onlyFiles && !entry.dirent.isFile();
      }
      _onlyDirectoryFilter(entry) {
        return this._settings.onlyDirectories && !entry.dirent.isDirectory();
      }
      _isSkippedByAbsoluteNegativePatterns(entryPath, patternsRe) {
        if (!this._settings.absolute) {
          return false;
        }
        const fullpath = utils.path.makeAbsolute(this._settings.cwd, entryPath);
        return utils.pattern.matchAny(fullpath, patternsRe);
      }
      _isMatchToPatterns(entryPath, patternsRe) {
        const filepath = utils.path.removeLeadingDotSegment(entryPath);
        return utils.pattern.matchAny(filepath, patternsRe);
      }
    };
    exports2.default = EntryFilter;
  }
});

// node_modules/fast-glob/out/providers/filters/error.js
var require_error = __commonJS({
  "node_modules/fast-glob/out/providers/filters/error.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var utils = require_utils3();
    var ErrorFilter = class {
      constructor(_settings) {
        this._settings = _settings;
      }
      getFilter() {
        return (error) => this._isNonFatalError(error);
      }
      _isNonFatalError(error) {
        return utils.errno.isEnoentCodeError(error) || this._settings.suppressErrors;
      }
    };
    exports2.default = ErrorFilter;
  }
});

// node_modules/fast-glob/out/providers/transformers/entry.js
var require_entry2 = __commonJS({
  "node_modules/fast-glob/out/providers/transformers/entry.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var utils = require_utils3();
    var EntryTransformer = class {
      constructor(_settings) {
        this._settings = _settings;
      }
      getTransformer() {
        return (entry) => this._transform(entry);
      }
      _transform(entry) {
        let filepath = entry.path;
        if (this._settings.absolute) {
          filepath = utils.path.makeAbsolute(this._settings.cwd, filepath);
          filepath = utils.path.unixify(filepath);
        }
        if (this._settings.markDirectories && entry.dirent.isDirectory()) {
          filepath += "/";
        }
        if (!this._settings.objectMode) {
          return filepath;
        }
        return Object.assign(Object.assign({}, entry), { path: filepath });
      }
    };
    exports2.default = EntryTransformer;
  }
});

// node_modules/fast-glob/out/providers/provider.js
var require_provider = __commonJS({
  "node_modules/fast-glob/out/providers/provider.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var path2 = require("path");
    var deep_1 = require_deep();
    var entry_1 = require_entry();
    var error_1 = require_error();
    var entry_2 = require_entry2();
    var Provider = class {
      constructor(_settings) {
        this._settings = _settings;
        this.errorFilter = new error_1.default(this._settings);
        this.entryFilter = new entry_1.default(this._settings, this._getMicromatchOptions());
        this.deepFilter = new deep_1.default(this._settings, this._getMicromatchOptions());
        this.entryTransformer = new entry_2.default(this._settings);
      }
      _getRootDirectory(task) {
        return path2.resolve(this._settings.cwd, task.base);
      }
      _getReaderOptions(task) {
        const basePath = task.base === "." ? "" : task.base;
        return {
          basePath,
          pathSegmentSeparator: "/",
          concurrency: this._settings.concurrency,
          deepFilter: this.deepFilter.getFilter(basePath, task.positive, task.negative),
          entryFilter: this.entryFilter.getFilter(task.positive, task.negative),
          errorFilter: this.errorFilter.getFilter(),
          followSymbolicLinks: this._settings.followSymbolicLinks,
          fs: this._settings.fs,
          stats: this._settings.stats,
          throwErrorOnBrokenSymbolicLink: this._settings.throwErrorOnBrokenSymbolicLink,
          transform: this.entryTransformer.getTransformer()
        };
      }
      _getMicromatchOptions() {
        return {
          dot: this._settings.dot,
          matchBase: this._settings.baseNameMatch,
          nobrace: !this._settings.braceExpansion,
          nocase: !this._settings.caseSensitiveMatch,
          noext: !this._settings.extglob,
          noglobstar: !this._settings.globstar,
          posix: true,
          strictSlashes: false
        };
      }
    };
    exports2.default = Provider;
  }
});

// node_modules/fast-glob/out/providers/async.js
var require_async5 = __commonJS({
  "node_modules/fast-glob/out/providers/async.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var stream_1 = require_stream3();
    var provider_1 = require_provider();
    var ProviderAsync = class extends provider_1.default {
      constructor() {
        super(...arguments);
        this._reader = new stream_1.default(this._settings);
      }
      read(task) {
        const root = this._getRootDirectory(task);
        const options = this._getReaderOptions(task);
        const entries = [];
        return new Promise((resolve, reject) => {
          const stream = this.api(root, task, options);
          stream.once("error", reject);
          stream.on("data", (entry) => entries.push(options.transform(entry)));
          stream.once("end", () => resolve(entries));
        });
      }
      api(root, task, options) {
        if (task.dynamic) {
          return this._reader.dynamic(root, options);
        }
        return this._reader.static(task.patterns, options);
      }
    };
    exports2.default = ProviderAsync;
  }
});

// node_modules/fast-glob/out/providers/stream.js
var require_stream4 = __commonJS({
  "node_modules/fast-glob/out/providers/stream.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var stream_1 = require("stream");
    var stream_2 = require_stream3();
    var provider_1 = require_provider();
    var ProviderStream = class extends provider_1.default {
      constructor() {
        super(...arguments);
        this._reader = new stream_2.default(this._settings);
      }
      read(task) {
        const root = this._getRootDirectory(task);
        const options = this._getReaderOptions(task);
        const source = this.api(root, task, options);
        const destination = new stream_1.Readable({ objectMode: true, read: () => {
        } });
        source.once("error", (error) => destination.emit("error", error)).on("data", (entry) => destination.emit("data", options.transform(entry))).once("end", () => destination.emit("end"));
        destination.once("close", () => source.destroy());
        return destination;
      }
      api(root, task, options) {
        if (task.dynamic) {
          return this._reader.dynamic(root, options);
        }
        return this._reader.static(task.patterns, options);
      }
    };
    exports2.default = ProviderStream;
  }
});

// node_modules/fast-glob/out/readers/sync.js
var require_sync5 = __commonJS({
  "node_modules/fast-glob/out/readers/sync.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var fsStat = require_out();
    var fsWalk = require_out3();
    var reader_1 = require_reader2();
    var ReaderSync = class extends reader_1.default {
      constructor() {
        super(...arguments);
        this._walkSync = fsWalk.walkSync;
        this._statSync = fsStat.statSync;
      }
      dynamic(root, options) {
        return this._walkSync(root, options);
      }
      static(patterns, options) {
        const entries = [];
        for (const pattern of patterns) {
          const filepath = this._getFullEntryPath(pattern);
          const entry = this._getEntry(filepath, pattern, options);
          if (entry === null || !options.entryFilter(entry)) {
            continue;
          }
          entries.push(entry);
        }
        return entries;
      }
      _getEntry(filepath, pattern, options) {
        try {
          const stats = this._getStat(filepath);
          return this._makeEntry(stats, pattern);
        } catch (error) {
          if (options.errorFilter(error)) {
            return null;
          }
          throw error;
        }
      }
      _getStat(filepath) {
        return this._statSync(filepath, this._fsStatSettings);
      }
    };
    exports2.default = ReaderSync;
  }
});

// node_modules/fast-glob/out/providers/sync.js
var require_sync6 = __commonJS({
  "node_modules/fast-glob/out/providers/sync.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var sync_1 = require_sync5();
    var provider_1 = require_provider();
    var ProviderSync = class extends provider_1.default {
      constructor() {
        super(...arguments);
        this._reader = new sync_1.default(this._settings);
      }
      read(task) {
        const root = this._getRootDirectory(task);
        const options = this._getReaderOptions(task);
        const entries = this.api(root, task, options);
        return entries.map(options.transform);
      }
      api(root, task, options) {
        if (task.dynamic) {
          return this._reader.dynamic(root, options);
        }
        return this._reader.static(task.patterns, options);
      }
    };
    exports2.default = ProviderSync;
  }
});

// node_modules/fast-glob/out/settings.js
var require_settings4 = __commonJS({
  "node_modules/fast-glob/out/settings.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.DEFAULT_FILE_SYSTEM_ADAPTER = void 0;
    var fs2 = require("fs");
    var os = require("os");
    var CPU_COUNT = Math.max(os.cpus().length, 1);
    exports2.DEFAULT_FILE_SYSTEM_ADAPTER = {
      lstat: fs2.lstat,
      lstatSync: fs2.lstatSync,
      stat: fs2.stat,
      statSync: fs2.statSync,
      readdir: fs2.readdir,
      readdirSync: fs2.readdirSync
    };
    var Settings = class {
      constructor(_options = {}) {
        this._options = _options;
        this.absolute = this._getValue(this._options.absolute, false);
        this.baseNameMatch = this._getValue(this._options.baseNameMatch, false);
        this.braceExpansion = this._getValue(this._options.braceExpansion, true);
        this.caseSensitiveMatch = this._getValue(this._options.caseSensitiveMatch, true);
        this.concurrency = this._getValue(this._options.concurrency, CPU_COUNT);
        this.cwd = this._getValue(this._options.cwd, process.cwd());
        this.deep = this._getValue(this._options.deep, Infinity);
        this.dot = this._getValue(this._options.dot, false);
        this.extglob = this._getValue(this._options.extglob, true);
        this.followSymbolicLinks = this._getValue(this._options.followSymbolicLinks, true);
        this.fs = this._getFileSystemMethods(this._options.fs);
        this.globstar = this._getValue(this._options.globstar, true);
        this.ignore = this._getValue(this._options.ignore, []);
        this.markDirectories = this._getValue(this._options.markDirectories, false);
        this.objectMode = this._getValue(this._options.objectMode, false);
        this.onlyDirectories = this._getValue(this._options.onlyDirectories, false);
        this.onlyFiles = this._getValue(this._options.onlyFiles, true);
        this.stats = this._getValue(this._options.stats, false);
        this.suppressErrors = this._getValue(this._options.suppressErrors, false);
        this.throwErrorOnBrokenSymbolicLink = this._getValue(this._options.throwErrorOnBrokenSymbolicLink, false);
        this.unique = this._getValue(this._options.unique, true);
        if (this.onlyDirectories) {
          this.onlyFiles = false;
        }
        if (this.stats) {
          this.objectMode = true;
        }
      }
      _getValue(option, value) {
        return option === void 0 ? value : option;
      }
      _getFileSystemMethods(methods = {}) {
        return Object.assign(Object.assign({}, exports2.DEFAULT_FILE_SYSTEM_ADAPTER), methods);
      }
    };
    exports2.default = Settings;
  }
});

// node_modules/fast-glob/out/index.js
var require_out4 = __commonJS({
  "node_modules/fast-glob/out/index.js"(exports2, module2) {
    "use strict";
    var taskManager = require_tasks();
    var async_1 = require_async5();
    var stream_1 = require_stream4();
    var sync_1 = require_sync6();
    var settings_1 = require_settings4();
    var utils = require_utils3();
    async function FastGlob(source, options) {
      assertPatternsInput(source);
      const works = getWorks(source, async_1.default, options);
      const result = await Promise.all(works);
      return utils.array.flatten(result);
    }
    (function(FastGlob2) {
      function sync(source, options) {
        assertPatternsInput(source);
        const works = getWorks(source, sync_1.default, options);
        return utils.array.flatten(works);
      }
      FastGlob2.sync = sync;
      function stream(source, options) {
        assertPatternsInput(source);
        const works = getWorks(source, stream_1.default, options);
        return utils.stream.merge(works);
      }
      FastGlob2.stream = stream;
      function generateTasks(source, options) {
        assertPatternsInput(source);
        const patterns = [].concat(source);
        const settings = new settings_1.default(options);
        return taskManager.generate(patterns, settings);
      }
      FastGlob2.generateTasks = generateTasks;
      function isDynamicPattern(source, options) {
        assertPatternsInput(source);
        const settings = new settings_1.default(options);
        return utils.pattern.isDynamicPattern(source, settings);
      }
      FastGlob2.isDynamicPattern = isDynamicPattern;
      function escapePath(source) {
        assertPatternsInput(source);
        return utils.path.escape(source);
      }
      FastGlob2.escapePath = escapePath;
    })(FastGlob || (FastGlob = {}));
    function getWorks(source, _Provider, options) {
      const patterns = [].concat(source);
      const settings = new settings_1.default(options);
      const tasks = taskManager.generate(patterns, settings);
      const provider = new _Provider(settings);
      return tasks.map(provider.read, provider);
    }
    function assertPatternsInput(input) {
      const source = [].concat(input);
      const isValidSource = source.every((item) => utils.string.isString(item) && !utils.string.isEmpty(item));
      if (!isValidSource) {
        throw new TypeError("Patterns must be a string (non empty) or an array of strings");
      }
    }
    module2.exports = FastGlob;
  }
});

// node_modules/universalify/index.js
var require_universalify = __commonJS({
  "node_modules/universalify/index.js"(exports2) {
    "use strict";
    exports2.fromCallback = function(fn) {
      return Object.defineProperty(function(...args) {
        if (typeof args[args.length - 1] === "function")
          fn.apply(this, args);
        else {
          return new Promise((resolve, reject) => {
            fn.call(this, ...args, (err, res) => err != null ? reject(err) : resolve(res));
          });
        }
      }, "name", { value: fn.name });
    };
    exports2.fromPromise = function(fn) {
      return Object.defineProperty(function(...args) {
        const cb = args[args.length - 1];
        if (typeof cb !== "function")
          return fn.apply(this, args);
        else
          fn.apply(this, args.slice(0, -1)).then((r) => cb(null, r), cb);
      }, "name", { value: fn.name });
    };
  }
});

// node_modules/graceful-fs/polyfills.js
var require_polyfills = __commonJS({
  "node_modules/graceful-fs/polyfills.js"(exports2, module2) {
    var constants = require("constants");
    var origCwd = process.cwd;
    var cwd = null;
    var platform = process.env.GRACEFUL_FS_PLATFORM || process.platform;
    process.cwd = function() {
      if (!cwd)
        cwd = origCwd.call(process);
      return cwd;
    };
    try {
      process.cwd();
    } catch (er) {
    }
    if (typeof process.chdir === "function") {
      chdir = process.chdir;
      process.chdir = function(d) {
        cwd = null;
        chdir.call(process, d);
      };
      if (Object.setPrototypeOf)
        Object.setPrototypeOf(process.chdir, chdir);
    }
    var chdir;
    module2.exports = patch;
    function patch(fs2) {
      if (constants.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./)) {
        patchLchmod(fs2);
      }
      if (!fs2.lutimes) {
        patchLutimes(fs2);
      }
      fs2.chown = chownFix(fs2.chown);
      fs2.fchown = chownFix(fs2.fchown);
      fs2.lchown = chownFix(fs2.lchown);
      fs2.chmod = chmodFix(fs2.chmod);
      fs2.fchmod = chmodFix(fs2.fchmod);
      fs2.lchmod = chmodFix(fs2.lchmod);
      fs2.chownSync = chownFixSync(fs2.chownSync);
      fs2.fchownSync = chownFixSync(fs2.fchownSync);
      fs2.lchownSync = chownFixSync(fs2.lchownSync);
      fs2.chmodSync = chmodFixSync(fs2.chmodSync);
      fs2.fchmodSync = chmodFixSync(fs2.fchmodSync);
      fs2.lchmodSync = chmodFixSync(fs2.lchmodSync);
      fs2.stat = statFix(fs2.stat);
      fs2.fstat = statFix(fs2.fstat);
      fs2.lstat = statFix(fs2.lstat);
      fs2.statSync = statFixSync(fs2.statSync);
      fs2.fstatSync = statFixSync(fs2.fstatSync);
      fs2.lstatSync = statFixSync(fs2.lstatSync);
      if (!fs2.lchmod) {
        fs2.lchmod = function(path2, mode, cb) {
          if (cb)
            process.nextTick(cb);
        };
        fs2.lchmodSync = function() {
        };
      }
      if (!fs2.lchown) {
        fs2.lchown = function(path2, uid, gid, cb) {
          if (cb)
            process.nextTick(cb);
        };
        fs2.lchownSync = function() {
        };
      }
      if (platform === "win32") {
        fs2.rename = function(fs$rename) {
          return function(from, to, cb) {
            var start = Date.now();
            var backoff = 0;
            fs$rename(from, to, function CB(er) {
              if (er && (er.code === "EACCES" || er.code === "EPERM") && Date.now() - start < 6e4) {
                setTimeout(function() {
                  fs2.stat(to, function(stater, st) {
                    if (stater && stater.code === "ENOENT")
                      fs$rename(from, to, CB);
                    else
                      cb(er);
                  });
                }, backoff);
                if (backoff < 100)
                  backoff += 10;
                return;
              }
              if (cb)
                cb(er);
            });
          };
        }(fs2.rename);
      }
      fs2.read = function(fs$read) {
        function read(fd, buffer, offset, length, position, callback_) {
          var callback;
          if (callback_ && typeof callback_ === "function") {
            var eagCounter = 0;
            callback = function(er, _, __) {
              if (er && er.code === "EAGAIN" && eagCounter < 10) {
                eagCounter++;
                return fs$read.call(fs2, fd, buffer, offset, length, position, callback);
              }
              callback_.apply(this, arguments);
            };
          }
          return fs$read.call(fs2, fd, buffer, offset, length, position, callback);
        }
        if (Object.setPrototypeOf)
          Object.setPrototypeOf(read, fs$read);
        return read;
      }(fs2.read);
      fs2.readSync = function(fs$readSync) {
        return function(fd, buffer, offset, length, position) {
          var eagCounter = 0;
          while (true) {
            try {
              return fs$readSync.call(fs2, fd, buffer, offset, length, position);
            } catch (er) {
              if (er.code === "EAGAIN" && eagCounter < 10) {
                eagCounter++;
                continue;
              }
              throw er;
            }
          }
        };
      }(fs2.readSync);
      function patchLchmod(fs3) {
        fs3.lchmod = function(path2, mode, callback) {
          fs3.open(path2, constants.O_WRONLY | constants.O_SYMLINK, mode, function(err, fd) {
            if (err) {
              if (callback)
                callback(err);
              return;
            }
            fs3.fchmod(fd, mode, function(err2) {
              fs3.close(fd, function(err22) {
                if (callback)
                  callback(err2 || err22);
              });
            });
          });
        };
        fs3.lchmodSync = function(path2, mode) {
          var fd = fs3.openSync(path2, constants.O_WRONLY | constants.O_SYMLINK, mode);
          var threw = true;
          var ret;
          try {
            ret = fs3.fchmodSync(fd, mode);
            threw = false;
          } finally {
            if (threw) {
              try {
                fs3.closeSync(fd);
              } catch (er) {
              }
            } else {
              fs3.closeSync(fd);
            }
          }
          return ret;
        };
      }
      function patchLutimes(fs3) {
        if (constants.hasOwnProperty("O_SYMLINK")) {
          fs3.lutimes = function(path2, at, mt, cb) {
            fs3.open(path2, constants.O_SYMLINK, function(er, fd) {
              if (er) {
                if (cb)
                  cb(er);
                return;
              }
              fs3.futimes(fd, at, mt, function(er2) {
                fs3.close(fd, function(er22) {
                  if (cb)
                    cb(er2 || er22);
                });
              });
            });
          };
          fs3.lutimesSync = function(path2, at, mt) {
            var fd = fs3.openSync(path2, constants.O_SYMLINK);
            var ret;
            var threw = true;
            try {
              ret = fs3.futimesSync(fd, at, mt);
              threw = false;
            } finally {
              if (threw) {
                try {
                  fs3.closeSync(fd);
                } catch (er) {
                }
              } else {
                fs3.closeSync(fd);
              }
            }
            return ret;
          };
        } else {
          fs3.lutimes = function(_a, _b, _c, cb) {
            if (cb)
              process.nextTick(cb);
          };
          fs3.lutimesSync = function() {
          };
        }
      }
      function chmodFix(orig) {
        if (!orig)
          return orig;
        return function(target, mode, cb) {
          return orig.call(fs2, target, mode, function(er) {
            if (chownErOk(er))
              er = null;
            if (cb)
              cb.apply(this, arguments);
          });
        };
      }
      function chmodFixSync(orig) {
        if (!orig)
          return orig;
        return function(target, mode) {
          try {
            return orig.call(fs2, target, mode);
          } catch (er) {
            if (!chownErOk(er))
              throw er;
          }
        };
      }
      function chownFix(orig) {
        if (!orig)
          return orig;
        return function(target, uid, gid, cb) {
          return orig.call(fs2, target, uid, gid, function(er) {
            if (chownErOk(er))
              er = null;
            if (cb)
              cb.apply(this, arguments);
          });
        };
      }
      function chownFixSync(orig) {
        if (!orig)
          return orig;
        return function(target, uid, gid) {
          try {
            return orig.call(fs2, target, uid, gid);
          } catch (er) {
            if (!chownErOk(er))
              throw er;
          }
        };
      }
      function statFix(orig) {
        if (!orig)
          return orig;
        return function(target, options, cb) {
          if (typeof options === "function") {
            cb = options;
            options = null;
          }
          function callback(er, stats) {
            if (stats) {
              if (stats.uid < 0)
                stats.uid += 4294967296;
              if (stats.gid < 0)
                stats.gid += 4294967296;
            }
            if (cb)
              cb.apply(this, arguments);
          }
          return options ? orig.call(fs2, target, options, callback) : orig.call(fs2, target, callback);
        };
      }
      function statFixSync(orig) {
        if (!orig)
          return orig;
        return function(target, options) {
          var stats = options ? orig.call(fs2, target, options) : orig.call(fs2, target);
          if (stats.uid < 0)
            stats.uid += 4294967296;
          if (stats.gid < 0)
            stats.gid += 4294967296;
          return stats;
        };
      }
      function chownErOk(er) {
        if (!er)
          return true;
        if (er.code === "ENOSYS")
          return true;
        var nonroot = !process.getuid || process.getuid() !== 0;
        if (nonroot) {
          if (er.code === "EINVAL" || er.code === "EPERM")
            return true;
        }
        return false;
      }
    }
  }
});

// node_modules/graceful-fs/legacy-streams.js
var require_legacy_streams = __commonJS({
  "node_modules/graceful-fs/legacy-streams.js"(exports2, module2) {
    var Stream = require("stream").Stream;
    module2.exports = legacy;
    function legacy(fs2) {
      return {
        ReadStream,
        WriteStream
      };
      function ReadStream(path2, options) {
        if (!(this instanceof ReadStream))
          return new ReadStream(path2, options);
        Stream.call(this);
        var self = this;
        this.path = path2;
        this.fd = null;
        this.readable = true;
        this.paused = false;
        this.flags = "r";
        this.mode = 438;
        this.bufferSize = 64 * 1024;
        options = options || {};
        var keys = Object.keys(options);
        for (var index = 0, length = keys.length; index < length; index++) {
          var key = keys[index];
          this[key] = options[key];
        }
        if (this.encoding)
          this.setEncoding(this.encoding);
        if (this.start !== void 0) {
          if (typeof this.start !== "number") {
            throw TypeError("start must be a Number");
          }
          if (this.end === void 0) {
            this.end = Infinity;
          } else if (typeof this.end !== "number") {
            throw TypeError("end must be a Number");
          }
          if (this.start > this.end) {
            throw new Error("start must be <= end");
          }
          this.pos = this.start;
        }
        if (this.fd !== null) {
          process.nextTick(function() {
            self._read();
          });
          return;
        }
        fs2.open(this.path, this.flags, this.mode, function(err, fd) {
          if (err) {
            self.emit("error", err);
            self.readable = false;
            return;
          }
          self.fd = fd;
          self.emit("open", fd);
          self._read();
        });
      }
      function WriteStream(path2, options) {
        if (!(this instanceof WriteStream))
          return new WriteStream(path2, options);
        Stream.call(this);
        this.path = path2;
        this.fd = null;
        this.writable = true;
        this.flags = "w";
        this.encoding = "binary";
        this.mode = 438;
        this.bytesWritten = 0;
        options = options || {};
        var keys = Object.keys(options);
        for (var index = 0, length = keys.length; index < length; index++) {
          var key = keys[index];
          this[key] = options[key];
        }
        if (this.start !== void 0) {
          if (typeof this.start !== "number") {
            throw TypeError("start must be a Number");
          }
          if (this.start < 0) {
            throw new Error("start must be >= zero");
          }
          this.pos = this.start;
        }
        this.busy = false;
        this._queue = [];
        if (this.fd === null) {
          this._open = fs2.open;
          this._queue.push([this._open, this.path, this.flags, this.mode, void 0]);
          this.flush();
        }
      }
    }
  }
});

// node_modules/graceful-fs/clone.js
var require_clone = __commonJS({
  "node_modules/graceful-fs/clone.js"(exports2, module2) {
    "use strict";
    module2.exports = clone;
    var getPrototypeOf = Object.getPrototypeOf || function(obj) {
      return obj.__proto__;
    };
    function clone(obj) {
      if (obj === null || typeof obj !== "object")
        return obj;
      if (obj instanceof Object)
        var copy = { __proto__: getPrototypeOf(obj) };
      else
        var copy = Object.create(null);
      Object.getOwnPropertyNames(obj).forEach(function(key) {
        Object.defineProperty(copy, key, Object.getOwnPropertyDescriptor(obj, key));
      });
      return copy;
    }
  }
});

// node_modules/graceful-fs/graceful-fs.js
var require_graceful_fs = __commonJS({
  "node_modules/graceful-fs/graceful-fs.js"(exports2, module2) {
    var fs2 = require("fs");
    var polyfills = require_polyfills();
    var legacy = require_legacy_streams();
    var clone = require_clone();
    var util = require("util");
    var gracefulQueue;
    var previousSymbol;
    if (typeof Symbol === "function" && typeof Symbol.for === "function") {
      gracefulQueue = Symbol.for("graceful-fs.queue");
      previousSymbol = Symbol.for("graceful-fs.previous");
    } else {
      gracefulQueue = "___graceful-fs.queue";
      previousSymbol = "___graceful-fs.previous";
    }
    function noop() {
    }
    function publishQueue(context, queue2) {
      Object.defineProperty(context, gracefulQueue, {
        get: function() {
          return queue2;
        }
      });
    }
    var debug = noop;
    if (util.debuglog)
      debug = util.debuglog("gfs4");
    else if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || ""))
      debug = function() {
        var m = util.format.apply(util, arguments);
        m = "GFS4: " + m.split(/\n/).join("\nGFS4: ");
        console.error(m);
      };
    if (!fs2[gracefulQueue]) {
      queue = global[gracefulQueue] || [];
      publishQueue(fs2, queue);
      fs2.close = function(fs$close) {
        function close(fd, cb) {
          return fs$close.call(fs2, fd, function(err) {
            if (!err) {
              resetQueue();
            }
            if (typeof cb === "function")
              cb.apply(this, arguments);
          });
        }
        Object.defineProperty(close, previousSymbol, {
          value: fs$close
        });
        return close;
      }(fs2.close);
      fs2.closeSync = function(fs$closeSync) {
        function closeSync(fd) {
          fs$closeSync.apply(fs2, arguments);
          resetQueue();
        }
        Object.defineProperty(closeSync, previousSymbol, {
          value: fs$closeSync
        });
        return closeSync;
      }(fs2.closeSync);
      if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || "")) {
        process.on("exit", function() {
          debug(fs2[gracefulQueue]);
          require("assert").equal(fs2[gracefulQueue].length, 0);
        });
      }
    }
    var queue;
    if (!global[gracefulQueue]) {
      publishQueue(global, fs2[gracefulQueue]);
    }
    module2.exports = patch(clone(fs2));
    if (process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !fs2.__patched) {
      module2.exports = patch(fs2);
      fs2.__patched = true;
    }
    function patch(fs3) {
      polyfills(fs3);
      fs3.gracefulify = patch;
      fs3.createReadStream = createReadStream;
      fs3.createWriteStream = createWriteStream;
      var fs$readFile = fs3.readFile;
      fs3.readFile = readFile;
      function readFile(path2, options, cb) {
        if (typeof options === "function")
          cb = options, options = null;
        return go$readFile(path2, options, cb);
        function go$readFile(path3, options2, cb2, startTime) {
          return fs$readFile(path3, options2, function(err) {
            if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
              enqueue([go$readFile, [path3, options2, cb2], err, startTime || Date.now(), Date.now()]);
            else {
              if (typeof cb2 === "function")
                cb2.apply(this, arguments);
            }
          });
        }
      }
      var fs$writeFile = fs3.writeFile;
      fs3.writeFile = writeFile;
      function writeFile(path2, data, options, cb) {
        if (typeof options === "function")
          cb = options, options = null;
        return go$writeFile(path2, data, options, cb);
        function go$writeFile(path3, data2, options2, cb2, startTime) {
          return fs$writeFile(path3, data2, options2, function(err) {
            if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
              enqueue([go$writeFile, [path3, data2, options2, cb2], err, startTime || Date.now(), Date.now()]);
            else {
              if (typeof cb2 === "function")
                cb2.apply(this, arguments);
            }
          });
        }
      }
      var fs$appendFile = fs3.appendFile;
      if (fs$appendFile)
        fs3.appendFile = appendFile;
      function appendFile(path2, data, options, cb) {
        if (typeof options === "function")
          cb = options, options = null;
        return go$appendFile(path2, data, options, cb);
        function go$appendFile(path3, data2, options2, cb2, startTime) {
          return fs$appendFile(path3, data2, options2, function(err) {
            if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
              enqueue([go$appendFile, [path3, data2, options2, cb2], err, startTime || Date.now(), Date.now()]);
            else {
              if (typeof cb2 === "function")
                cb2.apply(this, arguments);
            }
          });
        }
      }
      var fs$copyFile = fs3.copyFile;
      if (fs$copyFile)
        fs3.copyFile = copyFile;
      function copyFile(src, dest, flags, cb) {
        if (typeof flags === "function") {
          cb = flags;
          flags = 0;
        }
        return go$copyFile(src, dest, flags, cb);
        function go$copyFile(src2, dest2, flags2, cb2, startTime) {
          return fs$copyFile(src2, dest2, flags2, function(err) {
            if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
              enqueue([go$copyFile, [src2, dest2, flags2, cb2], err, startTime || Date.now(), Date.now()]);
            else {
              if (typeof cb2 === "function")
                cb2.apply(this, arguments);
            }
          });
        }
      }
      var fs$readdir = fs3.readdir;
      fs3.readdir = readdir;
      function readdir(path2, options, cb) {
        if (typeof options === "function")
          cb = options, options = null;
        return go$readdir(path2, options, cb);
        function go$readdir(path3, options2, cb2, startTime) {
          return fs$readdir(path3, options2, function(err, files) {
            if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
              enqueue([go$readdir, [path3, options2, cb2], err, startTime || Date.now(), Date.now()]);
            else {
              if (files && files.sort)
                files.sort();
              if (typeof cb2 === "function")
                cb2.call(this, err, files);
            }
          });
        }
      }
      if (process.version.substr(0, 4) === "v0.8") {
        var legStreams = legacy(fs3);
        ReadStream = legStreams.ReadStream;
        WriteStream = legStreams.WriteStream;
      }
      var fs$ReadStream = fs3.ReadStream;
      if (fs$ReadStream) {
        ReadStream.prototype = Object.create(fs$ReadStream.prototype);
        ReadStream.prototype.open = ReadStream$open;
      }
      var fs$WriteStream = fs3.WriteStream;
      if (fs$WriteStream) {
        WriteStream.prototype = Object.create(fs$WriteStream.prototype);
        WriteStream.prototype.open = WriteStream$open;
      }
      Object.defineProperty(fs3, "ReadStream", {
        get: function() {
          return ReadStream;
        },
        set: function(val) {
          ReadStream = val;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(fs3, "WriteStream", {
        get: function() {
          return WriteStream;
        },
        set: function(val) {
          WriteStream = val;
        },
        enumerable: true,
        configurable: true
      });
      var FileReadStream = ReadStream;
      Object.defineProperty(fs3, "FileReadStream", {
        get: function() {
          return FileReadStream;
        },
        set: function(val) {
          FileReadStream = val;
        },
        enumerable: true,
        configurable: true
      });
      var FileWriteStream = WriteStream;
      Object.defineProperty(fs3, "FileWriteStream", {
        get: function() {
          return FileWriteStream;
        },
        set: function(val) {
          FileWriteStream = val;
        },
        enumerable: true,
        configurable: true
      });
      function ReadStream(path2, options) {
        if (this instanceof ReadStream)
          return fs$ReadStream.apply(this, arguments), this;
        else
          return ReadStream.apply(Object.create(ReadStream.prototype), arguments);
      }
      function ReadStream$open() {
        var that = this;
        open(that.path, that.flags, that.mode, function(err, fd) {
          if (err) {
            if (that.autoClose)
              that.destroy();
            that.emit("error", err);
          } else {
            that.fd = fd;
            that.emit("open", fd);
            that.read();
          }
        });
      }
      function WriteStream(path2, options) {
        if (this instanceof WriteStream)
          return fs$WriteStream.apply(this, arguments), this;
        else
          return WriteStream.apply(Object.create(WriteStream.prototype), arguments);
      }
      function WriteStream$open() {
        var that = this;
        open(that.path, that.flags, that.mode, function(err, fd) {
          if (err) {
            that.destroy();
            that.emit("error", err);
          } else {
            that.fd = fd;
            that.emit("open", fd);
          }
        });
      }
      function createReadStream(path2, options) {
        return new fs3.ReadStream(path2, options);
      }
      function createWriteStream(path2, options) {
        return new fs3.WriteStream(path2, options);
      }
      var fs$open = fs3.open;
      fs3.open = open;
      function open(path2, flags, mode, cb) {
        if (typeof mode === "function")
          cb = mode, mode = null;
        return go$open(path2, flags, mode, cb);
        function go$open(path3, flags2, mode2, cb2, startTime) {
          return fs$open(path3, flags2, mode2, function(err, fd) {
            if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
              enqueue([go$open, [path3, flags2, mode2, cb2], err, startTime || Date.now(), Date.now()]);
            else {
              if (typeof cb2 === "function")
                cb2.apply(this, arguments);
            }
          });
        }
      }
      return fs3;
    }
    function enqueue(elem) {
      debug("ENQUEUE", elem[0].name, elem[1]);
      fs2[gracefulQueue].push(elem);
      retry();
    }
    var retryTimer;
    function resetQueue() {
      var now = Date.now();
      for (var i = 0; i < fs2[gracefulQueue].length; ++i) {
        if (fs2[gracefulQueue][i].length > 2) {
          fs2[gracefulQueue][i][3] = now;
          fs2[gracefulQueue][i][4] = now;
        }
      }
      retry();
    }
    function retry() {
      clearTimeout(retryTimer);
      retryTimer = void 0;
      if (fs2[gracefulQueue].length === 0)
        return;
      var elem = fs2[gracefulQueue].shift();
      var fn = elem[0];
      var args = elem[1];
      var err = elem[2];
      var startTime = elem[3];
      var lastTime = elem[4];
      if (startTime === void 0) {
        debug("RETRY", fn.name, args);
        fn.apply(null, args);
      } else if (Date.now() - startTime >= 6e4) {
        debug("TIMEOUT", fn.name, args);
        var cb = args.pop();
        if (typeof cb === "function")
          cb.call(null, err);
      } else {
        var sinceAttempt = Date.now() - lastTime;
        var sinceStart = Math.max(lastTime - startTime, 1);
        var desiredDelay = Math.min(sinceStart * 1.2, 100);
        if (sinceAttempt >= desiredDelay) {
          debug("RETRY", fn.name, args);
          fn.apply(null, args.concat([startTime]));
        } else {
          fs2[gracefulQueue].push(elem);
        }
      }
      if (retryTimer === void 0) {
        retryTimer = setTimeout(retry, 0);
      }
    }
  }
});

// node_modules/fs-extra/lib/fs/index.js
var require_fs5 = __commonJS({
  "node_modules/fs-extra/lib/fs/index.js"(exports2) {
    "use strict";
    var u = require_universalify().fromCallback;
    var fs2 = require_graceful_fs();
    var api = [
      "access",
      "appendFile",
      "chmod",
      "chown",
      "close",
      "copyFile",
      "fchmod",
      "fchown",
      "fdatasync",
      "fstat",
      "fsync",
      "ftruncate",
      "futimes",
      "lchmod",
      "lchown",
      "link",
      "lstat",
      "mkdir",
      "mkdtemp",
      "open",
      "opendir",
      "readdir",
      "readFile",
      "readlink",
      "realpath",
      "rename",
      "rm",
      "rmdir",
      "stat",
      "symlink",
      "truncate",
      "unlink",
      "utimes",
      "writeFile"
    ].filter((key) => {
      return typeof fs2[key] === "function";
    });
    Object.assign(exports2, fs2);
    api.forEach((method) => {
      exports2[method] = u(fs2[method]);
    });
    exports2.realpath.native = u(fs2.realpath.native);
    exports2.exists = function(filename, callback) {
      if (typeof callback === "function") {
        return fs2.exists(filename, callback);
      }
      return new Promise((resolve) => {
        return fs2.exists(filename, resolve);
      });
    };
    exports2.read = function(fd, buffer, offset, length, position, callback) {
      if (typeof callback === "function") {
        return fs2.read(fd, buffer, offset, length, position, callback);
      }
      return new Promise((resolve, reject) => {
        fs2.read(fd, buffer, offset, length, position, (err, bytesRead, buffer2) => {
          if (err)
            return reject(err);
          resolve({ bytesRead, buffer: buffer2 });
        });
      });
    };
    exports2.write = function(fd, buffer, ...args) {
      if (typeof args[args.length - 1] === "function") {
        return fs2.write(fd, buffer, ...args);
      }
      return new Promise((resolve, reject) => {
        fs2.write(fd, buffer, ...args, (err, bytesWritten, buffer2) => {
          if (err)
            return reject(err);
          resolve({ bytesWritten, buffer: buffer2 });
        });
      });
    };
    if (typeof fs2.writev === "function") {
      exports2.writev = function(fd, buffers, ...args) {
        if (typeof args[args.length - 1] === "function") {
          return fs2.writev(fd, buffers, ...args);
        }
        return new Promise((resolve, reject) => {
          fs2.writev(fd, buffers, ...args, (err, bytesWritten, buffers2) => {
            if (err)
              return reject(err);
            resolve({ bytesWritten, buffers: buffers2 });
          });
        });
      };
    }
  }
});

// node_modules/fs-extra/lib/mkdirs/utils.js
var require_utils5 = __commonJS({
  "node_modules/fs-extra/lib/mkdirs/utils.js"(exports2, module2) {
    "use strict";
    var path2 = require("path");
    module2.exports.checkPath = function checkPath(pth) {
      if (process.platform === "win32") {
        const pathHasInvalidWinCharacters = /[<>:"|?*]/.test(pth.replace(path2.parse(pth).root, ""));
        if (pathHasInvalidWinCharacters) {
          const error = new Error(`Path contains invalid characters: ${pth}`);
          error.code = "EINVAL";
          throw error;
        }
      }
    };
  }
});

// node_modules/fs-extra/lib/mkdirs/make-dir.js
var require_make_dir = __commonJS({
  "node_modules/fs-extra/lib/mkdirs/make-dir.js"(exports2, module2) {
    "use strict";
    var fs2 = require_fs5();
    var { checkPath } = require_utils5();
    var getMode = (options) => {
      const defaults = { mode: 511 };
      if (typeof options === "number")
        return options;
      return { ...defaults, ...options }.mode;
    };
    module2.exports.makeDir = async (dir, options) => {
      checkPath(dir);
      return fs2.mkdir(dir, {
        mode: getMode(options),
        recursive: true
      });
    };
    module2.exports.makeDirSync = (dir, options) => {
      checkPath(dir);
      return fs2.mkdirSync(dir, {
        mode: getMode(options),
        recursive: true
      });
    };
  }
});

// node_modules/fs-extra/lib/mkdirs/index.js
var require_mkdirs = __commonJS({
  "node_modules/fs-extra/lib/mkdirs/index.js"(exports2, module2) {
    "use strict";
    var u = require_universalify().fromPromise;
    var { makeDir: _makeDir, makeDirSync } = require_make_dir();
    var makeDir = u(_makeDir);
    module2.exports = {
      mkdirs: makeDir,
      mkdirsSync: makeDirSync,
      mkdirp: makeDir,
      mkdirpSync: makeDirSync,
      ensureDir: makeDir,
      ensureDirSync: makeDirSync
    };
  }
});

// node_modules/fs-extra/lib/util/utimes.js
var require_utimes = __commonJS({
  "node_modules/fs-extra/lib/util/utimes.js"(exports2, module2) {
    "use strict";
    var fs2 = require_graceful_fs();
    function utimesMillis(path2, atime, mtime, callback) {
      fs2.open(path2, "r+", (err, fd) => {
        if (err)
          return callback(err);
        fs2.futimes(fd, atime, mtime, (futimesErr) => {
          fs2.close(fd, (closeErr) => {
            if (callback)
              callback(futimesErr || closeErr);
          });
        });
      });
    }
    function utimesMillisSync(path2, atime, mtime) {
      const fd = fs2.openSync(path2, "r+");
      fs2.futimesSync(fd, atime, mtime);
      return fs2.closeSync(fd);
    }
    module2.exports = {
      utimesMillis,
      utimesMillisSync
    };
  }
});

// node_modules/fs-extra/lib/util/stat.js
var require_stat = __commonJS({
  "node_modules/fs-extra/lib/util/stat.js"(exports2, module2) {
    "use strict";
    var fs2 = require_fs5();
    var path2 = require("path");
    var util = require("util");
    function getStats(src, dest, opts) {
      const statFunc = opts.dereference ? (file) => fs2.stat(file, { bigint: true }) : (file) => fs2.lstat(file, { bigint: true });
      return Promise.all([
        statFunc(src),
        statFunc(dest).catch((err) => {
          if (err.code === "ENOENT")
            return null;
          throw err;
        })
      ]).then(([srcStat, destStat]) => ({ srcStat, destStat }));
    }
    function getStatsSync(src, dest, opts) {
      let destStat;
      const statFunc = opts.dereference ? (file) => fs2.statSync(file, { bigint: true }) : (file) => fs2.lstatSync(file, { bigint: true });
      const srcStat = statFunc(src);
      try {
        destStat = statFunc(dest);
      } catch (err) {
        if (err.code === "ENOENT")
          return { srcStat, destStat: null };
        throw err;
      }
      return { srcStat, destStat };
    }
    function checkPaths(src, dest, funcName, opts, cb) {
      util.callbackify(getStats)(src, dest, opts, (err, stats) => {
        if (err)
          return cb(err);
        const { srcStat, destStat } = stats;
        if (destStat) {
          if (areIdentical(srcStat, destStat)) {
            const srcBaseName = path2.basename(src);
            const destBaseName = path2.basename(dest);
            if (funcName === "move" && srcBaseName !== destBaseName && srcBaseName.toLowerCase() === destBaseName.toLowerCase()) {
              return cb(null, { srcStat, destStat, isChangingCase: true });
            }
            return cb(new Error("Source and destination must not be the same."));
          }
          if (srcStat.isDirectory() && !destStat.isDirectory()) {
            return cb(new Error(`Cannot overwrite non-directory '${dest}' with directory '${src}'.`));
          }
          if (!srcStat.isDirectory() && destStat.isDirectory()) {
            return cb(new Error(`Cannot overwrite directory '${dest}' with non-directory '${src}'.`));
          }
        }
        if (srcStat.isDirectory() && isSrcSubdir(src, dest)) {
          return cb(new Error(errMsg(src, dest, funcName)));
        }
        return cb(null, { srcStat, destStat });
      });
    }
    function checkPathsSync(src, dest, funcName, opts) {
      const { srcStat, destStat } = getStatsSync(src, dest, opts);
      if (destStat) {
        if (areIdentical(srcStat, destStat)) {
          const srcBaseName = path2.basename(src);
          const destBaseName = path2.basename(dest);
          if (funcName === "move" && srcBaseName !== destBaseName && srcBaseName.toLowerCase() === destBaseName.toLowerCase()) {
            return { srcStat, destStat, isChangingCase: true };
          }
          throw new Error("Source and destination must not be the same.");
        }
        if (srcStat.isDirectory() && !destStat.isDirectory()) {
          throw new Error(`Cannot overwrite non-directory '${dest}' with directory '${src}'.`);
        }
        if (!srcStat.isDirectory() && destStat.isDirectory()) {
          throw new Error(`Cannot overwrite directory '${dest}' with non-directory '${src}'.`);
        }
      }
      if (srcStat.isDirectory() && isSrcSubdir(src, dest)) {
        throw new Error(errMsg(src, dest, funcName));
      }
      return { srcStat, destStat };
    }
    function checkParentPaths(src, srcStat, dest, funcName, cb) {
      const srcParent = path2.resolve(path2.dirname(src));
      const destParent = path2.resolve(path2.dirname(dest));
      if (destParent === srcParent || destParent === path2.parse(destParent).root)
        return cb();
      fs2.stat(destParent, { bigint: true }, (err, destStat) => {
        if (err) {
          if (err.code === "ENOENT")
            return cb();
          return cb(err);
        }
        if (areIdentical(srcStat, destStat)) {
          return cb(new Error(errMsg(src, dest, funcName)));
        }
        return checkParentPaths(src, srcStat, destParent, funcName, cb);
      });
    }
    function checkParentPathsSync(src, srcStat, dest, funcName) {
      const srcParent = path2.resolve(path2.dirname(src));
      const destParent = path2.resolve(path2.dirname(dest));
      if (destParent === srcParent || destParent === path2.parse(destParent).root)
        return;
      let destStat;
      try {
        destStat = fs2.statSync(destParent, { bigint: true });
      } catch (err) {
        if (err.code === "ENOENT")
          return;
        throw err;
      }
      if (areIdentical(srcStat, destStat)) {
        throw new Error(errMsg(src, dest, funcName));
      }
      return checkParentPathsSync(src, srcStat, destParent, funcName);
    }
    function areIdentical(srcStat, destStat) {
      return destStat.ino && destStat.dev && destStat.ino === srcStat.ino && destStat.dev === srcStat.dev;
    }
    function isSrcSubdir(src, dest) {
      const srcArr = path2.resolve(src).split(path2.sep).filter((i) => i);
      const destArr = path2.resolve(dest).split(path2.sep).filter((i) => i);
      return srcArr.reduce((acc, cur, i) => acc && destArr[i] === cur, true);
    }
    function errMsg(src, dest, funcName) {
      return `Cannot ${funcName} '${src}' to a subdirectory of itself, '${dest}'.`;
    }
    module2.exports = {
      checkPaths,
      checkPathsSync,
      checkParentPaths,
      checkParentPathsSync,
      isSrcSubdir,
      areIdentical
    };
  }
});

// node_modules/fs-extra/lib/copy-sync/copy-sync.js
var require_copy_sync = __commonJS({
  "node_modules/fs-extra/lib/copy-sync/copy-sync.js"(exports2, module2) {
    "use strict";
    var fs2 = require_graceful_fs();
    var path2 = require("path");
    var mkdirsSync = require_mkdirs().mkdirsSync;
    var utimesMillisSync = require_utimes().utimesMillisSync;
    var stat = require_stat();
    function copySync(src, dest, opts) {
      if (typeof opts === "function") {
        opts = { filter: opts };
      }
      opts = opts || {};
      opts.clobber = "clobber" in opts ? !!opts.clobber : true;
      opts.overwrite = "overwrite" in opts ? !!opts.overwrite : opts.clobber;
      if (opts.preserveTimestamps && process.arch === "ia32") {
        console.warn(`fs-extra: Using the preserveTimestamps option in 32-bit node is not recommended;

    see https://github.com/jprichardson/node-fs-extra/issues/269`);
      }
      const { srcStat, destStat } = stat.checkPathsSync(src, dest, "copy", opts);
      stat.checkParentPathsSync(src, srcStat, dest, "copy");
      return handleFilterAndCopy(destStat, src, dest, opts);
    }
    function handleFilterAndCopy(destStat, src, dest, opts) {
      if (opts.filter && !opts.filter(src, dest))
        return;
      const destParent = path2.dirname(dest);
      if (!fs2.existsSync(destParent))
        mkdirsSync(destParent);
      return getStats(destStat, src, dest, opts);
    }
    function startCopy(destStat, src, dest, opts) {
      if (opts.filter && !opts.filter(src, dest))
        return;
      return getStats(destStat, src, dest, opts);
    }
    function getStats(destStat, src, dest, opts) {
      const statSync = opts.dereference ? fs2.statSync : fs2.lstatSync;
      const srcStat = statSync(src);
      if (srcStat.isDirectory())
        return onDir(srcStat, destStat, src, dest, opts);
      else if (srcStat.isFile() || srcStat.isCharacterDevice() || srcStat.isBlockDevice())
        return onFile(srcStat, destStat, src, dest, opts);
      else if (srcStat.isSymbolicLink())
        return onLink(destStat, src, dest, opts);
      else if (srcStat.isSocket())
        throw new Error(`Cannot copy a socket file: ${src}`);
      else if (srcStat.isFIFO())
        throw new Error(`Cannot copy a FIFO pipe: ${src}`);
      throw new Error(`Unknown file: ${src}`);
    }
    function onFile(srcStat, destStat, src, dest, opts) {
      if (!destStat)
        return copyFile(srcStat, src, dest, opts);
      return mayCopyFile(srcStat, src, dest, opts);
    }
    function mayCopyFile(srcStat, src, dest, opts) {
      if (opts.overwrite) {
        fs2.unlinkSync(dest);
        return copyFile(srcStat, src, dest, opts);
      } else if (opts.errorOnExist) {
        throw new Error(`'${dest}' already exists`);
      }
    }
    function copyFile(srcStat, src, dest, opts) {
      fs2.copyFileSync(src, dest);
      if (opts.preserveTimestamps)
        handleTimestamps(srcStat.mode, src, dest);
      return setDestMode(dest, srcStat.mode);
    }
    function handleTimestamps(srcMode, src, dest) {
      if (fileIsNotWritable(srcMode))
        makeFileWritable(dest, srcMode);
      return setDestTimestamps(src, dest);
    }
    function fileIsNotWritable(srcMode) {
      return (srcMode & 128) === 0;
    }
    function makeFileWritable(dest, srcMode) {
      return setDestMode(dest, srcMode | 128);
    }
    function setDestMode(dest, srcMode) {
      return fs2.chmodSync(dest, srcMode);
    }
    function setDestTimestamps(src, dest) {
      const updatedSrcStat = fs2.statSync(src);
      return utimesMillisSync(dest, updatedSrcStat.atime, updatedSrcStat.mtime);
    }
    function onDir(srcStat, destStat, src, dest, opts) {
      if (!destStat)
        return mkDirAndCopy(srcStat.mode, src, dest, opts);
      return copyDir(src, dest, opts);
    }
    function mkDirAndCopy(srcMode, src, dest, opts) {
      fs2.mkdirSync(dest);
      copyDir(src, dest, opts);
      return setDestMode(dest, srcMode);
    }
    function copyDir(src, dest, opts) {
      fs2.readdirSync(src).forEach((item) => copyDirItem(item, src, dest, opts));
    }
    function copyDirItem(item, src, dest, opts) {
      const srcItem = path2.join(src, item);
      const destItem = path2.join(dest, item);
      const { destStat } = stat.checkPathsSync(srcItem, destItem, "copy", opts);
      return startCopy(destStat, srcItem, destItem, opts);
    }
    function onLink(destStat, src, dest, opts) {
      let resolvedSrc = fs2.readlinkSync(src);
      if (opts.dereference) {
        resolvedSrc = path2.resolve(process.cwd(), resolvedSrc);
      }
      if (!destStat) {
        return fs2.symlinkSync(resolvedSrc, dest);
      } else {
        let resolvedDest;
        try {
          resolvedDest = fs2.readlinkSync(dest);
        } catch (err) {
          if (err.code === "EINVAL" || err.code === "UNKNOWN")
            return fs2.symlinkSync(resolvedSrc, dest);
          throw err;
        }
        if (opts.dereference) {
          resolvedDest = path2.resolve(process.cwd(), resolvedDest);
        }
        if (stat.isSrcSubdir(resolvedSrc, resolvedDest)) {
          throw new Error(`Cannot copy '${resolvedSrc}' to a subdirectory of itself, '${resolvedDest}'.`);
        }
        if (fs2.statSync(dest).isDirectory() && stat.isSrcSubdir(resolvedDest, resolvedSrc)) {
          throw new Error(`Cannot overwrite '${resolvedDest}' with '${resolvedSrc}'.`);
        }
        return copyLink(resolvedSrc, dest);
      }
    }
    function copyLink(resolvedSrc, dest) {
      fs2.unlinkSync(dest);
      return fs2.symlinkSync(resolvedSrc, dest);
    }
    module2.exports = copySync;
  }
});

// node_modules/fs-extra/lib/copy-sync/index.js
var require_copy_sync2 = __commonJS({
  "node_modules/fs-extra/lib/copy-sync/index.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      copySync: require_copy_sync()
    };
  }
});

// node_modules/fs-extra/lib/path-exists/index.js
var require_path_exists = __commonJS({
  "node_modules/fs-extra/lib/path-exists/index.js"(exports2, module2) {
    "use strict";
    var u = require_universalify().fromPromise;
    var fs2 = require_fs5();
    function pathExists(path2) {
      return fs2.access(path2).then(() => true).catch(() => false);
    }
    module2.exports = {
      pathExists: u(pathExists),
      pathExistsSync: fs2.existsSync
    };
  }
});

// node_modules/fs-extra/lib/copy/copy.js
var require_copy = __commonJS({
  "node_modules/fs-extra/lib/copy/copy.js"(exports2, module2) {
    "use strict";
    var fs2 = require_graceful_fs();
    var path2 = require("path");
    var mkdirs = require_mkdirs().mkdirs;
    var pathExists = require_path_exists().pathExists;
    var utimesMillis = require_utimes().utimesMillis;
    var stat = require_stat();
    function copy(src, dest, opts, cb) {
      if (typeof opts === "function" && !cb) {
        cb = opts;
        opts = {};
      } else if (typeof opts === "function") {
        opts = { filter: opts };
      }
      cb = cb || function() {
      };
      opts = opts || {};
      opts.clobber = "clobber" in opts ? !!opts.clobber : true;
      opts.overwrite = "overwrite" in opts ? !!opts.overwrite : opts.clobber;
      if (opts.preserveTimestamps && process.arch === "ia32") {
        console.warn(`fs-extra: Using the preserveTimestamps option in 32-bit node is not recommended;

    see https://github.com/jprichardson/node-fs-extra/issues/269`);
      }
      stat.checkPaths(src, dest, "copy", opts, (err, stats) => {
        if (err)
          return cb(err);
        const { srcStat, destStat } = stats;
        stat.checkParentPaths(src, srcStat, dest, "copy", (err2) => {
          if (err2)
            return cb(err2);
          if (opts.filter)
            return handleFilter(checkParentDir, destStat, src, dest, opts, cb);
          return checkParentDir(destStat, src, dest, opts, cb);
        });
      });
    }
    function checkParentDir(destStat, src, dest, opts, cb) {
      const destParent = path2.dirname(dest);
      pathExists(destParent, (err, dirExists) => {
        if (err)
          return cb(err);
        if (dirExists)
          return getStats(destStat, src, dest, opts, cb);
        mkdirs(destParent, (err2) => {
          if (err2)
            return cb(err2);
          return getStats(destStat, src, dest, opts, cb);
        });
      });
    }
    function handleFilter(onInclude, destStat, src, dest, opts, cb) {
      Promise.resolve(opts.filter(src, dest)).then((include) => {
        if (include)
          return onInclude(destStat, src, dest, opts, cb);
        return cb();
      }, (error) => cb(error));
    }
    function startCopy(destStat, src, dest, opts, cb) {
      if (opts.filter)
        return handleFilter(getStats, destStat, src, dest, opts, cb);
      return getStats(destStat, src, dest, opts, cb);
    }
    function getStats(destStat, src, dest, opts, cb) {
      const stat2 = opts.dereference ? fs2.stat : fs2.lstat;
      stat2(src, (err, srcStat) => {
        if (err)
          return cb(err);
        if (srcStat.isDirectory())
          return onDir(srcStat, destStat, src, dest, opts, cb);
        else if (srcStat.isFile() || srcStat.isCharacterDevice() || srcStat.isBlockDevice())
          return onFile(srcStat, destStat, src, dest, opts, cb);
        else if (srcStat.isSymbolicLink())
          return onLink(destStat, src, dest, opts, cb);
        else if (srcStat.isSocket())
          return cb(new Error(`Cannot copy a socket file: ${src}`));
        else if (srcStat.isFIFO())
          return cb(new Error(`Cannot copy a FIFO pipe: ${src}`));
        return cb(new Error(`Unknown file: ${src}`));
      });
    }
    function onFile(srcStat, destStat, src, dest, opts, cb) {
      if (!destStat)
        return copyFile(srcStat, src, dest, opts, cb);
      return mayCopyFile(srcStat, src, dest, opts, cb);
    }
    function mayCopyFile(srcStat, src, dest, opts, cb) {
      if (opts.overwrite) {
        fs2.unlink(dest, (err) => {
          if (err)
            return cb(err);
          return copyFile(srcStat, src, dest, opts, cb);
        });
      } else if (opts.errorOnExist) {
        return cb(new Error(`'${dest}' already exists`));
      } else
        return cb();
    }
    function copyFile(srcStat, src, dest, opts, cb) {
      fs2.copyFile(src, dest, (err) => {
        if (err)
          return cb(err);
        if (opts.preserveTimestamps)
          return handleTimestampsAndMode(srcStat.mode, src, dest, cb);
        return setDestMode(dest, srcStat.mode, cb);
      });
    }
    function handleTimestampsAndMode(srcMode, src, dest, cb) {
      if (fileIsNotWritable(srcMode)) {
        return makeFileWritable(dest, srcMode, (err) => {
          if (err)
            return cb(err);
          return setDestTimestampsAndMode(srcMode, src, dest, cb);
        });
      }
      return setDestTimestampsAndMode(srcMode, src, dest, cb);
    }
    function fileIsNotWritable(srcMode) {
      return (srcMode & 128) === 0;
    }
    function makeFileWritable(dest, srcMode, cb) {
      return setDestMode(dest, srcMode | 128, cb);
    }
    function setDestTimestampsAndMode(srcMode, src, dest, cb) {
      setDestTimestamps(src, dest, (err) => {
        if (err)
          return cb(err);
        return setDestMode(dest, srcMode, cb);
      });
    }
    function setDestMode(dest, srcMode, cb) {
      return fs2.chmod(dest, srcMode, cb);
    }
    function setDestTimestamps(src, dest, cb) {
      fs2.stat(src, (err, updatedSrcStat) => {
        if (err)
          return cb(err);
        return utimesMillis(dest, updatedSrcStat.atime, updatedSrcStat.mtime, cb);
      });
    }
    function onDir(srcStat, destStat, src, dest, opts, cb) {
      if (!destStat)
        return mkDirAndCopy(srcStat.mode, src, dest, opts, cb);
      return copyDir(src, dest, opts, cb);
    }
    function mkDirAndCopy(srcMode, src, dest, opts, cb) {
      fs2.mkdir(dest, (err) => {
        if (err)
          return cb(err);
        copyDir(src, dest, opts, (err2) => {
          if (err2)
            return cb(err2);
          return setDestMode(dest, srcMode, cb);
        });
      });
    }
    function copyDir(src, dest, opts, cb) {
      fs2.readdir(src, (err, items) => {
        if (err)
          return cb(err);
        return copyDirItems(items, src, dest, opts, cb);
      });
    }
    function copyDirItems(items, src, dest, opts, cb) {
      const item = items.pop();
      if (!item)
        return cb();
      return copyDirItem(items, item, src, dest, opts, cb);
    }
    function copyDirItem(items, item, src, dest, opts, cb) {
      const srcItem = path2.join(src, item);
      const destItem = path2.join(dest, item);
      stat.checkPaths(srcItem, destItem, "copy", opts, (err, stats) => {
        if (err)
          return cb(err);
        const { destStat } = stats;
        startCopy(destStat, srcItem, destItem, opts, (err2) => {
          if (err2)
            return cb(err2);
          return copyDirItems(items, src, dest, opts, cb);
        });
      });
    }
    function onLink(destStat, src, dest, opts, cb) {
      fs2.readlink(src, (err, resolvedSrc) => {
        if (err)
          return cb(err);
        if (opts.dereference) {
          resolvedSrc = path2.resolve(process.cwd(), resolvedSrc);
        }
        if (!destStat) {
          return fs2.symlink(resolvedSrc, dest, cb);
        } else {
          fs2.readlink(dest, (err2, resolvedDest) => {
            if (err2) {
              if (err2.code === "EINVAL" || err2.code === "UNKNOWN")
                return fs2.symlink(resolvedSrc, dest, cb);
              return cb(err2);
            }
            if (opts.dereference) {
              resolvedDest = path2.resolve(process.cwd(), resolvedDest);
            }
            if (stat.isSrcSubdir(resolvedSrc, resolvedDest)) {
              return cb(new Error(`Cannot copy '${resolvedSrc}' to a subdirectory of itself, '${resolvedDest}'.`));
            }
            if (destStat.isDirectory() && stat.isSrcSubdir(resolvedDest, resolvedSrc)) {
              return cb(new Error(`Cannot overwrite '${resolvedDest}' with '${resolvedSrc}'.`));
            }
            return copyLink(resolvedSrc, dest, cb);
          });
        }
      });
    }
    function copyLink(resolvedSrc, dest, cb) {
      fs2.unlink(dest, (err) => {
        if (err)
          return cb(err);
        return fs2.symlink(resolvedSrc, dest, cb);
      });
    }
    module2.exports = copy;
  }
});

// node_modules/fs-extra/lib/copy/index.js
var require_copy2 = __commonJS({
  "node_modules/fs-extra/lib/copy/index.js"(exports2, module2) {
    "use strict";
    var u = require_universalify().fromCallback;
    module2.exports = {
      copy: u(require_copy())
    };
  }
});

// node_modules/fs-extra/lib/remove/rimraf.js
var require_rimraf = __commonJS({
  "node_modules/fs-extra/lib/remove/rimraf.js"(exports2, module2) {
    "use strict";
    var fs2 = require_graceful_fs();
    var path2 = require("path");
    var assert = require("assert");
    var isWindows = process.platform === "win32";
    function defaults(options) {
      const methods = [
        "unlink",
        "chmod",
        "stat",
        "lstat",
        "rmdir",
        "readdir"
      ];
      methods.forEach((m) => {
        options[m] = options[m] || fs2[m];
        m = m + "Sync";
        options[m] = options[m] || fs2[m];
      });
      options.maxBusyTries = options.maxBusyTries || 3;
    }
    function rimraf(p, options, cb) {
      let busyTries = 0;
      if (typeof options === "function") {
        cb = options;
        options = {};
      }
      assert(p, "rimraf: missing path");
      assert.strictEqual(typeof p, "string", "rimraf: path should be a string");
      assert.strictEqual(typeof cb, "function", "rimraf: callback function required");
      assert(options, "rimraf: invalid options argument provided");
      assert.strictEqual(typeof options, "object", "rimraf: options should be object");
      defaults(options);
      rimraf_(p, options, function CB(er) {
        if (er) {
          if ((er.code === "EBUSY" || er.code === "ENOTEMPTY" || er.code === "EPERM") && busyTries < options.maxBusyTries) {
            busyTries++;
            const time = busyTries * 100;
            return setTimeout(() => rimraf_(p, options, CB), time);
          }
          if (er.code === "ENOENT")
            er = null;
        }
        cb(er);
      });
    }
    function rimraf_(p, options, cb) {
      assert(p);
      assert(options);
      assert(typeof cb === "function");
      options.lstat(p, (er, st) => {
        if (er && er.code === "ENOENT") {
          return cb(null);
        }
        if (er && er.code === "EPERM" && isWindows) {
          return fixWinEPERM(p, options, er, cb);
        }
        if (st && st.isDirectory()) {
          return rmdir(p, options, er, cb);
        }
        options.unlink(p, (er2) => {
          if (er2) {
            if (er2.code === "ENOENT") {
              return cb(null);
            }
            if (er2.code === "EPERM") {
              return isWindows ? fixWinEPERM(p, options, er2, cb) : rmdir(p, options, er2, cb);
            }
            if (er2.code === "EISDIR") {
              return rmdir(p, options, er2, cb);
            }
          }
          return cb(er2);
        });
      });
    }
    function fixWinEPERM(p, options, er, cb) {
      assert(p);
      assert(options);
      assert(typeof cb === "function");
      options.chmod(p, 438, (er2) => {
        if (er2) {
          cb(er2.code === "ENOENT" ? null : er);
        } else {
          options.stat(p, (er3, stats) => {
            if (er3) {
              cb(er3.code === "ENOENT" ? null : er);
            } else if (stats.isDirectory()) {
              rmdir(p, options, er, cb);
            } else {
              options.unlink(p, cb);
            }
          });
        }
      });
    }
    function fixWinEPERMSync(p, options, er) {
      let stats;
      assert(p);
      assert(options);
      try {
        options.chmodSync(p, 438);
      } catch (er2) {
        if (er2.code === "ENOENT") {
          return;
        } else {
          throw er;
        }
      }
      try {
        stats = options.statSync(p);
      } catch (er3) {
        if (er3.code === "ENOENT") {
          return;
        } else {
          throw er;
        }
      }
      if (stats.isDirectory()) {
        rmdirSync(p, options, er);
      } else {
        options.unlinkSync(p);
      }
    }
    function rmdir(p, options, originalEr, cb) {
      assert(p);
      assert(options);
      assert(typeof cb === "function");
      options.rmdir(p, (er) => {
        if (er && (er.code === "ENOTEMPTY" || er.code === "EEXIST" || er.code === "EPERM")) {
          rmkids(p, options, cb);
        } else if (er && er.code === "ENOTDIR") {
          cb(originalEr);
        } else {
          cb(er);
        }
      });
    }
    function rmkids(p, options, cb) {
      assert(p);
      assert(options);
      assert(typeof cb === "function");
      options.readdir(p, (er, files) => {
        if (er)
          return cb(er);
        let n = files.length;
        let errState;
        if (n === 0)
          return options.rmdir(p, cb);
        files.forEach((f) => {
          rimraf(path2.join(p, f), options, (er2) => {
            if (errState) {
              return;
            }
            if (er2)
              return cb(errState = er2);
            if (--n === 0) {
              options.rmdir(p, cb);
            }
          });
        });
      });
    }
    function rimrafSync(p, options) {
      let st;
      options = options || {};
      defaults(options);
      assert(p, "rimraf: missing path");
      assert.strictEqual(typeof p, "string", "rimraf: path should be a string");
      assert(options, "rimraf: missing options");
      assert.strictEqual(typeof options, "object", "rimraf: options should be object");
      try {
        st = options.lstatSync(p);
      } catch (er) {
        if (er.code === "ENOENT") {
          return;
        }
        if (er.code === "EPERM" && isWindows) {
          fixWinEPERMSync(p, options, er);
        }
      }
      try {
        if (st && st.isDirectory()) {
          rmdirSync(p, options, null);
        } else {
          options.unlinkSync(p);
        }
      } catch (er) {
        if (er.code === "ENOENT") {
          return;
        } else if (er.code === "EPERM") {
          return isWindows ? fixWinEPERMSync(p, options, er) : rmdirSync(p, options, er);
        } else if (er.code !== "EISDIR") {
          throw er;
        }
        rmdirSync(p, options, er);
      }
    }
    function rmdirSync(p, options, originalEr) {
      assert(p);
      assert(options);
      try {
        options.rmdirSync(p);
      } catch (er) {
        if (er.code === "ENOTDIR") {
          throw originalEr;
        } else if (er.code === "ENOTEMPTY" || er.code === "EEXIST" || er.code === "EPERM") {
          rmkidsSync(p, options);
        } else if (er.code !== "ENOENT") {
          throw er;
        }
      }
    }
    function rmkidsSync(p, options) {
      assert(p);
      assert(options);
      options.readdirSync(p).forEach((f) => rimrafSync(path2.join(p, f), options));
      if (isWindows) {
        const startTime = Date.now();
        do {
          try {
            const ret = options.rmdirSync(p, options);
            return ret;
          } catch {
          }
        } while (Date.now() - startTime < 500);
      } else {
        const ret = options.rmdirSync(p, options);
        return ret;
      }
    }
    module2.exports = rimraf;
    rimraf.sync = rimrafSync;
  }
});

// node_modules/fs-extra/lib/remove/index.js
var require_remove = __commonJS({
  "node_modules/fs-extra/lib/remove/index.js"(exports2, module2) {
    "use strict";
    var fs2 = require_graceful_fs();
    var u = require_universalify().fromCallback;
    var rimraf = require_rimraf();
    function remove(path2, callback) {
      if (fs2.rm)
        return fs2.rm(path2, { recursive: true, force: true }, callback);
      rimraf(path2, callback);
    }
    function removeSync(path2) {
      if (fs2.rmSync)
        return fs2.rmSync(path2, { recursive: true, force: true });
      rimraf.sync(path2);
    }
    module2.exports = {
      remove: u(remove),
      removeSync
    };
  }
});

// node_modules/fs-extra/lib/empty/index.js
var require_empty = __commonJS({
  "node_modules/fs-extra/lib/empty/index.js"(exports2, module2) {
    "use strict";
    var u = require_universalify().fromPromise;
    var fs2 = require_fs5();
    var path2 = require("path");
    var mkdir = require_mkdirs();
    var remove = require_remove();
    var emptyDir = u(async function emptyDir2(dir) {
      let items;
      try {
        items = await fs2.readdir(dir);
      } catch {
        return mkdir.mkdirs(dir);
      }
      return Promise.all(items.map((item) => remove.remove(path2.join(dir, item))));
    });
    function emptyDirSync(dir) {
      let items;
      try {
        items = fs2.readdirSync(dir);
      } catch {
        return mkdir.mkdirsSync(dir);
      }
      items.forEach((item) => {
        item = path2.join(dir, item);
        remove.removeSync(item);
      });
    }
    module2.exports = {
      emptyDirSync,
      emptydirSync: emptyDirSync,
      emptyDir,
      emptydir: emptyDir
    };
  }
});

// node_modules/fs-extra/lib/ensure/file.js
var require_file = __commonJS({
  "node_modules/fs-extra/lib/ensure/file.js"(exports2, module2) {
    "use strict";
    var u = require_universalify().fromCallback;
    var path2 = require("path");
    var fs2 = require_graceful_fs();
    var mkdir = require_mkdirs();
    function createFile(file, callback) {
      function makeFile() {
        fs2.writeFile(file, "", (err) => {
          if (err)
            return callback(err);
          callback();
        });
      }
      fs2.stat(file, (err, stats) => {
        if (!err && stats.isFile())
          return callback();
        const dir = path2.dirname(file);
        fs2.stat(dir, (err2, stats2) => {
          if (err2) {
            if (err2.code === "ENOENT") {
              return mkdir.mkdirs(dir, (err3) => {
                if (err3)
                  return callback(err3);
                makeFile();
              });
            }
            return callback(err2);
          }
          if (stats2.isDirectory())
            makeFile();
          else {
            fs2.readdir(dir, (err3) => {
              if (err3)
                return callback(err3);
            });
          }
        });
      });
    }
    function createFileSync(file) {
      let stats;
      try {
        stats = fs2.statSync(file);
      } catch {
      }
      if (stats && stats.isFile())
        return;
      const dir = path2.dirname(file);
      try {
        if (!fs2.statSync(dir).isDirectory()) {
          fs2.readdirSync(dir);
        }
      } catch (err) {
        if (err && err.code === "ENOENT")
          mkdir.mkdirsSync(dir);
        else
          throw err;
      }
      fs2.writeFileSync(file, "");
    }
    module2.exports = {
      createFile: u(createFile),
      createFileSync
    };
  }
});

// node_modules/fs-extra/lib/ensure/link.js
var require_link = __commonJS({
  "node_modules/fs-extra/lib/ensure/link.js"(exports2, module2) {
    "use strict";
    var u = require_universalify().fromCallback;
    var path2 = require("path");
    var fs2 = require_graceful_fs();
    var mkdir = require_mkdirs();
    var pathExists = require_path_exists().pathExists;
    var { areIdentical } = require_stat();
    function createLink(srcpath, dstpath, callback) {
      function makeLink(srcpath2, dstpath2) {
        fs2.link(srcpath2, dstpath2, (err) => {
          if (err)
            return callback(err);
          callback(null);
        });
      }
      fs2.lstat(dstpath, (_, dstStat) => {
        fs2.lstat(srcpath, (err, srcStat) => {
          if (err) {
            err.message = err.message.replace("lstat", "ensureLink");
            return callback(err);
          }
          if (dstStat && areIdentical(srcStat, dstStat))
            return callback(null);
          const dir = path2.dirname(dstpath);
          pathExists(dir, (err2, dirExists) => {
            if (err2)
              return callback(err2);
            if (dirExists)
              return makeLink(srcpath, dstpath);
            mkdir.mkdirs(dir, (err3) => {
              if (err3)
                return callback(err3);
              makeLink(srcpath, dstpath);
            });
          });
        });
      });
    }
    function createLinkSync(srcpath, dstpath) {
      let dstStat;
      try {
        dstStat = fs2.lstatSync(dstpath);
      } catch {
      }
      try {
        const srcStat = fs2.lstatSync(srcpath);
        if (dstStat && areIdentical(srcStat, dstStat))
          return;
      } catch (err) {
        err.message = err.message.replace("lstat", "ensureLink");
        throw err;
      }
      const dir = path2.dirname(dstpath);
      const dirExists = fs2.existsSync(dir);
      if (dirExists)
        return fs2.linkSync(srcpath, dstpath);
      mkdir.mkdirsSync(dir);
      return fs2.linkSync(srcpath, dstpath);
    }
    module2.exports = {
      createLink: u(createLink),
      createLinkSync
    };
  }
});

// node_modules/fs-extra/lib/ensure/symlink-paths.js
var require_symlink_paths = __commonJS({
  "node_modules/fs-extra/lib/ensure/symlink-paths.js"(exports2, module2) {
    "use strict";
    var path2 = require("path");
    var fs2 = require_graceful_fs();
    var pathExists = require_path_exists().pathExists;
    function symlinkPaths(srcpath, dstpath, callback) {
      if (path2.isAbsolute(srcpath)) {
        return fs2.lstat(srcpath, (err) => {
          if (err) {
            err.message = err.message.replace("lstat", "ensureSymlink");
            return callback(err);
          }
          return callback(null, {
            toCwd: srcpath,
            toDst: srcpath
          });
        });
      } else {
        const dstdir = path2.dirname(dstpath);
        const relativeToDst = path2.join(dstdir, srcpath);
        return pathExists(relativeToDst, (err, exists) => {
          if (err)
            return callback(err);
          if (exists) {
            return callback(null, {
              toCwd: relativeToDst,
              toDst: srcpath
            });
          } else {
            return fs2.lstat(srcpath, (err2) => {
              if (err2) {
                err2.message = err2.message.replace("lstat", "ensureSymlink");
                return callback(err2);
              }
              return callback(null, {
                toCwd: srcpath,
                toDst: path2.relative(dstdir, srcpath)
              });
            });
          }
        });
      }
    }
    function symlinkPathsSync(srcpath, dstpath) {
      let exists;
      if (path2.isAbsolute(srcpath)) {
        exists = fs2.existsSync(srcpath);
        if (!exists)
          throw new Error("absolute srcpath does not exist");
        return {
          toCwd: srcpath,
          toDst: srcpath
        };
      } else {
        const dstdir = path2.dirname(dstpath);
        const relativeToDst = path2.join(dstdir, srcpath);
        exists = fs2.existsSync(relativeToDst);
        if (exists) {
          return {
            toCwd: relativeToDst,
            toDst: srcpath
          };
        } else {
          exists = fs2.existsSync(srcpath);
          if (!exists)
            throw new Error("relative srcpath does not exist");
          return {
            toCwd: srcpath,
            toDst: path2.relative(dstdir, srcpath)
          };
        }
      }
    }
    module2.exports = {
      symlinkPaths,
      symlinkPathsSync
    };
  }
});

// node_modules/fs-extra/lib/ensure/symlink-type.js
var require_symlink_type = __commonJS({
  "node_modules/fs-extra/lib/ensure/symlink-type.js"(exports2, module2) {
    "use strict";
    var fs2 = require_graceful_fs();
    function symlinkType(srcpath, type, callback) {
      callback = typeof type === "function" ? type : callback;
      type = typeof type === "function" ? false : type;
      if (type)
        return callback(null, type);
      fs2.lstat(srcpath, (err, stats) => {
        if (err)
          return callback(null, "file");
        type = stats && stats.isDirectory() ? "dir" : "file";
        callback(null, type);
      });
    }
    function symlinkTypeSync(srcpath, type) {
      let stats;
      if (type)
        return type;
      try {
        stats = fs2.lstatSync(srcpath);
      } catch {
        return "file";
      }
      return stats && stats.isDirectory() ? "dir" : "file";
    }
    module2.exports = {
      symlinkType,
      symlinkTypeSync
    };
  }
});

// node_modules/fs-extra/lib/ensure/symlink.js
var require_symlink = __commonJS({
  "node_modules/fs-extra/lib/ensure/symlink.js"(exports2, module2) {
    "use strict";
    var u = require_universalify().fromCallback;
    var path2 = require("path");
    var fs2 = require_fs5();
    var _mkdirs = require_mkdirs();
    var mkdirs = _mkdirs.mkdirs;
    var mkdirsSync = _mkdirs.mkdirsSync;
    var _symlinkPaths = require_symlink_paths();
    var symlinkPaths = _symlinkPaths.symlinkPaths;
    var symlinkPathsSync = _symlinkPaths.symlinkPathsSync;
    var _symlinkType = require_symlink_type();
    var symlinkType = _symlinkType.symlinkType;
    var symlinkTypeSync = _symlinkType.symlinkTypeSync;
    var pathExists = require_path_exists().pathExists;
    var { areIdentical } = require_stat();
    function createSymlink(srcpath, dstpath, type, callback) {
      callback = typeof type === "function" ? type : callback;
      type = typeof type === "function" ? false : type;
      fs2.lstat(dstpath, (err, stats) => {
        if (!err && stats.isSymbolicLink()) {
          Promise.all([
            fs2.stat(srcpath),
            fs2.stat(dstpath)
          ]).then(([srcStat, dstStat]) => {
            if (areIdentical(srcStat, dstStat))
              return callback(null);
            _createSymlink(srcpath, dstpath, type, callback);
          });
        } else
          _createSymlink(srcpath, dstpath, type, callback);
      });
    }
    function _createSymlink(srcpath, dstpath, type, callback) {
      symlinkPaths(srcpath, dstpath, (err, relative) => {
        if (err)
          return callback(err);
        srcpath = relative.toDst;
        symlinkType(relative.toCwd, type, (err2, type2) => {
          if (err2)
            return callback(err2);
          const dir = path2.dirname(dstpath);
          pathExists(dir, (err3, dirExists) => {
            if (err3)
              return callback(err3);
            if (dirExists)
              return fs2.symlink(srcpath, dstpath, type2, callback);
            mkdirs(dir, (err4) => {
              if (err4)
                return callback(err4);
              fs2.symlink(srcpath, dstpath, type2, callback);
            });
          });
        });
      });
    }
    function createSymlinkSync(srcpath, dstpath, type) {
      let stats;
      try {
        stats = fs2.lstatSync(dstpath);
      } catch {
      }
      if (stats && stats.isSymbolicLink()) {
        const srcStat = fs2.statSync(srcpath);
        const dstStat = fs2.statSync(dstpath);
        if (areIdentical(srcStat, dstStat))
          return;
      }
      const relative = symlinkPathsSync(srcpath, dstpath);
      srcpath = relative.toDst;
      type = symlinkTypeSync(relative.toCwd, type);
      const dir = path2.dirname(dstpath);
      const exists = fs2.existsSync(dir);
      if (exists)
        return fs2.symlinkSync(srcpath, dstpath, type);
      mkdirsSync(dir);
      return fs2.symlinkSync(srcpath, dstpath, type);
    }
    module2.exports = {
      createSymlink: u(createSymlink),
      createSymlinkSync
    };
  }
});

// node_modules/fs-extra/lib/ensure/index.js
var require_ensure = __commonJS({
  "node_modules/fs-extra/lib/ensure/index.js"(exports2, module2) {
    "use strict";
    var file = require_file();
    var link = require_link();
    var symlink = require_symlink();
    module2.exports = {
      createFile: file.createFile,
      createFileSync: file.createFileSync,
      ensureFile: file.createFile,
      ensureFileSync: file.createFileSync,
      createLink: link.createLink,
      createLinkSync: link.createLinkSync,
      ensureLink: link.createLink,
      ensureLinkSync: link.createLinkSync,
      createSymlink: symlink.createSymlink,
      createSymlinkSync: symlink.createSymlinkSync,
      ensureSymlink: symlink.createSymlink,
      ensureSymlinkSync: symlink.createSymlinkSync
    };
  }
});

// node_modules/jsonfile/utils.js
var require_utils6 = __commonJS({
  "node_modules/jsonfile/utils.js"(exports2, module2) {
    function stringify(obj, { EOL = "\n", finalEOL = true, replacer = null, spaces } = {}) {
      const EOF = finalEOL ? EOL : "";
      const str = JSON.stringify(obj, replacer, spaces);
      return str.replace(/\n/g, EOL) + EOF;
    }
    function stripBom(content) {
      if (Buffer.isBuffer(content))
        content = content.toString("utf8");
      return content.replace(/^\uFEFF/, "");
    }
    module2.exports = { stringify, stripBom };
  }
});

// node_modules/jsonfile/index.js
var require_jsonfile = __commonJS({
  "node_modules/jsonfile/index.js"(exports2, module2) {
    var _fs;
    try {
      _fs = require_graceful_fs();
    } catch (_) {
      _fs = require("fs");
    }
    var universalify = require_universalify();
    var { stringify, stripBom } = require_utils6();
    async function _readFile(file, options = {}) {
      if (typeof options === "string") {
        options = { encoding: options };
      }
      const fs2 = options.fs || _fs;
      const shouldThrow = "throws" in options ? options.throws : true;
      let data = await universalify.fromCallback(fs2.readFile)(file, options);
      data = stripBom(data);
      let obj;
      try {
        obj = JSON.parse(data, options ? options.reviver : null);
      } catch (err) {
        if (shouldThrow) {
          err.message = `${file}: ${err.message}`;
          throw err;
        } else {
          return null;
        }
      }
      return obj;
    }
    var readFile = universalify.fromPromise(_readFile);
    function readFileSync(file, options = {}) {
      if (typeof options === "string") {
        options = { encoding: options };
      }
      const fs2 = options.fs || _fs;
      const shouldThrow = "throws" in options ? options.throws : true;
      try {
        let content = fs2.readFileSync(file, options);
        content = stripBom(content);
        return JSON.parse(content, options.reviver);
      } catch (err) {
        if (shouldThrow) {
          err.message = `${file}: ${err.message}`;
          throw err;
        } else {
          return null;
        }
      }
    }
    async function _writeFile(file, obj, options = {}) {
      const fs2 = options.fs || _fs;
      const str = stringify(obj, options);
      await universalify.fromCallback(fs2.writeFile)(file, str, options);
    }
    var writeFile = universalify.fromPromise(_writeFile);
    function writeFileSync(file, obj, options = {}) {
      const fs2 = options.fs || _fs;
      const str = stringify(obj, options);
      return fs2.writeFileSync(file, str, options);
    }
    var jsonfile = {
      readFile,
      readFileSync,
      writeFile,
      writeFileSync
    };
    module2.exports = jsonfile;
  }
});

// node_modules/fs-extra/lib/json/jsonfile.js
var require_jsonfile2 = __commonJS({
  "node_modules/fs-extra/lib/json/jsonfile.js"(exports2, module2) {
    "use strict";
    var jsonFile = require_jsonfile();
    module2.exports = {
      readJson: jsonFile.readFile,
      readJsonSync: jsonFile.readFileSync,
      writeJson: jsonFile.writeFile,
      writeJsonSync: jsonFile.writeFileSync
    };
  }
});

// node_modules/fs-extra/lib/output/index.js
var require_output = __commonJS({
  "node_modules/fs-extra/lib/output/index.js"(exports2, module2) {
    "use strict";
    var u = require_universalify().fromCallback;
    var fs2 = require_graceful_fs();
    var path2 = require("path");
    var mkdir = require_mkdirs();
    var pathExists = require_path_exists().pathExists;
    function outputFile(file, data, encoding, callback) {
      if (typeof encoding === "function") {
        callback = encoding;
        encoding = "utf8";
      }
      const dir = path2.dirname(file);
      pathExists(dir, (err, itDoes) => {
        if (err)
          return callback(err);
        if (itDoes)
          return fs2.writeFile(file, data, encoding, callback);
        mkdir.mkdirs(dir, (err2) => {
          if (err2)
            return callback(err2);
          fs2.writeFile(file, data, encoding, callback);
        });
      });
    }
    function outputFileSync(file, ...args) {
      const dir = path2.dirname(file);
      if (fs2.existsSync(dir)) {
        return fs2.writeFileSync(file, ...args);
      }
      mkdir.mkdirsSync(dir);
      fs2.writeFileSync(file, ...args);
    }
    module2.exports = {
      outputFile: u(outputFile),
      outputFileSync
    };
  }
});

// node_modules/fs-extra/lib/json/output-json.js
var require_output_json = __commonJS({
  "node_modules/fs-extra/lib/json/output-json.js"(exports2, module2) {
    "use strict";
    var { stringify } = require_utils6();
    var { outputFile } = require_output();
    async function outputJson(file, data, options = {}) {
      const str = stringify(data, options);
      await outputFile(file, str, options);
    }
    module2.exports = outputJson;
  }
});

// node_modules/fs-extra/lib/json/output-json-sync.js
var require_output_json_sync = __commonJS({
  "node_modules/fs-extra/lib/json/output-json-sync.js"(exports2, module2) {
    "use strict";
    var { stringify } = require_utils6();
    var { outputFileSync } = require_output();
    function outputJsonSync(file, data, options) {
      const str = stringify(data, options);
      outputFileSync(file, str, options);
    }
    module2.exports = outputJsonSync;
  }
});

// node_modules/fs-extra/lib/json/index.js
var require_json = __commonJS({
  "node_modules/fs-extra/lib/json/index.js"(exports2, module2) {
    "use strict";
    var u = require_universalify().fromPromise;
    var jsonFile = require_jsonfile2();
    jsonFile.outputJson = u(require_output_json());
    jsonFile.outputJsonSync = require_output_json_sync();
    jsonFile.outputJSON = jsonFile.outputJson;
    jsonFile.outputJSONSync = jsonFile.outputJsonSync;
    jsonFile.writeJSON = jsonFile.writeJson;
    jsonFile.writeJSONSync = jsonFile.writeJsonSync;
    jsonFile.readJSON = jsonFile.readJson;
    jsonFile.readJSONSync = jsonFile.readJsonSync;
    module2.exports = jsonFile;
  }
});

// node_modules/fs-extra/lib/move-sync/move-sync.js
var require_move_sync = __commonJS({
  "node_modules/fs-extra/lib/move-sync/move-sync.js"(exports2, module2) {
    "use strict";
    var fs2 = require_graceful_fs();
    var path2 = require("path");
    var copySync = require_copy_sync2().copySync;
    var removeSync = require_remove().removeSync;
    var mkdirpSync = require_mkdirs().mkdirpSync;
    var stat = require_stat();
    function moveSync(src, dest, opts) {
      opts = opts || {};
      const overwrite = opts.overwrite || opts.clobber || false;
      const { srcStat, isChangingCase = false } = stat.checkPathsSync(src, dest, "move", opts);
      stat.checkParentPathsSync(src, srcStat, dest, "move");
      if (!isParentRoot(dest))
        mkdirpSync(path2.dirname(dest));
      return doRename(src, dest, overwrite, isChangingCase);
    }
    function isParentRoot(dest) {
      const parent = path2.dirname(dest);
      const parsedPath = path2.parse(parent);
      return parsedPath.root === parent;
    }
    function doRename(src, dest, overwrite, isChangingCase) {
      if (isChangingCase)
        return rename(src, dest, overwrite);
      if (overwrite) {
        removeSync(dest);
        return rename(src, dest, overwrite);
      }
      if (fs2.existsSync(dest))
        throw new Error("dest already exists.");
      return rename(src, dest, overwrite);
    }
    function rename(src, dest, overwrite) {
      try {
        fs2.renameSync(src, dest);
      } catch (err) {
        if (err.code !== "EXDEV")
          throw err;
        return moveAcrossDevice(src, dest, overwrite);
      }
    }
    function moveAcrossDevice(src, dest, overwrite) {
      const opts = {
        overwrite,
        errorOnExist: true
      };
      copySync(src, dest, opts);
      return removeSync(src);
    }
    module2.exports = moveSync;
  }
});

// node_modules/fs-extra/lib/move-sync/index.js
var require_move_sync2 = __commonJS({
  "node_modules/fs-extra/lib/move-sync/index.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      moveSync: require_move_sync()
    };
  }
});

// node_modules/fs-extra/lib/move/move.js
var require_move = __commonJS({
  "node_modules/fs-extra/lib/move/move.js"(exports2, module2) {
    "use strict";
    var fs2 = require_graceful_fs();
    var path2 = require("path");
    var copy = require_copy2().copy;
    var remove = require_remove().remove;
    var mkdirp = require_mkdirs().mkdirp;
    var pathExists = require_path_exists().pathExists;
    var stat = require_stat();
    function move(src, dest, opts, cb) {
      if (typeof opts === "function") {
        cb = opts;
        opts = {};
      }
      const overwrite = opts.overwrite || opts.clobber || false;
      stat.checkPaths(src, dest, "move", opts, (err, stats) => {
        if (err)
          return cb(err);
        const { srcStat, isChangingCase = false } = stats;
        stat.checkParentPaths(src, srcStat, dest, "move", (err2) => {
          if (err2)
            return cb(err2);
          if (isParentRoot(dest))
            return doRename(src, dest, overwrite, isChangingCase, cb);
          mkdirp(path2.dirname(dest), (err3) => {
            if (err3)
              return cb(err3);
            return doRename(src, dest, overwrite, isChangingCase, cb);
          });
        });
      });
    }
    function isParentRoot(dest) {
      const parent = path2.dirname(dest);
      const parsedPath = path2.parse(parent);
      return parsedPath.root === parent;
    }
    function doRename(src, dest, overwrite, isChangingCase, cb) {
      if (isChangingCase)
        return rename(src, dest, overwrite, cb);
      if (overwrite) {
        return remove(dest, (err) => {
          if (err)
            return cb(err);
          return rename(src, dest, overwrite, cb);
        });
      }
      pathExists(dest, (err, destExists) => {
        if (err)
          return cb(err);
        if (destExists)
          return cb(new Error("dest already exists."));
        return rename(src, dest, overwrite, cb);
      });
    }
    function rename(src, dest, overwrite, cb) {
      fs2.rename(src, dest, (err) => {
        if (!err)
          return cb();
        if (err.code !== "EXDEV")
          return cb(err);
        return moveAcrossDevice(src, dest, overwrite, cb);
      });
    }
    function moveAcrossDevice(src, dest, overwrite, cb) {
      const opts = {
        overwrite,
        errorOnExist: true
      };
      copy(src, dest, opts, (err) => {
        if (err)
          return cb(err);
        return remove(src, cb);
      });
    }
    module2.exports = move;
  }
});

// node_modules/fs-extra/lib/move/index.js
var require_move2 = __commonJS({
  "node_modules/fs-extra/lib/move/index.js"(exports2, module2) {
    "use strict";
    var u = require_universalify().fromCallback;
    module2.exports = {
      move: u(require_move())
    };
  }
});

// node_modules/fs-extra/lib/index.js
var require_lib = __commonJS({
  "node_modules/fs-extra/lib/index.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      ...require_fs5(),
      ...require_copy_sync2(),
      ...require_copy2(),
      ...require_empty(),
      ...require_ensure(),
      ...require_json(),
      ...require_mkdirs(),
      ...require_move_sync2(),
      ...require_move2(),
      ...require_output(),
      ...require_path_exists(),
      ...require_remove()
    };
  }
});

// node_modules/rescript/lib/js/caml.js
var require_caml = __commonJS({
  "node_modules/rescript/lib/js/caml.js"(exports2) {
    "use strict";
    function caml_int_compare(x, y) {
      if (x < y) {
        return -1;
      } else if (x === y) {
        return 0;
      } else {
        return 1;
      }
    }
    function caml_bool_compare(x, y) {
      if (x) {
        if (y) {
          return 0;
        } else {
          return 1;
        }
      } else if (y) {
        return -1;
      } else {
        return 0;
      }
    }
    function caml_float_compare(x, y) {
      if (x === y) {
        return 0;
      } else if (x < y) {
        return -1;
      } else if (x > y || x === x) {
        return 1;
      } else if (y === y) {
        return -1;
      } else {
        return 0;
      }
    }
    function caml_string_compare(s1, s2) {
      if (s1 === s2) {
        return 0;
      } else if (s1 < s2) {
        return -1;
      } else {
        return 1;
      }
    }
    function caml_bool_min(x, y) {
      if (x) {
        return y;
      } else {
        return x;
      }
    }
    function caml_int_min(x, y) {
      if (x < y) {
        return x;
      } else {
        return y;
      }
    }
    function caml_float_min(x, y) {
      if (x < y) {
        return x;
      } else {
        return y;
      }
    }
    function caml_string_min(x, y) {
      if (x < y) {
        return x;
      } else {
        return y;
      }
    }
    function caml_int32_min(x, y) {
      if (x < y) {
        return x;
      } else {
        return y;
      }
    }
    function caml_bool_max(x, y) {
      if (x) {
        return x;
      } else {
        return y;
      }
    }
    function caml_int_max(x, y) {
      if (x > y) {
        return x;
      } else {
        return y;
      }
    }
    function caml_float_max(x, y) {
      if (x > y) {
        return x;
      } else {
        return y;
      }
    }
    function caml_string_max(x, y) {
      if (x > y) {
        return x;
      } else {
        return y;
      }
    }
    function caml_int32_max(x, y) {
      if (x > y) {
        return x;
      } else {
        return y;
      }
    }
    function i64_eq(x, y) {
      if (x[1] === y[1]) {
        return x[0] === y[0];
      } else {
        return false;
      }
    }
    function i64_ge(param, param$1) {
      var other_hi = param$1[0];
      var hi = param[0];
      if (hi > other_hi) {
        return true;
      } else if (hi < other_hi) {
        return false;
      } else {
        return param[1] >= param$1[1];
      }
    }
    function i64_neq(x, y) {
      return !i64_eq(x, y);
    }
    function i64_lt(x, y) {
      return !i64_ge(x, y);
    }
    function i64_gt(x, y) {
      if (x[0] > y[0]) {
        return true;
      } else if (x[0] < y[0]) {
        return false;
      } else {
        return x[1] > y[1];
      }
    }
    function i64_le(x, y) {
      return !i64_gt(x, y);
    }
    function i64_min(x, y) {
      if (i64_ge(x, y)) {
        return y;
      } else {
        return x;
      }
    }
    function i64_max(x, y) {
      if (i64_gt(x, y)) {
        return x;
      } else {
        return y;
      }
    }
    exports2.caml_int_compare = caml_int_compare;
    exports2.caml_bool_compare = caml_bool_compare;
    exports2.caml_float_compare = caml_float_compare;
    exports2.caml_string_compare = caml_string_compare;
    exports2.caml_bool_min = caml_bool_min;
    exports2.caml_int_min = caml_int_min;
    exports2.caml_float_min = caml_float_min;
    exports2.caml_string_min = caml_string_min;
    exports2.caml_int32_min = caml_int32_min;
    exports2.caml_bool_max = caml_bool_max;
    exports2.caml_int_max = caml_int_max;
    exports2.caml_float_max = caml_float_max;
    exports2.caml_string_max = caml_string_max;
    exports2.caml_int32_max = caml_int32_max;
    exports2.i64_eq = i64_eq;
    exports2.i64_neq = i64_neq;
    exports2.i64_lt = i64_lt;
    exports2.i64_gt = i64_gt;
    exports2.i64_le = i64_le;
    exports2.i64_ge = i64_ge;
    exports2.i64_min = i64_min;
    exports2.i64_max = i64_max;
  }
});

// node_modules/rescript/lib/js/caml_array.js
var require_caml_array = __commonJS({
  "node_modules/rescript/lib/js/caml_array.js"(exports2) {
    "use strict";
    function sub(x, offset, len2) {
      var result = new Array(len2);
      var j = 0;
      var i = offset;
      while (j < len2) {
        result[j] = x[i];
        j = j + 1 | 0;
        i = i + 1 | 0;
      }
      ;
      return result;
    }
    function len(_acc, _l) {
      while (true) {
        var l = _l;
        var acc = _acc;
        if (!l) {
          return acc;
        }
        _l = l.tl;
        _acc = l.hd.length + acc | 0;
        continue;
      }
      ;
    }
    function fill(arr, _i, _l) {
      while (true) {
        var l = _l;
        var i = _i;
        if (!l) {
          return;
        }
        var x = l.hd;
        var l$1 = x.length;
        var k = i;
        var j = 0;
        while (j < l$1) {
          arr[k] = x[j];
          k = k + 1 | 0;
          j = j + 1 | 0;
        }
        ;
        _l = l.tl;
        _i = k;
        continue;
      }
      ;
    }
    function concat(l) {
      var v = len(0, l);
      var result = new Array(v);
      fill(result, 0, l);
      return result;
    }
    function set(xs, index, newval) {
      if (index < 0 || index >= xs.length) {
        throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "index out of bounds",
          Error: new Error()
        };
      }
      xs[index] = newval;
    }
    function get(xs, index) {
      if (index < 0 || index >= xs.length) {
        throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "index out of bounds",
          Error: new Error()
        };
      }
      return xs[index];
    }
    function make(len2, init) {
      var b = new Array(len2);
      for (var i = 0; i < len2; ++i) {
        b[i] = init;
      }
      return b;
    }
    function make_float(len2) {
      var b = new Array(len2);
      for (var i = 0; i < len2; ++i) {
        b[i] = 0;
      }
      return b;
    }
    function blit(a1, i1, a2, i2, len2) {
      if (i2 <= i1) {
        for (var j = 0; j < len2; ++j) {
          a2[j + i2 | 0] = a1[j + i1 | 0];
        }
        return;
      }
      for (var j$1 = len2 - 1 | 0; j$1 >= 0; --j$1) {
        a2[j$1 + i2 | 0] = a1[j$1 + i1 | 0];
      }
    }
    function dup(prim) {
      return prim.slice(0);
    }
    exports2.dup = dup;
    exports2.sub = sub;
    exports2.concat = concat;
    exports2.make = make;
    exports2.make_float = make_float;
    exports2.blit = blit;
    exports2.get = get;
    exports2.set = set;
  }
});

// node_modules/rescript/lib/js/curry.js
var require_curry = __commonJS({
  "node_modules/rescript/lib/js/curry.js"(exports2) {
    "use strict";
    var Caml_array = require_caml_array();
    function app(_f, _args) {
      while (true) {
        var args = _args;
        var f = _f;
        var init_arity = f.length;
        var arity = init_arity === 0 ? 1 : init_arity;
        var len = args.length;
        var d = arity - len | 0;
        if (d === 0) {
          return f.apply(null, args);
        }
        if (d >= 0) {
          return function(f2, args2) {
            return function(x) {
              return app(f2, args2.concat([x]));
            };
          }(f, args);
        }
        _args = Caml_array.sub(args, arity, -d | 0);
        _f = f.apply(null, Caml_array.sub(args, 0, arity));
        continue;
      }
      ;
    }
    function _1(o, a0) {
      var arity = o.length;
      if (arity === 1) {
        return o(a0);
      } else {
        switch (arity) {
          case 1:
            return o(a0);
          case 2:
            return function(param) {
              return o(a0, param);
            };
          case 3:
            return function(param, param$1) {
              return o(a0, param, param$1);
            };
          case 4:
            return function(param, param$1, param$2) {
              return o(a0, param, param$1, param$2);
            };
          case 5:
            return function(param, param$1, param$2, param$3) {
              return o(a0, param, param$1, param$2, param$3);
            };
          case 6:
            return function(param, param$1, param$2, param$3, param$4) {
              return o(a0, param, param$1, param$2, param$3, param$4);
            };
          case 7:
            return function(param, param$1, param$2, param$3, param$4, param$5) {
              return o(a0, param, param$1, param$2, param$3, param$4, param$5);
            };
          default:
            return app(o, [a0]);
        }
      }
    }
    function __1(o) {
      var arity = o.length;
      if (arity === 1) {
        return o;
      } else {
        return function(a0) {
          return _1(o, a0);
        };
      }
    }
    function _2(o, a0, a1) {
      var arity = o.length;
      if (arity === 2) {
        return o(a0, a1);
      } else {
        switch (arity) {
          case 1:
            return app(o(a0), [a1]);
          case 2:
            return o(a0, a1);
          case 3:
            return function(param) {
              return o(a0, a1, param);
            };
          case 4:
            return function(param, param$1) {
              return o(a0, a1, param, param$1);
            };
          case 5:
            return function(param, param$1, param$2) {
              return o(a0, a1, param, param$1, param$2);
            };
          case 6:
            return function(param, param$1, param$2, param$3) {
              return o(a0, a1, param, param$1, param$2, param$3);
            };
          case 7:
            return function(param, param$1, param$2, param$3, param$4) {
              return o(a0, a1, param, param$1, param$2, param$3, param$4);
            };
          default:
            return app(o, [
              a0,
              a1
            ]);
        }
      }
    }
    function __2(o) {
      var arity = o.length;
      if (arity === 2) {
        return o;
      } else {
        return function(a0, a1) {
          return _2(o, a0, a1);
        };
      }
    }
    function _3(o, a0, a1, a2) {
      var arity = o.length;
      if (arity === 3) {
        return o(a0, a1, a2);
      } else {
        switch (arity) {
          case 1:
            return app(o(a0), [
              a1,
              a2
            ]);
          case 2:
            return app(o(a0, a1), [a2]);
          case 3:
            return o(a0, a1, a2);
          case 4:
            return function(param) {
              return o(a0, a1, a2, param);
            };
          case 5:
            return function(param, param$1) {
              return o(a0, a1, a2, param, param$1);
            };
          case 6:
            return function(param, param$1, param$2) {
              return o(a0, a1, a2, param, param$1, param$2);
            };
          case 7:
            return function(param, param$1, param$2, param$3) {
              return o(a0, a1, a2, param, param$1, param$2, param$3);
            };
          default:
            return app(o, [
              a0,
              a1,
              a2
            ]);
        }
      }
    }
    function __3(o) {
      var arity = o.length;
      if (arity === 3) {
        return o;
      } else {
        return function(a0, a1, a2) {
          return _3(o, a0, a1, a2);
        };
      }
    }
    function _4(o, a0, a1, a2, a3) {
      var arity = o.length;
      if (arity === 4) {
        return o(a0, a1, a2, a3);
      } else {
        switch (arity) {
          case 1:
            return app(o(a0), [
              a1,
              a2,
              a3
            ]);
          case 2:
            return app(o(a0, a1), [
              a2,
              a3
            ]);
          case 3:
            return app(o(a0, a1, a2), [a3]);
          case 4:
            return o(a0, a1, a2, a3);
          case 5:
            return function(param) {
              return o(a0, a1, a2, a3, param);
            };
          case 6:
            return function(param, param$1) {
              return o(a0, a1, a2, a3, param, param$1);
            };
          case 7:
            return function(param, param$1, param$2) {
              return o(a0, a1, a2, a3, param, param$1, param$2);
            };
          default:
            return app(o, [
              a0,
              a1,
              a2,
              a3
            ]);
        }
      }
    }
    function __4(o) {
      var arity = o.length;
      if (arity === 4) {
        return o;
      } else {
        return function(a0, a1, a2, a3) {
          return _4(o, a0, a1, a2, a3);
        };
      }
    }
    function _5(o, a0, a1, a2, a3, a4) {
      var arity = o.length;
      if (arity === 5) {
        return o(a0, a1, a2, a3, a4);
      } else {
        switch (arity) {
          case 1:
            return app(o(a0), [
              a1,
              a2,
              a3,
              a4
            ]);
          case 2:
            return app(o(a0, a1), [
              a2,
              a3,
              a4
            ]);
          case 3:
            return app(o(a0, a1, a2), [
              a3,
              a4
            ]);
          case 4:
            return app(o(a0, a1, a2, a3), [a4]);
          case 5:
            return o(a0, a1, a2, a3, a4);
          case 6:
            return function(param) {
              return o(a0, a1, a2, a3, a4, param);
            };
          case 7:
            return function(param, param$1) {
              return o(a0, a1, a2, a3, a4, param, param$1);
            };
          default:
            return app(o, [
              a0,
              a1,
              a2,
              a3,
              a4
            ]);
        }
      }
    }
    function __5(o) {
      var arity = o.length;
      if (arity === 5) {
        return o;
      } else {
        return function(a0, a1, a2, a3, a4) {
          return _5(o, a0, a1, a2, a3, a4);
        };
      }
    }
    function _6(o, a0, a1, a2, a3, a4, a5) {
      var arity = o.length;
      if (arity === 6) {
        return o(a0, a1, a2, a3, a4, a5);
      } else {
        switch (arity) {
          case 1:
            return app(o(a0), [
              a1,
              a2,
              a3,
              a4,
              a5
            ]);
          case 2:
            return app(o(a0, a1), [
              a2,
              a3,
              a4,
              a5
            ]);
          case 3:
            return app(o(a0, a1, a2), [
              a3,
              a4,
              a5
            ]);
          case 4:
            return app(o(a0, a1, a2, a3), [
              a4,
              a5
            ]);
          case 5:
            return app(o(a0, a1, a2, a3, a4), [a5]);
          case 6:
            return o(a0, a1, a2, a3, a4, a5);
          case 7:
            return function(param) {
              return o(a0, a1, a2, a3, a4, a5, param);
            };
          default:
            return app(o, [
              a0,
              a1,
              a2,
              a3,
              a4,
              a5
            ]);
        }
      }
    }
    function __6(o) {
      var arity = o.length;
      if (arity === 6) {
        return o;
      } else {
        return function(a0, a1, a2, a3, a4, a5) {
          return _6(o, a0, a1, a2, a3, a4, a5);
        };
      }
    }
    function _7(o, a0, a1, a2, a3, a4, a5, a6) {
      var arity = o.length;
      if (arity === 7) {
        return o(a0, a1, a2, a3, a4, a5, a6);
      } else {
        switch (arity) {
          case 1:
            return app(o(a0), [
              a1,
              a2,
              a3,
              a4,
              a5,
              a6
            ]);
          case 2:
            return app(o(a0, a1), [
              a2,
              a3,
              a4,
              a5,
              a6
            ]);
          case 3:
            return app(o(a0, a1, a2), [
              a3,
              a4,
              a5,
              a6
            ]);
          case 4:
            return app(o(a0, a1, a2, a3), [
              a4,
              a5,
              a6
            ]);
          case 5:
            return app(o(a0, a1, a2, a3, a4), [
              a5,
              a6
            ]);
          case 6:
            return app(o(a0, a1, a2, a3, a4, a5), [a6]);
          case 7:
            return o(a0, a1, a2, a3, a4, a5, a6);
          default:
            return app(o, [
              a0,
              a1,
              a2,
              a3,
              a4,
              a5,
              a6
            ]);
        }
      }
    }
    function __7(o) {
      var arity = o.length;
      if (arity === 7) {
        return o;
      } else {
        return function(a0, a1, a2, a3, a4, a5, a6) {
          return _7(o, a0, a1, a2, a3, a4, a5, a6);
        };
      }
    }
    function _8(o, a0, a1, a2, a3, a4, a5, a6, a7) {
      var arity = o.length;
      if (arity === 8) {
        return o(a0, a1, a2, a3, a4, a5, a6, a7);
      } else {
        switch (arity) {
          case 1:
            return app(o(a0), [
              a1,
              a2,
              a3,
              a4,
              a5,
              a6,
              a7
            ]);
          case 2:
            return app(o(a0, a1), [
              a2,
              a3,
              a4,
              a5,
              a6,
              a7
            ]);
          case 3:
            return app(o(a0, a1, a2), [
              a3,
              a4,
              a5,
              a6,
              a7
            ]);
          case 4:
            return app(o(a0, a1, a2, a3), [
              a4,
              a5,
              a6,
              a7
            ]);
          case 5:
            return app(o(a0, a1, a2, a3, a4), [
              a5,
              a6,
              a7
            ]);
          case 6:
            return app(o(a0, a1, a2, a3, a4, a5), [
              a6,
              a7
            ]);
          case 7:
            return app(o(a0, a1, a2, a3, a4, a5, a6), [a7]);
          default:
            return app(o, [
              a0,
              a1,
              a2,
              a3,
              a4,
              a5,
              a6,
              a7
            ]);
        }
      }
    }
    function __8(o) {
      var arity = o.length;
      if (arity === 8) {
        return o;
      } else {
        return function(a0, a1, a2, a3, a4, a5, a6, a7) {
          return _8(o, a0, a1, a2, a3, a4, a5, a6, a7);
        };
      }
    }
    exports2.app = app;
    exports2._1 = _1;
    exports2.__1 = __1;
    exports2._2 = _2;
    exports2.__2 = __2;
    exports2._3 = _3;
    exports2.__3 = __3;
    exports2._4 = _4;
    exports2.__4 = __4;
    exports2._5 = _5;
    exports2.__5 = __5;
    exports2._6 = _6;
    exports2.__6 = __6;
    exports2._7 = _7;
    exports2.__7 = __7;
    exports2._8 = _8;
    exports2.__8 = __8;
  }
});

// node_modules/rescript/lib/js/js_int.js
var require_js_int = __commonJS({
  "node_modules/rescript/lib/js/js_int.js"(exports2) {
    "use strict";
    function equal(x, y) {
      return x === y;
    }
    var max = 2147483647;
    var min = -2147483648;
    exports2.equal = equal;
    exports2.max = max;
    exports2.min = min;
  }
});

// node_modules/rescript/lib/js/js_math.js
var require_js_math = __commonJS({
  "node_modules/rescript/lib/js/js_math.js"(exports2) {
    "use strict";
    var Js_int = require_js_int();
    function unsafe_ceil(prim) {
      return Math.ceil(prim);
    }
    function ceil_int(f) {
      if (f > Js_int.max) {
        return Js_int.max;
      } else if (f < Js_int.min) {
        return Js_int.min;
      } else {
        return Math.ceil(f);
      }
    }
    function unsafe_floor(prim) {
      return Math.floor(prim);
    }
    function floor_int(f) {
      if (f > Js_int.max) {
        return Js_int.max;
      } else if (f < Js_int.min) {
        return Js_int.min;
      } else {
        return Math.floor(f);
      }
    }
    function random_int(min, max) {
      return floor_int(Math.random() * (max - min | 0)) + min | 0;
    }
    var ceil = ceil_int;
    var floor = floor_int;
    exports2.unsafe_ceil = unsafe_ceil;
    exports2.ceil_int = ceil_int;
    exports2.ceil = ceil;
    exports2.unsafe_floor = unsafe_floor;
    exports2.floor_int = floor_int;
    exports2.floor = floor;
    exports2.random_int = random_int;
  }
});

// node_modules/rescript/lib/js/caml_option.js
var require_caml_option = __commonJS({
  "node_modules/rescript/lib/js/caml_option.js"(exports2) {
    "use strict";
    function isNested(x) {
      return x.BS_PRIVATE_NESTED_SOME_NONE !== void 0;
    }
    function some(x) {
      if (x === void 0) {
        return {
          BS_PRIVATE_NESTED_SOME_NONE: 0
        };
      } else if (x !== null && x.BS_PRIVATE_NESTED_SOME_NONE !== void 0) {
        return {
          BS_PRIVATE_NESTED_SOME_NONE: x.BS_PRIVATE_NESTED_SOME_NONE + 1 | 0
        };
      } else {
        return x;
      }
    }
    function nullable_to_opt(x) {
      if (x == null) {
        return;
      } else {
        return some(x);
      }
    }
    function undefined_to_opt(x) {
      if (x === void 0) {
        return;
      } else {
        return some(x);
      }
    }
    function null_to_opt(x) {
      if (x === null) {
        return;
      } else {
        return some(x);
      }
    }
    function valFromOption(x) {
      if (!(x !== null && x.BS_PRIVATE_NESTED_SOME_NONE !== void 0)) {
        return x;
      }
      var depth = x.BS_PRIVATE_NESTED_SOME_NONE;
      if (depth === 0) {
        return;
      } else {
        return {
          BS_PRIVATE_NESTED_SOME_NONE: depth - 1 | 0
        };
      }
    }
    function option_get(x) {
      if (x === void 0) {
        return;
      } else {
        return valFromOption(x);
      }
    }
    function option_unwrap(x) {
      if (x !== void 0) {
        return x.VAL;
      } else {
        return x;
      }
    }
    exports2.nullable_to_opt = nullable_to_opt;
    exports2.undefined_to_opt = undefined_to_opt;
    exports2.null_to_opt = null_to_opt;
    exports2.valFromOption = valFromOption;
    exports2.some = some;
    exports2.isNested = isNested;
    exports2.option_get = option_get;
    exports2.option_unwrap = option_unwrap;
  }
});

// node_modules/rescript/lib/js/belt_Array.js
var require_belt_Array = __commonJS({
  "node_modules/rescript/lib/js/belt_Array.js"(exports2) {
    "use strict";
    var Caml = require_caml();
    var Curry = require_curry();
    var Js_math = require_js_math();
    var Caml_option = require_caml_option();
    function get(arr, i) {
      if (i >= 0 && i < arr.length) {
        return Caml_option.some(arr[i]);
      }
    }
    function getExn(arr, i) {
      if (!(i >= 0 && i < arr.length)) {
        throw {
          RE_EXN_ID: "Assert_failure",
          _1: [
            "belt_Array.ml",
            27,
            4
          ],
          Error: new Error()
        };
      }
      return arr[i];
    }
    function set(arr, i, v) {
      if (i >= 0 && i < arr.length) {
        arr[i] = v;
        return true;
      } else {
        return false;
      }
    }
    function setExn(arr, i, v) {
      if (!(i >= 0 && i < arr.length)) {
        throw {
          RE_EXN_ID: "Assert_failure",
          _1: [
            "belt_Array.ml",
            33,
            2
          ],
          Error: new Error()
        };
      }
      arr[i] = v;
    }
    function swapUnsafe(xs, i, j) {
      var tmp = xs[i];
      xs[i] = xs[j];
      xs[j] = tmp;
    }
    function shuffleInPlace(xs) {
      var len = xs.length;
      for (var i = 0; i < len; ++i) {
        swapUnsafe(xs, i, Js_math.random_int(i, len));
      }
    }
    function shuffle(xs) {
      var result = xs.slice(0);
      shuffleInPlace(result);
      return result;
    }
    function reverseInPlace(xs) {
      var len = xs.length;
      var ofs = 0;
      for (var i = 0, i_finish = len / 2 | 0; i < i_finish; ++i) {
        swapUnsafe(xs, ofs + i | 0, ((ofs + len | 0) - i | 0) - 1 | 0);
      }
    }
    function reverse(xs) {
      var len = xs.length;
      var result = new Array(len);
      for (var i = 0; i < len; ++i) {
        result[i] = xs[(len - 1 | 0) - i | 0];
      }
      return result;
    }
    function make(l, f) {
      if (l <= 0) {
        return [];
      }
      var res = new Array(l);
      for (var i = 0; i < l; ++i) {
        res[i] = f;
      }
      return res;
    }
    function makeByU(l, f) {
      if (l <= 0) {
        return [];
      }
      var res = new Array(l);
      for (var i = 0; i < l; ++i) {
        res[i] = f(i);
      }
      return res;
    }
    function makeBy(l, f) {
      return makeByU(l, Curry.__1(f));
    }
    function makeByAndShuffleU(l, f) {
      var u = makeByU(l, f);
      shuffleInPlace(u);
      return u;
    }
    function makeByAndShuffle(l, f) {
      return makeByAndShuffleU(l, Curry.__1(f));
    }
    function range(start, finish) {
      var cut = finish - start | 0;
      if (cut < 0) {
        return [];
      }
      var arr = new Array(cut + 1 | 0);
      for (var i = 0; i <= cut; ++i) {
        arr[i] = start + i | 0;
      }
      return arr;
    }
    function rangeBy(start, finish, step) {
      var cut = finish - start | 0;
      if (cut < 0 || step <= 0) {
        return [];
      }
      var nb = (cut / step | 0) + 1 | 0;
      var arr = new Array(nb);
      var cur = start;
      for (var i = 0; i < nb; ++i) {
        arr[i] = cur;
        cur = cur + step | 0;
      }
      return arr;
    }
    function zip(xs, ys) {
      var lenx = xs.length;
      var leny = ys.length;
      var len = lenx < leny ? lenx : leny;
      var s = new Array(len);
      for (var i = 0; i < len; ++i) {
        s[i] = [
          xs[i],
          ys[i]
        ];
      }
      return s;
    }
    function zipByU(xs, ys, f) {
      var lenx = xs.length;
      var leny = ys.length;
      var len = lenx < leny ? lenx : leny;
      var s = new Array(len);
      for (var i = 0; i < len; ++i) {
        s[i] = f(xs[i], ys[i]);
      }
      return s;
    }
    function zipBy(xs, ys, f) {
      return zipByU(xs, ys, Curry.__2(f));
    }
    function concat(a1, a2) {
      var l1 = a1.length;
      var l2 = a2.length;
      var a1a2 = new Array(l1 + l2 | 0);
      for (var i = 0; i < l1; ++i) {
        a1a2[i] = a1[i];
      }
      for (var i$1 = 0; i$1 < l2; ++i$1) {
        a1a2[l1 + i$1 | 0] = a2[i$1];
      }
      return a1a2;
    }
    function concatMany(arrs) {
      var lenArrs = arrs.length;
      var totalLen = 0;
      for (var i = 0; i < lenArrs; ++i) {
        totalLen = totalLen + arrs[i].length | 0;
      }
      var result = new Array(totalLen);
      totalLen = 0;
      for (var j = 0; j < lenArrs; ++j) {
        var cur = arrs[j];
        for (var k = 0, k_finish = cur.length; k < k_finish; ++k) {
          result[totalLen] = cur[k];
          totalLen = totalLen + 1 | 0;
        }
      }
      return result;
    }
    function slice(a, offset, len) {
      if (len <= 0) {
        return [];
      }
      var lena = a.length;
      var ofs = offset < 0 ? Caml.caml_int_max(lena + offset | 0, 0) : offset;
      var hasLen = lena - ofs | 0;
      var copyLength = hasLen < len ? hasLen : len;
      if (copyLength <= 0) {
        return [];
      }
      var result = new Array(copyLength);
      for (var i = 0; i < copyLength; ++i) {
        result[i] = a[ofs + i | 0];
      }
      return result;
    }
    function sliceToEnd(a, offset) {
      var lena = a.length;
      var ofs = offset < 0 ? Caml.caml_int_max(lena + offset | 0, 0) : offset;
      var len = lena - ofs | 0;
      var result = new Array(len);
      for (var i = 0; i < len; ++i) {
        result[i] = a[ofs + i | 0];
      }
      return result;
    }
    function fill(a, offset, len, v) {
      if (len <= 0) {
        return;
      }
      var lena = a.length;
      var ofs = offset < 0 ? Caml.caml_int_max(lena + offset | 0, 0) : offset;
      var hasLen = lena - ofs | 0;
      var fillLength = hasLen < len ? hasLen : len;
      if (fillLength <= 0) {
        return;
      }
      for (var i = ofs, i_finish = ofs + fillLength | 0; i < i_finish; ++i) {
        a[i] = v;
      }
    }
    function blitUnsafe(a1, srcofs1, a2, srcofs2, blitLength) {
      if (srcofs2 <= srcofs1) {
        for (var j = 0; j < blitLength; ++j) {
          a2[j + srcofs2 | 0] = a1[j + srcofs1 | 0];
        }
        return;
      }
      for (var j$1 = blitLength - 1 | 0; j$1 >= 0; --j$1) {
        a2[j$1 + srcofs2 | 0] = a1[j$1 + srcofs1 | 0];
      }
    }
    function blit(a1, ofs1, a2, ofs2, len) {
      var lena1 = a1.length;
      var lena2 = a2.length;
      var srcofs1 = ofs1 < 0 ? Caml.caml_int_max(lena1 + ofs1 | 0, 0) : ofs1;
      var srcofs2 = ofs2 < 0 ? Caml.caml_int_max(lena2 + ofs2 | 0, 0) : ofs2;
      var blitLength = Caml.caml_int_min(len, Caml.caml_int_min(lena1 - srcofs1 | 0, lena2 - srcofs2 | 0));
      if (srcofs2 <= srcofs1) {
        for (var j = 0; j < blitLength; ++j) {
          a2[j + srcofs2 | 0] = a1[j + srcofs1 | 0];
        }
        return;
      }
      for (var j$1 = blitLength - 1 | 0; j$1 >= 0; --j$1) {
        a2[j$1 + srcofs2 | 0] = a1[j$1 + srcofs1 | 0];
      }
    }
    function forEachU(a, f) {
      for (var i = 0, i_finish = a.length; i < i_finish; ++i) {
        f(a[i]);
      }
    }
    function forEach(a, f) {
      return forEachU(a, Curry.__1(f));
    }
    function mapU(a, f) {
      var l = a.length;
      var r = new Array(l);
      for (var i = 0; i < l; ++i) {
        r[i] = f(a[i]);
      }
      return r;
    }
    function map(a, f) {
      return mapU(a, Curry.__1(f));
    }
    function getByU(a, p) {
      var l = a.length;
      var i = 0;
      var r;
      while (r === void 0 && i < l) {
        var v = a[i];
        if (p(v)) {
          r = Caml_option.some(v);
        }
        i = i + 1 | 0;
      }
      ;
      return r;
    }
    function getBy(a, p) {
      return getByU(a, Curry.__1(p));
    }
    function getIndexByU(a, p) {
      var l = a.length;
      var i = 0;
      var r;
      while (r === void 0 && i < l) {
        var v = a[i];
        if (p(v)) {
          r = i;
        }
        i = i + 1 | 0;
      }
      ;
      return r;
    }
    function getIndexBy(a, p) {
      return getIndexByU(a, Curry.__1(p));
    }
    function keepU(a, f) {
      var l = a.length;
      var r = new Array(l);
      var j = 0;
      for (var i = 0; i < l; ++i) {
        var v = a[i];
        if (f(v)) {
          r[j] = v;
          j = j + 1 | 0;
        }
      }
      r.length = j;
      return r;
    }
    function keep(a, f) {
      return keepU(a, Curry.__1(f));
    }
    function keepWithIndexU(a, f) {
      var l = a.length;
      var r = new Array(l);
      var j = 0;
      for (var i = 0; i < l; ++i) {
        var v = a[i];
        if (f(v, i)) {
          r[j] = v;
          j = j + 1 | 0;
        }
      }
      r.length = j;
      return r;
    }
    function keepWithIndex(a, f) {
      return keepWithIndexU(a, Curry.__2(f));
    }
    function keepMapU(a, f) {
      var l = a.length;
      var r = new Array(l);
      var j = 0;
      for (var i = 0; i < l; ++i) {
        var v = a[i];
        var v$1 = f(v);
        if (v$1 !== void 0) {
          r[j] = Caml_option.valFromOption(v$1);
          j = j + 1 | 0;
        }
      }
      r.length = j;
      return r;
    }
    function keepMap(a, f) {
      return keepMapU(a, Curry.__1(f));
    }
    function forEachWithIndexU(a, f) {
      for (var i = 0, i_finish = a.length; i < i_finish; ++i) {
        f(i, a[i]);
      }
    }
    function forEachWithIndex(a, f) {
      return forEachWithIndexU(a, Curry.__2(f));
    }
    function mapWithIndexU(a, f) {
      var l = a.length;
      var r = new Array(l);
      for (var i = 0; i < l; ++i) {
        r[i] = f(i, a[i]);
      }
      return r;
    }
    function mapWithIndex(a, f) {
      return mapWithIndexU(a, Curry.__2(f));
    }
    function reduceU(a, x, f) {
      var r = x;
      for (var i = 0, i_finish = a.length; i < i_finish; ++i) {
        r = f(r, a[i]);
      }
      return r;
    }
    function reduce(a, x, f) {
      return reduceU(a, x, Curry.__2(f));
    }
    function reduceReverseU(a, x, f) {
      var r = x;
      for (var i = a.length - 1 | 0; i >= 0; --i) {
        r = f(r, a[i]);
      }
      return r;
    }
    function reduceReverse(a, x, f) {
      return reduceReverseU(a, x, Curry.__2(f));
    }
    function reduceReverse2U(a, b, x, f) {
      var r = x;
      var len = Caml.caml_int_min(a.length, b.length);
      for (var i = len - 1 | 0; i >= 0; --i) {
        r = f(r, a[i], b[i]);
      }
      return r;
    }
    function reduceReverse2(a, b, x, f) {
      return reduceReverse2U(a, b, x, Curry.__3(f));
    }
    function reduceWithIndexU(a, x, f) {
      var r = x;
      for (var i = 0, i_finish = a.length; i < i_finish; ++i) {
        r = f(r, a[i], i);
      }
      return r;
    }
    function reduceWithIndex(a, x, f) {
      return reduceWithIndexU(a, x, Curry.__3(f));
    }
    function everyU(arr, b) {
      var len = arr.length;
      var _i = 0;
      while (true) {
        var i = _i;
        if (i === len) {
          return true;
        }
        if (!b(arr[i])) {
          return false;
        }
        _i = i + 1 | 0;
        continue;
      }
      ;
    }
    function every(arr, f) {
      return everyU(arr, Curry.__1(f));
    }
    function someU(arr, b) {
      var len = arr.length;
      var _i = 0;
      while (true) {
        var i = _i;
        if (i === len) {
          return false;
        }
        if (b(arr[i])) {
          return true;
        }
        _i = i + 1 | 0;
        continue;
      }
      ;
    }
    function some(arr, f) {
      return someU(arr, Curry.__1(f));
    }
    function everyAux2(arr1, arr2, _i, b, len) {
      while (true) {
        var i = _i;
        if (i === len) {
          return true;
        }
        if (!b(arr1[i], arr2[i])) {
          return false;
        }
        _i = i + 1 | 0;
        continue;
      }
      ;
    }
    function every2U(a, b, p) {
      return everyAux2(a, b, 0, p, Caml.caml_int_min(a.length, b.length));
    }
    function every2(a, b, p) {
      return every2U(a, b, Curry.__2(p));
    }
    function some2U(a, b, p) {
      var _i = 0;
      var len = Caml.caml_int_min(a.length, b.length);
      while (true) {
        var i = _i;
        if (i === len) {
          return false;
        }
        if (p(a[i], b[i])) {
          return true;
        }
        _i = i + 1 | 0;
        continue;
      }
      ;
    }
    function some2(a, b, p) {
      return some2U(a, b, Curry.__2(p));
    }
    function eqU(a, b, p) {
      var lena = a.length;
      var lenb = b.length;
      if (lena === lenb) {
        return everyAux2(a, b, 0, p, lena);
      } else {
        return false;
      }
    }
    function eq(a, b, p) {
      return eqU(a, b, Curry.__2(p));
    }
    function cmpU(a, b, p) {
      var lena = a.length;
      var lenb = b.length;
      if (lena > lenb) {
        return 1;
      } else if (lena < lenb) {
        return -1;
      } else {
        var _i = 0;
        while (true) {
          var i = _i;
          if (i === lena) {
            return 0;
          }
          var c = p(a[i], b[i]);
          if (c !== 0) {
            return c;
          }
          _i = i + 1 | 0;
          continue;
        }
        ;
      }
    }
    function cmp(a, b, p) {
      return cmpU(a, b, Curry.__2(p));
    }
    function partitionU(a, f) {
      var l = a.length;
      var i = 0;
      var j = 0;
      var a1 = new Array(l);
      var a2 = new Array(l);
      for (var ii = 0; ii < l; ++ii) {
        var v = a[ii];
        if (f(v)) {
          a1[i] = v;
          i = i + 1 | 0;
        } else {
          a2[j] = v;
          j = j + 1 | 0;
        }
      }
      a1.length = i;
      a2.length = j;
      return [
        a1,
        a2
      ];
    }
    function partition(a, f) {
      return partitionU(a, Curry.__1(f));
    }
    function unzip(a) {
      var l = a.length;
      var a1 = new Array(l);
      var a2 = new Array(l);
      for (var i = 0; i < l; ++i) {
        var match = a[i];
        a1[i] = match[0];
        a2[i] = match[1];
      }
      return [
        a1,
        a2
      ];
    }
    function joinWithU(a, sep, toString) {
      var l = a.length;
      if (l === 0) {
        return "";
      }
      var lastIndex = l - 1 | 0;
      var _i = 0;
      var _res = "";
      while (true) {
        var res = _res;
        var i = _i;
        if (i === lastIndex) {
          return res + toString(a[i]);
        }
        _res = res + (toString(a[i]) + sep);
        _i = i + 1 | 0;
        continue;
      }
      ;
    }
    function joinWith(a, sep, toString) {
      return joinWithU(a, sep, Curry.__1(toString));
    }
    exports2.get = get;
    exports2.getExn = getExn;
    exports2.set = set;
    exports2.setExn = setExn;
    exports2.shuffleInPlace = shuffleInPlace;
    exports2.shuffle = shuffle;
    exports2.reverseInPlace = reverseInPlace;
    exports2.reverse = reverse;
    exports2.make = make;
    exports2.range = range;
    exports2.rangeBy = rangeBy;
    exports2.makeByU = makeByU;
    exports2.makeBy = makeBy;
    exports2.makeByAndShuffleU = makeByAndShuffleU;
    exports2.makeByAndShuffle = makeByAndShuffle;
    exports2.zip = zip;
    exports2.zipByU = zipByU;
    exports2.zipBy = zipBy;
    exports2.unzip = unzip;
    exports2.concat = concat;
    exports2.concatMany = concatMany;
    exports2.slice = slice;
    exports2.sliceToEnd = sliceToEnd;
    exports2.fill = fill;
    exports2.blit = blit;
    exports2.blitUnsafe = blitUnsafe;
    exports2.forEachU = forEachU;
    exports2.forEach = forEach;
    exports2.mapU = mapU;
    exports2.map = map;
    exports2.getByU = getByU;
    exports2.getBy = getBy;
    exports2.getIndexByU = getIndexByU;
    exports2.getIndexBy = getIndexBy;
    exports2.keepU = keepU;
    exports2.keep = keep;
    exports2.keepWithIndexU = keepWithIndexU;
    exports2.keepWithIndex = keepWithIndex;
    exports2.keepMapU = keepMapU;
    exports2.keepMap = keepMap;
    exports2.forEachWithIndexU = forEachWithIndexU;
    exports2.forEachWithIndex = forEachWithIndex;
    exports2.mapWithIndexU = mapWithIndexU;
    exports2.mapWithIndex = mapWithIndex;
    exports2.partitionU = partitionU;
    exports2.partition = partition;
    exports2.reduceU = reduceU;
    exports2.reduce = reduce;
    exports2.reduceReverseU = reduceReverseU;
    exports2.reduceReverse = reduceReverse;
    exports2.reduceReverse2U = reduceReverse2U;
    exports2.reduceReverse2 = reduceReverse2;
    exports2.reduceWithIndexU = reduceWithIndexU;
    exports2.reduceWithIndex = reduceWithIndex;
    exports2.joinWithU = joinWithU;
    exports2.joinWith = joinWith;
    exports2.someU = someU;
    exports2.some = some;
    exports2.everyU = everyU;
    exports2.every = every;
    exports2.every2U = every2U;
    exports2.every2 = every2;
    exports2.some2U = some2U;
    exports2.some2 = some2;
    exports2.cmpU = cmpU;
    exports2.cmp = cmp;
    exports2.eqU = eqU;
    exports2.eq = eq;
  }
});

// node_modules/rescript/lib/js/belt_SortArray.js
var require_belt_SortArray = __commonJS({
  "node_modules/rescript/lib/js/belt_SortArray.js"(exports2) {
    "use strict";
    var Curry = require_curry();
    var Belt_Array = require_belt_Array();
    function sortedLengthAuxMore(xs, _prec, _acc, len, lt) {
      while (true) {
        var acc = _acc;
        var prec = _prec;
        if (acc >= len) {
          return acc;
        }
        var v = xs[acc];
        if (!lt(v, prec)) {
          return acc;
        }
        _acc = acc + 1 | 0;
        _prec = v;
        continue;
      }
      ;
    }
    function strictlySortedLengthU(xs, lt) {
      var len = xs.length;
      if (len === 0 || len === 1) {
        return len;
      }
      var x0 = xs[0];
      var x1 = xs[1];
      if (lt(x0, x1)) {
        var _prec = x1;
        var _acc = 2;
        while (true) {
          var acc = _acc;
          var prec = _prec;
          if (acc >= len) {
            return acc;
          }
          var v = xs[acc];
          if (!lt(prec, v)) {
            return acc;
          }
          _acc = acc + 1 | 0;
          _prec = v;
          continue;
        }
        ;
      } else if (lt(x1, x0)) {
        return -sortedLengthAuxMore(xs, x1, 2, len, lt) | 0;
      } else {
        return 1;
      }
    }
    function strictlySortedLength(xs, lt) {
      return strictlySortedLengthU(xs, Curry.__2(lt));
    }
    function isSortedU(a, cmp) {
      var len = a.length;
      if (len === 0) {
        return true;
      } else {
        var _i = 0;
        var last_bound = len - 1 | 0;
        while (true) {
          var i = _i;
          if (i === last_bound) {
            return true;
          }
          if (cmp(a[i], a[i + 1 | 0]) > 0) {
            return false;
          }
          _i = i + 1 | 0;
          continue;
        }
        ;
      }
    }
    function isSorted(a, cmp) {
      return isSortedU(a, Curry.__2(cmp));
    }
    function merge(src, src1ofs, src1len, src2, src2ofs, src2len, dst, dstofs, cmp) {
      var src1r = src1ofs + src1len | 0;
      var src2r = src2ofs + src2len | 0;
      var _i1 = src1ofs;
      var _s1 = src[src1ofs];
      var _i2 = src2ofs;
      var _s2 = src2[src2ofs];
      var _d = dstofs;
      while (true) {
        var d = _d;
        var s2 = _s2;
        var i2 = _i2;
        var s1 = _s1;
        var i1 = _i1;
        if (cmp(s1, s2) <= 0) {
          dst[d] = s1;
          var i1$1 = i1 + 1 | 0;
          if (i1$1 >= src1r) {
            return Belt_Array.blitUnsafe(src2, i2, dst, d + 1 | 0, src2r - i2 | 0);
          }
          _d = d + 1 | 0;
          _s1 = src[i1$1];
          _i1 = i1$1;
          continue;
        }
        dst[d] = s2;
        var i2$1 = i2 + 1 | 0;
        if (i2$1 >= src2r) {
          return Belt_Array.blitUnsafe(src, i1, dst, d + 1 | 0, src1r - i1 | 0);
        }
        _d = d + 1 | 0;
        _s2 = src2[i2$1];
        _i2 = i2$1;
        continue;
      }
      ;
    }
    function unionU(src, src1ofs, src1len, src2, src2ofs, src2len, dst, dstofs, cmp) {
      var src1r = src1ofs + src1len | 0;
      var src2r = src2ofs + src2len | 0;
      var _i1 = src1ofs;
      var _s1 = src[src1ofs];
      var _i2 = src2ofs;
      var _s2 = src2[src2ofs];
      var _d = dstofs;
      while (true) {
        var d = _d;
        var s2 = _s2;
        var i2 = _i2;
        var s1 = _s1;
        var i1 = _i1;
        var c = cmp(s1, s2);
        if (c < 0) {
          dst[d] = s1;
          var i1$1 = i1 + 1 | 0;
          var d$1 = d + 1 | 0;
          if (i1$1 < src1r) {
            _d = d$1;
            _s1 = src[i1$1];
            _i1 = i1$1;
            continue;
          }
          Belt_Array.blitUnsafe(src2, i2, dst, d$1, src2r - i2 | 0);
          return (d$1 + src2r | 0) - i2 | 0;
        }
        if (c === 0) {
          dst[d] = s1;
          var i1$2 = i1 + 1 | 0;
          var i2$1 = i2 + 1 | 0;
          var d$2 = d + 1 | 0;
          if (!(i1$2 < src1r && i2$1 < src2r)) {
            if (i1$2 === src1r) {
              Belt_Array.blitUnsafe(src2, i2$1, dst, d$2, src2r - i2$1 | 0);
              return (d$2 + src2r | 0) - i2$1 | 0;
            } else {
              Belt_Array.blitUnsafe(src, i1$2, dst, d$2, src1r - i1$2 | 0);
              return (d$2 + src1r | 0) - i1$2 | 0;
            }
          }
          _d = d$2;
          _s2 = src2[i2$1];
          _i2 = i2$1;
          _s1 = src[i1$2];
          _i1 = i1$2;
          continue;
        }
        dst[d] = s2;
        var i2$2 = i2 + 1 | 0;
        var d$3 = d + 1 | 0;
        if (i2$2 < src2r) {
          _d = d$3;
          _s2 = src2[i2$2];
          _i2 = i2$2;
          continue;
        }
        Belt_Array.blitUnsafe(src, i1, dst, d$3, src1r - i1 | 0);
        return (d$3 + src1r | 0) - i1 | 0;
      }
      ;
    }
    function union(src, src1ofs, src1len, src2, src2ofs, src2len, dst, dstofs, cmp) {
      return unionU(src, src1ofs, src1len, src2, src2ofs, src2len, dst, dstofs, Curry.__2(cmp));
    }
    function intersectU(src, src1ofs, src1len, src2, src2ofs, src2len, dst, dstofs, cmp) {
      var src1r = src1ofs + src1len | 0;
      var src2r = src2ofs + src2len | 0;
      var _i1 = src1ofs;
      var _s1 = src[src1ofs];
      var _i2 = src2ofs;
      var _s2 = src2[src2ofs];
      var _d = dstofs;
      while (true) {
        var d = _d;
        var s2 = _s2;
        var i2 = _i2;
        var s1 = _s1;
        var i1 = _i1;
        var c = cmp(s1, s2);
        if (c < 0) {
          var i1$1 = i1 + 1 | 0;
          if (i1$1 >= src1r) {
            return d;
          }
          _s1 = src[i1$1];
          _i1 = i1$1;
          continue;
        }
        if (c === 0) {
          dst[d] = s1;
          var i1$2 = i1 + 1 | 0;
          var i2$1 = i2 + 1 | 0;
          var d$1 = d + 1 | 0;
          if (!(i1$2 < src1r && i2$1 < src2r)) {
            return d$1;
          }
          _d = d$1;
          _s2 = src2[i2$1];
          _i2 = i2$1;
          _s1 = src[i1$2];
          _i1 = i1$2;
          continue;
        }
        var i2$2 = i2 + 1 | 0;
        if (i2$2 >= src2r) {
          return d;
        }
        _s2 = src2[i2$2];
        _i2 = i2$2;
        continue;
      }
      ;
    }
    function intersect(src, src1ofs, src1len, src2, src2ofs, src2len, dst, dstofs, cmp) {
      return intersectU(src, src1ofs, src1len, src2, src2ofs, src2len, dst, dstofs, Curry.__2(cmp));
    }
    function diffU(src, src1ofs, src1len, src2, src2ofs, src2len, dst, dstofs, cmp) {
      var src1r = src1ofs + src1len | 0;
      var src2r = src2ofs + src2len | 0;
      var _i1 = src1ofs;
      var _s1 = src[src1ofs];
      var _i2 = src2ofs;
      var _s2 = src2[src2ofs];
      var _d = dstofs;
      while (true) {
        var d = _d;
        var s2 = _s2;
        var i2 = _i2;
        var s1 = _s1;
        var i1 = _i1;
        var c = cmp(s1, s2);
        if (c < 0) {
          dst[d] = s1;
          var d$1 = d + 1 | 0;
          var i1$1 = i1 + 1 | 0;
          if (i1$1 >= src1r) {
            return d$1;
          }
          _d = d$1;
          _s1 = src[i1$1];
          _i1 = i1$1;
          continue;
        }
        if (c === 0) {
          var i1$2 = i1 + 1 | 0;
          var i2$1 = i2 + 1 | 0;
          if (!(i1$2 < src1r && i2$1 < src2r)) {
            if (i1$2 === src1r) {
              return d;
            } else {
              Belt_Array.blitUnsafe(src, i1$2, dst, d, src1r - i1$2 | 0);
              return (d + src1r | 0) - i1$2 | 0;
            }
          }
          _s2 = src2[i2$1];
          _i2 = i2$1;
          _s1 = src[i1$2];
          _i1 = i1$2;
          continue;
        }
        var i2$2 = i2 + 1 | 0;
        if (i2$2 < src2r) {
          _s2 = src2[i2$2];
          _i2 = i2$2;
          continue;
        }
        Belt_Array.blitUnsafe(src, i1, dst, d, src1r - i1 | 0);
        return (d + src1r | 0) - i1 | 0;
      }
      ;
    }
    function diff(src, src1ofs, src1len, src2, src2ofs, src2len, dst, dstofs, cmp) {
      return diffU(src, src1ofs, src1len, src2, src2ofs, src2len, dst, dstofs, Curry.__2(cmp));
    }
    function insertionSort(src, srcofs, dst, dstofs, len, cmp) {
      for (var i = 0; i < len; ++i) {
        var e = src[srcofs + i | 0];
        var j = (dstofs + i | 0) - 1 | 0;
        while (j >= dstofs && cmp(dst[j], e) > 0) {
          dst[j + 1 | 0] = dst[j];
          j = j - 1 | 0;
        }
        ;
        dst[j + 1 | 0] = e;
      }
    }
    function sortTo(src, srcofs, dst, dstofs, len, cmp) {
      if (len <= 5) {
        return insertionSort(src, srcofs, dst, dstofs, len, cmp);
      }
      var l1 = len / 2 | 0;
      var l2 = len - l1 | 0;
      sortTo(src, srcofs + l1 | 0, dst, dstofs + l1 | 0, l2, cmp);
      sortTo(src, srcofs, src, srcofs + l2 | 0, l1, cmp);
      return merge(src, srcofs + l2 | 0, l1, dst, dstofs + l1 | 0, l2, dst, dstofs, cmp);
    }
    function stableSortInPlaceByU(a, cmp) {
      var l = a.length;
      if (l <= 5) {
        return insertionSort(a, 0, a, 0, l, cmp);
      }
      var l1 = l / 2 | 0;
      var l2 = l - l1 | 0;
      var t = new Array(l2);
      sortTo(a, l1, t, 0, l2, cmp);
      sortTo(a, 0, a, l2, l1, cmp);
      return merge(a, l2, l1, t, 0, l2, a, 0, cmp);
    }
    function stableSortInPlaceBy(a, cmp) {
      return stableSortInPlaceByU(a, Curry.__2(cmp));
    }
    function stableSortByU(a, cmp) {
      var b = a.slice(0);
      stableSortInPlaceByU(b, cmp);
      return b;
    }
    function stableSortBy(a, cmp) {
      return stableSortByU(a, Curry.__2(cmp));
    }
    function binarySearchByU(sorted, key, cmp) {
      var len = sorted.length;
      if (len === 0) {
        return -1;
      }
      var lo = sorted[0];
      var c = cmp(key, lo);
      if (c < 0) {
        return -1;
      }
      var hi = sorted[len - 1 | 0];
      var c2 = cmp(key, hi);
      if (c2 > 0) {
        return -(len + 1 | 0) | 0;
      } else {
        var _lo = 0;
        var _hi = len - 1 | 0;
        while (true) {
          var hi$1 = _hi;
          var lo$1 = _lo;
          var mid = (lo$1 + hi$1 | 0) / 2 | 0;
          var midVal = sorted[mid];
          var c$1 = cmp(key, midVal);
          if (c$1 === 0) {
            return mid;
          }
          if (c$1 < 0) {
            if (hi$1 === mid) {
              if (cmp(sorted[lo$1], key) === 0) {
                return lo$1;
              } else {
                return -(hi$1 + 1 | 0) | 0;
              }
            }
            _hi = mid;
            continue;
          }
          if (lo$1 === mid) {
            if (cmp(sorted[hi$1], key) === 0) {
              return hi$1;
            } else {
              return -(hi$1 + 1 | 0) | 0;
            }
          }
          _lo = mid;
          continue;
        }
        ;
      }
    }
    function binarySearchBy(sorted, key, cmp) {
      return binarySearchByU(sorted, key, Curry.__2(cmp));
    }
    var Int;
    var $$String;
    exports2.Int = Int;
    exports2.$$String = $$String;
    exports2.strictlySortedLengthU = strictlySortedLengthU;
    exports2.strictlySortedLength = strictlySortedLength;
    exports2.isSortedU = isSortedU;
    exports2.isSorted = isSorted;
    exports2.stableSortInPlaceByU = stableSortInPlaceByU;
    exports2.stableSortInPlaceBy = stableSortInPlaceBy;
    exports2.stableSortByU = stableSortByU;
    exports2.stableSortBy = stableSortBy;
    exports2.binarySearchByU = binarySearchByU;
    exports2.binarySearchBy = binarySearchBy;
    exports2.unionU = unionU;
    exports2.union = union;
    exports2.intersectU = intersectU;
    exports2.intersect = intersect;
    exports2.diffU = diffU;
    exports2.diff = diff;
  }
});

// node_modules/rescript/lib/js/belt_internalAVLtree.js
var require_belt_internalAVLtree = __commonJS({
  "node_modules/rescript/lib/js/belt_internalAVLtree.js"(exports2) {
    "use strict";
    var Curry = require_curry();
    var Caml_option = require_caml_option();
    var Belt_SortArray = require_belt_SortArray();
    function treeHeight(n) {
      if (n !== void 0) {
        return n.h;
      } else {
        return 0;
      }
    }
    function copy(n) {
      if (n !== void 0) {
        return {
          k: n.k,
          v: n.v,
          h: n.h,
          l: copy(n.l),
          r: copy(n.r)
        };
      } else {
        return n;
      }
    }
    function create(l, x, d, r) {
      var hl = treeHeight(l);
      var hr = treeHeight(r);
      return {
        k: x,
        v: d,
        h: hl >= hr ? hl + 1 | 0 : hr + 1 | 0,
        l,
        r
      };
    }
    function singleton(x, d) {
      return {
        k: x,
        v: d,
        h: 1,
        l: void 0,
        r: void 0
      };
    }
    function heightGe(l, r) {
      if (r !== void 0) {
        if (l !== void 0) {
          return l.h >= r.h;
        } else {
          return false;
        }
      } else {
        return true;
      }
    }
    function updateValue(n, newValue) {
      if (n.v === newValue) {
        return n;
      } else {
        return {
          k: n.k,
          v: newValue,
          h: n.h,
          l: n.l,
          r: n.r
        };
      }
    }
    function bal(l, x, d, r) {
      var hl = l !== void 0 ? l.h : 0;
      var hr = r !== void 0 ? r.h : 0;
      if (hl > (hr + 2 | 0)) {
        var ll = l.l;
        var lr = l.r;
        if (treeHeight(ll) >= treeHeight(lr)) {
          return create(ll, l.k, l.v, create(lr, x, d, r));
        } else {
          return create(create(ll, l.k, l.v, lr.l), lr.k, lr.v, create(lr.r, x, d, r));
        }
      }
      if (hr <= (hl + 2 | 0)) {
        return {
          k: x,
          v: d,
          h: hl >= hr ? hl + 1 | 0 : hr + 1 | 0,
          l,
          r
        };
      }
      var rl = r.l;
      var rr = r.r;
      if (treeHeight(rr) >= treeHeight(rl)) {
        return create(create(l, x, d, rl), r.k, r.v, rr);
      } else {
        return create(create(l, x, d, rl.l), rl.k, rl.v, create(rl.r, r.k, r.v, rr));
      }
    }
    function minKey0Aux(_n) {
      while (true) {
        var n = _n;
        var n$1 = n.l;
        if (n$1 === void 0) {
          return n.k;
        }
        _n = n$1;
        continue;
      }
      ;
    }
    function minKey(n) {
      if (n !== void 0) {
        return Caml_option.some(minKey0Aux(n));
      }
    }
    function minKeyUndefined(n) {
      if (n !== void 0) {
        return minKey0Aux(n);
      }
    }
    function maxKey0Aux(_n) {
      while (true) {
        var n = _n;
        var n$1 = n.r;
        if (n$1 === void 0) {
          return n.k;
        }
        _n = n$1;
        continue;
      }
      ;
    }
    function maxKey(n) {
      if (n !== void 0) {
        return Caml_option.some(maxKey0Aux(n));
      }
    }
    function maxKeyUndefined(n) {
      if (n !== void 0) {
        return maxKey0Aux(n);
      }
    }
    function minKV0Aux(_n) {
      while (true) {
        var n = _n;
        var n$1 = n.l;
        if (n$1 === void 0) {
          return [
            n.k,
            n.v
          ];
        }
        _n = n$1;
        continue;
      }
      ;
    }
    function minimum(n) {
      if (n !== void 0) {
        return minKV0Aux(n);
      }
    }
    function minUndefined(n) {
      if (n !== void 0) {
        return minKV0Aux(n);
      }
    }
    function maxKV0Aux(_n) {
      while (true) {
        var n = _n;
        var n$1 = n.r;
        if (n$1 === void 0) {
          return [
            n.k,
            n.v
          ];
        }
        _n = n$1;
        continue;
      }
      ;
    }
    function maximum(n) {
      if (n !== void 0) {
        return maxKV0Aux(n);
      }
    }
    function maxUndefined(n) {
      if (n !== void 0) {
        return maxKV0Aux(n);
      }
    }
    function removeMinAuxWithRef(n, kr, vr) {
      var ln = n.l;
      if (ln !== void 0) {
        return bal(removeMinAuxWithRef(ln, kr, vr), n.k, n.v, n.r);
      } else {
        kr.contents = n.k;
        vr.contents = n.v;
        return n.r;
      }
    }
    function isEmpty(x) {
      return x === void 0;
    }
    function stackAllLeft(_v, _s) {
      while (true) {
        var s = _s;
        var v = _v;
        if (v === void 0) {
          return s;
        }
        _s = {
          hd: v,
          tl: s
        };
        _v = v.l;
        continue;
      }
      ;
    }
    function findFirstByU(n, p) {
      if (n === void 0) {
        return;
      }
      var left = findFirstByU(n.l, p);
      if (left !== void 0) {
        return left;
      }
      var v = n.k;
      var d = n.v;
      var pvd = p(v, d);
      if (pvd) {
        return [
          v,
          d
        ];
      }
      var right = findFirstByU(n.r, p);
      if (right !== void 0) {
        return right;
      }
    }
    function findFirstBy(n, p) {
      return findFirstByU(n, Curry.__2(p));
    }
    function forEachU(_n, f) {
      while (true) {
        var n = _n;
        if (n === void 0) {
          return;
        }
        forEachU(n.l, f);
        f(n.k, n.v);
        _n = n.r;
        continue;
      }
      ;
    }
    function forEach(n, f) {
      return forEachU(n, Curry.__2(f));
    }
    function mapU(n, f) {
      if (n === void 0) {
        return;
      }
      var newLeft = mapU(n.l, f);
      var newD = f(n.v);
      var newRight = mapU(n.r, f);
      return {
        k: n.k,
        v: newD,
        h: n.h,
        l: newLeft,
        r: newRight
      };
    }
    function map(n, f) {
      return mapU(n, Curry.__1(f));
    }
    function mapWithKeyU(n, f) {
      if (n === void 0) {
        return;
      }
      var key = n.k;
      var newLeft = mapWithKeyU(n.l, f);
      var newD = f(key, n.v);
      var newRight = mapWithKeyU(n.r, f);
      return {
        k: key,
        v: newD,
        h: n.h,
        l: newLeft,
        r: newRight
      };
    }
    function mapWithKey(n, f) {
      return mapWithKeyU(n, Curry.__2(f));
    }
    function reduceU(_m, _accu, f) {
      while (true) {
        var accu = _accu;
        var m = _m;
        if (m === void 0) {
          return accu;
        }
        var v = m.k;
        var d = m.v;
        var l = m.l;
        var r = m.r;
        _accu = f(reduceU(l, accu, f), v, d);
        _m = r;
        continue;
      }
      ;
    }
    function reduce(m, accu, f) {
      return reduceU(m, accu, Curry.__3(f));
    }
    function everyU(_n, p) {
      while (true) {
        var n = _n;
        if (n === void 0) {
          return true;
        }
        if (!p(n.k, n.v)) {
          return false;
        }
        if (!everyU(n.l, p)) {
          return false;
        }
        _n = n.r;
        continue;
      }
      ;
    }
    function every(n, p) {
      return everyU(n, Curry.__2(p));
    }
    function someU(_n, p) {
      while (true) {
        var n = _n;
        if (n === void 0) {
          return false;
        }
        if (p(n.k, n.v)) {
          return true;
        }
        if (someU(n.l, p)) {
          return true;
        }
        _n = n.r;
        continue;
      }
      ;
    }
    function some(n, p) {
      return someU(n, Curry.__2(p));
    }
    function addMinElement(n, k, v) {
      if (n !== void 0) {
        return bal(addMinElement(n.l, k, v), n.k, n.v, n.r);
      } else {
        return singleton(k, v);
      }
    }
    function addMaxElement(n, k, v) {
      if (n !== void 0) {
        return bal(n.l, n.k, n.v, addMaxElement(n.r, k, v));
      } else {
        return singleton(k, v);
      }
    }
    function join(ln, v, d, rn) {
      if (ln === void 0) {
        return addMinElement(rn, v, d);
      }
      if (rn === void 0) {
        return addMaxElement(ln, v, d);
      }
      var lv = ln.k;
      var ld = ln.v;
      var lh = ln.h;
      var ll = ln.l;
      var lr = ln.r;
      var rv = rn.k;
      var rd = rn.v;
      var rh = rn.h;
      var rl = rn.l;
      var rr = rn.r;
      if (lh > (rh + 2 | 0)) {
        return bal(ll, lv, ld, join(lr, v, d, rn));
      } else if (rh > (lh + 2 | 0)) {
        return bal(join(ln, v, d, rl), rv, rd, rr);
      } else {
        return create(ln, v, d, rn);
      }
    }
    function concat(t1, t2) {
      if (t1 === void 0) {
        return t2;
      }
      if (t2 === void 0) {
        return t1;
      }
      var kr = {
        contents: t2.k
      };
      var vr = {
        contents: t2.v
      };
      var t2r = removeMinAuxWithRef(t2, kr, vr);
      return join(t1, kr.contents, vr.contents, t2r);
    }
    function concatOrJoin(t1, v, d, t2) {
      if (d !== void 0) {
        return join(t1, v, Caml_option.valFromOption(d), t2);
      } else {
        return concat(t1, t2);
      }
    }
    function keepSharedU(n, p) {
      if (n === void 0) {
        return;
      }
      var v = n.k;
      var d = n.v;
      var newLeft = keepSharedU(n.l, p);
      var pvd = p(v, d);
      var newRight = keepSharedU(n.r, p);
      if (pvd) {
        return join(newLeft, v, d, newRight);
      } else {
        return concat(newLeft, newRight);
      }
    }
    function keepShared(n, p) {
      return keepSharedU(n, Curry.__2(p));
    }
    function keepMapU(n, p) {
      if (n === void 0) {
        return;
      }
      var v = n.k;
      var d = n.v;
      var newLeft = keepMapU(n.l, p);
      var pvd = p(v, d);
      var newRight = keepMapU(n.r, p);
      if (pvd !== void 0) {
        return join(newLeft, v, Caml_option.valFromOption(pvd), newRight);
      } else {
        return concat(newLeft, newRight);
      }
    }
    function keepMap(n, p) {
      return keepMapU(n, Curry.__2(p));
    }
    function partitionSharedU(n, p) {
      if (n === void 0) {
        return [
          void 0,
          void 0
        ];
      }
      var key = n.k;
      var value = n.v;
      var match = partitionSharedU(n.l, p);
      var lf = match[1];
      var lt = match[0];
      var pvd = p(key, value);
      var match$1 = partitionSharedU(n.r, p);
      var rf = match$1[1];
      var rt = match$1[0];
      if (pvd) {
        return [
          join(lt, key, value, rt),
          concat(lf, rf)
        ];
      } else {
        return [
          concat(lt, rt),
          join(lf, key, value, rf)
        ];
      }
    }
    function partitionShared(n, p) {
      return partitionSharedU(n, Curry.__2(p));
    }
    function lengthNode(n) {
      var l = n.l;
      var r = n.r;
      var sizeL = l !== void 0 ? lengthNode(l) : 0;
      var sizeR = r !== void 0 ? lengthNode(r) : 0;
      return (1 + sizeL | 0) + sizeR | 0;
    }
    function size(n) {
      if (n !== void 0) {
        return lengthNode(n);
      } else {
        return 0;
      }
    }
    function toListAux(_n, _accu) {
      while (true) {
        var accu = _accu;
        var n = _n;
        if (n === void 0) {
          return accu;
        }
        var k = n.k;
        var v = n.v;
        var l = n.l;
        var r = n.r;
        _accu = {
          hd: [
            k,
            v
          ],
          tl: toListAux(r, accu)
        };
        _n = l;
        continue;
      }
      ;
    }
    function toList(s) {
      return toListAux(s, 0);
    }
    function checkInvariantInternal(_v) {
      while (true) {
        var v = _v;
        if (v === void 0) {
          return;
        }
        var l = v.l;
        var r = v.r;
        var diff = treeHeight(l) - treeHeight(r) | 0;
        if (!(diff <= 2 && diff >= -2)) {
          throw {
            RE_EXN_ID: "Assert_failure",
            _1: [
              "belt_internalAVLtree.ml",
              373,
              4
            ],
            Error: new Error()
          };
        }
        checkInvariantInternal(l);
        _v = r;
        continue;
      }
      ;
    }
    function fillArrayKey(_n, _i, arr) {
      while (true) {
        var i = _i;
        var n = _n;
        var v = n.k;
        var l = n.l;
        var r = n.r;
        var next = l !== void 0 ? fillArrayKey(l, i, arr) : i;
        arr[next] = v;
        var rnext = next + 1 | 0;
        if (r === void 0) {
          return rnext;
        }
        _i = rnext;
        _n = r;
        continue;
      }
      ;
    }
    function fillArrayValue(_n, _i, arr) {
      while (true) {
        var i = _i;
        var n = _n;
        var l = n.l;
        var r = n.r;
        var next = l !== void 0 ? fillArrayValue(l, i, arr) : i;
        arr[next] = n.v;
        var rnext = next + 1 | 0;
        if (r === void 0) {
          return rnext;
        }
        _i = rnext;
        _n = r;
        continue;
      }
      ;
    }
    function fillArray(_n, _i, arr) {
      while (true) {
        var i = _i;
        var n = _n;
        var l = n.l;
        var v = n.k;
        var r = n.r;
        var next = l !== void 0 ? fillArray(l, i, arr) : i;
        arr[next] = [
          v,
          n.v
        ];
        var rnext = next + 1 | 0;
        if (r === void 0) {
          return rnext;
        }
        _i = rnext;
        _n = r;
        continue;
      }
      ;
    }
    function toArray(n) {
      if (n === void 0) {
        return [];
      }
      var size2 = lengthNode(n);
      var v = new Array(size2);
      fillArray(n, 0, v);
      return v;
    }
    function keysToArray(n) {
      if (n === void 0) {
        return [];
      }
      var size2 = lengthNode(n);
      var v = new Array(size2);
      fillArrayKey(n, 0, v);
      return v;
    }
    function valuesToArray(n) {
      if (n === void 0) {
        return [];
      }
      var size2 = lengthNode(n);
      var v = new Array(size2);
      fillArrayValue(n, 0, v);
      return v;
    }
    function fromSortedArrayRevAux(arr, off, len) {
      switch (len) {
        case 0:
          return;
        case 1:
          var match = arr[off];
          return singleton(match[0], match[1]);
        case 2:
          var match_0 = arr[off];
          var match_1 = arr[off - 1 | 0];
          var match$1 = match_1;
          var match$2 = match_0;
          return {
            k: match$1[0],
            v: match$1[1],
            h: 2,
            l: singleton(match$2[0], match$2[1]),
            r: void 0
          };
        case 3:
          var match_0$1 = arr[off];
          var match_1$1 = arr[off - 1 | 0];
          var match_2 = arr[off - 2 | 0];
          var match$3 = match_2;
          var match$4 = match_1$1;
          var match$5 = match_0$1;
          return {
            k: match$4[0],
            v: match$4[1],
            h: 2,
            l: singleton(match$5[0], match$5[1]),
            r: singleton(match$3[0], match$3[1])
          };
        default:
          var nl = len / 2 | 0;
          var left = fromSortedArrayRevAux(arr, off, nl);
          var match$6 = arr[off - nl | 0];
          var right = fromSortedArrayRevAux(arr, (off - nl | 0) - 1 | 0, (len - nl | 0) - 1 | 0);
          return create(left, match$6[0], match$6[1], right);
      }
    }
    function fromSortedArrayAux(arr, off, len) {
      switch (len) {
        case 0:
          return;
        case 1:
          var match = arr[off];
          return singleton(match[0], match[1]);
        case 2:
          var match_0 = arr[off];
          var match_1 = arr[off + 1 | 0];
          var match$1 = match_1;
          var match$2 = match_0;
          return {
            k: match$1[0],
            v: match$1[1],
            h: 2,
            l: singleton(match$2[0], match$2[1]),
            r: void 0
          };
        case 3:
          var match_0$1 = arr[off];
          var match_1$1 = arr[off + 1 | 0];
          var match_2 = arr[off + 2 | 0];
          var match$3 = match_2;
          var match$4 = match_1$1;
          var match$5 = match_0$1;
          return {
            k: match$4[0],
            v: match$4[1],
            h: 2,
            l: singleton(match$5[0], match$5[1]),
            r: singleton(match$3[0], match$3[1])
          };
        default:
          var nl = len / 2 | 0;
          var left = fromSortedArrayAux(arr, off, nl);
          var match$6 = arr[off + nl | 0];
          var right = fromSortedArrayAux(arr, (off + nl | 0) + 1 | 0, (len - nl | 0) - 1 | 0);
          return create(left, match$6[0], match$6[1], right);
      }
    }
    function fromSortedArrayUnsafe(arr) {
      return fromSortedArrayAux(arr, 0, arr.length);
    }
    function cmpU(s1, s2, kcmp, vcmp) {
      var len1 = size(s1);
      var len2 = size(s2);
      if (len1 === len2) {
        var _e1 = stackAllLeft(s1, 0);
        var _e2 = stackAllLeft(s2, 0);
        while (true) {
          var e2 = _e2;
          var e1 = _e1;
          if (!e1) {
            return 0;
          }
          if (!e2) {
            return 0;
          }
          var h2 = e2.hd;
          var h1 = e1.hd;
          var c = kcmp(h1.k, h2.k);
          if (c !== 0) {
            return c;
          }
          var cx = vcmp(h1.v, h2.v);
          if (cx !== 0) {
            return cx;
          }
          _e2 = stackAllLeft(h2.r, e2.tl);
          _e1 = stackAllLeft(h1.r, e1.tl);
          continue;
        }
        ;
      } else if (len1 < len2) {
        return -1;
      } else {
        return 1;
      }
    }
    function cmp(s1, s2, kcmp, vcmp) {
      return cmpU(s1, s2, kcmp, Curry.__2(vcmp));
    }
    function eqU(s1, s2, kcmp, veq) {
      var len1 = size(s1);
      var len2 = size(s2);
      if (len1 === len2) {
        var _e1 = stackAllLeft(s1, 0);
        var _e2 = stackAllLeft(s2, 0);
        while (true) {
          var e2 = _e2;
          var e1 = _e1;
          if (!e1) {
            return true;
          }
          if (!e2) {
            return true;
          }
          var h2 = e2.hd;
          var h1 = e1.hd;
          if (!(kcmp(h1.k, h2.k) === 0 && veq(h1.v, h2.v))) {
            return false;
          }
          _e2 = stackAllLeft(h2.r, e2.tl);
          _e1 = stackAllLeft(h1.r, e1.tl);
          continue;
        }
        ;
      } else {
        return false;
      }
    }
    function eq(s1, s2, kcmp, veq) {
      return eqU(s1, s2, kcmp, Curry.__2(veq));
    }
    function get(_n, x, cmp2) {
      while (true) {
        var n = _n;
        if (n === void 0) {
          return;
        }
        var v = n.k;
        var c = cmp2(x, v);
        if (c === 0) {
          return Caml_option.some(n.v);
        }
        _n = c < 0 ? n.l : n.r;
        continue;
      }
      ;
    }
    function getUndefined(_n, x, cmp2) {
      while (true) {
        var n = _n;
        if (n === void 0) {
          return;
        }
        var v = n.k;
        var c = cmp2(x, v);
        if (c === 0) {
          return n.v;
        }
        _n = c < 0 ? n.l : n.r;
        continue;
      }
      ;
    }
    function getExn(_n, x, cmp2) {
      while (true) {
        var n = _n;
        if (n !== void 0) {
          var v = n.k;
          var c = cmp2(x, v);
          if (c === 0) {
            return n.v;
          }
          _n = c < 0 ? n.l : n.r;
          continue;
        }
        throw {
          RE_EXN_ID: "Not_found",
          Error: new Error()
        };
      }
      ;
    }
    function getWithDefault(_n, x, def, cmp2) {
      while (true) {
        var n = _n;
        if (n === void 0) {
          return def;
        }
        var v = n.k;
        var c = cmp2(x, v);
        if (c === 0) {
          return n.v;
        }
        _n = c < 0 ? n.l : n.r;
        continue;
      }
      ;
    }
    function has(_n, x, cmp2) {
      while (true) {
        var n = _n;
        if (n === void 0) {
          return false;
        }
        var v = n.k;
        var c = cmp2(x, v);
        if (c === 0) {
          return true;
        }
        _n = c < 0 ? n.l : n.r;
        continue;
      }
      ;
    }
    function rotateWithLeftChild(k2) {
      var k1 = k2.l;
      k2.l = k1.r;
      k1.r = k2;
      var hlk2 = treeHeight(k2.l);
      var hrk2 = treeHeight(k2.r);
      k2.h = (hlk2 > hrk2 ? hlk2 : hrk2) + 1 | 0;
      var hlk1 = treeHeight(k1.l);
      var hk2 = k2.h;
      k1.h = (hlk1 > hk2 ? hlk1 : hk2) + 1 | 0;
      return k1;
    }
    function rotateWithRightChild(k1) {
      var k2 = k1.r;
      k1.r = k2.l;
      k2.l = k1;
      var hlk1 = treeHeight(k1.l);
      var hrk1 = treeHeight(k1.r);
      k1.h = (hlk1 > hrk1 ? hlk1 : hrk1) + 1 | 0;
      var hrk2 = treeHeight(k2.r);
      var hk1 = k1.h;
      k2.h = (hrk2 > hk1 ? hrk2 : hk1) + 1 | 0;
      return k2;
    }
    function doubleWithLeftChild(k3) {
      var x = k3.l;
      var v = rotateWithRightChild(x);
      k3.l = v;
      return rotateWithLeftChild(k3);
    }
    function doubleWithRightChild(k2) {
      var x = k2.r;
      var v = rotateWithLeftChild(x);
      k2.r = v;
      return rotateWithRightChild(k2);
    }
    function heightUpdateMutate(t) {
      var hlt = treeHeight(t.l);
      var hrt = treeHeight(t.r);
      t.h = (hlt > hrt ? hlt : hrt) + 1 | 0;
      return t;
    }
    function balMutate(nt) {
      var l = nt.l;
      var r = nt.r;
      var hl = treeHeight(l);
      var hr = treeHeight(r);
      if (hl > (2 + hr | 0)) {
        var ll = l.l;
        var lr = l.r;
        if (heightGe(ll, lr)) {
          return heightUpdateMutate(rotateWithLeftChild(nt));
        } else {
          return heightUpdateMutate(doubleWithLeftChild(nt));
        }
      }
      if (hr > (2 + hl | 0)) {
        var rl = r.l;
        var rr = r.r;
        if (heightGe(rr, rl)) {
          return heightUpdateMutate(rotateWithRightChild(nt));
        } else {
          return heightUpdateMutate(doubleWithRightChild(nt));
        }
      }
      nt.h = (hl > hr ? hl : hr) + 1 | 0;
      return nt;
    }
    function updateMutate(t, x, data, cmp2) {
      if (t === void 0) {
        return singleton(x, data);
      }
      var k = t.k;
      var c = cmp2(x, k);
      if (c === 0) {
        t.v = data;
        return t;
      }
      var l = t.l;
      var r = t.r;
      if (c < 0) {
        var ll = updateMutate(l, x, data, cmp2);
        t.l = ll;
      } else {
        t.r = updateMutate(r, x, data, cmp2);
      }
      return balMutate(t);
    }
    function fromArray(xs, cmp2) {
      var len = xs.length;
      if (len === 0) {
        return;
      }
      var next = Belt_SortArray.strictlySortedLengthU(xs, function(param, param$1) {
        return cmp2(param[0], param$1[0]) < 0;
      });
      var result;
      if (next >= 0) {
        result = fromSortedArrayAux(xs, 0, next);
      } else {
        next = -next | 0;
        result = fromSortedArrayRevAux(xs, next - 1 | 0, next);
      }
      for (var i = next; i < len; ++i) {
        var match = xs[i];
        result = updateMutate(result, match[0], match[1], cmp2);
      }
      return result;
    }
    function removeMinAuxWithRootMutate(nt, n) {
      var rn = n.r;
      var ln = n.l;
      if (ln !== void 0) {
        n.l = removeMinAuxWithRootMutate(nt, ln);
        return balMutate(n);
      } else {
        nt.k = n.k;
        nt.v = n.v;
        return rn;
      }
    }
    exports2.copy = copy;
    exports2.create = create;
    exports2.bal = bal;
    exports2.singleton = singleton;
    exports2.updateValue = updateValue;
    exports2.minKey = minKey;
    exports2.minKeyUndefined = minKeyUndefined;
    exports2.maxKey = maxKey;
    exports2.maxKeyUndefined = maxKeyUndefined;
    exports2.minimum = minimum;
    exports2.minUndefined = minUndefined;
    exports2.maximum = maximum;
    exports2.maxUndefined = maxUndefined;
    exports2.removeMinAuxWithRef = removeMinAuxWithRef;
    exports2.isEmpty = isEmpty;
    exports2.stackAllLeft = stackAllLeft;
    exports2.findFirstByU = findFirstByU;
    exports2.findFirstBy = findFirstBy;
    exports2.forEachU = forEachU;
    exports2.forEach = forEach;
    exports2.mapU = mapU;
    exports2.map = map;
    exports2.mapWithKeyU = mapWithKeyU;
    exports2.mapWithKey = mapWithKey;
    exports2.reduceU = reduceU;
    exports2.reduce = reduce;
    exports2.everyU = everyU;
    exports2.every = every;
    exports2.someU = someU;
    exports2.some = some;
    exports2.join = join;
    exports2.concat = concat;
    exports2.concatOrJoin = concatOrJoin;
    exports2.keepSharedU = keepSharedU;
    exports2.keepShared = keepShared;
    exports2.keepMapU = keepMapU;
    exports2.keepMap = keepMap;
    exports2.partitionSharedU = partitionSharedU;
    exports2.partitionShared = partitionShared;
    exports2.lengthNode = lengthNode;
    exports2.size = size;
    exports2.toList = toList;
    exports2.checkInvariantInternal = checkInvariantInternal;
    exports2.fillArray = fillArray;
    exports2.toArray = toArray;
    exports2.keysToArray = keysToArray;
    exports2.valuesToArray = valuesToArray;
    exports2.fromSortedArrayAux = fromSortedArrayAux;
    exports2.fromSortedArrayRevAux = fromSortedArrayRevAux;
    exports2.fromSortedArrayUnsafe = fromSortedArrayUnsafe;
    exports2.cmpU = cmpU;
    exports2.cmp = cmp;
    exports2.eqU = eqU;
    exports2.eq = eq;
    exports2.get = get;
    exports2.getUndefined = getUndefined;
    exports2.getWithDefault = getWithDefault;
    exports2.getExn = getExn;
    exports2.has = has;
    exports2.fromArray = fromArray;
    exports2.updateMutate = updateMutate;
    exports2.balMutate = balMutate;
    exports2.removeMinAuxWithRootMutate = removeMinAuxWithRootMutate;
  }
});

// node_modules/rescript/lib/js/belt_internalMapString.js
var require_belt_internalMapString = __commonJS({
  "node_modules/rescript/lib/js/belt_internalMapString.js"(exports2) {
    "use strict";
    var Caml = require_caml();
    var Curry = require_curry();
    var Caml_option = require_caml_option();
    var Belt_SortArray = require_belt_SortArray();
    var Belt_internalAVLtree = require_belt_internalAVLtree();
    function add(t, x, data) {
      if (t === void 0) {
        return Belt_internalAVLtree.singleton(x, data);
      }
      var k = t.k;
      if (x === k) {
        return Belt_internalAVLtree.updateValue(t, data);
      }
      var v = t.v;
      if (x < k) {
        return Belt_internalAVLtree.bal(add(t.l, x, data), k, v, t.r);
      } else {
        return Belt_internalAVLtree.bal(t.l, k, v, add(t.r, x, data));
      }
    }
    function get(_n, x) {
      while (true) {
        var n = _n;
        if (n === void 0) {
          return;
        }
        var v = n.k;
        if (x === v) {
          return Caml_option.some(n.v);
        }
        _n = x < v ? n.l : n.r;
        continue;
      }
      ;
    }
    function getUndefined(_n, x) {
      while (true) {
        var n = _n;
        if (n === void 0) {
          return;
        }
        var v = n.k;
        if (x === v) {
          return n.v;
        }
        _n = x < v ? n.l : n.r;
        continue;
      }
      ;
    }
    function getExn(_n, x) {
      while (true) {
        var n = _n;
        if (n !== void 0) {
          var v = n.k;
          if (x === v) {
            return n.v;
          }
          _n = x < v ? n.l : n.r;
          continue;
        }
        throw {
          RE_EXN_ID: "Not_found",
          Error: new Error()
        };
      }
      ;
    }
    function getWithDefault(_n, x, def) {
      while (true) {
        var n = _n;
        if (n === void 0) {
          return def;
        }
        var v = n.k;
        if (x === v) {
          return n.v;
        }
        _n = x < v ? n.l : n.r;
        continue;
      }
      ;
    }
    function has(_n, x) {
      while (true) {
        var n = _n;
        if (n === void 0) {
          return false;
        }
        var v = n.k;
        if (x === v) {
          return true;
        }
        _n = x < v ? n.l : n.r;
        continue;
      }
      ;
    }
    function remove(n, x) {
      if (n === void 0) {
        return n;
      }
      var v = n.k;
      var l = n.l;
      var r = n.r;
      if (x !== v) {
        if (x < v) {
          return Belt_internalAVLtree.bal(remove(l, x), v, n.v, r);
        } else {
          return Belt_internalAVLtree.bal(l, v, n.v, remove(r, x));
        }
      }
      if (l === void 0) {
        return r;
      }
      if (r === void 0) {
        return l;
      }
      var kr = {
        contents: r.k
      };
      var vr = {
        contents: r.v
      };
      var r$1 = Belt_internalAVLtree.removeMinAuxWithRef(r, kr, vr);
      return Belt_internalAVLtree.bal(l, kr.contents, vr.contents, r$1);
    }
    function splitAux(x, n) {
      var v = n.k;
      var d = n.v;
      var l = n.l;
      var r = n.r;
      if (x === v) {
        return [
          l,
          Caml_option.some(d),
          r
        ];
      }
      if (x < v) {
        if (l === void 0) {
          return [
            void 0,
            void 0,
            n
          ];
        }
        var match = splitAux(x, l);
        return [
          match[0],
          match[1],
          Belt_internalAVLtree.join(match[2], v, d, r)
        ];
      }
      if (r === void 0) {
        return [
          n,
          void 0,
          void 0
        ];
      }
      var match$1 = splitAux(x, r);
      return [
        Belt_internalAVLtree.join(l, v, d, match$1[0]),
        match$1[1],
        match$1[2]
      ];
    }
    function split(x, n) {
      if (n !== void 0) {
        return splitAux(x, n);
      } else {
        return [
          void 0,
          void 0,
          void 0
        ];
      }
    }
    function mergeU(s1, s2, f) {
      if (s1 !== void 0) {
        if (s1.h >= (s2 !== void 0 ? s2.h : 0)) {
          var v1 = s1.k;
          var d1 = s1.v;
          var l1 = s1.l;
          var r1 = s1.r;
          var match = split(v1, s2);
          return Belt_internalAVLtree.concatOrJoin(mergeU(l1, match[0], f), v1, f(v1, Caml_option.some(d1), match[1]), mergeU(r1, match[2], f));
        }
      } else if (s2 === void 0) {
        return;
      }
      var v2 = s2.k;
      var d2 = s2.v;
      var l2 = s2.l;
      var r2 = s2.r;
      var match$1 = split(v2, s1);
      return Belt_internalAVLtree.concatOrJoin(mergeU(match$1[0], l2, f), v2, f(v2, match$1[1], Caml_option.some(d2)), mergeU(match$1[2], r2, f));
    }
    function merge(s1, s2, f) {
      return mergeU(s1, s2, Curry.__3(f));
    }
    function compareAux(_e1, _e2, vcmp) {
      while (true) {
        var e2 = _e2;
        var e1 = _e1;
        if (!e1) {
          return 0;
        }
        if (!e2) {
          return 0;
        }
        var h2 = e2.hd;
        var h1 = e1.hd;
        var c = Caml.caml_string_compare(h1.k, h2.k);
        if (c !== 0) {
          return c;
        }
        var cx = vcmp(h1.v, h2.v);
        if (cx !== 0) {
          return cx;
        }
        _e2 = Belt_internalAVLtree.stackAllLeft(h2.r, e2.tl);
        _e1 = Belt_internalAVLtree.stackAllLeft(h1.r, e1.tl);
        continue;
      }
      ;
    }
    function cmpU(s1, s2, cmp2) {
      var len1 = Belt_internalAVLtree.size(s1);
      var len2 = Belt_internalAVLtree.size(s2);
      if (len1 === len2) {
        return compareAux(Belt_internalAVLtree.stackAllLeft(s1, 0), Belt_internalAVLtree.stackAllLeft(s2, 0), cmp2);
      } else if (len1 < len2) {
        return -1;
      } else {
        return 1;
      }
    }
    function cmp(s1, s2, f) {
      return cmpU(s1, s2, Curry.__2(f));
    }
    function eqAux(_e1, _e2, eq2) {
      while (true) {
        var e2 = _e2;
        var e1 = _e1;
        if (!e1) {
          return true;
        }
        if (!e2) {
          return true;
        }
        var h2 = e2.hd;
        var h1 = e1.hd;
        if (!(h1.k === h2.k && eq2(h1.v, h2.v))) {
          return false;
        }
        _e2 = Belt_internalAVLtree.stackAllLeft(h2.r, e2.tl);
        _e1 = Belt_internalAVLtree.stackAllLeft(h1.r, e1.tl);
        continue;
      }
      ;
    }
    function eqU(s1, s2, eq2) {
      var len1 = Belt_internalAVLtree.size(s1);
      var len2 = Belt_internalAVLtree.size(s2);
      if (len1 === len2) {
        return eqAux(Belt_internalAVLtree.stackAllLeft(s1, 0), Belt_internalAVLtree.stackAllLeft(s2, 0), eq2);
      } else {
        return false;
      }
    }
    function eq(s1, s2, f) {
      return eqU(s1, s2, Curry.__2(f));
    }
    function addMutate(t, x, data) {
      if (t === void 0) {
        return Belt_internalAVLtree.singleton(x, data);
      }
      var k = t.k;
      if (x === k) {
        t.k = x;
        t.v = data;
        return t;
      }
      var l = t.l;
      var r = t.r;
      if (x < k) {
        var ll = addMutate(l, x, data);
        t.l = ll;
      } else {
        t.r = addMutate(r, x, data);
      }
      return Belt_internalAVLtree.balMutate(t);
    }
    function fromArray(xs) {
      var len = xs.length;
      if (len === 0) {
        return;
      }
      var next = Belt_SortArray.strictlySortedLengthU(xs, function(param, param$1) {
        return param[0] < param$1[0];
      });
      var result;
      if (next >= 0) {
        result = Belt_internalAVLtree.fromSortedArrayAux(xs, 0, next);
      } else {
        next = -next | 0;
        result = Belt_internalAVLtree.fromSortedArrayRevAux(xs, next - 1 | 0, next);
      }
      for (var i = next; i < len; ++i) {
        var match = xs[i];
        result = addMutate(result, match[0], match[1]);
      }
      return result;
    }
    var N;
    var A;
    var S;
    exports2.N = N;
    exports2.A = A;
    exports2.S = S;
    exports2.add = add;
    exports2.get = get;
    exports2.getUndefined = getUndefined;
    exports2.getExn = getExn;
    exports2.getWithDefault = getWithDefault;
    exports2.has = has;
    exports2.remove = remove;
    exports2.splitAux = splitAux;
    exports2.split = split;
    exports2.mergeU = mergeU;
    exports2.merge = merge;
    exports2.compareAux = compareAux;
    exports2.cmpU = cmpU;
    exports2.cmp = cmp;
    exports2.eqAux = eqAux;
    exports2.eqU = eqU;
    exports2.eq = eq;
    exports2.addMutate = addMutate;
    exports2.fromArray = fromArray;
  }
});

// node_modules/rescript/lib/js/belt_MapString.js
var require_belt_MapString = __commonJS({
  "node_modules/rescript/lib/js/belt_MapString.js"(exports2) {
    "use strict";
    var Curry = require_curry();
    var Caml_option = require_caml_option();
    var Belt_internalAVLtree = require_belt_internalAVLtree();
    var Belt_internalMapString = require_belt_internalMapString();
    function set(t, newK, newD) {
      if (t === void 0) {
        return Belt_internalAVLtree.singleton(newK, newD);
      }
      var k = t.k;
      if (newK === k) {
        return Belt_internalAVLtree.updateValue(t, newD);
      }
      var v = t.v;
      if (newK < k) {
        return Belt_internalAVLtree.bal(set(t.l, newK, newD), k, v, t.r);
      } else {
        return Belt_internalAVLtree.bal(t.l, k, v, set(t.r, newK, newD));
      }
    }
    function updateU(t, x, f) {
      if (t !== void 0) {
        var k = t.k;
        if (x === k) {
          var data = f(Caml_option.some(t.v));
          if (data !== void 0) {
            return Belt_internalAVLtree.updateValue(t, Caml_option.valFromOption(data));
          }
          var l = t.l;
          var r = t.r;
          if (l === void 0) {
            return r;
          }
          if (r === void 0) {
            return l;
          }
          var kr = {
            contents: r.k
          };
          var vr = {
            contents: r.v
          };
          var r$1 = Belt_internalAVLtree.removeMinAuxWithRef(r, kr, vr);
          return Belt_internalAVLtree.bal(l, kr.contents, vr.contents, r$1);
        }
        var v = t.v;
        var l$1 = t.l;
        var r$2 = t.r;
        if (x < k) {
          var ll = updateU(l$1, x, f);
          if (l$1 === ll) {
            return t;
          } else {
            return Belt_internalAVLtree.bal(ll, k, v, r$2);
          }
        }
        var rr = updateU(r$2, x, f);
        if (r$2 === rr) {
          return t;
        } else {
          return Belt_internalAVLtree.bal(l$1, k, v, rr);
        }
      }
      var data$1 = f(void 0);
      if (data$1 !== void 0) {
        return Belt_internalAVLtree.singleton(x, Caml_option.valFromOption(data$1));
      } else {
        return t;
      }
    }
    function update(t, x, f) {
      return updateU(t, x, Curry.__1(f));
    }
    function removeAux(n, x) {
      var v = n.k;
      var l = n.l;
      var r = n.r;
      if (x === v) {
        if (l === void 0) {
          return r;
        }
        if (r === void 0) {
          return l;
        }
        var kr = {
          contents: r.k
        };
        var vr = {
          contents: r.v
        };
        var r$1 = Belt_internalAVLtree.removeMinAuxWithRef(r, kr, vr);
        return Belt_internalAVLtree.bal(l, kr.contents, vr.contents, r$1);
      }
      if (x < v) {
        if (l === void 0) {
          return n;
        }
        var ll = removeAux(l, x);
        if (ll === l) {
          return n;
        } else {
          return Belt_internalAVLtree.bal(ll, v, n.v, r);
        }
      }
      if (r === void 0) {
        return n;
      }
      var rr = removeAux(r, x);
      return Belt_internalAVLtree.bal(l, v, n.v, rr);
    }
    function remove(n, x) {
      if (n !== void 0) {
        return removeAux(n, x);
      }
    }
    function removeMany(t, keys) {
      var len = keys.length;
      if (t !== void 0) {
        var _t = t;
        var _i = 0;
        while (true) {
          var i = _i;
          var t$1 = _t;
          if (i >= len) {
            return t$1;
          }
          var ele = keys[i];
          var u = removeAux(t$1, ele);
          if (u === void 0) {
            return u;
          }
          _i = i + 1 | 0;
          _t = u;
          continue;
        }
        ;
      }
    }
    function mergeMany(h, arr) {
      var len = arr.length;
      var v = h;
      for (var i = 0; i < len; ++i) {
        var match = arr[i];
        v = set(v, match[0], match[1]);
      }
      return v;
    }
    var empty;
    var isEmpty = Belt_internalAVLtree.isEmpty;
    var has = Belt_internalMapString.has;
    var cmpU = Belt_internalMapString.cmpU;
    var cmp = Belt_internalMapString.cmp;
    var eqU = Belt_internalMapString.eqU;
    var eq = Belt_internalMapString.eq;
    var findFirstByU = Belt_internalAVLtree.findFirstByU;
    var findFirstBy = Belt_internalAVLtree.findFirstBy;
    var forEachU = Belt_internalAVLtree.forEachU;
    var forEach = Belt_internalAVLtree.forEach;
    var reduceU = Belt_internalAVLtree.reduceU;
    var reduce = Belt_internalAVLtree.reduce;
    var everyU = Belt_internalAVLtree.everyU;
    var every = Belt_internalAVLtree.every;
    var someU = Belt_internalAVLtree.someU;
    var some = Belt_internalAVLtree.some;
    var size = Belt_internalAVLtree.size;
    var toList = Belt_internalAVLtree.toList;
    var toArray = Belt_internalAVLtree.toArray;
    var fromArray = Belt_internalMapString.fromArray;
    var keysToArray = Belt_internalAVLtree.keysToArray;
    var valuesToArray = Belt_internalAVLtree.valuesToArray;
    var minKey = Belt_internalAVLtree.minKey;
    var minKeyUndefined = Belt_internalAVLtree.minKeyUndefined;
    var maxKey = Belt_internalAVLtree.maxKey;
    var maxKeyUndefined = Belt_internalAVLtree.maxKeyUndefined;
    var minimum = Belt_internalAVLtree.minimum;
    var minUndefined = Belt_internalAVLtree.minUndefined;
    var maximum = Belt_internalAVLtree.maximum;
    var maxUndefined = Belt_internalAVLtree.maxUndefined;
    var get = Belt_internalMapString.get;
    var getUndefined = Belt_internalMapString.getUndefined;
    var getWithDefault = Belt_internalMapString.getWithDefault;
    var getExn = Belt_internalMapString.getExn;
    var checkInvariantInternal = Belt_internalAVLtree.checkInvariantInternal;
    var mergeU = Belt_internalMapString.mergeU;
    var merge = Belt_internalMapString.merge;
    var keepU = Belt_internalAVLtree.keepSharedU;
    var keep = Belt_internalAVLtree.keepShared;
    var partitionU = Belt_internalAVLtree.partitionSharedU;
    var partition = Belt_internalAVLtree.partitionShared;
    var split = Belt_internalMapString.split;
    var mapU = Belt_internalAVLtree.mapU;
    var map = Belt_internalAVLtree.map;
    var mapWithKeyU = Belt_internalAVLtree.mapWithKeyU;
    var mapWithKey = Belt_internalAVLtree.mapWithKey;
    exports2.empty = empty;
    exports2.isEmpty = isEmpty;
    exports2.has = has;
    exports2.cmpU = cmpU;
    exports2.cmp = cmp;
    exports2.eqU = eqU;
    exports2.eq = eq;
    exports2.findFirstByU = findFirstByU;
    exports2.findFirstBy = findFirstBy;
    exports2.forEachU = forEachU;
    exports2.forEach = forEach;
    exports2.reduceU = reduceU;
    exports2.reduce = reduce;
    exports2.everyU = everyU;
    exports2.every = every;
    exports2.someU = someU;
    exports2.some = some;
    exports2.size = size;
    exports2.toList = toList;
    exports2.toArray = toArray;
    exports2.fromArray = fromArray;
    exports2.keysToArray = keysToArray;
    exports2.valuesToArray = valuesToArray;
    exports2.minKey = minKey;
    exports2.minKeyUndefined = minKeyUndefined;
    exports2.maxKey = maxKey;
    exports2.maxKeyUndefined = maxKeyUndefined;
    exports2.minimum = minimum;
    exports2.minUndefined = minUndefined;
    exports2.maximum = maximum;
    exports2.maxUndefined = maxUndefined;
    exports2.get = get;
    exports2.getUndefined = getUndefined;
    exports2.getWithDefault = getWithDefault;
    exports2.getExn = getExn;
    exports2.checkInvariantInternal = checkInvariantInternal;
    exports2.remove = remove;
    exports2.removeMany = removeMany;
    exports2.set = set;
    exports2.updateU = updateU;
    exports2.update = update;
    exports2.mergeU = mergeU;
    exports2.merge = merge;
    exports2.mergeMany = mergeMany;
    exports2.keepU = keepU;
    exports2.keep = keep;
    exports2.partitionU = partitionU;
    exports2.partition = partition;
    exports2.split = split;
    exports2.mapU = mapU;
    exports2.map = map;
    exports2.mapWithKeyU = mapWithKeyU;
    exports2.mapWithKey = mapWithKey;
  }
});

// node_modules/rescript/lib/js/caml_obj.js
var require_caml_obj = __commonJS({
  "node_modules/rescript/lib/js/caml_obj.js"(exports2) {
    "use strict";
    var Caml = require_caml();
    var for_in = function(o, foo) {
      for (var x in o) {
        foo(x);
      }
    };
    var caml_obj_dup = function(x) {
      if (Array.isArray(x)) {
        var len = x.length;
        var v = new Array(len);
        for (var i = 0; i < len; ++i) {
          v[i] = x[i];
        }
        if (x.TAG !== void 0) {
          v.TAG = x.TAG;
        }
        return v;
      }
      return Object.assign({}, x);
    };
    var update_dummy = function(x, y) {
      var k;
      if (Array.isArray(y)) {
        for (k = 0; k < y.length; ++k) {
          x[k] = y[k];
        }
        if (y.TAG !== void 0) {
          x.TAG = y.TAG;
        }
      } else {
        for (var k in y) {
          x[k] = y[k];
        }
      }
    };
    function caml_compare(a, b) {
      if (a === b) {
        return 0;
      }
      var a_type = typeof a;
      var b_type = typeof b;
      switch (a_type) {
        case "boolean":
          if (b_type === "boolean") {
            return Caml.caml_bool_compare(a, b);
          }
          break;
        case "function":
          if (b_type === "function") {
            throw {
              RE_EXN_ID: "Invalid_argument",
              _1: "compare: functional value",
              Error: new Error()
            };
          }
          break;
        case "number":
          if (b_type === "number") {
            return Caml.caml_int_compare(a, b);
          }
          break;
        case "string":
          if (b_type === "string") {
            return Caml.caml_string_compare(a, b);
          } else {
            return 1;
          }
        case "undefined":
          return -1;
        default:
      }
      switch (b_type) {
        case "string":
          return -1;
        case "undefined":
          return 1;
        default:
          if (a_type === "boolean") {
            return 1;
          }
          if (b_type === "boolean") {
            return -1;
          }
          if (a_type === "function") {
            return 1;
          }
          if (b_type === "function") {
            return -1;
          }
          if (a_type === "number") {
            if (b === null || b.BS_PRIVATE_NESTED_SOME_NONE !== void 0) {
              return 1;
            } else {
              return -1;
            }
          }
          if (b_type === "number") {
            if (a === null || a.BS_PRIVATE_NESTED_SOME_NONE !== void 0) {
              return -1;
            } else {
              return 1;
            }
          }
          if (a === null) {
            if (b.BS_PRIVATE_NESTED_SOME_NONE !== void 0) {
              return 1;
            } else {
              return -1;
            }
          }
          if (b === null) {
            if (a.BS_PRIVATE_NESTED_SOME_NONE !== void 0) {
              return -1;
            } else {
              return 1;
            }
          }
          if (a.BS_PRIVATE_NESTED_SOME_NONE !== void 0) {
            if (b.BS_PRIVATE_NESTED_SOME_NONE !== void 0) {
              return aux_obj_compare(a, b);
            } else {
              return -1;
            }
          }
          var tag_a = a.TAG | 0;
          var tag_b = b.TAG | 0;
          if (tag_a === 248) {
            return Caml.caml_int_compare(a[1], b[1]);
          }
          if (tag_a === 251) {
            throw {
              RE_EXN_ID: "Invalid_argument",
              _1: "equal: abstract value",
              Error: new Error()
            };
          }
          if (tag_a !== tag_b) {
            if (tag_a < tag_b) {
              return -1;
            } else {
              return 1;
            }
          }
          var len_a = a.length | 0;
          var len_b = b.length | 0;
          if (len_a === len_b) {
            if (Array.isArray(a)) {
              var _i = 0;
              while (true) {
                var i = _i;
                if (i === len_a) {
                  return 0;
                }
                var res = caml_compare(a[i], b[i]);
                if (res !== 0) {
                  return res;
                }
                _i = i + 1 | 0;
                continue;
              }
              ;
            } else if (a instanceof Date && b instanceof Date) {
              return a - b;
            } else {
              return aux_obj_compare(a, b);
            }
          } else if (len_a < len_b) {
            var _i$1 = 0;
            while (true) {
              var i$1 = _i$1;
              if (i$1 === len_a) {
                return -1;
              }
              var res$1 = caml_compare(a[i$1], b[i$1]);
              if (res$1 !== 0) {
                return res$1;
              }
              _i$1 = i$1 + 1 | 0;
              continue;
            }
            ;
          } else {
            var _i$2 = 0;
            while (true) {
              var i$2 = _i$2;
              if (i$2 === len_b) {
                return 1;
              }
              var res$2 = caml_compare(a[i$2], b[i$2]);
              if (res$2 !== 0) {
                return res$2;
              }
              _i$2 = i$2 + 1 | 0;
              continue;
            }
            ;
          }
      }
    }
    function aux_obj_compare(a, b) {
      var min_key_lhs = {
        contents: void 0
      };
      var min_key_rhs = {
        contents: void 0
      };
      var do_key = function(param, key) {
        var min_key = param[2];
        var b2 = param[1];
        if (!(!b2.hasOwnProperty(key) || caml_compare(param[0][key], b2[key]) > 0)) {
          return;
        }
        var mk = min_key.contents;
        if (mk !== void 0 && key >= mk) {
          return;
        } else {
          min_key.contents = key;
          return;
        }
      };
      var partial_arg = [
        a,
        b,
        min_key_rhs
      ];
      var do_key_a = function(param) {
        return do_key(partial_arg, param);
      };
      var partial_arg$1 = [
        b,
        a,
        min_key_lhs
      ];
      var do_key_b = function(param) {
        return do_key(partial_arg$1, param);
      };
      for_in(a, do_key_a);
      for_in(b, do_key_b);
      var match = min_key_lhs.contents;
      var match$1 = min_key_rhs.contents;
      if (match !== void 0) {
        if (match$1 !== void 0) {
          return Caml.caml_string_compare(match, match$1);
        } else {
          return -1;
        }
      } else if (match$1 !== void 0) {
        return 1;
      } else {
        return 0;
      }
    }
    function caml_equal(a, b) {
      if (a === b) {
        return true;
      }
      var a_type = typeof a;
      if (a_type === "string" || a_type === "number" || a_type === "boolean" || a_type === "undefined" || a === null) {
        return false;
      }
      var b_type = typeof b;
      if (a_type === "function" || b_type === "function") {
        throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "equal: functional value",
          Error: new Error()
        };
      }
      if (b_type === "number" || b_type === "undefined" || b === null) {
        return false;
      }
      var tag_a = a.TAG | 0;
      var tag_b = b.TAG | 0;
      if (tag_a === 248) {
        return a[1] === b[1];
      }
      if (tag_a === 251) {
        throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "equal: abstract value",
          Error: new Error()
        };
      }
      if (tag_a !== tag_b) {
        return false;
      }
      var len_a = a.length | 0;
      var len_b = b.length | 0;
      if (len_a === len_b) {
        if (Array.isArray(a)) {
          var _i = 0;
          while (true) {
            var i = _i;
            if (i === len_a) {
              return true;
            }
            if (!caml_equal(a[i], b[i])) {
              return false;
            }
            _i = i + 1 | 0;
            continue;
          }
          ;
        } else if (a instanceof Date && b instanceof Date) {
          return !(a > b || a < b);
        } else {
          var result = {
            contents: true
          };
          var do_key_a = function(key) {
            if (!b.hasOwnProperty(key)) {
              result.contents = false;
              return;
            }
          };
          var do_key_b = function(key) {
            if (!a.hasOwnProperty(key) || !caml_equal(b[key], a[key])) {
              result.contents = false;
              return;
            }
          };
          for_in(a, do_key_a);
          if (result.contents) {
            for_in(b, do_key_b);
          }
          return result.contents;
        }
      } else {
        return false;
      }
    }
    function caml_equal_null(x, y) {
      if (y !== null) {
        return caml_equal(x, y);
      } else {
        return x === y;
      }
    }
    function caml_equal_undefined(x, y) {
      if (y !== void 0) {
        return caml_equal(x, y);
      } else {
        return x === y;
      }
    }
    function caml_equal_nullable(x, y) {
      if (y == null) {
        return x === y;
      } else {
        return caml_equal(x, y);
      }
    }
    function caml_notequal(a, b) {
      return !caml_equal(a, b);
    }
    function caml_greaterequal(a, b) {
      return caml_compare(a, b) >= 0;
    }
    function caml_greaterthan(a, b) {
      return caml_compare(a, b) > 0;
    }
    function caml_lessequal(a, b) {
      return caml_compare(a, b) <= 0;
    }
    function caml_lessthan(a, b) {
      return caml_compare(a, b) < 0;
    }
    function caml_min(x, y) {
      if (caml_compare(x, y) <= 0) {
        return x;
      } else {
        return y;
      }
    }
    function caml_max(x, y) {
      if (caml_compare(x, y) >= 0) {
        return x;
      } else {
        return y;
      }
    }
    exports2.caml_obj_dup = caml_obj_dup;
    exports2.update_dummy = update_dummy;
    exports2.caml_compare = caml_compare;
    exports2.caml_equal = caml_equal;
    exports2.caml_equal_null = caml_equal_null;
    exports2.caml_equal_undefined = caml_equal_undefined;
    exports2.caml_equal_nullable = caml_equal_nullable;
    exports2.caml_notequal = caml_notequal;
    exports2.caml_greaterequal = caml_greaterequal;
    exports2.caml_greaterthan = caml_greaterthan;
    exports2.caml_lessthan = caml_lessthan;
    exports2.caml_lessequal = caml_lessequal;
    exports2.caml_min = caml_min;
    exports2.caml_max = caml_max;
  }
});

// node_modules/rescript/lib/js/belt_Option.js
var require_belt_Option = __commonJS({
  "node_modules/rescript/lib/js/belt_Option.js"(exports2) {
    "use strict";
    var Curry = require_curry();
    var Caml_option = require_caml_option();
    function keepU(opt, p) {
      if (opt !== void 0 && p(Caml_option.valFromOption(opt))) {
        return opt;
      }
    }
    function keep(opt, p) {
      return keepU(opt, Curry.__1(p));
    }
    function forEachU(opt, f) {
      if (opt !== void 0) {
        return f(Caml_option.valFromOption(opt));
      }
    }
    function forEach(opt, f) {
      return forEachU(opt, Curry.__1(f));
    }
    function getExn(x) {
      if (x !== void 0) {
        return Caml_option.valFromOption(x);
      }
      throw {
        RE_EXN_ID: "Not_found",
        Error: new Error()
      };
    }
    function mapWithDefaultU(opt, $$default, f) {
      if (opt !== void 0) {
        return f(Caml_option.valFromOption(opt));
      } else {
        return $$default;
      }
    }
    function mapWithDefault(opt, $$default, f) {
      return mapWithDefaultU(opt, $$default, Curry.__1(f));
    }
    function mapU(opt, f) {
      if (opt !== void 0) {
        return Caml_option.some(f(Caml_option.valFromOption(opt)));
      }
    }
    function map(opt, f) {
      return mapU(opt, Curry.__1(f));
    }
    function flatMapU(opt, f) {
      if (opt !== void 0) {
        return f(Caml_option.valFromOption(opt));
      }
    }
    function flatMap(opt, f) {
      return flatMapU(opt, Curry.__1(f));
    }
    function getWithDefault(opt, $$default) {
      if (opt !== void 0) {
        return Caml_option.valFromOption(opt);
      } else {
        return $$default;
      }
    }
    function isSome(param) {
      return param !== void 0;
    }
    function isNone(x) {
      return x === void 0;
    }
    function eqU(a, b, f) {
      if (a !== void 0) {
        if (b !== void 0) {
          return f(Caml_option.valFromOption(a), Caml_option.valFromOption(b));
        } else {
          return false;
        }
      } else {
        return b === void 0;
      }
    }
    function eq(a, b, f) {
      return eqU(a, b, Curry.__2(f));
    }
    function cmpU(a, b, f) {
      if (a !== void 0) {
        if (b !== void 0) {
          return f(Caml_option.valFromOption(a), Caml_option.valFromOption(b));
        } else {
          return 1;
        }
      } else if (b !== void 0) {
        return -1;
      } else {
        return 0;
      }
    }
    function cmp(a, b, f) {
      return cmpU(a, b, Curry.__2(f));
    }
    exports2.keepU = keepU;
    exports2.keep = keep;
    exports2.forEachU = forEachU;
    exports2.forEach = forEach;
    exports2.getExn = getExn;
    exports2.mapWithDefaultU = mapWithDefaultU;
    exports2.mapWithDefault = mapWithDefault;
    exports2.mapU = mapU;
    exports2.map = map;
    exports2.flatMapU = flatMapU;
    exports2.flatMap = flatMap;
    exports2.getWithDefault = getWithDefault;
    exports2.isSome = isSome;
    exports2.isNone = isNone;
    exports2.eqU = eqU;
    exports2.eq = eq;
    exports2.cmpU = cmpU;
    exports2.cmp = cmp;
  }
});

// node_modules/is-var-name/index.js
var require_is_var_name = __commonJS({
  "node_modules/is-var-name/index.js"(exports2, module2) {
    "use strict";
    function isVarName(str) {
      if (typeof str !== "string") {
        return false;
      }
      if (str.trim() !== str) {
        return false;
      }
      try {
        new Function(str, "var " + str);
      } catch (e) {
        return false;
      }
      return true;
    }
    module2.exports = isVarName;
  }
});

// node_modules/rescript/lib/js/belt_Float.js
var require_belt_Float = __commonJS({
  "node_modules/rescript/lib/js/belt_Float.js"(exports2) {
    "use strict";
    function fromString(i) {
      var i$1 = parseFloat(i);
      if (isNaN(i$1)) {
        return;
      } else {
        return i$1;
      }
    }
    exports2.fromString = fromString;
  }
});

// node_modules/rescript/lib/js/caml_exceptions.js
var require_caml_exceptions = __commonJS({
  "node_modules/rescript/lib/js/caml_exceptions.js"(exports2) {
    "use strict";
    var id = {
      contents: 0
    };
    function create(str) {
      id.contents = id.contents + 1 | 0;
      return str + ("/" + id.contents);
    }
    function caml_is_extension(e) {
      if (e == null) {
        return false;
      } else {
        return typeof e.RE_EXN_ID === "string";
      }
    }
    function caml_exn_slot_name(x) {
      return x.RE_EXN_ID;
    }
    exports2.id = id;
    exports2.create = create;
    exports2.caml_is_extension = caml_is_extension;
    exports2.caml_exn_slot_name = caml_exn_slot_name;
  }
});

// node_modules/rescript/lib/js/camlinternalLazy.js
var require_camlinternalLazy = __commonJS({
  "node_modules/rescript/lib/js/camlinternalLazy.js"(exports2) {
    "use strict";
    var Caml_exceptions = require_caml_exceptions();
    function is_val(l) {
      return l.LAZY_DONE;
    }
    var Undefined = /* @__PURE__ */ Caml_exceptions.create("CamlinternalLazy.Undefined");
    function forward_with_closure(blk, closure) {
      var result = closure();
      blk.VAL = result;
      blk.LAZY_DONE = true;
      return result;
    }
    function raise_undefined() {
      throw {
        RE_EXN_ID: Undefined,
        Error: new Error()
      };
    }
    function force(lzv) {
      if (lzv.LAZY_DONE) {
        return lzv.VAL;
      } else {
        var closure = lzv.VAL;
        lzv.VAL = raise_undefined;
        try {
          return forward_with_closure(lzv, closure);
        } catch (e) {
          lzv.VAL = function() {
            throw e;
          };
          throw e;
        }
      }
    }
    function force_val(lzv) {
      if (lzv.LAZY_DONE) {
        return lzv.VAL;
      } else {
        var closure = lzv.VAL;
        lzv.VAL = raise_undefined;
        return forward_with_closure(lzv, closure);
      }
    }
    exports2.Undefined = Undefined;
    exports2.force = force;
    exports2.force_val = force_val;
    exports2.is_val = is_val;
  }
});

// node_modules/rescript/lib/js/caml_string.js
var require_caml_string = __commonJS({
  "node_modules/rescript/lib/js/caml_string.js"(exports2) {
    "use strict";
    function get(s, i) {
      if (i >= s.length || i < 0) {
        throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "index out of bounds",
          Error: new Error()
        };
      }
      return s.charCodeAt(i);
    }
    function make(n, ch) {
      return String.fromCharCode(ch).repeat(n);
    }
    exports2.get = get;
    exports2.make = make;
  }
});

// src/bs-parse/Util.bs.js
var require_Util_bs = __commonJS({
  "src/bs-parse/Util.bs.js"(exports2) {
    "use strict";
    var Belt_Array = require_belt_Array();
    var Caml_string = require_caml_string();
    function explode(str) {
      var _i = str.length - 1 | 0;
      var _list = [];
      while (true) {
        var list = _list;
        var i = _i;
        if (i < 0) {
          return list;
        }
        _list = Belt_Array.concat([Caml_string.get(str, i)], list);
        _i = i - 1 | 0;
        continue;
      }
      ;
    }
    function char_to_string(prim) {
      return String.fromCharCode(prim);
    }
    function char_list_to_string(chars) {
      return Belt_Array.reduce(chars, "", function(a, v) {
        return a + String.fromCharCode(v);
      });
    }
    function take(n, arr) {
      return Belt_Array.slice(arr, 0, n);
    }
    exports2.explode = explode;
    exports2.char_to_string = char_to_string;
    exports2.char_list_to_string = char_list_to_string;
    exports2.take = take;
  }
});

// src/bs-parse/Parser.bs.js
var require_Parser_bs = __commonJS({
  "src/bs-parse/Parser.bs.js"(exports2) {
    "use strict";
    var Curry = require_curry();
    var Util$Netgame = require_Util_bs();
    var CamlinternalLazy = require_camlinternalLazy();
    function DerivedParsers(PS) {
      var map = function(parser, fn) {
        return Curry._2(PS.flatMap, parser, function(v) {
          return Curry._1(PS.unit, Curry._1(fn, v));
        });
      };
      var map2 = function(parser1, parser2, fn) {
        return Curry._2(PS.flatMap, parser1, function(v1) {
          return map(CamlinternalLazy.force(parser2), function(v2) {
            return Curry._2(fn, v1, v2);
          });
        });
      };
      var product = function(parser1, parser2) {
        return map2(parser1, parser2, function(v1, v2) {
          return [
            v1,
            v2
          ];
        });
      };
      var $$char = function(c) {
        return map(Curry._1(PS.string, Util$Netgame.char_to_string(c)), function(s) {
          return s.charCodeAt(0);
        });
      };
      return {
        map,
        map2,
        product,
        $$char
      };
    }
    exports2.DerivedParsers = DerivedParsers;
  }
});

// src/bs-parse/Location.bs.js
var require_Location_bs = __commonJS({
  "src/bs-parse/Location.bs.js"(exports2) {
    "use strict";
    var Belt_Array = require_belt_Array();
    var Util$Netgame = require_Util_bs();
    function make(input, offset) {
      return {
        input,
        offset
      };
    }
    function line(loc) {
      var countBreaks = function(str) {
        return Belt_Array.reduce(Util$Netgame.explode(str), 0, function(acc, v) {
          if (v === 10) {
            return acc + 1 | 0;
          } else {
            return acc;
          }
        });
      };
      return countBreaks(loc.input.slice(0, loc.offset + 1 | 0)) + 1 | 0;
    }
    function col(loc) {
      var lines = Belt_Array.reverse(loc.input.slice(0, loc.offset + 1 | 0).split("\n"));
      return Belt_Array.getExn(lines, 0).length;
    }
    function inc(loc, offset) {
      return {
        input: loc.input,
        offset: loc.offset + offset | 0
      };
    }
    exports2.make = make;
    exports2.line = line;
    exports2.col = col;
    exports2.inc = inc;
  }
});

// src/bs-parse/ParseError.bs.js
var require_ParseError_bs = __commonJS({
  "src/bs-parse/ParseError.bs.js"(exports2) {
    "use strict";
    var Belt_Array = require_belt_Array();
    var Location$Netgame = require_Location_bs();
    function makeWith(stack, failures) {
      return {
        stack,
        otherFailures: failures
      };
    }
    function make(loc, string) {
      return {
        stack: [[
          loc,
          string
        ]],
        otherFailures: []
      };
    }
    function getStackTrace(error) {
      return Belt_Array.reduce(error.stack, [], function(acc, param) {
        var loc = param[0];
        var line = Location$Netgame.line(loc);
        var column = Location$Netgame.col(loc);
        var finalMessage = "" + param[1] + " at line " + line + ", column " + column;
        return Belt_Array.concat(acc, [finalMessage]);
      });
    }
    function getAllStackTrace(error) {
      var otherFailureStackTraces = Belt_Array.concatMany(Belt_Array.map(error.otherFailures, getStackTrace));
      return Belt_Array.concat(getStackTrace(error), otherFailureStackTraces);
    }
    function toString(error) {
      return getAllStackTrace(error).join("\n");
    }
    exports2.makeWith = makeWith;
    exports2.make = make;
    exports2.getStackTrace = getStackTrace;
    exports2.getAllStackTrace = getAllStackTrace;
    exports2.toString = toString;
  }
});

// src/bs-parse/Combinators.bs.js
var require_Combinators_bs = __commonJS({
  "src/bs-parse/Combinators.bs.js"(exports2) {
    "use strict";
    var Curry = require_curry();
    var Belt_Array = require_belt_Array();
    var Belt_Option = require_belt_Option();
    var Caml_option = require_caml_option();
    var Parser$Netgame = require_Parser_bs();
    var Caml_exceptions = require_caml_exceptions();
    var CamlinternalLazy = require_camlinternalLazy();
    var Location$Netgame = require_Location_bs();
    var ParseError$Netgame = require_ParseError_bs();
    var CannotGet = /* @__PURE__ */ Caml_exceptions.create("Combinators-Netgame.BasicCombinators.CannotGet");
    var CannotGetError = /* @__PURE__ */ Caml_exceptions.create("Combinators-Netgame.BasicCombinators.CannotGetError");
    function get_exn(result) {
      if (result.TAG === 0) {
        return result._0[0];
      }
      throw {
        RE_EXN_ID: CannotGet,
        _1: result._0,
        Error: new Error()
      };
    }
    function get_error(result) {
      if (result.TAG !== 0) {
        return result._0;
      }
      throw {
        RE_EXN_ID: CannotGetError,
        Error: new Error()
      };
    }
    function runParser(p, loc) {
      switch (p.TAG | 0) {
        case 0:
          return Curry._1(p._1, loc);
        case 1:
          var ok = Curry._1(p._1, loc);
          if (ok.TAG === 0) {
            return ok;
          } else {
            return {
              TAG: 1,
              _0: ParseError$Netgame.make(loc, p._0)
            };
          }
        case 2:
          return Curry._1(p._0, loc);
      }
    }
    function run(parser, input) {
      return runParser(parser, Location$Netgame.make(input, 0));
    }
    function string(str) {
      return {
        TAG: 2,
        _0: function(loc) {
          var length = str.length;
          if (loc.input.slice(loc.offset, loc.offset + length | 0) === str) {
            return {
              TAG: 0,
              _0: [
                str,
                Location$Netgame.inc(loc, length)
              ]
            };
          } else {
            return {
              TAG: 1,
              _0: ParseError$Netgame.make(loc, "Expected: " + str)
            };
          }
        }
      };
    }
    function orElse(p1, p2) {
      return {
        TAG: 2,
        _0: function(loc) {
          var error1 = runParser(p1, loc);
          if (error1.TAG === 0) {
            return error1;
          }
          var error2 = runParser(CamlinternalLazy.force(p2), loc);
          if (error2.TAG === 0) {
            return error2;
          }
          var error2$1 = error2._0;
          var stack = error2$1.stack;
          var otherFailures = Belt_Array.concat(error2$1.otherFailures, [error1._0]);
          return {
            TAG: 1,
            _0: ParseError$Netgame.makeWith(stack, otherFailures)
          };
        }
      };
    }
    function flatMap(p, fn) {
      return {
        TAG: 2,
        _0: function(loc) {
          var err = runParser(p, loc);
          if (err.TAG !== 0) {
            return {
              TAG: 1,
              _0: err._0
            };
          }
          var match = err._0;
          var err$1 = runParser(Curry._1(fn, match[0]), match[1]);
          if (err$1.TAG !== 0) {
            return {
              TAG: 1,
              _0: err$1._0
            };
          }
          var match$1 = err$1._0;
          return {
            TAG: 0,
            _0: [
              match$1[0],
              match$1[1]
            ]
          };
        }
      };
    }
    function unit(a) {
      return {
        TAG: 2,
        _0: function(loc) {
          return {
            TAG: 0,
            _0: [
              a,
              loc
            ]
          };
        }
      };
    }
    function listOfN($$int, p) {
      return {
        TAG: 2,
        _0: function(loc) {
          var _i = $$int;
          var _loc = loc;
          var _acc = [];
          while (true) {
            var acc = _acc;
            var loc$1 = _loc;
            var i = _i;
            var error = runParser(p, loc$1);
            if (error.TAG !== 0) {
              return {
                TAG: 1,
                _0: error._0
              };
            }
            var match = error._0;
            var loc$2 = match[1];
            var newAcc = Belt_Array.concat([match[0]], acc);
            if (i <= 0) {
              return {
                TAG: 0,
                _0: [
                  newAcc,
                  loc$2
                ]
              };
            }
            _acc = newAcc;
            _loc = loc$2;
            _i = i - 1 | 0;
            continue;
          }
          ;
        }
      };
    }
    function many(p) {
      return {
        TAG: 2,
        _0: function(loc) {
          var _loc = loc;
          var _acc = [];
          while (true) {
            var acc = _acc;
            var loc$1 = _loc;
            var match = runParser(p, loc$1);
            if (match.TAG !== 0) {
              return {
                TAG: 0,
                _0: [
                  acc,
                  loc$1
                ]
              };
            }
            var match$1 = match._0;
            _acc = Belt_Array.concat([match$1[0]], acc);
            _loc = match$1[1];
            continue;
          }
          ;
        }
      };
    }
    function many1(p) {
      return {
        TAG: 2,
        _0: function(loc) {
          var err = runParser(many(p), loc);
          if (err.TAG !== 0) {
            return err;
          }
          var match = err._0;
          var loc$1 = match[1];
          var v = match[0];
          if (v.length === 0) {
            return {
              TAG: 1,
              _0: ParseError$Netgame.make(loc$1, "Expected at least one repetition for parser")
            };
          } else {
            return {
              TAG: 0,
              _0: [
                v,
                loc$1
              ]
            };
          }
        }
      };
    }
    function slice(p) {
      return {
        TAG: 2,
        _0: function(loc) {
          var error = runParser(p, loc);
          if (error.TAG !== 0) {
            return {
              TAG: 1,
              _0: error._0
            };
          }
          var newLoc = error._0[1];
          var charsConsumed = newLoc.offset - loc.offset | 0;
          return {
            TAG: 0,
            _0: [
              loc.input.substr(loc.offset, charsConsumed),
              newLoc
            ]
          };
        }
      };
    }
    function regexRaw(reg) {
      return {
        TAG: 2,
        _0: function(loc) {
          var sstr = loc.input.substr(loc.offset);
          if (!reg.test(sstr)) {
            return {
              TAG: 1,
              _0: ParseError$Netgame.make(loc, "Expected: " + reg.source)
            };
          }
          var result = Belt_Array.map(Belt_Option.getExn(Caml_option.null_to_opt(reg.exec(sstr))), function(x) {
            return Belt_Option.getExn(x == null ? void 0 : Caml_option.some(x));
          });
          var charsConsumed = Belt_Array.getExn(result, 0).length;
          var newLoc_input = loc.input;
          var newLoc_offset = loc.offset + charsConsumed | 0;
          var newLoc = {
            input: newLoc_input,
            offset: newLoc_offset
          };
          return {
            TAG: 0,
            _0: [
              result,
              newLoc
            ]
          };
        }
      };
    }
    function regex(str) {
      return regexRaw(new RegExp("^" + str));
    }
    function sepBy(sep, p) {
      return {
        TAG: 2,
        _0: function(loc) {
          var _loc = loc;
          var _acc = [];
          while (true) {
            var acc = _acc;
            var loc$1 = _loc;
            var match = runParser(p, loc$1);
            if (match.TAG !== 0) {
              return {
                TAG: 0,
                _0: [
                  acc,
                  loc$1
                ]
              };
            }
            var match$1 = match._0;
            var loc$2 = match$1[1];
            var newAcc = Belt_Array.concat([match$1[0]], acc);
            var match$2 = runParser(sep, loc$2);
            if (match$2.TAG !== 0) {
              return {
                TAG: 0,
                _0: [
                  newAcc,
                  loc$2
                ]
              };
            }
            _acc = newAcc;
            _loc = match$2._0[1];
            continue;
          }
          ;
        }
      };
    }
    function label(m, p) {
      switch (p.TAG | 0) {
        case 0:
          return p;
        case 1:
          return {
            TAG: 1,
            _0: m,
            _1: p._1
          };
        case 2:
          return {
            TAG: 1,
            _0: m,
            _1: p._0
          };
      }
    }
    function scope(m, p) {
      switch (p.TAG | 0) {
        case 0:
          return {
            TAG: 0,
            _0: Belt_Array.concat(p._0, [m]),
            _1: p._1
          };
        case 1:
          return {
            TAG: 0,
            _0: [m],
            _1: p._1
          };
        case 2:
          return {
            TAG: 0,
            _0: [],
            _1: p._0
          };
      }
    }
    function attempt(p) {
      return {
        TAG: 2,
        _0: function(loc) {
          var match = runParser(p, loc);
          if (match.TAG !== 0) {
            return {
              TAG: 0,
              _0: [
                void 0,
                loc
              ]
            };
          }
          var match$1 = match._0;
          return {
            TAG: 0,
            _0: [
              Caml_option.some(match$1[0]),
              match$1[1]
            ]
          };
        }
      };
    }
    function fail(error) {
      return {
        TAG: 2,
        _0: function(loc) {
          return {
            TAG: 1,
            _0: ParseError$Netgame.make(loc, error)
          };
        }
      };
    }
    var BasicCombinators = {
      run,
      get_exn,
      get_error,
      string,
      orElse,
      flatMap,
      unit,
      listOfN,
      many,
      many1,
      slice,
      regexRaw,
      regex,
      sepBy,
      label,
      scope,
      attempt,
      fail
    };
    var DP = Parser$Netgame.DerivedParsers(BasicCombinators);
    var map = DP.map;
    var map2 = DP.map2;
    var product = DP.product;
    var $$char = DP.$$char;
    exports2.BasicCombinators = BasicCombinators;
    exports2.DP = DP;
    exports2.run = run;
    exports2.get_exn = get_exn;
    exports2.get_error = get_error;
    exports2.string = string;
    exports2.orElse = orElse;
    exports2.flatMap = flatMap;
    exports2.unit = unit;
    exports2.listOfN = listOfN;
    exports2.many = many;
    exports2.many1 = many1;
    exports2.slice = slice;
    exports2.regexRaw = regexRaw;
    exports2.regex = regex;
    exports2.sepBy = sepBy;
    exports2.label = label;
    exports2.scope = scope;
    exports2.attempt = attempt;
    exports2.fail = fail;
    exports2.map = map;
    exports2.map2 = map2;
    exports2.product = product;
    exports2.$$char = $$char;
  }
});

// src/bs-parse/CommonCombinators.bs.js
var require_CommonCombinators_bs = __commonJS({
  "src/bs-parse/CommonCombinators.bs.js"(exports2) {
    "use strict";
    var Curry = require_curry();
    var Belt_Array = require_belt_Array();
    var Combinators$Netgame = require_Combinators_bs();
    var eof = Combinators$Netgame.label("Expected EOF", Curry._2(Combinators$Netgame.map, Combinators$Netgame.slice(Combinators$Netgame.regex("$")), function(param) {
    }));
    var whitespace = Curry._2(Combinators$Netgame.map, Combinators$Netgame.slice(Combinators$Netgame.regex("[\\s]*")), function(param) {
    });
    function spaceAround(bodyP) {
      return Combinators$Netgame.flatMap(whitespace, function(param) {
        return Combinators$Netgame.flatMap(bodyP, function(result) {
          return Curry._2(Combinators$Netgame.map, whitespace, function(param2) {
            return result;
          });
        });
      });
    }
    function surround(openP, bodyP, closeP) {
      return Combinators$Netgame.flatMap(openP, function(param) {
        return Combinators$Netgame.flatMap(spaceAround(bodyP), function(result) {
          return Curry._2(Combinators$Netgame.map, closeP, function(param2) {
            return result;
          });
        });
      });
    }
    var number = Combinators$Netgame.slice(Combinators$Netgame.regex("-?\\d+(?:\\.\\d*)?(?:[eE][+\\-]?\\d+)?"));
    var str = Curry._2(Combinators$Netgame.map, Combinators$Netgame.regex('"([^"]*)"'), function(matches) {
      return Belt_Array.getExn(matches, 1);
    });
    exports2.eof = eof;
    exports2.whitespace = whitespace;
    exports2.spaceAround = spaceAround;
    exports2.surround = surround;
    exports2.number = number;
    exports2.str = str;
  }
});

// src/JsonParser.bs.js
var require_JsonParser_bs = __commonJS({
  "src/JsonParser.bs.js"(exports2) {
    "use strict";
    var Curry = require_curry();
    var Belt_Array = require_belt_Array();
    var Belt_Float = require_belt_Float();
    var Belt_Option = require_belt_Option();
    var Belt_MapString = require_belt_MapString();
    var CamlinternalLazy = require_camlinternalLazy();
    var Combinators$Netgame = require_Combinators_bs();
    var CommonCombinators$Netgame = require_CommonCombinators_bs();
    function either(v, some, none2) {
      if (Belt_Option.isNone(v)) {
        return Curry._1(none2, void 0);
      } else {
        return Curry._1(some, v);
      }
    }
    function print(json) {
      switch (json.TAG | 0) {
        case 0:
          if (json._0) {
            return "true";
          } else {
            return "false";
          }
        case 1:
          return String(json._0);
        case 2:
          return json._0;
        case 3:
          return either(json._0, function(v) {
            return "Some(" + print(v) + ")";
          }, function(param) {
            return "None";
          });
        case 4:
          return "Array[" + Belt_Array.map(json._0, print).join(", ") + "]";
        case 5:
          var entries = Belt_Array.map(Belt_MapString.toArray(Belt_MapString.map(json._0, print)), function(param) {
            return '"' + param[0] + '": ' + param[1];
          }).join(",\n");
          return "Object{\n" + entries + "\n}";
      }
    }
    var none = Curry._2(Combinators$Netgame.map, Combinators$Netgame.string("null"), function(param) {
      return {
        TAG: 3,
        _0: void 0
      };
    });
    var trueBool = Curry._2(Combinators$Netgame.map, Combinators$Netgame.string("true"), function(param) {
      return {
        TAG: 0,
        _0: true
      };
    });
    var falseBool = Curry._2(Combinators$Netgame.map, Combinators$Netgame.string("false"), function(param) {
      return {
        TAG: 0,
        _0: false
      };
    });
    var bools = Combinators$Netgame.orElse(trueBool, {
      LAZY_DONE: true,
      VAL: falseBool
    });
    var quotedString = Curry._2(Combinators$Netgame.map, CommonCombinators$Netgame.str, function(s) {
      return {
        TAG: 2,
        _0: s
      };
    });
    var number = Curry._2(Combinators$Netgame.map, CommonCombinators$Netgame.number, function(numberStr) {
      return {
        TAG: 1,
        _0: Belt_Option.getWithDefault(Belt_Float.fromString(numberStr), 0)
      };
    });
    var literal = Combinators$Netgame.orElse(Combinators$Netgame.orElse(Combinators$Netgame.orElse(bools, {
      LAZY_DONE: true,
      VAL: quotedString
    }), {
      LAZY_DONE: true,
      VAL: number
    }), {
      LAZY_DONE: true,
      VAL: none
    });
    function objectMemberP(expr2) {
      return Combinators$Netgame.flatMap(Combinators$Netgame.regex('"([^"]*)"\\s*:\\s*'), function(captured) {
        return Curry._2(Combinators$Netgame.map, expr2, function(value) {
          var key = Belt_Array.getExn(captured, 1);
          return [
            key,
            value
          ];
        });
      });
    }
    function objP(expr2) {
      return Curry._2(Combinators$Netgame.map, CommonCombinators$Netgame.surround(Combinators$Netgame.string("{"), Combinators$Netgame.sepBy(Combinators$Netgame.string(","), CommonCombinators$Netgame.spaceAround(objectMemberP(expr2))), Combinators$Netgame.string("}")), function(res) {
        return {
          TAG: 5,
          _0: Belt_MapString.fromArray(res)
        };
      });
    }
    function arrayP(expr2) {
      return Curry._2(Combinators$Netgame.map, CommonCombinators$Netgame.surround(Combinators$Netgame.string("["), Combinators$Netgame.sepBy(Combinators$Netgame.string(","), CommonCombinators$Netgame.spaceAround(expr2)), Combinators$Netgame.string("]")), function(res) {
        return {
          TAG: 4,
          _0: res
        };
      });
    }
    var expr = {
      LAZY_DONE: false,
      VAL: function() {
        return Combinators$Netgame.orElse(Combinators$Netgame.orElse(literal, {
          LAZY_DONE: false,
          VAL: function() {
            return objP(CamlinternalLazy.force(expr));
          }
        }), {
          LAZY_DONE: false,
          VAL: function() {
            return arrayP(CamlinternalLazy.force(expr));
          }
        });
      }
    };
    var objectMember = objectMemberP(CamlinternalLazy.force(expr));
    var obj = objP(CamlinternalLazy.force(expr));
    var array = arrayP(CamlinternalLazy.force(expr));
    exports2.either = either;
    exports2.print = print;
    exports2.none = none;
    exports2.trueBool = trueBool;
    exports2.falseBool = falseBool;
    exports2.bools = bools;
    exports2.quotedString = quotedString;
    exports2.number = number;
    exports2.literal = literal;
    exports2.objectMemberP = objectMemberP;
    exports2.objP = objP;
    exports2.arrayP = arrayP;
    exports2.expr = expr;
    exports2.objectMember = objectMember;
    exports2.obj = obj;
    exports2.array = array;
  }
});

// src/JsonToCode.bs.js
var require_JsonToCode_bs = __commonJS({
  "src/JsonToCode.bs.js"(exports2) {
    "use strict";
    var Caml_obj = require_caml_obj();
    var Belt_Array = require_belt_Array();
    var Belt_Option = require_belt_Option();
    var IsVarName = require_is_var_name();
    var Belt_MapString = require_belt_MapString();
    var JsonParser$Netgame = require_JsonParser_bs();
    var Combinators$Netgame = require_Combinators_bs();
    function stringify(schema) {
      if (typeof schema === "number") {
        switch (schema) {
          case 0:
            return "unknown";
          case 1:
            return "bool";
          case 2:
            return "number";
          case 3:
            return "string";
        }
      } else {
        switch (schema.TAG | 0) {
          case 0:
            return "Option(" + stringify(schema._0) + ")";
          case 1:
            return "Array(" + stringify(schema._0) + ")";
          case 2:
            return "Map(" + stringify(schema._0) + ")";
          case 3:
            var props = Belt_Array.map(Belt_MapString.toArray(schema._0), function(param) {
              return param[0] + ": " + stringify(param[1]) + ", ";
            }).join("\n");
            return "Object(\n          " + props + "\n        )";
        }
      }
    }
    function join(a, b) {
      if (typeof a === "number") {
        switch (a) {
          case 0:
            if (typeof b === "number") {
              if (b === 0) {
                return 0;
              } else {
                return {
                  TAG: 0,
                  _0: b
                };
              }
            } else if (b.TAG === 0) {
              return {
                TAG: 0,
                _0: b._0
              };
            } else {
              return {
                TAG: 0,
                _0: b
              };
            }
          case 1:
            if (typeof b === "number") {
              switch (b) {
                case 0:
                  break;
                case 1:
                  return 1;
                default:
                  return 0;
              }
            } else if (b.TAG !== 0) {
              return 0;
            }
            break;
          case 2:
            if (typeof b === "number") {
              switch (b) {
                case 0:
                  break;
                case 2:
                  return 2;
                default:
                  return 0;
              }
            } else if (b.TAG !== 0) {
              return 0;
            }
            break;
          case 3:
            if (typeof b === "number") {
              switch (b) {
                case 0:
                  break;
                case 3:
                  return 3;
                default:
                  return 0;
              }
            } else if (b.TAG !== 0) {
              return 0;
            }
            break;
        }
      } else {
        switch (a.TAG | 0) {
          case 0:
            if (typeof b === "number") {
              if (b === 0) {
                return {
                  TAG: 0,
                  _0: a._0
                };
              } else {
                return {
                  TAG: 0,
                  _0: join(a._0, b)
                };
              }
            }
            if (b.TAG !== 0) {
              return {
                TAG: 0,
                _0: join(a._0, b)
              };
            }
            break;
          case 1:
            if (typeof b === "number") {
              if (b !== 0) {
                return 0;
              }
            } else {
              switch (b.TAG | 0) {
                case 0:
                  break;
                case 1:
                  return {
                    TAG: 1,
                    _0: join(a._0, b._0)
                  };
                default:
                  return 0;
              }
            }
            break;
          case 2:
            if (typeof b === "number") {
              if (b !== 0) {
                return 0;
              }
            } else {
              switch (b.TAG | 0) {
                case 0:
                  break;
                case 2:
                  return {
                    TAG: 2,
                    _0: join(a._0, b._0)
                  };
                default:
                  return 0;
              }
            }
            break;
          case 3:
            if (typeof b === "number") {
              if (b !== 0) {
                return 0;
              }
            } else {
              switch (b.TAG | 0) {
                case 0:
                  break;
                case 3:
                  return {
                    TAG: 3,
                    _0: Belt_MapString.merge(a._0, b._0, function(param, a2, b2) {
                      if (a2 !== void 0) {
                        if (b2 !== void 0) {
                          return join(a2, b2);
                        } else {
                          return {
                            TAG: 0,
                            _0: a2
                          };
                        }
                      }
                      if (b2 !== void 0) {
                        return {
                          TAG: 0,
                          _0: b2
                        };
                      }
                      throw {
                        RE_EXN_ID: "Assert_failure",
                        _1: [
                          "JsonToCode.res",
                          57,
                          24
                        ],
                        Error: new Error()
                      };
                    })
                  };
                default:
                  return 0;
              }
            }
            break;
        }
      }
      if (typeof b === "number") {
        return {
          TAG: 0,
          _0: a
        };
      } else {
        return {
          TAG: 0,
          _0: join(a, b._0)
        };
      }
    }
    function toSchema(json) {
      switch (json.TAG | 0) {
        case 0:
          return 1;
        case 1:
          return 2;
        case 2:
          return 3;
        case 3:
          var v = json._0;
          return {
            TAG: 0,
            _0: Belt_Option.isSome(v) ? toSchema(Belt_Option.getExn(v)) : 0
          };
        case 4:
          var v$1 = json._0;
          if (v$1.length !== 0) {
            return {
              TAG: 1,
              _0: Belt_Array.reduce(v$1, toSchema(Belt_Array.getExn(v$1, 0)), function(a, v2) {
                return join(a, toSchema(v2));
              })
            };
          } else {
            return {
              TAG: 1,
              _0: 0
            };
          }
        case 5:
          var v$2 = json._0;
          var schemas = Belt_MapString.map(v$2, toSchema);
          var first = Belt_MapString.findFirstBy(schemas, function(param, param$1) {
            return true;
          });
          if (Belt_Option.isNone(first)) {
            return {
              TAG: 3,
              _0: Belt_MapString.fromArray([])
            };
          }
          var match = Belt_Option.getExn(first);
          var firstSchema = match[1];
          var firstKey = match[0];
          if (Belt_MapString.every(v$2, function(key, param) {
            return IsVarName(key);
          })) {
            if (typeof firstSchema === "number" || !(Belt_MapString.size(schemas) > 1 && Belt_MapString.every(schemas, function(param, schema) {
              return Caml_obj.caml_equal(schema, firstSchema);
            }))) {
              return {
                TAG: 3,
                _0: schemas
              };
            } else {
              return {
                TAG: 2,
                _0: firstSchema
              };
            }
          } else {
            return {
              TAG: 2,
              _0: Belt_MapString.reduce(schemas, firstSchema, function(a, key, v2) {
                if (key === firstKey) {
                  return a;
                } else {
                  return join(a, v2);
                }
              })
            };
          }
      }
    }
    function run(json) {
      return toSchema(Combinators$Netgame.get_exn(Combinators$Netgame.run(JsonParser$Netgame.obj, json)));
    }
    exports2.stringify = stringify;
    exports2.join = join;
    exports2.toSchema = toSchema;
    exports2.run = run;
  }
});

// src/JsonToCpp.bs.js
var require_JsonToCpp_bs = __commonJS({
  "src/JsonToCpp.bs.js"(exports2) {
    "use strict";
    var Belt_Array = require_belt_Array();
    var Belt_MapString = require_belt_MapString();
    var JsonToCode$Netgame = require_JsonToCode_bs();
    function makeCppType(typedef, expr) {
      return {
        typedef,
        expr
      };
    }
    function makeTemplatedType(t, template) {
      return {
        typedef: t.typedef,
        expr: template + "<" + t.expr + ">"
      };
    }
    var reserverWords = [
      "asm",
      "double",
      "new",
      "switch",
      "auto",
      "else",
      "operator",
      "template",
      "break",
      "enum",
      "private",
      "this",
      "case",
      "extern",
      "protected",
      "throw",
      "catch",
      "float",
      "public",
      "try",
      "char",
      "for",
      "register",
      "typedef",
      "class",
      "friend",
      "return",
      "union",
      "const",
      "goto",
      "short",
      "unsigned",
      "continue",
      "if",
      "signed",
      "virtual",
      "default",
      "inline",
      "sizeof",
      "void",
      "delete",
      "int",
      "static",
      "volatile",
      "do",
      "long",
      "struct",
      "while"
    ];
    function safe(name) {
      if (Belt_Array.some(reserverWords, function(word) {
        return word === name;
      })) {
        return name + "_";
      } else {
        return name;
      }
    }
    function genCpp(name, schema) {
      if (typeof schema === "number") {
        switch (schema) {
          case 0:
            return {
              typedef: "",
              expr: "unknown"
            };
          case 1:
            return {
              typedef: "",
              expr: "bool"
            };
          case 2:
            return {
              typedef: "",
              expr: "double"
            };
          case 3:
            return {
              typedef: "",
              expr: "std::string"
            };
        }
      } else {
        switch (schema.TAG | 0) {
          case 0:
            return makeTemplatedType(genCpp(name + "_element", schema._0), "maybe");
          case 1:
            var schema$1 = schema._0;
            if (schema$1 === 0) {
              return {
                typedef: "",
                expr: "vector<unknown>"
              };
            } else {
              return makeTemplatedType(genCpp(name + "_element", schema$1), "vector");
            }
          case 2:
            return makeTemplatedType(genCpp(name + "_element", schema._0), "map");
          case 3:
            var entries = schema._0;
            var types = Belt_Array.map(Belt_MapString.toArray(entries), function(param) {
              return genCpp(param[0], param[1]);
            });
            var typedefs = Belt_Array.map(Belt_Array.keep(Belt_Array.map(types, function(t) {
              return t.typedef;
            }), function(t) {
              return t !== "";
            }), function(str) {
              return str + ";\n";
            }).join("");
            var elements = Belt_Array.map(Belt_MapString.toArray(entries), function(param) {
              var value = param[1];
              var name2 = param[0];
              return [
                name2,
                value,
                genCpp(name2, value)
              ];
            });
            var declarations = Belt_Array.map(elements, function(param) {
              return "const " + param[2].expr + " " + safe(param[0]) + ";\n";
            }).join("");
            var assignments = Belt_Array.map(elements, function(param) {
              var value = param[1];
              var name2 = param[0];
              var name$p2 = safe(name2);
              if (typeof value === "number") {
                switch (value) {
                  case 0:
                    return name$p2 + "()";
                  case 1:
                    return name$p2 + '(v["' + name2 + '"].GetBool())';
                  case 2:
                    return name$p2 + '(v["' + name2 + '"].GetDouble())';
                  case 3:
                    return name$p2 + '(v["' + name2 + '"].GetString())';
                }
              } else {
                switch (value.TAG | 0) {
                  case 0:
                    return name$p2 + '(v, "' + name2 + '")';
                  case 1:
                    if (value._0 === 0) {
                      return name$p2 + "(vector<unknown>())";
                    } else {
                      return name$p2 + '(v["' + name2 + '"])';
                    }
                  case 2:
                  case 3:
                    return name$p2 + '(v["' + name2 + '"])';
                }
              }
            }).join(",\n");
            var name$p = safe(name);
            return {
              typedef: elements.length !== 0 ? "struct " + name$p + " {\n          " + typedefs + "\n          " + declarations + "\n          explicit " + name$p + "(const rapidjson::Value& v) :\n          " + assignments + " {}\n          };" : "struct " + name$p + " {\n            explicit " + name$p + "(const rapidjson::Value& v) {}\n          }",
              expr: name$p
            };
        }
      }
    }
    function run(name, json) {
      try {
        return "\n#ifndef " + name.toUpperCase() + "_GENERATED_H\n#define " + name.toUpperCase() + '_GENERATED_H\n\n#include "cjson/cjson.h"\nnamespace cjson {\n' + genCpp(name, JsonToCode$Netgame.run(json)).typedef + "\n}\n\n#endif\n";
      } catch (exn) {
        return;
      }
    }
    exports2.makeCppType = makeCppType;
    exports2.makeTemplatedType = makeTemplatedType;
    exports2.reserverWords = reserverWords;
    exports2.safe = safe;
    exports2.genCpp = genCpp;
    exports2.run = run;
  }
});

// src/JsonToJava.bs.js
var require_JsonToJava_bs = __commonJS({
  "src/JsonToJava.bs.js"() {
  }
});

// src/index.js
var glob = require_out4();
var fs = require_lib();
var path = require("path");
var JsonToCpp = require_JsonToCpp_bs();
var JsonToJava = require_JsonToJava_bs();
var main = async (argv) => {
  const files = await glob(argv[2]);
  console.log(files, "test/test.json");
  return Promise.all(files.map(async (file) => {
    try {
      const content = await fs.readFile(file, "utf8");
      const cpp = JsonToCpp.run(path.parse(file).name, content);
      if (cpp)
        await fs.outputFile(file.replace(".json", "_generated.h"), cpp);
    } catch (e) {
      console.error("Some go wrong", e);
    }
  }));
};
main(process.argv);
/*!
 * fill-range <https://github.com/jonschlinkert/fill-range>
 *
 * Copyright (c) 2014-present, Jon Schlinkert.
 * Licensed under the MIT License.
 */
/*!
 * is-extglob <https://github.com/jonschlinkert/is-extglob>
 *
 * Copyright (c) 2014-2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */
/*!
 * is-glob <https://github.com/jonschlinkert/is-glob>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */
/*!
 * is-number <https://github.com/jonschlinkert/is-number>
 *
 * Copyright (c) 2014-present, Jon Schlinkert.
 * Released under the MIT License.
 */
/*!
 * is-var-name | ISC (c) Shinnosuke Watanabe
 * https://github.com/shinnn/is-var-name
*/
/*!
 * to-regex-range <https://github.com/micromatch/to-regex-range>
 *
 * Copyright (c) 2015-present, Jon Schlinkert.
 * Released under the MIT License.
 */
/*! queue-microtask. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
/*! run-parallel. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
