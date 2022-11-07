<template>
	<slot />
	<TemplateModal
		v-bind="allProps"
		@update:show="handleUpdateShow"
		@close="closeCallback"
		@confirm="confirmCallback"
		@cancel="cancelCallback"
	/>
	<!-- 新增Modal -->
</template>

<script setup lang="ts">
import TemplateModal from "./TemplateModal.vue"
import { provideModal } from "./use-modal"

//新增import
const {
	allProps: allProps,
	handleUpdateShow: handleUpdateShow,
	closeCallback: closeCallback,
	confirmCallback: confirmCallback,
	cancelCallback: cancelCallback,
} = provideModal()

// 新增provide
</script>
