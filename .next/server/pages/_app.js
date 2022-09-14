"use strict";
(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 813:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _app)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "@chakra-ui/react"
var react_ = __webpack_require__(930);
;// CONCATENATED MODULE: ./styles/theme.js

const customTheme = (0,react_.extendTheme)({
    ...react_.theme,
    initialColorMode: 'light',
    useSystemColorMode: true,
    styles: {
        global: (props)=>({
                'html, body': {
                    fontSize: 'md',
                    color: props.colorMode === 'dark' ? 'white' : 'gray.600',
                    lineHeight: 'tall'
                },
                a: {
                    color: props.colorMode === 'dark' ? 'teal.300' : 'teal.500'
                }
            })
    },
    colors: {
        brand: {}
    }
});
/* harmony default export */ const theme = (customTheme);

;// CONCATENATED MODULE: ./pages/_app.js

/* eslint-disable react/react-in-jsx-scope */ /* eslint-disable react/prop-types */ 


function MyApp({ Component  }) {
    return(/*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_.ChakraProvider, {
        theme: theme,
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(react_.CSSReset, {}),
            /*#__PURE__*/ jsx_runtime_.jsx(react_.ColorModeScript, {
                initialColorMode: theme.initialColorMode
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(Component, {})
        ]
    }));
}
/* harmony default export */ const _app = (MyApp);


/***/ }),

/***/ 930:
/***/ ((module) => {

module.exports = require("@chakra-ui/react");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(813));
module.exports = __webpack_exports__;

})();