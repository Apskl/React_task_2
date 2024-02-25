import { useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styles from './App.module.css';

const schema = yup.object().shape({
	email: yup.string().email('Неверный формат Email').required('Введите Email'),
	password: yup
		.string()
		.matches(/^[a-zA-Z0-9_]+$/, 'Пароль может содержать только буквы, цифры и нижнее подчеркивание')
		.min(3, 'Пароль должен содержать минимум 3 символа')
		.max(20, 'Пароль должен содержать максимум 20 символов')
		.required('Введите пароль'),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('password'), null], 'Пароли должны совпадать')
		.required('Повторите пароль'),
});

const App = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const registerButtonRef = useRef(null);

	useEffect(() => {
		if (Object.keys(errors).length === 0) {
			registerButtonRef.current.focus();
		}
	}, [errors]);

	const onSubmit = (data) => {
		console.log(data);
	};

	return (
		<div className={styles.container}>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<div className={styles.formGroup}>
					<label>Email:</label>
					<input type="email" {...register('email')} className={styles.input} />
					{errors.email && <p className={styles.error}>{errors.email.message}</p>}
				</div>
				<div className={styles.formGroup}>
					<label>Пароль:</label>
					<input type="password" {...register('password')} className={styles.input} />
					{errors.password && <p className={styles.error}>{errors.password.message}</p>}
				</div>
				<div className={styles.formGroup}>
					<label>Повторите пароль:</label>
					<input type="password" {...register('confirmPassword')} className={styles.input} />
					{errors.confirmPassword && <p className={styles.error}>{errors.confirmPassword.message}</p>}
				</div>
				<button type="submit" className={styles.button} ref={registerButtonRef}>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};

export default App;
