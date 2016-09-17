class Game {

	public gameField: GameField;
	public players: [Player, Plyer, Player, Player];

	constructor() {
		this.players = [ null, null, null, null ];
		let field: any[][] = GAME_FIELD_SETTINGS;

		for (var i in field) {
			for (var j in field[i]) {
				let type: number = field[i][j];

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

	public getField(): Box[][] {
		return this.gameField.field;
	}
}

class GameField {

	public field: Box[][];

	constructor(field: Box[][]) {
		this.field = field;
	}
}

class Box {

	public static BOX_TYPE: number = 0;

	public cssClass: string = 'empty-box';

}

class PlayingBox extends Box {

	public static BOX_TYPE: number = 1;
	public cssClass: string = 'playing-field';

}

class StartBox extends PlayingBox {

	public static BOX_TYPE: number = 5;
	public cssClass: string = 'start-field';

}

class HomeBox extends Box {

	public static BOX_TYPE: number = 2;
	public cssClass: string = 'home-box';

}

class FinishBox extends Box {

	public static BOX_TYPE: number = 4;
	public cssClass: string = 'finish-box';

}

class PlayerGroup {

	public start: StartBox;
	public home: [HomeBox, HomeBox, HomeBox, HomeBox];
	public finish: [FinishBox, FinishBox, FinishBox, FinishBox];

	constructor(player: Player) {
		let config: any = PLAYER_GROUPS_SETTINGS[player.order];
		let gameField: Box[][] = player.getGameField();

		this.start = gameField[config.start[0]][config.start[1]];
		this.start.cssClass += ` ${player.color}`;
		this.home = [ null, null, null, null ];
		this.finish = [ null, null, null, null ];

		for (var i = 0; i < 4; i++) {
			let home: [number, number] = config.home[i];
			this.home[i] = gameField[home[0]][home[1]];
			this.home[i].cssClass += ` ${player.color}`;

			let finish: [number, number] = config.finish[i];
			this.finish[i] = gameField[finish[0]][finish[1]];
			this.finish[i].cssClass += ` ${player.color}`;
		}
	}
}

class Player {

	public order: number;
	public color: string;
	public group: PlayerGroup;
	public gameField: Box[][];

	constructor(order: number, gameField: Box[][]) {
		this.gameField = gameField;
		this.order = order;
		this.color = PLAYER_GROUPS_SETTINGS[order].color;
		this.group = new PlayerGroup(this);
	}

	public getGameField(): Box[][] {
		return this.gameField;
	}
}
