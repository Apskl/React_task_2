import { useState } from 'react';
import styles from './App.module.css';

const App = () => {
	const [operand1, setOperand1] = useState('');
	const [operator, setOperator] = useState('');
	const [operand2, setOperand2] = useState('');
	const [isResult, setIsResult] = useState(false);

	const NUMS = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0'];

	const clickOnNumber = (number) => {
		if (isResult) {
			setOperand1('');
			setOperator('');
			setOperand2('');
			setIsResult(false);
		}
		if (!operator) {
			if (!(operand1 === '0' && number === '0')) {
				setOperand1(operand1 === '0' ? number : operand1 + number);
			}
		} else {
			if (!(operand2 === '0' && number === '0')) {
				setOperand2(operand2 === '0' ? number : operand2 + number);
			}
		}
	};

	const mathOperations = (mathOp) => {
		if (mathOp === 'C') {
			setOperand1('');
			setOperator('');
			setOperand2('');
			setIsResult(false);
		} else if (mathOp === '+' || mathOp === '-') {
			setOperator(mathOp);
		} else if (mathOp === '=') {
			let result;
			const num1 = parseInt(operand1);
			const num2 = parseInt(operand2);
			if (operator === '+') {
				result = num1 + num2;
			} else if (operator === '-') {
				result = num1 - num2;
			}
			setOperand1(result.toString());
			setOperator('');
			setOperand2('');
			setIsResult(true);
		}
	};

	return (
		<div className={styles.calculator}>
			<div className={`${styles.display} ${isResult ? styles.result : ''}`}>
				{operand1} {operator} {operand2}
			</div>
			<div className={styles.buttons}>
				{NUMS.map((number) => (
					<button key={number} onClick={() => clickOnNumber(number)}>
						{number}
					</button>
				))}
				<button onClick={() => mathOperations('+')}>+</button>
				<button onClick={() => mathOperations('-')}>-</button>
				<button onClick={() => mathOperations('=')}>=</button>
				<button onClick={() => mathOperations('C')}>C</button>
			</div>
		</div>
	);
};

export default App;
