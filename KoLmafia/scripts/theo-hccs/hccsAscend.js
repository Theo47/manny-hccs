(function(e, a) { for(var i in a) e[i] = a[i]; if(a.__esModule) Object.defineProperty(e, "__esModule", { value: true }); }(exports,
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/hccsAscend.ts":
/*!***************************!*\
  !*** ./src/hccsAscend.ts ***!
  \***************************/
/*! namespace exports */
/*! exports [not provided] [maybe used in hccsAscend (runtime-defined)] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! kolmafia */ "kolmafia");
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(kolmafia__WEBPACK_IMPORTED_MODULE_0__);

// if (getWorkshed() !== $item`little geneticist DNA-splicing lab`) {
//   throw "You have the wrong workshed item";
// }
// if (myGardenType() != "peppermint") {
//   throw "You have the wrong garden";
// }
(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("you're about to ascend! wait, is that good?", "green"); // add in checks for chateau and boots, chateau mob has a pref, dunno about the rest
// const pg = visitUrl("charpane.php");
// if (!containsText(visitUrl("charpane.php"), "Astral Spirit"))
//   visitUrl("ascend.php?action=ascend&confirm=on&confirm2=on");
// if (!containsText(visitUrl("charpane.php"), "Astral Spirit")) throw "Failed to ascend.";
// visitUrl("afterlife.php?action=pearlygates");

(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)("afterlife.php?action=buydeli&whichitem=5046"); //astral pilsners

(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)("afterlife.php?action=buyarmory&whichitem=5040"); //astral pet sweater
//userConfirm("Are you sure you want to ascend? No skills to perm?");

(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)( //"afterlife.php?action=ascend&confirmascend=1&whichsign=2&gender=1&whichclass=4&whichpath=25&asctype=3&nopetok=1&noskillsok=1&pwd",
"afterlife.php?action=ascend&confirmascend=1&whichsign=8&gender=1&whichclass=4&whichpath=25&asctype=3&pwd", true);

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
/******/ 	return __webpack_require__("./src/hccsAscend.ts");
/******/ })()

));