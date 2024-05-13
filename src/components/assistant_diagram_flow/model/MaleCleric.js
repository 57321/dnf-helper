import Assistant from "./Assistant.js";

/**
 * 奶爸
 */
export default class MaleCleric extends Assistant {
    /**
     * 守护徽章
     */
    guardAttribute;

    /**
     * 奶爸二觉层数
     */
    secondAwakeningCount;

    /**
     * 奶爸二觉单层四维
     */
    secondAwakeningAttribute;

    constructor(content) {
        super(content);
        this.roleType = 401;
        this.guardAttribute = content.guardAttribute ?? 181;
        this.secondAwakeningCount = content.secondAwakeningCount ?? 24;
        this.secondAwakeningAttribute = content.secondAwakeningAttribute ?? 37;
    }

    static BUFF_FACTOR = 620;

    static BUFF_X = 4345;

    static BUFF_Y = 3498;

    static BUFF_Z = 28012;

    static CP_VALUE = 1.008;

    /**
     * 三攻
     */
    static BUFF_ATTACK_LEVEL_DATA = [
        44, 45, 47, 49, 50, 52, 54, 55, 57, 59,
        60, 62, 64, 65, 67, 69, 70, 72, 74, 77,
        78, 80, 82, 83, 85, 87, 88, 90, 92, 93,
        95, 97, 98, 100, 102, 103, 105, 107, 108, 111,
    ];

    /**
     * 力智
     */
    static BUFF_POWER_LEVEL_DATA = [
        171, 182, 193, 206, 217, 228, 239, 251, 263, 275,
        286, 297, 310, 321, 333, 343, 355, 367, 379, 390,
        401, 414, 425, 437, 448, 459, 471, 483, 494, 505,
        518, 529, 541, 552, 565, 575, 587, 598, 609, 622,
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
            // 进图加上守护和二觉被动
            actualAttribute += this.guardAttribute + this.secondAwakeningCount * this.secondAwakeningAttribute;
        }

        return Assistant.getBuff(
            totalBuffAmount,
            actualAttribute,
            MaleCleric.BUFF_ATTACK_LEVEL_DATA[buffLevel - 1],
            this.getJadeFixedValue(1),
            this.getJadePercentValue(4),
            1,
            MaleCleric.BUFF_FACTOR,
            MaleCleric.BUFF_X,
            MaleCleric.BUFF_Y,
            MaleCleric.BUFF_Z,
            this.isCp,
            MaleCleric.CP_VALUE
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
            actualAttribute += this.guardAttribute + this.secondAwakeningCount * this.secondAwakeningAttribute;
        }

        return Assistant.getBuff(
            totalBuffAmount,
            actualAttribute,
            MaleCleric.BUFF_POWER_LEVEL_DATA[buffLevel - 1],
            this.getJadeFixedValue(2),
            this.getJadePercentValue(5),
            this.getTalismanValue(),
            MaleCleric.BUFF_FACTOR,
            MaleCleric.BUFF_X,
            MaleCleric.BUFF_Y,
            MaleCleric.BUFF_Z,
            this.isCp,
            MaleCleric.CP_VALUE
        );
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
        actualAttribute += this.guardAttribute + this.secondAwakeningCount * this.secondAwakeningAttribute;

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
