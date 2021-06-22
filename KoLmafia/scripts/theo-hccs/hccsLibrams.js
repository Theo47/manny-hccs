(function(e, a) { for(var i in a) e[i] = a[i]; if(a.__esModule) Object.defineProperty(e, "__esModule", { value: true }); }(exports,
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/libram/dist/combat.js":
/*!********************************************!*\
  !*** ./node_modules/libram/dist/combat.js ***!
  \********************************************/
/*! namespace exports */
/*! export Macro [provided] [no usage info] [missing usage info prevents renaming] */
/*! export adventureMacro [provided] [no usage info] [missing usage info prevents renaming] */
/*! export adventureMacroAuto [provided] [no usage info] [missing usage info prevents renaming] */
/*! export banishedMonsters [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getMacroId [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getMacroId": () => /* binding */ getMacroId,
/* harmony export */   "Macro": () => /* binding */ Macro,
/* harmony export */   "banishedMonsters": () => /* binding */ banishedMonsters,
/* harmony export */   "adventureMacro": () => /* binding */ adventureMacro,
/* harmony export */   "adventureMacroAuto": () => /* binding */ adventureMacroAuto
/* harmony export */ });
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! kolmafia */ "kolmafia");
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(kolmafia__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _property__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./property */ "./node_modules/libram/dist/property.js");
/* harmony import */ var _template_string__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./template-string */ "./node_modules/libram/dist/template-string.js");
var __makeTemplateObject = undefined && undefined.__makeTemplateObject || function (cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", {
      value: raw
    });
  } else {
    cooked.raw = raw;
  }

  return cooked;
};

var __spreadArrays = undefined && undefined.__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
    s += arguments[i].length;
  }

  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
      r[k] = a[j];
    }
  }

  return r;
};




var MACRO_NAME = "Script Autoattack Macro";
/**
 * Get the KoL native ID of the macro with name Script Autoattack Macro.
 * @returns {number} The macro ID.
 */

function getMacroId() {
  var macroMatches = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.xpath)((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)("account_combatmacros.php"), "//select[@name=\"macroid\"]/option[text()=\"" + MACRO_NAME + "\"]/@value");

  if (macroMatches.length === 0) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)("account_combatmacros.php?action=new");
    var newMacroText = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)("account_combatmacros.php?macroid=0&name=" + MACRO_NAME + "&macrotext=abort&action=save");
    return parseInt((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.xpath)(newMacroText, "//input[@name=macroid]/@value")[0], 10);
  } else {
    return parseInt(macroMatches[0], 10);
  }
}

function itemOrNameToItem(itemOrName) {
  return typeof itemOrName === "string" ? Item.get(itemOrName) : itemOrName;
}

function itemOrItemsBallsMacroName(itemOrItems) {
  if (Array.isArray(itemOrItems)) {
    return itemOrItems.map(itemOrItemsBallsMacroName).join(", ");
  } else {
    var item = itemOrNameToItem(itemOrItems);
    return item.name;
  }
}

function itemOrItemsBallsMacroPredicate(itemOrItems) {
  if (Array.isArray(itemOrItems)) {
    return itemOrItems.map(itemOrItemsBallsMacroName).join(" && ");
  } else {
    return "hascombatitem " + itemOrItems;
  }
}

function skillOrNameToSkill(skillOrName) {
  if (typeof skillOrName === "string") {
    return Skill.get(skillOrName);
  } else {
    return skillOrName;
  }
}

function skillBallsMacroName(skillOrName) {
  var skill = skillOrNameToSkill(skillOrName);
  return skill.name.match(/^[A-Za-z ]+$/) ? skill.name : (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.toInt)(skill);
}
/**
 * BALLS macro builder for direct submission to KoL.
 * Create a new macro with `new Macro()` and add steps using the instance methods.
 * Uses a fluent interface, so each step returns the object for easy chaining of steps.
 * Each method is also defined as a static method that creates a new Macro with only that step.
 * For example, you can do `Macro.skill('Saucestorm').attack()`.
 */


var Macro =
/** @class */
function () {
  function Macro() {
    this.components = [];
  }
  /**
   * Convert macro to string.
   */


  Macro.prototype.toString = function () {
    return this.components.join(";");
  };
  /**
   * Save a macro to a Mafia property for use in a consult script.
   */


  Macro.prototype.save = function () {
    (0,_property__WEBPACK_IMPORTED_MODULE_1__.set)(Macro.SAVED_MACRO_PROPERTY, this.toString());
  };
  /**
   * Load a saved macro from the Mafia property.
   */


  Macro.load = function () {
    var _a;

    return (_a = new this()).step.apply(_a, (0,_property__WEBPACK_IMPORTED_MODULE_1__.get)(Macro.SAVED_MACRO_PROPERTY).split(";"));
  };
  /**
   * Clear the saved macro in the Mafia property.
   */


  Macro.clearSaved = function () {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.removeProperty)(Macro.SAVED_MACRO_PROPERTY);
  };
  /**
   * Statefully add one or several steps to a macro.
   * @param nextSteps The steps to add to the macro.
   * @returns {Macro} This object itself.
   */


  Macro.prototype.step = function () {
    var _a;

    var nextSteps = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      nextSteps[_i] = arguments[_i];
    }

    var nextStepsStrings = (_a = []).concat.apply(_a, nextSteps.map(function (x) {
      return x instanceof Macro ? x.components : [x];
    }));

    this.components = __spreadArrays(this.components, nextStepsStrings.filter(function (s) {
      return s.length > 0;
    }));
    return this;
  };
  /**
   * Statefully add one or several steps to a macro.
   * @param nextSteps The steps to add to the macro.
   * @returns {Macro} This object itself.
   */


  Macro.step = function () {
    var _a;

    var nextSteps = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      nextSteps[_i] = arguments[_i];
    }

    return (_a = new this()).step.apply(_a, nextSteps);
  };
  /**
   * Submit the built macro to KoL. Only works inside combat.
   */


  Macro.prototype.submit = function () {
    var _final = this.toString();

    return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)("fight.php?action=macro&macrotext=" + (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.urlEncode)(_final), true, true);
  };
  /**
   * Set this macro as a KoL native autoattack.
   */


  Macro.prototype.setAutoAttack = function () {
    if (Macro.cachedMacroId === null) Macro.cachedMacroId = getMacroId();

    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getAutoAttack)() === 99000000 + Macro.cachedMacroId && this.toString() === Macro.cachedAutoAttack) {
      // This macro is already set. Don"t make the server request.
      return;
    }

    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)("account_combatmacros.php?macroid=" + Macro.cachedMacroId + "&name=" + (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.urlEncode)(MACRO_NAME) + "&macrotext=" + (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.urlEncode)(this.toString()) + "&action=save", true, true);
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)("account.php?am=1&action=autoattack&value=" + (99000000 + Macro.cachedMacroId) + "&ajax=1");
    Macro.cachedAutoAttack = this.toString();
  };
  /**
   * Add an "abort" step to this macro.
   * @returns {Macro} This object itself.
   */


  Macro.prototype.abort = function () {
    return this.step("abort");
  };
  /**
   * Create a new macro with an "abort" step.
   * @returns {Macro} This object itself.
   */


  Macro.abort = function () {
    return new this().abort();
  };
  /**
   * Add an "if" statement to this macro.
   * @param condition The BALLS condition for the if statement.
   * @param ifTrue Continuation if the condition is true.
   * @returns {Macro} This object itself.
   */


  Macro.prototype.if_ = function (condition, ifTrue) {
    return this.step("if " + condition).step(ifTrue).step("endif");
  };
  /**
   * Create a new macro with an "if" statement.
   * @param condition The BALLS condition for the if statement.
   * @param ifTrue Continuation if the condition is true.
   * @returns {Macro} This object itself.
   */


  Macro.if_ = function (condition, ifTrue) {
    return new this().if_(condition, ifTrue);
  };
  /**
   * Add a "while" statement to this macro.
   * @param condition The BALLS condition for the if statement.
   * @param contents Loop to repeat while the condition is true.
   * @returns {Macro} This object itself.
   */


  Macro.prototype.while_ = function (condition, contents) {
    return this.step("while " + condition).step(contents).step("endwhile");
  };
  /**
   * Create a new macro with a "while" statement.
   * @param condition The BALLS condition for the if statement.
   * @param contents Loop to repeat while the condition is true.
   * @returns {Macro} This object itself.
   */


  Macro.while_ = function (condition, contents) {
    return new this().while_(condition, contents);
  };
  /**
   * Conditionally add a step to a macro based on a condition evaluated at the time of building the macro.
   * @param condition The JS condition.
   * @param ifTrue Continuation to add if the condition is true.
   * @returns {Macro} This object itself.
   */


  Macro.prototype.externalIf = function (condition, ifTrue) {
    return condition ? this.step(ifTrue) : this;
  };
  /**
   * Create a new macro with a condition evaluated at the time of building the macro.
   * @param condition The JS condition.
   * @param ifTrue Continuation to add if the condition is true.
   * @returns {Macro} This object itself.
   */


  Macro.externalIf = function (condition, ifTrue) {
    return new this().externalIf(condition, ifTrue);
  };
  /**
   * Add a repeat step to the macro.
   * @returns {Macro} This object itself.
   */


  Macro.prototype.repeat = function () {
    return this.step("repeat");
  };
  /**
   * Add one or more skill cast steps to the macro.
   * @param skills Skills to cast.
   * @returns {Macro} This object itself.
   */


  Macro.prototype.skill = function () {
    var skills = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      skills[_i] = arguments[_i];
    }

    return this.step.apply(this, skills.map(function (skill) {
      return "skill " + skillBallsMacroName(skill);
    }));
  };
  /**
   * Create a new macro with one or more skill cast steps.
   * @param skills Skills to cast.
   * @returns {Macro} This object itself.
   */


  Macro.skill = function () {
    var _a;

    var skills = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      skills[_i] = arguments[_i];
    }

    return (_a = new this()).skill.apply(_a, skills);
  };
  /**
   * Add one or more skill cast steps to the macro, where each step checks if you have the skill first.
   * @param skills Skills to try casting.
   * @returns {Macro} This object itself.
   */


  Macro.prototype.trySkill = function () {
    var skills = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      skills[_i] = arguments[_i];
    }

    return this.step.apply(this, skills.map(function (skill) {
      return Macro.if_("hasskill " + skillBallsMacroName(skill), Macro.skill(skill));
    }));
  };
  /**
   * Create a new macro with one or more skill cast steps, where each step checks if you have the skill first.
   * @param skills Skills to try casting.
   * @returns {Macro} This object itself.
   */


  Macro.trySkill = function () {
    var _a;

    var skills = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      skills[_i] = arguments[_i];
    }

    return (_a = new this()).trySkill.apply(_a, skills);
  };
  /**
   * Add one or more skill-cast-and-repeat steps to the macro, where each step checks if you have the skill first.
   * @param skills Skills to try repeatedly casting.
   * @returns {Macro} This object itself.
   */


  Macro.prototype.trySkillRepeat = function () {
    var skills = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      skills[_i] = arguments[_i];
    }

    return this.step.apply(this, skills.map(function (skill) {
      return Macro.if_("hasskill " + skillBallsMacroName(skill), Macro.skill(skill).repeat());
    }));
  };
  /**
   * Create a new macro with one or more skill-cast-and-repeat steps, where each step checks if you have the skill first.
   * @param skills Skills to try repeatedly casting.
   * @returns {Macro} This object itself.
   */


  Macro.trySkillRepeat = function () {
    var _a;

    var skills = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      skills[_i] = arguments[_i];
    }

    return (_a = new this()).trySkillRepeat.apply(_a, skills);
  };
  /**
   * Add one or more item steps to the macro.
   * @param items Items to use. Pass a tuple [item1, item2] to funksling.
   * @returns {Macro} This object itself.
   */


  Macro.prototype.item = function () {
    var items = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      items[_i] = arguments[_i];
    }

    return this.step.apply(this, items.map(function (itemOrItems) {
      return "use " + itemOrItemsBallsMacroName(itemOrItems);
    }));
  };
  /**
   * Create a new macro with one or more item steps.
   * @param items Items to use. Pass a tuple [item1, item2] to funksling.
   * @returns {Macro} This object itself.
   */


  Macro.item = function () {
    var _a;

    var items = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      items[_i] = arguments[_i];
    }

    return (_a = new this()).item.apply(_a, items);
  };
  /**
   * Add one or more item steps to the macro, where each step checks to see if you have the item first.
   * @param items Items to try using. Pass a tuple [item1, item2] to funksling.
   * @returns {Macro} This object itself.
   */


  Macro.prototype.tryItem = function () {
    var items = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      items[_i] = arguments[_i];
    }

    return this.step.apply(this, items.map(function (item) {
      return Macro.if_("hascombatitem " + itemOrItemsBallsMacroPredicate(item), "use " + itemOrItemsBallsMacroName(item));
    }));
  };
  /**
   * Create a new macro with one or more item steps, where each step checks to see if you have the item first.
   * @param items Items to try using. Pass a tuple [item1, item2] to funksling.
   * @returns {Macro} This object itself.
   */


  Macro.tryItem = function () {
    var _a;

    var items = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      items[_i] = arguments[_i];
    }

    return (_a = new this()).tryItem.apply(_a, items);
  };
  /**
   * Add an attack step to the macro.
   * @returns {Macro} This object itself.
   */


  Macro.prototype.attack = function () {
    return this.step("attack");
  };
  /**
   * Create a new macro with an attack step.
   * @returns {Macro} This object itself.
   */


  Macro.attack = function () {
    return new this().attack();
  };

  Macro.SAVED_MACRO_PROPERTY = "libram_savedMacro";
  Macro.cachedMacroId = null;
  Macro.cachedAutoAttack = null;
  return Macro;
}();


function banishedMonsters() {
  var banishedstring = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getProperty)("banishedMonsters");
  var banishedComponents = banishedstring.split(":");
  var result = new Map();
  if (banishedComponents.length < 3) return result;

  for (var idx = 0; idx < banishedComponents.length / 3 - 1; idx++) {
    var foe = Monster.get(banishedComponents[idx * 3]);
    var banisher = banishedComponents[idx * 3 + 1]; // toItem doesn"t error if the item doesn"t exist, so we have to use that.

    var banisherItem = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.toItem)(banisher);
    var banisherObject = [(0,_template_string__WEBPACK_IMPORTED_MODULE_2__.$item)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["none"], ["none"]))), null].includes(banisherItem) ? Skill.get(banisher) : banisherItem;
    result.set(banisherObject, foe);
  }

  return result;
}
/**
 * Adventure in a location and handle all combats with a given macro.
 * To use this function you will need to create a consult script that runs Macro.load().submit() and a CCS that calls that consult script.
 * See examples/consult.ts for an example.
 * @param loc Location to adventure in.
 * @param macro Macro to execute.
 */

function adventureMacro(loc, macro) {
  macro.save();

  try {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.adv1)(loc, 0, "");

    while ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.inMultiFight)()) {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.runCombat)();
    }

    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.choiceFollowsFight)()) (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)("choice.php");
  } finally {
    Macro.clearSaved();
  }
}
/**
 * Adventure in a location and handle all combats with a given autoattack and manual macro.
 * To use the nextMacro parameter you will need to create a consult script that runs Macro.load().submit() and a CCS that calls that consult script.
 * See examples/consult.ts for an example.
 * @param loc Location to adventure in.
 * @param autoMacro Macro to execute via KoL autoattack.
 * @param nextMacro Macro to execute manually after autoattack completes.
 */

function adventureMacroAuto(loc, autoMacro, nextMacro) {
  if (nextMacro === void 0) {
    nextMacro = null;
  }

  nextMacro = nextMacro !== null && nextMacro !== void 0 ? nextMacro : Macro.abort();
  autoMacro.setAutoAttack();
  adventureMacro(loc, nextMacro);
}
var templateObject_1;

/***/ }),

/***/ "./node_modules/libram/dist/console.js":
/*!*********************************************!*\
  !*** ./node_modules/libram/dist/console.js ***!
  \*********************************************/
/*! namespace exports */
/*! export error [provided] [no usage info] [missing usage info prevents renaming] */
/*! export info [provided] [no usage info] [missing usage info prevents renaming] */
/*! export log [provided] [no usage info] [missing usage info prevents renaming] */
/*! export warn [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "log": () => /* binding */ log,
/* harmony export */   "info": () => /* binding */ info,
/* harmony export */   "warn": () => /* binding */ warn,
/* harmony export */   "error": () => /* binding */ error
/* harmony export */ });
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! kolmafia */ "kolmafia");
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(kolmafia__WEBPACK_IMPORTED_MODULE_0__);
 // eslint-disable-next-line @typescript-eslint/no-explicit-any

var logColor = function logColor(color) {
  return function () {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    var output = args.map(function (x) {
      return x.toString();
    }).join(" ");

    if (color) {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)(output, color);
    } else {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)(output);
    }
  };
};

var log = logColor();
var info = logColor("blue");
var warn = logColor("red");
var error = logColor("red");

/***/ }),

/***/ "./node_modules/libram/dist/lib.js":
/*!*****************************************!*\
  !*** ./node_modules/libram/dist/lib.js ***!
  \*****************************************/
/*! namespace exports */
/*! export Wanderer [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getActiveEffects [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getActiveSongs [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getFamiliarWandererChance [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getFoldGroup [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getKramcoWandererChance [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getMonsterLocations [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getRemainingLiver [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getRemainingSpleen [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getRemainingStomach [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getSongCount [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getSongLimit [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getTotalFamiliarWanderers [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getWandererChance [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getZapGroup [provided] [no usage info] [missing usage info prevents renaming] */
/*! export have [provided] [no usage info] [missing usage info prevents renaming] */
/*! export haveCounter [provided] [no usage info] [missing usage info prevents renaming] */
/*! export haveInCampground [provided] [no usage info] [missing usage info prevents renaming] */
/*! export haveWandererCounter [provided] [no usage info] [missing usage info prevents renaming] */
/*! export isCurrentFamiliar [provided] [no usage info] [missing usage info prevents renaming] */
/*! export isSong [provided] [no usage info] [missing usage info prevents renaming] */
/*! export isVoteWandererNow [provided] [no usage info] [missing usage info prevents renaming] */
/*! export isWandererNow [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getSongLimit": () => /* binding */ getSongLimit,
/* harmony export */   "isSong": () => /* binding */ isSong,
/* harmony export */   "getActiveEffects": () => /* binding */ getActiveEffects,
/* harmony export */   "getActiveSongs": () => /* binding */ getActiveSongs,
/* harmony export */   "getSongCount": () => /* binding */ getSongCount,
/* harmony export */   "getMonsterLocations": () => /* binding */ getMonsterLocations,
/* harmony export */   "getRemainingLiver": () => /* binding */ getRemainingLiver,
/* harmony export */   "getRemainingStomach": () => /* binding */ getRemainingStomach,
/* harmony export */   "getRemainingSpleen": () => /* binding */ getRemainingSpleen,
/* harmony export */   "have": () => /* binding */ have,
/* harmony export */   "haveInCampground": () => /* binding */ haveInCampground,
/* harmony export */   "Wanderer": () => /* binding */ Wanderer,
/* harmony export */   "haveCounter": () => /* binding */ haveCounter,
/* harmony export */   "getTotalFamiliarWanderers": () => /* binding */ getTotalFamiliarWanderers,
/* harmony export */   "haveWandererCounter": () => /* binding */ haveWandererCounter,
/* harmony export */   "isVoteWandererNow": () => /* binding */ isVoteWandererNow,
/* harmony export */   "isWandererNow": () => /* binding */ isWandererNow,
/* harmony export */   "getKramcoWandererChance": () => /* binding */ getKramcoWandererChance,
/* harmony export */   "getFamiliarWandererChance": () => /* binding */ getFamiliarWandererChance,
/* harmony export */   "getWandererChance": () => /* binding */ getWandererChance,
/* harmony export */   "isCurrentFamiliar": () => /* binding */ isCurrentFamiliar,
/* harmony export */   "getFoldGroup": () => /* binding */ getFoldGroup,
/* harmony export */   "getZapGroup": () => /* binding */ getZapGroup
/* harmony export */ });
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! kolmafia */ "kolmafia");
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(kolmafia__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _template_string__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./template-string */ "./node_modules/libram/dist/template-string.js");
/* harmony import */ var _property__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./property */ "./node_modules/libram/dist/property.js");
var __makeTemplateObject = undefined && undefined.__makeTemplateObject || function (cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", {
      value: raw
    });
  } else {
    cooked.raw = raw;
  }

  return cooked;
};




/**
 * Returns the current maximum Accordion Thief songs the player can have in their head
 */

function getSongLimit() {
  return 3 + ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.booleanModifier)("Four Songs") ? 1 : 0) + (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.numericModifier)("Additional Song");
}
/**
 * Return whether the Skill or Effect provided is an Accordion Thief song
 * @param skillOrEffect The Skill or Effect
 */

function isSong(skillOrEffect) {
  var skill = skillOrEffect instanceof Effect ? (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.toSkill)(skillOrEffect) : skillOrEffect;
  return skill["class"] === (0,_template_string__WEBPACK_IMPORTED_MODULE_1__.$class)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["Accordion Thief"], ["Accordion Thief"]))) && skill.buff;
}
/**
 * List all active Effects
 */

function getActiveEffects() {
  return Object.keys((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myEffects)()).map(function (e) {
    return Effect.get(e);
  });
}
/**
 * List currently active Accordion Thief songs
 */

function getActiveSongs() {
  return getActiveEffects().filter(isSong);
}
/**
 * List number of active Accordion Thief songs
 */

function getSongCount() {
  return getActiveSongs().length;
}
/**
 * Return the locations in which the given monster can be encountered naturally
 * @param monster Monster to find
 */

function getMonsterLocations(monster) {
  return Location.all().filter(function (location) {
    return monster.name in (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.appearanceRates)(location);
  });
}
/**
 * Return the player's remaining liver space
 */

function getRemainingLiver() {
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.inebrietyLimit)() - (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myInebriety)();
}
/**
 * Return the player's remaining stomach space
 */

function getRemainingStomach() {
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.fullnessLimit)() - (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myFullness)();
}
/**
 * Return the player's remaining spleen space
 */

function getRemainingSpleen() {
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.spleenLimit)() - (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.mySpleenUse)();
}
/**
 * Return whether the player "has" any entity which one could feasibly "have".
 */

function have(thing, quantity) {
  if (quantity === void 0) {
    quantity = 1;
  }

  if (thing instanceof Effect) {
    return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveEffect)(thing) >= quantity;
  }

  if (thing instanceof Familiar) {
    return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveFamiliar)(thing);
  }

  if (thing instanceof Item) {
    return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)(thing) >= quantity;
  }

  if (thing instanceof Servant) {
    return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveServant)(thing);
  }

  if (thing instanceof Skill) {
    return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveSkill)(thing);
  }

  if (thing instanceof Thrall) {
    var thrall = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myThrall)();
    return thrall.id === thing.id && thrall.level >= quantity;
  }

  return false;
}
/**
 * Return whether an item is in the player's campground
 */

function haveInCampground(item) {
  return Object.keys((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getCampground)()).map(function (i) {
    return Item.get(i);
  }).includes(item);
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
 */

function haveCounter(counterName, minTurns, maxTurns) {
  if (minTurns === void 0) {
    minTurns = 0;
  }

  if (maxTurns === void 0) {
    maxTurns = 500;
  }

  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getCounters)(counterName, minTurns, maxTurns) === counterName;
}
/**
 * Returns the player's total number of Artistic Goth Kid and/or Mini-Hipster
 * wanderers encountered today
 */

function getTotalFamiliarWanderers() {
  var hipsterFights = (0,_property__WEBPACK_IMPORTED_MODULE_2__.get)("_hipsterAdv");
  var gothFights = (0,_property__WEBPACK_IMPORTED_MODULE_2__.get)("_gothKidFights");
  return hipsterFights + gothFights;
}
/**
 * Return whether the player has the queried wandering counter
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
 */

