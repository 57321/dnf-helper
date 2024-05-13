<template>
  <div v-if="props.data.length > 0">
    <n-card title="buff变化" size="small" :bordered="false">
      <n-flex justify="center">
        <n-flex style="width: 200px">
          <n-flex justify="center" vertical>
            <div :class="'buff_' + data[0].roleType"></div>
          </n-flex>
          <n-flex vertical style="gap: 0 0">
            <div style="text-align: left">
              Lv:{{ props.data[1].registerBuffLevel }}
              <span :class="getDiffClass(props.data[1].registerBuffLevel, data[0].registerBuffLevel)">{{
                diffValue(props.data[1].registerBuffLevel, data[0].registerBuffLevel) }}</span>
            </div>
            <div style="text-align: left">
              三攻:{{ props.data[1].getBuffAttack(true) }}
              <span :class="getDiffClass(props.data[1].getBuffAttack(true), data[0].getBuffAttack(true))">{{
                diffValue(props.data[1].getBuffAttack(true), data[0].getBuffAttack(true)) }}</span>
            </div>
            <div style="text-align: left">
              力智:{{ props.data[1].getBuffAttribute(true) }}
              <span :class="getDiffClass(props.data[1].getBuffAttribute(true), data[0].getBuffAttribute(true))">{{
                diffValue(props.data[1].getBuffAttribute(true), data[0].getBuffAttribute(true))
              }}</span>
            </div>
          </n-flex>
        </n-flex>
        <n-flex style="width: 200px">
          <n-flex justify="center" vertical>
            <div :class="'buff_' + data[0].roleType"></div>
          </n-flex>
          <n-flex vertical style="gap: 0 0">
            <div style="text-align: left">
              Lv:{{ props.data[1].dungeonBuffLevel }}
              <span :class="getDiffClass(props.data[1].dungeonBuffLevel, data[0].dungeonBuffLevel)">{{
                diffValue(props.data[1].dungeonBuffLevel, data[0].dungeonBuffLevel) }}</span>
            </div>
            <div style="text-align: left">
              三攻:{{ props.data[1].getBuffAttack(false) }}
              <span :class="getDiffClass(props.data[1].getBuffAttack(false), data[0].getBuffAttack(false))">{{
                diffValue(props.data[1].getBuffAttack(false), data[0].getBuffAttack(false)) }}</span>
            </div>
            <div style="text-align: left">
              力智:{{ props.data[1].getBuffAttribute(false) }}
              <span :class="getDiffClass(props.data[1].getBuffAttribute(false), data[0].getBuffAttribute(false))">{{
                diffValue(props.data[1].getBuffAttribute(false), data[0].getBuffAttribute(false))
              }}</span>
            </div>
          </n-flex>
        </n-flex>
        <n-flex style="width: 200px" v-if="data[0].roleType != 401">
          <n-flex justify="center" vertical>
            <div :class="'hymn_' + data[0].roleType"></div>
          </n-flex>
          <n-flex justify="center" vertical style="gap: 0 0">
            <div style="text-align: left">
              三攻:{{ props.data[1].getHymnBuffAttack() }}
              <span :class="getDiffClass(props.data[1].getHymnBuffAttack(), data[0].getHymnBuffAttack())">{{
                diffValue(props.data[1].getHymnBuffAttack(), data[0].getHymnBuffAttack()) }}</span>
            </div>
            <div style="text-align: left">
              力智:{{ props.data[1].getHymnBuffAttribute() }}
              <span :class="getDiffClass(props.data[1].getHymnBuffAttribute(), data[0].getHymnBuffAttribute())">{{
                diffValue(props.data[1].getHymnBuffAttribute(), data[0].getHymnBuffAttribute())
              }}</span>
            </div>
          </n-flex>
        </n-flex>
        <n-flex style="width: 200px" v-if="data[0].roleType == 305">
          <n-flex justify="center" vertical>
            <div :class="'hymn_2_' + data[0].roleType"></div>
          </n-flex>
          <n-flex justify="center" vertical style="gap: 0 0">
            <div style="text-align: left">
              三攻:{{ getFavoriteBuffAttack(props.data[1]) }}
              <span :class="getDiffClass(getFavoriteBuffAttack(props.data[1]), getFavoriteBuffAttack(data[0]))">{{
                diffValue(getFavoriteBuffAttack(props.data[1]), getFavoriteBuffAttack(data[0]))
              }}</span>
            </div>
            <div style="text-align: left">
              力智:{{ getFavoriteBuffAttribute(props.data[1]) }}
              <span :class="getDiffClass(getFavoriteBuffAttribute(props.data[1]), getFavoriteBuffAttribute(data[0]))">{{
                diffValue(getFavoriteBuffAttribute(props.data[1]), getFavoriteBuffAttribute(data[0]))
              }}</span>
            </div>
          </n-flex>
        </n-flex>

        <n-flex style="width: 200px">
          <n-flex justify="center" vertical>
            <div :class="'firstAwakening_' + data[0].roleType"></div>
          </n-flex>
          <n-flex justify="center" vertical style="gap: 0 0">
            <div style="text-align: left">
              Lv:{{ props.data[1].firstAwakeningLevel }}
              <span :class="getDiffClass(props.data[1].firstAwakeningLevel, data[0].firstAwakeningLevel)">{{
                diffValue(props.data[1].firstAwakeningLevel, data[0].firstAwakeningLevel) }}</span>
            </div>
            <div style="text-align: left">
              力智:{{ props.data[1].getFirstAwakeningAttribute() }}
              <span
                :class="getDiffClass(props.data[1].getFirstAwakeningAttribute(), data[0].getFirstAwakeningAttribute())">{{
                  diffValue(props.data[1].getFirstAwakeningAttribute(), data[0].getFirstAwakeningAttribute())
                }}</span>
            </div>
          </n-flex>
        </n-flex>
        <n-flex style="width: 200px">
          <n-flex justify="center" vertical>
            <div :class="'thirdAwakening_' + data[0].roleType"></div>
          </n-flex>
          <n-flex justify="center" vertical style="gap: 0 0">
            <div style="text-align: left">
              Lv:{{ props.data[1].thirdAwakeningLevel }}
              <span :class="getDiffClass(props.data[1].thirdAwakeningLevel, data[0].thirdAwakeningLevel)">{{
                diffValue(props.data[1].thirdAwakeningLevel, data[0].thirdAwakeningLevel) }}</span>
            </div>
            <div style="text-align: left">
              绑一:{{ props.data[1].getThirdAwakeningAttributeByOne() }}
              <span
                :class="getDiffClass(props.data[1].getThirdAwakeningAttributeByOne(), data[0].getThirdAwakeningAttributeByOne())">{{
                  diffValue(props.data[1].getThirdAwakeningAttributeByOne(), data[0].getThirdAwakeningAttributeByOne())
                }}</span>
            </div>
            <div style="text-align: left">
              绑二:{{ props.data[1].getThirdAwakeningAttributeByTwo() }}
              <span
                :class="getDiffClass(props.data[1].getThirdAwakeningAttributeByTwo(), data[0].getThirdAwakeningAttributeByTwo())">{{
                  diffValue(props.data[1].getThirdAwakeningAttributeByTwo(), data[0].getThirdAwakeningAttributeByTwo())
                }}</span>
            </div>
          </n-flex>
        </n-flex>
      </n-flex>
    </n-card>
    <n-card title="汇总变化" size="small" :bordered="false">
      <n-flex justify="center">
        <n-flex style="width: 200px">
          <div style="text-align: left">
            常驻三攻:{{ props.data[1].getBuffTotalAttack() }}
            <span :class="getDiffClass(props.data[1].getBuffAttack(true), data[0].getBuffAttack(true))">{{
              diffValue(props.data[1].getBuffTotalAttack(), props.data[0].getBuffTotalAttack()) }}</span>
          </div>
          <div style="text-align: left">
            常驻力智:{{ props.data[1].getBuffTotalAttribute() }}
            <span :class="getDiffClass(props.data[1].getBuffAttack(true), data[0].getBuffAttack(true))">{{
              diffValue(props.data[1].getBuffTotalAttribute(), props.data[0].getBuffTotalAttribute())
            }}</span>
          </div>
        </n-flex>
        <n-flex style="width: 200px" v-if="props.data[0].roleType == 305">
          <div style="text-align: left">
            偏爱三攻:{{ props.data[1].getBuffTotalAttack(true) }}
            <span :class="getDiffClass(props.data[1].getBuffAttack(true), data[0].getBuffAttack(true))">{{
              diffValue(props.data[1].getBuffTotalAttack(true), props.data[0].getBuffTotalAttack(true))
            }}</span>
          </div>
          <div style="text-align: left">
            偏爱力智:{{ props.data[1].getBuffTotalAttribute(true) }}
            <span :class="getDiffClass(props.data[1].getBuffAttack(true), data[0].getBuffAttack(true))">{{
              diffValue(props.data[1].getBuffTotalAttribute(true), props.data[0].getBuffTotalAttribute(true))
            }}</span>
          </div>
        </n-flex>
        <n-flex style="width: 200px">
          <div style="text-align: left">
            常驻倍率:{{ props.data[1].getPermanent(cAttack, cAttribute) }}
            <span :class="getDiffClass(props.data[1].getBuffAttack(true), data[0].getBuffAttack(true))">{{
              diffValueRound(props.data[1].getPermanent(cAttack, cAttribute), props.data[0].getPermanent(cAttack,
                cAttribute))
              }}</span>
          </div>
          <div style="text-align: left">
            一觉倍率:{{ props.data[1].getBurst(cAttack, cAttribute, 1) }}
            <span :class="getDiffClass(props.data[1].getBuffAttack(true), data[0].getBuffAttack(true))">{{
              diffValueRound(props.data[1].getBurst(cAttack, cAttribute, 1), props.data[0].getBurst(cAttack, cAttribute,
                1))
              }}</span>
          </div>
        </n-flex>
        <n-flex style="width: 200px" v-if="props.data[0].roleType == 305">
          <div style="text-align: left">
            偏爱倍率:{{ props.data[1].getPermanent(cAttack, cAttribute, true) }}
            <span :class="getDiffClass(props.data[1].getBuffAttack(true), data[0].getBuffAttack(true))">{{
              diffValueRound(props.data[1].getPermanent(cAttack, cAttribute, true), props.data[0].getPermanent(cAttack,
                cAttribute, true))
              }}</span>
          </div>
          <div style="text-align: left">
            偏爱倍率:{{ props.data[1].getBurst(cAttack, cAttribute, 1, true) }}
            <span :class="getDiffClass(props.data[1].getBuffAttack(true), data[0].getBuffAttack(true))">{{
              diffValueRound(props.data[1].getBurst(cAttack, cAttribute, 1, true), props.data[0].getBurst(cAttack,
                cAttribute, 1, true))
              }}</span>
          </div>
        </n-flex>
        <n-flex style="width: 200px">
          <div style="text-align: left">
            三觉倍率:{{ props.data[1].getBurst(cAttack, cAttribute, 2) }}
            <span :class="getDiffClass(props.data[1].getBuffAttack(true), data[0].getBuffAttack(true))">{{
              diffValueRound(props.data[1].getBurst(cAttack, cAttribute, 2), props.data[0].getBurst(cAttack, cAttribute,
                2))
              }}</span>
          </div>
          <div style="text-align: left">
            最高倍率:{{ props.data[1].getBurst(cAttack, cAttribute, 3) }}
            <span :class="getDiffClass(props.data[1].getBuffAttack(true), data[0].getBuffAttack(true))">{{
              diffValueRound(props.data[1].getBurst(cAttack, cAttribute, 3), props.data[0].getBurst(cAttack, cAttribute,
                3))
              }}</span>
          </div>
        </n-flex>
        <n-flex style="width: 200px" v-if="props.data[0].roleType == 305">
          <div style="text-align: left">
            偏爱倍率:{{ props.data[1].getBurst(cAttack, cAttribute, 2, true) }}
            <span :class="getDiffClass(props.data[1].getBuffAttack(true), data[0].getBuffAttack(true))">{{
              diffValueRound(props.data[1].getBurst(cAttack, cAttribute, 2, true), props.data[0].getBurst(cAttack,
                cAttribute, 2, true))
              }}</span>
          </div>
          <div style="text-align: left">
            偏爱倍率:{{ props.data[1].getBurst(cAttack, cAttribute, 3, true) }}
            <span :class="getDiffClass(props.data[1].getBuffAttack(true), data[0].getBuffAttack(true))">{{
              diffValueRound(props.data[1].getBurst(cAttack, cAttribute, 3, true), props.data[0].getBurst(cAttack,
                cAttribute, 3, true))
              }}</span>
          </div>
        </n-flex>
      </n-flex>
    </n-card>
  </div>
