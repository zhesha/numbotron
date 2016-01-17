(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Game = require('./Game.js');

var _Game2 = _interopRequireDefault(_Game);

var _Next = require('./Next.js');

var _Next2 = _interopRequireDefault(_Next);

var _CellBase2 = require('./CellBase.js');

var _CellBase3 = _interopRequireDefault(_CellBase2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Cell = (function (_CellBase) {
    _inherits(Cell, _CellBase);

    function Cell(wrapper, row, col) {
        _classCallCheck(this, Cell);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Cell).call(this));

        _this.row = row;
        _this.col = col;
        _this.container.className = 'cell';
        wrapper.appendChild(_this.container);
        _this.container.addEventListener('click', function () {
            if (!_this.value) {
                _this.value = _Next2.default.value;
                _Game2.default.step(_Next2.default.value, row, col);
                _Next2.default.generate();
            }
        });
        return _this;
    }

    return Cell;
})(_CellBase3.default);

exports.default = Cell;

},{"./CellBase.js":2,"./Game.js":5,"./Next.js":6}],2:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CellBase = (function () {
    function CellBase() {
        _classCallCheck(this, CellBase);

        this.container = document.createElement("div");
        this.val = 0;
    }

    _createClass(CellBase, [{
        key: "value",
        set: function set(v) {
            this.container.innerText = v != null ? v : '';
            this.val = v;
        },
        get: function get() {
            return this.val;
        }
    }]);

    return CellBase;
})();

exports.default = CellBase;

},{}],3:[function(require,module,exports){
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

},{"./Field.js":4,"./Game.js":5}],4:[function(require,module,exports){
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

},{"./Cell.js":1}],5:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Next = require('./Next.js');

var _Next2 = _interopRequireDefault(_Next);

var _Stash = require('./Stash.js');

var _Stash2 = _interopRequireDefault(_Stash);

var _Score = require('./Score.js');

var _Score2 = _interopRequireDefault(_Score);

var _Stars = require('./Stars.js');

var _Stars2 = _interopRequireDefault(_Stars);

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
            _Score2.default.value += value;
            this.check(value, row, col);
        }
    }, {
        key: 'check',
        value: function check(value, row, col) {
            var _this = this;

            var collapse = function collapse(newVal) {
                _Score2.default.value += newVal;
                neighbors.cells.forEach(function (v) {
                    return v.value = null;
                });
                field.getCell(row, col).value = newVal;
                _this.check(newVal, row, col);
            };

            var field = this.field;
            if (value == 0) {
                field.getCell(row, col).value = value;
                return;
            }
            var neighbors = new NeighborManager(this.field, value, row, col);
            if (value % 3 == 0 && neighbors.length >= 3) {
                var newVal = value * neighbors.length;
                collapse(newVal);
            } else if (value % 2 == 0 && neighbors.length >= 2) {
                var newVal = value * neighbors.length;
                collapse(newVal);
            } else if (value == 1 && neighbors.length >= 2) {
                var newVal = value * (neighbors.length == 0 ? 1 : neighbors.length);
                debugger;
                collapse(newVal);
                if (newVal == 5) {
                    _Stars2.default.value++;
                    field.getCell(row, col).value = null;
                }
            }
        }
    }]);

    return Game;
})();

exports.default = new Game();

},{"./Next.js":6,"./Score.js":7,"./Stars.js":8,"./Stash.js":9}],6:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _CellBase2 = require('./CellBase.js');

var _CellBase3 = _interopRequireDefault(_CellBase2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Next = (function (_CellBase) {
    _inherits(Next, _CellBase);

    function Next() {
        _classCallCheck(this, Next);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Next).call(this));

        _this.container.className = 'next';
        document.getElementById('nextWrapper').appendChild(_this.container);
        _this.generate();
        return _this;
    }

    _createClass(Next, [{
        key: 'generate',
        value: function generate() {
            this.value = Math.round(Math.random() * 2 + 1);
        }
    }]);

    return Next;
})(_CellBase3.default);

exports.default = new Next();

},{"./CellBase.js":2}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _CellBase2 = require('./CellBase.js');

var _CellBase3 = _interopRequireDefault(_CellBase2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Score = (function (_CellBase) {
    _inherits(Score, _CellBase);

    function Score() {
        _classCallCheck(this, Score);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Score).call(this));

        _this.container.className = 'score';
        document.getElementById('score').appendChild(_this.container);
        return _this;
    }

    return Score;
})(_CellBase3.default);

