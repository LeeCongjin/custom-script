import {
	ref,
	provide,
	InjectionKey,
	inject,
	VNodeProps,
	AllowedComponentProps,
	reactive,
} from "vue";
import Modal from "./TemplateModal.vue";

/**
 * 通过引入弹窗组件来获取组件的除show，update：show以外的props和emits来作为open函数的
 */
type ModalInstance = InstanceType<
	typeof Modal extends abstract new (...args: any) => any ? typeof Modal : any
>["$props"];
type OpenParam = Omit<
	{
		readonly [K in keyof Omit<
			ModalInstance,
			keyof VNodeProps | keyof AllowedComponentProps
		>]: ModalInstance[K];
	},
	"show" | "onUpdate:show"
>;

interface AnyFileChangeModal {
	open: (param?: OpenParam) => Promise<void>;
}

/**
 * 通过弹窗实例来获取弹窗组件内需要哪些props
 */
type AllProps = Omit<
	OpenParam,
	"onClose" | "onCancel" | "onConfirm" | "onUpdate:show"
> & { show: boolean };

const anyModalKey: InjectionKey<AnyFileChangeModal> = Symbol("ModalKey");
export function provideModal() {
	const allProps: AllProps = reactive({
		show: false,
	} as AllProps);
	const closeCallback = ref();
	const cancelCallback = ref();
	const confirmCallback = ref();
	const handleUpdateShow = (value: boolean) => {
		allProps.show = value;
	};

	/**
	 * @param param 通过函数来更新props
	 */
	function updateAllProps(param: OpenParam) {
		const excludeKey = ["show", "onClose", "onConfirm", "onCancel"];
		for (const [key, value] of Object.entries(param)) {
			if (!excludeKey.includes(key)) {
				allProps[key] = value;
			}
		}
	}
	function clearAllProps() {
		for (const [key] of Object.entries(allProps)) {
			allProps[key] = undefined;
		}
	}

	async function open(param: OpenParam) {
		clearAllProps();
		updateAllProps(param);
		allProps.show = true;
		param.onClose && (closeCallback.value = param.onClose);
		param.onConfirm && (confirmCallback.value = param.onConfirm);
		param.onCancel && (cancelCallback.value = param.onCancel);
	}
	provide(anyModalKey, { open });
	return {
		allProps,
		closeCallback,
		confirmCallback,
		cancelCallback,
		handleUpdateShow,
	};
}

export function injectModal() {
	return inject(anyModalKey);
}
