<template>
	<WayzardModal
		class="modalClassName"
		v-model:value="isShowModal"
		:title="$t('测试弹窗')"
		:show-header-divider="false"
		:show-footer-divider="false"
		:modal-props="{
			closeOnEsc: false,
		}"
		:closeable="!loading"
		:content-style="{
			width: 600 + 'px',
		}"
		:mask-closable="false"
		@after-leave="handleClose"
	>
		<div>
			<n-form ref="formRef" :rules="rules" :model="formData">
				<n-form-item
					path="version"
					:label="$t('标签')"
					:show-require-mark="false"
				>
					<n-input
						v-model:value="formData.inputValue"
						:disabled="loading"
						:placeholder="$t('请输入xxx')"
						clearable
						type="text"
					/>
				</n-form-item>
			</n-form>
		</div>
		<template #footer>
			<div style="display: flex; justify-content: flex-end; gap: 16px">
				<n-button :disabled="loading" size="small" round @click="handleCancel">
					{{ $t("取消") }}
				</n-button>
				<n-button
					size="small"
					round
					type="primary"
					:loading="loading"
					:disabled="loading"
					@click="handleConfirm"
				>
					{{ $t("确定") }}
				</n-button>
			</div>
		</template>
	</WayzardModal>
</template>

<script setup lang="ts">
import WayzardModal from "@/components/common/WayzardModal.vue"
import { defineProps, defineEmits, ref, reactive, computed, watch } from "vue"
import { useVModel } from "@vueuse/core"
import { FormRules } from "naive-ui"
interface ModalProps {
	show: boolean
	deviceName: string
	deviceType: string
	deviceVersion: string
}

// 中间区域不要修改
const props = defineProps<ModalProps>()
const formRef = ref()
const loading = ref(false)
const isShowModal = useVModel(props, "show")
// 中间区域不要修改

const rules: FormRules = []

const formData = reactive({
	inputValue: props.deviceName,
})

const callBackData = computed(() => {
	return {
		formData,
	}
})
watch(
	() => props.show,
	() => {
		if (props.show) {
			formData.inputValue = props.deviceName
		} else {
			formData.inputValue = ""
		}
	}
)

const emits = defineEmits<{
	(e: "update:show", value: boolean): void
	(e: "close", param: typeof callBackData.value): void
	(
		e: "confirm",
		param: typeof callBackData.value,
		close: () => void,
		endLoading: () => void
	): void
	(e: "cancel", param: typeof callBackData.value): void
}>()
function handleCancel() {
	// 中间区域不要修改
	emits("cancel", callBackData.value)
	isShowModal.value = false
	// 中间区域不要修改
}

function handleClose() {
	// 中间区域不要修改
	emits("close", callBackData.value)
	isShowModal.value = false
	// 中间区域不要修改
}

function handleConfirm() {
	// 中间区域不要修改
	loading.value = true
	emits(
		"confirm",
		callBackData.value,
		() => {
			loading.value = false
			isShowModal.value = false
		},
		() => {
			loading.value = false
		}
	)
	// 中间区域不要修改
}
</script>
