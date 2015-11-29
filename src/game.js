import states from './States/States.js'

class Game {
    static start () {
        states.is = 'game';
        console.log(states.is);
    }
}
export default Game;