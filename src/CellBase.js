class CellBase {
    constructor () {
        this.container = document.createElement("div");
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