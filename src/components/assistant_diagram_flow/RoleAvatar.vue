<template>
  <div class="avatar-box" :style="{
    opacity: props.active ? 0.5 : 1,
  }">
    <img :src="getAvatar(props.role.roleType)" />
    <div>{{ props.role.roleName }}</div>
  </div>
</template>
<script setup>
import { defineProps } from "vue";

const getAvatar = roleType => {
  return `/images/avatar/${roleType}.png`;
};

const props = defineProps({
  role: {
    type: Object,
    default: {
      roleType: "",
      roleName: "",
    },
  },
  active: {
    type: Boolean,
    default: false,
  },
});
</script>
<style scoped>
.avatar-box {
  width: 100px;
  height: 108px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  /* background: linear-gradient(to bottom, rgba(118, 78, 40, 1), rgba(82, 56, 32, 1)); */
  cursor: pointer;
}

img {
  max-width: 70%;
  max-height: 70%;
}

.avatar-box div {
  color: #ba9b59;
}
</style>
