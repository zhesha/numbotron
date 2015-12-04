(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Game = require('./Game.js');

var _Game2 = _interopRequireDefault(_Game);

var _Next = require('./Next.js');

var _Next2 = _interopRequireDefault(_Next);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cell = (function () {
    function Cell(wrapper, row, col) {
        var _this = this;

        _classCallCheck(this, Cell);

        this.row = row;
        this.col = col;
        var cell = document.createElement("div");
        cell.className = 'cell';
        wrapper.appendChild(cell);
        cell.addEventListener('click', function () {
            _this.value = _Next2.default.value;
            _Game2.default.step(_Next2.default.value, row, col);
        });
        this.container = cell;
    }

    _createClass(Cell, [{
        key: 'value',
        set: function set(v) {
            this.container.innerText = v ? v : '';
            this.val = v;
        },
        get: function get() {
            return this.val;
        }
    }]);

    return Cell;
})();

exports.default = Cell;

},{"./Game.js":4,"./Next.js":5}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Field = require('./Field.js');

var _Field2 = _interopRequireDefault(_Field);

var _Game = require('./Game.js');

var _Game2 = _interopRequireDefault(_Game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Controller = {
    toGame: function toGame() {
        var field = new _Field2.default(document.getElementById('gameFieldWrapper'));
        _Game2.default.start(field);
    },
    GameToResults: function GameToResults() {},
    ResultsToGame: function ResultsToGame() {}
};

exports.default = Controller;

},{"./Field.js":3,"./Game.js":4}],3:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Cell = require('./Cell.js');

var _Cell2 = _interopRequireDefault(_Cell);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ROWS = 5,
    COLS = 5;

var Field = (function () {
    function Field(wrapper) {
        _classCallCheck(this, Field);

        this.grid = [];
        var grid = this.grid;
        for (var i = 0; i < ROWS; i++) {
            var row = document.createElement("div");
            row.className = 'row';
            wrapper.appendChild(row);
            grid.push([]);
            for (var j = 0; j < COLS; j++) {
                grid[i].push(new _Cell2.default(row, i, j));
            }
        }
    }

    _createClass(Field, [{
        key: 'getCell',
        value: function getCell(row, col) {
            var tmp = this.grid[row];
            if (tmp) {
                return tmp[col];
            } else {
                return null;
            }
        }
    }]);

    return Field;
})();

exports.default = Field;

},{"./Cell.js":1}],4:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Next = require('./Next.js');

var _Next2 = _interopRequireDefault(_Next);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NeighborManager = (function () {
    function NeighborManager(field, value, row, col) {
        _classCallCheck(this, NeighborManager);

        this.cells = [];
        this.field = field;
        this.checkNeighbors(value, row, col);
    }

    _createClass(NeighborManager, [{
        key: 'checkNeighbors',
        value: function checkNeighbors(value, row, col) {
            this.check(value, row + 1, col);
            this.check(value, row, col + 1);
            this.check(value, row - 1, col);
            this.check(value, row, col - 1);
        }
    }, {
        key: 'check',
        value: function check(value, row, col) {
            if (!this.cells.some(function (v) {
                return v.col == col && v.row == row;
            })) {
                var cell = this.field.getCell(row, col);
                if (cell && cell.value == value) {
                    this.cells.push(cell);
                    this.cells.concat(this.checkNeighbors(value, row, col));
                }
            }
        }
    }, {
        key: 'length',
        get: function get() {
            return this.cells.length;
        }
    }]);

    return NeighborManager;
})();

var Game = (function () {
    function Game() {
        _classCallCheck(this, Game);
    }

    _createClass(Game, [{
        key: 'start',
        value: function start(field) {
            this.field = field;
        }
    }, {
        key: 'step',
        value: function step(value, row, col) {
            this.check(value, row, col);
        }
    }, {
        key: 'check',
        value: function check(value, row, col) {
            var neighbors = new NeighborManager(this.field, value, row, col);
            if (value % 3 == 0 && neighbors.length >= 3) {
                neighbors.cells.forEach(function (v) {
                    return v.value = null;
                });
                var newVal = value * neighbors.length;
                this.field.getCell(row, col).value = newVal;
                this.check(newVal, row, col);
            } else {
                this.field.getCell(row, col).value = value;
            }
        }
    }]);

    return Game;
})();

