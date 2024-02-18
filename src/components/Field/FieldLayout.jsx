import styles from './FieldLayout.module.css';
import PropTypes from 'prop-types';

const FieldLayout = ({ field, onCellClick }) => {
	return (
		<div className={styles.field}>
			{field.map((cell, index) => (
				<button key={index} onClick={() => onCellClick(index)}>
					{cell}
				</button>
			))}
		</div>
	);
};

FieldLayout.propTypes = {
	field: PropTypes.array.isRequired,
	onCellClick: PropTypes.func.isRequired,
};

export default FieldLayout;
