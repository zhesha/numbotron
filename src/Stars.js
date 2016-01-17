import CellBase from './CellBase.js';
import Next from './Next.js';

class Stars extends CellBase {
    constructor () {
        super();
        this.container.className = 'stars';
        document.getElementById('starsWrapper').appendChild(this.container);
    }
}

export default new Stars();