exports.default = new Game();

},{"./Next.js":5}],5:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Next = (function () {
    function Next() {
        _classCallCheck(this, Next);

        this.value = 3;
    }

    _createClass(Next, [{
        key: "value",
        set: function set(v) {
            this.val = v;
        },
        get: function get() {
            return this.val;
        }
    }]);

    return Next;
})();

exports.default = new Next();

},{}],6:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var States = (function () {
    function States() {
        _classCallCheck(this, States);

        this.index = [null, 'game', 'results'];
        this.states = this.createStates(this.index);
        this.config(null, 'game');
        this.config('game', 'results');
        this.config('results', 'game');
    }

    _createClass(States, [{
        key: 'createStates',
        value: function createStates(states) {
            this.current = states[0];
            return states.map(function (v) {
                return { state: v, transitions: [] };
            });
        }
    }, {
        key: 'config',
        value: function config(state, transition) {
            this.states.some(function (v) {
                if (v.state == state) {
                    v.transitions.push({ transition: transition, fn: [] });
                    return true;
                }
            });
        }
    }, {
        key: 'add',
        value: function add(fromState, toState, handler) {
            this.states[this.index.indexOf(fromState)].transitions.some(function (v) {
                if (v.transition == toState) {
                    v.fn.push(handler);
                    return true;
                }
            });
        }
    }, {
        key: 'is',
        set: function set(state) {
            var curr = this.current;
            var legal = false;
            this.states.some(function (v) {
                if (v.state == curr) {
                    legal = v.transitions.some(function (transition) {
                        if (transition.transition == state) {
                            transition.fn.forEach(function (fn) {
                                return fn();
                            });
                            return true;
                        }
                    });
                    return true;
                }
            });
            if (legal) {
                this.current = state;
            } else {
                console.error('illegal transition');
            }
        },
        get: function get() {
            return this.current;
        }
    }]);

    return States;
})();