function isVoteWandererNow() {
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.totalTurnsPlayed)() % 11 == 1;
}
/**
 * For deterministic wanderers:
 * Return whether the player will encounter the queried wanderer on the next turn
 *
 * For variable wanderers (window):
 * Return whether the player is within an encounter window for the queried wanderer
 *
 * For variable wanderers (chance per turn):
 * Returns true unless the player has exhausted the number of wanderers possible
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
    return getTotalFamiliarWanderers() < 7;
  }

  var begin = wanderer + " window begin";
  var end = wanderer + " window end";
  return !haveCounter(begin, 1) && haveCounter(end);
}
/**
 * Returns the float chance the player will encounter a sausage goblin on the
 * next turn, providing the Kramco Sausage-o-Matic is equipped.
 */

function getKramcoWandererChance() {
  var fights = (0,_property__WEBPACK_IMPORTED_MODULE_2__.get)("_sausageFights");
  var lastFight = (0,_property__WEBPACK_IMPORTED_MODULE_2__.get)("_lastSausageMonsterTurn");
  var totalTurns = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.totalTurnsPlayed)();

  if (fights < 1) {
    return lastFight === totalTurns && (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myTurncount)() < 1 ? 0.5 : 1.0;
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
 */

function getFamiliarWandererChance() {
  var totalFights = getTotalFamiliarWanderers();
  var probability = [0.5, 0.4, 0.3, 0.2];

  if (totalFights < 4) {
    return probability[totalFights];
  }

  return totalFights > 7 ? 0.0 : 0.1;
}
/**
 * Returns the float chance the player will encounter the queried wanderer
 * on the next turn.
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

  var counters = (0,_property__WEBPACK_IMPORTED_MODULE_2__.get)("relayCounters");
  var re = new RegExp("(\\d+):" + end);
  var matches = counters.match(re);

  if (matches && matches.length === 2) {
    var window = Number.parseInt(matches[1]) - (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myTurncount)();
    return 1.0 / window;
  }

  return 0.0;
}
function isCurrentFamiliar(familiar) {
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myFamiliar)() === familiar;
}
function getFoldGroup(item) {
  return Object.entries((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getRelated)(item, "fold")).sort(function (_a, _b) {
    var a = _a[1];
    var b = _b[1];
    return a - b;
  }).map(function (_a) {
    var i = _a[0];
    return Item.get(i);
  });
}
function getZapGroup(item) {
  return Object.keys((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getRelated)(item, "zap")).map(function (i) {
    return Item.get(i);
  });
}
var templateObject_1;

/***/ }),

/***/ "./node_modules/libram/dist/property.js":
/*!**********************************************!*\
  !*** ./node_modules/libram/dist/property.js ***!
  \**********************************************/
/*! namespace exports */
/*! export createMafiaClassPropertyGetter [provided] [no usage info] [missing usage info prevents renaming] */
/*! export createPropertyGetter [provided] [no usage info] [missing usage info prevents renaming] */
/*! export get [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getBoolean [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getBounty [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getClass [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getCoinmaster [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getCommaSeparated [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getEffect [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getElement [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getFamiliar [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getItem [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getLocation [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getMonster [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getNumber [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getPhylum [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getServant [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getSkill [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getSlot [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getStat [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getString [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getThrall [provided] [no usage info] [missing usage info prevents renaming] */
/*! export set [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createPropertyGetter": () => /* binding */ createPropertyGetter,
/* harmony export */   "createMafiaClassPropertyGetter": () => /* binding */ createMafiaClassPropertyGetter,
/* harmony export */   "getString": () => /* binding */ getString,
/* harmony export */   "getCommaSeparated": () => /* binding */ getCommaSeparated,
/* harmony export */   "getBoolean": () => /* binding */ getBoolean,
/* harmony export */   "getNumber": () => /* binding */ getNumber,
/* harmony export */   "getBounty": () => /* binding */ getBounty,
/* harmony export */   "getClass": () => /* binding */ getClass,
/* harmony export */   "getCoinmaster": () => /* binding */ getCoinmaster,
/* harmony export */   "getEffect": () => /* binding */ getEffect,
/* harmony export */   "getElement": () => /* binding */ getElement,
/* harmony export */   "getFamiliar": () => /* binding */ getFamiliar,
/* harmony export */   "getItem": () => /* binding */ getItem,
/* harmony export */   "getLocation": () => /* binding */ getLocation,
/* harmony export */   "getMonster": () => /* binding */ getMonster,
/* harmony export */   "getPhylum": () => /* binding */ getPhylum,
/* harmony export */   "getServant": () => /* binding */ getServant,
/* harmony export */   "getSkill": () => /* binding */ getSkill,
/* harmony export */   "getSlot": () => /* binding */ getSlot,
/* harmony export */   "getStat": () => /* binding */ getStat,
/* harmony export */   "getThrall": () => /* binding */ getThrall,
/* harmony export */   "get": () => /* binding */ get,
/* harmony export */   "set": () => /* binding */ set
/* harmony export */ });
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! kolmafia */ "kolmafia");
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(kolmafia__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _propertyTyping__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./propertyTyping */ "./node_modules/libram/dist/propertyTyping.js");


var createPropertyGetter = function createPropertyGetter(transform) {
  return function (property, default_) {
    var value = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getProperty)(property);

    if (default_ !== undefined && value === "") {
      return default_;
    }

    return transform(value, property);
  };
};
var createMafiaClassPropertyGetter = function createMafiaClassPropertyGetter(Type) {
  return createPropertyGetter(function (value) {
    var v = Type.get(value);
    return v === Type.get("none") ? null : v;
  });
};
var getString = createPropertyGetter(function (value) {
  return value;
});
var getCommaSeparated = createPropertyGetter(function (value) {
  return value.split(/, ?/);
});
var getBoolean = createPropertyGetter(function (value) {
  return value === "true";
});
var getNumber = createPropertyGetter(function (value) {
  return Number(value);
});
var getBounty = createMafiaClassPropertyGetter(Bounty);
var getClass = createMafiaClassPropertyGetter(Class);
var getCoinmaster = createMafiaClassPropertyGetter(Coinmaster);
var getEffect = createMafiaClassPropertyGetter(Effect);
var getElement = createMafiaClassPropertyGetter(Element);
var getFamiliar = createMafiaClassPropertyGetter(Familiar);
var getItem = createMafiaClassPropertyGetter(Item);
var getLocation = createMafiaClassPropertyGetter(Location);
var getMonster = createMafiaClassPropertyGetter(Monster);
var getPhylum = createMafiaClassPropertyGetter(Phylum);
var getServant = createMafiaClassPropertyGetter(Servant);
var getSkill = createMafiaClassPropertyGetter(Skill);
var getSlot = createMafiaClassPropertyGetter(Slot);
var getStat = createMafiaClassPropertyGetter(Stat);
var getThrall = createMafiaClassPropertyGetter(Thrall);
function get(property, _default) {
  var value = getString(property);

  if ((0,_propertyTyping__WEBPACK_IMPORTED_MODULE_1__.isMonsterProperty)(property)) {
    return getMonster(property, _default);
  }

  if ((0,_propertyTyping__WEBPACK_IMPORTED_MODULE_1__.isLocationProperty)(property)) {
    return getLocation(property, _default);
  }

  if (value === "") {
    return _default === undefined ? "" : _default;
  }

  if ((0,_propertyTyping__WEBPACK_IMPORTED_MODULE_1__.isBooleanProperty)(property, value)) {
    return getBoolean(property, _default);
  }

  if ((0,_propertyTyping__WEBPACK_IMPORTED_MODULE_1__.isNumericProperty)(property, value)) {
    return getNumber(property, _default);
  }

  return value;
}
function set(property, value) {
  var stringValue = value === null ? "" : value.toString();
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.setProperty)(property, stringValue);
}

/***/ }),

/***/ "./node_modules/libram/dist/propertyTyping.js":
/*!****************************************************!*\
  !*** ./node_modules/libram/dist/propertyTyping.js ***!
  \****************************************************/
/*! namespace exports */
/*! export isBooleanProperty [provided] [no usage info] [missing usage info prevents renaming] */
/*! export isLocationProperty [provided] [no usage info] [missing usage info prevents renaming] */
/*! export isMonsterProperty [provided] [no usage info] [missing usage info prevents renaming] */
/*! export isNumericProperty [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isNumericProperty": () => /* binding */ isNumericProperty,
/* harmony export */   "isBooleanProperty": () => /* binding */ isBooleanProperty,
/* harmony export */   "isLocationProperty": () => /* binding */ isLocationProperty,
/* harmony export */   "isMonsterProperty": () => /* binding */ isMonsterProperty
/* harmony export */ });
function isNumericProperty(property, value) {
  return !isNaN(Number(value)) && !isNaN(parseFloat(value));
}
var fakeBooleans = ["trackVoteMonster", "_jickJarAvailable"];
function isBooleanProperty(property, value) {
  if (fakeBooleans.includes(property)) return false;
  return ["true", "false"].includes(value);
}
var otherLocations = ["nextSpookyravenElizabethRoom", "nextSpookyravenStephenRoom"];
function isLocationProperty(property) {
  return otherLocations.includes(property) || property.endsWith("Location");
}
var otherMonsters = ["romanticTarget"];
function isMonsterProperty(property) {
  if (otherMonsters.includes(property)) return true;
  return property.endsWith("Monster");
}

/***/ }),

/***/ "./node_modules/libram/dist/template-string.js":
/*!*****************************************************!*\
  !*** ./node_modules/libram/dist/template-string.js ***!
  \*****************************************************/
/*! namespace exports */
/*! export $bounties [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $bounty [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $class [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $classes [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $coinmaster [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $coinmasters [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $effect [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $effects [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $element [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $elements [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $familiar [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $familiars [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $item [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $items [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $location [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $locations [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $monster [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $monsters [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $phyla [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $phylum [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $servant [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $servants [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $skill [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $skills [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $slot [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $slots [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $stat [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $stats [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $thrall [provided] [no usage info] [missing usage info prevents renaming] */
/*! export $thralls [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$bounty": () => /* binding */ $bounty,
/* harmony export */   "$bounties": () => /* binding */ $bounties,
/* harmony export */   "$class": () => /* binding */ $class,
/* harmony export */   "$classes": () => /* binding */ $classes,
/* harmony export */   "$coinmaster": () => /* binding */ $coinmaster,
/* harmony export */   "$coinmasters": () => /* binding */ $coinmasters,
/* harmony export */   "$effect": () => /* binding */ $effect,
/* harmony export */   "$effects": () => /* binding */ $effects,
/* harmony export */   "$element": () => /* binding */ $element,
/* harmony export */   "$elements": () => /* binding */ $elements,
/* harmony export */   "$familiar": () => /* binding */ $familiar,
/* harmony export */   "$familiars": () => /* binding */ $familiars,
/* harmony export */   "$item": () => /* binding */ $item,
/* harmony export */   "$items": () => /* binding */ $items,
/* harmony export */   "$location": () => /* binding */ $location,
/* harmony export */   "$locations": () => /* binding */ $locations,
/* harmony export */   "$monster": () => /* binding */ $monster,
/* harmony export */   "$monsters": () => /* binding */ $monsters,
/* harmony export */   "$phylum": () => /* binding */ $phylum,
/* harmony export */   "$phyla": () => /* binding */ $phyla,
/* harmony export */   "$servant": () => /* binding */ $servant,
/* harmony export */   "$servants": () => /* binding */ $servants,
/* harmony export */   "$skill": () => /* binding */ $skill,
/* harmony export */   "$skills": () => /* binding */ $skills,
/* harmony export */   "$slot": () => /* binding */ $slot,
/* harmony export */   "$slots": () => /* binding */ $slots,
/* harmony export */   "$stat": () => /* binding */ $stat,
/* harmony export */   "$stats": () => /* binding */ $stats,
/* harmony export */   "$thrall": () => /* binding */ $thrall,
/* harmony export */   "$thralls": () => /* binding */ $thralls
/* harmony export */ });
var __spreadArrays = undefined && undefined.__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
    s += arguments[i].length;
  }

  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
      r[k] = a[j];
    }
  }

  return r;
};

var concatTemplateString = function concatTemplateString(literals) {
  var placeholders = [];

  for (var _i = 1; _i < arguments.length; _i++) {
    placeholders[_i - 1] = arguments[_i];
  }

  return literals.reduce(function (acc, literal, i) {
    return acc + literal + (placeholders[i] || "");
  }, "");
};

var createSingleConstant = function createSingleConstant(Type) {
  return function (literals) {
    var placeholders = [];

    for (var _i = 1; _i < arguments.length; _i++) {
      placeholders[_i - 1] = arguments[_i];
    }

    var input = concatTemplateString.apply(void 0, __spreadArrays([literals], placeholders));
    return Type.get(input);
  };
};

var createPluralConstant = function createPluralConstant(Type) {
  return function (literals) {
    var placeholders = [];

    for (var _i = 1; _i < arguments.length; _i++) {
      placeholders[_i - 1] = arguments[_i];
    }

    var input = concatTemplateString.apply(void 0, __spreadArrays([literals], placeholders));

    if (input === "") {
      return Type.all();
    }

    return Type.get(input.split(","));
  };
};
/**
 * A Bounty specified by name.
 */


var $bounty = createSingleConstant(Bounty);
/**
 * A list of Bounties specified by a comma-separated list of names.
 * For a list of all possible Bounties, leave the template string blank.
 */

var $bounties = createPluralConstant(Bounty);
/**
 * A Class specified by name.
 */

var $class = createSingleConstant(Class);
/**
 * A list of Classes specified by a comma-separated list of names.
 * For a list of all possible Classes, leave the template string blank.
 */

var $classes = createPluralConstant(Class);
/**
 * A Coinmaster specified by name.
 */

var $coinmaster = createSingleConstant(Coinmaster);
/**
 * A list of Coinmasters specified by a comma-separated list of names.
 * For a list of all possible Coinmasters, leave the template string blank.
 */

var $coinmasters = createPluralConstant(Coinmaster);
/**
 * An Effect specified by name.
 */

var $effect = createSingleConstant(Effect);
/**
 * A list of Effects specified by a comma-separated list of names.
 * For a list of all possible Effects, leave the template string blank.
 */

var $effects = createPluralConstant(Effect);
/**
 * An Element specified by name.
 */

var $element = createSingleConstant(Element);
/**
 * A list of Elements specified by a comma-separated list of names.
 * For a list of all possible Elements, leave the template string blank.
 */

var $elements = createPluralConstant(Element);
/**
 * A Familiar specified by name.
 */

var $familiar = createSingleConstant(Familiar);
/**
 * A list of Familiars specified by a comma-separated list of names.
 * For a list of all possible Familiars, leave the template string blank.
 */

var $familiars = createPluralConstant(Familiar);
/**
 * An Item specified by name.
 */

var $item = createSingleConstant(Item);
/**
 * A list of Items specified by a comma-separated list of names.
 * For a list of all possible Items, leave the template string blank.
 */

var $items = createPluralConstant(Item);
/**
 * A Location specified by name.
 */

var $location = createSingleConstant(Location);
/**
 * A list of Locations specified by a comma-separated list of names.
 * For a list of all possible Locations, leave the template string blank.
 */

var $locations = createPluralConstant(Location);
/**
 * A Monster specified by name.
 */

var $monster = createSingleConstant(Monster);
/**
 * A list of Monsters specified by a comma-separated list of names.
 * For a list of all possible Monsters, leave the template string blank.
 */

var $monsters = createPluralConstant(Monster);
/**
 * A Phylum specified by name.
 */

var $phylum = createSingleConstant(Phylum);
/**
 * A list of Phyla specified by a comma-separated list of names.
 * For a list of all possible Phyla, leave the template string blank.
 */

var $phyla = createPluralConstant(Phylum);
/**
 * A Servant specified by name.
 */

var $servant = createSingleConstant(Servant);
/**
 * A list of Servants specified by a comma-separated list of names.
 * For a list of all possible Servants, leave the template string blank.
 */

var $servants = createPluralConstant(Servant);
/**
 * A Skill specified by name.
 */

var $skill = createSingleConstant(Skill);
/**
 * A list of Skills specified by a comma-separated list of names.
 * For a list of all possible Skills, leave the template string blank.
 */

var $skills = createPluralConstant(Skill);
/**
 * A Slot specified by name.
 */

var $slot = createSingleConstant(Slot);
/**
 * A list of Slots specified by a comma-separated list of names.
 * For a list of all possible Slots, leave the template string blank.
 */

var $slots = createPluralConstant(Slot);
/**
 * A Stat specified by name.
 */

var $stat = createSingleConstant(Stat);
/**
 * A list of Stats specified by a comma-separated list of names.
 * For a list of all possible Stats, leave the template string blank.
 */

var $stats = createPluralConstant(Stat);
/**
 * A Thrall specified by name.
 */

var $thrall = createSingleConstant(Thrall);
/**
 * A list of Thralls specified by a comma-separated list of names.
 * For a list of all possible Thralls, leave the template string blank.
 */

var $thralls = createPluralConstant(Thrall);

/***/ }),

/***/ "./src/hccs.ts":
/*!*********************!*\
  !*** ./src/hccs.ts ***!
  \*********************/
/*! namespace exports */
/*! export main [provided] [maybe used in hccs (runtime-defined)] [usage prevents renaming] */
/*! export testDone [provided] [maybe used in hccs (runtime-defined)] [usage prevents renaming] */
/*! export withMacro [provided] [maybe used in hccs (runtime-defined)] [usage prevents renaming] */
/*! other exports [not provided] [maybe used in hccs (runtime-defined)] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "testDone": () => /* binding */ testDone,
/* harmony export */   "withMacro": () => /* binding */ withMacro,
/* harmony export */   "main": () => /* binding */ main
/* harmony export */ });
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib */ "./src/lib.ts");
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! kolmafia */ "kolmafia");
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(kolmafia__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! libram */ "./node_modules/libram/dist/combat.js");
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! libram */ "./node_modules/libram/dist/template-string.js");
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! libram */ "./node_modules/libram/dist/property.js");
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! libram */ "./node_modules/libram/dist/lib.js");
/* harmony import */ var libram_dist_console__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! libram/dist/console */ "./node_modules/libram/dist/console.js");
/* harmony import */ var _synthesis__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./synthesis */ "./src/synthesis.ts");
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14, _templateObject15, _templateObject16, _templateObject17, _templateObject18, _templateObject19, _templateObject20, _templateObject21, _templateObject22, _templateObject23, _templateObject24, _templateObject25, _templateObject26, _templateObject27, _templateObject28, _templateObject29, _templateObject30, _templateObject31, _templateObject32, _templateObject33, _templateObject34, _templateObject35, _templateObject36, _templateObject37, _templateObject38, _templateObject39, _templateObject40, _templateObject41, _templateObject42, _templateObject43, _templateObject44, _templateObject45, _templateObject46, _templateObject47, _templateObject48, _templateObject49, _templateObject50, _templateObject51, _templateObject52, _templateObject53, _templateObject54, _templateObject55, _templateObject56, _templateObject57, _templateObject58, _templateObject59, _templateObject60, _templateObject61, _templateObject62, _templateObject63, _templateObject64, _templateObject65, _templateObject66, _templateObject67, _templateObject68, _templateObject69, _templateObject70, _templateObject71, _templateObject72, _templateObject73, _templateObject74, _templateObject75, _templateObject76, _templateObject77, _templateObject78, _templateObject79, _templateObject80, _templateObject81, _templateObject82, _templateObject83, _templateObject84, _templateObject85, _templateObject86, _templateObject87, _templateObject88, _templateObject89, _templateObject90, _templateObject91, _templateObject92, _templateObject93, _templateObject94, _templateObject95, _templateObject96, _templateObject97, _templateObject98, _templateObject99, _templateObject100, _templateObject101, _templateObject102, _templateObject103, _templateObject104, _templateObject105, _templateObject106, _templateObject107, _templateObject108, _templateObject109, _templateObject110, _templateObject111, _templateObject112, _templateObject113, _templateObject114, _templateObject115, _templateObject116, _templateObject117, _templateObject118, _templateObject119, _templateObject120, _templateObject121, _templateObject122, _templateObject123, _templateObject124, _templateObject125, _templateObject126, _templateObject127, _templateObject128, _templateObject129, _templateObject130, _templateObject131, _templateObject132, _templateObject133, _templateObject134, _templateObject135, _templateObject136, _templateObject137, _templateObject138, _templateObject139, _templateObject140, _templateObject141, _templateObject142, _templateObject143, _templateObject144, _templateObject145, _templateObject146, _templateObject147, _templateObject148, _templateObject149, _templateObject150, _templateObject151, _templateObject152, _templateObject153, _templateObject154, _templateObject155, _templateObject156, _templateObject157, _templateObject158, _templateObject159, _templateObject160, _templateObject161, _templateObject162, _templateObject163, _templateObject164, _templateObject165, _templateObject166, _templateObject167, _templateObject168, _templateObject169, _templateObject170, _templateObject171, _templateObject172, _templateObject173, _templateObject174, _templateObject175, _templateObject176, _templateObject177, _templateObject178, _templateObject179, _templateObject180, _templateObject181, _templateObject182, _templateObject183, _templateObject184, _templateObject185, _templateObject186, _templateObject187, _templateObject188, _templateObject189, _templateObject190, _templateObject191, _templateObject192, _templateObject193, _templateObject194, _templateObject195, _templateObject196, _templateObject197, _templateObject198, _templateObject199, _templateObject200, _templateObject201, _templateObject202, _templateObject203, _templateObject204, _templateObject205, _templateObject206, _templateObject207, _templateObject208, _templateObject209, _templateObject210, _templateObject211, _templateObject212, _templateObject213, _templateObject214, _templateObject215, _templateObject216, _templateObject217, _templateObject218, _templateObject219, _templateObject220, _templateObject221, _templateObject222, _templateObject223, _templateObject224, _templateObject225, _templateObject226, _templateObject227, _templateObject228, _templateObject229, _templateObject230, _templateObject231, _templateObject232, _templateObject233, _templateObject234, _templateObject235, _templateObject236, _templateObject237, _templateObject238, _templateObject239, _templateObject240, _templateObject241, _templateObject242, _templateObject243, _templateObject244, _templateObject245, _templateObject246, _templateObject247, _templateObject248, _templateObject249, _templateObject250, _templateObject251, _templateObject252, _templateObject253, _templateObject254, _templateObject255, _templateObject256, _templateObject257, _templateObject258, _templateObject259, _templateObject260, _templateObject261, _templateObject262, _templateObject263, _templateObject264, _templateObject265, _templateObject266, _templateObject267, _templateObject268, _templateObject269, _templateObject270, _templateObject271, _templateObject272, _templateObject273, _templateObject274, _templateObject275, _templateObject276, _templateObject277, _templateObject278, _templateObject279, _templateObject280, _templateObject281, _templateObject282, _templateObject283, _templateObject284, _templateObject285, _templateObject286, _templateObject287, _templateObject288, _templateObject289, _templateObject290, _templateObject291, _templateObject292, _templateObject293, _templateObject294, _templateObject295, _templateObject296, _templateObject297, _templateObject298, _templateObject299, _templateObject300, _templateObject301, _templateObject302, _templateObject303, _templateObject304, _templateObject305, _templateObject306, _templateObject307, _templateObject308, _templateObject309, _templateObject310, _templateObject311, _templateObject312, _templateObject313, _templateObject314, _templateObject315, _templateObject316, _templateObject317, _templateObject318, _templateObject319, _templateObject320, _templateObject321, _templateObject322, _templateObject323, _templateObject324, _templateObject325, _templateObject326, _templateObject327, _templateObject328, _templateObject329, _templateObject330, _templateObject331, _templateObject332, _templateObject333, _templateObject334, _templateObject335, _templateObject336, _templateObject337, _templateObject338, _templateObject339, _templateObject340, _templateObject341, _templateObject342, _templateObject343, _templateObject344, _templateObject345, _templateObject346, _templateObject347, _templateObject348, _templateObject349, _templateObject350, _templateObject351, _templateObject352, _templateObject353, _templateObject354, _templateObject355, _templateObject356, _templateObject357, _templateObject358, _templateObject359, _templateObject360, _templateObject361, _templateObject362, _templateObject363, _templateObject364, _templateObject365, _templateObject366, _templateObject367, _templateObject368, _templateObject369, _templateObject370, _templateObject371, _templateObject372, _templateObject373, _templateObject374, _templateObject375, _templateObject376, _templateObject377, _templateObject378, _templateObject379, _templateObject380, _templateObject381, _templateObject382;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }





 // rewrite all combats
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
var tempMacro = "";
var targetTurns = new Map();
var familiarFor100Run; // test order will be stats, hot, item, NC, Fam, weapon, spell

