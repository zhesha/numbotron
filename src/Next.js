class Next {
    constructor () {
        this.value = 3;
    }

    set value (v) {
        this.val = v;
    }

    get value () {
        return this.val;
    }
}

export default new Next();