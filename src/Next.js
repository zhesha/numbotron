class Next {
    constructor () {
        let cell = document.createElement("div");
        cell.className = 'next';
        document.getElementById('nextWrapper').appendChild(cell);
        this.container = cell;
        this.value = 3;
    }

    generate () {
        this.value = Math.round(Math.random() + 2);
    }

    set value (v) {
        this.container.innerText = v ? v : '';
        this.val = v;
    }

    get value () {
        return this.val;
    }
}

export default new Next();