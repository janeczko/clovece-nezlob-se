/*Vue.filter('boxCss', function(cssClass) {

});*/

var gameView = new Vue({
	el: '#game-view',
	data: {
		gameInitialized: false,
		game: new Game()
	},
	created: function() {
		//this.gameInitialized = this.game.isInitialized();
		this.gameInitialized = true;
		this.game.start(4);
	}
});