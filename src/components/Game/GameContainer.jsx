import InformationContainer from '../Information/InformationContainer';
import FieldContainer from '../Field/FieldContainer';
import styles from './GameContainer.module.css';
import { useState } from 'react';

const WIN_PATTERNS = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

const GameContainer = () => {
	const [currentPlayer, setCurrentPlayer] = useState('X');
	const [isGameEnded, setIsGameEnded] = useState(false);
	const [isDraw, setIsDraw] = useState(false);
	const [field, setField] = useState(Array(9).fill(''));

	const handleCellClick = (index) => {
		if (!field[index] && !isGameEnded) {
			const newField = [...field];
			newField[index] = currentPlayer;

			checkWinner(newField);
			setField(newField);
		}
	};

	const checkWinner = (currentField) => {
		for (let pattern of WIN_PATTERNS) {
			const [a, b, c] = pattern;
			if (currentField[a] && currentField[a] === currentField[b] && currentField[a] === currentField[c]) {
				setIsGameEnded(true);
				return;
			}
		}
		if (!currentField.includes('')) {
			setIsDraw(true);
		} else {
			setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X'); // Обновляем текущего игрока, если игра не завершена
		}
	};

	const handleRestart = () => {
		setCurrentPlayer('X');
		setIsGameEnded(false);
		setIsDraw(false);
		setField(Array(9).fill(''));
	};

	return (
		<div className={styles.gameContainer}>
			<InformationContainer isDraw={isDraw} isGameEnded={isGameEnded} currentPlayer={currentPlayer} />
			<FieldContainer field={field} onCellClick={handleCellClick} />
			<button className={styles.restartBtn} onClick={handleRestart}>
				Начать заново
			</button>
		</div>
	);
};

export default GameContainer;
