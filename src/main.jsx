import React from 'react';
import ReactDOM from 'react-dom/client';
import GameContainer from './components/Game/GameContainer';
import './App.module.css';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<GameContainer />
	</React.StrictMode>,
);
