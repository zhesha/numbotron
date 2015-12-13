import CellBase from './CellBase.js';
import Next from './Next.js';

class Stash extends CellBase {
    constructor () {
        super();
        this.container.className = 'stash';
        document.getElementById('stashWrapper').appendChild(this.container);
        this.container.addEventListener('click', () => {
            if (this.value == undefined) {
                this.value = Next.value;
                Next.generate();
            } else {
                let tmp = this.value;
                this.value = Next.value;
                Next.value = tmp;
            }
        });
    }
}

export default new Stash();