var START_TIME = (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.gametimeToInt)();
var justKillTheThing = libram__WEBPACK_IMPORTED_MODULE_3__.Macro.trySkill((0,libram__WEBPACK_IMPORTED_MODULE_4__.$skill)(_templateObject || (_templateObject = _taggedTemplateLiteral(["Curse of Weaksauce"])))).trySkill((0,libram__WEBPACK_IMPORTED_MODULE_4__.$skill)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["Micrometeorite"])))).trySkill((0,libram__WEBPACK_IMPORTED_MODULE_4__.$skill)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["Sing Along"])))).trySkill((0,libram__WEBPACK_IMPORTED_MODULE_4__.$skill)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["extract"])))).trySkill((0,libram__WEBPACK_IMPORTED_MODULE_4__.$skill)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["Stuffed Mortar Shell"])))).skill((0,libram__WEBPACK_IMPORTED_MODULE_4__.$skill)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["saucestorm"])))).step("repeat"); // Sweet Synthesis plan.
// This is the sequence of synthesis effects; we will, if possible, come up with a plan for allocating candy to each of these.

var synthesisPlanner = new _synthesis__WEBPACK_IMPORTED_MODULE_2__.SynthesisPlanner((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effects)(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["Synthesis: Learning, Synthesis: Smart, Synthesis: Strong, Synthesis: Cool, Synthesis: Hot, Synthesis: Collection"]))));
/*
const defaultFamiliar = $familiar`melodramedary`;
const defaultFamiliarEquipment = $item`dromedary drinking helmet`;
// TODO: make this choose camel until 100 spit, then pixie for absinthe, then ???
function useDefaultFamiliar() {
  useFamiliar(defaultFamiliar);
  if (defaultFamiliarEquipment !== $item`none`) {
    equip(defaultFamiliarEquipment);
  }
}
*/

function useDefaultFamiliar() {
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.useFamiliar)(familiarFor100Run); // if (get("camelSpit") < 100 && !testDone(TEST_WEAPON)) {
  //   useFamiliar($familiar`melodramedary`);
  //   equip($item`dromedary drinking helmet`);
  // } else if (
  //   availableAmount($item`rope`) < 1 &&
  //   availableAmount($item`burning newspaper`) + availableAmount($item`burning paper crane`) < 1
  // ) {
  //   useFamiliar($familiar`Garbage Fire`);
  // } else if (
  //   availableAmount($item`short stack of pancakes`) === 0 &&
  //   haveEffect($effect`shortly stacked`) === 0 &&
  //   !testDone(TEST_FAMILIAR)
  // ) {
  //   useFamiliar($familiar`shorter-order cook`);
  // } else {
  //   useFamiliar($familiar`machine elf`);
  // }
}

function tryUse(quantity, it) {
  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)(it) > 0) {
    return (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.use)(quantity, it);
  } else {
    return false;
  }
}

function useAll(it) {
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.use)((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)(it), it);
}

function tryEquip(it) {
  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)(it) > 0) {
    return (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)(it);
  } else {
    return false;
  }
}

function assertMeat(meat) {
  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myMeat)() < meat) (0,libram_dist_console__WEBPACK_IMPORTED_MODULE_5__.error)("Not enough meat.");
}

function autosellAll(it) {
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.autosell)((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.itemAmount)(it), it);
}

function wishEffect(ef) {
  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.haveEffect)(ef) === 0) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("genie effect " + ef.name);
  } else {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.print)("Already have effect " + ef.name + ".");
  }
} // Checks that you don't already have the tonic or effect and if your syringe has the right phylum and if so, makes the appropriate tonic.


function geneTonic(ph) {
  if (ph === "dude" || ph === "weird") {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.print)("This function doesn't work for dudes or weirds.", "red");
  } else if (ph === "construct") {
    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.haveEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["Human-Machine Hybrid"])))) === 0 && (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["Gene Tonic: Construct"])))) === 0 && (0,libram__WEBPACK_IMPORTED_MODULE_6__.get)("dnaSyringe") === "construct") {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("camp dnapotion 1");

      if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["Gene Tonic: ", ""])), ph)) === 0) {
        (0,libram_dist_console__WEBPACK_IMPORTED_MODULE_5__.error)("something went wrong getting your gene tonic");
      } else {
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.print)("successfully created gene tonic: construct");
      }
    } else {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.print)("You already have construct DNA");
    }
  } else {
    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.haveEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral(["Human-", " Hybrid"])), ph)) === 0 && (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject12 || (_templateObject12 = _taggedTemplateLiteral(["Gene Tonic: ", ""])), ph)) === 0 && (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.getProperty)("dnaSyringe") === ph) {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("camp dnapotion 1");

      if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject13 || (_templateObject13 = _taggedTemplateLiteral(["Gene Tonic: ", ""])), ph)) === 0) {
        (0,libram_dist_console__WEBPACK_IMPORTED_MODULE_5__.error)("something went wrong getting your gene tonic");
      } else {
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.print)("successfully created gene tonic: " + ph);
      }
    } else {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.print)("You already have " + ph + " DNA");
    }
  }
}
/*
// rewrite this to be better
function geneTonic1(ph: string) {
  switch (toString(ph)) {
    case "elf":
      if ((haveEffect($effect`1601`) === 0) && (availableAmount($item`7399`) === 0) && (getProperty("dnaSyringe") === "elf")) {
        cliExecute("camp dnapotion 1");
        if (availableAmount($item`7399`) === 0) {
          error("something went wrong getting your gene tonic");
        } else {
          print("successfully created gene tonic: elf");
        }
      } else {
        print("You already have elf DNA");
      }
    case "construct":
      if ((haveEffect($effect`1588`) === 0) && (availableAmount($item`7386`) === 0) && (getProperty("dnaSyringe") === "construct")) {
        cliExecute("camp dnapotion 1");
        if (availableAmount($item`7386`) === 0) {
          error("something went wrong getting your gene tonic");
        } else {
          print("successfully created gene tonic: construct");
        }
      } else {
        print("You already have construct DNA");
      }
    case "pirate":
      if ((haveEffect($effect`1598`) === 0) && (availableAmount($item`7396`) === 0) && (getProperty("dnaSyringe") === "pirate")) {
        cliExecute("camp dnapotion 1");
        if (availableAmount($item`7396`) === 0) {
          error("something went wrong getting your gene tonic");
        } else {
          print("successfully created gene tonic: pirate");
        }
      } else {
        print("You already have pirate DNA");
      }
  }
}
*/


function shrug(ef) {
  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.haveEffect)(ef) > 0) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("shrug " + ef.name);
  }
}

function summonBrickoOyster(maxSummons) {
  if ((0,_lib__WEBPACK_IMPORTED_MODULE_0__.getPropertyInt)("_brickoFights") >= 3) return false;
  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject14 || (_templateObject14 = _taggedTemplateLiteral(["BRICKO oyster"])))) > 0) return true;

  while ((0,_lib__WEBPACK_IMPORTED_MODULE_0__.getPropertyInt)("libramSummons") < maxSummons && ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject15 || (_templateObject15 = _taggedTemplateLiteral(["BRICKO eye brick"])))) < 1 || (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject16 || (_templateObject16 = _taggedTemplateLiteral(["BRICKO brick"])))) < 8)) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.useSkill)(1, (0,libram__WEBPACK_IMPORTED_MODULE_4__.$skill)(_templateObject17 || (_templateObject17 = _taggedTemplateLiteral(["Summon BRICKOs"]))));
  }

  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.use)(8, (0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject18 || (_templateObject18 = _taggedTemplateLiteral(["BRICKO brick"]))));
}

function fightSausageIfGuaranteed() {
  if ((0,_lib__WEBPACK_IMPORTED_MODULE_0__.sausageFightGuaranteed)()) {
    //equip($item`Iunion Crown`);
    //equip($slot`shirt`, $item`none`);
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject19 || (_templateObject19 = _taggedTemplateLiteral(["Fourth of May Cosplay Saber"]))));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject20 || (_templateObject20 = _taggedTemplateLiteral(["Kramco Sausage-o-Matic&trade;"]))));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject21 || (_templateObject21 = _taggedTemplateLiteral(["LOV Epaulettes"])))); //equip($item`old sweatpants`);
    //equip($slot`acc1`, $item`Eight Days a Week Pill Keeper`);
    //equip($slot`acc2`, $item`Powerful Glove`);
    //equip($slot`acc3`, $item`Lil\' Doctor&trade; Bag`);
    //useDefaultFamiliar();

    (0,libram__WEBPACK_IMPORTED_MODULE_3__.adventureMacroAuto)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$location)(_templateObject22 || (_templateObject22 = _taggedTemplateLiteral(["The Neverending Party"]))), (0,_lib__WEBPACK_IMPORTED_MODULE_0__.kill)());
  }
}

function testDone(testNum) {
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.print)("Checking test " + testNum + "...");
  var text = (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.visitUrl)("council.php");
  return !(0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.containsText)(text, "<input type=hidden name=option value=" + testNum + ">");
}

function doTest(testNum) {
  if (!testDone(testNum)) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.visitUrl)("choice.php?whichchoice=1089&option=" + testNum);

    if (!testDone(testNum)) {
      (0,libram_dist_console__WEBPACK_IMPORTED_MODULE_5__.error)("Failed to do test " + testNum + ". Maybe we are out of turns.");
    }
  } else {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.print)("Test " + testNum + " already completed.");
  }
}

function withMacro(macro, action) {
  macro.save();

  try {
    return action();
  } finally {
    libram__WEBPACK_IMPORTED_MODULE_3__.Macro.clearSaved();
  }
}

function testCoilWire() {
  if (!testDone(TEST_COIL_WIRE)) {
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.setClan)("Bonus Adventures from Hell");

    if ((0,_lib__WEBPACK_IMPORTED_MODULE_0__.getPropertyInt)("_clanFortuneConsultUses") < 3) {
      while ((0,_lib__WEBPACK_IMPORTED_MODULE_0__.getPropertyInt)("_clanFortuneConsultUses") < 3) {
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("fortune cheesefax garbage garbage thick");
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("wait 5");
      }
    }

    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureMpTonic)(1);

    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myLevel)() === 1 && (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.mySpleenUse)() === 0) {
      while ((0,_lib__WEBPACK_IMPORTED_MODULE_0__.getPropertyInt)("_universeCalculated") < (0,_lib__WEBPACK_IMPORTED_MODULE_0__.getPropertyInt)("skillLevel144")) {
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("numberology 69");
      }
    } // get cowboy boots


    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.visitUrl)("place.php?whichplace=town_right&action=townright_ltt"); // Chateau piggy bank

    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.visitUrl)("place.php?whichplace=chateau&action=chateau_desk1"); // Sell pork gems + tent

    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.visitUrl)("tutorial.php?action=toot");
    tryUse(1, (0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject23 || (_templateObject23 = _taggedTemplateLiteral(["letter from King Ralph XI"]))));
    tryUse(1, (0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject24 || (_templateObject24 = _taggedTemplateLiteral(["pork elf goodies sack"]))));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.autosell)((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject25 || (_templateObject25 = _taggedTemplateLiteral(["baconstone"])))) - 1, (0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject26 || (_templateObject26 = _taggedTemplateLiteral(["baconstone"]))));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.autosell)((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject27 || (_templateObject27 = _taggedTemplateLiteral(["porquoise"])))) - 1, (0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject28 || (_templateObject28 = _taggedTemplateLiteral(["porquoise"]))));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.autosell)((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject29 || (_templateObject29 = _taggedTemplateLiteral(["hamethyst"])))) - 1, (0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject30 || (_templateObject30 = _taggedTemplateLiteral(["hamethyst"])))); // Buy toy accordion

    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureItem)(1, (0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject31 || (_templateObject31 = _taggedTemplateLiteral(["toy accordion"])))); // make pantogram pants for hilarity and spell damage

    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject32 || (_templateObject32 = _taggedTemplateLiteral(["pantogram pants"])))) === 0) {
      // retrieveItem(1, $item`ten-leaf clover`);
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("pantogram hot|-combat|silent");
    } //TODO: uncomment when you acquire skill
    //ensureSong($effect`The Magical Mojomuscular Melody`);


    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.haveEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject33 || (_templateObject33 = _taggedTemplateLiteral(["Inscrutable Gaze"])))) === 0) {
      (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureMpTonic)(10);
      (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject34 || (_templateObject34 = _taggedTemplateLiteral(["Inscrutable Gaze"]))));
    }

    if ((0,_lib__WEBPACK_IMPORTED_MODULE_0__.getPropertyInt)("_deckCardsDrawn") === 0) {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("cheat 1952");
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.autosell)(1, (0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject35 || (_templateObject35 = _taggedTemplateLiteral(["1952 Mickey Mantle card"]))));
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.buy)(1, (0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject36 || (_templateObject36 = _taggedTemplateLiteral(["Desert Bus pass"]))));
    } // Campsite
    // if (haveEffect($effect`That\'s Just Cloud-Talk, Man`) === 0) {
    //   visitUrl("place.php?whichplace=campaway&action=campaway_sky");
    // }
    // Upgrade saber for fam wt


    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.visitUrl)("main.php?action=may4");
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.runChoice)(4); // NOTE: No turn 0 sausage fight!
    // should probably fight, digitize, wink a bishop or something here
    //TODO: vote?
    // Vote.
    // visitUrl("place.php?whichplace=town_right&action=townright_vote");
    // visitUrl("choice.php?option=1&whichchoice=1331&g=2&local%5B%5D=2&local%5B%5D=3");
    // // Make sure initiative-tracking works.
    // visitUrl("place.php?whichplace=town_right&action=townright_vote");
    //TODO: i don't have borrowed time so need to eat/drink here to get to 60 adventures

    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myFullness)() == 0) {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.buy)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject37 || (_templateObject37 = _taggedTemplateLiteral(["pickled egg"]))), 2);
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.eat)(2, (0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject38 || (_templateObject38 = _taggedTemplateLiteral(["This Charming Flan"]))));
    } // QUEST - Coil Wire


    doTest(TEST_COIL_WIRE);
  }

  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myTurncount)() < 60) (0,libram_dist_console__WEBPACK_IMPORTED_MODULE_5__.error)("Something went wrong coiling wire.");
}

