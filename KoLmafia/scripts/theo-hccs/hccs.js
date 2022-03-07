/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 7987:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var parent = __webpack_require__(7981);

module.exports = parent;

/***/ }),

/***/ 2529:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(9390);

__webpack_require__(5892);

var entryUnbind = __webpack_require__(1305);

module.exports = entryUnbind('Array', 'flat');

/***/ }),

/***/ 1755:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var parent = __webpack_require__(7987);

module.exports = parent;

/***/ }),

/***/ 8257:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var isCallable = __webpack_require__(9212);

var tryToString = __webpack_require__(5637);

var TypeError = global.TypeError; // `Assert: IsCallable(argument) is true`

module.exports = function (argument) {
  if (isCallable(argument)) return argument;
  throw TypeError(tryToString(argument) + ' is not a function');
};

/***/ }),

/***/ 6288:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var wellKnownSymbol = __webpack_require__(3649);

var create = __webpack_require__(3590);

var definePropertyModule = __webpack_require__(4615);

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype; // Array.prototype[@@unscopables]
// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables

if (ArrayPrototype[UNSCOPABLES] == undefined) {
  definePropertyModule.f(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: create(null)
  });
} // add a key to Array.prototype[@@unscopables]


module.exports = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};

/***/ }),

/***/ 2569:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var isObject = __webpack_require__(794);

var String = global.String;
var TypeError = global.TypeError; // `Assert: Type(argument) is Object`

module.exports = function (argument) {
  if (isObject(argument)) return argument;
  throw TypeError(String(argument) + ' is not an object');
};

/***/ }),

/***/ 5766:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toIndexedObject = __webpack_require__(2977);

var toAbsoluteIndex = __webpack_require__(6782);

var lengthOfArrayLike = __webpack_require__(1825); // `Array.prototype.{ indexOf, includes }` methods implementation


var createMethod = function createMethod(IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = lengthOfArrayLike(O);
    var index = toAbsoluteIndex(fromIndex, length);
    var value; // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check

    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++]; // eslint-disable-next-line no-self-compare -- NaN check

      if (value != value) return true; // Array#indexOf ignores holes, Array#includes - not
    } else for (; length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    }
    return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};

/***/ }),

/***/ 5289:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var isArray = __webpack_require__(4521);

var isConstructor = __webpack_require__(2097);

var isObject = __webpack_require__(794);

var wellKnownSymbol = __webpack_require__(3649);

var SPECIES = wellKnownSymbol('species');
var Array = global.Array; // a part of `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate

module.exports = function (originalArray) {
  var C;

  if (isArray(originalArray)) {
    C = originalArray.constructor; // cross-realm fallback

    if (isConstructor(C) && (C === Array || isArray(C.prototype))) C = undefined;else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  }

  return C === undefined ? Array : C;
};

/***/ }),

/***/ 4822:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arraySpeciesConstructor = __webpack_require__(5289); // `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate


module.exports = function (originalArray, length) {
  return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
};

/***/ }),

/***/ 9624:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(7386);

var toString = uncurryThis({}.toString);
var stringSlice = uncurryThis(''.slice);

module.exports = function (it) {
  return stringSlice(toString(it), 8, -1);
};

/***/ }),

/***/ 3058:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var TO_STRING_TAG_SUPPORT = __webpack_require__(8191);

var isCallable = __webpack_require__(9212);

var classofRaw = __webpack_require__(9624);

var wellKnownSymbol = __webpack_require__(3649);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var Object = global.Object; // ES3 wrong here

var CORRECT_ARGUMENTS = classofRaw(function () {
  return arguments;
}()) == 'Arguments'; // fallback for IE11 Script Access Denied error

var tryGet = function tryGet(it, key) {
  try {
    return it[key];
  } catch (error) {
    /* empty */
  }
}; // getting tag from ES6+ `Object.prototype.toString`


module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null' // @@toStringTag case
  : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag // builtinTag case
  : CORRECT_ARGUMENTS ? classofRaw(O) // ES3 arguments fallback
  : (result = classofRaw(O)) == 'Object' && isCallable(O.callee) ? 'Arguments' : result;
};

/***/ }),

/***/ 3478:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var hasOwn = __webpack_require__(2870);

var ownKeys = __webpack_require__(929);

var getOwnPropertyDescriptorModule = __webpack_require__(6683);

var definePropertyModule = __webpack_require__(4615);

module.exports = function (target, source, exceptions) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];

    if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {
      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  }
};

/***/ }),

/***/ 57:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(8494);

var definePropertyModule = __webpack_require__(4615);

var createPropertyDescriptor = __webpack_require__(4677);

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

/***/ }),

/***/ 4677:
/***/ ((module) => {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

/***/ }),

/***/ 5999:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var toPropertyKey = __webpack_require__(8734);

var definePropertyModule = __webpack_require__(4615);

var createPropertyDescriptor = __webpack_require__(4677);

module.exports = function (object, key, value) {
  var propertyKey = toPropertyKey(key);
  if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));else object[propertyKey] = value;
};

/***/ }),

/***/ 8494:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(6544); // Detect IE8's incomplete defineProperty implementation


module.exports = !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, {
    get: function get() {
      return 7;
    }
  })[1] != 7;
});

/***/ }),

/***/ 6668:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var isObject = __webpack_require__(794);

var document = global.document; // typeof document.createElement is 'object' in old IE

var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};

/***/ }),

/***/ 6918:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getBuiltIn = __webpack_require__(5897);

module.exports = getBuiltIn('navigator', 'userAgent') || '';

/***/ }),

/***/ 4061:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var userAgent = __webpack_require__(6918);

var process = global.process;
var Deno = global.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.'); // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us

  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
} // BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0


if (!version && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);

  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

module.exports = version;

/***/ }),

/***/ 1305:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var uncurryThis = __webpack_require__(7386);

module.exports = function (CONSTRUCTOR, METHOD) {
  return uncurryThis(global[CONSTRUCTOR].prototype[METHOD]);
};

/***/ }),

/***/ 5690:
/***/ ((module) => {

// IE8- don't enum bug keys
module.exports = ['constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf'];

/***/ }),

/***/ 7263:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var getOwnPropertyDescriptor = (__webpack_require__(6683).f);

var createNonEnumerableProperty = __webpack_require__(57);

var redefine = __webpack_require__(1270);

var setGlobal = __webpack_require__(460);

var copyConstructorProperties = __webpack_require__(3478);

var isForced = __webpack_require__(4451);
/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
  options.name        - the .name of the function if it does not match the key
*/


module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;

  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }

  if (target) for (key in source) {
    sourceProperty = source[key];

    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];

    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced); // contained in target

    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty == typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    } // add a flag to not completely full polyfills


    if (options.sham || targetProperty && targetProperty.sham) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    } // extend global


    redefine(target, key, sourceProperty, options);
  }
};

/***/ }),

/***/ 6544:
/***/ ((module) => {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

/***/ }),

/***/ 1266:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var global = __webpack_require__(7583);

var isArray = __webpack_require__(4521);

var lengthOfArrayLike = __webpack_require__(1825);

var bind = __webpack_require__(2938);

var TypeError = global.TypeError; // `FlattenIntoArray` abstract operation
// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray

var flattenIntoArray = function flattenIntoArray(target, original, source, sourceLen, start, depth, mapper, thisArg) {
  var targetIndex = start;
  var sourceIndex = 0;
  var mapFn = mapper ? bind(mapper, thisArg) : false;
  var element, elementLen;

  while (sourceIndex < sourceLen) {
    if (sourceIndex in source) {
      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

      if (depth > 0 && isArray(element)) {
        elementLen = lengthOfArrayLike(element);
        targetIndex = flattenIntoArray(target, original, element, elementLen, targetIndex, depth - 1) - 1;
      } else {
        if (targetIndex >= 0x1FFFFFFFFFFFFF) throw TypeError('Exceed the acceptable array length');
        target[targetIndex] = element;
      }

      targetIndex++;
    }

    sourceIndex++;
  }

  return targetIndex;
};

module.exports = flattenIntoArray;

/***/ }),

/***/ 2938:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(7386);

var aCallable = __webpack_require__(8257);

var NATIVE_BIND = __webpack_require__(8987);

var bind = uncurryThis(uncurryThis.bind); // optional / simple context binding

module.exports = function (fn, that) {
  aCallable(fn);
  return that === undefined ? fn : NATIVE_BIND ? bind(fn, that) : function
    /* ...args */
  () {
    return fn.apply(that, arguments);
  };
};

/***/ }),

/***/ 8987:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(6544);

module.exports = !fails(function () {
  var test = function () {
    /* empty */
  }.bind(); // eslint-disable-next-line no-prototype-builtins -- safe


  return typeof test != 'function' || test.hasOwnProperty('prototype');
});

/***/ }),

/***/ 8262:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var NATIVE_BIND = __webpack_require__(8987);

var call = Function.prototype.call;
module.exports = NATIVE_BIND ? call.bind(call) : function () {
  return call.apply(call, arguments);
};

/***/ }),

/***/ 4340:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(8494);

var hasOwn = __webpack_require__(2870);

var FunctionPrototype = Function.prototype; // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;
var EXISTS = hasOwn(FunctionPrototype, 'name'); // additional protection from minified / mangled / dropped function names

var PROPER = EXISTS && function something() {
  /* empty */
}.name === 'something';

var CONFIGURABLE = EXISTS && (!DESCRIPTORS || DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable);
module.exports = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};

/***/ }),

/***/ 7386:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var NATIVE_BIND = __webpack_require__(8987);

var FunctionPrototype = Function.prototype;
var bind = FunctionPrototype.bind;
var call = FunctionPrototype.call;
var uncurryThis = NATIVE_BIND && bind.bind(call, call);
module.exports = NATIVE_BIND ? function (fn) {
  return fn && uncurryThis(fn);
} : function (fn) {
  return fn && function () {
    return call.apply(fn, arguments);
  };
};

/***/ }),

/***/ 5897:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var isCallable = __webpack_require__(9212);

var aFunction = function aFunction(argument) {
  return isCallable(argument) ? argument : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(global[namespace]) : global[namespace] && global[namespace][method];
};

/***/ }),

/***/ 8272:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var classof = __webpack_require__(3058);

var getMethod = __webpack_require__(911);

var Iterators = __webpack_require__(339);

var wellKnownSymbol = __webpack_require__(3649);

var ITERATOR = wellKnownSymbol('iterator');

module.exports = function (it) {
  if (it != undefined) return getMethod(it, ITERATOR) || getMethod(it, '@@iterator') || Iterators[classof(it)];
};

/***/ }),

/***/ 6307:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var call = __webpack_require__(8262);

var aCallable = __webpack_require__(8257);

var anObject = __webpack_require__(2569);

var tryToString = __webpack_require__(5637);

var getIteratorMethod = __webpack_require__(8272);

var TypeError = global.TypeError;

module.exports = function (argument, usingIterator) {
  var iteratorMethod = arguments.length < 2 ? getIteratorMethod(argument) : usingIterator;
  if (aCallable(iteratorMethod)) return anObject(call(iteratorMethod, argument));
  throw TypeError(tryToString(argument) + ' is not iterable');
};

/***/ }),

/***/ 911:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var aCallable = __webpack_require__(8257); // `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod


module.exports = function (V, P) {
  var func = V[P];
  return func == null ? undefined : aCallable(func);
};

/***/ }),

/***/ 7583:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var check = function check(it) {
  return it && it.Math == Math && it;
}; // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028


module.exports = // eslint-disable-next-line es/no-global-this -- safe
check(typeof globalThis == 'object' && globalThis) || check(typeof window == 'object' && window) || // eslint-disable-next-line no-restricted-globals -- safe
check(typeof self == 'object' && self) || check(typeof __webpack_require__.g == 'object' && __webpack_require__.g) || // eslint-disable-next-line no-new-func -- fallback
function () {
  return this;
}() || Function('return this')();

/***/ }),

/***/ 2870:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(7386);

var toObject = __webpack_require__(1324);

var hasOwnProperty = uncurryThis({}.hasOwnProperty); // `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty

module.exports = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject(it), key);
};

/***/ }),

/***/ 4639:
/***/ ((module) => {

module.exports = {};

/***/ }),

/***/ 482:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getBuiltIn = __webpack_require__(5897);

module.exports = getBuiltIn('document', 'documentElement');

/***/ }),

/***/ 275:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(8494);

var fails = __webpack_require__(6544);

var createElement = __webpack_require__(6668); // Thanks to IE8 for its funny defineProperty


module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function get() {
      return 7;
    }
  }).a != 7;
});

/***/ }),

/***/ 5044:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var uncurryThis = __webpack_require__(7386);

var fails = __webpack_require__(6544);

var classof = __webpack_require__(9624);

var Object = global.Object;
var split = uncurryThis(''.split); // fallback for non-array-like ES3 and non-enumerable old V8 strings

module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split(it, '') : Object(it);
} : Object;

/***/ }),

/***/ 9734:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(7386);

var isCallable = __webpack_require__(9212);

var store = __webpack_require__(1314);

var functionToString = uncurryThis(Function.toString); // this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper

if (!isCallable(store.inspectSource)) {
  store.inspectSource = function (it) {
    return functionToString(it);
  };
}

module.exports = store.inspectSource;

/***/ }),

/***/ 2743:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var NATIVE_WEAK_MAP = __webpack_require__(9491);

var global = __webpack_require__(7583);

var uncurryThis = __webpack_require__(7386);

var isObject = __webpack_require__(794);

var createNonEnumerableProperty = __webpack_require__(57);

var hasOwn = __webpack_require__(2870);

var shared = __webpack_require__(1314);

var sharedKey = __webpack_require__(9137);

var hiddenKeys = __webpack_require__(4639);

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError = global.TypeError;
var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function enforce(it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function getterFor(TYPE) {
  return function (it) {
    var state;

    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    }

    return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  var wmget = uncurryThis(store.get);
  var wmhas = uncurryThis(store.has);
  var wmset = uncurryThis(store.set);

  set = function set(it, metadata) {
    if (wmhas(store, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    wmset(store, it, metadata);
    return metadata;
  };

  get = function get(it) {
    return wmget(store, it) || {};
  };

  has = function has(it) {
    return wmhas(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;

  set = function set(it, metadata) {
    if (hasOwn(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };

  get = function get(it) {
    return hasOwn(it, STATE) ? it[STATE] : {};
  };

  has = function has(it) {
    return hasOwn(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};

/***/ }),

/***/ 114:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var wellKnownSymbol = __webpack_require__(3649);

var Iterators = __webpack_require__(339);

var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype; // check on default Array iterator

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};

/***/ }),

/***/ 4521:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var classof = __webpack_require__(9624); // `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe


module.exports = Array.isArray || function isArray(argument) {
  return classof(argument) == 'Array';
};

/***/ }),

/***/ 9212:
/***/ ((module) => {

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
module.exports = function (argument) {
  return typeof argument == 'function';
};

/***/ }),

/***/ 2097:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(7386);

var fails = __webpack_require__(6544);

var isCallable = __webpack_require__(9212);

var classof = __webpack_require__(3058);

var getBuiltIn = __webpack_require__(5897);

var inspectSource = __webpack_require__(9734);

var noop = function noop() {
  /* empty */
};

var empty = [];
var construct = getBuiltIn('Reflect', 'construct');
var constructorRegExp = /^\s*(?:class|function)\b/;
var exec = uncurryThis(constructorRegExp.exec);
var INCORRECT_TO_STRING = !constructorRegExp.exec(noop);

var isConstructorModern = function isConstructor(argument) {
  if (!isCallable(argument)) return false;

  try {
    construct(noop, empty, argument);
    return true;
  } catch (error) {
    return false;
  }
};

var isConstructorLegacy = function isConstructor(argument) {
  if (!isCallable(argument)) return false;

  switch (classof(argument)) {
    case 'AsyncFunction':
    case 'GeneratorFunction':
    case 'AsyncGeneratorFunction':
      return false;
  }

  try {
    // we can't check .prototype since constructors produced by .bind haven't it
    // `Function#toString` throws on some built-it function in some legacy engines
    // (for example, `DOMQuad` and similar in FF41-)
    return INCORRECT_TO_STRING || !!exec(constructorRegExp, inspectSource(argument));
  } catch (error) {
    return true;
  }
};

isConstructorLegacy.sham = true; // `IsConstructor` abstract operation
// https://tc39.es/ecma262/#sec-isconstructor

module.exports = !construct || fails(function () {
  var called;
  return isConstructorModern(isConstructorModern.call) || !isConstructorModern(Object) || !isConstructorModern(function () {
    called = true;
  }) || called;
}) ? isConstructorLegacy : isConstructorModern;

/***/ }),

/***/ 4451:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fails = __webpack_require__(6544);

var isCallable = __webpack_require__(9212);

var replacement = /#|\.prototype\./;

var isForced = function isForced(feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true : value == NATIVE ? false : isCallable(detection) ? fails(detection) : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';
module.exports = isForced;

/***/ }),

/***/ 794:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isCallable = __webpack_require__(9212);

module.exports = function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it);
};

/***/ }),

/***/ 6268:
/***/ ((module) => {

module.exports = false;

/***/ }),

/***/ 5871:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var getBuiltIn = __webpack_require__(5897);

var isCallable = __webpack_require__(9212);

var isPrototypeOf = __webpack_require__(2447);

var USE_SYMBOL_AS_UID = __webpack_require__(7786);

var Object = global.Object;
module.exports = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn('Symbol');
  return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, Object(it));
};

/***/ }),

/***/ 4026:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var bind = __webpack_require__(2938);

var call = __webpack_require__(8262);

var anObject = __webpack_require__(2569);

var tryToString = __webpack_require__(5637);

var isArrayIteratorMethod = __webpack_require__(114);

var lengthOfArrayLike = __webpack_require__(1825);

var isPrototypeOf = __webpack_require__(2447);

var getIterator = __webpack_require__(6307);

var getIteratorMethod = __webpack_require__(8272);

var iteratorClose = __webpack_require__(7093);

var TypeError = global.TypeError;

var Result = function Result(stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

var ResultPrototype = Result.prototype;

module.exports = function (iterable, unboundFunction, options) {
  var that = options && options.that;
  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
  var INTERRUPTED = !!(options && options.INTERRUPTED);
  var fn = bind(unboundFunction, that);
  var iterator, iterFn, index, length, result, next, step;

  var stop = function stop(condition) {
    if (iterator) iteratorClose(iterator, 'normal', condition);
    return new Result(true, condition);
  };

  var callFn = function callFn(value) {
    if (AS_ENTRIES) {
      anObject(value);
      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
    }

    return INTERRUPTED ? fn(value, stop) : fn(value);
  };

  if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod(iterable);
    if (!iterFn) throw TypeError(tryToString(iterable) + ' is not iterable'); // optimisation for array iterators

    if (isArrayIteratorMethod(iterFn)) {
      for (index = 0, length = lengthOfArrayLike(iterable); length > index; index++) {
        result = callFn(iterable[index]);
        if (result && isPrototypeOf(ResultPrototype, result)) return result;
      }

      return new Result(false);
    }

    iterator = getIterator(iterable, iterFn);
  }

  next = iterator.next;

  while (!(step = call(next, iterator)).done) {
    try {
      result = callFn(step.value);
    } catch (error) {
      iteratorClose(iterator, 'throw', error);
    }

    if (typeof result == 'object' && result && isPrototypeOf(ResultPrototype, result)) return result;
  }

  return new Result(false);
};

/***/ }),

/***/ 7093:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var call = __webpack_require__(8262);

var anObject = __webpack_require__(2569);

var getMethod = __webpack_require__(911);

module.exports = function (iterator, kind, value) {
  var innerResult, innerError;
  anObject(iterator);

  try {
    innerResult = getMethod(iterator, 'return');

    if (!innerResult) {
      if (kind === 'throw') throw value;
      return value;
    }

    innerResult = call(innerResult, iterator);
  } catch (error) {
    innerError = true;
    innerResult = error;
  }

  if (kind === 'throw') throw value;
  if (innerError) throw innerResult;
  anObject(innerResult);
  return value;
};

/***/ }),

/***/ 339:
/***/ ((module) => {

module.exports = {};

/***/ }),

/***/ 1825:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toLength = __webpack_require__(97); // `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike


module.exports = function (obj) {
  return toLength(obj.length);
};

/***/ }),

/***/ 8640:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION = __webpack_require__(4061);

var fails = __webpack_require__(6544); // eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing


module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  var symbol = Symbol(); // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances

  return !String(symbol) || !(Object(symbol) instanceof Symbol) || // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
  !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});

/***/ }),

/***/ 9491:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var isCallable = __webpack_require__(9212);

var inspectSource = __webpack_require__(9734);

var WeakMap = global.WeakMap;
module.exports = isCallable(WeakMap) && /native code/.test(inspectSource(WeakMap));

/***/ }),

/***/ 3590:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* global ActiveXObject -- old IE, WSH */
var anObject = __webpack_require__(2569);

var definePropertiesModule = __webpack_require__(8728);

var enumBugKeys = __webpack_require__(5690);

var hiddenKeys = __webpack_require__(4639);

var html = __webpack_require__(482);

var documentCreateElement = __webpack_require__(6668);

var sharedKey = __webpack_require__(9137);

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function EmptyConstructor() {
  /* empty */
};

var scriptTag = function scriptTag(content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
}; // Create object with fake `null` prototype: use ActiveX Object with cleared prototype


var NullProtoObjectViaActiveX = function NullProtoObjectViaActiveX(activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak

  return temp;
}; // Create object with fake `null` prototype: use iframe Object with cleared prototype


var NullProtoObjectViaIFrame = function NullProtoObjectViaIFrame() {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe); // https://github.com/zloirock/core-js/issues/475

  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
}; // Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug


var activeXDocument;

var _NullProtoObject = function NullProtoObject() {
  try {
    activeXDocument = new ActiveXObject('htmlfile');
  } catch (error) {
    /* ignore */
  }

  _NullProtoObject = typeof document != 'undefined' ? document.domain && activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) // old IE
  : NullProtoObjectViaIFrame() : NullProtoObjectViaActiveX(activeXDocument); // WSH

  var length = enumBugKeys.length;

  while (length--) {
    delete _NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  }

  return _NullProtoObject();
};

hiddenKeys[IE_PROTO] = true; // `Object.create` method
// https://tc39.es/ecma262/#sec-object.create

module.exports = Object.create || function create(O, Properties) {
  var result;

  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null; // add "__proto__" for Object.getPrototypeOf polyfill

    result[IE_PROTO] = O;
  } else result = _NullProtoObject();

  return Properties === undefined ? result : definePropertiesModule.f(result, Properties);
};

/***/ }),

/***/ 8728:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(8494);

var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(7670);

var definePropertyModule = __webpack_require__(4615);

var anObject = __webpack_require__(2569);

var toIndexedObject = __webpack_require__(2977);

var objectKeys = __webpack_require__(5432); // `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe


exports.f = DESCRIPTORS && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var props = toIndexedObject(Properties);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;

  while (length > index) {
    definePropertyModule.f(O, key = keys[index++], props[key]);
  }

  return O;
};

/***/ }),

/***/ 4615:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var DESCRIPTORS = __webpack_require__(8494);

var IE8_DOM_DEFINE = __webpack_require__(275);

var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(7670);

var anObject = __webpack_require__(2569);

var toPropertyKey = __webpack_require__(8734);

var TypeError = global.TypeError; // eslint-disable-next-line es/no-object-defineproperty -- safe

var $defineProperty = Object.defineProperty; // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = 'enumerable';
var CONFIGURABLE = 'configurable';
var WRITABLE = 'writable'; // `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty

exports.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);

  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor(O, P);

    if (current && current[WRITABLE]) {
      O[P] = Attributes.value;
      Attributes = {
        configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
        writable: false
      };
    }
  }

  return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) {
    /* empty */
  }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

/***/ }),

/***/ 6683:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(8494);

var call = __webpack_require__(8262);

var propertyIsEnumerableModule = __webpack_require__(112);

var createPropertyDescriptor = __webpack_require__(4677);

var toIndexedObject = __webpack_require__(2977);

var toPropertyKey = __webpack_require__(8734);

var hasOwn = __webpack_require__(2870);

var IE8_DOM_DEFINE = __webpack_require__(275); // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe


var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; // `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor

exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPropertyKey(P);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) {
    /* empty */
  }
  if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
};

/***/ }),

/***/ 9275:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var internalObjectKeys = __webpack_require__(8356);

var enumBugKeys = __webpack_require__(5690);

var hiddenKeys = enumBugKeys.concat('length', 'prototype'); // `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};

/***/ }),

/***/ 4012:
/***/ ((__unused_webpack_module, exports) => {

// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;

/***/ }),

/***/ 2447:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(7386);

module.exports = uncurryThis({}.isPrototypeOf);

/***/ }),

/***/ 8356:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(7386);

var hasOwn = __webpack_require__(2870);

var toIndexedObject = __webpack_require__(2977);

var indexOf = (__webpack_require__(5766).indexOf);

var hiddenKeys = __webpack_require__(4639);

var push = uncurryThis([].push);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;

  for (key in O) {
    !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
  } // Don't enum bug & hidden keys


  while (names.length > i) {
    if (hasOwn(O, key = names[i++])) {
      ~indexOf(result, key) || push(result, key);
    }
  }

  return result;
};

/***/ }),

/***/ 5432:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var internalObjectKeys = __webpack_require__(8356);

var enumBugKeys = __webpack_require__(5690); // `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es/no-object-keys -- safe


module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};

/***/ }),

/***/ 112:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


var $propertyIsEnumerable = {}.propertyIsEnumerable; // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; // Nashorn ~ JDK8 bug

var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({
  1: 2
}, 1); // `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable

exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;

/***/ }),

/***/ 9953:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(8494);

var uncurryThis = __webpack_require__(7386);

var objectKeys = __webpack_require__(5432);

var toIndexedObject = __webpack_require__(2977);

var $propertyIsEnumerable = (__webpack_require__(112).f);

var propertyIsEnumerable = uncurryThis($propertyIsEnumerable);
var push = uncurryThis([].push); // `Object.{ entries, values }` methods implementation

var createMethod = function createMethod(TO_ENTRIES) {
  return function (it) {
    var O = toIndexedObject(it);
    var keys = objectKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;

    while (length > i) {
      key = keys[i++];

      if (!DESCRIPTORS || propertyIsEnumerable(O, key)) {
        push(result, TO_ENTRIES ? [key, O[key]] : O[key]);
      }
    }

    return result;
  };
};

module.exports = {
  // `Object.entries` method
  // https://tc39.es/ecma262/#sec-object.entries
  entries: createMethod(true),
  // `Object.values` method
  // https://tc39.es/ecma262/#sec-object.values
  values: createMethod(false)
};

/***/ }),

/***/ 6252:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var call = __webpack_require__(8262);

var isCallable = __webpack_require__(9212);

var isObject = __webpack_require__(794);

var TypeError = global.TypeError; // `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive

module.exports = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;
  if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ }),

/***/ 929:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getBuiltIn = __webpack_require__(5897);

var uncurryThis = __webpack_require__(7386);

var getOwnPropertyNamesModule = __webpack_require__(9275);

var getOwnPropertySymbolsModule = __webpack_require__(4012);

var anObject = __webpack_require__(2569);

var concat = uncurryThis([].concat); // all object keys, includes non-enumerable and symbols

module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
};

/***/ }),

/***/ 1270:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var isCallable = __webpack_require__(9212);

var hasOwn = __webpack_require__(2870);

var createNonEnumerableProperty = __webpack_require__(57);

var setGlobal = __webpack_require__(460);

var inspectSource = __webpack_require__(9734);

var InternalStateModule = __webpack_require__(2743);

var CONFIGURABLE_FUNCTION_NAME = (__webpack_require__(4340).CONFIGURABLE);

var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(String).split('String');
(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  var name = options && options.name !== undefined ? options.name : key;
  var state;

  if (isCallable(value)) {
    if (String(name).slice(0, 7) === 'Symbol(') {
      name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
    }

    if (!hasOwn(value, 'name') || CONFIGURABLE_FUNCTION_NAME && value.name !== name) {
      createNonEnumerableProperty(value, 'name', name);
    }

    state = enforceInternalState(value);

    if (!state.source) {
      state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
    }
  }

  if (O === global) {
    if (simple) O[key] = value;else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }

  if (simple) O[key] = value;else createNonEnumerableProperty(O, key, value); // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return isCallable(this) && getInternalState(this).source || inspectSource(this);
});

/***/ }),

/***/ 3955:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var TypeError = global.TypeError; // `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible

module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};

/***/ }),

/***/ 460:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583); // eslint-disable-next-line es/no-object-defineproperty -- safe


var defineProperty = Object.defineProperty;

module.exports = function (key, value) {
  try {
    defineProperty(global, key, {
      value: value,
      configurable: true,
      writable: true
    });
  } catch (error) {
    global[key] = value;
  }

  return value;
};

/***/ }),

/***/ 9137:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var shared = __webpack_require__(7836);

var uid = __webpack_require__(8284);

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};

/***/ }),

/***/ 1314:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var setGlobal = __webpack_require__(460);

var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});
module.exports = store;

/***/ }),

/***/ 7836:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var IS_PURE = __webpack_require__(6268);

var store = __webpack_require__(1314);

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.21.1',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2014-2022 Denis Pushkarev (zloirock.ru)',
  license: 'https://github.com/zloirock/core-js/blob/v3.21.1/LICENSE',
  source: 'https://github.com/zloirock/core-js'
});

/***/ }),

/***/ 6782:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toIntegerOrInfinity = __webpack_require__(7486);

var max = Math.max;
var min = Math.min; // Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).

module.exports = function (index, length) {
  var integer = toIntegerOrInfinity(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};

/***/ }),

/***/ 2977:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(5044);

var requireObjectCoercible = __webpack_require__(3955);

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};

/***/ }),

/***/ 7486:
/***/ ((module) => {

var ceil = Math.ceil;
var floor = Math.floor; // `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity

module.exports = function (argument) {
  var number = +argument; // eslint-disable-next-line no-self-compare -- safe

  return number !== number || number === 0 ? 0 : (number > 0 ? floor : ceil)(number);
};

/***/ }),

/***/ 97:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toIntegerOrInfinity = __webpack_require__(7486);

var min = Math.min; // `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength

module.exports = function (argument) {
  return argument > 0 ? min(toIntegerOrInfinity(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

/***/ }),

/***/ 1324:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var requireObjectCoercible = __webpack_require__(3955);

var Object = global.Object; // `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject

module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};

/***/ }),

/***/ 2670:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var call = __webpack_require__(8262);

var isObject = __webpack_require__(794);

var isSymbol = __webpack_require__(5871);

var getMethod = __webpack_require__(911);

var ordinaryToPrimitive = __webpack_require__(6252);

var wellKnownSymbol = __webpack_require__(3649);

var TypeError = global.TypeError;
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive'); // `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive

module.exports = function (input, pref) {
  if (!isObject(input) || isSymbol(input)) return input;
  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  var result;

  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call(exoticToPrim, input, pref);
    if (!isObject(result) || isSymbol(result)) return result;
    throw TypeError("Can't convert object to primitive value");
  }

  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};

/***/ }),

/***/ 8734:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toPrimitive = __webpack_require__(2670);

var isSymbol = __webpack_require__(5871); // `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey


module.exports = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : key + '';
};

/***/ }),

/***/ 8191:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var wellKnownSymbol = __webpack_require__(3649);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};
test[TO_STRING_TAG] = 'z';
module.exports = String(test) === '[object z]';

/***/ }),

/***/ 5637:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var String = global.String;

module.exports = function (argument) {
  try {
    return String(argument);
  } catch (error) {
    return 'Object';
  }
};

/***/ }),

/***/ 8284:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var uncurryThis = __webpack_require__(7386);

var id = 0;
var postfix = Math.random();
var toString = uncurryThis(1.0.toString);

module.exports = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
};

/***/ }),

/***/ 7786:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL = __webpack_require__(8640);

module.exports = NATIVE_SYMBOL && !Symbol.sham && typeof Symbol.iterator == 'symbol';

/***/ }),

/***/ 7670:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var DESCRIPTORS = __webpack_require__(8494);

var fails = __webpack_require__(6544); // V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334


module.exports = DESCRIPTORS && fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(function () {
    /* empty */
  }, 'prototype', {
    value: 42,
    writable: false
  }).prototype != 42;
});

/***/ }),

/***/ 3649:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(7583);

var shared = __webpack_require__(7836);

var hasOwn = __webpack_require__(2870);

var uid = __webpack_require__(8284);

var NATIVE_SYMBOL = __webpack_require__(8640);

var USE_SYMBOL_AS_UID = __webpack_require__(7786);

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var symbolFor = Symbol && Symbol['for'];
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!hasOwn(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
    var description = 'Symbol.' + name;

    if (NATIVE_SYMBOL && hasOwn(Symbol, name)) {
      WellKnownSymbolsStore[name] = Symbol[name];
    } else if (USE_SYMBOL_AS_UID && symbolFor) {
      WellKnownSymbolsStore[name] = symbolFor(description);
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
    }
  }

  return WellKnownSymbolsStore[name];
};

/***/ }),

/***/ 9390:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var $ = __webpack_require__(7263);

var flattenIntoArray = __webpack_require__(1266);

var toObject = __webpack_require__(1324);

var lengthOfArrayLike = __webpack_require__(1825);

var toIntegerOrInfinity = __webpack_require__(7486);

var arraySpeciesCreate = __webpack_require__(4822); // `Array.prototype.flat` method
// https://tc39.es/ecma262/#sec-array.prototype.flat


$({
  target: 'Array',
  proto: true
}, {
  flat: function
    /* depthArg = 1 */
  flat() {
    var depthArg = arguments.length ? arguments[0] : undefined;
    var O = toObject(this);
    var sourceLen = lengthOfArrayLike(O);
    var A = arraySpeciesCreate(O, 0);
    A.length = flattenIntoArray(A, O, O, sourceLen, 0, depthArg === undefined ? 1 : toIntegerOrInfinity(depthArg));
    return A;
  }
});

/***/ }),

/***/ 5892:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// this method was added to unscopables after implementation
// in popular engines, so it's moved to a separate module
var addToUnscopables = __webpack_require__(6288); // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables


addToUnscopables('flat');

/***/ }),

/***/ 6737:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $ = __webpack_require__(7263);

var $entries = (__webpack_require__(9953).entries); // `Object.entries` method
// https://tc39.es/ecma262/#sec-object.entries


$({
  target: 'Object',
  stat: true
}, {
  entries: function entries(O) {
    return $entries(O);
  }
});

/***/ }),

/***/ 5809:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $ = __webpack_require__(7263);

var iterate = __webpack_require__(4026);

var createProperty = __webpack_require__(5999); // `Object.fromEntries` method
// https://github.com/tc39/proposal-object-from-entries


$({
  target: 'Object',
  stat: true
}, {
  fromEntries: function fromEntries(iterable) {
    var obj = {};
    iterate(iterable, function (k, v) {
      createProperty(obj, k, v);
    }, {
      AS_ENTRIES: true
    });
    return obj;
  }
});

/***/ }),

/***/ 7981:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var parent = __webpack_require__(2529);

module.exports = parent;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "main": () => (/* binding */ main),
  "testDone": () => (/* binding */ testDone),
  "withMacro": () => (/* binding */ withMacro)
});

;// CONCATENATED MODULE: external "kolmafia"
const external_kolmafia_namespaceObject = require("kolmafia");
;// CONCATENATED MODULE: ./node_modules/libram/dist/template-string.js


var concatTemplateString = function concatTemplateString(literals) {
  for (var _len = arguments.length, placeholders = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    placeholders[_key - 1] = arguments[_key];
  }

  return literals.reduce((acc, literal, i) => acc + literal + (placeholders[i] || ""), "");
};

var createSingleConstant = Type => function (literals) {
  for (var _len2 = arguments.length, placeholders = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    placeholders[_key2 - 1] = arguments[_key2];
  }

  var input = concatTemplateString.apply(void 0, [literals].concat(placeholders));
  return Type.get(input);
};

var createPluralConstant = Type => function (literals) {
  for (var _len3 = arguments.length, placeholders = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    placeholders[_key3 - 1] = arguments[_key3];
  }

  var input = concatTemplateString.apply(void 0, [literals].concat(placeholders));

  if (input === "") {
    return Type.all();
  }

  return Type.get(input.split(/\s*,\s*/));
};
/**
 * A Bounty specified by name.
 *
 * @category In-game constant
 */


var $bounty = createSingleConstant(external_kolmafia_namespaceObject.Bounty);
/**
 * A list of Bounties specified by a comma-separated list of names.
 * For a list of all possible Bounties, leave the template string blank.
 *
 * @category In-game constant
 */

var $bounties = createPluralConstant(external_kolmafia_namespaceObject.Bounty);
/**
 * A Class specified by name.
 *
 * @category In-game constant
 */

var template_string_$class = createSingleConstant(external_kolmafia_namespaceObject.Class);
/**
 * A list of Classes specified by a comma-separated list of names.
 * For a list of all possible Classes, leave the template string blank.
 *
 * @category In-game constant
 */

var $classes = createPluralConstant(external_kolmafia_namespaceObject.Class);
/**
 * A Coinmaster specified by name.
 *
 * @category In-game constant
 */

var $coinmaster = createSingleConstant(external_kolmafia_namespaceObject.Coinmaster);
/**
 * A list of Coinmasters specified by a comma-separated list of names.
 * For a list of all possible Coinmasters, leave the template string blank.
 *
 * @category In-game constant
 */

var $coinmasters = createPluralConstant(external_kolmafia_namespaceObject.Coinmaster);
/**
 * An Effect specified by name.
 *
 * @category In-game constant
 */

var $effect = createSingleConstant(external_kolmafia_namespaceObject.Effect);
/**
 * A list of Effects specified by a comma-separated list of names.
 * For a list of all possible Effects, leave the template string blank.
 *
 * @category In-game constant
 */

var $effects = createPluralConstant(external_kolmafia_namespaceObject.Effect);
/**
 * An Element specified by name.
 *
 * @category In-game constant
 */

var $element = createSingleConstant(external_kolmafia_namespaceObject.Element);
/**
 * A list of Elements specified by a comma-separated list of names.
 * For a list of all possible Elements, leave the template string blank.
 *
 * @category In-game constant
 */

var $elements = createPluralConstant(external_kolmafia_namespaceObject.Element);
/**
 * A Familiar specified by name.
 *
 * @category In-game constant
 */

var template_string_$familiar = createSingleConstant(external_kolmafia_namespaceObject.Familiar);
/**
 * A list of Familiars specified by a comma-separated list of names.
 * For a list of all possible Familiars, leave the template string blank.
 *
 * @category In-game constant
 */

var $familiars = createPluralConstant(external_kolmafia_namespaceObject.Familiar);
/**
 * An Item specified by name.
 *
 * @category In-game constant
 */

var template_string_$item = createSingleConstant(external_kolmafia_namespaceObject.Item);
/**
 * A list of Items specified by a comma-separated list of names.
 * For a list of all possible Items, leave the template string blank.
 *
 * @category In-game constant
 */

var template_string_$items = createPluralConstant(external_kolmafia_namespaceObject.Item);
/**
 * A Location specified by name.
 *
 * @category In-game constant
 */

var template_string_$location = createSingleConstant(external_kolmafia_namespaceObject.Location);
/**
 * A list of Locations specified by a comma-separated list of names.
 * For a list of all possible Locations, leave the template string blank.
 *
 * @category In-game constant
 */

var $locations = createPluralConstant(external_kolmafia_namespaceObject.Location);
/**
 * A Monster specified by name.
 *
 * @category In-game constant
 */

var $monster = createSingleConstant(external_kolmafia_namespaceObject.Monster);
/**
 * A list of Monsters specified by a comma-separated list of names.
 * For a list of all possible Monsters, leave the template string blank.
 *
 * @category In-game constant
 */

var $monsters = createPluralConstant(external_kolmafia_namespaceObject.Monster);
/**
 * A Phylum specified by name.
 *
 * @category In-game constant
 */

var $phylum = createSingleConstant(external_kolmafia_namespaceObject.Phylum);
/**
 * A list of Phyla specified by a comma-separated list of names.
 * For a list of all possible Phyla, leave the template string blank.
 *
 * @category In-game constant
 */

var $phyla = createPluralConstant(external_kolmafia_namespaceObject.Phylum);
/**
 * A Servant specified by name.
 *
 * @category In-game constant
 */

var $servant = createSingleConstant(external_kolmafia_namespaceObject.Servant);
/**
 * A list of Servants specified by a comma-separated list of names.
 * For a list of all possible Servants, leave the template string blank.
 *
 * @category In-game constant
 */

var $servants = createPluralConstant(external_kolmafia_namespaceObject.Servant);
/**
 * A Skill specified by name.
 *
 * @category In-game constant
 */

var template_string_$skill = createSingleConstant(external_kolmafia_namespaceObject.Skill);
/**
 * A list of Skills specified by a comma-separated list of names.
 * For a list of all possible Skills, leave the template string blank.
 *
 * @category In-game constant
 */

var $skills = createPluralConstant(external_kolmafia_namespaceObject.Skill);
/**
 * A Slot specified by name.
 *
 * @category In-game constant
 */

var $slot = createSingleConstant(external_kolmafia_namespaceObject.Slot);
/**
 * A list of Slots specified by a comma-separated list of names.
 * For a list of all possible Slots, leave the template string blank.
 *
 * @category In-game constant
 */

var $slots = createPluralConstant(external_kolmafia_namespaceObject.Slot);
/**
 * A Stat specified by name.
 *
 * @category In-game constant
 */

var $stat = createSingleConstant(external_kolmafia_namespaceObject.Stat);
/**
 * A list of Stats specified by a comma-separated list of names.
 * For a list of all possible Stats, leave the template string blank.
 *
 * @category In-game constant
 */

var $stats = createPluralConstant(external_kolmafia_namespaceObject.Stat);
/**
 * A Thrall specified by name.
 *
 * @category In-game constant
 */

var $thrall = createSingleConstant(external_kolmafia_namespaceObject.Thrall);
/**
 * A list of Thralls specified by a comma-separated list of names.
 * For a list of all possible Thralls, leave the template string blank.
 *
 * @category In-game constant
 */

var $thralls = createPluralConstant(external_kolmafia_namespaceObject.Thrall);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.entries.js
var es_object_entries = __webpack_require__(6737);
// EXTERNAL MODULE: ./node_modules/core-js/features/array/flat.js
var flat = __webpack_require__(1755);
;// CONCATENATED MODULE: ./node_modules/libram/dist/lib.js
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11;

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

/** @module GeneralLibrary */






/**
 * Returns the current maximum Accordion Thief songs the player can have in their head
 *
 * @category General
 */

function getSongLimit() {
  return 3 + (booleanModifier("Four Songs") ? 1 : 0) + numericModifier("Additional Song");
}
/**
 * Return whether the Skill or Effect provided is an Accordion Thief song
 *
 * @category General
 * @param skillOrEffect The Skill or Effect
 */

function isSong(skillOrEffect) {
  if (skillOrEffect instanceof Effect && skillOrEffect.attributes.includes("song")) {
    return true;
  } else {
    var skill = skillOrEffect instanceof Effect ? toSkill(skillOrEffect) : skillOrEffect;
    return skill.class === $class(_templateObject || (_templateObject = _taggedTemplateLiteral(["Accordion Thief"]))) && skill.buff;
  }
}
/**
 * List all active Effects
 *
 * @category General
 */

function getActiveEffects() {
  return Object.keys(myEffects()).map(e => Effect.get(e));
}
/**
 * List currently active Accordion Thief songs
 *
 * @category General
 */

function getActiveSongs() {
  return getActiveEffects().filter(isSong);
}
/**
 * List number of active Accordion Thief songs
 *
 * @category General
 */

function getSongCount() {
  return getActiveSongs().length;
}
/**
 * Returns true if the player can remember another Accordion Thief song
 *
 * @category General
 * @param quantity Number of songs to test the space for
 */

function canRememberSong() {
  var quantity = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  return getSongLimit() - getSongCount() >= quantity;
}
/**
 * Return the locations in which the given monster can be encountered naturally
 *
 * @category General
 * @param monster Monster to find
 */

function getMonsterLocations(monster) {
  return Location.all().filter(location => monster.name in appearanceRates(location));
}
/**
 * Return the player's remaining liver space
 *
 * @category General
 */

function getRemainingLiver() {
  return inebrietyLimit() - myInebriety();
}
/**
 * Return the player's remaining stomach space
 *
 * @category General
 */

function getRemainingStomach() {
  return fullnessLimit() - myFullness();
}
/**
 * Return the player's remaining spleen space
 *
 * @category General
 */

function getRemainingSpleen() {
  return spleenLimit() - mySpleenUse();
}
/**
 * Return whether the player "has" any entity which one could feasibly "have".
 *
 * @category General
 * @param thing Thing to check
 * @param quantity Number to check that the player has
 */

function lib_have(thing) {
  var quantity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  if (thing instanceof external_kolmafia_namespaceObject.Effect) {
    return (0,external_kolmafia_namespaceObject.haveEffect)(thing) >= quantity;
  }

  if (thing instanceof external_kolmafia_namespaceObject.Familiar) {
    return (0,external_kolmafia_namespaceObject.haveFamiliar)(thing);
  }

  if (thing instanceof external_kolmafia_namespaceObject.Item) {
    return (0,external_kolmafia_namespaceObject.availableAmount)(thing) >= quantity;
  }

  if (thing instanceof external_kolmafia_namespaceObject.Servant) {
    return (0,external_kolmafia_namespaceObject.haveServant)(thing);
  }

  if (thing instanceof external_kolmafia_namespaceObject.Skill) {
    return (0,external_kolmafia_namespaceObject.haveSkill)(thing);
  }

  if (thing instanceof external_kolmafia_namespaceObject.Thrall) {
    var thrall = (0,external_kolmafia_namespaceObject.myThrall)();
    return thrall.id === thing.id && thrall.level >= quantity;
  }

  return false;
}
/**
 * Return whether an item is in the player's campground
 *
 * @category General
 * @param item The item mafia uses to represent the campground item
 */

function lib_haveInCampground(item) {
  return Object.keys(getCampground()).map(i => Item.get(i)).includes(item);
}
var Wanderer;

(function (Wanderer) {
  Wanderer["Digitize"] = "Digitize Monster";
  Wanderer["Enamorang"] = "Enamorang Monster";
  Wanderer["Familiar"] = "Familiar";
  Wanderer["Holiday"] = "Holiday Monster";
  Wanderer["Kramco"] = "Kramco";
  Wanderer["Nemesis"] = "Nemesis Assassin";
  Wanderer["Portscan"] = "portscan.edu";
  Wanderer["Romantic"] = "Romantic Monster";
  Wanderer["Vote"] = "Vote Monster";
})(Wanderer || (Wanderer = {}));

var deterministicWanderers = [Wanderer.Digitize, Wanderer.Portscan];
/**
 * Return whether the player has the queried counter
 *
 * @category General
 */

function haveCounter(counterName) {
  var minTurns = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var maxTurns = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 500;
  return getCounters(counterName, minTurns, maxTurns) === counterName;
}
/**
 * Return whether the player has the queried wandering counter
 *
 * @category Wanderers
 */

function haveWandererCounter(wanderer) {
  if (deterministicWanderers.includes(wanderer)) {
    return haveCounter(wanderer);
  }

  var begin = wanderer + " window begin";
  var end = wanderer + " window end";
  return haveCounter(begin) || haveCounter(end);
}
/**
 * Returns whether the player will encounter a vote wanderer on the next turn,
 * providing an "I Voted!" sticker is equipped.
 *
 * @category Wanderers
 */

function isVoteWandererNow() {
  return totalTurnsPlayed() % 11 == 1;
}
/**
 * Tells us whether we can expect a given wanderer now. Behaves differently
 * for different types of wanderer.
 *
 * - For deterministic wanderers, return whether the player will encounter
 *   the queried wanderer on the next turn
 *
 * - For variable wanderers (window), return whether the player is within
 *   an encounter window for the queried wanderer
 *
 * - For variable wanderers (chance per turn), returns true unless the player
 *   has exhausted the number of wanderers possible
 *
 * @category Wanderers
 * @param wanderer Wanderer to check
 */

function isWandererNow(wanderer) {
  if (deterministicWanderers.includes(wanderer)) {
    return haveCounter(wanderer, 0, 0);
  }

  if (wanderer == Wanderer.Kramco) {
    return true;
  }

  if (wanderer === Wanderer.Vote) {
    return isVoteWandererNow();
  }

  if (wanderer === Wanderer.Familiar) {
    return get("_hipsterAdv") < 7;
  }

  var begin = wanderer + " window begin";
  var end = wanderer + " window end";
  return !haveCounter(begin, 1) && haveCounter(end);
}
/**
 * Returns the float chance the player will encounter a sausage goblin on the
 * next turn, providing the Kramco Sausage-o-Matic is equipped.
 *
 * @category Wanderers
 */

function getKramcoWandererChance() {
  var fights = get("_sausageFights");
  var lastFight = get("_lastSausageMonsterTurn");
  var totalTurns = totalTurnsPlayed();

  if (fights < 1) {
    return lastFight === totalTurns && myTurncount() < 1 ? 0.5 : 1.0;
  }

  var turnsSinceLastFight = totalTurns - lastFight;
  return Math.min(1.0, (turnsSinceLastFight + 1) / (5 + fights * 3 + Math.pow(Math.max(0, fights - 5), 3)));
}
/**
 * Returns the float chance the player will encounter an Artistic Goth Kid or
 * Mini-Hipster wanderer on the next turn, providing a familiar is equipped.
 *
 * NOTE: You must complete one combat with the Artistic Goth Kid before you
 * can encounter any wanderers. Consequently,ƒ the first combat with the
 * Artist Goth Kid is effectively 0% chance to encounter a wanderer.
 *
 * @category Wanderers
 */

function getFamiliarWandererChance() {
  var totalFights = get("_hipsterAdv");
  var probability = [0.5, 0.4, 0.3, 0.2];

  if (totalFights < 4) {
    return probability[totalFights];
  }

  return totalFights > 7 ? 0.0 : 0.1;
}
/**
 * Returns the float chance the player will encounter the queried wanderer
 * on the next turn.
 *
 * @category Wanderers
 * @param wanderer Wanderer to check
 */

function getWandererChance(wanderer) {
  if (deterministicWanderers.includes(wanderer)) {
    return haveCounter(wanderer, 0, 0) ? 1.0 : 0.0;
  }

  if (wanderer === Wanderer.Kramco) {
    getKramcoWandererChance();
  }

  if (wanderer === Wanderer.Vote) {
    return isVoteWandererNow() ? 1.0 : 0.0;
  }

  if (wanderer === Wanderer.Familiar) {
    getFamiliarWandererChance();
  }

  var begin = wanderer + " window begin";
  var end = wanderer + " window end";

  if (haveCounter(begin, 1, 100)) {
    return 0.0;
  }

  var counters = get("relayCounters");
  var re = new RegExp("(\\d+):" + end);
  var matches = counters.match(re);

  if (matches && matches.length === 2) {
    var window = Number.parseInt(matches[1]) - myTurncount();
    return 1.0 / window;
  }

  return 0.0;
}
/**
 * Returns true if the player's current familiar is equal to the one supplied
 *
 * @category General
 * @param familiar Familiar to check
 */

function isCurrentFamiliar(familiar) {
  return myFamiliar() === familiar;
}
/**
 * Returns the fold group (if any) of which the given item is a part
 *
 * @category General
 * @param item Item that is part of the required fold group
 */

function getFoldGroup(item) {
  return Object.entries(getRelated(item, "fold")).sort((_ref, _ref2) => {
    var _ref3 = _slicedToArray(_ref, 2),
        a = _ref3[1];

    var _ref4 = _slicedToArray(_ref2, 2),
        b = _ref4[1];

    return a - b;
  }).map(_ref5 => {
    var _ref6 = _slicedToArray(_ref5, 1),
        i = _ref6[0];

    return Item.get(i);
  });
}
/**
 * Returns the zap group (if any) of which the given item is a part
 *
 * @category General
 * @param item Item that is part of the required zap group
 */

function getZapGroup(item) {
  return Object.keys(getRelated(item, "zap")).map(i => Item.get(i));
}
/**
 * Get a map of banished monsters keyed by what banished them
 *
 * @category General
 */

function getBanishedMonsters() {
  var banishes = chunk(get("banishedMonsters").split(":"), 3);
  var result = new Map();

  var _iterator = _createForOfIteratorHelper(banishes),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _step$value = _slicedToArray(_step.value, 2),
          foe = _step$value[0],
          banisher = _step$value[1];

      if (foe === undefined || banisher === undefined) break; // toItem doesn"t error if the item doesn"t exist, so we have to use that.

      var banisherItem = toItem(banisher);
      var banisherObject = [Item.get("none"), null].includes(banisherItem) ? Skill.get(banisher) : banisherItem;
      result.set(banisherObject, Monster.get(foe));
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return result;
}
/**
 * Returns true if the item is usable
 *
 * This function will be an ongoing work in progress
 *
 * @param item Item to check
 */

function canUse(item) {
  var path = myPath();

  if (path !== "Nuclear Autumn") {
    if ($items(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["Shrieking Weasel holo-record, Power-Guy 2000 holo-record, Lucky Strikes holo-record, EMD holo-record, Superdrifter holo-record, The Pigs holo-record, Drunk Uncles holo-record"]))).includes(item)) {
      return false;
    }
  }

  if (path === "G-Lover") {
    if (!item.name.toLowerCase().includes("g")) return false;
  }

  if (path === "Bees Hate You") {
    if (item.name.toLowerCase().includes("b")) return false;
  }

  return true;
}
/**
 * Turn KoLmafia `none`s to JavaScript `null`s
 *
 * @param thing Thing that can have a mafia "none" value
 */

function noneToNull(thing) {
  if (thing instanceof Effect) {
    return thing === Effect.get("none") ? null : thing;
  }

  if (thing instanceof Familiar) {
    return thing === Familiar.get("none") ? null : thing;
  }

  if (thing instanceof Item) {
    return thing === Item.get("none") ? null : thing;
  }

  return thing;
}
/**
 * Return the average value from the sort of range that KoLmafia encodes as a string
 *
 * @param range KoLmafia-style range string
 */

function getAverage(range) {
  var _range$match;

  if (range.indexOf("-") < 0) return Number(range);

  var _ref7 = (_range$match = range.match(/(-?[0-9]+)-(-?[0-9]+)/)) !== null && _range$match !== void 0 ? _range$match : ["0", "0", "0"],
      _ref8 = _slicedToArray(_ref7, 3),
      lower = _ref8[1],
      upper = _ref8[2];

  return (Number(lower) + Number(upper)) / 2;
}
/**
 * Return average adventures expected from consuming an item
 *
 * If item is not a consumable, will just return "0".
 *
 * @param item Consumable item
 */

function getAverageAdventures(item) {
  return getAverage(item.adventures);
}
/**
 * Remove an effect
 *
 * @category General
 * @param effect Effect to remove
 */

function uneffect(effect) {
  return cliExecute("uneffect ".concat(effect.name));
}
/**
 * Get both the name and id of a player from either their name or id
 *
 * @param idOrName Id or name of player
 * @returns Object containing id and name of player
 */

function getPlayerFromIdOrName(idOrName) {
  var id = typeof idOrName === "number" ? idOrName : parseInt(getPlayerId(idOrName));
  return {
    name: getPlayerName(id),
    id: id
  };
}
/**
 * Return the step as a number for a given quest property.
 *
 * @param questName Name of quest property to check.
 */

function questStep(questName) {
  var stringStep = get(questName);
  if (stringStep === "unstarted") return -1;else if (stringStep === "started") return 0;else if (stringStep === "finished" || stringStep === "") return 999;else {
    if (stringStep.substring(0, 4) !== "step") {
      throw new Error("Quest state parsing error.");
    }

    return parseInt(stringStep.substring(4), 10);
  }
}
var EnsureError = /*#__PURE__*/function (_Error) {
  _inherits(EnsureError, _Error);

  var _super = _createSuper(EnsureError);

  function EnsureError(cause) {
    var _this;

    _classCallCheck(this, EnsureError);

    _this = _super.call(this, "Failed to ensure ".concat(cause.name, "!"));
    _this.name = "Ensure Error";
    return _this;
  }

  return _createClass(EnsureError);
}( /*#__PURE__*/_wrapNativeSuper(Error));
/**
 * Tries to get an effect using the default method
 * @param ef effect to try to get
 * @param turns turns to aim for; default of 1
 */

function ensureEffect(ef) {
  var turns = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  if (haveEffect(ef) < turns) {
    if (!cliExecute(ef.default) || haveEffect(ef) === 0) {
      throw new EnsureError(ef);
    }
  }
}
var valueMap = new Map();
var MALL_VALUE_MODIFIER = 0.9;
/**
 * Returns the average value--based on mallprice and autosell--of a collection of items
 * @param items items whose value you care about
 */

function getSaleValue() {
  for (var _len = arguments.length, items = new Array(_len), _key = 0; _key < _len; _key++) {
    items[_key] = arguments[_key];
  }

  return items.map(item => {
    if (valueMap.has(item)) return valueMap.get(item) || 0;

    if (item.discardable) {
      valueMap.set(item, mallPrice(item) > Math.max(2 * autosellPrice(item), 100) ? MALL_VALUE_MODIFIER * mallPrice(item) : autosellPrice(item));
    } else {
      valueMap.set(item, mallPrice(item) > 100 ? MALL_VALUE_MODIFIER * mallPrice(item) : 0);
    }

    return valueMap.get(item) || 0;
  }).reduce((s, price) => s + price, 0) / items.length;
}
var Environment = {
  Outdoor: "outdoor",
  Indoor: "indoor",
  Underground: "underground",
  Underwater: "underwater"
};
/**
 * Returns the weight-coefficient of any leprechaunning that this familiar may find itself doing
 * Assumes the familiar is nude and thus fails for hatrack & pantsrack
 * For the Mutant Cactus Bud, returns the efficacy-multiplier instead
 * @param familiar The familiar whose leprechaun multiplier you're interested in
 */

function findLeprechaunMultiplier(familiar) {
  if (familiar === $familiar(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["Mutant Cactus Bud"])))) return numericModifier(familiar, "Leprechaun Effectiveness", 1, $item(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["none"]))));
  var meatBonus = numericModifier(familiar, "Meat Drop", 1, $item(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["none"]))));
  if (meatBonus === 0) return 0;
  return Math.pow(Math.sqrt(meatBonus / 2 + 55 / 4 + 3) - Math.sqrt(55) / 2, 2);
}
/**
 * Returns the weight-coefficient of any baby gravy fairying that this familiar may find itself doing
 * Assumes the familiar is nude and thus fails for hatrack & pantsrack
 * For the Mutant Fire Ant, returns the efficacy-multiplier instead
 * @param familiar The familiar whose fairy multiplier you're interested in
 */

function findFairyMultiplier(familiar) {
  if (familiar === $familiar(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["Mutant Fire Ant"])))) return numericModifier(familiar, "Fairy Effectiveness", 1, $item(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["none"]))));
  var itemBonus = numericModifier(familiar, "Item Drop", 1, $item(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["none"]))));
  if (itemBonus === 0) return 0;
  return Math.pow(Math.sqrt(itemBonus + 55 / 4 + 3) - Math.sqrt(55) / 2, 2);
}
var holidayWanderers = new Map([["El Dia De Los Muertos Borrachos", $monsters(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["Novia Cad\xE1ver, Novio Cad\xE1ver, Padre Cad\xE1ver, Persona Inocente Cad\xE1ver"])))], ["Feast of Boris", $monsters(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["Candied Yam Golem, Malevolent Tofurkey, Possessed Can of Cranberry Sauce, Stuffing Golem"])))], ["Talk Like a Pirate Day", $monsters(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral(["ambulatory pirate, migratory pirate, peripatetic pirate"])))]]);
function getTodaysHolidayWanderers() {
  return (0,external_kolmafia_namespaceObject.holiday)().split("/").map(holiday => {
    var _holidayWanderers$get;

    return (_holidayWanderers$get = holidayWanderers.get(holiday)) !== null && _holidayWanderers$get !== void 0 ? _holidayWanderers$get : [];
  }).flat();
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.from-entries.js
var es_object_from_entries = __webpack_require__(5809);
;// CONCATENATED MODULE: ./node_modules/libram/dist/propertyTypes.js
/** THIS FILE IS AUTOMATICALLY GENERATED. See tools/parseDefaultProperties.ts for more information */
var booleanProperties = ["addChatCommandLine", "addCreationQueue", "addStatusBarToFrames", "allowCloseableDesktopTabs", "allowNegativeTally", "allowNonMoodBurning", "allowSummonBurning", "autoHighlightOnFocus", "broadcastEvents", "cacheMallSearches", "chatBeep", "chatLinksUseRelay", "compactChessboard", "connectViaAddress", "copyAsHTML", "customizedTabs", "debugBuy", "debugConsequences", "debugFoxtrotRemoval", "debugPathnames", "gapProtection", "greenScreenProtection", "guiUsesOneWindow", "hideServerDebugText", "logAcquiredItems", "logBattleAction", "logBrowserInteractions", "logChatMessages", "logChatRequests", "logCleanedHTML", "logDecoratedResponses", "logFamiliarActions", "logGainMessages", "logReadableHTML", "logPreferenceChange", "logMonsterHealth", "logReverseOrder", "logStatGains", "logStatusEffects", "logStatusOnLogin", "macroDebug", "macroLens", "mementoListActive", "mergeHobopolisChat", "printStackOnAbort", "protectAgainstOverdrink", "proxySet", "relayAddSounds", "relayAddsCustomCombat", "relayAddsDiscoHelper", "relayAddsGraphicalCLI", "relayAddsQuickScripts", "relayAddsRestoreLinks", "relayAddsUpArrowLinks", "relayAddsUseLinks", "relayAddsWikiLinks", "relayAllowRemoteAccess", "relayBrowserOnly", "relayFormatsChatText", "relayHidesJunkMallItems", "relayMaintainsEffects", "relayMaintainsHealth", "relayMaintainsMana", "relayOverridesImages", "relayRunsAfterAdventureScript", "relayRunsBeforeBattleScript", "relayRunsBeforePVPScript", "relayScriptButtonFirst", "relayTextualizesEffects", "relayTrimsZapList", "relayUsesInlineLinks", "relayUsesIntegratedChat", "relayWarnOnRecoverFailure", "removeMalignantEffects", "saveSettingsOnSet", "sharePriceData", "showAllRequests", "showAnnouncements", "showExceptionalRequests", "stealthLogin", "svnInstallDependencies", "svnShowCommitMessages", "svnUpdateOnLogin", "switchEquipmentForBuffs", "syncAfterSvnUpdate", "useChatToolbar", "useContactsFrame", "useDevProxyServer", "useDockIconBadge", "useHugglerChannel", "useImageCache", "useLastUserAgent", "useNaiveSecureLogin", "useShinyTabbedChat", "useSystemTrayIcon", "useTabbedChatFrame", "useToolbars", "useZoneComboBox", "verboseSpeakeasy", "verboseFloundry", "wrapLongLines", "_announcementShown", "_svnRepoFileFetched", "_svnUpdated", "antagonisticSnowmanKitAvailable", "arcadeGameHints", "armoryUnlocked", "autoForbidIgnoringStores", "autoCraft", "autoQuest", "autoEntangle", "autoGarish", "autoManaRestore", "autoFillMayoMinder", "autoPinkyRing", "autoPlantHardcore", "autoPlantSoftcore", "autoPotionID", "autoRepairBoxServants", "autoSatisfyWithCloset", "autoSatisfyWithCoinmasters", "autoSatisfyWithMall", "autoSatisfyWithNPCs", "autoSatisfyWithStash", "autoSatisfyWithStorage", "autoSetConditions", "autoSphereID", "autoSteal", "autoTuxedo", "backupCameraReverserEnabled", "badMoonEncounter01", "badMoonEncounter02", "badMoonEncounter03", "badMoonEncounter04", "badMoonEncounter05", "badMoonEncounter06", "badMoonEncounter07", "badMoonEncounter08", "badMoonEncounter09", "badMoonEncounter10", "badMoonEncounter11", "badMoonEncounter12", "badMoonEncounter13", "badMoonEncounter14", "badMoonEncounter15", "badMoonEncounter16", "badMoonEncounter17", "badMoonEncounter18", "badMoonEncounter19", "badMoonEncounter20", "badMoonEncounter21", "badMoonEncounter22", "badMoonEncounter23", "badMoonEncounter24", "badMoonEncounter25", "badMoonEncounter26", "badMoonEncounter27", "badMoonEncounter28", "badMoonEncounter29", "badMoonEncounter30", "badMoonEncounter31", "badMoonEncounter32", "badMoonEncounter33", "badMoonEncounter34", "badMoonEncounter35", "badMoonEncounter36", "badMoonEncounter37", "badMoonEncounter38", "badMoonEncounter39", "badMoonEncounter40", "badMoonEncounter41", "badMoonEncounter42", "badMoonEncounter43", "badMoonEncounter44", "badMoonEncounter45", "badMoonEncounter46", "badMoonEncounter47", "badMoonEncounter48", "barrelShrineUnlocked", "bigBrotherRescued", "blackBartsBootyAvailable", "bondAdv", "bondBeach", "bondBeat", "bondBooze", "bondBridge", "bondDesert", "bondDR", "bondDrunk1", "bondDrunk2", "bondHoney", "bondHP", "bondInit", "bondItem1", "bondItem2", "bondItem3", "bondJetpack", "bondMartiniDelivery", "bondMartiniPlus", "bondMartiniTurn", "bondMeat", "bondMox1", "bondMox2", "bondMPregen", "bondMus1", "bondMus2", "bondMys1", "bondMys2", "bondSpleen", "bondStat", "bondStat2", "bondStealth", "bondStealth2", "bondSymbols", "bondWar", "bondWeapon2", "bondWpn", "booPeakLit", "bootsCharged", "breakfastCompleted", "burrowgrubHiveUsed", "canteenUnlocked", "chaosButterflyThrown", "chatbotScriptExecuted", "chateauAvailable", "chatLiterate", "chatServesUpdates", "checkJackassHardcore", "checkJackassSoftcore", "clanAttacksEnabled", "coldAirportAlways", "considerShadowNoodles", "controlRoomUnlock", "concertVisited", "controlPanel1", "controlPanel2", "controlPanel3", "controlPanel4", "controlPanel5", "controlPanel6", "controlPanel7", "controlPanel8", "controlPanel9", "corralUnlocked", "dailyDungeonDone", "dampOldBootPurchased", "daycareOpen", "demonSummoned", "dinseyAudienceEngagement", "dinseyGarbagePirate", "dinseyRapidPassEnabled", "dinseyRollercoasterNext", "dinseySafetyProtocolsLoose", "doghouseBoarded", "dontStopForCounters", "drippingHallUnlocked", "drippyShieldUnlocked", "edUsedLash", "eldritchFissureAvailable", "eldritchHorrorAvailable", "essenceOfAnnoyanceAvailable", "essenceOfBearAvailable", "expressCardUsed", "falloutShelterChronoUsed", "falloutShelterCoolingTankUsed", "fireExtinguisherBatHoleUsed", "fireExtinguisherChasmUsed", "fireExtinguisherCyrptUsed", "fireExtinguisherDesertUsed", "fireExtinguisherHaremUsed", "fistTeachingsHaikuDungeon", "fistTeachingsPokerRoom", "fistTeachingsBarroomBrawl", "fistTeachingsConservatory", "fistTeachingsBatHole", "fistTeachingsFunHouse", "fistTeachingsMenagerie", "fistTeachingsSlums", "fistTeachingsFratHouse", "fistTeachingsRoad", "fistTeachingsNinjaSnowmen", "flickeringPixel1", "flickeringPixel2", "flickeringPixel3", "flickeringPixel4", "flickeringPixel5", "flickeringPixel6", "flickeringPixel7", "flickeringPixel8", "frAlways", "frCemetaryUnlocked", "friarsBlessingReceived", "frMountainsUnlocked", "frSwampUnlocked", "frVillageUnlocked", "frWoodUnlocked", "getawayCampsiteUnlocked", "ghostPencil1", "ghostPencil2", "ghostPencil3", "ghostPencil4", "ghostPencil5", "ghostPencil6", "ghostPencil7", "ghostPencil8", "ghostPencil9", "gingerAdvanceClockUnlocked", "gingerBlackmailAccomplished", "gingerbreadCityAvailable", "gingerExtraAdventures", "gingerNegativesDropped", "gingerSewersUnlocked", "gingerSubwayLineUnlocked", "gingerRetailUnlocked", "glitchItemAvailable", "grabCloversHardcore", "grabCloversSoftcore", "guideToSafariAvailable", "guyMadeOfBeesDefeated", "hardcorePVPWarning", "harvestBatteriesHardcore", "harvestBatteriesSoftcore", "hasBartender", "hasChef", "hasCocktailKit", "hasDetectiveSchool", "hasOven", "hasRange", "hasShaker", "hasSushiMat", "haveBoxingDaydreamHardcore", "haveBoxingDaydreamSoftcore", "hermitHax0red", "holidayHalsBookAvailable", "horseryAvailable", "hotAirportAlways", "implementGlitchItem", "itemBoughtPerAscension637", "itemBoughtPerAscension8266", "itemBoughtPerAscension10790", "itemBoughtPerAscension10794", "itemBoughtPerAscension10795", "itemBoughtPerCharacter6423", "itemBoughtPerCharacter6428", "itemBoughtPerCharacter6429", "kingLiberated", "lastPirateInsult1", "lastPirateInsult2", "lastPirateInsult3", "lastPirateInsult4", "lastPirateInsult5", "lastPirateInsult6", "lastPirateInsult7", "lastPirateInsult8", "lawOfAveragesAvailable", "leafletCompleted", "libraryCardUsed", "lockPicked", "loginRecoveryHardcore", "loginRecoverySoftcore", "lovebugsUnlocked", "loveTunnelAvailable", "lowerChamberUnlock", "makePocketWishesHardcore", "makePocketWishesSoftcore", "manualOfNumberologyAvailable", "mappingMonsters", "mapToAnemoneMinePurchased", "mapToKokomoAvailable", "mapToMadnessReefPurchased", "mapToTheDiveBarPurchased", "mapToTheMarinaraTrenchPurchased", "mapToTheSkateParkPurchased", "maraisBeaverUnlock", "maraisCorpseUnlock", "maraisDarkUnlock", "maraisVillageUnlock", "maraisWildlifeUnlock", "maraisWizardUnlock", "maximizerAlwaysCurrent", "maximizerCreateOnHand", "maximizerCurrentMallPrices", "maximizerFoldables", "maximizerIncludeAll", "maximizerNoAdventures", "middleChamberUnlock", "milkOfMagnesiumActive", "moonTuned", "neverendingPartyAlways", "odeBuffbotCheck", "oilPeakLit", "oscusSodaUsed", "outrageousSombreroUsed", "pathedSummonsHardcore", "pathedSummonsSoftcore", "popularTartUnlocked", "prAlways", "prayedForGlamour", "prayedForProtection", "prayedForVigor", "primaryLabCheerCoreGrabbed", "pyramidBombUsed", "ROMOfOptimalityAvailable", "rageGlandVented", "readManualHardcore", "readManualSoftcore", "relayShowSpoilers", "relayShowWarnings", "rememberDesktopSize", "restUsingChateau", "restUsingCampAwayTent", "requireBoxServants", "requireSewerTestItems", "safePickpocket", "schoolOfHardKnocksDiplomaAvailable", "serverAddsCustomCombat", "SHAWARMAInitiativeUnlocked", "showForbiddenStores", "showGainsPerUnit", "showIgnoringStorePrices", "showNoSummonOnly", "showTurnFreeOnly", "sleazeAirportAlways", "snojoAvailable", "sortByRoom", "spacegateAlways", "spacegateVaccine1", "spacegateVaccine2", "spacegateVaccine3", "spaceInvaderDefeated", "spelunkyHints", "spiceMelangeUsed", "spookyAirportAlways", "stenchAirportAlways", "stopForFixedWanderer", "styxPixieVisited", "suppressInappropriateNags", "suppressPotentialMalware", "suppressPowerPixellation", "telegraphOfficeAvailable", "telescopeLookedHigh", "timeTowerAvailable", "trackLightsOut", "trackVoteMonster", "uneffectWithHotTub", "universalSeasoningActive", "universalSeasoningAvailable", "useCrimboToysHardcore", "useCrimboToysSoftcore", "verboseMaximizer", "visitLoungeHardcore", "visitLoungeSoftcore", "visitRumpusHardcore", "visitRumpusSoftcore", "voteAlways", "wildfireBarrelCaulked", "wildfireDusted", "wildfireFracked", "wildfirePumpGreased", "wildfireSprinkled", "yearbookCameraPending", "youRobotScavenged", "_affirmationCookieEaten", "_affirmationHateUsed", "_airFryerUsed", "_akgyxothUsed", "_alienAnimalMilkUsed", "_alienPlantPodUsed", "_allYearSucker", "_aprilShower", "_armyToddlerCast", "_authorsInkUsed", "_baconMachineUsed", "_bagOfCandy", "_bagOfCandyUsed", "_bagOTricksUsed", "_ballastTurtleUsed", "_ballInACupUsed", "_ballpit", "_barrelPrayer", "_beachCombing", "_bendHellUsed", "_blankoutUsed", "_bonersSummoned", "_borrowedTimeUsed", "_bowleggedSwaggerUsed", "_bowlFullOfJellyUsed", "_boxOfHammersUsed", "_brainPreservationFluidUsed", "_brassDreadFlaskUsed", "_cameraUsed", "_canSeekBirds", "_carboLoaded", "_cargoPocketEmptied", "_ceciHatUsed", "_chateauDeskHarvested", "_chateauMonsterFought", "_chronerCrossUsed", "_chronerTriggerUsed", "_chubbyAndPlumpUsed", "_circleDrumUsed", "_clanFortuneBuffUsed", "_claraBellUsed", "_coalPaperweightUsed", "_cocoaDispenserUsed", "_cocktailShakerUsed", "_coldAirportToday", "_coldOne", "_communismUsed", "_confusingLEDClockUsed", "_controlPanelUsed", "_corruptedStardustUsed", "_cosmicSixPackConjured", "_crappyCameraUsed", "_creepyVoodooDollUsed", "_crimboTree", "_cursedKegUsed", "_cursedMicrowaveUsed", "_dailyDungeonMalwareUsed", "_darkChocolateHeart", "_daycareFights", "_daycareNap", "_daycareSpa", "_daycareToday", "_defectiveTokenChecked", "_defectiveTokenUsed", "_dinseyGarbageDisposed", "_discoKnife", "_distentionPillUsed", "_dnaHybrid", "_docClocksThymeCocktailDrunk", "_drippingHallDoor1", "_drippingHallDoor2", "_drippingHallDoor3", "_drippingHallDoor4", "_drippyCaviarUsed", "_drippyNuggetUsed", "_drippyPilsnerUsed", "_drippyPlumUsed", "_drippyWineUsed", "_eldritchHorrorEvoked", "_eldritchTentacleFought", "_entauntaunedToday", "_envyfishEggUsed", "_essentialTofuUsed", "_etchedHourglassUsed", "_eternalCarBatteryUsed", "_everfullGlassUsed", "_eyeAndATwistUsed", "_fancyChessSetUsed", "_falloutShelterSpaUsed", "_fancyHotDogEaten", "_farmerItemsCollected", "_favoriteBirdVisited", "_firedJokestersGun", "_fireExtinguisherRefilled", "_fireStartingKitUsed", "_fireworksShop", "_fireworksShopHatBought", "_fireworksShopEquipmentBought", "_fireworkUsed", "_fishyPipeUsed", "_floundryItemCreated", "_floundryItemUsed", "_freePillKeeperUsed", "_frToday", "_fudgeSporkUsed", "_garbageItemChanged", "_gingerBiggerAlligators", "_gingerbreadCityToday", "_gingerbreadClockAdvanced", "_gingerbreadClockVisited", "_gingerbreadColumnDestroyed", "_gingerbreadMobHitUsed", "_glennGoldenDiceUsed", "_glitchItemImplemented", "_gnollEyeUsed", "_grimBuff", "_guildManualUsed", "_guzzlrQuestAbandoned", "_hardKnocksDiplomaUsed", "_hippyMeatCollected", "_hobbyHorseUsed", "_holidayFunUsed", "_holoWristCrystal", "_hotAirportToday", "_hungerSauceUsed", "_hyperinflatedSealLungUsed", "_iceHotelRoomsRaided", "_iceSculptureUsed", "_incredibleSelfEsteemCast", "_infernoDiscoVisited", "_internetDailyDungeonMalwareBought", "_internetGallonOfMilkBought", "_internetPlusOneBought", "_internetPrintScreenButtonBought", "_internetViralVideoBought", "_interviewIsabella", "_interviewMasquerade", "_interviewVlad", "_inquisitorsUnidentifiableObjectUsed", "_ironicMoustache", "_jackassPlumberGame", "_jarlsCheeseSummoned", "_jarlsCreamSummoned", "_jarlsDoughSummoned", "_jarlsEggsSummoned", "_jarlsFruitSummoned", "_jarlsMeatSummoned", "_jarlsPotatoSummoned", "_jarlsVeggiesSummoned", "_jingleBellUsed", "_jukebox", "_kgbFlywheelCharged", "_kgbLeftDrawerUsed", "_kgbOpened", "_kgbRightDrawerUsed", "_kolConSixPackUsed", "_kolhsCutButNotDried", "_kolhsIsskayLikeAnAshtray", "_kolhsPoeticallyLicenced", "_kolhsSchoolSpirited", "_kudzuSaladEaten", "_latteBanishUsed", "_latteCopyUsed", "_latteDrinkUsed", "_legendaryBeat", "_licenseToChillUsed", "_lookingGlass", "_loveTunnelUsed", "_luckyGoldRingVolcoino", "_lunchBreak", "_lupineHormonesUsed", "_lyleFavored", "_madLiquorDrunk", "_madTeaParty", "_mafiaMiddleFingerRingUsed", "_managerialManipulationUsed", "_mansquitoSerumUsed", "_mayoDeviceRented", "_mayoTankSoaked", "_meatballMachineUsed", "_milkOfMagnesiumUsed", "_mimeArmyShotglassUsed", "_missGravesVermouthDrunk", "_missileLauncherUsed", "_momFoodReceived", "_mrBurnsgerEaten", "_muffinOrderedToday", "_mushroomGardenVisited", "_neverendingPartyToday", "_newYouQuestCompleted", "_olympicSwimmingPool", "_olympicSwimmingPoolItemFound", "_overflowingGiftBasketUsed", "_partyHard", "_pastaAdditive", "_perfectFreezeUsed", "_perfectlyFairCoinUsed", "_petePartyThrown", "_peteRiotIncited", "_photocopyUsed", "_pickyTweezersUsed", "_pirateBellowUsed", "_pirateForkUsed", "_pixelOrbUsed", "_plumbersMushroomStewEaten", "_pneumaticityPotionUsed", "_potatoAlarmClockUsed", "_pottedTeaTreeUsed", "_prToday", "_psychoJarFilled", "_psychoJarUsed", "_psychokineticHugUsed", "_rainStickUsed", "_redwoodRainStickUsed", "_requestSandwichSucceeded", "_rhinestonesAcquired", "_seaJellyHarvested", "_setOfJacksUsed", "_sewingKitUsed", "_sexChanged", "_shrubDecorated", "_silverDreadFlaskUsed", "_skateBuff1", "_skateBuff2", "_skateBuff3", "_skateBuff4", "_skateBuff5", "_sleazeAirportToday", "_sobrieTeaUsed", "_softwareGlitchTurnReceived", "_spacegateMurderbot", "_spacegateRuins", "_spacegateSpant", "_spacegateToday", "_spacegateVaccine", "_spaghettiBreakfast", "_spaghettiBreakfastEaten", "_spinmasterLatheVisited", "_spinningWheel", "_spookyAirportToday", "_stabonicScrollUsed", "_steelyEyedSquintUsed", "_stenchAirportToday", "_stinkyCheeseBanisherUsed", "_streamsCrossed", "_stuffedPocketwatchUsed", "_styxSprayUsed", "_summonAnnoyanceUsed", "_summonCarrotUsed", "_summonResortPassUsed", "_sweetToothUsed", "_syntheticDogHairPillUsed", "_tacoFlierUsed", "_templeHiddenPower", "_tempuraAirUsed", "_thesisDelivered", "_timeSpinnerReplicatorUsed", "_toastSummoned", "_tonicDjinn", "_treasuryEliteMeatCollected", "_treasuryHaremMeatCollected", "_trivialAvocationsGame", "_tryptophanDartUsed", "_turtlePowerCast", "_twelveNightEnergyUsed", "_ultraMegaSourBallUsed", "_victorSpoilsUsed", "_villainLairCanLidUsed", "_villainLairColorChoiceUsed", "_villainLairDoorChoiceUsed", "_villainLairFirecrackerUsed", "_villainLairSymbologyChoiceUsed", "_villainLairWebUsed", "_vmaskBanisherUsed", "_voraciTeaUsed", "_volcanoItemRedeemed", "_volcanoSuperduperheatedMetal", "_voteToday", "_VYKEACafeteriaRaided", "_VYKEALoungeRaided", "_walfordQuestStartedToday", "_warbearBankUsed", "_warbearBreakfastMachineUsed", "_warbearGyrocopterUsed", "_warbearSodaMachineUsed", "_wildfireBarrelHarvested", "_witchessBuff", "_workshedItemUsed", "_zombieClover", "_preventScurvy", "lockedItem4637", "lockedItem4638", "lockedItem4639", "lockedItem4646", "lockedItem4647", "unknownRecipe3542", "unknownRecipe3543", "unknownRecipe3544", "unknownRecipe3545", "unknownRecipe3546", "unknownRecipe3547", "unknownRecipe3548", "unknownRecipe3749", "unknownRecipe3751", "unknownRecipe4172", "unknownRecipe4173", "unknownRecipe4174", "unknownRecipe5060", "unknownRecipe5061", "unknownRecipe5062", "unknownRecipe5063", "unknownRecipe5064", "unknownRecipe5066", "unknownRecipe5067", "unknownRecipe5069", "unknownRecipe5070", "unknownRecipe5072", "unknownRecipe5073", "unknownRecipe5670", "unknownRecipe5671", "unknownRecipe6501", "unknownRecipe6564", "unknownRecipe6565", "unknownRecipe6566", "unknownRecipe6567", "unknownRecipe6568", "unknownRecipe6569", "unknownRecipe6570", "unknownRecipe6571", "unknownRecipe6572", "unknownRecipe6573", "unknownRecipe6574", "unknownRecipe6575", "unknownRecipe6576", "unknownRecipe6577", "unknownRecipe6578", "unknownRecipe7752", "unknownRecipe7753", "unknownRecipe7754", "unknownRecipe7755", "unknownRecipe7756", "unknownRecipe7757", "unknownRecipe7758"];
var numericProperties = ["charsheetDropdown", "chatStyle", "coinMasterIndex", "dailyDeedsVersion", "defaultDropdown1", "defaultDropdown2", "defaultDropdownSplit", "defaultLimit", "fixedThreadPoolSize", "itemManagerIndex", "lastBuffRequestType", "lastGlobalCounterDay", "lastImageCacheClear", "lastRssUpdate", "previousUpdateRevision", "relayDelayForSVN", "relaySkillButtonCount", "scriptButtonPosition", "statusDropdown", "svnThreadPoolSize", "toolbarPosition", "_g9Effect", "addingScrolls", "affirmationCookiesEaten", "aminoAcidsUsed", "antagonisticSnowmanKitCost", "autoAbortThreshold", "autoAntidote", "autoBuyPriceLimit", "availableCandyCredits", "availableDimes", "availableFunPoints", "availableQuarters", "availableStoreCredits", "availableSwagger", "averageSwagger", "awolMedicine", "awolPointsBeanslinger", "awolPointsCowpuncher", "awolPointsSnakeoiler", "awolDeferredPointsBeanslinger", "awolDeferredPointsCowpuncher", "awolDeferredPointsSnakeoiler", "awolVenom", "bagOTricksCharges", "ballpitBonus", "bankedKarma", "barrelGoal", "bartenderTurnsUsed", "basementMallPrices", "basementSafetyMargin", "batmanFundsAvailable", "batmanBonusInitialFunds", "batmanTimeLeft", "bearSwagger", "beeCounter", "beGregariousCharges", "beGregariousFightsLeft", "birdformCold", "birdformHot", "birdformRoc", "birdformSleaze", "birdformSpooky", "birdformStench", "blackBartsBootyCost", "blackPuddingsDefeated", "blackForestProgress", "blankOutUsed", "bloodweiserDrunk", "bondPoints", "bondVillainsDefeated", "boneAbacusVictories", "booPeakProgress", "borisPoints", "breakableHandling", "breakableHandling1964", "breakableHandling9691", "breakableHandling9692", "breakableHandling9699", "breathitinCharges", "brodenBacteria", "brodenSprinkles", "buffBotMessageDisposal", "buffBotPhilanthropyType", "buffJimmyIngredients", "burnoutsDefeated", "burrowgrubSummonsRemaining", "camelSpit", "camerasUsed", "campAwayDecoration", "carboLoading", "catBurglarBankHeists", "cellarLayout", "charitableDonations", "chasmBridgeProgress", "chefTurnsUsed", "chessboardsCleared", "chilledToTheBone", "cinderellaMinutesToMidnight", "cinderellaScore", "cocktailSummons", "commerceGhostCombats", "controlPanelOmega", "cornucopiasOpened", "cosmicBowlingBallReturnCombats", "cozyCounter6332", "cozyCounter6333", "cozyCounter6334", "crimbo16BeardChakraCleanliness", "crimbo16BootsChakraCleanliness", "crimbo16BungChakraCleanliness", "crimbo16CrimboHatChakraCleanliness", "crimbo16GutsChakraCleanliness", "crimbo16HatChakraCleanliness", "crimbo16JellyChakraCleanliness", "crimbo16LiverChakraCleanliness", "crimbo16NippleChakraCleanliness", "crimbo16NoseChakraCleanliness", "crimbo16ReindeerChakraCleanliness", "crimbo16SackChakraCleanliness", "crimboTreeDays", "cubelingProgress", "currentExtremity", "currentHedgeMazeRoom", "currentMojoFilters", "currentNunneryMeat", "cursedMagnifyingGlassCount", "cyrptAlcoveEvilness", "cyrptCrannyEvilness", "cyrptNicheEvilness", "cyrptNookEvilness", "cyrptTotalEvilness", "darkGyfftePoints", "daycareEquipment", "daycareInstructors", "daycareLastScavenge", "daycareToddlers", "dbNemesisSkill1", "dbNemesisSkill2", "dbNemesisSkill3", "desertExploration", "desktopHeight", "desktopWidth", "dinseyFilthLevel", "dinseyFunProgress", "dinseyNastyBearsDefeated", "dinseySocialJusticeIProgress", "dinseySocialJusticeIIProgress", "dinseyTouristsFed", "dinseyToxicMultiplier", "doctorBagQuestLights", "doctorBagUpgrades", "dreadScroll1", "dreadScroll2", "dreadScroll3", "dreadScroll4", "dreadScroll5", "dreadScroll6", "dreadScroll7", "dreadScroll8", "dripAdventuresSinceAscension", "drippingHallAdventuresSinceAscension", "drippingTreesAdventuresSinceAscension", "drippyBatsUnlocked", "drippyJuice", "drippyOrbsClaimed", "drunkenSwagger", "edDefeatAbort", "edPoints", "eldritchTentaclesFought", "electricKoolAidEaten", "encountersUntilDMTChoice", "encountersUntilNEPChoice", "ensorceleeLevel", "entauntaunedColdRes", "essenceOfAnnoyanceCost", "essenceOfBearCost", "extraRolloverAdventures", "falloutShelterLevel", "lastBeardBuff", "fingernailsClipped", "fistSkillsKnown", "flyeredML", "fossilB", "fossilD", "fossilN", "fossilP", "fossilS", "fossilW", "fratboysDefeated", "frenchGuardTurtlesFreed", "garbageChampagneCharge", "garbageFireProgress", "garbageShirtCharge", "garbageTreeCharge", "garlandUpgrades", "gingerDigCount", "gingerLawChoice", "gingerMuscleChoice", "gingerTrainScheduleStudies", "gladiatorBallMovesKnown", "gladiatorBladeMovesKnown", "gladiatorNetMovesKnown", "glitchItemCost", "glitchItemImplementationCount", "glitchItemImplementationLevel", "glitchSwagger", "gloverPoints", "gnasirProgress", "goldenMrAccessories", "gongPath", "goreCollected", "gourdItemCount", "grimoire1Summons", "grimoire2Summons", "grimoire3Summons", "grimstoneCharge", "guardTurtlesFreed", "guideToSafariCost", "guyMadeOfBeesCount", "guzzlrBronzeDeliveries", "guzzlrDeliveryProgress", "guzzlrGoldDeliveries", "guzzlrPlatinumDeliveries", "haciendaLayout", "heavyRainsStartingThunder", "heavyRainsStartingRain", "heavyRainsStartingLightning", "heroDonationBoris", "heroDonationJarlsberg", "heroDonationSneakyPete", "hiddenApartmentProgress", "hiddenBowlingAlleyProgress", "hiddenHospitalProgress", "hiddenOfficeProgress", "hiddenTavernUnlock", "highTopPumped", "hippiesDefeated", "holidayHalsBookCost", "holidaySwagger", "homebodylCharges", "hpAutoRecovery", "hpAutoRecoveryTarget", "iceSwagger", "item9084", "jarlsbergPoints", "jungCharge", "junglePuns", "knownAscensions", "kolhsTotalSchoolSpirited", "lastAnticheeseDay", "lastArcadeAscension", "lastBadMoonReset", "lastBangPotionReset", "lastBarrelSmashed", "lastBattlefieldReset", "lastBreakfast", "lastCastleGroundUnlock", "lastCastleTopUnlock", "lastCellarReset", "lastChanceThreshold", "lastChasmReset", "lastColosseumRoundWon", "lastCouncilVisit", "lastCounterDay", "lastDesertUnlock", "lastDispensaryOpen", "lastDMTDuplication", "lastDwarfFactoryReset", "lastEVHelmetValue", "lastEVHelmetReset", "lastEasterEggBalloon", "lastEmptiedStorage", "lastFilthClearance", "lastGoofballBuy", "lastGuildStoreOpen", "lastGuyMadeOfBeesReset", "lastFratboyCall", "lastFriarCeremonyAscension", "lastHippyCall", "lastIslandUnlock", "lastKeyotronUse", "lastKingLiberation", "lastLightsOutTurn", "lastMushroomPlot", "lastMiningReset", "lastNemesisReset", "lastPaperStripReset", "lastPirateEphemeraReset", "lastPirateInsultReset", "lastPlusSignUnlock", "lastQuartetAscension", "lastQuartetRequest", "lastSecondFloorUnlock", "lastSkateParkReset", "lastStillBeatingSpleen", "lastTavernAscension", "lastTavernSquare", "lastTelescopeReset", "lastTempleAdventures", "lastTempleButtonsUnlock", "lastTempleUnlock", "lastTr4pz0rQuest", "lastVioletFogMap", "lastVoteMonsterTurn", "lastWartDinseyDefeated", "lastWuTangDefeated", "lastYearbookCameraAscension", "lastZapperWand", "lastZapperWandExplosionDay", "lawOfAveragesCost", "libramSummons", "lightsOutAutomation", "louvreDesiredGoal", "louvreGoal", "lttQuestDifficulty", "lttQuestStageCount", "manaBurnSummonThreshold", "manaBurningThreshold", "manaBurningTrigger", "manorDrawerCount", "manualOfNumberologyCost", "mapToKokomoCost", "masksUnlocked", "maximizerMRUSize", "maximizerCombinationLimit", "maximizerEquipmentLevel", "maximizerEquipmentScope", "maximizerMaxPrice", "maximizerPriceLevel", "maxManaBurn", "mayflyExperience", "mayoLevel", "meansuckerPrice", "merkinVocabularyMastery", "miniAdvClass", "miniMartinisDrunk", "moleTunnelLevel", "mothershipProgress", "mpAutoRecovery", "mpAutoRecoveryTarget", "munchiesPillsUsed", "mushroomGardenCropLevel", "nextParanormalActivity", "nextQuantumFamiliarTurn", "noobPoints", "noobDeferredPoints", "noodleSummons", "nsContestants1", "nsContestants2", "nsContestants3", "numericSwagger", "nunsVisits", "oilPeakProgress", "optimalSwagger", "optimisticCandleProgress", "palindomeDudesDefeated", "parasolUsed", "pendingMapReflections", "pirateSwagger", "plantingDay", "plumberBadgeCost", "plumberCostumeCost", "plumberPoints", "poolSharkCount", "poolSkill", "primaryLabGooIntensity", "prismaticSummons", "procrastinatorLanguageFluency", "promptAboutCrafting", "puzzleChampBonus", "pyramidPosition", "rockinRobinProgress", "ROMOfOptimalityCost", "quantumPoints", "reagentSummons", "reanimatorArms", "reanimatorLegs", "reanimatorSkulls", "reanimatorWeirdParts", "reanimatorWings", "recentLocations", "redSnapperProgress", "relocatePygmyJanitor", "relocatePygmyLawyer", "rumpelstiltskinTurnsUsed", "rumpelstiltskinKidsRescued", "safariSwagger", "sausageGrinderUnits", "schoolOfHardKnocksDiplomaCost", "schoolSwagger", "scrapbookCharges", "scriptMRULength", "seaodesFound", "SeasoningSwagger", "sexChanges", "shenInitiationDay", "shockingLickCharges", "singleFamiliarRun", "skillBurn3", "skillBurn90", "skillBurn153", "skillBurn154", "skillBurn155", "skillBurn1019", "skillBurn5017", "skillBurn6014", "skillBurn6015", "skillBurn6016", "skillBurn6020", "skillBurn6021", "skillBurn6022", "skillBurn6023", "skillBurn6024", "skillBurn6026", "skillBurn6028", "skillBurn7323", "skillBurn14008", "skillBurn14028", "skillBurn14038", "skillBurn15011", "skillBurn15028", "skillBurn17005", "skillBurn22034", "skillBurn22035", "skillBurn23301", "skillBurn23302", "skillBurn23303", "skillBurn23304", "skillBurn23305", "skillBurn23306", "skillLevel46", "skillLevel47", "skillLevel48", "skillLevel117", "skillLevel118", "skillLevel121", "skillLevel128", "skillLevel134", "skillLevel144", "skillLevel180", "skillLevel188", "skillLevel7254", "slimelingFullness", "slimelingStacksDropped", "slimelingStacksDue", "smoresEaten", "smutOrcNoncombatProgress", "sneakyPetePoints", "snojoMoxieWins", "snojoMuscleWins", "snojoMysticalityWins", "sourceAgentsDefeated", "sourceEnlightenment", "sourceInterval", "sourcePoints", "sourceTerminalGram", "sourceTerminalPram", "sourceTerminalSpam", "spaceBabyLanguageFluency", "spacePirateLanguageFluency", "spelunkyNextNoncombat", "spelunkySacrifices", "spelunkyWinCount", "spookyPuttyCopiesMade", "statbotUses", "sugarCounter4178", "sugarCounter4179", "sugarCounter4180", "sugarCounter4181", "sugarCounter4182", "sugarCounter4183", "sugarCounter4191", "summonAnnoyanceCost", "tacoDanCocktailSauce", "tacoDanFishMeat", "tavernLayout", "telescopeUpgrades", "tempuraSummons", "timeSpinnerMedals", "timesRested", "tomeSummons", "totalCharitableDonations", "turtleBlessingTurns", "twinPeakProgress", "unicornHornInflation", "universalSeasoningCost", "usable1HWeapons", "usable1xAccs", "usable2HWeapons", "usable3HWeapons", "usableAccessories", "usableHats", "usableOffhands", "usableOther", "usablePants", "usableShirts", "valueOfAdventure", "valueOfInventory", "valueOfStill", "valueOfTome", "vintnerWineLevel", "violetFogGoal", "walfordBucketProgress", "warehouseProgress", "welcomeBackAdv", "writingDesksDefeated", "xoSkeleltonXProgress", "xoSkeleltonOProgress", "yearbookCameraAscensions", "yearbookCameraUpgrades", "youRobotBody", "youRobotBottom", "youRobotLeft", "youRobotPoints", "youRobotRight", "youRobotTop", "zeppelinProtestors", "zombiePoints", "_absintheDrops", "_abstractionDropsCrown", "_aguaDrops", "_xenomorphCharge", "_ancestralRecallCasts", "_antihangoverBonus", "_astralDrops", "_backUpUses", "_badlyRomanticArrows", "_badgerCharge", "_balefulHowlUses", "_banderRunaways", "_bastilleGames", "_beanCannonUses", "_bearHugs", "_beerLensDrops", "_benettonsCasts", "_birdsSoughtToday", "_boomBoxFights", "_boomBoxSongsLeft", "_bootStomps", "_boxingGloveArrows", "_brickoEyeSummons", "_brickoFights", "_campAwayCloudBuffs", "_campAwaySmileBuffs", "_candySummons", "_captainHagnkUsed", "_carnieCandyDrops", "_carrotNoseDrops", "_catBurglarCharge", "_catBurglarHeistsComplete", "_cheerleaderSteam", "_chestXRayUsed", "_chipBags", "_chocolateCigarsUsed", "_chocolateSculpturesUsed", "_chocolatesUsed", "_chronolithActivations", "_clanFortuneConsultUses", "_clipartSummons", "_coldMedicineConsults", "_companionshipCasts", "_cosmicBowlingSkillsUsed", "_crimbo21ColdResistance", "_dailySpecialPrice", "_daycareGymScavenges", "_daycareRecruits", "_deckCardsDrawn", "_deluxeKlawSummons", "_demandSandwich", "_detectiveCasesCompleted", "_disavowed", "_dnaPotionsMade", "_donhosCasts", "_dreamJarDrops", "_drunkPygmyBanishes", "_edDefeats", "_edLashCount", "_elronsCasts", "_enamorangs", "_energyCollected", "_expertCornerCutterUsed", "_favorRareSummons", "_feastUsed", "_feelinTheRhythm", "_feelPrideUsed", "_feelExcitementUsed", "_feelHatredUsed", "_feelLonelyUsed", "_feelNervousUsed", "_feelEnvyUsed", "_feelDisappointedUsed", "_feelSuperiorUsed", "_feelLostUsed", "_feelNostalgicUsed", "_feelPeacefulUsed", "_fingertrapArrows", "_fireExtinguisherCharge", "_fragrantHerbsUsed", "_freeBeachWalksUsed", "_frButtonsPressed", "_fudgeWaspFights", "_gapBuffs", "_garbageFireDropsCrown", "_genieFightsUsed", "_genieWishesUsed", "_gibbererAdv", "_gibbererCharge", "_gingerbreadCityTurns", "_glarkCableUses", "_glitchMonsterFights", "_gnomeAdv", "_godLobsterFights", "_goldenMoneyCharge", "_gongDrops", "_gothKidCharge", "_gothKidFights", "_grimBrotherCharge", "_grimFairyTaleDrops", "_grimFairyTaleDropsCrown", "_grimoireConfiscatorSummons", "_grimoireGeekySummons", "_grimstoneMaskDrops", "_grimstoneMaskDropsCrown", "_grooseCharge", "_grooseDrops", "_guzzlrDeliveries", "_guzzlrGoldDeliveries", "_guzzlrPlatinumDeliveries", "_hareAdv", "_hareCharge", "_highTopPumps", "_hipsterAdv", "_hoardedCandyDropsCrown", "_hoboUnderlingSummons", "_holoWristDrops", "_holoWristProgress", "_hotAshesDrops", "_hotJellyUses", "_hotTubSoaks", "_humanMuskUses", "_iceballUses", "_inigosCasts", "_jerksHealthMagazinesUsed", "_jiggleCheese", "_jiggleCream", "_jiggleLife", "_jiggleSteak", "_jitbCharge", "_jungDrops", "_kgbClicksUsed", "_kgbDispenserUses", "_kgbTranquilizerDartUses", "_klawSummons", "_kloopCharge", "_kloopDrops", "_kolhsAdventures", "_kolhsSavedByTheBell", "_lastDailyDungeonRoom", "_lastSausageMonsterTurn", "_lastZomboEye", "_latteRefillsUsed", "_leafblowerML", "_legionJackhammerCrafting", "_llamaCharge", "_longConUsed", "_loveChocolatesUsed", "_lynyrdSnareUses", "_machineTunnelsAdv", "_macrometeoriteUses", "_mafiaThumbRingAdvs", "_monstersMapped", "_mayflowerDrops", "_mayflySummons", "_mediumSiphons", "_meteoriteAdesUsed", "_meteorShowerUses", "_micrometeoriteUses", "_miniMartiniDrops", "_mushroomGardenFights", "_nanorhinoCharge", "_navelRunaways", "_neverendingPartyFreeTurns", "_newYouQuestSharpensDone", "_newYouQuestSharpensToDo", "_nextColdMedicineConsult", "_nextQuantumAlignment", "_nightmareFuelCharges", "_noobSkillCount", "_nuclearStockpileUsed", "_oilExtracted", "_olfactionsUsed", "_optimisticCandleDropsCrown", "_oreDropsCrown", "_otoscopeUsed", "_oysterEggsFound", "_pantsgivingBanish", "_pantsgivingCount", "_pantsgivingCrumbs", "_pantsgivingFullness", "_pasteDrops", "_peteJukeboxFixed", "_peteJumpedShark", "_petePeeledOut", "_pieDrops", "_piePartsCount", "_pixieCharge", "_pocketProfessorLectures", "_poisonArrows", "_pokeGrowFertilizerDrops", "_poolGames", "_powderedGoldDrops", "_powderedMadnessUses", "_powerfulGloveBatteryPowerUsed", "_powerPillDrops", "_powerPillUses", "_precisionCasts", "_radlibSummons", "_raindohCopiesMade", "_rapidPrototypingUsed", "_raveStealCount", "_reflexHammerUsed", "_resolutionAdv", "_resolutionRareSummons", "_riftletAdv", "_rogueProgramCharge", "_romanticFightsLeft", "_saberForceMonsterCount", "_saberForceUses", "_saberMod", "_saltGrainsConsumed", "_sandwormCharge", "_saplingsPlanted", "_sausageFights", "_sausagesEaten", "_sausagesMade", "_sealFigurineUses", "_sealScreeches", "_sealsSummoned", "_shatteringPunchUsed", "_shortOrderCookCharge", "_shrubCharge", "_sloppyDinerBeachBucks", "_smilesOfMrA", "_smithsnessSummons", "_snojoFreeFights", "_snojoParts", "_snokebombUsed", "_snowconeSummons", "_snowglobeDrops", "_snowSuitCount", "_sourceTerminalDigitizeMonsterCount", "_sourceTerminalDigitizeUses", "_sourceTerminalDuplicateUses", "_sourceTerminalEnhanceUses", "_sourceTerminalExtrudes", "_sourceTerminalPortscanUses", "_spaceFurDropsCrown", "_spacegatePlanetIndex", "_spacegateTurnsLeft", "_spaceJellyfishDrops", "_speakeasyDrinksDrunk", "_spelunkerCharges", "_spelunkingTalesDrops", "_spookyJellyUses", "_stackLumpsUses", "_steamCardDrops", "_stickerSummons", "_stinkyCheeseCount", "_stressBallSqueezes", "_sugarSummons", "_taffyRareSummons", "_taffyYellowSummons", "_thanksgettingFoodsEaten", "_thingfinderCasts", "_thinknerdPackageDrops", "_thorsPliersCrafting", "_timeHelmetAdv", "_timeSpinnerMinutesUsed", "_tokenDrops", "_transponderDrops", "_turkeyBlastersUsed", "_turkeyBooze", "_turkeyMuscle", "_turkeyMyst", "_turkeyMoxie", "_unaccompaniedMinerUsed", "_unconsciousCollectiveCharge", "_universalSeasoningsUsed", "_universeCalculated", "_universeImploded", "_usedReplicaBatoomerang", "_vampyreCloakeFormUses", "_villainLairProgress", "_vitachocCapsulesUsed", "_vmaskAdv", "_voidFreeFights", "_volcanoItem1", "_volcanoItem2", "_volcanoItem3", "_volcanoItemCount1", "_volcanoItemCount2", "_volcanoItemCount3", "_voteFreeFights", "_VYKEACompanionLevel", "_warbearAutoAnvilCrafting", "_whiteRiceDrops", "_witchessFights", "_xoHugsUsed", "_yellowPixelDropsCrown", "_zapCount"];
var monsterProperties = ["beGregariousMonster", "cameraMonster", "chateauMonster", "crappyCameraMonster", "crudeMonster", "enamorangMonster", "envyfishMonster", "lastCopyableMonster", "iceSculptureMonster", "longConMonster", "makeFriendsMonster", "merkinLockkeyMonster", "nosyNoseMonster", "olfactedMonster", "photocopyMonster", "rainDohMonster", "romanticTarget", "screencappedMonster", "spookyPuttyMonster", "stenchCursedMonster", "superficiallyInterestedMonster", "waxMonster", "yearbookCameraTarget", "_gallapagosMonster", "_jiggleCreamedMonster", "_latteMonster", "_nanorhinoBanishedMonster", "_newYouQuestMonster", "_relativityMonster", "_saberForceMonster", "_sourceTerminalDigitizeMonster", "_voteMonster"];
var locationProperties = ["currentJunkyardLocation", "doctorBagQuestLocation", "ghostLocation", "guzzlrQuestLocation", "nextSpookyravenElizabethRoom", "nextSpookyravenStephenRoom", "sourceOracleTarget"];
var stringProperties = ["autoLogin", "browserBookmarks", "chatFontSize", "combatHotkey0", "combatHotkey1", "combatHotkey2", "combatHotkey3", "combatHotkey4", "combatHotkey5", "combatHotkey6", "combatHotkey7", "combatHotkey8", "combatHotkey9", "commandLineNamespace", "cookies.inventory", "dailyDeedsOptions", "defaultBorderColor", "displayName", "externalEditor", "getBreakfast", "headerStates", "highlightList", "http.proxyHost", "http.proxyPassword", "http.proxyPort", "http.proxyUser", "https.proxyHost", "https.proxyPassword", "https.proxyPort", "https.proxyUser", "initialDesktop", "initialFrames", "innerChatColor", "innerTabColor", "lastRelayUpdate", "lastRssVersion", "lastUserAgent", "lastUsername", "logPreferenceChangeFilter", "loginScript", "loginServerName", "loginWindowLogo", "logoutScript", "outerChatColor", "outerTabColor", "previousNotifyList", "previousUpdateVersion", "saveState", "saveStateActive", "scriptList", "swingLookAndFeel", "useDecoratedTabs", "userAgent", "afterAdventureScript", "autoOlfact", "autoPutty", "backupCameraMode", "banishedMonsters", "banishingShoutMonsters", "barrelLayout", "batmanStats", "batmanZone", "batmanUpgrades", "battleAction", "beachHeadsUnlocked", "beforePVPScript", "betweenBattleScript", "boomBoxSong", "breakfastAlways", "breakfastHardcore", "breakfastSoftcore", "buffBotCasting", "buyScript", "cargoPocketsEmptied", "cargoPocketScraps", "chatbotScript", "chatPlayerScript", "choiceAdventureScript", "chosenTrip", "clanFortuneReply1", "clanFortuneReply2", "clanFortuneReply3", "clanFortuneWord1", "clanFortuneWord2", "clanFortuneWord3", "commerceGhostItem", "counterScript", "copperheadClubHazard", "crimbotChassis", "crimbotArm", "crimbotPropulsion", "crystalBallPredictions", "csServicesPerformed", "currentEasyBountyItem", "currentHardBountyItem", "currentHippyStore", "currentJunkyardTool", "currentMood", "currentPVPSeason", "currentPvpVictories", "currentSpecialBountyItem", "customCombatScript", "cyrusAdjectives", "defaultFlowerLossMessage", "defaultFlowerWinMessage", "demonName1", "demonName2", "demonName3", "demonName4", "demonName5", "demonName6", "demonName7", "demonName8", "demonName9", "demonName10", "demonName11", "demonName12", "demonName13", "dinseyGatorStenchDamage", "dinseyRollercoasterStats", "doctorBagQuestItem", "dolphinItem", "edPiece", "enamorangMonsterTurn", "ensorcelee", "EVEDirections", "extraCosmeticModifiers", "familiarScript", "forbiddenStores", "gameProBossSpecialPower", "grimoireSkillsHardcore", "grimoireSkillsSoftcore", "grimstoneMaskPath", "guzzlrQuestClient", "guzzlrQuestBooze", "guzzlrQuestTier", "harvestGardenHardcore", "harvestGardenSoftcore", "hpAutoRecoveryItems", "invalidBuffMessage", "jickSwordModifier", "kingLiberatedScript", "lassoTraining", "lastAdventure", "lastBangPotion819", "lastBangPotion820", "lastBangPotion821", "lastBangPotion822", "lastBangPotion823", "lastBangPotion824", "lastBangPotion825", "lastBangPotion826", "lastBangPotion827", "lastChanceBurn", "lastChessboard", "lastDwarfDiceRolls", "lastDwarfDigitRunes", "lastDwarfEquipmentRunes", "lastDwarfFactoryItem118", "lastDwarfFactoryItem119", "lastDwarfFactoryItem120", "lastDwarfFactoryItem360", "lastDwarfFactoryItem361", "lastDwarfFactoryItem362", "lastDwarfFactoryItem363", "lastDwarfFactoryItem364", "lastDwarfFactoryItem365", "lastDwarfFactoryItem910", "lastDwarfFactoryItem3199", "lastDwarfOfficeItem3208", "lastDwarfOfficeItem3209", "lastDwarfOfficeItem3210", "lastDwarfOfficeItem3211", "lastDwarfOfficeItem3212", "lastDwarfOfficeItem3213", "lastDwarfOfficeItem3214", "lastDwarfOreRunes", "lastDwarfHopper1", "lastDwarfHopper2", "lastDwarfHopper3", "lastDwarfHopper4", "lastEncounter", "lastMacroError", "lastMessageId", "lastPaperStrip3144", "lastPaperStrip4138", "lastPaperStrip4139", "lastPaperStrip4140", "lastPaperStrip4141", "lastPaperStrip4142", "lastPaperStrip4143", "lastPaperStrip4144", "lastPirateEphemera", "lastPorkoBoard", "lastPorkoPayouts", "lastPorkoExpected", "lastSlimeVial3885", "lastSlimeVial3886", "lastSlimeVial3887", "lastSlimeVial3888", "lastSlimeVial3889", "lastSlimeVial3890", "lastSlimeVial3891", "lastSlimeVial3892", "lastSlimeVial3893", "lastSlimeVial3894", "lastSlimeVial3895", "lastSlimeVial3896", "latteModifier", "latteUnlocks", "libramSkillsHardcore", "libramSkillsSoftcore", "louvreOverride", "lovePotion", "lttQuestName", "maximizerList", "maximizerMRUList", "mayoInMouth", "mayoMinderSetting", "merkinQuestPath", "mineLayout1", "mineLayout2", "mineLayout3", "mineLayout4", "mineLayout5", "mineLayout6", "mpAutoRecoveryItems", "muffinOnOrder", "nextAdventure", "nsChallenge2", "nsChallenge3", "nsChallenge4", "nsChallenge5", "nsTowerDoorKeysUsed", "oceanAction", "oceanDestination", "pastaThrall1", "pastaThrall2", "pastaThrall3", "pastaThrall4", "pastaThrall5", "pastaThrall6", "pastaThrall7", "pastaThrall8", "peteMotorbikeTires", "peteMotorbikeGasTank", "peteMotorbikeHeadlight", "peteMotorbikeCowling", "peteMotorbikeMuffler", "peteMotorbikeSeat", "pieStuffing", "plantingDate", "plantingLength", "plantingScript", "plumberCostumeWorn", "pokefamBoosts", "postAscensionScript", "preAscensionScript", "retroCapeSuperhero", "retroCapeWashingInstructions", "questDoctorBag", "questECoBucket", "questESlAudit", "questESlBacteria", "questESlCheeseburger", "questESlCocktail", "questESlDebt", "questESlFish", "questESlMushStash", "questESlSalt", "questESlSprinkles", "questESpEVE", "questESpJunglePun", "questESpGore", "questESpClipper", "questESpFakeMedium", "questESpSerum", "questESpSmokes", "questESpOutOfOrder", "questEStFishTrash", "questEStGiveMeFuel", "questEStNastyBears", "questEStSocialJusticeI", "questEStSocialJusticeII", "questEStSuperLuber", "questEStWorkWithFood", "questEStZippityDooDah", "questEUNewYou", "questF01Primordial", "questF02Hyboria", "questF03Future", "questF04Elves", "questF05Clancy", "questG01Meatcar", "questG02Whitecastle", "questG03Ego", "questG04Nemesis", "questG05Dark", "questG06Delivery", "questG07Myst", "questG08Moxie", "questG09Muscle", "questGuzzlr", "questI01Scapegoat", "questI02Beat", "questL02Larva", "questL03Rat", "questL04Bat", "questL05Goblin", "questL06Friar", "questL07Cyrptic", "questL08Trapper", "questL09Topping", "questL10Garbage", "questL11MacGuffin", "questL11Black", "questL11Business", "questL11Curses", "questL11Desert", "questL11Doctor", "questL11Manor", "questL11Palindome", "questL11Pyramid", "questL11Ron", "questL11Shen", "questL11Spare", "questL11Worship", "questL12War", "questL12HippyFrat", "questL13Final", "questL13Warehouse", "questLTTQuestByWire", "questM01Untinker", "questM02Artist", "questM03Bugbear", "questM05Toot", "questM06Gourd", "questM07Hammer", "questM08Baker", "questM09Rocks", "questM10Azazel", "questM11Postal", "questM12Pirate", "questM13Escape", "questM14Bounty", "questM15Lol", "questM16Temple", "questM17Babies", "questM18Swamp", "questM19Hippy", "questM20Necklace", "questM21Dance", "questM22Shirt", "questM23Meatsmith", "questM24Doc", "questM25Armorer", "questM26Oracle", "questPAGhost", "questS01OldGuy", "questS02Monkees", "raveCombo1", "raveCombo2", "raveCombo3", "raveCombo4", "raveCombo5", "raveCombo6", "recoveryScript", "relayCounters", "royalty", "scriptMRUList", "seahorseName", "shenQuestItem", "shrubGarland", "shrubGifts", "shrubLights", "shrubTopper", "sideDefeated", "sidequestArenaCompleted", "sidequestFarmCompleted", "sidequestJunkyardCompleted", "sidequestLighthouseCompleted", "sidequestNunsCompleted", "sidequestOrchardCompleted", "skateParkStatus", "snowsuit", "sourceTerminalChips", "sourceTerminalEducate1", "sourceTerminalEducate2", "sourceTerminalEnquiry", "sourceTerminalEducateKnown", "sourceTerminalEnhanceKnown", "sourceTerminalEnquiryKnown", "sourceTerminalExtrudeKnown", "spadingData", "spadingScript", "spelunkyStatus", "spelunkyUpgrades", "spookyravenRecipeUsed", "stationaryButton1", "stationaryButton2", "stationaryButton3", "stationaryButton4", "stationaryButton5", "streamCrossDefaultTarget", "sweetSynthesisBlacklist", "telescope1", "telescope2", "telescope3", "telescope4", "telescope5", "testudinalTeachings", "textColors", "thanksMessage", "tomeSkillsHardcore", "tomeSkillsSoftcore", "trapperOre", "umdLastObtained", "vintnerWineEffect", "vintnerWineName", "vintnerWineType", "violetFogLayout", "volcanoMaze1", "volcanoMaze2", "volcanoMaze3", "volcanoMaze4", "volcanoMaze5", "walfordBucketItem", "warProgress", "workteaClue", "yourFavoriteBird", "yourFavoriteBirdMods", "youRobotCPUUpgrades", "_beachHeadsUsed", "_beachLayout", "_beachMinutes", "_birdOfTheDay", "_birdOfTheDayMods", "_bittycar", "_campAwaySmileBuffSign", "_cloudTalkMessage", "_cloudTalkSmoker", "_dailySpecial", "_deckCardsSeen", "_feastedFamiliars", "_floristPlantsUsed", "_frAreasUnlocked", "_frHoursLeft", "_frMonstersKilled", "_horsery", "_horseryCrazyMox", "_horseryCrazyMus", "_horseryCrazyMys", "_horseryCrazyName", "_horseryCurrentName", "_horseryDarkName", "_horseryNormalName", "_horseryPaleName", "_jickJarAvailable", "_jiggleCheesedMonsters", "_lastCombatStarted", "_LastPirateRealmIsland", "_locketMonstersFought", "_mummeryMods", "_mummeryUses", "_newYouQuestSkill", "_noHatModifier", "_pantogramModifier", "_questESp", "_questPartyFair", "_questPartyFairProgress", "_questPartyFairQuest", "_roboDrinks", "_roninStoragePulls", "_spacegateAnimalLife", "_spacegateCoordinates", "_spacegateHazards", "_spacegateIntelligentLife", "_spacegatePlanetName", "_spacegatePlantLife", "_stolenAccordions", "_tempRelayCounters", "_timeSpinnerFoodAvailable", "_unknownEasyBountyItem", "_unknownHardBountyItem", "_unknownSpecialBountyItem", "_untakenEasyBountyItem", "_untakenHardBountyItem", "_untakenSpecialBountyItem", "_userMods", "_villainLairColor", "_villainLairKey", "_voteLocal1", "_voteLocal2", "_voteLocal3", "_voteLocal4", "_voteMonster1", "_voteMonster2", "_voteModifier", "_VYKEACompanionType", "_VYKEACompanionRune", "_VYKEACompanionName"];
var numericOrStringProperties = ["statusEngineering", "statusGalley", "statusMedbay", "statusMorgue", "statusNavigation", "statusScienceLab", "statusSonar", "statusSpecialOps", "statusWasteProcessing", "choiceAdventure2", "choiceAdventure3", "choiceAdventure4", "choiceAdventure5", "choiceAdventure6", "choiceAdventure7", "choiceAdventure8", "choiceAdventure9", "choiceAdventure10", "choiceAdventure11", "choiceAdventure12", "choiceAdventure14", "choiceAdventure15", "choiceAdventure16", "choiceAdventure17", "choiceAdventure18", "choiceAdventure19", "choiceAdventure20", "choiceAdventure21", "choiceAdventure22", "choiceAdventure23", "choiceAdventure24", "choiceAdventure25", "choiceAdventure26", "choiceAdventure27", "choiceAdventure28", "choiceAdventure29", "choiceAdventure40", "choiceAdventure41", "choiceAdventure42", "choiceAdventure45", "choiceAdventure46", "choiceAdventure47", "choiceAdventure71", "choiceAdventure72", "choiceAdventure73", "choiceAdventure74", "choiceAdventure75", "choiceAdventure76", "choiceAdventure77", "choiceAdventure86", "choiceAdventure87", "choiceAdventure88", "choiceAdventure89", "choiceAdventure90", "choiceAdventure91", "choiceAdventure105", "choiceAdventure106", "choiceAdventure107", "choiceAdventure108", "choiceAdventure109", "choiceAdventure110", "choiceAdventure111", "choiceAdventure112", "choiceAdventure113", "choiceAdventure114", "choiceAdventure115", "choiceAdventure116", "choiceAdventure117", "choiceAdventure118", "choiceAdventure120", "choiceAdventure123", "choiceAdventure125", "choiceAdventure126", "choiceAdventure127", "choiceAdventure129", "choiceAdventure131", "choiceAdventure132", "choiceAdventure135", "choiceAdventure136", "choiceAdventure137", "choiceAdventure138", "choiceAdventure139", "choiceAdventure140", "choiceAdventure141", "choiceAdventure142", "choiceAdventure143", "choiceAdventure144", "choiceAdventure145", "choiceAdventure146", "choiceAdventure147", "choiceAdventure148", "choiceAdventure149", "choiceAdventure151", "choiceAdventure152", "choiceAdventure153", "choiceAdventure154", "choiceAdventure155", "choiceAdventure156", "choiceAdventure157", "choiceAdventure158", "choiceAdventure159", "choiceAdventure160", "choiceAdventure161", "choiceAdventure162", "choiceAdventure163", "choiceAdventure164", "choiceAdventure165", "choiceAdventure166", "choiceAdventure167", "choiceAdventure168", "choiceAdventure169", "choiceAdventure170", "choiceAdventure171", "choiceAdventure172", "choiceAdventure177", "choiceAdventure178", "choiceAdventure180", "choiceAdventure181", "choiceAdventure182", "choiceAdventure184", "choiceAdventure185", "choiceAdventure186", "choiceAdventure187", "choiceAdventure188", "choiceAdventure189", "choiceAdventure191", "choiceAdventure197", "choiceAdventure198", "choiceAdventure199", "choiceAdventure200", "choiceAdventure201", "choiceAdventure202", "choiceAdventure203", "choiceAdventure204", "choiceAdventure205", "choiceAdventure206", "choiceAdventure207", "choiceAdventure208", "choiceAdventure211", "choiceAdventure212", "choiceAdventure213", "choiceAdventure214", "choiceAdventure215", "choiceAdventure216", "choiceAdventure217", "choiceAdventure218", "choiceAdventure219", "choiceAdventure220", "choiceAdventure221", "choiceAdventure222", "choiceAdventure223", "choiceAdventure224", "choiceAdventure225", "choiceAdventure230", "choiceAdventure272", "choiceAdventure273", "choiceAdventure276", "choiceAdventure277", "choiceAdventure278", "choiceAdventure279", "choiceAdventure280", "choiceAdventure281", "choiceAdventure282", "choiceAdventure283", "choiceAdventure284", "choiceAdventure285", "choiceAdventure286", "choiceAdventure287", "choiceAdventure288", "choiceAdventure289", "choiceAdventure290", "choiceAdventure291", "choiceAdventure292", "choiceAdventure293", "choiceAdventure294", "choiceAdventure295", "choiceAdventure296", "choiceAdventure297", "choiceAdventure298", "choiceAdventure299", "choiceAdventure302", "choiceAdventure303", "choiceAdventure304", "choiceAdventure305", "choiceAdventure306", "choiceAdventure307", "choiceAdventure308", "choiceAdventure309", "choiceAdventure310", "choiceAdventure311", "choiceAdventure317", "choiceAdventure318", "choiceAdventure319", "choiceAdventure320", "choiceAdventure321", "choiceAdventure322", "choiceAdventure326", "choiceAdventure327", "choiceAdventure328", "choiceAdventure329", "choiceAdventure330", "choiceAdventure331", "choiceAdventure332", "choiceAdventure333", "choiceAdventure334", "choiceAdventure335", "choiceAdventure336", "choiceAdventure337", "choiceAdventure338", "choiceAdventure339", "choiceAdventure340", "choiceAdventure341", "choiceAdventure342", "choiceAdventure343", "choiceAdventure344", "choiceAdventure345", "choiceAdventure346", "choiceAdventure347", "choiceAdventure348", "choiceAdventure349", "choiceAdventure350", "choiceAdventure351", "choiceAdventure352", "choiceAdventure353", "choiceAdventure354", "choiceAdventure355", "choiceAdventure356", "choiceAdventure357", "choiceAdventure358", "choiceAdventure360", "choiceAdventure361", "choiceAdventure362", "choiceAdventure363", "choiceAdventure364", "choiceAdventure365", "choiceAdventure366", "choiceAdventure367", "choiceAdventure372", "choiceAdventure376", "choiceAdventure387", "choiceAdventure388", "choiceAdventure389", "choiceAdventure390", "choiceAdventure391", "choiceAdventure392", "choiceAdventure393", "choiceAdventure395", "choiceAdventure396", "choiceAdventure397", "choiceAdventure398", "choiceAdventure399", "choiceAdventure400", "choiceAdventure401", "choiceAdventure402", "choiceAdventure403", "choiceAdventure423", "choiceAdventure424", "choiceAdventure425", "choiceAdventure426", "choiceAdventure427", "choiceAdventure428", "choiceAdventure429", "choiceAdventure430", "choiceAdventure431", "choiceAdventure432", "choiceAdventure433", "choiceAdventure435", "choiceAdventure438", "choiceAdventure439", "choiceAdventure442", "choiceAdventure444", "choiceAdventure445", "choiceAdventure446", "choiceAdventure447", "choiceAdventure448", "choiceAdventure449", "choiceAdventure451", "choiceAdventure452", "choiceAdventure453", "choiceAdventure454", "choiceAdventure455", "choiceAdventure456", "choiceAdventure457", "choiceAdventure458", "choiceAdventure460", "choiceAdventure461", "choiceAdventure462", "choiceAdventure463", "choiceAdventure464", "choiceAdventure465", "choiceAdventure467", "choiceAdventure468", "choiceAdventure469", "choiceAdventure470", "choiceAdventure471", "choiceAdventure472", "choiceAdventure473", "choiceAdventure474", "choiceAdventure475", "choiceAdventure477", "choiceAdventure478", "choiceAdventure480", "choiceAdventure483", "choiceAdventure484", "choiceAdventure485", "choiceAdventure486", "choiceAdventure488", "choiceAdventure489", "choiceAdventure490", "choiceAdventure491", "choiceAdventure496", "choiceAdventure497", "choiceAdventure502", "choiceAdventure503", "choiceAdventure504", "choiceAdventure505", "choiceAdventure506", "choiceAdventure507", "choiceAdventure509", "choiceAdventure510", "choiceAdventure511", "choiceAdventure512", "choiceAdventure513", "choiceAdventure514", "choiceAdventure515", "choiceAdventure517", "choiceAdventure518", "choiceAdventure519", "choiceAdventure521", "choiceAdventure522", "choiceAdventure523", "choiceAdventure527", "choiceAdventure528", "choiceAdventure529", "choiceAdventure530", "choiceAdventure531", "choiceAdventure532", "choiceAdventure533", "choiceAdventure534", "choiceAdventure535", "choiceAdventure536", "choiceAdventure538", "choiceAdventure539", "choiceAdventure542", "choiceAdventure543", "choiceAdventure544", "choiceAdventure546", "choiceAdventure548", "choiceAdventure549", "choiceAdventure550", "choiceAdventure551", "choiceAdventure552", "choiceAdventure553", "choiceAdventure554", "choiceAdventure556", "choiceAdventure557", "choiceAdventure558", "choiceAdventure559", "choiceAdventure560", "choiceAdventure561", "choiceAdventure562", "choiceAdventure563", "choiceAdventure564", "choiceAdventure565", "choiceAdventure566", "choiceAdventure567", "choiceAdventure568", "choiceAdventure569", "choiceAdventure571", "choiceAdventure572", "choiceAdventure573", "choiceAdventure574", "choiceAdventure575", "choiceAdventure576", "choiceAdventure577", "choiceAdventure578", "choiceAdventure579", "choiceAdventure581", "choiceAdventure582", "choiceAdventure583", "choiceAdventure584", "choiceAdventure594", "choiceAdventure595", "choiceAdventure596", "choiceAdventure597", "choiceAdventure598", "choiceAdventure599", "choiceAdventure600", "choiceAdventure603", "choiceAdventure604", "choiceAdventure616", "choiceAdventure634", "choiceAdventure640", "choiceAdventure654", "choiceAdventure655", "choiceAdventure656", "choiceAdventure657", "choiceAdventure658", "choiceAdventure664", "choiceAdventure669", "choiceAdventure670", "choiceAdventure671", "choiceAdventure672", "choiceAdventure673", "choiceAdventure674", "choiceAdventure675", "choiceAdventure676", "choiceAdventure677", "choiceAdventure678", "choiceAdventure679", "choiceAdventure681", "choiceAdventure683", "choiceAdventure684", "choiceAdventure685", "choiceAdventure686", "choiceAdventure687", "choiceAdventure688", "choiceAdventure689", "choiceAdventure690", "choiceAdventure691", "choiceAdventure692", "choiceAdventure693", "choiceAdventure694", "choiceAdventure695", "choiceAdventure696", "choiceAdventure697", "choiceAdventure698", "choiceAdventure700", "choiceAdventure701", "choiceAdventure705", "choiceAdventure706", "choiceAdventure707", "choiceAdventure708", "choiceAdventure709", "choiceAdventure710", "choiceAdventure711", "choiceAdventure712", "choiceAdventure713", "choiceAdventure714", "choiceAdventure715", "choiceAdventure716", "choiceAdventure717", "choiceAdventure721", "choiceAdventure725", "choiceAdventure729", "choiceAdventure733", "choiceAdventure737", "choiceAdventure741", "choiceAdventure745", "choiceAdventure749", "choiceAdventure753", "choiceAdventure771", "choiceAdventure778", "choiceAdventure780", "choiceAdventure781", "choiceAdventure783", "choiceAdventure784", "choiceAdventure785", "choiceAdventure786", "choiceAdventure787", "choiceAdventure788", "choiceAdventure789", "choiceAdventure791", "choiceAdventure793", "choiceAdventure794", "choiceAdventure795", "choiceAdventure796", "choiceAdventure797", "choiceAdventure805", "choiceAdventure808", "choiceAdventure809", "choiceAdventure813", "choiceAdventure815", "choiceAdventure830", "choiceAdventure832", "choiceAdventure833", "choiceAdventure834", "choiceAdventure835", "choiceAdventure837", "choiceAdventure838", "choiceAdventure839", "choiceAdventure840", "choiceAdventure841", "choiceAdventure842", "choiceAdventure851", "choiceAdventure852", "choiceAdventure853", "choiceAdventure854", "choiceAdventure855", "choiceAdventure856", "choiceAdventure857", "choiceAdventure858", "choiceAdventure866", "choiceAdventure873", "choiceAdventure875", "choiceAdventure876", "choiceAdventure877", "choiceAdventure878", "choiceAdventure879", "choiceAdventure880", "choiceAdventure881", "choiceAdventure882", "choiceAdventure888", "choiceAdventure889", "choiceAdventure918", "choiceAdventure919", "choiceAdventure920", "choiceAdventure921", "choiceAdventure923", "choiceAdventure924", "choiceAdventure925", "choiceAdventure926", "choiceAdventure927", "choiceAdventure928", "choiceAdventure929", "choiceAdventure930", "choiceAdventure931", "choiceAdventure932", "choiceAdventure940", "choiceAdventure941", "choiceAdventure942", "choiceAdventure943", "choiceAdventure944", "choiceAdventure945", "choiceAdventure946", "choiceAdventure950", "choiceAdventure955", "choiceAdventure957", "choiceAdventure958", "choiceAdventure959", "choiceAdventure960", "choiceAdventure961", "choiceAdventure962", "choiceAdventure963", "choiceAdventure964", "choiceAdventure965", "choiceAdventure966", "choiceAdventure970", "choiceAdventure973", "choiceAdventure974", "choiceAdventure975", "choiceAdventure976", "choiceAdventure977", "choiceAdventure979", "choiceAdventure980", "choiceAdventure981", "choiceAdventure982", "choiceAdventure983", "choiceAdventure988", "choiceAdventure989", "choiceAdventure993", "choiceAdventure998", "choiceAdventure1000", "choiceAdventure1003", "choiceAdventure1005", "choiceAdventure1006", "choiceAdventure1007", "choiceAdventure1008", "choiceAdventure1009", "choiceAdventure1010", "choiceAdventure1011", "choiceAdventure1012", "choiceAdventure1013", "choiceAdventure1015", "choiceAdventure1016", "choiceAdventure1017", "choiceAdventure1018", "choiceAdventure1019", "choiceAdventure1020", "choiceAdventure1021", "choiceAdventure1022", "choiceAdventure1023", "choiceAdventure1026", "choiceAdventure1027", "choiceAdventure1028", "choiceAdventure1029", "choiceAdventure1030", "choiceAdventure1031", "choiceAdventure1032", "choiceAdventure1033", "choiceAdventure1034", "choiceAdventure1035", "choiceAdventure1036", "choiceAdventure1037", "choiceAdventure1038", "choiceAdventure1039", "choiceAdventure1040", "choiceAdventure1041", "choiceAdventure1042", "choiceAdventure1044", "choiceAdventure1045", "choiceAdventure1046", "choiceAdventure1048", "choiceAdventure1051", "choiceAdventure1052", "choiceAdventure1053", "choiceAdventure1054", "choiceAdventure1055", "choiceAdventure1056", "choiceAdventure1057", "choiceAdventure1059", "choiceAdventure1060", "choiceAdventure1061", "choiceAdventure1062", "choiceAdventure1065", "choiceAdventure1067", "choiceAdventure1068", "choiceAdventure1069", "choiceAdventure1070", "choiceAdventure1071", "choiceAdventure1073", "choiceAdventure1077", "choiceAdventure1080", "choiceAdventure1081", "choiceAdventure1082", "choiceAdventure1083", "choiceAdventure1084", "choiceAdventure1085", "choiceAdventure1091", "choiceAdventure1094", "choiceAdventure1095", "choiceAdventure1096", "choiceAdventure1097", "choiceAdventure1102", "choiceAdventure1106", "choiceAdventure1107", "choiceAdventure1108", "choiceAdventure1110", "choiceAdventure1114", "choiceAdventure1115", "choiceAdventure1116", "choiceAdventure1118", "choiceAdventure1119", "choiceAdventure1120", "choiceAdventure1121", "choiceAdventure1122", "choiceAdventure1123", "choiceAdventure1171", "choiceAdventure1172", "choiceAdventure1173", "choiceAdventure1174", "choiceAdventure1175", "choiceAdventure1193", "choiceAdventure1195", "choiceAdventure1196", "choiceAdventure1197", "choiceAdventure1198", "choiceAdventure1199", "choiceAdventure1202", "choiceAdventure1203", "choiceAdventure1204", "choiceAdventure1205", "choiceAdventure1206", "choiceAdventure1207", "choiceAdventure1208", "choiceAdventure1209", "choiceAdventure1210", "choiceAdventure1211", "choiceAdventure1212", "choiceAdventure1213", "choiceAdventure1214", "choiceAdventure1215", "choiceAdventure1219", "choiceAdventure1222", "choiceAdventure1223", "choiceAdventure1224", "choiceAdventure1225", "choiceAdventure1226", "choiceAdventure1227", "choiceAdventure1228", "choiceAdventure1229", "choiceAdventure1236", "choiceAdventure1237", "choiceAdventure1238", "choiceAdventure1239", "choiceAdventure1240", "choiceAdventure1241", "choiceAdventure1242", "choiceAdventure1243", "choiceAdventure1244", "choiceAdventure1245", "choiceAdventure1246", "choiceAdventure1247", "choiceAdventure1248", "choiceAdventure1249", "choiceAdventure1250", "choiceAdventure1251", "choiceAdventure1252", "choiceAdventure1253", "choiceAdventure1254", "choiceAdventure1255", "choiceAdventure1256", "choiceAdventure1266", "choiceAdventure1280", "choiceAdventure1281", "choiceAdventure1282", "choiceAdventure1283", "choiceAdventure1284", "choiceAdventure1285", "choiceAdventure1286", "choiceAdventure1287", "choiceAdventure1288", "choiceAdventure1289", "choiceAdventure1290", "choiceAdventure1291", "choiceAdventure1292", "choiceAdventure1293", "choiceAdventure1294", "choiceAdventure1295", "choiceAdventure1296", "choiceAdventure1297", "choiceAdventure1298", "choiceAdventure1299", "choiceAdventure1300", "choiceAdventure1301", "choiceAdventure1302", "choiceAdventure1303", "choiceAdventure1304", "choiceAdventure1305", "choiceAdventure1307", "choiceAdventure1310", "choiceAdventure1312", "choiceAdventure1313", "choiceAdventure1314", "choiceAdventure1315", "choiceAdventure1316", "choiceAdventure1317", "choiceAdventure1318", "choiceAdventure1319", "choiceAdventure1321", "choiceAdventure1322", "choiceAdventure1323", "choiceAdventure1324", "choiceAdventure1325", "choiceAdventure1326", "choiceAdventure1327", "choiceAdventure1328", "choiceAdventure1332", "choiceAdventure1333", "choiceAdventure1335", "choiceAdventure1340", "choiceAdventure1341", "choiceAdventure1345", "choiceAdventure1389", "choiceAdventure1392", "choiceAdventure1399", "choiceAdventure1405", "choiceAdventure1411", "choiceAdventure1415", "choiceAdventure1460", "choiceAdventure1461"];
var familiarProperties = ["commaFamiliar", "nextQuantumFamiliar", "preBlackbirdFamiliar"];
var statProperties = ["nsChallenge1", "snojoSetting"];
var phylumProperties = ["dnaSyringe", "locketPhylum", "redSnapperPhylum"];
;// CONCATENATED MODULE: ./node_modules/libram/dist/propertyTyping.js

var booleanPropertiesSet = new Set(booleanProperties);
var numericPropertiesSet = new Set(numericProperties);
var numericOrStringPropertiesSet = new Set(numericOrStringProperties);
var stringPropertiesSet = new Set(stringProperties);
var locationPropertiesSet = new Set(locationProperties);
var monsterPropertiesSet = new Set(monsterProperties);
var familiarPropertiesSet = new Set(familiarProperties);
var statPropertiesSet = new Set(statProperties);
var phylumPropertiesSet = new Set(phylumProperties);
function isBooleanProperty(property) {
  return booleanPropertiesSet.has(property);
}
function isNumericProperty(property) {
  return numericPropertiesSet.has(property);
}
function isNumericOrStringProperty(property) {
  return numericOrStringPropertiesSet.has(property);
}
function isStringProperty(property) {
  return stringPropertiesSet.has(property);
}
function isLocationProperty(property) {
  return locationPropertiesSet.has(property);
}
function isMonsterProperty(property) {
  return monsterPropertiesSet.has(property);
}
function isFamiliarProperty(property) {
  return familiarPropertiesSet.has(property);
}
function isStatProperty(property) {
  return statPropertiesSet.has(property);
}
function isPhylumProperty(property) {
  return phylumPropertiesSet.has(property);
}
;// CONCATENATED MODULE: ./node_modules/libram/dist/property.js
function property_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function property_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function property_createClass(Constructor, protoProps, staticProps) { if (protoProps) property_defineProperties(Constructor.prototype, protoProps); if (staticProps) property_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function property_slicedToArray(arr, i) { return property_arrayWithHoles(arr) || property_iterableToArrayLimit(arr, i) || property_unsupportedIterableToArray(arr, i) || property_nonIterableRest(); }

function property_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function property_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return property_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return property_arrayLikeToArray(o, minLen); }

function property_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function property_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function property_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }






var createPropertyGetter = transform => (property, default_) => {
  var value = (0,external_kolmafia_namespaceObject.getProperty)(property);

  if (default_ !== undefined && value === "") {
    return default_;
  }

  return transform(value, property);
};

var createMafiaClassPropertyGetter = (Type, toType) => createPropertyGetter(value => {
  if (value === "") return null;
  var v = toType(value);
  return v === Type.get("none") ? null : v;
});

var getString = createPropertyGetter(value => value);
var getCommaSeparated = createPropertyGetter(value => value.split(/, ?/));
var getBoolean = createPropertyGetter(value => value === "true");
var getNumber = createPropertyGetter(value => Number(value));
var getBounty = createMafiaClassPropertyGetter(external_kolmafia_namespaceObject.Bounty, external_kolmafia_namespaceObject.toBounty);
var getClass = createMafiaClassPropertyGetter(external_kolmafia_namespaceObject.Class, external_kolmafia_namespaceObject.toClass);
var getCoinmaster = createMafiaClassPropertyGetter(external_kolmafia_namespaceObject.Coinmaster, external_kolmafia_namespaceObject.toCoinmaster);
var property_getEffect = createMafiaClassPropertyGetter(external_kolmafia_namespaceObject.Effect, external_kolmafia_namespaceObject.toEffect);
var getElement = createMafiaClassPropertyGetter(external_kolmafia_namespaceObject.Element, external_kolmafia_namespaceObject.toElement);
var getFamiliar = createMafiaClassPropertyGetter(external_kolmafia_namespaceObject.Familiar, external_kolmafia_namespaceObject.toFamiliar);
var getItem = createMafiaClassPropertyGetter(external_kolmafia_namespaceObject.Item, external_kolmafia_namespaceObject.toItem);
var getLocation = createMafiaClassPropertyGetter(external_kolmafia_namespaceObject.Location, external_kolmafia_namespaceObject.toLocation);
var getMonster = createMafiaClassPropertyGetter(external_kolmafia_namespaceObject.Monster, external_kolmafia_namespaceObject.toMonster);
var getPhylum = createMafiaClassPropertyGetter(external_kolmafia_namespaceObject.Phylum, external_kolmafia_namespaceObject.toPhylum);
var getServant = createMafiaClassPropertyGetter(external_kolmafia_namespaceObject.Servant, external_kolmafia_namespaceObject.toServant);
var getSkill = createMafiaClassPropertyGetter(external_kolmafia_namespaceObject.Skill, external_kolmafia_namespaceObject.toSkill);
var getSlot = createMafiaClassPropertyGetter(external_kolmafia_namespaceObject.Slot, external_kolmafia_namespaceObject.toSlot);
var getStat = createMafiaClassPropertyGetter(external_kolmafia_namespaceObject.Stat, external_kolmafia_namespaceObject.toStat);
var getThrall = createMafiaClassPropertyGetter(external_kolmafia_namespaceObject.Thrall, external_kolmafia_namespaceObject.toThrall);
function property_get(property, _default) {
  var value = getString(property); // Handle known properties.

  if (isBooleanProperty(property)) {
    var _getBoolean;

    return (_getBoolean = getBoolean(property, _default)) !== null && _getBoolean !== void 0 ? _getBoolean : false;
  } else if (isNumericProperty(property)) {
    var _getNumber;

    return (_getNumber = getNumber(property, _default)) !== null && _getNumber !== void 0 ? _getNumber : 0;
  } else if (isNumericOrStringProperty(property)) {
    return value.match(/^\d+$/) ? parseInt(value) : value;
  } else if (isLocationProperty(property)) {
    return getLocation(property, _default);
  } else if (isMonsterProperty(property)) {
    return getMonster(property, _default);
  } else if (isFamiliarProperty(property)) {
    return getFamiliar(property, _default);
  } else if (isStatProperty(property)) {
    return getStat(property, _default);
  } else if (isPhylumProperty(property)) {
    return getPhylum(property, _default);
  } else if (isStringProperty(property)) {
    return value;
  } // Not a KnownProperty from here on out.


  if (_default instanceof external_kolmafia_namespaceObject.Location) {
    return getLocation(property, _default);
  } else if (_default instanceof external_kolmafia_namespaceObject.Monster) {
    return getMonster(property, _default);
  } else if (_default instanceof external_kolmafia_namespaceObject.Familiar) {
    return getFamiliar(property, _default);
  } else if (_default instanceof external_kolmafia_namespaceObject.Stat) {
    return getStat(property, _default);
  } else if (_default instanceof external_kolmafia_namespaceObject.Phylum) {
    return getPhylum(property, _default);
  } else if (typeof _default === "boolean") {
    return value === "true" ? true : value === "false" ? false : _default;
  } else if (typeof _default === "number") {
    return value === "" ? _default : parseInt(value);
  } else if (value === "") {
    return _default === undefined ? "" : _default;
  } else {
    return value;
  }
} // eslint-disable-next-line @typescript-eslint/no-explicit-any

function _set(property, value) {
  var stringValue = value === null ? "" : value.toString();
  (0,external_kolmafia_namespaceObject.setProperty)(property, stringValue);
}


function setProperties(properties) {
  for (var _i = 0, _Object$entries = Object.entries(properties); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = property_slicedToArray(_Object$entries[_i], 2),
        prop = _Object$entries$_i[0],
        value = _Object$entries$_i[1];

    _set(prop, value);
  }
}
function withProperties(properties, callback) {
  var propertiesBackup = Object.fromEntries(Object.entries(properties).map(_ref => {
    var _ref2 = property_slicedToArray(_ref, 1),
        prop = _ref2[0];

    return [prop, property_get(prop)];
  }));
  setProperties(properties);

  try {
    callback();
  } finally {
    setProperties(propertiesBackup);
  }
}
function withProperty(property, value, callback) {
  withProperties(_defineProperty({}, property, value), callback);
}
function withChoices(choices, callback) {
  var properties = Object.fromEntries(Object.entries(choices).map(_ref3 => {
    var _ref4 = property_slicedToArray(_ref3, 2),
        choice = _ref4[0],
        option = _ref4[1];

    return ["choiceAdventure".concat(choice), option];
  }));
  withProperties(properties, callback);
}
function withChoice(choice, value, callback) {
  withChoices(_defineProperty({}, choice, value), callback);
}
var PropertiesManager = /*#__PURE__*/(/* unused pure expression or super */ null && (function () {
  function PropertiesManager() {
    property_classCallCheck(this, PropertiesManager);

    _defineProperty(this, "properties", {});
  }

  property_createClass(PropertiesManager, [{
    key: "storedValues",
    get: function get() {
      return this.properties;
    }
    /**
     * Sets a collection of properties to the given values, storing the old values.
     * @param propertiesToSet A Properties object, keyed by property name.
     */

  }, {
    key: "set",
    value: function set(propertiesToSet) {
      for (var _i2 = 0, _Object$entries2 = Object.entries(propertiesToSet); _i2 < _Object$entries2.length; _i2++) {
        var _Object$entries2$_i = property_slicedToArray(_Object$entries2[_i2], 2),
            propertyName = _Object$entries2$_i[0],
            propertyValue = _Object$entries2$_i[1];

        if (this.properties[propertyName] === undefined) {
          this.properties[propertyName] = property_get(propertyName);
        }

        _set(propertyName, propertyValue);
      }
    }
    /**
     * Sets a collection of choice adventure properties to the given values, storing the old values.
     * @param choicesToSet An object keyed by choice adventure number.
     */

  }, {
    key: "setChoices",
    value: function setChoices(choicesToSet) {
      this.set(Object.fromEntries(Object.entries(choicesToSet).map(_ref5 => {
        var _ref6 = property_slicedToArray(_ref5, 2),
            choiceNumber = _ref6[0],
            choiceValue = _ref6[1];

        return ["choiceAdventure".concat(choiceNumber), choiceValue];
      })));
    }
    /**
     * Resets the given properties to their original stored value. Does not delete entries from the manager.
     * @param properties Collection of properties to reset.
     */

  }, {
    key: "reset",
    value: function reset() {
      for (var _len = arguments.length, properties = new Array(_len), _key = 0; _key < _len; _key++) {
        properties[_key] = arguments[_key];
      }

      for (var _i3 = 0, _properties = properties; _i3 < _properties.length; _i3++) {
        var property = _properties[_i3];
        var value = this.properties[property];

        if (value) {
          _set(property, value);
        }
      }
    }
    /**
     * Iterates over all stored values, setting each property back to its original stored value. Does not delete entries from the manager.
     */

  }, {
    key: "resetAll",
    value: function resetAll() {
      setProperties(this.properties);
    }
    /**
     * Stops storing the original values of inputted properties.
     * @param properties Properties for the manager to forget.
     */

  }, {
    key: "clear",
    value: function clear() {
      for (var _len2 = arguments.length, properties = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        properties[_key2] = arguments[_key2];
      }

      for (var _i4 = 0, _properties2 = properties; _i4 < _properties2.length; _i4++) {
        var property = _properties2[_i4];

        if (this.properties[property]) {
          delete this.properties[property];
        }
      }
    }
    /**
     * Clears all properties.
     */

  }, {
    key: "clearAll",
    value: function clearAll() {
      this.properties = {};
    }
    /**
     * Increases a numeric property to the given value if necessary.
     * @param property The numeric property we want to potentially raise.
     * @param value The minimum value we want that property to have.
     * @returns Whether we needed to change the property.
     */

  }, {
    key: "setMinimumValue",
    value: function setMinimumValue(property, value) {
      if (property_get(property, 0) < value) {
        this.set(_defineProperty({}, property, value));
        return true;
      }

      return false;
    }
    /**
     * Decrease a numeric property to the given value if necessary.
     * @param property The numeric property we want to potentially lower.
     * @param value The maximum value we want that property to have.
     * @returns Whether we needed to change the property.
     */

  }, {
    key: "setMaximumValue",
    value: function setMaximumValue(property, value) {
      if (property_get(property, 0) > value) {
        this.set(_defineProperty({}, property, value));
        return true;
      }

      return false;
    }
  }]);

  return PropertiesManager;
}()));
;// CONCATENATED MODULE: ./node_modules/libram/dist/combat.js
var combat_templateObject, combat_templateObject2;

function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = combat_getPrototypeOf(object); if (object === null) break; } return object; }

function combat_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = combat_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || combat_unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function combat_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return combat_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return combat_arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return combat_arrayLikeToArray(arr); }

function combat_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function combat_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function combat_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function combat_createClass(Constructor, protoProps, staticProps) { if (protoProps) combat_defineProperties(Constructor.prototype, protoProps); if (staticProps) combat_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function combat_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function combat_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) combat_setPrototypeOf(subClass, superClass); }

function combat_createSuper(Derived) { var hasNativeReflectConstruct = combat_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = combat_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = combat_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return combat_possibleConstructorReturn(this, result); }; }

function combat_possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return combat_assertThisInitialized(self); }

function combat_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function combat_wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; combat_wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !combat_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return combat_construct(Class, arguments, combat_getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return combat_setPrototypeOf(Wrapper, Class); }; return combat_wrapNativeSuper(Class); }

function combat_construct(Parent, args, Class) { if (combat_isNativeReflectConstruct()) { combat_construct = Reflect.construct; } else { combat_construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) combat_setPrototypeOf(instance, Class.prototype); return instance; }; } return combat_construct.apply(null, arguments); }

function combat_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function combat_isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function combat_setPrototypeOf(o, p) { combat_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return combat_setPrototypeOf(o, p); }

function combat_getPrototypeOf(o) { combat_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return combat_getPrototypeOf(o); }

function combat_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }





var MACRO_NAME = "Script Autoattack Macro";
/**
 * Get the KoL native ID of the macro with name name.
 *
 * @category Combat
 * @returns {number} The macro ID.
 */

function getMacroId() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : MACRO_NAME;
  var macroMatches = (0,external_kolmafia_namespaceObject.xpath)((0,external_kolmafia_namespaceObject.visitUrl)("account_combatmacros.php"), "//select[@name=\"macroid\"]/option[text()=\"".concat(name, "\"]/@value"));

  if (macroMatches.length === 0) {
    (0,external_kolmafia_namespaceObject.visitUrl)("account_combatmacros.php?action=new");
    var newMacroText = (0,external_kolmafia_namespaceObject.visitUrl)("account_combatmacros.php?macroid=0&name=".concat(name, "&macrotext=abort&action=save"));
    return parseInt((0,external_kolmafia_namespaceObject.xpath)(newMacroText, "//input[@name=macroid]/@value")[0], 10);
  } else {
    return parseInt(macroMatches[0], 10);
  }
}

function itemOrNameToItem(itemOrName) {
  return typeof itemOrName === "string" ? external_kolmafia_namespaceObject.Item.get(itemOrName) : itemOrName;
}

var substringCombatItems = template_string_$items(combat_templateObject || (combat_templateObject = combat_taggedTemplateLiteral(["spider web, really sticky spider web, dictionary, NG, Cloaca-Cola, yo-yo, top, ball, kite, yo, red potion, blue potion, adder, red button, pile of sand, mushroom, deluxe mushroom"])));
var substringCombatSkills = $skills(combat_templateObject2 || (combat_templateObject2 = combat_taggedTemplateLiteral(["Shoot, Thrust-Smack, Headbutt, Toss, Sing, Disarm, LIGHT, BURN, Extract, Meteor Shower, Cleave, Boil, Slice, Rainbow"])));

function itemOrItemsBallsMacroName(itemOrItems) {
  if (Array.isArray(itemOrItems)) {
    return itemOrItems.map(itemOrItemsBallsMacroName).join(", ");
  } else {
    var item = itemOrNameToItem(itemOrItems);
    return !substringCombatItems.includes(item) ? item.name : (0,external_kolmafia_namespaceObject.toInt)(item).toString();
  }
}

function itemOrItemsBallsMacroPredicate(itemOrItems) {
  if (Array.isArray(itemOrItems)) {
    return itemOrItems.map(itemOrItemsBallsMacroPredicate).join(" && ");
  } else {
    return "hascombatitem ".concat(itemOrItems);
  }
}

function skillOrNameToSkill(skillOrName) {
  if (typeof skillOrName === "string") {
    return external_kolmafia_namespaceObject.Skill.get(skillOrName);
  } else {
    return skillOrName;
  }
}

function skillBallsMacroName(skillOrName) {
  var skill = skillOrNameToSkill(skillOrName);
  return skill.name.match(/^[A-Za-z ]+$/) && !substringCombatSkills.includes(skill) ? skill.name : (0,external_kolmafia_namespaceObject.toInt)(skill);
}

var InvalidMacroError = /*#__PURE__*/function (_Error) {
  combat_inherits(InvalidMacroError, _Error);

  var _super = combat_createSuper(InvalidMacroError);

  function InvalidMacroError() {
    combat_classCallCheck(this, InvalidMacroError);

    return _super.apply(this, arguments);
  }

  return combat_createClass(InvalidMacroError);
}( /*#__PURE__*/combat_wrapNativeSuper(Error));
/**
 * BALLS macro builder for direct submission to KoL.
 * Create a new macro with `new Macro()` and add steps using the instance methods.
 * Uses a fluent interface, so each step returns the object for easy chaining of steps.
 * Each method is also defined as a static method that creates a new Macro with only that step.
 * For example, you can do `Macro.skill('Saucestorm').attack()`.
 */

var Macro = /*#__PURE__*/function () {
  function Macro() {
    combat_classCallCheck(this, Macro);

    combat_defineProperty(this, "components", []);

    combat_defineProperty(this, "name", MACRO_NAME);
  }

  combat_createClass(Macro, [{
    key: "toString",
    value:
    /**
     * Convert macro to string.
     */
    function toString() {
      return this.components.join(";");
    }
    /**
     * Gives your macro a new name to be used when saving an autoattack.
     * @param name The name to be used when saving as an autoattack.
     * @returns The previous name assigned to this macro.
     */

  }, {
    key: "rename",
    value: function rename(name) {
      var returnValue = this.name;
      this.name = name;
      return returnValue;
    }
    /**
     * Save a macro to a Mafia property for use in a consult script.
     */

  }, {
    key: "save",
    value: function save() {
      _set(Macro.SAVED_MACRO_PROPERTY, this.toString());
    }
    /**
     * Load a saved macro from the Mafia property.
     */

  }, {
    key: "step",
    value:
    /**
     * Statefully add one or several steps to a macro.
     * @param nextSteps The steps to add to the macro.
     * @returns {Macro} This object itself.
     */
    function step() {
      var _ref;

      for (var _len = arguments.length, nextSteps = new Array(_len), _key = 0; _key < _len; _key++) {
        nextSteps[_key] = arguments[_key];
      }

      var nextStepsStrings = (_ref = []).concat.apply(_ref, _toConsumableArray(nextSteps.map(x => x instanceof Macro ? x.components : [x])));

      this.components = [].concat(_toConsumableArray(this.components), _toConsumableArray(nextStepsStrings.filter(s => s.length > 0)));
      return this;
    }
    /**
     * Statefully add one or several steps to a macro.
     * @param nextSteps The steps to add to the macro.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "submit",
    value:
    /**
     * Submit the built macro to KoL. Only works inside combat.
     */
    function submit() {
      var final = this.toString();
      return (0,external_kolmafia_namespaceObject.visitUrl)("fight.php?action=macro&macrotext=".concat((0,external_kolmafia_namespaceObject.urlEncode)(final)), true, true);
    }
    /**
     * Set this macro as a KoL native autoattack.
     */

  }, {
    key: "setAutoAttack",
    value: function setAutoAttack() {
      var id = Macro.cachedMacroIds.get(this.name);

      if (id === undefined) {
        id = getMacroId(this.name);
        Macro.cachedMacroIds.set(this.name, id);
      }

      if ((0,external_kolmafia_namespaceObject.getAutoAttack)() === 99000000 + id && this.toString() === Macro.cachedAutoAttacks.get(this.name)) {
        // This macro is already set. Don"t make the server request.
        return;
      }

      (0,external_kolmafia_namespaceObject.visitUrl)("account_combatmacros.php?macroid=".concat(id, "&name=").concat((0,external_kolmafia_namespaceObject.urlEncode)(this.name), "&macrotext=").concat((0,external_kolmafia_namespaceObject.urlEncode)(this.toString()), "&action=save"), true, true);
      (0,external_kolmafia_namespaceObject.visitUrl)("account.php?am=1&action=autoattack&value=".concat(99000000 + id, "&ajax=1"));
      Macro.cachedAutoAttacks.set(this.name, this.toString());
    }
    /**
     * Renames the macro, then sets it as an autoattack.
     * @param name The name to save the macro under as an autoattack.
     */

  }, {
    key: "setAutoAttackAs",
    value: function setAutoAttackAs(name) {
      this.name = name;
      this.setAutoAttack();
    }
    /**
     * Clear all cached autoattacks, and delete all stored macros server-side.
     */

  }, {
    key: "abort",
    value:
    /**
     * Add an "abort" step to this macro.
     * @returns {Macro} This object itself.
     */
    function abort() {
      return this.step("abort");
    }
    /**
     * Create a new macro with an "abort" step.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "runaway",
    value:
    /**
     * Add a "runaway" step to this macro.
     * @returns {Macro} This object itself.
     */
    function runaway() {
      return this.step("runaway");
    }
    /**
     * Create a new macro with an "runaway" step.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "if_",
    value:
    /**
     * Add an "if" statement to this macro.
     * @param condition The BALLS condition for the if statement.
     * @param ifTrue Continuation if the condition is true.
     * @returns {Macro} This object itself.
     */
    function if_(condition, ifTrue) {
      var ballsCondition = "";

      if (condition instanceof external_kolmafia_namespaceObject.Monster) {
        ballsCondition = "monsterid ".concat(condition.id);
      } else if (condition instanceof external_kolmafia_namespaceObject.Effect) {
        ballsCondition = "haseffect ".concat((0,external_kolmafia_namespaceObject.toInt)(condition));
      } else if (condition instanceof external_kolmafia_namespaceObject.Skill) {
        ballsCondition = "hasskill ".concat(skillBallsMacroName(condition));
      } else if (condition instanceof external_kolmafia_namespaceObject.Item) {
        if (!condition.combat) {
          throw new InvalidMacroError("Item ".concat(condition, " cannot be made a valid BALLS predicate (it is not combat-usable)"));
        }

        ballsCondition = "hascombatitem ".concat(itemOrItemsBallsMacroName(condition));
      } else if (condition instanceof external_kolmafia_namespaceObject.Location) {
        var snarfblat = condition.id;

        if (snarfblat < 1) {
          throw new InvalidMacroError("Location ".concat(condition, " cannot be made a valid BALLS predicate (it has no location id)"));
        }

        ballsCondition = "snarfblat ".concat(snarfblat);
      } else if (condition instanceof external_kolmafia_namespaceObject.Class) {
        if ((0,external_kolmafia_namespaceObject.toInt)(condition) > 6) {
          throw new InvalidMacroError("Class ".concat(condition, " cannot be made a valid BALLS predicate (it is not a standard class)"));
        }

        ballsCondition = condition.toString().replaceAll(" ", "").toLowerCase();
      } else if (condition instanceof external_kolmafia_namespaceObject.Stat) {
        ballsCondition = "".concat(condition.toString().toLowerCase(), "class");
      } else {
        ballsCondition = condition;
      }

      return this.step("if ".concat(ballsCondition)).step(ifTrue).step("endif");
    }
    /**
     * Create a new macro with an "if" statement.
     * @param condition The BALLS condition for the if statement.
     * @param ifTrue Continuation if the condition is true.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "while_",
    value:
    /**
     * Add a "while" statement to this macro.
     * @param condition The BALLS condition for the if statement.
     * @param contents Loop to repeat while the condition is true.
     * @returns {Macro} This object itself.
     */
    function while_(condition, contents) {
      return this.step("while ".concat(condition)).step(contents).step("endwhile");
    }
    /**
     * Create a new macro with a "while" statement.
     * @param condition The BALLS condition for the if statement.
     * @param contents Loop to repeat while the condition is true.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "externalIf",
    value:
    /**
     * Conditionally add a step to a macro based on a condition evaluated at the time of building the macro.
     * @param condition The JS condition.
     * @param ifTrue Continuation to add if the condition is true.
     * @param ifFalse Optional input to turn this into an if...else statement.
     * @returns {Macro} This object itself.
     */
    function externalIf(condition, ifTrue, ifFalse) {
      if (condition) return this.step(ifTrue);else if (ifFalse) return this.step(ifFalse);else return this;
    }
    /**
     * Create a new macro with a condition evaluated at the time of building the macro.
     * @param condition The JS condition.
     * @param ifTrue Continuation to add if the condition is true.
     * @param ifFalse Optional input to turn this into an if...else statement.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "repeat",
    value:
    /**
     * Add a repeat step to the macro.
     * @returns {Macro} This object itself.
     */
    function repeat() {
      return this.step("repeat");
    }
    /**
     * Add one or more skill cast steps to the macro.
     * @param skills Skills to cast.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "skill",
    value: function skill() {
      for (var _len2 = arguments.length, skills = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        skills[_key2] = arguments[_key2];
      }

      return this.step.apply(this, _toConsumableArray(skills.map(skill => {
        return "skill ".concat(skillBallsMacroName(skill));
      })));
    }
    /**
     * Create a new macro with one or more skill cast steps.
     * @param skills Skills to cast.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "trySkill",
    value:
    /**
     * Add one or more skill cast steps to the macro, where each step checks if you have the skill first.
     * @param skills Skills to try casting.
     * @returns {Macro} This object itself.
     */
    function trySkill() {
      for (var _len3 = arguments.length, skills = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        skills[_key3] = arguments[_key3];
      }

      return this.step.apply(this, _toConsumableArray(skills.map(skill => {
        return Macro.if_("hasskill ".concat(skillBallsMacroName(skill)), Macro.skill(skill));
      })));
    }
    /**
     * Create a new macro with one or more skill cast steps, where each step checks if you have the skill first.
     * @param skills Skills to try casting.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "trySkillRepeat",
    value:
    /**
     * Add one or more skill-cast-and-repeat steps to the macro, where each step checks if you have the skill first.
     * @param skills Skills to try repeatedly casting.
     * @returns {Macro} This object itself.
     */
    function trySkillRepeat() {
      for (var _len4 = arguments.length, skills = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        skills[_key4] = arguments[_key4];
      }

      return this.step.apply(this, _toConsumableArray(skills.map(skill => {
        return Macro.if_("hasskill ".concat(skillBallsMacroName(skill)), Macro.skill(skill).repeat());
      })));
    }
    /**
     * Create a new macro with one or more skill-cast-and-repeat steps, where each step checks if you have the skill first.
     * @param skills Skills to try repeatedly casting.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "item",
    value:
    /**
     * Add one or more item steps to the macro.
     * @param items Items to use. Pass a tuple [item1, item2] to funksling.
     * @returns {Macro} This object itself.
     */
    function item() {
      for (var _len5 = arguments.length, items = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        items[_key5] = arguments[_key5];
      }

      return this.step.apply(this, _toConsumableArray(items.map(itemOrItems => {
        return "use ".concat(itemOrItemsBallsMacroName(itemOrItems));
      })));
    }
    /**
     * Create a new macro with one or more item steps.
     * @param items Items to use. Pass a tuple [item1, item2] to funksling.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "tryItem",
    value:
    /**
     * Add one or more item steps to the macro, where each step checks to see if you have the item first.
     * @param items Items to try using. Pass a tuple [item1, item2] to funksling.
     * @returns {Macro} This object itself.
     */
    function tryItem() {
      for (var _len6 = arguments.length, items = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        items[_key6] = arguments[_key6];
      }

      return this.step.apply(this, _toConsumableArray(items.map(item => {
        return Macro.if_(itemOrItemsBallsMacroPredicate(item), "use ".concat(itemOrItemsBallsMacroName(item)));
      })));
    }
    /**
     * Create a new macro with one or more item steps, where each step checks to see if you have the item first.
     * @param items Items to try using. Pass a tuple [item1, item2] to funksling.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "attack",
    value:
    /**
     * Add an attack step to the macro.
     * @returns {Macro} This object itself.
     */
    function attack() {
      return this.step("attack");
    }
    /**
     * Create a new macro with an attack step.
     * @returns {Macro} This object itself.
     */

  }, {
    key: "ifHolidayWanderer",
    value:
    /**
     * Create an if_ statement based on what holiday of loathing it currently is. On non-holidays, returns the original macro, unmutated.
     * @param macro The macro to place in the if_ statement
     */
    function ifHolidayWanderer(macro) {
      var todaysWanderers = getTodaysHolidayWanderers();
      if (todaysWanderers.length === 0) return this;
      return this.if_(todaysWanderers.map(monster => "monsterid ".concat(monster.id)).join(" || "), macro);
    }
    /**
     * Create a new macro starting with an ifHolidayWanderer step.
     * @param macro The macro to place inside the if_ statement
     */

  }, {
    key: "ifNotHolidayWanderer",
    value:
    /**
     * Create an if_ statement based on what holiday of loathing it currently is. On non-holidays, returns the original macro, with the input macro appended.
     * @param macro The macro to place in the if_ statement.
     */
    function ifNotHolidayWanderer(macro) {
      var todaysWanderers = getTodaysHolidayWanderers();
      if (todaysWanderers.length === 0) return this.step(macro);
      return this.if_(todaysWanderers.map(monster => "!monsterid ".concat(monster.id)).join(" && "), macro);
    }
    /**
     * Create a new macro starting with an ifNotHolidayWanderer step.
     * @param macro The macro to place inside the if_ statement
     */

  }], [{
    key: "load",
    value: function load() {
      var _this;

      return (_this = new this()).step.apply(_this, _toConsumableArray(property_get(Macro.SAVED_MACRO_PROPERTY).split(";")));
    }
    /**
     * Clear the saved macro in the Mafia property.
     */

  }, {
    key: "clearSaved",
    value: function clearSaved() {
      (0,external_kolmafia_namespaceObject.removeProperty)(Macro.SAVED_MACRO_PROPERTY);
    }
  }, {
    key: "step",
    value: function step() {
      var _this2;

      return (_this2 = new this()).step.apply(_this2, arguments);
    }
  }, {
    key: "clearAutoAttackMacros",
    value: function clearAutoAttackMacros() {
      var _iterator = combat_createForOfIteratorHelper(Macro.cachedAutoAttacks.keys()),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _Macro$cachedMacroIds;

          var name = _step.value;
          var id = (_Macro$cachedMacroIds = Macro.cachedMacroIds.get(name)) !== null && _Macro$cachedMacroIds !== void 0 ? _Macro$cachedMacroIds : getMacroId(name);
          (0,external_kolmafia_namespaceObject.visitUrl)("account_combatmacros.php?macroid=".concat(id, "&action=edit&what=Delete&confirm=1"));
          Macro.cachedAutoAttacks.delete(name);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "abort",
    value: function abort() {
      return new this().abort();
    }
  }, {
    key: "runaway",
    value: function runaway() {
      return new this().runaway();
    }
  }, {
    key: "if_",
    value: function if_(condition, ifTrue) {
      return new this().if_(condition, ifTrue);
    }
  }, {
    key: "while_",
    value: function while_(condition, contents) {
      return new this().while_(condition, contents);
    }
  }, {
    key: "externalIf",
    value: function externalIf(condition, ifTrue, ifFalse) {
      return new this().externalIf(condition, ifTrue, ifFalse);
    }
  }, {
    key: "skill",
    value: function skill() {
      var _this3;

      return (_this3 = new this()).skill.apply(_this3, arguments);
    }
  }, {
    key: "trySkill",
    value: function trySkill() {
      var _this4;

      return (_this4 = new this()).trySkill.apply(_this4, arguments);
    }
  }, {
    key: "trySkillRepeat",
    value: function trySkillRepeat() {
      var _this5;

      return (_this5 = new this()).trySkillRepeat.apply(_this5, arguments);
    }
  }, {
    key: "item",
    value: function item() {
      var _this6;

      return (_this6 = new this()).item.apply(_this6, arguments);
    }
  }, {
    key: "tryItem",
    value: function tryItem() {
      var _this7;

      return (_this7 = new this()).tryItem.apply(_this7, arguments);
    }
  }, {
    key: "attack",
    value: function attack() {
      return new this().attack();
    }
  }, {
    key: "ifHolidayWanderer",
    value: function ifHolidayWanderer(macro) {
      return new this().ifHolidayWanderer(macro);
    }
  }, {
    key: "ifNotHolidayWanderer",
    value: function ifNotHolidayWanderer(macro) {
      return new this().ifNotHolidayWanderer(macro);
    }
  }]);

  return Macro;
}();
/**
 * Adventure in a location and handle all combats with a given macro.
 * To use this function you will need to create a consult script that runs Macro.load().submit() and a CCS that calls that consult script.
 * See examples/consult.ts for an example.
 *
 * @category Combat
 * @param loc Location to adventure in.
 * @param macro Macro to execute.
 */

combat_defineProperty(Macro, "SAVED_MACRO_PROPERTY", "libram_savedMacro");

combat_defineProperty(Macro, "cachedMacroIds", new Map());

combat_defineProperty(Macro, "cachedAutoAttacks", new Map());

function adventureMacro(loc, macro) {
  macro.save();
  (0,external_kolmafia_namespaceObject.setAutoAttack)(0);

  try {
    (0,external_kolmafia_namespaceObject.adv1)(loc, 0, "");

    while ((0,external_kolmafia_namespaceObject.inMultiFight)()) {
      (0,external_kolmafia_namespaceObject.runCombat)();
    }

    if ((0,external_kolmafia_namespaceObject.choiceFollowsFight)()) (0,external_kolmafia_namespaceObject.visitUrl)("choice.php");
  } finally {
    Macro.clearSaved();
  }
}
/**
 * Adventure in a location and handle all combats with a given autoattack and manual macro.
 * To use the nextMacro parameter you will need to create a consult script that runs Macro.load().submit() and a CCS that calls that consult script.
 * See examples/consult.ts for an example.
 *
 * @category Combat
 * @param loc Location to adventure in.
 * @param autoMacro Macro to execute via KoL autoattack.
 * @param nextMacro Macro to execute manually after autoattack completes.
 */

function adventureMacroAuto(loc, autoMacro) {
  var _nextMacro;

  var nextMacro = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  nextMacro = (_nextMacro = nextMacro) !== null && _nextMacro !== void 0 ? _nextMacro : Macro.abort();
  autoMacro.setAutoAttack();
  nextMacro.save();

  try {
    (0,external_kolmafia_namespaceObject.adv1)(loc, 0, "");

    while ((0,external_kolmafia_namespaceObject.inMultiFight)()) {
      (0,external_kolmafia_namespaceObject.runCombat)();
    }

    if ((0,external_kolmafia_namespaceObject.choiceFollowsFight)()) (0,external_kolmafia_namespaceObject.visitUrl)("choice.php");
  } finally {
    Macro.clearSaved();
  }
}
var StrictMacro = /*#__PURE__*/(/* unused pure expression or super */ null && (function (_Macro) {
  combat_inherits(StrictMacro, _Macro);

  var _super2 = combat_createSuper(StrictMacro);

  function StrictMacro() {
    combat_classCallCheck(this, StrictMacro);

    return _super2.apply(this, arguments);
  }

  combat_createClass(StrictMacro, [{
    key: "skill",
    value:
    /**
     * Add one or more skill cast steps to the macro.
     * @param skills Skills to cast.
     * @returns {StrictMacro} This object itself.
     */
    function skill() {
      var _get2;

      for (var _len7 = arguments.length, skills = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        skills[_key7] = arguments[_key7];
      }

      return (_get2 = _get(combat_getPrototypeOf(StrictMacro.prototype), "skill", this)).call.apply(_get2, [this].concat(skills));
    }
    /**
     * Create a new macro with one or more skill cast steps.
     * @param skills Skills to cast.
     * @returns {StrictMacro} This object itself.
     */

  }, {
    key: "item",
    value:
    /**
     * Add one or more item steps to the macro.
     * @param items Items to use. Pass a tuple [item1, item2] to funksling.
     * @returns {StrictMacro} This object itself.
     */
    function item() {
      var _get3;

      for (var _len8 = arguments.length, items = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        items[_key8] = arguments[_key8];
      }

      return (_get3 = _get(combat_getPrototypeOf(StrictMacro.prototype), "item", this)).call.apply(_get3, [this].concat(items));
    }
    /**
     * Create a new macro with one or more item steps.
     * @param items Items to use. Pass a tuple [item1, item2] to funksling.
     * @returns {StrictMacro} This object itself.
     */

  }, {
    key: "trySkill",
    value:
    /**
     * Add one or more skill cast steps to the macro, where each step checks if you have the skill first.
     * @param skills Skills to try casting.
     * @returns {StrictMacro} This object itself.
     */
    function trySkill() {
      var _get4;

      for (var _len9 = arguments.length, skills = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
        skills[_key9] = arguments[_key9];
      }

      return (_get4 = _get(combat_getPrototypeOf(StrictMacro.prototype), "trySkill", this)).call.apply(_get4, [this].concat(skills));
    }
    /**
     * Create a new macro with one or more skill cast steps, where each step checks if you have the skill first.
     * @param skills Skills to try casting.
     * @returns {StrictMacro} This object itself.
     */

  }, {
    key: "tryItem",
    value:
    /**
     * Add one or more item steps to the macro, where each step checks to see if you have the item first.
     * @param items Items to try using. Pass a tuple [item1, item2] to funksling.
     * @returns {StrictMacro} This object itself.
     */
    function tryItem() {
      var _get5;

      for (var _len10 = arguments.length, items = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
        items[_key10] = arguments[_key10];
      }

      return (_get5 = _get(combat_getPrototypeOf(StrictMacro.prototype), "tryItem", this)).call.apply(_get5, [this].concat(items));
    }
    /**
     * Create a new macro with one or more item steps, where each step checks to see if you have the item first.
     * @param items Items to try using. Pass a tuple [item1, item2] to funksling.
     * @returns {StrictMacro} This object itself.
     */

  }, {
    key: "trySkillRepeat",
    value:
    /**
     * Add one or more skill-cast-and-repeat steps to the macro, where each step checks if you have the skill first.
     * @param skills Skills to try repeatedly casting.
     * @returns {StrictMacro} This object itself.
     */
    function trySkillRepeat() {
      var _get6;

      for (var _len11 = arguments.length, skills = new Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
        skills[_key11] = arguments[_key11];
      }

      return (_get6 = _get(combat_getPrototypeOf(StrictMacro.prototype), "trySkillRepeat", this)).call.apply(_get6, [this].concat(skills));
    }
    /**
     * Create a new macro with one or more skill-cast-and-repeat steps, where each step checks if you have the skill first.
     * @param skills Skills to try repeatedly casting.
     * @returns {StrictMacro} This object itself.
     */

  }], [{
    key: "skill",
    value: function skill() {
      var _this8;

      return (_this8 = new this()).skill.apply(_this8, arguments);
    }
  }, {
    key: "item",
    value: function item() {
      var _this9;

      return (_this9 = new this()).item.apply(_this9, arguments);
    }
  }, {
    key: "trySkill",
    value: function trySkill() {
      var _this10;

      return (_this10 = new this()).trySkill.apply(_this10, arguments);
    }
  }, {
    key: "tryItem",
    value: function tryItem() {
      var _this11;

      return (_this11 = new this()).tryItem.apply(_this11, arguments);
    }
  }, {
    key: "trySkillRepeat",
    value: function trySkillRepeat() {
      var _this12;

      return (_this12 = new this()).trySkillRepeat.apply(_this12, arguments);
    }
  }]);

  return StrictMacro;
}(Macro)));
;// CONCATENATED MODULE: ./src/lib.ts
var lib_templateObject, lib_templateObject2, lib_templateObject3, lib_templateObject4, lib_templateObject5, lib_templateObject6, lib_templateObject7, lib_templateObject8, lib_templateObject9, lib_templateObject10, lib_templateObject11, _templateObject12, _templateObject13, _templateObject14, _templateObject15, _templateObject16, _templateObject17, _templateObject18, _templateObject19, _templateObject20, _templateObject21, _templateObject22, _templateObject23, _templateObject24, _templateObject25, _templateObject26, _templateObject27, _ref, _templateObject28, _templateObject29, _templateObject30, _templateObject31, _templateObject32, _templateObject33, _templateObject34, _templateObject35, _templateObject36, _templateObject37, _templateObject38, _templateObject39, _templateObject40, _templateObject41, _templateObject42, _templateObject43, _templateObject44, _templateObject45, _templateObject46, _templateObject47, _templateObject48, _templateObject49, _templateObject50, _templateObject51, _templateObject52, _templateObject53, _templateObject54, _templateObject55, _templateObject56, _templateObject57, _templateObject58, _templateObject59, _templateObject60, _templateObject61, _templateObject62, _templateObject63, _templateObject64, _templateObject65, _templateObject66, _templateObject67;

function lib_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = lib_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function lib_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return lib_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return lib_arrayLikeToArray(o, minLen); }

function lib_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function lib_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }



function getPropertyInt(name) {
  var str = (0,external_kolmafia_namespaceObject.getProperty)(name);

  if (str === "") {
    throw "Unknown property ".concat(name, ".");
  }

  return (0,external_kolmafia_namespaceObject.toInt)(str);
}
function setPropertyInt(name, value) {
  setProperty(name, "".concat(value));
}
function incrementProperty(name) {
  setPropertyInt(name, getPropertyInt(name) + 1);
}
function getPropertyBoolean(name) {
  var str = (0,external_kolmafia_namespaceObject.getProperty)(name);

  if (str === "") {
    throw "Unknown property ".concat(name, ".");
  }

  return str === "true";
}
function setChoice(adv, choice) {
  (0,external_kolmafia_namespaceObject.setProperty)("choiceAdventure".concat(adv), "".concat(choice));
}
function multiFightAutoAttack() {
  while ((0,external_kolmafia_namespaceObject.choiceFollowsFight)() || (0,external_kolmafia_namespaceObject.inMultiFight)()) {
    (0,external_kolmafia_namespaceObject.visitUrl)("choice.php");
  }
}
function myFamiliarWeight() {
  return familiarWeight(myFamiliar()) + weightAdjustment();
}
function ensureItem(quantity, it) {
  if ((0,external_kolmafia_namespaceObject.availableAmount)(it) < quantity) {
    (0,external_kolmafia_namespaceObject.buy)(quantity - (0,external_kolmafia_namespaceObject.availableAmount)(it), it);
  }

  if ((0,external_kolmafia_namespaceObject.availableAmount)(it) < quantity) {
    throw "Could not buy ".concat(quantity, " of item ").concat(it.name, ": only ").concat((0,external_kolmafia_namespaceObject.availableAmount)(it), ".");
  }
}
function ensureCreateItem(quantity, it) {
  if ((0,external_kolmafia_namespaceObject.availableAmount)(it) < quantity) {
    (0,external_kolmafia_namespaceObject.create)(quantity - (0,external_kolmafia_namespaceObject.availableAmount)(it), it);
  }

  if ((0,external_kolmafia_namespaceObject.availableAmount)(it) < quantity) {
    throw "Could not create item.";
  }
}
function ensureSewerItem(quantity, it) {
  while ((0,external_kolmafia_namespaceObject.availableAmount)(it) < quantity) {
    ensureItem(1, template_string_$item(lib_templateObject || (lib_templateObject = lib_taggedTemplateLiteral(["chewing gum on a string"]))));
    (0,external_kolmafia_namespaceObject.use)(1, template_string_$item(lib_templateObject2 || (lib_templateObject2 = lib_taggedTemplateLiteral(["chewing gum on a string"]))));
  }
}
function ensureHermitItem(quantity, it) {
  if (availableAmount(it) >= quantity) {
    return;
  }

  var count = quantity - availableAmount(it);

  while (availableAmount($item(lib_templateObject3 || (lib_templateObject3 = lib_taggedTemplateLiteral(["worthless trinket"])))) + availableAmount($item(lib_templateObject4 || (lib_templateObject4 = lib_taggedTemplateLiteral(["worthless gewgaw"])))) + availableAmount($item(lib_templateObject5 || (lib_templateObject5 = lib_taggedTemplateLiteral(["worthless knick-knack"])))) < count) {
    ensureItem(1, $item(lib_templateObject6 || (lib_templateObject6 = lib_taggedTemplateLiteral(["chewing gum on a string"]))));
    use(1, $item(lib_templateObject7 || (lib_templateObject7 = lib_taggedTemplateLiteral(["chewing gum on a string"]))));
  }

  ensureItem(1, $item(lib_templateObject8 || (lib_templateObject8 = lib_taggedTemplateLiteral(["hermit permit"]))));
  retrieveItem(count, it);
}
function ensureNpcEffect(ef, quantity, potion) {
  if ((0,external_kolmafia_namespaceObject.haveEffect)(ef) === 0) {
    ensureItem(quantity, potion);

    if (!(0,external_kolmafia_namespaceObject.cliExecute)(ef.default) || (0,external_kolmafia_namespaceObject.haveEffect)(ef) === 0) {
      throw "Failed to get effect ".concat(ef.name);
    }
  } else {
    (0,external_kolmafia_namespaceObject.print)("Already have effect ".concat(ef.name, "."));
  }
}
function ensurePotionEffect(ef, potion) {
  if ((0,external_kolmafia_namespaceObject.haveEffect)(ef) === 0) {
    if ((0,external_kolmafia_namespaceObject.availableAmount)(potion) === 0) {
      (0,external_kolmafia_namespaceObject.create)(1, potion);
    }

    if (!(0,external_kolmafia_namespaceObject.cliExecute)(ef.default) || (0,external_kolmafia_namespaceObject.haveEffect)(ef) === 0) {
      throw "Failed to get effect ".concat(ef.name);
    }
  } else {
    (0,external_kolmafia_namespaceObject.print)("Already have effect ".concat(ef.name, "."));
  }
}
function lib_ensureEffect(ef) {
  var turns = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  if ((0,external_kolmafia_namespaceObject.haveEffect)(ef) < turns) {
    if (!(0,external_kolmafia_namespaceObject.cliExecute)(ef.default) || (0,external_kolmafia_namespaceObject.haveEffect)(ef) === 0) {
      throw "Failed to get effect ".concat(ef.name, ".");
    }
  } else {
    (0,external_kolmafia_namespaceObject.print)("Already have effect ".concat(ef.name, "."));
  }
}
function ensureMpTonic(mp) {
  while ((0,external_kolmafia_namespaceObject.myMp)() < mp) {
    ensureItem(1, template_string_$item(lib_templateObject9 || (lib_templateObject9 = lib_taggedTemplateLiteral(["Doc Galaktik's Invigorating Tonic"]))));
    (0,external_kolmafia_namespaceObject.use)(1, template_string_$item(lib_templateObject10 || (lib_templateObject10 = lib_taggedTemplateLiteral(["Doc Galaktik's Invigorating Tonic"]))));
  }
}
function ensureMpSausage(mp) {
  while ((0,external_kolmafia_namespaceObject.myMp)() < Math.min(mp, (0,external_kolmafia_namespaceObject.myMaxmp)())) {
    ensureCreateItem(1, template_string_$item(lib_templateObject11 || (lib_templateObject11 = lib_taggedTemplateLiteral(["magical sausage"]))));
    (0,external_kolmafia_namespaceObject.eat)(1, template_string_$item(_templateObject12 || (_templateObject12 = lib_taggedTemplateLiteral(["magical sausage"]))));
  }
}
function sausageFightGuaranteed() {
  var goblinsFought = getPropertyInt("_sausageFights");
  var nextGuaranteed = getPropertyInt("_lastSausageMonsterTurn") + 4 + goblinsFought * 3 + Math.pow(Math.max(0, goblinsFought - 5), 3);
  return goblinsFought === 0 || (0,external_kolmafia_namespaceObject.totalTurnsPlayed)() >= nextGuaranteed;
}
function itemPriority() {
  var _items$find;

  for (var _len = arguments.length, items = new Array(_len), _key = 0; _key < _len; _key++) {
    items[_key] = arguments[_key];
  }

  return (_items$find = items.find(item => availableAmount(item) > 0)) !== null && _items$find !== void 0 ? _items$find : items[items.length - 1];
}
function setClan(target) {
  if ((0,external_kolmafia_namespaceObject.getClanName)() !== target) {
    var clanCache = JSON.parse((0,external_kolmafia_namespaceObject.getProperty)("hccs_clanCache") || "{}");

    if (clanCache.target === undefined) {
      var recruiter = (0,external_kolmafia_namespaceObject.visitUrl)("clan_signup.php");
      var clanRe = /<option value=([0-9]+)>([^<]+)<\/option>/g;
      var match;

      while ((match = clanRe.exec(recruiter)) !== null) {
        clanCache[match[2]] = match[1];
      }
    }

    (0,external_kolmafia_namespaceObject.setProperty)("hccs_clanCache", JSON.stringify(clanCache));
    (0,external_kolmafia_namespaceObject.visitUrl)("showclan.php?whichclan=".concat(clanCache[target], "&action=joinclan&confirm=on&pwd"));

    if ((0,external_kolmafia_namespaceObject.getClanName)() !== target) {
      throw "failed to switch clans to ".concat(target, ". Did you spell it correctly? Are you whitelisted?");
    }
  }

  return true;
}
function ensureDough(goal) {
  while (availableAmount($item(_templateObject13 || (_templateObject13 = lib_taggedTemplateLiteral(["wad of dough"])))) < goal) {
    buy(1, $item(_templateObject14 || (_templateObject14 = lib_taggedTemplateLiteral(["all-purpose flower"]))));
    use(1, $item(_templateObject15 || (_templateObject15 = lib_taggedTemplateLiteral(["all-purpose flower"]))));
  }
}
function fuelAsdon(goal) {
  var startingFuel = getFuel();
  if (startingFuel > goal) return startingFuel;
  print("Fueling asdon. Currently ".concat(startingFuel, " litres."));
  var estimated = Math.floor((goal - startingFuel) / 5);
  var bread = availableAmount($item(_templateObject16 || (_templateObject16 = lib_taggedTemplateLiteral(["loaf of soda bread"]))));
  ensureDough(estimated - bread);
  ensureItem(estimated - bread, $item(_templateObject17 || (_templateObject17 = lib_taggedTemplateLiteral(["soda water"]))));
  ensureCreateItem(estimated, $item(_templateObject18 || (_templateObject18 = lib_taggedTemplateLiteral(["loaf of soda bread"]))));
  cliExecute("asdonmartin fuel ".concat(estimated, " loaf of soda bread"));

  while (getFuel() < goal) {
    ensureDough(1);
    ensureItem(1, $item(_templateObject19 || (_templateObject19 = lib_taggedTemplateLiteral(["soda water"]))));
    ensureCreateItem(1, $item(_templateObject20 || (_templateObject20 = lib_taggedTemplateLiteral(["loaf of soda bread"]))));
    cliExecute("asdonmartin fuel 1 loaf of soda bread");
  }

  var endingFuel = getFuel();
  print("Done fueling. Now ".concat(endingFuel, " litres."));
  return endingFuel;
}
function ensureAsdonEffect(ef) {
  if (haveEffect(ef) === 0) {
    fuelAsdon(37);
  }

  lib_ensureEffect(ef);
}
function mapMonster(location, monster) {
  if ((0,external_kolmafia_namespaceObject.haveSkill)(template_string_$skill(_templateObject21 || (_templateObject21 = lib_taggedTemplateLiteral(["Map the Monsters"])))) && !getPropertyBoolean("mappingMonsters") && getPropertyInt("_monstersMapped") < 3) {
    (0,external_kolmafia_namespaceObject.useSkill)(template_string_$skill(_templateObject22 || (_templateObject22 = lib_taggedTemplateLiteral(["Map the Monsters"]))));
  }

  if (!getPropertyBoolean("mappingMonsters")) throw "Failed to setup Map the Monsters.";
  var mapPage = (0,external_kolmafia_namespaceObject.visitUrl)((0,external_kolmafia_namespaceObject.toUrl)(location), false, true);
  if (!mapPage.includes("Leading Yourself Right to Them")) throw "Something went wrong mapping.";
  var fightPage = (0,external_kolmafia_namespaceObject.visitUrl)("choice.php?pwd&whichchoice=1435&option=1&heyscriptswhatsupwinkwink=".concat(monster.id));
  if (!fightPage.includes("You're fighting") && (0,external_kolmafia_namespaceObject.myLocation)() !== template_string_$location(_templateObject23 || (_templateObject23 = lib_taggedTemplateLiteral(["The Haiku Dungeon"])))) throw "Something went wrong starting the fight.";
}
function tryUse(quantity, it) {
  if (availableAmount(it) > 0) {
    return use(quantity, it);
  } else {
    return false;
  }
}
function tryEquip(it) {
  if (availableAmount(it) > 0) {
    return equip(it);
  } else {
    return false;
  }
}
function wishEffect(ef) {
  if (haveEffect(ef) === 0) {
    cliExecute("genie effect ".concat(ef.name));
  } else {
    print("Already have effect ".concat(ef.name, "."));
  }
}
function pullIfPossible(quantity, it, maxPrice) {
  if (pullsRemaining() > 0) {
    var quantityPull = Math.max(0, quantity - availableAmount(it));

    if (shopAmount(it) > 0) {
      takeShop(Math.min(shopAmount(it), quantityPull), it);
    }

    if (storageAmount(it) < quantityPull) {
      buyUsingStorage(quantityPull - storageAmount(it), it, maxPrice);
    }

    cliExecute("pull ".concat(quantityPull, " ").concat(it.name));
    return true;
  } else return false;
}
function ensurePullEffect(ef, it) {
  if (haveEffect(ef) === 0) {
    if (availableAmount(it) > 0 || pullIfPossible(1, it, 50000)) lib_ensureEffect(ef);
  }
}
function shrug(ef) {
  if ((0,external_kolmafia_namespaceObject.haveEffect)(ef) > 0) {
    (0,external_kolmafia_namespaceObject.cliExecute)("shrug ".concat(ef.name));
  }
} // We have Stevedave's, Ur-Kel's on at all times during leveling (managed via mood); third and fourth slots are variable.

var songSlots = [$effects(_templateObject24 || (_templateObject24 = lib_taggedTemplateLiteral(["Stevedave's Shanty of Superiority"]))), $effects(_templateObject25 || (_templateObject25 = lib_taggedTemplateLiteral(["Ur-Kel's Aria of Annoyance"]))), $effects(_templateObject26 || (_templateObject26 = lib_taggedTemplateLiteral(["Power Ballad of the Arrowsmith, The Magical Mojomuscular Melody, The Moxious Madrigal, Ode to Booze, Jackasses' Symphony of Destruction"]))), $effects(_templateObject27 || (_templateObject27 = lib_taggedTemplateLiteral(["Carlweather's Cantata of Confrontation, The Sonata of Sneakiness, Fat Leon's Phat Loot Lyric, Polka of Plenty"])))];

var allKnownSongs = (_ref = []).concat.apply(_ref, songSlots);

var allSongs = external_kolmafia_namespaceObject.Skill.all().filter(skill => (0,external_kolmafia_namespaceObject.toString)(skill.class) === "Accordion Thief" && skill.buff).map(skill => (0,external_kolmafia_namespaceObject.toEffect)(skill));
function openSongSlot(song) {
  if ((0,external_kolmafia_namespaceObject.haveEffect)(song)) return;

  var _iterator = lib_createForOfIteratorHelper(songSlots),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var songSlot = _step.value;

      if (songSlot.includes(song)) {
        var _iterator3 = lib_createForOfIteratorHelper(songSlot),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var shruggable = _step3.value;
            if (shruggable != song) shrug(shruggable);
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  var _iterator2 = lib_createForOfIteratorHelper(allSongs),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var badSong = _step2.value;

      if (!allKnownSongs.includes(badSong)) {
        shrug(badSong);
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
}
function ensureSong(ef) {
  if ((0,external_kolmafia_namespaceObject.haveEffect)(ef) === 0) {
    openSongSlot(ef);

    if (!(0,external_kolmafia_namespaceObject.cliExecute)(ef.default) || (0,external_kolmafia_namespaceObject.haveEffect)(ef) === 0) {
      throw "Failed to get effect ".concat(ef.name);
    }
  } else {
    (0,external_kolmafia_namespaceObject.print)("Already have effect ".concat(ef.name, "."));
  }
}
function ensureOde(turns) {
  while ((0,external_kolmafia_namespaceObject.haveEffect)($effect(_templateObject28 || (_templateObject28 = lib_taggedTemplateLiteral(["Ode to Booze"])))) < turns) {
    ensureMpTonic(50);
    openSongSlot($effect(_templateObject29 || (_templateObject29 = lib_taggedTemplateLiteral(["Ode to Booze"]))));
    (0,external_kolmafia_namespaceObject.useSkill)(1, template_string_$skill(_templateObject30 || (_templateObject30 = lib_taggedTemplateLiteral(["The Ode to Booze"]))));
  }
}
function kill() {
  return Macro.trySkill(template_string_$skill(_templateObject31 || (_templateObject31 = lib_taggedTemplateLiteral(["Curse of Weaksauce"])))).trySkill(template_string_$skill(_templateObject32 || (_templateObject32 = lib_taggedTemplateLiteral(["Micrometeorite"])))).trySkill(template_string_$skill(_templateObject33 || (_templateObject33 = lib_taggedTemplateLiteral(["Sing Along"])))).trySkill(template_string_$skill(_templateObject34 || (_templateObject34 = lib_taggedTemplateLiteral(["Stuffed Mortar Shell"])))).trySkill(template_string_$skill(_templateObject35 || (_templateObject35 = lib_taggedTemplateLiteral(["Saucestorm"])))).trySkillRepeat(template_string_$skill(_templateObject36 || (_templateObject36 = lib_taggedTemplateLiteral(["Saucegeyser"])))).attack();
}

function checkFax(monster) {
  cliExecute("fax receive");
  if (property.getString("photocopyMonster").toLowerCase() === monster.name.toLowerCase()) return true;
  cliExecute("fax send");
  return false;
}

function fax(monster) {
  if (!get("_photocopyUsed")) {
    if (checkFax(monster)) return;
    chatPrivate("cheesefax", monster.name);

    for (var i = 0; i < 3; i++) {
      wait(5 + i);
      if (checkFax(monster)) return;
    }

    abort("Failed to acquire photocopied ".concat(monster.name, "."));
  }
}
function mannyCleanup() {
  while (get("_sourceTerminalEnhanceUses") < 3) {
    cliExecute("terminal enhance meat.enh");
  }

  if (get("_claraBellUsed") === false && myAdventures() > 0) {
    use($item(_templateObject37 || (_templateObject37 = lib_taggedTemplateLiteral(["Clara's bell"]))));
    setChoice(919, 1);

    do {
      adv1($location(_templateObject38 || (_templateObject38 = lib_taggedTemplateLiteral(["Sloppy Seconds Diner"]))), -1, "");
    } while (get("lastEncounter") === "Nothing Could Be Finer");
  }

  if (get("boomBoxSong") !== "Food Vibrations") {
    cliExecute("boombox food");
  }

  if (get("_freeBeachWalksUsed") < 11) {
    cliExecute("combbeach free");
  }

  autosell($item(_templateObject39 || (_templateObject39 = lib_taggedTemplateLiteral(["cheap sunglasses"]))), itemAmount($item(_templateObject40 || (_templateObject40 = lib_taggedTemplateLiteral(["cheap sunglasses"])))) - 1);
  autosell($item(_templateObject41 || (_templateObject41 = lib_taggedTemplateLiteral(["filthy child leash"]))), itemAmount($item(_templateObject42 || (_templateObject42 = lib_taggedTemplateLiteral(["filthy child leash"])))));
  use(itemAmount($item(_templateObject43 || (_templateObject43 = lib_taggedTemplateLiteral(["bag of park garbage"])))) - 30, $item(_templateObject44 || (_templateObject44 = lib_taggedTemplateLiteral(["bag of park garbage"]))));
  use(itemAmount($item(_templateObject45 || (_templateObject45 = lib_taggedTemplateLiteral(["Gathered Meat-Clip"])))), $item(_templateObject46 || (_templateObject46 = lib_taggedTemplateLiteral(["Gathered Meat-Clip"]))));
  use(itemAmount($item(_templateObject47 || (_templateObject47 = lib_taggedTemplateLiteral(["old coin purse"])))), $item(_templateObject48 || (_templateObject48 = lib_taggedTemplateLiteral(["old coin purse"]))));
  use(itemAmount($item(_templateObject49 || (_templateObject49 = lib_taggedTemplateLiteral(["old leather wallet"])))), $item(_templateObject50 || (_templateObject50 = lib_taggedTemplateLiteral(["old leather wallet"]))));
  autosell($item(_templateObject51 || (_templateObject51 = lib_taggedTemplateLiteral(["expensive camera"]))), itemAmount($item(_templateObject52 || (_templateObject52 = lib_taggedTemplateLiteral(["expensive camera"])))));
  autosell($item(_templateObject53 || (_templateObject53 = lib_taggedTemplateLiteral(["bag of gross foreign snacks"]))), itemAmount($item(_templateObject54 || (_templateObject54 = lib_taggedTemplateLiteral(["bag of gross foreign snacks"])))));
  putShop(300, 0, itemAmount($item(_templateObject55 || (_templateObject55 = lib_taggedTemplateLiteral(["gold nuggets"])))), $item(_templateObject56 || (_templateObject56 = lib_taggedTemplateLiteral(["gold nuggets"]))));
  putShop(0, 0, itemAmount($item(_templateObject57 || (_templateObject57 = lib_taggedTemplateLiteral(["cornucopia"])))), $item(_templateObject58 || (_templateObject58 = lib_taggedTemplateLiteral(["cornucopia"]))));
  putShop(0, 0, itemAmount($item(_templateObject59 || (_templateObject59 = lib_taggedTemplateLiteral(["elemental sugarcube"])))), $item(_templateObject60 || (_templateObject60 = lib_taggedTemplateLiteral(["elemental sugarcube"]))));
  putShop(0, 0, itemAmount($item(_templateObject61 || (_templateObject61 = lib_taggedTemplateLiteral(["gingerbread cigarette"])))), $item(_templateObject62 || (_templateObject62 = lib_taggedTemplateLiteral(["gingerbread cigarette"]))));
  putShop(0, 0, itemAmount($item(_templateObject63 || (_templateObject63 = lib_taggedTemplateLiteral(["abandoned candy"])))), $item(_templateObject64 || (_templateObject64 = lib_taggedTemplateLiteral(["abandoned candy"]))));
  autosell($item(_templateObject65 || (_templateObject65 = lib_taggedTemplateLiteral(["meat stack"]))), itemAmount($item(_templateObject66 || (_templateObject66 = lib_taggedTemplateLiteral(["meat stack"]))))); // check for a dggt if we haven't

  if (get("_defectiveTokenChecked") === false) {
    retrieveItem($item(_templateObject67 || (_templateObject67 = lib_taggedTemplateLiteral(["Game Grid token"]))));
    visitUrl("place.php?whichplace=arcade&action=arcade_plumber");
  }
} // shamelessly stolen from phccs

function horse(horse) {
  if (!horse.includes("horse")) horse = "".concat(horse, " horse");
  if (get("_horsery") !== horse) cliExecute("horsery ".concat(horse));
}
;// CONCATENATED MODULE: ./node_modules/libram/dist/resources/2016/Witchess.js
var Witchess_templateObject;

function Witchess_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }





var item = template_string_$item(Witchess_templateObject || (Witchess_templateObject = Witchess_taggedTemplateLiteral(["Witchess Set"])));
function Witchess_have() {
  return haveInCampground(item);
}
function fightsDone() {
  return get("_witchessFights");
}
var pieces = external_kolmafia_namespaceObject.Monster.get(["Witchess Pawn", "Witchess Knight", "Witchess Bishop", "Witchess Rook", "Witchess Queen", "Witchess King", "Witchess Witch", "Witchess Ox"]);
function fightPiece(piece) {
  if (!pieces.includes(piece)) throw new Error("That is not a valid piece.");

  if (!(0,external_kolmafia_namespaceObject.visitUrl)("campground.php?action=witchess").includes("whichchoice value=1181")) {
    throw new Error("Failed to open Witchess.");
  }

  if (!(0,external_kolmafia_namespaceObject.runChoice)(1).includes("whichchoice=1182")) {
    throw new Error("Failed to visit shrink ray.");
  }

  if (!(0,external_kolmafia_namespaceObject.visitUrl)("choice.php?option=1&pwd=".concat((0,external_kolmafia_namespaceObject.myHash)(), "&whichchoice=1182&piece=").concat((0,external_kolmafia_namespaceObject.toInt)(piece)), false).includes(piece.name)) {
    throw new Error("Failed to start fight.");
  }

  return (0,external_kolmafia_namespaceObject.runCombat)();
}
;// CONCATENATED MODULE: ./node_modules/libram/dist/utils.js
function utils_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = utils_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function utils_slicedToArray(arr, i) { return utils_arrayWithHoles(arr) || utils_iterableToArrayLimit(arr, i) || utils_unsupportedIterableToArray(arr, i) || utils_nonIterableRest(); }

function utils_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function utils_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function utils_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function utils_toConsumableArray(arr) { return utils_arrayWithoutHoles(arr) || utils_iterableToArray(arr) || utils_unsupportedIterableToArray(arr) || utils_nonIterableSpread(); }

function utils_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function utils_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return utils_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return utils_arrayLikeToArray(o, minLen); }

function utils_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function utils_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return utils_arrayLikeToArray(arr); }

function utils_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function notNull(value) {
  return value !== null;
}
function parseNumber(n) {
  return Number.parseInt(n.replace(/,/g, ""));
}
/**
 * Clamp a number between lower and upper bounds.
 *
 * @param n Number to clamp.
 * @param min Lower bound.
 * @param max Upper bound.
 */

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}
/**
 * Split an {@param array} into {@param chunkSize} sized chunks
 *
 * @param array Array to split
 * @param chunkSize Size of chunk
 */

function utils_chunk(array, chunkSize) {
  var result = [];

  for (var i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }

  return result;
}
function arrayToCountedMap(array) {
  if (!Array.isArray(array)) return array;
  var map = new Map();
  array.forEach(item => {
    map.set(item, (map.get(item) || 0) + 1);
  });
  return map;
}
function countedMapToArray(map) {
  var _ref;

  return (_ref = []).concat.apply(_ref, utils_toConsumableArray(utils_toConsumableArray(map).map(_ref2 => {
    var _ref3 = utils_slicedToArray(_ref2, 2),
        item = _ref3[0],
        quantity = _ref3[1];

    return Array(quantity).fill(item);
  })));
}
function countedMapToString(map) {
  return utils_toConsumableArray(map).map(_ref4 => {
    var _ref5 = utils_slicedToArray(_ref4, 2),
        item = _ref5[0],
        quantity = _ref5[1];

    return "".concat(quantity, " x ").concat(item);
  }).join(", ");
}
/**
 * Sum an array of numbers.
 * @param addends Addends to sum.
 * @param mappingFunction function to turn elements into numbers
 */

function sum(addends, mappingFunction) {
  return addends.reduce((subtotal, element) => subtotal + mappingFunction(element), 0);
}
function sumNumbers(addends) {
  return sum(addends, x => x);
}
/**
 * Checks if a given item is in a readonly array, acting as a typeguard.
 * @param item Needle
 * @param array Readonly array haystack
 * @returns Whether the item is in the array, and narrows the type of the item.
 */

function arrayContains(item, array) {
  return array.includes(item);
}
/**
 * Checks if two arrays contain the same elements in the same quantity.
 * @param a First array for comparison
 * @param b Second array for comparison
 * @returns Whether the two arrays are equal, irrespective of order.
 */

function setEqual(a, b) {
  var sortedA = utils_toConsumableArray(a).sort();

  var sortedB = utils_toConsumableArray(b).sort();

  return a.length === b.length && sortedA.every((item, index) => item === sortedB[index]);
}
/**
 * Reverses keys and values for a given map
 * @param map Map to invert
 */

function invertMap(map) {
  var returnValue = new Map();

  var _iterator = utils_createForOfIteratorHelper(map),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _step$value = utils_slicedToArray(_step.value, 2),
          key = _step$value[0],
          value = _step$value[1];

      returnValue.set(value, key);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return returnValue;
}
;// CONCATENATED MODULE: ./node_modules/libram/dist/resources/2022/CombatLoversLocket.js
var CombatLoversLocket_templateObject;

function CombatLoversLocket_slicedToArray(arr, i) { return CombatLoversLocket_arrayWithHoles(arr) || CombatLoversLocket_iterableToArrayLimit(arr, i) || CombatLoversLocket_unsupportedIterableToArray(arr, i) || CombatLoversLocket_nonIterableRest(); }

function CombatLoversLocket_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function CombatLoversLocket_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return CombatLoversLocket_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return CombatLoversLocket_arrayLikeToArray(o, minLen); }

function CombatLoversLocket_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function CombatLoversLocket_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function CombatLoversLocket_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function CombatLoversLocket_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }





 // eslint-disable-next-line libram/verify-constants

var locket = template_string_$item(CombatLoversLocket_templateObject || (CombatLoversLocket_templateObject = CombatLoversLocket_taggedTemplateLiteral(["Combat Lover's Locket"])));
function CombatLoversLocket_have() {
  return lib_have(locket);
}
/**
 * Filters the set of all unlocked locket monsters to only the ones available to be locketed right now.
 * @returns An array consisting of all Monsters you can fight with your locket right now.
 */

function availableLocketMonsters() {
  if (reminiscesLeft() === 0) return [];
  return Object.entries(getLocketMonsters()).filter(_ref => {
    var _ref2 = CombatLoversLocket_slicedToArray(_ref, 2),
        unused = _ref2[1];

    return unused;
  }).map(_ref3 => {
    var _ref4 = CombatLoversLocket_slicedToArray(_ref3, 1),
        name = _ref4[0];

    return toMonster(name);
  });
}
/**
 * Parses getLocketMonsters and returns the collection of all Monsters as an Array.
 * @returns An array consisting of all Monsters you can hypothetically fight, regardless of whether they've been fought today.
 */

function unlockedLocketMonsters() {
  return Object.entries(getLocketMonsters()).map(_ref5 => {
    var _ref6 = CombatLoversLocket_slicedToArray(_ref5, 1),
        name = _ref6[0];

    return toMonster(name);
  });
}

function parseLocketProperty() {
  return property_get("_locketMonstersFought").split(",").filter(id => id.trim().length > 0);
}
/**
 * Determines how many reminisces remain by parsing the _locketMonstersFought property.
 * @returns The number of reminisces a player has available; 0 if they lack the Locket.
 */


function reminiscesLeft() {
  return CombatLoversLocket_have() ? clamp(3 - parseLocketProperty().length, 0, 3) : 0;
}
/**
 * Determines which monsters were reminisced today by parsing the _locketMonstersFought property.
 * @returns An array consisting of the Monsters reminisced today.
 */

function monstersReminisced() {
  return parseLocketProperty().map(id => (0,external_kolmafia_namespaceObject.toMonster)(parseInt(id)));
}
/**
 * Fight a Monster using the Combat Lover's Locket
 * @param monster The Monster to fight
 * @returns false if we are unable to reminisce about this monster. Else, returns whether, at the end of all things, we have reminisced about this monster.
 */

function reminisce(monster) {
  if (!CombatLoversLocket_have() || reminiscesLeft() === 0 || !(0,external_kolmafia_namespaceObject.getLocketMonsters)()[monster.name]) {
    return false;
  }

  (0,external_kolmafia_namespaceObject.cliExecute)("reminisce ".concat(monster));
  (0,external_kolmafia_namespaceObject.runCombat)();
  return monstersReminisced().includes(monster);
}
/**
 * Find a reminiscable monster that meets certain criteria and optionally maximizes a valuation function.
 * @param criteria A function for delineating which monsters are "fair game" for the search.
 * @param value A function for deciding which monsters are "better" than others.
 * @returns A monster that fulfills the criteria function and maximizes the value function.
 */

function findMonster(criteria) {
  var _availableLocketMonst;

  var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : () => 1;
  if (!CombatLoversLocket_have() || reminiscesLeft() === 0) return null;
  return (_availableLocketMonst = availableLocketMonsters().filter(criteria).sort((a, b) => value(b) - value(a))[0]) !== null && _availableLocketMonst !== void 0 ? _availableLocketMonst : null;
}
;// CONCATENATED MODULE: ./node_modules/libram/dist/console.js


var logColor = color => function () {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var output = args.map(x => x.toString()).join(" ");

  if (color) {
    (0,external_kolmafia_namespaceObject.print)(output, color);
  } else {
    (0,external_kolmafia_namespaceObject.print)(output);
  }
};

var log = logColor();
var info = logColor("blue");
var warn = logColor("red");
var error = logColor("red");
;// CONCATENATED MODULE: ./src/synthesis.ts
var synthesis_templateObject, synthesis_templateObject2, synthesis_templateObject3, synthesis_templateObject4, synthesis_templateObject5, synthesis_templateObject6, synthesis_templateObject7, synthesis_templateObject8;

function synthesis_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function synthesis_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function synthesis_createClass(Constructor, protoProps, staticProps) { if (protoProps) synthesis_defineProperties(Constructor.prototype, protoProps); if (staticProps) synthesis_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function synthesis_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function synthesis_slicedToArray(arr, i) { return synthesis_arrayWithHoles(arr) || synthesis_iterableToArrayLimit(arr, i) || synthesis_unsupportedIterableToArray(arr, i) || synthesis_nonIterableRest(); }

function synthesis_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function synthesis_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function synthesis_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function synthesis_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = synthesis_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function synthesis_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return synthesis_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return synthesis_arrayLikeToArray(o, minLen); }

function synthesis_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function synthesis_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }




var npcCandies = template_string_$items(synthesis_templateObject || (synthesis_templateObject = synthesis_taggedTemplateLiteral(["jaba\xF1ero-flavored chewing gum, lime-and-chile-flavored chewing gum, pickle-flavored chewing gum, tamarind-flavored chewing gum"])));

function addNumericMapTo(base, addition) {
  var _iterator = synthesis_createForOfIteratorHelper(addition),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _base$get;

      var _step$value = synthesis_slicedToArray(_step.value, 2),
          key = _step$value[0],
          count = _step$value[1];

      base.set(key, ((_base$get = base.get(key)) !== null && _base$get !== void 0 ? _base$get : 0) + count);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}

function subtractNumericMapFrom(base, subtraction) {
  var _iterator2 = synthesis_createForOfIteratorHelper(subtraction),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var _base$get2;

      var _step2$value = synthesis_slicedToArray(_step2.value, 2),
          key = _step2$value[0],
          count = _step2$value[1];

      base.set(key, ((_base$get2 = base.get(key)) !== null && _base$get2 !== void 0 ? _base$get2 : 0) - count);
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
}

var SynthesisPlanner = /*#__PURE__*/function () {
  function SynthesisPlanner(plan) {
    synthesis_classCallCheck(this, SynthesisPlanner);

    synthesis_defineProperty(this, "plan", void 0);

    synthesis_defineProperty(this, "simple", new Map());

    synthesis_defineProperty(this, "complex", new Map());

    synthesis_defineProperty(this, "used", new Map());

    synthesis_defineProperty(this, "depth", 0);

    this.plan = plan;
  }

  synthesis_createClass(SynthesisPlanner, [{
    key: "synthesize",
    value: function synthesize(effect) {
      var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if ((0,external_kolmafia_namespaceObject.haveEffect)(effect) > 0) {
        (0,external_kolmafia_namespaceObject.print)("Already have effect ".concat(effect.name, "."));
        return;
      }

      this.simple.clear();
      this.complex.clear();
      this.used.clear();
      this.depth = 0;
      var inventory = (0,external_kolmafia_namespaceObject.getInventory)();

      for (var _i2 = 0, _Object$keys = Object.keys(inventory); _i2 < _Object$keys.length; _i2++) {
        var itemName = _Object$keys[_i2];
        var item = external_kolmafia_namespaceObject.Item.get(itemName);
        var count = inventory[itemName];
        if (item.candyType === 'simple' || item === template_string_$item(synthesis_templateObject2 || (synthesis_templateObject2 = synthesis_taggedTemplateLiteral(["Chubby and Plump bar"])))) this.simple.set(item, count);
        if (item.candyType === 'complex') this.complex.set(item, count);
      }

      if (['Wombat', 'Blender', 'Packrat'].includes((0,external_kolmafia_namespaceObject.mySign)()) && (0,external_kolmafia_namespaceObject.availableAmount)(template_string_$item(synthesis_templateObject3 || (synthesis_templateObject3 = synthesis_taggedTemplateLiteral(["bitchin' meatcar"])))) + (0,external_kolmafia_namespaceObject.availableAmount)(template_string_$item(synthesis_templateObject4 || (synthesis_templateObject4 = synthesis_taggedTemplateLiteral(["Desert Bus pass"])))) > 0) {
        var _iterator3 = synthesis_createForOfIteratorHelper(npcCandies),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var candy = _step3.value;
            this.simple.set(candy, Infinity);
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      }

      var startIndex = index !== null ? index : this.plan.indexOf(effect);
      if (startIndex === -1) throw 'No such effect in plan!';
      var remainingPlan = this.plan.slice(startIndex);
      (0,external_kolmafia_namespaceObject.print)("".concat(effect, " remaining plan: ").concat(remainingPlan));
      var firstStep = this.synthesizeInternal(remainingPlan, new Map());

      if (firstStep !== null) {
        var _firstStep = synthesis_slicedToArray(firstStep, 2),
            formA = _firstStep[0],
            formB = _firstStep[1];

        var _iterator4 = synthesis_createForOfIteratorHelper(firstStep),
            _step4;

        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            var _candy = _step4.value;

            if (npcCandies.includes(_candy)) {
              ensureItem(formA === formB ? 2 : 1, _candy);
            } else {
              (0,external_kolmafia_namespaceObject.retrieveItem)(formA === formB ? 2 : 1, _candy);
            }
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }

        (0,external_kolmafia_namespaceObject.sweetSynthesis)(formA, formB);
      } else {
        throw "Failed to synthesisze effect ".concat(effect.name, ". Please plan it out and re-run me.");
      }
    }
  }, {
    key: "getCandyOptions",
    value: function getCandyOptions(effect) {
      if ($effects(synthesis_templateObject5 || (synthesis_templateObject5 = synthesis_taggedTemplateLiteral(["Synthesis: Hot, Synthesis: Cold, Synthesis: Pungent, Synthesis: Scary, Synthesis: Greasy"]))).includes(effect)) {
        return [this.simple, this.simple];
      } else if ($effects(synthesis_templateObject6 || (synthesis_templateObject6 = synthesis_taggedTemplateLiteral(["Synthesis: Strong, Synthesis: Smart, Synthesis: Cool, Synthesis: Hardy, Synthesis: Energy"]))).includes(effect)) {
        return [this.simple, this.complex];
      } else {
        return [this.complex, this.complex];
      }
    }
  }, {
    key: "synthesizeInternal",
    value: function synthesizeInternal(remainingPlan, usedLastStep) {
      addNumericMapTo(this.used, usedLastStep);
      this.depth += 1;
      var effect = remainingPlan[0];

      var _this$getCandyOptions = this.getCandyOptions(effect),
          _this$getCandyOptions2 = synthesis_slicedToArray(_this$getCandyOptions, 2),
          optionsA = _this$getCandyOptions2[0],
          optionsB = _this$getCandyOptions2[1];

      var _iterator5 = synthesis_createForOfIteratorHelper(optionsA),
          _step5;

      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var _this$used$get;

          var _step5$value = synthesis_slicedToArray(_step5.value, 2),
              itemA = _step5$value[0],
              rawCountA = _step5$value[1];

          var countA = rawCountA - ((_this$used$get = this.used.get(itemA)) !== null && _this$used$get !== void 0 ? _this$used$get : 0);
          if (countA <= 0) continue;

          var _iterator6 = synthesis_createForOfIteratorHelper(candyForms(itemA)),
              _step6;

          try {
            for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
              var formA = _step6.value;

              var _iterator7 = synthesis_createForOfIteratorHelper(optionsB),
                  _step7;

              try {
                for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
                  var _this$used$get2;

                  var _step7$value = synthesis_slicedToArray(_step7.value, 2),
                      itemB = _step7$value[0],
                      rawCountB = _step7$value[1];

                  var countB = rawCountB - ((_this$used$get2 = this.used.get(itemB)) !== null && _this$used$get2 !== void 0 ? _this$used$get2 : 0) - (itemA === itemB ? 1 : 0);
                  if (countB <= 0) continue;

                  var _iterator8 = synthesis_createForOfIteratorHelper(candyForms(itemB)),
                      _step8;

                  try {
                    for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
                      var formB = _step8.value;
                      if ((0,external_kolmafia_namespaceObject.sweetSynthesisResult)(formA, formB) !== effect) continue;
                      var prefix = new Array(this.depth).fill('>').join('');
                      (0,external_kolmafia_namespaceObject.print)("".concat(prefix, " Testing pair < ").concat(formA.name, " / ").concat(formB.name, " > for ").concat(effect, "."));
                      var usedThisStep = new Map([[itemA, 1]]);
                      usedThisStep.set(itemB, itemA === itemB ? 2 : 1);

                      if (remainingPlan.length === 1 || this.synthesizeInternal(remainingPlan.slice(1), usedThisStep) !== null) {
                        subtractNumericMapFrom(this.used, usedLastStep);
                        return [formA, formB];
                      }
                    }
                  } catch (err) {
                    _iterator8.e(err);
                  } finally {
                    _iterator8.f();
                  }
                }
              } catch (err) {
                _iterator7.e(err);
              } finally {
                _iterator7.f();
              }
            }
          } catch (err) {
            _iterator6.e(err);
          } finally {
            _iterator6.f();
          }
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }

      this.depth -= 1;
      subtractNumericMapFrom(this.used, usedLastStep);
      return null;
    }
  }]);

  return SynthesisPlanner;
}();
var CANDY_FORMS = new Map([[template_string_$item(synthesis_templateObject7 || (synthesis_templateObject7 = synthesis_taggedTemplateLiteral(["peppermint sprout"]))), template_string_$items(synthesis_templateObject8 || (synthesis_templateObject8 = synthesis_taggedTemplateLiteral(["peppermint sprout, peppermint twist"])))]]);

function candyForms(candy) {
  var _CANDY_FORMS$get;

  return (_CANDY_FORMS$get = CANDY_FORMS.get(candy)) !== null && _CANDY_FORMS$get !== void 0 ? _CANDY_FORMS$get : [candy];
}
;// CONCATENATED MODULE: ./src/hccs.ts
var hccs_templateObject, hccs_templateObject2, hccs_templateObject3, hccs_templateObject4, hccs_templateObject5, hccs_templateObject6, hccs_templateObject7, hccs_templateObject8, hccs_templateObject9, hccs_templateObject10, hccs_templateObject11, hccs_templateObject12, hccs_templateObject13, hccs_templateObject14, hccs_templateObject15, hccs_templateObject16, hccs_templateObject17, hccs_templateObject18, hccs_templateObject19, hccs_templateObject20, hccs_templateObject21, hccs_templateObject22, hccs_templateObject23, hccs_templateObject24, hccs_templateObject25, hccs_templateObject26, hccs_templateObject27, hccs_templateObject28, hccs_templateObject29, hccs_templateObject30, hccs_templateObject31, hccs_templateObject32, hccs_templateObject33, hccs_templateObject34, hccs_templateObject35, hccs_templateObject36, hccs_templateObject37, hccs_templateObject38, hccs_templateObject39, hccs_templateObject40, hccs_templateObject41, hccs_templateObject42, hccs_templateObject43, hccs_templateObject44, hccs_templateObject45, hccs_templateObject46, hccs_templateObject47, hccs_templateObject48, hccs_templateObject49, hccs_templateObject50, hccs_templateObject51, hccs_templateObject52, hccs_templateObject53, hccs_templateObject54, hccs_templateObject55, hccs_templateObject56, hccs_templateObject57, hccs_templateObject58, hccs_templateObject59, hccs_templateObject60, hccs_templateObject61, hccs_templateObject62, hccs_templateObject63, hccs_templateObject64, hccs_templateObject65, hccs_templateObject66, hccs_templateObject67, _templateObject68, _templateObject69, _templateObject70, _templateObject71, _templateObject72, _templateObject73, _templateObject74, _templateObject75, _templateObject76, _templateObject77, _templateObject78, _templateObject79, _templateObject80, _templateObject81, _templateObject82, _templateObject83, _templateObject84, _templateObject85, _templateObject86, _templateObject87, _templateObject88, _templateObject89, _templateObject90, _templateObject91, _templateObject92, _templateObject93, _templateObject94, _templateObject95, _templateObject96, _templateObject97, _templateObject98, _templateObject99, _templateObject100, _templateObject101, _templateObject102, _templateObject103, _templateObject104, _templateObject105, _templateObject106, _templateObject107, _templateObject108, _templateObject109, _templateObject110, _templateObject111, _templateObject112, _templateObject113, _templateObject114, _templateObject115, _templateObject116, _templateObject117, _templateObject118, _templateObject119, _templateObject120, _templateObject121, _templateObject122, _templateObject123, _templateObject124, _templateObject125, _templateObject126, _templateObject127, _templateObject128, _templateObject129, _templateObject130, _templateObject131, _templateObject132, _templateObject133, _templateObject134, _templateObject135, _templateObject136, _templateObject137, _templateObject138, _templateObject139, _templateObject140, _templateObject141, _templateObject142, _templateObject143, _templateObject144, _templateObject145, _templateObject146, _templateObject147, _templateObject148, _templateObject149, _templateObject150, _templateObject151, _templateObject152, _templateObject153, _templateObject154, _templateObject155, _templateObject156, _templateObject157, _templateObject158, _templateObject159, _templateObject160, _templateObject161, _templateObject162, _templateObject163, _templateObject164, _templateObject165, _templateObject166, _templateObject167, _templateObject168, _templateObject169, _templateObject170, _templateObject171, _templateObject172, _templateObject173, _templateObject174, _templateObject175, _templateObject176, _templateObject177, _templateObject178, _templateObject179, _templateObject180, _templateObject181, _templateObject182, _templateObject183, _templateObject184, _templateObject185, _templateObject186, _templateObject187, _templateObject188, _templateObject189, _templateObject190, _templateObject191, _templateObject192, _templateObject193, _templateObject194, _templateObject195, _templateObject196, _templateObject197, _templateObject198, _templateObject199, _templateObject200, _templateObject201, _templateObject202, _templateObject203, _templateObject204, _templateObject205, _templateObject206, _templateObject207, _templateObject208, _templateObject209, _templateObject210, _templateObject211, _templateObject212, _templateObject213, _templateObject214, _templateObject215, _templateObject216, _templateObject217, _templateObject218, _templateObject219, _templateObject220, _templateObject221, _templateObject222, _templateObject223, _templateObject224, _templateObject225, _templateObject226, _templateObject227, _templateObject228, _templateObject229, _templateObject230, _templateObject231, _templateObject232, _templateObject233, _templateObject234, _templateObject235, _templateObject236, _templateObject237, _templateObject238, _templateObject239, _templateObject240, _templateObject241, _templateObject242, _templateObject243, _templateObject244, _templateObject245, _templateObject246, _templateObject247, _templateObject248, _templateObject249, _templateObject250, _templateObject251, _templateObject252, _templateObject253, _templateObject254, _templateObject255, _templateObject256, _templateObject257, _templateObject258, _templateObject259, _templateObject260, _templateObject261, _templateObject262, _templateObject263, _templateObject264, _templateObject265, _templateObject266, _templateObject267, _templateObject268, _templateObject269, _templateObject270, _templateObject271, _templateObject272, _templateObject273, _templateObject274, _templateObject275, _templateObject276, _templateObject277, _templateObject278, _templateObject279, _templateObject280, _templateObject281, _templateObject282, _templateObject283, _templateObject284, _templateObject285, _templateObject286, _templateObject287, _templateObject288, _templateObject289, _templateObject290, _templateObject291, _templateObject292, _templateObject293, _templateObject294, _templateObject295, _templateObject296, _templateObject297, _templateObject298, _templateObject299, _templateObject300, _templateObject301, _templateObject302, _templateObject303, _templateObject304, _templateObject305, _templateObject306, _templateObject307, _templateObject308, _templateObject309, _templateObject310, _templateObject311, _templateObject312, _templateObject313, _templateObject314, _templateObject315, _templateObject316, _templateObject317, _templateObject318, _templateObject319, _templateObject320, _templateObject321, _templateObject322, _templateObject323, _templateObject324, _templateObject325, _templateObject326, _templateObject327, _templateObject328, _templateObject329, _templateObject330, _templateObject331, _templateObject332, _templateObject333, _templateObject334, _templateObject335, _templateObject336, _templateObject337, _templateObject338, _templateObject339, _templateObject340, _templateObject341, _templateObject342, _templateObject343, _templateObject344, _templateObject345, _templateObject346, _templateObject347, _templateObject348, _templateObject349, _templateObject350, _templateObject351, _templateObject352, _templateObject353, _templateObject354, _templateObject355, _templateObject356, _templateObject357, _templateObject358, _templateObject359, _templateObject360, _templateObject361, _templateObject362, _templateObject363, _templateObject364, _templateObject365, _templateObject366, _templateObject367, _templateObject368, _templateObject369, _templateObject370, _templateObject371, _templateObject372, _templateObject373, _templateObject374, _templateObject375, _templateObject376, _templateObject377, _templateObject378, _templateObject379, _templateObject380, _templateObject381, _templateObject382, _templateObject383, _templateObject384, _templateObject385, _templateObject386, _templateObject387, _templateObject388, _templateObject389, _templateObject390, _templateObject391, _templateObject392, _templateObject393, _templateObject394, _templateObject395, _templateObject396, _templateObject397, _templateObject398, _templateObject399, _templateObject400, _templateObject401, _templateObject402, _templateObject403, _templateObject404, _templateObject405, _templateObject406, _templateObject407, _templateObject408, _templateObject409, _templateObject410, _templateObject411, _templateObject412, _templateObject413, _templateObject414, _templateObject415, _templateObject416, _templateObject417, _templateObject418, _templateObject419, _templateObject420, _templateObject421, _templateObject422, _templateObject423, _templateObject424, _templateObject425, _templateObject426, _templateObject427, _templateObject428, _templateObject429, _templateObject430, _templateObject431, _templateObject432, _templateObject433, _templateObject434, _templateObject435, _templateObject436, _templateObject437, _templateObject438, _templateObject439, _templateObject440, _templateObject441, _templateObject442, _templateObject443, _templateObject444, _templateObject445, _templateObject446, _templateObject447, _templateObject448, _templateObject449, _templateObject450, _templateObject451, _templateObject452, _templateObject453, _templateObject454, _templateObject455, _templateObject456, _templateObject457, _templateObject458, _templateObject459, _templateObject460, _templateObject461, _templateObject462, _templateObject463, _templateObject464, _templateObject465, _templateObject466, _templateObject467, _templateObject468, _templateObject469, _templateObject470, _templateObject471, _templateObject472, _templateObject473, _templateObject474, _templateObject475, _templateObject476, _templateObject477, _templateObject478, _templateObject479, _templateObject480, _templateObject481, _templateObject482, _templateObject483, _templateObject484, _templateObject485, _templateObject486;

function hccs_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }







var is100Run = true; // rewrite all combats
// create a defaultFamiliar function that chooses somewhat dynamically
// make a better geneTonic() function
// rewrite map uses to not use the c2t thing
// figure out synth

var TEST_HP = 1;
var TEST_MUS = 2;
var TEST_MYS = 3;
var TEST_MOX = 4;
var TEST_FAMILIAR = 5;
var TEST_WEAPON = 6;
var TEST_SPELL = 7;
var TEST_NONCOMBAT = 8;
var TEST_ITEM = 9;
var TEST_HOT_RES = 10;
var TEST_COIL_WIRE = 11;
var DONATE = 30;
var HP_TURNS = 0;
var MUS_TURNS = 0;
var MYS_TURNS = 0;
var MOX_TURNS = 0;
var FAMILIAR_TURNS = 0;
var WEAPON_TURNS = 0;
var SPELL_TURNS = 0;
var NONCOMBAT_TURNS = 0;
var ITEM_TURNS = 0;
var HOT_RES_TURNS = 0;
var TEMP_TURNS = 0;
var targetTurns = new Map();
var familiarFor100Run; // test order will be stats, hot, item, NC, Fam, weapon, spell

var START_TIME = (0,external_kolmafia_namespaceObject.gametimeToInt)();
var END_TIME = (0,external_kolmafia_namespaceObject.gametimeToInt)();
var justKillTheThing = Macro.trySkill(template_string_$skill(hccs_templateObject || (hccs_templateObject = hccs_taggedTemplateLiteral(["Curse of Weaksauce"])))).trySkill(template_string_$skill(hccs_templateObject2 || (hccs_templateObject2 = hccs_taggedTemplateLiteral(["Micrometeorite"])))).trySkill(template_string_$skill(hccs_templateObject3 || (hccs_templateObject3 = hccs_taggedTemplateLiteral(["Sing Along"])))).trySkill(template_string_$skill(hccs_templateObject4 || (hccs_templateObject4 = hccs_taggedTemplateLiteral(["Extract"])))).trySkill(template_string_$skill(hccs_templateObject5 || (hccs_templateObject5 = hccs_taggedTemplateLiteral(["Stuffed Mortar Shell"])))) //.skill($skill`Candyblast`)
.skill(template_string_$skill(hccs_templateObject6 || (hccs_templateObject6 = hccs_taggedTemplateLiteral(["Saucestorm"])))).step("repeat"); // Sweet Synthesis plan.
// This is the sequence of synthesis effects; we will, if possible, come up with a plan for allocating candy to each of these.

var synthesisPlanner = new SynthesisPlanner( //$effects`Synthesis: Learning, Synthesis: Smart, Synthesis: Strong, Synthesis: Cool, Synthesis: Collection`
$effects(hccs_templateObject7 || (hccs_templateObject7 = hccs_taggedTemplateLiteral(["Synthesis: Learning, Synthesis: Smart, Synthesis: Strong, Synthesis: Cool"]))));

function useDefaultFamiliar() {
  if (is100Run) {
    (0,external_kolmafia_namespaceObject.useFamiliar)(familiarFor100Run);
  } else if (property_get("camelSpit") < 100 && !property_get("csServicesPerformed").split(",").includes("Reduce Gazelle Population") && lib_have(template_string_$familiar(hccs_templateObject8 || (hccs_templateObject8 = hccs_taggedTemplateLiteral(["Melodramedary"]))))) {
    (0,external_kolmafia_namespaceObject.useFamiliar)(template_string_$familiar(hccs_templateObject9 || (hccs_templateObject9 = hccs_taggedTemplateLiteral(["Melodramedary"]))));
    if (lib_have(template_string_$item(hccs_templateObject10 || (hccs_templateObject10 = hccs_taggedTemplateLiteral(["dromedary drinking helmet"]))))) (0,external_kolmafia_namespaceObject.equip)(template_string_$item(hccs_templateObject11 || (hccs_templateObject11 = hccs_taggedTemplateLiteral(["dromedary drinking helmet"]))));
  } else if (lib_have(template_string_$familiar(hccs_templateObject12 || (hccs_templateObject12 = hccs_taggedTemplateLiteral(["Shorter-Order Cook"])))) && (0,external_kolmafia_namespaceObject.availableAmount)(template_string_$item(hccs_templateObject13 || (hccs_templateObject13 = hccs_taggedTemplateLiteral(["short stack of pancakes"])))) === 0 && (0,external_kolmafia_namespaceObject.haveEffect)($effect(hccs_templateObject14 || (hccs_templateObject14 = hccs_taggedTemplateLiteral(["Shortly Stacked"])))) === 0 && !property_get("csServicesPerformed").split(",").includes("Breed More Collies")) {
    (0,external_kolmafia_namespaceObject.useFamiliar)(template_string_$familiar(hccs_templateObject15 || (hccs_templateObject15 = hccs_taggedTemplateLiteral(["Shorter-Order Cook"]))));
  } else if (lib_have(template_string_$familiar(hccs_templateObject16 || (hccs_templateObject16 = hccs_taggedTemplateLiteral(["Garbage Fire"])))) && (0,external_kolmafia_namespaceObject.availableAmount)(template_string_$item(hccs_templateObject17 || (hccs_templateObject17 = hccs_taggedTemplateLiteral(["rope"])))) < 1 && (0,external_kolmafia_namespaceObject.availableAmount)(template_string_$item(hccs_templateObject18 || (hccs_templateObject18 = hccs_taggedTemplateLiteral(["burning newspaper"])))) + (0,external_kolmafia_namespaceObject.availableAmount)(template_string_$item(hccs_templateObject19 || (hccs_templateObject19 = hccs_taggedTemplateLiteral(["burning paper crane"])))) < 1) {
    (0,external_kolmafia_namespaceObject.useFamiliar)(template_string_$familiar(hccs_templateObject20 || (hccs_templateObject20 = hccs_taggedTemplateLiteral(["Garbage Fire"]))));
  } else {
    //useFamiliar($familiar`Machine Elf`);
    (0,external_kolmafia_namespaceObject.useFamiliar)(template_string_$familiar(hccs_templateObject21 || (hccs_templateObject21 = hccs_taggedTemplateLiteral(["Hovering Sombrero"]))));
  }
}

function hccs_tryUse(quantity, it) {
  if ((0,external_kolmafia_namespaceObject.availableAmount)(it) > 0) {
    return (0,external_kolmafia_namespaceObject.use)(quantity, it);
  } else {
    return false;
  }
}

function hccs_tryEquip(it) {
  if ((0,external_kolmafia_namespaceObject.availableAmount)(it) > 0) {
    return (0,external_kolmafia_namespaceObject.equip)(it);
  } else {
    return false;
  }
} // eslint-disable-next-line @typescript-eslint/no-unused-vars


function hccs_wishEffect(ef) {
  if ((0,external_kolmafia_namespaceObject.haveEffect)(ef) === 0) {
    (0,external_kolmafia_namespaceObject.cliExecute)("genie effect ".concat(ef.name));
  } else {
    (0,external_kolmafia_namespaceObject.print)("Already have effect ".concat(ef.name, "."));
  }
} // Checks that you don't already have the tonic or effect and if your syringe has the right phylum and if so, makes the appropriate tonic.


function geneTonic(ph) {
  if (tonicsLeft() < 1) throw "You can't make any more tonics";

  if (!have(getEffect(ph)) && !have(getTonic(ph))) {
    if (get("dnaSyringe") !== ph) throw "You have the wrong DNA in your syringe";
    makeTonic();

    if (!have(getTonic(ph))) {
      throw "something went wrong getting your gene tonic";
    } else {
      print("successfully created ".concat(getTonic(ph).name));
    }
  } else {
    print("You already have ".concat(ph, " DNA"));
  }
}

function summonBrickoOyster(maxSummons) {
  if (get("_brickoFights") >= 3) return false;
  if (availableAmount($item(hccs_templateObject22 || (hccs_templateObject22 = hccs_taggedTemplateLiteral(["BRICKO oyster"])))) > 0) return true;

  while (get("libramSummons") < maxSummons && (availableAmount($item(hccs_templateObject23 || (hccs_templateObject23 = hccs_taggedTemplateLiteral(["BRICKO eye brick"])))) < 1 || availableAmount($item(hccs_templateObject24 || (hccs_templateObject24 = hccs_taggedTemplateLiteral(["BRICKO brick"])))) < 8)) {
    useSkill(1, $skill(hccs_templateObject25 || (hccs_templateObject25 = hccs_taggedTemplateLiteral(["Summon BRICKOs"]))));
  }

  return use(8, $item(hccs_templateObject26 || (hccs_templateObject26 = hccs_taggedTemplateLiteral(["BRICKO brick"]))));
}

function fightSausageIfGuaranteed() {
  if (sausageFightGuaranteed()) {
    //equip($item`Iunion Crown`);
    //equip($slot`shirt`, $item`none`);
    (0,external_kolmafia_namespaceObject.equip)(template_string_$item(hccs_templateObject27 || (hccs_templateObject27 = hccs_taggedTemplateLiteral(["Fourth of May Cosplay Saber"]))));
    (0,external_kolmafia_namespaceObject.equip)(template_string_$item(hccs_templateObject28 || (hccs_templateObject28 = hccs_taggedTemplateLiteral(["Kramco Sausage-o-Matic\u2122"]))));
    (0,external_kolmafia_namespaceObject.equip)(template_string_$item(hccs_templateObject29 || (hccs_templateObject29 = hccs_taggedTemplateLiteral(["LOV Epaulettes"])))); //equip($item`old sweatpants`);
    //equip($slot`acc1`, $item`Eight Days a Week Pill Keeper`);

    (0,external_kolmafia_namespaceObject.equip)($slot(hccs_templateObject30 || (hccs_templateObject30 = hccs_taggedTemplateLiteral(["acc2"]))), template_string_$item(hccs_templateObject31 || (hccs_templateObject31 = hccs_taggedTemplateLiteral(["Powerful Glove"]))));
    (0,external_kolmafia_namespaceObject.equip)($slot(hccs_templateObject32 || (hccs_templateObject32 = hccs_taggedTemplateLiteral(["acc3"]))), template_string_$item(hccs_templateObject33 || (hccs_templateObject33 = hccs_taggedTemplateLiteral(["Lil' Doctor\u2122 bag"]))));
    useDefaultFamiliar();
    adventureMacroAuto(template_string_$location(hccs_templateObject34 || (hccs_templateObject34 = hccs_taggedTemplateLiteral(["The Neverending Party"]))), kill());
    (0,external_kolmafia_namespaceObject.setAutoAttack)(0);
  }
}

function testDone(testNum) {
  (0,external_kolmafia_namespaceObject.print)("Checking test ".concat(testNum, "..."));
  var text = (0,external_kolmafia_namespaceObject.visitUrl)("council.php");
  return !(0,external_kolmafia_namespaceObject.containsText)(text, "<input type=hidden name=option value=".concat(testNum, ">"));
}

function doTest(testNum) {
  if (!testDone(testNum)) {
    (0,external_kolmafia_namespaceObject.visitUrl)("choice.php?whichchoice=1089&option=".concat(testNum));

    if (!testDone(testNum)) {
      throw "Failed to do test ".concat(testNum, ". Maybe we are out of turns.");
    }
  } else {
    (0,external_kolmafia_namespaceObject.print)("Test ".concat(testNum, " already completed."));
  }
}

function nextLibramCost() {
  return mpCost($skill(hccs_templateObject35 || (hccs_templateObject35 = hccs_taggedTemplateLiteral(["Summon BRICKOs"]))));
} // TODO: combat filter functions SHOULD make this unnecessary


function withMacro(macro, action) {
  macro.save();

  try {
    return action();
  } finally {
    Macro.clearSaved();
  }
}

function moxTurns() {
  if ((0,external_kolmafia_namespaceObject.myClass)() === template_string_$class(hccs_templateObject36 || (hccs_templateObject36 = hccs_taggedTemplateLiteral(["Pastamancer"])))) {
    return 60 - (0,external_kolmafia_namespaceObject.floor)(((0,external_kolmafia_namespaceObject.myBuffedstat)($stat(hccs_templateObject37 || (hccs_templateObject37 = hccs_taggedTemplateLiteral(["moxie"])))) - (0,external_kolmafia_namespaceObject.myBasestat)($stat(hccs_templateObject38 || (hccs_templateObject38 = hccs_taggedTemplateLiteral(["mysticality"]))))) / 30);
  } else {
    return 60 - (0,external_kolmafia_namespaceObject.floor)(((0,external_kolmafia_namespaceObject.myBuffedstat)($stat(hccs_templateObject39 || (hccs_templateObject39 = hccs_taggedTemplateLiteral(["moxie"])))) - (0,external_kolmafia_namespaceObject.myBasestat)($stat(hccs_templateObject40 || (hccs_templateObject40 = hccs_taggedTemplateLiteral(["moxie"]))))) / 30);
  }
}

function hpTurns() {
  return 60 - (0,external_kolmafia_namespaceObject.floor)(((0,external_kolmafia_namespaceObject.myMaxhp)() - (0,external_kolmafia_namespaceObject.myBuffedstat)($stat(hccs_templateObject41 || (hccs_templateObject41 = hccs_taggedTemplateLiteral(["muscle"])))) - 3) / 30);
}

function musTurns() {
  if ((0,external_kolmafia_namespaceObject.myClass)() === template_string_$class(hccs_templateObject42 || (hccs_templateObject42 = hccs_taggedTemplateLiteral(["Pastamancer"])))) {
    return 60 - (0,external_kolmafia_namespaceObject.floor)(((0,external_kolmafia_namespaceObject.myBuffedstat)($stat(hccs_templateObject43 || (hccs_templateObject43 = hccs_taggedTemplateLiteral(["muscle"])))) - (0,external_kolmafia_namespaceObject.myBasestat)($stat(hccs_templateObject44 || (hccs_templateObject44 = hccs_taggedTemplateLiteral(["mysticality"]))))) / 30);
  } else {
    return 60 - (0,external_kolmafia_namespaceObject.floor)(((0,external_kolmafia_namespaceObject.myBuffedstat)($stat(hccs_templateObject45 || (hccs_templateObject45 = hccs_taggedTemplateLiteral(["muscle"])))) - (0,external_kolmafia_namespaceObject.myBasestat)($stat(hccs_templateObject46 || (hccs_templateObject46 = hccs_taggedTemplateLiteral(["muscle"]))))) / 30);
  }
}

function mysTurns() {
  return 60 - (0,external_kolmafia_namespaceObject.floor)(((0,external_kolmafia_namespaceObject.myBuffedstat)($stat(hccs_templateObject47 || (hccs_templateObject47 = hccs_taggedTemplateLiteral(["mysticality"])))) - (0,external_kolmafia_namespaceObject.myBasestat)($stat(hccs_templateObject48 || (hccs_templateObject48 = hccs_taggedTemplateLiteral(["mysticality"]))))) / 30);
}

function hotResTurns() {
  return 60 - (0,external_kolmafia_namespaceObject.round)((0,external_kolmafia_namespaceObject.numericModifier)("hot resistance"));
}

function nonCombatTurns() {
  //let's assume i will always have at least -25% combat rate to simplify calculation
  return 45 + ((0,external_kolmafia_namespaceObject.round)((0,external_kolmafia_namespaceObject.numericModifier)("combat rate")) + 25) * 3;
}

function familiarTurns() {
  return 60 - (0,external_kolmafia_namespaceObject.floor)(((0,external_kolmafia_namespaceObject.familiarWeight)((0,external_kolmafia_namespaceObject.myFamiliar)()) + (0,external_kolmafia_namespaceObject.round)((0,external_kolmafia_namespaceObject.numericModifier)("familiar weight"))) / 5 + 0.001);
}

function weaponTurns() {
  //code shamelessly copied from TourGuide
  var modifier_1 = (0,external_kolmafia_namespaceObject.numericModifier)("Weapon Damage");
  var modifier_2 = (0,external_kolmafia_namespaceObject.numericModifier)("Weapon Damage Percent");
  $slots(hccs_templateObject49 || (hccs_templateObject49 = hccs_taggedTemplateLiteral(["hat,weapon,off-hand,back,shirt,pants,acc1,acc2,acc3,familiar"]))).forEach(s => {
    var it = (0,external_kolmafia_namespaceObject.equippedItem)(s);
    if ((0,external_kolmafia_namespaceObject.toSlot)(it) !== $slot(hccs_templateObject50 || (hccs_templateObject50 = hccs_taggedTemplateLiteral(["weapon"])))) return;
    var power = (0,external_kolmafia_namespaceObject.getPower)(it);
    var addition = (0,external_kolmafia_namespaceObject.toFloat)(power) * 0.15;
    modifier_1 -= addition;
  });

  if ((0,external_kolmafia_namespaceObject.haveEffect)($effect(hccs_templateObject51 || (hccs_templateObject51 = hccs_taggedTemplateLiteral(["Bow-Legged Swagger"])))) > 0) {
    modifier_1 *= 2;
    modifier_2 *= 2;
  }

  return 60 - ((0,external_kolmafia_namespaceObject.floor)(modifier_1 / 50 + 0.001) + (0,external_kolmafia_namespaceObject.floor)(modifier_2 / 50 + 0.001));
}

function spellTurns() {
  return 60 - (0,external_kolmafia_namespaceObject.floor)((0,external_kolmafia_namespaceObject.numericModifier)("spell damage") / 50 + 0.001) - (0,external_kolmafia_namespaceObject.floor)((0,external_kolmafia_namespaceObject.numericModifier)("spell damage percent") / 50 + 0.001);
}

function itemdrop() {
  return 60 - (0,external_kolmafia_namespaceObject.floor)((0,external_kolmafia_namespaceObject.numericModifier)("Item Drop") / 30 + 0.001) - (0,external_kolmafia_namespaceObject.floor)((0,external_kolmafia_namespaceObject.numericModifier)("Booze Drop") / 15 + 0.001);
}

function testCoilWire() {
  if (!testDone(TEST_COIL_WIRE)) {
    setClan("Bonus Adventures from Hell");

    if (property_get("_clanFortuneConsultUses") < 3) {
      while (property_get("_clanFortuneConsultUses") < 3) {
        (0,external_kolmafia_namespaceObject.cliExecute)("fortune cheesefax garbage garbage thick");
        (0,external_kolmafia_namespaceObject.cliExecute)("wait 5");
      }
    }

    ensureMpTonic(1);

    if ((0,external_kolmafia_namespaceObject.myLevel)() === 1 && (0,external_kolmafia_namespaceObject.mySpleenUse)() === 0) {
      while (getPropertyInt("_universeCalculated") < getPropertyInt("skillLevel144")) {
        (0,external_kolmafia_namespaceObject.cliExecute)("numberology 69");
      }
    } // get cowboy boots


    (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=town_right&action=townright_ltt"); // Chateau piggy bank

    (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=chateau&action=chateau_desk1"); // Sell pork gems + tent

    (0,external_kolmafia_namespaceObject.visitUrl)("tutorial.php?action=toot");
    hccs_tryUse(1, template_string_$item(hccs_templateObject52 || (hccs_templateObject52 = hccs_taggedTemplateLiteral(["letter from King Ralph XI"]))));
    hccs_tryUse(1, template_string_$item(hccs_templateObject53 || (hccs_templateObject53 = hccs_taggedTemplateLiteral(["pork elf goodies sack"]))));
    (0,external_kolmafia_namespaceObject.autosell)((0,external_kolmafia_namespaceObject.availableAmount)(template_string_$item(hccs_templateObject54 || (hccs_templateObject54 = hccs_taggedTemplateLiteral(["baconstone"])))) - 1, template_string_$item(hccs_templateObject55 || (hccs_templateObject55 = hccs_taggedTemplateLiteral(["baconstone"]))));
    (0,external_kolmafia_namespaceObject.autosell)((0,external_kolmafia_namespaceObject.availableAmount)(template_string_$item(hccs_templateObject56 || (hccs_templateObject56 = hccs_taggedTemplateLiteral(["porquoise"])))) - 1, template_string_$item(hccs_templateObject57 || (hccs_templateObject57 = hccs_taggedTemplateLiteral(["porquoise"]))));
    (0,external_kolmafia_namespaceObject.autosell)((0,external_kolmafia_namespaceObject.availableAmount)(template_string_$item(hccs_templateObject58 || (hccs_templateObject58 = hccs_taggedTemplateLiteral(["hamethyst"])))) - 1, template_string_$item(hccs_templateObject59 || (hccs_templateObject59 = hccs_taggedTemplateLiteral(["hamethyst"])))); // Buy toy accordion

    ensureItem(1, template_string_$item(hccs_templateObject60 || (hccs_templateObject60 = hccs_taggedTemplateLiteral(["toy accordion"])))); // make pantogram pants for hilarity and spell damage

    if ((0,external_kolmafia_namespaceObject.availableAmount)(template_string_$item(hccs_templateObject61 || (hccs_templateObject61 = hccs_taggedTemplateLiteral(["pantogram pants"])))) === 0) {
      // retrieveItem(1, $item`ten-leaf clover`);
      (0,external_kolmafia_namespaceObject.cliExecute)("pantogram hot|-combat|silent");
    } //TODO: uncomment when you acquire skill
    //ensureSong($effect`The Magical Mojomuscular Melody`);


    if ((0,external_kolmafia_namespaceObject.haveEffect)($effect(hccs_templateObject62 || (hccs_templateObject62 = hccs_taggedTemplateLiteral(["Inscrutable Gaze"])))) === 0) {
      ensureMpTonic(10);
      lib_ensureEffect($effect(hccs_templateObject63 || (hccs_templateObject63 = hccs_taggedTemplateLiteral(["Inscrutable Gaze"]))));
    }

    if (getPropertyInt("_deckCardsDrawn") === 0) {
      (0,external_kolmafia_namespaceObject.cliExecute)("cheat 1952");
      (0,external_kolmafia_namespaceObject.autosell)(1, template_string_$item(hccs_templateObject64 || (hccs_templateObject64 = hccs_taggedTemplateLiteral(["1952 Mickey Mantle card"]))));
      (0,external_kolmafia_namespaceObject.buy)(1, template_string_$item(hccs_templateObject65 || (hccs_templateObject65 = hccs_taggedTemplateLiteral(["Desert Bus pass"]))));
    } // Campsite
    // if (haveEffect($effect`That\'s Just Cloud-Talk, Man`) === 0) {
    //   visitUrl("place.php?whichplace=campaway&action=campaway_sky");
    // }
    // Upgrade saber for fam wt


    (0,external_kolmafia_namespaceObject.visitUrl)("main.php?action=may4");
    (0,external_kolmafia_namespaceObject.runChoice)(4); //TODO:  Check if something else might had been better
    //20% item drop, +20% stats weapon

    if (!lib_have(template_string_$item(hccs_templateObject66 || (hccs_templateObject66 = hccs_taggedTemplateLiteral(["oversized sparkler"]))))) {
      (0,external_kolmafia_namespaceObject.visitUrl)("clan_viplounge.php?action=fwshop&whichfloor=2"); //a bug prevents buying if you haven't visited shop first

      (0,external_kolmafia_namespaceObject.buy)(1, template_string_$item(hccs_templateObject67 || (hccs_templateObject67 = hccs_taggedTemplateLiteral(["oversized sparkler"]))));
    } // NOTE: No turn 0 sausage fight!
    // should probably fight, digitize, wink a bishop or something here
    //TODO: vote?
    // Vote.
    // if (itemAmount($item`"I Voted!" sticker`) === 0) {
    //   visitUrl("place.php?whichplace=town_right&action=townright_vote");
    //   visitUrl("choice.php?option=1&whichchoice=1331&g=2&local%5B%5D=1&local%5B%5D=3");
    // // Make sure initiative-tracking works.
    // // visitUrl("place.php?whichplace=town_right&action=townright_vote");
    // }


    while (property_get("_smithsnessSummons") < 3) {
      ensureMpTonic(6);
      (0,external_kolmafia_namespaceObject.useSkill)(template_string_$skill(_templateObject68 || (_templateObject68 = hccs_taggedTemplateLiteral(["Summon Smithsness"]))));
    } //TODO: i don't have borrowed time so need to eat/drink here to get to 60 adventures
    // ensureCreateItem(1, $item`borrowed time`);
    // use(1, $item`borrowed time`);


    if ((0,external_kolmafia_namespaceObject.myFullness)() === 0) {
      (0,external_kolmafia_namespaceObject.buy)(template_string_$item(_templateObject69 || (_templateObject69 = hccs_taggedTemplateLiteral(["pickled egg"]))), 2);
      (0,external_kolmafia_namespaceObject.eat)(2, template_string_$item(_templateObject70 || (_templateObject70 = hccs_taggedTemplateLiteral(["This Charming Flan"]))));
    } // QUEST - Coil Wire


    doTest(TEST_COIL_WIRE);
  }

  if ((0,external_kolmafia_namespaceObject.myTurncount)() < 60) (0,external_kolmafia_namespaceObject.abort)("Something went wrong coiling wire.");
}

function levelUp() {
  if (!testDone(TEST_HP)) {
    // just in case?
    // if (haveEffect($effect`That\'s Just Cloud-Talk, Man`) === 0) {
    //   visitUrl("place.php?whichplace=campaway&action=campaway_sky");
    // }
    // Grab fish hatchett here, for fam wt, -combat, and muscle tests
    // TODO: see if you can cut this
    (0,external_kolmafia_namespaceObject.retrieveItem)(1, template_string_$item(_templateObject71 || (_templateObject71 = hccs_taggedTemplateLiteral(["fish hatchet"])))); // pulls wrench from deck

    if (getPropertyInt("_deckCardsDrawn") === 5) {
      (0,external_kolmafia_namespaceObject.cliExecute)("cheat wrench");
    } // uses familiar jacks to get camel equipment
    // if (availableAmount($item`10580`) === 0 && getPropertyInt("tomeSummons") < 3) {
    //   cliExecute("create 1 box of familiar jacks");
    //   useFamiliar($familiar`melodramedary`);
    //   use(1, $item`box of familiar jacks`);
    //   equip($item`dromedary drinking helmet`);
    // }
    // cliExecute("call detective_solver.ash");
    // buy(1, $item`shoe gum`);
    // learn extract and digitize


    (0,external_kolmafia_namespaceObject.cliExecute)("terminal educate extract");
    (0,external_kolmafia_namespaceObject.cliExecute)("terminal educate digitize");
    var lovePotion = template_string_$item(_templateObject72 || (_templateObject72 = hccs_taggedTemplateLiteral(["Love Potion #0"])));
    var loveEffect = $effect(_templateObject73 || (_templateObject73 = hccs_taggedTemplateLiteral(["Tainted Love Potion"])));

    if ((0,external_kolmafia_namespaceObject.haveEffect)(loveEffect) === 0) {
      if ((0,external_kolmafia_namespaceObject.availableAmount)(lovePotion) === 0) {
        (0,external_kolmafia_namespaceObject.useSkill)(1, template_string_$skill(_templateObject74 || (_templateObject74 = hccs_taggedTemplateLiteral(["Love Mixology"]))));
      }

      (0,external_kolmafia_namespaceObject.visitUrl)("desc_effect.php?whicheffect=".concat(loveEffect.descid));

      if ((0,external_kolmafia_namespaceObject.numericModifier)(loveEffect, "mysticality") > 10 && (0,external_kolmafia_namespaceObject.numericModifier)(loveEffect, "muscle") > -30 && (0,external_kolmafia_namespaceObject.numericModifier)(loveEffect, "moxie") > -30 && (0,external_kolmafia_namespaceObject.numericModifier)(loveEffect, "maximum hp percent") > -0.001) {
        (0,external_kolmafia_namespaceObject.use)(1, lovePotion);
      }
    } // bring along dark horse for the meats
    //horse("dark");
    // Boxing Daycare


    lib_ensureEffect($effect(_templateObject75 || (_templateObject75 = hccs_taggedTemplateLiteral(["Uncucumbered"])))); // Cast inscrutable gaze

    lib_ensureEffect($effect(_templateObject76 || (_templateObject76 = hccs_taggedTemplateLiteral(["Inscrutable Gaze"])))); // Shower lukewarm

    lib_ensureEffect($effect(_templateObject77 || (_templateObject77 = hccs_taggedTemplateLiteral(["Thaumodynamic"])))); // Beach Comb

    lib_ensureEffect($effect(_templateObject78 || (_templateObject78 = hccs_taggedTemplateLiteral(["You Learned Something Maybe!"])))); //TODO: should i use the rest of the clicks for random buffs?
    // Configure briefcase
    // enchantments wanted: weapon,hot,-combat,spell
    //   cliExecute("briefcase enchantment weapon hot -combat");
    //   /* while (getPropertyInt('_kgbClicksUsed') < 20) {
    //   cliExecute('briefcase buff random');
    // } */
    //TODO: get enough meat for bus pass?
    // Get beach access.
    // if (availableAmount($item`bitchin\' meatcar`) === 0) {
    //   ensureItem(1, $item`cog`);
    //   ensureItem(1, $item`sprocket`);
    //   ensureItem(1, $item`spring`);
    //   ensureItem(1, $item`empty meat tank`);
    //   ensureItem(1, $item`sweet rims`);
    //   ensureItem(1, $item`tires`);
    //   create(1, $item`bitchin\' meatcar`);
    // }
    // scrapbook for +exp

    (0,external_kolmafia_namespaceObject.equip)(template_string_$item(_templateObject79 || (_templateObject79 = hccs_taggedTemplateLiteral(["familiar scrapbook"])))); // Depends on Ez's Bastille script.

    (0,external_kolmafia_namespaceObject.cliExecute)("bastille myst brutalist"); // Tune moon sign to Blender. Have to do this now to get chewing gum.
    // if (!getPropertyBoolean("moonTuned")) {
    //   if (getPropertyInt("_campAwaySmileBuffs") === 0) {
    //     visitUrl("place.php?whichplace=campaway&action=campaway_sky");
    //   }
    //
    //   // Unequip spoon.
    //   equip($slot`acc1`, $item`Eight Days a Week Pill Keeper`);
    //   equip($slot`acc2`, $item`Powerful Glove`);
    //   equip($slot`acc3`, $item`Lil\' Doctor&trade; Bag`);
    //
    //   // Actually tune the moon.
    //   visitUrl("inv_use.php?whichitem=10254&doit=96&whichsign=8");
    // }

    (0,external_kolmafia_namespaceObject.cliExecute)("retrocape mysticality thrill"); // cross streams for a stat boost

    if (!getPropertyBoolean("_streamsCrossed")) {
      (0,external_kolmafia_namespaceObject.cliExecute)("crossstreams");
    } // if (
    //   getPropertyInt("_brickoFights") === 0 &&
    //   summonBrickoOyster(7) &&
    //   availableAmount($item`BRICKO oyster`) > 0
    // ) {
    //   if (availableAmount($item`bag of many confections`) > 0) error("We should not have a bag yet.");
    //   useFamiliar($familiar`Stocking Mimic`);
    //   equip($slot`familiar`, $item`none`);
    //   if (myHp() < 0.8 * myMaxhp()) {
    //     visitUrl("clan_viplounge.php?where=hottub");
    //   }
    //   ensureMpTonic(32);
    //   Macro.trySkill($skill`Otoscope`)
    //     .trySkill($skill`Curse of Weaksauce`)
    //     .trySkillRepeat($skill`Saucegeyser`)
    //     .setAutoAttack();
    //   use(1, $item`BRICKO oyster`);
    //   autosell(1, $item`BRICKO pearl`);
    //   setAutoAttack(0);
    // }
    //TODO visit garden
    // if (myGardenType() === "peppermint") {
    //   cliExecute("garden pick");
    // } else {
    //   print(
    //     "WARNING: This script is built for peppermint garden. Switch gardens or find other candy."
    //   );
    // }


    if (getPropertyInt("_candySummons") === 0) {
      (0,external_kolmafia_namespaceObject.useSkill)(1, template_string_$skill(_templateObject80 || (_templateObject80 = hccs_taggedTemplateLiteral(["Summon Crimbo Candy"]))));
    }

    if (property_get("_chubbyAndPlumpUsed") === false) {
      (0,external_kolmafia_namespaceObject.useSkill)(1, template_string_$skill(_templateObject81 || (_templateObject81 = hccs_taggedTemplateLiteral(["Chubby and Plump"]))));
    } // grab candies from gingerbread city, since we lack the other options to get them


    if (!property_get("_gingerbreadClockAdvanced")) {
      (0,external_kolmafia_namespaceObject.visitUrl)("adventure.php?snarfblat=477");
      (0,external_kolmafia_namespaceObject.runChoice)(1);
    }

    (0,external_kolmafia_namespaceObject.equip)($slot(_templateObject82 || (_templateObject82 = hccs_taggedTemplateLiteral(["acc2"]))), template_string_$item(_templateObject83 || (_templateObject83 = hccs_taggedTemplateLiteral(["Kremlin's Greatest Briefcase"]))));
    setChoice(1204, 1);

    while (getPropertyInt("_gingerbreadCityTurns") < 5) {
      useDefaultFamiliar();
      adventureMacro(template_string_$location(_templateObject84 || (_templateObject84 = hccs_taggedTemplateLiteral(["Gingerbread Train Station"]))), Macro.trySkill(template_string_$skill(_templateObject85 || (_templateObject85 = hccs_taggedTemplateLiteral(["KGB tranquilizer dart"])))).trySkill(template_string_$skill(_templateObject86 || (_templateObject86 = hccs_taggedTemplateLiteral(["Snokebomb"])))).abort());
    } // This is the sequence of synthesis effects; synthesis_plan will, if possible, come up with a plan for allocating candy to each of these.


    synthesisPlanner.synthesize($effect(_templateObject87 || (_templateObject87 = hccs_taggedTemplateLiteral(["Synthesis: Learning"]))));
    synthesisPlanner.synthesize($effect(_templateObject88 || (_templateObject88 = hccs_taggedTemplateLiteral(["Synthesis: Smart"])))); // if (round(numericModifier("mysticality experience percent")) < 80) {
    //   throw "Insufficient +stat%.";
    // }
    // Use ten-percent bonus

    hccs_tryUse(1, template_string_$item(_templateObject89 || (_templateObject89 = hccs_taggedTemplateLiteral(["a ten-percent bonus"])))); // Scavenge for gym equipment

    if ((0,external_kolmafia_namespaceObject.toInt)(property_get("_daycareGymScavenges")) < 1) {
      (0,external_kolmafia_namespaceObject.visitUrl)("/place.php?whichplace=town_wrong&action=townwrong_boxingdaycare");
      var pg = (0,external_kolmafia_namespaceObject.runChoice)(3);
      if ((0,external_kolmafia_namespaceObject.containsText)(pg, "[free]")) (0,external_kolmafia_namespaceObject.runChoice)(2);
      (0,external_kolmafia_namespaceObject.runChoice)(5);
      (0,external_kolmafia_namespaceObject.runChoice)(4);
    } // ensure_effect($effect[hulkien]);


    lib_ensureEffect($effect(_templateObject90 || (_templateObject90 = hccs_taggedTemplateLiteral(["Big"]))));
    lib_ensureEffect($effect(_templateObject91 || (_templateObject91 = hccs_taggedTemplateLiteral(["Favored by Lyle"]))));
    lib_ensureEffect($effect(_templateObject92 || (_templateObject92 = hccs_taggedTemplateLiteral(["Starry-Eyed"]))));
    lib_ensureEffect($effect(_templateObject93 || (_templateObject93 = hccs_taggedTemplateLiteral(["Triple-Sized"]))));
    lib_ensureEffect($effect(_templateObject94 || (_templateObject94 = hccs_taggedTemplateLiteral(["Feeling Excited"])))); //TODO: uncomment when i acquire skill
    //ensureSong($effect`The Magical Mojomuscular Melody`);

    ensureNpcEffect($effect(_templateObject95 || (_templateObject95 = hccs_taggedTemplateLiteral(["Glittering Eyelashes"]))), 5, template_string_$item(_templateObject96 || (_templateObject96 = hccs_taggedTemplateLiteral(["glittery mascara"])))); // Plan is for Beach Comb + PK buffs to fall all the way through to item -> hot res -> fam weight and spell dmg.

    lib_ensureEffect($effect(_templateObject97 || (_templateObject97 = hccs_taggedTemplateLiteral(["We're All Made of Starfish"]))));
    lib_ensureEffect($effect(_templateObject98 || (_templateObject98 = hccs_taggedTemplateLiteral(["Do I Know You From Somewhere?"]))));
    lib_ensureEffect($effect(_templateObject99 || (_templateObject99 = hccs_taggedTemplateLiteral(["Merry Smithsness"]))));
    (0,external_kolmafia_namespaceObject.useSkill)(1, template_string_$skill(_templateObject100 || (_templateObject100 = hccs_taggedTemplateLiteral(["Incredible Self-Esteem"])))); //might be something useful
    // visitUrl("desc_effect.php?whicheffect=af64d06351a3097af52def8ec6a83d9b"); //discover g9 effect
    // if (getPropertyInt("_g9Effect") >= 200) {
    //   wishEffect($effect`Experimental Effect G-9`);
    // } else {
    //   wishEffect($effect`New and Improved`);
    // }
    //candle correspondence

    if (lib_have(template_string_$item(_templateObject101 || (_templateObject101 = hccs_taggedTemplateLiteral(["votive of confidence"]))))) {
      lib_ensureEffect($effect(_templateObject102 || (_templateObject102 = hccs_taggedTemplateLiteral(["Confidence of the Votive"]))));
    } // if (myInebriety() == 0 && getPropertyInt("_g9Effect") <250) {
    //   //closet Swizzler if we have any since it will be consumed if in inventory while drinking and we want to save it for sweet synthesis
    //   putCloset($item`Swizzler`, itemAmount($item`Swizzler`));
    //   ensureOde(2);
    //   cliExecute("drink 1 Bee's Knees");
    //   takeCloset($item`Swizzler`, closetAmount($item`Swizzler`));
    // }
    //TODO: get other stat buffs?
    //TODO: uncomment if i acquire snojo
    // 10 snojo fights to while +stat is on, also getting ice rice
    // if (get("_snojoFreeFights") < 10) {
    //   useDefaultFamiliar();
    //   setProperty("choiceAdventure1310", "3"); // myst for ice rice, because it sells for more
    //   visitUrl("place.php?whichplace=snojo&action=snojo_controller");
    //   if (availableAmount($item`gene tonic: construct`) === 0 && get("dnaSyringe") !== $phylum`construct`) {
    //     adventureMacroAuto(
    //       $location`The X-32-F Combat Training Snowman`,
    //       Macro.item($item`DNA extraction syringe`).trySkillRepeat($skill`Saucestorm`)
    //     );
    //     geneTonic($phylum`construct`);
    //   }
    //   while (get("_snojoFreeFights") < 10) {
    //     useDefaultFamiliar();
    //     adventureMacroAuto($location`The X-32-F Combat Training Snowman`, kill());
    //   }
    // }
    // Don't use Kramco here.


    (0,external_kolmafia_namespaceObject.equip)($slot(_templateObject103 || (_templateObject103 = hccs_taggedTemplateLiteral(["off-hand"]))), template_string_$item(_templateObject104 || (_templateObject104 = hccs_taggedTemplateLiteral(["familiar scrapbook"])))); //TODO: uncomment if i get ghost
    // if (haveEffect($effect`holiday yoked`) === 0 && get("_kgbTranquilizerDartUses") < 3) {
    //   equip($slot`acc1`, $item`Kremlin's Greatest Briefcase`);
    //   useFamiliar($familiar`Ghost of Crimbo Carols`);
    //   adventureMacroAuto($location`Noob Cave`, Macro.trySkill($skill`KGB tranquilizer dart`));
    //   setAutoAttack(0);
    // }
    //TODO: do i need to make a mood here?

    (0,external_kolmafia_namespaceObject.cliExecute)("mood hccs"); // const mood = new Mood();
    // mood.skill($skill`Astral Shell`);
    // mood.skill($skill`Get Big`);
    // mood.skill($skill`Blood Bond`);
    // mood.skill($skill`Blood Bubble`);
    // mood.skill($skill`Carol of the Hells`);
    // mood.skill($skill`Elemental Saucesphere`);
    // mood.skill($skill`Empathy`);
    // mood.skill($skill`Inscrutable Gaze`);
    // mood.skill($skill`Leash of Linguini`);
    // mood.skill($skill`Singer's Faithful Ocelot`);
    // mood.skill($skill`Stevedave's Shanty of Superiority`);
    // mood.skill($skill`Ur-Kel's Aria of Annoyance`);
    // mood.skill($skill`Drescher's Annoying Noise`);
    // mood.skill($skill`Pride of the Puffin`);
    // mood.execute();
    // Chateau rest

    while (getPropertyInt("timesRested") < (0,external_kolmafia_namespaceObject.totalFreeRests)()) {
      (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=chateau&action=chateau_restbox");
    } // while (summonBrickoOyster(11) && availableAmount($item`BRICKO oyster`) > 0) {
    //   useDefaultFamiliar();
    //   if (myHp() < 0.8 * myMaxhp()) {
    //     visitUrl("clan_viplounge.php?where=hottub");
    //   }
    //   ensureMpTonic(32);
    //   Macro.trySkill($skill`Otoscope`)
    //     .trySkill($skill`Curse of Weaksauce`)
    //     .trySkillRepeat($skill`Saucegeyser`)
    //     .setAutoAttack();
    //   use(1, $item`BRICKO oyster`);
    //   autosell(1, $item`BRICKO pearl`);
    //   setAutoAttack(0);
    // }


    lib_ensureEffect($effect(_templateObject105 || (_templateObject105 = hccs_taggedTemplateLiteral(["Song of Bravado"]))));
    ensureSong($effect(_templateObject106 || (_templateObject106 = hccs_taggedTemplateLiteral(["Stevedave's Shanty of Superiority"]))));

    if ((0,external_kolmafia_namespaceObject.getProperty)("boomBoxSong") !== "Total Eclipse of Your Meat") {
      (0,external_kolmafia_namespaceObject.cliExecute)("boombox meat");
    } // Get buff things


    ensureSewerItem(1, template_string_$item(_templateObject107 || (_templateObject107 = hccs_taggedTemplateLiteral(["turtle totem"]))));
    ensureSewerItem(1, template_string_$item(_templateObject108 || (_templateObject108 = hccs_taggedTemplateLiteral(["saucepan"])))); // Don't use Kramco here.

    (0,external_kolmafia_namespaceObject.equip)($slot(_templateObject109 || (_templateObject109 = hccs_taggedTemplateLiteral(["off-hand"]))), template_string_$item(_templateObject110 || (_templateObject110 = hccs_taggedTemplateLiteral(["familiar scrapbook"])))); // Fruits in skeleton store (Saber YR)

    var missingOintment = (0,external_kolmafia_namespaceObject.availableAmount)(template_string_$item(_templateObject111 || (_templateObject111 = hccs_taggedTemplateLiteral(["ointment of the occult"])))) === 0 && (0,external_kolmafia_namespaceObject.availableAmount)(template_string_$item(_templateObject112 || (_templateObject112 = hccs_taggedTemplateLiteral(["grapefruit"])))) === 0 && (0,external_kolmafia_namespaceObject.haveEffect)($effect(_templateObject113 || (_templateObject113 = hccs_taggedTemplateLiteral(["Mystically Oiled"])))) === 0;
    var missingOil = (0,external_kolmafia_namespaceObject.availableAmount)(template_string_$item(_templateObject114 || (_templateObject114 = hccs_taggedTemplateLiteral(["oil of expertise"])))) === 0 && (0,external_kolmafia_namespaceObject.availableAmount)(template_string_$item(_templateObject115 || (_templateObject115 = hccs_taggedTemplateLiteral(["cherry"])))) === 0 && (0,external_kolmafia_namespaceObject.haveEffect)($effect(_templateObject116 || (_templateObject116 = hccs_taggedTemplateLiteral(["Expert Oiliness"])))) === 0;
    var missingPhilter = (0,external_kolmafia_namespaceObject.availableAmount)(template_string_$item(_templateObject117 || (_templateObject117 = hccs_taggedTemplateLiteral(["philter of phorce"])))) === 0 && (0,external_kolmafia_namespaceObject.availableAmount)(template_string_$item(_templateObject118 || (_templateObject118 = hccs_taggedTemplateLiteral(["lemon"])))) === 0 && (0,external_kolmafia_namespaceObject.haveEffect)($effect(_templateObject119 || (_templateObject119 = hccs_taggedTemplateLiteral(["Phorcefullness"])))) === 0;

    if ((0,external_kolmafia_namespaceObject.myClass)() !== template_string_$class(_templateObject120 || (_templateObject120 = hccs_taggedTemplateLiteral(["Pastamancer"]))) && (missingOil || missingOintment || missingPhilter)) {
      (0,external_kolmafia_namespaceObject.cliExecute)("mood apathetic");

      if (property_get("questM23Meatsmith") === "unstarted") {
        (0,external_kolmafia_namespaceObject.visitUrl)("shop.php?whichshop=meatsmith&action=talk");
        (0,external_kolmafia_namespaceObject.runChoice)(1);
      } // if (!canAdv($location`The Skeleton Store`, false)) error("Cannot open skeleton store!");


      (0,external_kolmafia_namespaceObject.adv1)(template_string_$location(_templateObject121 || (_templateObject121 = hccs_taggedTemplateLiteral(["The Skeleton Store"]))), -1, "");

      if (!(0,external_kolmafia_namespaceObject.containsText)(template_string_$location(_templateObject122 || (_templateObject122 = hccs_taggedTemplateLiteral(["The Skeleton Store"]))).noncombatQueue, "Skeletons In Store")) {
        throw "Something went wrong at skeleton store.";
      }

      (0,external_kolmafia_namespaceObject.setProperty)("choiceAdventure1387", "3");
      mapMonster(template_string_$location(_templateObject123 || (_templateObject123 = hccs_taggedTemplateLiteral(["The Skeleton Store"]))), $monster(_templateObject124 || (_templateObject124 = hccs_taggedTemplateLiteral(["novelty tropical skeleton"]))));
      withMacro(Macro.skill(template_string_$skill(_templateObject125 || (_templateObject125 = hccs_taggedTemplateLiteral(["Use the Force"])))), external_kolmafia_namespaceObject.runCombat);
      if ((0,external_kolmafia_namespaceObject.handlingChoice)()) (0,external_kolmafia_namespaceObject.runChoice)(3); // setProperty("mappingMonsters", "false");
    } //TODO:no map the monster uses. if i want this, figure alternative
    // if (availableAmount($item`Tomato juice of powerful power`) === 0 &&
    //   availableAmount($item`tomato`) === 0 &&
    //   haveEffect($effect`Tomato Power`) === 0 && getPropertyInt("_shatteringPunchUsed") < 3) {
    //   cliExecute("mood apathetic");
    //   setProperty("choiceAdventure1387", "3");
    //   mapMonster($location`The Haunted Pantry`, $monster`possessed can of tomatoes`);
    //   withMacro(Macro.skill($skill`feel envy`).skill($skill`shattering punch`), runCombat);
    //   // setProperty("mappingMonsters", "false");
    // }
    // become a human fish hybrid
    // if (!isHybridized($phylum`fish`) && get("dnaSyringe") !== $phylum`fish`) {
    //   // tryEquip($item`powerful glove`);
    //   // useFamiliar($familiar`frumious bandersnatch`);
    //   print($location`The Bubblin' Caldera`.noncombatQueue);
    //   adv1($location`The Bubblin' Caldera`, -1, "");
    //   adv1($location`The Bubblin' Caldera`, -1, "");
    //   print($location`The Bubblin' Caldera`.noncombatQueue);
    //   if (
    //     containsText(
    //       $location`The Bubblin' Caldera`.noncombatQueue,
    //       "Caldera Air; Aaaaah!  Aaaaaaaah!"
    //     )
    //   ) {
    //     adventureMacroAuto(
    //       $location`The Bubblin' Caldera`,
    //       Macro.while_(
    //         "!monstername lava lamprey",
    //         Macro.trySkill($skill`Extract`).trySkill($skill`Macrometeorite`)
    //       ).if_(
    //         "monstername lava lamprey",
    //         Macro.trySkill($skill`Extract`)
    //           .item($item`DNA extraction syringe`)
    //           .skill($skill`Feel Hatred`)
    //       )
    //     );
    //     useDefaultFamiliar();
    //     cliExecute("hottub"); // removing lava effect
    //     setAutoAttack(0);
    //   } else throw "Something went wrong getting fish DNA.";
    //   if (!hybridize()) throw "Failed to hybridize fish";
    // }


    if (!property_get("hasRange")) {
      ensureItem(1, template_string_$item(_templateObject126 || (_templateObject126 = hccs_taggedTemplateLiteral(["Dramatic\u2122 range"]))));
      (0,external_kolmafia_namespaceObject.use)(1, template_string_$item(_templateObject127 || (_templateObject127 = hccs_taggedTemplateLiteral(["Dramatic\u2122 range"]))));
    }

    (0,external_kolmafia_namespaceObject.useSkill)(1, template_string_$skill(_templateObject128 || (_templateObject128 = hccs_taggedTemplateLiteral(["Advanced Saucecrafting"]))));
    (0,external_kolmafia_namespaceObject.useSkill)(1, template_string_$skill(_templateObject129 || (_templateObject129 = hccs_taggedTemplateLiteral(["Prevent Scurvy and Sobriety"]))));
    ensurePotionEffect($effect(_templateObject130 || (_templateObject130 = hccs_taggedTemplateLiteral(["Mystically Oiled"]))), template_string_$item(_templateObject131 || (_templateObject131 = hccs_taggedTemplateLiteral(["ointment of the occult"])))); // Maximize familiar weight

    (0,external_kolmafia_namespaceObject.cliExecute)("fold makeshift garbage shirt");
    (0,external_kolmafia_namespaceObject.equip)(template_string_$item(_templateObject132 || (_templateObject132 = hccs_taggedTemplateLiteral(["makeshift garbage shirt"]))));
    (0,external_kolmafia_namespaceObject.equip)(template_string_$item(_templateObject133 || (_templateObject133 = hccs_taggedTemplateLiteral(["Fourth of May Cosplay Saber"])))); //equip($slot`acc1`, $item`Eight Days a Week Pill Keeper`);

    (0,external_kolmafia_namespaceObject.equip)($slot(_templateObject134 || (_templateObject134 = hccs_taggedTemplateLiteral(["acc2"]))), template_string_$item(_templateObject135 || (_templateObject135 = hccs_taggedTemplateLiteral(["Brutal brogues"]))));
    (0,external_kolmafia_namespaceObject.equip)($slot(_templateObject136 || (_templateObject136 = hccs_taggedTemplateLiteral(["acc3"]))), template_string_$item(_templateObject137 || (_templateObject137 = hccs_taggedTemplateLiteral(["Lil' Doctor\u2122 bag"])))); // LOV tunnel for elixirs, epaulettes, and heart surgery

    if (!property_get("_loveTunnelUsed")) {
      useDefaultFamiliar();
      lib_ensureEffect($effect(_templateObject138 || (_templateObject138 = hccs_taggedTemplateLiteral(["Carol of the Bulls"]))));
      lib_ensureEffect($effect(_templateObject139 || (_templateObject139 = hccs_taggedTemplateLiteral(["Carol of the Hells"]))));
      setChoice(1222, 1); // Entrance

      setChoice(1223, 1); // Fight LOV Enforcer

      setChoice(1224, 2); // LOV Epaulettes

      setChoice(1225, 1); // Fight LOV Engineer

      setChoice(1226, 2); // Open Heart Surgery

      setChoice(1227, 1); // Fight LOV Equivocator

      setChoice(1228, 1); // Take enamorang

      Macro.if_('monstername "LOV enforcer"', Macro.attack().repeat()).if_('monstername "lov engineer"', Macro.skill(template_string_$skill(_templateObject140 || (_templateObject140 = hccs_taggedTemplateLiteral(["Saucegeyser"])))).repeat()).step(justKillTheThing).setAutoAttack(); // setAutoAttack("HCCS_LOV_tunnel");

      (0,external_kolmafia_namespaceObject.adv1)(template_string_$location(_templateObject141 || (_templateObject141 = hccs_taggedTemplateLiteral(["The Tunnel of L.O.V.E."]))), -1, "");
      (0,external_kolmafia_namespaceObject.setAutoAttack)(0);
    }

    (0,external_kolmafia_namespaceObject.equip)(template_string_$item(_templateObject142 || (_templateObject142 = hccs_taggedTemplateLiteral(["LOV Epaulettes"])))); // spend 5 turns in DMT, skipping joy and cert, just get stats
    // while (get("_machineTunnelsAdv") < 5) {
    //   useFamiliar($familiar`Machine Elf`);
    //   adventureMacroAuto($location`The Deep Machine Tunnels`, kill());
    //   /* if ((availableAmount($item`abstraction: thought`) === 0) && (availableAmount($item`abstraction: certainty`) === 0) && (get("_machineTunnelsAdv") < 5)) {
    //     setAutoAttack("melfgetthought");
    //     adv1($location`the deep machine tunnels`, -1, "");
    //     setAutoAttack(0);
    //   } else if ((availableAmount($item`abstraction: thought`) >= 1) && (availableAmount($item`abstraction: certainty`) === 0) && (get("_machineTunnelsAdv") < 5)) {
    //     setAutoAttack("melfgetcertainty");
    //     adv1($location`the deep machine tunnels`, -1, "");
    //     setAutoAttack(0);
    //   } else {
    //     adventureKill($location`the deep machine tunnels`);
    //   } */
    // }

    useDefaultFamiliar();
  } //witchess fights


  if (property_get("_witchessFights") < 5) {
    (0,external_kolmafia_namespaceObject.equip)(template_string_$item(_templateObject143 || (_templateObject143 = hccs_taggedTemplateLiteral(["Fourth of May Cosplay Saber"]))));
    useDefaultFamiliar();

    while (property_get("_witchessFights") === 0) {
      Macro.step(justKillTheThing).setAutoAttack();
      fightPiece($monster(_templateObject144 || (_templateObject144 = hccs_taggedTemplateLiteral(["Witchess Bishop"]))));
      (0,external_kolmafia_namespaceObject.setAutoAttack)(0);
    }

    while (property_get("_witchessFights") === 1) {
      useDefaultFamiliar();
      Macro.attack().repeat().setAutoAttack();
      lib_ensureEffect($effect(_templateObject145 || (_templateObject145 = hccs_taggedTemplateLiteral(["Carol of the Bulls"]))));
      fightPiece($monster(_templateObject146 || (_templateObject146 = hccs_taggedTemplateLiteral(["Witchess King"]))));
      (0,external_kolmafia_namespaceObject.setAutoAttack)(0);
    }

    while (property_get("_witchessFights") === 2) {
      useDefaultFamiliar();
      Macro.attack().repeat().setAutoAttack();
      lib_ensureEffect($effect(_templateObject147 || (_templateObject147 = hccs_taggedTemplateLiteral(["Carol of the Bulls"]))));
      fightPiece($monster(_templateObject148 || (_templateObject148 = hccs_taggedTemplateLiteral(["Witchess Witch"]))));
      (0,external_kolmafia_namespaceObject.setAutoAttack)(0);
    }

    while (property_get("_witchessFights") === 3) {
      useDefaultFamiliar();
      Macro.step(justKillTheThing).setAutoAttack();
      fightPiece($monster(_templateObject149 || (_templateObject149 = hccs_taggedTemplateLiteral(["Witchess Bishop"]))));
      (0,external_kolmafia_namespaceObject.setAutoAttack)(0);
    }
  }

  (0,external_kolmafia_namespaceObject.equip)(template_string_$item(_templateObject150 || (_templateObject150 = hccs_taggedTemplateLiteral(["makeshift garbage shirt"])))); // get witchess buff, this should fall all the way through to fam wt

  if ((0,external_kolmafia_namespaceObject.haveEffect)($effect(_templateObject151 || (_templateObject151 = hccs_taggedTemplateLiteral(["Puzzle Champ"])))) === 0) {
    (0,external_kolmafia_namespaceObject.cliExecute)("witchess");
  } // Checking if it's gerald(ine) and accepting the quest if it is, otherwise just here to party.


  if (property_get("_questPartyFair") === "unstarted") {
    (0,external_kolmafia_namespaceObject.setProperty)("choiceAventure1322", "");
    (0,external_kolmafia_namespaceObject.visitUrl)("adventure.php?snarfblat=528"); // if (get("_questPartyFairQuest") === "food") {
    //   runChoice(1);
    //   setChoice(1324, 2);
    //   setChoice(1326, 3);
    // } else if (get("_questPartyFairQuest") === "booze") {
    //   runChoice(1);
    //   setChoice(1324, 3);
    //   setChoice(1327, 3);
    // } else {

    (0,external_kolmafia_namespaceObject.runChoice)(2);
    setChoice(1324, 5); // }
  }

  setChoice(1325, 2); // +20% mys exp buff
  // Professor 9x free sausage fight @ NEP

  if (!is100Run) {
    if (property_get("_sausageFights") === 0) {
      (0,external_kolmafia_namespaceObject.useFamiliar)(template_string_$familiar(_templateObject152 || (_templateObject152 = hccs_taggedTemplateLiteral(["Pocket Professor"]))));
      hccs_tryEquip(template_string_$item(_templateObject153 || (_templateObject153 = hccs_taggedTemplateLiteral(["Pocket Professor memory chip"]))));
      (0,external_kolmafia_namespaceObject.equip)(template_string_$item(_templateObject154 || (_templateObject154 = hccs_taggedTemplateLiteral(["Kramco Sausage-o-Matic\u2122"]))));
      (0,external_kolmafia_namespaceObject.equip)($slot(_templateObject155 || (_templateObject155 = hccs_taggedTemplateLiteral(["acc2"]))), template_string_$item(_templateObject156 || (_templateObject156 = hccs_taggedTemplateLiteral(["Brutal brogues"]))));
      (0,external_kolmafia_namespaceObject.equip)($slot(_templateObject157 || (_templateObject157 = hccs_taggedTemplateLiteral(["acc3"]))), template_string_$item(_templateObject158 || (_templateObject158 = hccs_taggedTemplateLiteral(["Beach Comb"]))));

      while (getPropertyInt("_sausageFights") === 0) {
        if ((0,external_kolmafia_namespaceObject.myHp)() < 0.8 * (0,external_kolmafia_namespaceObject.myMaxhp)()) {
          (0,external_kolmafia_namespaceObject.visitUrl)("clan_viplounge.php?where=hottub");
        } //setChoice(1322, 2);


        adventureMacroAuto(template_string_$location(_templateObject159 || (_templateObject159 = hccs_taggedTemplateLiteral(["The Neverending Party"]))), Macro.if_('!monstername "sausage goblin"', new Macro().step("abort")).trySkill(external_kolmafia_namespaceObject.Skill.get("Lecture on Relativity")).step(justKillTheThing));
        (0,external_kolmafia_namespaceObject.setAutoAttack)(0);
      }
    }
  }

  useDefaultFamiliar();
  (0,external_kolmafia_namespaceObject.equip)(template_string_$item(_templateObject160 || (_templateObject160 = hccs_taggedTemplateLiteral(["Kramco Sausage-o-Matic\u2122"]))));
  (0,external_kolmafia_namespaceObject.equip)($slot(_templateObject161 || (_templateObject161 = hccs_taggedTemplateLiteral(["acc3"]))), template_string_$item(_templateObject162 || (_templateObject162 = hccs_taggedTemplateLiteral(["backup camera"])))); //equip($slot`shirt`, $item`none`);
  //i am doing ok on stat test so save some backups for aftercore
  //if it is 100% familiar run, use them all since we aren't doing any professor fights

  while (property_get("_backUpUses") < 7 || is100Run && property_get("_backUpUses") < 11) {
    if (!(0,external_kolmafia_namespaceObject.haveEffect)($effect(_templateObject163 || (_templateObject163 = hccs_taggedTemplateLiteral(["Tomes of Opportunity"]))))) {
      setChoice(1324, 1); //go to +mys exp buff nc
    } else {
      setChoice(1324, 5); //fight
    }

    if (getPropertyInt("_sausageFights") >= 3) {
      (0,external_kolmafia_namespaceObject.equip)(template_string_$item(_templateObject164 || (_templateObject164 = hccs_taggedTemplateLiteral(["familiar scrapbook"]))));
    }

    useDefaultFamiliar();
    adventureMacroAuto(template_string_$location(_templateObject165 || (_templateObject165 = hccs_taggedTemplateLiteral(["The Neverending Party"]))), Macro.if_("!monstername Sausage Goblin", Macro.skill("Back-Up to Your Last Enemy")).step(justKillTheThing));
  }

  (0,external_kolmafia_namespaceObject.setAutoAttack)(0); // Breakfast
  // Visiting Looking Glass in clan VIP lounge

  (0,external_kolmafia_namespaceObject.visitUrl)("clan_viplounge.php?action=lookingglass&whichfloor=2");
  (0,external_kolmafia_namespaceObject.cliExecute)("swim item");

  while (getPropertyInt("_genieWishesUsed") < 3) {
    (0,external_kolmafia_namespaceObject.cliExecute)("genie wish for more wishes");
  } // Visiting the Ruined House
  //  visit_url('place.php?whichplace=desertbeach&action=db_nukehouse');


  (0,external_kolmafia_namespaceObject.useSkill)(1, template_string_$skill(_templateObject166 || (_templateObject166 = hccs_taggedTemplateLiteral(["Advanced Cocktailcrafting"]))));
  (0,external_kolmafia_namespaceObject.useSkill)(1, template_string_$skill(_templateObject167 || (_templateObject167 = hccs_taggedTemplateLiteral(["Pastamastery"]))));
  (0,external_kolmafia_namespaceObject.useSkill)(1, template_string_$skill(_templateObject168 || (_templateObject168 = hccs_taggedTemplateLiteral(["Spaghetti Breakfast"]))));
  (0,external_kolmafia_namespaceObject.useSkill)(1, template_string_$skill(_templateObject169 || (_templateObject169 = hccs_taggedTemplateLiteral(["Grab a Cold One"]))));
  (0,external_kolmafia_namespaceObject.useSkill)(1, template_string_$skill(_templateObject170 || (_templateObject170 = hccs_taggedTemplateLiteral(["Acquire Rhinestones"]))));
  (0,external_kolmafia_namespaceObject.useSkill)(1, template_string_$skill(_templateObject171 || (_templateObject171 = hccs_taggedTemplateLiteral(["Perfect Freeze"])))); //useSkill(1, $skill`summon kokomo resort pass`);
  //autosell(1, $item`kokomo resort pass`);

  (0,external_kolmafia_namespaceObject.autosell)(3, template_string_$item(_templateObject172 || (_templateObject172 = hccs_taggedTemplateLiteral(["coconut shell"]))));
  (0,external_kolmafia_namespaceObject.autosell)(3, template_string_$item(_templateObject173 || (_templateObject173 = hccs_taggedTemplateLiteral(["magical ice cubes"]))));
  (0,external_kolmafia_namespaceObject.autosell)(3, template_string_$item(_templateObject174 || (_templateObject174 = hccs_taggedTemplateLiteral(["little paper umbrella"])))); // Autosell stuff
  //autosell(1, $item[strawberry]);
  //autosell(1, $item[orange]);
  //autosell(1, $item`razor-sharp can lid`);
  //autosell(5, $item[red pixel]);
  //autosell(5, $item`green pixel`);
  //autosell(5, $item`blue pixel`);
  //autosell(5, $item`white pixel`);

  if ((0,external_kolmafia_namespaceObject.haveEffect)($effect(_templateObject175 || (_templateObject175 = hccs_taggedTemplateLiteral(["Carlweather's Cantata of Confrontation"])))) > 0) {
    (0,external_kolmafia_namespaceObject.cliExecute)("shrug Carlweather's Cantata of Confrontation");
  }

  if (!is100Run) {
    (0,external_kolmafia_namespaceObject.cliExecute)("mood hccs");
    (0,external_kolmafia_namespaceObject.equip)(template_string_$item(_templateObject176 || (_templateObject176 = hccs_taggedTemplateLiteral(["makeshift garbage shirt"]))));
    (0,external_kolmafia_namespaceObject.useFamiliar)(template_string_$familiar(_templateObject177 || (_templateObject177 = hccs_taggedTemplateLiteral(["God Lobster"]))));

    while (property_get("_godLobsterFights") < 2) {
      setChoice(1310, 1);
      hccs_tryEquip(template_string_$item(_templateObject178 || (_templateObject178 = hccs_taggedTemplateLiteral(["God Lobster's Scepter"]))));
      (0,external_kolmafia_namespaceObject.visitUrl)("main.php?fightgodlobster=1");
      (0,external_kolmafia_namespaceObject.runCombat)(Macro.trySkillRepeat(template_string_$skill(_templateObject179 || (_templateObject179 = hccs_taggedTemplateLiteral(["Saucegeyser"])))).toString());
      multiFightAutoAttack();
      (0,external_kolmafia_namespaceObject.runChoice)(-1);
      (0,external_kolmafia_namespaceObject.setAutoAttack)(0);
    }
  } // fight a witchess queen for pointy crown, getting a couple weapon damage effects just in case


  if ((0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)("_witchessFights")) === 4) {
    useDefaultFamiliar();
    (0,external_kolmafia_namespaceObject.useSkill)(1, template_string_$skill(_templateObject180 || (_templateObject180 = hccs_taggedTemplateLiteral(["Cannelloni Cocoon"]))));
    Macro.attack().repeat().setAutoAttack();
    lib_ensureEffect($effect(_templateObject181 || (_templateObject181 = hccs_taggedTemplateLiteral(["Carol of the Bulls"]))));
    lib_ensureEffect($effect(_templateObject182 || (_templateObject182 = hccs_taggedTemplateLiteral(["Song of the North"]))));
    fightPiece($monster(_templateObject183 || (_templateObject183 = hccs_taggedTemplateLiteral(["Witchess Queen"]))));
    (0,external_kolmafia_namespaceObject.setAutoAttack)(0);
  }

  useDefaultFamiliar();
  (0,external_kolmafia_namespaceObject.equip)($slot(_templateObject184 || (_templateObject184 = hccs_taggedTemplateLiteral(["acc3"]))), template_string_$item(_templateObject185 || (_templateObject185 = hccs_taggedTemplateLiteral(["Lil' Doctor\u2122 bag"])))); // 14 free NEP fights, using mob hit and xray

  while (getPropertyInt("_neverendingPartyFreeTurns") < 10 || (0,external_kolmafia_namespaceObject.haveSkill)(template_string_$skill(_templateObject186 || (_templateObject186 = hccs_taggedTemplateLiteral(["Chest X-Ray"])))) && property_get("_chestXRayUsed") < 3 || (0,external_kolmafia_namespaceObject.haveSkill)(template_string_$skill(_templateObject187 || (_templateObject187 = hccs_taggedTemplateLiteral(["Gingerbread Mob Hit"])))) && !property_get("_gingerbreadMobHitUsed")) {
    ensureNpcEffect($effect(_templateObject188 || (_templateObject188 = hccs_taggedTemplateLiteral(["Glittering Eyelashes"]))), 5, template_string_$item(_templateObject189 || (_templateObject189 = hccs_taggedTemplateLiteral(["glittery mascara"]))));
    ensureSong($effect(_templateObject190 || (_templateObject190 = hccs_taggedTemplateLiteral(["The Magical Mojomuscular Melody"]))));
    ensureSong($effect(_templateObject191 || (_templateObject191 = hccs_taggedTemplateLiteral(["Polka of Plenty"]))));
    lib_ensureEffect($effect(_templateObject192 || (_templateObject192 = hccs_taggedTemplateLiteral(["Inscrutable Gaze"]))));
    lib_ensureEffect($effect(_templateObject193 || (_templateObject193 = hccs_taggedTemplateLiteral(["Pride of the Puffin"]))));
    lib_ensureEffect($effect(_templateObject194 || (_templateObject194 = hccs_taggedTemplateLiteral(["Drescher's Annoying Noise"]))));
    ensureSong($effect(_templateObject195 || (_templateObject195 = hccs_taggedTemplateLiteral(["Ur-Kel's Aria of Annoyance"]))));
    lib_ensureEffect($effect(_templateObject196 || (_templateObject196 = hccs_taggedTemplateLiteral(["Feeling Excited"]))));

    if (!lib_have(template_string_$item(_templateObject197 || (_templateObject197 = hccs_taggedTemplateLiteral(["makeshift garbage shirt"]))))) {
      (0,external_kolmafia_namespaceObject.cliExecute)("fold makeshift garbage shirt");
    }

    if (!(0,external_kolmafia_namespaceObject.haveEquipped)(template_string_$item(_templateObject198 || (_templateObject198 = hccs_taggedTemplateLiteral(["makeshift garbage shirt"]))))) (0,external_kolmafia_namespaceObject.equip)(template_string_$item(_templateObject199 || (_templateObject199 = hccs_taggedTemplateLiteral(["makeshift garbage shirt"])))); // Get inner elf for leveling and moxie test
    // TODO: make this try again if she's busy
    // TODO: make this a function and move into lib
    // if (haveEffect($effect`Inner Elf`) === 0 && get("_snokebombUsed") < 3 && myLevel() > 12) {
    //   print(`${myLevel()}is my level at the moment, trying to get inner elf`, "red");
    //   Clan.join("Beldungeon");
    //   ensureEffect($effect`Blood Bubble`);
    //   useFamiliar($familiar`Machine Elf`);
    //   setChoice(326, 1);
    //   adventureMacro($location`The Slime Tube`, Macro.skill($skill`Snokebomb`));
    //   useDefaultFamiliar();
    //   Clan.join("Alliance from Hell");
    // }
    // Otherwise fight.

    setChoice(1324, 5);
    ensureMpSausage(100);

    if (property_get("_neverendingPartyFreeTurns") < 10 && property_get("_feelPrideUsed") < 3) {
      useDefaultFamiliar();
      adventureMacroAuto(template_string_$location(_templateObject200 || (_templateObject200 = hccs_taggedTemplateLiteral(["The Neverending Party"]))), Macro.trySkill(template_string_$skill(_templateObject201 || (_templateObject201 = hccs_taggedTemplateLiteral(["Feel Pride"])))).step(justKillTheThing));
    } else if (property_get("_neverendingPartyFreeTurns") < 10) {
      useDefaultFamiliar();
      adventureMacroAuto(template_string_$location(_templateObject202 || (_templateObject202 = hccs_taggedTemplateLiteral(["The Neverending Party"]))), Macro.step(justKillTheThing));
    } else {
      useDefaultFamiliar();
      adventureMacroAuto(template_string_$location(_templateObject203 || (_templateObject203 = hccs_taggedTemplateLiteral(["The Neverending Party"]))), Macro.trySkill(template_string_$skill(_templateObject204 || (_templateObject204 = hccs_taggedTemplateLiteral(["Chest X-Ray"])))).trySkill(template_string_$skill(_templateObject205 || (_templateObject205 = hccs_taggedTemplateLiteral(["Gingerbread Mob Hit"])))));
    }
  }
}

function testMox() {
  if (!testDone(TEST_MOX)) {
    if ((0,external_kolmafia_namespaceObject.myClass)() === template_string_$class(_templateObject206 || (_templateObject206 = hccs_taggedTemplateLiteral(["Pastamancer"])))) (0,external_kolmafia_namespaceObject.useSkill)(1, template_string_$skill(_templateObject207 || (_templateObject207 = hccs_taggedTemplateLiteral(["Bind Penne Dreadful"]))));else ensurePotionEffect($effect(_templateObject208 || (_templateObject208 = hccs_taggedTemplateLiteral(["Expert Oiliness"]))), template_string_$item(_templateObject209 || (_templateObject209 = hccs_taggedTemplateLiteral(["oil of expertise"])))); // Beach Comb

    lib_ensureEffect($effect(_templateObject210 || (_templateObject210 = hccs_taggedTemplateLiteral(["Pomp & Circumsands"])))); //todo: uncomment if i get birds
    // use(1, $item`Bird-a-Day Calendar`);
    // ensureEffect($effect`Blessing of the Bird`);
    // Should be 11% NC and 50% moxie, will fall through to NC test
    // ensureEffect($effect`Blessing of your favorite Bird`);

    lib_ensureEffect($effect(_templateObject211 || (_templateObject211 = hccs_taggedTemplateLiteral(["Big"]))));
    lib_ensureEffect($effect(_templateObject212 || (_templateObject212 = hccs_taggedTemplateLiteral(["Song of Bravado"]))));
    ensureSong($effect(_templateObject213 || (_templateObject213 = hccs_taggedTemplateLiteral(["Stevedave's Shanty of Superiority"]))));
    ensureSong($effect(_templateObject214 || (_templateObject214 = hccs_taggedTemplateLiteral(["The Moxious Madrigal"]))));
    lib_ensureEffect($effect(_templateObject215 || (_templateObject215 = hccs_taggedTemplateLiteral(["Quiet Desperation"]))));
    lib_ensureEffect($effect(_templateObject216 || (_templateObject216 = hccs_taggedTemplateLiteral(["Disco Fever"])))); // ensure_effect($effect[Tomato Power]);

    ensureNpcEffect($effect(_templateObject217 || (_templateObject217 = hccs_taggedTemplateLiteral(["Butt-Rock Hair"]))), 5, template_string_$item(_templateObject218 || (_templateObject218 = hccs_taggedTemplateLiteral(["hair spray"]))));
    (0,external_kolmafia_namespaceObject.use)((0,external_kolmafia_namespaceObject.availableAmount)(template_string_$item(_templateObject219 || (_templateObject219 = hccs_taggedTemplateLiteral(["rhinestone"])))), template_string_$item(_templateObject220 || (_templateObject220 = hccs_taggedTemplateLiteral(["rhinestone"]))));

    if ((0,external_kolmafia_namespaceObject.haveEffect)($effect(_templateObject221 || (_templateObject221 = hccs_taggedTemplateLiteral(["Unrunnable Face"])))) === 0) {
      hccs_tryUse(1, template_string_$item(_templateObject222 || (_templateObject222 = hccs_taggedTemplateLiteral(["runproof mascara"]))));
    }

    lib_ensureEffect($effect(_templateObject223 || (_templateObject223 = hccs_taggedTemplateLiteral(["Blubbered Up"]))));
    lib_ensureEffect($effect(_templateObject224 || (_templateObject224 = hccs_taggedTemplateLiteral(["Penne Fedora"]))));
    lib_ensureEffect($effect(_templateObject225 || (_templateObject225 = hccs_taggedTemplateLiteral(["Mariachi Mood"]))));
    lib_ensureEffect($effect(_templateObject226 || (_templateObject226 = hccs_taggedTemplateLiteral(["Disco State of Mind"]))));
    synthesisPlanner.synthesize($effect(_templateObject227 || (_templateObject227 = hccs_taggedTemplateLiteral(["Synthesis: Cool"]))));
    (0,external_kolmafia_namespaceObject.useFamiliar)(template_string_$familiar(_templateObject228 || (_templateObject228 = hccs_taggedTemplateLiteral(["Left-Hand Man"]))));
    (0,external_kolmafia_namespaceObject.maximize)("moxie", false);

    if (moxTurns() > targetTurns.get(TEST_MOX)) {
      throw "Can't achieve target turns for moxie test. Current: ".concat(moxTurns(), " Target: ").concat(targetTurns.get(TEST_MOX));
    }

    (0,external_kolmafia_namespaceObject.setProperty)("_hccsMoxTurnsUncapped", "".concat(moxTurns()));
    TEMP_TURNS = (0,external_kolmafia_namespaceObject.myTurncount)();
    doTest(TEST_MOX);
    MOX_TURNS = (0,external_kolmafia_namespaceObject.myTurncount)() - TEMP_TURNS;
    (0,external_kolmafia_namespaceObject.setProperty)("_hccsMoxTurns", MOX_TURNS.toString());

    if (is100Run) {
      (0,external_kolmafia_namespaceObject.useFamiliar)(familiarFor100Run);
    }
  }
}

function testHP() {
  if (!testDone(TEST_HP)) {
    if ((0,external_kolmafia_namespaceObject.myClass)() === template_string_$class(_templateObject229 || (_templateObject229 = hccs_taggedTemplateLiteral(["Pastamancer"])))) (0,external_kolmafia_namespaceObject.useSkill)(1, template_string_$skill(_templateObject230 || (_templateObject230 = hccs_taggedTemplateLiteral(["Bind Undead Elbow Macaroni"]))));else ensurePotionEffect($effect(_templateObject231 || (_templateObject231 = hccs_taggedTemplateLiteral(["Expert Oiliness"]))), template_string_$item(_templateObject232 || (_templateObject232 = hccs_taggedTemplateLiteral(["oil of expertise"])))); // ensure_effect($effect[Gr8ness]);
    // ensure_effect($effect[Tomato Power]);

    lib_ensureEffect($effect(_templateObject233 || (_templateObject233 = hccs_taggedTemplateLiteral(["Song of Starch"]))));
    lib_ensureEffect($effect(_templateObject234 || (_templateObject234 = hccs_taggedTemplateLiteral(["Big"]))));
    ensureSong($effect(_templateObject235 || (_templateObject235 = hccs_taggedTemplateLiteral(["Stevedave's Shanty of Superiority"]))));
    ensureSong($effect(_templateObject236 || (_templateObject236 = hccs_taggedTemplateLiteral(["Power Ballad of the Arrowsmith"]))));
    lib_ensureEffect($effect(_templateObject237 || (_templateObject237 = hccs_taggedTemplateLiteral(["Rage of the Reindeer"]))));
    lib_ensureEffect($effect(_templateObject238 || (_templateObject238 = hccs_taggedTemplateLiteral(["Quiet Determination"])))); //TODO: uncomment when you know it
    //ensureEffect($effect`Disdain of the War Snapper`);

    ensureNpcEffect($effect(_templateObject239 || (_templateObject239 = hccs_taggedTemplateLiteral(["Go Get 'Em, Tiger!"]))), 5, template_string_$item(_templateObject240 || (_templateObject240 = hccs_taggedTemplateLiteral(["Ben-Gal\u2122 Balm"]))));
    synthesisPlanner.synthesize($effect(_templateObject241 || (_templateObject241 = hccs_taggedTemplateLiteral(["Synthesis: Strong"])))); //useFamiliar($familiar`Disembodied Hand`);

    (0,external_kolmafia_namespaceObject.useFamiliar)(template_string_$familiar(_templateObject242 || (_templateObject242 = hccs_taggedTemplateLiteral(["Left-Hand Man"]))));
    (0,external_kolmafia_namespaceObject.maximize)("hp", false); // QUEST - Donate Blood (HP)

    if ((0,external_kolmafia_namespaceObject.myMaxhp)() - (0,external_kolmafia_namespaceObject.myBuffedstat)($stat(_templateObject243 || (_templateObject243 = hccs_taggedTemplateLiteral(["muscle"])))) - 3 < 1770) {
      error("Not enough HP to cap.");
      (0,external_kolmafia_namespaceObject.abort)();
    }

    if (hpTurns() > targetTurns.get(TEST_HP)) {
      throw "Can't achieve target turns for HP test. Current: ".concat(hpTurns(), " Target: ").concat(targetTurns.get(TEST_HP));
    }

    (0,external_kolmafia_namespaceObject.setProperty)("_hccsHpTurnsUncapped", "".concat(hpTurns()));
    TEMP_TURNS = (0,external_kolmafia_namespaceObject.myTurncount)();
    doTest(TEST_HP);
    HP_TURNS = (0,external_kolmafia_namespaceObject.myTurncount)() - TEMP_TURNS;
    (0,external_kolmafia_namespaceObject.setProperty)("_hccsHpTurns", HP_TURNS.toString());

    if (is100Run) {
      (0,external_kolmafia_namespaceObject.useFamiliar)(familiarFor100Run);
    }
  }
}

function testMus() {
  if (!testDone(TEST_MUS)) {
    if ((0,external_kolmafia_namespaceObject.myClass)() === template_string_$class(_templateObject244 || (_templateObject244 = hccs_taggedTemplateLiteral(["Pastamancer"])))) (0,external_kolmafia_namespaceObject.useSkill)(1, template_string_$skill(_templateObject245 || (_templateObject245 = hccs_taggedTemplateLiteral(["Bind Undead Elbow Macaroni"]))));else ensurePotionEffect($effect(_templateObject246 || (_templateObject246 = hccs_taggedTemplateLiteral(["Expert Oiliness"]))), template_string_$item(_templateObject247 || (_templateObject247 = hccs_taggedTemplateLiteral(["oil of expertise"]))));
    hccs_tryUse(1, template_string_$item(_templateObject248 || (_templateObject248 = hccs_taggedTemplateLiteral(["astral six-pack"])))); //closet Swizzler if we have any since it will be consumed if in inventory while drinking and we want to save it for sweet synthesis

    if (lib_have(template_string_$item(_templateObject249 || (_templateObject249 = hccs_taggedTemplateLiteral(["Swizzler"])))) && lib_have(template_string_$item(_templateObject250 || (_templateObject250 = hccs_taggedTemplateLiteral(["astral pilsner"]))))) {
      (0,external_kolmafia_namespaceObject.putCloset)(template_string_$item(_templateObject251 || (_templateObject251 = hccs_taggedTemplateLiteral(["Swizzler"]))), (0,external_kolmafia_namespaceObject.itemAmount)(template_string_$item(_templateObject252 || (_templateObject252 = hccs_taggedTemplateLiteral(["Swizzler"])))));
    }

    while (lib_have(template_string_$item(_templateObject253 || (_templateObject253 = hccs_taggedTemplateLiteral(["astral pilsner"])))) && (0,external_kolmafia_namespaceObject.myInebriety)() < (0,external_kolmafia_namespaceObject.inebrietyLimit)()) {
      ensureOde(1);
      (0,external_kolmafia_namespaceObject.drink)(1, template_string_$item(_templateObject254 || (_templateObject254 = hccs_taggedTemplateLiteral(["astral pilsner"]))));
    }

    (0,external_kolmafia_namespaceObject.takeCloset)(template_string_$item(_templateObject255 || (_templateObject255 = hccs_taggedTemplateLiteral(["Swizzler"]))), (0,external_kolmafia_namespaceObject.closetAmount)(template_string_$item(_templateObject256 || (_templateObject256 = hccs_taggedTemplateLiteral(["Swizzler"])))));
    lib_ensureEffect($effect(_templateObject257 || (_templateObject257 = hccs_taggedTemplateLiteral(["Big"]))));
    lib_ensureEffect($effect(_templateObject258 || (_templateObject258 = hccs_taggedTemplateLiteral(["Song of Bravado"]))));
    ensureSong($effect(_templateObject259 || (_templateObject259 = hccs_taggedTemplateLiteral(["Stevedave's Shanty of Superiority"]))));
    ensureSong($effect(_templateObject260 || (_templateObject260 = hccs_taggedTemplateLiteral(["Power Ballad of the Arrowsmith"]))));
    lib_ensureEffect($effect(_templateObject261 || (_templateObject261 = hccs_taggedTemplateLiteral(["Rage of the Reindeer"]))));
    lib_ensureEffect($effect(_templateObject262 || (_templateObject262 = hccs_taggedTemplateLiteral(["Quiet Determination"])))); //TODO: uncomment when you know it
    //ensureEffect($effect`Disdain of the War Snapper`);
    // ensure_effect($effect[Tomato Power]);

    ensureNpcEffect($effect(_templateObject263 || (_templateObject263 = hccs_taggedTemplateLiteral(["Go Get 'Em, Tiger!"]))), 5, template_string_$item(_templateObject264 || (_templateObject264 = hccs_taggedTemplateLiteral(["Ben-Gal\u2122 Balm"])))); // ensure_effect($effect[Ham-Fisted]);

    (0,external_kolmafia_namespaceObject.create)(1, template_string_$item(_templateObject265 || (_templateObject265 = hccs_taggedTemplateLiteral(["philter of phorce"]))));
    lib_ensureEffect($effect(_templateObject266 || (_templateObject266 = hccs_taggedTemplateLiteral(["Phorcefullness"])))); // Beach Comb

    lib_ensureEffect($effect(_templateObject267 || (_templateObject267 = hccs_taggedTemplateLiteral(["Lack of Body-Building"]))));
    (0,external_kolmafia_namespaceObject.useFamiliar)(template_string_$familiar(_templateObject268 || (_templateObject268 = hccs_taggedTemplateLiteral(["Left-Hand Man"]))));
    (0,external_kolmafia_namespaceObject.maximize)("muscle", false);

    if (musTurns() > targetTurns.get(TEST_MUS)) {
      throw "Can't achieve target turns for muscle test. Current: ".concat(musTurns(), " Target: ").concat(targetTurns.get(TEST_MUS));
    }

    (0,external_kolmafia_namespaceObject.setProperty)("_hccsMusTurnsUncapped", "".concat(musTurns()));
    TEMP_TURNS = (0,external_kolmafia_namespaceObject.myTurncount)();
    doTest(TEST_MUS);
    MUS_TURNS = (0,external_kolmafia_namespaceObject.myTurncount)() - TEMP_TURNS;
    (0,external_kolmafia_namespaceObject.setProperty)("_hccsMusTurns", MUS_TURNS.toString());

    if (is100Run) {
      (0,external_kolmafia_namespaceObject.useFamiliar)(familiarFor100Run);
    }
  }
}

function testMys() {
  if (!testDone(TEST_MYS)) {
    lib_ensureEffect($effect(_templateObject269 || (_templateObject269 = hccs_taggedTemplateLiteral(["Big"]))));
    lib_ensureEffect($effect(_templateObject270 || (_templateObject270 = hccs_taggedTemplateLiteral(["Song of Bravado"]))));
    ensureSong($effect(_templateObject271 || (_templateObject271 = hccs_taggedTemplateLiteral(["Stevedave's Shanty of Superiority"])))); //TODO: uncomment when you know it
    //ensureSong($effect`The Magical Mojomuscular Melody`);

    lib_ensureEffect($effect(_templateObject272 || (_templateObject272 = hccs_taggedTemplateLiteral(["Quiet Judgement"])))); // ensure_effect($effect[Tomato Power]);

    lib_ensureEffect($effect(_templateObject273 || (_templateObject273 = hccs_taggedTemplateLiteral(["Mystically Oiled"]))));
    ensureNpcEffect($effect(_templateObject274 || (_templateObject274 = hccs_taggedTemplateLiteral(["Glittering Eyelashes"]))), 5, template_string_$item(_templateObject275 || (_templateObject275 = hccs_taggedTemplateLiteral(["glittery mascara"]))));
    (0,external_kolmafia_namespaceObject.useFamiliar)(template_string_$familiar(_templateObject276 || (_templateObject276 = hccs_taggedTemplateLiteral(["Left-Hand Man"]))));
    (0,external_kolmafia_namespaceObject.maximize)("mysticality", false);

    if ((0,external_kolmafia_namespaceObject.myBuffedstat)($stat(_templateObject277 || (_templateObject277 = hccs_taggedTemplateLiteral(["mysticality"])))) - (0,external_kolmafia_namespaceObject.myBasestat)($stat(_templateObject278 || (_templateObject278 = hccs_taggedTemplateLiteral(["mysticality"])))) < 1770) {
      error("Not enough mysticality to cap.");
      (0,external_kolmafia_namespaceObject.abort)();
    }

    if (mysTurns() > targetTurns.get(TEST_MYS)) {
      throw "Can't achieve target turns for mysticality test. Current: ".concat(mysTurns(), " Target: ").concat(targetTurns.get(TEST_MYS));
    }

    (0,external_kolmafia_namespaceObject.setProperty)("_hccsMysTurnsUncapped", "".concat(mysTurns()));
    TEMP_TURNS = (0,external_kolmafia_namespaceObject.myTurncount)();
    doTest(TEST_MYS);
    MYS_TURNS = (0,external_kolmafia_namespaceObject.myTurncount)() - TEMP_TURNS;
    (0,external_kolmafia_namespaceObject.setProperty)("_hccsMysTurns", MYS_TURNS.toString());

    if (is100Run) {
      (0,external_kolmafia_namespaceObject.useFamiliar)(familiarFor100Run);
    }
  }
}

function testHotRes() {
  if (!testDone(TEST_HOT_RES)) {
    ensureMpSausage(500);
    useDefaultFamiliar();
    fightSausageIfGuaranteed(); // Make sure no moon spoon.
    //equip($slot`acc1`, $item`Eight Days a Week Pill Keeper`);

    (0,external_kolmafia_namespaceObject.equip)($slot(_templateObject279 || (_templateObject279 = hccs_taggedTemplateLiteral(["acc2"]))), template_string_$item(_templateObject280 || (_templateObject280 = hccs_taggedTemplateLiteral(["Powerful Glove"]))));
    (0,external_kolmafia_namespaceObject.equip)($slot(_templateObject281 || (_templateObject281 = hccs_taggedTemplateLiteral(["acc3"]))), template_string_$item(_templateObject282 || (_templateObject282 = hccs_taggedTemplateLiteral(["Lil' Doctor\u2122 bag"]))));

    if ((0,external_kolmafia_namespaceObject.availableAmount)(template_string_$item(_templateObject283 || (_templateObject283 = hccs_taggedTemplateLiteral(["heat-resistant gloves"])))) === 0) {
      (0,external_kolmafia_namespaceObject.setAutoAttack)(0);
      (0,external_kolmafia_namespaceObject.equip)(template_string_$item(_templateObject284 || (_templateObject284 = hccs_taggedTemplateLiteral(["Fourth of May Cosplay Saber"]))));
      (0,external_kolmafia_namespaceObject.equip)($slot(_templateObject285 || (_templateObject285 = hccs_taggedTemplateLiteral(["offhand"]))), template_string_$item(_templateObject286 || (_templateObject286 = hccs_taggedTemplateLiteral(["industrial fire extinguisher"])))); //equip($item`vampyric cloake`);

      (0,external_kolmafia_namespaceObject.adv1)(template_string_$location(_templateObject287 || (_templateObject287 = hccs_taggedTemplateLiteral(["LavaCo\u2122 Lamp Factory"]))), -1, "");

      if (!(0,external_kolmafia_namespaceObject.containsText)(template_string_$location(_templateObject288 || (_templateObject288 = hccs_taggedTemplateLiteral(["LavaCo\u2122 Lamp Factory"]))).noncombatQueue, "LavaCo&trade; Welcomes You")) {
        throw "Something went wrong at LavaCo.";
      }

      (0,external_kolmafia_namespaceObject.setProperty)("choiceAdventure1387", "3");
      mapMonster(template_string_$location(_templateObject289 || (_templateObject289 = hccs_taggedTemplateLiteral(["LavaCo\u2122 Lamp Factory"]))), $monster(_templateObject290 || (_templateObject290 = hccs_taggedTemplateLiteral(["factory worker (female)"]))));
      withMacro(Macro.trySkill(template_string_$skill(_templateObject291 || (_templateObject291 = hccs_taggedTemplateLiteral(["Become a Cloud of Mist"])))).skill(template_string_$skill(_templateObject292 || (_templateObject292 = hccs_taggedTemplateLiteral(["Fire Extinguisher: Foam Yourself"])))).skill(template_string_$skill(_templateObject293 || (_templateObject293 = hccs_taggedTemplateLiteral(["Meteor Shower"])))).skill(template_string_$skill(_templateObject294 || (_templateObject294 = hccs_taggedTemplateLiteral(["Use the Force"])))), external_kolmafia_namespaceObject.runCombat);

      while ((0,external_kolmafia_namespaceObject.lastChoice)() === 1387 && (0,external_kolmafia_namespaceObject.handlingChoice)()) {
        (0,external_kolmafia_namespaceObject.runChoice)(3);
      }

      (0,external_kolmafia_namespaceObject.setProperty)("mappingMonsters", "false");
    } // synth hot
    //synthesisPlanner.synthesize($effect`Synthesis: Hot`);
    // add +5 hot res to KGB, relies on Ezandora's script, naturally


    (0,external_kolmafia_namespaceObject.cliExecute)("briefcase e hot"); // set retrocape to elemental resistance

    (0,external_kolmafia_namespaceObject.cliExecute)("retrocape mus hold");
    lib_ensureEffect($effect(_templateObject295 || (_templateObject295 = hccs_taggedTemplateLiteral(["Blood Bond"]))));
    lib_ensureEffect($effect(_templateObject296 || (_templateObject296 = hccs_taggedTemplateLiteral(["Leash of Linguini"]))));
    lib_ensureEffect($effect(_templateObject297 || (_templateObject297 = hccs_taggedTemplateLiteral(["Empathy"]))));
    lib_ensureEffect($effect(_templateObject298 || (_templateObject298 = hccs_taggedTemplateLiteral(["Feeling Peaceful"])))); // Pool buff. This will fall through to fam weight.

    lib_ensureEffect($effect(_templateObject299 || (_templateObject299 = hccs_taggedTemplateLiteral(["Billiards Belligerence"]))));

    if ((0,external_kolmafia_namespaceObject.availableAmount)(template_string_$item(_templateObject300 || (_templateObject300 = hccs_taggedTemplateLiteral(["metal meteoroid"])))) > 0 && (0,external_kolmafia_namespaceObject.availableAmount)(template_string_$item(_templateObject301 || (_templateObject301 = hccs_taggedTemplateLiteral(["meteorite guard"])))) === 0) {
      (0,external_kolmafia_namespaceObject.cliExecute)("create 1 meteorite guard");
    }

    ensureItem(1, template_string_$item(_templateObject302 || (_templateObject302 = hccs_taggedTemplateLiteral(["tenderizing hammer"]))));
    (0,external_kolmafia_namespaceObject.cliExecute)("smash * ratty knitted cap");
    (0,external_kolmafia_namespaceObject.cliExecute)("smash * red-hot sausage fork");
    (0,external_kolmafia_namespaceObject.autosell)(10, template_string_$item(_templateObject303 || (_templateObject303 = hccs_taggedTemplateLiteral(["hot nuggets"]))));
    (0,external_kolmafia_namespaceObject.autosell)(10, template_string_$item(_templateObject304 || (_templateObject304 = hccs_taggedTemplateLiteral(["twinkly powder"]))));
    lib_ensureEffect($effect(_templateObject305 || (_templateObject305 = hccs_taggedTemplateLiteral(["Elemental Saucesphere"]))));
    lib_ensureEffect($effect(_templateObject306 || (_templateObject306 = hccs_taggedTemplateLiteral(["Astral Shell"])))); // Build up 100 turns of Deep Dark Visions for spell damage later.

    while ((0,external_kolmafia_namespaceObject.haveSkill)(template_string_$skill(_templateObject307 || (_templateObject307 = hccs_taggedTemplateLiteral(["Deep Dark Visions"])))) && (0,external_kolmafia_namespaceObject.haveEffect)($effect(_templateObject308 || (_templateObject308 = hccs_taggedTemplateLiteral(["Visions of the Deep Dark Deeps"])))) < 50) {
      if ((0,external_kolmafia_namespaceObject.myMp)() < 20) {
        ensureCreateItem(1, template_string_$item(_templateObject309 || (_templateObject309 = hccs_taggedTemplateLiteral(["magical sausage"]))));
        (0,external_kolmafia_namespaceObject.eat)(1, template_string_$item(_templateObject310 || (_templateObject310 = hccs_taggedTemplateLiteral(["magical sausage"]))));
      }

      while ((0,external_kolmafia_namespaceObject.myHp)() < (0,external_kolmafia_namespaceObject.myMaxhp)()) {
        (0,external_kolmafia_namespaceObject.useSkill)(1, template_string_$skill(_templateObject311 || (_templateObject311 = hccs_taggedTemplateLiteral(["Cannelloni Cocoon"]))));
      }

      if ((0,external_kolmafia_namespaceObject.myMp)() < 100) {
        ensureCreateItem(1, template_string_$item(_templateObject312 || (_templateObject312 = hccs_taggedTemplateLiteral(["magical sausage"]))));
        (0,external_kolmafia_namespaceObject.eat)(1, template_string_$item(_templateObject313 || (_templateObject313 = hccs_taggedTemplateLiteral(["magical sausage"]))));
      }

      if ((0,external_kolmafia_namespaceObject.round)((0,external_kolmafia_namespaceObject.numericModifier)("spooky resistance")) < 10) {
        lib_ensureEffect($effect(_templateObject314 || (_templateObject314 = hccs_taggedTemplateLiteral(["Does It Have a Skull In There??"]))));

        if ((0,external_kolmafia_namespaceObject.round)((0,external_kolmafia_namespaceObject.numericModifier)("spooky resistance")) < 10) {
          throw "Not enough spooky res for Deep Dark Visions.";
        }
      }

      (0,external_kolmafia_namespaceObject.useSkill)(1, template_string_$skill(_templateObject315 || (_templateObject315 = hccs_taggedTemplateLiteral(["Deep Dark Visions"]))));
    } // Beach comb buff.


    lib_ensureEffect($effect(_templateObject316 || (_templateObject316 = hccs_taggedTemplateLiteral(["Hot-Headed"])))); // if (get_property('_horsery') != 'pale horse') cli_execute('horsery pale');

    if (!getPropertyBoolean("_mayoTankSoaked") && (0,external_kolmafia_namespaceObject.getWorkshed)() === template_string_$item(_templateObject317 || (_templateObject317 = hccs_taggedTemplateLiteral(["portable Mayo Clinic"])))) {
      (0,external_kolmafia_namespaceObject.cliExecute)("mayosoak");
    } // Use pocket maze
    //if (availableAmount($item`pocket maze`) > 0) ensureEffect($effect`Amazing`);


    (0,external_kolmafia_namespaceObject.useFamiliar)(template_string_$familiar(_templateObject318 || (_templateObject318 = hccs_taggedTemplateLiteral(["Exotic Parrot"])))); // if (availableAmount($item`cracker`) === 0 && getPropertyInt("tomeSummons") < 3) {
    //   retrieveItem(1, $item`box of Familiar jacks`);
    //   use(1, $item`box of Familiar Jacks`);
    //   equip($item`cracker`);
    // }
    //candle correspondence

    if (lib_have(template_string_$item(_templateObject319 || (_templateObject319 = hccs_taggedTemplateLiteral(["rainbow glitter candle"]))))) {
      lib_ensureEffect($effect(_templateObject320 || (_templateObject320 = hccs_taggedTemplateLiteral(["Covered in the Rainbow"]))));
    } // Mafia sometimes can't figure out that multiple +weight things would get us to next tier.


    (0,external_kolmafia_namespaceObject.maximize)("hot res, 0.01 familiar weight", false);

    if (hotResTurns() > targetTurns.get(TEST_HOT_RES)) {
      throw "Can't achieve target turns for hot res test. Current: ".concat(hotResTurns(), " Target: ").concat(targetTurns.get(TEST_HOT_RES));
    } // cli_execute('modtrace Hot Resistance');
    // abort();
    //logprint(cliExecuteOutput("modtrace hot resistance"));


    (0,external_kolmafia_namespaceObject.setProperty)("_hccsHotResTurnsUncapped", "".concat(hotResTurns()));
    TEMP_TURNS = (0,external_kolmafia_namespaceObject.myTurncount)();
    doTest(TEST_HOT_RES);
    HOT_RES_TURNS = (0,external_kolmafia_namespaceObject.myTurncount)() - TEMP_TURNS;

    if (is100Run) {
      (0,external_kolmafia_namespaceObject.useFamiliar)(familiarFor100Run);
    }

    (0,external_kolmafia_namespaceObject.setProperty)("_hccsHotResTurns", HOT_RES_TURNS.toString());
  }
}

function testNonCombat() {
  if (!testDone(TEST_NONCOMBAT)) {
    fightSausageIfGuaranteed();
    if ((0,external_kolmafia_namespaceObject.myHp)() < 30) (0,external_kolmafia_namespaceObject.useSkill)(1, template_string_$skill(_templateObject321 || (_templateObject321 = hccs_taggedTemplateLiteral(["Cannelloni Cocoon"]))));
    lib_ensureEffect($effect(_templateObject322 || (_templateObject322 = hccs_taggedTemplateLiteral(["Blood Bond"]))));
    lib_ensureEffect($effect(_templateObject323 || (_templateObject323 = hccs_taggedTemplateLiteral(["Leash of Linguini"]))));
    lib_ensureEffect($effect(_templateObject324 || (_templateObject324 = hccs_taggedTemplateLiteral(["Empathy"])))); //horse("dark");

    if (!is100Run) {
      if (property_get("_godLobsterFights") < 3) {
        if ((0,external_kolmafia_namespaceObject.myHp)() < 0.8 * (0,external_kolmafia_namespaceObject.myMaxhp)()) (0,external_kolmafia_namespaceObject.useSkill)(1, template_string_$skill(_templateObject325 || (_templateObject325 = hccs_taggedTemplateLiteral(["Cannelloni Cocoon"]))));
        (0,external_kolmafia_namespaceObject.useFamiliar)(template_string_$familiar(_templateObject326 || (_templateObject326 = hccs_taggedTemplateLiteral(["God Lobster"])))); // Get -combat buff.

        (0,external_kolmafia_namespaceObject.setProperty)("choiceAdventure1310", "2");
        (0,external_kolmafia_namespaceObject.equip)(template_string_$item(_templateObject327 || (_templateObject327 = hccs_taggedTemplateLiteral(["God Lobster's Ring"]))));
        (0,external_kolmafia_namespaceObject.visitUrl)("main.php?fightgodlobster=1");
        withMacro(Macro.skill(template_string_$skill(_templateObject328 || (_templateObject328 = hccs_taggedTemplateLiteral(["Saucegeyser"])))), external_kolmafia_namespaceObject.runCombat);
        (0,external_kolmafia_namespaceObject.visitUrl)("choice.php");
        if ((0,external_kolmafia_namespaceObject.handlingChoice)()) (0,external_kolmafia_namespaceObject.runChoice)(2);
        (0,external_kolmafia_namespaceObject.setAutoAttack)(0);
      }
    } // setting KGB to NC, relies on Ezandora's script


    (0,external_kolmafia_namespaceObject.cliExecute)("briefcase e -combat"); // Pool buff. Should fall through to weapon damage.

    lib_ensureEffect($effect(_templateObject329 || (_templateObject329 = hccs_taggedTemplateLiteral(["Billiards Belligerence"]))));
    (0,external_kolmafia_namespaceObject.equip)($slot(_templateObject330 || (_templateObject330 = hccs_taggedTemplateLiteral(["acc3"]))), template_string_$item(_templateObject331 || (_templateObject331 = hccs_taggedTemplateLiteral(["Powerful Glove"])))); //ensureEffect($effect`gummed shoes`);

    lib_ensureEffect($effect(_templateObject332 || (_templateObject332 = hccs_taggedTemplateLiteral(["The Sonata of Sneakiness"]))));
    lib_ensureEffect($effect(_templateObject333 || (_templateObject333 = hccs_taggedTemplateLiteral(["Smooth Movements"]))));
    lib_ensureEffect($effect(_templateObject334 || (_templateObject334 = hccs_taggedTemplateLiteral(["Invisible Avatar"]))));
    lib_ensureEffect($effect(_templateObject335 || (_templateObject335 = hccs_taggedTemplateLiteral(["Silent Running"]))));
    lib_ensureEffect($effect(_templateObject336 || (_templateObject336 = hccs_taggedTemplateLiteral(["Feeling Lonely"])))); // Rewards

    lib_ensureEffect($effect(_templateObject337 || (_templateObject337 = hccs_taggedTemplateLiteral(["Throwing Some Shade"])))); // ensure_effect($effect[A Rose by Any Other Material]);
    // wish for disquiet riot because shades are hilariously expensive

    hccs_wishEffect($effect(_templateObject338 || (_templateObject338 = hccs_taggedTemplateLiteral(["Disquiet Riot"]))));
    (0,external_kolmafia_namespaceObject.useFamiliar)(template_string_$familiar(_templateObject339 || (_templateObject339 = hccs_taggedTemplateLiteral(["Disgeist"])))); // Pastamancer d1 is -combat.
    //TODO: uncomment if i buy bird iotm
    // if (myClass() === $class`pastamancer`) {
    //   ensureEffect($effect`Blessing of the Bird`);
    // }

    if ((0,external_kolmafia_namespaceObject.availableAmount)(template_string_$item(_templateObject340 || (_templateObject340 = hccs_taggedTemplateLiteral(["Daily Affirmation: Be Superficially interested"])))) > 0) {
      lib_ensureEffect($effect(_templateObject341 || (_templateObject341 = hccs_taggedTemplateLiteral(["Become Superficially interested"]))));
    }

    (0,external_kolmafia_namespaceObject.maximize)("-combat, 0.01 familiar weight", false);

    if (nonCombatTurns() > targetTurns.get(TEST_NONCOMBAT)) {
      throw "Can't achieve target turns for -combat test. Current: ".concat(nonCombatTurns(), " Target: ").concat(targetTurns.get(TEST_NONCOMBAT));
    }

    (0,external_kolmafia_namespaceObject.setProperty)("_hccsNonCombatTurnsUncapped", "".concat(nonCombatTurns()));
    TEMP_TURNS = (0,external_kolmafia_namespaceObject.myTurncount)();
    doTest(TEST_NONCOMBAT);
    NONCOMBAT_TURNS = (0,external_kolmafia_namespaceObject.myTurncount)() - TEMP_TURNS;

    if (is100Run) {
      (0,external_kolmafia_namespaceObject.useFamiliar)(familiarFor100Run);
    }

    (0,external_kolmafia_namespaceObject.setProperty)("_hccsNonCombatTurns", NONCOMBAT_TURNS.toString());
  }
}

function testFamiliarWeight() {
  if (!testDone(TEST_FAMILIAR)) {
    fightSausageIfGuaranteed(); // These should have fallen through all the way from leveling.
    //ensureEffect($effect`Fidoxene`);

    lib_ensureEffect($effect(_templateObject342 || (_templateObject342 = hccs_taggedTemplateLiteral(["Do I Know You From Somewhere?"])))); // Pool buff.

    lib_ensureEffect($effect(_templateObject343 || (_templateObject343 = hccs_taggedTemplateLiteral(["Billiards Belligerence"])))); //if (availableAmount($item`rope`) === 0) cliExecute("play rope");

    if ((0,external_kolmafia_namespaceObject.myHp)() < 30) (0,external_kolmafia_namespaceObject.useSkill)(1, template_string_$skill(_templateObject344 || (_templateObject344 = hccs_taggedTemplateLiteral(["Cannelloni Cocoon"]))));
    lib_ensureEffect($effect(_templateObject345 || (_templateObject345 = hccs_taggedTemplateLiteral(["Blood Bond"]))));
    lib_ensureEffect($effect(_templateObject346 || (_templateObject346 = hccs_taggedTemplateLiteral(["Leash of Linguini"]))));
    lib_ensureEffect($effect(_templateObject347 || (_templateObject347 = hccs_taggedTemplateLiteral(["Empathy"]))));
    lib_ensureEffect($effect(_templateObject348 || (_templateObject348 = hccs_taggedTemplateLiteral(["Robot Friends"])))); //ensureEffect($effect`Human-Machine Hybrid`);

    if (lib_have(template_string_$item(_templateObject349 || (_templateObject349 = hccs_taggedTemplateLiteral(["short stack of pancakes"]))))) lib_ensureEffect($effect(_templateObject350 || (_templateObject350 = hccs_taggedTemplateLiteral(["Shortly Stacked"]))));
    /*
    if (availableAmount($item`cracker`) > 0 && getPropertyInt("tomeSummons") < 3) {
      useFamiliar($familiar`Exotic Parrot`);
      equip($item`cracker`);
    }
    */
    // this is going to be all the gingerbread stuff, it is a work in progress
    // if (
    //   haveEffect($effect`Whole Latte Love`) === 0 &&
    //   availableAmount($item`gingerbread spice latte`) === 0
    // ) {
    //   useFamiliar($familiar`Chocolate Lab`);
    //   maximize("sprinkle drop", false);
    //   if (!get("_gingerbreadClockAdvanced")) {
    //     visitUrl("adventure.php?snarfblat=477");
    //     runChoice(1);
    //   }
    //   if (availableAmount($item`sprinkles`) < 50) {
    //     adventureMacroAuto(
    //       $location`Gingerbread Upscale Retail District`,
    //       Macro.if_("monstername gingerbread gentrifier", Macro.skill($skill`Macrometeorite`)).skill(
    //         $skill`Shattering Punch`
    //       )
    //     );
    //     setAutoAttack(0);
    //   }
    //   if (availableAmount($item`sprinkles`) >= 50) {
    //     // equip($slot`acc3`, $item`kremlin's greatest briefcase`);
    //     useFamiliar($familiar`Frumious Bandersnatch`);
    //     ensureEffect($effect`Ode to Booze`);
    //     setChoice(1208, 3);
    //     while (
    //       availableAmount($item`gingerbread spice latte`) === 0 &&
    //       haveEffect($effect`Whole Latte Love`) === 0
    //     ) {
    //       adventureMacro($location`Gingerbread Upscale Retail District`, Macro.runaway());
    //     }
    //   } else {
    //     throw "Something went wrong getting sprinkles";
    //   }
    //   use($item`gingerbread spice latte`);
    //   useDefaultFamiliar();
    // }

    if ((0,external_kolmafia_namespaceObject.haveEffect)($effect(_templateObject351 || (_templateObject351 = hccs_taggedTemplateLiteral(["Meteor Showered"])))) === 0) {
      (0,external_kolmafia_namespaceObject.equip)(template_string_$item(_templateObject352 || (_templateObject352 = hccs_taggedTemplateLiteral(["Fourth of May Cosplay Saber"]))));
      (0,external_kolmafia_namespaceObject.equip)(template_string_$item(_templateObject353 || (_templateObject353 = hccs_taggedTemplateLiteral(["familiar scrapbook"]))));
      setChoice(1387, 1); //we cant force drops so just banish

      adventureMacroAuto(template_string_$location(_templateObject354 || (_templateObject354 = hccs_taggedTemplateLiteral(["The Neverending Party"]))), Macro.trySkill(template_string_$skill(_templateObject355 || (_templateObject355 = hccs_taggedTemplateLiteral(["Meteor Shower"])))).trySkill(template_string_$skill(_templateObject356 || (_templateObject356 = hccs_taggedTemplateLiteral(["Use the Force"])))));
      (0,external_kolmafia_namespaceObject.setAutoAttack)(0);
    } //i don't have a garbage fire but no harm leaving this in


    if ((0,external_kolmafia_namespaceObject.availableAmount)(template_string_$item(_templateObject357 || (_templateObject357 = hccs_taggedTemplateLiteral(["burning newspaper"])))) > 0 && (0,external_kolmafia_namespaceObject.availableAmount)(template_string_$item(_templateObject358 || (_templateObject358 = hccs_taggedTemplateLiteral(["burning paper crane"])))) < 1) {
      (0,external_kolmafia_namespaceObject.cliExecute)("create 1 burning paper crane");
    }

    if (!lib_have(template_string_$item(_templateObject359 || (_templateObject359 = hccs_taggedTemplateLiteral(["sombrero-mounted sparkler"]))))) {
      (0,external_kolmafia_namespaceObject.buy)(1, template_string_$item(_templateObject360 || (_templateObject360 = hccs_taggedTemplateLiteral(["sombrero-mounted sparkler"]))));
    }

    lib_ensureEffect($effect(_templateObject361 || (_templateObject361 = hccs_taggedTemplateLiteral(["You Can Really Taste the Dormouse"])))); //if (!getPropertyBoolean("_clanFortuneBuffUsed")) cliExecute("fortune buff familiar");
    // wish for healthy green glow, +10 familiar weight
    //wishEffect($effect`healthy green glow`);
    // checking here to see if we had a tome summon for a cracker or if we should use BBB
    // if (availableAmount($item`cracker`) > 0) {
    //   useFamiliar($familiar`Exotic Parrot`);
    // } else if (availableAmount($item`bugged beanie`) === 1) {
    //   useFamiliar($familiar`Baby Bugged Bugbear`);
    // }
    // while (myMp() / myMaxmp() > 0.3 && nextLibramCost() <= myMp()) {
    //   useSkill($skill`Summon Candy Heart`);
    // }
    // if (availableAmount($item`green candy heart`) > 0) {
    //   ensureEffect($effect`Heart of Green`);
    // }

    (0,external_kolmafia_namespaceObject.maximize)("familiar weight", false);

    if (familiarTurns() > targetTurns.get(TEST_FAMILIAR)) {
      throw "Can't achieve target turns for familiar weight test. Current: ".concat(familiarTurns(), " Target: ").concat(targetTurns.get(TEST_FAMILIAR));
    }

    (0,external_kolmafia_namespaceObject.setProperty)("_hccsFamiliarTurnsUncapped", "".concat(familiarTurns()));
    TEMP_TURNS = (0,external_kolmafia_namespaceObject.myTurncount)();
    doTest(TEST_FAMILIAR);
    FAMILIAR_TURNS = (0,external_kolmafia_namespaceObject.myTurncount)() - TEMP_TURNS;
    (0,external_kolmafia_namespaceObject.setProperty)("_hccsFamiliarTurns", FAMILIAR_TURNS.toString());
  }
}

function testWeaponDamage() {
  if (!testDone(TEST_WEAPON)) {
    fightSausageIfGuaranteed();

    if ((0,external_kolmafia_namespaceObject.myInebriety)() < (0,external_kolmafia_namespaceObject.inebrietyLimit)() - 2 && !lib_have($effect(_templateObject362 || (_templateObject362 = hccs_taggedTemplateLiteral(["In a Lather"]))))) {
      //closet Swizzler if we have any since it will be consumed if in inventory while drinking and we want to save it for sweet synthesis
      (0,external_kolmafia_namespaceObject.putCloset)(template_string_$item(_templateObject363 || (_templateObject363 = hccs_taggedTemplateLiteral(["Swizzler"]))), (0,external_kolmafia_namespaceObject.itemAmount)(template_string_$item(_templateObject364 || (_templateObject364 = hccs_taggedTemplateLiteral(["Swizzler"])))));
      ensureOde(2);
      (0,external_kolmafia_namespaceObject.cliExecute)("drink 1 Sockdollager");
      (0,external_kolmafia_namespaceObject.takeCloset)(template_string_$item(_templateObject365 || (_templateObject365 = hccs_taggedTemplateLiteral(["Swizzler"]))), (0,external_kolmafia_namespaceObject.closetAmount)(template_string_$item(_templateObject366 || (_templateObject366 = hccs_taggedTemplateLiteral(["Swizzler"])))));
    } // Get inner elf for weapon damage
    // if (haveEffect($effect`Inner Elf`) === 0 && get("_snokebombUsed") < 3) {
    //   Clan.join("Beldungeon");
    //   ensureEffect($effect`Blood Bubble`);
    //   useFamiliar($familiar`Machine Elf`);
    //   setProperty("choiceAdventure326", "1");
    //   adventureMacro($location`The Slime Tube`, Macro.skill($skill`Snokebomb`));
    //   useDefaultFamiliar();
    //   Clan.join("Alliance from Hell");
    // } else {
    //   print("Something went wrong with getting inner elf");
    // }
    // Deck pull elf for DNA and ghost buff (reflex hammer)
    // if (!have($effect`Do You Crush What I Crush?`) || get("dnaSyringe") !== $phylum`elf`) {
    //   if (get("_deckCardsDrawn") === 5) {
    //     useFamiliar($familiar`Ghost of Crimbo Carols`);
    //     equip($slot`acc3`, $item`Lil' Doctor™ bag`);
    //     if (get("_reflexHammerUsed") > 2) {
    //       throw "You do not have any banishes left";
    //     }
    //     Macro.item($item`DNA extraction syringe`)
    //       .skill($skill`Reflex Hammer`)
    //       .setAutoAttack();
    //     cliExecute("cheat phylum elf");
    //     runCombat();
    //     useDefaultFamiliar();
    //   } else {
    //     throw "You are out of deck pulls.";
    //   }
    // }


    if ((0,external_kolmafia_namespaceObject.availableAmount)(template_string_$item(_templateObject367 || (_templateObject367 = hccs_taggedTemplateLiteral(["corrupted marrow"])))) === 0 && (0,external_kolmafia_namespaceObject.haveEffect)($effect(_templateObject368 || (_templateObject368 = hccs_taggedTemplateLiteral(["Cowrruption"])))) === 0) {
      (0,external_kolmafia_namespaceObject.cliExecute)("mood apathetic");
      (0,external_kolmafia_namespaceObject.equip)(template_string_$item(_templateObject369 || (_templateObject369 = hccs_taggedTemplateLiteral(["Fourth of May Cosplay Saber"]))));
      (0,external_kolmafia_namespaceObject.equip)(template_string_$item(_templateObject370 || (_templateObject370 = hccs_taggedTemplateLiteral(["familiar scrapbook"]))));

      if (property_get("camelSpit") === 100 && lib_have(template_string_$familiar(_templateObject371 || (_templateObject371 = hccs_taggedTemplateLiteral(["Melodramedary"])))) && !is100Run) {
        (0,external_kolmafia_namespaceObject.useFamiliar)(template_string_$familiar(_templateObject372 || (_templateObject372 = hccs_taggedTemplateLiteral(["Melodramedary"]))));
      }

      Macro.skill(template_string_$skill(_templateObject373 || (_templateObject373 = hccs_taggedTemplateLiteral(["Meteor Shower"])))).trySkill(template_string_$skill(_templateObject374 || (_templateObject374 = hccs_taggedTemplateLiteral(["%fn, spit on me!"], ["%fn\\, spit on me!"])))).skill(template_string_$skill(_templateObject375 || (_templateObject375 = hccs_taggedTemplateLiteral(["Use the Force"])))).setAutoAttack();
      reminisce($monster(_templateObject376 || (_templateObject376 = hccs_taggedTemplateLiteral(["ungulith"]))));
      (0,external_kolmafia_namespaceObject.runChoice)(3);
    }

    (0,external_kolmafia_namespaceObject.setAutoAttack)(0); //geneTonic("elf");
    //ensureEffect($effect`Human-Elf Hybrid`);
    //TODO: fax something?

    if ((0,external_kolmafia_namespaceObject.availableAmount)(template_string_$item(_templateObject377 || (_templateObject377 = hccs_taggedTemplateLiteral(["twinkly nuggets"])))) > 0) {
      lib_ensureEffect($effect(_templateObject378 || (_templateObject378 = hccs_taggedTemplateLiteral(["Twinkly Weapon"]))));
    }

    lib_ensureEffect($effect(_templateObject379 || (_templateObject379 = hccs_taggedTemplateLiteral(["Carol of the Bulls"]))));
    lib_ensureEffect($effect(_templateObject380 || (_templateObject380 = hccs_taggedTemplateLiteral(["Song of the North"]))));
    lib_ensureEffect($effect(_templateObject381 || (_templateObject381 = hccs_taggedTemplateLiteral(["Rage of the Reindeer"]))));
    lib_ensureEffect($effect(_templateObject382 || (_templateObject382 = hccs_taggedTemplateLiteral(["Frenzied, Bloody"]))));
    lib_ensureEffect($effect(_templateObject383 || (_templateObject383 = hccs_taggedTemplateLiteral(["Scowl of the Auk"]))));
    lib_ensureEffect($effect(_templateObject384 || (_templateObject384 = hccs_taggedTemplateLiteral(["Disdain of the War Snapper"]))));
    lib_ensureEffect($effect(_templateObject385 || (_templateObject385 = hccs_taggedTemplateLiteral(["Tenacity of the Snapper"]))));
    ensureSong($effect(_templateObject386 || (_templateObject386 = hccs_taggedTemplateLiteral(["Jackasses' Symphony of Destruction"]))));

    if ((0,external_kolmafia_namespaceObject.availableAmount)(template_string_$item(_templateObject387 || (_templateObject387 = hccs_taggedTemplateLiteral(["LOV Elixir #3"])))) > 0) {
      lib_ensureEffect($effect(_templateObject388 || (_templateObject388 = hccs_taggedTemplateLiteral(["The Power of LOV"]))));
    }

    if ((0,external_kolmafia_namespaceObject.availableAmount)(template_string_$item(_templateObject389 || (_templateObject389 = hccs_taggedTemplateLiteral(["vial of hamethyst juice"])))) > 0) {
      lib_ensureEffect($effect(_templateObject390 || (_templateObject390 = hccs_taggedTemplateLiteral(["Ham-Fisted"]))));
    }

    if ((0,external_kolmafia_namespaceObject.availableAmount)(template_string_$item(_templateObject391 || (_templateObject391 = hccs_taggedTemplateLiteral(["Fabiotion"])))) > 0) {
      lib_ensureEffect($effect(_templateObject392 || (_templateObject392 = hccs_taggedTemplateLiteral(["Faboooo"]))));
    } // make KGB set to weapon


    (0,external_kolmafia_namespaceObject.cliExecute)("briefcase e weapon"); // Beach Comb

    if (!(0,external_kolmafia_namespaceObject.containsText)(property_get("_beachHeadsUsed"), "6")) {
      lib_ensureEffect($effect(_templateObject393 || (_templateObject393 = hccs_taggedTemplateLiteral(["Lack of Body-Building"]))));
    } // Boombox potion - did we get one?


    if ((0,external_kolmafia_namespaceObject.availableAmount)(template_string_$item(_templateObject394 || (_templateObject394 = hccs_taggedTemplateLiteral(["Punching Potion"])))) > 0) {
      lib_ensureEffect($effect(_templateObject395 || (_templateObject395 = hccs_taggedTemplateLiteral(["Feeling Punchy"]))));
    } // Pool buff. Should have fallen through.


    lib_ensureEffect($effect(_templateObject396 || (_templateObject396 = hccs_taggedTemplateLiteral(["Billiards Belligerence"])))); // Corrupted marrow

    lib_ensureEffect($effect(_templateObject397 || (_templateObject397 = hccs_taggedTemplateLiteral(["Cowrruption"])))); // Pastamancer d1 is weapon damage.
    //TODO: uncomment if i buy bird iotm
    //ensureEffect($effect`Blessing of your favorite Bird`);
    // ensureEffect($effect`Blessing of the Bird`);

    ensureNpcEffect($effect(_templateObject398 || (_templateObject398 = hccs_taggedTemplateLiteral(["Engorged Weapon"]))), 1, template_string_$item(_templateObject399 || (_templateObject399 = hccs_taggedTemplateLiteral(["Meleegra\u2122 pills"]))));
    hccs_wishEffect($effect(_templateObject400 || (_templateObject400 = hccs_taggedTemplateLiteral(["Outer Wolf\u2122"])))); //wishEffect($effect`Wasabi With You`);

    lib_ensureEffect($effect(_templateObject401 || (_templateObject401 = hccs_taggedTemplateLiteral(["Bow-Legged Swagger"]))));

    if (lib_have(template_string_$item(_templateObject402 || (_templateObject402 = hccs_taggedTemplateLiteral(["glass of raw eggs"])))) && !lib_have($effect(_templateObject403 || (_templateObject403 = hccs_taggedTemplateLiteral(["Boxing Day Breakfast"]))))) {
      (0,external_kolmafia_namespaceObject.eat)(1, template_string_$item(_templateObject404 || (_templateObject404 = hccs_taggedTemplateLiteral(["glass of raw eggs"]))));
    } //useFamiliar($familiar`disembodied hand`);


    (0,external_kolmafia_namespaceObject.useFamiliar)(template_string_$familiar(_templateObject405 || (_templateObject405 = hccs_taggedTemplateLiteral(["Left-Hand Man"]))));
    (0,external_kolmafia_namespaceObject.maximize)("weapon damage", false);

    if (weaponTurns() > 5) {
      // Rictus of Yeg = 200% Weapon damage
      //if weapon turns are less than 5, we want to use it on spell damage instead for -4 turns there
      if (!getPropertyBoolean("_cargoPocketEmptied") && (0,external_kolmafia_namespaceObject.haveEffect)($effect(_templateObject406 || (_templateObject406 = hccs_taggedTemplateLiteral(["Rictus of Yeg"])))) === 0) {
        if ((0,external_kolmafia_namespaceObject.availableAmount)(template_string_$item(_templateObject407 || (_templateObject407 = hccs_taggedTemplateLiteral(["Yeg's Motel toothbrush"])))) === 0) (0,external_kolmafia_namespaceObject.cliExecute)("cargo 284");
        lib_ensureEffect($effect(_templateObject408 || (_templateObject408 = hccs_taggedTemplateLiteral(["Rictus of Yeg"]))));
      }
    }

    if (weaponTurns() > targetTurns.get(TEST_WEAPON)) {
      throw "Can't achieve target turns for weapon damage test. Current: ".concat(weaponTurns(), " Target: ").concat(targetTurns.get(TEST_WEAPON));
    }

    (0,external_kolmafia_namespaceObject.setProperty)("_hccsWeaponTurnsUncapped", "".concat(weaponTurns()));
    TEMP_TURNS = (0,external_kolmafia_namespaceObject.myTurncount)();
    doTest(TEST_WEAPON);
    WEAPON_TURNS = (0,external_kolmafia_namespaceObject.myTurncount)() - TEMP_TURNS;
    (0,external_kolmafia_namespaceObject.setProperty)("_hccsWeaponTurns", WEAPON_TURNS.toString());
  }
}

function testSpellDamage() {
  if (!testDone(TEST_SPELL)) {
    fightSausageIfGuaranteed(); //simmering costs 1 adv. remove if i manage to cap spell damage

    lib_ensureEffect($effect(_templateObject409 || (_templateObject409 = hccs_taggedTemplateLiteral(["Simmering"])))); //+100% spell damage

    lib_ensureEffect($effect(_templateObject410 || (_templateObject410 = hccs_taggedTemplateLiteral(["Song of Sauce"]))));
    lib_ensureEffect($effect(_templateObject411 || (_templateObject411 = hccs_taggedTemplateLiteral(["Carol of the Hells"]))));
    lib_ensureEffect($effect(_templateObject412 || (_templateObject412 = hccs_taggedTemplateLiteral(["Arched Eyebrow of the Archmage"]))));
    ensureSong($effect(_templateObject413 || (_templateObject413 = hccs_taggedTemplateLiteral(["Jackasses' Symphony of Destruction"]))));

    if ((0,external_kolmafia_namespaceObject.availableAmount)(template_string_$item(_templateObject414 || (_templateObject414 = hccs_taggedTemplateLiteral(["LOV Elixir #6"])))) > 0) {
      lib_ensureEffect($effect(_templateObject415 || (_templateObject415 = hccs_taggedTemplateLiteral(["The Magic of LOV"]))));
    } // Pool buff


    if (property_get("_poolGames") < 3) {
      lib_ensureEffect($effect(_templateObject416 || (_templateObject416 = hccs_taggedTemplateLiteral(["Mental A-cue-ity"]))));
    } // Tea party
    // ensureSewerItem(1, $item`mariachi hat`);
    // ensureEffect($effect`Full Bottle in front of Me`);


    (0,external_kolmafia_namespaceObject.useSkill)(1, template_string_$skill(_templateObject417 || (_templateObject417 = hccs_taggedTemplateLiteral(["Spirit of Cayenne"])))); // Get flimsy hardwood scraps.

    (0,external_kolmafia_namespaceObject.visitUrl)("shop.php?whichshop=lathe");

    if ((0,external_kolmafia_namespaceObject.availableAmount)(template_string_$item(_templateObject418 || (_templateObject418 = hccs_taggedTemplateLiteral(["flimsy hardwood scraps"])))) > 0) {
      (0,external_kolmafia_namespaceObject.retrieveItem)(1, template_string_$item(_templateObject419 || (_templateObject419 = hccs_taggedTemplateLiteral(["weeping willow wand"]))));
    }

    ensureItem(1, template_string_$item(_templateObject420 || (_templateObject420 = hccs_taggedTemplateLiteral(["obsidian nutcracker"]))));
    (0,external_kolmafia_namespaceObject.cliExecute)("briefcase e spell"); // // Get inner elf for spell damage
    // if (haveEffect($effect`Inner Elf`) === 0 && get("_snokebombUsed") < 3) {
    //   Clan.join("Beldungeon");
    //   ensureEffect($effect`Blood Bubble`);
    //   useFamiliar($familiar`Machine Elf`);
    //   setProperty("choiceAdventure326", "1");
    //   adventureMacro($location`The Slime Tube`, Macro.skill($skill`Snokebomb`));
    //   useDefaultFamiliar();
    //   Clan.join("Alliance from Hell");
    // } else {
    //   print("Something went wrong with getting inner elf");
    // }

    if ((0,external_kolmafia_namespaceObject.myClass)() === template_string_$class(_templateObject421 || (_templateObject421 = hccs_taggedTemplateLiteral(["Sauceror"]))) && !getPropertyBoolean("_barrelPrayer")) {
      (0,external_kolmafia_namespaceObject.cliExecute)("barrelprayer buff");
    } // Sigils of Yeg = 200% SD


    if (!property_get("_cargoPocketEmptied") && (0,external_kolmafia_namespaceObject.haveEffect)($effect(_templateObject422 || (_templateObject422 = hccs_taggedTemplateLiteral(["Sigils of Yeg"])))) === 0) {
      if ((0,external_kolmafia_namespaceObject.availableAmount)(template_string_$item(_templateObject423 || (_templateObject423 = hccs_taggedTemplateLiteral(["Yeg's Motel hand soap"])))) === 0) (0,external_kolmafia_namespaceObject.cliExecute)("cargo 177");
      lib_ensureEffect($effect(_templateObject424 || (_templateObject424 = hccs_taggedTemplateLiteral(["Sigils of Yeg"]))));
    }

    lib_ensureEffect($effect(_templateObject425 || (_templateObject425 = hccs_taggedTemplateLiteral(["AAA-Charged"])))); //+50% spell dmg

    lib_ensureEffect($effect(_templateObject426 || (_templateObject426 = hccs_taggedTemplateLiteral(["Lantern-Charged"])))); //+50% spell dmg, +100% item drop, shocking lick

    if ((0,external_kolmafia_namespaceObject.availableAmount)(template_string_$item(_templateObject427 || (_templateObject427 = hccs_taggedTemplateLiteral(["Bettie page"])))) > 0) {
      lib_ensureEffect($effect(_templateObject428 || (_templateObject428 = hccs_taggedTemplateLiteral(["Paging Betty"]))));
    }

    if ((0,external_kolmafia_namespaceObject.availableAmount)(template_string_$item(_templateObject429 || (_templateObject429 = hccs_taggedTemplateLiteral(["Staff of the Headmaster's Victuals"]))))) {
      (0,external_kolmafia_namespaceObject.retrieveItem)(template_string_$item(_templateObject430 || (_templateObject430 = hccs_taggedTemplateLiteral(["Staff of the Headmaster's Victuals"]))));
    } //spent free kills on toxic teacups for 12% spell dmg per kill?
    //TODO: probably try a different location since we cant guarantee our familiar won;t attack
    // Meteor showered


    if ((0,external_kolmafia_namespaceObject.haveEffect)($effect(_templateObject431 || (_templateObject431 = hccs_taggedTemplateLiteral(["Meteor Showered"])))) === 0) {
      (0,external_kolmafia_namespaceObject.equip)(template_string_$item(_templateObject432 || (_templateObject432 = hccs_taggedTemplateLiteral(["Fourth of May Cosplay Saber"]))));
      (0,external_kolmafia_namespaceObject.equip)(template_string_$item(_templateObject433 || (_templateObject433 = hccs_taggedTemplateLiteral(["familiar scrapbook"]))), $slot(_templateObject434 || (_templateObject434 = hccs_taggedTemplateLiteral(["offhand"]))));
      setChoice(1387, 1);
      adventureMacroAuto(template_string_$location(_templateObject435 || (_templateObject435 = hccs_taggedTemplateLiteral(["The Neverending Party"]))), Macro.skill(template_string_$skill(_templateObject436 || (_templateObject436 = hccs_taggedTemplateLiteral(["Meteor Shower"])))).skill(template_string_$skill(_templateObject437 || (_templateObject437 = hccs_taggedTemplateLiteral(["Use the Force"])))));
    }

    (0,external_kolmafia_namespaceObject.setAutoAttack)(0); // wish for +200% spell damage

    hccs_wishEffect($effect(_templateObject438 || (_templateObject438 = hccs_taggedTemplateLiteral(["Witch Breaded"])))); //useFamiliar($familiar`disembodied hand`);

    (0,external_kolmafia_namespaceObject.useFamiliar)(template_string_$familiar(_templateObject439 || (_templateObject439 = hccs_taggedTemplateLiteral(["Left-Hand Man"]))));
    (0,external_kolmafia_namespaceObject.maximize)("spell damage", false);

    if ((0,external_kolmafia_namespaceObject.round)((0,external_kolmafia_namespaceObject.numericModifier)("spell damage percent")) % 50 >= 40) {
      ensureItem(1, template_string_$item(_templateObject440 || (_templateObject440 = hccs_taggedTemplateLiteral(["soda water"]))));
      ensurePotionEffect($effect(_templateObject441 || (_templateObject441 = hccs_taggedTemplateLiteral(["Concentration"]))), template_string_$item(_templateObject442 || (_templateObject442 = hccs_taggedTemplateLiteral(["cordial of concentration"]))));
    }

    if ((0,external_kolmafia_namespaceObject.round)((0,external_kolmafia_namespaceObject.numericModifier)("spell damage")) % 50 >= 39 && lib_have(template_string_$item(_templateObject443 || (_templateObject443 = hccs_taggedTemplateLiteral(["baconstone"]))))) {
      ensureItem(1, template_string_$item(_templateObject444 || (_templateObject444 = hccs_taggedTemplateLiteral(["vial of Gnomochloric acid"]))));
      ensurePotionEffect($effect(_templateObject445 || (_templateObject445 = hccs_taggedTemplateLiteral(["Baconstoned"]))), template_string_$item(_templateObject446 || (_templateObject446 = hccs_taggedTemplateLiteral(["vial of baconstone juice"]))));
    }

    while (spellTurns() > (0,external_kolmafia_namespaceObject.myAdventures)()) {
      (0,external_kolmafia_namespaceObject.eat)(1, template_string_$item(_templateObject447 || (_templateObject447 = hccs_taggedTemplateLiteral(["magical sausage"]))));
    }

    if (spellTurns() > targetTurns.get(TEST_SPELL)) {
      throw "Can't achieve target turns for spell damage test. Current: ".concat(spellTurns(), " Target: ").concat(targetTurns.get(TEST_SPELL));
    }

    (0,external_kolmafia_namespaceObject.setProperty)("_hccsSpellTurnsUncapped", "".concat(spellTurns()));
    TEMP_TURNS = (0,external_kolmafia_namespaceObject.myTurncount)();
    doTest(TEST_SPELL);
    SPELL_TURNS = (0,external_kolmafia_namespaceObject.myTurncount)() - TEMP_TURNS;
    (0,external_kolmafia_namespaceObject.setProperty)("_hccsSpellTurns", SPELL_TURNS.toString());

    if (is100Run) {
      (0,external_kolmafia_namespaceObject.useFamiliar)(familiarFor100Run);
    }
  }
}

function testItemDrop() {
  if (!testDone(TEST_ITEM)) {
    ensureMpSausage(500);
    fightSausageIfGuaranteed();

    if ((0,external_kolmafia_namespaceObject.myInebriety)() < (0,external_kolmafia_namespaceObject.inebrietyLimit)() - 1 && !lib_have($effect(_templateObject448 || (_templateObject448 = hccs_taggedTemplateLiteral(["Sacr\xE9 Mental"]))))) {
      //closet Swizzler if we have any since it will be consumed if in inventory while drinking and we want to save it for sweet synthesis
      (0,external_kolmafia_namespaceObject.putCloset)(template_string_$item(_templateObject449 || (_templateObject449 = hccs_taggedTemplateLiteral(["Swizzler"]))), (0,external_kolmafia_namespaceObject.itemAmount)(template_string_$item(_templateObject450 || (_templateObject450 = hccs_taggedTemplateLiteral(["Swizzler"])))));
      ensureOde(1);
      (0,external_kolmafia_namespaceObject.drink)(1, template_string_$item(_templateObject451 || (_templateObject451 = hccs_taggedTemplateLiteral(["Sacramento wine"]))));
      (0,external_kolmafia_namespaceObject.takeCloset)(template_string_$item(_templateObject452 || (_templateObject452 = hccs_taggedTemplateLiteral(["Swizzler"]))), (0,external_kolmafia_namespaceObject.closetAmount)(template_string_$item(_templateObject453 || (_templateObject453 = hccs_taggedTemplateLiteral(["Swizzler"])))));
    } // kramco messes up maps


    (0,external_kolmafia_namespaceObject.equip)(template_string_$item(_templateObject454 || (_templateObject454 = hccs_taggedTemplateLiteral(["familiar scrapbook"])))); //getting a lil ninja costume for the tot

    if ((0,external_kolmafia_namespaceObject.availableAmount)(template_string_$item(_templateObject455 || (_templateObject455 = hccs_taggedTemplateLiteral(["li'l ninja costume"])))) === 0 && property_get("_shatteringPunchUsed") < 3) {
      Macro.skill(template_string_$skill(_templateObject456 || (_templateObject456 = hccs_taggedTemplateLiteral(["Bowl Straight Up"])))).skill(template_string_$skill(_templateObject457 || (_templateObject457 = hccs_taggedTemplateLiteral(["Shattering Punch"])))).setAutoAttack();
      mapMonster(template_string_$location(_templateObject458 || (_templateObject458 = hccs_taggedTemplateLiteral(["The Haiku Dungeon"]))), $monster(_templateObject459 || (_templateObject459 = hccs_taggedTemplateLiteral(["amateur ninja"]))));
      (0,external_kolmafia_namespaceObject.setLocation)(template_string_$location(_templateObject460 || (_templateObject460 = hccs_taggedTemplateLiteral(["none"]))));
      (0,external_kolmafia_namespaceObject.setAutoAttack)(0);
    } // use abstraction: certainty if you have it
    // ensureEffect($effect`certainty`);


    if (property_get("_deckCardsDrawn") === 10) {
      (0,external_kolmafia_namespaceObject.cliExecute)("cheat buff items");
    } // get pirate DNA and make a gene tonic
    // if (get("dnaSyringe") !== $phylum`pirate` && haveEffect($effect`Human-Pirate Hybrid`) === 0) {
    //   equip($slot`acc1`, $item`Kremlin's Greatest Briefcase`);
    //   if (get("_kgbTranquilizerDartUses") >= 3) {
    //     throw "Out of KGB banishes";
    //   }
    //   // adv once for the opening free NC, should check NC queue here
    //   print($location`Pirates of the Garbage Barges`.noncombatQueue);
    //   adv1($location`Pirates of the Garbage Barges`, -1, "");
    //   print($location`Pirates of the Garbage Barges`.noncombatQueue);
    //   if (
    //     containsText(
    //       $location`Pirates of the Garbage Barges`.noncombatQueue,
    //       "Dead Men Smell No Tales"
    //     )
    //   ) {
    //     adventureMacroAuto(
    //       $location`Pirates of the Garbage Barges`,
    //       Macro.item($item`DNA extraction syringe`).skill($skill`KGB tranquilizer dart`)
    //     );
    //     geneTonic($phylum`pirate`);
    //     ensureEffect($effect`Human-Pirate Hybrid`);
    //     setAutoAttack(0);
    //   } else throw "Something went wrong getting pirate DNA.";
    // }
    // useDefaultFamiliar();
    // if (haveEffect($effect`Bat-Adjacent Form`) === 0) {
    //   if (get("_reflexHammerUsed") >= 3) throw "Out of reflex hammers!";
    //   equip($slot`acc3`, $item`Lil' Doctor™ bag`);
    //   equip($item`vampyric cloake`);
    //   adventureMacroAuto(
    //     $location`The Neverending Party`,
    //     Macro.skill($skill`Become a Bat`).skill($skill`Reflex Hammer`)
    //   );
    //   setAutoAttack(0);
    // }


    if (!getPropertyBoolean("_clanFortuneBuffUsed")) {
      lib_ensureEffect($effect(_templateObject461 || (_templateObject461 = hccs_taggedTemplateLiteral(["There's No N in Love"]))));
    }

    lib_ensureEffect($effect(_templateObject462 || (_templateObject462 = hccs_taggedTemplateLiteral(["Fat Leon's Phat Loot Lyric"]))));
    lib_ensureEffect($effect(_templateObject463 || (_templateObject463 = hccs_taggedTemplateLiteral(["Singer's Faithful Ocelot"]))));
    lib_ensureEffect($effect(_templateObject464 || (_templateObject464 = hccs_taggedTemplateLiteral(["The Spirit of Taking"]))));
    lib_ensureEffect($effect(_templateObject465 || (_templateObject465 = hccs_taggedTemplateLiteral(["items.enh"])))); //candle correspondence

    if (lib_have(template_string_$item(_templateObject466 || (_templateObject466 = hccs_taggedTemplateLiteral(["Salsa Caliente\u2122 candle"]))))) {
      lib_ensureEffect($effect(_templateObject467 || (_templateObject467 = hccs_taggedTemplateLiteral(["El Aroma de Salsa"]))));
    } //synthesisPlanner.synthesize($effect`Synthesis: Collection`);
    // see what class we are, maybe a couple other buffs


    if ((0,external_kolmafia_namespaceObject.myClass)() === template_string_$class(_templateObject468 || (_templateObject468 = hccs_taggedTemplateLiteral(["Pastamancer"])))) {
      (0,external_kolmafia_namespaceObject.cliExecute)("barrelprayer buff");
    } else if ((0,external_kolmafia_namespaceObject.myClass)() === template_string_$class(_templateObject469 || (_templateObject469 = hccs_taggedTemplateLiteral(["Sauceror"])))) {//uncomment if i buy birds
      //useSkill(1, $skill`Seek out a Bird`); // seek out a bird
    } // Use bag of grain.


    lib_ensureEffect($effect(_templateObject470 || (_templateObject470 = hccs_taggedTemplateLiteral(["Nearly All-Natural"]))));
    lib_ensureEffect($effect(_templateObject471 || (_templateObject471 = hccs_taggedTemplateLiteral(["Feeling Lost"]))));
    lib_ensureEffect($effect(_templateObject472 || (_templateObject472 = hccs_taggedTemplateLiteral(["Steely-Eyed Squint"])))); //uncomment if i get camp
    // get big smile of the blender if available, someday use this to replace something?
    // if (get("_campAwaySmileBuffs") === 1) {
    //   visitUrl("place.php?whichplace=campaway&action=campaway_sky");
    // }

    (0,external_kolmafia_namespaceObject.useFamiliar)(template_string_$familiar(_templateObject473 || (_templateObject473 = hccs_taggedTemplateLiteral(["Trick-or-Treating Tot"]))));
    (0,external_kolmafia_namespaceObject.equip)(template_string_$item(_templateObject474 || (_templateObject474 = hccs_taggedTemplateLiteral(["li'l ninja costume"])))); // ninja costume for 150% item

    (0,external_kolmafia_namespaceObject.maximize)("item, 2 booze drop, -equip broken champagne bottle, -equip surprisingly capacious handbag", false);

    if (itemdrop() > targetTurns.get(TEST_ITEM)) {
      throw "Can't achieve target turns for item drop test. Current: ".concat(itemdrop(), " Target: ").concat(targetTurns.get(TEST_ITEM));
    }

    (0,external_kolmafia_namespaceObject.setProperty)("_hccsItemTurnsUncapped", "".concat(itemdrop()));
    TEMP_TURNS = (0,external_kolmafia_namespaceObject.myTurncount)();
    doTest(TEST_ITEM);
    ITEM_TURNS = (0,external_kolmafia_namespaceObject.myTurncount)() - TEMP_TURNS;

    if (is100Run) {
      (0,external_kolmafia_namespaceObject.useFamiliar)(familiarFor100Run);
    }

    (0,external_kolmafia_namespaceObject.setProperty)("_hccsItemTurns", ITEM_TURNS.toString());
  }
}

function main() {
  if ((0,external_kolmafia_namespaceObject.myPathId)() !== 25) (0,external_kolmafia_namespaceObject.abort)("Current path is not community service");
  targetTurns.set(TEST_HP, 1);
  targetTurns.set(TEST_MUS, 1);
  targetTurns.set(TEST_MYS, 1);
  targetTurns.set(TEST_MOX, 1);
  targetTurns.set(TEST_HOT_RES, 1);
  targetTurns.set(TEST_NONCOMBAT, 1);
  targetTurns.set(TEST_FAMILIAR, 30);
  targetTurns.set(TEST_WEAPON, 1);
  targetTurns.set(TEST_SPELL, 29);
  targetTurns.set(TEST_ITEM, 1);

  try {
    if (is100Run) {
      familiarFor100Run = (0,external_kolmafia_namespaceObject.toFamiliar)((0,external_kolmafia_namespaceObject.getProperty)("_hccsFamiliar"));

      if (familiarFor100Run === template_string_$familiar(_templateObject475 || (_templateObject475 = hccs_taggedTemplateLiteral(["none"])))) {
        if ((0,external_kolmafia_namespaceObject.userConfirm)("Is ".concat((0,external_kolmafia_namespaceObject.myFamiliar)(), " the familiar you want?"))) {
          familiarFor100Run = (0,external_kolmafia_namespaceObject.myFamiliar)();
          (0,external_kolmafia_namespaceObject.setProperty)("_hccsFamiliar", "".concat(familiarFor100Run));
        } else {
          (0,external_kolmafia_namespaceObject.abort)("Pick the correct familiar");
        }
      }
    } // Don't buy stuff from NPC stores.


    (0,external_kolmafia_namespaceObject.setProperty)("_saved_autoSatisfyWithNPCs", (0,external_kolmafia_namespaceObject.getProperty)("autoSatisfyWithNPCs"));
    (0,external_kolmafia_namespaceObject.setProperty)("autoSatisfyWithNPCs", "false"); // Do buy stuff from coinmasters (hermit).

    (0,external_kolmafia_namespaceObject.setProperty)("_saved_autoSatisfyWithCoinmasters", (0,external_kolmafia_namespaceObject.getProperty)("autoSatisfyWithCoinmasters"));
    (0,external_kolmafia_namespaceObject.setProperty)("autoSatisfyWithCoinmasters", "true"); //setProperty("recoveryScript", "");
    // setProperty("logPreferenceChange", "true");
    // Initialize council.

    (0,external_kolmafia_namespaceObject.visitUrl)("council.php");

    if (property_get("backupCameraReverserEnabled") === false) {
      (0,external_kolmafia_namespaceObject.cliExecute)("backupcamera reverser on");
    } // All combat handled by our consult script (hccs_combat.ash).


    (0,external_kolmafia_namespaceObject.cliExecute)("ccs libram"); // Turn off Lil' Doctor quests.

    setChoice(1340, 3); // in case you're re-running it

    (0,external_kolmafia_namespaceObject.setAutoAttack)(0); // Default equipment.
    //TODO: set mode for cape and camera. perhaps modify briefcase?
    //equip($item`Iunion Crown`);

    (0,external_kolmafia_namespaceObject.equip)(template_string_$item(_templateObject476 || (_templateObject476 = hccs_taggedTemplateLiteral(["Fourth of May Cosplay Saber"])))); // equip($item[Kramco Sausage-o-Matic&trade;]);

    (0,external_kolmafia_namespaceObject.equip)(template_string_$item(_templateObject477 || (_templateObject477 = hccs_taggedTemplateLiteral(["familiar scrapbook"])))); //equip($item`vampyric cloake`);

    (0,external_kolmafia_namespaceObject.cliExecute)("retrocape mysticality thrill");
    (0,external_kolmafia_namespaceObject.equip)(template_string_$item(_templateObject478 || (_templateObject478 = hccs_taggedTemplateLiteral(["unwrapped knock-off retro superhero cape"]))));
    (0,external_kolmafia_namespaceObject.equip)(template_string_$item(_templateObject479 || (_templateObject479 = hccs_taggedTemplateLiteral(["Cargo Cultist Shorts"]))));
    (0,external_kolmafia_namespaceObject.equip)($slot(_templateObject480 || (_templateObject480 = hccs_taggedTemplateLiteral(["acc1"]))), template_string_$item(_templateObject481 || (_templateObject481 = hccs_taggedTemplateLiteral(["your cowboy boots"]))));
    (0,external_kolmafia_namespaceObject.equip)($slot(_templateObject482 || (_templateObject482 = hccs_taggedTemplateLiteral(["acc2"]))), template_string_$item(_templateObject483 || (_templateObject483 = hccs_taggedTemplateLiteral(["Kremlin's Greatest Briefcase"])))); //equip($slot`acc3`, $item`backup camera`);

    (0,external_kolmafia_namespaceObject.equip)($slot(_templateObject484 || (_templateObject484 = hccs_taggedTemplateLiteral(["acc3"]))), template_string_$item(_templateObject485 || (_templateObject485 = hccs_taggedTemplateLiteral(["Powerful Glove"])))); // equip($slot`acc1`, $item`Eight Days a Week Pill Keeper`);
    // equip($slot`acc2`, $item`Powerful Glove`);
    // equip($slot`acc3`, $item`Lil' Doctor™ bag`);

    if (is100Run) {
      (0,external_kolmafia_namespaceObject.useFamiliar)(familiarFor100Run);
    }

    testCoilWire();
    levelUp();
    testHP();
    testMus();
    testMys();
    testMox();
    testHotRes();
    testNonCombat();
    testFamiliarWeight();
    testWeaponDamage();
    testSpellDamage();
    testItemDrop();
    (0,external_kolmafia_namespaceObject.cliExecute)("mood default");
    (0,external_kolmafia_namespaceObject.cliExecute)("ccs default");
    (0,external_kolmafia_namespaceObject.cliExecute)("boombox food");
    (0,external_kolmafia_namespaceObject.cliExecute)("/whitelist Reddit United");
    (0,external_kolmafia_namespaceObject.visitUrl)("peevpee.php?action=smashstone&confirm=on");
    (0,external_kolmafia_namespaceObject.print)("Stone smashed. Get your PVP on!", "green"); // spar for 6 fights
    //NOTE: sparring actually costs an adv
    // if (get("_daycareRecruits") === 0 && hippyStoneBroken() === true) {
    //   visitUrl("place.php?whichplace=town_wrong&action=townwrong_boxingdaycare");
    //   runChoice(3);
    //   runChoice(1);
    //   runChoice(4);
    //   runChoice(5);
    //   runChoice(4);
    // }
    // cliExecute("pvp fame Loot Hunter");

    END_TIME = (0,external_kolmafia_namespaceObject.gametimeToInt)(); //donate your body to science

    (0,external_kolmafia_namespaceObject.print)("Donating your body to science!", "blue");
    (0,external_kolmafia_namespaceObject.visitUrl)("council.php");
    (0,external_kolmafia_namespaceObject.visitUrl)("choice.php?whichchoice=1089&option=30&pwd");
  } finally {
    (0,external_kolmafia_namespaceObject.setProperty)("autoSatisfyWithNPCs", "true");
    (0,external_kolmafia_namespaceObject.setProperty)("autoSatisfyWithCoinmasters", (0,external_kolmafia_namespaceObject.getProperty)("_saved_autoSatisfyWithCoinmasters"));
    (0,external_kolmafia_namespaceObject.setProperty)("hpAutoRecovery", "0.8");
    (0,external_kolmafia_namespaceObject.print)("This loop took ".concat((0,external_kolmafia_namespaceObject.floor)((END_TIME - START_TIME) / 1000 / 60), " minutes and ").concat((0,external_kolmafia_namespaceObject.ceil)((END_TIME - START_TIME) / 1000 % 60), " seconds, for a 1 day, ").concat((0,external_kolmafia_namespaceObject.myTurncount)(), " turn HCCS run. Organ use was ").concat((0,external_kolmafia_namespaceObject.myFullness)(), "/").concat((0,external_kolmafia_namespaceObject.myInebriety)(), "/").concat((0,external_kolmafia_namespaceObject.mySpleenUse)(), ". I drank ").concat(6 - (0,external_kolmafia_namespaceObject.availableAmount)(template_string_$item(_templateObject486 || (_templateObject486 = hccs_taggedTemplateLiteral(["astral pilsner"])))), " Astral Pilsners."), "green");
    (0,external_kolmafia_namespaceObject.print)("HP test: ".concat((0,external_kolmafia_namespaceObject.getProperty)("_hccsHpTurns")), "green");
    (0,external_kolmafia_namespaceObject.print)("Muscle test: ".concat((0,external_kolmafia_namespaceObject.getProperty)("_hccsMusTurns")), "green");
    (0,external_kolmafia_namespaceObject.print)("Myst test: ".concat((0,external_kolmafia_namespaceObject.getProperty)("_hccsMysTurns")), "green");
    (0,external_kolmafia_namespaceObject.print)("Moxie test: ".concat((0,external_kolmafia_namespaceObject.getProperty)("_hccsMoxTurns")), "green");
    (0,external_kolmafia_namespaceObject.print)("Hot Res test: ".concat((0,external_kolmafia_namespaceObject.getProperty)("_hccsHotResTurns")), "green");
    (0,external_kolmafia_namespaceObject.print)("Noncombat test: ".concat((0,external_kolmafia_namespaceObject.getProperty)("_hccsNonCombatTurns")), "green");
    (0,external_kolmafia_namespaceObject.print)("Fam Weight test: ".concat((0,external_kolmafia_namespaceObject.getProperty)("_hccsFamiliarTurns")), "green");
    (0,external_kolmafia_namespaceObject.print)("Weapon Damage test: ".concat((0,external_kolmafia_namespaceObject.getProperty)("_hccsWeaponTurns")), "green");
    (0,external_kolmafia_namespaceObject.print)("Spell Damage Test: ".concat((0,external_kolmafia_namespaceObject.getProperty)("_hccsSpellTurns")), "green");
    (0,external_kolmafia_namespaceObject.print)("Item Drop test: ".concat((0,external_kolmafia_namespaceObject.getProperty)("_hccsItemTurns")), "green");
    (0,external_kolmafia_namespaceObject.print)("--------Uncapped turns--------", "green");
    (0,external_kolmafia_namespaceObject.print)("HP test: ".concat((0,external_kolmafia_namespaceObject.getProperty)("_hccsHpTurnsUncapped")), "green");
    (0,external_kolmafia_namespaceObject.print)("Muscle test: ".concat((0,external_kolmafia_namespaceObject.getProperty)("_hccsMusTurnsUncapped")), "green");
    (0,external_kolmafia_namespaceObject.print)("Myst test: ".concat((0,external_kolmafia_namespaceObject.getProperty)("_hccsMysTurnsUncapped")), "green");
    (0,external_kolmafia_namespaceObject.print)("Moxie test: ".concat((0,external_kolmafia_namespaceObject.getProperty)("_hccsMoxTurnsUncapped")), "green");
    (0,external_kolmafia_namespaceObject.print)("Hot Res test: ".concat((0,external_kolmafia_namespaceObject.getProperty)("_hccsHotResTurnsUncapped")), "green");
    (0,external_kolmafia_namespaceObject.print)("Noncombat test: ".concat((0,external_kolmafia_namespaceObject.getProperty)("_hccsNonCombatTurnsUncapped")), "green");
    (0,external_kolmafia_namespaceObject.print)("Fam Weight test: ".concat((0,external_kolmafia_namespaceObject.getProperty)("_hccsFamiliarTurnsUncapped")), "green");
    (0,external_kolmafia_namespaceObject.print)("Weapon Damage test: ".concat((0,external_kolmafia_namespaceObject.getProperty)("_hccsWeaponTurnsUncapped")), "green");
    (0,external_kolmafia_namespaceObject.print)("Spell Damage Test: ".concat((0,external_kolmafia_namespaceObject.getProperty)("_hccsSpellTurnsUncapped")), "green");
    (0,external_kolmafia_namespaceObject.print)("Item Drop test: ".concat((0,external_kolmafia_namespaceObject.getProperty)("_hccsItemTurnsUncapped")), "green");

    if (property_get("_questPartyFairQuest") === "food") {
      (0,external_kolmafia_namespaceObject.print)("Hey, go talk to Geraldine!", "blue");
    } else if (property_get("_questPartyFairQuest") === "booze") {
      (0,external_kolmafia_namespaceObject.print)("Hey, go talk to Gerald!", "blue");
    }
  }
}
})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;