</template>
<script setup>
import { defineProps, ref } from "vue";

const diffValue = (v1, v2) => {
  let value = v1 - v2;
  if (value == 0) {
    return "";
  } else if (value < 0) {
    return `${value}`;
  } else {
    return `+${value}`;
  }
};

const diffValueRound = (v1, v2) => {
  let value = v1 - v2;
  if (value == 0) {
    return "";
  } else if (value < 0) {
    return `${Math.round(value * 100) / 100}`;
  } else {
    return `+${Math.round(value * 100) / 100}`;
  }
};

const getDiffClass = (v1, v2) => {
  let value = v1 - v2;
  if (value < 0) {
    return "span_down";
  } else {
    return "span_up";
  }
};

const getFavoriteBuffAttack = data => {
  return data.getBuffAttack(false, true) + data.getHymnBuffAttack(true) - data.getBuffAttack(false, false) - data.getHymnBuffAttack();
};

const getFavoriteBuffAttribute = data => {
  return data.getBuffAttribute(false, true) + data.getHymnBuffAttribute(true) - data.getBuffAttribute(false, false) - data.getHymnBuffAttribute();
};

const props = defineProps({
  data: {
    type: Object,
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
<style>
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

.span_up {
  color: #2a6e3f;
  font-size: 18px;
}

.span_down {
  color: #c12c1f;
  font-size: 18px;
}
</style>