exports.default = new Score();

},{"./CellBase.js":2}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _CellBase2 = require('./CellBase.js');

var _CellBase3 = _interopRequireDefault(_CellBase2);

var _Next = require('./Next.js');

var _Next2 = _interopRequireDefault(_Next);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Stars = (function (_CellBase) {
    _inherits(Stars, _CellBase);

    function Stars() {
        _classCallCheck(this, Stars);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Stars).call(this));

        _this.container.className = 'stars';
        document.getElementById('starsWrapper').appendChild(_this.container);
        return _this;
    }

    return Stars;
})(_CellBase3.default);

exports.default = new Stars();

},{"./CellBase.js":2,"./Next.js":6}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _CellBase2 = require('./CellBase.js');

var _CellBase3 = _interopRequireDefault(_CellBase2);

var _Next = require('./Next.js');

var _Next2 = _interopRequireDefault(_Next);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Stash = (function (_CellBase) {
    _inherits(Stash, _CellBase);

    function Stash() {
        _classCallCheck(this, Stash);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Stash).call(this));

        _this.container.className = 'stash';
        document.getElementById('stashWrapper').appendChild(_this.container);
        _this.container.addEventListener('click', function () {
            if (_this.value == undefined) {
                _this.value = _Next2.default.value;
                _Next2.default.generate();
            } else {
                var tmp = _this.value;
                _this.value = _Next2.default.value;
                _Next2.default.value = tmp;
            }
        });
        return _this;
    }

    return Stash;
})(_CellBase3.default);

exports.default = new Stash();

},{"./CellBase.js":2,"./Next.js":6}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
"use strict";

