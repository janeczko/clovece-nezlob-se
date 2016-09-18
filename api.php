<?php

mb_internal_encoding('utf-8');

class DefaultGameSettings
{
	const BOX_WIDTH = 60;

	const PLAYING_GROUND = [
		[ 2, 2, 0, 0, 1, 1, 5, 0, 0, 2, 2 ],
		[ 2, 2, 0, 0, 1, 4, 1, 0, 0, 2, 2 ],
		[ 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 0 ],
		[ 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 0 ],
		[ 5, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1 ],
		[ 1, 4, 4, 4, 4, 0, 4, 4, 4, 4, 1 ],
		[ 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 5 ],
		[ 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 0 ],
		[ 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 0 ],
		[ 2, 2, 0, 0, 1, 4, 1, 0, 0, 2, 2 ],
		[ 2, 2, 0, 0, 5, 1, 1, 0, 0, 2, 2 ]
	];

	const PLAYING_BOXES = [
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

	const PLAYERS = [
		'1' => [
			'color' => 'green',
			'start' => [4, 0],
			'home' => [ [0, 0], [0, 1], [1, 0], [1, 1] ],
			'finish' => [ [5, 1], [5, 2], [5, 3], [5, 4] ]
		],
		'2' => [
			'color' => 'blue',
			'start' => [0, 6],
			'home' => [ [0, 10], [0, 9], [1, 10], [1, 9] ],
			'finish' => [ [1, 5], [2, 5], [3, 5], [4, 5] ]
		],
		'3' => [
			'color' => 'yellow',
			'start' => [6, 10],
			'home' => [ [10, 10], [10, 9], [9, 10], [9, 9] ],
			'finish' => [ [5, 9], [5, 8], [5, 7], [5, 6] ]
		],
		'4' => [
			'color' => 'red',
			'start' => [10, 4],
			'home' => [ [10, 0], [10, 1], [9, 0], [9, 1] ],
			'finish' => [ [9, 5], [8, 5], [7, 5], [6, 5] ]
		]
	];
}

class Api
{
	private $action;

	public function __construct()
	{
		$this->action = isset($_GET['action']) ? $_GET['action'] : '';
	}

	public function start()
	{
		switch ($this->action)
		{
			case 'init':
				$this->initAction();
				break;
			default:
				echo 'error';
		}
	}

	private function setBoxList($settings, $start, $players)
	{
		$cList = DefaultGameSettings::PLAYING_BOXES;
		$boxList = [];
		$width = DefaultGameSettings::BOX_WIDTH;

		foreach ($cList as $c)
		{
			$value = DefaultGameSettings::PLAYING_GROUND[$c[0]][$c[1]];

			$boxList[] = [
				'x' => $c[0] * $width,
				'y' => $c[1] * $width,
			];
		}

		return $boxList;
	}

	private function setPlayerList($count)
	{
		$playerList = [];
		$players = DefaultGameSettings::PLAYERS;
		$width = DefaultGameSettings::BOX_WIDTH;

		if ($count == 1)
		{
			for ($i = 2; $i <= 4; $i++)
				unset($players[''. $i]);
		}
		else if ($count == 2)
		{
			$players['2'] = $players['3'];
			unset($players['3']);
			unset($players['4']);
		}
		else if ($count == 3)
			unset($players['4']);

		foreach ($players as $key => $player)
		{
			$player = (object) $player;
			$homeList = [];
			$finishList = [];

			foreach ($player->home as $home)
			{
				$homeList[] = (object) [
					'x' => $home[0] * $width,
					'y' => $home[1] * $width
				];
			}

			foreach ($player->finish as $finish)
			{
				$finishList[] = (object) [
					'x' => $finish[0] * $width,
					'y' => $finish[1] * $width
				];
			}

			$playerList[] = (object) [
				'order' => $key,
				'color' => $player->color,
				'start' => (object) [
					'x' => $player->start[0] * $width,
					'y' => $player->start[1] * $width
				],
				'home' => $homeList,
				'finish' => $finishList
			];
		}

		return $playerList;
	}

	private function initAction()
	{
		if (isset($_GET['players']))
		{
			$players = $_GET['players'];
			$players = ($players <= 0) ? 1 : (($players > 4) ? 4 : $players);
			$settings = DefaultGameSettings::PLAYING_GROUND;

			$start = (object) [
				'x' => 0,
				'y' => 6
			];

			$boxList = $this->setBoxList($settings, $start, $players);
			$playerList = $this->setPlayerList($players);

			echo json_encode([
				'boxWidth' => DefaultGameSettings::BOX_WIDTH,
				'playingGround' => $boxList,
				'players' => $playerList
			]);
		}
		else
		{
			echo json_encode([
				'message' => 'error'
			]);
		}
	}
}

$api = new Api();
$api->start();