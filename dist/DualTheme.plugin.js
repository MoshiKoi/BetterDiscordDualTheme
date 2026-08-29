/**
 * @name DualThemes
 * @author MoshKoi
 * @authorLink https://github.com/MoshiKoi
 * @description Automatically switch between light and dark themes
 * @version 1.0.0
 * @source https://github.com/MoshiKoi/BetterDiscordDualTheme
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	const __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	// define getter/value functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop));
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ 	
/************************************************************************/
let __webpack_exports__ = {};
/*!*********************************!*\
  !*** ./src/DualTheme.plugin.ts ***!
  \*********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DualThemePlugin)
/* harmony export */ });
class DualThemePlugin {
    #bdApi = new BdApi("DualTheme");
    get #lightTheme() { return this.#bdApi.Data.load("lightTheme"); }
    set #lightTheme(value) { this.#bdApi.Data.save("lightTheme", value); }
    get #darkTheme() { return this.#bdApi.Data.load("darkTheme"); }
    set #darkTheme(value) { this.#bdApi.Data.save("darkTheme", value); }
    #preference = window.matchMedia("(prefers-color-scheme: light)");
    #listener = this.#onChange.bind(this);
    start() {
        this.#preference.addEventListener('change', this.#listener);
    }
    stop() {
        this.#preference.removeEventListener('change', this.#listener);
    }
    getSettingsPanel() {
        const themes = BdApi.Themes.getAll().filter(x => x != undefined);
        const lightThemeSetting = {
            id: "lightTheme",
            name: "Light Theme",
            type: "dropdown",
            options: themes.map(x => ({ label: x.name, value: x.id })),
            value: this.#lightTheme
        };
        const darkThemeSetting = {
            id: "darkTheme",
            name: "Dark Theme",
            type: "dropdown",
            options: themes.map(x => ({ label: x.name, value: x.id })),
            value: this.#darkTheme
        };
        return BdApi.UI.buildSettingsPanel({
            settings: [lightThemeSetting, darkThemeSetting],
            onChange: (_, id, value) => {
                switch (id) {
                    case "lightTheme":
                        this.#lightTheme = value;
                        break;
                    case "darkTheme":
                        this.#darkTheme = value;
                        break;
                }
                this.#onChange();
            }
        });
    }
    #onChange() {
        for (const theme of BdApi.Themes.getAll()) {
            if (theme && BdApi.Themes.isEnabled(theme.id)) {
                BdApi.Themes.disable(theme.id);
            }
        }
        if (this.#preference.matches) {
            if (this.#lightTheme) {
                BdApi.Themes.enable(this.#lightTheme);
            }
        }
        else {
            if (this.#darkTheme) {
                BdApi.Themes.enable(this.#darkTheme);
            }
        }
    }
}

module.exports = __webpack_exports__["default"];
/******/ })()
;