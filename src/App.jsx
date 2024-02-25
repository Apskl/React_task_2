import { useState, useRef, useEffect } from 'react';
import styles from './App.module.css';

const App = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		confirmPassword: '',
	});
	const [errors, setErrors] = useState({});
	const [formValid, setFormValid] = useState(false);
	const registerButtonRef = useRef(null);

	useEffect(() => {
		const formErrors = {};
		let valid = true;

		if (!formData.email) {
			formErrors.email = 'Введите Email';
			valid = false;
		}

		if (!formData.password) {
			formErrors.password = 'Введите пароль';
			valid = false;
		} else if (formData.password.length < 3 || formData.password.length > 20) {
			formErrors.password = 'Пароль должен содержать от 3 до 20 символов';
			valid = false;
		} else if (!/^[a-zA-Z0-9_]+$/.test(formData.password)) {
			formErrors.password = 'Пароль может содержать только буквы, цифры и нижнее подчеркивание';
			valid = false;
		}

		if (formData.password !== formData.confirmPassword) {
			formErrors.confirmPassword = 'Пароли не совпадают';
			valid = false;
		}

		setErrors(formErrors);
		setFormValid(valid);
	}, [formData]);

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(formData);
	};

	useEffect(() => {
		if (formValid) {
			registerButtonRef.current.focus();
		}
	}, [formValid]);

	return (
		<div className={styles.container}>
			<form className={styles.form} onSubmit={handleSubmit}>
				<div className={styles.formGroup}>
					<label>Email:</label>
					<input type="email" name="email" value={formData.email} onChange={handleInputChange} className={styles.input} />
					{errors.email && <p className={styles.error}>{errors.email}</p>}
				</div>
				<div className={styles.formGroup}>
					<label>Пароль:</label>
					<input type="password" name="password" value={formData.password} onChange={handleInputChange} className={styles.input} />
					{errors.password && <p className={styles.error}>{errors.password}</p>}
				</div>
				<div className={styles.formGroup}>
					<label>Повторите пароль:</label>
					<input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} className={styles.input} />
					{errors.confirmPassword && <p className={styles.error}>{errors.confirmPassword}</p>}
				</div>
				<button type="submit" className={styles.button} disabled={!formValid} ref={registerButtonRef}>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};

export default App;
