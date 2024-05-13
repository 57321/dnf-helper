import Assistant from "./Assistant.js";

/**
 * 缪斯
 */
export default class Muse extends Assistant {
    /**
     * 主角登场
     */
    guardAttribute;

    constructor(content) {
        super(content);
        this.roleType = 1601;
        this.guardAttribute = content.guardAttribute ?? 163;
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
        40, 42, 44, 46, 47, 49, 51, 52, 54, 55,
        56, 58, 60, 61, 63, 64, 65, 67, 70, 72,
        73, 74, 76, 78, 80, 82, 83, 84, 86, 88,
        89, 92, 93, 94, 96, 98, 99, 101, 102, 104
    ];

    /**
     * 力智
     */
    static BUFF_POWER_LEVEL_DATA = [
        162, 173, 186, 196, 207, 217, 227, 239, 249, 262,
        272, 283, 295, 306, 318, 328, 338, 350, 360, 372,
        382, 394, 406, 416, 428, 437, 448, 460, 471, 482,
        493, 503, 516, 527, 539, 548, 559, 570, 581, 593,
    ];

    /**
     * 获取buff的三攻
     *
     * @param {boolean} isStreet 是否站街
     * @returns {number} buff三攻
     */
    getBuffAttack(isStreet, isFavorite = false) {
        let totalBuffAmount = this.getRegisterTotalBuffAmount(isStreet);
        let actualAttribute = this.getRegisterActualAttribute(isStreet);
        let buffLevel = this.getActualBuffLevel(isStreet);

        if (!isStreet) {
            // 进图加上守护
            actualAttribute += this.guardAttribute;
        }

        return Assistant.getBuff(
            totalBuffAmount,
            actualAttribute,
            Muse.BUFF_ATTACK_LEVEL_DATA[buffLevel - 1],
            this.getJadeFixedValue(1),
            this.getJadePercentValue(4),
            1,
            Muse.BUFF_FACTOR,
            Muse.BUFF_X,
            Muse.BUFF_Y,
            Muse.BUFF_Z,
            this.isCp,
            Muse.CP_VALUE
        );
    }

    /**
     * 获取buff的力智
     *
     * @param {boolean} isStreet 是否站街
     * @returns {number} buff力智
     */
    getBuffAttribute(isStreet, isFavorite = false) {
        let totalBuffAmount = this.getRegisterTotalBuffAmount(isStreet);
        let actualAttribute = this.getRegisterActualAttribute(isStreet);
        let buffLevel = this.getActualBuffLevel(isStreet);

        if (!isStreet) {
            // 进图加上守护和二觉被动
            actualAttribute += this.guardAttribute;
        }

        return Assistant.getBuff(
            totalBuffAmount,
            actualAttribute,
            Muse.BUFF_POWER_LEVEL_DATA[buffLevel - 1],
            this.getJadeFixedValue(2),
            this.getJadePercentValue(5),
            this.getTalismanValue(),
            Muse.BUFF_FACTOR,
            Muse.BUFF_X,
            Muse.BUFF_Y,
            Muse.BUFF_Z,
            this.isCp,
            Muse.CP_VALUE
        );
    }

    /**
     * 唱歌三攻
     *
     * @returns {number} 唱歌三攻
     */
    getHymnBuffAttack(isFavorite = false) {
        return Math.round(this.getBuffAttack(false) * 0.1);
    }

    /**
     * 唱歌力智
     *
     * @returns {number} 唱歌力智
     */
    getHymnBuffAttribute(isFavorite = false) {
        return Math.round(this.getBuffAttribute(false) * 0.1);
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

        // 进图加上守护和二觉被动
        actualAttribute += this.guardAttribute;

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