function testHP() {
  if (!testDone(TEST_HP)) {
    var hpTurns = function hpTurns() {
      return 60 - (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.floor)(((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myMaxhp)() - (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myBuffedstat)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$stat)(_templateObject162 || (_templateObject162 = _taggedTemplateLiteral(["muscle"])))) - 3) / 30);
    };

    // just in case?
    // if (haveEffect($effect`That\'s Just Cloud-Talk, Man`) === 0) {
    //   visitUrl("place.php?whichplace=campaway&action=campaway_sky");
    // }
    // Grab fish hatchett here, for fam wt, -combat, and muscle tests
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.retrieveItem)(1, (0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject39 || (_templateObject39 = _taggedTemplateLiteral(["fish hatchet"])))); // pulls wrench from deck

    if ((0,_lib__WEBPACK_IMPORTED_MODULE_0__.getPropertyInt)("_deckCardsDrawn") === 5) {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("cheat wrench");
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


    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("terminal educate extract");
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("terminal educate digitize");
    var lovePotion = (0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject40 || (_templateObject40 = _taggedTemplateLiteral(["Love Potion #0"])));
    var loveEffect = (0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject41 || (_templateObject41 = _taggedTemplateLiteral(["Tainted Love Potion"])));

    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.haveEffect)(loveEffect) === 0) {
      if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)(lovePotion) === 0) {
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.useSkill)(1, (0,libram__WEBPACK_IMPORTED_MODULE_4__.$skill)(_templateObject42 || (_templateObject42 = _taggedTemplateLiteral(["Love Mixology"]))));
      }

      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.visitUrl)("desc_effect.php?whicheffect=" + loveEffect.descid);

      if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.numericModifier)(loveEffect, "mysticality") > 10 && (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.numericModifier)(loveEffect, "muscle") > -30 && (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.numericModifier)(loveEffect, "moxie") > -30 && (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.numericModifier)(loveEffect, "maximum hp percent") > -0.001) {
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.use)(1, lovePotion);
      }
    } // Boxing Daycare


    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject43 || (_templateObject43 = _taggedTemplateLiteral(["Uncucumbered"])))); // Cast inscrutable gaze

    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject44 || (_templateObject44 = _taggedTemplateLiteral(["Inscrutable Gaze"])))); // Shower lukewarm

    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject45 || (_templateObject45 = _taggedTemplateLiteral(["Thaumodynamic"])))); // Beach Comb

    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject46 || (_templateObject46 = _taggedTemplateLiteral(["You Learned Something Maybe!"])))); //TODO: should i use the rest of the clicks for random buffs?
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
    // Depends on Ez's Bastille script.

    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("bastille myst brutalist"); // if (get_property('_horsery') != 'crazy horse') cli_execute('horsery crazy');
    // Tune moon sign to Blender. Have to do this now to get chewing gum.
    // if (!getPropertyBoolean("moonTuned")) {
    //   if (getPropertyInt("_campAwaySmileBuffs") === 0) {
    //     visitUrl("place.php?whichplace=campaway&action=campaway_sky");
    //   }
    //   // Unequip spoon.
    //   equip($slot`acc1`, $item`Eight Days a Week Pill Keeper`);
    //   equip($slot`acc2`, $item`Powerful Glove`);
    //   equip($slot`acc3`, $item`Lil\' Doctor&trade; Bag`);
    //   // Actually tune the moon.
    //   visitUrl("inv_use.php?whichitem=10254&doit=96&whichsign=8");
    // }

    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("retrocape mysticality thrill"); // cross streams for a stat boost

    if (!(0,_lib__WEBPACK_IMPORTED_MODULE_0__.getPropertyBoolean)("_streamsCrossed")) {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("crossstreams");
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
    //   Macro.trySkill($skill`otoscope`)
    //     .trySkill($skill`curse of weaksauce`)
    //     .trySkillRepeat($skill`saucegeyser`)
    //     .setAutoAttack();
    //   use(1, $item`BRICKO oyster`);
    //   autosell(1, $item`BRICKO pearl`);
    //   setAutoAttack(0);
    // }
    // Prep Sweet Synthesis.
    //TODO: find other candy?
    // if (myGardenType() === "peppermint") {
    //   cliExecute("garden pick");
    // } else {
    //   print(
    //     "WARNING: This script is built for peppermint garden. Switch gardens or find other candy."
    //   );
    // }
    //TODO visit garden


    if ((0,_lib__WEBPACK_IMPORTED_MODULE_0__.getPropertyInt)("_candySummons") === 0) {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.useSkill)(1, (0,libram__WEBPACK_IMPORTED_MODULE_4__.$skill)(_templateObject47 || (_templateObject47 = _taggedTemplateLiteral(["Summon Crimbo Candy"]))));
    }

    if ((0,libram__WEBPACK_IMPORTED_MODULE_6__.get)("_chubbyAndPlumpUsed") === false) {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.useSkill)(1, (0,libram__WEBPACK_IMPORTED_MODULE_4__.$skill)(_templateObject48 || (_templateObject48 = _taggedTemplateLiteral(["Chubby and Plump"]))));
    } // grab candies from gingerbread city, since we lack the other options to get them


    if (!(0,libram__WEBPACK_IMPORTED_MODULE_6__.get)("_gingerbreadClockAdvanced")) {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.visitUrl)("adventure.php?snarfblat=477");
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.runChoice)(1);
    }

    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$slot)(_templateObject49 || (_templateObject49 = _taggedTemplateLiteral(["acc2"]))), (0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject50 || (_templateObject50 = _taggedTemplateLiteral(["kremlin's greatest briefcase"]))));
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.setChoice)(1204, 1);

    while ((0,_lib__WEBPACK_IMPORTED_MODULE_0__.getPropertyInt)("_gingerbreadCityTurns") < 5) {
      (0,libram__WEBPACK_IMPORTED_MODULE_3__.adventureMacro)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$location)(_templateObject51 || (_templateObject51 = _taggedTemplateLiteral(["Gingerbread Train Station"]))), libram__WEBPACK_IMPORTED_MODULE_3__.Macro.trySkill((0,libram__WEBPACK_IMPORTED_MODULE_4__.$skill)(_templateObject52 || (_templateObject52 = _taggedTemplateLiteral(["KGB tranquilizer dart"])))).trySkill((0,libram__WEBPACK_IMPORTED_MODULE_4__.$skill)(_templateObject53 || (_templateObject53 = _taggedTemplateLiteral(["snokebomb"])))).abort());
    } // This is the sequence of synthesis effects; synthesis_plan will, if possible, come up with a plan for allocating candy to each of these.


    synthesisPlanner.synthesize((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject54 || (_templateObject54 = _taggedTemplateLiteral(["Synthesis: Learning"]))));
    synthesisPlanner.synthesize((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject55 || (_templateObject55 = _taggedTemplateLiteral(["Synthesis: Smart"]))));

    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.round)((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.numericModifier)("mysticality experience percent")) < 80) {
      (0,libram_dist_console__WEBPACK_IMPORTED_MODULE_5__.error)("Insufficient +stat%.");
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.abort)();
    } // Use ten-percent bonus


    tryUse(1, (0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject56 || (_templateObject56 = _taggedTemplateLiteral(["a ten-percent bonus"])))); // Scavenge for gym equipment

    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.toInt)((0,libram__WEBPACK_IMPORTED_MODULE_6__.get)("_daycareGymScavenges")) < 1) {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.visitUrl)("/place.php?whichplace=town_wrong&action=townwrong_boxingdaycare");
      var pg = (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.runChoice)(3);
      if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.containsText)(pg, "[free]")) (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.runChoice)(2);
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.runChoice)(5);
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.runChoice)(4);
    } // ensure_effect($effect[hulkien]);


    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject57 || (_templateObject57 = _taggedTemplateLiteral(["Favored by Lyle"]))));
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject58 || (_templateObject58 = _taggedTemplateLiteral(["Starry-Eyed"])))); //ensureEffect($effect`Triple-Sized`);

    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject59 || (_templateObject59 = _taggedTemplateLiteral(["Feeling Excited"]))));
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject60 || (_templateObject60 = _taggedTemplateLiteral(["We're All Made of Starfish"])))); // Beach Comb - should bridge all the way to spell dmg.
    //TODO: uncomment when i acquire skill
    //ensureSong($effect`The Magical Mojomuscular Melody`);

    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureNpcEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject61 || (_templateObject61 = _taggedTemplateLiteral(["Glittering Eyelashes"]))), 5, (0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject62 || (_templateObject62 = _taggedTemplateLiteral(["glittery mascara"]))));
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject63 || (_templateObject63 = _taggedTemplateLiteral(["Merry Smithsness"]))));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.useSkill)(1, (0,libram__WEBPACK_IMPORTED_MODULE_4__.$skill)(_templateObject64 || (_templateObject64 = _taggedTemplateLiteral(["Incredible Self-Esteem"])))); //might be something useful

    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.visitUrl)("desc_effect.php?whicheffect=af64d06351a3097af52def8ec6a83d9b"); //discover g9 effect

    if ((0,_lib__WEBPACK_IMPORTED_MODULE_0__.getPropertyInt)("_g9Effect") >= 200) {
      wishEffect((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject65 || (_templateObject65 = _taggedTemplateLiteral(["Experimental Effect G-9"]))));
    } else {
      wishEffect((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject66 || (_templateObject66 = _taggedTemplateLiteral(["New and Improved"]))));
    } // if (myInebriety() == 0 && getPropertyInt("_g9Effect") <250) {
    //   ensureOde(2);
    //   cliExecute("drink 1 Bee's Knees");
    // }
    //TODO: get other stat buffs?
    // Plan is for Beach Comb + PK buffs to fall all the way through to item -> hot res -> fam weight.
    //ensureEffect($effect`Fidoxene`);


    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject67 || (_templateObject67 = _taggedTemplateLiteral(["Do I Know You From Somewhere?"])))); //TODO: uncomment if i acquire snojo
    // 10 snojo fights to while +stat is on, also getting ice rice
    // if (get("_snojoFreeFights") < 10) {
    //   useDefaultFamiliar();
    //   setProperty("choiceAdventure1310", "3"); // myst for ice rice, because it sells for more
    //   visitUrl("place.php?whichplace=snojo&action=snojo_controller");
    //   if (availableAmount($item`gene tonic: construct`) === 0 && get("dnaSyringe") !== "construct") {
    //     adventureMacroAuto(
    //       $location`The X-32-F Combat Training Snowman`,
    //       Macro.item($item`DNA extraction syringe`).trySkillRepeat($skill`saucestorm`)
    //     );
    //     geneTonic("construct");
    //   }
    //   while (get("_snojoFreeFights") < 10) {
    //     useDefaultFamiliar();
    //     adventureMacroAuto($location`The X-32-F Combat Training Snowman`, kill());
    //   }
    // }
    // Don't use Kramco here.

    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$slot)(_templateObject68 || (_templateObject68 = _taggedTemplateLiteral(["off-hand"]))), (0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject69 || (_templateObject69 = _taggedTemplateLiteral(["familiar scrapbook"])))); //TODO: uncomment if i give up on 100% runs and i have ghost
    // if (haveEffect($effect`holiday yoked`) === 0 && getPropertyInt("_kgbTranquilizerDartUses") < 3) {
    //   equip($slot`acc1`, $item`kremlin\'s greatest briefcase`);
    //   useFamiliar($familiar`ghost of crimbo carols`);
    //   adventureMacroAuto($location`noob cave`, Macro.trySkill($skill`KGB tranquilizer dart`));
    //   setAutoAttack(0);
    // }
    // Get buff things

    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureSewerItem)(1, (0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject70 || (_templateObject70 = _taggedTemplateLiteral(["turtle totem"]))));
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureSewerItem)(1, (0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject71 || (_templateObject71 = _taggedTemplateLiteral(["saucepan"])))); //TODO: do i need to make a mood here?

    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("mood hccs"); // const mood = new Mood();
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

    while ((0,_lib__WEBPACK_IMPORTED_MODULE_0__.getPropertyInt)("timesRested") < (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.totalFreeRests)()) {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.visitUrl)("place.php?whichplace=chateau&action=chateau_restbox");
    } // while (summonBrickoOyster(11) && availableAmount($item`BRICKO oyster`) > 0) {
    //   useDefaultFamiliar();
    //   if (myHp() < 0.8 * myMaxhp()) {
    //     visitUrl("clan_viplounge.php?where=hottub");
    //   }
    //   ensureMpTonic(32);
    //   Macro.trySkill($skill`otoscope`)
    //     .trySkill($skill`curse of weaksauce`)
    //     .trySkillRepeat($skill`saucegeyser`)
    //     .setAutoAttack();
    //   use(1, $item`BRICKO oyster`);
    //   autosell(1, $item`BRICKO pearl`);
    //   setAutoAttack(0);
    // }


    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject72 || (_templateObject72 = _taggedTemplateLiteral(["Song of Bravado"]))));
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject73 || (_templateObject73 = _taggedTemplateLiteral(["Big"]))));
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureSong)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject74 || (_templateObject74 = _taggedTemplateLiteral(["Stevedave's Shanty of Superiority"], ["Stevedave\\'s Shanty of Superiority"]))));

    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.getProperty)("boomBoxSong") !== "Total Eclipse of Your Meat") {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("boombox meat");
    } // Get buff things


    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureSewerItem)(1, (0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject75 || (_templateObject75 = _taggedTemplateLiteral(["turtle totem"]))));
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureSewerItem)(1, (0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject76 || (_templateObject76 = _taggedTemplateLiteral(["saucepan"])))); // Don't use Kramco here.

    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$slot)(_templateObject77 || (_templateObject77 = _taggedTemplateLiteral(["off-hand"]))), (0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject78 || (_templateObject78 = _taggedTemplateLiteral(["familiar scrapbook"])))); // Fruits in skeleton store (Saber YR)

    var missingOintment = (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject79 || (_templateObject79 = _taggedTemplateLiteral(["ointment of the occult"])))) === 0 && (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject80 || (_templateObject80 = _taggedTemplateLiteral(["grapefruit"])))) === 0 && (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.haveEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject81 || (_templateObject81 = _taggedTemplateLiteral(["Mystically Oiled"])))) === 0;
    var missingOil = (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject82 || (_templateObject82 = _taggedTemplateLiteral(["oil of expertise"])))) === 0 && (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject83 || (_templateObject83 = _taggedTemplateLiteral(["cherry"])))) === 0 && (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.haveEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject84 || (_templateObject84 = _taggedTemplateLiteral(["Expert Oiliness"])))) === 0;
    var missingPhilter = (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject85 || (_templateObject85 = _taggedTemplateLiteral(["philter of phorce"])))) === 0 && (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject86 || (_templateObject86 = _taggedTemplateLiteral(["lemon"])))) === 0 && (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.haveEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject87 || (_templateObject87 = _taggedTemplateLiteral(["Phorcefullness"])))) === 0;

    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myClass)() !== (0,libram__WEBPACK_IMPORTED_MODULE_4__.$class)(_templateObject88 || (_templateObject88 = _taggedTemplateLiteral(["Pastamancer"]))) && (missingOil || missingOintment || missingPhilter)) {
      //cliExecute("mood apathetic");
      if ((0,libram__WEBPACK_IMPORTED_MODULE_6__.get)("questM23Meatsmith") === "unstarted") {
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.visitUrl)("shop.php?whichshop=meatsmith&action=talk");
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.runChoice)(1);
      } // if (!canAdv($location`The Skeleton Store`, false)) error("Cannot open skeleton store!");


      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.adv1)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$location)(_templateObject89 || (_templateObject89 = _taggedTemplateLiteral(["The Skeleton Store"]))), -1, "");

      if (!(0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.containsText)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$location)(_templateObject90 || (_templateObject90 = _taggedTemplateLiteral(["The Skeleton Store"]))).noncombatQueue, "Skeletons In Store")) {
        throw "Something went wrong at skeleton store.";
      }

      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setProperty)("choiceAdventure1387", "3");
      (0,_lib__WEBPACK_IMPORTED_MODULE_0__.mapMonster)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$location)(_templateObject91 || (_templateObject91 = _taggedTemplateLiteral(["The Skeleton Store"]))), (0,libram__WEBPACK_IMPORTED_MODULE_4__.$monster)(_templateObject92 || (_templateObject92 = _taggedTemplateLiteral(["novelty tropical skeleton"]))));
      withMacro(libram__WEBPACK_IMPORTED_MODULE_3__.Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_4__.$skill)(_templateObject93 || (_templateObject93 = _taggedTemplateLiteral(["use the force"])))), kolmafia__WEBPACK_IMPORTED_MODULE_1__.runCombat);
      if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.handlingChoice)()) (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.runChoice)(3); // setProperty("mappingMonsters", "false");
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
    // if (get("_dnaHybrid") === false && get("dnaSyringe") !== "fish") {
    //   // tryEquip($item`powerful glove`);
    //   // useFamiliar($familiar`frumious bandersnatch`);
    //   print($location`the bubblin\' caldera`.noncombatQueue);
    //   adv1($location`The Bubblin\' Caldera`, -1, "");
    //   adv1($location`The Bubblin\' Caldera`, -1, "");
    //   print($location`the bubblin\' caldera`.noncombatQueue);
    //   if (
    //     containsText(
    //       $location`the bubblin\' caldera`.noncombatQueue,
    //       "Caldera Air; Aaaaah!  Aaaaaaaah!"
    //     )
    //   ) {
    //     adventureMacroAuto(
    //       $location`The Bubblin\' Caldera`,
    //       Macro.while_(
    //         "!monstername lava lamprey",
    //         Macro.trySkill($skill`extract`).trySkill($skill`macrometeorite`)
    //       ).if_(
    //         "monstername lava lamprey",
    //         Macro.trySkill($skill`extract`)
    //           .item($item`DNA Extraction Syringe`)
    //           .skill($skill`feel hatred`)
    //       )
    //     );
    //     useDefaultFamiliar();
    //     cliExecute("hottub"); // removing lava effect
    //     setAutoAttack(0);
    //   } else throw "Something went wrong getting fish DNA.";
    // }
    // if (get("_dnaHybrid") === false && get("dnaSyringe") === "fish") {
    //   cliExecute("camp dnainject");
    // }


    if (!(0,libram__WEBPACK_IMPORTED_MODULE_6__.get)("hasRange")) {
      (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureItem)(1, (0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject94 || (_templateObject94 = _taggedTemplateLiteral(["Dramatic&trade; range"]))));
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.use)(1, (0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject95 || (_templateObject95 = _taggedTemplateLiteral(["Dramatic&trade; range"]))));
    }

    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.useSkill)(1, (0,libram__WEBPACK_IMPORTED_MODULE_4__.$skill)(_templateObject96 || (_templateObject96 = _taggedTemplateLiteral(["Advanced Saucecrafting"]))));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.useSkill)(1, (0,libram__WEBPACK_IMPORTED_MODULE_4__.$skill)(_templateObject97 || (_templateObject97 = _taggedTemplateLiteral(["Prevent Scurvy and Sobriety"]))));
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensurePotionEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject98 || (_templateObject98 = _taggedTemplateLiteral(["Mystically Oiled"]))), (0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject99 || (_templateObject99 = _taggedTemplateLiteral(["ointment of the occult"])))); // Maximize familiar weight

    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("fold makeshift garbage shirt");
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject100 || (_templateObject100 = _taggedTemplateLiteral(["makeshift garbage shirt"]))));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$slot)(_templateObject101 || (_templateObject101 = _taggedTemplateLiteral(["acc2"]))), (0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject102 || (_templateObject102 = _taggedTemplateLiteral(["Brutal brogues"])))); // LOV tunnel for elixirs, epaulettes, and heart surgery
    // TODO: still need to make this combat better

    if (!(0,_lib__WEBPACK_IMPORTED_MODULE_0__.getPropertyBoolean)("_loveTunnelUsed")) {
      //useDefaultFamiliar();
      (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject103 || (_templateObject103 = _taggedTemplateLiteral(["carol of the bulls"]))));
      (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject104 || (_templateObject104 = _taggedTemplateLiteral(["carol of the hells"]))));
      (0,_lib__WEBPACK_IMPORTED_MODULE_0__.setChoice)(1222, 1); // Entrance

      (0,_lib__WEBPACK_IMPORTED_MODULE_0__.setChoice)(1223, 1); // Fight LOV Enforcer

      (0,_lib__WEBPACK_IMPORTED_MODULE_0__.setChoice)(1224, 2); // LOV Epaulettes

      (0,_lib__WEBPACK_IMPORTED_MODULE_0__.setChoice)(1225, 1); // Fight LOV Engineer

      (0,_lib__WEBPACK_IMPORTED_MODULE_0__.setChoice)(1226, 2); // Open Heart Surgery

      (0,_lib__WEBPACK_IMPORTED_MODULE_0__.setChoice)(1227, 1); // Fight LOV Equivocator

      (0,_lib__WEBPACK_IMPORTED_MODULE_0__.setChoice)(1228, 3); // Take chocolate

      libram__WEBPACK_IMPORTED_MODULE_3__.Macro.if_('monstername "LOV enforcer"', libram__WEBPACK_IMPORTED_MODULE_3__.Macro.attack().repeat()).if_('monstername "lov engineer"', libram__WEBPACK_IMPORTED_MODULE_3__.Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_4__.$skill)(_templateObject105 || (_templateObject105 = _taggedTemplateLiteral(["saucegeyser"])))).repeat()).step(justKillTheThing).setAutoAttack(); // setAutoAttack("HCCS_LOV_tunnel");

      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.adv1)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$location)(_templateObject106 || (_templateObject106 = _taggedTemplateLiteral(["The Tunnel of L.O.V.E."]))), -1, "");
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setAutoAttack)(0);
    }

    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject107 || (_templateObject107 = _taggedTemplateLiteral(["LOV epaulettes"])))); // spend 5 turns in DMT, skipping joy and cert, just get stats
    // while (get("_machineTunnelsAdv") < 5) {
    //   useFamiliar($familiar`machine elf`);
    //   adventureMacroAuto($location`The Deep Machine Tunnels`, kill());
    //   /* if ((availableAmount($item`abstraction: thought`) === 0) && (availableAmount($item`abstraction: certainty`) === 0) && (getProperty("_machineTunnelsAdv") < 5)) {
    //     setAutoAttack("melfgetthought");
    //     adv1($location`the deep machine tunnels`, -1, "");
    //     setAutoAttack(0);
    //   } else if ((availableAmount($item`abstraction: thought`) >= 1) && (availableAmount($item`abstraction: certainty`) === 0) && (getProperty("_machineTunnelsAdv") < 5)) {
    //     setAutoAttack("melfgetcertainty");
    //     adv1($location`the deep machine tunnels`, -1, "");
    //     setAutoAttack(0);
    //   } else {
    //     adventureKill($location`the deep machine tunnels`);
    //   } */
    // }
    //useDefaultFamiliar();
    //witchess fights

    if ((0,libram__WEBPACK_IMPORTED_MODULE_6__.get)("_witchessFights") < 5) {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject108 || (_templateObject108 = _taggedTemplateLiteral(["fourth of may cosplay saber"])))); //useDefaultFamiliar();

      while ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.toInt)((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.getProperty)("_witchessFights")) < 2) {
        libram__WEBPACK_IMPORTED_MODULE_3__.Macro.step(justKillTheThing).setAutoAttack();
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.visitUrl)("campground.php?action=witchess");
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.runChoice)(1);
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.visitUrl)("choice.php?option=1&pwd=" + (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myHash)() + "&whichchoice=1182&piece=1942", false);
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.runCombat)();
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setAutoAttack)(0);
      }

      while ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.toInt)((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.getProperty)("_witchessFights")) === 2) {
        //useDefaultFamiliar();
        libram__WEBPACK_IMPORTED_MODULE_3__.Macro.attack().repeat().setAutoAttack();
        (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject109 || (_templateObject109 = _taggedTemplateLiteral(["carol of the bulls"]))));
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.visitUrl)("campground.php?action=witchess");
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.runChoice)(1);
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.visitUrl)("choice.php?option=1&pwd=" + (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myHash)() + "&whichchoice=1182&piece=1940", false);
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.runCombat)();
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setAutoAttack)(0);
      }

      while ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.toInt)((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.getProperty)("_witchessFights")) === 3) {
        //useDefaultFamiliar();
        libram__WEBPACK_IMPORTED_MODULE_3__.Macro.attack().repeat().setAutoAttack();
        (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject110 || (_templateObject110 = _taggedTemplateLiteral(["carol of the bulls"]))));
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.useSkill)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$skill)(_templateObject111 || (_templateObject111 = _taggedTemplateLiteral(["Cannelloni Cocoon"]))));
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.visitUrl)("campground.php?action=witchess");
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.runChoice)(1);
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.visitUrl)("choice.php?option=1&pwd=" + (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myHash)() + "&whichchoice=1182&piece=1941", false);
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.runCombat)();
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setAutoAttack)(0);
      }
    } // get witchess buff, this should fall all the way through to fam wt


    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.haveEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject112 || (_templateObject112 = _taggedTemplateLiteral(["puzzle champ"])))) === 0) {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("witchess");
    } //TODO: uncomment when done with 100% runs
    // Professor 9x free sausage fight @ NEP
    // if (getPropertyInt("_sausageFights") === 0) {
    //   useFamiliar($familiar`Pocket Professor`);
    //   tryEquip($item`Pocket Professor memory chip`);
    //   equip($item`Kramco Sausage-o-Matic&trade;`);
    //   equip($slot`acc2`, $item`Brutal brogues`);
    //   equip($slot`acc3`, $item`Beach Comb`);
    //   while (getPropertyInt("_sausageFights") === 0) {
    //     if (myHp() < 0.8 * myMaxhp()) {
    //       visitUrl("clan_viplounge.php?where=hottub");
    //     }
    //     // Just here to party.
    //     setChoice(1322, 2);
    //     adventureMacroAuto(
    //       $location`The Neverending Party`,
    //       Macro.if_('!monstername "sausage goblin"', new Macro().step("abort"))
    //         .trySkill(Skill.get("Lecture on Relativity"))
    //         .step(justKillTheThing)
    //     );
    //   }
    // } else {
    //   print("YOU FUCKED UP THE KRAMCO CHAIN AGAIN, YOU DUMBASS! Go kill crayon elves instead.");
    // }
    //useDefaultFamiliar();


    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject113 || (_templateObject113 = _taggedTemplateLiteral(["Kramco Sausage-o-Matic&trade;"]))));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$slot)(_templateObject114 || (_templateObject114 = _taggedTemplateLiteral(["acc3"]))), (0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject115 || (_templateObject115 = _taggedTemplateLiteral(["backup camera"]))));
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.setChoice)(1322, 2); // reject quest

    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.setChoice)(1325, 2); // +20% mys exp buff
    //equip($slot`shirt`, $item`none`);

    while ((0,libram__WEBPACK_IMPORTED_MODULE_6__.get)("_backUpUses") < 11) {
      if (!(0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.haveEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject116 || (_templateObject116 = _taggedTemplateLiteral(["Tomes of Opportunity"]))))) {
        (0,_lib__WEBPACK_IMPORTED_MODULE_0__.setChoice)(1324, 1); //go to +mys exp buff nc
      } else {
        (0,_lib__WEBPACK_IMPORTED_MODULE_0__.setChoice)(1324, 5); //fight
      }

      if ((0,_lib__WEBPACK_IMPORTED_MODULE_0__.getPropertyInt)("_sausageFights") >= 3) {
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject117 || (_templateObject117 = _taggedTemplateLiteral(["familiar scrapbook"]))));
      } //useDefaultFamiliar();


      (0,libram__WEBPACK_IMPORTED_MODULE_3__.adventureMacroAuto)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$location)(_templateObject118 || (_templateObject118 = _taggedTemplateLiteral(["The Neverending Party"]))), libram__WEBPACK_IMPORTED_MODULE_3__.Macro.if_("!monstername Sausage Goblin", libram__WEBPACK_IMPORTED_MODULE_3__.Macro.skill("Back-Up to Your Last Enemy")).step(justKillTheThing));
    }

    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setAutoAttack)(0); // Breakfast
    // Visiting Looking Glass in clan VIP lounge

    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.visitUrl)("clan_viplounge.php?action=lookingglass&whichfloor=2");
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("swim item");

    while ((0,_lib__WEBPACK_IMPORTED_MODULE_0__.getPropertyInt)("_genieWishesUsed") < 3) {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("genie wish for more wishes");
    } // Visiting the Ruined House
    //  visit_url('place.php?whichplace=desertbeach&action=db_nukehouse');


    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.useSkill)(1, (0,libram__WEBPACK_IMPORTED_MODULE_4__.$skill)(_templateObject119 || (_templateObject119 = _taggedTemplateLiteral(["Advanced Cocktailcrafting"]))));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.useSkill)(1, (0,libram__WEBPACK_IMPORTED_MODULE_4__.$skill)(_templateObject120 || (_templateObject120 = _taggedTemplateLiteral(["Pastamastery"]))));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.useSkill)(1, (0,libram__WEBPACK_IMPORTED_MODULE_4__.$skill)(_templateObject121 || (_templateObject121 = _taggedTemplateLiteral(["Spaghetti Breakfast"]))));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.useSkill)(1, (0,libram__WEBPACK_IMPORTED_MODULE_4__.$skill)(_templateObject122 || (_templateObject122 = _taggedTemplateLiteral(["Grab a Cold One"]))));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.useSkill)(1, (0,libram__WEBPACK_IMPORTED_MODULE_4__.$skill)(_templateObject123 || (_templateObject123 = _taggedTemplateLiteral(["Acquire Rhinestones"]))));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.useSkill)(1, (0,libram__WEBPACK_IMPORTED_MODULE_4__.$skill)(_templateObject124 || (_templateObject124 = _taggedTemplateLiteral(["Perfect Freeze"])))); //useSkill(1, $skill`summon kokomo resort pass`);
    //autosell(1, $item`kokomo resort pass`);

    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.autosell)(3, (0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject125 || (_templateObject125 = _taggedTemplateLiteral(["coconut shell"]))));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.autosell)(3, (0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject126 || (_templateObject126 = _taggedTemplateLiteral(["magical ice cubes"]))));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.autosell)(3, (0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject127 || (_templateObject127 = _taggedTemplateLiteral(["little paper umbrella"])))); // Autosell stuff
    //autosell(1, $item[strawberry]);
    //autosell(1, $item[orange]);
    //autosell(1, $item`razor-sharp can lid`);
    //autosell(5, $item[red pixel]);
    //autosell(5, $item`green pixel`);
    //autosell(5, $item`blue pixel`);
    //autosell(5, $item`white pixel`);

    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.haveEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject128 || (_templateObject128 = _taggedTemplateLiteral(["Carlweather's Cantata of Confrontation"], ["Carlweather\\'s Cantata of Confrontation"])))) > 0) {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("shrug Carlweather's Cantata of Confrontation");
    } // equip($item`makeshift garbage shirt`);
    // useFamiliar($familiar`God Lobster`);
    // while (get("_godLobsterFights") < 2) {
    //   setProperty("choiceAdventure1310", "1");
    //   tryEquip($item`God Lobster\'s Scepter`);
    //   visitUrl("main.php?fightgodlobster=1");
    //   withMacro(Macro.skill($skill`saucegeyser`), runCombat);
    //   visitUrl("choice.php");
    //   if (handlingChoice()) runChoice(1);
    //   setAutoAttack(0);
    // }
    // fight a witchess queen for pointy crown, getting a couple weapon damage effects just in case


    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.toInt)((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.getProperty)("_witchessFights")) === 4) {
      //useDefaultFamiliar();
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.useSkill)(1, (0,libram__WEBPACK_IMPORTED_MODULE_4__.$skill)(_templateObject129 || (_templateObject129 = _taggedTemplateLiteral(["Cannelloni Cocoon"]))));
      libram__WEBPACK_IMPORTED_MODULE_3__.Macro.attack().repeat().setAutoAttack();
      (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject130 || (_templateObject130 = _taggedTemplateLiteral(["carol of the bulls"]))));
      (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject131 || (_templateObject131 = _taggedTemplateLiteral(["song of the north"]))));
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.visitUrl)("campground.php?action=witchess");
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.runChoice)(1);
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.visitUrl)("choice.php?option=1&pwd=" + (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myHash)() + "&whichchoice=1182&piece=1939", false);
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.runCombat)();
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setAutoAttack)(0);
    } //useDefaultFamiliar();
    //equip($slot`acc3`, $item`Lil\' Doctor&trade; Bag`);
    // 14 free NEP fights, using mob hit and xray


    while ((0,_lib__WEBPACK_IMPORTED_MODULE_0__.getPropertyInt)("_neverendingPartyFreeTurns") < 10 || //|| (haveSkill($skill`Chest X-Ray`) && getPropertyInt("_chestXRayUsed") < 3)
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.haveSkill)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$skill)(_templateObject132 || (_templateObject132 = _taggedTemplateLiteral(["Gingerbread Mob Hit"])))) && !(0,_lib__WEBPACK_IMPORTED_MODULE_0__.getPropertyBoolean)("_gingerbreadMobHitUsed")) {
      (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureNpcEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject133 || (_templateObject133 = _taggedTemplateLiteral(["Glittering Eyelashes"]))), 5, (0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject134 || (_templateObject134 = _taggedTemplateLiteral(["glittery mascara"])))); //TODO: uncomment when i learn skill
      //ensureSong($effect`The Magical Mojomuscular Melody`);

      (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureSong)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject135 || (_templateObject135 = _taggedTemplateLiteral(["Polka of Plenty"]))));
      (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject136 || (_templateObject136 = _taggedTemplateLiteral(["inscrutable gaze"]))));
      (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject137 || (_templateObject137 = _taggedTemplateLiteral(["pride of the puffin"]))));
      (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject138 || (_templateObject138 = _taggedTemplateLiteral(["drescher's annoying noise"], ["drescher\\'s annoying noise"]))));
      (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureSong)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject139 || (_templateObject139 = _taggedTemplateLiteral(["ur-kel's aria of annoyance"], ["ur-kel\\'s aria of annoyance"]))));
      (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject140 || (_templateObject140 = _taggedTemplateLiteral(["Feeling Excited"]))));
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("mood execute"); // Otherwise fight.

      (0,_lib__WEBPACK_IMPORTED_MODULE_0__.setChoice)(1324, 5); // }

      (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureMpSausage)(100);

      if ((0,_lib__WEBPACK_IMPORTED_MODULE_0__.getPropertyInt)("_neverendingPartyFreeTurns") < 10 && (0,_lib__WEBPACK_IMPORTED_MODULE_0__.getPropertyInt)("_feelPrideUsed") < 3) {
        //useDefaultFamiliar();
        (0,libram__WEBPACK_IMPORTED_MODULE_3__.adventureMacroAuto)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$location)(_templateObject141 || (_templateObject141 = _taggedTemplateLiteral(["The Neverending Party"]))), libram__WEBPACK_IMPORTED_MODULE_3__.Macro.trySkill((0,libram__WEBPACK_IMPORTED_MODULE_4__.$skill)(_templateObject142 || (_templateObject142 = _taggedTemplateLiteral(["feel pride"])))).step(justKillTheThing));
      } else if ((0,_lib__WEBPACK_IMPORTED_MODULE_0__.getPropertyInt)("_neverendingPartyFreeTurns") < 10) {
        //useDefaultFamiliar();
        (0,libram__WEBPACK_IMPORTED_MODULE_3__.adventureMacroAuto)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$location)(_templateObject143 || (_templateObject143 = _taggedTemplateLiteral(["The Neverending Party"]))), libram__WEBPACK_IMPORTED_MODULE_3__.Macro.step(justKillTheThing));
      } else {
        //useDefaultFamiliar();
        (0,libram__WEBPACK_IMPORTED_MODULE_3__.adventureMacroAuto)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$location)(_templateObject144 || (_templateObject144 = _taggedTemplateLiteral(["The Neverending Party"]))), libram__WEBPACK_IMPORTED_MODULE_3__.Macro.trySkill((0,libram__WEBPACK_IMPORTED_MODULE_4__.$skill)(_templateObject145 || (_templateObject145 = _taggedTemplateLiteral(["chest x-ray"])))).trySkill((0,libram__WEBPACK_IMPORTED_MODULE_4__.$skill)(_templateObject146 || (_templateObject146 = _taggedTemplateLiteral(["gingerbread mob hit"])))));
      }
    }

    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject147 || (_templateObject147 = _taggedTemplateLiteral(["Fourth of May Cosplay Saber"]))));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("fold makeshift garbage shirt");
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject148 || (_templateObject148 = _taggedTemplateLiteral(["makeshift garbage shirt"])))); //useDefaultFamiliar();

    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.getProperty)("boomBoxSong") !== "These Fists Were Made for Punchin'") {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("boombox damage");
    }

    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myClass)() === (0,libram__WEBPACK_IMPORTED_MODULE_4__.$class)(_templateObject149 || (_templateObject149 = _taggedTemplateLiteral(["Pastamancer"])))) (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.useSkill)(1, (0,libram__WEBPACK_IMPORTED_MODULE_4__.$skill)(_templateObject150 || (_templateObject150 = _taggedTemplateLiteral(["Bind Undead Elbow Macaroni"]))));else (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensurePotionEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject151 || (_templateObject151 = _taggedTemplateLiteral(["Expert Oiliness"]))), (0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject152 || (_templateObject152 = _taggedTemplateLiteral(["oil of expertise"])))); // ensure_effect($effect[Gr8ness]);
    // ensure_effect($effect[Tomato Power]);

    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject153 || (_templateObject153 = _taggedTemplateLiteral(["Song of Starch"]))));
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject154 || (_templateObject154 = _taggedTemplateLiteral(["Big"]))));
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject155 || (_templateObject155 = _taggedTemplateLiteral(["Song of Bravado"]))));
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureSong)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject156 || (_templateObject156 = _taggedTemplateLiteral(["Stevedave's Shanty of Superiority"], ["Stevedave\\'s Shanty of Superiority"])))); //TODO: uncomment when you know it
    //ensureSong($effect`Power Ballad of the Arrowsmith`);
    //TODO: uncomment when you know it
    //ensureEffect($effect`Rage of the Reindeer`);

    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject157 || (_templateObject157 = _taggedTemplateLiteral(["Quiet Determination"])))); //TODO: uncomment when you know it
    //ensureEffect($effect`Disdain of the War Snapper`);

    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureNpcEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject158 || (_templateObject158 = _taggedTemplateLiteral(["Go Get 'Em, Tiger!"], ["Go Get \\'Em, Tiger!"]))), 5, (0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject159 || (_templateObject159 = _taggedTemplateLiteral(["Ben-Gal&trade; balm"]))));
    synthesisPlanner.synthesize((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject160 || (_templateObject160 = _taggedTemplateLiteral(["Synthesis: Strong"])))); //useFamiliar($familiar`disembodied hand`);

    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.maximize)("hp", false); // QUEST - Donate Blood (HP)

    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myMaxhp)() - (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myBuffedstat)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$stat)(_templateObject161 || (_templateObject161 = _taggedTemplateLiteral(["muscle"])))) - 3 < 1770) {
      (0,libram_dist_console__WEBPACK_IMPORTED_MODULE_5__.error)("Not enough HP to cap.");
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.abort)();
    }

    if (hpTurns() > targetTurns.get(TEST_HP)) {
      throw "Can't achieve target turns for HP test. Current: " + hpTurns() + " Target: " + targetTurns.get(TEST_HP);
    }

    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setProperty)("_hccsHpTurnsUncapped", hpTurns() + "");
    TEMP_TURNS = (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myTurncount)();
    doTest(TEST_HP);
    HP_TURNS = (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myTurncount)() - TEMP_TURNS;
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setProperty)("_hccsHpTurns", HP_TURNS.toString());
  }
}

