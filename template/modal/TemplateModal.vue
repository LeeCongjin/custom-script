<template>
  <n-modal
    class="modalClassName"
    v-model:show="isShowModal"
    preset="dialog"
    @after-leave="handleClose"
  >
    <div>
      <n-form ref="formRef" :rules="rules" :model="formData">
        <n-form-item path="version" label="标签" :show-require-mark="false">
          <n-input
            v-model:value="formData.inputValue"
            :disabled="loading"
            clearable
            type="text"
          />
        </n-form-item>
      </n-form>
    </div>
    <template #action>
      <div style="display: flex; justify-content: flex-end; gap: 16px">
        <n-button :disabled="loading" size="small" round @click="handleCancel">
          取消
        </n-button>
        <n-button
          size="small"
          round
          type="primary"
          :loading="loading"
          :disabled="loading"
          @click="handleConfirm"
        >
          确定
        </n-button>
      </div>
    </template>
  </n-modal>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from "vue"
import { useVModel } from "@vueuse/core"
import { FormRules } from "naive-ui"
interface ModalProps {
  show: boolean
  inputValue: string
}

// 中间区域不要修改
const props = defineProps<ModalProps>()
const formRef = ref()
const loading = ref(false)
const isShowModal = useVModel(props, "show")
// 中间区域不要修改

const rules: FormRules = []

const formData = reactive({
  inputValue: props.inputValue,
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
      formData.inputValue = props.inputValue
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
  emits("cancel", { ...callBackData.value })
  isShowModal.value = false
  // 中间区域不要修改
}

function handleClose() {
  // 中间区域不要修改
  emits("close", { ...callBackData.value })
  isShowModal.value = false
  // 中间区域不要修改
}

function handleConfirm() {
  // 中间区域不要修改
  loading.value = true
  emits(
    "confirm",
    { ...callBackData.value },
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
