<template>
  <n-drawer v-model:show="showModal" :width="900" placement="right"
    :on-after-leave="closeModal">
    <n-drawer-content title="奶量属性">
      <n-form :model="formParams" ref="formRef" label-placement="left" :label-width="120" :rules="rules" size="small">
        <n-card title="站街属性" size="small" :bordered="false">
          <n-grid :cols="24" :x-gap="24">
            <n-form-item-gi :span="8" label="登记BUFF等级" path="registerBuffLevel">
              <n-input-number :min="1" :max="40" v-model:value="formParams.registerBuffLevel" />
            </n-form-item-gi>
            <n-form-item-gi :span="8" label="登记四维" path="registerAttribute">
              <n-input-number :min="20" :max="20000" v-model:value="formParams.registerAttribute"
                placeholder="登记和站街有一点点差距" />
            </n-form-item-gi>
            <n-form-item-gi :span="8" label="站街四维" path="streetAttribute">
              <n-input-number :min="20" :max="20000" v-model:value="formParams.streetAttribute"
                placeholder="登记和站街有一点点差距" />
            </n-form-item-gi>
          </n-grid>
        </n-card>
        <n-card title="进图属性" size="small" :bordered="false">
          <n-grid :cols="24" :x-gap="24">
            <n-form-item-gi :span="8" label="进图BUFF等级" path="dungeonBuffLevel">
              <n-input-number :min="1" :max="40" v-model:value="formParams.dungeonBuffLevel" />
            </n-form-item-gi>
            <n-form-item-gi :span="8" label="一觉等级" path="firstAwakeningLevel">
              <n-input-number :min="1" :max="40" v-model:value="formParams.firstAwakeningLevel" />
            </n-form-item-gi>
            <n-form-item-gi :span="8" label="三觉等级" path="thirdAwakeningLevel">
              <n-input-number :min="1" :max="99" v-model:value="formParams.thirdAwakeningLevel" />
            </n-form-item-gi>
            <n-form-item-gi :span="8" label="附魔耳环四维" path="earringAttribute">
              <n-input-number :min="0" :max="5000" v-model:value="formParams.earringAttribute" />
            </n-form-item-gi>
            <n-form-item-gi :span="8" label="公会训练教官" path="trainingAttribute">
              <n-input-number :min="0" :max="5000" v-model:value="formParams.trainingAttribute" />
            </n-form-item-gi>
            <n-form-item-gi v-if="formParams.roleType == 401 || formParams.roleType == 1601" :span="8"
              :label="formParams.roleType == 1601 ? '主角登场' : '守护徽章'" path="guardAttribute">
              <n-input-number :min="0" :max="9999" v-model:value="formParams.guardAttribute" />
            </n-form-item-gi>
            <n-form-item-gi v-if="formParams.roleType == 401" :span="8" label="二觉单层体力" path="secondAwakeningAttribute">
              <n-input-number :min="0" :max="9999" v-model:value="formParams.secondAwakeningAttribute" />
            </n-form-item-gi>
            <n-form-item-gi v-if="formParams.roleType == 401" :span="8" label="二觉层数" path="secondAwakeningCount">
              <n-input-number :min="0" :max="9999" v-model:value="formParams.secondAwakeningCount" />
            </n-form-item-gi>
          </n-grid>
        </n-card>
        <n-card title="增益属性" size="small" :bordered="false">
          <n-grid :cols="24" :x-gap="24">
            <n-form-item-gi :span="8" label="增益量" path="buffAmount">
              <n-input-number :min="0" v-model:value="formParams.buffAmount" />
            </n-form-item-gi>
            <n-form-item-gi :span="8" label="光环增益量" path="haloAmount">
              <n-input-number :min="0" :precision="2" :step="0.5" v-model:value="formParams.haloAmount">
                <template #suffix> % </template>
              </n-input-number>
            </n-form-item-gi>
            <n-form-item-gi :span="8" label="纹章增益量" path="emblemAmount">
              <n-input-number :min="0" :precision="2" :step="0.5" v-model:value="formParams.emblemAmount">
                <template #suffix> % </template>
              </n-input-number>
            </n-form-item-gi>
            <n-form-item-gi :span="8" label="登记宠物增益量" path="registerPetAmount">
              <n-input-number :min="0" :precision="2" :step="0.5" v-model:value="formParams.registerPetAmount">
                <template #suffix> % </template>
              </n-input-number>
            </n-form-item-gi>
            <n-form-item-gi :span="8" label="站街宠物增益量" path="streetPetAmount">
              <n-input-number :min="0" :precision="2" :step="0.5" v-model:value="formParams.streetPetAmount">
                <template #suffix> % </template>
              </n-input-number>
            </n-form-item-gi>
          </n-grid>
        </n-card>
        <n-card title="辟邪玉属性" size="small" :bordered="false">
          <n-grid :cols="24" :x-gap="24">
            <n-form-item-gi :span="12" v-for="(item, index) in tempJadeAttributes" :label="'词条' + (index + 1)"
              path="buffAmount">
              <n-select :options="jadeTypeOptions" v-model:value="item.type" value-field="id" label-field="text"
                style="width: 150px" />
              <n-input-number v-if="item.type == 1" :min="-5" :max="5" :step="1" v-model:value="item.value" />
              <n-input-number v-if="item.type == 2" :min="-25" :max="25" :step="1" v-model:value="item.value" />
              <n-input-number v-if="item.type == 3" :min="-100" :max="100" :step="1" v-model:value="item.value" />
              <n-input-number v-if="item.type >= 4" :min="-5" :max="5" :step="0.1" :precision="1"
                v-model:value="item.value">
                <template #suffix> % </template>
              </n-input-number>
            </n-form-item-gi>
          </n-grid>
        </n-card>
        <n-card title="其他属性" size="small" :bordered="false">
          <n-grid :cols="24" :x-gap="24">
            <n-form-item-gi :span="6" label="CP武器" path="isCp">
              <n-switch v-model:value="formParams.isCp" />
            </n-form-item-gi>
            <n-form-item-gi :span="18" label="护石力智加成" path="talisman">
              <n-input-number :min="0" :max="99" :step="1" v-model:value="tempTalisanList[0]" />
              <n-input-number :min="0" :max="99" :step="1" v-model:value="tempTalisanList[1]" />
              <n-input-number :min="0" :max="99" :step="1" v-model:value="tempTalisanList[2]" />
            </n-form-item-gi>
          </n-grid>
        </n-card>
      </n-form>
      <template #footer>
        <n-space>
          <n-button @click="closeModal">取消</n-button>
          <n-button type="info" @click="confirmForm" :loading="confirmLoading">调整</n-button>
        </n-space>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>
