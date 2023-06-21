/* eslint-disable default-case */
/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
import controls from '../../constants/controls';
import createElement from '../helpers/domHelper';

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

        function criticalPunch(attacker, defender) {
            const currentTime = Date.now();

            if (
                (attacker.KeyQ && attacker.KeyW && attacker.KeyE) ||
                (attacker.KeyU && attacker.KeyI && attacker.KeyO)
            ) {
                if (currentTime - attacker.lastCriticalStrikeTime >= 10000) {
                    attacker.lastCriticalStrikeTime = currentTime;
                    defender.allowToBlock = false;
                    const criticalDamage = attacker.attack * 2;
                    const healthBarFighter = document.querySelector(`#${defender.side}-fighter-indicator`);
                    const fighterWhoAttack = document.querySelector(`.arena___${attacker.side}-fighter`);
                    const criticalPunchElement = createElement({
                        tagName: 'span',
                        className: `arena__attacking-${attacker.side}-fighter-attacker`
                    });
                    criticalPunchElement.innerText = 'SUPER Punch!';
                    fighterWhoAttack.append(criticalPunchElement);

                    fighterWhoAttack.classList.add(`fighter-${attacker.side}-animation`);
                    criticalPunchElement.addEventListener('animationend', () => {
                        fighterWhoAttack.classList.remove(`fighter-${attacker.side}-animation`);
                    });

                    defender.currentHealth -= (criticalDamage / defender.health) * 100;

                    healthBarFighter.style.width = `${defender.currentHealth}%`;
                    if (defender.currentHealth < 50) {
                        healthBarFighter.style.backgroundColor = `#FF0000`;
                    }
                    if (defender.currentHealth <= 0) {
                        healthBarFighter.style.width = `0%`;
                        const loser = document.querySelector(`.arena___${defender.side}-fighter`);
                        loser.classList.add(`fighter_${defender.side}_lost`);
                        document.removeEventListener('keydown', handleKeydown);
                        document.removeEventListener('keyup', handleKeyUp);
                        resolve(attacker);
                    }
                }
            }
        }

        function blockingPunch(fighter) {
            if (!fighter.allowToBlock) {
                return;
            }

            const figterContainer = document.querySelector(`.arena___${fighter.side}-fighter`);
            const isBlockingSpanCreated = document.querySelector(`.arena__blocking-${fighter.side}-fighter`);

            if (!fighter.isBlocking) {
                if (!isBlockingSpanCreated) return;
                isBlockingSpanCreated.remove();
                return;
            }
            if (isBlockingSpanCreated) {
                return;
            }

            const blockingElement = createElement({
                tagName: 'span',
                className: `arena__blocking-${fighter.side}-fighter`
            });

            blockingElement.innerText = 'Block!';
            figterContainer.append(blockingElement);
        }

        function createPunch(attacker, defender) {
            if (attacker.isBlocking || defender.isBlocking) return;
            const isAttackingSpanCreated = document.querySelector(`.arena__attacking-${attacker.side}-fighter`);
            if (isAttackingSpanCreated) {
                isAttackingSpanCreated.remove();
                return;
            }
            const healthBarFighter = document.querySelector(`#${defender.side}-fighter-indicator`);
            const fighter = document.querySelector(`.arena___${attacker.side}-fighter`);
            const punchElement = createElement({
                tagName: 'span',
                className: `arena__attacking-${attacker.side}-fighter`
            });
            punchElement.innerText = 'Punch!';
            fighter.append(punchElement);
            const damage = getDamage(attacker, defender);
            defender.currentHealth -= (damage / defender.health) * 100;

            healthBarFighter.style.width = `${defender.currentHealth}%`;
            if (defender.currentHealth < 50) {
                healthBarFighter.style.backgroundColor = `#FF0000`;
            }
            if (defender.currentHealth <= 0) {
                healthBarFighter.style.width = `0%`;
                const loser = document.querySelector(`.arena___${defender.side}-fighter`);
                loser.classList.add(`fighter_${defender.side}_lost`);
                document.removeEventListener('keydown', handleKeydown);
                document.removeEventListener('keyup', handleKeyUp);
                resolve(attacker);
            }
        }

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
                    blockingPunch(playerOne);
                    break;
                case controls.PlayerTwoBlock:
                    playerTwo.isBlocking = false;
                    blockingPunch(playerTwo);
                    break;
                case controls.PlayerOneAttack:
                    createPunch(playerOne, playerTwo);
                    break;
                case controls.PlayerTwoAttack:
                    createPunch(playerTwo, playerOne);
                    break;
            }
        }

        function handleKeydown(event) {
            if (controls.PlayerOneCriticalHitCombination.includes(event.code)) {
                playerOne[event.code] = true;
                playerTwo.isBlocking = false;
                blockingPunch(playerTwo);
                criticalPunch(playerOne, playerTwo);
                return;
            }
            if (controls.PlayerTwoCriticalHitCombination.includes(event.code)) {
                playerTwo[event.code] = true;
                playerOne.isBlocking = false;
                blockingPunch(playerOne);
                criticalPunch(playerTwo, playerOne);
                return;
            }
            switch (event.code) {
                case controls.PlayerOneBlock:
                    playerOne.isBlocking = true;
                    blockingPunch(playerOne);
                    break;
                case controls.PlayerTwoBlock:
                    playerTwo.isBlocking = true;
                    blockingPunch(playerTwo);
                    break;
            }
        }

        document.addEventListener('keydown', handleKeydown);
        document.addEventListener('keyup', handleKeyUp);
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
