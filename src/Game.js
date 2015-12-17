import Next from './Next.js';
import Stash from './Stash.js';
import Score from './Score.js';

class NeighborManager {
    constructor (field, value, row, col) {
        this.cells = [];
        this.field = field;
        this.checkNeighbors(value, row, col);
    }

    checkNeighbors (value, row, col) {
        this.check(value, row+1, col);
        this.check(value, row, col+1);
        this.check(value, row-1, col);
        this.check(value, row, col-1);
    }

    check (value, row, col) {
        if (!this.cells.some(v => v.col == col && v.row == row)) {
            var cell = this.field.getCell(row, col);
            if(cell && cell.value == value) {
                this.cells.push(cell);
                this.cells.concat(this.checkNeighbors(value, row, col));
            }
        }
    }

    get length () {
        return this.cells.length;
    }
}

class Game {
    start (field) {
        this.field = field;
    }

    step (value, row, col) {
        Score.value += value;
        this.check(value, row, col);
    }

    check (value, row, col) {
        var collapse = (newVal) => {
            Score.value += newVal;
            neighbors.cells.forEach(v => v.value = null);
            field.getCell(row, col).value = newVal;
            this.check(newVal, row, col);
        };

        var field = this.field;
        if (value == 0) {
            field.getCell(row, col).value = value;
            return;
        }
        var neighbors = new NeighborManager(this.field, value, row, col);
        if (value % 3 == 0 && neighbors.length >= 3) {
            let newVal = value * neighbors.length;
            collapse(newVal);
        } else if (value % 2 == 0 && neighbors.length >= 2) {
            let newVal = value * neighbors.length;
            collapse(newVal);
        } else if (value == 1 && neighbors.length >= 2) {
            let newVal = value * (neighbors.length == 0 ? 1 : neighbors.length);
            collapse(newVal);
        }
    }
}

export default new Game ();