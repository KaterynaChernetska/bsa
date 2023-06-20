import createElement from '../helpers/domHelper';

export function createFighterImage(fighter) {
    const { source, name } = fighter;
    const attributes = {
        src: source,
        title: name,
        alt: name
    };
    const imgElement = createElement({
        tagName: 'img',
        className: 'fighter-preview___img',
        attributes
    });

    return imgElement;
}
export function createFighterPreview(fighter, position) {
    const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
    const fighterElement = createElement({
        tagName: 'div',
        className: `fighter-preview___root ${positionClassName}`
    });
    if (fighter) {
        const imageElement = createFighterImage(fighter);
        const fighterInfo = createElement({ tagName: 'ul', className: 'fighter-preview__info' });
        fighterInfo.innerHTML = `<li>Name: ${fighter.name}</li>
        <li>Health: ${fighter.health}</li>
        <li>Defense: ${fighter.defense}</li>
        <li>Attack: ${fighter.attack}</li>`;

        fighterElement.append(imageElement);
        fighterElement.append(fighterInfo);
    }
    // todo: show fighter info (image, name, health, etc.)

    return fighterElement;
}
