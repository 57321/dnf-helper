<template>
  <div>
    <n-flex justify="center">
      <n-flex style="width: 121px">
        <n-flex justify="center" vertical>
          <div :class="'buff_' + props.role.roleType">
            <div class="buffLevel-white">{{ role.registerBuffLevel }}</div>
          </div>
        </n-flex>
        <n-flex vertical style="gap: 0 0">
          <div style="text-align: left">三攻:{{ role.getBuffAttack(true) }}</div>
          <div style="text-align: left">力智:{{ role.getBuffAttribute(true) }}</div>
        </n-flex>
      </n-flex>
      <n-flex style="width: 121px">
        <n-flex justify="center" vertical>
          <div :class="'buff_' + props.role.roleType">
            <div class="buffLevel-white">{{ role.dungeonBuffLevel }}</div>
          </div>
        </n-flex>
        <n-flex vertical style="gap: 0 0">
          <div style="text-align: left">三攻:{{ role.getBuffAttack(false) }}</div>
          <div style="text-align: left">力智:{{ role.getBuffAttribute(false) }}</div>
        </n-flex>
      </n-flex>
      <n-flex style="width: 121px" v-if="props.role.roleType != 401">
        <n-flex justify="center" vertical>
          <div :class="'hymn_' + props.role.roleType"></div>
        </n-flex>
        <n-flex justify="center" vertical style="gap: 0 0">
          <div style="text-align: left">三攻:{{ role.getHymnBuffAttack() }}</div>
          <div style="text-align: left">力智:{{ role.getHymnBuffAttribute() }}</div>
        </n-flex>
      </n-flex>
      <n-flex style="width: 121px" v-if="props.role.roleType == 305">
        <n-flex justify="center" vertical>
          <div :class="'hymn_2_' + props.role.roleType"></div>
        </n-flex>
        <n-flex justify="center" vertical style="gap: 0 0">
          <div style="text-align: left">三攻:{{ getFavoriteBuffAttack() }}</div>
          <div style="text-align: left">力智:{{ getFavoriteBuffAttribute() }}</div>
        </n-flex>
      </n-flex>
      <n-flex style="width: 121px">
        <n-flex justify="center" vertical>
          <div :class="'firstAwakening_' + props.role.roleType">
            <div class="buffLevel-black">{{ role.firstAwakeningLevel }}</div>
          </div>
        </n-flex>
        <n-flex justify="center" vertical style="gap: 0 0">
          <div style="text-align: left">力智:{{ role.getFirstAwakeningAttribute() }}</div>
        </n-flex>
      </n-flex>
      <n-flex style="width: 121px">
        <n-flex justify="center" vertical>
          <div :class="'thirdAwakening_' + props.role.roleType">
            <div class="buffLevel-black">{{ role.thirdAwakeningLevel }}</div>
          </div>
        </n-flex>
        <n-flex justify="center" vertical style="gap: 0 0">
          <div style="text-align: left">绑一:{{ role.getThirdAwakeningAttributeByOne() }}</div>
          <div style="text-align: left">绑二:{{ role.getThirdAwakeningAttributeByTwo() }}</div>
        </n-flex>
      </n-flex>
    </n-flex>
  </div>
</template>
<script setup>
import { defineProps, ref } from "vue";
import Assistant from "./model/Assistant";

const getFavoriteBuffAttack = () => {
  return props.role.getBuffAttack(false, true) + props.role.getHymnBuffAttack(true) - props.role.getBuffAttack(false, false) - props.role.getHymnBuffAttack();
};

const getFavoriteBuffAttribute = () => {
  return props.role.getBuffAttribute(false, true) + props.role.getHymnBuffAttribute(true) - props.role.getBuffAttribute(false, false) - props.role.getHymnBuffAttribute();
};

const props = defineProps({
  role: {
    type: Assistant,
    default: {},
  },
});
</script>
<style>
.buffLevel-white {
  font-size: 8px;
  position: relative;
  left: 8px;
  font-weight: bold;
  color: white;
  text-shadow: 0 0 1px #52c41a, 0 0 2px #52c41a, 0 0 4px #52c41a, 0 0 8px #52c41a;
}

.buffLevel-black {
  font-size: 8px;
  position: relative;
  left: 8px;
  font-weight: bold;
  color: #003460;
  text-shadow: 0 0 1px #b7eb8f, 0 0 2px #b7eb8f, 0 0 4px #b7eb8f, 0 0 8px #b7eb8f;
}

/**
奶妈 1401
 */
.buff_1401 {
  background-position: -247px -140px;
  width: 28px;
  height: 28px;
  background-image: url(/images/assistant/female_cleric.png);
}

.hymn_1401 {
  background-position: -219px -140px;
  width: 28px;
  height: 28px;
  background-image: url(/images/assistant/female_cleric.png);
}

.firstAwakening_1401 {
  background-position: -331px -140px;
  width: 28px;
  height: 28px;
  background-image: url(/images/assistant/female_cleric.png);
}

.thirdAwakening_1401 {
  background-position: -303px -196px;
  width: 28px;
  height: 28px;
  background-image: url(/images/assistant/female_cleric.png);
}

/**
奶萝 305
 */
.buff_305 {
  background-position: -178px -28px;
  width: 28px;
  height: 28px;
  background-image: url(/images/assistant/enchantress.png);
}

.hymn_305 {
  background-position: -150px -112px;
  width: 28px;
  height: 28px;
  background-image: url(/images/assistant/enchantress.png);
}

.hymn_2_305 {
  background-position: -84px -114px;
  width: 28px;
  height: 28px;
  background-image: url(/images/assistant/enchantress.png);
}

.firstAwakening_305 {
  background-position: -150px 0px;
  width: 28px;
  height: 28px;
  background-image: url(/images/assistant/enchantress.png);
}

.thirdAwakening_305 {
  background-position: -178px -84px;
  width: 28px;
  height: 28px;
  background-image: url(/images/assistant/enchantress.png);
}

/**
缪斯 1601
 */
.buff_1601 {
  background-position: -68px -56px;
  width: 28px;
  height: 28px;
  background-image: url(/images/assistant/muse.png);
}

.hymn_1601 {
  background-position: -56px -101px;
  width: 28px;
  height: 28px;
  background-image: url(/images/assistant/muse.png);
}

.firstAwakening_1601 {
  background-position: -28px -101px;
  width: 28px;
  height: 28px;
  background-image: url(/images/assistant/muse.png);
}

.thirdAwakening_1601 {
  background-position: -84px -101px;
  width: 28px;
  height: 28px;
  background-image: url(/images/assistant/muse.png);
}

/**
奶爸 401
 */
.buff_401 {
  background-position: -172px -112px;
  width: 28px;
  height: 28px;
  background-image: url(/images/assistant/male_cleric.png);
}

.hymn_401 {
  background-position: -56px -101px;
  width: 28px;
  height: 28px;
  background-image: url(/images/assistant/male_cleric.png);
}

.firstAwakening_401 {
  background-position: -144px -28px;
  width: 28px;
  height: 28px;
  background-image: url(/images/assistant/male_cleric.png);
}

.thirdAwakening_401 {
  background-position: -84px -143px;
  width: 28px;
  height: 28px;
  background-image: url(/images/assistant/male_cleric.png);
}
</style>
