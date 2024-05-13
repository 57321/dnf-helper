<template>
  <div>
    <n-modal v-model:show="showModal" :mask-closable="false" :show-icon="false" preset="dialog" style="width: 1400px;"
      title="奶量提升">
      <n-form :model="formParams" ref="formRef" label-placement="left" :label-width="120" :rules="rules" size="small">
        <n-card title="主C模板" size="small" :bordered="false">
          <n-grid :cols="24" :x-gap="24">
            <n-form-item-gi :span="6" label="三攻" path="basicAttack">
              <n-input-number placeholder="请输入变化值" v-model:value="formParams.basicAttack" />
            </n-form-item-gi>
            <n-form-item-gi :span="6" label="力智" path="basicAttribute">
              <n-input-number placeholder="请输入变化值" v-model:value="formParams.basicAttribute" />
            </n-form-item-gi>
          </n-grid>
        </n-card>
        <n-card title="属性变化" size="small" :bordered="false">
          <n-grid :cols="24" :x-gap="24">
            <n-form-item-gi :span="6" label="四维" path="attributeValue">
              <n-input-number placeholder="请输入变化值" v-model:value="formParams.attributeValue" />
            </n-form-item-gi>
            <n-form-item-gi :span="6" label="buff等级" path="buffLevel">
              <n-input-number placeholder="请输入变化值" v-model:value="formParams.buffLevel" />
            </n-form-item-gi>
            <n-form-item-gi :span="6" label="太阳等级" path="awakeningLevel">
              <n-input-number placeholder="请输入变化值" v-model:value="formParams.awakeningLevel" />
            </n-form-item-gi>
            <n-form-item-gi :span="6" label="buff量" path="buffAmount">
              <n-input-number placeholder="请输入变化值" v-model:value="formParams.buffAmount" />
            </n-form-item-gi>
            <n-form-item-gi :span="6" label="buff量(%)" path="otherAmount">
              <n-input-number :min="0" :precision="2" :step="0.5" v-model:value="formParams.otherAmount">
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
        <n-space>
          <n-button @click="reset" size="small">重置</n-button>
          <n-button type="info" @click="confirmForm" size="small">开始计算</n-button>
        </n-space>
        <BuffCalc v-if="newData.registerBuffLevel" :data="[baseData, newData]" :c-attack="formParams.basicAttack"
          :c-attribute="formParams.basicAttribute" />
      </n-form>
    </n-modal>
  </div>
</template>
<script setup>
import { onMounted, ref, h } from "vue";
import { addRole, updateRole } from "./api";
import { useMessage } from "naive-ui";
import Assistant from "./model/Assistant";
import FemaleCleric from "./model/FemaleCleric";
import MaleCleric from "./model/MaleCleric";
import Enchantress from "./model/Enchantress";
import BuffCalc from "./BuffCalc.vue";

const message = useMessage();
const emit = defineEmits(["onSuccess"]);
const rules = {
  id: {
    required: true,
    message: "请选择需要计算的角色",
  },
  basicAttack: {
    required: true,
    message: "请输入主C的三攻",
  },
  basicAttribute: {
    required: true,
    message: "请输入主C的力智",
  },
  attributeValue: {
    required: true,
    message: "请输入变化值",
  },
  buffLevel: {
    required: true,
    message: "请输入变化值",
  },
  awakeningLevel: {
    required: true,
    message: "请输入变化值",
  },
  buffAmount: {
    required: true,
    message: "请输入变化值",
  },
  otherAmount: {
    required: true,
    message: "请输入变化值",
  },
};
const formRef = ref();
const showModal = ref(false);
const formParams = ref({
  basicAttack: 3500,
  basicAttribute: 24500,
  attributeValue: 0,
  buffLevel: 0,
  awakeningLevel: 0,
  buffAmount: 0,
  otherAmount: 0,
});

// 基础数据
const baseData = ref({});
const newData = ref({});

const reset = () => {
  formParams.value.basicAttack = 3500;
  formParams.value.basicAttribute = 24500;
  formParams.value.attributeValue = 0;
  formParams.value.buffLevel = 0;
  formParams.value.awakeningLevel = 0;
  formParams.value.buffAmount = 0;
  formParams.value.otherAmount = 0;
  newData.value = {};
};

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

const openModal = data => {
  showModal.value = true;
  reset();
  baseData.value = data;
};

const confirmForm = () => {
  formRef.value.validate(errors => {
    if (!errors) {
      // 设置辟邪玉属性
      let jadeAttributes = tempJadeAttributes.value.filter(item => item.type != 0);
      let params = {
        ...formParams.value,
        jadeAttributes,
      };

      let tempData = new Assistant({});

      if (baseData.value.roleType == 401) {
        tempData = new MaleCleric(baseData.value);
      } else if (baseData.value.roleType == 1401) {
        tempData = new FemaleCleric(baseData.value);
      } else if (baseData.value.roleType == 1601) {
        tempData = new Muse(baseData.value);
      } else if (baseData.value.roleType == 305) {
        tempData = new Enchantress(baseData.value);
      } else {
        message.error("无法识别的角色类型");
        return;
      }

      // buff变化
      tempData.registerBuffLevel += params.buffLevel;
      tempData.dungeonBuffLevel += params.buffLevel;

      if (tempData.dungeonBuffLevel > 40 || tempData.dungeonBuffLevel < 0 || tempData.registerBuffLevel < 0 || tempData.registerBuffLevel > 40) {
        message.error("buff等级超出上下项,无法计算");
        return;
      }

      // 太阳变化
      tempData.firstAwakeningLevel += params.awakeningLevel;

      if (tempData.firstAwakeningLevel > 40 || tempData.firstAwakeningLevel < 0) {
        message.error("太阳等级超过上下项,无法计算");
        return;
      }

      // 四维变化
      tempData.registerAttribute += params.attributeValue;
      tempData.streetAttribute += params.attributeValue;

      // 辟邪玉变化
      if (params.jadeAttributes.length > 0) {
        tempData.jadeAttributes = params.jadeAttributes;
      }

      // 增益量变化
      tempData.buffAmount += params.buffAmount;
      tempData.emblemAmount += params.otherAmount;

      newData.value = tempData;
    }
  });
};

// 提供给父组件使用
defineExpose({
  openModal,
});
</script>
