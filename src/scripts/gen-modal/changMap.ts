export type ChangeMap = Record<string, string>;

export const modalProviderChangeMap: (name: string) => ChangeMap = (name) => ({
	"<!-- 新增Modal -->": `<${name}Modal
	v-bind="all${name}ModalProps"
	@update:show="handle${name}ModalUpdateShow"
	@close="close${name}ModalCallback"
	@confirm="confirm${name}ModalCallback"
	@cancel="cancel${name}ModalCallback"
/>
<!-- 新增Modal -->`,
	"//新增import": `import ${name}Modal from "./${name}Modal.vue";
import { provide${name}Modal } from "./use-${name.toLowerCase()}-modal";
//新增import`,
	"// 新增provide": `const {
	allProps: all${name}ModalProps,
	handleUpdateShow: handle${name}ModalUpdateShow,
	closeCallback: close${name}ModalCallback,
	confirmCallback: confirm${name}ModalCallback,
	cancelCallback: cancel${name}ModalCallback,
} = provide${name}Modal()
// 新增provide`,
});

export const useModalChangeMap: (name: string) => ChangeMap = (name) => {
	name = name.toLowerCase();
	return {
		TemplateModal: `${name.replace(/^\w/, (p1) => p1.toUpperCase())}Modal`,
		provideModal: `provide${name.replace(/^\w/, (p1) =>
			p1.toUpperCase()
		)}Modal`,
		injectModal: `inject${name.replace(/^\w/, (p1) => p1.toUpperCase())}Modal`,
	};
};
