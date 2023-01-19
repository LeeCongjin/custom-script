"use strict";
exports.__esModule = true;
var index_js_1 = require("../../utils/index.js");
exports.modalProviderChangeMap = function (name, importPath) {
    return {
        "<!-- 新增Modal -->": "<" + index_js_1.firstWordUpper(index_js_1.stringToHump(name)) + "Modal\n\tv-bind=\"all" + index_js_1.firstWordUpper(index_js_1.stringToHump(name)) + "ModalProps\"\n\t@update:show=\"handle" + index_js_1.firstWordUpper(index_js_1.stringToHump(name)) + "ModalUpdateShow\"\n\t@close=\"close" + index_js_1.firstWordUpper(index_js_1.stringToHump(name)) + "ModalCallback\"\n\t@confirm=\"confirm" + index_js_1.firstWordUpper(index_js_1.stringToHump(name)) + "ModalCallback\"\n\t@cancel=\"cancel" + index_js_1.firstWordUpper(index_js_1.stringToHump(name)) + "ModalCallback\"\n/>\n<!-- \u65B0\u589EModal -->",
        "/** 新增import */": "import " + index_js_1.firstWordUpper(index_js_1.stringToHump(name)) + "Modal from \"" + importPath + "/" + index_js_1.firstWordUpper(index_js_1.stringToHump(name)) + "Modal.vue\";\nimport { provide" + index_js_1.firstWordUpper(index_js_1.stringToHump(name)) + "Modal } from \"" + importPath + "/use-" + index_js_1.formatToLowerCase(name) + "-modal\";\n/** \u65B0\u589Eimport */",
        "/** 新增provide */": "const {\n\tallProps: all" + index_js_1.firstWordUpper(index_js_1.stringToHump(name)) + "ModalProps,\n\thandleUpdateShow: handle" + index_js_1.firstWordUpper(index_js_1.stringToHump(name)) + "ModalUpdateShow,\n\tcloseCallback: close" + index_js_1.firstWordUpper(index_js_1.stringToHump(name)) + "ModalCallback,\n\tconfirmCallback: confirm" + index_js_1.firstWordUpper(index_js_1.stringToHump(name)) + "ModalCallback,\n\tcancelCallback: cancel" + index_js_1.firstWordUpper(index_js_1.stringToHump(name)) + "ModalCallback,\n} = provide" + index_js_1.firstWordUpper(index_js_1.stringToHump(name)) + "Modal()\n/** \u65B0\u589Eprovide */"
    };
};
exports.useModalChangeMap = function (name) {
    name = name.toLowerCase();
    return {
        TemplateModal: index_js_1.firstWordUpper(index_js_1.stringToHump(name)) + "Modal",
        provideModal: "provide" + index_js_1.firstWordUpper(index_js_1.stringToHump(name)) + "Modal",
        injectModal: "inject" + index_js_1.firstWordUpper(index_js_1.stringToHump(name)) + "Modal"
    };
};
exports.TemplateModalChangeMap = function (name) {
    name = name.toLowerCase();
    return {
        modalClassName: index_js_1.stringToHump(name) + "-modal"
    };
};
//# sourceMappingURL=changMap.js.map