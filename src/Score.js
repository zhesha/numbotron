import CellBase from './CellBase.js';

class Score extends CellBase {
    constructor () {
        super();
        this.container.className = 'score';
        document.getElementById('score').appendChild(this.container);
    }
}

export default new Score();