function testMus() {
  if (!testDone(TEST_MUS)) {
    // for (const increaser of [
    //   () => ensureEffect($effect`Lack of Body-Building`), // will stay on all the way to weapon damage.
    //   () => ensureEffect($effect`Ham-Fisted`),
    //   () => ensureInnerElf(),
    // ]) {
    //   if (myBuffedstat($stat`muscle`) - myBasestat($stat`mysticality`) < 1770) increaser();
    // }
    var musTurns = function musTurns() {
      if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myClass)() === (0,libram__WEBPACK_IMPORTED_MODULE_4__.$class)(_templateObject178 || (_templateObject178 = _taggedTemplateLiteral(["Pastamancer"])))) {
        return 60 - (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.floor)(((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myBuffedstat)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$stat)(_templateObject179 || (_templateObject179 = _taggedTemplateLiteral(["muscle"])))) - (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myBasestat)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$stat)(_templateObject180 || (_templateObject180 = _taggedTemplateLiteral(["mysticality"]))))) / 30);
      } else {
        return 60 - (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.floor)(((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myBuffedstat)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$stat)(_templateObject181 || (_templateObject181 = _taggedTemplateLiteral(["muscle"])))) - (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myBasestat)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$stat)(_templateObject182 || (_templateObject182 = _taggedTemplateLiteral(["muscle"]))))) / 30);
      }
    };

    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myClass)() === (0,libram__WEBPACK_IMPORTED_MODULE_4__.$class)(_templateObject163 || (_templateObject163 = _taggedTemplateLiteral(["Pastamancer"])))) (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.useSkill)(1, (0,libram__WEBPACK_IMPORTED_MODULE_4__.$skill)(_templateObject164 || (_templateObject164 = _taggedTemplateLiteral(["Bind Undead Elbow Macaroni"]))));else (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensurePotionEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject165 || (_templateObject165 = _taggedTemplateLiteral(["Expert Oiliness"]))), (0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject166 || (_templateObject166 = _taggedTemplateLiteral(["oil of expertise"]))));

    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myInebriety)() <= 6) {
      (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureOde)(6);
      tryUse(1, (0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject167 || (_templateObject167 = _taggedTemplateLiteral(["astral six-pack"]))));
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.drink)(6, (0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject168 || (_templateObject168 = _taggedTemplateLiteral(["astral pilsner"]))));
    }

    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject169 || (_templateObject169 = _taggedTemplateLiteral(["Big"]))));
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject170 || (_templateObject170 = _taggedTemplateLiteral(["Song of Bravado"]))));
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureSong)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject171 || (_templateObject171 = _taggedTemplateLiteral(["Stevedave's Shanty of Superiority"], ["Stevedave\\'s Shanty of Superiority"])))); //TODO: uncomment when you know it
    //ensureSong($effect`Power Ballad of the Arrowsmith`);
    //TODO: uncomment when you know it
    //ensureEffect($effect`Rage of the Reindeer`);

    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject172 || (_templateObject172 = _taggedTemplateLiteral(["Quiet Determination"])))); //TODO: uncomment when you know it
    //ensureEffect($effect`Disdain of the War Snapper`);
    // ensure_effect($effect[Tomato Power]);

    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureNpcEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject173 || (_templateObject173 = _taggedTemplateLiteral(["Go Get 'Em, Tiger!"], ["Go Get \\'Em, Tiger!"]))), 5, (0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject174 || (_templateObject174 = _taggedTemplateLiteral(["Ben-Gal&trade; balm"])))); // ensure_effect($effect[Ham-Fisted]);

    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.create)(1, (0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject175 || (_templateObject175 = _taggedTemplateLiteral(["philter of phorce"]))));
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject176 || (_templateObject176 = _taggedTemplateLiteral(["Phorcefullness"])))); // Beach Comb

    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject177 || (_templateObject177 = _taggedTemplateLiteral(["Lack of Body-Building"])))); //TODO: uncomment if i get left-hand man
    //useFamiliar($familiar`Left-Hand Man`);

    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.maximize)("muscle", false);

    if (musTurns() > targetTurns.get(TEST_MUS)) {
      throw "Can't achieve target turns for muscle test. Current: " + musTurns() + " Target: " + targetTurns.get(TEST_MUS);
    } // cli_execute('modtrace mus');
    // abort();


    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setProperty)("_hccsMusTurnsUncapped", musTurns() + "");
    TEMP_TURNS = (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myTurncount)();
    doTest(TEST_MUS);
    MUS_TURNS = (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myTurncount)() - TEMP_TURNS;
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setProperty)("_hccsMusTurns", MUS_TURNS.toString());
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.useFamiliar)(familiarFor100Run);
  }
}

function testMys() {
  if (!testDone(TEST_MYS)) {
    var mysTurns = function mysTurns() {
      return 60 - (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.floor)(((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myBuffedstat)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$stat)(_templateObject192 || (_templateObject192 = _taggedTemplateLiteral(["mysticality"])))) - (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myBasestat)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$stat)(_templateObject193 || (_templateObject193 = _taggedTemplateLiteral(["mysticality"]))))) / 30);
    };

    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject183 || (_templateObject183 = _taggedTemplateLiteral(["Big"]))));
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject184 || (_templateObject184 = _taggedTemplateLiteral(["Song of Bravado"]))));
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureSong)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject185 || (_templateObject185 = _taggedTemplateLiteral(["Stevedave's Shanty of Superiority"], ["Stevedave\\'s Shanty of Superiority"])))); //TODO: uncomment when you know it
    //ensureSong($effect`The Magical Mojomuscular Melody`);

    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject186 || (_templateObject186 = _taggedTemplateLiteral(["Quiet Judgement"])))); // ensure_effect($effect[Tomato Power]);

    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject187 || (_templateObject187 = _taggedTemplateLiteral(["Mystically Oiled"]))));
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureNpcEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject188 || (_templateObject188 = _taggedTemplateLiteral(["Glittering Eyelashes"]))), 5, (0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject189 || (_templateObject189 = _taggedTemplateLiteral(["glittery mascara"])))); //todo: uncomment if i get left-hand man
    //useFamiliar($familiar`Left-Hand Man`);

    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.maximize)("mysticality", false);

    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myBuffedstat)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$stat)(_templateObject190 || (_templateObject190 = _taggedTemplateLiteral(["mysticality"])))) - (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myBasestat)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$stat)(_templateObject191 || (_templateObject191 = _taggedTemplateLiteral(["mysticality"])))) < 1770) {
      (0,libram_dist_console__WEBPACK_IMPORTED_MODULE_5__.error)("Not enough mysticality to cap.");
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.abort)();
    }

    if (mysTurns() > targetTurns.get(TEST_MYS)) {
      throw "Can't achieve target turns for mysticality test. Current: " + mysTurns() + " Target: " + targetTurns.get(TEST_MYS);
    }

    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setProperty)("_hccsMysTurnsUncapped", mysTurns() + "");
    TEMP_TURNS = (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myTurncount)();
    doTest(TEST_MYS);
    MYS_TURNS = (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myTurncount)() - TEMP_TURNS;
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setProperty)("_hccsMysTurns", MYS_TURNS.toString());
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.useFamiliar)(familiarFor100Run);
  }
}

function testMox() {
  if (!testDone(TEST_MOX)) {
    var moxTurns = function moxTurns() {
      if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myClass)() === (0,libram__WEBPACK_IMPORTED_MODULE_4__.$class)(_templateObject211 || (_templateObject211 = _taggedTemplateLiteral(["Pastamancer"])))) {
        return 60 - (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.floor)(((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myBuffedstat)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$stat)(_templateObject212 || (_templateObject212 = _taggedTemplateLiteral(["moxie"])))) - (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myBasestat)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$stat)(_templateObject213 || (_templateObject213 = _taggedTemplateLiteral(["mysticality"]))))) / 30);
      } else {
        return 60 - (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.floor)(((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myBuffedstat)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$stat)(_templateObject214 || (_templateObject214 = _taggedTemplateLiteral(["moxie"])))) - (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myBasestat)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$stat)(_templateObject215 || (_templateObject215 = _taggedTemplateLiteral(["moxie"]))))) / 30);
      }
    };

    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myClass)() === (0,libram__WEBPACK_IMPORTED_MODULE_4__.$class)(_templateObject194 || (_templateObject194 = _taggedTemplateLiteral(["Pastamancer"])))) (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.useSkill)(1, (0,libram__WEBPACK_IMPORTED_MODULE_4__.$skill)(_templateObject195 || (_templateObject195 = _taggedTemplateLiteral(["Bind Penne Dreadful"]))));else (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensurePotionEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject196 || (_templateObject196 = _taggedTemplateLiteral(["Expert Oiliness"]))), (0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject197 || (_templateObject197 = _taggedTemplateLiteral(["oil of expertise"])))); // Beach Comb

    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject198 || (_templateObject198 = _taggedTemplateLiteral(["Pomp & Circumsands"])))); //todo: uncomment if i get birds
    // use(1, $item`Bird-a-Day Calendar`);
    // ensureEffect($effect`Blessing of the Bird`);
    // Should be 11% NC and 50% moxie, will fall through to NC test
    // ensureEffect($effect`Blessing of your favorite Bird`);

    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject199 || (_templateObject199 = _taggedTemplateLiteral(["Big"]))));
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject200 || (_templateObject200 = _taggedTemplateLiteral(["Song of Bravado"]))));
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureSong)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject201 || (_templateObject201 = _taggedTemplateLiteral(["Stevedave's Shanty of Superiority"], ["Stevedave\\'s Shanty of Superiority"])))); //TODO: uncomment when i learn skill
    //ensureSong($effect`The Moxious Madrigal`);

    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject202 || (_templateObject202 = _taggedTemplateLiteral(["Quiet Desperation"])))); // ensure_effect($effect[Tomato Power]);

    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject203 || (_templateObject203 = _taggedTemplateLiteral(["Disco Fever"])))); //TODO: uncomment when i learn skill
    //ensureEffect($effect`Blubbered Up`);
    //TODO: uncomment when i learn skill
    //ensureEffect($effect`Mariachi Mood`);

    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureNpcEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject204 || (_templateObject204 = _taggedTemplateLiteral(["Butt-Rock Hair"]))), 5, (0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject205 || (_templateObject205 = _taggedTemplateLiteral(["hair spray"]))));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.use)((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject206 || (_templateObject206 = _taggedTemplateLiteral(["rhinestone"])))), (0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject207 || (_templateObject207 = _taggedTemplateLiteral(["rhinestone"]))));

    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.haveEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject208 || (_templateObject208 = _taggedTemplateLiteral(["Unrunnable Face"])))) === 0) {
      tryUse(1, (0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject209 || (_templateObject209 = _taggedTemplateLiteral(["runproof mascara"]))));
    }

    synthesisPlanner.synthesize((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject210 || (_templateObject210 = _taggedTemplateLiteral(["Synthesis: Cool"])))); //uncomment if i get left-hand man
    //useFamiliar($familiar`Left-Hand Man`);

    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.maximize)("moxie", false);

    if (moxTurns() > targetTurns.get(TEST_MOX)) {
      throw "Can't achieve target turns for moxie test. Current: " + moxTurns() + " Target: " + targetTurns.get(TEST_MOX);
    }

    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setProperty)("_hccsMoxTurnsUncapped", moxTurns() + "");
    TEMP_TURNS = (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myTurncount)();
    doTest(TEST_MOX);
    MOX_TURNS = (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myTurncount)() - TEMP_TURNS;
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setProperty)("_hccsMoxTurns", MOX_TURNS.toString());
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.useFamiliar)(familiarFor100Run);
  }
}

function testHotRes() {
  if (!testDone(TEST_HOT_RES)) {
    var hotResTurns = function hotResTurns() {
      return 60 - (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.round)((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.numericModifier)("hot resistance"));
    };

    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureMpSausage)(500); //useDefaultFamiliar();

    fightSausageIfGuaranteed(); // Make sure no moon spoon.
    //equip($slot`acc1`, $item`Eight Days a Week Pill Keeper`);
    //equip($slot`acc2`, $item`Powerful Glove`);
    //equip($slot`acc3`, $item`Lil\' Doctor&trade; Bag`);

    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject216 || (_templateObject216 = _taggedTemplateLiteral(["heat-resistant gloves"])))) === 0) {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.adv1)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$location)(_templateObject217 || (_templateObject217 = _taggedTemplateLiteral(["LavaCo&trade; Lamp Factory"]))), -1, "");

      if (!(0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.containsText)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$location)(_templateObject218 || (_templateObject218 = _taggedTemplateLiteral(["LavaCo&trade; Lamp Factory"]))).noncombatQueue, "LavaCo&trade; Welcomes You")) {
        throw "Something went wrong at LavaCo.";
      }

      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject219 || (_templateObject219 = _taggedTemplateLiteral(["Fourth of May Cosplay Saber"]))));
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject220 || (_templateObject220 = _taggedTemplateLiteral(["familiar scrapbook"])))); //equip($item`vampyric cloake`);

      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setProperty)("choiceAdventure1387", "3");
      (0,_lib__WEBPACK_IMPORTED_MODULE_0__.mapMonster)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$location)(_templateObject221 || (_templateObject221 = _taggedTemplateLiteral(["LavaCo&trade; Lamp Factory"]))), (0,libram__WEBPACK_IMPORTED_MODULE_4__.$monster)(_templateObject222 || (_templateObject222 = _taggedTemplateLiteral(["Factory worker (female)"]))));
      withMacro(libram__WEBPACK_IMPORTED_MODULE_3__.Macro.trySkill((0,libram__WEBPACK_IMPORTED_MODULE_4__.$skill)(_templateObject223 || (_templateObject223 = _taggedTemplateLiteral(["become a cloud of mist"])))).skill((0,libram__WEBPACK_IMPORTED_MODULE_4__.$skill)(_templateObject224 || (_templateObject224 = _taggedTemplateLiteral(["meteor shower"])))).skill((0,libram__WEBPACK_IMPORTED_MODULE_4__.$skill)(_templateObject225 || (_templateObject225 = _taggedTemplateLiteral(["use the force"])))), kolmafia__WEBPACK_IMPORTED_MODULE_1__.runCombat);

      while ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.lastChoice)() === 1387 && (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.handlingChoice)()) {
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.runChoice)(3);
      }

      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setProperty)("mappingMonsters", "false");
    } // synth hot TODO: check for the right candyblast candies and summon candy hearts if not


    synthesisPlanner.synthesize((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject226 || (_templateObject226 = _taggedTemplateLiteral(["Synthesis: Hot"])))); // add +5 hot res to KGB, relies on Ezandora's script, naturally

    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("briefcase e hot"); // set retrocape to elemental resistance

    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("retrocape mus hold");
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject227 || (_templateObject227 = _taggedTemplateLiteral(["Blood Bond"]))));
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject228 || (_templateObject228 = _taggedTemplateLiteral(["Leash of Linguini"]))));
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject229 || (_templateObject229 = _taggedTemplateLiteral(["Empathy"]))));
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject230 || (_templateObject230 = _taggedTemplateLiteral(["feeling peaceful"])))); // Pool buff. This will fall through to fam weight.

    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject231 || (_templateObject231 = _taggedTemplateLiteral(["Billiards Belligerence"]))));

    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject232 || (_templateObject232 = _taggedTemplateLiteral(["metal meteoroid"])))) > 0 && (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject233 || (_templateObject233 = _taggedTemplateLiteral(["meteorite guard"])))) === 0) {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("create 1 meteorite guard");
    }

    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureItem)(1, (0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject234 || (_templateObject234 = _taggedTemplateLiteral(["tenderizing hammer"]))));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("smash * ratty knitted cap");
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("smash * red-hot sausage fork");
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.autosell)(10, (0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject235 || (_templateObject235 = _taggedTemplateLiteral(["hot nuggets"]))));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.autosell)(10, (0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject236 || (_templateObject236 = _taggedTemplateLiteral(["twinkly powder"]))));

    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject237 || (_templateObject237 = _taggedTemplateLiteral(["hot powder"])))) > 0) {
      (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject238 || (_templateObject238 = _taggedTemplateLiteral(["Flame-Retardant Trousers"]))));
    }

    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject239 || (_templateObject239 = _taggedTemplateLiteral(["sleaze powder"])))) > 0 || (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject240 || (_templateObject240 = _taggedTemplateLiteral(["lotion of sleaziness"])))) > 0) {
      (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensurePotionEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject241 || (_templateObject241 = _taggedTemplateLiteral(["Sleazy Hands"]))), (0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject242 || (_templateObject242 = _taggedTemplateLiteral(["lotion of sleaziness"]))));
    } // wish for healthy green glow, should fall through
    // wish_effect($effect`healthy green glow`);


    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject243 || (_templateObject243 = _taggedTemplateLiteral(["Elemental Saucesphere"]))));
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject244 || (_templateObject244 = _taggedTemplateLiteral(["Astral Shell"])))); // drink hot socks here if you're a tryhard
    // Beach comb buff.

    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject245 || (_templateObject245 = _taggedTemplateLiteral(["Hot-Headed"])))); // if (get_property('_horsery') != 'pale horse') cli_execute('horsery pale');

    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.useFamiliar)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$familiar)(_templateObject246 || (_templateObject246 = _taggedTemplateLiteral(["Exotic Parrot"])))); // if (availableAmount($item`cracker`) === 0 && getPropertyInt("tomeSummons") < 3) {
    //   retrieveItem(1, $item`box of Familiar jacks`);
    //   use(1, $item`box of Familiar Jacks`);
    //   equip($item`cracker`);
    // }

    if (!(0,_lib__WEBPACK_IMPORTED_MODULE_0__.getPropertyBoolean)("_mayoTankSoaked")) {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("mayosoak");
    } // Build up 100 turns of Deep Dark Visions for spell damage later.


    while ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.haveSkill)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$skill)(_templateObject247 || (_templateObject247 = _taggedTemplateLiteral(["Deep Dark Visions"])))) && (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.haveEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject248 || (_templateObject248 = _taggedTemplateLiteral(["Visions of the Deep Dark Deeps"])))) < 50) {
      if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myMp)() < 20) {
        (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureCreateItem)(1, (0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject249 || (_templateObject249 = _taggedTemplateLiteral(["magical sausage"]))));
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.eat)(1, (0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject250 || (_templateObject250 = _taggedTemplateLiteral(["magical sausage"]))));
      }

      while ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myHp)() < (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myMaxhp)()) {
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.useSkill)(1, (0,libram__WEBPACK_IMPORTED_MODULE_4__.$skill)(_templateObject251 || (_templateObject251 = _taggedTemplateLiteral(["Cannelloni Cocoon"]))));
      }

      if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myMp)() < 100) {
        (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureCreateItem)(1, (0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject252 || (_templateObject252 = _taggedTemplateLiteral(["magical sausage"]))));
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.eat)(1, (0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject253 || (_templateObject253 = _taggedTemplateLiteral(["magical sausage"]))));
      }

      if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.round)((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.numericModifier)("spooky resistance")) < 10) {
        throw "Not enough spooky res for Deep Dark Visions.";
      }

      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.useSkill)(1, (0,libram__WEBPACK_IMPORTED_MODULE_4__.$skill)(_templateObject254 || (_templateObject254 = _taggedTemplateLiteral(["Deep Dark Visions"]))));
    } // Use pocket maze


    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject255 || (_templateObject255 = _taggedTemplateLiteral(["pocket maze"])))) > 0) (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject256 || (_templateObject256 = _taggedTemplateLiteral(["Amazing"])))); // Mafia sometimes can't figure out that multiple +weight things would get us to next tier.

    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.maximize)("hot res, 0.01 familiar weight", false);

    if (hotResTurns() > targetTurns.get(TEST_HOT_RES)) {
      throw "Can't achieve target turns for hot res test. Current: " + hotResTurns() + " Target: " + targetTurns.get(TEST_HOT_RES);
    } // cli_execute('modtrace Hot Resistance');
    // abort();
    //logprint(cliExecuteOutput("modtrace hot resistance"));


    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setProperty)("_hccsHotResTurnsUncapped", hotResTurns() + "");
    TEMP_TURNS = (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myTurncount)();
    doTest(TEST_HOT_RES);
    HOT_RES_TURNS = (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myTurncount)() - TEMP_TURNS;
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.useFamiliar)(familiarFor100Run);
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setProperty)("_hccsHotResTurns", HOT_RES_TURNS.toString());
  }
}

