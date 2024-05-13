<template>
  <div>
    <n-modal v-model:show="showModal" :mask-closable="false" :show-icon="false" preset="dialog" style="width: 600px; top: -200px" :title="formParams.update ? '修改角色' : '创建角色'">
      <n-form :model="formParams" ref="formRef" label-placement="left" :label-width="100" :rules="rules" style="margin-top: 25px" size="small">
        <n-form-item label="职业" path="roleType" v-if="!formParams.update">
          <n-select style="width: 200px" placeholder="请选择职业" :options="professionList" v-model:value="formParams.roleType" label-field="text" value-field="id" />
        </n-form-item>
        <n-form-item label="角色名称" path="roleName">
          <n-input style="width: 200px" placeholder="起个名称吧" v-model:value="formParams.roleName" />
        </n-form-item>
        <n-form-item label="打造模板" path="makeTemplate" v-if="!formParams.update">
          <n-radio-group v-model:value="formParams.makeTemplate" name="makeTemplate">
            <n-radio-button value="10"> 红10 </n-radio-button>
            <n-radio-button value="11"> 红11 </n-radio-button>
            <n-radio-button value="12"> 红12 </n-radio-button>
            <n-radio-button value="13"> 红13 </n-radio-button>
            <n-radio-button value="14"> 红14 </n-radio-button>
            <n-radio-button value="15"> 红15 </n-radio-button>
            <n-radio-button value="16"> 红16 </n-radio-button>
          </n-radio-group>
        </n-form-item>
      </n-form>
      <template #action>
        <n-space>
          <n-button @click="closeModal">取消</n-button>
          <n-button type="info" @click="formSubmit" :loading="confirmLoading">确认</n-button>
        </n-space>
      </template>
    </n-modal>
  </div>
</template>
<script setup>
import { onMounted, ref, h } from "vue";
import { addRole, updateRole } from "./api";
import { useMessage } from "naive-ui";

const message = useMessage();
const emit = defineEmits(["onSuccess"]);

const professionList = [
  {
    id: "1401",
    text: "光启·光明骑士(女)",
  },
  {
    id: "401",
    text: "光启·光明骑士(男)",
  },
  {
    id: "305",
    text: "知源·小魔女",
  },
  {
    id: "1601",
    text: "聆风·缪斯",
  },
];

const rules = {
  roleType: {
    required: true,
    message: "请选择角色职业",
  },
  roleName: {
    required: true,
    message: "角色名称不能为空",
  },
  makeTemplate: {
    required: true,
    message: "请选择一个初始打造模板",
  },
};
const formRef = ref();
const showModal = ref(false);
const formParams = ref({});
const confirmLoading = ref(false);

const openModal = data => {
  showModal.value = true;
  if (data) {
    formParams.value.update = true;
    formParams.value.id = data.id;
    formParams.value.roleType = data.roleType + "";
    formParams.value.roleName = data.roleName;
  } else {
    formParams.value = {
      makeTemplate: "10",
    };
  }
};
const closeModal = () => {
  showModal.value = false;
};
const formSubmit = () => {
  formRef.value.validate(errors => {
    if (!errors) {
      let params = {
        ...formParams.value,
      };
      confirmLoading.value = true;
      if (formParams.value.update) {
        updateRole(params);
        message.success("修改角色成功");
        closeModal();
        emit("onSuccess");
        confirmLoading.value = false;
      } else {
        addRole(params);
        message.success("新增角色成功");
        closeModal();
        emit("onSuccess");
        confirmLoading.value = false;
      }
    }
  });
};

// 提供给父组件使用
defineExpose({
  openModal,
});
</script>
