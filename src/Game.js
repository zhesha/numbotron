import Next from './Next.js';

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
        this.check(value, row, col);
    }

    check (value, row, col) {
        var neighbors = new NeighborManager(this.field, value, row, col);
        if (value % 3 == 0 && neighbors.length >= 3) {
            neighbors.cells.forEach(v => v.value = null);
            let newVal = value * neighbors.length;
            this.field.getCell(row, col).value = newVal;
            this.check(newVal, row, col);
        } else {
            this.field.getCell(row, col).value = value;
        }
    }
}

export default new Game ();