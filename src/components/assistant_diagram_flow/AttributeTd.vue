<template>
  <div>
    <n-flex justify="center">
      <n-statistic size="small" label="登记BUFF" :value="role.registerBuffLevel" />
      <n-statistic label="站街四维" :value="role.streetAttribute" />
      <n-statistic label="增益量" :value="role.buffAmount" />
      <n-statistic label="登记增益量%" :value="registerBuffAmount()" />
      <n-statistic label="站街增益量%" :value="streetBuffAmount()" />
      <n-statistic label="辟邪玉增益量%" :value="role.getJadeAmount()" />
    </n-flex>
  </div>
</template>
<script setup>
import { defineProps, ref } from "vue";
import Assistant from "./model/Assistant";

const registerBuffAmount = () => {
  return props.role.haloAmount + props.role.registerPetAmount + props.role.emblemAmount;
};

const streetBuffAmount = () => {
  return props.role.haloAmount + props.role.streetPetAmount + props.role.emblemAmount;
};

const props = defineProps({
  role: {
    type: Assistant,
    default: {},
  },
  tdClick: {
    type: Function,
    default: () => { },
  },
});
</script>