exports.default = new States();

},{}],7:[function(require,module,exports){
"use strict";

var _main = require("./main.js");

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener("DOMContentLoaded", function () {
    _main2.default.start();
});

},{"./main.js":8}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _States = require('./States/States.js');

var _States2 = _interopRequireDefault(_States);

var _Controller = require('./Controller.js');

var _Controller2 = _interopRequireDefault(_Controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var main = {
    start: function start() {
        _States2.default.add(null, 'game', _Controller2.default.toGame);
        _States2.default.add('game', 'results', _Controller2.default.GameToResults);
        _States2.default.add('results', 'game', _Controller2.default.ResultsToGame);
        _States2.default.is = 'game';
    }
};
exports.default = main;

},{"./Controller.js":2,"./States/States.js":6}]},{},[7])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvQ2VsbC5qcyIsInNyYy9Db250cm9sbGVyLmpzIiwic3JjL0ZpZWxkLmpzIiwic3JjL0dhbWUuanMiLCJzcmMvTmV4dC5qcyIsInNyYy9TdGF0ZXMvU3RhdGVzLmpzIiwic3JjL2luZGV4LmpzIiwic3JjL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ0dNLElBQUk7QUFDTixhQURFLElBQUksQ0FDTyxPQUFPLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRTs7OzhCQUQ5QixJQUFJOztBQUVGLFlBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBQ2YsWUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFDZixZQUFJLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3pDLFlBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDO0FBQ3hCLGVBQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDMUIsWUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFNO0FBQ2pDLGtCQUFLLEtBQUssR0FBRyxlQUFLLEtBQUssQ0FBQztBQUN4QiwyQkFBSyxJQUFJLENBQUMsZUFBSyxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQ25DLENBQUMsQ0FBQztBQUNILFlBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0tBQ3pCOztpQkFaQyxJQUFJOzswQkFjSyxDQUFDLEVBQUU7QUFDVixnQkFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDdEMsZ0JBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1NBQ2hCOzRCQUVZO0FBQ1QsbUJBQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztTQUNuQjs7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QUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUscUJBQVcsYUFBYSxDQUFDLENBQUM7QUFDeEQseUJBQU8sRUFBRSxHQUFHLE1BQU0sQ0FBQztLQUN0QjtDQUNKLENBQUM7a0JBQ2EsSUFBSSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgR2FtZSBmcm9tICcuL0dhbWUuanMnO1xuaW1wb3J0IE5leHQgZnJvbSAnLi9OZXh0LmpzJztcblxuY2xhc3MgQ2VsbCB7XG4gICAgY29uc3RydWN0b3IgKHdyYXBwZXIsIHJvdywgY29sKSB7XG4gICAgICAgIHRoaXMucm93ID0gcm93O1xuICAgICAgICB0aGlzLmNvbCA9IGNvbDtcbiAgICAgICAgbGV0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBjZWxsLmNsYXNzTmFtZSA9ICdjZWxsJztcbiAgICAgICAgd3JhcHBlci5hcHBlbmRDaGlsZChjZWxsKTtcbiAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBOZXh0LnZhbHVlO1xuICAgICAgICAgICAgR2FtZS5zdGVwKE5leHQudmFsdWUsIHJvdywgY29sKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gY2VsbDtcbiAgICB9XG5cbiAgICBzZXQgdmFsdWUgKHYpIHtcbiAgICAgICAgdGhpcy5jb250YWluZXIuaW5uZXJUZXh0ID0gdiA/IHYgOiAnJztcbiAgICAgICAgdGhpcy52YWwgPSB2O1xuICAgIH1cblxuICAgIGdldCB2YWx1ZSAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbDtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENlbGw7IiwiaW1wb3J0IEZpZWxkIGZyb20gJy4vRmllbGQuanMnO1xuaW1wb3J0IEdhbWUgZnJvbSAnLi9HYW1lLmpzJztcblxudmFyIENvbnRyb2xsZXIgPSB7XG4gICAgdG9HYW1lOiAoKSA9PiB7XG4gICAgICAgIHZhciBmaWVsZCA9IG5ldyBGaWVsZChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZUZpZWxkV3JhcHBlcicpKTtcbiAgICAgICAgR2FtZS5zdGFydChmaWVsZCk7XG4gICAgfSxcbiAgICBHYW1lVG9SZXN1bHRzOiAoKSA9PiB7XG5cbiAgICB9LFxuICAgIFJlc3VsdHNUb0dhbWU6ICgpID0+IHtcblxuICAgIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbnRyb2xsZXI7IiwiaW1wb3J0IENlbGwgZnJvbSAnLi9DZWxsLmpzJztcblxuY29uc3QgUk9XUyA9IDUsXG4gICAgQ09MUyA9IDU7XG5cbmNsYXNzIEZpZWxkIHtcbiAgICBjb25zdHJ1Y3RvciAod3JhcHBlcikge1xuICAgICAgICB0aGlzLmdyaWQgPSBbXTtcbiAgICAgICAgdmFyIGdyaWQgPSB0aGlzLmdyaWQ7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgUk9XUzsgaSArKykge1xuICAgICAgICAgICAgbGV0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICByb3cuY2xhc3NOYW1lID0gJ3Jvdyc7XG4gICAgICAgICAgICB3cmFwcGVyLmFwcGVuZENoaWxkKHJvdyk7XG4gICAgICAgICAgICBncmlkLnB1c2goW10pO1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBDT0xTOyBqICsrKSB7XG4gICAgICAgICAgICAgICAgZ3JpZFtpXS5wdXNoKG5ldyBDZWxsKHJvdywgaSwgaikpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0Q2VsbCAocm93LCBjb2wpIHtcbiAgICAgICAgdmFyIHRtcCA9IHRoaXMuZ3JpZFtyb3ddO1xuICAgICAgICBpZiAodG1wKSB7XG4gICAgICAgICAgICByZXR1cm4gdG1wW2NvbF07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRmllbGQ7IiwiaW1wb3J0IE5leHQgZnJvbSAnLi9OZXh0LmpzJztcblxuY2xhc3MgTmVpZ2hib3JNYW5hZ2VyIHtcbiAgICBjb25zdHJ1Y3RvciAoZmllbGQsIHZhbHVlLCByb3csIGNvbCkge1xuICAgICAgICB0aGlzLmNlbGxzID0gW107XG4gICAgICAgIHRoaXMuZmllbGQgPSBmaWVsZDtcbiAgICAgICAgdGhpcy5jaGVja05laWdoYm9ycyh2YWx1ZSwgcm93LCBjb2wpO1xuICAgIH1cblxuICAgIGNoZWNrTmVpZ2hib3JzICh2YWx1ZSwgcm93LCBjb2wpIHtcbiAgICAgICAgdGhpcy5jaGVjayh2YWx1ZSwgcm93KzEsIGNvbCk7XG4gICAgICAgIHRoaXMuY2hlY2sodmFsdWUsIHJvdywgY29sKzEpO1xuICAgICAgICB0aGlzLmNoZWNrKHZhbHVlLCByb3ctMSwgY29sKTtcbiAgICAgICAgdGhpcy5jaGVjayh2YWx1ZSwgcm93LCBjb2wtMSk7XG4gICAgfVxuXG4gICAgY2hlY2sgKHZhbHVlLCByb3csIGNvbCkge1xuICAgICAgICBpZiAoIXRoaXMuY2VsbHMuc29tZSh2ID0+IHYuY29sID09IGNvbCAmJiB2LnJvdyA9PSByb3cpKSB7XG4gICAgICAgICAgICB2YXIgY2VsbCA9IHRoaXMuZmllbGQuZ2V0Q2VsbChyb3csIGNvbCk7XG4gICAgICAgICAgICBpZihjZWxsICYmIGNlbGwudmFsdWUgPT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNlbGxzLnB1c2goY2VsbCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jZWxscy5jb25jYXQodGhpcy5jaGVja05laWdoYm9ycyh2YWx1ZSwgcm93LCBjb2wpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBsZW5ndGggKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jZWxscy5sZW5ndGg7XG4gICAgfVxufVxuXG5jbGFzcyBHYW1lIHtcbiAgICBzdGFydCAoZmllbGQpIHtcbiAgICAgICAgdGhpcy5maWVsZCA9IGZpZWxkO1xuICAgIH1cblxuICAgIHN0ZXAgKHZhbHVlLCByb3csIGNvbCkge1xuICAgICAgICB0aGlzLmNoZWNrKHZhbHVlLCByb3csIGNvbCk7XG4gICAgfVxuXG4gICAgY2hlY2sgKHZhbHVlLCByb3csIGNvbCkge1xuICAgICAgICB2YXIgbmVpZ2hib3JzID0gbmV3IE5laWdoYm9yTWFuYWdlcih0aGlzLmZpZWxkLCB2YWx1ZSwgcm93LCBjb2wpO1xuICAgICAgICBpZiAodmFsdWUgJSAzID09IDAgJiYgbmVpZ2hib3JzLmxlbmd0aCA+PSAzKSB7XG4gICAgICAgICAgICBuZWlnaGJvcnMuY2VsbHMuZm9yRWFjaCh2ID0+IHYudmFsdWUgPSBudWxsKTtcbiAgICAgICAgICAgIGxldCBuZXdWYWwgPSB2YWx1ZSAqIG5laWdoYm9ycy5sZW5ndGg7XG4gICAgICAgICAgICB0aGlzLmZpZWxkLmdldENlbGwocm93LCBjb2wpLnZhbHVlID0gbmV3VmFsO1xuICAgICAgICAgICAgdGhpcy5jaGVjayhuZXdWYWwsIHJvdywgY29sKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZmllbGQuZ2V0Q2VsbChyb3csIGNvbCkudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IEdhbWUgKCk7IiwiY2xhc3MgTmV4dCB7XG4gICAgY29uc3RydWN0b3IgKCkge1xuICAgICAgICB0aGlzLnZhbHVlID0gMztcbiAgICB9XG5cbiAgICBzZXQgdmFsdWUgKHYpIHtcbiAgICAgICAgdGhpcy52YWwgPSB2O1xuICAgIH1cblxuICAgIGdldCB2YWx1ZSAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbDtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBOZXh0KCk7IiwiY2xhc3MgU3RhdGVze1xuICAgIGNvbnN0cnVjdG9yICgpIHtcbiAgICAgICAgdGhpcy5pbmRleCA9IFtudWxsLCAnZ2FtZScsICdyZXN1bHRzJ107XG4gICAgICAgIHRoaXMuc3RhdGVzID0gdGhpcy5jcmVhdGVTdGF0ZXModGhpcy5pbmRleCk7XG4gICAgICAgIHRoaXMuY29uZmlnKG51bGwsICdnYW1lJyk7XG4gICAgICAgIHRoaXMuY29uZmlnKCdnYW1lJywgJ3Jlc3VsdHMnKTtcbiAgICAgICAgdGhpcy5jb25maWcoJ3Jlc3VsdHMnLCAnZ2FtZScpO1xuICAgIH1cblxuICAgIGNyZWF0ZVN0YXRlcyAoc3RhdGVzKSB7XG4gICAgICAgIHRoaXMuY3VycmVudCA9IHN0YXRlc1swXTtcbiAgICAgICAgcmV0dXJuIHN0YXRlcy5tYXAodiA9PiB7cmV0dXJuIHtzdGF0ZTogdiwgdHJhbnNpdGlvbnM6IFtdfX0pO1xuICAgIH1cblxuICAgIGNvbmZpZyAoc3RhdGUsIHRyYW5zaXRpb24pIHtcbiAgICAgICAgdGhpcy5zdGF0ZXMuc29tZSh2ID0+IHtcbiAgICAgICAgICAgIGlmICh2LnN0YXRlID09IHN0YXRlKSB7XG4gICAgICAgICAgICAgICAgdi50cmFuc2l0aW9ucy5wdXNoKHt0cmFuc2l0aW9uOiB0cmFuc2l0aW9uLCBmbjogW119KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2V0IGlzIChzdGF0ZSkge1xuICAgICAgICBsZXQgY3VyciA9IHRoaXMuY3VycmVudDtcbiAgICAgICAgdmFyIGxlZ2FsID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc3RhdGVzLnNvbWUodiA9PiB7XG4gICAgICAgICAgICBpZiAodi5zdGF0ZSA9PSBjdXJyKSB7XG4gICAgICAgICAgICAgICAgbGVnYWwgPSB2LnRyYW5zaXRpb25zLnNvbWUodHJhbnNpdGlvbiA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0cmFuc2l0aW9uLnRyYW5zaXRpb24gPT0gc3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb24uZm4uZm9yRWFjaChmbiA9PiBmbigpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAobGVnYWwpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudCA9IHN0YXRlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignaWxsZWdhbCB0cmFuc2l0aW9uJylcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBpcyAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnQ7XG4gICAgfVxuXG4gICAgYWRkIChmcm9tU3RhdGUsIHRvU3RhdGUsIGhhbmRsZXIpIHtcbiAgICAgICAgdGhpcy5zdGF0ZXNbdGhpcy5pbmRleC5pbmRleE9mKGZyb21TdGF0ZSldLnRyYW5zaXRpb25zLnNvbWUodiA9PiB7XG4gICAgICAgICAgICBpZiAodi50cmFuc2l0aW9uID09IHRvU3RhdGUpIHtcbiAgICAgICAgICAgICAgICB2LmZuLnB1c2goaGFuZGxlcik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IFN0YXRlcygpO1xuIiwiaW1wb3J0IG1haW4gZnJvbSAnLi9tYWluLmpzJztcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oKSB7XG4gICAgbWFpbi5zdGFydCgpO1xufSk7IiwiaW1wb3J0IFN0YXRlcyBmcm9tICcuL1N0YXRlcy9TdGF0ZXMuanMnXG5pbXBvcnQgQ29udHJvbGxlciBmcm9tICcuL0NvbnRyb2xsZXIuanMnXG5cbnZhciBtYWluID0ge1xuICAgIHN0YXJ0OiAoKSA9PiB7XG4gICAgICAgIFN0YXRlcy5hZGQobnVsbCwgJ2dhbWUnLCBDb250cm9sbGVyLnRvR2FtZSk7XG4gICAgICAgIFN0YXRlcy5hZGQoJ2dhbWUnLCAncmVzdWx0cycsIENvbnRyb2xsZXIuR2FtZVRvUmVzdWx0cyk7XG4gICAgICAgIFN0YXRlcy5hZGQoJ3Jlc3VsdHMnLCAnZ2FtZScsIENvbnRyb2xsZXIuUmVzdWx0c1RvR2FtZSk7XG4gICAgICAgIFN0YXRlcy5pcyA9ICdnYW1lJztcbiAgICB9XG59O1xuZXhwb3J0IGRlZmF1bHQgbWFpbjsiXX0=