var _main = require("./main.js");

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener("DOMContentLoaded", function () {
    _main2.default.start();
});

},{"./main.js":12}],12:[function(require,module,exports){
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

},{"./Controller.js":3,"./States/States.js":10}]},{},[11])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvQ2VsbC5qcyIsInNyYy9DZWxsQmFzZS5qcyIsInNyYy9Db250cm9sbGVyLmpzIiwic3JjL0ZpZWxkLmpzIiwic3JjL0dhbWUuanMiLCJzcmMvTmV4dC5qcyIsInNyYy9TY29yZS5qcyIsInNyYy9TdGFycy5qcyIsInNyYy9TdGFzaC5qcyIsInNyYy9TdGF0ZXMvU3RhdGVzLmpzIiwic3JjL2luZGV4LmpzIiwic3JjL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ0lNLElBQUk7Y0FBSixJQUFJOztBQUNOLGFBREUsSUFBSSxDQUNPLE9BQU8sRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFOzhCQUQ5QixJQUFJOzsyRUFBSixJQUFJOztBQUdGLGNBQUssR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUNmLGNBQUssR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUNmLGNBQUssU0FBUyxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUM7QUFDbEMsZUFBTyxDQUFDLFdBQVcsQ0FBQyxNQUFLLFNBQVMsQ0FBQyxDQUFDO0FBQ3BDLGNBQUssU0FBUyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFNO0FBQzNDLGdCQUFJLENBQUMsTUFBSyxLQUFLLEVBQUU7QUFDYixzQkFBSyxLQUFLLEdBQUcsZUFBSyxLQUFLLENBQUM7QUFDeEIsK0JBQUssSUFBSSxDQUFDLGVBQUssS0FBSyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUNoQywrQkFBSyxRQUFRLEVBQUUsQ0FBQzthQUNuQjtTQUNKLENBQUMsQ0FBQzs7S0FDTjs7V0FkQyxJQUFJOzs7a0JBaUJLLElBQUk7Ozs7Ozs7Ozs7Ozs7SUNyQmIsUUFBUTtBQUNWLGFBREUsUUFBUSxHQUNLOzhCQURiLFFBQVE7O0FBRU4sWUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMs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dkI7OztXQTlDQyxNQUFNOzs7a0JBMERHLElBQUksTUFBTSxFQUFFOzs7Ozs7Ozs7OztBQ3hEM0IsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLFlBQVc7QUFDckQsbUJBQUssS0FBSyxFQUFFLENBQUM7Q0FDaEIsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDREgsSUFBSSxJQUFJLEdBQUc7QUFDUCxTQUFLLEVBQUUsaUJBQU07QUFDVCx5QkFBTyxHQUFHLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxxQkFBVyxNQUFNLENBQUMsQ0FBQztBQUM1Qyx5QkFBTyxHQUFHLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxxQkFBVyxhQUFhLENBQUMsQ0FBQztBQUN4RCx5QkFBTyxHQUFHLENBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxxQkFBVyxhQUFhLENBQUMsQ0FBQztBQUN4RCx5QkFBTyxFQUFFLEdBQUcsTUFBTSxDQUFDO0tBQ3RCO0NBQ0osQ0FBQztrQkFDYSxJQUFJIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBHYW1lIGZyb20gJy4vR2FtZS5qcyc7XG5pbXBvcnQgTmV4dCBmcm9tICcuL05leHQuanMnO1xuaW1wb3J0IENlbGxCYXNlIGZyb20gJy4vQ2VsbEJhc2UuanMnO1xuXG5jbGFzcyBDZWxsIGV4dGVuZHMgQ2VsbEJhc2Uge1xuICAgIGNvbnN0cnVjdG9yICh3cmFwcGVyLCByb3csIGNvbCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnJvdyA9IHJvdztcbiAgICAgICAgdGhpcy5jb2wgPSBjb2w7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLmNsYXNzTmFtZSA9ICdjZWxsJztcbiAgICAgICAgd3JhcHBlci5hcHBlbmRDaGlsZCh0aGlzLmNvbnRhaW5lcik7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IE5leHQudmFsdWU7XG4gICAgICAgICAgICAgICAgR2FtZS5zdGVwKE5leHQudmFsdWUsIHJvdywgY29sKTtcbiAgICAgICAgICAgICAgICBOZXh0LmdlbmVyYXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2VsbDsiLCJjbGFzcyBDZWxsQmFzZSB7XG4gICAgY29uc3RydWN0b3IgKCkge1xuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHRoaXMudmFsID0gMDtcbiAgICB9XG5cbiAgICBzZXQgdmFsdWUgKHYpIHtcbiAgICAgICAgdGhpcy5jb250YWluZXIuaW5uZXJUZXh0ID0gdiAhPSBudWxsID8gdiA6ICcnO1xuICAgICAgICB0aGlzLnZhbCA9IHY7XG4gICAgfVxuXG4gICAgZ2V0IHZhbHVlICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2VsbEJhc2U7IiwiaW1wb3J0IEZpZWxkIGZyb20gJy4vRmllbGQuanMnO1xuaW1wb3J0IEdhbWUgZnJvbSAnLi9HYW1lLmpzJztcblxudmFyIENvbnRyb2xsZXIgPSB7XG4gICAgdG9HYW1lOiAoKSA9PiB7XG4gICAgICAgIHZhciBmaWVsZCA9IG5ldyBGaWVsZChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZUZpZWxkV3JhcHBlcicpKTtcbiAgICAgICAgR2FtZS5zdGFydChmaWVsZCk7XG4gICAgfSxcbiAgICBHYW1lVG9SZXN1bHRzOiAoKSA9PiB7XG5cbiAgICB9LFxuICAgIFJlc3VsdHNUb0dhbWU6ICgpID0+IHtcblxuICAgIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbnRyb2xsZXI7IiwiaW1wb3J0IENlbGwgZnJvbSAnLi9DZWxsLmpzJztcblxuY29uc3QgUk9XUyA9IDUsXG4gICAgQ09MUyA9IDU7XG5cbmNsYXNzIEZpZWxkIHtcbiAgICBjb25zdHJ1Y3RvciAod3JhcHBlcikge1xuICAgICAgICB0aGlzLmdyaWQgPSBbXTtcbiAgICAgICAgdmFyIGdyaWQgPSB0aGlzLmdyaWQ7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgUk9XUzsgaSArKykge1xuICAgICAgICAgICAgbGV0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICByb3cuY2xhc3NOYW1lID0gJ3Jvdyc7XG4gICAgICAgICAgICB3cmFwcGVyLmFwcGVuZENoaWxkKHJvdyk7XG4gICAgICAgICAgICBncmlkLnB1c2goW10pO1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBDT0xTOyBqICsrKSB7XG4gICAgICAgICAgICAgICAgZ3JpZFtpXS5wdXNoKG5ldyBDZWxsKHJvdywgaSwgaikpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0Q2VsbCAocm93LCBjb2wpIHtcbiAgICAgICAgdmFyIHRtcCA9IHRoaXMuZ3JpZFtyb3ddO1xuICAgICAgICBpZiAodG1wKSB7XG4gICAgICAgICAgICByZXR1cm4gdG1wW2NvbF07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRmllbGQ7IiwiaW1wb3J0IE5leHQgZnJvbSAnLi9OZXh0LmpzJztcbmltcG9ydCBTdGFzaCBmcm9tICcuL1N0YXNoLmpzJztcbmltcG9ydCBTY29yZSBmcm9tICcuL1Njb3JlLmpzJztcbmltcG9ydCBTdGFycyBmcm9tICcuL1N0YXJzLmpzJztcblxuY2xhc3MgTmVpZ2hib3JNYW5hZ2VyIHtcbiAgICBjb25zdHJ1Y3RvciAoZmllbGQsIHZhbHVlLCByb3csIGNvbCkge1xuICAgICAgICB0aGlzLmNlbGxzID0gW107XG4gICAgICAgIHRoaXMuZmllbGQgPSBmaWVsZDtcbiAgICAgICAgdGhpcy5jaGVja05laWdoYm9ycyh2YWx1ZSwgcm93LCBjb2wpO1xuICAgIH1cblxuICAgIGNoZWNrTmVpZ2hib3JzICh2YWx1ZSwgcm93LCBjb2wpIHtcbiAgICAgICAgdGhpcy5jaGVjayh2YWx1ZSwgcm93KzEsIGNvbCk7XG4gICAgICAgIHRoaXMuY2hlY2sodmFsdWUsIHJvdywgY29sKzEpO1xuICAgICAgICB0aGlzLmNoZWNrKHZhbHVlLCByb3ctMSwgY29sKTtcbiAgICAgICAgdGhpcy5jaGVjayh2YWx1ZSwgcm93LCBjb2wtMSk7XG4gICAgfVxuXG4gICAgY2hlY2sgKHZhbHVlLCByb3csIGNvbCkge1xuICAgICAgICBpZiAoIXRoaXMuY2VsbHMuc29tZSh2ID0+IHYuY29sID09IGNvbCAmJiB2LnJvdyA9PSByb3cpKSB7XG4gICAgICAgICAgICB2YXIgY2VsbCA9IHRoaXMuZmllbGQuZ2V0Q2VsbChyb3csIGNvbCk7XG4gICAgICAgICAgICBpZihjZWxsICYmIGNlbGwudmFsdWUgPT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNlbGxzLnB1c2goY2VsbCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jZWxscy5jb25jYXQodGhpcy5jaGVja05laWdoYm9ycyh2YWx1ZSwgcm93LCBjb2wpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBsZW5ndGggKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jZWxscy5sZW5ndGg7XG4gICAgfVxufVxuXG5jbGFzcyBHYW1lIHtcbiAgICBzdGFydCAoZmllbGQpIHtcbiAgICAgICAgdGhpcy5maWVsZCA9IGZpZWxkO1xuICAgIH1cblxuICAgIHN0ZXAgKHZhbHVlLCByb3csIGNvbCkge1xuICAgICAgICBTY29yZS52YWx1ZSArPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5jaGVjayh2YWx1ZSwgcm93LCBjb2wpO1xuICAgIH1cblxuICAgIGNoZWNrICh2YWx1ZSwgcm93LCBjb2wpIHtcbiAgICAgICAgdmFyIGNvbGxhcHNlID0gKG5ld1ZhbCkgPT4ge1xuICAgICAgICAgICAgU2NvcmUudmFsdWUgKz0gbmV3VmFsO1xuICAgICAgICAgICAgbmVpZ2hib3JzLmNlbGxzLmZvckVhY2godiA9PiB2LnZhbHVlID0gbnVsbCk7XG4gICAgICAgICAgICBmaWVsZC5nZXRDZWxsKHJvdywgY29sKS52YWx1ZSA9IG5ld1ZhbDtcbiAgICAgICAgICAgIHRoaXMuY2hlY2sobmV3VmFsLCByb3csIGNvbCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIGZpZWxkID0gdGhpcy5maWVsZDtcbiAgICAgICAgaWYgKHZhbHVlID09IDApIHtcbiAgICAgICAgICAgIGZpZWxkLmdldENlbGwocm93LCBjb2wpLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG5laWdoYm9ycyA9IG5ldyBOZWlnaGJvck1hbmFnZXIodGhpcy5maWVsZCwgdmFsdWUsIHJvdywgY29sKTtcbiAgICAgICAgaWYgKHZhbHVlICUgMyA9PSAwICYmIG5laWdoYm9ycy5sZW5ndGggPj0gMykge1xuICAgICAgICAgICAgbGV0IG5ld1ZhbCA9IHZhbHVlICogbmVpZ2hib3JzLmxlbmd0aDtcbiAgICAgICAgICAgIGNvbGxhcHNlKG5ld1ZhbCk7XG4gICAgICAgIH0gZWxzZSBpZiAodmFsdWUgJSAyID09IDAgJiYgbmVpZ2hib3JzLmxlbmd0aCA+PSAyKSB7XG4gICAgICAgICAgICBsZXQgbmV3VmFsID0gdmFsdWUgKiBuZWlnaGJvcnMubGVuZ3RoO1xuICAgICAgICAgICAgY29sbGFwc2UobmV3VmFsKTtcbiAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA9PSAxICYmIG5laWdoYm9ycy5sZW5ndGggPj0gMikge1xuICAgICAgICAgICAgbGV0IG5ld1ZhbCA9IHZhbHVlICogKG5laWdoYm9ycy5sZW5ndGggPT0gMCA/IDEgOiBuZWlnaGJvcnMubGVuZ3RoKTtcbiAgICAgICAgICAgIGRlYnVnZ2VyO1xuICAgICAgICAgICAgY29sbGFwc2UobmV3VmFsKTtcbiAgICAgICAgICAgIGlmIChuZXdWYWwgPT0gNSkge1xuICAgICAgICAgICAgICAgIFN0YXJzLnZhbHVlKys7XG4gICAgICAgICAgICAgICAgZmllbGQuZ2V0Q2VsbChyb3csIGNvbCkudmFsdWUgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgR2FtZSAoKTsiLCJpbXBvcnQgQ2VsbEJhc2UgZnJvbSAnLi9DZWxsQmFzZS5qcyc7XG5cbmNsYXNzIE5leHQgZXh0ZW5kcyBDZWxsQmFzZSB7XG4gICAgY29uc3RydWN0b3IgKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5jbGFzc05hbWUgPSAnbmV4dCc7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZXh0V3JhcHBlcicpLmFwcGVuZENoaWxkKHRoaXMuY29udGFpbmVyKTtcbiAgICAgICAgdGhpcy5nZW5lcmF0ZSgpO1xuICAgIH1cblxuICAgIGdlbmVyYXRlICgpIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDIgKyAxKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBOZXh0KCk7IiwiaW1wb3J0IENlbGxCYXNlIGZyb20gJy4vQ2VsbEJhc2UuanMnO1xuXG5jbGFzcyBTY29yZSBleHRlbmRzIENlbGxCYXNlIHtcbiAgICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLmNsYXNzTmFtZSA9ICdzY29yZSc7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzY29yZScpLmFwcGVuZENoaWxkKHRoaXMuY29udGFpbmVyKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBTY29yZSgpOyIsImltcG9ydCBDZWxsQmFzZSBmcm9tICcuL0NlbGxCYXNlLmpzJztcbmltcG9ydCBOZXh0IGZyb20gJy4vTmV4dC5qcyc7XG5cbmNsYXNzIFN0YXJzIGV4dGVuZHMgQ2VsbEJhc2Uge1xuICAgIGNvbnN0cnVjdG9yICgpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5jb250YWluZXIuY2xhc3NOYW1lID0gJ3N0YXJzJztcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXJzV3JhcHBlcicpLmFwcGVuZENoaWxkKHRoaXMuY29udGFpbmVyKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBTdGFycygpOyIsImltcG9ydCBDZWxsQmFzZSBmcm9tICcuL0NlbGxCYXNlLmpzJztcbmltcG9ydCBOZXh0IGZyb20gJy4vTmV4dC5qcyc7XG5cbmNsYXNzIFN0YXNoIGV4dGVuZHMgQ2VsbEJhc2Uge1xuICAgIGNvbnN0cnVjdG9yICgpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5jb250YWluZXIuY2xhc3NOYW1lID0gJ3N0YXNoJztcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXNoV3JhcHBlcicpLmFwcGVuZENoaWxkKHRoaXMuY29udGFpbmVyKTtcbiAgICAgICAgdGhpcy5jb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy52YWx1ZSA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gTmV4dC52YWx1ZTtcbiAgICAgICAgICAgICAgICBOZXh0LmdlbmVyYXRlKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCB0bXAgPSB0aGlzLnZhbHVlO1xuICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSBOZXh0LnZhbHVlO1xuICAgICAgICAgICAgICAgIE5leHQudmFsdWUgPSB0bXA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IFN0YXNoKCk7IiwiY2xhc3MgU3RhdGVze1xuICAgIGNvbnN0cnVjdG9yICgpIHtcbiAgICAgICAgdGhpcy5pbmRleCA9IFtudWxsLCAnZ2FtZScsICdyZXN1bHRzJ107XG4gICAgICAgIHRoaXMuc3RhdGVzID0gdGhpcy5jcmVhdGVTdGF0ZXModGhpcy5pbmRleCk7XG4gICAgICAgIHRoaXMuY29uZmlnKG51bGwsICdnYW1lJyk7XG4gICAgICAgIHRoaXMuY29uZmlnKCdnYW1lJywgJ3Jlc3VsdHMnKTtcbiAgICAgICAgdGhpcy5jb25maWcoJ3Jlc3VsdHMnLCAnZ2FtZScpO1xuICAgIH1cblxuICAgIGNyZWF0ZVN0YXRlcyAoc3RhdGVzKSB7XG4gICAgICAgIHRoaXMuY3VycmVudCA9IHN0YXRlc1swXTtcbiAgICAgICAgcmV0dXJuIHN0YXRlcy5tYXAodiA9PiB7cmV0dXJuIHtzdGF0ZTogdiwgdHJhbnNpdGlvbnM6IFtdfX0pO1xuICAgIH1cblxuICAgIGNvbmZpZyAoc3RhdGUsIHRyYW5zaXRpb24pIHtcbiAgICAgICAgdGhpcy5zdGF0ZXMuc29tZSh2ID0+IHtcbiAgICAgICAgICAgIGlmICh2LnN0YXRlID09IHN0YXRlKSB7XG4gICAgICAgICAgICAgICAgdi50cmFuc2l0aW9ucy5wdXNoKHt0cmFuc2l0aW9uOiB0cmFuc2l0aW9uLCBmbjogW119KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2V0IGlzIChzdGF0ZSkge1xuICAgICAgICBsZXQgY3VyciA9IHRoaXMuY3VycmVudDtcbiAgICAgICAgdmFyIGxlZ2FsID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc3RhdGVzLnNvbWUodiA9PiB7XG4gICAgICAgICAgICBpZiAodi5zdGF0ZSA9PSBjdXJyKSB7XG4gICAgICAgICAgICAgICAgbGVnYWwgPSB2LnRyYW5zaXRpb25zLnNvbWUodHJhbnNpdGlvbiA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0cmFuc2l0aW9uLnRyYW5zaXRpb24gPT0gc3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb24uZm4uZm9yRWFjaChmbiA9PiBmbigpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAobGVnYWwpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudCA9IHN0YXRlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignaWxsZWdhbCB0cmFuc2l0aW9uJylcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBpcyAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnQ7XG4gICAgfVxuXG4gICAgYWRkIChmcm9tU3RhdGUsIHRvU3RhdGUsIGhhbmRsZXIpIHtcbiAgICAgICAgdGhpcy5zdGF0ZXNbdGhpcy5pbmRleC5pbmRleE9mKGZyb21TdGF0ZSldLnRyYW5zaXRpb25zLnNvbWUodiA9PiB7XG4gICAgICAgICAgICBpZiAodi50cmFuc2l0aW9uID09IHRvU3RhdGUpIHtcbiAgICAgICAgICAgICAgICB2LmZuLnB1c2goaGFuZGxlcik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IFN0YXRlcygpO1xuIiwiaW1wb3J0IG1haW4gZnJvbSAnLi9tYWluLmpzJztcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oKSB7XG4gICAgbWFpbi5zdGFydCgpO1xufSk7IiwiaW1wb3J0IFN0YXRlcyBmcm9tICcuL1N0YXRlcy9TdGF0ZXMuanMnXG5pbXBvcnQgQ29udHJvbGxlciBmcm9tICcuL0NvbnRyb2xsZXIuanMnXG5cbnZhciBtYWluID0ge1xuICAgIHN0YXJ0OiAoKSA9PiB7XG4gICAgICAgIFN0YXRlcy5hZGQobnVsbCwgJ2dhbWUnLCBDb250cm9sbGVyLnRvR2FtZSk7XG4gICAgICAgIFN0YXRlcy5hZGQoJ2dhbWUnLCAncmVzdWx0cycsIENvbnRyb2xsZXIuR2FtZVRvUmVzdWx0cyk7XG4gICAgICAgIFN0YXRlcy5hZGQoJ3Jlc3VsdHMnLCAnZ2FtZScsIENvbnRyb2xsZXIuUmVzdWx0c1RvR2FtZSk7XG4gICAgICAgIFN0YXRlcy5pcyA9ICdnYW1lJztcbiAgICB9XG59O1xuZXhwb3J0IGRlZmF1bHQgbWFpbjsiXX0=
