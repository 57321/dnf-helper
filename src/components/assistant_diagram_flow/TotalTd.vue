<template>
  <div>
    <n-flex justify="center">
      <n-statistic label="常驻三攻" :value="role.getBuffTotalAttack()" />
      <n-statistic v-if="props.role.roleType == 305" label="偏爱三攻" :value="role.getBuffTotalAttack(true)" />
      <n-statistic label="常驻力智" :value="role.getBuffTotalAttribute()" />
      <n-statistic v-if="props.role.roleType == 305" label="偏爱力智" :value="role.getBuffTotalAttribute(true)" />
      <n-statistic label="常驻倍率" :value="role.getPermanent(cAttack, cAttribute)" />
      <n-statistic v-if="props.role.roleType == 305" label="偏爱常驻"
        :value="role.getPermanent(cAttack, cAttribute, true)" />
      <n-statistic label="一觉倍率" :value="role.getBurst(cAttack, cAttribute, 1)" />
      <n-statistic v-if="props.role.roleType == 305" label="偏爱一觉"
        :value="role.getBurst(cAttack, cAttribute, 1, true)" />
      <n-statistic label="三觉倍率" :value="role.getBurst(cAttack, cAttribute, 2)" />
      <n-statistic v-if="props.role.roleType == 305" label="偏爱三觉"
        :value="role.getBurst(cAttack, cAttribute, 2, true)" />
      <n-statistic label="最高倍率" :value="role.getBurst(cAttack, cAttribute, 3)" />
      <n-statistic v-if="props.role.roleType == 305" label="偏爱最高"
        :value="role.getBurst(cAttack, cAttribute, 3, true)" />
    </n-flex>
  </div>
</template>
<script setup>
import { defineProps, ref } from "vue";
import Assistant from "./model/Assistant";

const props = defineProps({
  role: {
    type: Assistant,
    default: {},
  },
  cAttack: {
    type: Number,
    default: 1,
  },
  cAttribute: {
    type: Number,
    default: 1,
  },
});
</script>