<script setup>
import { onMounted, ref, h } from "vue";
import { updateRole } from "./api";
import { useMessage, NSwitch, useDialog } from "naive-ui";
const message = useMessage();
const emit = defineEmits(["onSuccess"]);
const formRef = ref();

const rules = {};

const jadeTypeOptions = [
  {
    id: 0,
    text: "未选择",
  },
  {
    id: 1,
    text: "固定三攻",
  },
  {
    id: 2,
    text: "固定力智",
  },
  {
    id: 3,
    text: "固定太阳力智",
  },
  {
    id: 4,
    text: "百分比三攻",
  },
  {
    id: 5,
    text: "百分比力智",
  },
  {
    id: 6,
    text: "百分比太阳力智",
  },
];

const tempTalisanList = ref([0, 0, 0]);

const tempJadeAttributes = ref([
  {
    type: 0,
    value: 0,
  },
  {
    type: 0,
    value: 0,
  },
  {
    type: 0,
    value: 0,
  },
  {
    type: 0,
    value: 0,
  },
]);

const showModal = ref(false);
const formParams = ref({});
const confirmLoading = ref(false);

const openModal = data => {
  showModal.value = true;
  confirmLoading.value = false;

  formParams.value.id = data.id;
  formParams.value.roleType = data.roleType;
  formParams.value.registerBuffLevel = data.registerBuffLevel;
  formParams.value.registerAttribute = data.registerAttribute;
  formParams.value.streetAttribute = data.streetAttribute;

  formParams.value.dungeonBuffLevel = data.dungeonBuffLevel;
  formParams.value.firstAwakeningLevel = data.firstAwakeningLevel;
  formParams.value.thirdAwakeningLevel = data.thirdAwakeningLevel;
  formParams.value.earringAttribute = data.earringAttribute;
  formParams.value.trainingAttribute = data.trainingAttribute;
  formParams.value.guardAttribute = data.guardAttribute ?? 0;
  formParams.value.secondAwakeningAttribute = data.secondAwakeningAttribute ?? 0;
  formParams.value.secondAwakeningCount = data.secondAwakeningCount ?? 0;

  formParams.value.buffAmount = data.buffAmount;
  formParams.value.haloAmount = data.haloAmount;
  formParams.value.emblemAmount = data.emblemAmount;
  formParams.value.registerPetAmount = data.registerPetAmount;
  formParams.value.streetPetAmount = data.streetPetAmount;
  if (data.jadeAttributes) {
    data.jadeAttributes.map((item, index) => {
      tempJadeAttributes.value[index] = item;
    });
  }
  formParams.value.isCp = data.isCp;
  tempTalisanList.value = data.talismanList;
};

const closeModal = () => {
  showModal.value = false;
  formParams.value = {};
};

const confirmForm = () => {
  formRef.value.validate(errors => {
    if (!errors) {
      // 设置辟邪玉属性
      let jadeAttributes = tempJadeAttributes.value.filter(item => item.type != 0);
      // 设置护石属性
      let talismanList = tempTalisanList.value;
      let params = {
        ...formParams.value,
        jadeAttributes,
        talismanList,
      };
      console.info(params);
      updateRole(params);
      message.success("属性调整成功");
      closeModal();
      emit("onSuccess");
    }
  });
};

// 提供给父组件使用
defineExpose({
  openModal,
});
</script>
<style>
.n-data-table-thead .n-checkbox-box {
  display: none;
}
</style>
