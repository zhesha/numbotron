class States{
    constructor () {
        this.index = [null, 'game', 'results'];
        this.states = this.createStates(this.index);
        this.config(null, 'game');
        this.config('game', 'results');
        this.config('results', 'game');
    }

    createStates (states) {
        this.current = states[0];
        return states.map(v => {return {state: v, transitions: []}});
    }

    config (state, transition) {
        this.states.some(v => {
            if (v.state == state) {
                v.transitions.push({transition: transition, fn: []});
                return true;
            }
        });
    }

    set is (state) {
        let curr = this.current;
        var legal = false;
        this.states.some(v => {
            if (v.state == curr) {
                legal = v.transitions.some(transition => {
                    if (transition.transition == state) {
                        transition.fn.forEach(fn => fn());
                        return true;
                    }
                });
                return true;
            }
        });
        if (legal) {
            this.current = state;
        } else {
            console.error('illegal transition')
        }
    }

    get is () {
        return this.current;
    }

    add (fromState, toState, handler) {
        this.states[this.index.indexOf(fromState)].transitions.some(v => {
            if (v.transition == toState) {
                v.fn.push(handler);
                return true;
            }
        });
    }
}

export default new States();