function testNonCombat() {
  if (!testDone(TEST_NONCOMBAT)) {
    var nonCombatTurns = function nonCombatTurns() {
      //let's assume i will always have at least -25% combat rate to simplify calculation
      return 45 + ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.round)((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.numericModifier)("combat rate")) + 25) * 3;
    };

    fightSausageIfGuaranteed();
    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myHp)() < 30) (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.useSkill)(1, (0,libram__WEBPACK_IMPORTED_MODULE_4__.$skill)(_templateObject257 || (_templateObject257 = _taggedTemplateLiteral(["Cannelloni Cocoon"]))));
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject258 || (_templateObject258 = _taggedTemplateLiteral(["Blood Bond"]))));
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject259 || (_templateObject259 = _taggedTemplateLiteral(["Leash of Linguini"]))));
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject260 || (_templateObject260 = _taggedTemplateLiteral(["Empathy"])))); // if (get("_godLobsterFights") < 3) {
    //   if (myHp() < 0.8 * myMaxhp()) useSkill(1, $skill`Cannelloni Cocoon`);
    //   useFamiliar($familiar`God Lobster`);
    //   // Get -combat buff.
    //   setProperty("choiceAdventure1310", "2");
    //   equip($item`God Lobster\'s Ring`);
    //   visitUrl("main.php?fightgodlobster=1");
    //   withMacro(Macro.skill($skill`saucegeyser`), runCombat);
    //   visitUrl("choice.php");
    //   if (handlingChoice()) runChoice(2);
    //   setAutoAttack(0);
    // }
    // setting KGB to NC, relies on Ezandora's script

    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("briefcase e -combat"); // Pool buff. Should fall through to weapon damage.

    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject261 || (_templateObject261 = _taggedTemplateLiteral(["Billiards Belligerence"])))); //equip($slot`acc3`, $item`Powerful Glove`);
    //ensureEffect($effect`gummed shoes`);

    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject262 || (_templateObject262 = _taggedTemplateLiteral(["The Sonata of Sneakiness"]))));
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject263 || (_templateObject263 = _taggedTemplateLiteral(["Smooth Movements"])))); //ensureEffect($effect`Invisible Avatar`);

    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject264 || (_templateObject264 = _taggedTemplateLiteral(["Silent Running"]))));
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject265 || (_templateObject265 = _taggedTemplateLiteral(["Feeling Lonely"])))); // Rewards

    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject266 || (_templateObject266 = _taggedTemplateLiteral(["Throwing Some Shade"])))); // ensure_effect($effect[A Rose by Any Other Material]);
    // wish for disquiet riot because shades are hilariously expensive

    wishEffect((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject267 || (_templateObject267 = _taggedTemplateLiteral(["disquiet riot"]))));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.useFamiliar)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$familiar)(_templateObject268 || (_templateObject268 = _taggedTemplateLiteral(["Disgeist"])))); // Pastamancer d1 is -combat.
    //TODO: uncomment if i buy bird iotm
    // if (myClass() === $class`pastamancer`) {
    //   ensureEffect($effect`Blessing of the Bird`);
    // }

    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject269 || (_templateObject269 = _taggedTemplateLiteral(["Daily Affirmation: Be Superficially interested"])))) > 0) {
      (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject270 || (_templateObject270 = _taggedTemplateLiteral(["Become Superficially interested"]))));
    }

    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.maximize)("-combat, 0.01 familiar weight", false);

    if (nonCombatTurns() > targetTurns.get(TEST_NONCOMBAT)) {
      throw "Can't achieve target turns for -combat test. Current: " + nonCombatTurns() + " Target: " + targetTurns.get(TEST_NONCOMBAT);
    } // cli_execute('modtrace combat rate');
    // abort();


    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setProperty)("_hccsNonCombatTurnsUncapped", nonCombatTurns() + "");
    TEMP_TURNS = (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myTurncount)();
    doTest(TEST_NONCOMBAT);
    NONCOMBAT_TURNS = (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myTurncount)() - TEMP_TURNS;
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.useFamiliar)(familiarFor100Run);
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setProperty)("_hccsNonCombatTurns", NONCOMBAT_TURNS.toString());
  }
}

function testFamiliarWeight() {
  if (!testDone(TEST_FAMILIAR)) {
    var familiarTurns = function familiarTurns() {
      return 60 - (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.floor)((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.familiarWeight)((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myFamiliar)()) + (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.round)((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.numericModifier)("familiar weight")) / 5 + 0.001);
    };

    fightSausageIfGuaranteed(); // These should have fallen through all the way from leveling.
    //ensureEffect($effect`Fidoxene`);

    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject271 || (_templateObject271 = _taggedTemplateLiteral(["Do I Know You From Somewhere?"])))); // Pool buff.

    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject272 || (_templateObject272 = _taggedTemplateLiteral(["Billiards Belligerence"])))); //if (availableAmount($item`rope`) === 0) cliExecute("play rope");

    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myHp)() < 30) (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.useSkill)(1, (0,libram__WEBPACK_IMPORTED_MODULE_4__.$skill)(_templateObject273 || (_templateObject273 = _taggedTemplateLiteral(["Cannelloni Cocoon"]))));
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject274 || (_templateObject274 = _taggedTemplateLiteral(["Blood Bond"]))));
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject275 || (_templateObject275 = _taggedTemplateLiteral(["Leash of Linguini"]))));
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject276 || (_templateObject276 = _taggedTemplateLiteral(["Empathy"]))));
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject277 || (_templateObject277 = _taggedTemplateLiteral(["robot friends"])))); //ensureEffect($effect`human-machine hybrid`);
    //ensureEffect($effect`shortly stacked`);

    /*
    if (availableAmount($item`cracker`) > 0 && getPropertyInt("tomeSummons") < 3) {
      useFamiliar($familiar`Exotic Parrot`);
      equip($item`cracker`);
    }
    */

    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.haveEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject278 || (_templateObject278 = _taggedTemplateLiteral(["Meteor Showered"])))) === 0) {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject279 || (_templateObject279 = _taggedTemplateLiteral(["Fourth of May Cosplay Saber"]))));
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject280 || (_templateObject280 = _taggedTemplateLiteral(["familiar scrapbook"]))));
      (0,_lib__WEBPACK_IMPORTED_MODULE_0__.setChoice)(1387, 1); //we cant force drops so just banish

      (0,libram__WEBPACK_IMPORTED_MODULE_3__.adventureMacroAuto)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$location)(_templateObject281 || (_templateObject281 = _taggedTemplateLiteral(["The Neverending Party"]))), libram__WEBPACK_IMPORTED_MODULE_3__.Macro.trySkill((0,libram__WEBPACK_IMPORTED_MODULE_4__.$skill)(_templateObject282 || (_templateObject282 = _taggedTemplateLiteral(["Meteor Shower"])))).trySkill((0,libram__WEBPACK_IMPORTED_MODULE_4__.$skill)(_templateObject283 || (_templateObject283 = _taggedTemplateLiteral(["Use the Force"])))));
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setAutoAttack)(0);
    } //i don't have a garbage fire but no harm leaving this in


    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject284 || (_templateObject284 = _taggedTemplateLiteral(["burning newspaper"])))) > 0 && (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject285 || (_templateObject285 = _taggedTemplateLiteral(["burning paper crane"])))) < 1) {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("create 1 burning paper crane");
    } //if (!getPropertyBoolean("_clanFortuneBuffUsed")) cliExecute("fortune buff familiar");
    // checking here to see if we had a tome summon for a cracker or if we should use BBB
    // if (availableAmount($item`cracker`) > 0) {
    //   useFamiliar($familiar`exotic parrot`);
    // } else if (availableAmount($item`bugged beanie`) === 1) {
    //   useFamiliar($familiar`baby bugged bugbear`);
    // }


    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.maximize)("familiar weight", false);

    if (familiarTurns() > targetTurns.get(TEST_FAMILIAR)) {
      throw "Can't achieve target turns for familiar weight test. Current: " + familiarTurns() + " Target: " + targetTurns.get(TEST_FAMILIAR);
    } //cliExecute("modtrace familiar weight");
    //abort();


    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setProperty)("_hccsFamiliarTurnsUncapped", familiarTurns() + "");
    TEMP_TURNS = (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myTurncount)();
    doTest(TEST_FAMILIAR);
    FAMILIAR_TURNS = (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myTurncount)() - TEMP_TURNS;
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setProperty)("_hccsFamiliarTurns", FAMILIAR_TURNS.toString());
  }
}

function testWeaponDamage() {
  if (!testDone(TEST_WEAPON)) {
    var weaponTurns = function weaponTurns() {
      //code shamelessly copied from TourGuide
      var modifier_1 = (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.numericModifier)("Weapon Damage");
      var modifier_2 = (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.numericModifier)("Weapon Damage Percent");
      (0,libram__WEBPACK_IMPORTED_MODULE_4__.$slots)(_templateObject315 || (_templateObject315 = _taggedTemplateLiteral(["hat,weapon,off-hand,back,shirt,pants,acc1,acc2,acc3,familiar"]))).forEach(function (s) {
        var it = (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equippedItem)(s);
        if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.toSlot)(it) != (0,libram__WEBPACK_IMPORTED_MODULE_4__.$slot)(_templateObject316 || (_templateObject316 = _taggedTemplateLiteral(["weapon"])))) return;
        var power = (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.getPower)(it);
        var addition = (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.toFloat)(power) * 0.15;
        modifier_1 -= addition;
      });
      {}

      if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.haveEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject317 || (_templateObject317 = _taggedTemplateLiteral(["bow-legged swagger"])))) > 0) {
        modifier_1 *= 2;
        modifier_2 *= 2;
      }

      return 60 - ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.floor)(modifier_1 / 50 + 0.001) + (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.floor)(modifier_2 / 50 + 0.001));
    };

    fightSausageIfGuaranteed();

    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myInebriety)() < (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.inebrietyLimit)() - 2 && !(0,libram__WEBPACK_IMPORTED_MODULE_7__.have)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject286 || (_templateObject286 = _taggedTemplateLiteral(["In a Lather"]))))) {
      (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureOde)(2);
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("drink 1 Sockdollager");
    } // Get inner elf for weapon damage
    // if (haveEffect($effect`inner elf`) === 0 && getPropertyInt("_snokebombUsed") < 3) {
    //   cliExecute("/whitelist hobopolis vacation home");
    //   ensureEffect($effect`blood bubble`);
    //   useFamiliar($familiar`machine elf`);
    //   setProperty("choiceAdventure326", "1");
    //   adventureMacro($location`The Slime Tube`, Macro.skill($skill`snokebomb`));
    //   useDefaultFamiliar();
    //   cliExecute("/whitelist alliance from hell");
    // } else {
    //   print("Something went wrong with getting inner elf");
    // }
    // Paint crayon elf for DNA and ghost buff (Saber YR)

    /*
    if (!getPropertyBoolean("_chateauMonsterFought")) {
      const chateauText = visitUrl("place.php?whichplace=chateau", false);
      const m = createMatcher("alt="Painting of a? ([^(]*) .1."", chateauText);
      if (find(m) && group(m, 1) === "Black Crayon Crimbo Elf") {
        cliExecute("mood apathetic");
        useFamiliar($familiar`ghost of crimbo carols`);
        equip($slot`acc3`, $item`Lil\' Doctor&trade; Bag`);
        if (getPropertyInt("_reflexHammerUsed") === 3) {
          error("You do not have any banishes left");
        }
        setHccsCombatMode(MODE_CUSTOM, mSkill(mItem(mNew(), $item`DNA extraction syringe`), $skill`Reflex Hammer`));
        visitUrl("place.php?whichplace=chateau&action=chateau_painting", false);
        runCombat();
        useDefaultFamiliar();
      } else {
        error("Wrong painting.");
      }
    // } */
    // if (!get("_chateauMonsterFought")) {
    //   // const chateauText = visitUrl("place.php?whichplace=chateau", false);
    //   // const match = chateauText.match(/alt="Painting of an? ([^(]*) .1."/);
    //   // if (getPropertyInt("camelSpit") === 100) useFamiliar($familiar`Melodramedary`);
    //   //useFamiliar($familiar`ghost of crimbo carols`);
    //   //equip($slot`acc3`, $item`Lil\' Doctor&trade; Bag`);
    //   // if (get("_reflexHammerUsed") > 2) {
    //   //   error("You do not have any banishes left");
    //   // }
    //   //TODO: what am i supposed to do here?
    //   Macro.tryItem($item`DNA extraction syringe`)
    //     .trySkill($skill`reflex hammer`)
    //     .attack()
    //     .setAutoAttack();
    //   visitUrl("place.php?whichplace=chateau&action=chateau_painting", false);
    //   runCombat();
    //   //useDefaultFamiliar();
    // } else {
    //   throw "You already fought your painting";
    // }


    if (!(0,_lib__WEBPACK_IMPORTED_MODULE_0__.getPropertyBoolean)("_chateauMonsterFought") && (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject287 || (_templateObject287 = _taggedTemplateLiteral(["corrupted marrow"])))) === 0 && (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.haveEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject288 || (_templateObject288 = _taggedTemplateLiteral(["cowrruption"])))) === 0) {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("mood apathetic");
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject289 || (_templateObject289 = _taggedTemplateLiteral(["Fourth of May Cosplay Saber"]))));
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject290 || (_templateObject290 = _taggedTemplateLiteral(["familiar scrapbook"]))));
      libram__WEBPACK_IMPORTED_MODULE_3__.Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_4__.$skill)(_templateObject291 || (_templateObject291 = _taggedTemplateLiteral(["meteor shower"])))).skill((0,libram__WEBPACK_IMPORTED_MODULE_4__.$skill)(_templateObject292 || (_templateObject292 = _taggedTemplateLiteral(["use the force"])))).setAutoAttack();
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.visitUrl)("place.php?whichplace=chateau&action=chateau_painting", false);
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.runCombat)();
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.runChoice)(3);
    }

    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setAutoAttack)(0); //geneTonic("elf");
    //ensureEffect($effect`human-elf hybrid`);
    //TODO: fax something?

    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject293 || (_templateObject293 = _taggedTemplateLiteral(["twinkly nuggets"])))) > 0) {
      (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject294 || (_templateObject294 = _taggedTemplateLiteral(["Twinkly Weapon"]))));
    }

    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject295 || (_templateObject295 = _taggedTemplateLiteral(["Carol of the Bulls"]))));
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject296 || (_templateObject296 = _taggedTemplateLiteral(["Song of the North"])))); //TODO: uncomment when you learn this
    // ensureEffect($effect`Rage of the Reindeer`);
    //TODO: uncomment when you learn this
    //ensureEffect($effect`Frenzied, Bloody`);
    //TODO: uncomment when you learn this
    // ensureEffect($effect`Scowl of the Auk`);
    //TODO: uncomment when you learn this
    // ensureEffect($effect`Disdain of the War Snapper`);
    //TODO: uncomment when you learn this
    // ensureEffect($effect`Tenacity of the Snapper`);

    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureSong)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject297 || (_templateObject297 = _taggedTemplateLiteral(["Jackasses' Symphony of Destruction"], ["Jackasses\\' Symphony of Destruction"]))));

    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject298 || (_templateObject298 = _taggedTemplateLiteral(["lov elixir #3"], ["lov elixir \\#3"])))) > 0) {
      (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject299 || (_templateObject299 = _taggedTemplateLiteral(["The Power of LOV"]))));
    }

    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject300 || (_templateObject300 = _taggedTemplateLiteral(["vial of hamethyst juice"])))) > 0) {
      (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject301 || (_templateObject301 = _taggedTemplateLiteral(["Ham-Fisted"]))));
    }

    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject302 || (_templateObject302 = _taggedTemplateLiteral(["Fabiotion"])))) > 0) {
      (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject303 || (_templateObject303 = _taggedTemplateLiteral(["Faboooo"]))));
    } // make KGB set to weapon


    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("briefcase e weapon"); // Beach Comb

    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject304 || (_templateObject304 = _taggedTemplateLiteral(["Lack of Body-Building"])))); // Boombox potion - did we get one?

    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject305 || (_templateObject305 = _taggedTemplateLiteral(["Punching Potion"])))) > 0) {
      (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject306 || (_templateObject306 = _taggedTemplateLiteral(["Feeling Punchy"]))));
    } // Pool buff. Should have fallen through.


    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject307 || (_templateObject307 = _taggedTemplateLiteral(["Billiards Belligerence"])))); // Corrupted marrow

    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject308 || (_templateObject308 = _taggedTemplateLiteral(["Cowrruption"])))); // Pastamancer d1 is weapon damage.
    //TODO: uncomment if i buy bird iotm
    //ensureEffect($effect`Blessing of your Favorite Bird`);
    // ensureEffect($effect`Blessing of the Bird`);

    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureNpcEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject309 || (_templateObject309 = _taggedTemplateLiteral(["Engorged Weapon"]))), 1, (0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject310 || (_templateObject310 = _taggedTemplateLiteral(["Meleegra&trade; pills"]))));
    wishEffect((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject311 || (_templateObject311 = _taggedTemplateLiteral(["Outer Wolf&trade;"])))); //wishEffect($effect`Wasabi With You`);
    // this is just an assert, effectively.
    // ensureEffect($effect`Meteor Showered`);

    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject312 || (_templateObject312 = _taggedTemplateLiteral(["Bow-Legged Swagger"])))); //useFamiliar($familiar`disembodied hand`);

    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.maximize)("weapon damage", false);

    if ((0,libram__WEBPACK_IMPORTED_MODULE_7__.have)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject313 || (_templateObject313 = _taggedTemplateLiteral(["glass of raw eggs"])))) && (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myFullness)() == 4) {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.eat)(1, (0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject314 || (_templateObject314 = _taggedTemplateLiteral(["glass of raw eggs"]))));
    }

    if (weaponTurns() > targetTurns.get(TEST_WEAPON)) {
      throw "Can't achieve target turns for weapon damage test. Current: " + weaponTurns() + " Target: " + targetTurns.get(TEST_WEAPON);
    } // cli_execute('modtrace weapon damage');
    // abort();


    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setProperty)("_hccsWeaponTurnsUncapped", weaponTurns() + "");
    TEMP_TURNS = (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myTurncount)();
    doTest(TEST_WEAPON);
    WEAPON_TURNS = (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myTurncount)() - TEMP_TURNS;
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setProperty)("_hccsWeaponTurns", WEAPON_TURNS.toString());
  }
}

