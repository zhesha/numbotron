import CellBase from './CellBase.js';

class Next extends CellBase {
    constructor () {
        super();
        this.container.className = 'next';
        document.getElementById('nextWrapper').appendChild(this.container);
        this.generate();
    }

    generate () {
        this.value = Math.round(Math.random() * 3);
    }
}

export default new Next();