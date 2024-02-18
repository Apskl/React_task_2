import styles from './InformationLayout.module.css';
import PropTypes from 'prop-types';

const InformationLayout = ({ isDraw, isGameEnded, currentPlayer }) => {
	let message;
	if (isDraw) {
		message = 'Ничья';
	} else if (isGameEnded) {
		message = `Победа: ${currentPlayer}`;
	} else {
		message = `Ходит: ${currentPlayer}`;
	}

	return <div className={styles.information}>{message}</div>;
};

InformationLayout.propTypes = {
	isDraw: PropTypes.bool.isRequired,
	isGameEnded: PropTypes.bool.isRequired,
	currentPlayer: PropTypes.string.isRequired,
};

export default InformationLayout;
