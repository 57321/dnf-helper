import Assistant from "./Assistant.js";

/**
 * 奶萝
 */
export default class Enchantress extends Assistant {
    constructor(content) {
        super(content);
        this.roleType = 305;
    }

    static BUFF_FACTOR = 665;

    static BUFF_X = 4350;

    static BUFF_Y = 3500;

    static BUFF_Z = 26395;

    static CP_VALUE = 1.08;

    /**
     * 三攻
     */
    static BUFF_ATTACK_LEVEL_DATA = [
        34, 35, 37, 38, 39, 41, 42, 43, 45, 46,
        47, 49, 50, 51, 53, 54, 55, 57, 58, 60,
        61, 62, 64, 65, 66, 68, 69, 70, 72, 73,
        74, 76, 77, 78, 80, 81, 82, 84, 85, 87
    ];

    /**
     * 力智
     */
    static BUFF_POWER_LEVEL_DATA = [
        131, 140, 149, 158, 167, 175, 184, 193, 202, 211,
        220, 229, 238, 247, 256, 264, 273, 282, 291, 300,
        309, 318, 327, 336, 345, 353, 362, 371, 380, 389,
        398, 407, 416, 425, 434, 442, 451, 460, 469, 478,
    ];

    /**
     * 获取buff的三攻
     *
     * @param {boolean} isStreet 是否站街
     * @param {boolean} isFavorite 是否偏爱 默认否
     * @returns {number} buff三攻
     */
    getBuffAttack(isStreet, isFavorite = false) {
        let totalBuffAmount = this.getRegisterTotalBuffAmount(isStreet);
        let actualAttribute = this.getRegisterActualAttribute(isStreet);
        let buffLevel = this.getActualBuffLevel(isStreet);

        let multiplier = 1;
        if (isFavorite) {
            multiplier = 1.15;
        }

        return Math.round(
            Assistant.getBuff(
                totalBuffAmount,
                actualAttribute,
                Enchantress.BUFF_ATTACK_LEVEL_DATA[buffLevel - 1],
                this.getJadeFixedValue(1),
                this.getJadePercentValue(4),
                1,
                Enchantress.BUFF_FACTOR,
                Enchantress.BUFF_X,
                Enchantress.BUFF_Y,
                Enchantress.BUFF_Z,
                this.isCp,
                Enchantress.CP_VALUE
            ) * multiplier
        );
    }

    /**
     * 获取buff的力智
     *
     * @param {boolean} isStreet 是否站街
     * @param {boolean} isFavorite 是否偏爱 默认否
     * @returns {number} buff力智
     */
    getBuffAttribute(isStreet, isFavorite = false) {
        let totalBuffAmount = this.getRegisterTotalBuffAmount(isStreet);
        let actualAttribute = this.getRegisterActualAttribute(isStreet);
        let buffLevel = this.getActualBuffLevel(isStreet);

        let multiplier = 1;
        if (isFavorite) {
            multiplier = 1.15;
        }

        return Math.round(
            Assistant.getBuff(
                totalBuffAmount,
                actualAttribute,
                Enchantress.BUFF_POWER_LEVEL_DATA[buffLevel - 1],
                this.getJadeFixedValue(2),
                this.getJadePercentValue(5),
                this.getTalismanValue(),
                Enchantress.BUFF_FACTOR,
                Enchantress.BUFF_X,
                Enchantress.BUFF_Y,
                Enchantress.BUFF_Z,
                this.isCp,
                Enchantress.CP_VALUE
            ) * multiplier
        );
    }

    /**
     * 死命三攻
     *
     * @param {boolean} isFavorite 是否偏爱 默认否
     * @returns {number} 死命三攻
     */
    getHymnBuffAttack(isFavorite = false) {
        return Math.round(this.getBuffAttack(false, isFavorite) * 0.25);
    }

    /**
     * 死命力智
     *
     * @param {boolean} isFavorite 是否偏爱 默认否
     * @returns {number} 死命力智
     */
    getHymnBuffAttribute(isFavorite = false) {
        return Math.round(this.getBuffAttribute(false, isFavorite) * 0.25);
    }

    /**
     * 一觉力智
     *
     * @returns {number} 一觉力智
     */
    getFirstAwakeningAttribute() {
        let totalBuffAmount = this.getDungeonTotalBuffAmount();
        let actualAttribute = this.getDungeonActualAttribute();
        let buffLevel = this.firstAwakeningLevel;
        return Assistant.getBuff(
            totalBuffAmount,
            actualAttribute,
            Assistant.AWAKENING_POWER_LEVEL_DATA[buffLevel - 1],
            this.getJadeFixedValue(3),
            this.getJadePercentValue(6),
            1,
            Assistant.AWAKENING_FACTOR,
            Assistant.AWAKENING_X,
            Assistant.AWAKENING_Y,
            Assistant.AWAKENING_Z,
            false,
            1
        );
    }
}
