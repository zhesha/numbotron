import Game from './Game.js';
import Next from './Next.js';

class Cell {
    constructor (wrapper, row, col) {
        this.row = row;
        this.col = col;
        let cell = document.createElement("div");
        cell.className = 'cell';
        wrapper.appendChild(cell);
        cell.addEventListener('click', () => {
            this.value = Next.value;
            Game.step(Next.value, row, col);
        });
        this.container = cell;
    }

    set value (v) {
        this.container.innerText = v ? v : '';
        this.val = v;
    }

    get value () {
        return this.val;
    }
}

export default Cell;