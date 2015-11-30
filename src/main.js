import States from './States/States.js'

var main = {
    start: () => {
        States.is = 'game';
        console.log(States.is);
    }
};
export default main;