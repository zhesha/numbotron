import Game from './Game.js';
import Next from './Next.js';
import CellBase from './CellBase.js';

class Cell extends CellBase {
    constructor (wrapper, row, col) {
        super();
        this.row = row;
        this.col = col;
        this.container.className = 'cell';
        wrapper.appendChild(this.container);
        this.container.addEventListener('click', () => {
            this.value = Next.value;
            Game.step(Next.value, row, col);
            Next.generate();
        });
    }
}

export default Cell;