import Assistant from "./Assistant.js";

/**
 * 奶妈
 */
export default class FemaleCleric extends Assistant {
    constructor(content) {
        super(content);
        this.roleType = 1401;
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
        39, 41, 43, 44, 45, 47, 49, 50, 52, 53,
        54, 56, 58, 59, 61, 62, 63, 65, 67, 69,
        70, 71, 73, 75, 77, 79, 80, 81, 83, 85,
        86, 88, 89, 90, 92, 94, 95, 97, 98, 100
    ];

    /**
     * 力智
     */
    static BUFF_POWER_LEVEL_DATA = [
        154, 164, 176, 186, 197, 206, 216, 227, 237, 249,
        259, 269, 280, 290, 302, 311, 321, 332, 342, 353,
        363, 374, 385, 395, 406, 415, 425, 437, 447, 458,
        468, 478, 489, 500, 511, 520, 530, 541, 551, 563,
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
        return Assistant.getBuff(
            totalBuffAmount,
            actualAttribute,
            FemaleCleric.BUFF_ATTACK_LEVEL_DATA[buffLevel - 1],
            this.getJadeFixedValue(1),
            this.getJadePercentValue(4),
            1,
            FemaleCleric.BUFF_FACTOR,
            FemaleCleric.BUFF_X,
            FemaleCleric.BUFF_Y,
            FemaleCleric.BUFF_Z,
            this.isCp,
            FemaleCleric.CP_VALUE
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
        return Assistant.getBuff(
            totalBuffAmount,
            actualAttribute,
            FemaleCleric.BUFF_POWER_LEVEL_DATA[buffLevel - 1],
            this.getJadeFixedValue(2),
            this.getJadePercentValue(5),
            this.getTalismanValue(),
            FemaleCleric.BUFF_FACTOR,
            FemaleCleric.BUFF_X,
            FemaleCleric.BUFF_Y,
            FemaleCleric.BUFF_Z,
            this.isCp,
            FemaleCleric.CP_VALUE
        );
    }

    /**
     * 唱歌三攻
     *
     * @returns {number} 唱歌三攻
     */
    getHymnBuffAttack(isFavorite = false) {
        return Math.round(this.getBuffAttack(false) * 0.15);
    }

    /**
     * 唱歌力智
     *
     * @returns {number} 唱歌力智
     */
    getHymnBuffAttribute(isFavorite = false) {
        return Math.round(this.getBuffAttribute(false) * 0.15);
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
