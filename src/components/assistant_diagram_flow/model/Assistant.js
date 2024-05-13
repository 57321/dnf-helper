/**
 * 辅助父类
 */
export default class Assistant {
    /**
     * ID
     */
    id;

    /**
     * 角色类型
     */
    roleType;

    /**
     * 角色名称
     */
    roleName;

    /**
     * 登记等级
     */
    registerBuffLevel;

    /**
     * 登记四维 (主要区分宠物 称号 时装之间的差距)
     */
    registerAttribute;

    /**
     * 站街四维
     */
    streetAttribute;

    /**
     * 进图等级
     */
    dungeonBuffLevel;

    /**
     * 一觉等级
     */
    firstAwakeningLevel;

    /**
     * 三觉等级
     */
    thirdAwakeningLevel;

    /**
     * 增益量数值
     */
    buffAmount;

    /**
     * 光环增益量(%)
     */
    haloAmount;

    /**
     * 登记宠物增益量(%)
     */
    registerPetAmount;

    /**
     * 站街宠物增益量(%)
     */
    streetPetAmount;

    /**
     * 纹章增益量(%)
     */
    emblemAmount;

    /**
     * 辟邪玉属性
     * 格式为 [{type:1,value:1}]
     * type取 1 = 固定三攻 2 = 固定力智 3 = 固定太阳力智 4 = 百分比三攻 5 = 百分比力智 6 = 百分比太阳
     * value取 对应类型的数值范围
     */
    jadeAttributes;

    /**
     * 耳环进图智力加成
     */
    earringAttribute;

    /**
     * 训练教官
     */
    trainingAttribute;

    /**
     * 一觉被动
     */
    firstAwakeningAttribute;

    /**
     * 是否CP武器
     */
    isCp;

    /**
     * 护石力智加成
     * 格式为[6,4,8]
     */
    talismanList;

    /**
     *
     * {"roleType":"xxx"}
     * @param {object} content 角色数据
     */
    constructor(jsonContent) {
        this.id = jsonContent.id;
        this.roleType = jsonContent.roleType;
        this.roleName = jsonContent.roleName;
        this.registerBuffLevel = jsonContent.registerBuffLevel ?? 21;
        this.streetAttribute = jsonContent.streetAttribute;
        this.registerAttribute = jsonContent.registerAttribute;
        this.dungeonBuffLevel = jsonContent.dungeonBuffLevel ?? 35;
        this.firstAwakeningLevel = jsonContent.firstAwakeningLevel ?? 37;
        this.thirdAwakeningLevel = jsonContent.thirdAwakeningLevel ?? 4;
        this.buffAmount = jsonContent.buffAmount ?? 149639;
        this.haloAmount = jsonContent.haloAmount ?? 5;
        this.registerPetAmount = jsonContent.registerPetAmount ?? 5;
        this.streetPetAmount = jsonContent.streetPetAmount ?? 5;
        this.jadeAttributes = jsonContent.jadeAttributes ?? [
            {
                type: 1,
                value: 5,
            },
            {
                type: 1,
                value: 5,
            },
            {
                type: 1,
                value: 5,
            },
            {
                type: 1,
                value: 5,
            },
        ];
        this.emblemAmount = jsonContent.emblemAmount ?? 1;
        this.earringAttribute = jsonContent.earringAttribute ?? 200;
        this.trainingAttribute = jsonContent.trainingAttribute ?? 80;
        this.firstAwakeningAttribute = jsonContent.firstAwakeningAttribute ?? 554;
        this.isCp = jsonContent.isCp ?? true;
        this.talismanList = jsonContent.talismanList ?? [6, 4, 8];
    }

    /**
     * 获取辟邪玉固定数值
     * 用于计算基础buff数值(与之加算)
     * @param {number} type 辟邪玉类型
     */
    getJadeFixedValue(type) {
        let result = 0;
        if (this.jadeAttributes && this.jadeAttributes instanceof Array) {
            this.jadeAttributes.forEach(item => {
                if (item.type == type) {
                    result += item.value;
                }
            });
        }
        return result;
    }

    /**
     * 获取 辟邪玉百分比数值
     * 用于计算基础buff数值(与之乘算)
     *
     * @param {number} type 辟邪玉类型
     */
    getJadePercentValue(type) {
        let result = 1;
        if (this.jadeAttributes && this.jadeAttributes instanceof Array) {
            this.jadeAttributes.forEach(item => {
                if (item.type == type) {
                    result *= 1 + item.value / 100;
                }
            });
        }
        return result;
    }

