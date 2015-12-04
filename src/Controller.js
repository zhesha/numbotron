import Field from './Field.js';
import Game from './Game.js';

var Controller = {
    toGame: () => {
        var field = new Field(document.getElementById('gameFieldWrapper'));
        Game.start(field);
    },
    GameToResults: () => {

    },
    ResultsToGame: () => {

    }
};

export default Controller;