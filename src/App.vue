<script setup>
import AssistantDiagramFlow from './components/assistant_diagram_flow/index.vue';

</script>

<template>
  <n-dialog-provider>
    <n-message-provider>
      <n-layout>
        <n-layout-content :style="{ padding: '24px', background: '#fff' }">
          <AssistantDiagramFlow />
        </n-layout-content>
      </n-layout>
    </n-message-provider>
  </n-dialog-provider>
</template>

<style scoped></style>
