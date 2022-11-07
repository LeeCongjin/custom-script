<template>
	<n-modal
		:show="isShowModal"
		title="xxx"
		:show-header-divider="false"
		:show-footer-divider="false"
		:mask-closable="false"
		style="width: 500px"
		preset="card"
		@close="handleClose"
	>
		<div>
			<n-form>
				<n-form-item label="formItem" :show-require-mark="false">
					<n-input
						v-model:value="formData.inputValue"
						placeholder="请输入内容"
						clearable
						type="text"
						style="margin-top: 8px"
					/>
				</n-form-item>
				{{ age }}
			</n-form>
		</div>
		<template #footer>
			<div style="display: flex; justify-content: flex-end">
				<n-button
					size="small"
					round
					style="margin-right: 20px"
					@click="handleCancel"
				>
					取消
				</n-button>
				<n-button
					size="small"
					round
					type="primary"
					:loading="loading"
					@click="handleConfirm"
				>
					确定
				</n-button>
			</div>
		</template>
	</n-modal>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, reactive, computed } from "vue"
import { useVModel, whenever } from "@vueuse/core"
interface ModalProps {
	id: string
	show: boolean
	age: number
}

//中间区域不要修改
const props = defineProps<ModalProps>()
const emits = defineEmits<{
	(e: "update:show", value: boolean): void
	(e: "close", param: typeof callBackData.value): void
	(e: "confirm", param: typeof callBackData.value, next: () => void): void
	(e: "cancel", param: typeof callBackData.value): void
}>()
const loading = ref(false)
const isShowModal = useVModel(props, "show")
//中间区域不要修改

const formData = reactive({
	inputValue: "",
	hello: "",
	repData: "",
})

const callBackData = computed(() => {
	return {
		formData,
	}
})

function handleCancel() {
	//中间区域不要修改
	emits("cancel", callBackData.value)
	isShowModal.value = false
	//中间区域不要修改
}

function handleClose() {
	//中间区域不要修改
	emits("close", callBackData.value)
	isShowModal.value = false
	//中间区域不要修改
}

function handleConfirm() {
	//中间区域不要修改
	loading.value = true
	emits("confirm", callBackData.value, () => {
		loading.value = false
		isShowModal.value = false
	})
	//中间区域不要修改
}
</script>
