class Cell {
    constructor (row) {
        let cell = document.createElement("div");
        cell.className = 'cell';
        row.appendChild(cell);
        this.container = cell;
    }

    set value (v) {
        this.val = v;
    }

    get value () {
        return this.val;
    }
}

export default Cell;