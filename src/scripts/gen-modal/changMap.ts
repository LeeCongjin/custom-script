import {
	firstWordUpper,
	formatToLowerCase,
	stringToHump,
} from "../../utils/index.js";

export type ChangeMap = Record<string, string>;

export const modalProviderChangeMap: (
	name: string,
	importPath: string
) => ChangeMap = (name, importPath) => {
	return {
		"<!-- 新增Modal -->": `<${firstWordUpper(stringToHump(name))}Modal
	v-bind="all${firstWordUpper(stringToHump(name))}ModalProps"
	@update:show="handle${firstWordUpper(stringToHump(name))}ModalUpdateShow"
	@close="close${firstWordUpper(stringToHump(name))}ModalCallback"
	@confirm="confirm${firstWordUpper(stringToHump(name))}ModalCallback"
	@cancel="cancel${firstWordUpper(stringToHump(name))}ModalCallback"
/>
<!-- 新增Modal -->`,
		"//新增import": `import ${firstWordUpper(
			stringToHump(name)
		)}Modal from "${importPath}/${firstWordUpper(stringToHump(name))}Modal.vue";
import { provide${firstWordUpper(
			stringToHump(name)
		)}Modal } from "${importPath}/use-${formatToLowerCase(name)}-modal";
//新增import`,
		"// 新增provide": `const {
	allProps: all${firstWordUpper(stringToHump(name))}ModalProps,
	handleUpdateShow: handle${firstWordUpper(stringToHump(name))}ModalUpdateShow,
	closeCallback: close${firstWordUpper(stringToHump(name))}ModalCallback,
	confirmCallback: confirm${firstWordUpper(stringToHump(name))}ModalCallback,
	cancelCallback: cancel${firstWordUpper(stringToHump(name))}ModalCallback,
} = provide${firstWordUpper(stringToHump(name))}Modal()
// 新增provide`,
	};
};

export const useModalChangeMap: (name: string) => ChangeMap = (name) => {
	name = name.toLowerCase();
	return {
		TemplateModal: `${firstWordUpper(stringToHump(name))}Modal`,
		provideModal: `provide${firstWordUpper(stringToHump(name))}Modal`,
		injectModal: `inject${firstWordUpper(stringToHump(name))}Modal`,
	};
};