function testSpellDamage() {
  if (!testDone(TEST_SPELL)) {
    var spellTurns = function spellTurns() {
      return 60 - (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.floor)((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.numericModifier)("spell damage") / 50 + 0.001) - (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.floor)((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.numericModifier)("spell damage percent") / 50 + 0.001);
    };

    fightSausageIfGuaranteed(); //simmering costs a turn. remove if i manage to cap spell damage

    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject318 || (_templateObject318 = _taggedTemplateLiteral(["Simmering"]))));
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject319 || (_templateObject319 = _taggedTemplateLiteral(["Song of Sauce"]))));
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject320 || (_templateObject320 = _taggedTemplateLiteral(["Carol of the Hells"])))); //TODO: uncomment when i learn skill
    //ensureEffect($effect`Arched Eyebrow of the Archmage`);

    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureSong)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject321 || (_templateObject321 = _taggedTemplateLiteral(["Jackasses' Symphony of Destruction"], ["Jackasses\\' Symphony of Destruction"]))));

    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject322 || (_templateObject322 = _taggedTemplateLiteral(["lov elixir #6"], ["lov elixir \\#6"])))) > 0) {
      (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject323 || (_templateObject323 = _taggedTemplateLiteral(["The Magic of LOV"]))));
    } // Pool buff


    if ((0,_lib__WEBPACK_IMPORTED_MODULE_0__.getPropertyInt)("_poolGames") < 3) {
      (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject324 || (_templateObject324 = _taggedTemplateLiteral(["Mental A-cue-ity"]))));
    } // Beach Comb
    //ensureEffect($effect`We\'re All Made of Starfish`);
    // Tea party


    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureSewerItem)(1, (0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject325 || (_templateObject325 = _taggedTemplateLiteral(["mariachi hat"]))));
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject326 || (_templateObject326 = _taggedTemplateLiteral(["Full Bottle in front of Me"]))));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.useSkill)(1, (0,libram__WEBPACK_IMPORTED_MODULE_4__.$skill)(_templateObject327 || (_templateObject327 = _taggedTemplateLiteral(["Spirit of Cayenne"])))); // Get flimsy hardwood scraps.
    // visitUrl("shop.php?whichshop=lathe");
    // if (availableAmount($item`flimsy hardwood scraps`) > 0) {
    //   retrieveItem(1, $item`weeping willow wand`);
    // }

    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureItem)(1, (0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject328 || (_templateObject328 = _taggedTemplateLiteral(["obsidian nutcracker"]))));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("briefcase e spell"); // Get inner elf for spell damage
    // if (haveEffect($effect`inner elf`) === 0 && getPropertyInt("_snokebombUsed") < 3) {
    //   cliExecute("/whitelist hobopolis vacation home");
    //   ensureEffect($effect`blood bubble`);
    //   useFamiliar($familiar`machine elf`);
    //   setProperty("choiceAdventure326", "1");
    //   adventureMacro($location`The Slime Tube`, Macro.skill($skill`snokebomb`));
    //   useDefaultFamiliar();
    //   cliExecute("/whitelist alliance from hell");
    // } else {
    //   print("Something went wrong with getting inner elf");
    // }

    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myClass)() === (0,libram__WEBPACK_IMPORTED_MODULE_4__.$class)(_templateObject329 || (_templateObject329 = _taggedTemplateLiteral(["sauceror"]))) && !(0,_lib__WEBPACK_IMPORTED_MODULE_0__.getPropertyBoolean)("_barrelPrayer")) {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("barrelprayer buff");
    } // Sigils of Yeg = 200% SD


    if (!(0,_lib__WEBPACK_IMPORTED_MODULE_0__.getPropertyBoolean)("_cargoPocketEmptied") && (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.haveEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject330 || (_templateObject330 = _taggedTemplateLiteral(["Sigils of Yeg"])))) === 0) {
      if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject331 || (_templateObject331 = _taggedTemplateLiteral(["Yeg's Motel hand soap"], ["Yeg\\'s Motel hand soap"])))) === 0) (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("cargo 177");
      (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject332 || (_templateObject332 = _taggedTemplateLiteral(["Sigils of Yeg"]))));
    }

    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject333 || (_templateObject333 = _taggedTemplateLiteral(["AAA-Charged"]))));
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject334 || (_templateObject334 = _taggedTemplateLiteral(["Lantern-Charged"]))));

    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject335 || (_templateObject335 = _taggedTemplateLiteral(["Bettie page"])))) > 0) {
      (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject336 || (_templateObject336 = _taggedTemplateLiteral(["Paging Betty"]))));
    }

    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject337 || (_templateObject337 = _taggedTemplateLiteral(["Staff of the Headmaster's Victuals"]))))) {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.retrieveItem)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject338 || (_templateObject338 = _taggedTemplateLiteral(["Staff of the Headmaster's Victuals"]))));
    } //TODO: probably try a different location since we cant guarantee our familiar won;t attack
    // Meteor showered


    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.haveEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject339 || (_templateObject339 = _taggedTemplateLiteral(["Meteor Showered"])))) === 0) {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject340 || (_templateObject340 = _taggedTemplateLiteral(["Fourth of May Cosplay Saber"]))));
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject341 || (_templateObject341 = _taggedTemplateLiteral(["familiar scrapbook"]))));
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.visitUrl)("adventure.php?snarfblat=442");
      (0,_lib__WEBPACK_IMPORTED_MODULE_0__.setChoice)(1387, 3);
      (0,libram__WEBPACK_IMPORTED_MODULE_3__.adventureMacroAuto)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$location)(_templateObject342 || (_templateObject342 = _taggedTemplateLiteral(["Barf Mountain"]))), libram__WEBPACK_IMPORTED_MODULE_3__.Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_4__.$skill)(_templateObject343 || (_templateObject343 = _taggedTemplateLiteral(["Meteor Shower"])))).skill((0,libram__WEBPACK_IMPORTED_MODULE_4__.$skill)(_templateObject344 || (_templateObject344 = _taggedTemplateLiteral(["Use the Force"])))));
    }

    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setAutoAttack)(0); //useFamiliar($familiar`disembodied hand`);

    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.maximize)("spell damage", false);

    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.round)((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.numericModifier)("spell damage percent")) % 50 >= 40) {
      (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureItem)(1, (0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject345 || (_templateObject345 = _taggedTemplateLiteral(["soda water"]))));
      (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensurePotionEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject346 || (_templateObject346 = _taggedTemplateLiteral(["Concentration"]))), (0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject347 || (_templateObject347 = _taggedTemplateLiteral(["cordial of concentration"]))));
    }

    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.round)((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.numericModifier)("spell damage")) % 50 >= 39) {
      (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureItem)(1, (0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject348 || (_templateObject348 = _taggedTemplateLiteral(["vial of Gnomochloric acid"]))));
      (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensurePotionEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject349 || (_templateObject349 = _taggedTemplateLiteral(["Baconstoned"]))), (0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject350 || (_templateObject350 = _taggedTemplateLiteral(["vial of baconstone juice"]))));
    }

    while (spellTurns() > (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myAdventures)()) {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.eat)(1, (0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject351 || (_templateObject351 = _taggedTemplateLiteral(["magical sausage"]))));
    }

    if (spellTurns() > targetTurns.get(TEST_SPELL)) {
      throw "Can't achieve target turns for spell damage test. Current: " + spellTurns() + " Target: " + targetTurns.get(TEST_SPELL);
    } //cliExecute("modtrace spell damage");
    //abort();


    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setProperty)("_hccsSpellTurnsUncapped", spellTurns() + "");
    TEMP_TURNS = (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myTurncount)();
    doTest(TEST_SPELL);
    SPELL_TURNS = (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myTurncount)() - TEMP_TURNS;
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setProperty)("_hccsSpellTurns", SPELL_TURNS.toString());
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.useFamiliar)(familiarFor100Run);
  }
}

function testItemDrop() {
  if (!testDone(TEST_ITEM)) {
    var itemdrop = function itemdrop() {
      return 60 - (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.floor)((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.numericModifier)("Item Drop") / 30 + 0.001) - (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.floor)((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.numericModifier)("Booze Drop") / 15 + 0.001);
    };

    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureMpSausage)(500);
    fightSausageIfGuaranteed();

    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myInebriety)() < (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.inebrietyLimit)() - 1 && !(0,libram__WEBPACK_IMPORTED_MODULE_7__.have)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject352 || (_templateObject352 = _taggedTemplateLiteral(["Sacr\xE9 Mental"]))))) {
      (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureOde)(1);
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.drink)(1, (0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject353 || (_templateObject353 = _taggedTemplateLiteral(["Sacramento wine"]))));
    } // kramco messes up maps


    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject354 || (_templateObject354 = _taggedTemplateLiteral(["familiar scrapbook"])))); //getting a lil ninja costume for the tot

    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject355 || (_templateObject355 = _taggedTemplateLiteral(["li'l ninja costume"])))) === 0 && (0,_lib__WEBPACK_IMPORTED_MODULE_0__.getPropertyInt)("_shatteringPunchUsed") < 3) {
      libram__WEBPACK_IMPORTED_MODULE_3__.Macro.skill((0,libram__WEBPACK_IMPORTED_MODULE_4__.$skill)(_templateObject356 || (_templateObject356 = _taggedTemplateLiteral(["shattering punch"])))).setAutoAttack();
      (0,_lib__WEBPACK_IMPORTED_MODULE_0__.mapMonster)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$location)(_templateObject357 || (_templateObject357 = _taggedTemplateLiteral(["The Haiku Dungeon"]))), (0,libram__WEBPACK_IMPORTED_MODULE_4__.$monster)(_templateObject358 || (_templateObject358 = _taggedTemplateLiteral(["Amateur ninja"]))));
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setLocation)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$location)(_templateObject359 || (_templateObject359 = _taggedTemplateLiteral(["none"]))));
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setAutoAttack)(0);
    } // use abstraction: certainty if you have it
    // ensureEffect($effect`certainty`);
    // pulls wheel of fortune from deck, gets rope and wrench for later


    if ((0,_lib__WEBPACK_IMPORTED_MODULE_0__.getPropertyInt)("_deckCardsDrawn") === 10) {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("cheat buff items");
    } // get pirate DNA and make a gene tonic
    // if (get("dnaSyringe") !== "pirate" && haveEffect($effect`Human-Pirate Hybrid`) === 0) {
    //   equip($slot`acc1`, $item`Kremlin\'s Greatest Briefcase`);
    //   if (get("_kgbTranquilizerDartUses") >= 3) {
    //     error("Out of KGB banishes");
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
    //     geneTonic("pirate");
    //     ensureEffect($effect`Human-Pirate Hybrid`);
    //     setAutoAttack(0);
    //   } else throw "Something went wrong getting pirate DNA.";
    // }
    //useDefaultFamiliar();
    // if (haveEffect($effect`Bat-Adjacent Form`) === 0) {
    //   if (getPropertyInt("_reflexHammerUsed") >= 3) error("Out of reflex hammers!");
    //   equip($slot`acc3`, $item`Lil\' Doctor&trade; Bag`);
    //   equip($item`vampyric cloake`);
    //   adventureMacroAuto(
    //     $location`The Neverending Party`,
    //     Macro.skill($skill`Become a Bat`).skill($skill`Reflex Hammer`)
    //   );
    //   setAutoAttack(0);
    // }


    if (!(0,_lib__WEBPACK_IMPORTED_MODULE_0__.getPropertyBoolean)("_clanFortuneBuffUsed")) {
      (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject360 || (_templateObject360 = _taggedTemplateLiteral(["There's No N In Love"], ["There\\'s No N In Love"]))));
    }

    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject361 || (_templateObject361 = _taggedTemplateLiteral(["Fat Leon's Phat Loot Lyric"], ["Fat Leon\\'s Phat Loot Lyric"])))); //TODO: uncomment when i learn skill

    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject362 || (_templateObject362 = _taggedTemplateLiteral(["Singer's Faithful Ocelot"], ["Singer\\'s Faithful Ocelot"])))); //TODO: uncomment when i learn skill
    //ensureEffect($effect`The Spirit of Taking`);

    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject363 || (_templateObject363 = _taggedTemplateLiteral(["items.enh"])))); // synthesis: collection

    synthesisPlanner.synthesize((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject364 || (_templateObject364 = _taggedTemplateLiteral(["Synthesis: Collection"])))); // see what class we are, maybe a couple other buffs

    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myClass)() === (0,libram__WEBPACK_IMPORTED_MODULE_4__.$class)(_templateObject365 || (_templateObject365 = _taggedTemplateLiteral(["pastamancer"])))) {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("barrelprayer buff");
    } //TODO: uncomment if i buy birds
    // if (myClass() === $class`sauceror`) {
    //   useSkill(1, $skill`Seek out a Bird`); // seek out a bird
    // }
    // Use bag of grain.


    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject366 || (_templateObject366 = _taggedTemplateLiteral(["Nearly All-Natural"]))));
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject367 || (_templateObject367 = _taggedTemplateLiteral(["Feeling Lost"]))));
    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.ensureEffect)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$effect)(_templateObject368 || (_templateObject368 = _taggedTemplateLiteral(["Steely-Eyed Squint"])))); // get big smile of the blender if available, someday use this to replace something?
    // if (getPropertyInt("_campAwaySmileBuffs") === 1) {
    //   visitUrl("place.php?whichplace=campaway&action=campaway_sky");
    // }

    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.useFamiliar)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$familiar)(_templateObject369 || (_templateObject369 = _taggedTemplateLiteral(["Trick-or-Treating Tot"]))));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject370 || (_templateObject370 = _taggedTemplateLiteral(["li'l ninja costume"])))); // ninja costume for 150% item

    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.maximize)("item, 2 booze drop, -equip broken champagne bottle, -equip surprisingly capacious handbag", false);

    if (itemdrop() > targetTurns.get(TEST_ITEM)) {
      throw "Can't achieve target turns for item drop test. Current: " + itemdrop() + " Target: " + targetTurns.get(TEST_ITEM);
    } // cli_execute('modtrace item');
    // abort();


    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setProperty)("_hccsItemTurnsUncapped", itemdrop() + "");
    TEMP_TURNS = (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myTurncount)();
    doTest(TEST_ITEM);
    ITEM_TURNS = (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myTurncount)() - TEMP_TURNS;
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.useFamiliar)(familiarFor100Run);
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setProperty)("_hccsItemTurns", ITEM_TURNS.toString());
  }
}

function main() {
  var argString = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  targetTurns.set(TEST_HP, 1);
  targetTurns.set(TEST_MUS, 1);
  targetTurns.set(TEST_MYS, 1);
  targetTurns.set(TEST_MOX, 1);
  targetTurns.set(TEST_HOT_RES, 1);
  targetTurns.set(TEST_NONCOMBAT, 1);
  targetTurns.set(TEST_FAMILIAR, 31);
  targetTurns.set(TEST_WEAPON, 12);
  targetTurns.set(TEST_SPELL, 26);
  targetTurns.set(TEST_ITEM, 1);

  try {
    familiarFor100Run = (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.toFamiliar)((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.getProperty)("_hccsFamiliar"));

    if (familiarFor100Run == (0,libram__WEBPACK_IMPORTED_MODULE_4__.$familiar)(_templateObject371 || (_templateObject371 = _taggedTemplateLiteral(["none"])))) {
      if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.userConfirm)("Is " + (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myFamiliar)() + " the familiar you want?")) {
        familiarFor100Run = (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myFamiliar)();
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setProperty)("_hccsFamiliar", familiarFor100Run + "");
      } else {
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.abort)("Pick the correct familiar");
      }
    } // Don't buy stuff from NPC stores.


    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setProperty)("_saved_autoSatisfyWithNPCs", (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.getProperty)("autoSatisfyWithNPCs"));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setProperty)("autoSatisfyWithNPCs", "false"); // Do buy stuff from coinmasters (hermit).

    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setProperty)("_saved_autoSatisfyWithCoinmasters", (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.getProperty)("autoSatisfyWithCoinmasters"));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setProperty)("autoSatisfyWithCoinmasters", "true"); // Initialize council.

    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.visitUrl)("council.php");

    if ((0,libram__WEBPACK_IMPORTED_MODULE_6__.get)("backupCameraReverserEnabled") === false) {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("backupcamera reverser on");
    } // All combat handled by our consult script (hccs_combat.ash).


    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("ccs garbo"); // Turn off Lil' Doctor quests.

    (0,_lib__WEBPACK_IMPORTED_MODULE_0__.setChoice)(1340, 3); // in case you're re-running it

    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setAutoAttack)(0); // Default equipment.
    //TODO: set mode for cape and camera. perhaps modify briefcase?

    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject372 || (_templateObject372 = _taggedTemplateLiteral(["Fourth of May Cosplay Saber"]))));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject373 || (_templateObject373 = _taggedTemplateLiteral(["familiar scrapbook"])))); // equip($item[Kramco Sausage-o-Matic&trade;]);

    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("retrocape mysticality thrill");
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject374 || (_templateObject374 = _taggedTemplateLiteral(["unwrapped knock-off retro superhero cape"]))));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject375 || (_templateObject375 = _taggedTemplateLiteral(["Cargo Cultist Shorts"]))));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$slot)(_templateObject376 || (_templateObject376 = _taggedTemplateLiteral(["acc1"]))), (0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject377 || (_templateObject377 = _taggedTemplateLiteral(["your cowboy boots"]))));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$slot)(_templateObject378 || (_templateObject378 = _taggedTemplateLiteral(["acc2"]))), (0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject379 || (_templateObject379 = _taggedTemplateLiteral(["Kremlin's Greatest Briefcase"]))));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.equip)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$slot)(_templateObject380 || (_templateObject380 = _taggedTemplateLiteral(["acc3"]))), (0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject381 || (_templateObject381 = _taggedTemplateLiteral(["backup camera"]))));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.useFamiliar)(familiarFor100Run); //TODO: mummery?

    testCoilWire();
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
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("mood default");
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("ccs default");
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("boombox food");
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("/whitelist Reddit United");
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.visitUrl)("peevpee.php?action=smashstone&confirm=on");
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.print)("Stone smashed. Get your PVP on!", "green"); // spar for 6 fights

    if ((0,libram__WEBPACK_IMPORTED_MODULE_6__.get)("_daycareRecruits") === 0 && (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.hippyStoneBroken)() === true) {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.visitUrl)("place.php?whichplace=town_wrong&action=townwrong_boxingdaycare");
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.runChoice)(3);
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.runChoice)(1);
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.runChoice)(4);
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.runChoice)(5);
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.runChoice)(4);
    }

    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.cliExecute)("pvp fame select");
  } finally {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setProperty)("autoSatisfyWithNPCs", "true");
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setProperty)("autoSatisfyWithCoinmasters", (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.getProperty)("_saved_autoSatisfyWithCoinmasters"));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.setProperty)("hpAutoRecovery", "0.8"); //useFamiliar(familiarFor100Run);

    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.print)("This loop took " + ((0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.gametimeToInt)() - START_TIME) / 1000 + " seconds, for a 1 day, " + (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myTurncount)() + " turn HCCS run. Organ use was " + (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myFullness)() + "/" + (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.myInebriety)() + "/" + (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.mySpleenUse)() + ". I drank " + (6 - (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_4__.$item)(_templateObject382 || (_templateObject382 = _taggedTemplateLiteral(["astral pilsner"]))))) + " Astral Pilsners.", "green");
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.print)("HP test: " + (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.getProperty)("_hccsHpTurns"), "green");
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.print)("Muscle test: " + (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.getProperty)("_hccsMusTurns"), "green");
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.print)("Myst test: " + (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.getProperty)("_hccsMysTurns"), "green");
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.print)("Moxie test: " + (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.getProperty)("_hccsMoxTurns"), "green");
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.print)("Hot Res test: " + (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.getProperty)("_hccsHotResTurns"), "green");
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.print)("Noncombat test: " + (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.getProperty)("_hccsNonCombatTurns"), "green");
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.print)("Fam Weight test: " + (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.getProperty)("_hccsFamiliarTurns"), "green");
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.print)("Weapon Damage test: " + (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.getProperty)("_hccsWeaponTurns"), "green");
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.print)("Spell Damage Test: " + (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.getProperty)("_hccsSpellTurns"), "green");
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.print)("Item Drop test: " + (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.getProperty)("_hccsItemTurns"), "green");
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.print)("--------Uncapped turns--------", "green");
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.print)("HP test: " + (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.getProperty)("_hccsHpTurnsUncapped"), "green");
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.print)("Muscle test: " + (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.getProperty)("_hccsMusTurnsUncapped"), "green");
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.print)("Myst test: " + (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.getProperty)("_hccsMysTurnsUncapped"), "green");
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.print)("Moxie test: " + (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.getProperty)("_hccsMoxTurnsUncapped"), "green");
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.print)("Hot Res test: " + (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.getProperty)("_hccsHotResTurnsUncapped"), "green");
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.print)("Noncombat test: " + (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.getProperty)("_hccsNonCombatTurnsUncapped"), "green");
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.print)("Fam Weight test: " + (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.getProperty)("_hccsFamiliarTurnsUncapped"), "green");
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.print)("Weapon Damage test: " + (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.getProperty)("_hccsWeaponTurnsUncapped"), "green");
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.print)("Spell Damage Test: " + (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.getProperty)("_hccsSpellTurnsUncapped"), "green");
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.print)("Item Drop test: " + (0,kolmafia__WEBPACK_IMPORTED_MODULE_1__.getProperty)("_hccsItemTurnsUncapped"), "green");
  }
}

/***/ }),

/***/ "./src/hccsLibrams.ts":
/*!****************************!*\
  !*** ./src/hccsLibrams.ts ***!
  \****************************/
/*! namespace exports */
/*! exports [not provided] [maybe used in hccsLibrams (runtime-defined)] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! kolmafia */ "kolmafia");
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(kolmafia__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! libram */ "./node_modules/libram/dist/template-string.js");
/* harmony import */ var _hccs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hccs */ "./src/hccs.ts");
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }





function nextLibramCost() {
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.mpCost)((0,libram__WEBPACK_IMPORTED_MODULE_2__.$skill)(_templateObject || (_templateObject = _taggedTemplateLiteral(["Summon BRICKOs"]))));
}

function castBestLibram() {
  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_2__.$item)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["green candy heart"])))) < 1 && !(0,_hccs__WEBPACK_IMPORTED_MODULE_1__.testDone)(5)) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.useSkill)((0,libram__WEBPACK_IMPORTED_MODULE_2__.$skill)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["summon candy heart"]))));
  } else if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_2__.$item)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["love song of icy revenge"])))) < 2 && !(0,_hccs__WEBPACK_IMPORTED_MODULE_1__.testDone)(5)) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.useSkill)((0,libram__WEBPACK_IMPORTED_MODULE_2__.$skill)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["summon love song"]))));
  } else if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_2__.$item)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["lavendar candy heart"])))) < 1 && !(0,_hccs__WEBPACK_IMPORTED_MODULE_1__.testDone)(9)) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.useSkill)((0,libram__WEBPACK_IMPORTED_MODULE_2__.$skill)(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["summon candy heart"]))));
  } else if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_2__.$item)(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["love song of icy revenge"])))) < 3 && !(0,_hccs__WEBPACK_IMPORTED_MODULE_1__.testDone)(5)) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.useSkill)((0,libram__WEBPACK_IMPORTED_MODULE_2__.$skill)(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["summon love song"]))));
  } else {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.useSkill)((0,libram__WEBPACK_IMPORTED_MODULE_2__.$skill)(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["summon divine favor"]))));
  }
}

while ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myMp)() / (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myMaxmp)() > 0.2 && nextLibramCost() <= (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myMp)()) {
  castBestLibram();
}

/***/ }),

/***/ "./src/lib.ts":
/*!********************!*\
  !*** ./src/lib.ts ***!
  \********************/
