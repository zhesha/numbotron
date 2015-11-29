class States{
    constructor () {
        this.states = this.createStates([null, 'game', 'results']);
        this.config(null, 'game');
        this.config('game', 'results');
        this.config('results', 'game');
    }

    createStates (states) {
        this.current = states[0];
        return states.map(v => {return {state: v, inputs: []}});
    }

    config (state, input) {
        this.states.some(v => {
            if (v.state == state) {
                v.inputs.push({input: input, fn: []});
                return true;
            }
        });
    }

    set is (state) {
        let curr = this.current;
        var legal = false;
        this.states.some(v => {
            if (v.state == curr) {
                legal = v.inputs.some(input => {
                    if (input.input == state) {
                        input.fn.forEach(fn => fn());
                        return true;
                    }
                });
                return true;
            }
        });
        if (legal) {
            this.current = state;
        } else {
            console.error('illegal input')
        }
    }

    get is () {
        return this.current;
    }
}

export default new States();
