import States from './States/States.js'
import Controller from './Controller.js'

var main = {
    start: () => {
        States.is = 'game';
        States.add(null, 'game', Controller.toGame);
        States.add('game', 'results', Controller.GameToResults);
        States.add('results', 'game', Controller.ResultsToGame);
    }
};
export default main;