class CellBase {
    constructor () {
        this.container = document.createElement("div");
        this.val = 0;
    }

    set value (v) {
        this.container.innerText = v != null ? v : '';
        this.val = v;
    }

    get value () {
        return this.val;
    }
}

export default CellBase;