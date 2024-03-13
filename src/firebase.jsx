import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
	apiKey: 'AIzaSyAJaLl5R9HCfCWqLIc9QRFXF7nAUpnkxNY',
	authDomain: 'todolist-ecc3b.firebaseapp.com',
	projectId: 'todolist-ecc3b',
	storageBucket: 'todolist-ecc3b.appspot.com',
	messagingSenderId: '616279224647',
	appId: '1:616279224647:web:f5d677fa4822e47c9d5c62',
	databaseURL: 'https://todolist-ecc3b-default-rtdb.europe-west1.firebasedatabase.app/',
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
