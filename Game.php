<?php

class Game
{
	const INDEX_VIEW = 'view/index-view.phtml';
	const GAME_VIEW = 'view/game-view.html';

	protected function renderData()
	{
		return [
			'gameView' => self::GAME_VIEW
		];
	}

	protected function headScripts()
	{
		return [
			'jquery-3.1.0.js',
			'bootstrap.js',
			'vue.js'
		];
	}

	protected function bodyScripts()
	{
		return [
			'game-components.js',
			'game.js'
		];
	}

	protected function configScripts()
	{
		return [
			'game-field.js'
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
		$headScripts = $this->headScripts();
		$bodyScripts = $this->bodyScripts();
		$configScripts = $this->configScripts();

		require_once self::INDEX_VIEW;
	}
}