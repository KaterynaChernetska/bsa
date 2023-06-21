/* eslint-disable default-case */
/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */

export async function fight(firstFighter, secondFighter) {
    return new Promise(resolve => {
        if (secondFighter.health <= 0) resolve(firstFighter);
        resolve(secondFighter);
    });
}

export function getHitPower({ attack }) {
    const criticalHitChance = Math.random() + 1;
    return attack * criticalHitChance;
    // return hit power
}

export function getBlockPower({ defense }) {
    const dodgeChance = Math.random() + 1;
    return defense * dodgeChance;
    // return block power
}

export function getDamage(attacker, defender) {
    const damage = getHitPower(attacker) - getBlockPower(defender);
    return damage > 0 ? damage : 0;
    // return damage
}
