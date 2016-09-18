class PlayingBoard extends React.Component {
	constructor(props) {
		super(props);

		this.state = {

		};
	}

	generateEmptyBoxes() {
		return this.props.boxes.map(function(box) {
			return (
				<Box x={box.x} y={box.y} />
			);
		});
	}

	generateStartBoxes() {
		return this.props.players.map(function(player) {
			return (
				<StartBox x={player.start.x} y={player.start.y} color={player.color} />
			);
		});
	}

	generateHomeBoxes() {
		return this.props.players.map(function(player) {
			var color = player.color;

			return player.home.map(function(box) {
				return (
					<HomeBox x={box.x} y={box.y} color={color} />
				)
			});
		});
	}

	generateFinishBoxes() {
		return this.props.players.map(function(player) {
			var color = player.color;

			return player.finish.map(function(box) {
				return (
					<FinishBox x={box.x} y={box.y} color={color} />
				)
			});
		});
	}

	generateFigurines() {
		var handleClick = this.handleFigurineClick;

		return this.props.players.map(function(player) {
			var start = player.start;

			return player.figurines.map(function(figurine) {
				return (
					<Figurine data={figurine} startingPosition={start} />
				)
			});
		});
	}

	render() {
		return (
			<div className="playingBoard">
				{this.generateEmptyBoxes()}
				{this.generateStartBoxes()}
				{this.generateHomeBoxes()}
				{this.generateFinishBoxes()}
				{this.generateFigurines()}
			</div>
		);
	}
}


class Box extends React.Component {
	getStyle() {
		return {
			left: this.props.y,
			top: this.props.x
		}
	}

	render() {
		return (
			<div className="box" style={this.getStyle()}>
				<div className="slot"></div>
			</div>
		);
	}
}

class HomeBox extends Box {
	render() {
		var slotColor = { backgroundColor: this.props.color };

		return (
			<div className="homeBox" style={this.getStyle()}>
				<div className="slot" style={slotColor}></div>
			</div>
		);
	}
}

class FinishBox extends Box {
	render() {
		var slotColor = { backgroundColor: this.props.color };

		return (
			<div className="finishBox" style={this.getStyle()}>
				<div className="slot" style={slotColor}></div>
			</div>
		);
	}
}

class StartBox extends Box {
	render() {
		var slotColor = { backgroundColor: this.props.color };

		return (
			<div className="startBox" style={this.getStyle()}>
				<div className="slot" style={slotColor}></div>
			</div>
		);
	}
}

class Figurine extends React.Component {
	render() {
		this.state = {
			data: this.props.data
		};

		return (
			<div className="figurine" style={this.generatePositionCss()}>
				<div className={this.state.data.color} onClick={this.handleClick.bind(this)}></div>
			</div>
		)
	}

	generatePositionCss() {
		return {
			top: this.state.data.x,
			left: this.state.data.y,
		}
	}

	handleClick(e) {
		if (!this.state.data.inGame) {
			var data = this.state.data;
			data.inGame = true;
			data.x = this.props.startingPosition.x;
			data.y = this.props.startingPosition.y;
			this.setState({ data: data });
		}

		console.log(this.state.data);
	}
}


class Game extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			boardCoordinates: [],
			players: [],
			boxWidth: 60,
		}
	}

	componentDidMount() {
		$.ajax({
			method: 'GET',
			url: this.props.src,
			success: function(data) {
				data = JSON.parse(data);

				for (var player of data.players) {
					this.generateFigurines(player);
				}

				this.setState({
					boxWidth: data.boxWidth,
					boardCoordinates: data.playingGround,
					players: data.players
				});

				console.log(this.state.players);
			}.bind(this)
		});
	}

	generateFigurines(player) {
		player.figurines = [];

		for (var home of player.home) {
			player.figurines.push({
				x: home.x,
				y: home.y,
				color: player.color,
				inGame: false,
				placeOnPosition: function(x ,y) {
					this.x = x;
					this.y = y;
				}
			});
		}
	}

	render() {
		return (
			<div className="game">
				<PlayingBoard boxes={this.state.boardCoordinates} players={this.state.players} />
			</div>
		);
	}
}


ReactDOM.render(
	<Game src="api.php?action=init&players=4" />,
	document.getElementById('game')
);