/*! namespace exports */
/*! export ensureAsdonEffect [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ensureCreateItem [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ensureDough [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ensureEffect [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ensureHermitItem [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ensureItem [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ensureMpSausage [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ensureMpTonic [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ensureNpcEffect [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ensureOde [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ensurePotionEffect [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ensurePullEffect [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ensureSewerItem [provided] [no usage info] [missing usage info prevents renaming] */
/*! export ensureSong [provided] [no usage info] [missing usage info prevents renaming] */
/*! export fuelAsdon [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getPropertyBoolean [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getPropertyInt [provided] [no usage info] [missing usage info prevents renaming] */
/*! export incrementProperty [provided] [no usage info] [missing usage info prevents renaming] */
/*! export itemPriority [provided] [no usage info] [missing usage info prevents renaming] */
/*! export kill [provided] [no usage info] [missing usage info prevents renaming] */
/*! export mapMonster [provided] [no usage info] [missing usage info prevents renaming] */
/*! export myFamiliarWeight [provided] [no usage info] [missing usage info prevents renaming] */
/*! export openSongSlot [provided] [no usage info] [missing usage info prevents renaming] */
/*! export pullIfPossible [provided] [no usage info] [missing usage info prevents renaming] */
/*! export sausageFightGuaranteed [provided] [no usage info] [missing usage info prevents renaming] */
/*! export setChoice [provided] [no usage info] [missing usage info prevents renaming] */
/*! export setClan [provided] [no usage info] [missing usage info prevents renaming] */
/*! export setPropertyInt [provided] [no usage info] [missing usage info prevents renaming] */
/*! export shrug [provided] [no usage info] [missing usage info prevents renaming] */
/*! export tryEquip [provided] [no usage info] [missing usage info prevents renaming] */
/*! export tryUse [provided] [no usage info] [missing usage info prevents renaming] */
/*! export wishEffect [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getPropertyInt": () => /* binding */ getPropertyInt,
/* harmony export */   "setPropertyInt": () => /* binding */ setPropertyInt,
/* harmony export */   "incrementProperty": () => /* binding */ incrementProperty,
/* harmony export */   "getPropertyBoolean": () => /* binding */ getPropertyBoolean,
/* harmony export */   "setChoice": () => /* binding */ setChoice,
/* harmony export */   "myFamiliarWeight": () => /* binding */ myFamiliarWeight,
/* harmony export */   "ensureItem": () => /* binding */ ensureItem,
/* harmony export */   "ensureCreateItem": () => /* binding */ ensureCreateItem,
/* harmony export */   "ensureSewerItem": () => /* binding */ ensureSewerItem,
/* harmony export */   "ensureHermitItem": () => /* binding */ ensureHermitItem,
/* harmony export */   "ensureNpcEffect": () => /* binding */ ensureNpcEffect,
/* harmony export */   "ensurePotionEffect": () => /* binding */ ensurePotionEffect,
/* harmony export */   "ensureEffect": () => /* binding */ ensureEffect,
/* harmony export */   "ensureMpTonic": () => /* binding */ ensureMpTonic,
/* harmony export */   "ensureMpSausage": () => /* binding */ ensureMpSausage,
/* harmony export */   "sausageFightGuaranteed": () => /* binding */ sausageFightGuaranteed,
/* harmony export */   "itemPriority": () => /* binding */ itemPriority,
/* harmony export */   "setClan": () => /* binding */ setClan,
/* harmony export */   "ensureDough": () => /* binding */ ensureDough,
/* harmony export */   "fuelAsdon": () => /* binding */ fuelAsdon,
/* harmony export */   "ensureAsdonEffect": () => /* binding */ ensureAsdonEffect,
/* harmony export */   "mapMonster": () => /* binding */ mapMonster,
/* harmony export */   "tryUse": () => /* binding */ tryUse,
/* harmony export */   "tryEquip": () => /* binding */ tryEquip,
/* harmony export */   "wishEffect": () => /* binding */ wishEffect,
/* harmony export */   "pullIfPossible": () => /* binding */ pullIfPossible,
/* harmony export */   "ensurePullEffect": () => /* binding */ ensurePullEffect,
/* harmony export */   "shrug": () => /* binding */ shrug,
/* harmony export */   "openSongSlot": () => /* binding */ openSongSlot,
/* harmony export */   "ensureSong": () => /* binding */ ensureSong,
/* harmony export */   "ensureOde": () => /* binding */ ensureOde,
/* harmony export */   "kill": () => /* binding */ kill
/* harmony export */ });
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! kolmafia */ "kolmafia");
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(kolmafia__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! libram */ "./node_modules/libram/dist/template-string.js");
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! libram */ "./node_modules/libram/dist/combat.js");
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14, _templateObject15, _templateObject16, _templateObject17, _templateObject18, _templateObject19, _templateObject20, _templateObject21, _templateObject22, _templateObject23, _templateObject24, _templateObject25, _templateObject26, _templateObject27, _ref, _templateObject28, _templateObject29, _templateObject30, _templateObject31, _templateObject32, _templateObject33, _templateObject34, _templateObject35, _templateObject36;

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }



function getPropertyInt(name) {
  var str = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getProperty)(name);

  if (str === "") {
    throw "Unknown property ".concat(name, ".");
  }

  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.toInt)(str);
}
function setPropertyInt(name, value) {
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.setProperty)(name, "".concat(value));
}
function incrementProperty(name) {
  setPropertyInt(name, getPropertyInt(name) + 1);
}
function getPropertyBoolean(name) {
  var str = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getProperty)(name);

  if (str === "") {
    throw "Unknown property ".concat(name, ".");
  }

  return str === "true";
}
function setChoice(adv, choice) {
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.setProperty)("choiceAdventure".concat(adv), "".concat(choice));
}
function myFamiliarWeight() {
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.familiarWeight)((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myFamiliar)()) + (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.weightAdjustment)();
}
function ensureItem(quantity, it) {
  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)(it) < quantity) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.buy)(quantity - (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)(it), it);
  }

  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)(it) < quantity) {
    throw "Could not buy ".concat(quantity, " of item ").concat(it.name, ": only ").concat((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)(it), ".");
  }
}
function ensureCreateItem(quantity, it) {
  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)(it) < quantity) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.create)(quantity - (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)(it), it);
  }

  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)(it) < quantity) {
    throw "Could not create item.";
  }
}
function ensureSewerItem(quantity, it) {
  while ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)(it) < quantity) {
    ensureItem(1, (0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject || (_templateObject = _taggedTemplateLiteral(["chewing gum on a string"]))));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.use)(1, (0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["chewing gum on a string"]))));
  }
}
function ensureHermitItem(quantity, it) {
  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)(it) >= quantity) {
    return;
  }

  var count = quantity - (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)(it);

  while ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["worthless trinket"])))) + (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["worthless gewgaw"])))) + (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["worthless knick-knack"])))) < count) {
    ensureItem(1, (0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["chewing gum on a string"]))));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.use)(1, (0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["chewing gum on a string"]))));
  }

  ensureItem(1, (0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["hermit permit"]))));
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.retrieveItem)(count, it);
}
function ensureNpcEffect(ef, quantity, potion) {
  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveEffect)(ef) === 0) {
    ensureItem(quantity, potion);

    if (!(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)(ef["default"]) || (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveEffect)(ef) === 0) {
      throw "Failed to get effect ".concat(ef.name);
    }
  } else {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("Already have effect ".concat(ef.name, "."));
  }
}
function ensurePotionEffect(ef, potion) {
  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveEffect)(ef) === 0) {
    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)(potion) === 0) {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.create)(1, potion);
    }

    if (!(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)(ef["default"]) || (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveEffect)(ef) === 0) {
      throw 'Failed to get effect " + ef.name + ".';
    }
  } else {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("Already have effect ".concat(ef.name, "."));
  }
}
function ensureEffect(ef) {
  var turns = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveEffect)(ef) < turns) {
    if (!(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)(ef["default"]) || (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveEffect)(ef) === 0) {
      throw 'Failed to get effect ' + ef.name + '.';
    }
  } else {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("Already have effect ".concat(ef.name, "."));
  }
}
function ensureMpTonic(mp) {
  while ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myMp)() < mp) {
    ensureItem(1, (0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["Doc Galaktik's Invigorating Tonic"]))));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.use)(1, (0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["Doc Galaktik's Invigorating Tonic"]))));
  }
}
function ensureMpSausage(mp) {
  while ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myMp)() < Math.min(mp, (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myMaxmp)())) {
    ensureCreateItem(1, (0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral(["magical sausage"]))));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.eat)(1, (0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject12 || (_templateObject12 = _taggedTemplateLiteral(["magical sausage"]))));
  }
}
function sausageFightGuaranteed() {
  var goblinsFought = getPropertyInt("_sausageFights");
  var nextGuaranteed = getPropertyInt("_lastSausageMonsterTurn") + 4 + goblinsFought * 3 + Math.pow(Math.max(0, goblinsFought - 5), 3);
  return goblinsFought === 0 || (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.totalTurnsPlayed)() >= nextGuaranteed;
}
function itemPriority() {
  var _items$find;

  for (var _len = arguments.length, items = new Array(_len), _key = 0; _key < _len; _key++) {
    items[_key] = arguments[_key];
  }

  return (_items$find = items.find(function (item) {
    return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)(item) > 0;
  })) !== null && _items$find !== void 0 ? _items$find : items[items.length - 1];
}
function setClan(target) {
  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getClanName)() !== target) {
    var clanCache = JSON.parse((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getProperty)("hccs_clanCache") || "{}");

    if (clanCache.target === undefined) {
      var recruiter = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)("clan_signup.php");
      var clanRe = /<option value=([0-9]+)>([^<]+)<\/option>/g;
      var match;

      while ((match = clanRe.exec(recruiter)) !== null) {
        clanCache[match[2]] = match[1];
      }
    }

    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.setProperty)("hccs_clanCache", JSON.stringify(clanCache));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)("showclan.php?whichclan=".concat(clanCache[target], "&action=joinclan&confirm=on&pwd"));

    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getClanName)() !== target) {
      throw "failed to switch clans to ".concat(target, ". Did you spell it correctly? Are you whitelisted?");
    }
  }

  return true;
}
function ensureDough(goal) {
  while ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject13 || (_templateObject13 = _taggedTemplateLiteral(["wad of dough"])))) < goal) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.buy)(1, (0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject14 || (_templateObject14 = _taggedTemplateLiteral(["all-purpose flower"]))));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.use)(1, (0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject15 || (_templateObject15 = _taggedTemplateLiteral(["all-purpose flower"]))));
  }
}
function fuelAsdon(goal) {
  var startingFuel = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getFuel)();
  if (startingFuel > goal) return startingFuel;
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("Fueling asdon. Currently ".concat(startingFuel, " litres."));
  var estimated = Math.floor((goal - startingFuel) / 5);
  var bread = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject16 || (_templateObject16 = _taggedTemplateLiteral(["loaf of soda bread"]))));
  ensureDough(estimated - bread);
  ensureItem(estimated - bread, (0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject17 || (_templateObject17 = _taggedTemplateLiteral(["soda water"]))));
  ensureCreateItem(estimated, (0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject18 || (_templateObject18 = _taggedTemplateLiteral(["loaf of soda bread"]))));
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)("asdonmartin fuel ".concat(estimated, " loaf of soda bread"));

  while ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getFuel)() < goal) {
    ensureDough(1);
    ensureItem(1, (0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject19 || (_templateObject19 = _taggedTemplateLiteral(["soda water"]))));
    ensureCreateItem(1, (0,libram__WEBPACK_IMPORTED_MODULE_1__.$item)(_templateObject20 || (_templateObject20 = _taggedTemplateLiteral(["loaf of soda bread"]))));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)("asdonmartin fuel 1 loaf of soda bread");
  }

  var endingFuel = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getFuel)();
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("Done fueling. Now ".concat(endingFuel, " litres."));
  return endingFuel;
}
function ensureAsdonEffect(ef) {
  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveEffect)(ef) === 0) {
    fuelAsdon(37);
  }

  ensureEffect(ef);
}
function mapMonster(location, monster) {
  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveSkill)((0,libram__WEBPACK_IMPORTED_MODULE_1__.$skill)(_templateObject21 || (_templateObject21 = _taggedTemplateLiteral(["Map the Monsters"])))) && !getPropertyBoolean("mappingMonsters") && getPropertyInt("_monstersMapped") < 3) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.useSkill)((0,libram__WEBPACK_IMPORTED_MODULE_1__.$skill)(_templateObject22 || (_templateObject22 = _taggedTemplateLiteral(["Map the Monsters"]))));
  }

  if (!getPropertyBoolean("mappingMonsters")) throw "Failed to setup Map the Monsters.";
  var mapPage = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.toUrl)(location), false, true);
  if (!mapPage.includes("Leading Yourself Right to Them")) throw "Something went wrong mapping.";
  var fightPage = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)("choice.php?pwd&whichchoice=1435&option=1&heyscriptswhatsupwinkwink=".concat(monster.id));
  if (!fightPage.includes("You're fighting") && (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.myLocation)() !== (0,libram__WEBPACK_IMPORTED_MODULE_1__.$location)(_templateObject23 || (_templateObject23 = _taggedTemplateLiteral(["the haiku dungeon"])))) throw "Something went wrong starting the fight.";
}
function tryUse(quantity, it) {
  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)(it) > 0) {
    return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.use)(quantity, it);
  } else {
    return false;
  }
}
function tryEquip(it) {
  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)(it) > 0) {
    return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.equip)(it);
  } else {
    return false;
  }
}
function wishEffect(ef) {
  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveEffect)(ef) === 0) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)("genie effect ".concat(ef.name));
  } else {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("Already have effect ".concat(ef.name, "."));
  }
}
function pullIfPossible(quantity, it, maxPrice) {
  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.pullsRemaining)() > 0) {
    var quantityPull = Math.max(0, quantity - (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)(it));

    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.shopAmount)(it) > 0) {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.takeShop)(Math.min((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.shopAmount)(it), quantityPull), it);
    }

    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.storageAmount)(it) < quantityPull) {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.buyUsingStorage)(quantityPull - (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.storageAmount)(it), it, maxPrice);
    }

    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)("pull ".concat(quantityPull, " ").concat(it.name));
    return true;
  } else return false;
}
function ensurePullEffect(ef, it) {
  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveEffect)(ef) === 0) {
    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)(it) > 0 || pullIfPossible(1, it, 50000)) ensureEffect(ef);
  }
}
function shrug(ef) {
  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveEffect)(ef) > 0) {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)("shrug ".concat(ef.name));
  }
} // We have Stevedave's, Ur-Kel's on at all times during leveling (managed via mood); third and fourth slots are variable.

var songSlots = [(0,libram__WEBPACK_IMPORTED_MODULE_1__.$effects)(_templateObject24 || (_templateObject24 = _taggedTemplateLiteral(["Stevedave's Shanty of Superiority"]))), (0,libram__WEBPACK_IMPORTED_MODULE_1__.$effects)(_templateObject25 || (_templateObject25 = _taggedTemplateLiteral(["Ur-Kel's Aria of Annoyance"]))), (0,libram__WEBPACK_IMPORTED_MODULE_1__.$effects)(_templateObject26 || (_templateObject26 = _taggedTemplateLiteral(["Power Ballad of the Arrowsmith, The Magical Mojomuscular Melody, The Moxious Madrigal, Ode to Booze, Jackasses' Symphony of Destruction"]))), (0,libram__WEBPACK_IMPORTED_MODULE_1__.$effects)(_templateObject27 || (_templateObject27 = _taggedTemplateLiteral(["Carlweather's Cantata of Confrontation, The Sonata of Sneakiness, Fat Leon's Phat Loot Lyric, Polka of Plenty"])))];

var allKnownSongs = (_ref = []).concat.apply(_ref, songSlots);

var allSongs = Skill.all().filter(function (skill) {
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.toString)(skill["class"]) === "Accordion Thief" && skill.buff;
}).map(function (skill) {
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.toEffect)(skill);
});
function openSongSlot(song) {
  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveEffect)(song)) return;

  var _iterator = _createForOfIteratorHelper(songSlots),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var songSlot = _step.value;

      if (songSlot.includes(song)) {
        var _iterator3 = _createForOfIteratorHelper(songSlot),
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

  var _iterator2 = _createForOfIteratorHelper(allSongs),
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
  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveEffect)(ef) === 0) {
    openSongSlot(ef);

    if (!(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)(ef["default"]) || (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveEffect)(ef) === 0) {
      throw "Failed to get effect ".concat(ef.name);
    }
  } else {
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("Already have effect ".concat(ef.name, "."));
  }
}
function ensureOde(turns) {
  while ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveEffect)((0,libram__WEBPACK_IMPORTED_MODULE_1__.$effect)(_templateObject28 || (_templateObject28 = _taggedTemplateLiteral(["Ode to Booze"])))) < turns) {
    ensureMpTonic(50);
    openSongSlot((0,libram__WEBPACK_IMPORTED_MODULE_1__.$effect)(_templateObject29 || (_templateObject29 = _taggedTemplateLiteral(["Ode to Booze"]))));
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.useSkill)(1, (0,libram__WEBPACK_IMPORTED_MODULE_1__.$skill)(_templateObject30 || (_templateObject30 = _taggedTemplateLiteral(["The Ode to Booze"]))));
  }
}
function kill() {
  return libram__WEBPACK_IMPORTED_MODULE_2__.Macro.trySkill((0,libram__WEBPACK_IMPORTED_MODULE_1__.$skill)(_templateObject31 || (_templateObject31 = _taggedTemplateLiteral(["Curse of Weaksauce"])))).trySkill((0,libram__WEBPACK_IMPORTED_MODULE_1__.$skill)(_templateObject32 || (_templateObject32 = _taggedTemplateLiteral(["Micrometeorite"])))).trySkill((0,libram__WEBPACK_IMPORTED_MODULE_1__.$skill)(_templateObject33 || (_templateObject33 = _taggedTemplateLiteral(["Sing Along"])))).trySkill((0,libram__WEBPACK_IMPORTED_MODULE_1__.$skill)(_templateObject34 || (_templateObject34 = _taggedTemplateLiteral(["Stuffed Mortar Shell"])))).trySkill((0,libram__WEBPACK_IMPORTED_MODULE_1__.$skill)(_templateObject35 || (_templateObject35 = _taggedTemplateLiteral(["Saucestorm"])))).trySkillRepeat((0,libram__WEBPACK_IMPORTED_MODULE_1__.$skill)(_templateObject36 || (_templateObject36 = _taggedTemplateLiteral(["Saucegeyser"])))).attack();
}

/***/ }),

/***/ "./src/synthesis.ts":
/*!**************************!*\
  !*** ./src/synthesis.ts ***!
  \**************************/
/*! namespace exports */
/*! export SynthesisPlanner [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SynthesisPlanner": () => /* binding */ SynthesisPlanner
/* harmony export */ });
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! kolmafia */ "kolmafia");
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(kolmafia__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var libram__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! libram */ "./node_modules/libram/dist/template-string.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib */ "./src/lib.ts");
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }




var npcCandies = (0,libram__WEBPACK_IMPORTED_MODULE_2__.$items)(_templateObject || (_templateObject = _taggedTemplateLiteral(["jaba&ntilde;ero-flavored chewing gum, lime-and-chile-flavored chewing gum, pickle-flavored chewing gum, tamarind-flavored chewing gum"])));

function addNumericMapTo(base, addition) {
  var _iterator = _createForOfIteratorHelper(addition),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _base$get;

      var _step$value = _slicedToArray(_step.value, 2),
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
  var _iterator2 = _createForOfIteratorHelper(subtraction),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var _base$get2;

      var _step2$value = _slicedToArray(_step2.value, 2),
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
    _classCallCheck(this, SynthesisPlanner);

    _defineProperty(this, "plan", void 0);

    _defineProperty(this, "simple", new Map());

    _defineProperty(this, "complex", new Map());

    _defineProperty(this, "used", new Map());

    _defineProperty(this, "depth", 0);

    this.plan = plan;
  }

  _createClass(SynthesisPlanner, [{
    key: "synthesize",
    value: function synthesize(effect) {
      var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.haveEffect)(effect) > 0) {
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("Already have effect ".concat(effect.name, "."));
        return;
      }

      this.simple.clear();
      this.complex.clear();
      this.used.clear();
      this.depth = 0;
      var inventory = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getInventory)();

      for (var _i2 = 0, _Object$keys = Object.keys(inventory); _i2 < _Object$keys.length; _i2++) {
        var itemName = _Object$keys[_i2];
        var item = Item.get(itemName);
        var count = inventory[itemName];
        if (item.candyType === 'simple' || item === (0,libram__WEBPACK_IMPORTED_MODULE_2__.$item)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["Chubby and Plump bar"])))) this.simple.set(item, count);
        if (item.candyType === 'complex') this.complex.set(item, count);
      }

      if (['Wombat', 'Blender', 'Packrat'].includes((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.mySign)()) && (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_2__.$item)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["bitchin' meatcar"])))) + (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)((0,libram__WEBPACK_IMPORTED_MODULE_2__.$item)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["Desert Bus pass"])))) > 0) {
        var _iterator3 = _createForOfIteratorHelper(npcCandies),
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
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("".concat(effect, " remaining plan: ").concat(remainingPlan));
      var firstStep = this.synthesizeInternal(remainingPlan, new Map());

      if (firstStep !== null) {
        var _firstStep = _slicedToArray(firstStep, 2),
            formA = _firstStep[0],
            formB = _firstStep[1];

        var _iterator4 = _createForOfIteratorHelper(firstStep),
            _step4;

        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            var _candy = _step4.value;

            if (npcCandies.includes(_candy)) {
              (0,_lib__WEBPACK_IMPORTED_MODULE_1__.ensureItem)(formA === formB ? 2 : 1, _candy);
            } else {
              (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.retrieveItem)(formA === formB ? 2 : 1, _candy);
            }
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }

        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.sweetSynthesis)(formA, formB);
      } else {
        throw "Failed to synthesisze effect ".concat(effect.name, ". Please plan it out and re-run me.");
      }
    }
  }, {
    key: "getCandyOptions",
    value: function getCandyOptions(effect) {
      if ((0,libram__WEBPACK_IMPORTED_MODULE_2__.$effects)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["Synthesis: Hot, Synthesis: Cold, Synthesis: Pungent, Synthesis: Scary, Synthesis: Greasy"]))).includes(effect)) {
        return [this.simple, this.simple];
      } else if ((0,libram__WEBPACK_IMPORTED_MODULE_2__.$effects)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["Synthesis: Strong, Synthesis: Smart, Synthesis: Cool, Synthesis: Hardy, Synthesis: Energy"]))).includes(effect)) {
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
          _this$getCandyOptions2 = _slicedToArray(_this$getCandyOptions, 2),
          optionsA = _this$getCandyOptions2[0],
          optionsB = _this$getCandyOptions2[1];

      var _iterator5 = _createForOfIteratorHelper(optionsA),
          _step5;

      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var _this$used$get;

          var _step5$value = _slicedToArray(_step5.value, 2),
              itemA = _step5$value[0],
              rawCountA = _step5$value[1];

          var countA = rawCountA - ((_this$used$get = this.used.get(itemA)) !== null && _this$used$get !== void 0 ? _this$used$get : 0);
          if (countA <= 0) continue;

          var _iterator6 = _createForOfIteratorHelper(candyForms(itemA)),
              _step6;

          try {
            for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
              var formA = _step6.value;

              var _iterator7 = _createForOfIteratorHelper(optionsB),
                  _step7;

              try {
                for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
                  var _this$used$get2;

                  var _step7$value = _slicedToArray(_step7.value, 2),
                      itemB = _step7$value[0],
                      rawCountB = _step7$value[1];

                  var countB = rawCountB - ((_this$used$get2 = this.used.get(itemB)) !== null && _this$used$get2 !== void 0 ? _this$used$get2 : 0) - (itemA === itemB ? 1 : 0);
                  if (countB <= 0) continue;

                  var _iterator8 = _createForOfIteratorHelper(candyForms(itemB)),
                      _step8;

                  try {
                    for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
                      var formB = _step8.value;
                      if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.sweetSynthesisResult)(formA, formB) !== effect) continue;
                      var prefix = new Array(this.depth).fill('>').join('');
                      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("".concat(prefix, " Testing pair < ").concat(formA.name, " / ").concat(formB.name, " > for ").concat(effect, "."));
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
var CANDY_FORMS = new Map([[(0,libram__WEBPACK_IMPORTED_MODULE_2__.$item)(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["peppermint sprout"]))), (0,libram__WEBPACK_IMPORTED_MODULE_2__.$items)(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["peppermint sprout, peppermint twist"])))]]);

function candyForms(candy) {
  var _CANDY_FORMS$get;

  return (_CANDY_FORMS$get = CANDY_FORMS.get(candy)) !== null && _CANDY_FORMS$get !== void 0 ? _CANDY_FORMS$get : [candy];
}

/***/ }),

/***/ "kolmafia":
/*!***************************!*\
  !*** external "kolmafia" ***!
  \***************************/
/*! dynamic exports */
/*! export __esModule [maybe provided (runtime-defined)] [no usage info] [provision prevents renaming (no use info)] */
/*! other exports [maybe provided (runtime-defined)] [no usage info] */
/*! runtime requirements: module */
/***/ ((module) => {

module.exports = require("kolmafia");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
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
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__("./src/hccsLibrams.ts");
/******/ })()

));