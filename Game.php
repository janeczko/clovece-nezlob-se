<?php

class Game
{
	const INDEX_VIEW = 'view/index-view.phtml';
	const GAME_VIEW = 'view/game-view.phtml';

	protected function renderData()
	{
		return [
			'gameView' => self::GAME_VIEW
		];
	}

	protected function scripts()
	{
		return [
			'jquery-3.1.0.js',
			'bootstrap.js',
			'vue.js',
		];
	}

	protected function styles()
	{
		return [
			'bootstrap.css',
			'game.css'
		];
	}

	public function render()
	{
		extract($this->renderData());
		$styles = $this->styles();
		$scripts = $this->scripts();

		require_once self::INDEX_VIEW;
	}
}