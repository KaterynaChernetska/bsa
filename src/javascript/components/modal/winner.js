import createElement from '../../helpers/domHelper';
import { createFighterImage } from '../fighterPreview';
import showModal from './modal';

export default function showWinnerModal(fighter) {
    const winnerContainer = createElement({ tagName: 'div', className: 'modal-winner__container' });
    const winnerImage = createFighterImage(fighter);
    winnerContainer.appendChild(winnerImage);
    showModal({
        title: `${fighter.name} is the winner!`,
        bodyElement: winnerContainer,
        onClose: () => document.location.reload()
    });
}
