import Field from './Field.js';

var Controller = {
    ToGame: () => {
        new Field(document.getElementById('gameFieldWrapper'));
    },
    GameToResults: () => {

    },
    ResultsToGame: () => {

    }
};

export default Controller;