    /**
     * 获取护石的百分比倍率
     */
    getTalismanValue() {
        let result = 1;
        if (this.talismanList && this.talismanList instanceof Array) {
            this.talismanList.forEach(item => {
                result *= 1 + item / 100;
            });
        }
        return result;
    }

    /**
     * 根据辟邪玉数值 计算辟邪玉的百分比增益量
     */
    getJadeAmount() {
        let result = 0;
        if (this.jadeAttributes && this.jadeAttributes instanceof Array) {
            this.jadeAttributes.forEach(item => {
                switch (item.type) {
                    case 1:
                    case 6:
                    case 5:
                    case 4:
                        result += item.value / 2;
                        break;
                    case 2:
                        result += item.value / 10;
                        break;
                    case 3:
                        result += item.value / 40;
                        break;
                }
            });
        }
        return result;
    }

    /**
     * 获取登记的总增益量
     *
     * @param {boolean} isStreet 是否站街
     */
    getRegisterTotalBuffAmount(isStreet) {
        // 倍率
        let multiplier = (this.haloAmount + this.registerPetAmount + this.emblemAmount) / 100 + 1;

        // 进图才算辟邪玉的增益量
        if (!isStreet) {
            multiplier += this.getJadeAmount() / 100;
        }

        return Math.round(this.buffAmount * multiplier);
    }

    /**
     * 获取登记的实际四维
     *
     * @param {boolean} isStreet 是否站街
     */
    getRegisterActualAttribute(isStreet) {
        if (!isStreet) {
            return this.registerAttribute + this.earringAttribute + this.trainingAttribute + this.firstAwakeningAttribute;
        }
        return this.registerAttribute;
    }

    /**
     * 获取进图的实际四维
     *
     * @returns
     */
    getDungeonActualAttribute() {
        return this.streetAttribute + this.earringAttribute + this.trainingAttribute + this.firstAwakeningAttribute;
    }

    /**
     * 获取进图的总增益量
     *
     * @param {boolean} isStreet 是否站街
     */
    getDungeonTotalBuffAmount() {
        // 倍率
        let multiplier = (this.haloAmount + this.streetPetAmount + this.emblemAmount + this.getJadeAmount()) / 100 + 1;
        return Math.round(this.buffAmount * multiplier);
    }

    /**
     * 获取实际的buff等级
     *
     * @param {boolean} isStreet 是否站街
     */
    getActualBuffLevel(isStreet) {
        return isStreet ? this.registerBuffLevel : this.dungeonBuffLevel;
    }

    /**
     * 获取buff进图总三攻
     *
     * @param {number} isFavorite 是否偏爱 默认否
     * @returns
     */
    getBuffTotalAttack(isFavorite = false) {
        return this.getBuffAttack(false, isFavorite) + this.getHymnBuffAttack(isFavorite);
    }

    /**
     * 获取buff进图总力智
     *
     * @param {number} isFavorite 是否偏爱 默认否
     * @returns
     */
    getBuffTotalAttribute(isFavorite = false) {
        return this.getBuffAttribute(false, isFavorite) + this.getHymnBuffAttribute(isFavorite);
    }

    // 提供一些重写的方法 主要是方便编辑器识别

    /**
     * 获取buff的三攻
     *
     * @param {boolean} isStreet 是否站街
     * @param {boolean} isFavorite 是否偏爱 默认否
     * @returns {number} buff三攻
     */
    getBuffAttack(isStreet, isFavorite = false) {
        return 0;
    }

    /**
     * 获取buff的力智
     *
     * @param {boolean} isStreet 是否站街
     * @param {boolean} isFavorite 是否偏爱 默认否
     * @returns {number} buff力智
     */
    getBuffAttribute(isStreet, isFavorite = false) {
        return 0;
    }

    /**
     * 唱歌三攻
     *
     * @param {boolean} isFavorite 是否偏爱 默认否
     * @returns {number} 唱歌三攻
     */
    getHymnBuffAttack(isFavorite = false) {
        return 0;
    }

    /**
     * 唱歌力智
     *
     * @param {boolean} isFavorite 是否偏爱 默认否
     * @returns {number} 唱歌力智
     */
    getHymnBuffAttribute(isFavorite = false) {
        return 0;
    }

    /**
     * 一觉力智
     *
     * @returns {number} 一觉力智
     */
    getFirstAwakeningAttribute() {
        return 0;
    }

    /**
     * 三觉绑定一觉
     *
     * @returns {number} 三觉绑定一觉
     */
    getThirdAwakeningAttributeByOne() {
        return Math.round(this.getFirstAwakeningAttribute() * (1.08 + this.thirdAwakeningLevel * 0.01));
    }

