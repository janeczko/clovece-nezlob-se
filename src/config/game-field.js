var GAME_FIELD_SETTINGS = [
    [2, 2, 0, 0, 1, 1, 5, 0, 0, 2, 2],
    [2, 2, 0, 0, 1, 4, 1, 0, 0, 2, 2],
    [0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 0],
    [5, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1],
    [1, 4, 4, 4, 4, 0, 4, 4, 4, 4, 1],
    [1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 5],
    [0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 0],
    [2, 2, 0, 0, 1, 4, 1, 0, 0, 2, 2],
    [2, 2, 0, 0, 5, 1, 1, 0, 0, 2, 2]
];
var PLAYING_BOARD_SETTINGS = [
    [0, 6], [1, 6], [2, 6], [3, 6],
    [4, 6], [4, 7], [4, 8], [4, 9],
    [4, 10], [5, 10], [6, 10],
    [6, 9], [6, 8], [6, 7], [6, 6],
    [7, 6], [8, 6], [9, 6], [10, 6],
    [10, 5], [10, 4],
    [9, 4], [8, 4], [7, 4], [6, 4],
    [6, 3], [6, 2], [6, 1], [6, 0],
    [5, 0], [4, 0],
    [4, 1], [4, 2], [4, 3], [4, 4],
    [3, 4], [2, 4], [1, 4], [0, 4],
    [0, 5]
];
var PLAYER_GROUPS_SETTINGS = {
    "1": {
        color: 'green',
        start: [4, 0],
        home: [[0, 0], [0, 1], [1, 0], [1, 1]],
        finish: [[5, 1], [5, 2], [5, 3], [5, 4]]
    },
    "2": {
        color: 'blue',
        start: [0, 6],
        home: [[0, 10], [0, 9], [1, 10], [1, 9]],
        finish: [[1, 5], [2, 5], [3, 5], [4, 5]]
    },
    "3": {
        color: 'yellow',
        start: [6, 10],
        home: [[10, 10], [10, 9], [9, 10], [9, 9]],
        finish: [[5, 9], [5, 8], [5, 7], [5, 6]]
    },
    "4": {
        color: 'red',
        start: [10, 4],
        home: [[10, 0], [10, 1], [9, 0], [9, 1]],
        finish: [[9, 5], [8, 5], [7, 5], [6, 5]]
    }
};
//# sourceMappingURL=game-field.js.map