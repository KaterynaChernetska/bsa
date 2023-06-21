/* eslint-disable default-case */
/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
import controls from '../../constants/controls';
// import createElement from '../helpers/domHelper';

export async function fight(firstFighter, secondFighter) {
    return new Promise(resolve => {
        const playerOne = {
            ...firstFighter,
            isBlocking: false,
            side: 'left',
            currentHealth: 100,
            lastCriticalStrikeTime: 0,
            allowToBlock: true,
            KeyQ: false,
            KeyW: false,
            KeyE: false
        };

        const playerTwo = {
            ...secondFighter,
            isBlocking: false,
            side: 'right',
            currentHealth: 100,
            lastCriticalStrikeTime: 0,
            allowToBlock: true,
            KeyU: false,
            KeyI: false,
            KeyO: false
        };

        function handleKeyUp(event) {
            if (controls.PlayerOneCriticalHitCombination.includes(event.code)) {
                playerOne[event.code] = false;
                playerTwo.allowToBlock = true;
            } else if (controls.PlayerTwoCriticalHitCombination.includes(event.code)) {
                playerTwo[event.code] = false;
                playerOne.allowToBlock = true;
            }
            switch (event.code) {
                case controls.PlayerOneBlock:
                    playerOne.isBlocking = false;
                    // blockingPunch(playerOne);
                    break;
                case controls.PlayerTwoBlock:
                    playerTwo.isBlocking = false;
                    // blockingPunch(playerTwo);
                    break;
                case controls.PlayerOneAttack:
                    // createPunch(playerOne, playerTwo);
                    break;
                case controls.PlayerTwoAttack:
                    // createPunch(playerTwo, playerOne);
                    break;
            }
        }

        function handleKeydown(event) {
            if (controls.PlayerOneCriticalHitCombination.includes(event.code)) {
                playerOne[event.code] = true;
                playerTwo.isBlocking = false;
                // blockingPunch(playerTwo);
                // criticalPunch(playerOne, playerTwo);
                return;
            }
            if (controls.PlayerTwoCriticalHitCombination.includes(event.code)) {
                playerTwo[event.code] = true;
                playerOne.isBlocking = false;
                // blockingPunch(playerOne);
                // criticalPunch(playerTwo, playerOne);
                return;
            }
            switch (event.code) {
                case controls.PlayerOneBlock:
                    playerOne.isBlocking = true;
                    // blockingPunch(playerOne);
                    break;
                case controls.PlayerTwoBlock:
                    playerTwo.isBlocking = true;
                    // blockingPunch(playerTwo);
                    break;
            }
        }

        document.addEventListener('keydown', handleKeydown);
        document.addEventListener('keyup', handleKeyUp);
        resolve(playerOne);
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
