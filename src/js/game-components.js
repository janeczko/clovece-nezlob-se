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
        this.players[0] = new Player(1, this.getField());
        this.players[1] = new Player(2, this.getField());
        this.players[2] = new Player(3, this.getField());
        this.players[3] = new Player(4, this.getField());
    }
    Game.prototype.getField = function () {
        return this.gameField.field;
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
    Box.BOX_TYPE = 0;
    return Box;
}());
var PlayingBox = (function (_super) {
    __extends(PlayingBox, _super);
    function PlayingBox() {
        _super.apply(this, arguments);
        this.cssClass = 'playing-field';
    }
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
}(Box));
var FinishBox = (function (_super) {
    __extends(FinishBox, _super);
    function FinishBox() {
        _super.apply(this, arguments);
        this.cssClass = 'finish-box';
    }
    FinishBox.BOX_TYPE = 4;
    return FinishBox;
}(Box));
var PlayerGroup = (function () {
    function PlayerGroup(player) {
        var config = PLAYER_GROUPS_SETTINGS[player.order];
        var gameField = player.getGameField();
        this.start = gameField[config.start[0]][config.start[1]];
        this.start.cssClass += " " + player.color;
        this.home = [null, null, null, null];
        this.finish = [null, null, null, null];
        for (var i = 0; i < 4; i++) {
            var home = config.home[i];
            this.home[i] = gameField[home[0]][home[1]];
            this.home[i].cssClass += " " + player.color;
            var finish = config.finish[i];
            this.finish[i] = gameField[finish[0]][finish[1]];
            this.finish[i].cssClass += " " + player.color;
        }
    }
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
    return Player;
}());
//# sourceMappingURL=game-components.js.map