    /**
     * 三觉绑定二觉 3+1
     *
     * @returns {number} 三觉绑定二觉 3+1
     */
    getThirdAwakeningAttributeByTwo() {
        return Math.round(this.getFirstAwakeningAttribute() * (1.23 + this.thirdAwakeningLevel * 0.01));
    }

    /**
     * 获取常驻倍率提升
     *
     * @param {number} cAttack
     * @param {number} cAttribute
     * @param {boolean} isFavorite 是否偏爱 默认否
     *
     * @returns
     */
    getPermanent(cAttack, cAttribute, isFavorite = false) {
        return (
            Math.round(
                (1 + (this.getBuffAttack(false, isFavorite) + this.getHymnBuffAttack(isFavorite)) / cAttack) *
                (1 + (this.getBuffAttribute(false, isFavorite) + this.getHymnBuffAttribute(isFavorite)) / (cAttribute + 250)) *
                1.141 *
                100
            ) / 100
        );
    }

    /**
     * 获取爆发倍率提升
     *
     * @param {number} cAttack
     * @param {number} cAttribute
     * @param {number} type 表示在什么太阳下的爆发 目前支持 1 = 1觉  | 2 = 3绑1下的3觉  | 3 = 3绑2下的  3+1
     * @param {boolean} isFavorite 是否偏爱 默认否
     *
     * @returns
     */
    getBurst(cAttack, cAttribute, type = 1, isFavorite = false) {
        let awakeningAttribute = this.getFirstAwakeningAttribute();
        if (type == 2) {
            awakeningAttribute = this.getThirdAwakeningAttributeByOne();
        } else if (type == 3) {
            awakeningAttribute = this.getThirdAwakeningAttributeByTwo();
        }

        let multiplier = 1.141;
        if (this.roleType == 1601) {
            multiplier = 1.174;
        }

        return (
            Math.round(
                (1 + (this.getBuffAttack(false, isFavorite) + this.getHymnBuffAttack(isFavorite)) / cAttack) *
                (1 + (this.getBuffAttribute(false, isFavorite) + this.getHymnBuffAttribute(isFavorite) + awakeningAttribute) / (cAttribute + 250)) *
                multiplier *
                100
            ) / 100
        );
    }

    /**
     * 由于太阳的基础数据和一些系数都是一样的 所以直接归于父类当做工具类使用
     */
    static AWAKENING_POWER_LEVEL_DATA = [
        43, 57, 74, 91, 111, 131, 153, 176, 201, 228, 255, 284, 315, 346, 379, 414, 449, 487, 526, 567, 608, 651, 696, 741, 789, 838, 888, 939, 993, 1047, 1103, 1160, 1219, 1278, 1340, 1403, 1467, 1533,
        1600, 1668,
    ];

    static AWAKENING_FACTOR = 750;

    static AWAKENING_X = 5250;

    static AWAKENING_Y = 5000;

    static AWAKENING_Z = 40000;

    /**
     *
     * @param {number} totalBuffAmount 总增益量
     * @param {number} actualAttribute 实际四维
     * @param {number} buffLevelAttack buff等级对应的数值
     * @param {number} jadeFixedValue 辟邪玉固定数值
     * @param {number} jadePercentValue 辟邪玉百分比数值
     * @param {number} talismanValue 护石数据
     * @param {number} buffFactor buff影响因子
     * @param {number} x buff影响系数-x
     * @param {number} y buff影响系数-y
     * @param {number} z buff影响系数-z
     * @param {boolean} isCp 是否CP武器
     * @param {number} cpValue cp武器加成(奶爸有bug)
     */
    static getBuff(totalBuffAmount, actualAttribute, buffLevelAttack, jadeFixedValue, jadePercentValue, talismanValue, buffFactor, x, y, z, isCp, cpValue) {
        // 旧版本数据计算数据 吃四维和辟邪玉
        // 由于护石只加力智 所以算三攻的时候 传1即可
        let oldBuff = (buffLevelAttack + jadeFixedValue) * (1 + actualAttribute / buffFactor) * jadePercentValue * talismanValue;

        // 新版本数据计算 吃四维和增益量
        let newBuff = 0;
        if (totalBuffAmount > 0) {
            newBuff = buffLevelAttack * ((actualAttribute + x) / buffFactor + 1) * ((totalBuffAmount + y) / z);
        }

        // 不是CP 则加成为1
        if (!isCp) {
            cpValue = 1;
        }
        return Math.round((oldBuff + newBuff) * cpValue);
    }
}
