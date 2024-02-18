import InformationLayout from './InformationLayout';
import PropTypes from 'prop-types';

const InformationContainer = ({ isDraw, isGameEnded, currentPlayer }) => {
	return <InformationLayout isDraw={isDraw} isGameEnded={isGameEnded} currentPlayer={currentPlayer} />;
};

InformationContainer.propTypes = {
	isDraw: PropTypes.bool.isRequired,
	isGameEnded: PropTypes.bool.isRequired,
	currentPlayer: PropTypes.string.isRequired,
};

export default InformationContainer;
