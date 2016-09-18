<?php

class Game
{
	const INDEX_VIEW = 'view/index-view.phtml';
	const GAME_VIEW = 'view/game-react-view.html';

	protected function renderData()
	{
		return [
			'gameView' => self::GAME_VIEW
		];
	}

	protected function headScripts()
	{
		return [
			'react.js',
			'react-dom.js',
			'browser.min.js',
			'jquery-3.1.0.js',
			'bootstrap.js'
			//'vue.js'
		];
	}

	protected function bodyScripts()
	{
		return [
			//'game-react.js'
			//'game-components.js',
			//'game.js'
		];
	}

	protected function babelScripts() {
		return [
			'game-react.jsx'
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
			'game-react.css'
			//'game.css'
		];
	}

	public function render()
	{
		extract($this->renderData());
		$styles = $this->styles();
		$headScripts = $this->headScripts();
		$bodyScripts = $this->bodyScripts();
		$configScripts = $this->configScripts();
		$babelScripts = $this->babelScripts();

		require_once self::INDEX_VIEW;
	}
}