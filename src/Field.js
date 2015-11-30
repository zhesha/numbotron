import Cell from './Cell.js';

const ROWS = 5,
    COLS = 5;

class Field {
    constructor (wrapper) {
        this.grid = [];
        var grid = this.grid;
        for (let i = 0; i < ROWS; i ++) {
            let row = document.createElement("div");
            row.className = 'row';
            wrapper.appendChild(row);
            grid.push([]);
            for (let j = 0; j < COLS; j ++) {
                grid[i].push(new Cell(row));
            }
        }
    }
}

export default Field;