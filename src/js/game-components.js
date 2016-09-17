var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Game = (function () {
    function Game() {
        this.players = [null, null, null, null];
        var field = GAME_FIELD_SETTINGS;
        for (var i in field) {
            for (var j in field[i]) {
                var type = field[i][j];
                switch (type) {
                    case Box.BOX_TYPE:
                        field[i][j] = new Box();
                        break;
                    case PlayingBox.BOX_TYPE:
                        field[i][j] = new PlayingBox();
                        break;
                    case StartBox.BOX_TYPE:
                        field[i][j] = new StartBox();
                        break;
                    case HomeBox.BOX_TYPE:
                        field[i][j] = new HomeBox();
                        break;
                    case FinishBox.BOX_TYPE:
                        field[i][j] = new FinishBox();
                        break;
                    default:
                        field[i][j] = new Box();
                }
            }
        }
        this.gameField = new GameField(field);
    }
    Game.prototype.getField = function () {
        return this.gameField.field;
    };
    Game.prototype.getPlayers = function () {
        var players = [];
        for (var _i = 0, _a = this.players; _i < _a.length; _i++) {
            var player = _a[_i];
            if (player != null) {
                players.push(player);
            }
        }
        return players;
    };
    Game.prototype.getPlayer = function (order) {
        return this.players[order - 1];
    };
    Game.prototype.isInitialized = function () {
        if (!localStorage.getItem('cloveceNezlobSeGameInit')) {
            return false;
        }
        return true;
    };
    Game.prototype.start = function (playersCount) {
        for (var i = 0; i < playersCount; i++) {
            this.players[i] = new Player(i + 1, this.getField());
            for (var _i = 0, _a = this.players[i].getFigurines(); _i < _a.length; _i++) {
                figurine = _a[_i];
            }
        }
    };
    return Game;
}());
var GameField = (function () {
    function GameField(field) {
        this.field = field;
    }
    return GameField;
}());
var Box = (function () {
    function Box() {
        this.cssClass = 'empty-box';
    }
    Box.prototype.hasFigurine = function () {
        return false;
    };
    Box.BOX_TYPE = 0;
    return Box;
}());
var PlayingBox = (function (_super) {
    __extends(PlayingBox, _super);
    function PlayingBox() {
        _super.apply(this, arguments);
        this.cssClass = 'playing-field';
        this.figurine = null;
    }
    PlayingBox.prototype.setFigurine = function (figurine) {
        this.figurine = figurine;
    };
    PlayingBox.prototype.hasFigurine = function () {
        return this.figurine != null;
    };
    PlayingBox.BOX_TYPE = 1;
    return PlayingBox;
}(Box));
var StartBox = (function (_super) {
    __extends(StartBox, _super);
    function StartBox() {
        _super.apply(this, arguments);
        this.cssClass = 'start-field';
    }
    StartBox.BOX_TYPE = 5;
    return StartBox;
}(PlayingBox));
var HomeBox = (function (_super) {
    __extends(HomeBox, _super);
    function HomeBox() {
        _super.apply(this, arguments);
        this.cssClass = 'home-box';
    }
    HomeBox.BOX_TYPE = 2;
    return HomeBox;
}(PlayingBox));
var FinishBox = (function (_super) {
    __extends(FinishBox, _super);
    function FinishBox() {
        _super.apply(this, arguments);
        this.cssClass = 'finish-box';
    }
    FinishBox.BOX_TYPE = 4;
    return FinishBox;
}(PlayingBox));
var PlayerGroup = (function () {
    function PlayerGroup(player) {
        var config = PLAYER_GROUPS_SETTINGS[player.order];
        var gameField = player.getGameField();
        this.color = player.color;
        this.start = gameField[config.start[0]][config.start[1]];
        this.start.cssClass += " " + player.color;
        this.home = [null, null, null, null];
        this.finish = [null, null, null, null];
        this.figurines = [null, null, null, null];
        for (var i = 0; i < 4; i++) {
            var home = config.home[i];
            this.home[i] = gameField[home[0]][home[1]];
            this.home[i].cssClass += " " + player.color;
            var finish = config.finish[i];
            this.finish[i] = gameField[finish[0]][finish[1]];
            this.finish[i].cssClass += " " + player.color;
            this.figurines[i] = new Figurine(this.color);
            this.home[i].setFigurine(this.figurines[i]);
        }
    }
    PlayerGroup.prototype.getFigurinesCount = function () {
        var figurinesCount = 0;
        for (var _i = 0, _a = this.figurines; _i < _a.length; _i++) {
            var figurine = _a[_i];
            if (figurine != null) {
                figurinesCount++;
            }
        }
        return figurinesCount;
    };
    PlayerGroup.prototype.createNewFigurine = function () {
        for (var i in this.figurines) {
            if (this.figurines[i] == null) {
                this.figurines[i] = new Figurine(this.color);
                return;
            }
        }
    };
    return PlayerGroup;
}());
var Player = (function () {
    function Player(order, gameField) {
        this.gameField = gameField;
        this.order = order;
        this.color = PLAYER_GROUPS_SETTINGS[order].color;
        this.group = new PlayerGroup(this);
    }
    Player.prototype.getGameField = function () {
        return this.gameField;
    };
    Player.prototype.getFigurines = function () {
        var figurines = [];
        for (var _i = 0, _a = this.group.figurines; _i < _a.length; _i++) {
            var figurine = _a[_i];
            if (figurine != null) {
                figurines.push(figurine);
            }
        }
        return figurines;
    };
    return Player;
}());
var Figurine = (function () {
    function Figurine(color) {
        this.color = color;
    }
    Figurine.prototype.getColor = function () {
        return this.color;
    };
    return Figurine;
}());
var GameInitializer = (function () {
    function GameInitializer() {
    }
    return GameInitializer;
}());
//# sourceMappingURL=game-components.js.map