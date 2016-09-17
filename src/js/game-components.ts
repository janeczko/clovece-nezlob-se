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
	}

	public getField(): Box[][] {
		return this.gameField.field;
	}

	public getPlayers(): Player[] {
		let players: Player[] = [];

		for (var player of this.players) {
			if (player != null) {
				players.push(player);
			}
		}

		return players;
	}

	public getPlayer(order: number): Player {
		return this.players[order - 1];
	}

	public isInitialized(): boolean {
		if (!localStorage.getItem('cloveceNezlobSeGameInit')) {
			return false;
		}

		return true;
	}

	public start(playersCount: number): void {
		for (var i = 0; i < playersCount; i++) {
			this.players[i] = new Player(i + 1, this.getField());

			for (figurine of this.players[i].getFigurines()) {

			}
		}
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

	public hasFigurine(): boolean {
		return false;
	}

}

class PlayingBox extends Box {

	public static BOX_TYPE: number = 1;
	public cssClass: string = 'playing-field';
	public figurine: Figurine = null;

	public setFigurine(figurine: Figurine): void {
		this.figurine = figurine;
	}

	public hasFigurine(): boolean {
		return this.figurine != null;
	}
}

class StartBox extends PlayingBox {

	public static BOX_TYPE: number = 5;
	public cssClass: string = 'start-field';

}

class HomeBox extends PlayingBox {

	public static BOX_TYPE: number = 2;
	public cssClass: string = 'home-box';

}

class FinishBox extends PlayingBox {

	public static BOX_TYPE: number = 4;
	public cssClass: string = 'finish-box';

}

class PlayerGroup {

	public start: StartBox;
	public home: [HomeBox, HomeBox, HomeBox, HomeBox];
	public finish: [FinishBox, FinishBox, FinishBox, FinishBox];
	public figurines: [Figurine, Figurine, Figurine, Figurine];
	public color: string;

	constructor(player: Player) {
		let config: any = PLAYER_GROUPS_SETTINGS[player.order];
		let gameField: Box[][] = player.getGameField();

		this.color = player.color;
		this.start = gameField[config.start[0]][config.start[1]];
		this.start.cssClass += ` ${player.color}`;
		this.home = [ null, null, null, null ];
		this.finish = [ null, null, null, null ];
		this.figurines = [ null, null, null, null ];

		for (var i = 0; i < 4; i++) {
			let home: [number, number] = config.home[i];
			this.home[i] = gameField[home[0]][home[1]];
			this.home[i].cssClass += ` ${player.color}`;

			let finish: [number, number] = config.finish[i];
			this.finish[i] = gameField[finish[0]][finish[1]];
			this.finish[i].cssClass += ` ${player.color}`;

			this.figurines[i] = new Figurine(this.color);
			this.home[i].setFigurine(this.figurines[i]);
		}
	}

	public getFigurinesCount(): number {
		let figurinesCount: number = 0;

		for (var figurine of this.figurines) {
			if (figurine != null) {
				figurinesCount++;
			}
		}

		return figurinesCount;
	}

	public createNewFigurine(): void {
		for (var i in this.figurines) {
			if (this.figurines[i] == null) {
				this.figurines[i] = new Figurine(this.color);
				return;
			}
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

	public getFigurines(): Figurine[] {
		let figurines: Figurine[] = [];

		for (var figurine of this.group.figurines) {
			if (figurine != null) {
				figurines.push(figurine);
			}
		}

		return figurines;
	}
}

class Figurine {

	public color: string;

	constructor(color: string) {
		this.color = color;
	}

	public getColor(): string {
		return this.color;
	}
}

class GameInitializer {

}